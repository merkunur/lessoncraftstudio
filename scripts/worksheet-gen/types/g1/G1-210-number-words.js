/**
 * G1-210 — Number words ↔ numerals. Peak native-rebuild leverage: the words
 * come from lib/number-words.js (fr soixante-dix, da femoghalvtreds, de/nl
 * inversion, it ventitré, fi agglutination — every locale is genuinely
 * different work). Direction is numeral → CIRCLE the word (safe: no
 * handwriting judging). The digit-SWAP distractor (21 vs 12) is deliberate —
 * it is exactly the Zahlendreher error the inversion locales assign this
 * worksheet to fight. CCSS 2.NBT.A.3 / de Zahlwörter / pt números por extenso.
 * d1: within 20 · d2: within 100 · d3: numeral↔word matching columns.
 *
 * Level Set 2026-10-13 (walk #60, PDF + interactive + key). Level 2 copy 1 = the published page, built by the
 * untouched June draw (`_legacy`, byte-identical). Every other page (levels 1 and 3, and the new level-2 copies) is
 * built by `_levelSet` from the per-face table LEVELS (the five variation files only call levelsFor — ⚠ a re-run of
 * tools/gen-var-specs.js / gen-b3var-specs would flatten them back to one config):
 *   style  far       — the wrong words share neither the tens nor the ones word with the number (support)
 *          pub       — the published traps (digit swap, one / ten / two away)
 *          swap      — the digit swap (27 / 72) on EVERY card, plus one or ten away
 *          ones      — a teen with its ones word (14 → four) and its neighbours (to 20)
 *          near      — the closest look-alikes only (swap, one / ten away)
 *          tens-easy / tens-near — round tens: the teen twin (40 ↔ 14) and a FAR ten / the teen twin and both
 *                   neighbour tens (the de title asks «vierzig oder vierzehn?» — every tens level keeps that trap)
 *   opts   3 or 4 words per card · traps (match) — the page holds a digit-swap pair and a teen / -ty pair
 *   extra  (write) — that many look-alike words in the bank that belong to no card
 * The right word sits in every slot equally often (lib/answer-slots.js), and a card never makes the right word the
 * one that looks most like all the others (a child can find it by comparing words, without reading the number).
 * The SCREEN versions: circle + match = tap the word (tap-choice); write = the printed page, the child TYPES the word
 * on its line (type-word, a letter pad). The KEY: the right word ringed / the number beside its word / the word on
 * its line.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { numberWord: engineWord } = require('../../lib/number-words.js');
// nl: the number word 1 standing alone is «één» ("een" reads as the article «a») — native review 2026-10-13; the
// compounds (eenentwintig) keep the plain form. Every word this family prints, grades or types goes through here.
const numberWord = (n, loc) => (String(loc).slice(0, 2) === 'nl' && n === 1 ? 'één' : engineWord(n, loc));
const { answerSlots } = require('../../lib/answer-slots.js');
const { textWidthEm } = require('../../primitives/bankword-width.js');

const NUMERAL = (v, size) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:#146B5E">${v}</span>`;
const wordChip = (word, value, correct) =>
  `<span style="display:inline-flex;align-items:center;justify-content:center;background:#FFFFFF;` +
  `border:2.5px solid #146B5E;border-radius:22px;padding:6px 18px;font-family:'Nunito';font-weight:800;` +
  `font-size:17px;color:#3A3530" data-lcs-choice="${value}"${correct ? ' data-lcs-correct="1"' : ''}>${word}</span>`;

function distractorValues(n, max, rng) {
  const pool = new Set();
  const swap = +String(n).split('').reverse().join('');
  if (swap !== n && swap >= 1 && swap <= max) pool.add(swap); // the Zahlendreher trap
  [n - 1, n + 1, n - 10, n + 10, n - 2, n + 2].forEach((v) => {
    if (v >= 0 && v <= max && v !== n) pool.add(v);
  });
  const arr = rng.shuffle([...pool]);
  return arr.slice(0, 2);
}

// ⚠ the June configs. Only level 2 was ever published (wave-nt20 / wave-var-core); the faces' level 2 below are
// their published configs and must never change.
const LEGACY = {
  1: { mode: 'circle', min: 3, max: 20, cards: 6, cols: 2, rows: 3 },
  2: { mode: 'circle', min: 13, max: 100, cards: 6, cols: 2, rows: 3 },
  3: { mode: 'match', min: 13, max: 100, items: 5 },
};
const C = { cards: 6, cols: 2, rows: 3 };
const LEVELS = {
  'G1-210': {
    1: { mode: 'circle', min: 3, max: 20, ...C, style: 'far' },
    2: LEGACY[2],
    3: { mode: 'circle', min: 21, max: 99, ...C, style: 'swap', opts: 4 },
  },
  'G1-223': {
    1: { mode: 'circle', min: 3, max: 10, ...C, style: 'far' },
    2: { mode: 'circle', min: 3, max: 20, cards: 6, cols: 2, rows: 3 },
    3: { mode: 'circle', min: 11, max: 20, ...C, style: 'ones', opts: 4 },
  },
  'G1-224': {
    1: { mode: 'circle', pool: 'tens', min: 10, max: 100, ...C, style: 'tens-easy' },
    2: { mode: 'circle', pool: 'tens', min: 10, max: 100, cards: 6, cols: 2, rows: 3 },
    3: { mode: 'circle', pool: 'tens', min: 10, max: 100, ...C, style: 'tens-near', opts: 4 },
  },
  'G1-225': {
    1: { mode: 'match', min: 3, max: 20, items: 5 },
    2: { mode: 'match', min: 13, max: 100, items: 5 },
    3: { mode: 'match', min: 13, max: 99, items: 6, traps: true },
  },
  'G1-226': {
    // the numbers to 30, the wrong words from the whole page range to 50 (else 21-29 is always the longest word)
    1: { mode: 'circle', min: 13, max: 30, ...C, style: 'far', farMax: 50 },
    2: { mode: 'circle', min: 13, max: 50, cards: 6, cols: 2, rows: 3 },
    3: { mode: 'circle', min: 21, max: 50, ...C, style: 'near', opts: 4 },
  },
  'G1-227': {
    1: { mode: 'write', min: 3, max: 10, cards: 6, cols: 2, rows: 3 },
    2: { mode: 'write', min: 3, max: 20, cards: 6, cols: 2, rows: 3 },
    3: { mode: 'write', min: 11, max: 20, cards: 6, cols: 2, rows: 3, extra: 3 },
  },
};
function levelsFor(id) {
  const L = LEVELS[id];
  if (!L) throw new Error('number-words: no levels for ' + id);
  return { 1: L[1], 2: L[2], 3: L[3] };
}

// ---- the level-set draw (new pages only) ----
const TENS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const swapOf = (n) => (n > 10 && n < 100 && n % 10 && Math.floor(n / 10) !== n % 10 ? (n % 10) * 10 + Math.floor(n / 10) : null);
const inR = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
/** the wrong values a card may draw: { must: [...], may: [...] } (never the number itself, never a repeat) */
function wrongPool(n, d) {
  const st = d.style || 'pub';
  const uniq = (a) => [...new Set(a)].filter((v) => v !== n);
  if (st === 'pub' || !st) {
    if (d.pool === 'tens') {
      const may = [];
      if (n >= 30 && n <= 90) may.push(n / 10 + 10);
      [n - 10, n + 10].forEach((v) => { if (v >= 10 && v <= d.max) may.push(v); });
      if (may.length < 2) may.push(n === 10 ? 12 : n - 1);
      return { must: [], may: uniq(may) };
    }
    const sw = +String(n).split('').reverse().join('');
    return { must: [], may: uniq([sw >= 1 && sw <= d.max ? sw : null, n - 1, n + 1, n - 10, n + 10, n - 2, n + 2].filter((v) => v != null && v >= 0 && v <= d.max)) };
  }
  if (st === 'far') {
    const may = [];
    for (let v = d.min; v <= (d.farMax || d.max); v++) {
      if (v === n) continue;
      if (n < 10 || v < 10) { if (Math.abs(v - n) >= 3 && Math.abs(v - n) !== 10) may.push(v); continue; }
      if (Math.floor(v / 10) !== Math.floor(n / 10) && v % 10 !== n % 10 && v !== swapOf(n)) may.push(v);
    }
    return { must: [], may: uniq(may) };
  }
  if (st === 'swap') {
    const s = swapOf(n);
    if (!s) throw new Error('number-words: no digit swap for ' + n);
    const near = [n - 1, n + 1, n - 10, n + 10].filter((v) => inR(v, 1, 99));
    const second = near.map(swapOf).concat([s - 1, s + 1, s - 10, s + 10]).filter((v) => inR(v, 1, 99));
    return { must: [s], may: uniq(near.concat(second).filter((v) => v !== s)) };
  }
  if (st === 'ones') {
    if (n === 11 || n === 12) return { must: [], may: uniq([10, 11, 12, 13, 14].filter((v) => v !== n)) };
    const o = n === 20 ? 2 : n - 10;
    const may = [n - 1, n + 1, n === 20 ? 12 : n - 2, o - 1, o + 1, n + 2].filter((v) => inR(v, 1, 20) && v !== o);
    return { must: [o], may: uniq(may) };
  }
  if (st === 'near') {
    const s = swapOf(n);
    const must = s && s <= d.max ? [s] : [];
    const near = [n - 1, n + 1, n - 10, n + 10].filter((v) => inR(v, 1, d.max));
    const second = near.map(swapOf).concat(must.length ? [must[0] - 1, must[0] + 1, must[0] + 10, must[0] - 10] : [n - 2, n + 2, n - 9, n + 9, n - 11, n + 11]).filter((v) => inR(v, 1, d.max));
    return { must, may: uniq(near.concat(second).filter((v) => !must.includes(v))) };
  }
  if (st === 'tens-easy') {
    const must = n >= 30 && n <= 90 ? [n / 10 + 10] : n === 20 ? [12] : [];
    return { must, may: uniq(TENS.filter((v) => Math.abs(v - n) >= 30)) };
  }
  if (st === 'tens-near') {
    const must = n >= 30 && n <= 90 ? [n / 10 + 10] : n === 20 ? [12] : [];
    const may = [n - 10, n + 10, n - 20, n + 20].filter((v) => TENS.includes(v)).concat([n - 10, n + 10].filter((v) => v >= 30 && v <= 90).map((v) => v / 10 + 10), n === 10 ? [12] : []);
    return { must, may: uniq(may) };
  }
  throw new Error('number-words: unknown style ' + st);
}
/** Dice similarity over letter pairs — how much two number words look alike */
function sim(a, b) {
  const bg = (s) => { const o = []; for (let i = 0; i < s.length - 1; i++) o.push(s.slice(i, i + 2)); return o; };
  const A = bg(a), B = bg(b);
  if (!A.length || !B.length) return 0;
  const cnt = {}; A.forEach((x) => { cnt[x] = (cnt[x] || 0) + 1; });
  let hit = 0; B.forEach((x) => { if (cnt[x]) { cnt[x]--; hit++; } });
  return (2 * hit) / (A.length + B.length);
}
/** the option a child would pick by comparing words only: the one most like all the others */
function centroidIndex(words) {
  const s = words.map((w, i) => words.reduce((t, v, j) => (i === j ? t : t + sim(w, v)), 0));
  const top = Math.max(...s);
  const at = s.map((v, i) => (Math.abs(v - top) < 1e-9 ? i : -1)).filter((i) => i >= 0);
  return at.length === 1 ? at[0] : -1;
}
function combos(arr, k) {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [h, ...t] = arr;
  return combos(t, k - 1).map((c) => [h, ...c]).concat(combos(t, k));
}
/** the wrong values of one card: the must-haves, then a choice among the may-haves; the right word is the most
 *  look-alike one of its card no more often than chance */
function pickWrong(n, d, loc, rng) {
  const k = (d.opts || 3) - 1;
  const { must, may } = wrongPool(n, d);
  const need = k - must.length;
  if (need < 0 || may.length < need) throw new Error(`number-words: ${n} has ${must.length + may.length} wrong words for ${k}`);
  const all = combos(rng.shuffle(may.slice()), need).slice(0, 400);
  // the right word may be the most look-alike one only as often as chance (1 card in k), never on most cards
  // … nor the one longest or shortest word (2026-10-13: the right teen was the longest of its card 45% of the time)
  const isMid = (c) => {
    const w = [n, ...must, ...c].map((v) => numberWord(v, loc)), L = w.map((x) => [...x].length);
    const only = (v) => L.filter((x) => x === v).length === 1;
    return centroidIndex(w) === 0 || (L[0] === Math.max(...L) && only(L[0])) || (L[0] === Math.min(...L) && only(L[0]));
  };
  const mid = all.filter(isMid), good = all.filter((c) => !isMid(c));
  const from = good.length && (!mid.length || rng.next() >= 1 / (k + 1)) ? good : all;
  const pick = from[rng.int(0, from.length - 1)];
  return [...must, ...pick];
}
/** one font size for a group of words so the longest fits `room` px (Nunito 800, measured) */
function fitPx(words, room, cap) {
  const em = Math.max(...words.map((w) => textWidthEm(w)));
  return Math.max(11, Math.min(cap, Math.floor(room / em)));
}
const CORAL = '#F2784B';
const chipNew = (word, value, correct, px, key, tight) =>
  `<span style="display:inline-flex;align-items:center;justify-content:center;background:${key && correct ? '#FDE7DC' : '#FFFFFF'};` +
  `border:${key && correct ? '4px solid ' + CORAL : '2.5px solid #146B5E'};border-radius:22px;padding:${key && correct ? (tight ? '1px 14.5px' : '4.5px 16.5px') : (tight ? '2.5px 16px' : '6px 18px')};font-family:'Nunito';font-weight:800;` +
  `font-size:${px}px;color:#3A3530;white-space:nowrap" data-lcs-choice="${value}"${correct ? ' data-lcs-correct="1"' : ''}>${word}</span>`;

const SCR_W = 660, OPT_H = 100;
/** a tap-choice screen card: the number, then its words, one under the other, full width */
function screenItem(k, n, vals, loc) {
  const words = vals.map((v) => numberWord(v, loc));
  const px = fitPx(words, 400, 30);
  const opts = vals.map((v, j) => `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${words[j]}"${v === n ? ' data-lcs-correct="1"' : ''} ` +
    `style="width:440px;min-height:${OPT_H}px;padding:8px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-family:'Nunito';font-weight:800;font-size:${px}px;color:#3A3530;white-space:nowrap">${words[j]}</span>`).join('');
  return `<div data-lcs-item data-lcs-word="${k + 1}" data-lcs-q="nw:${n}" data-ws-content ` +
    `style="display:flex;align-items:center;justify-content:center;gap:22px;width:${SCR_W}px;padding:12px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
    `<div style="width:150px;display:flex;justify-content:center">${NUMERAL(n, 64)}</div>` +
    `<div style="display:flex;flex-direction:column;gap:10px">${opts}</div></div>`;
}
const screenWrap = (inner) => `<div data-ws-content data-lcs-screen="number-words" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:6px">${inner}</div>`;

module.exports = {
  id: 'G1-210',
  slug: 'number-words-and-numerals',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'number-words',
  themeAxis: { applicable: false },
  legacy: LEGACY,
  levelsFor,
  difficulty: levelsFor('G1-210'),
  i18n: {
    en: {
      title: 'Number Words',
      instruction: 'Read the number. Circle the word that matches it.',
    },
  },
  // what makes a copy different: the numbers it asks (copies of a level share at most a third of them)
  levelSetWords(m) { return (m.asks || []).map(String); },
  interactive: {
    kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], screenHeight: 6000,
    instructionKey: (difficulty, spec) => (spec.difficulty[difficulty].mode === 'match' ? 'match' : 'circle'),
    // INDEPENDENT oracle: the right word recomputed from the stamped number by the engine — never the page's marks
    oracle: (items, locale) => items.map((it) => {
      const q = String((it.meta || {})['data-lcs-q'] || '');
      const m = /^nw:(\d+)$/.exec(q);
      if (!m) throw new Error('number-words oracle: no number on ' + q);
      const want = numberWord(+m[1], String(locale || 'en').slice(0, 2));
      const hits = it.options.map((o) => String(typeof o === 'object' ? o.label : o)).map((l, i) => (l === want ? i : -1)).filter((i) => i >= 0);
      if (hits.length !== 1) throw new Error(`number-words oracle: ${hits.length} options read "${want}"`);
      return hits[0];
    }),
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (published) return this._legacy(d, locale, ctx);
    return this._levelSet(d, (locale || 'en').slice(0, 2), ctx || {});
  },

  // ⚠ the June draw, byte-identical: the published page (level 2, copy 1) only
  _legacy(d, locale, ctx) {
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const used = new Set();
    // nt20-VAR: pool 'tens' = round tens only (the forty-vs-fourteen page)
    const tensPool = d.pool === 'tens' ? [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].filter((v) => v >= d.min && v <= d.max) : null;
    const pickN = () => {
      let n, guard = 0;
      do { n = tensPool ? rng.pick(tensPool) : rng.int(d.min, d.max); guard++; } while (used.has(n) && guard < 200);
      used.add(n);
      return n;
    };
    const distractorsFor = (n) => {
      if (!tensPool) return distractorValues(n, d.max, rng);
      // tens page: the teen counterpart (40 ↔ 14 — THE classic word trap) + a neighbor ten
      const pool = new Set();
      const teen = n / 10 + 10;
      if (n >= 30 && n <= 90) pool.add(teen);
      [n - 10, n + 10].forEach((v) => { if (v >= 10 && v <= d.max && v !== n) pool.add(v); });
      if (pool.size < 2) pool.add(n === 10 ? 12 : n - 1);
      return rng.shuffle([...pool]).slice(0, 2);
    };

    // nt20-VAR mode 'write': numeral + blank writing line per card, with a
    // shuffled word BANK banner on top — the child finds and copies the right
    // word (G1-honest: copying, not spelling from memory; self-checking).
    if (d.mode === 'write') {
      const ns = Array.from({ length: d.cards }, pickN);
      const bank = rng.shuffle(ns.slice());
      // compact chips + card metrics — long number words (es diecisiete,
      // pt dezessete) wrap the bank to three rows and overflow the page at
      // the roomier first-cut sizes
      const bankHtml = `<div class="ws-scene-banner" style="gap:12px;flex-wrap:wrap" data-lcs-bank>` +
        bank.map((v) =>
          `<span style="font-family:'Nunito';font-weight:800;font-size:16px;color:#3A3530;background:#FFFFFF;` +
          `border:2px solid #F0E4CB;border-radius:16px;padding:4px 12px" data-lcs-bank-word="${v}">${numberWord(v, loc)}</span>`).join('') +
        `</div>`;
      const cards = ns.map((n) =>
        `<div class="ws-card-stage" style="flex-direction:column;gap:12px;justify-content:center" data-lcs-write="${n}">` +
        NUMERAL(n, 56) +
        `<div style="width:82%;height:50px;border-bottom:2.5px solid #8A8276"></div></div>`);
      return {
        bodyHtml: bankHtml + `<div style="margin-top:10px">${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
        meta: {},
      };
    }

    if (d.mode === 'match') {
      const ns = Array.from({ length: d.items }, pickN);
      let order;
      do { order = rng.shuffle(ns.map((_, i) => i)); } while (order.some((v, i) => v === i));
      const itemH = Math.floor((740 - (d.items - 1) * 14) / d.items);
      const left = ns.map((n) =>
        `<div class="ws-match-item" style="width:170px;height:${itemH}px" data-lcs-left="${n}">` +
        NUMERAL(n, 44) + `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
      const right = order.map((idx) =>
        `<div class="ws-match-item ws-match-item--plain" style="width:300px;height:${itemH}px;padding:0 14px" data-lcs-right="${ns[idx]}">` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:20px;color:#3A3530;text-align:center">${numberWord(ns[idx], loc)}</span>` +
        `<span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
      return {
        bodyHtml: `<div class="ws-match" style="padding:6px 40px">` +
          `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
        meta: {},
      };
    }

    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      const n = pickN();
      const opts = rng.shuffle([n, ...distractorsFor(n)]);
      const chips = opts.map((v) => wordChip(numberWord(v, loc), v, v === n)).join('');
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-n="${n}">` +
        NUMERAL(n, 52) +
        `<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${chips}</div></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: {} };
  },

  // the numbers of a new page: distinct, every number of the range equally likely; the match traps first
  _numbers(d, rng) {
    const range = (d.pool === 'tens' ? TENS.filter((v) => v >= d.min && v <= d.max) : Array.from({ length: d.max - d.min + 1 }, (_, i) => d.min + i))
      .filter((v) => d.style !== 'swap' || swapOf(v));
    const count = d.mode === 'match' ? d.items : d.cards;
    if (range.length < count) throw new Error(`number-words: ${range.length} numbers for ${count} cards`);
    const ns = [];
    if (d.traps) {
      // a digit-swap pair (27 / 72) and a teen / -ty pair (14 / 40), both inside the range
      const sw = rng.shuffle(range.filter((v) => swapOf(v) && swapOf(v) > v && inR(swapOf(v), d.min, d.max)));
      const a = sw[0]; ns.push(a, swapOf(a));
      const tt = rng.shuffle([3, 4, 5, 6, 7, 8, 9].filter((x) => inR(10 + x, d.min, d.max) && inR(10 * x, d.min, d.max) && !ns.includes(10 + x) && !ns.includes(10 * x)));
      ns.push(10 + tt[0], 10 * tt[0]);
    }
    for (const v of rng.shuffle(range.slice())) { if (ns.length >= count) break; if (!ns.includes(v)) ns.push(v); }
    return d.traps ? rng.shuffle(ns) : ns;
  },

  _levelSet(d, loc, ctx) {
    const rng = ctx.rng;
    const ns = this._numbers(d, rng);
    const stamp = `data-lcs-nw="${d.style || 'pub'}:${d.opts || 3}:${d.min}:${d.max}:${d.extra || 0}:${d.traps ? 1 : 0}"`;
    const meta = { asks: ns.slice() };

    if (d.mode === 'write') {
      // the bank: every card's word, and (level 3) look-alike words that belong to no card — the ones word of a teen
      // (14 → four) or a neighbour of a number on the page
      const extras = [];
      if (d.extra) {
        // 2026-10-13 review: one-digit extras could be thrown out without reading (no -teen) — the extras are now teens
        // the page does not use, then the -ty twins of its teens (14 → forty)
        const teens = rng.shuffle([11, 12, 13, 14, 15, 16, 17, 18, 19].filter((v) => !ns.includes(v)));
        const tys = rng.shuffle(ns.filter((v) => v >= 13 && v <= 19).map((v) => (v - 10) * 10));
        for (const v of [...teens, ...tys]) { if (extras.length >= d.extra) break; if (!extras.includes(v)) extras.push(v); }
        if (extras.length < d.extra) throw new Error('number-words: too few look-alike words for the bank');
        if (extras.some((v) => v < 11)) throw new Error('number-words: a one-digit extra word');
      }
      const bank = rng.shuffle(ns.concat(extras));
      // the screen: the bank is what the child copies from — big enough to read on a phone (16 px shrank to ~8 px at 360)
      const bpx = ctx.interactive ? 30 : 16;
      const bankHtml = `<div class="ws-scene-banner" style="gap:${ctx.interactive ? 14 : 12}px;flex-wrap:wrap" data-lcs-bank ${stamp}>` +
        bank.map((v) =>
          `<span style="font-family:'Nunito';font-weight:800;font-size:${bpx}px;color:#3A3530;background:#FFFFFF;` +
          `border:2px solid #F0E4CB;border-radius:16px;padding:${ctx.interactive ? '6px 16px' : '4px 12px'}" data-lcs-bank-word="${v}">${numberWord(v, loc)}</span>`).join('') +
        `</div>`;
      const keyPx = fitPx(ns.map((n) => numberWord(n, loc)), 230, 26);
      const cards = ns.map((n) => {
        const word = numberWord(n, loc);
        let line;
        if (ctx.interactive) {
          // the screen: a write box over the line, tall enough to be a 44-px target on a phone
          line = `<div data-lcs-wbox data-lcs-answer="${word}" data-lcs-label="${n}" data-lcs-n="${n}" style="width:82%;height:96px;border:2.5px dashed #8A8276;border-radius:14px;box-sizing:border-box"></div>`;
        } else if (ctx.answerKey) {
          // the key: the word written ON the line (its baseline 4 px above the rule)
          line = `<div style="width:82%;height:50px;border-bottom:2.5px solid #8A8276;position:relative"><svg width="100%" height="50" style="position:absolute;left:0;top:0;overflow:visible" aria-hidden="true">` +
            `<text x="50%" y="46" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="${keyPx}" fill="${CORAL}" data-lcs-keyword>${word}</text></svg></div>`;
        } else {
          line = `<div style="width:82%;height:50px;border-bottom:2.5px solid #8A8276"></div>`;
        }
        return `<div class="ws-card-stage" style="flex-direction:column;gap:12px;justify-content:center" data-lcs-write="${n}">` + NUMERAL(n, 56) + line + `</div>`;
      });
      return { bodyHtml: bankHtml + `<div style="margin-top:10px">${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`, meta: { ...meta, extras } };
    }

    if (d.mode === 'match') {
      let order;
      do { order = rng.shuffle(ns.map((_, i) => i)); } while (order.some((v, i) => v === i));
      if (ctx.interactive) {
        // the screen: each number with three of the page's words — its own, and (when the page has one) its trap
        // partner: the digit swap or the teen / -ty twin
        const slots = answerSlots(ns.length, loc + '|' + ns.join(','), 3);
        const items = ns.map((n, k) => {
          const partner = ns.find((v) => v !== n && (swapOf(n) === v || (n < 20 && v === (n - 10) * 10) || (n >= 30 && n % 10 === 0 && v === n / 10 + 10)));
          const others = rng.shuffle(ns.filter((v) => v !== n && v !== partner));
          const wrong = (partner != null ? [partner] : []).concat(others).slice(0, 2);
          const vals = rng.shuffle(wrong.slice());
          vals.splice(slots[k], 0, n);
          return screenItem(k, n, vals, loc);
        });
        return { bodyHtml: screenWrap(items.join('')), meta };
      }
      const itemH = Math.floor((740 - (d.items - 1) * 14) / d.items);
      const px = fitPx(ns.map((n) => numberWord(n, loc)), 266, 20);
      const left = ns.map((n) =>
        `<div class="ws-match-item" style="width:170px;height:${itemH}px" data-lcs-left="${n}">` +
        NUMERAL(n, 44) + `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
      const right = order.map((idx) =>
        `<div class="ws-match-item ws-match-item--plain" style="width:300px;height:${itemH}px;padding:0 14px;position:relative" data-lcs-right="${ns[idx]}" ${stamp}>` +
        (ctx.answerKey ? `<span style="position:absolute;left:10px;top:8px;font-family:'Baloo 2';font-weight:700;font-size:22px;color:${CORAL}" data-lcs-keynum>${ns[idx]}</span>` : '') +
        `<span style="font-family:'Nunito';font-weight:800;font-size:${px}px;color:#3A3530;text-align:center;white-space:nowrap">${numberWord(ns[idx], loc)}</span>` +
        `<span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
      return {
        bodyHtml: `<div class="ws-match" style="padding:6px 40px">` +
          `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
        meta,
      };
    }

    // circle: every card's right word in each slot equally often
    const k = d.opts || 3;
    const relabel = rng.shuffle(Array.from({ length: k }, (_, i) => i));
    const slots = answerSlots(ns.length, loc + '|' + ns.join(','), k).map((x) => relabel[x]);
    const cardsVals = ns.map((n, i) => {
      const wrong = rng.shuffle(pickWrong(n, d, loc, rng));
      wrong.splice(slots[i], 0, n);
      return wrong;
    });
    if (ctx.interactive) return { bodyHtml: screenWrap(ns.map((n, i) => screenItem(i, n, cardsVals[i], loc)).join('')), meta };
    const cards = ns.map((n, i) => {
      const words = cardsVals[i].map((v) => numberWord(v, loc));
      // four words: a smaller numeral, tighter chips (2026-10-13: the fourth word was cut off at the card's edge)
      const tight = k > 3;
      const px = fitPx(words, 262, tight ? 16 : 17);
      const chips = cardsVals[i].map((v, j) => chipNew(words[j], v, v === n, px, ctx.answerKey, tight)).join('');
      return `<div class="ws-card-stage" style="flex-direction:column;gap:${tight ? 3 : 12}px" data-lcs-n="${n}" ${stamp}>` +
        NUMERAL(n, tight ? 36 : 52) +
        `<div style="display:flex;flex-direction:column;align-items:center;gap:${tight ? 4 : 8}px">${chips}</div></div>`;
    });
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta };
  },

  async verify(page) {
    // DOM facts extracted in-page; word-correctness asserted Node-side
    // against the same engine (the page cannot require lib/number-words).
    const facts = await page.evaluate(() => {
      const out = { mode: null, cards: [], match: null, write: null, nw: null, over: [], cut: [] };
      const nw = document.querySelector('[data-lcs-nw]');
      out.nw = nw ? nw.getAttribute('data-lcs-nw') : null;
      // a word wider than its chip / box spills out of it (new pages fit their words)
      document.querySelectorAll('[data-lcs-choice], [data-lcs-right] > span:not([data-lcs-keynum]):not(.ws-match-dot), [data-lcs-bank-word]').forEach((e) => {
        const box = e.hasAttribute('data-lcs-choice') || e.hasAttribute('data-lcs-bank-word') ? e : e.parentElement;
        if (e.scrollWidth > e.clientWidth + 1 || e.getBoundingClientRect().right > box.getBoundingClientRect().right + 0.5 || e.getBoundingClientRect().left < box.getBoundingClientRect().left - 0.5) out.over.push(e.textContent.trim());
      });
      // every word chip inside its card (a card clips what spills out of it)
      document.querySelectorAll('[data-lcs-card]').forEach((card) => {
        const c = card.getBoundingClientRect();
        card.querySelectorAll('[data-lcs-choice], [data-lcs-write] > div').forEach((e) => { const r = e.getBoundingClientRect(); if (r.bottom > c.bottom - 2 || r.top < c.top || r.left < c.left || r.right > c.right) out.cut.push(e.textContent.trim() || 'a write line'); });
      });
      const writes = [...document.querySelectorAll('[data-lcs-write]')];
      if (writes.length) {
        out.mode = 'write';
        out.write = {
          ns: writes.map((e) => +e.dataset.lcsWrite),
          bank: [...document.querySelectorAll('[data-lcs-bank-word]')].map((e) => ({
            n: +e.dataset.lcsBankWord, word: e.textContent.trim(),
          })),
        };
        return out;
      }
      const stages = [...document.querySelectorAll('[data-lcs-card] [data-lcs-n]')];
      if (stages.length) {
        out.mode = 'circle';
        out.cards = stages.map((st) => ({
          n: +st.dataset.lcsN,
          chips: [...st.querySelectorAll('[data-lcs-choice]')].map((c) => ({
            value: +c.dataset.lcsChoice,
            word: c.textContent.trim(),
            correct: c.hasAttribute('data-lcs-correct'),
          })),
        }));
      } else {
        out.mode = 'match';
        out.match = {
          left: [...document.querySelectorAll('[data-lcs-left]')].map((e) => +e.dataset.lcsLeft),
          right: [...document.querySelectorAll('[data-lcs-right]')].map((e) => ({
            n: +e.dataset.lcsRight, word: [...e.querySelectorAll(':scope > span')].filter((s) => !s.hasAttribute('data-lcs-keynum') && !s.classList.contains('ws-match-dot')).map((s) => s.textContent.trim()).join(''),
          })),
        };
      }
      return out;
    });
    const fails = [];
    // locale reaches verify via the rendered <html lang> — read it from the page
    const lang = await page.evaluate(() => document.documentElement.lang || 'en');
    const loc = (lang || 'en').slice(0, 2);
    // the level knobs of a new page, stamped on it (the published page carries none)
    const K = facts.nw ? (([style, opts, min, max, extra, traps]) => ({ style, opts: +opts, min: +min, max: +max, extra: +extra, traps: traps === '1' }))(facts.nw.split(':')) : null;
    if (K) facts.over.forEach((w) => fails.push(`word "${w}" spills out of its box`));
    facts.cut.forEach((w) => fails.push(`"${w}" is cut off by its card`));
    const inRange = (n) => !K || (n >= K.min && n <= K.max);
    if (facts.mode === 'write') {
      const { ns, bank } = facts.write;
      if (ns.length < 4) fails.push(`only ${ns.length} write cards`);
      if (new Set(ns).size !== ns.length) fails.push('duplicate numerals');
      ns.forEach((n) => { if (!inRange(n)) fails.push(`number ${n} outside ${K.min}-${K.max}`); });
      const extra = bank.filter((b) => !ns.includes(b.n));
      if (ns.some((n) => !bank.some((b) => b.n === n))) fails.push('a card has no word in the bank');
      if (new Set(bank.map((b) => b.n)).size !== bank.length) fails.push('a word twice in the bank');
      if (extra.length !== (K ? K.extra : 0)) fails.push(`${extra.length} extra bank words (want ${K ? K.extra : 0})`);
      if (K && K.extra && extra.some((b) => b.n < 11)) fails.push('a one-digit extra word in the bank (thrown out without reading)');
      bank.forEach((b) => {
        const want = numberWord(b.n, loc);
        if (b.word !== want) fails.push(`bank word "${b.word}" != engine "${want}" for ${b.n}`);
      });
      return fails;
    }
    if (facts.mode === 'circle') {
      if (!facts.cards.length) fails.push('no cards');
      facts.cards.forEach((c, i) => {
        const correct = c.chips.filter((ch) => ch.correct);
        if (correct.length !== 1) fails.push(`card ${i + 1}: ${correct.length} correct chips`);
        else if (correct[0].value !== c.n) fails.push(`card ${i + 1}: correct chip value != ${c.n}`);
        if (new Set(c.chips.map((ch) => ch.value)).size !== c.chips.length) fails.push(`card ${i + 1}: duplicate options`);
        if (new Set(c.chips.map((ch) => ch.word)).size !== c.chips.length) fails.push(`card ${i + 1}: two options read the same`);
        if (c.chips.length < 3) fails.push(`card ${i + 1}: only ${c.chips.length} options`);
        c.chips.forEach((ch) => {
          const want = numberWord(ch.value, loc);
          if (ch.word !== want) fails.push(`card ${i + 1}: word "${ch.word}" != engine "${want}" for ${ch.value}`);
        });
        if (!K) return;
        if (c.chips.length !== K.opts) fails.push(`card ${i + 1}: ${c.chips.length} options (level wants ${K.opts})`);
        if (!inRange(c.n)) fails.push(`card ${i + 1}: ${c.n} outside ${K.min}-${K.max}`);
        const wrong = c.chips.filter((ch) => !ch.correct).map((ch) => ch.value);
        const sw = swapOf(c.n);
        if (K.style === 'far') wrong.forEach((v) => {
          if (c.n < 10 || v < 10 ? Math.abs(v - c.n) < 3 || Math.abs(v - c.n) === 10 : Math.floor(v / 10) === Math.floor(c.n / 10) || v % 10 === c.n % 10) fails.push(`card ${i + 1}: "far" wrong word ${v} is close to ${c.n}`);
        });
        if (K.style === 'swap' && !wrong.includes(sw)) fails.push(`card ${i + 1}: no digit swap for ${c.n}`);
        if (K.style === 'ones' && c.n > 12 && !wrong.includes(c.n === 20 ? 2 : c.n - 10)) fails.push(`card ${i + 1}: no ones word for ${c.n}`);
        if (K.style === 'tens-easy' && wrong.some((v) => v % 10 === 0 && Math.abs(v - c.n) < 30)) fails.push(`card ${i + 1}: a tens word close to ${c.n}`);
        if (/^tens-/.test(K.style) && c.n >= 30 && c.n <= 90 && !wrong.includes(c.n / 10 + 10)) fails.push(`card ${i + 1}: no teen twin for ${c.n}`);
        if (K.style === 'near' && sw && sw <= K.max && !wrong.includes(sw)) fails.push(`card ${i + 1}: no digit swap for ${c.n}`);
      });
    } else {
      const { left, right } = facts.match;
      if (!left.length) fails.push('no match rows');
      if (left.slice().sort().join() !== right.map((r) => r.n).sort().join()) fails.push('right not a permutation of left');
      right.forEach((r, i) => {
        const want = numberWord(r.n, loc);
        if (r.word !== want) fails.push(`row ${i + 1}: word != engine for ${r.n}`);
        if (left[i] === r.n) fails.push(`row ${i + 1}: straight-across`);
      });
      if (K) {
        left.forEach((n) => { if (!inRange(n)) fails.push(`match number ${n} outside ${K.min}-${K.max}`); });
        if (K.traps) {
          if (!left.some((n) => swapOf(n) && left.includes(swapOf(n)))) fails.push('no digit-swap pair on the page');
          if (!left.some((n) => n > 12 && n < 20 && left.includes((n - 10) * 10))) fails.push('no teen / -ty pair on the page');
        }
      }
    }
    return fails;
  },
};
module.exports.swapOf = swapOf;
module.exports.numberWord = numberWord;
module.exports.wrongPool = wrongPool;
module.exports.centroidIndex = centroidIndex;
