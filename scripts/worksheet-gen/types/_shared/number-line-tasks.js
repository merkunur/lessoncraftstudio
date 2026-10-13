/**
 * Factory for number-line task types (class 4):
 *  - 'count-on':     dot at a, b hops → write the landing number (G1-116)
 *  - 'count-back':   dot at a, b hops backward → write the landing (G1-117)
 *  - 'jump-sub':     hops backward + equation a − b = [] (G1-119)
 *  - 'place':        numeral shown → circle the right mark among candidates (G1-138)
 *  - 'round':        dot at v → circle the nearer ten/hundred (G2-221/G3-323)
 *  - 'multiples':    hops of k from 0 → write each landing (G3-308)
 *  - 'repeated-sub': start n, hops of −k to 0 → n − k − k … = 0, write hop count (G3-310)
 *  (G1-118 'add' keeps its own file for the published page; its levels 1/3 are built here — buildRowsV2)
 *
 * Level Set 2026-10-13 (Number Lines, PDF + interactive + key): levels 1 and 3 of every face come from NLT_LEVELS[id]
 * ('v2' configs, buildRowsV2); level 2 is the published config, drawn by the legacy code below call for call — EXCEPT
 * the hops of 'multiples' and 'repeated-sub', which are now drawn as hops of k (the published pages drew one arc per
 * unit: "5 hops of 3" was fifteen arcs, and "Count the equal hops back to zero" counted 16 arcs where the box wanted 4).
 * Every page now also carries its rows (`_rows`) so the screen and the key (lib/number-lines-screen.js) can redraw them.
 */
'use strict';
const { divGlyph } = require('./notation.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberLine = require('../../primitives/number-line.js');
const { answerBox } = require('../../templates/components.js');
const NLS = require('../../lib/number-lines-screen.js');
const NCS = require('../../lib/number-charts-screen.js');

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${ch}</span>`;

/** levels 1 and 3 of each face (level 2 = the published config, never here) */
const NLT_LEVELS = {
  // count on / back: 1 = to 10, every tick printed, 1-3 hops · 3 = to 20, only every fifth number printed, 4-9 hops
  // that CROSS ten (the hops have to be counted, not read)
  'G1-116': { 1: { v2: true, lineMax: 10, rows: 3, labelEvery: 1, hops: [1, 3] }, 3: { v2: true, lineMax: 20, rows: 4, labelEvery: 5, hops: [4, 9], bridge: true } },
  'G1-117': { 1: { v2: true, lineMax: 10, rows: 3, labelEvery: 1, hops: [1, 3] }, 3: { v2: true, lineMax: 20, rows: 4, labelEvery: 5, hops: [4, 9], bridge: true } },
  'G1-118': { 1: { v2: true, lineMax: 10, rows: 3, labelEvery: 1, hops: [1, 4] }, 3: { v2: true, lineMax: 20, rows: 4, labelEvery: 5, hops: [3, 9], bridge: true } },
  'G1-119': { 1: { v2: true, lineMax: 10, rows: 3, labelEvery: 1, hops: [1, 4] }, 3: { v2: true, lineMax: 20, rows: 4, labelEvery: 5, hops: [3, 9], bridge: true } },
  // place: 1 = 0-10, every number printed, three dots · 3 = 0-20, only 0, 10, 20 printed, every dot between 11 and 19
  'G1-138': { 1: { v2: true, lineMax: 10, rows: 3, labelEvery: 1, cands: 3, tLo: 1, tHi: 9 }, 3: { v2: true, lineMax: 20, rows: 4, labelEvery: 10, cands: 4, tLo: 11, tHi: 19, candLo: 11, candHi: 19 } },
  // round: 1 = the halfway mark printed too, dots far from it · 3 = only the two ends printed, dots near the middle
  'G2-221': { 1: { v2: true, loMin: 0, loMax: 40, step: 10, rows: 3, labelMid: true, near: [1, 2, 8, 9] }, 3: { v2: true, loMin: 100, loMax: 980, step: 10, rows: 4, near: [3, 4, 6, 7] } },
  'G3-323': { 1: { v2: true, loMin: 0, loMax: 400, step: 100, rows: 3, labelMid: true, near: [10, 20, 30, 70, 80, 90] }, 3: { v2: true, loMin: 0, loMax: 900, step: 100, rows: 4, mid: [31, 69] } },
  // multiples: 1 = hops of 2, 5 and 10 · 3 = hops of 6, 7 and 8 (one of each, in a new order)
  'G3-308': { 1: { v2: true, ks: [2, 5, 10], hops: [3, 5], rows: 3 }, 3: { v2: true, ks: [6, 7, 8], hops: [4, 5], rows: 3 } },
  // repeated subtraction: 1 = from 12 or less in hops of 2 or 3 · 3 = from 30 or less in hops of 4, 5 or 6
  'G3-310': { 1: { v2: true, lineMax: 12, ks: [2, 3], rows: 3 }, 3: { v2: true, lineMax: 30, ks: [4, 5, 6], rows: 3 } },
};

/** the printed card of a hop row */
function hopCard(mode, r) {
  const nl = numberLine(r.line);
  const eq = mode === 'jump-sub'
    ? NUM(r.a) + OP('−') + NUM(r.b) + OP('=') + answerBox({ w: 60, h: 48, answer: r.to })
    : mode === 'add'
      ? NUM(r.a) + OP('+') + NUM(r.b) + OP('=') + answerBox({ w: 60, h: 48, answer: r.to })
      : `<span style="font-family:'Nunito';font-weight:800;font-size:18px;color:#8A8276">→</span>` + answerBox({ w: 60, h: 48, answer: r.to });
  return `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-a="${r.a}" data-lcs-b="${r.b}"${mode === 'add' ? '' : ` data-lcs-to="${r.to}"`}>` +
    nl.svg + `<span style="display:inline-flex;align-items:center;gap:10px">${eq}</span></div>`;
}
function placeCard(r, rings) {
  const nl = numberLine({ ...r.line, ...(rings ? { rings: [r.target] } : {}) });
  return `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-target="${r.target}">` +
    `<span style="display:inline-flex;align-items:center;gap:12px">` +
    `<span style="font-family:'Nunito';font-weight:800;font-size:16px;color:#8A8276">●</span>` + NUM(r.target) + `</span>` + nl.svg + `</div>`;
}
function roundCard(r) {
  const nl = numberLine(r.line);
  const nearer = (r.v - r.lo) < r.step / 2 ? r.lo : r.lo + r.step;
  const chips = r.chips.map((c) =>
    `<span class="ws-chip" style="width:auto;min-width:72px;height:52px;font-size:24px;padding:0 12px;border-radius:26px" ` +
    `data-lcs-choice="${c}"${c === nearer ? ' data-lcs-correct="1"' : ''}>${c}</span>`).join('');
  return `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-v="${r.v}" data-lcs-lo="${r.lo}" data-lcs-step="${r.step}">` +
    nl.svg + `<div class="ws-choices">${chips}</div></div>`;
}
function multCard(r) {
  const nl = numberLine(r.line);
  const boxes = Array.from({ length: r.hops }, (_, h) =>
    answerBox({ w: 52, h: 44, answer: (h + 1) * r.k })).join('<span style="color:#C8BFAE;font-weight:800">,</span>');
  return `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-k="${r.k}" data-lcs-hops="${r.hops}">` +
    nl.svg + `<span style="display:inline-flex;align-items:center;gap:8px">${boxes}</span></div>`;
}
function rsubCard(r) {
  const nl = numberLine(r.line);
  return `<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-n="${r.n}" data-lcs-k="${r.k}" data-lcs-hops="${r.hops}">` +
    nl.svg +
    `<span style="display:inline-flex;align-items:center;gap:10px">` +
    NUM(r.n) + OP(r.div) + NUM(r.k) + OP('=') + answerBox({ w: 56, h: 46, answer: r.hops }) + `</span></div>`;
}
function cardOf(mode, r, key) {
  if (mode === 'place') return placeCard(r, key);
  if (mode === 'round') return roundCard(r);
  if (mode === 'multiples') return multCard(r);
  if (mode === 'repeated-sub') return rsubCard(r);
  return hopCard(mode, r);
}

/** levels 1 and 3 of any mode (G1-118 'add' included): rows that never repeat a question on the page */
function buildRowsV2(mode, d, rng, locale) {
  const rows = [];
  const seen = new Set();
  const fresh = (key) => { if (seen.has(key)) return false; seen.add(key); return true; };
  if (mode === 'count-on' || mode === 'count-back' || mode === 'jump-sub' || mode === 'add') {
    const back = mode === 'count-back' || mode === 'jump-sub';
    const all = [];
    for (let b = d.hops[0]; b <= d.hops[1]; b++) {
      for (let a = 0; a <= d.lineMax; a++) {
        const to = back ? a - b : a + b;
        if (to < 0 || to > d.lineMax) continue;
        if (d.bridge && !(back ? a > 10 && to < 10 : a < 10 && to > 10)) continue;
        if (back && a < 2) continue;   // never "1 − 1": the hops would hide behind the start dot
        all.push({ a, b, to });
      }
    }
    const usedTo = new Set(), usedB = new Set();
    for (let i = 0; i < d.rows; i++) {
      // the hop count first, a new one on every row where it can be (bridging ten has the most starts for 9 hops:
      // drawn from all rows at once, a page read "+9, +9, +9, +9")
      const bs = rng.shuffle([...new Set(all.map((x) => x.b))]).sort((p, q) => usedB.has(p) - usedB.has(q));
      let pool = [];
      for (const b of bs) {
        pool = all.filter((x) => x.b === b && !seen.has(x.a + ':' + x.b) && !usedTo.has(x.to) && !usedTo.has('a' + x.a));
        if (pool.length) break;
      }
      if (!pool.length) pool = all.filter((x) => !seen.has(x.a + ':' + x.b));
      if (!pool.length) throw new Error(`number-lines ${mode}: no row left`);
      const x = rng.pick(pool);
      fresh(x.a + ':' + x.b); usedTo.add(x.to); usedTo.add('a' + x.a); usedB.add(x.b);
      rows.push({ ...x, line: { min: 0, max: d.lineMax, labelEvery: d.labelEvery, width: 540, jumps: [{ from: x.a, to: x.to }], marks: [x.a] } });
    }
  } else if (mode === 'place') {
    // the right dot's place among the dots (leftmost, second …) is spread over the rows
    const ranks = rng.shuffle(Array.from({ length: d.rows }, (_, i) => i % d.cands));
    const lo = d.candLo === undefined ? 0 : d.candLo, hi = d.candHi === undefined ? d.lineMax : d.candHi;
    const range = Array.from({ length: hi - lo + 1 }, (_, j) => lo + j);
    const printed = (v) => d.labelEvery > 1 && v % d.labelEvery === 0;
    for (let i = 0; i < d.rows; i++) {
      let row = null;
      for (let g = 0; g < 800 && !row; g++) {
        const set = rng.sample(range, d.cands).sort((a, b) => a - b);
        if (set.some((v, j) => j && v - set[j - 1] < 2)) continue;
        const target = set[ranks[i]];
        if (target < d.tLo || target > d.tHi || printed(target) || seen.has('t' + target)) continue;
        row = { target, cands: set };
      }
      if (!row) throw new Error('number-lines place: no dots for row ' + (i + 1));
      fresh('t' + row.target);
      rows.push({ ...row, line: { min: 0, max: d.lineMax, labelEvery: d.labelEvery, width: 540, marks: row.cands.slice() } });
    }
  } else if (mode === 'round') {
    const step = d.step;
    const downs = rng.shuffle(Array.from({ length: d.rows }, (_, i) => i % 2 === 0));   // half round down, half up
    for (let i = 0; i < d.rows; i++) {
      let r = null;
      for (let g = 0; g < 400 && !r; g++) {
        const lo = step * rng.int(d.loMin / step, d.loMax / step);
        let off;
        if (d.near) off = rng.pick(d.near.filter((o) => (o < step / 2) === downs[i]));
        else { off = rng.int(d.mid[0], d.mid[1]); if (off * 2 === step || (off < step / 2) !== downs[i]) continue; }
        const v = lo + off;
        if (!fresh('v' + v) || !fresh('lo' + lo)) continue;
        r = { v, lo, step };
      }
      if (!r) throw new Error('number-lines round: no dot');
      r.chips = rng.shuffle([r.lo, r.lo + step]);
      r.line = { min: r.lo, max: r.lo + step, tickStep: step / 10, labelEvery: d.labelMid ? 5 : 10, width: 540, marks: [r.v] };
      rows.push(r);
    }
  } else if (mode === 'multiples') {
    const ks = rng.shuffle(d.ks.slice());
    for (let i = 0; i < d.rows; i++) {
      const k = ks[i % ks.length];
      const hops = rng.int(d.hops[0], d.hops[1]);
      const tick = k >= 10 ? 5 : 1;
      rows.push({ k, hops, line: { min: 0, max: hops * k + k, tickStep: tick, labelEvery: k / tick, width: 540, jumps: [{ from: 0, to: hops * k, step: k }], marks: [0] } });
    }
  } else if (mode === 'repeated-sub') {
    const div = divGlyph(locale);
    const all = [];
    for (const k of d.ks) for (let h = 2; h <= 5 && h * k <= d.lineMax; h++) all.push({ k, hops: h, n: h * k });
    const ks = rng.shuffle(d.ks.slice());
    for (let i = 0; i < d.rows; i++) {
      let pool = all.filter((x) => x.k === ks[i % ks.length] && !seen.has('n' + x.n));
      if (!pool.length) pool = all.filter((x) => !seen.has('n' + x.n));
      const x = rng.pick(pool); fresh('n' + x.n);
      rows.push({ ...x, div, line: { min: 0, max: x.n + x.k, tickStep: 1, labelEvery: x.k, width: 540, jumps: [{ from: x.n, to: 0, step: x.k }], marks: [x.n] } });
    }
  }
  return rows;
}

/** the screen or the key of a built page */
function screenOrKey(mode, b, args, ctx) {
  const rows = b._rows;
  if (!ctx.interactive) {
    if (mode === 'place') return { bodyHtml: cardGrid({ cards: rows.map((r) => cardOf(mode, r, true)), cols: 1, rows: rows.length }), meta: b.meta };
    return { bodyHtml: NLS.keyOf(b.bodyHtml), meta: b.meta };
  }
  const loc = (args.locale || 'en').slice(0, 2);
  const salt = NCS.saltOf({ ...ctx, locale: loc }, rows.map((r, i) => ({ q: JSON.stringify(r.line) + i })));
  return { bodyHtml: NLS.screen(mode, rows, salt), meta: b.meta };
}

const KEY_OF_MODE = { 'count-on': 'hop', 'count-back': 'hop', 'jump-sub': 'sum', add: 'sum', place: 'place', multiples: 'mult', 'repeated-sub': 'rsub' };

function makeNumberLineTaskType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  const legacyLevels = cfg.difficulty || {
    1: { lineMax: 10, rows: 3 },
    2: { lineMax: 20, rows: 3 },
    3: { lineMax: 20, rows: 4 },
  };
  const L = NLT_LEVELS[id];
  const instr = mode === 'round' ? (legacyLevels[2].roundTo === 100 ? 'round100' : 'round10') : KEY_OF_MODE[mode];
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'number-lines',
    exerciseType: 'number-lines',
    themeAxis: { applicable: false },
    difficulty: L ? { 1: L[1], 2: legacyLevels[2], 3: L[3] } : legacyLevels,
    i18n,
    interactive: NLS.interactiveFor(instr),
    // what makes a copy different: the questions of its rows
    levelSetWords(m) { return (m.asks || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rows = d.v2 ? buildRowsV2(mode, d, ctx.rng, args.locale) : this._legacyRows(d, args, ctx);
      const cards = rows.map((r) => cardOf(mode, r));
      const b = { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: { asks: rows.map(askOf) }, _rows: rows };
      if (ctx && (ctx.interactive || ctx.answerKey)) return screenOrKey(mode, b, args, ctx);
      delete b._rows;
      return b;
    },

    /** the published draw (level 2) — the rng calls of the original code, in order */
    _legacyRows(d, { locale }, ctx) {
      const rng = ctx.rng;
      const div = divGlyph(locale);   // C1 2026-09-14: was a hard-coded '÷'
      const rows = [];
      const pub = !(ctx.seedVariant > 1);
      for (let i = 0, redraw = 0; i < d.rows; i++) {
        const labelEvery = (d.lineMax > 20 ? 10 : (d.lineMax > 10 ? 2 : 1));
        if (mode === 'count-on' || mode === 'count-back' || mode === 'jump-sub') {
          const back = mode !== 'count-on';
          const b = rng.int(1, Math.min(6, d.lineMax - 2));
          const a = back ? rng.int(b + 1, d.lineMax) : rng.int(0, d.lineMax - b - 1);
          const to = back ? a - b : a + b;
          rows.push({ a, b, to, line: { min: 0, max: d.lineMax, labelEvery, width: 540, jumps: [{ from: a, to }], marks: [a] } });
        } else if (mode === 'place') {
          const target = rng.int(1, d.lineMax - 1);
          const candSet = new Set([target]);
          let guard = 0;
          while (candSet.size < 4 && guard++ < 60) {
            const c = rng.int(0, d.lineMax);
            if (Math.abs(c - target) >= 2) candSet.add(c);
          }
          rows.push({ target, cands: [...candSet], line: { min: 0, max: d.lineMax, labelEvery, width: 540, marks: [...candSet] } });
        } else if (mode === 'round') {
          const step = d.roundTo;
          const lineMax = d.lineMax;
          const lo = step * rng.int(0, (lineMax / step) - 1);
          let v;
          do { v = lo + rng.int(1, step - 1); } while (v % step === 0 || v - lo === step / 2);
          const chips = ctx.rng.shuffle([lo, lo + step]);
          rows.push({ v, lo, step, chips, line: { min: lo, max: lo + step, tickStep: step / 10, labelEvery: 10, width: 540, marks: [v] } });
        } else if (mode === 'multiples') {
          const k = d.ks[i % d.ks.length];
          const hops = rng.int(3, Math.min(5, Math.floor(d.lineMax / k)));
          // hops of k (2026-10-13 fix: the published page drew one arc per unit)
          rows.push({ k, hops, line: { min: 0, max: hops * k + k, tickStep: 1, labelEvery: k, width: 540, jumps: [{ from: 0, to: hops * k, step: k }], marks: [0] } });
        } else if (mode === 'repeated-sub') {
          const k = d.ks[i % d.ks.length];
          const hops = rng.int(2, Math.min(5, Math.floor(d.lineMax / k)));
          const n = hops * k;
          rows.push({ k, hops, n, div, line: { min: 0, max: Math.min(d.lineMax, n + k), tickStep: 1, labelEvery: k, width: 540, jumps: [{ from: n, to: 0, step: k }], marks: [n] } });
        }
        // a new copy (not the published page) draws a row again when it asks what an earlier row asked
        if (!pub && redraw < 40 && rows.slice(0, -1).some((r) => askOf(r) === askOf(rows[rows.length - 1]))) { rows.pop(); i--; redraw++; }
      }
      return rows;
    },

    async verify(page) {
      return page.evaluate(verifyInPage, mode);
    },
  };
}

/** what a row asks (copies of a level may share at most part of it) */
function askOf(r) {
  if (r.target !== undefined) return 'p' + r.target;
  if (r.v !== undefined) return 'r' + r.v;
  if (r.n !== undefined) return 's' + r.n + '/' + r.k;
  if (r.k !== undefined) return 'm' + r.k + 'x' + r.hops;
  return 'h' + r.a + (r.to > r.a ? '+' : '-') + r.b;
}

/** runs in the page (mode passed in): every card checked against its own stamps */
function verifyInPage(mode) {
  const fails = [];
  document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
    const svg = card.querySelector('[data-lcs-prim="number-line"]');
    const hops = svg ? [...svg.querySelectorAll('[data-lcs-hop]')].map((e) => e.dataset.lcsHop) : [];
    const lmax = svg ? +svg.dataset.lcsMax : NaN, lmin = svg ? +svg.dataset.lcsMin : NaN;
    if (mode === 'count-on' || mode === 'count-back' || mode === 'jump-sub' || mode === 'add') {
      const st = card.querySelector('[data-lcs-a]');
      const a = +st.dataset.lcsA, b = +st.dataset.lcsB;
      const to = +card.querySelector('[data-lcs-answer]').dataset.lcsAnswer;
      if (Math.abs(to - a) !== b) fails.push(`row ${i + 1}: landing ${to} is not ${b} hops from ${a}`);
      if (mode === 'count-on' || mode === 'add') { if (to !== a + b) fails.push(`row ${i + 1}: ${a} + ${b} != ${to}`); } else if (to !== a - b) fails.push(`row ${i + 1}: ${a} − ${b} != ${to}`);
      if (hops.length !== b) fails.push(`row ${i + 1}: ${hops.length} hops != ${b}`);
      const dir = to > a ? 1 : -1;
      for (let k = 0; k < b; k++) {
        const want = `${a + k * dir}->${a + (k + 1) * dir}`;
        if (!hops.includes(want)) fails.push(`row ${i + 1}: missing hop ${want}`);
      }
      if (to < 0 || to > lmax) fails.push(`row ${i + 1}: lands off the line`);
      const mark = svg.querySelector('[data-lcs-mark]');
      if (!mark || +mark.dataset.lcsMark !== a) fails.push(`row ${i + 1}: start dot != ${a}`);
    } else if (mode === 'place') {
      const target = +card.querySelector('[data-lcs-target]').dataset.lcsTarget;
      const marks = [...svg.querySelectorAll('[data-lcs-mark]')].map((e) => +e.dataset.lcsMark);
      if (!marks.includes(target)) fails.push(`row ${i + 1}: target ${target} has no mark`);
      if (marks.length < 3) fails.push(`row ${i + 1}: too few candidate marks`);
      marks.forEach((mv) => { if (mv !== target && Math.abs(mv - target) < 2) fails.push(`row ${i + 1}: distractor ${mv} too close to ${target}`); });
    } else if (mode === 'round') {
      const st = card.querySelector('[data-lcs-v]');
      const v = +st.dataset.lcsV, lo = +st.dataset.lcsLo, step = +st.dataset.lcsStep;
      const nearer = (v - lo) < step / 2 ? lo : lo + step;
      const correct = [...card.querySelectorAll('[data-lcs-correct]')];
      if (correct.length !== 1 || +correct[0].dataset.lcsChoice !== nearer) fails.push(`row ${i + 1}: rounding target wrong (v=${v})`);
      if (v % step === 0 || (v - lo) * 2 === step) fails.push(`row ${i + 1}: ambiguous value ${v}`);
      if (v < lmin || v > lmax) fails.push(`row ${i + 1}: dot off its line`);
    } else if (mode === 'multiples') {
      const st = card.querySelector('[data-lcs-k]');
      const k = +st.dataset.lcsK, n = +st.dataset.lcsHops;
      // equal hops of k: n arcs, each k long, from 0
      if (hops.length !== n) fails.push(`row ${i + 1}: ${hops.length} arcs for ${n} hops of ${k}`);
      for (let h = 0; h < n; h++) if (!hops.includes(`${h * k}->${(h + 1) * k}`)) fails.push(`row ${i + 1}: missing hop ${h * k}->${(h + 1) * k}`);
      if (n * k > lmax) fails.push(`row ${i + 1}: hops run past the line`);
      const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((e) => +e.dataset.lcsAnswer);
      if (boxes.length !== n) fails.push(`row ${i + 1}: ${boxes.length} boxes for ${n} hops`);
      boxes.forEach((bv, h) => { if (bv !== (h + 1) * k) fails.push(`row ${i + 1}: box ${h + 1} = ${bv} != ${(h + 1) * k}`); });
    } else if (mode === 'repeated-sub') {
      const st = card.querySelector('[data-lcs-n]');
      const n = +st.dataset.lcsN, k = +st.dataset.lcsK, h = +st.dataset.lcsHops;
      if (n !== k * h) fails.push(`row ${i + 1}: ${n} != ${k}×${h}`);
      if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== h) fails.push(`row ${i + 1}: quotient mismatch`);
      // the hops a child counts ARE the answer: h arcs of k
      if (hops.length !== h) fails.push(`row ${i + 1}: ${hops.length} arcs drawn, the answer is ${h} hops`);
      for (let j = 0; j < h; j++) if (!hops.includes(`${n - j * k}->${n - (j + 1) * k}`)) fails.push(`row ${i + 1}: missing hop ${n - j * k}->${n - (j + 1) * k}`);
    }
  });
  return fails;
}

module.exports = { makeNumberLineTaskType, NLT_LEVELS, buildRowsV2, cardOf, screenOrKey, askOf, verifyInPage };
