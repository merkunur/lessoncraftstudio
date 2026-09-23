/**
 * components-b6/story-sequencing.js — the K-379 `story-sequencing` base
 * components (design docs/worksheet-gen/b6-designs/K-379-story-sequencing.md
 * §2). Inline CSS only, class prefix `ss-`, exports prefixed `ss` (the
 * components-b6 barrel refuses a duplicate export name). Every picture comes
 * from primitives/story-panel.js (one art source; 0 library pictures).
 *
 *   ssCord({ w, pegXs })        the sagging teal washing line (SVG w x 30: the cord in
 *                               the top 24 px, each peg reaching 3 px over its card)
 *   ssHungRow({ cards, w, gap, under, stamps })
 *                               one story on its line: cards pegged at one top y (24),
 *                               a 12 px string from each card's bottom-centre to the
 *                               thing hung under it (`under` = 'tag' today; the faces'
 *                               'word' / 'label' / 'none' arrive with Phase E)
 *   ssTag({ w, h, slot })       the dangling answer tag: an EMPTY blankNumeralBox with a
 *                               white eyelet on its top edge (no numeral, no text node)
 *   ssPage({ rows, stamps })    the family root: a .ws-lane (inner 639) that is
 *                               [data-ws-content][data-lcs-story-sequencing], rows
 *                               spread space-evenly (the slack becomes air; cards never stretch)
 *
 * The face components the design also names (ssGlueFrame / ssWordTag / ssCutStrip F1,
 * ssQueryFrame / ssChoiceTray F2, ssStageLabel / ssDrawCard F3, ssSentenceMatch F4,
 * ssRetellRow / ssVerticalCord F5) are built with their faces in Phase E, not here.
 *
 * Cord geometry (design §2): path M3,5 Q(w/2),21 (w-3),5, teal 2.5; hooks r 3.5 at
 * both ends. Pegs at card-left + 30 and card-right - 30: 8 wide, from the cord's y
 * there - 3 down to y 27, white, teal 2, an ink 1.2 spring line across the middle.
 * The cord's y at x: t = (x - 3) / (w - 6), y = 5(1-t)^2 + 42 t(1-t) + 5 t^2 (the
 * control point sits at the middle, so x is linear in t). Every card shares one top
 * y (24), so the sag is identical on every page and never a cue.
 */
'use strict';
const { el, svgRoot } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');
const { blankNumeralBox } = require('../components-b3/ordinal-numbers.js');

const T = tokens.color;
const CORD_H = 24, PEG_BOTTOM = 27, STRING_H = 12;
const fmt = (n) => (Math.round(n * 100) / 100).toString();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function cordY(x, w) { const t = Math.max(0, Math.min(1, (x - 3) / (w - 6))); return 5 * (1 - t) ** 2 + 42 * t * (1 - t) + 5 * t * t; }

function ssCord({ w, pegXs = [] }) {
  const P = [
    el('path', { d: `M3,5 Q${fmt(w / 2)},21 ${fmt(w - 3)},5`, fill: 'none', stroke: T.teal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }),
    el('circle', { cx: 3, cy: 5, r: 3.5, fill: T.teal }), el('circle', { cx: fmt(w - 3), cy: 5, r: 3.5, fill: T.teal }),
  ];
  for (const x of pegXs) {
    const top = cordY(x, w) - 3;
    P.push(el('rect', { x: fmt(x - 4), y: fmt(top), width: 8, height: fmt(PEG_BOTTOM - top), rx: 2, fill: T.white, stroke: T.teal, 'stroke-width': 2, 'data-lcs-peg': '1' }));
    const mid = (top + PEG_BOTTOM) / 2;
    P.push(el('line', { x1: fmt(x - 4), y1: fmt(mid), x2: fmt(x + 4), y2: fmt(mid), stroke: T.ink, 'stroke-width': 1.2 }));
  }
  return svgRoot({ width: w, height: PEG_BOTTOM + 3, label: '' }, P.join(''), { 'aria-hidden': 'true', 'data-lcs-cord': '1', style: 'position:absolute;left:0;top:0;z-index:2;overflow:visible' });
}

function ssTag({ w, h, slot }) {
  const eyelet = svgRoot({ width: 12, height: 12, label: '' }, el('circle', { cx: 6, cy: 6, r: 4.5, fill: T.white, stroke: T.teal, 'stroke-width': 1.5 }), { 'aria-hidden': 'true', style: `position:absolute;left:${fmt(w / 2 - 6)}px;top:-6px` });
  return `<span class="ss-tag" style="position:relative;display:block;width:${w}px;height:${h}px">` +
    blankNumeralBox({ w, h, answer: '', attrs: `data-lcs-slot="${slot}"` }).replace(/style="width:[^"]*"/, `style="display:block;box-sizing:border-box;width:${w}px;height:${h}px;border-width:3px"`) + eyelet + '</span>';
}

/**
 * cards: [{ svg, w, h, seq, tag:{w,h}, sky }] in VISUAL order (left to right); svg is a story panel drawn
 * with frame:false. The CARD is a CSS box (teal 2 px, r 10, background = the stage's sky) that GROWS with its
 * row (flex), the panel pinned to its bottom — so a taller body (a 1-line title) buys a taller card, never an
 * empty band on the page (lead review 2026-09-23: SPARSE). Row = cord zone 24 | card (flex) | string | tag.
 * The row's min height = 24 + h + string + tag; it may grow by `grow` px (the card absorbs it).
 */
function ssHungRow({ cards, w, gap, under = 'tag', stringH = 16, grow = 50, stamps = {} }) {
  if (under !== 'tag') throw new Error(`ssHungRow: under "${under}" is a Phase-E face option`);
  const run = cards.reduce((acc, c) => acc + c.w, 0) + gap * (cards.length - 1);
  if (run > w + 0.5) throw new Error(`ssHungRow: the card run ${run} px exceeds the row ${w} px`);
  const cardH = Math.max(...cards.map((c) => c.h));
  const tagH = Math.max(...cards.map((c) => c.tag.h));
  const H = CORD_H + cardH + stringH + tagH;
  let x = (w - run) / 2;
  const pegXs = [];
  const cols = cards.map((c, j) => {
    pegXs.push(x + 30, x + c.w - 30);
    x += c.w + gap;
    return `<div class="ss-col" style="flex:0 0 ${fmt(c.w)}px;width:${fmt(c.w)}px;display:flex;flex-direction:column;align-items:center">` +
      `<div class="ss-card" data-lcs-card data-lcs-seq="${c.seq}" data-lcs-slot="${j}" style="flex:1 1 auto;width:100%;min-height:${fmt(c.h)}px;display:flex;flex-direction:column;justify-content:${c.anchor === 'center' ? 'center' : 'flex-end'};position:relative;border-radius:10px;overflow:hidden;background:${c.sky || T.white}">` +
      `<div style="flex:0 0 auto;line-height:0">${c.svg}</div><div class="ss-frame" aria-hidden="true" style="position:absolute;inset:0;border:2px solid ${T.teal};border-radius:10px;pointer-events:none"></div></div>` +
      `<div class="ss-string" aria-hidden="true" style="flex:0 0 ${stringH}px;width:2px;background:${T.teal}"></div>` +
      `<div class="ss-under" style="flex:0 0 auto">${ssTag({ w: c.tag.w, h: c.tag.h, slot: j })}</div></div>`;
  });
  const attrs = Object.entries(stamps).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
  return `<div class="ss-row" data-lcs-story-row${attrs} style="position:relative;flex:1 1 ${fmt(H)}px;min-height:${fmt(H)}px;max-height:${fmt(H + grow)}px;width:${w}px;box-sizing:border-box;padding-top:${CORD_H}px;display:flex;gap:${fmt(gap)}px;justify-content:center">` +
    ssCord({ w, pegXs }) + cols.join('') + '</div>';
}

/** The family root: a .ws-lane (inner 639) top-anchored, the rows stretching to fill it (space-evenly takes only what the rows cannot). */
function ssPage({ rows, rowGap = 14, stamps = {} }) {
  const attrs = Object.entries(stamps).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
  return `<div class="ws-lane ss-page" data-ws-content data-lcs-story-sequencing${attrs} style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:${rowGap}px;min-height:0">` +
    rows.join('') + '</div>';
}

/* ================================================================== Phase E: the five faces' components */
const { cardSheet, cutCard } = require('../components-b3/picture-word-cards.js');
const { rulingBlock } = require('../components-b2.js');

/**
 * A CSS-framed picture card that GROWS with its row (the base's card, reusable): the panel svg (frame:false)
 * pinned to the bottom (or centred for a top view), the teal 2 px frame drawn OVER it, background = the
 * stage's sky. attrs are appended verbatim; data-ss-block marks it for the SPARSE measure.
 */
function ssCardBox({ svg, w, minH, anchor = 'bottom', sky = T.white, grow = true, attrs = '' }) {
  return `<div class="ss-card" data-ss-block ${attrs} style="position:relative;${grow ? 'flex:1 1 auto;' : 'flex:0 0 auto;'}width:${fmt(w)}px;min-height:${fmt(minH)}px;display:flex;flex-direction:column;justify-content:${anchor === 'center' ? 'center' : 'flex-end'};border-radius:10px;overflow:hidden;background:${sky}">` +
    `<div style="flex:0 0 auto;line-height:0">${svg}</div>` +
    `<div class="ss-frame" aria-hidden="true" style="position:absolute;inset:0;border:2px solid ${T.teal};border-radius:10px;pointer-events:none"></div></div>`;
}

/**
 * A washing line for the faces: the cord over a row of COLUMNS, each column a flex stack (its top item
 * grows; `under` items hang on a 12 px string). items: [{ w, html, under? }]. The line grows by up to
 * `grow` px (its columns' flexing items absorb it); min height = 24 + tallest column.
 */
function ssLine({ items, w = 639, gap, minH, grow = 60, stamps = {}, string = true, marker = null }) {
  const run = items.reduce((acc, c) => acc + c.w, 0) + gap * (items.length - 1);
  if (run > w + 0.5) throw new Error(`ssLine: the run ${run} px exceeds ${w} px`);
  let x = (w - run) / 2;
  const pegXs = [];
  const cols = items.map((it) => {
    pegXs.push(x + Math.min(30, it.w / 4), x + it.w - Math.min(30, it.w / 4));
    x += it.w + gap;
    const hang = it.under ? (string ? `<div class="ss-string" aria-hidden="true" style="flex:0 0 ${STRING_H}px;width:2px;background:${T.teal}"></div>` : `<div style="flex:0 0 8px"></div>`) + `<div class="ss-under" style="flex:0 0 auto">${it.under}</div>` : '';
    return `<div class="ss-col" style="flex:0 0 ${fmt(it.w)}px;width:${fmt(it.w)}px;display:flex;flex-direction:column;align-items:center">${it.html}${hang}</div>`;
  });
  const H = CORD_H + minH;
  const attrs = Object.entries(stamps).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
  return `<div class="ss-line" data-lcs-story-line${attrs} style="position:relative;flex:1 1 ${fmt(H)}px;min-height:${fmt(H)}px;max-height:${fmt(H + grow)}px;width:${w}px;box-sizing:border-box;padding-top:${CORD_H}px;display:flex;gap:${fmt(gap)}px;justify-content:center">` +
    ssCord({ w, pegXs }) + (marker ? `<div data-ss-block data-lcs-line-marker style="position:absolute;left:${fmt(Math.max(0, pegXs[0] - 26))}px;top:${fmt(cordY(pegXs[0] - 18, w) - 8)}px;z-index:3">${ssMarker({ kind: marker })}</div>` : '') + cols.join('') + '</div>';
}

/** F1 pairing marker: a teal dot or triangle (16 px), stamped data-lcs-marker. */
function ssMarker({ kind, px = 16 }) {
  const g = kind === 'dot' ? el('circle', { cx: 8, cy: 8, r: 6.5, fill: T.teal })
    : kind === 'triangle' ? el('polygon', { points: '8,1.5 15,14.5 1,14.5', fill: T.teal, 'stroke-linejoin': 'round' })
      : null;
  if (!g) throw new Error(`ssMarker: kind "${kind}"`);
  return svgRoot({ width: px, height: px, label: '' }, g, { viewBox: '0 0 16 16', 'aria-hidden': 'true', 'data-lcs-marker': kind, style: 'display:block' });
}
/** F1: the empty, pegged glue frame (dashed grid 2.5, r 12) that GROWS with its line; stamped with its word slot k. */
function ssGlueFrame({ w, minH, k }) {
  return `<div class="ss-glue" data-ss-block data-lcs-glue-k="${k}" style="box-sizing:border-box;flex:1 1 auto;width:${fmt(w)}px;min-height:${fmt(minH)}px;background:${T.white};border:2.5px dashed ${T.grid};border-radius:12px"></div>`;
}
/** F1: the temporal word tag under a glue frame (Baloo 2 700 18, h 36, teal 2, white). */
function ssWordTag({ text, k }) {
  return `<span class="ss-word" data-ss-block data-lcs-word-k="${k}" style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:36px;padding:0 12px;border:2px solid ${T.teal};border-radius:10px;background:${T.white};font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:1;color:${T.ink};white-space:nowrap">${esc(text)}</span>`;
}
/** F1: one cut strip (picture-word-cards cardSheet, cols 3 x rows 1): tiles = story-panel svgs (frame:false). */
function ssCutStrip({ tiles, cellW, cellH, story, marker = null }) {
  const cards = tiles.map((t) => cutCard({ inner: t.svg, kind: 'story', pad: 2, attrs: `data-ss-tile data-lcs-seq="${t.seq}" data-lcs-tile-rank="${t.rank}" data-lcs-tile-story="${esc(story)}"` }));
  return cardSheet({ cards, cols: 3, rows: 1, w: cellW * 3, h: cellH, kind: 'story', legend: marker ? ssMarker({ kind: marker, px: 18 }) : null, extra: ` data-ss-block data-lcs-strip-story="${esc(story)}"${marker ? ` data-lcs-strip-marker="${marker}"` : ''}` });
}
/** F2: the dashed coral "what comes next?" frame; the "?" is drawn as SVG paths (no text). */
function ssQueryFrame({ w, h }) {
  const s = Math.min(w, h) * 0.42, cx = w / 2, cy = h / 2;
  const q = el('path', { d: `M${fmt(cx - s * 0.32)},${fmt(cy - s * 0.3)} Q${fmt(cx - s * 0.32)},${fmt(cy - s * 0.72)} ${fmt(cx)},${fmt(cy - s * 0.72)} Q${fmt(cx + s * 0.36)},${fmt(cy - s * 0.72)} ${fmt(cx + s * 0.36)},${fmt(cy - s * 0.38)} Q${fmt(cx + s * 0.36)},${fmt(cy - s * 0.1)} ${fmt(cx)},${fmt(cy + s * 0.02)} L${fmt(cx)},${fmt(cy + s * 0.22)}`, fill: 'none', stroke: T.coral, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }) +
    el('circle', { cx: fmt(cx), cy: fmt(cy + s * 0.5), r: 3.6, fill: T.coral });
  return `<div class="ss-query" data-ss-block data-lcs-query style="box-sizing:border-box;flex:1 1 auto;width:${fmt(w)}px;min-height:${fmt(h)}px;display:flex;align-items:center;justify-content:center;background:${T.white};border:2.5px dashed ${T.coral};border-radius:10px">` +
    svgRoot({ width: fmt(w - 6), height: fmt(h - 6), label: '' }, q, { 'aria-hidden': 'true', viewBox: `0 0 ${fmt(w)} ${fmt(h)}` }) + '</div>';
}
/** F2: the tray of choices (cream, creamDeep 2 border, r 12, padding 5). */
function ssChoiceTray({ cards, gap = 20 }) {
  return `<div class="ss-tray" data-lcs-tray style="flex:1 1 auto;display:flex;gap:${gap}px;justify-content:center;align-items:stretch;padding:5px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:12px">${cards.join('')}</div>`;
}
/** F3: the stage label pill (Baloo 2 700 18, h 32). */
function ssStageLabel({ text, k }) {
  return `<span class="ws-pill ss-stage" data-ss-block data-lcs-bme-k="${k}" style="box-sizing:border-box;height:32px;padding:0 16px;font-size:18px;line-height:1;white-space:nowrap">${esc(text)}</span>`;
}
/** F3: the EMPTY middle drawing card (the read-and-do drawBox style: white, dashed coral 2.5, r 12), growing. */
function ssDrawCard({ w, minH }) {
  return `<div class="ss-draw" data-ss-block data-lcs-drawbox style="box-sizing:border-box;flex:1 1 auto;width:${fmt(w)}px;min-height:${fmt(minH)}px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:12px"></div>`;
}
/**
 * F4: one story's match block: pictures (scrambled) on the left, the sentences on the right (fix round 2: scrambled too,
 * each with an EMPTY order box when orderBox), a dot on each facing side. rows = [{ card, sentence, rank }] where card is the picture html (already stamped).
 */
function ssSentenceMatch({ pics, sentences, picW, rowMinH, gap = 4, lineZone = 110, textW, textPx = 16, orderBox = false, stamps = {} }) {
  const attrs = Object.entries(stamps).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
  const dot = (side) => `<span class="ws-match-dot ws-match-dot--${side}" style="${side === 'right' ? 'right' : 'left'}:-${Math.round(lineZone / 2 - 30)}px;top:calc(50% - 6px)"></span>`;
  // fix round 2: the EMPTY order box the child numbers (dashed coral, 40 px, at the sentence's left edge)
  const box = orderBox ? `<span class="ss-order" data-lcs-order-box aria-hidden="true" style="flex:0 0 40px;width:40px;height:40px;box-sizing:border-box;margin-right:12px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:8px"></span>` : '';
  const left = pics.map((p) => `<div style="position:relative;flex:1 1 ${fmt(rowMinH)}px;display:flex;min-height:${fmt(rowMinH)}px">${p}${dot('right')}</div>`).join('');
  const right = sentences.map((s) => `<div class="ws-match-item ws-match-item--plain" data-ss-block data-lcs-sentence data-lcs-rank="${s.rank}" style="position:relative;box-sizing:border-box;flex:1 1 ${fmt(rowMinH)}px;min-height:${fmt(rowMinH)}px;width:${fmt(textW)}px;padding:6px 12px;align-items:center;${orderBox ? 'justify-content:flex-start;' : ''}font-family:'Nunito',sans-serif;font-weight:800;font-size:${textPx}px;line-height:1.3;color:${T.ink}">${dot('left')}${box}<span data-lcs-sentence-text${orderBox ? ' style="flex:1 1 auto;min-width:0;text-align:center"' : ''}>${esc(s.text)}</span></div>`).join('');
  return `<div class="ss-match" data-lcs-match-block${attrs} style="flex:1 1 auto;display:flex;justify-content:space-between;align-items:stretch;width:100%;min-height:${fmt(4 * rowMinH + 3 * gap)}px">` +
    `<div style="display:flex;flex-direction:column;gap:${gap}px;width:${fmt(picW)}px">${left}</div>` +
    `<div style="display:flex;flex-direction:column;gap:${gap}px;width:${fmt(textW)}px">${right}</div></div>`;
}
/** F5: the vertical cord down the left edge with one peg per picture row (SVG h tall). */
function ssVerticalCord({ h, pegYs }) {
  const P = [el('path', { d: `M5,3 Q9,${fmt(h / 2)} 5,${fmt(h - 3)}`, fill: 'none', stroke: T.teal, 'stroke-width': 2.5, 'stroke-linecap': 'round' }),
    el('circle', { cx: 5, cy: 3, r: 3.5, fill: T.teal }), el('circle', { cx: 5, cy: fmt(h - 3), r: 3.5, fill: T.teal })];
  for (const y of pegYs) P.push(el('rect', { x: 2, y: fmt(y - 4), width: 16, height: 8, rx: 2, fill: T.white, stroke: T.teal, 'stroke-width': 2 }));
  return svgRoot({ width: 20, height: fmt(h), label: '' }, P.join(''), { 'aria-hidden': 'true', 'data-lcs-vcord': '1', style: 'position:absolute;left:0;top:0;height:100%', preserveAspectRatio: 'none' });
}
/** F5: one retell row: the picture card, then two school-ruled rows, the first opening with its starter. */
function ssRetellRow({ card, starter, rank, rulingW, rows = 2, h = 52, glyphH = 24 }) {
  const ruling = rulingBlock({ rows, w: rulingW, h, glyphH, starters: starter ? { 0: starter } : {}, gap: 6 });
  return `<div class="ss-retell" data-lcs-retell data-lcs-rank="${rank}" style="flex:1 1 auto;display:flex;align-items:stretch;gap:14px;padding-left:26px">${card}` +
    `<div data-ss-block data-lcs-ruling style="flex:0 0 ${fmt(rulingW)}px;align-self:center">${ruling}</div></div>`;
}

module.exports = { ssMarker, ssCord, ssHungRow, ssTag, ssPage, ssCardBox, ssLine, ssGlueFrame, ssWordTag, ssCutStrip, ssQueryFrame, ssChoiceTray, ssStageLabel, ssDrawCard, ssSentenceMatch, ssVerticalCord, ssRetellRow, SS_GEOM: { CORD_H, PEG_BOTTOM, STRING_H }, ssCordY: cordY };
