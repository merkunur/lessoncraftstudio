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
 * `data-lcs-age`.
 *
 * Phase 2 face exports (2026-09-14; design §3, the names TYPE-SCOPED as
 * `aboutMe…` — see the note above the section; the base path consumes none
 * of them, so profileCard's output is byte-identical):
 *   aboutMeOptionTiles · aboutMeFavouriteRow (F1) · aboutMeFamilyFrames (F2) ·
 *   aboutMeFaceBank · aboutMeFaceLabels · aboutMePlaceLanes (F3) ·
 *   aboutMeCanRow · aboutMeCanGrid · aboutMeWantLane (F4) ·
 *   aboutMeNameLane · aboutMeNameBoxes · aboutMeCountCards · aboutMeCompareLane (F5)
 * `aboutMeDrawBox` gained the additive `labelKey` option (default 'family' —
 * the base's output is unchanged; F2/F3 caption their boxes familyDraw / drawFace).
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
function aboutMeDrawBox({ w, h, label = null, key, labelPx = 14, flex = false, labelKey = 'family' }) {
  // labelKey (Phase 2, additive): the data-lcs-label-key the caption carries; the base's family box keeps 'family'
  const size = flex ? `width:${w}px;flex:1 1 ${h}px;min-height:${h}px` : `width:${w}px;height:${h}px`;
  return `<div data-lcs-drawbox="${esc(key)}" style="${size};position:relative;background:${T.white};` +
    `border:2.5px dashed ${T.coral};border-radius:12px;padding:8px 10px;min-width:0">` +
    (label ? labelSpan({ text: label, key: labelKey, px: labelPx, color: T.inkSoft, extra: 'position:absolute;left:10px;top:8px' }) : '') +
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

/* ================================================================ Phase 2 faces
 * (design §3; built 2026-09-14 with the five variation faces). Every name is
 * type-scoped `aboutMe…` — the design's `optionTiles / favouriteRow /
 * familyFrames / faceLabels / canRow / nameBoxes` are generic words a sibling
 * family could export in the same namespace loader (which THROWS on a
 * duplicate for every b3 family at once; K-319 set the same convention).
 * Nothing below is consumed by the base path (profileCard is untouched).
 */
const { SWATCH, rulingBlock, wordBank, copyArrow, pillChoice, letterBoxes } = require('../components-b2.js');
const tenFrame = require('../../primitives/ten-frame.js');
const { line, circle } = require('../../primitives/_svg.js');

const LANE_PAD = 'padding:8px 16px';   // the .ws-lane inline padding every face lane uses (inner 639 at 675)

function headingSpan({ text, key, px = 18, lh = 24, extra = '', color = T.ink }) {
  return `<span data-lcs-label-key="${esc(key)}" data-lcs-heading style="font-family:${F.body},sans-serif;font-weight:800;font-size:${px}px;` +
    `line-height:${lh}px;color:${color};${extra}">${esc(text)}</span>`;
}

/* ---------------------------------------------------------- F1 option tiles */
/**
 * aboutMeOptionTiles({ options:[{key, src|color, label}], tile=100, tileH=104, pic=64, gap=7, labelPx=16 })
 *   One row of white r10 tiles (border 2 creamDeep): a 64 px `.ws-icon` picture
 *   or a 64 px SWATCH rounded rect (r 12, ink 1) over the label (Nunito 800 16,
 *   nowrap). Stamps data-lcs-opt="<key>" per tile; nothing marks a tile.
 */
function aboutMeOptionTiles({ options, tile = 100, tileH = 104, pic = 64, gap = 7, labelPx = 16 }) {
  const tiles = options.map((o) => {
    const art = o.color
      ? svgRoot({ width: pic, height: pic, label: '' }, el('rect', { x: 0.5, y: 0.5, width: pic - 1, height: pic - 1, rx: 12, fill: SWATCH[o.color], stroke: T.ink, 'stroke-width': 1 }), { 'aria-hidden': 'true', 'data-lcs-swatch': o.color })
      : `<img class="ws-icon" src="${o.src}" alt="" style="width:${pic}px;height:${pic}px" data-lcs-opt-pic="${esc(o.key)}">`;
    return `<span data-lcs-opt="${esc(o.key)}" style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;` +
      `width:${tile}px;height:${tileH}px;flex:0 0 ${tile}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:10px;min-width:0">` +
      art + `<span data-lcs-opt-label style="font-family:${F.body},sans-serif;font-weight:800;font-size:${labelPx}px;line-height:20px;color:${T.ink};white-space:nowrap;max-width:${tile - 4}px">${esc(o.label)}</span></span>`;
  });
  return `<div data-lcs-options="${options.length}" style="display:flex;gap:${gap}px;align-items:center;min-width:0">${tiles.join('')}</div>`;
}

/**
 * aboutMeFavouriteRow({ category, heading, options, glyphH=40, laneW=591, minH=224, ... })
 *   `.ws-lane` (inline padding 8 16, inner 639): heading (18 px, line-height 24)
 *   / the option tiles / `[copyArrow 40][8][writingRow laneW x 64]`. The lane
 *   FLEXES with its grid row (space-between), floor `minH`; the copy lane is
 *   EMPTY (no starter — the heading is the only category text).
 */
function aboutMeFavouriteRow({ category, heading, options, glyphH = 40, laneW = 591, minH = 224, headingPx = 18, tile, tileH, pic, gap }) {
  const laneSvg = writingRow({ w: laneW, h: 64, glyphH, xHeight: true }).svg;
  return `<div class="ws-lane" data-lcs-favrow="${esc(category)}" style="${LANE_PAD};width:675px;height:100%;min-height:${minH}px;` +
    `display:flex;flex-direction:column;justify-content:space-between;min-width:0">` +
    headingSpan({ text: heading, key: 'fav-' + category, px: headingPx, extra: 'white-space:nowrap;overflow:hidden' }) +
    aboutMeOptionTiles({ options, tile, tileH, pic, gap }) +
    `<div style="display:flex;align-items:center;gap:8px;min-width:0">${copyArrow()}` +
    `<span data-lcs-copy-lane="${esc(category)}" style="display:inline-flex;flex:0 0 ${laneW}px;width:${laneW}px;height:64px">${laneSvg}</span></div></div>`;
}

/* ------------------------------------------------------- F2 family frames */
/**
 * aboutMeFamilyFrames({ cards:[{key, heading}], cell=56, box=56, minRow=214, headingPx=18 })
 *   A 2 x 2 `.ws-cardgrid` (rows minmax(minRow,1fr), numbered badges) of
 *   `.ws-card`s: `[heading 18 px, <= 2 lines, w 236][10][blankNumeralBox box]`
 *   over an EMPTY tenFrame({a:0, cell}) (286 x 118 at 56) centred. Stamps
 *   data-lcs-frame / data-lcs-count / data-lcs-tenframe.
 */
function aboutMeFamilyFrames({ cards, cell = 56, box = 56, minRow = 214, headingPx = 18 }) {
  const cols = 2, rows = Math.ceil(cards.length / cols);
  const items = cards.map((c, i) => {
    const tf = tenFrame({ a: 0, b: 0, cell });
    return `<section class="ws-card" data-lcs-card="${i + 1}" data-lcs-frame="${esc(c.key)}" style="justify-content:center;gap:8px">` +
      `<span class="ws-card-badge">${i + 1}</span>` +
      `<div style="display:flex;align-items:center;gap:10px;min-width:0">` +
      headingSpan({ text: c.heading, key: 'count-' + c.key, px: headingPx, lh: 20, extra: `flex:1 1 auto;min-width:0;max-width:${302 - box - 10}px` }) +
      blankNumeralBox({ w: box, h: box, answer: '', attrs: `data-lcs-count="${esc(c.key)}"` }) + `</div>` +
      `<div data-lcs-tenframe="${esc(c.key)}" style="display:flex;justify-content:center">${tf.svg}</div></section>`;
  });
  return `<div class="ws-cardgrid" data-lcs-frames="${cards.length}" style="grid-template-columns:repeat(${cols},minmax(0,1fr));grid-template-rows:repeat(${rows},minmax(${minRow}px,1fr))">${items.join('')}</div>`;
}

/* ----------------------------------------------------------- F3 face labels */
/** Lane y positions for one side: each lane wants its anchor's y centred; lanes are pushed apart to >= laneH + gap and clamped inside [0, h - laneH]. */
function placeLanes(targets, laneH, h, gap = 20) {
  const step = laneH + gap;
  const ys = targets.map((t) => Math.max(0, Math.min(h - laneH, t - laneH / 2)));
  for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + step);
  for (let i = ys.length - 1; i >= 0; i--) {
    ys[i] = Math.min(ys[i], h - laneH - (ys.length - 1 - i) * step);
    if (i < ys.length - 1) ys[i] = Math.min(ys[i], ys[i + 1] - step);
  }
  return ys.map((y) => Math.round(Math.max(0, y)));
}

/**
 * aboutMeFaceLabels({ src, icon=260, anchors:{id:{x,y,side}}, ids, laneW=200, laneH=64, glyphH=40, w=674, h=360 })
 *   `[lanes L laneW][7][icon][7][lanes R laneW]` in a w x h box: the ONE
 *   printed face at (207, 50); per anchor id a coral dot (r 5) on the feature,
 *   a 2.5 px teal line to the near-edge midpoint of its lane (x laneW / w-laneW)
 *   and a teal dot (r 3.5) there; the lane = writingRow in a `.ws-blankbox`
 *   (data-lcs-label="<id>", EMPTY — the answer is the lane id, never text).
 *   Lanes per side are placed by placeLanes (anchor-centred, pushed apart,
 *   clamped); the overlay stamps every segment (data-lcs-pointer + the
 *   overlay-local end points) so verify() can re-run the crossing sweep.
 */
function aboutMeFaceLabels({ src, icon = 260, anchors, ids, laneW = 200, laneH = 64, glyphH = 40, w = 674, h = 360, gapX = 7 }) {
  const ix = laneW + gapX, iy = Math.round((h - icon) / 2);
  const abs = (id) => ({ x: ix + anchors[id].x * icon, y: iy + anchors[id].y * icon });
  const sides = { L: [], R: [] };
  for (const id of ids) sides[anchors[id].side].push(id);
  const lanes = [], pointers = [];
  for (const side of ['L', 'R']) {
    const list = sides[side].slice().sort((a, b) => abs(a).y - abs(b).y);
    const ys = placeLanes(list.map((id) => (anchors[id].lane != null ? anchors[id].lane * h + laneH / 2 : abs(id).y)), laneH, h);
    list.forEach((id, i) => {
      const lx = side === 'L' ? 0 : w - laneW, ly = ys[i];
      const ex = side === 'L' ? laneW : w - laneW, ey = ly + laneH / 2;
      const a = abs(id);
      lanes.push(`<span class="ws-blankbox" data-lcs-label="${esc(id)}" data-lcs-side="${side}" style="position:absolute;left:${lx}px;top:${ly}px;width:${laneW}px;height:${laneH}px;` +
        `display:inline-flex;align-items:center;justify-content:center">${writingRow({ w: laneW - 6, h: laneH - 6, glyphH, xHeight: true }).svg}</span>`);
      pointers.push(
        line({ x1: a.x.toFixed(1), y1: a.y.toFixed(1), x2: ex, y2: ey, strokeColor: T.teal, strokeWidth: 2.5, cap: 'round',
          data: { 'data-lcs-pointer': id, 'data-lcs-ax': a.x.toFixed(1), 'data-lcs-ay': a.y.toFixed(1), 'data-lcs-lx': ex, 'data-lcs-ly': ey } }) +
        circle({ cx: a.x.toFixed(1), cy: a.y.toFixed(1), r: 5, fill: T.coral, data: { 'data-lcs-anchor-dot': id } }) +
        circle({ cx: ex, cy: ey, r: 3.5, fill: T.teal, data: { 'data-lcs-lane-dot': id } }));
    });
  }
  const overlay = svgRoot({ width: w, height: h, label: '' }, pointers.join(''), { 'aria-hidden': 'true', 'data-lcs-pointers': ids.length, style: 'position:absolute;left:0;top:0;pointer-events:none' });
  return `<div data-lcs-facelabels data-lcs-icon-px="${icon}" style="position:relative;width:${w}px;height:${h}px;flex:0 0 ${h}px">` +
    `<img class="ws-icon" src="${src}" alt="" data-lcs-face-pic style="position:absolute;left:${ix}px;top:${iy}px;width:${icon}px;height:${icon}px">` +
    lanes.join('') + overlay + `</div>`;
}

/**
 * aboutMeFaceBank({ words:[{id, word}], wordPx=17 })  the word bank (components-b2 wordBank,
 *   `.ws-scene-banner` 59 high + its own margin-bottom 10) with data-lcs-bank="<id>" per word.
 */
function aboutMeFaceBank({ words, wordPx = 17 }) {
  return wordBank({ words: words.map((w) => ({ word: w.word, vocabKey: w.id })), wordPx });
}

/* --------------------------------------------------------------- F4 can rows */
/**
 * aboutMeCanRow({ id, src, literal, tick=56, pic=80, textW=146, literalPx=18 })
 *   One `.ws-card` (no badge): `[blankNumeralBox tick][10][.ws-icon pic][10][literal 18 px, <= 2 lines, w textW]`;
 *   data-lcs-action="<id>", the tick data-lcs-tick, the literal data-lcs-can.
 */
function aboutMeCanRow({ id, src, literal, tick = 56, pic = 80, textW = 146, literalPx = 18 }) {
  return `<section class="ws-card" data-lcs-action="${esc(id)}" style="justify-content:center">` +
    `<div style="display:flex;align-items:center;gap:10px;min-width:0">` +
    blankNumeralBox({ w: tick, h: tick, answer: '', attrs: `data-lcs-tick="${esc(id)}"` }) +
    `<img class="ws-icon" src="${src}" alt="" style="width:${pic}px;height:${pic}px;flex:0 0 ${pic}px" data-lcs-cue="${esc(id)}">` +
    `<span data-lcs-can="${esc(id)}" style="font-family:${F.body},sans-serif;font-weight:800;font-size:${literalPx}px;line-height:22px;color:${T.ink};width:${textW}px;flex:0 0 ${textW}px;min-width:0">${esc(literal)}</span>` +
    `</div></section>`;
}
/** aboutMeCanGrid({ cards, minRow=132 })  a 2 x 4 `.ws-cardgrid` with rows minmax(minRow,1fr). */
function aboutMeCanGrid({ cards, minRow = 132 }) {
  const rows = Math.ceil(cards.length / 2);
  return `<div class="ws-cardgrid" data-lcs-cangrid="${cards.length}" style="grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(${rows},minmax(${minRow}px,1fr))">${cards.join('')}</div>`;
}
/** aboutMeWantLane({ label, glyphH=40, h=116 })  `.ws-lane` 675 x h: the wantLearn literal (18/24) over ONE ruling row 639 x 64. */
function aboutMeWantLane({ label, glyphH = 40, h = 116 }) {
  return `<div class="ws-lane" data-lcs-wantlearn style="${LANE_PAD};width:675px;height:${h}px;display:flex;flex-direction:column;gap:6px;min-width:0">` +
    headingSpan({ text: label, key: 'wantLearn', extra: 'white-space:nowrap;overflow:hidden' }) +
    rulingBlock({ rows: 1, w: 639, h: 64, glyphH }) + `</div>`;
}

/* ------------------------------------------------------------- F5 my name */
/** aboutMeNameLane({ who, label, hint=null, laneW=639, glyphH=40, h=112 })  `.ws-lane`: `[label 18/24 … hint 16 inkSoft]` / writingRow laneW x 64 (data-lcs-namelane="<who>", EMPTY). */
function aboutMeNameLane({ who, label, labelKey, hint = null, hintKey = 'oneLetterPerBox', laneW = 639, glyphH = 40, h = 112 }) {
  return `<div class="ws-lane" data-lcs-namerow="${esc(who)}" style="${LANE_PAD};width:675px;height:${h}px;display:flex;flex-direction:column;gap:4px;min-width:0">` +
    `<div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;min-width:0">` +
    headingSpan({ text: label, key: labelKey, extra: 'white-space:nowrap;overflow:hidden' }) +
    (hint ? labelSpan({ text: hint, key: hintKey, px: 16, color: T.inkSoft, extra: 'flex:0 1 auto;min-width:0;overflow:hidden' }) : '') + `</div>` +
    `<span data-lcs-namelane="${esc(who)}" data-lcs-lane-w="${laneW}" style="display:inline-flex;flex:0 0 64px;width:${laneW}px;height:64px">${writingRow({ w: laneW, h: 64, glyphH, xHeight: true }).svg}</span></div>`;
}
/** aboutMeNameBoxes({ who, n=10, box=56, gap=6, h=78 })  `.ws-lane` 675 x h with letterBoxes(n, box, gap) centred (data-lcs-nameboxes="<who>"). */
function aboutMeNameBoxes({ who, n = 10, box = 56, gap = 6, h = 78 }) {
  return `<div class="ws-lane" data-lcs-nameboxes="${esc(who)}" data-lcs-n="${n}" style="${LANE_PAD};width:675px;height:${h}px;display:flex;align-items:center;justify-content:center;min-width:0">` +
    letterBoxes({ n, box, gap }) + `</div>`;
}
/** aboutMeCountCards({ cards:[{key, heading, attr}], boxW=60, boxH=56, h=110 })  two `.ws-card`s side by side: `[heading 18/20 <= 2 lines w 232][10][blankNumeralBox]`. */
function aboutMeCountCards({ cards, boxW = 60, boxH = 56, h = 110 }) {
  const items = cards.map((c) => `<section class="ws-card" data-lcs-countcard="${esc(c.key)}" style="height:${h}px;justify-content:center">` +
    `<div style="display:flex;align-items:center;gap:10px;min-width:0">` +
    headingSpan({ text: c.heading, key: c.key, lh: 20, extra: `flex:1 1 auto;min-width:0;max-width:${302 - boxW - 10}px` }) +
    blankNumeralBox({ w: boxW, h: boxH, answer: '', attrs: c.attr }) + `</div></section>`);
  return `<div data-lcs-countcards="${cards.length}" style="display:flex;gap:14px;min-width:0">${items.join('')}</div>`;
}
/** aboutMeCompareLane({ question, items:[{key,label}], h=100 })  `.ws-lane`: the question (18/24) over two `.ws-pill`s in FIXED order. */
function aboutMeCompareLane({ question, items, h = 100, fontPx = 20 }) {
  return `<div class="ws-lane" data-lcs-compare style="${LANE_PAD};width:675px;height:${h}px;display:flex;flex-direction:column;gap:8px;min-width:0">` +
    headingSpan({ text: question, key: 'whoHasMore.question', extra: 'white-space:nowrap;overflow:hidden;text-align:center' }) +
    pillChoice({ items, fontPx }) + `</div>`;
}

module.exports = {
  profileCard, portraitFrame, favouriteWindow, aboutMeBanner, aboutMeDrawBox,
  // Phase 2 faces
  aboutMeOptionTiles, aboutMeFavouriteRow, aboutMeFamilyFrames, aboutMeFaceLabels, aboutMeFaceBank, aboutMePlaceLanes: placeLanes,
  aboutMeCanRow, aboutMeCanGrid, aboutMeWantLane, aboutMeNameLane, aboutMeNameBoxes, aboutMeCountCards, aboutMeCompareLane,
};
