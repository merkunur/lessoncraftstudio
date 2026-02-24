#!/usr/bin/env node
/**
 * SEO Part 259: NO First-Grade Enrichment — Themes 1-19
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 19 NO theme files (alphabet through forest).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  alphabet: {
    snippetAnswer: 'Alfabet-oppgaver for 1. klasse (6\u20137 \u00e5r) styrker leseflyt, ordavkoding og selvstendig skriving av ord og korte setninger med alle 29 norske bokstaver som verkt\u00f8y. Ordoppstokking, kryssord og ordgjetteaktiviteter utfordrer elevene. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse skifter alfabetet rolle fra noe barn l\u00e6rer til noe barn bruker \u2014 seks- og sju\u00e5ringer har automatisk bokstavgjenkjenning og anvender n\u00e5 lyd-bokstav-kunnskap til \u00e5 avkode ukjente ord, stave selvstendig og skrive korte setninger. Ordoppstokking krever mental manipulering av bokstavposisjoner, bildekryssord krever flertrinnsstrategi med fonemisk analyse, og ordgjetteaktiviteter bygger slutningsferdigheter. Alfabetisk rekkef\u00f8lge brukes funksjonelt til \u00e5 organisere ordlister og sl\u00e5 opp i enkle ordb\u00f8ker. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for lesing og skriving i 1. trinn krever nettopp denne overgangen fra gjenkjenning til aktiv anvendelse.',
    developmentalMilestones: [
      { milestone: 'Selvstendig ordavkoding (6\u20137-\u00e5ringer trekker bokstavlyder sammen til ord uten voksenst\u00f8tte)', howWeAddress: 'Ordoppstokking og ordgjetteark krever aktiv avkoding og staving, som trener den selvstendige lydtrekkingen' },
      { milestone: 'Flytende bokstavskriving (overgang fra bevisst forming til automatisk produksjon)', howWeAddress: 'Skriveark med ord og korte setninger p\u00e5 linjert papir fremmer automatisk bokstavproduksjon i kontekst' },
      { milestone: 'Alfabetisk ordning som verkt\u00f8y (bruk av rekkef\u00f8lge til \u00e5 organisere og finne informasjon)', howWeAddress: 'Alfabettog-aktiviteter med ordlister og enkel ordboksbruk gj\u00f8r alfabetisk rekkef\u00f8lge funksjonell' },
      { milestone: 'Fonemisk analyse p\u00e5 ordniv\u00e5 (segmentering av hele ord i enkeltlyder)', howWeAddress: 'Bildekryssord krever fonem-for-fonem-analyse og styrker den presise lydanalysen som driver staving' },
    ],
    differentiationNotes: 'For elever som fortsatt avkoder sakte, tilby ordbanker som st\u00f8tte, begrens til trebokstavsord og par oppgaveark med lydrett lesing. For avanserte lesere i 1. klasse utfordres med kryssord uten ordbanker, flerstavelsesord i ordoppstokking og selvstendig bruk av ordbok til \u00e5 verifisere staving.',
    parentTakeaway: 'I 1. klasse skal bokstavene arbeide \u2014 ikke bare gjenkjennes. Les sammen daglig og la barnet lydere nye ord selv. Spill ordoppstokking med bokstavmagneter p\u00e5 kj\u00f8leskapet. La barnet skrive handlelister og korte beskjeder. Hver gang barnet bruker bokstaver til et reelt form\u00e5l, styrkes overgangen fra gjenkjenning til anvendelse.',
    classroomIntegration: 'Alfabetoppgaver i 1. klasse fungerer som verkt\u00f8y p\u00e5 tvers av fag: ordoppstokking introduserer n\u00f8kkelord f\u00f8r en naturfagleksjon, kryssord forsterker ukens staveord, og ordgjetteark brukes som morgenoppvarming. Alfabetisk ordning integreres i bibliotektimen. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for avkoding, staving og skriftlig kommunikasjon i 1. trinn st\u00f8ttes direkte.',
    assessmentRubric: [
      { skill: 'Ordavkoding og lydtrekking', emerging: 'avkoder trebokstavsord sakte med lyd-for-lyd-trekking', proficient: 'avkoder selvstendig ord p\u00e5 4\u20136 bokstaver med sikker lydtrekking', advanced: 'avkoder flerstavelsesord og ukjente ord ved hjelp av stavelsesdeling og kontekst' },
      { skill: 'Selvstendig staving', emerging: 'staver fonetisk med manglende bokstaver (hus \u2192 hs)', proficient: 'staver lydrette ord korrekt og h\u00f8yfrekvente uregelrette ord fra hukommelsen', advanced: 'staver korrekt i frie tekster og anvender stavestrategier ved ukjente ord' },
      { skill: 'Alfabetisk ordning og oppslag', emerging: 'ordner ord etter f\u00f8rstebokstav med st\u00f8tte', proficient: 'ordner selvstendig ord alfabetisk og finner ord i en enkel ordliste', advanced: 'ordner etter andre og tredje bokstav og bruker ordbok selvstendig' },
    ],
  },

  animals: {
    snippetAnswer: 'Dyre-oppgaver for 1. klasse (6\u20137 \u00e5r) kombinerer addisjon og subtraksjon innenfor 20, dyrefakta-lesing og selvstendig skriving av dyrebeskrivelser. Klassifisering utvides til n\u00e6ringskjeder og levesteder. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse g\u00e5r dyretemaet fra observasjon til systematisk kunnskap \u2014 seks- og sju\u00e5ringer kan lese enkle dyrefakta, skrive dyrebeskrivelser og forst\u00e5 n\u00e6ringskjeder som logiske sekvenser. Klassifisering utvides til tre eller flere kriterier samtidig (levested, f\u00f8de, kroppsdekke), og data om dyr samles inn med strek- og s\u00f8ylediagrammer. Addisjon og subtraksjon innenfor 20 med dyrescener gir flertrinnsproblemer med kontekst. Sammenlignende m\u00e5ling (hvilken er lengst?) introduserer standardenheter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk i 1. trinn st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Flertrinnkategorisering (6\u20137-\u00e5ringer sorterer etter tre kriterier samtidig)', howWeAddress: 'Venn-diagrammer og treklassifikasjonsark med dyr bygger opp avansert logisk tenkning' },
      { milestone: 'Addisjon og subtraksjon innenfor 20 (utvidet tallomr\u00e5de med tierovergang)', howWeAddress: 'Dyrescener med tallproblemer innenfor 20, inkludert tierovergang, gir kontekstualisert regning' },
      { milestone: 'Informasjonslesing (lesing av korte faktatekster)', howWeAddress: 'Dyrefakta-kort med 3\u20134 setninger og forst\u00e5elsessp\u00f8rsm\u00e5l trener informasjonslesing' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til velkjente dyr og addisjon innenfor 10 med bildest\u00f8tte. Bruk tellebrikker til tierovergang. For avanserte elever i 1. klasse tilf\u00f8yes flertrinnoppgaver med tre dyregrupper, selvstendig skriving av dyrefaktaark og introduksjon av enkle diagrammer over dyredata.',
    parentTakeaway: 'Les dyreb\u00f8ker sammen og still faktasp\u00f8rsm\u00e5l: hva spiser den, hvor bor den, hvem spiser den? La barnet skrive tre fakta om favoritdyret sitt. Bes\u00f8k en dyrehage og tell dyr i grupper p\u00e5 ti. Lag en hjemme-dyrebok der barnet tegner og skriver om ett nytt dyr hver uke.',
    classroomIntegration: 'Dyreoppgaver i 1. klasse integreres i naturfagsundervisningen som forskningsverkt\u00f8y: elevene leser dyrefakta, fyller ut klassifikasjonsark, l\u00f8ser matematikkproblemer med dyredata og skriver dyrebeskrivelser. Et klassedyreatlas bygges opp gjennom \u00e5ret. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og skriftlig formidling st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Dyreklassifisering med flere kriterier', emerging: 'sorterer dyr i to grupper etter \u00e9n egenskap med st\u00f8tte', proficient: 'sorterer selvstendig etter tre kriterier og forklarer valget muntlig', advanced: 'oppretter egne klassifiseringssystemer og bruker fagbegreper som pattedyr, krepsdyr, insekt' },
      { skill: 'Addisjon/subtraksjon innenfor 20 (dyrekontekst)', emerging: 'l\u00f8ser oppgaver innenfor 10 med bildest\u00f8tte', proficient: 'l\u00f8ser selvstendig oppgaver innenfor 20 inkludert tierovergang med dyrescener', advanced: 'l\u00f8ser flertrinnsproblemer og formulerer egne tekstoppgaver med dyredata' },
      { skill: 'Informasjonslesing om dyr', emerging: 'leser 1\u20132 faktasetninger med st\u00f8tte og besvarer sp\u00f8rsm\u00e5l muntlig', proficient: 'leser selvstendig 3\u20134 faktasetninger og besvarer forst\u00e5elsessp\u00f8rsm\u00e5l skriftlig', advanced: 'leser lengre faktatekster, sammenligner dyrearter og skriver egne dyrebeskrivelser' },
    ],
  },

  birds: {
    snippetAnswer: 'Fugle-oppgaver for 1. klasse (6\u20137 \u00e5r) trener datainnsamling med strekdiagrammer, addisjon/subtraksjon innenfor 20 og selvstendig skriving av fuglefakta. Systematisk observasjon og registrering st\u00e5r sentralt. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse blir fugletemaet et vitenskapelig prosjekt \u2014 seks- og sju\u00e5ringer kan gjennomf\u00f8re systematiske fugletelllinger, registrere data i strekdiagrammer og bruke resultatene til addisjon og sammenligning. Denne dataanvendelsen er et kvantehopp fra barnehageklassens enkle telling. Fuglefakta leses selvstendig i korte tekster, og elevene skriver egne observasjonsrapporter. Klassifisering utvides til trekkfugler mot standfugler, rovfugler mot sangfugler. M\u00e5ling av fuglereir og vingespenn introduserer centimeter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og skriftlig rapportering i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Datainnsamling og -registrering (6\u20137-\u00e5ringer kan f\u00f8re strek- og s\u00f8ylediagrammer)', howWeAddress: 'Fugletellings-ark med strekdiagrammer der elevene registrerer observasjoner og leser resultatet' },
      { milestone: 'Sammenligning og tolkning av data (mer enn, f\u00e6rre enn, flest)', howWeAddress: 'Sp\u00f8rsm\u00e5l til fugletelllingsdata (hvilken fugl s\u00e5 vi flest av?) trener matematisk resonnement' },
      { milestone: 'Informasjonsskriving (korte faktarapporter med egne ord)', howWeAddress: 'Fuglefakta-skrivemaler med ramme for navn, utseende, f\u00f8de og levested veileder selvstendig faglitter\u00e6r skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre velkjente fugler, bruk forh\u00e5ndsutfylte diagrammer med bare noen f\u00e5 manglende data, og tilby setningsstartere til skriving. For avanserte elever i 1. klasse tilf\u00f8yes klassifisering av fuglegrupper, vingespennm\u00e5ling i centimeter og selvstendig skriving av fugleforskningsrapporter.',
    parentTakeaway: 'Fugletelllinger er gratis matematikk og naturfag. Sett opp et fuglebrett og f\u00f8r en ukentlig telleliste: hvor mange kj\u00f8ttmeiser, svarttrost, duer? Lag et s\u00f8ylediagram p\u00e5 kj\u00f8leskapet. La barnet skrive tre fakta om ukens fugl. Denne systematiske observasjonen bygger forskningsferdigheter fra f\u00f8rste klasse.',
    classroomIntegration: 'Fugletemaet i 1. klasse kj\u00f8rer som \u00e5rsprosjekt: m\u00e5nedlige fugletelllinger med registrering i klassens s\u00f8ylediagram, mattetimen bruker data til addisjon og sammenligning, norsktimen skriver fuglefakta, og naturfagstimen klassifiserer arter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfaglig unders\u00f8kelse, data og skriving integreres.',
    assessmentRubric: [
      { skill: 'Datainnsamling og diagrammer (fuglekontekst)', emerging: 'registrerer data i et forh\u00e5ndslaget strekdiagram med st\u00f8tte', proficient: 'fyller selvstendig ut et strekdiagram og leser resultatet korrekt', advanced: 'oppretter egne diagrammer, sammenligner data og trekker konklusjoner' },
      { skill: 'Addisjon/subtraksjon med fugledata', emerging: 'l\u00f8ser addisjonsoppgaver innenfor 10 med bildest\u00f8tte', proficient: 'l\u00f8ser selvstendig oppgaver innenfor 20 med fugletelllingsdata', advanced: 'l\u00f8ser flertrinnsproblemer med data fra egne fugletelllinger' },
      { skill: 'Fuglefakta-skriving', emerging: 'skriver 1\u20132 setninger med st\u00f8tte fra setningsstartere', proficient: 'skriver selvstendig 3\u20134 faktasetninger om en fugl med korrekt staving av n\u00f8kkelord', advanced: 'skriver en sammenhengende faktarapport med innledning, fakta og avslutning' },
    ],
  },

  birthday: {
    snippetAnswer: 'Bursdags-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon innenfor 20, titallssystemet med bursdagslys og selvstendig skriving av invitasjoner og festbeskrivelser. Tallene f\u00e5r praktisk betydning. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r bursdagstemaet matematisk dybde \u2014 seks- og sju\u00e5ringer forst\u00e5r titallssystemet og kan bruke bursdagslys til \u00e5 illustrere posisjonsverdi (en kake med 7 lys = 7 enere, to kaker med 10 lys = 2 tiere). Addisjon og subtraksjon innenfor 20 med gjester, gaver og godteposer gir flertrinnsproblemer med reell kontekst. Skriving av invitasjoner og festbeskrivelser krever korte avsnitt med dato, sted og detaljer. M\u00e5ling av tid (\u00abfesten begynner kl. 14\u00bb) og penger (\u00abgaven koster 50 kr.\u00bb) introduseres naturlig. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for tall, m\u00e5ling og skriftlig kommunikasjon i 1. trinn m\u00f8tes.',
    developmentalMilestones: [
      { milestone: 'Posisjonsverdi (6\u20137-\u00e5ringer begynner \u00e5 forst\u00e5 enere og tiere)', howWeAddress: 'Bursdagslys gruppert i tiere og enere (13 lys = 1 tier + 3 enere) gir konkret posisjonsverdi' },
      { milestone: 'Flertrinnsproblemer (to regnestykker i \u00e9n oppgave)', howWeAddress: 'Festscenarier som \u00ab8 gjester kommer, 3 g\u00e5r, 5 nye ankommer \u2014 hvor mange n\u00e5?\u00bb trener sekvensiell beregning' },
      { milestone: 'Funksjonell skriving med struktur (invitasjon med dato, sted, tid)', howWeAddress: 'Invitasjonsmaler med felt for alle n\u00f8dvendige opplysninger l\u00e6rer strukturert, form\u00e5lsbestemt skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, hold regning innenfor 10 med bildest\u00f8tte, bruk tellebrikker til tierovergang, og tilby utfylte invitasjonsmaler. For avanserte elever i 1. klasse tilf\u00f8yes flertrinnsproblemer med tre regneoperasjoner, pengeberegning og selvstendig skriving av festbeskrivelser med flere avsnitt.',
    parentTakeaway: 'Bruk barnets egen bursdag som et storstilet matematikkprosjekt: skriv invitasjoner med dato og klokkeslett, budsjettering av gaver (50 kr. + 30 kr.), tell gjester og porsjoner, og del kaken likt. La barnet skrive en festbeskrivelse etter\u00e5 \u2014 funksjonell skriving p\u00e5 sitt beste.',
    classroomIntegration: 'Bursdagstemaet i 1. klasse brukes til \u00e5 trene posisjonsverdi med lys, skrive invitasjoner i norsktimen og l\u00f8se festmatematikk med flertrinnsproblemer. Klassens bursdagskalender gir anledning til m\u00e5nedstall, aldersberegning og tidslinjer. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, skriving og sosial kompetanse st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Posisjonsverdi (tiere og enere)', emerging: 'teller lys ett om gangen opp til 20 uten gruppering', proficient: 'grupperer selvstendig lys i tiere og enere og angir tallet korrekt', advanced: 'forklarer posisjonsverdi med egne ord og anvender det p\u00e5 nye tall' },
      { skill: 'Flertrinnsproblemer (festkontekst)', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med st\u00f8tte', proficient: 'l\u00f8ser selvstendig totrinnsproblemer innenfor 20 med festscenarier', advanced: 'l\u00f8ser tretrinnsproblemer og formulerer egne flertrinnoppgaver' },
      { skill: 'Funksjonell skriving (invitasjoner)', emerging: 'fyller ut en invitasjon med st\u00f8tte fra mal og voksen', proficient: 'skriver selvstendig en komplett invitasjon med dato, tid, sted og navn', advanced: 'skriver invitasjoner og festbeskrivelser med flere setninger og korrekt tegnsetting' },
    ],
  },

  body: {
    snippetAnswer: 'Kropp-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling i centimeter, kroppens organer, helseregler og selvstendig skriving av kroppsfakta. Tallene brukes til h\u00f8yde, vekt og puls. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse utvides kropptemaet til vitenskapelig forst\u00e5else \u2014 seks- og sju\u00e5ringer l\u00e6rer om organer (hjerte, lunger, hjerne), m\u00e5ler kroppen med centimeter og forst\u00e5r helseregler med begrunnelse. M\u00e5ling av h\u00f8yde, armspenn og fotlengde gir virkelig bruk av linjalen. Addisjon med kropptall (10 fingre + 10 t\u00e6r = 20) st\u00f8tter posisjonsverdi. Puls f\u00f8r og etter bevegelse introduserer datainnsamling. Skriving av kroppsfakta med egne ord trener faglitter\u00e6r skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for helse, m\u00e5ling og naturfag i 1. trinn m\u00f8tes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling med standardenheter (6\u20137-\u00e5ringer begynner \u00e5 bruke linjal og centimeter)', howWeAddress: 'Kroppssm\u00e5lingsark der elevene m\u00e5ler h\u00e5nd, fot og arm i centimeter gir autentisk linjalbruk' },
      { milestone: 'Grunnleggende organforst\u00e5else (hjerte, lunger, hjerne og deres funksjoner)', howWeAddress: 'Organ-koblingsark og -diagrammer forbinder organer med funksjoner i en enkel kroppsmodell' },
      { milestone: 'Datainnsamling om kroppen (puls, h\u00f8yde, fotlengde)', howWeAddress: 'M\u00e5le- og registreringsark der elevene m\u00e5ler og sammenligner kroppsdata i tabeller' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre organer (hjerte, lunger, hjerne), bruk hele centimeter uten millimeter, og tilby setningsstartere til skriving. For avanserte elever i 1. klasse tilf\u00f8yes skjelettets knokler, pulsm\u00e5ling med diagrammer og sammenlignende analyse av kroppsdata.',
    parentTakeaway: 'M\u00e5l barnets h\u00f8yde med en linjal og skriv det ned \u2014 gjenta hver m\u00e5ned og sammenlign. Kjenn pulsen f\u00f8r og etter lek og tell slag. Snakk om hva hjertet og lungene gj\u00f8r. Bruk badet til \u00e5 navngi kroppsdeler p\u00e5 norsk. M\u00e5ling av kroppen er den mest personlige matematikktimen.',
    classroomIntegration: 'Kropptemaet i 1. klasse integreres i helseundervisning og matematikk: m\u00e5leuke med linjaler og kroppsm\u00e5lingsark, naturfagleksjon om organer med diagrammer, gymtime med pulsdatainnsamling, og norsktime med skriving av kroppsfakta. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for m\u00e5ling, helse og naturfag m\u00f8tes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling i centimeter (kroppskontekst)', emerging: 'm\u00e5ler med st\u00f8tte og leser av linjalen un\u00f8yaktig', proficient: 'm\u00e5ler selvstendig h\u00e5nd, fot og arm i hele centimeter og registrerer korrekt', advanced: 'm\u00e5ler presist, sammenligner m\u00e5l og forklarer forskjeller med matematisk spr\u00e5k' },
      { skill: 'Organgjenkjenning og funksjon', emerging: 'navngir 1\u20132 organer med st\u00f8tte og kobler dem til funksjon', proficient: 'navngir selvstendig hjerte, lunger og hjerne og forklarer funksjonen', advanced: 'forklarer samspillet mellom organer og relaterer dem til helse og livsstil' },
      { skill: 'Kroppsfakta-skriving', emerging: 'skriver 1\u20132 fakta med st\u00f8tte fra setningsstartere', proficient: 'skriver selvstendig 3\u20134 faktasetninger om kroppen med korrekt staving', advanced: 'skriver en sammenhengende faktatekst med innledning, fakta og oppsummering' },
    ],
  },

  camping: {
    snippetAnswer: 'Camping-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon innenfor 20, m\u00e5ling i centimeter, kartkunnskap og selvstendig skriving av campingdagbok. Naturfag og friluftsliv integreres med matematikk. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse utvides campingtemaet til et tverrfaglig friluftslivsprosjekt \u2014 seks- og sju\u00e5ringer kan lese enkle kart med symboler, m\u00e5le avstand i centimeter p\u00e5 kartet, f\u00f8re v\u00e6rdagbok med temperatur og l\u00f8se flertrinnsproblemer med campingutstyr. Pakking av ryggsekken gir addisjon (3 gensere + 4 sokker), matberegning krever subtraksjon (10 p\u00f8lser minus 6 som er spist), og m\u00e5ling av teltpinner introduserer centimeter i praksis. Selvstendig skriving av campingopplevelser trener faglitter\u00e6r skriving. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og friluftsliv i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Kartkunnskap (6\u20137-\u00e5ringer begynner \u00e5 lese enkle kart med symboler)', howWeAddress: 'Campingkart-ark med symboler som telt, ild og vann trener kartlesing og romlig orientering' },
      { milestone: 'M\u00e5ling i kontekst (bruk av centimeter til \u00e5 m\u00e5le reelle gjenstander)', howWeAddress: 'M\u00e5ling av teltpinner, tau og utstyr i centimeter gir autentisk m\u00e5leerfaring' },
      { milestone: 'V\u00e6rregistrering (systematisk observasjon og loggf\u00f8ring)', howWeAddress: 'V\u00e6rdagbok-ark der elevene registrerer temperatur, skydekke og vind trener datainnsamling' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens matematikken til addisjon innenfor 10 med bildest\u00f8tte, bruk forh\u00e5ndstegnede kart med f\u00e5 symboler, og tilby skrivemaler. For avanserte elever i 1. klasse tilf\u00f8yes flertrinnsproblemer med budsjett, avstandsberegning p\u00e5 kart og selvstendig skriving av campingguider.',
    parentTakeaway: 'Ta med barnet p\u00e5 dagstur og bruk det som matematikk: m\u00e5l stokker i centimeter, tell fugler, les kart og f\u00f8r v\u00e6rdagbok. La barnet skrive campingliste og planlegge matpakke med mengder. Friluftsliv er det beste klasserommet \u2014 bruk oppgavearkene som forberedelse og oppf\u00f8lging.',
    classroomIntegration: 'Campingtemaet i 1. klasse integreres i friluftslivsuka: mattetimen l\u00f8ser pakkeproblemer med addisjon, norsktimen skriver campingdagbok, naturfagstimen studerer v\u00e6r og kart, og gymtimen \u00f8ver friluftslivsferdigheter. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og tverrfaglig friluftsliv st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Kartkunnskap (campingkontekst)', emerging: 'gjenkjenner 2\u20133 kartsymboler med st\u00f8tte', proficient: 'leser selvstendig et enkelt kart med 5\u20136 symboler og beskriver rute', advanced: 'tegner egne kart med symbolforklaring og bruker retningsbegreper' },
      { skill: 'Addisjon/subtraksjon med campingtema', emerging: 'l\u00f8ser addisjonsoppgaver innenfor 10 med bildest\u00f8tte', proficient: 'l\u00f8ser selvstendig oppgaver innenfor 20 med campingscenarier', advanced: 'l\u00f8ser flertrinnsproblemer med utstyrsbudsjett og matberegning' },
      { skill: 'Campingdagbok-skriving', emerging: 'skriver 1\u20132 setninger med st\u00f8tte fra skrivemaler', proficient: 'skriver selvstendig 3\u20134 setninger om en campingopplevelse', advanced: 'skriver en sammenhengende campingdagbok med detaljer, f\u00f8lelser og fakta' },
    ],
  },

  circus: {
    snippetAnswer: 'Sirkus-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon innenfor 20, symmetri med sirkusmotiver og selvstendig skriving av sirkusforestillingsbeskrivelser. Kreativitet og matematikk m\u00f8tes i manegen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r sirkustemaet matematisk og spr\u00e5klig dybde \u2014 seks- og sju\u00e5ringer kan l\u00f8se flertrinnsproblemer med sirkusscenarier (12 klovner pluss 5 akrobater minus 3 som g\u00e5r ut = ?), gjenkjenne symmetri i sirkusmotiver og skrive egne forestillingsbeskrivelser. Billettsalg introduserer penger og addisjon, tidtaking av kunststykker gir erfaring med klokken, og programskriving trener strukturert tekst. Sirkusets visuelle og motoriske temaer gir engasjerende kontekst for abstrakt l\u00e6ring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og kreativitet i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsproblemer med tallomr\u00e5de 1\u201320 (6\u20137-\u00e5ringer takler sekvensiell beregning)', howWeAddress: 'Sirkusscenarier med to regnetrinn (pluss og minus i samme oppgave) trener sekvensiell tenkning' },
      { milestone: 'Symmetrigjenkjenning i komplekse figurer', howWeAddress: 'Sirkusmotiver som skal fullf\u00f8res symmetrisk (klovneansikt, sirkustelt) trener romlig tenkning' },
      { milestone: 'Beskrivende skriving med struktur (innledning, midtdel, avslutning)', howWeAddress: 'Forestillingsbeskrivelse-maler med tre deler guider elevene mot strukturert tekst' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til addisjon innenfor 10 med sirkusbilder, tilby symmetrimaler med st\u00f8ttelinjer, og bruk setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes billettsalg med pengeberegning, sirkusprogram-skriving og flertrinnsproblemer med tre operasjoner.',
    parentTakeaway: 'Bes\u00f8k et sirkus eller se en forestilling p\u00e5 nett og tell artister, dyr og kunststykker. La barnet skrive et sirkusprogram og designe billetter med pris. Tegn symmetriske klovneansikter sammen. Sirkuset gj\u00f8r matematikk og skriving til en forestilling \u2014 bruk oppgavearkene som \u00f8ving f\u00f8r og etter.',
    classroomIntegration: 'Sirkustemaet i 1. klasse kj\u00f8rer som en temuke: mattetimen l\u00f8ser sirkusproblemer, norsktimen skriver forestillingsbeskrivelser, kunsttimen lager symmetriske sirkusmotiver, og gymtimen \u00f8ver sirkusbevegelser. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og kreative fag st\u00f8ttes tverrfaglig.',
    assessmentRubric: [
      { skill: 'Flertrinnsproblemer (sirkuskontekst)', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med bildest\u00f8tte', proficient: 'l\u00f8ser selvstendig totrinnsproblemer innenfor 20 med sirkusscenarier', advanced: 'l\u00f8ser tretrinnsproblemer og formulerer egne sirkusmatteoppgaver' },
      { skill: 'Symmetri (sirkusmotiver)', emerging: 'gjenkjenner symmetri i enkle figurer med st\u00f8tte', proficient: 'fullf\u00f8rer selvstendig symmetriske sirkusmotiver langs symmetriaksen', advanced: 'skaper egne symmetriske design og forklarer symmetribegrepet muntlig' },
      { skill: 'Beskrivende skriving (forestilling)', emerging: 'skriver 1\u20132 setninger om sirkus med st\u00f8tte', proficient: 'skriver selvstendig en beskrivelse med innledning, midtdel og avslutning', advanced: 'skriver en levende, detaljert forestillingsbeskrivelse med adjektiver og sammenligninger' },
    ],
  },

  clothing: {
    snippetAnswer: 'Kl\u00e6r-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon med priser, sortering etter v\u00e6r og sesong, og selvstendig skriving av kl\u00e6rbeskrivelser. Penger og dagliglivets matematikk integreres. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse kobles kl\u00e6rtemaet til dagliglivets \u00f8konomi og vitenskapelig v\u00e6rforst\u00e5else \u2014 seks- og sju\u00e5ringer kan sortere kl\u00e6r etter v\u00e6r, sesong og materiale, beregne priser med addisjon og subtraksjon, og skrive kl\u00e6rbeskrivelser med adjektiver. Sortering etter v\u00e6r krever logisk tenkning (regn = regnjakke + st\u00f8vler + paraply), prisberegning introduserer penger (genser 50 kr. + bukse 80 kr. = ?), og skriving av kl\u00e6rguide trener funksjonell tekst. M\u00e5ling av stofflengde og skost\u00f8rrelse gir autentisk cm-bruk. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og dagliglivskompetanse i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flerkriteriesortering (6\u20137-\u00e5ringer sorterer etter v\u00e6r, sesong og aktivitet)', howWeAddress: 'Sorteringsark som grupperer kl\u00e6r etter v\u00e6rtype, \u00e5rstid og anledning bygger logisk klassifisering' },
      { milestone: 'Pengebruk og prisberegning (addisjon med kronebel\u00f8p)', howWeAddress: 'Butikkscenarier der elevene beregner totalpriser p\u00e5 kl\u00e6r introduserer funksjonell pengebruk' },
      { milestone: 'Beskrivende skriving med adjektiver (farge, st\u00f8rrelse, materiale)', howWeAddress: 'Kl\u00e6rbeskrivelsesark med rammer for farge, st\u00f8rrelse og materiale trener adjektivbruk i kontekst' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til v\u00e6r-sortering med bilder, hold prisberegning innenfor 10 kr., og tilby skrivemaler med ordbanker. For avanserte elever i 1. klasse tilf\u00f8yes budsjettoppgaver (100 kr. \u00e5 handle for), materiallekompetanse og selvstendig skriving av v\u00e6rguider.',
    parentTakeaway: 'Kl\u00e6rvalg er daglig matematikk og naturfag. La barnet sjekke v\u00e6rmeldingen og velge kl\u00e6r. Tell opp kl\u00e6r i garderoben og sorter etter sesong. G\u00e5 p\u00e5 \u00ableke-shopping\u00bb og beregn priser. Hver morgen er en liten leksjon i logisk tenkning \u2014 og barnet f\u00e5r eierskap til egne valg.',
    classroomIntegration: 'Kl\u00e6rtemaet i 1. klasse integreres i dagliglivsundervisning: mattetimen beregner kl\u00e6rpriser, naturfagstimen studerer v\u00e6r og materialer, norsktimen skriver kl\u00e6rbeskrivelser, og kunsttimen designer m\u00f8nstre p\u00e5 kl\u00e6rmaler. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, naturfag og dagliglivskompetanse st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Sortering etter v\u00e6r/sesong', emerging: 'sorterer kl\u00e6r i to grupper (varmt/kaldt) med st\u00f8tte', proficient: 'sorterer selvstendig etter v\u00e6r, sesong og aktivitet og begrunner valget', advanced: 'planlegger komplette antrekk for ulike scenarier og forklarer materialkvaliteter' },
      { skill: 'Prisberegning med kl\u00e6r', emerging: 'legger sammen to priser innenfor 10 kr. med st\u00f8tte', proficient: 'beregner selvstendig totalpriser p\u00e5 3\u20134 kl\u00e6splagg innenfor 100 kr.', advanced: 'l\u00f8ser budsjettoppgaver med vekslepenger og sammenligning av priser' },
      { skill: 'Kl\u00e6rbeskrivelse med adjektiver', emerging: 'beskriver kl\u00e6r med farge med st\u00f8tte', proficient: 'skriver selvstendig beskrivelser med farge, st\u00f8rrelse og materiale', advanced: 'skriver detaljerte kl\u00e6rguider med sammenligninger og anbefalinger' },
    ],
  },

  colors: {
    snippetAnswer: 'Farge-oppgaver for 1. klasse (6\u20137 \u00e5r) trener fargeblandinger som addisjon, diagrammer over favorittfarger og selvstendig skriving av fargebeskrivelser med adjektiver. Vitenskap og kunst m\u00f8tes i fargeteorien. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse utvides fargetemaet til fargevitenskap og dataanalyse \u2014 seks- og sju\u00e5ringer forst\u00e5r fargeteori (prim\u00e6rfarger + blanding = sekund\u00e6rfarger) som et logisk system, samler inn data om favorittfarger i klassen og presenterer resultatene i s\u00f8ylediagrammer. Fargenavn brukes som staveord, og fargebeskrivelser med adjektiver trener beskrivende skriving. Telling av fargegrupper gir addisjon og sammenligning, og m\u00f8nstergjenkjenning i fargesekvenser bygger algebraisk tenkning. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for kunst, matematikk (data og statistikk) og norsk i 1. trinn m\u00f8tes.',
    developmentalMilestones: [
      { milestone: 'Fargeteori som logisk system (6\u20137-\u00e5ringer forst\u00e5r \u00e5rsak-virkning i fargeblanding)', howWeAddress: 'Fargblandings-ark der elevene forutsier resultatet f\u00f8r de blander bygger hypotesetenkning' },
      { milestone: 'Datainnsamling og presentasjon (s\u00f8ylediagrammer over favorittfarger)', howWeAddress: 'Klasseunders\u00f8kelses-ark med telling og s\u00f8ylediagram trener datainnsamling og visuell presentasjon' },
      { milestone: 'Beskrivende skriving med fargeadjektiver', howWeAddress: 'Fargebeskrivelsesark der elevene beskriver gjenstander med presise fargeord trener adjektivbruk' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til prim\u00e6rfarger, bruk forh\u00e5ndslagde diagrammer med f\u00e5 kategorier, og tilby ordbanker med fargeord. For avanserte elever i 1. klasse tilf\u00f8yes nyanser (lysbl\u00e5, m\u00f8rkegr\u00f8nn), avanserte blandeoppgaver og selvstendig skriving av fargeguider.',
    parentTakeaway: 'Farger er overalt \u2014 bruk dem som l\u00e6ring. Bland farger med vannfarger og la barnet forutsi resultatet. Tell fargene p\u00e5 klarne i garderoben og lag et s\u00f8ylediagram. La barnet beskrive favoritttegningen med fargeadjektiver. Fargeteori er barnets f\u00f8rste m\u00f8te med vitenskapelig eksperimentering.',
    classroomIntegration: 'Fargetemaet i 1. klasse integreres p\u00e5 tvers av fag: kunsttimen utforsker fargeteori med blandingseksperimenter, mattetimen samler inn fargedata og lager s\u00f8ylediagrammer, norsktimen skriver fargebeskrivelser, og naturfagstimen studerer farger i naturen. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for kunst, matematikk og norsk st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Fargeteori og blanding', emerging: 'navngir prim\u00e6rfarger og blander med st\u00f8tte', proficient: 'forklarer selvstendig hvilke prim\u00e6rfarger som gir hvilke sekund\u00e6rfarger', advanced: 'forutsier blandingsresultater, forklarer nyanser og bruker fargeteori kreativt' },
      { skill: 'Datainnsamling med farger', emerging: 'teller fargegrupper med st\u00f8tte og fyller ut enkle diagrammer', proficient: 'samler selvstendig inn data og presenterer i s\u00f8ylediagram med korrekte tall', advanced: 'tolker diagrammer, sammenligner data og trekker konklusjoner om favorittfarger' },
      { skill: 'Fargebeskrivelse-skriving', emerging: 'bruker grunnleggende fargeord (r\u00f8d, bl\u00e5) med st\u00f8tte', proficient: 'skriver selvstendig beskrivelser med presise fargeadjektiver', advanced: 'bruker nyanser, sammenligninger og metaforer i fargebeskrivelser' },
    ],
  },

  construction: {
    snippetAnswer: 'Bygge-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling i centimeter, geometriske former i konstruksjoner og selvstendig skriving av byggebeskrivelser. Ingeni\u00f8rtenkning og matematikk m\u00f8tes. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse utvides byggetemaet til enkel ingeni\u00f8rtenkning \u2014 seks- og sju\u00e5ringer kan m\u00e5le materialer i centimeter, gjenkjenne geometriske former i bygninger (rektangler, trekanter, sirkler), og f\u00f8lge flertrinnsinstruksjoner for \u00e5 bygge modeller. Addisjon med materialer (5 klosser + 8 klosser = 13) gir matematikk i kontekst, og skriving av byggebeskrivelser trener instruksjonstekst. Symmetri i bygningsdesign og m\u00f8nstergjenkjenning i murveggsteknikker kobler geometri til den virkelige verden. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, teknologi og naturfag i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling med linjal (6\u20137-\u00e5ringer m\u00e5ler lengde i centimeter med presisjon)', howWeAddress: 'M\u00e5ling av byggematerialer (klosser, pinner, planker) i centimeter gir autentisk m\u00e5lepraksis' },
      { milestone: 'Formgjenkjenning i virkelige strukturer (rektangler, trekanter, sirkler)', howWeAddress: 'Bygningsanalyse-ark der elevene identifiserer former i konstruksjoner kobler geometri til virkeligheten' },
      { milestone: 'Instruksjonsskriving (trinnvise byggebeskrivelser)', howWeAddress: 'Byggeveiledning-maler der elevene skriver trinn-for-trinn-instruksjoner trener proseduretekst' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre grunnformer, m\u00e5ling med hele centimeter og bildest\u00f8ttede instruksjoner. For avanserte elever i 1. klasse tilf\u00f8yes sammensatte former, beregning av materialforbruk og selvstendig skriving av byggeprosjektplaner.',
    parentTakeaway: 'Bygging er ingeni\u00f8rtenkning i praksis. La barnet bygge med klosser og m\u00e5le resultatet i centimeter. Tell klosser i konstruksjoner og still sp\u00f8rsm\u00e5l: \u00abhvor mange rektangler ser du?\u00bb La barnet skrive instruksjoner for \u00e5 bygge noe og test om en annen kan f\u00f8lge dem \u2014 det er vitenskap og skriving i ett.',
    classroomIntegration: 'Byggetemaet i 1. klasse integreres i teknologiundervisning: mattetimen m\u00e5ler og beregner materialer, naturfagstimen studerer former og stabilitet, norsktimen skriver byggebeskrivelser, og kunsttimen designer byggverk. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, teknologi og tverrfaglig prosjektarbeid st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling med linjal (byggekontekst)', emerging: 'm\u00e5ler med st\u00f8tte og leser av un\u00f8yaktig', proficient: 'm\u00e5ler selvstendig byggematerialer i hele centimeter og registrerer korrekt', advanced: 'm\u00e5ler presist, beregner totallengde av flere deler og sammenligner m\u00e5l' },
      { skill: 'Formgjenkjenning i konstruksjoner', emerging: 'gjenkjenner 1\u20132 former i bygninger med st\u00f8tte', proficient: 'identifiserer selvstendig rektangler, trekanter og sirkler i bygningsbilder', advanced: 'analyserer sammensatte former og forklarer hvorfor visse former gir stabilitet' },
      { skill: 'Instruksjonsskriving (byggeveiledning)', emerging: 'skriver 1\u20132 trinn med st\u00f8tte fra bilder', proficient: 'skriver selvstendig en byggeveiledning p\u00e5 3\u20134 trinn i korrekt rekkef\u00f8lge', advanced: 'skriver detaljerte instruksjoner med m\u00e5l, materialliste og sikkerhetsregler' },
    ],
  },

  cooking: {
    snippetAnswer: 'Matlaging-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling med kopper og skjeer, br\u00f8kintroduksjon med matdeling og selvstendig skriving av enkle oppskrifter. Matematikk og helse m\u00f8tes p\u00e5 kj\u00f8kkenet. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r matlagingstemaet matematisk presisjon \u2014 seks- og sju\u00e5ringer kan m\u00e5le ingredienser med standardenheter (dl, ss, ts), forst\u00e5 enkel br\u00f8k gjennom matdeling (halv, fjerdedel), og f\u00f8lge flertrinnsinstruksjoner i en oppskrift. Dobling av oppskrifter gir multiplikasjonsintroduksjon, tidtaking med klokke introduserer tidsbegreper, og selvstendig oppskriftsskriving trener proseduretekst med n\u00f8yaktig spr\u00e5k. N\u00e6ringsl\u00e6re med matgrupper kobler naturfag til hverdagen. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, mat og helse, og norsk i 1. trinn m\u00f8tes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling med standardenheter (6\u20137-\u00e5ringer bruker dl, ss og ts med forst\u00e5else)', howWeAddress: 'Oppskriftsm\u00e5lings-ark der elevene m\u00e5ler ingredienser med kopper og skjeer gir autentisk m\u00e5leerfaring' },
      { milestone: 'Enkel br\u00f8kforst\u00e5else (halv, fjerdedel gjennom matdeling)', howWeAddress: 'Matdelingsark der elevene deler pizza, kaker og br\u00f8d i like deler introduserer br\u00f8k visuelt' },
      { milestone: 'Proseduretekst-skriving (oppskrift med trinnvise instruksjoner)', howWeAddress: 'Oppskriftsmaler med nummererte trinn, ingrediensliste og illustrasjoner trener proseduretekst' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til halv og hel med bildest\u00f8tte, bruk forenklede oppskrifter med 3\u20134 trinn, og tilby ordbanker med matlagingsord. For avanserte elever i 1. klasse tilf\u00f8yes dobling av oppskrifter, fjerdedeler og \u00e5ttedeler, tidberegning og selvstendig skriving av egne oppskrifter.',
    parentTakeaway: 'Kj\u00f8kkenet er det beste klasserommet for m\u00e5ling og br\u00f8k. La barnet m\u00e5le mel og sukker med desiliterskjeen. Del br\u00f8det i fjerdedeler og tell stykkene. La barnet skrive en oppskrift p\u00e5 favorittmaten sin. Matlaging gir daglig trening i matematikk, lesing og skriving \u2014 og resultatet kan spises.',
    classroomIntegration: 'Matlagingstemaet i 1. klasse integreres i mat og helse-faget: mattetimen beregner mengder og br\u00f8ker, norsktimen skriver oppskrifter, naturfagstimen studerer n\u00e6ringsstoffer og matgrupper, og den praktiske \u00f8kten lager mat etter oppskrift. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for mat og helse, matematikk og norsk st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling med kopper og skjeer', emerging: 'm\u00e5ler med st\u00f8tte og forveksler enheter', proficient: 'm\u00e5ler selvstendig med dl, ss og ts og f\u00f8lger en oppskrift korrekt', advanced: 'm\u00e5ler presist, dobler oppskrifter og konverterer mellom enheter med st\u00f8tte' },
      { skill: 'Br\u00f8kforst\u00e5else (matdeling)', emerging: 'deler i to like deler (halv) med st\u00f8tte', proficient: 'deler selvstendig i halve og fjerdedeler og navngir br\u00f8kene korrekt', advanced: 'deler i \u00e5ttedeler, sammenligner br\u00f8ker og l\u00f8ser oppgaver med br\u00f8k i kontekst' },
      { skill: 'Oppskriftsskriving', emerging: 'skriver 2\u20133 trinn med st\u00f8tte fra mal', proficient: 'skriver selvstendig en komplett oppskrift med ingrediensliste og 4\u20135 trinn', advanced: 'skriver detaljerte oppskrifter med tidangivelser, m\u00e5l og variasjonsforslag' },
    ],
  },

  dinosaurs: {
    snippetAnswer: 'Dinosaur-oppgaver for 1. klasse (6\u20137 \u00e5r) trener store tall, m\u00e5ling og sammenligning, tidslinjekunnskap og selvstendig skriving av dinosaurfakta. Paleontologi gir engasjerende kontekst for matematikk og naturfag. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r dinosaurtemaet vitenskapelig dybde \u2014 seks- og sju\u00e5ringer kan m\u00e5le og sammenligne dinosaurlengder i meter, plassere arter p\u00e5 en enkel tidslinje, klassifisere etter kost (planteetere, kj\u00f8ttetere, altetere) og skrive dinosaurfakta selvstendig. Tallomr\u00e5det utvides med store tall (dinosaurer som veide tusenvis av kilo), og sammenligning (\u00abT-rex var lengre enn stegosaurus\u00bb) gir relasjonell matematikk. Lesing av korte faktatekster og skriving av dinosaurbeskrivelser trener informasjonsbehandling. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Sammenligning og rangering (6\u20137-\u00e5ringer ordner etter st\u00f8rrelse, vekt, lengde)', howWeAddress: 'Dinosaur-sammenligningsark der elevene rangerer arter etter lengde og h\u00f8yde bygger relasjonell tenkning' },
      { milestone: 'Tidslinjeforst\u00e5else (hendelser i rekkef\u00f8lge p\u00e5 en linje)', howWeAddress: 'Dinosaur-tidslinjeark der elevene plasserer arter i korrekt geologisk periode introduserer tidsbegreper' },
      { milestone: 'Informasjonslesing og faktaskriving (lese og gjengi fakta)', howWeAddress: 'Dinosaurfakta-kort med forst\u00e5elsessp\u00f8rsm\u00e5l og skrivemaler trener informasjonsbehandling' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre velkjente dinosaurer, bruk bildest\u00f8tte ved sammenligning og hold tallene innenfor 20. For avanserte elever i 1. klasse tilf\u00f8yes store tall (lengder i meter), klassifisering etter flere kriterier, tidslinjekonstruksjon og selvstendig skriving av dinosaurforskningsrapporter.',
    parentTakeaway: 'Dinosaurer er en inn\u00f8ving i vitenskap. Bes\u00f8k et naturhistorisk museum og m\u00e5l barnets h\u00f8yde mot en dinosaurmodell. Les dinosaurb\u00f8ker og still sp\u00f8rsm\u00e5l: \u00abvar den st\u00f8rre enn bilen v\u00e5r?\u00bb La barnet skrive tre fakta om favoritdinosaurene. Sammenligning og rangering er matematikk i forkledning.',
    classroomIntegration: 'Dinosaurtemaet i 1. klasse integreres i naturfagsundervisningen: mattetimen sammenligner st\u00f8rrelser og arbeider med tidslinjer, norsktimen leser og skriver dinosaurfakta, naturfagstimen klassifiserer arter og studerer fossiler, og kunsttimen tegner dinosaurer etter m\u00e5l. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Sammenligning og rangering (dinosaurkontekst)', emerging: 'sammenligner to dinosaurer med bildest\u00f8tte (st\u00f8rre/mindre)', proficient: 'rangerer selvstendig 4\u20135 dinosaurer etter lengde og forklarer rekkef\u00f8lgen', advanced: 'sammenligner etter flere kriterier (lengde, h\u00f8yde, vekt) og bruker \u003e/\u003c-symboler' },
      { skill: 'Tidslinjeforst\u00e5else', emerging: 'plasserer 2\u20133 hendelser i rekkef\u00f8lge med st\u00f8tte', proficient: 'plasserer selvstendig 4\u20135 dinosaurperioder p\u00e5 en tidslinje', advanced: 'konstruerer egne tidslinjer og forklarer geologiske perioder med egne ord' },
      { skill: 'Dinosaurfakta-skriving', emerging: 'skriver 1\u20132 fakta med st\u00f8tte fra setningsstartere', proficient: 'skriver selvstendig 3\u20134 faktasetninger med korrekt staving av dinosaurnavn', advanced: 'skriver en sammenhengende forskningsrapport med innledning, fakta og konklusjon' },
    ],
  },

  easter: {
    snippetAnswer: 'P\u00e5ske-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon innenfor 20 med p\u00e5skeegg, m\u00f8nstergjenkjenning i eggdekorasjon og selvstendig skriving av p\u00e5skehilsener. Tradisjon og matematikk forenes. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r p\u00e5sketemaet akademisk dybde \u2014 seks- og sju\u00e5ringer l\u00f8ser flertrinnsproblemer med p\u00e5skeegg (12 egg funnet minus 4 delt med venner pluss 3 nye = ?), gjenkjenner og skaper komplekse m\u00f8nstre i eggdekorasjon og skriver p\u00e5skekort med fullstendige setninger. Fordeling av godteri introduserer divisjon som deling (16 egg p\u00e5 4 barn = 4 hver), og tidberegning (\u00abp\u00e5sken varer i 4 dager\u00bb) gir kalenderkunnskap. Norsk p\u00e5sketradisjon med p\u00e5skekrim og skigaing kobler faget til hverdagen. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og sosiale ferdigheter i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsproblemer med p\u00e5skekontekst (sekvensiell beregning)', howWeAddress: 'P\u00e5ske-scenarier med to\u2013tre regnetrinn trener elevene i \u00e5 holde flere tall i arbeidsminnet' },
      { milestone: 'M\u00f8nsterskaping og -viderefoering (komplekse m\u00f8nstersekvenser)', howWeAddress: 'Eggdekorasjons-m\u00f8nsterark der elevene viderefoerer og skaper m\u00f8nstre bygger algebraisk tenkning' },
      { milestone: 'Sosial skriving (p\u00e5skekort og hilsener med fullstendige setninger)', howWeAddress: 'P\u00e5skekort-skriveark med ramme for hilsen, budskap og underskrift trener funksjonell skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til addisjon innenfor 10 med eggbilder, bruk enkle AB-m\u00f8nstre og tilby kopiering av p\u00e5skehilsener. For avanserte elever i 1. klasse tilf\u00f8yes delingsoppgaver, ABBC-m\u00f8nstre og selvstendig skriving av p\u00e5skefortellinger med flere avsnitt.',
    parentTakeaway: 'P\u00e5sken er full av matematikk: tell p\u00e5skeegg under eggjakten, del godteri likt, lag m\u00f8nstre p\u00e5 egg og skriv p\u00e5skekort til besteforeldre. Tell dager til p\u00e5skeferie p\u00e5 kalenderen. Bruk oppgavearkene som forberedelse til p\u00e5skeaktiviteter \u2014 barnet l\u00e6rer uten \u00e5 vite det.',
    classroomIntegration: 'P\u00e5sketemaet i 1. klasse kj\u00f8rer i ukene f\u00f8r p\u00e5ske: mattetimen l\u00f8ser p\u00e5skematematikk, norsktimen skriver p\u00e5skekort, kunsttimen dekorerer egg med m\u00f8nstre, og KRLE-timen utforsker p\u00e5sketradisjoner. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for matematikk, norsk og kreative fag st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnsproblemer (p\u00e5skekontekst)', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med eggbilder', proficient: 'l\u00f8ser selvstendig totrinnsproblemer innenfor 20 med p\u00e5skescenarier', advanced: 'l\u00f8ser tretrinnsproblemer og formulerer egne p\u00e5skematteoppgaver' },
      { skill: 'M\u00f8nstergjenkjenning og -skaping', emerging: 'viderefoerer et enkelt AB-m\u00f8nster med st\u00f8tte', proficient: 'gjenkjenner og viderefoerer selvstendig ABC- og ABB-m\u00f8nstre i eggdekorasjon', advanced: 'skaper egne komplekse m\u00f8nstre og forklarer reglene muntlig' },
      { skill: 'P\u00e5skekort-skriving', emerging: 'kopierer en p\u00e5skehilsen med st\u00f8tte', proficient: 'skriver selvstendig p\u00e5skekort med hilsen, budskap og underskrift', advanced: 'skriver personlige p\u00e5skekort med flere setninger og kreativt innhold' },
    ],
  },

  emotions: {
    snippetAnswer: 'F\u00f8lelse-oppgaver for 1. klasse (6\u20137 \u00e5r) trener f\u00f8lelsesordforr\u00e5d, datainnsamling om humorstemninger og selvstendig skriving av f\u00f8lelsesdagbok. Sosial kompetanse og spr\u00e5k m\u00f8tes. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse utvides f\u00f8lelsestemaet til sosial kompetanse med spr\u00e5klig dybde \u2014 seks- og sju\u00e5ringer kan navngi og beskrive nyanserte f\u00f8lelser (frustrert, stolt, nervos, takknemlig), forst\u00e5 \u00e5rsak-virkning i sosiale situasjoner og skrive f\u00f8lelsesdagbok. Datainnsamling om klassens humorstemning gir s\u00f8ylediagrammer, telling av f\u00f8lelsesuttrykk gir addisjon, og rollespill med l\u00f8sningsstrategier bygger konfliktl\u00f8sning. F\u00f8lelsesordforr\u00e5det utvides fra 6\u20138 til 15\u201320 presise f\u00f8lelsesord. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for sosial l\u00e6ring, norsk og matematikk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Nyansert f\u00f8lelsesordforr\u00e5d (6\u20137-\u00e5ringer skiller mellom lignende f\u00f8lelser)', howWeAddress: 'F\u00f8lelsesnuanse-ark som skiller sint fra frustrert og glad fra stolt bygger presist spr\u00e5k' },
      { milestone: '\u00c5rsak-virkning i sosiale situasjoner (handling \u2192 f\u00f8lelse)', howWeAddress: 'Scenarioark der elevene kobler handlinger til f\u00f8lelser og forsl\u00e5r l\u00f8sninger trener sosial resonnering' },
      { milestone: 'Dagbokskriving om egne f\u00f8lelser (reflekterende skriving)', howWeAddress: 'F\u00f8lelsesdagbok-maler med startsetninger og f\u00f8lelsesord veileder reflekterende skriving' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til 6\u20138 grunnf\u00f8lelser med tydelige ansiktsuttrykk, bruk bildescenarier og tilby setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes komplekse sosiale dilemmaer, selvstendig dagbokskriving og rollespill med l\u00f8sningsstrategier.',
    parentTakeaway: 'Snakk om f\u00f8lelser hjemme: \u00abhvordan f\u00f8lte du deg da?\u00bb og \u00abhva tror du vennen din f\u00f8lte?\u00bb Les b\u00f8ker med f\u00f8lelsestema og diskuter karakterenes reaksjoner. La barnet f\u00f8re en enkel f\u00f8lelsesdagbok ved leggetid. Presise f\u00f8lelsesord gir barnet verkt\u00f8y til \u00e5 h\u00e5ndtere sosiale situasjoner.',
    classroomIntegration: 'F\u00f8lelsestemaet i 1. klasse integreres i sosial l\u00e6ring: morgensamlingen sjekker inn p\u00e5 dagens humorstemning med data, norsktimen arbeider med f\u00f8lelsesordforr\u00e5d og dagbokskriving, mattetimen lager s\u00f8ylediagrammer over klasses humorstemning, og friminuttsoppf\u00f8lging bruker f\u00f8lelsesverkt\u00f8y. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for sosial kompetanse og norsk st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'F\u00f8lelsesordforr\u00e5d', emerging: 'navngir 4\u20136 grunnf\u00f8lelser med bildest\u00f8tte', proficient: 'bruker selvstendig 12\u201315 presise f\u00f8lelsesord i riktig kontekst', advanced: 'skiller mellom nyanserte f\u00f8lelser og forklarer forskjeller med eksempler' },
      { skill: '\u00c5rsak-virkning i sosiale situasjoner', emerging: 'kobler handling til f\u00f8lelse i enkle scenarier med st\u00f8tte', proficient: 'forklarer selvstendig \u00e5rsak-virkning og forsl\u00e5r l\u00f8sninger i sosiale situasjoner', advanced: 'analyserer komplekse dilemmaer med flere perspektiver og vurderer konsekvenser' },
      { skill: 'F\u00f8lelsesdagbok-skriving', emerging: 'skriver 1\u20132 setninger om dagens f\u00f8lelse med st\u00f8tte', proficient: 'skriver selvstendig dagbokinnlegg med f\u00f8lelse, \u00e5rsak og refleksjon', advanced: 'skriver reflekterende tekster med nyansert f\u00f8lelsesspr\u00e5k og selvinnsikt' },
    ],
  },

  'fairy-tales': {
    snippetAnswer: 'Eventyr-oppgaver for 1. klasse (6\u20137 \u00e5r) trener leseforst\u00e5else, fortellingsstruktur med tre deler og selvstendig skriving av egne eventyr. Spr\u00e5klig kreativitet og narrativ kompetanse utvikles. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r eventyrtemaet litteraer dybde \u2014 seks- og sju\u00e5ringer kan lese korte eventyr selvstendig, gjenkjenne treleddet struktur (begynnelse, midtdel, slutt) og skrive egne eventyr med klassiske elementer. Eventyrmatematikk gir engasjerende kontekst: Gullkort-modellen med tre muligheter introduserer kategorisering, telleeventyr (\u00ab\u00e9n, to, tre bjorner\u00bb) gir tallforst\u00e5else, og rekkef\u00f8lgeoppgaver med eventyrhendelser trener sekvensiell tenkning. Norske folkeeventyr (Askeladden, de tre bukkene Bruse) gir kulturforankring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for norsk, lesing og kreativ skriving i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Fortellingsstruktur (6\u20137-\u00e5ringer forst\u00e5r begynnelse, midtdel, slutt)', howWeAddress: 'Struktureringsark der elevene deler eventyr i tre deler og identifiserer hovedelementer bygger narrativ forst\u00e5else' },
      { milestone: 'Leseforst\u00e5else av korte tekster (forst\u00e5 og gjenfortelle innhold)', howWeAddress: 'Eventyrlesing med forst\u00e5elsessp\u00f8rsm\u00e5l (hvem, hva, hvorfor) trener leseforst\u00e5else' },
      { milestone: 'Kreativ skriving (egne eventyr med klassiske elementer)', howWeAddress: 'Eventyrskriving-maler med rammer for helt, skurk, utfordring og l\u00f8sning guider kreativ produksjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, les eventyret h\u00f8yt f\u00f8rst, bruk bildesekvenser for struktur og tilby setningsstartere. For avanserte elever i 1. klasse tilf\u00f8yes selvstendig lesing av lengre eventyr, skriving av eventyr med uventet vri og sammenligning av eventyrversjoner.',
    parentTakeaway: 'Les eventyr h\u00f8yt hver kveld og still sp\u00f8rsm\u00e5l: \u00abhva skjedde f\u00f8rst?\u00bb, \u00abhvorfor gjorde trollet det?\u00bb, \u00abhvordan ville du l\u00f8st det?\u00bb La barnet fortelle eventyret p\u00e5 nytt med egne ord. Oppfordre til \u00e5 skrive egne eventyr \u2014 selv tre setninger er en hel fortelling for en seks\u00e5ring.',
    classroomIntegration: 'Eventyrtemaet i 1. klasse integreres i norskundervisningen: lesetimen leser eventyr med forst\u00e5elsessp\u00f8rsm\u00e5l, skrivetimen skriver egne eventyr, dramatimen spiller eventyr med roller, og mattetimen l\u00f8ser eventyrmatematikk. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for lesing, skriving og kreativitet st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Fortellingsstruktur (begynnelse, midtdel, slutt)', emerging: 'identifiserer begynnelsen av et eventyr med st\u00f8tte', proficient: 'deler selvstendig et eventyr i tre deler og navngir hovedelementene', advanced: 'analyserer strukturen og forklarer hvordan delene h\u00e5nger sammen' },
      { skill: 'Leseforst\u00e5else av eventyr', emerging: 'besvarer enkle sp\u00f8rsm\u00e5l (hvem) med st\u00f8tte', proficient: 'besvarer selvstendig hvem-, hva- og hvorfor-sp\u00f8rsm\u00e5l om eventyret', advanced: 'trekker slutninger, sammenligner eventyr og begrunner egne tolkninger' },
      { skill: 'Kreativ eventyrskriving', emerging: 'skriver 2\u20133 setninger med st\u00f8tte fra mal', proficient: 'skriver selvstendig et kort eventyr med helt, utfordring og l\u00f8sning', advanced: 'skriver et sammenhengende eventyr med dialog, beskrivelser og uventet vri' },
    ],
  },

  farm: {
    snippetAnswer: 'Bondeg\u00e5rd-oppgaver for 1. klasse (6\u20137 \u00e5r) trener addisjon/subtraksjon innenfor 20 med g\u00e5rdsdyr, m\u00e5ling av avlinger og selvstendig skriving av g\u00e5rdsdagbok. Naturfag og \u00f8konomi m\u00f8tes p\u00e5 g\u00e5rden. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r bondeg\u00e5rdstemaet \u00f8konomisk og vitenskapelig dybde \u2014 seks- og sju\u00e5ringer kan l\u00f8se flertrinnsproblemer med g\u00e5rdsdyr (8 h\u00f8ner legger 3 egg hver = ?), m\u00e5le avlinger i kilo og centimeter, f\u00f8re v\u00e6rdagbok for planting og skrive g\u00e5rdsdagbok. Datainnsamling med s\u00f8ylediagrammer over eggproduksjon gir matematisk analyse, og klassifisering av dyr etter produkt (melk, ull, egg, kj\u00f8tt) introduserer enkel \u00f8konomi. Norsk landbruk og matproduksjon gir kulturforankring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og samfunnsfag i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Flertrinnsproblemer med g\u00e5rdskontekst (multiplikasjon som gjentatt addisjon)', howWeAddress: 'Eggproduksjons-ark der elevene beregner totalt antall egg fra flere h\u00f8ner introduserer multiplikasjonstenkning' },
      { milestone: 'Datainnsamling og diagrammer (s\u00f8ylediagram over produksjon)', howWeAddress: 'G\u00e5rdsdata-ark der elevene registrerer og presenterer dyretall og avlinger i s\u00f8ylediagrammer' },
      { milestone: 'Dagbokskriving om naturprosesser (planting, vekst, h\u00f8sting)', howWeAddress: 'G\u00e5rdsdagbok-maler med felt for dato, observasjon og m\u00e5ling trener systematisk rapportering' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til addisjon innenfor 10 med g\u00e5rdsdyrbilder, bruk forh\u00e5ndstegnede diagrammer og tilby skrivemaler. For avanserte elever i 1. klasse tilf\u00f8yes multiplikasjon som gjentatt addisjon, ukentlig datainnsamling med trendanalyse og selvstendig skriving av g\u00e5rdsforskningsrapporter.',
    parentTakeaway: 'Bes\u00f8k en g\u00e5rd og bruk den som klasserom: tell dyr, m\u00e5l avlinger, beregn eggproduksjon og f\u00f8r dagbok over plantevekst. La barnet ta ansvar for en plante hjemme og registrere veksten. G\u00e5rden er det ultimate tverrfaglige klasserommet \u2014 matematikk, naturfag og skriving i \u00e9n pakke.',
    classroomIntegration: 'Bondeg\u00e5rdstemaet i 1. klasse integreres i naturfag og matematikk: mattetimen beregner dyretall og eggproduksjon, naturfagstimen studerer g\u00e5rdsdyr og planting, norsktimen skriver g\u00e5rdsdagbok, og den praktiske \u00f8kten planter fr\u00f8 og observerer vekst. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og tverrfaglig l\u00e6ring st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Flertrinnsproblemer (g\u00e5rdskontekst)', emerging: 'l\u00f8ser etttrinnsproblemer innenfor 10 med g\u00e5rdsdyrbilder', proficient: 'l\u00f8ser selvstendig totrinnsproblemer innenfor 20 med g\u00e5rdsscenarier', advanced: 'l\u00f8ser multiplikasjonsproblemer som gjentatt addisjon og formulerer egne oppgaver' },
      { skill: 'Datainnsamling (g\u00e5rdskontekst)', emerging: 'registrerer data i forh\u00e5ndslaget diagram med st\u00f8tte', proficient: 'samler selvstendig inn data og presenterer i s\u00f8ylediagram med korrekte tall', advanced: 'tolker diagrammer, identifiserer trender og skriver konklusjoner' },
      { skill: 'G\u00e5rdsdagbok-skriving', emerging: 'skriver 1\u20132 setninger med st\u00f8tte fra mal', proficient: 'skriver selvstendig dagbokinnlegg med dato, observasjon og m\u00e5ling', advanced: 'f\u00f8rer systematisk dagbok over tid og sammenligner observasjoner' },
    ],
  },

  flowers: {
    snippetAnswer: 'Blomster-oppgaver for 1. klasse (6\u20137 \u00e5r) trener m\u00e5ling av plantevekst i centimeter, symmetri i blomstermotiver og selvstendig skriving av blomsterfakta. Naturfag og kunst m\u00f8tes i hagen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse utvides blomstertemaet til plantebiologi og systematisk observasjon \u2014 seks- og sju\u00e5ringer kan m\u00e5le plantevekst i centimeter over tid, gjenkjenne og navngi plantedeler (rot, stengel, blad, blomst), forst\u00e5 livssyklusen (fr\u00f8 \u2192 spire \u2192 plante \u2192 blomst) og skrive vekstdagbok. Symmetri i blomstermotiver gir geometrisk forst\u00e5else, telling av kronblad gir addisjon, og datainnsamling med vekstdiagrammer introduserer tabeller. Norske villblomster (bl\u00e5klokke, hvitveis, l\u00f8vetann) gir kulturforankring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'M\u00e5ling av vekst over tid (systematisk registrering i centimeter)', howWeAddress: 'Vekstdagbok-ark der elevene m\u00e5ler planteh\u00f8yden ukentlig og registrerer i tabell gir autentisk datainnsamling' },
      { milestone: 'Plantedeler og livssyklus (forst\u00e5else av biologiske systemer)', howWeAddress: 'Plantedel-ark og livssyklus-sekvensering bygger biologisk grunnforst\u00e5else med visuell st\u00f8tte' },
      { milestone: 'Symmetri i naturlige m\u00f8nstre (gjenkjenne og skape)', howWeAddress: 'Blomster-symmetriark der elevene fullf\u00f8rer halve blomster langs symmetriaksen trener romlig tenkning' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre plantedeler, bruk hele centimeter uten desimaler og tilby bildest\u00f8tte ved livssyklus-sekvensering. For avanserte elever i 1. klasse tilf\u00f8yes foto-syntese-begrepet p\u00e5 enkelt niv\u00e5, vekstdiagrammer med trendanalyse og selvstendig skriving av blomsterforskningsrapporter.',
    parentTakeaway: 'Plant et fr\u00f8 sammen og m\u00e5l veksten hver uke med linjal \u2014 det er matematikk og naturfag. Plukk villblomster og tell kronblad. Pek p\u00e5 plantedeler i hagen: \u00abhvor er roten? Hva gj\u00f8r bladene?\u00bb La barnet tegne og skrive om blomsten sin. Hagen er det perfekte laboratoriet for f\u00f8rsteklassinger.',
    classroomIntegration: 'Blomstertemaet i 1. klasse integreres i naturfag og matematikk: mattetimen m\u00e5ler plantevekst og lager diagrammer, naturfagstimen studerer plantedeler og livssyklus, norsktimen skriver vekstdagbok, og kunsttimen lager symmetriske blomstermotiver. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og kreative fag st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'M\u00e5ling av plantevekst', emerging: 'm\u00e5ler h\u00f8yde med st\u00f8tte og registrerer un\u00f8yaktig', proficient: 'm\u00e5ler selvstendig i centimeter og registrerer korrekt i tabell', advanced: 'tolker vekstdata, sammenligner planter og trekker konklusjoner om vekstvilk\u00e5r' },
      { skill: 'Plantedeler og livssyklus', emerging: 'navngir 1\u20132 plantedeler med st\u00f8tte', proficient: 'navngir selvstendig rot, stengel, blad og blomst og ordner livssyklusen korrekt', advanced: 'forklarer funksjonen til hver plantedel og beskriver livssyklusen med egne ord' },
      { skill: 'Blomsterfakta-skriving', emerging: 'skriver 1\u20132 fakta med st\u00f8tte fra setningsstartere', proficient: 'skriver selvstendig 3\u20134 faktasetninger med korrekt staving av planteord', advanced: 'skriver en sammenhengende vekstrapport med data, observasjoner og konklusjoner' },
    ],
  },

  food: {
    snippetAnswer: 'Mat-oppgaver for 1. klasse (6\u20137 \u00e5r) trener matgrupper og n\u00e6ringsl\u00e6re, br\u00f8k gjennom matdeling og selvstendig skriving av kostholdsguider. Helse og matematikk forenes p\u00e5 tallerkenen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse f\u00e5r mattemaet helsefaglig og matematisk dybde \u2014 seks- og sju\u00e5ringer kan klassifisere mat etter n\u00e6ringsgrupper (karbohydrater, proteiner, frukt/gr\u00f8nt), forst\u00e5 br\u00f8k gjennom matdeling (halv, fjerdedel av en pizza), og l\u00f8se prisoppgaver med addisjon. Enkel n\u00e6ringsl\u00e6re kobles til daglige valg (\u00abhvorfor trenger vi gr\u00f8nnsaker?\u00bb), og selvstendig skriving av kostholdsguider trener funksjonell tekst. Datainnsamling med kostdiagrammer over klassens lunsj gir statistikkerfaring. Norsknormen Nøkkelhullet gir kulturforankring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for mat og helse, matematikk og norsk i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Klassifisering etter n\u00e6ringsgrupper (6\u20137-\u00e5ringer sorterer mat systematisk)', howWeAddress: 'Matsorteringsark med n\u00e6ringsgrupper som kategorier bygger klassifiseringskompetanse med helseinnhold' },
      { milestone: 'Br\u00f8kforst\u00e5else gjennom matdeling (halv, fjerdedel)', howWeAddress: 'Matdelingsark der elevene deler pizza, eple og br\u00f8d i like deler gir konkret br\u00f8kerfaring' },
      { milestone: 'Funksjonell skriving om helse (kostholdsguide)', howWeAddress: 'Kostholdsguide-maler der elevene skriver anbefalinger basert p\u00e5 n\u00e6ringsgruppene trener form\u00e5lstekst' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre n\u00e6ringsgrupper med bilder, hold br\u00f8k p\u00e5 halv-niv\u00e5 og tilby ordbanker. For avanserte elever i 1. klasse tilf\u00f8yes prisberegning for handletur, fjerdedeler og \u00e5ttedeler i matdeling, og selvstendig skriving av ukeplanlegging for sunt kosthold.',
    parentTakeaway: 'Kj\u00f8kkenet og matbutikken er matematikklaboratorier. Del pizza i fjerdedeler og tell bitene. Sorter matvarene etter n\u00e6ringsgrupper n\u00e5r dere pakker ut handleposene. La barnet planlegge en sunn lunsj og beregne prisen. Oppgavearkene gj\u00f8r helsevalg til en daglig leksjon.',
    classroomIntegration: 'Mattemaet i 1. klasse integreres i mat og helse-faget: mattetimen beregner priser og br\u00f8ker, naturfagstimen studerer n\u00e6ringsgrupper og fordoyelsse, norsktimen skriver kostholdsguider, og den praktiske \u00f8kten lager sunne m\u00e5ltider. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for mat og helse, matematikk og norsk st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Matklassifisering etter n\u00e6ringsgrupper', emerging: 'sorterer mat i to grupper (sunt/usunt) med st\u00f8tte', proficient: 'sorterer selvstendig mat i n\u00e6ringsgrupper og begrunner valget', advanced: 'planlegger et balansert m\u00e5ltid basert p\u00e5 n\u00e6ringsgrupper og forklarer hvorfor' },
      { skill: 'Br\u00f8kforst\u00e5else (matdeling)', emerging: 'deler i to like deler (halv) med st\u00f8tte', proficient: 'deler selvstendig i halve og fjerdedeler og navngir br\u00f8kene', advanced: 'deler i \u00e5ttedeler, sammenligner br\u00f8ker og l\u00f8ser oppgaver i matkontekst' },
      { skill: 'Kostholdsguide-skriving', emerging: 'skriver 1\u20132 helsetips med st\u00f8tte', proficient: 'skriver selvstendig en kostholdsguide med 3\u20134 anbefalinger basert p\u00e5 n\u00e6ringsgrupper', advanced: 'skriver detaljerte kostholdsplaner med begrunnelser og varierte forslag' },
    ],
  },

  forest: {
    snippetAnswer: 'Skog-oppgaver for 1. klasse (6\u20137 \u00e5r) trener tregjenkjenning, m\u00e5ling av trestammer i centimeter, \u00f8kosystem-forst\u00e5else og selvstendig skriving av skogdagbok. Naturfag og friluftsliv m\u00f8tes i skogen. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I 1. klasse utvides skogtemaet til \u00f8kologisk forst\u00e5else \u2014 seks- og sju\u00e5ringer kan gjenkjenne og navngi norske treslag (gran, furu, bj\u00f8rk, rogn), m\u00e5le trestammer i centimeter, forst\u00e5 enkle n\u00e6ringskjeder (plante \u2192 insekt \u2192 fugl \u2192 rovfugl) og skrive skogdagbok. Telling av \u00e5rringer introduserer alder og store tall, klassifisering av bartr\u00e6r mot l\u00f8vtr\u00e6r gir logisk sortering, og datainnsamling med artslister gir statistikk. Norsk skog- og friluftstradisjon gir unik kulturforankring. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og friluftsliv i 1. trinn st\u00f8ttes.',
    developmentalMilestones: [
      { milestone: 'Tregjenkjenning og klassifisering (6\u20137-\u00e5ringer skiller mellom treslag)', howWeAddress: 'Tregjenkjennings-ark med blad, bark og form som kjennetegn bygger botanisk kompetanse' },
      { milestone: 'Enkel n\u00e6ringskjede-forst\u00e5else (\u00f8kosystemtenkning)', howWeAddress: 'N\u00e6ringskjede-ark der elevene ordner organismer i riktig rekkef\u00f8lge introduserer \u00f8kologisk tenkning' },
      { milestone: 'Systematisk naturobservasjon med registrering', howWeAddress: 'Skogdagbok-ark med felt for dato, sted, funn og m\u00e5linger trener vitenskapelig observasjon' },
    ],
    differentiationNotes: 'For elever som trenger st\u00f8tte, begrens til tre treslag med tydelige kjennetegn, bruk bildest\u00f8tte ved n\u00e6ringskjeder og tilby skrivemaler. For avanserte elever i 1. klasse tilf\u00f8yes \u00e5rring-telling med store tall, komplekse n\u00e6ringskjeder med fire ledd og selvstendig skriving av skogforskningsrapporter.',
    parentTakeaway: 'Ta med barnet p\u00e5 skogstur og bruk den som naturfagleksjon: gjenkjenn tr\u00e6r, m\u00e5l trestammer med b\u00e5nd, tell \u00e5rringer p\u00e5 stubber og f\u00f8r skogdagbok. Sp\u00f8rr \u00abhvem spiser hvem i skogen?\u00bb og bygg n\u00e6ringskjeder sammen. Norsk skog er verdens beste klasserom \u2014 bruk oppgavearkene som forberedelse og oppf\u00f8lging.',
    classroomIntegration: 'Skogtemaet i 1. klasse integreres i uteundervisning: naturfagstimen studerer treslag og n\u00e6ringskjeder i n\u00e6rskogen, mattetimen m\u00e5ler trestammer og teller \u00e5rringer, norsktimen skriver skogdagbok, og gymtimen driver friluftsliv. Kunnskapsl\u00f8ftets (LK20) m\u00e5l for naturfag, matematikk og friluftsliv st\u00f8ttes.',
    assessmentRubric: [
      { skill: 'Tregjenkjenning og klassifisering', emerging: 'gjenkjenner 1\u20132 treslag med st\u00f8tte', proficient: 'gjenkjenner selvstendig 4\u20135 norske treslag og klassifiserer bartr\u00e6r og l\u00f8vtr\u00e6r', advanced: 'gjenkjenner 6+ treslag, beskriver kjennetegn og forklarer tilpasninger' },
      { skill: 'N\u00e6ringskjede-forst\u00e5else', emerging: 'ordner to organismer i n\u00e6ringskjede med st\u00f8tte', proficient: 'ordner selvstendig en treledd n\u00e6ringskjede og forklarer retningen', advanced: 'konstruerer fireledd-n\u00e6ringskjeder og forklarer \u00f8kologiske sammenhenger' },
      { skill: 'Skogdagbok-skriving', emerging: 'skriver 1\u20132 observasjoner med st\u00f8tte fra mal', proficient: 'skriver selvstendig dagbokinnlegg med dato, observasjon og m\u00e5ling', advanced: 'f\u00f8rer systematisk dagbok med trender, sammenligninger og refleksjoner' },
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
  const firstGradeIdx = content.indexOf("'first-grade'");
  const secondGradeIdx = content.indexOf("'second-grade'");

  if (firstGradeIdx === -1 || secondGradeIdx === -1) {
    console.error(`MISSING GRADE BLOCKS: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Check if snippetAnswer already exists in first-grade block
  const firstGradeBlock = content.substring(firstGradeIdx, secondGradeIdx);
  if (firstGradeBlock.includes('snippetAnswer')) {
    console.log(`SKIP (already enriched): ${theme}/no.ts`);
    continue;
  }

  // Find the last "],\n" in the first-grade block (end of faq array)
  const faqEndPattern = /\],\n/g;
  let lastMatch = null;
  let match;
  while ((match = faqEndPattern.exec(firstGradeBlock)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    console.error(`NO FAQ END FOUND: ${theme}/no.ts`);
    errorCount++;
    continue;
  }

  // Calculate absolute position
  const insertPos = firstGradeIdx + lastMatch.index + lastMatch[0].length;

  const insertionText = buildInsertionText(enrichments[theme]);

  content = content.substring(0, insertPos) + insertionText + '\n' + content.substring(insertPos);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${theme}/no.ts`);
  successCount++;
}

console.log(`\nDone: ${successCount} enriched, ${errorCount} errors, ${themes.length - successCount - errorCount} skipped`);
