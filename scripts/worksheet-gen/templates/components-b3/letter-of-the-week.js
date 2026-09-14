/**
 * components-b3/letter-of-the-week.js — the K-317 family's NEW components
 * (design file §2 "NEW in templates/components-b3.js"). Merged into the
 * components-b3 namespace by templates/components-b3.js; names are unique
 * across every family file.
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
 *   Phase 2 (faces 3 + 6) will add positionCard / positionKey / letterChips
 *   here; they are NOT exported yet (nothing consumes them on the base).
 */
'use strict';
const { strokeLetterLane, textLaneGeometry, LM } = require('../../primitives/trace-path.js');
const letterStrokes = require('../../data/tracing/letter-strokes.js');
const { esc } = require('../../primitives/_svg.js');

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

module.exports = { letterCard, huntCard };
