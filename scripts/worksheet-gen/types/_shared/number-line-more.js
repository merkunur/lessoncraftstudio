/**
 * number-line-more.js — the new templates of the Number Lines maker (NEW-TEMPLATES §5, 2026-11-01). Print-only (the
 * maker's answer key; a screen version comes with the makers' play page). Six modes:
 *
 *   open      T1 · G1-438 — solve a sum on an EMPTY line (no ticks): the child draws the jumps, writes the result.
 *             The key draws one jump path (tens, then ones; the make-ten path within 20). Level 1: card 1 is a worked
 *             model. 1.NBT.C.4 / 2.NBT.B.5 / 2.NBT.B.7.
 *   bridge    T3 · G1-439 — the make-ten bridge: 8 + 5 = 8 + [2] + [3] = [13] on a 0-20 line (subtraction: back to the
 *             ten first). Only pairs that cross a ten. 1.OA.C.6, 2.NBT.B.5.
 *   labels    T2 · G2-395 — write the missing labels; both ends are printed and every tick is drawn, so the tick count
 *             fixes the step (one right answer per box). 2.MD.B.6, 2.NBT.A.2.
 *   vertical  T5 · G2-396 — a vertical (thermometer-style) line: write the number each arrow points to. 2.MD.B.6.
 *   fraction  T4 · G3-406 — mark p/b on a 0-1 line cut into b equal parts (level 3: a 0-2 line, fractions past 1).
 *             The line is cut in the fraction's OWN denominator, so the answer tick is unique. 3.NF.A.2.
 *   strip     T6 · K-455  — desk number lines to cut out and laminate (material; no answer key).
 *
 * Counting tasks never start at 0 (the operator's rule); a number line may show 0 — it is a scale, not a count.
 */
'use strict';
const numberLine = require('../../primitives/number-line.js');
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE';
const T = (s, size = 30, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;
const MINUS = '−';

const LEVELS = {
  open: {
    1: { cards: 4, model: true, kind: 'teen' },        // 8 + 7 within 20, crossing ten; card 1 worked
    2: { cards: 4, kind: 'two-digit' },                 // 36 + 27, 64 − 25 within 100
    3: { cards: 4, kind: 'three-digit' },               // 348 + 26, 512 − 37 within 1000
  },
  bridge: {
    1: { cards: 4, ops: ['+'], within: 20, model: true },   // card 1 worked: the boxes filled, the two jumps drawn
    2: { cards: 4, ops: ['+', '-'], within: 20 },
    3: { cards: 4, ops: ['+', '-'], within: 100 },
  },
  labels: {
    1: { lines: 4, steps: [1, 2], starts: [0], printed: 1, boxes: 3 },
    2: { lines: 4, steps: [5, 10, 2], starts: [0, 10, 20, 40], printed: 1, boxes: 4 },
    3: { lines: 4, steps: [100, 10, 5, 25], starts: [0, 100, 200, 300, 500], printed: 0, boxes: 4 },
  },
  vertical: {
    1: { cols: 3, arrows: 2, max: 20, tick: 1, labelEvery: 5 },
    2: { cols: 3, arrows: 2, max: 50, tick: 2, labelEvery: 5 },     // ticks of 2, a label every 10
    3: { cols: 3, arrows: 2, max: 100, tick: 5, labelEvery: 4 },    // ticks of 5, a label every 20
  },
  fraction: {
    1: { lines: 5, dens: [2, 3, 4], max: 1 },   // halves, thirds, quarters: six fractions, five lines
    2: { lines: 5, dens: [3, 4, 6, 8], max: 1 },
    3: { lines: 5, dens: [2, 3, 4, 6], max: 2 },
  },
  strip: {
    1: { strips: [[0, 10], [0, 10], [0, 10], [0, 10], [0, 10]] },
    2: { strips: [[0, 20], [0, 20], [0, 20], [0, 20], [0, 20]] },
    3: { strips: [[0, 20], [20, 40], [40, 60], [60, 80], [80, 100]] },   // 0-100 in five strips to tape together
  },
};

/** one sum of the open-line kind: { a, op, b, r } — the answer unique, never 0 */
function openProblem(rng, kind, used) {
  for (let t = 0; t < 400; t++) {
    let a, b, op;
    if (kind === 'teen') { op = '+'; a = rng.int(6, 9); b = rng.int(11 - a, 9); }
    // Year pages D: one operation a page. plus / minus, two-digit and two-digit within 100, with or without a new ten;
    // all three levels stay within 100 (the range of grade 2 in Germany and Sweden; the mixed page G1-438 has the
    // sums within 1,000): without a new ten · across a ten with a small second number (11 to 29) · across a ten
    // with a large second number (30 and more: several jumps of ten)
    else if (kind === 'plus-plain') { op = '+'; a = rng.int(12, 67); b = rng.int(11, 98 - a); if ((a % 10) + (b % 10) > 9 || a % 10 === 0 || b % 10 === 0) continue; }
    else if (kind === 'plus-cross') { op = '+'; a = rng.int(12, 85); b = rng.int(11, Math.min(29, 99 - a)); if ((a % 10) + (b % 10) < 11 || b % 10 === 0) continue; }
    else if (kind === 'plus-big') { op = '+'; a = rng.int(12, 66); b = rng.int(31, 99 - a); if ((a % 10) + (b % 10) < 11 || b % 10 === 0) continue; }
    else if (kind === 'minus-plain') { op = '-'; a = rng.int(34, 99); b = rng.int(11, a - 11); if (a % 10 <= b % 10 || b % 10 === 0) continue; }
    else if (kind === 'minus-cross') { op = '-'; a = rng.int(31, 95); b = rng.int(11, Math.min(29, a - 11)); if (a % 10 >= b % 10 || a % 10 === 0) continue; }
    else if (kind === 'minus-big') { op = '-'; a = rng.int(51, 95); b = rng.int(31, a - 11); if (a % 10 >= b % 10 || a % 10 === 0) continue; }
    else if (kind === 'two-digit') {
      op = rng.pick(['+', '-']);
      if (op === '+') { a = rng.int(12, 68); b = rng.int(11, 99 - a); if ((a % 10) + (b % 10) < 10) continue; }   // crossing a ten
      else { a = rng.int(41, 95); b = rng.int(11, a - 11); if (a % 10 >= b % 10) continue; }
    } else {
      op = rng.pick(['+', '-']);
      if (op === '+') { a = rng.int(120, 880); b = rng.int(11, 99); if ((a % 10) + (b % 10) < 10 || a + b > 999) continue; }
      else { a = rng.int(140, 980); b = rng.int(11, 99); if (a % 10 >= b % 10 || a - b < 100) continue; }
    }
    const r = op === '+' ? a + b : a - b;
    const k = a + op + b;
    if (used.has(k) || r <= 0) continue;
    // a page of ONE operation (the kinds of Year pages D): no number to start from twice
    const solo = /^(plus|minus)-/.test(kind);
    if (solo && used.has('from ' + a)) continue;
    used.add(k); if (solo) used.add('from ' + a);
    return { a, op, b, r };
  }
  throw new Error('number-line-more: no open-line problem for ' + kind);
}

/** the model jump path: within 20 the make-ten path (to the ten, then the rest); else the tens, then the ones */
function jumpPath(p) {
  const s = p.op === '+' ? 1 : -1;
  if (p.a < 20 && p.r <= 20) { const ten = 10; const first = Math.abs(ten - p.a); return [first, p.b - first].filter((x) => x > 0).map((x) => s * x); }
  const tens = Math.floor(p.b / 10) * 10, ones = p.b % 10;
  return [tens, ones].filter((x) => x > 0).map((x) => s * x);
}

/** an empty line (no ticks) with optional jump arcs; landing numbers under the line when drawn */
function openLineSvg(p, jumps, W = 600) {
  const H = 104, y = 64, x0 = 24, x1 = W - 24;
  let parts = `<line x1="8" y1="${y}" x2="${W - 8}" y2="${y}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M ${W - 18} ${y - 7} L ${W - 6} ${y} L ${W - 18} ${y + 7}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (jumps) {
    const stops = [p.a]; jumps.forEach((j) => stops.push(stops[stops.length - 1] + j));
    const lo = Math.min(...stops), hi = Math.max(...stops);
    let xs = stops.map((v) => x0 + 40 + ((v - lo) / (hi - lo)) * (x1 - x0 - 80));
    // An empty line is not to scale. Where a jump is so short beside the other that its two numbers would stand on
    // each other ("75 − 61": back 60, back 1), every jump gets room for its numbers first and the rest of the line is
    // shared out by size. Only then: a drawing whose numbers stand apart is what it was (2026-11-13).
    const MIN = 46;
    if (xs.some((x, i) => i && Math.abs(x - xs[i - 1]) < MIN)) {
      const span = x1 - x0 - 80, total = jumps.reduce((s, j) => s + Math.abs(j), 0), room = span - MIN * jumps.length;
      const dir = stops[stops.length - 1] >= stops[0] ? 1 : -1;
      let at = dir > 0 ? x0 + 40 : x0 + 40 + span;
      xs = [at].concat(jumps.map((j) => (at += dir * (MIN + (Math.abs(j) / total) * room))));
    }
    stops.forEach((v, i) => {
      parts += `<line x1="${xs[i]}" y1="${y - 9}" x2="${xs[i]}" y2="${y + 9}" stroke="${INK}" stroke-width="2.5"/>` +
        `<text x="${xs[i]}" y="${y + 32}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="20" fill="${i === stops.length - 1 ? TEAL : INK}">${v}</text>`;
    });
    jumps.forEach((j, i) => {
      const xa = xs[i], xb = xs[i + 1], mx = (xa + xb) / 2;
      parts += `<path d="M ${xa} ${y - 8} Q ${mx} ${y - 58} ${xb} ${y - 8}" fill="none" stroke="${CORAL}" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M ${xb + (xb > xa ? -8 : 8)} ${y - 18} L ${xb} ${y - 8} L ${xb + (xb > xa ? -2 : 2)} ${y - 21}" fill="none" stroke="${CORAL}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<text x="${mx}" y="${y - 40}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="18" fill="${CORAL}">${j > 0 ? '+' + j : MINUS + -j}</text>`;
    });
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-open-line="${p.a}${p.op}${p.b}" role="img" aria-label="empty number line">${parts}</svg>`;
}

/** a horizontal ticked line with HTML answer boxes laid exactly under chosen ticks (T2) */
function labelsLine({ min, step, n, printed, boxes, key }) {
  const max = min + step * n, width = 560, padX = 26;
  const text = {};
  for (let i = 0; i <= n; i++) { const v = min + i * step; text[v] = printed.includes(v) ? v : ''; }
  const nl = numberLine({ min, max, tickStep: step, labelEvery: 1, width, labelText: text });
  const xFor = (v) => padX + ((v - min) / (max - min)) * width;
  const boxEls = boxes.map((v) => `<span style="position:absolute;left:${xFor(v) - 24}px;top:40px">${answerBox({ w: 48, h: 34, answer: v })}</span>`).join('');
  return `<div data-lcs-labels-line data-lcs-min="${min}" data-lcs-step="${step}" data-lcs-n="${n}" style="position:relative;width:${nl.width}px;height:${nl.height + 8}px">${nl.svg}${boxEls}</div>`;
}

const gcd = (x, y) => (y ? gcd(y, x % y) : x);
/** a stacked fraction (numerator over a bar over the denominator) — never "3/4" text */
const stacked = (p, b, size = 30) => `<span data-lcs-frac="${p}/${b}" style="display:inline-flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-weight:700;font-size:${size}px;line-height:1.05;color:${INK}">` +
  `<span>${p}</span><span style="width:${Math.round(size * 0.9)}px;border-top:3px solid ${INK};margin:2px 0"></span><span>${b}</span></span>`;

/** a vertical line from 0 to max: ticks, labels on the left, arrows from boxes on the right (T5) */
function verticalSvg({ max, tick, labelEvery, asks, key }) {
  const W = 196, H = 600, x = 78, top = 22, bot = H - 22;
  const yFor = (v) => bot - (v / max) * (bot - top);
  let parts = `<line x1="${x}" y1="${bot + 10}" x2="${x}" y2="${top - 14}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M ${x - 7} ${top - 4} L ${x} ${top - 16} L ${x + 7} ${top - 4}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (let v = 0; v <= max; v += tick) {
    const k = Math.round(v / tick);
    const major = k % labelEvery === 0;
    parts += `<line x1="${x - (major ? 12 : 7)}" y1="${yFor(v)}" x2="${x + (major ? 12 : 7)}" y2="${yFor(v)}" stroke="${INK}" stroke-width="${major ? 2.5 : 1.8}" data-lcs-tick="${v}"/>`;
    if (major) parts += `<text x="${x - 20}" y="${yFor(v) + 7}" text-anchor="end" font-family="'Baloo 2'" font-weight="700" font-size="19" fill="${INK}" data-lcs-ticklabel="${v}">${v}</text>`;
  }
  const boxes = asks.map((v) => {
    const yy = yFor(v);
    parts += `<line x1="${x + 16}" y1="${yy}" x2="${x + 46}" y2="${yy}" stroke="${CORAL}" stroke-width="3"/>` +
      `<path d="M ${x + 26} ${yy - 7} L ${x + 15} ${yy} L ${x + 26} ${yy + 7}" fill="none" stroke="${CORAL}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    return `<span style="position:absolute;left:${x + 50}px;top:${yy - 20}px">${answerBox({ w: 58, h: 40, answer: v })}</span>`;
  }).join('');
  void key;
  return `<div data-lcs-vline data-lcs-max="${max}" data-lcs-asks="${asks.join(',')}" style="position:relative;width:${W}px;height:${H}px"><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="vertical number line 0 to ${max}">${parts}</svg>${boxes}</div>`;
}

function makeLineMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'numeral-charts',
    exerciseType: 'number-lines',
    themeAxis: { applicable: false },
    difficulty: cfg.levels || LEVELS[mode],   // a face of one operation brings its own levels (Year pages D, 2026-11-13)
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const used = new Set();
      const sample = (html) => (key ? `<div data-lcs-key-sample="1">${html}</div>` : html);
      const content = (inner) => `<div data-ws-content data-lcs-line-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'open') {
        const ps = Array.from({ length: d.cards }, () => openProblem(rng, d.kind, used));
        const cards = ps.map((p, i) => {
          const worked = d.model && i === 0;
          const eq = `<div style="display:flex;align-items:center;gap:12px">${T(p.a)}${T(p.op === '+' ? '+' : MINUS, 30, CORAL)}${T(p.b)}${T('=', 30, CORAL)}` +
            (worked ? `<span class="ws-answerbox" style="width:84px;height:56px;display:inline-flex;align-items:center;justify-content:center" data-lcs-given="${p.r}">${T(p.r, 30, TEAL)}</span>` : answerBox({ w: 84, h: 56, answer: p.r })) + `</div>`;
          const line = worked ? openLineSvg(p, jumpPath(p)) : (key ? sample(openLineSvg(p, jumpPath(p))) : openLineSvg(p, null));
          return `<div class="ws-card-stage" style="flex-direction:column;align-items:center;justify-content:center;gap:4px" data-lcs-sum="${p.a}${p.op}${p.b}=${p.r}">${eq}${line}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: ps.map((p) => p.a + p.op + p.b) } };
      }

      if (mode === 'bridge') {
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 600; t++) {
          const op = d.ops.length > 1 && ps.length % 2 === 1 ? '-' : d.ops[0];   // + and − take turns where both are asked
          let a, b;
          if (d.within === 20) {
            if (op === '+') { a = rng.int(6, 9); b = rng.int(11 - a, 9); }
            else { a = rng.int(11, 17); b = rng.int(a - 9, 9); if (b <= a - 10) continue; }
          } else {
            if (op === '+') { a = rng.int(21, 88); b = rng.int(2, 9); if ((a % 10) + b < 11 || a % 10 === 0) continue; }
            else { a = rng.int(31, 97); b = rng.int(2, 9); if ((a % 10) >= b || a % 10 === 0) continue; }
          }
          const r = op === '+' ? a + b : a - b;
          const ten = op === '+' ? Math.ceil(a / 10) * 10 : Math.floor(a / 10) * 10;
          const first = Math.abs(ten - a), rest = b - first;
          if (first <= 0 || rest <= 0) continue;
          if (used.has(a + op + b)) continue;
          // a face of one operation within 20 has seven numbers to start from: no start twice on a page (d.distinct)
          if (d.distinct && ps.some((q) => q.a === a)) continue;
          used.add(a + op + b);
          ps.push({ a, op, b, r, ten, first, rest });
        }
        if (ps.length < d.cards) throw new Error('number-line-more: no bridge problems');
        const cards = ps.map((p, i) => {
          const worked = d.model && i === 0;
          const box = (ans, w) => (worked ? `<span class="ws-answerbox" style="width:${w}px;height:50px;display:inline-flex;align-items:center;justify-content:center" data-lcs-answer="${ans}" data-lcs-given="1">${T(ans, 28, TEAL)}</span>` : answerBox({ w, h: 50, answer: ans }));
          const min = Math.floor(Math.min(p.a, p.r) / 10) * 10, max = min + 20;
          const sgn = p.op === '+' ? '+' : MINUS;
          const nl = numberLine({ min, max, tickStep: 1, labelEvery: d.labelEvery || 5, width: 560, marks: [p.a],
            jumps: key || worked ? [{ from: p.a, to: p.ten, step: p.first }, { from: p.ten, to: p.r, step: p.rest }] : [{ from: p.a, to: p.a }] });
          const eq = `<div style="display:flex;align-items:center;gap:9px;flex-wrap:nowrap">${T(p.a, 28)}${T(sgn, 28, CORAL)}${T(p.b, 28)}${T('=', 28, CORAL)}${T(p.a, 28)}${T(sgn, 28, CORAL)}` +
            box(p.first, 56) + T(sgn, 28, CORAL) + box(p.rest, 56) + T('=', 28, CORAL) + box(p.r, 66) + `</div>`;
          return `<div class="ws-card-stage" style="flex-direction:column;align-items:center;justify-content:center;gap:2px" data-lcs-bridge="${p.a}${p.op}${p.b}" data-lcs-ten="${p.ten}">${eq}${key && !worked ? sample(nl.svg) : nl.svg}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: ps.map((p) => p.a + p.op + p.b) } };
      }

      if (mode === 'labels') {
        const order = rng.shuffle(d.steps.slice());
        const lines = [];
        for (let i = 0; i < d.lines; i++) {
          const step = order[i % order.length], n = 10;
          const starts = d.starts.filter((s) => s % step === 0 || step < 10);
          let min = rng.pick(starts);
          if (min + step * n > 1000) min = 0;
          const vals = Array.from({ length: n + 1 }, (_, k) => min + k * step);
          const inner = vals.slice(1, -1);
          // never a box on two neighbouring ticks (two touching boxes read as one, and a 3-digit answer needs room)
          let extra = [], boxes = [];
          for (let t = 0; t < 200 && boxes.length < d.boxes; t++) {
            extra = rng.sample(inner, d.printed); boxes = [];
            for (const v of rng.shuffle(inner.filter((u) => !extra.includes(u)))) {
              if (boxes.length >= d.boxes) break;
              if (!boxes.some((u) => Math.abs(u - v) === step)) boxes.push(v);
            }
          }
          if (boxes.length < d.boxes) throw new Error('number-line-more: no box places');
          boxes.sort((a, b) => a - b);
          const printed = [vals[0], vals[n], ...extra];
          lines.push({ min, step, n, printed, boxes });
        }
        const cards = lines.map((l) => `<div class="ws-card-stage" style="justify-content:center;align-items:center">${labelsLine({ ...l, key })}</div>`);
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.lines })), meta: { items: lines.map((l) => `${l.min}:${l.step}:${l.boxes.join('.')}`) } };
      }

      if (mode === 'vertical') {
        const cols = [];
        for (let c = 0; c < d.cols; c++) {
          const ticks = []; for (let v = d.tick; v < d.max; v += d.tick) if (Math.round(v / d.tick) % d.labelEvery !== 0) ticks.push(v);
          let asks = [];
          for (let t = 0; t < 200; t++) { asks = rng.sample(ticks, d.arrows).sort((a, b) => a - b); if (asks.every((v, k) => !k || v - asks[k - 1] >= 3 * d.tick)) break; }
          cols.push(asks);
        }
        const body = `<div style="flex:1;display:flex;justify-content:space-around;align-items:center">` +
          cols.map((asks) => `<div class="ws-card-stage" style="flex:0 0 auto;padding:10px 8px">${verticalSvg({ max: d.max, tick: d.tick, labelEvery: d.labelEvery, asks, key })}</div>`).join('') + `</div>`;
        return { bodyHtml: content(body), meta: { items: cols.map((a) => a.join('.')) } };
      }

      if (mode === 'fraction') {
        const fr = [];
        for (let t = 0; fr.length < d.lines && t < 600; t++) {
          const b = d.dens[fr.length % d.dens.length === 0 ? rng.int(0, d.dens.length - 1) : rng.int(0, d.dens.length - 1)];
          const p = d.unit ? 1 : d.max === 2 && fr.length % 2 === 0 ? rng.int(b + 1, 2 * b - 1) : rng.int(1, b - 1);
          if (fr.some((f) => f.p === p && f.b === b)) continue;
          // a face where the child WRITES the fraction (Year pages I): never a dot with two names (2/4 is also 1/2)
          if (d.write && !d.unit && gcd(p, b) !== 1) continue;
          fr.push({ p, b });
        }
        if (fr.length < d.lines) throw new Error('number-line-more: not enough fractions for ' + d.lines + ' lines');
        const cards = fr.map((f) => {
          const labelText = { 0: '0', 1: '1', 2: '2' };
          if (d.write) {
            // the dot is printed on the line; the child writes its fraction into two boxes, one over the other
            const wl = numberLine({ min: 0, max: d.max, tickStep: 1 / f.b, labelEvery: f.b, width: 440, labelText, marks: [f.p / f.b], tickH: 24, markR: 5.5 });   // the tick shows above and below its dot
            const boxes = `<span data-lcs-write="${f.p}/${f.b}" style="display:inline-flex;flex-direction:column;align-items:center;gap:4px">${answerBox({ w: 56, h: 46, answer: f.p })}<span style="width:60px;border-top:3px solid ${INK}"></span>${answerBox({ w: 56, h: 46, answer: f.b })}</span>`;
            return `<div class="ws-card-stage" style="justify-content:center;align-items:center;gap:26px" data-lcs-fraction="${f.p}/${f.b}">${wl.svg}${boxes}</div>`;
          }
          const nl = numberLine({ min: 0, max: d.max, tickStep: 1 / f.b, labelEvery: f.b, width: 480, labelText, rings: key ? [f.p / f.b] : [], ...(ctx.screen ? { tickBoxes: { rings: [f.p / f.b] } } : {}) });
          return `<div class="ws-card-stage" style="justify-content:center;align-items:center;gap:26px" data-lcs-fraction="${f.p}/${f.b}">${stacked(f.p, f.b)}${key ? sample(nl.svg) : nl.svg}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.lines })), meta: { items: fr.map((f) => f.p + '/' + f.b) } };
      }

      // strip: desk number lines to cut out (material)
      const strips = d.strips.map(([lo, hi]) => {
        const n = hi - lo, W = 640, padX = 28, sp = (W - 2 * padX) / n, y = 34;
        const size = Math.round(Math.min(32, sp * 0.62));
        let svg = `<line x1="6" y1="${y}" x2="${W - 6}" y2="${y}" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>` +
          `<path d="M ${W - 16} ${y - 7} L ${W - 5} ${y} L ${W - 16} ${y + 7}" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        for (let v = lo; v <= hi; v++) {
          const x = padX + (v - lo) * sp, ten = v % 10 === 0;
          svg += `<line x1="${x}" y1="${y - (ten ? 14 : 9)}" x2="${x}" y2="${y + (ten ? 14 : 9)}" stroke="${INK}" stroke-width="${ten ? 3 : 2}"/>` +
            `<text x="${x}" y="${y + 24 + size * 0.8}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="${size}" fill="${ten ? CORAL : INK}" data-lcs-ticklabel="${v}">${v}</text>`;
        }
        const H = Math.round(y + 34 + size);
        return `<div data-lcs-strip="${lo}-${hi}" style="flex:0 0 auto;display:flex;align-items:center;justify-content:center;padding:8px 0;border:2.5px dashed ${GRID};border-radius:6px;background:#FFFFFF"><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="number line ${lo} to ${hi}">${svg}</svg></div>`;
      });
      return {
        bodyHtml: content(`<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${strips.join('')}</div>`),
        meta: { items: d.strips.map((s) => s.join('-')) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const mode = (document.querySelector('[data-lcs-line-mode]') || {}).dataset;
        if (!mode) return ['no content'];
        const m = mode.lcsLineMode;
        const n = (s) => Number(s);
        if (m === 'open') document.querySelectorAll('[data-lcs-sum]').forEach((c) => {
          const [, a, op, b, r] = c.dataset.lcsSum.match(/^(\d+)([+-])(\d+)=(\d+)$/);
          if ((op === '+' ? n(a) + n(b) : n(a) - n(b)) !== n(r)) fails.push('sum wrong ' + c.dataset.lcsSum);
          const box = c.querySelector('[data-lcs-answer]'); if (box && box.dataset.lcsAnswer !== r) fails.push('box answer');
          if (n(r) <= 0) fails.push('result not positive');
        });
        if (m === 'bridge') document.querySelectorAll('[data-lcs-bridge]').forEach((c) => {
          const [, a, op, b] = c.dataset.lcsBridge.match(/^(\d+)([+-])(\d+)$/);
          const ten = n(c.dataset.lcsTen), boxes = [...c.querySelectorAll('[data-lcs-answer]')].map((e) => n(e.dataset.lcsAnswer));
          const r = op === '+' ? n(a) + n(b) : n(a) - n(b);
          if (boxes.length !== 3 || boxes[0] + boxes[1] !== n(b) || boxes[2] !== r) fails.push('bridge boxes ' + c.dataset.lcsBridge);
          if (ten % 10 !== 0 || (op === '+' ? n(a) + boxes[0] : n(a) - boxes[0]) !== ten) fails.push('first jump does not reach the ten');
        });
        if (m === 'labels') document.querySelectorAll('[data-lcs-labels-line]').forEach((l, i) => {
          const min = n(l.dataset.lcsMin), step = n(l.dataset.lcsStep), cnt = n(l.dataset.lcsN);
          const ticks = [...l.querySelectorAll('[data-lcs-tick]')].length;
          if (ticks !== cnt + 1) fails.push(`line ${i + 1}: ${ticks} ticks`);
          const printed = [...l.querySelectorAll('[data-lcs-ticklabel]')].filter((e) => e.textContent.trim()).map((e) => n(e.textContent));
          if (!printed.includes(min) || !printed.includes(min + cnt * step)) fails.push(`line ${i + 1}: an end is not printed`);
          l.querySelectorAll('[data-lcs-answer]').forEach((b) => { const v = n(b.dataset.lcsAnswer); if ((v - min) % step || printed.includes(v)) fails.push(`line ${i + 1}: box ${v}`); });
        });
        if (m === 'fraction') document.querySelectorAll('[data-lcs-fraction]').forEach((c) => {
          const [p, b] = c.dataset.lcsFraction.split('/').map(Number);
          const ticks = c.querySelectorAll('[data-lcs-tick]').length;
          const max = n(c.querySelector('[data-lcs-prim="number-line"]').dataset.lcsMax);
          if (ticks !== max * b + 1) fails.push(`fraction ${p}/${b}: ${ticks} ticks`);
          if (p <= 0 || p >= max * b || p === b) fails.push(`fraction ${p}/${b} out of range`);
          const wr = c.querySelector('[data-lcs-write]');
          if (wr) {
            const ans = [...wr.querySelectorAll('[data-lcs-answer]')].map((x) => n(x.dataset.lcsAnswer));
            if (ans.join('/') !== p + '/' + b) fails.push(`fraction ${p}/${b}: the boxes hold ${ans.join('/')}`);
            if (c.querySelectorAll('[data-lcs-frac]').length) fails.push(`fraction ${p}/${b}: the answer is printed beside the line`);
            const g = (x, y) => (y ? g(y, x % y) : x); if (g(p, b) !== 1) fails.push(`fraction ${p}/${b} has a second name`);
          }
        });
        return fails;
      });
    },
  };
}

module.exports = { makeLineMoreType, openProblem, jumpPath, LEVELS };
