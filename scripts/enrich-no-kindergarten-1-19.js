#!/usr/bin/env node
/**
 * SEO Part 256: NO Kindergarten Grade Enrichment — Themes 1-19
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 19 NO theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: 'Alfabet-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener bokstavgjenkjenning, lyd-bokstav-forbindelser og selvstendig skriving slik at barna mestrer alle 29 norske bokstaver. Ordsporings- og lydaktiviteter bygger lesefundamentet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Barnehageklassen er det avgj\u00f8rende \u00e5ret for alfabetmestring \u2014 fem- og seks\u00e5ringer forventes \u00e5 g\u00e5 fra delvis bokstavkjennskap til full gjenkjenning av alle 29 norske bokstaver (inkludert \u00e6, \u00f8, \u00e5) med automatikk. Mens f\u00f8rskolebarn sporet bokstaver og koblet dem med bilder, arbeider barn i barnehageklassen med lyd-bokstav-korrespondanse, begynnelsesbokstaver og selvstendig bokstavskriving p\u00e5 linjert papir. Ordsporing og enkle ords\u00f8kaktiviteter introduserer lesing som funksjonell ferdighet. Kunnskapsl\u00f8ftet (LK20) og Rammeplan for barnehagen legger vekt p\u00e5 kommunikasjon, spr\u00e5k og tekst, og v\u00e5re oppgaveark bygger systematisk mot dette m\u00e5let med varierte aktivitetstyper.',
    developmentalMilestones: [
      { milestone: 'Automatisk bokstavgjenkjenning (5\u20136-\u00e5ringer skal kunne navngi alle bokstaver uten nøling)', howWeAddress: 'Hurtiggjenkjenningsaktiviteter og koblingsark med blandede bokstaver i ulike skrifttyper trener automatikk' },
      { milestone: 'Lyd-bokstav-forbindelse (barn l\u00e6rer \u00e5 koble hver bokstavform med prim\u00e6rlyden)', howWeAddress: 'Begynnelsesbokstav-kobling og lydsorterings\u00f8velser knytter bokstaver til meningsfulle ord fra hverdagen' },
      { milestone: 'Selvstendig bokstavskriving (overgang fra sporing til produksjon fra hukommelsen)', howWeAddress: 'Skriveark med linjerte felt som g\u00e5r fra prikkede modeller til tomme linjer bygger skriveselvstendighet gradvis' },
      { milestone: 'Fonemisk bevissthet (evnen til \u00e5 isolere f\u00f8rste lyd i et ord)', howWeAddress: 'Finn-begynnelsesbokstaven-aktiviteter og rim\u00f8velser styrker den lydlige analysen som er grunnlaget for lesing' },
    ],
    differentiationNotes: 'For barn som fortsatt strever med bokstavgjenkjenning, begrens til 5\u20136 bokstaver om gangen med t\u00e8tt visuell st\u00f8tte og multisensorisk \u00f8ving (sandpapirbokstaver, modellerleire). For avanserte barn i barnehageklassen som allerede leser, utfordre med ordforvirringsoppgaver, enkle kryssord og bokstavlyder i flerlydsord.',
    parentTakeaway: 'Barnehageklassen er \u00e5ret da bokstavene skal sitte fast. Les h\u00f8yt sammen hver dag og pek p\u00e5 bokstaver i teksten. Lek \u00abhva begynner med ...?\u00bb p\u00e5 handleturene. La barnet skrive navnet sitt og familiens navn. Bokstavmagneter p\u00e5 kj\u00f8leskapet gj\u00f8r alfabetet synlig hele dagen.',
    classroomIntegration: 'Alfabetoppgaver brukes som daglig oppvarming i samlingen: mandag bokstavgjenkjenning, tirsdag lydkobling, onsdag sporing og skriving, torsdag ords\u00f8k, fredag bokstavpuslespill. Ukens bokstav f\u00e5r sin egen l\u00e6ringsstasjon med oppgaveark, konkrete materialer og b\u00f8ker. Kunnskapsl\u00f8ftets m\u00e5l for skriftspr\u00e5kutvikling integreres systematisk i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Bokstavgjenkjenning (store og sm\u00e5)', emerging: 'gjenkjenner 10\u201315 bokstaver med noe nøling og forveksler lignende former (b/d, p/q)', proficient: 'gjenkjenner alle 29 bokstaver i store og sm\u00e5 former innen f\u00e5 sekunder', advanced: 'gjenkjenner bokstaver i alle skrifttyper og kan navngi dem baklengs og i tilfeldig rekkef\u00f8lge' },
      { skill: 'Lyd-bokstav-korrespondanse', emerging: 'forbinder 8\u201312 bokstaver med prim\u00e6rlyden med st\u00f8tte', proficient: 'produserer selvstendig prim\u00e6rlyden for alle bokstaver', advanced: 'kjenner alternative lyder (bl\u00f8t/hard d, kort/lang vokal) og bruker dem ved avkoding' },
      { skill: 'Bokstavskriving', emerging: 'skriver 10\u201315 bokstaver leselig med modell', proficient: 'skriver alle bokstaver leselig fra hukommelsen p\u00e5 linjert papir', advanced: 'skriver raskt og korrekt og danner spontant korte ord som hund, sol, katt' },
    ],
  },

  animals: {
    snippetAnswer: 'Dyre-oppgaver for barnehageklassen (5\u20136 \u00e5r) kombinerer telling til 20, addisjon og subtraksjon innenfor 10, og naturfaglig klassifisering med engasjerende dyremotiver. Barna l\u00e6rer \u00e5 gruppere dyr etter egenskaper. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Barnehageklassen er \u00e5ret da dyrenes verden \u00e5pner seg faglig \u2014 fem- og seks\u00e5ringer g\u00e5r fra \u00e5 elske dyr til \u00e5 l\u00e6re om dem systematisk. Mens f\u00f8rskolebarn sorterte etter enkel farge eller st\u00f8rrelse, kan barn i barnehageklassen klassifisere etter flere egenskaper samtidig: antall bein, kroppsdekke og levested. Telling n\u00e5r opp til 20 med dyregrupper, og addisjon og subtraksjon innenfor 10 introduseres med visuelle dyretellere (fem fugler minus to som flyr bort). Dyrenavn brukes i begynnende lese\u00f8velser og ordsporing. Rammeplan for barnehagen og LK20 underst\u00f8tter naturfaglig utforskning direkte p\u00e5 dette alderstrinnet.',
    developmentalMilestones: [
      { milestone: 'Klassifisering etter flere egenskaper (5\u20136-\u00e5ringer kan sortere etter to kriterier samtidig)', howWeAddress: 'Sorteringsark som grupperer dyr etter b\u00e5de levested og kroppsdekke bygger logisk tenkning p\u00e5 to dimensjoner' },
      { milestone: 'Addisjon og subtraksjon innenfor 10 (barnehageklassens matematiske milep\u00e6l)', howWeAddress: 'Dyrescener med addisjon (tre katter pluss to katter) og subtraksjon (fem fugler minus to) gir konkret representasjon' },
      { milestone: 'Ordgjenkjenning og staving av dyrenavn (begynnende lesing)', howWeAddress: 'Ordsporing og ords\u00f8kark med dyreord p\u00e5 3\u20135 bokstaver trener lesefundamentet med motiverende innhold' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til velk\u00e8nte husdyr (katt, hund, ku), bruk konkrete dyrefigurer som supplement, og hold matematikken innenfor 5. For avanserte barn i barnehageklassen, utfordre med eksotiske dyr, flertrinnsoppgaver og selvstendig skriving av dyrefakta.',
    parentTakeaway: 'Bes\u00f8k en dyreparken eller en bondeg\u00e5rd og tell dyr sammen \u2014 hvor mange geiter? Flere enn sauer? La barnet tegne et dyr og skrive navnet. Les dyreb\u00f8ker og still sp\u00f8rsm\u00e5l: \u00abhvor bor den?\u00bb og \u00abhva spiser den?\u00bb. Disse samtalene gj\u00f8r naturfag personlig og bygger ordforr\u00e5det som driver lesing.',
    classroomIntegration: 'Dyreoppgaver integreres i barnehageklassens naturfagsundervisning: ukentlige dyreoppdagelser med tilh\u00f8rende oppgaveark, l\u00e6ringsstasjoner med sorterings\u00f8velser og dyrefigurer, mattekroken med addisjons- og subtraksjonsark og dyretellere, og lesekroken med dyreords\u00f8k. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Dyreklassifisering', emerging: 'sorterer dyr i to grupper etter \u00e9n egenskap med st\u00f8tte', proficient: 'sorterer selvstendig etter to egenskaper (levested og kroppsdekke)', advanced: 'oppretter egne klassifiseringskriterier og forklarer dem muntlig' },
      { skill: 'Addisjon/subtraksjon med dyretellere', emerging: 'l\u00f8ser oppgaver innenfor 5 med konkret st\u00f8tte (figurer/bilder)', proficient: 'l\u00f8ser selvstendig oppgaver innenfor 10 med visuelle dyretellere', advanced: 'l\u00f8ser oppgaver innenfor 10 mentalt og forklarer regnestykket muntlig' },
      { skill: 'Lesing av dyrenavn', emerging: 'gjenkjenner 3\u20134 dyreord med bildest\u00f8tte', proficient: 'leser selvstendig 8\u201310 dyrenavn og staver dem i ords\u00f8k', advanced: 'leser nye dyrenavn ved avkoding og skriver dem selvstendig' },
    ],
  },

  birds: {
    snippetAnswer: 'Fugle-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling til 20, m\u00f8nstergjenkjenning og begynnende lesing med norske fugler som svarttrost, kj\u00f8ttmeis og r\u00f8dstr\u00f8pe. Naturfaglig klassifisering integreres naturlig. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Fugletemaet er ideelt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan observere systematisk \u2014 de kan sitte stille, telle fugler ved fuglebrettet og registrere resultatene. Denne evnen til fokusert observasjon er ny sammenlignet med f\u00f8rskolens spontane utbrudd. Fugler tilbyr naturlig addisjon (tre kj\u00f8ttmeiser pluss to svarttroster), m\u00f8nstergjenkjenning (fjordrakt, nebbform) og sekvensering (livssyklus fra egg til voksen). Fuglenavn p\u00e5 3\u20136 bokstaver er perfekte for begynnende lesing. Rammeplan for barnehagen og LK20 st\u00f8tter naturfaglig observasjon og registrering direkte.',
    developmentalMilestones: [
      { milestone: 'Systematisk observasjon (5\u20136-\u00e5ringer utvikler evnen til fokusert, m\u00e5lrettet iakttakelse)', howWeAddress: 'Fugleobservasjons- og telleark som krever at barna skanner et bilde systematisk trener observasjonsferdigheter' },
      { milestone: 'M\u00f8nstergjenkjenning (gjenkjenning av gjentakende strukturer)', howWeAddress: 'Fjordrakt-m\u00f8nsterark og fuglesekvenser bygger den m\u00f8nstertenkningen som er grunnlag for matematikk' },
      { milestone: 'Livssyklusforst\u00e5else (egg \u2192 unge \u2192 voksen fugl)', howWeAddress: 'Sekvenserings\u00f8velser med fuglens livssyklus i tre til fire trinn bygger tidslig og biologisk forst\u00e5else' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 tre velkjente fugler (svarttrost, due, m\u00e5ke), bruk fuglebilder med tydelige kjennetegn, og hold tellingen innenfor 10. For avanserte barn i barnehageklassen, introduser trekkfugler mot standfugler, fuglekryssord og selvstendig skriving av fuglefakta.',
    parentTakeaway: 'Sett opp et fuglebrett og tell fugler sammen \u2014 det er gratis matematikk og naturfag. La barnet f\u00f8re en enkel fugledagbok: \u00abjeg s\u00e5 3 kj\u00f8ttmeiser.\u00bb Bes\u00f8k parken og lytt etter fuglesang. Bruk oppgavearkene som forberedelse og oppf\u00f8lging av uteobservasjoner.',
    classroomIntegration: 'Fugletemaet f\u00f8lger \u00e5rstidene i barnehageklassen: om vinteren telles fugler ved fuglebrettet, om v\u00e5ren observeres reir og egg, om sommeren lyttes det til fuglesang. Ved l\u00e6ringsstasjoner arbeides det med telle-, sorterings- og sporingsark. Mattetimen bruker fugler til addisjon og subtraksjon. Rammeplanens m\u00e5l for natur og matematikk integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Fuglegjenkjenning og observasjon', emerging: 'gjenkjenner 2\u20133 vanlige norske fugler med bildest\u00f8tte', proficient: 'gjenkjenner selvstendig 5\u20136 fugler og beskriver kjennetegnene deres', advanced: 'gjenkjenner 8+ fugler, kjenner navnene og enkle fakta (trekkfugl/standfugl)' },
      { skill: 'Telling og registrering (fuglekontekst)', emerging: 'teller 1\u201310 fugler i et bilde med st\u00f8tte', proficient: 'teller selvstendig opptil 20 fugler og noterer resultatet korrekt', advanced: 'teller, sammenligner og l\u00f8ser addisjonsoppgaver med fugletellingene' },
      { skill: 'Fugle-livssyklus', emerging: 'ordner 2 trinn (egg, fugl) med bildest\u00f8tte', proficient: 'ordner selvstendig 3 livssyklusfaser i korrekt rekkef\u00f8lge', advanced: 'ordner 4 faser og forklarer hva som skjer i hvert trinn med egne ord' },
    ],
  },

  birthday: {
    snippetAnswer: 'Bursdags-oppgaver for barnehageklassen (5\u20136 \u00e5r) kombinerer telling til 20, addisjon innenfor 10 og begynnende skriving med festlige motiver som kaker, gaver og ballonger. Tallene f\u00e5r personlig betydning. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Bursdagstemaet har en s\u00e6rlig kraft i barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang forst\u00e5r aldersbegrepet \u2014 de er stolte av \u00e5 v\u00e6re \u00abstore\u00bb og teller ivrig ned til neste bursdag. Denne personlige forbindelsen gj\u00f8r matematikk meningsfull: telling av lys p\u00e5 kaken, addisjon av gaver, og subtraksjon av ballonger som flyger bort. Barn i barnehageklassen kan skrive invitasjoner med enkle setninger og tall, noe som integrerer skriving i festkonteksten. Kunnskapsl\u00f8ftet og Rammeplanens m\u00e5l for tall og kommunikasjon m\u00f8tes i \u00e9t motiverende tema.',
    developmentalMilestones: [
      { milestone: 'Tallforst\u00e5else opp til 20 (5\u20136-\u00e5ringer mestrer telling med stigende sikkerhet)', howWeAddress: 'Telleaktiviteter med bursdagslys, gaver og gjester fra 1 til 20 gj\u00f8r telling personlig meningsfull' },
      { milestone: 'Addisjon og subtraksjon innenfor 10 (begynnende regning)', howWeAddress: 'Festscener med \u00ab5 ballonger pluss 3 ballonger\u00bb og \u00ab8 kakestykker minus 2 som blir spist\u00bb gir konkret regning' },
      { milestone: 'Funksjonell skriving (barn skriver med et form\u00e5l)', howWeAddress: 'Skriving av bursdagsinvitasjoner og \u00f8nskelister gir autentisk skrivetrening med personlig engasjement' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, hold tellingen innenfor 10, bruk \u00e9n-til-\u00e9n-peking med konkrete lys og ballonger, og tilby skrivemaler med prikkede bokstaver. For avanserte barn i barnehageklassen, tilf\u00f8y flertrinnsoppgaver (6 gjester pluss 4 gjester, 3 kaker med 5 lys hver) og selvstendig skriving av festbeskrivelser.',
    parentTakeaway: 'Bruk barnets egen bursdag som l\u00e6ringsanledning: tell lys p\u00e5 kaken, skriv gjestelist sammen, fordel godteri likt og tell gaver. Lesing av bursdagskort trener bokstavgjenkjenning. Hver bursdag i familien er en minimatematikktime \u2014 og barnet elsker det fordi det handler om dem.',
    classroomIntegration: 'Bursdagstemaet brukes til feiring av barnas bursdager med l\u00e6ringsinnhold: bursdagsbarnet f\u00e5r et s\u00e6rlig matteark, klassen teller og skriver felleskort, og bursdagskalenderen brukes til m\u00e5nedstall og rekkef\u00f8lge. Kunnskapsl\u00f8ftets m\u00e5l for tall, kommunikasjon og sosiale ferdigheter integreres i feiringen.',
    assessmentRubric: [
      { skill: 'Telling til 20 (bursdagskontekst)', emerging: 'teller 1\u201310 bursdagsgjenstander med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og skriver de tilsvarende tallene korrekt', advanced: 'teller over 20 og sammenligner mengder (flere lys enn gaver)' },
      { skill: 'Addisjon/subtraksjon med festtema', emerging: 'l\u00f8ser addisjonsoppgaver innenfor 5 med konkret st\u00f8tte', proficient: 'l\u00f8ser selvstendig addisjons- og subtraksjonsoppgaver innenfor 10', advanced: 'l\u00f8ser flertrinnsoppgaver og formulerer egne regnestykker om fester' },
      { skill: 'Funksjonell skriving (invitasjoner/kort)', emerging: 'kopierer enkle ord fra modell (Gratulerer, navn)', proficient: 'skriver selvstendig korte setninger p\u00e5 kort og invitasjoner', advanced: 'skriver flere setninger med korrekt staving og kreativt innhold' },
    ],
  },

  body: {
    snippetAnswer: 'Kropp-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener kroppsdeler, telling (fingre, t\u00e6r), symmetri og begynnende helseforst\u00e5else. Barna l\u00e6rer \u00e5 navngi og skrive kroppsord. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Kropptemaet f\u00e5r en ny dimensjon i barnehageklassen fordi fem- og seks\u00e5ringer begynner \u00e5 forst\u00e5 kroppen som et system \u2014 ikke bare individuelle deler, men hvordan de fungerer sammen. Mens f\u00f8rskolebarn navnga hode, armer og bein, kan barn i barnehageklassen telle leddpar (to knær, to albuer), forst\u00e5 symmetri (venstre og h\u00f8yre h\u00e5nd) og relatere kroppsdeler til funksjon (\u00f8rer til \u00e5 h\u00f8re, \u00f8yne til \u00e5 se). Telling av fingre og t\u00e6r i grupper p\u00e5 fem og ti st\u00f8tter titallforst\u00e5else. Skriving av kroppsord med 3\u20135 bokstaver trener lesefundamentet. Rammeplanens m\u00e5l for kropp, bevegelse og helse m\u00f8tes i \u00e9t sammenheng.',
    developmentalMilestones: [
      { milestone: 'Kroppsbevissthet og funksjon (5\u20136-\u00e5ringer forst\u00e5r at kroppsdeler har spesifikke funksjoner)', howWeAddress: 'Koblingsark som forbinder kroppsdeler med sanser og funksjoner bygger biologisk grunnforst\u00e5else' },
      { milestone: 'Symmetriforst\u00e5else (gjenkjenning av venstre/h\u00f8yre og parrede kroppsdeler)', howWeAddress: 'Symmetriaktiviteter med kroppssilhuetter som skal fullf\u00f8res p\u00e5 begge sider trener romlig tenkning' },
      { milestone: 'Telling i grupper p\u00e5 fem og ti (fingre og t\u00e6r som naturlige telleenheter)', howWeAddress: 'Telling av fingre, t\u00e6r og andre kroppsdeler i grupper bygger forst\u00e5elsen av femtall og titall' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, bruk barnets egen kropp som referanse (ber\u00f8r nesen din, pek p\u00e5 albuen din), begrens til de mest grunnleggende delene, og hold tellingen konkret. For avanserte barn i barnehageklassen, introduser organnavn, skjelettet og enkle helseregler med tilh\u00f8rende skriveoppgaver.',
    parentTakeaway: 'Kroppen er alltid til stede som l\u00e6ringsverkt\u00f8y. Tell fingre og t\u00e6r ved leggetid, navngi kroppsdeler under badet, og lek \u00abSimon sier: ber\u00f8r kn\u00e6rne dine\u00bb for \u00e5 \u00f8ve ordforr\u00e5d og instruksjoner. Snakk om sunn mat og bevegelse i hverdagen \u2014 barnet l\u00e6rer at kroppen er noe man tar vare p\u00e5.',
    classroomIntegration: 'Kropptemaet integreres i barnehageklassens helseundervisning: i samlingen synges kroppssanger, ved l\u00e6ringsstasjoner arbeides det med navngivings- og telleark, i gym\u00f8kten beveges alle kroppsdeler bevisst, og i kunstkroken tegnes kroppssilhuetter i full st\u00f8rrelse. Rammeplanens m\u00e5l for kropp, bevegelse og helse underst\u00f8ttes gjennom integrert stasjonsarbeid.',
    assessmentRubric: [
      { skill: 'Kroppsdeler og funksjon', emerging: 'navngir 5\u20136 grunnleggende kroppsdeler med st\u00f8tte', proficient: 'navngir selvstendig 10+ kroppsdeler og kobler dem med riktig funksjon', advanced: 'forklarer hvordan flere kroppsdeler samarbeider (f.eks. \u00f8yne og hender n\u00e5r man tegner)' },
      { skill: 'Symmetri med kroppssilhuetter', emerging: 'fullf\u00f8rer en enkel kroppshalvdel med st\u00f8tte', proficient: 'fullf\u00f8rer selvstendig symmetriske kroppstegninger p\u00e5 begge sider', advanced: 'identifiserer symmetri i andre kontekster og forklarer begrepet med egne ord' },
      { skill: 'Telling i grupper (fingre/t\u00e6r)', emerging: 'teller fingre \u00e9n og \u00e9n opp til 10 med st\u00f8tte', proficient: 'teller i grupper p\u00e5 fem (5, 10, 15, 20) med kroppsdeler', advanced: 'bruker gruppertelling til \u00e5 l\u00f8se addisjonsoppgaver (to hender = 10 fingre)' },
    ],
  },

  camping: {
    snippetAnswer: 'Camping-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker telt, b\u00e5l og naturen til \u00e5 trene telling til 20, probleml\u00f8sning og begynnende kartlesing. Utefriluftskonteksten gir matematikk og lese\u00f8velser et eventyrlig preg. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Campingtemaet treffer barnehageklassen spesielt godt fordi fem- og seks\u00e5ringer er modne nok til \u00e5 planlegge og forberede \u2014 de elsker \u00e5 pakke sekken, telle gjenstander og organisere utstyr. Mens f\u00f8rskolebarn gled seg over b\u00e5l og telt som sensoriske opplevelser, kan barn i barnehageklassen bruke campingscenarier til reell matematikk: telling av pinner til b\u00e5let, addisjon av p\u00f8lser p\u00e5 grillen, og subtraksjon av marshmallows som blir spist. Enkel kartlesing og retningsforst\u00e5else introduseres med skattekart. Rammeplan for barnehagen legger vekt p\u00e5 friluftsliv og naturopplevelser, og campingtemaet bringer dette inn i strukturert l\u00e6ring.',
    developmentalMilestones: [
      { milestone: 'Planlegging og organisering (5\u20136-\u00e5ringer kan tenke fremover og forberede seg)', howWeAddress: 'Pakk-sekken-oppgaver der barn velger og teller n\u00f8dvendig campingutstyr trener planleggingsevne og tallforst\u00e5else' },
      { milestone: 'Romlig orientering og enkel kartlesing', howWeAddress: 'Skattekart og enkel retningsnavigasjon p\u00e5 oppgaveark bygger romlig forst\u00e5else og kartferdigheter' },
      { milestone: 'Addisjon og subtraksjon i virkelighetskontekst', howWeAddress: 'Campingmatematikk (5 pinner pluss 3 pinner til b\u00e5let, 8 marshmallows minus 2 spist) gir meningsfull regning' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til grunnleggende campingelementer (telt, sovepose, matpakke), hold tellingen innenfor 10, og bruk fysiske gjenstander som supplement. For avanserte barn i barnehageklassen, introduser avansert kartlesing, flertrinnsmatematikk og selvstendig skriving av campingdagbok.',
    parentTakeaway: 'Camping er l\u00e6ring i praksis. P\u00e5 familieturen, la barnet hjelpe med \u00e5 pakke sekken og telle gjenstander. Sett opp teltet sammen og tell stenger og plugger. Samle pinner og sorter etter st\u00f8rrelse. Selv en \u00abcamping i stuen\u00bb med teppe-telt gir anledning til \u00e5 \u00f8ve telling og planlegging med oppgavearkene.',
    classroomIntegration: 'Campingtemaet integreres i barnehageklassens friluftstid: p\u00e5 utedager \u00f8ves orientering og naturtelling, i samlingen leses eventyrb\u00f8ker om camping, ved l\u00e6ringsstasjoner arbeides det med pakkelister og telleark, og i rolleleken bygges leircamper med telt og b\u00e5l. Rammeplanens m\u00e5l for natur, friluftsliv og kropp integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Telling og planlegging (campingkontekst)', emerging: 'teller 1\u201310 campinggjenstander med st\u00f8tte', proficient: 'teller selvstendig opptil 20 gjenstander og organiserer dem i pakkeliste', advanced: 'planlegger selvstendig hva som trengs og regner ut antall med addisjon' },
      { skill: 'Romlig orientering og kartlesing', emerging: 'f\u00f8lger enkle retningsanvisninger (g\u00e5 rett frem) med st\u00f8tte', proficient: 'f\u00f8lger et enkelt skattekart med 3\u20134 trinn selvstendig', advanced: 'tegner egne enkle kart og gir retningsanvisninger til andre' },
      { skill: 'Probleml\u00f8sning med campingscenarier', emerging: 'l\u00f8ser enkle \u00abhvor mange til sammen\u00bb-oppgaver med konkret st\u00f8tte', proficient: 'l\u00f8ser selvstendig addisjons- og subtraksjonsoppgaver med campingmotiver', advanced: 'formulerer egne regneoppgaver basert p\u00e5 campingscenarier' },
    ],
  },

  circus: {
    snippetAnswer: 'Sirkus-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker klovner, akrobater og sirkusdyr til \u00e5 trene telling, sekvensering og kreativ skriving. Den magiske sirkusverdenen gir matematikk og lese\u00f8velser en dramatisk kontekst. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sirkustemaet er magisk for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan forst\u00e5 forestillingens dramaturgi \u2014 rekkef\u00f8lgen av numre, oppbyggingen mot h\u00f8ydepunktet og den spennende finalen. Denne sekvensforst\u00e5elsen overg\u00e5r f\u00f8rskolens enkle bilderekker. Telling av sirkusdyr i ringen, addisjon av klovner som kommer inn, og subtraksjon av ballonger som slipper l\u00f8s gir levende matematikk. M\u00f8nstergjenkjenning i sirkusdekorasjoner og akrobatformasjoner bygger algebraisk tenkning. Skriving av sirkusplakater og billetter gir funksjonell skrivetrening. Rammeplanens m\u00e5l for kunst, kultur og kreativitet st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Sekvensforst\u00e5else (5\u20136-\u00e5ringer kan f\u00f8lge og gjenfortelle hendelser i rekkef\u00f8lge)', howWeAddress: 'Sirkusprogram-sekvensering der barn ordner numre i riktig rekkef\u00f8lge trener narrativ og tidslig tenkning' },
      { milestone: 'Telling og enkel regning i kontekst', howWeAddress: 'Tell-dyrene-i-ringen og klovne-addisjon gir matematikk med spenning og humor' },
      { milestone: 'Kreativt uttrykk og funksjonell skriving', howWeAddress: 'Sirkusplakat- og billettskriving gir autentisk skrivetrening med kreativt engasjement' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 konkrete sirkuselementer (klovn, l\u00f8ve, telt), hold tellingen innenfor 10, og bruk fysisk dramatisering som supplement. For avanserte barn i barnehageklassen, introduser flertrinnssekvenser, matematikk innenfor 20 og selvstendig skriving av sirkushistorier.',
    parentTakeaway: 'Sirkus er drama og l\u00e6ring i \u00e9tt. Se en sirkusforestilling eller sirkusvideo sammen og snakk om rekkef\u00f8lgen: hva kom f\u00f8rst, s\u00e5, til slutt? La barnet lage en hjemmesirkus med kosedyr som artister \u2014 tell dyrene, skriv billett og lag en plakat. Oppgavearkene forsterker b\u00e5de matematikken og kreativiteten fra sirkusopplevelsen.',
    classroomIntegration: 'Sirkustemaet passer glimrende som temauke: i samlingen introduseres sirkusverdenen, ved l\u00e6ringsstasjoner arbeides det med telle- og sekvensoppgaver, i kunstkroken lages masker og plakater, og i rolleleken settes opp klassens egen sirkus. Rammeplanens m\u00e5l for kunst, kultur, kreativitet og kommunikasjon integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Sekvensering (sirkusprogram)', emerging: 'ordner 2 sirkusnumre i rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig 4\u20135 sirkusnumre i logisk rekkef\u00f8lge', advanced: 'lager eget sirkusprogram og forklarer hvorfor numrene st\u00e5r i den rekkef\u00f8lgen' },
      { skill: 'Telling og regning (sirkuskontekst)', emerging: 'teller 1\u201310 sirkuselementer med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og l\u00f8ser addisjonsoppgaver innenfor 10', advanced: 'formulerer egne regneoppgaver med sirkusmotiver og l\u00f8ser dem mentalt' },
      { skill: 'Kreativ skriving (sirkustema)', emerging: 'skriver enkle ord (klovn, sirkus) med modell', proficient: 'skriver selvstendig korte setninger p\u00e5 sirkusplakater og billetter', advanced: 'skriver flere setninger om sirkusopplevelsen med kreative detaljer' },
    ],
  },

  clothing: {
    snippetAnswer: 'Kl\u00e6r-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener sortering etter sesong og funksjon, telling av plagg og begynnende skriving av kl\u00e6sord. Barna kobler hverdagsrutiner med strukturert l\u00e6ring. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Kl\u00e6rtemaet f\u00e5r en ny dimensjon i barnehageklassen fordi fem- og seks\u00e5ringer begynner \u00e5 kle seg selvstendig og ta ansvar for \u00e5 velge riktige kl\u00e6r etter v\u00e6r og aktivitet. Mens f\u00f8rskolebarn sorterte etter farge og st\u00f8rrelse, kan barn i barnehageklassen klassifisere etter funksjon (vinterjakke for kulde, regnt\u00f8y for regn), sesong (sommer mot vinter) og anledning (fest mot lek). Telling av knapper, lommer og kl\u00e6splagg gir hverdagsmatematikk. Skriving av kl\u00e6sord (lue, vott, bukse) trener begynnende lese- og skriveferdigheter. Rammeplanens m\u00e5l for selvstendighet og daglige rutiner st\u00f8ttes n\u00e5r barn kobler oppgaveark med egen p\u00e5kledning.',
    developmentalMilestones: [
      { milestone: 'Funksjonell klassifisering (5\u20136-\u00e5ringer sorterer etter bruk og form\u00e5l)', howWeAddress: 'Kl\u00e6ssorteringsark der barn plasserer plagg i riktig sesong- eller v\u00e6rkategori bygger logisk tenkning' },
      { milestone: 'Selvstendighet i daglige rutiner (p\u00e5kledning)', howWeAddress: 'P\u00e5kledningssekvenser p\u00e5 oppgaveark trener rekkef\u00f8lgeforst\u00e5else og selvstendighetsferdigheter' },
      { milestone: 'Skriving av hverdagsord (kl\u00e6splagg)', howWeAddress: 'Ordsporing og ords\u00f8k med kl\u00e6sord p\u00e5 3\u20135 bokstaver gir begynnende skrivetrening i kjent kontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til grunnleggende plagg (jakke, bukse, sko), bruk fysiske kl\u00e6splagg som supplement, og fokuser p\u00e5 \u00e9n sorteringsdimensjon om gangen. For avanserte barn i barnehageklassen, introduser materialkunnskap (ull, bomull), la dem tegne antrekk for ulike v\u00e6rtyper, og utfordre med selvstendig skriving av kl\u00e6slister.',
    parentTakeaway: 'P\u00e5kledning er daglig l\u00e6ring. La barnet velge kl\u00e6r etter v\u00e6rmeldingen og snakk om hvorfor: \u00abdet regner, s\u00e5 vi trenger regnt\u00f8y.\u00bb Tell knapper p\u00e5 skjorten, lommer p\u00e5 buksen og sko i skohyllen. La barnet skrive handleliste for nye kl\u00e6r. Oppgavearkene forsterker de valgene barnet tar hver morgen.',
    classroomIntegration: 'Kl\u00e6rtemaet integreres i barnehageklassens daglige rutiner: ved garderoben \u00f8ves selvstendig p\u00e5kledning med riktig rekkef\u00f8lge, i samlingen diskuteres v\u00e6r og kl\u00e6svalg, ved l\u00e6ringsstasjoner arbeides det med sorterings- og skriveoppgaver, og i rolleleken drives kl\u00e6sbutikk med telling av plagg og penger. Rammeplanens m\u00e5l for selvstendighet og dagliglivsmestring integreres.',
    assessmentRubric: [
      { skill: 'Kl\u00e6ssortering etter sesong/funksjon', emerging: 'sorterer 2\u20133 plagg i riktig kategori med st\u00f8tte', proficient: 'sorterer selvstendig 6\u20138 plagg etter sesong, v\u00e6r eller funksjon', advanced: 'sorterer etter flere kriterier samtidig og forklarer valgene' },
      { skill: 'P\u00e5kledningssekvens', emerging: 'ordner 2\u20133 kl\u00e6strinn i rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig en full p\u00e5kledningssekvens (5\u20136 trinn) korrekt', advanced: 'tilpasser sekvensen til ulike v\u00e6rscenarier og forklarer tilpasningene' },
      { skill: 'Skriving av kl\u00e6sord', emerging: 'sporer 2\u20133 kl\u00e6sord p\u00e5 prikkede linjer', proficient: 'skriver selvstendig 5\u20136 vanlige kl\u00e6sord leselig', advanced: 'skriver kl\u00e6sord i korte setninger og lager egne kl\u00e6slister' },
    ],
  },

  colors: {
    snippetAnswer: 'Farge-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener fargenyansering, fargeblanding, m\u00f8nstergjenkjenning og begynnende skriving av fargeord. Barna g\u00e5r fra grunnfarger til nyanser og blandefarger. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Fargetemaet f\u00e5r en ny dybde i barnehageklassen fordi fem- og seks\u00e5ringer g\u00e5r fra \u00e5 navngi grunnfarger til \u00e5 forst\u00e5 nyanser og fargeblanding. Mens f\u00f8rskolebarn sorterte etter r\u00f8d, bl\u00e5 og gul, kan barn i barnehageklassen forutsi hva som skjer n\u00e5r r\u00f8d og bl\u00e5 blandes (lilla), gjenkjenne lyse og m\u00f8rke nyanser av samme farge, og bruke fargespekteret i m\u00f8nstergjenkjenning. Telling av fargede gjenstander i grupper gir matematikk, og skriving av fargeord (r\u00f8d, bl\u00e5, gr\u00f8nn) trener begynnende leseferdigheter. Rammeplanens m\u00e5l for kunst, kultur og kreativitet underst\u00f8ttes n\u00e5r barn utforsker fargeverdenen systematisk.',
    developmentalMilestones: [
      { milestone: 'Fargeblanding og nyansering (5\u20136-\u00e5ringer forst\u00e5r at farger kan blandes)', howWeAddress: 'Fargeandings\u00f8velser p\u00e5 oppgaveark der barn forutsier resultat bygger logisk tenkning og kreativitet' },
      { milestone: 'M\u00f8nstergjenkjenning med fargesekvenser', howWeAddress: 'Fargesekvens-oppgaver (r\u00f8d-bl\u00e5-r\u00f8d-bl\u00e5-?) trener algebraisk m\u00f8nstertenkning i visuell kontekst' },
      { milestone: 'Skriving av fargeord (begynnende staveferdighet)', howWeAddress: 'Ordsporing og ords\u00f8k med fargeord gir begynnende skrivetrening med kjente og visuelt st\u00f8ttede ord' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til de seks grunnfargene (r\u00f8d, bl\u00e5, gul, gr\u00f8nn, oransje, lilla), bruk fysisk maling for konkret fargeblanding, og hold m\u00f8nstrene enkle (AB). For avanserte barn i barnehageklassen, introduser nyanser (lysebl\u00e5, m\u00f8rkebl\u00e5), komplekse m\u00f8nstre (ABC), og selvstendig skriving av fargbeskrivelser.',
    parentTakeaway: 'Farger er overalt i hverdagen. Pek ut farger p\u00e5 turen, i butikken og hjemme. La barnet mikse vannfarger og forutsi: \u00abhva skjer n\u00e5r vi blander r\u00f8d og gul?\u00bb Sorter leker etter farge og tell hvor mange r\u00f8de mot bl\u00e5. La barnet skrive fargenavnet p\u00e5 en lapp og feste den p\u00e5 en gjenstand med den fargen. Oppgavearkene gir struktur til denne daglige fargeutforskningen.',
    classroomIntegration: 'Fargetemaet integreres i barnehageklassens kunstundervisning: i samlingen introduseres ukens farge med gjenstander og bilder, ved l\u00e6ringsstasjoner arbeides det med fargem\u00f8nster og ords\u00f8k, i kunstkroken blandes farger, og p\u00e5 naturturer samles gjenstander i ulike farger. Rammeplanens m\u00e5l for kunst, kultur, kreativitet og kommunikasjon integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Fargegjenkjenning og nyansering', emerging: 'navngir 4\u20135 grunnfarger med st\u00f8tte', proficient: 'navngir selvstendig 8+ farger inkludert nyanser (lysebl\u00e5, m\u00f8rkegr\u00f8nn)', advanced: 'forklarer fargeblanding og forutsier resultat av fargeblandinger' },
      { skill: 'M\u00f8nstergjenkjenning med farger', emerging: 'fortsetter et enkelt AB-fargem\u00f8nster med st\u00f8tte', proficient: 'fortsetter selvstendig AB- og ABB-fargem\u00f8nstre', advanced: 'lager egne komplekse fargem\u00f8nstre (ABC) og forklarer reglene' },
      { skill: 'Skriving av fargeord', emerging: 'sporer 2\u20133 fargeord p\u00e5 prikkede linjer', proficient: 'skriver selvstendig 5\u20136 fargeord leselig', advanced: 'bruker fargeord i korte setninger og beskriver nyanser skriftlig' },
    ],
  },

  construction: {
    snippetAnswer: 'Bygging-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker klosser, verkt\u00f8y og maskiner til \u00e5 trene m\u00e5ling, geometri og probleml\u00f8sning. Barn l\u00e6rer \u00e5 planlegge, bygge og beskrive konstruksjoner. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Byggetemaet er perfekt for barnehageklassen fordi fem- og seks\u00e5ringer g\u00e5r fra fri konstruksjonslek til m\u00e5lrettet bygging med plan. Mens f\u00f8rskolebarn stablet og rev ned, kan barn i barnehageklassen f\u00f8lge enkle byggetegninger, telle klosser, gjenkjenne geometriske former i konstruksjoner og m\u00e5le med ikke-standardiserte enheter (klosslengder). Probleml\u00f8sning kommer naturlig n\u00e5r barn m\u00e5 finne ut hvorfor et t\u00e5rn velter eller hvordan en bro kan b\u00e6re vekt. Rammeplanens m\u00e5l for antall, rom og form st\u00f8ttes direkte n\u00e5r barn arbeider med tredimensjonale konstruksjoner.',
    developmentalMilestones: [
      { milestone: 'Romlig og geometrisk forst\u00e5else (5\u20136-\u00e5ringer gjenkjenner former i konstruksjoner)', howWeAddress: 'Formgjenkjenning i byggetegninger og konstruksjonsark bygger geometrisk forst\u00e5else i konkret kontekst' },
      { milestone: 'M\u00e5ling med ikke-standardiserte enheter', howWeAddress: 'M\u00e5l-med-klosser-oppgaver der barn m\u00e5ler lengde og h\u00f8yde introduserer m\u00e5lbegreper p\u00e5 en h\u00e5ndgripelig m\u00e5te' },
      { milestone: 'Probleml\u00f8sning og planlegging', howWeAddress: 'Byggeplan-oppgaver der barn f\u00f8lger instruksjoner trinn for trinn trener logisk tenkning og organisering' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, bruk store klosser med tydelige former, hold instruksjonene til 2\u20133 trinn, og la barnet bygge fysisk f\u00f8r det arbeider p\u00e5 arket. For avanserte barn i barnehageklassen, introduser symmetriske konstruksjoner, flertrinns byggetegninger og selvstendig tegning av egne byggeplaner.',
    parentTakeaway: 'Bygging hjemme er enkel og l\u00e6rerik. Bruk Lego, klosser eller pappesker. Still sp\u00f8rsm\u00e5l: \u00abhvor mange klosser brukte du?\u00bb, \u00abhvilken form er det?\u00bb, \u00abhvorfor falt t\u00e5rnet?\u00bb. La barnet tegne bygget f\u00f8rst og s\u00e5 bygge etter tegningen. M\u00e5l tingene i rommet med klossenheter \u2014 \u00abbordet er 12 klosser langt.\u00bb Oppgavearkene gir struktur til denne naturlige utforskertrang.',
    classroomIntegration: 'Byggetemaet integreres i barnehageklassens l\u00e6ring gjennom hele uken: i samlingen vises byggeteknikker, ved l\u00e6ringsstasjoner arbeides det med form- og telleark, i byggekroken bygges det med klosser og Lego etter planer, og p\u00e5 utedager bygges det med naturmaterialer. Rammeplanens m\u00e5l for antall, rom, form og teknologi integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Formgjenkjenning i konstruksjoner', emerging: 'identifiserer 1\u20132 former (firkant, trekant) med st\u00f8tte', proficient: 'identifiserer selvstendig 4+ geometriske former i byggetegninger', advanced: 'forklarer hvorfor bestemte former brukes i konstruksjoner (trekant er stabilt)' },
      { skill: 'M\u00e5ling med klosser', emerging: 'm\u00e5ler med klosser med fysisk veiledning', proficient: 'm\u00e5ler selvstendig lengder med klosser og rapporterer antallet korrekt', advanced: 'sammenligner m\u00e5linger og bruker dem til \u00e5 l\u00f8se problemer (hva er lengst?)' },
      { skill: 'F\u00f8lge byggetegning', emerging: 'f\u00f8lger 1\u20132 trinn i en byggetegning med st\u00f8tte', proficient: 'f\u00f8lger selvstendig 4\u20135-trinns byggetegninger korrekt', advanced: 'tegner egne byggetegninger og f\u00f8lger dem til ferdig konstruksjon' },
    ],
  },

  cooking: {
    snippetAnswer: 'Matlaging-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker oppskrifter, ingredienser og m\u00e5linger til \u00e5 trene telling, rekkef\u00f8lge og begynnende lesing. Barna f\u00f8lger steg-for-steg-instruksjoner og \u00f8ver funksjonell lesing. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Matlagingstemaet er unikt verdifullt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan f\u00f8lge flertrinns instruksjoner selvstendig. Mens f\u00f8rskolebarn r\u00f8rte i gryta og smakte, kan barn i barnehageklassen lese enkle oppskrifter, m\u00e5le ingredienser (2 kopper mel, 3 egg), f\u00f8lge rekkef\u00f8lge (f\u00f8rst, s\u00e5, til slutt) og skrive ingredienslister. Br\u00f8k introduseres naturlig (halv kopp, kvart stykke). Rammeplanens m\u00e5l for helse, kropp og dagliglivsmestring oppfylles n\u00e5r barn l\u00e6rer om n\u00e6ring gjennom aktiv matlaging.',
    developmentalMilestones: [
      { milestone: 'F\u00f8lge flertrinns instruksjoner (5\u20136-\u00e5ringer kan gjennomf\u00f8re 4\u20135 trinn i rekkef\u00f8lge)', howWeAddress: 'Oppskrift-rekkef\u00f8lge-oppgaver der barn ordner trinn korrekt trener sekvensiell tenkning og instruksjonsf\u00f8lging' },
      { milestone: 'M\u00e5ling og telling av ingredienser', howWeAddress: 'Tell-og-m\u00e5l-oppgaver med ingredienser gir meningsfull matematikk som barn kan smake p\u00e5 etterskudd' },
      { milestone: 'Funksjonell lesing (oppskrifter og ingredienslister)', howWeAddress: 'Oppskriftlesing med bilder og enkle ord gir autentisk lesepraksis der barnet ser et direkte resultat' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, bruk bildeoppskrifter med 3 trinn, hold ingredienstellingen innenfor 5, og la barnet gjennomf\u00f8re den fysiske matlagingen etter oppgavearket. For avanserte barn i barnehageklassen, introduser enkle br\u00f8ker (halvparter, fjerdedeler), lengre oppskrifter og selvstendig skriving av egne oppskrifter.',
    parentTakeaway: 'Kj\u00f8kkenet er et fantastisk klasserom. La barnet hjelpe til med \u00e5 m\u00e5le ingredienser, telle egg og f\u00f8lge enkle oppskrifter. Still sp\u00f8rsm\u00e5l: \u00abhvor mange kopper trenger vi?\u00bb, \u00abhva gj\u00f8r vi f\u00f8rst?\u00bb. La barnet \u00ablesje\u00bb oppskriften (med bildeoppskrifter) og krysse av hvert trinn. Baking gir b\u00e5de matematikk, lesing og en deilig belønning p\u00e5 slutten.',
    classroomIntegration: 'Matlagingstemaet integreres i barnehageklassens ukentlige matlagingsaktiviteter: i samlingen introduseres ukens oppskrift, ved l\u00e6ringsstasjoner arbeides det med rekkef\u00f8lge- og telleark, p\u00e5 matlagingsdager gjennomf\u00f8res oppskriften med ingrediensm\u00e5ling, og i etterkant skrives oppskriften ned i klassens kokebok. Rammeplanens m\u00e5l for helse, dagliglivsmestring og kommunikasjon integreres.',
    assessmentRubric: [
      { skill: 'Rekkef\u00f8lge i oppskrift', emerging: 'ordner 2\u20133 oppskriftstrinn med st\u00f8tte', proficient: 'ordner selvstendig 4\u20135 oppskriftstrinn i korrekt rekkef\u00f8lge', advanced: 'f\u00f8lger en komplett oppskrift og forklarer hva som skjer i hvert trinn' },
      { skill: 'M\u00e5ling og telling av ingredienser', emerging: 'teller 1\u20135 ingredienser med st\u00f8tte', proficient: 'teller og m\u00e5ler selvstendig ingredienser opptil 10', advanced: 'bruker enkle br\u00f8ker (halv, kvart) og regner ut dobbeloppskrift' },
      { skill: 'Oppskriftlesing (funksjonell lesing)', emerging: 'forst\u00e5r bildeoppskrifter med 2\u20133 trinn', proficient: 'leser enkle oppskrifter med ordbilder og bilder selvstendig', advanced: 'leser tekstbaserte oppskrifter og skriver egne korte oppskrifter' },
    ],
  },

  dinosaurs: {
    snippetAnswer: 'Dinosaur-oppgaver for barnehageklassen (5\u20136 \u00e5r) kombinerer st\u00f8rrelsessammenligning, telling og begynnende naturfag med fascinerende urtidens kjemper. Barna l\u00e6rer klassifisering og tidsbegreper. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Dinosaurtemaet f\u00e5r en unik kraft i barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan gripe abstrakte begreper som \u00ablenge siden\u00bb og \u00abutd\u00f8dd\u00bb. Mens f\u00f8rskolebarn var fascinert av dinosaurenes st\u00f8rrelse og lyder, kan barn i barnehageklassen sammenligne dinosaurer systematisk (st\u00f8rre enn, mindre enn), klassifisere dem (planteetere mot kj\u00f8ttetere), og forst\u00e5 enkle tidslinjer. Telling av dinosaurer i grupper gir matematikk, og skriving av dinosaurnavn (t-rex, triceratops) er en sterk motivasjon for begynnende staveferdigheter. Rammeplanens m\u00e5l for natur, milj\u00f8 og utforskning st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'St\u00f8rrelsessammenligning og ordning (5\u20136-\u00e5ringer kan rangere etter st\u00f8rrelse)', howWeAddress: 'Ranger-dinosaurene-etter-st\u00f8rrelse-oppgaver bygger ordningsforst\u00e5else og matematisk sammenligning' },
      { milestone: 'Klassifisering etter egenskaper (planteetere mot kj\u00f8ttetere)', howWeAddress: 'Sorteringsoppgaver der barn grupperer dinosaurer etter kosthold bygger logisk klassifisering' },
      { milestone: 'Tidsforst\u00e5else (konseptet \u00ablenge siden\u00bb)', howWeAddress: 'Enkle tidslinjeoppgaver som viser dinosaurtid mot v\u00e5r tid bygger grunnleggende tidsforst\u00e5else' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 3\u20134 velkjente dinosaurer (t-rex, triceratops, brontosaurus), bruk lekedinosauruser som konkret supplement, og hold sammenligningene enkle (stor/liten). For avanserte barn i barnehageklassen, introduser flere dinosaurarter, fossiler, geologiske perioder og selvstendig skriving av dinosaurfakta.',
    parentTakeaway: 'Dinosaurer er en inngangsport til naturfag. Bes\u00f8k et naturhistorisk museum, les dinosaurb\u00f8ker og still sp\u00f8rsm\u00e5l: \u00abhvilken er st\u00f8rst? Hva spiste den?\u00bb La barnet sortere lekedinosauruser etter st\u00f8rrelse og type. Skriv dinosaurnavn sammen \u2014 de lange navnene (tyrannosaurus) er overraskende motiverende for barn som ellers synes skriving er kjedelig.',
    classroomIntegration: 'Dinosaurtemaet fungerer perfekt som temauke: i samlingen leses dinosaurfakta, ved l\u00e6ringsstasjoner arbeides det med sorterings- og telleark, i kunstkroken lages dinosaurskulpturer, og i sandkassen graves det etter \u00abfossiler\u00bb. Rammeplanens m\u00e5l for natur, milj\u00f8, teknologi og kunst integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'St\u00f8rrelsessammenligning', emerging: 'sammenligner 2 dinosaurer (stor/liten) med st\u00f8tte', proficient: 'rangerer selvstendig 4\u20135 dinosaurer fra minst til st\u00f8rst', advanced: 'bruker sammenligningsord (st\u00f8rre enn, mindre enn, st\u00f8rst) presist og i andre kontekster' },
      { skill: 'Klassifisering (planteeter/kj\u00f8tteter)', emerging: 'sorterer 2\u20133 dinosaurer med st\u00f8tte og bildehintet', proficient: 'sorterer selvstendig 5\u20136 dinosaurer i korrekte grupper', advanced: 'forklarer hvorfor en dinosaur er planteeter eller kj\u00f8tteter basert p\u00e5 kjennetegn' },
      { skill: 'Telling med dinosaurmotiver', emerging: 'teller 1\u201310 dinosaurer med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og l\u00f8ser enkle addisjonsoppgaver', advanced: 'formulerer egne regneoppgaver med dinosaurscenarier' },
    ],
  },

  easter: {
    snippetAnswer: 'P\u00e5ske-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker p\u00e5skeegg, kyllinger og harer til \u00e5 trene telling, m\u00f8nsterskaping og begynnende skriving. Den festlige stemningen gir ekstra motivasjon for l\u00e6ring. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'P\u00e5sketemaet treffer barnehageklassen perfekt fordi fem- og seks\u00e5ringer kan bruke h\u00f8ytiden til strukturert l\u00e6ring. Mens f\u00f8rskolebarn fargelagt egg og jaktet godteri, kan barn i barnehageklassen designe egne m\u00f8nstre p\u00e5 egg (symmetri og gjentakelse), l\u00f8se addisjons- og subtraksjonsoppgaver med p\u00e5skemotiver, og skrive p\u00e5skekort med korte setninger. Eggjakt med tallhint gir romlig orientering og tallforst\u00e5else. Rammeplanens m\u00e5l for kulturforst\u00e5else, fellesskap og kommunikasjon st\u00f8ttes n\u00e5r p\u00e5sketradisjoner kobles med strukturerte oppgaver.',
    developmentalMilestones: [
      { milestone: 'M\u00f8nsterskaping og symmetri (5\u20136-\u00e5ringer kan lage egne m\u00f8nstre)', howWeAddress: 'Dekorer-p\u00e5skeegg-oppgaver med symmetriske m\u00f8nstre trener kreativ m\u00f8nstertenkning og finmotorikk' },
      { milestone: 'Addisjon og subtraksjon med konkrete gjenstander', howWeAddress: 'P\u00e5skeregning (5 egg pluss 3 egg, 10 kyllinger minus 4) gir meningsfull matematikk i festlig kontekst' },
      { milestone: 'Funksjonell skriving (kort og hilsener)', howWeAddress: 'P\u00e5skekort-skriving med korte setninger gir autentisk skrivetrening med personlig betydning' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, hold m\u00f8nstrene enkle (striper), begrens tellingen til 10, og bruk fysiske p\u00e5skeegg som supplement. For avanserte barn i barnehageklassen, introduser komplekse m\u00f8nstre, matematikk innenfor 20, og selvstendig skriving av p\u00e5skefortellinger.',
    parentTakeaway: 'P\u00e5ske er full av l\u00e6ringsmuligheter. Mal egg sammen og lag m\u00f8nstre \u2014 snakk om symmetri: \u00aber det likt p\u00e5 begge sider?\u00bb Tell p\u00e5skeegg i eggjakt: \u00abhvor mange fant du? Flere enn s\u00f8sken?\u00bb La barnet skrive p\u00e5skekort til familie. Oppgavearkene forlenger den festlige l\u00e6ringsopplevelsen inn i strukturert arbeid.',
    classroomIntegration: 'P\u00e5sketemaet integreres i barnehageklassens feiring: i samlingen leses p\u00e5skehistorien, ved l\u00e6ringsstasjoner arbeides det med m\u00f8nster- og telleark, i kunstkroken dekoreres p\u00e5skeegg, og ute arrangeres eggjakt med tallhint. Rammeplanens m\u00e5l for kulturforst\u00e5else, fellesskap og kunst integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'M\u00f8nsterskaping p\u00e5 p\u00e5skeegg', emerging: 'kopierer et enkelt stripem\u00f8nster med st\u00f8tte', proficient: 'lager selvstendig symmetriske m\u00f8nstre p\u00e5 egg med 2\u20133 farger', advanced: 'designer komplekse m\u00f8nstre og forklarer symmetrien i dem' },
      { skill: 'P\u00e5skematematikk (addisjon/subtraksjon)', emerging: 'l\u00f8ser oppgaver innenfor 5 med konkret st\u00f8tte (egg p\u00e5 bordet)', proficient: 'l\u00f8ser selvstendig addisjons- og subtraksjonsoppgaver innenfor 10', advanced: 'l\u00f8ser oppgaver innenfor 20 og formulerer egne p\u00e5skeregneoppgaver' },
      { skill: 'P\u00e5skekort-skriving', emerging: 'kopierer \u00abGod P\u00e5ske\u00bb fra modell', proficient: 'skriver selvstendig korte hilsener med 1\u20132 setninger', advanced: 'skriver personlige p\u00e5skekort med flere setninger og kreativt innhold' },
    ],
  },

  emotions: {
    snippetAnswer: 'F\u00f8lelser-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener f\u00f8lelsesgjenkjenning, empati og selvregulering gjennom ansiktsuttrykk, scenarioforst\u00e5else og begynnende skriving. Barna l\u00e6rer \u00e5 sette ord p\u00e5 egne og andres f\u00f8lelser. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'F\u00f8lelsestemaet er spesielt viktig i barnehageklassen fordi fem- og seks\u00e5ringer befinner seg i en avgj\u00f8rende fase for sosial-emosjonell utvikling. Mens f\u00f8rskolebarn gjenkjente grunnf\u00f8lelser (glad, trist, sint), kan barn i barnehageklassen forst\u00e5 at f\u00f8lelser har \u00e5rsaker, at andre kan f\u00f8le annerledes enn dem selv, og at man kan velge hvordan man h\u00e5ndterer f\u00f8lelser. Scenariobaserte oppgaver der barn vurderer \u00abhvordan f\u00f8ler personen seg?\u00bb og \u00abhva kan vi gj\u00f8re?\u00bb bygger empati og konfliktl\u00f8sning. Skriving av f\u00f8lelsesord og -setninger gir funksjonell leseferdighet. Rammeplanens m\u00e5l for sosial kompetanse og kommunikasjon er direkte knyttet til dette temaet.',
    developmentalMilestones: [
      { milestone: '\u00c5rsakstilknytning for f\u00f8lelser (5\u20136-\u00e5ringer forst\u00e5r at hendelser utl\u00f8ser f\u00f8lelser)', howWeAddress: 'Scenario-oppgaver der barn kobler situasjoner med f\u00f8lelser bygger \u00e5rsak-virkning-tenkning i sosial kontekst' },
      { milestone: 'Empati og perspektivtaking (evnen til \u00e5 se ting fra andres synspunkt)', howWeAddress: 'Oppgaver der barn vurderer \u00abhvordan f\u00f8ler den andre seg?\u00bb trener perspektivtaking og sosial forst\u00e5else' },
      { milestone: 'F\u00f8lelsesregulering (barn l\u00e6rer strategier for \u00e5 h\u00e5ndtere sterke f\u00f8lelser)', howWeAddress: 'Strategikort-oppgaver der barn kobler f\u00f8lelser med h\u00e5ndteringsstrategier bygger selvreguleringsferdigheter' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til fire grunnf\u00f8lelser (glad, trist, sint, redd), bruk tydelige ansiktsuttrykk og enkle scenarier, og la barnet bruke speil for \u00e5 \u00f8ve uttrykk. For avanserte barn i barnehageklassen, introduser nyanserte f\u00f8lelser (frustrert, stolt, skamfull), komplekse sosiale scenarier og selvstendig skriving av f\u00f8lelsesdagbok.',
    parentTakeaway: 'Snakk om f\u00f8lelser daglig. N\u00e5r barnet er sint, hjelp med \u00e5 sette ord p\u00e5 det: \u00abdu er frustrert fordi...\u00bb. Les b\u00f8ker og sp\u00f8r: \u00abhvordan tror du han f\u00f8ler seg?\u00bb. Tegn ansikter med ulike uttrykk sammen. Vis at voksne ogs\u00e5 har f\u00f8lelser: \u00abjeg ble glad n\u00e5r du...\u00bb. Oppgavearkene gir struktur til disse viktige samtalene om det indre livet.',
    classroomIntegration: 'F\u00f8lelsestemaet integreres i barnehageklassens daglige samlingsstund: morgensamling med \u00abhvordan f\u00f8ler du deg i dag?\u00bb-runde, ved l\u00e6ringsstasjoner arbeides det med f\u00f8lelsesgjenkjenning og scenariooppgaver, i rolleleken \u00f8ves konflikth\u00e5ndtering, og i lesekroken leses b\u00f8ker om f\u00f8lelser. Rammeplanens m\u00e5l for sosial kompetanse og kommunikasjon integreres gjennom hele dagen.',
    assessmentRubric: [
      { skill: 'F\u00f8lelsesgjenkjenning', emerging: 'gjenkjenner 2\u20133 grunnf\u00f8lelser i ansiktsuttrykk med st\u00f8tte', proficient: 'gjenkjenner selvstendig 5\u20136 f\u00f8lelser i ansikter og kroppsspr\u00e5k', advanced: 'identifiserer nyanserte f\u00f8lelser og forklarer forskjellene mellom dem' },
      { skill: 'Empati og perspektivtaking', emerging: 'svarer p\u00e5 \u00abhvordan f\u00f8ler han seg?\u00bb i enkle scenarier med st\u00f8tte', proficient: 'vurderer selvstendig andres f\u00f8lelser i varierte scenarier', advanced: 'foresl\u00e5r hva man kan gj\u00f8re for \u00e5 hjelpe og forklarer hvorfor' },
      { skill: 'F\u00f8lelsesord (skriving)', emerging: 'sporer 2\u20133 f\u00f8lelsesord (glad, trist) p\u00e5 prikkede linjer', proficient: 'skriver selvstendig 5\u20136 f\u00f8lelsesord og bruker dem muntlig', advanced: 'skriver korte setninger om f\u00f8lelser og bruker f\u00f8lelsesord i daglig tale' },
    ],
  },

  'fairy-tales': {
    snippetAnswer: 'Eventyr-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker norske eventyr som Askeladden, Bukkene Bruse og R\u00f8dhette til \u00e5 trene sekvensering, gjenfortelling og begynnende lesing. Eventyrstrukturen bygger narrativ forst\u00e5else. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Eventyrtemaet er kraftfullt i barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan forst\u00e5 narrativ struktur \u2014 begynnelse, midtdel og slutt \u2014 og gjenfortelle historier med egne ord. Mens f\u00f8rskolebarn h\u00f8rte eventyret og gjenkjente figurene, kan barn i barnehageklassen sekvensere handlingen, identifisere problemet og l\u00f8sningen, og forutsi hva som skjer videre. Norske folkeeventyr som Askeladden, Bukkene Bruse og Pannekaken gir rik kulturtilknytning. Ordsporing med eventyrord og skriving av egen eventyrsluttning gir funksjonell lese- og skrivetrening. Rammeplanens m\u00e5l for kommunikasjon, spr\u00e5k og tekst st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Narrativ forst\u00e5else (5\u20136-\u00e5ringer forst\u00e5r begynnelse, midtdel og slutt)', howWeAddress: 'Eventyrsekvenserings-oppgaver der barn ordner handlingen i tre deler trener narrativ struktur' },
      { milestone: 'Gjenfortelling med egne ord', howWeAddress: 'Tegn-og-fortell-oppgaver der barn illustrerer og muntlig gjenforteller eventyret bygger spr\u00e5klig uttrykksevne' },
      { milestone: 'Prediksjon (hva skjer videre?)', howWeAddress: 'Oppgaver der barn forutsier neste hendelse i eventyret trener logisk og kreativ tenkning' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, bruk kjente eventyr med enkel handling (Bukkene Bruse), begrens sekvenseringen til 3 bilder, og la barnet gjenfortelle muntlig f\u00f8r skriftlig. For avanserte barn i barnehageklassen, introduser lengre eventyr, la dem skrive egen eventyrsluttning, og utfordre med \u00e5 sammenligne to eventyr.',
    parentTakeaway: 'Les eventyr h\u00f8yt hver kveld og still sp\u00f8rsm\u00e5l: \u00abhva skjedde f\u00f8rst?\u00bb, \u00abhvorfor gjorde hun det?\u00bb, \u00abhvordan tror du det slutter?\u00bb. La barnet gjenfortelle eventyret for en annen i familien. Lek eventyr med dukker eller kosedyr. Skriv sammen: \u00abhva skjer etter at Askeladden vant?\u00bb. Oppgavearkene gir struktur til den rike eventyrtradisjonen.',
    classroomIntegration: 'Eventyrtemaet integreres i barnehageklassens lesestund: i samlingen leses ukens eventyr, ved l\u00e6ringsstasjoner arbeides det med sekvenserings- og ordoppgaver, i rolleleken dramatiseres eventyr, og i kunstkroken illustreres favorittscener. Rammeplanens m\u00e5l for kommunikasjon, spr\u00e5k, tekst og kunst integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Eventyrsekvensering', emerging: 'ordner 2 eventyrscener i rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig 4\u20135 eventyrscener i korrekt handlingsrekkef\u00f8lge', advanced: 'gjenforteller hele eventyret med begynnelse, midtdel og slutt med egne ord' },
      { skill: 'Eventyrforst\u00e5else (problem/l\u00f8sning)', emerging: 'identifiserer hovedpersonen med st\u00f8tte', proficient: 'identifiserer selvstendig problemet og l\u00f8sningen i eventyret', advanced: 'sammenligner problem og l\u00f8sning p\u00e5 tvers av eventyr og forklarer likheter' },
      { skill: 'Eventyrrelatert skriving', emerging: 'sporer 2\u20133 eventyrord (troll, prinsesse) p\u00e5 prikkede linjer', proficient: 'skriver selvstendig korte setninger om eventyr', advanced: 'skriver egen eventyrsluttning eller eget mini-eventyr med begynnelse og slutt' },
    ],
  },

  farm: {
    snippetAnswer: 'Bondeg\u00e5rd-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker dyr, avlinger og maskiner til \u00e5 trene telling, sortering og begynnende naturfag. Barna l\u00e6rer om matproduksjon og \u00e5rstidsrytmen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Bondeg\u00e5rdtemaet er s\u00e6rlig rikt for barnehageklassen fordi fem- og seks\u00e5ringer kan koble matproduksjon med det de spiser. Mens f\u00f8rskolebarn navnga dyrene og lydene, kan barn i barnehageklassen forst\u00e5 produksjonskjeden (ku \u2192 melk \u2192 ost), telle i grupper (5 h\u00f8ner, 10 egg), og klassifisere dyr etter funksjon (melkedyr, kj\u00f8ttdyr, fjorf\u00e6). \u00c5rstidsrytmen p\u00e5 g\u00e5rden gir sekvensering (v\u00e5r: s\u00e5, sommer: vekst, h\u00f8st: innhøsting). Skriving av dyrenavn og matord gir funksjonell lesetrening. Rammeplanens m\u00e5l for natur, milj\u00f8 og helse st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Forst\u00e5else av produksjonskjeder (5\u20136-\u00e5ringer kan se sammenhenger mellom trinn)', howWeAddress: 'Produksjonskjede-oppgaver (ku \u2192 melk \u2192 ost) trener logisk sekvensering og naturforst\u00e5else' },
      { milestone: 'Telling i grupper og enkel multiplikasjon', howWeAddress: 'Tell-h\u00f8nene-og-eggene-oppgaver (5 h\u00f8ner, hvert med 2 egg = 10) introduserer gruppertelling' },
      { milestone: '\u00c5rstidsrytme p\u00e5 g\u00e5rden (sekvensering av natursykluser)', howWeAddress: 'S\u00e5, vekst, innhøsting-sekvenser trener \u00e5rstidsforst\u00e5else med konkret bondeg\u00e5rdkontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 velkjente dyr (ku, gris, h\u00f8ne), hold tellingen innenfor 10, og bruk lekeg\u00e5rder som konkret supplement. For avanserte barn i barnehageklassen, introduser maskiner (traktor, skurtresker), la dem beregne fôrmengder, og utfordre med selvstendig skriving av bondeg\u00e5rdsdagbok.',
    parentTakeaway: 'Bes\u00f8k en bondeg\u00e5rd og knytt opplevelsen til l\u00e6ring: tell dyrene, finn ut hva de spiser, og sp\u00f8r \u00abhva f\u00e5r vi fra kua?\u00bb. P\u00e5 matbutikken, la barnet finne produkter som kommer fra bondeg\u00e5rden. Snakk om \u00e5rstidene: \u00abhva gj\u00f8r bonden n\u00e5 p\u00e5 v\u00e5ren?\u00bb. Oppgavearkene forbereder og forlenger disse virkelige opplevelsene.',
    classroomIntegration: 'Bondeg\u00e5rdtemaet integreres i barnehageklassens \u00e5rshjul: om v\u00e5ren snakkes det om s\u00e5ing, om sommeren vekst, om h\u00f8sten innhøsting. Ved l\u00e6ringsstasjoner arbeides det med telle- og sorteringsark, i samlingen leses bondeg\u00e5rdb\u00f8ker, og p\u00e5 utetur bes\u00f8kes n\u00e6rliggende g\u00e5rder. Rammeplanens m\u00e5l for natur, milj\u00f8, helse og dagliglivsmestring integreres.',
    assessmentRubric: [
      { skill: 'Produksjonskjeder', emerging: 'forbinder dyr og produkt (ku \u2192 melk) med st\u00f8tte', proficient: 'ordner selvstendig 3-trinns produksjonskjeder for 3\u20134 produkter', advanced: 'forklarer hele produksjonskjeden med egne ord og kjenner flere trinn' },
      { skill: 'Telling og gruppering (g\u00e5rdskontekst)', emerging: 'teller 1\u201310 g\u00e5rdsdyr med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og grupperer i kategorier (h\u00f8ner, griser, kuer)', advanced: 'teller i grupper p\u00e5 2 og 5 med g\u00e5rdsdyr og l\u00f8ser addisjonsoppgaver' },
      { skill: '\u00c5rstidssekvenser p\u00e5 g\u00e5rden', emerging: 'ordner 2 \u00e5rstider med st\u00f8tte', proficient: 'ordner selvstendig 4 \u00e5rstider med bondeg\u00e5rdaktiviteter i korrekt rekkef\u00f8lge', advanced: 'forklarer hva bonden gj\u00f8r i hver \u00e5rstid og kobler det til matproduksjon' },
    ],
  },

  flowers: {
    snippetAnswer: 'Blomster-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling, m\u00f8nsterskaping og begynnende naturfag med roser, tulipaner og solsikker. Barna l\u00e6rer om plantedeler og vekstsyklus. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Blomstertemaet er ideelt for barnehageklassen fordi fem- og seks\u00e5ringer kan forst\u00e5 plantens anatomi \u2014 r\u00f8tter, stengel, blader, kronblader \u2014 og koblingen mellom deler og funksjoner. Mens f\u00f8rskolebarn fargelagt blomster og sorterte etter farge, kan barn i barnehageklassen telle kronblader (symmetri og tall), forst\u00e5 vekstsyklusen (fr\u00f8 \u2192 spire \u2192 plante \u2192 blomst), og designe m\u00f8nstre med blomsterformasjoner. Skriving av blomstervnavn (rose, tulipan, lilje) gir begynnende stavetrening. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi st\u00f8ttes n\u00e5r barn utforsker planteverdenen systematisk.',
    developmentalMilestones: [
      { milestone: 'Forst\u00e5else av plantedeler og funksjoner (5\u20136-\u00e5ringer l\u00e6rer grunnleggende botanikk)', howWeAddress: 'Navngi-delene-oppgaver der barn kobler r\u00f8tter, stengel, blader og kronblader med funksjoner bygger naturfag' },
      { milestone: 'Vekstsyklus-sekvensering (fr\u00f8 til blomst)', howWeAddress: 'Ordne-vekstsyklusen-oppgaver med 4 trinn trener tidslig forst\u00e5else og biologisk kunnskap' },
      { milestone: 'M\u00f8nsterskaping med naturmotiver', howWeAddress: 'Blomster-m\u00f8nsteroppgaver der barn lager og fortsetter sekvenser med ulike blomstertyper trener algebraisk tenkning' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 3 velkjente blomster (rose, tulipan, solsikke), bruk ekte blomster som visuelt supplement, og hold vekstsyklusen til 3 trinn. For avanserte barn i barnehageklassen, introduser pollinering, fotosyntese i enkle termer, og la dem tegne og skrive egne plantedagb\u00f8ker.',
    parentTakeaway: 'Plant en blomst sammen og f\u00f8lg veksten fra fr\u00f8 til blomst. Navngi delene: \u00abse, her er stengelen, her er bladene.\u00bb Tell kronblader p\u00e5 blomster i hagen eller p\u00e5 tur. Press blomster og lim dem i en bok med blomstens navn. La barnet gi blomster til noen og skrive et kort. Oppgavearkene forsterker det barnet opplever i naturen.',
    classroomIntegration: 'Blomstertemaet f\u00f8lger \u00e5rstidene: om v\u00e5ren plantes fr\u00f8 i barnehagens hage, i samlingen observeres veksten, ved l\u00e6ringsstasjoner arbeides det med plantedel- og telleark, og p\u00e5 naturturer identifiseres blomster i n\u00e6rmilj\u00f8et. Rammeplanens m\u00e5l for natur, milj\u00f8, teknologi og utforskning integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Plantedeler og funksjoner', emerging: 'navngir 1\u20132 plantedeler (blomst, blad) med st\u00f8tte', proficient: 'navngir selvstendig 4 plantedeler (r\u00f8tter, stengel, blad, blomst) og deres funksjon', advanced: 'forklarer hvordan delene samarbeider for at planten skal vokse' },
      { skill: 'Vekstsyklus-sekvensering', emerging: 'ordner 2 trinn (fr\u00f8, blomst) med st\u00f8tte', proficient: 'ordner selvstendig 4 vekstsyklustrinn i korrekt rekkef\u00f8lge', advanced: 'forklarer hva som skjer i hvert trinn og hva planten trenger for \u00e5 vokse' },
      { skill: 'Telling med blomstermotiver', emerging: 'teller 1\u201310 blomster eller kronblader med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og l\u00f8ser enkle addisjonsoppgaver', advanced: 'teller kronblader, sammenligner og bruker tallene i m\u00f8nsteroppgaver' },
    ],
  },

  food: {
    snippetAnswer: 'Mat-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker n\u00e6ringsmidler og m\u00e5ltider til \u00e5 trene sortering etter matgruppe, telling og begynnende lesing av matord. Barna l\u00e6rer om sunn kost og n\u00e6ringsgrupper. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Mattemaet f\u00e5r en ny faglig dybde i barnehageklassen fordi fem- og seks\u00e5ringer kan klassifisere mat i n\u00e6ringsgrupper (frukt og gr\u00f8nt, kornprodukter, meieriprodukter, kj\u00f8tt og fisk) og forst\u00e5 grunnleggende n\u00e6ringsbehov. Mens f\u00f8rskolebarn sorterte etter farge og smak, kan barn i barnehageklassen forst\u00e5 at vi trenger mat fra ulike grupper for \u00e5 holde oss friske. Telling av matvarer i handlelister og p\u00e5 tallerkenen gir meningsfull matematikk. Skriving av matord (br\u00f8d, melk, eple) gir funksjonell lesetrening. Rammeplanens m\u00e5l for kropp, helse og dagliglivsmestring st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Klassifisering etter matgruppe (5\u20136-\u00e5ringer kan sortere mat i n\u00e6ringskategorier)', howWeAddress: 'Sorteringsoppgaver der barn plasserer matvarer i riktig n\u00e6ringsgruppe bygger b\u00e5de logisk og helsefaglig forst\u00e5else' },
      { milestone: 'Telling og mengdeforst\u00e5else med matvarer', howWeAddress: 'Handleliste- og tallerkenoppgaver der barn teller og fordeler mat gir konkret og relevant matematikk' },
      { milestone: 'Funksjonell lesing av matord', howWeAddress: 'Matord-sporing og ords\u00f8k med hverdagsord (br\u00f8d, ost, melk) gir lesetrening som barnet kan bruke p\u00e5 butikken' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til grunnleggende matvarer (eple, br\u00f8d, melk), bruk ekte matvarer eller plastmat som supplement, og fokuser p\u00e5 to matgrupper om gangen. For avanserte barn i barnehageklassen, introduser n\u00e6ringsinnhold, la dem planlegge et sunnert m\u00e5ltid, og utfordre med selvstendig skriving av handlelister.',
    parentTakeaway: 'Matbutikken er et perfekt klasserom. La barnet skrive handleliste (med bildest\u00f8tte), telle matvarer i handlekurven, og sortere varene n\u00e5r dere kommer hjem: \u00abhvor h\u00f8rer melken hjemme?\u00bb. Lag tallerkenen sammen og snakk om matgruppene. Oppgavearkene gir struktur til den daglige matopplevelsen og bygger sunne vaner.',
    classroomIntegration: 'Mattemaet integreres i barnehageklassens m\u00e5ltidsrutiner: ved lunsjen snakkes det om matgrupper, i samlingen introduseres n\u00e6ringsl\u00e6re med bilder, ved l\u00e6ringsstasjoner arbeides det med sorteringsark og matordsporing, og p\u00e5 matlagingsdager praktiseres kunnskapen. Rammeplanens m\u00e5l for kropp, helse og dagliglivsmestring integreres.',
    assessmentRubric: [
      { skill: 'Matgruppeklassifisering', emerging: 'sorterer 2\u20133 matvarer i riktig gruppe med st\u00f8tte', proficient: 'sorterer selvstendig 6\u20138 matvarer i 4 n\u00e6ringsgrupper', advanced: 'forklarer hvorfor vi trenger mat fra alle grupper og planlegger et balansert m\u00e5ltid' },
      { skill: 'Telling med matvarer', emerging: 'teller 1\u201310 matvarer med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og l\u00f8ser handleliste-addisjonsoppgaver', advanced: 'beregner mengder for flere personer og bruker enkel ganging (3 epler til 2 = 6)' },
      { skill: 'Matord-lesing og skriving', emerging: 'gjenkjenner 2\u20133 matord med bildest\u00f8tte', proficient: 'leser selvstendig 8\u201310 matord og skriver dem leselig', advanced: 'skriver egne handlelister og korte setninger om matvarer' },
    ],
  },

  forest: {
    snippetAnswer: 'Skog-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker tr\u00e6r, dyr og \u00e5rstider til \u00e5 trene telling, klassifisering og begynnende naturfag. Barna l\u00e6rer om det norske skogens \u00f8kosystem gjennom engasjerende oppgaver. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Skogtemaet er s\u00e6rlig meningsfullt for barnehageklassen i Norge fordi fem- og seks\u00e5ringer har utedager (naturbarnehagetradisjonen) og dermed f\u00f8rsteh\u00e5nds kjennskap til skogen. Mens f\u00f8rskolebarn sanset skogen gjennom \u00e5 ta p\u00e5 bark og samle kongler, kan barn i barnehageklassen klassifisere tr\u00e6r (bar- mot l\u00f8vtr\u00e6r), forst\u00e5 \u00e5rstidsendringer (l\u00f8vfall, knoppsprett), telle naturgjenstander i grupper og forst\u00e5 enkle n\u00e6ringskjeder (planterer \u2192 planteetere \u2192 kj\u00f8ttetere). Skriving av skogord (gran, rev, mose) gir funksjonell lesetrening. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi st\u00f8ttes direkte n\u00e5r skogen er b\u00e5de klasserom og oppgavetema.',
    developmentalMilestones: [
      { milestone: 'Klassifisering av naturgjenstander (5\u20136-\u00e5ringer kan sortere etter flere egenskaper)', howWeAddress: 'Sorter-tr\u00e6rne-oppgaver (bar/l\u00f8v, liten/stor) og dyresortering (fugl/pattedyr) bygger logisk tenkning med naturmateriale' },
      { milestone: '\u00c5rstidsforst\u00e5else i skogkontekst', howWeAddress: 'Skogen-gjennom-\u00e5rstidene-oppgaver der barn kobler sesongendringer med tr\u00e6r og dyr bygger syklisk tidsforst\u00e5else' },
      { milestone: 'Enkel \u00f8kosystemforst\u00e5else (hvem spiser hvem)', howWeAddress: 'N\u00e6ringskjede-oppgaver med skogdyr gir grunnleggende \u00f8kologisk forst\u00e5else i en kjent kontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 3\u20134 velkjente skogelementer (gran, ekorn, kongle), bruk naturturer som konkret supplement, og hold klassifiseringen til \u00e9n dimensjon. For avanserte barn i barnehageklassen, introduser flere n\u00e6ringskjeder, la dem lage skogdagbok med tegning og skriving, og utfordre med fletttrinns sammenligninger mellom \u00e5rstider.',
    parentTakeaway: 'Den norske skogen er et gratis klasserom. G\u00e5 p\u00e5 tur og tell kongler, sorter blader etter form, og se etter dyr. Snakk om \u00e5rstidene: \u00abhvorfor faller bladene n\u00e5?\u00bb, \u00abhva gj\u00f8r ekornet om vinteren?\u00bb. La barnet samle naturgjenstander og sortere dem hjemme. Oppgavearkene gir struktur til alt barnet opplever i skogen p\u00e5 turdagen.',
    classroomIntegration: 'Skogtemaet integreres perfekt med barnehageklassens utedager: p\u00e5 turdagen samles naturgjenstander og observeres dyr, i samlingen deles funnene, ved l\u00e6ringsstasjoner arbeides det med sorterings-, telle- og skogordark, og i kunstkroken lages naturbilde med innsamlet materiale. Rammeplanens m\u00e5l for natur, milj\u00f8, teknologi og utforskning integreres gjennom hele uken.',
    assessmentRubric: [
      { skill: 'Tr\u00e6klassifisering (bar/l\u00f8v)', emerging: 'skiller mellom 1\u20132 tretyper med st\u00f8tte', proficient: 'klassifiserer selvstendig 4\u20135 tr\u00e6r som bar- eller l\u00f8vtr\u00e6r', advanced: 'gjenkjenner spesifikke trearter (gran, furu, bj\u00f8rk, eik) og kjenner deres kjennetegn' },
      { skill: 'Skogens \u00e5rstidsendringer', emerging: 'beskriver 1\u20132 endringer i skogen med st\u00f8tte', proficient: 'beskriver selvstendig endringer i alle 4 \u00e5rstider for skogen', advanced: 'forklarer hvorfor endringene skjer og hvordan dyr tilpasser seg' },
      { skill: 'N\u00e6ringskjeder i skogen', emerging: 'kobler 1 dyr med maten sin med st\u00f8tte', proficient: 'ordner selvstendig en 3-trinns n\u00e6ringskjede (plante \u2192 mus \u2192 rev)', advanced: 'forklarer flere n\u00e6ringskjeder og hva som skjer hvis ett ledd forsvinner' },
    ],
  },
};

// ── helpers ──────────────────────────────────────────────────

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

// ── main loop ────────────────────────────────────────────────

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

  // Find grade block boundaries
  const kindergartenIdx = content.indexOf("'kindergarten'");
  const firstGradeIdx = content.indexOf("'first-grade'");

  if (kindergartenIdx === -1 || firstGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in kindergarten block
  const kindergartenBlock = content.substring(kindergartenIdx, firstGradeIdx);
  if (kindergartenBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/no.ts`);
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
    console.error(`NO FAQ END FOUND: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = kindergartenIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/no.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
