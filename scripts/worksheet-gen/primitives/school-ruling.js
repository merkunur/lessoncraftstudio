/**
 * school-ruling.js — the locale's own school writing ruling, placed on the
 * MEASURED ink of one vendored cursive unit (nt5-F `cursive-writing`, G2-377;
 * design docs/worksheet-gen/b6-designs/G2-377-cursive-writing.md §2).
 *
 * Why not trace-path.js schoolLines / rulingBlock: their x-line is tied to the
 * Nunito metrics; a Playwrite x-height would sit 2-6 px off its own line. Here
 * every line is derived from primitives/cursive-metrics.json['cursive-<unit>']
 * (tools/measure-cursive-metrics.js), never from a nominal ratio:
 *
 *   fs    = X / xHeight                    so the unit's x-height == the x-band
 *   A     = ascender (or max(ascender, cap) on a row that prints a capital)
 *   Dd    = descender (or max(descender, capDescender))
 *   rowH  = ceil((A + Dd) / xHeight · X) + 12       6 px air above and below the ink
 *   yB    = 6 + A·fs     (baseline)   yX = yB − X   (x-line)
 *   yTop  = yB − ascender·fs            yD = yB + descender·fs
 *
 * Kinds (the locale's kind is DATA in the bank, never code):
 *   us3    top line grid 1.5 · x-line grid 1 dashed 3 5 · baseline inkSoft 1.5 · descender space unlined, no tint
 *   lin4   top · x-line · baseline · descender line; grid 1.2, baseline inkSoft 1.5, Mittelband (tealSoft)
 *          between x-line and baseline; `dashHelpers` dashes the helper lines 2 3 (nl / da / no, panel call)
 *   doble  x-line + baseline only, the tealSoft band between; ascenders and descenders rise freely
 *   seyes  the French cahier: interline i (= X), a thin tealSoft line every i, the writing line every
 *          4 i inkSoft 1.3, tealSoft verticals every 4 i from the margin; no tint. Geometry via seyesGeometry().
 * Every kind draws the coral 1.5 margin rule at `marginX`, full height.
 *
 * Stamps: <svg data-lcs-prim="school-ruling" data-lcs-ruling data-lcs-unit data-lcs-x data-lcs-yb>;
 * every line carries data-lcs-line="top|x|base|desc|margin|seyes-thin|seyes-writing|seyes-vertical"
 * and its y (or x) in data-lcs-y (data-lcs-at for verticals), so qa/verify-school-ruling.js
 * can measure the EMITTED geometry against rulingGeometry() (a line moved 2 px FAILS).
 */
'use strict';
const path = require('path');
const { color } = require('./_tokens.js');

const METRICS = require(path.join(__dirname, 'cursive-metrics.json'));
const KINDS = ['us3', 'lin4', 'doble', 'seyes'];
const AIR = 6;

function metricsFor(unit) {
  const m = METRICS['cursive-' + unit];
  if (!m) throw new Error(`school-ruling: primitives/cursive-metrics.json has no "cursive-${unit}" (run tools/measure-cursive-metrics.js)`);
  return m;
}

const r2 = (v) => Math.round(v * 100) / 100;

/**
 * @param {{unit:string, kind:string, X:number, cap?:boolean}} o
 * @returns {{fs, X, yTop, yX, yB, yD, rowH, ratio, A, Dd, unit, kind, cap}}
 */
function rulingGeometry({ unit, kind, X, cap }) {
  if (!KINDS.includes(kind)) throw new Error(`school-ruling: unknown ruling kind "${kind}"`);
  if (kind === 'seyes') throw new Error('school-ruling: a Seyès row is placed by seyesGeometry() (the cahier pitch), not by rulingGeometry()');
  if (!(X > 0)) throw new Error(`school-ruling: X ${X} is not a size`);
  const m = metricsFor(unit);
  const fs = X / m.xHeight;
  const A = cap ? Math.max(m.ascender, m.cap) : m.ascender;
  const Dd = cap ? Math.max(m.descender, m.capDescender) : m.descender;
  const ratio = (A + Dd) / m.xHeight;
  const rowH = Math.ceil(ratio * X) + 2 * AIR;
  const yB = AIR + A * fs;
  return { unit, kind, cap: !!cap, X, fs: r2(fs), A, Dd, ratio, rowH, yB: r2(yB), yX: r2(yB - X), yTop: r2(yB - m.ascender * fs), yD: r2(yB + m.descender * fs) };
}

/**
 * The French cahier: rows sit on writing lines (every 4 i). A base block is 12 i: 3 i of room above
 * row A's writing line for the ascenders, row B on the next writing line 4 i below, then one skipped
 * line ("on saute une ligne") so a printed descender never meets the next printed ascender; the LAST
 * block stops 2 i under row B's line (its descenders), so a lesson of N blocks is (12 N − 3) i tall.
 */
function seyesGeometry({ unit, i, rows = 2, last = false }) {
  if (!(i > 0)) throw new Error(`school-ruling: Seyès interline ${i} is not a size`);
  const m = metricsFor(unit);
  const fs = i / m.xHeight;
  const baselines = Array.from({ length: rows }, (_, k) => r2((3 + 4 * k) * i));
  const height = r2((last ? 3 + 4 * (rows - 1) + 2 : 12 + 4 * (rows - 2)) * i);
  return { unit, kind: 'seyes', X: i, i, fs: r2(fs), baselines, height, ascI: m.ascender * fs / i, descI: m.descender * fs / i };
}

function hline(y, w, x0, stroke, width, kind, dash) {
  return `<line x1="${x0}" y1="${y}" x2="${w}" y2="${y}" stroke="${stroke}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''} data-lcs-line="${kind}" data-lcs-y="${y}"/>`;
}

/**
 * @param {{kind, w, geom, marginX, tint?, dashHelpers?, height?}} o  geom = rulingGeometry() | seyesGeometry()
 * @returns {string} the SVG (absolutely positioned by the caller)
 */
function schoolRuling({ kind, w, geom, marginX, tint = true, dashHelpers = false }) {
  if (!geom || geom.kind !== kind) throw new Error(`school-ruling: geometry for "${geom && geom.kind}" drawn as "${kind}"`);
  if (!(w > 0) || !(marginX > 0 && marginX < w)) throw new Error(`school-ruling: width ${w} / margin ${marginX} do not fit`);
  const H = kind === 'seyes' ? geom.height : geom.rowH;
  const parts = [];
  if (kind === 'seyes') {
    const i = geom.i;
    const n = Math.floor(H / i + 1e-6);
    for (let k = 0; k <= n; k++) {
      const y = r2(k * i);
      const writing = geom.baselines.includes(y) || (k % 4 === 3 && k * i <= H);
      if (writing) parts.push(hline(y, w, 0, color.inkSoft, 1.3, 'seyes-writing'));
      else parts.push(hline(y, w, 0, color.tealSoft, 1, 'seyes-thin'));
    }
    for (let x = marginX + 4 * i; x < w; x += 4 * i) {
      const xx = r2(x);
      parts.push(`<line x1="${xx}" y1="0" x2="${xx}" y2="${H}" stroke="${color.tealSoft}" stroke-width="1" data-lcs-line="seyes-vertical" data-lcs-at="${xx}"/>`);
    }
  } else {
    const { yTop, yX, yB, yD } = geom;
    if (kind !== 'us3' && tint) parts.push(`<rect x="${marginX}" y="${yX}" width="${r2(w - marginX)}" height="${r2(yB - yX)}" fill="${color.tealSoft}" data-lcs-band="mittelband"/>`);
    if (kind === 'us3') {
      parts.push(hline(yTop, w, 0, color.grid, 1.5, 'top'));
      parts.push(hline(yX, w, 0, color.grid, 1, 'x', '3 5'));
      parts.push(hline(yB, w, 0, color.inkSoft, 1.5, 'base'));
    } else if (kind === 'lin4') {
      const dash = dashHelpers ? '2 3' : null;
      parts.push(hline(yTop, w, 0, color.grid, 1.2, 'top', dash));
      parts.push(hline(yX, w, 0, color.grid, 1.2, 'x', dash));
      parts.push(hline(yB, w, 0, color.inkSoft, 1.5, 'base'));
      parts.push(hline(yD, w, 0, color.grid, 1.2, 'desc', dash));
    } else {   // doble
      parts.push(hline(yX, w, 0, color.grid, 1.2, 'x'));
      parts.push(hline(yB, w, 0, color.inkSoft, 1.5, 'base'));
    }
  }
  parts.push(`<line x1="${marginX}" y1="0" x2="${marginX}" y2="${H}" stroke="${color.coral}" stroke-width="1.5" data-lcs-line="margin" data-lcs-at="${marginX}"/>`);
  const yb = kind === 'seyes' ? geom.baselines.join(',') : geom.yB;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" aria-hidden="true" style="position:absolute;left:0;top:0;overflow:visible"` +
    ` data-lcs-prim="school-ruling" data-lcs-ruling="${kind}" data-lcs-unit="${geom.unit}" data-lcs-x="${geom.X}" data-lcs-yb="${yb}">${parts.join('')}</svg>`;
}

module.exports = { rulingGeometry, seyesGeometry, schoolRuling, metricsFor, KINDS, AIR };
