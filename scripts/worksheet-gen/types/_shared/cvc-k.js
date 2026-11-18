/**
 * cvc-k.js — four Kindergarten phonics pages on short vowels and CVC words (English literacy year, Daily Teaching System
 * Part 12.3, 2026-11-17; the unit "Short Vowels and CVC Words" of Kindergarten). The words and pictures are
 * data/literacy/cvc-k.en.json. THE TEACHER READS the instructions; a child reads only regular consonant-vowel-consonant
 * words of the bank (no blend, no digraph, no silent letter, no sight word), and answers by drawing a line, circling a
 * word, writing one letter in a 72 px box or more, or writing a short word on a Kindergarten row (128 px).
 *
 * A US Kindergarten teacher's review was applied 2026-11-17: no line for the teacher on a page where the child could use it
 * (the pages ship without a key), only pictures a child names with exactly that word where the picture decides, no gap
 * that can build a word of the never list, no ladder word that begins and ends with one consonant.
 *
 *   vowel   Short a and Short i (K-661) · Short o, Short u, and Short e (K-662) (RF.K.3.b: the short sounds of the
 *           five vowels). Every level: 1. six printed words and four pictures: the child reads each word and draws a line
 *           to its picture; two words have no picture, each differs from a pictured word in the vowel only (bag / big),
 *           and the four pictures are chosen so that first letters come in pairs (cat, cap; bag, bat) where the library
 *           allows: the match cannot be done by first letters. No word stands straight across from its picture, the
 *           pictures do not all stand one distance away and never in the order of their words, its reverse or a rotation
 *           of it; the two words without a picture are not neighbours and never first or last. The pictures are pictures a
 *           child names with that word, one print-only picture at most (its word is among the six). No line for the
 *           teacher. 2. a second task:
 *             level 1  one vowel (K-661: short a; K-662: short o or short u, a copy draws one; short e has two named
 *                      pictures, too few for a match of one vowel): a worked word in grey (sat, top, cut), then six words
 *                      with a 72 px box for the vowel: "Write a in each word. Read your new words to a partner." No word
 *                      with a gap makes a word of the never list with any vowel (h_g: hag).
 *             level 2  two vowels (K-661: a and i; K-662: two of o, u, e): two pictures of each in task 1; then four
 *                      printed words (two of each vowel, mixed) to read out loud and write in two columns headed by the
 *                      vowels ("Write it under a or i."; Kindergarten rows of 128 px; "Cross out each word when you write
 *                      it"; the key: any order)
 *             level 3  all the vowels of the lesson: three pictures to write the word for, on a Kindergarten row that
 *                      starts with the word's first letter (K-662: one o, one u, one e word; K-661: two a words and pig,
 *                      the one short-i picture of the library a kindergartner names with its word; there the match always
 *                      holds one print-only picture, can, cap, ham, jam, van or lip, so that copies differ)
 *           K-661 prints only a and i words (the lesson before o, u, e); K-662 prints words of all five vowels. No word a
 *           child writes in task 2 is printed in task 1; pet is never printed (it names any pictured animal).
 *   chain   Change One Sound to Make a New Word (K-663, RF.K.2.e): a ladder of six words; the top word is printed with
 *           its picture, the teacher says each change (the steps to say stand at the foot of the page: they are the
 *           dictation, "2 change /k/ to /h/"; a step INTO /k/ names its letter: "change /b/ to /k/ (spelled c)"), and the
 *           child writes each new word on the next step in three 80 px letter boxes. Every word is a regular CVC word of
 *           the bank (no x: two sounds; no word that begins and ends with one consonant, dad, mom, pop: the step would not
 *           say which sound), each step changes ONE letter (never c to k: one sound; never e and i before n or m: pin and
 *           pen sound alike in many US homes; never the vowel of a word that ends in g: bag and beg, dog and dug sound
 *           alike in some homes), no word comes twice.
 *             level 1  only the first sound changes (one word family); the last two letters stand in light grey to trace
 *                      and the child writes the first letter
 *             level 2  the first or the last sound (each two times or more; never three in a row in one place, never every
 *                      other one); the child writes the whole word
 *             level 3  the first, last, or middle sound (each at least once, the middle at most twice; no three in a row,
 *                      no repeating cycle, never first-middle-last as a staircase); the whole word
 *   pair    Which Word Matches: cat or cot? (K-664, RF.K.3.d): ten pictures on level 1, eight on levels 2 and 3 (thirteen
 *           named pictures have a second word there), in two columns, each with two printed
 *           words, stacked, that differ in one letter; the child circles the word for the picture and underlines the
 *           letter that is different in it (the key rings the word and lines the letter). Only pictures a kindergartner
 *           names with exactly that word; no line for the teacher.
 *             level 1  the first letter differs (cat, bat)
 *             level 2  the last letter (cat, cap)
 *             level 3  the middle vowel (cat, cut); never e and i before n or m (pen / pin)
 *           The second word is a real word of the bank and names no picture of the page; no word stands twice on a page.
 *           The right word stands on top or below in no pattern: each place at most 60 % of the pictures, never three in a row,
 *           never every other one, and in the printed grid no column alternating all the way down and not every row mixed.
 *
 * Every picture of the bank was looked at; pictures a kindergartner names with another word (cap = hat, jug = pitcher,
 * hen = chicken, mop = broom, net = racket) are print-only: one at most stands beside its printed word in a match, or beside
 * the printed top word of a ladder; they are never written or chosen from the picture alone. Two pictures of one kind never
 * share a page (cap and hat; cup, mug and jug).
 * The page turns the font's joined letters off (fi, fl, ff). English only. Themeless: a copy draws other words. PDF only.
 * The bank is checked when this file loads (faultsOf), with trial draws of every level; no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/cvc-k.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line } = _parts;

const VOWELS = ['a', 'i', 'o', 'u', 'e'];
/** a regular CVC word: a single consonant, a vowel, a single consonant that keeps the vowel short (no r, w, y at the end) */
const CVC = /^[bcdfghjklmnprstvwyz][aeiou][bdfgklmnpstxz]$/;
/** the words that end in an s that says /s/ (has, his, is: /z/, never in the bank) */
const S_FINAL = new Set(['bus', 'gas', 'yes']);
/** the sounds the teacher says for a letter (short vowels with their breve) */
const SOUND = { a: '/ă/', e: '/ĕ/', i: '/ĭ/', o: '/ŏ/', u: '/ŭ/', c: '/k/' };
const soundOf = (ch) => SOUND[ch] || `/${ch}/`;
const PLACE = ['first', 'middle', 'last'];

const diffAt = (a, b) => [0, 1, 2].filter((k) => a[k] !== b[k]);
/** e and i before n or m: pin and pen, him and hem sound alike in many US homes (the pin-pen merger): never a contrast */
const isEinm = (a, b) => diffAt(a, b).join() === '1' && [a[1], b[1]].sort().join('') === 'ei' && /^[nm]$/.test(a[2]);
/** c and k: one sound (a step from one to the other changes no sound) */
const sameSound = (a, b) => { const d = diffAt(a, b); return d.length === 1 && [a[d[0]], b[d[0]]].sort().join('') === 'ck'; };

/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(b) {
  const f = [];
  const words = b.words || {}, pics = b.pics || {}, banned = new Set(b.banned || []), write = b.write || [], apart = b.apart || [];
  const list = new Map();
  for (const v of VOWELS) {
    const ws = words[v] || [];
    if (ws.length < 18) f.push(`words: fewer than eighteen short-${v} words`);
    for (const w of ws) {
      if (!CVC.test(w) || w[1] !== v) f.push(`words: "${w}" is no regular CVC word with short ${v}`);
      if (/s$/.test(w) && !S_FINAL.has(w)) f.push(`words: "${w}" ends in an s that may say /z/`);
      if (banned.has(w)) f.push(`words: "${w}" is a banned word`);
      if (list.has(w)) f.push(`words: "${w}" stands twice`);
      list.set(w, v);
    }
  }
  if (banned.size < 10) f.push('no list of banned words');
  // a gap never builds a word of the never list with any of the five vowels (h_g: hag, f_t: fat): such a word stands in
  // noGap, and so does nothing else
  const noGap = new Set(b.noGap || []);
  for (const w of list.keys()) {
    const risky = VOWELS.some((v) => banned.has(w[0] + v + w[2]));
    if (risky && !noGap.has(w)) f.push(`noGap: "${w}" makes a word of the never list with another vowel and is not kept from the gaps`);
  }
  for (const w of noGap) if (!list.has(w)) f.push(`noGap: "${w}" is in no word list`);
  // the grey example of each vowel: a word of that vowel, no risky fill, no a before n or m, no picture, printed
  const noPrint = new Set(b.noPrint || []);
  for (const v of VOWELS) {
    const w = (b.worked || {})[v];
    if (!w || list.get(w) !== v || noGap.has(w) || noPrint.has(w) || pics[w] || /^.a[nm]$/.test(w)) f.push(`worked: no grey example for short ${v} that is a safe word without a picture (and no a before n or m)`);
  }
  for (const w of noPrint) if (!list.has(w)) f.push(`noPrint: "${w}" is in no word list`);
  const animals = b.animals || [];
  if (!animals.length || animals.some((w) => !pics[w])) f.push('animals: not the pictured animals');
  for (const [w, p] of Object.entries(pics)) {
    if (!Array.isArray(p) || p.length !== 2 || !p.every((x) => typeof x === 'string' && x) || /bw( \d+)?$/i.test(p[0])) f.push(`picture of ${w}: not a colour theme and a noun`);
    if (!list.has(w)) f.push(`picture of ${w}: the word is in no word list`);
  }
  for (const w of write) if (!pics[w]) f.push(`write: "${w}" has no picture`);
  if (new Set(write).size !== write.length) f.push('write: a word stands twice');
  for (const pr of apart) if (!Array.isArray(pr) || pr.length !== 2 || pr.some((w) => !pics[w])) f.push('apart: not two pictured words');
  // enough pictures for every page: four of one vowel (level 1), a written word of every vowel (level 3)
  const pv = (v) => Object.keys(pics).filter((w) => list.get(w) === v);
  for (const v of ['a', 'o', 'u', 'e']) if (pv(v).length < 5) f.push(`pictures: fewer than five short-${v} pictures`);
  if (pv('i').length < 2) f.push('pictures: fewer than two short-i pictures');
  for (const v of VOWELS) if (!write.some((w) => list.get(w) === v)) f.push(`write: no short-${v} picture a kindergartner names with its word`);
  if (write.filter((w) => list.get(w) === 'a').length < 4) f.push('write: fewer than four short-a pictures to write');
  if (f.length) return f;
  // every level of every page can be drawn: trial draws with fixed seeds
  const B = { list, pics, write: new Set(write), banned, apart, noGap, noPrint, worked: b.worked };
  for (const cfg of [SETS.ai, SETS.oue]) for (const lv of [1, 2, 3]) for (let s = 1; s <= 12; s++) {
    try { drawVowel(B, cfg, lv, LEVELS.vowel[lv], seedRng(s * 7 + lv)); } catch (e) { f.push(`vowel ${cfg.set.join('')} level ${lv}: ${e.message}`); break; }
  }
  for (const lv of [1, 2, 3]) for (let s = 1; s <= 12; s++) {
    try { drawChain(B, lv, seedRng(s * 11 + lv)); } catch (e) { f.push(`chain level ${lv}: ${e.message}`); break; }
    try { drawPairs(B, lv, seedRng(s * 13 + lv)); } catch (e) { f.push(`pair level ${lv}: ${e.message}`); break; }
  }
  return f;
}
/** a small seeded generator for the trial draws (the pages use ctx.rng) */
function seedRng(seed) { let x = seed >>> 0 || 1; const next = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; return { int: (a, b) => a + Math.floor(next() * (b - a + 1)) }; }

// one: the vowels a level-1 copy may practise alone (short e has two named pictures, too few for a match of one vowel)
const SETS = { ai: { set: ['a', 'i'], known: ['a', 'i'], one: ['a'] }, oue: { set: ['o', 'u', 'e'], known: VOWELS, one: ['o', 'u'] } };
const LEVELS = {
  vowel: {
    1: { match: 4, extras: 2, gaps: 6, Hw: 56, G: 8, mfont: 36, mpic: 80, gfont: 46, box: 72, pad: 8 },
    2: { match: 4, extras: 2, sort: 2, Hw: 50, G: 8, mfont: 34, mpic: 74, rowH: 128, chip: 30, pad: 8 },
    3: { match: 4, extras: 2, write: 3, Hw: 62, G: 8, mfont: 40, mpic: 90, rowH: 128, wpic: 104, pad: 8 },
  },
  chain: { 1: { places: 'F', trace: true, box: 80, font: 56, pic: 84 }, 2: { places: 'FL', box: 80, font: 56, pic: 84 }, 3: { places: 'FML', box: 80, font: 56, pic: 84 } },
  // levels 2 and 3 hold eight pictures: thirteen named pictures have a second word there, and ten of thirteen would make
  // every two copies share seven pictures
  pair: { 1: { pos: 0, n: 10, pic: 96, font: 38 }, 2: { pos: 2, n: 8, pic: 104, font: 40 }, 3: { pos: 1, n: 8, pic: 104, font: 40 } },
};

/* ---------------------------------------------------------------- the draws (pure: the bank check runs them too) ---------------------------------------------------------------- */
const isApartB = (B, a, b) => B.apart.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
/** the words of the lists that differ from w in ONE letter, at place p (0 first, 1 middle, 2 last), with a vowel of `vowels` */
function others(B, w, p, vowels) {
  return [...B.list.keys()].filter((x) => x !== w && diffAt(w, x).join() === String(p) && vowels.includes(x[1]) && !isEinm(w, x) && !sameSound(w, x) && !B.banned.has(x) && !B.noPrint.has(x) && !isApartB(B, w, x));
}
/** the pictures of a match that a child might name with another word (print-only): one at most on a page */
const printOnly = (B, pick) => pick.filter((w) => !B.write.has(w)).length;
/** the pictured words of a match that share their first letter with another word of the column (a pictured word or a
 *  word without a picture): those cannot be matched by their first letter */
const twinsOf = (pick, ex) => { const col = [...pick, ...ex]; return pick.filter((w) => col.some((y) => y !== w && y[0] === w[0])).length; };
/** the four pictures a level may show: one print-only picture at most, two of each vowel (level 2), two vowels or more
 *  (level 3), one short-i picture at most on level 3 of short a and short i (the library has two: pig, always written
 *  there, and lip) */
const pickOk = (B, set, lv, vs, pick, writes) => {
  const vow = (w) => B.list.get(w);
  if (pick.length !== 4 || new Set(pick).size !== 4 || pick.some((w, i) => pick.some((y, j) => j > i && isApartB(B, w, y)))) return false;
  if (printOnly(B, pick) > 1) return false;
  if (lv === 2 && vs.some((v) => pick.filter((w) => vow(w) === v).length !== 2)) return false;
  if (lv === 3 && (new Set([...pick, ...writes].map(vow)).size < vs.length || (set.length === 3 && new Set(pick.map(vow)).size < 2))) return false;
  if (lv === 3 && set.length === 2 && pick.filter((w) => vow(w) === 'i').length > 1) return false;
  return true;
};
const subsets = (list, k) => { const out = []; const go = (i, acc) => { if (acc.length === k) { out.push(acc.slice()); return; } for (let j = i; j < list.length; j++) { acc.push(list[j]); go(j + 1, acc); acc.pop(); } }; go(0, []); return out; };
/** how many pictured words of a match must have a first-letter twin: as many as the library allows for these vowels, up to
 *  three of the four (short o and short e have no two pictures with one first letter: there only the two words with a
 *  word-without-picture partner can have one). Computed once per page kind from the bank. */
const TWIN_NEED = new Map();
function twinNeed(B, cfg, lv, vs) {
  const k = cfg.set.join('') + '|' + lv + '|' + vs.join('');
  if (TWIN_NEED.has(k)) return TWIN_NEED.get(k);
  const pool = Object.keys(B.pics).filter((w) => vs.includes(B.list.get(w)));
  let most = 0;
  for (const pick of subsets(pool, 4)) {
    if (!pickOk(B, cfg.set, lv, vs, pick, lv === 3 ? [...B.write].filter((w) => vs.includes(B.list.get(w)) && !pick.includes(w)) : [])) continue;
    // a word without a picture has the first letter of its partner (it differs in the vowel only)
    for (const two of subsets(pick.filter((w) => others(B, w, 1, cfg.known).some((x) => !pick.includes(x))), 2)) most = Math.max(most, twinsOf(pick, two.map((w) => w[0] + '-')));
  }
  // level 3 of short a and short i: the match holds lip or no short-i picture (pig is written); three twins would put lap
  // (lip's partner) on every copy, so two twins there (the two partners)
  TWIN_NEED.set(k, Math.min(lv === 3 && cfg.set.length === 2 ? 2 : 3, most));
  return TWIN_NEED.get(k);
}

/** a page of the vowel mode: the vowels of the copy, the words to write (level 3), the four pictures and two words without a
 *  picture of task 1, then the gap words (level 1) or the words to sort (level 2) */
function drawVowel(B, cfg, lv, d, rng) {
  const set = cfg.set;
  const two = shuffle(set, rng).slice(0, 2);
  const vs = lv === 1 ? [shuffle(cfg.one, rng)[0]] : lv === 2 ? set.filter((v) => two.includes(v)) : set.slice();
  const vow = (w) => B.list.get(w);
  const need = twinNeed(B, cfg, lv, vs);
  // named pictures are preferred: half the copies hold named pictures only (where the library has four), the other half
  // may hold one print-only picture beside them (copies then differ). Level 3 of short a and short i writes two of the
  // seven named short-a pictures, and four more would leave every page with six of the seven: its match always holds
  // ONE print-only picture (can, cap, ham, jam, van or lip), never more
  const oneMust = lv === 3 && set.length === 2;
  const namedOnly = !oneMust && rng.int(0, 1) === 0;
  let writes = [], best = null;
  for (let attempt = 0; attempt < 60 && !best; attempt++) {
    // level 3: one word to write of each vowel that has a picture to write, then any
    writes = [];
    if (d.write) {
      const wp = (v) => shuffle([...B.write].filter((w) => vow(w) === v), rng);
      for (const v of vs) { const w = wp(v)[0]; if (w) writes.push(w); }
      for (const w of shuffle([...B.write].filter((x) => vs.includes(vow(x)) && !writes.includes(x)), rng)) if (writes.length < d.write) writes.push(w);
      writes = shuffle(writes.slice(0, d.write), rng);
      if (writes.length !== d.write) throw new Error('not enough pictures to write');
    }
    const pool = Object.keys(B.pics).filter((w) => vs.includes(vow(w)) && !writes.includes(w) && !writes.some((x) => isApartB(B, x, w)));
    for (let k = 0; k < 400 && !best; k++) {
      const pick = lv === 2 ? vs.flatMap((v) => shuffle(pool.filter((w) => vow(w) === v), rng).slice(0, 2)) : shuffle(pool, rng).slice(0, d.match);
      if (!pickOk(B, set, lv, vs, pick, writes)) continue;
      // on a copy of named pictures only, a print-only picture comes in only when 200 draws found no page without one
      if (namedOnly && k < 200 && printOnly(B, pick) > 0) continue;
      if (oneMust && printOnly(B, pick) !== 1) continue;
      // two words without a picture: each differs from a pictured word in the vowel only, names no picture of the page and
      // is no word to write
      const page = new Set([...pick, ...writes]);
      const ex = [];
      for (const w of shuffle(pick, rng)) {
        if (ex.length === d.extras) break;
        const x = shuffle(others(B, w, 1, cfg.known).filter((y) => !page.has(y) && !ex.some((e) => e.w === y)), rng)[0];
        if (x) ex.push({ w: x, of: w });
      }
      if (ex.length !== d.extras) continue;
      // the match cannot be done by first letters, as far as the library allows (TWIN_NEED); the first draw that does it is
      // taken, so that copies differ
      if (twinsOf(pick, ex.map((e) => e.w)) < need) continue;
      best = { pick, ex };
    }
  }
  if (!best) throw new Error('no four pictures with two words that differ in the vowel');
  const { pick, ex } = best;
  const used = new Set([...pick, ...writes, ...ex.map((e) => e.w)]);
  let gaps = [], worked = null, sort = [];
  if (d.gaps) {
    // the grey example of the vowel (a safe word, never a before n or m); six words that build no word of the never list
    // with any vowel (noGap), print no word that names a pictured animal (noPrint), and stand nowhere else on the page
    worked = B.worked[vs[0]];
    if (used.has(worked)) throw new Error('the grey example is a word of the match');
    const g = shuffle([...B.list.keys()].filter((w) => vow(w) === vs[0] && w !== worked && !used.has(w) && !B.noGap.has(w) && !B.noPrint.has(w)), rng);
    if (g.length < d.gaps) throw new Error('not enough words for the gaps');
    gaps = g.slice(0, d.gaps);
  }
  if (d.sort) {
    // two words of each vowel, never printed sorted (two of one vowel, then two of the other)
    const sorted = (s) => s.length === 4 && s[0] === s[1] && s[2] === s[3];
    for (let k = 0; k < 200; k++) {
      sort = shuffle(vs.flatMap((v) => shuffle([...B.list.keys()].filter((w) => vow(w) === v && !used.has(w) && !B.noPrint.has(w)), rng).slice(0, d.sort)), rng);
      if (sort.length === 2 * d.sort && !sorted(sort.map(vow).join(''))) break;
    }
    if (sort.length !== 2 * d.sort || sorted(sort.map(vow).join(''))) throw new Error('no mixed words to sort');
  }
  return { vs, writes, pick, ex, gaps, worked, sort };
}

/** the place pattern of a ladder (F first, M middle, L last; five steps) */
function chainPatternOk(s, lv) {
  if (s.length !== 5) return false;
  if (lv === 1) return s === 'FFFFF';
  if (/(.)\1\1/.test(s)) return false;                                             // three in a row in one place
  const per = (k) => [...s].every((c, i) => i < k || c === s[i - k]);
  if (per(2) || per(3)) return false;                                              // every other one, a repeating cycle
  const n = (c) => s.split(c).length - 1;
  if (lv === 2) return /^[FL]+$/.test(s) && n('F') >= 2 && n('L') >= 2;
  if (/FML|LMF/.test(s)) return false;                                             // a staircase through the word
  return n('F') >= 1 && n('L') >= 1 && n('M') >= 1 && n('M') <= 2;
}
/** a ladder of six words: a pictured word of the lists at the top (no x), each step one letter at a place the level allows */
function drawChain(B, lv, rng) {
  // no x word (two sounds); no word that begins and ends with one consonant (dad, mom, pop: the step would not say which)
  const words = [...B.list.keys()].filter((w) => !/x/.test(w) && w[0] !== w[2]);
  const allowed = { 1: 'F', 2: 'FL', 3: 'FML' }[lv];
  const steps = (w) => words.filter((x) => { const dd = diffAt(w, x); return dd.length === 1 && allowed.includes('FML'[dd[0]]) && !isEinm(w, x) && !sameSound(w, x) && !(dd[0] === 1 && w[2] === 'g'); });
  const starts = shuffle(words.filter((w) => B.pics[w]), rng);
  let tries = 0;
  for (const s0 of starts) {
    const path = [s0];
    const go = () => {
      if (++tries > 20000) return false;
      if (path.length === 6) return chainPatternOk(path.slice(1).map((w, i) => 'FML'[diffAt(path[i], w)[0]]).join(''), lv);
      for (const x of shuffle(steps(path[path.length - 1]).filter((y) => !path.includes(y)), rng)) { path.push(x); if (go()) return true; path.pop(); }
      return false;
    };
    if (go()) return { words: path.slice(), places: path.slice(1).map((w, i) => diffAt(path[i], w)[0]) };
    if (tries > 20000) break;
  }
  throw new Error('no ladder of six words');
}

/** the pictures of a match stand in the order of their words (o: the pick index of each pictured word, top to bottom),
 *  in its reverse, or in a rotation of either: then a child can draw the lines by a rule, without reading */
function orderRule(o, perm) {
  const n = o.length, rots = (x) => x.map((_, k) => x.slice(k).concat(x.slice(0, k)).join());
  return [...rots(o), ...rots(o.slice().reverse())].includes(perm.join()) && n > 1;
}
/** the places (0 top, 1 below) of the right word in n items of a grid of two columns, read row by row: each place four
 *  to six times, never three in a row, never more than four alternating, and in the printed grid no column one place or
 *  alternating all the way down, not every row mixed, not every row alike */
function pairPlacesOk(p) {
  const s = p.join(''), n1 = s.split('1').length - 1, n0 = s.length - n1, most = Math.floor(0.6 * s.length);
  if (n0 > most || n1 > most || /000|111/.test(s) || /01010|10101/.test(s)) return false;
  const rows = []; for (let i = 0; i < p.length; i += 2) rows.push(s.slice(i, i + 2));
  const col = (c) => rows.map((r) => r[c]).join('');
  const alt = (x) => /^(01)+0?$|^(10)+1?$/.test(x), one = (x) => /^(0+|1+)$/.test(x);
  if (rows.every((r) => r[0] !== r[1]) || rows.every((r) => r === rows[0])) return false;
  return !alt(col(0)) && !alt(col(1)) && !one(col(0)) && !one(col(1));
}
/** ten pictures, each with a second word that differs at the level's place; every printed word different */
function drawPairs(B, lv, rng) {
  const d = LEVELS.pair[lv], pos = d.pos;
  // only pictures a kindergartner names with exactly that word (no teacher names them: the pages ship without a key)
  const pool = Object.keys(B.pics).filter((w) => B.write.has(w) && others(B, w, pos, VOWELS).length);
  for (let k = 0; k < 3000; k++) {
    const picks = [], used = new Set();
    for (const w of shuffle(pool, rng)) {
      if (picks.length === d.n) break;
      // a picture whose word is already printed (as a second word) never joins; a second word is printed once
      if (used.has(w) || picks.some((x) => isApartB(B, x.w, w))) continue;
      const alt = shuffle(others(B, w, pos, VOWELS).filter((x) => !used.has(x)), rng)[0];
      if (!alt) continue;
      picks.push({ w, alt }); used.add(w); used.add(alt);
    }
    if (picks.length !== d.n) continue;
    let at;
    for (let t = 0; t < 500; t++) { at = picks.map(() => rng.int(0, 1)); if (pairPlacesOk(at)) break; }
    if (!pairPlacesOk(at)) continue;
    return picks.map((x, i) => ({ ...x, top: at[i] === 0 }));
  }
  throw new Error('no ten pictures with a second word each');
}

{ const fb = faultsOf(BANK); if (fb.length) throw new Error('cvc-k.en.json: ' + fb.join('; ')); }
const BK = { list: new Map(VOWELS.flatMap((v) => (BANK.words[v] || []).map((w) => [w, v]))), pics: BANK.pics, write: new Set(BANK.write), banned: new Set(BANK.banned), apart: BANK.apart, noGap: new Set(BANK.noGap), noPrint: new Set(BANK.noPrint), worked: BANK.worked };
// the first-letter twins every kind of match page needs (verify() checks the printed column against them)
for (const [cfg, kinds] of [[SETS.ai, [[1, ['a']], [2, ['a', 'i']], [3, ['a', 'i']]]], [SETS.oue, [[1, ['o']], [1, ['u']], [1, ['e']], [2, ['o', 'u']], [2, ['o', 'e']], [2, ['u', 'e']], [3, ['o', 'u', 'e']]]]]) for (const [lv, vs] of kinds) twinNeed(BK, cfg, lv, vs);

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const img = (w, size, attr = 'data-lcs-pic') => `<img class="ws-icon" ${attr}="${esc(w)}" src="${fileUri(BANK.pics[w][0], BANK.pics[w][1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const label = (html, px = 19, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${html}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
const cream = (attrs, inner, pad = 8, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:6px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
/** a box for ONE letter (72 px or more); the key prints the letter in teal, a traced letter stands in light grey */
const letterBox = (attrs, size, text, color, font) => `<span ${attrs} style="flex:0 0 auto;box-sizing:border-box;width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:12px;background:#FFFFFF;font:800 ${font || Math.round(size * 0.66)}px/1 'Nunito',sans-serif;color:${color || T.teal}">${text}</span>`;
/** the words the teacher says (the pages ship without their key): a TEACHER STRIP at the foot of the page body, under a
 *  dashed cut line with a pair of scissors. The teacher cuts it off before copying the page: the steps name the new sound of
 *  every step ("change /k/ to /h/"), and that sound is the letter the child is to write (2026-11-18). */
const TSTRIP = 'Teacher strip: cut off before you copy the page.';
const SCISSORS = `<svg data-lcs-scissors width="24" height="22" viewBox="0 0 24 22" style="position:absolute;left:-26px;top:-12px;display:block"><circle cx="5" cy="5" r="3.6" fill="none" stroke="${T.inkSoft}" stroke-width="2.2"/><circle cx="5" cy="17" r="3.6" fill="none" stroke="${T.inkSoft}" stroke-width="2.2"/><path d="M8 7.5 L22 15 M8 14.5 L22 7" stroke="${T.inkSoft}" stroke-width="2.2" stroke-linecap="round"/></svg>`;
const teacherLine = (html) => `<div data-lcs-teacherline style="flex:0 0 auto;margin-top:5px;font:600 12.5px/1.25 'Nunito',sans-serif;color:${T.inkSoft}">` +
  `<div data-lcs-cutline style="position:relative;height:0;margin:8px 0 12px 28px;border-top:2.5px dashed currentColor">${SCISSORS}</div>` +
  `<div data-lcs-tstriphead style="font-weight:800">${TSTRIP}</div><div data-lcs-tsteps>${html}</div></div>`;
const sideHead = (v) => `<div data-lcs-colhead="${v}" style="flex:0 0 50px;display:flex;align-items:center;justify-content:center;border-radius:6px 0 0 6px;background:${T.tealSoft};border-right:4px solid ${T.teal};color:${T.teal};font:800 40px/1 'Nunito',sans-serif">${v}</div>`;
/** the teacher's steps of a ladder: "2 change /k/ to /h/" */
const stepSay = (a, b) => { const p = diffAt(a, b)[0]; return `change ${soundOf(a[p])} to ${soundOf(b[p])}${/[ck]/.test(b[p]) ? ` (spelled ${b[p]})` : ''}`; };
/** In this font an f before i, f or l touches the next letter at a heavy weight even with ligatures off (the f's hook
 *  reaches the dot of the i in fin): every printed f before i, f or l gets a little room of its own (as the Grade 1 blends
 *  pages do). Text inside tags, <svg> and <style> is left alone. */
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? text : text.replace(/f(?=[ifl])/g, '<span data-lcs-fsep style="margin-right:0.07em">f</span>');
    i = j < 0 ? html.length : j;
  }
  return out;
}

function makeCvcKType({ id, slug, mode, set, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('cvc-k: unknown mode ' + mode);
  const cfg = mode === 'vowel' ? SETS[set] : null;
  if (mode === 'vowel' && !cfg) throw new Error('cvc-k: no vowel set ' + set);
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const inner = W - 24;
      let blocks = [], items = [], rootAttr = '';

      if (mode === 'vowel') {
        const { vs, writes, pick, ex, gaps, worked, sort } = drawVowel(BK, cfg, lv, d, rng);
        rootAttr = ` data-lcs-vowels="${vs.join('')}"`;
        // task 1: six rows of words, four rows of pictures; the first and last word have a picture, the two words without a
        // picture are no neighbours; no word straight across from its picture, not all one distance away; the pictures never
        // in the order of their words, its reverse or a rotation of it (a child could draw the lines by a rule)
        const Hw = d.Hw, G = d.G, n6 = d.match + d.extras, Htot = n6 * Hw + (n6 - 1) * G, Hp = (Htot - (d.match - 1) * G) / d.match;
        const yw = (i) => i * (Hw + G) + Hw / 2, yp = (j) => j * (Hp + G) + Hp / 2;
        let rows, perm, okRows = false;
        for (let k = 0; k < 2000 && !okRows; k++) {
          rows = shuffle([...pick.map((w) => ({ w, pic: true })), ...ex.map((e) => ({ w: e.w, of: e.of, pic: false }))], rng);
          const di = rows.map((r, i) => (r.pic ? -1 : i)).filter((i) => i >= 0);
          if (Math.abs(di[0] - di[1]) === 1 || !rows[0].pic || !rows[n6 - 1].pic) continue;
          perm = shuffle(pick.map((_, s) => s), rng);   // picture row j shows pick[perm[j]]
          const off = pick.map((w, s) => yp(perm.indexOf(s)) - yw(rows.findIndex((r) => r.w === w)));
          const wordOrder = rows.filter((r) => r.pic).map((r) => pick.indexOf(r.w));
          okRows = off.every((o) => Math.abs(o) >= 18) && new Set(off.map((o) => Math.round(o / 10))).size > 1 && !orderRule(wordOrder, perm);
        }
        if (!okRows) throw new Error(`${id}: no mixed order for the match`);
        const LW = 170, GW = 190, RW = 112;
        const lines = key ? pick.map((w, s) => { const i = rows.findIndex((r) => r.w === w), j = perm.indexOf(s); return `<line data-lcs-keyline="${i}-${j}" x1="7" y1="${yw(i)}" x2="${GW - 7}" y2="${yp(j)}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>`; }).join('') : '';
        const dots = rows.map((_, i) => `<circle cx="7" cy="${yw(i)}" r="7" fill="${T.ink}"/>`).join('') + perm.map((_, j) => `<circle cx="${GW - 7}" cy="${yp(j)}" r="7" fill="${T.ink}"/>`).join('');
        // the match card takes the room the page leaves (the match stands in its middle)
        blocks.push(cream('data-lcs-matchcard="1"', label(`${num(1)}Read each word. Draw a line to its picture. Two words have no picture.`) +
          `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:center"><div data-lcs-match="${n6}" style="display:grid;grid-template-columns:${LW}px ${GW}px ${RW}px;justify-content:center;align-items:start">` +
          `<div style="display:flex;flex-direction:column;gap:${G}px">${rows.map((r, i) => `<div data-lcs-mword="${i}"${r.pic ? ' data-lcs-pictured="1"' : ` data-lcs-extra="${r.of}"`} style="height:${Hw}px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;padding-right:18px;font:800 ${d.mfont}px/1 'Nunito',sans-serif;color:${T.ink}">${r.w}</div>`).join('')}</div>` +
          `<svg data-lcs-gutter width="${GW}" height="${Htot}" viewBox="0 0 ${GW} ${Htot}" style="display:block">${lines}${dots}</svg>` +
          `<div style="display:flex;flex-direction:column;gap:${G}px">${perm.map((s) => `<div data-lcs-mpic="${pick[s]}" style="height:${Hp}px;box-sizing:border-box;display:flex;align-items:center;padding-left:18px">${img(pick[s], d.mpic)}</div>`).join('')}</div></div></div>`, d.pad, 'flex:1 1 auto'));
        items.push(...pick.map((w) => 'pic:' + w), ...ex.map((e) => 'no-pic:' + e.w));
        if (lv === 1) {
          // one vowel in every gap: a worked word in grey first, then six words; the child reads the new words to a partner
          const gw = (w, attrs, filled, color) => `<span ${attrs} style="display:inline-flex;align-items:center;gap:4px;font:800 ${d.gfont}px/1 'Nunito',sans-serif;color:${color}"><span data-lcs-gl="0">${w[0]}</span>${letterBox(`data-lcs-gap data-lcs-want="${w[1]}"`, d.box, filled ? w[1] : '', color === T.ink ? T.teal : color, d.gfont)}<span data-lcs-gl="2">${w[2]}</span></span>`;
          blocks.push(cream('data-lcs-gaps="1"', label(`${num(2)}Write ${teal(vs[0])} in each word. Read your new words to a partner.`) +
            `<div data-lcs-workedrow style="display:flex;align-items:center;gap:16px;padding:2px 10px"><span style="font:800 20px/1 'Nunito',sans-serif;color:${T.coral}">Look:</span>${gw(worked, `data-lcs-worked="${worked}"`, true, T.grid)}</div>` +
            `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px 10px;justify-items:center;padding:4px 0 6px">${gaps.map((w) => gw(w, `data-lcs-gapword="${w}"`, key, T.ink)).join('')}</div>`, d.pad));
          items.push(...gaps.map((w) => 'gap:' + w));
        } else if (lv === 2) {
          // four printed words, two of each vowel: read them out loud and write each under its vowel
          const colW = Math.floor((inner - 20) / 2);
          blocks.push(cream('data-lcs-sort="1"', label(`${num(2)}Read each word out loud. Write it under ${teal(vs[0])} or ${teal(vs[1])}. Cross out each word when you write it.`, 18) +
            `<div data-lcs-bank style="display:flex;justify-content:center;gap:22px;margin:2px 0 4px">${sort.map((w) => `<span data-lcs-bankword="${w}" style="font:800 ${d.chip}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 16px;border-radius:999px;background:#FFFFFF;border:2px solid ${T.teal}">${w}</span>`).join('')}</div>` +
            `<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px">` + vs.map((v) => `<div data-lcs-column="${v}" style="display:flex;gap:8px">${sideHead(v)}<div style="display:flex;flex-direction:column;gap:2px">${sort.filter((w) => w[1] === v).map((w) => line({ w: colW - 58, h: d.rowH, answer: key ? w : null, sample: true })).join('')}</div></div>`).join('') + `</div>` +
            (key ? `<div data-lcs-anyorder style="font:700 15px/1.2 'Nunito',sans-serif;color:${T.coral}">(any order)</div>` : ''), d.pad));
          items.push(...sort.map((w) => 'sort:' + w));
        } else {
          // three pictures to write the word for; the row starts with the first letter
          const cw = Math.floor((inner - 16 * (d.write - 1)) / d.write);
          blocks.push(cream('data-lcs-writes="1"', label(`${num(2)}Write the word for each picture.`) +
            `<div style="display:grid;grid-template-columns:repeat(${d.write},1fr);gap:16px">` + writes.map((w) => `<div data-lcs-write="${w}" style="display:flex;flex-direction:column;align-items:center;gap:4px">${img(w, d.wpic)}${line({ w: cw, h: d.rowH, starter: w[0], answer: key ? w : null })}</div>`).join('') + `</div>`, d.pad));
          items.push(...writes.map((w) => 'write:' + w));
        }
      }

      if (mode === 'chain') {
        const { words, places } = drawChain(BK, lv, rng);
        rootAttr = ` data-lcs-chain="${words.join(' ')}"`;
        const rung = (w, i) => {
          const top = i === 0;
          const boxes = [0, 1, 2].map((k) => {
            const changed = !top && k === places[i - 1];
            const traced = !top && d.trace && !changed;
            const text = top ? w[k] : traced ? w[k] : key ? w[k] : '';
            const color = top ? T.ink : traced ? T.grid : T.teal;
            return letterBox(`data-lcs-cell="${k}"${traced ? ' data-lcs-traced="1"' : ''}`, d.box, text, color, d.font);
          }).join('');
          return `<div data-lcs-rung="${i + 1}" data-lcs-word="${w}"${top ? '' : ` data-lcs-place="${PLACE[places[i - 1]]}"`} style="flex:1 1 auto;display:flex;align-items:center;gap:16px;padding:7px 18px;background:${top ? T.tealSoft : T.cream}">` +
            badge(i + 1) + `<div data-lcs-boxes style="display:flex;gap:12px">${boxes}</div>` +
            `<div style="flex:0 0 ${d.pic}px;height:${d.pic}px;display:flex;align-items:center;justify-content:center">${top ? img(w, d.pic) : ''}</div></div>`;
        };
        const LADDER = 28 + 16 + 3 * d.box + 24 + 16 + d.pic + 36;
        blocks.push(label(lv === 1 ? 'Read the first word. Listen to your teacher. On each step, write the new first letter and trace the rest. Read each new word.'
          : 'Read the first word. Listen to your teacher. Write the new word on each step. Read each new word.', 19));
        // the ladder takes the room the page leaves: its six steps grow alike
        blocks.push(`<div data-lcs-ladder style="flex:1 1 auto;align-self:center;width:${LADDER}px;display:flex;flex-direction:column;gap:9px;border-left:8px solid ${T.teal};border-right:8px solid ${T.teal};border-radius:4px">${words.map(rung).join('')}</div>`);
        // each step for the teacher stays on one line (a line break never splits /k/ from its slash)
        // (each separator stays with its step, so a line never starts with a lone dot)
        const say = words.slice(1).map((w, i, all) => `<span style="white-space:nowrap">${i + 2} ${stepSay(words[i], w)}${i < all.length - 1 ? ' ·' : '.'}</span>`);
        blocks.push(teacherLine(`Read the top word together. Then say, step by step: ${say.join(' ')} After each step, say the new word together.`));
        items = words.slice(1).map((w, i) => words[i] + '>' + w);
      }

      if (mode === 'pair') {
        const picks = drawPairs(BK, lv, rng);
        rootAttr = ` data-lcs-pos="${d.pos}"`;
        // the key's ring goes round the word AND the line under its letter (the line never sits on the ring)
        const ringOver = (on) => (on ? `<span data-lcs-ringmark style="position:absolute;left:-6px;right:-6px;top:-3px;bottom:-3px;border:3px solid ${T.teal};border-radius:999px"></span>` : '');
        const word = (w, ok, other) => `<span data-lcs-choice="${w}"${ok ? ' data-lcs-ok="1"' : ''} style="position:relative;flex:0 0 auto;display:inline-flex;padding:0 12px 10px;font:800 ${d.font}px/1.1 'Nunito',sans-serif;color:${T.ink}">` +
          [...w].map((ch, k) => `<span data-lcs-letter="${k}" style="position:relative${ch === 'f' && /[ifl]/.test(w[k + 1] || '') ? ';margin-right:0.07em' : ''}">${ch}${key && ok && k === diffAt(w, other)[0] ? `<span data-lcs-underline style="position:absolute;left:0;right:0;bottom:-8px;height:4px;border-radius:2px;background:${T.teal}"></span>` : ''}</span>`).join('') + ringOver(key && ok) + `</span>`;
        const cell = (x, i) => { const two = [word(x.w, true, x.alt), word(x.alt, false, x.w)]; if (!x.top) two.reverse();
          return `<div data-lcs-item="${i + 1}" style="display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:14px;background:${T.cream};min-width:0">${badge(i + 1)}${img(x.w, d.pic)}<div data-lcs-two style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;gap:6px">${two.join('')}</div></div>`; };
        blocks.push(label('Read both words. Circle the word for the picture. In the word you circled, underline the letter that is different.', 19));
        // the grid takes the room the page leaves: its five rows grow alike
        blocks.push(`<div data-lcs-pairgrid style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:9px 12px">${picks.map(cell).join('')}</div>`);
        items = picks.map((x) => x.w + '|' + x.alt);
      }

      return {
        // the font joins fi, fl and ff into one letter (the i loses its dot): the rule stands BEFORE the root (an inline font
        // shorthand resets the property, and the checks count the root's children as blocks)
        bodyHtml: `<style>[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>` +
          `<div data-ws-content data-lcs-noliga="1" data-lcs-cvcpage="${mode}|${lv}|${set || ''}"${rootAttr}${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + items.slice(0, 3).join(','), items },
      };
    },

    async verify(page) {
      return page.evaluate((ARGS) => {
        const { SIZES, LIST, PICS, WRITE, BANNED, APART, TWINS, ANIMALS, NOPRINT } = ARGS;
        const fails = [];
        const root = document.querySelector('[data-lcs-cvcpage]');
        if (!root) return ['no page'];
        const [mode, lvS, set] = root.dataset.lcsCvcpage.split('|'), lv = +lvS, d = SIZES[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const txt = (e) => e.textContent.trim();
        const fs = (e) => parseFloat(getComputedStyle(e).fontSize);
        const rb = R(root);
        const diffAt = (a, b) => [0, 1, 2].filter((k) => a[k] !== b[k]);
        const isEinm = (a, b) => diffAt(a, b).join() === '1' && [a[1], b[1]].sort().join('') === 'ei' && /^[nm]$/.test(a[2]);
        const isApart = (a, b) => APART.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
        const known = (w) => Object.prototype.hasOwnProperty.call(LIST, w) && !BANNED.includes(w);
        // no joined letters: EVERY text of the page is set with the font's ligatures off (the f's of fin, fit and different
        // stand in spans of their own, so a text with "fi" is no test: a missing rule shows on any text)
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let joined = 0;
          while (tw.nextNode()) { const n = tw.currentNode; if (n.nodeValue.trim() && n.parentElement && !n.parentElement.closest('svg, style') && getComputedStyle(n.parentElement).fontVariantLigatures !== 'none') joined++; }
          if (joined || root.dataset.lcsNoliga !== '1') fails.push(`ligatures are on in ${joined} places: fi and ff print as one joined letter (the page needs its rule before the root)`); }
        // ... and an f before i, f or l keeps a little room (its hook reaches the dot of the i at a heavy weight)
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let close = 0;
          while (tw.nextNode()) { const n = tw.currentNode; if (!n.parentElement.closest('svg, style') && /f[ifl]/.test(n.nodeValue)) close++; }
          document.querySelectorAll('[data-lcs-letter]').forEach((e) => { const nx = e.nextElementSibling; if (e.textContent.trim() === 'f' && nx && nx.matches('[data-lcs-letter]') && /^[ifl]/.test(nx.textContent.trim()) && parseFloat(getComputedStyle(e).marginRight) < 1) close++; });
          if (close) fails.push(`${close} times an f stands right against an i, f or l`); }
        // the sheet: pictures loaded and big enough, nothing leaves the page or its card, the blocks fill the body
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px (Kindergarten)'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        root.querySelectorAll('[data-lcs-matchcard], [data-lcs-gaps], [data-lcs-sort], [data-lcs-writes], [data-lcs-rung], [data-lcs-ladder], [data-lcs-item], [data-lcs-column], [data-lcs-write]').forEach((c) => { const cb = R(c);
          c.querySelectorAll('img, span, [data-lcs-label], [data-lcs-line] svg, [data-lcs-colhead]').forEach((e) => { const r = R(e); if (r.width && !e.matches('[data-lcs-ringmark], [data-lcs-underline]') && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5 || r.left < cb.left - 0.5 || r.top < cb.top - 0.5)) fails.push('something leaves its card (' + Object.keys(c.dataset)[0] + ')'); }); });
        // Kindergarten handwriting rows (about 3/4 in from top rule to baseline) and boxes for one letter
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < 110) fails.push('a writing row lower than 110 px (Kindergarten ruling: about 3/4 in from top rule to baseline)'); });
        document.querySelectorAll('[data-lcs-gap], [data-lcs-cell]').forEach((b) => { const r = R(b); if (r.width < 71.5 || r.height < 71.5) fails.push(`a box to write one letter in is ${Math.round(r.width)} x ${Math.round(r.height)} px (72 or more)`); });
        // the words the teacher says where the page needs them: a teacher strip at the foot of the page body, under a cut line
        const tls = [...root.querySelectorAll('[data-lcs-teacherline]')];
        const wantTL = mode === 'chain';
        if (tls.length !== (wantTL ? 1 : 0)) fails.push(`${tls.length} lines of words for the teacher (${wantTL ? 'one' : 'none'} wanted)`);
        const tl = tls[0];
        if (wantTL && tl) {
          if (tl !== blocks[blocks.length - 1]) fails.push('the words for the teacher are not at the foot of the page body');
          if (fs(tl) < 12 || fs(tl) > 13 || getComputedStyle(tl).color !== 'rgb(138, 130, 118)') fails.push(`the words for the teacher are not small grey type (${fs(tl)} px, ${getComputedStyle(tl).color})`);
          if (blocks.length > 1 && R(tl).top - R(blocks[blocks.length - 2]).bottom < 8) fails.push('the words for the teacher stand close against the task');
          const rg = document.createRange(); rg.selectNodeContents(tl);
          if ([...rg.getClientRects()].some((q) => q.width > 0.5 && (q.left < rb.left - 0.5 || q.right > rb.right + 0.5 || q.bottom > rb.bottom + 0.5))) fails.push('the words for the teacher leave the page');
          // a strip to cut off: a dashed line with scissors across the page, the order to cut under it, then the steps; nothing of
          // the child's page stands under the cut line
          const cut = tl.querySelector('[data-lcs-cutline]'), head = tl.querySelector('[data-lcs-tstriphead]'), steps = tl.querySelector('[data-lcs-tsteps]');
          if (!cut || getComputedStyle(cut).borderTopStyle !== 'dashed' || parseFloat(getComputedStyle(cut).borderTopWidth) < 2 || !cut.querySelector('[data-lcs-scissors]') || R(cut).width < 0.85 * R(tl).width) fails.push('no dashed cut line with scissors above the words for the teacher');
          if (!head || head.innerText.replace(/\s+/g, ' ').trim() !== 'Teacher strip: cut off before you copy the page.') fails.push('the teacher strip does not say to cut it off before copying');
          if (cut && head && steps && !(R(cut).top < R(head).top && R(head).bottom <= R(steps).top + 0.5)) fails.push('the teacher strip is out of order (cut line, the order to cut, the steps)');
          if (cut && [...root.querySelectorAll('[data-lcs-rung], [data-lcs-label], [data-lcs-ladder]')].some((e) => R(e).bottom > R(cut).top + 0.5)) fails.push('a part of the page of the child stands under the cut line');
        }
        const said = tl && tl.querySelector('[data-lcs-tsteps]') ? tl.querySelector('[data-lcs-tsteps]').innerText.replace(/\s+/g, ' ').trim() : '';
        // every printed word a child reads: a word of the bank, printed once
        const printed = [];

        if (mode === 'vowel') {
          // the vowels of each lesson, written here and not read from the factory's tables (a fault there must still show): the
          // lesson on a and i comes before o, u and e, so its pages print a and i words only
          const S = { ai: { set: ['a', 'i'], known: ['a', 'i'], one: ['a'] }, oue: { set: ['o', 'u', 'e'], known: ['a', 'i', 'o', 'u', 'e'], one: ['o', 'u'] } }[set], vs = (root.dataset.lcsVowels || '').split('');
          if (!S || !vs.length || vs.some((v) => !S.set.includes(v)) || vs.length !== (lv === 1 ? 1 : lv === 2 ? 2 : S.set.length) || (lv === 1 && !S.one.includes(vs[0]))) fails.push(`the vowels of the page (${vs.join('')}) are not those of level ${lv}`);
          const mw = [...document.querySelectorAll('[data-lcs-mword]')], mp = [...document.querySelectorAll('[data-lcs-mpic]')];
          const real = mw.filter((e) => e.dataset.lcsPictured), ex = mw.filter((e) => e.dataset.lcsExtra);
          if (mw.length !== d.match + d.extras || real.length !== d.match || ex.length !== d.extras || mp.length !== d.match) fails.push(`not ${d.match + d.extras} words for ${d.match} pictures, ${d.extras} of them without a picture`);
          const picWords = mp.map((e) => e.dataset.lcsMpic);
          const po = picWords.filter((w) => !WRITE.includes(w));
          if (po.length > 1) fails.push(`${po.length} pictures a child may name with another word (${po.join(', ')}): one at most`);
          { const wo = real.map(txt), rots = (x) => x.map((_, k) => x.slice(k).concat(x.slice(0, k)).join());
            if (wo.length > 1 && [...rots(wo), ...rots(wo.slice().reverse())].includes(picWords.join())) fails.push('the pictures stand in the order of their words, its reverse or a rotation of it: ' + picWords.join(' ')); }
          const offs = [];
          real.forEach((e) => { const w = txt(e), pc = mp.find((p) => p.dataset.lcsMpic === w);
            if (!pc || !pc.querySelector('img') || pc.querySelector('img').dataset.lcsPic !== w || !PICS.includes(w)) fails.push(`"${w}" has no picture of its own`);
            if (!vs.includes(LIST[w])) fails.push(`the pictured word "${w}" has no vowel of this page`);
            if (pc) { const o = (R(pc).top + R(pc).height / 2) - (R(e).top + R(e).height / 2); offs.push(o); if (Math.abs(o) < 18) fails.push(`"${w}" stands straight across from its picture`); }
            printed.push(w); });
          if (offs.length > 1 && new Set(offs.map((o) => Math.round(o / 10))).size < 2) fails.push('every picture stands the same distance from its word');
          if (lv === 2 && vs.some((v) => real.filter((e) => LIST[txt(e)] === v).length !== 2)) fails.push('the four pictures are not two of each vowel');
          if (lv === 3 && set === 'oue' && new Set(real.map((e) => LIST[txt(e)])).size < 2) fails.push('the pictures of task 1 show one vowel only');
          for (let i = 0; i < picWords.length; i++) for (let j = i + 1; j < picWords.length; j++) if (isApart(picWords[i], picWords[j])) fails.push(`"${picWords[i]}" and "${picWords[j]}" stand on one page (one could be named by the other)`);
          ex.forEach((e) => { const w = txt(e), of = e.dataset.lcsExtra;
            if (!picWords.includes(of) || diffAt(w, of).join() !== '1' || !known(w)) fails.push(`"${w}" is no word that differs from the pictured "${of}" in the vowel only`);
            if (!S || !S.known.includes(LIST[w])) fails.push(`"${w}" has a vowel this lesson has not taught`);
            if (isEinm(w, of)) fails.push(`"${w}" and "${of}" differ in e and i before n or m (they sound alike in many homes)`);
            if (PICS.includes(w) && picWords.includes(w)) fails.push(`"${w}" names a picture of the page`);
            printed.push(w); });
          // the match cannot be done by first letters, as far as the library allows
          const colW = mw.map(txt), need = TWINS[`${set}|${lv}|${vs.join('')}`];
          const twins = real.filter((e) => colW.some((y, i) => mw[i] !== e && y[0] === txt(e)[0])).length;
          if (need === undefined || twins < need) fails.push(`${twins} of the pictured words share their first letter with another word (${need} wanted): the match can be done by first letters`);
          const di = mw.map((e, i) => (e.dataset.lcsExtra ? i : -1)).filter((i) => i >= 0);
          if (di.length === 2 && Math.abs(di[0] - di[1]) === 1) fails.push('the two words without a picture stand next to each other');
          if (mw.length && (mw[0].dataset.lcsExtra || mw[mw.length - 1].dataset.lcsExtra)) fails.push('a word without a picture stands first or last');
          mw.forEach((e) => { if (fs(e) < 30) fails.push('a word to read is printed smaller than 30 px'); });
          const kl = [...document.querySelectorAll('[data-lcs-keyline]')];
          if (kl.length !== (isKey ? d.match : 0)) fails.push(`${kl.length} lines are drawn`);
          kl.forEach((l) => { const [i, j] = l.dataset.lcsKeyline.split('-').map(Number); if (!mw[i] || !mp[j] || txt(mw[i]) !== mp[j].dataset.lcsMpic) fails.push('a line of the key joins a word to another picture'); });
          if (lv === 1) {
            const gw = [...document.querySelectorAll('[data-lcs-gapword]')], wk = [...document.querySelectorAll('[data-lcs-worked]')];
            if (gw.length !== d.gaps || wk.length !== 1) fails.push(`${gw.length} words with a gap and ${wk.length} worked words (${d.gaps} and one wanted)`);
            [...gw, ...wk].forEach((e) => { const w = e.dataset.lcsGapword || e.dataset.lcsWorked, b = e.querySelector('[data-lcs-gap]'), ls = [...e.querySelectorAll('[data-lcs-gl]')].map(txt).join('');
              if (!known(w) || LIST[w] !== vs[0] || !b || b.dataset.lcsWant !== vs[0] || ls !== w[0] + w[2]) fails.push(`"${w}" is no word of short ${vs[0]} printed with a box for its vowel`);
              const filled = b ? txt(b) : '';
              if (e.dataset.lcsWorked ? filled !== vs[0] : isKey ? filled !== vs[0] : filled) fails.push('a gap is filled on the page of the child, wrong on the key, or the worked word is not filled');
              if (fs(e) < 40) fails.push('a word with a gap is printed smaller than 40 px');
              const bad = 'aeiou'.split('').map((v) => w[0] + v + w[2]).filter((x) => BANNED.includes(x));
              if (bad.length) fails.push(`the gap of "${w}" can build ${bad.join(', ')} (a word of the never list)`);
              if (e.dataset.lcsWorked && /^.a[nm]$/.test(w)) fails.push(`the grey example "${w}" has a before n or m (its a sounds different in many homes)`);
              printed.push(w); });
            if (wk[0] && getComputedStyle(wk[0]).color !== 'rgb(200, 191, 174)') fails.push('the worked word is not in grey');
            if (wk[0] && gw[0] && R(wk[0]).top > R(gw[0]).top) fails.push('the worked word does not come first');
            if (!/Read your new words to a partner\./.test((document.querySelector('[data-lcs-gaps] [data-lcs-label]') || {}).textContent || '')) fails.push('the gaps do not ask the child to read the new words to a partner');
            // the task line names the vowel of the page
            if (!((document.querySelector('[data-lcs-gaps] [data-lcs-label]') || {}).textContent || '').replace(/[⁠\s]+/g, ' ').includes(`Write ${vs[0]} in each word.`)) fails.push(`the task line of the gaps does not say "Write ${vs[0]} in each word."`);
            if (document.querySelector('[data-lcs-sort], [data-lcs-writes]') || lines.length) fails.push('level 1 has a sort or rows to write on');
          } else if (lv === 2) {
            const bank = [...document.querySelectorAll('[data-lcs-bankword]')].map((e) => e.dataset.lcsBankword), cols = [...document.querySelectorAll('[data-lcs-column]')];
            if (bank.length !== 2 * d.sort || vs.some((v) => bank.filter((w) => LIST[w] === v).length !== d.sort) || bank.some((w) => !known(w)) || cols.map((c) => c.dataset.lcsColumn).join('') !== vs.join('') || cols.some((c) => c.querySelectorAll('[data-lcs-line]').length !== d.sort)) fails.push(`the sort is not ${d.sort} words of each vowel and a column of ${d.sort} rows for each`);
            const bv = bank.map((w) => LIST[w]).join('');
            if (bv.length === 4 && bv[0] === bv[1] && bv[2] === bv[3]) fails.push('the words to sort stand sorted: ' + bv);
            document.querySelectorAll('[data-lcs-bankword]').forEach((e) => { if (fs(e) < 26) fails.push('a word to sort is printed smaller than 26 px'); });
            document.querySelectorAll('[data-lcs-colhead]').forEach((h) => { const cs = getComputedStyle(h); if (h.closest('[data-lcs-bank]') || parseFloat(cs.borderTopWidth) > 0 || fs(h) < 30 || cs.backgroundColor === 'rgba(0, 0, 0, 0)') fails.push('a column head looks like a word to sort'); });
            if (isKey) { cols.forEach((c) => [...c.querySelectorAll('[data-lcs-line]')].forEach((l) => { const a = l.dataset.lcsAnswer || ''; if (LIST[a] !== c.dataset.lcsColumn || !bank.includes(a)) fails.push('the key sorts a word into the wrong column'); })); if (!document.querySelector('[data-lcs-anyorder]')) fails.push('the key does not say the sort may be written in any order'); }
            else if (lines.some((l) => l.dataset.lcsAnswer) || document.querySelector('[data-lcs-anyorder]')) fails.push('the sort is filled on the page of the child');
            if (!/Cross out each word/.test((document.querySelector('[data-lcs-sort] [data-lcs-label]') || {}).textContent || '')) fails.push('the sort does not tell the child to cross out each word');
            // the task line names the two vowels of the page, in the order of the columns
            if (!((document.querySelector('[data-lcs-sort] [data-lcs-label]') || {}).textContent || '').replace(/[⁠\s]+/g, ' ').includes(`Write it under ${vs[0]} or ${vs[1]}.`)) fails.push(`the sort line does not say "Write it under ${vs[0]} or ${vs[1]}."`);
            printed.push(...bank);
            if (lines.length !== 2 * d.sort || document.querySelector('[data-lcs-gaps], [data-lcs-writes]')) fails.push(`${lines.length} writing rows on level 2`);
          } else {
            const wr = [...document.querySelectorAll('[data-lcs-write]')];
            if (wr.length !== d.write || new Set(wr.map((e) => e.dataset.lcsWrite)).size !== d.write) fails.push(`not ${d.write} different pictures to write the word for`);
            wr.forEach((e) => { const w = e.dataset.lcsWrite, l = e.querySelector('[data-lcs-line]'), im = e.querySelector('img');
              if (!im || im.dataset.lcsPic !== w || !WRITE.includes(w)) fails.push(`"${w}" to write has no picture a kindergartner names with that word`);
              if (!l || (isKey ? l.dataset.lcsAnswer !== w : l.dataset.lcsStartertext !== w[0])) fails.push('a row to write a word on does not start with its first letter (or the key does not print the word)');
              if (printed.includes(w)) fails.push(`the word to write "${w}" is printed on the page`); });
            // a word to write is printed nowhere on the page (the key's answer stands on its row only)
            { const ws = wr.map((e) => e.dataset.lcsWrite), tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
              while (tw.nextNode()) { const n = tw.currentNode; if (n.parentElement.closest('[data-lcs-line]')) continue; const t = n.nodeValue.toLowerCase(); ws.forEach((w) => { if (new RegExp('(^|[^a-z])' + w + '([^a-z]|$)').test(t)) fails.push(`the word to write "${w}" is printed on the page`); }); } }
            const wv = new Set(wr.map((e) => LIST[e.dataset.lcsWrite]));
            if (S && S.set.some((v) => !wv.has(v))) fails.push('the words to write do not hold every vowel of the lesson: ' + [...wv].join(''));
            if (lines.length !== d.write || document.querySelector('[data-lcs-gaps], [data-lcs-sort]')) fails.push(`${lines.length} writing rows on level 3`);
            const pw = [...picWords, ...wr.map((e) => e.dataset.lcsWrite)];
            for (let i = 0; i < pw.length; i++) for (let j = i + 1; j < pw.length; j++) if (isApart(pw[i], pw[j])) fails.push(`"${pw[i]}" and "${pw[j]}" stand on one page`);
          }
          if (S && printed.some((w) => !S.known.includes(LIST[w]))) fails.push('a printed word has a vowel this lesson has not taught');
          { const t2 = [...document.querySelectorAll('[data-lcs-gapword], [data-lcs-worked], [data-lcs-bankword], [data-lcs-write]')].map((e) => e.dataset.lcsGapword || e.dataset.lcsWorked || e.dataset.lcsBankword || e.dataset.lcsWrite);
            const t1 = mw.map(txt); t2.filter((w) => t1.includes(w)).forEach((w) => fails.push(`"${w}", a word of task 2, is printed in task 1`)); }
        }

        if (mode === 'chain') {
          const rungs = [...document.querySelectorAll('[data-lcs-rung]')], ws = rungs.map((r) => r.dataset.lcsWord);
          if (rungs.length !== 6 || ws.join(' ') !== root.dataset.lcsChain) fails.push(`${rungs.length} steps on the ladder, not six`);
          if (new Set(ws).size !== ws.length) fails.push('a word comes twice on the ladder');
          ws.forEach((w) => { if (!known(w) || /x/.test(w)) fails.push(`"${w}" is no regular CVC word of the bank (x is two sounds)`); if (w[0] === w[2]) fails.push(`"${w}" begins and ends with one consonant (the step would not say which sound)`); });
          ws.slice(1).forEach((w, i) => { if (diffAt(ws[i], w).join() === '1' && w[2] === 'g') fails.push(`"${ws[i]}" to "${w}" changes the vowel of a word that ends in g (they sound alike in some homes)`); });
          const top = rungs[0], tim = top && top.querySelector('img');
          if (!tim || tim.dataset.lcsPic !== ws[0] || !PICS.includes(ws[0])) fails.push('the top word has no picture of its own');
          if (top && [...top.querySelectorAll('[data-lcs-cell]')].map(txt).join('') !== ws[0]) fails.push('the top word is not printed in its boxes');
          const code = ws.slice(1).map((w, i) => { const dd = diffAt(ws[i], w); if (dd.length !== 1) fails.push(`"${ws[i]}" to "${w}" is not ONE letter changed`); else if ([ws[i][dd[0]], w[dd[0]]].sort().join('') === 'ck') fails.push(`"${ws[i]}" to "${w}" changes no sound (c and k)`); if (isEinm(ws[i], w)) fails.push(`"${ws[i]}" to "${w}" changes e and i before n or m (they sound alike in many homes)`); return dd.length === 1 ? 'FML'[dd[0]] : '?'; }).join('');
          rungs.slice(1).forEach((r, i) => { if (r.dataset.lcsPlace !== ['first', 'middle', 'last']['FML'.indexOf(code[i])]) fails.push(`step ${i + 2} is marked at the wrong place`); });
          const per = (k) => [...code].every((c, i) => i < k || c === code[i - k]), n = (c) => code.split(c).length - 1;
          if (lv === 1 && code !== 'FFFFF') fails.push('level 1 changes another sound than the first: ' + code);
          if (lv === 2 && (!/^[FL]{5}$/.test(code) || n('F') < 2 || n('L') < 2 || /(.)\1\1/.test(code) || per(2))) fails.push('the first and last sounds change in a pattern (or one of them less than twice): ' + code);
          if (lv === 3 && (n('F') < 1 || n('L') < 1 || n('M') < 1 || n('M') > 2 || /(.)\1\1/.test(code) || per(2) || per(3) || /FML|LMF/.test(code))) fails.push('the first, middle and last sounds change in a pattern (or one never): ' + code);
          rungs.slice(1).forEach((r, i) => { const w = ws[i + 1], p = 'FML'.indexOf(code[i]), cells = [...r.querySelectorAll('[data-lcs-cell]')];
            if (cells.length !== 3) { fails.push(`step ${i + 2} has not three boxes`); return; }
            cells.forEach((c, k) => { const t = txt(c), traced = c.dataset.lcsTraced === '1';
              if (lv === 1 && k !== p) { if (!traced || t !== w[k] || getComputedStyle(c).color !== 'rgb(200, 191, 174)') fails.push(`step ${i + 2}: the letters that stay are not printed in grey to trace`); }
              else if (traced) fails.push(`step ${i + 2}: a letter to write is printed to trace`);
              else if (isKey ? t !== w[k] : t) fails.push(`step ${i + 2}: a box is filled on the page of the child, or wrong on the key`); });
            if (r.querySelector('img')) fails.push(`step ${i + 2} shows a picture (it gives the new word away)`); });
          const say = ws.slice(1).map((w, i) => { const p = diffAt(ws[i], w)[0]; const so = (c) => ({ a: '/ă/', e: '/ĕ/', i: '/ĭ/', o: '/ŏ/', u: '/ŭ/', c: '/k/' }[c] || `/${c}/`); return `${i + 2} change ${so(ws[i][p])} to ${so(w[p])}${/[ck]/.test(w[p]) ? ` (spelled ${w[p]})` : ''}`; });
          const want = `Read the top word together. Then say, step by step: ${say.join(' · ')}. After each step, say the new word together.`;
          if (said !== want) fails.push(`the steps for the teacher are not the changes of the ladder: "${said}"`);
          // the page of the child prints no word of the ladder but the top word
          const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let leak = 0;
          while (tw.nextNode()) { const t = tw.currentNode.nodeValue.toLowerCase(); if (!tw.currentNode.parentElement.closest('[data-lcs-teacherline], [data-lcs-label]') && ws.slice(1).some((w) => new RegExp('(^|[^a-z])' + w + '([^a-z]|$)').test(t))) leak++; }
          if (leak) fails.push(`a new word of the ladder is printed on the page (${leak} times)`);
        }

        if (mode === 'pair') {
          const its = [...document.querySelectorAll('[data-lcs-item]')];
          if (its.length !== d.n) fails.push(`${its.length} pictures, not ${d.n}`);
          const pics = its.map((e) => { const im = e.querySelector('img'); return im ? im.dataset.lcsPic : ''; });
          const all = [];
          const at = its.map((e, i) => { const ch = [...e.querySelectorAll('[data-lcs-choice]')], ok = ch.filter((c) => c.dataset.lcsOk), w = pics[i];
            if (ch.length !== 2 || ok.length !== 1 || ok[0].dataset.lcsChoice !== w || ch.some((c) => txt(c) !== c.dataset.lcsChoice)) { fails.push(`picture ${i + 1}: not two words with its own word keyed`); return -1; }
            const other = ch.find((c) => !c.dataset.lcsOk).dataset.lcsChoice;
            if (!PICS.includes(w) || !WRITE.includes(w)) fails.push(`picture ${i + 1} ("${w}") is no picture a kindergartner names with that word`);
            if (!known(w) || !known(other)) fails.push(`picture ${i + 1}: "${w}" or "${other}" is no word of the bank`);
            if (diffAt(w, other).join() !== String(d.pos)) fails.push(`picture ${i + 1}: "${w}" and "${other}" do not differ in the ${['first', 'middle', 'last'][d.pos]} letter only`);
            if (isEinm(w, other)) fails.push(`picture ${i + 1}: "${w}" and "${other}" differ in e and i before n or m (they sound alike in many homes)`);
            if (isApart(w, other)) fails.push(`picture ${i + 1}: "${other}" could name the picture of "${w}"`);
            ch.forEach((c) => { if (fs(c) < 30) fails.push('a word to circle is printed smaller than 30 px'); });
            if (R(ch[1]).top < R(ch[0]).bottom - 0.5) fails.push(`picture ${i + 1}: the two words are not stacked`);
            all.push(w, other);
            const ring = ok[0].querySelector(':scope > [data-lcs-ringmark]'), lines2 = [...e.querySelectorAll('[data-lcs-underline]')];
            if (isKey) { const ul = lines2[0], li = ul && ul.parentElement;
              if (!ring || e.querySelectorAll('[data-lcs-ringmark]').length !== 1 || lines2.length !== 1 || !li || li.dataset.lcsLetter !== String(d.pos) || !ok[0].contains(ul)) fails.push(`picture ${i + 1}: the key does not ring the word and line its different letter`);
              else { const a = R(ul), b = R(li), rr = R(ring); if (a.left < b.left - 1 || a.right > b.right + 1 || a.top < b.bottom - 6) fails.push(`picture ${i + 1}: the line of the key is not under its letter`);
                if (a.bottom > rr.bottom - 3 || a.top < rr.top || a.left < rr.left || a.right > rr.right) fails.push(`picture ${i + 1}: the line of the key sits on the ring (or outside it)`); } }
            else if (ring || lines2.length) fails.push(`picture ${i + 1}: marked on the page of the child`);
            return ch.indexOf(ok[0]); });
          if (new Set(all).size !== all.length) fails.push('a word stands twice on the page: ' + all.filter((w, i) => all.indexOf(w) !== i).join(', '));
          its.forEach((e, i) => { const other = [...e.querySelectorAll('[data-lcs-choice]')].find((c) => !c.dataset.lcsOk); if (other && pics.includes(other.dataset.lcsChoice)) fails.push(`picture ${i + 1}: "${other.dataset.lcsChoice}" names another picture of the page`); });
          for (let i = 0; i < pics.length; i++) for (let j = i + 1; j < pics.length; j++) if (isApart(pics[i], pics[j])) fails.push(`"${pics[i]}" and "${pics[j]}" stand on one page`);
          // where the right word sits: the PRINTED grid, read row by row
          const byPlace = (a, b) => (Math.abs(R(a).top - R(b).top) > 8 ? R(a).top - R(b).top : R(a).left - R(b).left);
          const order = its.slice().sort(byPlace);
          if (order.some((e, i) => e !== its[i])) fails.push('the pictures are not numbered row by row as they stand');
          const s = at.join(''), n1 = s.split('1').length - 1, n0 = s.split('0').length - 1;
          if (n0 > Math.floor(0.6 * s.length) || n1 > Math.floor(0.6 * s.length) || /000|111/.test(s) || /01010|10101/.test(s)) fails.push('the right words stand in a pattern (one place more than six times in ten, three in a row, or more than four alternating): ' + s);
          const rows = []; for (let i = 0; i < s.length; i += 2) rows.push(s.slice(i, i + 2));
          const col = (c) => rows.map((r) => r[c]).join(''), alt = (x) => /^(01)+0?$|^(10)+1?$/.test(x), one = (x) => /^(0+|1+)$/.test(x);
          const cols2 = [...new Set(its.map((e) => Math.round(R(e).left)))];
          if (cols2.length !== 2 || rows.length !== d.n / 2) fails.push('the pictures are not printed in two columns');
          if (rows.every((r) => r[0] !== r[1]) || rows.every((r) => r === rows[0]) || alt(col(0)) || alt(col(1)) || one(col(0)) || one(col(1))) fails.push('the right words make a pattern in the printed grid: ' + rows.join(' '));
          if (lines.length || document.querySelector('[data-lcs-cell]')) fails.push('the page has rows or boxes to write in');
        }
        { const pics2 = [...root.querySelectorAll('img')].map((im) => im.dataset.lcsPic), words2 = [...root.querySelectorAll('[data-lcs-mword], [data-lcs-gapword], [data-lcs-bankword], [data-lcs-choice]')].map((e) => e.dataset.lcsGapword || e.dataset.lcsBankword || e.dataset.lcsChoice || txt(e));
          if (pics2.some((p) => ANIMALS.includes(p))) words2.filter((w) => NOPRINT.includes(w)).forEach((w) => fails.push(`"${w}" is printed beside the picture of an animal (it names the animal too)`)); }
        if (mode === 'vowel') { const dup = printed.filter((w, i) => printed.indexOf(w) !== i); if (dup.length) fails.push('a word is printed twice on the page: ' + [...new Set(dup)].join(', ')); printed.forEach((w) => { if (!known(w)) fails.push(`"${w}" is no word of the bank`); }); }
        return fails;
      }, { SIZES: LEVELS, LIST: Object.fromEntries(BK.list), PICS: Object.keys(BANK.pics), WRITE: BANK.write, BANNED: BANK.banned, APART: BANK.apart, TWINS: Object.fromEntries(TWIN_NEED), ANIMALS: BANK.animals, NOPRINT: BANK.noPrint });
    },
  };
}

module.exports = { makeCvcKType, faultsOf, LEVELS, SETS, drawVowel, drawChain, drawPairs, chainPatternOk, pairPlacesOk, isEinm };
