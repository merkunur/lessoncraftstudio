/**
 * md-more.js — the new templates of the Multiplication & Division maker (NEW-TEMPLATES §13, 2026-11-01). Print-only
 * (the maker's answer key; the generic screen engine adds a screen where the page has one right answer). Every sign is
 * the locale's own (types/_shared/notation.js: · in de/sv/da/no/fi, : or / for division; never ÷ in Swedish). Six modes:
 *
 *   square   T1 · G3-407 — the multiplication square to fill. L1 5 × 5, two thirds given · L2 10 × 10, half given ·
 *            L3 10 × 10, headers only. 3.OA.C.7, 3.OA.B.5.
 *   divdrill T2 · G3-408 — a page of division facts (24 : 6 = [ ]). L1 the 2, 5, 10 tables, 20 facts · L2 2-5 and 10,
 *            40 · L3 2-10, 60. Never ÷ 1, never a quotient 0. 3.OA.C.7.
 *   day      T3 · G3-409 — one fact five ways: equal groups (dots), an array, the skip-count strip, both products,
 *            both quotients. L1 the 2, 5, 10 tables · L2 3, 4 · L3 6-9. 3.OA.A.1-2, 3.OA.B.5-6.
 *   draw     T4 · G2-411 — colour a rectangle of dots for a product on a dot grid (either orientation is right);
 *            L2/L3 also write the total. L1 tables 2-3, 6 × 6 grid · L2 2-5, 10 × 10 · L3 2-9, 10 × 10. 2.OA.C.4.
 *   chain    T5 · G3-410 — strategy chains: × 4 = × 2 × 2 · × 8 = × 4 × 2 · × 5 = (× 10) : 2 · × 9 = × 10 − one group.
 *            L1 × 4 and × 5 · L2 × 8 and × 9 · L3 all four. Products within 100. 3.OA.B.5, 3.OA.D.9.
 *   ring     T7 · G3-411 — table cards for a key ring (material, no key): punch hole, one table per card; L3 leaves
 *            the answers blank to say aloud. L1 2, 3, 5, 10 · L2 4, 6, 7, 8 · L3 the six hardest, blank.
 *   split    G3-483 (Year pages K) — a hard fact broken in two: an array of a rows of b squares, and under it
 *            a · b = _ · b + _ · b = _ + _ = _. L1 the line is printed under the fifth row and the two part facts
 *            are printed (one right answer a box) · L2 the six facts 7·7 to 9·9, the child draws the line and writes
 *            the parts (the key shows one way) · L3 three facts, each array twice: two different lines, one total.
 *            3.OA.B.5, 3.OA.C.7.
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { mulGlyph, divGlyph } = require('./notation.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', GREY = '#8A8276', CREAM = '#FBF3E4', SOFT = '#CFE6E1';
const NUM = (s, size = 28, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;

const LEVELS = {
  square: { 1: { n: 5, given: 0.66 }, 2: { n: 10, given: 0.5 }, 3: { n: 10, given: 0 } },
  divdrill: {
    1: { tables: [2, 5, 10], cols: 2, rows: 10 },
    2: { tables: [2, 3, 4, 5, 10], cols: 4, rows: 10 },
    3: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], cols: 4, rows: 15 },
  },
  day: { 1: { tables: [2, 5, 10] }, 2: { tables: [3, 4] }, 3: { tables: [6, 7, 8, 9] } },
  draw: { 1: { tables: [2, 3], grid: 6, total: false }, 2: { tables: [2, 3, 4, 5], grid: 10, total: true }, 3: { tables: [2, 3, 4, 5, 6, 7, 8, 9], grid: 10, total: true } },
  chain: { 1: { kinds: ['x4', 'x5'] }, 2: { kinds: ['x8', 'x9'] }, 3: { kinds: ['x4', 'x5', 'x8', 'x9'] } },
  split: { 1: { line: true, cards: 6 }, 2: { line: false, cards: 6 }, 3: { line: false, cards: 6, twice: true } },
  ring: { 1: { tables: [2, 3, 5, 10] }, 2: { tables: [4, 6, 7, 8] }, 3: { tables: [3, 4, 6, 7, 8, 9], blank: true } },
};

const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** rows × cols dots; `fill` = how many leading rows / cols are coloured (the key's array) */
function dotGrid(rows, cols, { r = 7, gap = 20, fillR = 0, fillC = 0 } = {}) {
  let s = '';
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const on = y < fillR && x < fillC;
    s += `<circle cx="${x * gap + r + 3}" cy="${y * gap + r + 3}" r="${r}" fill="${on ? TEAL : '#FFFFFF'}" stroke="${on ? TEAL : GRID}" stroke-width="2"/>`;
  }
  const W = cols * gap + 6 - (gap - 2 * r), H = rows * gap + 6 - (gap - 2 * r);
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-dotgrid="${rows}x${cols}">${s}</svg>`;
}

function makeMdMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'numeral-charts',
    exerciseType: mode === 'draw' ? 'arrays-multiplication' : 'multiplication-tables',
    themeAxis: { applicable: false },
    difficulty: cfg.levels || LEVELS[mode],   // a face may bring its own levels (Year pages J)
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const MUL = mulGlyph(args.locale), DIV = divGlyph(args.locale);
      const content = (inner) => `<div data-ws-content data-lcs-md-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'square') {
        const n = d.n, C = n === 5 ? 92 : 56;
        const cells = [];
        // which products are given: a share drawn per page (L3 none); the 1-row/column and the squares first on L2
        const all = [];
        for (let r = 1; r <= n; r++) for (let c = 1; c <= n; c++) all.push([r, c]);
        // blanks come in mirror pairs (r×c blank ⇒ c×r blank): a printed mirror would be copied, not multiplied (review)
        const pairs = all.filter(([r, c]) => r <= c);
        const nBlank = Math.round(all.length * (1 - d.given));
        const blank = new Set();
        for (const [r, c] of shuffle(pairs, rng)) { if (blank.size >= nBlank) break; blank.add(r + ':' + c); blank.add(c + ':' + r); }
        const given = new Set(all.map(([r, c]) => r + ':' + c).filter((k) => !blank.has(k)));
        const head = (v) => `<span style="width:${C}px;height:${C}px;display:flex;align-items:center;justify-content:center;background:${SOFT};font-family:'Baloo 2';font-weight:700;font-size:${n === 5 ? 34 : 24}px;color:${INK}">${v}</span>`;
        cells.push(`<span style="width:${C}px;height:${C}px;display:flex;align-items:center;justify-content:center;background:${TEAL};color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:${n === 5 ? 36 : 26}px">${MUL}</span>`);
        for (let c = 1; c <= n; c++) cells.push(head(c));
        for (let r = 1; r <= n; r++) {
          cells.push(head(r));
          for (let c = 1; c <= n; c++) {
            cells.push(given.has(r + ':' + c)
              ? `<span data-lcs-sq="${r}x${c}" style="width:${C}px;height:${C}px;display:flex;align-items:center;justify-content:center;background:${CREAM};font-family:'Baloo 2';font-weight:700;font-size:${n === 5 ? 30 : 21}px;color:${INK}">${r * c}</span>`
              : `<span data-lcs-sq="${r}x${c}" style="width:${C}px;height:${C}px;display:flex;align-items:center;justify-content:center;background:#FFFFFF">${answerBox({ w: C - 8, h: C - 8, answer: r * c })}</span>`);
          }
        }
        const grid = `<div style="display:grid;grid-template-columns:repeat(${n + 1},${C}px);gap:2px;background:${GRID};border:2px solid ${GRID};border-radius:8px;overflow:hidden" data-lcs-square="${n}">${cells.join('')}</div>`;
        return { bodyHtml: content(`<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:center">${grid}</div>`), meta: { items: [n + ':' + given.size] } };
      }

      if (mode === 'divdrill') {
        const pool = [];
        for (const t of d.tables) for (let q = 1; q <= 10; q++) pool.push({ a: t * q, b: t, q });
        const N = d.cols * d.rows;
        let ps = shuffle(pool, rng).slice(0, N);
        // fewer distinct facts than cells (L1): a fact may come back, but never twice in a row
        while (ps.length < N) ps.push(rng.pick(pool));
        ps = ps.slice(0, N);
        for (let i = 1; i < ps.length; i++) if (ps[i].a === ps[i - 1].a && ps[i].b === ps[i - 1].b) { const j = (i + 2) % ps.length; [ps[i], ps[j]] = [ps[j], ps[i]]; }
        const fs = d.rows > 10 ? 21 : 25;
        const cells = ps.map((p) => `<div data-lcs-div="${p.a}:${p.b}=${p.q}" style="display:flex;align-items:center;justify-content:center;gap:6px">${NUM(p.a, fs)}${NUM(DIV, fs - 2, CORAL)}${NUM(p.b, fs)}${NUM('=', fs - 2, GREY)}${answerBox({ w: Math.round(fs * 2), h: Math.round(fs * 1.45), answer: p.q })}</div>`);
        const body = `<div style="flex:1;display:grid;grid-template-columns:repeat(${d.cols},minmax(0,1fr));grid-template-rows:repeat(${d.rows},minmax(0,1fr));gap:4px 10px;align-items:center">${cells.join('')}</div>`;
        return { bodyHtml: content(body), meta: { items: ps.map((p) => p.a + ':' + p.b) } };
      }

      if (mode === 'day') {
        const t = rng.pick(d.tables);
        let g = rng.int(3, 9); if (g === t) g = g === 9 ? 8 : g + 1;   // two different factors: both products differ in meaning
        const P = g * t;
        const panel = (inner, h) => `<div class="ws-subgroup" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:12px;border-radius:14px;background:#FFFFFF;border:2px solid #F0E4CB;min-height:${h}px;box-sizing:border-box">${inner}</div>`;
        // 1. equal groups: g groups of t dots
        const groups = Array.from({ length: g }, () => `<span style="display:inline-flex;flex-wrap:wrap;width:${t > 5 ? 88 : 62}px;gap:4px;padding:6px;border:2.5px solid ${TEAL};border-radius:14px;justify-content:center">${Array.from({ length: t }, () => `<span style="width:13px;height:13px;border-radius:50%;background:${CORAL}"></span>`).join('')}</span>`).join('');
        const p1 = panel(`<span style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">${groups}</span>`, 250);
        // 2. the array: g rows of t
        const ar = Math.max(7, Math.min(14, Math.floor(210 / (Math.max(g, t) * 2.6))));   // the array fills its panel: small facts get big dots
        const p2 = panel(dotGrid(g, t, { r: ar, gap: Math.round(ar * 2.6) }), 250);
        // 3. the skip-count strip: t, 2t, … gt with two thirds blank
        const steps = Array.from({ length: g }, (_, k) => (k + 1) * t);
        const shown = new Set([0, ...shuffle(steps.map((_, k) => k).slice(1), rng).slice(0, Math.floor(g / 3))]);
        const strip = steps.map((v, k) => `<span style="display:inline-flex;align-items:flex-end;gap:1px">${shown.has(k) ? `<span style="padding-left:6px;height:44px;display:inline-flex;align-items:center">${NUM(v, 26)}</span>` : answerBox({ w: 50, h: 44, answer: v })}${k < steps.length - 1 ? NUM(',', 22, GREY) : ''}</span>`).join('');
        const p3 = panel(`<span style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center" data-lcs-skip="${t}">${strip}</span>`, 130);
        // 4. both products, both quotients
        const eq = (l, op, r) => `<span style="display:flex;align-items:center;gap:8px">${NUM(l, 26)}${NUM(op, 24, op === MUL ? TEAL : CORAL)}${NUM(r, 26)}${NUM('=', 24, GREY)}`;
        const p4 = panel(`<span style="display:grid;grid-template-columns:auto auto;gap:14px 30px">` +
          `${eq(g, MUL, t)}${answerBox({ w: 60, h: 46, answer: P })}</span>${eq(t, MUL, g)}${answerBox({ w: 60, h: 46, answer: P })}</span>` +
          `${eq(P, DIV, t)}${answerBox({ w: 60, h: 46, answer: g })}</span>${eq(P, DIV, g)}${answerBox({ w: 60, h: 46, answer: t })}</span></span>`, 170);
        const head = `<div style="flex:0 0 auto;display:flex;justify-content:center;padding:4px 0 10px" data-lcs-dayfact="${g}x${t}"><span style="display:inline-flex;align-items:center;gap:10px;padding:8px 28px;border-radius:999px;background:${TEAL}">${NUM(g, 36, '#FFFFFF')}${NUM(MUL, 32, '#FFFFFF')}${NUM(t, 36, '#FFFFFF')}</span></div>`;
        const body = `${head}<div style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;gap:14px;align-content:space-evenly">${p1}${p2}<div style="grid-column:1/3">${p3}</div><div style="grid-column:1/3">${p4}</div></div>`;
        return { bodyHtml: content(body), meta: { items: [g + 'x' + t] } };
      }

      if (mode === 'draw') {
        const used = new Set();
        const ps = [];
        const nCards = d.grid === 6 ? 6 : 4;
        for (let t = 0; ps.length < nCards && t < 400; t++) {
          const a = rng.pick(d.tables), b = rng.int(2, d.grid === 6 ? 6 : 9);
          if (a > d.grid || b > d.grid || used.has(Math.min(a, b) + 'x' + Math.max(a, b))) continue;
          used.add(Math.min(a, b) + 'x' + Math.max(a, b));
          ps.push({ a, b });
        }
        if (ps.length < nCards) throw new Error(`${id}: not enough products`);
        const gap = d.grid === 6 ? 26 : 22, r = d.grid === 6 ? 9 : 7;
        const cards = ps.map((p) => {
          const grid = dotGrid(d.grid, d.grid, { r, gap, fillR: key ? p.a : 0, fillC: key ? p.b : 0 });
          const total = d.total ? `${NUM('=', 26, GREY)}${answerBox({ w: 60, h: 48, answer: p.a * p.b })}` : '';
          return `<div class="ws-card-stage" data-lcs-drawarray="${p.a}x${p.b}" style="flex-direction:column;justify-content:center;align-items:center;gap:10px">` +
            `<span style="display:flex;align-items:center;gap:8px">${NUM(p.a, 30)}${NUM(MUL, 26, TEAL)}${NUM(p.b, 30)}${total}</span>` +
            `<span${key ? ' data-lcs-key-sample="1"' : ''}>${grid}</span></div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: nCards / 2 })), meta: { items: ps.map((p) => p.a + 'x' + p.b) } };
      }

      if (mode === 'chain') {
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < 8 && t < 400; t++) {
          const kind = d.kinds[ps.length % d.kinds.length];
          const a = rng.int(kind === 'x8' ? 3 : 2, 9);
          if (used.has(kind + a)) continue;
          used.add(kind + a);
          ps.push({ kind, a });
        }
        if (ps.length < 8) throw new Error(`${id}: not enough chains`);
        const B = (v, w = 58) => answerBox({ w, h: 46, answer: v });
        const op = (s) => NUM(s, 24, s === MUL ? TEAL : s === DIV || s === '−' ? CORAL : s === '=' ? GREY : INK);
        const cards = shuffle(ps, rng).map((p) => {
          const a = p.a;
          let parts;
          if (p.kind === 'x4') parts = [NUM(a), op(MUL), NUM(4), op('='), NUM(a), op(MUL), NUM(2), op(MUL), NUM(2), op('='), B(2 * a), op(MUL), NUM(2), op('='), B(4 * a)];
          else if (p.kind === 'x8') parts = [NUM(a), op(MUL), NUM(8), op('='), NUM(a), op(MUL), NUM(4), op(MUL), NUM(2), op('='), B(4 * a), op(MUL), NUM(2), op('='), B(8 * a)];
          // Year pages J: the tables of 6 and 7 from the table of 5 (one more group; two more groups)
          else if (p.kind === 'x6') parts = [NUM(a), op(MUL), NUM(6), op('='), NUM(a), op(MUL), NUM(5), op('+'), NUM(a), op('='), B(5 * a), op('+'), NUM(a), op('='), B(6 * a)];
          else if (p.kind === 'x7') parts = [NUM(a), op(MUL), NUM(7), op('='), NUM(a), op(MUL), NUM(5), op('+'), NUM(a), op(MUL), NUM(2), op('='), B(5 * a), op('+'), B(2 * a), op('='), B(7 * a)];
          else if (p.kind === 'x5') parts = [NUM(a), op(MUL), NUM(5), op('='), `<span style="display:inline-flex;align-items:center;gap:6px">${NUM('(' + a)}${op(MUL)}${NUM('10)')}</span>`, op(DIV), NUM(2), op('='), B(10 * a), op(DIV), NUM(2), op('='), B(5 * a)];
          else parts = [NUM(a), op(MUL), NUM(9), op('='), NUM(a), op(MUL), NUM(10), op('−'), NUM(a), op('='), B(10 * a, 64), op('−'), NUM(a), op('='), B(9 * a)];
          return `<div class="ws-card-stage" data-lcs-chain="${p.kind}:${a}" style="justify-content:center;align-items:center;gap:6px">${parts.join('')}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: 8 })), meta: { items: ps.map((q) => q.kind + q.a) } };
      }

      if (mode === 'split') {
        // the six facts whose both factors are 7, 8 or 9: the last ones a class learns (a rows of b squares, a <= b)
        const HARD = [[7, 7], [7, 8], [7, 9], [8, 8], [8, 9], [9, 9]];
        let ps;
        if (d.twice) ps = shuffle(HARD, rng).slice(0, 3).flatMap((p, i) => [{ a: p[0], b: p[1], way: 0, pair: i }, { a: p[0], b: p[1], way: 1, pair: i }]);
        else if (d.line) {
          // level 1: every table of 6 to 9 at least once, six different second factors, so no fact comes twice
          const as = [...shuffle([6, 7, 8, 9], rng), ...shuffle([6, 7, 8, 9], rng).slice(0, 2)];
          const bs = shuffle([3, 4, 6, 7, 8, 9], rng);
          ps = shuffle(as.map((a, k) => ({ a, b: bs[k], way: 0 })), rng);
        } else ps = shuffle(HARD, rng).map(([a, b]) => (a !== b && rng.int(0, 1) ? { a: b, b: a, way: 0 } : { a, b, way: 0 }));   // 7 rows of 8 or 8 rows of 7
        // the split a key shows: five rows and the rest; the second way of level 3 is another pair of parts
        const WAY2 = { 6: 3, 7: 4, 8: 4, 9: 6 };
        const C = 15, G = 2, P = C + G;
        const B = (v, w = 44) => answerBox({ w, h: 38, answer: v });
        const op = (x) => NUM(x, 21, x === MUL ? TEAL : x === '=' ? GREY : INK);
        const cards = ps.map((p) => {
          const k = p.way ? WAY2[p.a] : 5;
          const W = p.b * P - G, H = p.a * P - G;
          let sq = '';
          for (let y = 0; y < p.a; y++) for (let x = 0; x < p.b; x++) sq += `<rect x="${x * P + 8}" y="${y * P}" width="${C}" height="${C}" rx="2.5" fill="#DDEBE8" stroke="${TEAL}" stroke-width="1.2"/>`;
          const cut = (d.line || key) ? `<line x1="0" y1="${k * P - G / 2}" x2="${W + 16}" y2="${k * P - G / 2}" stroke="${CORAL}" stroke-width="3" stroke-linecap="round"${d.line ? '' : ' data-lcs-key-sample="1"'}/>` : '';
          const grid = `<svg width="${W + 16}" height="${H}" viewBox="0 0 ${W + 16} ${H}" data-lcs-splitgrid="${p.a}x${p.b}"${d.line ? ` data-lcs-cut="${k}"` : ''}>${sq}${cut}</svg>`;
          const part = (v) => d.line ? NUM(v, 22) : B(v, 38);
          const l1 = `<span style="display:flex;align-items:center;gap:5px">${NUM(p.a, 22)}${op(MUL)}${NUM(p.b, 22)}${op('=')}${part(k)}${op(MUL)}${NUM(p.b, 22)}${op('+')}${part(p.a - k)}${op(MUL)}${NUM(p.b, 22)}</span>`;
          const l2 = `<span style="display:flex;align-items:center;gap:5px">${op('=')}${B(k * p.b)}${op('+')}${B((p.a - k) * p.b)}${op('=')}${B(p.a * p.b, 50)}</span>`;
          return `<div class="ws-card-stage" data-lcs-split="${p.a}x${p.b}:${k}" style="flex-direction:column;justify-content:center;align-items:center;gap:7px">${grid}${l1}${l2}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: 3 })), meta: { items: ps.map((q) => q.a + 'x' + q.b + (q.way ? 'b' : '')) } };
      }

      // ring: table cards for a key ring (material)
      const cards = d.tables.map((t) => {
        const lines = Array.from({ length: 10 }, (_, k) => `<span style="display:flex;align-items:center;gap:5px;font-family:'Baloo 2';font-weight:700;font-size:20px;color:${INK};line-height:1.15"><span style="width:22px;text-align:right">${t}</span><span style="color:${TEAL}">${MUL}</span><span style="width:22px;text-align:right">${k + 1}</span><span style="color:${GREY}">=</span>${d.blank ? `<span style="width:40px;border-bottom:2px solid ${GRID};height:18px"></span>` : `<span style="width:30px">${t * (k + 1)}</span>`}</span>`).join('');
        return `<div class="ws-card-stage" data-lcs-ring="${t}" style="flex-direction:column;align-items:center;justify-content:flex-start;gap:6px;padding-top:10px;border:2.5px dashed ${GRID};background:#FFFFFF;box-sizing:border-box;min-height:0">` +
          `<span style="width:18px;height:18px;border-radius:50%;border:2.5px solid ${GREY}" aria-hidden="true"></span>${NUM(t, 30, CORAL)}<span style="display:flex;flex-direction:column;gap:2px">${lines}</span></div>`;
      });
      const rc = d.tables.length === 4 ? 2 : 3;   // four cards: two columns, not a three-column row with two gaps
      return { bodyHtml: content(cardGrid({ cards, cols: rc, rows: Math.ceil(d.tables.length / rc), numbered: false })), meta: { items: d.tables } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const box = document.querySelector('[data-lcs-md-mode]');
        if (!box) return ['no content'];
        const m = box.dataset.lcsMdMode;
        const n = Number;
        const page = document.querySelector('[data-lcs-page]') || document.body;
        const txt = page.textContent;
        if (m === 'square') document.querySelectorAll('[data-lcs-sq]').forEach((c) => {
          const [r, k] = c.dataset.lcsSq.split('x').map(n); const a = c.querySelector('[data-lcs-answer]');
          if (a ? n(a.dataset.lcsAnswer) !== r * k : n(c.textContent) !== r * k) fails.push('square ' + r + 'x' + k);
        });
        if (m === 'divdrill') document.querySelectorAll('[data-lcs-div]').forEach((c) => {
          const x = c.dataset.lcsDiv.match(/^(\d+):(\d+)=(\d+)$/); const [a, b, q] = [n(x[1]), n(x[2]), n(x[3])];
          if (a !== b * q || b < 2 || q < 1) fails.push('div ' + c.dataset.lcsDiv);
        });
        if (m === 'chain') document.querySelectorAll('[data-lcs-chain]').forEach((c) => {
          const [k, a] = c.dataset.lcsChain.split(':'); const want = { x4: [2, 4], x8: [4, 8], x5: [10, 5], x9: [10, 9], x6: [5, 6], x7: [5, 2, 7] }[k].map((f) => f * n(a));
          const got = [...c.querySelectorAll('[data-lcs-answer]')].map((b) => n(b.dataset.lcsAnswer));
          if (got.join() !== want.join() || want[want.length - 1] > 100) fails.push('chain ' + c.dataset.lcsChain);
        });
        if (m === 'draw') document.querySelectorAll('[data-lcs-drawarray]').forEach((c) => {
          const [a, b] = c.dataset.lcsDrawarray.split('x').map(n); const [gr] = c.querySelector('[data-lcs-dotgrid]').dataset.lcsDotgrid.split('x').map(n);
          if (a > gr || b > gr) fails.push('array larger than the grid');
        });
        if (m === 'split') {
          const seen = {};
          document.querySelectorAll('[data-lcs-split]').forEach((c) => {
            const x = c.dataset.lcsSplit.match(/^(\d+)x(\d+):(\d+)$/); const [a, b, k] = [n(x[1]), n(x[2]), n(x[3])];
            const got = [...c.querySelectorAll('[data-lcs-answer]')].map((e) => n(e.dataset.lcsAnswer));
            const want = [k * b, (a - k) * b, a * b];
            if (got.slice(-3).join() !== want.join() || k < 1 || k >= a || a * b > 100) fails.push('split ' + c.dataset.lcsSplit);
            if (got.length === 5 && (got[0] !== k || got[1] !== a - k)) fails.push('split parts ' + c.dataset.lcsSplit);
            const g = c.querySelector('[data-lcs-splitgrid]');
            if (!g || g.querySelectorAll('rect').length !== a * b) fails.push('split array ' + c.dataset.lcsSplit);
            (seen[a + 'x' + b] = seen[a + 'x' + b] || []).push(k);
          });
          // a fact printed twice (level 3) shows two different ways on the key, and both parts are facts of 1 to 6 rows
          for (const [f, ks] of Object.entries(seen)) if (ks.length > 1 && (new Set(ks).size !== ks.length || ks.some((k) => ks.some((j) => j !== k && j === n(f.split('x')[0]) - k)))) fails.push('split ' + f + ': the two ways are one way');
        }
        if (m === 'ring') document.querySelectorAll('[data-lcs-ring]').forEach((c) => { if (!c.textContent.includes('10')) fails.push('ring card'); });
        // ÷ never appears in a Swedish page (it meant minus); a German-style dot page never shows ×
        const loc = (document.documentElement.lang || '').slice(0, 2);
        if (loc === 'sv' && txt.includes('÷')) fails.push('sv page shows ÷');
        if (['de', 'sv', 'da', 'no', 'fi'].includes(loc) && txt.includes('×')) fails.push(loc + ' page shows ×');
        // nothing may run out of its card
        document.querySelectorAll('.ws-card-stage').forEach((c, i) => {
          const cr = c.getBoundingClientRect();
          c.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(`card ${i + 1}: something runs out of it`); });
        });
        return [...new Set(fails)];
      });
    },
  };
}

module.exports = { makeMdMoreType, LEVELS };
