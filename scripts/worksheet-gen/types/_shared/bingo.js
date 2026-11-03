/**
 * types/_shared/bingo.js — the Bingo maker's factory (2026-11-03, ENGINES Part 3 §D; the old bingo app's features kept:
 * rows × columns, different cards, caller cards, picture or word cells). One engine, seven item pools:
 *   pictures  a theme's pictures (distinct pictures, distinct words, one of each look-alike group); `both`: the picture
 *             and its word in the cell; `words`: the word alone
 *   sight     the sight words (lib/sight-words-levelset.js, the list's own order); `sentence`: the caller card adds a
 *             sentence with the word (the caller says the word, the sentence, the word — never only a sentence, which
 *             holds other sight words)
 *   sums      the answers on the card, one sum per answer on the caller card (both addends ≥ 1, never 0)
 *   clocks    clock faces on the card, the time on the caller card (digits + words, lib/time-words.js)
 *   letters   the letters that have a reviewed first-sound picture (data/alphabet/letter-pictures.json); the caller card
 *             shows the picture and its word, the card the letter (`lower`: small letters; `mixed`: each cell capital or
 *             small) — one letter per first sound (alphabet-more.js SAME_SOUND)
 *   numbers   numerals on the card, the number word on the caller card (`words`: the other way round)
 *   shapes    five shapes in four colours, the colour word printed under each (a copier loses the colour); `words`: the
 *             card prints «red triangle» (data/bingo/bingo-words.js, agreed literals), the caller card the coloured shape
 * The POOL of a level never depends on the page: every page of a level is played with the one caller set.
 * Cards: a page holds four 3×3 cards or one 4×4 / 5×5 card (d.perPage; two square cards leave half the page empty); a card is the r-th set of the pool in a fixed scrambled order (a
 * bijection on the ranks), each page taking its ranks from its own block — two cards of one class are never the same
 * set; two cards of one page share at most g² − 2 items (they cannot win on the same call every time). 5 × 5: a free
 * centre. A pool shorter than g² + 2 refuses (the old app silently reused pictures, bingo.html:2380).
 * spec.callers: the page is the caller cards to cut out (the whole pool, in order), not the cards.
 * No answer key: every card is right and nothing on the page is checked (screen verdict: material).
 */
'use strict';
const { entriesFor, displayWord, fileUri } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');
const { pictureHash } = require('../../lib/distinct-pictures.js');
const { GRAPH_THEMES, lookalike, unclear } = require('../../lib/picture-distinct.js');
const { makeRng } = require('../../lib/rng.js');
const SW = require('../../lib/sight-words-levelset.js');
const LP = require('../../data/alphabet/letter-pictures.json');
const { sameSound } = require('./alphabet-more.js');
const clock = require('../../primitives/clock.js');
const { timeWords } = require('../../lib/time-words.js');
const { numberWord } = require('../../lib/number-words.js');
const { flatShape } = require('../../primitives/flat-shape.js');
const { COLOR_WORDS } = require('../../data/color-words.js');
const { CALLER_SENTENCES, BINGO_WORD, SHAPE_COLOR, SHAPES, COLORS, HOMOPHONES, LOOKALIKE_ALL, LETTER_SAME_EXTRA, LETTER_PICTURE_OUT } = require('../../data/bingo/bingo-words.js');
const C3 = require('../../templates/components-b3.js');
const tokens = require('../../primitives/_tokens.js');
const T = tokens.color;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const HEX = { red: tokens.codeColors.codeRed, blue: tokens.codeColors.codeBlue, yellow: tokens.codeColors.codeYellow, green: tokens.codeColors.codeGreen };
const SHAPE_ARGS = { circle: {}, square: {}, triangle: { sub: 'equilateral' }, rectangle: { aspect: 2 }, hexagon: {} };
const fmt = (h, m) => `${h}:${String(m).padStart(2, '0')}`;

/** a word or numeral sized to its cell: one line when it fits, else wrapped at spaces (never inside a word) */
function textFit(txt, w, h, { display = false, max = 40, min = 13, color = T.ink } = {}) {
  const tokensOf = String(txt).split(/\s+/), longest = Math.max(...tokensOf.map((t) => [...t].length)), all = [...String(txt)].length;
  const k = display ? 0.58 : 0.64;
  let px = Math.min(max, Math.floor((w - 10) / (k * all)), Math.floor(h * 0.5));
  let lines = 1;
  if (px < 18 && tokensOf.length > 1) { lines = 2; px = Math.min(max, Math.floor((w - 10) / (k * longest)), Math.floor(h * 0.36)); }
  px = Math.max(min, px);
  return `<span data-lcs-bingo-text style="font:700 ${px}px/1.1 ${display ? "'Baloo 2',cursive" : "'Nunito',sans-serif"};color:${color};text-align:center;${lines === 1 ? 'white-space:nowrap' : ''}">${esc(txt)}</span>`;
}

const shapeSvg = (shape, color, px) => flatShape({ kind: shape, ...SHAPE_ARGS[shape], R: Math.max(10, Math.round(px / 2 - 4)), sw: 3 }).svg
  .replace('fill="none" stroke="#146B5E"', `fill="${HEX[color]}" stroke="${T.ink}"`);

/** the pool of a level: [{ id, sort, cell(w, h) → html, call(w, h) → html }] — fixed for (template, level, theme, locale) */
function poolOf(spec, d, theme, L) {
  const rng = makeRng(`bingo-pool|${spec.content}|${L}|${theme || ''}|${d.g}|${d.from || ''}|${d.to || ''}`);
  const img = (th, noun, px) => `<img class="ws-icon" src="${fileUri(th, noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
  const col = (a, b, gap = 4) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${gap}px;width:100%;height:100%">${a}${b || ''}</div>`;
  const small = (txt) => `<span style="font:700 14px/1 'Nunito',sans-serif;color:${T.inkSoft || T.ink}">${esc(txt)}</span>`;
  switch (spec.content) {
    case 'pictures': {
      const seenH = new Set(), seenW = new Set(), all = [];
      for (const e of entriesFor(theme, L)) {
        if (!freshKeep(theme, e, L) || nameRefused(theme, e.noun)) continue;
        const word = displayWord(e.singular, L), h = pictureHash(theme, e.noun), f = word.toLocaleLowerCase(L);
        if (seenH.has(h) || seenW.has(f)) continue;
        seenH.add(h); seenW.add(f); all.push({ e, word });
      }
      // a theme read for look-alikes (data/graph-lookalikes.js) keeps one picture of each group: the caller says «tiger»,
      // the card must not also hold a cat that looks like one
      // (and, in every theme, the few pairs a kindergarten child mixes up whatever the theme: dog / wolf …)
      const read = GRAPH_THEMES.includes(theme), kept = [];
      const confused = (a, b) => (read && lookalike(theme, a, b)) || LOOKALIKE_ALL.some((g) => g.includes(a) && g.includes(b));
      for (const x of rng.shuffle(all)) if (!(read && unclear(theme, x.e.noun)) && !kept.some((k) => confused(k.e.noun, x.e.noun))) kept.push(x);
      return kept.slice(0, d.cap || 24).sort((a, b) => a.word.localeCompare(b.word, L)).map(({ e, word }) => ({
        id: e.vocabKey, label: word,
        cell: (w, h) => (d.words ? textFit(word, w, h) : d.both ? col(img(theme, e.noun, Math.floor(Math.min(w, h - 24) * 0.8)), textFit(word, w, 22, { max: 16, min: 11 }), 2) : img(theme, e.noun, Math.floor(Math.min(w, h) * 0.84))),
        call: (w, h) => col(img(theme, e.noun, Math.floor(Math.min(w, h - 34) * 0.86)), textFit(word, w, 30, { max: 22 })),
      }));
    }
    case 'sight': {
      // the list's words from `from`, one of each group that sounds alike (data/bingo/bingo-words.js HOMOPHONES), until
      // the level's count
      const groups = (HOMOPHONES[L] || []).map((g) => g.split(' '));
      const low = (w) => w.toLocaleLowerCase(L);
      const alike = (a, b) => groups.some((g) => g.includes(low(a)) && g.includes(low(b)));
      const list = [];
      for (const w of SW.words(L).slice(d.from - 1)) { if (list.length === d.to - d.from + 1) break; if (!list.some((k) => alike(k, w))) list.push(w); }
      // a caller sentence: of the word's six, the one holding the fewest OTHER words of the pool (the child marks what
      // the caller says twice, around the sentence), never the sentence of another word («Kuka tuo on?» for both)
      // (a word said like ANOTHER pool word counts too: «Ce soir…» when «se» is on the cards). A word whose six all hold
      // one — or reads unclearly to a child — takes its bingo sentence (data/bingo/bingo-words.js CALLER_SENTENCES) when that
      // one is clean.
      const inPool = new Set(list.map(low)), usedSent = new Set();
      const tokens = (s) => s.toLocaleLowerCase(L).split(/[^\p{L}]+/u).filter(Boolean);
      const others = (s, w) => tokens(s).filter((t) => t !== low(w) && !alike(t, w) && (inPool.has(t) || list.some((q) => low(q) !== low(w) && alike(q, t)))).length;
      const sentOf = new Map();
      if (d.sentence) for (const w of list) {
        const own = (CALLER_SENTENCES[L] || {})[low(w)];
        const opts = rng.shuffle(SW.sentencesOf(w, L)).filter((s) => !usedSent.has(s)).sort((a, b) => others(a, w) - others(b, w));
        const pick = own && others(own, w) === 0 && tokens(own).filter((t) => t === low(w)).length === 1 ? own : opts[0];
        sentOf.set(w, pick); usedSent.add(pick);
      }
      return list.map((word) => {
        const sent = d.sentence ? sentOf.get(word) : null;
        return {
          id: word, label: word,
          cell: (w, h) => textFit(word, w, h),
          call: (w, h) => (sent ? col(textFit(word, w, h * 0.6, { max: 28 }), `<span style="font:600 14px/1.25 'Nunito',sans-serif;color:${T.ink};text-align:center">${esc(sent)}</span>`, 3) : textFit(word, w, h, { max: 34 })),
        };
      });
    }
    case 'sums': {
      let answers = [];
      for (let n = d.from; n <= d.to; n++) answers.push(n);
      if (d.cap) answers = rng.shuffle(answers).slice(0, d.cap).sort((a, b) => a - b);
      return answers.map((n) => {
        // one sum per answer, by the fixed seed: + (both addends ≥ 1) or, on a subtraction level, sometimes −
        let txt;
        // (the minuend stays inside the level's range: 20 − b is never «21 − 1» on a within-20 level)
        if (d.sub && n < d.to && (n < 2 || rng.next() < 0.45)) { const b = rng.int(1, Math.min(9, d.to - n)); txt = `${n + b} − ${b}`; }
        else if (d.nbt) {
          // within 100 the Grade 1 way (1.NBT.C.4): a two-digit number + a one-digit number or + a multiple of ten
          const opts = [];
          for (let b = 1; b <= 9; b++) if (n - b >= 10) opts.push(b);
          for (let b = 10; n - b >= 10; b += 10) opts.push(b);
          const b = rng.pick(opts); txt = `${n - b} + ${b}`;
        } else { const a = rng.int(1, n - 1); txt = `${a} + ${n - a}`; }
        return { id: String(n), label: txt + ' = ' + n, cell: (w, h) => textFit(String(n), w, h, { display: true, max: 44, color: T.teal }), call: (w, h) => col(textFit(txt, w, h * 0.55, { display: true, max: 30 }), small('= ' + n)) };
      });
    }
    case 'clocks': {
      let times = [];
      for (let h = 1; h <= 12; h++) for (const m of d.minutes) times.push([h, m]);
      if (d.cap) times = rng.shuffle(times).slice(0, d.cap).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      return times.map(([h, m]) => ({
        id: fmt(h, m), label: fmt(h, m),
        cell: (w, ht) => clock({ h, m, size: Math.floor(Math.min(w, ht) - 8) }).svg,
        call: (w, ht) => col(textFit(fmt(h, m), w, ht * 0.5, { display: true, max: 30, color: T.teal }), `<span style="font:700 14px/1.2 'Nunito',sans-serif;color:${T.ink};text-align:center">${esc(timeWords(h, m, L, { hourForm: 'word' }))}</span>`),
      }));
    }
    case 'letters': {
      const byLetter = LP.letters[L] || {};
      // one letter per first SOUND: two letters a word can start with for the same sound (en c / k, es b / v, fr e / é,
      // de f / v …, the alphabet maker's reviewed SAME_SOUND table) would be two right cells for one call — the letter
      // that clashes with the fewest others is kept; q and x (no clear first sound for a child) never come
      const outPic = LETTER_PICTURE_OUT[L] || [], pics = (c) => byLetter[c].filter((p) => !outPic.includes(p.noun));
      const extra = LETTER_SAME_EXTRA[L] || [];
      const same = (a, b) => { const x = a.toLocaleLowerCase(L), y = b.toLocaleLowerCase(L); return sameSound(x, y, L) || extra.some((g) => g.includes(x) && g.includes(y)); };
      const cand = Object.keys(byLetter).filter((c) => pics(c).length && !'QX'.includes(c));
      const clashes = (c) => cand.filter((o) => o !== c && same(o, c)).length;
      // a tie keeps the language's own letter over a loan letter (de / fi k over c, fi p over b)
      const LOAN = { en: '', de: 'CY', nl: 'CY', sv: 'CWZ', da: 'CWZ', no: 'CWZ', fi: 'BCDFGWZÅ', fr: 'KWY', es: 'KWY', pt: 'KWY', it: 'JKWY' }[L] || '';
      const keep = [];
      for (const c of cand.slice().sort((a, b) => clashes(a) - clashes(b) || LOAN.includes(a) - LOAN.includes(b) || a.localeCompare(b, L))) if (!keep.some((k) => same(k, c))) keep.push(c);
      return keep.sort((a, b) => a.localeCompare(b, L)).map((c) => {
        const p = rng.pick(pics(c)), shown = d.lower ? c.toLocaleLowerCase(L) : c;
        return {
          id: c, label: c + ' · ' + p.word,
          cell: (w, h, r) => textFit(d.mixed && r && r.next() < 0.5 ? c.toLocaleLowerCase(L) : d.mixed ? c : shown, w, h, { display: true, max: 52 }),
          call: (w, h) => col(img(p.theme, p.noun, Math.floor(Math.min(w, h - 34) * 0.84)), textFit(p.word, w, 30, { max: 22 })),
        };
      });
    }
    case 'numbers': {
      let ns = [];
      for (let n = d.from; n <= d.to; n++) ns.push(n);
      if (d.cap) ns = rng.shuffle(ns).slice(0, d.cap).sort((a, b) => a - b);
      return ns.map((n) => {
        const word = numberWord(n, L);
        return {
          id: String(n), label: n + ' · ' + word,
          cell: (w, h) => (d.words ? textFit(word, w, h) : textFit(String(n), w, h, { display: true, max: 44, color: T.teal })),
          call: (w, h) => (d.words ? col(textFit(String(n), w, h * 0.6, { display: true, max: 40, color: T.teal }), small(word)) : col(textFit(word, w, h * 0.5, { max: 24 }), small(String(n)))),
        };
      });
    }
    case 'shapes': {
      const out = [];
      for (const s of SHAPES) for (const c of COLORS) {
        const phrase = SHAPE_COLOR[L][s][c];
        out.push({
          id: s + '-' + c, label: phrase,
          cell: (w, h) => (d.words ? textFit(phrase, w, h) : col(shapeSvg(s, c, Math.min(w, h - 22) * 0.78), `<span style="font:700 13px/1 'Nunito',sans-serif;color:${T.ink}">${esc(COLOR_WORDS[L][c])}</span>`, 2)),
          call: (w, h) => col(shapeSvg(s, c, Math.min(w, h - 30) * 0.7), `<span style="font:700 15px/1.15 'Nunito',sans-serif;color:${T.ink};text-align:center">${esc(phrase)}</span>`, 3),
        });
      }
      return out;
    }
    default: throw new Error('bingo: unknown content ' + spec.content);
  }
}

// ---- the cards: rank r of the pool's m-subsets, in a fixed scrambled order ----
function binom(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}
/** the r-th m-subset of 0..n-1 (combinatorial number system) */
function unrank(r, n, m) {
  const out = [];
  let x = r;
  for (let i = m; i >= 1; i--) {
    let c = i - 1;
    while (c + 1 < n && binom(c + 1, i) <= x) c++;
    out.push(c); x -= binom(c, i);
  }
  return out;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
/** k → a distinct m-subset for each k < C(n, m) (an affine bijection on the ranks, then unrank) */
function cardSet(k, n, m) {
  const N = binom(n, m);
  let a = Math.max(1, Math.floor(N * 0.6180339887));
  while (gcd(a, N) !== 1) a++;
  const b = Math.floor(N * 0.3819660113);
  return unrank(((a % N) * (k % N) + b) % N, n, m);
}

function cardsBody(spec, d, pool, ctx, L) {
  const g = d.g, free = g === 5, m = g * g - (free ? 1 : 0);
  if (pool.length < m + 2) throw new Error(`${spec.id}: ${pool.length} items; a ${g}×${g} card needs at least ${m + 2}`);
  const rng = ctx.rng, v = Math.max(1, Number((ctx && ctx.variant) || 1));
  const per = d.perPage, block = per * 8, picked = [];
  for (let t = 0; t < block && picked.length < per; t++) {
    const set = cardSet((v - 1) * block + t, pool.length, m);
    if (picked.every((p) => p.filter((x) => set.includes(x)).length <= m - 2)) picked.push(set);
  }
  if (picked.length < per) throw new Error(`${spec.id}: ${per} different cards are not possible with ${pool.length} items`);
  // the page: per cards, laid out to the biggest cell
  const W = 660, H = 724, gap = 16, HEAD = 40, PAD = 10;
  const layouts = per === 4 ? [[2, 2]] : per === 2 ? [[1, 2], [2, 1]] : [[1, 1]];
  let best = null;
  for (const [cols, rows] of layouts) {
    const cw = (W - (cols - 1) * gap) / cols, ch = (H - (rows - 1) * gap) / rows;
    const cell = Math.floor(Math.min((cw - 2 * PAD - (g + 1) * 2) / g, (ch - 2 * PAD - HEAD - (g + 1) * 2) / g, d.maxCell || 150));
    if (!best || cell > best.cell) best = { cols, rows, cell };
  }
  const { cols, cell } = best;
  const star = `<svg width="${Math.round(cell * 0.6)}" height="${Math.round(cell * 0.6)}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 L14.8 8.7 L21.5 9.4 L16.4 13.9 L17.9 20.5 L12 17.1 L6.1 20.5 L7.6 13.9 L2.5 9.4 L9.2 8.7 Z" fill="${T.coral}"/></svg>`;
  const cards = picked.map((set, ci) => {
    const order = rng.shuffle(set);
    const cells = [];
    for (let i = 0, j = 0; i < g * g; i++) {
      if (free && i === 12) { cells.push(`<div data-lcs-bingo-free style="background:${T.cream};display:flex;align-items:center;justify-content:center">${star}</div>`); continue; }
      const it = pool[order[j++]];
      cells.push(`<div data-lcs-bingo-cell="${esc(it.id)}" style="background:#FFFFFF;display:flex;align-items:center;justify-content:center;overflow:hidden;width:${cell}px;height:${cell}px">${it.cell(cell, cell, rng)}</div>`);
    }
    return `<div data-lcs-bingo-card="${ci + 1}" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:${PAD}px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
      `<span style="font:800 30px/1 'Baloo 2',cursive;letter-spacing:6px;color:${T.teal};height:${HEAD - 6}px;display:flex;align-items:center">${esc(BINGO_WORD[L] || 'BINGO')}</span>` +
      `<div data-lcs-bingo-grid style="display:grid;grid-template-columns:repeat(${g},${cell}px);grid-auto-rows:${cell}px;gap:2px;background:${T.ink};border:2px solid ${T.ink};border-radius:6px;overflow:hidden">${cells.join('')}</div></div>`;
  });
  return {
    bodyHtml: `<div data-ws-content data-lcs-bingo data-lcs-g="${g}" style="flex:1;display:grid;grid-template-columns:repeat(${cols},auto);justify-content:center;align-content:space-evenly;gap:${gap}px;min-height:0">${cards.join('')}</div>`,
    meta: { cards: picked.map((s) => s.map((i) => pool[i].id)), pool: pool.map((p) => p.label) },
  };
}

function callersBody(spec, d, pool) {
  // the caller cards of a level its cards cannot be made for are refused with them (one availability for the pair)
  const m = d.g * d.g - (d.g === 5 ? 1 : 0);
  if (pool.length < m + 2) throw new Error(`${spec.id}: ${pool.length} items; a ${d.g}×${d.g} card needs at least ${m + 2}`);
  const n = pool.length, prefer = d.callCols || [5, 4, 6, 3];
  // the grid: few empty cards, then the preferred column count
  let best = null;
  for (const cols of prefer) {
    const rows = Math.ceil(n / cols), empty = rows * cols - n;
    if (rows > 10) continue;
    if (!best || empty < best.empty) best = { cols, rows, empty };
  }
  // 650 px: the sheet (+ its 30 px strip) fits under a three-line title and a three-line instruction (es «Lotería de
  // palabras frecuentes: cartas para cantar» ran 12 px into the footer at 692)
  const { cols, rows } = best, w = 674, h = 650, cw = w / cols, ch = h / rows;
  const cards = [];
  for (let i = 0; i < rows * cols; i++) {
    const it = pool[i];
    cards.push(C3.cutCard({ inner: it ? it.call(cw - 16, ch - 16) : '', kind: 'bingo-call', word: it ? it.label : null, pad: 8, attrs: it ? `data-lcs-bingo-call="${esc(it.id)}"` : 'data-lcs-bingo-blank' }));
  }
  return {
    bodyHtml: C3.cardSheet({ cards, cols, rows, w, h, kind: 'bingo-call' }),
    meta: { pool: pool.map((p) => p.label), cols, rows },
  };
}

function makeBingo(spec) {
  const { D } = spec;
  const themed = spec.content === 'pictures';
  return {
    id: spec.id, slug: spec.slug, gradeBand: spec.gradeBand, assetClass: themed || spec.content === 'letters' ? 'icon-placement' : 'none', exerciseType: 'bingo',
    themeAxis: themed ? { applicable: true, minNouns: 11, excludeBw: true } : { applicable: false },
    difficulty: D, i18n: spec.i18n,
    build({ theme, difficulty, locale }, ctx) {
      const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2);
      if (themed && !theme) throw new Error(`${spec.id}: a theme is required`);
      const pool = poolOf(spec, d, themed ? theme : null, L);
      return spec.callers ? callersBody(spec, d, pool) : cardsBody(spec, d, pool, ctx, L);
    },
    async verify(page) {
      return page.evaluate((callers) => {
        const fails = [];
        const root = document.querySelector('[data-ws-content]');
        if (!root) return ['no content'];
        const rb = root.getBoundingClientRect();
        if (callers) {
          const calls = [...document.querySelectorAll('[data-lcs-bingo-call]')];
          if (calls.length < 11) fails.push(`${calls.length} caller cards`);
          const ids = calls.map((c) => c.getAttribute('data-lcs-bingo-call'));
          if (new Set(ids).size !== ids.length) fails.push('a caller card twice');
          calls.forEach((c) => { const r = c.getBoundingClientRect(); [...c.querySelectorAll('img, svg, span')].forEach((e) => { const q = e.getBoundingClientRect(); if (q.width && (q.left < r.left - 1 || q.right > r.right + 1 || q.top < r.top - 1 || q.bottom > r.bottom + 1)) fails.push('a caller card overflows: ' + c.getAttribute('data-lcs-bingo-call')); }); });
        } else {
          const cards = [...document.querySelectorAll('[data-lcs-bingo-card]')];
          if (!cards.length) fails.push('no card');
          const sets = cards.map((c) => [...c.querySelectorAll('[data-lcs-bingo-cell]')].map((e) => e.getAttribute('data-lcs-bingo-cell')));
          sets.forEach((s, i) => { if (new Set(s).size !== s.length) fails.push(`card ${i + 1}: an item twice`); });
          for (let i = 0; i < sets.length; i++) for (let j = i + 1; j < sets.length; j++) {
            const shared = sets[i].filter((x) => sets[j].includes(x)).length;
            if (shared > sets[i].length - 2) fails.push(`cards ${i + 1} and ${j + 1} share ${shared}`);
          }
          document.querySelectorAll('[data-lcs-bingo-cell]').forEach((c) => {
            const r = c.getBoundingClientRect();
            if (r.width < 44) fails.push(`cell ${Math.round(r.width)} px`);
            [...c.children].forEach((e) => { const q = e.getBoundingClientRect(); if (q.width && (q.left < r.left - 1 || q.right > r.right + 1 || q.top < r.top - 1 || q.bottom > r.bottom + 1)) fails.push('a cell overflows: ' + c.getAttribute('data-lcs-bingo-cell')); });
          });
          cards.forEach((c) => { const r = c.getBoundingClientRect(); if (r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.left < rb.left - 1) fails.push('a card leaves the page'); });
        }
        return [...new Set(fails)];
      }, !!spec.callers);
    },
  };
}

module.exports = { makeBingo, cardSet, binom, unrank };
