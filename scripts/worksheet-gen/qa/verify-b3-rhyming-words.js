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
    if (!(ref in OPENED)) push(tag(`picture ${ref} was never OPENED by the build (the human open is the gate)`));
    else if (OPENED[ref] !== m.vocabKey) push(tag(`picture ${ref} was opened and is NOT an honest "${m.vocabKey}" (opened as: ${OPENED[ref] || 'refused'})`));
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
    return { rows, icons, stamp: root ? { rows: +root.dataset.lcsRows, choices: +root.dataset.lcsChoices, band: root.dataset.lcsBand, unit: root.dataset.lcsUnit || null, minIcon: +root.dataset.lcsMinIcon } : null,
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
  const TOTAL = 23;
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
      try { TYPE.build({ theme: null, difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { msg = e.message; }
      if (judge('PL', msg ? [msg] : [], /has no de block/)) killed++;
    }

    // 3. seed sweep (build only)
    if (!QUICK) {
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
