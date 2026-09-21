/**
 * components-b4/recycling.js — the K-357 `recycling` family components
 * (design: docs/worksheet-gen/b4-designs/K-357-recycling.md §2 "NEW
 * templates/components-b4/recycling.js"; rulings _work/K-357-critic.md).
 * Merged into the templates/components-b4.js namespace; every name is
 * type-scoped (`bin…` / `sortStrip` / `whichBinRow` / `materialRow` /
 * `oddRow` / `legendChips` / `exampleShelf` / `recycleLane`) so no sibling
 * family can collide.
 *
 * The one thing this family owns: the MATERIAL of a finished PRODUCT as the
 * sorting key, under the LOCALE's own drawn bin set (primitives/bin.js: a
 * lidded bin, a coloured lid, a position-keyed white lid mark, a cream word
 * pill). Nothing here ever prints an answer: bins are drawn EMPTY, the truth
 * lives in `data-lcs-*` stamps, and the only words a surface may print are
 * bin labels, material words and colour words — whole panel literals passed
 * in; never an item noun.
 *
 * Exports (the §2 list; every number is the design's, measured):
 *   RC_CSS      the scoped `.rc-*` CSS the base root carries (the
 *               science-category-sort `.sci-*` look cloned; the factory's
 *               build() is NOT called). The root is `flex:0 0 auto` at the TOP
 *               of the body (reviewer ruling 2026-09-21: the page read SPARSE
 *               with a 430 px blank between strip and bins under the one-line
 *               chrome); the line zone is a FIXED `.rc-zone` block (the spec
 *               stamps its height) and the page's slack falls BELOW the bins.
 *   binRow({bins, binW, binH=176, pillPx=17, gap=14, fill='lid'})
 *               `.rc-bins` flex centred, padding-top 30 (pill overhang 26 + 4),
 *               N `.rc-binslot` (position relative, flex 0 0 binW, height
 *               binH; stamps data-lcs-bin data-lcs-materials data-lcs-color
 *               data-lcs-mark data-lcs-label) each with `.rc-pill` (absolute
 *               top -26, centred, nowrap, cream, border 2.5 teal, r 999,
 *               padding 5 10, Baloo 2 700 pillPx teal; data-lcs-pill-px) +
 *               bin({w:binW, h:binH, colour, mark, fill}). A bin with
 *               `color:null` draws the neutral 'teal' lid and stamps
 *               data-lcs-color="none".
 *   sortStrip({items, tile=72, iconPx=60, gap=12})
 *               one `.rc-strip` row (flex-wrap OFF; d3's second row is a
 *               second strip): cream tiles, border 2 #F0E4CB, r 14, OUTER
 *               tile x tile (padding = (tile - 4 - iconPx) / 2: 4 at 72 / 60,
 *               so 8 x 72 + 7 x 12 = 660 holds — the design's "padding 6"
 *               would make the tile 76 outer; recorded), `.ws-icon` iconPx,
 *               coral dot 11 on the bottom edge (`.rc-dot`). Stamps per tile
 *               data-lcs-item data-lcs-material data-lcs-bin data-lcs-family
 *               data-lcs-vocab data-lcs-theme; the img src = fileUri.
 *   keyBins({bins, slotW=117, binW=56, binH=84, pillPx=15})
 *               F1 key strip: N slots of slotW (the same centres as binRow)
 *               each a 15 px pill + a 56 x 84 lid-filled bin centred under it;
 *               height 24 + 4 + 84 = 112; stamps data-lcs-key + per slot
 *               data-lcs-key-bin data-lcs-mark. `legendBins` = the same
 *               function under the build brief's name.
 *   binChips({bins, tile=64, tileH=80, binW=44, gap=10})
 *               F1: N white rounded-SQUARE tiles (r 12, border 2 creamDeep —
 *               NOT rings: the pencil circle must be the only circle in the
 *               row) each holding bin({w:44, h:66, fill:'lid'}); stamps
 *               data-lcs-chip="<binKey>" data-lcs-mark; width 5 x 64 + 4 x 10
 *               = 330.
 *   whichBinRow({n, item, chips, tile=72, iconPx=60})
 *               F1: white card r 12, border 2 creamDeep, grid `30px 72px 1fr
 *               330px` gap 12, padding 0 12 (480 <= 675; the spacer takes the
 *               rest): badge · product tile 72 (icon 60) · spacer · chips.
 *               Stamps data-lcs-row data-lcs-n data-lcs-item data-lcs-material
 *               data-lcs-bin data-lcs-chip-order.
 *   materialRow({n, item, rulingW=400, tile=64, iconPx=52, glyphH=30, rowH=58})
 *               F2: white card r 12, grid `30px 64px 1fr` gap 12, padding 0 12
 *               (542 <= 675): badge · tile 64 (icon 52 >= G1 44) ·
 *               writingRow({w:400, h:58, glyphH:30, xHeight:true})
 *               right-aligned. Stamps data-lcs-row data-lcs-n data-lcs-item
 *               data-lcs-material data-lcs-word="<literal>" (never printed).
 *   oddRow({items, oddIdx, box=120, iconPx=84})
 *               F3: `.ws-card-stage` space-evenly, padding 6, four box x box
 *               white boxes r 10 (the K-043 look) holding `.ws-icon` iconPx;
 *               every box data-lcs-item + data-lcs-material + data-lcs-vocab;
 *               the odd one data-lcs-odd="1"; stamps data-lcs-items.
 *   legendChips({entries, wordPx=17})
 *               F4: `.ws-scene-banner` (white, dashed coral 2.5, r 12) of
 *               [22 px swatch rect r 5, fill = token(colourKey), stroke ink 1]
 *               [8][colour word Nunito 800 17 ink][6][bin word Baloo 2 700 17
 *               teal] items, gap 22, flex-wrap; colour keys resolve
 *               codeColors.* OR color.inkSoft, anything else THROWS (the
 *               neutral 'teal' is NOT a legend colour). Stamps
 *               data-lcs-legend="<binKey>" data-lcs-color="<colourKey>".
 *   exampleShelf({items, pic=56, w=117, h=64})
 *               F4: a cream strip w x h under a bin holding two pic px
 *               pictures (2 x 56 + 4 = 116 <= 117); stamps data-lcs-shelf +
 *               per picture data-lcs-example="<id>" data-lcs-bin.
 *   recycleLane({n, draw={w:170, h:150}, rows=2, starter=null, rulingW=400, h=56, glyphH=36})
 *               F5: `.ws-lane` with the inline `padding:10px 12px` override
 *               (inner 651) grid `30px 170px 1fr` gap 12 (30 + 12 + 170 + 12
 *               + 400 = 624 <= 651): badge · drawBox({w:170, h:150}) ·
 *               rulingBlock({rows:2, w:400, h:56, glyphH:36, starters:{0:
 *               starter}, gap:8}). Stamps data-lcs-lane data-lcs-n data-lcs-rows.
 *
 * Palette: cream / creamDeep / white / teal / coral / ink / inkSoft tokens +
 * the page.css tile border hex `#F0E4CB` (the `.ws-match-item` / `.sci-item`
 * border) and the codeColors on lids / swatches; the white lid marks are
 * `color.white`. All CSS inline or in RC_CSS, scoped `.rc-*` (no page.css
 * edit); qa/lints.js rejects off-palette SVG hex.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc, svgRoot, el } = require('../../primitives/_svg.js');
const { bin } = require('../../primitives/bin.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { rulingBlock } = require('../components-b2.js');
const { drawBox } = require('../components-b3.js');

const T = tokens.color;
const F = tokens.font;
const CODE = tokens.codeColors;
/** The page.css `.ws-match-item` / `.sci-item` border tint. */
const TILE_BORDER = '#F0E4CB';
const NEUTRAL_LID = 'teal';

const icon = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px">`;
const badge = (n) => `<span class="rc-badge" style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:16px">${n}</span>`;

/** The lid colour KEY a bin draws with: its `color` or the neutral house lid. */
function lidColourKey(b) { return b.color || NEUTRAL_LID; }
/** A legend / swatch colour key: codeColors.* or inkSoft; anything else THROWS (never the neutral lid). */
function swatchHex(key) {
  if (CODE[key]) return CODE[key];
  if (key === 'inkSoft') return T.inkSoft;
  throw new Error(`recycling: colour "${key}" is not a codeColors key or 'inkSoft'`);
}
function checkBins(bins, who) {
  if (!Array.isArray(bins) || bins.length < 2 || bins.length > 5) throw new Error(`${who}: bins must be 2..5 (got ${Array.isArray(bins) ? bins.length : typeof bins})`);
  bins.forEach((b, i) => {
    if (!b || typeof b.key !== 'string' || !b.key) throw new Error(`${who}: bin ${i} has no key`);
    if (typeof b.label !== 'string' || !b.label.trim()) throw new Error(`${who}: bin ${b.key} has no label`);
    if (!Array.isArray(b.materials)) throw new Error(`${who}: bin ${b.key} has no materials`);
  });
}

const RC_CSS = `
.rc-sort{flex:0 0 auto;align-self:stretch;display:flex;flex-direction:column;justify-content:flex-start;min-height:0}
.rc-zone{flex:0 0 auto;display:block}
.rc-strips{display:flex;flex-direction:column;align-items:center;gap:12px;padding:4px 0 8px}
.rc-strip{display:flex;justify-content:center;align-items:center;flex-wrap:nowrap}
.rc-tile{position:relative;display:inline-flex;align-items:center;justify-content:center;background:${T.cream};border:2px solid ${TILE_BORDER};border-radius:14px;box-sizing:border-box}
.rc-tile .rc-dot{position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);width:11px;height:11px;border-radius:50%;background:${T.coral};border:2px solid ${T.white}}
.rc-bins{display:flex;justify-content:center;align-items:flex-end;padding-top:30px}
.rc-binslot{position:relative;display:block}
.rc-pill{position:absolute;top:-26px;left:50%;transform:translateX(-50%);white-space:nowrap;background:${T.cream};border:2.5px solid ${T.teal};border-radius:999px;padding:5px 10px;font-family:${F.display},cursive;font-weight:700;line-height:1.2;color:${T.teal}}
`;

/* ---------------------------------------------------------------- base: the bin row */
function binRow({ bins, binW, binH = 176, pillPx = 17, gap = 14, fill = 'lid' }) {
  checkBins(bins, 'binRow');
  if (!(binW >= 40)) throw new Error(`binRow: binW ${binW} < 40 (never a bin under 40 wide)`);
  const slots = bins.map((b, i) => {
    const colour = lidColourKey(b);
    const drawn = bin({ w: binW, h: binH, colour, mark: i, fill });
    return `<div class="rc-binslot" style="flex:0 0 ${binW}px;height:${binH}px" data-lcs-bin="${esc(b.key)}" data-lcs-materials="${esc(b.materials.join(','))}" ` +
      `data-lcs-color="${esc(b.color || 'none')}" data-lcs-mark="${i}" data-lcs-label="${esc(b.label)}">` +
      `<span class="rc-pill" style="font-size:${pillPx}px" data-lcs-pill data-lcs-pill-px="${pillPx}">${esc(b.label)}</span>` +
      drawn.svg + `</div>`;
  }).join('');
  return `<div class="rc-bins" data-lcs-bins-row data-lcs-bin-w="${binW}" data-lcs-bin-h="${binH}" data-lcs-fill="${esc(fill)}" style="gap:${gap}px">${slots}</div>`;
}

/* ---------------------------------------------------------------- base: the product strip */
function sortStrip({ items, tile = 72, iconPx = 60, gap = 12 }) {
  if (!Array.isArray(items) || !items.length) throw new Error('sortStrip: no items');
  const pad = (tile - 4 - iconPx) / 2;
  if (pad < 0) throw new Error(`sortStrip: icon ${iconPx} does not fit tile ${tile}`);
  const tiles = items.map((it) =>
    `<span class="rc-tile" style="width:${tile}px;height:${tile}px;padding:${pad}px" data-lcs-item="${esc(it.id)}" data-lcs-material="${esc(it.material)}" data-lcs-bin="${esc(it.bin)}" ` +
    `data-lcs-family="${esc(it.family)}" data-lcs-vocab="${esc(it.vocabKey)}" data-lcs-theme="${esc(it.theme)}" data-lcs-noun="${esc(it.noun)}">${icon(it.src, iconPx)}<span class="rc-dot"></span></span>`).join('');
  return `<div class="rc-strip" data-lcs-strip data-lcs-tile="${tile}" data-lcs-icon-px="${iconPx}" style="gap:${gap}px">${tiles}</div>`;
}

/* ---------------------------------------------------------------- F1: the key strip */
function keyBins({ bins, slotW = 117, binW = 56, binH = 84, pillPx = 15, gap = 14 }) {
  checkBins(bins, 'keyBins');
  const slots = bins.map((b, i) => {
    const drawn = bin({ w: binW, h: binH, colour: lidColourKey(b), mark: i, fill: 'lid' });
    return `<div class="rc-keyslot" style="position:relative;flex:0 0 ${slotW}px;height:${binH}px;margin-top:28px;display:flex;justify-content:center;align-items:flex-end" ` +
      `data-lcs-key-bin="${esc(b.key)}" data-lcs-mark="${i}" data-lcs-color="${esc(b.color || 'none')}" data-lcs-label="${esc(b.label)}">` +
      `<span class="rc-pill" style="font-size:${pillPx}px;top:-24px" data-lcs-pill data-lcs-pill-px="${pillPx}">${esc(b.label)}</span>` + drawn.svg + `</div>`;
  }).join('');
  return `<div class="rc-key" data-lcs-key data-lcs-bin-w="${binW}" style="display:flex;justify-content:center;align-items:flex-end;gap:${gap}px;height:112px">${slots}</div>`;
}
const legendBins = keyBins;

/* ---------------------------------------------------------------- F1: the mini-bin chips */
function binChips({ bins, tile = 64, tileH = 80, binW = 44, gap = 10 }) {
  checkBins(bins, 'binChips');
  if (!(binW >= 40)) throw new Error(`binChips: binW ${binW} < 40`);
  const binH = Math.round(binW * 1.5);
  const chips = bins.map((b, i) =>
    `<span class="rc-chip" data-lcs-chip="${esc(b.key)}" data-lcs-mark="${i}" style="display:inline-flex;align-items:center;justify-content:center;width:${tile}px;height:${tileH}px;box-sizing:border-box;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px">` +
    bin({ w: binW, h: binH, colour: lidColourKey(b), mark: i, fill: 'lid' }).svg + `</span>`).join('');
  return `<span class="rc-chips" data-lcs-chips data-lcs-chip-order="${esc(bins.map((b) => b.key).join(','))}" style="display:inline-flex;gap:${gap}px;justify-self:end">${chips}</span>`;
}

/* ---------------------------------------------------------------- F1: one which-bin row */
function whichBinRow({ n, item, chips, tile = 72, iconPx = 60 }) {
  if (!item || !item.id) throw new Error('whichBinRow: no item');
  const order = (/data-lcs-chip-order="([^"]*)"/.exec(chips || '') || [])[1] || '';
  return `<div class="rc-which" data-lcs-row data-lcs-n="${n}" data-lcs-item="${esc(item.id)}" data-lcs-material="${esc(item.material)}" data-lcs-bin="${esc(item.bin)}" data-lcs-chip-order="${esc(order)}" ` +
    `style="display:grid;grid-template-columns:30px ${tile}px 1fr 330px;column-gap:12px;align-items:center;padding:0 12px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;min-height:0;min-width:0">` +
    badge(n) +
    `<span class="rc-product" style="display:inline-flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;background:${T.cream};border-radius:10px">${icon(item.src, iconPx)}</span>` +
    `<span></span>` + chips + `</div>`;
}

/* ---------------------------------------------------------------- F2: one material row */
function materialRow({ n, item, rulingW = 400, tile = 64, iconPx = 52, glyphH = 30, rowH = 58 }) {
  if (!item || !item.id) throw new Error('materialRow: no item');
  if (typeof item.word !== 'string' || !item.word.trim()) throw new Error(`materialRow: item ${item.id} has no material word (refuse)`);
  const row = writingRow({ w: rulingW, h: rowH, glyphH, xHeight: true }).svg;
  return `<div class="rc-material" data-lcs-row data-lcs-n="${n}" data-lcs-item="${esc(item.id)}" data-lcs-material="${esc(item.material)}" data-lcs-word="${esc(item.word)}" ` +
    `style="display:grid;grid-template-columns:30px ${tile}px 1fr;column-gap:12px;align-items:center;padding:0 12px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;min-height:0;min-width:0">` +
    badge(n) +
    `<span class="rc-product" style="display:inline-flex;align-items:center;justify-content:center;width:${tile}px;height:${tile}px;background:${T.cream};border-radius:10px">${icon(item.src, iconPx)}</span>` +
    `<span style="display:block;width:${rulingW}px;justify-self:end">${row}</span></div>`;
}

/* ---------------------------------------------------------------- F3: one odd-one-out row */
function oddRow({ items, oddIdx, box = 120, iconPx = 84 }) {
  if (!Array.isArray(items) || items.length < 3) throw new Error('oddRow: needs >= 3 items');
  if (!(oddIdx >= 0 && oddIdx < items.length)) throw new Error('oddRow: oddIdx out of range');
  const boxes = items.map((it, i) =>
    `<span data-lcs-item="${esc(it.id)}" data-lcs-material="${esc(it.material)}" data-lcs-vocab="${esc(it.vocabKey)}"${i === oddIdx ? ' data-lcs-odd="1"' : ''} ` +
    `style="display:inline-flex;align-items:center;justify-content:center;width:${box}px;height:${box}px;background:${T.white};border-radius:10px">${icon(it.src, iconPx)}</span>`).join('');
  return `<div class="ws-card-stage" style="justify-content:space-evenly;padding:6px" data-lcs-items="${items.length}">${boxes}</div>`;
}

/* ---------------------------------------------------------------- F4: the colour legend */
function legendChips({ entries, wordPx = 17 }) {
  if (!Array.isArray(entries) || !entries.length) throw new Error('legendChips: no entries');
  const seen = new Set();
  const items = entries.map((e) => {
    if (!e || !e.key) throw new Error('legendChips: an entry without a bin key');
    if (typeof e.colorWord !== 'string' || !e.colorWord.trim()) throw new Error(`legendChips: bin ${e.key} has no colour word`);
    if (typeof e.label !== 'string' || !e.label.trim()) throw new Error(`legendChips: bin ${e.key} has no label`);
    const hex = swatchHex(e.color);
    if (seen.has(e.color)) throw new Error(`legendChips: colour ${e.color} used twice`);
    seen.add(e.color);
    return `<span style="display:inline-flex;align-items:center;gap:0" data-lcs-legend="${esc(e.key)}" data-lcs-color="${esc(e.color)}">` +
      svgRoot({ width: 22, height: 22, label: e.key }, el('rect', { x: 1, y: 1, width: 20, height: 20, rx: 5, fill: hex, stroke: T.ink, 'stroke-width': 1 }), { class: 'rc-swatch', style: 'display:block' }) +
      `<span style="display:inline-block;width:8px"></span>` +
      `<span style="font-family:${F.body},sans-serif;font-weight:800;font-size:${wordPx}px;color:${T.ink}">${esc(e.colorWord)}</span>` +
      `<span style="display:inline-block;width:6px"></span>` +
      `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${wordPx}px;color:${T.teal}">${esc(e.label)}</span></span>`;
  }).join('');
  return `<div class="ws-scene-banner" style="gap:22px;flex-wrap:wrap" data-lcs-legend-banner>${items}</div>`;
}

/* ---------------------------------------------------------------- F4: the example shelf under a bin */
function exampleShelf({ items, pic = 56, w = 117, h = 64 }) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 2) throw new Error('exampleShelf: 1 or 2 example pictures');
  if (items.length * pic + (items.length - 1) * 4 > w) throw new Error(`exampleShelf: ${items.length} x ${pic} do not fit ${w}`);
  const pics = items.map((it) => `<span data-lcs-example="${esc(it.id)}" data-lcs-bin="${esc(it.bin)}" style="display:inline-flex">${icon(it.src, pic)}</span>`).join('');
  return `<div class="rc-shelf" data-lcs-shelf style="display:flex;justify-content:center;align-items:center;gap:4px;width:${w}px;height:${h}px;box-sizing:border-box;background:${T.cream};border-radius:10px">${pics}</div>`;
}

/* ---------------------------------------------------------------- F5: one draw-and-write lane */
function recycleLane({ n, draw = { w: 170, h: 150 }, rows = 2, starter = null, rulingW = 400, h = 56, glyphH = 36 }) {
  const starters = {};
  if (starter != null) {
    if (typeof starter !== 'string' || !starter.trim()) throw new Error('recycleLane: a starter must be a non-empty literal');
    starters[0] = starter;
  }
  const block = rulingBlock({ rows, w: rulingW, h, glyphH, starters, gap: 8 });
  return `<div class="ws-lane rc-lane" data-lcs-lane data-lcs-n="${n}" data-lcs-rows="${rows}" style="padding:10px 12px;display:grid;grid-template-columns:30px ${draw.w}px 1fr;column-gap:12px;align-items:center">` +
    badge(n) +
    `<span style="display:block">${drawBox({ w: draw.w, h: draw.h })}</span>` +
    `<span style="display:block;width:${rulingW}px;justify-self:end">${block}</span></div>`;
}

module.exports = { RC_CSS, NEUTRAL_LID, lidColourKey, binRow, sortStrip, keyBins, legendBins, binChips, whichBinRow, materialRow, oddRow, legendChips, exampleShelf, recycleLane };
