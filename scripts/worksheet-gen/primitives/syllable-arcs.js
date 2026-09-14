/**
 * syllable-arcs.js — ONE primitive for the two syllable families (nt20-C):
 * G1-305 `syllable-split` passes spans computed from equal letter CELLS,
 * K-318 `sound-boxes` passes spans from its grapheme box clusters.
 *
 *   syllableArcs({ spans:[{x,w}], w, h=26, mode='printed'|'blank'|'dotted', dots=0, strokeW=3 })
 *     → `<svg data-lcs-arcs=n data-lcs-arcmode=mode>`
 *
 *   printed  one bowl per span: `M x+4,3 Q x+w/2,h·0.95 x+w-4,3`, T.teal,
 *            round caps (the split is the GIVEN — Vowel King, K-318 tiers).
 *   dotted   the same bowls, dashed (K-318 only; a trace-me scaffold).
 *   blank    NO span is emitted (the split is the ANSWER): a 1 px `T.grid`
 *            shelf across `w` at y 2, plus `dots` count-hint circles r 4
 *            `T.teal` at x = w·(i+0.5)/dots, y 14 — evenly spaced, so they
 *            never encode a boundary. data-lcs-arcs is 0 in blank mode: the
 *            attribute must never leak the count the child is to find.
 *
 * `w` defaults to the right edge of the last span. `gap` (K-318's signature)
 * is accepted and ignored — the caller lays the spans out. Token colours
 * only (qa/lints.js palette).
 */
'use strict';
const { svgRoot, line, circle, el } = require('./_svg.js');
const T = require('./_tokens.js').color;

function bowlPath({ x, w }, h) {
  const x1 = +(x + 4).toFixed(2), x2 = +(x + w - 4).toFixed(2);
  const cx = +(x + w / 2).toFixed(2), cy = +(h * 0.95).toFixed(2);
  return `M ${x1},3 Q ${cx},${cy} ${x2},3`;
}

function syllableArcs({ spans, w, h = 26, mode = 'printed', dots = 0, strokeW = 3 } = {}) {
  const sp = Array.isArray(spans) ? spans : [];
  if (!['printed', 'blank', 'dotted'].includes(mode)) throw new Error('syllableArcs: unknown mode ' + mode);
  const width = w != null ? w : (sp.length ? Math.ceil(sp[sp.length - 1].x + sp[sp.length - 1].w) : 0);
  if (!(width > 0)) throw new Error('syllableArcs: width must be > 0 (pass w or spans)');
  const parts = [];
  let n = 0;
  if (mode === 'blank') {
    parts.push(line({ x1: 0, y1: 2, x2: width, y2: 2, strokeColor: T.grid, strokeWidth: 1, cap: 'butt', data: { 'data-lcs-shelf': 1 } }));
    const k = Math.max(0, dots | 0);
    for (let i = 0; i < k; i++) {
      parts.push(circle({ cx: +(width * (i + 0.5) / k).toFixed(2), cy: 14, r: 4, fill: T.teal, data: { 'data-lcs-dot': i + 1 } }));
    }
  } else {
    if (!sp.length) throw new Error('syllableArcs: ' + mode + ' mode needs spans');
    n = sp.length;
    sp.forEach((s, i) => {
      parts.push(el('path', {
        d: bowlPath(s, h), fill: 'none', stroke: T.teal, 'stroke-width': strokeW,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        'stroke-dasharray': mode === 'dotted' ? '6 5' : undefined,
        'data-lcs-arc': i + 1,
      }));
    });
  }
  return svgRoot({ width, height: h, label: mode === 'blank' ? 'syllable marking space' : 'syllable arcs' }, parts,
    { 'data-lcs-arcs': n, 'data-lcs-arcmode': mode, 'data-lcs-dots': mode === 'blank' ? Math.max(0, dots | 0) : 0 });
}

module.exports = { syllableArcs, bowlPath };
