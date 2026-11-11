#!/usr/bin/env node
/**
 * Writes the working brief for a crosswalk reviewer (Daily Teaching System, Part 2): the instructions that go with a
 * dump made by dump-for-author.js. One brief per (registry, part); the reviewer is told to read the brief and then
 * the dump it names.
 *
 *   node scripts/curricula/brief.js <registry> <name>      → out/curricula/<registry>/brief-<name>.md
 *   node scripts/curricula/brief.js --list
 *
 * What is the same for every country stands in the template below (the three relations, one right reading of the
 * official wording, no padding, how to say "nothing fits", the output file and its self-check). What a country needs
 * said stands in BRIEFS: who the reviewer is, what our years K–3 are called there, how its ids read, how its bands
 * work, where the non-language subjects go.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const BRIEFS = {
  'pt/math': { who: 'an experienced professora dos anos iniciais do Ensino Fundamental in Brazil who plans mathematics to the BNCC',
    years: 'K = the last year of the pré-escola (5 years old), 1 = 1º ano, 2 = 2º ano, 3 = 3º ano',
    ids: 'The ids are the BNCC\'s own codes. `EF01MA06` = Ensino Fundamental, 1º ano, Matemática, the 6th habilidade (the two digits are the year). `EI03ET07` = Educação Infantil, crianças pequenas (4 anos a 5 anos e 11 meses), campo "Espaços, tempos, quantidades, relações e transformações" (EO, CG, TS, EF are the other campos). An id of six characters (EF01MA, EI03ET) is the group\'s heading.',
    bands: 'The BNCC places every habilidade in ONE year. Map to the year where the BNCC puts the skill, whatever year the worksheets sit in: if a 1º ano worksheet does what the BNCC asks in the 2º ano, name the 2º ano habilidade ("teaches" if the demand is met, otherwise "prepares"). A year-K point normally "teaches" an EI03 objective and may "prepare" an EF01 habilidade.',
    routing: 'Thinking-skills points (patterns, sorting, logic) often have a real home in the BNCC (álgebra: padrões e regularidades; probabilidade e estatística; EI03ET): name it where the wording fits, and say "none" where it does not (mazes, sudoku).' },
  'pt/rest': { who: 'an experienced professora dos anos iniciais do Ensino Fundamental in Brazil who plans Língua Portuguesa, Ciências, Geografia, História and Arte to the BNCC',
    years: 'K = the last year of the pré-escola (5 years old), 1 = 1º ano, 2 = 2º ano, 3 = 3º ano',
    ids: 'The ids are the BNCC\'s own codes. `EF01LP05` = 1º ano, Língua Portuguesa; `EF12LP…` = 1º e 2º anos; `EF15LP…` = 1º ao 5º ano; `EF35LP…` = 3º ao 5º ano; CI = Ciências, GE = Geografia, HI = História, AR = Arte (EF15AR: 1º ao 5º ano). `EI03EF…` etc. = Educação Infantil, crianças pequenas (4 anos a 5 anos e 11 meses), by campo de experiências. An id of six characters is the group\'s heading.',
    bands: 'Map to the year (or block of years) where the BNCC puts the skill, whatever year the worksheets sit in. A year-K point normally "teaches" an EI03 objective and may "prepare" an EF01 or EF12 habilidade. For a language skill think of the skill as it is taught in Brazilian Portuguese (consciência fonológica, sílabas, relação fonema-grafema, ortografia, pontuação, classes de palavras), not of English spelling.',
    routing: 'Science, body, health and nature points: Ciências. Family, community, maps, places: Geografia or História. Time, calendar, "my history": História. Drawing: Arte. Feelings and living together: the campo "O eu, o outro e o nós" for year K; from the 1º ano the BNCC has no habilidade for them in these components (say none).' },
  'fr/math': { who: 'an experienced professeure des écoles in France (grande section to CE2) who plans mathematics to the programmes of 2024',
    years: 'K = the grande section of the école maternelle (5 years old), 1 = CP, 2 = CE1, 3 = CE2',
    ids: 'Ids are the registry\'s own. `MM.M4.…` and `MM.M5.…` are the objectives of the école maternelle "à partir de 4 ans" and "à partir de 5 ans" (M5 = the grande section); `M.CP.…`, `M.CE1.…`, `M.CE2.…` those of the cycle 2 by year. The text in parentheses before each objective is the theme and the part of the programme it stands under.',
    bands: 'The 2024 programme places every objective in ONE year. Map to the year where the programme puts the skill, whatever year the worksheets sit in ("teaches" if the demand is met, otherwise "prepares"). A year-K point normally "teaches" an M5 objective and may "prepare" a CP one.',
    routing: 'Thinking-skills points: name an objective only where the programme really asks for it (resolution of problems, patterns in "Organisation et gestion de données" or in the maternelle); otherwise none.' },
  'fr/rest': { who: 'an experienced professeure des écoles in France (grande section to CE2) who plans français, questionner le monde and histoire-géographie to the programmes in force',
    years: 'K = the grande section of the école maternelle (5 years old), 1 = CP, 2 = CE1, 3 = CE2',
    ids: 'Ids are the registry\'s own. `ML.M4.…`, `ML.M5.…`: the maternelle programme for language ("à partir de 4 ans", "à partir de 5 ans"; M5 = grande section). `F.CP.…`, `F.CE1.…`, `F.CE2.…`: français, cycle 2, by year (the text in parentheses is the theme, the part and sometimes the moment of the year). `QM.…`: "Questionner le monde du vivant, de la matière et des objets" of the 2020 programme, for the whole cycle 2 (A = attendu de fin de cycle, C = connaissances et compétences associées). `HG.CP.H1` etc.: the THEMES of the 2026 programme of histoire-géographie, by year (titles only).',
    bands: 'Français: every objective belongs to ONE year; map to the year where the programme puts the skill. Questionner le monde: one band for the whole cycle 2. A year-K point normally "teaches" an ML.M5 objective and may "prepare" a CP one. For a language skill think of French (correspondances graphèmes-phonèmes, syllabes, classes de mots, accords, ponctuation), not of English spelling.',
    routing: 'Science, body, health, materials, living things: QM. Family, time, calendar, maps, places: the HG theme of the right year if one fits (as "teaches" only when the theme clearly is that content, else "prepares"). Drawing and feelings: this registry holds no arts or EMC programme (say none).' },
  'es/math': { who: 'an experienced maestra in Mexico (3° de preescolar to 4° de primaria) who plans to the Plan de Estudio 2022 (Nueva Escuela Mexicana), Campo formativo Saberes y Pensamiento Científico',
    years: 'K = 3° de preescolar (5 years old), 1 = 1° de primaria, 2 = 2°, 3 = 3°',
    ids: 'Ids are the registry’s own. `F3.SPC.9` = Fase 3 (1° and 2° de primaria), Saberes y Pensamiento Científico, the 9th Contenido; `F3.SPC.9.G1.2` = the 2nd Proceso de desarrollo de aprendizaje of that contenido for PRIMER grado; `…G2…` for segundo. `F4.…` = Fase 4, with `G3` (tercero) and `G4` (cuarto). `F2.…` = Fase 2, preescolar, with `GP1`, `GP2`, `GP3` for 1°, 2° and 3° de preescolar.',
    bands: 'A Proceso de desarrollo de aprendizaje belongs to ONE grade. Map to the grade where the programme puts the skill, whatever year the worksheets sit in ("teaches" if the demand is met, otherwise "prepares"). A year-K point normally "teaches" a GP3 process (3° de preescolar) and may "prepare" a 1° de primaria one. Prefer a process (five parts) over its contenido (three parts); name a contenido only when no single process fits but the contenido clearly does.',
    routing: 'This brief holds the mathematics, science and thinking-skills points; the campo covers both mathematics and natural science (cuerpo humano, alimentación, entorno natural, materiales, fuerzas, luz y sonido). Thinking-skills points: name a process only where the wording fits (regularidades, clasificación, organización de datos); otherwise none.' },
  'es/lit': { who: 'an experienced maestra in Mexico (3° de preescolar to 4° de primaria) who plans to the Plan de Estudio 2022 (Nueva Escuela Mexicana), Campo formativo Lenguajes',
    years: 'K = 3° de preescolar (5 years old), 1 = 1° de primaria, 2 = 2°, 3 = 3°',
    ids: 'Ids are the registry’s own. `F3.LEN.2` = Fase 3 (1° and 2° de primaria), Lenguajes, the 2nd Contenido; `F3.LEN.2.G1.3` = the 3rd Proceso de desarrollo de aprendizaje of that contenido for PRIMER grado; `…G2…` for segundo. `F4.…` = Fase 4, with `G3` and `G4`. `F2.…` = Fase 2, preescolar, with `GP1`, `GP2`, `GP3`.',
    bands: 'A process belongs to ONE grade. Map to the grade where the programme puts the skill ("teaches" if the demand is met, otherwise "prepares"). A year-K point normally "teaches" a GP3 process and may "prepare" a 1° one. Prefer a process over its contenido. For a language skill think of Mexican Spanish (relación sonoro-gráfica, sílabas, mayúsculas, signos de puntuación, clases de palabras), not of English spelling. The programme is built on social practices of language, so a decoding or grammar worksheet often only "prepares" a process; say so honestly.',
    routing: 'The points of this brief are the literacy points and the drawing points: the campo Lenguajes holds the arts too (its artistic contenidos).' },
  'es/soc': { who: 'an experienced maestra in Mexico (3° de preescolar to 4° de primaria) who plans to the Plan de Estudio 2022 (Nueva Escuela Mexicana), Campos formativos Ética, Naturaleza y Sociedades and De lo Humano y lo Comunitario',
    years: 'K = 3° de preescolar (5 years old), 1 = 1° de primaria, 2 = 2°, 3 = 3°',
    ids: 'Ids are the registry’s own. `F3.ENS.4` = Fase 3 (1° and 2° de primaria), Ética, Naturaleza y Sociedades, the 4th Contenido; `F3.ENS.4.G1.2` = the 2nd Proceso de desarrollo de aprendizaje of that contenido for PRIMER grado; `…G2…` for segundo. `F4.…` = Fase 4, with `G3` and `G4`. `F2.…` = Fase 2, preescolar, with `GP1`, `GP2`, `GP3`. HC = De lo Humano y lo Comunitario.',
    bands: 'A process belongs to ONE grade. Map to the grade where the programme puts the skill ("teaches" if the demand is met, otherwise "prepares"). A year-K point normally "teaches" a GP3 process and may "prepare" a 1° one. Prefer a process over its contenido.',
    routing: 'Family, community, history, maps, rights, environment: ENS. Health, hygiene, feelings, road safety, the body in movement: HC.' },
  'nl/all': { who: 'an experienced leerkracht basisonderwijs in the Netherlands (groep 2 to 5) who knows the kerndoelen',
    years: 'K = groep 2 (kleuters, 5 years old), 1 = groep 3, 2 = groep 4, 3 = groep 5',
    ids: '`K1` to `K9`: the NEW kerndoelen Nederlands (in force since 1 August 2026); `K10` to `K18`: the new kerndoelen Rekenen en wiskunde; `K2.A` is part A of kerndoel 2 with its points a., b., c. `KD34` to `KD53`: the kerndoelen Oriëntatie op jezelf en de wereld of 2006 (mens en samenleving, natuur en techniek, ruimte, tijd); `KD54` to `KD56`: Kunstzinnige oriëntatie.',
    bands: 'Kerndoelen describe the END of primary school and place nothing in a group. So: "teaches" = the worksheets practise content that belongs to the kerndoel (a child doing them is working on that kerndoel, at the level of the group); "prepares" = a precursor that is not yet the kerndoel\'s content (kleuter readiness: sorting, matching, visual discrimination before reading); "extends" is rare. Prefer a part (K10.A) over the whole kerndoel. For a language skill think of Dutch (klank-letterkoppeling, lettergrepen, woordsoorten, hoofdletters en leestekens, spelling), not of English spelling.',
    routing: 'Science, nature, body, health, family, traffic, maps, time: the KD kerndoelen. Drawing: KD54. Thinking-skills puzzles: K15 (wiskundige denk-werkwijzen) or K13 (patronen) only where the wording fits; otherwise none.' },
  'fi/all': { who: 'an experienced Finnish luokanopettaja (esiopetus to 3. luokka) who plans to the Perusopetuksen opetussuunnitelman perusteet 2014',
    years: 'K = esiopetus (6 years old; the pre-primary year, whose own curriculum this registry does not hold), 1 = 1. luokka, 2 = 2. luokka, 3 = 3. luokka',
    ids: '`MA.1-2.T6` = matematiikka, vuosiluokat 1–2, objective T6 (T = tavoite, an objective of instruction); `MA.1-2.S2` = content area S2 (sisältöalue). `MA.3-6.…` the same for vuosiluokat 3–6. AI = suomen kieli ja kirjallisuus, YM = ympäristöoppi, KU = kuvataide. T and S with their numbers are the curriculum\'s own.',
    bands: 'The core curriculum plans in units of grades (1–2, then 3–6) and places nothing in a single year. A 1. or 2. luokka worksheet normally "teaches" a 1-2 objective or content area; a 3. luokka worksheet a 3-6 one; an esiopetus (K) point normally "prepares" a 1-2 one. Name the content area (S) that holds the content and, where one clearly fits, the objective (T). For a language skill think of Finnish (äänne–kirjain-vastaavuus, tavut, sanaluokat, iso alkukirjain ja välimerkit, oikeinkirjoitus), not of English spelling.',
    routing: 'Science, nature, body, health, family, traffic, maps, time and calendar: ympäristöoppi (YM). Drawing: kuvataide (KU). Thinking-skills puzzles: MA S1 "Ajattelun taidot" where the wording fits; otherwise none.' },
  'no/all': { who: 'an experienced Norwegian barneskolelærer (1. to 4. trinn) who plans to LK20',
    years: 'K = the last year of barnehage (5 years old; not in this registry), 1 = 1. trinn, 2 = 2. trinn, 3 = 3. trinn',
    ids: 'The ids `KM…` are Utdanningsdirektoratet\'s own codes of the competence aims. `MAT.2` = the set "kompetansemål etter 2. trinn" in matematikk (its aims cover 1. and 2. trinn), `MAT.3` after 3. trinn, `MAT.4` after 4. trinn. NOR = norsk (after 2. and 4. trinn), NAT = naturfag, SAF = samfunnsfag, MHE = mat og helse (after 4. trinn), KHV = kunst og håndverk.',
    bands: 'An aim says what a pupil can do AFTER the trinn of its set. A 1. or 2. trinn worksheet normally "teaches" an aim after 2. trinn; a 3. trinn worksheet an aim after 3. trinn (mathematics) or after 4. trinn (other subjects: "teaches" if the demand is met, otherwise "prepares"). A year-K (barnehage) point can only "prepare" an aim after 2. trinn. For a language skill think of Norwegian bokmål (lyd og bokstav, stavelser, ordklasser, stor bokstav og tegnsetting, rettskriving), not of English spelling.',
    routing: 'Science, nature, body: naturfag. Family, community, traffic, maps, time: samfunnsfag. Food and health: mat og helse or naturfag. Drawing: kunst og håndverk. Thinking-skills puzzles: a mathematics aim only where the wording fits (mønster, algoritmisk tenkning, sortering); otherwise none.' },
  'da/all': { who: 'an experienced Danish indskolingslærer (børnehaveklasse to 3. klasse) who knows Fælles Mål',
    years: 'K = børnehaveklassen (0. klasse, 6 years old), 1 = 1. klasse, 2 = 2. klasse, 3 = 3. klasse',
    ids: '`BH.0.K2` = børnehaveklassen, kompetencemål 2; `BH.0.O1` an opmærksomhedspunkt. `DAN.2.K1` = dansk, kompetencemål efter 2. klassetrin; `DAN.4…` efter 4. klassetrin; `MAT.3…` matematik efter 3. klassetrin; NT = natur/teknologi; HIS = historie; BIL = billedkunst; FAE = færdselslære; SSF = sundheds- og seksualundervisning og familiekundskab. K = kompetencemål, O = opmærksomhedspunkt.',
    bands: 'Since 2025 ONLY these few competence goals and points of attention are binding; they are broad and say what a pupil can do AFTER a klassetrin. So: "teaches" = the worksheets practise content that belongs to the goal, at the level of the class; "prepares" = a precursor that is not yet the goal\'s content. A børnehaveklasse (K) point normally "teaches" a BH goal and may "prepare" a goal efter 2. or 3. klassetrin. Expect many points to share the same goal: that is the truth of this curriculum, do not look for variety. For a language skill think of Danish (lyd og bogstav, stavelser, ordklasser, stort begyndelsesbogstav og tegnsætning, stavning), not of English spelling.',
    routing: 'Science, nature, body: natur/teknologi (or BH.0.K3 for year K). Traffic: færdselslære. Health, family, feelings: SSF (or BH.0.K6). Time and history: historie. Drawing: billedkunst (or BH.0.K4). Thinking-skills puzzles: MAT.3.K1 only where "handle hensigtsmæssigt i situationer med matematik" really fits; otherwise none.' },
  'it/all': { who: 'an experienced Italian maestra di scuola primaria (classe prima to terza) who plans to the Indicazioni nazionali per il curricolo (2012)',
    years: 'K = the last year of the scuola dell\'infanzia (5 years old; not in this registry), 1 = classe prima, 2 = classe seconda, 3 = classe terza',
    ids: 'Ids are the registry\'s own. `MAT.3.5` = matematica, the 5th objective "al termine della classe terza della scuola primaria"; `MAT.5.…` = "al termine della classe quinta". ITA = italiano, SCI = scienze, STO = storia, GEO = geografia; ART (arte e immagine) and TEC (tecnologia) have objectives for the end of classe quinta only. The text in parentheses before an objective is its nucleo.',
    bands: 'The Indicazioni state objectives for the END of classe terza (they cover classes 1 to 3) and of classe quinta, and place nothing in a single year. A worksheet of classe prima, seconda or terza normally "teaches" a classe-terza objective; if its content is asked only by the end of classe quinta, name that objective ("teaches" if the demand is met, otherwise "prepares"). A year-K (infanzia) point can only "prepare" a classe-terza objective. For a language skill think of Italian (corrispondenza suono-segno, sillabe, parti del discorso, maiuscole e punteggiatura, ortografia), not of English spelling.',
    routing: 'Science, nature, body, health: scienze. Family, time, calendar: storia. Maps, places, position in space: geografia. Drawing: arte e immagine (classe quinta: usually "prepares"). Thinking-skills puzzles: a matematica objective only where the wording fits (relazioni, dati e previsioni; classificare; regolarità); otherwise none.' },
};

/** the strand names the site shows today in a language: { "<English strand>": "<name shown>" } (read from strand-names.ts) */
function strandNames(locale) {
  const src = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'seo', 'strand-names.ts'), 'utf8').replace(/\r\n/g, '\n');
  const out = {};
  for (const block of src.split("\n  '").slice(1)) {
    const key = block.slice(0, block.indexOf("'"));
    const end = block.indexOf('\n  },');
    const body = end < 0 ? block : block.slice(0, end);
    for (const line of body.split('\n')) {
      const t = line.trim();
      if (!t.startsWith(locale + ': ')) continue;
      const q = t.charAt(locale.length + 2);
      const rest = t.slice(locale.length + 3);
      let value = '';
      for (let i = 0; i < rest.length; i++) { if (rest[i] === '\\') { value += rest[++i]; continue; } if (rest[i] === q) break; value += rest[i]; }
      out[key] = value;
    }
  }
  return out;
}

function make(reg, name) {
  const b = BRIEFS[reg + '/' + name];
  if (!b) throw new Error('no brief for ' + reg + '/' + name);
  const dump = path.join(REPO, 'out', 'curricula', reg, 'author-' + name + '.md');
  const out = path.join(REPO, 'out', 'curricula', reg, 'author-' + name + '.out.json');
  const text = fs.readFileSync(dump, 'utf8');
  const n = (text.match(/^### /gm) || []).length - (text.slice(text.indexOf('## PART 2')).match(/^### /gm) || []).length;
  const kb = Math.round(text.length / 1024);
  // one more question for the reviewer: the names of the strands the site shows in this language today
  const names = strandNames(reg.split('-')[0]);
  const tick = String.fromCharCode(96);
  const strands = !Object.keys(names).length ? '' : [
    '## One more question: the names of our strands',
    '',
    'On its pages the site shows, beside each activity, the name of the part of the curriculum it belongs to. These are the names shown today in your language (left: our internal English name; right: what a teacher sees):',
    '',
    ...Object.entries(names).map(([k, v]) => '- ' + k + ' → "' + v + '"'),
    '',
    'For the strands of the subjects in THIS brief only, say whether the name is the one your curriculum (the documents in PART 2) uses for that part, or a name a teacher in your country would find wrong or foreign. Add to your JSON file a key ' + tick + '"strandNames"' + tick + ': an object with one entry per strand you judged, either ' + tick + '{"keep": true}' + tick + ' or ' + tick + '{"change": "<the name your curriculum uses>", "why": "<one sentence, naming the heading of PART 2 that proves it>"}' + tick + '. Change a name only when PART 2 proves another one; a name that is not word for word a heading but that every teacher uses stays.',
    '',
  ].join('\n');
  const md = `# Brief: the crosswalk of registry \`${reg}\` (part "${name}")

You are ${b.who}. Your job: for each "teaching point" of a worksheet site, say which objectives of your curriculum it teaches, prepares or extends. This is a careful reading task. Do it yourself: do not launch other agents, and run no script other than a short one to check your own output file.

## What to read

Read this file COMPLETELY (about ${kb} KB; read it in parts with the Read tool until you have seen all of it):

\`${dump}\`

- **PART 1** lists ${n} teaching points. Each has an id such as \`K:count-how-many\`, the year the worksheets sit in, a subject and the skill in one English line. The years are counted the American way: ${b.years}. The site makes the same worksheet types in your language for your schools.
- **PART 2** lists every objective that may be used, with the official wording. ${b.ids}

## How your curriculum places things

${b.bands}

## The three relations

- **teaches**: a child who does these worksheets does what the objective asks (or a clearly stated part of it), at the level the objective belongs to.
- **prepares**: the worksheets are a step BEFORE the objective (readiness, a smaller number range, the idea before its formal form).
- **extends**: the worksheets go beyond the objective on the same line of learning.

## Rules

1. Decide only from the official wording in PART 2, never from memory of the curriculum. Use only ids that appear in PART 2, written exactly.
2. Write rows for EVERY one of the ${n} points. Prefer the most exact objective. Usually 1 to 3 rows per point, never more than 5. Do not pad: every row must be defensible to a colleague who reads the wording.
3. ${b.routing}
4. If nothing in PART 2 fits (many puzzles and mazes; English-only spelling patterns with no counterpart in your language; a subject this registry does not hold), give no rows: \`{"rows": [], "none": "<one short reason>"}\`. Do not force a fit.
5. A worksheet is paper or a screen page a child works alone: an objective about speaking, listening, discussing, investigating, building or playing is at most "prepares" unless the worksheet's skill is the content the objective names.
6. Mind the details of the wording (number ranges, units, the kinds of words or texts named) against the skill line. Where the skill line does not give them, judge by the year the worksheets sit in and say so in the reason.
7. Write every "why" and every note in English (the site's owner reads English); quote the official wording in its own language where it decides.

## What to write

ONE JSON file, with the Write tool, at

\`${out}\`

in exactly this shape:

\`\`\`json
{
 "points": {
  "<point id>": { "rows": [ { "id": "<an id of PART 2>", "rel": "teaches" } ], "why": "one or two sentences: what in the wording decides it" },
  "<point id>": { "rows": [], "none": "<one short reason>", "why": "…" }
 },
 "notes": [ "things the site's owner should know, each one or two sentences: skills your curriculum places in another year than the worksheets, content of these years that no teaching point covers and that teachers will look for, points whose skill line was too vague or too English to place" ]
}
\`\`\`

All ${n} point ids of PART 1 must be keys of "points", each with a "why". Before you finish, check with a short node command that the file parses as JSON, holds ${n} points whose keys are exactly the ids of PART 1 (the lines starting with "### " in PART 1), and that every row id is written in PART 2 (search the dump for the id followed by " ["). Fix anything that fails.

${strands}
Your final message: one line saying the file is written, how many points have rows and how many have none.
`;
  const f = path.join(REPO, 'out', 'curricula', reg, 'brief-' + name + '.md');
  fs.writeFileSync(f, md);
  console.log(path.relative(REPO, f) + ' (' + n + ' points, dump ' + kb + ' KB)');
}

const [reg, name] = process.argv.slice(2);
if (reg === '--list') { for (const k of Object.keys(BRIEFS)) console.log(k); process.exit(0); }
if (reg === '--all') { for (const k of Object.keys(BRIEFS)) { const [r, n] = k.split('/'); try { make(r, n); } catch (e) { console.log('skip ' + k + ': ' + e.message.split('\n')[0]); } } process.exit(0); }
make(reg, name);
