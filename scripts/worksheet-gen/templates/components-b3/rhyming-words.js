/**
 * components-b3/rhyming-words.js — the G1-309 `rhyming-words` family
 * components (design: docs/worksheet-gen/b3-designs/G1-309-rhyming-words.md
 * §2 "NEW in templates/components-b3.js"). Merged into the
 * templates/components-b3.js namespace; only the components the BASE consumes
 * are exported (`rhymeMark`, `anchorTile`, `choiceRing`, `rhymeRow`). The
 * face components the design names (`yesNoChips`, `pairCardRhyme`,
 * `rhymeBins`, `coupletCard`, `stringLane`, `ownRhymeCard`) are Phase 2 —
 * nothing on the base consumes them, so they are not exported yet (the
 * K-317 / G1-307 convention); the names stay free.
 *
 *   rhymeMark({ px = 20 })
 *     The "say it" cue: three teal arcs (design paths `M6 5 q6 5 0 10`,
 *     `M9 2 q10 8 0 16`, `M12 -1 q14 11 0 22`), T.teal 2.5, round caps, no
 *     letters, aria-hidden — decoration, never an answer. The design box is
 *     20 wide; the outer arc runs from y −1 to 21, so the svg is 20×24 with a
 *     viewBox starting at y −2 (nothing is clipped).
 *
 *   anchorTile({ src, tile = 76, px = 64 })
 *     The framed ANCHOR picture: a WHITE `tile`×`tile` box, T.teal 2 solid,
 *     r 12, one `.ws-icon` at `px`. No stamp of its own — the row's stage
 *     carries `data-lcs-anchor` / `data-lcs-class` (rhymeRow).
 *
 *   choiceRing({ src, tile = 76, px = 60, vocabKey, cls, word, rhyme, foil })
 *     One CHOICE: a white `tile`×`tile` disc with a T.grid 1.5 DASHED ring
 *     (the circle target — the child traces it round the picture that
 *     rhymes), one `.ws-icon` at `px`. All three rings of a row are
 *     identical; nothing marks the answer. Stamps `data-lcs-choice`
 *     (vocabKey), `data-lcs-class` (the choice's rhyme class; '' for a
 *     near-miss foil that is a member of no class), `data-lcs-word` (the
 *     citation word the answer key prints), `data-lcs-rhyme="1|0"`,
 *     `data-lcs-foil="1"` on a d3 near-miss foil.
 *
 *   rhymeRow({ anchor, choices, lane, anchorTile, anchorPx, choiceTile,
 *              choicePx, badgeGap = 20, gap = 10, laneGap = 14 })
 *     The base's row body: `<div class="ws-card-stage" data-ws-content
 *     data-lcs-anchor data-lcs-class data-lcs-anchor-word>` — [anchorTile]
 *     [rhymeMark] [choices…] [lane], one flex row, vertically centred, the
 *     lane pushed to the right edge (margin-left:auto) so the card's slack
 *     opens between the rings and the lane, never inside the ring group.
 *     `badgeGap` = margin-left on the anchor so its ink clears the 30 px
 *     `.ws-card-badge` (0 on the K shape, which drops the badge). The lane is
 *     one `writingRow` (x-height school lines, `data-lcs-prim="writing-row"`)
 *     or, when `lane.starter` is set (d1), a one-row `rulingBlock` printing
 *     the first glyph of the answer in inkSoft (`data-lcs-starter`) — the
 *     scaffold the design puts on d1 only. The written word appears NOWHERE
 *     on the row: the lane prints nothing else.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { rulingBlock } = require('../components-b2.js');

const T = tokens.color;

function rhymeMark({ px = 20 } = {}) {
  const h = Math.round(px * 1.2);
  return svgRoot({ width: px, height: h, viewBox: '0 -2 20 24', label: 'say it' },
    el('path', { d: 'M6 5 q6 5 0 10 M9 2 q10 8 0 16 M12 -1 q14 11 0 22', fill: 'none', stroke: T.teal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }),
    { 'data-lcs-rhyme-mark': '1', 'aria-hidden': 'true' });
}

function anchorTile({ src, tile = 76, px = 64 }) {
  if (!src) throw new Error('anchorTile: src missing');
  if (!(px <= tile - 4)) throw new Error(`anchorTile: picture ${px} does not fit the ${tile} tile (border 2 each side)`);
  return `<div style="display:flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;flex:0 0 auto;` +
    `background:${T.white};border:2px solid ${T.teal};border-radius:12px;box-sizing:border-box" data-lcs-anchor-tile="1">` +
    `<img class="ws-icon" src="${esc(src)}" alt="" style="width:${px}px;height:${px}px"></div>`;
}

function choiceRing({ src, tile = 76, px = 60, vocabKey, cls, word, rhyme, foil = false }) {
  if (!src) throw new Error('choiceRing: src missing');
  if (!vocabKey || !word) throw new Error('choiceRing: vocabKey and word are required');
  if (!(px <= tile - 3)) throw new Error(`choiceRing: picture ${px} does not fit the ${tile} ring (border 1.5 each side)`);
  return `<div style="display:flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;flex:0 0 auto;` +
    `background:${T.white};border:1.5px dashed ${T.grid};border-radius:50%;box-sizing:border-box" ` +
    `data-lcs-choice="${esc(vocabKey)}" data-lcs-class="${esc(cls == null ? '' : cls)}" data-lcs-word="${esc(word)}" data-lcs-rhyme="${rhyme ? '1' : '0'}"${foil ? ' data-lcs-foil="1"' : ''}>` +
    `<img class="ws-icon" src="${esc(src)}" alt="" style="width:${px}px;height:${px}px"></div>`;
}

function rhymeRow({ anchor, choices, lane, anchorTile: aTile = 76, anchorPx = 64, choiceTile: cTile = 76, choicePx = 60, badgeGap = 20, gap = 10, laneGap = 14 }) {
  if (!anchor || !anchor.src || !anchor.vocabKey || !anchor.cls) throw new Error('rhymeRow: anchor needs src, vocabKey, cls');
  if (!Array.isArray(choices) || choices.length < 2) throw new Error('rhymeRow: at least two choices');
  if (!lane || !lane.w || !lane.h || !lane.glyphH) throw new Error('rhymeRow: lane needs w, h, glyphH');
  let laneHtml;
  if (lane.starter) {
    if ([...lane.starter].length !== 1) throw new Error('rhymeRow: a starter is exactly one glyph');
    laneHtml = rulingBlock({ rows: 1, w: lane.w, h: lane.h, glyphH: lane.glyphH, starters: { 0: lane.starter }, gap: 0 });
  } else laneHtml = writingRow({ w: lane.w, h: lane.h, glyphH: lane.glyphH, xHeight: true }).svg;
  const rings = choices.map((c) => choiceRing({ src: c.src, tile: cTile, px: choicePx, vocabKey: c.vocabKey, cls: c.cls, word: c.word, rhyme: c.rhyme, foil: c.foil })).join('');
  return `<div class="ws-card-stage" style="justify-content:flex-start;align-items:center;gap:${gap}px;padding:0;min-width:0" ` +
    `data-ws-content data-lcs-anchor="${esc(anchor.vocabKey)}" data-lcs-class="${esc(anchor.cls)}" data-lcs-anchor-word="${esc(anchor.word || '')}">` +
    `<div style="margin-left:${badgeGap}px;flex:0 0 auto;display:flex" data-lcs-slot="anchor">${anchorTile({ src: anchor.src, tile: aTile, px: anchorPx })}</div>` +
    `<div style="flex:0 0 auto;display:flex;align-items:center" data-lcs-slot="mark">${rhymeMark({ px: 20 })}</div>` +
    `<div style="display:flex;gap:${gap}px;flex:0 0 auto" data-lcs-slot="choices">${rings}</div>` +
    `<div style="margin-left:auto;padding-left:${Math.max(0, laneGap - gap)}px;flex:0 0 auto;display:flex" data-lcs-slot="lane" data-lcs-lane-w="${lane.w}">${laneHtml}</div>` +
    `</div>`;
}

module.exports = { rhymeMark, anchorTile, choiceRing, rhymeRow };
