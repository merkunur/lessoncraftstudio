/**
 * components-b3/letter-of-the-week.js — the K-317 family's NEW components
 * (design file §2 "NEW in templates/components-b3.js" + §3 faces 3 and 6).
 * Merged into the components-b3 namespace by templates/components-b3.js;
 * names are unique across every family file.
 *
 *   letterCard({ text, w, h, glyphH })
 *     A cream .ws-card showing the letter pair ("Mm") ONCE as a solid teal
 *     stroke model on school lines (strokeLetterLane reps:1 → the model rep,
 *     no dashed reps, no guides). The card is at least `w` wide and GROWS with
 *     textGlyphs(text).width × scale (design §2: "Sch" = 145.5 units → 111 px
 *     at glyphH 52 inside a 134 px lane; a unit face must never clip), so the
 *     caller reads the returned `width` to budget the lanes beside it.
 *
 *   huntCard({ src, vocabKey, word, graphemes, hit, w, h, iconPx, rot })
 *     One picture card of the hunt zone: a `.ws-icon` (no caption, no alt —
 *     the word is never printed) rotated ±rot deg on a .ws-card-stage. The
 *     ground truth rides on data-lcs-* stamps only (word, vocab, graphemes as
 *     JSON, hit 1|0); verify() re-derives `hit` from the graphemes / word and
 *     the page-level target, so a wrong stamp cannot survive.
 *
 *   positionKey({ idx, cell })                                   (face 3)
 *     The wordless pictogram above each position box: three `cell`-px squares
 *     in a row, the `idx`-th filled tealSoft (0 = beginning, 1 = middle,
 *     2 = end). No characters to localise, nothing the font lint can fail.
 *
 *   positionCard({ src, vocabKey, word, graphemes, pos, split, w, h, iconPx,
 *                  boxPx, showWord, glyphH, laneH })               (face 3)
 *     One card of the position face: the picture at the left; at the right an
 *     optional stroke-glyph word lane (letter-level locales only, reps:1 — the
 *     word is a MODEL, never <text>) above three dashed coral boxes, each under
 *     its positionKey; the child colours the box where the letter is heard.
 *     Stamps: data-lcs-word / -vocab / -graphemes / -pos (0|1|2) and, in
 *     syllable mode, data-lcs-split (JSON of the approved syllables). The
 *     boxes carry data-lcs-posbox="0|1|2" and no answer.
 *
 *   letterChips({ a, b, px })                                     (face 6)
 *     A fixed-order row of two white square chips (grid border, Baloo 2 teal)
 *     printing the two candidate letters `a | b`; each chip is stamped
 *     data-lcs-chip="<letter>". The child circles one. The chips are the ONLY
 *     characters the family ever prints inside a card, and they are single
 *     letters — never a word (verify()'s hidden-word walk stays clean).
 */
'use strict';
const { strokeLetterLane, strokeWordLane, textLaneGeometry, LM } = require('../../primitives/trace-path.js');
const letterStrokes = require('../../data/tracing/letter-strokes.js');
const { esc, el } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

const CARD_PAD = 8;          // inner padding of the letter card (px per side)
const LANE_SIDE = 8;         // air between the ink and the lane edge (px per side)

function letterCard({ text, w = 150, h = 150, glyphH = 64 }) {
  const laneH = Math.max(glyphH + 46, Math.round(h * 0.73));   // 110 at the design defaults (150 / 64)
  // the same geometry strokeLetterLane will use for a capital-metric lane
  const { scale } = textLaneGeometry({ h: laneH, glyphH, heightUnits: LM.base - LM.capTop, inkTop: LM.capMarkTop, inkBottom: LM.desc });
  let { width } = letterStrokes.textGlyphs(text);
  if ([...text].length === 1) width = letterStrokes.BOX.w;    // single glyph: centred on its designed box (lane rule)
  const inkW = width * scale;
  const laneW = Math.max(w - 2 * CARD_PAD, Math.ceil(inkW + 2 * LANE_SIDE));
  const cardW = laneW + 2 * CARD_PAD;
  const lane = strokeLetterLane({ text, w: laneW, h: laneH, glyphH, reps: 1, label: `letter ${text}` });
  const html = `<div class="ws-card" data-lcs-letter-card="${esc(text)}" style="width:${cardW}px;height:${h}px;flex:0 0 auto;` +
    `align-items:center;justify-content:center;padding:${CARD_PAD}px">${lane.svg}</div>`;
  return { html, width: cardW, height: h, laneW, laneH };
}

function huntCard({ src, vocabKey, word, graphemes, hit, w = 156, h = 140, iconPx = 100, rot = 0 }) {
  const gj = esc(JSON.stringify(graphemes));
  return `<div class="ws-card" style="width:${w}px;height:${h}px;flex:0 0 auto;padding:8px" ` +
    `data-lcs-word="${esc(word)}" data-lcs-vocab="${esc(vocabKey)}" data-lcs-graphemes="${gj}" data-lcs-hit="${hit ? 1 : 0}">` +
    `<div class="ws-card-stage" style="padding:0">` +
    `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" ` +
    `style="width:${iconPx}px;height:${iconPx}px;transform:rotate(${Number(rot).toFixed(1)}deg)"></div></div>`;
}

/* ------------------------------------------------------------- face 3 */
function positionKey({ idx, cell = 14 }) {
  const gap = 2;
  const w = 3 * cell + 2 * gap;
  const cells = [0, 1, 2].map((i) => el('rect', {
    x: i * (cell + gap) + 0.75, y: 0.75, width: cell - 1.5, height: cell - 1.5, rx: 2, ry: 2,
    fill: i === idx ? tokens.color.tealSoft : tokens.color.white,
    stroke: i === idx ? tokens.color.teal : tokens.color.grid, 'stroke-width': 1.5,
  }));
  return el('svg', { xmlns: 'http://www.w3.org/2000/svg', width: w, height: cell, viewBox: `0 0 ${w} ${cell}`, role: 'img',
    'aria-label': `position ${idx + 1} of 3`, 'data-lcs-poskey': idx }, cells.join(''));
}

function positionCard({ src, vocabKey, word, graphemes, pos, split, w = 323, h = 180, iconPx = 96, boxPx = 44, showWord = false, glyphH = 30, laneH = 42, keyCell = 14 }) {
  const pad = 8, gap = 10;
  const rightW = w - 2 * pad - 4 - iconPx - gap;     // 4 = the .ws-card border
  const boxGap = 8;
  const boxes = [0, 1, 2].map((i) =>
    `<div style="display:flex;flex-direction:column;align-items:center;gap:4px">${positionKey({ idx: i, cell: keyCell })}` +
    `<span data-lcs-posbox="${i}" style="display:inline-block;width:${boxPx}px;height:${boxPx}px;box-sizing:border-box;` +
    `background:${tokens.color.white};border:2.5px dashed ${tokens.color.coral};border-radius:10px"></span></div>`).join('');
  const lane = showWord ? strokeWordLane({ text: word, w: rightW, h: laneH, glyphH, reps: 1, stack: true, padLeft: 6 }).svg : '';
  const gj = esc(JSON.stringify(graphemes));
  const splitAttr = split ? ` data-lcs-split="${esc(JSON.stringify(split))}"` : '';
  return `<div class="ws-card" style="width:${w}px;height:${h}px;flex:0 0 auto;padding:${pad}px;flex-direction:row;align-items:center;gap:${gap}px" ` +
    `data-lcs-word="${esc(word)}" data-lcs-vocab="${esc(vocabKey)}" data-lcs-graphemes="${gj}" data-lcs-pos="${pos}"${splitAttr}>` +
    `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${iconPx}px;height:${iconPx}px;flex:0 0 auto">` +
    `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:${rightW}px">${lane}` +
    `<div style="display:flex;gap:${boxGap}px;justify-content:center">${boxes}</div></div></div>`;
}

/* ------------------------------------------------------------- face 6 */
function letterChips({ a, b, px = 48 }) {
  const chip = (t) => `<span class="ws-letter-chip" data-lcs-chip="${esc(t)}" style="display:inline-flex;align-items:center;justify-content:center;` +
    `width:${px}px;height:${px}px;box-sizing:border-box;background:${tokens.color.white};border:2px solid ${tokens.color.grid};border-radius:10px;` +
    `font-family:${tokens.font.display},cursive;font-weight:700;font-size:${Math.round(px * 0.58)}px;line-height:1;color:${tokens.color.teal}">${esc(t)}</span>`;
  return `<div data-lcs-chips="${esc(a)}|${esc(b)}" style="display:flex;gap:12px;justify-content:center">${chip(a)}${chip(b)}</div>`;
}

module.exports = { letterCard, huntCard, positionKey, positionCard, letterChips };
