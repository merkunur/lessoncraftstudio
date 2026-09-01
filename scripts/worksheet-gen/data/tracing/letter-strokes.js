/**
 * letter-strokes.js — CENTERLINE stroke paths for LETTER + WORD tracing.
 *
 * The letter counterpart of digit-strokes.js, and the "deliberate later
 * commission" letter-sets.js names in its own header. It exists because the
 * previous letter tracing stroked a FILLED font outline (Baloo 2 / Nunito at
 * weight 700, fill:none + dashed stroke), which necessarily paints TWO dashed
 * contours per stem — the hollow double-line the operator rejected. A font
 * outline also cannot yield a start point or a stroke direction, so no arrows
 * were possible. See probe-tracing/trace-glyph.js:8-12, which argued exactly
 * this before the outline route shipped anyway.
 *
 * SOURCE OF TRUTH — NOT re-authored here. The 52 letterforms A-Z + a-z come
 * from `mini tools/alphabet-trace-core.js`, a type-panel-ruled, build-gated
 * (scripts/verify-alphabet-trace-core.js) centreline table already shipped for
 * the interactive "Penny's Alphabet Trace" activity. Consuming it directly is
 * the §10.4 read-from-SoT rule: one letterform for the whole platform, and the
 * printable pages inherit its rulings for free (counter-clockwise round forms,
 * stem-first b/p vs bowl-first d/q reversal safety, single-storey school `a`
 * and `g` — forms no display font gives us).
 *
 * This module adds only what that table does not carry:
 *   - conversion of its point arrays to SVG path `d` (Catmull-Rom spline);
 *   - a DERIVED start angle per stroke (digit-strokes.js authored these by
 *     hand; the point data already encodes direction, so deriving removes a
 *     whole class of hand-typed error);
 *   - advance widths, so words can be laid out letter by letter;
 *   - the accent layer (6 marks, composed onto a base letter) and the two
 *     genuinely new letterforms the Nordic capitals need (AE, O-slash).
 *
 * Coordinate box: 100 x 100, y down, shared with the source table.
 *   accent band (caps)  2..12      ascender  14      cap top   16
 *   accent band (lower) 27..37     x-height  44      baseline  84
 *   Q tail              92         descender 96
 * Every capital's ink touches 16 and 84 exactly; every x-height lowercase
 * touches 44 and 84 exactly (measured across all 52, not assumed).
 *
 * Unknown glyph => THROW. A tracing page that silently drops or substitutes a
 * letter is worse than one that refuses to build.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const CORE_PATH = path.join(__dirname, '..', '..', '..', '..', 'mini tools', 'alphabet-trace-core.js');

/** Shared vertical metrics (glyph units, y down). */
const METRICS = {
  // Accent bands. A capital has only 16 units of headroom above the cap line,
  // so the band uses nearly all of it — a ring drawn much smaller than this
  // reads as a stray speck floating over the A rather than as part of Angstrom A.
  capMarkTop: 1, capMarkH: 13,
  loMarkTop: 25, loMarkH: 12,
  ascender: 14,
  capTop: 16,
  // The dotted rule on a CAPITALS page. Not the x-height (44): the source
  // table puts E/F/H crossbars at the OPTICAL centre 48, and a full-width bar
  // sitting 4 units off its own guide line is the first thing the eye catches.
  // B's waist (49), K's junction and R's bowl (50) sit within 2 units of it;
  // no single rule satisfies all of them, and 48 is the closest to most.
  capMid: 48,
  xTop: 44,
  base: 84,
  desc: 96,
};
const BOX = { w: 100, h: 100 };

/** Advance-width model: ink width, floored, plus a side bearing each side. */
const SIDEBEARING = 7;
const MIN_INK = 8;

/* ------------------------------------------------------------------ *
 * Load the shared letterform table (same mechanism its own gate uses).
 * ------------------------------------------------------------------ */
function loadCore() {
  const src = fs.readFileSync(CORE_PATH, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.AlphabetTraceCore || !win.AlphabetTraceCore.GLYPHS) {
    throw new Error('letter-strokes: alphabet-trace-core.js did not attach AlphabetTraceCore.GLYPHS');
  }
  return win.AlphabetTraceCore;
}
const CORE = loadCore();
const arc = CORE.arc;
const line = CORE.line;

/* ------------------------------------------------------------------ *
 * Geometry helpers
 * ------------------------------------------------------------------ */

/** Catmull-Rom -> cubic Bezier; the curve PASSES THROUGH every authored point.
 *  Ported from mini tools/penny-alphabet-trace-activity.js so the printable and
 *  the interactive activity draw the same letterform. */
function splinePath(pts) {
  if (!pts || !pts.length) return '';
  if (pts.length < 3) return 'M ' + pts.map(function (p) { return p.x + ' ' + p.y; }).join(' L ');
  let d = 'M ' + pts[0].x + ' ' + pts[0].y;
  for (let k = 0; k < pts.length - 1; k++) {
    const p0 = pts[k - 1] || pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ' C ' + c1x.toFixed(2) + ' ' + c1y.toFixed(2) + ' ' +
         c2x.toFixed(2) + ' ' + c2y.toFixed(2) + ' ' + p2.x + ' ' + p2.y;
  }
  return d;
}

/** Start-direction of a stroke in degrees (SVG screen coords), for the arrowhead. */
function angleOf(pts) {
  const a = pts[0], b = pts[1] || pts[0];
  const dx = b.x - a.x, dy = b.y - a.y;
  if (dx === 0 && dy === 0) return 0;
  return Math.round(Math.atan2(dy, dx) * 180 / Math.PI * 10) / 10;
}

function bboxOf(pts) {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const p of pts) {
    if (p.x < x0) x0 = p.x;
    if (p.x > x1) x1 = p.x;
    if (p.y < y0) y0 = p.y;
    if (p.y > y1) y1 = p.y;
  }
  return { x0, x1, y0, y1 };
}

function inkBBox(strokes) {
  const all = [];
  for (const s of strokes) for (const p of s) all.push(p);
  return bboxOf(all);
}

/** The i/j tittle: a 2-point tick above the x-line. An accent REPLACES it. */
function isTittle(pts) {
  if (pts.length > 2) return false;
  const b = bboxOf(pts);
  return b.y1 <= METRICS.xTop && (b.x1 - b.x0) <= 2 && (b.y1 - b.y0) <= 5;
}

/* ------------------------------------------------------------------ *
 * The accent layer. Each mark is authored as ordered points in a band
 * [ty, ty+markH], centred on the base letter's own ink centre.
 * ------------------------------------------------------------------ */
function tildePts(cx, ty, by) {
  const w = 9, amp = (by - ty) / 2, mid = (ty + by) / 2, pts = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    pts.push({
      x: Math.round((cx - w + 2 * w * t) * 10) / 10,
      y: Math.round((mid - amp * Math.sin(2 * Math.PI * t)) * 10) / 10,
    });
  }
  return pts;
}

function markStrokes(kind, cx, ty, mh) {
  const by = ty + mh;
  const mid = ty + mh / 2;
  const r = mh / 2;
  switch (kind) {
    case 'acute': return [line(cx - 6, by, cx + 6, ty, 3)];
    case 'grave': return [line(cx - 6, ty, cx + 6, by, 3)];
    case 'circumflex': return [line(cx - 8, by, cx, ty, 2).concat(line(cx, ty, cx + 8, by, 2).slice(1))];
    case 'tilde': return [tildePts(cx, ty, by)];
    // two short ticks, not two filled dots: a tick is what a child's pencil can
    // follow. Kept to 5 units so an umlaut reads as two dots, not two dashes.
    case 'diaeresis': return [line(cx - 7, mid - 2.5, cx - 7, mid + 2.5, 1), line(cx + 7, mid - 2.5, cx + 7, mid + 2.5, 1)];
    // counter-clockwise from the top, matching every round form in the table
    case 'ring': return [arc(cx, mid, r, r, 270, -90, 12)];
    default: throw new Error('letter-strokes: unknown accent mark "' + kind + '"');
  }
}

/** ch -> [base letter, mark]. Precomposed keys only. */
const COMPOSED = {
  'Ä': ['A', 'diaeresis'], 'Ö': ['O', 'diaeresis'], 'Ü': ['U', 'diaeresis'],
  'Å': ['A', 'ring'], 'Á': ['A', 'acute'], 'À': ['A', 'grave'], 'Â': ['A', 'circumflex'],
  'É': ['E', 'acute'], 'È': ['E', 'grave'], 'Ê': ['E', 'circumflex'], 'Ë': ['E', 'diaeresis'],
  'Í': ['I', 'acute'], 'Ó': ['O', 'acute'], 'Ô': ['O', 'circumflex'], 'Õ': ['O', 'tilde'],
  'Ú': ['U', 'acute'], 'Ù': ['U', 'grave'], 'Ñ': ['N', 'tilde'],
  'á': ['a', 'acute'], 'à': ['a', 'grave'], 'â': ['a', 'circumflex'], 'ã': ['a', 'tilde'],
  'ä': ['a', 'diaeresis'], 'å': ['a', 'ring'],
  'é': ['e', 'acute'], 'è': ['e', 'grave'], 'ê': ['e', 'circumflex'], 'ë': ['e', 'diaeresis'],
  'í': ['i', 'acute'], 'ì': ['i', 'grave'], 'î': ['i', 'circumflex'], 'ï': ['i', 'diaeresis'],
  'ñ': ['n', 'tilde'],
  'ó': ['o', 'acute'], 'ò': ['o', 'grave'], 'ô': ['o', 'circumflex'], 'õ': ['o', 'tilde'],
  'ö': ['o', 'diaeresis'],
  'ú': ['u', 'acute'], 'ù': ['u', 'grave'], 'û': ['u', 'circumflex'], 'ü': ['u', 'diaeresis'],
  'ý': ['y', 'acute'], 'ÿ': ['y', 'diaeresis'],
};

/** Affine-map a stroke's points. Lets a ligature be built out of the source
 *  table's own verified letterforms rather than a fresh hand-typed point list —
 *  the same reasoning that makes O-slash the O plus one line. */
/** An explicit point list, for a contour no arc/line combination describes. */
function pl() {
  const a = [];
  for (let i = 0; i < arguments.length; i += 2) a.push({ x: arguments[i], y: arguments[i + 1] });
  return a;
}

function xform(pts, o) {
  const sx = o.sx == null ? 1 : o.sx, sy = o.sy == null ? 1 : o.sy;
  const dx = o.dx || 0, dy = o.dy || 0;
  return pts.map(function (p) {
    return { x: Math.round((p.x * sx + dx) * 10) / 10, y: Math.round((p.y * sy + dy) * 10) / 10 };
  });
}

/* ------------------------------------------------------------------ *
 * The letterforms the source table does not carry. Danish + Norwegian
 * teach both as letters in their own right (letter-sets.js specials).
 * ------------------------------------------------------------------ */
const NEW_GLYPHS = {
  // AE ligature: the A's right leg IS the E's stem, so one vertical serves
  // both. Stroke order follows the table's own A (apex first) then E (stem,
  // then bars top to bottom).
  'Æ': [
    line(44, 16, 18, 84, 5),
    line(44, 16, 44, 84, 6),
    line(44, 16, 82, 16, 3),
    // ONE middle bar crossing the whole ligature. The A's crossbar and the E's
    // middle arm are the same horizontal stroke in Æ — drawing them at two
    // different heights (58 and 48) made the letter read as an A jammed into an
    // E. x starts at 32, which is where the left diagonal actually is at y=48.
    line(32, 48, 74, 48, 4),
    line(44, 84, 82, 84, 3),
  ],
  // O-slash: the table's O, then one diagonal, baseline corner to cap corner.
  'Ø': CORE.GLYPHS['O'].concat([line(26, 84, 74, 16, 4)]),
  'ø': CORE.GLYPHS['o'].concat([line(26, 86, 74, 42, 4)]),

  // ae ligature (da/no). Built from the table's OWN `a` and `e`, mapped into
  // the two halves of the box, so both bowls keep the letterforms the type
  // panel ruled — an `a` on the left, not an `o` (that would be the different
  // letter oe). The a's right stem IS the junction the e attaches to, which is
  // why it lands exactly where the e begins.
  'æ': [
    xform(CORE.GLYPHS['a'][0], { sx: 0.947, dx: -14.4 }),   // bowl  -> x 14..50
    xform(CORE.GLYPHS['a'][1], { sx: 0.947, dx: -14.4 }),   // stem  -> x 50
    xform(CORE.GLYPHS['e'][0], { dx: 18 }),                  // e     -> x 50..86
  ],

  // Eszett (de). A lowercase-ONLY letter — no capital form exists, which is
  // exactly why the capitals page could never carry it.
  //
  // The topology is what separates it from a B, and the first attempt here got
  // it wrong: two arcs each closing back onto the stem rendered a legible B.
  // In a real eszett the contour meets the stem ONLY AT THE TOP; it arches
  // over, comes down the right, pinches to a WAIST out in the middle of the
  // letter (not against the stem), bulges out again, and ends in a FREE tail
  // short of the stem. One continuous stroke, as the hand draws it.
  'ß': [
    line(30, 14, 30, 84, 7),
    pl(30, 16, 38, 14, 45, 18, 47, 26, 45, 34, 40, 40,
       47, 44, 54, 52, 57, 63, 54, 75, 48, 82, 42, 84),
  ],
};

/* ------------------------------------------------------------------ *
 * Resolution
 * ------------------------------------------------------------------ */
const _cache = new Map();

function rawStrokes(ch) {
  if (NEW_GLYPHS[ch]) return NEW_GLYPHS[ch];
  if (CORE.GLYPHS[ch]) return CORE.GLYPHS[ch];
  const comp = COMPOSED[ch];
  if (!comp) {
    throw new Error('letter-strokes: no stroke data for "' + ch + '" (U+' +
      ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0') + ')');
  }
  const baseCh = comp[0], mark = comp[1];
  const baseRaw = CORE.GLYPHS[baseCh];
  if (!baseRaw) throw new Error('letter-strokes: composed base "' + baseCh + '" missing for "' + ch + '"');
  // an accent REPLACES the i/j tittle — never sits on top of it
  const base = baseRaw.filter(function (s) { return !isTittle(s); });
  const isLower = baseCh !== baseCh.toUpperCase();
  const bb = inkBBox(base);
  const cx = Math.round((bb.x0 + bb.x1) / 2 * 10) / 10;
  const marks = markStrokes(mark, cx,
    isLower ? METRICS.loMarkTop : METRICS.capMarkTop,
    isLower ? METRICS.loMarkH : METRICS.capMarkH);
  // tag the mark strokes: they are drawn dashed like any other stroke, but a
  // start dot is wider than an umlaut tick and its arrow would land on the
  // letter body, so the renderer suppresses guides on them
  marks.forEach(function (m) { m.isMark = true; });
  return base.concat(marks);
}

/**
 * One glyph, ready to render.
 * @returns {{ ch, strokes: Array<{d, angle}>, ink: {x0,x1,y0,y1}, adv: number }}
 */
function glyphFor(ch) {
  if (_cache.has(ch)) return _cache.get(ch);
  const raw = rawStrokes(ch);
  const ink = inkBBox(raw);
  const g = {
    ch,
    strokes: raw.map(function (pts) {
      return { d: splinePath(pts), angle: angleOf(pts), mark: !!pts.isMark };
    }),
    ink,
    adv: Math.max(ink.x1 - ink.x0, MIN_INK) + 2 * SIDEBEARING,
  };
  _cache.set(ch, g);
  return g;
}

/**
 * Lay a string out left to right. Each glyph is placed by its INK-LEFT edge,
 * not by its box, so overhanging letters (j's hook starts 26 units left of its
 * stem; f, t) tuck under the previous letter instead of colliding with it.
 * @returns {{ items: Array<{ch, strokes, x, ink, adv}>, width: number }}
 *   `x` is the translate to apply to that glyph's own coordinates.
 */
function textGlyphs(text) {
  const items = [];
  let pen = 0;
  for (const ch of String(text)) {
    const g = glyphFor(ch);
    items.push({
      ch,
      strokes: g.strokes,
      x: Math.round((pen + SIDEBEARING - g.ink.x0) * 100) / 100,
      ink: g.ink,
      adv: g.adv,
    });
    pen += g.adv;
  }
  return { items, width: pen };
}

module.exports = {
  METRICS, BOX, SIDEBEARING, MIN_INK,
  COMPOSED, NEW_GLYPHS,
  glyphFor, textGlyphs, splinePath, angleOf, inkBBox, bboxOf, isTittle,
  CORE_GLYPHS: CORE.GLYPHS,
};
