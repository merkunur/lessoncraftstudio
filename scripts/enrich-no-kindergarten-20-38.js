#!/usr/bin/env node
/**
 * SEO Part 257: NO Kindergarten Grade Enrichment — Themes 20-38
 *
 * Adds 7 enrichment fields (snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the kindergarten grade block of 19 NO theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    snippetAnswer: 'Frukt-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling med fruktgrupper, addisjon og subtraksjon innenfor 10, og begynnende lesing av fruktord. Barna l\u00e6rer om sunn mat og n\u00e6ringsstoffer gjennom engasjerende oppgaver. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Frukttemaet er ideelt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan forstaa sammenhengen mellom mat, helse og naturvitenskap. Mens f\u00f8rskolebarn sorterte frukter etter farge og st\u00f8rrelse, kan barn i barnehageklassen klassifisere etter flere kriterier samtidig: tropisk mot norsk, steinfrukt mot b\u00e6r, og r\u00e5 mot kokt. Telling av frukter i grupper p\u00e5 to, fem og ti gir matematisk m\u00f8nstertrening. Addisjon og subtraksjon med fruktbilder (seks epler pluss fire bananer) gj\u00f8r regning konkret og motiverende. Skriving av fruktord p\u00e5 3\u20136 bokstaver trener begynnende leseferdigheter. Rammeplan for barnehagen og LK20 vektlegger kropp, helse og kosthold, og frukttemaet kobler dette direkte til matematikk og spr\u00e5k.',
    developmentalMilestones: [
      { milestone: 'Klassifisering etter flere dimensjoner (5\u20136-\u00e5ringer sorterer etter to\u2013tre kriterier)', howWeAddress: 'Fruktsorteringsark med farge, type og opprinnelse som kriterier bygger logisk kategoriseringsevne' },
      { milestone: 'Addisjon og subtraksjon innenfor 10 med konkrete tellere', howWeAddress: 'Fruktscener med addisjon (fire jordb\u00e6r pluss tre banan) og subtraksjon (ti druer minus fire spist) gir h\u00e5ndfast regning' },
      { milestone: 'Begynnende lesing av hverdagsord (fruktord p\u00e5 3\u20136 bokstaver)', howWeAddress: 'Ordsporing og ords\u00f8k med fruktord som eple, p\u00e6re, drue og melon trener lesefundamentet i kjent kontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til fem velkjente frukter (eple, banan, jordb\u00e6r, appelsin, drue), hold tellingen innenfor 5 og bruk fysisk frukt som supplement. For avanserte barn i barnehageklassen, introduser tropiske frukter, br\u00f8kbegreper (halve epler) og selvstendig skriving av fruktfakta.',
    parentTakeaway: 'Frukt er daglig l\u00e6ring. La barnet telle epler i posen p\u00e5 butikken, sammenligne st\u00f8rrelser og sortere i fruktsk\u00e5len. Lag fruktsalat sammen og tell ingrediensene. Pr\u00f8v en ny frukt hver uke og la barnet tegne og skrive navnet. Oppgavearkene kobler butikk- og kj\u00f8kkenmatematikk med strukturert \u00f8ving.',
    classroomIntegration: 'Frukttemaet integreres i barnehageklassens helseundervisning: i samlingen presenteres ukens frukt med smakspr\u00f8ve, ved l\u00e6ringsstasjoner arbeides det med telle- og sorteringsark, i mattekroken l\u00f8ses addisjonsoppgaver med frukttellere, og i skrivekroken lages en fruktordbok. Rammeplanens m\u00e5l for kropp, helse og kosthold integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Fruktklassifisering', emerging: 'sorterer 3\u20134 frukter etter \u00e9n egenskap (farge) med st\u00f8tte', proficient: 'sorterer selvstendig 6\u20138 frukter etter to egenskaper (type og farge)', advanced: 'oppretter egne sorteringskriterier og forklarer klassifiseringen muntlig' },
      { skill: 'Addisjon/subtraksjon med frukttellere', emerging: 'l\u00f8ser oppgaver innenfor 5 med konkrete fruktbilder', proficient: 'l\u00f8ser selvstendig addisjons- og subtraksjonsoppgaver innenfor 10', advanced: 'l\u00f8ser oppgaver mentalt og formulerer egne regnestykker med frukter' },
      { skill: 'Lesing og skriving av fruktord', emerging: 'gjenkjenner 2\u20133 fruktord med bildest\u00f8tte', proficient: 'leser og skriver selvstendig 6\u20138 vanlige fruktord', advanced: 'bruker fruktord i korte setninger og skriver egne fruktbeskrivelser' },
    ],
  },

  furniture: {
    snippetAnswer: 'M\u00f8bel-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener romlig forst\u00e5else, preposisjoner og telling av gjenstander i rommet. Barna l\u00e6rer \u00e5 beskrive hvor ting er og \u00f8ver funksjonell skriving. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'M\u00f8beltemaet er verdifullt for barnehageklassen fordi fem- og seks\u00e5ringer utvikler romlig spr\u00e5k og orienteringsevne. Mens f\u00f8rskolebarn navnga m\u00f8bler, kan barn i barnehageklassen bruke preposisjoner systematisk (p\u00e5, under, ved siden av, mellom, bak) og forst\u00e5 romlige relasjoner mellom gjenstander. Telling av m\u00f8bler i rommet gir matematikk i hverdagskontekst, og enkle m\u00e5linger (stolen er fire klosser h\u00f8y) introduserer m\u00e5lbegreper. Skriving av m\u00f8belord og rombenevnelser trener begynnende leseferdigheter med kjent vokabular. Rammeplanens m\u00e5l for antall, rom og form st\u00f8ttes direkte n\u00e5r barn arbeider med romlig plassering og m\u00e5ling i kjente omgivelser.',
    developmentalMilestones: [
      { milestone: 'Romlig spr\u00e5k og preposisjonsbruk (5\u20136-\u00e5ringer bruker posisjonsord korrekt)', howWeAddress: 'Plasser-m\u00f8belet-oppgaver der barn tegner gjenstander p\u00e5, under og ved siden av m\u00f8bler trener romlig spr\u00e5k' },
      { milestone: 'M\u00e5ling med ikke-standardiserte enheter', howWeAddress: 'M\u00e5l-m\u00f8belet-oppgaver der barn m\u00e5ler stoler og bord med klosser introduserer m\u00e5lbegreper konkret' },
      { milestone: 'Funksjonell klassifisering (m\u00f8bler etter rom og funksjon)', howWeAddress: 'Sorteringsark der barn plasserer m\u00f8bler i kj\u00f8kken, soverom eller stue bygger kategoriseringsevne' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til de mest grunnleggende m\u00f8blene (stol, bord, seng) og to preposisjoner (p\u00e5, under). Bruk fysiske m\u00f8bler i klasserommet som supplement. For avanserte barn, introduser plantegninger, flere romtyper og selvstendig skriving av rombeskrivelser.',
    parentTakeaway: 'Hjemmet er fullt av l\u00e6ringsmuligheter. Be barnet telle stoler rundt bordet, m\u00e5le sofaen med skrittlengder og beskrive hvor ting er: \u00abboka er p\u00e5 bordet, bamsen er under sengen.\u00bb Lek gjemsel med preposisjoner og la barnet tegne rommet sitt. Oppgavearkene gir struktur til denne daglige romlige utforskningen.',
    classroomIntegration: 'M\u00f8beltemaet integreres i barnehageklassens hverdagsrutiner: i samlingen \u00f8ves preposisjoner med gjenstander i rommet, ved l\u00e6ringsstasjoner arbeides det med plasserings- og m\u00e5leoppgaver, i rolleleken innredes dukkehusets rom, og i kunstkroken tegnes klasserommet sett ovenfra. Rammeplanens m\u00e5l for rom, form og kommunikasjon integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Preposisjonsbruk (romlig spr\u00e5k)', emerging: 'bruker 1\u20132 preposisjoner (p\u00e5, i) med st\u00f8tte', proficient: 'bruker selvstendig 4\u20135 preposisjoner korrekt i setninger', advanced: 'bruker komplekse romlige beskrivelser med flere preposisjoner (mellom stolen og bordet)' },
      { skill: 'M\u00e5ling med klosser (m\u00f8belkontekst)', emerging: 'm\u00e5ler enkle gjenstander med veiledning', proficient: 'm\u00e5ler selvstendig m\u00f8bler med klosser og rapporterer antallet', advanced: 'sammenligner m\u00e5linger og ordner m\u00f8bler etter st\u00f8rrelse' },
      { skill: 'M\u00f8belklassifisering etter rom', emerging: 'plasserer 2\u20133 m\u00f8bler i riktig rom med st\u00f8tte', proficient: 'sorterer selvstendig 6\u20138 m\u00f8bler i riktig rom og funksjon', advanced: 'forklarer hvorfor m\u00f8bler h\u00f8rer til bestemte rom og foresl\u00e5r alternativer' },
    ],
  },

  garden: {
    snippetAnswer: 'Hage-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling av planter og fr\u00f8, livssyklusforst\u00e5else og begynnende naturfag. Barna l\u00e6rer om vekstprosessen fra fr\u00f8 til blomst. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Hagetemaet er ideelt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan planlegge og f\u00f8lge en prosess over tid \u2014 de har t\u00e5lmodigheten til \u00e5 s\u00e5 et fr\u00f8 og vente p\u00e5 at det spirer. Mens f\u00f8rskolebarn vannet planter og gravde i jord, kan barn i barnehageklassen forst\u00e5 livssyklusen (fr\u00f8 \u2192 spire \u2192 plante \u2192 blomst), m\u00e5le plantevekst med klosser, telle kronblader og bl\u00f8tter, og sortere planter etter egenskaper. Addisjon med fr\u00f8 og blomster gir konkret matematikk. Skriving av planteord og hagedagbok trener begynnende leseferdigheter. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi st\u00f8ttes direkte n\u00e5r barn utforsker planteverdenen.',
    developmentalMilestones: [
      { milestone: 'Livssyklusforst\u00e5else (5\u20136-\u00e5ringer kan f\u00f8lge en flertrinns prosess)', howWeAddress: 'Fr\u00f8-til-blomst-sekvenseringsark der barn ordner vekstfaser i riktig rekkef\u00f8lge bygger biologisk og tidslig forst\u00e5else' },
      { milestone: 'M\u00e5ling og registrering av vekst', howWeAddress: 'Plantevekst-m\u00e5leark der barn m\u00e5ler h\u00f8yden med klosser og registrerer resultatene trener m\u00e5l- og dataforst\u00e5else' },
      { milestone: 'Naturfaglig vokabular og skriving', howWeAddress: 'Ordsporing og ords\u00f8k med hageord (fr\u00f8, jord, vann, sol, blomst) gir begynnende skrivetrening i naturfaglig kontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til tre vekstfaser (fr\u00f8, plante, blomst) og kjente planter (solsikke, ert). Bruk ekte fr\u00f8s\u00e5ing i klasserommet som supplement. For avanserte barn, introduser fotosyntese-grunnbegreper, plantedeler (rot, stengel, blad) og selvstendig skriving av hagedagbok.',
    parentTakeaway: 'S\u00e5 et fr\u00f8 sammen med barnet \u2014 det er det beste naturfagseksperimentet. M\u00e5l planten ukentlig med en linjal eller klosser. La barnet tegne veksten og skrive korte notater. Snakk om hva planter trenger: \u00absol, vann og jord.\u00bb Selv en urtepotte p\u00e5 vinduskarmen gir m\u00e5neders l\u00e6ring som oppgavearkene forsterker.',
    classroomIntegration: 'Hagetemaet integreres i barnehageklassens naturfagsarbeid: i samlingen observeres klassens planter, ved l\u00e6ringsstasjoner arbeides det med sekvenserings- og m\u00e5leark, p\u00e5 uteomr\u00e5det dyrkes gr\u00f8nnsaker og blomster, og i skrivekroken f\u00f8res hagedagbok. Rammeplanens m\u00e5l for natur, milj\u00f8 og utforskning integreres gjennom hele v\u00e5ren.',
    assessmentRubric: [
      { skill: 'Plantens livssyklus', emerging: 'ordner 2 faser (fr\u00f8, blomst) med bildest\u00f8tte', proficient: 'ordner selvstendig 4 vekstfaser i korrekt rekkef\u00f8lge', advanced: 'forklarer hva som skjer i hvert trinn og hva planten trenger for \u00e5 vokse' },
      { skill: 'M\u00e5ling av plantevekst', emerging: 'm\u00e5ler med klosser med veiledning', proficient: 'm\u00e5ler selvstendig og registrerer h\u00f8yden korrekt', advanced: 'sammenligner m\u00e5linger over tid og beskriver vekstm\u00f8nsteret' },
      { skill: 'Hageordforr\u00e5d og skriving', emerging: 'gjenkjenner 2\u20133 hageord med bildest\u00f8tte', proficient: 'leser og skriver selvstendig 5\u20136 hageord', advanced: 'skriver korte setninger om hagen og bruker naturfaglige begreper' },
    ],
  },

  halloween: {
    snippetAnswer: 'Halloween-oppgaver for barnehageklassen (5\u20136 \u00e5r) kombinerer telling til 20, m\u00f8nstergjenkjenning og kreativ skriving med uhyggelig morsomme motiver som gresskar, flaggermus og spindelvev. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Halloweentemaet fengsler barnehageklassen fordi fem- og seks\u00e5ringer forst\u00e5r forskjellen mellom p\u00e5-liksom-skummelt og ekte skummelt \u2014 de elsker spenningen i kontrollert gys. Mens f\u00f8rskolebarn fargela gresskar, kan barn i barnehageklassen telle s\u00f8tsaker i grupper, l\u00f8se addisjons- og subtraksjonsoppgaver med sp\u00f8kelsestema, skape m\u00f8nstre med halloween-figurer og skrive korte halloweenhistorier. M\u00f8nstergjenkjenning med flaggermus-sp\u00f8kelse-gresskar-sekvenser bygger algebraisk tenkning. Rammeplanens m\u00e5l for kreativitet og fantasi st\u00f8ttes n\u00e5r barn utforsker det uhyggelige i trygge rammer.',
    developmentalMilestones: [
      { milestone: 'M\u00f8nstergjenkjenning med halloweensekvenser (5\u20136-\u00e5ringer gjenkjenner og fortsetter sekvenser)', howWeAddress: 'Halloween-m\u00f8nsterark med flaggermus-sp\u00f8kelse-gresskar-sekvenser trener algebraisk tenkning i engasjerende kontekst' },
      { milestone: 'Addisjon og subtraksjon innenfor 10 (halloweenkontekst)', howWeAddress: 'S\u00f8tsaker-telling og sp\u00f8kelsesmatematikk gir motiverende regnetrening med sesongaktuelle motiver' },
      { milestone: 'Kreativ skriving og fortelling (fantasibasert)', howWeAddress: 'Halloweenhistorie-oppgaver der barn skriver og tegner egne sp\u00f8kelseshistorier gir kreativ skrivetrening' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, bruk morsomme (ikke skumle) motiver, hold tellingen innenfor 10, og tilby skrivemaler med prikkede ord. For avanserte barn i barnehageklassen, introduser flertrinnsoppgaver med halloweentema, komplekse m\u00f8nstre (ABC) og selvstendig skriving av lengre halloweenhistorier.',
    parentTakeaway: 'Halloween er motiverende l\u00e6ring. Tell s\u00f8tsaker sammen, sorter dem etter farge og type, og \u00f8v subtraksjon n\u00e5r noen blir spist. Skj\u00e6r gresskar og tell fr\u00f8ene. La barnet skrive en sp\u00f8kelseshistorie eller tegne et halloween-bilde og fortelle om det. Oppgavearkene kobler halloweenspenningen til strukturert l\u00e6ring.',
    classroomIntegration: 'Halloweentemaet passer som temauke i oktober: i samlingen leses halloweenb\u00f8ker, ved l\u00e6ringsstasjoner arbeides det med telle- og m\u00f8nsterark, i kunstkroken lages masker og gresskarlykt, og i skrivestunden skapes halloweenhistorier. Rammeplanens m\u00e5l for kunst, kreativitet og kommunikasjon integreres i temauken.',
    assessmentRubric: [
      { skill: 'M\u00f8nstergjenkjenning (halloweensekvenser)', emerging: 'fortsetter et AB-m\u00f8nster med st\u00f8tte (sp\u00f8kelse-gresskar)', proficient: 'fortsetter selvstendig AB- og ABB-m\u00f8nstre med halloweenfigurer', advanced: 'lager egne komplekse m\u00f8nstre og forklarer regelen bak' },
      { skill: 'Telling og regning (halloweenkontekst)', emerging: 'teller 1\u201310 halloweengjenstander med st\u00f8tte', proficient: 'teller selvstendig til 20 og l\u00f8ser addisjonsoppgaver innenfor 10', advanced: 'formulerer egne regnestykker med halloweenmotiver og l\u00f8ser dem' },
      { skill: 'Kreativ skriving (halloweentema)', emerging: 'tegner et halloweenbilde og dikterer en setning', proficient: 'skriver selvstendig 1\u20132 setninger til tegningen', advanced: 'skriver en kort halloweenhistorie med begynnelse, midtdel og slutt' },
    ],
  },

  holidays: {
    snippetAnswer: 'H\u00f8ytids-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling, kalenderforst\u00e5else og kulturkunnskap gjennom norske h\u00f8ytider som jul, p\u00e5ske og 17. mai. Barna l\u00e6rer tradisjoner og \u00f8ver skriving. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'H\u00f8ytidstemaet er s\u00e6rlig verdifullt for barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang forst\u00e5r tidssyklusen \u2014 de vet at jul kommer hvert \u00e5r og kan telle ned dagene i adventskalenderen. Mens f\u00f8rskolebarn opplevde h\u00f8ytidene i \u00f8yeblikket, kan barn i barnehageklassen planlegge, forst\u00e5 rekkef\u00f8lge (advent f\u00f8r jul, fastelavn f\u00f8r p\u00e5ske) og sammenligne ulike h\u00f8ytider. Telling og addisjon med h\u00f8ytidsmotiver (adventskalendertall, p\u00e5skeegg, 17. mai-flagg) gir matematikk med personlig betydning. Skriving av h\u00f8ytidskort og \u00f8nskelister trener funksjonell leseferdighet. Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8 og samfunn st\u00f8ttes n\u00e5r barn l\u00e6rer om norske tradisjoner.',
    developmentalMilestones: [
      { milestone: 'Kalender- og tidsforst\u00e5else (5\u20136-\u00e5ringer forst\u00e5r m\u00e5neder og \u00e5rstidssyklus)', howWeAddress: 'H\u00f8ytidskalender-oppgaver der barn plasserer h\u00f8ytider p\u00e5 rett m\u00e5ned bygger tidslig orientering' },
      { milestone: 'Kulturkunnskap og tradisjon (forst\u00e5else av norske skikker)', howWeAddress: 'Sorterings- og koblingsark som forbinder h\u00f8ytider med symboler og tradisjoner bygger kulturell bevissthet' },
      { milestone: 'Funksjonell skriving (kort, lister, invitasjoner)', howWeAddress: 'Skriving av julekort, p\u00e5skehilsener og 17. mai-invitasjoner gir autentisk skrivetrening' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 \u00e9n h\u00f8ytid om gangen, bruk konkrete symboler (juletre, p\u00e5skeegg, flagg) og hold tellingen innenfor 10. For avanserte barn i barnehageklassen, introduser sammenligning mellom h\u00f8ytider, tidslinjer over \u00e5ret og selvstendig skriving av h\u00f8ytidsbeskrivelser.',
    parentTakeaway: 'Hver h\u00f8ytid er en l\u00e6ringsmulighet. Tell adventskalenderlukene, skriv julekort sammen, tell p\u00e5skeegg p\u00e5 eggjakt og tell flagg p\u00e5 17. mai. La barnet hjelpe med \u00e5 planlegge feiringen: hva trenger vi, hvor mange gjester kommer. Oppgavearkene gir struktur til de tradisjonene familien allerede lever.',
    classroomIntegration: 'H\u00f8ytidstemaet f\u00f8lger \u00e5rets syklus i barnehageklassen: i desember arbeides det med juleoppgaver, i mars\u2013april med p\u00e5ske, i mai med nasjonaldagen. Ved l\u00e6ringsstasjoner arbeides det med telle-, sorterings- og skriveark knyttet til sesongaktuell h\u00f8ytid. Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8, samfunn og kulturforst\u00e5else integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Kalenderforst\u00e5else (h\u00f8ytider)', emerging: 'kjenner 1\u20132 h\u00f8ytider og n\u00e5r de feires med st\u00f8tte', proficient: 'plasserer selvstendig 4\u20135 norske h\u00f8ytider p\u00e5 riktig m\u00e5ned i kalenderen', advanced: 'forklarer rekkef\u00f8lgen av h\u00f8ytider gjennom \u00e5ret og sammenligner dem' },
      { skill: 'Telling med h\u00f8ytidsmotiver', emerging: 'teller 1\u201310 h\u00f8ytidsgjenstander med st\u00f8tte', proficient: 'teller selvstendig til 20 og l\u00f8ser addisjonsoppgaver med h\u00f8ytidstema', advanced: 'l\u00f8ser flertrinnsoppgaver og sammenligner mengder p\u00e5 tvers av h\u00f8ytider' },
      { skill: 'Funksjonell skriving (h\u00f8ytidskort)', emerging: 'kopierer enkle h\u00f8ytidsord fra modell', proficient: 'skriver selvstendig korte hilsener p\u00e5 h\u00f8ytidskort', advanced: 'skriver flere setninger med personlige hilsener og korrekt staving' },
    ],
  },

  household: {
    snippetAnswer: 'Husholdnings-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling av hverdagsgjenstander, sortering etter funksjon og begynnende lesing av vanlige husholdningsord. Barna kobler l\u00e6ring til sine egne hjemlige omgivelser. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Husholdningstemaet passer barnehageklassen fordi fem- og seks\u00e5ringer utvikler selvstendighet i hjemmet og begynner \u00e5 forst\u00e5 hvordan ting organiseres. Mens f\u00f8rskolebarn navnga kopp, skje og tallerken, kan barn i barnehageklassen klassifisere husholdningsgjenstander etter rom (kj\u00f8kken, bad, stue), funksjon (renhold, matlaging, spising) og materiale (tre, plast, metall). Telling av bestikk, kopper og tallerkener gir matematikk i hverdagskontekst. M\u00e5ling med gjenstander (bordet er tre gafler langt) introduserer m\u00e5lbegreper. Skriving av husholdningsord trener lesefundamentet. Rammeplanens m\u00e5l for dagliglivsmestring og selvstendighet st\u00f8ttes direkte.',
    developmentalMilestones: [
      { milestone: 'Funksjonell klassifisering (5\u20136-\u00e5ringer sorterer etter bruksomr\u00e5de)', howWeAddress: 'Sorteringsark der barn plasserer gjenstander i riktig rom eller funksjonskategori bygger logisk organisering' },
      { milestone: 'Telling og enkel regning med hverdagsgjenstander', howWeAddress: 'Tell-bestikket-oppgaver og kj\u00f8kkenmatematikk (6 kopper pluss 3 glass) gir praktisk regnetrening' },
      { milestone: 'Selvstendighet og dagliglivsmestring', howWeAddress: 'Oppgaver om morgenrutiner, rydding og borddekking kobler l\u00e6ring til barnets egen hverdag' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, begrens til grunnleggende kj\u00f8kkengjenstander (kopp, tallerken, skje), hold tellingen innenfor 5 og bruk fysiske gjenstander. For avanserte barn, introduser elektriske apparater (med sikkerhetsregler), sortering etter materiale og selvstendig skriving av huskelister.',
    parentTakeaway: 'Hjemmet er ett stort klasserom. La barnet dekke bordet og telle tallerkener: \u00abvi er fire, s\u00e5 vi trenger fire tallerkener.\u00bb Sorter bestikkskuffen sammen, m\u00e5l kj\u00f8kkenbenken med skjeer, og skriv handleliste. Oppgavearkene gj\u00f8r daglige rutiner til bevisste l\u00e6ringsanledninger.',
    classroomIntegration: 'Husholdningstemaet integreres i barnehageklassens daglige rutiner: i samlingen snakkes det om hjemmet, ved l\u00e6ringsstasjoner arbeides det med sorterings- og telleark, i rolleleken drives huskj\u00f8kken og -butikk, og i skrivekroken lages handlelister. Rammeplanens m\u00e5l for dagliglivsmestring og selvstendighet integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Husholdningsklassifisering', emerging: 'sorterer 2\u20133 gjenstander i riktig rom med st\u00f8tte', proficient: 'sorterer selvstendig 6\u20138 gjenstander etter rom og funksjon', advanced: 'sorterer etter flere kriterier (rom, funksjon, materiale) og begrunner valgene' },
      { skill: 'Telling og regning (husholdningskontekst)', emerging: 'teller 1\u20135 gjenstander med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og l\u00f8ser addisjonsoppgaver med husholdningsmotiver', advanced: 'l\u00f8ser praktiske regneoppgaver (nok tallerkener til alle?) og formulerer egne' },
      { skill: 'Skriving av husholdningsord', emerging: 'sporer 2\u20133 enkle husholdningsord', proficient: 'skriver selvstendig 5\u20136 vanlige husholdningsord', advanced: 'skriver korte handlelister og huskelister med egne ord' },
    ],
  },

  insects: {
    snippetAnswer: 'Insekt-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling av bein og vinger, klassifisering av sm\u00e5kryp og begynnende naturfag. Barna l\u00e6rer om insektenes livssyklus og \u00f8kosystem. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Insekttemaet er fascinerende for barnehageklassen fordi fem- og seks\u00e5ringer utvikler evnen til \u00e5 observere sm\u00e5 detaljer systematisk. Mens f\u00f8rskolebarn ble begeistret av enhver bille de fant, kan barn i barnehageklassen klassifisere insekter (seks bein = insekt), forst\u00e5 livssykluser (sommerfuglens metamorfose), og sammenligne insekter etter egenskaper. Telling av bein, vinger og antenner gir naturlig matematikk med faste tall (alltid seks bein), noe som introduserer multiplikasjon intuitivt. Skriving av insektord trener begynnende leseferdigheter. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi st\u00f8ttes n\u00e5r barn utforsker sm\u00e5krypenes verden.',
    developmentalMilestones: [
      { milestone: 'Detaljobservasjon (5\u20136-\u00e5ringer kan se og beskrive sm\u00e5 detaljer)', howWeAddress: 'Insektobservasjonsark med forstørrelsesglassmotiv trener n\u00f8yaktig iakttakelse av bein, vinger og antenner' },
      { milestone: 'Livssyklusforst\u00e5else (metamorfose)', howWeAddress: 'Sommerfuglens livssyklus-sekvensering (egg \u2192 larve \u2192 puppe \u2192 sommerfugl) bygger biologisk forst\u00e5else' },
      { milestone: 'Telling med faste grupper (insektbein = alltid 6)', howWeAddress: 'Tell-beinene-oppgaver der barn teller seks bein p\u00e5 hvert insekt bygger gruppetellingsferdigheter' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 tre velkjente insekter (sommerfugl, marih\u00f8ne, bie), hold tellingen konkret og bruk forstørrelsesglass ute. For avanserte barn, introduser forskjellen mellom insekter og edderkoppdyr, la dem f\u00f8re insektdagbok og utfordre med flertrinns livssyklusoppgaver.',
    parentTakeaway: 'Naturen er full av sm\u00e5kryp. G\u00e5 p\u00e5 insektjakt i hagen eller parken med forstørrelsesglass. Tell beinene: \u00abseks bein betyr at det er et insekt!\u00bb Se etter larver om v\u00e5ren og sommerfugler om sommeren. La barnet tegne insektet og skrive navnet. Oppgavearkene forsterker uteoppdagelsene.',
    classroomIntegration: 'Insekttemaet integreres i barnehageklassens naturfagsarbeid: p\u00e5 utedager observeres sm\u00e5kryp med forstørrelsesglass, i samlingen deles funn, ved l\u00e6ringsstasjoner arbeides det med telle- og sorteringsark, og i kunstkroken males store insektbilder. Rammeplanens m\u00e5l for natur, milj\u00f8 og utforskning integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Insektklassifisering', emerging: 'gjenkjenner 2\u20133 insekter med bildest\u00f8tte', proficient: 'klassifiserer selvstendig 5\u20136 insekter og forklarer at insekter har seks bein', advanced: 'skiller mellom insekter og andre sm\u00e5dyr (edderkopp, tusenbein) og forklarer forskjellene' },
      { skill: 'Livssyklus (sommerfugl)', emerging: 'ordner 2 faser (larve, sommerfugl) med st\u00f8tte', proficient: 'ordner selvstendig 4 metamorfosefaser i korrekt rekkef\u00f8lge', advanced: 'forklarer hva som skjer i hvert trinn og sammenligner med andre livssykluser' },
      { skill: 'Telling med insektkontekst', emerging: 'teller bein p\u00e5 ett insekt (6) med st\u00f8tte', proficient: 'teller selvstendig bein p\u00e5 flere insekter og regner ut totalt antall', advanced: 'bruker gruppetelling (6, 12, 18) og l\u00f8ser addisjonsoppgaver med insektmotiver' },
    ],
  },

  jobs: {
    snippetAnswer: 'Jobb-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener sortering av yrker etter arbeidssted, telling av verkt\u00f8y og begynnende lesing av yrkesord. Barna utforsker hva voksne gj\u00f8r p\u00e5 jobb. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Jobbtemaet er verdifullt for barnehageklassen fordi fem- og seks\u00e5ringer begynner \u00e5 forst\u00e5 samfunnsroller \u2014 de vet at brannmannen slukker brann og at legen hjelper syke, men n\u00e5 kan de g\u00e5 dypere. Barn i barnehageklassen kan klassifisere yrker etter arbeidssted (inne/ute, sykehus/skole/butikk), forst\u00e5 at yrker krever ulike verkt\u00f8y, og koble yrker med tjenester de selv bruker. Telling av verkt\u00f8y og utstyr gir matematikk i yrkeskontekst. Skriving av yrkesord og hvem-gj\u00f8r-hva-setninger trener leseferdigheter. Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8 og samfunn st\u00f8ttes n\u00e5r barn l\u00e6rer om yrkene rundt dem.',
    developmentalMilestones: [
      { milestone: 'Samfunnsrolleforst\u00e5else (5\u20136-\u00e5ringer forst\u00e5r at yrker fyller funksjoner i samfunnet)', howWeAddress: 'Koblingsark der barn forbinder yrker med arbeidssted og tjeneste bygger samfunnsforst\u00e5else' },
      { milestone: 'Klassifisering etter flere kriterier (yrke, verkt\u00f8y, sted)', howWeAddress: 'Sorteringsark som grupperer yrker etter arbeidssted og verkt\u00f8y trener logisk kategorisering' },
      { milestone: 'Funksjonell skriving (hvem gj\u00f8r hva?)', howWeAddress: 'Setningsskriving om yrker (\u00ablegen hjelper syke\u00bb) gir meningsfull skrivetrening med enkel setningsstruktur' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 fire\u2013fem velkjente yrker (brannmann, lege, l\u00e6rer, baker) og bruk rollespill som supplement. For avanserte barn, introduser mindre kjente yrker, la dem intervjue voksne om jobben sin og utfordre med selvstendig skriving av yrkespresentasjoner.',
    parentTakeaway: 'Snakk om hva dere ser p\u00e5 veien: \u00abder er en buss-sj\u00e5f\u00f8r, hva gj\u00f8r hun?\u00bb Fortell barnet om din egen jobb med enkle ord. Lek at barnet er baker, lege eller brannmann, og tell verkt\u00f8yene de trenger. La barnet tegne drømmejobben og skrive en setning om den. Oppgavearkene forsterker denne naturlige yrkesutforskningen.',
    classroomIntegration: 'Jobbtemaet integreres i barnehageklassens samfunnsl\u00e6re: i samlingen presenteres ukens yrke med gjestbes\u00f8k eller video, ved l\u00e6ringsstasjoner arbeides det med koblingsark og ords\u00f8k, i rolleleken drives butikk, sykehus eller brannstasjon. Rammeplanens m\u00e5l for n\u00e6rmilj\u00f8 og samfunn integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Yrkesgjenkjenning og klassifisering', emerging: 'gjenkjenner 3\u20134 yrker med bildest\u00f8tte', proficient: 'klassifiserer selvstendig 6\u20138 yrker etter arbeidssted og verkt\u00f8y', advanced: 'forklarer yrkenes funksjon i samfunnet og sammenligner dem' },
      { skill: 'Telling med yrkesmotiver', emerging: 'teller 1\u20135 verkt\u00f8y med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og l\u00f8ser addisjonsoppgaver i yrkeskontekst', advanced: 'formulerer egne regneoppgaver om yrker og l\u00f8ser dem' },
      { skill: 'Skriving om yrker', emerging: 'sporer yrkesord p\u00e5 prikkede linjer', proficient: 'skriver selvstendig korte setninger om hva ulike yrker gj\u00f8r', advanced: 'skriver flere setninger om drømmejobben med begrunnelse' },
    ],
  },

  music: {
    snippetAnswer: 'Musikk-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener rytme, m\u00f8nstergjenkjenning og telling av taktslag og instrumenter. Barna l\u00e6rer \u00e5 koble musikalske og matematiske m\u00f8nstre. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Musikktemaet er eksepsjonelt for barnehageklassen fordi fem- og seks\u00e5ringer utvikler evnen til \u00e5 holde en jevn puls og gjenkjenne rytmiske m\u00f8nstre \u2014 ferdigheter som kobler direkte til matematisk m\u00f8nstertenkning. Mens f\u00f8rskolebarn klappet og sang spontant, kan barn i barnehageklassen f\u00f8lge flertrinns rytmem\u00f8nstre, telle taktslag, gjenkjenne instrumenter etter utseende og lyd, og forst\u00e5 begreper som h\u00f8yt/lavt og raskt/sakte. Telling av instrumenter og noter gir musikalsk matematikk. Skriving av instrumentnavn trener begynnende leseferdigheter. Rammeplanens m\u00e5l for kunst, kultur og kreativitet st\u00f8ttes direkte n\u00e5r barn utforsker musikkens verden.',
    developmentalMilestones: [
      { milestone: 'Rytmisk m\u00f8nstergjenkjenning (5\u20136-\u00e5ringer holder jevn puls og gjenkjenner m\u00f8nstre)', howWeAddress: 'Rytmem\u00f8nsterark der barn fortsetter klapp-pause-sekvenser kobler musikalsk og matematisk m\u00f8nstertenkning' },
      { milestone: 'Instrumentgjenkjenning og klassifisering', howWeAddress: 'Sorteringsark som grupperer instrumenter etter type (strenge, bl\u00e5se, slagverk) bygger kategoriseringsevne' },
      { milestone: 'Telling og rekkef\u00f8lge med musikalsk kontekst', howWeAddress: 'Tell-notene og tell-instrumentene-oppgaver gir matematisk trening i engasjerende musikkontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, bruk konkrete instrumenter (tromme, bjelle, maracas), hold rytmem\u00f8nstrene enkle (AB) og tell innenfor 5. For avanserte barn, introduser noteverdier (halvnote, fjerdedelsnote), komplekse rytmer og selvstendig skriving av sangtekster.',
    parentTakeaway: 'Musikk er overalt. Klapp rytmen i favorittsangen, tell taktslagene og lek \u00abhva er raskest?\u00bb Lag hjemmelaget instrumenter av kj\u00f8kkenredskap og tell dem. Syng sanger med tellinger (Ti sm\u00e5 indianere). La barnet tegne og navngi instrumenter. Oppgavearkene gir struktur til den musikalske utforskningen.',
    classroomIntegration: 'Musikktemaet integreres i barnehageklassens musikkstunder: i samlingen synges og klappes rytmer, ved l\u00e6ringsstasjoner arbeides det med m\u00f8nster- og telleark, i musikkroken utforskes instrumenter, og i kunstkroken lages hjemmelagde rytmeinstrumenter. Rammeplanens m\u00e5l for kunst, kultur og kreativitet integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Rytmisk m\u00f8nstergjenkjenning', emerging: 'klapper med i et enkelt AB-m\u00f8nster med st\u00f8tte', proficient: 'fortsetter selvstendig rytmem\u00f8nstre (ABB, ABC) og holder jevn puls', advanced: 'lager egne rytmem\u00f8nstre og forklarer reglene' },
      { skill: 'Instrumentgjenkjenning', emerging: 'gjenkjenner 2\u20133 instrumenter med bildest\u00f8tte', proficient: 'navngir og klassifiserer selvstendig 6\u20138 instrumenter etter type', advanced: 'forklarer forskjeller mellom instrumentgrupper og gjenkjenner lyder' },
      { skill: 'Telling i musikkontekst', emerging: 'teller 1\u20135 instrumenter med st\u00f8tte', proficient: 'teller selvstendig opptil 20 taktslag eller instrumenter', advanced: 'bruker telling til \u00e5 beskrive rytmer og l\u00f8ser addisjonsoppgaver med noter' },
    ],
  },

  nature: {
    snippetAnswer: 'Natur-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener observasjon, klassifisering og telling av naturgjenstander. Barna l\u00e6rer om \u00e5rstider, v\u00e6r og \u00f8kosystemer gjennom norsk natur. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Naturtemaet er kjernen i norsk barnehagepedagogikk, og i barnehageklassen f\u00e5r det en ny akademisk dimensjon. Fem- og seks\u00e5ringer g\u00e5r fra \u00e5 oppleve naturen sensorisk til \u00e5 observere systematisk og klassifisere det de finner. Barn i barnehageklassen kan skille levende fra ikke-levende, forst\u00e5 \u00e5rstidssykluser i detalj, og registrere v\u00e6robservasjoner. Telling av naturgjenstander i grupper gir feltmatematikk. M\u00e5ling av snødybde, pinnel\u00e8ngde og bladst\u00f8rrelse introduserer m\u00e5lbegreper. Skriving av naturord og v\u00e6rdagbok trener leseferdigheter. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi er selve grunnmuren i dette temaet.',
    developmentalMilestones: [
      { milestone: 'Systematisk naturobservasjon (5\u20136-\u00e5ringer kan iaktta m\u00e5lrettet)', howWeAddress: 'Observasjonsark med sjekklister for uteopplevelser trener fokusert iakttakelse og registrering' },
      { milestone: '\u00c5rstids- og v\u00e6rforst\u00e5else i detalj', howWeAddress: 'V\u00e6rregistreringsark og \u00e5rstidssammenligninger bygger forst\u00e5elsen av naturens sykluser' },
      { milestone: 'Klassifisering: levende mot ikke-levende', howWeAddress: 'Sorteringsark der barn skiller mellom levende og ikke-levende naturgjenstander bygger grunnleggende naturforst\u00e5else' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 \u00e9n \u00e5rstid om gangen, bruk uteopplevelser som konkret supplement og hold klassifiseringen enkel (dyr/plante). For avanserte barn, introduser n\u00e6ringskjeder, v\u00e6rdagbok med m\u00e5linger og selvstendig skriving av naturbeskrivelser.',
    parentTakeaway: 'G\u00e5 p\u00e5 tur og v\u00e6r naturdetektiver: \u00abhvor mange fugler ser vi?\u00bb, \u00abhvilke farger har bladene?\u00bb, \u00abregner det eller er det sol?\u00bb. La barnet samle naturgjenstander og sortere dem hjemme. F\u00f8r en enkel v\u00e6rdagbok: tegn sola eller skyene og skriv temperaturen. Oppgavearkene forsterker alt barnet opplever utend\u00f8rs.',
    classroomIntegration: 'Naturtemaet er barnehageklassens r\u00f8de tr\u00e5d hele \u00e5ret: utedager gir f\u00f8rsteh\u00e5nds observasjoner, i samlingen deles funn, ved l\u00e6ringsstasjoner arbeides det med v\u00e6r-, telle- og sorteringsark, og i skrivekroken f\u00f8res naturdagbok. Rammeplanens m\u00e5l for natur, milj\u00f8, kropp og bevegelse integreres gjennom hele \u00e5rshjulet.',
    assessmentRubric: [
      { skill: 'Naturobservasjon og registrering', emerging: 'peker ut 2\u20133 naturgjenstander med st\u00f8tte', proficient: 'observerer og registrerer selvstendig 5+ funn p\u00e5 en sjekklisteoppgave', advanced: 'beskriver observasjonene med detaljer og stiller undrende sp\u00f8rsm\u00e5l' },
      { skill: '\u00c5rstidsforst\u00e5else', emerging: 'navngir 1\u20132 \u00e5rstider med kjennetegn', proficient: 'beskriver selvstendig alle 4 \u00e5rstider med typiske naturtrekk', advanced: 'forklarer hvorfor \u00e5rstidene endrer seg og hvordan naturen tilpasser seg' },
      { skill: 'Klassifisering (levende/ikke-levende)', emerging: 'sorterer 2\u20133 gjenstander med st\u00f8tte', proficient: 'sorterer selvstendig 6\u20138 naturgjenstander korrekt', advanced: 'forklarer kriteriene for levende (vokser, trenger n\u00e6ring) og bruker dem p\u00e5 nye eksempler' },
    ],
  },

  numbers: {
    snippetAnswer: 'Tall-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener tallgjenkjenning til 20, addisjon og subtraksjon innenfor 10, og tallskriving p\u00e5 linjert papir. Barna bygger det solide tallfundamentet for skolestart. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Talltemaet er selve kjernen i barnehageklassens matematikk. Fem- og seks\u00e5ringer g\u00e5r fra usikker telling til automatisk tallgjenkjenning, fra konkrete tellere til mental aritmetikk. Mens f\u00f8rskolebarn telte til 10 med gjenstander, mestrer barn i barnehageklassen telling til 20 og videre, forst\u00e5r mengdebegrepet (at tallet fem representerer en bestemt mengde), og begynner med formell addisjon og subtraksjon. Tallskriving p\u00e5 linjert papir erstatter sporing. Tallm\u00f8nstre (oddetall, partall, telling i grupper p\u00e5 2, 5 og 10) introduseres. Kunnskapsl\u00f8ftet (LK20) og Rammeplan for barnehagen legger stor vekt p\u00e5 tallforst\u00e5else som grunnlag for all videre matematikk.',
    developmentalMilestones: [
      { milestone: 'Automatisk tallgjenkjenning til 20 (5\u20136-\u00e5ringer gjenkjenner tallsymboler raskt)', howWeAddress: 'Tallgjenkjenningsark med blandet rekkef\u00f8lge og varierte skrifttyper trener automatikk i tallidentifikasjon' },
      { milestone: 'Addisjon og subtraksjon innenfor 10 (begynnende formell regning)', howWeAddress: 'Regneark med tallinje og konkrete tellere bygger forst\u00e5elsen av addisjons- og subtraksjonsoperasjoner' },
      { milestone: 'Tallskriving p\u00e5 linjert papir (korrekt tallforming)', howWeAddress: 'Skriveark med trinnvis overgang fra prikkede tall til selvstendig skriving bygger riktig tallformingsrutine' },
      { milestone: 'Tallm\u00f8nster og gruppetelling (2, 5, 10)', howWeAddress: 'M\u00f8nsterark med tallsekvenser og gruppetellings\u00f8velser bygger algebraisk tenkning og multiplikasjonsgrunnlag' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, hold fokus p\u00e5 tallene 1\u201310, bruk konkrete tellere (klosser, knapper) og gi mye tid til tallskriving med prikkemal. For avanserte barn, introduser tallene opp til 50, flertrinns addisjonsoppgaver og begynnende tekstoppgaver med tall.',
    parentTakeaway: 'Tall er overalt i hverdagen. Tell trappetrinne, bilnummerplater og frukt p\u00e5 tallerkenen. Spill terningspill som Ludo og Stigespill for telletrening. \u00d8v tallskriving med kritt p\u00e5 fortauet. Still sp\u00f8rsm\u00e5l: \u00abhvor mange er det til sammen?\u00bb og \u00abhvor mange er igjen?\u00bb. Oppgavearkene gir den systematiske treningen som bygger talltrygghet.',
    classroomIntegration: 'Talltemaet er daglig arbeid i barnehageklassen: morgensamlingen begynner med datoens tall og telling, ved l\u00e6ringsstasjoner arbeides det med telle-, skrive- og regneark, i mattekroken l\u00f8ses oppgaver med tallinje og tellere, og i hverdagsrutiner telles barn, kopper og leker. Kunnskapsl\u00f8ftets m\u00e5l for tall og regning danner grunnlaget for stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Tallgjenkjenning til 20', emerging: 'gjenkjenner tallene 1\u201310 med noe n\u00f8ling', proficient: 'gjenkjenner alle tall 1\u201320 raskt og sikkert', advanced: 'gjenkjenner tall opp til 50 og forst\u00e5r tallverdi (at 15 er mer enn 12)' },
      { skill: 'Addisjon og subtraksjon innenfor 10', emerging: 'l\u00f8ser oppgaver innenfor 5 med konkrete tellere', proficient: 'l\u00f8ser selvstendig oppgaver innenfor 10 med tallinje', advanced: 'l\u00f8ser oppgaver mentalt og forklarer strategien sin' },
      { skill: 'Tallskriving', emerging: 'skriver tallene 1\u20135 med prikkemal', proficient: 'skriver alle tall 1\u201320 leselig p\u00e5 linjert papir', advanced: 'skriver tall raskt og korrekt, og bruker dem i regneoppgaver' },
    ],
  },

  ocean: {
    snippetAnswer: 'Hav-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling av sj\u00f8dyr, klassifisering etter levested og begynnende naturfag om livet i havet. Barna utforsker undervannsverdenen gjennom engasjerende oppgaver. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Havtemaet fascinerer barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan forst\u00e5 at havet er et \u00f8kosystem \u2014 ikke bare \u00abvann med fisk i.\u00bb Mens f\u00f8rskolebarn navnga hval, fisk og krabbe, kan barn i barnehageklassen klassifisere sj\u00f8dyr etter egenskaper (skall/ingen skall, finner/bein, stort/lite), forst\u00e5 havets soner (overflate, bunn) og koble sj\u00f8dyr med n\u00e6ringskjeder. Telling av sj\u00f8dyr i grupper gir marin matematikk. M\u00f8nstergjenkjenning med b\u00f8lger og skjell bygger algebraisk tenkning. Skriving av sj\u00f8dyrsord trener begynnende leseferdigheter. Rammeplanens m\u00e5l for natur, milj\u00f8 og teknologi st\u00f8ttes n\u00e5r barn utforsker havet.',
    developmentalMilestones: [
      { milestone: 'Klassifisering av sj\u00f8dyr etter egenskaper (5\u20136-\u00e5ringer sorterer etter flere kriterier)', howWeAddress: 'Sorteringsark med sj\u00f8dyr der barn grupperer etter skall/finner/st\u00f8rrelse bygger logisk klassifisering' },
      { milestone: 'Enkel \u00f8kosystemforst\u00e5else (hvem spiser hvem i havet)', howWeAddress: 'Marine n\u00e6ringskjede-oppgaver (tang \u2192 liten fisk \u2192 stor fisk) bygger \u00f8kologisk grunnforst\u00e5else' },
      { milestone: 'Telling og m\u00f8nster i marin kontekst', howWeAddress: 'Tell-sj\u00f8dyrene og b\u00f8lgem\u00f8nster-oppgaver gir matematisk trening med engasjerende havmotiver' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 fire\u2013fem velkjente sj\u00f8dyr (fisk, krabbe, hval, blekksprut), hold tellingen innenfor 10 og bruk sj\u00f8dyrfigurer som supplement. For avanserte barn, introduser dyphavsdyr, havforurensning som tema og selvstendig skriving av sj\u00f8dyrfakta.',
    parentTakeaway: 'Havet er fascinerende for barn. Bes\u00f8k et akvarium og tell fiskene i tanken. Se p\u00e5 dokumentarer om havet og snakk om dyrene. Samle skjell p\u00e5 stranden og sorter dem etter st\u00f8rrelse og form. La barnet tegne en undervannsscene og fortelle om dyrene i den. Oppgavearkene forsterker denne naturlige havfascinasjonen.',
    classroomIntegration: 'Havtemaet passer som temauke eller m\u00e5nedstema: i samlingen vises bilder og filmer fra havet, ved l\u00e6ringsstasjoner arbeides det med telle-, sorterings- og ords\u00f8kark, i kunstkroken lages undervannsbilder, og i lesestasjonen leses sj\u00f8dyrfaktab\u00f8ker. Rammeplanens m\u00e5l for natur, milj\u00f8 og utforskning integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Sj\u00f8dyrklassifisering', emerging: 'gjenkjenner 2\u20133 sj\u00f8dyr med bildest\u00f8tte', proficient: 'klassifiserer selvstendig 5\u20136 sj\u00f8dyr etter egenskaper (skall, finner)', advanced: 'oppretter egne klassifiseringskriterier og forklarer forskjeller mellom sj\u00f8dyrgrupper' },
      { skill: 'Marin n\u00e6ringskjede', emerging: 'kobler 1 sj\u00f8dyr med maten sin med st\u00f8tte', proficient: 'ordner selvstendig en 3-trinns marin n\u00e6ringskjede', advanced: 'forklarer flere n\u00e6ringskjeder i havet og hva som skjer hvis et ledd forsvinner' },
      { skill: 'Telling og m\u00f8nster (havkontekst)', emerging: 'teller 1\u201310 sj\u00f8dyr med st\u00f8tte', proficient: 'teller selvstendig til 20 og fortsetter b\u00f8lgem\u00f8nstre', advanced: 'l\u00f8ser addisjonsoppgaver med sj\u00f8dyr og lager egne m\u00f8nstersekvenser' },
    ],
  },

  pets: {
    snippetAnswer: 'Kj\u00e6ledyr-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling, ansvarsl\u00e6ring og begynnende skriving gjennom katt, hund, kanin og andre kj\u00e6ledyr. Barna l\u00e6rer om dyrestell og omsorg. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Kj\u00e6ledyrtemaet treffer barnehageklassen perfekt fordi fem- og seks\u00e5ringer begynner \u00e5 forst\u00e5 ansvar \u2014 de kan f\u00f8lge daglige rutiner som f\u00f4ring og stell, og de l\u00e6rer at dyr har behov som m\u00e5 dekkes. Mens f\u00f8rskolebarn klapte hunden og navnga katten, kan barn i barnehageklassen planlegge f\u00f4ringsrutiner, telle utstyr (3 leker pluss 2 bein), sammenligne st\u00f8rrelser (hamster mot hund), og klassifisere kj\u00e6ledyr etter egenskaper. Skriving av kj\u00e6ledyrdagbok og stellelister gir funksjonell skrivetrening. Rammeplanens m\u00e5l for omsorg, ansvar og natur st\u00f8ttes n\u00e5r barn l\u00e6rer om dyrevelferd.',
    developmentalMilestones: [
      { milestone: 'Ansvarsforst\u00e5else (5\u20136-\u00e5ringer forst\u00e5r at levende vesener har behov)', howWeAddress: 'Stellerutine-oppgaver der barn planlegger daglig omsorg (mat, vann, trim) bygger ansvarsbevissthet' },
      { milestone: 'Sammenligning og klassifisering av dyr', howWeAddress: 'Sorteringsark der barn grupperer kj\u00e6ledyr etter st\u00f8rrelse, pels og behov trener logisk tenkning' },
      { milestone: 'Funksjonell skriving (kj\u00e6ledyrdagbok og stellelister)', howWeAddress: 'Skriving av f\u00f4ringslister og kj\u00e6ledyrdagbok gir meningsfull skrivetrening med personlig engasjement' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 tre velkjente kj\u00e6ledyr (katt, hund, gullfisk), hold tellingen innenfor 5 og bruk billedst\u00f8tte. For avanserte barn, introduser mer eksotiske kj\u00e6ledyr, la dem lage en komplett stelleplan og utfordre med selvstendig skriving av kj\u00e6ledyrpresentasjoner.',
    parentTakeaway: 'Hvis familien har kj\u00e6ledyr, involver barnet i daglig stell: tell f\u00f4rpelleter, m\u00e5l vann i koppen og f\u00f8r en enkel stelledagbok. Hvis dere ikke har dyr, bes\u00f8k en dyrepark eller les om kj\u00e6ledyr. La barnet tegne drømmekj\u00e6ledyret og skrive hva det trenger. Oppgavearkene bygger ansvarsferdigheter gjennom kj\u00e6rlighetsfull dyrel\u00e6ring.',
    classroomIntegration: 'Kj\u00e6ledyrtemaet integreres i barnehageklassens naturundervisning: i samlingen presenteres ukens kj\u00e6ledyr med bilder eller bes\u00f8k, ved l\u00e6ringsstasjoner arbeides det med telle-, sorterings- og skriveark, i rolleleken drives dyreklinikk, og i lesestasjonen leses dyrefaktab\u00f8ker. Rammeplanens m\u00e5l for natur, omsorg og ansvar integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Kj\u00e6ledyrklassifisering', emerging: 'gjenkjenner 2\u20133 kj\u00e6ledyr med bildest\u00f8tte', proficient: 'klassifiserer selvstendig 5\u20136 kj\u00e6ledyr etter egenskaper (pels, st\u00f8rrelse)', advanced: 'sammenligner behov p\u00e5 tvers av kj\u00e6ledyrarter og forklarer forskjellene' },
      { skill: 'Telling og regning (kj\u00e6ledyrkontekst)', emerging: 'teller 1\u20135 dyregjenstander med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og l\u00f8ser addisjonsoppgaver med kj\u00e6ledyrmotiver', advanced: 'formulerer egne regneoppgaver om kj\u00e6ledyrstell og l\u00f8ser dem' },
      { skill: 'Skriving om kj\u00e6ledyr', emerging: 'sporer kj\u00e6ledyrord (katt, hund) p\u00e5 prikkede linjer', proficient: 'skriver selvstendig korte setninger om kj\u00e6ledyr og deres behov', advanced: 'skriver en kj\u00e6ledyrdagbok med flere setninger og detaljer' },
    ],
  },

  pirates: {
    snippetAnswer: 'Pirat-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener kartlesing, retningsforst\u00e5else og telling med skattekister, mynter og piratskip. Barna l\u00f8ser matematiske skattejaktsoppgaver. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Pirattemaet er magisk for barnehageklassen fordi fem- og seks\u00e5ringer elsker eventyr med oppdrag og belønning \u2014 og piratskattejakt er det ultimate oppdraget. Mens f\u00f8rskolebarn kledde seg ut og lekte pirat, kan barn i barnehageklassen f\u00f8lge skattekart med retningsanvisninger, telle gullmynter og edelsteiner, l\u00f8se kodeoppgaver med tall, og forst\u00e5 begreper som nord/s\u00f8r/\u00f8st/vest. Addisjon og subtraksjon med piratskatter (8 mynter pluss 5 mynter i kisten) gir motiverende matematikk. Skriving av pirathemmeligheter og skattekart-instruksjoner trener funksjonell skriving. Rammeplanens m\u00e5l for utforskning, rom og form st\u00f8ttes n\u00e5r barn navigerer i piratkontekst.',
    developmentalMilestones: [
      { milestone: 'Romlig orientering og kartlesing (5\u20136-\u00e5ringer f\u00f8lger retningsanvisninger)', howWeAddress: 'Skattekart-oppgaver med trinn-for-trinn-navigasjon bygger romlig forst\u00e5else og kartferdigheter' },
      { milestone: 'Probleml\u00f8sning og kodeknekking', howWeAddress: 'Piratk\u00f8de-oppgaver der barn l\u00f8ser tallkoder for \u00e5 finne skatten trener logisk resonnering' },
      { milestone: 'Addisjon og subtraksjon med skattemotiver', howWeAddress: 'Skattetelling og mynteregning gir engasjerende matematikk med eventyrkontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, hold skattekartene enkle (3\u20134 trinn), tell innenfor 10 og bruk fysisk skattejakt i klasserommet. For avanserte barn, introduser kompassretninger, flertrinns kodeoppgaver og selvstendig skriving av skattekartinstruksjoner.',
    parentTakeaway: 'Lag en skattejakt hjemme: tegn et enkelt kart, gjem en \u00abskatt\u00bb og la barnet f\u00f8lge retningsanvisningene. Tell gullmynter (sjokolademynter) og \u00f8v addisjon. La barnet tegne sitt eget skattekart og skrive instruksjonene. Oppgavearkene gir strukturerte piratmatematikkoppgaver som bygger p\u00e5 denne lekbaserte utforskningen.',
    classroomIntegration: 'Pirattemaet passer som temauke: i samlingen leses pirateventyr, ved l\u00e6ringsstasjoner arbeides det med skattekart-, telle- og kodeoppgaver, p\u00e5 uteomr\u00e5det arrangeres klassens skattejakt, og i kunstkroken lages piratflagg og -hatter. Rammeplanens m\u00e5l for rom, form, utforskning og bevegelse integreres i temauken.',
    assessmentRubric: [
      { skill: 'Kartlesing og romlig orientering', emerging: 'f\u00f8lger 1\u20132 retningsanvisninger med st\u00f8tte', proficient: 'f\u00f8lger selvstendig et skattekart med 4\u20135 trinn', advanced: 'tegner egne skattekart med retningsanvisninger og gir dem til andre' },
      { skill: 'Telling og regning (piratskatt)', emerging: 'teller 1\u201310 mynter med st\u00f8tte', proficient: 'teller selvstendig opptil 20 og l\u00f8ser addisjonsoppgaver med skattemotiver', advanced: 'formulerer flertrinns regneoppgaver og bruker subtraksjon i skattekontekst' },
      { skill: 'Kodeknekking og probleml\u00f8sning', emerging: 'l\u00f8ser enkle tall-bilde-koder med st\u00f8tte', proficient: 'l\u00f8ser selvstendig 3\u20134-trinns kodeoppgaver', advanced: 'lager egne koder og forklarer logikken bak' },
    ],
  },

  robots: {
    snippetAnswer: 'Robot-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener sekvenstenkning, enkel koding og geometriske former gjennom robotbygging og -programmering. Barna l\u00e6rer logisk rekkef\u00f8lge og instruksjoner. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Robottemaet er ideelt for barnehageklassen fordi fem- og seks\u00e5ringer begynner \u00e5 forst\u00e5 at maskiner f\u00f8lger instruksjoner \u2014 akkurat som de selv f\u00f8lger regler i spill. Mens f\u00f8rskolebarn tegnet roboter for moro, kan barn i barnehageklassen tenke som programmerere: gi steg-for-steg-instruksjoner, forst\u00e5 rekkef\u00f8lge (f\u00f8rst, s\u00e5, til slutt) og l\u00f8se problemer ved \u00e5 pr\u00f8ve og feile. Roboter best\u00e5r av geometriske former (firkant, sirkel, trekant), s\u00e5 bygging av roboter p\u00e5 papir trener formgjenkjenning. Telling av robotdeler gir matematikk. Rammeplanens m\u00e5l for teknologi, utforskning og kreativitet st\u00f8ttes n\u00e5r barn utforsker robotverdenen.',
    developmentalMilestones: [
      { milestone: 'Sekvenstenkning og instruksjonsforst\u00e5else (5\u20136-\u00e5ringer forst\u00e5r trinn-for-trinn-logikk)', howWeAddress: 'Programmer-roboten-oppgaver der barn gir instruksjoner i riktig rekkef\u00f8lge bygger algoritmisk tenkning' },
      { milestone: 'Formgjenkjenning i konstruksjoner (robotbygging med former)', howWeAddress: 'Bygg-en-robot-oppgaver med geometriske former trener formgjenkjenning og kreativ konstruksjon' },
      { milestone: 'Pr\u00f8v-og-feil-probleml\u00f8sning', howWeAddress: 'Feilsøkingsoppgaver der barn finner feilen i en robotinstruksjon trener logisk feilretting (debugging)' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, hold instruksjonssekvensene til 2\u20133 trinn, bruk store geometriske former for robotbygging og gi mye visuell st\u00f8tte. For avanserte barn, introduser l\u00f8kker (\u00abgj\u00f8r dette tre ganger\u00bb), betingelser (\u00abhvis vegg, snu\u00bb) og selvstendig skriving av robotinstruksjoner.',
    parentTakeaway: 'Lek robot hjemme: et familiemedlem er \u00abroboten\u00bb og barnet gir instruksjoner (\u00abg\u00e5 to skritt frem, snu til h\u00f8yre\u00bb). Bygg en robot av pappesk og telling formene. Tegn en robot av geometriske former og tell delene. Oppgavearkene gir strukturert trening i den logiske tenkningen som ligger bak all programmering.',
    classroomIntegration: 'Robottemaet integreres i barnehageklassens teknologil\u00e6ring: i samlingen presenteres robotbegreper, ved l\u00e6ringsstasjoner arbeides det med sekvens- og formoppgaver, i byggekroken konstrueres roboter av gjenbruksmateriale, og p\u00e5 gulvet \u00f8ves kroppslig programmering. Rammeplanens m\u00e5l for teknologi, kreativitet og utforskning integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Sekvenstenkning (robotinstruksjoner)', emerging: 'ordner 2 instruksjoner i riktig rekkef\u00f8lge med st\u00f8tte', proficient: 'ordner selvstendig 4\u20135 instruksjoner i korrekt sekvens', advanced: 'lager egne instruksjonssekvenser og finner feil i andres' },
      { skill: 'Formgjenkjenning (robotbygging)', emerging: 'identifiserer 1\u20132 grunnformer (sirkel, firkant) med st\u00f8tte', proficient: 'identifiserer selvstendig 4+ former og bruker dem til \u00e5 bygge roboter', advanced: 'kombinerer former kreativt og forklarer valgene sine' },
      { skill: 'Probleml\u00f8sning (feilsøking)', emerging: 'finner en opplagt feil i en instruksjon med st\u00f8tte', proficient: 'finner selvstendig feilen i en 3\u20134-trinns instruksjonssekvens', advanced: 'foresl\u00e5r l\u00f8sninger og forklarer hvorfor den opprinnelige instruksjonen var feil' },
    ],
  },

  school: {
    snippetAnswer: 'Skole-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener klasseromsferdigheter, telling av skolesaker og begynnende lesing av skoleord. Barna forberedes p\u00e5 overgangen til 1. klasse. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Skoletemaet er ekstra viktig for barnehageklassen fordi fem- og seks\u00e5ringer st\u00e5r foran den store overgangen til 1. klasse. Mens f\u00f8rskolebarn lekte skole, forbereder barn i barnehageklassen seg p\u00e5 reell skolestart: de l\u00e6rer \u00e5 rekke opp h\u00e5nden, vente p\u00e5 tur, f\u00f8lge instruksjoner og organisere skolesaker. Telling av blyanter, viskelær og b\u00f8ker gir praktisk matematikk. Skriving av skolerelaterte ord (blyant, sekk, bok) trener lesefundamentet. Tidsforst\u00e5else med klasseromsrutiner (f\u00f8rst samling, s\u00e5 stasjonsarbeid, til slutt lek) bygger sekvenstenkning. Rammeplanens m\u00e5l for sosial kompetanse og selvstendighet er s\u00e6rlig relevante for dette temaet.',
    developmentalMilestones: [
      { milestone: 'Overgangsforberedelse (5\u20136-\u00e5ringer l\u00e6rer klasseromsferdigheter)', howWeAddress: 'Regelforst\u00e5elses- og rutineoppgaver trener de sosiale ferdighetene som trengs ved skolestart' },
      { milestone: 'Organisering og selvstendighet (holde orden p\u00e5 skolesaker)', howWeAddress: 'Pakk-skolesekken-oppgaver der barn velger og teller n\u00f8dvendige gjenstander trener planlegging' },
      { milestone: 'Skriving av skoleord og begynnende selvstendighet', howWeAddress: 'Ordsporing og ords\u00f8k med skoleord gir begynnende skrivetrening i skolekontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 grunnleggende rutiner (\u00e9n ting om gangen) og velkjente skolesaker. Bruk rollespill og dukketeater for \u00e5 \u00f8ve sosiale situasjoner. For avanserte barn, introduser timeplaner, la dem planlegge en hel skoledag og utfordre med selvstendig skriving om drømmeskolen.',
    parentTakeaway: 'Forbered barnet p\u00e5 skolen gjennom daglige rutiner: \u00f8v \u00e5 pakke sekken, legge frem klærne kvelden f\u00f8r, og f\u00f8lge morgenrutinen selvstendig. Snakk positivt om skolen: \u00abdu skal f\u00e5 nye venner og l\u00e6re spennende ting.\u00bb Lek skole hjemme med oppgaveark. Oppgavearkene gj\u00f8r overgangen trygg ved \u00e5 gj\u00f8re skolen kjent p\u00e5 forh\u00e5nd.',
    classroomIntegration: 'Skoletemaet integreres i barnehageklassens overgangsprogram: i samlingen \u00f8ves klasseromsferdigheter, ved l\u00e6ringsstasjoner arbeides det med organiserings- og skriveoppgaver, i rolleleken \u00f8ves skolerutiner, og p\u00e5 bes\u00f8ksdager til skolen brukes oppgavearkene som forberedelse. Rammeplanens m\u00e5l for sosial kompetanse og livslang l\u00e6ring integreres.',
    assessmentRubric: [
      { skill: 'Klasseromsferdigheter', emerging: 'f\u00f8lger 1\u20132 klasseromregler med p\u00e5minnelse', proficient: 'f\u00f8lger selvstendig 4\u20135 grunnleggende klasseromregler (rekke opp h\u00e5nden, vente p\u00e5 tur)', advanced: 'hjelper andre med \u00e5 f\u00f8lge reglene og forklarer hvorfor de er viktige' },
      { skill: 'Organisering av skolesaker', emerging: 'finner 2\u20133 skolesaker med st\u00f8tte', proficient: 'pakker selvstendig skolesekken med alle n\u00f8dvendige gjenstander', advanced: 'planlegger hva som trengs for ulike aktiviteter og organiserer selvstendig' },
      { skill: 'Skriving av skoleord', emerging: 'sporer 2\u20133 skoleord p\u00e5 prikkede linjer', proficient: 'skriver selvstendig 5\u20136 vanlige skoleord leselig', advanced: 'skriver korte setninger om skolen og bruker skoleordforr\u00e5d i fri skriving' },
    ],
  },

  seasons: {
    snippetAnswer: '\u00c5rstids-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener tidsforst\u00e5else, v\u00e6robservasjon og naturfag gjennom de fire norske \u00e5rstidene. Barna sammenligner kjennetegn og \u00f8ver m\u00e5linger. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: '\u00c5rstidstemaet er fundamentalt for barnehageklassen i Norge fordi fem- og seks\u00e5ringer for f\u00f8rste gang forst\u00e5r \u00e5rets sykliske natur \u2014 de husker forrige vinter og kan glede seg til neste sommer. Mens f\u00f8rskolebarn opplevde \u00e5rstidene i nuet, kan barn i barnehageklassen sammenligne dem systematisk: hva er likt og ulikt mellom h\u00f8st og v\u00e5r, hvilke dyr er aktive n\u00e5r, og hvordan p\u00e5virker v\u00e6ret kl\u00e6r og aktiviteter. M\u00e5ling av temperatur, daglengde og snødybde gir naturfaglig matematikk. Skriving av v\u00e6robservasjoner og \u00e5rstidsbeskrivelser trener leseferdigheter. Rammeplanens m\u00e5l for natur, milj\u00f8, kropp og helse st\u00f8ttes gjennom hele \u00e5ret.',
    developmentalMilestones: [
      { milestone: 'Syklisk tidsforst\u00e5else (5\u20136-\u00e5ringer forst\u00e5r at \u00e5rstider gjentar seg)', howWeAddress: '\u00c5rshjul-oppgaver der barn plasserer \u00e5rstidene i syklus bygger forst\u00e5elsen av tidslig gjentakelse' },
      { milestone: 'Sammenligning av \u00e5rstider (likheter og forskjeller)', howWeAddress: 'Sammenligningsark der barn finner likheter og forskjeller mellom \u00e5rstider bygger analytisk tenkning' },
      { milestone: 'V\u00e6robservasjon og registrering', howWeAddress: 'V\u00e6rdagbok-oppgaver med temperaturm\u00e5ling og v\u00e6rsymboler gir praktisk naturfagstrening' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 to kontrasterende \u00e5rstider (sommer mot vinter) og bruk konkrete v\u00e6roppleversler. For avanserte barn, introduser m\u00e5nedsnavn i rekkef\u00f8lge, la dem f\u00f8re v\u00e6rdagbok med m\u00e5linger og utfordre med \u00e5rstidssammenligninger i andre land.',
    parentTakeaway: 'Snakk om \u00e5rstidene i hverdagen: \u00abdet er h\u00f8st, se p\u00e5 de r\u00f8de bladene!\u00bb, \u00abdet er vinter, m\u00e5l snøen med en pinne.\u00bb Ta bilder av det samme treet i alle fire \u00e5rstider. La barnet tegne v\u00e6ret hver dag og skrive noen ord. Oppgavearkene gir struktur til den naturlige v\u00e6robservasjonen som skjer p\u00e5 hver eneste tur.',
    classroomIntegration: '\u00c5rstidstemaet f\u00f8lger naturlig barnehageklassens \u00e5rshjul: om h\u00f8sten samles blader og kongler, om vinteren m\u00e5les sn\u00f8, om v\u00e5ren s\u00e5es fr\u00f8, om sommeren observeres insekter. V\u00e6rdagboken f\u00f8res daglig i samlingen. Rammeplanens m\u00e5l for natur, milj\u00f8, kropp og helse integreres gjennom hele \u00e5rsplanen.',
    assessmentRubric: [
      { skill: '\u00c5rstidsgjenkjenning', emerging: 'navngir 2 \u00e5rstider med typiske kjennetegn', proficient: 'beskriver selvstendig alle 4 \u00e5rstider med v\u00e6r, natur og aktiviteter', advanced: 'sammenligner \u00e5rstider og forklarer hvorfor de endrer seg' },
      { skill: 'V\u00e6robservasjon og registrering', emerging: 'velger riktig v\u00e6rsymbol med st\u00f8tte', proficient: 'registrerer selvstendig daglig v\u00e6r med symboler og enkle ord', advanced: 'sammenligner v\u00e6rdata over tid og oppdager m\u00f8nstre' },
      { skill: '\u00c5rstidssammenligning', emerging: 'peker ut \u00e9n forskjell mellom to \u00e5rstider med st\u00f8tte', proficient: 'beskriver selvstendig 2\u20133 forskjeller mellom alle \u00e5rstider', advanced: 'forklarer sammenhenger mellom v\u00e6r, natur og menneskelig aktivitet gjennom \u00e5ret' },
    ],
  },

  shapes: {
    snippetAnswer: 'Form-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener gjenkjenning av geometriske former, symmetri og romlig forst\u00e5else. Barna l\u00e6rer \u00e5 navngi, tegne og sammenligne sirkler, firkanter, trekanter og sekskanter. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Formtemaet er kjernen i barnehageklassens geometril\u00e6ring. Fem- og seks\u00e5ringer g\u00e5r fra \u00e5 gjenkjenne grunnformer til \u00e5 forst\u00e5 egenskaper: en firkant har fire sider og fire hj\u00f8rner, en trekant har tre. Mens f\u00f8rskolebarn sorterte etter form som en visuell helhet, kan barn i barnehageklassen telle sider og hj\u00f8rner, sammenligne former, forst\u00e5 symmetri og oppdage former i omgivelsene (vinduet er en firkant, klokkeskiltet er en sirkel). Formsammensetning og -dekomponering (to trekanter danner en firkant) introduserer romlig logikk. Skriving av formnavn trener leseferdigheter. Kunnskapsl\u00f8ftet (LK20) og Rammeplan for barnehagen legger stor vekt p\u00e5 rom og form.',
    developmentalMilestones: [
      { milestone: 'Formegenskaper (5\u20136-\u00e5ringer teller sider og hj\u00f8rner)', howWeAddress: 'Tell-sidene-oppgaver der barn identifiserer antall sider og hj\u00f8rner bygger analytisk formforst\u00e5else' },
      { milestone: 'Symmetriforst\u00e5else (gjenkjenning av symmetriske former)', howWeAddress: 'Fullf\u00f8r-halvparten-oppgaver der barn tegner den symmetriske halvdelen av en form trener romlig tenkning' },
      { milestone: 'Formsammensetning og -dekomponering', howWeAddress: 'Lag-nye-former-oppgaver der barn setter sammen trekanter til firkanter introduserer romlig logikk' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 tre grunnformer (sirkel, firkant, trekant) og bruk formklosser som konkret supplement. For avanserte barn, introduser sekskant, femkant og tredimensjonale former (kube, sylinder), la dem oppdage former i arkitektur og utfordre med tangram-lignende puslespill.',
    parentTakeaway: 'Former er overalt. G\u00e5 p\u00e5 formjakt hjemme og ute: \u00abhvilken form har vinduet? Hva med tallerkenen?\u00bb Tell sider p\u00e5 skilter og bygninger. Bygg med formklosser og la barnet navngi formene. Klipp ut former i papir og lag bilder. Oppgavearkene gir den systematiske treningen som bygger geometrisk trygghet.',
    classroomIntegration: 'Formtemaet integreres i barnehageklassens daglige matematikkarbeid: i samlingen presenteres ukens form med konkrete eksempler, ved l\u00e6ringsstasjoner arbeides det med telle-, tegne- og sammensetningsoppgaver, i byggekroken bygges med formklosser, og p\u00e5 turer jaktes det p\u00e5 former i omgivelsene. Kunnskapsl\u00f8ftets m\u00e5l for rom og form danner grunnlaget for stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Formgjenkjenning og egenskaper', emerging: 'gjenkjenner sirkel, firkant og trekant med st\u00f8tte', proficient: 'navngir selvstendig 5+ former og teller sider og hj\u00f8rner korrekt', advanced: 'beskriver formegenskaper med presist spr\u00e5k og oppdager former i nye kontekster' },
      { skill: 'Symmetri', emerging: 'identifiserer om en form er symmetrisk med st\u00f8tte', proficient: 'fullf\u00f8rer selvstendig symmetriske halvdeler av former', advanced: 'finner symmetriakser og forklarer symmetribegrepet med egne ord' },
      { skill: 'Formsammensetning', emerging: 'setter sammen 2 former med veiledning', proficient: 'setter selvstendig sammen former til nye former (2 trekanter = 1 firkant)', advanced: 'l\u00f8ser tangram-oppgaver og forklarer sammensetningslogikken' },
    ],
  },

  space: {
    snippetAnswer: 'Verdensrom-oppgaver for barnehageklassen (5\u20136 \u00e5r) trener telling av planeter og stjerner, rekkef\u00f8lge og st\u00f8rrelsessammenligning i solsystemet. Barna utforsker universet gjennom engasjerende oppgaver. Gratis utskrivbare PDF-oppgaver p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'Verdensromtemaet fascinerer barnehageklassen fordi fem- og seks\u00e5ringer for f\u00f8rste gang kan tenke utenfor det de ser \u2014 de forst\u00e5r at m\u00e5nen er et sted og at stjernene er fjerne soler. Mens f\u00f8rskolebarn tegnet stjerner og m\u00e5ne, kan barn i barnehageklassen l\u00e6re planetnavnene i rekkef\u00f8lge, sammenligne planetst\u00f8rrelser (Jupiter er st\u00f8rst, Merkur er minst), telle kratere p\u00e5 m\u00e5nen og forst\u00e5 enkel solsystemstruktur. Telling av planeter og stjerner gir kosmisk matematikk. Sekvensering av romferder (oppskytning \u2192 rommet \u2192 landing) bygger narrativ tenkning. Skriving av planetord trener leseferdigheter. Rammeplanens m\u00e5l for utforskning, undring og teknologi st\u00f8ttes n\u00e5r barn utforsker universet.',
    developmentalMilestones: [
      { milestone: 'Rekkef\u00f8lge og sekvensforst\u00e5else (planetenes rekkef\u00f8lge fra solen)', howWeAddress: 'Planetrekkef\u00f8lge-oppgaver der barn ordner planeter fra n\u00e6rmest til fjernest bygger sekvenstenkning' },
      { milestone: 'St\u00f8rrelsessammenligning (sm\u00e5-mellom-stor)', howWeAddress: 'Planetsammenligningsark der barn ordner planeter etter st\u00f8rrelse trener mengde- og st\u00f8rrelsesforst\u00e5else' },
      { milestone: 'Naturfaglig vokabular og undring', howWeAddress: 'Ordsporing og ords\u00f8k med romord (planet, stjerne, rakett, m\u00e5ne) gir begynnende skrivetrening i fascinerende kontekst' },
    ],
    differentiationNotes: 'For barn som trenger st\u00f8tte, fokuser p\u00e5 jord, m\u00e5ne og sol, hold tellingen innenfor 10 og bruk store visuelle bilder. For avanserte barn, introduser alle \u00e5tte planeter i rekkef\u00f8lge, romfartøyets deler og selvstendig skriving av romfartsfakta.',
    parentTakeaway: 'Se p\u00e5 nattehimmelen sammen: finn m\u00e5nen, tell stjerner og snakk om planetene. Besøk et planetarium eller se romfartsvideoer. Lag et solsystem med frukter i ulike st\u00f8rrelser (vannmelon = Jupiter, bæll\u00f8k = Merkur). La barnet tegne en romferd og skrive hva de ser. Oppgavearkene gir struktur til denne kosmiske utforskningen.',
    classroomIntegration: 'Verdensromtemaet passer som temauke eller m\u00e5nedstema: i samlingen presenteres planeter og romfart, ved l\u00e6ringsstasjoner arbeides det med sekvenserings-, telle- og ords\u00f8kark, i kunstkroken males rombilder, og i byggekroken bygges romfartøyer. Rammeplanens m\u00e5l for undring, utforskning og teknologi integreres i stasjonsarbeidet.',
    assessmentRubric: [
      { skill: 'Planetrekkef\u00f8lge', emerging: 'navngir 1\u20132 planeter med st\u00f8tte', proficient: 'ordner selvstendig 4\u20135 planeter i riktig rekkef\u00f8lge fra solen', advanced: 'navngir alle 8 planeter i rekkef\u00f8lge og kjenner enkle fakta om dem' },
      { skill: 'St\u00f8rrelsessammenligning (planeter)', emerging: 'skiller mellom stor og liten med st\u00f8tte', proficient: 'ordner selvstendig 3\u20134 planeter etter st\u00f8rrelse', advanced: 'sammenligner og rangerer alle planeter og bruker sammenligningsord korrekt' },
      { skill: 'Romordforr\u00e5d og skriving', emerging: 'gjenkjenner 2\u20133 romord med bildest\u00f8tte', proficient: 'leser og skriver selvstendig 5\u20136 romord', advanced: 'skriver korte setninger om rommet og bruker naturfaglige begreper' },
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
