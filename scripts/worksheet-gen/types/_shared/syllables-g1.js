/**
 * syllables-g1.js — four Grade 1 pages of the unit "Two-Syllable Words", the last unit of the Grade 1 English literacy
 * year (Daily Teaching System Part 12.3, 2026-11-18). The words and texts are data/literacy/syllables-g1.en.json.
 * The unit comes after "Long Vowels: Silent e and Vowel Teams", so a page may assume short vowels, the digraphs sh ch
 * th ck ng wh, blends, silent e, the vowel teams ai ay ee ea oa ow (long o), and -s; never r after a vowel, oo, ou, ow as
 * in cow, oi, oy, y as a vowel, -le, a soft c or g, or igh.
 *
 *   vowel   G1-600 Every Syllable Has a Vowel (RF.1.3.d; day 1)
 *           1. twelve printed words: underline each vowel and write how many syllables the word has (a box for the
 *              number; level 3 also draws a line between the two syllables); 2. six words and four pictures: draw a line
 *              from each word to its picture; two words have no picture: one is a short word a pictured word starts with
 *              (rock beside rocket), the other a two-syllable word that shares its first letters with a pictured word
 *              (handstand beside handbag); every pictured word shares its first letter with another word of the column as
 *              far as the bank allows (matchCombos), so the match needs reading, not first letters.
 *     level 1  one-syllable words and compound words with short vowels (fish, sandbox); the pictures are compounds
 *     level 2  one-syllable words and two-syllable words with two consonants in the middle (napkin, rabbit)
 *     level 3  as level 2, more two-syllable words, and a line between the two syllables (bas | ket)
 *           Every word has exactly one vowel letter in each syllable: no silent e, no vowel team, no y, no long vowel before l
 *           (wheel: two beats to many children). The longest one-syllable word is at least as long as the shortest
 *           two-syllable word (no count by length).
 *   sort    G1-601 One Syllable or Two? (RF.1.3.d; day 2)
 *           1. printed words to sort under "1 syllable" and "2 syllables" (89 px rows, cross out each word); 2. sentences
 *              with exactly one two-syllable word: circle it.
 *     level 1  six words (short vowels, compounds) and five sentences; every printed word has as many vowel letters as
 *              vowel sounds. On every level neither task can be done by length: the longest one-syllable word to sort is at
 *              least as long as the shortest two-syllable one, and in two sentences or more a one-syllable word is as long
 *              as the word to circle (that word is the longest of its sentence in at most half of them)
 *     level 2  the same with two-syllable words that have two consonants in the middle
 *     level 3  eight words and four sentences; one-syllable words with silent e or a vowel team (cake, rain) and long-vowel
 *              compounds (cupcake): count the vowel SOUNDS, not the letters; no word whose second syllable has no vowel a
 *              child can hear (kit | ten)
 *   parts   G1-602 Compound Words and Two-Part Words (RF.1.3.e)
 *           1. two-syllable words: draw a line between the two parts; 2. levels 1 and 2: two compound words: write the
 *              two small words of each and draw a picture of each; level 3: six words to sort under "compound word" and
 *              "not a compound word" (a word whose two written parts are both words, kit + ten, is never sorted).
 *     level 1  ten short-vowel compound words; level 2  ten words, compounds and words with a double consonant (rab | bit); level 3
 *              eight words, compounds, double consonants, and other words with two consonants in the middle (bas | ket).
 *              A compound to split has two parts a first grader knows as words (never bob | cat); compounds with silent e
 *              or a vowel team (cup | cake, snow | man) are taught before this unit and stand on levels 2 and 3.
 *   heart   G1-603 Heart Words: said, was, of, could (RF.1.3.g)
 *           1. heart words in sound boxes: say each sound, write its letters in a box, draw a heart over each tricky part;
 *              a dashed line "Fold back"; 2. the child folds the words back and writes the heart word that fits each
 *              sentence (levels 1 and 2: its first letter on the row, a capital at the start of a sentence); level 3 also:
 *              the child opens the page again and writes a sentence of their own with two heart words.
 *     level 1  said, was, of, could and four sentences; level 2  six words (the four and two of they, does, friend, put,
 *              give) and three sentences; level 3  six words in three columns (two or three of said, was, of, could, and
 *              others of up to four boxes, come among them, so its copies differ), one sentence with no first letter, and
 *              the child's own sentence on two rows. Every sentence takes only its own
 *              heart word of the ten (judged by hand; the bank says so for each), and no other word of a sentence holds a
 *              heart part (ai, oul, ey, oe, ie) or is anything but a word a first grader decodes, a known sight word, or a name.
 *
 * Handwriting rows are 89 px (half an inch). Ligatures are off, and an f before i, f, l, or t and a t before t get room
 * of their own. The instruction of each level is INSTR (registered as strings; verify() reads it on the page); the
 * examples it prints are never items of that page. English only; themeless: a copy draws other words. PDF only (the
 * key is for checks and review; sort answers are marked "any order"). The bank is checked when this file loads
 * (syllFaultsOf), including that every level can draw its pages.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/syllables-g1.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line } = _parts;
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const ROW = 89;                                     // every handwriting row (half an inch from the top rule to the baseline)
const MODES = ['vowel', 'sort', 'parts', 'heart'];
/** the page instruction of every level (registered as strings with add-strings.js; verify() reads it on the page) */
const INSTR = {
  vowel: { 1: 'Every syllable has a vowel sound: sun | set has two.', 2: 'Every syllable has a vowel sound: nap | kin has two.', 3: 'Every syllable has a vowel sound. Split a two-syllable word between its two consonants: bas | ket.' },
  sort: { 1: 'One vowel sound, one syllable: fish. Two vowel sounds, two syllables: sun | set.', 2: 'One vowel sound, one syllable: fish. Two vowel sounds, two syllables: nap | kin.', 3: 'Count the vowel sounds, not the vowel letters: cake has one, cup | cake has two.' },
  parts: { 1: 'A compound word is two small words put together: sun + set = sunset.', 2: 'Read a long word in two parts: sun | set, rab | bit.', 3: 'Read a long word in two parts: sun | set, bas | ket. A compound word is two small words.' },
  heart: { 1: 'Some words have a tricky part. We learn that part by heart.', 2: 'Some words have a tricky part. We learn that part by heart.', 3: 'Some words have a tricky part. We learn that part by heart.' },
};
/** the task lines */
const LINES = {
  count: 'Read each word. Underline each vowel. Write how many syllables it has.',
  count3: 'Read each word. Underline each vowel. Write how many syllables it has. If it has two syllables, draw a line between them.',
  match: 'Read each word. Draw a line to its picture. Two words have no picture.',
  sort: 'Read the words. Count the vowel sounds. Write each word under 1 syllable or 2 syllables. Cross out each word when you write it.',
  circle: 'Read each sentence. Circle the word that has two syllables.',
  split1: 'Read each word. Draw a line between the two small words.',
  split: 'Read each word. Draw a line between its two parts.',
  draw: 'Write the two small words. Draw a picture of each.',
  sortc: 'Read the words. Write each word under compound word or not a compound word. Cross out each word when you write it.',
  heartbox: 'Say each sound. Write its letters in a box. Draw a heart over each tricky part.',
  fold: 'Fold the top of the page back.',
  heartsent: 'Read each sentence. Write the heart word that fits. Its first letter is on the line.',
  heartsent3: 'Read each sentence. Write the heart word that fits.',
  own: 'Open the page again. Write your own sentence with two heart words from the top.',
};
/** the sort heads */
const HEADS = { sort: ['1 syllable', '2 syllables'], sortc: ['compound word', 'not a compound word'] };

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
const LEVELS = {
  vowel: {
    1: { tasks: [['count', 12], ['match', 4]], kinds: ['compound'], twoN: [5, 7], maxLen: 7, cfont: 28, crow: 66, rgap: 10, mfont: 28, mrow: 48, mgap: 10, mpic: 76, pad: 10 },
    2: { tasks: [['count', 12], ['match', 4]], kinds: ['double', 'vccv'], twoN: [5, 7], maxLen: 7, cfont: 28, crow: 66, rgap: 10, mfont: 28, mrow: 48, mgap: 10, mpic: 76, pad: 10 },
    3: { tasks: [['count', 12], ['match', 4]], kinds: ['double', 'vccv'], twoN: [7, 8], maxLen: 7, split: true, cfont: 28, crow: 66, rgap: 10, mfont: 28, mrow: 48, mgap: 10, mpic: 76, pad: 10 },
  },
  sort: {
    1: { tasks: [['sort', 6], ['circle', 5]], kinds: ['compound'], long: false, sfont: 24, pad: 10 },
    2: { tasks: [['sort', 6], ['circle', 5]], kinds: ['double', 'vccv'], long: false, sfont: 24, pad: 10 },
    3: { tasks: [['sort', 8], ['circle', 4]], kinds: ['compound', 'double', 'vccv'], long: true, longMin: 2, sfont: 22, pad: 6 },
  },
  parts: {
    1: { tasks: [['split', 10], ['draw', 2]], kinds: ['compound'], short: true, min: 0, pfont: 30, prow: 54, rgap: 8, boxH: 132, pad: 10 },
    2: { tasks: [['split', 10], ['draw', 2]], kinds: ['compound', 'double'], min: 4, pfont: 30, prow: 54, rgap: 8, boxH: 132, pad: 10 },
    3: { tasks: [['split', 8], ['sortc', 6]], kinds: ['compound', 'double', 'vccv'], min: 2, pfont: 30, prow: 54, rgap: 8, pad: 8 },
  },
  heart: {
    1: { tasks: [['heartbox', 4], ['heartsent', 4]], hbox: 50, hfont: 24, sfont: 22, pad: 10 },
    2: { tasks: [['heartbox', 6], ['heartsent', 3]], hbox: 50, hfont: 24, sfont: 22, pad: 8 },
    3: { tasks: [['heartbox', 6], ['heartsent', 1], ['own', 2]], title: 2, noStarter: true, cols: 3, boxw: { 1: 46, 2: 66, 3: 84 }, maxBoxes: 4, hbox: 50, hfont: 24, sfont: 22, pad: 6 },
  },
};
/** the room of the ring around a word to circle (padding and border, taken back by a negative margin): the key's ring
 *  never touches the next word */
const RING = 4;
/** the widest blank band allowed between two tasks or under the last one (CSS px) */
const BAND = 40;
/** the width of a sound box for one, two, and three letters */
const BOXW = { 1: 52, 2: 78, 3: 100 };

/* ---------------------------------------------------------------- reading words: what a first grader can decode here ---------------------------------------------------------------- */
const WL = (s) => s.split(/\s+/).filter(Boolean);
/** words whose letters say something the taught code does not give them (a heart part, ea as in head, ow as in cow) */
const DENY = new Set(WL('head bread dead ready great steak break bear pear wear tear near dear year how now cow down town brown clown owl crown gown frown wow ' +
  'bow sow row said says eye give have live love come some done gone none one were there here where move lose whose shoe two who what want wash watch was of ' +
  'could would should they does friend put push pull full kind find mind child wild old cold gold told hold most post ghost both son ton won front month ' +
  'read lead leads wind winds close wound dove does'));   // and words with two pronunciations (reads is only /reedz/)
/** the kind of a one-syllable word under the taught code: 'short' (one vowel letter, closed), 'long' (silent e or a vowel
 *  team: two vowel letters, one vowel sound), or null (not decodable with what was taught) */
function oneSyl(w0, asPart = false) {
  const w = String(w0).toLowerCase();
  const core = (s) => {
    if (!/^[a-z]+$/.test(s) || (!asPart && DENY.has(s))) return null;                            // a part of a longer word (les|son) is read in it
    if (/y/.test(s.slice(1).replace(/ay/g, '')) || /^y[^aeiou]/.test(s) || /q/.test(s)) return null;   // y only as a first consonant (yes) or in ay
    if (/[aeiou]r|igh|wa(?![iy])|al[lkt]|tch|dge|^kn|^wr|ph|gh|mb$|c[eiy]|[aeiou]w(?![nls]?$)/.test(s)) return null;
    if (/g[ei]/.test(s) && !/^(get|gets|gift|gifts|gill|gills)$/.test(s)) return null;           // a soft g
    if (/(old|ind|ild|olt)$/.test(s)) return null;
    let m = /^([^aeiou]*)([aeiou])([^aeiou])e$/.exec(s);                                         // silent e
    if (m) return 'long';
    m = /^([^aeiou]*)(ai|ay|ee|ea|oa|ow)([^aeiou]*)$/.exec(s);                                    // a vowel team
    if (m) { if (/^(ay|ow)$/.test(m[2]) && !/^[nls]?$/.test(m[3])) return null; return 'long'; }
    if (/^[^aeiou]*[aeiou][^aeiou]+$/.test(s) && !/[aeiou]w/.test(s)) return 'short';             // one vowel letter, closed
    return null;
  };
  const k = core(w);
  if (k) return k;
  if (/[^s]s$/.test(w)) return core(w.slice(0, -1));                                             // a plural or -s
  return null;
}
const vowelLetters = (w) => (String(w).match(/[aeiou]/g) || []).length;
const tokens = (t) => (String(t).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || []).map((x) => x.replace(/'s$/, ''));
const hasWord = (t, w) => tokens(t).includes(String(w).toLowerCase());
/** a two-syllable word of the bank, or its plural (laptops) */
const twoOf = (b, w) => (b.two || {})[w] || ((b.two || {})[String(w).replace(/s$/, '')] && /s$/.test(w) ? { ...b.two[String(w).replace(/s$/, '')], plural: true } : null);
const stemOf = (w) => String(w).toLowerCase().replace(/s$/, '');
/** one-syllable words many first graders clap as two beats: a long vowel or a vowel team before l (wheel, smile, tail);
 *  never on the syllable-count pages (G1-600, G1-601), nor a two-syllable word with such a part (mailbox, oatmeal) */
const L_END = /(ail|ale|eal|eel|ile|ole|ule|oil|owl)s?$/;
const lWord = (w) => L_END.test(String(w).toLowerCase());
const lPart = (x) => !!x && x.parts.some((p) => L_END.test(p));
/** a sentence of G1-601 holds a one-syllable word at least as long as its two-syllable word (no answer by length) */
const overlapOf = (s) => tokens(s.text).some((t) => t !== s.two && t.length >= s.two.length);
/** the place of a word among n words of a sentence: first, last, or in the middle */
const placeOf = (i, n) => (i === 0 ? 'F' : i === n - 1 ? 'L' : 'M');
/** places with no pattern: never three alike in a row, never strictly alternating over four */
function placesOk(ps) {
  if (ps.some((x, i) => i >= 2 && x === ps[i - 1] && x === ps[i - 2])) return false;
  for (let i = 3; i < ps.length; i++) if (ps[i] === ps[i - 2] && ps[i - 1] === ps[i - 3] && ps[i] !== ps[i - 1]) return false;
  return true;
}
/** Every allowed match of a level of G1-600: four pictures (at most one print-only, no two of one kind), one short word a
 *  pictured word starts with, and one two-syllable word that shares its first letters with a pictured word; scored by the
 *  pictured words whose first letter no other word of the column shares. Returns the best ones and that number. */
const COMBOS = new WeakMap();
function matchCombos(b, lv) {
  let byLv = COMBOS.get(b); if (!byLv) COMBOS.set(b, (byLv = {}));
  if (byLv[lv]) return byLv[lv];
  const say = new Set(((b.say || {}).vowel || {})[lv] || []);
  const pool = ((b.match || {})[lv] || []).filter((w) => !say.has(w));
  const list = []; let min = Infinity;
  for (let a = 0; a < pool.length; a++) for (let c = a + 1; c < pool.length; c++) for (let e = c + 1; e < pool.length; e++) for (let g = e + 1; g < pool.length; g++) {
    const pics = [pool[a], pool[c], pool[e], pool[g]];
    if (pics.filter((w) => (b.printOnly || []).includes(w)).length > 1 || new Set(pics.map((w) => (b.kinds || {})[w])).size < 4) continue;
    for (const p1 of pics) for (const ds of (b.decoys || {})[p1] || []) for (const p2 of pics) for (const d2 of (b.decoys2 || {})[p2] || []) {
      if (pics.includes(d2) || say.has(d2) || d2 === ds) continue;
      const col = [...pics, ds, d2];
      const unpaired = pics.filter((w) => !col.some((o) => o !== w && o[0] === w[0])).length;
      if (unpaired < min) { min = unpaired; list.length = 0; }
      if (unpaired === min) list.push({ pics, ds: { w: ds, of: p1 }, d2: { w: d2, of: p2 } });
    }
  }
  return (byLv[lv] = { min, list });
}

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function syllFaultsOf(b) {
  const f = [];
  const bad = new Set(b.bad || []);
  if (bad.size < 10) f.push('no list of words a page may never print');
  // the two-syllable words: two parts that spell the word, each a word of one syllable with what was taught
  for (const [w, x] of Object.entries(b.two || {})) {
    if (!Array.isArray(x.parts) || x.parts.length !== 2 || x.parts.join('') !== w) { f.push(`"${w}" is not split into two parts that spell it`); continue; }
    const kinds = x.parts.map((p) => oneSyl(p, true));
    if (kinds.some((k) => !k)) f.push(`"${w}": a part (${x.parts.join(' | ')}) is not a syllable a first grader decodes with what was taught`);
    if (!!x.long !== kinds.includes('long')) f.push(`"${w}": its long flag does not match its parts`);
    if (!['compound', 'double', 'vccv', 'ck', 'three'].includes(x.kind)) f.push(`"${w}": no kind`);
    const [a, c] = x.parts;
    if (x.kind === 'compound' && x.meaning && !(oneSyl(a) && oneSyl(c))) f.push(`"${w}" is a compound whose parts are not words`);
    if (x.kind === 'double' && (a[a.length - 1] !== c[0] || /[aeiou]/.test(c[0]))) f.push(`"${w}" has no double consonant at its split`);
    if (x.kind === 'vccv' && (!/[aeiou][^aeiou]$/.test(a) || !/^[^aeiou][aeiou]/.test(c) || a[a.length - 1] === c[0])) f.push(`"${w}" is not split between two different consonants`);
    if (x.kind === 'ck' && !/ck$/.test(a)) f.push(`"${w}" is not split after its ck`);
    if (x.kind !== 'compound' && x.kind !== 'ck' && x.kind !== 'three' && /^(sh|ch|th|wh|ck|ng)/.test(c)) f.push(`"${w}": its second part starts with a digraph`);
    if (x.kind !== 'compound' && (x.meaning || x.draw)) f.push(`"${w}" is not a compound but is marked as one`);
    if (x.draw && !x.meaning) f.push(`"${w}" is to be drawn but its parts do not keep their meaning`);
    if (x.oddParts && (x.kind !== 'compound' || x.meaning)) f.push(`"${w}": only a compound without a kept meaning may have an odd part`);
    if (x.parts.some((p) => bad.has(p)) || bad.has(w)) f.push(`"${w}" prints a word on the list of words never to print`);
    if (!x.long && vowelLetters(w) !== 2) f.push(`"${w}" has not one vowel letter in each syllable`);
  }
  // the one-syllable words: one short vowel (one vowel letter), or (oneLong) silent e or a vowel team
  const one = b.one || [], oneLong = b.oneLong || [];
  one.forEach((w) => { if (oneSyl(w) !== 'short') f.push(`"${w}" is not a one-syllable word with one short vowel`); });
  oneLong.forEach((w) => { if (oneSyl(w) !== 'long' || vowelLetters(w) < 2) f.push(`"${w}" is not a one-syllable word with two vowel letters and one vowel sound`); });
  for (const [name, list] of [['one', one], ['oneLong', oneLong]]) if (new Set(list).size !== list.length) f.push(`${name}: a word stands twice`);
  [...one, ...oneLong].forEach((w) => { if (b.two[w] || bad.has(w)) f.push(`"${w}" is also a two-syllable word, or a word never to print`); });
  [...one, ...oneLong].forEach((w) => { if (lWord(w)) f.push(`"${w}" has a long vowel or a vowel team before l: many first graders clap it as two beats`); });
  // longer one-syllable words exist at every level, so that a sort or a grid is never done by word length
  if (one.filter((w) => w.length >= 6).length < 8 || oneLong.filter((w) => w.length >= 6).length < 5) f.push('too few long one-syllable words (six letters or more)');
  (b.sight1 || []).forEach((w) => { if (vowelLetters(w) !== 1) f.push(`the sight word "${w}" has not one vowel letter`); });
  // the pictures of G1-600: a colour theme; print-only and kind for every one; decoys are the first part, alone
  for (const [w, p] of Object.entries(b.pics || {})) {
    if (!Array.isArray(p) || p.length !== 2 || /bw( ?\d+)?$/i.test(p[0])) f.push(`picture of ${w}: not a colour theme and a noun`);
    if (!b.two[w]) f.push(`the picture "${w}" is no two-syllable word of the bank`);
    if (!(b.kinds || {})[w]) f.push(`the picture "${w}" has no kind`);
  }
  for (const [w, ds] of Object.entries(b.decoys || {})) ds.forEach((d) => {
    if (!b.pics[w] || !b.two[w] || !w.startsWith(d) || d.length >= w.length || oneSyl(d) !== 'short' || (b.pics || {})[d] || one.includes(d)) f.push(`"${d}" is not a one-syllable word the pictured "${w}" starts with (or it is a word of a list or a picture)`);
  });
  for (const [w, ds] of Object.entries(b.decoys2 || {})) ds.forEach((d) => {
    if (!b.pics[w] || !b.two[d] || d === w || d[0] !== w[0] || lPart(b.two[d])) f.push(`"${d}" is not a two-syllable word that shares its first letters with the pictured "${w}"`);
  });
  // pumpkin (three consonants in the middle) is a level-3 picture only
  const pool = { 1: (x) => x.kind === 'compound' && !x.long, 2: (x) => ['double', 'vccv', 'ck'].includes(x.kind), 3: (x) => (x.kind === 'compound' && !x.long) || ['double', 'vccv', 'ck', 'three'].includes(x.kind) };
  for (const lv of [1, 2, 3]) (b.match[lv] || []).forEach((w) => { if (!b.pics[w] || !pool[lv](b.two[w] || {})) f.push(`level ${lv}: the picture "${w}" is not a word of the level`); });
  (b.printOnly || []).forEach((w) => { if (!b.pics[w]) f.push(`print-only "${w}" has no picture`); });
  // the sentences of G1-601: one two-syllable word of the level; every other word one syllable (levels 1 and 2: as many
  // vowel letters as vowel sounds)
  const N = b.names || {};
  const nameKind = (t) => ((N.short || []).some((n) => n.toLowerCase() === t) ? 'short' : (N.long || []).some((n) => n.toLowerCase() === t) ? 'long' : (N.two || []).some((n) => n.toLowerCase() === t) ? 'two' : null);
  const sentKinds = { 1: (x) => x.kind === 'compound' && !x.long, 2: (x) => ['double', 'vccv'].includes(x.kind), 3: (x) => ['compound', 'double', 'vccv'].includes(x.kind) };
  for (const lv of [1, 2, 3]) {
    const ss = (b.sentences || {})[lv] || [];
    if (ss.length < 14) f.push(`sort level ${lv}: fewer than fourteen sentences`);
    ss.forEach((s) => {
      if (typeof s.text !== 'string' || !/^[A-Z].*[.!?]$/.test(s.text) || s.text.length > 40) f.push(`"${s.text}" is no short sentence`);
      const x = twoOf(b, s.two);
      if (!x || !sentKinds[lv](x) || !hasWord(s.text, s.two)) f.push(`sort level ${lv}: "${s.text}": its word "${s.two}" is no two-syllable word of the level in the sentence`);
      if (((b.say || {}).sort || {})[lv] && b.say.sort[lv].includes(String(s.two).replace(/s$/, ''))) f.push(`"${s.two}" is an example of the instruction`);
      if (x && lPart(x)) f.push(`sort level ${lv}: "${s.two}" has a part with a long vowel before l (two beats to many children)`);
      if (x && lv === 3 && x.quiet) f.push(`sort level 3: "${s.two}" has a second syllable with no vowel a child can hear`);
      tokens(s.text).forEach((t) => {
        if (lWord(t)) f.push(`sort level ${lv}: "${t}" in "${s.text}" has a long vowel before l (two beats to many children)`);
        if (t === s.two) return;
        const k = (b.sight1 || []).includes(t) ? 'short' : nameKind(t) || oneSyl(t) || ((b.sightL || []).includes(t) ? 'longsight' : null);
        if (!k || k === 'two') f.push(`sort level ${lv}: "${t}" in "${s.text}" is not a one-syllable word a first grader decodes`);
        else if (lv < 3 && k !== 'short') f.push(`sort level ${lv}: "${t}" in "${s.text}" has more vowel letters than vowel sounds (a level-3 word)`);
        if (bad.has(t)) f.push(`"${t}" is never printed`);
      });
    });
    if (new Set(ss.map((s) => s.text)).size !== ss.length) f.push(`sort level ${lv}: a sentence stands twice`);
    if (new Set(ss.filter(overlapOf).map((s) => stemOf(s.two))).size < 6) f.push(`sort level ${lv}: fewer than six words to circle stand in a sentence with a one-syllable word as long as they are`);
    if (lv === 3 && ss.filter((s) => tokens(s.text).some((t) => t !== s.two && (oneSyl(t) === 'long' || nameKind(t) === 'long'))).length < 8) f.push('sort level 3: fewer than eight sentences with a one-syllable word of two vowel letters');
  }
  // heart words: boxes that spell the word, one or two heart boxes; the four of the title first, other first letters
  const H = b.heart || {}, hw = H.words || [];
  const byW = Object.fromEntries(hw.map((x) => [x.w, x]));
  hw.forEach((x) => {
    if (!Array.isArray(x.boxes) || x.boxes.join('') !== x.w || x.boxes.some((p) => !p || p.length > 3)) f.push(`heart: the boxes of "${x.w}" do not spell it`);
    if (!Array.isArray(x.heart) || !x.heart.length || x.heart.length > 2 || x.heart.some((i) => !x.boxes[i])) f.push(`heart: "${x.w}" has no heart box`);
    if (!x.note) f.push(`heart: "${x.w}" has no note`);
    const ss = (H.sentences || {})[x.w] || [], fits = (H.fits || {})[x.w] || [];
    if (ss.length < 6) f.push(`heart: fewer than six sentences for "${x.w}"`);
    if (fits.length !== ss.length || fits.some((y) => !Array.isArray(y) || y.some((z) => !byW[z] || z === x.w))) f.push(`heart: the sentences of "${x.w}" do not name the other heart words that fit them`);
    ss.forEach((t) => {
      if (t.split('___').length !== 2 || !/[.!?”]$/.test(t) || /["']/.test(t) || t.length > 44) f.push(`heart: "${t}" has not one blank inside a short sentence`);
      if (hw.some((y) => hasWord(t.replace('___', ' '), y.w))) f.push(`heart: "${t}" prints a heart word`);
      tokens(t.replace('___', ' ')).forEach((k) => {
        if (/ai|oul|ey|oe|ie/.test(k)) f.push(`heart: "${k}" in "${t}" holds the letters of a heart part with another sound`);
        if (!(b.sight1 || []).includes(k) && !(b.sightL || []).includes(k) && !nameKind(k) && !oneSyl(k)) f.push(`heart: "${k}" in "${t}" is not a word a first grader decodes or knows by heart`);
      });
    });
  });
  if ((H.always || []).join() !== 'said,was,of,could') f.push('heart: said, was, of, could are not the words of every page');
  const fl = (H.always || []).map((w) => w[0]), others = hw.map((x) => x.w).filter((w) => !(H.always || []).includes(w));
  // levels 1 and 2 print the first letter of the answer: their words start with different letters (a word that shares its
  // first letter with a word of the title, come, stands on level 3 only, which prints no first letter)
  if (new Set(fl).size !== fl.length || new Set(others.map((w) => w[0])).size !== others.length) f.push('heart: two heart words start with one letter');
  if (others.filter((w) => !fl.includes(w[0])).length < 4) f.push('heart: fewer than four other words for level 2');
  // the examples of the instructions are words of the bank (an answer never is one)
  for (const m of ['vowel', 'sort', 'parts']) for (const lv of [1, 2, 3]) ((b.say || {})[m] || {})[lv] && b.say[m][lv].forEach((w) => { if (!b.two[w] && !one.includes(w) && !oneLong.includes(w)) f.push(`${m} level ${lv}: the example "${w}" is no word of the bank`); });
  // the instruction examples (split with |, joined with + =) say what the bank says
  for (const m of ['vowel', 'sort', 'parts']) for (const lv of [1, 2, 3]) {
    const t = INSTR[m][lv];
    for (const mm of t.matchAll(/([a-z]+) \| ([a-z]+)/g)) { const x = b.two[mm[1] + mm[2]]; if (!x || x.parts.join('|') !== mm[1] + '|' + mm[2] || !(b.say[m][lv] || []).includes(mm[1] + mm[2])) f.push(`the instruction of ${m} level ${lv} splits ${mm[1] + mm[2]} where the bank does not, or does not keep it off the page`); }
  }
  if (f.length) return f;
  // every level can draw its pages: 60 seeded draws a level
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let k = 1; k <= 60; k++) {
    try { drawPage(b, mode, lv, makeRng(`syll-g1-check|${mode}|${lv}|${k}`)); } catch (e) { f.push(`${mode} level ${lv}: a page cannot be drawn (${e.message})`); break; }
  }
  return f;
}

/* ---------------------------------------------------------------- drawing a page (data only) ---------------------------------------------------------------- */
const staircase = (idx) => idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1));
/** the numbers of the count grid (row by row, `cols` a row): no column all one number, not every row alike, never four
 *  alike or six alternating in reading order */
function gridOk(ns, cols) {
  const rows = []; for (let i = 0; i < ns.length; i += cols) rows.push(ns.slice(i, i + cols).join(''));
  const col = (c) => rows.map((r) => r[c]).filter(Boolean);
  if (Array.from({ length: cols }, (_, c) => col(c)).some((x) => new Set(x).size < 2)) return false;
  if (rows.every((r) => r === rows[0])) return false;
  const s = ns.join('');
  return !/(1111|2222)/.test(s) && !/(121212|212121)/.test(s);
}
/** an order of sort items with no three of one column in a row */
/** up to n items of a list whose parts are all different, and different from the parts of `have` (a page never shows
 *  laptop, desktop, and treetop together: the child would read top once and guess) */
function distinct(list, n, have = []) { const used = new Set(have.flatMap((x) => x.parts)), out = []; for (const x of list) { if (out.length === n) break; if (x.parts.some((p) => used.has(p))) continue; out.push(x); x.parts.forEach((p) => used.add(p)); } return out; }
function mixed(items, rng) { let o = items; for (let k = 0; k < 200; k++) { o = shuffle(items, rng); if (!o.some((x, i) => i >= 2 && x.col === o[i - 1].col && x.col === o[i - 2].col)) break; } return o; }

function drawPage(b, mode, lv, rng) {
  let last;
  for (let k = 0; k < 40; k++) { try { return drawOnce(b, mode, lv, rng); } catch (e) { last = e; } }
  throw last;
}
function drawOnce(b, mode, lv, rng) {
  const d = LEVELS[mode][lv];
  const n = (kind) => (d.tasks.find((t) => t[0] === kind) || [])[1];
  const tasks = [];
  const say = new Set(((b.say || {})[mode] || {})[lv] || []);
  const twoList = (kinds, more = () => true) => Object.entries(b.two).filter(([w, x]) => kinds.includes(x.kind) && !say.has(w) && more(w, x)).map(([w, x]) => ({ w, ...x }));

  if (mode === 'vowel') {
    // the match first: one of the best allowed matches of the level (matchCombos): four pictures, a short word a pictured
    // word starts with (back, backpack) and a two-syllable word that shares first letters with a pictured word (handstand,
    // handbag), so that the match can be done neither by first letters nor without reading both syllables
    const best = matchCombos(b, lv).list;
    if (!best.length) throw new Error('no match');
    const mc = best[rng.int(0, best.length - 1)];
    const pics = shuffle(mc.pics, rng), decoys = [{ ...mc.ds, dk: 'short' }, { ...mc.d2, dk: 'two' }];
    const printed = new Set([...pics, ...decoys.map((x) => x.w)]);
    const partsOnPage = new Set([...pics, mc.d2.w].flatMap((w) => b.two[w].parts));
    // the twelve words to count: two-syllable words of the level and one-syllable words; the longest one-syllable word is at
    // least as long as the shortest two-syllable word, so the count is never done by word length
    const nTwo = rng.int(d.twoN[0], d.twoN[1]);
    const twosAll = shuffle(twoList(d.kinds, (w, x) => !x.long && !lPart(x) && w.length <= d.maxLen && !printed.has(w) && !x.parts.some((p) => printed.has(p))), rng);
    const twos = distinct(twosAll, nTwo);
    if (twos.length < nTwo) throw new Error('too few two-syllable words');
    const usedParts = new Set([...partsOnPage, ...twos.flatMap((x) => x.parts)]);
    const m2 = Math.min(...twos.map((x) => x.w.length));
    const onePool = shuffle(b.one.filter((w) => !say.has(w) && !printed.has(w) && !usedParts.has(w) && !usedParts.has(stemOf(w)) && w.length <= d.maxLen && !lWord(w)), rng);
    const long1 = onePool.find((w) => w.length >= m2);
    if (!long1) throw new Error('no one-syllable word as long as the shortest two-syllable word');
    const ones = [long1];
    for (const w of onePool) { if (ones.length === n('count') - nTwo) break; if (!ones.some((o) => stemOf(o) === stemOf(w))) ones.push(w); }
    if (ones.length < n('count') - nTwo) throw new Error('too few one-syllable words');
    let words = null;
    for (let k = 0; k < 300 && !words; k++) {
      const o = shuffle([...twos.map((x) => ({ w: x.w, n: 2, at: x.parts[0].length })), ...ones.map((w) => ({ w, n: 1, at: 0 }))], rng);
      if (gridOk(o.map((x) => x.n), 3)) words = o;
    }
    if (!words) throw new Error('no grid without a pattern');
    // six word rows (four pictured, two without a picture, never side by side) and four picture rows: no word straight
    // across from its picture, not all one distance away, never in the order of their words, its reverse, or a rotation
    const Hw = d.mrow, G = d.mgap, n6 = pics.length + decoys.length, Hp = Math.floor((n6 * Hw + (n6 - 1) * G - (pics.length - 1) * G) / pics.length);
    const yw = (i) => i * (Hw + G) + Hw / 2, yp = (j) => j * (Hp + G) + Hp / 2;
    let rows = null, perm = null;
    for (let k = 0; k < 800; k++) {
      const r = shuffle([...pics.map((w) => ({ w, pic: true })), ...decoys.map((x) => ({ w: x.w, of: x.of, dk: x.dk, pic: false }))], rng);
      const di = r.map((x, i) => (x.pic ? -1 : i)).filter((i) => i >= 0);
      if (Math.abs(di[0] - di[1]) === 1) continue;
      const p = shuffle(pics.map((_, i) => i), rng);       // picture row j shows pics[p[j]]
      const wo = r.filter((x) => x.pic).map((x) => x.w), po = p.map((s) => pics[s]);
      const rots = (x) => x.map((_, q) => x.slice(q).concat(x.slice(0, q)).join());
      if ([...rots(wo), ...rots(wo.slice().reverse())].includes(po.join())) continue;
      const off = pics.map((w, s) => yp(p.indexOf(s)) - yw(r.findIndex((x) => x.w === w)));
      if (off.every((o) => Math.abs(o) >= 18) && new Set(off.map((o) => Math.round(o / 10))).size > 1) { rows = r; perm = p; break; }
    }
    if (!rows) throw new Error('no matching order');
    tasks.push({ kind: 'count', items: words });
    tasks.push({ kind: 'match', rows, perm, pics, Hw, Hp, G });
  }

  if (mode === 'sort') {
    const nS = n('sort'), half = nS / 2;
    // the sentences first (their two-syllable words are never printed elsewhere), then the words to sort
    // (level 3 never circles a word whose second syllable has no vowel a child can hear: kit | ten; no page a word with a
    // long vowel before l: mail | box)
    const nC = n('circle');
    const okTarget = (s) => { const x = twoOf(b, s.two); return !!x && !lPart(x) && !(d.long && x.quiet); };
    const ss = shuffle(b.sentences[lv].filter((s) => !say.has(String(s.two).replace(/s$/, '')) && okTarget(s)), rng);
    let sents = null;
    for (let k = 0; k < 800 && !sents; k++) {
      const got = [];
      for (const s of shuffle(ss, rng)) {
        if (got.length === nC) break;
        const stem = s.two.replace(/s$/, '');
        if (got.some((g) => g.two.replace(/s$/, '') === stem || hasWord(g.text, s.two) || hasWord(s.text, g.two))) continue;
        got.push(s);
      }
      if (got.length < nC) continue;
      const at = got.map((s) => tokens(s.text).indexOf(s.two)), last = got.map((s) => tokens(s.text).length - 1);
      if (new Set(at).size < 2 || at.every((x, i) => x === last[i]) || staircase(at)) continue;
      // the place of the word to circle follows no pattern (first, middle, last)
      if (!placesOk(at.map((x, i) => placeOf(x, last[i] + 1)))) continue;
      // never by length: in two sentences or more a one-syllable word is as long as the word to circle, and that word is the
      // longest of its sentence in at most half of them
      const ov = got.filter(overlapOf).length;
      if (ov < 2 || nC - ov > Math.floor(nC / 2)) continue;
      sents = got;
    }
    if (!sents) throw new Error('no sentences');
    const inText = new Set([...sents.flatMap((s) => tokens(s.text)), ...sents.flatMap((s) => twoOf(b, s.two).parts)]);   // and the parts of the words to circle
    const stemsInText = new Set([...inText].map((t) => t.replace(/s$/, '')));
    const free = (w) => !say.has(w) && !inText.has(w) && !stemsInText.has(w);
    const twos = shuffle(twoList(d.kinds, (w, x) => (d.long || !x.long) && !lPart(x) && !(d.long && x.quiet) && free(w) && !x.parts.some((p) => inText.has(p))), rng);
    // a short two-syllable word first (attic, sunset), so that a one-syllable word can be as long
    const shortFirst = (list) => { const i = list.findIndex((x) => x.w.length <= 6); return i < 0 ? list : [list[i], ...list.slice(0, i), ...list.slice(i + 1)]; };
    let pick2 = distinct(shortFirst(twos), half);
    if (d.long) { // level 3: at least one long-vowel compound and one short word among the two-syllable words
      const lo = twos.filter((x) => x.long), sh = shortFirst(twos.filter((x) => !x.long));
      pick2 = distinct([...sh.slice(0, 1), ...lo.slice(0, 1), ...shuffle([...lo.slice(1), ...sh.slice(1)], rng)], half);
    }
    if (pick2.length < half) throw new Error('too few two-syllable words to sort');
    const m2 = Math.min(...pick2.map((x) => x.w.length));
    const parts2 = new Set(pick2.flatMap((x) => x.parts));
    const okOne = (w) => free(w) && !parts2.has(w) && !parts2.has(stemOf(w)) && !lWord(w);
    const oneShort = shuffle(b.one.filter(okOne), rng), oneLong = shuffle(b.oneLong.filter(okOne), rng);
    const pickOnes = (src, k, have) => { const out = []; for (const w of src) { if (out.length === k) break; if ([...have, ...out].some((o) => stemOf(o) === stemOf(w))) continue; out.push(w); } return out; };
    let pick1;
    if (d.long) { const lng = pickOnes(oneLong, d.longMin, []); pick1 = [...lng, ...pickOnes(oneShort, half - d.longMin, lng)]; }
    else pick1 = pickOnes(oneShort, half, []);
    if (pick1.length < half) throw new Error('too few one-syllable words to sort');
    // the longest one-syllable word is at least as long as the shortest two-syllable word (no sort by length)
    if (!pick1.some((w) => w.length >= m2)) {
      const cand = [...(d.long ? oneLong : []), ...oneShort].find((w) => w.length >= m2 && !pick1.some((o) => stemOf(o) === stemOf(w)));
      if (!cand) throw new Error('no one-syllable word as long as the shortest two-syllable word');
      pick1[pick1.length - 1] = cand;
    }
    const items = mixed([...pick1.map((w) => ({ w, col: 0 })), ...pick2.map((x) => ({ w: x.w, col: 1 }))], rng);
    tasks.push({ kind: 'sort', heads: HEADS.sort, items, per: half, line: LINES.sort });
    tasks.push({ kind: 'circle', items: sents.map((s) => ({ text: s.text, two: s.two })) });
  }

  if (mode === 'parts') {
    const nP = n('split');
    let split = null, extra = null;
    for (let k = 0; k < 300 && !split; k++) {
      // level 1 and 2: two compounds to write and draw (no part shared); level 3: six words to sort
      let task2 = null, kind2 = null;
      if (n('draw')) {
        const dr = shuffle(twoList(['compound'], (w, x) => x.draw && x.meaning && (!d.short || !x.long)), rng);
        const two = [];
        for (const x of dr) { if (two.length === n('draw')) break; if (!two.some((y) => y.parts.some((p) => x.parts.includes(p)))) two.push(x); }
        if (two.length < n('draw')) continue;
        task2 = two; kind2 = 'draw';
      } else {
        const c = distinct(shuffle(twoList(['compound'], (w, x) => x.meaning), rng), n('sortc') / 2);
        const nc = distinct(shuffle(twoList(['double', 'vccv'], (w, x) => !x.twoWords), rng), n('sortc') / 2, c);
        task2 = [...c, ...nc]; kind2 = 'sortc';
      }
      const t2w = new Set(task2.map((x) => x.w)), t2p = new Set(task2.flatMap((x) => x.parts));
      // level 1: short-vowel compounds only (long-vowel compounds such as beehive come from level 2)
      const pool = twoList(d.kinds, (w, x) => !x.oddParts && (!d.short || !x.long) && !t2w.has(w) && !x.parts.some((p) => t2p.has(p)) && !t2p.has(w));
      let got = [];
      if (d.min) {
        for (const kd of d.kinds) got.push(...distinct(shuffle(pool.filter((x) => x.kind === kd), rng), d.min, got));
        got.push(...distinct(shuffle(pool.filter((x) => !got.includes(x)), rng), nP - got.length, got));
      } else got = distinct(shuffle(pool, rng), nP);
      if (got.length < nP) continue;
      // no word twice; no part of one word is another word of the page
      const ws = new Set(got.map((x) => x.w));
      if (got.some((x) => x.parts.some((p) => ws.has(p)))) continue;
      split = shuffle(got, rng); extra = { kind: kind2, items: task2 };
    }
    if (!split) throw new Error('no words to split');
    tasks.push({ kind: 'split', items: split.map((x) => ({ w: x.w, parts: x.parts, kind: x.kind })), line: lv === 1 ? LINES.split1 : LINES.split });
    if (extra.kind === 'draw') tasks.push({ kind: 'draw', items: extra.items.map((x) => ({ w: x.w, parts: x.parts })) });
    else tasks.push({ kind: 'sort', heads: HEADS.sortc, items: mixed(extra.items.map((x) => ({ w: x.w, col: x.kind === 'compound' ? 0 : 1 })), rng), per: n('sortc') / 2, line: LINES.sortc });
  }

  if (mode === 'heart') {
    const H = b.heart, byW = Object.fromEntries(H.words.map((x) => [x.w, x]));
    const k = n('heartbox');
    // levels 1 and 2: the four words of the title and two more (level 2); level 3: three or four of the four and other heart
    // words of the bank (its three columns hold no word of more than four boxes), so that its copies differ
    const nT = d.title || H.always.length;
    const title = nT >= H.always.length ? H.always.slice() : shuffle(H.always, rng).slice(0, rng.int(nT, nT + 1));
    // (levels 1 and 2 print the first letter of each answer: no other word there shares a first letter with a word of the page)
    const firsts = new Set(title.map((w) => w[0]));
    const others = shuffle(H.words.filter((x) => !H.always.includes(x.w) && x.boxes.length <= (d.maxBoxes || 9) && (d.noStarter || !firsts.has(x.w[0]))).map((x) => x.w), rng).slice(0, k - title.length);
    if (others.length < k - title.length) throw new Error('too few heart words');
    const words = [...title, ...others];
    const order = shuffle(words, rng);
    // the sentences: one word each, the four of the title at least two times where the page has two or more; never in the order of the boxes
    tasks.push({ kind: 'heartbox', items: order.map((w) => ({ w, boxes: byW[w].boxes, heart: byW[w].heart })) });
    const nS = n('heartsent');
    if (nS) {
      let sw = null;
      for (let t = 0; t < 300 && !sw; t++) {
        const s = shuffle(words, rng).slice(0, nS);
        if (s.filter((w) => H.always.includes(w)).length < Math.min(2, nS) || staircase(s.map((w) => order.indexOf(w)))) continue;
        sw = s;
      }
      if (!sw) throw new Error('no sentences');
      const sents = sw.map((w) => {
        const ok = H.sentences[w].map((t, i) => ({ t, fits: H.fits[w][i] })).filter((x) => !x.fits.some((z) => words.includes(z)));
        const pick = shuffle(ok, rng)[0];
        if (!pick) throw new Error('no sentence for ' + w);
        return { w, text: pick.t };
      });
      tasks.push({ kind: 'heartsent', items: sents });
    }
    if (n('own')) tasks.push({ kind: 'own', rows: n('own'), fold: !nS });
  }

  const items = [];
  for (const t of tasks) {
    if (t.kind === 'count') items.push(...t.items.map((x) => 'count:' + x.w));
    if (t.kind === 'match') items.push(...t.rows.map((x) => (x.pic ? 'pic:' : 'nopic:') + x.w));
    if (t.kind === 'sort') items.push(...t.items.map((x) => 'sort:' + x.w));
    if (t.kind === 'circle') items.push(...t.items.map((x) => 'circle:' + x.text));
    if (t.kind === 'split') items.push(...t.items.map((x) => 'split:' + x.w));
    if (t.kind === 'draw') items.push(...t.items.map((x) => 'draw:' + x.w));
    if (t.kind === 'heartbox') items.push(...t.items.map((x) => 'heart:' + x.w));
    if (t.kind === 'heartsent') items.push(...t.items.map((x) => 'hsent:' + x.text));
  }
  return { mode, lv, tasks, items };
}

{ const f = syllFaultsOf(BANK); if (f.length) throw new Error('syllables-g1.en.json: ' + f.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks
/** In this font an f before i, f, l, or t and a t before t touch the next letter even with ligatures off: every such f or
 *  t gets a little room of its own (text in tags and <svg> is left alone; a word split into letter spans never has two
 *  such letters in one text node, and its spans carry the same room) */
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
/** the same room inside a writing row's svg text (a key's answer, a printed first letter) */
function svgRoom(html) {
  return html.replace(/(<text\b[^>]*\bfont-size="([\d.]+)"[^>]*>)([^<]*)(<\/text>)/g, (m, open, fsz, body, close) => open + body.replace(/(?<=[ft])([iflt])/g, (c) => `<tspan dx="${(0.07 * +fsz).toFixed(2)}" data-lcs-fsep>${c}</tspan>`) + close);
}
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 20) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (k) => `<span style="color:${T.teal}">${k}.</span> `;
const chip = (text, attr, font = 22) => `<span ${attr} style="font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 14px;border-radius:999px;background:#FFFFFF;border:2px solid ${T.teal}">${esc(text)}</span>`;
const headBar = (text) => `<div data-lcs-colhead style="background:${T.teal};color:#FFFFFF;border-radius:8px;text-align:center;font:800 22px/1.35 'Nunito',sans-serif;padding:1px 0">${esc(text)}</div>`;
const heartSvg = (size) => `<svg data-lcs-heartmark width="${size}" height="${size}" viewBox="0 0 24 24" style="display:block"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.3 1.8-2.1 3.3-3.3 5.4-3.3 3.6 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" fill="${T.teal}"/></svg>`;
const img = (w, size) => `<img class="ws-icon" data-lcs-pic="${esc(w)}" src="${fileUri(BANK.pics[w][0], BANK.pics[w][1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
/** a word printed letter by letter (every letter a span: the key underlines vowels and draws the split in them) */
function letters(w, font, key, { underline = false, at = 0, spacing = 0.08 } = {}) {
  return `<span data-lcs-read data-lcs-word="${esc(w)}" style="display:inline-flex;font:800 ${font}px/1 'Nunito',sans-serif;color:${T.ink};letter-spacing:${spacing}em">` + [...w].map((c, i) => {
    const v = /[aeiou]/.test(c), room = c === 'f' && /[iflt]/.test(w[i + 1] || '') || (c === 't' && w[i + 1] === 't') ? 'margin-right:0.07em;' : '';
    return `<span data-lcs-letter="${c}"${v ? ' data-lcs-v="1"' : ''} style="position:relative;display:inline-block;${room}">` +
      (key && underline && v ? `<span data-lcs-uline style="position:absolute;left:0;right:${spacing}em;bottom:-7px;height:3.5px;border-radius:2px;background:${T.teal}"></span>` : '') +
      (key && at && i === at ? `<span data-lcs-splitbar style="position:absolute;left:-${(0.04 * font + 2).toFixed(1)}px;top:-9px;bottom:-9px;width:4px;border-radius:2px;background:${T.teal}"></span>` : '') + esc(c) + '</span>';
  }).join('') + '</span>';
}

/* ---------------------------------------------------------------- the blocks ---------------------------------------------------------------- */
function renderTask(t, k, mode, lv, d, key, inner) {
  if (t.kind === 'count') {
    const cell = (x) => `<div data-lcs-count="${x.w}" data-lcs-n="${x.n}" data-lcs-at="${x.at}" style="display:flex;align-items:center;justify-content:space-between;gap:8px;height:${d.crow}px;padding:0 8px 0 12px;border-radius:10px;background:#FFFFFF">` +
      letters(x.w, d.cfont, key, { underline: true, at: d.split ? x.at : 0, spacing: 0.06 }) +
      `<span data-lcs-numbox style="flex:0 0 auto;box-sizing:border-box;width:46px;height:46px;border:2.5px solid ${T.ink};border-radius:8px;display:flex;align-items:center;justify-content:center;font:800 28px/1 'Nunito',sans-serif;color:${T.teal}">${key ? x.n : ''}</span></div>`;
    return cream('data-lcs-task="count"', label(`${num(k)}${d.split ? LINES.count3 : LINES.count}`) +
      `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:${d.rgap}px 12px;padding:2px 0">${t.items.map(cell).join('')}</div>`, d.pad);
  }
  if (t.kind === 'match') {
    const { rows, perm, pics, Hw, Hp, G } = t, n6 = rows.length, LW = 220, GW = 170, RW = 130, Htot = n6 * Hw + (n6 - 1) * G;
    const yw = (i) => i * (Hw + G) + Hw / 2, yp = (j) => j * (Hp + G) + Hp / 2;
    const lines = key ? pics.map((w, s) => { const i = rows.findIndex((r) => r.w === w), j = perm.indexOf(s); return `<line data-lcs-keyline="${i}-${j}" x1="7" y1="${yw(i)}" x2="${GW - 7}" y2="${yp(j)}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>`; }).join('') : '';
    const dots = rows.map((_, i) => `<circle cx="7" cy="${yw(i)}" r="7" fill="${T.ink}"/>`).join('') + perm.map((_, j) => `<circle cx="${GW - 7}" cy="${yp(j)}" r="7" fill="${T.ink}"/>`).join('');
    return cream('data-lcs-task="match"', label(`${num(k)}${LINES.match}`) +
      `<div data-lcs-match="${n6}" style="margin:auto 0;display:grid;grid-template-columns:${LW}px ${GW}px ${RW}px;justify-content:center;align-items:start">` +
      `<div style="display:flex;flex-direction:column;gap:${G}px">${rows.map((r, i) => `<div data-lcs-mword="${i}"${r.pic ? '' : ` data-lcs-decoy="${r.of}" data-lcs-dk="${r.dk}"`} data-lcs-read style="height:${Hw}px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;padding-right:16px;font:800 ${d.mfont}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(r.w)}</div>`).join('')}</div>` +
      `<svg data-lcs-gutter width="${GW}" height="${Htot}" viewBox="0 0 ${GW} ${Htot}" style="display:block">${lines}${dots}</svg>` +
      `<div style="display:flex;flex-direction:column;gap:${G}px">${perm.map((s) => `<div data-lcs-mpic="${pics[s]}" style="height:${Hp}px;box-sizing:border-box;display:flex;align-items:center;padding-left:16px">${img(pics[s], d.mpic)}</div>`).join('')}</div></div>`, d.pad, 6, 'flex:1 1 auto;');
  }
  if (t.kind === 'sort') {
    const cols = 2, colW = Math.floor((inner - 16) / cols);
    return cream(`data-lcs-task="${mode === 'parts' ? 'sortc' : 'sort'}"`, label(`${num(k)}${t.line}` + (key ? ` <span data-lcs-anyorder style="font-weight:700;font-size:16px;color:${T.teal}">(any order)</span>` : '')) +
      `<div data-lcs-bank style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px 10px;margin:0 0 2px">${t.items.map((x) => chip(x.w, `data-lcs-bankword="${x.w}" data-lcs-col="${x.col}"`, 22)).join('')}</div>` +
      `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:4px 16px">` + t.heads.map((h, c) => `<div data-lcs-column="${c}" style="display:flex;flex-direction:column;gap:2px">${headBar(h)}${t.items.filter((x) => x.col === c).map((x) => line({ w: colW, h: ROW, answer: key ? x.w : null, sample: true })).join('')}</div>`).join('') + `</div>`, d.pad, 6, 'flex:1 1 auto;justify-content:space-around;');
  }
  if (t.kind === 'circle') {
    const row = (s) => {
      // each word in a ring the key draws (padding and border taken back by a negative margin, so the words stand as in
      // plain text and a period stands tight after the last word)
      const parts = s.text.match(/[A-Za-z]+(?:'[a-z]+)?|[^A-Za-z]+/g);
      let html = '';
      parts.forEach((p, i) => {
        if (/^[A-Za-z]/.test(p)) { const ok = p.toLowerCase() === s.two; html += `<span data-lcs-tok="${esc(p.toLowerCase())}"${ok ? ' data-lcs-ok="1"' : ''} style="display:inline-block;margin:0 -${RING}px;padding:0 ${RING - 3}px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px">${esc(p)}</span>`; }
        else html += /^[.!?]$/.test(p) && i ? `<span data-lcs-ptail>${esc(p)}</span>` : `<span data-lcs-punct>${esc(p)}</span>`;
      });
      return `<div data-lcs-circle="${esc(s.two)}" data-lcs-text="${attr(s.text)}" data-lcs-read style="font:700 ${d.sfont}px/1.45 'Nunito',sans-serif;color:${T.ink};padding:1px 0 1px 6px;white-space:normal">${html}</div>`;
    };
    return cream('data-lcs-task="circle"', label(`${num(k)}${LINES.circle}`) + `<div style="display:flex;flex-direction:column;justify-content:space-around;gap:3px;flex:1 1 auto">${t.items.map(row).join('')}</div>`, d.pad, 6, 'flex:1 1 auto;');
  }
  if (t.kind === 'split') {
    const cell = (x) => `<div data-lcs-split="${x.w}" data-lcs-at="${x.parts[0].length}" data-lcs-kind="${x.kind}" style="display:flex;justify-content:center;align-items:center;height:${d.prow}px;border-radius:10px;background:#FFFFFF">${letters(x.w, d.pfont, key, { at: x.parts[0].length })}</div>`;
    return cream('data-lcs-task="split"', label(`${num(k)}${t.line}`) + `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:${d.rgap}px 14px;padding:2px 0">${t.items.map(cell).join('')}</div>`, d.pad);
  }
  if (t.kind === 'draw') {
    const half = Math.floor((inner - 16) / 2), partW = Math.floor((half - 16 - 10) / 2);
    // the boxes to draw in grow with the page (the white cards fill the task card)
    const one = (x) => `<div data-lcs-draw="${x.w}" data-lcs-parts="${x.parts.join('|')}" style="display:flex;flex-direction:column;gap:6px;padding:6px 8px 4px;border-radius:12px;background:#FFFFFF">` +
      `<div data-lcs-read data-lcs-drawword style="text-align:center;font:800 30px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(x.w)}</div>` +
      `<div style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;gap:10px">` + x.parts.map((p, i) => `<div data-lcs-part="${i}" style="display:flex;flex-direction:column;gap:4px">` +
        `<div data-lcs-drawbox style="flex:1 1 auto;min-height:${d.boxH}px;box-sizing:border-box;border:2.5px solid ${T.teal};border-radius:10px;display:flex;align-items:center;justify-content:center">${key ? `<span data-lcs-keynote style="font:700 15px 'Nunito',sans-serif;color:${T.teal}">Drawings will vary.</span>` : ''}</div>` +
        line({ w: partW, h: ROW, answer: key ? p : null }) + `</div>`).join('') + `</div></div>`;
    return cream('data-lcs-task="draw"', label(`${num(k)}${LINES.draw}`) + `<div style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;gap:16px">${t.items.map(one).join('')}</div>`, d.pad, 6, 'flex:1 1 auto;');
  }
  if (t.kind === 'heartbox') {
    const B = d.hbox, hs = Math.round(B * 0.42);
    const row = (x) => `<div data-lcs-hrow="${x.w}" data-lcs-heart="${x.heart.join(',')}" style="display:flex;flex-direction:column;align-items:flex-start;gap:0">` +
      `<span data-lcs-read data-lcs-hw style="font:800 ${d.hfont}px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(x.w)}</span>` +
      `<div style="display:flex;gap:5px">${x.boxes.map((g, i) => `<div data-lcs-hcol="${i}" style="display:flex;flex-direction:column;align-items:center;gap:2px"><div data-lcs-hspace style="height:${hs}px;display:flex;align-items:flex-end">${key && x.heart.includes(i) ? heartSvg(hs) : ''}</div>` +
        `<div data-lcs-hbox="${esc(g)}" style="box-sizing:border-box;width:${(d.boxw || BOXW)[g.length]}px;height:${B}px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF;display:flex;align-items:center;justify-content:center;font:800 ${Math.round(B * 0.55)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(g) : ''}</div></div>`).join('')}</div></div>`;
    return cream('data-lcs-task="heartbox"', label(`${num(k)}${LINES.heartbox}`) +
      `<div style="display:grid;grid-template-columns:repeat(${d.cols || 2},1fr);gap:8px 18px;justify-items:start;padding:2px 6px">${t.items.map(row).join('')}</div>`, d.pad);
  }
  if (t.kind === 'heartsent') {
    const pb = Math.round(ROW * 0.2);
    return cream('data-lcs-task="heartsent"', label(`${num(k)}${LINES.fold} ${d.noStarter ? LINES.heartsent3 : LINES.heartsent}`) + `<div style="display:flex;flex-direction:column;justify-content:space-around;gap:2px;flex:1 1 auto">` + t.items.map((s) => {
      const [a, b] = s.text.split('___'), start = !a.trim() || /[.!?]\s*$/.test(a), word = start ? s.w[0].toUpperCase() + s.w.slice(1) : s.w;
      const m = b.match(/^[.!?,”]+/), tail = m ? m[0] : '', rest = (m ? b.slice(m[0].length) : b).trim();
      return `<div data-lcs-hsent="${s.w}" data-lcs-text="${attr(s.text)}" data-lcs-read style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:2px 8px;font:700 ${d.sfont}px/1.3 'Nunito',sans-serif;color:${T.ink}">${a.trim() ? `<span style="padding-bottom:${pb}px">${esc(a.trim())}</span>` : ''}<span data-lcs-blankgroup style="display:inline-flex;align-items:flex-end">${line({ w: 200, h: ROW, starter: d.noStarter ? null : word[0], answer: key ? word : null })}${tail ? `<span data-lcs-tail style="padding-bottom:${pb}px">${esc(tail)}</span>` : ''}</span>${rest ? `<span style="padding-bottom:${pb}px">${esc(rest)}</span>` : ''}</div>`;
    }).join('') + `</div>`, d.pad, 6, 'flex:1 1 auto;');
  }
  if (t.kind === 'own') {
    return cream('data-lcs-task="own"', label(`${num(k)}${t.fold ? LINES.fold + ' ' : ''}${LINES.own}`) + Array.from({ length: t.rows }, (_, i) => line({ w: inner - 8, h: ROW, answer: key && !i ? 'Sentences will vary.' : null })).join(''), d.pad, 3, 'flex:1 1 auto;justify-content:space-between;');
  }
  throw new Error('syllables-g1: no block for ' + t.kind);
}

/** what verify() needs to know of the bank */
function infoOf() {
  return {
    two: Object.fromEntries(Object.entries(BANK.two).map(([w, x]) => [w, { parts: x.parts, kind: x.kind, long: !!x.long, meaning: !!x.meaning, draw: !!x.draw, twoWords: !!x.twoWords, oddParts: !!x.oddParts, quiet: !!x.quiet, lPart: lPart(x) }])),
    one: BANK.one, oneLong: BANK.oneLong, sight1: BANK.sight1, sightL: BANK.sightL, names: BANK.names, lEnd: L_END.source,
    pics: Object.keys(BANK.pics), printOnly: BANK.printOnly, kinds: BANK.kinds, decoys: BANK.decoys, decoys2: BANK.decoys2, match: BANK.match,
    minUnpaired: { 1: matchCombos(BANK, 1).min, 2: matchCombos(BANK, 2).min, 3: matchCombos(BANK, 3).min },
    sentences: Object.fromEntries(Object.entries(BANK.sentences).map(([lv, ss]) => [lv, Object.fromEntries(ss.map((s) => [s.text, s.two]))])),
    heart: { words: Object.fromEntries(BANK.heart.words.map((x) => [x.w, { boxes: x.boxes, heart: x.heart }])), always: BANK.heart.always, sentences: BANK.heart.sentences, fits: BANK.heart.fits },
    say: BANK.say,
  };
}

function makeSyllG1Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('syllables-g1: unknown mode ' + mode);
  const INFO = { ...infoOf(), instr: INSTR[mode], lines: LINES, heads: HEADS };
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
      const inner = W - 24;
      const blocks = plan.tasks.map((t, i) => renderTask(t, i + 1, mode, lv, d, key, inner));
      // G1-603: a fold line between the words and the sentences (the child folds the words back and writes from memory)
      if (mode === 'heart') blocks.splice(1, 0, `<div data-lcs-fold style="display:flex;align-items:center;gap:10px;color:${T.inkSoft};font:700 19px/1.2 'Nunito',sans-serif"><span style="flex:1 1 auto;border-top:2.5px dashed ${T.inkSoft}"></span><span data-lcs-foldtext>Fold back</span><span style="flex:1 1 auto;border-top:2.5px dashed ${T.inkSoft}"></span></div>`);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-syllg1="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(svgRoom(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((LEVELS, INFO, CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-syllg1]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsSyllg1.split('|'), lv = +lvS, d = LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => e.textContent.replace(/\s+/g, ' ').trim();
        const toks = (t) => (String(t).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || []).map((x) => x.replace(/'s$/, ''));
        const has = (t, w) => toks(t).includes(String(w).toLowerCase());
        const TEAL = 'rgb(20, 107, 94)';
        const rb = R(root);
        const say = ((INFO.say[mode] || {})[lv]) || [];
        // letters: ligatures off everywhere, and an f before i, f, l, t and a t before t have their own room
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        document.querySelectorAll('[data-lcs-letter="f"], [data-lcs-letter="t"]').forEach((e) => { const nx = e.nextElementSibling; if (nx && nx.matches('[data-lcs-letter]') && (e.dataset.lcsLetter === 'f' ? /[iflt]/ : /t/).test(nx.dataset.lcsLetter) && parseFloat(cs(e).marginRight) < 1) fails.push('a letter span f or t stands right against the next letter'); });
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px'); });
        if (mode !== 'vowel' && root.querySelectorAll('img').length) fails.push('a picture on a page without pictures');
        // the instruction at the top of the page is the one of this level
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== INFO.instr[lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
        const blocks = [...root.children].filter((e) => e.dataset.lcsFold === undefined);
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, [data-lcs-line] svg').forEach((e) => { const q = R(e); if (e.dataset.lcsSplitbar !== undefined || e.dataset.lcsUline !== undefined) return; if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        { const kids = [...root.children]; for (let i = 1; i < kids.length; i++) { const g = R(kids[i]).top - R(kids[i - 1]).bottom; if (g > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
          const gb = rb.bottom - R(kids[kids.length - 1]).bottom; if (gb > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last task`); }
        // the same inside every task card: no blank band between two of its parts, nor at its top or bottom (when a task
        // that should grow does not, the space goes into the other card and opens bands there, not between the cards)
        blocks.forEach((b) => { if (!b.dataset.lcsTask) return; const ks = [...b.children], s = cs(b);
          for (let i = 1; i < ks.length; i++) { const g = R(ks[i]).top - R(ks[i - 1]).bottom; if (g > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px inside the ${b.dataset.lcsTask} task`); }
          const ge = Math.max(R(ks[0]).top - R(b).top - parseFloat(s.paddingTop), R(b).bottom - parseFloat(s.paddingBottom) - R(ks[ks.length - 1]).bottom);
          if (ge > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(ge)} px at the edge of the ${b.dataset.lcsTask} task`); });
        const LEND = new RegExp(INFO.lEnd);
        const kinds = blocks.map((b) => b.dataset.lcsTask);
        if (kinds.join() !== d.tasks.map((t) => t[0]).join()) fails.push(`the tasks are ${kinds.join(', ')}, not ${d.tasks.map((t) => t[0]).join(', ')}`);
        const countOf = (kind) => (d.tasks.find((t) => t[0] === kind) || [])[1];
        // sizes
        const lines = [...root.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < CFG.ROW - 0.5) fails.push(`a writing row lower than ${CFG.ROW} px`); });
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 19) fails.push('text a first grader reads is smaller than 19 px'); });
        root.querySelectorAll('[data-lcs-bankword], [data-lcs-colhead], [data-lcs-tok]').forEach((e) => { if (fs(e) < 20) fails.push('a word to sort or circle is smaller than 20 px'); });
        root.querySelectorAll('[data-lcs-colhead]').forEach((e) => { if (cs(e).backgroundColor !== TEAL || cs(e).color !== 'rgb(255, 255, 255)') fails.push('a sort column head is not a teal bar with white letters'); });
        root.querySelectorAll('[data-lcs-tail]').forEach((e) => { const p = e.previousElementSibling; if (!p || R(e).left - R(p).right > 1.5 || R(e).left < R(p).right - 0.5) fails.push('a period does not stand tight after its line'); });
        // every word the page prints for the child to read (no word twice, no answer printed elsewhere)
        const printed = [];   // [where, word]
        const checkPlaces = (ps, what) => { if (ps.length >= 2 && new Set(ps).size < 2) fails.push(`the right ${what} stands in one place every time`); if (ps.length >= 3 && (ps.every((x, i) => !i || x === ps[i - 1] + 1) || ps.every((x, i) => !i || x === ps[i - 1] - 1))) fails.push(`the right ${what} stands in a staircase`); };
        // a printed word spelled letter by letter: its letters spell it, the vowel letters are marked, the key's marks are right
        const wordCheck = (e, w, { underline, at }) => {
          const ls = [...e.querySelectorAll('[data-lcs-letter]')];
          if (ls.map((l) => l.dataset.lcsLetter).join('') !== w || ls.map((l) => l.textContent).join('') !== w) fails.push(`"${w}" is not printed letter by letter`);
          ls.forEach((l, i) => { if ((l.dataset.lcsV === '1') !== /[aeiou]/.test(w[i])) fails.push(`a vowel of "${w}" is not marked as one`); });
          const ul = ls.filter((l) => l.querySelector('[data-lcs-uline]')).map((l) => ls.indexOf(l)), vs = [...w].map((c, i) => (/[aeiou]/.test(c) ? i : -1)).filter((i) => i >= 0);
          if (isKey && underline ? ul.join() !== vs.join() : ul.length) fails.push(`the vowels of "${w}" are not underlined on the key, or are underlined on the page of the child`);
          const bars = ls.filter((l) => l.querySelector('[data-lcs-splitbar]')).map((l) => ls.indexOf(l));
          if (isKey && at ? bars.join() !== String(at) : bars.length) fails.push(`the line between the syllables of "${w}" is wrong on the key, or shows on the page of the child`);
          // the child's page gives the split away nowhere: the letters touch, evenly spaced
          const gaps = ls.slice(1).map((l, i) => R(l).left - R(ls[i]).right - parseFloat(cs(ls[i]).marginRight || 0));
          if (gaps.some((g) => g > 1.2 || g < -1.2)) fails.push(`the letters of "${w}" do not stand evenly`);
        };
        const oneKind = (w) => (INFO.one.includes(w) ? 'short' : INFO.oneLong.includes(w) ? 'long' : null);
        const two = (w) => INFO.two[w] || (INFO.two[String(w).replace(/s$/, '')] && /s$/.test(w) ? INFO.two[String(w).replace(/s$/, '')] : null);

        for (const b of blocks) {
          const kind = b.dataset.lcsTask, n = countOf(kind);
          if (kind === 'count') {
            const cells = [...b.querySelectorAll('[data-lcs-count]')];
            if (cells.length !== n || new Set(cells.map((c) => c.dataset.lcsCount)).size !== n) fails.push(`not ${n} different words to count`);
            const ns = [];
            cells.forEach((c) => { const w = c.dataset.lcsCount, x = INFO.two[w], k = oneKind(w), nn = +c.dataset.lcsN;
              const okKind = x ? !x.long && (lv === 1 ? x.kind === 'compound' : ['double', 'vccv'].includes(x.kind)) : k === 'short';
              if (!okKind || say.includes(w)) fails.push(`"${w}" is no word of level ${lv}, or an example of the instruction`);
              const vl = (w.match(/[aeiou]/g) || []).length;
              if (nn !== (x ? 2 : 1) || vl !== nn || /y/.test(w)) fails.push(`"${w}" has not one vowel letter in each of its ${nn} syllables`);
              if (x && +c.dataset.lcsAt !== x.parts[0].length) fails.push(`"${w}" is not split where the bank splits it`);
              wordCheck(c, w, { underline: true, at: d.split && x ? x.parts[0].length : 0 });
              const box = c.querySelector('[data-lcs-numbox]');
              if (!box || R(box).width < 44 || R(box).height < 44) fails.push('a box for the number is smaller than 44 px');
              else if (isKey ? txt(box) !== String(nn) : txt(box)) fails.push(`the box of "${w}" is filled on the page of the child, or the key does not write ${nn}`);
              if (fs(c.querySelector('[data-lcs-word]')) < 28) fails.push('a word to count is smaller than 28 px');
              if (box && R(c.querySelector('[data-lcs-word]')).right > R(box).left - 6) fails.push(`"${w}" runs into its box`);
              ns.push(nn); printed.push(['count', w]); });
            { const l1 = cells.filter((c) => c.dataset.lcsN === '1').map((c) => c.dataset.lcsCount.length), l2 = cells.filter((c) => c.dataset.lcsN === '2').map((c) => c.dataset.lcsCount.length);
              if (l1.length && l2.length && Math.max(...l1) < Math.min(...l2)) fails.push('every one-syllable word is shorter than every two-syllable word: the count can be done by length'); }
            cells.forEach((c) => { const w = c.dataset.lcsCount; if (LEND.test(w) || (INFO.two[w] && INFO.two[w].lPart)) fails.push(`"${w}" has a long vowel before l (two beats to many children)`); });
            const twos = ns.filter((x) => x === 2).length;
            if (twos < d.twoN[0] || twos > d.twoN[1]) fails.push(`${twos} two-syllable words, not ${d.twoN.join(' to ')}`);
            // the numbers in the printed grid (three columns): no column one number, not every row alike, no long run
            const rows = []; for (let i = 0; i < ns.length; i += 3) rows.push(ns.slice(i, i + 3).join(''));
            if ([0, 1, 2].some((c2) => new Set(rows.map((r) => r[c2])).size < 2)) fails.push('a column of the grid holds one number only');
            if (rows.every((r) => r === rows[0])) fails.push('every row of the grid has the same numbers');
            if (/(1111|2222|121212|212121)/.test(ns.join(''))) fails.push('the numbers follow a pattern in reading order');
            const colsX = new Set(cells.map((c) => Math.round(R(c).left))); if (colsX.size !== 3) fails.push('the words to count do not stand in three columns');
          }
          if (kind === 'match') {
            const mw = [...b.querySelectorAll('[data-lcs-mword]')], mp = [...b.querySelectorAll('[data-lcs-mpic]')];
            const real = mw.filter((e) => !e.dataset.lcsDecoy), dec = mw.filter((e) => e.dataset.lcsDecoy);
            if (mw.length !== n + 2 || real.length !== n || dec.length !== 2 || mp.length !== n) fails.push(`not ${n + 2} words for ${n} pictures, two of them without a picture`);
            const picWords = mp.map((e) => e.dataset.lcsMpic);
            const offs = [];
            real.forEach((e) => { const w = txt(e), pc = mp.find((p) => p.dataset.lcsMpic === w);
              if (!pc || !pc.querySelector('img') || pc.querySelector('img').dataset.lcsPic !== w || !INFO.pics.includes(w)) fails.push(`"${w}" has no picture of its own`);
              if (!(INFO.match[lv] || []).includes(w) || say.includes(w)) fails.push(`the pictured word "${w}" is no picture of level ${lv}`);
              if (pc) { const o = (R(pc).top + R(pc).height / 2) - (R(e).top + R(e).height / 2); offs.push(o); if (Math.abs(o) < 18) fails.push(`"${w}" stands straight across from its picture`); }
              printed.push(['match', w]); });
            if (offs.length > 1 && new Set(offs.map((o) => Math.round(o / 10))).size < 2) fails.push('every picture stands the same distance from its word');
            { const wo = real.map(txt), rots = (x) => x.map((_, q) => x.slice(q).concat(x.slice(0, q)).join());
              if (wo.length > 1 && [...rots(wo), ...rots(wo.slice().reverse())].includes(picWords.join())) fails.push('the pictures stand in the order of their words, its reverse or a rotation of it'); }
            const po = picWords.filter((w) => INFO.printOnly.includes(w));
            if (po.length > 1) fails.push(`${po.length} pictures a child may name with another word (${po.join(', ')}): one at most`);
            if (new Set(picWords.map((w) => INFO.kinds[w])).size < picWords.length) fails.push('two pictures of one kind stand on the page');
            const di = mw.map((e, i) => (e.dataset.lcsDecoy ? i : -1)).filter((i) => i >= 0);
            if (di.length === 2 && Math.abs(di[0] - di[1]) === 1) fails.push('the two words without a picture stand next to each other');
            if (dec.filter((e) => e.dataset.lcsDk === 'short').length !== 1 || dec.filter((e) => e.dataset.lcsDk === 'two').length !== 1) fails.push('the two words without a picture are not one short word and one two-syllable word');
            { const col = mw.map(txt), unp = picWords.filter((w) => !col.some((o) => o !== w && o[0] === w[0])).length;
              if (unp > INFO.minUnpaired[lv]) fails.push(`${unp} pictured words have a first letter no other word of the column shares (the bank allows ${INFO.minUnpaired[lv]})`); }
            dec.forEach((e) => { const w = txt(e), of = e.dataset.lcsDecoy;
              if (e.dataset.lcsDk === 'two') { if (!picWords.includes(of) || !(INFO.decoys2[of] || []).includes(w) || !INFO.two[w] || w[0] !== of[0]) fails.push(`"${w}" is no two-syllable word that shares its first letters with the pictured "${of}"`); }
              else if (!picWords.includes(of) || !(INFO.decoys[of] || []).includes(w) || !of.startsWith(w) || w.length >= of.length) fails.push(`"${w}" is not a one-syllable word the pictured "${of}" starts with`);
              if (picWords.includes(w)) fails.push(`"${w}" names a picture of the page`);
              printed.push(['match', w]); });
            const kl = b.querySelectorAll('[data-lcs-keyline]').length; if (kl !== (isKey ? n : 0)) fails.push(`${kl} lines are drawn`);
            b.querySelectorAll('[data-lcs-mword]').forEach((e) => { if (fs(e) < 24) fails.push('a word to match is smaller than 24 px'); });
          }
          if (kind === 'sort' || kind === 'sortc') {
            const bank = [...b.querySelectorAll('[data-lcs-bankword]')].map((e) => ({ w: e.dataset.lcsBankword, col: +e.dataset.lcsCol })), cols = [...b.querySelectorAll('[data-lcs-column]')];
            const per = n / 2, heads = INFO.heads[kind];
            if (bank.length !== n || [0, 1].some((c) => bank.filter((x) => x.col === c).length !== per) || cols.length !== 2 || cols.some((c) => c.querySelectorAll('[data-lcs-line]').length !== per)) fails.push(`the sort is not ${per} words of each kind and a column of ${per} rows for each`);
            cols.forEach((c, i) => { const h = c.querySelector('[data-lcs-colhead]'); if (!h || txt(h) !== heads[i]) fails.push(`the head of column ${i + 1} is not "${heads[i]}"`); });
            bank.forEach((x) => {
              const t2 = INFO.two[x.w], k = oneKind(x.w);
              if (kind === 'sort') {
                const right = x.col === 0 ? !!k && !t2 : !!t2;
                const okLv = lv === 3 ? true : (x.col === 0 ? k === 'short' : t2 && !t2.long && (lv === 1 ? t2.kind === 'compound' : ['double', 'vccv'].includes(t2.kind)));
                if (!right || !okLv) fails.push(`"${x.w}" is no ${x.col === 0 ? 'one' : 'two'}-syllable word of level ${lv}`);
              } else {
                const right = x.col === 0 ? t2 && t2.kind === 'compound' && t2.meaning : t2 && ['double', 'vccv'].includes(t2.kind) && !t2.twoWords;
                if (!right) fails.push(`"${x.w}" is not ${x.col === 0 ? 'a compound word whose two parts keep their meaning' : 'a word that is not a compound and has no two small words in it'}`);
              }
              if (say.includes(x.w)) fails.push(`"${x.w}" is an example of the instruction`);
              printed.push(['sort', x.w]);
            });
            if (kind === 'sort' && lv === 3) { const lo = bank.filter((x) => x.col === 0 && oneKind(x.w) === 'long').length, lt = bank.filter((x) => x.col === 1 && INFO.two[x.w] && INFO.two[x.w].long).length;
              if (lo < 2 || lt < 1) fails.push('level 3 does not sort one-syllable words with two vowel letters and a long-vowel compound'); }
            if (bank.some((x, i) => i >= 2 && x.col === bank[i - 1].col && x.col === bank[i - 2].col)) fails.push('three words of one column stand in a row in the sort');
            if (isKey) { cols.forEach((c, ci) => [...c.querySelectorAll('[data-lcs-line]')].forEach((l) => { if (!bank.some((x) => x.w === l.dataset.lcsAnswer && x.col === ci)) fails.push('the key sorts a word into the wrong column'); })); if (!b.querySelector('[data-lcs-anyorder]')) fails.push('the key does not say the sort may be written in any order'); }
            else if (lines.some((l) => b.contains(l) && l.dataset.lcsAnswer)) fails.push('a sort row is filled on the page of the child');
            if (!/Cross out each word/.test(txt(b.querySelector('[data-lcs-label]')))) fails.push('the sort does not tell the child to cross out each word');
            if (kind === 'sort' && !txt(b.querySelector('[data-lcs-label]')).includes('Count the vowel sounds.')) fails.push('the sort line does not say to count the vowel sounds');
            if (kind === 'sort') { const l1 = bank.filter((x) => x.col === 0).map((x) => x.w.length), l2 = bank.filter((x) => x.col === 1).map((x) => x.w.length);
              if (l1.length && l2.length && Math.max(...l1) < Math.min(...l2)) fails.push('every one-syllable word is shorter than every two-syllable word: the sort can be done by length');
              bank.forEach((x) => { if (LEND.test(x.w) || (INFO.two[x.w] && INFO.two[x.w].lPart)) fails.push(`"${x.w}" has a long vowel before l (two beats to many children)`); if (lv === 3 && INFO.two[x.w] && INFO.two[x.w].quiet) fails.push(`"${x.w}" has a second syllable with no vowel a child can hear (level 3)`); });
              const st = bank.map((x) => x.w.replace(/s$/, '')); if (new Set(st).size !== st.length) fails.push('a word and its plural stand in one sort'); }
          }
          if (kind === 'circle') {
            const ss = [...b.querySelectorAll('[data-lcs-circle]')];
            if (ss.length !== n) fails.push(`${ss.length} sentences, not ${n}`);
            const at = [], lastAt = [];
            ss.forEach((e) => { const t = e.dataset.lcsText, w = e.dataset.lcsCircle, toksE = [...e.querySelectorAll('[data-lcs-tok]')], ok = toksE.filter((x) => x.dataset.lcsOk);
              if (INFO.sentences[lv][t] !== w || txt(e).replace(/\s+/g, '') !== t.replace(/\s+/g, '')) { fails.push(`"${t}" is not a sentence of level ${lv} printed as the bank has it`); return; }
              if (ok.length !== 1 || ok[0].dataset.lcsTok !== w) fails.push(`"${t}" does not mark its two-syllable word`);
              const x = two(w);
              if (!x || (lv === 1 && (x.kind !== 'compound' || x.long)) || (lv === 2 && !['double', 'vccv'].includes(x.kind))) fails.push(`"${w}" is no two-syllable word of level ${lv}`);
              toksE.forEach((tk) => { const v = tk.dataset.lcsTok; if (tk === ok[0]) return; if (two(v) || INFO.names.two.some((nm) => nm.toLowerCase() === v)) fails.push(`"${v}" in "${t}" has two syllables too`);
                if (lv < 3 && (v.match(/[aeiou]/g) || []).length !== 1 && v !== 'i' && v !== 'a') fails.push(`"${v}" in "${t}" has more vowel letters than vowel sounds (level ${lv})`); });
              toksE.forEach((tk) => { const ringed = cs(tk).borderTopColor === TEAL; if (isKey ? ringed !== !!tk.dataset.lcsOk : ringed) fails.push('a word is ringed on the page of the child, or the key rings the wrong word'); });
              at.push(toksE.indexOf(ok[0])); lastAt.push(toksE.length - 1);
              printed.push(['circle', w]); toks(t).filter((v) => v !== w).forEach((v) => printed.push(['text', v])); });
            checkPlaces(at, 'word of the sentences');
            { const cat = at.map((x, i) => (x === 0 ? 'F' : x === lastAt[i] ? 'L' : 'M'));
              if (cat.some((x, i) => i >= 2 && x === cat[i - 1] && x === cat[i - 2])) fails.push('the word to circle stands three times in a row at one place (first, middle, or last)');
              for (let i = 3; i < cat.length; i++) if (cat[i] === cat[i - 2] && cat[i - 1] === cat[i - 3] && cat[i] !== cat[i - 1]) { fails.push('the place of the word to circle alternates'); break; } }
            { const ov = ss.filter((e) => { const w = e.dataset.lcsCircle; return toks(e.dataset.lcsText).some((v) => v !== w && v.length >= w.length); }).length;
              if (ov < 2 || ss.length - ov > Math.floor(ss.length / 2)) fails.push(`the word to circle is the longest word of ${ss.length - ov} of ${ss.length} sentences: the task can be done by length`); }
            ss.forEach((e) => { const w = e.dataset.lcsCircle, x = two(w); if (lv === 3 && x && x.quiet) fails.push(`"${w}" has a second syllable with no vowel a child can hear (level 3)`); if (x && x.lPart) fails.push(`"${w}" has a part with a long vowel before l`);
              toks(e.dataset.lcsText).forEach((v) => { if (LEND.test(v)) fails.push(`"${v}" has a long vowel before l (two beats to many children)`); });
              // every word's ring (drawn on the key, transparent on the child's page) ends before the letters of the next word
              const all = [...e.querySelectorAll('[data-lcs-tok]')];
              for (let i = 1; i < all.length; i++) if (R(all[i - 1]).right > R(all[i]).left + CFG.RING - 0.5 || R(all[i]).left < R(all[i - 1]).right - CFG.RING + 0.5) { fails.push(`the circle around a word of "${e.dataset.lcsText}" touches the next word`); break; }
              // the ring's room is taken back: from the last letter of a word to the first of the next is exactly what
              // stands between them (a space, a comma), as in plain text
              for (let i = 1; i < all.length; i++) { const a = all[i - 1], c = all[i], ca = cs(a), cc = cs(c); let w = 0;
                for (let x = a.nextElementSibling; x && x !== c; x = x.nextElementSibling) w += R(x).width;
                const end = R(a).right - parseFloat(ca.borderRightWidth) - parseFloat(ca.paddingRight), start = R(c).left + parseFloat(cc.borderLeftWidth) + parseFloat(cc.paddingLeft);
                if (Math.abs(start - end - w) > 1) { fails.push(`the words of "${e.dataset.lcsText}" do not stand as in plain text`); break; } } });
            if (at.length > 1 && at.every((x, i) => x === lastAt[i])) fails.push('the two-syllable word is the last word of every sentence');
            // a sentence on one line; the period tight after the last word (the ring's room is not a space)
            ss.forEach((e) => { const lh = parseFloat(cs(e).lineHeight); if (R(e).height > lh * 1.6) fails.push(`"${e.dataset.lcsText}" runs to two lines`);
              const pt = e.querySelector('[data-lcs-ptail]'), prev = pt && pt.previousElementSibling;
              if (!pt || !prev || !prev.dataset.lcsTok || Math.abs(R(pt).left - (R(prev).right - CFG.RING)) > 1.5) fails.push(`the period of "${e.dataset.lcsText}" does not stand tight after its last word`); });
          }
          if (kind === 'split') {
            const cells = [...b.querySelectorAll('[data-lcs-split]')];
            if (cells.length !== n || new Set(cells.map((c) => c.dataset.lcsSplit)).size !== n) fails.push(`not ${n} different words to split`);
            const kindsOn = cells.map((c) => c.dataset.lcsKind);
            const allowed = { 1: ['compound'], 2: ['compound', 'double'], 3: ['compound', 'double', 'vccv'] }[lv];
            cells.forEach((c) => { const w = c.dataset.lcsSplit, x = INFO.two[w];
              if (!x || !allowed.includes(x.kind) || x.kind !== c.dataset.lcsKind || x.oddParts || say.includes(w)) { fails.push(`"${w}" is no word of level ${lv} (or a compound with a part that is no word a first grader knows), or an example`); return; }
              if (+c.dataset.lcsAt !== x.parts[0].length) fails.push(`"${w}" is not split where the bank splits it`);
              if (d.short && x.long) fails.push(`"${w}" has a long vowel: level 1 splits short-vowel compounds only`);
              wordCheck(c, w, { underline: false, at: x.parts[0].length });
              if (fs(c.querySelector('[data-lcs-word]')) < 28) fails.push('a word to split is smaller than 28 px');
              printed.push(['split', w]); });
            if (lv > 1 && allowed.some((kd) => kindsOn.filter((x) => x === kd).length < d.min)) fails.push(`fewer than ${d.min} words of each kind to split`);
            const ws = cells.map((c) => c.dataset.lcsSplit);
            if (ws.some((w) => INFO.two[w] && INFO.two[w].parts.some((p) => ws.includes(p)))) fails.push('a part of a word to split is another word of the page');
          }
          if (kind === 'draw') {
            const ds = [...b.querySelectorAll('[data-lcs-draw]')];
            if (ds.length !== n) fails.push(`${ds.length} compound words to draw, not ${n}`);
            const allParts = [];
            ds.forEach((e) => { const w = e.dataset.lcsDraw, x = INFO.two[w];
              if (!x || x.kind !== 'compound' || !x.meaning || !x.draw || e.dataset.lcsParts !== x.parts.join('|') || txt(e.querySelector('[data-lcs-drawword]')) !== w || say.includes(w)) { fails.push(`"${w}" is no compound word whose two parts can be drawn`); return; }
              const ps = [...e.querySelectorAll('[data-lcs-part]')];
              if (ps.length !== 2) fails.push(`"${w}" has not two parts to write and draw`);
              ps.forEach((p, i) => { const box = p.querySelector('[data-lcs-drawbox]'), l = p.querySelectorAll('[data-lcs-line]');
                if (!box || R(box).height < 100 || R(box).width < 120) fails.push('a box to draw in is smaller than 120 by 100 px');
                if (box && (isKey ? !box.querySelector('[data-lcs-keynote]') : txt(box))) fails.push('a box to draw in is not empty on the page of the child');
                if (l.length !== 1 || (isKey ? l[0].dataset.lcsAnswer !== x.parts[i] : l[0].dataset.lcsAnswer || l[0].dataset.lcsStartertext)) fails.push(`the row of "${x.parts[i]}" is not empty on the page of the child, or the key does not write it`); });
              if (d.short && x.long) fails.push(`"${w}" has a long vowel: level 1 draws short-vowel compounds only`);
              allParts.push(...x.parts); printed.push(['draw', w]); });
            if (new Set(allParts).size !== allParts.length) fails.push('the two compound words share a part');
            const sw = [...root.querySelectorAll('[data-lcs-split]')].map((c) => c.dataset.lcsSplit);
            if (sw.some((w) => INFO.two[w].parts.some((p) => allParts.includes(p)) || allParts.includes(w))) fails.push('a small word the child writes in task 2 is printed in task 1');
          }
          if (kind === 'heartbox') {
            const rows = [...b.querySelectorAll('[data-lcs-hrow]')], ws = rows.map((e) => e.dataset.lcsHrow);
            if (rows.length !== n || new Set(ws).size !== n) fails.push(`not ${n} different heart words`);
            const nTitle = INFO.heart.always.filter((w) => ws.includes(w)).length;
            if (d.title ? nTitle < d.title || nTitle > d.title + 1 : nTitle !== INFO.heart.always.length) fails.push(d.title ? `${nTitle} of said, was, of, could (${d.title} or ${d.title + 1} wanted)` : 'said, was, of, or could is missing');
            if (!d.noStarter && new Set(ws.map((w) => w[0])).size !== ws.length) fails.push('two heart words start with one letter on a level that prints first letters');
            if (txt(b.querySelector('[data-lcs-label]')).replace(/^\d+\.\s*/, '') !== INFO.lines.heartbox) fails.push('the line of the sound boxes is not the line of the page');
            rows.forEach((e) => { const w = e.dataset.lcsHrow, x = INFO.heart.words[w], boxes = [...e.querySelectorAll('[data-lcs-hbox]')], hearts = [...e.querySelectorAll('[data-lcs-heartmark]')];
              if (!x || txt(e.querySelector('[data-lcs-hw]')) !== w) { fails.push(`"${w}" is no heart word of the bank`); return; }
              if (boxes.map((q) => q.dataset.lcsHbox).join('|') !== x.boxes.join('|')) fails.push(`the boxes of "${w}" are not its sounds`);
              boxes.forEach((q) => { if (isKey ? txt(q) !== q.dataset.lcsHbox : txt(q)) fails.push(`a box of "${w}" is filled on the page of the child, or the key does not fill it`); if (R(q).height < 50 || R(q).width < 46) fails.push('a sound box smaller than 46 by 50 px'); });
              const hcols = hearts.map((h) => +h.closest('[data-lcs-hcol]').dataset.lcsHcol);
              if (isKey ? hcols.join() !== x.heart.join() : hearts.length) fails.push(`the heart of "${w}" is not over its tricky part on the key, or the page of the child shows it`);
              if (fs(e.querySelector('[data-lcs-hw]')) < 22) fails.push('a heart word is smaller than 22 px');
              printed.push(['heart', w]); });
          }
          if (kind === 'heartsent') {
            { const hl = txt(b.querySelector('[data-lcs-label]')).replace(/^\d+\.\s*/, ''); if (hl !== INFO.lines.fold + ' ' + (d.noStarter ? INFO.lines.heartsent3 : INFO.lines.heartsent)) fails.push('the line of the sentences is not the line of this level (fold back first; level 3 prints no first letter)'); }
            const ss = [...b.querySelectorAll('[data-lcs-hsent]')], hw = [...root.querySelectorAll('[data-lcs-hrow]')].map((e) => e.dataset.lcsHrow);
            if (ss.length !== n) fails.push(`${ss.length} sentences, not ${n}`);
            ss.forEach((e) => { const w = e.dataset.lcsHsent, t = e.dataset.lcsText, l = e.querySelector('[data-lcs-blankgroup] [data-lcs-line]');
              const i = (INFO.heart.sentences[w] || []).indexOf(t);
              if (i < 0 || !hw.includes(w)) { fails.push(`the sentence "${t}" is no sentence of the bank for a heart word of the page`); return; }
              if ((INFO.heart.fits[w][i] || []).some((z) => hw.includes(z))) fails.push(`"${t}" also takes another heart word of the page`);
              const [a] = t.split('___'), start = !a.trim() || /[.!?]\s*$/.test(a), want = start ? w[0].toUpperCase() + w.slice(1) : w;
              if (!l || (isKey ? l.dataset.lcsAnswer !== want : (d.noStarter ? l.dataset.lcsStartertext !== undefined : l.dataset.lcsStartertext !== want[0]) || l.dataset.lcsAnswer)) fails.push(`the row of "${t}" does not ${d.noStarter ? 'stay empty (level 3)' : 'start with the first letter of its word (a capital at the start of a sentence)'}, or the key does not write it`);
              if (Object.keys(INFO.heart.words).some((x) => has(t.replace('___', ' '), x))) fails.push(`"${t}" prints a heart word`);
              const copy = e.cloneNode(true); copy.querySelectorAll('[data-lcs-blankgroup] [data-lcs-line]').forEach((x) => x.replaceWith('___')); if (copy.textContent.replace(/\s+/g, '') !== t.replace(/\s+/g, '')) fails.push(`"${t}" is not printed as the bank has it`);
              const lh = parseFloat(cs(e).lineHeight); if (R(e).height > CFG.ROW + lh * 1.2) fails.push(`"${t}" runs to two lines`); });
            const idx = ss.map((e) => hw.indexOf(e.dataset.lcsHsent));
            if (ss.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1))) fails.push('the sentences take the heart words in the order of the boxes');
            if (ss.filter((e) => INFO.heart.always.includes(e.dataset.lcsHsent)).length < Math.min(2, n)) fails.push('fewer than two sentences with said, was, of, or could');
          }
          if (kind === 'own') {
            const ls = [...b.querySelectorAll('[data-lcs-line]')];
            if (ls.length !== n || txt(b.querySelector('[data-lcs-label]')).replace(/^\d+\.\s*/, '') !== (countOf('heartsent') ? '' : INFO.lines.fold + ' ') + INFO.lines.own) fails.push(`the sentence of the child's own has not ${n} rows and its line (fold back, two heart words)`);
            if (ls.some((l, i) => (isKey && !i ? l.dataset.lcsAnswer !== 'Sentences will vary.' : l.dataset.lcsAnswer))) fails.push('a row of the child\'s own sentence is filled on the page of the child, or the key says nothing');
          }
        }
        // no two two-syllable words of a task share a part (laptop, desktop)
        for (const b of blocks) { const ps = [...b.querySelectorAll('[data-lcs-count], [data-lcs-split], [data-lcs-bankword]')].map((e) => e.dataset.lcsCount || e.dataset.lcsSplit || e.dataset.lcsBankword).map((w) => two(w)).filter(Boolean).flatMap((x) => x.parts);
          if (new Set(ps).size !== ps.length) fails.push(`two words of task ${blocks.indexOf(b) + 1} share a part`); }
        // G1-603: one fold line "Fold back" between tasks 1 and 2; no other page has one
        { const folds = [...root.querySelectorAll('[data-lcs-fold]')];
          if (mode === 'heart') { if (folds.length !== 1 || txt(folds[0]) !== 'Fold back' || !blocks[1] || R(folds[0]).top < R(blocks[0]).bottom - 0.5 || R(folds[0]).bottom > R(blocks[1]).top + 0.5) fails.push('no fold line "Fold back" between tasks 1 and 2'); }
          else if (folds.length) fails.push('a fold line on a page without one'); }
        // no word printed twice; an answer (a word to count, sort, split, circle, draw) printed nowhere else, not even as a
        // part of another word of the page; the examples of the instruction are never on the page
        { const items = printed.filter(([wh]) => wh !== 'text');
          const ws = items.map(([, w]) => w), st = ws.map((w) => w.replace(/s$/, ''));
          if (new Set(ws).size !== ws.length || new Set(st).size !== st.length) fails.push('a word stands twice on the page (or with its plural)');
          const all = new Set(items.map(([, w]) => w));
          items.forEach(([wh, w]) => { if (wh !== 'circle' && printed.some(([w2, x]) => w2 === 'text' && (x === w || x.replace(/s$/, '') === w))) fails.push(`the ${wh} word "${w}" is also printed in a sentence`); });
          if (mode !== 'heart') items.forEach(([wh, w]) => { const x = two(w); if (x && x.parts.some((p) => all.has(p) && !(wh === 'match' && items.some(([w3, d3]) => w3 === 'match' && d3 === p)))) fails.push(`a part of "${w}" is printed as a word of the page`); });
          say.forEach((w) => { if (ws.includes(w) || printed.some(([, x]) => x.replace(/s$/, '') === w)) fails.push(`the example "${w}" of the instruction is printed on the page`); }); }
        return fails;
      }, LEVELS, INFO, { ROW, RING, BAND });
    },
  };
}

module.exports = { makeSyllG1Type, syllFaultsOf, drawPage, LEVELS, INSTR, LINES, HEADS, oneSyl };
