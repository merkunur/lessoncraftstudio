/**
 * components-b3/all-about-me.js — the K-323 `all-about-me` family components
 * (design: docs/worksheet-gen/b3-designs/K-323-all-about-me.md §2). Merged
 * into the templates/components-b3.js namespace; HTML + inline SVG on the
 * token palette, scoped inline CSS, no page.css edit. Nothing here prints an
 * answer: every field is a LABELLED EMPTY SLOT the child fills (a writing
 * lane, an open numeral box, a dashed drawing zone); ground truth on the
 * base is structural only (data-lcs-name / data-lcs-age / data-lcs-drawbox /
 * data-lcs-label-key), never a value.
 *
 * Base-page exports (Phase 1; the names the design file declares NEW):
 *
 *   profileCard({ rows, banner, portrait, age, family, favourites, sentence })
 *     The whole base body: a grid of `rows` (gap 12) — the name banner, the
 *     portrait + age/family column pair, an optional favourites row and an
 *     optional sentence lane. Root stamps `data-ws-content
 *     data-lcs-type="all-about-me"` + the config the gate re-derives
 *     (data-lcs-drawboxes, data-lcs-glue, data-lcs-heading-px …).
 *
 *   portraitFrame({ size = 300, stretch = false, label, corners = true })
 *     The 300 px portrait: white, teal 3 border, radius 16; a dashed coral
 *     drawing zone inset 16 (`data-lcs-drawbox="portrait"`), four photo
 *     corners (SVG right triangles, legs 22, tealSoft fill, teal 2 stroke —
 *     the stroke survives a mono print) and the caption in the 32 px strip
 *     under the zone (Nunito 800 14). `stretch` lets d1 fill the row height
 *     (a portrait-orientation frame; the zone keeps the 16 inset and grows).
 *
 *   favouriteWindow({ w = 217, h = 220, minH = h, heading, key, headingPx = 18 })
 *     One favourite window: white, teal 2, radius 12; a tealSoft heading band
 *     46 high (Nunito 800 18 centred, line-height 20, <= 2 lines, padding 0
 *     12 so the inner text width is w - 28: 189 at 217) and a dashed coral
 *     draw zone (`data-lcs-drawbox="fav-<key>"`) that FLEXES with the row
 *     (the slack of a taller body opens inside the zone; `minH` = the row's
 *     minmax floor, so a squeezed row never overflows into the row below).
 *
 * Two reuse stand-ins (recorded deviation, _work/K-323-build.md): the design
 * reuses G2-318's `nameBanner` and G1-308's `drawBox`, and NEITHER family is
 * on disk today; a same-name export from two family files makes the
 * namespace THROW for every b3 family, so they are exported TYPE-SCOPED and
 * fold into the owners' components when those land:
 *
 *   aboutMeBanner({ label, laneW = 440, glyphH = 40, h = 84, labelPx = 20 })
 *     The name banner: tealSoft, radius 14, no border, padding 10 16 (inner
 *     643 x 64 at h 84): `[label Nunito 800 20][12][writingRow laneW x 64]`;
 *     the lane is stamped `data-lcs-name` and EMPTY (G2-318 `name:null`
 *     eyebrow mode + the additive laneW / glyphH / h / icon:null options).
 *
 *   aboutMeDrawBox({ w, h, label, key, labelPx = 14, flex = false })
 *     The plain drawing box: white, dashed coral 2.5, radius 12, an optional
 *     label (Nunito 800 14 inkSoft, top-left, `data-lcs-label-key`);
 *     `data-lcs-drawbox="<key>"`.
 *
 * The age lane is internal (`ageLane`): `.ws-lane` with the inline
 * `padding:8px 16px` (inner w - 36 x 64): `[pre][10][blankNumeralBox box x box]
 * [10 | 0 when glue][post]`, Nunito 800 20; the numeral box is K-320's
 * `blankNumeralBox` (the ONE open-box component, README ruling), stamped
 * `data-lcs-age`. The face components the design lists for Phase 2
 * (optionTiles, favouriteRow, familyFrames, faceLabels, canRow, nameBoxes)
 * are added here when those faces are built — never ahead of their spec.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { blankNumeralBox } = require('./ordinal-numbers.js');

const T = tokens.color;
const F = tokens.font;
const GAP = 12;

function labelSpan({ text, key, px, color = T.ink, extra = '' }) {
  return `<span data-lcs-label-key="${esc(key)}" style="font-family:${F.body},sans-serif;font-weight:800;font-size:${px}px;` +
    `line-height:${px + 4}px;color:${color};white-space:nowrap;${extra}">${esc(text)}</span>`;
}

/* ------------------------------------------------------------------ banner */
function aboutMeBanner({ label, laneW = 440, glyphH = 40, h = 84, labelPx = 20 }) {
  const laneH = h - 20;
  const lane = writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg;
  return `<div data-lcs-banner style="display:flex;align-items:center;gap:${GAP}px;width:675px;height:${h}px;` +
    `padding:10px 16px;background:${T.tealSoft};border-radius:14px;min-width:0">` +
    labelSpan({ text: label, key: 'nameIs', px: labelPx, extra: 'flex:0 1 auto;min-width:0;overflow:hidden' }) +
    `<span data-lcs-name data-lcs-lane-w="${laneW}" style="display:inline-flex;flex:0 0 ${laneW}px;width:${laneW}px;height:${laneH}px">${lane}</span>` +
    `</div>`;
}

/* ---------------------------------------------------------------- portrait */
function photoCorners({ leg = 22 }) {
  // four small SVGs pinned to the zone's corners (never one overlay sized to
  // the zone's MIN height — a stretched d1 zone left the bottom pair mid-zone)
  const S = leg + 2;
  const tri = (pts) => el('polygon', { points: pts, fill: T.tealSoft, stroke: T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round' });
  const at = (pos, pts) => svgRoot({ width: S, height: S, label: '' }, tri(pts), { 'aria-hidden': 'true', 'data-lcs-corner': pos, style: `position:absolute;${pos};pointer-events:none` });
  return at('left:0;top:0', `1,1 ${leg},1 1,${leg}`) +
    at('right:0;top:0', `${S - 1},1 ${S - leg},1 ${S - 1},${leg}`) +
    at('left:0;bottom:0', `1,${S - 1} ${leg},${S - 1} 1,${S - leg}`) +
    at('right:0;bottom:0', `${S - 1},${S - 1} ${S - leg},${S - 1} ${S - 1},${S - leg}`);
}

function portraitFrame({ size = 300, stretch = false, label, corners = true, labelPx = 14 }) {
  const inset = 16, border = 3, strip = 32;
  const zoneW = size - 2 * inset;
  const zoneH = size - inset - strip;
  return `<div data-lcs-portrait data-lcs-stretch="${stretch ? 1 : 0}" style="position:relative;width:${size}px;height:${stretch ? '100%' : size + 'px'};min-height:${size}px;` +
    `background:${T.white};border:${border}px solid ${T.teal};border-radius:16px;padding:${inset - border}px ${inset - border}px 0;display:flex;flex-direction:column;min-width:0">` +
    `<div data-lcs-drawbox="portrait" style="position:relative;width:${zoneW}px;flex:1 1 ${zoneH}px;min-height:${zoneH}px;` +
    `border:2.5px dashed ${T.coral};border-radius:12px;background:${T.white}">` +
    (corners ? photoCorners({}) : '') +
    `</div>` +
    `<div style="height:${strip - border}px;display:flex;align-items:center;justify-content:center">` +
    labelSpan({ text: label, key: 'thisIsMe', px: labelPx }) + `</div></div>`;
}

/* ----------------------------------------------------------------- age lane */
function ageLane({ pre, post, glue = false, box = 64, w = 360, h = 84, labelPx = 20 }) {
  const gap2 = glue ? 0 : 10;
  return `<div class="ws-lane" data-lcs-agelane data-lcs-glue="${glue ? 1 : 0}" style="padding:8px 16px;width:${w}px;height:${h}px;` +
    `display:flex;align-items:center;gap:0;min-width:0">` +
    labelSpan({ text: pre, key: 'agePre', px: labelPx }) +
    `<span style="flex:0 0 10px;width:10px"></span>` +
    blankNumeralBox({ w: box, h: box, answer: '', attrs: 'data-lcs-age' }) +
    `<span style="flex:0 0 ${gap2}px;width:${gap2}px"></span>` +
    labelSpan({ text: post, key: 'agePost', px: labelPx }) +
    `</div>`;
}

/* ----------------------------------------------------------------- draw box */
function aboutMeDrawBox({ w, h, label = null, key, labelPx = 14, flex = false }) {
  const size = flex ? `width:${w}px;flex:1 1 ${h}px;min-height:${h}px` : `width:${w}px;height:${h}px`;
  return `<div data-lcs-drawbox="${esc(key)}" style="${size};position:relative;background:${T.white};` +
    `border:2.5px dashed ${T.coral};border-radius:12px;padding:8px 10px;min-width:0">` +
    (label ? labelSpan({ text: label, key: 'family', px: labelPx, color: T.inkSoft, extra: 'position:absolute;left:10px;top:8px' }) : '') +
    `</div>`;
}

/* ---------------------------------------------------------- favourite window */
function favouriteWindow({ w = 217, h = 220, minH = h, heading, key, headingPx = 18, band = 46 }) {
  const innerW = w - 4;
  const zoneW = innerW - 24;
  const zoneMin = minH - 4 - band - 20;   // the zone floor at the ROW's minmax floor (150 at the design's 220)
  return `<div data-lcs-favourite="${esc(key)}" data-lcs-min-h="${minH}" style="display:flex;flex-direction:column;width:${w}px;height:100%;min-height:${minH}px;` +
    `background:${T.white};border:2px solid ${T.teal};border-radius:12px;overflow:hidden;min-width:0">` +
    `<div style="display:flex;align-items:center;justify-content:center;height:${band}px;padding:0 12px;background:${T.tealSoft};min-width:0">` +
    `<span data-lcs-label-key="fav-${esc(key)}" data-lcs-heading style="font-family:${F.body},sans-serif;font-weight:800;font-size:${headingPx}px;` +
    `line-height:20px;color:${T.ink};text-align:center;max-width:${zoneW}px">${esc(heading)}</span></div>` +
    `<div style="display:flex;flex:1 1 auto;padding:10px 12px;min-height:0">` +
    `<div data-lcs-drawbox="fav-${esc(key)}" style="width:${zoneW}px;flex:1 1 ${zoneMin}px;min-height:${zoneMin}px;` +
    `border:2.5px dashed ${T.coral};border-radius:12px;background:${T.white}"></div></div></div>`;
}

/* ------------------------------------------------------------ sentence lane */
function sentenceLane({ label, key, laneW = 400, glyphH = 40, h = 84, labelPx = 20 }) {
  const laneH = h - 20;
  const lane = writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg;
  return `<div class="ws-lane" data-lcs-sentence="${esc(key)}" style="padding:8px 16px;width:675px;height:${h}px;display:flex;align-items:center;gap:${GAP}px;min-width:0">` +
    labelSpan({ text: label, key, px: labelPx, extra: 'flex:0 1 auto;min-width:0;overflow:hidden' }) +
    `<span data-lcs-lane="${esc(key)}" style="display:inline-flex;flex:0 0 ${laneW}px;width:${laneW}px;height:${laneH}px">${lane}</span></div>`;
}

/* ------------------------------------------------------------ profile card */
/**
 * @param {object} o
 *   rows        grid-template-rows literal (e.g. '84px 300px minmax(220px,1fr)')
 *   banner      { label, laneW, glyphH, h }
 *   portrait    { size, stretch, label }          stretch: fill the row height (d1)
 *   age         { pre, post, glue, box, w, h }
 *   family      { label, w, h }                   flexes under the age lane
 *   favourites  [{ key, heading, w, h, minH }] | null   one flex row, space-between
 *   sentence    { key, label, laneW, glyphH } | null
 *   stamps      extra root attributes (string)
 */
function profileCard({ rows, banner, portrait, age, family, favourites = null, sentence = null, stamps = '' }) {
  const colW = 675 - portrait.size - 15;
  const rowsHtml = [];
  rowsHtml.push(aboutMeBanner(banner));
  rowsHtml.push(`<div data-lcs-pair style="display:flex;gap:15px;align-items:stretch;min-height:0">` +
    portraitFrame({ size: portrait.size, stretch: !!portrait.stretch, label: portrait.label }) +
    `<div style="display:flex;flex-direction:column;gap:${GAP}px;width:${colW}px;min-height:0">` +
    ageLane({ ...age, w: colW }) +
    aboutMeDrawBox({ w: colW, h: family.h, label: family.label, key: 'family', flex: true }) +
    `</div></div>`);
  if (favourites && favourites.length) {
    rowsHtml.push(`<div data-lcs-favourites="${favourites.length}" style="display:flex;justify-content:space-between;align-items:stretch;min-height:0">` +
      favourites.map((f) => favouriteWindow(f)).join('') + `</div>`);
  }
  if (sentence) rowsHtml.push(sentenceLane(sentence));
  const drawboxes = 2 + (favourites ? favourites.length : 0);
  return `<div data-ws-content data-lcs-type="all-about-me" data-lcs-drawboxes="${drawboxes}" data-lcs-glue="${age.glue ? 1 : 0}" ` +
    `data-lcs-box="${age.box}" data-lcs-portrait-size="${portrait.size}" data-lcs-favourite-n="${favourites ? favourites.length : 0}" ` +
    `data-lcs-sentence-key="${sentence ? esc(sentence.key) : ''}" ${stamps} ` +
    `style="flex:1;display:grid;grid-template-rows:${rows};gap:${GAP}px;min-height:0">` + rowsHtml.join('') + `</div>`;
}

module.exports = { profileCard, portraitFrame, favouriteWindow, aboutMeBanner, aboutMeDrawBox };
