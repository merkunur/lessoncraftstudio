#!/usr/bin/env node
/**
 * verify-b3-verb-forms.js — the G2-317 `verb-forms` gate (design §5).
 *
 *   node qa/verify-b3-verb-forms.js [--quick] [--locales=en] [--seeds=N]
 *
 * Own ground truth: the gate reads data/b3/verb-forms.js DIRECTLY (never the
 * spec's helpers), re-implements the validator's verb-forms rules (§5 rules
 * 1-10) for ANY locale block, and renders through the REAL pipeline
 * (render/render-instance.js, file:// fonts). Every stamped form on a page is
 * re-derived in node from bank.verbs[inf].forms[unit][col] — "diff, not
 * trust"; 0 cells checked = FAIL.
 *
 * Sections
 *   A  bank data (per locale block; the fixtures below are checked the same
 *      way as controls): mode/columns/units/exemplar; every verb + core verb a
 *      non-empty letters-only form for EVERY column of EVERY unit (an array or
 *      a duplicate infinitive = "two forms for one cell"); inf = a
 *      word-classes citation form; pic in the 9-picture ALLOWLIST + opened +
 *      colour-index candidate + no BW marker (an object picture = "not an
 *      action"); matchPersons pairwise-distinct forms per verb (a verb may opt
 *      out with match:false); tense: present !== infinitive, past !==
 *      present, past === infinitive is an ANCHOR (reported); persons: >= 3
 *      non-anchor rows for a regular verb; frames ({form} once, no other slot,
 *      col + unit + fits known, subjectLiteral inside, <= 44 chars, de/nl
 *      third-person frames carry a SENTENCES name and never a bare sie/zij =
 *      "ambiguous person"); Face 6: every form maps to ONE infinitive, no
 *      nounHomographs token in a frame; Face 5: verbs with >= 3 distinct forms
 *      (those below are reported as F5-excluded; < 8 = the face refuses);
 *      floors (regular >= 6 with >= 3 pictured, core >= 2, frames >= 10 with
 *      >= 4 pictured fits, matchPersons >= 3 or tense) — REFUSALS reported for
 *      a non-en block, FAIL for en (the control locale ships every face);
 *      sv/da/no + en must be mode 'tense' ("no person marking"); strings
 *      (6 titles <= 70, no worksheet word, unique; instructions <= 150 with an
 *      end mark; no free claim; spec.i18n.en === strings['G2-317']).
 *   B  pictures: the 9 allowlist files on disk, every pinned picture opened.
 *   C  renders (real pipeline): en d1/d2/d3, WORST chrome (3-line title +
 *      3-line instruction → the 722 floor) × d1-d3, the de persons fixture ×
 *      d1-d3, seed sweep on en d2 (+ de d2). Each render: lints clean ·
 *      verify() empty · every picture >= 36 (G2 floor) · every table row >= 36
 *      · every gap box == boxH and >= 36 high, inside its cell · no label /
 *      form / column label overflows its grid cell (scrollWidth <= clientWidth,
 *      inside the row) · lane text <= 2 lines · every lane picture 56 · tables
 *      + lanes inside the body · node re-derivation of EVERY cell (form ===
 *      bank, anchor iff form === inf) and EVERY lane (frame text === bank,
 *      col/fits/form === bank) · non-vacuity. Sweep: every eligible verb
 *      appears, both columns take gaps, the gap set is not constant, lane
 *      frames vary.
 *   D  poisons (each must FAIL; the correct bank / page is the control): P1
 *      de backen twice (bäckt / backt) · P2 fr courir in the CE1 regular pool ·
 *      P3 es matchPersons with ustedes AND ellos · P4 en gapping past `read` ·
 *      P5 de `Sie {form} im Park.` · P5b nl `Zij {form} in het park.` · P7
 *      activities/painting on malen · P8 sv mode:'persons' · P9 de givens
 *      ich+du on one table (hard gaps 2 < 3) · P11 de matchPersons ich du er
 *      ihr on malen · P12 a hand-edited gap form (node re-derivation) · P12b a
 *      hand-edited given text · P13 a 22-letter infinitive (label overflow) ·
 *      P14 pictures squashed below 36 · P15 an empty table (non-vacuity) · P16
 *      an unfilled {form} in a lane · P17 a lane sentence printing its form ·
 *      P18 a 5-pictured-verb pool (refused at build) · P19 a worksheet-word
 *      title · P20 a free claim in the instruction · P21 the old 760 stack
 *      under the worst chrome · P22 a verb twice on the page · P23 a lane on an
 *      anchor cell · P24 a hand-edited frame text · P25 an object picture on
 *      an en verb. P6 + P10 (deferred by the base) land in section F.
 *   F  the faces (Phase 2; `renderFace` / `renderIrregular` / `runFaces`):
 *      G2-334 match · G2-335 sentences · G2-336 irregular · G2-337 choice ·
 *      G2-338 hunt. One source (spec i18n.en === bank strings.F2..F6, themeless,
 *      unitAxis kept). Renders through the REAL pipeline: en (shipped chrome +
 *      the WORST chrome) · the de persons fixture (+ core frames d15-d20 for
 *      F4's lanes) · the nl fixture (3 pictured regular verbs → the F2 STACK
 *      variant). Per render: lints + verify() + geometry (every block / row
 *      inside the body, items >= 36 with their text inside, the two dot columns
 *      >= 6 px apart, lane pictures 56, pills == pillH >= 36 inside their row,
 *      the choice sentence ONE line at the worst chrome, the hunt box == infBox)
 *      + the Node re-derivation of EVERY stamp (left labels / right forms /
 *      roles / lanes / pills ⊆ paradigm / the hunt form's owner + no other bank
 *      form printed) + the STEM BOT on the tense match (longest-common-prefix,
 *      a tie = a miss; must score < n/n) + non-vacuity. Seed sweep per face
 *      (pages / orders / verbs / frames vary; idx covers 0..2). Poisons (each
 *      must FAIL; the un-poisoned render is the control): P10 the present
 *      distractors stripped → stem bot n/n · P6 a pill outside the paradigm ·
 *      PF2a a target level with its verb (derangement) · PF2b a hand-edited
 *      right form · PF2c the infinitive printed on the right · PF2d a persons
 *      row without its form · PF3a a chip ≠ the infinitive · PF3b a verb twice
 *      · PF3c a lane printing its form · PF4a a table verb outside the core ·
 *      PF4b 3 tables over a 2-verb core (refused) · PF5a the correct pill always
 *      first · PF5b two identical pills · PF5c the sentence printing a candidate
 *      · PF5d idx ≠ DOM · PF6a the answer box carrying text · PF6b the form
 *      removed · PF6c a noun-homograph token · PF6d a hand-edited inf stamp ·
 *      PF6e a second bank form printed · PF1 a pill squashed below 36 · PB1 F5
 *      rowMin 120 under the worst chrome · PB2 F2 left items 130 high · PB3 a
 *      pictured floor of 7 over 6 pictured verbs · PB4 9 candidates over 8 rows.
 * Exit 1 on any real failure OR any silent poison. Final line:
 *   G2-317 gate: PASS (N assertions, M/M poisons killed; …)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { fileUri } = require('../lib/b2-common.js');
const { candidates } = require('../lib/b3-picture-index.js');
const { slotsIn } = require('../lib/b3-instructions.js');
const { SENTENCES } = require('../data/b2/sentences.js');
const { WORD_CLASSES } = require('../data/b2/word-classes.js');
const freeClaim = require('../../lib/free-claim.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'g2317-gate');
const BANK_FILE = path.join(ROOT, 'data', 'b3', 'verb-forms.js');
const ID = 'G2-317';

const ALLOWLIST = new Set(['activities/running', 'activities/reading', 'activities/jumping', 'activities/dancing', 'activities/hiking', 'activities/writing', 'activities/baking', 'occupations/singer', 'occupations/artist']);
const OBJECTS = new Set(['activities/swimming', 'activities/singing', 'activities/painting', 'activities/playground', 'occupations/athlete']);
const ELEMENT_FLOOR = 36;   // G23 minElement (_tokens.js)
const BOX_FLOOR = 22;       // G23 fontChoice — the answer floor
const LANE_PIC = 56;
const FRAME_CAP = 44;
const LANE_TEXT_MAX_H = 72;   // two lines (a box line 38 + a text line 25 + slack)
const TENSE_LOCALES = new Set(['en', 'sv', 'da', 'no']);
const NAME_LOCALES = new Set(['de', 'nl']);
const FIRST_SECOND = new Set(['ich', 'du', 'wir', 'ihr', 'ik', 'jij', 'wij', 'jullie']);
const AMBIG = { de: /(?<!\p{L})sie(?!\p{L})/iu, nl: /(?<!\p{L})zij(?!\p{L})/iu };
const WORKSHEET_WORD = /\b(worksheet|arbeitsblatt|hoja de trabajo|folha de exerc|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtäväpaperi)/i;
const FORM_RE = /^[\p{L}' ]+$/u;
const FACES = ['G2-317', 'F2', 'F3', 'F4', 'F5', 'F6'];
const WORST_BODY = 710;   // MEASURED (this gate + G1-308's): a 3-line title + 3-line instruction leave 710, not the README's 722 — every stack budgets 710

// WORST chrome: a 70-char title (3 lines at ~24 chars/line) + a legal (<= 150) instruction whose long words wrap it to THREE lines
const WORST_CHROME = {
  title: 'Verb Forms for Beginners: Today and Yesterday in Every Sentence',
  instruction: 'Betrachte die Bilderreihe und beginne bei der Startfahne. Lies jeden Anweisungssatz aufmerksam und führe ihn mit dem Bleistift genau aus. Hake ab.',
};

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const QUICK = flags.has('--quick');

function loadBank() { delete require.cache[require.resolve(BANK_FILE)]; const m = require(BANK_FILE); return m[Object.keys(m)[0]]; }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function fold(s) { return String(s || '').trim().toLocaleLowerCase(); }
function toks(s) { return fold(s).split(/[^\p{L}']+/u).filter(Boolean); }
function picPath(theme, noun) { return decodeURIComponent(new URL(fileUri(theme, noun)).pathname.replace(/^\/([A-Za-z]:)/, '$1')); }

/* ---------------- fixtures: persons-mode blocks the panels have NOT authored; gate-only, never shipped ---------------- */
const P = (ich, du, er, wir, ihr, sie) => ({ praesens: { ich, du, er, wir, ihr, sie } });
const DE_COLS = [{ key: 'ich', label: 'ich' }, { key: 'du', label: 'du' }, { key: 'er', label: 'er/sie/es' }, { key: 'wir', label: 'wir' }, { key: 'ihr', label: 'ihr' }, { key: 'sie', label: 'sie' }];
const dv = (inf, forms, o = {}) => ({ inf, group: o.irregular ? 'stark' : 'regular', irregular: !!o.irregular, gradation: false, tier: 1, pic: o.pic || null, picOpened: !!o.pic, labelOverride: {}, match: o.match !== false, forms });
const SYNTH_DE = {
  head: 'Personalformen der Verben', mode: 'persons', band: 'G2', exemplar: 'praesens', columns: DE_COLS,
  units: [{ key: 'praesens', kind: 'tense', label: 'Präsens', band: 'G2' }],
  poolMap: {}, matchPersons: ['ich', 'du', 'er', 'wir'],
  verbs: [
    dv('laufen', P('laufe', 'läufst', 'läuft', 'laufen', 'lauft', 'laufen'), { irregular: true, pic: { theme: 'activities', noun: 'running' } }),
    dv('malen', P('male', 'malst', 'malt', 'malen', 'malt', 'malen'), { pic: { theme: 'occupations', noun: 'artist' } }),
    dv('tanzen', P('tanze', 'tanzt', 'tanzt', 'tanzen', 'tanzt', 'tanzen'), { pic: { theme: 'activities', noun: 'dancing' }, match: false }),   // du tanzt = er tanzt: no Face-2 row
    dv('singen', P('singe', 'singst', 'singt', 'singen', 'singt', 'singen'), { pic: { theme: 'occupations', noun: 'singer' } }),
    dv('springen', P('springe', 'springst', 'springt', 'springen', 'springt', 'springen'), { pic: { theme: 'activities', noun: 'jumping' } }),
    dv('lesen', P('lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'), { irregular: true, pic: { theme: 'activities', noun: 'reading' } }),
    dv('wandern', P('wandere', 'wanderst', 'wandert', 'wandern', 'wandert', 'wandern'), { pic: { theme: 'activities', noun: 'hiking' } }),
    dv('backen', P('backe', 'backst', 'backt', 'backen', 'backt', 'backen'), { pic: { theme: 'activities', noun: 'baking' } }),
    dv('spielen', P('spiele', 'spielst', 'spielt', 'spielen', 'spielt', 'spielen')),
    dv('lachen', P('lache', 'lachst', 'lacht', 'lachen', 'lacht', 'lachen')),
    dv('bauen', P('baue', 'baust', 'baut', 'bauen', 'baut', 'bauen')),
    dv('schlafen', P('schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft', 'schlafen'), { irregular: true }),
  ],
  irregularCore: [
    { inf: 'sein', pic: null, forms: P('bin', 'bist', 'ist', 'sind', 'seid', 'sind') },
    { inf: 'haben', pic: null, forms: P('habe', 'hast', 'hat', 'haben', 'habt', 'haben') },
  ],
  frames: [
    { id: 'd01', text: 'Jeden Sonntag {form} Emma im Park.', col: 'er', unit: 'praesens', fits: ['laufen', 'tanzen', 'singen', 'spielen', 'wandern', 'springen', 'malen'], subjectLiteral: 'Emma', pic: null },
    { id: 'd02', text: 'Heute {form} ich mit Ben.', col: 'ich', unit: 'praesens', fits: ['spielen', 'tanzen', 'singen', 'laufen', 'springen', 'lesen', 'malen', 'wandern', 'backen'], subjectLiteral: 'ich', pic: null },
    { id: 'd03', text: 'Nach der Schule {form} du zu Hause.', col: 'du', unit: 'praesens', fits: ['malen', 'lesen', 'spielen', 'singen', 'tanzen', 'backen', 'bauen'], subjectLiteral: 'du', pic: null },
    { id: 'd04', text: 'Am Montag {form} wir im Garten.', col: 'wir', unit: 'praesens', fits: ['spielen', 'tanzen', 'singen', 'laufen', 'springen', 'malen', 'lesen', 'wandern', 'bauen'], subjectLiteral: 'wir', pic: null },
    { id: 'd05', text: 'Ihr {form} jeden Tag im Park.', col: 'ihr', unit: 'praesens', fits: ['laufen', 'spielen', 'tanzen', 'singen', 'springen', 'wandern'], subjectLiteral: 'Ihr', pic: null },
    { id: 'd06', text: 'Emma und Ben {form} im Wald.', col: 'sie', unit: 'praesens', fits: ['laufen', 'wandern', 'spielen', 'singen', 'springen'], subjectLiteral: 'Emma und Ben', pic: null },
    { id: 'd07', text: 'Am Abend {form} Ben ein Buch.', col: 'er', unit: 'praesens', fits: ['lesen'], subjectLiteral: 'Ben', pic: null },
    { id: 'd08', text: 'Ich {form} ein buntes Bild.', col: 'ich', unit: 'praesens', fits: ['malen'], subjectLiteral: 'Ich', pic: null },
    { id: 'd09', text: 'Du {form} sehr schnell.', col: 'du', unit: 'praesens', fits: ['laufen', 'springen', 'tanzen', 'lesen', 'malen', 'singen', 'backen'], subjectLiteral: 'Du', pic: null },
    { id: 'd10', text: 'Wir {form} ein lustiges Lied.', col: 'wir', unit: 'praesens', fits: ['singen'], subjectLiteral: 'Wir', pic: null },
    { id: 'd11', text: 'Mia und Lea {form} im Garten.', col: 'sie', unit: 'praesens', fits: ['spielen', 'tanzen', 'singen', 'malen', 'lesen', 'springen', 'laufen', 'wandern'], subjectLiteral: 'Mia und Lea', pic: null },
    { id: 'd12', text: 'Ihr {form} am Sonntag im Park.', col: 'ihr', unit: 'praesens', fits: ['laufen', 'spielen', 'tanzen', 'singen', 'springen', 'wandern', 'lesen', 'malen'], subjectLiteral: 'Ihr', pic: null },
    { id: 'd13', text: 'Am Samstag {form} Lina einen Kuchen.', col: 'er', unit: 'praesens', fits: ['backen'], subjectLiteral: 'Lina', pic: null },
    { id: 'd14', text: 'Heute {form} ich ein Haus.', col: 'ich', unit: 'praesens', fits: ['bauen', 'malen'], subjectLiteral: 'ich', pic: null },
    // Phase 2: frames the core (sein / haben) fills — Face 4's lanes; fits name core verbs only
    { id: 'd15', text: 'Heute {form} ich zu Hause.', col: 'ich', unit: 'praesens', fits: ['sein'], subjectLiteral: 'ich', pic: null },
    { id: 'd16', text: 'Emma {form} einen kleinen Hund.', col: 'er', unit: 'praesens', fits: ['haben'], subjectLiteral: 'Emma', pic: null },
    { id: 'd17', text: 'Du {form} ein rotes Rad.', col: 'du', unit: 'praesens', fits: ['haben'], subjectLiteral: 'Du', pic: null },
    { id: 'd18', text: 'Wir {form} heute im Garten.', col: 'wir', unit: 'praesens', fits: ['sein'], subjectLiteral: 'Wir', pic: null },
    { id: 'd19', text: 'Ben und Mia {form} müde.', col: 'sie', unit: 'praesens', fits: ['sein'], subjectLiteral: 'Ben und Mia', pic: null },
    { id: 'd20', text: 'Ihr {form} viele Bücher.', col: 'ihr', unit: 'praesens', fits: ['haben'], subjectLiteral: 'Ihr', pic: null },
  ],
  hunt: { nounHomographs: ['Tanz', 'Spiel'] },
  strings: {
    'G2-317': { title: 'Personalformen der Verben', instruction: 'Sieh dir das Bild an und lies das Verb. Schreibe die fehlenden Formen in die gestrichelten Kästchen und ergänze dann die Sätze.' },
    F2: { title: 'Pronomen und Verbform zuordnen', instruction: 'Verbinde jedes Pronomen mit der passenden Verbform.' },
    F3: { title: 'Sätze mit Verbformen ergänzen', instruction: 'Schreibe die passende Form des Verbs in die Lücke.' },
    F4: { title: 'Sein und haben im Präsens', instruction: 'Schreibe alle Formen von sein und haben in die Kästchen.' },
    F5: { title: 'Die richtige Verbform wählen', instruction: 'Kreise die Form ein, die in den Satz passt.' },
    F6: { title: 'Das Verb finden und die Grundform schreiben', instruction: 'Unterstreiche das Verb und schreibe seine Grundform in das Kästchen.' },
  },
};
const SYNTH_ES = {
  head: 'Conjugar verbos en presente', mode: 'persons', band: 'G2', exemplar: 'presente',
  columns: [{ key: 'yo', label: 'yo' }, { key: 'tu', label: 'tú' }, { key: 'el', label: 'él/ella' }, { key: 'nosotros', label: 'nosotros' }, { key: 'ustedes', label: 'ustedes' }, { key: 'ellos', label: 'ellos/ellas' }],
  units: [{ key: 'presente', kind: 'tense', label: 'Presente', band: 'G2' }], poolMap: {}, matchPersons: ['yo', 'tu', 'el', 'nosotros', 'ellos'],
  verbs: [{ inf: 'cantar', group: 'ar', irregular: false, gradation: false, tier: 1, pic: { theme: 'occupations', noun: 'singer' }, picOpened: true, labelOverride: {}, forms: { presente: { yo: 'canto', tu: 'cantas', el: 'canta', nosotros: 'cantamos', ustedes: 'cantan', ellos: 'cantan' } } }],
  irregularCore: [], frames: [], hunt: { nounHomographs: [] }, strings: {},
};
const SYNTH_FR = {
  head: 'Conjugaison au présent : verbes en -er', mode: 'persons', band: 'G2', exemplar: 'er',
  columns: [{ key: 'je', label: 'je' }, { key: 'tu', label: 'tu' }, { key: 'il', label: 'il/elle' }, { key: 'nous', label: 'nous' }, { key: 'vous', label: 'vous' }, { key: 'ils', label: 'ils/elles' }],
  units: [{ key: 'er', kind: 'group', label: 'verbes en -er', band: 'G2' }, { key: 'ir', kind: 'group', label: 'verbes en -ir', band: 'G3' }], poolMap: {}, irregularGroups: ['3e'], matchPersons: ['je', 'tu', 'nous', 'vous', 'ils'],
  verbs: [
    { inf: 'sauter', group: 'er', irregular: false, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'jumping' }, picOpened: true, labelOverride: {}, forms: { er: { je: 'saute', tu: 'sautes', il: 'saute', nous: 'sautons', vous: 'sautez', ils: 'sautent' }, ir: { je: 'saute', tu: 'sautes', il: 'saute', nous: 'sautons', vous: 'sautez', ils: 'sautent' } } },
    { inf: 'courir', group: '3e', irregular: true, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'running' }, picOpened: true, labelOverride: {}, forms: { er: { je: 'cours', tu: 'cours', il: 'court', nous: 'courons', vous: 'courez', ils: 'courent' }, ir: { je: 'cours', tu: 'cours', il: 'court', nous: 'courons', vous: 'courez', ils: 'courent' } } },
  ],
  irregularCore: [], frames: [], hunt: { nounHomographs: [] }, strings: {},
};
const SYNTH_NL = {
  head: 'De persoonsvorm: stam + t', mode: 'persons', band: 'G2', exemplar: 'tt',
  columns: [{ key: 'ik', label: 'ik' }, { key: 'jij', label: 'jij' }, { key: 'hij', label: 'hij/zij' }, { key: 'wij', label: 'wij' }, { key: 'jullie', label: 'jullie' }, { key: 'zij', label: 'zij' }],
  units: [{ key: 'tt', kind: 'tense', label: 'tegenwoordige tijd', band: 'G2' }], poolMap: {}, matchPersons: ['ik', 'jij', 'wij'],
  verbs: [
    { inf: 'lopen', group: 'regular', irregular: false, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'hiking' }, picOpened: true, labelOverride: {}, forms: { tt: { ik: 'loop', jij: 'loopt', hij: 'loopt', wij: 'lopen', jullie: 'lopen', zij: 'lopen' } } },
    // Phase 2: two more pictured regular verbs so the Face 2 STACK variant (3 blocks × 3 persons) renders from this fixture
    { inf: 'rennen', group: 'regular', irregular: false, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'running' }, picOpened: true, labelOverride: {}, forms: { tt: { ik: 'ren', jij: 'rent', hij: 'rent', wij: 'rennen', jullie: 'rennen', zij: 'rennen' } } },
    { inf: 'dansen', group: 'regular', irregular: false, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'dancing' }, picOpened: true, labelOverride: {}, forms: { tt: { ik: 'dans', jij: 'danst', hij: 'danst', wij: 'dansen', jullie: 'dansen', zij: 'dansen' } } },
  ],
  irregularCore: [],
  frames: [{ id: 'n01', text: 'Emma {form} in het park.', col: 'hij', unit: 'tt', fits: ['lopen', 'rennen', 'dansen'], subjectLiteral: 'Emma', pic: null }],
  hunt: { nounHomographs: [] }, strings: {},
};
const SYNTH_SV = {
  head: 'Verb: presens och preteritum', mode: 'tense', band: 'G3', exemplar: 'nu-igar',
  columns: [{ key: 'pres', label: 'nu' }, { key: 'past', label: 'i går' }],
  units: [{ key: 'nu-igar', kind: 'tense', label: 'nu och i går', band: 'G3' }], poolMap: { regular: 'weak' }, matchPersons: [],
  verbs: [{ inf: 'hoppa', group: 'weak', irregular: false, gradation: false, tier: 1, pic: { theme: 'activities', noun: 'jumping' }, picOpened: true, labelOverride: {}, forms: { 'nu-igar': { pres: 'hoppar', past: 'hoppade' } } }],
  irregularCore: [], frames: [], hunt: { nounHomographs: [] }, strings: {},
};

/* ---------------- A. bank data (pure node; any locale block) ---------------- */
function checkBank(cfg, loc, spec) {
  const F = [];
  const L = String(loc);
  const report = [];
  const strict = L === 'en';
  if (!['persons', 'tense'].includes(cfg.mode)) F.push(`A ${L}: mode "${cfg.mode}"`);
  if (TENSE_LOCALES.has(L) && cfg.mode !== 'tense') F.push(`A ${L}: mode "${cfg.mode}" — ${L} verbs carry no person marking; the base is the tense table`);
  if (!['G2', 'G3'].includes(cfg.band)) F.push(`A ${L}: band "${cfg.band}"`);
  const cols = Array.isArray(cfg.columns) ? cfg.columns : [];
  const colKeys = cols.map((c) => c.key);
  if (cols.length < 2) F.push(`A ${L}: ${cols.length} columns`);
  if (cfg.mode === 'tense' && cols.length !== 2) F.push(`A ${L}: tense mode needs exactly two columns (pres, past)`);
  if (cfg.mode === 'tense' && (colKeys[0] !== 'pres' || colKeys[1] !== 'past')) F.push(`A ${L}: tense columns must be pres, past`);
  for (const c of cols) if (!c.key || !c.label) F.push(`A ${L}: a column without key/label`);
  if (new Set(colKeys).size !== colKeys.length) F.push(`A ${L}: duplicate column keys`);
  const units = Array.isArray(cfg.units) ? cfg.units : [];
  if (!units.length) F.push(`A ${L}: no units`);
  for (const u of units) { if (!u.key || !['tense', 'group'].includes(u.kind)) F.push(`A ${L}: unit ${u.key} kind "${u.kind}"`); if (!['G2', 'G3'].includes(u.band)) F.push(`A ${L}: unit ${u.key} band "${u.band}"`); if (!u.label) F.push(`A ${L}: unit ${u.key} has no label`); }
  if (!units.some((u) => u.key === cfg.exemplar)) F.push(`A ${L}: exemplar "${cfg.exemplar}" is not a unit`);
  for (const [k, v] of Object.entries(cfg.poolMap || {})) if (!['all', 'regular', 'weak', 'noGradation'].includes(v) || !['regular', 'all'].includes(k)) F.push(`A ${L}: poolMap ${k} → ${v}`);
  const verbs = Array.isArray(cfg.verbs) ? cfg.verbs : [];
  const core = Array.isArray(cfg.irregularCore) ? cfg.irregularCore : [];
  const citation = new Set(((WORD_CLASSES[L] || {}).verbs || []).map((v) => fold(v.w)));
  // (1) every verb + core verb: a non-empty letters-only form per column per unit; a duplicate inf = two forms for one cell
  const seenInf = new Map();
  for (const v of [...verbs, ...core]) {
    if (!v.inf || typeof v.inf !== 'string') { F.push(`A ${L}: a verb without inf`); continue; }
    if (seenInf.has(fold(v.inf))) {
      const other = seenInf.get(fold(v.inf));
      for (const u of units) for (const c of colKeys) { const a = other.forms && other.forms[u.key] && other.forms[u.key][c], b = v.forms && v.forms[u.key] && v.forms[u.key][c]; if (a !== b) F.push(`A ${L}: two forms for one cell — ${v.inf}/${u.key}/${c}: "${a}" and "${b}"`); }
      if (!units.length) F.push(`A ${L}: two forms for one cell — ${v.inf} listed twice`);
    } else seenInf.set(fold(v.inf), v);
    for (const u of units) {
      if (u.kind === 'group' && verbs.includes(v) && v.group !== u.key) continue;   // a group unit only needs the forms of its own verbs
      const f = v.forms && v.forms[u.key];
      if (!f) { F.push(`A ${L}: ${v.inf} has no forms for unit ${u.key}`); continue; }
      for (const c of colKeys) {
        const x = f[c];
        if (Array.isArray(x)) { F.push(`A ${L}: two forms for one cell — ${v.inf}/${u.key}/${c}: ${JSON.stringify(x)}`); continue; }
        if (typeof x !== 'string' || !x.length) { F.push(`A ${L}: ${v.inf}/${u.key}/${c} is empty`); continue; }
        if (!FORM_RE.test(x)) F.push(`A ${L}: ${v.inf}/${u.key}/${c} "${x}" is not letters`);
      }
    }
  }
  for (const v of verbs) {
    if (citation.size && !citation.has(fold(v.inf))) F.push(`A ${L}: "${v.inf}" is not a word-classes citation form`);
    if (typeof v.irregular !== 'boolean' || typeof v.gradation !== 'boolean') F.push(`A ${L}: ${v.inf} irregular/gradation must be booleans`);
    if ((cfg.irregularGroups || []).includes(v.group) && !v.irregular) F.push(`A ${L}: "${v.inf}" is ${v.group} groupe (${cfg.irregularGroups.join('/')}) but sits in the regular pool`);
    // (2) picture
    if (v.pic) {
      const key = `${v.pic.theme}/${v.pic.noun}`;
      if (OBJECTS.has(key) || !ALLOWLIST.has(key)) F.push(`A ${L}: ${v.inf} pic ${key} — picture is not an action (allowlist of 9)`);
      else {
        if (v.picOpened !== true) F.push(`A ${L}: ${v.inf} pic ${key} not opened`);
        if (/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i.test(v.pic.theme)) F.push(`A ${L}: ${v.inf} pic ${key} carries a B&W marker`);
        if (!candidates(v.pic.noun, L).some((c) => c.theme === v.pic.theme && c.noun === v.pic.noun)) F.push(`A ${L}: ${v.inf} pic ${key} is not a colour-index candidate`);
        if (!fs.existsSync(picPath(v.pic.theme, v.pic.noun))) F.push(`A ${L}: ${v.inf} pic ${key} is not on disk`);
      }
    }
    const ex = v.forms && v.forms[cfg.exemplar];
    if (!ex) continue;
    if (cfg.mode === 'tense') {
      // (3) tense: present !== infinitive; past !== present; past === inf is an ANCHOR (reported); a verb keeps >= 1 gappable cell
      if (fold(ex.pres) === fold(v.inf)) F.push(`A ${L}: ${v.inf} present equals the infinitive (no cell to gap)`);
      if (fold(ex.pres) === fold(ex.past)) F.push(`A ${L}: ${v.inf} past equals present "${ex.past}"`);
      if (fold(ex.past) === fold(v.inf)) report.push(`${v.inf}: past === infinitive → anchor`);
    } else {
      // (3) matchPersons pairwise distinct (unless the verb opts out); (4) >= 3 non-anchor rows for a regular verb
      const mp = Array.isArray(cfg.matchPersons) ? cfg.matchPersons : [];
      for (const m of mp) if (!colKeys.includes(m)) F.push(`A ${L}: matchPersons "${m}" is not a column`);
      if (v.match !== false && !v.irregular) {   // Face 2 draws the regular pool; an irregular verb joins it only by the panel's per-verb call
        const seen = new Map();
        for (const m of mp) { const f = fold(ex[m]); if (seen.has(f)) F.push(`A ${L}: ${v.inf} matchPersons ${seen.get(f)}+${m} — duplicate form "${ex[m]}"`); seen.set(f, m); }
      }
      const nonAnchor = colKeys.filter((c) => fold(ex[c]) !== fold(v.inf)).length;
      if (nonAnchor < 3 && !v.irregular) F.push(`A ${L}: ${v.inf} keeps ${nonAnchor} non-anchor rows < 3 — leave the regular pool`);
    }
  }
  for (const c of core) if (c.pic) F.push(`A ${L}: core verb ${c.inf} carries a picture (chip-only headers)`);
  // (5) frames
  const frames = Array.isArray(cfg.frames) ? cfg.frames : [];
  const known = new Set([...verbs, ...core].map((v) => fold(v.inf)));
  const names = new Set(((SENTENCES[L] && SENTENCES[L].names) || []).map(fold));
  const ids = new Set();
  const homos = new Set(((cfg.hunt && cfg.hunt.nounHomographs) || []).map(fold));
  for (const f of frames) {
    const T = `A ${L}: frame ${f.id}`;
    if (!f.id || ids.has(f.id)) F.push(`${T}: missing/duplicate id`);
    ids.add(f.id);
    const s = slotsIn(f.text || '');
    if (s.length !== 1 || s[0] !== 'form') F.push(`${T}: must carry {form} exactly once (${s.join(',')})`);
    if (!colKeys.includes(f.col)) F.push(`${T}: col "${f.col}" is not a column`);
    if (!units.some((u) => u.key === f.unit)) F.push(`${T}: unit "${f.unit}" is not a unit`);
    if (!Array.isArray(f.fits) || !f.fits.length) F.push(`${T}: no fits`);
    for (const x of f.fits || []) if (!known.has(fold(x))) F.push(`${T}: fits "${x}" is not a bank verb`);
    if (!f.subjectLiteral || !String(f.text).includes(f.subjectLiteral)) F.push(`${T}: subjectLiteral "${f.subjectLiteral}" is not inside the text`);
    if ([...String(f.text)].length > FRAME_CAP) F.push(`${T}: ${[...String(f.text)].length} chars > ${FRAME_CAP}`);
    if (!/^\p{Lu}/u.test(f.text || '')) F.push(`${T}: does not start with a capital`);
    if (!/[.!?]$/.test(f.text || '')) F.push(`${T}: no end mark`);
    if (freeClaim.hit(f.text || '')) F.push(`${T}: claims free`);
    const t = toks(f.text);
    for (const h of homos) if (t.includes(h)) F.push(`${T}: carries the noun-homograph token "${h}"`);
    if (NAME_LOCALES.has(L)) {
      if (AMBIG[L].test(f.text)) F.push(`${T}: "${f.text}" — ambiguous person (bare ${L === 'de' ? 'sie' : 'zij'}; carry a name)`);
      if (!FIRST_SECOND.has(f.col) && !names.has(fold(f.subjectLiteral)) && !String(f.subjectLiteral).split(/\s+(und|en)\s+/).every((x) => names.has(fold(x)) || x === 'und' || x === 'en')) F.push(`${T}: third-person subject "${f.subjectLiteral}" is not a SENTENCES.${L} name`);
    }
  }
  // (7) Face 6: every form → exactly one infinitive; (6) Face 5: >= 3 distinct forms per verb (reported)
  const formOwner = new Map();
  for (const v of [...verbs, ...core]) {
    const ex = v.forms && v.forms[cfg.exemplar];
    if (!ex) continue;
    for (const c of colKeys) { const f = fold(ex[c]); const o = formOwner.get(f); if (o && o !== fold(v.inf)) F.push(`A ${L}: form "${ex[c]}" belongs to both ${o} and ${v.inf} (Face 6 needs one infinitive per form)`); formOwner.set(f, fold(v.inf)); }
  }
  const f5 = verbs.filter((v) => { const ex = v.forms && v.forms[cfg.exemplar]; if (!ex) return false; const set = new Set(colKeys.map((c) => fold(ex[c]))); if (cfg.mode === 'tense') set.add(fold(v.inf)); return set.size >= 3; });
  const f5x = verbs.filter((v) => !f5.includes(v)).map((v) => v.inf);
  if (f5x.length) report.push(`F5 excludes ${f5x.join(', ')} (< 3 distinct forms)`);
  // (8) floors → refusals (reported) for a non-en block, FAIL for en
  const floor = (ok, msg) => { if (!ok) { if (strict) F.push(`A ${L}: ${msg}`); else report.push(`REFUSED: ${msg}`); } };
  const regular = verbs.filter((v) => !v.irregular && !v.gradation);
  floor(regular.length >= 6, `regular pool ${regular.length} < 6`);
  floor(regular.filter((v) => v.pic).length >= 3, `pictured regular verbs ${regular.filter((v) => v.pic).length} < 3`);
  floor(verbs.filter((v) => v.pic).length >= (cfg.mode === 'tense' ? 6 : 3), `pictured verbs ${verbs.filter((v) => v.pic).length} < ${cfg.mode === 'tense' ? 6 : 3} (the base table)`);
  floor(core.length >= 2, `irregularCore ${core.length} < 2`);
  floor(frames.length >= 10, `frames ${frames.length} < 10`);
  const picturedFits = frames.filter((f) => (f.fits || []).some((x) => verbs.find((v) => fold(v.inf) === fold(x) && v.pic))).length;
  floor(picturedFits >= 4, `frames with a pictured fit ${picturedFits} < 4`);
  floor(cfg.mode === 'tense' || (Array.isArray(cfg.matchPersons) && cfg.matchPersons.length >= 3), `matchPersons ${(cfg.matchPersons || []).length} < 3`);
  floor(f5.length >= 8, `Face 5 verbs ${f5.length} < 8`);
  // (9) strings
  const S = cfg.strings || {};
  const titles = [];
  for (const face of FACES) {
    const s = S[face];
    if (!s || !s.title || !s.instruction) { floor(false, `strings.${face} missing`); continue; }
    if ([...s.title].length > 70) F.push(`A ${L}: ${face} title ${[...s.title].length} > 70`);
    if (WORKSHEET_WORD.test(s.title)) F.push(`A ${L}: ${face} title carries the worksheet word`);
    if ([...s.instruction].length > 150) F.push(`A ${L}: ${face} instruction ${[...s.instruction].length} > 150`);
    if (!/[.!?]$/.test(s.instruction)) F.push(`A ${L}: ${face} instruction has no end mark`);
    if (freeClaim.hit(s.title) || freeClaim.hit(s.instruction)) F.push(`A ${L}: ${face} strings claim free`);
    titles.push(fold(s.title));
  }
  if (new Set(titles).size !== titles.length) F.push(`A ${L}: face titles repeat`);
  if (spec && L === 'en' && S['G2-317'] && (S['G2-317'].title !== spec.i18n.en.title || S['G2-317'].instruction !== spec.i18n.en.instruction)) F.push('A en: strings[G2-317] != the spec i18n.en (two sources)');
  if (!cfg.hunt || !Array.isArray(cfg.hunt.nounHomographs)) F.push(`A ${L}: hunt.nounHomographs missing`);
  return { fails: F, report };
}

/* ---------------- C. renders (real pipeline) ---------------- */
async function renderCheck(page, type, inj, job, opts) {
  let t = type;
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadBank()[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { locale: o.locale, unit: o.unit }, ctx) };   // inj.bank = ONE locale block
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({ type: t, theme: null, difficulty: job.difficulty, locale: job.locale, strings: job.strings, unit: job.unit || null, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const cfg = (inj && inj.cfg) || type.difficulty[job.difficulty];
  const m = await page.evaluate(({ floor, boxFloor, lanePic, laneMaxH, boxH }) => {
    const res = { fails: [], cells: [], lanes: [], body: 0, instrLines: 0, tables: 0, mode: '', widths: {} };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.instrLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    const root = document.querySelector('[data-lcs-vf]');
    if (!root) { res.fails.push('no root'); return res; }
    res.mode = root.dataset.lcsMode;
    res.unit = root.dataset.lcsUnit;
    res.face = root.dataset.lcsFace;
    const core = root.dataset.lcsPool === 'irregular';   // Face 4: chip-only, no action pictures
    const inside = (r, what) => { if (r.top < body.top - 0.6 || r.bottom > body.bottom + 0.6 || r.left < body.left - 0.6 || r.right > body.right + 0.6) res.fails.push(`${what} outside the body`); };
    const fits = (el, box, what) => {
      if (el.scrollWidth > el.clientWidth + 0.6) res.fails.push(`${what} overflows its grid cell (${el.scrollWidth} > ${el.clientWidth})`);
      const r = el.getBoundingClientRect();
      if (r.right > box.right + 0.6 || r.left < box.left - 0.6 || r.top < box.top - 0.6 || r.bottom > box.bottom + 0.6) res.fails.push(`${what} outside its row`);
      return r;
    };
    const tables = [...root.querySelectorAll('[data-lcs-table]')];
    res.tables = tables.length;
    tables.forEach((t, ti) => {
      const tb = t.getBoundingClientRect();
      inside(tb, `table ${ti + 1}`);
      const rows = res.mode === 'tense' ? [...t.querySelectorAll('[data-lcs-row]')] : [...t.querySelectorAll('[data-lcs-prow]')];
      if (!rows.length) res.fails.push(`table ${ti + 1}: no rows`);
      rows.forEach((r) => {
        const rb = r.getBoundingClientRect();
        if (rb.height < floor - 0.6) res.fails.push(`a table row ${rb.height.toFixed(1)} < ${floor}`);
        if (rb.bottom > tb.bottom + 0.6 || rb.top < tb.top - 0.6) res.fails.push(`a table row is clipped by its table (${rb.bottom.toFixed(0)} > ${tb.bottom.toFixed(0)})`);
        const verb = res.mode === 'tense' ? r.dataset.lcsVerb : t.dataset.lcsVerb;
        const label = r.querySelector('[data-lcs-inf],[data-lcs-pronoun]');
        if (label) { fits(label, rb, `label "${label.textContent.trim()}"`); const lg = document.createRange(); lg.selectNodeContents(label); res.widths[label.textContent.trim()] = Math.round(lg.getBoundingClientRect().width); }
        r.querySelectorAll('[data-lcs-cell]').forEach((c) => {
          const cb = c.getBoundingClientRect();
          const box = c.querySelector('.ws-blankbox');
          if (box) { const b = box.getBoundingClientRect(); if (Math.abs(b.height - boxH) > 0.6) res.fails.push(`gap ${verb}/${c.dataset.lcsCol} box ${b.height.toFixed(1)} != ${boxH}`); if (b.height < boxFloor - 0.6) res.fails.push(`gap box ${b.height.toFixed(1)} < ${boxFloor}`); if (b.right > cb.right + 0.6 || b.left < cb.left - 0.6) res.fails.push(`gap ${verb}/${c.dataset.lcsCol} box outside its cell`); res.widths.box = Math.round(b.width); }
          else { fits(c, rb, `form "${c.textContent.trim()}"`); const rg = document.createRange(); rg.selectNodeContents(c); res.widths[c.textContent.trim()] = Math.round(rg.getBoundingClientRect().width); }
          res.cells.push({ table: ti, verb, col: c.dataset.lcsCol, state: c.dataset.lcsCell, form: c.dataset.lcsForm, text: c.textContent.trim(), inf: res.mode === 'tense' ? r.dataset.lcsInf : t.dataset.lcsInf });
        });
      });
      t.querySelectorAll('[data-lcs-collabel]').forEach((l) => fits(l, t.querySelector('[data-lcs-thead]').getBoundingClientRect(), `column label "${l.textContent.trim()}"`));
      const hi = t.querySelector('[data-lcs-thead] [data-lcs-inf]');
      if (hi) fits(hi, t.querySelector('[data-lcs-thead]').getBoundingClientRect(), `header "${hi.textContent.trim()}"`);
    });
    root.querySelectorAll('[data-lcs-table] img').forEach((img) => { const r = img.getBoundingClientRect(); if (r.width < floor - 0.6 || r.height < floor - 0.6) res.fails.push(`table picture ${r.width.toFixed(1)}x${r.height.toFixed(1)} < ${floor}`); });
    const laneGrid = root.querySelector('[data-lcs-lanes]');
    if (laneGrid) { const lr = laneGrid.getBoundingClientRect(); inside(lr, 'lanes'); if (tables.length && lr.top < tables[tables.length - 1].getBoundingClientRect().bottom - 0.6) res.fails.push('lanes overlap the table'); }
    [...root.querySelectorAll('[data-lcs-lane]')].forEach((l, i) => {
      const lb = l.getBoundingClientRect();
      inside(lb, `lane ${i + 1}`);
      const img = l.querySelector('img');
      if (!img && !core) res.fails.push(`lane ${i + 1}: no picture`);
      else if (img) { const r = img.getBoundingClientRect(); if (Math.abs(r.width - lanePic) > 0.6 || Math.abs(r.height - lanePic) > 0.6) res.fails.push(`lane ${i + 1} picture ${r.width.toFixed(1)}x${r.height.toFixed(1)} != ${lanePic}`); }
      const p = l.querySelector('[data-lcs-sentence]');
      if (!p) res.fails.push(`lane ${i + 1}: no sentence`);
      else { if (p.clientHeight > laneMaxH) res.fails.push(`lane ${i + 1}: sentence ${p.clientHeight}px high > ${laneMaxH} (three lines)`); if (p.scrollWidth > p.clientWidth + 0.6) res.fails.push(`lane ${i + 1}: sentence overflows`); const pr = p.getBoundingClientRect(); if (pr.bottom > lb.bottom + 0.6 || pr.top < lb.top - 0.6) res.fails.push(`lane ${i + 1}: sentence outside its lane`); }
      const box = l.querySelector('.ws-blankbox');
      if (box) { const b = box.getBoundingClientRect(); if (b.height < boxFloor - 0.6) res.fails.push(`lane ${i + 1}: box ${b.height.toFixed(1)} < ${boxFloor}`); }
      res.lanes.push({ verb: l.dataset.lcsVerb, col: l.dataset.lcsCol, form: l.dataset.lcsForm, frame: l.dataset.lcsFrame, text: p ? p.textContent.replace(/\s*\([^)]*\)\s*$/, '').trim() : '', h: Math.round(lb.height) });
    });
    return res;
  }, { floor: ELEMENT_FLOOR, boxFloor: BOX_FLOOR, lanePic: LANE_PIC, laneMaxH: LANE_TEXT_MAX_H, boxH: cfg.boxH });
  fails.push(...m.fails.map((x) => 'size: ' + x));
  if (job.strings === WORST_CHROME && m.body > WORST_BODY) fails.push(`chrome: the 3-line/3-line body measured ${m.body}, the gate expected <= ${WORST_BODY} (re-measure the floor)`);
  if (job.strings === WORST_CHROME && m.instrLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.instrLines} instruction lines, not 3 (the probe is vacuous)`);
  // Node-side re-derivation from the bank
  const bankLoc = (inj && inj.bank) || loadBank()[job.locale.slice(0, 2)];
  const unitKey = m.unit;
  const findVerb = (inf) => bankLoc && [...(bankLoc.verbs || []), ...(bankLoc.irregularCore || [])].find((v) => fold(v.inf) === fold(inf));
  m.cells.forEach((c) => {
    const v = findVerb(c.verb);
    const want = v && v.forms && v.forms[unitKey] && v.forms[unitKey][c.col];
    if (!want) { fails.push(`refill: ${c.verb}/${c.col} has no bank form`); return; }
    if (c.form !== want) fails.push(`refill: ${c.verb}/${c.col} stamps "${c.form}", the bank says "${want}"`);
    if ((c.state === 'given' || c.state === 'anchor') && c.text !== want) fails.push(`refill: ${c.state} ${c.verb}/${c.col} prints "${c.text}", the bank says "${want}"`);
    if (c.state === 'gap' && c.text) fails.push(`refill: gap ${c.verb}/${c.col} prints "${c.text}"`);
    const isAnchor = fold(want) === fold(c.inf);
    if (isAnchor && c.state !== 'anchor') fails.push(`refill: ${c.verb}/${c.col} equals the infinitive but is "${c.state}"`);
    if (c.state === 'anchor' && !isAnchor) {
      const printed = m.cells.filter((x) => x.table === c.table && x.state === 'given').map((x) => fold(x.form));
      if (!printed.includes(fold(want))) fails.push(`refill: ${c.verb}/${c.col} is an anchor but equals no printed text`);
    }
  });
  m.lanes.forEach((l, i) => {
    const f = bankLoc && (bankLoc.frames || []).find((x) => x.id === l.frame);
    if (!f) { fails.push(`refill: lane ${i + 1} frame ${l.frame} is not in the bank`); return; }
    if (f.col !== l.col) fails.push(`refill: lane ${i + 1} col ${l.col} != frame col ${f.col}`);
    if (f.unit !== unitKey) fails.push(`refill: lane ${i + 1} frame unit ${f.unit} != ${unitKey}`);
    if (!f.fits.some((x) => fold(x) === fold(l.verb))) fails.push(`refill: lane ${i + 1} verb ${l.verb} does not fit frame ${l.frame}`);
    const v = findVerb(l.verb);
    const want = v && v.forms && v.forms[unitKey] && v.forms[unitKey][l.col];
    if (!want || want !== l.form) fails.push(`refill: lane ${i + 1} form "${l.form}", the bank says "${want}"`);
    const wantText = String(f.text).replace('{form}', '').replace(/\s+/g, ' ').trim();
    if (l.text.replace(/\s+/g, ' ').trim() !== wantText) fails.push(`refill: lane ${i + 1} prints "${l.text}", the bank frame is "${wantText}"`);
    if (toks(l.text).includes(fold(l.form))) fails.push(`refill: lane ${i + 1} prints its form`);
  });
  if (!m.cells.length) fails.push('non-vacuity: 0 cells checked');
  if (!m.cells.some((c) => c.state === 'gap')) fails.push('non-vacuity: 0 gaps checked');
  if (!m.lanes.length) fails.push('non-vacuity: 0 lanes checked');
  return { fails, cells: m.cells, lanes: m.lanes, body: m.body, instrLines: m.instrLines, tables: m.tables, mode: m.mode, widths: m.widths, pngPath: out.pngPath };
}

/* ---------------- F. the faces (Phase 2): G2-334 match · G2-335 sentences · G2-336 irregular · G2-337 choice · G2-338 hunt ---------------- */
const FACE_IDS = { match: 'G2-334', sentences: 'G2-335', irregular: 'G2-336', choice: 'G2-337', hunt: 'G2-338' };
const OUT_F = path.join(ROOT, 'out', 'dev', 'g2317-gate');
const PILL_FLOOR = 36;

/** The stem bot (design §5): for each left infinitive pick the right-column text with the longest common prefix; a tie = no information = a miss. */
function stemBot(lefts, rights) {
  const lcp = (a, b) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; };
  let hits = 0;
  for (const l of lefts) {
    let best = -1, bestForm = null, tie = false;
    for (const r of rights) { const n = lcp(fold(l.inf), fold(r.text)); if (n > best) { best = n; bestForm = r; tie = false; } else if (n === best) tie = true; }
    if (!tie && bestForm && fold(bestForm.text) === fold(l.past)) hits++;
  }
  return hits;
}

/** The paradigm of a bank verb (node-side twin of the spec's, own code): unit forms + the infinitive in tense mode. */
function paradigm(bankLoc, unitKey, v) {
  const out = new Set();
  if (bankLoc.mode === 'tense') out.add(fold(v.inf));
  for (const c of bankLoc.columns) out.add(fold(v.forms[unitKey][c.key]));
  return out;
}

/**
 * Render ONE face through the real pipeline (an injected bank / cfg = the poison
 * seam) and measure it: lints + verify() + geometry (every block / lane / row
 * inside the body, pictures at their floors, item texts inside their items,
 * pills / boxes at their sizes, one-line sentences on the choice face at the
 * worst chrome) + the Node-side re-derivation of EVERY stamp from the bank.
 */
async function renderFace(page, faceKey, inj, job, opts) {
  const type = loadType(FACE_IDS[faceKey]);
  let t = { ...type, build: (o, ctx) => type._buildWith((inj && inj.bank) || loadBank()[o.locale.slice(0, 2)], (inj && inj.cfg) || type.difficulty[o.difficulty], { locale: o.locale, unit: o.unit }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({ type: t, theme: null, difficulty: 2, locale: job.locale || 'en', strings: job.strings, unit: job.unit || null, seedEpoch: job.seedEpoch || 1, page, outDir: OUT_F, baseName: job.baseName });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const m = await page.evaluate(({ floor, boxFloor, lanePic, laneMaxH, pillFloor, worst }) => {
    const res = { fails: [], body: 0, instrLines: 0, face: '', unit: '', blocks: [], lanes: [], rows: [], pictured: 0 };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.instrLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    const root = document.querySelector('[data-lcs-vf]');
    if (!root) { res.fails.push('no root'); return res; }
    res.face = root.dataset.lcsFace; res.unit = root.dataset.lcsUnit; res.kind = root.dataset.lcsMatchkind || '';
    res.minPictured = +(root.dataset.lcsMinpictured || 0);
    const inside = (r, what) => { if (r.top < body.top - 0.6 || r.bottom > body.bottom + 0.6 || r.left < body.left - 0.6 || r.right > body.right + 0.6) res.fails.push(`${what} outside the body (${r.top.toFixed(0)}-${r.bottom.toFixed(0)} vs ${body.top.toFixed(0)}-${body.bottom.toFixed(0)})`); };
    const textFits = (span, box, what) => { if (!span) return; if (span.scrollWidth > span.clientWidth + 0.6) res.fails.push(`${what} overflows (${span.scrollWidth} > ${span.clientWidth})`); const r = span.getBoundingClientRect(); if (r.right > box.right + 0.6 || r.left < box.left - 0.6) res.fails.push(`${what} outside its item`); };
    root.querySelectorAll('[data-ws-content]').forEach((el, i) => inside(el.getBoundingClientRect(), `content ${i + 1}`));
    // blocks (match)
    [...root.querySelectorAll('[data-lcs-matchblock]')].forEach((b, bi) => {
      const br = b.getBoundingClientRect();
      inside(br, `block ${bi + 1}`);
      const L = [...b.querySelectorAll('[data-lcs-match-left]')].map((it) => {
        const r = it.getBoundingClientRect(); textFits(it.querySelector('[data-lcs-match-text]'), r, `left "${it.textContent.trim()}"`);
        if (r.height < floor - 0.6) res.fails.push(`left item ${r.height.toFixed(1)} < ${floor}`);
        if (r.bottom > br.bottom + 0.6 || r.top < br.top - 0.6) res.fails.push('a left item is clipped by its block');
        const img = it.querySelector('img'); if (img) { const ir = img.getBoundingClientRect(); if (ir.width < floor - 0.6 || ir.height < floor - 0.6) res.fails.push(`a match picture ${ir.width.toFixed(0)}x${ir.height.toFixed(0)} < ${floor}`); }
        const dot = it.querySelector('.ws-match-dot'); const dr = dot ? dot.getBoundingClientRect() : null;
        return { verb: it.dataset.lcsVerb || '', col: it.dataset.lcsCol || '', text: it.textContent.trim(), pictured: !!img, dotRight: dr ? dr.right : null, h: Math.round(r.height) };
      });
      const R = [...b.querySelectorAll('[data-lcs-match-right]')].map((it) => {
        const r = it.getBoundingClientRect(); textFits(it.querySelector('[data-lcs-match-text]'), r, `right "${it.textContent.trim()}"`);
        if (r.height < floor - 0.6) res.fails.push(`right item ${r.height.toFixed(1)} < ${floor}`);
        if (r.bottom > br.bottom + 0.6 || r.top < br.top - 0.6) res.fails.push('a right item is clipped by its block');
        const dot = it.querySelector('.ws-match-dot'); const dr = dot ? dot.getBoundingClientRect() : null;
        return { verb: it.dataset.lcsVerb || '', col: it.dataset.lcsCol || '', role: it.dataset.lcsRole, stamp: it.dataset.lcsMatchRight, text: it.textContent.trim(), dotLeft: dr ? dr.left : null, h: Math.round(r.height) };
      });
      const lDot = Math.max(...L.map((x) => x.dotRight || 0)), rDot = Math.min(...R.map((x) => x.dotLeft == null ? 1e9 : x.dotLeft));
      if (rDot - lDot < 6) res.fails.push(`block ${bi + 1}: the two dot columns are ${(rDot - lDot).toFixed(1)} px apart (< 6)`);
      const head = b.querySelector('[data-lcs-thead]');
      if (head) { const hi = head.querySelector('[data-lcs-inf]'); textFits(hi, head.getBoundingClientRect(), `header "${hi && hi.textContent.trim()}"`); const img = head.querySelector('img'); if (img) { const ir = img.getBoundingClientRect(); if (ir.width < floor - 0.6) res.fails.push(`a header picture ${ir.width.toFixed(0)} < ${floor}`); } }
      res.blocks.push({ verb: b.dataset.lcsVerb, inf: b.dataset.lcsInf, left: L, right: R, header: !!head, headerPic: !!(head && head.querySelector('img')) });
    });
    // lanes / rows (every face but the tense match)
    const laneGrid = root.querySelector('[data-lcs-lanes]');
    if (laneGrid) { inside(laneGrid.getBoundingClientRect(), 'lanes'); const blocks = root.querySelectorAll('[data-lcs-matchblock]'); if (blocks.length && laneGrid.getBoundingClientRect().top < blocks[blocks.length - 1].getBoundingClientRect().bottom - 0.6) res.fails.push('lanes overlap the blocks'); }
    [...root.querySelectorAll('[data-lcs-lane]')].forEach((l, i) => {
      const lb = l.getBoundingClientRect();
      inside(lb, `row ${i + 1}`);
      const img = l.querySelector('img');
      if (img) { const r = img.getBoundingClientRect(); if (Math.abs(r.width - lanePic) > 0.6 || Math.abs(r.height - lanePic) > 0.6) res.fails.push(`row ${i + 1} picture ${r.width.toFixed(1)}x${r.height.toFixed(1)} != ${lanePic}`); res.pictured++; }
      const p = l.querySelector('[data-lcs-sentence]');
      let sentH = 0;
      if (!p) res.fails.push(`row ${i + 1}: no sentence`);
      else {
        sentH = p.clientHeight;
        if (sentH > laneMaxH) res.fails.push(`row ${i + 1}: sentence ${sentH}px high > ${laneMaxH} (three lines)`);
        if (p.scrollWidth > p.clientWidth + 0.6) res.fails.push(`row ${i + 1}: sentence overflows`);
        const pr = p.getBoundingClientRect(); if (pr.bottom > lb.bottom + 0.6 || pr.top < lb.top - 0.6) res.fails.push(`row ${i + 1}: sentence outside its row`);
        if (res.face === 'choice' && worst && sentH > 27) res.fails.push(`row ${i + 1}: the choice sentence wraps to ${Math.round(sentH / 24)} lines at the worst chrome (one line only)`);
      }
      const pills = [...l.querySelectorAll('[data-lcs-pill]')].map((pl) => { const r = pl.getBoundingClientRect(); if (r.height < pillFloor - 0.6) res.fails.push(`row ${i + 1}: pill ${r.height.toFixed(1)} < ${pillFloor}`); if (r.bottom > lb.bottom + 0.6 || r.right > lb.right + 0.6) res.fails.push(`row ${i + 1}: a pill outside its row`); if (pl.scrollWidth > pl.clientWidth + 0.6) res.fails.push(`row ${i + 1}: pill text overflows`); return { text: pl.textContent.trim(), stamp: pl.dataset.lcsPill, h: Math.round(r.height), w: Math.round(r.width) }; });
      const box = l.querySelector('.ws-blankbox');
      let boxR = null;
      if (box) { const b = box.getBoundingClientRect(); boxR = { w: Math.round(b.width), h: Math.round(b.height) }; if (b.height < boxFloor - 0.6) res.fails.push(`row ${i + 1}: box ${b.height.toFixed(1)} < ${boxFloor}`); if (b.bottom > lb.bottom + 0.6 || b.right > lb.right + 0.6) res.fails.push(`row ${i + 1}: box outside its row`); }
      const hint = l.querySelector('[data-lcs-hint]');
      const printed = l.querySelector('[data-lcs-printed-form]');
      res.lanes.push({ verb: l.dataset.lcsVerb, inf: l.dataset.lcsInf || '', col: l.dataset.lcsCol, form: l.dataset.lcsForm, frame: l.dataset.lcsFrame, render: l.dataset.lcsRender, idx: l.dataset.lcsIdx, text: p ? p.textContent.replace(/\s*\([^)]*\)\s*$/, '').trim() : '', hint: hint ? hint.textContent.replace(/[()]/g, '').trim() : null, pills, box: boxR, printed: printed ? printed.textContent.trim() : null, sentH, h: Math.round(lb.height), pictured: !!img });
    });
    return res;
  }, { floor: ELEMENT_FLOOR, boxFloor: BOX_FLOOR, lanePic: LANE_PIC, laneMaxH: LANE_TEXT_MAX_H, pillFloor: PILL_FLOOR, worst: job.strings === WORST_CHROME });
  fails.push(...m.fails.map((x) => 'size: ' + x));
  if (job.strings === WORST_CHROME && m.body > WORST_BODY) fails.push(`chrome: the 3-line/3-line body measured ${m.body}, expected <= ${WORST_BODY}`);
  if (job.strings === WORST_CHROME && m.instrLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.instrLines} instruction lines, not 3 (the probe is vacuous)`);
  // ---- Node re-derivation from the bank (diff, not trust)
  const bankLoc = (inj && inj.bank) || loadBank()[(job.locale || 'en').slice(0, 2)];
  const unitKey = m.unit;
  const findVerb = (inf) => bankLoc && [...(bankLoc.verbs || []), ...(bankLoc.irregularCore || [])].find((v) => fold(v.inf) === fold(inf));
  const bankVerb = (inf) => bankLoc && (bankLoc.verbs || []).find((v) => fold(v.inf) === fold(inf));
  const refillLane = (l, i, what) => {
    const f = bankLoc && (bankLoc.frames || []).find((x) => x.id === l.frame);
    if (!f) { fails.push(`refill: ${what} ${i + 1} frame ${l.frame} is not in the bank`); return null; }
    if (f.col !== l.col) fails.push(`refill: ${what} ${i + 1} col ${l.col} != frame col ${f.col}`);
    if (f.unit !== unitKey) fails.push(`refill: ${what} ${i + 1} frame unit ${f.unit} != ${unitKey}`);
    if (!f.fits.some((x) => fold(x) === fold(l.verb))) fails.push(`refill: ${what} ${i + 1} verb ${l.verb} does not fit frame ${l.frame}`);
    const v = findVerb(l.verb);
    const want = v && v.forms && v.forms[unitKey] && v.forms[unitKey][l.col];
    if (!want || want !== l.form) fails.push(`refill: ${what} ${i + 1} form "${l.form}", the bank says "${want}"`);
    const wantText = String(f.text).replace('{form}', l.render === 'text' ? l.form : '').replace(/\s+/g, ' ').trim();
    if (l.text.replace(/\s+/g, ' ').trim() !== wantText) fails.push(`refill: ${what} ${i + 1} prints "${l.text}", the bank frame is "${wantText}"`);
    return v;
  };
  const bot = { hits: 0, n: 0 };
  if (m.face === 'match') {
    if (!m.blocks.length) fails.push('non-vacuity: 0 blocks');
    m.blocks.forEach((b, bi) => {
      const B = `block ${bi + 1}`;
      if (m.kind === 'tense') {
        const lefts = [];
        b.left.forEach((l) => {
          const v = bankVerb(l.verb);
          if (!v) { fails.push(`refill: ${B} left "${l.verb}" is not a bank verb`); return; }
          if (l.text !== v.inf) fails.push(`refill: ${B} left prints "${l.text}", the bank infinitive is "${v.inf}"`);
          const f = v.forms[unitKey];
          if (fold(f.past) === fold(v.inf)) fails.push(`refill: ${B} "${v.inf}": its past is the infinitive (an anchor on the match page)`);
          if (!!v.pic !== l.pictured) fails.push(`refill: ${B} "${v.inf}" pictured ${l.pictured}, the bank pic is ${v.pic ? 'set' : 'null'}`);
          lefts.push({ inf: v.inf, past: f.past });
        });
        b.right.forEach((r) => {
          const v = bankVerb(r.verb);
          if (!v) { fails.push(`refill: ${B} right "${r.text}" names no bank verb`); return; }
          const want = v.forms[unitKey][r.col];
          if (r.text !== want || r.stamp !== want) fails.push(`refill: ${B} right prints "${r.text}" (stamp "${r.stamp}"), the bank ${v.inf}/${r.col} is "${want}"`);
          if ((r.col === 'past') !== (r.role === 'target')) fails.push(`refill: ${B} ${v.inf}/${r.col} role ${r.role}`);
        });
        bot.n += lefts.length;
        bot.hits += stemBot(lefts, b.right);
        if (b.left.filter((l) => l.pictured).length < m.minPictured) fails.push(`${B}: ${b.left.filter((l) => l.pictured).length} pictured verbs < ${m.minPictured}`);
      } else {
        const v = bankVerb(b.verb);
        if (!v) { fails.push(`refill: ${B} verb "${b.verb}" is not a bank verb`); return; }
        if (v.match === false || v.irregular || !v.pic) fails.push(`refill: ${B} "${v.inf}" is not a pictured match-able regular verb (match ${v.match}, irregular ${v.irregular}, pic ${!!v.pic})`);
        if (!b.headerPic) fails.push(`${B}: no action picture in the header`);
        const mp = bankLoc.matchPersons || [];
        if (b.left.length !== mp.length) fails.push(`refill: ${B} ${b.left.length} persons, matchPersons has ${mp.length}`);
        b.left.forEach((l, i) => {
          const col = mp[i];
          if (l.col !== col) fails.push(`refill: ${B} left ${i + 1} col ${l.col}, matchPersons says ${col}`);
          const label = (v.labelOverride && v.labelOverride[col]) || (bankLoc.columns.find((c) => c.key === col) || {}).label;
          if (l.text !== label) fails.push(`refill: ${B} left prints "${l.text}", the bank label for ${col} is "${label}"`);
        });
        b.right.forEach((r) => { const want = v.forms[unitKey][r.col]; if (r.text !== want || r.stamp !== want) fails.push(`refill: ${B} right prints "${r.text}", the bank ${v.inf}/${r.col} is "${want}"`); });
      }
    });
    m.lanes.forEach((l, i) => refillLane(l, i, 'lane'));
    if (m.kind === 'tense' && bot.n && bot.hits >= bot.n) fails.push(`stem bot ${bot.hits}/${bot.n}: the right column has no present distractors to defeat a longest-common-prefix matcher`);
    if (m.kind === 'tense' && !bot.n) fails.push('non-vacuity: the stem bot saw 0 verbs');
  } else if (m.face === 'sentences') {
    if (!m.lanes.length) fails.push('non-vacuity: 0 lanes');
    m.lanes.forEach((l, i) => { const v = refillLane(l, i, 'lane'); if (v && l.hint !== v.inf) fails.push(`refill: lane ${i + 1} chip "${l.hint}" != the infinitive "${v.inf}"`); });
    if (m.pictured < m.minPictured) fails.push(`${m.pictured} pictured lanes < ${m.minPictured}`);
  } else if (m.face === 'choice') {
    if (!m.lanes.length) fails.push('non-vacuity: 0 rows');
    m.lanes.forEach((l, i) => {
      const v = refillLane(l, i, 'row');
      if (!v) return;
      const par = paradigm(bankLoc, unitKey, v);
      l.pills.forEach((p) => { if (!par.has(fold(p.text))) fails.push(`refill: row ${i + 1} pill "${p.text}" is not in the paradigm of ${v.inf} (${[...par].join('/')})`); });
      if (!l.pills.some((p) => fold(p.text) === fold(l.form))) fails.push(`refill: row ${i + 1} no pill equals the form "${l.form}"`);
      if (par.size < l.pills.length) fails.push(`refill: row ${i + 1} ${v.inf} has ${par.size} distinct forms < ${l.pills.length} pills (F5-excluded)`);
    });
    if (m.pictured < m.minPictured) fails.push(`${m.pictured} pictured rows < ${m.minPictured}`);
  } else if (m.face === 'hunt') {
    if (!m.lanes.length) fails.push('non-vacuity: 0 rows');
    const owner = new Map();
    const allForms = new Set();
    for (const v of [...(bankLoc.verbs || []), ...(bankLoc.irregularCore || [])]) { const f = v.forms && v.forms[unitKey]; if (!f) continue; for (const c of bankLoc.columns) { owner.set(fold(f[c.key]), fold(v.inf)); allForms.add(fold(f[c.key])); } allForms.add(fold(v.inf)); }
    const homos = new Set(((bankLoc.hunt && bankLoc.hunt.nounHomographs) || []).map(fold));
    m.lanes.forEach((l, i) => {
      const v = refillLane(l, i, 'row');
      if (!v) return;
      if (fold(l.inf) !== fold(v.inf)) fails.push(`refill: row ${i + 1} inf stamp "${l.inf}", the bank owner of "${l.form}" is "${owner.get(fold(l.form))}"`);
      if (owner.get(fold(l.form)) !== fold(v.inf)) fails.push(`refill: row ${i + 1} form "${l.form}" belongs to "${owner.get(fold(l.form))}", not "${v.inf}"`);
      if (l.printed !== l.form) fails.push(`refill: row ${i + 1} prints "${l.printed}" in the form span, not "${l.form}"`);
      const t = toks(l.text);
      const others = t.filter((w) => w !== fold(l.form) && allForms.has(w));
      if (others.length) fails.push(`refill: row ${i + 1} prints another bank verb form: ${others.join(', ')}`);
      for (const h of homos) if (t.includes(h)) fails.push(`refill: row ${i + 1} carries the noun-homograph token "${h}"`);
    });
    if (m.pictured < m.minPictured) fails.push(`${m.pictured} pictured rows < ${m.minPictured}`);
  } else fails.push(`face stamp "${m.face}" is not a Phase-2 face`);
  return { fails, m, bot, pngPath: out.pngPath };
}

/** The irregular face (G2-336) renders through the BASE checker (tables + lanes) + the core-membership check. */
async function renderIrregular(page, inj, job, opts) {
  const type = loadType(FACE_IDS.irregular);
  const r = await renderCheck(page, type, inj || {}, job, opts);
  const bankLoc = (inj && inj.bank) || loadBank()[(job.locale || 'en').slice(0, 2)];
  const core = new Set((bankLoc.irregularCore || []).map((v) => fold(v.inf)));
  const verbs = [...new Set(r.cells.map((c) => c.verb))];
  if (!verbs.length) r.fails.push('non-vacuity: 0 table verbs');
  verbs.forEach((v) => { if (!core.has(fold(v))) r.fails.push(`refill: table verb "${v}" is not in irregularCore`); });
  r.lanes.forEach((l, i) => { if (!core.has(fold(l.verb))) r.fails.push(`refill: lane ${i + 1} verb "${l.verb}" is not in irregularCore`); });
  return r;
}

async function runFaces(page, note, failures, seeds, bankAll) {
  const need = (html, re, to, what) => { if (!re.test(html)) throw new Error(`poison needle matched nothing: ${what}`); re.lastIndex = 0; return html.replace(re, to); };
  const DE = { bank: SYNTH_DE }, NL = { bank: SYNTH_NL };
  // spec strings === bank strings (one source; the emitted specs carry the bank's F2..F6 verbatim)
  const en = bankAll.en;
  for (const [key, id] of Object.entries(FACE_IDS)) {
    const spec = loadType(id);
    const face = { match: 'F2', sentences: 'F3', irregular: 'F4', choice: 'F5', hunt: 'F6' }[key];
    note(spec.i18n.en.title === en.strings[face].title && spec.i18n.en.instruction === en.strings[face].instruction, `F ${id}: i18n.en != bank strings.${face} (two sources)`);
    note(spec.themeAxis && spec.themeAxis.applicable === false, `F ${id}: not themeless`);
    note(spec.unitAxis && spec.unitAxis.applicable === true, `F ${id}: lost the unit axis`);
  }
  // ---- renders: en (shipped chrome + WORST), the de persons fixture, the nl stack fixture (F2)
  const jobs = [
    ['match', null, { locale: 'en', baseName: 'G2-334-en' }], ['match', null, { locale: 'en', strings: WORST_CHROME, baseName: 'G2-334-worst-en' }],
    ['match', DE, { locale: 'de', baseName: 'G2-334-fixture-de' }], ['match', DE, { locale: 'de', strings: WORST_CHROME, baseName: 'G2-334-worst-de' }],
    ['match', NL, { locale: 'nl', baseName: 'G2-334-fixture-nl' }], ['match', NL, { locale: 'nl', strings: WORST_CHROME, baseName: 'G2-334-worst-nl' }],
    ['sentences', null, { locale: 'en', baseName: 'G2-335-en' }], ['sentences', null, { locale: 'en', strings: WORST_CHROME, baseName: 'G2-335-worst-en' }], ['sentences', DE, { locale: 'de', baseName: 'G2-335-fixture-de' }],
    ['irregular', null, { locale: 'en', baseName: 'G2-336-en' }], ['irregular', null, { locale: 'en', strings: WORST_CHROME, baseName: 'G2-336-worst-en' }], ['irregular', DE, { locale: 'de', baseName: 'G2-336-fixture-de' }], ['irregular', DE, { locale: 'de', strings: WORST_CHROME, baseName: 'G2-336-worst-de' }],
    ['choice', null, { locale: 'en', baseName: 'G2-337-en' }], ['choice', null, { locale: 'en', strings: WORST_CHROME, baseName: 'G2-337-worst-en' }], ['choice', DE, { locale: 'de', baseName: 'G2-337-fixture-de' }], ['choice', DE, { locale: 'de', strings: WORST_CHROME, baseName: 'G2-337-worst-de' }],
    ['hunt', null, { locale: 'en', baseName: 'G2-338-en' }], ['hunt', null, { locale: 'en', strings: WORST_CHROME, baseName: 'G2-338-worst-en' }], ['hunt', DE, { locale: 'de', baseName: 'G2-338-fixture-de' }], ['hunt', DE, { locale: 'de', strings: WORST_CHROME, baseName: 'G2-338-worst-de' }],
  ];
  for (const [key, inj, job] of jobs) {
    const r = key === 'irregular' ? await renderIrregular(page, inj, { difficulty: 2, ...job }) : await renderFace(page, key, inj, job);
    note(!r.fails.length, `F ${job.baseName}: ${r.fails.slice(0, 6).join(' | ')}`);
    const m = r.m || {};
    const desc = key === 'irregular'
      ? `${r.tables} table(s), ${r.cells.length} cells (${r.cells.filter((c) => c.state === 'gap').length} gaps), ${r.lanes.length} lanes`
      : key === 'match' ? `${m.kind}: ${m.blocks.length} block(s) (${m.blocks.map((b) => b.left.length + '→' + b.right.length).join(', ')}), ${m.lanes.length} lanes, bot ${r.bot.hits}/${r.bot.n}`
        : `${m.lanes.length} rows (${m.pictured} pictured; h ${[...new Set(m.lanes.map((l) => l.h))].join('/')}${key === 'choice' ? '; pills h ' + [...new Set(m.lanes.flatMap((l) => l.pills.map((p) => p.h)))].join('/') + ', idx ' + m.lanes.map((l) => l.idx).join('') : ''}${key === 'hunt' ? '; box ' + (m.lanes[0] && m.lanes[0].box ? m.lanes[0].box.w + 'x' + m.lanes[0].box.h : '?') : ''})`;
    console.log(`[F] ${job.baseName}: body ${r.body || m.body}, instr lines ${r.instrLines || m.instrLines}, ${desc} → ${r.fails.length ? 'FAIL' : 'ok'}`);
  }
  // ---- seed sweeps (en d2): variety + the stem bot on every page
  for (const key of ['match', 'sentences', 'irregular', 'choice', 'hunt']) {
    const pages = new Set(), frames = new Set(), verbs = new Set(), orders = new Set();
    let fails = 0, botMax = 0, idxAll = new Set();
    for (let s = 1; s <= seeds; s++) {
      const r = key === 'irregular' ? await renderIrregular(page, null, { difficulty: 2, locale: 'en', seedEpoch: s, baseName: `${FACE_IDS[key]}-sweep-s${s}` }) : await renderFace(page, key, null, { locale: 'en', seedEpoch: s, baseName: `${FACE_IDS[key]}-sweep-s${s}` });
      if (r.fails.length) { fails++; failures.push(`F sweep ${key} seed ${s}: ${r.fails.slice(0, 4).join(' | ')}`); }
      assertions_bump();
      if (key === 'irregular') { pages.add(r.cells.map((c) => c.verb + '/' + c.col + ':' + c.state).join(',')); r.lanes.forEach((l) => { frames.add(l.frame); verbs.add(l.verb); }); }
      else if (key === 'match') { const b = r.m.blocks[0]; pages.add(b.left.map((l) => l.verb).join(',')); orders.add(b.right.map((x) => x.text).join(',')); b.left.forEach((l) => verbs.add(l.verb)); botMax = Math.max(botMax, r.bot.hits); }
      else { pages.add(r.m.lanes.map((l) => l.verb + '/' + l.frame).join(',')); r.m.lanes.forEach((l) => { frames.add(l.frame); verbs.add(l.verb); if (l.idx != null) idxAll.add(l.idx); }); }
    }
    note(pages.size > 1, `F sweep ${key}: the page is constant across ${seeds} seeds`);
    if (key === 'match') { note(orders.size > 1, `F sweep match: the right-column order is constant`); note(verbs.size > 6, `F sweep match: only ${verbs.size} distinct verbs over ${seeds} seeds (the unpictured fill never varies)`); }
    if (['sentences', 'choice', 'hunt', 'irregular'].includes(key)) note(frames.size >= 4, `F sweep ${key}: only ${frames.size} distinct frames`);
    if (['sentences', 'choice', 'hunt'].includes(key)) note(verbs.size > 8, `F sweep ${key}: only ${verbs.size} distinct verbs over ${seeds} seeds`);
    console.log(`[F] sweep ${key}: ${seeds} seeds, ${fails} fails, ${pages.size} distinct pages, ${verbs.size} verbs, ${frames.size} frames${key === 'match' ? `, ${orders.size} orders, bot max ${botMax}` : ''}${key === 'choice' ? `, idx ${[...idxAll].sort().join('')}` : ''}`);
  }
  // ---- poisons (each must FAIL; the un-poisoned render above is the control)
  const silent = (f) => 'silent' + (f.length ? ' (failed for another reason: ' + f.slice(0, 2).join(' | ') + ')' : '');
  const poisons = [];
  const htmlPoison = (name, key, post, want, job) => poisons.push({ name, run: async () => {
    const j = { locale: (job && job.locale) || 'en', seedEpoch: (job && job.seedEpoch) || 1, strings: job && job.strings, baseName: `${FACE_IDS[key]}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 28).toLowerCase() };
    const r = key === 'irregular' ? await renderIrregular(page, (job && job.inj) || null, { difficulty: 2, ...j }, { post }) : await renderFace(page, key, (job && job.inj) || null, j, { post });
    return r.fails.some((x) => want.test(x)) ? null : silent(r.fails);
  } });
  const cfgPoison = (name, key, cfg, want, job) => poisons.push({ name, run: async () => {
    const spec = loadType(FACE_IDS[key]);
    const inj = { cfg: { ...spec.difficulty[2], ...cfg }, bank: job && job.inj && job.inj.bank };
    const j = { locale: (job && job.locale) || 'en', strings: job && job.strings, baseName: `${FACE_IDS[key]}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 28).toLowerCase() };
    try {
      const r = key === 'irregular' ? await renderIrregular(page, inj, { difficulty: 2, ...j }) : await renderFace(page, key, inj, j);
      return r.fails.some((x) => want.test(x)) ? null : silent(r.fails);
    } catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; }
  } });
  // P10 — the deferred one: strip every present distractor from the tense right column → the stem bot scores n/n
  htmlPoison('P10 F2 tense right column without present distractors — stem bot', 'match',
    (html) => need(html, /<div class="ws-match-item ws-match-item--plain" data-lcs-match-right="[^"]*" data-lcs-role="distractor" [^>]*>[\s\S]*?<\/span><\/div>/g, '', 'distractor items'), /stem bot \d+\/\d+/);
  // P6 — the deferred one: a Face-5 pill outside the paradigm
  htmlPoison('P6 F5 a candidate not in the paradigm', 'choice',
    (html) => need(html, /data-lcs-pill="([a-z]+)"([^>]*)>\1</, 'data-lcs-pill="$1st"$2>$1st<', 'a pill'), /not in the paradigm/);
  htmlPoison('PF2a F2 a target level with its own verb (derangement)', 'match', (html) => {
    // move the FIRST left verb's past-form item to the head of the right column
    const lv = /data-lcs-match-left="([a-z]+)"/.exec(html); if (!lv) throw new Error('poison needle matched nothing: left verb');
    const re = new RegExp(`<div class="ws-match-item ws-match-item--plain" data-lcs-match-right="[^"]*" data-lcs-role="target" data-lcs-verb="${lv[1]}" [^>]*>[\\s\\S]*?<\\/span><\\/div>`);
    const item = re.exec(html); if (!item) throw new Error('poison needle matched nothing: the target item');
    const rest = html.replace(item[0], '');
    return rest.replace(/(<div class="ws-match-col">)(<div class="ws-match-item ws-match-item--plain")/, `$1${item[0]}$2`);
  }, /derangement/);
  htmlPoison('PF2b F2 a hand-edited right form (node re-derivation)', 'match', (html) => need(html, /(data-lcs-match-right="([a-z]+)ed"[^>]*>[\s\S]*?<span data-lcs-match-text[^>]*>)\2ed</, '$1$2t<', 'an -ed target'), /prints ".*" \(stamp|prints ".*", the bank/);
  htmlPoison('PF2c F2 a right item printing the infinitive (gap equals anchor)', 'match', (html) => {
    const lv = /data-lcs-match-left="([a-z]+)"/.exec(html); if (!lv) throw new Error('poison needle matched nothing: left verb');
    return need(html, /(data-lcs-role="distractor"[^>]*>[\s\S]*?<span data-lcs-match-text[^>]*>)[a-z]+</, `$1${lv[1]}<`, 'a distractor text');
  }, /printed on the right|gap equals anchor/);
  htmlPoison('PF2d F2 persons: a pronoun row without its form (one per column)', 'match', (html) => need(html, /data-lcs-match-right="[^"]*" data-lcs-role="target" data-lcs-col="([a-z]+)"/, 'data-lcs-match-right="x" data-lcs-role="target" data-lcs-col="zz"', 'a persons right item'), /right items for|want 1|col zz|missing or repeated|the bank/, { locale: 'de', inj: DE });
  htmlPoison('PF3a F3 a chip that is not the infinitive', 'sentences', (html) => need(html, /(<span class="ws-nchip" data-lcs-hint[^>]*>)\(([a-z]+)\)/, '$1($2s)', 'a hint chip'), /is not the infinitive|chip/);
  htmlPoison('PF3b F3 a verb twice on the page', 'sentences', (html) => { const rows = [...html.matchAll(/data-lcs-lane data-lcs-render="gap" data-lcs-verb="([a-z]+)"/g)]; if (rows.length < 2) throw new Error('poison needle matched nothing: two lanes'); return html.replace(rows[1][0], rows[0][0]); }, /twice on the page|does not fit/);
  htmlPoison('PF3c F3 a lane sentence printing its form', 'sentences', (html) => need(html, /(data-lcs-form="([a-z]+)" data-lcs-frame="f\d+"[^>]*>[\s\S]*?<p data-lcs-sentence[^>]*>)/, '$1$2 ', 'a lane sentence'), /prints its form/);
  htmlPoison('PF4a F4 a table verb outside the core', 'irregular', (html) => need(html, /data-lcs-row data-lcs-verb="go" data-lcs-inf="go"/, 'data-lcs-row data-lcs-verb="jump" data-lcs-inf="jump"', 'the go row'), /not in irregularCore|the bank says|no bank form/);
  cfgPoison('PF4b F4 the core pool with 3 tables in persons mode (only 2 core verbs)', 'irregular', { tables: 3, verbsPerPage: 3 }, /REFUSED|outside the persons contract/, { locale: 'de', inj: DE });
  htmlPoison('PF5a F5 the correct pill always first (index constant)', 'choice', (html) => {
    // rewrite every row: put the correct pill first (stamp idx 0) — the page-side idx cover check fires
    return html.replace(/<div class="ws-lane" data-lcs-lane data-lcs-render="choice" data-lcs-idx="\d"( [^>]*data-lcs-form="([a-z]+)"[^>]*>[\s\S]*?<div data-lcs-chips[^>]*>)([\s\S]*?)(<\/div><\/div><\/div>)/g, (m0, head, form, pills, tail) => {
      const items = pills.match(/<span class="ws-pill"[\s\S]*?<\/span>/g) || [];
      const correct = items.find((it) => new RegExp(`data-lcs-pill="${form}"`).test(it));
      if (!correct) throw new Error('poison needle matched nothing: the correct pill');
      return `<div class="ws-lane" data-lcs-lane data-lcs-render="choice" data-lcs-idx="0"${head}${[correct, ...items.filter((it) => it !== correct)].join('')}${tail}`;
    });
  }, /never sits at position/);
  htmlPoison('PF5b F5 two identical pills', 'choice', (html) => need(html, /(<span class="ws-pill" data-lcs-pill="([a-z]+)"[^>]*>\2<\/span>)(<span class="ws-pill" data-lcs-pill=")[a-z]+("[^>]*>)[a-z]+(<\/span>)/, '$1$3$2$4$2$5', 'two pills'), /duplicate pill/);
  htmlPoison('PF5c F5 the sentence printing a candidate', 'choice', (html) => need(html, /(data-lcs-form="([a-z]+)" data-lcs-frame="f\d+"[^>]*>[\s\S]*?<p data-lcs-sentence[^>]*>)/, '$1$2 ', 'a choice sentence'), /prints the candidate/);
  htmlPoison('PF5d F5 the stamped idx disagreeing with the DOM', 'choice', (html) => need(html, /data-lcs-idx="0"/, 'data-lcs-idx="2"', 'an idx-0 row'), /stamped idx/);
  htmlPoison('PF6a F6 the answer box carrying text', 'hunt', (html) => need(html, /(<span class="ws-blankbox" data-lcs-infbox[^>]*>)(<\/span>)/, '$1run$2', 'an answer box'), /box carries text|dashed box carries text/);
  htmlPoison('PF6b F6 the printed form removed (0 occurrences)', 'hunt', (html) => need(html, /<span data-lcs-printed-form>[a-z]+<\/span>/, '<span data-lcs-printed-form></span>', 'a printed form'), /occurs 0 times|form span is not/);
  htmlPoison('PF6c F6 a noun-homograph token in a sentence', 'hunt', (html) => need(html, /(<p data-lcs-sentence[^>]*>)/, '$1At the dance, ', 'a hunt sentence'), /noun-homograph/);
  htmlPoison('PF6d F6 a hand-edited infinitive stamp', 'hunt', (html) => need(html, /data-lcs-verb="([a-z]+)" data-lcs-inf="\1"/, 'data-lcs-verb="$1" data-lcs-inf="$1x"', 'an inf stamp'), /inf stamp/);
  htmlPoison('PF6e F6 a second bank verb form printed in the sentence', 'hunt', (html) => need(html, /(<p data-lcs-sentence[^>]*>)/, '$1Ben sleeps and ', 'a hunt sentence'), /another bank verb form|occurs 2 times/);
  htmlPoison('PF1 F5 a pill squashed below 36', 'choice', (html) => need(html, /height:36px;padding:0 18px/g, 'height:24px;padding:0 18px', 'pills'), /< 36|want 36/);
  cfgPoison('PB1 F5 rowMin 120 under the worst chrome (the old 84-row stack)', 'choice', { rowMin: 120, rowMax: 120 }, /outside the body|overflow|footer overlap|clipped/, { strings: WORST_CHROME });
  cfgPoison('PB2 F2 tense left items 130 high under the worst chrome', 'match', { mTense: { ...loadType(FACE_IDS.match).difficulty[2].mTense, leftH: 130 } }, /outside the body|overflow|footer overlap|clipped/, { strings: WORST_CHROME });
  cfgPoison('PB3 F3 a pictured floor of 7 over 6 pictured verbs (refused)', 'sentences', { pictured: 7 }, /REFUSED|pictured/, {});
  cfgPoison('PB4 F5 nine candidates over eight rows (the index cannot cover)', 'choice', { candidates: 9 }, /cannot cover|REFUSED/, {});
  let killed = 0;
  for (const p of poisons) {
    let res;
    try { res = await p.run(); } catch (e) { res = 'threw: ' + e.message; }
    if (res == null) { killed++; console.log(`[F] killed  ${p.name}`); } else { failures.push(`F ${p.name}: ${res}`); console.log(`[F] SILENT  ${p.name}: ${res}`); }
    assertions_bump();
  }
  note(killed === poisons.length, `${poisons.length - killed} face poison(s) survived`);
  return { poisons: poisons.length, killed };
}
let _assertionsBump = () => {};
function assertions_bump() { _assertionsBump(); }

async function main() {
  const locales = arg('locales', 'en').split(',');
  const seeds = +arg('seeds', QUICK ? 6 : 20);
  const type = loadType(ID);
  let assertions = 0;
  const failures = [];
  const note = (ok, msg) => { assertions++; if (!ok) failures.push(msg); };
  _assertionsBump = () => { assertions++; };
  const bankAll = loadBank();
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    // ---- A. bank data
    for (const loc of locales) {
      const cfg = bankAll[loc];
      note(!!cfg, `A ${loc}: no bank block`);
      if (!cfg) continue;
      const r = checkBank(cfg, loc, type);
      r.report.forEach((x) => console.log(`  [A ${loc}] ${x}`));
      r.fails.forEach((x) => failures.push(x));
      assertions += 40;
      console.log(`[A] ${loc}: ${cfg.mode}, ${cfg.verbs.length} verbs (${cfg.verbs.filter((v) => v.pic).length} pictured, ${cfg.verbs.filter((v) => v.irregular).length} irregular), core ${cfg.irregularCore.length}, frames ${cfg.frames.length}, ${r.fails.length} fails`);
    }
    // fixtures as controls (a poison on a fixture is only meaningful when the fixture passes)
    const FIX = { de: SYNTH_DE, es: SYNTH_ES, fr: SYNTH_FR, nl: SYNTH_NL, sv: SYNTH_SV };
    for (const [loc, cfg] of Object.entries(FIX)) {
      const r = checkBank(cfg, loc, null);
      note(!r.fails.length, `A fixture ${loc} (control) fails: ${r.fails.join(' | ')}`);
      if (loc === 'de') r.report.forEach((x) => console.log(`  [A fixture ${loc}] ${x}`)); else console.log(`  [A fixture ${loc}] control ok (${r.report.length} refusals reported — a minimal fixture)`);
    }
    // ---- B. pictures
    for (const key of ALLOWLIST) { const [th, n] = key.split('/'); note(fs.existsSync(picPath(th, n)), `B: allowlist picture ${key} is not on disk`); }
    for (const key of OBJECTS) note(!ALLOWLIST.has(key), `B: ${key} is in the allowlist`);
    const en = bankAll.en;
    note(en.verbs.filter((v) => v.pic).every((v) => v.picOpened === true), 'B: an en picture was not opened');
    // ---- C. renders
    const jobs = [];
    for (const d of [1, 2, 3]) jobs.push({ difficulty: d, locale: 'en', baseName: `${ID}-gate-d${d}-en` });
    for (const d of [1, 2, 3]) jobs.push({ difficulty: d, locale: 'en', strings: WORST_CHROME, baseName: `${ID}-gate-worst-d${d}-en` });
    for (const d of [1, 2, 3]) jobs.push({ difficulty: d, locale: 'de', inj: { bank: SYNTH_DE }, baseName: `${ID}-gate-fixture-d${d}-de` });
    const widths = {};
    for (const j of jobs) {
      const r = await renderCheck(page, type, j.inj || null, j);
      note(!r.fails.length, `C ${j.baseName}: ${r.fails.join(' | ')}`);
      Object.assign(widths, r.widths);
      console.log(`[C] ${j.baseName}: body ${r.body}, instr lines ${r.instrLines}, ${r.tables} table(s), ${r.cells.length} cells (${r.cells.filter((c) => c.state === 'gap').length} gaps, ${r.cells.filter((c) => c.state === 'anchor').length} anchors), ${r.lanes.length} lanes (h ${r.lanes.map((l) => l.h).join('/')}) → ${r.fails.length ? 'FAIL' : 'ok'}`);
    }
    console.log(`[C] measured widths: box ${widths.box}; labels ` + Object.entries(widths).filter(([k]) => k !== 'box').sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, v]) => `${k} ${v}`).join(', '));
    // seed sweep en d2 (+ de fixture d2): every eligible verb appears, both columns take gaps, gap sets vary, lane frames vary
    for (const [loc, inj] of [['en', null], ['de', { bank: SYNTH_DE }]]) {
      const verbsSeen = new Set(), gapSets = new Set(), frames = new Set(), colsGapped = new Set();
      let fails = 0;
      for (let s = 1; s <= seeds; s++) {
        const r = await renderCheck(page, type, inj, { difficulty: 2, locale: loc, seedEpoch: s, baseName: `${ID}-gate-sweep-${loc}-s${s}` });
        if (r.fails.length) { fails++; failures.push(`C sweep ${loc} seed ${s}: ${r.fails.slice(0, 4).join(' | ')}`); }
        r.cells.forEach((c) => { verbsSeen.add(c.verb); if (c.state === 'gap') colsGapped.add(c.col); });
        gapSets.add(r.cells.filter((c) => c.state === 'gap').map((c) => c.verb + '/' + c.col).sort().join(','));
        r.lanes.forEach((l) => frames.add(l.frame));
        assertions++;
      }
      const bankLoc = (inj && inj.bank) || bankAll[loc];
      const pool = type.eligible(bankLoc, bankLoc.units.find((u) => u.key === bankLoc.exemplar), type.poolFor(bankLoc, type.difficulty[2].pool)).map((v) => v.inf);
      const missing = pool.filter((v) => !verbsSeen.has(v));
      note(!missing.length, `C sweep ${loc}: pool verbs never on a page in ${seeds} seeds: ${missing.join(', ')}`);
      note(gapSets.size > 1, `C sweep ${loc}: the gap set is constant across ${seeds} seeds`);
      note(frames.size >= 4, `C sweep ${loc}: only ${frames.size} distinct lane frames across ${seeds} seeds`);
      if (bankLoc.mode === 'tense') note(colsGapped.size === 2, `C sweep ${loc}: gaps never reach both columns`);
      console.log(`[C] sweep ${loc}: ${seeds} seeds, ${fails} fails, verbs ${[...verbsSeen].length}/${pool.length} of the pool, ${gapSets.size} gap sets, ${frames.size} frames`);
    }
    // ---- D. poisons (each must FAIL; control = the correct bank + page)
    const silent = (f) => 'silent' + (f.length ? ' (failed for another reason: ' + f.slice(0, 2).join(' | ') + ')' : '');
    const poisons = [];
    const bankPoison = (name, loc, base, mut, want) => poisons.push({ name, run: async () => { const b = clone(base); mut(b); const f = checkBank(b, loc, null).fails; return f.some((x) => want.test(x)) ? null : silent(f); } });
    bankPoison('P1 de backen twice (bäckt / backt) — two forms for one cell', 'de', SYNTH_DE, (b) => { b.verbs.push(dv('backen', P('backe', 'backst', 'bäckt', 'backen', 'backt', 'backen'))); }, /two forms for one cell/);
    bankPoison('P2 fr courir in the CE1 regular pool — 3e groupe', 'fr', SYNTH_FR, (b) => { b.verbs[1].irregular = false; }, /3e groupe/);
    bankPoison('P3 es matchPersons with ustedes AND ellos — duplicate form cantan', 'es', SYNTH_ES, (b) => { b.matchPersons.push('ustedes'); }, /duplicate form "cantan"/);
    bankPoison('P5 de frame "Sie {form} im Park." — ambiguous person', 'de', SYNTH_DE, (b) => { b.frames.push({ id: 'dx', text: 'Sie {form} im Park.', col: 'sie', unit: 'praesens', fits: ['laufen'], subjectLiteral: 'Sie', pic: null }); }, /ambiguous person/);
    bankPoison('P5b nl frame "Zij {form} in het park." — ambiguous person', 'nl', SYNTH_NL, (b) => { b.frames.push({ id: 'nx', text: 'Zij {form} in het park.', col: 'zij', unit: 'tt', fits: ['lopen'], subjectLiteral: 'Zij', pic: null }); }, /ambiguous person/);
    bankPoison('P7 activities/painting on malen — picture is not an action', 'de', SYNTH_DE, (b) => { b.verbs[1].pic = { theme: 'activities', noun: 'painting' }; }, /not an action/);
    bankPoison('P8 sv mode:persons — no person marking', 'sv', SYNTH_SV, (b) => { b.mode = 'persons'; b.columns = DE_COLS; b.verbs[0].forms['nu-igar'] = { ich: 'hoppar', du: 'hoppar', er: 'hoppar', wir: 'hoppar', ihr: 'hoppar', sie: 'hoppar' }; }, /no person marking/);
    bankPoison('P11 de matchPersons ich du er ihr on malen — duplicate form malt', 'de', SYNTH_DE, (b) => { b.matchPersons = ['ich', 'du', 'er', 'ihr']; }, /malen matchPersons .*duplicate form "malt"/);
    bankPoison('P19 a worksheet-word title', 'en', en, (b) => { b.strings.F3.title = 'Verb Forms Worksheet with Pictures'; }, /worksheet word/);
    bankPoison('P20 a free claim in the instruction', 'en', en, (b) => { b.strings['G2-317'].instruction = 'This free printable page is yours. Write every missing form.'; }, /claims? free/);
    bankPoison('P25 an object picture on an en verb', 'en', en, (b) => { b.verbs.find((v) => v.inf === 'swim').pic = { theme: 'activities', noun: 'swimming' }; b.verbs.find((v) => v.inf === 'swim').picOpened = true; }, /not an action/);
    bankPoison('P26 a frame over 44 chars', 'en', en, (b) => { b.frames[0].text = 'Every single day of the week Mia {form} in the big park.'; }, /> 44/);
    bankPoison('P27 a frame carrying a noun-homograph token', 'en', en, (b) => { b.frames[0].text = 'At the dance Mia {form} a lot.'; }, /noun-homograph/);
    bankPoison('P28 an infinitive outside word-classes', 'en', en, (b) => { b.verbs[0].inf = 'sprint'; b.frames.forEach((f) => { f.fits = f.fits.map((x) => (x === 'run' ? 'sprint' : x)); }); }, /not a word-classes citation form/);
    // HTML poisons: mutate the rendered body; a needle that matches nothing THROWS (a vacuous poison is a defect)
    const need = (html, re, to, what) => { if (!re.test(html)) throw new Error(`poison needle matched nothing: ${what}`); re.lastIndex = 0; return html.replace(re, to); };
    const cellRe = (verb, col) => new RegExp(`<div data-lcs-col="${col}" data-lcs-cell="(given|gap|anchor)" data-lcs-form="([^"]*)"( data-lcs-hard="1")?[^>]*>[\\s\\S]*?</div>`);
    const htmlPoison = (name, post, want, job) => poisons.push({ name, run: async () => {
      const r = await renderCheck(page, type, (job && job.inj) || null, { difficulty: 2, locale: (job && job.locale) || 'en', seedEpoch: (job && job.seedEpoch) || 1, strings: job && job.strings, baseName: `${ID}-poison-` + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 28).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : silent(r.fails);
    } });
    // P4: the seed whose en d2 page carries `read` (its past is the anchor) — found by replay, never assumed
    const seedWith = async (inf, inj, loc) => { for (let s = 1; s <= 40; s++) { const r = await renderCheck(page, type, inj || null, { difficulty: 2, locale: loc || 'en', seedEpoch: s, baseName: `${ID}-poison-seek` }); if (r.cells.some((c) => c.verb === inf)) return s; } throw new Error(`no seed put ${inf} on a page`); };
    const readSeed = await seedWith('read');
    htmlPoison('P4 en gapping past read — gap equals anchor', (html) => {
      const at = html.indexOf('data-lcs-row data-lcs-verb="read"'); if (at < 0) throw new Error('poison needle matched nothing: read row');
      const re = /<div data-lcs-col="past" data-lcs-cell="anchor" data-lcs-form="read"[^>]*>read<\/div>/;
      if (!re.test(html.slice(at))) throw new Error('poison needle matched nothing: read/past anchor');
      return html.slice(0, at) + html.slice(at).replace(re, '<div data-lcs-col="past" data-lcs-cell="gap" data-lcs-form="read" data-lcs-hard="1" style="display:flex;align-items:center"><span class="ws-blankbox" style="width:206px;height:36px"></span></div>');
    }, /gap equals anchor|equals a printed text/, { seedEpoch: readSeed });
    htmlPoison('P9 de givens on a table — hard gaps 2 < 3', (html) => need(html, /<div data-lcs-col="([a-z]+)" data-lcs-cell="gap" data-lcs-form="([^"]*)" data-lcs-hard="1" style="display:flex;align-items:center;min-width:0"><span class="ws-blankbox"[^>]*><\/span><\/div>/, (m, col, form) => `<div data-lcs-col="${col}" data-lcs-cell="given" data-lcs-form="${form}" style="display:flex;align-items:center;min-width:0;padding-left:8px">${form}</div>`, 'first de gap'), /hard gaps 2 < 3/, { locale: 'de', inj: { bank: SYNTH_DE } });
    htmlPoison('P12 a hand-edited gap form (node re-derivation)', (html) => need(html, /data-lcs-cell="gap" data-lcs-form="([a-z]+)ed"/, 'data-lcs-cell="gap" data-lcs-form="$1t"', 'an -ed gap'), /refill: .* stamps ".*", the bank says/);
    htmlPoison('P12b a hand-edited given text', (html) => need(html, /(data-lcs-cell="given" data-lcs-form="([a-z]+)"[^>]*>)\2(<\/div>)/, (m, a, f, z) => `${a}${f}x${z}`, 'a given cell'), /prints ".*" not ".*"|prints ".*", the bank says/);
    htmlPoison('P24 a hand-edited frame text', (html) => need(html, /(<p data-lcs-sentence[^>]*>)([A-Z][a-z]+ )/, '$1Sometimes $2', 'a lane sentence'), /refill: lane \d prints/);
    htmlPoison('P13 a 22-letter infinitive — label overflow', (html) => need(html, /(<span data-lcs-inf [^>]*>)([a-z]+)(<\/span>)/, '$1$2verbverbverbverbverbverb$3', 'a row label'), /overflows its grid cell|outside its row/);
    htmlPoison('P14 pictures squashed below 36', (html) => need(html, /width:44px;height:44px;flex:0 0 44px/g, 'width:30px;height:30px;flex:0 0 30px', 'row pictures'), /< 36/);
    htmlPoison('P15 an empty table (non-vacuity)', (html) => need(html, /<div data-lcs-row [\s\S]*?(?=<\/div><div data-lcs-lanes)/, '', 'table rows'), /non-vacuity|verb rows|no cells/);
    htmlPoison('P16 an unfilled {form} in a lane', (html) => need(html, /<span class="ws-blankbox" data-lcs-gapbox[^>]*><\/span>/, '{form}', 'a lane box'), /unfilled slot|boxes, want 1/);
    htmlPoison('P17 a lane sentence printing its form', (html) => need(html, /(data-lcs-form="([a-z]+)" data-lcs-frame="f\d+"[^>]*>[\s\S]*?<p data-lcs-sentence[^>]*>)/, '$1$2 ', 'a lane sentence'), /prints its form/);
    htmlPoison('P22 a verb twice on the page', (html) => { const rows = [...html.matchAll(/data-lcs-row data-lcs-verb="([a-z]+)" data-lcs-inf="([a-z]+)"/g)]; if (rows.length < 2) throw new Error('poison needle matched nothing: two rows'); return html.replace(rows[1][0], `data-lcs-row data-lcs-verb="${rows[0][1]}" data-lcs-inf="${rows[0][2]}"`); }, /twice on the page/);
    htmlPoison('P23 a lane on an anchor cell', (html) => need(html, /data-lcs-verb="[a-z]+" data-lcs-col="[a-z]+" data-lcs-form="[a-z]+" data-lcs-frame="/, 'data-lcs-verb="read" data-lcs-col="past" data-lcs-form="read" data-lcs-frame="', 'a lane'), /is an anchor cell/, { seedEpoch: readSeed });
    poisons.push({ name: 'P18 a 5-pictured-verb pool refused at build', run: async () => {
      const b = clone(bankAll.en); b.verbs.find((v) => v.inf === 'wander').pic = null;
      try { await renderCheck(page, type, { bank: b }, { difficulty: 2, locale: 'en', baseName: `${ID}-poison-p18` }); return 'silent (rendered with 5 pictured verbs)'; } catch (e) { return /REFUSED/.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    poisons.push({ name: 'P21 the old 760 stack under the worst chrome', run: async () => {
      const r = await renderCheck(page, type, { cfg: { ...type.difficulty[2], laneMin: 120, laneMax: 120 } }, { difficulty: 2, locale: 'en', strings: WORST_CHROME, baseName: `${ID}-poison-p21` });
      return r.fails.some((x) => /overflow|footer overlap|outside the body|clipped/.test(x)) ? null : silent(r.fails);
    } });
    let killed = 0;
    const deferred = ['P6 Face 5 candidate not in the paradigm (Face 5 code)', 'P10 Face 2 tense column without present distractors (Face 2 code)'];
    for (const p of poisons) {
      let res;
      try { res = await p.run(); } catch (e) { res = 'threw: ' + e.message; }
      if (res == null) { killed++; console.log(`[D] killed  ${p.name}`); } else { failures.push(`D ${p.name}: ${res}`); console.log(`[D] SILENT  ${p.name}: ${res}`); }
      assertions++;
    }
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    // ---- F. the faces (Phase 2) — incl. the two poisons the base deferred (P6, P10)
    fs.mkdirSync(OUT_F, { recursive: true });
    const F = await runFaces(page, note, failures, seeds, bankAll);
    const verdict = failures.length === 0;
    failures.forEach((f) => console.log('FAIL ' + f));
    const pk = killed + F.killed, pn = poisons.length + F.poisons;
    console.log(`${ID} gate: ${verdict ? 'PASS' : 'FAIL'} (${assertions} assertions, ${pk}/${pn} poisons killed; base ${killed}/${poisons.length} + faces ${F.killed}/${F.poisons}, the ${deferred.length} deferred now land in the faces)`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
