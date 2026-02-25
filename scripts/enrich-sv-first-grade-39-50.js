#!/usr/bin/env node
/**
 * SEO Part 294: SV First-Grade Enrichment — Themes 39-50
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 12 SV theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    seoTitle: 'Gratis Sport\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara sport\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Po\u00e4ngr\u00e4kning, ordproblem inom 20 och l\u00e4sf\u00f6rst\u00e5else med sporttema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sport\u00f6vningar \u00e5rskurs 1, sport arbetsblad 6\u20137 \u00e5r, po\u00e4ngr\u00e4kning, ordproblem sport, addition subtraktion 20, idrott, Lgr22, resultattavla, lagarbete, fair play',
    snippetAnswer: 'Sport\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar po\u00e4ngr\u00e4kning, ordproblem inom 20 med sportscenarier och l\u00e4sf\u00f6rst\u00e5else om regler och fair play. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 f\u00f6rvandlas sporttemat till riktig matematisk probleml\u00f6sning och spr\u00e5kutveckling. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (laget gjorde 13 m\u00e5l i f\u00f6rsta halvlek och 8 i andra, hur m\u00e5nga totalt?), j\u00e4mf\u00f6r lagstatistik i stapeldiagram och l\u00e4ser korta faktatexter om sportregler. M\u00f6nster\u00f6vningar med tr\u00f6jnummer bygger algebraiskt t\u00e4nkande. Skrivuppgifter d\u00e4r eleven f\u00f6rklarar reglerna f\u00f6r sin favoritidrottart tr\u00e4nar strukturerad textproduktion. Lgr22 betonar vardagsmatematik, dataredovisning och f\u00f6rm\u00e5gan att f\u00f6lja instruktioner, och sporttemat f\u00f6renar alla m\u00e5len genom barnens naturliga entusiasm f\u00f6r t\u00e4vling och r\u00f6relse.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med addition och subtraktion inom 20 med tiotals\u00f6verg\u00e5ng', howWeAddress: 'Po\u00e4ngr\u00e4kningsscenarier d\u00e4r eleven adderar halvlekar och ber\u00e4knar po\u00e4ngskillnader tr\u00e4nar systematiskt tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Datainsamling och redovisning i stapeldiagram', howWeAddress: 'Eleven samlar matchstatistik (m\u00e5l, po\u00e4ng) och redovisar i stapeldiagram med tolkningsfr\u00e5gor' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av korta informationstexter om sport', howWeAddress: 'Texter om sportregler och fair play med f\u00f6rst\u00e5elsefr\u00e5gor som kr\u00e4ver \u00e5terber\u00e4ttande och slutledning' },
      { milestone: 'M\u00f6nsterigenk\u00e4nning med tr\u00f6jnummersekvenser', howWeAddress: 'Talsekvenser i tr\u00f6jnummer d\u00e4r eleven identifierar regeln och forts\u00e4tter m\u00f6nstret tr\u00e4nar algebraiskt t\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom talomr\u00e5det 10, ge f\u00e4rdiga diagrammallar och l\u00e4s texter h\u00f6gt. F\u00f6r avancerade elever ut\u00f6ka till flerstegsordproblem med tre lag, l\u00e5t eleven skapa egna turneringsscheman och skriva j\u00e4mf\u00f6rande texter om tv\u00e5 sporter.',
    parentTakeaway: 'G\u00f6r sportst\u00e4vningar till mattest\u00e4vningar! L\u00e5t barnet h\u00e5lla ställningen vid en fotbollsmatch p\u00e5 TV, r\u00e4kna m\u00e5l och ordproblem: \u201dom laget har 9 po\u00e4ng och g\u00f6r 7 till, hur m\u00e5nga har de?\u201d. Rita en resultattavla och j\u00e4mf\u00f6r lagen. Lek sportscharader och gissa aktionsord. Varje idrottsstund blir en l\u00e4randem\u00f6jlighet.',
    classroomIntegration: 'Sporttemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och data redovisas med matchstatistik, i svenska l\u00e4ses och skrivs texter om sportregler, i idrott kopplas r\u00f6relse till akademiskt inneh\u00e5ll, i bild ritas sportscener. En sportvecka med stationsrotation engagerar hela klassen.',
    assessmentRubric: [
      { skill: 'Ordproblem med sportscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med po\u00e4ngr\u00e4kning', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna sportmatematikuppgifter' },
      { skill: 'Dataredovisning med matchstatistik', emerging: 'fyller i f\u00e4rdiga diagram med st\u00f6d', proficient: 'samlar sj\u00e4lvst\u00e4ndigt in data och redovisar i stapeldiagram', advanced: 'tolkar diagram, j\u00e4mf\u00f6r lagstatistik och drar slutsatser' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om sport', emerging: '\u00e5terger ett faktum fr\u00e5n en kort text med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor om en sporttext', advanced: 'j\u00e4mf\u00f6r information fr\u00e5n tv\u00e5 texter och drar egna slutsatser' },
    ],
  },

  spring: {
    seoTitle: 'Gratis V\u00e5r\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara v\u00e5r\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). M\u00e4tning, datainsamling om v\u00e4der och l\u00e4sf\u00f6rst\u00e5else med v\u00e5rtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'v\u00e5r\u00f6vningar \u00e5rskurs 1, v\u00e5r arbetsblad 6\u20137 \u00e5r, v\u00e5rblommor, ordproblem v\u00e5r, m\u00e4tning cm, datainsamling, Lgr22, f\u00e5gelholkar, pollinerare, \u00e5rstider',
    snippetAnswer: 'V\u00e5r\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar m\u00e4tning av v\u00e5rblommor, datainsamling om v\u00e4derf\u00f6r\u00e4ndringar och l\u00e4sf\u00f6rst\u00e5else om naturens uppvaknande p\u00e5 v\u00e5ren. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 blir v\u00e5rtemat en bro mellan naturvetenskapligt unders\u00f6kande och matematisk dokumentation. Sex- och sju\u00e5ringar m\u00e4ter v\u00e5rblommor i centimeter, dokumenterar v\u00e4derf\u00f6r\u00e4ndringar i tabeller och l\u00f6ser ordproblem om v\u00e5rens h\u00e4ndelser (14 tulpaner blommade och 6 vissnade, hur m\u00e5nga \u00e4r kvar?). Sekvenserings\u00f6vningar d\u00e4r eleven ordnar v\u00e5rens f\u00f6rlopp\u2014sn\u00f6sm\u00e4ltning, knopp, blomma, f\u00e5gel\u2014tr\u00e4nar logiskt t\u00e4nkande. L\u00e4sf\u00f6rst\u00e5else om pollinerare och f\u00e5glars \u00e5terkomst kopplar NO till svenska. Lgr22 betonar naturvetenskapligt unders\u00f6kande, m\u00e4tning och \u00e5rstidsf\u00f6rst\u00e5else, och v\u00e5rtemat ger den mest levande kontexten f\u00f6r att uppt\u00e4cka f\u00f6r\u00e4ndring i naturen.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av v\u00e5rblommor och plantor i cm', howWeAddress: 'Eleven m\u00e4ter blommor och kvistar med linjal, f\u00f6r in data i tabell och j\u00e4mf\u00f6r storlekar' },
      { milestone: 'Datainsamling om v\u00e4derf\u00f6r\u00e4ndringar under v\u00e5ren', howWeAddress: 'V\u00e4derdagbok d\u00e4r eleven dokumenterar temperatur och v\u00e4dertyp dagligen och redovisar i diagram' },
      { milestone: 'Ordproblem inom 20 med v\u00e5rscenarier', howWeAddress: 'Problem om blommor, f\u00e5gelung\u00e5r och insekter tr\u00e4nar tiotals\u00f6verg\u00e5ng i motiverande v\u00e5rkontext' },
      { milestone: 'Naturvetenskaplig sekvensering (v\u00e5rens f\u00f6rlopp)', howWeAddress: 'Bildkort som eleven sorterar i r\u00e4tt ordning (sn\u00f6sm\u00e4ltning, knopp, blomma, frukt) tr\u00e4nar logiskt t\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00e4rdiga m\u00e4tmallar, begr\u00e4nsa sekvenser till tre steg och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever l\u00e4gg till temperaturj\u00e4mf\u00f6relser mellan veckor, l\u00e5t eleven planera en v\u00e5rkalender och skriva en fullst\u00e4ndig rapport om v\u00e5rens f\u00f6r\u00e4ndringar.',
    parentTakeaway: 'G\u00e5 p\u00e5 v\u00e5rpromenad och g\u00f6r den till en l\u00e4randeupplevelse! L\u00e5t barnet r\u00e4kna blommor, m\u00e4ta kvistar med linjal och l\u00f6sa ordproblem: \u201dom vi s\u00e5g 15 krokus och 7 var lila, hur m\u00e5nga var gula?\u201d. F\u00f6r en v\u00e4derdagbok vid fr\u00f6kstbordet varje morgon. Prata om varf\u00f6r f\u00e5glarna kommer tillbaka p\u00e5 v\u00e5ren. Varje utomhusstund \u00e4r vetenskap och matematik i ett.',
    classroomIntegration: 'V\u00e5rtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik m\u00e4ts blommor och v\u00e4derdata redovisas, i NO studeras pollinerare och \u00e5rstidsv\u00e4xlingar, i svenska skrivs v\u00e5rdagb\u00f6cker och l\u00e4ses faktatexter om v\u00e5ren, i bild m\u00e5las v\u00e5rlandskap. Utomhusundervisning ger verklig data f\u00f6r arbetsbladen.',
    assessmentRubric: [
      { skill: 'M\u00e4tning av v\u00e5rblommor', emerging: 'm\u00e4ter med linjal med st\u00f6d och avl\u00e4ser ungef\u00e4rligt', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i cm och j\u00e4mf\u00f6r m\u00e5tt i tabell', advanced: 'uppskattar l\u00e4ngder f\u00f6re m\u00e4tning och tolkar tillv\u00e4xttrender' },
      { skill: 'V\u00e4derdatainsamling', emerging: 'dokumenterar en v\u00e4dertyp per dag med bildst\u00f6d', proficient: 'f\u00f6r sj\u00e4lvst\u00e4ndigt v\u00e4derdagbok och redovisar i diagram', advanced: 'j\u00e4mf\u00f6r veckodata och drar slutsatser om v\u00e4derm\u00f6nster' },
      { skill: 'Ordproblem med v\u00e5rtema', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med v\u00e5rscenarier', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna v\u00e5rproblem' },
    ],
  },

  summer: {
    seoTitle: 'Gratis Sommar\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara sommar\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Tidsr\u00e4kning, ordproblem och l\u00e4sf\u00f6rst\u00e5else med sommartema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'sommar\u00f6vningar \u00e5rskurs 1, sommar arbetsblad 6\u20137 \u00e5r, sommarlov matematik, ordproblem sommar, tidsr\u00e4kning, glass, Lgr22, utomhuslek, strandmatematik, semester',
    snippetAnswer: 'Sommar\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar tidsr\u00e4kning med sommarens aktiviteter, ordproblem inom 20 med glass- och strandscenarier och l\u00e4sf\u00f6rst\u00e5else om sommarens natur. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 g\u00f6r sommartemat matematiken levande genom tidsr\u00e4kning och vardagsscenarier. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (16 barn badade och 9 gick hem, hur m\u00e5nga \u00e4r kvar?), l\u00e4r sig klockan i samband med sommaraktiviteter och samlar data om glasssmaker i stapeldiagram. M\u00e4tning av sn\u00e4ckor och stenar i centimeter kopplar sommarens natur till matematiska enheter. L\u00e4sf\u00f6rst\u00e5elsetexter om sommarens natur\u2014l\u00e5nga dagar, varma temperaturer och djurens beteende\u2014ger naturvetenskapligt ordforr\u00e5d. Lgr22 betonar tidsbegrepp, m\u00e4tning och vardagsmatematik, och sommartemat levererar alla m\u00e5len genom barnens gl\u00e4dje \u00f6ver den \u00e4ntligen varma \u00e5rstiden.',
    developmentalMilestones: [
      { milestone: 'Tidsbegrepp (hel och halv timme) i sommarkontext', howWeAddress: 'Sommarscheman d\u00e4r eleven l\u00e4ser av klockan och ber\u00e4knar hur l\u00e5ng tid aktiviteter tar' },
      { milestone: 'Ordproblem inom 20 med sommarscenarier', howWeAddress: 'Glass-, bad- och utflyktsscenarier tr\u00e4nar tiotals\u00f6verg\u00e5ng i lustfylld kontext' },
      { milestone: 'Datainsamling med glasssmaker och strandfynd', howWeAddress: 'Eleven samlar data om favoritglass eller sn\u00e4ckor och redovisar i stapeldiagram med tolkningsfr\u00e5gor' },
      { milestone: 'M\u00e4tning av naturf\u00f6rem\u00e5l (sn\u00e4ckor, stenar) i cm', howWeAddress: 'Eleven m\u00e4ter sommarfynd med linjal och sorterar efter storlek i en tabell' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa tidsr\u00e4kning till hela timmar, h\u00e5ll ordproblem inom 10 och ge f\u00e4rdiga diagrammallar. F\u00f6r avancerade elever introducera kvartsklockan, l\u00e5t eleven planera en sommardag med tidsberäkningar och skriva en dagbokstext om sin b\u00e4sta sommardag.',
    parentTakeaway: 'Sommarlovet \u00e4r perfekt f\u00f6r l\u00e4rande utan skolb\u00e4nk! L\u00e5t barnet r\u00e4kna sn\u00e4ckor p\u00e5 stranden, m\u00e4ta stenar med linjal och l\u00f6sa problem: \u201dom vi har 14 glassbitar och \u00e4ter 6, hur m\u00e5nga har vi kvar?\u201d. Anv\u00e4nd sommarens schema f\u00f6r att \u00f6va klockan. F\u00f6r en glassdagbok d\u00e4r barnet ritar vilka smaker det provat. Varje sommardel blir en mattest\u00e4vling.',
    classroomIntegration: 'Sommartemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas tidsbegrepp och data redovisas med glasssmaker, i NO studeras sommarens natur och djurbeteende, i svenska skrivs sommardagb\u00f6cker och l\u00e4ses faktatexter, i bild m\u00e5las sommarmotiv. Utomhusundervisning med m\u00e4tuppgifter ger verkliga data.',
    assessmentRubric: [
      { skill: 'Tidsr\u00e4kning med sommaraktiviteter', emerging: 'l\u00e4ser av hela timmar p\u00e5 analog klocka med st\u00f6d', proficient: 'l\u00e4ser sj\u00e4lvst\u00e4ndigt hel och halv timme och ber\u00e4knar varaktighet', advanced: 'l\u00e4ser kvartsklockan och planerar tidsscheman f\u00f6r sommaraktiviteter' },
      { skill: 'Ordproblem med sommarscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med sommartema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna sommarmatematikuppgifter' },
      { skill: 'Dataredovisning med sommardata', emerging: 'fyller i f\u00e4rdigt diagram med st\u00f6d', proficient: 'samlar sj\u00e4lvst\u00e4ndigt data och redovisar i stapeldiagram', advanced: 'tolkar diagram, j\u00e4mf\u00f6r data och drar slutsatser' },
    ],
  },

  superheroes: {
    seoTitle: 'Gratis Superhj\u00e4lte\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara superhj\u00e4lte\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, kreativ skrivning och logikpussel med superhj\u00e4ltetema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'superhj\u00e4lte\u00f6vningar \u00e5rskurs 1, superhj\u00e4ltar arbetsblad 6\u20137 \u00e5r, ordproblem superhj\u00e4lte, kreativ skrivning, logikpussel, Lgr22, ber\u00e4ttandestruktur, taluppfattning, probleml\u00f6sning, hj\u00e4lteuppdrag',
    snippetAnswer: 'Superhj\u00e4lte\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med hj\u00e4lteuppdrag, kreativ ber\u00e4ttelseskrivning och logikpussel som utmanar strategiskt t\u00e4nkande. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 driver superhj\u00e4ltetemat b\u00e5de matematisk probleml\u00f6sning och kreativ textproduktion. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (hj\u00e4lten r\u00e4ddade 14 personer p\u00e5 m\u00e5ndagen och 8 p\u00e5 tisdagen, hur m\u00e5nga totalt?) och anv\u00e4nder logikpussel f\u00f6r att kn\u00e4cka superhj\u00e4ltekoder. Ber\u00e4ttelseskrivning d\u00e4r eleven skapar sin egen superhj\u00e4lte med superkraft, namn och uppdrag ger motiverad textproduktion med inledning, handling och avslutning. M\u00f6nsterigenk\u00e4nning med superhj\u00e4ltesekvenser och symmetri\u00f6vningar med maskdesign utvecklar rumsligt t\u00e4nkande. Lgr22 betonar ber\u00e4ttandestruktur, probleml\u00f6sning och m\u00f6nster, och superhj\u00e4ltetemat levererar alla m\u00e5len genom barnens fascination f\u00f6r hj\u00e4ltemod och fantasi.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med addition och subtraktion inom 20', howWeAddress: 'Hj\u00e4lteuppdragsscenarier (r\u00e4dda invnare, samla superkraft) tr\u00e4nar tiotals\u00f6verg\u00e5ng i motiverande kontext' },
      { milestone: 'Kreativ ber\u00e4ttelseskrivning med struktur', howWeAddress: 'Eleven skapar en superhj\u00e4lte och skriver en ber\u00e4ttelse med inledning, handling och avslutning' },
      { milestone: 'Logikpussel och kodkn\u00e4ckning', howWeAddress: 'Superhj\u00e4ltekoder d\u00e4r eleven anv\u00e4nder talm\u00f6nster och ledtr\u00e5dar f\u00f6r att l\u00f6sa uppdrag' },
      { milestone: 'Symmetri och m\u00f6nster i maskdesign', howWeAddress: 'Eleven ritar symmetriska superhj\u00e4ltemasker och identifierar symmetrilinjer i hj\u00e4ltemotiv' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom 10, ge startmeningar f\u00f6r ber\u00e4ttelsen och f\u00f6renkla logikpusslen med f\u00e4rre steg. F\u00f6r avancerade elever ut\u00f6ka till flerstegsuppdrag, l\u00e5t eleven skriva en l\u00e4ngre hj\u00e4lteserie med dialog och designa komplexa symmetriska masker.',
    parentTakeaway: 'G\u00f6r superhj\u00e4lteleken till l\u00e4rande! L\u00e5t barnet skapa sin egen superhj\u00e4lte med namn och superkraft, och ber\u00e4tta en historia om ett uppdrag. St\u00e4ll ordproblem: \u201dhj\u00e4lten r\u00e4ddade 12 katter och 9 hundar, hur m\u00e5nga djur totalt?\u201d. Rita symmetriska masker med papper och sax. Varje fantasilek blir en chans att tr\u00e4na matte och skrivande.',
    classroomIntegration: 'Superhj\u00e4ltetemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och logikpussel, i svenska skrivs hj\u00e4ltehistorier med ber\u00e4ttandestruktur, i bild skapas symmetriska masker och dr\u00e4kter, i SO diskuteras vardagshj\u00e4ltar i samh\u00e4llet. Rollspel d\u00e4r eleverna \u00e4r superhj\u00e4ltar som l\u00f6ser matematiska uppdrag engagerar hela klassen.',
    assessmentRubric: [
      { skill: 'Ordproblem med hj\u00e4lteuppdrag', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med superhj\u00e4ltetema', advanced: 'l\u00f6ser flerstegsuppdrag och formulerar egna hj\u00e4lteproblem' },
      { skill: 'Kreativ ber\u00e4ttelseskrivning', emerging: 'skriver tv\u00e5 meningar om en hj\u00e4lte med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en kort ber\u00e4ttelse med inledning och avslutning', advanced: 'skriver en l\u00e4ngre ber\u00e4ttelse med dialog, problem och l\u00f6sning' },
      { skill: 'Logikpussel och kodkn\u00e4ckning', emerging: 'l\u00f6ser enkla koder med tv\u00e5 steg och st\u00f6d', proficient: 'kn\u00e4cker sj\u00e4lvst\u00e4ndigt koder med tre ledtr\u00e5dar', advanced: 'skapar egna koder och logikpussel f\u00f6r klasskamrater' },
    ],
  },

  toys: {
    seoTitle: 'Gratis Leksaks\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara leksaks\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, sortering och l\u00e4sf\u00f6rst\u00e5else med leksakstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'leksaks\u00f6vningar \u00e5rskurs 1, leksaker arbetsblad 6\u20137 \u00e5r, ordproblem leksaker, sortering klassificering, Lgr22, prisr\u00e4kning, delning, l\u00e4sf\u00f6rst\u00e5else, material, leksaksaff\u00e4r',
    snippetAnswer: 'Leksaks\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med leksaksaff\u00e4rsscenarier, sortering efter flera kriterier och l\u00e4sf\u00f6rst\u00e5else om leksakens historia och material. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas leksakstemat till prisr\u00e4kning, sortering och textproduktion. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng i en leksaksaff\u00e4r (nallen kostar 15 kr och bilen 7 kr, hur mycket kostar b\u00e5da?), sorterar leksaker efter storlek, material och kategori och l\u00e4ser korta texter om hur leksaker tillverkas. Delnings\u00f6vningar d\u00e4r leksaker f\u00f6rdelas r\u00e4ttvist introducerar tidig division. Skrivuppgifter d\u00e4r eleven beskriver sin favoritloksak tr\u00e4nar beskrivande text med adjektiv. Lgr22 betonar klassificering, vardagsmatematik och beskrivande skrivande, och leksakstemat uppfyller alla m\u00e5len genom barnens k\u00e4rlek till lek och f\u00f6rem\u00e5l.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med addition och subtraktion inom 20 (priser)', howWeAddress: 'Leksaksaff\u00e4rsscenarier d\u00e4r eleven ber\u00e4knar totalpris och v\u00e4xel tr\u00e4nar tiotals\u00f6verg\u00e5ng i vardagskontext' },
      { milestone: 'Sortering och klassificering efter flera kriterier', howWeAddress: 'Eleven sorterar leksaker efter storlek, material och typ och motiverar sina val muntligt' },
      { milestone: 'R\u00e4ttvis delning av leksaker (tidig division)', howWeAddress: 'Delningsuppgifter d\u00e4r leksaker f\u00f6rdelas lika mellan barn bygger konkret divisionsf\u00f6rst\u00e5else' },
      { milestone: 'Beskrivande skrivning om sin favoritloksak', howWeAddress: 'Eleven skriver en text med adjektiv om storlek, f\u00e4rg, material och k\u00e4nsla hos sin favoritloksak' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll priser inom 10, ge f\u00e4rdiga sorteringsmallar och erbjud startmeningar f\u00f6r beskrivande text. F\u00f6r avancerade elever introducera prisr\u00e4kning med v\u00e4xel, l\u00e5t eleven designa en leksaksaff\u00e4r med priser och skriva en j\u00e4mf\u00f6rande text om tv\u00e5 leksaker.',
    parentTakeaway: 'Leksaksl\u00e5dan \u00e4r ett klassrum! L\u00e5t barnet sortera leksaker efter storlek och material, st\u00e4lla ordproblem: \u201dom du har 13 bilar och ger 5 till kompisen, hur m\u00e5nga har du kvar?\u201d. Lek leksaksaff\u00e4r med prislappar och leksakspengar. L\u00e5t barnet beskriva sin favoritloksak med m\u00e5nga ord. Varje lekstund \u00e4r matematik och spr\u00e5k.',
    classroomIntegration: 'Leksakstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och leksaker sorteras, i svenska skrivs beskrivande texter om leksaker, i teknik diskuteras material och tillverkning, i bild designas nya leksaker. En leksaksdag d\u00e4r eleverna tar med en favorit och r\u00e4knar, sorterar och skriver ger autentiskt l\u00e4rande.',
    assessmentRubric: [
      { skill: 'Ordproblem med leksaksaff\u00e4r', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med leksakspriser', advanced: 'l\u00f6ser flerstegsproblem med v\u00e4xel och formulerar egna aff\u00e4rsproblem' },
      { skill: 'Sortering efter flera kriterier', emerging: 'sorterar efter ett kriterium med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 kriterier och motiverar', advanced: 'skapar egna sorteringskategorier och anv\u00e4nder tre kriterier' },
      { skill: 'Beskrivande text om leksaker', emerging: 'skriver tv\u00e5 meningar om en leksak med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en beskrivning med tre adjektiv', advanced: 'skriver en j\u00e4mf\u00f6rande text om tv\u00e5 leksaker med detaljrika beskrivningar' },
    ],
  },

  transportation: {
    seoTitle: 'Gratis Transport\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara transport\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). M\u00e4tning, ordproblem inom 20 och sortering med transporttema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'transport\u00f6vningar \u00e5rskurs 1, fordon arbetsblad 6\u20137 \u00e5r, ordproblem transport, m\u00e4tning avst\u00e5nd, sortering fordon, Lgr22, trafikkunskap, tidtabell, kollektivtrafik, fordonsjmf\u00f6relse',
    snippetAnswer: 'Transport\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar m\u00e4tning av avst\u00e5nd, ordproblem inom 20 med fordonsscenarier och sortering av transportmedel efter kriterier. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas transporttemat till m\u00e4tning, tidsbegrepp och klassificering. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (bussen hade 16 passagerare och 8 steg av, hur m\u00e5nga \u00e4r kvar?), j\u00e4mf\u00f6r fordons l\u00e4ngd i cm och sorterar transportmedel efter mark, vatten och luft. Tidtabells\u00f6vningar d\u00e4r eleven l\u00e4ser av avg\u00e5ngstider introducerar tidsbegrepp. L\u00e4sf\u00f6rst\u00e5elsetexter om kollektivtrafik och trafikkunskap bygger samh\u00e4llsf\u00f6rst\u00e5else. Lgr22 betonar m\u00e4tning, klassificering och samh\u00e4llsorientering, och transporttemat f\u00f6renar alla m\u00e5len genom barnens dagliga upplevelse av fordon och resor.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med addition och subtraktion inom 20', howWeAddress: 'Buss-, t\u00e5g- och bilscenarier (passagerare som stiger p\u00e5/av) tr\u00e4nar tiotals\u00f6verg\u00e5ng i vardagskontext' },
      { milestone: 'M\u00e4tning och j\u00e4mf\u00f6relse av fordons l\u00e4ngd (cm)', howWeAddress: 'Eleven m\u00e4ter fordonsbilder med linjal och j\u00e4mf\u00f6r m\u00e5tt i tabell' },
      { milestone: 'Klassificering av transportmedel (mark, vatten, luft)', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven grupperar fordon efter medium och motiverar sina val' },
      { milestone: 'Tidtabellsl\u00e4sning (hel och halv timme)', howWeAddress: 'F\u00f6renklade tidtabeller d\u00e4r eleven avl\u00e4ser avg\u00e5ngstider och ber\u00e4knar v\u00e4ntetid' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom 10, begr\u00e4nsa tidtabeller till hela timmar och ge bildst\u00f6d vid klassificering. F\u00f6r avancerade elever introducera avst\u00e5ndsber\u00e4kningar med cm och m, l\u00e5t eleven planera en bussrutt p\u00e5 en karta och skriva en informationstext om olika transportmedel.',
    parentTakeaway: 'Varje resa \u00e4r en matteuppgift! L\u00e5t barnet r\u00e4kna bilar av olika f\u00e4rger p\u00e5 v\u00e4gen, l\u00e4sa busstidtabellen och l\u00f6sa problem: \u201dom bussen hade 12 passagerare och 5 steg av, hur m\u00e5nga \u00e4r kvar?\u201d. Sortera leksaksfordon efter typ. Prata om vilka transportmedel ni anv\u00e4nder och varf\u00f6r. Arbetsbladen kopplar direkt till barnets vardagsresor.',
    classroomIntegration: 'Transporttemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och fordon m\u00e4ts, i NO diskuteras milj\u00f6p\u00e5verkan fr\u00e5n olika transportmedel, i svenska l\u00e4ses och skrivs faktatexter om kollektivtrafik, i SO \u00f6vas trafikkunskap och samh\u00e4llsorientering. En trafikvecka med studiebes\u00f6k ger autentiskt l\u00e4rande.',
    assessmentRubric: [
      { skill: 'Ordproblem med transportscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med fordonsscenarier', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna transportmatematikuppgifter' },
      { skill: 'M\u00e4tning av fordon', emerging: 'm\u00e4ter med linjal med st\u00f6d och avl\u00e4ser ungef\u00e4rligt', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i cm och j\u00e4mf\u00f6r fordons l\u00e4ngder', advanced: 'uppskattar l\u00e4ngder f\u00f6re m\u00e4tning och omvandlar cm till m' },
      { skill: 'Klassificering av transportmedel', emerging: 'sorterar efter en kategori med st\u00f6d', proficient: 'grupperar sj\u00e4lvst\u00e4ndigt fordon efter mark, vatten och luft', advanced: 'skapar egna underkategorier och motiverar klassificeringen' },
    ],
  },

  travel: {
    seoTitle: 'Gratis Rese\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara rese\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Kartl\u00e4sning, ordproblem inom 20 och l\u00e4sf\u00f6rst\u00e5else med resetema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'rese\u00f6vningar \u00e5rskurs 1, resor arbetsblad 6\u20137 \u00e5r, kartl\u00e4sning, ordproblem resa, Lgr22, geografi, v\u00e4rldsl\u00e4nder, packning, valuta, resedagbok',
    snippetAnswer: 'Rese\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar enkel kartl\u00e4sning, ordproblem inom 20 med resetemarier och l\u00e4sf\u00f6rst\u00e5else om l\u00e4nder och kulturer. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 \u00f6ppnar resetamat d\u00f6rren till geografisk medvetenhet och vardagsmatematik. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (vi packade 17 saker och 9 f\u00e5r plats i v\u00e4skan, hur m\u00e5nga \u00e4r kvar?), l\u00e4ser enkla kartor med riktningar och avst\u00e5nd, och l\u00e4ser faktatexter om olika l\u00e4nder. R\u00e4kne\u00f6vningar med resebudget och valutaf\u00f6renkling introducerar ekonomiskt t\u00e4nkande. Skrivuppgifter d\u00e4r eleven skriver en resedagbok eller ett vykort tr\u00e4nar textproduktion med mottagare. Lgr22 betonar geografi, vardagsmatematik och kommunikativ skrivning, och resetamat levererar alla m\u00e5len genom barnens dr\u00f6mmar om att utforska v\u00e4rlden.',
    developmentalMilestones: [
      { milestone: 'Enkel kartl\u00e4sning med riktningar', howWeAddress: 'F\u00f6renklade kartor d\u00e4r eleven f\u00f6ljer riktningar (h\u00f6ger, v\u00e4nster, rakt fram) f\u00f6r att n\u00e5 resmlet' },
      { milestone: 'Ordproblem inom 20 med resescenarier', howWeAddress: 'Packnings- och budgetscenarier tr\u00e4nar tiotals\u00f6verg\u00e5ng i motiverande resekontext' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om l\u00e4nder och kulturer', howWeAddress: 'Korta faktatexter om l\u00e4nder med f\u00f6rst\u00e5elsefr\u00e5gor som kr\u00e4ver \u00e5terber\u00e4ttande och slutledning' },
      { milestone: 'Skrivning av vykort och resedagbok', howWeAddress: 'Eleven skriver vykort med mottagare och avsndare, tr\u00e4nar kommunikativ textproduktion' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00f6renklade kartor med f\u00e4rre steg, h\u00e5ll ordproblem inom 10 och erbjud vykortmallar med startmeningar. F\u00f6r avancerade elever introducera avst\u00e5ndsber\u00e4kningar p\u00e5 kartan, l\u00e5t eleven planera en drömresa med budget och skriva en l\u00e4ngre resedagbok.',
    parentTakeaway: 'Varje resa, \u00e4ven till matbutiken, kan bli ett \u00e4ventyr! L\u00e5t barnet l\u00e4sa kartan p\u00e5 telefonen, r\u00e4kna f\u00f6rem\u00e5l i v\u00e4skan och l\u00f6sa problem: \u201dom vi packar 14 grejer och tar bort 6, hur m\u00e5nga \u00e4r kvar?\u201d. Skriv vykort till mormor fr\u00e5n semestern. Titta p\u00e5 en v\u00e4rldskarta och peka p\u00e5 l\u00e4nder. Arbetsbladen kopplar direkt till familjens reseupplevelser.',
    classroomIntegration: 'Resetamat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och enkel kartl\u00e4sning \u00f6vas, i SO studeras l\u00e4nder och kulturer med geografi, i svenska skrivs vykort och resedagb\u00f6cker, i bild m\u00e5las resmotiv fr\u00e5n olika l\u00e4nder. En tematisk resevecka d\u00e4r klassen \u201dbes\u00f6ker\u201d ett nytt land varje dag ger rik kontext.',
    assessmentRubric: [
      { skill: 'Kartl\u00e4sning med riktningar', emerging: 'f\u00f6ljer en enkel rutt med tv\u00e5 steg och st\u00f6d', proficient: 'navigerar sj\u00e4lvst\u00e4ndigt p\u00e5 en karta med fyra riktningar', advanced: 'planerar en egen rutt p\u00e5 en karta och f\u00f6rklarar valet' },
      { skill: 'Ordproblem med resetema', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med resescenarier', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna resebudgetproblem' },
      { skill: 'Vykort- och dagboksskrivning', emerging: 'skriver tv\u00e5 meningar p\u00e5 ett vykort med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt ett vykort med h\u00e4lsning, inneh\u00e5ll och avslutning', advanced: 'skriver en dagbokstext med tidsord och detaljerade beskrivningar' },
    ],
  },

  vegetables: {
    seoTitle: 'Gratis Gr\u00f6nsaks\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara gr\u00f6nsaks\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). V\u00e4gning, ordproblem inom 20 och h\u00e4lsokunskap med gr\u00f6nsakstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'gr\u00f6nsaks\u00f6vningar \u00e5rskurs 1, gr\u00f6nsaker arbetsblad 6\u20137 \u00e5r, ordproblem gr\u00f6nsaker, v\u00e4gning, h\u00e4lsokunskap, Lgr22, tallriksmodellen, matlagning, datainsamling, odling',
    snippetAnswer: 'Gr\u00f6nsaks\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar v\u00e4gning och j\u00e4mf\u00f6relse, ordproblem inom 20 med gr\u00f6nsaksscenarier och l\u00e4sf\u00f6rst\u00e5else om h\u00e4lsa och n\u00e4ring. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas gr\u00f6nsakstemat till v\u00e4gning, h\u00e4lsokunskap och vardagsmatematik. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (vi sk\u00f6rdade 15 mor\u00f6tter och \u00e5t 8, hur m\u00e5nga \u00e4r kvar?), v\u00e4ger gr\u00f6nsaker med balansv\u00e5g och j\u00e4mf\u00f6r vikter, och l\u00e4ser korta faktatexter om tallriksmodellen och varf\u00f6r gr\u00f6nsaker \u00e4r h\u00e4lsosamma. Datainsamling d\u00e4r eleven unders\u00f6ker klassens favoritgr\u00f6nsaker och redovisar i diagram ger statistisk erfarenhet. Recept\u00f6vningar d\u00e4r eleven dubblerar m\u00e4ngder introducerar tidig multiplikation. Lgr22 betonar m\u00e4tning, h\u00e4lsa och dataredovisning, och gr\u00f6nsakstemat uppfyller alla m\u00e5len genom barnens vardagliga m\u00f6te med mat.',
    developmentalMilestones: [
      { milestone: 'V\u00e4gning och j\u00e4mf\u00f6relse med balansv\u00e5g', howWeAddress: 'Eleven v\u00e4ger gr\u00f6nsaker p\u00e5 balansv\u00e5g, j\u00e4mf\u00f6r tyngre/l\u00e4ttare och sorterar efter vikt' },
      { milestone: 'Ordproblem inom 20 med gr\u00f6nsaksscenarier', howWeAddress: 'Sk\u00f6rd-, matlagnings- och aff\u00e4rsscenarier tr\u00e4nar tiotals\u00f6verg\u00e5ng i vardagskontext' },
      { milestone: 'Datainsamling om favoritgr\u00f6nsaker', howWeAddress: 'Eleven g\u00f6r en klassunders\u00f6kning om favoritgr\u00f6nsaker och redovisar i stapeldiagram' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om n\u00e4ring och tallriksmodellen', howWeAddress: 'Faktatexter om gr\u00f6nsakers n\u00e4ringsinneh\u00e5ll med f\u00f6rst\u00e5elsefr\u00e5gor som kr\u00e4ver \u00e5terber\u00e4ttande och slutledning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa v\u00e4gning till tyngre/l\u00e4ttare utan siffror, h\u00e5ll ordproblem inom 10 och l\u00e4s texter h\u00f6gt. F\u00f6r avancerade elever introducera v\u00e4gning i gram, l\u00e5t eleven skapa en receptbok med dubblade m\u00e4ngder och skriva en j\u00e4mf\u00f6rande text om tv\u00e5 gr\u00f6nsaker.',
    parentTakeaway: 'G\u00f6r matlagningen till ett klassrum! L\u00e5t barnet v\u00e4ga gr\u00f6nsaker i k\u00f6ket, l\u00f6sa ordproblem: \u201dom vi har 12 tomater och anv\u00e4nder 7 till s\u00e5s, hur m\u00e5nga har vi kvar?\u201d. Bes\u00f6k gr\u00f6nsaksst\u00e5ndet p\u00e5 marknaden och r\u00e4kna. Prata om tallriksmodellen och varf\u00f6r vi beh\u00f6ver gr\u00f6nsaker. Varje m\u00e5ltid \u00e4r en m\u00f6jlighet till l\u00e4rande.',
    classroomIntegration: 'Gr\u00f6nsakstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik v\u00e4gs gr\u00f6nsaker och data redovisas, i NO studeras n\u00e4ring och tallriksmodellen, i svenska l\u00e4ses och skrivs faktatexter om h\u00e4lsa, i HKK lagas soppa eller sallad med r\u00e4kning av ingredienser. En smakdag d\u00e4r eleverna provar och r\u00e4knar ger autentiskt l\u00e4rande.',
    assessmentRubric: [
      { skill: 'V\u00e4gning och j\u00e4mf\u00f6relse', emerging: 'bed\u00f6mer tyngre/l\u00e4ttare genom att h\u00e5lla gr\u00f6nsaker i h\u00e4nderna', proficient: 'anv\u00e4nder balansv\u00e5g sj\u00e4lvst\u00e4ndigt och j\u00e4mf\u00f6r vikter', advanced: 'uppskattar vikt f\u00f6re v\u00e4gning och anv\u00e4nder gram med f\u00f6rst\u00e5else' },
      { skill: 'Ordproblem med gr\u00f6nsakstema', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med gr\u00f6nsaksscenarier', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna receptmatematikuppgifter' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om n\u00e4ring', emerging: '\u00e5terger ett faktum fr\u00e5n en kort text med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor om en n\u00e4ringstext', advanced: 'j\u00e4mf\u00f6r information fr\u00e5n tv\u00e5 texter och drar egna slutsatser om h\u00e4lsa' },
    ],
  },

  weather: {
    seoTitle: 'Gratis V\u00e4der\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara v\u00e4der\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Temperaturavl\u00e4sning, datainsamling och l\u00e4sf\u00f6rst\u00e5else med v\u00e4dertema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'v\u00e4der\u00f6vningar \u00e5rskurs 1, v\u00e4der arbetsblad 6\u20137 \u00e5r, temperatur termometer, datainsamling v\u00e4der, ordproblem, Lgr22, v\u00e4dertyper, molnbilder, nederb\u00f6rd, \u00e5rstider',
    snippetAnswer: 'V\u00e4der\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar temperaturavl\u00e4sning, datainsamling om v\u00e4dertyper och l\u00e4sf\u00f6rst\u00e5else om vind, nederb\u00f6rd och \u00e5rstider. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas v\u00e4dertemat till termometeravl\u00e4sning, systematisk datainsamling och naturvetenskapligt ordforr\u00e5d. Sex- och sju\u00e5ringar l\u00e4ser av temperaturer p\u00e5 en termometer, f\u00f6r v\u00e4derdagbok \u00f6ver veckor och redovisar i stapeldiagram (hur m\u00e5nga soliga, regniga, molniga dagar?). Ordproblem med tiotals\u00f6verg\u00e5ng kopplas till v\u00e4derdata (det regnade 13 mm p\u00e5 m\u00e5ndag och 8 mm p\u00e5 tisdag, hur mycket totalt?). L\u00e4sf\u00f6rst\u00e5elsetexter om vattnets kretslopp och v\u00e4derfenomen ger vetenskaplig grund. Lgr22 betonar naturvetenskapligt unders\u00f6kande, dataredovisning och m\u00e4tning, och v\u00e4dertemat ger den mest repeterbara och tillg\u00e4ngliga kontexten eftersom v\u00e4dret \u00e4ndras varje dag.',
    developmentalMilestones: [
      { milestone: 'Termometeravl\u00e4sning och temperaturf\u00f6rst\u00e5else', howWeAddress: 'Eleven l\u00e4ser av termometrar med heltal, j\u00e4mf\u00f6r dagliga temperaturer och identifierar varmare/kallare' },
      { milestone: 'Systematisk datainsamling \u00f6ver tid', howWeAddress: 'V\u00e4derdagbok d\u00e4r eleven dokumenterar v\u00e4dertyp och temperatur dagligen i fyra veckor' },
      { milestone: 'Redovisning i stapeldiagram', howWeAddress: 'Eleven sammanst\u00e4ller v\u00e4derdata fr\u00e5n dagboken och skapar stapeldiagram med tolkningsfr\u00e5gor' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om vattnets kretslopp', howWeAddress: 'Faktatexter om avdunstning, moln och nederb\u00f6rd med sekvenserings- och f\u00f6rst\u00e5elsefr\u00e5gor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd f\u00f6renklade termometrar med f\u00e4rre skalstreck, ge f\u00e4rdiga dagboksmallar med bilder och l\u00e4s faktatexter h\u00f6gt. F\u00f6r avancerade elever introducera negativa temperaturer, l\u00e5t eleven j\u00e4mf\u00f6ra v\u00e4derdata fr\u00e5n tv\u00e5 orter och skriva en v\u00e4derrapport.',
    parentTakeaway: 'V\u00e4dret \u00e4r det enklaste l\u00e4rande\u00e4mnet som finns! L\u00e5t barnet l\u00e4sa av termometern varje morgon, f\u00f6ra v\u00e4derdagbok och l\u00f6sa problem: \u201dom det var 12 grader ig\u00e5r och 8 grader idag, hur stor \u00e4r skillnaden?\u201d. Rita v\u00e4dersymboler f\u00f6r en hel vecka. Prata om molntyper p\u00e5 promenaden. Varje blick ut genom f\u00f6nstret \u00e4r vetenskap och matematik.',
    classroomIntegration: 'V\u00e4dertemat i \u00e5rskurs 1 integreras med Lgr22: i matematik avl\u00e4ses termometrar och data redovisas i diagram, i NO studeras vattnets kretslopp och v\u00e4derfenomen, i svenska skrivs v\u00e4derdagb\u00f6cker och l\u00e4ses faktatexter, i bild m\u00e5las v\u00e4derscener. En v\u00e4derstation i klassrummet ger daglig data f\u00f6r arbetsbladen.',
    assessmentRubric: [
      { skill: 'Termometeravl\u00e4sning', emerging: 'avl\u00e4ser temperatur med st\u00f6d p\u00e5 f\u00f6renklad termometer', proficient: 'avl\u00e4ser sj\u00e4lvst\u00e4ndigt temperatur i hela grader och j\u00e4mf\u00f6r', advanced: 'avl\u00e4ser negativa temperaturer och ber\u00e4knar temperaturskillnader' },
      { skill: 'V\u00e4derdatainsamling och diagram', emerging: 'dokumenterar en v\u00e4dertyp per dag med bildst\u00f6d', proficient: 'f\u00f6r sj\u00e4lvst\u00e4ndigt v\u00e4derdagbok och redovisar i stapeldiagram', advanced: 'tolkar diagramdata, identifierar m\u00f6nster och drar slutsatser' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om vattnets kretslopp', emerging: '\u00e5terger ett steg i kretsloppet med st\u00f6d', proficient: 'f\u00f6rklarar sj\u00e4lvst\u00e4ndigt tre steg i vattnets kretslopp', advanced: 'kopplar kretsloppet till v\u00e4derfenomen och f\u00f6rklarar samband' },
    ],
  },

  winter: {
    seoTitle: 'Gratis Vinter\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara vinter\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Temperatur, ordproblem inom 20 och l\u00e4sf\u00f6rst\u00e5else med vintertema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'vinter\u00f6vningar \u00e5rskurs 1, vinter arbetsblad 6\u20137 \u00e5r, sn\u00f6 matematik, temperatur termometer, ordproblem vinter, Lgr22, is, vinterdj\u00e4r, snflinga symmetri, vinterid\u00e5tt',
    snippetAnswer: 'Vinter\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar temperaturavl\u00e4sning, ordproblem inom 20 med sn\u00f6- och isscenarier och l\u00e4sf\u00f6rst\u00e5else om vinternaturen. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 levererar vintertemat rik matematik och naturvetenskap genom sn\u00f6, is och kyla. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (det f\u00f6ll 16 cm sn\u00f6 p\u00e5 natten och 5 cm sm\u00e4lte, hur mycket \u00e4r kvar?), l\u00e4ser av termometrar med negativa tal och skapar symmetriska sn\u00f6flingor som tr\u00e4nar rumsligt t\u00e4nkande. M\u00e4tning av sn\u00f6djup i centimeter kopplar utomhusupplevelsen till matematiska enheter. L\u00e4sf\u00f6rst\u00e5elsetexter om vinterdjur, vintervila och vattnets fryspunkt ger naturvetenskapligt ordforr\u00e5d. Lgr22 betonar m\u00e4tning, symmetri och naturvetenskapligt unders\u00f6kande, och vintertemat ger en engagerande kontext som \u00e4r s\u00e4rskilt relevant i Sveriges l\u00e5nga vintrar.',
    developmentalMilestones: [
      { milestone: 'Temperaturavl\u00e4sning inklusive negativa tal', howWeAddress: 'Eleven l\u00e4ser av vintertermometrar med temperaturer under noll och j\u00e4mf\u00f6r dagliga m\u00e4tv\u00e4rden' },
      { milestone: 'Ordproblem inom 20 med sn\u00f6scenarier', howWeAddress: 'Sn\u00f6djups- och isscenarier tr\u00e4nar tiotals\u00f6verg\u00e5ng i vintrig kontext' },
      { milestone: 'Symmetri med sn\u00f6flingor', howWeAddress: 'Eleven klipper och ritar symmetriska sn\u00f6flingor och identifierar symmetrilinjer' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om vinterdjur och vintervila', howWeAddress: 'Faktatexter om hur djur \u00f6verlever vintern med f\u00f6rst\u00e5elsefr\u00e5gor och sekvenserings\u00f6vningar' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa termometrar till positiva tal, h\u00e5ll ordproblem inom 10 och ge f\u00e4rdiga symmetrimallar. F\u00f6r avancerade elever introducera temperaturskillnader med negativa tal, l\u00e5t eleven j\u00e4mf\u00f6ra sn\u00f6djup \u00f6ver veckor och skriva en vetenskaplig rapport om vinterdjurs strategier.',
    parentTakeaway: 'Vintern \u00e4r ett naturligt labb! L\u00e5t barnet m\u00e4ta sn\u00f6djupet med linjal, l\u00e4sa av utetermometern och l\u00f6sa problem: \u201dom det f\u00f6ll 13 cm sn\u00f6 och 5 sm\u00e4lte, hur mycket finns kvar?\u201d. Klipp symmetriska sn\u00f6flingor. Prata om vilka djur som sover p\u00e5 vintern och varf\u00f6r vatten fryser. Varje sn\u00f6dag \u00e4r vetenskap och matematik.',
    classroomIntegration: 'Vintertemat i \u00e5rskurs 1 integreras med Lgr22: i matematik avl\u00e4ses termometrar och sn\u00f6djup m\u00e4ts, i NO studeras vinterdjur och vattnets faser, i svenska skrivs vinterdagb\u00f6cker och l\u00e4ses faktatexter, i bild skapas symmetriska sn\u00f6flingor. Utomhusundervisning med m\u00e4tuppgifter ger verklig data under vinterm\u00e5naderna.',
    assessmentRubric: [
      { skill: 'Temperaturavl\u00e4sning vintertid', emerging: 'avl\u00e4ser positiva temperaturer med st\u00f6d', proficient: 'avl\u00e4ser sj\u00e4lvst\u00e4ndigt temperaturer inklusive negativa tal', advanced: 'ber\u00e4knar temperaturskillnader och f\u00f6rklarar samband med v\u00e4der' },
      { skill: 'Ordproblem med sn\u00f6terta', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med vintertema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna vintermatematikuppgifter' },
      { skill: 'Symmetri med sn\u00f6flingor', emerging: 'identifierar symmetri i f\u00e4rdiga m\u00f6nster med st\u00f6d', proficient: 'ritar sj\u00e4lvst\u00e4ndigt symmetriska sn\u00f6flingor med en symmetrilinje', advanced: 'skapar komplexa symmetriska m\u00f6nster med tv\u00e5 symmetrilinjer' },
    ],
  },

  xmas: {
    seoTitle: 'Gratis Jul\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara jul\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, m\u00f6nster och kreativ skrivning med jultema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'jul\u00f6vningar \u00e5rskurs 1, jul arbetsblad 6\u20137 \u00e5r, julmatematik, ordproblem jul, m\u00f6nster julgranskulor, Lgr22, julkalender, klappmatematik, adventskalender, julber\u00e4ttelse',
    snippetAnswer: 'Jul\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med klappscenarier, m\u00f6nsterigenk\u00e4nning med julmotiv och kreativ ber\u00e4ttelseskrivning om julen. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 f\u00f6rvandlar jultemat r\u00e4kning och skrivning till ren gl\u00e4dje. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (tomten hade 18 klappar och delade ut 9, hur m\u00e5nga har han kvar?), skapar m\u00f6nster med julgranskulor och stjrnor, och skriver en julber\u00e4ttelse med inledning, handling och avslutning. Delnings\u00f6vningar d\u00e4r julklappar f\u00f6rdelas r\u00e4ttvist introducerar tidig division. Adventsmatematik d\u00e4r eleven \u00f6ppnar en matteuppgift per dag bygger daglig rutin. L\u00e4sf\u00f6rst\u00e5else om jultr\u00e5ditioner i olika l\u00e4nder ger kulturell bredd. Lgr22 betonar m\u00f6nster, ber\u00e4ttelseskrivning och kulturf\u00f6rst\u00e5else, och jultemat levererar alla m\u00e5len genom barnens f\u00f6rv\u00e4ntansfulla gl\u00e4dje inf\u00f6r h\u00f6gtidem.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med addition och subtraktion inom 20', howWeAddress: 'Klappr\u00e4knings- och adventsscenarier tr\u00e4nar tiotals\u00f6verg\u00e5ng i lustfylld julkontext' },
      { milestone: 'R\u00e4ttvis delning av julklappar (tidig division)', howWeAddress: 'Julklappf\u00f6rdelning d\u00e4r eleven delar lika mellan familjemedlemmar bygger konkret divisionsf\u00f6rst\u00e5else' },
      { milestone: 'M\u00f6nsterigenk\u00e4nning med julmotiv', howWeAddress: 'Sekvenser med kulor, stj\u00e4rnor och granar d\u00e4r eleven identifierar regeln och forts\u00e4tter m\u00f6nstret' },
      { milestone: 'Kreativ ber\u00e4ttelseskrivning (julber\u00e4ttelse)', howWeAddress: 'Eleven skriver en kort julber\u00e4ttelse med inledning, h\u00e4ndelse och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom 10, ge bildst\u00f6d vid delning och erbjud startmeningar f\u00f6r julber\u00e4ttelsen. F\u00f6r avancerade elever introducera flerstegsordproblem med tre operationer, delning med rest och l\u00e5t eleven skriva en l\u00e4ngre julber\u00e4ttelse med dialog och kapitelindelning.',
    parentTakeaway: 'Julen \u00e4r full av mattem\u00f6jligheter! L\u00e5t barnet r\u00e4kna julklappar under granen, dela pepparkakor lika mellan familjemedlemmar och l\u00f6sa problem: \u201dom tomten hade 16 klappar och gav bort 9, hur m\u00e5nga har han kvar?\u201d. G\u00f6r en adventsmatematik d\u00e4r barnet l\u00f6ser en uppgift per dag. Skriv en julber\u00e4ttelse tillsammans f\u00f6re l\u00e4ggdags. Varje jultradition \u00e4r l\u00e4rande.',
    classroomIntegration: 'Jultemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och m\u00f6nster \u00f6vas med julmotiv, i svenska skrivs julber\u00e4ttelser och l\u00e4ses jultexter, i bild skapas juldekorationer med symmetri, i SO diskuteras jultr\u00e5ditioner i olika l\u00e4nder. En adventsvecka med dagliga matteuppgifter skapar sp\u00e4nning och rutin.',
    assessmentRubric: [
      { skill: 'Ordproblem med julscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med jultema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna julmatematikuppgifter' },
      { skill: 'M\u00f6nster med julmotiv', emerging: 'forts\u00e4tter AB-m\u00f6nster med st\u00f6d', proficient: 'identifierar och forts\u00e4tter ABC-m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'skapar egna m\u00f6nster med fyra element och f\u00f6rklarar regeln' },
      { skill: 'Julber\u00e4ttelseskrivning', emerging: 'skriver tv\u00e5 meningar om julen med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en kort ber\u00e4ttelse med inledning och avslutning', advanced: 'skriver en l\u00e4ngre ber\u00e4ttelse med dialog, problem och l\u00f6sning' },
    ],
  },

  zoo: {
    seoTitle: 'Gratis Djurparks\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara djurparks\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, klassificering och l\u00e4sf\u00f6rst\u00e5else med djurparkstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'djurparks\u00f6vningar \u00e5rskurs 1, djurpark arbetsblad 6\u20137 \u00e5r, ordproblem djur, klassificering djurgrupper, Lgr22, hotade arter, d\u00e4ggdjur reptiler, datainsamling, j\u00e4mf\u00f6relse storlek, djurv\u00e5rd',
    snippetAnswer: 'Djurparks\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med djurscenarier, klassificering i djurgrupper och l\u00e4sf\u00f6rst\u00e5else om djurs livsmilj\u00f6er och skydd. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kombinerar djurparkstemat matematisk probleml\u00f6sning med klassificering och naturvetenskaplig kunskap. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (djurparken har 14 apor och 8 \u00e4r ute, hur m\u00e5nga \u00e4r inne?), klassificerar djur i grupper (d\u00e4ggdjur, f\u00e5glar, reptiler) och j\u00e4mf\u00f6r djurs storlek och vikt med enkel m\u00e4tning. Datainsamling d\u00e4r eleven r\u00e4knar djurtyper p\u00e5 en karta och redovisar i diagram ger statistisk erfarenhet. L\u00e4sf\u00f6rst\u00e5elsetexter om hotade arter och naturvrd v\u00e4cker medvetenhet och empati. Lgr22 betonar klassificering, dataredovisning och milj\u00f6medvetenhet, och djurparkstemat uppfyller alla m\u00e5len genom barnens fascination f\u00f6r exotiska djur.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med addition och subtraktion inom 20', howWeAddress: 'Djurparksscenarier (djur i h\u00e4gn, biljettpriser) tr\u00e4nar tiotals\u00f6verg\u00e5ng i engagerande kontext' },
      { milestone: 'Klassificering av djur i grupper', howWeAddress: 'Eleven sorterar djur i d\u00e4ggdjur, f\u00e5glar, reptiler och motiverar sina val med djurens egenskaper' },
      { milestone: 'Datainsamling och diagramredovisning', howWeAddress: 'Eleven r\u00e4knar djurtyper p\u00e5 en djurparkskarta och redovisar i stapeldiagram' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om djurs livsmilj\u00f6er', howWeAddress: 'Faktatexter om var djur lever och varf\u00f6r vissa \u00e4r hotade med f\u00f6rst\u00e5elsefr\u00e5gor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa klassificering till tv\u00e5 grupper, h\u00e5ll ordproblem inom 10 och l\u00e4s faktatexter h\u00f6gt. F\u00f6r avancerade elever ut\u00f6ka till fyra djurgrupper inklusive groddjur, l\u00e5t eleven skapa en egen djurparksguide och skriva en vetenskaplig text om ett hotat djur.',
    parentTakeaway: 'G\u00f6r djurparksbes\u00f6ket till en l\u00e4randeupplevelse! L\u00e5t barnet r\u00e4kna djur i varje h\u00e4gn, l\u00f6sa ordproblem: \u201dom djurparken har 15 apor och 7 \u00e4r ute, hur m\u00e5nga \u00e4r inne?\u201d. Sortera djur i grupper (d\u00e4ggdjur, f\u00e5glar, reptiler). L\u00e4s skyltar och prata om varf\u00f6r vissa djur \u00e4r hotade. \u00c4ven en virtuell djurparkstur hemma blir l\u00e4rande med arbetsbladen.',
    classroomIntegration: 'Djurparkstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och djurdata redovisas, i NO klassificeras djur och livsmilj\u00f6er studeras, i svenska l\u00e4ses och skrivs faktatexter om djurarter, i geografi kopplas djur till kontinenter. Ett djurparksprojekt d\u00e4r klassen \u201dadopterar\u201d ett djur och forskar om det ger djup tematisk kontext.',
    assessmentRubric: [
      { skill: 'Ordproblem med djurparksscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med djurtema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna djurparksmatematikuppgifter' },
      { skill: 'Klassificering i djurgrupper', emerging: 'sorterar djur i tv\u00e5 grupper med bildst\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt djur i tre grupper och motiverar', advanced: 'klassificerar i fyra grupper med f\u00f6rklaring av varje grupps egenskaper' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om djurs livsmilj\u00f6er', emerging: '\u00e5terger ett faktum fr\u00e5n en kort text med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor om djurtexter', advanced: 'j\u00e4mf\u00f6r tv\u00e5 djurs livsmilj\u00f6er och drar egna slutsatser' },
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
