/**
 * components-b3/feelings.js — the K-319 `feelings` family components
 * (design: docs/worksheet-gen/b3-designs/K-319-emotions.md §2; the family
 * KEY is `feelings` per the 2026-09-14 ruling — the THEME axis owns
 * `emotions`, which stays the name of the picture directory the faces come
 * from). Merged into the templates/components-b3.js namespace; names are
 * type-scoped (`feeling…`) so G1-307's future `matchColumns` cannot collide.
 *
 * Exports (the base page consumes all three; the design file names NO new
 * component for the base — it reuses `.ws-match*` from page.css — so these
 * are the base's column pair lifted out of the spec, not a new drawing):
 *
 *   feelingFaceTile({ id, src, px, w, h })
 *     One WHITE `.ws-match-item ws-match-item--plain` tile with the face
 *     picture (`.ws-icon`, no alt — the answer is never printed) centred and
 *     a coral dot on its right edge. Ground truth = data-lcs-face="<id>".
 *
 *   feelingWordTile({ id, word, px, w, h })
 *     One cream `.ws-match-item` tile printing the feeling WORD once, Baloo 2
 *     700 at `px`, a coral dot on its left edge. data-lcs-word="<id>" carries
 *     the id (never the text); the text is the panel's citation literal.
 *
 *   feelingMatch({ left, right, tileL, tileR, itemH, picPx, wordPx })
 *     The two-column match block: `.ws-match` (page.css:354, padding 6 30 →
 *     inner 615 × body−12) with two `.ws-match-col` (space-around, gap 12);
 *     faces down the left, words down the right in the order given (the spec
 *     derangement-shuffles `right`). Stamps the root data-ws-content and
 *     data-lcs-pairs; the child's pencil line is the only mark.
 *     SLACK, both ways (measured 2026-09-14 in the real render: the body is
 *     778 px under en chrome, 733 under a 3-line title + 2-line instruction,
 *     700 under a 4-line fi title — the README's flat 722 is neither):
 *     upward, `.ws-match-col` space-around spreads the rows; downward, every
 *     tile is `flex:0 1 auto` with a shared `min-height` (picPx + 16), so a
 *     tall chrome squeezes the rows evenly (108 → 104.7 at 700) instead of
 *     printing the last row into the attribution band.
 *
 * Every drawing is page.css chrome + one inline font-size; no page.css edit,
 * no hex outside the token palette (the dots are page.css coral).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');

const F = tokens.font;
const T = tokens.color;

function feelingFaceTile({ id, src, px = 80, w = 160, h = 108, minH = px + 16 }) {
  return `<div class="ws-match-item ws-match-item--plain" style="width:${w}px;height:${h}px;min-height:${minH}px;flex:0 1 auto" data-lcs-face="${esc(id)}">` +
    `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px">` +
    `<span class="ws-match-dot ws-match-dot--right"></span></div>`;
}

function feelingWordTile({ id, word, px = 28, w = 260, h = 108, minH = px + 24 }) {
  return `<div class="ws-match-item" style="width:${w}px;height:${h}px;min-height:${minH}px;flex:0 1 auto;padding:0 16px" data-lcs-word="${esc(id)}">` +
    `<span class="ws-match-dot ws-match-dot--left"></span>` +
    `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:${px + 4}px;color:${T.ink};` +
    `white-space:nowrap;text-align:center">${esc(word)}</span></div>`;
}

function feelingMatch({ left, right, tileL = 160, tileR = 260, itemH = 108, picPx = 80, wordPx = 28 }) {
  // one shared floor keeps both columns row-aligned when the chrome squeezes the stack
  const minH = Math.max(picPx + 16, wordPx + 24);
  const l = left.map((f) => feelingFaceTile({ id: f.id, src: f.src, px: picPx, w: tileL, h: itemH, minH })).join('');
  const r = right.map((f) => feelingWordTile({ id: f.id, word: f.word, px: wordPx, w: tileR, h: itemH, minH })).join('');
  // min-height:0 on the block and the columns lets the flex chain shrink past the rows' declared height
  return `<div class="ws-match" style="min-height:0" data-ws-content data-lcs-feelings data-lcs-pairs="${left.length}">` +
    `<div class="ws-match-col" style="min-height:0" data-lcs-col="faces">${l}</div>` +
    `<div class="ws-match-col" style="min-height:0" data-lcs-col="words">${r}</div></div>`;
}

module.exports = { feelingFaceTile, feelingWordTile, feelingMatch };
