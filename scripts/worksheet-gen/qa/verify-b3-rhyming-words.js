#!/usr/bin/env node
/**
 * verify-b3-rhyming-words.js — the G1-309 `rhyming-words` gate (design file
 * docs/worksheet-gen/b3-designs/G1-309-rhyming-words.md §5, where it is named
 * `verify-b3-rhymes.js`; brief deliverable 4 names it after the family key).
 *
 *   node scripts/worksheet-gen/qa/verify-b3-rhyming-words.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/rhyming-words.js against the §5
 *    validator rules (the `tools/validate-b3-draft.js` rhymes block, folded in
 *    here and exported as `validateBank`):
 *    (1) every member vocabKey exists in `entriesFor(pic.theme, loc)` (so
 *        B2_EXCLUDE applies), `word === displayWord(singular, loc)`
 *        case-folded, picOpened:true, the (theme/noun) in OPENED (the record
 *        of the pictures the builder opened — the human open IS the gate);
 *    (2) no localized B&W marker on any pic.theme; (3) a vocabKey in exactly
 *        one class; no two classes share rime + sound; no member WORD twice
 *        (across classes AND inside one — the `spis` dedup trap); (4) class
 *        size >= 2, cap >= 3; base needs >= 8 classes >= 2 and >= 24
 *        classified words (FAIL); F2 (>= 3 classes >= 3), F4 (>= 4 classes
 *        >= 3 + >= 4 other pictured words), F5 (>= 6 productive anchors) are
 *        REPORTED refusals; (5) sameSpelling:true iff word.endsWith(rime);
 *        where orthographyTrusted:false every member carries the flag
 *        explicitly; (6) fi: the class rime ends the word ON a syllable
 *        boundary of the approved split (the join of its last 1 or 2
 *        syllables; a fi member absent from approved-words-fi = FAIL); other
 *        locales: a member present in approved-words-<loc> with another word
 *        = WARN; (7) nearMiss entries are pictured, opened, NOT in the class,
 *        their word === displayWord; (8) en: each of the 8 pairs of
 *        data/literacy/rhyming-pairs.json lands in ONE class; (9) couplets:
 *        lines[1] has one ___, no line prints the answer, rhymeWith in the
 *        answer class's members/extra, line 1 <= 45 / line 2 <= 40 chars
 *        before the blank, >= 8 else F3 reported refused; (10) strings:
 *        worksheet-word guard, title <= 70, da titles contain "rimord",
 *        instruction <= 150, en === the spec's i18n.en; (11) exemplar ids
 *        exist, are distinct, and each can anchor a d2 row (>= 2 writable
 *        members).
 *    The gate MAY read the vocab / approved words / rhyming-pairs.json; the
 *    spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1/d2/d3 en; d1/d2/d3 under a 70-char de title + 150-char
 *    instruction and the same in fi (the README 722 floor); the K shape
 *    (sv/da/no level key) on the en bank at d1/d2/d3; two unit renders.
 *    Asserts verify() empty, qa/lints.js clean, the floors ITSELF (every
 *    `.ws-icon` >= 44 G1 / 56 K, glyphH >= 26 / 40, lane height === config,
 *    rows === config, every row's content inside its card's content box and
 *    above the footer, the row inside the body column), and the NODE
 *    cross-check: every stamped (vocabKey, class, word, picture) is a bank
 *    member VERBATIM, foils are in the anchor's nearMiss, the rhyming pair is
 *    sameSpelling:true where orthography is not trusted, no plain distractor
 *    is a near-miss of the anchor's class, the unit class is on the page.
 * 3. SWEEP — 20 seeds × d1/d2/d3 (build only) + the K shape: the rhyme
 *    position never constant, every vocabKey once, every class once, the
 *    exemplar set present with no unit, >= 2 distinct pages per level
 *    (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct EN
 *    bank is the control. Design §5 poisons:
 *      P1  a distractor from the anchor's OWN class on a base row  → verify() (two rings of the class) + the node cross-check
 *      P2  {vocabKey:'lynx'} (not pictured)                         → bank rule 1 + build refusal
 *      P3  `dog` in -og AND a second class                          → bank rule 3 + the spec refuses
 *      P4  a couplet whose line 2 prints the answer                 → bank rule 9
 *      P5  a `zoo animals bw` pic                                    → bank rule 2 + build refusal + verify()
 *      P6  en bee/tree split across two classes                     → bank rule 8
 *      P7  fi member whose rime is not on a split boundary          → bank rule 6 (synthetic fi block)
 *      P8  two distractors of one row from ONE class (the base analogue of the F1 "non-rhyming pair drawn from one class"; F1 is Phase 2) → verify()
 *      P9  da title "Rim og ramser"                                 → bank rule 10 (synthetic da block)
 *      P10 the old 760 base stack under the 722 chrome              → qa/lints.js footer / overflow lint
 *      P11 `spis` under two vocabKeys in one class                  → bank rule 3 (word twice)
 *    plus the base's own, from the design's verify() list:
 *      PA  the rhyming word printed on the page                     → verify()
 *      PP  the rhyme position constant                              → verify()
 *      PS  d1 starter ≠ the first glyph of the rhyming word          → verify()
 *      PF  a d3 foil outside the anchor's nearMiss                  → the node cross-check
 *      PN  a plain d2 distractor that is a near-miss of the class    → the node cross-check
 *      PW  the rhyming pair with a sameSpelling:false member          → the node cross-check
 *      PU  a unit render whose class is not on the page             → the node cross-check
 *      PC  a row wider than its card (clipped by overflow:hidden)   → verify()
 *      PI  a 36 px choice picture                                   → the spec guard + verify() + the gate floor
 *      PL  an unauthored locale REFUSES                             → bank()
 *
 * 5. FACES (Phase 2, design §3; tools/b3var-rows/rhyming-words.js; record
 *    _work/G1-309-faces.md). The five face specs are loaded from disk by id
 *    (K-352 judge · G1-343 sort · G1-344 couplet · G1-345 string · G1-346
 *    open) and rendered through the real pipeline at d2 en, under the
 *    three-line chrome (the README 722 floor), under the fi long-compound
 *    title, the sort + string faces in the K shape (sv/da/no) on the en bank,
 *    and one unit render each (couplet has no unit axis). Every render:
 *    verify() empty, lints clean, the face's own floors measured (pictures
 *    >= 44 G1 / 56 K, glyphH >= 26 / 40, chips >= 56), the mode + band
 *    stamps === the row, nothing under the footer, and the NODE cross-check
 *    (crossCheckFace): every stamped (key, class, word, picture) is a bank
 *    member VERBATIM; judge non-pairs from distinct classes with distinct
 *    SOUNDS and never each other's near-miss; sort / string / open draw
 *    writable members for every WRITTEN word (a sort head / string anchor is
 *    a picture only, any member); string foils from classes off the page whose sound is
 *    off the page too; open anchors productive; couplets are bank couplets.
 *    Base renders assert NO data-lcs-mode stamp (byte-identity's page-side
 *    twin). The 20-seed sweep covers each face (build only). Face poisons
 *    (each must FAIL for its OWN reason; the correct en bank + the shipped
 *    rows are the control):
 *      FJ1 a "non-rhyming" F1 pair drawn from ONE class (design P8)   → verify()
 *      FJ2 7 of 8 cards rhyme (one verdict nearly constant)          → verify() + the gate (stamp ≠ config)
 *      FJ3 every rhyming pair in one column                          → verify()
 *      FJ4 a chip printing "yes"                                     → verify()
 *      FJ5 a coral cross (a verdict by colour)                       → verify()
 *      FJ6 a word twice on the page                                  → verify()
 *      FJ7 a non-pair whose two classes share a SOUND (synthetic bank) → the node cross-check
 *      FJ8 a 48 px picture on the K face                             → _planFace refuses
 *      FJ9 a non-pair that is a near-miss pair (cat / cap)           → the node cross-check
 *      FS1 a bank picture whose class is no bin's                    → verify()
 *      FS2 two bins of one class                                     → verify()
 *      FS3 a bin's two members adjacent in the bank                  → verify()
 *      FS4 a bin head also in the bank                               → verify()
 *      FS5 a lane with printed text                                  → verify()
 *      FS6 a unit that cannot head a bin (un: 2 writable)            → _planFace refuses
 *      FS7 a bank picture stamped with another class (dog as -at)    → the node cross-check
 *      FC1 line 2 printing the answer                                → verify()
 *      FC2 line 1 without the rhyme partner                          → verify()
 *      FC3 the same answer twice                                     → verify()
 *      FC4 the lane pre-filled                                       → verify()
 *      FC5 a bank of 7 couplets                                      → _planFace refuses (F3 refused)
 *      FC6 the line-2 text floating 6 px off the base line           → verify()
 *      FC7 a 70-char verse line                                      → verify()
 *      FT1 the bank missing an answer                                → verify()
 *      FT2 a foil from an anchor's class                             → verify()
 *      FT3 an anchor's two answers adjacent                          → verify()
 *      FT4 the anchor's own word in the bank                         → verify()
 *      FT5 a bank that needs three rows                              → _planFace refuses + verify()
 *      FT6 a foil whose class shares an anchor's SOUND (synthetic)   → the node cross-check
 *      FO1 the printed word ≠ the stamped word                       → verify()
 *      FO2 a class twice                                             → verify()
 *      FO3 a ruling with text                                        → verify()
 *      FO4 a productive:false anchor (synthetic bank)                → the node cross-check
 *      FO5 a sameSpelling:false anchor (key) on the write face       → the node cross-check
 *      FM  the base page stamped data-lcs-mode="judge"               → verify() (dispatches, fails)
 *      FL  an unauthored locale refuses on every face                → bank()
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule, approvedByKey } = require('../lib/b3-common.js');
const { entriesFor, displayWord, excluded, fileUri } = require('../lib/b2-common.js');
const { candidates } = require('../lib/b3-picture-index.js');
const tokens = require('../primitives/_tokens.js');
const { cardGrid } = require('../templates/layouts/card-grid.js');
const { rhymeRow } = require('../templates/components-b3.js');

const TYPE = require('../types/g1/G1-309-rhyming-words.js');
const { loadType } = require('../lib/load-types.js');
const { ROWS } = require('../tools/b3var-rows/rhyming-words.js');
/** The five faces: id → { mode, band (en), the emitted spec, the row's config }. */
const FACES = ROWS.map((r) => ({ id: r[1], mode: r[5].mode, band: (r[8] && r[8].gradeBand) || 'G1', title: r[6], instruction: r[7], spec: loadType(r[1]), cfg: r[5] }));
const FACE_BY_MODE = Object.fromEntries(FACES.map((f) => [f.mode, f]));
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const FLOOR = { G1: tokens.density.G1.minElement, K: tokens.density.K.minElement };   // 44 / 56
const GLYPH_FLOOR = { G1: 26, K: 40 };
const WORD_RE = /^[\p{L}\-']+$/u;
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i;
const ORTHO_UNTRUSTED = ['en', 'fr', 'da'];
const RHYMING_PAIRS = require('../data/literacy/rhyming-pairs.json').pairs;

/**
 * The pictures OPENED 2026-09-14 (contact sheets out/dev/G1-309-pictures-sheet-{1,2,3}.png — every candidate
 * picture of every candidate word — and G1-309-pictures-zoom.png at 220 px for the doubtful ones) and the
 * word each honestly shows. A bank picture outside this record FAILS — the human open is the gate.
 * Refused (opened, wrong for the word): body parts/knee = a bent leg · body parts/hair = a girl's face ·
 * spring/rain = a cloud with a face · camping/trail + camping/lake = landscapes · winter/ice = an ice sheet ·
 * At the Supermarket/rice = a carton · birds 2/quail + birds 2/stork + birds 2/dove = "a bird" · occupations/cook
 * = a chef · farm animals/ox = "a cow" · body parts/lip = lips · clothing/blouse = "a shirt" · bakery/tart = "a pie"
 * · Things That Fly/jet = "a plane" · fruits/fig · activities/chess = a king piece · body parts/heel = a foot ·
 * post office/scale · kitchen tools/pan = a lidded pot (around the house/pan is the frying pan) · around the
 * house/rug = a polka-dot frame (furniture/rug is a rug) · birds 2/crane = the bird (vehicles/crane is the
 * crane) · every `* bw` dir. `christmas/tree` is a decorated Christmas tree and the library's ONLY `tree`.
 */
const OPENED = {
  'animals/cat': 'cat', 'farm animals/cat': 'cat', 'pets/cat': 'cat',
  'accessories/hat': 'hat', 'beach/hat': 'hat', 'camping/hat': 'hat', 'clothing/hat': 'hat', 'winter/hat': 'hat',
  'animals/bat': 'bat', 'Things That Fly/bat': 'bat', 'forest creatures/bat': 'bat', 'zoo animals/bat': 'bat',
  'animals/dog': 'dog', 'farm animals/dog': 'dog', 'pets/dog': 'dog',
  'forest creatures/frog': 'frog', 'camping/frog': 'frog', 'pets/frog': 'frog', 'reptiles and Amphibians/frog': 'frog', 'spring/frog': 'frog',
  'camping/log': 'log', 'beach/sun': 'sun', 'spring/sun': 'sun', 'weather/sun': 'sun', 'bakery/bun': 'bun',
  'christmas/star': 'star', 'shapes/star': 'star', 'vehicles/car': 'car', 'toys/car': 'car', 'kitchen tools/jar': 'jar', 'music/guitar': 'guitar', 'activities/guitar': 'guitar',
  'farm animals/bee': 'bee', 'Things That Fly/bee': 'bee', 'forest creatures/bee': 'bee', 'insects and bugs/bee': 'bee', 'spring/bee': 'bee',
  'christmas/tree': 'tree', 'around the house/key': 'key',
  'vehicles/boat': 'boat', 'beach/boat': 'boat', 'toys/boat': 'boat', 'clothing/coat': 'coat', 'winter/coat': 'coat', 'farm animals/goat': 'goat',
  'around the house/bed': 'bed', 'furniture/bed': 'bed', 'hospital/bed': 'bed', 'winter/sled': 'sled', 'At the Supermarket/bread': 'bread', 'thanksgivinng/bread': 'bread', 'body parts/head': 'head',
  'At the Supermarket/bag': 'bag', '4th of July/flag': 'flag',
  'accessories/sock': 'sock', 'around the house/clock': 'clock', 'classroom/clock': 'clock', 'around the house/lock': 'lock', 'camping/rock': 'rock', 'beach/rock': 'rock',
  'furniture/rug': 'rug', 'forest creatures/slug': 'slug', 'insects and bugs/slug': 'slug', 'kitchen tools/jug': 'jug', 'kitchen tools/mug': 'mug',
  'At the Supermarket/can': 'can', 'around the house/fan': 'fan', 'around the house/pan': 'pan', 'vehicles/van': 'van',
  'body parts/hand': 'hand', 'summer/sand': 'sand',
  'vehicles/train': 'train', 'toys/train': 'train', 'body parts/brain': 'brain', 'vehicles/crane': 'crane',
  'tools/nail': 'nail', 'forest creatures/snail': 'snail', 'insects and bugs/snail': 'snail', 'spring/snail': 'snail', 'ocean life/whale': 'whale', 'animals/whale': 'whale', 'beach/whale': 'whale',
  'fruits/pear': 'pear', 'At the Supermarket/pear': 'pear', 'camping/bear': 'bear', 'forest creatures/bear': 'bear', 'zoo animals/bear': 'bear',
  'furniture/chair': 'chair', 'around the house/chair': 'chair', 'classroom/chair': 'chair',
  'bakery/cake': 'cake', '4th of July/cake': 'cake', 'At the Supermarket/cake': 'cake', 'desserts and sweets/cake': 'cake', 'around the house/rake': 'rake',
  'flowers/rose': 'rose', 'body parts/nose': 'nose', 'around the house/hose': 'hose',
  'shapes/moon': 'moon', 'camping/moon': 'moon', 'space/moon': 'moon', 'kitchen tools/spoon': 'spoon', 'around the house/spoon': 'spoon',
  'Things That Fly/balloon': 'balloon', '4th of July/balloon': 'balloon', 'toys/balloon': 'balloon', 'forest creatures/raccoon': 'raccoon', 'animals/raccoon': 'raccoon', 'camping/raccoon': 'raccoon',
  'accessories/ring': 'ring', 'toys/swing': 'swing', 'farm animals/sheep': 'sheep', 'animals/sheep': 'sheep', 'vehicles/jeep': 'jeep',
  'furniture/lamp': 'lamp', 'around the house/lamp': 'lamp', 'post office/stamp': 'stamp', 'classroom/pen': 'pen', 'around the house/pen': 'pen', 'farm animals/hen': 'hen', 'birds 2/hen': 'hen',
  'spring/nest': 'nest', 'clothing/vest': 'vest', 'accessories/vest': 'vest', 'camping/vest': 'vest', 'clothing/shirt': 'shirt', 'clothing/skirt': 'skirt',
  'furniture/stool': 'stool', 'summer/pool': 'pool', 'pets/mouse': 'mouse', 'forest creatures/mouse': 'mouse', 'miscellaneous/house': 'house',
  'clothing/cap': 'cap', 'accessories/cap': 'cap', 'summer/cap': 'cap', 'classroom/map': 'map', 'camping/map': 'map',
  'fruits/plum': 'plum', 'At the Supermarket/plum': 'plum', 'music/drum': 'drum', 'body parts/thumb': 'thumb',
  'farm animals/duck': 'duck', 'animals/duck': 'duck', 'birds 2/duck': 'duck', 'Things That Fly/duck': 'duck', 'vehicles/truck': 'truck', 'toys/truck': 'truck', 'post office/truck': 'truck',
  'bakery/pie': 'pie', 'At the Supermarket/pie': 'pie', 'desserts and sweets/pie': 'pie', 'thanksgivinng/pie': 'pie', 'clothing/tie': 'tie', 'accessories/tie': 'tie', 'body parts/eye': 'eye',
  'fruits/peach': 'peach', 'At the Supermarket/peach': 'peach', 'summer/beach': 'beach',
  'At the Supermarket/cart': 'cart', 'shapes/heart': 'heart', 'At the Supermarket/ham': 'ham', 'At the Supermarket/jam': 'jam', 'breakfast/jam': 'jam',
  'easter/egg': 'egg', 'body parts/leg': 'leg', 'around the house/gate': 'gate', 'around the house/plate': 'plate', 'kitchen tools/plate': 'plate',
  // near-miss foils
  'toys/doll': 'doll', 'vehicles/bus': 'bus', 'Things That Fly/beetle': 'beetle', 'kitchen tools/bowl': 'bowl', 'around the house/bowl': 'bowl', 'shapes/cone': 'cone',
  'christmas/bell': 'bell', 'accessories/belt': 'belt', 'space/rocket': 'rocket', 'bakery/muffin': 'muffin', 'clothing/pants': 'pants', 'classroom/crayon': 'crayon',
  'beach/wave': 'wave', 'At the Supermarket/pepper': 'pepper', 'fruits/cherry': 'cherry', 'camping/rope': 'rope', 'toys/robot': 'robot', 'animals/moose': 'moose',
  'clothing/jeans': 'jeans', 'forest creatures/hedgehog': 'hedgehog', 'beach/net': 'net', 'body parts/mouth': 'mouth', 'hospital/mask': 'mask', 'tools/plunger': 'plunger',
  'around the house/dustpan': 'dustpan', 'animals/tiger': 'tiger', 'At the Supermarket/peas': 'peas', 'clothing/jacket': 'jacket', 'fruits/lemon': 'lemon', 'christmas/elf': 'elf',
  // opened and REFUSED — present so a bank pin fails on "not what its name says", not on "unknown"
  'body parts/knee': null, 'body parts/hair': null, 'spring/rain': null, 'camping/trail': null, 'camping/lake': null, 'winter/ice': null, 'At the Supermarket/rice': null,
  'birds 2/quail': null, 'birds 2/stork': null, 'birds 2/dove': null, 'occupations/cook': null, 'farm animals/ox': null, 'body parts/lip': null, 'clothing/blouse': null,
  'bakery/tart': null, 'Things That Fly/jet': null, 'vehicles/jet': null, 'fruits/fig': null, 'activities/chess': null, 'toys/chess': null, 'body parts/heel': null, 'post office/scale': null,
  'kitchen tools/pan': null, 'around the house/rug': null, 'birds 2/crane': null, 'accessories/cape': null, 'spring/bud': null, 'christmas/sack': null, 'forest creatures/toad': null,
  'occupations/pilot': null, 'flowers/crocus': null, 'accessories/ribbon': null, 'body parts/neck': null, 'around the house/heater': null, 'farm animals/bull': null,
};

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const wordRe = (w) => new RegExp('(?<!\\p{L})' + String(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u');
const glyphs = (s) => [...String(s)].length;

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc, opts = {}) {
  const f = [];
  const notes = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  const lower = (s) => String(s).toLocaleLowerCase(loc);
  // The human open is the gate — and for a non-en locale the human is the PANEL: a locale
  // block may carry its own `opened` record ({"theme/noun": vocabKey|null}, the same shape as
  // OPENED) which is merged for that locale only; en keeps the build's table (2026-09-14:
  // de/nl/fr all lost rhyme faces to an EN-only table before this).
  if (loc === 'en' && bank.opened) push("en block must not carry `opened` (the build's OPENED table is the en record)");
  const OPENED_LOC = (loc !== 'en' && bank.opened && typeof bank.opened === 'object') ? { ...OPENED, ...bank.opened } : OPENED;
  const classes = Array.isArray(bank.classes) ? bank.classes : [];
  if (!classes.length) { push('no classes'); return { fails: f, notes, counts: {} }; }
  if (!['stressedVowelCoda', 'lastTwoSyllables'].includes(bank.rule)) push(`rule "${bank.rule}"`);
  if (typeof bank.orthographyTrusted !== 'boolean') push('orthographyTrusted missing');
  else if (ORTHO_UNTRUSTED.includes(loc) && bank.orthographyTrusted) push(`orthographyTrusted must be false in ${loc}`);
  let approved = null;
  try { approved = approvedByKey(loc); } catch (e) { approved = null; }
  const byId = new Map();
  const keyOwner = new Map();
  const wordOwner = new Map();
  const rimeSound = new Map();
  let classified = 0;
  const memberOk = (m, cls, role) => {
    const tag = (x) => `class ${cls.id} ${role} "${m && m.vocabKey}": ${x}`;
    if (!m || typeof m.vocabKey !== 'string' || typeof m.word !== 'string') { push(tag('vocabKey / word missing')); return false; }
    if (!WORD_RE.test(m.word)) push(tag(`word "${m.word}" is not letters`));
    if (!m.pic || !m.pic.theme || !m.pic.noun) { push(tag('no pic {theme, noun}')); return false; }
    const ref = `${m.pic.theme}/${m.pic.noun}`;
    if (BW_MARKER.test(String(m.pic.theme))) push(tag(`picture ${ref} is in a B&W dir (localized marker)`));            // rule 2
    if (excluded(m.vocabKey, loc)) push(tag(`B2_EXCLUDE'd in ${loc}`));
    let entry = null;
    try { entry = entriesFor(m.pic.theme, loc).find((e) => e.vocabKey === m.vocabKey) || null; } catch (e) { push(tag(`theme does not resolve: ${e.message}`)); }
    if (!entry) push(tag(`vocabKey is not an entry of ${m.pic.theme} in ${loc} (not pictured / excluded / uncached)`));   // rule 1
    else if (lower(displayWord(entry.singular, loc)) !== lower(m.word)) push(tag(`word "${m.word}" ≠ displayWord "${displayWord(entry.singular, loc)}"`));
    if (!candidates(m.vocabKey, loc).some((c) => c.theme === m.pic.theme && c.noun === m.pic.noun)) push(tag(`picture ${ref} is not a colour-index candidate`));
    if (m.picOpened !== true) push(tag('picOpened is not true'));
    if (!(ref in OPENED_LOC)) push(tag(`picture ${ref} was never OPENED (the human open is the gate — a locale block records its own opens under "opened")`));
    else if (OPENED_LOC[ref] !== m.vocabKey) push(tag(`picture ${ref} was opened and is NOT an honest "${m.vocabKey}" (opened as: ${OPENED_LOC[ref] || 'refused'})`));
    return true;
  };
  for (const c of classes) {
    const tag = (x) => `class ${c.id}: ${x}`;
    if (!c.id || byId.has(c.id)) push(tag('missing or duplicate id')); byId.set(c.id, c);
    if (typeof c.rime !== 'string' || !c.rime.startsWith('-') || c.rime.length < 2) push(tag(`rime "${c.rime}" must be "-<letters>"`));
    if (typeof c.sound !== 'string' || !c.sound) push(tag('sound (IPA) missing'));
    const rs = `${c.rime}|${c.sound}`;
    if (rimeSound.has(rs)) push(tag(`shares rime + sound with class ${rimeSound.get(rs)}`)); rimeSound.set(rs, c.id);          // rule 3
    if (!(c.cap >= 3)) push(tag(`cap ${c.cap} < 3`));                                                                          // rule 4
    const members = Array.isArray(c.members) ? c.members : [];
    if (members.length < 2) push(tag(`${members.length} members < 2`));                                                     // rule 4
    if (members.length > c.cap) push(tag(`${members.length} members > cap ${c.cap}`));
    const wordsInClass = new Set();
    for (const m of members) {
      if (!memberOk(m, c, 'member')) continue;
      classified++;
      const lw = lower(m.word);
      if (keyOwner.has(m.vocabKey) && keyOwner.get(m.vocabKey) !== c.id) push(tag(`"${m.vocabKey}" is also a member of ${keyOwner.get(m.vocabKey)}`));   // rule 3
      keyOwner.set(m.vocabKey, c.id);
      if (wordsInClass.has(lw)) push(tag(`the word "${m.word}" twice in one class under two vocabKeys (the dedup trap)`));      // rule 3 / P11
      wordsInClass.add(lw);
      if (wordOwner.has(lw) && wordOwner.get(lw) !== c.id) push(tag(`the word "${m.word}" is also a member word of ${wordOwner.get(lw)}`));
      wordOwner.set(lw, c.id);
      // rule 5 — sameSpelling
      const ends = typeof c.rime === 'string' && lower(m.word).endsWith(lower(c.rime.slice(1)));
      if (typeof m.sameSpelling !== 'boolean') { if (bank.orthographyTrusted === false) push(tag(`"${m.word}" carries no explicit sameSpelling (orthographyTrusted:false)`)); }
      else if (m.sameSpelling && !ends) push(tag(`"${m.word}" is sameSpelling:true but does not end in "${c.rime.slice(1)}"`));
      else if (!m.sameSpelling && ends) push(tag(`"${m.word}" ends in "${c.rime.slice(1)}" but is sameSpelling:false`));
      if (typeof m.productive !== 'boolean') push(tag(`"${m.word}" productive missing`));
      // rule 6 — fi split boundary / other-locale spelling cross-check
      if (loc === 'fi') {
        const a = approved && approved.get(m.vocabKey);
        if (!a) push(tag(`fi member "${m.vocabKey}" is absent from approved-words-fi.json`));
        else {
          const split = Array.isArray(a.split) ? a.split : [];
          const tails = [split.slice(-1).join(''), split.slice(-2).join('')].map(lower);
          const rime = lower(String(c.rime).slice(1));
          if (!tails.includes(rime)) push(tag(`fi rime "${c.rime}" is not the last 1-2 syllables of "${m.word}" (${split.join('-')})`));
        }
      } else if (approved) {
        const a = approved.get(m.vocabKey);
        if (a && lower(a.word) !== lw) notes.push(`[${loc}] class ${c.id}: "${m.word}" is spelled "${a.word}" in approved-words-${loc}.json (WARN)`);
      }
    }
    if (!Array.isArray(c.extra)) push(tag('extra must be an array'));
    else for (const x of c.extra) { if (typeof x !== 'string' || !WORD_RE.test(x)) push(tag(`extra "${x}" is not a word`)); if (members.some((m) => lower(m.word) === lower(x))) push(tag(`extra "${x}" is also a member`)); }
    if (!Array.isArray(c.nearMiss)) push(tag('nearMiss must be an array'));
  }
  // rule 7 — near-miss foils (after keyOwner is complete)
  for (const c of classes) {
    const tag = (x) => `class ${c.id}: ${x}`;
    const memberKeys = new Set((c.members || []).map((m) => m.vocabKey));
    const seen = new Set();
    for (const x of c.nearMiss || []) {
      if (!memberOk(x, c, 'nearMiss')) continue;
      if (memberKeys.has(x.vocabKey)) push(tag(`nearMiss "${x.vocabKey}" is a member of the class itself`));
      if (seen.has(x.vocabKey)) push(tag(`nearMiss "${x.vocabKey}" listed twice`)); seen.add(x.vocabKey);
      if ((c.members || []).some((m) => lower(m.word) === lower(x.word))) push(tag(`nearMiss "${x.word}" equals a member word`));
      const o = keyOwner.get(x.vocabKey);
      if (o && byId.get(o) && byId.get(o).sound === c.sound) push(tag(`nearMiss "${x.vocabKey}" is a member of ${o}, which shares the sound ${c.sound}`));
    }
  }
  // rule 4 — floors (base FAIL; faces reported)
  const size = (n) => classes.filter((c) => (c.members || []).length >= n).length;
  if (size(2) < 8) push(`${size(2)} classes with >= 2 members < 8 (the base floor)`);
  if (classified < 24) push(`${classified} classified words < 24 (the base floor)`);
  if (size(3) < 3) notes.push(`F2 refused in ${loc}: ${size(3)} classes >= 3 members < 3`);
  const others = classes.filter((c) => (c.members || []).length < 3).reduce((s, c) => s + (c.members || []).length, 0);
  if (size(3) < 4 || others < 4) notes.push(`F4 refused in ${loc}: ${size(3)} classes >= 3 (need 4), ${others} other pictured words (need 4)`);
  const productive = classes.filter((c) => (c.members || []).length >= 2 && (c.members || []).some((m) => m.productive)).length;
  if (productive < 6) notes.push(`F5 refused in ${loc}: ${productive} productive anchors < 6`);
  // rule 8 — en: the K-232 pairs land in one class each
  if (loc === 'en') {
    for (const p of RHYMING_PAIRS) {
      const l = keyOwner.get(p.left.noun), r = keyOwner.get(p.right.noun);
      if (!l || !r) push(`rhyming-pairs.json ${p.left.noun}/${p.right.noun}: ${!l ? p.left.noun : p.right.noun} is in no class`);
      else if (l !== r) push(`rhyming-pairs.json ${p.left.noun}/${p.right.noun} is SPLIT across ${l} and ${r}`);
    }
  }
  // rule 9 — couplets
  const couplets = Array.isArray(bank.couplets) ? bank.couplets : [];
  const answers = new Set();
  for (const cp of couplets) {
    const tag = (x) => `couplet ${cp.id}: ${x}`;
    const lines = Array.isArray(cp.lines) ? cp.lines : [];
    if (lines.length !== 2 || lines.some((l) => typeof l !== 'string')) { push(tag('lines must be two strings')); continue; }
    const key = cp.answer && cp.answer.vocabKey;
    const cls = key && byId.get(keyOwner.get(key));
    const member = cls && cls.members.find((m) => m.vocabKey === key);
    if (!member) { push(tag(`answer "${key}" is not a class member`)); continue; }
    if ((lines[1].match(/___/g) || []).length !== 1) push(tag('line 2 must carry exactly one ___'));
    if (lines[0].includes('___')) push(tag('line 1 carries a blank'));
    for (const l of lines) if (wordRe(member.word).test(lower(l))) push(tag(`the answer "${member.word}" is printed in "${l}"`));
    const pool = new Set([...cls.members.map((m) => lower(m.word)), ...(cls.extra || []).map(lower)]);
    if (!pool.has(lower(cp.rhymeWith || ''))) push(tag(`rhymeWith "${cp.rhymeWith}" is not a member or extra of class ${cls.id}`));
    if (!wordRe(cp.rhymeWith || '').test(lower(lines[0]))) push(tag(`line 1 does not carry rhymeWith "${cp.rhymeWith}"`));
    if (glyphs(lines[0]) > 45) push(tag(`line 1 is ${glyphs(lines[0])} chars > 45`));
    if (glyphs(lines[1].split('___')[0]) > 40) push(tag(`line 2 is ${glyphs(lines[1].split('___')[0])} chars before the blank > 40`));
    if (typeof cp.cueFree !== 'boolean') push(tag('cueFree missing'));
    if (answers.has(key)) push(tag(`answer "${key}" repeats`)); answers.add(key);
  }
  if (couplets.length < 8) notes.push(`F3 refused in ${loc}: ${couplets.length} couplets < 8`);
  // rule 10 — strings
  const s = bank.strings && bank.strings['G1-309'];
  if (!s) push('strings G1-309 missing');
  else {
    if (!s.title || glyphs(s.title) > 70) push('title > 70 chars');
    if (WORKSHEET_WORD.test(s.title || '')) push('title carries the worksheet word');
    if (loc === 'da' && !/rimord/i.test(s.title || '')) push(`da title "${s.title}" does not contain "rimord" (bare "rim" = the Rimowa SERP)`);
    if (!s.instruction || glyphs(s.instruction) > 150) push('instruction > 150 chars');
    if (loc === 'en' && (s.title !== TYPE.i18n.en.title || s.instruction !== TYPE.i18n.en.instruction)) push('en strings ≠ the spec i18n.en');
  }
  // rule 10b — the face strings (Phase 2): every face id authored; the same guards; en === the rows module (one source)
  for (const f of FACES) {
    const fs = bank.strings && bank.strings[f.id];
    if (!fs) { push(`strings ${f.id} (${f.mode}) missing`); continue; }
    if (!fs.title || glyphs(fs.title) > 70) push(`${f.id} title > 70 chars`);
    if (WORKSHEET_WORD.test(fs.title || '')) push(`${f.id} title carries the worksheet word`);
    if (loc === 'da' && !/rimord/i.test(fs.title || '')) push(`da ${f.id} title "${fs.title}" does not contain "rimord"`);
    if (!fs.instruction || glyphs(fs.instruction) > 150) push(`${f.id} instruction > 150 chars`);
    if (loc === 'en' && (fs.title !== f.title || fs.instruction !== f.instruction)) push(`en ${f.id} strings ≠ the rows module (two sources)`);
    if (loc === 'en' && (f.spec.i18n.en.title !== f.title || f.spec.i18n.en.instruction !== f.instruction)) push(`${f.id} emitted spec strings ≠ the rows module (re-run gen-b3var-specs)`);
  }
  // rule 11 — exemplar
  const ex = Array.isArray(bank.exemplar) ? bank.exemplar : [];
  if (ex.length !== 6) push(`exemplar has ${ex.length} classes, want 6 (the d2 rows)`);
  if (new Set(ex).size !== ex.length) push('exemplar repeats a class');
  for (const id of ex) {
    const c = byId.get(id);
    if (!c) { push(`exemplar "${id}" is not a class`); continue; }
    const writable = (c.members || []).filter((m) => (bank.orthographyTrusted || m.sameSpelling === true) && glyphs(m.word) <= 10);
    if (writable.length < 2) push(`exemplar "${id}" has ${writable.length} writable (sameSpelling) members < 2 — cannot anchor a write row`);
  }
  return { fails: f, notes, counts: { classes: classes.length, ge3: size(3), ge4: size(4), classified, couplets: couplets.length, nearMiss: classes.reduce((n, c) => n + (c.nearMiss || []).length, 0), withNearMiss: classes.filter((c) => (c.nearMiss || []).length).length } };
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, baseName, strings, locale, unit }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: locale || 'en', unit: unit || null, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-rhyming]');
    const rows = [...document.querySelectorAll('[data-lcs-rhyming] .ws-card')].map((c) => {
      const st = c.querySelector('[data-lcs-anchor]');
      const lane = c.querySelector('[data-lcs-prim="writing-row"]');
      const rings = [...c.querySelectorAll('[data-lcs-choice]')].map((r) => ({ key: r.dataset.lcsChoice, cls: r.dataset.lcsClass, word: r.dataset.lcsWord, rhyme: r.dataset.lcsRhyme, foil: r.dataset.lcsFoil === '1', src: decodeURIComponent(r.querySelector('img').src), ...rect(r) }));
      const parts = [...st.querySelectorAll('[data-lcs-slot]')].map(rect);
      const aimg = st.querySelector('[data-lcs-anchor-tile] img');
      return {
        anchor: st.dataset.lcsAnchor, cls: st.dataset.lcsClass, anchorWord: st.dataset.lcsAnchorWord, anchorSrc: decodeURIComponent(aimg.src),
        rings, contentRight: Math.max(...parts.map((p) => p.right)), contentLeft: Math.min(...parts.map((p) => p.left)),
        contentTop: Math.min(...parts.map((p) => p.top)), contentBottom: Math.max(...parts.map((p) => p.bottom)),
        lane: lane ? rect(lane) : null, laneH: lane ? +lane.getAttribute('height') : 0, starter: (lane && lane.querySelector('[data-lcs-starter]')) ? lane.querySelector('[data-lcs-starter]').textContent : null,
        ...rect(c),
      };
    });
    const icons = [...document.querySelectorAll('.ws-icon')].map((el) => { const r = rect(el); return Math.min(r.w, r.h); });
    return { rows, icons, stamp: root ? { rows: +root.dataset.lcsRows, choices: +root.dataset.lcsChoices, band: root.dataset.lcsBand, unit: root.dataset.lcsUnit || null, minIcon: +root.dataset.lcsMinIcon, mode: root.dataset.lcsMode || null } : null,
      body: rect(document.querySelector('[data-lcs-body]')), foot: document.querySelector('.ws-foot').getBoundingClientRect().top, titleH: rect(document.querySelector('.ws-head')).h };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

/** The design's node-side cross-check: every stamped (vocabKey, class, word, picture) is a bank member VERBATIM; foils in nearMiss; the pair writable; no near-miss as a plain distractor; the unit on the page. */
function crossCheck(name, m, bank, { nearMiss, unit }) {
  const out = [];
  const byId = new Map((bank.classes || []).map((c) => [c.id, c]));
  const members = new Map();
  for (const c of bank.classes || []) for (const x of c.members || []) members.set(x.vocabKey, { m: x, cls: c.id });
  const srcOf = (p) => { try { return decodeURIComponent(fileUri(p.theme, p.noun)); } catch (e) { return null; } };
  for (const r of m.rows) {
    const c = byId.get(r.cls);
    if (!c) { out.push(`${name}: row ${r.anchor}: class "${r.cls}" is not a bank class`); continue; }
    const a = members.get(r.anchor);
    if (!a || a.cls !== r.cls) out.push(`${name}: anchor "${r.anchor}" is not a member of ${r.cls}`);
    else {
      if (a.m.word !== r.anchorWord) out.push(`${name}: anchor "${r.anchor}" stamped word "${r.anchorWord}" ≠ bank "${a.m.word}"`);
      if (srcOf(a.m.pic) !== r.anchorSrc) out.push(`${name}: anchor "${r.anchor}" renders ${r.anchorSrc.split('/').slice(-2).join('/')} ≠ the bank picture ${a.m.pic.theme}/${a.m.pic.noun}`);
      if (!bank.orthographyTrusted && a.m.sameSpelling !== true) out.push(`${name}: anchor "${r.anchor}" is sameSpelling:false on a WRITE face`);
    }
    const nm = new Map((c.nearMiss || []).map((x) => [x.vocabKey, x]));
    for (const ring of r.rings) {
      if (ring.foil) {
        const x = nm.get(ring.key);
        if (!x) { out.push(`${name}: foil "${ring.key}" is not in the nearMiss of ${r.cls}`); continue; }
        if (x.word !== ring.word) out.push(`${name}: foil "${ring.key}" word "${ring.word}" ≠ bank "${x.word}"`);
        if (srcOf(x.pic) !== ring.src) out.push(`${name}: foil "${ring.key}" renders the wrong picture`);
        const owner = members.get(ring.key);
        if ((owner ? owner.cls : '') !== ring.cls) out.push(`${name}: foil "${ring.key}" stamped class "${ring.cls}" ≠ its bank class "${owner ? owner.cls : ''}"`);
        continue;
      }
      const mm = members.get(ring.key);
      if (!mm) { out.push(`${name}: ring "${ring.key}" is not a bank member`); continue; }
      if (mm.cls !== ring.cls) out.push(`${name}: ring "${ring.key}" stamped class "${ring.cls}" ≠ bank "${mm.cls}" — not verbatim`);
      if (mm.m.word !== ring.word) out.push(`${name}: ring "${ring.key}" stamped word "${ring.word}" ≠ bank "${mm.m.word}"`);
      if (srcOf(mm.m.pic) !== ring.src) out.push(`${name}: ring "${ring.key}" renders ${ring.src.split('/').slice(-2).join('/')} ≠ the bank picture ${mm.m.pic.theme}/${mm.m.pic.noun}`);
      if (ring.rhyme === '1' && !bank.orthographyTrusted && mm.m.sameSpelling !== true) out.push(`${name}: the rhyming word "${ring.key}" is sameSpelling:false on a WRITE face`);
      if (ring.rhyme === '0' && nm.has(ring.key)) out.push(`${name}: plain distractor "${ring.key}" is a near-miss of ${r.cls} (nearMiss ${nearMiss ? 'on — it must be stamped as the foil' : 'off'})`);
    }
  }
  if (unit && !m.rows.some((r) => r.cls === unit)) out.push(`${name}: unit "${unit}" anchors no row`);
  return out;
}

function assertRender(name, r, cfg, bank, opts = {}) {
  const band = opts.band || 'G1';
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(!!r.m.stamp && r.m.rows.length === cfg.rows && r.m.stamp.rows === cfg.rows, `${name}: ${r.m.rows.length} rows / stamp ${r.m.stamp && r.m.stamp.rows} ≠ config ${cfg.rows}`);
  ok(!!r.m.stamp && r.m.stamp.band === band && r.m.stamp.minIcon === FLOOR[band], `${name}: band stamp ${r.m.stamp && r.m.stamp.band}/${r.m.stamp && r.m.stamp.minIcon} ≠ ${band}/${FLOOR[band]}`);
  ok(!!r.m.stamp && r.m.stamp.mode === null, `${name}: the BASE page carries data-lcs-mode="${r.m.stamp && r.m.stamp.mode}" (a face knob leaked onto the base)`);
  const minIcon = r.m.icons.length ? Math.min(...r.m.icons) : 0;
  ok(minIcon >= FLOOR[band] - 0.6, `${name}: picture ${minIcon} px < the ${band} floor ${FLOOR[band]}`);
  ok(cfg.glyphH >= GLYPH_FLOOR[band], `${name}: config glyphH ${cfg.glyphH} < ${GLYPH_FLOOR[band]}`);
  for (const row of r.m.rows) {
    const tag = `${name}: row ${row.cls}/${row.anchor}`;
    ok(row.rings.length === cfg.choices, `${tag}: ${row.rings.length} rings ≠ ${cfg.choices}`);
    ok(!!row.lane && row.laneH === cfg.laneH && row.lane.w <= cfg.laneW + 0.6, `${tag}: lane ${row.laneH}×${row.lane && Math.round(row.lane.w)} (config ${cfg.laneH}×${cfg.laneW})`);
    ok(row.contentLeft >= row.left + 14 - 0.6 && row.contentRight <= row.right - 14 + 0.6, `${tag}: content ${Math.round(row.contentLeft)}..${Math.round(row.contentRight)} outside the card box ${Math.round(row.left + 14)}..${Math.round(row.right - 14)}`);
    ok(row.contentTop >= row.top + 14 - 0.6 && row.contentBottom <= row.bottom - 14 + 0.6, `${tag}: content ${Math.round(row.contentTop)}..${Math.round(row.contentBottom)} outside the card box vertically ${Math.round(row.top + 14)}..${Math.round(row.bottom - 14)}`);
    ok(row.bottom <= r.m.foot + 0.6, `${tag}: card reaches into the footer band (${Math.round(row.bottom)} vs ${Math.round(r.m.foot)})`);
    ok(row.left >= r.m.body.left - 0.6 && row.right <= r.m.body.right + 0.6, `${tag}: card outside the body column`);
    ok(cfg.starter ? row.starter !== null : row.starter === null, `${tag}: starter "${row.starter}" (config starter ${cfg.starter})`);
  }
  const xc = crossCheck(name, r.m, bank, { nearMiss: cfg.nearMiss, unit: opts.unit || null });
  ok(xc.length === 0, xc.join('\n    '));
  return { minIcon, slack: r.m.rows.length ? Math.round(Math.min(...r.m.rows.map((row) => row.lane.left - Math.max(...row.rings.map((x) => x.right))))) : null };
}

/* ------------------------------------------------------------------ faces */
/** Render a face spec through the real pipeline and measure it generically (every face's stamps + geometry). */
async function renderFace(page, spec, { baseName, strings, locale, unit }) {
  const out = await renderInstance({ type: spec, theme: null, difficulty: 2, locale: locale || 'en', unit: unit || null, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const src = (img) => (img ? decodeURIComponent(img.src) : null);
    const root = document.querySelector('[data-lcs-rhyming]');
    const ds = root ? Object.assign({}, root.dataset) : {};
    const icons = [...document.querySelectorAll('.ws-icon')].map((el) => { const r = rect(el); return Math.min(r.w, r.h); });
    const lanes = [...document.querySelectorAll('[data-lcs-prim="writing-row"]')].map((l) => Object.assign({ hAttr: +l.getAttribute('height'), texts: l.querySelectorAll('text').length }, rect(l)));
    const chips = [...document.querySelectorAll('[data-lcs-chip]')].map((c) => { const r = rect(c); return Math.min(r.w, r.h); });
    const content = [...document.querySelectorAll('[data-lcs-rhyming] [data-lcs-slot], [data-lcs-rhyming] [data-lcs-chip], [data-lcs-rhyming] .ws-icon, [data-lcs-rhyming] [data-lcs-prim="writing-row"], [data-lcs-rhyming] [data-lcs-bank-word], [data-lcs-rhyming] [data-lcs-bank-index]')].map(rect);
    const lowest = content.length ? Math.max(...content.map((r) => r.bottom)) : 0;
    const mode = ds.lcsMode || null;
    const face = {};
    if (mode === 'judge') face.cards = [...root.querySelectorAll('[data-lcs-pair]')].map((st) => { const im = st.querySelectorAll('[data-lcs-slot="pair"] img'); return { a: st.dataset.lcsA, b: st.dataset.lcsB, ca: st.dataset.lcsClassA, cb: st.dataset.lcsClassB, wa: st.dataset.lcsWordA, wb: st.dataset.lcsWordB, rhyme: st.dataset.lcsRhyme, srcA: src(im[0]), srcB: src(im[1]) }; });
    if (mode === 'sort') { face.bins = [...root.querySelectorAll('[data-lcs-bin]')].map((b) => ({ cls: b.dataset.lcsClass, anchor: b.dataset.lcsAnchor, word: b.dataset.lcsAnchorWord, src: src(b.querySelector('[data-lcs-slot="head"] img')) })); face.bank = [...root.querySelectorAll('[data-lcs-bank-index]')].map((it) => ({ key: it.dataset.lcsVocab, cls: it.dataset.lcsClass, word: it.dataset.lcsWord, src: src(it.querySelector('img')) })); }
    if (mode === 'couplet') face.rows = [...root.querySelectorAll('[data-lcs-couplet]')].map((r) => ({ answer: r.dataset.lcsAnswer, word: r.dataset.lcsAnswerWord, cls: r.dataset.lcsClass, rw: r.dataset.lcsRhymeWith, src: src(r.querySelector('[data-lcs-slot="cue"] img')), line1: r.querySelector('[data-lcs-verse="1"]').textContent.trim(), line2: r.querySelector('[data-lcs-verse="2"]').textContent.trim() }));
    if (mode === 'string') { face.rows = [...root.querySelectorAll('[data-lcs-string]')].map((r) => ({ anchor: r.dataset.lcsAnchor, cls: r.dataset.lcsClass, word: r.dataset.lcsAnchorWord, answers: r.dataset.lcsAnswers.split('|'), src: src(r.querySelector('[data-lcs-slot="anchor"] img')) })); face.bank = [...root.querySelectorAll('[data-lcs-bank-word]')].map((p) => ({ word: p.dataset.lcsBankWord, key: p.dataset.lcsBank, cls: p.dataset.lcsClass, role: p.dataset.lcsRole, top: Math.round(rect(p).top) })); }
    if (mode === 'open') face.cards = [...root.querySelectorAll('[data-lcs-open]')].map((st) => ({ anchor: st.dataset.lcsAnchor, cls: st.dataset.lcsClass, word: st.dataset.lcsWord, src: src(st.querySelector('[data-lcs-slot="head"] img')), printed: (st.querySelector('[data-lcs-word-print]') || { textContent: '' }).textContent.trim() }));
    return { stamp: { mode, band: ds.lcsBand, minIcon: +ds.lcsMinIcon, unit: ds.lcsUnit || null, glyphH: ds.lcsGlyphH ? +ds.lcsGlyphH : null, yes: ds.lcsYes ? +ds.lcsYes : null, chip: ds.lcsChipPx ? +ds.lcsChipPx : null, bins: ds.lcsBins ? +ds.lcsBins : null, rows: ds.lcsRows ? +ds.lcsRows : null, anchors: ds.lcsAnchors ? +ds.lcsAnchors : null, cards: ds.lcsCards ? +ds.lcsCards : null, foils: ds.lcsFoils ? +ds.lcsFoils : null },
      icons, lanes, chips, lowest, face, body: rect(document.querySelector('[data-lcs-body]')), foot: document.querySelector('.ws-foot').getBoundingClientRect().top, titleH: rect(document.querySelector('.ws-head')).h };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

/** The node-side cross-check of a face render against the bank (verify() is bank-blind by design). */
function crossCheckFace(name, mode, m, bank, cfg) {
  const out = [];
  const byId = new Map((bank.classes || []).map((c) => [c.id, c]));
  const members = new Map();
  for (const c of bank.classes || []) for (const x of c.members || []) members.set(x.vocabKey, { m: x, cls: c.id });
  const srcOf = (pc) => { try { return decodeURIComponent(fileUri(pc.theme, pc.noun)); } catch (e) { return null; } };
  const nm = (cls) => new Set(((byId.get(cls) || {}).nearMiss || []).map((x) => x.vocabKey));
  const writable = (mm) => bank.orthographyTrusted || mm.m.sameSpelling === true;
  const verbatim = (tag, key, cls, word, src) => {
    const mm = members.get(key);
    if (!mm) { out.push(`${name}: ${tag} "${key}" is not a bank member`); return null; }
    if (mm.cls !== cls) out.push(`${name}: ${tag} "${key}" stamped class "${cls}" ≠ bank "${mm.cls}" — not verbatim`);
    if (word !== undefined && mm.m.word !== word) out.push(`${name}: ${tag} "${key}" stamped word "${word}" ≠ bank "${mm.m.word}"`);
    if (src !== undefined && srcOf(mm.m.pic) !== src) out.push(`${name}: ${tag} "${key}" renders ${String(src).split('/').slice(-2).join('/')} ≠ the bank picture ${mm.m.pic.theme}/${mm.m.pic.noun}`);
    return mm;
  };
  if (mode === 'judge') {
    const pairCls = new Set();
    for (const c of m.face.cards) {
      const A = verbatim('picture', c.a, c.ca, c.wa, c.srcA), B = verbatim('picture', c.b, c.cb, c.wb, c.srcB);
      if (!A || !B) continue;
      if (c.rhyme === '1') { if (pairCls.has(c.ca)) out.push(`${name}: rhyming class "${c.ca}" on two cards`); pairCls.add(c.ca); }
      else {
        if (byId.get(c.ca).sound === byId.get(c.cb).sound) out.push(`${name}: non-pair ${c.a}/${c.b} — classes ${c.ca}/${c.cb} share the sound "${byId.get(c.ca).sound}" (they rhyme)`);
        if (nm(c.ca).has(c.b) || nm(c.cb).has(c.a)) out.push(`${name}: non-pair ${c.a}/${c.b} is a near-miss pair (nearMiss off at d2)`);
      }
    }
    for (const c of m.face.cards) if (c.rhyme === '0' && (pairCls.has(c.ca) || pairCls.has(c.cb))) out.push(`${name}: non-pair ${c.a}/${c.b} draws from a rhyming class on the page`);
    if (cfg && m.stamp.yes !== cfg.yes) out.push(`${name}: ${m.stamp.yes} rhyming cards ≠ the config's ${cfg.yes}`);
  }
  if (mode === 'sort') {
    for (const b of m.face.bins) verbatim('head', b.anchor, b.cls, b.word, b.src);   // the head is a picture only — never written
    for (const it of m.face.bank) { const mm = verbatim('bank picture', it.key, it.cls, it.word, it.src); if (mm && !writable(mm)) out.push(`${name}: bank "${it.key}" is sameSpelling:false on a WRITE face (the child writes it)`); }
  }
  if (mode === 'couplet') {
    const ids = new Set((bank.couplets || []).map((c) => c.answer.vocabKey));
    for (const r of m.face.rows) {
      const mm = verbatim('answer', r.answer, r.cls, r.word, r.src);
      if (!ids.has(r.answer)) out.push(`${name}: "${r.answer}" answers no bank couplet`);
      const cp = (bank.couplets || []).find((c) => c.answer.vocabKey === r.answer);
      if (cp && cp.rhymeWith !== r.rw) out.push(`${name}: couplet ${cp.id} rhymeWith "${r.rw}" ≠ bank "${cp.rhymeWith}"`);
      if (mm) { const pool = new Set([...byId.get(mm.cls).members.map((x) => x.word.toLowerCase()), ...(byId.get(mm.cls).extra || []).map((x) => x.toLowerCase())]); if (!pool.has(String(r.rw).toLowerCase())) out.push(`${name}: partner "${r.rw}" is not a member / extra of ${mm.cls}`); }
      if (mm && !writable(mm)) out.push(`${name}: answer "${r.answer}" is sameSpelling:false on a WRITE face`);
    }
  }
  if (mode === 'string') {
    const pageCls = new Set(m.face.rows.map((r) => r.cls));
    const pageSounds = new Set([...pageCls].map((c) => (byId.get(c) || {}).sound));
    const pageNm = new Set([...pageCls].flatMap((c) => [...nm(c)]));
    for (const r of m.face.rows) {
      verbatim('anchor', r.anchor, r.cls, r.word, r.src);
      for (const w of r.answers) { const mm = [...members.values()].find((x) => x.m.word === w && x.cls === r.cls); if (!mm) out.push(`${name}: answer "${w}" is not a member word of ${r.cls}`); else if (!writable(mm)) out.push(`${name}: answer "${w}" is sameSpelling:false on a WRITE face`); }
    }
    for (const p of m.face.bank) {
      const mm = verbatim('bank word', p.key, p.cls, p.word);
      if (!mm) continue;
      if (p.role === 'foil') {
        if (pageCls.has(mm.cls)) out.push(`${name}: foil "${p.word}" is from the page class ${mm.cls}`);
        if (pageSounds.has(byId.get(mm.cls).sound)) out.push(`${name}: foil "${p.word}" (class ${mm.cls}) shares an anchor's SOUND "${byId.get(mm.cls).sound}" — it rhymes`);
        if (pageNm.has(p.key)) out.push(`${name}: foil "${p.word}" is a near-miss of a page class (nearMiss off at d2)`);
      }
    }
    if (cfg && m.face.bank.length !== cfg.anchors * cfg.per + cfg.foils && m.stamp.band !== 'K') out.push(`${name}: bank ${m.face.bank.length} ≠ ${cfg.anchors} × ${cfg.per} + ${cfg.foils}`);
  }
  if (mode === 'open') {
    for (const c of m.face.cards) {
      const mm = verbatim('anchor', c.anchor, c.cls, c.word, c.src);
      if (!mm) continue;
      if (mm.m.productive !== true) out.push(`${name}: anchor "${c.anchor}" is productive:false`);
      if (!writable(mm)) out.push(`${name}: anchor "${c.anchor}" is sameSpelling:false on a WRITE face (the child spells by analogy with it)`);
      if ((byId.get(mm.cls).members || []).length < 2) out.push(`${name}: anchor "${c.anchor}" has no rhyme in the bank`);
    }
  }
  return out;
}

function assertFaceRender(name, f, r, opts = {}) {
  const band = opts.band || f.band;
  const cfg = Object.assign({}, f.cfg, opts.cfg || {});
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamp.mode === f.mode, `${name}: mode stamp "${r.m.stamp.mode}" ≠ ${f.mode}`);
  ok(r.m.stamp.band === band && r.m.stamp.minIcon === FLOOR[band], `${name}: band stamp ${r.m.stamp.band}/${r.m.stamp.minIcon} ≠ ${band}/${FLOOR[band]}`);
  const minIcon = r.m.icons.length ? Math.min(...r.m.icons) : 0;
  ok(minIcon >= FLOOR[band] - 0.6, `${name}: picture ${minIcon} px < the ${band} floor ${FLOOR[band]}`);
  if (f.mode !== 'judge') ok(r.m.stamp.glyphH >= GLYPH_FLOOR[band], `${name}: glyphH ${r.m.stamp.glyphH} < ${GLYPH_FLOOR[band]}`);
  if (f.mode === 'judge') { ok(r.m.chips.length === 2 * cfg.cards && Math.min(...r.m.chips) >= 56 - 0.6, `${name}: ${r.m.chips.length} chips, smallest ${Math.round(Math.min(...r.m.chips))} px (want ${2 * cfg.cards} ≥ 56)`); ok(r.m.lanes.length === 0, `${name}: ${r.m.lanes.length} writing rows on the judge face (no writing)`); }
  const wantLanes = { sort: cfg.bins * cfg.perBin, couplet: cfg.rows, string: (opts.band === 'K' ? 3 : cfg.anchors) * cfg.per, open: cfg.cards * cfg.lines, judge: 0 }[f.mode];
  ok(r.m.lanes.length === wantLanes, `${name}: ${r.m.lanes.length} writing rows ≠ ${wantLanes}`);
  ok(r.m.lanes.every((l) => l.texts === 0), `${name}: a writing row carries text`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: content reaches ${Math.round(r.m.lowest)} into the footer band at ${Math.round(r.m.foot)}`);
  if (opts.unit) ok(r.m.stamp.unit === opts.unit && r.meta.unit === opts.unit, `${name}: unit stamp ${r.m.stamp.unit} / meta ${r.meta.unit} ≠ ${opts.unit}`);
  else ok(r.m.stamp.unit === null, `${name}: a unit stamp "${r.m.stamp.unit}" on a no-unit render`);
  const xc = crossCheckFace(name, f.mode, r.m, opts.bank || null, cfg);
  ok(xc.length === 0, xc.join('\n    '));
  return { minIcon };
}

/** A face spec whose build renders an EXPLICIT plan (the poison seam — past _planFace's guards). */
function faceFrom(f, plan, cfgOver = {}, band) {
  const d = Object.assign({}, f.spec.difficulty[2], cfgOver, { band: band || f.band });
  return Object.assign({}, f.spec, { build() { return TYPE._renderFace(f.mode, plan, d, band || f.band); } });
}
/** A face spec built over an INJECTED bank (synthetic locale blocks) / an explicit band. */
function faceWith(f, bank, opts = {}) {
  return Object.assign({}, f.spec, { build(o, ctx) { return f.spec._buildWith(bank, { difficulty: 2, locale: 'en', unit: opts.unit || o.unit, band: opts.band }, ctx); } });
}
function planOf(f, bank, opts = {}) {
  const B = opts.band || f.band;
  const d = Object.assign({}, f.spec.difficulty[2], opts.cfg || {}, { band: B });
  return f.spec._planFace(f.mode, bank, d, { locale: 'en', unit: opts.unit || null }, makeRng(opts.seed || 'plan'));
}
function planRefusal(f, bank, opts = {}) { try { planOf(f, bank, opts); return []; } catch (e) { return [e.message]; } }
async function faceFindings(page, f, spec, baseName, bank, opts = {}) {
  const r = await renderFace(page, spec, Object.assign({ baseName }, opts.render || {}));
  const before = fails.length, saved = assertions;
  assertFaceRender(baseName, f, r, Object.assign({ bank }, opts));
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}
/** An HTML mutation of a built face (the verify()-side poisons that no plan can express). */
function mutated(f, plan, fn, cfgOver = {}) {
  return Object.assign({}, f.spec, { build() { const out = TYPE._renderFace(f.mode, plan, Object.assign({}, f.spec.difficulty[2], cfgOver, { band: f.band }), f.band); out.bodyHtml = fn(out.bodyHtml); return out; } });
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
function buildRefusal(bank, d, type, extra = {}) {
  try { (type || TYPE)._buildWith(bank, Object.assign({ difficulty: d, locale: 'en' }, extra), { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}
/** A page built from EXPLICIT rows (past the spec's guards) — the seam for the verify() / node poisons. */
function pageFrom(rows, d, opts = {}) {
  const cfg = Object.assign({}, TYPE.difficulty[d], opts.cfg || {});
  const src = (p) => fileUri(p.theme, p.noun);
  return Object.assign({}, TYPE, { build() {
    const cards = rows.map((r) => rhymeRow({
      anchor: { src: src(r.anchor.pic), vocabKey: r.anchor.vocabKey, cls: r.cls, word: r.anchor.word },
      choices: r.choices.map((c) => ({ src: src(c.pic), vocabKey: c.vocabKey, cls: c.cls, word: c.word, rhyme: !!c.rhyme, foil: !!c.foil })),
      lane: { w: opts.laneW || cfg.laneW, h: cfg.laneH, glyphH: cfg.glyphH, starter: r.starter || null },
      anchorTile: cfg.anchorTile, anchorPx: cfg.anchorPx, choiceTile: cfg.choiceTile, choicePx: opts.choicePx || cfg.choicePx, badgeGap: 20,
    }));
    const posMax = Math.ceil(rows.length / cfg.choices) + 1;
    const body = `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-rhyming data-lcs-rows="${rows.length}" data-lcs-choices="${cfg.choices}" data-lcs-min-icon="44" ` +
      `data-lcs-lane-w="${opts.laneW || cfg.laneW}" data-lcs-lane-h="${cfg.laneH}" data-lcs-glyph-h="${cfg.glyphH}" data-lcs-starter="${cfg.starter ? 1 : 0}" data-lcs-near-miss="${cfg.nearMiss ? 1 : 0}" data-lcs-pos-max="${posMax}" data-lcs-band="G1"${opts.unit ? ` data-lcs-unit="${opts.unit}"` : ''}>` +
      (opts.extraHtml || '') + cardGrid({ cards, cols: 1, rows: rows.length, numbered: true }) + '</div>';
    return { bodyHtml: body, meta: {} };
  } });
}
/** Rows for the poison pages, drawn from the real EN bank: class ids → {anchor, partner, distractor keys}. */
function rowsFrom(en, spec) {
  const byId = new Map(en.classes.map((c) => [c.id, c]));
  const member = (key) => { for (const c of en.classes) { const m = c.members.find((x) => x.vocabKey === key); if (m) return { m, cls: c.id }; for (const x of c.nearMiss) if (x.vocabKey === key) return { m: x, cls: '' }; } throw new Error('poison: unknown key ' + key); };
  return spec.map((s) => {
    const c = byId.get(s.cls);
    const anchor = c.members.find((m) => m.vocabKey === s.anchor);
    const partner = c.members.find((m) => m.vocabKey === s.partner);
    const choices = s.choices.map((k) => {
      if (k === s.partner) return { vocabKey: partner.vocabKey, cls: s.cls, word: partner.word, pic: partner.pic, rhyme: true };
      const x = member(k);
      return { vocabKey: x.m.vocabKey, cls: s.clsOf && s.clsOf[k] !== undefined ? s.clsOf[k] : x.cls, word: x.m.word, pic: x.m.pic, rhyme: false, foil: (s.foils || []).includes(k) };
    });
    return { cls: s.cls, anchor, choices, starter: s.starter || null };
  });
}
async function gateFindings(page, type, d, baseName, bank, opts = {}) {
  const r = await renderWith(page, type, Object.assign({ difficulty: d, baseName }, opts.render || {}));
  const before = fails.length, saved = assertions;
  assertRender(baseName, r, Object.assign({}, TYPE.difficulty[d], opts.cfg || {}), bank, opts);
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}

/** Long-chrome fixtures: a 70-char title + a 150-char instruction, both legal (de 3-line title; fi long words). */
const LONG = {
  de: { title: 'Reimwörter: Sprich das Bild, kreise das Reimwort ein und schreib es ab', instruction: 'Sprich das erste Bild laut aus. Kreise das Bild ein, das sich darauf reimt, und schreibe dann sein Wort sauber und ordentlich auf die Linie rechts ab.' },
  fi: { title: 'Riimisanat: sano kuva ääneen, ympyröi riimipari ja kirjoita se riville', instruction: 'Sano ensimmäinen kuva ääneen. Ympyröi se kuva, joka rimmaa sen kanssa, ja kirjoita sitten sen sana huolellisesti ja siististi viereiselle riville nyt.' },
};
const THREE_LINE = { title: 'Rhyming Words: Say the Picture, Circle the Rhyme and Write Its Word Now', instruction: 'Say the first picture out loud. Circle the one picture that rhymes with it, then write that picture\'s word neatly on the writing line beside it, please.' };

async function main() {
  const banks = bankModule('rhyming-words');
  const locales = Object.keys(banks);
  for (const loc of locales) {
    const v = validateBank(banks[loc], loc);
    ok(v.fails.length === 0, `bank ${loc}: ${v.fails.length} findings\n    ` + v.fails.slice(0, 15).join('\n    '));
    console.log(`bank ${loc}: ${v.counts.classes} classes (>=3: ${v.counts.ge3}, >=4: ${v.counts.ge4}), ${v.counts.classified} classified words, ${v.counts.nearMiss} near-miss foils over ${v.counts.withNearMiss} classes, ${v.counts.couplets} couplets${v.notes.length ? '\n  notes: ' + v.notes.join(' · ') : ''}`);
  }
  const en = banks.en;
  for (const k of Object.keys(LONG)) ok(glyphs(LONG[k].title) === 70 && glyphs(LONG[k].instruction) === 150, `long-chrome fixture ${k} is ${glyphs(LONG[k].title)}/${glyphs(LONG[k].instruction)} chars, want 70/150`);
  ok(glyphs(THREE_LINE.title) <= 75 && glyphs(THREE_LINE.instruction) <= 155, `three-line fixture ${glyphs(THREE_LINE.title)}/${glyphs(THREE_LINE.instruction)}`);
  // the unit axis reads the bank
  const units = TYPE.unitAxis.units('en');
  ok(units.length >= 12 && units.includes('at') && TYPE.unitAxis.exemplar('en') === 'at', `unitAxis.units(en) = ${units.length} (${units.slice(0, 8).join(',')}…), exemplar ${TYPE.unitAxis.exemplar('en')}`);
  ok(TYPE.unitAxis.tokens('ock', 'en').UNIT === '-ock', 'unitAxis.tokens(ock) = ' + JSON.stringify(TYPE.unitAxis.tokens('ock', 'en')));

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  const TOTAL = 23 + 36;
  let killed = 0;
  try {
    // 2. renders through the real pipeline
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-309-gate-d${d}-en` });
      const s = assertRender(`d${d}`, r, TYPE.difficulty[d], en);
      pngs.push(r.png);
      const lowest = Math.round(Math.max(...r.m.rows.map((c) => c.bottom)));
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} rows ${r.m.rows.length} min picture ${s.minIcon} px, row slack ${s.slack} px, body ${Math.round(r.m.body.h)} px, lowest card ${lowest} vs foot ${Math.round(r.m.foot)}; classes ${r.meta.classes.join(' ')}; positions ${r.meta.positions.join('')}`);
    }
    for (const k of Object.keys(LONG)) for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-309-gate-d${d}-en-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d${d} long chrome ${k}`, r, TYPE.difficulty[d], en);
      pngs.push(r.png);
      const inner = Math.round(r.m.rows[0].h - 28);
      console.log(`render d${d} long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px (head ${Math.round(r.m.titleH)} px) card inner ${inner} px, lowest card ${Math.round(Math.max(...r.m.rows.map((c) => c.bottom)))} vs foot ${Math.round(r.m.foot)}`);
    }
    {
      // the README 722 floor: a three-line title AND a three-line instruction
      for (const d of [1, 2, 3]) {
        const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-309-gate-d${d}-en-threeline`, strings: THREE_LINE });
        assertRender(`d${d} three-line chrome`, r, TYPE.difficulty[d], en);
        ok(r.m.body.h <= 740, `d${d} three-line chrome: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to the 722 floor (head ${Math.round(r.m.titleH)} px)`);
        pngs.push(r.png);
        console.log(`render d${d} three-line chrome: body ${Math.round(r.m.body.h)} px card inner ${Math.round(r.m.rows[0].h - 28)} px, lowest card ${Math.round(Math.max(...r.m.rows.map((c) => c.bottom)))} vs foot ${Math.round(r.m.foot)}`);
      }
    }
    {
      // a 69-char fi-shaped title of long words (K-319 measured body 700 under a FOUR-line fi title; this one wraps to three — measured)
      const FOUR = { title: 'Riimisanaharjoitus: ympyröi riimisanapari, kirjoita riimisana riville', instruction: LONG.fi.instruction };
      for (const d of [1, 2, 3]) {
        const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-309-gate-d${d}-en-fititle`, strings: FOUR });
        assertRender(`d${d} fi title`, r, TYPE.difficulty[d], en);
        pngs.push(r.png);
        console.log(`render d${d} fi title: body ${Math.round(r.m.body.h)} px (head ${Math.round(r.m.titleH)} px) card inner ${Math.round(r.m.rows[0].h - 28)} px`);
      }
      for (const d of [1, 2, 3]) {
        const t = Object.assign({}, TYPE, { build(o, ctx) { return TYPE._buildWith(en, { difficulty: o.difficulty, locale: 'en', unit: o.unit, band: 'K' }, ctx); } });
        const r = await renderWith(page, t, { difficulty: d, baseName: `G1-309-gate-d${d}-en-Kshape-fititle`, strings: FOUR });
        const shape = { 1: { rows: 4, choices: 2, laneW: 271, laneH: 88, glyphH: 44, starter: true, nearMiss: false }, 2: { rows: 5, choices: 3, laneW: 233, laneH: 80, glyphH: 40, starter: false, nearMiss: false }, 3: { rows: 6, choices: 4, laneW: 227, laneH: 72, glyphH: 40, starter: false, nearMiss: true } }[d];
        assertRender(`d${d} K shape fi title`, r, shape, en, { band: 'K' });
        pngs.push(r.png);
        console.log(`render d${d} K shape fi title: body ${Math.round(r.m.body.h)} px card inner ${Math.round(r.m.rows[0].h - 28)} px`);
      }
    }
    {
      // a 67-char fi title of long compounds (K-319 measured body 700 under a four-line fi title; this one wraps to three — measured, not assumed)
      const STRESS = { title: 'Riimisanaharjoitukset: ympyröimistehtävä riimisanapareille kuvineen', instruction: LONG.fi.instruction };
      for (const d of [1, 2, 3]) {
        const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-309-gate-d${d}-en-filong`, strings: STRESS });
        assertRender(`d${d} fi long-word title`, r, TYPE.difficulty[d], en);
        const tK = Object.assign({}, TYPE, { build(o, ctx) { return TYPE._buildWith(en, { difficulty: o.difficulty, locale: 'en', unit: o.unit, band: 'K' }, ctx); } });
        const rK = await renderWith(page, tK, { difficulty: d, baseName: `G1-309-gate-d${d}-en-Kshape-filong`, strings: STRESS });
        const shape = { 1: { rows: 4, choices: 2, laneW: 271, laneH: 88, glyphH: 44, starter: true, nearMiss: false }, 2: { rows: 5, choices: 3, laneW: 233, laneH: 80, glyphH: 40, starter: false, nearMiss: false }, 3: { rows: 6, choices: 4, laneW: 227, laneH: 72, glyphH: 40, starter: false, nearMiss: true } }[d];
        assertRender(`d${d} K shape fi long-word title`, rK, shape, en, { band: 'K' });
        console.log(`render d${d} fi long-word title: body ${Math.round(r.m.body.h)} px (head ${Math.round(r.m.titleH)} px) card inner ${Math.round(r.m.rows[0].h - 28)} px; K shape card inner ${Math.round(rK.m.rows[0].h - 28)} px`);
      }
    }
    // the K shape (sv/da/no level key) on the en bank: floors 56 / glyphH 40
    for (const d of [1, 2, 3]) {
      const t = Object.assign({}, TYPE, { build(o, ctx) { return TYPE._buildWith(en, { difficulty: o.difficulty, locale: 'en', unit: o.unit, band: 'K' }, ctx); } });
      const r = await renderWith(page, t, { difficulty: d, baseName: `G1-309-gate-d${d}-en-Kshape` });
      const cfgK = TYPE._buildWith(en, { difficulty: d, locale: 'en', band: 'K' }, { rng: makeRng('cfg') }).meta;
      const shape = { 1: { rows: 4, choices: 2, laneW: 271, laneH: 88, glyphH: 44, starter: true, nearMiss: false }, 2: { rows: 5, choices: 3, laneW: 233, laneH: 80, glyphH: 40, starter: false, nearMiss: false }, 3: { rows: 6, choices: 4, laneW: 227, laneH: 72, glyphH: 40, starter: false, nearMiss: true } }[d];
      const s = assertRender(`d${d} K shape`, r, shape, en, { band: 'K' });
      pngs.push(r.png);
      console.log(`render d${d} K shape: verify ${r.verify.length} lints ${r.lints.length} rows ${r.m.rows.length} min picture ${s.minIcon} px (K floor 56), slack ${s.slack} px, band ${cfgK.band}`);
    }
    // unit renders: the unit class anchors a row; the rest re-sampled
    for (const [u, d] of [['ock', 2], ['oon', 3]]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-309-gate-d${d}-en-u${u}`, unit: u });
      assertRender(`d${d} unit ${u}`, r, TYPE.difficulty[d], en, { unit: u });
      ok(r.m.stamp && r.m.stamp.unit === u && r.meta.unit === u, `unit ${u}: stamp ${r.m.stamp && r.m.stamp.unit} / meta ${r.meta.unit}`);
      pngs.push(r.png);
      console.log(`render d${d} unit ${u}: classes ${r.meta.classes.join(' ')}`);
    }
    // a locale without a bank block REFUSES (never an en fallback)
    {
      let msg = '';
      try { TYPE.build({ theme: null, difficulty: 2, locale: 'xx' }, { rng: makeRng('x') }); } catch (e) { msg = e.message; }
      if (judge('PL', msg ? [msg] : [], /has no xx block/)) killed++;
    }

    // 5. the faces through the real pipeline (d2 en; the worst legal chrome; the K shapes; a unit each)
    const fiLong = { title: 'Riimisanaharjoitukset: ympyröimistehtävä riimisanapareille kuvineen', instruction: LONG.fi.instruction };
    for (const f of FACES) {
      const r = await renderFace(page, f.spec, { baseName: `${f.id}-gate-d2-en` });
      const s = assertFaceRender(`${f.id} ${f.mode}`, f, r, { bank: en });
      pngs.push(r.png);
      console.log(`render ${f.id} ${f.mode}: verify ${r.verify.length} lints ${r.lints.length} min picture ${s.minIcon} px, lanes ${r.m.lanes.length}, body ${Math.round(r.m.body.h)} px, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
      for (const [tag, strings] of [['threeline', THREE_LINE], ['filong', fiLong]]) {
        const rc = await renderFace(page, f.spec, { baseName: `${f.id}-gate-d2-en-${tag}`, strings });
        assertFaceRender(`${f.id} ${f.mode} ${tag} chrome`, f, rc, { bank: en });
        pngs.push(rc.png);
        console.log(`render ${f.id} ${f.mode} ${tag} chrome: body ${Math.round(rc.m.body.h)} px (head ${Math.round(rc.m.titleH)} px), lowest ${Math.round(rc.m.lowest)} vs foot ${Math.round(rc.m.foot)}`);
      }
      if (f.mode === 'sort' || f.mode === 'string') {
        const rk = await renderFace(page, faceWith(f, en, { band: 'K' }), { baseName: `${f.id}-gate-d2-en-Kshape` });
        assertFaceRender(`${f.id} ${f.mode} K shape`, f, rk, { bank: en, band: 'K' });
        const rk2 = await renderFace(page, faceWith(f, en, { band: 'K' }), { baseName: `${f.id}-gate-d2-en-Kshape-threeline`, strings: THREE_LINE });
        assertFaceRender(`${f.id} ${f.mode} K shape three-line chrome`, f, rk2, { bank: en, band: 'K' });
        pngs.push(rk.png, rk2.png);
        console.log(`render ${f.id} ${f.mode} K shape: min picture ${Math.round(Math.min(...rk.m.icons))} px (floor 56), glyphH ${rk.m.stamp.glyphH}, lanes ${rk.m.lanes.length}, lowest ${Math.round(rk2.m.lowest)} vs foot ${Math.round(rk2.m.foot)} under the three-line chrome`);
      }
      const unit = { judge: 'ock', sort: 'ock', string: 'oon', open: 'ock' }[f.mode];
      if (unit) {
        const ru = await renderFace(page, f.spec, { baseName: `${f.id}-gate-d2-en-u${unit}`, unit });
        assertFaceRender(`${f.id} ${f.mode} unit ${unit}`, f, ru, { bank: en, unit });
        const onPage = { judge: () => ru.m.face.cards.some((c) => c.rhyme === '1' && c.ca === unit), sort: () => ru.m.face.bins.some((b) => b.cls === unit), string: () => ru.m.face.rows.some((r) => r.cls === unit), open: () => ru.m.face.cards.some((c) => c.cls === unit) }[f.mode]();
        ok(onPage, `${f.id} unit ${unit}: the unit class is not on the page in the face's sense`);
        pngs.push(ru.png);
      } else {
        ok(f.spec.unitAxis && f.spec.unitAxis.applicable === false, `${f.id}: the couplet face must declare unitAxis.applicable:false`);
      }
    }
    // the face ids + bands are the allocation's (the emitter refuses others, but the K face must live in types/k)
    ok(FACES.every((f) => f.spec.id === f.id && f.spec.gradeBand === f.band), 'face ids / bands ≠ the rows module');
    ok(FACES.every((f) => f.spec.themeAxis && f.spec.themeAxis.applicable === false), 'a face lost themeAxis.applicable:false');

    // 3. seed sweep (build only)
    if (!QUICK) {
      // 5b. the faces, 20 seeds each (build only)
      for (const f of FACES) {
        const pagesF = new Set();
        for (let k = 1; k <= 20; k++) {
          const rng = makeRng(instanceSeed({ typeId: f.id, theme: null, difficulty: 2, seedEpoch: k }));
          let b;
          try { b = f.spec.build({ theme: null, difficulty: 2, locale: 'en' }, { rng }); } catch (e) { fails.push(`sweep ${f.id} seed ${k}: ${e.message}`); assertions++; continue; }
          const mt = b.meta;
          if (f.mode === 'judge') {
            const yes = mt.cards.filter((c) => c.rhyme).length;
            ok(yes === f.cfg.yes && mt.cards.length === f.cfg.cards, `sweep ${f.id} seed ${k}: ${yes}/${mt.cards.length}`);
            const keys = mt.cards.flatMap((c) => [c.a, c.b]);
            ok(new Set(keys).size === keys.length, `sweep ${f.id} seed ${k}: a word twice`);
            const pairCls = new Set(mt.cards.filter((c) => c.rhyme).map((c) => c.clsA));
            ok(mt.cards.every((c) => c.rhyme ? c.clsA === c.clsB : (c.clsA !== c.clsB && !pairCls.has(c.clsA) && !pairCls.has(c.clsB))), `sweep ${f.id} seed ${k}: a non-pair from a rhyming class / a pair across classes`);
            let run = 1, bad = false; for (let i = 1; i < mt.cards.length; i++) { run = mt.cards[i].rhyme === mt.cards[i - 1].rhyme ? run + 1 : 1; if (run >= 4) bad = true; }
            ok(!bad && mt.cards.some((c, i) => c.rhyme && i % 2 === 0) && mt.cards.some((c, i) => c.rhyme && i % 2 === 1), `sweep ${f.id} seed ${k}: layout ${mt.cards.map((c) => (c.rhyme ? 'Y' : 'n')).join('')}`);
            pagesF.add(keys.slice().sort().join(','));
          } else if (f.mode === 'sort') {
            ok(new Set(mt.bins.map((b) => b.cls)).size === f.cfg.bins && mt.bank.length === f.cfg.bins * f.cfg.perBin, `sweep ${f.id} seed ${k}: bins / bank`);
            const clsOf = new Map(mt.bins.flatMap((b) => b.members.map((m) => [m, b.cls])));
            ok(!mt.bank.some((k2, i) => i > 0 && clsOf.get(k2) === clsOf.get(mt.bank[i - 1])), `sweep ${f.id} seed ${k}: adjacent pair in the bank`);
            ok(new Set([...mt.bank, ...mt.bins.map((b) => b.head)]).size === mt.bank.length + mt.bins.length, `sweep ${f.id} seed ${k}: a word twice`);
            pagesF.add(mt.bank.slice().sort().join(','));
          } else if (f.mode === 'couplet') {
            ok(mt.couplets.length === f.cfg.rows && new Set(mt.answers).size === f.cfg.rows, `sweep ${f.id} seed ${k}: couplets / answers`);
            pagesF.add(mt.couplets.slice().sort().join(','));
          } else if (f.mode === 'string') {
            const pageCls = new Set(mt.anchors.map((a) => a.cls));
            ok(pageCls.size === f.cfg.anchors && mt.foils.length === f.cfg.foils && mt.bank.length === f.cfg.anchors * f.cfg.per + f.cfg.foils, `sweep ${f.id} seed ${k}: shape`);
            const wordCls = new Map(); for (const c of en.classes) for (const x of c.members) wordCls.set(x.word, c.id);
            ok(!mt.bank.some((w, i) => i > 0 && pageCls.has(wordCls.get(w)) && wordCls.get(w) === wordCls.get(mt.bank[i - 1])), `sweep ${f.id} seed ${k}: adjacent answers ${mt.bank.join(' ')}`);
            ok(mt.foils.every((fk) => !pageCls.has(en.classes.find((c) => c.members.some((x) => x.vocabKey === fk)).id)), `sweep ${f.id} seed ${k}: a foil from a page class`);
            pagesF.add(mt.bank.slice().sort().join(','));
          } else if (f.mode === 'open') {
            ok(new Set(mt.cards.map((c) => c.cls)).size === f.cfg.cards && new Set(mt.cards.map((c) => c.anchor)).size === f.cfg.cards, `sweep ${f.id} seed ${k}: classes / anchors`);
            pagesF.add(mt.cards.map((c) => c.anchor).sort().join(','));
          }
        }
        ok(pagesF.size >= 2, `sweep ${f.id}: ${pagesF.size} distinct pages over 20 seeds`);
        console.log(`sweep ${f.id} ${f.mode}: ${pagesF.size} distinct pages over 20 seeds`);
      }
      // the K shapes of sort + string build over 20 seeds
      let kF = 0;
      for (let k = 1; k <= 20; k++) for (const mode of ['sort', 'string']) { const f = FACE_BY_MODE[mode]; try { f.spec._buildWith(en, { difficulty: 2, locale: 'en', band: 'K' }, { rng: makeRng('KF' + k + mode) }); kF++; } catch (e) { fails.push(`sweep ${f.id} K shape seed ${k}: ${e.message}`); } assertions++; }
      // units buildable per face (a refusal is legal for a unit a face cannot carry)
      const uF = {};
      for (const f of FACES) { if (!f.spec.unitAxis.applicable) continue; uF[f.id] = 0; for (const u of units) { try { f.spec._buildWith(en, { difficulty: 2, locale: 'en', unit: u }, { rng: makeRng('uF' + u + f.id) }); uF[f.id]++; } catch (e) { /* legal */ } } }
      console.log(`sweep faces: K shapes ${kF}/40 builds; units buildable ${Object.entries(uF).map(([id, n]) => id + ' ' + n + '/' + units.length).join(', ')}`);

      const pages = { 1: new Set(), 2: new Set(), 3: new Set() };
      const posSeen = { 1: new Set(), 2: new Set(), 3: new Set() };
      for (let k = 1; k <= 20; k++) for (const d of [1, 2, 3]) {
        const cfg = TYPE.difficulty[d];
        const rng = makeRng(instanceSeed({ typeId: 'G1-309', theme: null, difficulty: d, seedEpoch: k }));
        const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
        const m = b.meta;
        ok(m.rows.length === cfg.rows && new Set(m.classes).size === cfg.rows, `sweep seed ${k} d${d}: ${m.rows.length} rows, ${new Set(m.classes).size} distinct classes`);
        const keys = m.rows.flatMap((r) => [r.anchor, r.partner, ...r.distractors.map((x) => x.key)]);
        ok(new Set(keys).size === keys.length, `sweep seed ${k} d${d}: a vocabKey twice (${keys.join(',')})`);
        ok(m.rows.every((r) => r.distractors.length === cfg.choices - 1 && (r.distractors.filter((x) => x.foil).length === (cfg.nearMiss ? 1 : 0))), `sweep seed ${k} d${d}: distractor / foil counts`);
        ok(m.rows.every((r) => { const named = r.distractors.map((x) => x.cls).filter(Boolean); return new Set(named).size === named.length && !named.includes(r.cls); }), `sweep seed ${k} d${d}: distractor classes ${JSON.stringify(m.rows.map((r) => r.distractors.map((x) => x.cls)))}`);
        const counts = new Array(cfg.choices).fill(0); m.positions.forEach((p) => counts[p]++);
        ok(counts.every((n) => n >= 1 && n <= Math.ceil(cfg.rows / cfg.choices) + 1), `sweep seed ${k} d${d}: positions ${m.positions.join('')}`);
        const exemplar = en.exemplar.slice(0, Math.min(cfg.rows, 6));
        ok(exemplar.every((id) => m.classes.includes(id)), `sweep seed ${k} d${d}: exemplar ${exemplar.join(',')} not all on the page (${m.classes.join(',')})`);
        pages[d].add(keys.slice().sort().join(','));
        posSeen[d].add(m.positions.join(''));
      }
      for (const d of [1, 2, 3]) ok(pages[d].size >= 2 && posSeen[d].size >= 2, `sweep d${d}: ${pages[d].size} distinct pages / ${posSeen[d].size} position patterns over 20 seeds`);
      // the K shape + the units, build only
      let kOk = 0;
      for (let k = 1; k <= 20; k++) for (const d of [1, 2, 3]) { try { TYPE._buildWith(en, { difficulty: d, locale: 'en', band: 'K' }, { rng: makeRng('K' + k + d) }); kOk++; } catch (e) { fails.push(`sweep K shape seed ${k} d${d}: ${e.message}`); } assertions++; }
      const uOk = [];
      for (const u of units) for (const d of [1, 2, 3]) { try { TYPE._buildWith(en, { difficulty: d, locale: 'en', unit: u }, { rng: makeRng('u' + u + d) }); uOk.push(`${u}/d${d}`); } catch (e) { /* a refusal is legal for a unit that cannot anchor at that d */ } }
      console.log(`sweep: distinct pages d1 ${pages[1].size} / d2 ${pages[2].size} / d3 ${pages[3].size} over 20 seeds; position patterns ${posSeen[1].size}/${posSeen[2].size}/${posSeen[3].size}; K shape ${kOk}/60 builds; units buildable ${uOk.length}/${units.length * 3} (unit × d)`);
      const refusedUnits = units.flatMap((u) => [1, 2, 3].filter((d) => !uOk.includes(`${u}/d${d}`)).map((d) => `${u}/d${d}`));
      if (refusedUnits.length) console.log(`  unit refusals (legal — no near-miss foil or < 2 writable members at that d): ${refusedUnits.join(' ')}`);
    }

    // 4. poisons
    const gate = (b, loc) => validateBank(b, loc || 'en').fails;
    // P1 — a distractor from the anchor's OWN class (two right answers)
    {
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'bat', 'dog'] },
        { cls: 'og', anchor: 'frog', partner: 'log', choices: ['sun', 'log', 'car'] },
        { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'bee', 'jar'] },
        { cls: 'ee', anchor: 'tree', partner: 'bee', choices: ['bee', 'boat', 'bed'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock'] },
        { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed'] },
      ]);
      // the bee/tree row above reuses `bee` … keep every key once: row 3 uses bee as a distractor → swap to key
      rows[2].choices[1] = { vocabKey: 'key', cls: 'ee', word: 'key', pic: en.classes.find((c) => c.id === 'ee').members.find((m) => m.vocabKey === 'key').pic, rhyme: false };
      rows[3].choices[0] = Object.assign({}, rows[3].choices[0]);
      const { r, own } = await gateFindings(page, pageFrom(rows, 2), 2, 'G1-309-gate-poison-P1', en);
      const a = judge('P1 verify', r.verify, /row 1: 2 rings of the anchor's class "at"/);
      const b = judge('P1 node', own, /verify\(\)/, 'the gate re-asserts verify() empty');
      if (a && b) killed++;
    }
    // P2 — a member that is not pictured
    {
      const b = clone(en); b.classes.find((c) => c.id === 'at').members.push({ vocabKey: 'lynx', word: 'lynx', pic: { theme: 'animals', noun: 'lynx' }, sameSpelling: false, productive: true, picOpened: true });
      const a = judge('P2 bank', gate(b), /class at member "lynx": (theme does not resolve|vocabKey is not an entry|picture animals\/lynx)/);
      const c = judge('P2 build', buildRefusal(b, 2), /noun not cached: animals\/lynx|no colour picture/, 'the spec refused the picture');
      if (a && c) killed++;
    }
    // P3 — dog in -og AND a second class
    {
      const b = clone(en); b.classes.find((c) => c.id === 'ock').members.push(clone(en.classes.find((c) => c.id === 'og').members[0]));
      const a = judge('P3 bank', gate(b), /"dog" is also a member of og/);
      const c = judge('P3 build', buildRefusal(b, 2), /"dog" is a member of two classes/);
      if (a && c) killed++;
    }
    // P4 — a couplet whose line 2 prints the answer
    {
      const b = clone(en); b.couplets[0].lines[1] = 'and put on a big red hat ___';
      if (judge('P4', gate(b), /couplet cat-hat: the answer "hat" is printed/)) killed++;
    }
    // P5 — a zoo animals bw picture
    {
      const b = clone(en); b.classes.find((c) => c.id === 'ee').members[0].pic = { theme: 'zoo animals bw', noun: 'bee' };
      const a = judge('P5 bank', gate(b), /picture zoo animals bw\/bee is in a B&W dir/);
      const c = judge('P5 build', buildRefusal(b, 2), /pins a B&W directory zoo animals bw/);
      // and a render that carries a BW picture past the build (verify sees the src)
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'dog', 'sun'] }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar', 'bee'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed'] },
        { cls: 'ug', anchor: 'mug', partner: 'rug', choices: ['rug', 'pen', 'moon'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['boat', 'van', 'tree'] },
      ]);
      // row 5 reuses rug (row 4 distractor) → make row 4's distractor 'jug'
      rows[3].choices[0] = { vocabKey: 'jug', cls: 'ug', word: 'jug', pic: en.classes.find((c) => c.id === 'ug').members.find((m) => m.vocabKey === 'jug').pic, rhyme: false };
      let bwResolves = false;
      try { fileUri('zoo animals bw', 'elephant'); bwResolves = true; } catch (e) { /* not cached */ }
      let v = true;
      if (bwResolves) {
        rows[1].choices[2].pic = { theme: 'zoo animals bw', noun: 'elephant' };
        const r = await renderWith(page, pageFrom(rows, 2), { difficulty: 2, baseName: 'G1-309-gate-poison-P5' });
        v = judge('P5 verify', r.verify, /picture from a B&W directory "zoo animals bw"/);
      } else poisonLog.push('  P5 verify: skipped (zoo animals bw/elephant is not cached)');
      if (a && c && v) killed++;
    }
    // P6 — bee/tree split across two classes
    {
      const b = clone(en); const ee = b.classes.find((c) => c.id === 'ee'); const tree = ee.members.splice(1, 1)[0];
      b.classes.push({ id: 'ree', rime: '-ree', sound: 'riː', cap: 8, members: [tree, clone(en.classes.find((c) => c.id === 'ee').members[0])], extra: [], nearMiss: [] });
      b.classes[b.classes.length - 1].members[1] = { vocabKey: 'key', word: 'key', pic: { theme: 'around the house', noun: 'key' }, sameSpelling: false, productive: true, picOpened: true };
      ee.members = ee.members.filter((m) => m.vocabKey !== 'key');
      if (judge('P6', gate(b), /rhyming-pairs\.json bee\/tree is SPLIT across ee and ree/)) killed++;
    }
    // P7 — a fi member whose rime is not on a syllable boundary of the approved split (synthetic fi block)
    {
      const b = clone(en); b.rule = 'lastTwoSyllables'; b.orthographyTrusted = true;
      b.classes = [{ id: 'issa', rime: '-issa', sound: 'issa', cap: 8, members: [{ vocabKey: 'cat', word: 'kissa', pic: { theme: 'animals', noun: 'cat' }, sameSpelling: true, productive: true, picOpened: true }, { vocabKey: 'hat', word: 'hattu', pic: { theme: 'accessories', noun: 'hat' }, sameSpelling: false, productive: true, picOpened: true }], extra: [], nearMiss: [] }];
      if (judge('P7', gate(b, 'fi'), /fi rime "-issa" is not the last 1-2 syllables of "kissa" \(kis-sa\)/)) killed++;
    }
    // P8 — two distractors of one row from ONE class (they read as a pair; the base analogue of the F1 poison)
    {
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'dog', 'frog'] }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar', 'bee'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed'] },
        { cls: 'ug', anchor: 'mug', partner: 'jug', choices: ['jug', 'pen', 'moon'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['boat', 'van', 'tree'] },
      ]);
      const r = await renderWith(page, pageFrom(rows, 2), { difficulty: 2, baseName: 'G1-309-gate-poison-P8' });
      if (judge('P8', r.verify, /row 1: two distractors share a class \(og,og\)/)) killed++;
    }
    // P9 — a da title without "rimord" (synthetic da block)
    {
      const b = clone(en); b.strings['G1-309'].title = 'Rim og ramser';
      if (judge('P9', gate(b, 'da'), /da title "Rim og ramser" does not contain "rimord"/)) killed++;
    }
    // P10 — the old 760 base stack under the 722 chrome: the footer lint must fire
    {
      const good = TYPE._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('p10') });
      const t = Object.assign({}, TYPE, { build() { const out = clone(good); out.bodyHtml = out.bodyHtml.replace('<div class="ws-cardgrid" style="', '<div class="ws-cardgrid" style="height:760px;flex:0 0 auto;'); return out; } });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'G1-309-gate-poison-P10', strings: THREE_LINE });
      if (judge('P10', r.lints, /footer overlap|overflow:/, `body ${Math.round(r.m.body.h)} px under the three-line chrome`)) killed++;
    }
    // P11 — one word under two vocabKeys in one class (the `spis` dedup trap)
    {
      const b = clone(en); b.classes.find((c) => c.id === 'at').members.push({ vocabKey: 'kitten', word: 'cat', pic: { theme: 'pets', noun: 'cat' }, sameSpelling: true, productive: true, picOpened: true });
      if (judge('P11', gate(b), /the word "cat" twice in one class under two vocabKeys/)) killed++;
    }
    // PA — the rhyming word printed on the page
    {
      const good = TYPE._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('pa') });
      const t = Object.assign({}, TYPE, { build() { const out = clone(good); out.bodyHtml = out.bodyHtml.replace('</section>', `<span style="font-size:12px">${good.meta.answers[0]}</span></section>`); return out; } });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'G1-309-gate-poison-PA' });
      if (judge('PA', r.verify, new RegExp(`the word "${good.meta.answers[0]}" is printed on the page`))) killed++;
    }
    // PP — the rhyme position constant (every rhyme in slot 1): the spec re-rolls; a page built past it fails verify()
    {
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'dog', 'sun'] }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['jar', 'bun', 'bee'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['coat', 'bag', 'sock'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['bed', 'jug', 'can'] },
        { cls: 'ug', anchor: 'mug', partner: 'rug', choices: ['rug', 'pen', 'moon'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['van', 'boat', 'tree'] },
      ]);
      const r = await renderWith(page, pageFrom(rows, 2), { difficulty: 2, baseName: 'G1-309-gate-poison-PP' });
      if (judge('PP', r.verify, /rhyme position 1 used 6 times \(want 1\.\.3\)|rhyme position 2 used 0 times/)) killed++;
    }
    // PS — a d1 starter that is not the first glyph of the rhyming word
    {
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'dog'], starter: 'c' }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar'], starter: 'j' },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['coat', 'bag'], starter: 'c' }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'bed'], starter: 'b' },
        { cls: 'ug', anchor: 'mug', partner: 'jug', choices: ['jug', 'pen'], starter: 'j' },
      ]);
      const r = await renderWith(page, pageFrom(rows, 1), { difficulty: 1, baseName: 'G1-309-gate-poison-PS' });
      if (judge('PS', r.verify, /row 1: starter "c" ≠ the first glyph of "hat"/)) killed++;
    }
    // PF — a d3 foil outside the anchor's nearMiss (the node cross-check; verify() cannot see the bank)
    {
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'dog', 'sun', 'moon'], foils: ['moon'], clsOf: { moon: 'oon' } }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar', 'bee', 'cart'], foils: ['cart'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock', 'bowl'], foils: ['bowl'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed', 'bell'], foils: ['bell'] },
        { cls: 'ug', anchor: 'mug', partner: 'jug', choices: ['jug', 'pen', 'pie', 'muffin'], foils: ['muffin'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['boat', 'van', 'tree', 'pants'], foils: ['pants'] },
        { cls: 'og', anchor: 'frog', partner: 'log', choices: ['log', 'nest', 'ham', 'doll'], foils: ['doll'] },
      ]);
      const { r, own } = await gateFindings(page, pageFrom(rows, 3), 3, 'G1-309-gate-poison-PF', en);
      if (judge('PF', own, /foil "moon" is not in the nearMiss of at/, `verify ${r.verify.length} (page-side, bank-blind by design)`)) killed++;
    }
    // PN — a plain d2 distractor that is a near-miss of the anchor's class (cap in the cat row)
    {
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'cap', 'sun'], clsOf: { cap: 'ap' } }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar', 'bee'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed'] },
        { cls: 'ug', anchor: 'mug', partner: 'jug', choices: ['jug', 'pen', 'moon'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['boat', 'van', 'tree'] },
      ]);
      const { own } = await gateFindings(page, pageFrom(rows, 2), 2, 'G1-309-gate-poison-PN', en);
      if (judge('PN', own, /plain distractor "cap" is a near-miss of at \(nearMiss off\)/)) killed++;
    }
    // PW — the rhyming pair with a sameSpelling:false member on a write face (key written for bee)
    {
      const rows = rowsFrom(en, [
        { cls: 'ee', anchor: 'bee', partner: 'key', choices: ['key', 'dog', 'sun'] }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar', 'hat'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed'] },
        { cls: 'ug', anchor: 'mug', partner: 'jug', choices: ['jug', 'pen', 'moon'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['boat', 'van', 'cat'] },
      ]);
      const { own } = await gateFindings(page, pageFrom(rows, 2), 2, 'G1-309-gate-poison-PW', en);
      const a = judge('PW node', own, /the rhyming word "key" is sameSpelling:false on a WRITE face/);
      // and the spec itself never draws it: 20 seeds × unit ee never pair bee with key
      let drew = false;
      for (let k = 1; k <= 20; k++) { const m = TYPE._buildWith(en, { difficulty: 2, locale: 'en', unit: 'ee' }, { rng: makeRng('pw' + k) }).meta; if (m.rows.some((r) => r.cls === 'ee' && (r.partner === 'key' || r.anchor === 'key'))) drew = true; }
      const b = judge('PW spec', drew ? [] : ['key never drawn as anchor or partner over 20 seeds'], /never drawn/, 'the spec draws sameSpelling:true only');
      if (a && b) killed++;
    }
    // PU — a unit render whose class anchors no row
    {
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'dog', 'sun'] }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar', 'bee'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed'] },
        { cls: 'ug', anchor: 'mug', partner: 'jug', choices: ['jug', 'pen', 'moon'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['boat', 'van', 'tree'] },
      ]);
      const { own } = await gateFindings(page, pageFrom(rows, 2, { unit: 'ock' }), 2, 'G1-309-gate-poison-PU', en, { unit: 'ock' });
      const a = judge('PU node', own, /unit "ock" anchors no row/);
      const b = judge('PU guard', buildRefusal(en, 2, null, { unit: 'zzz' }), /unit "zzz" is not a en class/);
      if (a && b) killed++;
    }
    // PC — a row wider than its card (the lane pushed past the card box; .ws-card clips it silently)
    {
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'dog', 'sun'] }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar', 'bee'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed'] },
        { cls: 'ug', anchor: 'mug', partner: 'jug', choices: ['jug', 'pen', 'moon'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['boat', 'van', 'tree'] },
      ]);
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: { ...TYPE.difficulty[2], laneW: 320 } } });
      const a = judge('PC guard', buildRefusal(en, 2, t), /row budget 718 px > the 647 px card/);
      const { r, own } = await gateFindings(page, pageFrom(rows, 2, { laneW: 320 }), 2, 'G1-309-gate-poison-PC', en, { cfg: { laneW: 320 } });
      const b = judge('PC verify', r.verify, /outside the card box/);
      const c = judge('PC gate', own, /outside the card box/);
      if (a && b && c) killed++;
    }
    // PI — a 36 px choice picture: the spec guard refuses; a page that forces it fails verify() and the gate floor
    {
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: { ...TYPE.difficulty[2], choicePx: 36 } } });
      const a = judge('PI guard', buildRefusal(en, 2, t), /picture 36 px below the G1 floor 44/);
      const rows = rowsFrom(en, [
        { cls: 'at', anchor: 'cat', partner: 'hat', choices: ['hat', 'dog', 'sun'] }, { cls: 'ar', anchor: 'star', partner: 'jar', choices: ['bun', 'jar', 'bee'] },
        { cls: 'oat', anchor: 'goat', partner: 'coat', choices: ['bag', 'coat', 'sock'] }, { cls: 'ed', anchor: 'sled', partner: 'bed', choices: ['rug', 'can', 'bed'] },
        { cls: 'ug', anchor: 'mug', partner: 'jug', choices: ['jug', 'pen', 'moon'] }, { cls: 'an', anchor: 'fan', partner: 'van', choices: ['boat', 'van', 'tree'] },
      ]);
      const { r, own } = await gateFindings(page, pageFrom(rows, 2, { choicePx: 36 }), 2, 'G1-309-gate-poison-PI', en);
      const b = judge('PI verify', r.verify, /picture 36 px < floor 44/);
      const c = judge('PI gate', own, /picture 36 px < the G1 floor 44/);
      if (a && b && c) killed++;
    }
    // PD — the spec: rows < choices (the rhyme position cannot cover every slot) and a class twice
    {
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: { ...TYPE.difficulty[2], rows: 2 } } });
      const a = judge('PD guard rows<choices', buildRefusal(en, 2, t), /rows 2 outside 4\.\.12|rows 2 < choices 3/);
      const b = clone(en); b.exemplar = ['at', 'at', 'og', 'ar', 'ee', 'oat'];
      const c = judge('PD exemplar twice', [...gate(b), ...buildRefusal(b, 2)], /exemplar repeats a class|a class twice on the page/);
      if (a && c) killed++;
    }
    // PX — a bank whose exemplar cannot anchor a write row (one writable member) REFUSES at build
    {
      const b = clone(en); b.classes.find((c) => c.id === 'un').members[1].sameSpelling = false; b.classes.find((c) => c.id === 'un').members[1].word = 'bunn';
      const a = judge('PX bank', gate(b), /exemplar "un" has 1 writable \(sameSpelling\) members < 2/);
      const c = judge('PX build', buildRefusal(b, 2), /exemplar class "un" cannot anchor a row at this difficulty \(refuse\)/);
      if (a && c) killed++;
    }

    // 5c. face poisons
    {
      const J = FACE_BY_MODE.judge, S = FACE_BY_MODE.sort, C = FACE_BY_MODE.couplet, T = FACE_BY_MODE.string, O = FACE_BY_MODE.open;
      const memberOf = (bank, key) => { for (const c of bank.classes) { const m = c.members.find((x) => x.vocabKey === key); if (m) return { vocabKey: m.vocabKey, word: m.word, cls: c.id, src: fileUri(m.pic.theme, m.pic.noun), pic: m.pic, sameSpelling: m.sameSpelling }; } throw new Error('poison: unknown key ' + key); };
      const E = (key) => memberOf(en, key);
      const jcard = (a, b, rhyme) => ({ a: E(a), b: E(b), rhyme, cls: rhyme ? E(a).cls : null });
      const goodJ = () => ({ face: 'judge', band: 'K', unit: null, cards: [jcard('cat', 'hat', true), jcard('bun', 'star', false), jcard('dog', 'log', true), jcard('nail', 'cake', false), jcard('pen', 'moon', false), jcard('sun', 'bun', true), jcard('map', 'truck', false), jcard('boat', 'goat', true)] });
      // the control: the hand-built good judge plan passes everything
      { const g = goodJ(); g.cards[1] = jcard('bread', 'star', false); g.cards[5] = jcard('sun', 'bun', true); const { own, r } = await faceFindings(page, J, faceFrom(J, g), 'K-352-gate-control', en); ok(own.length === 0 && r.verify.length === 0, 'judge control plan: ' + JSON.stringify([...own, ...r.verify].slice(0, 3))); }
      // FJ1 — a "non-rhyming" pair drawn from ONE class (design P8)
      { const g = goodJ(); g.cards[1] = jcard('bread', 'star', false); g.cards[5] = jcard('sun', 'bun', true); g.cards[3] = jcard('pear', 'bear', false); const { r } = await faceFindings(page, J, faceFrom(J, g), 'K-352-gate-poison-FJ1', en); if (judge('FJ1', r.verify, /card 4: classes === but rhyme="0" \(pear\/bear\)/)) killed++; }
      // FJ2 — 7 of 8 rhyme
      { const g = { face: 'judge', band: 'K', unit: null, cards: [jcard('cat', 'hat', true), jcard('dog', 'log', true), jcard('sun', 'bun', true), jcard('star', 'car', true), jcard('bee', 'tree', true), jcard('boat', 'goat', true), jcard('bed', 'sled', true), jcard('map', 'truck', false)] }; const { r, own } = await faceFindings(page, J, faceFrom(J, g), 'K-352-gate-poison-FJ2', en); const a = judge('FJ2 verify', r.verify, /7 yes \/ 1 no — one verdict is \(nearly\) constant|four equal verdicts/); const b = judge('FJ2 gate', own, /7 rhyming cards ≠ the config's 4/); if (a && b) killed++; }
      // FJ3 — every rhyming pair in one column (even indices)
      { const g = { face: 'judge', band: 'K', unit: null, cards: [jcard('cat', 'hat', true), jcard('bread', 'star', false), jcard('dog', 'log', true), jcard('nail', 'cake', false), jcard('sun', 'bun', true), jcard('pen', 'moon', false), jcard('boat', 'goat', true), jcard('map', 'truck', false)] }; const { r } = await faceFindings(page, J, faceFrom(J, g), 'K-352-gate-poison-FJ3', en); if (judge('FJ3', r.verify, /the rhyming pairs sit in one column/)) killed++; }
      // FJ4 — a chip printing "yes" · FJ5 — a coral cross
      { const g = goodJ(); g.cards[1] = jcard('bread', 'star', false); const t = mutated(J, g, (h) => h.replace('data-lcs-chip="yes">', 'data-lcs-chip="yes"><span style="font-size:12px">yes</span>')); const r = await renderFace(page, t, { baseName: 'K-352-gate-poison-FJ4' }); if (judge('FJ4', r.verify, /chip "yes" carries text "yes"/)) killed++; }
      { const g = goodJ(); g.cards[1] = jcard('bread', 'star', false); const t = mutated(J, g, (h) => h.replace(/(data-lcs-chip="no">[\s\S]*?stroke=")#146B5E/, '$1#F2784B')); const r = await renderFace(page, t, { baseName: 'K-352-gate-poison-FJ5' }); if (judge('FJ5', r.verify, /chip "no" mark is #F2784B, not teal/)) killed++; }
      // FJ6 — a word twice
      { const g = goodJ(); g.cards[1] = jcard('bread', 'star', false); g.cards[6] = jcard('cat', 'truck', false); const { r } = await faceFindings(page, J, faceFrom(J, g), 'K-352-gate-poison-FJ6', en); if (judge('FJ6', r.verify, /"cat" already on the page \(card 1\)/)) killed++; }
      // FJ7 — a non-pair whose two classes share a SOUND (synthetic bank: chair moved into its own -air class)
      { const b = clone(en); const ear = b.classes.find((c) => c.id === 'ear'); const chair = ear.members.splice(2, 1)[0]; b.classes.push({ id: 'air', rime: '-air', sound: 'ɛr', cap: 8, members: [chair, Object.assign(clone(ear.members[0]), { vocabKey: 'pear2' })], extra: [], nearMiss: [] }); b.classes[b.classes.length - 1].members.pop();
        b.classes[b.classes.length - 1].members.push({ vocabKey: 'bear', word: 'bear', pic: { theme: 'camping', noun: 'bear' }, sameSpelling: false, productive: true, picOpened: true }); ear.members = ear.members.filter((m) => m.vocabKey !== 'bear');
        const M = (k) => memberOf(b, k); const g = goodJ(); g.cards[1] = jcard('bread', 'star', false); g.cards[3] = { a: M('pear'), b: M('chair'), rhyme: false, cls: null };
        const { r, own } = await faceFindings(page, J, faceFrom(J, g), 'K-352-gate-poison-FJ7', b); const a = judge('FJ7 node', own, /non-pair pear\/chair — classes ear\/air share the sound "ɛr"/, `verify ${r.verify.length} (bank-blind by design)`); if (a) killed++; }
      // FJ8 — a 48 px picture on the K face → _planFace refuses
      { if (judge('FJ8', planRefusal(J, en, { cfg: { picPx: 48 } }), /picture 48 px below the K floor 56/)) killed++; }
      // FJ9 — a near-miss non-pair (cat / cap)
      { const g = goodJ(); g.cards[1] = jcard('bread', 'star', false); g.cards[0] = jcard('bat', 'hat', true); g.cards[3] = jcard('cat', 'cap', false); const { own } = await faceFindings(page, J, faceFrom(J, g), 'K-352-gate-poison-FJ9', en); if (judge('FJ9', own, /non-pair cat\/cap is a near-miss pair/)) killed++; }

      const sbin = (cls, head, members) => ({ cls, head: E(head), members: members.map(E) });
      const goodS = () => { const bins = [sbin('at', 'cat', ['hat', 'bat']), sbin('og', 'frog', ['dog', 'log']), sbin('ar', 'star', ['car', 'jar'])]; return { face: 'sort', band: 'G1', unit: null, bins, bankItems: [E('hat'), E('dog'), E('car'), E('bat'), E('log'), E('jar')] }; };
      { const { own, r } = await faceFindings(page, S, faceFrom(S, goodS()), 'G1-343-gate-control', en); ok(own.length === 0 && r.verify.length === 0, 'sort control plan: ' + JSON.stringify([...own, ...r.verify].slice(0, 3))); }
      // FS1 — a bank picture whose class is no bin's
      { const g = goodS(); g.bankItems[1] = E('sun'); const { r } = await faceFindings(page, S, faceFrom(S, g), 'G1-343-gate-poison-FS1', en); if (judge('FS1', r.verify, /bank 2: class "un" is no bin's class/)) killed++; }
      // FS2 — two bins of one class
      { const g = goodS(); g.bins[2] = sbin('at', 'cat', ['hat', 'bat']); g.bins[2].head = E('cap'); g.bins[2].head.cls = 'at'; const { r } = await faceFindings(page, S, faceFrom(S, g), 'G1-343-gate-poison-FS2', en); if (judge('FS2', r.verify, /two bins share a class/)) killed++; }
      // FS3 — a bin's two members adjacent in the bank
      { const g = goodS(); g.bankItems = [E('hat'), E('bat'), E('dog'), E('car'), E('log'), E('jar')]; const { r } = await faceFindings(page, S, faceFrom(S, g), 'G1-343-gate-poison-FS3', en); if (judge('FS3', r.verify, /bank 2: adjacent to a picture of the same class "at"/)) killed++; }
      // FS4 — a bin head also in the bank
      { const g = goodS(); g.bankItems[0] = E('cat'); const { r } = await faceFindings(page, S, faceFrom(S, g), 'G1-343-gate-poison-FS4', en); if (judge('FS4', r.verify, /"cat" is also a bin head/)) killed++; }
      // FS5 — a lane with printed text
      { const t = mutated(S, goodS(), (h) => h.replace('</svg></div><div data-lcs-bin-lane="2"', '<text x="10" y="40" font-size="20">hat</text></svg></div><div data-lcs-bin-lane="2"')); const r = await renderFace(page, t, { baseName: 'G1-343-gate-poison-FS5' }); if (judge('FS5', r.verify, /lane 1: the writing row is not empty/)) killed++; }
      // FS6 — a unit that cannot head a bin
      { if (judge('FS6', planRefusal(S, en, { unit: 'un' }), /unit "un" cannot carry this face \(refuse\)/)) killed++; }
      // FS7 — a bank picture stamped with another class (verify passes: the class matches a bin)
      { const g = goodS(); g.bankItems = [E('hat'), E('car'), Object.assign({}, E('dog'), { cls: 'at' }), E('log'), E('jar'), Object.assign({}, E('bat'), { cls: 'og' })]; const { r, own } = await faceFindings(page, S, faceFrom(S, g), 'G1-343-gate-poison-FS7', en); if (judge('FS7', own, /bank picture "dog" stamped class "at" ≠ bank "og" — not verbatim/, `verify ${r.verify.length} (bank-blind by design)`)) killed++; }

      const crow = (id) => { const cp = en.couplets.find((c) => c.id === id); const a = E(cp.answer.vocabKey); const [pre, post] = cp.lines[1].split('___'); return { id, line1: cp.lines[0], pre, post: post || '', rhymeWith: cp.rhymeWith, answer: a, cls: a.cls }; };
      const goodC = () => ({ face: 'couplet', band: 'G1', unit: null, rows: ['cat-hat', 'dog-frog', 'sun-bun', 'star-car', 'boat-goat', 'bed-sled'].map(crow) });
      { const { own, r } = await faceFindings(page, C, faceFrom(C, goodC()), 'G1-344-gate-control', en); ok(own.length === 0 && r.verify.length === 0, 'couplet control plan: ' + JSON.stringify([...own, ...r.verify].slice(0, 3))); }
      // FC1 — line 2 prints the answer
      { const g = goodC(); g.rows[0].pre = 'and put on a big red hat '; const { r } = await faceFindings(page, C, faceFrom(C, g), 'G1-344-gate-poison-FC1', en); if (judge('FC1', r.verify, /couplet 1: the answer "hat" is printed in the verse/)) killed++; }
      // FC2 — line 1 without the partner
      { const g = goodC(); g.rows[0].line1 = 'The cat sat down on the rug'; const { r } = await faceFindings(page, C, faceFrom(C, g), 'G1-344-gate-poison-FC2', en); if (judge('FC2', r.verify, /couplet 1: line 1 ".*" does not end in \/ carry the partner "mat"/)) killed++; }
      // FC3 — the same answer twice
      { const g = goodC(); g.rows[5] = crow('cat-hat'); const { r } = await faceFindings(page, C, faceFrom(C, g), 'G1-344-gate-poison-FC3', en); if (judge('FC3', r.verify, /couplet 6: answer "hat" repeats/)) killed++; }
      // FC4 — the lane pre-filled
      { const t = mutated(C, goodC(), (h) => h.replace('</svg></span>', '<text x="10" y="40" font-size="20">hat</text></svg></span>')); const r = await renderFace(page, t, { baseName: 'G1-344-gate-poison-FC4' }); if (judge('FC4', r.verify, /couplet 1: lane: the writing row is not empty/)) killed++; }
      // FC5 — 7 couplets → F3 refused
      { const b = clone(en); b.couplets = b.couplets.slice(0, 7); if (judge('FC5', planRefusal(C, b), /has 7 couplets < 8 — F3 refused/)) killed++; }
      // FC6 — the text floating off the base line (padding-bottom removed on row 1)
      { const t = mutated(C, goodC(), (h) => h.replace(/;padding-bottom:[0-9.]+px" data-lcs-verse-text="1">and put/, '" data-lcs-verse-text="1">and put')); const r = await renderFace(page, t, { baseName: 'G1-344-gate-poison-FC6' }); if (judge('FC6', r.verify, /couplet 1: line 2 text baseline \d+ is -?\d+ px off the lane's base line/)) killed++; }
      // FC7 — a 70-char verse line
      { const g = goodC(); g.rows[0].line1 = 'The cat sat down on the mat and the mat was very very very flat mat'; const { r } = await faceFindings(page, C, faceFrom(C, g), 'G1-344-gate-poison-FC7', en); if (judge('FC7', r.verify, /couplet 1: line 1 spans \d+ px of ink past the \d+ px column/)) killed++; }

      const tanch = (cls, anchor, answers) => ({ cls, anchor: E(anchor), answers: answers.map(E) });
      const foil = (k) => Object.assign(E(k), { foil: true });
      const goodT = () => { const anchors = [tanch('at', 'cat', ['hat', 'bat']), tanch('og', 'frog', ['dog', 'log']), tanch('ar', 'star', ['car', 'jar']), tanch('oat', 'boat', ['coat', 'goat'])]; const foils = [foil('sun'), foil('pen'), foil('moon'), foil('map')]; return { face: 'string', band: 'G1', unit: null, anchors, foils, bankItems: [E('hat'), E('dog'), foil('sun'), E('car'), E('bat'), E('coat'), foil('pen'), E('log'), E('goat'), foil('moon'), E('jar'), foil('map')] }; };
      { const { own, r } = await faceFindings(page, T, faceFrom(T, goodT()), 'G1-345-gate-control', en); ok(own.length === 0 && r.verify.length === 0, 'string control plan: ' + JSON.stringify([...own, ...r.verify].slice(0, 3))); }
      // FT1 — the bank missing an answer
      { const g = goodT(); g.bankItems[0] = foil('bed'); const { r } = await faceFindings(page, T, faceFrom(T, g), 'G1-345-gate-poison-FT1', en); if (judge('FT1', r.verify, /anchor 1: answer "hat" is not in the bank/)) killed++; }
      // FT2 — a foil from an anchor's class (guitar is -ar; star anchors -ar on the plan)
      { const g = goodT(); g.bankItems[2] = foil('guitar'); g.foils[0] = foil('guitar'); const { r } = await faceFindings(page, T, faceFrom(T, g), 'G1-345-gate-poison-FT2', en); if (judge('FT2', r.verify, /bank 3: foil "guitar" is from an anchor's class "ar" — it rhymes/)) killed++; }
      // FT3 — an anchor's two answers adjacent
      { const g = goodT(); g.bankItems = [E('hat'), E('bat'), E('dog'), foil('sun'), E('car'), E('coat'), foil('pen'), E('log'), E('goat'), foil('moon'), E('jar'), foil('map')]; const { r } = await faceFindings(page, T, faceFrom(T, g), 'G1-345-gate-poison-FT3', en); if (judge('FT3', r.verify, /anchor 1: its answers "hat" and "bat" are adjacent in the bank/)) killed++; }
      // FT4 — the anchor's own word in the bank
      { const g = goodT(); g.bankItems[2] = foil('cat'); g.foils[0] = foil('cat'); const { r } = await faceFindings(page, T, faceFrom(T, g), 'G1-345-gate-poison-FT4', en); if (judge('FT4', r.verify, /the anchor word "cat" is printed in the bank|the anchor's own word "cat"|foil "cat" is from an anchor's class/)) killed++; }
      // FT5 — a bank that needs three rows: the plan guard refuses; a forced render fails verify()
      { const a = judge('FT5 guard', planRefusal(T, en, { cfg: { wordPx: 60 } }), /bank of 12 words estimates \d+ px > two rows/); const t = faceFrom(T, goodT(), { wordPx: 40 }); const r = await renderFace(page, t, { baseName: 'G1-345-gate-poison-FT5' }); const b = judge('FT5 verify', r.verify, /the bank wraps to \d+ rows \(max 2\)/); if (a && b) killed++; }
      // FT6 — a foil whose class shares an anchor's SOUND: a synthetic -une class (sound uːn, rime -oon) that carries
      //       raccoon beside the real -oon (verify() sees a different class id and passes; only the node check hears it)
      { const b3 = clone(en); const oon3 = b3.classes.find((c) => c.id === 'oon'); const rac = oon3.members.splice(3, 1)[0]; b3.classes.push({ id: 'une', rime: '-oon', sound: 'uːn', cap: 8, members: [rac, { vocabKey: 'muffin', word: 'muffin', pic: { theme: 'bakery', noun: 'muffin' }, sameSpelling: false, productive: true, picOpened: true }], extra: [], nearMiss: [] });
        const M3 = (k) => memberOf(b3, k);
        const g4 = goodT(); g4.anchors[3] = { cls: 'oon', anchor: M3('moon'), answers: [M3('spoon'), M3('balloon')] }; g4.foils = [foil('sun'), foil('pen'), Object.assign(M3('raccoon'), { foil: true }), foil('map')];
        g4.bankItems = [E('hat'), E('dog'), foil('sun'), E('car'), E('bat'), M3('spoon'), foil('pen'), E('log'), M3('balloon'), Object.assign(M3('raccoon'), { foil: true }), E('jar'), foil('map')];
        const { r, own } = await faceFindings(page, T, faceFrom(T, g4), 'G1-345-gate-poison-FT6', b3); if (judge('FT6', own, /foil "raccoon" \(class une\) shares an anchor's SOUND "uːn" — it rhymes/, `verify ${r.verify.length} (bank-blind by design)`)) killed++; }

      const ocard = (cls, anchor) => { const a = E(anchor); const c = en.classes.find((x) => x.id === cls); return { cls, anchor: a, examples: [...c.members.filter((x) => x.vocabKey !== anchor).map((x) => x.word), ...c.extra] }; };
      const goodO = () => ({ face: 'open', band: 'G1', unit: null, cards: [ocard('at', 'cat'), ocard('og', 'dog'), ocard('un', 'sun'), ocard('ar', 'star'), ocard('ee', 'bee'), ocard('oat', 'boat')] });
      { const { own, r } = await faceFindings(page, O, faceFrom(O, goodO()), 'G1-346-gate-control', en); ok(own.length === 0 && r.verify.length === 0, 'open control plan: ' + JSON.stringify([...own, ...r.verify].slice(0, 3))); }
      // FO1 — the printed word ≠ the stamp
      { const t = mutated(O, goodO(), (h) => h.replace('data-lcs-word-print="1">cat<', 'data-lcs-word-print="1">hat<')); const r = await renderFace(page, t, { baseName: 'G1-346-gate-poison-FO1' }); if (judge('FO1', r.verify, /card 1: prints "hat" ≠ stamp "cat"/)) killed++; }
      // FO2 — a class twice
      { const g = goodO(); g.cards[5] = ocard('at', 'hat'); const { r } = await faceFindings(page, O, faceFrom(O, g), 'G1-346-gate-poison-FO2', en); if (judge('FO2', r.verify, /card 6: class "at" already on the page/)) killed++; }
      // FO3 — a ruling with text
      { const t = mutated(O, goodO(), (h) => h.replace('</svg></div><div data-lcs-ruling-row="2"', '<text x="10" y="40" font-size="20">hat</text></svg></div><div data-lcs-ruling-row="2"')); const r = await renderFace(page, t, { baseName: 'G1-346-gate-poison-FO3' }); if (judge('FO3', r.verify, /card 1: ruling 1: the writing row is not empty/)) killed++; }
      // FO4 — a productive:false anchor (synthetic bank)
      { const b = clone(en); b.classes.find((c) => c.id === 'at').members[0].productive = false; const { own } = await faceFindings(page, O, faceFrom(O, goodO()), 'G1-346-gate-poison-FO4', b); const a = judge('FO4 node', own, /anchor "cat" is productive:false/); const drew = planOf(O, b, { unit: 'at', seed: 'fo4' }).cards.some((x) => x.anchor.vocabKey === 'cat'); poisonLog.push('  FO4 plan: ' + (drew ? 'DRAWS cat although productive:false (WRONG)' : 'never draws a productive:false anchor (control)')); if (a && !drew) killed++; }
      // FO5 — a sameSpelling:false anchor (key) on the write face
      { const g = goodO(); g.cards[4] = ocard('ee', 'key'); const { own } = await faceFindings(page, O, faceFrom(O, g), 'G1-346-gate-poison-FO5', en); if (judge('FO5', own, /anchor "key" is sameSpelling:false on a WRITE face/)) killed++; }
      // FM — the base page stamped data-lcs-mode="judge": verify dispatches to the face and fails
      { const good = TYPE._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('fm') }); const t = Object.assign({}, TYPE, { build() { const out = clone(good); out.bodyHtml = out.bodyHtml.replace('data-lcs-rhyming ', 'data-lcs-rhyming data-lcs-mode="judge" '); return out; } }); const r = await renderWith(page, t, { difficulty: 2, baseName: 'G1-309-gate-poison-FM' }); const a = judge('FM verify', r.verify, /0 cards ≠ stamp|judge band "G1" is not K|a face root carries the base rows stamp/); const before = fails.length; assertRender('FM', r, TYPE.difficulty[2], en); const own = fails.splice(before); const b = judge('FM gate', own, /the BASE page carries data-lcs-mode="judge"/); if (a && b) killed++; }
      // FL — an unauthored locale refuses on every face
      { const msgs = []; for (const f of FACES) { try { f.spec.build({ theme: null, difficulty: 2, locale: 'xx' }, { rng: makeRng('fl') }); msgs.push(f.id + ': built'); } catch (e) { msgs.push(f.id + ': ' + e.message); } } if (judge('FL', msgs.every((m) => /has no xx block/.test(m)) ? msgs : [], /has no xx block/, msgs.filter((m) => !/has no xx block/.test(m)).join(' | ') || 'all five refuse')) killed++; }
    }

    console.log('poison:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons killed ${killed}/${TOTAL}`);
    console.log('renders: ' + pngs.map((p) => path.basename(p)).join(' '));
  } finally {
    await browser.close();
  }
  if (fails.length) console.log('FAILS:\n' + fails.join('\n'));
  console.log(fails.length ? `FAIL (${assertions} assertions, ${fails.length} failed, ${killed}/${TOTAL} poisons killed)` : `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed)`);
  process.exit(fails.length ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, OPENED, crossCheck };
