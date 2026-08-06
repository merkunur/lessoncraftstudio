#!/usr/bin/env node
/**
 * SEO Part 223: DA Kindergarten Grade Enrichment \u2014 Themes 1-19
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 19 DA theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: `Alfabet-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner bogstavgenkendelse, lyd-bogstav-forbindelser og selvst\u00e6ndig skrivning, s\u00e5 b\u00f8rn mestrer alle 29 danske bogstaver. Ordsporings- og lydaktiviteter opbygger l\u00e6sefundamentet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `B\u00f8rnehaveklassen er det afg\u00f8rende \u00e5r for alfabetmestring \u2014 fem- og seks\u00e5rige forventes at g\u00e5 fra delvis bogstavkendskab til fuld genkendelse af alle 29 danske bogstaver (inkl. \u00e6, \u00f8, \u00e5) med automatik. Hvor f\u00f8rskoleb\u00f8rn sporede bogstaver og matchede dem med billeder, arbejder b\u00f8rnehaveklasseb\u00f8rn med lyd-bogstav-korrespondance, begyndelsesbogstaver og selvst\u00e6ndig bogstavskrivning p\u00e5 linjeret papir. Ordsporinger og enkle ordsogningsaktiviteter introducerer l\u00e6sning som funktionel f\u00e6rdighed. F\u00e6lles M\u00e5ls m\u00e5l for b\u00f8rnehaveklassen kr\u00e6ver automatisk bogstavgenkendelse, og vores arbejdsark bygger systematisk mod dette med varierede aktivitetstyper.`,
    developmentalMilestones: [
      { milestone: `Automatisk bogstavgenkendelse (5\u20136-\u00e5rige skal kunne navngive alle bogstaver uden t\u00f8ven)`, howWeAddress: `Hurtig-genkendelsesaktiviteter og matchningsark med blandede bogstaver i forskellige skrifttyper tr\u00e6ner automatik` },
      { milestone: `Lyd-bogstav-forbindelse (b\u00f8rn l\u00e6rer at forbinde hver bogstavform med dens prim\u00e6re lyd)`, howWeAddress: `Begyndelsesbogstav-matchning og lyd-sorterings\u00f8velser knytter bogstaver til meningsfulde ord fra hverdagen` },
      { milestone: `Selvst\u00e6ndig bogstavskrivning (overgang fra sporing til produktion fra hukommelsen)`, howWeAddress: `Skriveark med linjerede felter, der g\u00e5r fra prikkede modeller til tomme linjer, opbygger skriveselvst\u00e6ndighed gradvist` },
      { milestone: `Fonemisk bevidsthed (evnen til at isolere f\u00f8rste lyd i et ord)`, howWeAddress: `Find-begyndelsesbogstavet-aktiviteter og rim\u00f8velser styrker den lydlige analyse, der er grundlaget for l\u00e6sning` },
    ],
    differentiationNotes: `For b\u00f8rn der stadig k\u00e6mper med bogstavgenkendelse, begr\u00e6ns til 5\u20136 bogstaver ad gangen med t\u00e6t visuel st\u00f8tte og multisensorisk \u00f8velse (sandpapirsbogstaver, modellerv\u00e5ks). For avancerede b\u00f8rnehaveklasseb\u00f8rn, der allerede l\u00e6ser, udfordres med ordforvirringsopgaver, enkle krydsord og bogstavlyde i flerlydsord.`,
    parentTakeaway: `B\u00f8rnehaveklassen er \u00e5ret, hvor bogstaverne skal sidde fast. L\u00e6s h\u00f8jt sammen hver dag og peg p\u00e5 bogstaver i teksten. Leg \u201dhvad begynder med..?\u201d p\u00e5 indkobsturen. Lad barnet skrive sit navn og familiens navne. Bogstavmagneter p\u00e5 k\u00f8leskabet g\u00f8r alfabetet synligt hele dagen.`,
    classroomIntegration: `Alfabetarbejdsark bruges som daglig opvarmning i l\u00e6seblokken: mandag bogstavgenkendelse, tirsdag lyd-matchning, onsdag sporing/skrivning, torsdag ordsogning, fredag bogstavpuslespil. Ugens bogstav f\u00e5r sin egen l\u00e6ringsstation med tilh\u00f8rende arbejdsark, konkrete materialer og b\u00f8ger. F\u00e6lles M\u00e5ls m\u00e5l for skriftsprogstilegnelse integreres systematisk.`,
    assessmentRubric: [
      { skill: `Bogstavgenkendelse (store og sm\u00e5)`, emerging: `genkender 10\u201315 bogstaver med vis t\u00f8ven og forveksler lignende former (b/d, p/q)`, proficient: `genkender alle 29 bogstaver i store og sm\u00e5 former inden for f\u00e5 sekunder`, advanced: `genkender bogstaver i alle skrifttyper og kan navngive dem bagl\u00e6ns og i tilf\u00e6ldig r\u00e6kkef\u00f8lge` },
      { skill: `Lyd-bogstav-korrespondance`, emerging: `forbinder 8\u201312 bogstaver med deres prim\u00e6re lyd med st\u00f8tte`, proficient: `producerer selvst\u00e6ndigt den prim\u00e6re lyd for alle bogstaver`, advanced: `kender alternative lyde (bl\u00f8dt/h\u00e5rdt d, kort/langt vokal) og bruger dem ved afkodning` },
      { skill: `Bogstavskrivning`, emerging: `skriver 10\u201315 bogstaver l\u00e6seligt med model`, proficient: `skriver alle bogstaver l\u00e6seligt fra hukommelsen p\u00e5 linjeret papir`, advanced: `skriver hurtigt og korrekt og danner spontant korte ord som hund, sol, kat` },
    ],
  },

  animals: {
    snippetAnswer: `Dyre-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) kombinerer t\u00e6lling til 20, addition/subtraktion inden for 10, og naturvidenskabelig klassifikation med engagerende dyremotiver. B\u00f8rn l\u00e6rer at gruppere dyr efter egenskaber. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `B\u00f8rnehaveklassen er det \u00e5r, hvor dyrenes verden \u00e5bner sig fagligt \u2014 fem- og seks\u00e5rige g\u00e5r fra at elske dyr til at l\u00e6re om dem systematisk. Hvor f\u00f8rskoleb\u00f8rn sorterede efter simpel farve eller st\u00f8rrelse, kan b\u00f8rnehaveklasseb\u00f8rn klassificere efter flere egenskaber samtidig: antal ben, kropsd\u00e6kke og levested. T\u00e6lling n\u00e5r op til 20 med dyreggrupper, og addition/subtraktion inden for 10 introduceres med visuelle dyret\u00e6llere (fem fugle minus to, der flyver v\u00e6k). Dyrenes navne bruges i begyndende l\u00e6se\u00f8velser og ordsporinger. F\u00e6lles M\u00e5l for natur/teknik i b\u00f8rnehaveklassen underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Klassifikation efter flere egenskaber (5\u20136-\u00e5rige kan sortere efter to kriterier samtidig)`, howWeAddress: `Sorteringsark der grupperer dyr efter b\u00e5de levested og kropsd\u00e6kke opbygger logisk t\u00e6nkning p\u00e5 to dimensioner` },
      { milestone: `Addition og subtraktion inden for 10 (b\u00f8rnehaveklassens matematiske milepol)`, howWeAddress: `Dyrescener med addition (tre katte plus to katte) og subtraktion (fem fugle minus to) giver konkret repr\u00e6sentation` },
      { milestone: `Ordgenkendelse og stavning af dyrenavne (begyndende l\u00e6sning)`, howWeAddress: `Ordsporinger og ordsogningsark med dyreord p\u00e5 3\u20135 bogstaver tr\u00e6ner l\u00e6sefundamentet med motiverende indhold` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til velkendte husdyr (kat, hund, ko), brug konkrete dyrefigurer som supplement, og hold matematikken inden for 5. For avancerede b\u00f8rnehaveklasseb\u00f8rn udfordres med eksotiske dyr, flertrinsproblemer og selvst\u00e6ndig skrivning af dyrefakta.`,
    parentTakeaway: `Bes\u00f8g zoologisk have eller bondeg\u00e5rd og t\u00e6l dyr sammen \u2014 hvor mange geder? Flere end f\u00e5r? Lad barnet tegne et dyr og skrive dets navn. L\u00e6s dyreb\u00f8ger og stil sp\u00f8rgsm\u00e5l: \u201dhvor bor den?\u201d og \u201dhvad spiser den?\u201d. Disse samtaler g\u00f8r naturvidenskab personlig og opbygger det ordforr\u00e5d, der driver l\u00e6sning.`,
    classroomIntegration: `Dyrearbejdsark integreres i b\u00f8rnehaveklassens naturfagsundervisning: ugentlige dyreopdagelser med tilh\u00f8rende arbejdsark, l\u00e6ringsstationer med sorterings\u00f8velser og dyrefigurer, matematikhj\u00f8rnet med additions-/subtraktionsark og dyret\u00e6llere, og l\u00e6sehjornet med dyreordsogninger. F\u00e6lles M\u00e5ls m\u00e5l for natur og matematik integreres.`,
    assessmentRubric: [
      { skill: `Dyreklassifikation`, emerging: `sorterer dyr i to grupper efter \u00e9n egenskab med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to egenskaber (levested og kropsd\u00e6kke)`, advanced: `opretter egne klassifikationskriterier og forklarer dem mundtligt` },
      { skill: `Addition/subtraktion med dyret\u00e6llere`, emerging: `l\u00f8ser opgaver inden for 5 med konkret st\u00f8tte (figurer/billeder)`, proficient: `l\u00f8ser selvst\u00e6ndigt opgaver inden for 10 med visuelle dyret\u00e6llere`, advanced: `l\u00f8ser opgaver inden for 10 mentalt og forklarer regnestykket mundtligt` },
      { skill: `L\u00e6sning af dyrenavne`, emerging: `genkender 3\u20134 dyreord med billedst\u00f8tte`, proficient: `l\u00e6ser selvst\u00e6ndigt 8\u201310 dyrenavne og staver dem i ordsogning`, advanced: `l\u00e6ser nye dyrenavne ved afkodning og skriver dem selvst\u00e6ndigt` },
    ],
  },

  birds: {
    snippetAnswer: `Fugle-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, m\u00f8nstergenkendelse og begyndende l\u00e6sning med danske fugle som solsort, musvit og r\u00f8dk\u00e6lk. Naturfagsklassifikation integreres naturligt. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Fugletemaet er ideelt for b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang kan observere systematisk \u2014 de kan sidde stille, t\u00e6lle fugle ved foderbr\u00e6ttet og registrere resultaterne. Denne evne til fokuseret observation er ny sammenlignet med f\u00f8rskolens spontane udbrud. Fugle tilbyder naturlig addition (tre musvitter plus to solsorte), m\u00f8nstergenkendelse (fjerdragt, n\u00e6bform) og sekvensering (livscyklus fra \u00e6g til voksen). Fuglenavne p\u00e5 3\u20136 bogstaver er perfekte til begyndende l\u00e6sning. F\u00e6lles M\u00e5ls m\u00e5l for naturfaglig observation og registrering underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `Systematisk observation (5\u20136-\u00e5rige udvikler evnen til fokuseret, m\u00e5lrettet iagttagelse)`, howWeAddress: `Fugleoptions- og t\u00e6lleark, der kr\u00e6ver at b\u00f8rn scanner et billede systematisk, tr\u00e6ner observationsf\u00e6rdigheder` },
      { milestone: `M\u00f8nstergenkendelse (genkendelse af gentagende strukturer)`, howWeAddress: `Fjerdragt-m\u00f8nsterark og fuglesekvenser opbygger den m\u00f8nstert\u00e6nkning, der er grundlag for matematik` },
      { milestone: `Livscyklusforst\u00e5else (\u00e6g \u2192 unge \u2192 voksen fugl)`, howWeAddress: `Sekvenserings\u00f8velser med fuglens livscyklus i tre-fire trin opbygger tidslig og biologisk forst\u00e5else` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, fokus\u00e9r p\u00e5 tre velkendte fugle (solsort, due, m\u00e5ge), brug fuglebilleder med tydelige kendetegn, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn introduceres tr\u00e6kfugle vs. standfugle, fuglekrydsord og selvst\u00e6ndig skrivning af fuglefakta.`,
    parentTakeaway: `S\u00e6t et foderbr\u00e6t op og t\u00e6l fugle sammen \u2014 det er gratis matematik og naturfag. Lad barnet f\u00f8re en enkel fugledagbog: \u201dJeg s\u00e5 3 musvitter.\u201d Bes\u00f8g parken og lyt efter fuglesang. Brug arbejdsarkene som forberedelse og opf\u00f8lgning p\u00e5 ude-observationer.`,
    classroomIntegration: `Fugletemaet f\u00f8lger \u00e5rstiderne i b\u00f8rnehaveklassen: om vinteren t\u00e6lles fugle ved foderbr\u00e6ttet, om for\u00e5ret observeres reder og \u00e6g, om sommeren lyttes til fuglesang. Ved l\u00e6ringsstationer arbejdes med t\u00e6lle-, sorterings- og ordsporingsark. Matematiktimen bruger fugle til addition/subtraktion. F\u00e6lles M\u00e5ls m\u00e5l for natur/teknik og matematik integreres.`,
    assessmentRubric: [
      { skill: `Fuglegenkendelse og observation`, emerging: `genkender 2\u20133 almindelige danske fugle med billedst\u00f8tte`, proficient: `genkender selvst\u00e6ndigt 5\u20136 fugle og beskriver deres kendetegn`, advanced: `genkender 8+ fugle, kender deres navne og simple fakta (tr\u00e6kfugl/standfugl)` },
      { skill: `T\u00e6lling og registrering (fuglekontekst)`, emerging: `t\u00e6ller 1\u201310 fugle i et billede med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 fugle og noterer resultatet korrekt`, advanced: `t\u00e6ller, sammenligner og l\u00f8ser additionsopgaver med fuglet\u00e6llinger` },
      { skill: `Fugle-livscyklus`, emerging: `ordner 2 trin (\u00e6g, fugl) med billedst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 3 livscyklusfaser i korrekt r\u00e6kkef\u00f8lge`, advanced: `ordner 4 faser og forklarer, hvad der sker i hvert trin med egne ord` },
    ],
  },

  birthday: {
    snippetAnswer: `F\u00f8dselsdag-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) kombinerer t\u00e6lling til 20, addition inden for 10 og begyndende skrivning med festlige motiver som kager, gaver og balloner. Tallene f\u00e5r personlig betydning. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `F\u00f8dselsdagstemaet har en s\u00e6rlig kraft i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for f\u00f8rste gang forst\u00e5r aldersbegrebet \u2014 de er stolte af at v\u00e6re \u201dstore\u201d og t\u00e6ller iv\u00e6rigt ned til n\u00e6ste f\u00f8dselsdag. Denne personlige forbindelse g\u00f8r matematik meningsfuld: t\u00e6lling af lys p\u00e5 kagen, addition af gaver, og subtraktion af balloner, der flyver v\u00e6k. B\u00f8rnehaveklasseb\u00f8rn kan skrive invitationer med enkle s\u00e6tninger og tal, hvilket integrerer skrivning i festkonteksten. F\u00e6lles M\u00e5ls m\u00e5l for tal og kommunikation m\u00f8des i \u00e9t motiverende tema.`,
    developmentalMilestones: [
      { milestone: `Talforst\u00e5else op til 20 (5\u20136-\u00e5rige mestrer t\u00e6lling med stigende sikkerhed)`, howWeAddress: `T\u00e6lleaktiviteter med f\u00f8dselsdagslys, gaver og g\u00e6ster fra 1 til 20 g\u00f8r t\u00e6lling personligt meningsfuld` },
      { milestone: `Addition og subtraktion inden for 10 (begyndende regning)`, howWeAddress: `Festscener med \u201d5 balloner plus 3 balloner\u201d og \u201d8 stykker kage minus 2 der bliver spist\u201d giver konkret regning` },
      { milestone: `Funktionel skrivning (b\u00f8rn skriver med et form\u00e5l)`, howWeAddress: `Skrivning af f\u00f8dselsdagsinvitationer og \u00f8nskesedler giver autentisk skrivetr\u00e6ning med personligt engagement` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, hold t\u00e6llingen inden for 10, brug \u00e9n-til-\u00e9n pegen med konkrete lys/balloner, og tilbyd skriveskabeloner med prikkede bogstaver. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes flertrinsproblemer (6 g\u00e6ster plus 4 g\u00e6ster, 3 kager med 5 lys hver) og selvst\u00e6ndig skrivning af festbeskrivelser.`,
    parentTakeaway: `Brug barnets egen f\u00f8dselsdag som l\u00e6ringsanledning: t\u00e6l lys p\u00e5 kagen, skriv g\u00e6steliste sammen, fordel slik ligeligt og t\u00e6l gaver. L\u00e6sning af f\u00f8dselsdagskort tr\u00e6ner bogstavgenkendelse. Hvert f\u00f8dselsdag i familien er en minimatematiklektion \u2014 og barnet elsker det, fordi det handler om dem.`,
    classroomIntegration: `F\u00f8dselsdagstemaet bruges til fejring af klassens f\u00f8dselsdage med l\u00e6ringsindhold: f\u00f8dselsdagsbarnet f\u00e5r et s\u00e6rligt matematikark, klassen t\u00e6ller og skriver f\u00f8llesedler, og f\u00f8dselsdagskalenderen bruges til m\u00e5nedstal og r\u00e6kkef\u00f8lge. F\u00e6lles M\u00e5ls m\u00e5l for tal, kommunikation og sociale f\u00e6rdigheder integreres i fejringen.`,
    assessmentRubric: [
      { skill: `T\u00e6lling til 20 (f\u00f8dselsdagskontekst)`, emerging: `t\u00e6ller 1\u201310 f\u00f8dselsdagsgenstande med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og skriver de tilsvarende tal korrekt`, advanced: `t\u00e6ller over 20 og sammenligner m\u00e6ngder (flere lys end gaver)` },
      { skill: `Addition/subtraktion med festtema`, emerging: `l\u00f8ser additionsopgaver inden for 5 med konkret st\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt additions- og subtraktionsopgaver inden for 10`, advanced: `l\u00f8ser flertrinsproblemer og formulerer egne regnestykker om fester` },
      { skill: `Funktionel skrivning (invitationer/kort)`, emerging: `kopierer enkle ord fra model (Tillykke, navn)`, proficient: `skriver selvst\u00e6ndigt korte s\u00e6tninger p\u00e5 kort og invitationer`, advanced: `skriver flere s\u00e6tninger med korrekt bogstavering og kreativt indhold` },
    ],
  },

  body: {
    snippetAnswer: `Krop-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner kropsdele, t\u00e6lling (fingre, t\u00e6er), symmetri og begyndende sundhedsforst\u00e5else. B\u00f8rn l\u00e6rer at navngive og skrive kropsord. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Kropstemaet f\u00e5r en ny dimension i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige begynder at forst\u00e5 kroppen som et system \u2014 ikke blot individuelle dele, men hvordan de arbejder sammen. Hvor f\u00f8rskoleb\u00f8rn navngav hoved, arme og ben, kan b\u00f8rnehaveklasseb\u00f8rn t\u00e6lle ledpar (to kn\u00e6, to albuer), forst\u00e5 symmetri (venstre og h\u00f8jre h\u00e5nd) og relatere kropsdele til funktion (orer til at h\u00f8re, \u00f8jne til at se). T\u00e6lling af fingre og t\u00e6er i grupper af fem og ti st\u00f8tter tiertalsforst\u00e5else. Skrivning af kropsord med 3\u20135 bogstaver tr\u00e6ner l\u00e6sefundamentet. F\u00e6lles M\u00e5ls m\u00e5l for krop og sundhed m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Kropsbevidsthed og funktion (5\u20136-\u00e5rige forst\u00e5r, at kropsdele har specifikke funktioner)`, howWeAddress: `Matchningsark der forbinder kropsdele med sanser/funktioner opbygger biologisk grundforst\u00e5else` },
      { milestone: `Symmetriforst\u00e5else (genkendelse af venstre/h\u00f8jre og parrede kropsdele)`, howWeAddress: `Symmetriaktiviteter med kropssilhuetter, der skal f\u00e6rdiggores p\u00e5 begge sider, tr\u00e6ner rumlig t\u00e6nkning` },
      { milestone: `T\u00e6lling i grupper af fem og ti (fingre og t\u00e6er som naturlige t\u00e6lleenheder)`, howWeAddress: `T\u00e6lling af fingre, t\u00e6er og andre kropsdele i grupper opbygger forst\u00e5elsen af femtal og tieral` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, brug barnets egen krop som reference (r\u00f8r ved din n\u00e6se, peg p\u00e5 din albue), begr\u00e6ns til de mest basale dele, og hold t\u00e6llingen konkret. For avancerede b\u00f8rnehaveklasseb\u00f8rn introduceres organnavne, skelettet og enkle sundhedsregler med tilh\u00f8rende skriveopgaver.`,
    parentTakeaway: `Kroppen er altid til stede som l\u00e6ringsredskab. T\u00e6l fingre og t\u00e6er ved sengetid, navngiv kropsdele under badet, og leg \u201dSimon siger: r\u00f8r ved dine kn\u00e6\u201d for at \u00f8ve ordforr\u00e5d og instruktioner. Tal om sund kost og bev\u00e6gelse i hverdagen \u2014 barnet l\u00e6rer, at kroppen er noget, man passer p\u00e5.`,
    classroomIntegration: `Kropstemaet integreres i b\u00f8rnehaveklassens sundhedsundervisning: i samlingen synges kropssange, ved l\u00e6ringsstationer arbejdes med navngivnings- og t\u00e6lleark, i idr\u00e6tstimen bev\u00e6ges alle kropsdele bevidst, og i kunsthj\u00f8rnet tegnes kropssilhuetter i fuld storrelse. F\u00e6lles M\u00e5ls m\u00e5l for sundhed, krop og bev\u00e6gelse underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Kropsdele og funktioner`, emerging: `navngiver 5\u20138 basale kropsdele med billedst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 12\u201315 kropsdele og forbinder dem med funktioner`, advanced: `forklarer, hvorfor vi har to \u00f8jne/\u00f8rer/h\u00e6nder og kender enkle organnavne` },
      { skill: `Symmetri med kroppen`, emerging: `identificerer parrede kropsdele (to h\u00e6nder) med st\u00f8tte`, proficient: `f\u00e6rdigg\u00f8r selvst\u00e6ndigt en symmetrisk kropssilhuet korrekt`, advanced: `forklarer symmetribegrebbet og finder det i andre sammenh\u00e6nge` },
      { skill: `T\u00e6lling af kropsdele`, emerging: `t\u00e6ller fingre p\u00e5 \u00e9n h\u00e5nd (1\u20135) med st\u00f8tte`, proficient: `t\u00e6ller alle fingre og t\u00e6er (10+10) og skriver tallene korrekt`, advanced: `bruger h\u00e6nder som t\u00e6llestrategier for addition inden for 10` },
    ],
  },

  camping: {
    snippetAnswer: `Camping-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling, addition inden for 10 og begyndende l\u00e6sning med telte, b\u00e5l og naturmotiver. Campingens udend\u00f8rsramme g\u00f8r l\u00e6ringen eventyrlig. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Campingtemaet er s\u00e6rligt st\u00e6rkt for b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige har den selvst\u00e6ndighed og udholdenhed, der g\u00f8r campingoplevelser meningsfulde \u2014 de kan sl\u00e5 teltporer i, puste p\u00e5 et b\u00e5l og f\u00f8lge flertrinsinstruktioner for at pakke en rygsaek. Denne parathed til strukturerede udend\u00f8rsudfordringer g\u00f8r campingarbejdsark relevante og motiverende. T\u00e6lling af campingudstyr i pakkelister giver funktionel matematik. Addition af b\u00e5lgenstande (3 pinde plus 4 pinde) og subtraktion (8 skumfiduser minus 3 der bliver spist) er naturligt indlejret. Skrivning af campingdagbog introducerer funktionel skrivning. F\u00e6lles M\u00e5ls m\u00e5l for natur og praktiske f\u00e6rdigheder m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Flertrinsinstruktioner (5\u20136-\u00e5rige kan f\u00f8lge 2\u20133-trins instruktioner selvst\u00e6ndigt)`, howWeAddress: `Campingprocedurer som \u201dpak rygsaek, sl\u00e5 telt op, t\u00e6nd b\u00e5l\u201d giver meningsfuld sekvenstraning` },
      { milestone: `Funktionel t\u00e6lling og sortering (t\u00e6lling med et praktisk form\u00e5l)`, howWeAddress: `Pakkeliste-aktiviteter, der kr\u00e6ver t\u00e6lling og tjek af udstyr, giver matematik i en autentisk kontekst` },
      { milestone: `Begyndende kortl\u00e6sning og rumlig orientering`, howWeAddress: `Enkle skattekort og stifinder-labyrinter introducerer rumlige begreber og retningsangivelser` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, forenkles campingscenerne til telt, b\u00e5l og rygsaek, t\u00e6lling holdes inden for 10, og instruktioner gives \u00e9t trin ad gangen. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes kortl\u00e6sning, flertrinsmatematik og campingdagbogsskrivning med hele s\u00e6tninger.`,
    parentTakeaway: `Tag p\u00e5 minicamp i haven eller parken. Lad barnet hj\u00e6lpe med at pakke: t\u00e6l tallerkener, kopper og gafler til alle. T\u00e6l stjerner ved b\u00e5let. Lav en tjekliste sammen og lad barnet afkrydse. Campingoplevelser skaber minder og l\u00e6ring p\u00e5 \u00e9n gang.`,
    classroomIntegration: `Campingtemaet bruges som en udend\u00f8rstemauge i b\u00f8rnehaveklassen: matematiktimen holder udend\u00f8rs med t\u00e6lleark og pakkelister, naturfagstimen udforsker skoven, og danskundervisningen skriver campingdagbog. Et legetelt i klassen fungerer som l\u00e6sehjorne. F\u00e6lles M\u00e5ls m\u00e5l for natur, matematik og kommunikation integreres.`,
    assessmentRubric: [
      { skill: `T\u00e6lling og pakkelister`, emerging: `t\u00e6ller 5\u20138 campinggenstande med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 genstande og tjekker en pakkeliste korrekt`, advanced: `opretter selv en pakkeliste med tal og genstande for en tur` },
      { skill: `Sekvensering af campingprocedurer`, emerging: `ordner 2 trin (pak, sl\u00e5 telt op) med billedst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 3\u20134 campingtrin i korrekt r\u00e6kkef\u00f8lge`, advanced: `ordner 5+ trin og forklarer, hvorfor r\u00e6kkef\u00f8lgen er vigtig` },
      { skill: `Orientering og kortl\u00e6sning`, emerging: `f\u00f8lger en enkel sti p\u00e5 en labyrint med st\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt simple labyrinter og skattekort`, advanced: `tegner sit eget kort over campingpladsen med symboler` },
    ],
  },

  circus: {
    snippetAnswer: `Cirkus-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) bruger klovne, akrobater og jonglorer til t\u00e6lling, m\u00f8nstergenkendelse og begyndende regning. Cirkussets visuelle drama holder motivationen hoj. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Cirkustemaet engagerer b\u00f8rnehaveklasseb\u00f8rn p\u00e5 et nyt niveau, fordi fem- og seks\u00e5rige kan forst\u00e5 sekvenser, m\u00f8nstre og r\u00e6kkef\u00f8lge \u2014 f\u00e6rdigheder der matcher cirkusshowets opbygning. Hvor f\u00f8rskoleb\u00f8rn nod de farverige billeder, analyserer b\u00f8rnehaveklasseb\u00f8rn m\u00f8nstre i jonglorboldenes farver, t\u00e6ller akrobater i pyramider med addition (3 i bunden plus 2 i midten plus 1 p\u00e5 toppen), og l\u00f8ser symmetriopgaver med klovneansigter. Cirkusordforr\u00e5d som akrobat, trapez og maneege introducerer avancerede ord i en sjov kontekst. F\u00e6lles M\u00e5ls m\u00e5l for m\u00f8nstre, tal og kreativ udfoldelse m\u00f8des i \u00e9t show.`,
    developmentalMilestones: [
      { milestone: `M\u00f8nstergenkendelse og -forl\u00e6ngelse (5\u20136-\u00e5rige kan forts\u00e6tte AB-, ABB- og ABC-m\u00f8nstre)`, howWeAddress: `Jonglorbold-m\u00f8nstre og akrobat-sekvenser tr\u00e6ner m\u00f8nstergenkendelse med visuelt tiltr\u00e6kkende elementer` },
      { milestone: `Addition med grupper (begyndende forst\u00e5else af sammens\u00e6tning)`, howWeAddress: `Akrobatpyramider og klovnegrupper giver naturlige additionsscener med konkret repr\u00e6sentation` },
      { milestone: `Ordforr\u00e5dsudvidelse med fagspecifikke ord`, howWeAddress: `Cirkusvokabular som trapez, maneege og jonglor introducerer avancerede ord, der motiverer l\u00e6sning` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, forenkles til simple AB-m\u00f8nstre med klovnefarver, t\u00e6lling holdes inden for 10 med store billeder, og ordforr\u00e5det begr\u00e6nses til velkendte ord (klovn, bold, hat). For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes ABC-m\u00f8nstre, flertrinsproblemer med akrobatgrupper og krydsord med cirkusord.`,
    parentTakeaway: `Bes\u00f8g et cirkus eller se et cirkusshow online og tal om, hvad I ser: t\u00e6l jonglorboldene, find m\u00f8nstre i kostumerne, og genstab en pyramide med krammedyr derhjemme. Lad barnet lave sit eget minicirkus med n\u00f8gleroller \u2014 det tr\u00e6ner b\u00e5de sekvensering, ordforr\u00e5d og kreativitet.`,
    classroomIntegration: `Cirkustemaet bruges som en kreativ temauge: matematiktimen arbejder med m\u00f8nster- og additionsark, dansktimen l\u00e6ser cirkushistorier og l\u00e6rer cirkusord, og kunsttimen designer klovnekostumer og cirkusplakater. Gymnastiksalen bliver til maneege. F\u00e6lles M\u00e5ls m\u00e5l for kreativitet, krop og matematik integreres.`,
    assessmentRubric: [
      { skill: `M\u00f8nstergenkendelse (cirkuskontekst)`, emerging: `gentager et simpelt AB-m\u00f8nster med st\u00f8tte (rod bold, bl\u00e5 bold...)`, proficient: `forts\u00e6tter selvst\u00e6ndigt AB- og ABB-m\u00f8nstre med jonglorelementer`, advanced: `opretter egne m\u00f8nstre med tre eller flere elementer og forklarer reglen` },
      { skill: `Addition med cirkusgrupper`, emerging: `l\u00f8ser 2+1 og 3+1 med billedst\u00f8tte (akrobater)`, proficient: `l\u00f8ser selvst\u00e6ndigt additionsopgaver inden for 10 med cirkusscener`, advanced: `l\u00f8ser flertrins addition (3+2+1) og formulerer egne cirkusproblemer` },
      { skill: `Cirkusordforr\u00e5d og l\u00e6sning`, emerging: `genkender 2\u20133 cirkusord med billedst\u00f8tte (klovn, bold)`, proficient: `l\u00e6ser selvst\u00e6ndigt 5\u20136 cirkusord og bruger dem i s\u00e6tninger`, advanced: `l\u00e6ser og skriver 8+ cirkusord og forklarer deres betydning` },
    ],
  },

  clothing: {
    snippetAnswer: `T\u00f8j-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner sortering, t\u00e6lling og begyndende l\u00e6sning med dagligdags t\u00f8jemner. B\u00f8rn klassificerer efter \u00e5rstid, funktion og materiale. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `T\u00f8jtemaet f\u00e5r ny dybde i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kl\u00e6der sig selv p\u00e5 og forventes at v\u00e6lge passende t\u00f8j til vejret \u2014 en daglig beslutning, der kr\u00e6ver klassifikation og logisk t\u00e6nkning. Hvor f\u00f8rskoleb\u00f8rn matchede t\u00f8j med farver, sorterer b\u00f8rnehaveklasseb\u00f8rn efter funktion (\u00e5rstid, indend\u00f8rs/udend\u00f8rs) og materiale. T\u00e6lling af t\u00f8jemner i en garderobe giver funktionel matematik. Skrivning af t\u00f8jord (sko, hat, jakke) tr\u00e6ner l\u00e6sefundamentet med hverdagsord. Prisskilte p\u00e5 t\u00f8j introducerer penge og tal i kontekst. F\u00e6lles M\u00e5ls m\u00e5l for selvst\u00e6ndighed og hverdagsforst\u00e5else underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Selvst\u00e6ndig p\u00e5kl\u00e6dning og valg (5\u20136-\u00e5rige vaulger t\u00f8j baseret p\u00e5 vejr og aktivitet)`, howWeAddress: `Vejr-t\u00f8j-matchningsark opbygger logisk t\u00e6nkning med daglige beslutninger som udgangspunkt` },
      { milestone: `Klassifikation efter flere kriterier (\u00e5rstid + funktion)`, howWeAddress: `Sorteringsark der grupperer t\u00f8j efter b\u00e5de \u00e5rstid og type udfordrer todimensionel t\u00e6nkning` },
      { milestone: `Hverdagsord og begyndende l\u00e6sning (t\u00f8jord er blandt de f\u00f8rste l\u00e6seord)`, howWeAddress: `Ord-billede-matchning og ordsporing med t\u00f8jord giver l\u00e6setr\u00e6ning med personligt relevante ord` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til 5\u20136 basale t\u00f8jemner (bukser, troje, sko), brug barnets eget t\u00f8j som supplement, og sorter kun efter \u00e9n egenskab ad gangen. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes prisskilte med addition, garderobeinventar med t\u00e6lling over 20, og selvst\u00e6ndig skrivning af t\u00f8jlister.`,
    parentTakeaway: `G\u00f8r morgenkl\u00e6dningen til et l\u00e6ringsritual: \u201dHvilket t\u00f8j passer til vejret i dag?\u201d T\u00e6l sokker, n\u00e5r de l\u00e6gges sammen (parvis = tidlig multiplikation!). Lad barnet sortere vasketoj efter farve eller person. Hvert t\u00f8jemne er et l\u00e6seord \u2014 l\u00e6s etiketter sammen.`,
    classroomIntegration: `T\u00f8jtemaet integreres i b\u00f8rnehaveklassens hverdagsrutiner: garderobesituationen bruges til t\u00e6lling og navngivning, temaugen om \u00e5rstider inkluderer t\u00f8jsortering, og en butikleg med t\u00f8j og prisskilte forbinder matematik med rollespil. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling, matematik og kommunikation underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `T\u00f8jklassifikation`, emerging: `sorterer t\u00f8j i to grupper efter \u00e9n egenskab (sommer/vinter) med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt efter to egenskaber (\u00e5rstid og type) og forklarer valget`, advanced: `opretter egne sorteringskriterier og l\u00f8ser vejr-t\u00f8j-matchning fejlfrit` },
      { skill: `T\u00f8jordforr\u00e5d og l\u00e6sning`, emerging: `genkender 3\u20134 t\u00f8jord med billedst\u00f8tte`, proficient: `l\u00e6ser selvst\u00e6ndigt 8\u201310 t\u00f8jord og matcher dem med billeder`, advanced: `l\u00e6ser og skriver 12+ t\u00f8jord og bruger dem i korte s\u00e6tninger` },
      { skill: `T\u00e6lling og matematik med t\u00f8j`, emerging: `t\u00e6ller 5\u20138 t\u00f8jemner med st\u00f8tte`, proficient: `t\u00e6ller selvst\u00e6ndigt op til 20 og l\u00f8ser additionsopgaver med t\u00f8jpriser`, advanced: `l\u00f8ser flertrinsproblemer (3 bojer + 4 bukser = hvor mange t\u00f8jemner?)` },
    ],
  },

  colors: {
    snippetAnswer: `Farve-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner farveblanding, m\u00f8nstre med farver, t\u00e6lling efter farvegrupper og begyndende skrivning af farveord. Farverne bruges som sorteringsv\u00e6rkt\u00f8j. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Farvetemaet tager et kvantespring i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige g\u00e5r fra at kende farver til at bruge dem analytisk \u2014 farveblandingslogik (rod + gul = orange), m\u00f8nstergenkendelse med farvesekvenser og sortering af data efter farvegrupper. Hvor f\u00f8rskoleb\u00f8rn navngav basisfarver, l\u00e6rer b\u00f8rnehaveklasseb\u00f8rn nuancer (lys bl\u00e5, mork gron) og skriver farveord selvst\u00e6ndigt. Farvediagrammer med t\u00e6lling (\u201dhvor mange rode biler?\u201d) introducerer dataopsamling. F\u00e6lles M\u00e5ls m\u00e5l for m\u00f8nstre, kreativitet og begyndende dataforst\u00e5else underst\u00f8ttes.`,
    developmentalMilestones: [
      { milestone: `Farveblanding og logisk t\u00e6nkning (5\u20136-\u00e5rige forst\u00e5r \u00e5rsag-virkning i farveblandinger)`, howWeAddress: `Farveblandingsark der viser rod+gul=orange opbygger logisk forudsigelse og eksperimentel t\u00e6nkning` },
      { milestone: `M\u00f8nstergenkendelse med farver (forts\u00e6ttelse af farvem\u00f8nstre)`, howWeAddress: `Farvem\u00f8nster-forl\u00e6ngelsesark med AB, ABB og ABC-sekvenser tr\u00e6ner m\u00f8nstret\u00e6nkning visuelt` },
      { milestone: `Dataopsamling og kategorisering (t\u00e6lling i farvegrupper)`, howWeAddress: `T\u00e6l-og-sorter-ark, der beder b\u00f8rn om at t\u00e6lle genstande efter farve og registrere resultatet, introducerer datalogik` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, hold fokus p\u00e5 de seks basisfarver, brug AB-m\u00f8nstre alene, og tilbyd farvekort som fysisk reference. For avancerede b\u00f8rnehaveklasseb\u00f8rn introduceres farveblandingseksperimenter, ABC-m\u00f8nstre med nuancer, og skrivning af farves\u00e6tninger (\u201dHimlen er bl\u00e5\u201d).`,
    parentTakeaway: `Farver er overalt \u2014 brug dem aktivt. Sorter M&Ms efter farve og t\u00e6l hver gruppe. Bland vandfarver og g\u00e6t, hvilken farve der opst\u00e5r. Find m\u00f8nstre i t\u00f8jet: stribet tr\u00f8je = farvem\u00f8nster! Skriv farveord p\u00e5 farvede post-its og kl\u00e6b dem p\u00e5 matchende genstande.`,
    classroomIntegration: `Farvetemaet integreres i hele b\u00f8rnehaveklassens hverdag: matematiktimen bruger farvediagrammer og m\u00f8nster\u00f8velser, kunsttimen eksperimenterer med farveblanding, dansktimen skriver farveord, og naturvidenskab udforsker farver i naturen. F\u00e6lles M\u00e5ls m\u00e5l for m\u00f8nstre, kreativitet og kommunikation integreres.`,
    assessmentRubric: [
      { skill: `Farveblandingslogik`, emerging: `genkender resultatet af \u00e9n blanding (rod+gul) med st\u00f8tte`, proficient: `forudsiger selvst\u00e6ndigt resultatet af tre prim\u00e6rblandinger korrekt`, advanced: `forudsiger sekund\u00e6rblandinger og forklarer blandingslogikken mundtligt` },
      { skill: `Farvem\u00f8nstre`, emerging: `gentager et simpelt AB-m\u00f8nster med voksenst\u00f8tte`, proficient: `forts\u00e6tter selvst\u00e6ndigt AB- og ABB-m\u00f8nstre korrekt`, advanced: `forts\u00e6tter ABC-m\u00f8nstre og opretter egne komplekse farvem\u00f8nstre` },
      { skill: `Farvebaseret dataopsamling`, emerging: `t\u00e6ller genstande i 2 farvegrupper med st\u00f8tte`, proficient: `sorterer selvst\u00e6ndigt i 4\u20135 farvegrupper og registrerer tallene korrekt`, advanced: `opretter egne farvediagrammer og sammenligner grupper (flest/f\u00e6rrest)` },
    ],
  },

  construction: {
    snippetAnswer: `Byggeri-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner geometriske former, m\u00e5ling, t\u00e6lling og begyndende regning med kraner, lastbiler og byggerier. Rumlig t\u00e6nkning styrkes konkret. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Byggetemaet rammer b\u00f8rnehaveklassen perfekt, fordi fem- og seks\u00e5rige kan planl\u00e6gge, f\u00f8lge tegninger og bygge efter model \u2014 f\u00e6rdigheder der kr\u00e6ver den rumlige t\u00e6nkning og sekvensering, som netop udvikles i denne alder. Hvor f\u00f8rskoleb\u00f8rn stablede klodser frit, folger b\u00f8rnehaveklasseb\u00f8rn byggeplaner og t\u00e6ller materialer. Geometriske former i byggerier (firkantede vinduer, trekantede tage) g\u00f8r formgenkendelse funktionel. M\u00e5ling med uformelle enheder (klodsbredder) introducerer m\u00e5lekoncepter. Addition af byggematerialer (4 mursten plus 3 mursten) er naturligt indlejret. F\u00e6lles M\u00e5ls m\u00e5l for geometri og problemlosning m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Rumlig t\u00e6nkning og konstruktion (5\u20136-\u00e5rige kan bygge efter en plan eller tegning)`, howWeAddress: `Byg-efter-model-ark og symmetriske bygningspuslespil udvikler rumlig visualisering og planligning` },
      { milestone: `Formgenkendelse i kontekst (geometriske former i virkelige strukturer)`, howWeAddress: `Find-formen-i-byggeriet-ark forbinder abstrakte geometriformer med konkrete bygningselementer` },
      { milestone: `Begyndende m\u00e5ling (uformelle m\u00e5leenheder)`, howWeAddress: `M\u00e5leaktiviteter med klodsbredder og h\u00e5ndlangder introducerer m\u00e5lekoncepter uden lineal` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til tre grundformer (firkant, trekant, cirkel), brug konkrete byggeklodser som supplement, og hold t\u00e6llingen inden for 10. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes byggetegninger med m\u00e5l, flertrins additionsopgaver med materialer, og design af egne bygninger.`,
    parentTakeaway: `Byg med LEGO, klodser eller papkasser og tal om former: \u201dHvilken form har vinduet? Taget?\u201d T\u00e6l klodserne i et t\u00e5rn. M\u00e5l bordet med barnets h\u00e5ndflader. G\u00e5 forbi en byggeplads og observer maskiner og materialer. Hver byggeleg er geometri i praksis.`,
    classroomIntegration: `Byggetemaet forbinder b\u00f8rnehaveklassens matematikundervisning med praktisk leg: i byggehj\u00f8rnet folges konstruktionsark, i matematiktimen arbejdes med form- og t\u00e6lleark, og i udeomr\u00e5det bygges med naturmaterialer. Et klasseprojekt om at bygge en modelby integrerer alle fag. F\u00e6lles M\u00e5ls m\u00e5l for geometri, t\u00e6lling og samarbejde m\u00f8des.`,
    assessmentRubric: [
      { skill: `Formgenkendelse i byggerier`, emerging: `identificerer firkant og trekant i bygningsbilleder med st\u00f8tte`, proficient: `finder selvst\u00e6ndigt 4\u20135 geometriske former i byggerier og navngiver dem`, advanced: `beskriver forme med sider og hjorner og finder dem i komplekse bygninger` },
      { skill: `M\u00e5ling med uformelle enheder`, emerging: `m\u00e5ler med klodsbredder med voksenst\u00f8tte (3\u20134 enheder)`, proficient: `m\u00e5ler selvst\u00e6ndigt genstande med klodsbredder og noterer resultatet`, advanced: `sammenligner m\u00e5l (bordet er 8 klodser, stolen er 4 \u2014 bordet er dobbelt s\u00e5 langt)` },
      { skill: `Addition med byggematerialer`, emerging: `l\u00f8ser 2+3 med konkrete klodser foran sig`, proficient: `l\u00f8ser selvst\u00e6ndigt additionsopgaver inden for 10 med byggematerialebilleder`, advanced: `l\u00f8ser flertrins opgaver (4 mursten + 3 mursten + 2 mursten) mentalt` },
    ],
  },

  cooking: {
    snippetAnswer: `Madlavnings-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner m\u00e5ling, t\u00e6lling af ingredienser, sekvensering af opskriftstrin og begyndende l\u00e6sning af opskrifter. Konkret matematik i k\u00f8kkenet. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Madlavningstemaet blomstrer i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan folge flertrinsinstruktioner, m\u00e5le ingredienser og begynde at l\u00e6se enkle opskrifter \u2014 en kombination af f\u00e6rdigheder, der gor k\u00f8kkenet til et rigtigt l\u00e6ringsvaerksted. Hvor f\u00f8rskoleb\u00f8rn rorte og smagte, forstaar b\u00f8rnehaveklasseb\u00f8rn m\u00e5leenheder (en kop mel, to deciliter malk), sekvensering (forst \u00e6g, s\u00e5 mel, til sidst sukker) og grundlaeggende br\u00f8kbegreber (en halv banan). T\u00e6lling af ingredienser og portioner giver funktionel matematik. Opskriftlaesning introducerer proceduretekst. F\u00e6lles M\u00e5ls m\u00e5l for praktisk matematik og l\u00e6sning m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `M\u00e5leforst\u00e5else (5\u20136-\u00e5rige begynder at forst\u00e5 m\u00e5leenheder)`, howWeAddress: `Opskriftaktiviteter med kopper og skeer som m\u00e5leenheder g\u00f8r m\u00e5ling konkret og meningsfuld` },
      { milestone: `Sekvensering af flertrinsprocedurer (3\u20135 trin i r\u00e6kkef\u00f8lge)`, howWeAddress: `Trin-for-trin opskriftsark, der kr\u00e6ver korrekt r\u00e6kkef\u00f8lge, tr\u00e6ner sekvenseringsevnen med autentisk indhold` },
      { milestone: `Begyndende br\u00f8kforst\u00e5else (halv, kvart med mad)`, howWeAddress: `Delings\u00f8velser med pizza, kage og frugt introducerer br\u00f8kbegreber i en velkende kontekst` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, forenkles opskrifter til 2\u20133 trin med store billeder, t\u00e6lling holdes inden for 10, og m\u00e5ling bruger kun hele enheder (1 kop, 2 skeer). For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes opskrifter med 5+ trin, halvering og fordobling af ingredienser, og selvst\u00e6ndig opskriftskrivning.`,
    parentTakeaway: `Bag sammen mindst \u00e9n gang om ugen. Lad barnet m\u00e5le ingredienser: \u201dtwo kopper mel, tre \u00e6g.\u201d T\u00e6l portioner sammen. L\u00e6s opskriften h\u00f8jt og lad barnet folge trinene. Del en pizza i halvdele og fjerdedele. K\u00f8kkenet er det mest naturlige matematik- og l\u00e6selokale i hjemmet.`,
    classroomIntegration: `Madlavningstemaet integreres i b\u00f8rnehaveklassens praktisk-musiske timer: bagning med opskriftsark, matematiktime med m\u00e5lings- og t\u00e6lle\u00f8velser, dansktime med opskriftl\u00e6sning og -skrivning. Et klassek\u00f8kken med ugentlige bageaktiviteter forbinder alle fag. F\u00e6lles M\u00e5ls m\u00e5l for matematik, l\u00e6sning og praktiske f\u00e6rdigheder m\u00f8des.`,
    assessmentRubric: [
      { skill: `M\u00e5ling med k\u00f8kkenenheder`, emerging: `m\u00e5ler med \u00e9n enhed (kop) med voksenst\u00f8tte og sp\u00f8rger om r\u00e6kkef\u00f8lge`, proficient: `m\u00e5ler selvst\u00e6ndigt med kopper og skeer og folger m\u00e5leangivelser korrekt`, advanced: `forst\u00e5r halvering/fordobling og v\u00e6lger korrekt m\u00e5levaerkt\u00f8j selvst\u00e6ndigt` },
      { skill: `Opskriftsekvensering`, emerging: `ordner 2\u20133 opskrifttrin med billedst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 4\u20135 trin i korrekt r\u00e6kkef\u00f8lge`, advanced: `folger en hel opskrift selv og forklarer, hvorfor r\u00e6kkef\u00f8lgen er vigtig` },
      { skill: `Grundl\u00e6ggende br\u00f8kforst\u00e5else`, emerging: `genkender halvdele med konkrete genstande (halv pizza) med st\u00f8tte`, proficient: `identificerer selvst\u00e6ndigt halvdele og fjerdedele i madkontekst`, advanced: `deler genstande i tredjedele og sammenligner storrelser (halvdel > fjerdedel)` },
    ],
  },

  dinosaurs: {
    snippetAnswer: `Dinosaur-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, stoerrelses-sammenligning, tidslinjeforst\u00e5else og begyndende l\u00e6sning med T-rex, triceratops og brachiosaurus. Fascinationen driver l\u00e6ringen. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Dinosaurtemaet eksploderer i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige er i den klassiske \u201ddinosaurintense interesse\u201d-fase \u2014 de kan huske komplekse navne, sammenligne stoorrelser og begynde at forst\u00e5 tid som koncept. Denne dybe fascination er en st\u00e6rkere l\u00e6ringsmotor end noget andet. Dinosaurnavne tr\u00e6ner fonemisk bevidsthed med lange, flerstabelsesord (ty-ran-no-saur-us). Storrelsessammenligning (brachiosaurus vs. compsognathus) introducerer m\u00e5le- og sammenligningsbegreber. Tidslinjer med dinosaurperioder giver tidlig historisk taenkning. Addition med dinosaurflokke er naturligt motiverende. F\u00e6lles M\u00e5ls m\u00e5l for natur, matematik og sproglighed m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Storrelsessammenligning og ordning (5\u20136-\u00e5rige kan ordne tre eller flere genstande efter storrelse)`, howWeAddress: `Dinosaur-storrelsesark, der beder b\u00f8rn ordne dinosaurer fra mindst til storst, tr\u00e6ner seriering` },
      { milestone: `Tidslig forst\u00e5else (forst, s\u00e5, til sidst \u2014 begyndende kronologi)`, howWeAddress: `Enkle dinosaur-tidslinjer introducerer begrebet \u201dlang tid siden\u201d og historisk sekvensering` },
      { milestone: `Avanceret ordforr\u00e5d (lange, fagordsspecifikke navne)`, howWeAddress: `Dinosaurnavne med 3\u20135 stavelser giver fonemisk segmenteringstraening med ord, b\u00f8rn elsker at sige` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til 3\u20134 velkendte dinosaurer (T-rex, triceratops, brontosaurus), hold t\u00e6lling inden for 10, og brug stoore billeder med tydelige detaljer. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes dinosaur-krydsord, selvstaendig skrivning af dinosaurfakta og flertrinsproblemer med dinosaurflokke.`,
    parentTakeaway: `F\u00f8lg barnets dinosaurinteresse \u2014 det er en l\u00e6ringsguldgrube. Bes\u00f8g naturhistorisk museum, l\u00e6s dinosaurb\u00f8ger og lad barnet stave dinosaurnavne (god fonemisk traening!). Sammenlign leget\u00f8jsdinosaurer efter storrelse. T\u00e6l fossiler i en bog. Denne intense interesse driver l\u00e6ring p\u00e5 tvaers af alle fag.`,
    classroomIntegration: `Dinosaurtemaet er en af b\u00f8rnehaveklassens mest populaere temauger: matematiktimen bruger dinosaurst\u00f8rrelses- og t\u00e6lleark, dansktimen staver dinosaurnavne og skriver faktas\u00e6tninger, naturfagstimen udforsker fossiler og tidslinjer, og kunsttimen tegner og modellerer dinosaurer. F\u00e6lles M\u00e5ls m\u00e5l for natur, matematik og sproglig bevidsthed integreres.`,
    assessmentRubric: [
      { skill: `Stoorrelsessammenligning og seriering`, emerging: `sammenligner to dinosaurer (storre/mindre) med billedst\u00f8tte`, proficient: `ordner selvstaendigt 3\u20134 dinosaurer fra mindst til storst`, advanced: `ordner 5+ dinosaurer og bruger maaleord som laengere, kortere, tungere` },
      { skill: `T\u00e6lling og regning med dinosaurer`, emerging: `taeller 1\u201310 dinosaurer med \u00e9n-til-\u00e9n pegen`, proficient: `taeller til 20 og loser additions-/subtraktionsopgaver inden for 10 med dinosaurbilleder`, advanced: `loser mentalt og formulerer egne dinosaurproblemer for klassekammerater` },
      { skill: `Dinosaurordforr\u00e5d og stavning`, emerging: `genkender 2\u20133 dinosaurnavne med billedst\u00f8tte`, proficient: `laeser og staver 4\u20135 dinosaurnavne selvstaendigt`, advanced: `staver 6+ navne, segmenterer dem i stavelser og skriver dinosaurfakta` },
    ],
  },

  easter: {
    snippetAnswer: `P\u00e5ske-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner addition inden for 10, m\u00f8nstergenkendelse og begyndende skrivning med \u00e6g, harer og kyllinger. P\u00e5skens fejring g\u00f8r matematik festlig. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `P\u00e5sketemaet passer perfekt til b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan deltage aktivt i p\u00e5skens traditioner med faglige f\u00e6rdigheder \u2014 de t\u00e6ller \u00e6g under \u00e6ggejagten, deler slik ligeligt mellem venner og skriver p\u00e5skekort. Denne aktive deltagelse g\u00f8r matematik og l\u00e6sning til en naturlig del af fejringen. M\u00f8nstergenkendelse med dekorerede \u00e6g (farvem\u00f8nstre, m\u00f8nstre p\u00e5 skallen) tr\u00e6ner algebraisk t\u00e6nkning. Addition/subtraktion med fundne \u00e6g (\u201ddu fandt 5, din ven fandt 3 \u2014 hvor mange tilsammen?\u201d) er naturligt motiverende. F\u00e6lles M\u00e5ls m\u00e5l for tal, m\u00f8nstre og kulturel identitet m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Addition inden for 10 (5\u20136-\u00e5rige mestrer begyndende sammenligning)`, howWeAddress: `\u00c6ggejagtscenarier med \u201djeg fandt 4, du fandt 3 \u2014 hvor mange tilsammen?\u201d g\u00f8r addition konkret og personlig` },
      { milestone: `M\u00f8nstergenkendelse og -design (avancerede m\u00f8nstre med 3+ elementer)`, howWeAddress: `\u00c6gdekorationsark med farvem\u00f8nstre, der skal forts\u00e6ttes eller designes, tr\u00e6ner m\u00f8nstert\u00e6nkning kreativt` },
      { milestone: `Festlig skrivning (kort og beskeder med form\u00e5l)`, howWeAddress: `P\u00e5skekort- og \u00f8nskeskrivning giver autentisk skrivetr\u00e6ning med personlig motivation` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, hold t\u00e6lling inden for 5, brug simple AB-m\u00f8nstre, og tilbyd skriveskabeloner med prikkede ord. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes subtraktion, komplekse m\u00f8nstre med fire elementer, og selvst\u00e6ndig skrivning af p\u00e5skehistorier.`,
    parentTakeaway: `G\u00f8r p\u00e5sken til en l\u00e6ringsfest. Lad barnet t\u00e6lle og sortere \u00e6g efter farve under \u00e6ggejagten. Dekorer \u00e6g med m\u00f8nstre og tal om farvefolgen. Del p\u00e5skeslik ligeligt og t\u00e6l. Skriv p\u00e5skekort til bedstefor\u00e6ldre \u2014 funktionel skrivning p\u00e5 sit bedste.`,
    classroomIntegration: `P\u00e5sketemaet bruges som en for\u00e5rstemauge: matematiktimen arbejder med additions- og m\u00f8nsterark, dansktimen skriver p\u00e5skekort og l\u00e6ser p\u00e5skehistorier, kunsttimen dekorerer \u00e6g med m\u00f8nstre, og udend\u00f8rs arrangeres en \u00e6ggejagt med t\u00e6lleopgaver. F\u00e6lles M\u00e5ls m\u00e5l for matematik, kreativitet og kultur integreres i fejringen.`,
    assessmentRubric: [
      { skill: `Addition med p\u00e5sketema`, emerging: `l\u00f8ser additionsopgaver inden for 5 med \u00e6ggebilleder og voksenst\u00f8tte`, proficient: `l\u00f8ser selvst\u00e6ndigt additionsopgaver inden for 10 med p\u00e5skescener`, advanced: `l\u00f8ser additions- og subtraktionsopgaver og formulerer egne \u00e6ggeproblemer` },
      { skill: `P\u00e5ske-m\u00f8nstergenkendelse`, emerging: `gentager AB-m\u00f8nstre p\u00e5 \u00e6g med st\u00f8tte`, proficient: `forts\u00e6tter selvst\u00e6ndigt ABB- og ABC-m\u00f8nstre p\u00e5 dekorerede \u00e6g`, advanced: `designer egne komplekse m\u00f8nstre og forklarer reglen bag dem` },
      { skill: `P\u00e5skeskrivning`, emerging: `kopierer enkle p\u00e5skeord fra model (p\u00e5ske, \u00e6g, hare)`, proficient: `skriver selvst\u00e6ndigt korte p\u00e5skebeskeder og kort`, advanced: `skriver flere s\u00e6tninger med p\u00e5skeindhold og egne illustrationer` },
    ],
  },

  emotions: {
    snippetAnswer: `F\u00f8lelses-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner f\u00f8lelsesregulering, empati, konfliktl\u00f8sning og begyndende l\u00e6sning/skrivning af f\u00f8lelsesord. B\u00f8rn l\u00e6rer at navngive og h\u00e5ndtere f\u00f8lelser. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `F\u00f8lelsestemaet er afgorende i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige befinder sig i den store sociale overgang \u2014 de er nu en del af et stort klassefaellesskab og skal navigere venskaber, konflikter og gruppesamarbejde dagligt. Hvor forskoleb\u00f8rn l\u00e6rte at genkende basale f\u00f8lelser (glad, sur, ked af det), l\u00e6rer b\u00f8rnehaveklasseb\u00f8rn nuancerede f\u00f8lelsesord (frustreret, nervos, stolt, jaloux), reguleringsstrategier (dyb vejrtraekning, taelle til ti) og empati (hvordan mon din ven har det?). Skrivning af f\u00f8lelsessaetninger giver sprog til indre oplevelser. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling og social kompetence underst\u00f8ttes direkte.`,
    developmentalMilestones: [
      { milestone: `F\u00f8lelsesregulering (5\u20136-\u00e5rige udvikler strategier til at haandtere staerke f\u00f8lelser)`, howWeAddress: `Strategikort med \u201dn\u00e5r jeg er sur, kan jeg...\u201d-scenarier giver konkrete vaerkt\u00f8jer til regulering` },
      { milestone: `Empati og perspektivtagning (forst\u00e5else af andres f\u00f8lelser)`, howWeAddress: `Scenarie-ark der sporger \u201dhvordan f\u00f8ler personen sig, og hvad kan du gore?\u201d opbygger social forst\u00e5else` },
      { milestone: `Nuanceret f\u00f8lelsesordforr\u00e5d (ud over glad/sur/ked af det)`, howWeAddress: `F\u00f8lelsesord-matchning og -skrivning introducerer ord som frustreret, nervos, stolt og skuffet` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til 4\u20135 basale f\u00f8lelser med tydelige ansigtsbilleder, brug rolleleg som supplement, og tilbyd forenklede strategikort. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes nuancerede f\u00f8lelser (skamfuld, taknemmelig, overrasket), skrivning af f\u00f8lelsesdagbog, og konfliktlosningsscenarier.`,
    parentTakeaway: `Navngiv f\u00f8lelser i hverdagen: \u201dJeg kan se, du er frustreret\u201d er vigtigere end \u201dhold op med at graede.\u201d Del dine egne f\u00f8lelser: \u201dJeg blev lidt nervos i dag.\u201d Laes boger om f\u00f8lelser og tal om karakterernes oplevelser. Hvert f\u00f8lelsessamtale opbygger den emotionelle intelligens, der er afgorende for b\u00f8rnehaveklassens sociale liv.`,
    classroomIntegration: `F\u00f8lelsestemaet integreres i b\u00f8rnehaveklassens daglige rutiner: morgensamlingen starter med \u201dhvordan har du det i dag?\u201d-tavle, konflikter l\u00f8ses med strategikort, dansktimen laeser f\u00f8lelsesboger, og klassemodet bruger f\u00f8lelsesordforr\u00e5d aktivt. F\u00e6lles M\u00e5ls m\u00e5l for personlig udvikling og sociale kompetencer underst\u00f8ttes hele \u00e5ret.`,
    assessmentRubric: [
      { skill: `F\u00f8lelsesordforr\u00e5d`, emerging: `navngiver 3\u20134 basale f\u00f8lelser (glad, sur, ked af det, bange) med billedst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 8\u201310 f\u00f8lelser og bruger dem i kontekst`, advanced: `bruger nuancerede f\u00f8lelsesord (frustreret, taknemmelig, nervos) og forklarer forskelle` },
      { skill: `F\u00f8lelsesregulering`, emerging: `genkender, n\u00e5r en f\u00f8lelse er staerk, med voksenst\u00f8tte`, proficient: `vaelger selvst\u00e6ndigt en passende strategi (dyb vejrtraekning, taelle, g\u00e5 vaek)`, advanced: `anvender strategier proaktivt og hjaalper andre med regulering` },
      { skill: `Empati og perspektivtagning`, emerging: `genkender basale f\u00f8lelser hos andre med billedst\u00f8tte`, proficient: `forklarer, hvordan en person i et scenarie f\u00f8ler sig, og foresl\u00e5r en reaktion`, advanced: `taenger flere perspektiver i en konflikt og foresl\u00e5r l\u00f8sninger for alle parter` },
    ],
  },

  'fairy-tales': {
    snippetAnswer: `Eventyr-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner narrativ forst\u00e5else, sekvensering af handlingsforlob, ordforr\u00e5d og begyndende l\u00e6sning med klassiske eventyr. B\u00f8rn laerer at genfortaelle og skrive. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Eventyrtemaet f\u00e5r en afgaesende faglig dimension i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige for forste gang kan forst\u00e5 narrative strukturer \u2014 begyndelse, midte og slutning \u2014 og genfortaelle historier i logisk raekkefolge. Hvor forskoleb\u00f8rn lyttede til eventyr, analyserer b\u00f8rnehaveklasseb\u00f8rn dem: hvem er hovedpersonen, hvad er problemet, og hvordan l\u00f8ses det? Eventyrord (trold, prinsesse, slot, skov) udvider ordforr\u00e5det. Sekvensering af eventyrhandlinger i 4\u20136 trin tr\u00e6ner kronologisk taenkning. Skrivning af egne eventyrslutninger introducerer kreativ skrivning. F\u00e6lles M\u00e5ls m\u00e5l for laesning, narrativ kompetence og kreativitet m\u00f8des.`,
    developmentalMilestones: [
      { milestone: `Narrativ forst\u00e5else (5\u20136-\u00e5rige forst\u00e5r historiers struktur: begyndelse, midte, slutning)`, howWeAddress: `Eventyr-sekvenserings\u00f8velser i 4\u20136 trin opbygger forst\u00e5elsen af narrative strukturer med velkendte historier` },
      { milestone: `Genfortaelling (evnen til at genffortaelle en historie i egen ord)`, howWeAddress: `Billedbaserede genffort\u00e6llingsark med n\u00f8glescener giver struktur til mundtlig og skriftlig genfortaelling` },
      { milestone: `Karakterforst\u00e5else (genkendelse af hovedperson, skurk og hjaelper)`, howWeAddress: `Karakter-matchningsark forbinder eventyrfigurer med deres roller og egenskaber` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, brug velkendte eventyr (De Tre Sm\u00e5 Grise, Rodh\u00e6tte) med 3\u20134 sekvensbilleder og enkel genffortaelling. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes ukendte eventyr, 6-trins sekvensering, kreativ skrivning af alternative slutninger og karakteranalyse.`,
    parentTakeaway: `Laes et eventyr hvert aften og stil sp\u00f8rgsm\u00e5l: \u201dhvem er den gode? Hvad var problemet? Hvad ville du have gjort?\u201d Lad barnet genffort\u00e6lle historien n\u00e6ste dag. Leg eventyret med dukker eller krammedyr. Eventyr opbygger den narrative t\u00e6nkning, der er grundlag for b\u00e5de laesning og skrivning.`,
    classroomIntegration: `Eventyrtemaet er en baerebjaelke i b\u00f8rnehaveklassens danskundervisning: ugentlige eventyrlaesninger med tilhorende sekvenserings- og ordforr\u00e5dsark, dramatisering i rollelegehj\u00f8rnet, kreativ skrivning af eventyrslutninger, og kunsttimen illustrerer n\u00f8glescener. F\u00e6lles M\u00e5ls m\u00e5l for laesning, skrivning og mundtlig fremstilling underst\u00f8ttes.`,
    assessmentRubric: [
      { skill: `Narrativ sekvensering`, emerging: `ordner 2\u20133 eventyrscener med billedst\u00f8tte`, proficient: `ordner selvst\u00e6ndigt 4\u20135 scener i korrekt raekkefolge og genffort\u00e6ller handlingen`, advanced: `ordner 6+ scener, identificerer begyndelse/midte/slutning og tilf\u00f8jer detaljer` },
      { skill: `Eventyrordforr\u00e5d`, emerging: `genkender 3\u20134 eventyrord (trold, prinsesse, slot) med billedst\u00f8tte`, proficient: `laeser og bruger 6\u20138 eventyrord selvst\u00e6ndigt i genffort\u00e6lling`, advanced: `bruger 10+ eventyrord i egne s\u00e6tninger og forklarer karakterernes roller` },
      { skill: `Kreativ fort\u00e6lling og skrivning`, emerging: `afslutter en saetning om et eventyr med voksenst\u00f8tte`, proficient: `skriver selvst\u00e6ndigt 2\u20133 saetninger som alternativ slutning p\u00e5 et eventyr`, advanced: `skriver en hel kort eventyrhistorie med begyndelse, problem og losning` },
    ],
  },

  farm: {
    snippetAnswer: `G\u00e5rd-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling til 20, addition/subtraktion med g\u00e5rddyr, og begyndende l\u00e6sning af dyrenavne. Landbrugets cyklus giver naturfaglig forst\u00e5else. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `G\u00e5rdtemaet udvides i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan forst\u00e5 produktion og cyklus \u2014 ko giver maelk, hoene laegger aeg, korn bliver til brod. Denne forst\u00e5else af \u00e5rsag-virkning er ny sammenlignet med forskolens simple navngivning af g\u00e5rddyr. T\u00e6lling af dyr i folde giver naturlig matematik op til 20. Addition/subtraktion (\u201d8 hoens minus 3 der lober vaek\u201d) er autentisk indlejret. G\u00e5rddyrs navne og produkter (ko/maelk, h\u00f8ne/aeg) tr\u00e6ner ordforr\u00e5d og sammensatte begreber. F\u00e6lles M\u00e5ls m\u00e5l for natur, matematik og begyndende l\u00e6sning m\u00f8des i \u00e9t tema.`,
    developmentalMilestones: [
      { milestone: `\u00c5rsag-virkning-forst\u00e5else (5\u20136-\u00e5rige forst\u00e5r produktionsk\u00e6der)`, howWeAddress: `Dyr-til-produkt-matchningsark (ko\u2192maelk, h\u00f8ne\u2192aeg) opbygger logisk t\u00e6nkning med konkrete sammenhange` },
      { milestone: `T\u00e6lling til 20 med grupper (t\u00e6lling af dyr i folde)`, howWeAddress: `G\u00e5rdscener med 10\u201320 dyr i folde, stalde og marker giver meningsfuld t\u00e6llingstraening` },
      { milestone: `Addition og subtraktion med g\u00e5rdkontekst`, howWeAddress: `Tekstopgaver som \u201d5 grise plus 4 grise i stalden\u201d g\u00f8r regning konkret og motiverende` },
    ],
    differentiationNotes: `For b\u00f8rn der har brug for st\u00f8tte, begr\u00e6ns til 4\u20135 velkendte g\u00e5rddyr (ko, gris, h\u00f8ne, hest), hold t\u00e6lling inden for 10, og brug konkrete dyrefigurer. For avancerede b\u00f8rnehaveklasseb\u00f8rn tilf\u00f8jes produktionsk\u00e6der med flere led, flertrinsproblemer og selvst\u00e6ndig skrivning af g\u00e5rdfakta.`,
    parentTakeaway: `Besoeg en bondeg\u00e5rd og t\u00e6l dyrene: \u201dhvor mange koer? Flere end grise?\u201d Tal om, hvor maden kommer fra \u2014 maelk fra koen, aeg fra h\u00f8nen. K\u00f8b aeg p\u00e5 en g\u00e5rdbutik og t\u00e6l dem. Plantning af froer i en urtepotte viser g\u00e5rdens cyklus i miniformat.`,
    classroomIntegration: `G\u00e5rdtemaet integreres i b\u00f8rnehaveklassens \u00e5rsplan: et g\u00e5rdbesog med forberedende arbejdsark, l\u00e6ringsstationer med t\u00e6lle- og sorterings\u00f8velser, matematiktimen med g\u00e5rdproblemer, og dansktimen laeser g\u00e5rdboger og skriver dyrenavne. En klasseurtehave viser plantevakst. F\u00e6lles M\u00e5ls m\u00e5l for natur, matematik og sproglighed m\u00f8des.`,
    assessmentRubric: [
      { skill: `G\u00e5rddyr og produkter`, emerging: `navngiver 3\u20134 g\u00e5rddyr med billedst\u00f8tte`, proficient: `navngiver selvst\u00e6ndigt 6\u20138 g\u00e5rddyr og matcher dem med deres produkter`, advanced: `forklarer produktionsk\u00e6der (ko\u2192maelk\u2192sm\u00f8r) og sammenligner g\u00e5rddyrs roller` },
      { skill: `T\u00e6lling og regning med g\u00e5rddyr`, emerging: `taeller 1\u201310 dyr i en fold med st\u00f8tte`, proficient: `taeller til 20 og loser additions-/subtraktionsopgaver inden for 10 med g\u00e5rdscener`, advanced: `loser flertrinsproblemer og formulerer egne g\u00e5rdmatematikopgaver` },
      { skill: `G\u00e5rdordforr\u00e5d og laesning`, emerging: `genkender 2\u20133 g\u00e5rdord med billedst\u00f8tte (ko, gris)`, proficient: `laeser selvst\u00e6ndigt 5\u20136 g\u00e5rdord og skriver dem i ordsogning`, advanced: `laeser korte g\u00e5rds\u00e6tninger og skriver selvst\u00e6ndigt g\u00e5rdfakta` },
    ],
  },

  flowers: {
    snippetAnswer: `Blomster-arbejdsark til b\u00f8rnehaveklassen (5\u20136 \u00e5r) tr\u00e6ner t\u00e6lling af kronblade, symmetri, m\u00f8nstergenkendelse og begyndende botanisk ordforr\u00e5d. Blomsternes skoonhed motiverer praecist arbejde. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Blomstertemaet udvikler sig fagligt i b\u00f8rnehaveklassen, fordi fem- og seks\u00e5rige kan observere blomster med videnskabeligt oje \u2014 taelle kronblade, sammenligne blade og forst\u00e5 vaekstprocessen fra fro til blomst. Hvor forskoleb\u00f8rn farvede blomster frit, analyserer b\u00f8rnehaveklasseb\u00f8rn deres symmetri (venstre og hojre halvdel er ens), taeller kronblade som matematikovjelse (tulipan: 6, rose: mange) og laerer blomsternavne som laesesord. Sekvensering af vaekstfaser giver naturvidenskabelig taenkning. F\u00e6lles M\u00e5ls m\u00e5l for natur, geometri og begyndende laesning modes.`,
    developmentalMilestones: [
      { milestone: `Symmetriforst\u00e5else (5\u20136-\u00e5rige genkender, at blomster har symmetriske dele)`, howWeAddress: `Blomster-symmetriark, der beder born fuldende den anden halvdel, traener rumlig taenkning og praecision` },
      { milestone: `Systematisk t\u00e6lling af dele (kronblade, blade, stilke)`, howWeAddress: `Kronblad-taelleark med blomster fra 3 til 12 kronblade giver t\u00e6lling i stigende svaerhedsgrad` },
      { milestone: `Vaekst-sekvensering (fro\u2192spire\u2192plante\u2192blomst)`, howWeAddress: `Livscyklus-sorteringsark med 4 vaekstfaser opbygger biologisk og kronologisk forst\u00e5else` },
    ],
    differentiationNotes: `For born der har brug for stotte, begraans til tre velkendte blomster (tulipan, solsikke, maalblomst), hold t\u00e6lling inden for 10, og brug prikkede symmetrilinjer. For avancerede borehaveklasseborn tilfojes blomsterarter med mange kronblade, selvstaendig skrivning af blomsterfakta og tvaerfaglige opgaver (kronblade + addition).`,
    parentTakeaway: `G\u00e5 p\u00e5 blomsterjagt i parken eller haven. Tael kronblade sammen og sammenlign: tulipan har 6, maalblomst har mange. Plant et fro og folg vaeksten med en tegning hver uge. Tork blomster og klistre dem p\u00e5 papir. Naturens skonhed er den perfekte motivation for praecis observation.`,
    classroomIntegration: `Blomstertemaet folger for\u00e5r og sommer i bornehaveklassens \u00e5rsplan: fr\u00f8plantning med observationsdagbog, matematiktimen taeller kronblade, naturfagstimen studerer vaekst, og kunsttimen laver blomsterbilleder med symmetri. En klasseblomsterhave forbinder alle fag. Faelles Maals maal for natur, matematik og kreativitet integreres.`,
    assessmentRubric: [
      { skill: `Blomster-symmetri`, emerging: `genkender, at en blomst har to ens sider med voksenst\u00f8tte`, proficient: `fuldforer selvstaendigt en symmetrisk blomst korrekt p\u00e5 et symmetriark`, advanced: `finder symmetri i flere blomster og andre naturlige former og forklarer begrebet` },
      { skill: `Kronblad-taelling`, emerging: `taeller 3\u20135 kronblade p\u00e5 enkle blomster med stotte`, proficient: `taeller selvstaendigt kronblade op til 12 og registrerer tallet korrekt`, advanced: `taeller, sammenligner og ordner blomster efter antal kronblade` },
      { skill: `Vaekst-sekvensering`, emerging: `ordner 2 vaekstfaser (fro, blomst) med billedstotte`, proficient: `ordner selvstaendigt 4 vaekstfaser korrekt`, advanced: `ordner faser, forklarer hvad der sker i hvert trin og tegner selv en vaekstsekvens` },
    ],
  },

  food: {
    snippetAnswer: `Mad-arbejdsark til bornehaveklassen (5\u20136 \u00e5r) traener t\u00e6lling, sortering efter naaringsgrupper, m\u00e5ling og begyndende l\u00e6sning af madord. Born laerer sund kost og matematik p\u00e5 \u00e9n gang. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Madtemaet modnes i bornehaveklassen, fordi fem- og seksaarige kan forst\u00e5 naaringsgrupper (frugt, grontsager, korn, protein), laese enkle madord og relatere mad til sundhed. Hvor forskolebbrn sorterede efter farve og smag, klassificerer bornehaveklasseborn efter funktion \u2014 hvad giver energi, hvad styrker knogler, hvad er godt for tnderne? T\u00e6lling af madvarer p\u00e5 en tallerken giver funktionel matematik. M\u00e5ling af ingredienser introducerer maaleenheder. Madord er blandt de foerste laesesord (brod, ost, aeble). Faelles Maals maal for sundhed, matematik og begyndende laesning modes.`,
    developmentalMilestones: [
      { milestone: `Klassifikation efter naaringsgrupper (5\u20136-\u00e5rige forst\u00e5r, at mad har forskellige roller)`, howWeAddress: `Tallerkensorteringsark, der beder born om at anbringe mad i de rigtige naaringsgrupper, opbygger sundhedsforst\u00e5else` },
      { milestone: `Funktionel t\u00e6lling og m\u00e5ling (t\u00e6lling med praktisk form\u00e5l)`, howWeAddress: `T\u00e6lling af madvarer p\u00e5 indkoebslister og m\u00e5ling af opskriftsingredienser giver matematik i autentisk kontekst` },
      { milestone: `Begyndende laesning af hverdagsord (madord som foerste laesesord)`, howWeAddress: `Madord-matchning og -sporing med ord som brod, malk, aeble traener l\u00e6sning med personligt relevante ord` },
    ],
    differentiationNotes: `For born der har brug for stotte, begraens til 5\u20136 velkendte madvarer, sorter efter to simple grupper (frugt/ikke-frugt), og brug billeder med tydelige farver. For avancerede bornehaveklasseborn tilfojes fem naaringsgrupper, opskriftlaesning med maaleenheder og selvstaendig skrivning af en madpakkeliste.`,
    parentTakeaway: `Inddrag barnet i madlavningen: tael grontsager, lees opskriften sammen, m\u00e5l ingredienser. G\u00e5 p\u00e5 indkoeb og lad barnet finde madvarer p\u00e5 listen. Tal om naaringsgrupper: \u201dGuleroodder er grontsager og giver gode oejne.\u201d Skriv en madplan for ugen sammen. Kokkenet er det bedste klasselokale.`,
    classroomIntegration: `Madtemaet integreres i bornehaveklassens sundhedsundervisning: en ugentlig sundhedslektion med sorterings- og taelleark, matematiktimen med indkoebsliste-problemer, dansktimen med madord-laesning, og praktisk bagning med opskriftsark. En klassemadpyramide p\u00e5 vaeggen forbinder daglig laering. Faelles Maals maal for sundhed, matematik og kommunikation modes.`,
    assessmentRubric: [
      { skill: `Madklassifikation (naaringsgrupper)`, emerging: `sorterer mad i 2 grupper (frugt/groent) med billedstotte`, proficient: `sorterer selvstaendigt i 4 naaringsgrupper og forklarer, hvorfor maden hoerer til`, advanced: `navngiver 5 naaringsgrupper, giver eksempler og forklarer madvarernes rolle for kroppen` },
      { skill: `T\u00e6lling og m\u00e5ling med mad`, emerging: `taeller 5\u20138 madvarer med stotte`, proficient: `taeller selvstaendigt op til 20 og maaler med kopper/skeer korrekt`, advanced: `loser additionsopgaver med madvarer og fordobler/halverer maaleenheder` },
      { skill: `Madord og begyndende laesning`, emerging: `genkender 3\u20134 madord med billedstotte (brod, aeble, malk)`, proficient: `laeser selvstaendigt 8\u201310 madord og matcher dem med billeder`, advanced: `laeser og skriver 12+ madord og bruger dem i korte saetninger` },
    ],
  },

  forest: {
    snippetAnswer: `Skov-arbejdsark til bornehaveklassen (5\u20136 \u00e5r) traener t\u00e6lling, klassifikation af planter og dyr, saesongforandringer og begyndende naturfaglig observation. Skoven er bornehaveklassens udendoersklasselokale. Gratis printbare PDF-arbejdsark p\u00e5 LessonCraftStudio.`,
    uniqueGradeAngle: `Skovtemaet er unik for bornehaveklassen, fordi fem- og seksaarige kan gennemfore strukturerede udendoorsaktiviteter \u2014 foelge stier, indsamle naturmaterialer systematisk og registrere observationer. Denne parathed til \u201dudeskole\u201d gor skoven til det perfekte laeringsrum. Klassifikation af skovens dyr (pattedyr, fugle, insekter) og planter (traeer, buske, blomster) giver naturvidenskabelig taenkning. T\u00e6lling af aarstidsforandringer (blade p\u00e5 et trae: sommer vs. efteraar) introducerer datasammenligning. Skovord (egetrae, raev, svamp) traener laesefundamentet. Faelles Maals maal for natur/teknik, matematik og udeskole modes direkte.`,
    developmentalMilestones: [
      { milestone: `Naturfaglig observation og registrering (5\u20136-\u00e5rige kan systematisk observere og notere)`, howWeAddress: `Skov-observationsark med afkrydsningslister for dyr, planter og vejr giver struktur til udendoers laering` },
      { milestone: `\u00c5rstidsforst\u00e5else (genkendelse af forandringer henover aaret)`, howWeAddress: `Aarstids-sammenligningsark med det samme trae i fire arstider opbygger forst\u00e5else af cyklisk forandring` },
      { milestone: `Klassifikation af levende organismer (dyr og planter i kategorier)`, howWeAddress: `Sorterings\u00f8velser med skovens dyr (pattedyr/fugle/insekter) og planter (trae/busk/blomst) giver biologisk grundlag` },
    ],
    differentiationNotes: `For born der har brug for stotte, begraens til 4\u20135 velkendte skovdyr og traeer, brug store billeder med tydelige detaljer, og forenkling af observationsark. For avancerede bornehaveklasseborn tilfojes detaljerede observationsdagboger, foedekaeder (raev spiser mus, mus spiser fro), og selvstaendig skrivning af skovrapporter.`,
    parentTakeaway: `G\u00e5 en skovtur hver uge \u2014 det er gratis naturfag. Tael traeer, saml blade og sammenlign dem. Lyt til fugle og raev. Lad barnet foere en skovdagbog med tegninger og korte saetninger. Hvert aarstidsskift i skoven er en lektion i forandring og naturens cyklus.`,
    classroomIntegration: `Skovtemaet er bornehaveklassens udeskole-fundament: ugentlige skovture med observationsark, naturfagstimen sorterer indsamlede materialer, matematiktimen taeller og sammenligner naturdata, og dansktimen skriver skovdagbog. En aarstidsvaeg i klassen viser skovens forandring. Faelles Maals maal for natur/teknik, matematik og udeskole integreres hele aaret.`,
    assessmentRubric: [
      { skill: `Skov-observation og registrering`, emerging: `finder 2\u20133 elementer p\u00e5 en observationsliste med stotte`, proficient: `gennemfoerer selvstaendigt en observationsliste med 6\u20138 elementer i skoven`, advanced: `observerer detaljer ud over listen og registrerer egne opdagelser skriftligt` },
      { skill: `\u00c5rstidsforandringer i skoven`, emerging: `genkender sommer vs. vinter p\u00e5 et trae med billedstotte`, proficient: `beskriver selvstaendigt forandringer i alle fire arstider`, advanced: `forklarer, hvorfor traeer taber blade og forbinder det med temperatur og lys` },
      { skill: `Klassifikation af skovens organismer`, emerging: `sorterer 3\u20134 dyr/planter i to grupper med stotte`, proficient: `sorterer selvstaendigt i 3 kategorier (pattedyr, fugle, insekter) med 6+ eksempler`, advanced: `opretter egne sorteringskriterier og forklarer foedekaeder i skoven` },
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

  // Check if already enriched (snippetAnswer in kindergarten block)
  const kindergartenIdx = content.indexOf("'kindergarten'");
  const firstGradeIdx = content.indexOf("'first-grade'");

  if (kindergartenIdx === -1 || firstGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in kindergarten block
  const kindergartenBlock = content.substring(kindergartenIdx, firstGradeIdx);
  if (kindergartenBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/da.ts`);
    continue;
  }

  // Find the last "],\n" in the kindergarten block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(kindergartenBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/da.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = kindergartenIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/da.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
