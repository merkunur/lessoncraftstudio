/**
 * templates/components-b3/syllable-reading.js — the G1-306 `syllable-reading`
 * components (nt20-C; design file §2 "NEW in components-b3"). Merged into the
 * templates/components-b3.js namespace by filename; exports EXACTLY the six
 * names the design file lists: syllableRow · syllableCarpet · syllableLane ·
 * syllableJoin · colourRing · numberedBank. Inline SVG on the token palette;
 * ground truth on data-lcs-* attributes; NO word is ever printed except the
 * carpet cells (the task) and an R rime on a lane (the given).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, roundedRect, circle, line, el, esc } = require('../../primitives/_svg.js');
const { writingRow, textLaneGeometry, LM } = require('../../primitives/trace-path.js');
const { countBadge } = require('../components-b2.js');

const T = tokens.color;
const F = tokens.font;

/**
 * Baloo 2 700 glyph advances in em, MEASURED 2026-09-14 in the real render
 * pipeline (page/shell.js fonts, puppeteer getComputedTextLength at 100 px;
 * `clock` measured 2.3641 vs the summed 2.3644 — the face carries no kerning
 * over these pairs). build() has no font metrics, so cell widths and the lane's
 * writable width are sized from this table; the gate re-measures the widest
 * rendered cell in the browser (rule 11: advance <= cellW - 8) so a glyph
 * missing here can only ever fail loudly, never ship narrow.
 */
const BALOO2_700_ADV = {
  a: 0.5331, b: 0.58, c: 0.4861, d: 0.577, e: 0.542, f: 0.4231, g: 0.5581, h: 0.577, i: 0.272, j: 0.2761,
  k: 0.5391, l: 0.275, m: 0.84, n: 0.575, o: 0.5781, p: 0.5761, q: 0.577, r: 0.4041, s: 0.4811, t: 0.3911,
  u: 0.5741, v: 0.5331, w: 0.7761, x: 0.5131, y: 0.5361, z: 0.4781,
  'å': 0.5331, 'ä': 0.5331, 'ö': 0.5781, 'ø': 0.5781, 'æ': 0.8261, 'ß': 0.6131, 'ç': 0.4861,
  'é': 0.542, 'è': 0.542, 'ê': 0.542, 'ë': 0.542, 'á': 0.5331, 'à': 0.5331, 'â': 0.5331, 'ã': 0.5331,
  'í': 0.272, 'ì': 0.272, 'î': 0.272, 'ï': 0.272, 'ó': 0.5781, 'ò': 0.5781, 'ô': 0.5781, 'õ': 0.5781,
  'ú': 0.5741, 'ù': 0.5741, 'û': 0.5741, 'ü': 0.5741, 'ñ': 0.577, 'ý': 0.5361, 'ÿ': 0.5361,
  '|': 0.2741, '+': 0.5461, '-': 0.362,
};
const ADV_FALLBACK = 0.62;   // an unmeasured glyph (a capital, a rare letter): over-estimate, never under
function textAdvance(str, px) {
  let w = 0;
  for (const ch of String(str)) w += (BALOO2_700_ADV[ch] != null ? BALOO2_700_ADV[ch] : ADV_FALLBACK);
  return w * px;
}

/** 'c|at' -> { onset:'c', rime:'at', text:'cat' }; 'ma' -> { onset:null, rime:null, text:'ma' } */
function parseCell(cell) {
  const s = String(cell);
  const i = s.indexOf('|');
  if (i < 0) return { onset: null, rime: null, text: s };
  return { onset: s.slice(0, i), rime: s.slice(i + 1), text: s.slice(0, i) + s.slice(i + 1) };
}

/* ---------- one carpet row: V cells + a dashed read-tick ---------- */
/**
 * syllableRow({ cells, cell=64, cellW, gap=8, fontPx=30, tick=true, rime=null, alt=0 })
 *  cells   printed verbatim ('ma' | 'c|at'); an R cell renders the onset in ink
 *          and the rime in coral with a 1 px grid seam between them
 *  cell    cell HEIGHT (the ladder's square); cellW the width (defaults to `cell`,
 *          or wider when the widest cell text + 12 needs it — never narrower)
 *  alt     0|1 — which cell starts the white / tealSoft alternation (checkerboard
 *          across rows)
 *  readOnly cell texts no picture uses (stamped data-lcs-readonly; drawn identically)
 * Returns { svg, width, cellW, fontPx, maxText } — `width` = the rendered row.
 */
function syllableRow({ cells, cell = 64, cellW, gap = 8, fontPx = 30, tick = true, rime = null, alt = 0, readOnly = [] }) {
  const parsed = cells.map(parseCell);
  const ro = new Set((readOnly || []).map((x) => String(x).toLowerCase()));
  const maxText = Math.max(...parsed.map((p) => textAdvance(p.text, fontPx)));
  const W = Math.max(cell, cellW || 0, Math.ceil(maxText + 12));
  const V = parsed.length;
  const tickW = tick ? 12 + 28 : 0;
  const rowW = V * W + (V - 1) * gap + tickW;
  const parts = [];
  parsed.forEach((p, i) => {
    const x = 1 + i * (W + gap);
    const y = 1;
    const fill = ((i + alt) % 2 === 0) ? T.white : T.tealSoft;
    const data = { 'data-lcs-cell': p.text };
    if (p.onset != null) { data['data-lcs-onset'] = p.onset; data['data-lcs-rime'] = p.rime; }
    if (ro.has(p.text.toLowerCase())) data['data-lcs-readonly'] = '1';   // read, never solved — a data stamp only, the cell looks like every other
    let inner = roundedRect({ x, y, w: W, h: cell, r: 10, fill, strokeColor: T.teal, strokeWidth: 2 });
    const cx = x + W / 2;
    const cy = y + cell / 2;
    if (p.onset != null) {
      const total = textAdvance(p.text, fontPx);
      const seamX = cx - total / 2 + textAdvance(p.onset, fontPx);
      inner += line({ x1: seamX.toFixed(2), y1: (y + cell * 0.22).toFixed(1), x2: seamX.toFixed(2), y2: (y + cell * 0.78).toFixed(1), strokeColor: T.grid, strokeWidth: 1, cap: 'butt' });
      inner += el('text', {
        x: cx, y: cy, 'font-family': F.display, 'font-size': fontPx, 'font-weight': 700,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
      }, el('tspan', { fill: T.ink }, esc(p.onset)) + el('tspan', { fill: T.coral }, esc(p.rime)));
    } else {
      inner += el('text', {
        x: cx, y: cy, 'font-family': F.display, 'font-size': fontPx, 'font-weight': 700, fill: T.ink,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
      }, esc(p.text));
    }
    parts.push(el('g', data, inner));
  });
  if (tick) {
    const tx = 1 + V * W + (V - 1) * gap + 12 + 14;
    parts.push(circle({ cx: tx, cy: 1 + cell / 2, r: 14, fill: T.white, strokeColor: T.coral, strokeWidth: 2.5,
      data: { 'stroke-dasharray': '5 4', 'data-lcs-readtick': '1' } }));
  }
  const svg = svgRoot({ width: rowW + 2, height: cell + 2, label: 'syllable row' }, parts.join(''), {
    'data-lcs-row': parsed.map((p) => p.text).join('|'),
    'data-lcs-cells': V,
    'data-lcs-cell-w': W,
    'data-lcs-cell-h': cell,
    'data-lcs-font': fontPx,
    ...(rime ? { 'data-lcs-rime': rime } : {}),
  });
  return { svg, width: rowW + 2, cellW: W, fontPx, maxText };
}

/* ---------- the reading carpet: rows stacked in a white teal frame ---------- */
/**
 * syllableCarpet({ rows, ...rowOpts }) — rows: [{ cells, rime?, readOnly? }]; every row gets
 * the SAME cellW (the widest text on the carpet decides) so the grid aligns.
 * `rows: []` renders nothing (a face with carpetRows:0). Stamps data-lcs-carpet
 * + data-ws-content (the QA content selector).
 * Returns { html, cellW, fontPx, width, maxText }.
 */
function syllableCarpet({ rows, ...rowOpts }) {
  if (!rows || !rows.length) return { html: '', cellW: 0, fontPx: rowOpts.fontPx || 0, width: 0, maxText: 0 };
  const fontPx = rowOpts.fontPx || 30;
  const allCells = rows.flatMap((r) => r.cells.map(parseCell));
  const maxText = Math.max(...allCells.map((p) => textAdvance(p.text, fontPx)));
  const W = Math.max(rowOpts.cell || 64, rowOpts.cellW || 0, Math.ceil(maxText + 12));
  const rendered = rows.map((r, i) => syllableRow({ ...rowOpts, cells: r.cells, rime: r.rime || null, readOnly: r.readOnly || [], cellW: W, alt: i % 2 }));
  const width = Math.max(...rendered.map((r) => r.width));
  const html = `<div data-lcs-carpet data-ws-content data-lcs-carpet-rows="${rows.length}" ` +
    `style="background:${T.white};border:2px solid ${T.teal};border-radius:16px;padding:12px;display:flex;flex-direction:column;align-items:center;gap:8px;flex:0 0 auto">` +
    rendered.map((r) => r.svg).join('') + `</div>`;
  return { html, cellW: W, fontPx, width, maxText };
}

/* ---------- the writing lane: school lines in a dashed coral frame ---------- */
/**
 * syllableLane({ w, h, glyphH, printed=null }) — writingRow school lines
 * (x-height rule) inside a dashed T.coral 2.5 r10 white frame. `printed` = the
 * R rime, Baloo 2 700 at 0.9·glyphH in coral, anchored at the right end on the
 * baseline; the child writes the onset on the lines before it. The writable
 * width (w - textW - 12) must be >= 60 or the lane REFUSES (throws).
 * Stamps data-lcs-syllable-lane, data-lcs-printed, data-lcs-writable, data-lcs-glyph-h.
 */
function syllableLane({ w, h, glyphH, printed = null }) {
  const innerW = w - 6, innerH = h - 6;   // the 2.5 px dashed frame + 0.5 slack each side
  let svg = writingRow({ w: innerW, h: innerH, glyphH, xHeight: true }).svg;
  let writable = innerW - 12;
  if (printed) {
    const px = Math.round(glyphH * 0.9);
    const textW = textAdvance(printed, px);
    writable = w - textW - 12;
    if (writable < 60) throw new Error(`syllableLane: printed "${printed}" leaves ${Math.round(writable)} px to write on (< 60) — refuse`);
    const g = textLaneGeometry({ h: innerH, glyphH, heightUnits: LM.base - LM.ascender, inkTop: LM.ascender, inkBottom: LM.desc });
    svg = svg.replace('</svg>', el('text', {
      x: innerW - 6, y: (g.yBase - 1).toFixed(1), 'font-family': F.display, 'font-size': px, 'font-weight': 700,
      fill: T.coral, 'text-anchor': 'end', 'data-lcs-lane-printed': '1',
    }, esc(printed)) + '</svg>');
  }
  return `<div data-lcs-syllable-lane data-lcs-writable="${Math.round(writable)}" data-lcs-glyph-h="${glyphH}"` +
    (printed ? ` data-lcs-printed="${esc(printed)}"` : '') +
    ` style="width:${w}px;height:${h}px;flex:0 0 auto;background:${T.white};border:2.5px dashed ${T.coral};border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden">${svg}</div>`;
}

/* ---------- Join face: ordered syllable tiles with a teal + between ---------- */
/**
 * syllableJoin({ tokens, fontPx=26, tileH=44 }) — the approved `split` in order
 * as .ws-tile chips (the components-b2 wordTiles markup), a T.teal "+" between.
 * Stamps data-lcs-join = token count on the row.
 */
function syllableJoin({ tokens: toks, fontPx = 26, tileH = 44 }) {
  const plus = `<span aria-hidden="true" style="font-family:${F.display};font-weight:700;font-size:${fontPx}px;color:${T.teal};line-height:1">+</span>`;
  const tiles = toks.map((t, i) => `<span class="ws-tile" style="height:${tileH}px;font-size:${fontPx}px" data-lcs-tile="${i}">${esc(t)}</span>`);
  return `<div class="ws-tilerow" style="justify-content:center;flex-wrap:nowrap" data-lcs-join="${toks.length}">${tiles.join(plus)}</div>`;
}

/* ---------- Carpet face: a colour ring the child copies onto a cell ---------- */
function colourRing({ color }) {
  const fill = tokens.codeColors[color];
  if (!fill) throw new Error('colourRing: unknown codeColors key "' + color + '"');
  return svgRoot({ width: 44, height: 44, label: color },
    circle({ cx: 22, cy: 22, r: 20, fill, strokeColor: T.teal, strokeWidth: 2 }),
    { 'data-lcs-colour': color });
}

/* ---------- Syllabified face: a numbered picture bank ---------- */
/**
 * numberedBank({ items:[{ src, vocabKey }], iconPx=64 }) — a .ws-scene-banner
 * of pictures, each with countBadge(i+1) at its corner; stamps
 * data-lcs-bank-index (1-based) + data-lcs-vocab per item.
 */
function numberedBank({ items, iconPx = 64 }) {
  const cells = items.map((it, i) =>
    `<span style="position:relative;display:inline-flex;padding:8px 0 0 8px" data-lcs-bank-index="${i + 1}" data-lcs-vocab="${esc(it.vocabKey)}">` +
    `<img class="ws-icon" src="${it.src}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
    `<span style="position:absolute;left:0;top:0">${countBadge(i + 1)}</span></span>`).join('');
  return `<div class="ws-scene-banner" style="gap:14px;flex-wrap:wrap" data-lcs-numbered-bank="${items.length}">${cells}</div>`;
}

module.exports = { syllableRow, syllableCarpet, syllableLane, syllableJoin, colourRing, numberedBank };
