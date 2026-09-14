/**
 * components-b3/sound-boxes.js — the K-318 `sound-boxes` family components
 * (design: docs/worksheet-gen/b3-designs/K-318-sound-boxes.md §2). Merged into
 * the templates/components-b3.js namespace; every drawing is inline SVG on the
 * token palette, ground truth rides on data-lcs-* attributes, and the WORD is
 * never printed by the base (only `printed:true`, the Blend face, prints
 * graphemes; `starter` prints exactly one box).
 *
 * Exports (all NEW, per the design file):
 *   soundBoxes({chunks, box, gap, wide, dash, starter, printed, uniform})
 *       one dashed coral box per grapheme; a multigraph (>= 2 letters) is a
 *       1.5x-wide box with a teal tie arc under it (one sound, more letters).
 *       `uniform:N` ignores the chunks and draws N equal boxes (Sound Strip).
 *   hakDots({centers, filled})   nl hak-stippen: one teal dot over each box centre
 *   soundLane({w, h})            a white dashed lane with NO ticks (Count face)
 * The syllable arcs of the Tiers face come from G1-305's shared
 * primitives/syllable-arcs.js (ONE primitive for both types — that design file
 * owns it), so nothing arc-shaped is defined here.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, roundedRect, circle, label, el } = require('../../primitives/_svg.js');

const T = tokens.color;
const F = tokens.font;

/** Box widths for a chunk list: a multigraph box is round(box × wide). */
function boxWidths(chunks, box, wide) {
  return chunks.map((c) => ([...String(c)].length >= 2 ? Math.round(box * wide) : box));
}

/** Total row width = Σ widths + gap·(n−1) + 2 (one px of stroke air each side). */
function rowWidth(widths, gap) {
  return widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1) + 2;
}

function soundBoxes({ chunks, box = 48, gap = 8, wide = 1.5, dash = '6 5', starter = null, printed = false, uniform = null }) {
  const list = uniform ? Array.from({ length: uniform }, () => '') : chunks.map(String);
  const widths = uniform ? list.map(() => box) : boxWidths(list, box, wide);
  const anyWide = !uniform && widths.some((w) => w !== box);
  const W = rowWidth(widths, gap);
  const H = box + 2 + (anyWide ? 8 : 0);   // 8 px tie allowance (design 10; re-budgeted at the measured 710 px body)
  const parts = [];
  const centers = [];
  let x = 1;
  const y = 1;
  list.forEach((c, i) => {
    const w = widths[i];
    const isWide = !uniform && w !== box;
    parts.push(roundedRect({
      x, y, w, h: box, r: 8, fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash,
      data: { 'data-lcs-box': i, 'data-lcs-wide': isWide ? 1 : 0 },
    }));
    if (isWide) {
      // the tie arc: one sound, more letters — hangs under the wide box only
      parts.push(el('path', {
        d: `M${x + 6},${y + box + 2.5} Q${x + w / 2},${y + box + 9} ${x + w - 6},${y + box + 2.5}`,
        fill: 'none', stroke: T.teal, 'stroke-width': 2, 'stroke-linecap': 'round', 'data-lcs-tie': i,
      }));
    }
    const text = printed ? c : (starter && starter.i === i ? starter.text : null);
    if (text != null && text !== '') {
      parts.push(label({
        x: x + w / 2, y: y + box / 2 + 1, text, size: 26, color: T.teal, fontFamily: F.display, weight: 700, anchor: 'middle',
        data: { 'data-lcs-printed': i },
      }));
    }
    centers.push(x + w / 2);
    x += w + gap;
  });
  const svg = svgRoot({ width: W, height: H, label: `${list.length} sound boxes` }, parts.join(''), {
    'data-lcs-soundboxes': list.length,
    ...(uniform ? { 'data-lcs-strip': uniform } : {}),
    ...(anyWide ? { 'data-lcs-anywide': 1 } : {}),
  });
  return { svg, width: W, height: H, centers, widths };
}

/** nl hak-stippen: a filled teal dot above every box centre; 12 px tall, the row's width. */
function hakDots({ centers, width, filled = true }) {
  const W = width || (Math.max(...centers) + 8);
  const dots = centers.map((cx, i) => circle({
    cx, cy: 6, r: 5, fill: filled ? T.teal : T.white, strokeColor: T.teal, strokeWidth: filled ? 0 : 2,
    data: { 'data-lcs-dot': i },
  })).join('');
  return svgRoot({ width: W, height: 12, label: `${centers.length} dots` }, dots, { 'data-lcs-hakdots': centers.length });
}

/** A white rounded lane, dashed coral, no ticks (a tick would disclose the count). */
function soundLane({ w, h = 56 }) {
  return svgRoot({ width: w + 2, height: h + 2, label: 'sound lane' },
    roundedRect({ x: 1, y: 1, w, h, r: 10, fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash: '6 5' }),
    { 'data-lcs-soundlane': 1 });
}

module.exports = { soundBoxes, hakDots, soundLane };
