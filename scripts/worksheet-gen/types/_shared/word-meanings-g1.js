/**
 * word-meanings-g1.js — four Grade 1 pages for two lessons of the unit "Word Meanings and Word Parts" (English literacy
 * year, Daily Teaching System Part 12.3, 2026-11-18). The bank is data/literacy/word-meanings-g1.en.json. The unit comes
 * after "Long Vowels: Silent e and Vowel Teams" and "Words in Sentences: Grammar" (yesterday, today, tomorrow), so the
 * endings pages may use short vowels, digraphs, blends, silent e, the vowel teams ai ay ee ea oa ow, and the sight words
 * of the year; every sentence word is on a closed reading list of the bank.
 *
 * Lesson "A duck is a bird that swims: words by category" (L.1.5.b)
 *   sort    G1-608 Words by Category: Cut and Sort (day 1)
 *           boxes to glue in, one per category, headed by its word (Birds, Fish, Insects, Fruits, Vegetables, Toys,
 *           Tools), and at the foot of the page cards to cut out, each a picture with its word under it, in rows that share
 *           their cut lines; every card belongs to exactly ONE category of the page; no two pictures of one kind. Every
 *           glue box holds all its cards with 30 px between two cards and from a card to every edge (measured).
 *     level 1  two categories that are siblings (birds and fish, birds and insects, fish and insects, fruits and
 *              vegetables, toys and tools), six cards, three of each; the boxes one under the other, head on top
 *     level 2  birds, fish, and insects: nine cards, three of each; the head at the left of each box
 *     level 3  birds, fish, and insects with the key attribute under each head (Birds have feathers. Fish have fins.
 *              Insects have six legs.): eight cards that belong (three, three, two) and two that fit no box (two of a bat,
 *              a spider, a snail, a worm, a frog, a starfish: each fails the line of the box it looks like); the child puts
 *              an X on them. Only insect pictures that show four legs or more (never the butterfly or the dragonfly).
 *           Cards stand in no pattern: no three of one category in a row, no column of one category, rows not all alike;
 *           the word lengths of every two categories overlap (the sort is never done by length). The fish cards hold at
 *           most two names that end in fish, and a shark or a tuna. The key writes the words in their boxes "(any order)".
 *   define  G1-609 A Duck Is a Bird That Swims: Define Words (day 2)
 *     levels 1 and 2  task 1: three frames "A shark is ___ / that has rows of sharp teeth." with a picture of the
 *              thing: the child writes its category (with its article) from a word box ("a bird", "a fish", "an insect");
 *              level 1 two categories, level 2 three; task 2: two frames "A bee is an insect that ..." with three
 *              attributes to choose from: the child circles the one that finishes it; the two wrong ones are attributes
 *              of things of OTHER categories, and the bank records every thing each attribute is true of, or might be
 *              argued about, and for an attribute that joins facts (swims but cannot fly) every thing each PART is true
 *              of, so a wrong one is never true of the thing, not even in part
 *     level 3  a box of the seven categories and two frames "A carrot is ___ / that ___ / ___" (rows of 104 px): the
 *              child writes the category and something special (the key: a sample, with the other right answers named)
 *           The duck of the title never stands on the page; print-only pictures (the robin, a European robin) never
 *           stand in a frame.
 *
 * Lesson "Endings -s, -ed, and -ing" (RF.1.3.f)
 *   add     G1-610 Add -s, -ed, and -ing (day 1)
 *           task 1: six printed words in a grid of three columns: the child circles the base word in each, as the line
 *           shows in a grey worked example ((help)ing; help is never an item); the key's ring ends after the last letter
 *           of the base word; task 2: a table headed -s (levels 2 and 3: -s or -es), -ed, -ing: under each base word the
 *           child writes its three forms on 89 px rows (the key's answers fit their cells, measured)
 *     level 1  six words with endings; three base words that add -s, -ed, -ing with no change, after a worked first row
 *              in grey, and "Read your new words to a partner."
 *     level 2  five words with endings and one with no ending to cross out (king, sled, shed); four base words, one or
 *              more that add -es (wish, wishes)
 *     level 3  four words with endings and two with no ending; four base words: one that doubles its last letter (nap,
 *              napped, napping), one that drops its silent e (wave, waved, waving), and two that change nothing; the rule
 *              is the page instruction (one short vowel and one consonant at the end; hop and bake, its examples, are never
 *              items) and is true of every word the page prints (no base that ends in x, w, or y)
 *   fits    G1-611 Which Ending Fits? -s, -ed, or -ing (day 2)
 *           a rule box under the instruction names the clue words the level uses (CUES): a number word asks for -s or
 *           -es, yesterday or last week for -ed, is or are (level 3: am) for -ing
 *     level 1  task 1: four sentences with the three forms of one base word in the gap: the child circles the one that
 *              fits (every sentence is judged against every form of its base, the base word too); task 2: four sentences
 *              with a row in the gap and the base word in a box: the child writes the form that fits; base words that
 *              change nothing
 *     level 2  five sentences and four to write, -es words among them, and one or more the child WRITES with -es (Kate
 *              made three wishes.)
 *     level 3  three starters (Yesterday I / Now I am / I can see two), two rows each, under two boxes: six action words
 *              for the -ed and the -ing starter, six naming words (one or more that add -es) for the -s starter: the child
 *              finishes each sentence with a word from the box and its ending (the key: a sample made from a word of the
 *              box, and "any word from the box" with its ending is right)
 *           The right form stands at no fixed place (never three in a row at one place, never a staircase) and is the
 *           longest of its three in at most half of the sentences; the forms asked for are mixed (never three alike in
 *           a row).
 *
 * Handwriting rows are 89 px (half an inch) or more. Ligatures are off, and an f before i, f, l, or t and a t before t get
 * room of their own. The instruction of each level is INSTR (registered as strings; verify() reads it on the page); its
 * example words never stand on any level of that page type. No block leaves a band of more than 40 px, measured both
 * between its parts and as the blank a reader sees (the union of everything printed). No word of the bank's banned list
 * stands in any text of the four types. English only; themeless: a copy draws other words. PDF only (the key is for
 * checks and review). The bank is checked when this file loads (wmFaultsOf), including that every level can draw its pages.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const BANK = require('../../data/literacy/word-meanings-g1.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, rowSvg } = _parts;
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const ROW = 89;                                     // every handwriting row (half an inch from the top rule to the baseline)
const ROW_FLOOR = 89;                               // the lowest writing row a page may print (half an inch; the reviews' rule, not the constant above)
const BAND = 40;                                    // the widest blank band allowed between two parts of the page (CSS px)
const GLUE = 30;                                    // the room a glue box keeps between two glued cards and from a card to each of its edges
const INNER = W - 24;                               // the width inside a task card (padding 12 on each side)
const MODES = ['sort', 'define', 'add', 'fits'];
const COLS = [199, 219, 237];                       // the -s, -ed, -ing columns of the table (with two gaps of 4 and the card's padding of 6: W - 12)
const FIT_ROW = 230;                                // the row in a sentence of G1-611 (level 1 and 2 writing task)
const DEF_ROW = 336;                                // the row for the category in a frame of G1-609 ("a vegetable" fits)

/** the advance widths (em) of Nunito 700 with its joined letters off (measured 2026-11-17, sentences-k.js); a letter not
 *  measured counts wide */
const NUNITO700 = { a: 0.547, b: 0.6, c: 0.4625, d: 0.6, e: 0.542, f: 0.3422, g: 0.604, h: 0.585, i: 0.255, j: 0.259, k: 0.536, l: 0.319, m: 0.877,
  n: 0.585, o: 0.576, p: 0.6, q: 0.6, r: 0.392, s: 0.488, t: 0.3574, u: 0.579, v: 0.565, w: 0.891, x: 0.546, y: 0.564, z: 0.474, A: 0.744, B: 0.688,
  C: 0.6582, D: 0.762, E: 0.597, F: 0.562, G: 0.736, H: 0.773, I: 0.282, J: 0.335, K: 0.665, L: 0.562, M: 0.868, N: 0.748, O: 0.785, P: 0.652,
  Q: 0.785, R: 0.686, S: 0.631, T: 0.6334, U: 0.738, V: 0.713, W: 1.113, X: 0.672, Y: 0.6228, Z: 0.605, ' ': 0.271, '.': 0.27, '?': 0.47, "'": 0.22, '’': 0.22, ',': 0.27, ':': 0.27, '-': 0.33 };
const emOf = (t) => [...String(t)].reduce((a, c) => a + (NUNITO700[c] || (/[0-9]/.test(c) ? 0.56 : 0.9)), 0);
/** the font size of a key's answer seated on an 89 px row (lib/key-on-row.js: its x-height fills the row's band) */
/** the size seatOnRow writes a key's answer at in a row of height h (as it computes it) */
const keyPxAt = (h) => { const { rulesOf } = require('../../lib/key-on-row.js'); const m = require('../../primitives/font-metrics.json')['nunito-700']; const r = rulesOf(rowSvg(200, h)); return Math.round(((r.base - r.mid) / m.xHeight) * 2) / 2; };
const KEY_PX = keyPxAt(ROW);
/** a key's answer fits a row of width w with 8 px on each side (the widths of NUNITO700 run up to 4 % short of the
 *  rendered ones, measured: hence 1.05) */
const fitsRow = (text, w, h = ROW) => emOf(text) * (h === ROW ? KEY_PX : keyPxAt(h)) * 1.05 <= w - 16;

/** the page instruction of every level (registered as strings with add-strings.js; verify() reads it on the page) */
const INSTR = {
  sort: { 1: 'A category is a group of things that are alike. Dogs and cats are pets.', 2: 'A category is a group of things that are alike. Dogs and cats are pets.', 3: 'A category is a group of things that are alike. Read what the things in each box have.' },
  define: { 1: 'Say what kind of thing it is and what makes it special.', 2: 'Say what kind of thing it is and what makes it special.', 3: 'Say what kind of thing it is and what makes it special.' },
  add: { 1: 'An ending changes a word: help, helps, helped, helping.', 2: 'Most words add -s. After s, x, sh, or ch, add -es: dress, dresses.', 3: 'Before -ed or -ing, a word with one short vowel and one consonant at the end doubles that consonant (hop, hopping), and a word with silent e drops the e (bake, baking).' },
  fits: { 1: 'The clue words tell which ending fits.', 2: 'The clue words tell which ending fits.', 3: 'The clue words tell which ending fits.' },
};
/** the rule box of G1-611 (each level names only the clue words it uses; the instruction above is the short line that
 *  keeps the page description in its band) */
const CUES = {
  1: 'Yesterday or last week tells -ed. Is or are tells -ing. Two, three, or six tells -s: more than one.',
  2: 'Yesterday or last week tells -ed. Is or are tells -ing. Two, three, or six tells -s or -es: more than one.',
  3: 'Yesterday tells -ed. Am tells -ing. Two tells -s or -es: more than one.',
};
/** the task lines */
const LINES = {
  sort: 'Cut out the cards. Glue each card in the box of its category.',
  sort3: 'Two cards do not fit any box: put an X on them. Cut out the other cards. Glue each one in the box of its category.',
  cut: 'Cut out the cards.',
  frame: 'Write what kind of thing it is. Use the words in the box.',
  choose: 'Read each sentence. Circle the words that finish it.',
  write: 'Write what kind of thing it is and something special about it.',
  base1: 'Read each word. Circle the base word inside it, like helping.',
  base2: 'Read each word. Circle the base word inside it, like helping. One word has no ending: cross it out.',
  base3: 'Read each word. Circle the base word inside it, like helping. Two words have no ending: cross them out.',
  table1: 'Write each word with -s, -ed, and -ing. The first row is done for you. Read your new words to a partner.',
  table: 'Write each word with -s or -es, -ed, and -ing.',
  fit: 'Read each sentence. Circle the word that fits.',
  fitwrite: 'Write the word that fits. Add an ending to the word in the box.',
  own: 'Finish each sentence. Use a word from the box and add the ending that fits.',
};
/** the column heads of the table */
const HEADS = { 1: ['-s', '-ed', '-ing'], 2: ['-s or -es', '-ed', '-ing'], 3: ['-s or -es', '-ed', '-ing'] };
const FORMS = ['s', 'ed', 'ing'];

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
const LEVELS = {
  sort: {
    1: { cats: 2, per: [3, 3], odd: 0, cardW: 150, cardH: 116, pic: 76, word: 24, layout: 'wide', gridCols: 3, pad: 8 },
    2: { cats: 3, per: [3, 3, 3], odd: 0, cardW: 122, cardH: 86, pic: 60, word: 20, layout: 'stack', gridCols: 5, pad: 6 },
    3: { cats: 3, per: [3, 3, 2], odd: 2, cardW: 122, cardH: 86, pic: 60, word: 20, layout: 'stack', gridCols: 5, lines: true, legs: 4, pad: 6 },
  },
  define: {
    1: { cats: 2, frames: [2, 1], choose: 2, wrong: 'other', pic: 72, font: 23, pad: 8 },
    2: { cats: 3, frames: [1, 1, 1], choose: 2, wrong: 'other', pic: 72, font: 23, pad: 8 },
    3: { cats: 0, frames: [], choose: 0, write: 2, pic: 72, font: 23, rowH: 104, pad: 8 },
  },
  add: {
    1: { words: 6, cross: 0, rows: 3, worked: true, es: false, change: false, wfont: 30, pad: 8 },
    2: { words: 6, cross: 1, rows: 4, es: true, change: false, wfont: 30, pad: 8 },
    3: { words: 6, cross: 2, rows: 4, es: false, change: true, wfont: 30, pad: 8 },
  },
  fits: {
    1: { circle: 4, write: 4, es: false, change: false, font: 21, pad: 6 },
    2: { circle: 5, write: 4, es: true, change: false, font: 21, pad: 6 },
    3: { circle: 0, own: 3, es: false, change: false, font: 21, pad: 6 },
  },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
const WL = (s) => s.split(/\s+/).filter(Boolean);
const tokens = (t) => (String(t).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || []);
const articleOf = (w) => (/^[aeiou]/i.test(w) ? 'An' : 'A');
/** the subject of a frame: "A shark", "An owl"; a word American English uses without an article stands bare ("Celery") */
const subjOf = (w) => (BANK.things[w] && BANK.things[w].mass ? w[0].toUpperCase() + w.slice(1) : `${articleOf(w)} ${w}`);
/** past forms the year has not taught as -ed: a base with one of these never stands on a page */
const IRREGULAR = new Set(WL('run sit swim get dig win hit cut put set let shut make take ride bite hide slide drive write eat read sing ring bring think ' +
  'sleep keep feel meet sweep teach catch buy fly go see say tell sell fall grow blow throw know draw dive leap dream spell smell spill kneel light hang ' +
  'stick swing sting spin begin drink sink stink shrink give come find hold stand lose shoot fight feed lead bleed speed hear wear tear bear break speak ' +
  'steal wake freeze choose rise shake forget sweep spend send lend bend build'));
/** a base's kind from its spelling: double = one vowel letter and one final consonant (not w, x, y); dropE = silent e;
 *  es = ends in s, x, sh, ch; plain otherwise */
function kindBySpelling(b) {
  if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(b)) return 'double';
  if (/[^aeiou]e$/.test(b) && /[aeiou]/.test(b.slice(0, -1))) return 'dropE';
  if (/(s|x|sh|ch|z)$/.test(b)) return 'es';
  return 'plain';
}
const formsOf = (b) => { const x = BANK.bases[b]; return x ? [x.s, x.ed, x.ing] : []; };
/** the form a base takes for an ending */
const formOf = (b, f) => BANK.bases[b][f];
/** a base may stand on a level-3 page of G1-610 (the doubling rule printed there is true of it) */
const okForRule = (b) => !/[wxy]$/.test(b);
/** the three forms of a base fit the three columns of the table at the key's size */
const fitsTable = (b) => formsOf(b).every((f, c) => fitsRow(f, COLS[c]));
/** places of the right answer among k: every place used where n allows, never three in a row, never a staircase of
 *  three, never strictly alternating */
function placesOk(p, k) {
  const n = p.length, s = p.join('');
  const need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
  if (new Set(p).size < need) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
  if (/01010|10101/.test(s) || (n >= 4 && /^(01)+0?$|^(10)+1?$/.test(s))) return false;
  return true;
}
function mixedPlaces(n, k, rng) { for (let t = 0; t < 3000; t++) { const p = Array.from({ length: n }, () => rng.int(0, k - 1)); if (placesOk(p, k)) return p; } throw new Error('no mixed places'); }
/** a sequence of kinds (letters) with no three alike in a row and, with two kinds, not every other one */
const kindsOk = (s) => !/(.)\1\1/.test(s) && !(new Set(s).size === 2 && s.length >= 4 && /^(..)\1+.?$/.test(s) && s[0] !== s[1]);
/** a wrong attribute for a thing: false of it, nobody would argue (the thing is in neither list of the phrase), and no part
 *  of it is true of the thing ("crows in the morning" for a hen; "swims but cannot fly" for a swan: each part has its list) */
const wrongFor = (b, w, phrase) => { const f = b.facts[phrase]; return !!f && !(f.yes || []).includes(w) && !(f.unsure || []).includes(w) && (f.parts || []).every((p) => !((b.traits || {})[p] || []).includes(w)); };
/** an attribute that joins two facts (and, but, a list) */
const joins = (phrase) => / (and|but) |, \w+, and /.test(phrase);
/** the glue room of a box: n cards of w x h fit with GLUE between two cards and from a card to every edge */
const glueFits = (n, w, h, bw, bh) => { for (let k = 1; k <= n; k++) { const rows = Math.ceil(n / k); if (k * w + (k + 1) * GLUE <= bw && rows * h + (rows + 1) * GLUE <= bh) return true; } return false; };
/** the clue of a sentence of G1-611 (what decides its form) */
const NUMBER = /\b(two|three|six)\b( (big|good|loud))? ___/;
const clueOk = (s) => (s.form === 'ed' ? /^(Yesterday|Last week) /.test(s.text) && !/\b(is|are|am) ___/.test(s.text)
  : s.form === 'ing' ? /^Now /.test(s.text) && /\b(is|are|am) ___ \S/.test(s.text)
    : NUMBER.test(s.text) && !/\b(is|are|am) ___/.test(s.text));

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function wmFaultsOf(b) {
  const f = [];
  const bad = new Set(b.bad || []);
  if (bad.size < 10) f.push('no list of words a page may never print');
  // categories: a head word, the category with its right article, the key attribute of the three animal categories
  const C = b.cats || {};
  for (const [k, c] of Object.entries(C)) {
    if (!c.head || !c.a || !new RegExp(`^(a|an) ${k}$`).test(c.a) || (c.a.startsWith('an ') !== /^[aeiou]/.test(k))) f.push(`category "${k}": no head or no article`);
  }
  for (const k of ['bird', 'fish', 'insect']) if (!C[k] || !/^[A-Z][a-z]+ have [a-z ]+\.$/.test(C[k].line || '')) f.push(`category "${k}": no key attribute line`);
  for (const p of [...(b.pairs || []), ...(b.triples || [])]) if (p.some((k) => !C[k]) || new Set(p).size !== p.length) f.push(`the category set ${p} is not a set of categories`);
  if ((b.pairs || []).length < 4 || !(b.triples || []).length) f.push('fewer than four pairs of categories or no triple');
  // the things: a category, a colour picture, a kind; the word fits its card at every level
  const TH = b.things || {}, OD = b.odd || {};
  for (const [w, x] of Object.entries(TH)) {
    if (!C[x.cat]) f.push(`"${w}": no category`);
    if (!Array.isArray(x.pic) || x.pic.length !== 2 || /bw( ?\d+)?$/i.test(x.pic[0]) || /\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)\s*\d*$/i.test(x.pic[0])) f.push(`"${w}": not a colour picture`);
    if (!x.kind) f.push(`"${w}": no kind`);
    if (bad.has(w) || OD[w]) f.push(`"${w}" is a word never to print, or also a card that fits no box`);
    if ((b.say.sort || []).includes(w)) f.push(`"${w}" is an example of the instruction`);
  }
  for (const c of Object.keys(C)) {
    const fit = Object.entries(TH).filter(([w, x]) => x.cat === c && cardFits(w, LEVELS.sort[2]));
    if (fit.length < 6) f.push(`category "${c}": fewer than six things whose word fits a small card`);
  }
  for (const [w, x] of Object.entries(OD)) {
    if (!Array.isArray(x.pic) || x.pic.length !== 2 || !x.kind || !['bird', 'fish', 'insect'].includes(x.looks) || !x.why) f.push(`the card "${w}" that fits no box: no picture, kind, look, or reason`);
    if (!cardFits(w, LEVELS.sort[3])) f.push(`the card "${w}": its word does not fit its card`);
  }
  if (new Set(Object.values(OD).map((x) => x.looks)).size < 3) f.push('the cards that fit no box do not look like all three categories');
  // attributes: every phrase names things of the bank; every thing of G1-609 has a main attribute true of it, a sample,
  // and enough wrong attributes of other and of the same category
  const F = b.facts || {};
  for (const [p, x] of Object.entries(F)) {
    if (!/^[a-z][a-z ,]+$/.test(p) || !(x.yes || []).length) f.push(`the attribute "${p}" names nothing`);
    for (const w of [...(x.yes || []), ...(x.unsure || [])]) if (!TH[w] && !OD[w]) f.push(`the attribute "${p}" names "${w}", no thing of the bank`);
    if ((x.yes || []).some((w) => (x.unsure || []).includes(w))) f.push(`the attribute "${p}" is both true and argued for one thing`);
    // an attribute that joins two facts lists the things each part is true of (a wrong choice never holds a true part)
    if (joins(p) && (!Array.isArray(x.parts) || x.parts.length < 2)) f.push(`the attribute "${p}" joins two facts but lists no parts`);
    for (const q of x.parts || []) { if (!Array.isArray((b.traits || {})[q])) f.push(`the attribute "${p}": its part "${q}" has no list`); else if ((x.yes || []).some((w) => !b.traits[q].includes(w))) f.push(`the attribute "${p}": its part "${q}" is not true of a thing the whole is true of`); }
  }
  for (const [q, ws] of Object.entries(b.traits || {})) for (const w of ws) if (!TH[w] && !OD[w]) f.push(`the part "${q}" names "${w}", no thing of the bank`);
  const DEF = Object.entries(TH).filter(([, x]) => x.main);
  if (DEF.length < 30) f.push('fewer than thirty things to define');
  for (const [w, x] of DEF) {
    if (x.printOnly) f.push(`"${w}" is a print-only picture in a frame`);
    if ((b.say.define || []).includes(w)) f.push(`"${w}" is the example of the title`);
    if (!F[x.main] || !(F[x.main].yes || []).includes(w)) f.push(`"${w}": its attribute "${x.main}" is not recorded as true of it`);
    if (!x.sample || !x.also) f.push(`"${w}": no sample attribute`);
    const other = DEF.filter(([v, y]) => y.cat !== x.cat && y.main !== x.main && wrongFor(b, w, y.main));
    if (other.length < 4) f.push(`"${w}": fewer than four wrong attributes of other categories`);
    const lineW = 72 + 12 + emOf(`${subjOf(w)} is`) * LEVELS.define[1].font * 1.04 + 10 + DEF_ROW;
    if (lineW > INNER - 24) f.push(`"${w}": its frame does not fit one line (${Math.round(lineW)} px)`);
    if (emOf(`that ${x.main}.`) * LEVELS.define[1].font * 1.04 > INNER - 120) f.push(`"${w}": its attribute line is too long`);
  }
  // the sort page level 3 shows only insect pictures with four legs or more in view (it says: Insects have six legs.)
  if (Object.entries(TH).filter(([, x]) => x.cat === 'insect' && (x.legs || 0) >= LEVELS.sort[3].legs).length < 4) f.push('fewer than four insect pictures that show their legs');
  if (Object.entries(TH).some(([, x]) => x.cat === 'insect' && typeof x.legs !== 'number')) f.push('an insect picture with no count of the legs it shows');
  // the fish cards: shark or tuna among them, at most two -fish names (draw checks it per page)
  if (!['shark', 'tuna'].every((w) => TH[w] && TH[w].cat === 'fish')) f.push('no shark and tuna among the fish');
  // the endings: forms follow the spelling rule of their kind; no base has an irregular past; no form is a word never to print
  const B = b.bases || {}, allForms = new Map();
  for (const [w, x] of Object.entries(B)) {
    if (IRREGULAR.has(w)) f.push(`"${w}" has an irregular past`);
    if (!['plain', 'es', 'double', 'dropE'].includes(x.kind) || kindBySpelling(w) !== x.kind) f.push(`"${w}": its kind "${x.kind}" is not the kind its spelling asks for (${kindBySpelling(w)})`);
    const want = x.kind === 'plain' ? [w + 's', w + 'ed', w + 'ing'] : x.kind === 'es' ? [w + 'es', w + 'ed', w + 'ing']
      : x.kind === 'double' ? [w + 's', w + w.slice(-1) + 'ed', w + w.slice(-1) + 'ing'] : [w + 's', w + 'd', w.slice(0, -1) + 'ing'];
    if ([x.s, x.ed, x.ing].join() !== want.join()) f.push(`"${w}": its forms are not ${want.join(', ')}`);
    for (const v of [w, x.s, x.ed, x.ing]) { if (bad.has(v)) f.push(`"${v}" is a word never to print`); if (allForms.has(v) && allForms.get(v) !== w) f.push(`"${v}" is a form of two base words`); allForms.set(v, w); }
  }
  for (const k of ['plain', 'es', 'double', 'dropE']) {
    const tab = Object.keys(B).filter((w) => B[w].kind === k && fitsTable(w) && !(Object.values(b.say.add || {}).flat()).includes(w));
    if (tab.length < (k === 'plain' ? 12 : 4)) f.push(`fewer than ${k === 'plain' ? 12 : 4} base words of kind ${k} fit the table`);
  }
  for (const w of b.noEnding || []) {
    if (allForms.has(w) || !/(s|ed|ing)$/.test(w) || bad.has(w)) f.push(`"${w}" is no word with letters like an ending and no ending`);
  }
  // the sentences of G1-611: one gap; a base word of the bank; its level fits the kind of the base; the clue that decides
  // the form; every other word on the reading list; no other form of its base printed
  const read = new Set([...(b.read || []), ...(b.names || []).map((x) => x.toLowerCase())]);
  const ss = b.sentences || [];
  const seen = new Set();
  for (const s of ss) {
    const x = B[s.base];
    if (!x || !FORMS.includes(s.form) || s.text.split('___').length !== 2 || !/^[A-Z].*\.$/.test(s.text)) { f.push(`"${s.text}": no sentence with one gap for a base word`); continue; }
    if (seen.has(s.text)) f.push(`"${s.text}" stands twice`); seen.add(s.text);
    const lvOk = x.kind === 'plain' ? s.lv.every((l) => l <= 2) : x.kind === 'es' ? s.lv.join() === '2' : s.lv.join() === '3';
    if (!lvOk) f.push(`"${s.text}": its levels do not fit a base word of kind ${x.kind}`);
    if (!clueOk(s)) f.push(`"${s.text}": no clue that asks for -${s.form}`);
    tokens(s.text.replace('___', ' ')).forEach((t) => {
      if (!read.has(t)) f.push(`"${t}" in "${s.text}" is not on the reading list`);
      if (bad.has(t)) f.push(`"${t}" is a word never to print`);
      if (allForms.get(t) === s.base) f.push(`"${s.text}" prints a form of its own base word`);
    });
    const [pre, post] = s.text.split('___');
    const circleW = 30 + emOf(pre + post) * 21 * 1.04 + formsOf(s.base).reduce((a, v) => a + emOf(v) * 21 + 32, 0);
    if (circleW > INNER - 24) f.push(`"${s.text}" does not fit one line with its three forms (${Math.round(circleW)} px)`);
    s.writeOk = 30 + emOf(s.base) * 21 + 36 + emOf(pre + post) * 22 * 1.04 + 30 + FIT_ROW <= INNER - 24 && fitsRow(formOf(s.base, s.form), FIT_ROW);
  }
  for (const lv of [1, 2, 3]) for (const fm of FORMS) {
    const n = ss.filter((s) => s.lv.includes(lv) && s.form === fm).length;
    if (n < (fm === 's' ? 10 : 14)) f.push(`G1-611 level ${lv}: fewer than ${fm === 's' ? 10 : 14} sentences that ask for -${fm}`);
  }
  { const O = b.own || {}, st = O.starters || [], ownW = INNER - Math.ceil(emOf('I can see two') * 22 * 1.1) - 10;
    if (st.map((o) => o.form).sort().join() !== 'ed,ing,s' || st.some((o) => !o.lead || !['verbs', 'nouns'].includes(o.box))) f.push('the starters of G1-611 level 3 do not ask for -s, -ed, and -ing from a box');
    for (const [v, [ed, ing]] of Object.entries(O.verbs || {})) { const x = B[v]; if (!x || x.kind !== 'plain' || IRREGULAR.has(v) || !ed.startsWith(x.ed + ' ') || !ing.startsWith(x.ing + ' ') || !fitsRow(ed, ownW) || !fitsRow(ing, ownW)) f.push(`the box word "${v}": no plain base word, or its samples do not start with its forms or do not fit the row`); }
    for (const [n, [pl, smp]] of Object.entries(O.nouns || {})) { const want = /(s|x|sh|ch)$/.test(n) ? n + 'es' : n + 's'; if (pl !== want || !smp.startsWith(pl + ' ') || !fitsRow(smp, ownW)) f.push(`the box word "${n}": its plural is not ${want}, or its sample does not start with it or fit the row`); }
    if (Object.keys(O.verbs || {}).length < 10 || Object.keys(O.nouns || {}).length < 10 || Object.keys(O.nouns || {}).filter((n) => /(s|x|sh|ch)$/.test(n)).length < 2) f.push('too few words for the boxes of G1-611 level 3'); }
  if (ss.filter((s) => s.lv.includes(2) && s.form === 's' && B[s.base].kind === 'es' && s.writeOk).length < 2) f.push('G1-611 level 2: fewer than two -es sentences that fit the writing task');
  // the examples of the instructions
  // every word of an instruction that is a base word, a form, or a word with no ending is kept off every level of its
  // page type; the instruction of G1-611 shows no word of the bank; the duck of G1-609 and the pets of G1-608 stay off
  { const sayAdd = new Set(Object.values(b.say.add || {}).flat());
    for (const lv of [1, 2, 3]) for (const t of tokens(INSTR.add[lv])) { const bs = allForms.get(t) || ((b.noEnding || []).includes(t) ? t : null); if (bs && !sayAdd.has(bs)) f.push(`the instruction of G1-610 level ${lv} shows "${t}", whose word is not kept off the page`); }
    if (!sayAdd.has('help') || !/help, helps, helped, helping/.test(INSTR.add[1])) f.push('the example of G1-610 level 1 is not kept off the page');
    for (const lv of [1, 2, 3]) for (const t of tokens(INSTR.fits[lv] + ' ' + CUES[lv])) if (allForms.has(t)) f.push(`the instruction of G1-611 shows "${t}", a word of the bank`);
    if (!(b.say.define || []).every((w) => TH[w]) || (b.say.sort || []).some((w) => TH[w])) f.push('the examples of the category pages are not kept off them'); }
  // the ban: no word never to print stands in any text of any of the four types
  { const texts = [...Object.values(INSTR).flatMap((x) => Object.values(x)), ...Object.values(CUES), ...Object.values(LINES), ...Object.values(HEADS).flat(),
      ...Object.values(C).flatMap((c) => [c.head, c.a, c.line || '', c.also || '']), ...Object.entries(TH).flatMap(([w, x]) => [w, x.main || '', x.sample || '', x.also || '']),
      ...Object.keys(OD), ...Object.keys(F), ...Object.values(B).flatMap((x) => [x.s, x.ed, x.ing]), ...Object.keys(B), ...(b.noEnding || []), ...ss.map((x) => x.text),
      ...((b.own || {}).starters || []).map((o) => o.lead), ...Object.values((b.own || {}).verbs || {}).flat(), ...Object.values((b.own || {}).nouns || {}).flat(), ...Object.keys((b.own || {}).verbs || {}), ...Object.keys((b.own || {}).nouns || {})];
    for (const t of texts) for (const k of tokens(t)) if (bad.has(k)) f.push(`"${k}" in "${t}" is a word never to print`); }
  if (f.length) return f;
  // every level can draw its pages: 60 seeded draws a level
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let k = 1; k <= 60; k++) {
    try { drawPage(b, mode, lv, makeRng(`wm-g1-check|${mode}|${lv}|${k}`)); } catch (e) { f.push(`${mode} level ${lv}: a page cannot be drawn (${e.message})`); break; }
  }
  return f;
}
/** the word of a card fits it (the card's padding 6 on each side; Nunito 800 is about 5 % wider than 700) */
function cardFits(w, d) { return emOf(w) * d.word * 1.06 <= d.cardW - 14; }

/* ---------------------------------------------------------------- drawing a page (data only) ---------------------------------------------------------------- */
function drawPage(b, mode, lv, rng) {
  let last;
  for (let k = 0; k < 60; k++) { try { return drawOnce(b, mode, lv, rng); } catch (e) { last = e; } }
  throw last;
}
/** n things of category c, none of a kind already on the page; print-only pictures counted against a limit */
function pickThings(b, c, n, rng, kinds, more = () => true, po = { n: 0, max: 2 }) {
  const out = [];
  for (const [w, x] of shuffle(Object.entries(b.things), rng)) {
    if (out.length === n) break;
    if (x.cat !== c || kinds.has(x.kind) || !more(w, x)) continue;
    if (x.printOnly && po.n >= po.max) continue;
    out.push(w); kinds.add(x.kind); if (x.printOnly) po.n++;
  }
  if (out.length < n) throw new Error(`too few things of ${c}`);
  return out;
}
/** the word lengths of every two categories overlap (a sort is never done by length) */
function lengthsOverlap(groups) {
  const ls = groups.map((g) => g.map((w) => w.length));
  for (let i = 0; i < ls.length; i++) for (let j = 0; j < ls.length; j++) if (i !== j && Math.max(...ls[i]) < Math.min(...ls[j])) return false;
  return true;
}
/** a grid of cards (rows of `cols`) with no pattern: no three of one kind in a row (reading order), no column of one kind
 *  (three rows or more), rows not all alike, every row of two kinds or more, the cards that fit no box apart */
function cardGridOk(kinds, cols) {
  const rows = []; for (let i = 0; i < kinds.length; i += cols) rows.push(kinds.slice(i, i + cols));
  if (kinds.some((x, i) => i >= 2 && x === kinds[i - 1] && x === kinds[i - 2])) return false;
  if (rows.every((r) => r.join() === rows[0].join())) return false;
  if (rows.some((r) => new Set(r).size < 2)) return false;
  if (rows.length >= 3) for (let c = 0; c < cols; c++) if (new Set(rows.map((r) => r[c])).size < 2) return false;
  if (rows.length === 2 && rows.every((r) => /^(\w+),(\w+),\1,\2$/.test(r.join()))) return false;
  const odd = kinds.map((x, i) => (x === 'odd' ? i : -1)).filter((i) => i >= 0);
  if (odd.length === 2 && (Math.floor(odd[0] / cols) === Math.floor(odd[1] / cols) || odd[0] % cols === odd[1] % cols)) return false;
  return true;
}

function drawOnce(b, mode, lv, rng) {
  const d = LEVELS[mode][lv];
  const tasks = [], items = [];

  if (mode === 'sort') {
    const sets = lv === 1 ? b.pairs : b.triples;
    const cs = shuffle(sets[rng.int(0, sets.length - 1)], rng);
    const counts = shuffle(d.per, rng);
    const kinds = new Set(), po = { n: 0, max: 2 };
    const say = new Set(b.say.sort || []);
    // level 3 says "Insects have six legs.": only insect pictures that show four legs or more
    const okCard = (w, x) => cardFits(w, d) && !say.has(w) && (!d.legs || x.cat !== 'insect' || (x.legs || 0) >= d.legs);
    const groups = cs.map((c, i) => pickThings(b, c, counts[i], rng, kinds, okCard, po));
    if (!lengthsOverlap(groups)) throw new Error('lengths do not overlap');
    // the fish cards: shark or tuna among them, and at most two names that end in fish
    { const fish = groups[cs.indexOf('fish')] || null; if (fish && (fish.filter((w) => /fish$/.test(w)).length > 2 || !fish.some((w) => w === 'shark' || w === 'tuna'))) throw new Error('fish cards'); }
    // level 3: two cards that fit no box, each looking like another category
    let odd = [];
    if (d.odd) {
      const looks = shuffle(['bird', 'fish', 'insect'], rng).slice(0, 2);
      odd = looks.map((lk) => shuffle(Object.keys(b.odd).filter((w) => b.odd[w].looks === lk && !kinds.has(b.odd[w].kind)), rng)[0]);
      if (odd.some((w) => !w)) throw new Error('no card that fits no box');
      odd.forEach((w) => kinds.add(b.odd[w].kind));
    }
    const all = [...groups.flatMap((g, i) => g.map((w) => ({ w, cat: cs[i] }))), ...odd.map((w) => ({ w, cat: 'odd' }))];
    let order = null;
    for (let k = 0; k < 600 && !order; k++) { const o = shuffle(all, rng); if (cardGridOk(o.map((x) => x.cat), d.gridCols)) order = o; }
    if (!order) throw new Error('no card grid without a pattern');
    tasks.push({ kind: 'sort', cats: cs, cards: order, odd });
    items.push(...order.map((x) => 'card:' + x.w));
  }

  if (mode === 'define') {
    const say = new Set(b.say.define || []);
    const def = (w) => !!b.things[w].main && !b.things[w].printOnly && !say.has(w);
    const kinds = new Set(), usedAttrs = new Set();
    let cs;
    if (d.cats) { const sets = lv === 1 ? b.pairs : b.triples; cs = shuffle(sets[rng.int(0, sets.length - 1)], rng); }
    else cs = shuffle(Object.keys(b.cats), rng);
    // task 1 (levels 1 and 2): frames whose category the child writes; their order is no order of the word box
    if (d.frames.length) {
      const counts = shuffle(d.frames, rng);
      const fr = shuffle(cs.flatMap((c, i) => pickThings(b, c, counts[i], rng, kinds, def)), rng);
      const cats = fr.map((w) => b.things[w].cat), box = shuffle(cs, rng);
      if (!kindsOk(cats.map((c) => 'abcdefg'[Object.keys(b.cats).indexOf(c)]).join(''))) throw new Error('categories in a pattern');
      if (cs.length === 3 && fr.length === 3 && (cats.join() === box.join() || cats.join() === box.slice().reverse().join())) throw new Error('frames in the order of the box');
      tasks.push({ kind: 'frame', items: fr, box });
      items.push(...fr.map((w) => 'frame:' + w));
    }
    // task 2 (levels 1 and 2): choose the attribute; the two wrong ones are attributes of things of other categories
    if (d.choose) {
      const n = d.choose, printed = new Set(tasks.flatMap((t) => (t.kind === 'frame' ? t.items.map((w) => b.things[w].main) : [])));
      const pool = d.cats ? cs : shuffle(Object.keys(b.cats), rng);
      const ch = [];
      for (const c of shuffle(pool, rng)) { if (ch.length === n) break; try { ch.push(...pickThings(b, c, 1, rng, kinds, def)); } catch (e) { /* next category */ } }
      if (ch.length < n) throw new Error('too few things to choose for');
      const at = mixedPlaces(n, 3, rng);
      const used = new Set(printed);
      const choose = ch.map((w, i) => {
        const x = b.things[w];
        const cand = shuffle(Object.entries(b.things).filter(([v, y]) => y.main && v !== w && y.main !== x.main && y.cat !== x.cat && wrongFor(b, w, y.main) && !used.has(y.main) && !ch.includes(v)), rng);
        const wrong = [];
        for (const [, y] of cand) { if (wrong.length === 2) break; if (!wrong.includes(y.main)) wrong.push(y.main); }
        if (wrong.length < 2) throw new Error('too few wrong attributes for ' + w);
        wrong.forEach((p) => used.add(p)); used.add(x.main);
        const opts = wrong.slice(); opts.splice(at[i], 0, x.main);
        if (optLines(opts) > 2) throw new Error('the attributes of ' + w + ' take three lines');
        return { w, right: x.main, opts };
      });
      // never by length: the right attribute is not the longest (nor the shortest) of its three in every sentence
      const longest = choose.filter((c) => c.opts.every((o) => o === c.right || o.length < c.right.length)).length;
      const shortest = choose.filter((c) => c.opts.every((o) => o === c.right || o.length > c.right.length)).length;
      if (longest > Math.floor(n / 2) || shortest > Math.floor(n / 2)) throw new Error('the right attribute found by length');
      if (new Set(at).size < 2) throw new Error('the right attribute at one place');
      tasks.push({ kind: 'choose', items: choose });
      choose.forEach((c) => c.opts.forEach((o) => usedAttrs.add(o)));
      items.push(...choose.map((c) => 'choose:' + c.w));
    }
    // level 3: two definitions the child writes (two categories; the sample fits its row)
    if (d.write) {
      const wr = [];
      for (const c of shuffle(Object.keys(b.cats), rng)) {
        if (wr.length === d.write) break;
        if (wr.some((w) => b.things[w].cat === c)) continue;
        try { wr.push(...pickThings(b, c, 1, rng, kinds, (w, x) => def(w) && !usedAttrs.has(x.main) && fitsRow(x.sample, defRow2W(), d.rowH) && fitsRow(b.cats[x.cat].a, defRow1W(w), d.rowH))); } catch (e) { /* next */ }
      }
      if (wr.length < d.write) throw new Error('too few things to write about');
      tasks.push({ kind: 'write', items: wr, box: shuffle(Object.keys(b.cats), rng) });
      items.push(...wr.map((w) => 'write:' + w));
    }
  }

  if (mode === 'add') {
    const say = new Set(Object.values(b.say.add).flat());
    const B = b.bases;
    const may = (w) => !say.has(w) && (!d.change || okForRule(w));
    // the table: level 1 a worked base and three plain bases; level 2 four bases with one or two -es; level 3 one that
    // doubles, one that drops its e, two that change nothing
    let table;
    const plain = shuffle(Object.keys(B).filter((w) => B[w].kind === 'plain' && fitsTable(w) && may(w)), rng);
    const es = shuffle(Object.keys(B).filter((w) => B[w].kind === 'es' && fitsTable(w) && may(w)), rng);
    const dbl = shuffle(Object.keys(B).filter((w) => B[w].kind === 'double' && fitsTable(w) && may(w)), rng);
    const dre = shuffle(Object.keys(B).filter((w) => B[w].kind === 'dropE' && fitsTable(w) && may(w)), rng);
    if (lv === 1) table = plain.slice(0, 4);
    else if (lv === 2) { const ne = rng.int(1, 2); table = shuffle([...es.slice(0, ne), ...plain.slice(0, 4 - ne)], rng); }
    else table = shuffle([dbl[0], dre[0], ...shuffle([...plain.slice(0, 3), ...es.slice(0, 1)], rng).slice(0, 2)], rng);
    if (table.length < 4 || table.some((w) => !w)) throw new Error('too few base words for the table');
    // task 1: words with endings (no base of the table), and words with no ending to cross out
    const nEnd = d.words - d.cross;
    const pool1 = shuffle(Object.keys(B).filter((w) => may(w) && !table.includes(w) && B[w].kind !== 'dropE' && (lv === 2 || B[w].kind !== 'es') && (lv === 3 || B[w].kind !== 'double')), rng);
    let words = null;
    for (let k = 0; k < 400 && !words; k++) {
      const bs = shuffle(pool1, rng).slice(0, nEnd);
      const ends = shuffle(Array.from({ length: nEnd }, (_, i) => FORMS[i % 3]), rng);
      const got = bs.map((w, i) => ({ w: B[w][ends[i]], base: w, end: ends[i] }));
      if (lv === 2 && !got.some((x) => B[x.base].kind === 'es' && x.end === 's')) continue;
      if (lv === 3 && !got.some((x) => B[x.base].kind === 'double' && x.end !== 's')) continue;
      if (lv === 1 && got.some((x) => B[x.base].kind !== 'plain')) continue;
      const cross = shuffle(b.noEnding.filter((w) => !say.has(w)), rng).slice(0, d.cross).map((w) => ({ w, base: null, end: null }));
      // no word with no ending shorter than every word with an ending (never found by length)
      const minEnd = Math.min(...got.map((x) => x.w.length));
      if (cross.some((x) => x.w.length < minEnd)) continue;
      const all = shuffle([...got, ...cross], rng);
      if (!kindsOk(all.map((x) => (x.end || 'n')[0]).join(''))) continue;
      if (d.cross === 2) { const ci = all.map((x, i) => (x.base ? -1 : i)).filter((i) => i >= 0); if (Math.floor(ci[0] / 3) === Math.floor(ci[1] / 3) || ci[0] % 3 === ci[1] % 3) continue; }
      words = all;
    }
    if (!words) throw new Error('no words for task 1');
    tasks.push({ kind: 'base', items: words });
    tasks.push({ kind: 'table', items: table, worked: !!d.worked });
    items.push(...words.map((x) => 'word:' + x.w), ...table.map((w, i) => (d.worked && !i ? 'worked:' : 'table:') + w));
  }

  if (mode === 'fits') {
    const B = b.bases;
    // every level: the rule box of the clue words the level uses
    tasks.push({ kind: 'cues', text: CUES[lv] });
    if (d.circle) {
      const lvOk = (s) => s.lv.includes(lv);
      const pool = shuffle(b.sentences.filter(lvOk), rng);
      const pickSents = (n, forms, used, need, more = () => true) => {
        const out = [];
        for (let i = 0; i < n; i++) {
          const s = pool.find((x) => x.form === forms[i] && !used.has(x.base) && more(x, i) && !out.includes(x));
          if (!s) return null;
          out.push(s); used.add(s.base);
        }
        return need(out) ? out : null;
      };
      let got = null;
      for (let k = 0; k < 400 && !got; k++) {
        const used = new Set();
        const shuf = shuffle(pool, rng); pool.splice(0, pool.length, ...shuf);
        const fc = Array.from({ length: d.circle }, () => FORMS[rng.int(0, 2)]);
        if (FORMS.some((x) => !fc.includes(x)) || !kindsOk(fc.map((x) => x[0]).join(''))) continue;
        const circ = pickSents(d.circle, fc, used, () => true);
        if (!circ) continue;
        let wr = [];
        if (d.write) {
          const fw = Array.from({ length: d.write }, () => FORMS[rng.int(0, 2)]);
          if (FORMS.some((x) => !fw.includes(x)) || !kindsOk(fw.map((x) => x[0]).join(''))) continue;
          // level 2: one sentence to write or more whose answer is an -es word (Kate made three wishes.)
          const esAt = d.es ? fw.indexOf('s') : -1;
          wr = pickSents(d.write, fw, used, () => true, (s, i) => s.writeOk && (i !== esAt || B[s.base].kind === 'es'));
          if (!wr) continue;
        }
        // no sentence prints a base word or form of another sentence of the page
        const all = [...circ, ...wr], allForms = new Set(all.flatMap((s) => [s.base, ...formsOf(s.base)]));
        if (all.some((s) => tokens(s.text.replace('___', ' ')).some((t) => allForms.has(t)))) continue;
        // the right form at no fixed place; never found by length
        const at = mixedPlaces(d.circle, 3, rng);
        const opts = circ.map((s, i) => { const o = shuffle(FORMS.filter((x) => x !== s.form), rng); o.splice(at[i], 0, s.form); return o.map((x) => B[s.base][x]); });
        const right = circ.map((s) => B[s.base][s.form]);
        const longest = circ.filter((s, i) => opts[i].every((o) => o === right[i] || o.length < right[i].length)).length;
        if (longest > Math.floor(d.circle / 2)) continue;
        got = { circ: circ.map((s, i) => ({ text: s.text, base: s.base, form: s.form, opts: opts[i] })), wr };
      }
      if (!got) throw new Error('no sentences');
      tasks.push({ kind: 'fit', items: got.circ });
      if (d.write) tasks.push({ kind: 'fitwrite', items: got.wr.map((s) => ({ text: s.text, base: s.base, form: s.form })) });
      items.push(...got.circ.map((s) => 'fit:' + s.text), ...got.wr.map((s) => 'fitwrite:' + s.text));
    }
    if (d.own) {
      // level 3: three starters; six action words for the -ed and -ing starters and six naming words (one or more that adds
      // -es) for the -s starter; the key's samples are made from words of the boxes (two different action words)
      const O = b.own, verbs = shuffle(Object.keys(O.verbs), rng).slice(0, 6);
      let nouns = null;
      for (let k = 0; k < 100 && !nouns; k++) { const n6 = shuffle(Object.keys(O.nouns), rng).slice(0, 6); if (n6.some((n) => /(s|x|sh|ch)$/.test(n)) && n6.filter((n) => !/(s|x|sh|ch)$/.test(n)).length >= 3) nouns = n6; }
      if (!nouns) throw new Error('no naming words');
      const sample = { ed: O.verbs[verbs[0]][0], ing: O.verbs[verbs[1]][1], s: O.nouns[nouns[0]][1] };
      tasks.push({ kind: 'own', starters: O.starters, verbs, nouns, sample });
      items.push(...verbs.map((v) => 'verb:' + v), ...nouns.map((n) => 'noun:' + n));
    }
  }
  return { mode, lv, tasks, items };
}
/** the lines three attributes to circle take beside a picture (pills of 20 px Nunito 800, padding and border 26 px, gap 8;
 *  the line about 540 px wide) */
function optLines(opts) { let lines = 1, x = 0; for (const o of opts) { const w = emOf(o) * 20 * 1.08 + 34; if (x && x + w > 530) { lines++; x = 0; } x += w; } return lines; }
/** the width of the row for the attribute in a written definition (level 3 of G1-609) */
function defRow2W() { return INNER - 24 - 72 - 12 - Math.ceil(emOf('that') * 23 * 1.04) - 10 - 16; }
/** the width of the row for the category in a written definition (level 3 of G1-609): the room its lead leaves */
function defRow1W(w) { return INNER - 24 - 72 - 12 - Math.ceil(emOf(`${subjOf(w)} is`) * 23 * 1.04) - 10 - 16; }

{ const f = wmFaultsOf(BANK); if (f.length) throw new Error('word-meanings-g1.en.json: ' + f.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks
/** In this font an f before i, f, l, or t and a t before t touch the next letter even with ligatures off: every such f or
 *  t gets a little room of its own (text in tags and <svg> is left alone; letter spans carry their own room) */
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? text : text.replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
/** the same room inside a writing row's svg text (a key's answer, a worked answer) */
function svgRoom(html) {
  return html.replace(/(<text\b[^>]*\bfont-size="([\d.]+)"[^>]*>)([^<]*)(<\/text>)/g, (m, open, fsz, body, close) => open + body.replace(/(?<=[ft])([iflt])/g, (c) => `<tspan dx="${(0.07 * +fsz).toFixed(2)}" data-lcs-fsep>${c}</tspan>`) + close);
}
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 20) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (k) => `<span style="color:${T.teal}">${k}.</span> `;
const picOf = (w) => (BANK.things[w] || BANK.odd[w]).pic;
const kindOf = (w) => (BANK.things[w] || BANK.odd[w]).kind;
const img = (w, size) => `<img class="ws-icon" data-lcs-pic="${attr(w)}" data-lcs-pickind="${attr(kindOf(w))}" src="${fileUri(picOf(w)[0], picOf(w)[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
/** the y of a writing row's base rule (its lowest horizontal rule) */
const baseOf = (w, h) => Math.max(...[...rowSvg(w, h).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]));
/** printed words that stand on a writing row's base rule beside it (Nunito, line-height 1: the baseline is 0.171 em
 *  above the box's foot) */
const onRow = (text, px, attrs = '') => `<span ${attrs} data-lcs-read style="flex:0 0 auto;padding-bottom:${Math.max(0, Math.round(ROW - baseOf(300, ROW) - 0.171 * px))}px;font:800 ${px}px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(text)}</span>`;
/** a writing row (the shape of info-text.js line()); the key's answer is seated with the letter widths of the page font
 *  (lib/key-on-row.js would squeeze a word it only guesses is too wide: it counts 0.56 em a letter) */
function row({ w, h = ROW, answer, sample }) {
  const base = rowSvg(w, h);
  const em = answer ? (emOf(answer) / [...String(answer)].length) * 1.05 : 0.56;
  const svg = answer ? seatOnRow(base, answer, { fill: T.teal, em }) : base;
  return `<div data-lcs-line${answer ? ` data-lcs-answer="${attr(answer)}"` : ''}${answer && sample ? ' data-lcs-key-sample="1"' : ''} style="line-height:0">${svg}</div>`;
}
/** a writing row with a worked answer in grey (level 1 of the table) */
function workedRow(w, text) {
  const s = seatOnRow(rowSvg(w, ROW), text, { fill: T.inkSoft, em: (emOf(text) / text.length) * 1.05 });
  return `<div data-lcs-line data-lcs-worked="${attr(text)}" style="line-height:0">${s}</div>`;
}
/** a word printed letter by letter: the base letters in a span the key rings, the ending after it; a word with no ending
 *  gets a line through it on the key */
function wordCell(x, font, key) {
  const room = (w, i) => ((w[i] === 'f' && /[iflt]/.test(w[i + 1] || '')) || (w[i] === 't' && w[i + 1] === 't') ? 'margin-right:0.07em;' : '');
  const letters = (s, off, w) => [...s].map((c, i) => `<span data-lcs-letter="${c}" style="display:inline-block;${room(w, off + i)}">${esc(c)}</span>`).join('');
  const w = x.w;
  const baseLen = x.base ? (w.startsWith(x.base) ? x.base.length : 0) : 0;
  const inner = x.base
    ? `<span data-lcs-base-letters style="position:relative;display:inline-flex">${letters(w.slice(0, baseLen), 0, w)}<span data-lcs-basering style="position:absolute;left:-8px;right:-1px;top:-7px;bottom:-9px;border:3px solid ${key ? T.teal : 'transparent'};border-radius:12px"></span></span>${letters(w.slice(baseLen), baseLen, w)}`
    : letters(w, 0, w) + (key ? `<span data-lcs-strike style="position:absolute;left:-6px;right:-6px;top:50%;height:4px;margin-top:-2px;border-radius:2px;background:${T.teal}"></span>` : '');
  return `<div data-lcs-bw="${attr(w)}"${x.base ? ` data-lcs-base="${attr(x.base)}" data-lcs-end="${x.end}"` : ' data-lcs-noend="1"'} style="display:flex;align-items:center;justify-content:center;height:62px;border-radius:10px;background:#FFFFFF">` +
    `<span data-lcs-read data-lcs-word="${attr(w)}" style="position:relative;display:inline-flex;font:800 ${font}px/1 'Nunito',sans-serif;color:${T.ink};letter-spacing:0.14em">${inner}</span></div>`;
}
const pill = (text, ok, px, key, attrs) => `<span ${attrs}${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;display:inline-block;white-space:nowrap;font:800 ${px}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 10px;margin:0 1px;border:3px solid ${key && ok ? T.teal : T.creamDeep};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;

/* ---------------------------------------------------------------- the blocks ---------------------------------------------------------------- */
function renderTasks(plan, mode, lv, d, key) {
  const blocks = [];
  let k = 0;
  for (const t of plan.tasks) {
    // the rule box of G1-611 is no task: it takes no number
    if (t.kind !== 'cues') k++;
    if (t.kind === 'sort') {
      const C = BANK.cats;
      // the boxes to glue in, one under the other, each holding its cards in one row with GLUE between two cards and from a
      // card to every edge: level 1 the head as a bar on top, levels 2 and 3 the head (and its line) at the left
      const keyWords = (c) => (key ? t.cards.filter((x) => x.cat === c).map((x) => `<span data-lcs-keyword="${attr(x.w)}" style="font:800 20px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(x.w)}</span>`).join('') +
        `<span data-lcs-anyorder style="grid-column:1 / -1;font:700 15px/1.2 'Nunito',sans-serif;color:${T.teal}">(any order)</span>` : '');
      const maxPer = Math.max(...d.per);
      const paste = (c) => `<div data-lcs-paste="${c}" style="flex:1 1 auto;box-sizing:border-box;min-width:${maxPer * d.cardW + (maxPer + 1) * GLUE + 6}px;min-height:${d.cardH + 2 * GLUE + 6}px;border:2.5px dashed ${T.grid};border-radius:10px;background:${T.cream};display:grid;grid-template-columns:repeat(${maxPer},1fr);align-content:center;justify-items:center;gap:8px 4px;padding:0">${keyWords(c)}</div>`;
      let boxes;
      if (d.layout === 'wide') {
        boxes = `<div data-lcs-boxes style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px">` + t.cats.map((c) => `<div data-lcs-box="${c}" style="flex:1 1 auto;display:flex;flex-direction:column;gap:4px;padding:4px;border:3px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
          `<div data-lcs-head data-lcs-read style="background:${T.teal};color:#FFFFFF;border-radius:8px;text-align:center;font:700 26px/1.3 'Baloo 2',cursive">${esc(C[c].head)}</div>` + paste(c) + `</div>`).join('') + `</div>`;
      } else {
        boxes = `<div data-lcs-boxes style="flex:1 1 auto;display:flex;flex-direction:column;gap:4px">` + t.cats.map((c) => `<div data-lcs-box="${c}" style="flex:1 1 auto;display:flex;gap:8px;padding:3px;border:3px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
          `<div data-lcs-head style="flex:0 0 118px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;padding:4px 8px;background:${T.teal};color:#FFFFFF;border-radius:8px;text-align:center">` +
          `<span data-lcs-headword data-lcs-read style="font:700 26px/1.1 'Baloo 2',cursive">${esc(C[c].head)}</span>${d.lines ? `<span data-lcs-headline data-lcs-read style="font:700 19px/1.2 'Nunito',sans-serif">${esc(C[c].line)}</span>` : ''}</div>` +
          paste(c) + `</div>`).join('') + `</div>`;
      }
      blocks.push(cream('data-lcs-task="sort"', label(`${num(k)}${d.odd ? LINES.sort3 : LINES.sort}`) + boxes, d.pad, 6, 'flex:1 1 auto;'));
      // the cards at the foot of the page: they share their cut lines (the grid draws its top and left edge, every card its
      // right and bottom edge); on the key an X over each card that fits no box
      const card = (x, i) => `<div data-lcs-card="${attr(x.w)}" data-lcs-cat="${x.cat}" data-lcs-r="${Math.floor(i / d.gridCols)}" data-lcs-c="${i % d.gridCols}" style="position:relative;box-sizing:border-box;width:${d.cardW}px;height:${d.cardH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border-right:2px dashed ${T.ink};border-bottom:2px dashed ${T.ink};background:#FFFFFF">` +
        img(x.w, d.pic) + `<span data-lcs-cardword data-lcs-read style="font:800 ${d.word}px/1.1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(x.w)}</span>` +
        (key && x.cat === 'odd' ? `<svg data-lcs-x style="position:absolute;left:8px;top:8px;width:calc(100% - 16px);height:calc(100% - 16px)" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="4" y1="4" x2="96" y2="96" stroke="${T.teal}" stroke-width="5"/><line x1="96" y1="4" x2="4" y2="96" stroke="${T.teal}" stroke-width="5"/></svg>` : '') + `</div>`;
      blocks.push(`<div data-lcs-cards style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:3px 12px 3px;border-radius:14px;background:${T.cream}">` +
        `<div data-lcs-cardgrid style="display:grid;grid-template-columns:repeat(${d.gridCols},${d.cardW}px);gap:0;border-top:2px dashed ${T.ink};border-left:2px dashed ${T.ink}">${t.cards.map(card).join('')}</div></div>`);
    }

    if (t.kind === 'frame') {
      const C = BANK.cats;
      const box = `<div data-lcs-wordbox style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">${t.box.map((c) => `<span data-lcs-boxword="${attr(C[c].a)}" data-lcs-read style="font:800 22px/1.25 'Nunito',sans-serif;color:${T.ink};padding:2px 16px;border-radius:10px;background:#FFFFFF;border:2.5px solid ${T.teal}">${esc(C[c].a)}</span>`).join('')}</div>`;
      const frame = (w) => {
        const x = BANK.things[w];
        return `<div data-lcs-frame="${attr(w)}" data-lcs-cat="${x.cat}" style="display:flex;align-items:center;gap:12px;padding:2px 10px;border-radius:12px;background:#FFFFFF">${img(w, d.pic)}` +
          `<div style="display:flex;flex-direction:column;gap:0;min-width:0">` +
          `<div style="display:flex;align-items:flex-end;gap:10px">${onRow(`${subjOf(w)} is`, d.font, 'data-lcs-lead')}<div style="flex:0 0 auto">${row({ w: DEF_ROW, h: ROW, answer: key ? C[x.cat].a : null })}</div></div>` +
          `<div data-lcs-attrline data-lcs-read style="font:700 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:0 0 4px">that ${esc(x.main)}.</div></div></div>`;
      };
      blocks.push(cream('data-lcs-task="frame"', label(`${num(k)}${LINES.frame}`) + box + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${t.items.map(frame).join('')}</div>`, d.pad, 6, 'flex:1 1 auto;'));
    }

    if (t.kind === 'choose') {
      const C = BANK.cats;
      const one = (c) => {
        const x = BANK.things[c.w];
        return `<div data-lcs-choose="${attr(c.w)}" data-lcs-right="${attr(c.right)}" style="display:flex;align-items:center;gap:12px;padding:3px 10px;border-radius:12px;background:#FFFFFF">${img(c.w, d.pic - 8)}` +
          `<div style="display:flex;flex-direction:column;gap:3px;min-width:0"><div data-lcs-chooselead data-lcs-read style="font:700 ${d.font}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(subjOf(c.w))} is ${esc(C[x.cat].a)} that …</div>` +
          `<div data-lcs-opts style="display:flex;flex-wrap:wrap;gap:4px 8px">${c.opts.map((o) => pill(o, o === c.right, 20, key, `data-lcs-opt="${attr(o)}" data-lcs-read`)).join('')}</div></div></div>`;
      };
      blocks.push(cream('data-lcs-task="choose"', label(`${num(k)}${LINES.choose}`) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${t.items.map(one).join('')}</div>`, d.pad, 6, 'flex:1 1 auto;'));
    }

    if (t.kind === 'write') {
      const C = BANK.cats;
      // the seven categories in a box (the spelling is fair); the "that" part has two rows
      const box = `<div data-lcs-wbox style="display:flex;justify-content:center;gap:6px 10px;flex-wrap:wrap">${t.box.map((c) => `<span data-lcs-boxword="${attr(C[c].a)}" data-lcs-read style="font:800 21px/1.25 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border-radius:10px;background:#FFFFFF;border:2.5px solid ${T.teal}">${esc(C[c].a)}</span>`).join('')}</div>`;
      const thatW = Math.ceil(emOf('that') * d.font * 1.04);
      const one = (w) => {
        const x = BANK.things[w], also = [C[x.cat].also, x.also].filter(Boolean).join('; ');
        return `<div data-lcs-write="${attr(w)}" data-lcs-cat="${x.cat}" style="display:flex;align-items:center;gap:12px;padding:2px 10px;border-radius:12px;background:#FFFFFF">${img(w, d.pic)}` +
          `<div style="position:relative;display:flex;flex-direction:column;gap:0;min-width:0">` +
          `<div style="display:flex;align-items:flex-end;gap:10px">${onRow(`${subjOf(w)} is`, d.font, 'data-lcs-lead')}<div style="flex:0 0 auto">${row({ w: defRow1W(w), h: d.rowH, answer: key ? C[x.cat].a : null, sample: true })}</div></div>` +
          `<div style="display:flex;align-items:flex-end;gap:10px">${onRow('that', d.font, 'data-lcs-lead2')}<div style="flex:0 0 auto">${row({ w: defRow2W(), h: d.rowH, answer: key ? x.sample : null, sample: true })}</div></div>` +
          `<div style="display:flex;align-items:flex-end;gap:10px"><span style="flex:0 0 ${thatW}px"></span><div data-lcs-row3 style="flex:0 0 auto">${row({ w: defRow2W(), h: d.rowH })}</div></div>` +
          `<div data-lcs-keynote style="position:absolute;left:${thatW + 10}px;right:0;bottom:0;height:19px;font:700 14px/19px 'Nunito',sans-serif;color:${T.teal};white-space:nowrap;overflow:hidden">${key ? esc(`(Sample. Also right: ${also}.)`) : ''}</div></div></div>`;
      };
      blocks.push(cream('data-lcs-task="write"', label(`${num(k)}${LINES.write}`) + box + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${t.items.map(one).join('')}</div>`, d.pad, 6, 'flex:1 1 auto;'));
    }

    if (t.kind === 'base') {
      const ln = d.cross === 2 ? LINES.base3 : d.cross === 1 ? LINES.base2 : LINES.base1;
      // the line shows a worked example in grey with a real ring around its base word: (help)ing (help is never an item)
      const ex = `<span data-lcs-example style="display:inline-block;color:${T.inkSoft};font-weight:800"><span data-lcs-exring style="display:inline-block;padding:0 3px;margin:0 1px 0 0;border:2.5px solid ${T.inkSoft};border-radius:10px;line-height:1.15;margin-right:3px">help</span>ing</span>`;
      const lnHtml = esc(ln).replace('like helping.', `like ${ex}.`);
      blocks.push(cream('data-lcs-task="base"', label(`${num(k)}${lnHtml}`) + `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px 12px;padding:2px 0">${t.items.map((x) => wordCell(x, d.wfont, key)).join('')}</div>`, d.pad));
    }

    if (t.kind === 'table') {
      const heads = HEADS[lv];
      const headRow = `<div style="display:flex;gap:4px">${heads.map((h, c) => `<div data-lcs-thead="${c}" style="box-sizing:border-box;width:${COLS[c]}px;background:${T.teal};color:#FFFFFF;border-radius:8px;text-align:center;font:800 21px/1.4 'Nunito',sans-serif">${esc(h)}</div>`).join('')}</div>`;
      const trow = (w, i) => {
        const worked = t.worked && i === 0;
        return `<div data-lcs-trow="${attr(w)}" data-lcs-kind="${BANK.bases[w].kind}"${worked ? ' data-lcs-isworked="1"' : ''} style="display:flex;flex-direction:column;gap:0">` +
          `<span data-lcs-tbase data-lcs-read style="align-self:flex-start;font:800 22px/1.2 'Nunito',sans-serif;color:${worked ? T.inkSoft : T.ink};padding:1px 12px;border-radius:999px;background:#FFFFFF">${esc(w)}</span>` +
          `<div style="display:flex;gap:4px">${FORMS.map((fm, c) => `<div data-lcs-tcell="${fm}" data-lcs-form="${attr(formOf(w, fm))}" style="box-sizing:border-box;width:${COLS[c]}px">${worked ? workedRow(COLS[c], formOf(w, fm)) : row({ w: COLS[c], h: ROW, answer: key ? formOf(w, fm) : null })}</div>`).join('')}</div></div>`;
      };
      blocks.push(cream('data-lcs-task="table"', label(`${num(k)}${t.worked ? LINES.table1 : LINES.table}`) + headRow + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:2px">${t.items.map(trow).join('')}</div>`, d.pad, 4, 'flex:1 1 auto;padding-left:6px;padding-right:6px;'));
    }

    if (t.kind === 'fit') {
      const one = (s, i) => {
        const [pre, post] = s.text.split('___');
        return `<div data-lcs-fit="${attr(s.text)}" data-lcs-base="${attr(s.base)}" data-lcs-form="${s.form}" style="display:flex;align-items:center;gap:10px;padding:4px 10px;border-radius:12px;background:#FFFFFF">${badge(i + 1)}` +
          `<span data-lcs-read data-lcs-fittext style="flex:1 1 auto;min-width:0;font:700 ${d.font}px/1.6 'Nunito',sans-serif;color:${T.ink}">${esc(pre.trim())} <span data-lcs-pills style="white-space:nowrap">${s.opts.map((o) => pill(o, o === formOf(s.base, s.form), d.font, key, `data-lcs-fopt="${attr(o)}"`)).join(' ')}</span>${/^[.!?]/.test(post) ? `<span data-lcs-ptail>${esc(post.trim())}</span>` : ' ' + esc(post.trim())}</span></div>`;
      };
      blocks.push(cream('data-lcs-task="fit"', label(`${num(k)}${LINES.fit}`) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:5px">${t.items.map(one).join('')}</div>`, d.pad, 6, 'flex:1 1 auto;'));
    }

    if (t.kind === 'fitwrite') {
      const one = (s, i) => {
        const [pre, post] = s.text.split('___'), m = post.match(/^[.!?]+/), tail = m ? m[0] : '', rest = (m ? post.slice(m[0].length) : post).trim();
        return `<div data-lcs-fitwrite="${attr(s.text)}" data-lcs-base="${attr(s.base)}" data-lcs-form="${s.form}" style="display:flex;align-items:flex-end;gap:8px;padding:0 10px 2px;border-radius:12px;background:#FFFFFF">` +
          `<span style="align-self:center">${badge(i + 1)}</span><span data-lcs-basechip data-lcs-read style="align-self:center;flex:0 0 auto;font:800 21px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 10px;border:2.5px solid ${T.teal};border-radius:8px">${esc(s.base)}</span>` +
          (pre.trim() ? onRow(pre.trim(), 22) : '') + `<span data-lcs-blankgroup style="display:inline-flex;align-items:flex-end">${row({ w: FIT_ROW, h: ROW, answer: key ? formOf(s.base, s.form) : null })}${tail ? onRow(tail, 22, 'data-lcs-tail') : ''}</span>` + (rest ? onRow(rest, 22) : '') + `</div>`;
      };
      blocks.push(cream('data-lcs-task="fitwrite"', label(`${num(k)}${LINES.fitwrite}`) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:4px">${t.items.map(one).join('')}</div>`, d.pad, 6, 'flex:1 1 auto;'));
    }

    if (t.kind === 'own') {
      // three starters, each with two rows; a box of action words over the -ed and the -ing starter and a box of naming words
      // over the -s starter; the key writes a sample and says which words of the box are right
      const lw = Math.ceil(emOf('I can see two') * 22 * 1.1);
      const chips = (ws, kind, note) => `<div data-lcs-ownbox="${kind}" style="display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px;padding:2px 0">${ws.map((w) => `<span data-lcs-ownword="${attr(w)}" data-lcs-read style="font:800 21px/1.25 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border-radius:10px;background:#FFFFFF;border:2.5px solid ${T.teal}">${esc(w)}</span>`).join('')}` +
        (key ? `<span data-lcs-boxnote style="font:700 14px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(note)}</span>` : '') + `</div>`;
      const one = (o) => `<div data-lcs-own="${o.form}" style="display:flex;flex-direction:column;gap:0"><div style="display:flex;align-items:flex-end;gap:10px"><span style="flex:0 0 ${lw}px;display:flex">${onRow(o.lead, 22, 'data-lcs-lead')}</span>` +
        `<div style="flex:0 0 auto">${row({ w: INNER - lw - 10, h: ROW, answer: key ? t.sample[o.form] : null, sample: true })}</div></div>` +
        `<div data-lcs-row2 style="line-height:0">${row({ w: INNER, h: ROW })}</div></div>`;
      const st = (f) => t.starters.find((o) => o.form === f);
      blocks.push(cream('data-lcs-task="own"', label(`${num(k)}${LINES.own}`) +
        chips(t.verbs, 'verbs', '(Sample. Any word from the box with -ed or -ing is right.)') + one(st('ed')) + one(st('ing')) +
        chips(t.nouns, 'nouns', '(Sample. Any word from the box with -s or -es is right.)') + one(st('s')), d.pad, 4, 'flex:1 1 auto;justify-content:space-between;'));
    }

    if (t.kind === 'cues') {
      blocks.push(`<div data-lcs-cues data-lcs-read style="padding:5px 14px;border-radius:12px;background:${T.cream};border-left:6px solid ${T.teal};font:700 20px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(t.text)}</div>`);
    }
  }
  return blocks;
}

/** what verify() needs to know of the bank */
function infoOf() {
  const B = BANK.bases;
  return {
    cats: BANK.cats, pairs: BANK.pairs, triples: BANK.triples,
    things: Object.fromEntries(Object.entries(BANK.things).map(([w, x]) => [w, { cat: x.cat, kind: x.kind, printOnly: x.printOnly, mass: !!x.mass, main: x.main || null, sample: x.sample || null }])),
    odd: Object.fromEntries(Object.entries(BANK.odd).map(([w, x]) => [w, { kind: x.kind, looks: x.looks }])),
    facts: BANK.facts, traits: BANK.traits,
    bases: Object.fromEntries(Object.entries(B).map(([w, x]) => [w, { kind: x.kind, s: x.s, ed: x.ed, ing: x.ing }])),
    noEnding: BANK.noEnding,
    sentences: Object.fromEntries(BANK.sentences.map((s) => [s.text, { base: s.base, form: s.form, lv: s.lv }])), cues: CUES,
    own: BANK.own, say: BANK.say,
  };
}

function makeWordMeaningsG1Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('word-meanings-g1: unknown mode ' + mode);
  const INFO = { ...infoOf(), instr: INSTR[mode], lines: LINES, heads: HEADS, legs: Object.fromEntries(Object.entries(BANK.things).filter(([, x]) => x.cat === 'insect').map(([w, x]) => [w, x.legs])) };
  return {
    id, slug, gradeBand: 'G1', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, rng);
      const blocks = renderTasks(plan, mode, lv, d, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-wmg1="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(svgRoom(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((LEVELS, INFO, CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-wmg1]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsWmg1.split('|'), lv = +lvS, d = LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => e.textContent.replace(/\s+/g, ' ').trim();
        const toks = (t) => (String(t).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || []);
        const TEAL = 'rgb(20, 107, 94)';
        const rb = R(root);
        const placesOk = (p, k) => {
          const n = p.length, s = p.join(''), need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
          if (new Set(p).size < need) return false;
          if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
          if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
          if (/01010|10101/.test(s) || (n >= 4 && /^(01)+0?$|^(10)+1?$/.test(s))) return false;
          return true;
        };
        const kindsOk = (s) => !/(.)\1\1/.test(s) && !(new Set(s).size === 2 && s.length >= 4 && /^(..)\1+.?$/.test(s) && s[0] !== s[1]);
        const wrongFor = (w, ph) => { const f = INFO.facts[ph]; return !!f && !(f.yes || []).includes(w) && !(f.unsure || []).includes(w) && (f.parts || []).every((p) => !((INFO.traits || {})[p] || []).includes(w)); };
        const formsOf = (b) => { const x = INFO.bases[b]; return x ? [x.s, x.ed, x.ing] : []; };
        const subj = (w) => (INFO.things[w] && INFO.things[w].mass ? w[0].toUpperCase() + w.slice(1) : `${/^[aeiou]/.test(w) ? 'An' : 'A'} ${w}`);
        const sayAll = mode === 'add' ? Object.values(INFO.say.add).flat() : mode === 'sort' ? INFO.say.sort : mode === 'define' ? INFO.say.define : [];
        // letters: ligatures off everywhere, and an f before i, f, l, t and a t before t have their own room
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        document.querySelectorAll('[data-lcs-letter="f"], [data-lcs-letter="t"]').forEach((e) => { const nx = e.nextElementSibling; if (nx && nx.matches('[data-lcs-letter]') && (e.dataset.lcsLetter === 'f' ? /[iflt]/ : /t/).test(nx.dataset.lcsLetter) && parseFloat(cs(e).marginRight) < 1) fails.push('a letter span f or t stands right against the next letter'); });
        // typographic apostrophes only
        if (/['"]/.test(root.textContent)) fails.push('a straight apostrophe or quote on the page');
        // pictures: loaded, 60 px or more, no two of one kind
        const imgs = [...root.querySelectorAll('img')];
        imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px'); });
        if (new Set(imgs.map((im) => im.dataset.lcsPickind)).size !== imgs.length) fails.push('two pictures of one kind on the page');
        if ((mode === 'add' || mode === 'fits') && imgs.length) fails.push('a picture on a page of printed words');
        // the instruction at the top of the page is the one of this level
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== INFO.instr[lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more, no blank band
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, svg').forEach((e) => { if (e.dataset.lcsStrike !== undefined) return; const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
        { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last task`); }
        // the same inside every task card: between its parts and at its edges, and between the items of its list
        blocks.forEach((b) => { const ks = [...b.children], s = cs(b); if (!ks.length) return;
          for (let i = 1; i < ks.length; i++) { const g = R(ks[i]).top - R(ks[i - 1]).bottom; if (g > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px inside the ${b.dataset.lcsTask || 'cards'} block`); }
          const ge = Math.max(R(ks[0]).top - R(b).top - parseFloat(s.paddingTop), R(b).bottom - parseFloat(s.paddingBottom) - R(ks[ks.length - 1]).bottom);
          if (ge > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(ge)} px at the edge of the ${b.dataset.lcsTask || 'cards'} block`);
          b.querySelectorAll('[data-lcs-frame], [data-lcs-choose], [data-lcs-write], [data-lcs-fit], [data-lcs-fitwrite], [data-lcs-trow], [data-lcs-own]').forEach((e, i, all) => { const nx = e.nextElementSibling; if (nx && [...all].includes(nx)) { const g = R(nx).top - R(e).bottom; if (g > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two items of the ${b.dataset.lcsTask} task`); } });
          b.querySelectorAll('[data-lcs-frame], [data-lcs-choose], [data-lcs-write], [data-lcs-fit], [data-lcs-fitwrite]').forEach((e) => { const kids = [...e.children].filter((x) => R(x).height); const top = Math.min(...kids.map((x) => R(x).top)), bot = Math.max(...kids.map((x) => R(x).bottom)); if (top - R(e).top > CFG.BAND || R(e).bottom - bot > CFG.BAND) fails.push('a blank band inside an item'); }); });
        // the blank bands a reader SEES inside every block: the union of everything printed (text, pictures, the rules of a
        // writing row, boxes with a border, teal bars) from the block's inner top to its inner bottom; no gap over BAND
        blocks.forEach((b) => { const iv = [], s = cs(b);
          [b, ...b.querySelectorAll('*')].forEach((e) => {
            const r = R(e); if (!r.width || !r.height) return;
            // a writing row is printed from its top rule down to its foot (the room under the base rule is where tails of
            // letters go); anything else inside an svg counts as it stands
            if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') { if (!e.closest('[data-lcs-line]') || e.tagName.toLowerCase() === 'text') iv.push([r.top, r.bottom]); return; }
            if (e.tagName.toLowerCase() === 'svg') { if (e.closest('[data-lcs-line]')) { const ls = [...e.querySelectorAll('line')].map((l) => R(l).top); iv.push([ls.length ? Math.min(...ls) : r.top, r.bottom]); } else iv.push([r.top, r.bottom]); return; }
            const st = cs(e), own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
            const border = ['Top', 'Right', 'Bottom', 'Left'].some((q) => parseFloat(st['border' + q + 'Width']) >= 2 && st['border' + q + 'Style'] !== 'none' && st['border' + q + 'Color'] !== 'rgba(0, 0, 0, 0)');
            if (e.tagName === 'IMG' || own || border || st.backgroundColor === TEAL) iv.push([r.top, r.bottom]);
          });
          iv.sort((p, q) => p[0] - q[0]);
          let top = R(b).top + parseFloat(s.paddingTop), worst = 0;
          for (const [a, z] of iv) { if (a > top) worst = Math.max(worst, a - top); top = Math.max(top, z); }
          worst = Math.max(worst, R(b).bottom - parseFloat(s.paddingBottom) - top);
          if (worst > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(worst)} px that a reader sees in the ${b.dataset.lcsTask || (b.dataset.lcsCues !== undefined ? 'rule' : 'cards')} block`); });
        // sizes
        const lines = [...root.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < CFG.ROW_FLOOR - 0.5) fails.push(`a writing row lower than ${CFG.ROW_FLOOR} px`); });
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 19) fails.push('text a first grader reads is smaller than 19 px'); });
        // a key's answer fits its row with 8 px on each side, measured at its own width (a fitted answer is squeezed)
        lines.forEach((l) => { const tx = l.querySelector('svg text[data-lcs-keytext]'); if (!tx || (!isKey && l.dataset.lcsWorked === undefined)) return; if (tx.getAttribute('textLength')) { fails.push(`the key's answer "${tx.textContent}" is squeezed to fit its row`); return; } if (tx.getBBox().width > R(l.querySelector('svg')).width - 15) fails.push(`the key's answer "${tx.textContent}" is wider than its row`); });
        if (!isKey && lines.some((l) => l.dataset.lcsAnswer)) fails.push('a row is filled on the page of the child');
        const kinds = blocks.map((b) => b.dataset.lcsTask || (b.dataset.lcsCards !== undefined ? 'cards' : '?'));
        // the tasks are numbered 1, 2, ... in order (the rule box takes no number)
        { const ns = [...root.querySelectorAll('[data-lcs-label]')].map((l) => +((txt(l).match(/^(\d+)\./) || [])[1])); if (ns.some((x, i) => x !== i + 1)) fails.push('the tasks are numbered ' + ns.join(', ')); }

        if (mode === 'sort') {
          if (kinds.join() !== 'sort,cards') fails.push(`the blocks are ${kinds.join(', ')}, not the boxes and the cards`);
          const sortB = blocks[0];
          if (txt(sortB.querySelector('[data-lcs-label]')).replace(/^\d+\.\s*/, '').replace(/ \(any order\)$/, '') !== (d.odd ? INFO.lines.sort3 : INFO.lines.sort)) fails.push('the task line is not the line of this level');
          root.querySelectorAll('[data-lcs-paste]').forEach((p) => { const ao = p.querySelector('[data-lcs-anyorder]'); if (isKey ? !ao || txt(ao) !== '(any order)' : !!ao) fails.push('a glue box of the key does not say "(any order)", or the page of the child does'); });
          const boxes = [...root.querySelectorAll('[data-lcs-box]')], cats = boxes.map((b) => b.dataset.lcsBox);
          const sets = (lv === 1 ? INFO.pairs : INFO.triples).map((s) => s.slice().sort().join());
          if (!sets.includes(cats.slice().sort().join())) fails.push(`the categories ${cats.join(', ')} are no set of level ${lv}`);
          boxes.forEach((b) => { const c = b.dataset.lcsBox, h = b.querySelector('[data-lcs-head]'), hw = b.querySelector('[data-lcs-headword]') || h;
            if (!h || txt(hw) !== INFO.cats[c].head || cs(h).backgroundColor !== TEAL || cs(h).color !== 'rgb(255, 255, 255)') fails.push(`the box of ${c} is not headed by a teal bar "${INFO.cats[c].head}"`);
            const hl = b.querySelector('[data-lcs-headline]');
            if (d.lines ? !hl || txt(hl) !== INFO.cats[c].line : !!hl) fails.push(`the line under the head of ${c} ${d.lines ? 'is missing or wrong' : 'stands on a level without one'}`);
            if (h && b.querySelector('img')) fails.push('a box shows a picture'); });
          const cards = [...root.querySelectorAll('[data-lcs-card]')];
          const n = d.per.reduce((a, x) => a + x, 0) + d.odd;
          if (cards.length !== n || new Set(cards.map((c) => c.dataset.lcsCard)).size !== n) fails.push(`${cards.length} cards, not ${n} different ones`);
          const byCat = {};
          cards.forEach((c) => { const w = c.dataset.lcsCard, cat = c.dataset.lcsCat, th = INFO.things[w], od = INFO.odd[w];
            if (cat === 'odd' ? !od || !d.odd || cats.includes(od.looks) === false : !th || th.cat !== cat || !cats.includes(cat)) fails.push(`the card "${w}" is not a ${cat === 'odd' ? 'card that fits no box' : 'thing of the category ' + cat}`);
            (byCat[cat] = byCat[cat] || []).push(w);
            const im = c.querySelector('img'), wd = c.querySelector('[data-lcs-cardword]');
            if (!im || im.dataset.lcsPic !== w || R(im).width < 60) fails.push(`the card "${w}" has no picture of its own of 60 px or more`);
            if (!wd || txt(wd) !== w || fs(wd) < 20 || R(wd).width > R(c).width - 6 || R(wd).left < R(c).left + 2) fails.push(`the card "${w}" does not show its word under the picture, 20 px or more, inside the card`);
            if (im && wd && R(wd).top < R(im).bottom - 1) fails.push(`the word of "${w}" is not under its picture`);
            if (Math.abs(R(c).width - d.cardW) > 1.5 || Math.abs(R(c).height - d.cardH) > 1.5) fails.push(`the card "${w}" is not ${d.cardW} by ${d.cardH} px`);
            if (cs(c).borderLeftStyle !== 'none' || cs(c).borderTopStyle !== 'none' || cs(c).borderRightStyle !== 'dashed' || cs(c).borderBottomStyle !== 'dashed') fails.push('a card does not share its cut lines');
            const x = c.querySelector('[data-lcs-x]'); if (isKey ? !!x !== (cat === 'odd') : !!x) fails.push(`the X of "${w}" is wrong on the key, or shows on the page of the child`); });
          // every category of the page: its number of cards; on level 3 two cards that fit no box, looking like two categories
          const want = d.per.slice().sort().join();
          if (cats.map((c) => (byCat[c] || []).length).sort().join() !== want) fails.push(`the categories hold ${cats.map((c) => (byCat[c] || []).length).join(', ')} cards, not ${d.per.join(', ')}`);
          if (d.odd) { const od = (byCat.odd || []); if (od.length !== 2 || new Set(od.map((w) => INFO.odd[w].looks)).size !== 2) fails.push('not two cards that fit no box, each like another category'); }
          // no pattern in the grid; the cut lines shared; the cards at the foot of the page
          const rows = [...new Set(cards.map((c) => +c.dataset.lcsR))].map((r) => cards.filter((c) => +c.dataset.lcsR === r).sort((a, b2) => a.dataset.lcsC - b2.dataset.lcsC));
          const ks = cards.map((c) => c.dataset.lcsCat);
          if (ks.some((x, i) => i >= 2 && x === ks[i - 1] && x === ks[i - 2])) fails.push('three cards of one category stand in a row');
          if (rows.every((r) => r.map((c) => c.dataset.lcsCat).join() === rows[0].map((c) => c.dataset.lcsCat).join())) fails.push('every row of cards is alike');
          if (rows.some((r) => new Set(r.map((c) => c.dataset.lcsCat)).size < 2)) fails.push('a row of cards is one category');
          if (rows.length >= 3) for (let c = 0; c < d.gridCols; c++) if (new Set(rows.map((r) => r[c] && r[c].dataset.lcsCat)).size < 2) fails.push(`card column ${c + 1} is one category`);
          if (rows.length === 2 && rows.every((r) => { const s = r.map((c) => c.dataset.lcsCat); return s[0] === s[2] && s[1] === s[3]; })) fails.push('the cards alternate in every row');
          rows.forEach((r) => r.forEach((c, i) => { if (i && Math.abs(R(c).left - R(r[i - 1]).right) > 0.5) fails.push('two cards side by side do not share their cut line'); }));
          for (let r = 1; r < rows.length; r++) if (Math.abs(R(rows[r][0]).top - R(rows[r - 1][0]).bottom) > 0.5) fails.push('two rows of cards do not share their cut line');
          if (d.odd) { const oi = cards.map((c, i) => (c.dataset.lcsCat === 'odd' ? i : -1)).filter((i) => i >= 0); if (oi.length === 2 && (Math.floor(oi[0] / d.gridCols) === Math.floor(oi[1] / d.gridCols) || oi[0] % d.gridCols === oi[1] % d.gridCols)) fails.push('the two cards that fit no box stand in one row or one column'); }
          // the sort is never done by word length; no two pictures of one kind; two print-only pictures at most
          { const ls = cats.map((c) => (byCat[c] || []).map((w) => w.length)); for (let i = 0; i < ls.length; i++) for (let j = 0; j < ls.length; j++) if (i !== j && ls[i].length && ls[j].length && Math.max(...ls[i]) < Math.min(...ls[j])) fails.push('every word of one category is shorter than every word of another: the sort can be done by length'); }
          if (cards.filter((c) => INFO.things[c.dataset.lcsCard] && INFO.things[c.dataset.lcsCard].printOnly).length > 2) fails.push('more than two print-only pictures');
          // a glue box holds all its cards with GLUE (30 px) between two cards and from a card to every edge, measured with the
          // real card and box sizes (the dashed border of the box is taken off)
          const cw = cards.length ? R(cards[0]).width : d.cardW, ch = cards.length ? R(cards[0]).height : d.cardH;
          root.querySelectorAll('[data-lcs-paste]').forEach((p) => { const r = R(p), c = p.dataset.lcsPaste, nn = (byCat[c] || []).length, bw = r.width - 2 * parseFloat(cs(p).borderLeftWidth), bh = r.height - 2 * parseFloat(cs(p).borderTopWidth);
            let ok = false; for (let k = 1; k <= nn && !ok; k++) { const rows2 = Math.ceil(nn / k); ok = k * cw + (k + 1) * CFG.GLUE <= bw + 0.5 && rows2 * ch + (rows2 + 1) * CFG.GLUE <= bh + 0.5; }
            if (!nn || !ok) fails.push(`the ${c} box cannot hold its ${nn} cards with ${CFG.GLUE} px of room around each (${Math.round(bw)} x ${Math.round(bh)} for cards of ${Math.round(cw)} x ${Math.round(ch)})`);
            const kw = [...p.querySelectorAll('[data-lcs-keyword]')].map((e) => e.dataset.lcsKeyword).sort().join();
            if (isKey ? kw !== (byCat[c] || []).slice().sort().join() : kw) fails.push(`the ${c} box ${isKey ? 'does not hold the words of its cards on the key' : 'is filled on the page of the child'}`); });
          if (root.lastElementChild !== blocks[1] || !blocks[1].querySelector('[data-lcs-cardgrid]')) fails.push('the cards to cut out are not at the foot of the page');
          if (cards.some((c) => sayAll.includes(c.dataset.lcsCard))) fails.push('an example of the instruction is a card');
          // level 3 (Insects have six legs.): only insect pictures that show four legs or more
          if (d.legs) (byCat.insect || []).forEach((w) => { if ((INFO.legs[w] || 0) < d.legs) fails.push(`the insect "${w}" shows fewer than ${d.legs} legs on the level that says Insects have six legs.`); });
          // the fish cards: shark or tuna among them, at most two names that end in fish
          if (byCat.fish && (byCat.fish.filter((w) => /fish$/.test(w)).length > 2 || !byCat.fish.some((w) => w === 'shark' || w === 'tuna'))) fails.push('the fish cards are more than two -fish names, or have no shark or tuna');
        }

        if (mode === 'define') {
          const want = [...(d.frames.length ? ['frame'] : []), ...(d.choose ? ['choose'] : []), ...(d.write ? ['write'] : [])];
          if (kinds.join() !== want.join()) fails.push(`the tasks are ${kinds.join(', ')}, not ${want.join(', ')}`);
          const all = [];
          const fr = [...root.querySelectorAll('[data-lcs-frame]')];
          if (fr.length !== d.frames.reduce((a, x) => a + x, 0)) fails.push(`${fr.length} frames, not ${d.frames.reduce((a, x) => a + x, 0)}`);
          if (fr.length) {
            const box = [...root.querySelectorAll('[data-lcs-boxword]')].map((e) => e.dataset.lcsBoxword);
            const cats = fr.map((e) => e.dataset.lcsCat), boxCats = Object.keys(INFO.cats).filter((c) => box.includes(INFO.cats[c].a));
            if (box.length !== d.cats || boxCats.length !== d.cats || !(lv === 1 ? INFO.pairs : INFO.triples).some((s) => s.slice().sort().join() === boxCats.slice().sort().join())) fails.push('the word box is not the categories of a set of this level');
            if (boxCats.some((c) => !cats.includes(c))) fails.push('a word of the box answers no frame');
            if (!kindsOk(cats.map((c) => 'abcdefg'[Object.keys(INFO.cats).indexOf(c)]).join(''))) fails.push('the categories of the frames follow a pattern');
            if (fr.length === 3 && d.cats === 3) { const bo = box.map((a) => Object.keys(INFO.cats).find((c) => INFO.cats[c].a === a)); if (cats.join() === bo.join() || cats.join() === bo.slice().reverse().join()) fails.push('the frames take the words of the box in its order'); }
            fr.forEach((e) => { const w = e.dataset.lcsFrame, x = INFO.things[w];
              if (!x || !x.main || x.printOnly || x.cat !== e.dataset.lcsCat || sayAll.includes(w)) { fails.push(`"${w}" is no thing to define`); return; }
              const lead = e.querySelector('[data-lcs-lead]'), al = e.querySelector('[data-lcs-attrline]'), l = e.querySelector('[data-lcs-line]');
              if (!lead || txt(lead) !== `${subj(w)} is`) fails.push(`the frame of "${w}" does not start "A ${w} is"`);
              if (!al || txt(al) !== `that ${x.main}.`) fails.push(`the frame of "${w}" does not end with its attribute`);
              if (!l || (isKey && l.dataset.lcsAnswer !== INFO.cats[x.cat].a)) fails.push(`the key of "${w}" does not write "${INFO.cats[x.cat].a}"`);
              if (wrongFor(w, x.main)) fails.push(`the attribute of "${w}" is not recorded as true of it`);
              const im = e.querySelector('img'); if (!im || im.dataset.lcsPic !== w) fails.push(`the frame of "${w}" has no picture of it`);
              all.push(w); });
          }
          const ch = [...root.querySelectorAll('[data-lcs-choose]')];
          if (ch.length !== d.choose) fails.push(`${ch.length} sentences to finish, not ${d.choose}`);
          const at = [], printedAttrs = fr.map((e) => (INFO.things[e.dataset.lcsFrame] || {}).main);
          let longest = 0, shortest = 0;
          ch.forEach((e) => { const w = e.dataset.lcsChoose, x = INFO.things[w];
            if (!x || !x.main || x.printOnly || sayAll.includes(w)) { fails.push(`"${w}" is no thing to define`); return; }
            const opts = [...e.querySelectorAll('[data-lcs-opt]')].map((o) => o.dataset.lcsOpt), ok = [...e.querySelectorAll('[data-lcs-opt][data-lcs-ok]')];
            if (opts.length !== 3 || new Set(opts).size !== 3 || ok.length !== 1 || ok[0].dataset.lcsOpt !== x.main) fails.push(`"${w}": not three attributes with its own one marked`);
            opts.forEach((o) => { if (o === x.main) return; if (!wrongFor(w, o)) fails.push(`"${o}" is true of "${w}", or might be argued`);
              const ow = Object.keys(INFO.things).find((v) => INFO.things[v].main === o); if (!ow || (d.wrong === 'same' ? INFO.things[ow].cat !== x.cat : INFO.things[ow].cat === x.cat)) fails.push(`"${o}" is not an attribute of a thing of ${d.wrong === 'same' ? 'the same' : 'another'} category`); });
            if (printedAttrs.includes(x.main) || printedAttrs.some((p) => opts.includes(p))) fails.push(`an attribute of "${w}" is printed in another task`);
            const lead = e.querySelector('[data-lcs-chooselead]'); if (!lead || txt(lead) !== `${subj(w)} is ${INFO.cats[x.cat].a} that …`) fails.push(`the sentence of "${w}" does not name its category`);
            if (d.cats && fr.length && !fr.some((f) => f.dataset.lcsCat === x.cat)) fails.push(`"${w}" is of no category of the page`);
            e.querySelectorAll('[data-lcs-opt]').forEach((o) => { const ringed = cs(o).borderTopColor === TEAL; if (isKey ? ringed !== !!o.dataset.lcsOk : ringed) fails.push('an attribute is ringed on the page of the child, or the key rings the wrong one'); if (fs(o) < 20) fails.push('an attribute to circle is smaller than 20 px'); });
            { const ps = [...e.querySelectorAll('[data-lcs-opt]')], tops = new Set(ps.map((p) => Math.round(R(p).top))); if (tops.size > 2) fails.push(`the attributes of "${w}" take ${tops.size} lines`); }
            at.push(opts.indexOf(x.main));
            if (opts.every((o) => o === x.main || o.length < x.main.length)) longest++;
            if (opts.every((o) => o === x.main || o.length > x.main.length)) shortest++;
            all.push(w); });
          if (at.length >= 2 && new Set(at).size < 2) fails.push('the right attribute stands in one place every time');
          if (longest > Math.floor(ch.length / 2) || shortest > Math.floor(ch.length / 2)) fails.push('the right attribute can be found by its length');
          const wr = [...root.querySelectorAll('[data-lcs-write]')];
          if (wr.length !== (d.write || 0)) fails.push(`${wr.length} definitions to write, not ${d.write || 0}`);
          if (wr.length && new Set(wr.map((e) => e.dataset.lcsCat)).size !== wr.length) fails.push('two definitions to write of one category');
          if (wr.length) { const bx = [...root.querySelectorAll('[data-lcs-wbox] [data-lcs-boxword]')].map((e) => e.dataset.lcsBoxword).sort().join(); if (bx !== Object.values(INFO.cats).map((c) => c.a).sort().join()) fails.push('the box over the definitions does not hold the seven categories'); }
          wr.forEach((e) => { const w = e.dataset.lcsWrite, x = INFO.things[w];
            if (!x || !x.main || x.printOnly || x.cat !== e.dataset.lcsCat) { fails.push(`"${w}" is no thing to define`); return; }
            const ls = [...e.querySelectorAll('[data-lcs-line]')], note = e.querySelector('[data-lcs-keynote]');
            if (ls.length !== 3) fails.push(`the definition of "${w}" has not three rows (the category and two for what is special)`);
            if (ls[2] && ls[2].dataset.lcsAnswer) fails.push(`the third row of "${w}" is filled`);
            { const lead = e.querySelector('[data-lcs-lead]'), lead2 = e.querySelector('[data-lcs-lead2]'); if (!lead || txt(lead) !== `${subj(w)} is` || !lead2 || txt(lead2) !== 'that') fails.push(`the definition of "${w}" is not "${subj(w)} is ___ that ___"`); }
            { const im = e.querySelector('img'); if (!im || im.dataset.lcsPic !== w) fails.push(`the definition of "${w}" has no picture of it`); }
            if (isKey && (ls[0].dataset.lcsAnswer !== INFO.cats[x.cat].a || ls[1].dataset.lcsAnswer !== x.sample || !ls[1].dataset.lcsKeySample || !note || !/^\(Sample\. Also right: /.test(txt(note)))) fails.push(`the key of "${w}" is not its category and a sample attribute with the other right answers`);
            if (!isKey && note && txt(note)) fails.push('a key note on the page of the child');
            if ([...root.querySelectorAll('[data-lcs-opt]')].some((o) => o.dataset.lcsOpt === x.main) || [...root.querySelectorAll('[data-lcs-attrline]')].some((a) => txt(a).includes(x.main))) fails.push(`the attribute of "${w}" is printed in another task`);
            if (note && isKey && note.scrollWidth > note.clientWidth + 1) fails.push(`the key note of "${w}" does not fit its line`);
            all.push(w); });
          if (new Set(all).size !== all.length) fails.push('a thing stands twice on the page');
          if (all.some((w) => sayAll.includes(w))) fails.push('the duck of the title stands on the page');
        }

        if (mode === 'add') {
          if (kinds.join() !== 'base,table') fails.push(`the tasks are ${kinds.join(', ')}, not base, table`);
          const cells = [...root.querySelectorAll('[data-lcs-bw]')];
          const nEnd = d.words - d.cross;
          const ends = cells.filter((c) => c.dataset.lcsBase), cross = cells.filter((c) => c.dataset.lcsNoend);
          if (cells.length !== d.words || ends.length !== nEnd || cross.length !== d.cross) fails.push(`not ${nEnd} words with an ending and ${d.cross} without`);
          const ln = txt(blocks[0].querySelector('[data-lcs-label]')).replace(/^\d+\.\s*/, '');
          { const ex = blocks[0].querySelector('[data-lcs-example]'), er = ex && ex.querySelector('[data-lcs-exring]');
            if (!ex || txt(ex) !== 'helping' || !er || txt(er) !== 'help' || parseFloat(cs(er).borderTopWidth) < 2 || cs(er).borderTopColor !== 'rgb(138, 130, 118)' || cs(ex).color !== 'rgb(138, 130, 118)') fails.push('the line of task 1 has no grey worked example with a ring around help'); }
          if (ln !== (d.cross === 2 ? INFO.lines.base3 : d.cross === 1 ? INFO.lines.base2 : INFO.lines.base1)) fails.push('the line of task 1 is not the line of this level');
          const pageBases = [];
          ends.forEach((c) => { const w = c.dataset.lcsBw, bse = c.dataset.lcsBase, e = c.dataset.lcsEnd, x = INFO.bases[bse];
            if (!x || x[e] !== w || sayAll.includes(bse)) { fails.push(`"${w}" is no form of a base word of the bank (or an example)`); return; }
            if (lv === 1 && x.kind !== 'plain') fails.push(`"${w}" changes its base or adds -es on level 1`);
            if (x.kind === 'dropE') fails.push(`"${w}" has lost the e of its base: no word to circle`);
            if (lv === 3 && /[wxy]$/.test(bse)) fails.push(`"${w}": its base ends in w, x, or y on the page that prints the doubling rule`);
            const ring = c.querySelector('[data-lcs-basering]'), bl = c.querySelector('[data-lcs-base-letters]'), letters = [...c.querySelectorAll('[data-lcs-letter]')];
            const baseLetters = bl ? [...bl.querySelectorAll('[data-lcs-letter]')] : [];
            if (!ring || !bl || baseLetters.map((l) => l.dataset.lcsLetter).join('') !== bse) fails.push(`the base letters of "${w}" are not the base word ${bse}`);
            if (letters.map((l) => l.dataset.lcsLetter).join('') !== w || txt(c) !== w) fails.push(`"${w}" is not printed letter by letter`);
            if (ring && (cs(ring).borderTopColor === TEAL) !== isKey) fails.push(`the base of "${w}" is ringed on the page of the child, or not on the key`);
            // the ring ends before the ending (its right edge stays within 2 px of the end of the base letters) and holds
            // the whole base; the letters stand evenly, so the page of the child does not show the split
            if (ring && baseLetters.length) { const rr = R(ring), first = R(baseLetters[0]), endL = letters[baseLetters.length];
              const lastB = baseLetters[baseLetters.length - 1];
              if (rr.left > first.left - 2 || rr.right < R(lastB).right - 0.5 || (endL && rr.right > R(endL).left + 2)) fails.push(`the ring of "${w}" does not hold its base to its last letter, or runs into the ending`); }
            { const gaps = letters.slice(1).map((l, i) => R(l).left - R(letters[i]).right - parseFloat(cs(letters[i]).marginRight || 0)); if (gaps.some((g) => Math.abs(g) > 1.2)) fails.push(`the letters of "${w}" do not stand evenly`); }
            if (c.querySelector('[data-lcs-strike]')) fails.push(`"${w}" has an ending but is crossed out`);
            pageBases.push(bse); });
          cross.forEach((c) => { const w = c.dataset.lcsBw;
            if (!INFO.noEnding.includes(w) || sayAll.includes(w)) fails.push(`"${w}" is no word without an ending`);
            if (!!c.querySelector('[data-lcs-strike]') !== isKey) fails.push(`"${w}" is crossed out on the page of the child, or not on the key`);
            if (c.querySelector('[data-lcs-basering]')) fails.push(`"${w}" has a base ring`); });
          { const el = ends.map((c) => c.dataset.lcsBw.length); if (cross.some((c) => c.dataset.lcsBw.length < Math.min(...el))) fails.push('a word with no ending is the shortest on the page: found by length'); }
          { const es = ends.map((c) => c.dataset.lcsEnd); if (!['s', 'ed', 'ing'].every((x) => es.includes(x))) fails.push('the words do not show all three endings'); }
          if (lv === 2 && !ends.some((c) => INFO.bases[c.dataset.lcsBase].kind === 'es' && c.dataset.lcsEnd === 's')) fails.push('level 2 shows no word with -es');
          if (lv === 3 && !ends.some((c) => INFO.bases[c.dataset.lcsBase].kind === 'double' && c.dataset.lcsEnd !== 's')) fails.push('level 3 shows no word with a doubled letter');
          if (!kindsOk(cells.map((c) => (c.dataset.lcsEnd || 'n')[0]).join(''))) fails.push('the endings of task 1 follow a pattern');
          cells.forEach((c) => { const wd = c.querySelector('[data-lcs-word]'); if (fs(wd) < 28) fails.push('a word to circle is smaller than 28 px'); if (R(wd).width > R(c).width - 8) fails.push('a word to circle fills its cell'); });
          // the table
          const heads = [...root.querySelectorAll('[data-lcs-thead]')].map(txt);
          if (heads.join('|') !== INFO.heads[lv].join('|')) fails.push(`the heads of the table are not ${INFO.heads[lv].join(', ')}`);
          root.querySelectorAll('[data-lcs-thead]').forEach((h, c) => { if (Math.abs(R(h).width - CFG.COLS[c]) > 1.5 || cs(h).backgroundColor !== TEAL) fails.push('a head of the table is not a teal bar as wide as its column'); });
          const trows = [...root.querySelectorAll('[data-lcs-trow]')];
          if (trows.length !== d.rows + (d.worked ? 1 : 0)) fails.push(`${trows.length} rows in the table, not ${d.rows + (d.worked ? 1 : 0)}`);
          const tl = txt(blocks[1].querySelector('[data-lcs-label]')).replace(/^\d+\.\s*/, '');
          if (tl !== (d.worked ? INFO.lines.table1 : INFO.lines.table)) fails.push('the line of the table is not the line of this level');
          const tk = [];
          trows.forEach((r, i) => { const bse = r.dataset.lcsTrow, x = INFO.bases[bse], worked = r.dataset.lcsIsworked === '1';
            if (!x || sayAll.includes(bse)) { fails.push(`"${bse}" is no base word of the bank (or an example)`); return; }
            if (worked !== (!!d.worked && i === 0)) fails.push('the worked row is not the first row of level 1 only');
            if (txt(r.querySelector('[data-lcs-tbase]')) !== bse) fails.push(`the row of ${bse} does not print it`);
            const cl = [...r.querySelectorAll('[data-lcs-tcell]')];
            if (cl.map((c) => c.dataset.lcsTcell).join() !== 's,ed,ing') fails.push(`the row of ${bse} has not three cells -s, -ed, -ing`);
            cl.forEach((c, j) => { const want = [x.s, x.ed, x.ing][j], l = c.querySelector('[data-lcs-line]');
              if (c.dataset.lcsForm !== want || !l || Math.abs(R(l.querySelector('svg')).width - CFG.COLS[j]) > 1.5) fails.push(`the cell ${want} is not keyed to it or not as wide as its column`);
              if (worked) { if (l.dataset.lcsWorked !== want) fails.push(`the worked row does not show ${want}`); const tx = l.querySelector('svg text'); if (!tx || tx.getAttribute('fill') !== '#8A8276') fails.push('the worked row is not grey'); }
              else if (isKey ? l.dataset.lcsAnswer !== want : l.dataset.lcsAnswer) fails.push(`the key does not write ${want}, or the page of the child does`); });
            if (lv === 1 && x.kind !== 'plain') fails.push(`level 1 has "${bse}", a word that changes or adds -es`);
            if (lv === 3 && /[wxy]$/.test(bse)) fails.push(`"${bse}" ends in w, x, or y on the page with the doubling rule`);
            if (pageBases.includes(bse)) fails.push(`"${bse}" stands in both tasks`);
            if (!worked) tk.push(x.kind); });
          if (lv === 2 && !tk.includes('es')) fails.push('level 2 has no base word that adds -es in the table');
          if (lv === 3 && (tk.filter((x) => x === 'double').length !== 1 || tk.filter((x) => x === 'dropE').length !== 1)) fails.push('level 3 has not one base word that doubles and one that drops its e');
        }

        if (mode === 'fits') {
          const want = ['rule', ...(d.circle ? ['fit'] : []), ...(d.write ? ['fitwrite'] : []), ...(d.own ? ['own'] : [])];
          const kinds2 = blocks.map((b) => (b.dataset.lcsCues !== undefined ? 'rule' : b.dataset.lcsTask));
          if (kinds2.join() !== want.join()) fails.push(`the parts are ${kinds2.join(', ')}, not ${want.join(', ')}`);
          { const cu = root.querySelector('[data-lcs-cues]'); if (!cu || txt(cu) !== INFO.cues[lv] || fs(cu) < 19) fails.push('the rule box does not hold the clue words of this level'); }
          const ss = [...root.querySelectorAll('[data-lcs-fit]')], at = [], forms = [], bases = [];
          if (ss.length !== d.circle) fails.push(`${ss.length} sentences to circle in, not ${d.circle}`);
          let longest = 0;
          ss.forEach((e) => { const t = e.dataset.lcsFit, s = INFO.sentences[t];
            if (!s || !s.lv.includes(lv) || s.base !== e.dataset.lcsBase || s.form !== e.dataset.lcsForm) { fails.push(`"${t}" is no sentence of level ${lv}`); return; }
            const x = INFO.bases[s.base], right = x[s.form], opts = [...e.querySelectorAll('[data-lcs-fopt]')].map((o) => o.dataset.lcsFopt), ok = [...e.querySelectorAll('[data-lcs-fopt][data-lcs-ok]')];
            if (opts.slice().sort().join() !== [x.s, x.ed, x.ing].sort().join() || ok.length !== 1 || ok[0].dataset.lcsFopt !== right) fails.push(`"${t}": not the three forms of ${s.base} with ${right} marked`);
            const copy = e.querySelector('[data-lcs-fittext]').cloneNode(true); copy.querySelectorAll('[data-lcs-pills]').forEach((p) => p.replaceWith('___'));
            if (copy.textContent.replace(/\s+/g, '') !== t.replace(/\s+/g, '')) fails.push(`"${t}" is not printed as the bank has it`);
            e.querySelectorAll('[data-lcs-fopt]').forEach((o) => { const ringed = cs(o).borderTopColor === TEAL; if (isKey ? ringed !== !!o.dataset.lcsOk : ringed) fails.push('a form is ringed on the page of the child, or the key rings the wrong one'); if (fs(o) < 20) fails.push('a form to circle is smaller than 20 px'); });
            const lh = parseFloat(cs(e.querySelector('[data-lcs-fittext]')).lineHeight); if (R(e.querySelector('[data-lcs-fittext]')).height > lh * 1.5) fails.push(`"${t}" runs to two lines`);
            const pt = e.querySelector('[data-lcs-ptail]'), prev = pt && pt.previousElementSibling;
            if (pt && prev && Math.abs(R(pt).left - R(prev).right) > 1.5) fails.push(`the period of "${t}" does not stand tight after the last form`);
            at.push(opts.indexOf(right)); forms.push(s.form); bases.push(s.base);
            if (opts.every((o) => o === right || o.length < right.length)) longest++; });
          if (ss.length && !placesOk(at, 3)) fails.push('the right form stands at a fixed place, in a staircase, or alternating: ' + at.join(''));
          if (ss.length && (!kindsOk(forms.map((x) => x[0]).join('')) || ['s', 'ed', 'ing'].some((x) => !forms.includes(x)))) fails.push('the forms asked for are not mixed: ' + forms.join(','));
          if (longest > Math.floor(ss.length / 2)) fails.push(`the right form is the longest of its three in ${longest} of ${ss.length} sentences: found by length`);
          const fw = [...root.querySelectorAll('[data-lcs-fitwrite]')], fforms = [];
          if (fw.length !== (d.write || 0)) fails.push(`${fw.length} sentences to write in, not ${d.write || 0}`);
          fw.forEach((e) => { const t = e.dataset.lcsFitwrite, s = INFO.sentences[t];
            if (!s || !s.lv.includes(lv) || s.base !== e.dataset.lcsBase || s.form !== e.dataset.lcsForm) { fails.push(`"${t}" is no sentence of level ${lv}`); return; }
            const right = INFO.bases[s.base][s.form], l = e.querySelector('[data-lcs-blankgroup] [data-lcs-line]'), chip = e.querySelector('[data-lcs-basechip]');
            if (!chip || txt(chip) !== s.base) fails.push(`"${t}" does not show its base word in a box`);
            if (!l || (isKey ? l.dataset.lcsAnswer !== right : l.dataset.lcsAnswer)) fails.push(`the row of "${t}" is not keyed to ${right}`);
            const copy = e.cloneNode(true); copy.querySelectorAll('[data-lcs-badge], [data-lcs-basechip]').forEach((x) => x.remove()); copy.querySelectorAll('[data-lcs-blankgroup] [data-lcs-line]').forEach((x) => x.replaceWith('___'));
            if (copy.textContent.replace(/\s+/g, '') !== t.replace(/\s+/g, '')) fails.push(`"${t}" is not printed as the bank has it`);
            const tl = e.querySelector('[data-lcs-tail]'); if (tl && l && Math.abs(R(tl).left - R(l).right) > 1.5) fails.push(`the period of "${t}" does not stand tight after its row`);
            if (R(e).height > CFG.ROW + 14) fails.push(`"${t}" runs to two lines`);
            fforms.push(s.form); bases.push(s.base); });
          if (fw.length && (!kindsOk(fforms.map((x) => x[0]).join('')) || ['s', 'ed', 'ing'].some((x) => !fforms.includes(x)))) fails.push('the forms to write are not mixed: ' + fforms.join(','));
          if (new Set(bases).size !== bases.length) fails.push('a base word stands twice on the page');
          if (lv === 2 && !fw.some((e) => e.dataset.lcsForm === 's' && (INFO.bases[e.dataset.lcsBase] || {}).kind === 'es')) fails.push('level 2 has no word the child writes with -es');
          // no sentence prints a form of another base word of the page
          { const all = new Set(bases.flatMap((bse) => [bse, ...formsOf(bse)])); [...ss.map((e) => e.dataset.lcsFit), ...fw.map((e) => e.dataset.lcsFitwrite)].forEach((t) => { if (toks(t.replace('___', ' ')).some((v) => all.has(v))) fails.push(`"${t}" prints a word or form of another item of the page`); }); }
          const ow = [...root.querySelectorAll('[data-lcs-own]')];
          if (ow.length !== (d.own || 0)) fails.push(`${ow.length} sentences of the child's own, not ${d.own || 0}`);
          if (d.own) {
            // a box of six action words over the -ed and the -ing starter, a box of six naming words (one or more with -es) over
            // the -s starter; every starter has two rows; the key's sample is a word of the box with its ending
            const box = (k) => [...root.querySelectorAll(`[data-lcs-ownbox="${k}"] [data-lcs-ownword]`)].map((e) => e.dataset.lcsOwnword);
            const verbs = box('verbs'), nouns = box('nouns'), O = INFO.own;
            if (verbs.length !== 6 || new Set(verbs).size !== 6 || verbs.some((v) => !O.verbs[v])) fails.push('the box of action words is not six words of the bank');
            if (nouns.length !== 6 || new Set(nouns).size !== 6 || nouns.some((n) => !O.nouns[n]) || !nouns.some((n) => /(s|x|sh|ch)$/.test(n))) fails.push('the box of naming words is not six words of the bank with one that adds -es');
            const order = [...root.querySelectorAll('[data-lcs-ownbox], [data-lcs-own]')].map((e) => e.dataset.lcsOwnbox || e.dataset.lcsOwn).join();
            if (order !== 'verbs,ed,ing,nouns,s') fails.push('the boxes do not stand over their starters: ' + order);
            root.querySelectorAll('[data-lcs-ownbox]').forEach((b) => { const nt = b.querySelector('[data-lcs-boxnote]'); if (isKey ? !nt || !/^\(Sample\. Any word from the box with -(ed or -ing|s or -es) is right\.\)$/.test(txt(nt)) : !!nt) fails.push('the key does not say which words of the box are right, or the page of the child does'); });
            ow.forEach((e) => { const o = O.starters.find((x) => x.form === e.dataset.lcsOwn), ls = [...e.querySelectorAll('[data-lcs-line]')], lead = e.querySelector('[data-lcs-lead]');
              if (!o || !lead || txt(lead) !== o.lead) { fails.push('a starter of the child\'s own sentences is not one of the bank'); return; }
              if (ls.length !== 2 || R(ls[1].querySelector('svg')).width < R(e).width - 2) fails.push(`"${o.lead}" has not two rows, the second the width of the page`);
              const a = ls[0] && ls[0].dataset.lcsAnswer;
              const okSample = o.form === 's' ? nouns.some((n) => a === O.nouns[n][1]) : verbs.some((v) => a === O.verbs[v][o.form === 'ed' ? 0 : 1]);
              if (isKey ? !okSample || !ls[0].dataset.lcsKeySample : !!a || (ls[1] && ls[1].dataset.lcsAnswer)) fails.push(`the key of "${o.lead}" is no sample made from a word of its box, or the page of the child shows it`); });
            if (ow.map((e) => e.dataset.lcsOwn).sort().join() !== 'ed,ing,s') fails.push('the starters do not ask for -s, -ed, and -ing');
          }
        }
        return fails;
      }, LEVELS, INFO, { ROW, ROW_FLOOR, BAND, GLUE, COLS });
    },
  };
}

module.exports = { makeWordMeaningsG1Type, wmFaultsOf, drawPage, LEVELS, INSTR, LINES, HEADS, COLS, KEY_PX, emOf, fitsTable, kindBySpelling };
