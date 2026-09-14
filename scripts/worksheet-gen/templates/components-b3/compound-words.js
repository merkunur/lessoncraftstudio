/**
 * components-b3/compound-words.js — the G2-316 `compound-words` family
 * components (design: docs/worksheet-gen/b3-designs/G2-316-compound-words.md
 * §2 "NEW in templates/components-b3.js"). Merged into the
 * templates/components-b3.js namespace; only the components the BASE consumes
 * are exported (the K-317 / K-319 / G1-307 convention): `opGlyph` and
 * `compoundRow`. The face components the design names (`linkBox` F1,
 * `splitWord` F2, `webBlock` F5) are Phase 2 — nothing on the base consumes
 * them, so they stay free names (`splitWord` reuses G1-305's `syllableWord`).
 *
 *   opGlyph(ch)
 *     A 28×28 SVG with one Baloo 2 700 26 px glyph in T.teal (`+` or `=`),
 *     `data-lcs-op="<ch>"`, aria-hidden — the ONLY text the base page prints
 *     besides the d1 part words. On the token palette only.
 *
 *   compoundRow({ index, cueA, cueB, lane, stamps, pad = '6px 14px', gap = 10,
 *                 wordPx = 18, badge = true })
 *     One full-width `.ws-lane` row read left to right as an equation:
 *       [badge] [cue A] + [cue B] = [empty writing-row]
 *     cueA / cueB = { src, px, key, word? } — a colour picture (`.ws-icon`,
 *     `data-lcs-pic="<vocabKey>"`, no alt) with the PART word printed under it
 *     when `word` is given (d1 scaffold; Nunito 800 `wordPx`, `data-lcs-part-
 *     word`); cueB may instead be { chip:'-ista', fontPx, tileH } — one
 *     `.ws-tile` affix chip (the es/fr family shape and the it/pt alterati
 *     shape, `wordTiles` from components-b2). `lane` = { w, h, glyphH } → one
 *     `writingRow` (`data-lcs-prim="writing-row"`, xHeight rule), empty.
 *     `stamps` = { a, aWord, aStem, b, bWord, link, whole, cut } → the hidden
 *     ground truth on the row (`data-lcs-a` / `-b` = vocab keys or the affix,
 *     `-a-word` / `-b-word` / `-a-stem` the bank literals, `-link`, `-whole`
 *     the display form, `-cut` the code-point index where the second part
 *     starts). The row stamps `[data-ws-content]` (the QA lint content
 *     selector) and `data-lcs-row`; `badge` prints `countBadge(index)` in the
 *     lane's corner (`.ws-countbadge` is absolute at −8/−8 of the lane).
 *     The row is a flex line, `align-items:center`, so a grid row that is
 *     taller than the content (the body's slack, README 722 → ~814) centres
 *     it; the caller sizes `.ws-lane` via its grid, never via a fixed height.
 *     The whole word appears NOWHERE on the row — verify() asserts it.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, label, esc } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { wordTiles, countBadge } = require('../components-b2.js');

const T = tokens.color;
const F = tokens.font;
const OPS = new Set(['+', '=']);

function opGlyph(ch) {
  if (!OPS.has(ch)) throw new Error('opGlyph: "' + ch + '" is not an operator glyph (+ =)');
  return svgRoot({ width: 28, height: 28, label: ch === '+' ? 'plus' : 'equals' },
    label({ x: 14, y: 14, text: ch, size: 26, color: T.teal, fontFamily: F.display, weight: 700 }),
    { 'data-lcs-op': ch, 'aria-hidden': 'true' });
}

function cue(c, role, wordPx) {
  if (!c) throw new Error('compoundRow: cue ' + role + ' missing');
  if (c.chip != null) {
    if (!/^-\p{L}+$/u.test(String(c.chip))) throw new Error('compoundRow: chip "' + c.chip + '" must be an affix starting with "-"');
    return `<div data-lcs-cue="${role}" data-lcs-cue-kind="chip" style="flex:0 0 auto;display:flex;align-items:center">` +
      wordTiles({ tokens: [String(c.chip)], fontPx: c.fontPx || 20, tileH: c.tileH || 40 }) + `</div>`;
  }
  if (!c.src || !(c.px > 0) || !c.key) throw new Error('compoundRow: cue ' + role + ' needs {src, px, key}');
  const img = `<img class="ws-icon" src="${c.src}" alt="" data-lcs-pic="${esc(c.key)}" style="width:${c.px}px;height:${c.px}px;flex:0 0 auto">`;
  const word = c.word != null
    ? `<span data-lcs-part-word="${esc(c.word)}" style="font-family:${F.body},sans-serif;font-weight:800;font-size:${wordPx}px;line-height:${wordPx + 2}px;color:${T.ink};white-space:nowrap">${esc(c.word)}</span>`
    : '';
  return `<div data-lcs-cue="${role}" data-lcs-cue-kind="pic" style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:2px;min-width:${c.px}px">${img}${word}</div>`;
}

function compoundRow({ index, cueA, cueB, lane, stamps, pad = '6px 14px', gap = 10, wordPx = 18, badge = true }) {
  if (!lane || !(lane.w > 0) || !(lane.h > 0) || !(lane.glyphH > 0)) throw new Error('compoundRow: lane needs {w, h, glyphH}');
  const s = stamps || {};
  for (const k of ['a', 'b', 'whole']) if (s[k] == null || s[k] === '') throw new Error('compoundRow: stamp "' + k + '" missing');
  if (!(Number.isInteger(s.cut) && s.cut > 0)) throw new Error('compoundRow: stamp cut must be a positive integer');
  const row = writingRow({ w: lane.w, h: lane.h, glyphH: lane.glyphH, xHeight: true }).svg;
  const attrs = [
    `data-lcs-a="${esc(s.a)}"`, `data-lcs-b="${esc(s.b)}"`,
    `data-lcs-a-word="${esc(s.aWord == null ? '' : s.aWord)}"`, `data-lcs-b-word="${esc(s.bWord == null ? '' : s.bWord)}"`,
    `data-lcs-a-stem="${esc(s.aStem == null ? '' : s.aStem)}"`, `data-lcs-link="${esc(s.link == null ? '' : s.link)}"`,
    `data-lcs-whole="${esc(s.whole)}"`, `data-lcs-cut="${s.cut}"`,
  ].join(' ');
  return `<div class="ws-lane" data-ws-content data-lcs-row="${index == null ? '' : index}" ${attrs} ` +
    `style="display:flex;align-items:center;gap:${gap}px;padding:${pad};min-height:0;box-sizing:border-box">` +
    (badge && index != null ? countBadge(index) : '') +
    cue(cueA, 'a', wordPx) +
    `<span style="flex:0 0 auto;display:flex">${opGlyph('+')}</span>` +
    cue(cueB, 'b', wordPx) +
    `<span style="flex:0 0 auto;display:flex">${opGlyph('=')}</span>` +
    `<span data-lcs-lane style="flex:0 0 auto;display:flex;margin-left:2px">${row}</span>` +
    `</div>`;
}

module.exports = { opGlyph, compoundRow };
