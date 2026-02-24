#!/usr/bin/env node
/**
 * SEO Part 255: NO Preschool Grade Enrichment — Themes 39-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 12 NO theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    snippetAnswer: 'Sport-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker baller, l\u00f8ping og hopping til \u00e5 \u00f8ve telling, kobling og grovmotorisk koordinasjon. Idrettens energi og bevegelsesglede gj\u00f8r l\u00e6ringen fysisk og motiverende. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sporttemaet er ideelt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer opplever idrett som ren bevegelsesglede \u2014 de l\u00f8per, hopper og kaster uten regler eller konkurranse, og denne kroppslige energien kan kanaliseres direkte inn i l\u00e6ring. Telling av baller, spillere og m\u00e5l gir matematikk en fysisk dimensjon. Kobling av utstyr til idretter bygger kategorisering. Fargelegging av runde baller og buede bevegelsesbaner trener finmotorikk. Skyggekobling med sportssilhuetter styrker visuell diskriminering. Rammeplan for barnehagen vektlegger kropp, bevegelse og helse, og sportsoppgaver st\u00f8tter dette n\u00e5r de kombineres med aktiv lek ute og inne.',
    developmentalMilestones: [
      { milestone: 'Grovmotorisk koordinasjon (3\u20134-\u00e5ringer utvikler l\u00f8ping, hopping og kasting)', howWeAddress: 'Sportsaktiviteter p\u00e5 oppgaveark pares med korte bevegelsespauser som bygger bro mellom papirl\u00e6ring og kroppslig utfoldelse' },
      { milestone: 'Telling med konkrete gjenstander (oppbygging av en-til-en-korrespondanse)', howWeAddress: 'Telleaktiviteter med baller, m\u00e5l og spillere gj\u00f8r matematikk fysisk og h\u00e5ndgripelig' },
      { milestone: 'Kategorisering etter funksjon (forst\u00e5 at gjenstander tilh\u00f8rer bestemte aktiviteter)', howWeAddress: 'Kobling av utstyr til idretter (ball til fotball, racket til tennis) bygger logisk klassifisering' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, begrens til tre kjente idretter (fotball, l\u00f8ping, sv\u00f8mming), bruk ekte baller som supplement, og par alltid oppgaveark med fysisk aktivitet. For avanserte f\u00f8rskolebarn utvid med flere idretter, introduser enkel poengberegning (hvem scoret flest?) og la dem tegne sin egen favorittidrett.',
    parentTakeaway: 'Sport er overalt i barnets hverdag. L\u00f8p en stafett i hagen og tell rundene, kast en ball og tell vellykkede fangster, spark mot m\u00e5l og f\u00f8r stilling p\u00e5 papir. Meld barnet p\u00e5 en lokal idrettsforening og snakk om hva de l\u00e6rte: hvor mange barn var p\u00e5 laget, hvem scoret, hva hjalp. Bevegelse og tall h\u00f8rer naturlig sammen.',
    classroomIntegration: 'Sporttemaet integreres i barnehagens bevegelsesrutiner: i gymsalen pares fysisk aktivitet med telle\u00f8velser, ved l\u00e6ringsstasjoner arbeides med koblings- og telleark, i samlingen vises bilder av norske idretter, og p\u00e5 utelekeplassen leker barna idrettene fra oppgavearkene. Rammeplanens m\u00e5l for kropp, bevegelse og helse st\u00f8ttes direkte.',
    assessmentRubric: [
      { skill: 'Telling med sportsgjenstander', emerging: 'teller 1\u20135 baller/spillere med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 sportsgjenstander og kobler med tall', advanced: 'teller over 10 og sammenligner mengder (flere fotballer enn basketballer)' },
      { skill: 'Sportsutstyrskobling', emerging: 'kobler 2\u20133 gjenstander med idretter med st\u00f8tte', proficient: 'kobler selvstendig 5\u20136 utstyrsdeler med riktig idrett', advanced: 'kobler alt utstyr og forklarer hva man gj\u00f8r med det i hver idrett' },
      { skill: 'Sportsgjenkjenning og ordforr\u00e5d', emerging: 'navngir 2\u20133 idretter med st\u00f8tte', proficient: 'navngir selvstendig 5\u20136 idretter og beskriver grunnbevegelsen', advanced: 'navngir 8+ idretter og forteller om utstyr og regler' },
    ],
  },

  spring: {
    snippetAnswer: 'V\u00e5r-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker blomster, sommerfugler og regnbuer til \u00e5 \u00f8ve telling, kobling og fargelegging. \u00c5rstidens fornyelse og vekst fascinerer sm\u00e5 barn. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'V\u00e5rtemaet er s\u00e6rlig kraftfullt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer opplever \u00e5rstidsskiftet med hele kroppen \u2014 de peker p\u00e5 de f\u00f8rste blomstene, jager sommerfugler og plasker i vanndammer med en begeistring som gj\u00f8r v\u00e5ren til det perfekte l\u00e6ringstemaet. Veksten fra fr\u00f8 til blomst gir en konkret modell for sekvensering. Telling av kronblader, marih\u00f8ner og regnbuer gj\u00f8r matematikk sanselig. Fargelegging av blomster med tydelige konturer trener finmotorikk. Rammeplan for barnehagen vektlegger natur, milj\u00f8 og teknologi, og v\u00e5roppgaver st\u00f8tter dette n\u00e5r de pares med utforskning utend\u00f8rs.',
    developmentalMilestones: [
      { milestone: 'Naturlig nysgjerrighet p\u00e5 vekst (3\u20134-\u00e5ringer begynner \u00e5 legge merke til forandring i naturen)', howWeAddress: 'Sekvenserings\u00f8velser med fr\u00f8-til-blomst-stadier gj\u00f8r vekstbegrepet visuelt og forst\u00e5elig' },
      { milestone: 'Telling i sanserike scener (oppbygging av visuell s\u00f8keferdighet)', howWeAddress: 'Finn-og-tell-aktiviteter med sommerfugler, blomster og marih\u00f8ner i v\u00e5rscener trener b\u00e5de telling og observasjon' },
      { milestone: 'Farge- og formgjenkjenning (f\u00f8rskolebarn utvider fargeordforr\u00e5det)', howWeAddress: 'V\u00e5rens rike fargepalett bruker blomster og regnbuer til \u00e5 navngi og sortere farger i en meningsfull kontekst' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 tre kjente elementer (blomst, sommerfugl, sol), bruk ekte blomster og blader som supplement, og hold aktivitetene korte og sanselige. For avanserte f\u00f8rskolebarn tilf\u00f8y sekvensering av vekstfaser, introduser ordsporing av v\u00e5rord, og la dem plante fr\u00f8 og f\u00f8lge spiringen.',
    parentTakeaway: 'V\u00e5ren skjer rett utenfor vinduet. G\u00e5 p\u00e5 tur og tell blomster, sommerfugler og fugler. Plant et fr\u00f8 i en potte p\u00e5 vinduskarmen og la barnet m\u00e5le veksten. Samle blader og kronblader og sorter dem etter farge. Ta med et v\u00e5r-fargeleggingsark utend\u00f8rs og fargelegg ved siden av ekte blomster. Naturen er det beste klasserommet.',
    classroomIntegration: 'V\u00e5rtemaet f\u00f8lger naturens kalender: i samlingen vises ekte blomster og knopper, ved l\u00e6ringsstasjoner arbeides med telle- og sekvenserings\u00f8velser, i sandkassen plantes fr\u00f8 i jord, og p\u00e5 turer observeres v\u00e5rens forandringer i n\u00e6rmilj\u00f8et. Rammeplanens m\u00e5l for natur, \u00e5rstider og sanseopplevelser st\u00f8ttes gjennom hele v\u00e5ren.',
    assessmentRubric: [
      { skill: 'Telling i v\u00e5rscener', emerging: 'teller 1\u20135 blomster/sommerfugler med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 v\u00e5rgjenstander og kobler med tall', advanced: 'teller over 10 og sammenligner mengder (flere tulipaner enn p\u00e5skeliljer)' },
      { skill: 'Vekstsekvensering', emerging: 'ordner 2 trinn (fr\u00f8, blomst) med voksenst\u00f8tte', proficient: 'ordner selvstendig 3 vekstfaser i riktig rekkef\u00f8lge', advanced: 'ordner 4\u20135 faser og forklarer hva som skjer i hvert trinn' },
      { skill: 'V\u00e5rgjenkjenning og ordforr\u00e5d', emerging: 'navngir 2\u20133 v\u00e5relementer med st\u00f8tte (blomst, sol)', proficient: 'navngir selvstendig 5\u20136 v\u00e5rgjenstander og beskriver dem', advanced: 'navngir 8+ elementer og bruker beskrivende ord om \u00e5rstiden' },
    ],
  },

  summer: {
    snippetAnswer: 'Sommer-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker sol, strand og is til \u00e5 \u00f8ve telling, sortering og fargelegging. Sommerens frihet og uteliv gir maksimal motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sommertemaet er perfekt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer opplever sommeren som \u00e5rets mest sanserike tid \u2014 sand mellom t\u00e6rne, vannlek, is i solen og lange lyse kvelder fyller dem med glede og energi. Denne sanselige rikdommen gj\u00f8r sommeroppgaver usedvanlig motiverende. Telling av skjell, iskrem-kuler og sandslott gj\u00f8r matematikk konkret. Sortering av strandgjenstander bygger kategorisering. Fargelegging av solskinnscener med klare farger trener finmotorikk. Rammeplan for barnehagen vektlegger sanseopplevelser og utel\u00e6ring, og sommertemaet st\u00f8tter dette ideelt.',
    developmentalMilestones: [
      { milestone: 'Sanseutforskning (3\u20134-\u00e5ringer l\u00e6rer gjennom ber\u00f8ring, smak og syn)', howWeAddress: 'Sommerscener med sand, vann og is inviterer til multisensoriske forbindelser mellom oppgaveark og virkelige opplevelser' },
      { milestone: 'Telling av naturlige samlinger (barn samler ting og teller dem)', howWeAddress: 'Telleaktiviteter med skjell, sandslott og iskrem-kuler pares med ekte innsamling p\u00e5 stranden eller i hagen' },
      { milestone: 'Fargegjenkjenning i naturlige omgivelser (sommeren er rik p\u00e5 klare farger)', howWeAddress: 'Fargeleggings- og sorteringsaktiviteter med sommergjenstander i sterke farger styrker fargeordforr\u00e5det' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 tre kjente elementer (sol, is, ball), bruk ekte skjell og sand som supplement, og hold aktivitetene sanserike. For avanserte f\u00f8rskolebarn tilf\u00f8y telling over 10, introduser ordsporing av sommerord, og la dem sortere strandgjenstander etter to egenskaper.',
    parentTakeaway: 'Sommeren er \u00e9n lang l\u00e6ringsmulighet. Tell skjell p\u00e5 stranden og sorter dem etter st\u00f8rrelse og farge. Lag sandslott og tell t\u00e5rnene. Tell iskrem-kuler og velg farger. Tegn sommerscener etter en dag i solen. La barnet hjelpe med \u00e5 pakke strandveska og telle h\u00e5ndkl\u00e6r, solkremflasker og vannflasker. Sommerferie er matematikkferie.',
    classroomIntegration: 'Sommertemaet brukes f\u00f8r sommerferien: i samlingen snakkes det om sommerfugler og stranddyr, ved l\u00e6ringsstasjoner arbeides med telle- og sorteringsark, i vannlek-omr\u00e5det utforskes flyte/synke, og i kunstkroken males sommerscener. Rammeplanens m\u00e5l for sanseopplevelser, natur og utel\u00e6ring oppfylles gjennom hele sommertemaet.',
    assessmentRubric: [
      { skill: 'Telling med sommergjenstander', emerging: 'teller 1\u20135 skjell/iskrem-kuler med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 sommergjenstander og kobler med tall', advanced: 'teller over 10 og sammenligner mengder (flere hvite enn brune skjell)' },
      { skill: 'Sommersortering', emerging: 'sorterer sommergjenstander i to grupper med st\u00f8tte', proficient: 'sorterer selvstendig etter farge, st\u00f8rrelse eller type', advanced: 'sorterer etter to egenskaper og forklarer sorteringskriteriene' },
      { skill: 'Sommergjenkjenning og ordforr\u00e5d', emerging: 'navngir 2\u20133 sommergjenstander med st\u00f8tte', proficient: 'navngir selvstendig 5\u20136 sommergjenstander og beskriver dem', advanced: 'navngir 8+ gjenstander og forteller om sommeraktiviteter knyttet til dem' },
    ],
  },

  superheroes: {
    snippetAnswer: 'Superhelt-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker kapper, masker og superkrefter til \u00e5 \u00f8ve telling, kobling og kreativ fargelegging. Fantasilekens kraft gir sterk motivasjon for l\u00e6ring. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Superhelttemaet har en s\u00e6rlig kraft for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er midt i fantasilekens blomstring \u2014 de knyter h\u00e5ndkl\u00e6r rundt halsen som kapper, later som de flyr og forteller om usynlige superkrefter. Denne fantasiverdenen gj\u00f8r superhelt-oppgaver dypt motiverende. Telling av stjerner p\u00e5 kapper og masker gir personlig matematikk. Kobling av superhelter med utstyret deres bygger logisk tenkning. Fargelegging av kapper og emblemer trener finmotorikk. Rammeplan for barnehagen vektlegger kunst, kultur og kreativitet, og superhelttemaet st\u00f8tter dette gjennom fantasilek og kreativt uttrykk.',
    developmentalMilestones: [
      { milestone: 'Fantasilek og identitetsutforskning (3\u20134-\u00e5ringer utvikler rollelek og selvframstilling)', howWeAddress: 'Superhelt-aktiviteter stimulerer rollelek og kreativ tenkning n\u00e5r barn skaper sine egne helter p\u00e5 oppgaveark' },
      { milestone: 'Visuell diskriminering (barn l\u00e6rer \u00e5 skille mellom lignende m\u00f8nstre)', howWeAddress: 'Skyggekobling og finn-forskjellen med superhelt-silhuetter styrker observasjon og visuell analyse' },
      { milestone: 'Fargevalg og kreativt uttrykk (f\u00f8rskolebarn utvikler preferanser og valg)', howWeAddress: 'Design-din-egen-superhelt-aktiviteter gir barn eierskap over fargevalg og kreative beslutninger' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk enkle superheltbilder med f\u00e5 detaljer, fokuser p\u00e5 \u00e9n aktivitet om gangen, og la barnet ha p\u00e5 seg en kappe under arbeidet. For avanserte f\u00f8rskolebarn tilf\u00f8y superhelt-m\u00f8nstergjenkjenning, introduser ordsporing av kraftord, og la dem designe en hel superheltefamilie.',
    parentTakeaway: 'Superheltleken er allerede i gang hjemme \u2014 bygg videre p\u00e5 den. Lag en kappe av et gammelt h\u00e5ndkle og en maske av papp. Gi superhelten et oppdrag: tell alle r\u00f8de ting i stuen, finn fem former p\u00e5 kj\u00f8kkenet, sorter leker etter st\u00f8rrelse. N\u00e5r matematikken blir et superoppdrag, f\u00f8ler barnet seg sterkt og motivert.',
    classroomIntegration: 'Superhelttemaet brukes i en temauke: i samlingen snakkes det om hva en helt gj\u00f8r (hjelper andre, er modig), ved l\u00e6ringsstasjoner arbeides med telle- og koblingsark, i kunstkroken designes kapper og masker, og i rolleleken l\u00f8ses oppdrag. Rammeplanens m\u00e5l for fantasi, kreativitet og sosial-emosjonell utvikling st\u00f8ttes naturlig.',
    assessmentRubric: [
      { skill: 'Telling med superhelt-emner', emerging: 'teller 1\u20135 stjerner/masker med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 superheltgjenstander og kobler med tall', advanced: 'teller over 10 og l\u00f8ser enkle oppdragsoppgaver med addisjon' },
      { skill: 'Superhelt-kobling', emerging: 'kobler 2\u20133 helter med utstyr med st\u00f8tte', proficient: 'kobler selvstendig 5\u20136 superhelter med riktig utstyr', advanced: 'kobler alle helter og forklarer hva hver superkraft brukes til' },
      { skill: 'Kreativt heltedesign', emerging: 'fargelegger en superhelt med f\u00e5 farger', proficient: 'velger bevisste farger og detaljer til sin superhelt', advanced: 'designer en komplett superhelt med navn, kappe, maske og emblem' },
    ],
  },

  toys: {
    snippetAnswer: 'Leketøy-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker dukker, biler og klosser til \u00e5 \u00f8ve telling, sortering og fargelegging. Leketøyets personlige betydning for barna gir sterk motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Leketøytemaet treffer f\u00f8rskolebarn midt i hjertet fordi tre- og fire\u00e5ringer har et dypt personlig forhold til lekene sine \u2014 favorittbamsen, den r\u00f8de bilen og klossene er barnets n\u00e6rmeste f\u00f8lgesvenner. Denne f\u00f8lelsesmessige forbindelsen gj\u00f8r leketøy-oppgaver til de mest personlig relevante av alle. Telling av dukker, biler og bamser gir matematikk med f\u00f8lelsesmessig vekt. Sortering av leketøy etter type, st\u00f8rrelse og farge styrker klassifisering. Fargelegging av leketøy med detaljerte former trener finmotorikk. Rammeplan for barnehagen vektlegger hverdagsforst\u00e5else og personlig utvikling, og leketøytemaet st\u00f8tter dette direkte.',
    developmentalMilestones: [
      { milestone: 'Kategorisering etter egenskaper (3\u20134-\u00e5ringer begynner \u00e5 sortere gjenstander etter type og funksjon)', howWeAddress: 'Sorteringsaktiviteter med leketøy etter type (kjøretøy, dukker, klosser) og st\u00f8rrelse styrker logisk klassifisering' },
      { milestone: 'Eierskap og delingsevner (barn l\u00e6rer \u00e5 dele og bytte)', howWeAddress: 'Delingsscenarier p\u00e5 oppgaveark (del 6 klosser mellom 2 barn) introduserer tidlig divisjonsforst\u00e5else' },
      { milestone: 'Finmotorisk kontroll med sm\u00e5 gjenstander (barn h\u00e5ndterer leketøy med \u00f8kende presisjon)', howWeAddress: 'Fargelegging og sporing av leketøykonturer med varierende detaljgrad trener h\u00e5nd-\u00f8ye-koordinasjon' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk kun barnets mest kjente leketøy (bamse, bil, ball), ha ekte leker p\u00e5 bordet som supplement, og fokuser p\u00e5 \u00e9n sorteringsdimensjon. For avanserte f\u00f8rskolebarn tilf\u00f8y sortering etter to egenskaper, introduser enkel telling av leketøy i kategorier, og la dem tegne og telle alt leketøyet p\u00e5 rommet sitt.',
    parentTakeaway: 'Leketøy er overalt i hjemmet, og rydding er en matteøkt. La barnet telle og sortere leketøy i kasser: biler i \u00e9n, dukker i en annen, klosser i en tredje. Tell hvor mange det er i hver kasse og sammenlign. Lek butikk med leketøy og øv priser. Bygg t\u00e5rn av klosser og tell lag. Opprydding er l\u00e6ring.',
    classroomIntegration: 'Leketøytemaet integreres i daglige rutiner: ved ryddetid sorteres leketøy i merkede kasser, ved l\u00e6ringsstasjoner arbeides med telle- og sorteringsark, i rolleleken drives leketøybutikk, og i samlingen snakkes det om favorittleker med telling og kategorisering. Rammeplanens m\u00e5l for hverdagsforst\u00e5else og sosial samhandling st\u00f8ttes direkte.',
    assessmentRubric: [
      { skill: 'Leketøysortering', emerging: 'sorterer leketøy i to grupper med voksenst\u00f8tte (biler/dukker)', proficient: 'sorterer selvstendig leketøy etter type, st\u00f8rrelse eller farge', advanced: 'sorterer etter to egenskaper og forklarer sorteringskriteriene muntlig' },
      { skill: 'Telling med leketøy', emerging: 'teller 1\u20135 leker med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 og kobler med riktig tall', advanced: 'teller over 10 og sammenligner mengder p\u00e5 tvers av kategorier' },
      { skill: 'Leketøygjenkjenning og ordforr\u00e5d', emerging: 'navngir 3\u20134 kjente leker med st\u00f8tte', proficient: 'navngir selvstendig 6\u20138 typer leketøy og beskriver dem', advanced: 'navngir 10+ og bruker beskrivende ord som myk, hard, stor, liten' },
    ],
  },

  transportation: {
    snippetAnswer: 'Transport-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker biler, busser og tog til \u00e5 \u00f8ve telling, kobling og formgjenkjenning. Kjøretøyenes fascinasjon fanger barnas oppmerksomhet umiddelbart. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Transporttemaet fascinerer f\u00f8rskolebarn dypt fordi tre- og fire\u00e5ringer er betatt av alt som beveger seg \u2014 biler, busser, tog, fly og b\u00e5ter vekker begeistring hver gang de sees p\u00e5 veien, i luften eller p\u00e5 vannet. Denne daglige fascinasjonen gj\u00f8r transportoppgaver naturlig motiverende. Telling av hjul, vinduer og passasjerer gir matematikk et kjøretøystema. Kobling av kjøretøy med steder (buss til veien, b\u00e5t til vannet) bygger logisk tenkning. Fargelegging av kjøretøy med sirkler og rektangler trener formgjenkjenning. Rammeplan for barnehagen vektlegger n\u00e6rmilj\u00f8 og samfunn, og transporttemaet st\u00f8tter dette gjennom utforskning av hvordan folk forflytter seg.',
    developmentalMilestones: [
      { milestone: 'Formgjenkjenning i hverdagsgjenstander (3\u20134-\u00e5ringer finner sirkler og rektangler i kjøretøy)', howWeAddress: 'Kjøretøyfargelegging fremhever geometriske former: runde hjul, firkantede vinduer, rektangul\u00e6re busser' },
      { milestone: 'Kategorisering etter transportform (barn l\u00e6rer at kjøretøy brukes p\u00e5 vei, vann og i luft)', howWeAddress: 'Sorteringsaktiviteter som grupperer kjøretøy etter element (land/vann/luft) bygger tidlig klassifisering' },
      { milestone: 'Telling av deler (hjul, vinduer, passasjerer)', howWeAddress: 'Telleøvelser med kjøretøydeler gj\u00f8r matematikk detaljert og visuelt engasjerende' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, begrens til tre kjente kjøretøy (bil, buss, tog), bruk leketøysbiler som supplement, og fokuser p\u00e5 enkel kobling. For avanserte f\u00f8rskolebarn tilf\u00f8y fly, helikopter og b\u00e5t, introduser telling av hjul per kjøretøy, og la dem designe sitt eget fantasikjøretøy.',
    parentTakeaway: 'Transport er overalt p\u00e5 veien. P\u00e5 vei til barnehagen tell biler, busser og sykler. P\u00e5 bussen tell passasjerene. Ved havnen se p\u00e5 b\u00e5ter og ferger. P\u00e5 flyplassen iakttas flyene. Hvert transportmiddel er en telle- og sorteringsmulighet. Lag en kjøretøybok med utklipp og barnets tegninger.',
    classroomIntegration: 'Transporttemaet integreres i hverdagen: p\u00e5 turer observeres kjøretøy p\u00e5 vei, vann og i luft, ved l\u00e6ringsstasjoner arbeides med telle- og koblingsark, i billekekroken leker barna med leketøyskjøretøy og ruter, og i samlingen snakkes det om hvordan vi transporterer oss. Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8 og samfunnsforst\u00e5else st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Kjøretøysortering', emerging: 'sorterer kjøretøy i to grupper med voksenst\u00f8tte', proficient: 'sorterer selvstendig etter transportform (land/vann/luft)', advanced: 'sorterer etter flere kriterier og forklarer hvilke som kjører, seiler eller flyr' },
      { skill: 'Telling av kjøretøydeler', emerging: 'teller hjul p\u00e5 \u00e9n bil (4) med st\u00f8tte', proficient: 'teller selvstendig hjul og vinduer p\u00e5 flere kjøretøy', advanced: 'sammenligner antall hjul og finner hvem som har flest' },
      { skill: 'Transportgjenkjenning og ordforr\u00e5d', emerging: 'navngir 2\u20133 kjøretøy med st\u00f8tte', proficient: 'navngir selvstendig 5\u20136 kjøretøy og beskriver hvor de brukes', advanced: 'navngir 8+ kjøretøy og forteller om forskjeller og likheter' },
    ],
  },

  travel: {
    snippetAnswer: 'Reise-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker kofferter, fly og kart til \u00e5 \u00f8ve telling, kobling og sekvensering. Reisens eventyr og undring fenger sm\u00e5 barn. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Reisetemaet vekker f\u00f8rskolebarns nysgjerrighet fordi tre- og fire\u00e5ringer forbinder reiser med spenning og familieopplevelser \u2014 bilturer, togreiser og flyturer er store begivenheter i et lite barns liv. Denne personlige forbindelsen gj\u00f8r reiseoppgaver dypt engasjerende. Telling av kofferter, billetter og souvenirer gir matematikk en eventyrlig ramme. Kobling av transportmidler med destinasjoner bygger logisk tenkning. Fargelegging av reisescener med mange detaljer trener finmotorikk og oppmerksomhet. Rammeplan for barnehagen vektlegger n\u00e6rmilj\u00f8 og samfunn, og reisetemaet utvider barnets horisont med en verden utenfor barnehagen.',
    developmentalMilestones: [
      { milestone: 'Romlig og geografisk bevissthet (3\u20134-\u00e5ringer begynner \u00e5 forst\u00e5 n\u00e6r og fjern)', howWeAddress: 'Enkle kartaktiviteter og kobling av land med symboler (Frankrike = Eiffelt\u00e5rnet) introduserer geografi p\u00e5 det mest grunnleggende niv\u00e5et' },
      { milestone: 'Sekvensering av hendelser (barn l\u00e6rer f\u00f8r/under/etter)', howWeAddress: 'Reisesekvensering (pakk koffert \u2192 kjør til flyplassen \u2192 fly \u2192 ankom) trener tidslig ordning' },
      { milestone: 'Ordforr\u00e5dsutvidelse med nye begreper (reiser introduserer mange nye ord)', howWeAddress: 'Reiseordforr\u00e5d som koffert, billett, pass og destinasjon utvider barnets spr\u00e5k i en spennende kontekst' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 kjente reiseelementer (koffert, bil, fly), bruk leketøyskofferter og kart som supplement, og hold scenene enkle. For avanserte f\u00f8rskolebarn tilf\u00f8y land- og flagggjenkjenning, introduser enkel kartlesing, og la dem planlegge en fantasireise med tegninger.',
    parentTakeaway: 'Reiser er de beste l\u00e6ringsopplevelsene. F\u00f8r en tur, vis barnet p\u00e5 et kart hvor dere skal. La barnet hjelpe med \u00e5 pakke og telle ting i kofferten. P\u00e5 reisen tell biler, b\u00e5ter eller vindm\u00f8ller. Ta bilder og lag en reisedagbok etterpå. Ogs\u00e5 en tur til bestemor er en reise verdt \u00e5 l\u00e6re av.',
    classroomIntegration: 'Reisetemaet brukes i en temauke: i samlingen vises bilder fra ulike land, ved l\u00e6ringsstasjoner arbeides med telle- og koblingsark med reisemotiver, i rolleleken pakkes kofferter og flys i pappeske-fly, og p\u00e5 veggen henges et verdenskart med barnas reiseopplevelser. Rammeplanens m\u00e5l for kulturforst\u00e5else og samfunnsbevissthet st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Telling med reisegjenstander', emerging: 'teller 1\u20135 kofferter/billetter med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 reisegjenstander og kobler med tall', advanced: 'teller over 10 og l\u00f8ser enkle problemer (3 kofferter + 2 vesker = ?)' },
      { skill: 'Reisesekvensering', emerging: 'ordner 2 trinn (pakk, reis) med voksenst\u00f8tte', proficient: 'ordner selvstendig 3\u20134 reisetrinn i riktig rekkef\u00f8lge', advanced: 'ordner 5+ trinn og forteller en sammenhengende reisehistorie' },
      { skill: 'Reisegjenkjenning og ordforr\u00e5d', emerging: 'navngir 2\u20133 reisegjenstander med st\u00f8tte', proficient: 'navngir selvstendig 5\u20136 reiserelaterte ord', advanced: 'navngir 8+ ord og forteller om reiseopplevelser' },
    ],
  },

  vegetables: {
    snippetAnswer: 'Grønnsak-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker gulrøtter, tomater og erter til \u00e5 \u00f8ve telling, sortering og fargelegging. Grønnsakenes farger og former gjør l\u00e6ringen sunn og engasjerende. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Grønnsakstemaet er s\u00e6rlig verdifullt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er i en kritisk periode for \u00e5 utvikle sunne spisevaner, og positive assosiasjoner med grønnsaker kan formes gjennom lekende l\u00e6ring. Telling av gulrøtter, tomater og erter gj\u00f8r matematikk til en del av m\u00e5ltidet. Sortering etter farge (rød tomat, grønn agurk, oransje gulrot) styrker b\u00e5de fargeordforr\u00e5d og kategorisering. Fargelegging av grønnsaker med varierte former trener finmotorikk. Rammeplan for barnehagen vektlegger kropp, helse og sanseopplevelser, og grønnsakstemaet st\u00f8tter dette direkte.',
    developmentalMilestones: [
      { milestone: 'Sansemessig begrepsbygging (3\u20134-\u00e5ringer l\u00e6rer \u00e5 beskrive gjenstander med sanseord)', howWeAddress: 'Grønnsakaktiviteter forbinder bilder med sanseord (myk tomat, hard gulrot, glatt agurk) og utvider ordforr\u00e5det' },
      { milestone: 'Fargesortering med naturlige gjenstander (oppbygging av fargekategorier)', howWeAddress: 'Sortering av grønnsaker etter farge gir en av de mest naturlige fargesorteringsaktivitetene med ekte variasjon' },
      { milestone: 'Telling i m\u00e5ltidskontekster (barn forbinder tall med hverdagen)', howWeAddress: 'Telleaktiviteter med grønnsaker p\u00e5 tallerkener og i grønnsakkasser gj\u00f8r matematikk til en del av hverdagens m\u00e5ltider' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk kun tre kjente grønnsaker (gulrot, tomat, agurk), ha ekte grønnsaker p\u00e5 bordet, og hold aktivitetene sanserike. For avanserte f\u00f8rskolebarn tilf\u00f8y flere grønnsaker, introduser ordsporing av grønnsaknavn, og la dem sortere etter b\u00e5de farge og st\u00f8rrelse.',
    parentTakeaway: 'Kjøkkenet er det beste klasserommet for grønnsaker. La barnet hjelpe med \u00e5 vaske, telle og sortere grønnsaker under matlaging. Tell gulrøtter, sammenlign st\u00f8rrelser, sorter etter farge. Bes\u00f8k en bondemarknad og la barnet peke p\u00e5 og navngi grønnsaker. Dyrk en enkel kjøkkenhage med radiser eller erter. Positive grønnsakopplevelser former sunne vaner.',
    classroomIntegration: 'Grønnsakstemaet integreres i barnehagens m\u00e5ltidsrutiner: ved lunsjen navngis og telles grønnsaker, i samlingen introduseres ukens grønnsak med smaksprøver, ved l\u00e6ringsstasjoner arbeides med sorterings- og telleark, og i kokeprosjekter lages enkel mat med grønnsaker. Rammeplanens m\u00e5l for helse, sanseopplevelser og natur st\u00f8ttes direkte.',
    assessmentRubric: [
      { skill: 'Grønnsaksortering', emerging: 'sorterer grønnsaker i to fargegrupper med st\u00f8tte', proficient: 'sorterer selvstendig etter farge, st\u00f8rrelse eller type', advanced: 'sorterer etter to egenskaper og forklarer kriteriene' },
      { skill: 'Telling med grønnsaker', emerging: 'teller 1\u20135 grønnsaker med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 og kobler med riktig tall', advanced: 'teller over 10 og sammenligner mengder (flere gulrøtter enn tomater)' },
      { skill: 'Grønnsakgjenkjenning og ordforr\u00e5d', emerging: 'navngir 2\u20133 grønnsaker med st\u00f8tte', proficient: 'navngir selvstendig 5\u20136 grønnsaker og beskriver farge og form', advanced: 'navngir 8+ grønnsaker og bruker sanseord som myk, hard, sprø' },
    ],
  },

  weather: {
    snippetAnswer: 'V\u00e6r-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker sol, regn, skyer og snø til \u00e5 \u00f8ve telling, kobling og observasjon. V\u00e6rets daglige skifting fascinerer sm\u00e5 barn. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'V\u00e6rtemaet er unikt kraftfullt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer opplever v\u00e6ret med hele kroppen hver eneste dag \u2014 regnet i ansiktet, solen p\u00e5 huden, vinden i h\u00e5ret og snøen under støvlene. Denne daglige, sanselige opplevelsen gj\u00f8r v\u00e6r til et tema som aldri f\u00f8les abstrakt. Telling av regndråper, skyer og snøfnugg gir matematikk i en observerbar kontekst. Kobling av v\u00e6rtyper med p\u00e5kledning bygger logisk tenkning. Fargelegging av v\u00e6rscener trener finmotorikk. Rammeplan for barnehagen vektlegger natur, \u00e5rstider og observasjon, og v\u00e6rtemaet st\u00f8tter dette direkte.',
    developmentalMilestones: [
      { milestone: 'Daglig observasjon og beskrivelse (3\u20134-\u00e5ringer l\u00e6rer \u00e5 sette ord p\u00e5 hverdagsopplevelser)', howWeAddress: 'V\u00e6robservasjonsaktiviteter som ber barn beskrive dagens v\u00e6r med ord og bilder trener muntlig spr\u00e5k' },
      { milestone: '\u00c5rsak-virkning-forst\u00e5else (regn = vanndammer, sol = varme)', howWeAddress: 'Koblingsaktiviteter som forbinder v\u00e6rtyper med konsekvenser (regn \u2192 paraply, snø \u2192 støvler) bygger logisk tenkning' },
      { milestone: 'Symbolforst\u00e5else (v\u00e6rsymboler som piktogrammer)', howWeAddress: 'V\u00e6rsymboler (sol, sky, regndråpe) introduserer ideen om at bilder kan representere begreper \u2014 et forstadie til bokstaver' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 tre grunnleggende v\u00e6rtyper (sol, regn, snø), bruk vinduet som supplement, og hold aktivitetene konkrete. For avanserte f\u00f8rskolebarn tilf\u00f8y vind, t\u00e5ke og regnbue, introduser en v\u00e6rkalender med daglig registrering, og la dem forutsi morgendagens v\u00e6r.',
    parentTakeaway: 'V\u00e6ret er den mest tilgjengelige l\u00e6ringen overhodet \u2014 man trenger bare \u00e5 se ut av vinduet. Start hver morgen med \u00e5 snakke om dagens v\u00e6r: er det sol, regn eller overskyet? La barnet velge kl\u00e6r etter v\u00e6ret. Tell regndråper p\u00e5 ruten. Bygg en snømann og tell kulene. Lag en enkel v\u00e6rdagbok med symboler for sol, sky og regn.',
    classroomIntegration: 'V\u00e6rtemaet integreres i daglige rutiner: i morgensamlingen observeres v\u00e6ret og settes symbol p\u00e5 kalenderen, ved l\u00e6ringsstasjoner arbeides med telle- og koblingsark, i garderoben snakkes det om v\u00e6rpassende p\u00e5kledning, og p\u00e5 utelekeplassen oppleves v\u00e6ret med alle sanser. Rammeplanens m\u00e5l for natur, observasjon og daglige rutiner st\u00f8ttes hele \u00e5ret.',
    assessmentRubric: [
      { skill: 'V\u00e6rgjenkjenning og symboler', emerging: 'gjenkjenner sol og regn med st\u00f8tte', proficient: 'identifiserer selvstendig 4\u20135 v\u00e6rtyper og kobler med symboler', advanced: 'bruker v\u00e6rsymboler til \u00e5 f\u00f8re en daglig v\u00e6rkalender og beskriver v\u00e6ret muntlig' },
      { skill: 'V\u00e6r-kobling (type og konsekvens)', emerging: 'kobler \u00e9n v\u00e6rtype med p\u00e5kledning med st\u00f8tte (regn = paraply)', proficient: 'kobler selvstendig 3\u20134 v\u00e6rtyper med riktige kl\u00e6r og utstyr', advanced: 'kobler alle v\u00e6rtyper og forklarer hvorfor man kler seg slik' },
      { skill: 'Telling i v\u00e6rscener', emerging: 'teller 1\u20135 skyer/regndråper med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 v\u00e6relementer og kobler med tall', advanced: 'teller over 10 og sammenligner (flere regndråper enn snøfnugg)' },
    ],
  },

  winter: {
    snippetAnswer: 'Vinter-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker snøfnugg, snømenn og votter til \u00e5 \u00f8ve telling, m\u00f8nstergjenkjenning og fargelegging. Vinterens magiske stemning driver sterk motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Vintertemaet treffer f\u00f8rskolebarn med s\u00e6rlig magi fordi tre- og fire\u00e5ringer opplever snø, is og frost som ren undring \u2014 \u00e5 fange snøfnugg p\u00e5 tungen, bygge snømenn og lage sne\u00e9ngler fyller dem med glede. Denne sanselige begeistringen gj\u00f8r vinteroppgaver dypt motiverende. Telling av snøfnugg, votter og snøkuler gir matematikk i en trygg og magisk kontekst. Kobling av vinterbekledning (vott til vott, st\u00f8vel til st\u00f8vel) styrker paring og symmetri. Fargelegging av snøscener med hvite og bl\u00e5 nyanser trener finmotorikk. Rammeplan for barnehagen vektlegger \u00e5rstider, natur og sanseopplevelser, og vintertemaet st\u00f8tter dette hele vinteren.',
    developmentalMilestones: [
      { milestone: 'Paring og symmetri (3\u20134-\u00e5ringer l\u00e6rer \u00e5 koble par som votter og st\u00f8vler)', howWeAddress: 'Koblingsaktiviteter med vinterpar (finn den matchende votten, par st\u00f8vlene) styrker visuell diskriminering og symmetriforst\u00e5else' },
      { milestone: 'M\u00f8nstergjenkjenning (f\u00f8rskolebarn oppdager gjentakende m\u00f8nstre)', howWeAddress: 'Snøfnugg- og vottem\u00f8nstre introduserer gjentakelsesm\u00f8nstre (rød vott, bl\u00e5 vott, rød vott...) p\u00e5 en visuelt tiltalende m\u00e5te' },
      { milestone: 'Sansemessig begrepsbygging (kaldt, glatt, mykt)', howWeAddress: 'Vinterscener forbinder bilder med sanseord (kald snø, glatt is, myk vott) og utvider sensorisk ordforr\u00e5d' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 tre kjente vinterelementer (snømann, vott, snøfnugg), bruk ekte snø eller is som supplement, og hold aktivitetene enkle. For avanserte f\u00f8rskolebarn tilf\u00f8y mer komplekse m\u00f8nstre, introduser ordsporing av vinterord, og la dem designe sitt eget snøfnuggm\u00f8nster.',
    parentTakeaway: 'Vinteren er full av l\u00e6ring. Bygg en snømann og tell kulene, øynene og knappene. Fang snøfnugg p\u00e5 m\u00f8rkt papir og se m\u00f8nstrene. Koble votter og st\u00f8vler i garderoben. Tegn p\u00e5 duggede vinduer. Lag is-eksperimenter i fryseren. Vinteren inviterer til naturvitenskap, kunst og matematikk \u2014 alt i barnets eget tempo.',
    classroomIntegration: 'Vintertemaet integreres i \u00e5rstidsbaserte rutiner: i samlingen snakkes det om v\u00e6ret og vinteren, ved l\u00e6ringsstasjoner arbeides med koblings- og m\u00f8nsterark, i garderoben \u00f8ves paring av votter og st\u00f8vler, og p\u00e5 utelekeplassen utforskes snø og is. Rammeplanens m\u00e5l for \u00e5rstider, sanseopplevelser og natur st\u00f8ttes hele vinteren.',
    assessmentRubric: [
      { skill: 'Vinterpar-kobling', emerging: 'kobler 1\u20132 vott/st\u00f8velpar med voksenst\u00f8tte', proficient: 'kobler selvstendig 4\u20135 vinterpar korrekt', advanced: 'kobler alle par og forklarer hvilke m\u00f8nstre som passer sammen' },
      { skill: 'Telling med vintergjenstander', emerging: 'teller 1\u20135 snøfnugg/kuler med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 vintergjenstander og kobler med tall', advanced: 'teller over 10 og sammenligner mengder (flere snøfnugg enn snømenn)' },
      { skill: 'M\u00f8nstergjenkjenning (vintersekvenser)', emerging: 'kopierer et enkelt AB-m\u00f8nster med st\u00f8tte (rød/bl\u00e5)', proficient: 'fortsetter selvstendig et AB- eller ABB-m\u00f8nster med vintergjenstander', advanced: 'skaper egne m\u00f8nstre med tre eller flere elementer' },
    ],
  },

  xmas: {
    snippetAnswer: 'Jule-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker julekuler, gaver og tr\u00e6r til \u00e5 \u00f8ve telling, kobling og fargelegging. Julens magi og forventning gir den sterkeste motivasjonen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Juletemaet er det mest motiverende temaet for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer opplever julen som \u00e5rets absolutt mest magiske tid \u2014 adventskalendere, nisser, gaver og juletrepynt skaper en forventning som er uovertruffen. Nedtellingen til julaften gir den mest naturlige tallrekke\u00f8velsen som finnes. Telling av julekuler p\u00e5 treet, gaver under treet og lys i vinduet gir matematikk f\u00f8lelsesmessig dybde. Kobling av gaver med barn styrker logisk tenkning. Fargelegging av julescener trener finmotorikk. Rammeplan for barnehagen vektlegger kulturell identitet og tradisjoner, og norske juletradisjoner oppfyller dette m\u00e5let direkte.',
    developmentalMilestones: [
      { milestone: 'Tallrekkeforst\u00e5else gjennom nedtelling (adventskalenderen er den ultimate telle\u00f8velsen)', howWeAddress: 'Kalenderaktiviteter og nedtellingstavler gj\u00f8r tallrekken personlig meningsfull og motiverende' },
      { milestone: 'Kulturell bevissthet (3\u20134-\u00e5ringer begynner \u00e5 forst\u00e5 tradisjoner)', howWeAddress: 'Juleaktiviteter som inkluderer norske tradisjoner som nisser, riskrem og lucia styrker kulturell identitet' },
      { milestone: 'Gavmildhet og deling (barn l\u00e6rer \u00e5 gi og dele)', howWeAddress: 'Gavefordeling p\u00e5 oppgaveark (del 6 gaver mellom 3 barn) introduserer tidlig divisjon og sosiale ferdigheter' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk kun de mest kjente julesymbolene (tre, gave, stjerne), hold scenene enkle med f\u00e5 gjenstander, og bruk ekte julekuler som supplement. For avanserte f\u00f8rskolebarn tilf\u00f8y adventskalender-matematikk, introduser ordsporing av juleord, og la dem designe sitt eget juletre.',
    parentTakeaway: 'Julen er \u00e5rets st\u00f8rste l\u00e6ringsmulighet. La barnet \u00e5pne kalenderluka og telle dager til julaften. Tell julekuler n\u00e5r dere pynter treet. Sorter gaver etter st\u00f8rrelse. Bak sm\u00e5kaker og tell ingrediensene. Skriv barnets navn p\u00e5 gavekort. Julens forventning er den mest kraftfulle l\u00e6ringsmotoren \u2014 bruk den aktivt.',
    classroomIntegration: 'Juletemaet brukes hele desember: i samlingen \u00e5pnes adventskalenderen med en daglig l\u00e6ringsaktivitet, ved l\u00e6ringsstasjoner arbeides med telle- og koblingsark, i kunstkroken lages julepynt og nisser, og i rolleleken lekes julaften. Rammeplanens m\u00e5l for kulturell identitet, tradisjoner og sosial-emosjonell utvikling st\u00f8ttes gjennom hele desember.',
    assessmentRubric: [
      { skill: 'Telling med julegjenstander', emerging: 'teller 1\u20135 julekuler/gaver med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 julegjenstander og kobler med tall', advanced: 'teller over 10 og l\u00f8ser enkle jule-addisjonsoppgaver' },
      { skill: 'Adventskalender-nedtelling', emerging: 'forst\u00e5r at man teller ned mot julaften med st\u00f8tte', proficient: 'teller selvstendig dager og finner dagens dato p\u00e5 kalenderen', advanced: 'beregner hvor mange dager som gjenstår og bruker subtraksjon' },
      { skill: 'Julegjenkjenning og ordforr\u00e5d', emerging: 'navngir 2\u20133 juleelementer med st\u00f8tte (tre, gave)', proficient: 'navngir selvstendig 5\u20136 julegjenstander og beskriver dem', advanced: 'navngir 8+ elementer og forteller om norske juletradisjoner' },
    ],
  },

  zoo: {
    snippetAnswer: 'Dyrehage-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker l\u00f8ver, elefanter og aper til \u00e5 \u00f8ve telling, sortering og fargelegging. Eksotiske dyrs fascinasjon gir dypt engasjement. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Dyrehagetemaet er magisk for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer reagerer p\u00e5 eksotiske dyr med ustoppelig begeistring \u2014 l\u00f8ver som brøler, elefanter som spruter vann og aper som svinger seg vekker en fascinasjon som driver dyp l\u00e6ring. Denne f\u00f8lelsesmessige forbindelsen gj\u00f8r dyrehage-oppgaver til noen av de mest engasjerende av alle. Telling av dyr i innhegninger gir konkret matematikk. Sortering av dyr etter st\u00f8rrelse, farge eller type bygger klassifisering. Kobling av dyr med maten deres introduserer \u00e5rsak-virkning. Fargelegging av detaljerte dyrefigurer trener finmotorikk. Rammeplan for barnehagen vektlegger natur, dyr og nysgjerrighet, og dyrehagetemaet st\u00f8tter dette direkte.',
    developmentalMilestones: [
      { milestone: 'Dyreklassifisering (3\u20134-\u00e5ringer begynner \u00e5 gruppere dyr etter egenskaper)', howWeAddress: 'Sorteringsaktiviteter med dyrehagedyr etter st\u00f8rrelse (stor elefant vs. liten ape) og type (fugler vs. pattedyr) styrker kategorisering' },
      { milestone: 'Telling i visuelt rike scener (oppbygging av visuell s\u00f8keferdighet)', howWeAddress: 'Finn-og-tell-aktiviteter i dyrehagescener med mange dyr trener b\u00e5de telling og visuell oppmerksomhet' },
      { milestone: 'Ordforr\u00e5dsutvidelse med dyrenavn (barn l\u00e6rer mange nye ord)', howWeAddress: 'Koblings- og navngivingsaktiviteter utvider ordforr\u00e5det med eksotiske dyrenavn i en spennende kontekst' },
      { milestone: 'St\u00f8rrelsesforst\u00e5else (sammenligning av sm\u00e5 og store dyr)', howWeAddress: 'Stor-liten-sammenligninger mellom en mus og en sjiraff eller en ape og en elefant introduserer m\u00e5lebegreper naturlig' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 tre kjente dyr (l\u00f8ve, elefant, ape), bruk leketøysdyr som supplement, og hold scenene enkle med f\u00e5 dyr. For avanserte f\u00f8rskolebarn tilf\u00f8y eksotiske dyr, introduser dyreklassifisering etter levested, og la dem designe sin egen drømmedyrehage.',
    parentTakeaway: 'Et dyrehagebes\u00f8k er den ultimate l\u00e6ringsopplevelsen. F\u00f8r bes\u00f8ket gjennomg\u00e5 dyrehage-oppgaveark og l\u00e6r dyrenavnene. I dyrehagen tell dyrene i hver innhegning og sammenlign. Etter bes\u00f8ket tegn favorittdyrene og tell hvor mange dere s\u00e5. Ogs\u00e5 uten dyrehagebes\u00f8k kan leketøysdyr, bildebøker og dyrevideoer bringe dyrehagen hjem i stuen.',
    classroomIntegration: 'Dyrehagetemaet brukes i en dyretemauke: i samlingen introduseres ukens dyr med bilder og lyder, ved l\u00e6ringsstasjoner arbeides med telle- og sorteringsark, i rolleleken drives dyrepark og dyrepasserlek, og i kunstkroken males og modelleres dyr. Rammeplanens m\u00e5l for natur, dyr og nysgjerrighet integreres gjennom hele uken.',
    assessmentRubric: [
      { skill: 'Dyreklassifisering (dyrehage)', emerging: 'sorterer dyr i to grupper med voksenst\u00f8tte (store/sm\u00e5)', proficient: 'sorterer selvstendig dyrehagedyr etter st\u00f8rrelse, type eller levested', advanced: 'sorterer etter to kriterier og forklarer valgene sine muntlig' },
      { skill: 'Telling i dyrehagescener', emerging: 'teller 1\u20135 dyr i en scene med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 dyrehagedyr og kobler med tall', advanced: 'teller over 10 og sammenligner mengder (flere aper enn l\u00f8ver)' },
      { skill: 'Dyregjenkjenning og ordforr\u00e5d', emerging: 'navngir 3\u20134 kjente dyrehagedyr med st\u00f8tte', proficient: 'navngir selvstendig 6\u20138 dyrehagedyr og beskriver utseendet', advanced: 'navngir 10+ dyr og forteller om hvor de lever og hva de spiser' },
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
  const filePath = path.join(THEMES_DIR, theme, 'no.ts');

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
      console.log(`SKIP (already enriched): ${theme}/no.ts`);
      continue;
    }
  }

  // Find the insertion point: end of faq array in preschool block
  // Pattern: the faq closing "],\n" before 'kindergarten'
  const preschoolIdx = content.indexOf("'preschool'");
  const kindergartenIdx = content.indexOf("'kindergarten'");

  if (preschoolIdx === -1 || kindergartenIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/no.ts`);
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
    console.error(`NO FAQ END FOUND: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = preschoolIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/no.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
