#!/usr/bin/env node
/**
 * SEO Part 293: SV First-Grade Enrichment — Themes 20-38
 *
 * Adds 10 enrichment fields (seoTitle, seoDescription, seoKeywords,
 * snippetAnswer, uniqueGradeAngle, developmentalMilestones,
 * differentiationNotes, parentTakeaway, classroomIntegration, assessmentRubric)
 * to the first-grade grade block of 19 SV theme files (fruits through space).
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const enrichments = {
  fruits: {
    seoTitle: 'Gratis Frukt\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara frukt\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, n\u00e4ringsl\u00e4ra och datainsamling med frukttema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'frukt\u00f6vningar \u00e5rskurs 1, frukt arbetsblad 6\u20137 \u00e5r, ordproblem frukt, addition subtraktion 20, n\u00e4ringsl\u00e4ra, datainsamling, Lgr22, stapeldiagram, fruktsallad matematik, vitaminer',
    snippetAnswer: 'Frukt\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med fruktscenarier, datainsamling i diagram och l\u00e4sf\u00f6rst\u00e5else om n\u00e4ring och frukters ursprung. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 utvecklas frukttemat fr\u00e5n enkel r\u00e4kning till riktig probleml\u00f6sning och datahantering. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (bonden plockade 15 jordgubbar och s\u00e5lde 8), samlar in data om fruktsorter och redovisar i stapeldiagram, och l\u00e4ser korta faktatexter om hur frukter v\u00e4xer och varf\u00f6r de \u00e4r h\u00e4lsosamma. M\u00f6nsterigenk\u00e4nning med fruktsekvenser bygger algebraiskt t\u00e4nkande. Skrivuppgifter d\u00e4r eleven beskriver sin favoritfrukt med alla fem sinnen ger meningsfull textproduktion. Lgr22 betonar vardagsmatematik, dataredovisning och naturvetenskapligt ordforr\u00e5d, och frukttemat uppfyller alla tre m\u00e5len i en kontext som eleverna k\u00e4nner igen fr\u00e5n sin vardag.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med addition och subtraktion inom 20 med tiotals\u00f6verg\u00e5ng', howWeAddress: 'Fruktsk\u00f6rdsscenarier d\u00e4r eleven m\u00e5ste v\u00e4lja r\u00e4knes\u00e4tt och korsa tiotalet tr\u00e4nar systematiskt probleml\u00f6sning' },
      { milestone: 'Datainsamling och redovisning i stapeldiagram', howWeAddress: 'Eleven r\u00e4knar frukter p\u00e5 en bild, f\u00f6r streckr\u00e4kning och skapar stapeldiagram med tolkningsfr\u00e5gor' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else av korta faktatexter om n\u00e4ring', howWeAddress: 'Texter om frukters tillv\u00e4xt och n\u00e4ringsinneh\u00e5ll med f\u00f6rst\u00e5elsefr\u00e5gor som kr\u00e4ver \u00e5terber\u00e4ttande och slutledning' },
      { milestone: 'M\u00f6nsterigenk\u00e4nning med fruktsekvenser (AB, ABC, ABB)', howWeAddress: 'Alternerande fruktm\u00f6nster d\u00e4r eleven identifierar regeln och forts\u00e4tter sekvensen tr\u00e4nar algebraiskt t\u00e4nkande' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom talomr\u00e5det 10 utan tiotals\u00f6verg\u00e5ng, ge f\u00e4rdiga stapeldiagrammallar och l\u00e4s texter h\u00f6gt. F\u00f6r avancerade elever ut\u00f6ka till flerstegsordproblem, l\u00e5t eleven designa egna unders\u00f6kningar och skriva j\u00e4mf\u00f6rande texter om tv\u00e5 frukter.',
    parentTakeaway: 'G\u00f6r matbutiken till ett klassrum! L\u00e5t barnet r\u00e4kna frukter i korgen, l\u00f6sa ordproblem som \u201dom vi k\u00f6per 12 \u00e4pplen och \u00e4ter 5, hur m\u00e5nga har vi kvar?\u201d och j\u00e4mf\u00f6ra priser. G\u00f6r fruktsallad och l\u00e5t barnet r\u00e4kna bitarna. Prata om vitaminer och varf\u00f6r r\u00e5dande frukter har olika f\u00e4rger. Arbetsbladen kopplar direkt till dessa vardagssituationer.',
    classroomIntegration: 'Frukttemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och data redovisas med fruktbilder, i svenska l\u00e4ses och skrivs faktatexter om n\u00e4ring, i NO diskuteras frukters tillv\u00e4xt och tallriksmodellen, i bild m\u00e5las fruktst\u00e4lleben. Veckans frukt presenteras med smakning, r\u00e4kning och faktauppgifter.',
    assessmentRubric: [
      { skill: 'Ordproblem med fruktscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med tiotals\u00f6verg\u00e5ng', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna ordproblem med frukttema' },
      { skill: 'Datainsamling och diagramredovisning', emerging: 'r\u00e4knar frukter och f\u00f6r streckr\u00e4kning med st\u00f6d', proficient: 'samlar sj\u00e4lvst\u00e4ndigt in data och redovisar i stapeldiagram', advanced: 'tolkar diagram, j\u00e4mf\u00f6r data och drar slutsatser om fruktf\u00f6rekomst' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om n\u00e4ring', emerging: '\u00e5terger ett faktum fr\u00e5n en kort text med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor om en faktatext om frukt', advanced: 'j\u00e4mf\u00f6r information fr\u00e5n tv\u00e5 texter och drar egna slutsatser' },
    ],
  },

  furniture: {
    seoTitle: 'Gratis M\u00f6bel\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara m\u00f6bel\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). M\u00e4tning, geometri och ordproblem med m\u00f6beltema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'm\u00f6bel\u00f6vningar \u00e5rskurs 1, m\u00f6bler arbetsblad 6\u20137 \u00e5r, m\u00e4tning cm, geometriska former, ordproblem m\u00f6bler, Lgr22, rumsplanering, l\u00e4sf\u00f6rst\u00e5else, sortering, prepositioner',
    snippetAnswer: 'M\u00f6bel\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar m\u00e4tning i centimeter, geometriska former och ordproblem med m\u00f6belscenarier. Prepositioner och rumsbeskrivningar st\u00e4rker svenskan. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas m\u00f6beltemat till m\u00e4tning, geometri och spr\u00e5kutveckling. Sex- och sju\u00e5ringar m\u00e4ter m\u00f6bler i centimeter med linjal, identifierar geometriska former i m\u00f6beldesigner (rektangulra bord, runda stolar, kvadratiska hyllor) och l\u00f6ser ordproblem: i klassrummet finns 14 stolar och 6 \u00e4r upptagna, hur m\u00e5nga \u00e4r lediga? Prepositions\u00f6vningar (p\u00e5, under, bredvid, framf\u00f6r) med m\u00f6belscenarier bygger rumslig vokabul\u00e4r. Eleven planerar och ritar ett rum med m\u00f6bler i enkel skala. Lgr22 betonar m\u00e4tning med standardenheter, geometriska former och prepositionsanv\u00e4ndning, och m\u00f6beltemat knyter ihop alla m\u00e5len med elevens v\u00e4lk\u00e4nda vardagsmilj\u00f6.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av l\u00e4ngd och bredd med linjal (cm)', howWeAddress: 'Eleven m\u00e4ter bord, stolar och hyllor i klassrummet och f\u00f6r in resultat i en tabell f\u00f6r j\u00e4mf\u00f6relse' },
      { milestone: 'Identifiera geometriska former i vardagen', howWeAddress: 'M\u00f6belbilder d\u00e4r eleven markerar rektanglar, cirklar och trianglar tr\u00e4nar formigenk\u00e4nning i verklig kontext' },
      { milestone: 'Prepositionsanv\u00e4ndning (p\u00e5, under, bredvid, framf\u00f6r)', howWeAddress: 'Bildbaserade \u00f6vningar d\u00e4r eleven beskriver var f\u00f6rem\u00e5l befinner sig i f\u00f6rh\u00e5llande till m\u00f6bler' },
      { milestone: 'Ordproblem inom 20 med m\u00f6belscenarier', howWeAddress: 'Realistiska klassrums- och hemscenarier (stolar, b\u00f6cker p\u00e5 hylla) tr\u00e4nar tiotals\u00f6verg\u00e5ng i meningsfull kontext' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa m\u00e4tning till hela centimeter med markerade linjer, ge bildst\u00f6d vid prepositioner och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever introducera m\u00e4tning i b\u00e5de cm och m, l\u00e5t eleven rita en rumsplanering med m\u00e5ttsatta m\u00f6bler och skriva beskrivande texter om sitt dr\u00f6mrum.',
    parentTakeaway: 'Hemmet \u00e4r fullt av m\u00e4t\u00f6vningar! L\u00e5t barnet m\u00e4ta bord, stolar och bokhyllor med en linjal. Lek prepositionsleken: \u201dvar \u00e4r katten \u2014 under bordet eller p\u00e5 stolen?\u201d. R\u00e4kna stolar runt middagsbordet och st\u00e4ll ordproblem. L\u00e5t barnet rita sitt rum med m\u00f6blerna p\u00e5 r\u00e4tt plats. Varje m\u00f6bel blir ett matematiskt objekt.',
    classroomIntegration: 'M\u00f6beltemat i \u00e5rskurs 1 integreras med Lgr22: i matematik m\u00e4ts klassrumsm\u00f6bler och former identifieras, i svenska \u00f6vas prepositioner och rumsbeskrivningar, i sl\u00f6jd diskuteras material och funktion, i bild ritas rumsplaneringar. Klassrummets egna m\u00f6bler anv\u00e4nds som konkret material.',
    assessmentRubric: [
      { skill: 'M\u00e4tning av m\u00f6bler', emerging: 'm\u00e4ter med linjal med st\u00f6d och avl\u00e4ser ungef\u00e4rligt', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i cm och j\u00e4mf\u00f6r m\u00e5tt i tabell', advanced: 'uppskattar l\u00e4ngder f\u00f6re m\u00e4tning och omvandlar cm till m' },
      { skill: 'Geometriska former i m\u00f6bler', emerging: 'identifierar tv\u00e5 grundformer med st\u00f6d', proficient: 'namnger och markerar sj\u00e4lvst\u00e4ndigt fyra former i m\u00f6belbilder', advanced: 'beskriver formers egenskaper (sidor, h\u00f6rn) och kopplar till m\u00f6beldesign' },
      { skill: 'Prepositioner med m\u00f6belscenarier', emerging: 'anv\u00e4nder p\u00e5 och under med st\u00f6d', proficient: 'anv\u00e4nder sj\u00e4lvst\u00e4ndigt fyra prepositioner korrekt i skrivna meningar', advanced: 'skriver rumsbeskrivningar med varierade prepositioner och detaljer' },
    ],
  },

  garden: {
    seoTitle: 'Gratis Tr\u00e4dg\u00e5rds\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). M\u00e4tning, datainsamling och v\u00e4xtkunskap med tr\u00e4dg\u00e5rdstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'tr\u00e4dg\u00e5rds\u00f6vningar \u00e5rskurs 1, tr\u00e4dg\u00e5rd arbetsblad 6\u20137 \u00e5r, m\u00e4tning cm, v\u00e4xter, fr\u00f6 till planta, datainsamling, Lgr22 NO, ordproblem, odling, \u00e5rstider tr\u00e4dg\u00e5rd',
    snippetAnswer: 'Tr\u00e4dg\u00e5rds\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar m\u00e4tning av plantor i cm, datainsamling om tillv\u00e4xt och l\u00e4sf\u00f6rst\u00e5else om fr\u00f6ets resa fr\u00e5n s\u00e5dd till sk\u00f6rd. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 f\u00f6rvandlas tr\u00e4dg\u00e5rdstemat till vetenskap och matematik i samspel. Sex- och sju\u00e5ringar m\u00e4ter plantor i centimeter och f\u00f6r tillv\u00e4xtdagbok, l\u00f6ser ordproblem om fr\u00f6n och sk\u00f6rdar (vi s\u00e5dde 18 fr\u00f6n och 11 grodde, hur m\u00e5nga grodde inte?) och l\u00e4ser faktatexter om v\u00e4xters livscykel. Datainsamling \u00f6vas genom att dokumentera v\u00e4dret och plantors tillv\u00e4xt \u00f6ver tid i tabeller och diagram. Sekvenserings\u00f6vningar d\u00e4r eleven ordnar fr\u00f6\u2013grodd\u2013planta\u2013blomma\u2013frukt tr\u00e4nar logiskt t\u00e4nkande. Lgr22 betonar naturvetenskapligt unders\u00f6kande, m\u00e4tning och dataredovisning, och skoltr\u00e4dg\u00e5rden ger den mest autentiska kontexten f\u00f6r alla tre.',
    developmentalMilestones: [
      { milestone: 'M\u00e4tning av plantor i cm och tillv\u00e4xtdokumentation', howWeAddress: 'Eleven m\u00e4ter plantor med linjal, f\u00f6r in data i tillv\u00e4xttabell och j\u00e4mf\u00f6r m\u00e5tt \u00f6ver veckor' },
      { milestone: 'Naturvetenskaplig sekvensering (fr\u00f6 till frukt)', howWeAddress: 'Ordningsuppgifter d\u00e4r eleven sorterar bildkort av v\u00e4xters livscykel i r\u00e4tt f\u00f6ljd' },
      { milestone: 'Ordproblem inom 20 med tr\u00e4dg\u00e5rdsscenarier', howWeAddress: 'Realistiska problem om fr\u00f6n, plantor och sk\u00f6rdar tr\u00e4nar tiotals\u00f6verg\u00e5ng i motiverande kontext' },
      { milestone: 'Datainsamling och redovisning \u00f6ver tid', howWeAddress: 'Tillv\u00e4xtdagbok d\u00e4r eleven dokumenterar plantors h\u00f6jd veckovis och redovisar i linjediagram' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00e4rdiga m\u00e4tmallar med markerade centimeterintervall, begr\u00e4nsa sekvenser till tre steg och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever l\u00e4gg till omvandling cm/m, l\u00e5t eleven planera en s\u00e5ddkalender och skriva en fullst\u00e4ndig rapport om sitt odlingsexperiment.',
    parentTakeaway: 'S\u00e5 ett fr\u00f6 i en kruka p\u00e5 f\u00f6nsterbrdan och g\u00f6r det till ett lrande! L\u00e5t barnet m\u00e4ta plantan varje vecka, rita ett diagram \u00f6ver tillv\u00e4xten och l\u00f6sa ordproblem: \u201dom 12 fr\u00f6n grodde och 4 inte, hur m\u00e5nga s\u00e5dde vi?\u201d. Bes\u00f6k ett v\u00e4xthus eller en bondg\u00e5rd f\u00f6r att se livscykeln i verkligheten. Tr\u00e4dg\u00e5rdsarbete \u00e4r vetenskap, matematik och t\u00e5lamod i ett.',
    classroomIntegration: 'Tr\u00e4dg\u00e5rdstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik m\u00e4ts plantor och data redovisas, i NO studeras v\u00e4xters livscykel och behov, i svenska skrivs tillv\u00e4xtdagb\u00f6cker och l\u00e4ses faktatexter, i bild m\u00e5las v\u00e4xter. Skoltr\u00e4dg\u00e5rden eller f\u00f6nsterbrdsodlingar ger verklig data f\u00f6r arbetsbladen.',
    assessmentRubric: [
      { skill: 'M\u00e4tning och tillv\u00e4xtdokumentation', emerging: 'm\u00e4ter med st\u00f6d och f\u00f6r in ett m\u00e5tt', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i cm och dokumenterar tillv\u00e4xt \u00f6ver tid', advanced: 'tolkar tillv\u00e4xtdata, ber\u00e4knar skillnader och f\u00f6rklarar trender' },
      { skill: 'V\u00e4xters livscykel', emerging: 'ordnar tre steg med bildst\u00f6d', proficient: 'sekvenserar sj\u00e4lvst\u00e4ndigt fem steg och namnger varje fas', advanced: 'f\u00f6rklarar varje fas funktion och kopplar till v\u00e4xtens behov' },
      { skill: 'Ordproblem med tr\u00e4dg\u00e5rdstema', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med tr\u00e4dg\u00e5rdsscenarier', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna fr\u00f6- och sk\u00f6rdproblem' },
    ],
  },

  halloween: {
    seoTitle: 'Gratis Halloween\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara halloween\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, m\u00f6nster och skrivuppgifter med halloweentema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'halloween\u00f6vningar \u00e5rskurs 1, halloween arbetsblad 6\u20137 \u00e5r, ordproblem halloween, m\u00f6nster sekvenser, godisr\u00e4kning, Lgr22, skrivuppgift, sp\u00f6khistoria, delning, symmetri',
    snippetAnswer: 'Halloween\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med godisr\u00e4kning, m\u00f6nsterigenk\u00e4nning med halloweenmotiv och kreativ skrivning av sp\u00f6khistorier. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kombinerar halloweentemat r\u00e4kning, probleml\u00f6sning och kreativ skrivning i en kontext som eleverna \u00e4lskar. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (du fick 17 godisbitar och gav bort 9), delar godis r\u00e4ttvist i grupper och skapar m\u00f6nster med halloweenmotiv. Symmetri\u00f6vningar med pumpor och sp\u00f6ken tr\u00e4nar rumsligt t\u00e4nkande. Skrivuppgifter d\u00e4r eleven f\u00f6rfattar en sp\u00f6khistoria med inledning, handling och avslutning ger strukturerad textproduktion. Lgr22 betonar m\u00f6nster, delning och skriftlig ber\u00e4ttelse, och halloweentemat levererar alla m\u00e5len med h\u00f6g elevmotivation tack vare det f\u00e4ngslande temat.',
    developmentalMilestones: [
      { milestone: 'Ordproblem med addition och subtraktion inom 20', howWeAddress: 'Godisscenarier (samla, dela, ge bort) tr\u00e4nar tiotals\u00f6verg\u00e5ng i motiverande halloweenkontext' },
      { milestone: 'R\u00e4ttvis delning (tidig division)', howWeAddress: 'Godisf\u00f6rdelning d\u00e4r eleven delar lika mellan grupper bygger konkret divisionsf\u00f6rst\u00e5else' },
      { milestone: 'M\u00f6nsterigenk\u00e4nning med halloweenmotiv', howWeAddress: 'Sekvenser med pumpor, sp\u00f6ken och fladderm\u00f6ss d\u00e4r eleven identifierar regeln och forts\u00e4tter' },
      { milestone: 'Kreativ ber\u00e4ttelseskrivning (sp\u00f6khistoria)', howWeAddress: 'Eleven skriver en kort sp\u00f6khistoria med inledning, h\u00e4ndelse och avslutning, tr\u00e4nar ber\u00e4ttandestruktur' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom 10, ge bildst\u00f6d vid delning och erbjud startmeningar f\u00f6r sp\u00f6khistorien. F\u00f6r avancerade elever introducera flerstegsordproblem med tre operationer, delning med rest och l\u00e5t eleven skriva en l\u00e4ngre sp\u00f6khistoria med dialog.',
    parentTakeaway: 'Halloween \u00e4r perfekt f\u00f6r matematik hemma! L\u00e5t barnet sortera och r\u00e4kna sina godisbitar, dela lika med syskon och l\u00f6sa problem: \u201dom du fick 16 godisbitar och ger 7 till kompisen, hur m\u00e5nga har du kvar?\u201d. Skriv en sp\u00f6khistoria tillsammans f\u00f6re l\u00e4ggdags. Skapa m\u00f6nster med halloweenmotiv p\u00e5 papper. Varje halloweentradition \u00e4r en l\u00e4randem\u00f6jlighet.',
    classroomIntegration: 'Halloweentemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och delning \u00f6vas med godis, i svenska skrivs sp\u00f6khistorier och l\u00e4ses halloweentexter, i bild skapas symmetriska pumpor, i musik \u00f6vas rytmm\u00f6nster med l\u00e4skiga ljud. En halloweenvecka ger tematisk kontext f\u00f6r alla \u00e4mnen.',
    assessmentRubric: [
      { skill: 'Ordproblem med godisscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med halloweentema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna godisr\u00e4kningsproblem' },
      { skill: 'M\u00f6nster med halloweenmotiv', emerging: 'forts\u00e4tter AB-m\u00f6nster med st\u00f6d', proficient: 'identifierar och forts\u00e4tter ABC-m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'skapar egna m\u00f6nster med fyra element och f\u00f6rklarar regeln' },
      { skill: 'Ber\u00e4ttelseskrivning (sp\u00f6khistoria)', emerging: 'skriver tv\u00e5\u2013tre meningar med startmeningsst\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en sp\u00f6khistoria med inledning, handling och avslutning', advanced: 'skriver en l\u00e4ngre ber\u00e4ttelse med dialog och detaljerade beskrivningar' },
    ],
  },

  holidays: {
    seoTitle: 'Gratis Helgdags\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara helgdags\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Klockan, ordproblem och traditioner med helgdagstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'helgdags\u00f6vningar \u00e5rskurs 1, helgdagar arbetsblad 6\u20137 \u00e5r, julmatematik, p\u00e5sk\u00f6vningar, klockan, ordproblem, Lgr22, traditioner, kalender, skrivuppgift',
    snippetAnswer: 'Helgdags\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar klockan, ordproblem inom 20 och l\u00e4sf\u00f6rst\u00e5else om svenska traditioner som jul, p\u00e5sk och midsommar. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas helgdagstemat till tidsbegrepp, traditionsf\u00f6rst\u00e5else och strukturerad skrivning. Sex- och sju\u00e5ringar l\u00e4ser klockan f\u00f6r att planera helgdagsaktiviteter (julmiddagen b\u00f6rjar kl. 15:00), l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (vi hade 18 julklappar och \u00f6ppnade 11) och l\u00e4ser faktatexter om svenska traditioner. Kalendern anv\u00e4nds f\u00f6r att r\u00e4kna dagar till n\u00e4sta helgdag. Skrivuppgifter som julkort, p\u00e5skhalsning och midsommarber\u00e4ttelse ger autentisk textproduktion. Lgr22 betonar tidsbegrepp, kulturell medvetenhet och skriftlig produktion, och helgdagstemat f\u00f6renar alla m\u00e5len naturligt.',
    developmentalMilestones: [
      { milestone: 'Tidsl\u00e4sning (hel och halv timme) kopplad till helgdagsschema', howWeAddress: 'Eleven l\u00e4ser klockan f\u00f6r att planera julaftonens aktiviteter och r\u00e4knar tid mellan h\u00e4ndelser' },
      { milestone: 'Ordproblem inom 20 med helgdagsscenarier', howWeAddress: 'Julklappar, p\u00e5sk\u00e4gg och luciadagar ger konkreta r\u00e4knescenarier med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Kalenderanv\u00e4ndning (r\u00e4kna dagar, veckor, m\u00e5nader)', howWeAddress: 'Eleven r\u00e4knar dagar till n\u00e4sta helgdag och markerar datum i kalender' },
      { milestone: 'Kulturell kunskap om svenska traditioner', howWeAddress: 'Faktatexter om jul, p\u00e5sk, midsommar och lucia med f\u00f6rst\u00e5elsefr\u00e5gor bygger kulturell medvetenhet' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd enbart hela timmar vid tidsl\u00e4sning, h\u00e5ll ordproblem inom 10 och ge bildst\u00f6d vid kalendern. F\u00f6r avancerade elever introducera kvart i och kvart \u00f6ver, l\u00e5t eleven ber\u00e4kna tidsintervall och skriva j\u00e4mf\u00f6rande texter om traditioner i olika l\u00e4nder.',
    parentTakeaway: 'Varje helgdag \u00e4r en l\u00e4randem\u00f6jlighet! L\u00e5t barnet l\u00e4sa klockan f\u00f6r juladagens aktiviteter, r\u00e4kna dagar i adventskalendern och l\u00f6sa ordproblem: \u201dom vi bj\u00f6d 13 g\u00e4ster och 5 inte kunde komma, hur m\u00e5nga tallrikar beh\u00f6ver vi?\u201d. Skriv julkort och p\u00e5skhalsningar tillsammans. Prata om varf\u00f6r vi firar och vad traditionerna betyder.',
    classroomIntegration: 'Helgdagstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas klockan, kalender och ordproblem, i svenska skrivs gratulationskort och l\u00e4ses traditionsberttelser, i SO diskuteras kulturella traditioner, i bild skapas s\u00e4songskonst. Adventskalender i klassrummet kopplar daglig matematik till h\u00f6gtiderna.',
    assessmentRubric: [
      { skill: 'Tidsl\u00e4sning med helgdagsschema', emerging: 'l\u00e4ser hel timme p\u00e5 analog klocka med st\u00f6d', proficient: 'l\u00e4ser hel och halv timme och kopplar till dagsh\u00e4ndelser', advanced: 'l\u00e4ser kvart i och kvart \u00f6ver och ber\u00e4knar tidsintervall' },
      { skill: 'Ordproblem med helgdagstema', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med helgdagsscenarier', advanced: 'l\u00f6ser flerstegsproblem och skriver egna ordproblem' },
      { skill: 'Kulturell f\u00f6rst\u00e5else av traditioner', emerging: 'namnger tv\u00e5 svenska helgdagar med st\u00f6d', proficient: 'beskriver sj\u00e4lvst\u00e4ndigt fyra traditioner och deras inneb\u00f6rd', advanced: 'j\u00e4mf\u00f6r traditioner mellan l\u00e4nder och f\u00f6rklarar likheter' },
    ],
  },

  household: {
    seoTitle: 'Gratis Hush\u00e5lls\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara hush\u00e5lls\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Sortering, m\u00e4tning och ordproblem med hush\u00e5llstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'hush\u00e5lls\u00f6vningar \u00e5rskurs 1, hush\u00e5ll arbetsblad 6\u20137 \u00e5r, sortering kategorisering, m\u00e4tning, ordproblem, Lgr22, k\u00f6ksmatematik, pengar, s\u00e4kerhet hemma, vardagsf\u00e4rdigheter',
    snippetAnswer: 'Hush\u00e5lls\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar sortering, m\u00e4tning och ordproblem med vardagsf\u00f6rem\u00e5l hemifr\u00e5n. K\u00f6ksmatematik och s\u00e4kerhet ger meningsfull kontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas hush\u00e5llstemat till vardagsmatematik och sj\u00e4lvst\u00e4ndighet. Sex- och sju\u00e5ringar sorterar hush\u00e5llsf\u00f6rem\u00e5l efter flera kriterier (rum, funktion, material), m\u00e4ter k\u00f6ksredskap i centimeter och l\u00f6ser ordproblem: vi hade 16 tallrikar och 9 gick s\u00f6nder, hur m\u00e5nga har vi kvar? Enkel pengamatematik introduceras genom inhandlingslistor d\u00e4r eleven ber\u00e4knar totalpris. L\u00e4spassager om s\u00e4kerhet hemma bygger b\u00e5de l\u00e4sf\u00e4rdighet och praktisk kunskap. Lgr22 betonar vardagsmatematik, sortering och s\u00e4kerhet, och hush\u00e5llstemat \u00e4r den mest direkta kopplingen till elevens egen vardagsmilj\u00f6.',
    developmentalMilestones: [
      { milestone: 'Sortering efter flera kriterier (rum, funktion, material)', howWeAddress: 'Hush\u00e5llsf\u00f6rem\u00e5l som eleven sorterar efter tv\u00e5\u2013tre egenskaper och motiverar sina val' },
      { milestone: 'M\u00e4tning av f\u00f6rem\u00e5l i centimeter', howWeAddress: 'Eleven m\u00e4ter k\u00f6ksredskap, bestick och f\u00f6rem\u00e5l hemma och j\u00e4mf\u00f6r resultat i tabell' },
      { milestone: 'Enkel pengamatematik (inhandlingslista)', howWeAddress: 'Inhandlingsscenarier d\u00e4r eleven ber\u00e4knar totalpris f\u00f6r tv\u00e5\u2013tre varor inom talomr\u00e5det 20' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om s\u00e4kerhet och vardagsfrdigheter', howWeAddress: 'Korta texter om hems\u00e4kerhet och hush\u00e5llsrutiner med f\u00f6rst\u00e5elsefr\u00e5gor' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa sortering till en egenskap, ge m\u00e4tmallar och anv\u00e4nd pengar utan \u00f6ren. F\u00f6r avancerade elever introducera sortering med tre kriterier, pengarker med v\u00e4xel och l\u00e5t eleven skriva en instruktionstext om en hush\u00e5llssyssla.',
    parentTakeaway: 'Hemmet \u00e4r det b\u00e4sta klassrummet! L\u00e5t barnet hj\u00e4lpa till att sortera disk (tallrikar, glas, bestick), m\u00e4ta ingredienser vid matlagning och skriva inhandlingslistan. St\u00e4ll ordproblem: \u201dom vi beh\u00f6ver 12 \u00e4gg och har 5, hur m\u00e5nga m\u00e5ste vi k\u00f6pa?\u201d. R\u00e4kna pengar i sparb\u00f6ssan. Varje hush\u00e5llssyssla \u00e4r en matematiklektion f\u00f6rkl\u00e4dd till vardagsliv.',
    classroomIntegration: 'Hush\u00e5llstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas sortering, m\u00e4tning och pengar, i svenska skrivs instruktionstexter och l\u00e4ses om s\u00e4kerhet, i NO diskuteras material och \u00e5tervinning, i hemkunskap introduceras k\u00f6kshygien. Rollspel med affr f\u00f6rst\u00e4rker pengamatematiken.',
    assessmentRubric: [
      { skill: 'Sortering av hush\u00e5llsf\u00f6rem\u00e5l', emerging: 'sorterar efter en egenskap med st\u00f6d', proficient: 'sorterar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 kriterier och f\u00f6rklarar', advanced: 'skapar egna sorteringssystem med tre kriterier och motiverar' },
      { skill: 'M\u00e4tning och j\u00e4mf\u00f6relse', emerging: 'm\u00e4ter med st\u00f6d och avl\u00e4ser ungef\u00e4rligt', proficient: 'm\u00e4ter sj\u00e4lvst\u00e4ndigt i cm och j\u00e4mf\u00f6r i tabell', advanced: 'uppskattar l\u00e4ngder f\u00f6re m\u00e4tning och ber\u00e4knar skillnader' },
      { skill: 'Pengamatematik med inhandlingsscenarier', emerging: 'ber\u00e4knar summa av tv\u00e5 priser inom 10 kr', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt totalpris och v\u00e4xel inom 20 kr', advanced: 'l\u00f6ser flerstegsproblem med budget och j\u00e4mf\u00f6r alternativ' },
    ],
  },

  insects: {
    seoTitle: 'Gratis Insekts\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara insekts\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). R\u00e4kning inom 20, klassificering och livscykler med insekttema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'insekts\u00f6vningar \u00e5rskurs 1, insekter arbetsblad 6\u20137 \u00e5r, klassificering insekter, livscykel fj\u00e4ril, datainsamling, Lgr22 NO, ordproblem, symmetri vingar, metamorfos, spindeldjur',
    snippetAnswer: 'Insekts\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar klassificering, datainsamling och ordproblem inom 20 med insektscenarier. Livscykler och symmetri ger naturvetenskaplig kontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 f\u00f6rvandlas insekttemat till vetenskapligt unders\u00f6kande p\u00e5 riktigt. Sex- och sju\u00e5ringar klassificerar sm\u00e5kryp efter vetenskapliga kriterier (antal ben, vingar, antenner), dokumenterar insektsfynd i streckr\u00e4kningstabeller och l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng: vi hittade 14 nyckelpigor och 8 fl\u00f6g iv\u00e4g, hur m\u00e5nga \u00e4r kvar? Fj\u00e4rilens livscykel (\u00e4gg\u2013larv\u2013puppa\u2013fj\u00e4ril) tr\u00e4nar sekvensering och naturvetenskapligt ordf\u00f6rr\u00e5d. Symmetri\u00f6vningar med fj\u00e4rilsvingar kopplar matematik till biologi. Lgr22 betonar klassificering, naturvetenskapligt unders\u00f6kande och dataredovisning, och insekttemat uppfyller alla tre m\u00e5len genom autentisk utomhusobservation.',
    developmentalMilestones: [
      { milestone: 'Klassificering med vetenskapliga kriterier (ben, vingar, antenner)', howWeAddress: 'Sorteringstabeller d\u00e4r eleven grupperar sm\u00e5kryp efter tv\u00e5\u2013tre egenskaper och skiljer insekter fr\u00e5n spindeldjur' },
      { milestone: 'Livscykelsekvensering (fj\u00e4rilens metamorfos)', howWeAddress: 'Ordningsuppgifter d\u00e4r eleven sorterar bildkort av \u00e4gg\u2013larv\u2013puppa\u2013fj\u00e4ril och namnger varje stadium' },
      { milestone: 'Datainsamling av insektsfynd med streckr\u00e4kning', howWeAddress: 'Utomhusaktiviteter d\u00e4r eleven r\u00e4knar insekter och redovisar i tabeller och diagram' },
      { milestone: 'Ordproblem inom 20 med insektscenarier', howWeAddress: 'Realistiska problem om nyckelpigor, myror och bin tr\u00e4nar tiotals\u00f6verg\u00e5ng i naturkontext' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda insekter, anv\u00e4nd en klassificeringsegenskap och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever ut\u00f6ka till 12+ arter inklusive spindeldjur, l\u00e4gg till j\u00e4mf\u00f6relse av tv\u00e5 livscykler och l\u00e5t eleven skriva en insektsforskningsrapport.',
    parentTakeaway: 'G\u00e5 p\u00e5 insektsjakt i tr\u00e4dg\u00e5rden eller parken! L\u00e5t barnet r\u00e4kna insekter med streckr\u00e4kning, sortera fynd efter typ och l\u00f6sa ordproblem: \u201dom vi hittade 13 myror under stenen och 6 kl\u00e4ttrade iv\u00e4g, hur m\u00e5nga \u00e4r kvar?\u201d. Observera en fj\u00e4rilslarv och dokumentera f\u00f6rvandlingen. L\u00e4s b\u00f6cker om sm\u00e5kryp och diskutera vad som g\u00f6r en insekt till en insekt.',
    classroomIntegration: 'Insekttemat i \u00e5rskurs 1 integreras med Lgr22: i matematik r\u00e4knas och redovisas insektsdata, i NO klassificeras arter och livscykler studeras, i svenska l\u00e4ses faktatexter och skrivs insektsrapporter, i bild m\u00e5las symmetriska fj\u00e4rilar. Skolog\u00e5rdens insektsjakt ger verklig data f\u00f6r arbetsbladen.',
    assessmentRubric: [
      { skill: 'Klassificering av insekter', emerging: 'sorterar efter en egenskap med st\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 kriterier och skiljer insekter fr\u00e5n spindeldjur', advanced: 'anv\u00e4nder vetenskapliga termer och skapar egna klassificeringssystem' },
      { skill: 'Livscykelsekvensering', emerging: 'ordnar tre stadier med bildst\u00f6d', proficient: 'sekvenserar sj\u00e4lvst\u00e4ndigt fyra stadier och namnger dem', advanced: 'j\u00e4mf\u00f6r tv\u00e5 livscykler och f\u00f6rklarar skillnader' },
      { skill: 'Datainsamling med insektstema', emerging: 'r\u00e4knar med st\u00f6d och f\u00f6r streckr\u00e4kning', proficient: 'samlar sj\u00e4lvst\u00e4ndigt data och redovisar i diagram', advanced: 'tolkar data, j\u00e4mf\u00f6r bes\u00f6k och drar slutsatser' },
    ],
  },

  jobs: {
    seoTitle: 'Gratis Jobb\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara jobb\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem, rollspel och l\u00e4sf\u00f6rst\u00e5else om yrken. 33 generatorer. Gratis PDF.',
    seoKeywords: 'jobb\u00f6vningar \u00e5rskurs 1, yrken arbetsblad 6\u20137 \u00e5r, ordproblem yrken, rollspel, l\u00e4sf\u00f6rst\u00e5else jobb, Lgr22, samh\u00e4llskunskap, pengar, brandman polis, skrivuppgift',
    snippetAnswer: 'Jobb\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med yrkesscenarier, l\u00e4sf\u00f6rst\u00e5else om samh\u00e4llsyrken och enkel pengamatematik. Yrken kopplas till samh\u00e4llskunskap. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas jobbtemat till samh\u00e4llsf\u00f6rst\u00e5else och vardagsmatematik. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med yrkesscenarier (brandmannen r\u00e4ddade 14 personer och 9 var barn, hur m\u00e5nga var vuxna?), l\u00e4ser korta texter om vad olika yrkesm\u00e4nniskor g\u00f6r och anv\u00e4nder enkel pengamatematik i butiks- och caf\u00e9scenarier. Matchnings\u00f6vningar d\u00e4r eleven kopplar yrken till verktyg och arbetsplatser bygger samh\u00e4llskunskap. Skrivuppgifter d\u00e4r eleven beskriver sitt dr\u00f6myrke ger meningsfull textproduktion. Lgr22 betonar samh\u00e4llsorientering, vardagsmatematik och skriftlig produktion, och jobbtemat f\u00f6renar alla tre i en kontext som v\u00e4cker nyfikenhet p\u00e5 vuxenv\u00e4rlden.',
    developmentalMilestones: [
      { milestone: 'Ordproblem inom 20 med yrkesscenarier', howWeAddress: 'Realistiska problem fr\u00e5n brandstation, sjukhus och skola tr\u00e4nar tiotals\u00f6verg\u00e5ng i samh\u00e4llskontext' },
      { milestone: 'Matchning yrke\u2013verktyg\u2013arbetsplats', howWeAddress: 'Kopplingslinjer d\u00e4r eleven parar ihop yrken med r\u00e4tt utrustning och plats bygger ordforr\u00e5d och logik' },
      { milestone: 'Enkel pengamatematik i yrkeskontext', howWeAddress: 'Butiks- och caf\u00e9scenarier d\u00e4r eleven ber\u00e4knar pris, v\u00e4xel och totalsumma inom 20 kr' },
      { milestone: 'Skriftlig beskrivning av dr\u00f6myrke', howWeAddress: 'Eleven skriver om vad yrket inneb\u00e4r, vilka verktyg som beh\u00f6vs och varf\u00f6r hen vill ha det jobbet' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda yrken, h\u00e5ll ordproblem inom 10 och ge startmeningar f\u00f6r skrivuppgiften. F\u00f6r avancerade elever ut\u00f6ka till 15+ yrken, l\u00e4gg till flerstegsordproblem och l\u00e5t eleven intervjua en vuxen om sitt yrke och skriva en rapport.',
    parentTakeaway: 'Barnet m\u00f6ter yrken \u00f6verallt \u2014 anv\u00e4nd det! Fr\u00e5ga p\u00e5 matbutiken: \u201dvad g\u00f6r kassan? vad g\u00f6r bagaren?\u201d. L\u00f6s ordproblem: \u201dom postbuden delar ut 15 brev och 8 \u00e4r redan levererade, hur m\u00e5nga \u00e4r kvar?\u201d. L\u00e5t barnet skriva om sitt dr\u00f6myrke. Lek aff\u00e4r med prislappar och v\u00e4xelpengar. Varje vardagssituation visar ett yrke i aktion.',
    classroomIntegration: 'Jobbtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och pengar \u00f6vas, i svenska l\u00e4ses och skrivs om yrken, i SO diskuteras samh\u00e4llsfunktioner, i bild ritas yrkesm\u00e4nniskor med utrustning. Bes\u00f6k av yrkesm\u00e4nniskor i klassrummet kompletteras med tematiska arbetsblad.',
    assessmentRubric: [
      { skill: 'Ordproblem med yrkesscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med yrkestema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna yrkesrelaterade ordproblem' },
      { skill: 'Matchning yrke\u2013verktyg\u2013arbetsplats', emerging: 'matchar tre yrken med st\u00f6d', proficient: 'matchar sj\u00e4lvst\u00e4ndigt \u00e5tta yrken med verktyg och plats', advanced: 'beskriver skriftligt flera yrken och deras funktioner i samh\u00e4llet' },
      { skill: 'Pengamatematik i yrkeskontext', emerging: 'ber\u00e4knar summa av tv\u00e5 priser inom 10 kr', proficient: 'ber\u00e4knar sj\u00e4lvst\u00e4ndigt totalpris och v\u00e4xel inom 20 kr', advanced: 'l\u00f6ser flerstegsproblem med budget och priskalkyl' },
    ],
  },

  music: {
    seoTitle: 'Gratis Musik\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara musik\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Rytmm\u00f6nster, r\u00e4kning och ordproblem med musiktema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'musik\u00f6vningar \u00e5rskurs 1, musik arbetsblad 6\u20137 \u00e5r, rytmm\u00f6nster, notv\u00e4rden, ordproblem musik, Lgr22, instrument, s\u00e5ngtexter, sekvenser, datainsamling',
    snippetAnswer: 'Musik\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar rytmm\u00f6nster, m\u00f6nsterigenk\u00e4nning och ordproblem inom 20 med musiktema. Instrument och notv\u00e4rden ger kreativ kontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas musiktemat till matematiska m\u00f6nster och strukturerat t\u00e4nkande. Sex- och sju\u00e5ringar identifierar rytmm\u00f6nster (kort-kort-l\u00e5ng, kort-kort-l\u00e5ng) som mathematiska sekvenser, l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (orkestern hade 16 musiker och 7 spelade violin, hur m\u00e5nga spelade andra instrument?) och sorterar instrument efter egenskaper. Datainsamling \u00f6vas genom att r\u00e4kna instrument i en bild och redovisa i diagram. Skrivuppgifter d\u00e4r eleven skriver en s\u00e5ngtext eller beskriver sitt favoritinstrument ger kreativ textproduktion. Lgr22 betonar m\u00f6nster, estetisk uttryck och dataredovisning, och musiktemat f\u00f6renar alla tre i en lustfylld kontext.',
    developmentalMilestones: [
      { milestone: 'Rytmm\u00f6nster som matematiska sekvenser', howWeAddress: 'Eleven identifierar och forts\u00e4tter rytmm\u00f6nster (kort-l\u00e5ng) och \u00f6vers\u00e4tter dem till symbol-sekvenser' },
      { milestone: 'Ordproblem inom 20 med musikscenarier', howWeAddress: 'Orkester- och konsertscenarier d\u00e4r eleven adderar och subtraherar musiker och instrument' },
      { milestone: 'Klassificering av instrument (str\u00e4ng, bl\u00e5s, slag)', howWeAddress: 'Sorteringstabeller d\u00e4r eleven grupperar instrument efter ljudproduktionsmetod' },
      { milestone: 'Kreativ skrivning med musiktema', howWeAddress: 'Eleven skriver korta s\u00e5ngtexter och beskriver sitt favoritinstrument med sinnesintryck' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, b\u00f6rja med AB-rytmm\u00f6nster, h\u00e5ll ordproblem inom 10 och begr\u00e4nsa till fem instrument. F\u00f6r avancerade elever introducera komplexare rytmm\u00f6nster, flerstegsordproblem och l\u00e5t eleven komponera en enkel melodi med notation.',
    parentTakeaway: 'G\u00f6r hemmet till en musikstudio! Klappa rytmm\u00f6nster och l\u00e5t barnet forts\u00e4tta. R\u00e4kna instrument i bilder och l\u00f6s ordproblem: \u201dom k\u00f6ren har 15 s\u00e5ngare och 6 sjunger solo, hur m\u00e5nga sjunger i grupp?\u201d. Sortera instrument hemma efter storlek. L\u00e5t barnet skriva en s\u00e5ngtext till en k\u00e4nd melodi. Rytm och matte g\u00e5r hand i hand.',
    classroomIntegration: 'Musiktemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas m\u00f6nster och datainsamling med musiktema, i musik spelas och \u00f6vas rytmm\u00f6nster, i svenska skrivs s\u00e5ngtexter och l\u00e4ses om instrument, i bild ritas instrument. Musiklektioner och arbetsblad kompletterar varandra under temaveckan.',
    assessmentRubric: [
      { skill: 'Rytmm\u00f6nster', emerging: 'forts\u00e4tter AB-m\u00f6nster med st\u00f6d', proficient: 'identifierar och forts\u00e4tter ABC-rytmm\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'skapar egna komplexa rytmm\u00f6nster och f\u00f6rklarar strukturen' },
      { skill: 'Ordproblem med musikscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med musiktema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna orkesterproblem' },
      { skill: 'Klassificering av instrument', emerging: 'sorterar efter en egenskap med st\u00f6d', proficient: 'grupperar sj\u00e4lvst\u00e4ndigt instrument i tre kategorier', advanced: 'beskriver ljud- och materialegenskaper och skapar eget sorteringssystem' },
    ],
  },

  nature: {
    seoTitle: 'Gratis Natur\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara natur\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Datainsamling, ekosystem och ordproblem med naturtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'natur\u00f6vningar \u00e5rskurs 1, natur arbetsblad 6\u20137 \u00e5r, datainsamling natur, ekosystem, ordproblem, Lgr22 NO, \u00e5rstider, v\u00e4xter djur, allemansrtten, utomhuspedagogik',
    snippetAnswer: 'Natur\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar datainsamling i naturen, ordproblem inom 20 och l\u00e4sf\u00f6rst\u00e5else om ekosystem och \u00e5rstider. Utomhusobservationer kopplas till Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas naturtemat till vetenskapligt unders\u00f6kande och systematisk datainsamling. Sex- och sju\u00e5ringar dokumenterar naturfynd p\u00e5 skolog\u00e5rden med streckr\u00e4kning, l\u00f6ser ordproblem med naturscenarier (vi hittade 16 kottar och 9 var \u00f6ppna, hur m\u00e5nga var st\u00e4ngda?), och l\u00e4ser faktatexter om ekosystem och \u00e5rstidsf\u00f6r\u00e4ndringar. Allemansrtten introduceras genom l\u00e4spassager med diskussionsfr\u00e5gor. Klassificerings\u00f6vningar d\u00e4r eleven sorterar naturfynd (v\u00e4xt/djur, levande/icke-levande) bygger naturvetenskapligt t\u00e4nkande. Lgr22 betonar utomhuspedagogik, dataredovisning och allemansrtten, och naturtemat \u00e4r den mest direkta v\u00e4gen till alla tre m\u00e5len.',
    developmentalMilestones: [
      { milestone: 'Systematisk datainsamling utomhus (streckr\u00e4kning)', howWeAddress: 'Eleven dokumenterar naturfynd (kottar, l\u00f6v, stenar) med streckr\u00e4kning och redovisar i diagram' },
      { milestone: 'Klassificering av naturfynd (levande/icke-levande, v\u00e4xt/djur)', howWeAddress: 'Sorteringsuppgifter d\u00e4r eleven grupperar fynd och motiverar kategoriseringen' },
      { milestone: 'Ordproblem inom 20 med naturscenarier', howWeAddress: 'Realistiska naturproblem (kottar, f\u00e5glar, blommor) tr\u00e4nar tiotals\u00f6verg\u00e5ng i utomhuskontext' },
      { milestone: '\u00c5rstidsf\u00f6rst\u00e5else och naturobservation', howWeAddress: 'Eleven dokumenterar \u00e5rstidsf\u00f6r\u00e4ndringar \u00f6ver m\u00e5nader och kopplar observationer till texter' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00e4rdiga streckr\u00e4kningsmallar, begr\u00e4nsa klassificering till tv\u00e5 kategorier och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever l\u00e4gg till j\u00e4mf\u00f6relse av data fr\u00e5n tv\u00e5 bes\u00f6k, l\u00e5t eleven skriva en naturrapport och introducera enkla n\u00e4ringsv\u00e4var.',
    parentTakeaway: 'Naturen \u00e4r det st\u00f6rsta klassrummet! Ta med barnet p\u00e5 en naturpromenad och l\u00e5t det r\u00e4kna kottar, blommor och stenar med streckr\u00e4kning. St\u00e4ll ordproblem: \u201dom vi hittade 14 ekollon och lade tillbaka 6, hur m\u00e5nga tog vi med?\u201d. Sortera naturfynd hemma: levande kontra icke-levande. Prata om allemansrtten och varf\u00f6r vi ska vara r\u00e4dda om naturen.',
    classroomIntegration: 'Naturtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik samlas och redovisas data fr\u00e5n utomhusbes\u00f6k, i NO studeras ekosystem och \u00e5rstider, i svenska skrivs naturdagb\u00f6cker och l\u00e4ses faktatexter, i idrott \u00f6vas utomhuspedagogik. Veckans utomhuslektion kopplas direkt till arbetsbladen.',
    assessmentRubric: [
      { skill: 'Datainsamling i naturen', emerging: 'r\u00e4knar med st\u00f6d och f\u00f6r streckr\u00e4kning', proficient: 'samlar sj\u00e4lvst\u00e4ndigt in data och redovisar i diagram', advanced: 'j\u00e4mf\u00f6r data fr\u00e5n tv\u00e5 bes\u00f6k och drar slutsatser' },
      { skill: 'Klassificering av naturfynd', emerging: 'sorterar efter en egenskap med st\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 kriterier och motiverar', advanced: 'skapar egna klassificeringssystem och kopplar till ekosystemf\u00f6rst\u00e5else' },
      { skill: 'Ordproblem med naturscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med naturtema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna naturproblem' },
    ],
  },

  numbers: {
    seoTitle: 'Gratis Siffer\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara siffer\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Tiotals\u00f6verg\u00e5ng, tallinjen och ordproblem inom 20. 33 generatorer. Gratis PDF.',
    seoKeywords: 'siffer\u00f6vningar \u00e5rskurs 1, siffror arbetsblad 6\u20137 \u00e5r, tiotals\u00f6verg\u00e5ng, tallinje, positionssystemet, ordproblem 20, Lgr22 matematik, addition subtraktion, taluppfattning, udda j\u00e4mna',
    snippetAnswer: 'Siffer\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar tiotals\u00f6verg\u00e5ng, positionssystemet med ental och tiotal, och ordproblem inom 20 med systematisk probleml\u00f6sning. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 \u00e4r siffertemat k\u00e4rnan i matematikundervisningen. Sex- och sju\u00e5ringar beh\u00e4rskar tiotals\u00f6verg\u00e5ng (8 + 5 = 13), f\u00f6rst\u00e5r positionssystemet med ental och tiotal, och anv\u00e4nder tallinjen f\u00f6r att visualisera r\u00e4kneoperationer. Udda och j\u00e4mna tal introduceras systematiskt. Ordproblem kr\u00e4ver att eleven v\u00e4ljer r\u00e4knes\u00e4tt och skriver tals\u00e4ts. Talm\u00f6nster (r\u00e4kna med 2, 5 och 10) bygger algebraiskt t\u00e4nkande. Lgr22 betonar taluppfattning, positionssystemet och matematiskt resonemang, och siffertemat levererar alla dessa grundl\u00e4ggande m\u00e5l direkt och systematiskt f\u00f6r \u00e5rskurs 1.',
    developmentalMilestones: [
      { milestone: 'Tiotals\u00f6verg\u00e5ng vid addition och subtraktion', howWeAddress: 'Systematiska \u00f6vningar d\u00e4r eleven l\u00f6ser 8+5, 7+6, 14\u20139 med strategi (dela upp och g\u00f6r tio)' },
      { milestone: 'Positionssystemet (ental och tiotal)', howWeAddress: 'Talf\u00f6rdelnings\u00f6vningar d\u00e4r eleven delar upp 14 i 1 tiotal och 4 ental med visuellt st\u00f6d' },
      { milestone: 'Tallinjen f\u00f6r visualisering av operationer', howWeAddress: 'Eleven hoppar p\u00e5 tallinjen f\u00f6r att visa addition och subtraktion grafiskt' },
      { milestone: 'Udda och j\u00e4mna tal samt r\u00e4kna med hopp (2, 5, 10)', howWeAddress: 'M\u00f6nster\u00f6vningar d\u00e4r eleven identifierar regeln i talsekvenser och forts\u00e4tter' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd konkret material (tioramar, kuber) vid tiotals\u00f6verg\u00e5ng och begr\u00e4nsa till talomr\u00e5det 15. F\u00f6r avancerade elever ut\u00f6ka till talomr\u00e5det 50, introducera flerstegsoperationer och l\u00e5t eleven f\u00f6rklara strategier muntligt och skriftligt.',
    parentTakeaway: 'Siffror finns \u00f6verallt hemma! \u00d6va tiotals\u00f6verg\u00e5ng med vardagssaker: \u201dom du har 8 leksaker och f\u00e5r 5 till, hur m\u00e5nga har du d\u00e5? Hur korsade du tiotalet?\u201d. R\u00e4kna med hopp (2, 4, 6...) p\u00e5 promenaden. L\u00e5t barnet hitta husnummer och beskriva om de \u00e4r udda eller j\u00e4mna. Spela t\u00e4rningsspel som tr\u00e4nar addition. Varje dag \u00e4r full av siffror att utforska.',
    classroomIntegration: 'Siffertemat i \u00e5rskurs 1 \u00e4r fundamentet f\u00f6r Lgr22:s matematikm\u00e5l: tiotals\u00f6verg\u00e5ng \u00f6vas dagligen i korta pass, positionssystemet demonstreras med konkret material, tallinjen anv\u00e4nds visuellt vid varje r\u00e4kneuppgift och talm\u00f6nster kopplas till algebraiskt t\u00e4nkande. Arbetsbladen kompletterar morgonmatematiken med systematisk repetition.',
    assessmentRubric: [
      { skill: 'Tiotals\u00f6verg\u00e5ng', emerging: 'l\u00f6ser addition utan \u00f6verg\u00e5ng (3+4) men beh\u00f6ver st\u00f6d vid 8+5', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt addition och subtraktion med tiotals\u00f6verg\u00e5ng inom 20', advanced: 'anv\u00e4nder flexibla strategier och f\u00f6rklarar sitt resonemang' },
      { skill: 'Positionssystemet', emerging: 'identifierar tiotal och ental i tv\u00e5siffriga tal med st\u00f6d', proficient: 'delar sj\u00e4lvst\u00e4ndigt upp tal i tiotal och ental och f\u00f6rklarar', advanced: 'j\u00e4mf\u00f6r tv\u00e5siffriga tal och resonerar om talens uppbyggnad' },
      { skill: 'Talm\u00f6nster och sekvenser', emerging: 'r\u00e4knar med 2 med st\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt med 2, 5 och 10 och identifierar udda/j\u00e4mna', advanced: 'skapar egna talm\u00f6nster och f\u00f6rklarar regeln algebraiskt' },
    ],
  },

  ocean: {
    seoTitle: 'Gratis Hav\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara hav\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, klassificering och havsbiologi med oceantema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'hav\u00f6vningar \u00e5rskurs 1, ocean arbetsblad 6\u20137 \u00e5r, havsdjur, klassificering, ordproblem hav, Lgr22 NO, datainsamling, korallrev, vatten, l\u00e4sf\u00f6rst\u00e5else',
    snippetAnswer: 'Hav\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20, klassificering av havsdjur och l\u00e4sf\u00f6rst\u00e5else om havsbiologi. Datainsamling och diagramredovisning ger matematisk kontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas oceantemat till klassificering och naturvetenskapligt ordf\u00f6rr\u00e5d p\u00e5 avancerad niv\u00e5. Sex- och sju\u00e5ringar klassificerar havsdjur efter egenskaper (fenor/inga fenor, skal/inget skal, d\u00e4ggdjur/fisk), l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (dykaren s\u00e5g 15 fiskar och 7 simmade iv\u00e4g) och l\u00e4ser faktatexter om korallrev, valar och havsstr\u00f6mmar. Datainsamling \u00f6vas genom att r\u00e4kna havsdjur p\u00e5 en bild och redovisa i diagram. Symmetri\u00f6vningar med havsdjur kopplar matematik till biologi. Lgr22 betonar klassificering, dataredovisning och naturvetenskapligt ordf\u00f6rr\u00e5d, och havstemats fascination driver elevens nyfikenhet och engagemang.',
    developmentalMilestones: [
      { milestone: 'Klassificering av havsdjur efter vetenskapliga kriterier', howWeAddress: 'Sorteringstabeller d\u00e4r eleven grupperar havsdjur efter egenskaper som fenor, skal och andningss\u00e4tt' },
      { milestone: 'Ordproblem inom 20 med havsscenarier', howWeAddress: 'Dykar- och fiskescenarier d\u00e4r eleven adderar och subtraherar med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om havsbiologi', howWeAddress: 'Faktatexter om korallrev, valar och havslevande d\u00e4ggdjur med f\u00f6rst\u00e5elsefr\u00e5gor' },
      { milestone: 'Datainsamling och diagramredovisning med havsdata', howWeAddress: 'Eleven r\u00e4knar havsdjur i bilder och redovisar i streckr\u00e4kning och stapeldiagram' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fem v\u00e4lk\u00e4nda havsdjur, anv\u00e4nd en klassificeringsegenskap och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever ut\u00f6ka till 15+ arter, l\u00e4gg till j\u00e4mf\u00f6relse av havszoner och l\u00e5t eleven skriva en havsdjursforskningsrapport.',
    parentTakeaway: 'Havet fascinerar alla barn! L\u00e4s havsb\u00f6cker och diskutera: \u201d\u00e4r en delfin en fisk eller ett d\u00e4ggdjur? Varf\u00f6r?\u201d. L\u00f6s ordproblem: \u201dom 14 fiskar simmar i stim och 6 g\u00f6mmer sig i korallen, hur m\u00e5nga \u00e4r synliga?\u201d. Rita havsdjur och sortera dem efter egenskaper. Bes\u00f6k ett akvarium och r\u00e4kna arter. Arbetsbladen f\u00f6rl\u00e4nger havets magi in i matematiken.',
    classroomIntegration: 'Oceantemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och data redovisas med havsbilder, i NO klassificeras havsdjur och korallrev studeras, i svenska l\u00e4ses och skrivs faktatexter, i bild m\u00e5las undervattenssscener. En havsvecka med akvarie\u00f6vningar ger tematisk kontext.',
    assessmentRubric: [
      { skill: 'Klassificering av havsdjur', emerging: 'sorterar efter en egenskap med st\u00f6d', proficient: 'klassificerar sj\u00e4lvst\u00e4ndigt efter tv\u00e5 kriterier och f\u00f6rklarar', advanced: 'anv\u00e4nder vetenskapliga termer och kopplar till havszoner' },
      { skill: 'Ordproblem med havsscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med havstema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna havsproblem' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om havsbiologi', emerging: '\u00e5terger ett faktum fr\u00e5n en kort text med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor om havsfaktatexter', advanced: 'j\u00e4mf\u00f6r information fr\u00e5n tv\u00e5 texter och drar slutsatser' },
    ],
  },

  pets: {
    seoTitle: 'Gratis Husdjurs\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara husdjurs\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Ordproblem inom 20, djurv\u00e5rd och datainsamling med husdjurstema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'husdjurs\u00f6vningar \u00e5rskurs 1, husdjur arbetsblad 6\u20137 \u00e5r, ordproblem husdjur, djurv\u00e5rd, datainsamling, Lgr22, ansvar, skrivuppgift husdjur, j\u00e4mf\u00f6relse, veterinr',
    snippetAnswer: 'Husdjurs\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20, datainsamling om klassens husdjur och l\u00e4sf\u00f6rst\u00e5else om djurv\u00e5rd och ansvar. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas husdjurstemat till ansvar, datainsamling och strukturerad skrivning. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (katten \u00e5t 13 godisbitar p\u00e5 en vecka och 7 p\u00e5 m\u00e5ndag\u2013torsdag, hur m\u00e5nga \u00e5t den fredag\u2013s\u00f6ndag?), samlar in data om klassens husdjur och redovisar i stapeldiagram, och l\u00e4ser faktatexter om djurv\u00e5rd. Skrivuppgifter d\u00e4r eleven skriver en dagbok ur husdjurets perspektiv eller ett v\u00e5rdschema ger meningsfull textproduktion. J\u00e4mf\u00f6relse\u00f6vningar d\u00e4r eleven j\u00e4mf\u00f6r tv\u00e5 husdjur efter storlek, f\u00f6da och behov tr\u00e4nar logiskt t\u00e4nkande. Lgr22 betonar dataredovisning, ansvar och skriftlig produktion, och husdjurstemat f\u00f6renar alla tre i en djupt motiverande kontext.',
    developmentalMilestones: [
      { milestone: 'Ordproblem inom 20 med husdjursscenarier', howWeAddress: 'V\u00e5rdscenarier (mat, leksaker, veterin\u00e4rbes\u00f6k) d\u00e4r eleven adderar och subtraherar med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Datainsamling om klassens husdjur', howWeAddress: 'Eleven genomf\u00f6r en unders\u00f6kning om husdjurstyper, redovisar i streckr\u00e4kning och stapeldiagram' },
      { milestone: 'J\u00e4mf\u00f6relse av husdjur (storlek, f\u00f6da, behov)', howWeAddress: 'J\u00e4mf\u00f6relsetabeller d\u00e4r eleven beskriver likheter och skillnader mellan tv\u00e5 husdjur' },
      { milestone: 'Skriftlig beskrivning och dagbok fr\u00e5n husdjurets perspektiv', howWeAddress: 'Eleven skriver en dag i husdjurets liv med detaljer om mat, lek och vila' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fyra v\u00e4lk\u00e4nda husdjur, h\u00e5ll ordproblem inom 10 och ge startmeningar f\u00f6r skrivuppgiften. F\u00f6r avancerade elever ut\u00f6ka till ovanliga husdjur, l\u00e4gg till flerstegsordproblem och l\u00e5t eleven skriva en husdjursguide med fakta och v\u00e5rdtips.',
    parentTakeaway: 'Husdjuret hemma \u00e4r b\u00e4sta l\u00e4romedlet! L\u00e5t barnet m\u00e4ta hundens mat, r\u00e4kna kattens leksaker och l\u00f6sa ordproblem: \u201dom hunden springer 12 rundor i parken och vilar efter 7, hur m\u00e5nga \u00e4r kvar?\u201d. Skriv ett v\u00e5rdschema tillsammans. Fr\u00e5ga: \u201dvad beh\u00f6ver katten j\u00e4mf\u00f6rt med en fisk?\u201d. Ansvar f\u00f6r husdjuret bygger b\u00e5de matematik och karakt\u00e4r.',
    classroomIntegration: 'Husdjurstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och data samlas in, i NO diskuteras djurv\u00e5rd och djurs behov, i svenska skrivs husdjursdagb\u00f6cker och l\u00e4ses faktatexter, i SO diskuteras ansvar. Bes\u00f6k av husdjur i klassrummet ger autentisk kontext f\u00f6r arbetsbladen.',
    assessmentRubric: [
      { skill: 'Ordproblem med husdjursscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med husdjurstema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna v\u00e5rdproblem' },
      { skill: 'Datainsamling om husdjur', emerging: 'r\u00e4knar husdjurstyper med st\u00f6d', proficient: 'genomf\u00f6r sj\u00e4lvst\u00e4ndigt en unders\u00f6kning och redovisar i diagram', advanced: 'tolkar diagram, j\u00e4mf\u00f6r data och drar slutsatser om popul\u00e4raste husdjur' },
      { skill: 'J\u00e4mf\u00f6relse av husdjur', emerging: 'namnger en likhet med st\u00f6d', proficient: 'j\u00e4mf\u00f6r sj\u00e4lvst\u00e4ndigt tv\u00e5 husdjur i tabell med tre kriterier', advanced: 'skriver en j\u00e4mf\u00f6rande text med slutsatser' },
    ],
  },

  pirates: {
    seoTitle: 'Gratis Pirat\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara pirat\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Skattjakt med ordproblem, kartl\u00e4sning och r\u00e4kning inom 20. 33 generatorer. Gratis PDF.',
    seoKeywords: 'pirat\u00f6vningar \u00e5rskurs 1, pirater arbetsblad 6\u20137 \u00e5r, skattjakt matematik, kartl\u00e4sning, ordproblem pirater, Lgr22, guldmynt r\u00e4kning, ber\u00e4ttelseskrivning, riktningar, m\u00e4tning',
    snippetAnswer: 'Pirat\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med guldmynt och skattjakter, enkel kartl\u00e4sning med riktningar och kreativ ber\u00e4ttelseskrivning. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 f\u00f6rvandlas pirattemat till matematisk probleml\u00f6sning och kartf\u00e4rdigheter. Sex- och sju\u00e5ringar l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (piraten hittade 17 guldmynt och gav 9 till bes\u00e4ttningen), l\u00e4ser enkla skattekartor med riktningar (tre steg norrut, tv\u00e5 steg \u00f6sterut) och m\u00e4ter avst\u00e5nd p\u00e5 kartan i centimeter. Delnings\u00f6vningar d\u00e4r skatten f\u00f6rdelas lika mellan pirater bygger tidig divisionsf\u00f6rst\u00e5else. Ber\u00e4ttelseskrivning d\u00e4r eleven skriver en pirat\u00e4ventyr med inledning, handling och avslutning ger strukturerad textproduktion. Lgr22 betonar rumslig orientering, vardagsmatematik och ber\u00e4ttelseskrivning, och piratttemat levererar alla tre med h\u00f6g motivation.',
    developmentalMilestones: [
      { milestone: 'Ordproblem inom 20 med piratscenarier', howWeAddress: 'Guldmynt, skattjakter och bes\u00e4ttningsscenarier tr\u00e4nar addition och subtraktion med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Kartl\u00e4sning med riktningar och symboler', howWeAddress: 'Skattekartor d\u00e4r eleven f\u00f6ljer stegvisa riktningar och identifierar landm\u00e4rken' },
      { milestone: 'R\u00e4ttvis delning av skatt (tidig division)', howWeAddress: 'F\u00f6rdelnings\u00f6vningar d\u00e4r guldmynt delas lika mellan pirater' },
      { milestone: 'Ber\u00e4ttelseskrivning med \u00e4ventyrstruktur', howWeAddress: 'Eleven skriver ett pirat\u00e4ventyr med inledning, sp\u00e4nnande h\u00e4ndelse och avslutning' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, h\u00e5ll ordproblem inom 10, ge f\u00e4rdiga kartor med f\u00e5 symboler och erbjud startmeningar f\u00f6r ber\u00e4ttelsen. F\u00f6r avancerade elever introducera flerstegsordproblem med tre operationer, koordinatkarta och l\u00e5t eleven skriva en l\u00e4ngre piratber\u00e4ttelse med dialog.',
    parentTakeaway: 'Arrangera en skattjakt hemma! G\u00f6m \u201dskatter\u201d och rita en enkel karta med stegvisa ledtr\u00e5dar. L\u00f6s ordproblem: \u201dom piraten hade 16 guldmynt och f\u00f6rlorade 7 i stormen, hur m\u00e5nga har han kvar?\u201d. Dela godis lika mellan barnen som pirater delar byte. L\u00e5t barnet skriva ett pirat\u00e4ventyr. Pirattemat g\u00f6r matematiken till ett sp\u00e4nnande \u00e4ventyr.',
    classroomIntegration: 'Pirattemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och delning \u00f6vas, i svenska skrivs piratber\u00e4ttelser och l\u00e4ses \u00e4ventyrsb\u00f6cker, i SO diskuteras kartor och riktningar, i bild skapas skattekartor. En piratdag med rollspel ger autentisk kontext f\u00f6r alla arbetsblad.',
    assessmentRubric: [
      { skill: 'Ordproblem med piratscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med pirattema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna skattjaktsproblem' },
      { skill: 'Kartl\u00e4sning och orientering', emerging: 'f\u00f6ljer tv\u00e5 steg p\u00e5 en karta med st\u00f6d', proficient: 'l\u00e4ser sj\u00e4lvst\u00e4ndigt en enkel karta med symboler och riktningar', advanced: 'ritar en egen skattekarta med symboler och skriver instruktioner' },
      { skill: 'R\u00e4ttvis delning av skatt', emerging: 'f\u00f6rdelar med en-till-varje-metoden med st\u00f6d', proficient: 'f\u00f6rdelar sj\u00e4lvst\u00e4ndigt f\u00f6rem\u00e5l lika och kontrollerar', advanced: 'l\u00f6ser delning med rest och f\u00f6rklarar vad resten inneb\u00e4r' },
    ],
  },

  robots: {
    seoTitle: 'Gratis Robot\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara robot\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Sekvensering, geometri och ordproblem med robottema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'robot\u00f6vningar \u00e5rskurs 1, robotar arbetsblad 6\u20137 \u00e5r, sekvensering programmering, geometriska former, ordproblem robotar, Lgr22, algoritmiskt t\u00e4nkande, symmetri, instruktioner, teknik',
    snippetAnswer: 'Robot\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar sekvensering, geometriska former och ordproblem inom 20 med robottema. Algoritmiskt t\u00e4nkande introduceras visuellt. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas robottemat till algoritmiskt t\u00e4nkande och geometri. Sex- och sju\u00e5ringar skriver enkla instruktionssekvenser (g\u00e5 fram, sv\u00e4ng h\u00f6ger, g\u00e5 fram) som programmerar en robot, identifierar geometriska former i robotdesigner (rektangulr kropp, cirkelformade \u00f6gon, triangulra \u00f6ron) och l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (roboten samlade 15 batterier och anv\u00e4nde 8). Symmetri\u00f6vningar d\u00e4r eleven ritar den saknade halvan av en robot tr\u00e4nar rumsligt t\u00e4nkande. Lgr22 betonar algoritmiskt t\u00e4nkande, geometri och probleml\u00f6sning, och robottemat introducerar alla tre f\u00f6r unga elever p\u00e5 ett visuellt och lekfullt s\u00e4tt.',
    developmentalMilestones: [
      { milestone: 'Sekvensering och instruktionsskrivning (algoritmiskt t\u00e4nkande)', howWeAddress: 'Eleven skriver steg-f\u00f6r-steg-instruktioner f\u00f6r att styra en robot genom en bana' },
      { milestone: 'Geometriska former i robotdesign', howWeAddress: 'Eleven identifierar och namnger former i robotbilder och bygger egna robotar av former' },
      { milestone: 'Ordproblem inom 20 med robotscenarier', howWeAddress: 'Batteri-, skruv- och uppdragsscenarier d\u00e4r eleven adderar och subtraherar med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'Symmetri med robotmotiv', howWeAddress: 'Eleven ritar den saknade halvan av en symmetrisk robot och identifierar spegelaxeln' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa instruktioner till tre steg, fokusera p\u00e5 grundformer och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever introducera villkorssatser (om v\u00e4g blockerad, sv\u00e4ng), bygga robotar med sex+ former och l\u00f6sa flerstegsordproblem.',
    parentTakeaway: 'G\u00f6r barnet till programmerare hemma! Lek \u201drobot och programmerare\u201d: barnet ger muntliga instruktioner och f\u00f6r\u00e4ldern agerar robot som enbart f\u00f6ljer exakta order. Bygg robotar av kartong och identifiera formerna. L\u00f6s ordproblem: \u201dom roboten hade 14 skruvar och f\u00f6rlorade 6, hur m\u00e5nga \u00e4r kvar?\u201d. Rita symmetriska robotar. Teknik och matte f\u00f6renas i lek.',
    classroomIntegration: 'Robottemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas geometri, symmetri och ordproblem, i teknik introduceras algoritmiskt t\u00e4nkande, i svenska skrivs instruktionstexter, i bild designas robotar av geometriska former. Programmeringsrobotar som Bee-Bot kompletterar arbetsbladen med praktisk \u00f6vning.',
    assessmentRubric: [
      { skill: 'Sekvensering och instruktioner', emerging: 'skriver tv\u00e5 steg med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt fyra\u2013fem instruktioner i r\u00e4tt ordning', advanced: 'inkluderar villkor och fels\u00f6ker sina instruktioner' },
      { skill: 'Geometriska former i robotdesign', emerging: 'identifierar tv\u00e5 former med st\u00f6d', proficient: 'namnger och beskriver fyra former i robotbilder', advanced: 'bygger egna robotar med sex+ former och beskriver deras egenskaper' },
      { skill: 'Ordproblem med robotscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med robottema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna robotuppdrag' },
    ],
  },

  school: {
    seoTitle: 'Gratis Skol\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara skol\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Klockan, schema och ordproblem med skoltema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'skol\u00f6vningar \u00e5rskurs 1, skola arbetsblad 6\u20137 \u00e5r, klockan, schema, ordproblem skola, Lgr22, klassrumsmatematik, skolmaterial r\u00e4kning, pengar, tidplanering',
    snippetAnswer: 'Skol\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar klockan, ordproblem inom 20 med skolscenarier och schemaplanering. Klassrummets vardag ger meningsfull kontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 \u00e4r skoltemat den mest autentiska kontexten f\u00f6r vardagsmatematik. Sex- och sju\u00e5ringar l\u00e4ser klockan f\u00f6r att f\u00f6lja schemat (matematiklektionen b\u00f6rjar kl. 9:00), l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (det finns 18 kritor i l\u00e5dan och 9 \u00e4r utl\u00e5nade, hur m\u00e5nga \u00e4r kvar?) och r\u00e4knar skolmaterial. Schemat anv\u00e4nds f\u00f6r att \u00f6va tidbegrepp och ordningsf\u00f6ljd. Skrivuppgifter d\u00e4r eleven beskriver sin skoldag ger \u00e5terber\u00e4ttande text. Lgr22 betonar tidsl\u00e4sning, vardagsmatematik och \u00e5terber\u00e4ttande skrivande, och skoltemat ger den mest direkta kopplingen till elevens dagliga erfarenhet.',
    developmentalMilestones: [
      { milestone: 'Tidsl\u00e4sning kopplad till schemat (hel och halv timme)', howWeAddress: 'Eleven l\u00e4ser klockan f\u00f6r att f\u00f6lja schemat och ber\u00e4knar tid mellan lektioner' },
      { milestone: 'Ordproblem inom 20 med skolscenarier', howWeAddress: 'Klassrumsscenarier med kritor, b\u00f6cker och pennor tr\u00e4nar tiotals\u00f6verg\u00e5ng i v\u00e4lk\u00e4nd milj\u00f6' },
      { milestone: 'Schemaplanering och ordningsf\u00f6ljd', howWeAddress: 'Eleven ordnar lektioner i kronologisk ordning och kopplar till klockslag' },
      { milestone: '\u00c5terber\u00e4ttande text om sin skoldag', howWeAddress: 'Skrivuppgifter d\u00e4r eleven beskriver sin dag kronologiskt med tidsangivelser' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, anv\u00e4nd enbart hela timmar, h\u00e5ll ordproblem inom 10 och ge startmeningar f\u00f6r skrivuppgiften. F\u00f6r avancerade elever introducera kvart \u00f6ver och kvart i, l\u00e5t eleven planera en hel veckas schema och skriva en j\u00e4mf\u00f6rande text om tv\u00e5 skoldagar.',
    parentTakeaway: 'Anv\u00e4nd skoldagen hemma! L\u00e5t barnet ber\u00e4tta om sin dag i ordning och \u00f6va klockan: \u201dn\u00e4r b\u00f6rjar matematiken? n\u00e4r \u00e4r rast?\u201d. R\u00e4kna pennor och suddgummin i pennskrin och st\u00e4ll ordproblem. L\u00e5t barnet skriva ett brev till l\u00e4raren. Titta p\u00e5 schemat och diskutera vilken lektion barnet ser fram emot mest. Skolan \u00e4r l\u00e4randets naturliga milj\u00f6.',
    classroomIntegration: 'Skoltemat i \u00e5rskurs 1 integreras med Lgr22: i matematik \u00f6vas klockan och ordproblem med klassrumsf\u00f6rem\u00e5l, i svenska skrivs \u00e5terber\u00e4ttande texter om skoldagen, schemat anv\u00e4nds dagligen f\u00f6r tids\u00f6vningar. Klassrummets egna f\u00f6rem\u00e5l \u00e4r det b\u00e4sta konkreta materialet.',
    assessmentRubric: [
      { skill: 'Tidsl\u00e4sning med schema', emerging: 'l\u00e4ser hel timme p\u00e5 analog klocka med st\u00f6d', proficient: 'l\u00e4ser hel och halv timme och kopplar till schemat', advanced: 'l\u00e4ser kvart i/\u00f6ver och ber\u00e4knar tidsintervall mellan lektioner' },
      { skill: 'Ordproblem med skolscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med skoltema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna klassrumsproblem' },
      { skill: '\u00c5terber\u00e4ttande text om skoldagen', emerging: 'skriver tv\u00e5 meningar om skoldagen med st\u00f6d', proficient: 'skriver sj\u00e4lvst\u00e4ndigt en kronologisk \u00e5terber\u00e4ttelse med tidsord', advanced: 'skriver en detaljerad skoldagsber\u00e4ttelse med dialog och k\u00e4nslor' },
    ],
  },

  seasons: {
    seoTitle: 'Gratis \u00c5rstids\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara \u00e5rstids\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). V\u00e4derobservation, datainsamling och ordproblem med \u00e5rstidstema. 33 generatorer. Gratis PDF.',
    seoKeywords: '\u00e5rstids\u00f6vningar \u00e5rskurs 1, \u00e5rstider arbetsblad 6\u20137 \u00e5r, v\u00e4derobservation, datainsamling v\u00e4der, ordproblem \u00e5rstider, Lgr22 NO, temperatur, m\u00e5nader, naturf\u00f6r\u00e4ndringar, kalender',
    snippetAnswer: '\u00c5rstids\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar v\u00e4derobservation med datainsamling, ordproblem inom 20 och l\u00e4sf\u00f6rst\u00e5else om \u00e5rstidsf\u00f6r\u00e4ndringar i naturen. St\u00f6djer Lgr22. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas \u00e5rstidstemat till systematisk observation och datainsamling. Sex- och sju\u00e5ringar dokumenterar dagligt v\u00e4der i tabeller, r\u00e4knar solgre och regniga dagar per m\u00e5nad och redovisar i stapeldiagram. Ordproblem kopplas till \u00e5rstidsscenarier (p\u00e5 v\u00e5ren blommade 17 blommor och 9 vissnade, hur m\u00e5nga lever?). Eleven l\u00e4ser faktatexter om vad som h\u00e4nder i naturen under varje \u00e5rstid och kopplar till egna observationer. Kalenderarbete tr\u00e4nar m\u00e5nadsnamn och \u00e5rstidskopplingar. Lgr22 betonar naturvetenskapligt unders\u00f6kande, dataredovisning och \u00e5rstidsmedvetenhet, och \u00e5rstidstemat ger l\u00e5ng\u00e5rig data genom hela l\u00e4s\u00e5ret.',
    developmentalMilestones: [
      { milestone: 'V\u00e4derobservation och datainsamling \u00f6ver tid', howWeAddress: 'Daglig v\u00e4derdokumentation i tabell d\u00e4r eleven r\u00e4knar v\u00e4dertyper och redovisar m\u00e5nadsvis' },
      { milestone: 'Stapeldiagram med v\u00e4derdata', howWeAddress: 'Eleven skapar stapeldiagram \u00f6ver m\u00e5nadens v\u00e4der och besvarar tolkningsfr\u00e5gor' },
      { milestone: 'Ordproblem inom 20 med \u00e5rstidsscenarier', howWeAddress: 'Natur- och v\u00e4derscenarier d\u00e4r eleven adderar och subtraherar med tiotals\u00f6verg\u00e5ng' },
      { milestone: '\u00c5rstidsf\u00f6r\u00e4ndringar i naturen (observation och dokumentation)', howWeAddress: 'Eleven dokumenterar naturf\u00f6r\u00e4ndringar (tr\u00e4d, djur, dagsl\u00e4ngd) och j\u00e4mf\u00f6r \u00e5rstider' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, ge f\u00e4rdiga v\u00e4dersymbolkort, begr\u00e4nsa till tre v\u00e4dertyper och h\u00e5ll ordproblem inom 10. F\u00f6r avancerade elever l\u00e4gg till temperaturavl\u00e4sning, j\u00e4mf\u00f6relse av data mellan m\u00e5nader och l\u00e5t eleven skriva en rapport om \u00e5rstidernas g\u00e5ng.',
    parentTakeaway: 'V\u00e4dret \u00e4r en daglig lektion! L\u00e5t barnet kolla v\u00e4dret varje morgon och f\u00f6ra dagbok: sol, moln, regn, sn\u00f6. R\u00e4kna ihop efter en m\u00e5nad och g\u00f6r ett diagram. St\u00e4ll ordproblem: \u201dom det regnade 12 dagar i oktober och 5 i november, hur m\u00e5nga fler regndagar hade oktober?\u201d. Prata om vad som h\u00e4nder med tr\u00e4den p\u00e5 h\u00f6sten. \u00c5rstiderna g\u00f6r naturvetenskap levande.',
    classroomIntegration: '\u00c5rstidstemat i \u00e5rskurs 1 integreras med Lgr22: i matematik samlas v\u00e4derdata och redovisas i diagram, i NO studeras \u00e5rstidsf\u00f6r\u00e4ndringar och naturobservationer, i svenska skrivs \u00e5rstidsdikter och l\u00e4ses faktatexter, i bild m\u00e5las \u00e5rstidsbilder. V\u00e4derstationen i klassrummet kopplar daglig observation till arbetsbladen.',
    assessmentRubric: [
      { skill: 'V\u00e4derobservation och datainsamling', emerging: 'dokumenterar v\u00e4dret med symboler med st\u00f6d', proficient: 'samlar sj\u00e4lvst\u00e4ndigt in v\u00e4derdata och redovisar i diagram', advanced: 'j\u00e4mf\u00f6r data mellan m\u00e5nader och drar slutsatser om m\u00f6nster' },
      { skill: 'Ordproblem med \u00e5rstidsscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med \u00e5rstidstema', advanced: 'l\u00f6ser flerstegsproblem och skapar egna v\u00e4derproblem' },
      { skill: '\u00c5rstidskunskap', emerging: 'namnger fyra \u00e5rstider med st\u00f6d', proficient: 'beskriver sj\u00e4lvst\u00e4ndigt naturf\u00f6r\u00e4ndringar f\u00f6r varje \u00e5rstid', advanced: 'kopplar \u00e5rstidsf\u00f6r\u00e4ndringar till vetenskapliga f\u00f6rklaringar' },
    ],
  },

  shapes: {
    seoTitle: 'Gratis Form\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara form\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Geometriska egenskaper, symmetri och m\u00f6nster med formtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'form\u00f6vningar \u00e5rskurs 1, former arbetsblad 6\u20137 \u00e5r, geometri, symmetri, m\u00f6nster, Lgr22 matematik, triangel rektangel cirkel, sidor h\u00f6rn, rumsligt t\u00e4nkande, formbygge',
    snippetAnswer: 'Form\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar geometriska egenskaper (sidor, h\u00f6rn), symmetri och m\u00f6nsterigenk\u00e4nning med former. Barnen bygger och analyserar figurer systematiskt. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 g\u00e5r formtemat fr\u00e5n igenk\u00e4nning till analys. Sex- och sju\u00e5ringar r\u00e4knar sidor och h\u00f6rn p\u00e5 trianglar, rektanglar och femh\u00f6rningar, j\u00e4mf\u00f6r former efter egenskaper och sorterar dem i kategorier. Symmetri\u00f6vningar d\u00e4r eleven ritar den saknade halvan av en figur tr\u00e4nar rumsligt t\u00e4nkande. M\u00f6nster med former (triangel-cirkel-rektangel-triangel) bygger algebraiskt t\u00e4nkande. Eleven komponerar bilder av geometriska former och beskriver sin konstruktion skriftligt. Lgr22 betonar geometriska formers egenskaper, symmetri och m\u00f6nster, och formtemat \u00e4r den mest direkta v\u00e4gen till alla tre m\u00e5len i \u00e5rskurs 1.',
    developmentalMilestones: [
      { milestone: 'Analysera formers egenskaper (r\u00e4kna sidor och h\u00f6rn)', howWeAddress: 'Eleven r\u00e4knar sidor och h\u00f6rn p\u00e5 olika former och j\u00e4mf\u00f6r resultaten i tabell' },
      { milestone: 'Symmetri (identifiera och rita spegelbilder)', howWeAddress: 'Eleven ritar den saknade halvan av symmetriska figurer och identifierar spegelaxeln' },
      { milestone: 'M\u00f6nsterigenk\u00e4nning med geometriska former', howWeAddress: 'Sekvenser d\u00e4r eleven identifierar regeln och forts\u00e4tter m\u00f6nstret med former' },
      { milestone: 'Formkomposition (bygga bilder av former)', howWeAddress: 'Eleven konstruerar figurer (hus, b\u00e5t, djur) av geometriska former och beskriver dem' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, fokusera p\u00e5 tre grundformer (cirkel, triangel, rektangel), ge mallar f\u00f6r symmetri och anv\u00e4nd AB-m\u00f6nster. F\u00f6r avancerade elever introducera femh\u00f6rningar och sexh\u00f6rningar, l\u00e5t eleven skapa komplexa m\u00f6nster och skriva beskrivningar av formernas egenskaper.',
    parentTakeaway: 'Former finns \u00f6verallt! G\u00e5 p\u00e5 formjakt hemma och i parken: \u201dhur m\u00e5nga rektanglar ser du i k\u00f6ket? Hur m\u00e5nga sidor har f\u00f6nstret?\u201d. Vik papper f\u00f6r att visa symmetri. L\u00e4gg m\u00f6nster med kylskapsmagenter. Bygg djur och hus av pappersformer. R\u00e4kna h\u00f6rn p\u00e5 skyltar utomhus. Geometri \u00e4r \u00f6verallt n\u00e4r man b\u00f6rjar leta.',
    classroomIntegration: 'Formtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik analyseras former, symmetri \u00f6vas och m\u00f6nster skapas, i bild byggs bilder av geometriska former, i teknik konstrueras modeller, i svenska beskrivs former med korrekta termer. Klassrummets formv\u00e4gg d\u00e4r elever bidrar med uppt\u00e4ckta former driver tematiskt l\u00e4rande.',
    assessmentRubric: [
      { skill: 'Analysera formers egenskaper', emerging: 'namnger tre grundformer med st\u00f6d', proficient: 'r\u00e4knar sj\u00e4lvst\u00e4ndigt sidor och h\u00f6rn p\u00e5 fem former', advanced: 'j\u00e4mf\u00f6r former med tabell och f\u00f6rklarar skillnader' },
      { skill: 'Symmetri med former', emerging: 'identifierar symmetrilinjen med st\u00f6d', proficient: 'ritar sj\u00e4lvst\u00e4ndigt den saknade halvan korrekt', advanced: 'skapar egna symmetriska designer och f\u00f6rklarar spegelprincipen' },
      { skill: 'M\u00f6nster med geometriska former', emerging: 'forts\u00e4tter AB-m\u00f6nster med st\u00f6d', proficient: 'identifierar och forts\u00e4tter ABC-m\u00f6nster sj\u00e4lvst\u00e4ndigt', advanced: 'skapar egna komplexa m\u00f6nster och f\u00f6rklarar regeln' },
    ],
  },

  space: {
    seoTitle: 'Gratis Rymd\u00f6vningar \u00c5rskurs 1 | LessonCraftStudio',
    seoDescription: 'Utskrivbara rymd\u00f6vningar f\u00f6r elever i \u00e5rskurs 1 (6\u20137 \u00e5r). Planeter, ordproblem inom 20 och datainsamling med rymdtema. 33 generatorer. Gratis PDF.',
    seoKeywords: 'rymd\u00f6vningar \u00e5rskurs 1, rymden arbetsblad 6\u20137 \u00e5r, planeter, ordproblem rymden, datainsamling, Lgr22 NO, solsystemet, storleksj\u00e4mf\u00f6relse, sekvenser, astronaut',
    snippetAnswer: 'Rymd\u00f6vningar f\u00f6r \u00e5rskurs 1 (6\u20137 \u00e5r) tr\u00e4nar ordproblem inom 20 med rymdscenarier, storleksj\u00e4mf\u00f6relse av planeter och datainsamling. Solsystemet ger naturvetenskaplig kontext. Gratis utskrivbara PDF-arbetsblad p\u00e5 LessonCraftStudio.',
    uniqueGradeAngle: 'I \u00e5rskurs 1 kopplas rymdtemat till storleksrelationer, datainsamling och naturvetenskapligt ordf\u00f6rr\u00e5d. Sex- och sju\u00e5ringar j\u00e4mf\u00f6r planeternas storlek och ordnar dem fr\u00e5n minst till st\u00f6rst, l\u00f6ser ordproblem med tiotals\u00f6verg\u00e5ng (astronauten samlade 16 m\u00e5nstenar och skickade 9 till jorden) och l\u00e4ser faktatexter om solsystemet. Sekvenserings\u00f6vningar d\u00e4r eleven ordnar planeter efter avst\u00e5nd fr\u00e5n solen tr\u00e4nar ordningsf\u00f6ljd. Datainsamling \u00f6vas genom att r\u00e4kna stj\u00e4rnor i konstellationer och redovisa i diagram. Lgr22 betonar j\u00e4mf\u00f6relse, dataredovisning och naturvetenskapligt ordf\u00f6rr\u00e5d, och rymdtemats fascination driver elevernas nyfikenhet till nya h\u00f6jder.',
    developmentalMilestones: [
      { milestone: 'Storleksj\u00e4mf\u00f6relse och ordning (planeter fr\u00e5n minst till st\u00f6rst)', howWeAddress: 'Eleven ordnar planeter efter storlek och avst\u00e5nd fr\u00e5n solen och anv\u00e4nder begreppen st\u00f6rre/mindre' },
      { milestone: 'Ordproblem inom 20 med rymdscenarier', howWeAddress: 'Astronaut- och rymdraketsscenarier d\u00e4r eleven adderar och subtraherar med tiotals\u00f6verg\u00e5ng' },
      { milestone: 'L\u00e4sf\u00f6rst\u00e5else om solsystemet', howWeAddress: 'Faktatexter om planeter, m\u00e5nen och stj\u00e4rnor med f\u00f6rst\u00e5elsefr\u00e5gor som kr\u00e4ver \u00e5terber\u00e4ttande' },
      { milestone: 'Datainsamling med rymdmotiv (stj\u00e4rnor i konstellationer)', howWeAddress: 'Eleven r\u00e4knar stj\u00e4rnor i bilder och redovisar i streckr\u00e4kning och stapeldiagram' },
    ],
    differentiationNotes: 'F\u00f6r elever som beh\u00f6ver st\u00f6d, begr\u00e4nsa till fyra planeter, h\u00e5ll ordproblem inom 10 och ge bildst\u00f6d vid datainsamling. F\u00f6r avancerade elever l\u00e4gg till alla \u00e5tta planeter med faktadata, flerstegsordproblem och l\u00e5t eleven skriva en rymdforskningsrapport.',
    parentTakeaway: 'Rymden fascinerar alla barn! Titta p\u00e5 stj\u00e4rnhimlen och r\u00e4kna stj\u00e4rnor. L\u00f6s ordproblem: \u201dom astronauten hade 15 syreflaskor och anv\u00e4nde 7, hur m\u00e5nga \u00e4r kvar?\u201d. G\u00f6r en modell av solsystemet med frukter i olika storlekar. L\u00e4s b\u00f6cker om planeter och diskutera vilken som \u00e4r st\u00f6rst. Arbetsbladen g\u00f6r rymdens under till matematik och naturvetenskap.',
    classroomIntegration: 'Rymdtemat i \u00e5rskurs 1 integreras med Lgr22: i matematik l\u00f6ses ordproblem och data redovisas med rymdmotiv, i NO studeras solsystemet och stj\u00e4rnor, i svenska l\u00e4ses och skrivs rymdtexter, i bild m\u00e5las solsystem. En rymdvecka med rakettbygge och planetutst\u00e4llning ger autentisk kontext.',
    assessmentRubric: [
      { skill: 'Storleksj\u00e4mf\u00f6relse av planeter', emerging: 'j\u00e4mf\u00f6r tv\u00e5 planeter med st\u00f6d', proficient: 'ordnar sj\u00e4lvst\u00e4ndigt fyra+ planeter efter storlek och avst\u00e5nd', advanced: 'anv\u00e4nder data f\u00f6r att j\u00e4mf\u00f6ra och presenterar med diagram' },
      { skill: 'Ordproblem med rymdscenarier', emerging: 'l\u00f6ser enstegsuppgifter inom 10 med bildst\u00f6d', proficient: 'l\u00f6ser sj\u00e4lvst\u00e4ndigt ordproblem inom 20 med rymdtema', advanced: 'l\u00f6ser flerstegsproblem och formulerar egna rymduppdragsproblem' },
      { skill: 'L\u00e4sf\u00f6rst\u00e5else om solsystemet', emerging: '\u00e5terger ett faktum fr\u00e5n en kort text med st\u00f6d', proficient: 'svarar sj\u00e4lvst\u00e4ndigt p\u00e5 fr\u00e5gor om solsystemtexter', advanced: 'j\u00e4mf\u00f6r information fr\u00e5n tv\u00e5 texter och drar egna slutsatser' },
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
