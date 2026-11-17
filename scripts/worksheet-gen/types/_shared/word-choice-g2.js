/**
 * word-choice-g2.js — three Grade 2 word-choice pages (English literacy year, Daily Teaching System Part 12.3,
 * 2026-11-18; the unit "Choosing the Right Word" of Grade 2). The words and sentences are
 * data/literacy/word-choice-g2.en.json. Pages led by PRINTED words; a picture stands only with its name printed under it.
 * Revised the same day after a US Grade 2 language-arts specialist's review.
 *
 *   reallife   Describing Words in Real Life (L.2.5.a; day 1: choose)                 G2-549
 *   drawwrite  Draw and Write with Describing Words (L.2.5.a; day 2: draw and write)  G2-550
 *   adjadv     Adjective or Adverb? (L.2.1.e)                                          G2-551
 *
 * The twelve describing words: spicy, juicy, crunchy, sticky, smooth, noisy, calm, gloomy, fluffy, prickly, slimy, icy.
 * Every real thing of the bank lists the words that CLEARLY describe it (fits) and the words a child could ARGUE for it
 * (also), and how it feels to the touch (surface). A page shows a thing only where exactly one of the page's words fits it
 * and no other one could be argued; on a page that prints "smooth", every other thing is rough, fuzzy, spiky, or bumpy,
 * or has nothing to touch (a sound, the weather, a cloud: no child calls them smooth), and every thing smooth to the touch
 * lists smooth as argued; slimy and sticky never share a page. A sentence stands only where exactly one of the page's words fits its gap (the
 * word it was written for); after "a" no offered word starts with a vowel (an icy).
 *
 * reallife level 1  1. four words, each with three pictures (a name printed under each): circle the one the word describes
 *                   (one other is a thing another word of the page describes; the third may be a thing no word of the
 *                   page describes, never one two words could); 2. three sentences with a gap and two
 *                   of the page's words under each: circle the word that fits
 *          level 2  1. six words and SEVEN pictures: draw a line from each word to the thing it describes; one picture is
 *                   left over (no word of the page describes it); 2. two sentences, three words under each
 *          level 3  1. five words (calm or gloomy among them), each in its own band with four printed things: circle the
 *                   TWO it describes; 2. three sentences, three words under each
 * drawwrite level 1 1. four words, each with two boxes: draw or write two real things it describes (the key prints
 *                   samples); 2. two sentences to finish, the starter printed ON its row ("A juicy fruit is ______")
 *          level 2  1. four words with two boxes each; 2. a sentence of the child's own about a real thing (two rows)
 *          level 3  1. four words with two boxes each (two of them both describe one real thing); 2. a riddle with two
 *                   words of part 1 (two rows, a grey "I am" on the first) and its answer (a row; the key prints a sample)
 * adjadv   level 1  1. five sentences with a picture: circle the adjective or the adverb that fits, draw an arrow to the
 *                   word it tells about (two of the five take the adverb); 2. four words to write under Adjective or Adverb
 *          level 2  1. six sentences (two or three take the adverb); 2. two words, an adjective frame and an adverb frame
 *                   for each ("a ___ firefighter", "fought ___"): write the form that fits on the row
 *          level 3  1. four sentences, one with good and one with well; 2. two sentences of the child's own, one with an
 *                   adjective and one with its adverb (the key prints a sample)
 *
 * An adjective of these pages stands before its noun or after is, are, was, or were; an adverb stands before its verb, or
 * at the end where the flat form is not said (smiled kindly, walked across the bed softly; never "talk loud"). slow, loud,
 * quick, quiet, and soft stand in the circle sentences only; the sort, the frames, and the sentences of the child's own use
 * careful, brave, neat, sad, happy, polite, proud, and calm. No sentence holds feel, look, smell, taste, sound, or seem,
 * nor fast, hard, early, late, or high. The key draws each arrow from the circled word to the word it tells about
 * (measured: it lands on that word). happy and happily stand only with the rule "Happy ends in y" printed on the page (never
 * on level 3); good and well only on level 3 with their rule. Handwriting rows are 89 px high; an answer of the key fits
 * its row (measured). Ligatures are off (fi, ff, fl) and an f before i, f, or l gets room of its own. English only.
 * Themeless: a copy draws other words; numbered copies share at most 70 % of their items. PDF only. The bank is checked when
 * this file loads (wcFaultsOf), including that every level can draw its pages; no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/word-choice-g2.en.json');
const { _parts } = require('./info-text.js');
const { seatOnRow, rulesOf } = require('../../lib/key-on-row.js');
const { makeRng } = require('../../lib/rng.js');
const { W, esc, shuffle, rowSvg } = _parts;

const ROW = 89;                                     // every handwriting row (half an inch from the top rule to the baseline)
const BAND = 40;                                    // the most blank room between two tasks or under the last one
const ROOM = 30;                                    // the least clear room above an adjective/adverb sentence for the arrow
const KEY_PX = 55;                                  // the size of an answer the key seats on an 89 px row (key-on-row.js)
const LINE_MAX = 610;                               // what one printed sentence line may hold (the card holds 637 px)
const SFONT = 21;                                   // the sentences of every page
const STARTER_PX = 24;                              // a starter printed on its row (A juicy fruit is ______)
const BASE_Y = rulesOf(rowSvg(400, ROW)).base;      // the base rule of a row, from its top
const AP = '’';
const pr = (s) => String(s).replace(/'/g, AP);
/** the advance of each letter of Nunito 700 in em (measured 2026-11-17 on a rendered page, canvas measureText) */
const GLYPH_EM = { a: 0.55, b: 0.6, c: 0.47, d: 0.6, e: 0.54, f: 0.36, g: 0.6, h: 0.59, i: 0.26, j: 0.26, k: 0.54, l: 0.32, m: 0.88, n: 0.59, o: 0.58, p: 0.6, q: 0.6, r: 0.39, s: 0.49, t: 0.38, u: 0.58, v: 0.53, w: 0.85, x: 0.55, y: 0.53, z: 0.47, A: 0.74, B: 0.69, C: 0.68, D: 0.76, E: 0.6, F: 0.56, G: 0.74, H: 0.77, I: 0.28, J: 0.35, K: 0.67, L: 0.56, M: 0.87, N: 0.75, O: 0.79, P: 0.65, Q: 0.79, R: 0.69, S: 0.63, T: 0.62, U: 0.74, V: 0.71, W: 1.11, X: 0.67, Y: 0.62, Z: 0.61, "'": 0.25, [AP]: 0.25, ' ': 0.27, '.': 0.27, ',': 0.27, '!': 0.3, '?': 0.5, '“': 0.4, '”': 0.4 };
const emOf = (s) => [...String(s)].reduce((n, c) => n + (GLYPH_EM[c] || 0.6), 0);
/** does an answer fit a writing row of w px in the key font (8 px inset each side, 2 px to spare)? */
const fitsRow = (text, w) => emOf(pr(text)) * KEY_PX <= w - 18;
const MODES = ['reallife', 'drawwrite', 'adjadv'];
/** the page instruction of every level (registered as strings with add-strings.js; verify() reads it on the page). Its
 *  examples (a warm hat, a cold drink, a fuzzy hat) are no word of the bank and no answer of any page. */
const INSTR = {
  reallife: { 1: 'Describing words tell what real things are like: a warm hat, a cold drink.', 2: 'Describing words tell what real things are like: a warm hat, a cold drink.', 3: 'Describing words tell what real things are like: a warm hat, a cold drink.' },
  drawwrite: { 1: 'Describing words tell what real things are like: a fuzzy, warm hat.', 2: 'Describing words tell what real things are like: a fuzzy, warm hat.', 3: 'Describing words tell what real things are like: a fuzzy, warm hat.' },
  adjadv: { 1: 'An adjective tells about a noun. An adverb tells about a verb: how it is done.', 2: 'An adjective tells about a noun. An adverb tells about a verb: how it is done.', 3: 'An adjective tells about a noun. An adverb tells about a verb: how it is done.' },
};
const INSTR_EXAMPLES = ['warm', 'hat', 'cold', 'drink', 'fuzzy'];
/** the task lines (verify reads them on the page) */
const LINE = {
  picrows: 'Read the word. Circle the picture it describes.',
  match: 'Read each word. Draw a line to the thing it describes. One picture is left over.',
  two: 'Read the word. Circle the two things it describes.',
  sents: 'Read each sentence. Circle the word that fits.',
  boxes: 'Draw or write two real things for each word.',
  starters: 'Finish each sentence. Write a real thing.',
  own: 'Write a sentence about a real thing. Use a word from part 1.',
  riddle: 'Write a riddle about one real thing. Use two words from part 1 that both describe it. Then write its answer.',
  adj: 'Circle the word that fits. Draw an arrow from it to the word it tells about.',
  sort: 'Write each word under Adjective or Adverb. Cross out each word when you write it.',
  phrase: 'Write the word that fits on each row.',
};
const RULE_Y = 'Happy ends in y: change the y to i, then add -ly: happily.';
const RULE_GW = 'Good tells about a noun: a good book. Well tells how something is done: runs well.';
const LINK = ['is', 'are', 'was', 'were'];
/** verbs and words that make the choice uncertain (a linking verb of the senses; a word that is adjective and adverb alike) */
const BANNED = ['feel', 'feels', 'felt', 'look', 'looks', 'looked', 'smell', 'smells', 'smelled', 'taste', 'tastes', 'tasted', 'sound', 'sounds', 'sounded', 'seem', 'seems', 'seemed', 'become', 'became', 'get', 'gets', 'got', 'stay', 'stays', 'stayed', 'turn', 'turns', 'turned', 'grow', 'grew', 'keep', 'kept', 'fast', 'hard', 'early', 'late', 'high', 'good', 'well', 'read', 'book', 'runs'];
/** the adverbs that may end a sentence right after their verb (no flat form in good American speech, no "the girl was
 *  happy" reading); the flat ones (quickly, slowly, quietly, softly) only with words between the verb and the gap */
const END_OK = ['kindly', 'bravely', 'happily', 'proudly', 'politely', 'sadly', 'calmly'];
const FLAT = ['quickly', 'slowly', 'quietly', 'softly', 'loudly'];
/** what may stand beside "smooth": things that are rough, fuzzy, spiky, or bumpy, and things with nothing to touch (none) */
const OK_SURF = ['rough', 'fuzzy', 'spiky', 'bumpy', 'none'];
const SURFACES = ['smooth', ...OK_SURF];
/** the things of the bank with nothing to touch: sounds, the weather, clouds, the sky, a time of day (surface none) */
const NO_TOUCH = ['siren', 'thunder', 'music', 'morning', 'raincloud', 'darkclouds', 'stormcloud', 'cloud', 'rainyday', 'graysky', 'wind'];
/** the beginnings of each describing word: no sentence holds another word that starts so (juice, stuck, ice) */
const STEMS = { spicy: ['spic'], juicy: ['juic'], crunchy: ['crunch'], sticky: ['stick', 'stuck'], smooth: ['smooth'], noisy: ['nois'], calm: ['calm'], gloomy: ['gloom'], fluffy: ['fluff'], prickly: ['prick'], slimy: ['slim'], icy: ['ice', 'icic', 'icy'] };
const GIVEAWAY = ['ribbit', 'bark', 'barks', 'meow', 'moo', 'oink', 'quack', 'peep', 'buzz', 'tweet', 'hiss'];
const toks = (s) => String(s).split(' ').map((t) => { const m = /^(.*?)([.!?,]*)$/.exec(t); return { core: m[1], tail: m[2] }; });
const lower = (s) => String(s).toLowerCase().replace(/’/g, "'");
const wordsIn = (s) => (lower(s).match(/[a-z']+/g) || []).map((w) => w.replace(/'s$/, ''));

const DW = Object.keys(BANK.words || {});
const THING = Object.fromEntries((BANK.things || []).map((t) => [t.id, t]));
const PICW = DW.filter((w) => (BANK.things || []).some((t) => t.pic && t.fits.includes(w)));
const headOf = (t) => [String(t.a).split(' ').slice(-1)[0], t.n ? String(t.n).split(' ').slice(-1)[0] : null].filter(Boolean);
const PLURAL = { leaf: 'leaves' };
const sentLineW = (text, font = SFONT, blank = 100) => emOf(pr(text).replace('___', '')) * font + blank;
/** the width of an adjective/adverb sentence with its two words to circle (pills 800: 6 % wider; 8 px padding and a 3 px border each side) */
const pillW = (w) => emOf(w) * SFONT * 1.06 + 22;
const adjLineW = (text, forms) => toks(pr(text)).reduce((n, t) => n + (t.core === '___' ? forms.reduce((m, f) => m + pillW(f) + 8, 0) + emOf(t.tail) * SFONT : emOf(t.core + t.tail) * SFONT + 7), 0);
const INTENS = ['very', 'so', 'too', 'really'];
const coverOn = (t, ws) => [...t.fits, ...t.also].filter((x) => ws.includes(x));
/** "a ___": no offered word may start with a vowel (it would read "a icy") */
const aBefore = (text) => /(^|\s)[Aa] ___/.test(text);

/** a two-way order: both places used, never three in a row in one place, never four that alternate */
const fourAlternate = (s) => s.some((x, i) => i >= 3 && x !== s[i - 1] && s[i - 2] === x && s[i - 3] === s[i - 1]);
function twoWay(n, rng) { for (let k = 0; k < 200; k++) { const p = Array.from({ length: n }, () => rng.int(0, 1)); if (n < 2 || (new Set(p).size === 2 && !p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]) && !fourAlternate(p))) return p; } return Array.from({ length: n }, (_, i) => [0, 1, 1, 0, 1, 0][i % 6]); }
/** a three-way order: every place used, never three in a row in one place, no staircase */
function threeWay(n, rng) {
  for (let k = 0; k < 300; k++) {
    const p = Array.from({ length: n }, () => rng.int(0, 2));
    if (n >= 3 && new Set(p).size < 3) continue;
    if (n < 3 && new Set(p).size < n) continue;
    if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue;
    if (p.some((x, i) => i >= 2 && ((p[i - 2] + 1 === p[i - 1] && p[i - 1] + 1 === x) || (p[i - 2] - 1 === p[i - 1] && p[i - 1] - 1 === x)))) continue;
    return p;
  }
  return [1, 0, 2, 1, 0, 2].slice(0, n);
}
/** the geometry of the level-2 matching: six words beside seven pictures */
const MATCH = { H: 66, G: 4, GW: 120 };
MATCH.Ht = 7 * MATCH.H + 6 * MATCH.G;
const yL = (i) => (i + 0.5) * (MATCH.Ht / 6), yR = (j) => j * (MATCH.H + MATCH.G) + MATCH.H / 2;
/** the right-hand order of the matching (7 slots, one of them the leftover picture): nobody straight across (18 px or
 *  more apart), three line offsets or more */
function matchSlots(rng) {
  for (let k = 0; k < 400; k++) {
    const slots = shuffle([...Array(7).keys()], rng);   // slots[i] = the right row of left word i (i < 6); slots[6] = the leftover
    const off = slots.slice(0, 6).map((j, i) => yR(j) - yL(i));
    if (off.some((o) => Math.abs(o) < 18) || new Set(off.map((o) => Math.round(o / 10))).size < 3) continue;
    return slots;
  }
  return null;
}
/** the two places (of four) of the right things in each row of a circle-two task: never the same pair in two rows in a row,
 *  three pairs or more on a page, every place used */
const PAIRS4 = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
function twoOfFour(n, rng) {
  for (let k = 0; k < 300; k++) { const p = Array.from({ length: n }, () => rng.int(0, 5)); if (p.some((x, i) => i && x === p[i - 1]) || new Set(p).size < Math.min(3, n) || [0, 1, 2, 3].some((q) => !p.some((x) => PAIRS4[x].includes(q)))) continue; return p.map((x) => PAIRS4[x]); }
  return null;
}
/** a sequence of kinds: both kinds, never three of one in a row, never four alternating */
const kindsOk = (s) => new Set(s).size >= 2 && !s.some((x, i) => i >= 2 && x === s[i - 1] && x === s[i - 2]) && !fourAlternate(s);
/** k-subsets of the twelve describing words, any two sharing at most `most` words (the copies of a level) */
function spreadSets(k, most, ok, tag) {
  const rng = makeRng('word-choice-g2|sets|' + tag);
  const out = [];
  for (let t = 0; t < 8000 && out.length < 60; t++) {
    const s = shuffle(DW, rng).slice(0, k).sort();
    if (!ok(s) || out.some((o) => o.filter((x) => s.includes(x)).length > most)) continue;
    out.push(s);
  }
  return out;
}
const riddlesOf = (ws) => (BANK.riddles || []).filter((r) => r.words.every((w) => ws.includes(w)));
/** the items of a draw, as build() lists them (what two copies may share) */
const itemsOfReal = (dr) => [...(dr.task.rows ? dr.task.rows.map((r) => (Array.isArray(r.ok) ? 'two:' + r.word + ':' + r.ok.slice().sort().join('+') : 'pic:' + r.word + ':' + r.ok)) : [...dr.task.left.map((x) => 'match:' + x.word + ':' + x.thing), 'left:' + dr.task.leftover]), ...dr.sents.map((s) => 'sent:' + s.text)];
const itemsOfAdj = (dr) => [...dr.sents.map((s) => 'sent:' + s.text), ...(dr.sort ? dr.sort.map((x) => 'sort:' + x.w) : dr.phrase ? dr.phrase.map((g) => 'phrase:' + g.base) : ['write:' + dr.write.base])];
/** the numbered copies of a level: draws of fixed seeds, each sharing at most 70 % of its items with every other one (a
 *  copy number picks one of them; without a number the draw is free). Draw t gets slot t: a reallife draw puts word t of
 *  its list on the page where it can, so every word stands on some copies (smooth fits beside few things and would
 *  otherwise stand on about one free draw in thirty) */
const SPREAD = {};
function spreadDraws(key, draw, itemsOf) {
  if (SPREAD[key]) return SPREAD[key];
  const out = [];
  for (let t = 0; t < 400 && out.length < 40; t++) {
    const d = draw(makeRng('word-choice-g2|spread|' + key + '|' + t), t), it = itemsOf(d);
    if (out.every((o) => o.items.filter((x) => it.includes(x)).length / Math.max(o.items.length, it.length) <= 0.7)) out.push({ d, items: it });
  }
  return (SPREAD[key] = out.map((o) => o.d));
}

// ------------------------------------------------------------------ the draws (pure: words, things, sentences, places)
/** the page's describing words, its task 1, and its sentences (reallife) */
function drawReal(lv, rng, slot) {
  const d = LEVELS.reallife[lv], base = lv === 3 ? DW : PICW;
  const need = slot == null ? null : base[slot % base.length];   // the word this copy puts on its page where it can
  for (let k = 0; k < 800; k++) {
    const must = need && k < 400 ? need : null;
    const Wd = must ? shuffle([must, ...shuffle(base.filter((w) => w !== must), rng).slice(0, d.words - 1)], rng) : shuffle(base, rng).slice(0, d.words);
    if (lv === 3 && !Wd.some((w) => w === 'calm' || w === 'gloomy')) continue;
    if ((BANK.apart || []).some((p) => p.every((w) => Wd.includes(w)))) continue;   // words too close to stand on one page
    const smooth = Wd.includes('smooth');
    const used = new Set(), kinds = new Set();
    // the one word of the page that describes a thing: it clearly describes it, and no other word of the page could be argued
    const one = (t) => { const f = coverOn(t, Wd); return f.length === 1 && t.fits.includes(f[0]) ? f[0] : null; };
    // on a page that prints smooth, every other thing is rough, fuzzy, spiky, or bumpy, or has nothing to touch
    const surfOk = (t, w) => !smooth || w === 'smooth' || OK_SURF.includes(t.surface);   // w null: a wrong thing
    const take = (w, pic) => { const t = shuffle((BANK.things || []).filter((x) => (!pic || x.pic) && one(x) === w && surfOk(x, w) && !used.has(x.id) && (!pic || !kinds.has(x.kind))), rng)[0]; if (t) { used.add(t.id); if (pic) kinds.add(t.kind); } return t; };
    const wrongFor = (w, pic) => { const t = shuffle((BANK.things || []).filter((x) => (!pic || x.pic) && !used.has(x.id) && (!pic || !kinds.has(x.kind)) && surfOk(x, null) && !coverOn(x, Wd).includes(w) && (coverOn(x, Wd).length === 0 || (one(x) && one(x) !== w))), rng)[0]; if (t) { used.add(t.id); if (pic) kinds.add(t.kind); } return t; };
    let task = null, fail = false;
    if (lv === 1) {
      const rows = Wd.map((w) => ({ word: w, right: take(w, true) }));
      if (rows.some((r) => !r.right)) continue;
      for (const r of rows) {
        const ds = []; for (const o of shuffle(Wd.filter((w) => w !== r.word), rng)) { if (ds.length === 1) break; const t = take(o, true); if (t) ds.push(t); }
        while (ds.length < 2) { const t = wrongFor(r.word, true); if (!t) break; ds.push(t); }
        if (ds.length !== 2) { fail = true; break; }
        r.wrong = ds;
      }
      if (fail) continue;
      const at = threeWay(rows.length, rng);
      task = { rows: rows.map((r, i) => { const o = r.wrong.map((t) => t.id); o.splice(at[i], 0, r.right.id); return { word: r.word, ok: r.right.id, opts: o }; }) };
    } else if (lv === 2) {
      const pairs = Wd.map((w) => ({ word: w, thing: take(w, true) }));
      if (pairs.some((p) => !p.thing)) continue;
      // the leftover picture: no word of the page describes it, not even arguably
      const lo = shuffle((BANK.things || []).filter((x) => x.pic && !coverOn(x, Wd).length && (!smooth || OK_SURF.includes(x.surface)) && !used.has(x.id) && !kinds.has(x.kind)), rng)[0];
      if (!lo) continue;
      used.add(lo.id); kinds.add(lo.kind);
      const slots = matchSlots(rng); if (!slots) continue;
      const right = []; pairs.forEach((p, i) => { right[slots[i]] = p.thing.id; }); right[slots[6]] = lo.id;
      task = { left: pairs.map((p) => ({ word: p.word, thing: p.thing.id })), right, leftover: lo.id };
    } else {
      const rows = Wd.map((w) => ({ word: w, right: [take(w, false), take(w, false)] }));
      if (rows.some((r) => r.right.some((t) => !t))) continue;
      for (const r of rows) {
        const ds = []; for (const o of shuffle(Wd.filter((w) => w !== r.word), rng)) { if (ds.length === 2) break; const t = take(o, false); if (t) ds.push(t); }
        while (ds.length < 2) { const t = wrongFor(r.word, false); if (!t) break; ds.push(t); }
        if (ds.length !== 2) { fail = true; break; }
        r.wrong = ds;
      }
      if (fail) continue;
      const at = twoOfFour(rows.length, rng); if (!at) continue;
      task = { rows: rows.map((r, i) => { const o = [], ri = r.right.slice(), wi = r.wrong.slice(); for (let q = 0; q < 4; q++) o.push((at[i].includes(q) ? ri : wi).shift().id); return { word: r.word, ok: r.right.map((t) => t.id), opts: o }; }) };
    }
    // the sentences: the one page word that fits each gap is the word it was written for; answers differ; no thing of
    // task 1 is named
    const pool = shuffle((BANK.sentences || []).filter((s) => { const f = s.fits.filter((x) => Wd.includes(x)); return f.length === 1 && f[0] === s.fits[0] && !s.about.some((a) => used.has(a)); }), rng);
    const sents = [], ans = new Set();
    for (const s of pool) { const a = s.fits[0]; if (ans.has(a)) continue; const others = Wd.filter((w) => w !== a && !(aBefore(s.text) && /^[aeiou]/.test(w))); if (others.length < d.choices - 1) continue; sents.push({ text: s.text, answer: a, others }); ans.add(a); if (sents.length === d.sents) break; }
    if (sents.length !== d.sents) continue;
    const at = d.choices === 2 ? twoWay(d.sents, rng) : threeWay(d.sents, rng);
    sents.forEach((s, i) => { const o = shuffle(s.others, rng).slice(0, d.choices - 1); o.splice(at[i], 0, s.answer); s.choices = o; delete s.others; });
    // word length tells nothing: the right word is the longest of its choices in at most half of the sentences
    const longest = sents.filter((s) => s.choices.every((c) => c === s.answer || c.length < s.answer.length)).length;
    if (longest > Math.floor(d.sents / 2)) continue;
    return { words: Wd, task, sents };
  }
  throw new Error('word-choice-g2: no reallife page of level ' + lv + ' could be drawn');
}
let SETS = null;
const setsOf = () => SETS || (SETS = { 1: spreadSets(4, 2, () => true, 'l1-147'), 2: spreadSets(4, 2, () => true, 'l2-47'), 3: spreadSets(4, 2, (s) => riddlesOf(s).length > 0, 'l3-12') })   // seeds chosen for the most sets (42, 41, 36);
/** the page's describing words, their sample things, and the sentence task (drawwrite) */
function drawDraw(lv, rng, copyNo) {
  const sets = setsOf()[lv];
  const Wd = shuffle(copyNo ? sets[(copyNo - 1) % sets.length] : sets[rng.int(0, sets.length - 1)], rng);
  const samples = Object.fromEntries(Wd.map((w) => [w, shuffle(BANK.words[w].samples, rng).slice(0, 2)]));
  if (lv === 1) return { words: Wd, samples, starters: shuffle(Wd, rng).slice(0, LEVELS.drawwrite[1].starters) };
  if (lv === 2) return { words: Wd, samples, own: shuffle(Wd, rng).slice(0, 1) };
  const rs = riddlesOf(Wd);
  return { words: Wd, samples, riddle: rs[rng.int(0, rs.length - 1)] };
}
/** the sentences of an adjective/adverb page and its sort, frames, or write task */
function drawAdj(lv, rng) {
  const d = LEVELS.adjadv[lv], A = BANK.adjadv, P = A.pairs;
  const dirOf = (s) => (s.pos === 'noun' || s.pos === 'verb' ? 'r' : 'l');
  for (let k = 0; k < 800; k++) {
    const n = d.sents, gw = d.gw || 0, nPair = n - gw;
    const adv = Array.isArray(d.adv) ? d.adv[rng.int(0, d.adv.length - 1)] : d.adv;
    const seq = shuffle([...Array(nPair - adv).fill('adj'), ...Array(adv).fill('adv'), ...(gw ? ['good', 'well'] : [])], rng);
    const bases = new Set(), pics = new Set(), who = new Set(), got = [];
    let fail = false;
    for (const kd of seq) {
      const s = kd === 'good' || kd === 'well'
        ? shuffle(A.goodwell.filter((x) => x.form === kd && !who.has(x.who)), rng)[0]
        : shuffle(A.sentences.filter((x) => x.kind === kd && !bases.has(x.base) && !(d.noHappy && x.base === 'happy') && (!d.pic || (x.pic && !pics.has(x.pic[1])))), rng)[0];
      if (!s) { fail = true; break; }
      got.push(s); if (s.who) who.add(s.who); else bases.add(s.base); if (s.pic) pics.add(s.pic[1]);
    }
    if (fail || !kindsOk(got.map((s) => s.kind))) continue;
    const dirs = got.map(dirOf);
    if (!dirs.includes('l') || !dirs.includes('r')) continue;
    const at = twoWay(n, rng);
    const sents = got.map((s, i) => { const right = s.form ? s.form : (s.kind === 'adj' ? s.base : P[s.base]); const wrong = s.form ? (s.form === 'good' ? 'well' : 'good') : (s.kind === 'adj' ? P[s.base] : s.base); return { ...s, right, choices: at[i] ? [wrong, right] : [right, wrong], dir: dirOf(s) }; });
    // word length tells nothing: the right word is the longer one in at most half of the sentences
    if (sents.filter((s) => s.right.length > s.choices.find((c) => c !== s.right).length).length > Math.floor(n / 2)) continue;
    // the sort, the frames, and the words to write: careful, brave, neat, sad, happy, polite, proud, calm, unused on the page
    const free = A.safe.filter((b) => !bases.has(b) && !(d.noHappy && b === 'happy'));
    if (d.sort) {
      const ok = (w) => fitsRow(w, SORT_COL);
      const adjW = shuffle(free.filter((b) => ok(b)), rng).slice(0, 2);
      const advW = shuffle(free.filter((b) => !adjW.includes(b) && ok(P[b])), rng).slice(0, 2).map((b) => P[b]);
      if (adjW.length < 2 || advW.length < 2) continue;
      if (Math.max(...adjW.map((w) => w.length)) < Math.min(...advW.map((w) => w.length))) continue;   // lengths overlap
      const sort = shuffle([...adjW.map((w) => ({ w, col: 'adj' })), ...advW.map((w) => ({ w, col: 'adv' }))], rng);
      return { sents, sort };
    }
    if (d.phrase) {
      const bs = shuffle(free.filter((b) => A.phrases[b]), rng).slice(0, 2);
      if (bs.length < 2) continue;
      const first = rng.int(0, 1) ? ['adj', 'adv'] : ['adv', 'adj'];   // the two words take their frames in opposite orders
      const phrase = bs.map((b, i) => ({ base: b, cells: (i ? first.slice().reverse() : first).map((kd) => ({ kind: kd, frame: A.phrases[b][kd], answer: kd === 'adj' ? b : P[b] })) }));
      return { sents, phrase };
    }
    const wb = shuffle(free.filter((b) => (A.write || {})[b]), rng)[0];
    if (!wb) continue;
    return { sents, write: { base: wb, adverb: P[wb], sample: A.write[wb] } };
  }
  throw new Error('word-choice-g2: no adjective/adverb page of level ' + lv + ' could be drawn');
}

/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function wcFaultsOf(b) {
  const f = [];
  const bad = new Set(b.bad || []);
  if (bad.size < 15) f.push('no list of words a page may never print');
  const noBad = (where, text) => { const hit = wordsIn(text).filter((w) => bad.has(w)); if (hit.length) f.push(`${where}: "${text}" holds ${hit.join(', ')}`); };
  const straight = (where, text) => { if (/'/.test(text) || /"/.test(text)) f.push(`${where}: "${text}" has a straight apostrophe or quote (the page prints ’ and “ ”)`); };
  const words = Object.keys(b.words || {});
  if (!Array.isArray(b.apart) || !b.apart.some((p) => p.join() === 'slimy,sticky') || b.apart.some((p) => p.length !== 2 || p.some((w) => !(b.words || {})[w]))) f.push('no list of words too close to stand on one page (slimy and sticky)');
  if (words.join() !== 'spicy,juicy,crunchy,sticky,smooth,noisy,calm,gloomy,fluffy,prickly,slimy,icy') f.push('the describing words are not the twelve of the lesson');
  const things = b.things || [];
  const byId = Object.fromEntries(things.map((t) => [t.id, t]));
  const byA = Object.fromEntries(things.map((t) => [t.a, t]));
  if (Object.keys(byId).length !== things.length) f.push('two things share an id');
  things.forEach((t) => {
    if (!t.a || !Array.isArray(t.fits) || !t.fits.length || !Array.isArray(t.also) || [...t.fits, ...t.also].some((w) => !words.includes(w)) || new Set([...t.fits, ...t.also]).size !== t.fits.length + t.also.length) f.push(`thing "${t.id}": no printed form, or describing words outside the bank, or a word both clear and arguable`);
    if (!SURFACES.includes(t.surface)) f.push(`thing "${t.id}": no surface (smooth, rough, fuzzy, spiky, bumpy, or none)`);
    // a thing smooth to the touch is arguably smooth wherever it is not the smooth answer; only a thing one cannot touch
    // has no surface
    if (t.surface === 'smooth' && !t.fits.includes('smooth') && !t.also.includes('smooth')) f.push(`thing "${t.id}": smooth to the touch but smooth is not listed as argued`);
    if ((t.surface === 'none') !== NO_TOUCH.includes(t.id)) f.push(`thing "${t.id}": ${t.surface === 'none' ? 'no surface, but it can be touched' : 'a surface, but it cannot be touched'}`);
    if (t.pic && (!Array.isArray(t.pic) || t.pic.length !== 2 || !t.pic.every((x) => typeof x === 'string' && x) || /bw( ?\d+)?$/i.test(t.pic[0]) || !t.n)) f.push(`thing "${t.id}": its picture is not a colour theme and a noun with a name to print`);
    if (!t.pic && t.n) f.push(`thing "${t.id}": a name to print under a picture it does not have`);
    if (t.n && (t.n.length > 13 || emOf(t.n) * 19 > 140)) f.push(`thing "${t.id}": the name "${t.n}" is wider than its picture cell`);
    if (t.a.length > 16 || emOf(t.a) * 20 > 250) f.push(`thing "${t.id}": "${t.a}" is wider than its chip`);
    straight('thing', t.a); noBad('thing', t.a);
  });
  if (things.some((t) => t.id === 'porcupine' && t.pic)) f.push('the porcupine picture is a hedgehog: print only');
  if (things.some((t) => t.id === 'story')) f.push('a bedtime story is no calm thing');
  for (const id of ['raincloud', 'darkclouds']) if (byId[id] && !byId[id].also.includes('fluffy')) f.push(`thing "${id}": a cloud is arguably fluffy`);
  for (const w of words) {
    const x = b.words[w];
    if (!x.starter || !x.fill || !x.say || !Array.isArray(x.samples) || x.samples.length < 3) { f.push(`word "${w}": no starter, sample sentence, or three samples`); continue; }
    x.samples.forEach((s) => { if (!byA[s] || !byA[s].fits.includes(w)) f.push(`word "${w}": the sample "${s}" is no thing of the bank it describes`); if (emOf(s) * 16 > 280) f.push(`word "${w}": the sample "${s}" is wider than its box`); });
    if (!new RegExp('(^|\\s)' + w + '(\\s|[.!?,]|$)').test(x.say) || !/^[A-Z].*[.!?]$/.test(x.say) || emOf('Sample answer: ' + x.say) * 15 > W - 24 - 30) f.push(`word "${w}": the sample sentence "${x.say}" does not use it, or is wider than its line`);
    const rowW = W - 24 - Math.ceil(emOf(x.starter) * STARTER_PX + 12);
    if (!new RegExp('(^|\\s)' + w + '(\\s|$)').test(x.starter) || !fitsRow(x.fill, rowW) || rowW < 300 || !byA[x.fill.replace(/\.$/, '')] || !byA[x.fill.replace(/\.$/, '')].fits.includes(w)) f.push(`word "${w}": the starter does not name it, leaves less than 300 px to write, or its sample end is no real thing it describes`);
    [x.starter, x.fill, x.say].forEach((s) => { straight('word ' + w, s); noBad('word ' + w, s); });
  }
  // the sentences: one gap; every describing word that fits it is listed; every thing it names is listed; no stem
  const sents = b.sentences || [];
  sents.forEach((s) => {
    if (typeof s.text !== 'string' || s.text.split('___').length !== 2 || !/^[A-Z]/.test(s.text) || !/[.!?]$/.test(s.text) || !Array.isArray(s.fits) || !s.fits.length || s.fits.some((w) => !words.includes(w)) || !Array.isArray(s.about) || s.about.some((a) => !byId[a])) { f.push(`sentence "${s.text}": not one gap, or its words or things are not of the bank`); return; }
    if (sentLineW(s.text) > LINE_MAX) f.push(`sentence "${s.text}" is wider than its line`);
    const tw = wordsIn(s.text);
    things.forEach((t) => { if (s.about.includes(t.id)) return; const hs = headOf(t); if (tw.some((w) => hs.includes(w) || hs.some((h) => w === h + 's' || w === h + 'es' || w === PLURAL[h]))) f.push(`sentence "${s.text}" names "${t.a}" but does not list it`); });
    if (tw.some((w) => words.includes(w))) f.push(`sentence "${s.text}" prints a describing word of the bank`);
    for (const [w, st] of Object.entries(STEMS)) { const hit = tw.find((x) => st.some((p) => x.startsWith(p))); if (hit) f.push(`sentence "${s.text}": "${hit}" shares a stem with ${w} (a gap word must not echo a word of its sentence)`); }
    if (aBefore(s.text) && /^[aeiou]/.test(s.fits[0])) f.push(`sentence "${s.text}": "a" stands before a word that starts with a vowel`);
    if (/(^|\s)[Aa]n ___/.test(s.text)) f.push(`sentence "${s.text}": "an" before the gap tells the word`);
    if (tw.some((w) => ['feel', 'feels', 'felt', 'feeling'].includes(w)) && s.fits[0] !== 'calm') f.push(`sentence "${s.text}": feel is a feeling on these pages (to feel calm), never a touch`);
    straight('sentence', s.text); noBad('sentence', s.text);
  });
  for (const w of words) if (sents.filter((s) => s.fits[0] === w).length < 4) f.push(`word "${w}": fewer than four sentences written for it`);
  if (!sents.some((s) => /^The lunchroom is ___/.test(s.text) && s.fits.join() === 'noisy')) f.push('the lunchroom sentence of the note is missing (noisy only)');
  const sampleFits = (t) => emOf('Sample answer: ' + pr(t)) * 15 <= W - 24 - 30;
  (b.riddles || []).forEach((r) => {
    if (!sampleFits(r.text)) f.push(`riddle "${r.text}": its sample line is wider than the card`);
    if (!Array.isArray(r.words) || r.words.length !== 2 || r.words.some((w) => !words.includes(w)) || r.words.some((w) => !new RegExp('\\b' + w + '\\b').test(r.text)) || !/^I am .*What am I\? .+\.$/.test(r.text)) f.push(`riddle "${r.text}": not two words of the bank, its "I am", and its answer`);
    if (wordsIn(r.text).some((w) => GIVEAWAY.includes(w))) f.push(`riddle "${r.text}": a sound word gives the answer away`);
    straight('riddle', r.text); noBad('riddle', r.text);
  });
  if ((b.riddles || []).some((r) => /peach|kitten/i.test(r.text))) f.push('a riddle with a word that is not true of its answer (a sticky peach, a calm kitten)');
  // the examples of the instructions are no word of the bank and no answer
  const answersAll = new Set([...words, ...Object.keys((b.adjadv || {}).pairs || {}), ...Object.values((b.adjadv || {}).pairs || {}), 'good', 'well', ...things.flatMap((t) => wordsIn(t.a))]);
  INSTR_EXAMPLES.forEach((w) => { if (answersAll.has(w)) f.push(`"${w}", an example of an instruction, is a word of the bank`); });
  for (const m of ['reallife', 'drawwrite']) for (const lv of [1, 2, 3]) if (!/real things/.test(INSTR[m][lv]) || !new RegExp(INSTR_EXAMPLES.join('|')).test(INSTR[m][lv])) f.push(`the instruction of ${m} level ${lv} does not say real things, or has no example`);

  // ---- adjective or adverb
  const A = b.adjadv || {}, P = A.pairs || {}, SAFE = A.safe || [];
  for (const [base, adv] of Object.entries(P)) {
    const want = base === 'happy' ? 'happily' : base + 'ly';
    if (adv !== want || !/^[a-z]+$/.test(base)) f.push(`pair ${base} / ${adv}: the adverb is not the adjective with -ly`);
    if (/y$/.test(base) && base !== 'happy') f.push(`pair ${base}: a y to i word without its rule`);
  }
  if (Object.keys(P).length < 12) f.push('fewer than twelve adjective/adverb pairs');
  if (SAFE.slice().sort().join() !== ['careful', 'brave', 'neat', 'sad', 'happy', 'polite', 'proud', 'calm'].sort().join()) f.push('the words with no flat adverb are not careful, brave, neat, sad, happy, polite, proud, calm');
  const allS = [...(A.sentences || []), ...(A.goodwell || [])];
  allS.forEach((s) => {
    const tk = toks(s.text), gi = tk.findIndex((t) => t.core === '___'), ti = tk.findIndex((t) => t.core === s.target);
    const isGW = s.base === 'good';
    const forms = isGW ? ['good', 'well'] : [s.base, P[s.base]];
    const where = `adjective/adverb sentence "${s.text}"`;
    if (s.text.split('___').length !== 2 || gi < 0 || ti < 0 || tk.filter((t) => t.core === s.target).length !== 1 || !/^[A-Z]/.test(s.text) || !/[.!?]$/.test(s.text)) { f.push(where + ': not one gap and its target once'); return; }
    if (!isGW && !P[s.base]) f.push(where + ': its word is no pair of the bank');
    if (s.kind !== (s.pos === 'noun' || s.pos === 'be' ? 'adj' : 'adv') || (isGW && s.kind !== (s.form === 'good' ? 'adj' : 'adv'))) f.push(where + ': its kind is not the kind of its place');
    if (s.pos === 'noun' && ti !== gi + 1) f.push(where + ': the adjective does not stand right before its noun');
    const li = tk.map((t, i) => (LINK.includes(lower(t.core)) && i < gi ? i : -1)).filter((i) => i >= 0).pop();
    if (s.pos === 'be' && (li == null || ti >= li || tk.slice(li + 1, gi).some((t) => !INTENS.includes(lower(t.core))))) f.push(where + ': the adjective does not stand after is, are, was, or were with its noun before');
    if (s.pos === 'verb' && ti !== gi + 1) f.push(where + ': the adverb does not stand right before its verb');
    if (s.pos === 'end') {
      const av = isGW ? 'well' : P[s.base];
      if (gi !== tk.length - 1 || ti > gi - 1) f.push(where + ': the adverb does not end the sentence after its verb');
      else if (!isGW && !END_OK.includes(av) && !(FLAT.includes(av) && av !== 'loudly' && ti < gi - 1)) f.push(where + ': a flat adverb stands right after its verb, where the flat form is said');
    }
    if (s.pos === 'be' || s.pos === 'end') { if (tk[ti].tail) f.push(where + ': its target carries punctuation'); }
    if (!isGW && s.base === 'kind' && s.kind === 'adj') f.push(where + ': kindly is also an adjective (a kindly man), so kind is never the adjective to choose');
    if (!isGW && s.base === 'loud' && s.pos === 'end') f.push(where + ': talk loud is good speech');
    const tw = wordsIn(s.text);
    if (tw.some((w) => BANNED.includes(w) && !(isGW && w === s.form))) f.push(where + ': it holds a word that makes the choice uncertain (' + tw.filter((w) => BANNED.includes(w)).join(', ') + ')');
    if (tw.some((w) => w !== '___' && (Object.keys(P).includes(w) || Object.values(P).includes(w)))) f.push(where + ': it prints another describing word of the pairs');
    if (adjLineW(s.text, forms) + (s.pic ? 68 : 0) > LINE_MAX) f.push(where + ': wider than its line (' + Math.round(adjLineW(s.text, forms) + (s.pic ? 68 : 0)) + ' px)');
    if (s.pic && (!Array.isArray(s.pic) || s.pic.length !== 2 || /bw( ?\d+)?$/i.test(s.pic[0]) || !tw.includes(s.pic[1].replace(/_/g, ' ')) && !tw.includes(s.pic[1] + 's'))) f.push(where + ': its picture is no colour picture of a noun it names');
    if (isGW && !s.who) f.push(where + ': no person (good and well of one person never share a page)');
    straight('adjective/adverb sentence', s.text); noBad('adjective/adverb sentence', s.text);
  });
  for (const kd of ['adj', 'adv']) for (const base of Object.keys(P)) if (base !== 'kind' || kd === 'adv') if (!(A.sentences || []).some((s) => s.base === base && s.kind === kd) && !(base === 'kind' || base === 'loud')) f.push(`pair ${base}: no sentence that takes its ${kd === 'adj' ? 'adjective' : 'adverb'}`);
  if ((A.sentences || []).filter((s) => s.pic).length < 20) f.push('fewer than twenty sentences with a picture (level 1)');
  if ((A.goodwell || []).filter((s) => s.form === 'good').length < 3 || (A.goodwell || []).filter((s) => s.form === 'well').length < 3) f.push('fewer than three sentences each for good and well');
  for (const [base, s] of Object.entries(A.write || {})) { if (!SAFE.includes(base) || base === 'happy' || s.split(/(?<=\.) /).length !== 2 || s.split(/(?<=\.) /).some((h) => emOf('Sample answer: ' + h) * 15 > W - 24 - 30) || !P[base] || !new RegExp('\\b' + base + '\\b', 'i').test(s) || !new RegExp('\\b' + P[base] + '\\b', 'i').test(s)) f.push(`write sample for ${base}: no word of the safe list, or it does not use ${base} and ${P[base]}`); straight('write sample', s); noBad('write sample', s); }
  for (const [base, x] of Object.entries(A.phrases || {})) {
    const ok = SAFE.includes(base) && x.adj && x.adv && /^a ___ [a-z]+$/.test(x.adj) && / ___$/.test(x.adv) && !/^a ___/.test(x.adv) && fitsRow(P[base], PHRASE_ROW) && fitsRow(base, PHRASE_ROW) && emOf(x.adv) * SFONT < PHRASE_ROW && emOf(x.adj) * SFONT < PHRASE_ROW;
    if (!ok) f.push(`frames of ${base}: not a safe word with "a ___ noun" and "verb ___", or wider than their rows`);
    [x.adj, x.adv].forEach((t) => { if (wordsIn(t).some((w) => BANNED.includes(w))) f.push(`frame "${t}" holds a word that makes the choice uncertain`); });
  }
  if (Object.keys(A.phrases || {}).length < 6) f.push('fewer than six words with frames (level 2)');
  // every level can draw its pages (40 copies each)
  if (!f.length) {
    for (const lv of [1, 2, 3]) {
      try { for (let v = 1; v <= 40; v++) { const r = makeRng('wc-check|' + lv + '|' + v); drawReal(lv, r); drawDraw(lv, r, v); drawAdj(lv, r); } } catch (e) { f.push(e.message); }
      if (setsOf()[lv].length < 16) f.push(`drawwrite level ${lv}: fewer than sixteen word sets that share little`);
      if (!f.length) for (const [k, dr, it] of [['real' + lv, (r, t) => drawReal(lv, r, t), itemsOfReal], ['adj' + lv, (r) => drawAdj(lv, r), itemsOfAdj]]) if (spreadDraws(k, dr, it).length < 16) f.push(`${k}: fewer than sixteen copies that share little`);
    }
  }
  return f;
}

const LEVELS = {
  reallife: {
    1: { words: 4, pic: 68, sents: 3, choices: 2, pad: 8 },
    2: { words: 6, pic: 56, sents: 2, choices: 3, pad: 8 },
    3: { words: 5, sents: 3, choices: 3, pad: 8 },
  },
  drawwrite: {
    1: { words: 4, cols: 2, boxH: 196, starters: 2, pad: 8 },
    2: { words: 4, cols: 2, boxH: 205, own: 1, pad: 8 },
    3: { words: 4, cols: 2, boxH: 150, riddle: true, pad: 8 },
  },
  adjadv: {
    1: { sents: 5, adv: 2, pic: 60, room: 40, sort: 4, pad: 7 },
    2: { sents: 6, adv: [2, 3], room: 30, phrase: 2, pad: 7 },
    3: { sents: 4, gw: 2, adv: [0, 1, 2], room: 30, write: true, noHappy: true, pad: 5 },
  },
};
const BOX_MIN = { 1: 155, 2: 135, 3: 135 };         // the least height of a box to draw in (1.4 in and more)
const SORT_COL = 246;                               // a writing row under Adjective or under Adverb
const PHRASE_ROW = 232;                             // a row of the level-2 frames (two frames and their label in a line)
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks

/** In this font an f before i, f, or l touches the next letter even with ligatures off (the i of "fire" loses its dot):
 *  every printed f before i, f, or l gets a little room of its own. Text inside tags, <svg> and <style> is left alone. */
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
const img = (t, size) => `<img class="ws-icon" data-lcs-pic="${esc(t.id)}" data-lcs-kind="${esc(t.kind)}" src="${fileUri(t.pic[0], t.pic[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const cream = (attrs, inner, pad = 8, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:6px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, key, note) => `<div data-lcs-label data-lcs-read style="font:700 20px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}${key && note ? `<span data-lcs-keynote style="font:700 15px/1 'Nunito',sans-serif;color:${T.teal}"> ${esc(note)}</span>` : ''}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
const ring = (on) => `3px solid ${on ? T.teal : 'transparent'}`;
/** a word to circle (the key rings the right one) */
const pill = (text, ok, key, font, attrs = '') => `<span data-lcs-pill${ok ? ' data-lcs-ok="1"' : ''} ${attrs} style="position:relative;display:inline-flex;align-items:center;flex:0 0 auto;font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:0 8px;border:${ring(key && ok)};border-radius:999px;background:#FFFFFF">${esc(pr(text))}</span>`;
/** a writing row of 89 px; the key seats a (sample) answer on it in teal */
const row = (w, answer, key) => {
  const base = rowSvg(w, ROW);
  const shown = key && answer ? seatOnRow(base, pr(answer), { fill: T.teal, em: 0.3 }) : base;
  return `<div data-lcs-line${key && answer ? ` data-lcs-answer="${esc(pr(answer))}"` : ''} style="line-height:0">${shown}</div>`;
};
/** a starter printed ON its row: the words stand on the base rule, left of the lines, and the child writes on the rest of
 *  the row ("A juicy fruit is ______"); the key seats the sample end on the row */
const onRow = (attrs, starter, w, answer, key, color) => {
  const sw = Math.ceil(emOf(starter) * STARTER_PX + 12);
  return `<div ${attrs} data-lcs-onrow style="display:flex;align-items:flex-start">` +
    `<span data-lcs-starterword data-lcs-read style="flex:0 0 auto;font:700 ${STARTER_PX}px/${STARTER_PX}px 'Nunito',sans-serif;color:${color};white-space:nowrap;width:${sw}px;box-sizing:border-box;padding:${BASE_Y - 20}px 12px 0 6px">${esc(pr(starter))}</span>` +
    `<div style="flex:0 0 auto">${row(w - sw, answer, key)}</div></div>`;
};
const cellW = (cols, gap = 12) => Math.floor((W - 24 - gap * (cols - 1)) / cols);
/** a sample sentence the key prints in the top margin of its first row (it takes no room on the page) */
const sampleLine = (text, key) => (key ? `<div data-lcs-sample="${esc(pr(text))}" style="font:700 15px/17px 'Nunito',sans-serif;height:17px;white-space:nowrap;color:${T.teal};margin-bottom:-20px;position:relative;z-index:1;padding-left:8px">Sample answer: ${esc(pr(text))}</div>` : '');

// the bank is checked when this file loads (after the helpers it uses are defined)
{ const f = wcFaultsOf(BANK); if (f.length) throw new Error('word-choice-g2.en.json: ' + f.join('; ')); }

function makeWordChoiceType({ id, slug, mode, i18n, exerciseType }) {
  const LV = LEVELS[mode];
  if (!LV) throw new Error('word-choice-g2: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: LV,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = LV[lv] || LV[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const copyNo = Number(ctx && (ctx.seedVariant || ctx.variant)) || 0;
      const blocks = [], items = [];

      /** sentences with a gap and the page's words to circle under each (reallife) */
      const sentBlock = (k, sents) => cream('data-lcs-sentcard="1"', label(`${num(k)}${LINE.sents}`) + sents.map((s, i) => {
        const [a, b2] = pr(s.text).split('___'); const tail = (/^[.!?,]+/.exec(b2) || [''])[0], rest = b2.slice(tail.length);
        items.push('sent:' + s.text);
        return `<div data-lcs-sent="${i}" data-lcs-answer="${s.answer}" data-lcs-text="${esc(s.text)}" style="display:flex;flex-direction:column;gap:5px;padding:2px 0 4px 14px">` +
          `<div data-lcs-stext data-lcs-read style="font:700 ${SFONT}px/1.3 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(a)}<span data-lcs-blank style="display:inline-block;width:100px;height:1.05em;border-bottom:3px solid ${T.ink};vertical-align:baseline;margin:0 ${tail ? 0 : 2}px 0 2px"></span>${tail ? `<span data-lcs-tail>${esc(tail)}</span>` : ''}${esc(rest)}</div>` +
          `<div data-lcs-choices style="display:flex;gap:16px;padding-left:22px">${s.choices.map((c) => pill(c, c === s.answer, key, SFONT, `data-lcs-choice="${c}"`)).join('')}</div></div>`;
      }).join(''), d.pad);

      // =============================================================== REALLIFE (G2-549)
      if (mode === 'reallife') {
        const sp = copyNo ? spreadDraws('real' + lv, (r, t) => drawReal(lv, r, t), itemsOfReal) : null;
        const dr = sp ? sp[(copyNo - 1) % sp.length] : drawReal(lv, rng);
        if (lv === 1) {
          blocks.push(cream(`data-lcs-picrows="${dr.words.join(',')}"`, label(`${num(1)}${LINE.picrows}`) + dr.task.rows.map((r) =>
            `<div data-lcs-picrow="${r.word}" style="display:grid;grid-template-columns:150px repeat(3,1fr);align-items:center;gap:8px;padding-left:10px">` +
            `<div data-lcs-head data-lcs-read style="font:800 28px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(r.word)}</div>` +
            r.opts.map((tid) => { const t = THING[tid], ok = tid === r.ok; return `<div data-lcs-opt="${tid}"${ok ? ' data-lcs-ok="1"' : ''} style="justify-self:center;display:flex;flex-direction:column;align-items:center;gap:1px;padding:3px 8px;border:${ring(key && ok)};border-radius:16px;background:#FFFFFF;min-width:132px;box-sizing:border-box">${img(t, d.pic)}<span data-lcs-name data-lcs-read style="font:700 19px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(t.n)}</span></div>`; }).join('') + `</div>`).join(''), d.pad));
          items.push(...dr.task.rows.map((r) => 'pic:' + r.word + ':' + r.ok));
        }
        if (lv === 2) {
          const { left, right, leftover } = dr.task, { H, G, GW, Ht } = MATCH;
          const lines = key ? left.map((x, i) => { const j = right.indexOf(x.thing); return `<line data-lcs-keyline="${i}-${j}" x1="7" y1="${yL(i)}" x2="${GW - 7}" y2="${yR(j)}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>`; }).join('') : '';
          const dots = left.map((_, i) => `<circle cx="7" cy="${yL(i)}" r="7" fill="${T.ink}"/>`).join('') + right.map((_, j) => `<circle cx="${GW - 7}" cy="${yR(j)}" r="7" fill="${T.ink}"/>`).join('');
          blocks.push(cream('data-lcs-matchcard="1"', label(`${num(1)}${LINE.match}`) +
            `<div data-lcs-match="${left.length}" style="display:grid;grid-template-columns:190px ${GW}px 260px;justify-content:center;align-items:start">` +
            `<div style="display:flex;flex-direction:column">${left.map((x, i) => `<div data-lcs-mword="${x.word}" data-lcs-row="${i}" data-lcs-read style="height:${Ht / 6}px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;padding-right:14px;font:800 26px/1 'Nunito',sans-serif;color:${T.ink}">${esc(x.word)}</div>`).join('')}</div>` +
            `<svg data-lcs-gutter width="${GW}" height="${Ht}" viewBox="0 0 ${GW} ${Ht}" style="display:block">${lines}${dots}</svg>` +
            `<div style="display:flex;flex-direction:column;gap:${G}px">${right.map((tid, j) => { const t = THING[tid], w = (left.find((x) => x.thing === tid) || {}).word; return `<div data-lcs-mthing="${t.id}"${w ? ` data-lcs-for="${w}"` : ' data-lcs-leftover="1"'} data-lcs-row="${j}" style="height:${H}px;box-sizing:border-box;display:flex;align-items:center;gap:10px;padding-left:14px">${img(t, d.pic)}<span data-lcs-name data-lcs-read style="font:700 20px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(t.n)}</span></div>`; }).join('')}</div></div>`, d.pad));
          items.push(...left.map((x) => 'match:' + x.word + ':' + x.thing), 'left:' + leftover);
        }
        if (lv === 3) {
          blocks.push(cream(`data-lcs-tworows="${dr.words.join(',')}"`, label(`${num(1)}${LINE.two}`) + dr.task.rows.map((r, i) =>
            `<div data-lcs-tworow="${r.word}" style="display:grid;grid-template-columns:120px 1fr 1fr;grid-auto-rows:auto;align-items:center;gap:4px 10px;padding:4px 0 4px 10px;${i ? `border-top:2.5px solid ${T.grid}` : ''}">` +
            `<div data-lcs-head data-lcs-read style="grid-row:span 2;font:800 26px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(r.word)}</div>` +
            r.opts.map((tid) => { const ok = r.ok.includes(tid); return `<span data-lcs-chip="${tid}"${ok ? ' data-lcs-ok="1"' : ''} data-lcs-read style="justify-self:start;font:700 20px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 12px;border:${ring(key && ok)};border-radius:999px;background:#FFFFFF;white-space:nowrap">${esc(pr(THING[tid].a))}</span>`; }).join('') + `</div>`).join(''), d.pad));
          items.push(...dr.task.rows.map((r) => 'two:' + r.word + ':' + r.ok.slice().sort().join('+')));
        }
        blocks.push(sentBlock(2, dr.sents));
      }

      // =============================================================== DRAWWRITE (G2-550)
      if (mode === 'drawwrite') {
        const dr = drawDraw(lv, rng, copyNo);
        blocks.push(cream(`data-lcs-boxcard="${dr.words.join(',')}"`, label(`${num(1)}${LINE.boxes}`, key, 'Sample answers.') +
          `<div style="display:grid;grid-template-columns:repeat(${d.cols},1fr);gap:8px 14px">` + dr.words.map((w) =>
            `<div data-lcs-dcell="${w}" style="display:flex;flex-direction:column;gap:3px;min-width:0"><div data-lcs-head data-lcs-read style="font:800 24px/1.15 'Nunito',sans-serif;color:${T.ink};padding-left:4px">${esc(w)}</div>` +
            `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${dr.samples[w].map((s) => `<div data-lcs-box style="position:relative;height:${d.boxH}px;box-sizing:border-box;border:2.5px solid ${T.inkSoft};border-radius:12px;background:#FFFFFF;display:flex;align-items:flex-end;justify-content:center;padding:4px">${key ? `<span data-lcs-boxsample="${esc(s)}" style="font:700 15px/1.15 'Nunito',sans-serif;color:${T.teal};text-align:center">${esc(pr(s.replace(/^(a|an) /, '')))}</span>` : ''}</div>`).join('')}</div></div>`).join('') + `</div>`, d.pad));
        items.push(...dr.words.map((w) => 'word:' + w));
        if (lv === 1) {
          blocks.push(cream('data-lcs-startcard="1"', label(`${num(2)}${LINE.starters}`, key, 'Sample answers.') + dr.starters.map((w) =>
            `<div style="margin-top:6px">${onRow(`data-lcs-finish="${w}"`, BANK.words[w].starter, W - 24, BANK.words[w].fill, key, T.ink)}</div>`).join(''), d.pad));
          items.push(...dr.starters.map((w) => 'start:' + w));
        }
        if (lv === 2) {
          blocks.push(cream(`data-lcs-owncard="${dr.own.join(',')}"`, label(`${num(2)}${LINE.own}`) + dr.own.map((w, i) =>
            `<div data-lcs-own="${i + 1}" data-lcs-sampleword="${w}" style="display:flex;flex-direction:column;gap:3px">${sampleLine(BANK.words[w].say, key)}${row(W - 24)}${row(W - 24)}</div>`).join(''), d.pad));
          items.push('own:' + dr.own.join('+'));
        }
        if (lv === 3) {
          const r = dr.riddle;
          const ans = (/What am I\? (.+)\.$/.exec(r.text) || [])[1];
          blocks.push(cream(`data-lcs-riddlecard="${r.words.join(',')}"`, label(`${num(2)}${LINE.riddle}`) +
            `<div data-lcs-riddle style="display:flex;flex-direction:column;gap:3px">${sampleLine(r.text, key)}${onRow('data-lcs-iam="1"', 'I am', W - 24, null, key, T.inkSoft)}${row(W - 24)}</div>` +
            `<div data-lcs-what style="display:flex;align-items:flex-end;gap:12px"><span data-lcs-read style="flex:0 0 auto;font:800 22px/1.2 'Nunito',sans-serif;color:${T.ink};padding:0 0 14px 6px">What am I?</span><div style="flex:1 1 auto;min-width:0">${row(W - 24 - 140, ans, key)}</div></div>`, d.pad));
          items.push('riddle:' + r.words.join('+'));
        }
      }

      // =============================================================== ADJECTIVE OR ADVERB (G2-551)
      if (mode === 'adjadv') {
        const sp = copyNo ? spreadDraws('adj' + lv, (r) => drawAdj(lv, r), itemsOfAdj) : null;
        const dr = sp ? sp[(copyNo - 1) % sp.length] : drawAdj(lv, rng), P = BANK.adjadv.pairs;
        const SEGTOP = d.room - 6, HEAD = 10;
        const seg = (attrs, css) => `<i data-lcs-seg${attrs} style="position:absolute;top:-${SEGTOP}px;${css};border-top:3px solid ${T.teal};pointer-events:none"></i>`;
        const arrowHead = `<i data-lcs-arrowhead style="position:absolute;left:50%;top:-${HEAD + 2}px;margin-left:-7px;width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:${HEAD}px solid ${T.teal}"></i>`;
        const printed = [];
        const lineOf = (s) => {
          const tk = toks(pr(s.text));
          const gi = tk.findIndex((t) => t.core === '___');
          const D = [];
          tk.forEach((t, i) => {
            if (i === gi) { s.choices.forEach((c, j) => D.push({ kind: 'p', text: c, ok: c === s.right, tail: j === 1 ? t.tail : '', pad: j === 0 ? 8 : (j === 1 && t.tail ? 0 : 8) })); return; }
            D.push({ kind: 'w', text: t.core, tail: t.tail, target: t.core === pr(s.target), pad: i === tk.length - 1 ? 0 : 7 });
          });
          const si = D.findIndex((x) => x.kind === 'p' && x.ok), ei = D.findIndex((x) => x.target), dir = ei > si ? 'r' : 'l';
          const lo = Math.min(si, ei), hi = Math.max(si, ei);
          return D.map((x, j) => {
            let inner = '', outer = '';
            if (key) {
              if (j === si) inner = (dir === 'r' ? seg(' data-lcs-segstart', `left:50%;right:-3px;height:${SEGTOP - 2}px;border-left:3px solid ${T.teal}`) : seg(' data-lcs-segstart', `left:-3px;right:50%;height:${SEGTOP - 2}px;border-right:3px solid ${T.teal}`)).replace(`top:-${SEGTOP}px`, `top:-${SEGTOP + 3}px`);
              if (j === si && dir === 'r' && x.pad) outer = seg(' data-lcs-segrest', `right:0;width:${x.pad}px;height:0`);
              if (j === ei) { inner = (dir === 'r' ? seg(' data-lcs-segend', `left:0;right:50%;height:${SEGTOP - HEAD - 2}px;border-right:3px solid ${T.teal}`) : seg(' data-lcs-segend', `left:50%;right:0;height:${SEGTOP - HEAD - 2}px;border-left:3px solid ${T.teal}`)) + arrowHead; if (dir === 'l' && x.pad) outer = seg(' data-lcs-segrest', `right:0;width:${x.pad}px;height:0`); }
              if (j > lo && j < hi) outer = seg(' data-lcs-segmid', 'left:0;right:0;height:0');
            }
            const body = x.kind === 'p'
              ? pill(x.text, x.ok, key, SFONT, `data-lcs-choice="${x.text}"`).replace(/<\/span>$/, inner + '</span>')
              : `<span data-lcs-w${x.target ? ' data-lcs-tgt="1"' : ''} style="position:relative;display:inline-flex;align-items:center">${esc(x.text)}${inner}</span>`;
            return `<span data-lcs-tok="${x.kind}" style="position:relative;display:inline-flex;align-items:stretch;padding-right:${x.pad}px">${body}${x.tail ? `<span data-lcs-tail style="display:inline-flex;align-items:center">${esc(x.tail)}</span>` : ''}${outer}</span>`;
          }).join('');
        };
        dr.sents.forEach((s) => printed.push(...s.choices));
        if (dr.sort) printed.push(...dr.sort.map((x) => x.w));
        if (dr.phrase) dr.phrase.forEach((g) => printed.push(g.base, P[g.base]));
        if (dr.write) printed.push(dr.write.base, dr.write.adverb);
        const needY = printed.some((w) => w === 'happy' || w === 'happily');
        const ruleBox = (attr, text) => `<div ${attr} data-lcs-read style="font:700 19px/1.25 'Nunito',sans-serif;color:${T.ink};padding:3px 10px;border-left:5px solid ${T.teal};background:#FFFFFF;border-radius:6px">${esc(text)}</div>`;
        const rules = (needY ? ruleBox('data-lcs-rule="y"', RULE_Y) : '') + (dr.sents.some((s) => s.base === 'good') ? ruleBox('data-lcs-rule="gw"', RULE_GW) : '');
        blocks.push(cream(`data-lcs-adjcard="${dr.sents.length}"`, label(`${num(1)}${LINE.adj}`) + rules + dr.sents.map((s, i) =>
          `<div data-lcs-arow="${i}" data-lcs-kind="${s.kind}" data-lcs-pos="${s.pos}" data-lcs-dir="${s.dir}" data-lcs-target="${esc(pr(s.target))}" data-lcs-right="${s.right}" data-lcs-text="${esc(s.text)}" style="display:flex;align-items:flex-end;gap:12px;padding-left:10px;flex:1 1 auto">` +
          (d.pic ? img({ id: s.pic[1], kind: s.pic[1], pic: s.pic }, d.pic) : '') +
          `<div data-lcs-aline data-lcs-read style="display:flex;flex-wrap:nowrap;align-items:stretch;padding-top:${d.room}px;margin-top:auto;white-space:nowrap;font:700 ${SFONT}px/1.2 'Nunito',sans-serif;color:${T.ink}">${lineOf(s)}</div></div>`).join(''), d.pad, 'flex:1 1 auto'));
        items.push(...dr.sents.map((s) => 'sent:' + s.text));
        if (dr.sort) {
          const colOf = (c) => dr.sort.filter((x) => x.col === c);
          blocks.push(cream('data-lcs-sortcard="1"', label(`${num(2)}${LINE.sort}`) +
            `<div style="display:grid;grid-template-columns:120px ${SORT_COL}px ${SORT_COL}px;justify-content:space-between;gap:8px 12px;align-items:start">` +
            `<div data-lcs-sortbank style="display:flex;flex-direction:column;gap:10px;align-items:center;padding-top:4px">${dr.sort.map((x) => `<span data-lcs-sortword="${x.w}" data-lcs-col="${x.col}" data-lcs-read style="font:800 23px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 12px;border:2.5px dashed ${T.inkSoft};border-radius:10px;background:#FFFFFF${key ? `;text-decoration:line-through ${T.teal} 3px` : ''}">${esc(x.w)}</span>`).join('')}${key ? `<span data-lcs-anyorder style="font:700 15px/1.1 'Nunito',sans-serif;color:${T.teal}">(any order)</span>` : ''}</div>` +
            ['adj', 'adv'].map((c) => `<div data-lcs-column="${c}" style="display:flex;flex-direction:column;gap:4px"><div data-lcs-colhead data-lcs-read style="font:800 21px/1.2 'Nunito',sans-serif;color:${T.ink};background:${T.tealSoft};border-left:6px solid ${T.teal};padding:4px 10px">${c === 'adj' ? 'Adjective' : 'Adverb'}</div>${colOf(c).map((x) => row(SORT_COL, x.w, key)).join('')}</div>`).join('') + `</div>`, d.pad));
          items.push(...dr.sort.map((x) => 'sort:' + x.w));
        }
        if (dr.phrase) {
          blocks.push(cream('data-lcs-phrasecard="1"', label(`${num(2)}${LINE.phrase}`) + dr.phrase.map((g) =>
            `<div data-lcs-phrasegroup="${g.base}" style="display:grid;grid-template-columns:145px ${PHRASE_ROW}px ${PHRASE_ROW}px;justify-content:space-between;align-items:end;gap:4px 10px">` +
            `<div data-lcs-pairlabel data-lcs-read style="font:700 20px/1.25 'Nunito',sans-serif;color:${T.ink};padding-bottom:22px">${teal(g.base)} or ${teal(P[g.base])}:</div>` +
            g.cells.map((c) => { const [a, b2] = pr(c.frame).split('___'); return `<div data-lcs-phrase="${c.answer}" data-lcs-pkind="${c.kind}" data-lcs-frame="${esc(c.frame)}" style="display:flex;flex-direction:column;gap:2px"><div data-lcs-frametext data-lcs-read style="font:700 ${SFONT}px/1.3 'Nunito',sans-serif;color:${T.ink};white-space:nowrap;padding-left:6px">${esc(a)}<span data-lcs-blank style="display:inline-block;width:60px;height:1.05em;border-bottom:3px solid ${T.ink};vertical-align:baseline;margin:0 2px"></span>${esc(b2)}</div>${row(PHRASE_ROW, c.answer, key)}</div>`; }).join('') + `</div>`).join(''), d.pad));
          items.push(...dr.phrase.map((g) => 'phrase:' + g.base));
        }
        if (dr.write) {
          const wt = dr.write, half = wt.sample.split(/(?<=\.) /);
          blocks.push(cream(`data-lcs-writecard="${wt.base}|${wt.adverb}"`, label(`${num(2)}Write two sentences. Use ${teal(wt.base)} in one and ${teal(wt.adverb)} in the other.`) +
            [0, 1].map((i) => `<div data-lcs-own="${i + 1}" style="display:flex;flex-direction:column;gap:3px">${sampleLine(half[i], key)}${row(W - 24)}${row(W - 24)}</div>`).join(''), d.pad));
          items.push('write:' + wt.base);
        }
      }

      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-wcpage="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + items.slice(0, 3).join(','), items },
      };
    },

    async verify(page) {
      return page.evaluate((CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-wcpage]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsWcpage.split('|'), lv = +lvS, d = CFG.LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const rb = R(root);
        const txt = (e) => (e ? e.textContent.replace(/\s+/g, ' ').trim() : '');
        const TEAL = 'rgb(20, 107, 94)';
        const THING = Object.fromEntries(CFG.things.map((t) => [t.id, t]));
        // the instruction at the top of the page is the one of this level
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page'); else if (txt(instr) !== CFG.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        // ligatures off on the whole page (fi, ff, fl), and room after an f
        const ligOff = (e) => cs(e).fontVariantLigatures === 'none' && /"liga" 0/.test(cs(e).fontFeatureSettings);
        if (!ligOff(root)) fails.push('the page does not turn ligatures off');
        if (root.dataset.lcsNoliga !== '1') fails.push('the page root does not carry data-lcs-noliga');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[ifl]/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, or ff joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg') && /f[ifl]/.test(n.textContent)) { fails.push('an f before i, f, or l has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        // printed text uses typographic apostrophes and quotes
        { const tw = document.createTreeWalker(document.querySelector('[data-lcs-page]'), NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/['"]/.test(n.textContent) && !n.parentElement.closest('style')) { fails.push('a straight apostrophe or quote is printed: "' + n.textContent.trim().slice(0, 30) + '"'); break; } }
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 56) fails.push('a picture smaller than 56 px'); });
        const pics = [...document.querySelectorAll('img[data-lcs-pic]')];
        if (new Set(pics.map((i) => i.dataset.lcsPic)).size !== pics.length) fails.push('a picture stands twice on the page');
        if (new Set(pics.map((i) => i.dataset.lcsKind)).size !== pics.length) fails.push('two pictures of one kind on the page');
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const below = i + 1 < blocks.length ? R(blocks[i + 1]).top : rb.bottom, gap = below - R(b).bottom; if (gap > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(gap)} px ${i + 1 < blocks.length ? 'between two tasks' : 'under the last task'}, not ${CFG.BAND} or less`); });
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, [data-lcs-line] svg').forEach((e) => { if (e.closest('[data-lcs-seg], [data-lcs-arrowhead]')) return; const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < CFG.ROW - 0.5) fails.push(`a writing row lower than ${CFG.ROW} px`); });
        lines.forEach((l) => { const s = l.querySelector('svg'), t = s && s.querySelector('text'); if (t && (t.hasAttribute('textLength') || R(t).width > R(s).width - 8 || R(t).right > R(s).right - 2)) fails.push('an answer is wider than its row: ' + t.textContent); });
        lines.forEach((l) => { const t = l.querySelector('text'); if (!isKey && t) fails.push('a row is written on the page of the child'); });
        document.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 19) fails.push('text a second grader reads is smaller than 19 px'); });
        document.querySelectorAll('[data-lcs-pill]').forEach((e) => { if (fs(e) < 20) fails.push('a word to choose is smaller than 20 px'); });
        document.querySelectorAll('[data-lcs-tail]').forEach((e) => { const p = e.previousElementSibling; if (!p || R(e).left - R(p).right > 1.5 || R(e).left < R(p).right - 0.5) fails.push('a period does not stand tight against its word, outside it'); });
        // a starter printed on its row: it stands on the row's base rule, left of its lines
        document.querySelectorAll('[data-lcs-onrow]').forEach((e) => { const sw = e.querySelector('[data-lcs-starterword]'), svg = e.querySelector('[data-lcs-line] svg'); if (!sw || !svg) { fails.push('a starter has no row'); return; }
          const probe = document.createElement('span'); probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; sw.appendChild(probe); const base = R(probe).top; probe.remove();
          const ys = [...svg.querySelectorAll('line')].filter((l) => l.getAttribute('y1') === l.getAttribute('y2')).map((l) => +l.getAttribute('y1')).sort((a, b) => a - b);
          const rule = R(svg).top + ys[ys.length - 1] * (R(svg).height / +svg.getAttribute('height'));
          if (Math.abs(base - rule) > 2.5) fails.push(`a starter stands ${Math.round(base - rule)} px off the base rule of its row`);
          const rg = document.createRange(); rg.selectNodeContents(sw); if (rg.getBoundingClientRect().right > R(svg).left + 1) fails.push('a starter runs into the lines of its row');
          if (R(svg).width < 300) fails.push('a starter leaves less than 300 px to write'); });
        // the key rings what is right and nothing else; the page of the child rings nothing
        const ringed = (e) => cs(e).borderTopColor === TEAL && parseFloat(cs(e).borderTopWidth) >= 2.5;
        document.querySelectorAll('[data-lcs-pill], [data-lcs-opt], [data-lcs-chip]').forEach((e) => { if (ringed(e) !== (isKey && e.dataset.lcsOk === '1')) fails.push(isKey ? 'the key does not ring exactly the right answers' : 'the page of the child rings an answer'); });
        if (!isKey && document.querySelector('[data-lcs-keynote], [data-lcs-sample], [data-lcs-boxsample], [data-lcs-anyorder], [data-lcs-seg], [data-lcs-arrowhead]')) fails.push('the page of the child shows something of the key');
        // a key's text fits where it stands (a sample line is one line inside its card)
        document.querySelectorAll('[data-lcs-sample], [data-lcs-keynote], [data-lcs-anyorder]').forEach((e) => { const rg = document.createRange(); rg.selectNodeContents(e); const q = rg.getBoundingClientRect(), card = R(e.closest('[data-lcs-label]') || [...root.children].find((b) => b.contains(e))); if (e.scrollWidth > e.clientWidth + 1 || q.right > card.right + 0.5 || q.left < card.left - 0.5 || (e.matches('[data-lcs-sample]') && new Set([...rg.getClientRects()].filter((r) => r.width).map((r) => Math.round(r.bottom))).size > 1)) fails.push('a sample of the key does not fit its line: ' + e.textContent.slice(0, 40)); });
        const labelIs = (card, want) => { const l = card && card.querySelector('[data-lcs-label]'); const t = l ? txt(l).replace(/^\d+\. /, '') : ''; return t === want || (isKey && /^(.*) Sample answers\.$/.test(t) && t.replace(/ Sample answers\.$/, '') === want); };
        const pageWords = new Set();
        const cover = (t) => [...t.fits, ...t.also].filter((x) => pageWords.has(x));
        const oneOf = (t) => { const f = cover(t); return f.length === 1 && t.fits.includes(f[0]) ? f[0] : null; };
        const usedThings = new Set();
        // places: never three in a row in one place, never four alternating, never a staircase
        const placeCheck = (p, what, three) => {
          if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) fails.push(`three ${what} in a row stand in one place`);
          if (p.some((x, i) => i >= 3 && x !== p[i - 1] && p[i - 2] === x && p[i - 3] === p[i - 1])) fails.push(`four ${what} alternate their places`);
          if (three && p.some((x, i) => i >= 2 && ((p[i - 2] + 1 === p[i - 1] && p[i - 1] + 1 === x) || (p[i - 2] - 1 === p[i - 1] && p[i - 1] - 1 === x)))) fails.push(`the ${what} stand in a staircase`);
          if (new Set(p).size < Math.min(three ? 3 : 2, p.length)) fails.push(`the ${what} do not use every place`);
        };

        if (mode === 'reallife') {
          if (lv === 1) {
            const card = document.querySelector('[data-lcs-picrows]');
            if (!labelIs(card, CFG.LINE.picrows)) fails.push('task 1 has not its line');
            const rows = [...document.querySelectorAll('[data-lcs-picrow]')];
            if (rows.length !== d.words) fails.push(`${rows.length} words with pictures, not ${d.words}`);
            rows.forEach((r) => pageWords.add(r.dataset.lcsPicrow));
            const places = [];
            rows.forEach((r) => { const w = r.dataset.lcsPicrow, opts = [...r.querySelectorAll('[data-lcs-opt]')], ok = opts.filter((o) => o.dataset.lcsOk === '1');
              if (txt(r.querySelector('[data-lcs-head]')) !== w || !CFG.words.includes(w)) fails.push(`the word "${w}" is not printed at the head of its row`);
              if (opts.length !== 3 || ok.length !== 1) { fails.push(`the row of "${w}" has not three pictures and one right one`); return; }
              opts.forEach((o) => { const t = THING[o.dataset.lcsOpt]; usedThings.add(o.dataset.lcsOpt); if (!t || !t.pic || txt(o.querySelector('[data-lcs-name]')) !== t.n || o.querySelector('img').dataset.lcsPic !== t.id) fails.push(`a picture of the row of "${w}" is not its thing with its name`); });
              places.push(opts.indexOf(ok[0])); });
            rows.forEach((r) => { const w = r.dataset.lcsPicrow; [...r.querySelectorAll('[data-lcs-opt]')].forEach((o) => { const t = THING[o.dataset.lcsOpt]; if (!t) return; const one = oneOf(t); if (o.dataset.lcsOk === '1' ? one !== w : cover(t).includes(w) || (cover(t).length && !one)) fails.push(`"${t.n}" in the row of "${w}": ${o.dataset.lcsOk === '1' ? 'not described by that word alone' : 'that word could describe it, or two words of the page'}`); }); });
            placeCheck(places, 'right pictures', true);
          }
          if (lv === 2) {
            const mw = [...document.querySelectorAll('[data-lcs-mword]')], mt = [...document.querySelectorAll('[data-lcs-mthing]')];
            if (!labelIs(document.querySelector('[data-lcs-matchcard]'), CFG.LINE.match)) fails.push('task 1 has not its line');
            if (mw.length !== d.words || mt.length !== d.words + 1) fails.push(`not ${d.words} words and ${d.words + 1} things to match`);
            mw.forEach((e) => pageWords.add(e.dataset.lcsMword));
            const off = [];
            mw.forEach((e) => { const w = e.dataset.lcsMword, m = mt.find((x) => x.dataset.lcsFor === w), t = m && THING[m.dataset.lcsMthing];
              if (!m || !t || oneOf(t) !== w || txt(m.querySelector('[data-lcs-name]')) !== t.n || txt(e) !== w) fails.push(`"${w}" is not matched to a thing only it describes`);
              if (m) { const o = (R(m).top + R(m).height / 2) - (R(e).top + R(e).height / 2); if (Math.abs(o) < 18) fails.push(`"${w}" stands straight across from its thing`); off.push(Math.round(o / 10)); } });
            if (new Set(off).size < 3) fails.push('the lines of the matching take fewer than three different offsets');
            const lo = mt.filter((x) => x.dataset.lcsLeftover === '1');
            if (lo.length !== 1 || (lo[0] && cover(THING[lo[0].dataset.lcsMthing]).length)) fails.push('not one picture left over that no word of the page describes');
            mt.forEach((m) => usedThings.add(m.dataset.lcsMthing));
            const kl = [...document.querySelectorAll('[data-lcs-keyline]')]; if (kl.length !== (isKey ? d.words : 0)) fails.push(`${kl.length} lines are drawn`);
            if (lo[0] && kl.some((l) => +l.dataset.lcsKeyline.split('-')[1] === +lo[0].dataset.lcsRow)) fails.push('the key draws a line to the leftover picture');
            const dots = document.querySelectorAll('[data-lcs-gutter] circle').length; if (dots !== 2 * d.words + 1) fails.push('the leftover picture has no dot (it would show which one is left over)');
          }
          if (lv === 3) {
            const rows = [...document.querySelectorAll('[data-lcs-tworow]')];
            if (!labelIs(document.querySelector('[data-lcs-tworows]'), CFG.LINE.two)) fails.push('task 1 has not its line');
            if (rows.length !== d.words) fails.push(`${rows.length} words with things, not ${d.words}`);
            rows.forEach((r) => pageWords.add(r.dataset.lcsTworow));
            if (![...pageWords].some((w) => w === 'calm' || w === 'gloomy')) fails.push('level 3 has neither calm nor gloomy');
            const pairs = [];
            rows.forEach((r) => { const w = r.dataset.lcsTworow, ch = [...r.querySelectorAll('[data-lcs-chip]')];
              if (ch.length !== 4 || ch.filter((c) => c.dataset.lcsOk === '1').length !== 2) { fails.push(`the row of "${w}" has not four things and two right ones`); return; }
              ch.forEach((c) => { const t = THING[c.dataset.lcsChip]; usedThings.add(c.dataset.lcsChip); const one = t && oneOf(t); if (!t || txt(c) !== t.a.replace(/'/g, '’')) fails.push(`a thing of the row of "${w}" is not printed as in the bank`); else if (c.dataset.lcsOk === '1' ? one !== w : cover(t).includes(w) || (cover(t).length && !one)) fails.push(`"${t.a}" in the row of "${w}": ${c.dataset.lcsOk === '1' ? 'not described by that word alone' : 'that word could describe it, or two words of the page'}`); });
              pairs.push(ch.map((c, i) => (c.dataset.lcsOk === '1' ? i : -1)).filter((i) => i >= 0).join('')); });
            if (pairs.some((p, i) => i && p === pairs[i - 1])) fails.push('two rows in a row have their right things in the same two places');
            if (new Set(pairs).size < 3) fails.push('the right things of the rows take fewer than three pairs of places');
            if ([0, 1, 2, 3].some((q) => !pairs.some((p) => p.includes(String(q))))) fails.push('a place of the rows never holds a right thing');
            // every word has its own band: a rule between two bands, and room between the things of one and of the next
            rows.forEach((r, i) => { if (!i) return; const prev = [...rows[i - 1].querySelectorAll('[data-lcs-chip]')], next = [...r.querySelectorAll('[data-lcs-chip]')];
              const gap = Math.min(...next.map((c) => R(c).top)) - Math.max(...prev.map((c) => R(c).bottom));
              if (parseFloat(cs(r).borderTopWidth) < 2 || cs(r).borderTopStyle !== 'solid' || gap < 14) fails.push(`the things of "${rows[i - 1].dataset.lcsTworow}" and "${r.dataset.lcsTworow}" are not parted by a rule and ${14} px (${Math.round(gap)})`);
              const inner = [...r.querySelectorAll('[data-lcs-chip]')].map((c) => R(c).top).sort((a, b) => a - b); const rowGap = inner[inner.length - 1] - inner[0] - R(next[0]).height; if (rowGap > gap - 6) fails.push(`the two lines of things of "${r.dataset.lcsTworow}" stand as far apart as two words`);
              const h = R(r.querySelector('[data-lcs-head]')), cb = next.map(R); if (h.top < Math.min(...cb.map((q) => q.top)) - 4 || h.bottom > Math.max(...cb.map((q) => q.bottom)) + 4) fails.push(`the word "${r.dataset.lcsTworow}" does not stand beside its own things`); });
          }
          if (usedThings.size !== document.querySelectorAll('[data-lcs-opt], [data-lcs-mthing], [data-lcs-chip]').length) fails.push('a thing stands twice on the page');
          CFG.apart.forEach((p) => { if (p.every((w) => pageWords.has(w))) fails.push(`${p.join(' and ')} stand on one page`); });
          // on a page that prints smooth, every other thing is rough, fuzzy, spiky, or bumpy, or has nothing to touch
          if (pageWords.has('smooth')) [...document.querySelectorAll('[data-lcs-opt], [data-lcs-mthing], [data-lcs-chip]')].forEach((e) => { const t = THING[e.dataset.lcsOpt || e.dataset.lcsMthing || e.dataset.lcsChip]; if (t && oneOf(t) !== 'smooth' && !CFG.OK_SURF.includes(t.surface)) fails.push(`"${t.a}" is smooth to the touch on a page that prints smooth (beside smooth stand only rough, fuzzy, spiky, or bumpy things and things with nothing to touch)`); });
          // the sentences
          const sc = document.querySelector('[data-lcs-sentcard]');
          if (!labelIs(sc, CFG.LINE.sents)) fails.push('task 2 has not its line');
          const sn = [...document.querySelectorAll('[data-lcs-sent]')];
          if (sn.length !== d.sents) fails.push(`${sn.length} sentences, not ${d.sents}`);
          const places = [], answers = [];
          let longest = 0;
          sn.forEach((e) => { const bank = CFG.sentences.find((s) => s.text === e.dataset.lcsText), ch = [...e.querySelectorAll('[data-lcs-pill]')], ok = ch.filter((c) => c.dataset.lcsOk === '1'), a = e.dataset.lcsAnswer;
            if (!bank) { fails.push('a sentence is not a sentence of the bank'); return; }
            const seen = txt(e.querySelector('[data-lcs-stext]')).replace(/\s/g, ''), want = bank.text.replace('___', '').replace(/'/g, '’').replace(/\s/g, '');
            if (seen !== want || !e.querySelector('[data-lcs-blank]')) fails.push(`the sentence "${bank.text}" is not printed with its gap`);
            const fits = bank.fits.filter((x) => pageWords.has(x));
            if (fits.length !== 1 || fits[0] !== a || a !== bank.fits[0]) fails.push(`"${bank.text}": not exactly one word of the page fits it, or not the word it was written for (${fits.join(', ') || 'none'})`);
            if (bank.about.some((x) => usedThings.has(x))) fails.push(`"${bank.text}" names a thing of task 1`);
            if (ch.length !== d.choices || ok.length !== 1 || txt(ok[0]) !== a || ch.some((c) => !pageWords.has(txt(c))) || new Set(ch.map(txt)).size !== ch.length) fails.push(`the words under "${bank.text}" are not ${d.choices} words of the page with one right one`);
            if (/(^|\s)[Aa] ___/.test(bank.text) && ch.some((c) => /^[aeiou]/.test(txt(c)))) fails.push(`"${bank.text}": a word that starts with a vowel is offered after "a"`);
            if (ok[0] && ch.every((c) => c === ok[0] || txt(c).length < txt(ok[0]).length)) longest++;
            places.push(ch.indexOf(ok[0])); answers.push(a); });
          if (new Set(answers).size !== answers.length) fails.push('two sentences take one word');
          if (longest > Math.floor(d.sents / 2)) fails.push(`the right word is the longest in ${longest} of ${d.sents} sentences`);
          placeCheck(places, 'right words of the sentences', d.choices === 3);
        }

        if (mode === 'drawwrite') {
          const card = document.querySelector('[data-lcs-boxcard]');
          if (!labelIs(card, CFG.LINE.boxes)) fails.push('task 1 has not its line');
          const cells = [...document.querySelectorAll('[data-lcs-dcell]')];
          if (cells.length !== d.words) fails.push(`${cells.length} words to draw for, not ${d.words}`);
          cells.forEach((c) => { const w = c.dataset.lcsDcell; pageWords.add(w); const bx = [...c.querySelectorAll('[data-lcs-box]')];
            if (!CFG.words.includes(w) || txt(c.querySelector('[data-lcs-head]')) !== w) fails.push(`"${w}" is no describing word printed over its boxes`);
            if (bx.length !== 2) fails.push(`"${w}" has not two boxes`);
            bx.forEach((b) => { const q = R(b); if (q.height < CFG.BOX_MIN[lv] - 1 || q.width < 150) fails.push(`a box to draw in is ${Math.round(q.width)} by ${Math.round(q.height)} px, not 150 by ${CFG.BOX_MIN[lv]} or more`);
              const s = b.querySelector('[data-lcs-boxsample]');
              if (isKey) { const t = s && CFG.thingsByA[s.dataset.lcsBoxsample]; if (!t || !t.fits.includes(w) || !CFG.wordSamples[w].includes(s.dataset.lcsBoxsample)) fails.push(`the sample in a box of "${w}" is no thing it describes`); if (s) { const r = R(s); if (r.left < q.left || r.right > q.right || r.top < q.top || r.bottom > q.bottom) fails.push('a sample leaves its box'); } } }); });
          if (new Set(cells.map((c) => c.dataset.lcsDcell)).size !== cells.length) fails.push('a word stands twice');
          if (lv === 1) {
            const st = [...document.querySelectorAll('[data-lcs-finish]')];
            if (!labelIs(document.querySelector('[data-lcs-startcard]'), CFG.LINE.starters)) fails.push('task 2 has not its line');
            if (st.length !== d.starters) fails.push(`${st.length} sentences to finish, not ${d.starters}`);
            st.forEach((e) => { const w = e.dataset.lcsFinish, ln = e.querySelector('[data-lcs-line]'), t = ln && ln.querySelector('text');
              if (!pageWords.has(w) || !e.hasAttribute('data-lcs-onrow') || txt(e.querySelector('[data-lcs-starterword]')) !== CFG.starters[w]) fails.push(`the sentence to finish for "${w}" is not its starter on its row`);
              if (isKey && (!t || t.textContent !== CFG.fills[w])) fails.push(`the key gives no sample end for "${w}"`); });
          }
          if (lv === 2) {
            const own = [...document.querySelectorAll('[data-lcs-own]')];
            if (!labelIs(document.querySelector('[data-lcs-owncard]'), CFG.LINE.own)) fails.push('task 2 has not its line');
            if (own.length !== d.own || own.some((e) => e.querySelectorAll('[data-lcs-line]').length !== 2 || [...e.querySelectorAll('[data-lcs-line] svg')].some((s) => R(s).width < 600))) fails.push('the sentence to write has not two rows the width of the page');
            own.forEach((e) => { const w = e.dataset.lcsSampleword, s = e.querySelector('[data-lcs-sample]'); if (!pageWords.has(w)) fails.push('the sample sentence does not use a word of part 1'); if (isKey ? !s || s.dataset.lcsSample !== CFG.says[w] : !!s) fails.push('the key gives no sample sentence with its word'); });
          }
          if (lv === 3) {
            const rc = document.querySelector('[data-lcs-riddlecard]'), rw = rc ? rc.dataset.lcsRiddlecard.split(',') : [];
            if (!labelIs(rc, CFG.LINE.riddle)) fails.push('task 2 has not its line');
            if (rw.length !== 2 || rw.some((w) => !pageWords.has(w))) fails.push('the riddle does not use two words of part 1');
            const rr = rc && rc.querySelector('[data-lcs-riddle]');
            if (!rr || rr.querySelectorAll('[data-lcs-line]').length !== 2) fails.push('the riddle has not two rows');
            const iam = rr && rr.querySelector('[data-lcs-iam] [data-lcs-starterword]');
            if (!iam || txt(iam) !== 'I am' || cs(iam).color !== 'rgb(138, 130, 118)' || rr.querySelector('[data-lcs-line]') !== rr.querySelector('[data-lcs-iam] [data-lcs-line]')) fails.push('the first riddle row does not start with a grey "I am"');
            const wh = rc && rc.querySelector('[data-lcs-what]');
            if (!wh || !/^What am I\?$/.test(txt(wh.querySelector('[data-lcs-read]'))) || !wh.querySelector('[data-lcs-line]')) fails.push('the riddle has no answer row after "What am I?"');
            const smp = rc && rc.querySelector('[data-lcs-sample]');
            const bank = CFG.riddles.find((r) => r.words.join() === rw.join());
            if (isKey ? !smp || !bank || smp.dataset.lcsSample !== bank.text.replace(/'/g, '’') : !!smp) fails.push('the key gives no sample riddle with the two words');
          }
          lines.forEach((l) => { const t = l.querySelector('text'); if (isKey && t && !l.closest('[data-lcs-finish], [data-lcs-what]')) fails.push('a row of the child\'s own sentence is written on the key (a sample stands above it)'); });
        }

        if (mode === 'adjadv') {
          const P = CFG.pairs;
          const card = document.querySelector('[data-lcs-adjcard]');
          if (!labelIs(card, CFG.LINE.adj)) fails.push('task 1 has not its line');
          const rows = [...document.querySelectorAll('[data-lcs-arow]')];
          if (rows.length !== d.sents) fails.push(`${rows.length} sentences, not ${d.sents}`);
          const kinds = [], places = [], dirs = [], bases = [], printed = [], who = [];
          let longer = 0, good = 0, well = 0;
          rows.forEach((r) => {
            const bank = CFG.adjs.find((s) => s.text === r.dataset.lcsText);
            if (!bank) { fails.push('a sentence is not a sentence of the bank'); return; }
            const isGW = bank.base === 'good';
            const right = isGW ? bank.form : bank.kind === 'adj' ? bank.base : P[bank.base], wrong = isGW ? (bank.form === 'good' ? 'well' : 'good') : bank.kind === 'adj' ? P[bank.base] : bank.base;
            const pills = [...r.querySelectorAll('[data-lcs-pill]')], ok = pills.filter((p) => p.dataset.lcsOk === '1');
            if (pills.length !== 2 || ok.length !== 1 || txt(ok[0]) !== right || pills.map(txt).sort().join() !== [right, wrong].sort().join()) fails.push(`"${bank.text}" is not keyed to ${right} between ${right} and ${wrong}`);
            const line = r.querySelector('[data-lcs-aline]');
            const seen = txt(line).replace(/\s/g, ''), want = bank.text.replace('___', pills.map(txt).join('')).replace(/'/g, '’').replace(/\s/g, '');
            if (seen !== want) fails.push(`"${bank.text}" is not printed as in the bank`);
            if (d.pic) { const im = r.querySelector('img'); if (!im || !bank.pic || im.dataset.lcsPic !== bank.pic[1]) fails.push(`"${bank.text}" has not its picture`); } else if (r.querySelector('img')) fails.push('a sentence has a picture on a level without pictures');
            const toks = [...line.querySelectorAll('[data-lcs-tok]')];
            if (toks.some((t) => Math.abs(R(t).top - R(toks[0]).top) > 1)) fails.push(`"${bank.text}" takes two lines`);
            if (parseFloat(cs(line).paddingTop) < d.room - 0.5 || d.room < CFG.ROOM) fails.push(`"${bank.text}" has less than ${CFG.ROOM} px of room above it for the arrow`);
            const top = R(toks[0]).top, lft = R(toks[0]).left, rgt = R(toks[toks.length - 1]).right;
            [...root.querySelectorAll('*')].forEach((e) => { if (line.contains(e) || e.contains(line) || e.closest('[data-lcs-seg], [data-lcs-arrowhead]') || e.children.length) return; const q = R(e); if (q.width && q.bottom > top - d.room + 1 && q.top < top - 1 && q.right > lft && q.left < rgt) fails.push(`something stands in the room above "${bank.text}"`); });
            // the arrow of the key: from the circled word to the word it tells about, landing on it
            const tgt = line.querySelector('[data-lcs-tgt]');
            if (!tgt || txt(tgt) !== r.dataset.lcsTarget || r.dataset.lcsTarget !== bank.target.replace(/'/g, '’')) fails.push(`"${bank.text}" does not mark the word it tells about`);
            const segs = [...line.querySelectorAll('[data-lcs-seg]')], head = line.querySelector('[data-lcs-arrowhead]');
            if (!isKey) { if (segs.length || head) fails.push('an arrow is drawn on the page of the child'); }
            else if (!head || !tgt || !ok[0]) fails.push(`the key draws no arrow for "${bank.text}"`);
            else {
              const h = R(head), tip = { x: h.left + h.width / 2, y: h.bottom }, tr = R(tgt);
              const tr2 = (() => { let L = 1e9, Rr = -1e9, Tp = 1e9; const tw = document.createTreeWalker(tgt, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) { if (n.parentElement.closest('[data-lcs-seg], [data-lcs-arrowhead]')) continue; const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect(); if (!q.width) continue; L = Math.min(L, q.left); Rr = Math.max(Rr, q.right); Tp = Math.min(Tp, q.top); } return { left: L, right: Rr, top: Tp }; })();
              if (tip.x < tr2.left + 2 || tip.x > tr2.right - 2 || tip.y < tr.top - 6 || tip.y > tr2.top + 6) fails.push(`the arrow for "${bank.text}" does not land on "${bank.target}"`);
              const or = R(ok[0]);
              const st = R(line.querySelector('[data-lcs-segstart]') || head);
              const sx = r.dataset.lcsDir === 'r' ? st.left : st.right;
              if (sx < or.left + 4 || sx > or.right - 4) fails.push(`the arrow for "${bank.text}" does not start at the circled word`);
              const xs = segs.map(R).sort((a, b) => a.left - b.left);
              if (xs.some((q, i) => i && q.left > xs[i - 1].right + 1.5) || xs.some((q) => Math.abs(q.top - xs[0].top) > 1)) fails.push(`the arrow for "${bank.text}" is broken`);
              const lo = Math.min(...xs.map((q) => q.left)), hi = Math.max(...xs.map((q) => q.right));
              if (lo > Math.min(sx, tip.x) + 3 || hi < Math.max(sx, tip.x) - 3) fails.push(`the arrow for "${bank.text}" does not reach from the word to its target`);
              if (r.dataset.lcsDir !== (tr.left > or.left ? 'r' : 'l')) fails.push(`the arrow for "${bank.text}" points the wrong way`);
            }
            kinds.push(bank.kind); places.push(pills.indexOf(ok[0])); dirs.push(r.dataset.lcsDir);
            if (isGW) { who.push(bank.who); if (bank.form === 'good') good++; else well++; } else bases.push(bank.base);
            printed.push(...pills.map(txt));
            if (ok[0] && txt(ok[0]).length > txt(pills.find((p) => p !== ok[0]) || ok[0]).length) longer++;
          });
          if (new Set(kinds).size < 2) fails.push('the sentences take only adjectives or only adverbs');
          if (kinds.some((x, i) => i >= 2 && x === kinds[i - 1] && x === kinds[i - 2])) fails.push('three sentences in a row take one kind');
          if (kinds.some((x, i) => i >= 3 && x !== kinds[i - 1] && kinds[i - 2] === x && kinds[i - 3] === kinds[i - 1])) fails.push('four sentences alternate their kinds');
          if (longer > Math.floor(d.sents / 2)) fails.push(`the right word is the longer one in ${longer} of ${d.sents} sentences`);
          if (!dirs.includes('l') || !dirs.includes('r')) fails.push('the arrows of the page all point one way');
          placeCheck(places, 'right words', false);
          if ((d.gw || 0) ? good !== 1 || well !== 1 || new Set(who).size !== 2 : good + well) fails.push(d.gw ? 'level 3 has not one sentence with good and one with well, of two people' : 'good or well stands before level 3');
          if (lv === 1 && kinds.filter((k) => k === 'adv').length !== d.adv) fails.push(`not ${d.adv} sentences that take the adverb`);
          if (lv === 3 && printed.some((w) => w === 'happy' || w === 'happily')) fails.push('happy stands on level 3');
          const safeForms = new Set([...CFG.safe, ...CFG.safe.map((b) => P[b])]);
          if (d.sort) {
            const sw = [...document.querySelectorAll('[data-lcs-sortword]')];
            if (!labelIs(document.querySelector('[data-lcs-sortcard]'), CFG.LINE.sort)) fails.push('the sort has not its line');
            const adj = sw.filter((e) => P[e.dataset.lcsSortword] && e.dataset.lcsCol === 'adj'), adv = sw.filter((e) => Object.values(P).includes(e.dataset.lcsSortword) && e.dataset.lcsCol === 'adv');
            if (sw.length !== d.sort || adj.length !== 2 || adv.length !== 2) fails.push('the words to sort are not two adjectives and two adverbs');
            sw.forEach((e) => { const w = e.dataset.lcsSortword, b = P[w] ? w : Object.keys(P).find((x) => P[x] === w); if (!safeForms.has(w)) fails.push(`"${w}" to sort has a flat adverb (it is an adverb too in good speech)`); if (bases.includes(b)) fails.push(`"${w}" to sort is a word of a sentence`); bases.push(b); printed.push(w); if (txt(e) !== w) fails.push('a word to sort is not printed'); if (/line-through/.test(cs(e).textDecorationLine) !== isKey) fails.push('the words to sort are ' + (isKey ? 'not ' : '') + 'crossed out'); });
            if (Math.max(...adj.map((e) => e.dataset.lcsSortword.length)) < Math.min(...adv.map((e) => e.dataset.lcsSortword.length))) fails.push('every adjective to sort is shorter than every adverb (length sorts them)');
            ['adj', 'adv'].forEach((c) => { const col = document.querySelector(`[data-lcs-column="${c}"]`), ls = col ? [...col.querySelectorAll('[data-lcs-line]')] : [];
              if (!col || txt(col.querySelector('[data-lcs-colhead]')) !== (c === 'adj' ? 'Adjective' : 'Adverb')) fails.push('a column of the sort has not its head bar');
              if (ls.length !== 2) fails.push('a column of the sort has not two rows');
              const want = sw.filter((e) => e.dataset.lcsCol === c).map((e) => e.dataset.lcsSortword).sort().join();
              if (isKey && ls.map((l) => l.dataset.lcsAnswer).sort().join() !== want) fails.push(`the key writes other words under ${c === 'adj' ? 'Adjective' : 'Adverb'}`); });
            if (isKey !== !!document.querySelector('[data-lcs-sortbank] [data-lcs-anyorder]')) fails.push('the key does not say "any order"');
          }
          if (d.phrase) {
            const gs = [...document.querySelectorAll('[data-lcs-phrasegroup]')];
            if (!labelIs(document.querySelector('[data-lcs-phrasecard]'), CFG.LINE.phrase)) fails.push('the frames have not their line');
            if (gs.length !== d.phrase) fails.push(`${gs.length} words with frames, not ${d.phrase}`);
            const orders = [];
            gs.forEach((g) => { const b = g.dataset.lcsPhrasegroup, fr = CFG.phrases[b], cells = [...g.querySelectorAll('[data-lcs-phrase]')];
              if (!fr || !CFG.safe.includes(b)) fails.push(`"${b}" has no frames, or a flat adverb`);
              if (bases.includes(b)) fails.push(`"${b}" of the frames is a word of a sentence`); bases.push(b); printed.push(b, P[b]);
              if (txt(g.querySelector('[data-lcs-pairlabel]')) !== `${b} or ${P[b]}:`) fails.push(`the frames of "${b}" do not name ${b} and ${P[b]}`);
              if (cells.length !== 2 || cells.map((c) => c.dataset.lcsPkind).sort().join() !== 'adj,adv') fails.push(`"${b}" has not an adjective frame and an adverb frame`);
              cells.forEach((c) => { const kd = c.dataset.lcsPkind, want = kd === 'adj' ? b : P[b], ln = c.querySelector('[data-lcs-line]');
                if (!fr || c.dataset.lcsFrame !== fr[kd] || c.dataset.lcsPhrase !== want || txt(c.querySelector('[data-lcs-frametext]')).replace(/\s/g, '') !== fr[kd].replace('___', '').replace(/\s/g, '')) fails.push(`a frame of "${b}" is not its ${kd} frame`);
                if (!ln || R(ln.querySelector('svg')).width < 220) fails.push(`a frame of "${b}" has no row to write on`);
                if (isKey && (!ln || ln.dataset.lcsAnswer !== want)) fails.push(`the key writes another word on the row of "${c.dataset.lcsFrame}"`); });
              orders.push(cells.map((c) => c.dataset.lcsPkind).join()); });
            if (orders.length === 2 && orders[0] === orders[1]) fails.push('both words take their frames in one order');
          }
          if (d.write) {
            const wc = document.querySelector('[data-lcs-writecard]'), [wb, wa] = wc ? wc.dataset.lcsWritecard.split('|') : [];
            if (!wc || P[wb] !== wa || !CFG.safe.includes(wb) || bases.includes(wb)) fails.push('the sentences to write are not one safe adjective and its adverb, unused on the page');
            else if (txt(wc.querySelector('[data-lcs-label]')) !== `2. Write two sentences. Use ${wb} in one and ${wa} in the other.`) fails.push('the task to write has not its line');
            printed.push(wb, wa);
            const own = wc ? [...wc.querySelectorAll('[data-lcs-own]')] : [];
            if (own.length !== 2 || own.some((e) => e.querySelectorAll('[data-lcs-line]').length !== 2)) fails.push('the two sentences to write have not two rows each');
            const smp = wc ? [...wc.querySelectorAll('[data-lcs-sample]')].map((e) => e.dataset.lcsSample).join(' ') : '';
            if (isKey ? smp !== (CFG.write[wb] || '').replace(/'/g, '’') : !!smp) fails.push('the key gives no sample with both words');
          }
          if (new Set(bases).size !== bases.length) fails.push('a word stands in two tasks of the page');
          // happy and happily stand with the rule y to i; good and well with theirs
          const y = !!document.querySelector('[data-lcs-rule="y"]'), needY = printed.some((w) => w === 'happy' || w === 'happily');
          if (y !== needY) fails.push(needY ? 'happy or happily stands without the rule "change the y to i"' : 'the rule "change the y to i" stands with no happy on the page');
          if (y && txt(document.querySelector('[data-lcs-rule="y"]')) !== CFG.RULE_Y) fails.push('the y to i rule is not its text');
          const g = !!document.querySelector('[data-lcs-rule="gw"]');
          if (g !== (good + well > 0) || (g && txt(document.querySelector('[data-lcs-rule="gw"]')) !== CFG.RULE_GW)) fails.push('good and well do not stand with their rule');
          if (/\b(fast|hard|early|late|high)\b/i.test(txt(root))) fails.push('a word that is adjective and adverb alike is printed');
        }
        return fails;
      }, { LEVELS, ROW, ROOM, BAND, BOX_MIN, OK_SURF, INSTR, LINE, RULE_Y, RULE_GW, apart: BANK.apart || [], words: DW, things: BANK.things, thingsByA: Object.fromEntries(BANK.things.map((t) => [t.a, t])), wordSamples: Object.fromEntries(DW.map((w) => [w, BANK.words[w].samples])), starters: Object.fromEntries(DW.map((w) => [w, pr(BANK.words[w].starter)])), fills: Object.fromEntries(DW.map((w) => [w, pr(BANK.words[w].fill)])), says: Object.fromEntries(DW.map((w) => [w, pr(BANK.words[w].say)])), sentences: BANK.sentences, riddles: BANK.riddles, pairs: BANK.adjadv.pairs, safe: BANK.adjadv.safe, phrases: BANK.adjadv.phrases, adjs: [...BANK.adjadv.sentences, ...BANK.adjadv.goodwell], write: BANK.adjadv.write });
    },
  };
}

module.exports = { makeWordChoiceType, wcFaultsOf, LEVELS, INSTR, LINE, fitsRow, drawReal, drawDraw, drawAdj };
