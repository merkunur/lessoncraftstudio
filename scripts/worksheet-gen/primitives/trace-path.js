/**
 * trace-path — the tracing-family engine (pre-writing strokes, digit tracing,
 * letter/word outline tracing, school handwriting lines).
 *
 * Conventions (design-panel locked):
 *  - The MODEL rendering is solid teal; TRACE renderings are dashed grid-gray.
 *  - Dashed stroke width never below 2.5px; dash pattern ~7 5 so a 5-year-old's
 *    pencil has something to follow.
 *  - Every trace path carries a coral START DOT and a small arrowhead showing
 *    the stroke direction (the universal start-here convention).
 *  - School-lines trio: solid baseline, dotted midline, solid topline.
 *
 * All emitters return SVG strings (or {svg,...}) and consume only _tokens
 * colors, so the QA palette lint holds.
 */
'use strict';
const tokens = require('./_tokens.js');
const { el, svgRoot, line } = require('./_svg.js');
const letterStrokes = require('../data/tracing/letter-strokes.js');

const DASH = '7 5';
const MIN_TRACE_W = 2.5;

/* ------------------------------------------------------------------ *
 * Pre-writing stroke path generators.
 * Each returns an SVG path `d` spanning x:[0,w] around a vertical center
 * cy, plus the start-direction angle (deg) for the arrowhead.
 * ------------------------------------------------------------------ */

function straight({ w, cy }) {
  return { d: `M 0 ${cy} L ${w} ${cy}`, startAngle: 0 };
}

function zigzag({ w, cy, amp, n }) {
  const seg = w / n;
  let d = `M 0 ${cy + amp}`;
  for (let i = 1; i <= n; i++) {
    const y = i % 2 === 1 ? cy - amp : cy + amp;
    d += ` L ${(i * seg).toFixed(1)} ${y}`;
  }
  const startAngle = -Math.atan2(2 * amp, seg) * 180 / Math.PI;
  return { d, startAngle };
}

function wave({ w, cy, amp, n }) {
  const seg = w / n;
  let d = `M 0 ${cy}`;
  for (let i = 0; i < n; i++) {
    const x0 = i * seg;
    const dir = i % 2 === 0 ? -1 : 1; // first hump rises
    d += ` Q ${(x0 + seg / 2).toFixed(1)} ${(cy + dir * amp * 2).toFixed(1)} ${(x0 + seg).toFixed(1)} ${cy}`;
  }
  return { d, startAngle: -45 };
}

/** Repeated semicircle arcs sitting ON the center line (rainbow bumps). */
function bumps({ w, cy, amp, n, down }) {
  const seg = w / n;
  const sweep = down ? 0 : 1;
  let d = `M 0 ${cy}`;
  for (let i = 0; i < n; i++) {
    d += ` A ${(seg / 2).toFixed(1)} ${amp.toFixed(1)} 0 0 ${sweep} ${((i + 1) * seg).toFixed(1)} ${cy}`;
  }
  return { d, startAngle: down ? 60 : -60 };
}

/** Cursive e-loops marching across the lane. */
function loops({ w, cy, amp, n }) {
  const seg = w / (n + 0.5);
  let d = `M 0 ${cy + amp * 0.55}`;
  for (let i = 0; i < n; i++) {
    const x0 = i * seg;
    // rise forward, curl back over the top, exit forward under the line
    d += ` C ${(x0 + seg * 0.85).toFixed(1)} ${(cy - amp).toFixed(1)}` +
         ` ${(x0 - seg * 0.35).toFixed(1)} ${(cy - amp).toFixed(1)}` +
         ` ${(x0 + seg * 0.5).toFixed(1)} ${(cy + amp * 0.55).toFixed(1)}`;
  }
  d += ` L ${w} ${cy + amp * 0.55}`;
  return { d, startAngle: -55 };
}

/** Square-wave crenellation (castle walls). */
function castle({ w, cy, amp, n }) {
  const seg = w / (2 * n);
  let d = `M 0 ${cy + amp}`;
  for (let i = 0; i < n; i++) {
    const x0 = 2 * i * seg;
    d += ` L ${x0.toFixed(1)} ${cy - amp} L ${(x0 + seg).toFixed(1)} ${cy - amp}` +
         ` L ${(x0 + seg).toFixed(1)} ${cy + amp} L ${(x0 + 2 * seg).toFixed(1)} ${cy + amp}`;
  }
  return { d, startAngle: -90 };
}

/** Tall grass blades: up-down spikes with rounded tops (mountains). */
function mountains({ w, cy, amp, n }) {
  const seg = w / n;
  let d = `M 0 ${cy + amp}`;
  for (let i = 0; i < n; i++) {
    const x0 = i * seg;
    d += ` Q ${(x0 + seg / 2).toFixed(1)} ${(cy - amp * 1.6).toFixed(1)} ${(x0 + seg).toFixed(1)} ${cy + amp}`;
  }
  return { d, startAngle: -70 };
}

/** Inward-winding spirals (Schwungübungen Spiralen). Semicircle arcs of
 * shrinking radius chained on the center line; pencil lifts between spirals
 * (subpath M jumps) are intentional — each spiral is its own little journey. */
function spiral({ w, cy, amp, n }) {
  const k = Math.max(2, Math.round((n || 4) / 2)); // spirals across the lane
  const cellW = w / k;
  const r0 = Math.min(amp * 1.15, cellW * 0.42);
  const q = 0.55; // radius shrink per half-turn
  let d = '';
  for (let i = 0; i < k; i++) {
    const cx = (i + 0.5) * cellW;
    const r = [r0, r0 * q, r0 * q * q, r0 * q * q * q];
    // alternating semicircles sharing endpoints on the center line, winding in:
    // (cx-r0)→(cx+r0) over the top, →(cx-r1) under, →(cx+r2) over, →(cx-r3) under
    const px = [cx - r[0], cx + r[0], cx - r[1], cx + r[2], cx - r[3]];
    d += `${d ? ' ' : ''}M ${px[0].toFixed(1)} ${cy}`;
    for (let a = 0; a < 4; a++) {
      const radius = Math.abs(px[a + 1] - px[a]) / 2;
      d += ` A ${radius.toFixed(1)} ${radius.toFixed(1)} 0 0 1 ${px[a + 1].toFixed(1)} ${cy}`;
    }
  }
  return { d, startAngle: -90 };
}

/** Lying eights (liegende Acht / infinity loops) marching across the lane. */
function eight({ w, cy, amp, n }) {
  const k = Math.max(2, Math.round((n || 4) / 2));
  const cellW = w / k;
  const rx = cellW * 0.46;
  let d = '';
  for (let i = 0; i < k; i++) {
    const cx = (i + 0.5) * cellW;
    d += `${d ? ' ' : ''}M ${cx.toFixed(1)} ${cy}` +
      ` C ${(cx + rx).toFixed(1)} ${(cy - amp * 1.5).toFixed(1)} ${(cx + rx).toFixed(1)} ${(cy + amp * 1.5).toFixed(1)} ${cx.toFixed(1)} ${cy}` +
      ` C ${(cx - rx).toFixed(1)} ${(cy - amp * 1.5).toFixed(1)} ${(cx - rx).toFixed(1)} ${(cy + amp * 1.5).toFixed(1)} ${cx.toFixed(1)} ${cy}`;
  }
  return { d, startAngle: -50 };
}

/** The stroke library keyed by difficulty progression. */
const STROKES = {
  line: straight,
  zigzag,
  wave,
  bumps,
  cups: (o) => bumps({ ...o, down: true }),
  mountains,
  castle,
  loops,
  spiral,
  eight,
};

/* ------------------------------------------------------------------ *
 * Rendering
 * ------------------------------------------------------------------ */

function arrowHead({ x, y, angleDeg, size = 9, color }) {
  const a = angleDeg * Math.PI / 180;
  const p = (dx, dy) => {
    // rotate (dx,dy) by angle, translate to (x,y)
    const rx = dx * Math.cos(a) - dy * Math.sin(a);
    const ry = dx * Math.sin(a) + dy * Math.cos(a);
    return `${(x + rx).toFixed(1)},${(y + ry).toFixed(1)}`;
  };
  return el('polygon', {
    points: `${p(size, 0)} ${p(-size * 0.4, size * 0.55)} ${p(-size * 0.4, -size * 0.55)}`,
    fill: color || tokens.color.coral,
  });
}

/**
 * Render one path as either the solid model or a dashed trace target.
 * opts: { d, mode:'model'|'trace', strokeW, startX, startY, startAngle, dot, arrow }
 */
function renderPath({ d, mode, strokeW, startX, startY, startAngle, dot = true, arrow = true, guideScale = 1, dashScale = 1 }) {
  const isModel = mode === 'model';
  const parts = [el('path', {
    d,
    fill: 'none',
    stroke: isModel ? tokens.color.teal : tokens.color.grid,
    'stroke-width': Math.max(strokeW || 3, (isModel ? 3 : MIN_TRACE_W) * dashScale),
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-dasharray': isModel ? undefined : `${7 * dashScale} ${5 * dashScale}`,
  })];
  if (!isModel && dot && startX != null) {
    parts.push(el('circle', { cx: startX, cy: startY, r: 5 * guideScale, fill: tokens.color.coral }));
    if (arrow && startAngle != null) {
      const a = startAngle * Math.PI / 180;
      parts.push(arrowHead({
        x: startX + Math.cos(a) * 14 * guideScale, y: startY + Math.sin(a) * 14 * guideScale,
        angleDeg: startAngle, size: 9 * guideScale,
      }));
    }
  }
  return parts.join('');
}

/**
 * A full pre-writing lane: one solid model repetition + dashed repetitions.
 * { stroke: key of STROKES, w, h, reps, amp, n } → { svg, width, height }
 */
function strokeLane({ stroke, w, h, reps = 4, amp, n }) {
  const gen = STROKES[stroke];
  if (!gen) throw new Error(`trace-path: unknown stroke ${stroke}`);
  const cy = h / 2;
  const segW = w / reps;
  const innerW = segW - 14;
  const a = amp || Math.min(h * 0.28, 26);
  // loops need room for the curl — more than 3 per ~130px segment squashes
  // the arcs into illegible spikes (seen at the K-246 render review)
  const nEff = stroke === 'loops' ? Math.min(3, n || 4) : (n || 4);
  const parts = [];
  for (let i = 0; i < reps; i++) {
    const { d, startAngle } = gen({ w: innerW, cy, amp: a, n: nEff });
    const mode = i === 0 ? 'model' : 'trace';
    // find path start point: all generators start at x=0 with a known y —
    // parse it from the d string's "M x y".
    const m = d.match(/^M\s*([\d.-]+)\s+([\d.-]+)/);
    const sx = parseFloat(m[1]), sy = parseFloat(m[2]);
    parts.push(el('g', { transform: `translate(${(i * segW + 7).toFixed(1)} 0)` },
      renderPath({ d, mode, startX: sx, startY: sy, startAngle, dot: i === 1, arrow: i === 1 })));
  }
  return {
    svg: svgRoot({ width: w, height: h, label: `tracing stroke: ${stroke}` }, parts.join(''),
      { 'data-lcs-prim': 'trace-stroke', 'data-lcs-stroke': stroke, 'data-lcs-reps': reps }),
    width: w, height: h,
  };
}

/* ------------------------------------------------------------------ *
 * School lines (solid baseline, dotted midline, solid topline).
 * Drawn INSIDE a glyph area of height h: topline at yTop, midline halfway,
 * baseline at yBase. Descender space below baseline is the caller's concern.
 * ------------------------------------------------------------------ */
function schoolLines({ w, yTop, yBase, strokeColor, yMid: yMidIn }) {
  const c = strokeColor || tokens.color.grid;
  // The dotted midline is the X-HEIGHT line, which is only the arithmetic
  // midpoint by coincidence. Digits and pre-writing strokes have no x-height
  // and keep the midpoint; letter/word lanes pass the real one, or every
  // lowercase word floats off its own guide (letter-strokes.js METRICS.xTop).
  const yMid = yMidIn != null ? yMidIn : (yTop + yBase) / 2;
  return [
    line({ x1: 0, y1: yTop, x2: w, y2: yTop, strokeColor: c, strokeWidth: 1.5 }),
    line({ x1: 0, y1: yMid, x2: w, y2: yMid, strokeColor: c, strokeWidth: 1, dash: '3 5' }),
    line({ x1: 0, y1: yBase, x2: w, y2: yBase, strokeColor: c, strokeWidth: 1.5 }),
  ].join('');
}

/**
 * Hollow/dashed glyph tracing via stroked text (capitals + digits + words).
 * The glyph is rendered as SVG text with fill:none + dashed stroke — the
 * classic hollow-letter tracing look. First repetition can be a solid model.
 * { text, w, h, glyphH, reps, lines:true } → { svg }
 * Glyphs sit on school lines: cap height = yBase - yTop = glyphH.
 */
function glyphLane({ text, w, h, glyphH, reps = 3, lines: withLines = true, model = true, font, emptyLast = false }) {
  const yBase = h * 0.82;
  const yTop = yBase - glyphH;
  const parts = [];
  if (withLines) parts.push(schoolLines({ w, yTop, yBase }));
  const fam = font || tokens.font.display;
  const fs = Math.round(glyphH * 1.38); // Baloo cap-height ≈ 0.72em
  const segW = w / reps;
  for (let i = 0; i < reps; i++) {
    // emptyLast: the final slot stays BLANK on the school lines — the honest
    // "now write it yourself" spot the instruction promises (pt-panel finding)
    if (emptyLast && i === reps - 1) continue;
    const isModel = model && i === 0;
    parts.push(el('text', {
      x: (i + 0.5) * segW,
      y: yBase,
      'font-family': fam,
      'font-size': fs,
      'font-weight': 700,
      'text-anchor': 'middle',
      fill: isModel ? tokens.color.teal : 'none',
      stroke: isModel ? 'none' : tokens.color.grid,
      'stroke-width': isModel ? undefined : 1.6,
      'stroke-dasharray': isModel ? undefined : '5 4',
      'data-lcs-glyph': text,
    }, escText(text)));
  }
  return {
    svg: svgRoot({ width: w, height: h, label: `trace: ${text}` }, parts.join(''),
      { 'data-lcs-prim': 'trace-glyph', 'data-lcs-text': text,
        'data-lcs-reps': emptyLast ? reps - 1 : reps, // DRAWN glyph count
        ...(emptyLast ? { 'data-lcs-empty-slot': '1' } : {}) }),
    width: w, height: h,
  };
}

/**
 * Stroke-glyph lane: renders a hand-authored centerline glyph (digit) from a
 * stroke array (see data/tracing/digit-strokes.js) — one solid teal model,
 * then dashed repetitions. The FIRST dashed repetition carries the coral
 * start dot + arrowhead per stroke (and small order badges when >1 stroke).
 * { strokes, box:{w,h}, w, h, glyphH, reps } → { svg }
 */
function strokeGlyphLane({ strokes, box, w, h, glyphH, reps = 4, label: lbl, emptyLast = false }) {
  const scale = glyphH / box.h;
  const gW = box.w * scale;
  // compact lanes (10-digit ladder) keep only the start dot — full arrows +
  // stroke-order badges at this size overlap the glyph and read as clutter
  const fullGuides = glyphH >= 80;
  const yBase = h * 0.86;
  const yTop = yBase - glyphH;
  const parts = [schoolLines({ w, yTop, yBase })];
  const segW = w / reps;
  for (let i = 0; i < reps; i++) {
    // emptyLast: the final slot stays BLANK on the school lines — the honest
    // "now write it yourself" spot (glyphLane convention, nt20-VAR K-251)
    if (emptyLast && i === reps - 1) continue;
    const isModel = i === 0;
    const showGuides = i === 1; // start dot (+ arrows when large) on the first trace rep
    const gx = (i + 0.5) * segW - gW / 2;
    const inv = 1 / scale; // compensate the group scale so display sizes hold
    const inner = strokes.map((s, si) => {
      const m = s.d.match(/^M\s*([\d.-]+)\s+([\d.-]+)/);
      const sx = parseFloat(m[1]), sy = parseFloat(m[2]);
      let g = renderPath({
        d: s.d, mode: isModel ? 'model' : 'trace', strokeW: 3.4 * inv,
        startX: sx, startY: sy, startAngle: s.angle,
        // arrows at EVERY size (the instruction promises them — critic
        // finding); compact lanes shrink them; only order BADGES stay
        // large-lane-only (they were the clutter)
        dot: showGuides, arrow: showGuides, guideScale: inv * (fullGuides ? 1 : 0.72), dashScale: inv,
      });
      if (showGuides && fullGuides && strokes.length > 1) {
        g += el('circle', { cx: sx - 16 * inv, cy: sy - 11 * inv, r: 8 * inv, fill: tokens.color.white, stroke: tokens.color.coral, 'stroke-width': 1.5 * inv });
        g += el('text', {
          x: sx - 16 * inv, y: sy - 11 * inv, 'font-family': tokens.font.display, 'font-size': Math.round(11 * inv),
          'font-weight': 700, fill: tokens.color.coral, 'text-anchor': 'middle',
          'dominant-baseline': 'central',
        }, String(si + 1));
      }
      return g;
    }).join('');
    parts.push(el('g', { transform: `translate(${gx.toFixed(1)} ${yTop.toFixed(1)}) scale(${scale.toFixed(4)})` }, inner));
  }
  return {
    svg: svgRoot({ width: w, height: h, label: lbl || 'trace glyph' }, parts.join(''),
      { 'data-lcs-prim': 'trace-digit', 'data-lcs-reps': emptyLast ? reps - 1 : reps,
        'data-lcs-strokes': strokes.length,
        ...(emptyLast ? { 'data-lcs-empty-slot': '1' } : {}) }),
    width: w, height: h,
  };
}

/**
 * Two-glyph stroke lane for multi-digit numbers (10-20): each repetition
 * renders TWO hand-authored stroke glyphs side by side (tens then ones) on
 * shared school lines. Same model/trace/guide conventions as strokeGlyphLane;
 * guides (start dot + arrow) appear on both digits of the first trace rep at
 * the compact scale (no order badges — pair lanes are always compact).
 * { tens, ones, box, w, h, glyphH, reps, label } → { svg }
 */
function strokeGlyphPairLane({ tens, ones, box, w, h, glyphH, reps = 4, label: lbl }) {
  const scale = glyphH / box.h;
  const gW = box.w * scale;
  const gap = Math.max(6, glyphH * 0.12);
  const pairW = gW * 2 + gap;
  const yBase = h * 0.86;
  const yTop = yBase - glyphH;
  const parts = [schoolLines({ w, yTop, yBase })];
  const segW = w / reps;
  const inv = 1 / scale;
  const drawGlyph = (strokes, isModel, showGuides) => strokes.map((s) => {
    const m = s.d.match(/^M\s*([\d.-]+)\s+([\d.-]+)/);
    return renderPath({
      d: s.d, mode: isModel ? 'model' : 'trace', strokeW: 3.4 * inv,
      startX: parseFloat(m[1]), startY: parseFloat(m[2]), startAngle: s.angle,
      dot: showGuides, arrow: showGuides, guideScale: inv * 0.72, dashScale: inv,
    });
  }).join('');
  for (let i = 0; i < reps; i++) {
    const isModel = i === 0;
    const showGuides = i === 1;
    const x0 = (i + 0.5) * segW - pairW / 2;
    parts.push(el('g', { transform: `translate(${x0.toFixed(1)} ${yTop.toFixed(1)}) scale(${scale.toFixed(4)})` },
      drawGlyph(tens, isModel, showGuides)));
    parts.push(el('g', { transform: `translate(${(x0 + gW + gap).toFixed(1)} ${yTop.toFixed(1)}) scale(${scale.toFixed(4)})` },
      drawGlyph(ones, isModel, showGuides)));
  }
  return {
    svg: svgRoot({ width: w, height: h, label: lbl || 'trace number' }, parts.join(''),
      { 'data-lcs-prim': 'trace-digit-pair', 'data-lcs-reps': reps,
        'data-lcs-strokes': tens.length + ones.length }),
    width: w, height: h,
  };
}

/* ------------------------------------------------------------------ *
 * Letter + word tracing on hand-authored CENTRELINE letterforms.
 *
 * These supersede glyphLane (above), which stroked a filled font's OUTLINE and
 * therefore painted two dashed contours per stem. Here a letter is the same
 * kind of object a digit already is: ordered single strokes, so one dashed line
 * per stroke, and a start point + direction that actually exist.
 *
 * Vertical placement is by BASELINE, not by box. strokeGlyphLane's
 * `scale = glyphH / box.h` works only because the digit box is essentially all
 * glyph; the letter box is 0..100 with the cap band at 16..84, so that mapping
 * would float every letter off the school lines. The ink band also runs wider
 * than the cap band in both directions — accents reach y=2 (the d3 "specials"
 * page is entirely accented capitals, so this is the common case) and Q's tail
 * reaches 92 — so the scale is additionally capped to whatever the lane can
 * actually hold, shrinking slightly rather than clipping.
 * ------------------------------------------------------------------ */

const LM = letterStrokes.METRICS;
const LANE_PAD = 6;

/**
 * Shared geometry for a centreline text lane.
 * `inkTop`/`inkBottom` are the glyph-unit extremes the lane must hold;
 * `heightUnits` is what the caller's `glyphH` measures (cap height for
 * capitals, ascender-to-baseline for lowercase words).
 */
function textLaneGeometry({ h, glyphH, heightUnits, inkTop, inkBottom }) {
  const span = inkBottom - inkTop;
  const scale = Math.min(glyphH / heightUnits, (h - LANE_PAD) / span);
  const top = (h - span * scale) / 2;          // centre the ink band in the lane
  const yBase = top + (LM.base - inkTop) * scale;
  return { scale, yBase };
}

const BADGE_R = 8;

/**
 * Find a spot for a stroke-order badge that does not sit on one already placed.
 * Letters make coincident stroke starts the RULE, not the exception — A's two
 * legs, and the stem-then-bowl of B D P R, all begin at the same point — so a
 * fixed offset buries badge 1 under badge 2 and the child is told to start at
 * stroke 2. Search outward from the left of the stroke's own direction.
 */
function placeBadge(x, y, angleDeg, placed) {
  for (const r of [22, 36]) {
    for (let k = 0; k < 12; k++) {
      const a = (angleDeg - 90 + k * 30) * Math.PI / 180;
      const bx = x + Math.cos(a) * r, by = y + Math.sin(a) * r;
      if (!placed.some((p) => Math.hypot(p.x - bx, p.y - by) < BADGE_R * 2 + 3)) return { x: bx, y: by };
    }
  }
  return { x, y: y - 22 };
}

/**
 * Emit one repetition of `items` (from letterStrokes.textGlyphs) at x0.
 *
 * The GUIDES (start dot, arrowhead, stroke-order badge) are drawn in DISPLAY
 * coordinates, outside the scaled group, for two reasons. An SVG transform
 * does not change a font-size ATTRIBUTE, so a badge authored inside the group
 * carries a 7px attribute at letter scale and trips the 9px font-size floor
 * (letters scale UP where digits scale DOWN — the only reason the digit lane
 * never hit this). And placement has to reason about real distances to keep
 * coincident-start guides apart.
 *
 * @returns {{ rep: string, guides: string }}
 */
function renderTextRep({ items, x0, yBase, scale, isModel, showGuides, badges }) {
  const inv = 1 / scale;
  const ty = yBase - LM.base * scale;
  const dotR = badges ? 5 : 4;
  const arrowSz = badges ? 9 : 6.5;
  const arrowD = badges ? 18 : 12;
  const guideParts = [];
  const dots = [];        // display-space start points already marked
  const placedBadges = [];
  const inner = items.map((it) => {
    const glyph = it.strokes.map((s, si) => {
      const m = s.d.match(/^M\s*([\d.-]+)\s+([\d.-]+)/);
      const sx = parseFloat(m[1]), sy = parseFloat(m[2]);
      const g = renderPath({
        d: s.d, mode: isModel ? 'model' : 'trace', strokeW: 3.4 * inv,
        dot: false, arrow: false, dashScale: inv,
      });
      // An accent mark gets no guides: the coral dot is wider than an umlaut
      // tick, and its arrow would be thrown onto the letter body below.
      if (showGuides && !s.mark) {
        const dx = x0 + (it.x + sx) * scale;
        const dy = ty + sy * scale;
        // ONE dot per distinct start point — two strokes that genuinely begin
        // together (A's legs) share one dot rather than stacking two
        const shared = dots.filter((p) => Math.hypot(p.x - dx, p.y - dy) < 2);
        if (!shared.length) {
          guideParts.push(el('circle', { cx: dx.toFixed(1), cy: dy.toFixed(1), r: dotR, fill: tokens.color.coral }));
        }
        dots.push({ x: dx, y: dy });
        // arrows fan OUT along their own direction when they share a start,
        // so two directions from one point read as two arrows, not a butterfly
        const a = s.angle * Math.PI / 180;
        const d = arrowD + shared.length * (arrowSz + 4);
        guideParts.push(arrowHead({
          x: dx + Math.cos(a) * d, y: dy + Math.sin(a) * d, angleDeg: s.angle, size: arrowSz,
        }));
        if (badges) {
          const b = placeBadge(dx, dy, s.angle, placedBadges);
          placedBadges.push(b);
          guideParts.push(el('circle', {
            cx: b.x.toFixed(1), cy: b.y.toFixed(1), r: BADGE_R,
            fill: tokens.color.white, stroke: tokens.color.coral, 'stroke-width': 1.5,
          }));
          guideParts.push(el('text', {
            x: b.x.toFixed(1), y: b.y.toFixed(1),
            'font-family': tokens.font.display, 'font-size': 11,
            'font-weight': 700, fill: tokens.color.coral, 'text-anchor': 'middle',
            'dominant-baseline': 'central',
          }, String(si + 1)));
        }
      }
      return g;
    }).join('');
    return el('g', { transform: `translate(${it.x.toFixed(2)} 0)` }, glyph);
  }).join('');
  return {
    rep: el('g', { transform: `translate(${x0.toFixed(1)} ${ty.toFixed(1)}) scale(${scale.toFixed(4)})` }, inner),
    guides: guideParts.join(''),
  };
}

/**
 * A capital-letter tracing lane: one solid teal centreline model, then dashed
 * repetitions. The FIRST dashed repetition carries the coral start dot +
 * arrowhead per stroke, and stroke-order badges on the large lane — the same
 * guide contract number tracing ships, which the instruction now promises.
 * `text` may be a digraph (nl "IJ"); it is laid out by advance width.
 * { text, w, h, glyphH, reps, emptyLast } -> { svg }
 */
function strokeLetterLane({ text, w, h, glyphH, reps = 4, emptyLast = false, label: lbl }) {
  let { items, width } = letterStrokes.textGlyphs(text);
  // A single letter is centred on its DESIGNED box, not on its ink. The source
  // table draws every glyph around x=50 with its side bearings already built
  // in, and several letters are deliberately asymmetric inside it — C's arc
  // stops at x=61.5 (a 60-degree opening), Q's tail runs out to x=80. Centring
  // those on ink would shove C left of A B D E F in the very same lane.
  if (items.length === 1) {
    items = [{ ...items[0], x: 0 }];
    width = letterStrokes.BOX.w;
  }
  const { scale, yBase } = textLaneGeometry({
    h, glyphH, heightUnits: LM.base - LM.capTop,
    inkTop: LM.capMarkTop, inkBottom: LM.desc,
  });
  const yTop = yBase - (LM.base - LM.capTop) * scale;
  const yMid = yBase - (LM.base - LM.capMid) * scale;
  const badges = glyphH >= 80;
  const parts = [schoolLines({ w, yTop, yBase, yMid })];
  const guideParts = [];
  const segW = w / reps;
  const gW = width * scale;
  for (let i = 0; i < reps; i++) {
    // emptyLast: the final slot stays BLANK — the "try one on your own" spot
    if (emptyLast && i === reps - 1) continue;
    const r = renderTextRep({
      items, x0: (i + 0.5) * segW - gW / 2, yBase, scale,
      isModel: i === 0, showGuides: i === 1, badges,
    });
    parts.push(r.rep);
    if (r.guides) guideParts.push(r.guides);
  }
  // guides last so dots, arrows and badges sit above the strokes, and outside
  // every rep group so the rep count stays `:scope > g`
  parts.push(guideParts.join(''));
  const strokeCount = items.reduce((n, it) => n + it.strokes.length, 0);
  return {
    svg: svgRoot({ width: w, height: h, label: lbl || `trace letter ${text}` }, parts.join(''),
      { 'data-lcs-prim': 'trace-letter', 'data-lcs-text': text,
        'data-lcs-reps': emptyLast ? reps - 1 : reps,
        'data-lcs-strokes': strokeCount,
        ...(emptyLast ? { 'data-lcs-empty-slot': '1' } : {}) }),
    width: w, height: h,
  };
}

/**
 * A whole-word tracing lane: solid teal centreline model, then dashed
 * repetitions, laid out letter by letter on shared school lines with the
 * dotted midline on the real x-height. NO start dots or arrows — a dot per
 * letter of a six-letter word is six coral spots, and the sight-word
 * instruction promises reading and tracing, not stroke order.
 * { text, w, h, glyphH, reps } -> { svg }
 */
function strokeWordLane({ text, w, h, glyphH, reps = 2, label: lbl }) {
  const { items, width } = letterStrokes.textGlyphs(text);
  const segW = w / reps;
  let { scale, yBase } = textLaneGeometry({
    h, glyphH, heightUnits: LM.base - LM.ascender,
    inkTop: LM.ascender, inkBottom: LM.desc,
  });
  // a long word in a narrow slot shrinks to fit rather than running over its
  // neighbour (fi/pt carry the longest sight words)
  const maxW = segW - 16;
  if (width * scale > maxW) scale = maxW / width;
  const yTop = yBase - (LM.base - LM.ascender) * scale;
  const yMid = yBase - (LM.base - LM.xTop) * scale;
  const parts = [schoolLines({ w, yTop, yBase, yMid })];
  const gW = width * scale;
  for (let i = 0; i < reps; i++) {
    parts.push(renderTextRep({
      items, x0: (i + 0.5) * segW - gW / 2, yBase, scale,
      isModel: i === 0, showGuides: false, badges: false,
    }).rep);
  }
  const strokeCount = items.reduce((n, it) => n + it.strokes.length, 0);
  return {
    svg: svgRoot({ width: w, height: h, label: lbl || `trace word ${text}` }, parts.join(''),
      { 'data-lcs-prim': 'trace-word', 'data-lcs-text': text,
        'data-lcs-reps': reps, 'data-lcs-strokes': strokeCount,
        'data-lcs-letters': items.length }),
    width: w, height: h,
  };
}

/**
 * An empty school-lines writing row (the "now write it yourself" lane).
 * `xHeight: true` rules it like a strokeWordLane — dotted line on the real
 * x-height rather than the arithmetic midpoint. K-239 stacks this row directly
 * under a word lane, so without it the child gets two differently-ruled line
 * sets a couple of pixels apart.
 */
function writingRow({ w, h, glyphH, xHeight = false }) {
  let yBase = h * 0.82;
  let yTop = yBase - glyphH;
  let yMid;
  if (xHeight) {
    // Rule the row exactly like strokeWordLane, by the same geometry, so the
    // two stacked line sets agree instead of sitting a few pixels apart.
    // This also restores the TOPLINE, which the flat `yBase - glyphH` loses:
    // K-239 passes writeH 66 with glyphH 64, so yTop lands at -9.9 and the
    // ascender guide is clipped off the top of the row. The child has been
    // asked to write on a two-line rule with no height to aim for.
    const g = textLaneGeometry({
      h, glyphH, heightUnits: LM.base - LM.ascender,
      inkTop: LM.ascender, inkBottom: LM.desc,
    });
    const span = (LM.base - LM.ascender) * g.scale;
    yBase = g.yBase;
    yTop = yBase - span;
    yMid = yBase - (LM.base - LM.xTop) * g.scale;
  }
  return {
    svg: svgRoot({ width: w, height: h, label: 'writing lines' },
      schoolLines({ w, yTop, yBase, yMid }), { 'data-lcs-prim': 'writing-row' }),
    width: w, height: h,
  };
}

function escText(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = { STROKES, strokeLane, glyphLane, strokeGlyphLane, strokeGlyphPairLane,
  strokeLetterLane, strokeWordLane, writingRow, schoolLines, renderPath, arrowHead };
