/**
 * glyph-tasks.js — the worksheets built on the colouring alphabet and numbers (lib/color-glyphs.js; docs/makers/FLAGSHIP.md).
 * One engine, one `mode` per template; every page is fat letters or digits a child colours, with a task the colouring carries:
 * colour the odd numbers, the bigger number, the answer, the path, the letter that starts the word, the syllables.
 * A task with a right answer marks it for the shared answer key (data-lcs-correct); an open colouring page has none.
 */
'use strict';
const path = require('path');
const CG = require('../../lib/color-glyphs.js');
const slot = require('../../lib/slot.js');
const FL = require('../../lib/fl-art.js');
const platform = require('../../lib/platform/index.js');
const tokens = require('../../primitives/_tokens.js');
const { letterUnits, unitForms } = require('../k/K-238-letter-tracing.js');
const { fileUri, manifest } = require('../../image-cache/resolve.js');
const { strokeLetterLane, digitFadeLane } = require('../../primitives/trace-path.js');
const DS = require('../../data/tracing/digit-strokes.js');
const { rulingBlock } = require('../../templates/components-b2.js');
const { answerBox } = require('../../templates/components.js');
const NW = require('../../lib/number-words.js');
const SW = require('../../lib/sight-words-levelset.js');
const { displayWord } = require('../../lib/b2-common.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');
const B3 = require('../../lib/b3-common.js');
const CHART = require('../../data/alphabet/letter-pictures.json').letters;

const T = tokens.color;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const PATTERNS = ['dots', 'stripes', 'hearts', 'stars', 'waves', 'zigzag', 'scales'];
const copyOf = (ctx) => Math.max(1, parseInt(String((ctx && (ctx.makerCopy || ctx.variant)) || 1), 10) || 1);
const FONT = `font-family:'Baloo 2',cursive;font-weight:700;color:${T.ink}`;

/** the black-and-white drawing of a vocabulary key (a page to colour never prints a coloured picture) */
let _bw = null;
function bwOf(key) {
  if (!_bw) {
    _bw = new Map();
    const man = manifest().themes;
    for (const t of Object.keys(man).sort()) {
      if (!FL.isBw(t) || man[t].fl) continue;
      for (const [noun, v] of Object.entries(man[t].nouns)) if (v.vocabKey && !_bw.has(v.vocabKey)) _bw.set(v.vocabKey, { theme: t, noun });
    }
  }
  return _bw.get(key) || null;
}
const imgTag = (p, px, attrs = '') => `<img class="ws-icon" src="${fileUri(p.theme, p.noun)}" alt="" ${attrs} style="width:${px}px;height:${px}px;object-fit:contain">`;
/** a character or number as one colourable tile */
const tile = (text, h, skin, attrs = '') => { const g = [...String(text)].length === 1 ? CG.glyph(String(text), { h, skin }) : CG.word(String(text), { h, skin }); return `<span style="display:inline-flex;align-items:center;justify-content:center" data-lcs-label="${esc(text)}"${attrs}>${g.svg}</span>`; };
/** every number of a page at ONE size: the row height at which the widest number the page can print fills w */
const _px = new Map();
const pxFor = (sample, w) => { const k = sample + '|' + w; if (!_px.has(k)) _px.set(k, CG.word(sample, { h: 4000, maxW: w }).px); return _px.get(k); };
const numeral = (n, w, digits = 2, skin = 'plain') => CG.word(String(n), { h: pxFor('8'.repeat(digits), w), skin }).svg;
/** a boxed cell of a number grid */
const numCell = (n, w, h, ok, digits = 2) => `<span style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:${w}px;height:${h}px;border:2px solid ${T.grid};border-radius:12px;background:#fff" data-lcs-label="${esc(n)}"${ok ? OK : ''}>${numeral(n, w - 8, digits)}</span>`;
/** a boxed cell of a letter grid: every letter its own place, so wide letters never touch */
const letCell = (c, w, h, ok, px) => `<span style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:${w}px;height:${h}px;border:2px solid ${T.grid};border-radius:12px;background:#fff" data-lcs-label="${esc(c)}"${ok ? OK : ''}>${fit(c, w - 10, px)}</span>`;
const fit = (c, w, px) => { const g = CG.glyph(c, { h: px, skin: 'plain' }); return g.w <= w ? g.svg : CG.glyph(c, { h: Math.floor(px * w / g.w), skin: 'plain' }).svg; };
const opt = (text, h, ok, w) => {
  const W = w || Math.round(h * 0.95);
  return `<span style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:${W}px;height:${h + 12}px;border:2px solid ${T.grid};border-radius:14px;background:#fff" data-lcs-label="${esc(text)}"${ok ? OK : ''}>${/^\d+$/.test(String(text)) ? numeral(text, W - 10) : [...String(text)].length === 1 ? CG.glyph(String(text), { h, skin: 'plain' }).svg : CG.word(String(text), { h: h * 1.25, maxW: W - 8, skin: 'plain' }).svg}</span>`;
};
const CARD = `background:#fff;border:2px solid ${T.grid};border-radius:16px;box-sizing:border-box;display:flex;flex-direction:row;align-items:center`;
const grid = (cols, cells, gap = 6) => `<div style="display:grid;grid-template-columns:repeat(${cols},auto);gap:${gap}px;justify-content:center;align-content:center">${cells.join('')}</div>`;
const page = (mode, inner, extra = '') => `<div data-ws-content data-lcs-glyph-mode="${mode}" ${extra} style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:12px">${inner}</div>`;
const OK = ' data-lcs-correct="1"';
const row = (inner, h) => `<div style="display:flex;align-items:center;justify-content:center;gap:18px;${h ? `height:${h}px;` : ''}width:660px">${inner}</div>`;

/** the letter units of a language that have a glyph, capital and small */
const units = (loc) => letterUnits(loc).filter((u) => { const f = unitForms(u, loc); return !!f.cap && !!f.low && CG.has(f.cap) && CG.has(f.low) && [...f.cap].length === 1 && [...f.low].length === 1; });
const numberWord = (n, loc) => NW.numberWord(n, loc);

/** a capital and its small letter on ONE baseline, true to each other's size, the box hugging their ink (2026-11-10: each
 *  drawn by glyph() was scaled to its own height, so a was as tall as A and O o, C c, S s, V v, W w, X x, Z z printed as
 *  two identical letters on a page that teaches the pair) */
const capLow = (f, h, maxW, skin) => CG.word(f.cap + f.low, { h, maxW, skin, tight: true });
/** the same pair with the capital ABOVE its small letter, both at ONE scale, filling height H (2026-11-10: side by side the
 *  pair is bound by the page's width, and the Coloring Alphabet level-2 page left over half its body empty) */
const capOverLow = (f, H, maxW, skins, gap = 24) => {
  const a0 = CG.word(f.cap, { h: 100, tight: true }), b0 = CG.word(f.low, { h: 100, tight: true });
  const k = Math.min((H - gap) / (a0.uh + b0.uh), maxW / Math.max(a0.uw, b0.uw));
  const a = CG.word(f.cap, { h: k * a0.uh, tight: true, skin: skins[0] }), b = CG.word(f.low, { h: k * b0.uh, tight: true, skin: skins[1] });
  return `<div data-lcs-pair="1" style="display:flex;flex-direction:column;align-items:center;gap:${gap}px">${a.svg}${b.svg}</div>`;
};

const NAMES = { en: 'Emma', de: 'Lena', fr: 'Léa', es: 'Sofía', pt: 'Ana', it: 'Sara', nl: 'Emma', sv: 'Elsa', da: 'Ida', no: 'Nora', fi: 'Aino' };

/* ------------------------------------------------------------------ the modes ------------------------------------------------------------------ */
const MODES = {
  /** a letter to colour; level 3 adds pictures that start with it */
  letter({ lv, loc, unit, rng }) {
    const f = unitForms(unit, loc), s1 = rng.pick(PATTERNS), s2 = rng.pick(PATTERNS.filter((x) => x !== s1));
    // every level's stack is ~680 px, inside the 620–740 a page body holds under the tallest chrome (2026-11-10: level 1's
    // capital at 540 left a third of the body empty, and level 3's pair at 300 left over half of it)
    if (lv === 1) return page('letter', CG.word(f.cap, { h: 680, maxW: 640, skin: 'plain', tight: true }).svg);
    if (lv === 2) return page('letter', capOverLow(f, 680, 640, [s1, s2]));
    const pics = (CHART[loc] && CHART[loc][unit] || []).map((p) => bwOf(p.key)).filter(Boolean).slice(0, 3);
    // level 3 = level 2 with the pictures that start with the letter under it; a letter with no picture (no Æ, Ø) keeps the
    // full pair rather than a small pair on an empty page
    if (!pics.length) return page('letter', capOverLow(f, 680, 640, [s1, s2]));
    const px = pics.length === 1 ? 260 : pics.length === 2 ? 240 : 200;
    return page('letter', capOverLow(f, 668 - px, 640, [s1, s2]) + row(pics.map((p) => imgTag(p, px)).join('')));
  },
  /** a number to colour; level 2 that many stars, level 3 its word too */
  number({ lv, loc, unit, rng }) {
    const n = +unit;
    const stars = (px) => `<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;width:640px" data-lcs-count="${n}">${Array.from({ length: n }, () => CG.glyph('.', { h: px, skin: 'plain' }).svg.replace(/<svg[\s\S]*<\/svg>/, starSvg(px))).join('')}</div>`;
    // the number fills the page above its stars (2026-11-09: a 1 at 340 left half the body empty); its skin is never the
    // stars pattern — the page asks the child to count the stars, and stars inside the number made two answers (1 or 6)
    // the stack (number + stars, + its word at level 3, + the page gaps) stays inside 720 px, under the tallest chrome
    // (2026-11-10: a 1 at 460 still left a quarter of the body empty); the stars' rows are counted, not guessed;
    // tight (2026-11-10): the number's box hugs its ink, so a 600 px box holds a 560 px number, not a 380 px one on a blank line
    const starsH = (px) => { const per = Math.floor((640 + 6) / (px + 6)), r = Math.ceil(n / per); return r * px + (r - 1) * 6; };
    const sp = lv === 3 ? (n > 12 ? 48 : 64) : (n > 12 ? 58 : 76);
    const h = lv === 3 ? Math.min(480, 720 - 24 - 110 - starsH(sp)) : Math.min(600, 720 - 12 - starsH(sp));
    if (lv === 1) return page('number', CG.word(unit, { h, maxW: 640, skin: 'plain', tight: true }).svg + stars(sp));
    const big = CG.word(unit, { h, maxW: 640, skin: rng.pick(PATTERNS.filter((p) => p !== 'stars')), tight: true }).svg;
    if (lv === 2) return page('number', big + stars(sp));
    return page('number', big + CG.word(numberWord(n, loc), { h: 110, maxW: 640, skin: 'plain' }).svg + stars(sp));
  },
  /** a name in bubble letters; the teacher types it */
  name({ lv, loc, ctx }) {
    const raw = slot.text(ctx, NAMES[loc] || 'Emma', 'name', 14);
    const text = [...String(raw)].filter((c) => c === ' ' || CG.has(c)).join('') || NAMES[loc];
    const rows = lv === 1 ? [['plain'], ['plain']] : lv === 2 ? [[PATTERNS], [PATTERNS.slice(2)], [PATTERNS.slice(4)]] : [[PATTERNS.slice(1)], [PATTERNS], [PATTERNS.slice(3)]];
    return page('name', rows.map(([skin], i) => `<div${i ? '' : slot.attr(ctx, 'name', 0)} data-lcs-name="${esc(text)}">${CG.word(text, { h: lv === 1 ? 300 : 210, maxW: 650, skin }).svg}</div>`).join(''));
  },
  /** count the pictures, colour the right number */
  'count-color'({ lv, rng, ctx }) {
    const R = { 1: [1, 5], 2: [1, 10], 3: [5, 20] }[lv], rows = 4, pool = FL.keys('pt').filter((k) => ['pets', 'farm', 'bugs', 'fruit', 'ocean', 'toys'].includes(FL.groupOf(k)));
    const picks = rng.sample(pool, rows);
    const out = picks.map((k) => {
      const [theme, noun] = [k.slice(0, k.indexOf('/')), k.slice(k.indexOf('/') + 1)], n = rng.int(R[0], R[1]);
      const opts = rng.shuffle([n, ...rng.sample(Array.from({ length: R[1] - R[0] + 3 }, (_, i) => R[0] + i - 1).filter((x) => x > 0 && x !== n), 2)]);
      const px = n > 10 ? 44 : n > 5 ? 64 : 66;
      const pics = `<div style="display:flex;flex-wrap:wrap;gap:2px;width:350px;align-items:center;justify-content:center">${Array.from({ length: n }, () => imgTag({ theme, noun }, px)).join('')}</div>`;
      return `<div style="${CARD};width:660px;height:168px;justify-content:space-between;padding:4px 10px" data-lcs-row data-lcs-n="${n}">${pics}<div style="display:flex;gap:8px">${opts.map((v) => opt(v, 84, v === n, 88)).join('')}</div></div>`;
    });
    return page('count-color', out.join(''));
  },
  /** the path: colour 1, 2, 3 … from corner to corner */
  numpath({ lv, rng, ctx }) {
    const N = { 1: 10, 2: 15, 3: 20 }[lv], C = 6, Rw = 5;
    const way = walk(C, Rw, N, rng);
    const cells = Array.from({ length: C * Rw }, () => null);
    way.forEach((c, i) => { cells[c] = i + 1; });
    const free = Array.from({ length: 40 }, (_, i) => N + 3 + i);
    ctx.tokens = { N: String(N) };
    const html = cells.map((v) => (v ? numCell(v, 104, 118, true).replace('<span ', `<span data-lcs-step="${v}" `) : numCell(rng.pick(free), 104, 118, false)));
    return page('numpath', `<div style="display:grid;grid-template-columns:repeat(${C},104px);gap:5px;justify-content:center" data-lcs-path="${N}">${html.join('')}</div>`);
  },
  /** a grid of numbers: colour the odd ones */
  parity({ lv, rng }) {
    const M = { 1: 10, 2: 20, 3: 50 }[lv], cols = 5, cells = [];
    const v = Array.from({ length: 25 }, (_, i) => (i % 2 ? rng.int(1, Math.floor(M / 2)) * 2 : rng.int(0, Math.floor((M - 1) / 2)) * 2 + 1));
    for (const n of rng.shuffle(v)) cells.push(numCell(n, 124, 124, n % 2 === 1));
    return page('parity', grid(cols, cells, 6), `data-lcs-want="odd"`);
  },
  /** which number is bigger */
  bigger({ lv, rng }) {
    const M = { 1: 10, 2: 20, 3: 99 }[lv], rows = [];
    for (let i = 0; i < 6; i++) { const a = rng.int(1, M - 1); let b = rng.int(1, M); if (b === a) b = a + 1; const [x, y] = rng.next() < 0.5 ? [a, b] : [b, a]; rows.push(`<div style="${CARD};width:324px;height:218px;justify-content:space-around;padding:6px" data-lcs-row>${opt(x, 150, x > y, 146)}${opt(y, 150, y > x, 146)}</div>`); }
    return page('bigger', grid(2, rows, 10));
  },
  /** work out the sum, colour the answer */
  solve({ lv, rng }) {
    const out = [];
    const seen = new Set();
    while (out.length < 5) {
      const sub = lv === 3 && rng.next() < 0.5, M = { 1: 5, 2: 10, 3: 20 }[lv];
      const a = rng.int(1, M - 1), b = sub ? rng.int(1, a) : rng.int(1, M - a), v = sub ? a - b : a + b, op = sub ? '−' : '+', key = a + op + b;
      if (seen.has(key) || v === 0) continue;
      seen.add(key);
      const opts = rng.shuffle([v, ...rng.sample([v - 2, v - 1, v + 1, v + 2, v + 3].filter((x) => x > 0 && x !== v), 2)]);
      out.push(`<div style="${CARD};width:660px;height:128px;justify-content:space-between;padding:4px 14px" data-lcs-row><span style="${FONT};font-size:46px" data-lcs-sum>${a} ${op} ${b} =</span><div style="display:flex;gap:8px">${opts.map((n) => opt(n, 92, n === v, 110)).join('')}</div></div>`);
    }
    return page('solve', out.join(''));
  },
  /** a number chart: colour the multiples */
  multiples({ lv, rng, ctx }) {
    const n = rng.pick({ 1: [2, 5, 10], 2: [3, 4], 3: [6, 7, 8, 9] }[lv]), end = lv === 3 ? 60 : 30, cols = lv === 3 ? 10 : 6;
    const cells = Array.from({ length: end }, (_, i) => numCell(i + 1, lv === 3 ? 62 : 104, lv === 3 ? 76 : 112, (i + 1) % n === 0));
    ctx.tokens = { N: String(n) };
    return page('multiples', grid(cols, cells, 4), `data-lcs-n="${n}"`);
  },
  /** two numbers that make the target */
  bonds({ lv, rng, ctx }) {
    const S = rng.pick({ 1: [5], 2: [6, 7, 8, 9], 3: [10] }[lv]), rows = [];
    for (let i = 0; i < 5; i++) {
      const a = rng.int(1, S - 1), b = S - a, others = [];
      while (others.length < 2) { const x = rng.int(1, S); if (x !== a && x !== b && x + a !== S && x + b !== S && !others.includes(x) && !others.some((o) => o + x === S) && x * 2 !== S) others.push(x); }
      const line = rng.shuffle([[a, true], [b, true], [others[0], false], [others[1], false]]);
      rows.push(`<div style="${CARD};width:660px;height:128px;justify-content:space-around;padding:4px" data-lcs-row>${line.map(([v, ok]) => opt(v, 92, ok, 120)).join('')}</div>`);
    }
    ctx.tokens = { N: String(S) };
    return page('bonds', rows.join(''), `data-lcs-make="${S}"`);
  },
  /** colour the tens digit */
  // levels 1-2: two-digit numbers, whose tens digit IS the left one (1.NBT.B.2: where it sits is the lesson); level 3 mixes
  // four two-digit and four three-digit numbers, so the tens place moves and is found from the right (settings-space,
  // 2026-11-09: an all-three-digit page put every answer in the middle tile)
  tens({ lv, rng }) {
    const ranges = lv === 3 ? rng.shuffle([[10, 99], [10, 99], [10, 99], [10, 99], [100, 999], [100, 999], [100, 999], [100, 999]]) : Array(8).fill({ 1: [10, 49], 2: [10, 99] }[lv]), cells = [];
    const seen = new Set();
    while (cells.length < 8) {
      const [lo, hi] = ranges[cells.length];
      const n = rng.int(lo, hi); if (seen.has(n)) continue; seen.add(n);
      const s = [...String(n)], at = s.length - 2;
      cells.push(`<div style="${CARD};width:324px;height:158px;justify-content:center;gap:6px;padding:4px" data-lcs-row data-lcs-n="${n}">${s.map((c, i) => tile(c, 124, 'plain', i === at ? OK : '')).join('')}</div>`);
    }
    return page('tens', grid(2, cells, 10));
  },
  /** colour a number, then trace it */
  'num-trace'({ lv, loc, unit, rng }) {
    // 430 (was 320, then 380): with its two 130 px lanes and the gaps the stack is 714 px, inside the tallest chrome
    const big = CG.word(unit, { h: 430, maxW: 620, skin: lv === 1 ? 'plain' : rng.pick(PATTERNS), tight: true }).svg;
    const form = DS.FORMS[DS.FORM_BY_LOCALE[loc] || 'continental'], n = +unit, glyphs = n < 10 ? [form[n]] : [form[Math.floor(n / 10)], form[n % 10]];
    const lane = () => digitFadeLane({ glyphs, box: DS.BOX, w: 650, h: 130, glyphH: 96, modes: n < 10 ? (lv === 1 ? ['model', 'trace', 'trace', 'trace', 'trace'] : lv === 2 ? ['model', 'trace', 'trace', 'dot', 'empty'] : ['model', 'trace', 'dot', 'empty', 'empty']) : (lv === 1 ? ['model', 'trace', 'trace'] : ['model', 'trace', 'empty']), badges: lv === 1, number: n, label: `trace number ${n}` }).svg;
    return page('num-trace', big + `<div>${lane()}</div><div>${lane()}</div>`);
  },
  /** a number and a ten-frame */
  frame({ lv, rng }) {
    const rows = [], [lo, M] = { 1: [1, 5], 2: [1, 10], 3: [6, 10] }[lv], list = rng.shuffle(Array.from({ length: M - lo + 1 }, (_, i) => lo + i)).slice(0, 3);
    for (const n of list) {
      const frames = n > 10 ? 2 : 1, cs = frames === 2 ? 46 : 74;
      const box = Array.from({ length: frames }, () => `<div style="display:grid;grid-template-columns:repeat(5,${cs}px);grid-auto-rows:${cs}px;border:3px solid ${T.ink};border-radius:6px">${Array.from({ length: 10 }, () => `<span style="border:1.5px solid ${T.ink}"></span>`).join('')}</div>`).join('');
      rows.push(`<div style="${CARD};width:660px;height:216px;justify-content:space-around;padding:6px" data-lcs-row data-lcs-n="${n}">${CG.word(String(n), { h: 170, maxW: 220, skin: rng.pick(PATTERNS) }).svg}<div style="display:flex;flex-direction:column;gap:6px">${box}</div></div>`);
    }
    return page('frame', rows.join(''));
  },
  /** a page about one number */
  poster({ lv, loc, unit, rng }) {
    const n = +unit, frames = n > 10 ? 2 : 1;
    const frame = Array.from({ length: frames }, () => `<div style="display:grid;grid-template-columns:repeat(5,${frames === 2 ? 56 : 72}px);grid-auto-rows:${frames === 2 ? 56 : 72}px;border:3px solid ${T.ink};border-radius:6px">${Array.from({ length: 10 }, () => `<span style="border:1.5px solid ${T.ink}"></span>`).join('')}</div>`).join('');
    // the number takes what its word (96) and frame leave of a 720 px stack (was 300, then 400): 450 with one frame, 356 with two
    return page('poster', CG.word(unit, { h: frames === 2 ? 356 : 450, maxW: 640, skin: rng.pick(PATTERNS), tight: true }).svg + CG.word(numberWord(n, loc), { h: 96, maxW: 640, skin: 'plain' }).svg + `<div style="display:flex;flex-direction:column;gap:8px">${frame}</div>`);
  },
  /** a letter pattern to colour and finish */
  pattern({ lv, loc, rng }) {
    const ALL = units(loc), rows = [];
    const shapes = { 1: ['AB'], 2: ['AB', 'AAB', 'ABB', 'ABC'], 3: ['AAB', 'ABB', 'ABC', 'AABB', 'ABCD'] }[lv];
    for (let i = 0; i < 5; i++) {
      const s = rng.pick(shapes), letters = rng.sample(ALL, 4).map((u) => unitForms(u, loc).cap), m = Object.fromEntries(['A', 'B', 'C', 'D'].map((k, j) => [k, letters[j]]));
      const seq = Array.from({ length: 7 }, (_, j) => m[s[j % s.length]]);
      rows.push(`<div style="${CARD};width:660px;height:128px;justify-content:center;gap:5px;padding:4px" data-lcs-row data-lcs-shape="${s}">${seq.slice(0, 6).map((c) => tile(c, 84, 'plain')).join('')}${answerBox({ w: 76, h: 84, answer: seq[6] })}</div>`);
    }
    return page('pattern', rows.join(''));
  },
  /** letters and numbers mixed: colour the letters */
  'sort-ln'({ loc, lv, rng }) {
    const L = units(loc).filter((u) => !/^[OQILSBZGDÖÓÒÔÕØÍÌÎÏ]$/.test(unitForms(u, loc).cap)), n = { 1: 16, 2: 25, 3: 36 }[lv], cols = { 1: 4, 2: 5, 3: 6 }[lv], h = { 1: 130, 2: 110, 3: 88 }[lv], D = [3, 4, 6, 7, 9];
    const items = Array.from({ length: n }, (_, i) => (i % 2 ? { c: String(rng.pick(D)), ok: false } : { c: unitForms(rng.pick(L), loc).cap, ok: true }));
    const cw = { 1: 150, 2: 122, 3: 102 }[lv];
    return page('sort-ln', grid(cols, rng.shuffle(items).map((x) => letCell(x.c, cw, cw, x.ok, h)), 6));
  },
  /** find every copy of one letter */
  'find-letter'({ lv, loc, unit, rng }) {
    // level 3 mixes capitals and small letters, and in these bubble letters a capital I and a small l are the same bar
    // (measured 2026-11-10: the closest pair of different letters, closer than O and o): on an I or L page the other letter
    // would be a second right answer, so it never stands in that grid
    const LOOK = { I: 'L', L: 'I' }, f = unitForms(unit, loc);
    const L = units(loc).filter((u) => u !== unit && !(lv === 3 && LOOK[f.cap] && unitForms(u, loc).cap === LOOK[f.cap]));
    const n = 30, want = rng.int(8, 11), cols = 6;
    const form = (u) => { const g = unitForms(u, loc); return lv === 1 ? g.cap : lv === 2 ? g.low : rng.next() < 0.5 ? g.cap : g.low; };
    const cells = Array.from({ length: n }, (_, i) => (i < want ? { c: lv === 1 ? f.cap : lv === 2 ? f.low : (i % 2 ? f.cap : f.low), ok: true } : { c: form(rng.pick(L)), ok: false }));
    return page('find-letter', row(lv === 3 ? capLow(f, 110, 300, 'plain').svg : CG.glyph(lv === 1 ? f.cap : f.low, { h: 110, skin: 'plain' }).svg) + grid(cols, rng.shuffle(cells).map((x) => letCell(x.c, 104, 104, x.ok, 86)), 5));
  },
  /** colour a letter, then trace it */
  'letter-trace'({ lv, loc, unit, rng }) {
    const f = unitForms(unit, loc), skin = lv === 1 ? 'plain' : rng.pick(PATTERNS);
    const lane = (t) => strokeLetterLane({ text: t, w: 640, h: 128, glyphH: 88, reps: 5 }).svg;
    return page('letter-trace', row(capLow(f, 290, 640, skin).svg) + `<div>${lane(f.cap)}</div><div>${lane(f.low)}</div>`);
  },
  /** say the picture, colour the letter it starts with */
  'first-letter'({ lv, loc, rng }) {
    const chart = CHART[loc] || {}, us = units(loc).filter((u) => (chart[u] || []).length);
    const n = { 1: 4, 2: 5, 3: 5 }[lv], picks = rng.sample(us, n);
    const form = (u) => (lv === 1 ? unitForms(u, loc).cap : unitForms(u, loc).low);
    const rows = picks.map((u) => {
      const p = chart[u][rng.int(0, Math.min(1, chart[u].length - 1))], opts = rng.shuffle([u, ...rng.sample(us.filter((x) => x !== u), 2)]);
      return `<div style="${CARD};width:660px;height:${n === 4 ? 164 : 132}px;justify-content:space-between;padding:4px 18px" data-lcs-row data-lcs-word="${esc(p.word)}">${imgTag(p, n === 4 ? 140 : 112)}<div style="display:flex;gap:12px">${opts.map((x) => opt(form(x), n === 4 ? 116 : 94, x === u, n === 4 ? 128 : 108)).join('')}</div></div>`;
    });
    return page('first-letter', rows.join(''));
  },
  /** cards to colour and cut: letter + picture */
  'letter-cards'({ lv, loc, ctx, rng }) {
    const chart = CHART[loc] || {}, us = units(loc).filter((u) => (chart[u] || []).some((p) => bwOf(p.key)));
    const n = 6, c0 = (copyOf(ctx) - 1) * n;
    const list = Array.from({ length: n }, (_, i) => us[(c0 + i) % us.length]);
    // wide letters (M m, W w) take a smaller size: letter and picture always stay inside the card
    const pair = (f, l) => { if (l !== 1) return capLow(f, 110, 168, 'plain').svg; const a = CG.glyph(f.cap, { h: 110, skin: 'plain' }), k = Math.min(1, 168 / a.w); return CG.glyph(f.cap, { h: Math.floor(110 * k), skin: 'plain' }).svg; };
    const cards = list.map((u) => {
      const f = unitForms(u, loc), p = chart[u].map((x) => ({ ...x, bw: bwOf(x.key) })).find((x) => x.bw);
      return `<div style="width:316px;height:226px;border:2.5px dashed ${T.ink};border-radius:14px;display:flex;align-items:center;justify-content:space-around;padding:6px;box-sizing:border-box" data-lcs-card="${esc(u)}"><div style="display:flex;gap:2px">${pair(f, lv)}</div>${imgTag(p.bw, 118)}</div>`;
    });
    return page('letter-cards', grid(2, cards, 10));
  },
  /** a name poster: the name in bubble letters, a place to draw yourself */
  'name-poster'({ lv, loc, ctx }) {
    const raw = slot.text(ctx, NAMES[loc] || 'Emma', 'name', 14);
    const text = [...String(raw)].filter((c) => c === ' ' || CG.has(c)).join('') || NAMES[loc];
    const w = CG.word(text, { h: 210, maxW: 650, skin: lv === 1 ? 'plain' : lv === 2 ? PATTERNS : PATTERNS.slice(3) });
    return page('name-poster', `<div${slot.attr(ctx, 'name', 0)} data-lcs-name="${esc(text)}">${w.svg}</div><div style="box-sizing:border-box;width:640px;height:${660 - w.h}px;border:3px solid ${T.ink};border-radius:18px" data-lcs-draw></div>`);
  },
  /** a sight word to colour, then to find */
  'sight-word'({ lv, loc, unit, rng }) {
    const all = SW.words(loc), word = unit || all[0], others = rng.shuffle(all.filter((w) => w !== word && CG.has(w) && Math.abs([...w].length - [...word].length) <= 2));
    const n = { 1: 6, 2: 9, 3: 12 }[lv], want = { 1: 3, 2: 3, 3: 4 }[lv], list = rng.shuffle(Array.from({ length: n }, (_, i) => (i < want ? word : others[i % others.length])));
    const cols = 3, w = 208;
    return page('sight-word', CG.word(word, { h: 150, maxW: 640, skin: rng.pick(PATTERNS) }).svg + `<div style="display:grid;grid-template-columns:repeat(${cols},${w}px);gap:10px;justify-content:center">${list.map((x) => `<span style="display:flex;align-items:center;justify-content:center;height:${{ 1: 170, 2: 140, 3: 108 }[lv]}px;border:2px solid ${T.grid};border-radius:14px" data-lcs-label="${esc(x)}"${x === word ? OK : ''}>${CG.word(x, { h: 90, maxW: w - 16, skin: 'plain' }).svg}</span>`).join('')}</div>`);
  },
  /** three spellings of a picture's word: colour the right one */
  'right-spelling'({ lv, loc, rng, ctx }) {
    const R0 = { 1: [3, 4], 2: [4, 6], 3: [6, 9] }[lv], words = spellWords(loc).filter((w) => { const n = [...w.word].length; return n >= R0[0] && n <= R0[1]; });
    const picks = [];
    for (const w of rng.shuffle(words)) { if (picks.length === 4) break; try { picks.push({ ...w, wrong: misspell(w.word, rng, loc) }); } catch (e) { /* a word too short to misspell twice */ } }
    if (picks.length < 4) throw new Error('right-spelling: too few words of level ' + lv + ' in ' + loc);
    const rows = picks.map((p) => {
      const line = rng.shuffle([{ w: p.word, ok: true }, ...p.wrong.map((w) => ({ w, ok: false }))]);
      return `<div style="${CARD};width:660px;height:168px;justify-content:space-between;padding:4px 10px" data-lcs-row data-lcs-word="${esc(p.word)}">${imgTag(p, 130)}<div style="display:flex;flex-direction:column;gap:4px;width:500px;align-items:flex-start">${line.map((x) => `<span style="display:inline-flex" data-lcs-label="${esc(x.w)}"${x.ok ? OK : ''}>${CG.word(x.w, { h: 50, maxW: 490, skin: 'plain' }).svg}</span>`).join('')}</div></div>`;
    });
    return page('right-spelling', rows.join(''));
  },
  /** a word in syllables: every part its own colour */
  syllables({ lv, loc, rng }) {
    const want = { 1: 2, 2: 3, 3: 4 }[lv], all = sylWords(loc);
    let pool = all.filter((e) => e.parts.length === want || (want === 4 && e.parts.length >= 4));
    if (pool.length < 4) pool = all.filter((e) => e.parts.length >= want - 1);   // a language with few long words mixes in the next length down
    const list = rng.shuffle(pool).slice(0, 4);
    if (list.length < 4) throw new Error('syllables: too few words in ' + loc);
    const rows = list.map((e) => {
      const parts = e.parts.map((p, i) => `<span style="display:inline-flex" data-lcs-syl="${i + 1}">${CG.word(p, { h: 88, maxW: 440 / e.parts.length, skin: 'plain' }).svg}</span>`).join('');
      return `<div style="${CARD};width:660px;height:168px;justify-content:space-between;padding:4px 14px" data-lcs-row data-lcs-word="${esc(e.word)}">${imgTag(e, 132)}<div style="display:flex;gap:26px;align-items:center;justify-content:center;width:490px">${parts}</div></div>`;
    });
    return page('syllables', rows.join(''));
  },
  /** a word to colour, then to write */
  'word-write'({ lv, loc, rng }) {
    const R0 = { 1: [3, 4], 2: [4, 6], 3: [6, 9] }[lv], list = rng.shuffle(spellWords(loc).filter((w) => { const n = [...w.word].length; return n >= R0[0] && n <= R0[1]; })).slice(0, 3);
    if (list.length < 3) throw new Error('word-write: too few words in ' + loc);
    const rows = list.map((p) => `<div style="${CARD};width:660px;height:226px;justify-content:space-between;padding:4px 10px" data-lcs-row data-lcs-word="${esc(p.word)}">${imgTag(p, 170)}<div style="display:flex;flex-direction:column;gap:6px;align-items:center;width:450px">${CG.word(p.word, { h: 110, maxW: 440, skin: lv === 1 ? 'plain' : PATTERNS }).svg}${rulingBlock({ rows: 1, w: 440, h: 86, glyphH: 54 })}</div></div>`);
    return page('word-write', rows.join(''));
  },
  /** a row of letters from an arrow: colour the letter in the place shown (ordinal notation of the language) */
  ordinal({ lv, loc, rng }) {
    const { ord } = require('./ordinal-more.js'), n = { 1: 5, 2: 6, 3: 8 }[lv], L = units(loc).map((u) => unitForms(u, loc).cap);
    // 10 px between the letter boxes: the key's ring stands 4 px outside the right box, and 2 px let the next box's white
    // cover it (answer-keys gate 2026-11-09); the row keeps its 500 px
    const GAP = 10, places = rng.shuffle(Array.from({ length: n }, (_, i) => i + 1)).slice(0, 5), cell = Math.floor((500 - (n - 1) * GAP) / n);
    const arrow = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="34" viewBox="0 0 44 34"><path d="M2 17H38M26 5L40 17L26 29" fill="none" stroke="${T.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const rows = places.map((k) => {
      const letters = rng.sample(L, n);
      return `<div style="${CARD};width:660px;height:128px;justify-content:space-between;padding:4px 10px" data-lcs-row data-lcs-place="${k}"><span style="${FONT};font-size:34px;width:72px;text-align:center">${esc(ord(k, loc).notation)}</span>${arrow}<div style="display:flex;gap:${GAP}px">${letters.map((c, i) => letCell(c, cell, 112, i === k - 1, Math.min(96, cell - 6))).join('')}</div></div>`;
    });
    return page('ordinal', rows.join(''));
  },
  /** bingo cards to colour */
  'bingo-color'({ lv, rng, ctx }) {
    const M = { 1: 15, 2: 20, 3: 50 }[lv];
    ctx.tokens = { N: String(M) };
    const card = () => { const v = rng.sample(Array.from({ length: M }, (_, i) => i + 1), 9); return `<div style="display:grid;grid-template-columns:repeat(3,108px);grid-auto-rows:106px;border:3px solid ${T.ink};border-radius:12px;justify-items:center;align-items:center">${v.map((n) => `<span style="border:1.5px solid ${T.ink};width:100%;height:100%;display:flex;align-items:center;justify-content:center">${CG.word(String(n), { h: 84, maxW: 96, skin: 'plain' }).svg}</span>`).join('')}</div>`; };
    return page('bingo-color', `<div style="display:flex;flex-direction:row;gap:16px;flex-wrap:wrap;justify-content:center;width:660px">${card()}${card()}</div>`);
  },
  /** a month to colour day by day: the real month the teacher picked ("YYYY-MM"), so the first day sits under its own
   *  weekday (in the language's own week, Monday or Sunday first) and the month has its own length, February 29 too */
  month({ loc, unit }) {
    const C = require('../../data/b2/calendar.js').CALENDAR[loc], { y, m } = monthOf(unit), cells = [];
    const days = new Date(Date.UTC(y, m, 0)).getUTCDate(), start = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() - C.weekStart + 7) % 7;
    const head = Array.from({ length: 7 }, (_, i) => C.dayAbbr[(i + C.weekStart) % 7]);
    for (const d of head) cells.push(`<span style="${FONT};font-size:20px;display:flex;align-items:center;justify-content:center">${esc(d)}</span>`);
    for (let i = 0; i < start; i++) cells.push('<span></span>');
    for (let d = 1; d <= days; d++) cells.push(`<span style="display:flex;align-items:center;justify-content:center">${CG.word(String(d), { h: 86, maxW: 76, skin: 'plain' }).svg}</span>`);   // 86 (was 74): the month fills the page; maxW 76 in a 92 px column (2026-11-10: at 88 two-digit days ran together, 23242526… read as one number)
    const title = `<div data-lcs-month="${esc(unit)}" style="${FONT};font-size:30px;font-weight:700;text-align:center;margin:0 0 8px">${esc(monthName(loc, unit))}</div>`;
    return page('month', `<div>${title}<div style="display:grid;grid-template-columns:repeat(7,92px);grid-auto-rows:minmax(40px,auto);row-gap:6px;border:3px solid ${T.ink};border-radius:10px;padding:6px">${cells.join('')}</div></div>`);
  },
};
/** the months a teacher can pick for a calendar page ("YYYY-MM"), January 2026 to December 2029 */
const MONTHS = [];
for (let y = 2026; y <= 2029; y++) for (let m = 1; m <= 12; m++) MONTHS.push(`${y}-${String(m).padStart(2, '0')}`);
function monthOf(id) {
  const r = /^(\d{4})-(\d{2})$/.exec(String(id || ''));
  if (!r || +r[2] < 1 || +r[2] > 12) throw new Error('glyph-tasks: not a month: ' + id);
  return { y: +r[1], m: +r[2] };
}
/** "November 2026" in the page's language: the calendar's own month name, its first letter capitalized (a heading) */
function monthName(loc, id) {
  const C = require('../../data/b2/calendar.js').CALENDAR[loc], { y, m } = monthOf(id), n = C.monthNames[m - 1];
  return `${n.charAt(0).toLocaleUpperCase(loc)}${n.slice(1)} ${y}`;
}

/** the pictures whose word a child can spell, in the page's language (the Alphabet chart's reviewed words) */
const NOT_A_THING = new Set(['christmas', 'halloween', 'thanksgiving', 'easter', 'valentine', 'summer', 'winter', 'autumn', 'spring', 'birthday', 'boy', 'girl', 'man', 'woman', 'child', 'cocktail', 'wine', 'beer', 'biscuit', 'nutcracker', 'dumbbell', 'yacht', 'narwhal', 'forklift', 'eggplant', 'aubergine']);
const _sw = new Map();
function spellWords(loc) {
  if (!_sw.has(loc)) {
    const out = [], seen = new Set(), vocab = platform.vocab();
    bwOf('');
    for (const [key, bw] of _bw) {
      const v = vocab[key] && vocab[key][loc];
      if (!v || NOT_A_THING.has(key) || nameRefused(bw.theme, bw.noun)) continue;
      const w = displayWord(v[0], loc);   // as the language writes it: a German noun keeps its capital
      if (seen.has(w) || !/^\p{L}+$/u.test(w) || !CG.has(w)) continue;
      seen.add(w); out.push({ ...bw, word: w, key });
    }
    _sw.set(loc, out);
  }
  return _sw.get(loc);
}
/**
 * Two wrong spellings of a word, the mistakes children make: a consonant doubled, a double consonant made single, c for k, s for z.
 * Every vowel stays, and a form that is a real word of the language (the vocabulary, its plurals, the sight
 * words, the reviewer's list) is never offered: a page must not call a correct word wrong.
 */
const VOWEL = /[aeiouyàáâãäåæèéêëìíîïòóôõöøùúûüý]/i;
const REAL = { en: ['boos', 'bots', 'moue', 'hopping', 'tapping'], fr: ['acre'], es: ['tetra'], pt: ['bolas'], nl: ['pompon', 'dos', 'heek', 'hekk'], no: ['pen'], fi: ['muuna'] };
const _real = new Map();
function realWords(loc) {
  if (!_real.has(loc)) {
    const set = new Set(REAL[loc] || []), v = platform.vocab();
    for (const e of Object.values(v)) { const w = e[loc]; if (w) for (const x of [w[0], w[1]]) if (x) set.add(String(x).toLocaleLowerCase(loc)); }
    for (const w of SW.words(loc)) set.add(String(w).toLocaleLowerCase(loc));
    _real.set(loc, set);
  }
  return _real.get(loc);
}
function misspell(word, rng, loc) {
  const c = [...word], out = [], real = realWords(loc), low = (x) => x.toLocaleLowerCase(loc);
  const add = (a) => { const w = a.join(''); if (w !== word && !real.has(low(w)) && CG.has(w) && !out.includes(w)) out.push(w); };
  const vow = (ch) => ch != null && VOWEL.test(ch);
  for (let i = 0; i < c.length; i++) {
    const x = low(c[i]), up = c[i] !== x, cons = /\p{L}/u.test(x) && !vow(x);
    // a consonant doubled between vowels, or at the end after a vowel: where a child hears it
    if (i > 0 && cons && c[i - 1] !== c[i] && c[i + 1] !== c[i] && vow(low(c[i - 1])) && (i === c.length - 1 || vow(low(c[i + 1])))) add([...c.slice(0, i), c[i], ...c.slice(i)]);
    if (i > 0 && c[i - 1] === c[i] && cons) add([...c.slice(0, i), ...c.slice(i + 1)]);                                          // a double made single
    const to = { c: 'k', k: 'c', s: 'z', z: 's' }[x];
    if (to && c[i - 1] !== c[i] && c[i + 1] !== c[i] && (i === c.length - 1 || vow(low(c[i + 1])))) add([...c.slice(0, i), up ? to.toLocaleUpperCase(loc) : to, ...c.slice(i + 1)]);   // the same sound, another letter
  }
  if (out.length < 2) throw new Error('misspell: ' + word);
  return rng.shuffle(out).slice(0, 2);
}
/** the picture words with a syllable split the safety gate agreed on (lib/b3-common.js: the TeX-agreed entries only) */
const _sy = new Map();
function sylWords(loc) {
  if (!_sy.has(loc)) {
    const by = B3.texPool(loc), out = [];
    for (const e of by) {
      if (loc === 'da' && !B3.daStrict(e)) continue;
      const raw = (e.split || []).map((x) => String(x).toLocaleLowerCase(loc)), bw = bwOf(e.key);
      if (!bw || raw.length < 2 || NOT_A_THING.has(e.key)) continue;
      // the word as the language writes it, cut where the gate cut it (a German noun keeps its capital)
      const v = (platform.vocab()[e.key] || {})[loc], word = displayWord(v ? v[0] : raw.join(''), loc), parts = []; let at = 0, ch = [...word];
      if (word.toLocaleLowerCase(loc) !== raw.join('')) continue;
      for (const r of raw) { const n = [...r].length; parts.push(ch.slice(at, at + n).join('')); at += n; }
      if (!parts.every((x) => CG.has(x))) continue;
      out.push({ ...bw, word, parts });
    }
    _sy.set(loc, out);
  }
  return _sy.get(loc);
}

function starSvg(px) { const pts = []; for (let i = 0; i < 10; i++) { const a = (-90 + i * 36) * Math.PI / 180, q = i % 2 ? 24 : 48; pts.push(`${(50 + q * Math.cos(a)).toFixed(1)} ${(52 + q * Math.sin(a)).toFixed(1)}`); } return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 100 100" data-lcs-star="1" data-lcs-prim="color-part"><path d="M${pts.join('L')}Z" fill="#fff" stroke="#141414" stroke-width="5" stroke-linejoin="round"/></svg>`; }

/** a self-avoiding walk of n cells on a grid, from the top left corner region */
function walk(C, R, n, rng) {
  const go = (way, seen) => {
    if (way.length === n) return way;
    const c = way[way.length - 1], x = c % C, y = Math.floor(c / C), next = [];
    if (x > 0) next.push(c - 1); if (x < C - 1) next.push(c + 1); if (y > 0) next.push(c - C); if (y < R - 1) next.push(c + C);
    for (const m of rng.shuffle(next)) { if (seen.has(m)) continue; seen.add(m); const r = go(way.concat(m), seen); if (r) return r; seen.delete(m); }
    return null;
  };
  for (let t = 0; t < 40; t++) { const s = rng.int(0, C - 1); const r = go([s], new Set([s])); if (r) return r; }
  throw new Error('glyph-tasks: no path');
}

/** the template factory. unit: 'letters' | 'numbers' | undefined */
function makeGlyphTask({ id, slug, exerciseType, gradeBand, mode, unit, unitMax, levels, i18n }) {
  const axis = unit === 'months'
    // now: the maker opens on the visitor's current month (shell.js unitIn); the sample page is a fixed month
    ? { applicable: true, now: 'month', units: () => MONTHS.slice(), exemplar: () => '2026-09', tokens: (u, loc) => { const s = monthName((loc || 'en').slice(0, 2), u); return { U: s, L: s, UNIT: s }; } }
    : unit === 'sight'
    ? { applicable: true, units: (loc) => SW.words((loc || 'en').slice(0, 2)).filter((w) => CG.has(w)).slice(0, 60), exemplar: (loc) => SW.words((loc || 'en').slice(0, 2)).filter((w) => CG.has(w))[0], tokens: (u) => ({ U: u, L: u, UNIT: u }) }
    : unit === 'letters'
    ? { applicable: true, units: (loc) => units(loc || 'en'), exemplar: (loc) => units(loc || 'en')[0], tokens: (u, loc) => { const f = unitForms(u, (loc || 'en').slice(0, 2)); return { U: f.cap, L: f.low, UNIT: u }; } }
    : unit === 'numbers'
      ? { applicable: true, units: () => Array.from({ length: unitMax || 20 }, (_, i) => String(i + 1)), exemplar: () => '5', tokens: (u) => ({ U: u, L: u, UNIT: u }) }
      : undefined;
  return {
    id, slug, gradeBand: gradeBand || 'K', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    ...(axis ? { unitAxis: axis } : {}),
    difficulty: Object.fromEntries((levels || [1, 2, 3]).map((l) => [l, {}])),
    i18n,
    build({ difficulty, locale, unit: u }, ctx) {
      const loc = String(locale || 'en').slice(0, 2), lv = Number(difficulty) || 2;
      const un = u || (axis ? axis.exemplar(loc) : null);
      const c = ctx || {};
      const bodyHtml = MODES[mode]({ lv, loc, unit: un, rng: c.rng, ctx: c });
      return { bodyHtml, meta: { mode, unit: un, level: lv }, ...(c.tokens ? { tokens: c.tokens } : {}) };
    },
    async verify(page) {
      return page.evaluate((mode) => {
        const f = [];
        const body = document.querySelector('[data-ws-content]');
        if (!body) return ['no page body'];
        const g = [...document.querySelectorAll('[data-lcs-prim="color-glyph"],[data-lcs-prim="color-word"]')];
        if (!g.length) f.push('no colouring letters');
        const pg = (document.querySelector('[data-lcs-page]') || document.body).getBoundingClientRect();
        for (const e of g) { const r = e.getBoundingClientRect(); if (r.right > pg.right + 1 || r.left < pg.left - 1 || r.bottom > pg.bottom + 1) { f.push('a letter leaves the page'); break; } }
        return f;
      }, mode);
    },
  };
}
module.exports = { makeGlyphTask, MODES, walk, spellWords, misspell, sylWords };
