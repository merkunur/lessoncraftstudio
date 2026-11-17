/**
 * two-meanings-k.js — two Kindergarten pages for the lesson "Words with two meanings" (L.K.4.a) of the unit "Sorting,
 * Opposites, and Story Order" (English literacy year, Daily Teaching System Part 12.3, 2026-11-17; revised after the reading
 * specialist's review the same day: it stands beside the sorting and opposites lessons). The words are
 * data/literacy/two-meanings-k.en.json: only words for which the picture library holds a TRUE picture of each meaning
 * (bat, nail, palm, ear, heart; every picture looked at). Orange is out (the fruit is orange too, any orange picture is a
 * second right partner, and the colour is a drop that reads as juice); mouse, letter, glasses and fly were looked for and
 * the library lacks the second picture (the bank's refused list says what it has). The design's words with no picture of
 * their second meaning (duck, ring, bark, can) are model words for the teacher note and never stand on a page. The child
 * does not read: the teacher reads every word and sentence; what the teacher reads stands at the foot of the ANSWER KEY,
 * never on the child's page (a page copied whole would give the answers away). The key says "Answer key".
 *
 *   choose  K-683 Words with Two Meanings (day 1). One row a word: the word printed at the start of the row for the
 *           teacher, and the pictures of its two meanings. The teacher reads a sentence with the word, and the child
 *           circles the picture that shows what the word means in THAT sentence. Every sentence proves one meaning (the
 *           bank names the words that decide).
 *     level 1  three rows of two pictures (the two meanings)
 *     level 2  four rows of three pictures: the two meanings and one picture of something else, named in no sentence
 *     level 3  four rows of three pictures: the two meanings and a meaning of ANOTHER word of the page (a baseball bat in
 *              the nail row), so a word of the sentence may pull toward it. The teacher reads TWO sentences for each word:
 *              the child circles the picture for the first and draws a line under the picture for the second. In one or
 *              two rows both sentences tell the SAME meaning (both marks under one picture), so the second mark is never
 *              free; the task line and the key say so ("It may be the same picture.")
 *           The circled picture's place follows no pattern (never three in a row at one place, never a staircase, never a
 *           repeated block), and where a row has three pictures it is the only one of its class in at most half of the
 *           rows. All pictures of a row are one size. No other picture is one a word of the page pulls by association (a
 *           ball on a page with bat: the bank's assoc list).
 *   match   K-684 Two Pictures, One Word (day 2). Left: the word over a picture of its FAMILIAR meaning (the teacher reads
 *           it); right: the pictures of the new meanings in another order. The child draws a line to the other picture
 *           that the same word names. No partner stands straight across, and the partners are not all the same number of
 *           rows away. With five words, copy v takes the next set of words and the next line pattern of a fixed walk
 *           through all of them: two copies in a row never share a line pattern, and the first fourteen copies of a level
 *           are fourteen different sets of words.
 *     level 1  four words
 *     level 2  four words and one picture on the right with no partner (a thing named one way that is no meaning of a
 *              word), so the last line is not free; the key marks it "no partner"
 *     level 3  three words and one picture with no partner; then two more words, each with a picture of its new meaning
 *              and a box: the child draws the familiar meaning and says a sentence with the word to a partner (the key: a
 *              sample, what counts, and a sample sentence)
 *
 * Kindergarten sizes: pictures 60 px or more (the pictures to match on level 3 84 px or more; larger on the child's page
 * of K-683, which ends at its task, than on the key), read-aloud text 16 px or more. Ligatures are off (the rule stands
 * before the page root, which carries data-lcs-noliga), and an f before i, f, l or t gets room of its own. Typographic
 * quotes only. No page leaves a blank band of more than 40 px outside a box to draw in. The instruction of each level is
 * INSTR (registered as strings; verify() reads it on the page); verify() carries its OWN copy of every ruled text and measure
 * (SPEC). English only. Themeless: a copy draws other words, sentences and pictures. PDF only (the answer key is for checks
 * and review). The bank is checked when this file loads (tmFaultsOf), including trial draws of every level; nothing looks a
 * picture up while the file loads.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const BANK = require('../../data/literacy/two-meanings-k.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle } = _parts;
const T = TOK.color;
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const INNER = W - 24;
const MODES = ['choose', 'match'];

const INSTR = {
  choose: { 1: 'Some words have two meanings. The sentence tells which one.', 2: 'Some words have two meanings. The sentence tells which one.', 3: 'Some words have two meanings. The sentence tells which one.' },
  match: { 1: 'One word can name two different things.', 2: 'One word can name two different things.', 3: 'One word can name two different things.' },
};
const LINES = {
  choose: { 1: ['Your teacher reads a sentence with the word. Circle the picture that shows what the word means in the sentence.'],
    2: ['Your teacher reads a sentence with the word. Circle the picture that shows what the word means in the sentence.'],
    3: ['Your teacher reads two sentences with the word. Circle the picture for the first sentence. Draw a line under the picture for the second sentence. It may be the same picture.'] },
  match: { 1: ['Your teacher reads each word. Draw a line to the other picture that the same word names.'],
    2: ['Your teacher reads each word. Draw a line to the other picture that the same word names. One picture has no partner.'],
    3: ['Your teacher reads each word. Draw a line to the other picture that the same word names. One picture has no partner.', 'Draw the other meaning of each word. Say a sentence with the word to a partner.'] },
};
/** what the teacher reads stands at the foot of the ANSWER KEY, never on the child's page (review 2026-11-17, ruling B) */
const TSTRIP = 'For the teacher: read these lines aloud.';
const TSAY = 'Read each sentence two times.';
const TSAME = 'Sometimes both sentences use the same meaning: then both marks go under one picture.';
const TLAB = { s1: 'First sentence (children circle):', s2: 'Second sentence (children draw a line under):' };
const SAMPLE = 'Sample:', SAY = 'Sample sentence:', NOPART = 'no partner', KEYTAG = 'Answer key';

// pic: the pictures on the child's page (it ends at its task); kpic: on the answer key, which also holds the teacher lines.
// Matching (K-684): the word stands above its picture on the left, so the columns stand far apart (gw); level 2 has four
// words and one picture with no partner (five words in the bank: review 2026-11-17, M6)
const LEVELS = {
  choose: { 1: { rows: 3, opts: 2, pic: 170, kpic: 150 }, 2: { rows: 4, opts: 3, pic: 124, kpic: 104 }, 3: { rows: 4, opts: 3, pic: 110, kpic: 88, two: true, same: [1, 2] } },
  match: { 1: { pairs: 4, extra: 0, H: 720, gw: 230 }, 2: { pairs: 4, extra: 1, H: 720, gw: 230 }, 3: { pairs: 3, extra: 1, H: 416, gw: 230, draw: 2, drawH: 104, drawPic: 96 } },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
function blockRepeat(s) {
  for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
  const runs = String(s).match(/(.)\1*/g) || [];
  return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length);
}
function placesOk(p, k) {
  const n = p.length, s = p.join('');
  const need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
  if (new Set(p).size < need) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
  if (blockRepeat(s)) return false;
  const cap = n === 4 && k === 2 ? 3 : Math.floor((2 * n) / 3);
  if (n >= 3 && Math.max(...[...new Set(p)].map((v) => p.filter((x) => x === v).length)) > cap) return false;
  return true;
}
function seedRng(seed) { let x = seed >>> 0 || 1; const next = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; return { int: (a, c) => a + Math.floor(next() * (c - a + 1)) }; }
const wordsIn = (s) => String(s).toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
/** the picture of a meaning: its kind is word-meaning */
const kindOf = (w, m) => w + '-' + m.id;
/** the partner rows of a match: the y-centre of each left row and right row; a partner straight across is one whose centre
 *  lies within half a right row of its left row's centre */
function matchOk(perm, n, m, H) {
  const yl = (i) => (i + 0.5) * (H / n), yr = (j) => (j + 0.5) * (H / m);
  if (perm.some((j, i) => Math.abs(yr(j) - yl(i)) < (H / m) / 2 + 2)) return false;
  const off = perm.map((j, i) => Math.round((yr(j) - yl(i)) / (H / m)));
  if (new Set(off).size === 1) return false;
  return true;
}

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
function tmFaultsOf(b) {
  const f = [];
  const Wd = b.words || {}, F = b.fillers || {};
  const all = Object.keys(Wd), choose = all.filter((w) => Wd[w].choose);
  // the library holds a true picture of both meanings of five words only (bat, nail, palm, ear, heart): mouse, letter,
  // glasses and fly were looked for and are refused with what the library has (review 2026-11-17, M6 and ruling D)
  if (all.length < 5) f.push('words: fewer than five words with two meanings');
  if (choose.length < 5) f.push('words: fewer than five words a sentence can choose a meaning of');
  for (const w of ['mouse', 'letter', 'glasses', 'fly', 'orange']) if (!Wd[w] && !(b.refused || {})[w]) f.push(`"${w}": neither a word of the pages nor refused with a reason`);
  for (const w of Object.keys(b.refused || {})) if (Wd[w]) f.push(`"${w}" is a word of the pages and a refused one`);
  const kinds = new Set();
  for (const [w, x] of Object.entries(Wd)) {
    if (!/^[a-z]+$/.test(w) || !Array.isArray(x.m) || x.m.length !== 2) { f.push(`"${w}": not a word with two meanings`); continue; }
    for (const m of x.m) {
      if (!m.id || !Array.isArray(m.pic) || m.pic.length !== 2 || !m.pic.every((y) => typeof y === 'string' && y) || /bw( ?\d+)?$/i.test(m.pic[0]) || !m.cls) f.push(`"${w}" ${m.id}: not a colour picture with a class`);
      if (!m.draw || m.draw.length > 26 || !wordsIn(m.draw).includes(w)) f.push(`"${w}" ${m.id}: its short name for the key does not name the word (26 letters at most)`);
      if (kinds.has(kindOf(w, m))) f.push(`"${w}" ${m.id}: a picture kind stands twice`); kinds.add(kindOf(w, m));
      if (x.choose) {
        if ((m.sents || []).length < 3) f.push(`"${w}" ${m.id}: fewer than three sentences`);
        for (const [s, cue] of m.sents || []) {
          if (!/^[A-Z][^.!?]*[.]$/.test(s) || s.length > 56) f.push(`"${s}": not one sentence of 56 letters or fewer`);
          if (wordsIn(s).filter((t) => t === w).length !== 1) f.push(`"${s}": the word "${w}" does not stand in it once`);
          if (!cue || !s.includes(cue)) f.push(`"${s}": the words that decide its meaning are not in it`);
          for (const o of all) if (o !== w && wordsIn(s).includes(o)) f.push(`"${s}": it holds "${o}", another word of the pages`);
          for (const o of b.modelOnly || []) if (wordsIn(s).includes(o)) f.push(`"${s}": it holds the model word "${o}"`);
          if (/['"]/.test(s)) f.push(`"${s}": a straight apostrophe or quote`);
        }
      } else if ((m.sents || []).length) f.push(`"${w}": a word that is never chosen by a sentence has sentences`);
    }
    if (x.m.length === 2 && x.m[0].cls === x.m[1].cls) f.push(`"${w}": its two meanings are of one class`);
  }
  if (Object.keys(F).length < 16) f.push('fillers: fewer than sixteen');
  for (const [w, x] of Object.entries(F)) {
    if (!Array.isArray(x) || x.length !== 3 || /bw( ?\d+)?$/i.test(x[0])) f.push(`filler "${w}": not a colour picture with a class`);
    if (Wd[w]) f.push(`filler "${w}" is a word with two meanings`);
    if ((b.modelOnly || []).includes(w)) f.push(`filler "${w}" is a model word`);
  }
  if ((b.modelOnly || []).length < 3 || (b.modelOnly || []).some((w) => Wd[w])) f.push('modelOnly: fewer than three, or a word of the pages');
  for (const w of all) if (!Array.isArray((b.assoc || {})[w]) || b.assoc[w].some((x) => !F[x])) f.push(`assoc: "${w}" has no list of other pictures it pulls, or a name that is no other picture`);
  if (Object.keys(b.refused || {}).length < 10) f.push('refused: fewer than ten words looked at and left out');
  if ((b.banned || []).length < 10) f.push('banned: fewer than ten words');
  for (const w of all) if ((b.banned || []).includes(w)) f.push(`"${w}" is on the never list`);
  // the familiar meaning (null: both everyday), and for the key of the drawing task what counts and a sentence to say
  for (const [w, x] of Object.entries(Wd)) {
    if (!('familiar' in x) || (x.familiar !== null && !(x.m || []).some((m) => m.id === x.familiar))) f.push(`"${w}": its familiar meaning is not one of its meanings (or null)`);
    for (const m of x.m || []) if (!/^Accept [^.]+\.$/.test(m.accept || '') || !/^[A-Z][^.!?]*\.$/.test(m.say || '') || !wordsIn(m.say).includes(w)) f.push(`"${w}" ${m.id}: no "Accept ..." line or no sample sentence with the word`);
    // the key prints these three texts: a model word or a word of the never list in one of them reaches the key on every
    // page that draws this meaning (the ear's "My ear can hear the bell." did, 2026-11-17)
    for (const m of x.m || []) for (const t of [m.draw, m.accept, m.say]) for (const o of [...(b.modelOnly || []), ...(b.banned || [])]) if (wordsIn(t || '').includes(o)) f.push(`"${w}" ${m.id}: the key text "${t}" holds the model or never word "${o}"`);
  }
  if (f.length) return f;
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let s = 1; s <= 12; s++) {
    try { drawPage(b, mode, lv, seedRng(s * 7 + lv), s); } catch (e) { f.push(`${mode} level ${lv}: ${e.message}`); break; }
  }
  if (f.length) return f;
  // K-684: two copies in a row never share their line pattern, and the first fourteen copies of a level are fourteen
  // different sets of pairs (review 2026-11-17, S18; fourteen different child pages a level)
  for (const lv of [1, 2, 3]) {
    const plans = Array.from({ length: 14 }, (_, i) => drawPage(b, 'match', lv, seedRng(i * 7 + lv), i + 1));
    if (plans.some((p, i) => i && p.perm.join() === plans[i - 1].perm.join())) f.push(`match level ${lv}: two copies in a row have one line pattern`);
    const sets = plans.map((p) => [...p.pairs.map((x) => 'pair ' + x.word + ':' + x.left), ...p.draws.map((x) => 'draw ' + x.word + ':' + x.shown)].sort().join(','));
    if (new Set(sets).size < 14) f.push(`match level ${lv}: the first fourteen copies give ${new Set(sets).size} different sets of words`);
  }
  return f;
}

/* ---------------------------------------------------------------- the draws (pure: the bank check runs them too) ---------------------------------------------------------------- */
const gcd = (a, c) => (c ? gcd(c, a % c) : a);
/** the place of copy v in a fixed walk through `count` choices with a step prime to count: consecutive copies never share a
 *  choice, and the first `count` copies use every one (five words give few pages of K-684, and no copy may repeat the line
 *  pattern of the copy before it: review 2026-11-17, S18) */
function cycle(v, count, salt) { if (count < 2) return 0; let step = 7; while (gcd(step, count) !== 1) step++; return ((((v || 1) - 1) * step + salt) % count + count) % count; }
const subsets = (arr, size, start = 0, acc = []) => (acc.length === size ? [acc.slice()] : arr.slice(start).flatMap((x, i) => subsets(arr, size, start + i + 1, [...acc, x])));
/** every way to fill a matching page: which words are matched and which are drawn, and which meaning stands on the left of
 *  a pair (the familiar one: the new meaning is the partner to find) or is shown in a draw row (the new one: the child draws
 *  the familiar one); either for a word whose two meanings are both everyday (review 2026-11-17, S5) */
function matchCombos(Wd, n, k) {
  const out = [];
  for (const set of subsets(Object.keys(Wd).sort(), k)) for (const pw of subsets(set, n)) {
    let ways = [[]];
    for (const w of set) { const kind = pw.includes(w) ? 'pair' : 'draw', ms = Wd[w].m.map((x) => x.id), fam = Wd[w].familiar;
      const pick = fam ? [kind === 'pair' ? fam : ms.find((x) => x !== fam)] : ms;
      ways = ways.flatMap((wy) => pick.map((p) => [...wy, { w, kind, m: p }])); }
    out.push(...ways);
  }
  return out;
}
/** every order of the right column: the slot of each partner (pair i in slot perm[i]) with no partner straight across and
 *  not all the same number of rows away */
function arrangements(n, m, H) {
  const out = [], rec = (p) => { if (p.length === n) { if (matchOk(p, n, m, H)) out.push(p.slice()); return; } for (let j = 0; j < m; j++) if (!p.includes(j)) rec([...p, j]); };
  rec([]);
  return out;
}
function drawPage(b, mode, lv, rng, v) {
  const d = LEVELS[mode][lv], Wd = b.words, F = b.fillers;
  const all = Object.keys(Wd), choose = all.filter((w) => Wd[w].choose);
  const fillerOk = (fw, page, sents, words) => !page.includes(fw) && !sents.some((s) => wordsIn(s).includes(fw)) && !words.some((w) => ((b.assoc || {})[w] || []).includes(fw));
  if (mode === 'choose') {
    for (let t = 0; t < 3000; t++) {
      const ws = shuffle(choose, rng).slice(0, d.rows);
      // level 3: in one or two rows of four both sentences tell the SAME meaning, so both marks go under one picture and
      // the second mark is never free (review 2026-11-17, S3)
      const same = new Set(d.two ? shuffle(ws.map((_, i) => i), rng).slice(0, d.same[rng.int(0, d.same.length - 1)]) : []);
      const rows = ws.map((w, i) => {
        const r = rng.int(0, 1), ms = Wd[w].m, sr = shuffle(ms[r].sents, rng), o = same.has(i) ? r : 1 - r;
        const s2 = d.two ? (o === r ? sr[1][0] : ms[o].sents[rng.int(0, ms[o].sents.length - 1)][0]) : null;
        return { word: w, right: ms[r].id, alt: ms[1 - r].id, other: d.two ? ms[o].id : null, same: d.two && o === r, s1: sr[0][0], s2 };
      });
      // which meaning is right is mixed: never all rows the meaning listed first in the bank
      if (new Set(rows.map((x) => Wd[x.word].m.findIndex((m) => m.id === x.right))).size < 2) continue;
      const sents = rows.flatMap((x) => [x.s1, x.s2].filter(Boolean));
      const used = [];
      let ok = true;
      for (const x of rows) {
        const opts = [{ w: x.word, m: x.right }, { w: x.word, m: x.alt }];
        if (d.opts === 3 && !d.two) { const fw = shuffle(Object.keys(F), rng).find((fw) => fillerOk(fw, used, sents, ws)); if (!fw) { ok = false; break; } used.push(fw); opts.push({ w: fw, filler: true }); }
        // level 3: the third picture is a meaning of ANOTHER word of the page (a baseball bat in the nail row): a word of the
        // sentence may pull toward it, and only listening decides (review 2026-11-17, S3)
        if (d.two) { const c = shuffle(ws.filter((w2) => w2 !== x.word).flatMap((w2) => Wd[w2].m.map((mm) => w2 + '-' + mm.id)), rng).find((k) => !used.includes(k)); if (!c) { ok = false; break; }
          used.push(c); const [w2, m2] = [c.slice(0, c.indexOf('-')), c.slice(c.indexOf('-') + 1)]; opts.push({ w: w2, m: m2, filler: true, mean: true }); }
        x.opts = opts;
      }
      if (!ok) continue;
      const at = []; for (let k = 0; k < 400 && !at.length; k++) { const p = rows.map(() => rng.int(0, d.opts - 1)); if (placesOk(p, d.opts)) at.push(...p); }
      if (!at.length) continue;
      rows.forEach((x, i) => { const rest = shuffle(x.opts.slice(1), rng); rest.splice(at[i], 0, x.opts[0]); x.opts = rest; });
      // where a row has three pictures, the circled one is the only one of its class in at most half of the rows
      if (d.opts === 3) {
        const cls = (o) => (o.filler && !o.mean ? F[o.w][2] : Wd[o.w].m.find((m) => m.id === o.m).cls);
        const odd = rows.filter((x) => { const c = x.opts.map(cls), r = c[x.opts.findIndex((o) => !o.filler && o.m === x.right)]; return c.filter((y) => y === r).length === 1 && new Set(c).size === 2; }).length;
        if (odd > Math.floor(d.rows / 2)) continue;
      }
      return { rows, at, items: rows.map((x) => 'row:' + x.word + ':' + x.s1 + (x.s2 ? '|' + x.s2 : '')) };
    }
    throw new Error('no rows');
  }
  if (mode === 'match') {
    const n = d.pairs, m = n + d.extra, k = n + (d.draw || 0);
    // the words and their meanings: copy v takes the next of every way in a fixed walk (left meanings mixed: never all the
    // meaning the bank lists first)
    const combos = matchCombos(Wd, n, k).filter((c) => n < 3 || new Set(c.filter((o) => o.kind === 'pair').map((o) => Wd[o.w].m.findIndex((x) => x.id === o.m))).size >= 2);
    const arr = arrangements(n, m, d.H);
    if (!combos.length || !arr.length) throw new Error('no match');
    const c = shuffle(combos[cycle(v, combos.length, 3)], rng), perm = arr[cycle(v, arr.length, 1)];
    const pairs = c.filter((o) => o.kind === 'pair').map((o) => ({ word: o.w, left: o.m, right: Wd[o.w].m.find((x) => x.id !== o.m).id }));
    const draws = c.filter((o) => o.kind === 'draw').map((o) => ({ word: o.w, shown: o.m, other: Wd[o.w].m.find((x) => x.id !== o.m).id }));
    const ws = c.map((o) => o.w);
    const extras = d.extra ? shuffle(Object.keys(F), rng).filter((fw) => fillerOk(fw, ws, [], ws)).slice(0, d.extra) : [];
    if (extras.length !== d.extra) throw new Error('no picture with no partner');
    // the right column: partner i in slot perm[i], the extra pictures in the slots left over
    const right = Array(m).fill(null); perm.forEach((j, i) => { right[j] = { pair: i }; });
    let e = 0; for (let j = 0; j < m; j++) if (!right[j]) right[j] = { extra: extras[e++] };
    return { pairs, right, perm, extras, draws, items: [...pairs.map((x) => 'pair:' + x.word + ':' + x.left), ...extras.map((x) => 'extra:' + x), ...draws.map((x) => 'draw:' + x.word + ':' + x.shown)] };
  }
  throw new Error('two-meanings-k: unknown mode ' + mode);
}

{ const fb = tmFaultsOf(BANK); if (fb.length) throw new Error('two-meanings-k.en.json: ' + fb.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
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
/** the picture of a meaning (word, meaning id) or of a filler (word) */
const picOf = (w, m) => (m ? BANK.words[w].m.find((x) => x.id === m) : null);
const img = (w, m, size, more = '') => { const x = picOf(w, m); const p = x ? x.pic : BANK.fillers[w];
  return `<img class="ws-icon" data-lcs-pic="${attr(w)}"${m ? ` data-lcs-mean="${attr(m)}"` : ' data-lcs-filler="1"'} data-lcs-pickind="${attr(m ? w + '-' + m : w)}" src="${fileUri(p[0], p[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain;${more}">`; };
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="position:relative;display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
/** "Answer key" on the corner of the first block of a key (it takes no room: it stands over the block's top edge) */
const keyTag = () => `<span data-lcs-keytag style="position:absolute;right:14px;top:-17px;padding:2px 10px;border-radius:999px;background:${T.teal};color:#FFFFFF;font:800 14px/18px 'Nunito',sans-serif;white-space:nowrap">${esc(KEYTAG)}</span>`;
const label = (k, html) => `<div data-lcs-label data-lcs-read style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">${k}.</span> ${html}</div>`;
const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
const ring = () => `<span data-lcs-ring style="position:absolute;left:-6px;right:-6px;top:-6px;bottom:-4px;border:3.5px solid ${T.teal};border-radius:22px;pointer-events:none"></span>`;
/** the key's line under the picture of the second sentence (level 3 of K-683) */
const underline = () => `<span data-lcs-underline style="position:absolute;left:6px;right:6px;bottom:2px;height:5px;border-radius:3px;background:${T.teal}"></span>`;
const wordTag = (w, more = '') => `<span data-lcs-word="${attr(w)}" data-lcs-read style="flex:0 0 auto;font:800 26px/1.1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap;${more}">${esc(w)}</span>`;
const tline = (inner) => `<div data-lcs-read style="font:600 16px/1.35 'Nunito',sans-serif;color:${T.inkSoft}">${inner}</div>`;

function renderPage(plan, mode, lv, d, key) {
  const blocks = [];
  const L = LINES[mode][lv], tag = key ? keyTag() : '';
  if (mode === 'choose') {
    const pic = key ? d.kpic : d.pic;
    const row = (x, r) => `<div data-lcs-crow="${r + 1}" data-lcs-rowword="${attr(x.word)}" data-lcs-right="${attr(x.right)}"${d.two ? ` data-lcs-other="${attr(x.other)}"` : ''} style="flex:1 1 0;min-height:0;display:flex;align-items:center;gap:10px;padding:6px 12px;border-radius:12px;background:#FFFFFF">${badge(r + 1)}${wordTag(x.word, 'width:92px')}` +
      `<div style="flex:1 1 auto;display:flex;justify-content:space-evenly">` + x.opts.map((o, i) => { const own = !o.filler, right = own && o.m === x.right, other = d.two && own && o.m === x.other;
        return `<div data-lcs-slot="${i}" style="flex:0 0 auto"><span data-lcs-opt="${attr(o.w + (o.m ? '-' + o.m : ''))}"${o.filler ? ' data-lcs-fill="1"' : ''}${right ? ' data-lcs-ok="1"' : ''}${other ? ' data-lcs-xok="1"' : ''} style="position:relative;display:block;padding:3px 3px ${d.two ? 14 : 3}px">${img(o.w, o.m || null, pic)}${key && right ? ring() : ''}${key && other ? underline() : ''}</span></div>`; }).join('') + `</div></div>`;
    blocks.push(cream('data-lcs-task="choose"', tag + label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:8px">${plan.rows.map(row).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
    if (key) {
      const item = (x, i) => d.two
        ? `<div data-lcs-tstripitem="${i + 1}" style="display:flex;flex-direction:column">` + tline(`<b style="font-weight:800">${i + 1}</b> <b data-lcs-tlabel style="font-weight:800">${esc(TLAB.s1)}</b> <span data-lcs-s1>${esc(x.s1)}</span>`) + tline(`<b data-lcs-tlabel style="font-weight:800;margin-left:14px">${esc(TLAB.s2)}</b> <span data-lcs-s2>${esc(x.s2)}</span>`) + `</div>`
        : `<div data-lcs-tstripitem="${i + 1}">` + tline(`<b style="font-weight:800">${i + 1}</b> <span data-lcs-s1>${esc(x.s1)}</span>`) + `</div>`;
      blocks.push(`<div data-lcs-tstrip style="flex:0 0 auto;display:flex;flex-direction:column;gap:3px;padding-top:8px;border-top:2px solid ${T.inkSoft}">` +
        `<div data-lcs-tstriphead data-lcs-read style="font:800 16px/1.3 'Nunito',sans-serif;color:${T.inkSoft}">${esc(TSTRIP)} <span data-lcs-tsay style="font-weight:600">${esc(d.two ? TSAY + ' ' + TSAME : TSAY)}</span></div>` +
        plan.rows.map(item).join('') + `</div>`);
    }
  }
  if (mode === 'match') {
    const n = plan.pairs.length, m = plan.right.length, H = d.H, GW = d.gw;
    const hl = H / n, hr = H / m, picL = Math.min(136, Math.round(hl - 44)), picR = Math.min(150, Math.round(hr - 14));
    const yl = (i) => (i + 0.5) * hl, yr = (j) => (j + 0.5) * hr;
    // the word stands above its picture, so the left column hugs the dots and the columns stand far apart (O6)
    const left = plan.pairs.map((x, i) => `<div data-lcs-left="${i}" data-lcs-mword="${attr(x.word)}" data-lcs-mean="${attr(x.left)}" style="box-sizing:border-box;height:${hl}px;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:4px">${wordTag(x.word)}${img(x.word, x.left, picL)}</div>`).join('');
    const right = plan.right.map((o, j) => o.extra != null ? `<div data-lcs-rightitem="${j}" data-lcs-extra="${attr(o.extra)}" style="position:relative;box-sizing:border-box;height:${hr}px;display:flex;align-items:center">${img(o.extra, null, picR)}${key ? `<span data-lcs-nopart data-lcs-read style="position:absolute;right:0;top:50%;transform:translateY(-50%);padding:2px 8px;border:2px solid ${T.teal};border-radius:999px;font:800 16px/1.2 'Nunito',sans-serif;color:${T.teal};white-space:nowrap">${esc(NOPART)}</span>` : ''}</div>`
      : `<div data-lcs-rightitem="${j}" data-lcs-mword="${attr(plan.pairs[o.pair].word)}" data-lcs-mean="${attr(plan.pairs[o.pair].right)}" style="box-sizing:border-box;height:${hr}px;display:flex;align-items:center">${img(plan.pairs[o.pair].word, plan.pairs[o.pair].right, picR)}</div>`).join('');
    const lines = key ? plan.perm.map((j, i) => `<line data-lcs-keyline="${i}-${j}" x1="9" y1="${yl(i).toFixed(1)}" x2="${GW - 9}" y2="${yr(j).toFixed(1)}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>`).join('') : '';
    const dots = plan.pairs.map((_, i) => `<circle data-lcs-ldot="${i}" cx="9" cy="${yl(i).toFixed(1)}" r="8" fill="${T.ink}"/>`).join('') + plan.right.map((_, j) => `<circle data-lcs-rdot="${j}" cx="${GW - 9}" cy="${yr(j).toFixed(1)}" r="8" fill="${T.ink}"/>`).join('');
    const area = `<div data-lcs-matcharea style="display:flex;justify-content:center;align-items:stretch;gap:10px;height:${H}px"><div style="flex:1 1 0;min-width:0;display:flex;flex-direction:column">${left}</div>` +
      `<svg data-lcs-matchsvg width="${GW}" height="${H}" viewBox="0 0 ${GW} ${H}" style="flex:0 0 auto;display:block">${lines}${dots}</svg><div style="flex:1 1 0;min-width:0;display:flex;flex-direction:column">${right}</div></div>`;
    blocks.push(cream('data-lcs-task="match"', tag + label(1, esc(L[0])) + area, 8, 10, d.draw ? '' : 'flex:1 1 auto;justify-content:space-between;'));
    if (d.draw) {
      const row = (x, i) => { const o = BANK.words[x.word].m.find((mm) => mm.id === x.other);
        const sample = key ? `<div data-lcs-sample data-lcs-read style="font:800 18px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(SAMPLE)} ${esc(o.draw)}</div>` +
          `<div data-lcs-accept data-lcs-read style="font:600 16px/1.25 'Nunito',sans-serif;color:${T.teal}">${esc(o.accept)}</div>` +
          `<div data-lcs-say data-lcs-read style="font:600 16px/1.25 'Nunito',sans-serif;color:${T.teal}">${esc(SAY)} ${esc(o.say)}</div>` : '';
        return `<div data-lcs-drow="${i + 1}" data-lcs-dword="${attr(x.word)}" data-lcs-shown="${attr(x.shown)}" style="flex:1 1 auto;display:flex;align-items:center;gap:14px;padding:6px 12px;border-radius:12px;background:#FFFFFF">${badge(i + 1)}${img(x.word, x.shown, d.drawPic)}${wordTag(x.word, 'width:92px')}` +
          `<div data-lcs-drawbox style="flex:1 1 auto;align-self:stretch;min-height:${d.drawH}px;box-sizing:border-box;border:2.5px dashed ${T.grid};border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:4px 8px;text-align:center">${sample}</div></div>`; };
      blocks.push(cream('data-lcs-task="draw"', label(2, esc(L[1])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:8px">${plan.draws.map(row).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
    }
  }
  return blocks;
}

/* ---------------------------------------------------------------- verify's own copy of the ruled texts and measures ---------------------------------------------------------------- */
const SPEC = {
  INSTR: {
    choose: { 1: 'Some words have two meanings. The sentence tells which one.', 2: 'Some words have two meanings. The sentence tells which one.', 3: 'Some words have two meanings. The sentence tells which one.' },
    match: { 1: 'One word can name two different things.', 2: 'One word can name two different things.', 3: 'One word can name two different things.' },
  },
  LINES: {
    choose: { 1: ['Your teacher reads a sentence with the word. Circle the picture that shows what the word means in the sentence.'],
      2: ['Your teacher reads a sentence with the word. Circle the picture that shows what the word means in the sentence.'],
      3: ['Your teacher reads two sentences with the word. Circle the picture for the first sentence. Draw a line under the picture for the second sentence. It may be the same picture.'] },
    match: { 1: ['Your teacher reads each word. Draw a line to the other picture that the same word names.'],
      2: ['Your teacher reads each word. Draw a line to the other picture that the same word names. One picture has no partner.'],
      3: ['Your teacher reads each word. Draw a line to the other picture that the same word names. One picture has no partner.', 'Draw the other meaning of each word. Say a sentence with the word to a partner.'] },
  },
  TSTRIP: 'For the teacher: read these lines aloud.', TSAY: 'Read each sentence two times.',
  TSAME: 'Sometimes both sentences use the same meaning: then both marks go under one picture.',
  TLAB: { s1: 'First sentence (children circle):', s2: 'Second sentence (children draw a line under):' },
  SAMPLE: 'Sample:', SAY: 'Sample sentence:', NOPART: 'no partner', KEYTAG: 'Answer key',
  // pictures; the pictures of the matching rows of level 3 (review 2026-11-17, S20); text; words; blank band; fill; the
  // box to draw in (0.4 in lower than before: S20)
  PIC: 60, MPIC3: 84, READ: 16, WORD: 24, BAND: 40, FILL: 0.8, DRAWW: 300, DRAWH: 100,
  HOLD: { choose: { 1: { rows: 3, opts: 2 }, 2: { rows: 4, opts: 3 }, 3: { rows: 4, opts: 3, two: true, same: [1, 2] } }, match: { 1: { pairs: 4, extra: 0 }, 2: { pairs: 4, extra: 1 }, 3: { pairs: 3, extra: 1, draw: 2 } } },
};

function makeTwoMeaningsKType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('two-meanings-k: unknown mode ' + mode);
  const desc = `Free printable ${i18n.en.title} Worksheet for Kindergarten. ${INSTR[mode][2]} Download the free PDF.`;
  if (desc.length < 120 || desc.length > 170) throw new Error(`${id}: the description has ${desc.length} letters (120 to 170)`);
  const INFO = { words: BANK.words, fillers: BANK.fillers, banned: BANK.banned, modelOnly: BANK.modelOnly, assoc: BANK.assoc };
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2];
      const key = !!(ctx && ctx.answerKey);
      // the copy number walks K-684 through every set of words and line pattern (two copies in a row never share one)
      const plan = drawPage(BANK, mode, lv, ctx.rng, Number(ctx && ctx.variant) || 1);
      const blocks = renderPage(plan, mode, lv, d, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-tm="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((S, INFO) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-tm]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsTm.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fsz = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => (e ? e.textContent.replace(/\s+/g, ' ').trim() : '');
        const all = (q, e = root) => [...e.querySelectorAll(q)];
        const one = (q, e = root) => e.querySelector(q);
        const rb = R(root);
        const Wd = INFO.words, F = INFO.fillers;
        const wordsIn = (s) => String(s).toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
        const blockRepeat = (s) => { for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
          const runs = String(s).match(/(.)\1*/g) || []; return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length); };
        const placesOk = (p, k) => {
          const n = p.length, s = p.join(''), need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
          if (new Set(p).size < need) return false;
          if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
          if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
          if (blockRepeat(s)) return false;
          const cap = n === 4 && k === 2 ? 3 : Math.floor((2 * n) / 3);
          if (n >= 3 && Math.max(...[...new Set(p)].map((v) => p.filter((x) => x === v).length)) > cap) return false;
          return true;
        };
        const H = S.HOLD[mode][lv];
        const sentsOf = (w, m) => (Wd[w].m.find((x) => x.id === m) || { sents: [] }).sents;
        const meanOf = (w, m) => Wd[w] && Wd[w].m.find((x) => x.id === m);

        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if (all('*').some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg, style') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        if (/['"]/.test(root.textContent)) fails.push('a straight apostrophe or quote on the page');
        const imgs = all('img');
        imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < S.PIC - 0.5 || R(im).height < S.PIC - 0.5) fails.push(`a picture smaller than ${S.PIC} px`);
          const w = im.dataset.lcsPic; if (im.dataset.lcsFiller ? !F[w] || Wd[w] : !meanOf(w, im.dataset.lcsMean)) fails.push(`"${w}" is not a picture of the bank`); });
        // no picture twice, but for the third picture of a level-3 row, which is a meaning of another word of the page
        { const ownKinds = imgs.filter((im) => !im.closest('[data-lcs-fill]') || im.dataset.lcsFiller).map((im) => im.dataset.lcsPickind);
          if (new Set(ownKinds).size !== ownKinds.length) fails.push('two pictures of one kind on the page');
          const mf = imgs.filter((im) => im.closest('[data-lcs-fill]') && !im.dataset.lcsFiller).map((im) => im.dataset.lcsPickind);
          if (new Set(mf).size !== mf.length) fails.push('one meaning stands as the other picture of two rows');
          mf.forEach((k) => { if (!ownKinds.includes(k)) fails.push(`the other picture "${k}" is no meaning of another word of the page`); }); }
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        { const ls = all('[data-lcs-label]'), want = S.LINES[mode][lv];
          if (ls.length !== want.length) fails.push(`${ls.length} task lines, not ${want.length}`);
          ls.forEach((l, i) => { const t = txt(l), m = /^(\d+)\. (.*)$/.exec(t); if (!m || +m[1] !== i + 1 || m[2] !== want[i]) fails.push(`task line ${i + 1} is not the line of level ${lv}: "${t}"`); }); }
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, svg').forEach((e) => { if (e.closest('[data-lcs-keytag]')) return; const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card (' + (Object.keys(e.dataset)[0] || e.tagName) + ')'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
        { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last block`); }
        // the blank bands a reader SEES inside every block (a box to draw in counts as printed: the child fills it)
        blocks.forEach((b) => { const iv = [], s = cs(b);
          [b, ...b.querySelectorAll('*')].forEach((e) => {
            const r = R(e); if (!r.width || !r.height || e === b || e.closest('[data-lcs-keytag]')) return;
            if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') return;
            if (e.tagName.toLowerCase() === 'svg') { if (e.dataset.lcsMatchsvg !== undefined) { all('circle, line', e).forEach((c) => { const q = R(c); iv.push([q.top, q.bottom]); }); } else iv.push([r.top, r.bottom]); return; }
            const st = cs(e), own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
            const border = ['Top', 'Right', 'Bottom', 'Left'].some((q) => parseFloat(st['border' + q + 'Width']) >= 2 && st['border' + q + 'Style'] !== 'none' && st['border' + q + 'Color'] !== 'rgba(0, 0, 0, 0)');
            if (e.tagName === 'IMG' || own || border || (st.backgroundColor !== 'rgba(0, 0, 0, 0)' && st.backgroundColor !== cs(b).backgroundColor)) iv.push([r.top, r.bottom]);
          });
          iv.sort((p, q) => p[0] - q[0]);
          // from the inside of the border: padding is blank paper too (80 px of padding under the rule of the teacher
          // lines went unreported while the band was measured from the end of the padding, round 2)
          let top = R(b).top + parseFloat(s.borderTopWidth), worst = 0;
          for (const [a, z] of iv) { if (a > top) worst = Math.max(worst, a - top); top = Math.max(top, z); }
          worst = Math.max(worst, R(b).bottom - parseFloat(s.borderBottomWidth) - top);
          if (worst > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(worst)} px that a reader sees in the ${b.dataset.lcsTask || Object.keys(b.dataset)[0] || 'block'} block`); });
        all('[data-lcs-read]').forEach((e) => { if (fsz(e) < S.READ - 0.1) fails.push(`text the teacher reads is ${fsz(e)} px (${S.READ} or more)`); });
        all('[data-lcs-word]').forEach((e) => { if (fsz(e) < S.WORD - 0.1) fails.push(`a word for the teacher is printed at ${fsz(e)} px (${S.WORD} or more)`); });
        if (!isKey && (all('[data-lcs-ring], [data-lcs-underline], [data-lcs-keyline], [data-lcs-sample], [data-lcs-accept], [data-lcs-say], [data-lcs-nopart]').length)) fails.push('an answer is marked on the page of the child');
        { const ws = wordsIn(root.textContent); const bad = ws.filter((w) => INFO.banned.includes(w) || INFO.modelOnly.includes(w)); if (bad.length) fails.push('a word of the never list or a model word: ' + [...new Set(bad)].join(', ')); }
        // no other picture that a word of the page pulls by association
        { const pw = [...new Set(imgs.filter((im) => !im.dataset.lcsFiller).map((im) => im.dataset.lcsPic))]; imgs.filter((im) => im.dataset.lcsFiller).forEach((im) => { if (pw.some((w) => (INFO.assoc[w] || []).includes(im.dataset.lcsPic))) fails.push(`the other picture "${im.dataset.lcsPic}" stands on a page with a word it goes with`); }); }
        // "Answer key" on the key only, over the corner of the first block, touching no text and no picture
        { const tg = all('[data-lcs-keytag]');
          if (!isKey && tg.length) fails.push('the page of the child says it is the answer key');
          if (isKey) { if (tg.length !== 1 || txt(tg[0]) !== S.KEYTAG || !blocks[0].contains(tg[0])) fails.push('the key does not say "Answer key" at the top');
            else { const q = R(tg[0]), hit = (e) => { const z = R(e); return z.width && z.left < q.right && z.right > q.left && z.top < q.bottom && z.bottom > q.top; };
              if (q.top < rb.top - 30 || [instr, ...all('[data-lcs-label], [data-lcs-read], [data-lcs-badge], img')].filter(Boolean).some(hit)) fails.push('the "Answer key" tag touches a text or a picture'); } } }

        if (mode === 'choose') {
          const rows = all('[data-lcs-crow]');
          if (rows.length !== H.rows) fails.push(`${rows.length} rows, not ${H.rows}`);
          // what the teacher reads: on the ANSWER KEY only, at its foot; the child's page holds no sentence and no strip
          const ts = one('[data-lcs-tstrip]'), items = ts ? all('[data-lcs-tstripitem]', ts) : [];
          if (!isKey) { if (ts) fails.push('the teacher lines stand on the page of the child');
            const pt = root.textContent; if (pt.includes(S.TSTRIP) || pt.includes(S.TSAY) || Object.keys(Wd).some((w) => Wd[w].m.some((m) => m.sents.some(([s]) => pt.includes(s))))) fails.push('a sentence or a text of the teacher lines stands on the page of the child'); }
          else if (!ts || ts !== blocks[blocks.length - 1]) fails.push('no teacher lines at the foot of the key');
          else { if (!txt(one('[data-lcs-tstriphead]', ts)).startsWith(S.TSTRIP) || txt(one('[data-lcs-tsay]', ts)) !== (H.two ? S.TSAY + ' ' + S.TSAME : S.TSAY)) fails.push('the teacher lines do not say how to read the sentences');
            if (items.length !== rows.length) fails.push(`${items.length} sentences on the key for ${rows.length} rows`); }
          const at = [], meanIdx = [], pageWords = rows.map((rw) => rw.dataset.lcsRowword); let odd = 0, same = 0;
          rows.forEach((rw, r) => {
            const tag = 'row ' + (r + 1), w = rw.dataset.lcsRowword, right = rw.dataset.lcsRight, other = rw.dataset.lcsOther;
            if (!Wd[w] || !Wd[w].choose) { fails.push(`${tag}: "${w}" is no word a sentence chooses a meaning of`); return; }
            if (txt(one('[data-lcs-word]', rw)) !== w) fails.push(`${tag}: the word is not printed at the start of the row`);
            const opts = all('[data-lcs-opt]', rw), ims = opts.map((o) => o.querySelector('img'));
            if (opts.length !== H.opts) { fails.push(`${tag}: ${opts.length} pictures, not ${H.opts}`); return; }
            const means = opts.filter((o) => !o.dataset.lcsFill).map((o) => o.querySelector('img')), fill = opts.filter((o) => o.dataset.lcsFill).map((o) => o.querySelector('img'));
            if (means.length !== 2 || means.some((im) => im.dataset.lcsPic !== w) || new Set(means.map((im) => im.dataset.lcsMean)).size !== 2 || fill.length !== H.opts - 2) fails.push(`${tag}: not the two meanings of "${w}" and ${H.opts - 2} other picture`);
            // the other picture: level 2 a thing that is no meaning of a word; level 3 a meaning of ANOTHER word of the page
            fill.forEach((im) => { if (H.two ? (im.dataset.lcsFiller || im.dataset.lcsPic === w || !pageWords.includes(im.dataset.lcsPic) || !meanOf(im.dataset.lcsPic, im.dataset.lcsMean)) : !im.dataset.lcsFiller) fails.push(`${tag}: the other picture is not ${H.two ? 'a meaning of another word of the page' : 'a thing that is no meaning of a word'}`); });
            if (new Set(ims.map((im) => Math.round(R(im).width))).size !== 1) fails.push(`${tag}: the pictures are not one size`);
            const ok = opts.filter((o) => o.dataset.lcsOk);
            if (ok.length !== 1 || ok[0].dataset.lcsFill || ok[0].querySelector('img').dataset.lcsMean !== right || ok[0].querySelector('img').dataset.lcsPic !== w) fails.push(`${tag}: the right picture is not the meaning keyed`);
            at.push(opts.indexOf(ok[0]));
            meanIdx.push(Wd[w].m.findIndex((x) => x.id === right));
            const it = items[r], s1 = it ? txt(one('[data-lcs-s1]', it)) : '', s2 = it ? txt(one('[data-lcs-s2]', it)) : '';
            if (isKey && (!it || !txt(it).startsWith((r + 1) + ' ') || !sentsOf(w, right).some((x) => x[0] === s1))) fails.push(`${tag}: the key does not read a sentence for the meaning keyed`);
            if (H.two) {
              // the second sentence: the other meaning, or (one or two rows of a page) the SAME meaning, a different sentence
              if (!other || !Wd[w].m.some((x) => x.id === other)) fails.push(`${tag}: no meaning keyed for the second sentence`);
              if (other === right) same++;
              const xo = opts.filter((o) => o.dataset.lcsXok);
              if (xo.length !== 1 || xo[0].dataset.lcsFill || xo[0].querySelector('img').dataset.lcsPic !== w || xo[0].querySelector('img').dataset.lcsMean !== other) fails.push(`${tag}: the line under is not keyed to the meaning of the second sentence`);
              if (isKey) {
                if (!it || !sentsOf(w, other).some((x) => x[0] === s2) || s2 === s1) fails.push(`${tag}: the key does not read a second sentence for the meaning keyed under the line`);
                const lab = all('[data-lcs-tlabel]', it || root).map(txt); if (!it || lab.length !== 2 || lab[0] !== S.TLAB.s1 || lab[1] !== S.TLAB.s2) fails.push(`${tag}: the key does not say which sentence is circled and which is underlined`);
                if (!xo[0] || !one('[data-lcs-underline]', xo[0]) || all('[data-lcs-underline]', rw).length !== 1) fails.push(`${tag}: the key does not draw the line under the picture of the second sentence`); }
            } else if (s2) fails.push(`${tag}: a second sentence on a level with one`);
            // a thing named in a sentence is never the other picture
            if (isKey) fill.forEach((im) => { if ((H.two ? [it].filter(Boolean) : items).some((x) => wordsIn(txt(x)).includes(im.dataset.lcsPic))) fails.push(`${tag}: the other picture "${im.dataset.lcsPic}" is named in a sentence`); });
            if (isKey && (all('[data-lcs-ring]', rw).length !== 1 || !ok[0] || !one('[data-lcs-ring]', ok[0]))) fails.push(`${tag}: the key does not circle the right picture`);
            if (H.opts === 3) { const cls = opts.map((o) => { const im = o.querySelector('img'); return im.dataset.lcsFiller ? F[im.dataset.lcsPic][2] : meanOf(im.dataset.lcsPic, im.dataset.lcsMean).cls; }); const c = cls[opts.indexOf(ok[0])];
              if (cls.filter((x) => x === c).length === 1 && new Set(cls).size === 2) odd++; }
          });
          if (at.length === H.rows && !placesOk(at, H.opts)) fails.push('the pictures to circle stand in a pattern: ' + at.join(''));
          if (new Set(meanIdx).size < 2) fails.push('every row keys the same meaning of its word');
          if (odd > Math.floor(H.rows / 2)) fails.push(`the right picture is the only one of its class in ${odd} rows`);
          if (H.two && (same < Math.min(...H.same) || same > Math.max(...H.same))) fails.push(`${same} rows read two sentences of one meaning (${Math.min(...H.same)} to ${Math.max(...H.same)} wanted)`);
          if (new Set(pageWords).size !== rows.length) fails.push('a word stands twice');
        }
        if (mode === 'match') {
          const L = all('[data-lcs-left]'), Rt = all('[data-lcs-rightitem]'), svg = one('[data-lcs-matchsvg]');
          if (L.length !== H.pairs || Rt.length !== H.pairs + H.extra) fails.push(`${L.length} pictures on the left and ${Rt.length} on the right (${H.pairs} and ${H.pairs + H.extra} wanted)`);
          const ex = Rt.filter((e) => e.dataset.lcsExtra != null);
          if (ex.length !== H.extra) fails.push(`${ex.length} pictures with no partner, not ${H.extra}`);
          ex.forEach((e) => { const fw = e.dataset.lcsExtra; if (!F[fw] || Wd[fw] || L.some((l) => l.dataset.lcsMword === fw)) fails.push(`the picture with no partner "${fw}" could have one`);
            const np = all('[data-lcs-nopart]', e); if (isKey && (np.length !== 1 || txt(np[0]) !== S.NOPART)) fails.push(`the key does not mark "${fw}" as the picture with no partner`); });
          if (isKey && all('[data-lcs-nopart]').length !== H.extra) fails.push('a "no partner" mark on a picture that has a partner');
          if (lv === 3) Rt.concat(L).forEach((e) => { const im = one('img', e); if (im && (R(im).width < S.MPIC3 - 0.5 || R(im).height < S.MPIC3 - 0.5)) fails.push(`a picture to match is smaller than ${S.MPIC3} px`); });
          const perm = [];
          const ld = svg ? all('[data-lcs-ldot]', svg) : [], rd = svg ? all('[data-lcs-rdot]', svg) : [];
          const cy = (e) => { const q = R(e); return (q.top + q.bottom) / 2; };
          L.forEach((l, i) => {
            const w = l.dataset.lcsMword, mean = l.dataset.lcsMean, tag = 'left ' + (i + 1);
            if (!Wd[w]) { fails.push(`${tag}: not a word of the bank`); return; }
            const wt = one('[data-lcs-word]', l), im = one('img', l);
            if (txt(wt) !== w || !im || im.dataset.lcsMean !== mean) fails.push(`${tag}: the picture and its word do not agree`);
            else if (R(wt).bottom > R(im).top + 0.5) fails.push(`${tag}: the word does not stand above its picture`);
            // the familiar meaning carries the word on the left; the new meaning is the partner to find
            if (Wd[w].familiar && mean !== Wd[w].familiar) fails.push(`${tag}: the left picture of "${w}" is not its familiar meaning`);
            const j = Rt.findIndex((r) => r.dataset.lcsMword === w);
            if (j < 0 || Rt.filter((r) => r.dataset.lcsMword === w).length !== 1 || Rt[j].dataset.lcsMean === mean || !Wd[w].m.some((x) => x.id === Rt[j].dataset.lcsMean)) { fails.push(`${tag}: no partner with the other meaning of "${w}"`); return; }
            perm.push(j);
            if (!ld[i] || Math.abs(cy(ld[i]) - cy(l)) > 4 || !rd[j] || Math.abs(cy(rd[j]) - cy(Rt[j])) > 4) fails.push(`${tag}: a dot does not stand beside its picture`);
            if (Math.abs(cy(Rt[j]) - cy(l)) < R(Rt[j]).height / 2) fails.push(`${tag}: its partner stands straight across`);
            const kl = svg ? all('[data-lcs-keyline]', svg).filter((x) => x.dataset.lcsKeyline.split('-')[0] === String(i)) : [];
            if (isKey && (kl.length !== 1 || kl[0].dataset.lcsKeyline !== i + '-' + j || Math.abs(+kl[0].getAttribute('y1') - (+ld[i].getAttribute('cy'))) > 0.5 || Math.abs(+kl[0].getAttribute('y2') - (+rd[j].getAttribute('cy'))) > 0.5)) fails.push(`${tag}: the key does not join it to its partner`);
          });
          if (perm.length === H.pairs && H.pairs > 1) { const off = perm.map((j, i) => Math.round((cy(Rt[j]) - cy(L[i])) / R(Rt[0]).height)); if (new Set(off).size === 1) fails.push('every partner stands the same number of rows away'); }
          if (H.pairs >= 3 && new Set(L.map((l) => Wd[l.dataset.lcsMword] ? Wd[l.dataset.lcsMword].m.findIndex((x) => x.id === l.dataset.lcsMean) : -1)).size < 2) fails.push('the left pictures all show the meaning the bank lists first');
          if (new Set(L.map((l) => l.dataset.lcsMword)).size !== L.length) fails.push('a word stands twice');
          const dr = all('[data-lcs-drow]');
          if (dr.length !== (H.draw || 0)) fails.push(`${dr.length} words to draw, not ${H.draw || 0}`);
          dr.forEach((rw, i) => { const w = rw.dataset.lcsDword, shown = rw.dataset.lcsShown, tag = 'draw row ' + (i + 1), box = one('[data-lcs-drawbox]', rw), im = one('img', rw);
            if (!Wd[w] || L.some((l) => l.dataset.lcsMword === w)) fails.push(`${tag}: "${w}" is no word of the bank, or it is matched above`);
            if (!im || im.dataset.lcsPic !== w || im.dataset.lcsMean !== shown || txt(one('[data-lcs-word]', rw)) !== w) fails.push(`${tag}: the picture and its word do not agree`);
            // the new meaning is shown; the child draws the familiar one
            if (Wd[w] && Wd[w].familiar && shown === Wd[w].familiar) fails.push(`${tag}: the picture shows the familiar meaning of "${w}" (the child draws it)`);
            if (!box || R(box).width < S.DRAWW || R(box).height < S.DRAWH) fails.push(`${tag}: the box to draw in is smaller than ${S.DRAWW} x ${S.DRAWH} px`);
            const other = Wd[w] && Wd[w].m.find((x) => x.id !== shown);
            if (isKey && (!other || txt(one('[data-lcs-sample]', rw)) !== S.SAMPLE + ' ' + other.draw || txt(one('[data-lcs-accept]', rw)) !== other.accept || txt(one('[data-lcs-say]', rw)) !== S.SAY + ' ' + other.say)) fails.push(`${tag}: the key's sample is not the other meaning, what counts, and a sentence`);
            if (isKey && box) all('[data-lcs-sample], [data-lcs-accept], [data-lcs-say]', rw).forEach((e) => { const q = R(e), z = R(box); if (q.top < z.top || q.bottom > z.bottom || q.left < z.left || q.right > z.right) fails.push(`${tag}: the key's sample leaves the box`); }); });
        }
        return fails;
      }, SPEC, INFO);
    },
  };
}

module.exports = { makeTwoMeaningsKType, tmFaultsOf, drawPage, LEVELS, INSTR, LINES, SPEC, MODES, placesOk };
