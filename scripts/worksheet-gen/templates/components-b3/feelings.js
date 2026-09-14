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
 *
 * PHASE 2 (2026-09-14) — the FACE components the design file §2 names NEW
 * (faceTile / faceChoiceRow / sceneRow / sceneCard / sceneGrid / blankFace /
 * checkInCard), exported under the family's type-scoped `feeling…` names
 * (the base record's convention; `feelingFaceTile` above is the base's
 * MATCH tile, so the square choice tile is `feelingChoiceTile`). The base's
 * three exports above are byte-untouched.
 *
 *   feelingChoiceTile({ id, src, px=72, tile=84, label=null, labelPx=18 })
 *     One WHITE SQUARE tile (r 10, border 2 creamDeep), the face picture
 *     centred, data-lcs-choice="<id>"; with `label` the tile is 100×108 and
 *     prints the feeling word under the face (Baloo 2 700 labelPx, line 22,
 *     data-lcs-label, max-width = the 96 px inner width; measured 2026-09-14
 *     in the real fonts: es `sorprendido` = 100 px at 18 → the es panel
 *     declares checkin.labelPx 17 → 94; every other panel word <= 92 at 18). The ring the child draws needs the 6 px white margin
 *     — no printed frame inside it (the design rejects .ws-achip for that).
 *   feelingChoiceRow({ faces:[{id,src,label?}], px, tile, gap=12, label })
 *     A centred row of choice tiles, data-lcs-choices="N".
 *   feelingSceneRow({ objects:[{ref,src}], px=88, gap=12 })
 *     1-2 cue pictures on nothing (no tile, no rotation), each
 *     data-lcs-scene-obj="<theme>/<noun>".
 *   feelingSceneCard({ sceneId, answer, correct, objects, faces, objPx, tilePx, facePx })
 *     The F1 card body: .ws-card-stage as a column (gap 10) stamped
 *     data-ws-content data-lcs-scene="<id>" data-lcs-answer="<feeling>"
 *     data-lcs-correct="<tile index>", sceneRow over choiceRow. The card
 *     prints NO text (every locale free of a gendered subject).
 *   feelingSceneGrid({ cards, cols=2, rows })
 *     The F1 page: the page.css .ws-cardgrid (minmax rows, so the cards
 *     absorb 700…778) with badges; when the count is ODD the last card spans
 *     both columns at half width, centred (a 2×3 grid would leave a hole —
 *     the syringe-veto case, 5 cards). data-lcs-scenegrid="N".
 *   feelingBlankFace({ d=220 })
 *     An EMPTY circle (teal stroke 3, no fill, no features) for the child to
 *     draw into, data-lcs-blankface="<d>". 220 px = 58 mm, a whole crayon face.
 *   feelingDrawCard({ id, word, wordPx=30, d=220 })
 *     The F2 card body: the feeling WORD (data-lcs-word="<id>", PRINTED — it
 *     is the stimulus here) over a blank face; data-lcs-drawcard.
 *   feelingChoiceLane({ id, word, wordPx=26, wordW=220, faces, tilePx, facePx, correct })
 *     One F4 row: .ws-lane (inline padding 6 16 → inner 639) stamped
 *     data-ws-content data-lcs-row data-lcs-target="<id>" data-lcs-correct=
 *     "<tile index>": [word wordW][16][tiles centred]. Every row independent.
 *   feelingChoicePage({ lanes, minRow=104, gap=10 })
 *     The F4 page: display:grid; grid-template-rows:repeat(N, minmax(minRow,
 *     1fr)); flex:1 1 auto — 6 × 104 + 5 × 10 = 674 <= 700 (the 4-line
 *     chrome floor; the design's 112 gave 722, which overflows at 700).
 *   feelingCheckIn({ today, faces, draw, because, labelPx, d=220, rows=2 })
 *     The F5 page: lane (today literal + six labelled tiles) / card (draw
 *     literal + blank face, flex:1) / lane (rulingBlock rows, the "because"
 *     starter). 180 + 14 + 292 + 14 + 178 = 678 <= 700. data-lcs-checkin.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc, svgRoot, circle } = require('../../primitives/_svg.js');
const { rulingBlock } = require('../components-b2.js');

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

/* ================================================================== faces (Phase 2) */
const wordStyle = (px, color, line) =>
  `font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:${line || px + 4}px;color:${color};white-space:nowrap;text-align:center`;

function feelingChoiceTile({ id, src, px = 72, tile = 84, label = null, labelPx = 18 }) {
  const w = label == null ? tile : 100;
  const h = label == null ? tile : 108;
  const lab = label == null ? '' :
    `<span style="${wordStyle(labelPx, T.ink, 22)};max-width:${w - 4}px" data-lcs-label>${esc(label)}</span>`;   // w-4 = the tile's inner width (2 px border each side)
  return `<span class="ws-facetile" style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;` +
    `width:${w}px;height:${h}px;flex:0 0 auto;background:${T.white};border:2px solid ${T.creamDeep};border-radius:10px" data-lcs-choice="${esc(id)}">` +
    `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px">${lab}</span>`;
}

function feelingChoiceRow({ faces, px = 72, tile = 84, gap = 12, label = false, labelPx = 18 }) {
  const tiles = faces.map((f) => feelingChoiceTile({ id: f.id, src: f.src, px, tile, label: label ? f.label : null, labelPx })).join('');
  return `<div style="display:flex;justify-content:center;align-items:center;gap:${gap}px;flex:0 0 auto" data-lcs-choices="${faces.length}">${tiles}</div>`;
}

function feelingSceneRow({ objects, px = 88, gap = 12 }) {
  const imgs = objects.map((o) =>
    `<img class="ws-icon" src="${o.src}" alt="" style="width:${px}px;height:${px}px;flex:0 0 auto" data-lcs-scene-obj="${esc(o.ref)}">`).join('');
  return `<div style="display:flex;justify-content:center;align-items:center;gap:${gap}px;flex:0 0 auto" data-lcs-scene-row>${imgs}</div>`;
}

function feelingSceneCard({ sceneId, answer, correct, objects, faces, objPx = 88, tilePx = 84, facePx = 72 }) {
  return `<div class="ws-card-stage" style="flex-direction:column;gap:10px;min-height:0" data-ws-content data-lcs-scene="${esc(sceneId)}" data-lcs-answer="${esc(answer)}" data-lcs-correct="${correct}">` +
    feelingSceneRow({ objects, px: objPx }) + feelingChoiceRow({ faces, px: facePx, tile: tilePx }) + `</div>`;
}

function feelingSceneGrid({ cards, cols = 2, rows }) {
  const r = rows || Math.ceil(cards.length / cols);
  const odd = cards.length % cols !== 0;
  const items = cards.map((inner, i) => {
    const last = odd && i === cards.length - 1;
    const style = last ? ` style="grid-column:1 / -1;justify-self:center;width:calc((100% - 14px) / ${cols})"` : '';
    return `<section class="ws-card"${style} data-lcs-card="${i + 1}"><span class="ws-card-badge">${i + 1}</span>${inner}</section>`;
  }).join('\n');
  return `<div class="ws-cardgrid" style="grid-template-columns: repeat(${cols}, minmax(0,1fr)); grid-template-rows: repeat(${r}, minmax(0,1fr));" data-lcs-scenegrid="${cards.length}">\n${items}\n</div>`;
}

function feelingBlankFace({ d = 220 }) {
  const s = 3;
  return svgRoot({ width: d, height: d, label: 'blank face' },
    circle({ cx: d / 2, cy: d / 2, r: d / 2 - s, fill: 'none', strokeColor: T.teal, strokeWidth: s }),
    { 'data-lcs-blankface': d, style: 'flex:0 0 auto;display:block' });
}

function feelingDrawCard({ id, word, wordPx = 30, d = 220 }) {
  return `<div class="ws-card-stage" style="flex-direction:column;gap:12px;min-height:0" data-ws-content data-lcs-drawcard>` +
    `<span style="${wordStyle(wordPx, T.teal)}" data-lcs-word="${esc(id)}">${esc(word)}</span>` +
    feelingBlankFace({ d }) + `</div>`;
}

function feelingChoiceLane({ id, word, wordPx = 26, wordW = 220, faces, tilePx = 84, facePx = 72, correct }) {
  return `<div class="ws-lane" style="padding:6px 16px;display:flex;align-items:center;gap:16px;min-height:0" data-ws-content data-lcs-row data-lcs-target="${esc(id)}" data-lcs-correct="${correct}">` +
    `<span style="${wordStyle(wordPx, T.ink)};width:${wordW}px;flex:0 0 auto;text-align:left" data-lcs-targetword>${esc(word)}</span>` +
    `<div style="flex:1 1 auto;display:flex;justify-content:center;min-width:0">` + feelingChoiceRow({ faces, px: facePx, tile: tilePx }) + `</div></div>`;
}

function feelingChoicePage({ lanes, minRow = 104, gap = 10 }) {
  return `<div style="display:grid;grid-template-rows:repeat(${lanes.length}, minmax(${minRow}px,1fr));gap:${gap}px;flex:1 1 auto;min-height:0" data-lcs-choicepage="${lanes.length}">${lanes.join('')}</div>`;
}

function feelingCheckIn({ today, faces, draw, because, labelPx = 18, facePx = 72, d = 220, rows = 2, glyphH = 40, rowH = 72 }) {
  const tiles = feelingChoiceRow({ faces, px: facePx, tile: 84, gap: 6, label: true, labelPx });
  return `<div style="display:flex;flex-direction:column;gap:14px;flex:1 1 auto;min-height:0" data-lcs-checkin>` +
    `<div class="ws-lane" style="display:flex;flex-direction:column;align-items:center;gap:10px;flex:0 0 auto" data-ws-content data-lcs-today>` +
    `<span style="${wordStyle(26, T.teal)}" data-lcs-today-literal>${esc(today)}</span>${tiles}</div>` +
    `<div class="ws-card" style="align-items:center;justify-content:center;gap:10px;flex:1 1 auto;min-height:${d + 34 + 10 + 28}px" data-ws-content data-lcs-drawcard>` +
    `<span style="${wordStyle(26, T.teal)}" data-lcs-draw-literal>${esc(draw)}</span>` + feelingBlankFace({ d }) + `</div>` +
    `<div class="ws-lane" style="flex:0 0 auto" data-ws-content data-lcs-because>` +
    rulingBlock({ rows, w: 639, h: rowH, glyphH, starters: because ? { 0: because } : {}, gap: 6 }) + `</div></div>`;
}

module.exports = {
  feelingFaceTile, feelingWordTile, feelingMatch,
  feelingChoiceTile, feelingChoiceRow, feelingSceneRow, feelingSceneCard, feelingSceneGrid,
  feelingBlankFace, feelingDrawCard, feelingChoiceLane, feelingChoicePage, feelingCheckIn,
};
