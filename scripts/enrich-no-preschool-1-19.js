#!/usr/bin/env node
/**
 * SEO Part 253: NO Preschool Grade Enrichment — Themes 1-19
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the preschool grade block of 19 NO theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: 'Alfabet-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) introduserer bokstavformer gjennom sporing, fargelegging og bilde-bokstav-kobling. Store bokstavkonturer og kjente gjenstander som ankerbilder bygger fonologisk bevissthet og visuell gjenkjenning. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Alfabettemaet er f\u00f8rskolebarns absolutte utgangspunkt for leseferdighet, fordi tre- og fire\u00e5ringer befinner seg i begynnelsen av den sensitive perioden for bokstavformgjenkjenning \u2014 de begynner \u00e5 skille bokstaver fra andre symboler i omgivelsene og interesserer seg for \u00e5 gjenkjenne forbokstaven i sitt eget navn. Denne naturlige nysgjerrigheten er et pedagogisk gull som oppgaveark kan utdype systematisk. Det norske alfabetet har tjueni bokstaver inkludert \u00e6, \u00f8 og \u00e5, noe som gj\u00f8r det s\u00e6rlig viktig \u00e5 begynne tidlig med gjenkjenning. Rammeplan for barnehagen legger vekt p\u00e5 spr\u00e5klig stimulering, og alfabetoppgaver oppfyller dette n\u00e5r barnet forbinder et visuelt tegn med en lyd og et kjent ord. Sporing utvikler samtidig finmotorikk og hukommelsesspor for bokstavformasjon.',
    developmentalMilestones: [
      { milestone: 'Visuell diskriminering av bokstavformer (3\u20134-\u00e5ringer begynner \u00e5 se forskjell p\u00e5 bokstaver og andre symboler)', howWeAddress: 'Bokstavgjenkjennings- og koblingsaktiviteter der store bokstaver presenteres tydelig med kjente gjenstander som ankerbilder' },
      { milestone: 'Forbindelse mellom begynnelsesbokstav og gjenstand (f\u00f8rskolebarn l\u00e6rer at ord begynner med bestemte bokstaver)', howWeAddress: 'Bilde-bokstav-kobling (A = ape, K = katt) bygger fonologisk bevissthet gjennom visuelle ankre' },
      { milestone: 'Sporing av bokstavformer (overgang fra fri tegning til styrt formgiving)', howWeAddress: 'Prikkede sporingsark med store bokstaver guider h\u00e5nden og utvikler finmotorikk som forberedelse til skriving' },
      { milestone: 'Gjenkjenning av bokstavene i eget navn (f\u00f8rskolebarn interesserer seg s\u00e6rlig for navnebokstavene)', howWeAddress: 'Bokstavaktiviteter som oppfordrer til \u00e5 finne kjente bokstaver i ulike sammenhenger, utnytter den emosjonelle tilknytningen til eget navn' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger ekstra st\u00f8tte, start med tre eller fire bokstaver som er personlig meningsfulle (barnets eget navn), bruk sand eller plastelina til fysisk opplevelse av bokstavformer, og koble hvert bokstav til en konkret gjenstand. For avanserte f\u00f8rskolebarn utvid bokstavutvalget, introduser forbindelsen mellom store og sm\u00e5 bokstaver, og utfordre dem til \u00e5 finne begynnelsesbokstaver i b\u00f8ker og omgivelser.',
    parentTakeaway: 'Den viktigste oppgaven for foreldre i alfabetl\u00e6ringen er \u00e5 gj\u00f8re bokstaver synlige i hverdagen. Pek sammen p\u00e5 bokstaver p\u00e5 butikkskilter, bussholdeplasser og matpakker. Start med barnets egne navnebokstaver \u2014 de er den emosjonelle inngangen til alfabetverdenen. Krev ikke alle bokstaver p\u00e5 \u00e9n gang; i f\u00f8rskolen er det nok at barnet gjenkjenner noen og gleder seg over \u00e5 lete etter dem. H\u00f8ytlesing hver kveld er den beste alfabet\u00f8velsen.',
    classroomIntegration: 'Alfabettemaet l\u00f8per gjennom hele f\u00f8rskole\u00e5ret: i en ukens-bokstav-praksis f\u00e5r hvert bokstav sin egen uke der det opptrer i samling, l\u00e6ringsstasjoner, m\u00e5ltidet og kunstaktiviteter. Alfabetoppgaver fungerer ved selvstendig arbeidstid, bokstavsanger i samlingen og bokstavjakt i klasserommet som observasjons\u00f8velse. Denne multisensoriske tiln\u00e6rmingen oppfyller Rammeplanens m\u00e5l for spr\u00e5klig stimulering og tidlig leseferdighet.',
    assessmentRubric: [
      { skill: 'Bokstavgjenkjenning', emerging: 'gjenkjenner 2\u20134 bokstaver (egne navnebokstaver) med voksenst\u00f8tte', proficient: 'gjenkjenner selvstendig 8\u201312 store bokstaver og kan navngi dem', advanced: 'gjenkjenner de fleste store bokstaver, kobler dem med begynnelsesbokstav i ord og fors\u00f8ker \u00e5 skrive' },
      { skill: 'Begynnelsesbokstav-kobling', emerging: 'kobler 1\u20132 begynnelsesbokstaver med kjente gjenstander med voksens modell', proficient: 'kobler selvstendig 4\u20136 begynnelsesbokstaver med korrekte gjenstander', advanced: 'kobler 8+ begynnelsesbokstaver og finner selv nye eksempler for hvert bokstav' },
      { skill: 'Bokstavformsporing', emerging: 'sporer 2\u20133 bokstaver p\u00e5 prikkede linjer gjenkjennelig', proficient: 'sporer 6\u20138 bokstaver tydelig med korrekt str\u00f8kretning', advanced: 'skriver flere bokstaver selvstendig uten modell og danner korte ord' },
    ],
  },

  animals: {
    snippetAnswer: 'Dyre-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker fargelegging, telling og kobling med dyrebilder til \u00e5 styrke finmotorikk, tallgjenkjenning og kategorisering. Barnas naturlige dyrefascinasjon driver motivasjonen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Dyretemaet er et av de mest kraftfulle for f\u00f8rskolebarn, fordi tre- og fire\u00e5ringer har en medf\u00f8dt fascinasjon for dyr som gir en emosjonell motor for l\u00e6ring. Barn i denne alderen begynner \u00e5 kategorisere verden rundt seg \u2014 store dyr mot sm\u00e5 dyr, dyr med pels mot fjær \u2014 og denne naturlige sorteringsevnen er en kognitiv milep\u00e6l som dyreoppgaver systematisk kan styrke. Fargelegging av dyrebilder med tykke konturer trener finmotorikk, mens telling av dyr i en scene bygger en-til-en-korrespondanse. Rammeplan for barnehagen fremhever barns utforskning av natur og levende vesener, og dette m\u00e5let m\u00f8tes direkte n\u00e5r f\u00f8rskolebarn l\u00e6rer om dyr gjennom strukturerte aktiviteter.',
    developmentalMilestones: [
      { milestone: 'Kategorisk tenkning (3\u20134-\u00e5ringer begynner \u00e5 sortere gjenstander etter \u00e9n egenskap)', howWeAddress: 'Sorteringsaktiviteter med bildesortering der barn grupperer dyr etter egenskaper som pels/fj\u00e6r eller bein/vinger' },
      { milestone: 'Telling av sm\u00e5 mengder (f\u00f8rskolebarn bygger en-til-en-korrespondanse opp til 10)', howWeAddress: 'Finn-og-tell-aktiviteter der barn teller spesifikke dyr i en scene og kobler med riktig tall' },
      { milestone: 'Visuell diskriminering (barn l\u00e6rer \u00e5 se forskjeller mellom lignende former)', howWeAddress: 'Skyggekobling med dyresilhuetter skjerper observasjonsevner som st\u00f8tter b\u00e5de leseforberedelse og naturvitenskap' },
      { milestone: 'Finmotorisk kontroll (overgang fra hel-arm til h\u00e5ndleddsbasert kontroll)', howWeAddress: 'Fargeleggingssider med dyremotiver og tykke konturer st\u00f8tter grepsutvikling og h\u00e5nd-\u00f8ye-koordinasjon' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, begrens til tre eller fire kjente dyr per aktivitet, bruk plastdyr som fysisk supplement til oppgavearket, og fokuser p\u00e5 \u00e9n ferdighet om gangen (kun telling eller kun kobling). For avanserte f\u00f8rskolebarn utvid med flere dyrekategorier, introduser enkel naturvitenskapelig klassifisering og legg til bokstavsporing av dyrenavn.',
    parentTakeaway: 'Dyr er en naturlig inngang til l\u00e6ring for sm\u00e5 barn. Utnytt barnets dyreinteresse hjemme ved \u00e5 telle dyr i bildb\u00f8ker, sortere kosedyr etter st\u00f8rrelse og farge, og snakke om hvor forskjellige dyr bor. Bes\u00f8k p\u00e5 bondeg\u00e5rder eller i dyrehagen gir f\u00f8rsteh\u00e5ndsopplevelser som forsterker det barnet l\u00e6rer p\u00e5 oppgavearkene. La barnet velge sitt yndlingsdyr som utgangspunkt \u2014 motivasjonen kommer innenfra.',
    classroomIntegration: 'Dyretemaet passer perfekt inn i f\u00f8rskolens ukentlige rutiner: i samlingen introduseres ukens dyr med bilder og lyder, ved l\u00e6ringsstasjoner arbeides med fargelegging og telleark, i den frie leken brukes plastdyr til rollelek, og p\u00e5 naturturer letes det etter insekter og fugler. Denne integrasjonen p\u00e5 tvers av aktiviteter st\u00f8tter Rammeplanens m\u00e5l for b\u00e5de naturutforskning og spr\u00e5klig utvikling.',
    assessmentRubric: [
      { skill: 'Kategorisering av dyr', emerging: 'sorterer dyr i to grupper med voksenst\u00f8tte (f.eks. store/sm\u00e5)', proficient: 'sorterer selvstendig dyr etter to egenskaper (levested, kroppsdekke)', advanced: 'finner egne sorteringskriterier og forklarer hvorfor dyrene h\u00f8rer til i gruppen' },
      { skill: 'Telling av dyr', emerging: 'teller 1\u20135 dyr med \u00e9n-til-\u00e9n peking med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 dyr og kobler med riktig tall', advanced: 'teller over 10 og sammenligner mengder (flere/f\u00e6rre)' },
      { skill: 'Visuell diskriminering (dyresilhuetter)', emerging: 'kobler 2\u20133 dyresilhuetter med voksenst\u00f8tte', proficient: 'kobler selvstendig 5\u20136 silhuetter med de riktige dyrene', advanced: 'kobler komplekse silhuetter og beskriver hvilke trekk som avsl\u00f8rer dyret' },
    ],
  },

  birds: {
    snippetAnswer: 'Fugle-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker fargerike fuglebilder til fargelegging, telling og kobling som styrker finmotorikk og tidlig tallgjenkjenning. Barnas fascinasjon for fugler driver engasjementet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Fugletemaet er unikt egnet for f\u00f8rskolen fordi fugler er synlige overalt i barnets hverdag \u2014 p\u00e5 lekeplassen, i hagen og ved fuglebrettet \u2014 og tre- til fire\u00e5ringer kan direkte forbinde oppgavearkenes bilder med virkelige observasjoner. Denne broen mellom papir og virkelighet styrker l\u00e6ringen markant. Fugler tilbyr naturlige muligheter for telling (fugler p\u00e5 en gren), st\u00f8rrelsessammenligning (stor/liten fugl) og fargeidentifisering (r\u00f8d r\u00f8dstrupe, bl\u00e5 bl\u00e5meis). \u00c5 spore fuglereder og egg styrker finmotorikken. Rammeplan for barnehagen vektlegger natur og milj\u00f8, og fugletemaet oppfyller dette p\u00e5 det mest tilgjengelige niv\u00e5et for de yngste.',
    developmentalMilestones: [
      { milestone: 'Farge- og st\u00f8rrelsesgjenkjenning (3\u20134-\u00e5ringer l\u00e6rer \u00e5 identifisere og navngi grunnleggende farger og st\u00f8rrelser)', howWeAddress: 'Sorteringsaktiviteter der barn grupperer fugler etter farge eller st\u00f8rrelse, styrker kategorisk tenkning' },
      { milestone: 'Telling til 10 med konkrete gjenstander', howWeAddress: 'Finn-og-tell-aktiviteter med fugler p\u00e5 greiner, i tr\u00e6r og ved fuglebrettet trener en-til-en-korrespondanse' },
      { milestone: 'Visuell kobling (parring av identiske eller relaterte bilder)', howWeAddress: 'Skyggekobling med fuglesilhuetter og kobling av fugl til reir bygger visuell diskriminering' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger ekstra st\u00f8tte, begrens til tre kjente fuglearter (spurv, due, and), bruk store illustrasjoner med tykke konturer, og fokuser p\u00e5 \u00e9n ferdighet per \u00f8kt. For avanserte f\u00f8rskolebarn introduser flere fuglearter, legg til bokstavsporing av fuglenavn og la barna telle fugler i mer komplekse scener.',
    parentTakeaway: 'Fugler er overalt, og det gj\u00f8r dem til det perfekte l\u00e6ringstemaet hjemme. Sett opp et fuglebrett og tell fuglene sammen, pek p\u00e5 fugler p\u00e5 turer, og snakk om fargene og st\u00f8rrelsene deres. Bildb\u00f8ker om fugler forlenger l\u00e6ringen etter oppgavearket. La barnet tegne fuglene det ser ute \u2014 forbindelsen mellom virkelige observasjoner og papirarbeid styrker b\u00e5de naturvitenskapelig nysgjerrighet og finmotorikk.',
    classroomIntegration: 'Fugletemaet integreres naturlig i f\u00f8rskolens \u00e5rshjul: om v\u00e5ren observeres fugler som bygger reir, om vinteren fylles fuglebrettet. I samlingen synges fuglesanger, ved l\u00e6ringsstasjoner arbeides med fargeleggings- og telleark, og p\u00e5 turer letes det etter fugler i n\u00e6romr\u00e5det. Denne tverrg\u00e5ende tiln\u00e6rmingen oppfyller Rammeplanens m\u00e5l for natur, milj\u00f8 og sanseopplevelser.',
    assessmentRubric: [
      { skill: 'Fuglegjenkjenning og kategorisering', emerging: 'gjenkjenner 2\u20133 vanlige fugler med voksenst\u00f8tte', proficient: 'navngir selvstendig 4\u20135 fugler og sorterer dem etter \u00e9n egenskap', advanced: 'gjenkjenner 6+ fugler og forklarer forskjeller mellom artene' },
      { skill: 'Telling med fuglemotiver', emerging: 'teller 1\u20135 fugler med peking og voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 fugler i en scene', advanced: 'teller over 10 og sammenligner antall (flere fugler p\u00e5 den ene greinen)' },
      { skill: 'Finmotorisk kontroll (fuglefargelegging)', emerging: 'fargelegger med brede str\u00f8k, delvis utenfor konturene', proficient: 'fargelegger innenfor konturene med jevne str\u00f8k', advanced: 'bruker detaljer og varierte farger i fuglebildene' },
    ],
  },

  birthday: {
    snippetAnswer: 'Bursdag-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker kaker, ballonger og gaver til \u00e5 \u00f8ve telling, kobling og finmotorikk. Den personlige forbindelsen til feiring driver sterk motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Bursdag er det mest personlig motiverende temaet for f\u00f8rskolebarn, fordi tre- og fire\u00e5ringer har en dyp emosjonell forbindelse til sin egen alder og feiring. Et barn som stolt holder tre fingre opp, demonstrerer allerede tallkunnskap, og bursdagsoppgaver bygger p\u00e5 denne indre motivasjonen. \u00c5 telle lys p\u00e5 en kake er den mest naturlige matematikk\u00f8velsen for denne aldersgruppen \u2014 tallet har personlig betydning. Kobling av festartikler trener en-til-en-korrespondanse i en kontekst som f\u00f8les som lek. Sporing av ordene kake og gave utvikler blyantgrep. Rammeplan for barnehagen vektlegger personlig identitet og fellesskap, noe bursdagstemaet st\u00f8tter naturlig.',
    developmentalMilestones: [
      { milestone: 'Personlig tallforst\u00e5else (3\u20134-\u00e5ringer kjenner sin egen alder som det f\u00f8rste meningsfulle tallet)', howWeAddress: 'Telleaktiviteter med bursdagslys forbinder matematikk med personlig identitet og gj\u00f8r tall emosjonelt meningsfulle' },
      { milestone: 'En-til-en-korrespondanse (kobling av gjenstander parvis)', howWeAddress: 'Kobling av festartikler \u2014 en hatt til hvert barn, en gave til hver gjest \u2014 bygger grunnleggende mengdeforst\u00e5else' },
      { milestone: 'Sosial bevissthet (f\u00f8rskolebarn begynner \u00e5 forst\u00e5 deling og turtagning)', howWeAddress: 'Festscenarier som involverer \u00e5 dele kake likt og gi gaver, introduserer tidlige sosiale og matematiske begreper' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 telling av f\u00e5 gjenstander (1\u20135 lys), bruk fysiske festartikler som supplement, og hold aktivitetene korte og festlige. For avanserte f\u00f8rskolebarn utvid telleomr\u00e5det, legg til enkel addisjon (tre lys pluss to lys), og la barnet skrive invitasjoner med bokstavsporing.',
    parentTakeaway: 'Bursdager er en gullgruve for l\u00e6ring hjemme. La barnet hjelpe med \u00e5 telle tallerkener til festen, sortere godteri i poser og dekorere med m\u00f8nstre. Sp\u00f8r barnet hvor gammelt det blir, og bruk lysene p\u00e5 kaken til \u00e5 telle sammen. \u00c5 skrive sitt eget navn p\u00e5 invitasjoner er b\u00e5de bokstav\u00f8velse og en meningsfull aktivitet. Hvert barns bursdag er en naturlig matematikk- og spr\u00e5kleksjon.',
    classroomIntegration: 'Bursdagstemaet fungerer hele \u00e5ret i f\u00f8rskolen: hvert barns bursdag feires med telleaktiviteter (tell lys, tell \u00e5r), i samlingen synges bursdagssanger og telles bursdagsgjester, og ved l\u00e6ringsstasjoner arbeides med festtematiske fargeleggings- og koblingsark. Bursdagskalenderen p\u00e5 veggen gir daglig matematikk- og tids\u00f8velse. Temaet st\u00f8tter Rammeplanens m\u00e5l for personlig identitet og fellesskap.',
    assessmentRubric: [
      { skill: 'Telling med festgjenstander', emerging: 'teller 1\u20133 lys/ballonger med voksenst\u00f8tte', proficient: 'teller selvstendig opp til 10 festgjenstander og kobler med riktig tall', advanced: 'teller over 10 og l\u00f8ser enkle \u00abhvor mange til sammen\u00bb-oppgaver' },
      { skill: 'En-til-en kobling (festartikler)', emerging: 'kobler 2\u20133 par med voksenst\u00f8tte (hatt til barn)', proficient: 'kobler selvstendig 5\u20136 par festartikler korrekt', advanced: 'kobler komplekse sett og forklarer om det er nok til alle' },
      { skill: 'Finmotorisk kontroll (festfargelegging)', emerging: 'fargelegger kaker og ballonger med grove str\u00f8k', proficient: 'fargelegger innenfor konturene med varierte farger', advanced: 'legger til detaljer som m\u00f8nstre p\u00e5 ballonger og pynt p\u00e5 kaker' },
    ],
  },

  body: {
    snippetAnswer: 'Kropp-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) l\u00e6rer kroppsdeler gjennom kobling, fargelegging og sporing. Barn forbinder bokstaver og tall med sin egen kropp, noe som gj\u00f8r l\u00e6ringen personlig og konkret. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Kropptemaet er s\u00e6rlig kraftfullt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er intenst opptatt av \u00e5 l\u00e6re om sin egen kropp \u2014 de navngir kroppsdeler, teller fingre og t\u00e6r, og oppdager hva kroppen kan. Denne personlige forbindelsen gj\u00f8r kroppen til det mest konkrete l\u00e6ringstemaet overhodet: barnet er selv l\u00e6remiddelet. Telling av fingre og t\u00e6r opp til 10 gir en naturlig matematisk ramme. Kobling av kroppsdeler med navnene deres kombinerer spr\u00e5klig utvikling med kroppsbevissthet. Sporing av hender og f\u00f8tter trener finmotorikk. Rammeplan for barnehagen vektlegger kropp, bevegelse og helse, og kroppsoppgaver m\u00f8ter disse m\u00e5lene direkte.',
    developmentalMilestones: [
      { milestone: 'Kroppsbevissthet (3\u20134-\u00e5ringer l\u00e6rer \u00e5 navngi og lokalisere kroppsdeler)', howWeAddress: 'Koblingsaktiviteter som forbinder kroppsdeler med navn og funksjoner bygger kroppsbevissthet og ordforr\u00e5d' },
      { milestone: 'Telling av kroppsegne tall (fingre, t\u00e6r, \u00f8yne, \u00f8rer)', howWeAddress: 'Telleaktiviteter med kroppsdeler gj\u00f8r tall konkrete og personlige \u2014 barnet bruker sin egen kropp som telleverkt\u00f8y' },
      { milestone: 'Kroppslig selvbevissthet (f\u00f8rskolebarn begynner \u00e5 tegne mennesker med hode, kropp og lemmer)', howWeAddress: 'Tegn-og-fargelegg-aktiviteter der barn fullf\u00f8rer kroppens deler styrker b\u00e5de kroppsoppfatning og finmotorikk' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med de mest kjente kroppsdelene (hode, hender, f\u00f8tter), bruk barnets egen kropp som referanse, og hold aktivitetene fysisk aktive. For avanserte f\u00f8rskolebarn introduser indre organer (hjerte, lunger), legg til bokstavsporing av kroppsord og utfordre dem til \u00e5 tegne en hel person med alle detaljer.',
    parentTakeaway: 'Kroppen er barnets f\u00f8rste l\u00e6remiddel. Navngi kroppsdeler under bading, tell fingre og t\u00e6r f\u00f8r sengetid, og lek \u00abpek p\u00e5 nesen/albuen/kneet\u00bb som en morsom hverdagslek. La barnet tegne seg selv \u2014 tegninger av mennesker viser hva barnet vet om kroppen, og utvikler seg markant mellom tre og fire \u00e5r. Denne daglige kroppsbevisstheten st\u00f8tter b\u00e5de helse og l\u00e6ring.',
    classroomIntegration: 'Kropptemaet integreres i f\u00f8rskolens daglige rutiner: i samlingen synges kroppssanger og pekes p\u00e5 kroppsdeler, i bevegelsesleken utforskes hva kroppen kan, ved l\u00e6ringsstasjoner arbeides med kroppsoppgaver, og i kunstkroken tegnes selvportretter. Rammeplanens m\u00e5l for kropp, bevegelse og helse oppfylles n\u00e5r kroppsbevissthet kobles med faglig l\u00e6ring.',
    assessmentRubric: [
      { skill: 'Navngiving av kroppsdeler', emerging: 'navngir 3\u20134 kroppsdeler med voksenst\u00f8tte (hode, h\u00e5nd, fot)', proficient: 'navngir selvstendig 8\u201310 kroppsdeler og peker p\u00e5 dem', advanced: 'navngir 12+ kroppsdeler inkludert albue, ankel, skulder og forklarer funksjoner' },
      { skill: 'Telling av kroppsdeler', emerging: 'teller fingre til 5 med st\u00f8tte', proficient: 'teller selvstendig fingre og t\u00e6r til 10', advanced: 'teller og sammenligner (to \u00f8yne, ti fingre) og bruker tallene i samtale' },
      { skill: 'Mennesketegning', emerging: 'tegner en hodefoting med hode og bein', proficient: 'tegner en person med hode, kropp, armer og bein', advanced: 'tegner detaljerte personer med fingre, h\u00e5r, kl\u00e6r og ansiktstrekk' },
    ],
  },

  camping: {
    snippetAnswer: 'Camping-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker telt, b\u00e5l og naturgjenstandar til \u00e5 \u00f8ve telling, sortering og finmotorikk. Barnets begeistring for utendorseventyr gj\u00f8r hver oppgave engasjerende. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Campingtemaet treffer f\u00f8rskolebarn midt i hjertet fordi det kombinerer to ting de elsker: utend\u00f8rs eventyr og lek med konkrete gjenstander. Tre- og fire\u00e5ringer som har v\u00e6rt p\u00e5 campingtur, eller dremt om det, har umiddelbar emosjonell tilknytning til telt, b\u00e5l og soveposer. Denne indre motivasjonen gj\u00f8r selv krevende oppgaver som telling og bokstavsporing til lyst\u00f8velser. Campingscener tilbyr rike tellemuligheter (tre pinner, to marshmallows), sorteringsoppgaver (hva pakker vi i ryggsekken?) og finmotoriske aktiviteter (spore teltformer). Rammeplan for barnehagen legger stor vekt p\u00e5 natur, milj\u00f8 og friluftsliv, og campingtemaet er en naturlig bro mellom oppgaveark og barnehagens utedager.',
    developmentalMilestones: [
      { milestone: 'Kategorisering og sortering (3\u20134-\u00e5ringer l\u00e6rer \u00e5 gruppere gjenstander etter egenskap)', howWeAddress: 'Pakkeaktiviteter der barn sorterer hva som h\u00f8rer til i ryggsekken og hva som ikke gj\u00f8r det, bygger logisk tenkning' },
      { milestone: 'Telling av konkrete gjenstander opp til 10', howWeAddress: 'Telleaktiviteter med campinggjenstander (pinner, marshmallows, steiner) gj\u00f8r matematikk h\u00e5ndgripelig' },
      { milestone: 'Sekvensiell tenkning (f\u00f8rskolebarn begynner \u00e5 forst\u00e5 rekkef\u00f8lge)', howWeAddress: 'Sekvensoppgaver som viser trinnene for \u00e5 sette opp et telt eller lage et b\u00e5l bygger narrativ og logisk tenkning' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk f\u00e5 og kjente campinggjenstander (telt, b\u00e5l, sovepose), hold scenene enkle med \u00e9n oppgave om gangen, og bruk fysiske gjenstander som supplement. For avanserte f\u00f8rskolebarn legg til flere gjenstander, introduser enkel addisjon med campingtema og la dem tegne sitt eget campingoppsett.',
    parentTakeaway: 'Camping er utend\u00f8rs l\u00e6ring p\u00e5 sitt beste. Selv en hagecamp med telt i hagen gir rike l\u00e6ringsmuligheter. Tell steiner og pinner sammen, sorter det dere finner i naturen etter st\u00f8rrelse og farge, og la barnet hjelpe med \u00e5 pakke ryggsekken. Etter turen kan barnet gjenfortelle opplevelsen mens det fargelegger campingark \u2014 dette styrker b\u00e5de spr\u00e5k og hukommelse.',
    classroomIntegration: 'Campingtemaet passer perfekt sammen med f\u00f8rskolens utedager og friluftstradisjoner: p\u00e5 utedag settes det opp telt og lages b\u00e5l, i samlingen snakkes det om naturen og hva vi finner der, ved l\u00e6ringsstasjoner arbeides med campingoppgaver, og i den frie leken bygges hytter og telt av tepper. Denne integrasjonen mellom inne og ute oppfyller Rammeplanens m\u00e5l for natur, milj\u00f8 og friluftsliv.',
    assessmentRubric: [
      { skill: 'Sortering av campinggjenstander', emerging: 'sorterer 2\u20133 gjenstander i to grupper med st\u00f8tte', proficient: 'sorterer selvstendig 5\u20136 gjenstander i kategorier (mat/utstyr)', advanced: 'sorterer etter flere kriterier og forklarer valgene sine' },
      { skill: 'Telling i campingscener', emerging: 'teller 1\u20135 gjenstander med st\u00f8tte', proficient: 'teller selvstendig opp til 10 campinggjenstander', advanced: 'teller over 10 og sammenligner mengder (flere pinner enn steiner)' },
      { skill: 'Sekvensiell forst\u00e5else', emerging: 'ordner 2 trinn i riktig rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 trinn i en campingsekvens', advanced: 'ordner 5+ trinn og forklarer hvorfor rekkef\u00f8lgen er viktig' },
    ],
  },

  circus: {
    snippetAnswer: 'Sirkus-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker klovner, akrobater og dyr til \u00e5 \u00f8ve telling, fargelegging og m\u00f8nstergjenkjenning. Sirkusets magiske stemning fanger barnas oppmerksomhet og motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sirkustemaet er magisk for f\u00f8rskolebarn fordi det kombinerer spektakul\u00e6re farger, morsom humor og overraskende figurer i en verden der alt virker mulig. Tre- og fire\u00e5ringer fascineres av klovner, jongl\u00f8rer og akrobater, og denne emosjonelle begeistringen gj\u00f8r selv utfordrende oppgaver til gledesfylte aktiviteter. Sirkusscener tilbyr naturlige muligheter for telling (baller i luften, dyr i manesjen), m\u00f8nstergjenkjenning (stripete telt, vekslende farger) og finmotorisk trening (sporing av sirkusbokstaver). Sirkusets visuelle rikdom styrker fargegjenkjenning og kreativ tenkning. Rammeplan for barnehagen fremhever kunst, kultur og kreativitet, og sirkustemaet oppfyller dette med sitt tverrfaglige potensial.',
    developmentalMilestones: [
      { milestone: 'M\u00f8nstergjenkjenning (3\u20134-\u00e5ringer begynner \u00e5 se gjentakende m\u00f8nstre)', howWeAddress: 'M\u00f8nsteroppgaver med sirkuselementer (r\u00f8d-bl\u00e5-r\u00f8d-bl\u00e5) bygger tidlig algebraisk tenkning gjennom visuelt engasjerende kontekst' },
      { milestone: 'Fargegjenkjenning og navngiving (f\u00f8rskolebarn l\u00e6rer \u00e5 navngi grunnfarger)', howWeAddress: 'Fargelegging av sirkusfigurer med spesifiserte farger trener fargegjenkjenning i en motiverende kontekst' },
      { milestone: 'Telling opp til 10 med visuelle grupper', howWeAddress: 'Tell-sirkusdyr-oppgaver der barn teller elefanter, seler og hunder i manesjen forsterker en-til-en-korrespondanse' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk f\u00e5 og tydelige sirkuselementer med store illustrasjoner, fokuser p\u00e5 \u00e9n ferdighet om gangen og legg til fysisk lek som sirkusbevegelser. For avanserte f\u00f8rskolebarn introduser mer komplekse m\u00f8nstre, la dem telle st\u00f8rre mengder og utfordre med oppgaver der de tegner sine egne sirkusscener.',
    parentTakeaway: 'Sirkusets magi kan videreformidles hjemme. Lag et hjemmesirkus der barnet jonglerer med lette baller (tell ballene!), g\u00e5r p\u00e5 en tauformet linje p\u00e5 gulvet og opptrer for familien. Tell popcorn i kopper, sorter sirkusbilder etter farge og les bildb\u00f8ker om sirkus. Den fysiske leken forsterker oppgavearkenes l\u00e6ring og gj\u00f8r matematikk og motorikk til en festlig opplevelse.',
    classroomIntegration: 'Sirkustemaet egner seg glimrende for en temauke i f\u00f8rskolen: i samlingen vises bilder og fortelles om sirkusartister, ved l\u00e6ringsstasjoner arbeides med fargeleggings- og telleark, i bevegelsesleken \u00f8ves akrobatikk og jonglering, og i kunstkroken lages sirkusmasker og plakater. Temaet integrerer Rammeplanens m\u00e5l for kunst, kultur og kreativitet med matematikk og motorikk.',
    assessmentRubric: [
      { skill: 'M\u00f8nstergjenkjenning (sirkusm\u00f8nstre)', emerging: 'fortsetter et enkelt AB-m\u00f8nster med st\u00f8tte', proficient: 'fortsetter selvstendig AB- og ABB-m\u00f8nstre med sirkuselementer', advanced: 'lager egne m\u00f8nstre og forklarer reglene for dem' },
      { skill: 'Telling av sirkuselementer', emerging: 'teller 1\u20135 sirkusfigurer med st\u00f8tte', proficient: 'teller selvstendig opp til 10 og kobler med riktig tall', advanced: 'teller over 10 og grupperer sirkuselementer etter kategori' },
      { skill: 'Fargelegging av sirkusfigurer', emerging: 'fargelegger med brede str\u00f8k, delvis utenfor konturene', proficient: 'fargelegger innenfor konturene med varierte farger', advanced: 'bruker kreative fargevalg og legger til detaljer som m\u00f8nstre p\u00e5 kl\u00e6r' },
    ],
  },

  clothing: {
    snippetAnswer: 'Kl\u00e6r-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker gensere, bukser og sko til \u00e5 \u00f8ve sortering, fargelegging og kobling. Barnet l\u00e6rer om v\u00e6r og p\u00e5kledning gjennom kjente plagg. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Kl\u00e6rtemaet er unikt personlig for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er midt i \u00e5 l\u00e6re seg \u00e5 kle p\u00e5 seg selv \u2014 en av de viktigste selvstendighetsferdighetene i denne alderen. \u00c5 koble riktige kl\u00e6r til riktig v\u00e6r trener logisk tenkning i en kontekst som barnet m\u00f8ter hver morgen. Sortering av plagg etter type, farge eller \u00e5rstid bygger kategorisk tenkning. Fargelegging av gensere og bukser med spesifiserte farger \u00f8ver fargegjenkjenning og finmotorikk. I Norge er det \u00e5 kle seg etter v\u00e6ret en viktig hverdagsferdighet, og Rammeplan for barnehagen vektlegger selvstendighet og mestring i daglige rutiner.',
    developmentalMilestones: [
      { milestone: 'Selvstendig p\u00e5kledning (3\u20134-\u00e5ringer l\u00e6rer \u00e5 kle p\u00e5 seg med gradvis mindre hjelp)', howWeAddress: 'Koblingsaktiviteter der barn kobler plagg til riktig kroppsdel styrker kroppskjennskap og p\u00e5kledningsrekkef\u00f8lge' },
      { milestone: 'Kategorisk sortering etter egenskap (f\u00f8rskolebarn sorterer etter farge, st\u00f8rrelse, type)', howWeAddress: 'Sorteringsoppgaver der barn grupperer kl\u00e6r etter \u00e5rstid, type eller farge bygger logisk klassifisering' },
      { milestone: 'V\u00e6rforst\u00e5else (barn begynner \u00e5 koble v\u00e6r med riktig bekledning)', howWeAddress: 'V\u00e6r-og-kl\u00e6r-koblinger der barn velger riktige plagg til sol, regn og sn\u00f8 styrker \u00e5rsak-virkning-tenkning' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk f\u00e5 og velkjente plagg (genser, bukse, sko), koble til barnets egne kl\u00e6r som konkret referanse, og fokuser p\u00e5 \u00e9n sorteringsegenskap om gangen. For avanserte f\u00f8rskolebarn utvid til flere plaggtyper, introduser p\u00e5kledningssekvenser og la dem tegne kl\u00e6r til ulike v\u00e6rtyper.',
    parentTakeaway: 'Kl\u00e6r er en daglig l\u00e6ringsmulighet. La barnet velge kl\u00e6r selv med litt veiledning, snakk om hvorfor vi velger varme kl\u00e6r n\u00e5r det er kaldt, og sorter rent t\u00f8y sammen etter farge og type. \u00c5 la barnet \u00f8ve knapper, glideliser og sko styrker b\u00e5de finmotorikk og selvstendighet. Oppgavearkene forsterker det barnet l\u00e6rer i garderoben hver morgen.',
    classroomIntegration: 'Kl\u00e6rtemaet integreres naturlig i f\u00f8rskolens daglige rutiner: garderobesituasjonen er en daglig l\u00e6ringsarena for p\u00e5kledning, i samlingen snakkes det om v\u00e6ret og hva vi har p\u00e5 oss, ved l\u00e6ringsstasjoner arbeides med kl\u00e6roppgaver, og i rolleleken leker barna med utkledningskl\u00e6r. Denne hverdagsn\u00e6re integrasjonen oppfyller Rammeplanens m\u00e5l for selvstendighet, mestring og kropp.',
    assessmentRubric: [
      { skill: 'Sortering av kl\u00e6r etter egenskap', emerging: 'sorterer kl\u00e6r i to grupper med st\u00f8tte (varme/lette)', proficient: 'sorterer selvstendig etter type, farge eller \u00e5rstid', advanced: 'sorterer etter flere egenskaper samtidig og forklarer valgene' },
      { skill: 'V\u00e6r-kl\u00e6r-kobling', emerging: 'kobler 1\u20132 v\u00e6rtyper med riktige kl\u00e6r med st\u00f8tte', proficient: 'kobler selvstendig 3\u20134 v\u00e6rtyper med passende plagg', advanced: 'kobler alle v\u00e6rtyper og forklarer hvorfor hvert plagg passer' },
      { skill: 'P\u00e5kledningssekvens', emerging: 'ordner 2 p\u00e5kledningstrinn med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 trinn i riktig rekkef\u00f8lge', advanced: 'ordner 5+ trinn og forklarer logikken (undertøy f\u00f8r bukse, sokker f\u00f8r sko)' },
    ],
  },

  colors: {
    snippetAnswer: 'Farge-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker levende illustrasjoner til \u00e5 \u00f8ve fargegjenkjenning, sortering og finmotorisk fargelegging. Barn l\u00e6rer fargenavn gjennom engasjerende koble- og sorteringsaktiviteter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Fargetemaet er et av de mest grunnleggende for f\u00f8rskolebarn fordi fargegjenkjenning er en av de f\u00f8rste kognitive ferdighetene barn mestrer \u2014 tre- og fire\u00e5ringer er midt i prosessen med \u00e5 navngi og skille mellom farger. Denne ferdigheten er en forutsetning for utallige andre l\u00e6ringsoppgaver, fra \u00e5 f\u00f8lge instruksjoner (\u00abfargelegg sirkelen r\u00f8d\u00bb) til \u00e5 sortere og kategorisere. Fargeoppgaver tilbyr et lavterskel inngangsparti der alle barn kan oppleve mestring. Sortering etter farge er en av de enkleste formene for klassifisering, og bygger den logiske tenkningen som er grunnmuren for matematikk. Rammeplan for barnehagen vektlegger spr\u00e5kstimulering, og fargenavn er blant de f\u00f8rste beskrivende ordene barn l\u00e6rer.',
    developmentalMilestones: [
      { milestone: 'Fargegjenkjenning og navngiving (3\u20134-\u00e5ringer l\u00e6rer \u00e5 navngi grunnfargene)', howWeAddress: 'Farge-kobling og sorteringsaktiviteter der barn parrer gjenstander med riktig farge styrker b\u00e5de fargebegrep og ordforr\u00e5d' },
      { milestone: 'Sortering etter \u00e9n egenskap (f\u00f8rskolebarn grupperer gjenstander etter farge)', howWeAddress: 'Bildesorteringsoppgaver der barn sorterer fargerike gjenstander i fargegrupper bygger tidlig klassifiseringsevne' },
      { milestone: 'Finmotorisk kontroll gjennom fargelegging', howWeAddress: 'Fargeleggingsoppgaver med instruksjoner om spesifikke farger trener b\u00e5de grepsutvikling og evnen til \u00e5 f\u00f8lge instruksjoner' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med de tre prim\u00e6rfargene (r\u00f8d, bl\u00e5, gul), bruk fysiske gjenstander i matchende farger som supplement, og hold oppgavene enkle med store flater. For avanserte f\u00f8rskolebarn introduser sekund\u00e6rfarger og nyanser, la dem blande farger og utforske hva som skjer, og legg til m\u00f8nsteroppgaver med fargesekvenser.',
    parentTakeaway: 'Farger er overalt i hverdagen, og det gj\u00f8r dette til et tema dere kan \u00f8ve p\u00e5 hele tiden. Nevn farger p\u00e5 kl\u00e6r, mat og leker gjennom dagen. La barnet sortere Lego etter farge, finne alle r\u00f8de ting i rommet, eller velge \u00abfarge p\u00e5 dagen\u00bb. Baking er ogs\u00e5 en flott mulighet \u2014 snakk om fargene p\u00e5 frukt og gr\u00f8nnsaker mens dere lager mat sammen.',
    classroomIntegration: 'Fargetemaet l\u00f8per gjennom alle aktiviteter i f\u00f8rskolen: i samlingen navngis farger p\u00e5 barnas kl\u00e6r, ved l\u00e6ringsstasjoner arbeides med sortering og fargelegging, i kunstkroken eksperimenteres med fargeblanding, og p\u00e5 naturturer letes det etter farger i naturen. Ukens farge kan v\u00e6re et gjennomg\u00e5ende element som binder aktivitetene sammen. Denne tiln\u00e6rmingen st\u00f8tter Rammeplanens m\u00e5l for spr\u00e5k, kunst og kreativitet.',
    assessmentRubric: [
      { skill: 'Fargegjenkjenning', emerging: 'navngir 2\u20133 grunnfarger med st\u00f8tte', proficient: 'navngir selvstendig 6\u20138 farger og peker dem ut i omgivelsene', advanced: 'navngir 10+ farger inkludert nyanser (lysebl\u00e5, m\u00f8rkegr\u00f8nn) og forklarer forskjeller' },
      { skill: 'Fargesortering', emerging: 'sorterer gjenstander i 2 fargegrupper med st\u00f8tte', proficient: 'sorterer selvstendig i 4\u20136 fargegrupper', advanced: 'sorterer etter farge og en annen egenskap samtidig (r\u00f8de store, bl\u00e5 sm\u00e5)' },
      { skill: 'Fargelegging etter instruksjon', emerging: 'fargelegger med riktig farge p\u00e5 de fleste omr\u00e5dene med p\u00e5minnelse', proficient: 'fargelegger riktig etter instruksjoner selvstendig', advanced: 'f\u00f8lger komplekse fargeinstruksjoner og velger kreative nyanser innenfor retningslinjene' },
    ],
  },

  construction: {
    snippetAnswer: 'Bygge-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker kraner, lastebiler og verkt\u00f8y til \u00e5 \u00f8ve telling, formgjenkjenning og finmotorikk. Barns fascinasjon for anleggsmaskiner driver sterk motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Byggetemaet fascinerer f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er naturlige byggere \u2014 de stabler klosser, graver i sand og elsker \u00e5 se p\u00e5 anleggsmaskiner p\u00e5 vei til barnehagen. Denne hverdaglige fascinasjonen gj\u00f8r byggeoppgaver til et naturlig l\u00e6ringsverkt\u00f8y. Telling av hjul p\u00e5 lastebiler, gjenkjenning av geometriske former i bygninger og sporing av verkt\u00f8yformer utvikler matematisk og romlig tenkning. Byggeoppgaver styrker ogs\u00e5 sekvensforst\u00e5else n\u00e5r barn l\u00e6rer rekkef\u00f8lgen i en byggeprosess. Rammeplan for barnehagen fremhever utforskning og skapende aktiviteter, og byggetemaet oppfyller dette gjennom tverrfaglig l\u00e6ring.',
    developmentalMilestones: [
      { milestone: 'Formgjenkjenning (3\u20134-\u00e5ringer begynner \u00e5 identifisere grunnleggende geometriske former)', howWeAddress: 'Formoppgaver der barn finner firkanter, trekanter og sirkler i bygningsillustrasjoner kobler geometri til virkelig arkitektur' },
      { milestone: 'Telling og mengdeforst\u00e5else med konkrete gjenstander', howWeAddress: 'Tell-hjul-p\u00e5-lastebilen og tell-vinduer-i-bygningen aktiviteter gj\u00f8r tall synlige og h\u00e5ndgripelige' },
      { milestone: 'Romlig bevissthet (barn l\u00e6rer om st\u00f8rrelse, h\u00f8yde og plassering)', howWeAddress: 'St\u00f8rrelsessammenligninger mellom byggemaskiner og st\u00f8rre/mindre-oppgaver bygger romlig ordforr\u00e5d og tenkning' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, begrens til tre\u2013fire kjente maskiner (lastebil, kran, gravemaskin), bruk klosser og lekekj\u00f8ret\u00f8y som fysisk supplement, og fokuser p\u00e5 \u00e9n ferdighet per aktivitet. For avanserte f\u00f8rskolebarn introduser mer komplekse byggesekvenser, legg til formkombinasjoner og utfordre dem til \u00e5 tegne egne bygninger med spesifiserte former.',
    parentTakeaway: 'Barns byggeinteresse er en l\u00e6ringssuperkraft. La barnet bygge med klosser og snakk om former (den er firkantet, den er h\u00f8y). Stopp ved byggeprosjekter p\u00e5 vei til barnehagen og tell maskinene sammen. La barnet hjelpe med enkle oppgaver hjemme \u2014 \u00e5 skru sammen m\u00f8bler eller bruke verkt\u00f8y med tilsyn er b\u00e5de motorisk trening og selvtillitsbygging.',
    classroomIntegration: 'Byggetemaet integreres i f\u00f8rskolens aktiviteter: i samlingen vises bilder av maskiner og bygninger, ved l\u00e6ringsstasjoner arbeides med byggeoppgaver og formgjenkjenning, i konstruksjonsleken bygges med klosser og legobrikker, og p\u00e5 turer observeres byggeprosjekter i n\u00e6rmilj\u00f8et. Denne sammenhengen mellom oppgaveark og praktisk bygging oppfyller Rammeplanens m\u00e5l for utforskning og probleml\u00f8sning.',
    assessmentRubric: [
      { skill: 'Formgjenkjenning i byggesammenheng', emerging: 'finner 1\u20132 grunnformer med st\u00f8tte (firkant, sirkel)', proficient: 'finner selvstendig 3\u20134 former i bygningsillustrasjoner', advanced: 'finner og navngir 5+ former og forklarer hvor de finnes i virkelige bygninger' },
      { skill: 'Telling av byggegjenstander', emerging: 'teller 1\u20135 gjenstander med st\u00f8tte', proficient: 'teller selvstendig opp til 10 og kobler med riktig tall', advanced: 'teller over 10 og grupperer gjenstander etter type (maskiner, verkt\u00f8y)' },
      { skill: 'Byggesekvens', emerging: 'ordner 2 byggetrinn i rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 trinn i en byggeprosess', advanced: 'planlegger en byggesekvens p\u00e5 5+ trinn og forklarer logikken' },
    ],
  },

  cooking: {
    snippetAnswer: 'Matlaging-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker ingredienser, redskaper og oppskrifter til \u00e5 \u00f8ve telling, sortering og sekvensiell tenkning. Barns glede ved matlaging gj\u00f8r l\u00e6ringen naturlig og motiverende. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Matlagingstemaet er s\u00e6rlig effektivt for f\u00f8rskolebarn fordi det forbinder l\u00e6ring direkte med en sanselig hverdagsopplevelse. Tre- og fire\u00e5ringer elsker \u00e5 \u00abr\u00f8re i gryten\u00bb, h\u00e5ndtere ingredienser og se forvandlingen fra r\u00e5varer til ferdig mat. Denne multisensoriske konteksten gj\u00f8r abstrakte begreper som telling, m\u00e5ling og sekvens h\u00e5ndgripelige. \u00c5 telle egg, sortere frukt og f\u00f8lge en enkel oppskriftrekkef\u00f8lge bygger b\u00e5de matematisk forst\u00e5else og eksekutive funksjoner. Rammeplan for barnehagen legger vekt p\u00e5 hverdagsaktiviteter som l\u00e6ringsarenaer, og matlaging er kanskje den rikeste av dem alle.',
    developmentalMilestones: [
      { milestone: 'Sekvensiell forst\u00e5else (3\u20134-\u00e5ringer begynner \u00e5 forst\u00e5 trinn-for-trinn-prosesser)', howWeAddress: 'Oppskriftsekvenser der barn ordner trinn i riktig rekkef\u00f8lge bygger narrativ og logisk tenkning' },
      { milestone: 'Telling og m\u00e5ling med konkrete gjenstander', howWeAddress: 'Tell-ingredienser-oppgaver (tre egg, to epler) gj\u00f8r matematikk sensorisk og meningsfull' },
      { milestone: 'Kategoriforst\u00e5else (frukt, gr\u00f8nnsaker, bakevarer)', howWeAddress: 'Sorteringsoppgaver der barn grupperer mat etter type styrker kategoritenkning med velkjente gjenstander' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk f\u00e5 og kjente matgjenstander, hold oppskriftsekvensene til 2\u20133 trinn, og legg til fysisk matlaging som supplement. For avanserte f\u00f8rskolebarn utvid med lengre sekvenser, introduser enkle m\u00e5lingsoppgaver (halvt glass, helt glass) og la dem tegne egne oppskrifter med bilder.',
    parentTakeaway: 'Kj\u00f8kkenet er et fantastisk klasserom. La barnet hjelpe til med enkel matlaging: telle egg, r\u00f8re i deig, sortere frukt etter farge. Snakk gjennom trinnene h\u00f8yt (\u00abf\u00f8rst knekker vi eggene, s\u00e5 r\u00f8rer vi\u00bb) for \u00e5 styrke spr\u00e5k og sekvensiell tenkning. Bruk oppskriftsark fra oppgavene som forberedelse f\u00f8r dere lager maten i virkeligheten \u2014 barnet f\u00f8ler stolthet over \u00e5 ha \u00ablest\u00bb oppskriften.',
    classroomIntegration: 'Matlagingstemaet er perfekt for f\u00f8rskolens fellesm\u00e5ltider og matprosjekter: i samlingen snakkes det om ukens mat og ingredienser, ved l\u00e6ringsstasjoner arbeides med matlagingsoppgaver og sortering, i kj\u00f8kkenkroken lages det enkel mat sammen, og m\u00e5ltidene brukes som daglige l\u00e6ringsarenaer. Denne kobl ingen mellom oppgaveark og virkelig matlaging oppfyller Rammeplanens m\u00e5l for hverdagsaktiviteter og mestring.',
    assessmentRubric: [
      { skill: 'Oppskriftsekvens', emerging: 'ordner 2 matlagingstrinn med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 trinn i riktig rekkef\u00f8lge', advanced: 'ordner 5+ trinn og forklarer hvorfor rekkef\u00f8lgen er viktig' },
      { skill: 'Telling av ingredienser', emerging: 'teller 1\u20134 ingredienser med st\u00f8tte', proficient: 'teller selvstendig opp til 10 ingredienser og kobler med tall', advanced: 'teller over 10 og l\u00f8ser enkle \u00abhvor mange trenger vi\u00bb-oppgaver' },
      { skill: 'Matkategorisering', emerging: 'sorterer mat i 2 grupper med st\u00f8tte (frukt/gr\u00f8nnsaker)', proficient: 'sorterer selvstendig i 3\u20134 matgrupper', advanced: 'sorterer etter flere kriterier (type, farge, form) og forklarer valgene' },
    ],
  },

  dinosaurs: {
    snippetAnswer: 'Dinosaur-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker fargerike dinosaurbilder til fargelegging, telling og st\u00f8rrelsessammenligning. Barns enorme dinosaurfascinasjon gj\u00f8r selv utfordrende oppgaver til gledesfylte aktiviteter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Dinosaurtemaet har en n\u00e6rmest magisk tiltrekningskraft p\u00e5 f\u00f8rskolebarn. Tre- og fire\u00e5ringer som kan uttale \u00abtyrannosaurus\u00bb f\u00f8r de kan skrive sitt eget navn, demonstrerer den intense motivasjonen dette temaet vekker. Denne begeistringen er et pedagogisk verkt\u00f8y av f\u00f8rste rang: barn som normalt er motvillige til \u00e5 gj\u00f8re oppgaver, fargelegger dinosaurer med full konsentrasjon. St\u00f8rrelsessammenligninger mellom dinosaurer bygger romlig tenkning og matematisk ordforr\u00e5d (st\u00f8rre, mindre, h\u00f8yest). Telling av dinosaurer i scener \u00f8ver en-til-en-korrespondanse. Rammeplan for barnehagen vektlegger undring og utforskning, og dinosaurtemaet er en av de sterkeste driverne for vitenskapelig nysgjerrighet i f\u00f8rskolealderen.',
    developmentalMilestones: [
      { milestone: 'St\u00f8rrelsesforst\u00e5else og sammenligning (3\u20134-\u00e5ringer l\u00e6rer begreper som stor, liten, st\u00f8rre)', howWeAddress: 'St\u00f8rrelsessammenligninger mellom dinosaurer (stor T-Rex, liten Compy) bygger matematisk ordforr\u00e5d og romlig bevissthet' },
      { milestone: 'Telling av sm\u00e5 mengder med en-til-en-korrespondanse', howWeAddress: 'Tell-dinosaurene-oppgaver der barn teller og kobler med riktig tall forsterker tallforst\u00e5else i en motiverende kontekst' },
      { milestone: 'Finmotorisk kontroll gjennom detaljert fargelegging', howWeAddress: 'Dinosaurfargelegging med tykke konturer og varierende st\u00f8rrelser utfordrer finmotorikken p\u00e5 riktig niv\u00e5 for alderen' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk f\u00e5 og kjente dinosaurer med store, enkle illustrasjoner, fokuser p\u00e5 \u00e9n ferdighet per \u00f8kt (kun fargelegging eller kun telling), og la barnet navngi dinosaurene f\u00f8r oppgaven. For avanserte f\u00f8rskolebarn introduser flere arter, legg til bokstavsporing av dinosaurnavn og utfordre med sortering etter flere egenskaper (planteetere vs. kj\u00f8ttetere, store vs. sm\u00e5).',
    parentTakeaway: 'Dinosaurinteressen er en superkraft for l\u00e6ring. Bruk den hjemme: les dinosaurb\u00f8ker og tell dinosaurer p\u00e5 hver side, sorter plastdinosaurene etter st\u00f8rrelse, og lag et dinosaurmuseum med tegninger fra oppgavearkene. Museumsbes\u00f8k med dinosaurutstilling er uvurderlige f\u00f8rsteh\u00e5ndsopplevelser. N\u00e5r barnet vil l\u00e6re fordi det handler om dinosaurer, er motivasjonen usl\u00e5elig.',
    classroomIntegration: 'Dinosaurtemaet egner seg for en engasjerende temauke: i samlingen introduseres dinosaurer med bilder, figurer og lyder, ved l\u00e6ringsstasjoner arbeides med fargeleggings- og telleark, i konstruksjonsleken bygges dinosaurverdener med klosser og plastelina, og i uteleken graves det etter \u00abfossiler\u00bb i sandkassen. Denne tverrfaglige tiln\u00e6rmingen oppfyller Rammeplanens m\u00e5l for utforskning, undring og kreativitet.',
    assessmentRubric: [
      { skill: 'St\u00f8rrelsessammenligning (dinosaurer)', emerging: 'identifiserer den st\u00f8rste og den minste med st\u00f8tte', proficient: 'sorterer selvstendig 3\u20134 dinosaurer fra minst til st\u00f8rst', advanced: 'rangerer 5+ dinosaurer etter st\u00f8rrelse og bruker sammenligningsord korrekt' },
      { skill: 'Telling med dinosaurmotiver', emerging: 'teller 1\u20135 dinosaurer med st\u00f8tte', proficient: 'teller selvstendig opp til 10 dinosaurer og kobler med tall', advanced: 'teller over 10 og l\u00f8ser enkle \u00abhvor mange flere\u00bb-oppgaver' },
      { skill: 'Dinosaurfargelegging (finmotorikk)', emerging: 'fargelegger dinosaurer med grove str\u00f8k', proficient: 'fargelegger innenfor konturene med jevne str\u00f8k', advanced: 'bruker detaljerte farger, m\u00f8nstre og variasjoner i dinosaurbildene' },
    ],
  },

  easter: {
    snippetAnswer: 'P\u00e5ske-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker egg, kyllinger og kaniner til \u00e5 \u00f8ve telling, m\u00f8nstergjenkjenning og fargelegging. P\u00e5skens festlige stemning gir naturlig motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'P\u00e5sketemaet er s\u00e6rlig verdifullt for f\u00f8rskolebarn fordi det kombinerer sesongmessig spenning med rike l\u00e6ringsmuligheter. Tre- og fire\u00e5ringer som venter p\u00e5 p\u00e5skeharen og p\u00e5skeegg har en emosjonell beredskap som gj\u00f8r all l\u00e6ring mer effektiv. P\u00e5skeegg er perfekte telleobjekter fordi de kommer i ulike farger og st\u00f8rrelser, noe som muliggj\u00f8r b\u00e5de telling, sortering og m\u00f8nsterarbeid p\u00e5 \u00e9n gang. Dekorering av p\u00e5skeegg p\u00e5 papir trener finmotorikk og kreativitet. P\u00e5sketradisjoner er sterke i Norge, og Rammeplan for barnehagen vektlegger at barn skal oppleve h\u00f8ytider og tradisjoner som en del av kulturell tilh\u00f8righet.',
    developmentalMilestones: [
      { milestone: 'M\u00f8nstergjenkjenning med farger og former (f\u00f8rskolebarn begynner \u00e5 se gjentakelser)', howWeAddress: 'P\u00e5skeegg-m\u00f8nsteroppgaver (r\u00f8dt-gult-r\u00f8dt-gult) bygger tidlig algebraisk tenkning i en festlig kontekst' },
      { milestone: 'Telling og mengdesammenligning', howWeAddress: 'Tell-p\u00e5skeegg-oppgaver med egg i kurver av ulik st\u00f8rrelse \u00f8ver en-til-en-korrespondanse og \u00abflere/f\u00e6rre\u00bb-begreper' },
      { milestone: 'Finmotorisk presisjon (dekorering av sm\u00e5 flater)', howWeAddress: 'P\u00e5skeegg-dekoreringsoppgaver der barn fargelegger m\u00f8nstre p\u00e5 eggformer utvikler presisjon i h\u00e5ndbevegelser' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk f\u00e5 og store eggformer, fokuser p\u00e5 \u00e9n aktivitet om gangen (kun fargelegging eller kun telling), og legg til fysiske p\u00e5skeegg som supplement. For avanserte f\u00f8rskolebarn introduser mer komplekse m\u00f8nstre, la dem tegne egne eggdekorasjoner og legg til enkel addisjon med p\u00e5skeegg.',
    parentTakeaway: 'P\u00e5sken er en gyllen l\u00e6ringstid hjemme. Mal p\u00e5skeegg sammen og snakk om farger og m\u00f8nstre, gjennomf\u00f8r en eggjakt der barnet teller funnene, og bruk p\u00e5skegodteri til sortering etter farge. Bakst av p\u00e5skekaker gir telling og m\u00e5ling i praksis. Koble oppgavearkene til disse hjemmeaktivitetene slik at l\u00e6ringen f\u00f8les som en naturlig del av h\u00f8ytiden.',
    classroomIntegration: 'P\u00e5sketemaet integreres i f\u00f8rskolens sesongplan: i samlingen leses p\u00e5skefortellinger og synges p\u00e5skesanger, ved l\u00e6ringsstasjoner arbeides med p\u00e5skeegg-oppgaver og m\u00f8nsterark, i kunstkroken males og dekoreres p\u00e5skeegg, og i uteleken gjennomf\u00f8res eggjakt. P\u00e5ske gir ogs\u00e5 anledning til \u00e5 utforske v\u00e5ren og nye begynnelser. Temaet st\u00f8tter Rammeplanens m\u00e5l for kultur, tradisjon og kreativitet.',
    assessmentRubric: [
      { skill: 'M\u00f8nsterarbeid med p\u00e5skeegg', emerging: 'fortsetter et enkelt AB-m\u00f8nster med st\u00f8tte (r\u00f8d-gul-r\u00f8d)', proficient: 'fortsetter selvstendig AB- og ABB-m\u00f8nstre med p\u00e5skefarger', advanced: 'lager egne m\u00f8nstre og forklarer reglene' },
      { skill: 'Telling av p\u00e5skeegg', emerging: 'teller 1\u20135 egg med st\u00f8tte', proficient: 'teller selvstendig opp til 10 egg og kobler med tall', advanced: 'teller over 10 og l\u00f8ser \u00abhvor mange mangler\u00bb-oppgaver' },
      { skill: 'Eggdekorering (finmotorikk)', emerging: 'fargelegger eggformen med \u00e9n farge', proficient: 'legger til enkle m\u00f8nstre (striper, prikker) innenfor eggformen', advanced: 'lager detaljerte, symmetriske m\u00f8nstre med flere farger' },
    ],
  },

  emotions: {
    snippetAnswer: 'F\u00f8lelse-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker ansiktsuttrykk og situasjonsbilder til \u00e5 \u00f8ve f\u00f8lelsesgjenkjenning, kobling og finmotorikk. Barn l\u00e6rer \u00e5 sette ord p\u00e5 f\u00f8lelsene sine. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'F\u00f8lelsestemaet er av avgj\u00f8rende betydning for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er midt i den eksplosive utviklingen av emosjonell kompetanse \u2014 de opplever sterke f\u00f8lelser men mangler ofte ordene og strategiene for \u00e5 h\u00e5ndtere dem. Oppgaveark som viser ansiktsuttrykk for glad, trist, sint og redd gir barn et visuelt vokabular de kan bruke n\u00e5r egne ord kommer til kort. Kobling av situasjoner med f\u00f8lelser (\u00abbarnet mistet ballongen \u2014 hvordan f\u00f8ler det seg?\u00bb) bygger empati og sosial forst\u00e5else. Rammeplan for barnehagen legger stor vekt p\u00e5 sosial kompetanse, kommunikasjon og selvregulering, og f\u00f8lelsesoppgaver adresserer alle tre m\u00e5lomr\u00e5dene direkte.',
    developmentalMilestones: [
      { milestone: 'F\u00f8lelsesgjenkjenning i ansiktsuttrykk (3\u20134-\u00e5ringer l\u00e6rer \u00e5 identifisere grunnf\u00f8lelser)', howWeAddress: 'Koblingsoppgaver der barn parrer ansiktsuttrykk med f\u00f8lelsesnavn bygger emosjonelt ordforr\u00e5d og visuell leseferdighet' },
      { milestone: '\u00c5rsak-virkning-forst\u00e5else for f\u00f8lelser (barn begynner \u00e5 forst\u00e5 at hendelser utl\u00f8ser f\u00f8lelser)', howWeAddress: 'Situasjon-f\u00f8lelse-koblinger der barn kobler hendelser med passende emosjonelle reaksjoner styrker sosial forst\u00e5else' },
      { milestone: 'Empatiutvikling (f\u00f8rskolebarn begynner \u00e5 gjenkjenne andres f\u00f8lelser)', howWeAddress: 'Arbeidsark der barn identifiserer f\u00f8lelser hos andre i bilder og forsl\u00e5r hjelpehandlinger utvikler prososial atferd' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, start med to tydelige grunnf\u00f8lelser (glad og trist), bruk speil s\u00e5 barnet kan se egne ansiktsuttrykk, og koble til konkrete opplevde situasjoner. For avanserte f\u00f8rskolebarn introduser nyanserte f\u00f8lelser (overrasket, frustrert, stolt), la dem tegne egne f\u00f8lelsesansikter og diskuter hva man kan gj\u00f8re n\u00e5r man f\u00f8ler noe vanskelig.',
    parentTakeaway: 'Det viktigste foreldre kan gj\u00f8re er \u00e5 sette ord p\u00e5 f\u00f8lelser i hverdagen: \u00abJeg ser at du er frustrert fordi klossene falt ned\u00bb. Les bildb\u00f8ker om f\u00f8lelser og snakk om hva figurene f\u00f8ler. Bruk oppgavearkene som samtalestartere: \u00abHvordan tror du denne gutten f\u00f8ler seg? Har du f\u00f8lt deg slik noen gang?\u00bb. Barn som l\u00e6rer f\u00f8lelsesord tidlig, h\u00e5ndterer konflikter og overganger bedre.',
    classroomIntegration: 'F\u00f8lelsestemaet integreres i f\u00f8rskolens hverdag: i samlingen brukes f\u00f8lelseskort for \u00e5 sjekke inn p\u00e5 dagens humr, ved l\u00e6ringsstasjoner arbeides med f\u00f8lelsesoppgaver, i den frie leken \u00f8ves konfliktl\u00f8sning med voksenst\u00f8tte, og i bokst\u00f8rder leses fortellinger om f\u00f8lelser. F\u00f8lelseshjul og f\u00f8lelsesbarometer p\u00e5 veggen gir daglige referanser. Temaet oppfyller Rammeplanens m\u00e5l for sosial kompetanse og kommunikasjon.',
    assessmentRubric: [
      { skill: 'F\u00f8lelsesgjenkjenning', emerging: 'identifiserer glad og trist med st\u00f8tte', proficient: 'identifiserer selvstendig 4\u20135 grunnf\u00f8lelser i ansiktsuttrykk', advanced: 'identifiserer nyanserte f\u00f8lelser og forklarer hva som kan utl\u00f8se dem' },
      { skill: 'Situasjon-f\u00f8lelse-kobling', emerging: 'kobler 1\u20132 situasjoner med riktig f\u00f8lelse med st\u00f8tte', proficient: 'kobler selvstendig 3\u20134 situasjoner med passende f\u00f8lelser', advanced: 'kobler komplekse situasjoner og forklarer hvorfor f\u00f8lelsen oppst\u00e5r' },
      { skill: 'Empatisk respons', emerging: 'gjenkjenner at noen er lei seg med voksenprompt', proficient: 'gjenkjenner andres f\u00f8lelser og foresl\u00e5r enkel tr\u00f8st', advanced: 'identifiserer f\u00f8lelser hos andre og foresl\u00e5r flere passende handlinger' },
    ],
  },

  'fairy-tales': {
    snippetAnswer: 'Eventyr-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker figurer som trollet, prinsessen og de tre bukkene Bruse til \u00e5 \u00f8ve sekvens, telling og fargelegging. Eventyrets magi driver sterk motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Eventyrtemaet er unikt kraftfullt for f\u00f8rskolebarn fordi tre- og fire\u00e5ringer er i den alderen der magisk tenkning blomstrer \u2014 de lever seg inn i historier med hele seg og skiller ikke skarpt mellom fantasi og virkelighet. Denne innlevelsesevnen gj\u00f8r at eventyroppgaver f\u00f8les som lek snarere enn arbeid. Norske folkeeventyr som De tre bukkene Bruse, Pannekaka og Askeladden gir kulturell forankring og gjenkjennelse. Sekvensiell ordning av eventyrscener bygger narrativ forst\u00e5else og logisk tenkning. Telling av eventyrelementer (tre bukker, syv sm\u00e5 geiter) forbinder matematikk med historie. Rammeplan for barnehagen legger vekt p\u00e5 kunst, kultur og kreativitet, og eventyr er selve kjernen i norsk barnekulturtradisjon.',
    developmentalMilestones: [
      { milestone: 'Narrativ forst\u00e5else (3\u20134-\u00e5ringer begynner \u00e5 forst\u00e5 hendelsesrekkef\u00f8lge i historier)', howWeAddress: 'Sekvensoppgaver der barn ordner eventyrscener i riktig rekkef\u00f8lge (f\u00f8rst, s\u00e5, til slutt) bygger narrativ og temporal tenkning' },
      { milestone: 'Rolletaking og empati gjennom figurer', howWeAddress: 'Koblingsoppgaver der barn forbinder eventyrevfigurer med f\u00f8lelser og handlinger styrker sosial forst\u00e5else' },
      { milestone: 'Telling med eventyrgjenstander (tre bjorner, syv sm\u00e5 geiter)', howWeAddress: 'Telleaktiviteter med eventyrkarrakterer gj\u00f8r matematikk meningsfull gjennom kjente historier' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk de mest kjente eventyrene (De tre bukkene Bruse, R\u00f8dhette), hold sekvensene til 2\u20133 scener, og les eventyret h\u00f8yt f\u00f8r oppgaven. For avanserte f\u00f8rskolebarn introduser lengre eventyr, la dem tegne egne eventyrscener og utfordre med telling av flere typer elementer i \u00e9n scene.',
    parentTakeaway: 'Eventyr er kanskje den mest verdifulle l\u00e6ringsaktiviteten foreldre kan tilby. Les et eventyr h\u00f8yt og la barnet gjenfortelle med egne ord. Still sp\u00f8rsm\u00e5l underveis: \u00abHva tror du skjer n\u00e5?\u00bb Bruk oppgaveark som forst\u00e5elsessjekk etter h\u00f8ytlesingen. La barnet dramatisere eventyrene med kosedyr eller figurer \u2014 denne aktive bearbeidingen styrker b\u00e5de spr\u00e5k, hukommelse og sosial forst\u00e5else.',
    classroomIntegration: 'Eventyrtemaet er sentralt i f\u00f8rskolens kulturarbeid: i samlingen leses eventyret h\u00f8yt, ved l\u00e6ringsstasjoner arbeides med eventyroppgaver og sekvensark, i teaterhjornet dramatiseres fortellingen, og i kunstkroken tegnes og males eventyrscener. Hvert eventyr kan b\u00e6re en hel temauke. Denne dype kulturelle integrasjonen oppfyller Rammeplanens m\u00e5l for kunst, kultur, kreativitet og spr\u00e5kstimulering.',
    assessmentRubric: [
      { skill: 'Eventyrsekvensering', emerging: 'ordner 2 eventyrscener i rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 scener fra et kjent eventyr', advanced: 'ordner 5+ scener og gjenforteller eventyret mens det ordner' },
      { skill: 'Telling med eventyrfigurer', emerging: 'teller 1\u20133 figurer med st\u00f8tte', proficient: 'teller selvstendig opp til 10 eventyrelementer', advanced: 'teller og sammenligner mengder (flere geiter enn bjorner)' },
      { skill: 'Eventyrgjenfortelling', emerging: 'navngir hovedfiguren med st\u00f8tte', proficient: 'gjenforteller hovedhandlingen med 3\u20134 hendelser', advanced: 'gjenforteller med detaljer, f\u00f8lelser og forklarer hvorfor ting skjer' },
    ],
  },

  farm: {
    snippetAnswer: 'G\u00e5rd-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker bondeg\u00e5rdsdyr, traktorer og avlinger til \u00e5 \u00f8ve telling, sortering og fargelegging. Barnets kj\u00e6rlighet for dyr og maskiner driver engasjementet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'G\u00e5rdstemaet er ideelt for f\u00f8rskolebarn fordi bondeg\u00e5rden kombinerer alt tre- og fire\u00e5ringer elsker: dyr, maskiner, mat og utend\u00f8rs liv. Denne tematiske rikdommen gir mangfoldige l\u00e6ringsmuligheter i \u00e9n kontekst. Telling av g\u00e5rdsdyr trener tallforst\u00e5else, sortering av dyr mot avlinger bygger kategorisk tenkning, og fargelegging av g\u00e5rdsscener utvikler finmotorikk. G\u00e5rden tilbyr ogs\u00e5 naturlige muligheter for \u00e5 l\u00e6re om mat og hvor den kommer fra \u2014 melk fra kua, egg fra h\u00f8na. Bondeg\u00e5rden er en viktig del av norsk n\u00e6ringshistorie, og Rammeplan for barnehagen vektlegger barns forst\u00e5else av n\u00e6rmilj\u00f8 og samfunn.',
    developmentalMilestones: [
      { milestone: 'Dyregjenkjenning og lydkobling (3\u20134-\u00e5ringer l\u00e6rer \u00e5 koble dyr med lydene de lager)', howWeAddress: 'Koblingsoppgaver der barn parrer g\u00e5rdsdyr med lydord (ku-m\u00f8\u00f8, hane-kykeliky) styrker auditiv bevissthet og ordforr\u00e5d' },
      { milestone: 'Telling og gruppering av dyr', howWeAddress: 'Tell-g\u00e5rdsdyr-oppgaver med forskjellige dyrearter i en g\u00e5rdsscene \u00f8ver en-til-en-korrespondanse og sortering' },
      { milestone: 'Forst\u00e5else av mat og opprinnelse', howWeAddress: 'Koble-dyr-til-produkt-aktiviteter (ku til melk, h\u00f8ne til egg) bygger \u00e5rsak-virkning-forst\u00e5else og naturfaglig kunnskap' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, begrens til tre\u2013fire kjente g\u00e5rdsdyr (ku, gris, h\u00f8ne), bruk lekefigurer som supplement, og fokuser p\u00e5 \u00e9n aktivitetstype om gangen. For avanserte f\u00f8rskolebarn utvid med flere dyrearter og produkter, introduser enkel telling p\u00e5 tvers av kategorier og la dem tegne sin egen bondeg\u00e5rd.',
    parentTakeaway: 'Bondeg\u00e5rden er et vindu til hvor maten v\u00e5r kommer fra. Bes\u00f8k en \u00e5pen g\u00e5rd hvis mulig, eller utforsk bondeg\u00e5rdsdyr gjennom bildb\u00f8ker. Tell dyrene i boka sammen, snakk om hva de spiser, og koble til maten p\u00e5 bordet (\u00abmelken vi drikker kommer fra kua\u00bb). Oppgavearkene forsterker disse forbindelsene og gj\u00f8r hverdagsmaten til en l\u00e6ringsanledning.',
    classroomIntegration: 'G\u00e5rdstemaet er perfekt for f\u00f8rskolens naturarbeid: i samlingen synges bondeg\u00e5rdssanger og vises dyrebilder, ved l\u00e6ringsstasjoner arbeides med g\u00e5rdsoppgaver, i rolleleken drives bondeg\u00e5rd med lekefigurer, og p\u00e5 tur bes\u00f8kes en lokal g\u00e5rd. Denne kobling mellom oppgaveark og virkelige opplevelser oppfyller Rammeplanens m\u00e5l for natur, milj\u00f8 og n\u00e6rmilj\u00f8forst\u00e5else.',
    assessmentRubric: [
      { skill: 'G\u00e5rdsdyrgjenkjenning', emerging: 'navngir 2\u20133 g\u00e5rdsdyr med st\u00f8tte', proficient: 'navngir selvstendig 5\u20136 g\u00e5rdsdyr og kobler dem med lyder', advanced: 'navngir 8+ g\u00e5rdsdyr, kobler med lyder og produkter, og forklarer forskjeller' },
      { skill: 'Telling i g\u00e5rdsscener', emerging: 'teller 1\u20135 dyr med st\u00f8tte', proficient: 'teller selvstendig opp til 10 g\u00e5rdsgjenstander', advanced: 'teller over 10 og sorterer i kategorier (dyr, maskiner, planter)' },
      { skill: 'Dyr-produkt-kobling', emerging: 'kobler 1\u20132 dyr med produkter med st\u00f8tte (ku-melk)', proficient: 'kobler selvstendig 3\u20134 dyr med riktige produkter', advanced: 'kobler 5+ dyr-produkt-par og forklarer prosessen' },
    ],
  },

  flowers: {
    snippetAnswer: 'Blomster-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker fargerike blomsterbilder til \u00e5 \u00f8ve fargelegging, telling og m\u00f8nstergjenkjenning. Barnets naturlige glede ved vakre blomster driver engasjementet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Blomstertemaet er ideelt for f\u00f8rskolebarn fordi blomster tilbyr en visuell og sanselig rikdom som tiltrekker tre- og fire\u00e5ringer umiddelbart. Barn i denne alderen elsker \u00e5 plukke blomster, lukte p\u00e5 dem og gi dem bort \u2014 denne emosjonelle forbindelsen gj\u00f8r blomsteropppgaver naturlig motiverende. Blomster tilbyr rike muligheter for fargel\u00e6ring (r\u00f8de roser, gule tulipaner), telling av kronblader, og m\u00f8nsterarbeid med gjentakende blomsterrekker. Fargelegging av detaljerte blomster utvikler finmotorikk og estetisk sans. Rammeplan for barnehagen vektlegger natur og milj\u00f8, og blomster er en tilgjengelig inngangsport til naturfaglig utforskning for de yngste.',
    developmentalMilestones: [
      { milestone: 'Fargegjenkjenning gjennom naturlige referanser (blomster har tydelige, navngitte farger)', howWeAddress: 'Farge-kobling-oppgaver der barn parrer blomster med fargenavn styrker b\u00e5de fargebegrep og botanisk ordforr\u00e5d' },
      { milestone: 'Telling av sm\u00e5 mengder (kronblader, blomster i en vase)', howWeAddress: 'Tell-kronblader- og tell-blomster-aktiviteter gj\u00f8r matematikk visuelt og engasjerende' },
      { milestone: 'M\u00f8nstergjenkjenning med farger og former', howWeAddress: 'Blomsterrekke-m\u00f8nstre (r\u00f8d-gul-r\u00f8d-gul) bygger tidlig algebraisk tenkning i en estetisk kontekst' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk store, enkle blomstermotiver med tykke konturer, fokuser p\u00e5 \u00e9n aktivitet om gangen, og legg til virkelige blomster som sanselig supplement. For avanserte f\u00f8rskolebarn introduser mer detaljerte blomster, legg til bokstavsporing av blomsternavn og utfordre med m\u00f8nsteroppgaver med tre elementer.',
    parentTakeaway: 'Blomster er et gratis l\u00e6remiddel som finnes overalt. Plukk blomster p\u00e5 tur og tell kronbladene hjemme, sorter etter farge og st\u00f8rrelse, og press blomster i en bok. Plant fr\u00f8 sammen og f\u00f8lg veksten \u2014 dette gir en lang l\u00e6ringsbue fra fr\u00f8 til blomst. Oppgavearkene kobler papirl\u00e6ring til disse virkelige naturopplevelsene og styrker b\u00e5de spr\u00e5k og naturfaglig nysgjerrighet.',
    classroomIntegration: 'Blomstertemaet f\u00f8lger \u00e5rstidene i f\u00f8rskolen: om v\u00e5ren plantes fr\u00f8 og observeres spiring, om sommeren plukkes blomster p\u00e5 tur, i samlingen navngis blomster og farger, og ved l\u00e6ringsstasjoner arbeides med blomsteroppgaver. Pressing av blomster og laging av buketter gir sanselige opplevelser som forankrer oppgavearkenes l\u00e6ring. Temaet st\u00f8tter Rammeplanens m\u00e5l for natur, milj\u00f8 og skapende aktiviteter.',
    assessmentRubric: [
      { skill: 'Blomster-farge-kobling', emerging: 'kobler 1\u20132 blomster med riktig farge med st\u00f8tte', proficient: 'kobler selvstendig 4\u20135 blomster med fargenavn', advanced: 'kobler 6+ blomster med farger og navngir blomstene' },
      { skill: 'Telling av blomsterelementer', emerging: 'teller 1\u20135 kronblader/blomster med st\u00f8tte', proficient: 'teller selvstendig opp til 10 og kobler med tall', advanced: 'teller over 10 og sammenligner mengder (flere r\u00f8de enn gule blomster)' },
      { skill: 'Blomsterfargelegging (finmotorikk)', emerging: 'fargelegger med brede str\u00f8k, delvis utenfor konturene', proficient: 'fargelegger blomster innenfor konturene med varierte farger', advanced: 'legger til detaljer som nyanser, blader og bakgrunnsm\u00f8nstre' },
    ],
  },

  food: {
    snippetAnswer: 'Mat-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker frukt, gr\u00f8nnsaker og kjente matvarer til \u00e5 \u00f8ve sortering, telling og fargelegging. Barns daglige matopplevelser gj\u00f8r temaet personlig og motiverende. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Mattemaet er ekstra effektivt for f\u00f8rskolebarn fordi mat er den mest hverdagslige og gjenkjennelige konteksten tre- og fire\u00e5ringer har. Hvert m\u00e5ltid er en potensiell l\u00e6ringsarena, og oppgaveark bygger bro mellom bordets konkrete opplevelser og papirets abstrakte aktiviteter. Sortering av frukt og gr\u00f8nnsaker bygger kategoritenkning, telling av matvarer trener tallforst\u00e5else, og fargelegging av kjente matvarer gir finmotorisk \u00f8velse uten frustrasjon. Matoppgaver gir ogs\u00e5 en naturlig inngang til samtaler om sunn mat og gode vaner. Rammeplan for barnehagen vektlegger m\u00e5ltider som l\u00e6rings- og samv\u00e6rsarena, og matoppgaver forsterker denne koblingen.',
    developmentalMilestones: [
      { milestone: 'Kategorisering av mat (3\u20134-\u00e5ringer l\u00e6rer \u00e5 skille mellom mattyper)', howWeAddress: 'Sorteringsoppgaver der barn grupperer mat i kategorier (frukt, gr\u00f8nnsaker, br\u00f8d) bygger logisk klassifisering med kjente gjenstander' },
      { milestone: 'Telling av hverdagsgjenstander', howWeAddress: 'Tell-epler-og-bananer-oppgaver gj\u00f8r tall personlige og meningsfulle gjennom matvarer barnet kjenner' },
      { milestone: 'Fargegjenkjenning gjennom matvarer', howWeAddress: 'Farge-mat-kobling (r\u00f8d tomat, gul banan, gr\u00f8nn agurk) styrker b\u00e5de fargebegrep og matvareordforr\u00e5d' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, bruk de mest kjente matvarene (eple, banan, br\u00f8d), hold sorteringen til to kategorier, og legg til virkelig frukt som sanselig supplement. For avanserte f\u00f8rskolebarn utvid med flere matvaregrupper, introduser telling p\u00e5 tvers av kategorier og la dem tegne sin egen matbutikkhylle med spesifiserte varer.',
    parentTakeaway: 'Kj\u00f8kkenet og matbordet er daglige l\u00e6ringsarenaer. La barnet hjelpe til med \u00e5 telle frukt ved handletur, sortere gr\u00f8nnsaker etter farge, og navngi matvarene n\u00e5r dere pakker ut. Under m\u00e5ltider kan dere snakke om farger og former p\u00e5 maten. Oppgavearkene gir barnet verkt\u00f8y for \u00e5 bearbeide disse daglige matopplevelsene gjennom strukturerte aktiviteter.',
    classroomIntegration: 'Mattemaet er uadskillelig fra f\u00f8rskolens daglige rutiner: m\u00e5ltidene brukes som daglige l\u00e6ringsarenaer der det navngis, telles og sorteres, i samlingen snakkes det om sunn mat og m\u00e5ltidsvaner, ved l\u00e6ringsstasjoner arbeides med matoppgaver, og i kj\u00f8kkenkroken lages det enkle retter. Denne hverdagsn\u00e6re integrasjonen oppfyller Rammeplanens m\u00e5l for m\u00e5ltider, helse og mestring.',
    assessmentRubric: [
      { skill: 'Matkategorisering', emerging: 'sorterer mat i 2 grupper med st\u00f8tte (frukt/gr\u00f8nnsaker)', proficient: 'sorterer selvstendig i 3\u20134 matgrupper', advanced: 'sorterer etter flere kriterier og forklarer valgene (sunt/usunt, r\u00e5tt/kokt)' },
      { skill: 'Telling av matvarer', emerging: 'teller 1\u20135 matvarer med st\u00f8tte', proficient: 'teller selvstendig opp til 10 og kobler med tall', advanced: 'teller over 10 og l\u00f8ser enkle \u00abhvor mange trenger vi\u00bb-oppgaver' },
      { skill: 'Farge-mat-kobling', emerging: 'kobler 1\u20132 matvarer med fargenavn med st\u00f8tte', proficient: 'kobler selvstendig 4\u20135 matvarer med riktig farge', advanced: 'kobler 6+ matvarer med farger og navngir matvaren og fargen' },
    ],
  },

  forest: {
    snippetAnswer: 'Skog-oppgaver for f\u00f8rskolen (3\u20134 \u00e5r) bruker tr\u00e6r, dyr og naturmaterialer til \u00e5 \u00f8ve telling, sortering og fargelegging. Barnehagens skogsturer gir naturlig forbindelse til oppgavearkene. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Skogtemaet har en s\u00e6rstilling i norsk f\u00f8rskolekultur fordi skogen er selve arnestedet for norsk friluftsliv og barnehagepedagogikk. Tre- og fire\u00e5ringer som g\u00e5r i naturbarnehage eller har jevnlige utedager, har f\u00f8rsteh\u00e5ndsopplevelser med tr\u00e6r, blader, kongler og skogsdyr som gj\u00f8r oppgavearkene umiddelbart meningsfulle. Denne broen mellom utend\u00f8rsopplevelse og papirl\u00e6ring er kanskje den sterkeste l\u00e6ringsforsterkeren i f\u00f8rskolepedagogikken. Telling av kongler og blader trener tallforst\u00e5else, sortering av naturmaterialer bygger kategorisk tenkning, og fargelegging av skogsdyr utvikler finmotorikk. Rammeplan for barnehagen legger s\u00e6rlig vekt p\u00e5 natur, milj\u00f8 og friluftsliv, og skogtemaet er selve kjernen i dette m\u00e5lomr\u00e5det.',
    developmentalMilestones: [
      { milestone: 'Naturmaterialegjenkjenning (3\u20134-\u00e5ringer l\u00e6rer \u00e5 navngi blader, kongler, steiner, pinner)', howWeAddress: 'Koblingsoppgaver der barn parrer naturmaterialer med navn og bilder bygger naturfaglig ordforr\u00e5d gjennom h\u00e5ndgripelige gjenstander' },
      { milestone: 'Kategorisk sortering av naturfunn', howWeAddress: 'Sorteringsaktiviteter der barn grupperer skogsfunn etter type (blader, kongler, steiner) eller egenskap (stor/liten, glatt/ru) trener logikk' },
      { milestone: 'Telling med naturgjenstander', howWeAddress: 'Tell-kongler-og-blader-oppgaver forankrer matematikk i barnets utend\u00f8rsopplevelser og gj\u00f8r tall konkrete' },
    ],
    differentiationNotes: 'For f\u00f8rskolebarn som trenger st\u00f8tte, fokuser p\u00e5 de mest kjente skogsobjektene (ekorn, blad, kongle), bruk ekte naturmaterialer som supplement, og hold scenene enkle. For avanserte f\u00f8rskolebarn legg til flere skogsarter, introduser enkel \u00f8kologisk sortering (levende/ikke-levende, plante/dyr) og la dem tegne sin egen skogscene med spesifiserte elementer.',
    parentTakeaway: 'Skogen er Norges gr\u00f8nne klasserom. Ta med barnet p\u00e5 skogstur og samle blader, kongler og steiner. Tell funnene hjemme, sorter dem etter st\u00f8rrelse og type, og press bladene i en bok. Disse f\u00f8rsteh\u00e5ndsopplevelsene gj\u00f8r oppgavearkene langt mer meningsfulle. La barnet fortelle om hva det s\u00e5 i skogen \u2014 det styrker b\u00e5de ordforr\u00e5d og fortellekompetanse.',
    classroomIntegration: 'Skogtemaet er uadskillelig fra den norske f\u00f8rskolens utend\u00f8rspraksis: p\u00e5 skogsturer samles naturmaterialer, i samlingen snakkes det om skogens dyr og \u00e5rstider, ved l\u00e6ringsstasjoner arbeides med skogtematiske oppgaver, og i sanserommet utforskes bark, mose og kongler. Ukentlige utedager gir den virkelighetforankringen som gj\u00f8r oppgavearkene meningsfulle. Rammeplanens m\u00e5l for natur, milj\u00f8 og friluftsliv er skogtemaets kjerne.',
    assessmentRubric: [
      { skill: 'Naturmaterialegjenkjenning', emerging: 'navngir 2\u20133 skoggjenstander med st\u00f8tte (blad, kongle, pinne)', proficient: 'navngir selvstendig 5\u20136 naturmaterialer og sorterer dem', advanced: 'navngir 8+ materialer, forklarer hvor de kommer fra og sorterer etter flere egenskaper' },
      { skill: 'Telling i skogsscener', emerging: 'teller 1\u20135 skogsgjenstander med st\u00f8tte', proficient: 'teller selvstendig opp til 10 i en skogsscene', advanced: 'teller over 10 og sammenligner mengder (flere blader enn sopper)' },
      { skill: 'Visuell diskriminering (skogssilhuetter)', emerging: 'kobler 2\u20133 silhuetter med st\u00f8tte', proficient: 'kobler selvstendig 5\u20136 skogssilhuetter med riktige bilder', advanced: 'kobler komplekse silhuetter og beskriver hvilke trekk som avsl\u00f8rer gjenstanden' },
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
