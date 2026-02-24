#!/usr/bin/env node
/**
 * SEO Part 258: NO Kindergarten Grade Enrichment — Themes 39-50
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 12 NO theme files (sports through zoo).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  sports: {
    snippetAnswer: 'Sport-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling av poeng, addisjon og subtraksjon innenfor 10 og begynnende lesing av sportsord gjennom kampscenarier med fotball, basketball og friidrett. Idrettens spenning gj\u00f8r matematikk meningsfull. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sporttemaet er ideelt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang forst\u00e5r poengberegning og regler \u2014 de g\u00e5r fra \u00e5 bare l\u00f8pe og leke til \u00e5 f\u00f8lge strukturerte spill med resultater. Denne overgangen fra fri lek til regelbasert aktivitet gj\u00f8r sportsmatematikk naturlig: telling av m\u00e5l i to omganger, addisjon av poeng (fire pluss tre), og subtraksjon n\u00e5r et lag mister forspranget. Barn i barnehageklassen kan ogs\u00e5 lese og skrive enkle sportsord som m\u00e5l, lag, ball og kamp. M\u00f8nstergjenkjenning trenes gjennom draktnummersekvenser og lagoppstillinger. Kunnskapsl\u00f8ftet (LK20) og Rammeplan for barnehagen understreker kropp, bevegelse og helse, og sportsoppgaver bygger bro mellom fysisk aktivitet og akademisk l\u00e6ring i klasserommet.',
    developmentalMilestones: [
      { milestone: 'Regelforst\u00e5else og fair play (5\u20136-\u00e5ringer begynner \u00e5 forst\u00e5 spilleregler og rettferdighet)', howWeAddress: 'Oppgaver med lagscenarier der barn fordeler spillere likt og teller poeng rettferdig trener b\u00e5de matematikk og sosiale ferdigheter' },
      { milestone: 'Addisjon og subtraksjon i kontekst (poengberegning)', howWeAddress: 'Kampscenarier med addisjon av omgangspoeng og subtraksjon av ledelse gir meningsfull aritmetikk i spenningsfylt kontekst' },
      { milestone: 'Sportsordforr\u00e5d og begynnende lesing', howWeAddress: 'Ords\u00f8k og sporingsark med sportsord p\u00e5 3\u20135 bokstaver (m\u00e5l, lag, ball) trener lesefundamentet med motiverende innhold' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til \u00e9n idrett om gangen (fotball), hold poengene innenfor 5, og bruk konkrete baller og figurer som supplement. For avanserte barn i barnehageklassen, introduser resultattavler med tall opptil 20, flertrinnsoppgaver med flere omganger, og selvstendig skriving av kamprapporter.',
    parentTakeaway: 'Sport er daglig matematikk. Tell m\u00e5l under fotballkampen p\u00e5 TV, f\u00f8r stilling n\u00e5r barnet spiller i hagen, og sammenlign poeng: \u00abhvem vant? med hvor mye?\u00bb La barnet skrive resultatet p\u00e5 papir. Meld barnet p\u00e5 en lokal idrettsforening og snakk om tallene: \u00abhvor mange var p\u00e5 laget, hvem scoret f\u00f8rst?\u00bb Oppgavearkene gj\u00f8r denne koblingen mellom sport og tall synlig.',
    classroomIntegration: 'Sporttemaet integreres i barnehageklassens ukelange l\u00e6ring: mandag introduseres ukens idrett i samlingen, tirsdag arbeides det med poeng-addisjon ved l\u00e6ringsstasjoner, onsdag \u00f8ves sportsords\u00f8k og ordsporing, torsdag spilles idretten i gymsalen med telling av resultater, og fredag oppsummeres med m\u00f8nsteroppgaver med draktnumre. Rammeplanens m\u00e5l for kropp, bevegelse, helse og kommunikasjon integreres.',
    assessmentRubric: [
      { skill: 'Poengberegning (addisjon/subtraksjon)', emerging: 'teller poeng innenfor 5 med konkret st\u00f8tte (fingre/baller)', proficient: 'l\u00f8ser selvstendig addisjons- og subtraksjonsoppgaver innenfor 10 med kampscenarier', advanced: 'l\u00f8ser flertrinnspoengoppgaver innenfor 20 og formulerer egne kampmatematikkoppgaver' },
      { skill: 'Sportsordforr\u00e5d og lesing', emerging: 'gjenkjenner 2\u20133 sportsord med bildest\u00f8tte', proficient: 'leser selvstendig 6\u20138 sportsord og finner dem i ords\u00f8k', advanced: 'leser nye sportsord ved avkoding og skriver korte setninger om kamper' },
      { skill: 'Regelforst\u00e5else og rettferdighet', emerging: 'forst\u00e5r grunnleggende turordning med st\u00f8tte', proficient: 'fordeler selvstendig spillere likt i lag og forklarer hvorfor det er rettferdig', advanced: 'forklarer spilleregler til andre og l\u00f8ser uenigheter om poeng med matematikk' },
    ],
  },

  spring: {
    snippetAnswer: 'V\u00e5r-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker blomstring, fuglenes tilbakekomst og plantesp\u00e6ring til \u00e5 trene telling til 20, m\u00e5ling og begynnende lesing av naturord. V\u00e5rens forandringer gj\u00f8r naturfag h\u00e5ndgripelig. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'V\u00e5rtemaet har en s\u00e6rlig kraft i barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan observere naturens endringer systematisk over tid \u2014 de kan s\u00e5 fr\u00f8 og m\u00e5le veksten uke for uke, telle blomster som \u00e5pner seg og registrere v\u00e6r og temperatur. Mens f\u00f8rskolebarn gledde seg over blomster og sommerfulger, kan barn i barnehageklassen f\u00f8re enkle vekstdagb\u00f8ker, bruke ikke-standardiserte m\u00e5l (klosslengder) for \u00e5 m\u00e5le plantenes h\u00f8yde, og skrive v\u00e5rord. Addisjon og subtraksjon knyttes til naturtelling: fem knopper som \u00e5pner seg, tre fugler som kommer tilbake. Kunnskapsl\u00f8ftet (LK20) og Rammeplan for barnehagen vektlegger natur, milj\u00f8 og teknologi, og v\u00e5ren gir det perfekte laboratoriet for utforskning og registrering.',
    developmentalMilestones: [
      { milestone: 'Observasjon og registrering over tid (5\u20136-\u00e5ringer kan f\u00f8lge en prosess over dager og uker)', howWeAddress: 'Plantevekst-dagb\u00f8ker og v\u00e5rkalendere p\u00e5 oppgaveark trener systematisk observasjon og enkel dataregistrering' },
      { milestone: 'M\u00e5ling med ikke-standardiserte enheter', howWeAddress: 'M\u00e5l-planten-med-klosser-oppgaver gir konkret m\u00e5lingstrening som bygger matematisk forst\u00e5else' },
      { milestone: 'Livssyklus og vekstforst\u00e5else (fr\u00f8 \u2192 spire \u2192 plante \u2192 blomst)', howWeAddress: 'Sekvenserings\u00f8velser med plantens livssyklus i fire trinn bygger naturvitenskapelig og tidslig forst\u00e5else' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 \u00e9n v\u00e5rprosess (fr\u00f8sp\u00e6ring), bruk fysiske fr\u00f8 og planter som supplement, og hold tellingen innenfor 10. For avanserte barn i barnehageklassen, introduser sammenligningsm\u00e5linger (hvilken plante er h\u00f8yest?), v\u00e6rregistrering over uken og selvstendig skriving av v\u00e5rdagbok.',
    parentTakeaway: 'V\u00e5ren er naturens egen l\u00e6rebok. S\u00e5 fr\u00f8 i et glass og m\u00e5l veksten sammen med barnet \u2014 bruk en linjal eller klosser. Tell blomster i hagen, observer n\u00e5r trekkfuglene kommer tilbake, og snakk om endringene: \u00abhvorfor kommer bladene n\u00e5?\u00bb, \u00abhva trengs for at planten skal vokse?\u00bb Oppgavearkene gir struktur til all denne v\u00e5roppdagelsen.',
    classroomIntegration: 'V\u00e5rtemaet integreres i barnehageklassens naturfag gjennom hele sesongen: i samlingen oppdateres v\u00e5rkalenderen, ved l\u00e6ringsstasjoner arbeides det med m\u00e5lings- og sekvensark, i naturfagkroken observeres klassens planteprosjekt, og p\u00e5 utedager samles v\u00e5rtegn og telles blomster. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi integreres gjennom systematisk v\u00e5rutforskning.',
    assessmentRubric: [
      { skill: 'Observasjon og registrering (v\u00e5rkontekst)', emerging: 'beskriver 1\u20132 v\u00e5rendringer med st\u00f8tte', proficient: 'registrerer selvstendig 4\u20135 v\u00e5rendringer og tegner dem i dagbok', advanced: 'f\u00f8rer systematisk v\u00e5rdagbok med m\u00e5linger og skriftlige beskrivelser' },
      { skill: 'M\u00e5ling av plantevekst', emerging: 'm\u00e5ler med klosser med fysisk veiledning', proficient: 'm\u00e5ler selvstendig planteh\u00f8yde med klosser og rapporterer korrekt', advanced: 'sammenligner m\u00e5linger over tid og beskriver vekstm\u00f8nsteret' },
      { skill: 'Livssyklus (fr\u00f8 til blomst)', emerging: 'ordner 2 trinn (fr\u00f8, blomst) med st\u00f8tte', proficient: 'ordner selvstendig 4 livssyklusfaser i korrekt rekkef\u00f8lge', advanced: 'forklarer hva planten trenger i hvert stadium og kobler til egne observasjoner' },
    ],
  },

  summer: {
    snippetAnswer: 'Sommer-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker strand, sol og uteaktiviteter til \u00e5 trene telling til 20, tidsbegreper og begynnende lesing av sommerord. Lange dager og friluftsliv gir rik l\u00e6ringskontekst. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Sommertemaet treffer barnehageklassen spesielt godt fordi fem- og seks\u00e5ringer opplever sommeren som frihetens tid \u2014 lange dager, uteliv og eventyr som kan omsettes til l\u00e6ring. Mens f\u00f8rskolebarn badet og lekte i sanden uten refleksjon, kan barn i barnehageklassen m\u00e5le skyggelengder gjennom dagen, telle skjell og steiner i grupper, og f\u00f8re v\u00e6rdagbok med solskinn og regn. Addisjon og subtraksjon knyttes til sommerscenarier: fem barn i bassenget pluss tre som kommer til, ti isbiter minus fire som smelter. Tidsbegreper som dag, natt, formiddag og ettermiddag f\u00e5r mening n\u00e5r dagene er lange og aktivitetsrike. Kunnskapsl\u00f8ftet og Rammeplan for barnehagen vektlegger friluftsliv og naturopplevelser, og sommeren gir det mest varierte utelaboratoriet.',
    developmentalMilestones: [
      { milestone: 'Tidsforst\u00e5else (5\u20136-\u00e5ringer begynner \u00e5 forst\u00e5 dagsdeler og ukedager)', howWeAddress: 'Sommerrutine-oppgaver med morgen, ettermiddag og kveld trener tidslig rekkef\u00f8lge i kjent kontekst' },
      { milestone: 'Telling og gruppering i naturen', howWeAddress: 'Skjell- og steintelling i grupper p\u00e5 to, fem og ti bygger grupperingsforst\u00e5else med naturmaterialer' },
      { milestone: 'M\u00e5ling og sammenligning (skygger, temperatur)', howWeAddress: 'Skyggelengde-m\u00e5ling og enkel temperaturavlesning gir konkret m\u00e5lingstrening med sommerens fenomener' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 grunnleggende sommeraktiviteter (strand, bading, is), hold tellingen innenfor 10, og bruk fysiske gjenstander (skjell, steiner) som supplement. For avanserte barn i barnehageklassen, introduser tidsregistrering (n\u00e5r st\u00e5r solen opp og ned?), sammenligningsm\u00e5linger og selvstendig skriving av sommerdagbok.',
    parentTakeaway: 'Sommeren er full av l\u00e6ringsanledninger. Tell skjell p\u00e5 stranden og sorter etter st\u00f8rrelse, m\u00e5l skyggen din om morgenen og ettermiddagen, f\u00f8r v\u00e6rdagbok og tell soldager mot regndager. Lag en sommerbingo med oppgaver: \u00abfinn fem steiner, tell tr\u00e6rne i parken, skriv navnet p\u00e5 tre blomster.\u00bb Oppgavearkene forsterker all denne utel\u00e6ringen.',
    classroomIntegration: 'Sommertemaet integreres i barnehageklassens siste m\u00e5neder: i samlingen snakkes det om sommerplaner og v\u00e6r, ved l\u00e6ringsstasjoner arbeides det med telle- og m\u00e5lingsark, p\u00e5 utedager m\u00e5les skygger og telles naturgjenstander, og i kunstkroken lages sommercollager. Rammeplanens m\u00e5l for natur, friluftsliv og matematisk utforskning integreres i sommeraktivitetene.',
    assessmentRubric: [
      { skill: 'Tidsforst\u00e5else (dagsdeler)', emerging: 'navngir morgen og kveld med st\u00f8tte', proficient: 'ordner selvstendig fire dagsdeler i rekkef\u00f8lge og knytter aktiviteter til dem', advanced: 'bruker tidsbegreper i egne setninger og sammenligner daglengde sommer mot vinter' },
      { skill: 'Telling og gruppering (naturmaterialer)', emerging: 'teller 1\u201310 gjenstander \u00e9n og \u00e9n med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og grupperer i toere og femmere', advanced: 'bruker gruppetelling til \u00e5 l\u00f8se addisjonsoppgaver med naturmaterialer' },
      { skill: 'M\u00e5ling og sammenligning', emerging: 'm\u00e5ler med \u00e9n enhet med fysisk veiledning', proficient: 'm\u00e5ler selvstendig med klosser og sammenligner to m\u00e5linger', advanced: 'registrerer m\u00e5linger over tid og beskriver m\u00f8nsteret (skyggen er kortere n\u00e5)' },
    ],
  },

  superheroes: {
    snippetAnswer: 'Superhelt-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker superkrefter, kapper og helteoppdrag til \u00e5 trene addisjon innenfor 10, probleml\u00f8sning og begynnende skriving av heltehistorier. Fantasiens kraft driver l\u00e6ringen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Superhelttemaet har en s\u00e6rlig kraft i barnehageklassen fordi fem- og seks\u00e5ringer forst\u00e5r heltefortellingens struktur \u2014 et problem oppst\u00e5r, helten bruker sine evner, og problemet l\u00f8ses. Denne narrative forst\u00e5elsen er ny sammenlignet med f\u00f8rskolens enkle rollelek. Matematikk knyttes til helteoppdrag: helten redder fem katter pluss tre hunder, helten har ti superkrefter men bruker fire. Probleml\u00f8sningsoppgaver der barnet m\u00e5 finne den rette veien gjennom en labyrint for \u00e5 redde dagen trener logisk tenkning. Skriving av heltehistorier med begynnelse, midtdel og slutt gir funksjonell skrivetrening med kreativt engasjement. Rammeplan for barnehagen vektlegger kunst, kultur og kreativitet, og superhelttemaet utl\u00f8ser den forestillingsevnen som driver l\u00e6ring.',
    developmentalMilestones: [
      { milestone: 'Narrativ forst\u00e5else (5\u20136-\u00e5ringer kan f\u00f8lge og gjenfortelle en historie med begynnelse, midtdel og slutt)', howWeAddress: 'Helteoppdrag-sekvensering der barn ordner hendelser i riktig rekkef\u00f8lge trener narrativ tenkning og tidslogikk' },
      { milestone: 'Probleml\u00f8sning og logisk tenkning', howWeAddress: 'Labyrint- og oppdragsoppgaver der helten m\u00e5 finne veien gjennom hindringer bygger steg-for-steg-probleml\u00f8sning' },
      { milestone: 'Kreativ skriving med struktur', howWeAddress: 'Heltehistorie-skrivemaler med bilder og setningsstartere gir st\u00f8ttet kreativ skrivetrening' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, bruk enkle oppdrag med ett trinn (helten finner tre gjenstander), hold matematikken innenfor 5, og tilby skrivemaler med prikkede bokstaver. For avanserte barn i barnehageklassen, introduser flertrinnsoppdrag, matematikk innenfor 20 og selvstendig skriving av egne heltehistorier med flere setninger.',
    parentTakeaway: 'Barn elsker \u00e5 v\u00e6re helter. Lag helteoppdrag hjemme: \u00abfinn fem r\u00f8de gjenstander i stuen, redde tre kosedyr fra gulvet, tell hvor mange du reddet.\u00bb La barnet lage sin egen heltekappe og skriv superkraften p\u00e5 den. Fortell heltehistorier ved leggetid og la barnet bestemme hva som skjer: \u00abhvordan l\u00f8ste helten problemet?\u00bb Oppgavearkene gir struktur til denne fantasien.',
    classroomIntegration: 'Superhelttemaet brukes som temauke i barnehageklassen: i samlingen introduseres klassens heltefigur, ved l\u00e6ringsstasjoner arbeides det med oppdragsmatte og ords\u00f8k, i kunstkroken lages heltemasker og kapper, og i rolleleken l\u00f8ses helteoppdrag i grupper. Rammeplanens m\u00e5l for kunst, kreativitet, kommunikasjon og sosiale ferdigheter integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Narrativ sekvensering (heltehistorie)', emerging: 'ordner 2 hendelser (problem og l\u00f8sning) med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 hendelser i riktig rekkef\u00f8lge med begynnelse, midtdel og slutt', advanced: 'lager egne heltehistorier med tydelig struktur og forteller dem muntlig' },
      { skill: 'Probleml\u00f8sning (helteoppdrag)', emerging: 'l\u00f8ser enkle \u00e9n-trinns oppdrag med st\u00f8tte', proficient: 'l\u00f8ser selvstendig to-trinns oppdrag og forklarer strategien', advanced: 'planlegger og l\u00f8ser flertrinnsoppdrag og skaper egne oppdrag for klassekamerater' },
      { skill: 'Helteregning (addisjon/subtraksjon)', emerging: 'l\u00f8ser addisjonsoppgaver innenfor 5 med konkret st\u00f8tte', proficient: 'l\u00f8ser selvstendig addisjons- og subtraksjonsoppgaver innenfor 10 med heltescenarier', advanced: 'formulerer egne helteregneoppgaver og l\u00f8ser dem innenfor 20' },
    ],
  },

  toys: {
    snippetAnswer: 'Leke-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker dukker, biler, klosser og brettspill til \u00e5 trene telling, sortering etter flere egenskaper og begynnende skriving av lekenavn. Kjente leker gj\u00f8r abstrakt l\u00e6ring konkret. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Leketemaet f\u00e5r en ny dimensjon i barnehageklassen fordi fem- og seks\u00e5ringer g\u00e5r fra parallell lek til samarbeidende regelbasert lek \u2014 de forhandler om regler, fordeler leker rettferdig og organiserer lekesamlinger. Mens f\u00f8rskolebarn lekte fritt, kan barn i barnehageklassen telle og sortere leker etter type, materiale og st\u00f8rrelse samtidig, l\u00f8se fordelingsoppgaver (12 klosser delt p\u00e5 3 barn), og skrive lister over yndlingsleker. Addisjon og subtraksjon knyttes til hverdagsscenarier: du har \u00e5tte biler og gir bort tre, hvor mange har du igjen? Skriving av lekenavn trener begynnende staveferdigheter med ord barnet kjenner intimt. Rammeplanens m\u00e5l for lek, l\u00e6ring og danning st\u00f8ttes n\u00e5r barn kobler sine egne leker med strukturert l\u00e6ring.',
    developmentalMilestones: [
      { milestone: 'Klassifisering etter flere egenskaper (5\u20136-\u00e5ringer kan sortere etter to kriterier samtidig)', howWeAddress: 'Lekesorteringsark der barn plasserer leker i kategorier etter b\u00e5de type og materiale bygger logisk flerdimensjonal tenkning' },
      { milestone: 'Rettferdig fordeling (tidlig divisjonsforst\u00e5else)', howWeAddress: 'Fordelingsoppgaver der leker deles likt mellom barn gir praktisk introduksjon til rettferdig deling' },
      { milestone: 'Skriving av hverdagsord (lekenavn)', howWeAddress: 'Ordsporing og skriving av kjente lekenavn (ball, bil, dukke) gir motiverende skrivetrening i personlig kontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til barnets egne favorittleker, hold sorteringen til \u00e9n egenskap og tellingen innenfor 10. For avanserte barn i barnehageklassen, introduser flerdimensjonal sortering (type pluss farge pluss st\u00f8rrelse), fordelingsoppgaver med rest, og selvstendig skriving av lekebeskrivelser og \u00f8nskelister.',
    parentTakeaway: 'Barnets egen lekekasse er et gratis matematikkverksted. Tell leker sammen, sorter etter type (biler, dukker, klosser), og \u00f8v fordeling: \u00abhvordan deler vi 10 klosser likt mellom deg og s\u00f8steren din?\u00bb La barnet skrive en \u00f8nskeliste med lekenavn. Opprydding er telling: \u00abhvor mange biler la du tilbake i kassen?\u00bb Oppgavearkene formaliserer det barnet allerede gj\u00f8r daglig med leker.',
    classroomIntegration: 'Leketemaet integreres i barnehageklassens hverdag: i samlingen diskuteres favorittleker og regler for \u00e5 dele, ved l\u00e6ringsstasjoner arbeides det med sorterings- og fordelingsark, i lekekroken organiseres leker etter kategorier, og i matematikkstunden brukes konkrete leker som tellemateriale. Rammeplanens m\u00e5l for lek, danning og sosiale ferdigheter integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Lekesortering etter flere egenskaper', emerging: 'sorterer leker i 2 grupper etter \u00e9n egenskap med st\u00f8tte', proficient: 'sorterer selvstendig etter to egenskaper (type og materiale) i 4+ grupper', advanced: 'oppretter egne sorteringskriterier og forklarer dem til andre' },
      { skill: 'Rettferdig fordeling av leker', emerging: 'fordeler leker med \u00e9n-til-\u00e9n-korrespondanse med st\u00f8tte', proficient: 'fordeler selvstendig leker likt mellom 2\u20133 barn og bekrefter med telling', advanced: 'l\u00f8ser fordelingsoppgaver med rest og forklarer hva som skjer med det som er til overs' },
      { skill: 'Skriving av lekenavn', emerging: 'sporer 2\u20133 lekenavn p\u00e5 prikkede linjer', proficient: 'skriver selvstendig 5\u20136 vanlige lekenavn leselig', advanced: 'skriver lekenavn i korte setninger og lager egne \u00f8nskelister' },
    ],
  },

  transportation: {
    snippetAnswer: 'Transport-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker biler, busser, tog og fly til \u00e5 trene telling, klassifisering etter transport-type og begynnende lesing av kj\u00f8ret\u00f8yord. Hverdagsreiser gj\u00f8r l\u00e6ringen gjenkjennelig. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Transporttemaet f\u00e5r en ny dybde i barnehageklassen fordi fem- og seks\u00e5ringer begynner \u00e5 forst\u00e5 transportsystemer \u2014 ikke bare enkeltbiler, men hvordan busser, tog, ferger og fly utfyller hverandre for \u00e5 flytte mennesker. Mens f\u00f8rskolebarn kjente igjen kj\u00f8ret\u00f8y, kan barn i barnehageklassen klassifisere etter transportmiddel (land, sj\u00f8, luft), sammenligne st\u00f8rrelse og hastighet, og forst\u00e5 enkle rutekart. Telling av passasjerer som g\u00e5r p\u00e5 og av bussen gir addisjon og subtraksjon i realistisk kontekst. Skriving av kj\u00f8ret\u00f8yord og destinasjoner trener lesefundamentet. Kunnskapsl\u00f8ftet (LK20) og Rammeplan for barnehagen vektlegger n\u00e6rmilj\u00f8et, og transport er en sentral del av barnets daglige erfaring med verden utenfor hjemmet.',
    developmentalMilestones: [
      { milestone: 'Klassifisering etter transportmiddel (5\u20136-\u00e5ringer kan sortere etter land, sj\u00f8 og luft)', howWeAddress: 'Sorteringsark der barn plasserer kj\u00f8ret\u00f8y i riktig kategori (vei, skinne, vann, luft) bygger systematisk klassifisering' },
      { milestone: 'Addisjon og subtraksjon med passasjertelling', howWeAddress: 'Buss- og togscenarier med passasjerer som g\u00e5r p\u00e5 og av gir konkret aritmetikk i gjenkjennelig kontekst' },
      { milestone: 'Enkel kartlesing og retningsforst\u00e5else', howWeAddress: 'Ruteoppgaver der barn f\u00f8lger enkle kart fra start til m\u00e5l bygger romlig orientering og retningsforst\u00e5else' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til tre kj\u00f8ret\u00f8y (bil, buss, fly), bruk lekeleker som supplement, og hold tellingen innenfor 10. For avanserte barn i barnehageklassen, introduser avansert klassifisering (privat/offentlig transport), ruteplanlegging med flere stopp og selvstendig skriving av reisebeskrivelser.',
    parentTakeaway: 'Transport er overalt i hverdagen. P\u00e5 bussturen, tell passasjerer som g\u00e5r p\u00e5 og av, og regn ut: \u00abhvor mange er p\u00e5 bussen n\u00e5?\u00bb P\u00e5 kj\u00f8returen, tell biler i ulike farger. P\u00e5 toget, se p\u00e5 rutetabellen og finn neste stopp. La barnet skrive en \u00abliste over kj\u00f8ret\u00f8y vi s\u00e5 i dag.\u00bb Oppgavearkene gir struktur til alle disse daglige reiseopplevelsene.',
    classroomIntegration: 'Transporttemaet integreres i barnehageklassens n\u00e6rmilj\u00f8undervisning: i samlingen vises bilder av ulike transportmidler og diskuteres hverdagsreiser, ved l\u00e6ringsstasjoner arbeides det med sorterings- og telleark, i rolleleken drives buss og togstasjon, og p\u00e5 turer observeres trafikk og kj\u00f8ret\u00f8y. Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8 og samfunn integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Transportklassifisering (land/sj\u00f8/luft)', emerging: 'sorterer 2\u20133 kj\u00f8ret\u00f8y i riktig kategori med st\u00f8tte', proficient: 'sorterer selvstendig 8+ kj\u00f8ret\u00f8y etter transporttype (vei, skinne, vann, luft)', advanced: 'oppretter underkategorier (privat/offentlig) og forklarer forskjellene' },
      { skill: 'Passasjertelling (addisjon/subtraksjon)', emerging: 'teller passasjerer innenfor 5 med konkret st\u00f8tte', proficient: 'l\u00f8ser selvstendig p\u00e5/av-oppgaver innenfor 10 og skriver regnestykket', advanced: 'l\u00f8ser flertrinns passasjeroppgaver innenfor 20 med flere stopp' },
      { skill: 'Enkel kartlesing og rutef\u00f8lging', emerging: 'f\u00f8lger en enkel rett rute med st\u00f8tte', proficient: 'f\u00f8lger selvstendig et rutekart med 3\u20134 stopp og svinger', advanced: 'tegner egne enkle rutekart og gir retningsanvisninger til andre' },
    ],
  },

  travel: {
    snippetAnswer: 'Reise-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker koffert, kart og land til \u00e5 trene telling, sortering og begynnende geografi. Barn l\u00e6rer \u00e5 planlegge, pakke og oppdage verden gjennom lek. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Reisetemaet er spesielt kraftfullt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan tenke ut over sitt n\u00e6rmilj\u00f8 \u2014 de sp\u00f8r \u00abhvor bor farmor?\u00bb, \u00abhvor langt er det til hytta?\u00bb og \u00abhvilke land finnes?\u00bb. Denne voksende geografiske nysgjerrigheten overg\u00e5r f\u00f8rskolens her-og-n\u00e5-fokus. Pakkekoffert-oppgaver gir telling og planlegging: barnet teller 5 gensere, 3 bukser og 2 par sko og regner ut totalen. Enkel kartlesing med symboler og retninger introduserer romlig tenkning. Begynnende skriving av stedsnavn og pakkelister gir funksjonell skrivetrening. Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8 og samfunn utvides n\u00e5r barn oppdager at verden er st\u00f8rre enn nabolaget.',
    developmentalMilestones: [
      { milestone: 'Geografisk bevissthet (5\u20136-\u00e5ringer forst\u00e5r at steder finnes utenfor n\u00e6rmilj\u00f8et)', howWeAddress: 'Enkle kart- og flaggoppgaver som viser Norge i verden bygger grunnleggende geografisk forst\u00e5else' },
      { milestone: 'Planlegging og organisering (pakking av koffert)', howWeAddress: 'Pakkeliste-oppgaver der barn velger og teller gjenstander etter reisem\u00e5l trener planleggingsevne og addisjon' },
      { milestone: 'Funksjonell skriving (stedsnavn og lister)', howWeAddress: 'Skriving av pakkelister og stedsnavn gir autentisk skrivetrening med personlig engasjement' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til kjente reisem\u00e5l (hytta, bestem\u00f8dre, n\u00e6rmeste by), hold tellingen innenfor 10, og bruk fysiske gjenstander for \u00e5 pakke en mini-koffert. For avanserte barn i barnehageklassen, introduser enkle verdenskart, flagggjenkjenning og selvstendig skriving av reisedagbok med flere setninger.',
    parentTakeaway: 'Reiser er gylne l\u00e6ringsmuligheter. F\u00f8r ferien, la barnet pakke sin egen vesker og telle gjenstandene. Se p\u00e5 kartet sammen: \u00abhvor skal vi? Hvordan kommer vi dit?\u00bb P\u00e5 reisen, tell tunneler, broer og byer dere passerer. Etter ferien, lag en reisedagbok med tegninger og ord. Selv en dagstur til nabobyen er en reise som kan gi telling, skriving og karterfaring.',
    classroomIntegration: 'Reisetemaet integreres som temauke i barnehageklassen: i samlingen \u00abflyr\u00bb klassen til et nytt land hver dag med oppdrag og oppgaver, ved l\u00e6ringsstasjoner arbeides det med pakkeliste-matematikk og kartoppgaver, i rolleleken drives flyplass og hotell, og i kunstkroken lages reisecollager med flagg og bilder. Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8 og samfunn utvides til verden.',
    assessmentRubric: [
      { skill: 'Geografisk bevissthet', emerging: 'peker ut hjemstedet sitt p\u00e5 et enkelt kart med st\u00f8tte', proficient: 'gjenkjenner selvstendig Norge p\u00e5 kartet og navngir 2\u20133 byer/steder', advanced: 'lokaliserer Norge i Norden og kjenner igjen 3\u20134 flagg' },
      { skill: 'Planlegging og telling (pakking)', emerging: 'teller 1\u20135 pakkede gjenstander med st\u00f8tte', proficient: 'teller selvstendig opptil 15 gjenstander og lager enkel pakkeliste', advanced: 'planlegger pakking etter reisem\u00e5l og v\u00e6r, og regner ut totalantallet med addisjon' },
      { skill: 'Reiseskriving (stedsnavn/lister)', emerging: 'sporer 2\u20133 stedsnavn p\u00e5 prikkede linjer', proficient: 'skriver selvstendig 4\u20135 stedsnavn og enkle pakkelister', advanced: 'skriver reisedagbok med flere setninger om hva de opplevde' },
    ],
  },

  vegetables: {
    snippetAnswer: 'Gr\u00f8nnsak-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker gulr\u00f8tter, erter og tomater til \u00e5 trene telling, sortering etter egenskaper og begynnende lesing av gr\u00f8nnsaknavn. Helseforst\u00e5else kobles til hverdagsmaten. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Gr\u00f8nnsaktemaet f\u00e5r en ny dimensjon i barnehageklassen fordi fem- og seks\u00e5ringer begynner \u00e5 forst\u00e5 sammenhengen mellom mat og helse \u2014 de kan l\u00e6re at gr\u00f8nnsaker gir vitaminer, at forskjellige farger betyr ulike n\u00e6ringsstoffer, og at kroppen trenger variert kost. Mens f\u00f8rskolebarn smakte og sorterte etter farge, kan barn i barnehageklassen klassifisere gr\u00f8nnsaker etter vokser over/under jorden, sortere etter farge og form samtidig, og f\u00f8lge en enkel oppskrift. Telling av gr\u00f8nnsaker i grupper gir addisjon og subtraksjon i kjent kontekst. Skriving av gr\u00f8nnsaknavn p\u00e5 3\u20135 bokstaver (ert, l\u00f8k, kool) trener begynnende staveferdigheter. Rammeplanens m\u00e5l for kropp, bevegelse, mat og helse st\u00f8ttes n\u00e5r barn utforsker gr\u00f8nnsaker faglig.',
    developmentalMilestones: [
      { milestone: 'Helseforst\u00e5else (5\u20136-\u00e5ringer kobler mat med kroppens behov)', howWeAddress: 'Fargesortering av gr\u00f8nnsaker med forklaring av vitaminer og n\u00e6ring bygger grunnleggende helseforst\u00e5else' },
      { milestone: 'Klassifisering etter voksested (over/under jorden)', howWeAddress: 'Sorteringsark der barn plasserer gr\u00f8nnsaker i riktig kategori trener naturfaglig klassifisering' },
      { milestone: 'Oppskriftsf\u00f8lging (rekkef\u00f8lge og m\u00e5ling)', howWeAddress: 'Enkle gr\u00f8nnsakoppskrifter p\u00e5 oppgaveark der barn f\u00f8lger trinn og teller ingredienser gir funksjonell lesing og m\u00e5ling' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til fem velkjente gr\u00f8nnsaker (gulrot, tomat, agurk, ert, potet), bruk ekte gr\u00f8nnsaker som supplement, og hold tellingen innenfor 10. For avanserte barn i barnehageklassen, introduser mindre kjente gr\u00f8nnsaker, sammenligningsm\u00e5linger (hvilken er lengst?) og selvstendig skriving av gr\u00f8nnsakoppskrifter.',
    parentTakeaway: 'Gj\u00f8r matlaging til l\u00e6ring. Tell gr\u00f8nnsaker sammen n\u00e5r dere lager middag: \u00abhvor mange gulr\u00f8tter trenger vi? Vi har tre, pappa spiser to, mamma spiser en.\u00bb Sorter gr\u00f8nnsakene p\u00e5 kj\u00f8kkenbenken etter farge. La barnet skrive en handleliste for gr\u00f8nnsaker. P\u00e5 matbutikken, la barnet finne og telle gr\u00f8nnsakene fra listen. Oppgavearkene forsterker denne hverdagsl\u00e6ringen.',
    classroomIntegration: 'Gr\u00f8nnsaktemaet integreres i barnehageklassens mat- og helseundervisning: i samlingen vises ukens gr\u00f8nnsak med smak og samtale, ved l\u00e6ringsstasjoner arbeides det med sorterings- og telleark, i skolekj\u00f8kkenet lages enkel gr\u00f8nnsaksuppe med telling av ingredienser, og i skolehagen s\u00e5s og h\u00f8stes gr\u00f8nnsaker. Rammeplanens m\u00e5l for mat, helse og natur integreres gjennom praktisk matl\u00e6ring.',
    assessmentRubric: [
      { skill: 'Gr\u00f8nnsakklassifisering (over/under jorden)', emerging: 'sorterer 2\u20133 gr\u00f8nnsaker i riktig kategori med st\u00f8tte', proficient: 'sorterer selvstendig 6\u20138 gr\u00f8nnsaker etter voksested og farge', advanced: 'forklarer hvorfor gr\u00f8nnsaker vokser forskjellig og navngir deler (rot, blad, frukt)' },
      { skill: 'Telling og m\u00e5ling med gr\u00f8nnsaker', emerging: 'teller 1\u201310 gr\u00f8nnsaker med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og sammenligner lengder (hvilken gulrot er lengst?)', advanced: 'm\u00e5ler gr\u00f8nnsaker med klosser og bruker m\u00e5lingene i addisjonsoppgaver' },
      { skill: 'Lesing av gr\u00f8nnsaknavn', emerging: 'gjenkjenner 2\u20133 gr\u00f8nnsakord med bildest\u00f8tte', proficient: 'leser selvstendig 5\u20136 gr\u00f8nnsaknavn og staver dem i ords\u00f8k', advanced: 'leser nye gr\u00f8nnsaknavn ved avkoding og bruker dem i korte setninger' },
    ],
  },

  weather: {
    snippetAnswer: 'V\u00e6r-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker sol, regn, sn\u00f8 og vind til \u00e5 trene enkel dataregistrering, telling og begynnende lesing av v\u00e6rord. Daglige v\u00e6robservasjoner gir systematisk l\u00e6ring. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'V\u00e6rtemaet er perfekt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan registrere og sammenligne observasjoner over tid \u2014 de kan f\u00f8re v\u00e6rdagbok, telle soldager mot regndager over en uke, og oppdage m\u00f8nstre. Denne evnen til systematisk datainnsamling er ny sammenlignet med f\u00f8rskolens spontane v\u00e6rsamtaler. V\u00e6ret gir daglig matematikk: telling av v\u00e6rsymboler, sammenligning av mengder (flere soldager enn regndager denne uken?) og enkle diagrammer. Skriving av v\u00e6rord (sol, regn, vind, sn\u00f8) trener begynnende leseferdigheter med korte, lydrett ord. Kl\u00e6svalg basert p\u00e5 v\u00e6rmelding kobler naturvitenskap med hverdagslogikk. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi st\u00f8ttes direkte av systematisk v\u00e6robservasjon.',
    developmentalMilestones: [
      { milestone: 'Systematisk observasjon og dataregistrering (5\u20136-\u00e5ringer kan registrere v\u00e6r daglig)', howWeAddress: 'V\u00e6rdagboksark med symboler for sol, regn, vind og sn\u00f8 trener daglig observasjon og enkel dataregistrering' },
      { milestone: 'Sammenligning av data (mer enn / f\u00e6rre enn)', howWeAddress: 'Tellediagrammer som sammenligner v\u00e6rtyper over en uke gir konkret datasammenligning i visuelt format' },
      { milestone: 'V\u00e6r-til-kl\u00e6r-logikk (praktisk \u00e5rsak-virkning)', howWeAddress: 'Koblingsoppgaver som parer v\u00e6rtyper med riktige kl\u00e6splagg bygger logisk resonnement i hverdagskontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til fire grunnv\u00e6rtyper (sol, regn, sn\u00f8, sky), bruk fysisk v\u00e6rtavle som supplement, og hold tellingen innenfor 7 (en uke). For avanserte barn i barnehageklassen, introduser temperaturavlesning, v\u00e6rsp\u00e5dommer med begrunnelse og selvstendig skriving av v\u00e6rrapporter.',
    parentTakeaway: 'V\u00e6ret er daglig l\u00e6ring som aldri blir kjedelig. Start hver morgen med \u00e5 se ut vinduet sammen: \u00abhvilket v\u00e6r er det i dag?\u00bb, \u00abhva skal vi ha p\u00e5 oss?\u00bb F\u00f8r en enkel v\u00e6rdagbok p\u00e5 kj\u00f8leskapet med klistremerker for sol og regn. Tell soldager ved ukeslutt. Snakk om v\u00e6rmeldingen: \u00abdet skal regne i morgen, hva m\u00e5 vi ha med?\u00bb Oppgavearkene gir struktur til denne daglige v\u00e6rutforskningen.',
    classroomIntegration: 'V\u00e6rtemaet er perfekt for daglig integrering i barnehageklassen: hver morgen oppdateres v\u00e6rtavlen i samlingen med dagens observasjon, ukentlig telles og sammenlignes v\u00e6rdataene, ved l\u00e6ringsstasjoner arbeides det med v\u00e6rords\u00f8k og kl\u00e6skoblingsark, og p\u00e5 utedager observeres v\u00e6ret direkte med m\u00e5linger. Rammeplanens m\u00e5l for natur, milj\u00f8, matematikk og kommunikasjon integreres gjennom systematisk v\u00e6rarbeid.',
    assessmentRubric: [
      { skill: 'V\u00e6robservasjon og registrering', emerging: 'identifiserer 2\u20133 v\u00e6rtyper med st\u00f8tte og plasserer symbol', proficient: 'registrerer selvstendig daglig v\u00e6r med korrekt symbol og skriver v\u00e6rordet', advanced: 'f\u00f8rer systematisk v\u00e6rdagbok over uken og sammenligner med forrige uke' },
      { skill: 'Datasammenligning (v\u00e6rstatistikk)', emerging: 'peker ut \u00abflest\u00bb med st\u00f8tte n\u00e5r to kategorier sammenlignes', proficient: 'teller selvstendig og sammenligner 3\u20134 v\u00e6rtyper over en uke med korrekt bruk av flere/f\u00e6rre', advanced: 'lager egne tellediagrammer og formulerer sp\u00f8rsm\u00e5l om dataene' },
      { skill: 'V\u00e6r-til-kl\u00e6r-kobling', emerging: 'kobler 1\u20132 v\u00e6rtyper med riktige kl\u00e6r med st\u00f8tte', proficient: 'kobler selvstendig 4 v\u00e6rtyper med passende antrekk og begrunner valget', advanced: 'planlegger kl\u00e6r for skiftende v\u00e6r gjennom dagen og forklarer begrunnelsen' },
    ],
  },

  winter: {
    snippetAnswer: 'Vinter-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker sn\u00f8, is, ski og sn\u00f8menn til \u00e5 trene telling, m\u00f8nstergjenkjenning og begynnende lesing av vinterord. Norsk vinterkultur gir autentisk l\u00e6ringskontekst. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Vintertemaet er s\u00e6rlig relevant for barnehageklassen i Norge fordi fem- og seks\u00e5ringer opplever vinteren som sin f\u00f8rste skisesong, sn\u00f8hulebygging med regler og f\u00f8rste aking p\u00e5 lang bakke. Mens f\u00f8rskolebarn lekte fritt i sn\u00f8en, kan barn i barnehageklassen m\u00e5le sn\u00f8dybde, telle sn\u00f8baller i grupper, og f\u00f8lge instruksjoner for \u00e5 bygge en sn\u00f8mann i riktig rekkef\u00f8lge (stor kule, middels kule, liten kule). M\u00f8nstergjenkjenning trenes med iskrystaller og sn\u00f8fnuggformer. Addisjon og subtraksjon knyttes til vinterscenarier: seks fugler p\u00e5 fuglebrettet minus to som flyr bort. Skriving av vinterord (sn\u00f8, ski, is, vott) gir begynnende skrivetrening med korte, lydrett ord. Rammeplanens m\u00e5l for friluftsliv, kropp og natur st\u00f8ttes av vinteraktiviteter.',
    developmentalMilestones: [
      { milestone: 'Rekkef\u00f8lge og instruksjonsf\u00f8lging (5\u20136-\u00e5ringer kan f\u00f8lge flertrinns instruksjoner)', howWeAddress: 'Sn\u00f8mannbyggings-sekvenser med 3\u20135 trinn trener rekkef\u00f8lgeforst\u00e5else og instruksjonsf\u00f8lging' },
      { milestone: 'M\u00f8nstergjenkjenning (symmetri i sn\u00f8fnugg og iskrystaller)', howWeAddress: 'Sn\u00f8fnugg-symmetriark og m\u00f8nsterf\u00f8lging med vinterformer bygger geometrisk og algebraisk tenkning' },
      { milestone: 'M\u00e5ling i vinterkontekst (sn\u00f8dybde, temperatur)', howWeAddress: 'Sn\u00f8dybdem\u00e5ling med klosser og enkel temperaturavlesning gir konkret m\u00e5lingstrening med vinterens fenomener' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til grunnleggende vinterelementer (sn\u00f8, vott, ski), hold sekvensene til 2\u20133 trinn, og bruk fysisk sn\u00f8lek som supplement. For avanserte barn i barnehageklassen, introduser komplekse sn\u00f8fnuggm\u00f8nstre, sammenligningsm\u00e5linger over tid og selvstendig skriving av vinterdagbok.',
    parentTakeaway: 'Norsk vinter er et kjempestort klasserom. Bygg sn\u00f8mann sammen og snakk om rekkef\u00f8lgen: \u00abstor kule f\u00f8rst, s\u00e5 middels, s\u00e5 liten.\u00bb M\u00e5l sn\u00f8dybden med en pinne og tell centimeterne. Tell fugler p\u00e5 fuglebrettet. G\u00e5 p\u00e5 ski og tell svingene. La barnet tegne en sn\u00f8fnugg og finn symmetrien. Oppgavearkene gir struktur til all denne vinterl\u00e6ringen som er s\u00e5 naturlig i Norge.',
    classroomIntegration: 'Vintertemaet integreres i barnehageklassens vinterhverdag: i samlingen oppdateres temperatur og sn\u00f8dagbok, ved l\u00e6ringsstasjoner arbeides det med m\u00f8nster- og sekvensark, p\u00e5 utedager m\u00e5les sn\u00f8 og bygges sn\u00f8mann etter plan, og i kunstkroken klippes symmetriske sn\u00f8fnugg. Rammeplanens m\u00e5l for friluftsliv, natur, kropp og matematikk integreres i vinteraktivitetene.',
    assessmentRubric: [
      { skill: 'Sn\u00f8mannbygging (rekkef\u00f8lge)', emerging: 'ordner 2 trinn i sn\u00f8mannbygging med st\u00f8tte', proficient: 'ordner selvstendig 4\u20135 trinn i korrekt rekkef\u00f8lge og forklarer hvert steg', advanced: 'planlegger egne byggeprosjekter med sn\u00f8 og gir instruksjoner til andre' },
      { skill: 'M\u00f8nstergjenkjenning (sn\u00f8fnugg/iskrystall)', emerging: 'identifiserer enkel symmetri med st\u00f8tte', proficient: 'fullf\u00f8rer selvstendig symmetriske sn\u00f8fnuggm\u00f8nstre', advanced: 'lager egne symmetriske m\u00f8nstre og forklarer symmetribegrepet' },
      { skill: 'Vinterm\u00e5ling (sn\u00f8dybde)', emerging: 'm\u00e5ler sn\u00f8dybde med klosser med st\u00f8tte', proficient: 'm\u00e5ler selvstendig og rapporterer antall klosser korrekt', advanced: 'sammenligner m\u00e5linger over flere dager og beskriver endringene' },
    ],
  },

  xmas: {
    snippetAnswer: 'Jul-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker juletr\u00e6r, nisser og gaver til \u00e5 trene telling til 20, m\u00f8nstergjenkjenning og begynnende skriving av julekort. Juleglede gir sterkt engasjement. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Juletemaet har en uslitelig kraft i barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan delta aktivt i juleforberedelsene \u2014 de teller ned dagene i adventkalenderen, skriver \u00f8nskelister og lager julegaver selv. Denne aktive deltakelsen overg\u00e5r f\u00f8rskolens passive mottak av juleopplevelser. Matematikk knyttes til juletradisjoner: telling av kuler p\u00e5 juletr\u00e6t, addisjon av gaver under tr\u00e6et, og subtraksjon n\u00e5r kalenderlukene \u00e5pnes (24 minus 3 \u00e5pnede = 21 igjen). M\u00f8nstergjenkjenning trenes med juletr\u00e6pynt i gjentakende fargesekvenser. Skriving av julekort med \u00abGod jul\u00bb og familienavn gir funksjonell skrivetrening. Kunnskapsl\u00f8ftets m\u00e5l for kulturforst\u00e5else og kommunikasjon st\u00f8ttes n\u00e5r barn l\u00e6rer om norske juletradisjoner gjennom oppgaver.',
    developmentalMilestones: [
      { milestone: 'Nedtelling og tallrekkef\u00f8lge baklengs (24, 23, 22 ...)', howWeAddress: 'Adventkalender-oppgaver med nedtelling fra 24 trener baklengs telling og tallrekkef\u00f8lge' },
      { milestone: 'M\u00f8nstergjenkjenning med julepynt', howWeAddress: 'Juletr\u00e6m\u00f8nstre med r\u00f8d-gull-r\u00f8d-gull-? trener algebraisk m\u00f8nstertenkning i festlig kontekst' },
      { milestone: 'Funksjonell skriving (julekort og \u00f8nskelister)', howWeAddress: 'Julekortmaler og \u00f8nskelisteark gir autentisk skrivetrening med h\u00f8y personlig motivasjon' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til enkel telling av juletreelementer, hold m\u00f8nstrene enkle (AB), og tilby skrivemaler med \u00abGod jul\u00bb i prikkede bokstaver. For avanserte barn i barnehageklassen, introduser nedtelling fra 24, komplekse m\u00f8nstre (ABC), flertrinnsaddisjonsoppgaver med julegaver og selvstendig skriving av julehistorier.',
    parentTakeaway: 'Julen er matematikk og skriving p\u00e5 sitt mest engasjerende. La barnet skrive julek\u00f8rt til besteforeldre og venner. Tell kuler p\u00e5 juletr\u00e6t, lys i adventstaken og gaver under tr\u00e6t. Bruk adventskalenderen til daglig nedtelling: \u00abhvor mange dager igjen?\u00bb Bak pepperkaker og tell: \u00abhvor mange stjerner, hjerter, nisser?\u00bb Oppgavearkene forsterker all denne naturlige julel\u00e6ringen.',
    classroomIntegration: 'Juletemaet integreres i barnehageklassens adventstid: i samlingen telles adventlys og oppdateres nedtelling, ved l\u00e6ringsstasjoner arbeides det med telleark og m\u00f8nsteroppgaver med julemotiver, i kunstkroken lages julekort og julepynt, og i rolleleken drives nisseverksted og julegavebutikk. Rammeplanens m\u00e5l for kultur, tradisjon, kreativitet og kommunikasjon integreres i juleaktivitetene.',
    assessmentRubric: [
      { skill: 'Nedtelling (adventkalender)', emerging: 'teller ned fra 10 med st\u00f8tte', proficient: 'teller selvstendig ned fra 24 og finner riktig luke daglig', advanced: 'regner ut hvor mange dager som er igjen med subtraksjonsregnestykke' },
      { skill: 'M\u00f8nstergjenkjenning (julepynt)', emerging: 'fortsetter et enkelt AB-m\u00f8nster med st\u00f8tte', proficient: 'fortsetter selvstendig AB- og ABB-m\u00f8nstre med juleelementer', advanced: 'lager egne komplekse julem\u00f8nstre (ABC) og forklarer reglene' },
      { skill: 'Juleskriving (kort/\u00f8nskelister)', emerging: 'kopierer \u00abGod jul\u00bb fra modell', proficient: 'skriver selvstendig julekort med hilsen og navn', advanced: 'skriver \u00f8nskeliste og julekort med flere setninger og kreativt innhold' },
    ],
  },

  zoo: {
    snippetAnswer: 'Dyrehage-oppgaver for barnehageklassen (5\u20136 \u00e5r) bruker l\u00f8ver, elefanter og sjiraffer til \u00e5 trene telling til 20, klassifisering etter verdensdel og begynnende lesing av dyrenavn. Eksotiske dyr gir dyp motivasjon. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Dyrehagetemaet er s\u00e6rlig kraftfullt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang forst\u00e5r at dyr kommer fra forskjellige verdensdeler og lever i ulike habitater. Mens f\u00f8rskolebarn gledde seg over \u00e5 se l\u00f8ver og apekatter, kan barn i barnehageklassen klassifisere dyr etter kontinent (afrikanske mot asiatiske), levested (savanne, jungel, polart) og egenskaper (pattedyr, fugler, krypdyr). Telling av dyr i innhegninger gir addisjon og subtraksjon med engasjerende motiver. Sammenligning av st\u00f8rrelser (elefant mot mus) gir m\u00e5lingsvokabular. Skriving av eksotiske dyrenavn med 4\u20137 bokstaver trener avansert skrivetrening. Kunnskapsl\u00f8ftet og Rammeplanens m\u00e5l for natur og milj\u00f8 utvides n\u00e5r barn l\u00e6rer om verdens biologiske mangfold.',
    developmentalMilestones: [
      { milestone: 'Avansert klassifisering (5\u20136-\u00e5ringer kan sortere etter habitat og dyretype)', howWeAddress: 'Sorteringsark som grupperer dyr etter kontinent og levested bygger flerdimensjonal biologisk klassifisering' },
      { milestone: 'St\u00f8rrelsessammenligning og m\u00e5lingsvokabular', howWeAddress: 'St\u00f8rrelsessammenlignings-oppgaver med dyrehage-dyr trener ordene st\u00f8rst, minst, h\u00f8yest, kortest i meningsfull kontekst' },
      { milestone: 'Skriving av lengre ord (eksotiske dyrenavn)', howWeAddress: 'Ordsporing og skriving av dyrenavn som sjiraff, elefant og pingvin utfordrer staveferdighetene med motiverende innhold' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til fem popul\u00e6re dyrehagedyr (l\u00f8ve, elefant, ape, pingvin, bj\u00f8rn), hold tellingen innenfor 10, og bruk dyrefigurer som supplement. For avanserte barn i barnehageklassen, introduser verdenskart med dyrehabitat, avansert klassifisering (pattedyr/krypdyr/fugl) og selvstendig skriving av dyrefakta.',
    parentTakeaway: 'Bes\u00f8k en dyrehage eller dyreparken og gj\u00f8r det til l\u00e6ring. Tell dyr i hvert innhegning, sammenlign st\u00f8rrelser (\u00absjiraffen er mye h\u00f8yere enn gassellen\u00bb), og finn dyrene p\u00e5 verdenskartet: \u00abhvor kommer l\u00f8ven fra?\u00bb La barnet skrive en dyrehagerapport med tegning og dyrenavn. Se dyredokumentarer sammen og snakk om habitatene. Oppgavearkene forbereder og forsterker dyrehagebes\u00f8ket.',
    classroomIntegration: 'Dyrehagetemaet integreres som temauke i barnehageklassen: i samlingen introduseres et nytt kontinent med dyr hver dag, ved l\u00e6ringsstasjoner arbeides det med sorterings- og telleark, i kunstkroken lages dyreteater med pappdyr, og i rolleleken drives klassens dyrehage med billetter og dyrestell. Rammeplanens m\u00e5l for natur, milj\u00f8, mangfold og kommunikasjon integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Dyreklassifisering (habitat/type)', emerging: 'sorterer 2\u20133 dyr etter \u00e9n egenskap med st\u00f8tte', proficient: 'sorterer selvstendig 6\u20138 dyr etter b\u00e5de habitat og dyretype', advanced: 'oppretter egne klassifiseringskriterier og plasserer nye dyr korrekt med begrunnelse' },
      { skill: 'St\u00f8rrelsessammenligning (dyrehagekontekst)', emerging: 'peker ut det st\u00f8rste dyret med st\u00f8tte', proficient: 'ordner selvstendig 4\u20135 dyr etter st\u00f8rrelse og bruker ordene st\u00f8rst/minst korrekt', advanced: 'sammenligner og rangerer dyr etter flere dimensjoner (h\u00f8yde, vekt, lengde)' },
      { skill: 'Lesing og skriving av dyrenavn', emerging: 'gjenkjenner 2\u20133 dyrenavn med bildest\u00f8tte', proficient: 'leser og skriver selvstendig 5\u20136 eksotiske dyrenavn', advanced: 'leser nye dyrenavn ved avkoding og skriver dyrefakta med flere setninger' },
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
