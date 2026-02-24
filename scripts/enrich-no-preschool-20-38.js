#!/usr/bin/env node
/**
 * SEO Part 254: NO Preschool Grade Enrichment — Themes 20-38
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 19 NO theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    snippetAnswer: 'Frukt-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker epler, bananer og jordb\u00e6r til \u00e5 \u00f8ve telling, sortering etter farge og st\u00f8rrelse, og finmotorisk fargelegging. Fruktenes kjente farger og former gj\u00f8r l\u00e6ringen konkret og motiverende. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Frukttemaet er et av de mest naturlige l\u00e6ringstemaene for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer m\u00f8ter frukt ved nesten hvert m\u00e5ltid og mellomm\u00e5ltid. Denne daglige kjennskapen gir en emosjonell og sanselig forankring som gj\u00f8r oppgaveark umiddelbart gjenkjennelige og engasjerende. Barn i denne alderen bygger sorteringsevne \u2014 de grupperer etter farge (r\u00f8de epler, gule bananer), st\u00f8rrelse (stor vannmelon, liten bl\u00e5b\u00e6r) og form (rund appelsiner, lang banan) \u2014 og frukt tilbyr det mest intuitive materialet for denne kognitive milep\u00e6len. Telling av frukter i en kurv trener en-til-en-korrespondanse, mens sporing av fruktord utvikler blyantgrepet. Rammeplan for barnehagen vektlegger kropp og helse, og fruktoppgaver st\u00f8tter dette n\u00e5r barna kobler sunn mat med positive l\u00e6ringsopplevelser.',
    developmentalMilestones: [
      { milestone: 'Sortering etter egenskap (3\u20134-\u00e5ringer grupperer gjenstander etter farge, st\u00f8rrelse eller form)', howWeAddress: 'Fruktsorteringsaktiviteter der barn grupperer epler, bananer og druer etter farge eller st\u00f8rrelse bygger klassifiseringsevne' },
      { milestone: 'Telling av konkrete gjenstander opp til 10', howWeAddress: 'Tell-fruktene-i-kurven-oppgaver gir h\u00e5ndgripelig matematikk der hvert fruktstykke representerer \u00e9n enhet' },
      { milestone: 'Fargegjenkjenning og navngiving (f\u00f8rskolebarn l\u00e6rer \u00e5 koble fargenavn med gjenstander)', howWeAddress: 'Fargelegging av frukt med riktige farger (r\u00f8dt eple, gul banan) forsterker fargebegreper i en kjent kontekst' },
      { milestone: 'Finmotorisk kontroll gjennom fargelegging og sporing', howWeAddress: 'Fruktillustrasjoner med tykke konturer og fruktordsporing trener blyantgrep og h\u00e5nd-\u00f8ye-koordinasjon' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, begrens til tre kjente frukter (eple, banan, jordb\u00e6r), bruk ekte frukt som supplement slik at barnet kan holde, lukte og smake det de arbeider med, og fokuser p\u00e5 \u00e9n ferdighet om gangen. For avanserte f\u00f8rskolebarn utvid til uvanlige frukter (kiwi, mango, granateple), introduser enkel addisjon med frukttellere og la dem sortere etter flere egenskaper samtidig.',
    parentTakeaway: 'Frukt er det enkleste temaet \u00e5 forsterke hjemme fordi det dukker opp ved hvert m\u00e5ltid. La barnet telle fruktstykker p\u00e5 tallerkenen, sortere frukt i handlekurven etter farge, og velge ukens frukt p\u00e5 butikken. Lag en fruktsalat sammen og tell ingrediensene. La barnet tegne sin favorittfrukt og snakk om fargen, formen og smaken \u2014 dette bygger b\u00e5de ordforr\u00e5d og sansebevissthet.',
    classroomIntegration: 'Frukttemaet integreres i f\u00f8rskolens m\u00e5ltidsrutiner: ved lunsjen navngis fruktene i matboksen, i samlingen introduseres ukens frukt med smakspr\u00f8ver, ved l\u00e6ringsstasjoner arbeides med fruktsortering og telleark, og p\u00e5 matlagingsdager lages fruktsalat med telling av ingredienser. Denne koblingen mellom oppgaveark og daglig matopplevelse oppfyller Rammeplanens m\u00e5l for kropp, helse og spr\u00e5kutvikling.',
    assessmentRubric: [
      { skill: 'Fruktsortering etter egenskap', emerging: 'sorterer frukter i to grupper med voksenst\u00f8tte (r\u00f8d/gul)', proficient: 'sorterer selvstendig etter farge, st\u00f8rrelse eller form', advanced: 'sorterer etter to egenskaper samtidig og forklarer valgene' },
      { skill: 'Telling med fruktmotiver', emerging: 'teller 1\u20135 frukter med peking og st\u00f8tte', proficient: 'teller selvstendig opp til 10 frukter og kobler med riktig tall', advanced: 'teller over 10 og sammenligner mengder (flere epler enn bananer)' },
      { skill: 'Finmotorisk kontroll (fruktfargelegging)', emerging: 'fargelegger med grove str\u00f8k, delvis utenfor konturene', proficient: 'fargelegger frukt innenfor konturene med riktige farger', advanced: 'bruker nyanser og detaljer i fruktbildene (skygger, fruktstilk)' },
    ],
  },

  furniture: {
    snippetAnswer: 'M\u00f8bel-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker stoler, bord og senger til \u00e5 \u00f8ve formgjenkjenning, telling og romlige begreper. Barnas hverdagsmilj\u00f8 hjemme og i barnehagen gj\u00f8r temaet umiddelbart gjenkjennelig. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'M\u00f8beltemaet er overraskende rikt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer bokstavelig talt lever blant m\u00f8bler hele dagen \u2014 de sitter p\u00e5 stoler, spiser ved bord, sover i senger og leker under sofaer. Denne n\u00e6rheten gj\u00f8r m\u00f8bler til det mest tilgjengelige temaet for romlige begreper: p\u00e5, under, ved siden av, foran, bak. Formgjenkjenning styrkes n\u00e5r barn finner firkanter i bordf\u00f8tter, sirkler i bordplater og rektangler i bokhyller. Telling av stolbein, vinduer og rom gir konkret matematikk. Rammeplan for barnehagen vektlegger barns utforskning av n\u00e6rmilj\u00f8et, og m\u00f8beltemaet bruker det mest umiddelbare milj\u00f8et \u2014 rommet barnet befinner seg i \u2014 som l\u00e6ringsarena.',
    developmentalMilestones: [
      { milestone: 'Romlige begreper (3\u20134-\u00e5ringer l\u00e6rer p\u00e5, under, ved siden av, foran, bak)', howWeAddress: 'M\u00f8belscener der barn plasserer gjenstander i forhold til m\u00f8bler bygger romlig ordforr\u00e5d og forst\u00e5else' },
      { milestone: 'Formgjenkjenning i hverdagsomgivelser', howWeAddress: 'Finn-formene-i-m\u00f8blene-aktiviteter der barn identifiserer geometriske former i stoler, bord og hyller' },
      { milestone: 'Kategorisk sortering (gruppering etter funksjon eller rom)', howWeAddress: 'Sorteringsoppgaver der barn plasserer m\u00f8bler i riktig rom (kj\u00f8kken, soverom, stue) bygger logisk klassifisering' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk m\u00f8bler barnet kjenner fra eget hjem og barnehage, fokuser p\u00e5 \u00e9n romlig preposisjon om gangen, og bruk fysiske gjenstander og dukkehus som supplement. For avanserte f\u00f8rskolebarn introduser flere romlige begreper, la dem tegne rominnredning med spesifiserte m\u00f8bler, og utfordre med formkombinasjon (hvordan bygger vi en stol av former?).',
    parentTakeaway: 'Hjemmet er den perfekte l\u00e6ringsarenaen for m\u00f8beltemaet. Lek gjemmeleken \u00abbamsen sitter p\u00e5 stolen, under bordet, ved siden av sofaen\u00bb for \u00e5 \u00f8ve romlige begreper. Tell stoler rundt bordet, vinduer i rommet og hyller i bokhyllen. La barnet hjelpe med \u00e5 rydde rommet og snakk om hvor tingene h\u00f8rer hjemme \u2014 dette bygger b\u00e5de sorteringsevne og ansvarsf\u00f8lelse.',
    classroomIntegration: 'M\u00f8beltemaet er til stede hele dagen i barnehagen: i samlingen brukes stolene til \u00e5 \u00f8ve romlige begreper, ved l\u00e6ringsstasjoner arbeides med m\u00f8beloppgaver og formgjenkjenning, i rolleleken innredes dukkehus og lekebutikk, og p\u00e5 ryddestund sorteres ting tilbake til riktig plass. Denne daglige integrasjonen oppfyller Rammeplanens m\u00e5l for rom, form og n\u00e6rmilj\u00f8utforskning.',
    assessmentRubric: [
      { skill: 'Romlige begreper med m\u00f8bler', emerging: 'forst\u00e5r \u00abp\u00e5\u00bb og \u00abunder\u00bb med voksenst\u00f8tte', proficient: 'bruker selvstendig 4\u20135 romlige begreper (p\u00e5, under, ved siden av, foran, bak)', advanced: 'bruker 6+ romlige begreper og forklarer plasseringer med fullstendige setninger' },
      { skill: 'Formgjenkjenning i m\u00f8bler', emerging: 'finner 1\u20132 former med st\u00f8tte', proficient: 'finner selvstendig 3\u20134 geometriske former i m\u00f8belillustrasjoner', advanced: 'finner 5+ former og forklarer hvor de finnes i virkelige m\u00f8bler' },
      { skill: 'M\u00f8belsortering etter rom', emerging: 'plasserer 2\u20133 m\u00f8bler i riktig rom med st\u00f8tte', proficient: 'sorterer selvstendig 5\u20136 m\u00f8bler i riktige rom', advanced: 'sorterer alle m\u00f8bler og forklarer hvorfor de h\u00f8rer til i hvert rom' },
    ],
  },

  garden: {
    snippetAnswer: 'Hage-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker blomster, fr\u00f8 og insekter til \u00e5 \u00f8ve telling, sortering og finmotorisk sporing. Barnas naturlige fascinasjon for vekst og graving driver engasjementet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Hagetemaet er unikt engasjerende for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer elsker \u00e5 grave, plante, vanne og se ting vokse \u2014 hagen er den ultimate sanselaboratoriet for sm\u00e5 barn. Denne f\u00f8rsteh\u00e5ndsopplevelsen med jord, vann, fr\u00f8 og blomster gir en kraftig forankring for oppgaveark. Telling av fr\u00f8 i potter, blomster i en rad og bl\u00e6r p\u00e5 en plante gir konkret matematikk. Sortering av fr\u00f8 etter st\u00f8rrelse, blomster etter farge og redskaper etter funksjon styrker klassifiseringsevnen. Sporing av planteord og blomsterformer utvikler finmotorikk. Rammeplan for barnehagen legger stor vekt p\u00e5 natur, milj\u00f8 og teknologi, og hagetemaet oppfyller dette ved \u00e5 koble papirl\u00e6ring med virkelig naturopplevelse.',
    developmentalMilestones: [
      { milestone: 'Naturvitenskapelig nysgjerrighet (3\u20134-\u00e5ringer begynner \u00e5 stille sp\u00f8rsm\u00e5l om vekst og endring)', howWeAddress: 'Sekvensoppgaver som viser fr\u00f8-til-blomst-reisen bygger forst\u00e5else for livssyklus og \u00e5rsak-virkning' },
      { milestone: 'Telling og en-til-en-korrespondanse med naturgjenstander', howWeAddress: 'Tell-fr\u00f8ene og tell-blomstene-aktiviteter gir h\u00e5ndgripelig matematikk med naturlig materiale' },
      { milestone: 'Sanseutforskning (barn l\u00e6rer gjennom \u00e5 ta p\u00e5, lukte og se n\u00e6rmere)', howWeAddress: 'Hageoppgaver komplettert med ekte planting lar barnet koble papirl\u00e6ring med sanselig opplevelse' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med tre kjente hageelementer (blomst, fr\u00f8, sol), bruk ekte fr\u00f8 og jord som fysisk supplement, og hold oppgavene enkle med store illustrasjoner. For avanserte f\u00f8rskolebarn introduser vekstsykluser, la dem plantedagbok med tegning og telling, og utfordre med sortering etter flere egenskaper (blomstfarge og st\u00f8rrelse).',
    parentTakeaway: 'En liten hage eller noen potter p\u00e5 balkongen gir enorme l\u00e6ringsmuligheter. La barnet plante et fr\u00f8, vanne daglig og tegne veksten hver uke \u2014 dette er b\u00e5de naturvitenskap og finmotorikk. Tell blomster p\u00e5 turer, sorter steiner og pinner etter st\u00f8rrelse, og snakk om hva planter trenger for \u00e5 vokse. Oppgavearkene forsterker det barnet opplever i hagen med h\u00e5ndgripelig l\u00e6ring.',
    classroomIntegration: 'Hagetemaet passer perfekt i f\u00f8rskolens \u00e5rshjul: om v\u00e5ren plantes fr\u00f8 i barnehagens hage, i samlingen observeres veksten, ved l\u00e6ringsstasjoner arbeides med hageoppgaver og telleark, og p\u00e5 naturturer utforskes blomster og planter i n\u00e6rmilj\u00f8et. Denne tverrg\u00e5ende integrasjonen mellom inne og ute oppfyller Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi.',
    assessmentRubric: [
      { skill: 'Forst\u00e5else av plantevekst', emerging: 'beskriver med st\u00f8tte at planter trenger vann og sol', proficient: 'ordner selvstendig 3\u20134 trinn i vekstsyklusen (fr\u00f8, spire, plante, blomst)', advanced: 'forklarer vekstsyklusen og hva som skjer hvis planten ikke f\u00e5r vann eller sol' },
      { skill: 'Telling med hagemotiver', emerging: 'teller 1\u20135 blomster eller fr\u00f8 med st\u00f8tte', proficient: 'teller selvstendig opp til 10 hageelementer og kobler med riktig tall', advanced: 'teller over 10 og sammenligner mengder (flere r\u00f8de blomster enn gule)' },
      { skill: 'Sortering av naturgjenstander', emerging: 'sorterer 2\u20133 gjenstander i to grupper med st\u00f8tte', proficient: 'sorterer selvstendig 5\u20136 gjenstander etter farge, st\u00f8rrelse eller type', advanced: 'sorterer etter flere egenskaper og forklarer sorteringskriteriene' },
    ],
  },

  halloween: {
    snippetAnswer: 'Halloween-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker gresskar, edderkopper og sp\u00f8kelser til \u00e5 \u00f8ve telling, m\u00f8nstergjenkjenning og fargelegging. Den lekne uhyggen fanger barnas oppmerksomhet uten \u00e5 skremme. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Halloweentemaet er usedvanlig engasjerende for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer fascineres av den trygge spenningen i gresskar, kostymer og sp\u00f8kelseshistorier \u2014 det er skummelt nok til \u00e5 v\u00e6re spennende, men trygt nok innenfor barnehagens rammer. Denne emosjonelle spenningen gir ekstra motivasjon til oppgavearbeid. Telling av gresskar, edderkopper og flaggermus gir engasjerende matematikk\u00f8velser. M\u00f8nstergjenkjenning med sp\u00f8kelse-gresskar-sp\u00f8kelse-m\u00f8nstre bygger tidlig algebraisk tenkning. Fargelegging av halloween-figurer med tykke konturer trener finmotorikk. Rammeplan for barnehagen vektlegger kunst, kultur og kreativitet, og halloween tilbyr rike muligheter for kreativt uttrykk gjennom kostymespill og kunstaktiviteter.',
    developmentalMilestones: [
      { milestone: 'M\u00f8nstergjenkjenning (3\u20134-\u00e5ringer begynner \u00e5 forst\u00e5 gjentakende sekvenser)', howWeAddress: 'Halloween-m\u00f8nsterrader (gresskar-sp\u00f8kelse-gresskar) bygger tidlig algebraisk tenkning i en spennende kontekst' },
      { milestone: 'Telling med emosjonelt engasjement', howWeAddress: 'Tell-edderkopper og tell-gresskar-oppgaver utnytter barnets spenning for \u00e5 drive tallgjenkjenning' },
      { milestone: 'Kreativt uttrykk gjennom fargelegging og kostymespill', howWeAddress: 'Halloweenfargelegging med tykke konturer gir finmotorisk trening mens barnet uttrykker seg kreativt' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, hold figurene morsomme og ikke skumle (smilende gresskar, vennlige sp\u00f8kelser), begrens til tre\u2013fire elementer per ark, og bruk fysisk utkledning som supplement. For avanserte f\u00f8rskolebarn introduser mer komplekse m\u00f8nstre (ABC-m\u00f8nstre), la dem telle st\u00f8rre mengder og utfordre med \u00e5 tegne egne halloween-scener.',
    parentTakeaway: 'Halloween er en fest av l\u00e6ringsmuligheter. Tell godteri sammen, sorter det etter type og farge, og snakk om formene p\u00e5 gresskar (runde!) og edderkopper (mange bein \u2014 tell dem!). La barnet tegne sitt eget kostyme og beskriv det sammen. Utskj\u00e6ring av gresskar med voksen er en fantastisk finmotorisk aktivitet som kobler direkte til oppgavearkene.',
    classroomIntegration: 'Halloweentemaet egner seg glimrende for en temauke i oktober: i samlingen leses morsomme halloween-b\u00f8ker, ved l\u00e6ringsstasjoner arbeides med telleark og m\u00f8nsteroppgaver, i kunstkroken lages masker og gresskar, og i rolleleken brukes kostymer. Temaet integrerer Rammeplanens m\u00e5l for kunst, kultur og kreativitet med matematikk og sosial kompetanse.',
    assessmentRubric: [
      { skill: 'M\u00f8nstergjenkjenning (halloweentema)', emerging: 'fortsetter et enkelt AB-m\u00f8nster med st\u00f8tte', proficient: 'fortsetter selvstendig AB- og ABB-m\u00f8nstre med halloweenelementer', advanced: 'lager egne m\u00f8nstre og forklarer reglene for dem' },
      { skill: 'Telling av halloweenelementer', emerging: 'teller 1\u20135 gresskar eller sp\u00f8kelser med st\u00f8tte', proficient: 'teller selvstendig opp til 10 halloweenelementer og kobler med riktig tall', advanced: 'teller over 10 og l\u00f8ser enkle \u00abhvor mange til sammen\u00bb-oppgaver' },
      { skill: 'Finmotorisk kontroll (halloweenfargelegging)', emerging: 'fargelegger med grove str\u00f8k, delvis utenfor konturene', proficient: 'fargelegger innenfor konturene med varierte farger', advanced: 'legger til kreative detaljer og m\u00f8nstre i halloweenfigurene' },
    ],
  },

  holidays: {
    snippetAnswer: 'H\u00f8ytids-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker julegaver, p\u00e5skeegg og 17. mai-flagg til \u00e5 \u00f8ve telling, kobling og finmotorisk fargelegging. Den emosjonelle forbindelsen til feiring driver sterk motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'H\u00f8ytidstemaet treffer f\u00f8rskolebarn dypt fordi tre- og fire\u00e5ringer opplever h\u00f8ytider som \u00e5rets absolutte h\u00f8ydepunkter \u2014 den emosjonelle forventningen gir en motivasjonsmotor som f\u00e5 andre temaer kan matche. Jul, p\u00e5ske, 17. mai og andre markeringer er ladet med personlige minner og forventning. Telling av julekugler p\u00e5 treet, p\u00e5skeegg i kurven og flagg i toget gir matematikk med emosjonell dybde. Kobling av h\u00f8ytidssymboler trener visuell diskriminering. Fargelegging av h\u00f8ytidsmotiver utvikler finmotorikk i en kontekst som f\u00f8les som feiring, ikke \u00f8velse. Rammeplan for barnehagen fremhever kulturell identitet og fellesskap, og norske h\u00f8ytider oppfyller dette m\u00e5let direkte.',
    developmentalMilestones: [
      { milestone: 'Kulturell bevissthet (3\u20134-\u00e5ringer begynner \u00e5 forst\u00e5 tradisjoner og feiringer)', howWeAddress: 'H\u00f8ytidsoppgaver med norske tradisjoner bygger kulturell identitet og tilh\u00f8righet gjennom kjente symboler' },
      { milestone: 'Sekvensiell forst\u00e5else (barn begynner \u00e5 forst\u00e5 rekkef\u00f8lge av hendelser)', howWeAddress: 'Sekvensoppgaver som viser forberedelse til feiring (pynte treet, legge ut gaver, feire) bygger tidsforst\u00e5else' },
      { milestone: 'Telling med emosjonelt meningsfulle gjenstander', howWeAddress: 'Tell-julekugler og tell-p\u00e5skeegg-aktiviteter gir talltrening med personlig resonans' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 \u00e9n h\u00f8ytid om gangen med f\u00e5 og kjente symboler, bruk fysiske gjenstander (ekte p\u00e5skeegg, sm\u00e5 flagg) som supplement, og hold aktivitetene korte og festlige. For avanserte f\u00f8rskolebarn utvid med flere h\u00f8ytider, la dem sammenligne tradisjoner og utfordre med lengre sekvensoppgaver.',
    parentTakeaway: 'Hver h\u00f8ytid er en naturlig l\u00e6ringsanledning. La barnet hjelpe med \u00e5 telle julekugler p\u00e5 treet, sortere p\u00e5skeegg etter farge, og telle flagg p\u00e5 17. mai. Baking av pepperkaker gir telling og formgjenkjenning. Snakk om hva som skjer f\u00f8rst, s\u00e5 og til slutt i feiringen \u2014 dette bygger sekvensiell tenkning. Oppgavearkene forlenger den emosjonelle h\u00f8ytidsopplevelsen inn i strukturert l\u00e6ring.',
    classroomIntegration: 'H\u00f8ytidstemaet f\u00f8lger \u00e5rshjulet i barnehagen: f\u00f8r jul pyntes og bakes, f\u00f8r p\u00e5ske males egg, f\u00f8r 17. mai \u00f8ves sanger og flaggvifting. Ved l\u00e6ringsstasjoner arbeides med h\u00f8ytidsoppgaver, i samlingen snakkes det om hva vi feirer og hvorfor, og i kunstkroken lages h\u00f8ytidsdekorasjoner. Denne kulturelle integrasjonen oppfyller Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8, samfunn og kulturarv.',
    assessmentRubric: [
      { skill: 'Kulturell gjenkjenning av h\u00f8ytider', emerging: 'gjenkjenner 1\u20132 norske h\u00f8ytider og deres symboler med st\u00f8tte', proficient: 'navngir selvstendig 3\u20134 h\u00f8ytider og kobler med riktige symboler', advanced: 'forklarer 4+ h\u00f8ytider og beskriver hva man gj\u00f8r i feiringen' },
      { skill: 'Telling med h\u00f8ytidselementer', emerging: 'teller 1\u20135 h\u00f8ytidsgjenstander med st\u00f8tte', proficient: 'teller selvstendig opp til 10 og kobler med riktig tall', advanced: 'teller over 10 og sammenligner mengder (flere r\u00f8de kuler enn bl\u00e5)' },
      { skill: 'Sekvensering av h\u00f8ytidsaktiviteter', emerging: 'ordner 2 hendelser i rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 trinn i en feiringssekvens', advanced: 'ordner 5+ trinn og forklarer hvorfor rekkef\u00f8lgen er viktig' },
    ],
  },

  household: {
    snippetAnswer: 'Husholdnings-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker kopper, tallerkener og redskaper til \u00e5 \u00f8ve telling, sortering og kobling. Dagligdagse gjenstander gj\u00f8r l\u00e6ringen konkret og gjenkjennelig for sm\u00e5 barn. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Husholdningstemaet er en skjult l\u00e6ringssuperkraft for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er omgitt av husholdningsgjenstander hele dagen \u2014 kopper, tallerkener, skjeer, kl\u00e6r og rengj\u00f8ringsredskaper er de tingene barna ser, r\u00f8rer og bruker oftest. Denne ultimate kjennskapen gj\u00f8r selv abstrakte begreper h\u00e5ndgripelige. En-til-en-korrespondanse \u00f8ves n\u00e5r barn kobler \u00e9n kopp til \u00e9n tallerken, \u00e9n gaffel til \u00e9n kniv. Kategorisering styrkes n\u00e5r barn sorterer kj\u00f8kkenredskaper, baderomsting og soveromsting. Telling av gjenstander i en bolle eller p\u00e5 en hylle gir konkret matematikk. Rammeplan for barnehagen vektlegger selvstendighet og mestring i daglige rutiner, og husholdningsoppgaver bygger disse ferdighetene direkte.',
    developmentalMilestones: [
      { milestone: 'En-til-en-korrespondanse (3\u20134-\u00e5ringer kobler gjenstander parvis)', howWeAddress: 'Koblingsaktiviteter som kopp-til-tallerken, gaffel-til-kniv bygger grunnleggende mengdeforst\u00e5else gjennom borddekking' },
      { milestone: 'Kategorisering etter funksjon (barn l\u00e6rer at gjenstander tilh\u00f8rer ulike rom)', howWeAddress: 'Sorteringsoppgaver der barn plasserer gjenstander i riktig rom (kj\u00f8kken/bad/soverom) bygger logisk klassifisering' },
      { milestone: 'Selvstendighet i daglige rutiner', howWeAddress: 'Sekvensoppgaver som viser borddekking, rydding og vasking trinn for trinn st\u00f8tter selvhjulpenhet' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk f\u00e5 og kjente gjenstander (kopp, tallerken, skje), koble til barnets egen hverdag, og hold oppgavene korte med store illustrasjoner. For avanserte f\u00f8rskolebarn utvid til flere gjenstander og rom, introduser sekvensoppgaver med flere trinn, og la dem tegne og navngi gjenstander i sitt eget hjem.',
    parentTakeaway: 'Hjemmet er et l\u00e6ringslaboratorium. La barnet hjelpe med borddekking og tell kopper og tallerkener sammen. Sorter bestikk i bestikkskuffen, par sokker fra vasken, og rydd leker p\u00e5 riktig plass. Matlaging gir telling og m\u00e5ling. Oppvasken gir sortering. Hver daglig rutine er en l\u00e6rings\u00f8kt n\u00e5r du stiller sp\u00f8rsm\u00e5l: \u00abhvor mange tallerkener trenger vi?\u00bb, \u00abhvilket rom h\u00f8rer denne til?\u00bb',
    classroomIntegration: 'Husholdningstemaet er naturlig til stede i barnehagens rutiner: ved m\u00e5ltidene dekkes bord med telling av kopper og tallerkener, ved l\u00e6ringsstasjoner arbeides med sorterings- og koblingsoppgaver, i rolleleken brukes dukkekj\u00f8kken og dukkehus, og ved ryddetid sorteres ting p\u00e5 riktig plass. Denne koblingen mellom oppgaveark og daglige rutiner oppfyller Rammeplanens m\u00e5l for selvstendighet og mestring.',
    assessmentRubric: [
      { skill: 'En-til-en kobling med husholdningsgjenstander', emerging: 'kobler 2\u20133 par med st\u00f8tte (kopp-tallerken)', proficient: 'kobler selvstendig 5\u20136 par korrekt', advanced: 'kobler komplekse sett og forklarer om det er nok til alle' },
      { skill: 'Kategorisering etter rom', emerging: 'plasserer 2\u20133 gjenstander i riktig rom med st\u00f8tte', proficient: 'sorterer selvstendig 5\u20136 gjenstander i riktige rom (kj\u00f8kken/bad/soverom)', advanced: 'sorterer 8+ gjenstander og forklarer hvorfor de h\u00f8rer til i hvert rom' },
      { skill: 'Sekvensering av daglige rutiner', emerging: 'ordner 2 trinn i en rutine med st\u00f8tte (dekke/spise)', proficient: 'ordner selvstendig 3\u20134 trinn i riktig rekkef\u00f8lge', advanced: 'ordner 5+ trinn og forklarer hvorfor rekkef\u00f8lgen er viktig' },
    ],
  },

  insects: {
    snippetAnswer: 'Insekt-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker marih\u00f8ner, sommerfugler og biller til \u00e5 \u00f8ve telling, m\u00f8nstergjenkjenning og fargelegging. Barnas fascinasjon for sm\u00e5kryp driver naturlig nysgjerrighet og engasjement. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Insekttemaet treffer f\u00f8rskolebarn midt i nysgjerrigheten fordi tre- og fire\u00e5ringer er naturlige sm\u00e5krypforskere \u2014 de l\u00f8fter steiner, f\u00f8lger maur p\u00e5 fortauet og peker begeistret p\u00e5 marih\u00f8ner. Denne medf\u00f8dte fascinasjonen gj\u00f8r insektoppgaver til magnetiske l\u00e6ringsverkt\u00f8y. Telling av bein (seks!), prikker p\u00e5 marih\u00f8ner og sommerfugler i en scene gir konkret matematikk med innebyggd wow-faktor. M\u00f8nstergjenkjenning med sommerfuglvinger (symmetri!) og marih\u00f8neprikker bygger tidlig algebraisk og romlig tenkning. Fargelegging av detaljerte insektbilder trener finmotorikk. Rammeplan for barnehagen vektlegger natur, milj\u00f8 og teknologi, og insektutforskning er en av de mest tilgjengelige naturvitenskapene for de yngste.',
    developmentalMilestones: [
      { milestone: 'Naturvitenskapelig observasjon (3\u20134-\u00e5ringer l\u00e6rer \u00e5 se n\u00e6rmere p\u00e5 sm\u00e5 detaljer)', howWeAddress: 'Insektillustrasjoner med detaljer som bein, f\u00f8lehorer og vinger skjerper observasjonsevner' },
      { milestone: 'Telling av sm\u00e5 mengder med presisjon', howWeAddress: 'Tell-beina (seks!), tell-prikkene og tell-sommerfuglene-aktiviteter gir presis telletrening' },
      { milestone: 'Symmetriforst\u00e5else (barn begynner \u00e5 se at to sider er like)', howWeAddress: 'Sommerfuglvinge-aktiviteter der barn fargelegger begge sider likt introduserer symmetri gjennom naturlige m\u00f8nstre' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med tre kjente insekter (marih\u00f8ne, sommerfugl, maur), bruk store illustrasjoner med f\u00e5 detaljer, og koble til virkelige insektobservasjoner utend\u00f8rs. For avanserte f\u00f8rskolebarn introduser flere insektarter, la dem telle h\u00f8yere mengder og utfordre med symmetrioppgaver der de tegner den manglende vingehalvdelen.',
    parentTakeaway: 'Insekter er gratis l\u00e6remidler som finnes overalt. G\u00e5 p\u00e5 insektjakt i hagen eller parken \u2014 tell maurene p\u00e5 fortauet, se p\u00e5 marih\u00f8nens prikker og beundre sommerfuglvinger. Bruk et forstørrelsesglass for ekstra wow-effekt. La barnet tegne insektene det finner, og snakk om farger, st\u00f8rrelser og antall bein. Denne naturopplevelsen forsterker alt barnet l\u00e6rer p\u00e5 oppgavearkene.',
    classroomIntegration: 'Insekttemaet integreres naturlig i barnehagens naturdager: p\u00e5 utedager jakter barn p\u00e5 insekter med forstørrelsesglass, i samlingen snakkes det om funnene, ved l\u00e6ringsstasjoner arbeides med telleark og symmetrioppgaver, og i kunstkroken lages sommerfugler og marih\u00f8ner. Denne integrasjonen mellom ute og inne oppfyller Rammeplanens m\u00e5l for natur, milj\u00f8 og utforskning.',
    assessmentRubric: [
      { skill: 'Insektobservasjon og gjenkjenning', emerging: 'gjenkjenner 2\u20133 vanlige insekter med st\u00f8tte', proficient: 'navngir selvstendig 4\u20135 insekter og beskriver 1\u20132 kjennetegn', advanced: 'navngir 6+ insekter og forklarer forskjeller mellom dem (bein, vinger, f\u00f8lehorer)' },
      { skill: 'Presis telling (insektdetaljer)', emerging: 'teller 1\u20135 elementer (bein, prikker) med st\u00f8tte', proficient: 'teller selvstendig opp til 10 og vet at insekter har seks bein', advanced: 'teller presist og sammenligner mengder mellom insektarter' },
      { skill: 'Symmetriforst\u00e5else (sommerfuglvinger)', emerging: 'gjenkjenner at de to vingene er like med st\u00f8tte', proficient: 'fargelegger selvstendig begge sider av en sommerfugl likt', advanced: 'tegner symmetriske m\u00f8nstre og forklarer hva symmetri betyr' },
    ],
  },

  jobs: {
    snippetAnswer: 'Yrke-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker brannmann, lege og baker til \u00e5 \u00f8ve kobling, fargelegging og ordforr\u00e5d. Barn l\u00e6rer om samfunnets hjelpere gjennom engasjerende koblingsaktiviteter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Yrketemaet er s\u00e6rlig verdifullt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er i den alderen der de aktivt utforsker roller gjennom lek \u2014 de leker brannmann, lege, kokk og sj\u00e5f\u00f8r. Denne rolleleken er en av de viktigste utviklingsaktivitetene i f\u00f8rskolen, og yrkesoppgaver gir strukturert st\u00f8tte til den. Kobling av yrkesperson til verkt\u00f8y (lege\u2013stetoskop, brannmann\u2013slange) trener logisk tenkning og ordforr\u00e5d. Fargelegging av yrkesuniformer utvikler finmotorikk og fargegjenkjenning. Telling av verkt\u00f8y og kj\u00f8ret\u00f8y gir matematikktrening. Rammeplan for barnehagen fremhever n\u00e6rmilj\u00f8 og samfunn, og yrkestemaet hjelper barn \u00e5 forst\u00e5 at ulike mennesker bidrar til fellesskapet.',
    developmentalMilestones: [
      { milestone: 'Rollelek og sosial forst\u00e5else (3\u20134-\u00e5ringer utforsker roller gjennom lek)', howWeAddress: 'Koblingsaktiviteter mellom yrkesperson og verkt\u00f8y gir kunnskap som beriker rolleleken' },
      { milestone: 'Logisk kobling (barnet forst\u00e5r at ting h\u00f8rer sammen)', howWeAddress: 'Hvem bruker hva-oppgaver der barn kobler stetoskop til lege og brannslange til brannmann trener logisk tenkning' },
      { milestone: 'Ordforr\u00e5dsutvikling (barn l\u00e6rer nye ord for verkt\u00f8y og kj\u00f8ret\u00f8y)', howWeAddress: 'Yrkesoppgaver introduserer ordforr\u00e5d som stetoskop, brannbil, kassaapparat gjennom visuelle koblinger' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med tre\u2013fire kjente yrker (brannmann, lege, l\u00e6rer, politibetjent), bruk store og tydelige illustrasjoner, og koble til barnets egne opplevelser. For avanserte f\u00f8rskolebarn introduser flere yrker, la dem forklare hva hvert yrke gj\u00f8r og utfordre med koblingsoppgaver med flere verkt\u00f8y per yrke.',
    parentTakeaway: 'Yrketemaet er overalt i hverdagen. Pek p\u00e5 yrkesfolk n\u00e5r dere er ute \u2014 brannbilen, postbudet, busssj\u00e5f\u00f8ren. Sp\u00f8r barnet \u00abhva tror du den personen gj\u00f8r?\u00bb og \u00abhvilke verkt\u00f8y bruker han/hun?\u00bb. Rollelek hjemme med utkledningskl\u00e6r er en kraftfull l\u00e6ringsaktivitet som forsterker det barnet l\u00e6rer p\u00e5 oppgavearkene. La barnet fortelle om hva det vil bli n\u00e5r det blir stort.',
    classroomIntegration: 'Yrketemaet integreres i f\u00f8rskolens aktiviteter: i samlingen introduseres ukens yrke med bilder og rekvisitter, ved l\u00e6ringsstasjoner arbeides med koblingsoppgaver og fargelegging, i rolleleken brukes kostymekassen til yrkeslek, og p\u00e5 turer bes\u00f8kes brannstasjonen, politistasjonen eller bakeriet. Bes\u00f8k fra yrkesfolk i barnehagen kobler oppgavearkl\u00e6ring med virkelige m\u00f8ter og oppfyller Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8 og samfunn.',
    assessmentRubric: [
      { skill: 'Yrkesgjenkjenning', emerging: 'gjenkjenner 2\u20133 yrker med st\u00f8tte (brannmann, lege)', proficient: 'navngir selvstendig 5\u20136 yrker og beskriver hva de gj\u00f8r', advanced: 'navngir 8+ yrker og forklarer hvordan de hjelper samfunnet' },
      { skill: 'Yrke-verkt\u00f8y-kobling', emerging: 'kobler 2\u20133 yrker med riktig verkt\u00f8y med st\u00f8tte', proficient: 'kobler selvstendig 5\u20136 yrker med korrekte verkt\u00f8y', advanced: 'kobler 8+ yrker og navngir flere verkt\u00f8y per yrke' },
      { skill: 'Yrkesordforr\u00e5d', emerging: 'bruker 2\u20133 yrkesord med st\u00f8tte', proficient: 'bruker selvstendig 5\u20136 yrkesord i samtale', advanced: 'bruker 8+ yrkesord og forklarer verkt\u00f8yfunksjoner' },
    ],
  },

  music: {
    snippetAnswer: 'Musikk-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker trommer, gitarer og noter til \u00e5 \u00f8ve telling, m\u00f8nstergjenkjenning og finmotorisk fargelegging. Barnas naturlige glede ved rytme og sang driver engasjementet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Musikktemaet treffer f\u00f8rskolebarn p\u00e5 et dypt niv\u00e5 fordi tre- og fire\u00e5ringer er naturlige musikkelsker \u2014 de synger, klapper, tramper og danser spontant gjennom hele dagen. Denne medf\u00f8dte musikkgleden gj\u00f8r instrumentoppgaver til noe barn griper med begeistring. Telling av trommeslag, gitarstrenger og noter bygger tallgjenkjenning med rytmisk forsterkning. M\u00f8nstergjenkjenning gjennom rytmiske sekvenser (klapp-klapp-stomp) bygger tidlig algebraisk tenkning. Fargelegging av instrumenter trener finmotorikk med engasjerende motiver. Rammeplan for barnehagen vektlegger kunst, kultur og kreativitet, og musikktemaet oppfyller dette m\u00e5let med sin unike kombinasjon av lyd, bevegelse og visuell l\u00e6ring.',
    developmentalMilestones: [
      { milestone: 'Rytmeforst\u00e5else (3\u20134-\u00e5ringer begynner \u00e5 f\u00f8lge og gjenta enkle rytmer)', howWeAddress: 'Rytmem\u00f8nster-oppgaver der barn fortsetter klapp-klapp-stomp-sekvenser bygger tidlig m\u00f8nsterforst\u00e5else' },
      { milestone: 'Auditiv diskriminering (barn l\u00e6rer \u00e5 skille mellom lyder)', howWeAddress: 'Instrumentgjenkjenning og lydkobling trener lytteferdigheter som er grunnleggende for spr\u00e5kutvikling' },
      { milestone: 'Grovmotorisk koordinasjon gjennom musikkbevegelse', howWeAddress: 'Bevegelsesaktiviteter til musikk kombinert med oppgaveark kobler kropp og kognitiv l\u00e6ring' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med tre kjente instrumenter (tromme, gitar, piano), bruk virkelige lyd- og instrumentopplevelser som supplement, og hold rytmem\u00f8nstrene enkle (AB). For avanserte f\u00f8rskolebarn introduser flere instrumenter og familier (strenge-, bl\u00e5se-, slagverk), la dem lage egne rytmer og utfordre med mer komplekse m\u00f8nstre.',
    parentTakeaway: 'Musikk er overalt og koster ingenting. Syng sanger sammen, klapp rytmer og bruk kj\u00f8kkenredskaper som instrumenter (tresleiv p\u00e5 gryte = tromme!). Tell slag sammen i en sang, pek ut instrumenter n\u00e5r dere h\u00f8rer musikk, og dans til ulike tempoer \u2014 raskt og sakte. Denne daglige musikkopplevelsen forsterker m\u00f8nstergjenkjenning, rytmeforst\u00e5else og lytteferdigheter fra oppgavearkene.',
    classroomIntegration: 'Musikktemaet gjennomsyrer f\u00f8rskolehverdagen: i samlingen synges sanger og klapper rytmer, ved l\u00e6ringsstasjoner arbeides med instrumentoppgaver og m\u00f8nsterark, i musikkstunden spilles p\u00e5 virkelige instrumenter, og i bevegelsesleken danses og trampes til rytmer. Denne multisensoriske tiln\u00e6rmingen oppfyller Rammeplanens m\u00e5l for kunst, kultur og kreativitet, og st\u00f8tter spr\u00e5kutvikling gjennom sang.',
    assessmentRubric: [
      { skill: 'Instrumentgjenkjenning', emerging: 'gjenkjenner 2\u20133 instrumenter med st\u00f8tte (tromme, gitar)', proficient: 'navngir selvstendig 5\u20136 instrumenter og beskriver lyden', advanced: 'navngir 8+ instrumenter og grupperer dem i familier (strenge, bl\u00e5se, slag)' },
      { skill: 'Rytmem\u00f8nster', emerging: 'gjentar et enkelt AB-m\u00f8nster med st\u00f8tte (klapp-stomp)', proficient: 'f\u00f8lger selvstendig AB- og ABB-rytmem\u00f8nstre', advanced: 'lager egne rytmem\u00f8nstre og l\u00e6rer dem til andre barn' },
      { skill: 'Musikalsk bevegelse', emerging: 'beveger seg til musikk med enkel repetisjon', proficient: 'tilpasser bevegelser til tempo og rytme selvstendig', advanced: 'kombinerer flere bevegelser kreativt til musikk og leder andre barn' },
    ],
  },

  nature: {
    snippetAnswer: 'Natur-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker blader, treer og bekker til \u00e5 \u00f8ve telling, sortering og sanseutforskning. Barnas medf\u00f8dte trang til \u00e5 utforske utend\u00f8rs driver engasjementet naturlig. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Naturtemaet er det mest altomfattende l\u00e6ringstemaet for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer opplever naturen med hele kroppen \u2014 de plukker blader, klatrer p\u00e5 steiner, hopper i pytter og samler kongler. Denne multisensoriske utforskningen er grunnmuren for all l\u00e6ring i denne alderen. Norske f\u00f8rskolebarn tilbringer mye tid utend\u00f8rs, og naturoppgaver bygger bro mellom utedagene og strukturert l\u00e6ring. Telling av kongler, blader og steiner gir h\u00e5ndgripelig matematikk. Sortering av naturgjenstander etter st\u00f8rrelse, form og farge styrker klassifiseringsevnen. Sporing av naturord utvikler finmotorikk. Rammeplan for barnehagen har natur, milj\u00f8 og teknologi som et kjerneomr\u00e5de, og oppgavearkene forsterker det barna opplever p\u00e5 turene.',
    developmentalMilestones: [
      { milestone: 'Sanseutforskning (3\u20134-\u00e5ringer l\u00e6rer gjennom \u00e5 ta p\u00e5, lukte, se og h\u00f8re)', howWeAddress: 'Naturoppgaver supplert med ekte naturmateriale (kongler, blader, steiner) gir multisensorisk l\u00e6ring' },
      { milestone: 'Sortering og klassifisering av naturgjenstander', howWeAddress: 'Sorteringsaktiviteter med blader (form, farge, st\u00f8rrelse) og steiner (glatt/ru, stor/liten) bygger systematisk tenkning' },
      { milestone: 'Sesongbevissthet (barn begynner \u00e5 legge merke til endringer i naturen)', howWeAddress: 'Sesongoppgaver som sammenligner tr\u00e6r om sommeren og vinteren bygger tidsforst\u00e5else og observasjonsevner' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med f\u00e5 og kjente naturgjenstander (blad, stein, pinne), bruk ekte naturmateriale som supplement, og fokuser p\u00e5 \u00e9n sanseopplevelse om gangen. For avanserte f\u00f8rskolebarn utvid til flere naturkategorier, introduser enkel naturvitenskap (hva trenger planter for \u00e5 vokse?) og la dem lage naturdagbok med tegninger og funn.',
    parentTakeaway: 'Naturen er det st\u00f8rste l\u00e6ringsrommet dere har. Ta med en pose p\u00e5 turen og la barnet samle blader, kongler og steiner. Hjemme sorterer dere funnene etter st\u00f8rrelse og type, teller dem og snakker om hva de heter. Bygg en natursamling i en eggekartong. Observer endringer gjennom \u00e5rstidene \u2014 den samme turen gir helt ny l\u00e6ring om v\u00e5ren, sommeren, h\u00f8sten og vinteren.',
    classroomIntegration: 'Naturtemaet er kjernen i norsk barnehagepedagogikk: p\u00e5 utedager utforskes skog, mark og bekk, i samlingen snakkes det om funn og observasjoner, ved l\u00e6ringsstasjoner arbeides med naturtemaoppgaver, og i kunstkroken lages kunst med naturmateriale (bladtrykk, konglefigurer). Denne sammenhengen mellom ute og inne er selve grunnlaget for Rammeplanens m\u00e5l om natur, milj\u00f8 og teknologi.',
    assessmentRubric: [
      { skill: 'Naturobservasjon og navngiving', emerging: 'navngir 3\u20134 naturgjenstander med st\u00f8tte (blad, stein, blomst)', proficient: 'navngir selvstendig 6\u20138 naturgjenstander og beskriver egenskaper', advanced: 'navngir 10+ naturgjenstander og forklarer sammenhenger (fr\u00f8 blir til plante)' },
      { skill: 'Sortering av naturmateriale', emerging: 'sorterer 2\u20133 gjenstander i to grupper med st\u00f8tte', proficient: 'sorterer selvstendig 5\u20136 gjenstander etter st\u00f8rrelse, form eller type', advanced: 'sorterer etter flere egenskaper og forklarer sorteringskriteriene' },
      { skill: 'Sesongforst\u00e5else', emerging: 'gjenkjenner \u00e9n sesongforskjell med st\u00f8tte (sn\u00f8 om vinteren)', proficient: 'beskriver selvstendig 2\u20133 sesongkjennetegn', advanced: 'beskriver alle fire \u00e5rstider og forklarer hva som endres i naturen' },
    ],
  },

  numbers: {
    snippetAnswer: 'Tall-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) introduserer tallene 1\u201310 gjennom sporing, telling med bilder og tallkobling. Barn bygger tallforst\u00e5else gjennom konkrete gjenstander og gjentatt \u00f8velse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Talltemaet er det mest grunnleggende matematiske temaet for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer befinner seg i den kritiske perioden for tallforst\u00e5else \u2014 de l\u00e6rer at tallsymboler representerer mengder, at tall har en fast rekkef\u00f8lge, og at \u00e5 telle betyr \u00e5 koble ett tall til \u00e9n gjenstand. Denne en-til-en-korrespondansen er grunnmuren for all senere matematikk. Oppgaveark med tallsporing utvikler b\u00e5de tallgjenkjenning og finmotorikk i \u00e9n \u00f8velse. Telling av bilder og kobling med riktig tall forbinder det konkrete (fire epler) med det abstrakte (tallet 4). Rammeplan for barnehagen fremhever antall, rom og form som et kjerneomr\u00e5de, og talloppgaver bygger det fundamentet som all videre matematisk utvikling hviler p\u00e5.',
    developmentalMilestones: [
      { milestone: 'Tallgjenkjenning (3\u20134-\u00e5ringer l\u00e6rer \u00e5 gjenkjenne og navngi tallsymboler)', howWeAddress: 'Tallgjenkjenningsoppgaver med store, tydelige tall og tilh\u00f8rende bilder kobler symbol med mengde' },
      { milestone: 'En-til-en-korrespondanse (koble \u00e9tt tall med \u00e9n gjenstand)', howWeAddress: 'Tell-og-koble-aktiviteter der barn teller gjenstander og forbinder med riktig tallsymbol' },
      { milestone: 'Tallsporing og tallformasjon (barn l\u00e6rer \u00e5 skrive tall)', howWeAddress: 'Prikkede sporingsark med tallene 1\u201310 guider h\u00e5nden og bygger motorisk hukommelse for tallformer' },
      { milestone: 'Tallrekkef\u00f8lge (f\u00f8rskolebarn l\u00e6rer at tall kommer i bestemt orden)', howWeAddress: 'Tallrekke- og f\u00f8lg-m\u00f8nsteret-oppgaver bygger forst\u00e5else for tallenes ordnede struktur' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med tallene 1\u20135, bruk fysiske telleobjekter som supplement, og fokuser p\u00e5 \u00e9tt tall om gangen over flere dager. For avanserte f\u00f8rskolebarn utvid til tallene 11\u201320, introduser enkel addisjon med konkrete tellere, og utfordre med \u00abett mer/ett mindre\u00bb-oppgaver.',
    parentTakeaway: 'Tall er overalt i hverdagen. Tell trapper n\u00e5r dere g\u00e5r opp, tell biler p\u00e5 vei til barnehagen, og tell fingerene f\u00f8r sengetid. Pek p\u00e5 tall p\u00e5 d\u00f8rer, busser og prislapper. La barnet \u00abse\u00bb tall i hverdagen, ikke bare p\u00e5 papir. Bruk terninger, kort og spill som naturlige tallverkt\u00f8y. Tallsporingsark er perfekte for korte \u00f8kter f\u00f8r sengetid \u2014 to\u2013tre tall per kveld.',
    classroomIntegration: 'Talltemaet er sentralt i f\u00f8rskolens hverdag: i samlingen telles barn og synges tallsanger, ved l\u00e6ringsstasjoner arbeides med tallsporing og tell-og-koble-ark, i den frie leken brukes terninger og tallkort, og i garderoben telles kn\u00f8tter. Daglig talleksponering gjennom varierte aktiviteter bygger den tallforst\u00e5elsen Rammeplan for barnehagen fremhever som kjerneomr\u00e5det antall, rom og form.',
    assessmentRubric: [
      { skill: 'Tallgjenkjenning', emerging: 'gjenkjenner 2\u20134 tall med st\u00f8tte', proficient: 'gjenkjenner selvstendig tallene 1\u201310 og navngir dem', advanced: 'gjenkjenner tall opp til 20 og kobler dem med mengder' },
      { skill: 'En-til-en-korrespondanse', emerging: 'teller 1\u20135 gjenstander med peking og st\u00f8tte', proficient: 'teller selvstendig opp til 10 gjenstander og kobler med riktig tallsymbol', advanced: 'teller over 10 og forst\u00e5r \u00abett mer/ett mindre\u00bb' },
      { skill: 'Tallsporing', emerging: 'sporer 2\u20133 tall p\u00e5 prikkede linjer gjenkjennelig', proficient: 'sporer tallene 1\u201310 tydelig med korrekt str\u00f8kretning', advanced: 'skriver tall selvstendig uten modell og bruker dem i enkle regneoppgaver' },
    ],
  },

  ocean: {
    snippetAnswer: 'Hav-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker fisk, sjøstjerner og hvaler til \u00e5 \u00f8ve telling, fargelegging og kobling. Havets hemmelighetsfulle verden fanger barnas fantasi og nysgjerrighet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Havtemaet fascinerer f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er naturlig betatt av havets hemmelighetsfulle verden \u2014 fisk som sv\u00f8mmer, hvaler som spruter og sj\u00f8stjerner p\u00e5 havbunnen representerer en magisk virkelighet som stimulerer fantasien. Denne fascinasjonen gj\u00f8r havoppgaver til noe barn griper med begeistring. Telling av fisk i et akvarium, sj\u00f8stjernearmer og bl\u00e6kksprutbein gir matematikk med wow-faktor. Fargelegging av korallrev og havdyr utvikler finmotorikk med rike fargevalg. Sortering av havdyr etter st\u00f8rrelse (liten fisk, stor hval) bygger sammenligningsevne. Rammeplan for barnehagen vektlegger natur og milj\u00f8, og havet gir en av de mest engasjerende inngangene til naturvitenskapelig utforskning for de yngste.',
    developmentalMilestones: [
      { milestone: 'St\u00f8rrelsessammenligning (3\u20134-\u00e5ringer l\u00e6rer \u00e5 sammenligne stor/liten)', howWeAddress: 'Havdyr i ulike st\u00f8rrelser (fisk vs. hval) gir intuitive sammenlignings\u00f8velser med dramatisk st\u00f8rrelsesforskjell' },
      { milestone: 'Telling med visuelt engasjerende motiver', howWeAddress: 'Tell-fisken-i-akvariet og tell-sj\u00f8stjernene-aktiviteter gir engasjerende matematikk med fargerike motiver' },
      { milestone: 'Fargegjenkjenning og kreativ fargelegging', howWeAddress: 'Korallrev-fargeleggingsark med mange farger trener b\u00e5de fargebegreper og finmotorisk kontroll' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk f\u00e5 og kjente havdyr (fisk, sj\u00f8stjerne, hval), store og tydelige illustrasjoner, og fokuser p\u00e5 \u00e9n ferdighet om gangen. For avanserte f\u00f8rskolebarn introduser flere havdyr (bl\u00e6kksprut, krabbe, sj\u00f8hest), la dem telle h\u00f8yere og utfordre med sortering etter flere egenskaper (farge og st\u00f8rrelse).',
    parentTakeaway: 'Havet kan utforskes overalt. Les bildb\u00f8ker om havet, se p\u00e5 fisker p\u00e5 zoobutikken eller akvariet, og snakk om havdyrene p\u00e5 oppgavearkene. Badekaret kan bli et miniakvarium med lekefisk \u2014 tell dem og sorter etter farge. Hvis dere bor n\u00e6r kysten, bes\u00f8k fj\u00e6ra og let etter krabber og skjell. Disse f\u00f8rsteh\u00e5ndsopplevelsene forsterker alt barnet l\u00e6rer p\u00e5 havoppgavearkene.',
    classroomIntegration: 'Havtemaet egner seg for en spennende temauke i barnehagen: i samlingen introduseres havdyr med bilder og b\u00f8ker, ved l\u00e6ringsstasjoner arbeides med telleark og fargelegging, i vannleken utforskes vannegenskaper, og i kunstkroken lages akvarieplakater og havdyr i plastelina. Bes\u00f8k p\u00e5 akvarium eller fj\u00e6retur kobler oppgaveark med f\u00f8rsteh\u00e5ndsopplevelse, i tr\u00e5d med Rammeplanens m\u00e5l for natur og milj\u00f8.',
    assessmentRubric: [
      { skill: 'Havdyrgjenkjenning', emerging: 'gjenkjenner 2\u20133 havdyr med st\u00f8tte (fisk, hval)', proficient: 'navngir selvstendig 5\u20136 havdyr og beskriver enkle kjennetegn', advanced: 'navngir 8+ havdyr og forklarer hvor de lever og hva de spiser' },
      { skill: 'Telling med havmotiver', emerging: 'teller 1\u20135 fisk eller sj\u00f8stjerner med st\u00f8tte', proficient: 'teller selvstendig opp til 10 havdyr og kobler med riktig tall', advanced: 'teller over 10 og sammenligner mengder i undervannsscener' },
      { skill: 'St\u00f8rrelsessammenligning', emerging: 'identifiserer st\u00f8rst og minst med st\u00f8tte', proficient: 'sorterer selvstendig 3\u20134 havdyr etter st\u00f8rrelse', advanced: 'rangerer 5+ havdyr fra minst til st\u00f8rst og bruker sammenligningsord' },
    ],
  },

  pets: {
    snippetAnswer: 'Kj\u00e6ledyr-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker katter, hunder og kaniner til \u00e5 \u00f8ve telling, kobling og fargelegging. Den personlige forbindelsen til egne kj\u00e6ledyr driver sterk motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Kj\u00e6ledyrtemaet er et av de mest personlig engasjerende for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer ofte har en dyp emosjonell forbindelse til familiens katt, hund eller kanin \u2014 kj\u00e6ledyret er en av barnets viktigste relasjoner. Denne personlige tilknytningen gir enorm motivasjon for oppgavearbeid. Barn som fargelegger en katt, teller hundebein eller kobler kj\u00e6ledyr med mat, jobber med noe som er emosjonelt meningsfullt. Telling av potetrykk, fiskebiter og leker trener en-til-en-korrespondanse. Kobling av kj\u00e6ledyr med riktig mat og utstyr bygger logisk tenkning. Fargelegging av kj\u00e6ledyrportretter utvikler finmotorikk. Rammeplan for barnehagen vektlegger empati og omsorg, og kj\u00e6ledyrtemaet gir en naturlig arena for \u00e5 snakke om ansvar og f\u00f8lelser.',
    developmentalMilestones: [
      { milestone: 'Emosjonell utvikling og empati (3\u20134-\u00e5ringer l\u00e6rer omsorg gjennom kj\u00e6ledyrrelasjoner)', howWeAddress: 'Oppgaver om \u00e5 mate, stelle og passe p\u00e5 kj\u00e6ledyr bygger omsorgsforst\u00e5else og empati' },
      { milestone: 'Logisk kobling (barn forst\u00e5r at ting h\u00f8rer sammen)', howWeAddress: 'Koble-kj\u00e6ledyr-med-riktig-mat-oppgaver (hund\u2013bein, katt\u2013fisk) trener logisk og assosiativ tenkning' },
      { milestone: 'Telling med emosjonelt engasjement', howWeAddress: 'Tell-potetrykk og tell-kj\u00e6ledyr-i-parken-aktiviteter gir talltrening med personlig resonans' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med barnets eget kj\u00e6ledyr eller \u00f8nskedyr, bruk store og s\u00f8te illustrasjoner, og fokuser p\u00e5 \u00e9n enkel oppgave per ark. For avanserte f\u00f8rskolebarn introduser flere kj\u00e6ledyrarter, la dem sammenligne kj\u00e6ledyr etter egenskaper og utfordre med oppgaver om kj\u00e6ledyrpleie-sekvenser (f\u00f8rst mate, s\u00e5 b\u00f8rste, s\u00e5 lufte).',
    parentTakeaway: 'Hvis familien har kj\u00e6ledyr, bruk det som l\u00e6ringspartner. La barnet hjelpe med mating og tell fiskebiter eller r\u00f8kler. Snakk om hva kj\u00e6ledyret trenger (mat, vann, mosjon, kj\u00e6rlighet) og koble til oppgavearkene. Hvis dere ikke har kj\u00e6ledyr, bes\u00f8k en dyrebutikk eller bondeg\u00e5rd. La barnet tegne sitt dr\u00f8mmekj\u00e6ledyr og beskrive det \u2014 dette bygger b\u00e5de fantasi og ordforr\u00e5d.',
    classroomIntegration: 'Kj\u00e6ledyrtemaet integreres i f\u00f8rskolens sosiale l\u00e6ring: i samlingen forteller barna om sine kj\u00e6ledyr, ved l\u00e6ringsstasjoner arbeides med koblingsoppgaver og fargelegging, i rolleleken drives dyreklinikk og dyrebutikk, og i kunstkroken tegnes kj\u00e6ledyrportretter. Denne personlige tilknytningen oppfyller Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8, empati og sosial kompetanse.',
    assessmentRubric: [
      { skill: 'Kj\u00e6ledyrgjenkjenning og navngiving', emerging: 'navngir 2\u20133 kj\u00e6ledyr med st\u00f8tte', proficient: 'navngir selvstendig 5\u20136 kj\u00e6ledyrarter og beskriver enkle behov', advanced: 'navngir 8+ kj\u00e6ledyr og forklarer hva hvert trenger for \u00e5 ha det bra' },
      { skill: 'Kj\u00e6ledyr-mat-kobling', emerging: 'kobler 2\u20133 kj\u00e6ledyr med riktig mat med st\u00f8tte', proficient: 'kobler selvstendig 5\u20136 kj\u00e6ledyr med korrekt mat og utstyr', advanced: 'kobler 8+ kj\u00e6ledyr og forklarer hvorfor hvert dyr trenger sin mat' },
      { skill: 'Telling med kj\u00e6ledyrmotiver', emerging: 'teller 1\u20135 kj\u00e6ledyr med st\u00f8tte', proficient: 'teller selvstendig opp til 10 og kobler med riktig tall', advanced: 'teller over 10 og sammenligner mengder (flere katter enn hunder)' },
    ],
  },

  pirates: {
    snippetAnswer: 'Pirat-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker skattekister, skip og papeg\u00f8yer til \u00e5 \u00f8ve telling, kart-navigasjon og finmotorisk fargelegging. Eventyrstemningen fanger barnas fantasi og motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Pirattemaet er en fantasimagnet for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer elsker eventyr, hemmeligheter og skattejakt \u2014 alt pirater representerer. Denne narrative drivkraften gj\u00f8r selv krevende oppgaver som telling og retningsforst\u00e5else til spennende eventyr. Telling av gullmynter i skattekisten gir matematikk med spenning. Enkel kartnavigasjon (\u00abg\u00e5 tre steg til h\u00f8yre\u00bb) bygger romlig forst\u00e5else og retningsordforr\u00e5d. Fargelegging av piratskip og papeg\u00f8yer trener finmotorikk med fargerike motiver. Rammeplan for barnehagen vektlegger fantasi, kreativitet og fortelling, og pirattemaet gir det perfekte rammeverket for narrativ l\u00e6ring der matematikk og spr\u00e5k veves inn i eventyret.',
    developmentalMilestones: [
      { milestone: 'Romlig orientering og retningsforst\u00e5else (3\u20134-\u00e5ringer l\u00e6rer h\u00f8yre/venstre, fram/tilbake)', howWeAddress: 'Skattekartet-aktiviteter med enkle retningsinstruksjoner bygger romlig ordforr\u00e5d og navigasjon' },
      { milestone: 'Telling i eventyrlige kontekster', howWeAddress: 'Tell-gullmyntene og tell-edelsteinene-oppgaver gir engasjerende talltrening med skattejakt-motivasjon' },
      { milestone: 'Narrativ forst\u00e5else (barn f\u00f8lger enkle eventyrforl\u00f8p)', howWeAddress: 'Sekvensoppgaver som f\u00f8lger piratens reise (finn kartet, seil over havet, grav opp skatten) bygger narrativ tenkning' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, hold piratscenene enkle med f\u00e5 elementer, bruk fysisk skattejakt i rommet som supplement, og fokuser p\u00e5 \u00e9n ferdighet om gangen. For avanserte f\u00f8rskolebarn utvid med mer detaljerte kart, la dem telle st\u00f8rre mengder gullmynter og utfordre med \u00e5 tegne egne skattekart med retningsinstruksjoner.',
    parentTakeaway: 'Piratlek er fantastisk l\u00e6ring. Lag en skattejakt hjemme med enkle ledetr\u00e5der (\u00abg\u00e5 to steg fram, snu til h\u00f8yre\u00bb) \u2014 dette \u00f8ver b\u00e5de telling og retningsforst\u00e5else. Lag en skattekiste av en skoeske og fyll med \u00abgullmynter\u00bb (sjokoladepenger) som barnet kan telle. Bygg et piratskip av kartonger. Denne fantasileken forsterker oppgavearkenes l\u00e6ringsm\u00e5l og gir timer med engasjert lek.',
    classroomIntegration: 'Pirattemaet egner seg glimrende for en temauke: i samlingen leses pirathistorier, ved l\u00e6ringsstasjoner arbeides med telleark og kart\u00f8velser, i uteleken gjennomf\u00f8res skattejakt p\u00e5 uteomr\u00e5det, og i kunstkroken lages pirathatter og skattekart. Denne tverrfaglige temauka integrerer Rammeplanens m\u00e5l for kommunikasjon, spr\u00e5k og tekst med matematikk og sosial lek.',
    assessmentRubric: [
      { skill: 'Romlig navigasjon med skattekart', emerging: 'f\u00f8lger 1\u20132 retningsinstruksjoner med st\u00f8tte', proficient: 'f\u00f8lger selvstendig 3\u20134 retningsinstruksjoner p\u00e5 et enkelt kart', advanced: 'f\u00f8lger 5+ instruksjoner og lager egne enkle kart' },
      { skill: 'Telling med piratmotiver', emerging: 'teller 1\u20135 gullmynter med st\u00f8tte', proficient: 'teller selvstendig opp til 10 piratgjenstander og kobler med riktig tall', advanced: 'teller over 10 og l\u00f8ser enkle \u00abhvor mange til sammen\u00bb-oppgaver med gullmynter' },
      { skill: 'Narrativ sekvensering (piratreisen)', emerging: 'ordner 2 hendelser i rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 trinn i piratens eventyr', advanced: 'ordner 5+ trinn og gjenforteller historien med egne ord' },
    ],
  },

  robots: {
    snippetAnswer: 'Robot-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker fargerike roboter til \u00e5 \u00f8ve formgjenkjenning, telling og m\u00f8nstre. Barns fascinasjon for teknologi og bevegelige figurer driver sterkt engasjement. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Robottemaet er s\u00e6rlig effektivt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer fascineres av roboter som en blanding av det kjente (kropp, armer, bein) og det magiske (de kan bevege seg selv!). Robotkropper er bygget av geometriske former \u2014 firkantede kropper, runde hoder, rektangul\u00e6re armer \u2014 noe som gj\u00f8r dem til de perfekte verkt\u00f8yene for formgjenkjenning. Telling av robotdeler, knapper og lys bygger tallforst\u00e5else. M\u00f8nstergjenkjenning med robotsekvenser (bl\u00e5-r\u00f8d-bl\u00e5-r\u00f8d) styrker tidlig algebraisk tenkning. Fargelegging av roboter med spesifiserte farger \u00f8ver fargebegreper. Rammeplan for barnehagen fremhever natur, milj\u00f8 og teknologi, og robottemaet gir en alderstilpasset og fantasifull inngangsd\u00f8r til teknologiforst\u00e5else.',
    developmentalMilestones: [
      { milestone: 'Formgjenkjenning (3\u20134-\u00e5ringer identifiserer grunnleggende geometriske former)', howWeAddress: 'Bygg-en-robot-av-former-aktiviteter der barn setter sammen firkanter, sirkler og rektangler til en robotkropp' },
      { milestone: 'M\u00f8nstergjenkjenning med farger og former', howWeAddress: 'Robotsekvens-m\u00f8nstre (r\u00f8d robot-bl\u00e5 robot-r\u00f8d robot) bygger tidlig algebraisk tenkning' },
      { milestone: 'Telling av deler og detaljer', howWeAddress: 'Tell-robotknappene og tell-robotlyktene-oppgaver gir presis telletrening med visuelle detaljer' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk enkle robotdesign med tre\u2013fire grunnformer, hold telleoppgavene til 1\u20135, og la barnet bygge roboter med klosser som fysisk supplement. For avanserte f\u00f8rskolebarn introduser flere former og farger, la dem designe egne roboter med spesifiserte former, og utfordre med programmerings-sekvenser (\u00abroboten g\u00e5r fram, snur, g\u00e5r fram\u00bb).',
    parentTakeaway: 'Robotlek kan v\u00e6re enkel og kreativ. Bygg roboter av toalettrullkjerner, kartonger og korker \u2014 snakk om formene dere bruker. La barnet v\u00e6re en robot som f\u00f8lger instruksjoner (\u00abg\u00e5 to steg fram, snu til venstre\u00bb) for \u00e5 \u00f8ve b\u00e5de telling og retningsforst\u00e5else. Tell robotdeler p\u00e5 oppgavearkene og i lekorobotene. Denne kombinasjonen av kreativ lek og strukturert l\u00e6ring gj\u00f8r formgjenkjenning til en fest.',
    classroomIntegration: 'Robottemaet passer perfekt i en teknologitemauke: i samlingen snakkes det om hva roboter er og kan gj\u00f8re, ved l\u00e6ringsstasjoner arbeides med formoppgaver og m\u00f8nsterark, i konstruksjonsleken bygges roboter av gjenbruksmateriale, og i bevegelsesleken leker barna \u00abrobot-instruksjoner\u00bb. Denne tverrfaglige tiln\u00e6rmingen oppfyller Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi, og gir tidlig erfaring med algoritmisk tenkning.',
    assessmentRubric: [
      { skill: 'Formgjenkjenning i roboter', emerging: 'finner 1\u20132 former i en robot med st\u00f8tte', proficient: 'finner selvstendig 3\u20134 former og navngir dem (firkant, sirkel, rektangel)', advanced: 'finner 5+ former og bygger egne roboter med spesifiserte former' },
      { skill: 'M\u00f8nstergjenkjenning (robotsekvenser)', emerging: 'fortsetter et enkelt AB-m\u00f8nster med st\u00f8tte', proficient: 'fortsetter selvstendig AB- og ABB-m\u00f8nstre', advanced: 'lager egne m\u00f8nstre og forklarer reglene for dem' },
      { skill: 'Telling av robotdetaljer', emerging: 'teller 1\u20135 robotdeler med st\u00f8tte', proficient: 'teller selvstendig opp til 10 deler og kobler med riktig tall', advanced: 'teller alle deler og legger sammen (tre knapper pluss to lys)' },
    ],
  },

  school: {
    snippetAnswer: 'Skole-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker blyanter, b\u00f8ker og ryggsekker til \u00e5 \u00f8ve telling, sortering og bokstavgjenkjenning. Forberedelse til skolestart gir temaet ekstra motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Skoletemaet er unikt motiverende for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer ser opp til de store barna som g\u00e5r p\u00e5 skolen, og dr\u00f8mmer om \u00e5 gj\u00f8re det samme. Denne aspirasjonen gj\u00f8r skoleoppgaver til en spennende smakebit p\u00e5 det som kommer. Telling av blyanter i penalet, b\u00f8ker i sekken og barn i klasserommet gir matematikk med framtidsglede. Sortering av skolemateriale etter type (skrivesaker, b\u00f8ker, matboks) trener klassifisering. Bokstavgjenkjenning p\u00e5 bokomslag og navnelapper kobler skrift med skolekontekst. Rammeplan for barnehagen vektlegger overgangen fra barnehage til skole, og skoletemaet forbereder barn mentalt og faglig p\u00e5 denne milepælen.',
    developmentalMilestones: [
      { milestone: 'Skolemodenhet og overgangsforst\u00e5else (f\u00f8rskolebarn begynner \u00e5 forst\u00e5 at de snart skal begynne p\u00e5 skolen)', howWeAddress: 'Oppgaver med skoletema bygger fortrolighet med skolemilj\u00f8et og reduserer eventuell bekymring for skolestart' },
      { milestone: 'Selvstendig organisering (barn l\u00e6rer \u00e5 holde styr p\u00e5 egne ting)', howWeAddress: 'Sorteringsoppgaver der barn pakker ryggsekken med riktige ting bygger selvstendighet og organisering' },
      { milestone: 'Bokstavgjenkjenning i skolekontekst', howWeAddress: 'Finn-bokstaven-p\u00e5-bokomslaget og navneskriving-oppgaver kobler bokstavl\u00e6ring med skoleforberedelse' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 f\u00e5 og kjente skolegjenstander (blyant, bok, sekk), hold oppgavene positive og oppbyggende, og bruk barnets egne barnehagerutiner som bro til skoletemaet. For avanserte f\u00f8rskolebarn introduser flere skolebegreper, la dem \u00ableke skole\u00bb med oppgaver og utfordre med navneskriving og lengre sekvensoppgaver.',
    parentTakeaway: 'Skoletemaet er en gyllen mulighet til \u00e5 forberede barnet positivt. Snakk om skolen med begeistring, ikke bekymring. La barnet pakke sin egen sekk til barnehagen og telle tingene. Bes\u00f8k skoleg\u00e5rden sammen for \u00e5 bygge fortrolighet. \u00d8v navneskriving som en morsom aktivitet. Det viktigste er at barnet f\u00f8ler glede og nysgjerrighet for det som kommer \u2014 oppgavearkene hjelper med \u00e5 bygge denne positive forventningen.',
    classroomIntegration: 'Skoletemaet passer perfekt i f\u00f8rskolens siste halv\u00e5r: i samlingen snakkes det om hva som venter p\u00e5 skolen, ved l\u00e6ringsstasjoner arbeides med skoleforberedende oppgaver, i rolleleken leker barna \u00abskole\u00bb med tavle og b\u00f8ker, og p\u00e5 skolef\u00f8rberedelsesdager bes\u00f8kes den lokale skolen. Denne gradvise overgangen oppfyller Rammeplanens m\u00e5l for barns overgang fra barnehage til skole.',
    assessmentRubric: [
      { skill: 'Skoleforberedelse (kjennskap til skolemilj\u00f8)', emerging: 'gjenkjenner 2\u20133 skolegjenstander med st\u00f8tte', proficient: 'navngir selvstendig 5\u20136 skolegjenstander og forklarer hva de brukes til', advanced: 'beskriver en skoledag og forklarer forskjeller mellom barnehage og skole' },
      { skill: 'Sortering av skolemateriale', emerging: 'sorterer 2\u20133 ting i ryggsekken med st\u00f8tte', proficient: 'sorterer selvstendig 5\u20136 gjenstander i kategorier (skrivesaker/b\u00f8ker/mat)', advanced: 'sorterer etter flere kriterier og forklarer hva man trenger til ulike aktiviteter' },
      { skill: 'Navnegjenkjenning og -skriving', emerging: 'gjenkjenner forbokstaven i eget navn', proficient: 'gjenkjenner og sporer hele sitt eget navn', advanced: 'skriver eget navn selvstendig og gjenkjenner bokstaver i andre navn' },
    ],
  },

  seasons: {
    snippetAnswer: '\u00c5rstid-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker sn\u00f8, blomster, sol og blader til \u00e5 \u00f8ve sortering, telling og fargelegging. De fire \u00e5rstidene gir en naturlig ramme for \u00e5 forst\u00e5 tid og endring. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: '\u00c5rstidtemaet er et av de mest altomfattende for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer opplever sesongskiftene med hele kroppen \u2014 de kjenner kulden om vinteren, lukter v\u00e5ren, f\u00f8ler sommervarmen og plukker h\u00f8stens blader. Norge har fire tydelige \u00e5rstider som gir dramatiske forandringer i natur og v\u00e6r, noe som gj\u00f8r \u00e5rstidtemaet s\u00e6rlig rikt her. Sortering av kl\u00e6r og aktiviteter til riktig \u00e5rstid trener logisk klassifisering. Telling av sn\u00f8flak, blomster og blader gir matematikk med sesongfarge. Fargelegging av sesongscener utvikler finmotorikk med variert uttrykk. Rammeplan for barnehagen fremhever barns utforskning av natur gjennom hele \u00e5ret, og \u00e5rstidtemaet gir det perfekte rammeverket for denne langsiktige naturutforskningen.',
    developmentalMilestones: [
      { milestone: 'Tidsforst\u00e5else og sesongbevissthet (3\u20134-\u00e5ringer begynner \u00e5 forst\u00e5 at ting endres over tid)', howWeAddress: 'Sesongsorteringsoppgaver der barn plasserer elementer i riktig \u00e5rstid bygger tidsforst\u00e5else' },
      { milestone: 'Kategorisk sortering med mange gjenstander', howWeAddress: 'Sorter-til-riktig-\u00e5rstid-aktiviteter (votter til vinter, shorts til sommer) gir rik klassifiserings\u00f8velse' },
      { milestone: 'Observasjonsevner (barn legger merke til endringer i omgivelsene)', howWeAddress: 'Finn-forskjellene mellom sesongbilder skjerper observasjonsevner og naturforst\u00e5else' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med to kontrasterende \u00e5rstider (sommer/vinter), bruk f\u00e5 og tydelige sesongkjennetegn, og koble til barnets egne opplevelser (\u00abhva har vi p\u00e5 oss n\u00e5?\u00bb). For avanserte f\u00f8rskolebarn introduser alle fire \u00e5rstider, la dem beskrive overganger mellom sesonger og utfordre med naturobservasjonsdagbok.',
    parentTakeaway: '\u00c5rstidene er den naturlige kalendarien. Snakk om hva som endres ute gjennom \u00e5ret \u2014 pek p\u00e5 knopper om v\u00e5ren, isbading om sommeren, blader som faller om h\u00f8sten og sn\u00f8 om vinteren. Ta bilder av det samme treet gjennom \u00e5ret og lag en \u00e5rstidplakat sammen. Snakk om kl\u00e6r og aktiviteter for hver sesong. Denne naturlige tidsforst\u00e5elsen st\u00f8tter alt barnet l\u00e6rer p\u00e5 \u00e5rstidoppgavearkene.',
    classroomIntegration: '\u00c5rstidtemaet er selve ryggraden i f\u00f8rskolens \u00e5rshjul: hver sesong markeres med sesongkrukke (naturmateriale fra \u00e5rstiden), i samlingen snakkes det om hva som endres i naturen, ved l\u00e6ringsstasjoner arbeides med sesongoppgaver, og p\u00e5 naturturer dokumenteres endringene. Denne l\u00e5ngtrekkende observasjonen oppfyller Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi gjennom hele barnehage\u00e5ret.',
    assessmentRubric: [
      { skill: 'Sesonggjenkjenning', emerging: 'gjenkjenner 1\u20132 \u00e5rstider med st\u00f8tte (sommer/vinter)', proficient: 'navngir selvstendig alle fire \u00e5rstider og beskriver 1\u20132 kjennetegn per sesong', advanced: 'beskriver alle fire \u00e5rstider med flere kjennetegn og forklarer overganger' },
      { skill: 'Sesongsortering (kl\u00e6r og aktiviteter)', emerging: 'sorterer 2\u20133 gjenstander til riktig sesong med st\u00f8tte', proficient: 'sorterer selvstendig 5\u20136 gjenstander til riktige \u00e5rstider', advanced: 'sorterer 8+ gjenstander og forklarer hvorfor de passer i hver sesong' },
      { skill: 'Naturobservasjon over tid', emerging: 'beskriver 1 endring i naturen med st\u00f8tte', proficient: 'beskriver selvstendig 2\u20133 naturendringer mellom sesonger', advanced: 'sammenligner flere sesonger og forutsier hva som vil skje neste sesong' },
    ],
  },

  shapes: {
    snippetAnswer: 'Form-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) introduserer sirkel, firkant og trekant gjennom sporing, kobling og fargelegging. Grunnformene er byggesteinene for all geometriforst\u00e5else. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Formtemaet er det mest fundamentale geometriske temaet for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er i den kritiske perioden for romlig forst\u00e5else \u2014 de l\u00e6rer at verden best\u00e5r av former som kan identifiseres, navngis og sammenlignes. Sirkel, firkant og trekant er de tre grunnformene som all videre geometri bygger p\u00e5. Formgjenkjenning i hverdagsgjenstander (rund klokke, firkantet vindu, trekantet tak) kobler abstrakt geometri med barnets virkelighet. Sporing av former utvikler b\u00e5de finmotorikk og romlig hukommelse. Sortering etter form bygger klassifiseringsevne. Rammeplan for barnehagen fremhever antall, rom og form som et kjerneomr\u00e5de, og formoppgaver bygger selve grunnmuren for denne forst\u00e5elsen.',
    developmentalMilestones: [
      { milestone: 'Formgjenkjenning og navngiving (3\u20134-\u00e5ringer l\u00e6rer \u00e5 identifisere og navngi grunnformer)', howWeAddress: 'Formgjenkjenningsoppgaver med tydelige illustrasjoner og hverdagseksempler kobler geometri med barnets verden' },
      { milestone: 'Formsporing og finmotorisk kontroll', howWeAddress: 'Prikkede sporingsark med sirkel, firkant og trekant guider h\u00e5nden og bygger motorisk hukommelse for former' },
      { milestone: 'Formsortering (barn grupperer like former sammen)', howWeAddress: 'Sorteringsoppgaver der barn grupperer sirkler, firkanter og trekanter bygger klassifiseringsevne' },
      { milestone: 'Formgjenkjenning i omgivelsene (barn finner former i hverdagen)', howWeAddress: 'Finn-formen-i-bildet-aktiviteter der barn identifiserer former i hus, kj\u00f8ret\u00f8y og natur' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med \u00e9n form om gangen (begynn med sirkelen, den enkleste), bruk fysiske former som klosser og utskj\u00e6ringer som supplement, og la barnet f\u00f8le p\u00e5 formene. For avanserte f\u00f8rskolebarn introduser flere former (rektangel, oval, stjerne), la dem kombinere former til bilder, og utfordre med formm\u00f8nstre.',
    parentTakeaway: 'Former er overalt rundt dere. G\u00e5 p\u00e5 formjakt hjemme \u2014 finn sirkler (klokken, tallerkenen), firkanter (vinduet, boken) og trekanter (taket, pizzastykket). La barnet bygge med klosser og snakk om formene: \u00abden er firkantet\u00bb, \u00abden er rund\u00bb. Tegn former i sand, p\u00e5 dugget vindu eller med kritt p\u00e5 fortauet. Denne daglige formjakten gj\u00f8r geometri til noe barnet ser overalt.',
    classroomIntegration: 'Formtemaet gjennomsyrer f\u00f8rskolens aktiviteter: i samlingen synges formsanger og pekes p\u00e5 former i rommet, ved l\u00e6ringsstasjoner arbeides med sporing og sortering, i konstruksjonsleken bygges med formklosser, og p\u00e5 turer letes det etter former i n\u00e6rmilj\u00f8et. Formens-uke-praksis gir fokusert geometril\u00e6ring og oppfyller Rammeplanens kjerneomr\u00e5de antall, rom og form.',
    assessmentRubric: [
      { skill: 'Formgjenkjenning', emerging: 'gjenkjenner sirkel med st\u00f8tte', proficient: 'gjenkjenner selvstendig sirkel, firkant og trekant og navngir dem', advanced: 'gjenkjenner 5+ former inkludert rektangel og oval, og finner dem i hverdagsgjenstander' },
      { skill: 'Formsporing', emerging: 'sporer en sirkel p\u00e5 prikkede linjer gjenkjennelig', proficient: 'sporer selvstendig sirkel, firkant og trekant med tydelige linjer', advanced: 'tegner former selvstendig uten modell og kombinerer dem til bilder' },
      { skill: 'Formsortering', emerging: 'sorterer former i 2 grupper med st\u00f8tte', proficient: 'sorterer selvstendig 3 grunnformer i riktige grupper', advanced: 'sorterer 5+ former og forklarer hva som kjennetegner hver form' },
    ],
  },

  space: {
    snippetAnswer: 'Verdensrom-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker raketter, planeter og stjerner til \u00e5 \u00f8ve telling, formgjenkjenning og fargelegging. Verdensrommets mystikk fanger barnas fantasi og nysgjerrighet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Verdensromtemaet er en fantasibombe for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer fascineres av m\u00e5nen, stjernene og tanken p\u00e5 raketter som flyr langt, langt bort. Denne kosmiske nysgjerrigheten gir en unik motivasjon som gj\u00f8r selv abstrakte begreper magiske. Planeter er perfekte sirkler \u2014 formgjenkjenning blir fantasi. Telling av stjerner p\u00e5 nattehimmelen gir matematikk med undring. Rakettens nedtelling (5-4-3-2-1-start!) bygger tallrekkef\u00f8lgeforst\u00e5else baklengs. Fargelegging av romscener med planeter, raketter og astronauter utvikler finmotorikk med fargerike motiver. Rammeplan for barnehagen vektlegger natur, milj\u00f8 og teknologi, og verdensrommet gir den mest fascinerende inngangen til naturvitenskap for de yngste.',
    developmentalMilestones: [
      { milestone: 'Nedtelling og tallrekkef\u00f8lge baklengs (3\u20134-\u00e5ringer l\u00e6rer at tall kan g\u00e5 begge veier)', howWeAddress: 'Rakettnedtelling (5-4-3-2-1-START!) gj\u00f8r baklengs telling til en spennende opplevelse' },
      { milestone: 'Formgjenkjenning med runde former (sirkel og oval)', howWeAddress: 'Planetene som sirkler og m\u00e5nen som kule gir naturlig formgjenkjenning i kosmisk kontekst' },
      { milestone: 'St\u00f8rrelsesforst\u00e5else med dramatiske forskjeller', howWeAddress: 'Sammenligning av planeter (lille Merkur, store Jupiter) bygger st\u00f8rrelsesbegreper med wow-faktor' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med tre kjente elementer (rakett, m\u00e5ne, stjerne), hold nedtellingen til 5-1, og bruk fysiske raketter og stjerner som supplement. For avanserte f\u00f8rskolebarn introduser flere planeter, la dem lage et planetsystem med st\u00f8rrelsesforhold, og utfordre med nedtelling fra 10 og enkel romforskning (\u00abhvorfor lyser m\u00e5nen?\u00bb).',
    parentTakeaway: 'Verdensrommet er synlig hver kveld. Se p\u00e5 m\u00e5nen og stjernene sammen f\u00f8r sengetid og snakk om hva dere ser. Tell stjerner (selv om dere m\u00e5 gi opp!), pek p\u00e5 m\u00e5nens form (rund som en sirkel!) og lek rakettnedtelling med kroppen. Bildb\u00f8ker om verdensrommet utvider fascinasjonen. Lag en rakett av en kartong og \u00abreise\u00bb til forskjellige planeter \u2014 denne fantasileken forsterker oppgavearkenes l\u00e6ring.',
    classroomIntegration: 'Verdensromtemaet egner seg for en eventyrlig temauke: i samlingen vises bilder av planeter og raketter, ved l\u00e6ringsstasjoner arbeides med telleark og formoppgaver, i leken bygges raketter og utforskes \u00abplaneter\u00bb i rommet, og i kunstkroken lages romscener med m\u00f8rkt papir og glitter. Rakettnedtelling i samling og overgangssituasjoner gir daglig talltrening. Temaet oppfyller Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi med fantasi og undring.',
    assessmentRubric: [
      { skill: 'Romforst\u00e5else og ordforr\u00e5d', emerging: 'navngir 2\u20133 romelementer med st\u00f8tte (rakett, m\u00e5ne, stjerne)', proficient: 'navngir selvstendig 5\u20136 romelementer og beskriver dem', advanced: 'navngir 8+ romelementer inkludert planeter og forklarer enkle romfakta' },
      { skill: 'Nedtelling (baklengs telling)', emerging: 'teller ned fra 5 med st\u00f8tte', proficient: 'teller selvstendig ned fra 5 til 1 og roper START', advanced: 'teller ned fra 10 og forst\u00e5r at nedtelling er \u00ababaklengs\u00bb telling' },
      { skill: 'Formgjenkjenning (planeter og romfart\u00f8y)', emerging: 'finner 1\u20132 sirkler i romscener med st\u00f8tte', proficient: 'finner selvstendig 3\u20134 former i romillustrasjoner', advanced: 'finner 5+ former og bruker dem til \u00e5 bygge egne romscener' },
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
