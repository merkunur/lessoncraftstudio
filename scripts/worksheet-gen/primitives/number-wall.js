/**
 * numberWall — Zahlenmauer / number-pyramid primitive (SVG). nt20-B G1-246.
 *
 * A masonry pyramid: course 0 (the base) has n bricks, each higher course one
 * fewer and offset by half a brick, so "each brick = the sum of the two below
 * it" is visible without a word. Given bricks are white with a teal stroke and
 * a printed numeral; blank bricks are white with a dashed coral stroke and NO
 * text — the child writes. Every brick carries its ground-truth value; blanks
 * also carry data-lcs-answer.
 *
 * { base:[…], blanks:Set<'r,c'>|Array, brick:{w,h}, radius } → { svg, values:[[…]…], width, height }
 * values[r][c]; r = 0 is the base.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, el, esc } = require('./_svg.js');

function pyramidValues(base) {
  const rows = [base.slice()];
  while (rows[rows.length - 1].length > 1) {
    const prev = rows[rows.length - 1];
    rows.push(prev.slice(0, -1).map((v, i) => v + prev[i + 1]));
  }
  return rows;
}

function numberWall({ base, blanks = [], brick = { w: 88, h: 52 }, radius = 8 }) {
  const t = tokens;
  const blankSet = new Set(Array.isArray(blanks) ? blanks : [...blanks]);
  const values = pyramidValues(base);
  const n = base.length;
  const W = n * brick.w + 4, H = n * brick.h + 4;
  const fs = brick.w >= 84 ? 28 : 26;
  const parts = [];
  for (let r = 0; r < values.length; r++) {
    const y = 2 + (n - 1 - r) * brick.h;
    for (let c = 0; c < values[r].length; c++) {
      const x = 2 + r * brick.w / 2 + c * brick.w;
      const key = `${r},${c}`;
      const isBlank = blankSet.has(key);
      const v = values[r][c];
      const rect = roundedRect({
        x: x + 3, y: y + 3, w: brick.w - 6, h: brick.h - 6, r: radius,
        fill: t.color.white,
        strokeColor: isBlank ? t.color.coral : t.color.teal, strokeWidth: 2.5,
        dash: isBlank ? '6 5' : undefined,
      });
      const text = isBlank ? '' : el('text', {
        x: x + brick.w / 2, y: y + brick.h / 2 + 1, 'font-family': t.font.display, 'font-size': fs, 'font-weight': 700,
        fill: t.color.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central',
      }, esc(v));
      parts.push(el('g', {
        'data-lcs-brick': key, 'data-lcs-value': v,
        ...(isBlank ? { 'data-lcs-blank': '1', 'data-lcs-answer': v } : { 'data-lcs-given': '1' }),
      }, rect + text));
    }
  }
  return {
    svg: svgRoot({ width: W, height: H, label: `number wall with base ${base.join(', ')}` }, parts.join(''), {
      'data-lcs-prim': 'number-wall', 'data-lcs-rows': n, 'data-lcs-base': base.join(','),
    }),
    values, width: W, height: H,
  };
}

/**
 * Propagation solver — the uniqueness oracle: from the GIVEN set only, repeat
 * {two known lower bricks → the upper is known; an upper and one lower known →
 * the other lower known} to a fixpoint. Returns true iff every brick resolves.
 * Used by G1-246's build (to refuse an unsolvable page) and re-implemented
 * inline by its verify().
 */
function solvable(n, givenSet) {
  const known = new Set(givenSet);
  let changed = true;
  while (changed) {
    changed = false;
    for (let r = 1; r < n; r++) for (let c = 0; c < n - r; c++) {
      const up = `${r},${c}`, a = `${r - 1},${c}`, b = `${r - 1},${c + 1}`;
      if (!known.has(up) && known.has(a) && known.has(b)) { known.add(up); changed = true; }
      if (known.has(up) && known.has(a) && !known.has(b)) { known.add(b); changed = true; }
      if (known.has(up) && known.has(b) && !known.has(a)) { known.add(a); changed = true; }
    }
  }
  let total = 0; for (let r = 0; r < n; r++) total += n - r;
  return known.size === total;
}

module.exports = Object.assign(numberWall, { pyramidValues, solvable });
