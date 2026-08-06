#!/usr/bin/env node
/**
 * SEO Part 222: DA Preschool Grade Enrichment — Themes 39-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 12 DA theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    snippetAnswer: `Sport-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger bolde, l\u00f8b og hop til t\u00e6lling, matchning og farvel\u00e6gning, der styrker grovmotorik og tidlig talforst\u00e5else. Sportens energi og bev\u00e6gelsesgl\u00e6de driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Sporttemaet er ideelt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige oplever idraet som ren bev\u00e6gelsesgl\u00e6de \u2014 de l\u00f8ber, hopper og kaster uden regler eller konkurrence, og denne kropslige energi kan kanaliseres direkte ind i l\u00e6ring. T\u00e6lling af bolde, spillere og m\u00e5l giver matematik en fysisk dimension. Matchning af udstyr til sportsgrene opbygger kategorisering. Farvel\u00e6gning af runde bolde og buede bev\u00e6gelseslinjer tr\u00e6ner finmotorik. Skyggematch med sportssilhuetter styrker visuel skelneevne. F\u00e6lles M\u00e5ls m\u00e5l for krop, bev\u00e6gelse og sundhed underst\u00f8ttes direkte, n\u00e5r sportsarbejdsark parres med aktiv leg.`,
    developmentalMilestones: [
      { milestone: `Grovmotorisk koordination (3\u20134-\u00e5rige udvikler l\u00f8b, hop og kast)`, howWeAddress: `Sportsaktiviteter p\u00e5 arbejdsark parres med korte bev\u00e6gelsespauser, der bygger bro mellem papirl\u00e6ring og kropslig udfoldelse` },
      { milestone: `T\u00e6lling med konkrete genstande (opbygning af en-til-en-korrespondance)`, howWeAddress: `T\u00e6lleaktiviteter med bolde, m\u00e5l og spillere g\u00f8r matematik fysisk og h\u00e5ndgribelig` },
      { milestone: `Kategorisering efter funktion (at forst\u00e5, at genstande h\u00f8rer til bestemte aktiviteter)`, howWeAddress: `Matchning af udstyr til sportsgrene (bold til fodbold, ketcher til tennis) opbygger logisk klassificering` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, begr\u00e6ns til tre velkendte sportsgrene (fodbold, l\u00f8b, sv\u00f8mning), brug rigtige bolde som supplement, og par altid arbejdsark med fysisk aktivitet. For avancerede f\u00f8rskoleb\u00f8rn udvid med flere sportsgrene, introduc\u00e9r enkel pointt\u00e6lling (hvem scorede flest?) og lad dem tegne deres egen yndlingssport.`,
    parentTakeaway: `Sport er overalt i barnets hverdag. L\u00f8b en stafet i haven og t\u00e6l omgangene, kast en bold og t\u00e6l vellykkede fangster, spark til m\u00e5l og f\u00f8r stilling p\u00e5 papir. Tilmeld barnet i en lokal idraetsforening og tal om, hvad de l\u00e6rte: hvor mange b\u00f8rn var p\u00e5 holdet, hvem scorede, hvad hjalp. Bev\u00e6gelse og tal h\u00f8rer naturligt sammen.`,
    classroomIntegration: `Sporttemaet integreres i f\u00f8rskolens bev\u00e6gelsesrutiner: i gymnastiksalen parres fysisk aktivitet med t\u00e6lle\u00f8velser, ved l\u00e6ringsstationer arbejdes med matchnings- og t\u00e6lleark, i samlingen vises billeder af danske sportsgrene, og p\u00e5 legepladsen leges de sportsgrene, arbejdsarkene handler om. F\u00e6lles M\u00e5ls m\u00e5l for krop, sundhed og bev\u00e6gelse underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `T\u00e6lling med sportsgenstande`, emerging: `t\u00e6ller 1\u20135 bolde/spillere med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 sportsgenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere fodbolde end basketbolde)` },
      { skill: `Sportsudstyrs-matchning`, emerging: `matcher 2\u20133 genstande med sportsgrene med st\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 5\u20136 stykker udstyr med korrekt sportsgren`, advanced: `matcher alt udstyr og forklarer, hvad man g\u00f8r med det i hver sportsgren` },
      { skill: `Sportsgenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 sportsgrene med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 sportsgrene og beskriver grundbev\u00e6gelsen`, advanced: `navngiver 8+ sportsgrene og fort\u00e6ller om udstyr og regler` },
    ],
  },

  spring: {
    snippetAnswer: `For\u00e5rs-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger blomster, sommerfugle og regnbuer til t\u00e6lling, matchning og farvel\u00e6gning, der styrker naturforst\u00e5else og finmotorik. \u00c5rstidens fornyelse fascinerer sm\u00e5 b\u00f8rn. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `For\u00e5rstemaet er s\u00e6rligt kraftfuldt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige oplever \u00e5rstidsskiftet med hele kroppen \u2014 de peger p\u00e5 de f\u00f8rste blomster, jager sommerfugle og plasker i vandpytter med en begejstring, der g\u00f8r for\u00e5ret til det perfekte l\u00e6ringstema. V\u00e6ksten fra fr\u00f8 til blomst giver en konkret model for sekvensering. T\u00e6lling af kronblade, marieh\u00f8ns og regn\u00e5ber g\u00f8r matematik sanselig. Farvel\u00e6gning af blomster med tydelige konturer tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for naturfag og sanseoplevelser underst\u00f8ttes direkte, n\u00e5r for\u00e5rsarbejdsark parres med udforskning udend\u00f8rs.`,
    developmentalMilestones: [
      { milestone: `Naturlig nysgerrighed om v\u00e6kst (3\u20134-\u00e5rige begynder at l\u00e6gge m\u00e6rke til forandring i naturen)`, howWeAddress: `Sekvenserings\u00f8velser med fr\u00f8-til-blomst-stadier g\u00f8r v\u00e6kstbegrebet visuelt og forst\u00e5eligt` },
      { milestone: `T\u00e6lling i sansem\u00e6ttede scener (opbygning af visuel s\u00f8gef\u00e6rdighed)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter med sommerfugle, blomster og marieh\u00f8ns i for\u00e5rsscener tr\u00e6ner b\u00e5de t\u00e6lling og observation` },
      { milestone: `Farve- og formgenkendelse (f\u00f8rskoleb\u00f8rn udvider deres farvevokabular)`, howWeAddress: `For\u00e5rets rige farvepalet bruger blomster og regnbuer til at navngive og sortere farver i meningsfuld kontekst` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte elementer (blomst, sommerfugl, sol), brug rigtige blomster og blade som supplement, og hold aktiviteterne korte og sanselige. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j sekvensering af v\u00e6kstfaser, introduc\u00e9r bogstavsporing af for\u00e5rsord og lad dem plante fr\u00f8 og f\u00f8lge spiringen.`,
    parentTakeaway: `For\u00e5ret sker lige uden for vinduet. G\u00e5 p\u00e5 tur og t\u00e6l blomster, sommerfugle og fugle. Plant fr\u00f8 i en potte p\u00e5 vindueskarmen og lad barnet m\u00e5le v\u00e6ksten. Saml blade og kronblade og sorter dem efter farve. Tag et for\u00e5rs-malebillede med udend\u00f8rs og farvel\u00e6g det ved siden af rigtige blomster. Naturen er det bedste klasselokale.`,
    classroomIntegration: `For\u00e5rstemaet f\u00f8lger naturens kalender: i samlingen vises rigtige blomster og knopper, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og sekvenserings\u00f8velser, i sansebakken plantes fr\u00f8 i jord, og p\u00e5 ture observeres for\u00e5rets forandringer. F\u00e6lles M\u00e5ls m\u00e5l for natur, \u00e5rstider og sanseoplevelser underst\u00f8ttes gennem hele for\u00e5ret.`,
    assessmentRubric: [
      { skill: `T\u00e6lling i for\u00e5rsscener`, emerging: `t\u00e6ller 1\u20135 blomster/sommerfugle med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 for\u00e5rsgenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere tulipaner end p\u00e5skeliljer)` },
      { skill: `V\u00e6kstsekvensering`, emerging: `ordner 2 trin (fr\u00f8, blomst) med voksenst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 3 v\u00e6kstfaser i korrekt r\u00e6kkef\u00f8lge`, advanced: `ordner 4\u20135 faser og forklarer, hvad der sker i hvert trin` },
      { skill: `For\u00e5rsgenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 for\u00e5rselementer med st\u00f8tte (blomst, sol)`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 for\u00e5rsgenstande og beskriver dem`, advanced: `navngiver 8+ elementer og bruger beskrivende ord om \u00e5rstiden` },
    ],
  },

  summer: {
    snippetAnswer: `Sommer-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger sol, strand og is til t\u00e6lling, matchning og farvel\u00e6gning, der styrker sanseoplevelser og tidlig matematik. Sommerens frihed og udend\u00f8rsliv driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Sommertemaet er perfekt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige oplever sommeren som \u00e5rets mest sansem\u00e6ttede tid \u2014 sand mellem t\u00e6erne, vandleg, is i solen og lange lyse aftener fylder dem med gl\u00e6de og energi. Denne sanselige rigdom g\u00f8r sommerarbejdsark yderst motiverende. T\u00e6lling af muslingeskaller, iskugler og sandslotte g\u00f8r matematik konkret. Matchning af strandgenstande opbygger kategorisering. Farvel\u00e6gning af solskinsscener med klare farver tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for sanseoplevelser og udend\u00f8rsl\u00e6ring underst\u00f8ttes ideelt.`,
    developmentalMilestones: [
      { milestone: `Sensorisk udforskning (3\u20134-\u00e5rige l\u00e6rer gennem ber\u00f8ring, smag og syn)`, howWeAddress: `Sommerscener med sand, vand og is inviterer til multisensoriske forbindelser mellem arbejdsark og virkelige oplevelser` },
      { milestone: `T\u00e6lling af naturlige samlinger (b\u00f8rn samler ting og t\u00e6ller dem)`, howWeAddress: `T\u00e6lleaktiviteter med muslingeskaller, sandslotte og iskugler parres med rigtig indsamling p\u00e5 stranden eller i haven` },
      { milestone: `Farvegenkendelse i naturlige omgivelser (sommeren er rig p\u00e5 klare farver)`, howWeAddress: `Farvel\u00e6gnings- og sorteringsaktiviteter med sommergenstande i stærke farver styrker farvevokabularet` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte elementer (sol, is, bold), brug rigtige muslingeskaller og sand som supplement, og hold aktiviteterne sansem\u00e6ttede. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j t\u00e6lling over 10, introduc\u00e9r bogstavsporing af sommerord og lad dem sortere strandgenstande efter to egenskaber.`,
    parentTakeaway: `Sommeren er \u00e9n lang l\u00e6ringsmulighed. T\u00e6l muslingeskaller p\u00e5 stranden, sorter dem efter st\u00f8rrelse og farve. Lav sandslotte og t\u00e6l t\u00e5rnene. T\u00e6l iskugler og v\u00e6lg farver. Tegn sommerscener efter en dag i solen. Lad barnet hj\u00e6lpe med at pakke til stranden og t\u00e6lle h\u00e5ndkl\u00e6der, solcremeflasker og vandflasker. Sommerferie er matematikferie.`,
    classroomIntegration: `Sommertemaet bruges f\u00f8r sommerferien: i samlingen tales om sommerfugle og stranddyr, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og sorteringsark, i vandlegepladsen udforskes flyde/synke, og i kunsthj\u00f8rnet males sommerscener. F\u00e6lles M\u00e5ls m\u00e5l for sanseoplevelser, natur og udend\u00f8rsl\u00e6ring opfyldes.`,
    assessmentRubric: [
      { skill: `T\u00e6lling med sommergenstande`, emerging: `t\u00e6ller 1\u20135 muslingeskaller/iskugler med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 sommergenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere hvide end brune skaller)` },
      { skill: `Sommersortering`, emerging: `sorterer sommergenstande i to grupper med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter farve, st\u00f8rrelse eller type`, advanced: `sorterer efter to egenskaber og forklarer sorteringskriterierne` },
      { skill: `Sommergenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 sommergenstande med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 sommergenstande og beskriver dem`, advanced: `navngiver 8+ genstande og fort\u00e6ller om sommeraktiviteter knyttet til dem` },
    ],
  },

  superheroes: {
    snippetAnswer: `Superhelte-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger kapper, masker og superkr\u00e6fter til t\u00e6lling, matchning og farvel\u00e6gning, der styrker fantasi og tidlig talforst\u00e5else. Rollespilselementet driver st\u00e6rk motivation. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Superheltetemaet har en s\u00e6rlig kraft for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er midt i fantasilegens blomstring \u2014 de binder h\u00e5ndkl\u00e6der om halsen som kapper, forts\u00e6tter sig med at flyve og fort\u00e6ller om usynlige superkr\u00e6fter. Denne fantasiverden g\u00f8r superhelte-arbejdsark dybt motiverende. T\u00e6lling af stjerner p\u00e5 kapper og masker giver personlig matematik. Matchning af superhelte med deres udstyr opbygger logisk t\u00e6nkning. Farvel\u00e6gning af kapper og emblemer tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for kreativitet, fantasi og selvudfoldelse underst\u00f8ttes naturligt.`,
    developmentalMilestones: [
      { milestone: `Fantasileg og identitetsudforskning (3\u20134-\u00e5rige udvikler rolleleg og selviscenesaettelse)`, howWeAddress: `Superhelte-aktiviteter stimulerer rolleleg og kreativ t\u00e6nkning, n\u00e5r b\u00f8rn skaber deres egne helte p\u00e5 arbejdsark` },
      { milestone: `Visuel skelneevne (b\u00f8rn l\u00e6rer at skelne mellem lignende m\u00f8nstre)`, howWeAddress: `Skyggematch og find-forskellen med superhelte-silhuetter styrker observation og visuel analyse` },
      { milestone: `Farvevalg og kreativt udtryk (f\u00f8rskoleb\u00f8rn udvikler pr\u00e6ferencer og valg)`, howWeAddress: `Design-din-egen-superhelt-aktiviteter giver b\u00f8rn ejerskab over farvevali og kreative beslutninger` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, brug enkle superheltebilleder med f\u00e5 detaljer, fokus\u00e9r p\u00e5 \u00e9n aktivitet ad gangen, og lad barnet b\u00e6re en kappe under arbejdet. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j superhelte-m\u00f8nstergenkendelse, introduc\u00e9r bogstavsporing af kraftord og lad dem designe en hel superheltefamilie.`,
    parentTakeaway: `Superheltelegen er allerede i gang derhjemme \u2014 byg videre p\u00e5 den. Lav en kappe af et gammelt h\u00e5ndkl\u00e6de og en maske af karton. Giv superhelten en mission: t\u00e6l alle r\u00f8de ting i stuen, find fem former i k\u00f8kkenet, sort\u00e9r leget\u00f8j efter st\u00f8rrelse. N\u00e5r matematikken bliver en supermission, f\u00f8ler barnet sig st\u00e6rkt og motiveret.`,
    classroomIntegration: `Superheltetemaet bruges i en temuge: i samlingen tales om, hvad en helt g\u00f8r (hj\u00e6lper andre, er modig), ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, i kunsthj\u00f8rnet designes kapper og masker, og i rollelegen l\u00f8ses missioner. F\u00e6lles M\u00e5ls m\u00e5l for fantasi, kreativitet og social-emotionel udvikling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `T\u00e6lling med superhelteemner`, emerging: `t\u00e6ller 1\u20135 stjerner/masker med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 superheltegenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og l\u00f8ser enkle missionsopgaver med addition` },
      { skill: `Superhelte-matchning`, emerging: `matcher 2\u20133 helte med udstyr med st\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 5\u20136 superhelte med korrekt udstyr`, advanced: `matcher alle helte og forklarer, hvad hver superkraft bruges til` },
      { skill: `Kreativt heltedesign`, emerging: `farvel\u00e6gger en superhelt med f\u00e5 farver`, proficient: `v\u00e6lger bevidste farver og detaljer til sin superhelt`, advanced: `designer en komplet superhelt med navn, kappe, maske og emblem` },
    ],
  },

  toys: {
    snippetAnswer: `Leget\u00f8js-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger dukker, biler og klodser til t\u00e6lling, sortering og farvel\u00e6gning, der styrker kategorisering og finmotorik. Leget\u00f8jets personlige betydning driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Leget\u00f8jstemaet rammer f\u00f8rskoleb\u00f8rn lige i hjertet, fordi tre- og fire\u00e5rige har et dybt personligt forhold til deres leget\u00f8j \u2014 yndlingsbamsen, den r\u00f8de bil og klodserne er barnets n\u00e6rmeste f\u00f8lgesvende. Denne f\u00f8lelsesm\u00e6ssige forbindelse g\u00f8r leget\u00f8jsarbejdsark til de mest personligt relevante overhovedet. T\u00e6lling af dukker, biler og b\u00e6re giver matematik med f\u00f8lelsesm\u00e6ssig v\u00e6gt. Sortering af leget\u00f8j efter type, st\u00f8rrelse og farve styrker klassificering. Farvel\u00e6gning af leget\u00f8j med detaljerede former tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for hverdagsforst\u00e5else og personlig udvikling underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Kategorisering efter egenskaber (3\u20134-\u00e5rige begynder at sortere genstande efter type og funktion)`, howWeAddress: `Sorteringsaktiviteter med leget\u00f8j efter type (k\u00f8ret\u00f8jer, dukker, klodser) og st\u00f8rrelse styrker logisk klassificering` },
      { milestone: `Ejerskab og delingsf\u00e6rdigheder (b\u00f8rn l\u00e6rer at dele og bytte)`, howWeAddress: `Delingsscenarier p\u00e5 arbejdsark (del 6 klodser mellem 2 b\u00f8rn) introducerer tidlig divisionsforst\u00e5else` },
      { milestone: `Finmotorisk kontrol med sm\u00e5 genstande (b\u00f8rn h\u00e5ndterer leget\u00f8j med stigende pr\u00e6cision)`, howWeAddress: `Farvel\u00e6gning og sporing af leget\u00f8jskonturer med varierende detaljegrad tr\u00e6ner h\u00e5nd-\u00f8je-koordination` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, brug kun barnets mest velkendte leget\u00f8j (bamse, bil, bold), hav rigtigt leget\u00f8j p\u00e5 bordet som supplement, og fokus\u00e9r p\u00e5 \u00e9n sorteringsdimension. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j sortering efter to egenskaber, introduc\u00e9r enkel t\u00e6lling af leget\u00f8j i kategorier og lad dem tegne og t\u00e6lle alt leget\u00f8j i deres v\u00e6relse.`,
    parentTakeaway: `Leget\u00f8j er overalt i hjemmet, og rydning er en matematiklektion. Lad barnet t\u00e6lle og sortere leget\u00f8j i kasser: biler i \u00e9n, dukker i en anden, klodser i en tredje. T\u00e6l, hvor mange der er i hver kasse, og sammenlign. Leg butik med leget\u00f8j og \u00f8v priser. Byg t\u00e5rne af klodser og t\u00e6l lag. Oprydning er l\u00e6ring.`,
    classroomIntegration: `Leget\u00f8jstemaet integreres i daglige rutiner: ved oprydningstid sorteres leget\u00f8j i m\u00e6rkede kasser, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og sorteringsark, i rollelegen leges leget\u00f8jsbutik, og i samlingen tales om yndlingsleget\u00f8j med t\u00e6lling og kategorisering. F\u00e6lles M\u00e5ls m\u00e5l for hverdagsforst\u00e5else og social interaktion underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Leget\u00f8jssortering`, emerging: `sorterer leget\u00f8j i to grupper med voksenst\u00f8tte (biler/dukker)`, proficient: `sorterer selvst\u00e6ndigt leget\u00f8j efter type, st\u00f8rrelse eller farve`, advanced: `sorterer efter to egenskaber og forklarer sine sorteringskriterier mundtligt` },
      { skill: `T\u00e6lling med leget\u00f8j`, emerging: `t\u00e6ller 1\u20135 stykker leget\u00f8j med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 og matcher med korrekt tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder p\u00e5 tv\u00e6rs af kategorier` },
      { skill: `Leget\u00f8jsgenkendelse og ordforr\u00e5d`, emerging: `navngiver 3\u20134 velkendte stykker leget\u00f8j med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 6\u20138 typer leget\u00f8j og beskriver dem`, advanced: `navngiver 10+ og bruger beskrivende ord som bl\u00f8d, haard, stor, lille` },
    ],
  },

  transportation: {
    snippetAnswer: `Transport-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger biler, busser og tog til t\u00e6lling, matchning og farvel\u00e6gning, der styrker formgenkendelse og tidlig matematik. K\u00f8ret\u00f8jers fascination driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Transporttemaet fascinerer f\u00f8rskoleb\u00f8rn dybt, fordi tre- og fire\u00e5rige er betaget af alt, der bev\u00e6ger sig \u2014 biler, busser, tog, fly og b\u00e5de vokker begejstring, hver gang de ses p\u00e5 gaden, i luften eller p\u00e5 vandet. Denne daglige fascination g\u00f8r transportarbejdsark naturligt motiverende. T\u00e6lling af hjul, vinduer og passagerer giver matematik et k\u00f8ret\u00f8jstema. Matchning af k\u00f8ret\u00f8jer med steder (bus til vejen, b\u00e5d til vandet) opbygger logisk t\u00e6nkning. Farvel\u00e6gning af k\u00f8ret\u00f8jer med cirkler og rektangler tr\u00e6ner formgenkendelse. F\u00e6lles M\u00e5ls m\u00e5l for omverdensforst\u00e5else underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Formgenkendelse i hverdagsgenstande (3\u20134-\u00e5rige finder cirkler og rektangler i k\u00f8ret\u00f8jer)`, howWeAddress: `K\u00f8ret\u00f8jsfarvel\u00e6gning fremh\u00e6ver geometriske former: runde hjul, firkantede vinduer, rektangul\u00e6re busser` },
      { milestone: `Kategorisering efter transportform (b\u00f8rn l\u00e6rer, at k\u00f8ret\u00f8jer bruges p\u00e5 vej, vand og i luft)`, howWeAddress: `Sorteringsaktiviteter, der grupperer k\u00f8ret\u00f8jer efter element (land/vand/luft), opbygger tidlig klassificering` },
      { milestone: `T\u00e6lling af dele (hjul, vinduer, passagerer)`, howWeAddress: `T\u00e6lle\u00f8velser med k\u00f8ret\u00f8jsdele g\u00f8r matematik detaljeret og visuelt sp\u00e6ndende` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, begr\u00e6ns til tre velkendte k\u00f8ret\u00f8jer (bil, bus, tog), brug leget\u00f8jsbiler som supplement, og fokus\u00e9r p\u00e5 enkel matchning. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j fly, helikopter og b\u00e5d, introduc\u00e9r t\u00e6lling af hjul pr. k\u00f8ret\u00f8j og lad dem designe deres eget fantasik\u00f8ret\u00f8j.`,
    parentTakeaway: `Transport er overalt p\u00e5 gaden. P\u00e5 vej til b\u00f8rnehaven t\u00e6l biler, busser og cykler. I bussen t\u00e6l passagererne. Ved havnen se p\u00e5 b\u00e5de og f\u00e6rger. I lufthavnen iagttag flyene. Hvert transportmiddel er en t\u00e6lle- og sorteringsmulighed. Lav en k\u00f8ret\u00f8jsbog med udklip og barnets tegninger.`,
    classroomIntegration: `Transporttemaet integreres i hverdagen: p\u00e5 ture observeres k\u00f8ret\u00f8jer p\u00e5 vej, vand og i luft, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, i billegebanen leges med leget\u00f8jsk\u00f8ret\u00f8jer og ruter, og i samlingen tales om, hvordan vi transporterer os. F\u00e6lles M\u00e5ls m\u00e5l for omverdensforst\u00e5else og kategorisering underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `K\u00f8ret\u00f8jssorterin`, emerging: `sorterer k\u00f8ret\u00f8jer i to grupper med voksenst\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter transportform (land/vand/luft)`, advanced: `sorterer efter flere kriterier og forklarer, hvilke der k\u00f8rer, sejler eller flyver` },
      { skill: `T\u00e6lling af k\u00f8ret\u00f8jsdele`, emerging: `t\u00e6ller hjul p\u00e5 \u00e9n bil (4) med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt hjul og vinduer p\u00e5 flere k\u00f8ret\u00f8jer`, advanced: `sammenligner antal hjul og finder, hvem der har flest` },
      { skill: `Transportgenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 k\u00f8ret\u00f8jer med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 k\u00f8ret\u00f8jer og beskriver, hvor de bruges`, advanced: `navngiver 8+ k\u00f8ret\u00f8jer og fort\u00e6ller om forskelle og ligheder` },
    ],
  },

  travel: {
    snippetAnswer: `Rejse-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger kufferter, fly og kort til t\u00e6lling, matchning og farvel\u00e6gning, der styrker rumlig forst\u00e5else og ordforr\u00e5d. Rejsens eventyr og undren driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Rejsetemaet vekker f\u00f8rskoleb\u00f8rns nysgerrighed, fordi tre- og fire\u00e5rige forbinder rejser med sp\u00e6nding og familieoplevelser \u2014 k\u00f8reture, togrejser og flyture er store begivenheder i et lille barns liv. Denne personlige forbindelse g\u00f8r rejsearbejdsark dybt engagerende. T\u00e6lling af kufferter, biletter og souvenirs giver matematik en eventyrlig ramme. Matchning af transportmidler med destinationer opbygger logisk t\u00e6nkning. Farvel\u00e6gning af rejsescener med mange detaljer tr\u00e6ner finmotorik og opm\u00e6rksomhed. F\u00e6lles M\u00e5ls m\u00e5l for omverdensforst\u00e5else og kulturel bevidsthed underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Rumlig og geografisk bevidsthed (3\u20134-\u00e5rige begynder at forst\u00e5 n\u00e6r og fjern)`, howWeAddress: `Enkle kortaktiviteter og matchning af lande med symboler (Frankrig = Eiffelt\u00e5rn) introducerer geografi p\u00e5 det mest basale niveau` },
      { milestone: `Sekvensering af begivenheder (b\u00f8rn l\u00e6rer f\u00f8r/under/efter)`, howWeAddress: `Rejsesekvensering (pak kuffert \u2192 k\u00f8r til lufthavn \u2192 flyv \u2192 ankom) tr\u00e6ner tidslig ordning` },
      { milestone: `Ordforr\u00e5dsudvidelse med nye begreber (rejser introducerer mange nye ord)`, howWeAddress: `Rejseordforr\u00e5d som kuffert, billet, pas og destination udvider barnets sprog i en sp\u00e6ndende kontekst` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 velkendte rejseelementer (kuffert, bil, fly), brug leget\u00f8jskufferter og kort som supplement, og hold scenerne enkle. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j lande og flaggenkendelse, introduc\u00e9r enkel kortl\u00e6sning og lad dem planl\u00e6gge en fantasirejse med tegninger.`,
    parentTakeaway: `Rejser er de bedste l\u00e6ringsoplevelser. Inden en tur, vis barnet p\u00e5 et kort, hvor I skal hen. Lad barnet hj\u00e6lpe med at pakke og t\u00e6lle ting i kufferten. P\u00e5 rejsen t\u00e6l biler, b\u00e5de eller vindm\u00f8ller. Tag billeder og lav en rejsedagbog bagefter. Ogs\u00e5 en tur til mormor er en rejse v\u00e6rd at l\u00e6re af.`,
    classroomIntegration: `Rejsetemaet bruges i en temauge: i samlingen vises billeder fra forskellige lande, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark med rejsemotiver, i rollelegen pakkes kufferter og flyves i papkasse-fly, og p\u00e5 v\u00e6ggen h\u00e6nges et verdenskort med b\u00f8rnenes rejseoplevelser. F\u00e6lles M\u00e5ls m\u00e5l for kulturforst\u00e5else og omverdensbevidsthed underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `T\u00e6lling med rejsegenstande`, emerging: `t\u00e6ller 1\u20135 kufferter/billetter med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 rejsegenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og l\u00f8ser enkle problemer (3 kufferter + 2 tasker = ?)` },
      { skill: `Rejsesekvensering`, emerging: `ordner 2 trin (pak, rejs) med voksenst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 3\u20134 rejsetrin i korrekt r\u00e6kkef\u00f8lge`, advanced: `ordner 5+ trin og fort\u00e6ller en sammenhoengende rejsehistorie` },
      { skill: `Rejsegenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 rejsegenstande med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 rejserelaterede ord`, advanced: `navngiver 8+ ord og fort\u00e6ller om rejseoplevelser` },
    ],
  },

  vegetables: {
    snippetAnswer: `Gr\u00f8ntsags-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger guler\u00f8dder, tomater og \u00e6rter til t\u00e6lling, sortering og farvel\u00e6gning, der styrker sund kost-bevidsthed og finmotorik. Gr\u00f8ntsagers farver og former driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Gr\u00f8ntsagstemaet er s\u00e6rligt v\u00e6rdifuldt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige er i en kritisk periode for at udvikle sunde spisevaner, og positive associationer med gr\u00f8ntsager kan formes gennem legende l\u00e6ring. T\u00e6lling af guler\u00f8dder, tomater og \u00e6rter g\u00f8r matematik til en del af m\u00e5ltidet. Sortering efter farve (r\u00f8d tomat, gr\u00f8n agurk, orange gulerod) styrker b\u00e5de farvevokabular og kategorisering. Farvel\u00e6gning af gr\u00f8ntsager med varierede former tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, krop og sanseoplevelser underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Sensorisk begrebsdannelse (3\u20134-\u00e5rige l\u00e6rer at beskrive genstande med sanseord)`, howWeAddress: `Gr\u00f8ntsagsaktiviteter forbinder billeder med sanseord (bl\u00f8d tomat, h\u00e5rd gulerod, glat agurk) og udvider ordforr\u00e5det` },
      { milestone: `Farvesortering med naturlige genstande (opbygning af farvekategorier)`, howWeAddress: `Sortering af gr\u00f8ntsager efter farve giver en af de mest naturlige farvesorteringsaktiviteter med \u00e6gte variation` },
      { milestone: `T\u00e6lling i m\u00e5ltidskontekster (b\u00f8rn forbinder tal med hverdagen)`, howWeAddress: `T\u00e6lleaktiviteter med gr\u00f8ntsager p\u00e5 tallerkener og i gr\u00f8ntsagskasser g\u00f8r matematik til en del af hverdagens m\u00e5ltider` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, brug kun tre velkendte gr\u00f8ntsager (gulerod, tomat, agurk), hav rigtige gr\u00f8ntsager p\u00e5 bordet, og hold aktiviteterne sansem\u00e6ttede. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j flere gr\u00f8ntsager, introduc\u00e9r bogstavsporing af gr\u00f8ntsagsnavne og lad dem sortere efter b\u00e5de farve og st\u00f8rrelse.`,
    parentTakeaway: `K\u00f8kkenet er det bedste klasselokale for gr\u00f8ntsager. Lad barnet hj\u00e6lpe med at vaske, t\u00e6lle og sortere gr\u00f8ntsager ved madlavning. T\u00e6l guler\u00f8dder, sammenlign st\u00f8rrelser, sorter efter farve. Bes\u00f8g en markedshal og lad barnet pege p\u00e5 og navngive gr\u00f8ntsager. Dyrk en enkel k\u00f8kkenhave med radiser eller \u00e6rter. Positive gr\u00f8ntsagsoplevelser former sunde vaner.`,
    classroomIntegration: `Gr\u00f8ntsagstemaet integreres i f\u00f8rskolens m\u00e5ltidsrutiner: ved frokost navngives og t\u00e6lles gr\u00f8ntsager, i samlingen introduceres ugens gr\u00f8ntsag med smagning, ved l\u00e6ringsstationer arbejdes med sorterings- og t\u00e6lleark, og i k\u00f8kkenprojekter laves enkel mad med gr\u00f8ntsager. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, sanseoplevelser og natur underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Gr\u00f8ntsagssortering`, emerging: `sorterer gr\u00f8ntsager i to farvegrupper med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter farve, st\u00f8rrelse eller type`, advanced: `sorterer efter to egenskaber og forklarer sine kriterier` },
      { skill: `T\u00e6lling med gr\u00f8ntsager`, emerging: `t\u00e6ller 1\u20135 gr\u00f8ntsager med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 og matcher med korrekt tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere guler\u00f8dder end tomater)` },
      { skill: `Gr\u00f8ntsagsgenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 gr\u00f8ntsager med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 gr\u00f8ntsager og beskriver farve og form`, advanced: `navngiver 8+ gr\u00f8ntsager og bruger sanseord som bl\u00f8d, h\u00e5rd, knasende` },
    ],
  },

  weather: {
    snippetAnswer: `Vejr-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger sol, regn, skyer og sne til t\u00e6lling, matchning og farvel\u00e6gning, der styrker naturforst\u00e5else og observation. Vejrets daglige skiften fascinerer sm\u00e5 b\u00f8rn. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Vejrtemaet er unikt kraftfuldt for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige oplever vejret med hele kroppen hver eneste dag \u2014 regnen p\u00e5 ansigtet, solen p\u00e5 huden, vinden i h\u00e5ret og sneen under st\u00f8vlerne. Denne daglige, sanselige oplevelse g\u00f8r vejr til et tema, der aldrig f\u00f8les abstrakt. T\u00e6lling af regndraaber, skyer og snefnug giver matematik i en observerbar kontekst. Matchning af vejrtyper med p\u00e5kl\u00e6dning opbygger logisk t\u00e6nkning. Farvel\u00e6gning af vejrscener tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for natur, \u00e5rstider og observation underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Daglig observation og beskrivelse (3\u20134-\u00e5rige l\u00e6rer at s\u00e6tte ord p\u00e5 hverdagsoplevelser)`, howWeAddress: `Vejrobservationsaktiviteter, der beder b\u00f8rn beskrive dagens vejr med ord og billeder, tr\u00e6ner mundtligt sprog` },
      { milestone: `\u00c5rsag-virkning-forst\u00e5else (regn = vandpytter, sol = varme)`, howWeAddress: `Matchningsaktiviteter, der forbinder vejrtyper med konsekvenser (regn \u2192 paraply, sne \u2192 st\u00f8vler), opbygger logisk t\u00e6nkning` },
      { milestone: `Symbolforst\u00e5else (vejrsymboler som piktogrammer)`, howWeAddress: `Vejrsymboler (sol, sky, regndraabe) introducerer ideen om, at billeder kan repr\u00e6sentere begreber \u2014 et forstadium til bogstaver` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre grundl\u00e6ggende vejrtyper (sol, regn, sne), brug vinduet som supplement, og hold aktiviteterne konkrete. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j vind, t\u00e5ge og regnbue, introduc\u00e9r en vejrkalender med daglig registrering og lad dem forudsige morgendagens vejr.`,
    parentTakeaway: `Vejret er den mest tilg\u00e6ngelige l\u00e6ring overhovedet \u2014 man skal bare se ud af vinduet. Start hver morgen med at tale om dagens vejr: er det sol, regn eller overskyet? Lad barnet v\u00e6lge t\u00f8j efter vejret. T\u00e6l regndraaber p\u00e5 ruden. Byg en snemand og t\u00e6l kuglerne. Lav en enkel vejrdagbog med symboler for sol, sky og regn.`,
    classroomIntegration: `Vejrtemaet integreres i daglige rutiner: i morgensamlingen observeres vejret og s\u00e6ttes symbol p\u00e5 kalenderen, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, i garderoben tales om vejrpassende p\u00e5kl\u00e6dning, og p\u00e5 legepladsen opleves vejret med alle sanser. F\u00e6lles M\u00e5ls m\u00e5l for natur, observation og daglige rutiner underst\u00f8ttes hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `Vejrgenkendelse og symboler`, emerging: `genkender sol og regn med st\u00f8tte`, proficient: `identificerer selvst\u00e6ndigt 4\u20135 vejrtyper og matcher med symboler`, advanced: `bruger vejrsymboler til at f\u00f8re en daglig vejrkalender og beskriver vejret mundtligt` },
      { skill: `Vejr-matchning (type og konsekvens)`, emerging: `matcher \u00e9n vejrtype med p\u00e5kl\u00e6dning med st\u00f8tte (regn = paraply)`, proficient: `matcher selvst\u00e6ndigt 3\u20134 vejrtyper med korrekt t\u00f8j og udstyr`, advanced: `matcher alle vejrtyper og forklarer, hvorfor man kl\u00e6der sig s\u00e5dan` },
      { skill: `T\u00e6lling i vejrscener`, emerging: `t\u00e6ller 1\u20135 skyer/regndraaber med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 vejrelementer og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner (flere regndraaber end snefnug)` },
    ],
  },

  winter: {
    snippetAnswer: `Vinter-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger snefnug, snem\u00e6nd og vanter til t\u00e6lling, matchning og farvel\u00e6gning, der styrker m\u00f8nstergenkendelse og finmotorik. Vinterens magiske stemning driver engagementet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Vintertemaet rammer f\u00f8rskoleb\u00f8rn med s\u00e6rlig magi, fordi tre- og fire\u00e5rige oplever sne, is og frost som ren undren \u2014 at fange snefnug p\u00e5 tungen, bygge snem\u00e6nd og lave sne\u00e9ngle fylder dem med gl\u00e6de. Denne sanselige begejstring g\u00f8r vinterarbejdsark dybt motiverende. T\u00e6lling af snefnug, vanter og snekugler giver matematik i en tryg og magisk kontekst. Matchning af vinterbekl\u00e6dning (vante til vante, st\u00f8vle til st\u00f8vle) styrker parring og symmetri. Farvel\u00e6gning af snescener med hvide og bl\u00e5 nuancer tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for \u00e5rstider, natur og sanseoplevelser underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Parring og symmetri (3\u20134-\u00e5rige l\u00e6rer at matche par som vanter og st\u00f8vler)`, howWeAddress: `Matchningsaktiviteter med vinterpar (find den matchende vante, par st\u00f8vlerne) styrker visuel skelneevne og symmetriforst\u00e5else` },
      { milestone: `M\u00f8nstergenkendelse (f\u00f8rskoleb\u00f8rn opdager gentagende m\u00f8nstre)`, howWeAddress: `Snefnug- og vantem\u00f8nstre introducerer gentagelsesm\u00f8nstre (r\u00f8d vante, bl\u00e5 vante, r\u00f8d vante...) p\u00e5 en visuelt tiltalende m\u00e5de` },
      { milestone: `Sensorisk begrebsdannelse (koldt, glat, bl\u00f8dt)`, howWeAddress: `Vinterscener forbinder billeder med sanseord (kold sne, glat is, bl\u00f8d vante) og udvider sensorisk ordforr\u00e5d` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte vinterelementer (snemand, vante, snefnug), brug rigtig sne eller is som supplement, og hold aktiviteterne enkle. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j mere komplekse m\u00f8nstre, introduc\u00e9r bogstavsporing af vinterord og lad dem designe deres eget snefnugm\u00f8nster.`,
    parentTakeaway: `Vinteren er fuld af l\u00e6ring. Byg en snemand og t\u00e6l kuglerne, \u00f8jnene og knapperne. Fang snefnug p\u00e5 m\u00f8rkt papir og se m\u00f8nstrene. Match vanter og st\u00f8vler ved garderoben. Tegn p\u00e5 duggede vinduer. Lav is-eksperimenter i fryseren. Vinteren inviterer til naturvidenskab, kunst og matematik \u2014 alt sammen i barnets eget tempo.`,
    classroomIntegration: `Vintertemaet integreres i \u00e5rstidsbaserede rutiner: i samlingen tales om vejret og vinteren, ved l\u00e6ringsstationer arbejdes med matchnings- og m\u00f8nsterark, i garderoben \u00f8ves parring af vanter og st\u00f8vler, og p\u00e5 legepladsen udforskes sne og is. F\u00e6lles M\u00e5ls m\u00e5l for \u00e5rstider, sanseoplevelser og natur underst\u00f8ttes hele vinteren.`,
    assessmentRubric: [
      { skill: `Vinterpar-matchning`, emerging: `matcher 1\u20132 vante/st\u00f8vlepar med voksenst\u00f8tte`, proficient: `matcher selvst\u00e6ndigt 4\u20135 vinterpar korrekt`, advanced: `matcher alle par og forklarer, hvilke m\u00f8nstre der passer sammen` },
      { skill: `T\u00e6lling med vintergenstande`, emerging: `t\u00e6ller 1\u20135 snefnug/kugler med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 vintergenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere snefnug end snem\u00e6nd)` },
      { skill: `M\u00f8nstergenkendelse (vintersekvenser)`, emerging: `kopierer et simpelt AB-m\u00f8nster med st\u00f8tte (r\u00f8d/bl\u00e5)`, proficient: `forts\u00e6tter selvst\u00e6ndigt et AB- eller ABB-m\u00f8nster med vintergenstande`, advanced: `skaber egne m\u00f8nstre med tre eller flere elementer` },
    ],
  },

  xmas: {
    snippetAnswer: `Jule-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger julekugler, gaver og tr\u00e6er til t\u00e6lling, matchning og farvel\u00e6gning, der styrker talforst\u00e5else og finmotorik. Julens magi og forventning driver det st\u00e6rkeste engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Juletemaet er det mest motiverende tema overhovedet for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige oplever julen som \u00e5rets absolut mest magiske tid \u2014 julekalendere, nisser, gaver og tr\u00e6pynt skaber en forventning, der er uovertruffen. Nedt\u00e6llingen til juleaften giver den mest naturlige talr\u00e6kke\u00f8velse, der findes. T\u00e6lling af julekugler p\u00e5 tr\u00e6et, gaver under tr\u00e6et og lys i vinduet giver matematik f\u00f8lelsesm\u00e6ssig v\u00e6gt. Matchning af gaver med b\u00f8rn styrker logisk t\u00e6nkning. Farvel\u00e6gning af julescener tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for kulturel identitet og traditioner underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Talr\u00e6kkeforst\u00e5else gennem nedt\u00e6lling (julekalenderen er den ultimative t\u00e6lle\u00f8velse)`, howWeAddress: `Kalenderaktiviteter og nedt\u00e6llingstavler g\u00f8r talr\u00e6kken personligt meningsfuld og motiverende` },
      { milestone: `Kulturel bevidsthed (3\u20134-\u00e5rige begynder at forst\u00e5 traditioner)`, howWeAddress: `Juleaktiviteter, der inddrager danske traditioner som nisser, risengroed og lucia, styrker kulturel identitet` },
      { milestone: `Gavmildhed og deling (b\u00f8rn l\u00e6rer at give og dele)`, howWeAddress: `Gavefordeling p\u00e5 arbejdsark (del 6 gaver mellem 3 b\u00f8rn) introducerer tidlig division og sociale f\u00e6rdigheder` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, brug kun de mest velkendte julesymboler (tr\u00e6, gave, stjerne), hold scenerne enkle med f\u00e5 genstande, og brug rigtige julekugler som supplement. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j julekalender-matematik, introduc\u00e9r bogstavsporing af juleord og lad dem designe deres eget juletrae.`,
    parentTakeaway: `Julen er \u00e5rets st\u00f8rste l\u00e6ringsmulighed. Lad barnet \u00e5bne kalenderlukker og t\u00e6lle dage til juleaften. T\u00e6l julekugler, n\u00e5r I pynter traeet. Sorter gaver efter st\u00f8rrelse. Bag sm\u00e5kager og t\u00e6l ingredienser. Skriv barnets navn p\u00e5 gavesedler. Julens forventning er den mest kraftfulde l\u00e6ringsmotor \u2014 brug den aktivt.`,
    classroomIntegration: `Juletemaet bruges hele december: i samlingen \u00e5bnes julekalenderen med en daglig l\u00e6ringsaktivitet, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og matchningsark, i kunsthj\u00f8rnet laves julepynt og nisser, og i rollelegen leges juleaften. F\u00e6lles M\u00e5ls m\u00e5l for kulturel identitet, traditioner og social-emotionel udvikling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `T\u00e6lling med julegenstande`, emerging: `t\u00e6ller 1\u20135 julekugler/gaver med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 julegenstande og matcher med tal`, advanced: `t\u00e6ller over 10 og l\u00f8ser enkle jule-additionsopgaver` },
      { skill: `Julekalender-nedt\u00e6lling`, emerging: `forstaar, at man t\u00e6ller ned mod juleaften, med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt dage og finder dagens dato p\u00e5 kalenderen`, advanced: `beregner, hvor mange dage der er tilbage, og bruger subtraktion` },
      { skill: `Julegenkendelse og ordforr\u00e5d`, emerging: `navngiver 2\u20133 juleelementer med st\u00f8tte (tr\u00e6, gave)`, proficient: `navngiver selvst\u00e6ndigt 5\u20136 julegenstande og beskriver dem`, advanced: `navngiver 8+ elementer og fort\u00e6ller om danske juletraditioner` },
    ],
  },

  zoo: {
    snippetAnswer: `Zoo-arbejdsark til f\u00f8rskolen (3\u20134 \u00e5r) bruger l\u00f8ver, elefanter og aber til t\u00e6lling, matchning og farvel\u00e6gning, der styrker dyreklassificering og finmotorik. Eksotiske dyrs fascination driver dybt engagement. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Zootemaet er magisk for f\u00f8rskoleb\u00f8rn, fordi tre- og fire\u00e5rige reagerer p\u00e5 eksotiske dyr med ub\u00e6ndig begejstring \u2014 l\u00f8ver, der br\u00f8ler, elefanter, der sprutter vand, og aber, der svinger sig, vekker en fascination, der driver dyb l\u00e6ring. Denne f\u00f8lelsesm\u00e6ssige forbindelse g\u00f8r zoo-arbejdsark til nogle af de mest engagerende overhovedet. T\u00e6lling af dyr i indhegninger giver konkret matematik. Sortering af dyr efter st\u00f8rrelse, farve eller type opbygger klassificering. Matchning af dyr med deres mad introducerer \u00e5rsag-virkning. Farvel\u00e6gning af detaljerede dyrefigurer tr\u00e6ner finmotorik. F\u00e6lles M\u00e5ls m\u00e5l for natur, dyr og nysgerrighed underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Dyreklassificering (3\u20134-\u00e5rige begynder at gruppere dyr efter egenskaber)`, howWeAddress: `Sorteringsaktiviteter med zoodyr efter st\u00f8rrelse (stor elefant vs. lille abe) og type (fugle vs. pattedyr) styrker kategorisering` },
      { milestone: `T\u00e6lling i visuelt rige scener (opbygning af visuel s\u00f8gef\u00e6rdighed)`, howWeAddress: `Find-og-t\u00e6l-aktiviteter i zoo-scener med mange dyr tr\u00e6ner b\u00e5de t\u00e6lling og visuel opm\u00e6rksomhed` },
      { milestone: `Ordforr\u00e5dsudvidelse med dyrenavne (b\u00f8rn l\u00e6rer mange nye ord)`, howWeAddress: `Matchnings- og navngivningsaktiviteter udvider ordforr\u00e5det med eksotiske dyrenavne i en sp\u00e6ndende kontekst` },
      { milestone: `St\u00f8rrelsesforst\u00e5else (sammenligning af sm\u00e5 og store dyr)`, howWeAddress: `Stor-lille-sammenligninger mellem en mus og en giraf eller en abe og en elefant introducerer m\u00e5lebegreber naturligt` },
    ],
    differentiationNotes: `For f\u00f8rskoleb\u00f8rn med behov for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte dyr (l\u00f8ve, elefant, abe), brug leget\u00f8jsdyr som supplement, og hold scenerne enkle med f\u00e5 dyr. For avancerede f\u00f8rskoleb\u00f8rn tilf\u00f8j eksotiske dyr, introduc\u00e9r dyreklassificering efter levested og lad dem designe deres egen dr\u00f8mmezoo.`,
    parentTakeaway: `Et zoobes\u00f8g er den ultimative l\u00e6ringsoplevelse. F\u00f8r bes\u00f8get, gennemg\u00e5 zoo-arbejdsark og l\u00e6r dyrenavnene. I zoo, t\u00e6l dyrene i hver indhegning og sammenlign. Efter bes\u00f8get, tegn yndlingsdyrene og t\u00e6l, hvor mange I s\u00e5. Ogs\u00e5 uden zoobes\u00f8g kan leget\u00f8jsdyr, billedb\u00f8ger og dyrevideoer bringe zooen hjem i stuen.`,
    classroomIntegration: `Zootemaet bruges i en dyre-temauge: i samlingen introduceres ugens dyr med billeder og lyde, ved l\u00e6ringsstationer arbejdes med t\u00e6lle- og sorteringsark, i rollelegen leges dyrepasser og zoobes\u00f8g, og i kunsthj\u00f8rnet males og modelleres dyr. F\u00e6lles M\u00e5ls m\u00e5l for natur, dyr og nysgerrighed integreres gennem hele ugen.`,
    assessmentRubric: [
      { skill: `Dyreklassificering (zoo)`, emerging: `sorterer dyr i to grupper med voksenst\u00f8tte (store/sm\u00e5)`, proficient: `sorterer selvst\u00e6ndigt zoodyr efter st\u00f8rrelse, type eller levested`, advanced: `sorterer efter to kriterier og forklarer sine valg mundtligt` },
      { skill: `T\u00e6lling i zoo-scener`, emerging: `t\u00e6ller 1\u20135 dyr i en scene med voksenst\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 10 zoodyr og matcher med tal`, advanced: `t\u00e6ller over 10 og sammenligner m\u00e6ngder (flere aber end l\u00f8ver)` },
      { skill: `Dyregenkendelse og ordforr\u00e5d`, emerging: `navngiver 3\u20134 velkendte zoodyr med st\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 6\u20138 zoodyr og beskriver deres udseende`, advanced: `navngiver 10+ dyr og fort\u00e6ller om, hvor de lever og hvad de spiser` },
    ],
  },
};

// Build the insertion text for each theme
function buildInsertionText(data) {
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
  const filePath = path.join(THEMES_DIR, theme, 'da.ts');
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${filePath}`);
    errorCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already enriched
  if (content.includes("snippetAnswer:") && content.indexOf("snippetAnswer:") < content.indexOf("'kindergarten'")) {
    // Need to check if snippetAnswer is in the preschool block
    const preschoolIdx = content.indexOf("'preschool'");
    const kindergartenIdx = content.indexOf("'kindergarten'");
    const snippetIdx = content.indexOf("snippetAnswer:");
    if (snippetIdx > preschoolIdx && snippetIdx < kindergartenIdx) {
      console.log(`SKIP (already enriched): ${theme}/da.ts`);
      continue;
    }
  }

  // Find the insertion point: end of faq array in preschool block
  // Pattern: the faq closing "],\n" before 'kindergarten'
  const preschoolIdx = content.indexOf("'preschool'");
  const kindergartenIdx = content.indexOf("'kindergarten'");

  if (preschoolIdx === -1 || kindergartenIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  const preschoolBlock = content.substring(preschoolIdx, kindergartenIdx);

  // Find the last "],\n" in the preschool block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(preschoolBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = preschoolIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/da.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
