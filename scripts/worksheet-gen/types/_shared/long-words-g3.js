/**
 * long-words-g3.js — eight Grade 3 pages of the unit "Reading Long Words" (English literacy year, Daily Teaching System
 * Part 12.3, 2026-11-18). The words and texts are data/literacy/long-words-g3.en.json (written by the scratch script
 * x-g3long/bank.js). PDF only, letter portrait, no picture.
 *
 *   co        G3-512 Closed and Open Syllables (RF.3.3.c, day 1 of "Closed and open syllables"): 1. sixteen two-syllable
 *             words: draw the line between the syllables and write C (closed) or O (open) in a box for each syllable
 *             (the boxes stand under the word as a group, never under its syllables, so they do not show the split; the
 *             key draws the line and writes the letters); 2. six sentences, each with three words of the level to choose
 *             from (a word is offered once a page). Level 1: two consonants between the vowels (rab|bit; hip|po);
 *             level 2: an open first syllable (ro|bot, so|lo, pro|gram), and three or four level-1 words split again
 *             (muf|fin), so the first box is a choice too; level 3: ONE consonant between the vowels, split
 *             before it (pi|lot) or after it (lem|on): the child tries the long vowel first.
 *   cosort    G3-513 Closed or Open? Sort Long Words (days 2 and 3): 1. printed words to write under two bars, "closed
 *             first syllable: short vowel" and "open first syllable: long vowel", each with a line between its syllables
 *             (the key: "any order"); 2. yes-or-no sentences. Level 1: eight words (two consonants in the middle, or
 *             one after an open syllable); level 2: ten words, two or more with one consonant and a closed first
 *             syllable (cam|el); level 3: nine words with one consonant in the middle and one word whose first vowel is
 *             neither short nor long (oven), crossed out.
 *   types     G3-514 Silent-e, Vowel-Team, and Consonant-le Syllables (RF.3.3.c): 1. words to split, each syllable typed
 *             C, O, E (silent e), V (vowel team), or L (consonant-le) in its box; 2. a sort of twelve words. Level 1:
 *             consonant-le words, sorted by the first vowel (short or long); level 2: consonant-le and silent-e words,
 *             sorted by the type of the last syllable; level 3: three-syllable words to split, a sort into three types.
 *   typebuild G3-515 Build Long Words from Syllables (day 2): 1. a first part on each row and a box of second parts: each
 *             first part makes a word with exactly one part of the box, two parts make no word with any; the child writes
 *             the part and the whole word; 2. yes-or-no sentences. Level 1 consonant-le, level 2 silent e and
 *             consonant-le, level 3 two smaller words (bumble + bee).
 *   suffix    G3-516 Base Words and Suffixes (RF.3.3.a, the lesson "Suffixes -able, -ment, -ness, -ful, -less"): 1. twelve words: circle the base, underline the
 *             suffix; 2. four words to match to their meanings (two words of one base in each pair, so the suffix must be
 *             read); 3. sentences with a 250 px line for the word, the base and suffix (the cue) under the line (level 1:
 *             two or more of each suffix); a word whose base carries a suffix of its own (friendliness) is never a word to
 *             circle the base of, and a word that does not mean what its suffix means (wonderful) never stands in a meaning
 *             task. Level 1 -ful and -less; level
 *             2 also -ness and -ment; level 3 all five and bases that change (happy -> happiness, love -> lovable).
 *   suffix2   G3-517 Which Word Fits? Suffixes in Sentences (day 2): 1. sentences with two words of one base: circle the
 *             one that fits (the sentence decides; the other was tested against it); 2. three words to build, each with
 *             what it means (the key's meanings are samples). Level 1 -ful/-less, level 2 -ness/-ment against the base,
 *             level 3 -able and bases that change.
 *   heart     G3-518 Heart Words: enough, though, ocean (RF.3.3.d): 1. heart words in sound boxes: write the letters of
 *             each sound in a box (a silent letter shares the box of its neighbour: i | sl | a | n | d) and draw a heart
 *             over the tricky part; levels 1 and 2 size each box by its letters, level 3 prints every box one width, wide
 *             enough for ough; a fold line; 2. sentences with a missing heart word, written from memory (level 1: its first
 *             letter on the line). Level 1 four words, six sentences; level 2 eight words, six sentences; level 3 six
 *             words, four sentences, and a sentence of the child's own.
 *   ough      G3-519 The Sounds of ough: Sort the Words (day 2): 1. ough words to write under the sound their ough makes
 *             (bars: "ough says uff, as in puff", "o, as in go", "aw, as in saw"); level 1 two sounds, level 2 three,
 *             level 3 three and one word of another ough sound (through or drought), crossed out; 2. yes-or-no sentences with other ough
 *             words. The words are read whole, never sounded out.
 *
 * Rules every page keeps: one right answer (a sentence names in the bank every other word of its level that fits it,
 * and none of those is offered with it; two words of one base are tested both ways); no answer printed elsewhere on its
 * page; answer places in no pattern (never a staircase, never every other one, never three alike in a row); a page
 * prints no word that breaks the rule it teaches (checked when this file loads: a two-syllable word on a closed/open page
 * is a word of the lists or judged by hand; no silent e that does not make the vowel long on a syllable-type page; no
 * word that ends in a suffix's letters without being that suffix on a suffix page; no other ough word on a heart page).
 * A word of the bank an instruction prints is never a task word of that type, on any level (SAYT). A blank and the mark
 * after it never part at a line end; letter boxes are 43 px; a writing line holds its answer in the key's 19 px letters;
 * no blank band higher than 40 px stands between the tasks or inside one (verify() measures all three).
 * Writing lines are the single-rule lines of Grade 3 paper (34 px). Ligatures are off, and an f before i, f, l, or t
 * and a t before t get room of their own. The instruction of each level is INSTR (registered as strings; verify() reads
 * it on the page). English only; themeless. The bank is checked when this file loads (faultsOf), including that every
 * level can draw its pages.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/long-words-g3.en.json');
const { _parts } = require('./info-text.js');
const { W, shuffle } = _parts;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ROWH = 34;                                    // a writing line (Grade 3: one baseline; 34 px = 0.43 in on Letter paper)
const MARKBOX = 43;                                 // a box for one letter (C, O, a syllable type, a meaning): 0.45 in
const BUILDLINE = 250;                              // G3-516 task 3: a line for a word with its suffix (friendliness, announcement), 2.6 in
const BAND = 40;                                    // no blank band higher than this between the tasks or inside one
const MODES = ['co', 'cosort', 'types', 'typebuild', 'suffix', 'suffix2', 'heart', 'ough'];
/** the page instruction of every level (registered as strings with add-strings.js; verify() reads it on the page) */
const INSTR = {
  co: { 1: 'A closed syllable ends with a consonant, and its vowel is short: nap | kin.', 2: 'An open syllable ends with a vowel, and the vowel says its name: ro | bot.', 3: 'Try the long vowel first: ro | bot. Not a word? Try the short: cam | el.' },
  cosort: { 1: 'Two consonants in the middle? The first syllable is closed: rab | bit.', 2: 'A closed syllable has a short vowel; an open syllable has a long vowel.', 3: 'One consonant? Try the long vowel, then the short: pi | lot, lem | on.' },
  types: { 1: 'A consonant-le syllable is a consonant plus le. Count back three letters from le: ta | ble.', 2: 'A silent e makes the vowel before it long: cup | cake.', 3: 'A long word can mix the syllable types: bum | ble | bee.' },
  typebuild: { 1: 'A consonant-le syllable is a consonant plus le: can + dle = candle.', 2: 'Put the syllables together and read the whole word: cup + cake = cupcake.', 3: 'A long word can be two smaller words: bumble + bee = bumblebee.' },
  suffix: { 1: 'A suffix changes a word: -ful means full of, and -less means without.', 2: 'A suffix at the end changes the word: kind + ness = kindness.', 3: 'Before -able, drop a silent e: lovable. After a consonant, change y to i: happy, happiness.' },
  suffix2: { 1: '-ful means full of, and -less means without: careful, careless.', 2: '-ness and -ment make nouns: soft, softness; move, movement.', 3: 'After a consonant, change y to i: happy, happiness. -able means can be: washable.' },
  heart: { 1: 'A heart word has a tricky part. We learn that part by heart.', 2: 'A heart word has a tricky part. We learn that part by heart.', 3: 'A heart word has a tricky part. We learn that part by heart.' },
  ough: { 1: 'The letters ough can spell different sounds: uff, o, and aw.', 2: 'The letters ough can spell different sounds: uff, o, and aw.', 3: 'The letters ough can spell many sounds. Read each word and listen.' },
};
/** the words of the bank each instruction prints (examples, and "open" of "an open syllable"). None of them is a task word
 *  of its TYPE on any level (SAYT): a teacher who shows the level-1 example never finds it as a level-3 answer. The bank's
 *  check reads the instructions and fails on a bank word of an instruction that is missing here. */
const SAY = {
  co: { 1: ['napkin'], 2: ['open', 'robot'], 3: ['robot', 'camel'] },
  cosort: { 1: ['rabbit'], 2: ['open'], 3: ['pilot', 'lemon'] },
  types: { 1: ['table'], 2: ['cupcake'], 3: ['bumblebee'] },
  typebuild: { 1: ['candle'], 2: ['cupcake'], 3: ['bumblebee'] },
  suffix: { 1: [], 2: ['kind', 'kindness'], 3: ['lovable', 'happy', 'happiness'] },
  suffix2: { 1: ['careful', 'careless'], 2: ['soft', 'softness', 'move', 'movement'], 3: ['happy', 'happiness', 'washable'] },
  heart: { 1: [], 2: [], 3: [] },
  ough: { 1: [], 2: [], 3: [] },
};
const SAYT = Object.fromEntries(Object.entries(SAY).map(([m, o]) => [m, [...new Set(Object.values(o).flat())]]));
/** the words of the bank an instruction prints: its syllables joined (nap | kin -> napkin), every word read */
const instrWords = (t) => tokens(String(t).replace(/\s*\|\s*/g, ''));
/** the task lines (the page rules read them too) */
const LINES = {
  splitCo: 'Read each word. Draw a line between its two syllables. Write C or O in a box for each syllable.',
  legendCo: 'C closed: ends with a consonant, short vowel · O open: ends with a vowel, long vowel',
  splitTy: 'Read each word. Draw a line between its syllables. Write the letter of each syllable\'s type in a box.',
  legendTy: 'C closed · O open · E silent e · V vowel team · L consonant-le',
  choose3: 'Read each sentence. Circle the word that fits.',
  sortCo: 'Read each word. Write it under its head with a line between its syllables. Cross out each word when you write it.',
  sortTy1: 'Read each word. Is its first vowel short or long? Write it under its head. Cross out each word when you write it.',
  sortTy: 'Read each word. What type is its last syllable? Write it under its head. Cross out each word when you write it.',
  sortOugh: 'Read each word. Write it under the sound its ough makes. Cross out each word when you write it.',
  crossCo: 'One word fits under neither head: cross it out.',
  crossOugh: 'One word has another ough sound: cross it out.',
  yesno: 'Read each sentence. Circle yes or no.',
  join: 'Find the part in the box that makes a word with the first part. Write the part, then the whole word.',
  parts: 'Read each word. Circle the base word. Underline the suffix.',
  parts3: 'Circle the base word, or what is left of it. Underline the suffix.',
  match: 'Read each word. Write the letter of its meaning in the box.',
  build: 'Add the suffix to the base word. Write the new word in the sentence.',
  pick2: 'Read each sentence. Circle the word that fits.',
  makeit: 'Add the suffix. Write the new word. Then write what it means.',
  // (2026-11-19, review en-1119-lit) EACH tricky part: enough, laugh, ocean, busy have two, and the key hearts them all (the
  // line keeps the length of the old one: one more letter wrapped it and pushed the page past its foot)
  heartbox: 'Write the letters of each sound in a box. Put a heart over each tricky part.', fold: 'Fold the top back.',
  heartsent: 'Read each sentence. Write the heart word that fits. Its first letter is on the line.', heartsent2: 'Read each sentence. Write the heart word that fits.', own: 'Open the page again. Write a sentence of your own with two heart words from the top.',
};
/** the bars that head the columns of a sort */
const HEADS = {
  cosort: { C: 'closed first syllable: short vowel', O: 'open first syllable: long vowel' },
  types1: { short: 'first vowel short', long: 'first vowel long' },
  types: { L: 'last syllable: consonant-le', E: 'last syllable: silent e', V: 'last syllable: vowel team' },
  ough: { uff: 'ough says uff, as in puff', o: 'ough says o, as in go', aw: 'ough says aw, as in saw' },
};

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
// tasks: in page order, [kind, count]; the rest are sizes
const LEVELS = {
  co: {
    1: { tasks: [['split', 16], ['choose3', 6]], cols: 4, sfont: 24, cfont: 19, pad: 7 },
    2: { tasks: [['split', 16], ['choose3', 6]], cols: 4, sfont: 24, cfont: 19, pad: 7 },
    3: { tasks: [['split', 16], ['choose3', 6]], cols: 4, sfont: 24, cfont: 19, pad: 7 },
  },
  cosort: {
    1: { tasks: [['sort', 8], ['yesno', 5]], lines: 5, yfont: 20, pad: 9 },
    2: { tasks: [['sort', 10], ['yesno', 6]], lines: 6, yfont: 20, pad: 8 },
    3: { tasks: [['sort', 10], ['yesno', 6]], lines: 6, cross: 1, yfont: 20, pad: 8 },
  },
  types: {
    1: { tasks: [['split', 12], ['sort', 10]], cols: 4, sfont: 25, lines: 6, pad: 7 },
    2: { tasks: [['split', 12], ['sort', 10]], cols: 4, sfont: 25, lines: 6, pad: 7 },
    3: { tasks: [['split', 9], ['sort', 12]], cols: 3, sfont: 25, lines: 5, pad: 7 },
  },
  typebuild: {
    1: { tasks: [['join', 6], ['yesno', 8]], extra: 1, yfont: 20, pad: 9 },
    2: { tasks: [['join', 6], ['yesno', 8]], extra: 2, yfont: 20, pad: 9 },
    3: { tasks: [['join', 6], ['yesno', 8]], extra: 2, yfont: 20, pad: 9 },
  },
  suffix: {
    1: { tasks: [['parts', 12], ['match', 4], ['build', 5]], pfont: 23, pad: 7 },
    2: { tasks: [['parts', 12], ['match', 4], ['build', 5]], pfont: 23, pad: 7 },
    3: { tasks: [['parts', 12], ['match', 4], ['build', 5]], pfont: 22, pad: 7 },
  },
  suffix2: {
    1: { tasks: [['pick2', 7], ['makeit', 3]], cfont: 20, pad: 9 },
    2: { tasks: [['pick2', 7], ['makeit', 3]], cfont: 20, pad: 9 },
    3: { tasks: [['pick2', 7], ['makeit', 3]], cfont: 20, pad: 9 },
  },
  heart: {
    1: { tasks: [['heartbox', 4], ['heartsent', 6]], cols: 2, hbox: 46, hfont: 24, pad: 8 },
    2: { tasks: [['heartbox', 8], ['heartsent', 6]], cols: 2, hbox: 38, hfont: 22, pad: 6 },
    3: { tasks: [['heartbox', 6], ['heartsent', 4], ['own', 1]], cols: 1, hbox: 38, hfont: 22, pad: 6, uw: 76, lw: 100 },
  },
  ough: {
    1: { tasks: [['sort', 6], ['yesno', 5]], groups: 2, lines: 4, yfont: 20, pad: 9 },
    2: { tasks: [['sort', 8], ['yesno', 6]], groups: 3, lines: 4, yfont: 20, pad: 8 },
    3: { tasks: [['sort', 9], ['yesno', 6]], groups: 3, lines: 4, cross: 1, yfont: 20, pad: 8 },
  },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
const tokens = (text) => (String(text).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []).map((w) => w.replace(/'s$/, ''));
const hasWord = (text, w) => tokens(text).includes(String(w).toLowerCase());
const staircase = (idx) => idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1));
const alternating = (p, m) => m === 2 && p.length >= 3 && p.every((x, i) => !i || x !== p[i - 1]);
/** places among m for n items: every place used where n allows, never a staircase, never every other one, never three alike
 *  in a row, and no place holding more than 6 in 10 of the answers (half of them among three) */
/** the most answers one place may hold: 6 in 10 among two, half among three; `cap` lowers it (G3-517: 4 of 7) */
const placeMax = (n, m, cap) => Math.min(cap || Infinity, Math.ceil((m === 2 ? 0.6 : 0.5) * n));
const tooMany = (p, m, cap) => p.length >= 4 && Math.max(...Array.from({ length: m }, (_, k) => p.filter((x) => x === k).length)) > placeMax(p.length, m, cap);
function places(n, m, rng, cap) { for (let k = 0; k < 600; k++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (new Set(p).size < Math.min(n, m) || staircase(p) || alternating(p, m) || tooMany(p, m, cap) || p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue; return p; } throw new Error(`no places for ${n} answers among ${m}`); }
/** G3-517: the right word stands in one place in at most 4 of its 7 sentences */
const PICK_CAP = 4;
/** an order of the column keys of a sort (one key a word): never three alike in a row, never every other one all the way */
const sortOrderOk = (cols) => !cols.some((x, i) => i >= 2 && x === cols[i - 1] && x === cols[i - 2]) && !cols.every((x, i) => !i || x !== cols[i - 1]);
/** a word that starts with a vowel SOUND takes an (an acorn); u- words that start with the sound of you take a */
const vowelSound = (w) => /^[aeiou]/.test(w) && !/^u[^aeiou][aeiou]/.test(w) && !/^eu/.test(w);
/** the consonant-vowel shape of a word: v a vowel letter (y after a consonant, w after a vowel), c a consonant or a digraph */
function skeleton(w) { let s = '', i = 0; while (i < w.length) { if (/^(ch|sh|th|ph|wh|ck|ng)$/.test(w.slice(i, i + 2))) { s += 'c'; i += 2; continue; } const c = w[i], pv = s.endsWith('v'); s += /[aeiou]/.test(c) ? 'v' : c === 'y' ? (i > 0 && !pv ? 'v' : 'c') : c === 'w' && pv ? 'v' : 'c'; i++; } return s; }
/** a word with ONE vowel letter, ONE consonant, and a vowel (ro-bot, sev-en): its first syllable may be open or closed. A
 *  one-syllable word with a silent e (time, lives, shaped) is none. */
const isVCV = (w0) => { const w = w0.length > 4 ? w0.replace(/(?<=[^aeiou])(?:es|ed|s)$/, '') : w0; if (/^[^aeiouy]*[aeiou][^aeiouy]{1,2}e$/.test(w)) return false; return /^c*vcv/.test(skeleton(w)); };

/* ---------------------------------------------------------------- what a page may print ---------------------------------------------------------------- */
/** words with one consonant between two vowels that an open-syllable page (G3-512 level 2, G3-513 level 1) may print beside
 *  the words of its lists: each is judged by hand to have an open first syllable with its long vowel (pa-per, o-cean) or to be a
 *  word the page cannot teach wrong; every other such word (sev-en, riv-er, ver-y, wa-ter) is refused there */
const CO_OK = ['over', 'ocean', 'baby', 'tiny', 'riders', 'paper'];
/** words with two consonants after a long first vowel (ze-bra): never on a closed-syllable page */
const LONG_VCCV = ['zebra', 'cobra', 'secret', 'apron', 'program', 'april', 'acre', 'sacred', 'macro', 'hydrant'];
/** a silent e that does not make the vowel before it long: never printed on a syllable-type page */
const NEVER_VCE = ['come', 'comes', 'some', 'have', 'give', 'gives', 'live', 'love', 'done', 'gone', 'one', 'none', 'were', 'where', 'there', 'here', 'move', 'lose', 'whose', 'sure', 'are', 'once', 'above', 'glove', 'shove', 'dove', 'eye', 'come'];
/** words that end in le without a consonant-le syllable of three letters (a silent t, ck before le): never on a syllable-type page */
const NEVER_CLE = ['castle', 'whistle', 'thistle', 'hustle', 'bustle', 'wrestle', 'nestle', 'pickle', 'tickle', 'buckle', 'freckle', 'chuckle', 'crackle', 'trickle', 'sparkle', 'people'];
/** words that end in the letters of a suffix without being that suffix (table, cement): never on a suffix page */
const SUFFIX_OK = ['full', 'less', 'unless', 'bless'];

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(b) {
  const f = [];
  const sentenceOk = (t) => typeof t === 'string' && /^[A-Z"][^]*[.!?"]$/.test(t) && t.split('___').length === 2 && !/^___/.test(t);
  // closed and open syllables
  const C = b.co || {};
  for (const lv of [1, 2, 3]) {
    const ws = (C.levels || {})[lv] || [];
    if (ws.length < 30) f.push(`co level ${lv}: fewer than thirty words`);
    if (new Set(ws.map((x) => x.w)).size !== ws.length) f.push(`co level ${lv}: a word twice`);
    ws.forEach((x) => {
      if (!Array.isArray(x.parts) || x.parts.length !== 2 || x.parts.join('') !== x.w || x.parts.some((p) => !/[aeiouy]/.test(p))) f.push(`co: "${x.w}" is not two syllables with a vowel each`);
      if (!Array.isArray(x.marks) || x.marks.length !== 2) { f.push(`co: "${x.w}" has no mark for each syllable`); return; }
      // the mark is the syllable's own spelling: closed ends with a consonant, open with a vowel
      x.parts.forEach((p, i) => { if ((x.marks[i] === 'O') !== /[aeiouy]$/.test(p) || !'CO'.includes(x.marks[i])) f.push(`co: the ${i + 1}. syllable of "${x.w}" is not marked by how it ends`); });
      // the kind of the level
      const mid = x.w.slice(x.w.search(/[aeiou]/)).match(/^[aeiou]+([^aeiouy]+)[aeiouy]/);
      const nCons = mid ? mid[1].replace(/ch|sh|th|ph|ck/g, '#').length : -1;
      if (lv === 1 && !(x.marks[0] === 'C' && nCons >= 2)) f.push(`co level 1: "${x.w}" has not two consonants between its vowels and a closed first syllable`);
      if (lv === 2 && x.marks[0] !== 'O') f.push(`co level 2: "${x.w}" has no open first syllable`);
      if (lv === 3 && nCons !== 1) f.push(`co level 3: "${x.w}" has not one consonant between its vowels`);
    });
    (C.say[lv] || []).forEach((w) => { if (!ws.some((x) => x.w === w)) f.push(`co level ${lv}: the example "${w}" is no word of the level`); });
    const words = new Set(ws.map((x) => x.w));
    const ss = (C.sentences || {})[lv] || [];
    if (ss.length < 24) f.push(`co level ${lv}: fewer than 24 sentences`);
    ss.forEach((s) => {
      if (!sentenceOk(s.text) || s.text.length > 58) f.push(`co: "${s.text}" has not one blank inside a short sentence`);
      if (!words.has(s.right) || !Array.isArray(s.fits) || s.fits.some((x) => !words.has(x) || x === s.right)) f.push(`co: "${s.text}": its answer or its fits are no words of the level`);
      if (tokens(s.text.replace('___', ' ')).some((w) => words.has(w))) f.push(`co: "${s.text}" prints a word of its level`);
    });
    if (new Set(ss.map((s) => s.text)).size !== ss.length) f.push(`co level ${lv}: a sentence twice`);
  }
  // G3-512 level 2: level-1 words split again (a closed first syllable: the first box is a choice)
  const rv = ((C.review || {})[2]) || [];
  if (rv.length < 8) f.push('co level 2: fewer than eight level-1 words to split again');
  rv.forEach((x) => { if (!(C.levels[1] || []).some((y) => y.w === x.w && y.parts.join('|') === x.parts.join('|') && y.marks.join('') === x.marks.join('')) || x.marks[0] !== 'C' || (C.levels[2] || []).some((y) => y.w === x.w)) f.push(`co level 2: "${x.w}" to split again is no level-1 word with a closed first syllable`); });
  // G3-513
  const CS = b.cosort || {};
  for (const lv of [1, 2, 3]) {
    const all = new Set([...(C.levels[1] || []), ...(C.levels[2] || []), ...(C.levels[3] || [])].map((x) => x.w));
    ((CS.levels || {})[lv] || []).forEach((w) => { if (!all.has(w)) f.push(`cosort level ${lv}: "${w}" is no closed/open word`); });
    const ys = (CS.yesno || {})[lv] || [];
    if (ys.length < 16) f.push(`cosort level ${lv}: fewer than sixteen yes/no sentences`);
    ys.forEach((s) => { if (!['yes', 'no'].includes(s.a) || !/^[A-Z][^]*[.!?]$/.test(s.text) || !tokens(s.text).some((w) => CS.levels[lv].includes(w))) f.push(`cosort level ${lv}: "${s.text}" is no yes/no sentence with a word of the level`); });
  }
  if ((CS.neither || []).length < 3 || CS.neither.some((x) => all3(b).has(x.w))) f.push('cosort: fewer than three words that fit neither head, or one of them is a word of the lists');
  // syllable types
  const TY = b.ty || {};
  const kindOk = (p, m, i, n) => m === 'L' ? /^[^aeiouy]le$/.test(p) : m === 'E' ? /[aeiou][^aeiouy]e$/.test(p) && !/^[^aeiouy]le$/.test(p) : m === 'V' ? /(ai|ay|ee|ea|oa|ow|oo|igh|au|aw|oe|ew|ie|ue)/.test(p) : m === 'O' ? /[aeiou]$/.test(p) && !/(ai|ay|ee|ea|oa|ow|oo|au|aw|oe|ew)$/.test(p) : m === 'C' ? /[aeiouy][^aeiouy]+$/.test(p) && !/[aeiou][^aeiouy]e$/.test(p) && !/(ai|ay|ee|ea|oa|ow|oo|igh|au|aw|oe|ew)/.test(p) : false;
  const typeWord = (x, where) => {
    if (!Array.isArray(x.parts) || x.parts.join('') !== x.w || !Array.isArray(x.marks) || x.marks.length !== x.parts.length) { f.push(`${where}: "${x.w}" is not split into typed syllables`); return; }
    x.parts.forEach((p, i) => { if (!kindOk(p, x.marks[i], i, x.parts.length)) f.push(`${where}: the ${i + 1}. syllable of "${x.w}" (${p}) is not of the type ${x.marks[i]}`); });
  };
  for (const lv of [1, 2, 3]) {
    const ws = (TY.levels || {})[lv] || [];
    ws.forEach((x) => typeWord(x, `ty level ${lv}`));
    if (lv === 1 && ws.some((x) => x.marks.length !== 2 || x.marks[1] !== 'L')) f.push('ty level 1: a word that is no two-syllable consonant-le word');
    // (2026-11-19, review en-1119-lit) level 2 types a vowel-team syllable too: V stands in its legend and its title, and
    // no word of the level had one. Level 2: two syllables, one of them consonant-le, silent e, or a vowel team
    if (lv === 2 && ws.some((x) => x.marks.length !== 2 || !x.marks.some((m) => m === 'L' || m === 'E' || m === 'V'))) f.push('ty level 2: a word with neither a consonant-le, a silent-e, nor a vowel-team syllable');
    if (lv === 2 && ws.filter((x) => x.marks.includes('V')).length < 10) f.push('ty level 2: fewer than ten words with a vowel-team syllable');
    if (lv === 3 && ws.some((x) => x.marks.length !== 3 || !x.marks.some((m) => 'ELV'.includes(m)))) f.push('ty level 3: a word that is not three syllables with a silent-e, vowel-team, or consonant-le syllable');
    if (ws.length < (lv === 3 ? 18 : 40)) f.push(`ty level ${lv}: too few words`);
    if (new Set(ws.map((x) => x.w)).size !== ws.length) f.push(`ty level ${lv}: a word twice`);
    (TY.say[lv] || []).forEach((w) => { if (!ws.some((x) => x.w === w)) f.push(`ty level ${lv}: the example "${w}" is no word of the level`); });
    const pool = (TY.sortPool || {})[lv] || [];
    pool.forEach((x) => typeWord(x, `ty sort ${lv}`));
    const lastKinds = new Set(pool.map((x) => x.marks[x.marks.length - 1]));
    if (lv === 1 ? pool.some((x) => x.marks[1] !== 'L') : lv === 2 ? [...lastKinds].sort().join('') !== 'EL' : [...lastKinds].sort().join('') !== 'ELV') f.push(`ty sort ${lv}: the words do not end in the types of the level`);
    // level 1 sorts by a short or long first vowel: oo (noodle) does not say the name of o, so it is never sorted
    if (lv === 1 && pool.some((x) => /^[^aeiou]*oo/.test(x.w))) f.push('ty sort 1: an oo word (noodle) is sorted by a long first vowel, but oo does not say the name of o');
    // level 3: no silent e that a child reads in a part (apple|sauce: sauce ends in a silent e) and no oe (tiptoe)
    if (lv === 3 && pool.some((x) => /oe$/.test(x.w) || x.parts.some((p, i) => i === x.parts.length - 1 && x.marks[i] !== 'E' && /[^aeiou]e$/.test(p) && !/le$/.test(p)))) f.push('ty sort 3: a word whose last syllable ends in an e of another type (sauce, toe)');
    // G3-515: every word is its two parts; every join is real
    const bl = (TY.build || {})[lv] || [];
    bl.forEach(([a, c, w]) => { if (a + c !== w) f.push(`ty build ${lv}: ${a} + ${c} is not ${w}`); });
    bl.forEach(([a, c]) => { if (!((TY.joins || {})[lv] || []).some(([x, y]) => x === a && y === c)) f.push(`ty build ${lv}: ${a} + ${c} is missing from the joins`); });
    const ys = (TY.yesno || {})[lv] || [];
    if (ys.length < 16) f.push(`ty level ${lv}: fewer than sixteen yes/no sentences`);
    const lvWords = new Set([...ws.map((x) => x.w), ...pool.map((x) => x.w), ...bl.map((x) => x[2]), ...(lv === 3 ? ['rattle', 'candle', 'table', 'lemons', 'apples'] : [])]);
    ys.forEach((s) => { if (!['yes', 'no'].includes(s.a) || !/^[A-Z][^]*[.!?]$/.test(s.text) || !tokens(s.text).some((w) => lvWords.has(w))) f.push(`ty level ${lv}: "${s.text}" is no yes/no sentence with a word of the level`); });
  }
  // suffixes
  const S = b.suffix || {};
  const sw = S.words || [];
  sw.forEach((x) => {
    if (!['ful', 'less', 'ness', 'ment', 'able'].includes(x.suf) || x.shown + x.suf !== x.w) f.push(`suffix: "${x.w}" is not its circled part and its suffix`);
    const ch = x.change;
    if (ch === null ? x.shown !== x.base : ch === 'y' ? !(x.base.endsWith('y') && x.shown === x.base.slice(0, -1) + 'i') : ch === 'e' ? !(x.base.endsWith('e') && x.shown === x.base.slice(0, -1) && /^[aeiouy]/.test(x.suf)) : true) f.push(`suffix: the base of "${x.w}" does not change by the rule it names`);
    // a silent e is kept before a suffix that starts with a consonant; y after a vowel stays
    if (ch === null && /[^aeiou]y$/.test(x.base)) f.push(`suffix: "${x.w}" keeps a y that should change to i`);
    if (ch === null && x.base.endsWith('e') && /^[aeiouy]/.test(x.suf)) f.push(`suffix: "${x.w}" keeps a silent e before a vowel`);
    if (!x.meaning || !x.sentence || !sentenceOk(x.sentence) || x.sentence.length > 46 || hasWord(x.sentence.replace('___', ' '), x.w)) f.push(`suffix: "${x.w}" has no meaning or no sentence with one blank`);
    // the meaning is the meaning of the suffix (full of, without, being), or the word is marked odd and never in a meaning task
    const want = { ful: /^full of /, less: /^without /, ness: /^being / }[x.suf];
    if (want && !want.test(x.meaning) && !x.odd) f.push(`suffix: the meaning of "${x.w}" ("${x.meaning}") is not the meaning of -${x.suf}, and the word is not marked odd`);
  });
  if (new Set(sw.map((x) => x.w)).size !== sw.length) f.push('suffix: a word twice');
  const byW = Object.fromEntries(sw.map((x) => [x.w, x]));
  Object.values(S.pairs || {}).flat().forEach((p) => { if (p.length !== 2 || p.some((w) => !byW[w] || byW[w].odd || byW[w].two) || byW[p[0]].base !== byW[p[1]].base || byW[p[0]].suf === byW[p[1]].suf) f.push(`suffix: the pair ${p.join('/')} is not two words of one base (with the meanings of their suffixes)`); });
  for (const lv of [1, 2, 3]) {
    ((S.pick || {})[lv] || []).forEach(([t, r, o]) => {
      if (!sentenceOk(t) || t.length > 58) f.push(`suffix: "${t}" has not one blank inside a short sentence`);
      const base = (w) => (byW[w] ? byW[w].base : w);
      if (base(r) !== base(o) || r === o || hasWord(t.replace('___', ' '), r) || hasWord(t.replace('___', ' '), o)) f.push(`suffix: "${t}" does not offer two words of one base, or prints one`);
      if (lv < 3 && [r, o].some((w) => byW[w] && byW[w].change)) f.push(`suffix level ${lv}: "${t}" offers a word whose base changes`);
      if ([r, o].some((w) => byW[w] && !S.levels[lv].includes(byW[w].suf))) f.push(`suffix level ${lv}: "${t}" offers a suffix the level does not read`);
    });
    if (((S.pick || {})[lv] || []).length < 14) f.push(`suffix level ${lv}: fewer than fourteen sentences to choose from`);
  }
  // heart words
  const H = b.heart || {};
  const hw = (H.words || []).map((x) => x.w);
  (H.words || []).forEach((x) => {
    if (!Array.isArray(x.boxes) || x.boxes.join('') !== x.w || x.boxes.some((p) => !p)) f.push(`heart: the boxes of "${x.w}" do not spell it`);
    if (!Array.isArray(x.heart) || !x.heart.length || x.heart.length > 2 || x.heart.some((i) => !x.boxes[i])) f.push(`heart: "${x.w}" has no heart box`);
    const ss = (H.sentences || {})[x.w] || [];
    if (ss.length < 2) f.push(`heart: fewer than two sentences for "${x.w}"`);
    ss.forEach(([t, fits = []]) => { if (!sentenceOk(t) || t.length > 50 || hw.some((y) => hasWord(t.replace('___', ' '), y)) || fits.some((y) => !hw.includes(y) || y === x.w)) f.push(`heart: "${t}" has not one blank, prints a heart word, or names odd words that fit`); });
    // the ough words are learned whole: one box for ough when it says one sound
    if (/ough/.test(x.w) && !x.boxes.includes('ough') && !(x.boxes.includes('ou') && x.boxes.includes('gh'))) f.push(`heart: the ough of "${x.w}" is split oddly`);
  });
  (H.always || []).forEach((w) => { if (!hw.includes(w)) f.push(`heart: "${w}" is no heart word`); });
  // ough
  const O = b.ough || {};
  const og = Object.values(O.groups || {}).flat(), oo = (O.other || []).map((x) => x.w), ox = O.extra || [];
  if (Object.keys(O.groups || {}).sort().join() !== 'aw,o,uff' || Object.values(O.groups).some((g) => g.length < 3)) f.push('ough: not three groups of three words or more');
  if ([...og, ...oo, ...ox].some((w) => !/ough/.test(w)) || new Set([...og, ...oo, ...ox]).size !== og.length + oo.length + ox.length) f.push('ough: a word without ough, or a word twice');
  // the word to cross out says a sound no child hears as uff, o, or aw (cough, "off", is close to aw for many children)
  if (oo.length < 2 || oo.includes('cough')) f.push('ough: fewer than two words to cross out, or cough among them');
  (O.yesno || []).forEach((s) => { const ow = tokens(s.text).filter((w) => /ough|augh/.test(w)); if (ow.length !== 1 || ![...og, ...oo, ...ox].includes(ow[0]) || !['yes', 'no'].includes(s.a)) f.push(`ough: "${s.text}" has not one ough word of the bank`); });
  // every word of the bank an instruction of a type prints is an example of that type (never one of its task words)
  const typeWords = {
    co: [1, 2, 3].flatMap((lv) => [...((C.levels || {})[lv] || []), ...((C.review || {})[lv] || [])]).map((x) => x.w),
    cosort: [...Object.values(CS.levels || {}).flat(), ...(CS.neither || []).map((x) => x.w)],
    types: [...Object.values(TY.levels || {}).flat(), ...Object.values(TY.sortPool || {}).flat()].map((x) => x.w),
    typebuild: [...Object.values(TY.levels || {}).flat().map((x) => x.w), ...Object.values(TY.build || {}).flat().map((x) => x[2])],   // whole words (a part is in the box on every page)
    suffix: sw.map((x) => x.w), suffix2: [...sw.map((x) => x.w), ...Object.values(S.pick || {}).flat().flatMap((p) => [p[1], p[2]])],   // a base alone is no task word of G3-516
    heart: hw, ough: [...og, ...oo, ...ox],
  };
  for (const mode of MODES) { const ws = new Set(typeWords[mode]); for (const lv of [1, 2, 3]) instrWords(INSTR[mode][lv]).forEach((w) => { if (ws.has(w) && !SAYT[mode].includes(w)) f.push(`${mode}: "${w}" of the level-${lv} instruction is no example of the type (it may be a task word)`); }); }
  f.push(...spellFaultsOf(b));
  if (f.length) return f;
  // every level can draw its pages: 50 seeded draws a level
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let k = 1; k <= 50; k++) {
    try { drawPage(b, mode, lv, makeRng(`g3long-check|${mode}|${lv}|${k}`)); } catch (e) { f.push(`${mode} level ${lv}: a page cannot be drawn (${e.message})`); break; }
  }
  return f;
}
function all3(b) { return new Set([1, 2, 3].flatMap((lv) => ((b.co || {}).levels || {})[lv] || []).map((x) => x.w)); }

/** The page rules for the words a page prints: closed/open pages print no two-syllable word that is not a list word or
 *  judged by hand; syllable-type pages print no silent e that keeps the vowel short and no le that is no consonant-le
 *  syllable; suffix pages print no word ending in a suffix's letters that is not that suffix; a heart page prints no
 *  other ough, augh, or eau word. Every text, task line, head, and instruction is read. */
function spellFaultsOf(b) {
  const f = [];
  const C = b.co || {}, CS = b.cosort || {};
  // an open-syllable page prints no word with one consonant between its vowels unless its first syllable is open (judged)
  const open = new Set([...((C.levels || {})[2] || []).map((x) => x.w), ...CO_OK]);
  const openTexts = [['co level 2', [...((C.sentences || {})[2] || []).map((s) => s.text), LINES.splitCo, LINES.legendCo, LINES.choose3, INSTR.co[2]]],
    ['cosort level 1', [...((CS.yesno || {})[1] || []).map((s) => s.text), LINES.sortCo, LINES.yesno, INSTR.cosort[1], ...Object.values(HEADS.cosort)]]];
  openTexts.forEach(([where, ts]) => ts.forEach((t) => tokens(t).forEach((w) => { if (isVCV(w) && !open.has(w)) f.push(`${where}: "${w}" in "${t}" has one consonant after its first vowel and is not judged open`); })));
  // a closed-syllable page prints no word with two consonants after a long vowel
  const closedTexts = [['co level 1', [...((C.sentences || {})[1] || []).map((s) => s.text), LINES.splitCo, LINES.legendCo, LINES.choose3, INSTR.co[1]]], openTexts[1]];
  closedTexts.forEach(([where, ts]) => ts.forEach((t) => tokens(t).forEach((w) => { if (LONG_VCCV.includes(w)) f.push(`${where}: "${w}" in "${t}" has a long vowel before two consonants`); })));
  const TY = b.ty || {};
  const tyTexts = [...Object.values(TY.yesno || {}).flat().map((s) => s.text), LINES.splitTy, LINES.legendTy, LINES.sortTy1, LINES.sortTy, LINES.join, LINES.yesno, ...Object.values(INSTR.types), ...Object.values(INSTR.typebuild), ...Object.values(HEADS.types1), ...Object.values(HEADS.types)];
  tyTexts.forEach((t) => tokens(t).forEach((w) => { if (NEVER_VCE.includes(w) || NEVER_CLE.includes(w)) f.push(`types: "${w}" in "${t}" breaks the rule of its syllable type`); }));
  const S = b.suffix || {};
  const sufWords = new Set((S.words || []).map((x) => x.w));
  const sufTexts = [...(S.words || []).map((x) => x.sentence), ...(S.words || []).map((x) => x.meaning), ...Object.values(S.pick || {}).flat().map((p) => p[0]), LINES.parts, LINES.parts3, LINES.match, LINES.build, LINES.pick2, LINES.makeit, ...Object.values(INSTR.suffix), ...Object.values(INSTR.suffix2)];
  sufTexts.forEach((t) => tokens(t).forEach((w) => { if (/(?:able|ment|ness|ful|less)$/.test(w) && w.length > 4 && !sufWords.has(w) && !SUFFIX_OK.includes(w)) f.push(`suffix: "${w}" in "${t}" ends in a suffix's letters but is no suffix word`); }));
  const H = b.heart || {};
  // a heart word is the answer of a sentence: never printed in a task line or the instruction of the page
  [LINES.heartbox, LINES.heartsent, LINES.fold, LINES.own, ...Object.values(INSTR.heart)].forEach((t) => tokens(t).forEach((w) => { if ((H.words || []).some((x) => x.w === w)) f.push(`heart: the heart word "${w}" is printed in "${t}"`); }));
  [...Object.values(H.sentences || {}).flat().map((s) => s[0]), LINES.heartbox, LINES.heartsent, LINES.fold, LINES.own, ...Object.values(INSTR.heart)].forEach((t) => tokens(t).forEach((w) => { if (/ough|augh|eau/.test(w)) f.push(`heart: "${w}" in "${t}" holds ough, augh, or eau`); }));
  return f;
}

/* ---------------------------------------------------------------- drawing a page (data only) ---------------------------------------------------------------- */
function drawPage(b, mode, lv, rng) {
  let last;
  for (let k = 0; k < 40; k++) { try { return drawOnce(b, mode, lv, rng); } catch (e) { last = e; } }
  throw last;
}
/** yes-or-no sentences from a pool: the answers at places that are no staircase, never every other one, never three alike */
/** yes-or-no sentences from a pool: the answers at places that are no staircase, never every other one, never three alike;
 *  a word of the lesson (`isKey`) stands in at most `maxPer` sentences of a page (two sentences about one chimpanzee) */
function yesnoOf(pool, k, rng, isKey = () => false, maxPer = 1) {
  const pat = places(k, 2, rng).map((x) => (x ? 'no' : 'yes'));
  const used = new Set(), out = [], seen = {};
  const keysOf = (s) => tokens(s.text).filter(isKey);
  for (const a of pat) {
    const s = shuffle(pool.filter((x) => x.a === a && !used.has(x.text) && keysOf(x).every((w) => (seen[w] || 0) < maxPer)), rng)[0];
    if (!s) throw new Error('too few yes/no sentences');
    used.add(s.text); keysOf(s).forEach((w) => (seen[w] = (seen[w] || 0) + 1)); out.push(s);
  }
  return out;
}
/** a sort: words with their column keys, in an order with no pattern; the column of each word fixed */
function sortOf(words, keyOf, heads, rng, cross = null) {
  for (let t = 0; t < 400; t++) {
    const order = shuffle(words, rng);
    if (cross) { const at = rng.int(1, order.length - 1); order.splice(at, 0, cross); }
    const cols = order.filter((w) => w !== cross).map(keyOf);
    if (!sortOrderOk(cols)) continue;
    return { kind: 'sort', heads, items: order.map((w) => ({ w, col: w === cross ? null : keyOf(w) })), cross };
  }
  throw new Error('no order for the sort');
}
const count = (d, kind) => (d.tasks.find((t) => t[0] === kind) || [])[1];

function drawOnce(b, mode, lv, rng) {
  const d = LEVELS[mode][lv], say = SAYT[mode];
  const tasks = [];

  if (mode === 'co') {
    const C = b.co, ws = C.levels[lv].filter((x) => !say.includes(x.w)), byW = Object.fromEntries(ws.map((x) => [x.w, x]));
    const nS = count(d, 'choose3'), nW = count(d, 'split');
    // the sentences first (their answers are printed nowhere else), then the words to split from the rest
    const sents = [];
    for (const s of shuffle(C.sentences[lv].filter((x) => byW[x.right]), rng)) { if (sents.length === nS) break; if (sents.some((y) => y.right === s.right)) continue; sents.push(s); }
    if (sents.length < nS) throw new Error('too few sentences');
    const answers = new Set(sents.map((s) => s.right));
    const rest = ws.filter((x) => !answers.has(x.w));
    // the marks must be a choice: level 1 two or more words ending in an open syllable, level 2 three or more of each
    // second syllable, level 3 six or more of each first syllable
    const want = lv === 1 ? [(x) => x.marks[1] === 'O', 2, 3] : lv === 2 ? [(x) => x.marks[1] === 'O', 3, 6] : [(x) => x.marks[0] === 'O', 6, 10];
    const [isA, lo, hi] = want, nA = rng.int(lo, hi);
    // level 2: three or four level-1 words split again (a closed first syllable), so the first box is a choice too
    const rv = lv === 2 ? shuffle(((C.review || {})[2] || []).filter((x) => !say.includes(x.w)), rng).slice(0, rng.int(3, 4)) : [];
    const needA = nA - rv.filter(isA).length;
    if (needA < 0) throw new Error('too many words to split again that end in an open syllable');
    const split = shuffle([...rv, ...shuffle(rest.filter(isA), rng).slice(0, needA), ...shuffle(rest.filter((x) => !isA(x)), rng).slice(0, nW - rv.length - needA)], rng);
    if (split.length < nW || split.filter(isA).length !== nA) throw new Error('too few words to split');
    const at = places(nS, 3, rng);
    const offered = new Set();
    const items = sents.map((s, i) => {
      const a = (s.text.match(/\b(a|an)\s+___/i) || [])[1];
      const okArt = (w) => (!a ? true : a.toLowerCase() === 'an' ? vowelSound(w) : !vowelSound(w));
      const pool = ws.filter((x) => x.w !== s.right && !answers.has(x.w) && !offered.has(x.w) && !s.fits.includes(x.w) && okArt(x.w) && !split.some((y) => y.w === x.w)).map((x) => x.w);
      const two = shuffle(pool, rng).slice(0, 2);
      if (two.length < 2 || !okArt(s.right)) throw new Error('no two words to offer');
      two.forEach((w) => offered.add(w));
      const opts = two.slice(); opts.splice(at[i], 0, s.right);
      return { text: s.text, right: s.right, opts };
    });
    tasks.push({ kind: 'split', items: split.map((x) => ({ w: x.w, parts: x.parts, marks: x.marks })), legend: 'co' });
    tasks.push({ kind: 'choose3', items });
  }

  if (mode === 'cosort') {
    const CS = b.cosort, C = b.co;
    const info = Object.fromEntries([1, 2, 3].flatMap((l) => C.levels[l]).map((x) => [x.w, x]));
    const pool = CS.levels[lv].filter((w) => !say.includes(w)).map((w) => info[w]);
    const n = count(d, 'sort') - (d.cross || 0);
    const closed = pool.filter((x) => x.marks[0] === 'C'), open = pool.filter((x) => x.marks[0] === 'O');
    const nC = rng.int(Math.ceil(n / 2) - 1, Math.floor(n / 2) + 1);
    let pickC = shuffle(closed, rng).slice(0, nC);
    // level 2: two or more closed words with one consonant (cam|el); level 1 never
    if (lv === 2) { const one = shuffle(closed.filter((x) => C.levels[3].some((y) => y.w === x.w)), rng).slice(0, rng.int(2, 3)); pickC = [...one, ...shuffle(closed.filter((x) => !one.includes(x) && !C.levels[3].some((y) => y.w === x.w)), rng)].slice(0, nC); }
    const pickO = shuffle(open, rng).slice(0, n - nC);
    if (pickC.length + pickO.length < n) throw new Error('too few words to sort');
    const words = [...pickC, ...pickO].map((x) => x.w);
    const cross = d.cross ? shuffle(CS.neither, rng)[0].w : null;
    const sort = sortOf(words, (w) => info[w].marks[0], ['C', 'O'], rng, cross);
    sort.split = true;
    const shown = new Set([...sort.items.map((x) => x.w)]);
    const yn = yesnoOf(CS.yesno[lv].filter((s) => !tokens(s.text).some((w) => shown.has(w) || say.includes(w))), count(d, 'yesno'), rng, (w) => !!info[w]);
    tasks.push(sort, { kind: 'yesno', items: yn });
  }

  if (mode === 'types') {
    const TY = b.ty, ws = TY.levels[lv].filter((x) => !say.includes(x.w));
    const nW = count(d, 'split'), nS = count(d, 'sort');
    // the words to split: level 1 three or more of each first syllable (closed; open or a vowel team); level 2 four or
    // more with a silent-e and four or more with a consonant-le syllable; level 3 every type of the lesson
    let split = null;
    for (let t = 0; t < 300; t++) {
      const got = shuffle(ws, rng).slice(0, nW);
      const m = got.map((x) => x.marks.join(''));
      if (lv === 1 && (m.filter((s) => s[0] === 'C').length < 3 || m.filter((s) => s[0] !== 'C').length < 3)) continue;
      if (lv === 2 && (m.filter((s) => s.includes('E')).length < 4 || m.filter((s) => s.includes('L')).length < 4)) continue;
      // (2026-11-19, review en-1119-lit) level 2: two words or more with a vowel-team syllable (V of the legend)
      if (lv === 2 && m.filter((s) => s.includes('V')).length < 2) continue;
      if (lv === 3 && ['E', 'V', 'L'].some((k) => m.filter((s) => s.includes(k)).length < 2)) continue;
      split = got; break;
    }
    if (!split) throw new Error('no words to split');
    const used = new Set([...split.map((x) => x.w), ...say]);
    const keyOf = lv === 1 ? (x) => (x.marks[0] === 'C' ? 'short' : 'long') : (x) => x.marks[x.marks.length - 1];
    const heads = lv === 1 ? ['short', 'long'] : lv === 2 ? ['L', 'E'] : ['L', 'E', 'V'];
    const pool = TY.sortPool[lv].filter((x) => !used.has(x.w));
    const per = Math.floor(nS / heads.length);
    // each column gets a number of words of its own (no column found by counting)
    let counts = null;
    for (let t = 0; t < 100; t++) { const c = heads.map(() => per + rng.int(-1, 1)); const s = c.reduce((a, x) => a + x, 0); c[c.length - 1] += nS - s; if (c.every((x) => x >= per - 1 && x <= d.lines)) { counts = c; break; } }
    if (!counts) throw new Error('no counts for the sort');
    const pick = heads.flatMap((h, i) => shuffle(pool.filter((x) => keyOf(x) === h), rng).slice(0, counts[i]));
    if (pick.length < nS) throw new Error('too few words to sort');
    const info = Object.fromEntries(pick.map((x) => [x.w, x]));
    const sort = sortOf(pick.map((x) => x.w), (w) => keyOf(info[w]), heads, rng);
    tasks.push({ kind: 'split', items: split.map((x) => ({ w: x.w, parts: x.parts, marks: x.marks })), legend: 'ty' }, sort);
  }

  if (mode === 'typebuild') {
    const TY = b.ty, list = TY.build[lv].filter((x) => !say.includes(x[2])), J = TY.joins[lv];
    const joins = (a, c) => J.some(([x, y]) => x === a && y === c);
    const k = count(d, 'join');
    let pick = null, extra = null;
    for (let t = 0; t < 600; t++) {
      const got = [];
      for (const x of shuffle(list, rng)) { if (got.length === k) break; if (got.some((y) => y[0] === x[0] || y[1] === x[1])) continue; got.push(x); }
      if (got.length < k) continue;
      const firsts = got.map((x) => x[0]), seconds = got.map((x) => x[1]);
      if (firsts.some((a, i) => seconds.some((c, j) => j !== i && joins(a, c)))) continue;
      // levels 1 and 2: at most two words whose first part ends with the first letter of its ending (puz + zle: found by the letter)
      if (lv <= 2 && got.filter((x) => x[0].slice(-1) === x[1][0]).length > 2) continue;
      const more = shuffle([...new Set(list.map((x) => x[1]))].filter((c) => !seconds.includes(c) && !firsts.some((a) => joins(a, c))), rng).slice(0, d.extra);
      if (more.length < d.extra) continue;
      pick = got; extra = more; break;
    }
    if (!pick) throw new Error('no parts that join one way only');
    let box = null;
    for (let t = 0; t < 300; t++) { const bx = shuffle([...pick.map((x) => x[1]), ...extra], rng); if (!staircase(pick.map((x) => bx.indexOf(x[1])))) { box = bx; break; } }
    if (!box) throw new Error('no box order');
    const answers = pick.map((x) => x[2]);
    const lvWords = new Set([...TY.levels[lv].map((x) => x.w), ...TY.build[lv].flatMap((x) => [x[2], ...(lv === 3 ? [x[0], x[1]] : [])])]);
    const yn = yesnoOf(TY.yesno[lv].filter((s) => !answers.some((w) => hasWord(s.text, w)) && !say.some((w) => hasWord(s.text, w))), count(d, 'yesno'), rng, (w) => lvWords.has(w));
    tasks.push({ kind: 'join', items: pick.map((x) => ({ first: x[0], second: x[1], w: x[2] })), box }, { kind: 'yesno', items: yn });
  }

  if (mode === 'suffix') {
    const S = b.suffix, sufs = S.levels[lv];
    const ws = S.words.filter((x) => sufs.includes(x.suf) && (lv === 3 || !x.change) && !say.includes(x.w));
    const byW = Object.fromEntries(S.words.map((x) => [x.w, x]));
    // the match first: two pairs of one base each (level 3: one pair of -ment and -able)
    const P1 = shuffle(S.pairs[1], rng), P3 = shuffle(S.pairs[3], rng);
    const pairs = lv === 3 ? [P1[0], P3[0]] : [P1[0], P1[1]];
    const mw = pairs.flat();
    const bases = new Set(mw.map((w) => byW[w].base));
    const free = ws.filter((x) => !mw.includes(x.w) && !bases.has(x.base));
    // the words to build in sentences, then the words to mark: each level's own suffixes stand on the page
    const nB = count(d, 'build'), nP = count(d, 'parts');
    const need = lv === 1 ? [['ful', 2], ['less', 2]] : lv === 2 ? [['ness', 2], ['ment', 2]] : [['able', 1], ['chg', 2]];
    const isK = (x, k) => (k === 'chg' ? !!x.change : x.suf === k);
    const take = (pool, n, needs) => {
      for (let t = 0; t < 300; t++) {
        const got = shuffle(pool, rng).slice(0, n);
        if (needs.some(([k, m]) => got.filter((x) => isK(x, k)).length < m) || new Set(got.map((x) => x.base)).size < got.length) continue;
        return got;
      }
      throw new Error('no words of the kinds of the level');
    };
    const build = take(free, nB, need);
    const bset = new Set(build.map((x) => x.base));
    // a word whose base carries a suffix of its own (friendliness) is never a word to circle the base of
    const parts = take(free.filter((x) => !bset.has(x.base) && !x.two), nP, lv === 1 ? [['ful', 4], ['less', 4]] : lv === 2 ? [['ness', 3], ['ment', 3], ['ful', 1], ['less', 1]] : [['able', 2], ['chg', 4], ['ness', 1], ['ful', 1], ['less', 1], ['ment', 1]]);
    const pageWords = [...parts.map((x) => x.w), ...mw, ...build.map((x) => x.w)];
    if (build.some((x) => pageWords.some((w) => hasWord(x.sentence.replace('___', ' '), w)))) throw new Error('a sentence prints a word of the page');
    // the meanings in an order that puts no word straight across from its meaning, and not all one row away
    const words = shuffle(mw, rng);
    let order = null;
    for (let t = 0; t < 200; t++) { const o = shuffle(words, rng); const off = words.map((w, i) => (o.indexOf(w) - i + 4) % 4); if (off.some((x) => x === 0) || new Set(off).size < 2) continue; order = o; break; }
    if (!order) throw new Error('no order for the meanings');
    tasks.push({ kind: 'parts', items: parts.map((x) => ({ w: x.w, shown: x.shown, suf: x.suf, change: x.change })), lv });
    tasks.push({ kind: 'match', words, meanings: order.map((w, i) => ({ letter: 'ABCD'[i], w, text: byW[w].meaning })) });
    tasks.push({ kind: 'build', items: build.map((x) => ({ w: x.w, base: x.base, suf: x.suf, text: x.sentence })) });
  }

  if (mode === 'suffix2') {
    const S = b.suffix, byW = Object.fromEntries(S.words.map((x) => [x.w, x]));
    const nM = count(d, 'makeit'), nP = count(d, 'pick2');
    // the sentences first: one a base, each word offered once a page
    const at = places(nP, 2, rng, PICK_CAP);
    const offered = new Set(), bases = new Set(), items = [];
    for (const [text, right, other] of shuffle(S.pick[lv], rng)) {
      if (items.length === nP) break;
      const base = byW[right] ? byW[right].base : byW[other] ? byW[other].base : right;
      if ([right, other].some((w) => offered.has(w) || say.includes(w)) || bases.has(base)) continue;
      offered.add(right); offered.add(other); bases.add(base);
      const opts = at[items.length] === 0 ? [right, other] : [other, right];
      items.push({ text, right, opts, base });
    }
    if (items.length < nP) throw new Error('too few sentences to choose from');
    // the words to build: other bases, printed nowhere else on the page
    // a word whose meaning is not the meaning of its suffix (wonderful) never stands in this meaning task
    const mpool = S.words.filter((x) => !x.odd && (lv === 1 ? ['ful', 'less'].includes(x.suf) && !x.change : lv === 2 ? ['ness', 'ment'].includes(x.suf) && !x.change : !!x.change) && !say.includes(x.w) && !bases.has(x.base) && !items.some((it) => hasWord(it.text, x.w)));
    let make = null;
    for (let t = 0; t < 200; t++) { const got = shuffle(mpool, rng).slice(0, nM); if (got.length === nM && new Set(got.map((x) => x.base)).size === nM && new Set(got.map((x) => x.suf)).size >= 2) { make = got; break; } }
    if (!make) throw new Error('no words to build');
    tasks.push({ kind: 'pick2', items });
    tasks.push({ kind: 'makeit', items: make.map((x) => ({ w: x.w, base: x.base, suf: x.suf, meaning: x.meaning, change: x.change })) });
  }

  if (mode === 'heart') {
    const H = b.heart, byW = Object.fromEntries(H.words.map((x) => [x.w, x]));
    const k = count(d, 'heartbox'), nS = count(d, 'heartsent');
    let words = null;
    for (let t = 0; t < 300; t++) {
      const rest = shuffle(H.words.map((x) => x.w).filter((w) => !H.always.includes(w)), rng).slice(0, k - H.always.length);
      const ws = [...H.always, ...rest];
      words = ws; break;
    }
    if (!words) throw new Error('no heart words');
    const order = shuffle(words, rng);
    // the sentences: one word each (where there are more sentences than words, every word once and enough, though, or
    // ocean a second time, never twice in a row, never one sentence twice), two or more of enough, though, ocean; no
    // sentence whose other fitting word is on the page; never in the order of the boxes
    let sents = null;
    for (let t = 0; t < 400; t++) {
      const extra = Math.max(0, nS - words.length);
      const sw = extra ? shuffle([...words, ...shuffle(H.always, rng).slice(0, extra)], rng) : shuffle(words, rng).slice(0, nS);
      if (sw.some((w, i) => i && w === sw[i - 1])) continue;
      if (sw.filter((w) => H.always.includes(w)).length < Math.min(2, nS - 1) || staircase(sw.map((w) => order.indexOf(w)))) continue;
      const taken = new Set();
      const got = sw.map((w) => { const ok = H.sentences[w].filter(([t2, fits = []]) => !taken.has(t2) && !fits.some((y) => words.includes(y))); if (!ok.length) return null; const pick = shuffle(ok, rng)[0][0]; taken.add(pick); return { w, text: pick }; });
      if (got.some((x) => !x)) continue;
      sents = got; break;
    }
    if (!sents) throw new Error('no sentences');
    tasks.push({ kind: 'heartbox', items: order.map((w) => ({ w, boxes: byW[w].boxes, heart: byW[w].heart })) });
    tasks.push({ kind: 'heartsent', items: sents });
    if (count(d, 'own')) tasks.push({ kind: 'own', words: order });
  }

  if (mode === 'ough') {
    const O = b.ough;
    const gkeys = shuffle(Object.keys(O.groups), rng).slice(0, d.groups);
    const n = count(d, 'sort') - (d.cross || 0);
    let words = null;
    for (let t = 0; t < 200; t++) {
      const ws = gkeys.flatMap((g) => shuffle(O.groups[g], rng).slice(0, rng.int(2, O.groups[g].length)));
      if (ws.length < n) continue;
      const got = shuffle(ws, rng).slice(0, n);
      if (gkeys.some((g) => got.filter((w) => O.groups[g].includes(w)).length < 2) || gkeys.some((g) => got.filter((w) => O.groups[g].includes(w)).length > d.lines)) continue;
      words = got; break;
    }
    if (!words) throw new Error('no ough words to sort');
    const keyOf = (w) => Object.keys(O.groups).find((g) => O.groups[g].includes(w));
    const cross = d.cross ? shuffle(O.other, rng)[0].w : null;
    const sort = sortOf(words, keyOf, gkeys.slice().sort((a, c) => ['uff', 'o', 'aw'].indexOf(a) - ['uff', 'o', 'aw'].indexOf(c)), rng, cross);
    const shown = new Set(sort.items.map((x) => x.w));
    const yn = yesnoOf(O.yesno.filter((s) => !tokens(s.text).some((w) => shown.has(w))), count(d, 'yesno'), rng, (w) => /ough/.test(w), 2);
    tasks.push(sort, { kind: 'yesno', items: yn });
  }

  const items = [];
  for (const t of tasks) {
    if (t.kind === 'split') items.push(...t.items.map((x) => 'split:' + x.w));
    if (t.kind === 'choose3') items.push(...t.items.map((s) => 'choose:' + s.right));
    if (t.kind === 'sort') items.push(...t.items.map((x) => 'sort:' + x.w));
    if (t.kind === 'yesno') items.push(...t.items.map((s) => 'yn:' + s.text));
    if (t.kind === 'join') items.push(...t.items.map((x) => 'join:' + x.w));
    if (t.kind === 'parts') items.push(...t.items.map((x) => 'parts:' + x.w));
    if (t.kind === 'match') items.push(...t.words.map((w) => 'match:' + w));
    if (t.kind === 'build') items.push(...t.items.map((x) => 'build:' + x.w));
    if (t.kind === 'pick2') items.push(...t.items.map((x) => 'pick:' + x.text));
    if (t.kind === 'makeit') items.push(...t.items.map((x) => 'make:' + x.w));
    if (t.kind === 'heartbox') items.push(...t.items.map((x) => 'heart:' + x.w));
    if (t.kind === 'heartsent') items.push(...t.items.map((x) => 'hsent:' + x.text));
  }
  return { mode, lv, tasks, items };
}

{ const f = faultsOf(BANK); if (f.length) throw new Error('long-words-g3.en.json: ' + f.slice(0, 12).join('; ') + (f.length > 12 ? ` (and ${f.length - 12} more)` : '')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks
/** Printed text has the typographic apostrophe and quotes, as on the Grade 2 pages (clown’s, “Call me.”); the bank, the
 *  attributes verify() reads, and the teacher notes keep straight ones. A quote mark (escaped as &quot;) opens at the
 *  start of a text or after a space, else it closes. */
const typo = (t) => t.replace(/'/g, '’').replace(/&quot;/g, (m, at, s) => (at === 0 || /[\s([]$/.test(s.slice(0, at)) ? '“' : '”'));
/** In this font an f before i, f, l, or t and a t before t touch the next letter even with ligatures off: every such f or t
 *  gets a little room of its own. Text inside tags is left alone. Every printed text passes through typo() here. */
function fRoom(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += typo(text).replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
/** a block that takes the spare room of the page in proportion to its rows (so every gap of the page grows alike) */
const grow = (rows) => `flex:${rows} 1 auto`;
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 18) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (k) => `<span style="color:${T.teal}">${k}.</span> `;
/** a word to circle (the key rings the right one) */
const pill = (text, ok, key, font, pad = '1px 12px') => `<span data-lcs-pill data-lcs-word="${esc(text)}"${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;font:800 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};padding:${pad};border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a single-rule writing line of Grade 3 paper; `first`: a part printed at its start for the child to read */
function rule({ w, h = ROWH, answer, sample, first, starter }) {
  const px = answer ? Math.max(12, Math.min(19, (w - 10) / (String(answer).length * 0.56))) : 0;
  return `<div data-lcs-line${starter && !answer ? ` data-lcs-startertext="${esc(starter)}"` : ''}${answer ? ` data-lcs-answer="${esc(answer)}"` : ''}${answer && sample ? ' data-lcs-key-sample="1"' : ''} style="box-sizing:border-box;flex:0 0 auto;width:${w}px;height:${h}px;border-bottom:1.5px solid #8C8479;display:flex;align-items:flex-end;gap:6px;padding:0 4px 3px;overflow:hidden">` +
    (starter && !answer ? `<span data-lcs-starter data-lcs-read style="flex:0 0 auto;font:800 20px/1 'Nunito',sans-serif;color:${T.ink}">${esc(starter)}</span>` : '') +
    (answer ? `<span data-lcs-keytext style="flex:0 0 auto;white-space:nowrap;font:700 ${px.toFixed(1)}px/1 'Nunito',sans-serif;color:${T.teal}">${esc(answer)}</span>` : '') + `</div>`;
}
const boxMark = (want, key, size) => `<span data-lcs-markbox data-lcs-want="${esc(want)}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;font:800 ${Math.round(size * 0.6)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(want) : ''}</span>`;
const heartSvg = (size) => `<svg data-lcs-heartmark width="${size}" height="${size}" viewBox="0 0 24 24" style="display:block"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.3 1.8-2.1 3.3-3.3 5.4-3.3 3.6 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" fill="${T.teal}"/></svg>`;
const chip = (text, attr, font = 20) => `<span ${attr} style="flex:0 0 auto;font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 13px;border-radius:999px;background:#FFFFFF;border:2px solid ${T.teal}">${esc(text)}</span>`;
const wordBox = (inner) => `<div data-lcs-wordbox style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px 12px;padding:4px 10px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF">${inner}</div>`;
/** a split word as the key writes it on a line: rab | bit */
const splitText = (x) => x.parts.join(' | ');

/* ---------------------------------------------------------------- the blocks ---------------------------------------------------------------- */
function renderTask(t, k, mode, lv, d, key, inner, b) {
  if (t.kind === 'split') {
    const box = MARKBOX;
    const cell = (x) => `<div data-lcs-split="${x.w}" data-lcs-at="${x.parts.map((p) => p.length).join(',')}" data-lcs-marks="${x.marks.join('')}" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:2px 4px 4px;border-radius:10px;background:#FFFFFF">` +
      `<span data-lcs-read data-lcs-word="${x.w}" style="display:inline-flex;font:800 ${d.sfont}px/1.1 'Nunito',sans-serif;color:${T.ink};letter-spacing:0.12em">` +
      x.parts.map((p, i) => `<span data-lcs-syl="${i}" style="position:relative;display:inline-block">${key && i > 0 ? `<span data-lcs-splitbar style="position:absolute;left:-${(0.06 * d.sfont + 1.5).toFixed(1)}px;top:-6px;bottom:-6px;width:3px;border-radius:2px;background:${T.teal}"></span>` : ''}${esc(p)}</span>`).join('') + `</span>` +
      `<span data-lcs-marks style="display:flex;gap:8px">${x.marks.map((m) => boxMark(m, key, box)).join('')}</span></div>`;
    const legend = `<div data-lcs-legend style="font:700 15px/1.3 'Nunito',sans-serif;color:${T.inkSoft};padding-left:2px">${esc(t.legend === 'co' ? LINES.legendCo : LINES.legendTy)}</div>`;
    return cream('data-lcs-task="split"', label(`${num(k)}${t.legend === 'co' ? LINES.splitCo : LINES.splitTy}`) + legend +
      `<div style="display:grid;grid-template-columns:repeat(${d.cols},1fr);gap:4px 12px">${t.items.map(cell).join('')}</div>`, d.pad, 5);
  }
  if (t.kind === 'choose3' || t.kind === 'pick2') {
    const rows = t.items.map((s) => { const [a, c] = s.text.split('___'), pm = c.match(/^[.!?,"]+/), punct = pm ? pm[0] : '', rest = (pm ? c.slice(punct.length) : c).trim();
      // the blank and the mark after it never part at a line end
      return `<div data-lcs-choose="${esc(s.right)}" data-lcs-text="${esc(s.text)}" style="display:grid;grid-template-columns:1fr auto;align-items:center;column-gap:14px;padding:1px 0 1px 4px">` +
        `<div data-lcs-read style="font:700 ${d.cfont}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(a.trim())}${a.trim() ? ' ' : ''}<span data-lcs-blankwrap style="white-space:nowrap"><span data-lcs-blank style="display:inline-block;width:96px;border-bottom:2.5px solid ${T.ink}"></span>${punct ? `<span data-lcs-punct>${esc(punct)}</span>` : ''}</span>${rest ? ' ' + esc(rest) : ''}</div>` +
        `<div data-lcs-opts style="display:flex;gap:10px;margin-left:auto">${s.opts.map((w) => pill(w, w === s.right, key, 20, '0 11px')).join('')}</div></div>`; }).join('');
    return cream(`data-lcs-task="${t.kind}"`, label(`${num(k)}${t.kind === 'pick2' ? LINES.pick2 : LINES.choose3}`) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:5px">${rows}</div>`, d.pad, 6, grow(t.items.length));
  }
  if (t.kind === 'sort') {
    const heads = t.heads, n = heads.length, gap = 12, cw = Math.floor((inner - gap * (n - 1)) / n);
    const headText = mode === 'cosort' ? HEADS.cosort : mode === 'ough' ? HEADS.ough : lv === 1 ? HEADS.types1 : HEADS.types;
    const lineLabel = mode === 'cosort' ? LINES.sortCo + (t.cross ? ' ' + LINES.crossCo : '') : mode === 'ough' ? LINES.sortOugh + (t.cross ? ' ' + LINES.crossOugh : '') : lv === 1 ? LINES.sortTy1 : LINES.sortTy;
    const info = mode === 'cosort' ? Object.fromEntries([1, 2, 3].flatMap((l) => b.co.levels[l]).map((x) => [x.w, x])) : mode === 'types' ? Object.fromEntries(b.ty.sortPool[lv].map((x) => [x.w, x])) : {};
    const bank = wordBox(t.items.map((x) => `<span data-lcs-sortword="${esc(x.w)}"${x.col ? ` data-lcs-col="${x.col}"` : ' data-lcs-cross="1"'} style="position:relative;display:inline-flex">${chip(x.w, 'data-lcs-chip data-lcs-read', 20)}${key && !x.col ? `<span data-lcs-crossmark style="position:absolute;left:-4px;right:-4px;top:50%;height:3px;margin-top:-1px;background:${T.teal};border-radius:2px;transform:rotate(-8deg)"></span>` : ''}</span>`).join(''));
    // one grid: the heads in its first row, then the lines row by row, so that the lines of the columns stand level
    const mineOf = (h) => t.items.filter((x) => x.col === h).map((x) => x.w);
    const headCells = heads.map((h) => `<div data-lcs-head="${h}" data-lcs-read style="display:flex;align-items:center;justify-content:center;padding:3px 8px;border-radius:8px;background:${T.teal};color:#FFFFFF;font:800 18px/1.2 'Nunito',sans-serif;text-align:center"><span>${esc(headText[h])}</span></div>`).join('');   // one inline box: the room after an f never splits the words of a flex row
    const lineCells = Array.from({ length: d.lines }, (_, i) => heads.map((h) => { const w = mineOf(h)[i]; return `<div data-lcs-colline="${h}" style="min-width:0">${rule({ w: cw, answer: key && w ? (t.split ? splitText(info[w]) : w) : null })}</div>`; }).join('')).join('');
    const grid = `<div data-lcs-sortgrid style="flex:1 1 auto;display:grid;grid-template-columns:repeat(${n},1fr);align-content:space-between;column-gap:${gap}px;row-gap:0">${headCells}${lineCells}</div>`;
    const anyOrder = `<div ${key ? 'data-lcs-keynote' : 'data-lcs-keyroom'} style="font:700 15px/1.2 'Nunito',sans-serif;color:${T.teal}${key ? '' : ';visibility:hidden'}">Any order under each head.</div>`;
    // the key's note stands under the task line (its room on the child's page adds to a short gap, never to a blank band)
    return cream('data-lcs-task="sort"', label(`${num(k)}${lineLabel}`) + anyOrder + bank + grid, d.pad, 6, grow(d.lines + 1));
  }
  if (t.kind === 'yesno') {
    const rows = t.items.map((s) => `<div data-lcs-yn="${s.a}" data-lcs-text="${esc(s.text)}" style="display:flex;align-items:center;gap:12px;padding:1px 0 1px 4px">` +
      `<span data-lcs-read style="flex:1 1 auto;font:700 ${d.yfont}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(s.text)}</span>` +
      `<span data-lcs-ynpills style="flex:0 0 auto;display:inline-flex;gap:8px">${['yes', 'no'].map((a) => pill(a, a === s.a, key, 20, '0 10px')).join('')}</span></div>`).join('');
    return cream('data-lcs-task="yesno"', label(`${num(k)}${LINES.yesno}`) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:4px">${rows}</div>`, d.pad, 6, grow(t.items.length));
  }
  if (t.kind === 'join') {
    const row = (x) => `<div data-lcs-join="${x.w}" data-lcs-first="${x.first}" style="display:flex;align-items:flex-end;gap:7px;min-width:0">` +
      `<span data-lcs-first data-lcs-read style="flex:0 0 auto;padding-bottom:4px;font:800 21px/1 'Nunito',sans-serif;color:${T.ink}">${esc(x.first)}</span>` +
      `<span style="flex:0 0 auto;padding-bottom:4px;font:800 19px/1 'Nunito',sans-serif;color:${T.inkSoft}">+</span>` +
      `<div data-lcs-partline>${rule({ w: 100, answer: key ? x.second : null })}</div>` +
      `<span style="flex:0 0 auto;padding-bottom:4px;font:800 19px/1 'Nunito',sans-serif;color:${T.inkSoft}">=</span>` +
      `<div data-lcs-wordline style="flex:1 1 auto;min-width:0">${rule({ w: 280, answer: key ? x.w : null })}</div></div>`;
    return cream('data-lcs-task="join"', label(`${num(k)}${LINES.join}`) + wordBox(t.box.map((p) => chip(p, `data-lcs-boxpart="${esc(p)}" data-lcs-read`, 21)).join('')) +
      `<div style="display:flex;flex-direction:column;gap:6px;padding:4px 2px 2px">${t.items.map(row).join('')}</div>`, d.pad, 8);
  }
  if (t.kind === 'parts') {
    const cell = (x) => `<div data-lcs-part="${x.w}" data-lcs-shown="${x.shown}" data-lcs-suf="${x.suf}" style="display:flex;justify-content:center;align-items:center;height:${Math.round(d.pfont * 1.8)}px;border-radius:10px;background:#FFFFFF">` +
      `<span data-lcs-read style="display:inline-flex;font:800 ${d.pfont}px/1 'Nunito',sans-serif;color:${T.ink};letter-spacing:0.06em">` +
      `<span data-lcs-base style="position:relative;display:inline-block">${key ? `<span data-lcs-ring style="position:absolute;left:-7px;right:-1px;top:-7px;bottom:-8px;border:3px solid ${T.teal};border-radius:999px"></span>` : ''}${esc(x.shown)}</span>` +
      `<span data-lcs-suffix style="display:inline-block;${key ? `box-shadow:inset 0 -3.5px 0 ${T.teal};padding-bottom:3px;margin-bottom:-3px` : ''}">${esc(x.suf)}</span></span></div>`;
    return cream('data-lcs-task="parts"', label(`${num(k)}${lv === 3 ? LINES.parts3 : LINES.parts}`) +
      `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px 12px;padding:3px 2px">${t.items.map(cell).join('')}</div>`, d.pad);
  }
  if (t.kind === 'match') {
    const rows = t.words.map((w, i) => { const m = t.meanings[i], want = t.meanings.find((x) => x.w === w).letter;
      return `<div style="display:grid;grid-template-columns:200px 1fr;gap:16px;align-items:center">` +
        `<div data-lcs-mword="${w}" style="display:flex;align-items:center;gap:10px"><span data-lcs-read style="flex:1 1 auto;font:800 22px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>${boxMark(want, key, MARKBOX)}</div>` +
        `<div data-lcs-meaning="${m.letter}" data-lcs-mw="${m.w}" data-lcs-read style="font:700 19px/1.25 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal};font-weight:800">${m.letter}</span>&nbsp;&nbsp;${esc(m.text)}</div></div>`; }).join('');
    return cream('data-lcs-task="match"', label(`${num(k)}${LINES.match}`) + `<div style="display:flex;flex-direction:column;gap:4px;padding:2px 4px">${rows}</div>`, d.pad);
  }
  if (t.kind === 'build') {
    const rows = t.items.map((x) => { const [a, c] = x.text.split('___'); const m = c.match(/^[.!?,'"]+/), tail = m ? m[0] : '', rest = (m ? c.slice(m[0].length) : c).trim();
      const pb = 4;
      // the cue (base + suffix) stands under the line: the sentence keeps one line with a 250 px line for the word
      return `<div data-lcs-build="${x.w}" data-lcs-text="${esc(x.text)}" style="display:flex;align-items:flex-end;padding-bottom:27px">` +
        `<div data-lcs-read data-lcs-btext style="flex:1 1 auto;display:flex;flex-wrap:wrap;align-items:flex-end;gap:2px 7px;font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">${a.trim() ? `<span style="padding-bottom:${pb}px">${esc(a.trim())}</span>` : ''}<span data-lcs-blankgroup style="display:inline-flex;align-items:flex-end"><span data-lcs-cueat style="position:relative;display:inline-flex">${rule({ w: BUILDLINE, answer: key ? (a.trim() ? x.w : x.w[0].toUpperCase() + x.w.slice(1)) : null })}` +
        `<span data-lcs-cue data-lcs-read style="position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:2px;white-space:nowrap;box-sizing:border-box;padding:0 9px;border-radius:8px;background:#FFFFFF;border:2px solid ${T.teal};font:800 18px/1.1 'Nunito',sans-serif;color:${T.ink};text-align:center">${esc(x.base)} + ${esc(x.suf)}</span></span>` +
        `${tail ? `<span data-lcs-tail style="padding-bottom:${pb}px">${esc(tail)}</span>` : ''}</span>${rest ? `<span style="padding-bottom:${pb}px">${esc(rest)}</span>` : ''}</div></div>`; }).join('');
    return cream('data-lcs-task="build"', label(`${num(k)}${LINES.build}`) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:4px">${rows}</div>`, d.pad, 6, grow(t.items.length));
  }
  if (t.kind === 'makeit') {
    const rows = t.items.map((x) => `<div data-lcs-make="${x.w}" style="display:flex;flex-direction:column;gap:2px">` +
      `<div style="display:flex;align-items:flex-end;gap:10px"><span data-lcs-cue data-lcs-read style="flex:0 0 auto;padding-bottom:4px;font:800 21px/1 'Nunito',sans-serif;color:${T.ink}">${esc(x.base)} + ${esc(x.suf)} =</span><div data-lcs-makeword>${rule({ w: 230, answer: key ? x.w : null })}</div></div>` +
      `<div style="display:flex;align-items:flex-end;gap:10px"><span data-lcs-read style="flex:0 0 auto;padding-bottom:4px;font:700 19px/1 'Nunito',sans-serif;color:${T.ink}">It means:</span><div data-lcs-makemean style="flex:1 1 auto;min-width:0">${rule({ w: inner - 120, answer: key ? 'Sample answer: ' + x.meaning : null, sample: true })}</div></div></div>`).join('');
    return cream('data-lcs-task="makeit"', label(`${num(k)}${LINES.makeit}`) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:10px">${rows}</div>`, d.pad, 6, grow(t.items.length));
  }
  if (t.kind === 'heartbox') {
    // levels 1 and 2: each box as wide as its letters, the word over its boxes (rows far enough apart that the word stands
    // nearer to its own boxes than to the row above); level 3: every box one width, wide enough for ough, the word beside
    // its boxes (the widths tell nothing)
    const B = d.hbox, hs = Math.round(B * 0.42), wbox = (g) => (d.uw ? d.uw : B + hs * (g.length - 1));
    // (2026-11-19, review en-1119-lit) levels 1 and 2: every box of a word one width, the width its longest letter group
    // needs (a box as wide as its own letters gave away which box holds oul or ough), kept inside its column (a box draws
    // 5 px of border)
    const colW = Math.floor((inner - 24 - 12 - 18 * (d.cols - 1)) / d.cols);
    const wordW = (x) => Math.min(Math.max(...x.boxes.map(wbox)), Math.floor((colW - 4 * (x.boxes.length - 1)) / x.boxes.length) - 5);
    const row = (x) => `<div data-lcs-hrow="${x.w}" data-lcs-heart="${x.heart.join(',')}" style="display:flex;flex-direction:${d.uw ? 'row' : 'column'};align-items:${d.uw ? 'flex-end' : 'flex-start'};gap:${d.uw ? 14 : 0}px">` +
      `<span data-lcs-read data-lcs-hw style="${d.uw ? `flex:0 0 auto;width:${d.lw}px;padding-bottom:${Math.round((B - d.hfont * 1.15) / 2)}px;` : ''}font:800 ${d.hfont}px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(x.w)}</span>` +
      `<div style="display:flex;gap:4px">${x.boxes.map((g, i) => `<div data-lcs-hcol="${i}" style="display:flex;flex-direction:column;align-items:center;gap:2px"><div data-lcs-hspace style="height:${hs}px;display:flex;align-items:flex-end">${key && x.heart.includes(i) ? heartSvg(hs) : ''}</div>` +
        `<div data-lcs-hbox="${esc(g)}" style="width:${d.uw ? wbox(g) : wordW(x)}px;height:${B}px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF;display:flex;align-items:center;justify-content:center;font:800 ${Math.round(B * 0.55)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(g) : ''}</div></div>`).join('')}</div></div>`;
    return cream('data-lcs-task="heartbox"', label(`${num(k)}${LINES.heartbox}`) +
      `<div data-lcs-hgrid style="display:grid;grid-template-columns:repeat(${d.cols},1fr);gap:${d.uw ? 3 : hs + 12}px 18px;justify-items:start;padding:2px 6px">${t.items.map(row).join('')}</div>`, d.pad);
  }
  if (t.kind === 'heartsent') {
    // the first letter of the word on the line: level 1 only
    const first = lv === 1;
    return cream('data-lcs-task="heartsent"', label(`${num(k)}${LINES.fold} ${first ? LINES.heartsent : LINES.heartsent2}`) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:4px">` + t.items.map((s) => {
      const [a, c] = s.text.split('___'), start = !a.trim(), wd = start ? s.w[0].toUpperCase() + s.w.slice(1) : s.w;
      const m = c.match(/^[.!?,]+/), tail = m ? m[0] : '', rest = (m ? c.slice(m[0].length) : c).trim(), pb = 4;
      return `<div data-lcs-hsent="${s.w}" data-lcs-text="${esc(s.text)}" data-lcs-read style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:2px 8px;font:700 20px/1.3 'Nunito',sans-serif;color:${T.ink}">${a.trim() ? `<span style="padding-bottom:${pb}px">${esc(a.trim())}</span>` : ''}<span data-lcs-blankgroup style="display:inline-flex;align-items:flex-end">${rule({ w: 170, starter: first ? wd[0] : null, answer: key ? wd : null })}${tail ? `<span data-lcs-tail style="padding-bottom:${pb}px">${esc(tail)}</span>` : ''}</span>${rest ? `<span style="padding-bottom:${pb}px">${esc(rest)}</span>` : ''}</div>`;
    }).join('') + `</div>`, d.pad, 6, grow(t.items.length));
  }
  if (t.kind === 'own') {
    return cream('data-lcs-task="own"', label(`${num(k)}${LINES.own}`) + rule({ w: inner - 8, h: 36, answer: key ? 'Sentences will vary.' : null, sample: true }) + rule({ w: inner - 8, h: 36 }), d.pad, 4);
  }
  throw new Error('long-words-g3: no block for ' + t.kind);
}

/** what verify() needs to know of the bank, per mode */
function infoOf(mode) {
  const B = BANK;
  if (mode === 'co') return { levels: Object.fromEntries(Object.entries(B.co.levels).map(([lv, ws]) => [lv, ws.map((x) => ({ w: x.w, parts: x.parts, marks: x.marks }))])), review: Object.fromEntries(Object.entries(B.co.review || {}).map(([lv, ws]) => [lv, ws.map((x) => ({ w: x.w, parts: x.parts, marks: x.marks }))])), sentences: Object.fromEntries(Object.entries(B.co.sentences).map(([lv, ss]) => [lv, Object.fromEntries(ss.map((s) => [s.text, { right: s.right, fits: s.fits }]))])) };
  if (mode === 'cosort') { const info = Object.fromEntries([1, 2, 3].flatMap((l) => B.co.levels[l]).map((x) => [x.w, { parts: x.parts, marks: x.marks }])); return { info, levels: B.cosort.levels, neither: B.cosort.neither.map((x) => x.w), yesno: Object.fromEntries(Object.entries(B.cosort.yesno).map(([lv, ss]) => [lv, Object.fromEntries(ss.map((s) => [s.text, s.a]))])) }; }
  if (mode === 'types') return { levels: Object.fromEntries(Object.entries(B.ty.levels).map(([lv, ws]) => [lv, ws.map((x) => ({ w: x.w, parts: x.parts, marks: x.marks }))])), sort: Object.fromEntries(Object.entries(B.ty.sortPool).map(([lv, ws]) => [lv, Object.fromEntries(ws.map((x) => [x.w, x.marks.join('')]))])) };
  if (mode === 'typebuild') return { lvWords: Object.fromEntries([1, 2, 3].map((lv) => [lv, [...B.ty.levels[lv].map((x) => x.w), ...B.ty.build[lv].flatMap((x) => [x[2], ...(lv === 3 ? [x[0], x[1]] : [])])]])), build: B.ty.build, joins: B.ty.joins, yesno: Object.fromEntries(Object.entries(B.ty.yesno).map(([lv, ss]) => [lv, Object.fromEntries(ss.map((s) => [s.text, s.a]))])) };
  if (mode === 'suffix' || mode === 'suffix2') return { words: Object.fromEntries(B.suffix.words.map((x) => [x.w, { base: x.base, suf: x.suf, shown: x.shown, change: x.change, meaning: x.meaning, sentence: x.sentence, two: !!x.two, odd: !!x.odd }])), levels: B.suffix.levels, pairs: B.suffix.pairs, pick: Object.fromEntries(Object.entries(B.suffix.pick).map(([lv, ps]) => [lv, Object.fromEntries(ps.map(([t, r, o]) => [t, { right: r, other: o }]))])) };
  if (mode === 'heart') return { words: Object.fromEntries(B.heart.words.map((x) => [x.w, { boxes: x.boxes, heart: x.heart }])), sentences: B.heart.sentences, always: B.heart.always };
  return { groups: B.ough.groups, other: B.ough.other.map((x) => x.w), yesno: Object.fromEntries(B.ough.yesno.map((s) => [s.text, s.a])) };
}

function makeLongWordsG3Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('long-words-g3: unknown mode ' + mode);
  const INFO = { ...infoOf(mode), instr: INSTR[mode], lines: LINES, heads: HEADS, say: SAYT[mode] };
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // THE ITEM BANK of the unit checks (Part 7.6): G3-512, G3-514, G3-516, G3-518 (longCheckPage below)
    ...(LONG_CHECK_MODES.has(mode) ? { checkPage(args, ctx) { return longCheckPage(mode, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, rng);
      const inner = W - 24;
      const blocks = plan.tasks.map((t, i) => renderTask(t, i + 1, mode, lv, d, key, inner, BANK));
      // G3-518: a fold line between the words and the sentences (the child folds the words back and writes from memory)
      if (mode === 'heart') blocks.splice(1, 0, `<div data-lcs-fold style="display:flex;align-items:center;gap:10px;color:${T.inkSoft};font:700 19px/1.2 'Nunito',sans-serif"><span style="flex:1 1 auto;border-top:2.5px dashed ${T.inkSoft}"></span><span data-lcs-foldtext>Fold back</span><span style="flex:1 1 auto;border-top:2.5px dashed ${T.inkSoft}"></span></div>`);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-g3long="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((LEVELS, INFO, CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-g3long]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsG3long.split('|'), lv = +lvS, d = LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        // the printed text has typographic marks (’ “ ”); it is compared with the bank's straight ones
        const straight = (s) => String(s).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
        const txt = (e) => straight(e.textContent.replace(/\s+/g, ' ').trim());
        const flat = (s) => straight(String(s).replace(/\s+/g, ''));
        const toks = (t) => (String(t).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []).map((w) => w.replace(/'s$/, ''));
        const has = (t, w) => toks(t).includes(String(w).toLowerCase());
        const TEAL = 'rgb(20, 107, 94)';
        const say = INFO.say;   // the examples of every instruction of the type
        const rb = R(root);
        // letters: ligatures off everywhere, and an f before i, f, l, t and a t before t have their own room
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        if (root.querySelectorAll('img').length) fails.push('a picture on a page without pictures');
        // every printed text has the typographic apostrophe and quotes (clown’s, “Call me.”), never a straight one
        { const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
          while ((n = tw.nextNode())) { const pe = n.parentElement; if (!pe || /^(STYLE|SCRIPT|NOSCRIPT|TEMPLATE)$/.test(pe.tagName)) continue; if (/['"]/.test(n.textContent)) { fails.push('a printed text holds a straight apostrophe or quote: "' + n.textContent.trim().slice(0, 40) + '"'); break; } } }
        // the room after an f is a span: inside a flex or grid box it would become a box of its own and eat the spaces around it
        if ([...root.querySelectorAll('[data-lcs-fsep]')].some((e) => /flex|grid/.test(cs(e.parentElement).display))) fails.push('the letters of a line stand as boxes of a flex row: its spaces vanish ("closedfirst")');
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
        const blocks = [...root.children].filter((e) => e.dataset.lcsFold === undefined);
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('span, div').forEach((e) => { const q = R(e); if (e.dataset.lcsRing !== undefined || e.dataset.lcsSplitbar !== undefined || e.dataset.lcsCrossmark !== undefined) return; if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        { const seen = new Set(fails); fails.length = 0; seen.forEach((x) => fails.push(x)); }
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const kinds = blocks.map((b) => b.dataset.lcsTask);
        if (kinds.join() !== d.tasks.map((t) => t[0]).join()) fails.push(`the tasks are ${kinds.join(', ')}, not ${d.tasks.map((t) => t[0]).join(', ')}`);
        const countOf = (kind) => (d.tasks.find((t) => t[0] === kind) || [])[1];
        // sizes
        root.querySelectorAll('[data-lcs-line]').forEach((l) => { if (R(l).height < CFG.ROWH - 0.5) fails.push(`a writing line lower than ${CFG.ROWH} px`); });
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 18) fails.push('text a third grader reads is smaller than 18 px'); });
        root.querySelectorAll('[data-lcs-legend]').forEach((e) => { if (fs(e) < 15) fails.push('the key to the letters is smaller than 15 px'); });
        root.querySelectorAll('[data-lcs-pill], [data-lcs-chip], [data-lcs-boxpart]').forEach((e) => { if (fs(e) < 20) fails.push('a word to choose or sort is smaller than 20 px'); });
        root.querySelectorAll('[data-lcs-markbox]').forEach((e) => { if (R(e).width < CFG.MARKBOX - 0.5 || R(e).height < CFG.MARKBOX - 0.5) fails.push(`a box for a letter is smaller than ${CFG.MARKBOX} px`); });
        // no blank band higher than BAND px between the tasks or inside one: every printed thing (a letter, a line, a box, a
        // bar) covers a stretch of the page from top to bottom; the stretches leave no gap higher than BAND
        { const ink = [], seen = new Set();
          const visible = (e) => { const s = cs(e); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity !== 0; };
          const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
          while ((n = tw.nextNode())) { if (!n.textContent.trim() || !visible(n.parentElement)) continue; const rg = document.createRange(); rg.selectNodeContents(n); [...rg.getClientRects()].forEach((q) => q.height && ink.push([q.top, q.bottom])); }
          root.querySelectorAll('*').forEach((e) => { if (seen.has(e) || !visible(e)) return; const s = cs(e), q = R(e); if (!q.height) return;
            const border = ['Top', 'Right', 'Bottom', 'Left'].some((sd) => parseFloat(s['border' + sd + 'Width']) > 0 && s['border' + sd + 'Style'] !== 'none' && !/rgba\(0, 0, 0, 0\)|transparent/.test(s['border' + sd + 'Color']));
            const fill = !/rgba\(0, 0, 0, 0\)|transparent/.test(s.backgroundColor) && s.backgroundColor !== cs(e.closest('[data-lcs-task]') || root).backgroundColor;
            if (border || fill || e.tagName === 'svg' || e.dataset.lcsFold !== undefined) ink.push([q.top, q.bottom]); });
          ink.sort((a, c) => a[0] - c[0]);
          let reach = rb.top, worst = 0, at = 0;
          for (const [t, bt] of ink) { if (t - reach > worst) { worst = t - reach; at = reach; } reach = Math.max(reach, bt); }
          if (rb.bottom - reach > worst) { worst = rb.bottom - reach; at = reach; }
          if (worst > CFG.BAND) fails.push(`a blank band of ${Math.round(worst)} px ${Math.round(at - rb.top)} px below the top of the page body (most ${CFG.BAND})`); }
        // a writing line is long enough for its answer in the key's letters (19 px): the key never shrinks or cuts it
        { const probe = document.createElement('span'); probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;font:700 19px/1 'Nunito',sans-serif"; root.appendChild(probe);
          const need = (s) => { probe.textContent = s; return probe.getBoundingClientRect().width; };
          const room = (l, s, what) => { if (l && need(s) > R(l).width - 10) fails.push(`the line for ${what} "${s}" is too short for it (${Math.round(need(s))} px of writing on a ${Math.round(R(l).width)} px line)`); };
          root.querySelectorAll('[data-lcs-build]').forEach((e) => room(e.querySelector('[data-lcs-blankgroup] [data-lcs-line]'), e.dataset.lcsBuild, 'the word'));
          root.querySelectorAll('[data-lcs-make]').forEach((e) => room(e.querySelector('[data-lcs-makeword] [data-lcs-line]'), e.dataset.lcsMake, 'the word'));
          root.querySelectorAll('[data-lcs-hsent]').forEach((e) => room(e.querySelector('[data-lcs-blankgroup] [data-lcs-line]'), e.dataset.lcsHsent, 'the heart word'));
          root.querySelectorAll('[data-lcs-join]').forEach((e) => room(e.querySelector('[data-lcs-wordline] [data-lcs-line]'), e.dataset.lcsJoin, 'the word'));
          probe.remove();
          // the key: its words stand whole on their lines, at the key's size
          root.querySelectorAll('[data-lcs-keytext]').forEach((k) => { const l = k.closest('[data-lcs-line]'); if (R(k).right > R(l).right - 3 || (!l.dataset.lcsKeySample && fs(k) < 18.5)) fails.push(`the key's answer "${txt(k)}" is wider than its line, or shrunk to fit it`); }); }
        root.querySelectorAll('[data-lcs-tail]').forEach((e) => { const p = e.previousElementSibling; if (!p || R(e).left - R(p).right > 1.5 || R(e).left < R(p).right - 0.5) fails.push('a period does not stand tight after its line'); });
        // the rings: only the key rings a word, and it rings the right one
        root.querySelectorAll('[data-lcs-pill]').forEach((p) => { const ringed = cs(p).borderTopColor === TEAL; if (isKey ? ringed !== !!p.dataset.lcsOk : ringed) fails.push('a word is ringed on the page of the child, or the key rings the wrong word'); });
        // a line of the child's page is empty; a line of the key that holds an answer says it
        root.querySelectorAll('[data-lcs-line]').forEach((l) => { const k = l.querySelector('[data-lcs-keytext]'); if (!isKey && (k || l.dataset.lcsAnswer)) fails.push('a writing line of the child\'s page holds an answer'); if (k && txt(k) !== l.dataset.lcsAnswer) fails.push('a key line does not write its answer'); });
        if (!isKey && root.querySelectorAll('[data-lcs-keynote], [data-lcs-heartmark], [data-lcs-ring], [data-lcs-splitbar], [data-lcs-crossmark]').length) fails.push('the child\'s page shows a mark of the key');
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== INFO.instr[lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        { const folds = [...root.querySelectorAll('[data-lcs-fold]')];
          if (mode === 'heart') { if (folds.length !== 1 || txt(folds[0]) !== 'Fold back' || !blocks[1] || R(folds[0]).top < R(blocks[0]).bottom - 0.5 || R(folds[0]).bottom > R(blocks[1]).top + 0.5) fails.push('no fold line "Fold back" between tasks 1 and 2'); }
          else if (folds.length) fails.push('a fold line on a page without one'); }
        const checkPlaces = (ps, m, what, cap) => { if (ps.length >= 2 && new Set(ps).size < Math.min(ps.length, m)) fails.push(`the right ${what} stands in one place every time`); if (ps.length >= 4 && Math.max(...Array.from({ length: m }, (_, k) => ps.filter((x) => x === k).length)) > Math.min(cap || Infinity, Math.ceil((m === 2 ? 0.6 : 0.5) * ps.length))) fails.push(`the right ${what} stands in one place too often`); if (ps.length >= 3 && (ps.every((x, i) => !i || x === ps[i - 1] + 1) || ps.every((x, i) => !i || x === ps[i - 1] - 1))) fails.push(`the right ${what} stands in a staircase`);
          if (m === 2 && ps.length >= 3 && ps.every((x, i) => !i || x !== ps[i - 1])) fails.push(`the right ${what} stands every other time in the other place`); if (ps.some((x, i) => i >= 2 && x === ps[i - 1] && x === ps[i - 2])) fails.push(`the right ${what} stands three times in a row in one place`); };
        const texts = [];    // [where, text]: what the page prints
        const answers = [];  // [where, word]: what answers an item
        const label1 = (b) => txt(b.querySelector('[data-lcs-label]')).replace(/^\d+\.\s*/, '');

        for (const b of blocks) {
          const kind = b.dataset.lcsTask, n = countOf(kind);
          if (kind === 'split') {
            const cells = [...b.querySelectorAll('[data-lcs-split]')], words = [...INFO.levels[lv], ...((INFO.review || {})[lv] || [])];
            const want = mode === 'co' ? INFO.lines.splitCo : INFO.lines.splitTy, leg = b.querySelector('[data-lcs-legend]');
            if (label1(b) !== want || !leg || txt(leg) !== (mode === 'co' ? INFO.lines.legendCo : INFO.lines.legendTy)) fails.push('the line of the split or its key to the letters is not the one of this page');
            if (cells.length !== n || new Set(cells.map((c) => c.dataset.lcsSplit)).size !== n) fails.push(`not ${n} different words to split`);
            const marksSeen = [];
            cells.forEach((c) => { const w = c.dataset.lcsSplit, x = words.find((y) => y.w === w), syl = [...c.querySelectorAll('[data-lcs-syl]')], boxes = [...c.querySelectorAll('[data-lcs-markbox]')];
              if (!x || say.includes(w)) { fails.push(`"${w}" is no word of this level, or an example`); return; }
              if (syl.map((s) => s.textContent).join('') !== w || syl.map((s) => s.textContent).join('|') !== x.parts.join('|') || c.dataset.lcsAt !== x.parts.map((p) => p.length).join(',') || c.dataset.lcsMarks !== x.marks.join('')) fails.push(`"${w}" is not split and typed as the bank has it`);
              // the child's page gives the split away nowhere: the syllables touch, and the boxes stand as one group under the word
              syl.forEach((s, i) => { if (i && Math.abs(R(s).left - R(syl[i - 1]).right) > 0.6) fails.push(`the syllables of "${w}" stand apart on the page`); });
              if (boxes.length !== x.parts.length || boxes.map((q) => q.dataset.lcsWant).join('') !== x.marks.join('')) fails.push(`"${w}" has not one box for each syllable`);
              const gaps = boxes.slice(1).map((q, i) => Math.round(R(q).left - R(boxes[i]).right)); if (new Set(gaps).size > 1) fails.push(`the boxes of "${w}" are spaced like its syllables`);
              const wr = R(c.querySelector('[data-lcs-word]')), br = boxes.length ? { l: R(boxes[0]).left, r: R(boxes[boxes.length - 1]).right } : null;
              if (br && Math.abs((br.l + br.r) / 2 - (wr.left + wr.right) / 2) > 2) fails.push(`the boxes of "${w}" are not centered under the word`);
              boxes.forEach((q) => { if (isKey ? txt(q) !== q.dataset.lcsWant : txt(q)) fails.push(`a box of "${w}" is filled on the page of the child, or the key does not fill it`); });
              const bars = [...c.querySelectorAll('[data-lcs-splitbar]')];
              if (isKey) { if (bars.length !== x.parts.length - 1 || bars.some((bar, i) => !syl[i + 1].contains(bar))) fails.push(`the key does not draw a line between each two syllables of "${w}"`);
                else bars.forEach((bar, i) => { const bx = R(bar).left + R(bar).width / 2; if (bx < R(syl[i]).right - fs(syl[i]) * 0.3 || bx > R(syl[i + 1]).left + fs(syl[i + 1]) * 0.3) fails.push(`the key's line is not between the syllables of "${w}"`); }); }
              marksSeen.push(x.marks.join(''));
              texts.push(['split', w]); });
            // the letters to write are a choice on every page
            if (mode === 'co' && lv < 3 && new Set(marksSeen.map((m) => m[1])).size < 2) fails.push('every second syllable has one mark: the boxes are no choice');
            if (mode === 'co' && lv === 3 && new Set(marksSeen.map((m) => m[0])).size < 2) fails.push('every first syllable has one mark: level 3 needs both splits');
            // level 2: three or four words with a closed first syllable, so the first box is a choice too
            if (mode === 'co' && lv === 2) { const c = marksSeen.filter((m) => m[0] === 'C').length; if (c < 3 || c > 4) fails.push(`level 2 has ${c} words with a closed first syllable, not three or four`); }
            if (mode === 'types' && new Set(marksSeen.join('').split('')).size < 3) fails.push('the words to split use fewer than three types');
            // (2026-11-19) every letter of the legend is an answer of the level: level 2 has two vowel-team syllables or more
            if (mode === 'types' && lv === 2 && marksSeen.filter((m) => m.includes('V')).length < 2) fails.push('level 2 has fewer than two words with a vowel-team syllable (V of the legend)');
          }
          if (kind === 'choose3' || kind === 'pick2') {
            const ss = [...b.querySelectorAll('[data-lcs-choose]')], m = kind === 'pick2' ? 2 : 3;
            if (ss.length !== n) fails.push(`${ss.length} sentences, not ${n}`);
            const pos = [];
            ss.forEach((e) => { const t = e.dataset.lcsText, opts = [...e.querySelectorAll('[data-lcs-pill]')].map((p) => p.dataset.lcsWord), ok = [...e.querySelectorAll('[data-lcs-pill][data-lcs-ok]')];
              const rec = mode === 'co' ? INFO.sentences[lv][t] : (INFO.pick[lv] || {})[t];
              if (!rec || rec.right !== e.dataset.lcsChoose) { fails.push(`the sentence for "${e.dataset.lcsChoose}" is not a sentence of the bank keyed to its word`); return; }
              if (flat(txt(e.querySelector('[data-lcs-read]'))) !== flat(t.replace('___', ''))) fails.push(`"${t}" is not printed as the bank has it`);
              if (opts.length !== m || new Set(opts).size !== m || ok.length !== 1 || ok[0].dataset.lcsWord !== rec.right) fails.push(`"${t}" does not offer its word among ${m} words`);
              if (mode === 'co') { const words = INFO.levels[lv].map((x) => x.w); if (opts.some((w) => !words.includes(w)) || opts.some((w) => w !== rec.right && rec.fits.includes(w))) fails.push(`"${t}" offers a word of another level, or one that fits too`);
                const art = (t.match(/\b(a|an)\s+___/i) || [])[1]; if (art && opts.some((w) => (art.toLowerCase() === 'an') !== (/^[aeiou]/.test(w) && !/^u[^aeiou][aeiou]/.test(w)))) fails.push(`the article before the blank of "${t}" fits only some of the words`); }
              else if (!opts.includes(rec.other)) fails.push(`"${t}" does not offer the other word of its base`);
              if (say.includes(rec.right)) fails.push(`the answer "${rec.right}" is an example of the instruction`);
              pos.push(opts.indexOf(rec.right)); texts.push(['choose', t]); opts.filter((w) => w !== rec.right).forEach((w) => texts.push(['option', w])); answers.push(['choose', rec.right]); });
            checkPlaces(pos, m, 'word of the sentences', kind === 'pick2' ? CFG.PICK_CAP : 0);
            // the blank and the mark after it stand on one line
            ss.forEach((e) => { const bl = e.querySelector('[data-lcs-blank]'), p = e.querySelector('[data-lcs-punct]'); if (bl && p && (R(p).top > R(bl).bottom + 0.5 || R(p).bottom < R(bl).top || R(p).left < R(bl).right - 1 || R(p).left > R(bl).right + 4)) fails.push(`the mark after the blank of "${e.dataset.lcsText}" stands apart from it`); });
            { const all = ss.flatMap((e) => [...e.querySelectorAll('[data-lcs-pill]')].map((p) => p.dataset.lcsWord)); if (new Set(all).size !== all.length) fails.push('a word is offered twice on the page'); }
            // the options of a row stand on the row of the sentence or right under it, at the right edge
            ss.forEach((e) => { const o = e.querySelector('[data-lcs-opts]'); if (o && Math.abs(R(o).right - R(e).right) > 1.5) fails.push('the words to choose do not stand at the right edge'); });
          }
          if (kind === 'sort') {
            const words = [...b.querySelectorAll('[data-lcs-sortword]')], heads = [...b.querySelectorAll('[data-lcs-head]')].map((h) => h.dataset.lcsHead);
            const want = mode === 'cosort' ? INFO.lines.sortCo + (d.cross ? ' ' + INFO.lines.crossCo : '') : mode === 'ough' ? INFO.lines.sortOugh + (d.cross ? ' ' + INFO.lines.crossOugh : '') : lv === 1 ? INFO.lines.sortTy1 : INFO.lines.sortTy;
            if (label1(b) !== want) fails.push('the line of the sort is not the one of this level');
            if (words.length !== n || new Set(words.map((e) => e.dataset.lcsSortword)).size !== n) fails.push(`not ${n} different words to sort`);
            const headText = mode === 'cosort' ? INFO.heads.cosort : mode === 'ough' ? INFO.heads.ough : lv === 1 ? INFO.heads.types1 : INFO.heads.types;
            b.querySelectorAll('[data-lcs-head]').forEach((h) => { if (txt(h) !== headText[h.dataset.lcsHead] || cs(h).backgroundColor !== TEAL || R(h).width < 120) fails.push('a head of the sort is not a bar with its own words'); });
            const wantHeads = mode === 'cosort' ? 'C,O' : mode === 'types' ? (lv === 1 ? 'short,long' : lv === 2 ? 'L,E' : 'L,E,V') : null;
            if (wantHeads && heads.join() !== wantHeads) fails.push(`the heads are ${heads.join(', ')}, not ${wantHeads}`);
            if (mode === 'ough' && (heads.length !== (d.groups) || heads.some((h) => !INFO.groups[h]))) fails.push(`not ${d.groups} heads of ough sounds`);
            const colOf = (w) => { if (mode === 'cosort') return INFO.info[w] ? INFO.info[w].marks[0] : null; if (mode === 'types') { const m = (INFO.sort[lv] || {})[w]; return !m ? null : lv === 1 ? (m[0] === 'C' ? 'short' : 'long') : m[m.length - 1]; } return Object.keys(INFO.groups).find((g) => INFO.groups[g].includes(w)) || null; };
            const crossed = words.filter((e) => e.dataset.lcsCross === '1').map((e) => e.dataset.lcsSortword);
            if (crossed.length !== (d.cross || 0)) fails.push(`${crossed.length} words to cross out, not ${d.cross || 0}`);
            crossed.forEach((w) => { if (mode === 'cosort' ? !INFO.neither.includes(w) : !INFO.other.includes(w)) fails.push(`"${w}" to cross out is no word of another sound`); const e = words.find((x) => x.dataset.lcsSortword === w), i = words.indexOf(e); if (i === 0 || i === words.length - 1) fails.push('the word to cross out stands first or last'); if (isKey !== !!e.querySelector('[data-lcs-crossmark]')) fails.push('the key does not cross out the odd word, or the child\'s page does'); });
            const cols = [];
            words.filter((e) => e.dataset.lcsCross !== '1').forEach((e) => { const w = e.dataset.lcsSortword, c = colOf(w);
              if (!c || c !== e.dataset.lcsCol || !heads.includes(c)) fails.push(`"${w}" is not keyed to its head`);
              if (mode === 'cosort' && !(INFO.levels[lv] || []).includes(w)) fails.push(`"${w}" is no word of level ${lv}`);
              if (say.includes(w)) fails.push(`"${w}" is an example of the instruction`);
              cols.push(c); answers.push(['sort', w]); });
            if (cols.some((x, i) => i >= 2 && x === cols[i - 1] && x === cols[i - 2]) || (cols.length >= 3 && cols.every((x, i) => !i || x !== cols[i - 1]))) fails.push('the words of the sort follow a pattern of their heads');
            if (heads.some((h) => cols.filter((c) => c === h).length < 2)) fails.push('a head of the sort has fewer than two words');
            if (mode === 'cosort' && lv === 2 && words.filter((e) => /* one consonant, closed */ (INFO.info[e.dataset.lcsSortword] || { marks: '' }).marks[0] === 'C' && INFO.levels[3].includes(e.dataset.lcsSortword)).length < 2) fails.push('level 2 has fewer than two closed words with one consonant');
            // every column has the same number of lines, enough for its words; the key writes each column's words there
            heads.forEach((h) => { const ls = [...b.querySelectorAll(`[data-lcs-colline="${h}"] [data-lcs-line]`)], mine = cols.filter((x) => x === h).length;
              if (ls.length !== d.lines || mine > d.lines) fails.push(`the column "${h}" has not ${d.lines} lines`);
              if (isKey) { const got = ls.map((l) => l.dataset.lcsAnswer).filter(Boolean).map((a) => a.replace(/ \| /g, '')).sort().join(); const exp = words.filter((e) => e.dataset.lcsCol === h).map((e) => e.dataset.lcsSortword).sort().join(); if (got !== exp) fails.push(`the key does not write the words of the column "${h}"`);
                if (mode === 'cosort') ls.forEach((l) => { const a = l.dataset.lcsAnswer; if (a && a !== INFO.info[a.replace(/ \| /g, '')].parts.join(' | ')) fails.push(`the key does not split "${a}"`); }); } });
            if (isKey !== !!b.querySelector('[data-lcs-keynote]')) fails.push('the key does not say "any order", or the child\'s page does');
            { const room = b.querySelector('[data-lcs-keyroom]'); if (!isKey && (!room || cs(room).visibility !== 'hidden')) fails.push('the child\'s page keeps no hidden room for the key\'s note'); }
          }
          if (kind === 'yesno') {
            const rows = [...b.querySelectorAll('[data-lcs-yn]')];
            if (rows.length !== n) fails.push(`${rows.length} yes/no sentences, not ${n}`);
            const bankYN = mode === 'ough' ? INFO.yesno : (INFO.yesno || {})[lv] || {};
            const pos = [];
            rows.forEach((e) => { const t = e.dataset.lcsText, pills = [...e.querySelectorAll('[data-lcs-pill]')], ok = pills.filter((p) => p.dataset.lcsOk);
              if (bankYN[t] !== e.dataset.lcsYn || flat(txt(e.querySelector('[data-lcs-read]'))) !== flat(t)) fails.push(`the sentence "${t}" is not a sentence of the bank with its answer`);
              if (pills.map((p) => p.dataset.lcsWord).join() !== 'yes,no' || ok.length !== 1 || ok[0].dataset.lcsWord !== e.dataset.lcsYn) fails.push(`"${t}" is not keyed to its answer between yes and no`);
              if (pills.length === 2 && Math.abs(R(pills[0]).top - R(pills[1]).top) > 1) fails.push('yes and no do not stand side by side');
              if (say.some((w) => has(t, w))) fails.push(`"${t}" prints an example of the instruction`);
              pos.push(e.dataset.lcsYn === 'yes' ? 0 : 1); texts.push(['yes/no', t]); });
            checkPlaces(pos, 2, 'answer of the yes/no sentences');
            { const isLw = (w) => (mode === 'cosort' ? !!INFO.info[w] : mode === 'typebuild' ? INFO.lvWords[lv].includes(w) : /ough/.test(w)); const cnt = {}; rows.forEach((e) => [...new Set(toks(e.dataset.lcsText).filter(isLw))].forEach((w) => (cnt[w] = (cnt[w] || 0) + 1))); if (Object.values(cnt).some((c) => c > (mode === 'ough' ? 2 : 1))) fails.push('two yes/no sentences are about one word of the lesson'); }
            const xs = rows.map((e) => Math.round(R(e.querySelector('[data-lcs-ynpills]')).right));
            if (new Set(xs).size > 1) fails.push('yes and no do not stand in one column');
          }
          if (kind === 'join') {
            const js = [...b.querySelectorAll('[data-lcs-join]')], box = [...b.querySelectorAll('[data-lcs-boxpart]')].map((e) => e.dataset.lcsBoxpart), J = INFO.joins[lv];
            const joins = (a, c) => J.some(([x, y]) => x === a && y === c);
            if (label1(b) !== INFO.lines.join) fails.push('the line of the parts is not the one of this page');
            if (js.length !== n) fails.push(`${js.length} words to build, not ${n}`);
            const firsts = js.map((e) => e.dataset.lcsFirst);
            js.forEach((e) => { const w = e.dataset.lcsJoin, x = INFO.build[lv].find((y) => y[2] === w), pl = e.querySelector('[data-lcs-partline] [data-lcs-line]'), wl = e.querySelector('[data-lcs-wordline] [data-lcs-line]');
              if (!x || x[0] !== e.dataset.lcsFirst || txt(e.querySelector('[data-lcs-first]')) !== x[0] || !box.includes(x[1]) || say.includes(w)) { fails.push(`"${w}" is not built from its first part and a part of the box`); return; }
              if (!pl || !wl || (isKey && (pl.dataset.lcsAnswer !== x[1] || wl.dataset.lcsAnswer !== w))) fails.push(`the lines of "${w}" do not hold the part and the word on the key`);
              answers.push(['join', w]); });
            firsts.forEach((a) => { if (box.filter((c) => joins(a, c)).length !== 1) fails.push(`"${a}" makes a word with ${box.filter((c) => joins(a, c)).length} parts of the box`); });
            box.forEach((c) => { if (firsts.filter((a) => joins(a, c)).length > 1) fails.push(`the part "${c}" makes a word with two first parts`); });
            if (box.length !== n + d.extra || new Set(box).size !== box.length) fails.push(`the box is not ${n + d.extra} different parts`);
            // levels 1 and 2: at most two rows found by a doubled letter (puz + zle)
            if (lv <= 2) { const dbl = js.filter((e) => { const x = INFO.build[lv].find((y) => y[2] === e.dataset.lcsJoin); return x && x[0].slice(-1) === x[1][0]; }).length; if (dbl > 2) fails.push(`${dbl} rows are found by a doubled letter (most two)`); }
            const idx = js.map((e) => box.indexOf(INFO.build[lv].find((y) => y[2] === e.dataset.lcsJoin)[1]));
            if (idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1))) fails.push('the parts in the box stand in a staircase');
          }
          if (kind === 'parts') {
            const cells = [...b.querySelectorAll('[data-lcs-part]')];
            if (label1(b) !== (lv === 3 ? INFO.lines.parts3 : INFO.lines.parts)) fails.push('the line of the base words is not the one of this level');
            if (cells.length !== n || new Set(cells.map((c) => c.dataset.lcsPart)).size !== n) fails.push(`not ${n} different words to mark`);
            const sufs = [];
            cells.forEach((c) => { const w = c.dataset.lcsPart, x = INFO.words[w], base = c.querySelector('[data-lcs-base]'), suf = c.querySelector('[data-lcs-suffix]');
              if (!x || !INFO.levels[lv].includes(x.suf) || (lv < 3 && x.change) || say.includes(w)) { fails.push(`"${w}" is no word of this level`); return; }
              if (x.two) fails.push(`"${w}": its base carries a suffix of its own, so the base word to circle is not one word`);
              if (!base || !suf || base.textContent !== x.shown || suf.textContent !== x.suf || base.textContent + suf.textContent !== w) fails.push(`"${w}" is not its base and its suffix as the bank has them`);
              if (base && suf && Math.abs(R(suf).left - R(base).right) > 0.6) fails.push(`the base and the suffix of "${w}" stand apart`);
              const ring = c.querySelector('[data-lcs-ring]');
              if (isKey ? !ring || !base.contains(ring) || cs(suf).boxShadow === 'none' : ring || cs(suf).boxShadow !== 'none') fails.push(`the key does not circle the base and underline the suffix of "${w}", or the child's page does`);
              sufs.push(x.suf); texts.push(['parts', w]); });
            if (lv === 3 && cells.filter((c) => (INFO.words[c.dataset.lcsPart] || {}).change).length < 3) fails.push('level 3 has fewer than three words whose base changes');
            if (new Set(sufs).size < INFO.levels[lv].length) fails.push('the words to mark do not use every suffix of the level');
          }
          if (kind === 'match') {
            const ws = [...b.querySelectorAll('[data-lcs-mword]')].map((e) => e.dataset.lcsMword), ms = [...b.querySelectorAll('[data-lcs-meaning]')];
            if (ws.length !== n || ms.length !== n) fails.push(`not ${n} words and ${n} meanings`);
            if (ms.map((m) => m.dataset.lcsMeaning).join('') !== 'ABCD'.slice(0, n)) fails.push('the meanings are not lettered A, B, C, D');
            ms.forEach((m) => { const x = INFO.words[m.dataset.lcsMw]; if (!x || x.odd || flat(txt(m)) !== flat(m.dataset.lcsMeaning + x.meaning) || !ws.includes(m.dataset.lcsMw)) fails.push('a meaning is not the meaning of a word of the task'); });
            const off = ws.map((w, i) => ms.findIndex((m) => m.dataset.lcsMw === w) - i);
            if (off.some((x) => x === 0)) fails.push('a word stands straight across from its meaning');
            if (new Set(off.map((x) => (x + n) % n)).size < 2) fails.push('every word stands one distance from its meaning');
            // two words of one base in each pair, so the suffix decides
            const bases = ws.map((w) => (INFO.words[w] || {}).base);
            if (bases.some((x) => bases.filter((y) => y === x).length !== 2)) fails.push('the words to match are not pairs of one base');
            b.querySelectorAll('[data-lcs-mword]').forEach((e) => { const box = e.querySelector('[data-lcs-markbox]'), want = (ms.find((m) => m.dataset.lcsMw === e.dataset.lcsMword) || {}).dataset; if (!box || !want || box.dataset.lcsWant !== want.lcsMeaning || (isKey ? txt(box) !== want.lcsMeaning : txt(box))) fails.push(`the box of "${e.dataset.lcsMword}" is not keyed to its meaning`); });
            ws.forEach((w) => { texts.push(['match', w]); answers.push(['match', w]); });
          }
          if (kind === 'build') {
            const rows = [...b.querySelectorAll('[data-lcs-build]')];
            if (label1(b) !== INFO.lines.build) fails.push('the line of the sentences is not the one of this page');
            if (rows.length !== n) fails.push(`${rows.length} sentences, not ${n}`);
            rows.forEach((e) => { const w = e.dataset.lcsBuild, x = INFO.words[w], l = e.querySelector('[data-lcs-blankgroup] [data-lcs-line]');
              if (!x || x.sentence !== e.dataset.lcsText || !INFO.levels[lv].includes(x.suf) || (lv < 3 && x.change) || say.includes(w)) { fails.push(`"${w}" is no word of this level with its sentence`); return; }
              if (flat(txt(e.querySelector('[data-lcs-cue]'))) !== flat(x.base + '+' + x.suf)) fails.push(`the cue of "${w}" is not its base and suffix`);
              const copy = e.querySelector('[data-lcs-btext]').cloneNode(true); copy.querySelectorAll('[data-lcs-cue]').forEach((q) => q.remove()); copy.querySelectorAll('[data-lcs-line]').forEach((q) => q.replaceWith('___'));
              // the cue stands right under the line of its word
              { const cu = e.querySelector('[data-lcs-cue]'); if (cu && l && (R(cu).top < R(l).bottom - 0.5 || R(cu).top > R(l).bottom + 8 || Math.abs((R(cu).left + R(cu).right) / 2 - (R(l).left + R(l).right) / 2) > 2)) fails.push(`the cue of "${w}" does not stand under its line`); }
              if (flat(copy.textContent) !== flat(x.sentence)) fails.push(`"${x.sentence}" is not printed as the bank has it`);
              if (!l || (isKey && l.dataset.lcsAnswer.toLowerCase() !== w)) fails.push(`the line of "${w}" does not hold the word on the key`);
              texts.push(['build', x.sentence]); answers.push(['build', w]); });
            if (lv === 3 && rows.filter((e) => (INFO.words[e.dataset.lcsBuild] || {}).change).length < 2) fails.push('level 3 builds fewer than two words whose base changes');
            if (lv === 1 && ['ful', 'less'].some((sx) => rows.filter((e) => (INFO.words[e.dataset.lcsBuild] || {}).suf === sx).length < 2)) fails.push('level 1 builds fewer than two words of -ful or of -less');
          }
          if (kind === 'makeit') {
            const rows = [...b.querySelectorAll('[data-lcs-make]')];
            if (label1(b) !== INFO.lines.makeit) fails.push('the line of the words to build is not the one of this page');
            if (rows.length !== n) fails.push(`${rows.length} words to build, not ${n}`);
            rows.forEach((e) => { const w = e.dataset.lcsMake, x = INFO.words[w], wl = e.querySelector('[data-lcs-makeword] [data-lcs-line]'), ml = e.querySelector('[data-lcs-makemean] [data-lcs-line]');
              if (!x || say.includes(w) || (lv === 1 ? !['ful', 'less'].includes(x.suf) || x.change : lv === 2 ? !['ness', 'ment'].includes(x.suf) || x.change : !x.change)) { fails.push(`"${w}" is no word to build on this level`); return; }
              if (x.odd) fails.push(`"${w}" does not mean what its suffix means: never in a meaning task`);
              if (flat(txt(e.querySelector('[data-lcs-cue]'))) !== flat(x.base + '+' + x.suf + '=')) fails.push(`the cue of "${w}" is not its base and suffix`);
              if (!wl || !ml || (isKey && (wl.dataset.lcsAnswer !== w || ml.dataset.lcsAnswer !== 'Sample answer: ' + x.meaning || ml.dataset.lcsKeySample !== '1'))) fails.push(`the lines of "${w}" do not hold the word and a sample meaning on the key`);
              answers.push(['make', w]); });
          }
          if (kind === 'heartbox') {
            const rows = [...b.querySelectorAll('[data-lcs-hrow]')], ws = rows.map((e) => e.dataset.lcsHrow);
            if (rows.length !== n || new Set(ws).size !== n) fails.push(`not ${n} different heart words`);
            if (INFO.always.some((w) => !ws.includes(w))) fails.push('enough, though, or ocean is missing');
            { const lines = toks([instr ? txt(instr) : '', ...[...root.querySelectorAll('[data-lcs-label], [data-lcs-foldtext]')].map(txt)].join(' ')); ws.forEach((w) => { if (lines.includes(w)) fails.push(`the heart word "${w}" is printed in a task line or the instruction`); }); }
                        rows.forEach((e) => { const w = e.dataset.lcsHrow, x = INFO.words[w], boxes = [...e.querySelectorAll('[data-lcs-hbox]')], hearts = [...e.querySelectorAll('[data-lcs-heartmark]')];
              if (!x || txt(e.querySelector('[data-lcs-hw]')) !== w) { fails.push(`"${w}" is no heart word of the bank`); return; }
              if (boxes.map((q) => q.dataset.lcsHbox).join('|') !== x.boxes.join('|')) fails.push(`the boxes of "${w}" are not its sounds`);
              boxes.forEach((q) => { if (isKey ? txt(q) !== q.dataset.lcsHbox : txt(q)) fails.push(`a box of "${w}" is filled on the page of the child, or the key does not fill it`); if (R(q).height < 38 || R(q).width < 38) fails.push('a sound box smaller than 38 px'); });
              const hcols = hearts.map((h) => +h.closest('[data-lcs-hcol]').dataset.lcsHcol);
              if (isKey ? hcols.join() !== x.heart.join() : hearts.length) fails.push(`the heart of "${w}" is not over its tricky part on the key, or the page of the child shows it`);
              // (2026-11-19, review en-1119-lit) every box of a word one width on every level (a box as wide as its own letters
              // told which box holds ough); level 3: one width for every word (below)
              const ws2 = boxes.map((q) => Math.round(R(q).width));
              if (new Set(ws2).size !== 1) fails.push(`the boxes of "${w}" are not one width (their widths tell the letters)`);
              texts.push(['heartword', w]); });
            // level 3: one box width for every word, wide enough for ough written in the key's letters
            if (d.uw) { const all = [...b.querySelectorAll('[data-lcs-hbox]')], bw = Math.round(R(all[0]).width); const pr = document.createElement('span'); pr.style.cssText = `position:absolute;visibility:hidden;font:800 ${Math.round(d.hbox * 0.55)}px/1 'Nunito',sans-serif`; pr.textContent = 'ough'; b.appendChild(pr); const need = pr.getBoundingClientRect().width + 16; pr.remove();
              if (all.some((q) => Math.round(R(q).width) !== bw) || bw < need) fails.push(`level 3 does not give every sound box one width wide enough for ough (${bw} px, ough needs ${Math.round(need)})`); }
            // each word stands nearer to its own boxes than to the row above it
            rows.forEach((e) => { const lab = R(e.querySelector('[data-lcs-hw]')), own = Math.min(...[...e.querySelectorAll('[data-lcs-hbox]')].map((q) => R(q).top)) - lab.bottom;
              const above = rows.filter((o) => o !== e && R(o).bottom <= lab.top + 0.5 && R(o).left < lab.right && R(o).right > lab.left);
              if (above.length) { const gap = lab.top - Math.max(...above.map((o) => R(o).bottom)); if (own + 4 > gap) fails.push(`the word "${e.dataset.lcsHrow}" stands nearer to the row above (${Math.round(gap)} px) than to its own boxes (${Math.round(own)} px)`); } });
          }
          if (kind === 'heartsent') {
            if (label1(b) !== INFO.lines.fold + ' ' + (lv === 1 ? INFO.lines.heartsent : INFO.lines.heartsent2)) fails.push('the line of the sentences does not begin with folding the top of the page back, or is not the one of this level');
            const ss = [...b.querySelectorAll('[data-lcs-hsent]')], hw = [...root.querySelectorAll('[data-lcs-hrow]')].map((e) => e.dataset.lcsHrow);
            if (ss.length !== n) fails.push(`${ss.length} sentences, not ${n}`);
            ss.forEach((e) => { const w = e.dataset.lcsHsent, t = e.dataset.lcsText, l = e.querySelector('[data-lcs-blankgroup] [data-lcs-line]'), start = /^___/.test(t), want = start ? w[0].toUpperCase() + w.slice(1) : w;
              const rec = (INFO.sentences[w] || []).find((s) => s[0] === t);
              if (!rec || !hw.includes(w)) { fails.push(`the sentence "${t}" is no sentence of the bank for a heart word of the page`); return; }
              if ((rec[1] || []).some((y) => hw.includes(y))) fails.push(`another heart word of the page fits "${t}"`);
              // level 1: the first letter on the line; levels 2 and 3: none (the sentence alone decides)
              if (!l || (isKey ? l.dataset.lcsAnswer !== want : l.dataset.lcsStartertext !== (lv === 1 ? want[0] : undefined)) || (lv > 1 && e.querySelector('[data-lcs-starter]'))) fails.push(`the line of "${t}" does not start with the first letter of its word (level 1 only), or the key does not write it`);
              if (hw.some((x) => has(t.replace('___', ' '), x))) fails.push(`"${t}" prints a heart word of the page`);
              const copy = e.cloneNode(true); copy.querySelectorAll('[data-lcs-blankgroup] [data-lcs-line]').forEach((x) => x.replaceWith('___')); if (flat(copy.textContent) !== flat(t)) fails.push(`"${t}" is not printed as the bank has it`); });
            const idx = ss.map((e) => hw.indexOf(e.dataset.lcsHsent));
            if (ss.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1))) fails.push('the sentences take the heart words in the order of the boxes');
            { const per = {}; idx.forEach((x) => (per[x] = (per[x] || 0) + 1)); if (Object.entries(per).some(([x, c]) => c > (n > hw.length && INFO.always.includes(hw[x]) ? 2 : 1)) || hw.some((w, x) => n >= hw.length && !per[x])) fails.push('a heart word has two sentences, or a word of the boxes has none'); }
            if (idx.some((x, i) => i && x === idx[i - 1]) || new Set(ss.map((e) => e.dataset.lcsText)).size !== ss.length) fails.push('two sentences in a row for one word, or one sentence twice');
            if (ss.filter((e) => INFO.always.includes(e.dataset.lcsHsent)).length < Math.min(2, n - 1)) fails.push('fewer than two sentences with enough, though, or ocean');
          }
          if (kind === 'own') {
            const ls = [...b.querySelectorAll('[data-lcs-line]')];
            if (ls.length !== 2 || label1(b) !== INFO.lines.own) fails.push('the sentence of the child\'s own has not two lines and its line');
          }
        }
        // no answer printed elsewhere on its page
        answers.forEach(([where, w]) => { texts.forEach(([tw, t]) => { if (has(t, w) && !(where === 'choose' && tw === 'option') && !(where === 'match' && tw === 'match')) fails.push(`the ${where} word "${w}" is also printed in a ${tw}`); }); });
        // the yes/no sentences of a sort page print no word of the sort
        if (mode === 'cosort' || mode === 'ough') { const sw = [...root.querySelectorAll('[data-lcs-sortword]')].map((e) => e.dataset.lcsSortword); texts.filter(([w]) => w === 'yes/no').forEach(([, t]) => { if (sw.some((w) => has(t, w))) fails.push(`"${t}" prints a word of the sort`); }); }
        return [...new Set(fails)];
      }, LEVELS, INFO, { ROWH, MARKBOX, BAND, PICK_CAP });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  task with its answer in its markup. Every card names its kind (data-lcs-ckind; lists/en.json kindAttr): form B asks the
 *  kind form A asks, card by card (review en-1119-lit).
 *   co (G3-512), types (G3-514)  one word to split (task 1 of the page), its boxes under the word as a group (they never show
 *            the split), each box carrying its letter as data-lcs-answer; the card prints the page's legend of the letters
 *            (C, O; C, O, E, V, L) and the key draws the line. Level 2 of G3-512 mixes open first syllables with words
 *            split again (muf|fin), so the first box is a choice too. G3-514 level 2: two vowel-team words or more (V), two
 *            silent-e and two consonant-le words; its kinds are v, e, l (the vowel team first), and every page starts with
 *            a vowel-team word. A word of an instruction (robot, open, cupcake) is never a card.
 *   suffix (G3-516)  two kinds of the page's tasks: the match (task 2: two pairs of one base each, careful/careless, four
 *            meanings A to D, a box beside each word carrying the letter of its meaning; no word straight across from its
 *            meaning) and the word to build in a sentence (task 3: base + suffix under the line, data-lcs-answer), with the
 *            level's own suffixes (level 2: -ness, -ment). A base stands once a page.
 *   heart (G3-518)  a heart word the teacher says (the reviewer of 2026-11-19: a printed word is copied, not spelled): its
 *            sounds as a row of boxes of one width (the count is given, the width tells nothing), the whole word as
 *            data-lcs-answer, the key writing the letters and drawing a heart over EACH tricky part (enough: ou and gh).
 *            The word stands on the key only, for the teacher to say. Kinds: core (enough, though, ocean) and more. Never
 *            the sentences: written from memory with no first letter, "We had ___ food." takes "some" as well. */
const LONG_CHECK_MODES = new Set(['co', 'types', 'suffix', 'heart']);
function longCheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`long-words-g3 check: the words are English words (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = LEVELS[mode][lv] || LEVELS[mode][2], rng = ctx.rng, key = !!(ctx && ctx.answerKey), say = SAYT[mode];
  const cards = [];
  const answerBox = (want) => boxMark(want, key, MARKBOX).replace('<span data-lcs-markbox', `<span data-lcs-answer="${esc(want)}" data-lcs-markbox`);
  // (each letter with its name never parts at a line end)
  const small = (t) => `<div data-lcs-checklegend style="font:700 14px/1.3 'Nunito',sans-serif;color:${T.inkSoft};text-align:center">${t.split(' · ').map((x) => `<span style="white-space:nowrap">${esc(x)}</span>`).join(' · ')}</div>`;
  if (mode === 'co' || mode === 'types') {
    const pool = mode === 'co' ? [...BANK.co.levels[lv], ...(lv === 2 ? (BANK.co.review || {})[2] || [] : [])] : BANK.ty.levels[lv];
    const ws = pool.filter((x) => !say.includes(x.w));
    const pat = (x) => x.marks.join('');
    const kindOf = (x) => (mode === 'co' ? pat(x) : x.marks.includes('V') ? 'v' : x.marks.includes('E') ? 'e' : 'l');
    let got = null;
    for (let k = 0; k < 400 && !got; k++) {
      const pick = shuffle(ws, rng).slice(0, 8);
      if (new Set(pick.map((x) => x.w)).size < 8) continue;
      const ps = pick.map(pat), most = Math.max(...[...new Set(ps)].map((p) => ps.filter((q) => q === p).length));
      if (new Set(ps).size < 2 || most > 5) continue;
      if (mode === 'co' && lv === 2 && ps.filter((p) => p[0] === 'C').length < 2) continue;
      if (mode === 'types' && lv === 2 && ['v', 'e', 'l'].some((kd) => pick.filter((x) => kindOf(x) === kd).length < 2)) continue;
      if (ps.some((p, i) => i >= 2 && p === ps[i - 1] && p === ps[i - 2])) continue;
      got = pick;
    }
    if (!got) throw new Error(`long-words-g3 check: no eight words to split for ${mode}`);
    // G3-514: a vowel-team, a silent-e and a consonant-le word first (the first cards of a page are the ones a check takes
    // first; review en-1119-lit-2: each form asks all three kinds the title names)
    if (mode === 'types') { const lead = ['v', 'e', 'l'].map((kd) => got.find((x) => kindOf(x) === kd)).filter(Boolean); got.splice(0, got.length, ...lead, ...got.filter((x) => !lead.includes(x))); }
    const fs = 30;
    for (const x of got) {
      // the word over its boxes, the legend of the letters beside them (the card keeps two lines)
      cards.push(`<div data-lcs-splitcheck="${esc(x.w)}" data-lcs-marks="${x.marks.join('')}" data-lcs-ckind="${kindOf(x)}" style="display:flex;align-items:center;justify-content:center;gap:34px;padding:6px 14px 8px">` +
        `<div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:6px"><span data-lcs-read style="display:inline-flex;font:800 ${fs}px/1.1 'Nunito',sans-serif;color:${T.ink};letter-spacing:0.12em">` +
        x.parts.map((p, i) => `<span style="position:relative;display:inline-block">${i > 0 && key ? `<span data-lcs-splitbar style="position:absolute;top:-6px;bottom:-6px;left:-${(0.06 * fs + 1.5).toFixed(1)}px;width:3px;border-radius:2px;background:${T.teal}"></span>` : ''}${esc(p)}</span>`).join('') + `</span>` +
        `<span style="display:flex;gap:10px">${x.marks.map(answerBox).join('')}</span></div>` +
        `<div style="flex:0 1 330px">${small(mode === 'co' ? LINES.legendCo : LINES.legendTy)}</div></div>`);
    }
  } else if (mode === 'suffix') {
    const S = BANK.suffix, byW = Object.fromEntries(S.words.map((x) => [x.w, x]));
    const pairs = (lv === 3 ? [...S.pairs[1], ...S.pairs[3]] : S.pairs[1]).filter((p) => p.every((w) => byW[w] && !say.includes(w) && !byW[w].odd));
    // the match of the page as it stands there (two pairs, four meanings A to D, no word straight across from its meaning
    // and not all one row away): five cards of ten pairs, no pair twice
    if (pairs.length < 10) throw new Error(`long-words-g3 check: ${pairs.length} pairs`);
    const sh = shuffle(pairs, rng), sets = [];
    for (let j = 0; j + 1 < sh.length && sets.length < 5; j += 2) sets.push([sh[j], sh[j + 1]]);
    const used = new Set(sets.flat(2).map((w) => byW[w].base));
    // the words to build: the level's own suffixes (level 2: -ness and -ment; level 3: -able and bases that change), other bases
    const sufs = lv === 1 ? ['ful', 'less'] : lv === 2 ? ['ness', 'ment'] : ['able', 'ness', 'ment'];
    const build = shuffle(S.words.filter((x) => sufs.includes(x.suf) && (lv === 3 || !x.change) && !say.includes(x.w) && !used.has(x.base) && x.sentence), rng)
      .filter((x, i, a) => a.findIndex((y) => y.base === x.base) === i).slice(0, 5);
    if (build.length < 5) throw new Error('long-words-g3 check: too few words to build');
    const matchCard = (two) => {
      const mw = shuffle(two.flat(), rng);
      let order = null;
      for (let t = 0; t < 200; t++) { const o = shuffle(mw, rng); const off = mw.map((w, i) => (o.indexOf(w) - i + 4) % 4); if (off.some((x) => x === 0) || new Set(off).size < 2) continue; order = o; break; }
      if (!order) throw new Error('long-words-g3 check: no order for the meanings');
      return `<div data-lcs-matchcheck="${esc(two.flat().join('|'))}" data-lcs-ckind="match" style="display:flex;flex-direction:column;gap:4px;padding:6px 16px">` +
        mw.map((w, i) => `<div style="display:grid;grid-template-columns:200px 1fr;gap:16px;align-items:center"><div style="display:flex;align-items:center;gap:10px"><span data-lcs-read style="flex:1 1 auto;font:800 22px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>${answerBox('ABCD'[order.indexOf(w)])}</div>` +
          `<div data-lcs-read style="font:700 19px/1.25 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal};font-weight:800">${'ABCD'[i]}</span>&nbsp;&nbsp;${esc(byW[order[i]].meaning)}</div></div>`).join('') + `</div>`;
    };
    const buildCard = (x) => {
      const [a, c] = x.sentence.split('___'), m = c.match(/^[.!?,'"]+/), tail = m ? m[0] : '', rest = (m ? c.slice(m[0].length) : c).trim();
      const want = a.trim() ? x.w : x.w[0].toUpperCase() + x.w.slice(1);
      // the sentence with its line, the cue (base + suffix) under the line, as on the page
      return `<div data-lcs-buildcheck="${esc(x.w)}" data-lcs-ckind="${lv === 2 && x.suf === 'able' ? 'able' : 'build'}" style="display:flex;justify-content:center;padding:8px 14px 34px">` +
        `<div data-lcs-read style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:32px 7px;font:700 20px/1.3 'Nunito',sans-serif;color:${T.ink}">${a.trim() ? `<span style="padding-bottom:4px">${esc(a.trim())}</span>` : ''}` +
        `<span style="display:inline-flex;align-items:flex-end"><span style="position:relative;display:inline-flex">${rule({ w: BUILDLINE + 0, answer: key ? want : null }).replace('<div data-lcs-line', key ? '<div data-lcs-line' : `<div data-lcs-line data-lcs-answer="${esc(want)}"`)}` +
        `<span data-lcs-read style="position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:3px;white-space:nowrap;padding:0 9px;border-radius:8px;background:#FFFFFF;border:2px solid ${T.teal};font:800 18px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(x.base) + ' + ' + esc(x.suf)}</span></span>` +
        `${tail ? `<span style="padding-bottom:4px">${esc(tail)}</span>` : ''}</span>${rest ? `<span style="padding-bottom:4px">${esc(rest)}</span>` : ''}</div></div>`;
    };
    // a match first, then a word to build, in turn (the first two cards of a page are the ones a check takes first)
    // (review en-1119-lit-2) the lesson's title names -able, and the level-2 page does not have it: the level-2 check
    // asks it too, with a base that does not change (washable), a third card after the match and the -ness/-ment word
    if (lv === 2) {
      const able = shuffle(S.words.filter((x) => x.suf === 'able' && !x.change && !say.includes(x.w) && !used.has(x.base) && x.sentence && !build.some((y) => y.base === x.base)), rng).slice(0, 3);
      if (able.length < 3) throw new Error('long-words-g3 check: too few -able words to build');
      for (let i = 0; i < 3; i++) { cards.push(matchCard(sets[i])); cards.push(buildCard(build[i])); cards.push(buildCard(able[i])); }
      cards.push(matchCard(sets[3]));
    } else sets.forEach((two, i) => { cards.push(matchCard(two)); cards.push(buildCard(build[i])); });
  } else {
    const H = BANK.heart, byW = Object.fromEntries(H.words.map((x) => [x.w, x]));
    // the three words of the lesson and five more of the bank; a word of the lesson first
    const more = shuffle(H.words.map((x) => x.w).filter((w) => !H.always.includes(w)), rng).slice(0, 5);
    const core = shuffle(H.always, rng);
    const words = [core[0], more[0], core[1], more[1], core[2], ...more.slice(2)];
    // one width for every box of every card, wide enough for ough written in the key's letters; the boxes stand in one row
    const B = 46, BW = 74, hs = 19;
    for (const w of words) {
      const x = byW[w];
      cards.push(`<div data-lcs-heartcheck="${esc(w)}" data-lcs-heart="${x.heart.join(',')}" data-lcs-ckind="${H.always.includes(w) ? 'core' : 'more'}" style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 10px 8px">` +
        // the word for the teacher to say: on the key only (the child's card keeps its room)
        `<div data-lcs-sayword style="height:22px;font:700 16px/22px 'Nunito',sans-serif;color:${T.teal}">${key ? 'say: ' + esc(w) : ''}</div>` +
        `<div data-lcs-answer="${esc(w)}" style="display:flex;gap:6px">${x.boxes.map((g, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><div style="height:${hs}px;display:flex;align-items:flex-end">${x.heart.includes(i) && key ? heartSvg(hs) : ''}</div>` +
          `<div data-lcs-soundbox style="width:${BW}px;height:${B}px;box-sizing:border-box;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF;display:flex;align-items:center;justify-content:center;font:800 ${Math.round(B * 0.55)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(g) : ''}</div>\n          </div>`).join('')}</div></div>`);
    }
  }
  return { bodyHtml: STYLE + `<div data-lcs-noliga="1" style="${LIGS}">` + fRoom(checkGrid(cards, { cols: 1 })) + `</div>`, meta: {} };
}

module.exports = { makeLongWordsG3Type, faultsOf, drawPage, LEVELS, INSTR, LINES, HEADS, SAY };
