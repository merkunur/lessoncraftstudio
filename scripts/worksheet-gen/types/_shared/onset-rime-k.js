/**
 * onset-rime-k.js — two Kindergarten pages for the lesson "Blend the first sound and the rest" (RF.K.2.c) of the unit
 * "Hearing Sounds in Words" (English literacy year, Daily Teaching System Part 12.3, 2026-11-17; revised after the
 * reading specialist's review the same day). The picture words are data/literacy/onset-rime-k.en.json: every word has ONE
 * syllable and starts with ONE sound (no blend: the lesson is about the first sound), and every picture is one a
 * kindergartner names with exactly that word (each looked at on a contact sheet; the refused pictures and why are in the
 * bank: the doll reads as a girl, the comb as a brush, every library duck is a duckling). The pages are ORAL: the child
 * never reads a letter. What the teacher says stands at the foot of the ANSWER KEY, never on the child's page (a page
 * copied whole would give the answers away): each first sound and each rest between slashes, as a teacher writes them
 * (/k/ … /āk/: ă ĕ ĭ ŏ ŭ short vowels, ā ē ī ō long vowels; c and k are both /k/), and the word in grey. The key says
 * "Answer key" over its first block.
 *
 *   blend  K-681 Blend the First Sound and the Rest (day 1). Rows of three pictures; the teacher says the first sound of
 *          one of them, waits, then says its rest (/s/ … /ŭn/), and the child circles the picture of the whole word.
 *     level 1  six rows; the three pictures of a row start with three different sounds and have three different vowels
 *     level 2  seven rows; the three pictures of a row start with the SAME sound and have three different vowels, so
 *              only the rest tells them apart (sun, sock)
 *     level 3  seven rows of three kinds, mixed (no three of one kind in a row): chain (one picture with the rest of the
 *              word, one with its first sound: cake, rake, cup), end (one with its first sound that rhymes with the third:
 *              cake, coat, goat), rhyme (three with one rest: cat, hat, bat). The picture linked to both others is the
 *              word only in a chain row, so "rhymes with one, starts like the other" cannot do the page: the child needs
 *              the first sound AND the rest
 *          In every row two pictures with one first sound differ in their vowel (no lock beside log), for every common
 *          American way of saying them (the bank lists the other vowel some say in pen, dog, log, bag, leg, milk). The
 *          circled picture's place follows no pattern (never three in a row at one place, never a staircase, never a
 *          repeated block), it is the only picture of its class (an animal beside two things) in at most a third of the
 *          rows, and it is never a picture a child may name another way (log: wood).
 *   split  K-682 Say the First Sound and the Rest (day 2). The child says a picture word in its two parts for a partner,
 *          who puts them together: under each picture a small box (first sound) and a long box (the rest).
 *     level 1  four pictures whose first sound can be stretched (/mmm/, /sss/: f, l, m, n, r, s); a box of 72 px for
 *              the dot the child puts in each box while saying its part
 *     level 2  six pictures whose first sound cannot be stretched (b, d, g, k, p, t, h, ch); boxes as on level 1
 *     level 3  three rows of three pictures with boxes to touch (60 px): two pictures of a row rhyme (the same rest), the
 *              third has another rest and another vowel (and, where the bank allows, the first sound of one of the two):
 *              circle the two that rhyme. The odd picture's place follows no pattern; the two never share a class the
 *              third lacks.
 *          The key's teacher lines say to name each picture for the class first, and name every picture with its two
 *          parts (sun: /s/ … /ŭn/); on level 3 one line a row. Two pictures keyed as having the same rest (here and on
 *          level 3 of K-681) never hold a vowel some Americans say another way (dog and log, bag).
 *
 * Kindergarten sizes: pictures 60 px or more (larger on the child's page, which ends at its task, than on the key), read-
 * aloud text 16 px or more, boxes for a mark 72 px. Ligatures are off (the rule stands before the page root, which carries
 * data-lcs-noliga), and an f before i, f, l or t gets room of its own. No page leaves a blank band of more than 40 px: the
 * rows and cards stretch to fill the child's page. The instruction of each level is INSTR (registered as strings; verify()
 * reads it on the page); verify() carries its OWN copy of every ruled text and measure (SPEC). English only. Themeless: a
 * copy draws other words. PDF only (the answer key is for checks and review). The bank is checked when this file loads
 * (orFaultsOf), including trial draws of every level; nothing looks a picture up while the file loads.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const BANK = require('../../data/literacy/onset-rime-k.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle } = _parts;
const T = TOK.color;
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const INNER = W - 24;
const MODES = ['blend', 'split'];
const STOPS = ['b', 'd', 'g', 'k', 'p', 't', 'h', 'ch'];

/** the page instruction of every level (registered as strings; verify() compares the page with its own copy, SPEC) */
const INSTR = {
  blend: { 1: 'Blend the first sound and the rest to make a word.', 2: 'Blend the first sound and the rest to make a word.', 3: 'Blend the first sound and the rest to make a word.' },
  split: { 1: 'You can break a word into its first sound and the rest.', 2: 'You can break a word into its first sound and the rest.', 3: 'You can break a word into its first sound and the rest.' },
};
/** the task lines of every level */
const LINES = {
  blend: { 1: ['Your teacher says the first sound of a word, then the rest. Circle the picture of the word.'],
    2: ['Your teacher says the first sound of a word, then the rest. Circle the picture of the word.'],
    3: ['Your teacher says the first sound of a word, then the rest. Circle the picture of the word.'] },
  split: { 1: ['Say the name of each picture. Touch the small box and say the first sound. Touch the long box and say the rest.', 'Put a dot in each box as you say its part. Your partner closes their eyes and says the whole word.'],
    2: ['Say the name of each picture. Touch the small box and say the first sound. Touch the long box and say the rest.', 'Put a dot in each box as you say its part. Your partner closes their eyes and says the whole word.'],
    3: ['Say each picture name in two parts: the first sound, then the rest. Touch the boxes as you say them.', 'Circle the two pictures in each row that rhyme: they have the same rest.'] },
};
/** what the teacher says stands at the foot of the ANSWER KEY, never on the child's page (review 2026-11-17, ruling B) */
const TSTRIP = 'For the teacher: read these lines aloud.';
const TSAY = { blend: 'Say the first sound, wait a moment, then say the rest. Do not say the whole word.', split: 'Name each picture for the class first. The parts of each word:' };
const LEGEND = { on: 'first sound', rest: 'the rest' };
const KEYTAG = 'Answer key';

// pic: the pictures on the child's page (it ends at its task); kpic: on the answer key, which also holds the teacher lines
const LEVELS = {
  blend: { 1: { rows: 6, pic: 86, kpic: 76 }, 2: { rows: 7, pic: 72, kpic: 62 }, 3: { rows: 7, pic: 72, kpic: 62, rhyme: [1, 2], end: 2 } },
  split: { 1: { cards: 4, cols: 2, pic: 156, kpic: 140, box: 72, rest: 132 }, 2: { cards: 6, cols: 3, pic: 128, kpic: 116, box: 72, rest: 104 }, 3: { rows: 3, pic: 92, kpic: 80, box: 60, rest: 92 } },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
const say = (s) => '/' + s + '/';
/** a block of 2, 3 or 4 places repeated to the end (L R L R), or runs that all have one length of two or more */
function blockRepeat(s) {
  for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
  const runs = String(s).match(/(.)\1*/g) || [];
  return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length);
}
/** the places of the right answers: every place used where n allows, never three in a row, never a staircase of three,
 *  never a repeated block, no place for more than two thirds of the items */
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
function mixedPlaces(n, k, rng) { for (let t = 0; t < 4000; t++) { const p = Array.from({ length: n }, () => rng.int(0, k - 1)); if (placesOk(p, k)) return p; } throw new Error('no mixed places'); }
function seedRng(seed) { let x = seed >>> 0 || 1; const next = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; return { int: (a, c) => a + Math.floor(next() * (c - a + 1)) }; }
/** the class a picture is the only one of in its row (null when no single odd class) */
function oddClass(ws, P) { const c = ws.map((w) => P[w].cls); for (let i = 0; i < 3; i++) { const o = c.filter((_, j) => j !== i); if (o[0] === o[1] && c[i] !== o[0]) return ws[i]; } return null; }

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function orFaultsOf(b) {
  const f = [];
  const P = b.pics || {};
  const words = Object.keys(P);
  if (words.length < 36) f.push('pics: fewer than thirty-six picture words');
  const VOW = /^[ăĕĭŏŭāēīō]$/;
  for (const [w, x] of Object.entries(P)) {
    if (!x || !Array.isArray(x.pic) || x.pic.length !== 2 || !x.pic.every((y) => typeof y === 'string' && y) || /bw( ?\d+)?$/i.test(x.pic[0])) f.push(`"${w}": not a colour theme and a picture`);
    if (!/^[a-z]+$/.test(w) || x.kind !== w || !x.cls) f.push(`"${w}": no kind or class`);
    if (!/^(b|c|ch|d|f|g|h|j|k|l|m|n|p|r|s|sh|t|v|w|y|z)$/.test(x.on || '')) f.push(`"${w}": its first sound "${x.on}" is not ONE consonant sound`);
    const vs = String(x.rest || '').match(/[ăĕĭŏŭāēīōaeiou]/g) || [];
    if (vs.length !== 1 || !VOW.test(vs[0]) || x.v !== vs[0]) f.push(`"${w}": its rest "${x.rest}" does not hold ONE vowel sound written with a mark`);
    if (x.alt && (!Array.isArray(x.alt) || x.alt.some((a) => !/^[ăĕĭŏŭāēīōô]$/.test(a) || a === x.v))) f.push(`"${w}": its other vowels are not vowels`);
    // the first letters of the word and its first sound agree (c and k are /k/; kn is /n/; ch is /ch/)
    const lead = w.startsWith('ch') ? 'ch' : w.startsWith('sh') ? 'sh' : w.startsWith('kn') ? 'n' : w[0] === 'c' ? 'k' : w[0];
    if (lead !== x.on) f.push(`"${w}": its first sound /${x.on}/ is not the sound of its first letter`);
    if ((b.refused || {})[w]) f.push(`"${w}" is a picture word and a refused one`);
    if ((b.modelOnly || []).includes(w)) f.push(`"${w}" is a picture word and a model-only word`);
    if ((b.banned || []).includes(w)) f.push(`"${w}" is on the never list`);
  }
  if (Object.keys(b.refused || {}).length < 20) f.push('refused: fewer than twenty pictures looked at and left out');
  if ((b.modelOnly || []).length < 3) f.push('modelOnly: fewer than three words for the teacher note');
  if ((b.banned || []).length < 10) f.push('banned: fewer than ten words');
  if (!(b.continuous || []).length || STOPS.some((s) => (b.continuous || []).includes(s))) f.push('continuous: no list, or a stop sound in it');
  // two words with one first sound and one rest would be one word
  for (const x of words) for (const y of words) if (x < y && P[x].on === P[y].on && P[x].rest === P[y].rest) f.push(`"${x}" and "${y}" have the same parts`);
  // what the levels need
  const cont = words.filter((w) => (b.continuous || []).includes(P[w].on)), stop = words.filter((w) => STOPS.includes(P[w].on));
  if (cont.length < 12) f.push('fewer than twelve words that start with a sound one can stretch');
  if (stop.length < 18) f.push('fewer than eighteen words that start with a sound one cannot stretch');
  const fam = {}; words.forEach((w) => (fam[P[w].rest] = fam[P[w].rest] || []).push(w));
  if (Object.values(fam).filter((x) => x.length >= 2).length < 7) f.push('fewer than seven rests that two words share');
  // level 3 of K-681 needs rows of three rhymes: rests that three words share, none of them with a vowel said another way
  if (Object.values(fam).filter((x) => x.filter((w) => !P[w].alt).length >= 3).length < Math.max(...LEVELS.blend[3].rhyme)) f.push('too few rests that three steady words share for the rows of three rhymes');
  for (const [w, x] of Object.entries(P)) if ('noTarget' in x && x.noTarget !== true) f.push(`"${w}": noTarget is not true`);
  if (f.length) return f;
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let s = 1; s <= 12; s++) {
    try { drawPage(b, mode, lv, seedRng(s * 7 + lv)); } catch (e) { f.push(`${mode} level ${lv}: ${e.message}`); break; }
  }
  return f;
}

/* ---------------------------------------------------------------- the draws (pure: the bank check runs them too) ---------------------------------------------------------------- */
function drawPage(b, mode, lv, rng) {
  const d = LEVELS[mode][lv], P = b.pics, words = Object.keys(P);
  const steady = (w) => !P[w].alt, sameOn = (x, y) => P[x].on === P[y].on, sameV = (x, y) => [P[x].v, ...(P[x].alt || [])].some((v) => [P[y].v, ...(P[y].alt || [])].includes(v)), sameRest = (x, y) => P[x].rest === P[y].rest;
  // two pictures of a row with one first sound differ in their vowel
  const rowFair = (ws) => ws.every((x, i) => ws.every((y, j) => j <= i || !sameOn(x, y) || !sameV(x, y)));
  if (mode === 'blend') {
    // a picture a child may name another way (log: wood) is never the picture to circle
    const canTarget = (w) => !P[w].noTarget;
    const pickTarget = (ws) => { const c = ws.filter(canTarget); return c.length ? c[rng.int(0, c.length - 1)] : null; };
    for (let t = 0; t < 600; t++) {
      const used = new Set(), rows = [], fams = new Set();
      // level 3: three kinds of row, mixed on the page (review 2026-11-17). chain: one picture has the rest of the word,
      // one its first sound (the word is the picture linked to both); end: one picture has its first sound and rhymes with
      // the third (the picture linked to both is NOT the word); rhyme: three pictures with one rest (only the first sound
      // decides). So "rhymes with one, starts like the other" does not do the page.
      const kinds = lv === 3 ? (() => { const nr = d.rhyme[rng.int(0, d.rhyme.length - 1)]; return [...Array(nr).fill('rhyme'), ...Array(d.end).fill('end'), ...Array(d.rows - nr - d.end).fill('chain')]; })() : Array(d.rows).fill('row');
      let ok = true;
      for (let r = 0; r < d.rows && ok; r++) {
        let row = null;
        for (let k = 0; k < 80 && !row; k++) {
          const free = shuffle(words.filter((w) => !used.has(w)), rng);
          if (lv === 1) {
            const a = free[0], c = free.find((w) => w !== a && !sameOn(w, a) && !sameV(w, a));
            const e = c && free.find((w) => w !== a && w !== c && !sameOn(w, a) && !sameOn(w, c) && !sameV(w, a) && !sameV(w, c));
            const tg = e && pickTarget([a, c, e]);
            if (tg) row = { target: tg, ws: [a, c, e] };
          } else if (lv === 2) {
            const a = free[0], c = free.find((w) => w !== a && sameOn(w, a) && !sameV(w, a));
            const e = c && free.find((w) => w !== a && w !== c && sameOn(w, a) && !sameV(w, a) && !sameV(w, c));
            const tg = e && pickTarget([a, c, e]);
            if (tg) row = { target: tg, ws: [a, c, e] };
          } else if (kinds[r] === 'rhyme') {
            const tg = free.find((w) => steady(w) && canTarget(w) && !fams.has(P[w].rest) && free.filter((x) => x !== w && steady(x) && sameRest(x, w)).length >= 2);
            if (!tg) break;
            const two = free.filter((x) => x !== tg && steady(x) && sameRest(x, tg)).slice(0, 2);
            row = { target: tg, ws: [tg, ...two], kind: 'rhyme', fam: P[tg].rest };
          } else if (kinds[r] === 'end') {
            // the word; a picture with its first sound and another vowel; the third rhymes with that picture, not with the word
            const pick = (w) => { const de = free.find((x) => x !== w && steady(x) && sameOn(x, w) && !sameV(x, w) && !fams.has(P[x].rest) && free.some((y) => y !== w && y !== x && steady(y) && sameRest(y, x) && !sameOn(y, w)));
              return de ? [de, free.find((y) => y !== w && y !== de && steady(y) && sameRest(y, de) && !sameOn(y, w))] : null; };
            const tg = free.find((w) => canTarget(w) && pick(w));
            if (!tg) break;
            const [de, pr] = pick(tg);
            row = { target: tg, ws: [tg, de, pr], kind: 'end', fam: P[de].rest };
          } else {
            const tg = free.find((w) => steady(w) && canTarget(w) && !fams.has(P[w].rest) && free.some((x) => x !== w && steady(x) && sameRest(x, w)) && free.some((x) => x !== w && sameOn(x, w) && !sameV(x, w)));
            if (!tg) break;
            const pa = free.find((x) => x !== tg && steady(x) && sameRest(x, tg)), de = free.find((x) => x !== tg && sameOn(x, tg) && !sameV(x, tg) && x !== pa);
            if (pa && de) row = { target: tg, ws: [tg, pa, de], kind: 'chain', fam: P[tg].rest };
          }
        }
        if (!row || !rowFair(row.ws)) { ok = false; break; }
        // one rest family keyed once on a page
        if (row.fam) fams.add(row.fam);
        row.ws.forEach((w) => used.add(w)); rows.push(row);
      }
      if (!ok) continue;
      // the kinds of row stand in a mixed order
      if (lv === 3) { const o = shuffle(rows.map((_, i) => i), rng), re = o.map((i) => rows[i]); rows.length = 0; rows.push(...re);
        const ks = rows.map((rw) => rw.kind[0]).join(''); if (/(.)\1\1/.test(ks)) continue; }
      // the circled picture is the only one of its class in at most a third of the rows
      if (rows.filter((rw) => oddClass(rw.ws, P) === rw.target).length > Math.floor(d.rows / 3)) continue;
      const at = mixedPlaces(d.rows, 3, rng);
      const out = rows.map((rw, i) => { const o = shuffle(rw.ws.filter((w) => w !== rw.target), rng); o.splice(at[i], 0, rw.target); return { target: rw.target, ws: o }; });
      return { rows: out, at, items: out.map((rw) => 'row:' + rw.target + ':' + rw.ws.slice().sort().join('-')) };
    }
    throw new Error('no rows of pictures');
  }
  if (mode === 'split') {
    if (lv < 3) {
      const pool = words.filter((w) => (lv === 1 ? (b.continuous || []).includes(P[w].on) : STOPS.includes(P[w].on)));
      const pick = shuffle(pool, rng).slice(0, d.cards);
      if (pick.length !== d.cards) throw new Error('not enough words');
      return { cards: pick, items: pick.map((w) => 'card:' + w) };
    }
    for (let t = 0; t < 600; t++) {
      const used = new Set(), rows = [];
      let ok = true;
      for (let r = 0; r < d.rows && ok; r++) {
        const free = shuffle(words.filter((w) => !used.has(w)), rng);
        const a = free.find((w) => steady(w) && free.some((x) => x !== w && steady(x) && sameRest(x, w)) && !rows.some((rw) => sameRest(rw.pair[0], w)));
        if (!a) { ok = false; break; }
        const c = free.find((x) => x !== a && steady(x) && sameRest(x, a));
        const others = free.filter((x) => x !== a && x !== c && !sameRest(x, a) && !sameV(x, a) && rowFair([a, c, x]));
        // the odd one shares its first sound with one of the two where the bank allows (the rest must be listened to)
        const odd = others.find((x) => sameOn(x, a) || sameOn(x, c)) || others[0];
        if (!odd) { ok = false; break; }
        const P2 = P;
        if (P2[a].cls === P2[c].cls && P2[odd].cls !== P2[a].cls) { r--; if (++t > 2000) { ok = false; } continue; }
        [a, c, odd].forEach((w) => used.add(w)); rows.push({ pair: [a, c], odd });
      }
      if (!ok || rows.length !== d.rows) continue;
      const at = mixedPlaces(d.rows, 3, rng);
      const out = rows.map((rw, i) => { const o = shuffle(rw.pair, rng); o.splice(at[i], 0, rw.odd); return { pair: rw.pair, odd: rw.odd, ws: o }; });
      return { rows: out, at, items: out.map((rw) => 'row:' + rw.ws.slice().sort().join('-')) };
    }
    throw new Error('no rows of three');
  }
  throw new Error('onset-rime-k: unknown mode ' + mode);
}

{ const fb = orFaultsOf(BANK); if (fb.length) throw new Error('onset-rime-k.en.json: ' + fb.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
/** an f before i, f, l or t and a t before t get a little room of their own (text inside tags and <svg> is left alone) */
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
const img = (w, size, more = '') => `<img class="ws-icon" data-lcs-pic="${attr(w)}" data-lcs-pickind="${attr(BANK.pics[w].kind)}" src="${fileUri(BANK.pics[w].pic[0], BANK.pics[w].pic[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain;${more}">`;
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="position:relative;display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
/** "Answer key" on the corner of the first block of a key (it takes no room: it stands over the block's top edge) */
const keyTag = () => `<span data-lcs-keytag style="position:absolute;right:14px;top:-17px;padding:2px 10px;border-radius:999px;background:${T.teal};color:#FFFFFF;font:800 14px/18px 'Nunito',sans-serif;white-space:nowrap">${esc(KEYTAG)}</span>`;
const label = (k, html) => `<div data-lcs-label data-lcs-read style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">${k}.</span> ${html}</div>`;
const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
const ring = (inset = '-6px -6px') => { const [v, h] = inset.split(' '); return `<span data-lcs-ring style="position:absolute;left:${h};right:${h};top:${v};bottom:${v};border:3.5px solid ${T.teal};border-radius:22px;pointer-events:none"></span>`; };
/** the teacher lines, on the ANSWER KEY only, at its foot: what the teacher says, numbered like the rows */
const strip = (mode, items) => `<div data-lcs-tstrip style="flex:0 0 auto;display:flex;flex-direction:column;gap:4px;padding-top:8px;border-top:2px solid ${T.inkSoft}">` +
  `<div data-lcs-tstriphead data-lcs-read style="font:800 16px/1.3 'Nunito',sans-serif;color:${T.inkSoft}">${esc(TSTRIP)}</div>` +
  `<div data-lcs-tsay data-lcs-read style="font:600 16px/1.3 'Nunito',sans-serif;color:${T.inkSoft}">${esc(TSAY[mode])}</div>` +
  `<div style="display:flex;flex-wrap:wrap;column-gap:22px;row-gap:2px">` + items.map((x, i) => `<span data-lcs-tstripitem="${i + 1}" data-lcs-read style="white-space:nowrap;font:600 16px/1.35 'Nunito',sans-serif;color:${T.inkSoft}"><b style="font-weight:800">${i + 1}</b> ${x}</span>`).join('') + `</div></div>`;
/** what the strip says for one word: K-681 "/k/ … /āk/ (cake)", K-682 "cake: /k/ … /āk/" */
const blendSay = (w) => `<span data-lcs-parts>${esc(say(BANK.pics[w].on))} … ${esc(say(BANK.pics[w].rest))}</span> <i data-lcs-word style="font-weight:600">(${esc(w)})</i>`;
const splitSay = (w) => `<i data-lcs-word style="font-weight:600">${esc(w)}:</i> <span data-lcs-parts>${esc(say(BANK.pics[w].on))} … ${esc(say(BANK.pics[w].rest))}</span>`;
/** the two boxes under a picture: a small one for the first sound and a long one for the rest; the key prints the parts */
const boxes = (w, d, key) => `<div data-lcs-boxes style="display:flex;gap:10px;justify-content:center">` +
  `<span data-lcs-onbox style="box-sizing:border-box;width:${d.box}px;height:${d.box}px;border:2.5px solid ${T.ink};border-radius:12px;background:#FFFFFF;display:flex;align-items:center;justify-content:center;font:800 20px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(say(BANK.pics[w].on)) : ''}</span>` +
  `<span data-lcs-restbox style="box-sizing:border-box;width:${d.rest}px;height:${d.box}px;border:2.5px solid ${T.ink};border-radius:12px;background:#FFFFFF;display:flex;align-items:center;justify-content:center;font:800 20px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(say(BANK.pics[w].rest)) : ''}</span></div>`;

/* ---------------------------------------------------------------- the blocks of each page ---------------------------------------------------------------- */
function renderPage(plan, mode, lv, d, key) {
  const blocks = [];
  const L = LINES[mode][lv];
  const pic = key ? d.kpic : d.pic, tag = key ? keyTag() : '';
  if (mode === 'blend') {
    const row = (rw, r) => `<div data-lcs-brow="${r + 1}" data-lcs-target="${attr(rw.target)}" style="flex:1 1 0;min-height:0;display:flex;align-items:center;gap:8px;padding:3px 10px;border-radius:12px;background:#FFFFFF">${badge(r + 1)}` +
      `<div style="flex:1 1 auto;display:flex;justify-content:space-evenly">` + rw.ws.map((w, i) => `<div data-lcs-slot="${i}" style="flex:0 0 auto;display:flex;justify-content:center"><span data-lcs-pw="${attr(w)}"${w === rw.target ? ' data-lcs-ok="1"' : ''} style="position:relative;display:block;padding:2px">${img(w, pic)}${key && w === rw.target ? ring('-4px -6px') : ''}</span></div>`).join('') + `</div></div>`;
    blocks.push(cream('data-lcs-task="blend"', tag + label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px">${plan.rows.map(row).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
    if (key) blocks.push(strip('blend', plan.rows.map((rw) => blendSay(rw.target))));
  }
  if (mode === 'split') {
    const legend = `<div data-lcs-legend style="display:flex;align-items:center;justify-content:center;gap:16px">` +
      `<span style="display:flex;align-items:center;gap:6px"><span style="display:block;width:22px;height:22px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF"></span><span data-lcs-legendword="on" data-lcs-read style="font:700 18px/1 'Nunito',sans-serif;color:${T.ink}">${esc(LEGEND.on)}</span></span>` +
      `<span style="display:flex;align-items:center;gap:6px"><span style="display:block;width:40px;height:22px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF"></span><span data-lcs-legendword="rest" data-lcs-read style="font:700 18px/1 'Nunito',sans-serif;color:${T.ink}">${esc(LEGEND.rest)}</span></span></div>`;
    if (lv < 3) {
      const card = (w, i) => `<div data-lcs-card="${attr(w)}" style="position:relative;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:8px;padding:8px 6px;border-radius:12px;background:#FFFFFF">` +
        `<span style="position:absolute;left:8px;top:8px">${badge(i + 1)}</span>${img(w, pic)}${boxes(w, d, key)}</div>`;
      blocks.push(cream('data-lcs-task="split"', tag + label(1, esc(L[0])) + label(2, esc(L[1])) + legend +
        `<div data-lcs-cardgrid style="flex:1 1 auto;display:grid;grid-template-columns:repeat(${d.cols},1fr);grid-auto-rows:1fr;align-content:stretch;gap:10px">${plan.cards.map(card).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
      if (key) blocks.push(strip('split', plan.cards.map(splitSay)));
    } else {
      const row = (rw, r) => `<div data-lcs-srow="${r + 1}" style="flex:1 1 0;min-height:0;display:flex;align-items:center;gap:6px;padding:5px 6px;border-radius:12px;background:#FFFFFF">${badge(r + 1)}` +
        `<div style="flex:1 1 auto;display:flex;justify-content:space-evenly">` + rw.ws.map((w, i) => `<div data-lcs-slot="${i}" data-lcs-spw="${attr(w)}"${rw.pair.includes(w) ? ' data-lcs-ok="1"' : ''} style="position:relative;display:flex;flex-direction:column;align-items:center;gap:5px;padding:3px">${img(w, pic)}${boxes(w, d, key)}${key && rw.pair.includes(w) ? ring('-3px -3px') : ''}</div>`).join('') + `</div></div>`;
      blocks.push(cream('data-lcs-task="split"', tag + label(1, esc(L[0])) + label(2, esc(L[1])) + legend +
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px">${plan.rows.map(row).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
      if (key) blocks.push(strip('split', plan.rows.map((rw) => rw.ws.map(splitSay).join(' · '))));
    }
  }
  return blocks;
}

/* ---------------------------------------------------------------- verify's own copy of the ruled texts and measures ---------------------------------------------------------------- */
const SPEC = {
  INSTR: {
    blend: { 1: 'Blend the first sound and the rest to make a word.', 2: 'Blend the first sound and the rest to make a word.', 3: 'Blend the first sound and the rest to make a word.' },
    split: { 1: 'You can break a word into its first sound and the rest.', 2: 'You can break a word into its first sound and the rest.', 3: 'You can break a word into its first sound and the rest.' },
  },
  LINES: {
    blend: { 1: ['Your teacher says the first sound of a word, then the rest. Circle the picture of the word.'],
      2: ['Your teacher says the first sound of a word, then the rest. Circle the picture of the word.'],
      3: ['Your teacher says the first sound of a word, then the rest. Circle the picture of the word.'] },
    split: { 1: ['Say the name of each picture. Touch the small box and say the first sound. Touch the long box and say the rest.', 'Put a dot in each box as you say its part. Your partner closes their eyes and says the whole word.'],
      2: ['Say the name of each picture. Touch the small box and say the first sound. Touch the long box and say the rest.', 'Put a dot in each box as you say its part. Your partner closes their eyes and says the whole word.'],
      3: ['Say each picture name in two parts: the first sound, then the rest. Touch the boxes as you say them.', 'Circle the two pictures in each row that rhyme: they have the same rest.'] },
  },
  TSTRIP: 'For the teacher: read these lines aloud.',
  TSAY: { blend: 'Say the first sound, wait a moment, then say the rest. Do not say the whole word.', split: 'Name each picture for the class first. The parts of each word:' },
  LEGEND: { on: 'first sound', rest: 'the rest' },
  KEYTAG: 'Answer key',
  // level 3 of K-681: rows of each kind on a page (at least); the rows in which the picture linked to both others is the
  // word are at most the rows less two
  KINDS: { rhyme: 1, end: 1, chain: 2 },
  // the measures: pictures, read-aloud text, a box for one mark (levels 1 and 2 of K-682) and a box to touch (level 3),
  // the widest blank band, the share of the body the blocks fill
  PIC: 60, READ: 16, MARK: 72, TOUCH: 60, BAND: 40, FILL: 0.8,
  STOPS: ['b', 'd', 'g', 'k', 'p', 't', 'h', 'ch'],
  HOLD: { blend: { 1: { rows: 6 }, 2: { rows: 7 }, 3: { rows: 7 } }, split: { 1: { cards: 4 }, 2: { cards: 6 }, 3: { rows: 3 } } },
};

function makeOnsetRimeKType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('onset-rime-k: unknown mode ' + mode);
  const desc = `Free printable ${i18n.en.title} Worksheet for Kindergarten. ${INSTR[mode][2]} Download the free PDF.`;
  if (desc.length < 120 || desc.length > 170) throw new Error(`${id}: the description has ${desc.length} letters (120 to 170)`);
  const INFO = { pics: BANK.pics, continuous: BANK.continuous, refused: Object.keys(BANK.refused), banned: BANK.banned, modelOnly: BANK.modelOnly };
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the picture words are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2];
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, ctx.rng);
      const blocks = renderPage(plan, mode, lv, d, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-or="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((S, INFO) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-or]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsOr.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fsz = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => (e ? e.textContent.replace(/\s+/g, ' ').trim() : '');
        const all = (q, e = root) => [...e.querySelectorAll(q)];
        const one = (q, e = root) => e.querySelector(q);
        const rb = R(root);
        const P = INFO.pics;
        const say = (s) => '/' + s + '/';
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
        const oddClass = (ws) => { const c = ws.map((w) => P[w].cls); for (let i = 0; i < 3; i++) { const o = c.filter((_, j) => j !== i); if (o[0] === o[1] && c[i] !== o[0]) return ws[i]; } return null; };
        const H = S.HOLD[mode][lv];

        // letters: ligatures off everywhere, and an f before i, f, l, t and a t before t have their own room
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if (all('*').some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg, style') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        if (/['"]/.test(root.textContent)) fails.push('a straight apostrophe or quote on the page');
        // pictures: loaded, 60 px or more, no two of one kind, every one a picture word of the bank
        const imgs = all('img');
        imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < S.PIC - 0.5 || R(im).height < S.PIC - 0.5) fails.push(`a picture smaller than ${S.PIC} px`);
          const w = im.dataset.lcsPic; if (!P[w] || INFO.refused.includes(w)) fails.push(`"${w}" is not a picture word of the bank`); });
        if (new Set(imgs.map((im) => im.dataset.lcsPickind)).size !== imgs.length) fails.push('two pictures of one kind on the page');
        // the instruction and the task lines of this level
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        { const ls = all('[data-lcs-label]'), want = S.LINES[mode][lv];
          if (ls.length !== want.length) fails.push(`${ls.length} task lines, not ${want.length}`);
          ls.forEach((l, i) => { const t = txt(l), m = /^(\d+)\. (.*)$/.exec(t); if (!m || +m[1] !== i + 1 || m[2] !== want[i]) fails.push(`task line ${i + 1} is not the line of level ${lv}: "${t}"`); }); }
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more, no blank band
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, svg').forEach((e) => { if (e.closest('[data-lcs-keytag]')) return; const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card (' + (Object.keys(e.dataset)[0] || e.tagName) + ')'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
        { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last block`); }
        // the blank bands a reader SEES inside every block (the union of everything printed)
        blocks.forEach((b) => { const iv = [], s = cs(b);
          [b, ...b.querySelectorAll('*')].forEach((e) => {
            const r = R(e); if (!r.width || !r.height || e === b || e.closest('[data-lcs-keytag]')) return;
            if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') return;
            if (e.tagName.toLowerCase() === 'svg') { iv.push([r.top, r.bottom]); return; }
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
        if (!isKey && (all('[data-lcs-ring]').length || all('[data-lcs-onbox], [data-lcs-restbox]').some((e) => txt(e)))) fails.push('an answer is marked on the page of the child');
        // what the teacher says: on the ANSWER KEY only, at its foot; the child's page ends at its task and holds nothing of it
        // (no strip, none of its lines, no sound written between slashes)
        const tss = all('[data-lcs-tstrip]');
        if (!isKey) {
          if (tss.length) fails.push('the teacher lines stand on the page of the child');
          const pt = root.textContent;
          if (pt.includes(S.TSTRIP) || pt.includes(S.TSAY[mode]) || /\/[a-zăĕĭŏŭāēīōô]+\//i.test(pt) || pt.includes('…')) fails.push('a text of the teacher lines stands on the page of the child');
        } else if (tss.length !== 1) fails.push(`${tss.length} blocks of teacher lines on the key (one wanted)`);
        const ts = isKey ? tss[0] : null;
        if (ts) {
          if (ts !== blocks[blocks.length - 1]) fails.push('the teacher lines are not at the foot of the key');
          if (txt(one('[data-lcs-tstriphead]', ts)) !== S.TSTRIP) fails.push('the teacher lines do not say they are read aloud');
          if (txt(one('[data-lcs-tsay]', ts)) !== S.TSAY[mode]) fails.push('the teacher lines do not say how to say the parts'); }
        // "Answer key" on the key only, over the corner of the first block, touching no text
        { const tg = all('[data-lcs-keytag]');
          if (!isKey && tg.length) fails.push('the page of the child says it is the answer key');
          if (isKey) { if (tg.length !== 1 || txt(tg[0]) !== S.KEYTAG || !blocks[0].contains(tg[0])) fails.push('the key does not say "Answer key" at the top');
            else { const q = R(tg[0]), hit = (e) => { const z = R(e); return z.width && z.left < q.right && z.right > q.left && z.top < q.bottom && z.bottom > q.top; };
              const texts = [instr, ...all('[data-lcs-label], [data-lcs-read], [data-lcs-badge], img')].filter(Boolean);
              if (q.top < rb.top - 30 || texts.some(hit)) fails.push('the "Answer key" tag touches a text or a picture'); } } }
        const items = ts ? all('[data-lcs-tstripitem]', ts) : [];
        // what the strip says of a word
        const itemOk = (it, n, w, blend) => { const parts = txt(one('[data-lcs-parts]', it)), word = txt(one('[data-lcs-word]', it));
          return txt(it).startsWith(n + ' ') && parts === say(P[w].on) + ' … ' + say(P[w].rest) && word === (blend ? '(' + w + ')' : w + ':'); };
        { const ws = root.textContent.toLowerCase().match(/[a-z]+/g) || []; const bad = ws.filter((w) => INFO.banned.includes(w) || INFO.modelOnly.includes(w)); if (bad.length) fails.push('a word of the never list or a model-only word: ' + [...new Set(bad)].join(', ')); }

        if (mode === 'blend') {
          const rows = all('[data-lcs-brow]');
          if (rows.length !== H.rows) fails.push(`${rows.length} rows, not ${H.rows}`);
          const at = [], kinds = { rhyme: 0, end: 0, chain: 0 }, fams = [];
          let odd = 0, linked = 0;
          rows.forEach((rw, r) => {
            const tag = 'row ' + (r + 1), ps = all('[data-lcs-pw]', rw), ws = ps.map((p) => p.dataset.lcsPw), t = rw.dataset.lcsTarget;
            if (ps.length !== 3 || ws.some((w) => !P[w])) { fails.push(`${tag}: not three pictures of the bank`); return; }
            const ok = ps.filter((p) => p.dataset.lcsOk);
            if (ok.length !== 1 || ok[0].dataset.lcsPw !== t || !ws.includes(t)) { fails.push(`${tag}: not one picture of the word said`); return; }
            if (P[t].noTarget) fails.push(`${tag}: "${t}" is a picture a child may name another way, and it is the one to circle`);
            const sizes = ps.map((p) => Math.round(R(p.querySelector('img')).width));
            if (new Set(sizes).size !== 1) fails.push(`${tag}: the pictures are not all one size`);
            const on = ws.map((w) => P[w].on);
            const vs = (w) => [P[w].v, ...(P[w].alt || [])], sameV = (x, y) => vs(x).some((a) => vs(y).includes(a));
            const vDiff = ws.every((x, i) => ws.every((y, j) => j <= i || !sameV(x, y)));
            if (ws.some((x, i) => ws.some((y, j) => j > i && on[i] === on[j] && sameV(x, y)))) fails.push(`${tag}: two pictures with one first sound and one vowel`);
            if (lv === 1 && (new Set(on).size !== 3 || !vDiff)) fails.push(`${tag}: the pictures do not start with three different sounds and three different vowels`);
            if (lv === 2 && (new Set(on).size !== 1 || !vDiff)) fails.push(`${tag}: the pictures do not start with one sound and have three different vowels`);
            if (lv === 3) { const others = ws.filter((w) => w !== t), steady = (w) => !P[w].alt;
              const pa = others.filter((w) => P[w].rest === P[t].rest && P[w].on !== P[t].on), de = others.filter((w) => P[w].on === P[t].on && !sameV(w, t));
              // the kind of the row, read from its pictures: three with one rest; or one with the word's rest and one with its
              // first sound; or one with its first sound that rhymes with the third (not with the word)
              let kind = null, keyed = [];
              if (pa.length === 2) { kind = 'rhyme'; keyed = ws; }
              else if (pa.length === 1 && de.length === 1) { kind = 'chain'; keyed = [t, pa[0]]; }
              else if (pa.length === 0 && de.length === 1) { const p3 = others.find((w) => w !== de[0]); if (P[p3].rest === P[de[0]].rest && P[p3].on !== P[t].on) { kind = 'end'; keyed = [de[0], p3]; } }
              if (!kind) fails.push(`${tag}: not a row of three rhymes, nor one with the rest and one with the first sound of the word, nor one with its first sound that rhymes with the third`);
              else { kinds[kind]++; fams.push(P[keyed[0]].rest);
                if (keyed.some((w) => !steady(w))) fails.push(`${tag}: a picture keyed as having the same rest has a vowel some say another way`); }
              // the picture that shares a part with both others ("rhymes with one, starts like the other")
              const both = ws.filter((x) => ws.filter((y) => y !== x && (P[y].on === P[x].on || P[y].rest === P[x].rest)).length === 2);
              if (both.length === 1 && both[0] === t) linked++; }
            if (ws.filter((w) => P[w].on === P[t].on && P[w].rest === P[t].rest).length !== 1) fails.push(`${tag}: another picture has the parts of the word said`);
            if (oddClass(ws) === t) odd++;
            at.push(ws.indexOf(t));
            const rg = all('[data-lcs-ring]', rw);
            if (isKey && (rg.length !== 1 || !rg[0].closest('[data-lcs-ok]'))) fails.push(`${tag}: the key does not circle the picture of the word`);
            // the key's teacher lines say this row's word in its two parts
            if (isKey && (!items[r] || !itemOk(items[r], r + 1, t, true))) fails.push(`${tag}: the teacher lines do not say the parts of "${t}"`);
          });
          if (isKey && items.length !== rows.length) fails.push(`${items.length} teacher lines for ${rows.length} rows`);
          if (at.length === H.rows && !placesOk(at, 3)) fails.push('the pictures to circle stand in a pattern: ' + at.join(''));
          if (odd > Math.floor(H.rows / 3)) fails.push(`the picture to circle is the only one of its class in ${odd} rows`);
          if (lv === 3) {
            if (new Set(fams).size !== fams.length) fails.push('one rest family keyed twice on the page');
            if (Object.entries(S.KINDS).some(([k, n]) => kinds[k] < n)) fails.push(`the rows are ${kinds.rhyme} of three rhymes, ${kinds.end} with the first sound rhyming with the third, ${kinds.chain} with the rest and the first sound (${S.KINDS.rhyme}, ${S.KINDS.end}, ${S.KINDS.chain} or more wanted)`);
            if (linked > H.rows - 2) fails.push(`the picture linked to both others is the word in ${linked} of ${H.rows} rows: the page can be done without listening`);
            { const ks = rows.map((rw) => { const ws = all('[data-lcs-pw]', rw).map((p) => p.dataset.lcsPw), t = rw.dataset.lcsTarget; return ws.filter((w) => w !== t && P[w] && P[t] && P[w].rest === P[t].rest).length === 2 ? 'r' : ws.some((w) => w !== t && P[w] && P[t] && P[w].rest === P[t].rest) ? 'c' : 'e'; }).join('');
              if (/(.)\1\1/.test(ks)) fails.push('three rows of one kind in a row: ' + ks); }
          }
        }
        if (mode === 'split') {
          const lg = all('[data-lcs-legendword]');
          if (lg.length !== 2 || txt(lg[0]) !== S.LEGEND.on || txt(lg[1]) !== S.LEGEND.rest) fails.push('the legend does not name the first sound box and the rest box');
          const boxCheck = (host, w, size, tag) => {
            const ob = one('[data-lcs-onbox]', host), rbx = one('[data-lcs-restbox]', host), im = one('img', host);
            if (!ob || !rbx || !im) { fails.push(`${tag}: no picture with two boxes`); return; }
            if (R(ob).width < size - 0.5 || R(ob).height < size - 0.5 || R(rbx).height < size - 0.5 || R(rbx).width < R(ob).width * 1.3) fails.push(`${tag}: the boxes are smaller than ${size} px, or the rest box is not the long one`);
            if (R(ob).top < R(im).bottom - 0.5 || R(rbx).top < R(im).bottom - 0.5 || R(ob).right > R(rbx).left + 0.5) fails.push(`${tag}: the boxes do not stand under the picture, the small one first`);
            if (isKey && (txt(ob) !== say(P[w].on) || txt(rbx) !== say(P[w].rest))) fails.push(`${tag}: the key does not print the two parts of "${w}"`);
            ['onbox', 'restbox'].forEach((k) => { const bx = one(`[data-lcs-${k}]`, host); const rg = document.createRange(); rg.selectNodeContents(bx); if ([...rg.getClientRects()].some((q) => q.width > 0.5 && (q.left < R(bx).left || q.right > R(bx).right))) fails.push(`${tag}: a key part leaves its box`); });
          };
          if (lv < 3) {
            const cards = all('[data-lcs-card]');
            if (cards.length !== H.cards) fails.push(`${cards.length} pictures, not ${H.cards}`);
            cards.forEach((c, i) => { const w = c.dataset.lcsCard, tag = 'picture ' + (i + 1);
              if (!P[w]) { fails.push(`${tag}: not a picture word of the bank`); return; }
              if (lv === 1 && !INFO.continuous.includes(P[w].on)) fails.push(`${tag}: "${w}" does not start with a sound one can stretch`);
              if (lv === 2 && !S.STOPS.includes(P[w].on)) fails.push(`${tag}: "${w}" starts with a sound one can stretch`);
              boxCheck(c, w, S.MARK, tag);
              if (isKey && (!items[i] || !itemOk(items[i], i + 1, w, false))) fails.push(`${tag}: the teacher lines do not name "${w}" and its parts`); });
            if (isKey && items.length !== cards.length) fails.push(`${items.length} teacher lines for ${cards.length} pictures`);
          } else {
            const rows = all('[data-lcs-srow]');
            if (rows.length !== H.rows) fails.push(`${rows.length} rows, not ${H.rows}`);
            const at = []; let k = 0;
            rows.forEach((rw, r) => {
              const tag = 'row ' + (r + 1), ps = all('[data-lcs-spw]', rw), ws = ps.map((p) => p.dataset.lcsSpw);
              if (ps.length !== 3 || ws.some((w) => !P[w])) { fails.push(`${tag}: not three pictures of the bank`); return; }
              const ok = ps.filter((p) => p.dataset.lcsOk).map((p) => p.dataset.lcsSpw), odd = ws.find((w) => !ok.includes(w));
              if (ok.length !== 2 || P[ok[0]].rest !== P[ok[1]].rest || P[odd].rest === P[ok[0]].rest || [P[odd].v, ...(P[odd].alt || [])].some((a) => [P[ok[0]].v, ...(P[ok[0]].alt || [])].includes(a))) fails.push(`${tag}: not two pictures with one rest and a third with another rest and another vowel`);
              else if (P[ok[0]].cls === P[ok[1]].cls && P[odd].cls !== P[ok[0]].cls) fails.push(`${tag}: the two with one rest are the only two of a class`);
              else if (P[ok[0]].alt || P[ok[1]].alt) fails.push(`${tag}: a picture keyed as having the same rest has a vowel some say another way`);
              at.push(ws.indexOf(odd));
              ps.forEach((p, i) => boxCheck(p, ws[i], S.TOUCH, `${tag} picture ${i + 1}`));
              const rg = all('[data-lcs-ring]', rw);
              if (isKey && (rg.length !== 2 || rg.some((x) => !x.parentElement.dataset.lcsOk))) fails.push(`${tag}: the key does not circle the two pictures with one rest`);
              if (isKey) { const it = items[r], pp = it ? all('[data-lcs-parts]', it) : [], ww = it ? all('[data-lcs-word]', it) : [];
                if (!it || !txt(it).startsWith((r + 1) + ' ') || pp.length !== 3 || ws.some((w, i) => txt(pp[i]) !== say(P[w].on) + ' … ' + say(P[w].rest) || txt(ww[i]) !== w + ':')) fails.push(`${tag}: the teacher lines do not name the three pictures of the row and their parts`); }
            });
            if (isKey && items.length !== rows.length) fails.push(`${items.length} teacher lines for ${rows.length} rows`);
            if (at.length === H.rows && !placesOk(at, 3)) fails.push('the odd pictures stand in a pattern: ' + at.join(''));
          }
        }
        return fails;
      }, SPEC, INFO);
    },
  };
}

module.exports = { makeOnsetRimeKType, orFaultsOf, drawPage, LEVELS, INSTR, LINES, SPEC, MODES, placesOk };
