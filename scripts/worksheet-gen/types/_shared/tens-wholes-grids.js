/**
 * Three pages of the year designs (Year pages W, 2026-11-14; Daily Teaching System Part 12.2; Grades 2-3):
 *   times-tens       G3-491 Multiply by Tens — a one-digit number times a whole ten (4 × 60), thought of as tens:
 *                    4 × 6 tens = 24 tens = 240. Level 1 six pictures of ten-rods in equal groups with the lines
 *                    "4 × 6 tens = _ tens" and "4 × 60 = _" · level 2 eight cards with the fact, the tens sentence and the tens
 *                    partner (3 × 7 = _, 3 × 7 tens = _ tens, 3 × 70 = _) · level 3 twelve equations with no help, the
 *                    ten first in half of them (70 × 3). One factor 2 to 9, the other a whole ten 20 to 90. 3.NBT.A.3.
 *   whole-fractions  G3-492 Whole Numbers as Fractions — level 1 six cards with one, two or three whole shapes, every
 *                    part shaded: the child counts the parts and writes 8/4 = 2 · level 2 four number lines marked in
 *                    equal parts with the whole numbers above: the child writes the fraction under each whole number ·
 *                    level 3 twelve equations (6/6 = _, 3 = _/1, 2 = _/4, _/3 = 2). Denominators 1, 2, 3, 4, 6, 8.
 *                    3.NF.A.3.c.
 *   rows-columns     G2-515 Rows and Columns of Squares — a rectangle the child cuts into rows and columns of same-size
 *                    squares with a ruler, then "_ rows, _ columns" and the count. Level 1 one row and one column of
 *                    squares are drawn, the child finishes the grid and counts · level 2 only marks on all four sides,
 *                    and the squares are counted by rows as an addition (4 + 4 + 4 = 12) · level 3 marks on two sides
 *                    only, up to 4 rows and 5 columns. No multiplication sign. 2.G.A.2.
 * Words: "tens" as on the place-value pages (regroup-more.js WORDS); rows / columns / squares were read by a native
 * reader (2026-11-14). No theme: a copy is a new draw of the numbers. Printed page only.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const fractionShape = require('../../primitives/fraction.js');
const { mulGlyph } = require('./notation.js');
const { WORDS: PV } = require('./regroup-more.js');

const C = tokens.color, INK = C.ink, TEAL = C.teal, CORAL = C.coral;
const loc2 = (l) => String(l || 'en').slice(0, 2);
// the count words after a written number (2 to 25): "_ rows", "_ columns", "_ squares"
const GRID_WORDS = {
  en: { rows: 'rows', cols: 'columns', squares: 'squares' },
  de: { rows: 'Reihen', cols: 'Spalten', squares: 'Quadrate' },
  es: { rows: 'filas', cols: 'columnas', squares: 'cuadrados' },
  pt: { rows: 'linhas', cols: 'colunas', squares: 'quadrados' },
  fr: { rows: 'lignes', cols: 'colonnes', squares: 'carrés' },
  it: { rows: 'righe', cols: 'colonne', squares: 'quadrati' },
  nl: { rows: 'rijen', cols: 'kolommen', squares: 'vierkanten' },
  sv: { rows: 'rader', cols: 'kolumner', squares: 'rutor' },
  da: { rows: 'rækker', cols: 'kolonner', squares: 'kvadrater' },
  no: { rows: 'rader', cols: 'kolonner', squares: 'kvadrater' },
  fi: { rows: 'riviä', cols: 'saraketta', squares: 'neliötä' },
};

const LEVELS = {
  'times-tens': {
    1: { cards: 6, cols: 2, kind: 'rods' },
    2: { cards: 8, cols: 2, kind: 'trio' },
    3: { cards: 12, cols: 3, kind: 'plain' },
  },
  'whole-fractions': {
    1: { cards: 6, cols: 2, kind: 'shapes' },
    2: { cards: 4, cols: 1, kind: 'lines' },
    3: { cards: 12, cols: 3, kind: 'equations' },
  },
  'rows-columns': {
    1: { cards: 4, cols: 2, max: 4, start: true, add: false, sides: 4 },
    2: { cards: 4, cols: 2, max: 5, start: false, add: true, sides: 4 },
    3: { cards: 4, cols: 2, max: 5, start: false, add: true, sides: 2 },
  },
};

const NUM = (s, size = 26, color = INK) => `<span style="font:700 ${size}px/1 'Baloo 2',cursive;color:${color};white-space:nowrap">${s}</span>`;
const WORD = (s, size = 16) => `<span style="font:700 ${size}px/1.2 'Nunito',sans-serif;color:${INK};white-space:nowrap">${s}</span>`;
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** a groups of b ten-rods: every group in its own frame, every rod with its ten cubes marked */
function rodGroups(a, b) {
  const RW = 9, RH = 70, GAP = 3, PAD = 6, GW = b * RW + (b - 1) * GAP + 2 * PAD, GG = 7, W = a * GW + (a - 1) * GG, H = RH + 2 * PAD;
  let s = '';
  for (let g = 0; g < a; g++) {
    const gx = g * (GW + GG);
    s += `<rect x="${gx + 1}" y="1" width="${GW - 2}" height="${H - 2}" rx="7" fill="#FFFFFF" stroke="${TEAL}" stroke-width="2" data-lcs-group="1"/>`;
    for (let k = 0; k < b; k++) {
      const x = gx + PAD + k * (RW + GAP);
      s += `<rect x="${x}" y="${PAD}" width="${RW}" height="${RH}" fill="#DDEBE8" stroke="${INK}" stroke-width="1.4" data-lcs-rod="1"/>`;
      for (let c = 1; c < 10; c++) s += `<line x1="${x}" y1="${PAD + c * RH / 10}" x2="${x + RW}" y2="${PAD + c * RH / 10}" stroke="${INK}" stroke-width="0.8"/>`;
    }
  }
  return { svg: `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;flex:0 0 auto" data-lcs-rods="${a}x${b}">${s}</svg>`, W };
}

/** a rectangle to cut into r rows and c columns of squares of u px: marks on its sides, or one row and one column drawn */
function gridRect(r, c, u, { start, sides, key }) {
  const M = 12, W = c * u + 2 * M, H = r * u + 2 * M, x0 = M, y0 = M;
  let s = `<rect x="${x0}" y="${y0}" width="${c * u}" height="${r * u}" fill="#FFFFFF" stroke="${INK}" stroke-width="3" data-lcs-rect="1"/>`;
  const tick = (x1, y1, x2, y2, side) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" data-lcs-tick="${side}"/>`;
  for (let k = 1; k < c; k++) { s += tick(x0 + k * u, y0 - 8, x0 + k * u, y0 + 6, 'top'); if (sides === 4) s += tick(x0 + k * u, y0 + r * u - 6, x0 + k * u, y0 + r * u + 8, 'bottom'); }
  for (let k = 1; k < r; k++) { s += tick(x0 - 8, y0 + k * u, x0 + 6, y0 + k * u, 'left'); if (sides === 4) s += tick(x0 + c * u - 6, y0 + k * u, x0 + c * u + 8, y0 + k * u, 'right'); }
  if (start) {   // the first row and the first column of squares
    s += `<line x1="${x0}" y1="${y0 + u}" x2="${x0 + c * u}" y2="${y0 + u}" stroke="${TEAL}" stroke-width="2.4" data-lcs-given="row"/>`;
    s += `<line x1="${x0 + u}" y1="${y0}" x2="${x0 + u}" y2="${y0 + r * u}" stroke="${TEAL}" stroke-width="2.4" data-lcs-given="col"/>`;
    for (let k = 2; k < c; k++) s += `<line x1="${x0 + k * u}" y1="${y0}" x2="${x0 + k * u}" y2="${y0 + u}" stroke="${TEAL}" stroke-width="2.4" data-lcs-given="cell"/>`;
    for (let k = 2; k < r; k++) s += `<line x1="${x0}" y1="${y0 + k * u}" x2="${x0 + u}" y2="${y0 + k * u}" stroke="${TEAL}" stroke-width="2.4" data-lcs-given="cell"/>`;
  }
  if (key) {
    for (let k = 1; k < c; k++) s += `<line x1="${x0 + k * u}" y1="${y0}" x2="${x0 + k * u}" y2="${y0 + r * u}" stroke="${CORAL}" stroke-width="2" data-lcs-key-sample="1"/>`;
    for (let k = 1; k < r; k++) s += `<line x1="${x0}" y1="${y0 + k * u}" x2="${x0 + c * u}" y2="${y0 + k * u}" stroke="${CORAL}" stroke-width="2" data-lcs-key-sample="1"/>`;
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;flex:0 0 auto" data-lcs-grid="${r}x${c}x${u}">${s}</svg>`;
}

/** one whole rectangle (a bar, or a square) with every part shaded: ONE outline, the parts marked by lines inside.
 *  (The fraction primitive draws each part as a tile of its own with a gap: a bar in two halves then reads as two
 *  wholes. Native and teaching review, 2026-11-14.) */
function wholeRect(shape, den, size) {
  const grid = shape === 'bar' ? [den, 1] : ({ 2: [2, 1], 3: [3, 1], 4: [2, 2], 6: [3, 2], 8: [4, 2] })[den];
  const W = shape === 'bar' ? Math.round(size * 1.5) : size, H = shape === 'bar' ? Math.round(size * 0.44) : size, M = 2;
  const cw = (W - 2 * M) / grid[0], ch = (H - 2 * M) / grid[1];
  let s = '';
  for (let r = 0; r < grid[1]; r++) for (let c = 0; c < grid[0]; c++) s += `<rect x="${(M + c * cw).toFixed(2)}" y="${(M + r * ch).toFixed(2)}" width="${cw.toFixed(2)}" height="${ch.toFixed(2)}" fill="${C.tealSoft}" stroke="${TEAL}" stroke-width="2" data-lcs-part="1" data-lcs-shaded="1"/>`;
  s += `<rect x="${M}" y="${M}" width="${W - 2 * M}" height="${H - 2 * M}" rx="3" fill="none" stroke="${TEAL}" stroke-width="3.5" data-lcs-whole-outline="1"/>`;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block" data-lcs-wholerect="${shape}:${den}">${s}</svg>`;
}

function makeTensWholesGridsType({ id, slug, mode, gradeBand, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error(`${id}: unknown mode ${mode}`);
  return {
    id, slug, gradeBand, assetClass: 'none',
    exerciseType: mode === 'times-tens' ? 'multiplication-tables' : mode === 'whole-fractions' ? 'fractions' : 'arrays-multiplication',
    themeAxis: { applicable: false },
    interactive: false,
    difficulty: D,
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng, L = loc2(args.locale);
      const mark = !!(ctx && (ctx.answerKey || ctx.screen));
      const box = (v, w = 54, h = 40) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;flex:0 0 auto;vertical-align:middle;width:${w}px;height:${h}px;box-sizing:border-box;border:2.5px dashed ${CORAL};border-radius:9px;background:#FFFFFF"></span>`;
      const bar = (w) => `<span style="width:${w}px;height:3px;background:${INK};border-radius:2px"></span>`;
      /** a stacked fraction; a part given as null is a box to write in */
      const frac = (a, b, ansA, ansB, size = 26) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:3px;flex:0 0 auto" data-lcs-frac="${ansA}/${ansB}">` +
        (a == null ? box(ansA, 46, 36) : `<span style="height:${size + 4}px;display:flex;align-items:center">${NUM(a, size)}</span>`) + bar(a == null || b == null ? 46 : size + 6) +
        (b == null ? box(ansB, 46, 36) : `<span style="height:${size + 4}px;display:flex;align-items:center">${NUM(b, size)}</span>`) + `</span>`;
      const line = (inner, gap = 7) => `<div style="flex:0 0 auto;display:flex;align-items:center;justify-content:center;gap:${gap}px;flex-wrap:nowrap" data-lcs-line>${inner}</div>`;
      let cards, items;

      if (mode === 'times-tens') {
        const X = mulGlyph(L), Wd = PV[L];
        if (!Wd) throw new Error(`${id}: no words for ${L}`);
        let facts = [];
        for (let round = 0; round < 60 && facts.length < d.cards; round++) {   // (a draw that paints itself into a corner starts again)
          const seen = new Set(); facts = [];
          for (let i = 0; i < d.cards; i++) {
            for (let t = 0; t < 300; t++) {
              let a, b;
              if (d.kind === 'rods') { a = rng.int(2, 5); b = rng.int(2, 5); if (rodGroups(a, b).W > 286) continue; }   // the picture fits its card
              else { a = rng.int(2, 9); b = rng.int(2, 9); if (lv === 3 && i % 2 === 0 && Math.max(a, b) < 6) continue; }   // the harder page leans on the facts past 5
              if (seen.has(a + 'x' + b) || (a === b && facts.some((f) => f.a === f.b))) continue;
              if (facts.filter((f) => f.a === a).length >= 2 || facts.filter((f) => f.b === b).length >= 2) continue;
              // a fact and its turned twin (4 × 3, 3 × 4): once a page at most on the rod page (two different pictures), never on the trio page
              if (seen.has(b + 'x' + a) && (d.kind === 'trio' || (d.kind === 'rods' && facts.some((f) => seen.has(f.b + 'x' + f.a) && f.a !== f.b)))) continue;
              seen.add(a + 'x' + b); facts.push({ a, b, tenFirst: false }); break;
            }
          }
        }
        if (facts.length < d.cards) throw new Error(`${id}: no ${d.cards} facts`);
        if (d.kind === 'plain') { const first = new Set(rng.sample(facts.map((_, i) => i), 6)); facts.forEach((f, i) => { f.tenFirst = first.has(i); }); }
        const tensLine = (f, size = 22) => line(`${NUM(`${f.a} ${X} ${f.b}`, size)}${WORD(Wd.tens)}${NUM('=', size)}${box(f.a * f.b, 50, 36)}${WORD(Wd.tens)}`, 6);
        const partner = (f, size = 24) => line(`${NUM(`${f.a} ${X} ${f.b * 10} =`, size)}${box(f.a * f.b * 10, 70, 36)}`);
        cards = facts.map((f) => {
          const stamp = ` data-lcs-timestens="${f.a}|${f.b}|${f.tenFirst ? 1 : 0}"`;
          if (d.kind === 'rods') return `<div class="ws-card-stage" style="flex-direction:column;justify-content:space-evenly;align-items:center;gap:6px;padding:0 2px"${stamp}>${rodGroups(f.a, f.b).svg}${tensLine(f)}${partner(f)}</div>`;
          if (d.kind === 'trio') return `<div class="ws-card-stage" style="flex-direction:column;justify-content:space-evenly;align-items:center;gap:4px;padding:0 2px"${stamp}>` +
            line(`${NUM(`${f.a} ${X} ${f.b} =`, 24)}${box(f.a * f.b, 62, 36)}`) + tensLine(f, 21) + partner(f) + `</div>`;
          return `<div class="ws-card-stage" style="justify-content:center;align-items:center;gap:8px;padding:0 2px"${stamp}>${NUM(f.tenFirst ? `${f.b * 10} ${X} ${f.a} =` : `${f.a} ${X} ${f.b * 10} =`, 26)}${box(f.a * f.b * 10, 72, 42)}</div>`;
        });
        items = facts.map((f) => `${f.a}x${f.b * 10}`);
      } else if (mode === 'whole-fractions') {
        if (d.kind === 'shapes') {
          // one, two or three whole shapes; every part is shaded. Two cards of each number of wholes.
          const wholes = shuffle([1, 1, 2, 2, 3, 3], rng), seen = new Set(), ps = [];
          for (const n of wholes) {
            for (let t = 0; t < 400; t++) {
              // three kinds of shape. A bar stands alone: two bars side by side leave the card, and two bars one above
              // the other read as ONE rectangle cut into twice the parts (6/6, not 6/3)
              const den = rng.pick([2, 3, 4, 6, 8]), shape = rng.pick(n > 1 ? ['circle', 'square'] : ['circle', 'bar', 'square']);
              if (seen.has(n + '/' + den) || ps.filter((p) => p.den === den).length >= 2) continue;
              if (ps.filter((p) => p.shape === shape).length >= 3) continue;
              if (shape === 'square' && n === 3 && den === 8) continue;   // (three squares of eight parts: 24 small cells in a row)
              seen.add(n + '/' + den); ps.push({ n, den, shape }); break;
            }
          }
          if (ps.length < 6) throw new Error(`${id}: no six shape cards`);
          cards = ps.map((p) => {
            const size = p.shape === 'bar' ? 136 : p.n === 3 ? 84 : 96;
            const pics = Array.from({ length: p.n }, () => `<span data-lcs-whole style="display:inline-flex;flex:0 0 auto">${p.shape === 'circle' ? fractionShape({ shape: 'circle', d: p.den, shaded: p.den, size }, ctx).svg : wholeRect(p.shape, p.den, size)}</span>`).join('');
            return `<div class="ws-card-stage" style="flex-direction:column;justify-content:space-evenly;align-items:center;gap:6px;padding:0 2px" data-lcs-wholeshape="${p.n}|${p.den}">` +
              `<div style="display:flex;align-items:center;justify-content:center;gap:${p.n === 3 ? 12 : 16}px">${pics}</div>${line(`${frac(null, p.den, p.n * p.den, p.den)}${NUM('=', 26)}${box(p.n, 54, 44)}`, 10)}</div>`;
          });
          items = ps.map((p) => `${p.n * p.den}/${p.den}`);
        } else if (d.kind === 'lines') {
          // four number lines from 0, each marked in equal parts; the whole numbers stand above, the child writes the
          // fraction under each of them. One line shows its first part as a help (1/d under the first mark).
          const dens = shuffle(rng.sample([2, 3, 4, 6, 8], 4), rng);
          const ls = dens.map((den) => ({ den, top: den >= 6 ? 2 : den === 4 ? rng.pick([2, 3, 4]) : rng.pick([3, 4]) }));
          cards = ls.map((ln) => {
            const W = 640, X0 = 34, span = W - 2 * X0, n = ln.den * ln.top, step = span / n, Y = 44;
            let s = `<line x1="${X0}" y1="${Y}" x2="${X0 + span}" y2="${Y}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
            for (let k = 0; k <= n; k++) { const whole = k % ln.den === 0, x = X0 + k * step; s += `<line x1="${x}" y1="${Y - (whole ? 13 : 8)}" x2="${x}" y2="${Y + (whole ? 13 : 8)}" stroke="${INK}" stroke-width="${whole ? 3 : 2}" data-lcs-mark="${whole ? 'whole' : 'part'}"/>`; if (whole) s += `<text x="${x}" y="${Y - 20}" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="24" fill="${TEAL}" data-lcs-whole-number="${k / ln.den}">${k / ln.den}</text>`; }
            const under = Array.from({ length: ln.top }, (_, i) => { const k = i + 1, x = X0 + k * ln.den * step; return `<span style="position:absolute;left:${x - 23}px;top:${Y + 18}px">${frac(null, ln.den, k * ln.den, ln.den, 24)}</span>`; }).join('');
            const help = `<span style="position:absolute;left:${X0 + step - 14}px;top:${Y + 18}px" data-lcs-help>${frac(1, ln.den, 1, ln.den, 20)}</span>`;
            return `<div class="ws-card-stage" style="justify-content:center;align-items:center" data-lcs-wholeline="${ln.den}|${ln.top}"><div style="position:relative;width:${W}px;height:${Y + 18 + 78}px;flex:0 0 auto"><svg width="${W}" height="${Y + 16}" viewBox="0 0 ${W} ${Y + 16}" style="position:absolute;left:0;top:0">${s}</svg>${step >= 30 ? help : ''}${under}</div></div>`;
          });
          items = ls.map((x) => `${x.den}:${x.top}`);
        } else {
          // twelve equations, three of each kind: d/d = _ and kd/d = _ · k = _/1 and k/1 = _ · k = _/d · _/d = k
          const seen = new Set(), eqs = [];
          const kinds = shuffle(['value', 'value', 'value', 'one', 'one', 'one', 'num-right', 'num-right', 'num-right', 'num-left', 'num-left', 'num-left'], rng);
          for (const kind of kinds) {
            for (let t = 0; t < 600; t++) {
              const den = kind === 'one' ? 1 : rng.pick([2, 3, 4, 6, 8]), k = kind === 'one' ? rng.int(2, 9) : rng.int(1, den >= 6 ? 3 : 4), sub = kind === 'one' ? rng.pick(['a', 'b']) : '';
              const key = kind === 'one' ? 'one' + k : k + '/' + den;
              if (seen.has(key) || k * den > 24) continue;
              if (kind !== 'one' && k === 1 && eqs.filter((e) => e.k === 1 && e.den > 1).length >= 2) continue;   // d/d = 1 at most twice
              if (kind !== 'one' && eqs.filter((e) => e.den === den).length >= 3) continue;
              seen.add(key); eqs.push({ kind, den, k, sub }); break;
            }
          }
          if (eqs.length < 12) throw new Error(`${id}: no twelve equations`);
          cards = eqs.map((e) => {
            const n = e.k * e.den, EQS = NUM('=', 26);
            const inner = e.kind === 'value' ? `${frac(n, e.den, n, e.den)}${EQS}${box(e.k, 54, 44)}`
              : e.kind === 'one' ? (e.sub === 'a' ? `${NUM(e.k, 28)}${EQS}${frac(null, 1, e.k, 1)}` : `${frac(e.k, 1, e.k, 1)}${EQS}${box(e.k, 54, 44)}`)
                : e.kind === 'num-right' ? `${NUM(e.k, 28)}${EQS}${frac(null, e.den, n, e.den)}` : `${frac(null, e.den, n, e.den)}${EQS}${NUM(e.k, 28)}`;
            return `<div class="ws-card-stage" style="justify-content:center;align-items:center;gap:10px;padding:0 2px" data-lcs-wholeeq="${e.kind}|${e.k}|${e.den}">${inner}</div>`;
          });
          items = eqs.map((e) => `${e.kind}:${e.k}/${e.den}`);
        }
      } else {
        const Wd = GRID_WORDS[L];
        if (!Wd) throw new Error(`${id}: no words for ${L}`);
        const seen = new Set(), rs = [];
        for (let i = 0; i < d.cards; i++) {
          for (let t = 0; t < 600; t++) {
            // (the addition of equal rows has room for four numbers: with it, 5 is reached by the columns)
            const r = rng.int(2, d.add ? 4 : d.max), c = rng.int(2, d.max);
            if (seen.has(r + 'x' + c) || seen.has(c + 'x' + r) || rs.some((q) => q.r * q.c === r * c)) continue;
            if (r === c && rs.some((q) => q.r === q.c)) continue;                // one square shape a page at most
            if (lv > 1 && i === 0 && c < d.max) continue;                        // the two harder pages reach 5
            if (r * c < 6) continue;                                             // (2 by 2 is drawn with one line each way)
            seen.add(r + 'x' + c); rs.push({ r, c }); break;
          }
        }
        if (rs.length < d.cards) throw new Error(`${id}: no ${d.cards} rectangles`);
        if (lv > 1) rs.splice(0, rs.length, ...shuffle(rs, rng));
        cards = rs.map((q) => {
          const u = Math.min(56, Math.floor((d.add ? 196 : 222) / q.r), Math.floor(276 / q.c));
          const bw = 32;
          const count = d.add
            ? line(Array.from({ length: q.r }, () => box(q.c, bw, 34)).join(NUM('+', 20)) + NUM('=', 20) + box(q.r * q.c, 42, 34) + WORD(Wd.squares, 15), 4)
            : line(`${box(q.r * q.c, 50, 36)}${WORD(Wd.squares)}`);
          return `<div class="ws-card-stage" style="flex-direction:column;justify-content:space-evenly;align-items:center;gap:5px;padding:0 2px" data-lcs-rowscols="${q.r}|${q.c}">` +
            gridRect(q.r, q.c, u, { start: d.start, sides: d.sides, key: mark }) +
            line(`${box(q.r, 42, 34)}${WORD(Wd.rows)}<span style="width:8px"></span>${box(q.c, 42, 34)}${WORD(Wd.cols)}`, 6) + count + `</div>`;
        });
        items = rs.map((q) => `${q.r}x${q.c}`);
      }
      return { bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-twg="${mode}|${lv}">${cardGrid({ cards, cols: d.cols, rows: Math.ceil(cards.length / d.cols) })}</div>`, meta: { items } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-twg]');
        if (!root) return ['no page'];
        const [mode, lv] = root.dataset.lcsTwg.split('|');
        const rectOf = (e) => e.getBoundingClientRect();
        const boxes = (c) => [...c.querySelectorAll('.ws-answerbox')];
        // nothing leaves its card, no line of a card wraps or is cut, and the card is used
        document.querySelectorAll('.ws-card').forEach((c, i) => {
          const P = 'card ' + (i + 1), cb = rectOf(c);
          c.querySelectorAll('svg, .ws-answerbox, [data-lcs-line] > span, [data-lcs-frac]').forEach((e) => { const r = rectOf(e); if (r.width && (r.left < cb.left + 1 || r.right > cb.right - 1 || r.top < cb.top - 1 || r.bottom > cb.bottom + 1)) fails.push(`${P}: something leaves the card`); });
          c.querySelectorAll('[data-lcs-line]').forEach((ln) => { const lr = rectOf(ln), kids = [...ln.children].map(rectOf).filter((k) => k.width); if (kids.some((k) => Math.abs((k.top + k.bottom) / 2 - (lr.top + lr.bottom) / 2) > 10)) fails.push(`${P}: a line wraps`); for (let k = 1; k < kids.length; k++) if (kids[k].left < kids[k - 1].right - 0.5) fails.push(`${P}: two parts of a line overlap`); });
          const boxesAll = boxes(c).map(rectOf); for (let a = 0; a < boxesAll.length; a++) for (let b = a + 1; b < boxesAll.length; b++) { const A = boxesAll[a], B = boxesAll[b]; if (A.left < B.right - 1 && B.left < A.right - 1 && A.top < B.bottom - 1 && B.top < A.bottom - 1) fails.push(`${P}: two boxes overlap`); }
        });
        if (mode === 'times-tens') {
          const cards = [...document.querySelectorAll('[data-lcs-timestens]')], seen = new Set(); let tenFirst = 0;
          cards.forEach((c, i) => {
            const P = 'card ' + (i + 1), [a, b, tf] = c.dataset.lcsTimestens.split('|').map(Number);
            if (a < 2 || a > 9 || b < 2 || b > 9) fails.push(`${P}: a factor outside 2 to 9`);
            if (seen.has(a + 'x' + b)) fails.push(`${P}: a fact twice`); seen.add(a + 'x' + b);
            if (tf) tenFirst++;
            const text = c.textContent.replace(/\s+/g, ' ');
            if (lv === '1') {
              const groups = c.querySelectorAll('[data-lcs-group]').length, rods = c.querySelectorAll('[data-lcs-rod]').length;
              if (groups !== a || rods !== a * b) fails.push(`${P}: ${groups} groups and ${rods} rods for ${a} groups of ${b}`);
              if (boxes(c).length !== 2) fails.push(`${P}: ${boxes(c).length} boxes`);
              const sv = rectOf(c.querySelector('svg')); if (sv.height < 60) fails.push(`${P}: the rods are ${Math.round(sv.height)} px tall`);
            } else if (lv === '2') {
              if (boxes(c).length !== 3) fails.push(`${P}: ${boxes(c).length} boxes`);
              if (!text.includes(a + ' ') || !text.includes(String(b * 10))) fails.push(`${P}: the tens partner is not printed`);
            } else {
              if (boxes(c).length !== 1) fails.push(`${P}: ${boxes(c).length} boxes`);
              if (!text.includes(tf ? b * 10 + ' ' : a + ' ') || !text.includes(String(b * 10))) fails.push(`${P}: the equation is not printed`);
            }
          });
          if (cards.length !== (lv === '1' ? 6 : lv === '2' ? 8 : 12)) fails.push(cards.length + ' cards');
          if (lv === '3' && tenFirst !== 6) fails.push(`${tenFirst} of 12 equations put the ten first`);
          if (lv !== '3' && tenFirst) fails.push('the ten stands first on an easier page');
        } else if (mode === 'whole-fractions') {
          if (lv === '1') {
            const cards = [...document.querySelectorAll('[data-lcs-wholeshape]')], count = { 1: 0, 2: 0, 3: 0 }, seen = new Set();
            cards.forEach((c, i) => {
              const P = 'card ' + (i + 1), [n, den] = c.dataset.lcsWholeshape.split('|').map(Number);
              count[n]++;
              if (seen.has(n + '/' + den)) fails.push(`${P}: a picture twice`); seen.add(n + '/' + den);
              const wholes = [...c.querySelectorAll('[data-lcs-whole]')];
              if (wholes.length !== n) fails.push(`${P}: ${wholes.length} shapes for ${n}`);
              if (n > 1 && wholes.some((w) => { const b = w.getBoundingClientRect(); return b.width > b.height * 1.5; })) fails.push(`${P}: a bar beside or above another bar`);
              for (let k = 1; k < wholes.length; k++) if (wholes[k].getBoundingClientRect().left - wholes[k - 1].getBoundingClientRect().right < 10) fails.push(`${P}: two wholes stand closer than 10 px`);
              wholes.forEach((w) => { if (w.querySelector('[data-lcs-wholerect]')) { const cells = [...w.querySelectorAll('[data-lcs-part]')].map((e) => e.getBoundingClientRect()).sort((x, y) => x.top - y.top || x.left - y.left); for (let k = 1; k < cells.length; k++) if (Math.abs(cells[k].top - cells[k - 1].top) < 1 && cells[k].left - cells[k - 1].right > 1) fails.push(`${P}: a gap between two parts of one whole`); if (w.querySelectorAll('[data-lcs-whole-outline]').length !== 1) fails.push(`${P}: a whole without its one outline`); } });
              wholes.forEach((w) => { const parts = w.querySelectorAll('[data-lcs-part]').length, sh = w.querySelectorAll('[data-lcs-shaded="1"]').length; if (parts !== den || sh !== den) fails.push(`${P}: a shape with ${parts} parts, ${sh} shaded, for ${den}`); });
              if (boxes(c).length !== 2 || !c.querySelector(`[data-lcs-frac="${n * den}/${den}"]`)) fails.push(`${P}: the fraction frame`);
            });
            if (cards.length !== 6 || count[1] !== 2 || count[2] !== 2 || count[3] !== 2) fails.push(`six cards with one, two and three wholes twice each (${JSON.stringify(count)})`);
          } else if (lv === '2') {
            const cards = [...document.querySelectorAll('[data-lcs-wholeline]')], dens = new Set();
            cards.forEach((c, i) => {
              const P = 'line ' + (i + 1), [den, top] = c.dataset.lcsWholeline.split('|').map(Number);
              dens.add(den);
              const marks = [...c.querySelectorAll('[data-lcs-mark]')], wholes = [...c.querySelectorAll('[data-lcs-whole-number]')];
              if (marks.length !== den * top + 1) fails.push(`${P}: ${marks.length} marks for ${top} wholes in ${den} parts`);
              if (wholes.map((w) => w.textContent).join(',') !== Array.from({ length: top + 1 }, (_, k) => k).join(',')) fails.push(`${P}: the whole numbers read ${wholes.map((w) => w.textContent).join(',')}`);
              const xs = marks.map((m) => rectOf(m).left + rectOf(m).width / 2); for (let k = 2; k < xs.length; k++) if (Math.abs((xs[k] - xs[k - 1]) - (xs[1] - xs[0])) > 0.6) { fails.push(`${P}: the parts are not equal`); break; }
              if (xs[1] - xs[0] < 22) fails.push(`${P}: the marks stand ${Math.round(xs[1] - xs[0])} px apart`);
              const fr = [...c.querySelectorAll('[data-lcs-frac]')].filter((f) => !f.closest('[data-lcs-help]'));
              if (fr.length !== top) fails.push(`${P}: ${fr.length} fractions to write for ${top} whole numbers`);
              fr.forEach((f, k) => { const whole = marks[(k + 1) * den], fx = rectOf(f).left + rectOf(f).width / 2, wx = rectOf(whole).left + rectOf(whole).width / 2; if (Math.abs(fx - wx) > 2) fails.push(`${P}: fraction ${k + 1} does not stand under its whole number`); if (f.dataset.lcsFrac !== (k + 1) * den + '/' + den) fails.push(`${P}: fraction ${k + 1} is stamped ${f.dataset.lcsFrac}`); });
              const all = [...c.querySelectorAll('[data-lcs-frac]')].map(rectOf); for (let a = 0; a < all.length; a++) for (let b = a + 1; b < all.length; b++) if (all[a].left < all[b].right + 2 && all[b].left < all[a].right + 2) fails.push(`${P}: two fractions under the line touch`);
            });
            if (cards.length !== 4 || dens.size !== 4) fails.push('four lines with four different parts');
          } else {
            const cards = [...document.querySelectorAll('[data-lcs-wholeeq]')], kinds = {}, seen = new Set();
            cards.forEach((c, i) => {
              const P = 'card ' + (i + 1), [kind, k, den] = c.dataset.lcsWholeeq.split('|'); kinds[kind] = (kinds[kind] || 0) + 1;
              const key = kind === 'one' ? 'one' + k : k + '/' + den;
              if (seen.has(key)) fails.push(`${P}: an equation twice`); seen.add(key);
              if (![1, 2, 3, 4, 6, 8].includes(+den) || +k * +den > 24) fails.push(`${P}: ${k} wholes in ${den} parts`);
              if (boxes(c).length !== 1) fails.push(`${P}: ${boxes(c).length} boxes`);
              if (!c.querySelector(`[data-lcs-frac="${+k * +den}/${den}"]`)) fails.push(`${P}: the fraction is not ${+k * +den}/${den}`);
            });
            if (cards.length !== 12 || ['value', 'one', 'num-right', 'num-left'].some((k) => kinds[k] !== 3)) fails.push('twelve equations, three of each kind: ' + JSON.stringify(kinds));
          }
        } else {
          const cards = [...document.querySelectorAll('[data-lcs-rowscols]')], seen = new Set(); let maxSide = 0;
          cards.forEach((c, i) => {
            const P = 'card ' + (i + 1), [r, col] = c.dataset.lcsRowscols.split('|').map(Number);
            maxSide = Math.max(maxSide, r, col);
            if (seen.has(r * col)) fails.push(`${P}: a count twice`); seen.add(r * col);
            if (r * col < 6) fails.push(`${P}: a rectangle of ${r * col} squares`);
            if (lv !== '1' && r > 4) fails.push(`${P}: ${r} rows have no room in the addition`);
            const svg = c.querySelector('[data-lcs-grid]'), [gr, gc, u] = svg.dataset.lcsGrid.split('x').map(Number), rect = rectOf(svg.querySelector('[data-lcs-rect]'));
            if (gr !== r || gc !== col) fails.push(`${P}: the rectangle is ${gr} by ${gc}`);
            if (Math.abs(rect.width / col - rect.height / r) > 1) fails.push(`${P}: the parts would not be squares (${Math.round(rect.width / col)} by ${Math.round(rect.height / r)} px)`);
            if (u < 30) fails.push(`${P}: squares of ${u} px are too small to draw`);
            const ticks = (s) => svg.querySelectorAll(`[data-lcs-tick="${s}"]`).length, four = lv !== '3';
            if (ticks('top') !== col - 1 || ticks('left') !== r - 1 || ticks('bottom') !== (four ? col - 1 : 0) || ticks('right') !== (four ? r - 1 : 0)) fails.push(`${P}: the marks on the sides`);
            const given = svg.querySelectorAll('[data-lcs-given]').length;
            if (lv === '1' ? given !== 2 + (col - 2) + (r - 2) : given !== 0) fails.push(`${P}: ${given} drawn lines`);
            if (boxes(c).length !== (lv === '1' ? 3 : 2 + r + 1)) fails.push(`${P}: ${boxes(c).length} boxes`);
            if (c.querySelectorAll('[data-lcs-line]').length !== 2) fails.push(`${P}: two lines under the rectangle`);
            if (/[×·]/.test(c.textContent)) fails.push(`${P}: a multiplication sign`);
          });
          if (cards.length !== 4) fails.push(cards.length + ' cards');
          if (lv !== '1' && maxSide !== 5) fails.push('no rectangle reaches 5');
          if (lv === '1' && maxSide > 4) fails.push('the easier page goes past 4');
        }
        return fails;
      });
    },
  };
}

module.exports = { makeTensWholesGridsType, LEVELS, GRID_WORDS };
