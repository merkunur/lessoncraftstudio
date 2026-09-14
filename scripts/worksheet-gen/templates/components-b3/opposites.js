/**
 * components-b3/opposites.js — the G1-307 `opposites` family components
 * (design: docs/worksheet-gen/b3-designs/G1-307-opposites.md §2 "NEW in
 * templates/components-b3.js"). Merged into the templates/components-b3.js
 * namespace; only the components the BASE consumes are exported here
 * (`oppositeArrow`, `pairCard`) plus the base's card body (`oppositeCard`),
 * lifted out of the spec so the gate can build a page past the spec's guards.
 * The five face components the design names (`matchColumns`, `frameRow`,
 * `pairLane`, `choiceRow`, `prefixChips`) are Phase 2 — nothing on the base
 * consumes them, so they are not exported yet (the K-317 / K-319 convention);
 * `matchColumns` stays a free name (K-319 exports `feelingMatch`).
 *
 *   oppositeArrow({ w = 36, h = 20 })
 *     One shaft with two opposed heads, T.teal, stroke 3, round caps, on the
 *     token palette only. `data-lcs-opp-arrow`, aria-hidden — decoration, never
 *     an answer. 48×24 is the F3 lane separator size.
 *
 *   pairCard({ picA:{src}, picB:{src}, transformB:'scale'|'none', size = 80,
 *              w = 160, h = 88, cueKey })
 *     A WHITE tile with two `.ws-icon` pictures baseline-aligned (the K-032
 *     size-compare idiom): `scale` prints ONE noun twice, picA at `size`, picB
 *     at max(44, round(size·0.55)) — never below the G1 floor, no mirror, no X,
 *     no opacity; `none` prints two different nouns both at round(size·0.72)
 *     (≥ 44 from size 62). The box defaults to the icons + gap 10 + padding 8
 *     + border 2 each side (`w`/`h` may only widen it).
 *     The cue is a picture of the RELATION (both states); no word rides on it.
 *     Stamps `data-lcs-cue-key` (= the pair id; verify checks it against the
 *     card's `data-lcs-pair`) and `data-lcs-cue-kind`.
 *
 *   oppositeCard({ given, pair, a, b, dir, wordPx, laneW, laneH, glyphH,
 *                  cue = null })
 *     The base's card body: `<div class="ws-card-stage" data-ws-content …>`
 *     stamped `data-lcs-pair` / `data-lcs-a` / `data-lcs-b` / `data-lcs-dir`
 *     ("ab" = a is printed) — line 1 = arrow + the GIVEN word (Baloo 2 700
 *     `wordPx`, `data-lcs-given`) with the optional `pairCard` cue right-aligned
 *     on the SAME line (design deviation 1 in the build record: the design's
 *     d1 stack forgot the word line; beside the word the cue costs no height);
 *     `line1H` = the page's uniform line-1 height (the cue height at d1) so
 *     every lane on the page sits at the same y; line 1 carries margin-left 20
 *     so the arrow clears the 30 px card badge; the stage distributes its slack
 *     `space-evenly`. Line 2 = one empty `writingRow` (`data-lcs-prim=
 *     "writing-row"`). The written word appears NOWHERE on the card — only in
 *     the bank.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');

const T = tokens.color;
const F = tokens.font;
const G1_FLOOR = tokens.density.G1.minElement;   // 44

function oppositeArrow({ w = 36, h = 20 } = {}) {
  const y = h / 2;
  const head = Math.max(5, Math.round(h * 0.32));
  const d = `M${head + 2} ${y} H ${w - head - 2} ` +
    `M${head + 2} ${y} L ${head + 2 + head} ${y - head} M${head + 2} ${y} L ${head + 2 + head} ${y + head} ` +
    `M${w - head - 2} ${y} L ${w - 2 - 2 * head} ${y - head} M${w - head - 2} ${y} L ${w - 2 - 2 * head} ${y + head}`;
  return svgRoot({ width: w, height: h, label: 'opposite arrow' },
    el('path', { d, fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    { 'data-lcs-opp-arrow': '1', 'aria-hidden': 'true' });
}

function pairCard({ picA, picB, transformB = 'none', size = 80, w, h, cueKey }) {
  if (!picA || !picA.src || !picB || !picB.src) throw new Error('pairCard: both pictures need a src');
  if (transformB !== 'scale' && transformB !== 'none') throw new Error('pairCard: transformB must be "scale" or "none"');
  const pxA = transformB === 'scale' ? size : Math.round(size * 0.72);
  const pxB = transformB === 'scale' ? Math.max(G1_FLOOR, Math.round(size * 0.55)) : Math.round(size * 0.72);
  if (Math.min(pxA, pxB) < G1_FLOOR) throw new Error(`pairCard: icon ${Math.min(pxA, pxB)} px below the G1 floor ${G1_FLOOR}`);
  // default box = the two icons + the 10 px gap + padding 8/8 + border 2/2 (a caller may widen, never narrow)
  const W = Math.max(w || 0, pxA + pxB + 10 + 16 + 4);
  const H = Math.max(h || 0, pxA + 8 + 4);
  const img = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px;flex:0 0 auto">`;
  return `<div style="display:inline-flex;align-items:flex-end;justify-content:center;gap:10px;width:${W}px;height:${H}px;` +
    `background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;box-sizing:border-box;padding:4px 8px;flex:0 0 auto" ` +
    `data-lcs-cue-key="${esc(cueKey)}" data-lcs-cue-kind="${transformB}">${img(picA.src, pxA)}${img(picB.src, pxB)}</div>`;
}

function oppositeCard({ given, pair, a, b, dir, wordPx = 28, laneW = 302, laneH = 64, glyphH = 28, cue = null, line1H }) {
  const lineH = wordPx + 4;
  const lane = writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg;
  const cueHtml = cue ? pairCard(cue) : '';
  // line 1 is the same height on every card of a page (the caller passes the page's cue height at d1), so
  // the lanes line up across the grid; margin-left 20 keeps the arrow's ink clear of the 30 px card badge
  // (measured: badge box x 15..45 on the page, arrow ink from x 36 without it — a 5 px overlap at d3)
  const L1 = Math.max(lineH, line1H || 0);
  return `<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;justify-content:space-evenly;gap:4px;padding:0" ` +
    `data-ws-content data-lcs-pair="${esc(pair)}" data-lcs-a="${esc(a)}" data-lcs-b="${esc(b)}" data-lcs-dir="${dir}">` +
    `<div style="display:flex;align-items:center;gap:8px;height:${L1}px;min-height:0;margin-left:20px" data-lcs-line="word">` +
    oppositeArrow() +
    `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${wordPx}px;line-height:${lineH}px;color:${T.ink};white-space:nowrap;flex:0 1 auto;min-width:0" data-lcs-given="${esc(given)}">${esc(given)}</span>` +
    (cueHtml ? `<span style="flex:1 1 auto"></span>${cueHtml}` : '') +
    `</div>` +
    `<div style="display:flex;justify-content:center" data-lcs-line="lane">${lane}</div></div>`;
}

module.exports = { oppositeArrow, pairCard, oppositeCard };
