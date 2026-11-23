/**
 * vowels-g2b.js — six Grade 2 pages, round 3 of the vowel lessons (English literacy year, Daily Teaching System Part
 * 12.3, 2026-11-17). The words and texts are data/literacy/vowels-g2b.en.json (written by the scratch script
 * s-g2vow/round3/bank-b.js; the word lists of the three vowel lessons are those of the frozen bank of G2-530..534).
 *
 *   diph / aror / erirur   G2-543 / G2-544 / G2-545: the SECOND page of the lessons "oo, ou, ow, oi, and oy", "ar and
 *              or", "er, ir, and ur" (day 2 after G2-532 / G2-533 / G2-534): reading for meaning with the same spellings.
 *              The spellings a level reads are those of the first page's level (diph: 1 oo, 2 ou ow oi oy, 3 all;
 *              aror: 1 ar, 2-3 ar and or; erirur: 1 er, 2-3 er ir ur); every list word in a text is of those spellings.
 *     level 1  1. four sentences: circle yes or no; 2. two riddles: write the answer from a box of four words (the two
 *              answers and two words that answer no riddle); 3. a sentence to read and draw
 *     level 2  1. five sentences: yes or no; 2. three riddles from a box of five; 3. a sentence to read and draw
 *     level 3  1. six sentences: yes or no; 2. three riddles with no box: the first letter of the answer is on the row
 *              and the line names the spellings the answer may have (the child spells the word); 3. a sentence to read
 *              and draw. The yes/no order of a copy comes from its copy number: no-first on every other copy, and the
 *              four types with yes/no (G2-543, 544, 545, 547) never share an order on one copy.
 *   syll       G2-546 Long Vowels in Two-Syllable Words (RF.2.3.c): 1. twelve two-syllable words: draw a line between
 *              the two syllables and circle each syllable with a long a, e, i, o, or u (the key draws both); 2. six
 *              sentences, each with three words to choose from (a word is offered once a page): circle the word that fits. Level 1 compound words with a vowel team
 *              (rain | bow), level 2 a silent e in one syllable (cup | cake), level 3 a first syllable that ends with its
 *              long vowel (pa | per).
 *   syllread   G2-547 Build and Read Two-Syllable Words (RF.2.3.c; day 2 of the same lesson, the same three kinds of
 *              word by level): 1. first syllables, each with a row, and a box of second syllables: write the whole
 *              word (each first part makes a word with exactly one part of the box; two parts of the box make no word
 *              with any); 2. sentences with the words of the level: circle yes or no
 *   heart      G2-548 Heart Words: could, would, should (RF.2.3.f): 1. heart words in sound boxes: write one sound in
 *              each box and draw a heart over the tricky part; a dashed line "Fold back" under them (levels 2 and 3 ask
 *              the child to fold the words back before the sentences) (the boxes and hearts of the Heart Words tool:
 *              the oul of could, would, should; the ie of friend; the au of because); 2. sentences with a missing heart
 *              word, its first letter on the row. Level 1 four words (could, would, should, and because or friend) and
 *              four sentences; level 2 eight words and four sentences; level 3 six words, three sentences, and a
 *              sentence of the child's own with two of the words.
 *
 * The spelling rule: no word is printed whose letters hold a spelling its page teaches but say another sound (your,
 * warm, bread, come, around, orange); every such word is a word of the lists or judged by hand (the bank's `ok`), and
 * texts, task lines, and instructions are all read when this file loads. The instruction of each level is INSTR here
 * (registered as strings; verify() reads it on the page).
 * One right answer: a yes-or-no sentence is a plain fact a teacher can confirm; a riddle names in the bank every other
 * list word that answers it (`fits`), and no such word is in its box; a box fills up only with words that answer no
 * riddle; a sentence to choose from three offers no word of its `fits`, and an article before the blank (a, an) fits
 * all three words. No answer is printed elsewhere on its page; the examples of the page instruction are never an
 * answer. Handwriting rows are 89 px (half an inch). Ligatures are off, and an f before i, f, l, or t and a t before t
 * get room of their own. English only; themeless: a copy draws other texts. The bank is checked when this file loads
 * (g2bFaultsOf), including that every level can draw its pages; no picture is used.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/vowels-g2b.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line } = _parts;

const ROW = 89;                                     // every handwriting row (half an inch from the top rule to the baseline)
const RD = BANK.read || {}, SY = BANK.syll || {}, HT = BANK.heart || {};
const READ_MODES = ['diph', 'aror', 'erirur'];
/** the page instruction of every level (registered as strings with add-strings.js; verify() reads it on the page) */
const INSTR = {
  diph: { 1: 'oo can say two sounds: the sound in moon and the sound in book.', 2: 'ou and ow can say the sound in cow. oi and oy say the sound in boy.', 3: 'Vowel teams can say the sounds in moon, book, cow, and boy.' },
  aror: { 1: 'Bossy r changes the vowel sound: ar says the sound in park.', 2: 'Bossy r: ar says the sound in park, and or says the sound in storm.', 3: 'Bossy r changes the vowel sound: ar says the sound in park, and or says the sound in storm.' },
  erirur: { 1: 'er says the sound you hear in her.', 2: 'er, ir, and ur say the same sound: her, first, turn.', 3: 'er, ir, and ur say the same sound: her, first, turn.' },
  syll: { 1: 'A compound word splits between its two small words: rain | bow.', 2: 'A silent e at the end makes the vowel long: cup | cake.', 3: 'When a syllable ends with a, e, i, o, or u, the letter says its name: pa | per.' },
  syllread: { 1: 'Two small words make one long word: mail + box = mailbox.', 2: 'Read each syllable, then the whole word: cup + cake = cupcake.', 3: 'Read each syllable, then the whole word: ro + bot = robot.' },
  heart: { 1: 'Some words have a part that does not follow the rules. We learn that part by heart.', 2: 'Some words have a part that does not follow the rules. We learn that part by heart.', 3: 'Some words have a part that does not follow the rules. We learn that part by heart.' },
};
/** the task lines (the spelling rule reads them too) */
const LINES = {
  yesno: 'Read each sentence. Circle yes or no.', riddleBox: 'Read each riddle. Write the answer from the box.',
  riddleL3: { diph: 'Read each riddle. Write the answer. It has oo, ou, ow, oi, or oy. Its first letter is on the line.', aror: 'Read each riddle. Write the answer. It has ar or or. Its first letter is on the line.', erirur: 'Read each riddle. Write the answer. It has er, ir, or ur. Its first letter is on the line.' },
  draw: 'Read the sentence. Draw what it says.',
  split: 'Read each word. Draw a line between its two syllables. Circle each syllable with a long a, e, i, o, or u.', choose3: 'Read each sentence. Circle the word that fits.',
  join: 'Read the first part on each line. Find the part in the box that makes a word with it. Write it on the line. Read the whole word.',
  // (2026-11-19, review en-1119-lit) EACH tricky part: because has three a teacher can defend (e, au, se)
  heartbox: 'Write the letters for each sound in a box. Then draw a heart over each tricky part.', fold: 'Fold the top of the page back.',
  heartsent: 'Read the sentence. Write the heart word that fits. Its first letter is on the line.', own: 'Write a sentence of your own. Use two heart words from this page.',
};
/** the words on a silent-e page whose e does not make the vowel long (never printed on level 2 of G2-546 and G2-547) */
const NEVER_VCE = ['come', 'comes', 'some', 'have', 'give', 'love', 'done', 'gone', 'one', 'none', 'were', 'where', 'there', 'here', 'move'];
/** the yes/no orders of k sentences: both answers, never every other one, never three alike in a row; yes-first and
 *  no-first in turn, so that a copy number picks one (no-first on every other copy, other types of one copy another) */
const PATTERNS = {};
function patternsOf(k) {
  if (PATTERNS[k]) return PATTERNS[k];
  const ok = [];
  for (let x = 0; x < 2 ** k; x++) { const p = Array.from({ length: k }, (_, i) => (x >> (k - 1 - i)) & 1); if (new Set(p).size < 2 || (k >= 3 && p.every((v, i) => !i || v !== p[i - 1])) || p.some((v, i) => i >= 2 && v === p[i - 1] && v === p[i - 2])) continue; ok.push(p); }
  const y = ok.filter((p) => p[0] === 0), nn = ok.filter((p) => p[0] === 1);
  return (PATTERNS[k] = y.flatMap((p, i) => [p, nn[i]]));
}
const PATTERN_OFFSET = { diph: 0, aror: 1, erirur: 2, syllread: 3 };

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
// tasks: in page order, [kind, count]. say: the words of the type's lists that the page instruction prints (an answer
// never is one). The rest are sizes.
const READ_LEVELS = {
  1: { tasks: [['yesno', 4], ['riddles', 2], ['draw', 1]], box: 2, yfont: 23, rfont: 21, drawMin: 150, pad: 10 },
  2: { tasks: [['yesno', 5], ['riddles', 3], ['draw', 1]], box: 2, yfont: 22, rfont: 20, drawMin: 100, pad: 8 },
  3: { tasks: [['yesno', 6], ['riddles', 3], ['draw', 1]], box: 0, yfont: 22, rfont: 20, drawMin: 100, pad: 7 },
};
const LEVELS = {
  diph: READ_LEVELS, aror: READ_LEVELS, erirur: READ_LEVELS,
  syll: {
    1: { say: ['rainbow'], tasks: [['split', 12], ['choose3', 6]], sfont: 26, cellH: 2.0, cfont: 21, pad: 9 },
    2: { say: ['cupcake'], tasks: [['split', 12], ['choose3', 6]], sfont: 26, cellH: 2.0, cfont: 21, pad: 9 },
    3: { say: ['paper'], tasks: [['split', 12], ['choose3', 6]], sfont: 28, cellH: 1.9, cfont: 21, pad: 9 },
  },
  syllread: {
    1: { say: ['mailbox'], tasks: [['join', 6], ['yesno', 5]], extra: 2, jgap: 30, yfont: 23, pad: 10 },
    2: { say: ['cupcake'], tasks: [['join', 6], ['yesno', 6]], extra: 2, jgap: 22, yfont: 22, pad: 9 },
    3: { say: ['robot'], tasks: [['join', 6], ['yesno', 6]], extra: 2, jrow: 112, yfont: 22, pad: 8 },
  },
  heart: {
    1: { tasks: [['heartbox', 4], ['heartsent', 4]], cols: 2, hbox: 46, hfont: 24, pad: 8 },
    2: { tasks: [['heartbox', 6], ['heartsent', 3]], cols: 2, hbox: 40, hfont: 22, pad: 6 },
    3: { tasks: [['heartbox', 6], ['heartsent', 1], ['own', 1]], cols: 2, hbox: 40, hfont: 22, pad: 4 },
  },
};

/* ---------------------------------------------------------------- what the modes are made of ---------------------------------------------------------------- */
const tokens = (text) => (String(text).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []);
const unionOf = (R) => new Set(Object.values(R.spell || {}).flat());
const spellIn = (R, w) => { const g = Object.keys(R.spell || {}).filter((k) => R.spell[k].includes(w)); return g.length === 1 ? g[0] : null; };
/** the list words of a text (a word of the lesson's lists) */
const listWords = (R, text, U = unionOf(R)) => tokens(text).filter((w) => U.has(w));
/** a text can stand on a level: every list word in it is of a spelling of the level, and one or more is (riddles may have none) */
const usableOn = (R, text, lv, needOne = true) => { const lw = listWords(R, text); return (!needOne || lw.length > 0) && lw.every((w) => R.levels[lv].includes(spellIn(R, w))); };
/** whole-word test */
const hasWord = (text, w) => tokens(text).includes(String(w).toLowerCase());

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function g2bFaultsOf(b) {
  const f = [];
  const R0 = b.read || {};
  for (const m of READ_MODES) {
    const R = R0[m];
    if (!R || !R.spell || !R.levels) { f.push(m + ': no lesson'); continue; }
    const U = unionOf(R);
    const avoid = new Set(R.avoid || []);
    if (avoid.size < 5) f.push(m + ': no list of words with these letters and another sound');
    for (const [g, ws] of Object.entries(R.spell)) if (!ws.length) f.push(`${m}: no ${g} words`);
    for (const [w, n] of Object.entries([...U].reduce((a, w) => ((a[w] = (a[w] || 0) + 1), a), {}))) if (n > 1) f.push(`${m}: "${w}" stands under two spellings`);
    const textOk = (t, where) => {
      if (typeof t !== 'string' || !/^[A-Z][^]*[.!?]$/.test(t) || t.length > 72) f.push(`${m} ${where}: "${t}" is no short sentence`);
      tokens(t).forEach((w) => { if (avoid.has(w)) f.push(`${m} ${where}: "${t}" holds "${w}" (these letters with another sound)`); });
    };
    // yes or no: a plain sentence, an answer, a list word of the lesson, usable on a level
    (R.yesno || []).forEach((s) => { textOk(s.text, 'yes/no'); if (!['yes', 'no'].includes(s.a)) f.push(`${m}: "${s.text}" has no yes or no`); if (![1, 2, 3].some((lv) => usableOn(R, s.text, lv))) f.push(`${m}: "${s.text}" stands on no level`); });
    if (new Set((R.yesno || []).map((s) => s.text)).size !== (R.yesno || []).length) f.push(m + ': a yes/no sentence twice');
    // riddles: the answer a list word (never an example of the instruction), the text never prints it, its fits list words
    const ans = (R.riddles || []).map((r) => r.a);
    if (new Set(ans).size !== ans.length) f.push(m + ': two riddles have one answer');
    (R.riddles || []).forEach((r) => {
      String(r.text).split(/(?<=[.?!])\s+/).forEach((x) => textOk(x, 'riddle'));
      if (!U.has(r.a) || !/What am I\?$/.test(r.text)) f.push(`${m}: the riddle of "${r.a}" has no list word as its answer or does not ask "What am I?"`);
      if (hasWord(r.text, r.a) || (r.fits || []).some((x) => hasWord(r.text, x))) f.push(`${m}: the riddle of "${r.a}" prints its answer`);
      if (!Array.isArray(r.fits) || r.fits.some((x) => !U.has(x) && !/^[a-z]+$/.test(x)) || r.fits.includes(r.a)) f.push(`${m}: the riddle of "${r.a}" names odd words that answer it`);
      if (![1, 2, 3].some((lv) => R.levels[lv].includes(spellIn(R, r.a)) && usableOn(R, r.text, lv, false))) f.push(`${m}: the riddle of "${r.a}" stands on no level`);
    });
    // a word that fills a box answers no riddle and is a list word of its spelling
    for (const [g, ws] of Object.entries(R.fillers || {})) ws.forEach((w) => { if (spellIn(R, w) !== g || ans.includes(w) || (R.riddles || []).some((r) => (r.fits || []).includes(w))) f.push(`${m}: the box word "${w}" is no ${g} word or answers a riddle`); });
    (R.draw || []).forEach((t) => { textOk(t, 'draw'); if (!/^Draw /.test(t) || ![1, 2, 3].some((lv) => usableOn(R, t, lv))) f.push(`${m}: "${t}" is no sentence to draw that stands on a level`); });
    for (const lv of [1, 2, 3]) (R.say[lv] || []).forEach((w) => { if (!U.has(w)) f.push(`${m}: the example "${w}" is no list word`); });
  }
  // the two-syllable words
  const S = b.syll || {};
  for (const lv of [1, 2, 3]) {
    const ws = (S.levels || {})[lv] || [];
    if (ws.length < 20) f.push(`syll level ${lv}: fewer than twenty words`);
    ws.forEach((x) => {
      if (!Array.isArray(x.parts) || x.parts.length !== 2 || x.parts.join('') !== x.w || x.parts.some((p) => !/[aeiouy]/.test(p))) f.push(`syll: "${x.w}" is not split into two syllables with a vowel each`);
      if (!Array.isArray(x.long) || !x.long.length || x.long.some((i) => i !== 0 && i !== 1)) f.push(`syll: "${x.w}" names no syllable with a long vowel`);
      // the kind of the level: 1 a vowel team in a long syllable; 2 a silent e; 3 a first syllable that ends with its vowel
      const longOk = x.long.every((i) => (lv === 1 ? /ai|ay|ee|ea|oa|ow/.test(x.parts[i]) : lv === 2 ? /[aeiou][^aeiou]e$/.test(x.parts[i]) || /ai|ay|ee|ea|oa|ow/.test(x.parts[i]) : /[aeiou]$/.test(x.parts[i])));
      if (!longOk || (lv === 2 && !x.long.some((i) => /[aeiou][^aeiou]e$/.test(x.parts[i]))) || (lv === 3 && !x.long.includes(0))) f.push(`syll level ${lv}: "${x.w}" is not a word of the kind of its level`);
      // a long u says its name only after a letter that keeps the y sound (tube, tulip, student say oo)
      x.parts.forEach((p) => { if (/(?:^|[tdnlrszj]|ch|sh)u(?:[^aeiou]e)?$/.test(p) && x.long.includes(x.parts.indexOf(p)) && !/^[cmhbfp]u/.test(p) && p !== 'u') f.push(`syll: the u of "${x.w}" does not say its name`); });
    });
    if (new Set(ws.map((x) => x.w)).size !== ws.length) f.push(`syll level ${lv}: a word twice`);
    const words = new Set(ws.map((x) => x.w));
    ((S.say || {})[lv] || []).forEach((w) => { if (!words.has(w)) f.push(`syll level ${lv}: the example "${w}" is no word of the level`); });
    // sentences to choose from three: one blank, the answer a word of the level, fits words of the level
    (((S.sentences || {})[lv]) || []).forEach((s) => {
      if (typeof s.text !== 'string' || s.text.split('___').length !== 2 || /^___/.test(s.text) || s.text.length > 44 || !/[.!?]$/.test(s.text)) f.push(`syll: "${s.text}" has not one blank inside a short sentence`);
      if (!words.has(s.right) || !Array.isArray(s.fits) || s.fits.some((x) => !words.has(x) || x === s.right)) f.push(`syll: "${s.text}": its answer or its fits are no words of the level`);
      if ([...words].some((w) => hasWord(s.text.replace('___', ' '), w))) f.push(`syll: "${s.text}" prints a word of the level`);
      // (2026-11-19, review en-1119-lit) no sentence prints a part of its answer: "I go to bed at ___" is answered by matching
      // bed to bedtime, not by reading the words (and a longer part as the start of a word: raining, raincoat; 2026-11-19)
      { const x = ws.find((y) => y.w === s.right); if (x && x.parts.some((p) => p.length >= 3 && tokens(s.text.replace('___', ' ')).some((t) => t === p || t === p + 's' || (p.length >= 4 && t.startsWith(p))))) f.push(`syll: "${s.text}" prints a part of its answer ${s.right}`); }
    });
    if ((((S.sentences || {})[lv]) || []).length < 12) f.push(`syll level ${lv}: fewer than twelve sentences`);
    (((S.yesno || {})[lv]) || []).forEach((s) => { if (!['yes', 'no'].includes(s.a) || !/^[A-Z][^]*[.!?]$/.test(s.text) || !tokens(s.text).some((w) => words.has(w))) f.push(`syll level ${lv}: "${s.text}" is no yes/no sentence with a word of the level`); });
    if ((((S.yesno || {})[lv]) || []).length < 12) f.push(`syll level ${lv}: fewer than twelve yes/no sentences`);
    // the joins of the level: every intended word is one; every pair is a first and a second part of the level
    const J = ((S.joins || {})[lv]) || [];
    ws.forEach((x) => { if (!J.some(([a, c]) => a === x.parts[0] && c === x.parts[1])) f.push(`syll level ${lv}: "${x.w}" is missing from the joins`); });
  }
  // heart words
  const H = b.heart || {};
  const hw = H.words || [];
  hw.forEach((x) => {
    if (!Array.isArray(x.boxes) || x.boxes.join('') !== x.w || x.boxes.some((p) => !p)) f.push(`heart: the boxes of "${x.w}" do not spell it`);
    if (!Array.isArray(x.heart) || !x.heart.length || x.heart.length > 3 || x.heart.some((i) => !x.boxes[i])) f.push(`heart: "${x.w}" has no heart box`);
    const ss = (H.sentences || {})[x.w] || [];
    if (ss.length < 3) f.push(`heart: fewer than three sentences for "${x.w}"`);
    ss.forEach((t) => { if (t.split('___').length !== 2 || !/[.!?]$/.test(t) || t.length > 42 || hw.some((y) => hasWord(t.replace('___', ' '), y.w))) f.push(`heart: "${t}" has not one blank, or prints a heart word`); });
  });
  // the tricky part of could, would, should is oul (the part the sounds taught so far do not give)
  ['could', 'would', 'should'].forEach((w) => { const x = hw.find((y) => y.w === w); if (!x || x.boxes[x.heart[0]] !== 'oul' || x.heart.length !== 1) f.push(`heart: the heart of "${w}" is not oul`); });
  if ((H.always || []).join() !== 'could,would,should') f.push('heart: could, would, should are not on every page');
  f.push(...spellFaultsOf(b));
  for (const k of [4, 5, 6]) {
    const P = patternsOf(k);
    if (P.some((p, i) => p[0] !== i % 2)) f.push(`the yes/no orders of ${k} do not take yes first and no first in turn`);
    for (let v = 1; v <= 20; v++) { const idx = Object.values(PATTERN_OFFSET).map((o) => (3 * v + 2 * o) % P.length); if (new Set(idx).size !== idx.length) { f.push(`copy ${v}: two types share a yes/no order of ${k}`); break; } }
  }
  if (f.length) return f;
  // every level can draw its pages: 60 seeded draws a level
  for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) for (let k = 1; k <= 60; k++) {
    try { drawPage(b, mode, lv, makeRng(`g2b-check|${mode}|${lv}|${k}`)); } catch (e) { f.push(`${mode} level ${lv}: a page cannot be drawn (${e.message})`); break; }
  }
  return f;
}

/** The spelling rule: no word is printed on a page whose letters hold a spelling that page teaches but say another sound
 *  (your, warm, bread, come, around). Every printed word that holds a taught spelling is a word of the lists or a word
 *  judged by hand to say the taught sound (the bank's `ok`). Texts, task lines, and instructions are all read. */
function spellFaultsOf(b) {
  const f = [];
  const toks = (t) => (String(t).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []).map((w) => w.replace(/'s$/, ''));
  for (const m of READ_MODES) {
    const R = (b.read || {})[m]; if (!R) continue;
    const allow = new Set([...unionOf(R), ...(R.ok || [])]), sp = Object.keys(R.spell);
    const texts = [...R.yesno.map((s) => s.text), ...R.riddles.map((r) => r.text), ...R.draw, LINES.yesno, LINES.riddleBox, LINES.riddleL3[m], LINES.draw, ...Object.values(INSTR[m])];
    texts.forEach((t) => toks(t).forEach((w) => { if (sp.some((g) => w.includes(g)) && !allow.has(w)) f.push(`${m}: "${w}" in "${t}" holds ${sp.find((g) => w.includes(g))} with another sound (or is no word judged)`); }));
  }
  const S = b.syll || {};
  const hit = { 1: (w) => /ai|ay|ee|ea|oa|ow/.test(w), 2: (w) => /[aeiou][^aeiouwy]es?$/.test(w), 3: (w) => /^[^aeiouy]*[aeiou][^aeiouy][aeiouy]/.test(w) && !/^[^aeiouy]*[aeiou][^aeiouy]es?$/.test(w) };
  for (const lv of [1, 2, 3]) {
    const allow = new Set([...((S.levels || {})[lv] || []).map((x) => x.w), ...((S.ok || {})[lv] || [])]);
    const texts = [...(((S.sentences || {})[lv]) || []).map((s) => s.text), ...(((S.yesno || {})[lv]) || []).map((s) => s.text), LINES.split, LINES.choose3, LINES.join, LINES.yesno, INSTR.syll[lv], INSTR.syllread[lv]];
    texts.forEach((t) => toks(t).forEach((w) => { if ((hit[lv](w) && !allow.has(w)) || (lv === 2 && NEVER_VCE.includes(w))) f.push(`syll level ${lv}: "${w}" in "${t}" breaks the rule of the level`); }));
  }
  const H = b.heart || {};
  [...Object.values(H.sentences || {}).flat(), LINES.heartbox, LINES.heartsent, LINES.fold, LINES.own, ...Object.values(INSTR.heart)].forEach((t) => toks(t).forEach((w) => { if (/oul/.test(w) && !['could', 'would', 'should'].includes(w)) f.push(`heart: "${w}" in "${t}" holds oul with another sound`); }));
  return f;
}

/* ---------------------------------------------------------------- drawing a page (data only) ---------------------------------------------------------------- */
const staircase = (idx) => idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1));
const alternating = (p, m) => m === 2 && p.length >= 3 && p.every((x, i) => !i || x !== p[i - 1]);
/** places among m for n items: every place used where n allows, never a staircase, never every other one, never three alike in a row */
function places(n, m, rng) { for (let k = 0; k < 300; k++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (new Set(p).size < Math.min(n, m) || staircase(p) || alternating(p, m) || p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue; return p; } throw new Error(`no places for ${n} answers among ${m}`); }
/** a word box: the answers and the fillers, the answers (in task order) at places that are no staircase */
function boxOrder(answers, fillers, rng) { for (let k = 0; k < 300; k++) { const box = shuffle([...answers, ...fillers], rng); if (!staircase(answers.map((w) => box.indexOf(w)))) return box; } throw new Error('no word box without a staircase'); }

function drawPage(b, mode, lv, rng, opt = {}) {
  let last;
  for (let k = 0; k < 30; k++) { try { return drawOnce(b, mode, lv, rng, opt); } catch (e) { last = e; } }
  throw last;
}
function drawOnce(b, mode, lv, rng, opt = {}) {
  const d = LEVELS[mode][lv];
  const n = (kind) => (d.tasks.find((t) => t[0] === kind) || [])[1];
  const tasks = [];
  let variant = '';
  /** yes-or-no sentences: the answers at places that are no staircase, never every other one, never three alike */
  const yesno = (pool, k) => {
    const P = patternsOf(k), v = Number(opt.variant);
    const pat = (Number.isInteger(v) && v > 0 ? P[(3 * v + 2 * (PATTERN_OFFSET[mode] || 0)) % P.length] : places(k, 2, rng)).map((x) => (x ? 'no' : 'yes'));
    const used = new Set(), out = [];
    for (const a of pat) { const s = shuffle(pool.filter((x) => x.a === a && !used.has(x.text)), rng)[0]; if (!s) throw new Error('too few yes/no sentences'); used.add(s.text); out.push(s); }
    return out;
  };

  if (READ_MODES.includes(mode)) {
    const R = b.read[mode], U = unionOf(R), set = R.levels[lv], say = R.say[lv] || [];
    // the riddles first (two spellings or more where the level has two), then the sentences and the drawing, none of which
    // prints an answer or a box word
    const pool = R.riddles.filter((r) => set.includes(spellIn(R, r.a)) && usableOn(R, r.text, lv, false) && !say.includes(r.a));
    let rid = null;
    for (let k = 0; k < 400; k++) {
      const got = shuffle(pool, rng).slice(0, n('riddles'));
      if (got.length < n('riddles')) break;
      if (got.some((r) => got.some((o) => o !== r && ((r.fits || []).includes(o.a) || hasWord(r.text, o.a))))) continue;
      if (set.length > 1 && new Set(got.map((r) => spellIn(R, r.a))).size < 2) continue;
      rid = got; break;
    }
    if (!rid) throw new Error('no riddles fit together');
    const answers = rid.map((r) => r.a);
    let box = null;
    if (d.box) {
      const banned = new Set(rid.flatMap((r) => r.fits || []));
      const fill = shuffle(set.flatMap((g) => R.fillers[g] || []).filter((w) => !banned.has(w) && !say.includes(w) && !rid.some((r) => hasWord(r.text, w))), rng).slice(0, d.box);
      if (fill.length < d.box) throw new Error('too few box words');
      box = boxOrder(answers, fill, rng);
    }
    const shown = [...answers, ...(box || [])];
    const clean = (t) => !shown.some((w) => hasWord(t, w));
    const yn = yesno(R.yesno.filter((s) => usableOn(R, s.text, lv) && clean(s.text)), n('yesno'));
    const dr = shuffle(R.draw.filter((t) => usableOn(R, t, lv) && clean(t)), rng)[0];
    if (!dr) throw new Error('no sentence to draw');
    tasks.push({ kind: 'yesno', items: yn });
    tasks.push({ kind: 'riddles', items: rid.map((r) => ({ text: r.text, a: r.a })), box, starter: !d.box });
    tasks.push({ kind: 'draw', text: dr });
  }

  if (mode === 'syll') {
    const S = b.syll, ws = S.levels[lv].filter((x) => !d.say.includes(x.w)), byW = Object.fromEntries(ws.map((x) => [x.w, x]));
    const nS = n('choose3');
    // the sentences first (their answers are never printed elsewhere), then the words to split from the rest
    const sents = shuffle(S.sentences[lv].filter((s) => byW[s.right]), rng).slice(0, nS);
    if (sents.length < nS) throw new Error('too few sentences');
    const answers = new Set(sents.map((s) => s.right));
    const split = shuffle(ws.filter((x) => !answers.has(x.w)), rng).slice(0, n('split'));
    if (split.length < n('split')) throw new Error('too few words to split');
    const at = placesFor3(nS, rng);
    const art = (t) => (t.match(/\b(a|an)\s+___/i) || [])[1];
    const offered = new Set();
    const items = sents.map((s, i) => {
      const a = art(s.text), okArt = (w) => (!a ? true : a.toLowerCase() === 'an' ? vowelSound(w) : !vowelSound(w));
      const pool = ws.filter((x) => x.w !== s.right && !answers.has(x.w) && !offered.has(x.w) && !s.fits.includes(x.w) && okArt(x.w)).map((x) => x.w);
      const two = shuffle(pool, rng).slice(0, 2);
      if (two.length < 2 || !okArt(s.right)) throw new Error('no two words to offer');
      two.forEach((w) => offered.add(w));
      const opts = two.slice(); opts.splice(at[i], 0, s.right);
      return { text: s.text, right: s.right, opts };
    });
    tasks.push({ kind: 'split', items: split.map((x) => ({ w: x.w, parts: x.parts, long: x.long })) });
    tasks.push({ kind: 'choose3', items });
  }

  if (mode === 'syllread') {
    const S = b.syll, ws = S.levels[lv].filter((x) => !d.say.includes(x.w)), J = S.joins[lv];
    const joins = (a, c) => J.some(([x, y]) => x === a && y === c);
    const k = n('join');
    let pick = null, extra = null;
    for (let t = 0; t < 500; t++) {
      const got = [];
      for (const x of shuffle(ws, rng)) { if (got.length === k) break; if (got.some((y) => y.parts[0] === x.parts[0] || y.parts[1] === x.parts[1])) continue; got.push(x); }
      if (got.length < k) continue;
      const firsts = got.map((x) => x.parts[0]), seconds = got.map((x) => x.parts[1]);
      // each first part makes a word with its own second part only
      if (firsts.some((a, i) => seconds.some((c, j) => j !== i && joins(a, c)))) continue;
      // two more second parts that make no word with any first part
      const more = shuffle([...new Set(ws.map((x) => x.parts[1]))].filter((c) => !seconds.includes(c) && !firsts.some((a) => joins(a, c))), rng).slice(0, d.extra);
      if (more.length < d.extra) continue;
      pick = got; extra = more; break;
    }
    if (!pick) throw new Error('no join without a second word');
    const answers = pick.map((x) => x.w);
    const box = boxOrder(pick.map((x) => x.parts[1]), extra, rng);
    const yn = yesno(S.yesno[lv].filter((s) => !answers.some((w) => hasWord(s.text, w))), n('yesno'));
    tasks.push({ kind: 'join', items: shuffle(pick, rng).map((x) => ({ first: x.parts[0], second: x.parts[1], w: x.w })), box });
    tasks.push({ kind: 'yesno', items: yn });
  }

  if (mode === 'heart') {
    const H = b.heart, byW = Object.fromEntries(H.words.map((x) => [x.w, x]));
    const k = n('heartbox');
    // could, would, should on every page; then because and friend; then words of other first letters
    let words = [...H.always];
    if (lv === 1) words.push(H.core[rng.int(0, H.core.length - 1)]);
    else {
      const rest = shuffle(lv === 2 ? H.words.map((x) => x.w).filter((w) => !H.always.includes(w) && !H.core.includes(w)) : H.words.map((x) => x.w).filter((w) => !H.always.includes(w)), rng);
      if (lv === 2) words.push(...H.core);
      for (const w of rest) { if (words.length === k) break; if (!words.some((x) => x[0] === w[0])) words.push(w); }
    }
    if (words.length !== k || new Set(words.map((w) => w[0])).size !== k) throw new Error('no heart words of other first letters');
    variant = words.join(',');
    // the sentences: one word each, could/would/should twice or more; never in the order of the boxes
    const nS = n('heartsent');
    const order = shuffle(words, rng);
    let sw = null;
    for (let t = 0; t < 300; t++) { const s = shuffle(words, rng).slice(0, nS); if (s.filter((w) => H.always.includes(w)).length >= Math.min(2, nS - 1) && !staircase(s.map((w) => order.indexOf(w)))) { sw = s; break; } }
    if (!sw) throw new Error('no sentences');
    tasks.push({ kind: 'heartbox', items: order.map((w) => ({ w, boxes: byW[w].boxes, heart: byW[w].heart })) });
    tasks.push({ kind: 'heartsent', items: sw.map((w) => ({ w, text: shuffle(H.sentences[w], rng)[0] })) });
    if (n('own')) tasks.push({ kind: 'own', words: order });
  }

  const items = [];
  for (const t of tasks) {
    if (t.kind === 'yesno') items.push(...t.items.map((s) => 'yn:' + s.text));
    if (t.kind === 'riddles') items.push(...t.items.map((r) => 'riddle:' + r.a), ...(t.box || []).filter((w) => !t.items.some((r) => r.a === w)).map((w) => 'fill:' + w));
    if (t.kind === 'draw') items.push('draw:' + t.text);
    if (t.kind === 'split') items.push(...t.items.map((x) => 'split:' + x.w));
    if (t.kind === 'choose3') items.push(...t.items.map((s) => 'choose:' + s.right));
    if (t.kind === 'join') items.push(...t.items.map((x) => 'join:' + x.w));
    if (t.kind === 'heartbox') items.push(...t.items.map((x) => 'heart:' + x.w));
    if (t.kind === 'heartsent') items.push(...t.items.map((x) => 'hsent:' + x.text));
  }
  return { mode, lv, variant, tasks, items };
}
/** a word that starts with a vowel SOUND takes an (an acorn); unit starts with the sound of you and takes a */
const vowelSound = (w) => /^[aeiou]/.test(w) && !/^u[^aeiou][aeiou]/.test(w);
/** places for the right word among three for n sentences: every place used, never a staircase, never three alike in a row */
function placesFor3(n, rng) { return places(n, 3, rng); }

{ const f = g2bFaultsOf(BANK); if (f.length) throw new Error('vowels-g2b.en.json: ' + f.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks
/** In this font an f before i, f, l, or t and a t before t touch the next letter even with ligatures off: every such f or t
 *  gets a little room of its own. Text inside tags and <svg> is left alone. */
/** The same room inside a writing row's svg text (a key's answer, a printed first part): the letter after an f or t
 *  that joins it (i, f, l, t) is moved right by 0.07 em */
function svgRoom(html) {
  return html.replace(/(<text\b[^>]*\bfont-size="([\d.]+)"[^>]*>)([^<]*)(<\/text>)/g, (m, open, fsz, body, close) => open + body.replace(/(?<=[ft])([iflt])/g, (c) => `<tspan dx="${(0.07 * +fsz).toFixed(2)}" data-lcs-fsep>${c}</tspan>`) + close);
}
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
const cream = (attrs, inner, pad = 8, gap = 6) => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0">${inner}</div>`;
const label = (html, px = 20) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (k) => `<span style="color:${T.teal}">${k}.</span> `;
/** a word or a yes/no to circle (the key rings the right one) */
const pill = (text, ok, key, font, attr = 'data-lcs-pill', pad = '2px 12px') => `<span ${attr} data-lcs-word="${esc(text)}"${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;font:800 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};padding:${pad};border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
const chip = (text, attr, font = 22) => `<span ${attr} style="font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 14px;border-radius:999px;background:#FFFFFF;border:2px solid ${T.teal}">${esc(text)}</span>`;
const wordBox = (ws, attr) => `<div data-lcs-wordbox style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px 12px;padding:5px 10px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF">${ws.map((w) => chip(w, `${attr}="${esc(w)}"`, 21)).join('')}</div>`;
const heartSvg = (size) => `<svg data-lcs-heartmark width="${size}" height="${size}" viewBox="0 0 24 24" style="display:block"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.3 1.8-2.1 3.3-3.3 5.4-3.3 3.6 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" fill="${T.teal}"/></svg>`;

/* ---------------------------------------------------------------- the blocks ---------------------------------------------------------------- */
function renderTask(t, k, mode, lv, d, key, inner) {
  if (t.kind === 'yesno') {
    const rows = t.items.map((s) => `<div data-lcs-yn="${s.a}" data-lcs-text="${esc(s.text)}" style="display:flex;align-items:center;gap:12px;padding:1px 0 1px 6px">` +
      `<span data-lcs-read style="flex:1 1 auto;font:700 ${d.yfont}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(s.text)}</span>` +
      `<span data-lcs-ynpills style="flex:0 0 auto;display:inline-flex;gap:8px">${['yes', 'no'].map((a) => pill(a, a === s.a, key, 21, 'data-lcs-pill', '0 10px')).join('')}</span></div>`).join('');
    return cream('data-lcs-task="yesno"', label(`${num(k)}${LINES.yesno}`) + `<div style="display:flex;flex-direction:column;gap:3px">${rows}</div>`, d.pad);
  }
  if (t.kind === 'riddles') {
    const m = t.items.length, cw = Math.floor((inner - 14 * (m - 1)) / m);
    const head = t.box ? LINES.riddleBox : LINES.riddleL3[mode];
    const wai = (text) => { const at = text.lastIndexOf('What am I?'); return esc(text.slice(0, at)) + `<span data-lcs-wai style="white-space:nowrap">What am I?</span>`; };
    return cream('data-lcs-task="riddles"', label(`${num(k)}${head}`) + (t.box ? wordBox(t.box, 'data-lcs-boxword') : '') +
      `<div style="display:grid;grid-template-columns:repeat(${m},1fr);gap:14px">` + t.items.map((r) => `<div data-lcs-riddle="${esc(r.a)}" data-lcs-text="${esc(r.text)}" style="display:flex;flex-direction:column;justify-content:space-between;gap:2px;padding:4px 10px 0;border-radius:12px;background:#FFFFFF">` +
        `<div data-lcs-read style="font:700 ${d.rfont}px/1.3 'Nunito',sans-serif;color:${T.ink}">${wai(r.text)}</div>${line({ w: cw - 20, h: ROW, starter: t.starter ? r.a[0] : null, answer: key ? r.a : null })}</div>`).join('') + `</div>`, d.pad);
  }
  if (t.kind === 'draw') {
    return `<div data-lcs-task="draw" style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px;padding:${d.pad}px 12px;border-radius:14px;background:${T.cream};min-width:0">` + label(`${num(k)}${LINES.draw}`) +
      `<div data-lcs-drawtext data-lcs-text="${esc(t.text)}" data-lcs-read style="font:800 ${(d.yfont || 22) + 2}px/1.3 'Nunito',sans-serif;color:${T.ink};padding-left:6px">${esc(t.text)}</div>` +
      `<div data-lcs-drawbox style="flex:1 1 auto;min-height:${d.drawMin}px;border:2.5px solid ${T.teal};border-radius:12px;background:#FFFFFF;display:flex;align-items:center;justify-content:center">${key ? `<span data-lcs-keynote style="font:700 18px 'Nunito',sans-serif;color:${T.teal}">Drawings will vary.</span>` : ''}</div></div>`;
  }
  if (t.kind === 'split') {
    const cell = (x) => `<div data-lcs-split="${x.w}" data-lcs-at="${x.parts[0].length}" data-lcs-long="${x.long.join('')}" style="display:flex;justify-content:center;align-items:center;height:${Math.round(d.sfont * (d.cellH || 1.75))}px;border-radius:10px;background:#FFFFFF">` +
      `<span data-lcs-read style="display:inline-flex;font:800 ${d.sfont}px/1 'Nunito',sans-serif;color:${T.ink};letter-spacing:0.12em">` +
      x.parts.map((p, i) => `<span data-lcs-syl="${i}" style="position:relative;display:inline-block">${key && x.long.includes(i) ? `<span data-lcs-ring style="position:absolute;left:-6px;right:0;top:-6px;bottom:-8px;border:3px solid ${T.teal};border-radius:999px"></span>` : ''}${key && i === 1 ? `<span data-lcs-splitbar style="position:absolute;left:-${(0.06 * d.sfont + 2).toFixed(1)}px;top:-10px;bottom:-10px;width:4px;border-radius:2px;background:${T.teal}"></span>` : ''}${esc(p)}</span>`).join('') + `</span></div>`;
    return cream('data-lcs-task="split"', label(`${num(k)}${LINES.split}`) +
      `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px 14px;padding:4px 2px">${t.items.map(cell).join('')}</div>`, d.pad);
  }
  if (t.kind === 'choose3') {
    const rows = t.items.map((s) => { const [a, b] = s.text.split('___');
      return `<div data-lcs-choose="${s.right}" data-lcs-text="${esc(s.text)}" style="display:flex;flex-direction:column;gap:2px;padding:1px 0 1px 6px">` +
        `<div data-lcs-read style="font:700 ${d.cfont}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(a.trim())} <span data-lcs-blank style="display:inline-block;width:110px;border-bottom:2.5px solid ${T.ink}"></span>${/^[.!?,]/.test(b) ? '' : ' '}${esc(b.trim())}</div>` +
        `<div data-lcs-opts style="display:flex;gap:14px;padding-left:22px">${s.opts.map((w) => pill(w, w === s.right, key, 20, 'data-lcs-pill', '0 12px')).join('')}</div></div>`; }).join('');
    return cream('data-lcs-task="choose3"', label(`${num(k)}${LINES.choose3}`) + `<div style="display:flex;flex-direction:column;gap:4px">${rows}</div>`, d.pad);
  }
  if (t.kind === 'join') {
    const cols = 2, cw = Math.floor((inner - 16) / cols);
    return cream('data-lcs-task="join"', label(`${num(k)}${LINES.join}`) + wordBox(t.box, 'data-lcs-boxpart') +
      `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:${d.jgap || 4}px 16px">` + t.items.map((x) => `<div data-lcs-join="${x.w}" data-lcs-first="${x.first}">` +
        `${line({ w: cw, h: d.jrow || ROW, starter: x.first, answer: key ? x.w : null })}</div>`).join('') + `</div>`, d.pad);
  }
  if (t.kind === 'heartbox') {
    const B = d.hbox, wbox = (g) => B + Math.round(B * 0.42) * (g.length - 1);
    // (2026-11-19, review en-1119-lit) every box of a word one width, the width its longest letter group needs (a box as
    // wide as its own letters gave away which box holds oul), kept inside its column (a box draws 5 px of border)
    const colW = Math.floor((inner - 24 - 12 - 18 * (d.cols - 1)) / d.cols);
    const wordW = (x) => Math.min(Math.max(...x.boxes.map(wbox)), Math.floor((colW - 4 * (x.boxes.length - 1)) / x.boxes.length) - 5);
    const row = (x) => `<div data-lcs-hrow="${x.w}" data-lcs-heart="${x.heart.join(',')}" style="display:flex;flex-direction:column;align-items:flex-start;gap:0">` +
      `<span data-lcs-read data-lcs-hw style="font:800 ${d.hfont}px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(x.w)}</span>` +
      `<div style="display:flex;gap:4px">${x.boxes.map((g, i) => `<div data-lcs-hcol="${i}" style="display:flex;flex-direction:column;align-items:center;gap:2px"><div data-lcs-hspace style="height:${Math.round(B * 0.42)}px;display:flex;align-items:flex-end">${key && x.heart.includes(i) ? heartSvg(Math.round(B * 0.42)) : ''}</div>` +
        `<div data-lcs-hbox="${esc(g)}" style="width:${wordW(x)}px;height:${B}px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF;display:flex;align-items:center;justify-content:center;font:800 ${Math.round(B * 0.55)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(g) : ''}</div></div>`).join('')}</div></div>`;
    return cream('data-lcs-task="heartbox"', label(`${num(k)}${LINES.heartbox}`) +
      `<div style="display:grid;grid-template-columns:repeat(${d.cols},1fr);gap:8px 18px;justify-items:start;padding:2px 6px">${t.items.map(row).join('')}</div>`, d.pad);
  }
  if (t.kind === 'heartsent') {
    const pb = Math.round(ROW * 0.2);
    return cream('data-lcs-task="heartsent"', label(`${num(k)}${lv > 1 ? LINES.fold + ' ' : ''}${LINES.heartsent}`) + `<div style="display:flex;flex-direction:column;gap:2px">` + t.items.map((s) => {
      const [a, b] = s.text.split('___'), start = !a.trim(), word = start ? s.w[0].toUpperCase() + s.w.slice(1) : s.w;
      const m = b.match(/^[.!?,]+/), tail = m ? m[0] : '', rest = (m ? b.slice(m[0].length) : b).trim();
      return `<div data-lcs-hsent="${s.w}" data-lcs-text="${esc(s.text)}" data-lcs-read style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:2px 8px;font:700 22px/1.3 'Nunito',sans-serif;color:${T.ink}">${a.trim() ? `<span style="padding-bottom:${pb}px">${esc(a.trim())}</span>` : ''}<span data-lcs-blankgroup style="display:inline-flex;align-items:flex-end">${line({ w: 190, h: ROW, starter: word[0], answer: key ? word : null })}${tail ? `<span data-lcs-tail style="padding-bottom:${pb}px">${esc(tail)}</span>` : ''}</span>${rest ? `<span style="padding-bottom:${pb}px">${esc(rest)}</span>` : ''}</div>`;
    }).join('') + `</div>`, d.pad);
  }
  if (t.kind === 'own') {
    return cream('data-lcs-task="own"', label(`${num(k)}${LINES.own}`) +
      line({ w: inner - 8, h: ROW, answer: key ? 'Sentences will vary.' : null }) + line({ w: inner - 8, h: ROW }), d.pad);
  }
  throw new Error('vowels-g2b: no block for ' + t.kind);
}

/** what verify() needs to know of the bank, per mode */
function infoOf(mode) {
  if (READ_MODES.includes(mode)) {
    const R = RD[mode];
    return { mode, spell: R.spell, levels: R.levels, say: R.say, avoid: R.avoid, yesno: Object.fromEntries(R.yesno.map((s) => [s.text, s.a])),
      riddles: Object.fromEntries(R.riddles.map((r) => [r.text, { a: r.a, fits: r.fits || [] }])), fillers: R.fillers, draw: R.draw };
  }
  if (mode === 'syll' || mode === 'syllread') {
    return { mode, levels: Object.fromEntries(Object.entries(SY.levels).map(([lv, ws]) => [lv, ws.map((x) => ({ w: x.w, parts: x.parts, long: x.long }))])), joins: SY.joins,
      sentences: Object.fromEntries(Object.entries(SY.sentences).map(([lv, ss]) => [lv, Object.fromEntries(ss.map((s) => [s.text, { right: s.right, fits: s.fits }]))])),
      yesno: Object.fromEntries(Object.entries(SY.yesno).map(([lv, ss]) => [lv, Object.fromEntries(ss.map((s) => [s.text, s.a]))])) };
  }
  return { mode, words: Object.fromEntries(HT.words.map((x) => [x.w, { boxes: x.boxes, heart: x.heart }])), sentences: HT.sentences, always: HT.always };
}

function makeVowelG2bType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('vowels-g2b: unknown mode ' + mode);
  const INFO = { ...infoOf(mode), instr: INSTR[mode], lines: LINES };
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // THE ITEM BANK of the unit checks (Part 7.6): G2-543 to G2-546 and G2-548 (g2bCheckPage below; not G2-547)
    ...(G2B_CHECK_MODES.has(mode) ? { checkPage(args, ctx) { return g2bCheckPage(mode, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, rng, { variant: ctx.variant });
      const inner = W - 24;
      const blocks = plan.tasks.map((t, i) => renderTask(t, i + 1, mode, lv, d, key, inner));
      // G2-548: a fold line between the words and the sentences (the child folds the words back and writes from memory)
      if (mode === 'heart') blocks.splice(1, 0, `<div data-lcs-fold style="display:flex;align-items:center;gap:10px;color:${T.inkSoft};font:700 19px/1.2 'Nunito',sans-serif"><span style="flex:1 1 auto;border-top:2.5px dashed ${T.inkSoft}"></span><span data-lcs-foldtext>Fold back</span><span style="flex:1 1 auto;border-top:2.5px dashed ${T.inkSoft}"></span></div>`);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-g2b="${mode}|${lv}|${esc(plan.variant)}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(svgRoom(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((LEVELS, INFO, CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-g2b]');
        if (!root) return ['no page'];
        const [mode, lvS, variant] = root.dataset.lcsG2b.split('|'), lv = +lvS, d = LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => e.textContent.replace(/\s+/g, ' ').trim();
        const toks = (t) => (String(t).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []);
        const has = (t, w) => toks(t).includes(String(w).toLowerCase());
        const TEAL = 'rgb(20, 107, 94)';
        const rb = R(root);
        // letters: ligatures off everywhere, and an f before i, f, l, t and a t before t have their own room
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        if (root.querySelectorAll('img').length) fails.push('a picture on a page without pictures');
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
        const blocks = [...root.children].filter((e) => e.dataset.lcsFold === undefined);
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('span, div, [data-lcs-line] svg').forEach((e) => { const q = R(e); if (e.dataset.lcsRing !== undefined || e.dataset.lcsSplitbar !== undefined) return; if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const kinds = blocks.map((b) => b.dataset.lcsTask);
        if (kinds.join() !== d.tasks.map((t) => t[0]).join()) fails.push(`the tasks are ${kinds.join(', ')}, not ${d.tasks.map((t) => t[0]).join(', ')}`);
        const countOf = (kind) => (d.tasks.find((t) => t[0] === kind) || [])[1];
        // sizes
        root.querySelectorAll('[data-lcs-line]').forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < CFG.ROW - 0.5) fails.push(`a writing row lower than ${CFG.ROW} px`); });
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 19) fails.push('text a second grader reads is smaller than 19 px'); });
        root.querySelectorAll('[data-lcs-pill], [data-lcs-boxword], [data-lcs-boxpart]').forEach((e) => { if (fs(e) < 20) fails.push('a word to choose is smaller than 20 px'); });
        root.querySelectorAll('[data-lcs-tail]').forEach((e) => { const p = e.previousElementSibling; if (!p || R(e).left - R(p).right > 1.5 || R(e).left < R(p).right - 0.5) fails.push('a period does not stand tight after its line'); });
        // the rings: only the key rings a word, and it rings the right one
        root.querySelectorAll('[data-lcs-pill]').forEach((p) => { const ringed = cs(p).borderTopColor === TEAL; if (isKey ? ringed !== !!p.dataset.lcsOk : ringed) fails.push('a word is ringed on the page of the child, or the key rings the wrong word'); });
        // what the page prints: every word of every text (an answer is never printed elsewhere)
        const texts = [];   // [where, text]
        const answers = [];  // [where, word]
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== INFO.instr[lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        // G2-548: one fold line "Fold back" between tasks 1 and 2; no other page has one
        { const folds = [...root.querySelectorAll('[data-lcs-fold]')];
          if (mode === 'heart') { if (folds.length !== 1 || txt(folds[0]) !== 'Fold back' || !blocks[1] || R(folds[0]).top < R(blocks[0]).bottom - 0.5 || R(folds[0]).bottom > R(blocks[1]).top + 0.5) fails.push('no fold line "Fold back" between tasks 1 and 2'); }
          else if (folds.length) fails.push('a fold line on a page without one'); }
        const checkPlaces = (ps, m, what) => { if (ps.length >= 2 && new Set(ps).size < Math.min(ps.length, m)) fails.push(`the right ${what} stands in one place every time`); if (ps.length >= 3 && (ps.every((x, i) => !i || x === ps[i - 1] + 1) || ps.every((x, i) => !i || x === ps[i - 1] - 1))) fails.push(`the right ${what} stands in a staircase`);
          if (m === 2 && ps.length >= 3 && ps.every((x, i) => !i || x !== ps[i - 1])) fails.push(`the right ${what} stands every other time in the other place`); if (ps.some((x, i) => i >= 2 && x === ps[i - 1] && x === ps[i - 2])) fails.push(`the right ${what} stands three times in a row in one place`); };
        const spellOf = (w) => { const g = Object.keys(INFO.spell || {}).filter((k) => INFO.spell[k].includes(w)); return g.length === 1 ? g[0] : null; };
        const union = new Set(Object.values(INFO.spell || {}).flat());
        const usable = (t, needOne = true) => { const lw = toks(t).filter((w) => union.has(w)); return (!needOne || lw.length > 0) && lw.every((w) => INFO.levels[lv].includes(spellOf(w))); };

        for (const b of blocks) {
          const kind = b.dataset.lcsTask, n = countOf(kind);
          if (kind === 'yesno') {
            const rows = [...b.querySelectorAll('[data-lcs-yn]')];
            if (rows.length !== n) fails.push(`${rows.length} yes/no sentences, not ${n}`);
            const bankYN = mode === 'syllread' ? INFO.yesno[lv] : INFO.yesno;
            const pos = [];
            rows.forEach((e) => { const t = e.dataset.lcsText, pills = [...e.querySelectorAll('[data-lcs-pill]')], ok = pills.filter((p) => p.dataset.lcsOk);
              if (bankYN[t] !== e.dataset.lcsYn || txt(e.querySelector('[data-lcs-read]')).replace(/\s+/g, '') !== t.replace(/\s+/g, '')) fails.push(`the sentence "${t}" is not a sentence of the bank with its answer`);
              if (pills.map((p) => p.dataset.lcsWord).join() !== 'yes,no' || ok.length !== 1 || ok[0].dataset.lcsWord !== e.dataset.lcsYn) fails.push(`"${t}" is not keyed to its answer between yes and no`);
              if (['diph', 'aror', 'erirur'].includes(mode) && !usable(t)) fails.push(`"${t}" holds a word of a spelling this level does not read, or none of its own`);
              if (mode === 'syllread' && !toks(t).some((w) => INFO.levels[lv].some((x) => x.w === w))) fails.push(`"${t}" holds no word of the level`);
              if (pills.length === 2 && Math.abs(R(pills[0]).top - R(pills[1]).top) > 1) fails.push('yes and no do not stand side by side');
              pos.push(e.dataset.lcsYn === 'yes' ? 0 : 1); texts.push(['yes/no', t]); });
            checkPlaces(pos, 2, 'answer of the yes/no sentences');
            // yes and no stand in one column on every row
            const xs = rows.map((e) => Math.round(R(e.querySelector('[data-lcs-ynpills]')).right));
            if (new Set(xs).size > 1) fails.push('yes and no do not stand in one column');
          }
          if (kind === 'riddles') {
            { const want = d.box ? INFO.lines.riddleBox : INFO.lines.riddleL3[mode], lbl = txt(b.querySelector('[data-lcs-label]')); if (lbl.replace(/^\d+\.\s*/, '') !== want) fails.push('the riddle line is not the line of this level (level 3 names the spellings of the answer)');
              if (!d.box && Object.keys(INFO.spell).some((g) => !toks(lbl).includes(g))) fails.push('the level-3 riddle line does not name every spelling the answer may have'); }
            b.querySelectorAll('[data-lcs-riddle]').forEach((e) => { const w = e.querySelector('[data-lcs-wai]'); if (!w || w.textContent !== 'What am I?' || w.getClientRects().length !== 1) fails.push('"What am I?" is not on one line'); });
            const rs = [...b.querySelectorAll('[data-lcs-riddle]')], box = [...b.querySelectorAll('[data-lcs-boxword]')].map((e) => e.dataset.lcsBoxword);
            if (rs.length !== n) fails.push(`${rs.length} riddles, not ${n}`);
            const ans = rs.map((e) => e.dataset.lcsRiddle);
            rs.forEach((e) => { const t = e.dataset.lcsText, rec = INFO.riddles[t], l = e.querySelectorAll('[data-lcs-line]');
              if (!rec || rec.a !== e.dataset.lcsRiddle || txt(e.querySelector('[data-lcs-read]')).replace(/\s+/g, '') !== t.replace(/\s+/g, '')) { fails.push(`the riddle of "${e.dataset.lcsRiddle}" is not a riddle of the bank keyed to its answer`); return; }
              if (!INFO.levels[lv].includes(spellOf(rec.a)) || !usable(t, false)) fails.push(`the riddle of "${rec.a}" is not of the spellings of this level`);
              if ((INFO.say[lv] || []).includes(rec.a)) fails.push(`the answer "${rec.a}" is an example of the instruction`);
              if (rec.fits.some((x) => box.includes(x) || ans.includes(x))) fails.push(`a word that also answers the riddle of "${rec.a}" is on the page`);
              if (l.length !== 1 || (isKey ? l[0].dataset.lcsAnswer !== rec.a : (d.box ? l[0].dataset.lcsStartertext !== undefined : l[0].dataset.lcsStartertext !== rec.a[0]))) fails.push(`the row of the riddle of "${rec.a}" is not empty with ${d.box ? 'no letter' : 'its first letter'}, or the key does not write the answer`);
              texts.push(['riddle', t]); answers.push(['riddle', rec.a]); });
            if (d.box) {
              const fill = box.filter((w) => !ans.includes(w));
              if (box.length !== n + d.box || new Set(box).size !== box.length || ans.some((w) => !box.includes(w)) || fill.some((w) => !INFO.levels[lv].some((g) => (INFO.fillers[g] || []).includes(w)))) fails.push(`the box is not the ${n} answers and ${d.box} words that answer no riddle`);
              checkPlaces(ans.map((w) => box.indexOf(w)), box.length, 'answer in the box');
              box.forEach((w) => answers.push(['box', w]));
            } else if (box.length) fails.push('a word box on a level without one');
            if (INFO.levels[lv].length > 1 && new Set(ans.map(spellOf)).size < 2) fails.push('the riddles are all of one spelling');
          }
          if (kind === 'draw') {
            const e = b.querySelector('[data-lcs-drawtext]'), box = b.querySelector('[data-lcs-drawbox]');
            if (!e || !INFO.draw.includes(e.dataset.lcsText) || txt(e).replace(/\s+/g, '') !== e.dataset.lcsText.replace(/\s+/g, '') || !usable(e.dataset.lcsText)) fails.push('the sentence to draw is not a sentence of the bank for this level');
            if (!box || R(box).height < 100) fails.push('the box to draw in is lower than 100 px');
            if (box && (isKey ? !box.querySelector('[data-lcs-keynote]') : box.textContent.trim())) fails.push('the box to draw in is not empty on the page of the child, or the key says nothing');
            if (e) texts.push(['draw', e.dataset.lcsText]);
          }
          if (kind === 'split') {
            const cells = [...b.querySelectorAll('[data-lcs-split]')], words = INFO.levels[lv];
            if (cells.length !== n || new Set(cells.map((c) => c.dataset.lcsSplit)).size !== n) fails.push(`not ${n} different words to split`);
            cells.forEach((c) => { const w = c.dataset.lcsSplit, x = words.find((y) => y.w === w), syl = [...c.querySelectorAll('[data-lcs-syl]')];
              if (!x || (LEVELS.syll[lv].say || []).includes(w)) { fails.push(`"${w}" is no word of this level, or an example`); return; }
              if (syl.length !== 2 || syl.map((s) => s.textContent).join('') !== w || syl[0].textContent !== x.parts[0] || +c.dataset.lcsAt !== x.parts[0].length || c.dataset.lcsLong !== x.long.join('')) fails.push(`"${w}" is not split where the bank splits it`);
              // the child's page gives the split away nowhere: the two syllables touch
              if (syl.length === 2 && Math.abs(R(syl[1]).left - R(syl[0]).right) > 0.6) fails.push(`the syllables of "${w}" stand apart on the page`);
              const bar = c.querySelector('[data-lcs-splitbar]'), rings = [...c.querySelectorAll('[data-lcs-ring]')];
              if (isKey) {
                if (!bar || !syl[1].contains(bar)) fails.push(`the key draws no line between the syllables of "${w}"`);
                else { const bx = R(bar).left + R(bar).width / 2, lastL = R(syl[0]).right, firstR = R(syl[1]).left + fs(syl[1]) * 0.3; if (bx < R(syl[0]).right - fs(syl[0]) * 0.3 || bx > firstR) fails.push(`the key's line is not between the syllables of "${w}"`); }
                if (rings.map((r) => r.parentElement.dataset.lcsSyl).join('') !== x.long.join('')) fails.push(`the key does not circle the long syllables of "${w}"`);
              } else if (bar || rings.length) fails.push(`the page of the child shows the split or the circles of "${w}"`);
              texts.push(['split', w]); });
          }
          if (kind === 'choose3') {
            const ss = [...b.querySelectorAll('[data-lcs-choose]')], words = INFO.levels[lv].map((x) => x.w);
            if (ss.length !== n) fails.push(`${ss.length} sentences, not ${n}`);
            const pos = [];
            ss.forEach((e) => { const t = e.dataset.lcsText, rec = INFO.sentences[lv][t], opts = [...e.querySelectorAll('[data-lcs-pill]')].map((p) => p.dataset.lcsWord), ok = [...e.querySelectorAll('[data-lcs-pill][data-lcs-ok]')];
              if (!rec || rec.right !== e.dataset.lcsChoose) { fails.push(`the sentence for "${e.dataset.lcsChoose}" is not a sentence of the bank keyed to its word`); return; }
              const shown = txt(e.querySelector('[data-lcs-read]')).replace(/\s+/g, ''), want = t.replace('___', '').replace(/\s+/g, '');
              if (shown !== want) fails.push(`"${t}" is not printed as the bank has it`);
              if (opts.length !== 3 || new Set(opts).size !== 3 || ok.length !== 1 || ok[0].dataset.lcsWord !== rec.right || opts.some((w) => !words.includes(w)) || opts.some((w) => w !== rec.right && rec.fits.includes(w))) fails.push(`"${t}" does not offer its word and two words of the level that do not fit`);
              if ((LEVELS.syll[lv].say || []).includes(rec.right)) fails.push(`the answer "${rec.right}" is an example of the instruction`);
              const art = (t.match(/\b(a|an)\s+___/i) || [])[1]; if (art && opts.some((w) => (art.toLowerCase() === 'an') !== (/^[aeiou]/.test(w) && !/^u[^aeiou][aeiou]/.test(w)))) fails.push(`the article before the blank of "${t}" fits only some of the words`);
              pos.push(opts.indexOf(rec.right)); texts.push(['choose', t]); opts.filter((w) => w !== rec.right).forEach((w) => texts.push(['option', w])); answers.push(['choose', rec.right]); });
            checkPlaces(pos, 3, 'word of the sentences');
            { const all = ss.flatMap((e) => [...e.querySelectorAll('[data-lcs-pill]')].map((p) => p.dataset.lcsWord)); if (new Set(all).size !== all.length) fails.push('a word is offered twice on the page'); }
          }
          if (kind === 'join') {
            const js = [...b.querySelectorAll('[data-lcs-join]')], box = [...b.querySelectorAll('[data-lcs-boxpart]')].map((e) => e.dataset.lcsBoxpart), J = INFO.joins[lv];
            const joins = (a, c) => J.some(([x, y]) => x === a && y === c);
            if (js.length !== n) fails.push(`${js.length} words to build, not ${n}`);
            const firsts = js.map((e) => e.dataset.lcsFirst);
            js.forEach((e) => { const w = e.dataset.lcsJoin, x = INFO.levels[lv].find((y) => y.w === w), l = e.querySelectorAll('[data-lcs-line]');
              if (!x || x.parts[0] !== e.dataset.lcsFirst || !box.includes(x.parts[1]) || (LEVELS.syllread[lv].say || []).includes(w)) fails.push(`"${w}" is not built from its first part and a part of the box`);
              if (l.length !== 1 || (isKey ? l[0].dataset.lcsAnswer !== w : l[0].dataset.lcsStartertext !== x.parts[0] || l[0].dataset.lcsAnswer)) fails.push(`the row of "${w}" does not start with its first part, or the key does not write the word`);
              answers.push(['join', w]); });
            // each first part makes a word with exactly one part of the box; each part of the box with one first part at most
            firsts.forEach((a) => { if (box.filter((c) => joins(a, c)).length !== 1) fails.push(`"${a}" makes a word with ${box.filter((c) => joins(a, c)).length} parts of the box`); });
            box.forEach((c) => { if (firsts.filter((a) => joins(a, c)).length > 1) fails.push(`the part "${c}" makes a word with two first parts`); });
            if (box.length !== n + d.extra || new Set(box).size !== box.length) fails.push(`the box is not ${n + d.extra} different parts`);
            checkPlaces(js.map((e) => box.indexOf(INFO.levels[lv].find((y) => y.w === e.dataset.lcsJoin).parts[1])), box.length, 'part in the box');
          }
          if (kind === 'heartbox') {
            const rows = [...b.querySelectorAll('[data-lcs-hrow]')], ws = rows.map((e) => e.dataset.lcsHrow);
            if (rows.length !== n || new Set(ws).size !== n) fails.push(`not ${n} different heart words`);
            if (INFO.always.some((w) => !ws.includes(w))) fails.push('could, would, or should is missing');
            if (new Set(ws.map((w) => w[0])).size !== ws.length) fails.push('two heart words start with one letter');
            rows.forEach((e) => { const w = e.dataset.lcsHrow, x = INFO.words[w], boxes = [...e.querySelectorAll('[data-lcs-hbox]')], hearts = [...e.querySelectorAll('[data-lcs-heartmark]')];
              if (!x || txt(e.querySelector('[data-lcs-hw]')) !== w) { fails.push(`"${w}" is no heart word of the bank`); return; }
              if (boxes.map((q) => q.dataset.lcsHbox).join('|') !== x.boxes.join('|')) fails.push(`the boxes of "${w}" are not its sounds`);
              boxes.forEach((q) => { if (isKey ? txt(q) !== q.dataset.lcsHbox : txt(q)) fails.push(`a box of "${w}" is filled on the page of the child, or the key does not fill it`); if (R(q).height < 40 || R(q).width < 40) fails.push('a sound box smaller than 40 px'); });
              const hcols = hearts.map((h) => +h.closest('[data-lcs-hcol]').dataset.lcsHcol);
              if (isKey ? hcols.join() !== x.heart.join() : hearts.length) fails.push(`the heart of "${w}" is not over ${x.boxes[x.heart[0]]} on the key, or the page of the child shows it`);
              // (2026-11-19, review en-1119-lit) every box of a word one width: a box as wide as its letters tells which box holds oul
              if (new Set(boxes.map((q) => Math.round(R(q).width))).size !== 1) fails.push(`the boxes of "${w}" are not one width (their widths tell the letters)`);
              texts.push(['heartword', w]); });
          }
          if (kind === 'heartsent') {
            { const hl = txt(b.querySelector('[data-lcs-label]')).replace(/^\d+\.\s*/, ''); if (hl !== (lv > 1 ? INFO.lines.fold + ' ' : '') + INFO.lines.heartsent) fails.push('the line of the sentences does not ' + (lv > 1 ? 'begin with folding the top of the page back' : 'stand as it should')); }
            const ss = [...b.querySelectorAll('[data-lcs-hsent]')], hw = [...root.querySelectorAll('[data-lcs-hrow]')].map((e) => e.dataset.lcsHrow);
            if (ss.length !== n) fails.push(`${ss.length} sentences, not ${n}`);
            ss.forEach((e) => { const w = e.dataset.lcsHsent, t = e.dataset.lcsText, l = e.querySelector('[data-lcs-blankgroup] [data-lcs-line]'), start = /^___/.test(t), want = start ? w[0].toUpperCase() + w.slice(1) : w;
              if (!(INFO.sentences[w] || []).includes(t) || !hw.includes(w)) { fails.push(`the sentence "${t}" is no sentence of the bank for a heart word of the page`); return; }
              if (!l || (isKey ? l.dataset.lcsAnswer !== want : l.dataset.lcsStartertext !== want[0])) fails.push(`the row of "${t}" does not start with the first letter of its word, or the key does not write it`);
              if (hw.some((x) => has(t.replace('___', ' '), x))) fails.push(`"${t}" prints a heart word of the page`);
              const copy = e.cloneNode(true); copy.querySelectorAll('[data-lcs-blankgroup] [data-lcs-line]').forEach((x) => x.replaceWith('___')); if (copy.textContent.replace(/\s+/g, '') !== t.replace(/\s+/g, '')) fails.push(`"${t}" is not printed as the bank has it`); });
            const idx = ss.map((e) => hw.indexOf(e.dataset.lcsHsent));
            if (ss.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1))) fails.push('the sentences take the heart words in the order of the boxes');
            if (ss.filter((e) => INFO.always.includes(e.dataset.lcsHsent)).length < Math.min(2, n - 1)) fails.push('fewer than two sentences with could, would, or should');
          }
          if (kind === 'own') {
            const ls = [...b.querySelectorAll('[data-lcs-line]')];
            if (ls.length !== 2 || !/two heart words/.test(txt(b.querySelector('[data-lcs-label]')))) fails.push('the sentence of the child\'s own has not two rows and its line');
          }
        }
        // no answer printed elsewhere on its page; no word of the box printed in a text
        answers.forEach(([where, w]) => { texts.forEach(([tw, t]) => { if (has(t, w) && !(where === 'choose' && tw === 'option')) fails.push(`the ${where} word "${w}" is also printed in a ${tw}`); }); });
        if (['diph', 'aror', 'erirur'].includes(mode)) texts.forEach(([, t]) => { toks(t).forEach((w) => { if (INFO.avoid.includes(w)) fails.push(`"${w}" (these letters with another sound) is printed`); }); });
        return fails;
      }, LEVELS, INFO, { ROW });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  task with its answer in its markup. A card names its kind (data-lcs-ckind; lists/en.json kindAttr): form B asks the kind
 *  form A asks, card by card (review en-1119-lit).
 *   diph / aror / erirur (G2-543, G2-544, G2-545)  a riddle (the riddle task of the page; never the yes/no sentences, a
 *            guess of two, nor the drawing, which has no one answer): its own box of four words (its answer, two answers
 *            of other riddles of the level and a word of the box that answers no riddle, as the page's box holds them),
 *            none of them a word that also answers it or that it prints; the line carries data-lcs-answer. Level 3 has no
 *            box: the first letter of the answer is on the line, and a riddle that a word of the lists with that first
 *            letter also answers is not taken. The box stands beside the line (two riddles fit a part). Kind: the
 *            spelling of the answer (er, ir, ur), so that a form asks two spellings and form B the same two.
 *   syll (G2-546)  a sentence with three words of the level to choose from (task 2 of the page): the two others are no
 *            word that fits it and agree with an article before the blank; the right one carries data-lcs-correct, at
 *            every place of the three on a page and in no pattern; a word is offered once a page. (The bank's sentences
 *            print no part of their answer: "I go to bed at ___" was rewritten, 2026-11-19.)
 *   heart (G2-548)  a heart word the teacher says (the reviewer of 2026-11-19: a printed word is copied, not spelled): its
 *            sounds as a row of boxes of one width (the count is given, the width tells nothing), the whole word as
 *            data-lcs-answer, the key writing the letters and drawing a heart over EACH tricky part. The word stands on the
 *            key only, for the teacher to say. Kinds: oul (could, would, should) and more (friend and the other heart words
 *            of the bank); every page starts with an oul word. because stays out: three parts of it can be called tricky.
 *            Never the sentences: written from memory with only a first letter, "C___ you help me?" takes can as well. */
const G2B_CHECK_MODES = new Set(['diph', 'aror', 'erirur', 'syll', 'heart']);
/** (fix round 2026-11-23, review of the placement checks) THE PLACEMENT CHECK OF SPELLING: the teacher says the word, a
 *  sentence with it, and the word again (data-lcs-teacher-reads: on the key and the teacher pages, never on the child's
 *  page); the child writes the word on the line. Form A and form B say their own words. */
function placementDictation(words, form, key, rowH) {
  const { checkGrid } = require('../../lib/check-page.js');
  const { _parts } = require('./info-text.js');
  const cards = words[form].map(([w, kind, says]) => '<div data-lcs-dictate="' + w + '" data-lcs-ckind="' + kind + '" data-lcs-teacher-reads="' + w + '. ' + says + ' ' + w + '." style="padding:10px 14px">' +
    (key ? _parts.line({ w: 360, h: rowH, answer: w }) : _parts.line({ w: 360, h: rowH }).replace('<div data-lcs-line', '<div data-lcs-line data-lcs-answer="' + w + '"')) + '</div>');
  return { bodyHtml: '<div data-lcs-dictation="1">' + checkGrid(cards, { cols: 1 }) + '</div>', meta: {} };
}
const PLACE_WORDS = {
  A: [['girl', 'ir', 'The girl rode her red bike.'], ['nurse', 'ur', 'The nurse helped the sick boy.']],
  B: [['fur', 'ur', 'My cat has soft fur.'], ['dirt', 'ir', 'The dog dug in the dirt.']],
};
function g2bCheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`vowels-g2b check: the words are English words (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = LEVELS[mode][lv] || LEVELS[mode][2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const cards = [];
  const withAnswer = (html, a) => (key ? html : html.replace('<div data-lcs-line', `<div data-lcs-line data-lcs-answer="${esc(a)}"`));
  // (fix round 2026-11-23) the placement check of spelling: er, ir, ur words the teacher says (placementDictation)
  { const m = mode === 'erirur' && /^check\|placement-spelling-patterns\|([AB])/.exec(String((rng && rng.seed) || '')); if (m) return placementDictation(PLACE_WORDS, m[1], key, 44); }
  if (READ_MODES.includes(mode)) {
    const R = RD[mode], U = unionOf(R), set = R.levels[lv], say = R.say[lv] || [];
    const pool = R.riddles.filter((r) => set.includes(spellIn(R, r.a)) && usableOn(R, r.text, lv, false) && !say.includes(r.a) &&
      (d.box || !(r.fits || []).some((x) => x[0] === r.a[0])));
    if (pool.length < 8) throw new Error(`vowels-g2b check: ${pool.length} riddles for ${mode} level ${lv}`);
    // eight riddles, the first two of other spellings (the first cards of a page are the ones a check takes first)
    let got = shuffle(pool, rng).slice(0, 8);
    { const j = got.findIndex((r, i) => i && spellIn(R, r.a) !== spellIn(R, got[0].a)); if (j > 1) got.splice(1, 0, ...got.splice(j, 1)); }
    const fillers = set.flatMap((g) => R.fillers[g] || []).filter((w) => !say.includes(w));
    const free = (r, w) => w !== r.a && !(r.fits || []).includes(w) && !hasWord(r.text, w);
    for (const r of got) {
      let box = null;
      if (d.box) {
        const others = shuffle(pool.filter((o) => o !== r && free(r, o.a)).map((o) => o.a), rng).slice(0, 2);
        const fill = shuffle(fillers.filter((w) => free(r, w) && !others.includes(w)), rng).slice(0, 1);
        if (others.length < 2 || fill.length < 1) throw new Error(`vowels-g2b check: no box for the riddle of ${r.a}`);
        box = shuffle([r.a, ...others, ...fill], rng);
      }
      const at = r.text.lastIndexOf('What am I?');
      cards.push(`<div data-lcs-riddlecheck="${esc(r.a)}" data-lcs-text="${esc(r.text)}" data-lcs-ckind="${spellIn(R, r.a)}" style="display:flex;flex-direction:column;gap:4px;padding:6px 12px">` +
        `<div data-lcs-read style="font:700 20px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r.text.slice(0, at))}<span style="white-space:nowrap">What am I?</span></div>` +
        // the box (two rows of two words) beside the line
        `<div style="display:flex;align-items:flex-end;justify-content:center;gap:24px">` + (box ? `<div style="flex:0 0 250px">${wordBox(box, 'data-lcs-boxword')}</div>` : '') +
        withAnswer(line({ w: 260, h: ROW, starter: box ? null : r.a[0], answer: key ? r.a : null }), r.a) + `</div></div>`);
    }
  } else if (mode === 'syll') {
    const S = BANK.syll, ws = S.levels[lv].filter((x) => !d.say.includes(x.w)), byW = Object.fromEntries(ws.map((x) => [x.w, x]));
    // six sentences, as on the page (a word offered once a page: the level's words last for six), drawn again on a dead end
    let page = null;
    for (let k = 0; k < 60 && !page; k++) {
      const sents = [];
      for (const s of shuffle(S.sentences[lv].filter((x) => byW[x.right]), rng)) { if (sents.length === 6) break; if (!sents.some((y) => y.right === s.right)) sents.push(s); }
      if (sents.length < 6) throw new Error('vowels-g2b check: too few sentences');
      const answers = new Set(sents.map((s) => s.right)), offered = new Set(), out = [];
      for (const s of sents) {
        const a = (s.text.match(/\b(a|an)\s+___/i) || [])[1], okArt = (w) => (!a ? true : a.toLowerCase() === 'an' ? vowelSound(w) : !vowelSound(w));
        const two = shuffle(ws.filter((x) => x.w !== s.right && !answers.has(x.w) && !offered.has(x.w) && !s.fits.includes(x.w) && okArt(x.w)).map((x) => x.w), rng).slice(0, 2);
        if (two.length < 2 || !okArt(s.right)) break;
        for (const w of two) offered.add(w);
        out.push({ s, two });
      }
      if (out.length === 6) page = out;
    }
    if (!page) throw new Error('vowels-g2b check: no six sentences with two words to offer');
    const at = placesFor3(page.length, rng);
    page.forEach(({ s, two }, i) => {
      const opts = two.slice(); opts.splice(at[i], 0, s.right);
      const [x, y] = s.text.split('___');
      cards.push(`<div data-lcs-choosecheck="${esc(s.right)}" data-lcs-text="${esc(s.text)}" style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:6px 12px">` +
        `<div data-lcs-read style="font:700 22px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(x.trim())} <span data-lcs-blank style="display:inline-block;width:110px;border-bottom:2.5px solid ${T.ink}"></span>${/^[.!?,]/.test(y) ? '' : ' '}${esc(y.trim())}</div>` +
        `<div data-lcs-checkopts style="display:flex;gap:16px">${opts.map((w) => pill(w, w === s.right, key, 22, `data-lcs-choice="${esc(w)}"${w === s.right ? ' data-lcs-correct="1"' : ''} data-lcs-pill`, '1px 14px')).join('')}</div></div>`);
    });
  } else {
    const H = BANK.heart, byW = Object.fromEntries(H.words.map((x) => [x.w, x]));
    // could, would, should in turn with the other heart words of the bank (never because), an oul word first
    const oul = shuffle(H.always, rng), more = shuffle(H.words.map((x) => x.w).filter((w) => !H.always.includes(w) && w !== 'because'), rng).slice(0, 5);
    const words = [oul[0], more[0], oul[1], more[1], oul[2], ...more.slice(2)];
    // one width for every box of every card, wide enough for oul written in the key's letters; the boxes stand in one row
    const B = 48, BW = 70, hs = 20;
    for (const w of words) {
      const x = byW[w];
      cards.push(`<div data-lcs-heartcheck="${esc(w)}" data-lcs-heart="${x.heart.join(',')}" data-lcs-ckind="${H.always.includes(w) ? 'oul' : 'more'}" style="display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 12px 8px">` +
        // the word for the teacher to say: on the key only (the child's card keeps its room)
        `<div data-lcs-sayword style="height:22px;font:700 16px/22px 'Nunito',sans-serif;color:${T.teal}">${key ? 'say: ' + esc(w) : ''}</div>` +
        `<div data-lcs-answer="${esc(w)}" style="display:flex;gap:6px">${x.boxes.map((g, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><div style="height:${hs}px;display:flex;align-items:flex-end">${x.heart.includes(i) && key ? heartSvg(hs) : ''}</div>` +
          `<div data-lcs-soundbox style="width:${BW}px;height:${B}px;box-sizing:border-box;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF;display:flex;align-items:center;justify-content:center;font:800 ${Math.round(B * 0.55)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(g) : ''}</div>
        </div>`).join('')}</div></div>`);
    }
  }
  return { bodyHtml: STYLE + `<div data-lcs-noliga="1" style="${LIGS}">` + fRoom(svgRoom(checkGrid(cards, { cols: 1 }))) + `</div>`, meta: {} };
}

module.exports = { makeVowelG2bType, g2bFaultsOf, drawPage, LEVELS, INSTR, LINES, patternsOf, PATTERN_OFFSET };
