/**
 * K-353 — Tangram Puzzles: Cut Out the Pieces and Build Two Figures (nt10-D;
 * family key `tangram`, K, K.G.B.6, `default_subject: spatial-reasoning`).
 * Design: docs/worksheet-gen/b4-designs/K-353-tangram.md §2/§5.
 *
 * A MATERIALS + MODEL page, wordless in every locale: top-left the 216 px
 * cut-out square with its seven pieces drawn as cut lines (3 px teal on
 * cream) under a scissors strip, beside it the five-row colour legend
 * (swatch + piece glyph, no word), and below two stored figures at the SAME
 * scale drawn WITH their seams — the K model the child copies line for line.
 * Every drawing is a STORED placement of the 7 tans from the locale-neutral
 * bank data/b4/tangram-figures.js (validated at load); `rng` only picks WHICH
 * two figures. No answer is printed and there is none to hide: the page is
 * OPEN, so verify() is STRUCTURAL — it re-derives the seven tans of the
 * cut-out set from the `data-lcs-tan` polygon points (class areas, no
 * overlap, they tile the S x S square), the two figures from their stamps
 * (distinct, in the pool, seven tans each in solution mode or one solid path
 * in silhouette mode, edge floor 56), the legend rows and the scissors.
 *
 * Chrome budget (README 722; 677 under a four-line fi title): strip 30 +
 * template 221 (216 + the 2.5 px stroke pad each side) + gap 16 + the tallest
 * figure (boat 374) = 641 at d2/d3; the slack opens between the two blocks
 * (`justify-content:space-evenly`), never inside them. d1 (the 100 mm
 * true-size sheet, one rectangle at S 378) stacks 30 + 383 + 12 + 273 = 698
 * under a 700 body (the four-line title alone) and declares bodyMin 700;
 * under the 677 combination it is REPORTED by the gate (not shipped).
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED config, never the
 * level index:
 *   S        the family scale (px per unit square side): smallest tan edge =
 *            0.3536 S >= tokens.density.K.minElement (56) → S >= 158.4
 *   figures  how many stored figures row 2 draws (1 | 2)
 *   pool     the figure keys row 2 samples from (`square` is refused there —
 *            it is the template already on the page); every entry must fit
 *            two-up at S under the declared body
 *   seams    true = `solution` mode (cream tans, 2 px seams, 3 px outline);
 *            false = solid teal `silhouette`s (the harder K shadow page, d3)
 *   legend   the five-row colour legend beside the template
 *   Sg       the legend glyph scale (64)
 *   gap      the gap between the template block and the figure row (16;
 *            d1 declares 12 so its 100 mm sheet clears the 700 four-line-title
 *            body: 30 + 383 + 12 + 273 = 698)
 *   bodyMin  the body height the stack is checked against at build (677 =
 *            the four-line fi title + a three-line instruction; d1 declares
 *            700 = the four-line title alone; the d1 sheet is not shipped)
 *   mode     ADDITIVE (Phase 2, built 2026-09-21): undefined = this base path,
 *            byte-identical. The five faces (compose K-358 · silhouette
 *            G1-354 · missing G1-355 · match G2-347 · count K-359) each own a
 *            render path (`_buildFace` → `_composeFace` … `_countFace`) and a
 *            verify() branch keyed on the root's `data-lcs-mode`; the rows in
 *            tools/b4var-rows/tangram.js set the knob. Unknown modes refuse.
 *            Face configs (design §3, measured deviations in
 *            _work/K-353-faces.md): every guard keys on the RESOLVED config —
 *            `S` against the face's band floor (K 56 / G1 44 / G2 36 →
 *            S >= 158.4 / 124.5 / 101.8), `bodyMin` (677 = the fi four-line
 *            chrome) filters every pool through FIG.poolFor, and a pool entry
 *            that does not fit the measured card inner REFUSES ("the config
 *            lies about its pool"), never a silent drop.
 * build() reads ONLY data/b4/tangram.js (lib/b4-common.js `bank`: the
 * locale's strings block — a locale without one is a refusal, never an en
 * fallback) + data/b4/tangram-figures.js; never image-vocabulary.js, never
 * the picture index (themeAxis OFF, no picture on any face), never
 * approved-words. `theme` is ignored (themeless; coordinate.theme '').
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { TANGRAM_FIGURES: FIG } = require('../../data/b4/tangram-figures.js');
const TG = require('../../primitives/tangram.js');
const C4 = require('../../templates/components-b4.js');
const tokens = require('../../primitives/_tokens.js');
const { esc: escBase } = require('../../primitives/_svg.js');
const esc = (v) => escBase(v).replace(/'/g, '&#39;');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const ID = 'K-353';
const KEY = 'tangram';
const BODY_W = 675;
const STRIP_H = 30;
const BLOCK_GAP = 16;
const ROW_GAP = 24;
const FACE_MODES = ['compose', 'silhouette', 'missing', 'match', 'count'];
const K_FLOOR = tokens.density.K.minElement;   // 56
const PAD = tokens.stroke.primitive / 2 + 1;    // 2.5: the svg root's stroke pad each side

/* ---------------- Phase 2 face constants (design §3; every number measured in the real pipeline, _work/K-353-faces.md) ---------------- */
const FACE_BAND = { compose: 'K', silhouette: 'G1', missing: 'G1', match: 'G2', count: 'K' };
const BAND_FLOOR = { K: tokens.density.K.minElement, G1: tokens.density.G1.minElement, G2: tokens.density.G23.minElement };   // 56 / 44 / 36
const GRID_GAP = 14;            // .ws-cardgrid gap (page.css:119-124)
const CARD_BORDER = 2;          // .ws-card border (page.css:126-132)
const CARD_PADDING = 12;        // .ws-card padding (the F2 face overrides it inline to 6)
const GLYPH_STRIP_H = 44;       // composeCard's glyph strip
const CARD_STAGE_GAP = 12;      // the gap between a card's two zones (composeCard / countCard)
const CHIP_GAP = 8;             // missingCard's chip column gap
const COUNT_ROW_H = 50;         // countCard's answer row (boxes 64 x 50)
const FACE_STAGE_FLOOR = 660;   // F4: rows x box + gaps must use the page (sparse rule)

/** The card inner (content box) of a `rows x cols` cardGrid under a body of `bodyH`, at a card padding. */
function cardInner(rows, cols, bodyH, padding) {
  const edge = (padding == null ? CARD_PADDING : padding) + CARD_BORDER;
  return { w: (BODY_W - GRID_GAP * (cols - 1)) / cols - 2 * edge, h: (bodyH - GRID_GAP * (rows - 1)) / rows - 2 * edge };
}
/** Rendered svg root size of a tiling at S with a root pad. */
function drawnSize(tans, S, pad) { const p = TG.placeTans(tans, S, { pad }); return { w: Math.ceil(p.w), h: Math.ceil(p.h) }; }
/** The lattice transforms under which the drawing fits `maxW x maxH` (a transposing turn may not). */
function fitTransforms(tans, S, pad, maxW, maxH) {
  return TG.TRANSFORM_NAMES.filter((t) => { const d = drawnSize(TG.transformTiling(tans, t), S, pad); return d.w <= maxW && d.h <= maxH; });
}
function faceFloor(mode, S) {
  const band = FACE_BAND[mode];
  const floor = BAND_FLOOR[band];
  const minEdge = TG.h * S;
  if (minEdge < floor) throw new Error(`${ID} ${mode}: scale ${S} draws a ${minEdge.toFixed(1)} px small edge < the ${band} floor ${floor} (S >= ${(floor / TG.h).toFixed(1)})`);
  return floor;
}
function faceRoot(mode, cfg, stamps, inner, style) {
  const extra = Object.entries(stamps || {}).map(([k, v]) => ` data-lcs-${k}="${esc(String(v))}"`).join('');
  return `<div data-ws-content data-lcs-type="${ID}" data-lcs-mode="${mode}" data-lcs-cfg='${esc(JSON.stringify(cfg))}' data-lcs-scale="${cfg.S}"${extra} ` +
    `style="${style || 'display:flex;flex-direction:column;flex:1 1 auto;min-height:0'}">${inner}</div>`;
}
const sameConfig = (a, b) => JSON.stringify(a) === JSON.stringify(b);
/** A silhouette as a point-set key after bbox normalisation (5 decimals). */
function shapeKeyOf(tans) {
  const loop = TG.silhouette(tans)[0];
  const xs = loop.map((p) => p[0]), ys = loop.map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  return loop.map((p) => [(p[0] - x0 + 0).toFixed(5), (p[1] - y0 + 0).toFixed(5)].join(',')).sort().join('|');
}
/** Two tilings cast the same shadow under SOME lattice transform (tree ≡ arrow, measured 2026-09-21). */
function sameShape(a, b) { const ka = shapeKeyOf(a); return TG.TRANSFORM_NAMES.some((t) => shapeKeyOf(TG.transformTiling(b, t)) === ka); }

module.exports = {
  id: ID,
  slug: KEY,
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { S: 378, figures: 1, pool: ['rectangle'], seams: true, legend: true, Sg: 64, gap: 12, bodyMin: 700 },
    2: { S: 216, figures: 2, pool: FIG.BASE_POOL.slice(), seams: true, legend: true, Sg: 64, bodyMin: 677 },
    3: { S: 216, figures: 2, pool: FIG.BASE_POOL.slice(), seams: false, legend: true, Sg: 64, bodyMin: 677 },
  },
  i18n: {
    en: {
      title: 'Tangram Puzzles: Cut Out the Pieces and Build Two Figures',
      instruction: 'Color each piece like the legend, cut out the seven pieces along the lines, then lay them on the two figures below, line for line.',
    },
  },
  FACE_MODES,
  K_FLOOR,

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { locale }, ctx) {
    if (!bankLoc || typeof bankLoc !== 'object' || !bankLoc.strings) throw new Error(`${ID}: the ${locale} bank block carries no strings`);
    if (!d) throw new Error(`${ID}: no difficulty config`);
    if (d.mode !== undefined) {
      if (!FACE_MODES.includes(d.mode)) throw new Error(`${ID}: unknown mode "${d.mode}" (faces: ${FACE_MODES.join(' | ')})`);
      return this._buildFace(bankLoc, d, { locale }, ctx);   // Phase 2 faces (tools/b4var-rows/tangram.js); the base path below is untouched
    }
    const rng = ctx.rng;
    const S = d.S;
    if (!(S > 0)) throw new Error(`${ID}: bad scale ${S}`);
    const minEdge = TG.h * S;
    if (minEdge < K_FLOOR) throw new Error(`${ID}: scale ${S} draws a ${minEdge.toFixed(1)} px small edge < the K floor ${K_FLOOR} (S >= ${(K_FLOOR / TG.h).toFixed(1)})`);
    if (!Number.isInteger(d.figures) || d.figures < 1 || d.figures > 2) throw new Error(`${ID}: figures ${d.figures} (1 or 2 fit beside each other)`);
    if (!Array.isArray(d.pool) || !d.pool.length) throw new Error(`${ID}: no figure pool`);
    for (const k of d.pool) if (!FIG.FIGURES[k]) throw new Error(`${ID}: pool names an unknown figure "${k}"`);
    if (d.pool.includes('square')) throw new Error(`${ID}: \`square\` is the template already on the page — refused in the figure pool`);
    const bodyMin = d.bodyMin || 677;
    const gap = d.gap == null ? BLOCK_GAP : d.gap;
    if (!(gap >= 8 && gap <= 24)) throw new Error(`${ID}: block gap ${gap} outside 8..24`);
    const set = FIG.figure('square');
    const templateH = Math.ceil(set.bbox.h * S + 2 * PAD);
    const rowMaxH = bodyMin - (STRIP_H + templateH + gap);
    const rowMaxW = d.figures === 1 ? BODY_W : (BODY_W - ROW_GAP) / 2;
    const fits = d.pool.filter((k) => { const b = FIG.figure(k).bbox; return b.w * S + 2 * PAD <= rowMaxW && b.h * S + 2 * PAD <= rowMaxH; });
    if (fits.length < d.figures) throw new Error(`${ID}: only ${fits.length} of the pool [${d.pool.join(' ')}] fit ${d.figures}-up at S ${S} under a ${bodyMin} body (row <= ${rowMaxW} x ${rowMaxH}) — refuse`);
    if (fits.length < d.pool.length) throw new Error(`${ID}: pool entries [${d.pool.filter((k) => !fits.includes(k)).join(' ')}] do not fit at S ${S} under a ${bodyMin} body — the config lies about its pool`);
    const keys = rng.sample(d.pool, d.figures);
    const figures = keys.map((k) => ({ key: k, tans: FIG.figure(k).tans }));

    const tpl = C4.templateBlock({ S, legend: d.legend !== false, Sg: d.Sg || 64, tans: set.tans });
    const row = C4.figureRow({ figures, S, seams: d.seams !== false, gap: ROW_GAP });
    const stack = tpl.height + gap + row.height;
    if (tpl.width > BODY_W) throw new Error(`${ID}: template block ${tpl.width} > ${BODY_W}`);
    if (row.width > BODY_W) throw new Error(`${ID}: figure row ${row.width} > ${BODY_W}`);
    if (stack > bodyMin) throw new Error(`${ID}: stack ${stack} > the ${bodyMin} body`);
    const cfg = { S, figures: d.figures, pool: d.pool, seams: d.seams !== false, legend: d.legend !== false, Sg: d.Sg || 64, gap, bodyMin };
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-cfg='${esc(JSON.stringify(cfg))}' data-lcs-scale="${S}" data-lcs-pool="${esc(d.pool.join(','))}" data-lcs-seams="${cfg.seams ? 1 : 0}" ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:${gap}px;min-height:0">${tpl.html}${row.html}</div>`;
    const meta = { S, figures: keys, seams: cfg.seams, legend: cfg.legend, stack, template: { w: tpl.width, h: tpl.height }, row: { w: row.width, h: row.height } };
    return { bodyHtml, meta };
  },

  /* ===================== Phase 2: the five faces (design §3; tools/b4var-rows/tangram.js sets `mode`) ===================== */
  FACE_BAND,
  BAND_FLOOR,
  cardInner,
  fitTransforms,
  drawnSize,

  _buildFace(bankLoc, d, { locale }, ctx) {
    switch (d.mode) {
      case 'compose': return this._composeFace(d, locale, ctx);
      case 'silhouette': return this._silhouetteFace(d, locale, ctx);
      case 'missing': return this._missingFace(d, locale, ctx);
      case 'match': return this._matchFace(d, locale, ctx);
      case 'count': return this._countFace(d, locale, ctx);
      default: throw new Error(`${ID}: unknown mode "${d.mode}"`);
    }
  },

  /** Shared card-grid guards: items === cols x rows, the grid shape 2..3 columns, 1..3 rows. */
  _gridShape(mode, d) {
    const cols = d.cols, rows = d.rows, items = d.items;
    if (!Number.isInteger(cols) || cols < 2 || cols > 3) throw new Error(`${ID} ${mode}: cols ${cols} outside 2..3`);
    if (!Number.isInteger(rows) || rows < 1 || rows > 3) throw new Error(`${ID} ${mode}: rows ${rows} outside 1..3`);
    if (items !== cols * rows) throw new Error(`${ID} ${mode}: items ${items} !== cols x rows ${cols * rows} (a card grid has no empty cell)`);
    return { cols, rows, items };
  },

  /**
   * F1 K-358 `compose` — the SEAM is the answer: a glyph strip names 2-3 tans, the child draws the
   * line(s) inside the empty WHITE outline where they meet. Every outline is a MINI whose tiling by
   * the listed classes the lattice tiler proved UNIQUE (FIG.mini refuses otherwise), drawn true-size
   * to the base set (S 216) under a lattice transform that fits the card.
   */
  _composeFace(d, loc, ctx) {
    const rng = ctx.rng;
    const S = d.S;
    if (!(S > 0)) throw new Error(`${ID} compose: bad scale ${S}`);
    faceFloor('compose', S);
    const Sg = d.Sg || 64;
    if (!(Sg >= 48 && Sg <= 80)) throw new Error(`${ID} compose: glyph scale ${Sg} outside 48..80`);
    const { cols, rows, items } = this._gridShape('compose', d);
    const mix = d.mix;
    if (!Array.isArray(mix) || mix.length !== 2 || !mix.every((n) => Number.isInteger(n) && n >= 0) || mix[0] + mix[1] !== items) throw new Error(`${ID} compose: mix ${JSON.stringify(mix)} must be two counts summing to items ${items}`);
    const bodyMin = d.bodyMin || 677;
    const inner = cardInner(rows, cols, bodyMin, CARD_PADDING);
    const maxH = inner.h - GLYPH_STRIP_H - CARD_STAGE_GAP;
    for (const k of [...(d.pool2 || []), ...(d.pool3 || [])]) if (!FIG.MINIS[k]) throw new Error(`${ID} compose: pool names an unknown mini "${k}"`);
    const pool = FIG.poolFor('compose', { S, pool2: d.pool2, pool3: d.pool3 }, bodyMin);
    const fits = (tans) => { const s = drawnSize(tans, S, PAD); return s.w <= inner.w && s.h <= maxH; };
    const fits2 = (d.pool2 || []).filter((k) => pool.includes(k)), fits3 = (d.pool3 || []).filter((k) => pool.includes(k));
    const dropped = [...(d.pool2 || []), ...(d.pool3 || [])].filter((k) => !pool.includes(k));
    if (dropped.length) throw new Error(`${ID} compose: pool entries [${dropped.join(' ')}] do not fit a ${Math.floor(inner.w)} x ${Math.floor(maxH)} card zone at S ${S} under a ${bodyMin} body — the config lies about its pool`);
    for (const k of [...fits2, ...fits3]) { const m = FIG.mini(k); if (m.tans.length < 2 || m.tans.length > 3) throw new Error(`${ID} compose: mini ${k} has ${m.tans.length} tans`); }
    for (const k of fits2) if (FIG.mini(k).tans.length !== 2) throw new Error(`${ID} compose: pool2 entry ${k} is not a two-tan mini`);
    for (const k of fits3) if (FIG.mini(k).tans.length !== 3) throw new Error(`${ID} compose: pool3 entry ${k} is not a three-tan mini`);
    if (fits2.length < mix[0] || fits3.length < mix[1]) throw new Error(`${ID} compose: mix ${mix.join('+')} needs ${mix[0]} two-tan / ${mix[1]} three-tan minis, the pool holds ${fits2.length} / ${fits3.length} — refuse`);
    const keys = rng.shuffle([...rng.sample(fits2, mix[0]), ...rng.sample(fits3, mix[1])]);
    const cards = [], meta = [];
    for (const k of keys) {
      const m = FIG.mini(k);
      const ts = TG.TRANSFORM_NAMES.filter((t) => fits(TG.transformTiling(m.tans, t)));
      if (!ts.length) throw new Error(`${ID} compose: mini ${k} fits under no transform`);
      const t = rng.pick(ts);
      const tans = TG.transformTiling(m.tans, t);
      cards.push(C4.composeCard({ mini: { key: k, tans }, S, Sg, transform: t }));
      meta.push({ key: k, transform: t, classes: m.tans.map((x) => TG.clsOf(x.id)) });
    }
    const cfg = { mode: 'compose', S, Sg, items, cols, rows, pool2: fits2, pool3: fits3, mix, bodyMin };
    const bodyHtml = faceRoot('compose', cfg, { face: 'K-358', floor: BAND_FLOOR.K }, cardGrid({ cards, cols, rows, numbered: true }));
    return { bodyHtml, meta: { mode: 'compose', S, cards: meta } };
  },

  /**
   * F2 G1-354 `silhouette` — four solid shadows (no template, no seams, no legend) the child builds
   * with the seven pieces of a physical set; every shadow is TRUE-SIZE to the base set (S 216). OPEN:
   * verify() is structural. MEASURED (2026-09-21): `tree` and `arrow` cast the SAME silhouette (arrow
   * = tree turned 270°; the tilings differ), and under the fi four-line chrome (677) the design's 2 x 2
   * grid holds only tree / arrow / rectangle / square = THREE shapes for four cards — so the page is a
   * TWO-HEIGHT grid: row 1 fixed `rowH` (390: inner 374 holds the boat 374 and the cat 330 upright),
   * row 2 the rest (257 at 677: rectangle / square). Four pairwise NON-CONGRUENT shadows every page
   * (the composer groups the pool by shape under the 8 transforms and never draws one shape twice);
   * cards take an inline `padding:6px` (the 311 px tree clears a 314 inner).
   */
  _silhouetteFace(d, loc, ctx) {
    const rng = ctx.rng;
    const S = d.S;
    if (!(S > 0)) throw new Error(`${ID} silhouette: bad scale ${S}`);
    faceFloor('silhouette', S);
    const { cols, rows, items } = this._gridShape('silhouette', d);
    if (rows !== 2 || cols !== 2) throw new Error(`${ID} silhouette: the two-height grid is 2 x 2 (got ${cols} x ${rows})`);
    const padding = d.padding == null ? 6 : d.padding;
    if (!(padding >= 4 && padding <= 12)) throw new Error(`${ID} silhouette: card padding ${padding} outside 4..12`);
    const bodyMin = d.bodyMin || 677;
    const rowH = d.rowH;
    if (!(rowH >= 300 && rowH <= 420)) throw new Error(`${ID} silhouette: rowH ${rowH} outside 300..420`);
    const edge = padding + CARD_BORDER;
    const innerW = (BODY_W - GRID_GAP) / 2 - 2 * edge;
    const inner1 = rowH - 2 * edge, inner2 = bodyMin - GRID_GAP - rowH - 2 * edge;
    if (inner2 < 150) throw new Error(`${ID} silhouette: row 2 inner ${inner2} under a ${bodyMin} body is too short (rowH ${rowH})`);
    if (!Array.isArray(d.pool) || !d.pool.length) throw new Error(`${ID} silhouette: no figure pool`);
    for (const k of d.pool) if (!FIG.FIGURES[k]) throw new Error(`${ID} silhouette: pool names an unknown figure "${k}"`);
    const fitsIn = (tans, H) => { const s = drawnSize(tans, S, PAD); return s.w <= innerW && s.h <= H; };
    const fitList = (k, H) => TG.TRANSFORM_NAMES.filter((t) => fitsIn(TG.transformTiling(FIG.figure(k).tans, t), H));
    const dropped = d.pool.filter((k) => !fitList(k, inner1).length);
    if (dropped.length) throw new Error(`${ID} silhouette: pool entries [${dropped.join(' ')}] fit neither row at S ${S} under a ${bodyMin} body — the config lies about its pool`);
    // shape classes: figures congruent under a lattice transform are ONE shadow (tree ≡ arrow)
    const classes = [];
    for (const k of d.pool) { const c = classes.find((cl) => sameShape(FIG.figure(cl[0]).tans, FIG.figure(k).tans)); if (c) c.push(k); else classes.push([k]); }
    if (classes.length < items) throw new Error(`${ID} silhouette: the pool holds ${classes.length} distinct shapes < ${items} cards (tree and arrow are one shadow) — refuse`);
    // every 4-set of shape classes with a valid row assignment (two of them fit the short row)
    const n = classes.length, combos = [];
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) for (let e = c + 1; e < n; e++) combos.push([a, b, c, e]);
    const valid = combos.filter((cmb) => cmb.filter((i) => classes[i].some((k) => fitList(k, inner2).length)).length >= 2);
    if (!valid.length) throw new Error(`${ID} silhouette: no four shapes of the pool fill a ${rowH} + ${bodyMin - GRID_GAP - rowH} two-height grid at S ${S} — refuse`);
    const cmb = rng.pick(valid);
    const picked = cmb.map((i) => rng.pick(classes[i]));
    const shortOk = picked.filter((k) => fitList(k, inner2).length);
    const row2 = rng.sample(shortOk, 2);
    const row1 = rng.shuffle(picked.filter((k) => !row2.includes(k)));
    const order = [...row1, ...rng.shuffle(row2)];
    const cards = [], meta = [];
    order.forEach((k, i) => {
      const H = i < cols ? inner1 : inner2;
      const ts = fitList(k, H);
      if (!ts.length) throw new Error(`${ID} silhouette: ${k} fits row ${i < cols ? 1 : 2} under no transform`);
      const t = rng.pick(ts);
      cards.push(C4.shadowCard({ figure: { key: k, tans: TG.transformTiling(FIG.figure(k).tans, t) }, S, transform: t }));
      meta.push({ key: k, transform: t, row: i < cols ? 1 : 2 });
    });
    const cfg = { mode: 'silhouette', S, items, cols, rows, rowH, pool: d.pool.slice(), padding, bodyMin };
    const sections = cards.map((inner, i) => `<section class="ws-card" data-lcs-card="${i + 1}" style="padding:${padding}px"><span class="ws-card-badge">${i + 1}</span>${inner}</section>`).join('\n');
    const grid = `<div class="ws-cardgrid" data-lcs-two-height style="grid-template-columns: repeat(${cols}, minmax(0,1fr)); grid-template-rows: ${rowH}px minmax(0,1fr);">\n${sections}\n</div>`;
    const bodyHtml = faceRoot('silhouette', cfg, { face: 'G1-354', floor: BAND_FLOOR.G1, padding, 'row-h': rowH }, grid);
    return { bodyHtml, meta: { mode: 'silhouette', S, cards: meta } };
  },

  /**
   * F3 G1-355 `missing` — a stored figure with SIX tans and one HOLE; three chips of pairwise
   * distinct classes, TRUE-SIZE at the figure's S (congruence is the lesson), exactly one fills the
   * hole. Chip box = the glyph's geometric height + 12 (min 44): the tallest column M + Q + S = 58 +
   * 58 + 44 + 2 x 8 = 176 <= the 677 inner 188 (the design's +12 on the svg height gave 188 = the
   * inner, a 0.33 px margin, measured). P is CHIRAL: a P hole's correct chip carries the hole's flip.
   */
  _missingFace(d, loc, ctx) {
    const rng = ctx.rng;
    const S = d.S;
    if (!(S > 0)) throw new Error(`${ID} missing: bad scale ${S}`);
    faceFloor('missing', S);
    const { cols, rows, items } = this._gridShape('missing', d);
    const pad = d.pad == null ? 1.5 : d.pad;
    if (!(pad >= 1 && pad <= PAD)) throw new Error(`${ID} missing: root pad ${pad} outside 1..${PAD}`);
    const chipW = d.chipW || 104, chips = d.chips || 3;
    if (chips !== 3) throw new Error(`${ID} missing: chips ${chips} (three chips of distinct classes)`);
    const holes = d.holes;
    if (!Array.isArray(holes) || holes.length < 2 || holes.some((c) => !TG.CLASSES.includes(c)) || new Set(holes).size !== holes.length) throw new Error(`${ID} missing: holes ${JSON.stringify(holes)} must be >= 2 distinct classes`);
    if (holes.includes('L')) throw new Error(`${ID} missing: an L chip (${Math.ceil(S + 4)} wide) breaks the ${chipW} px chip column — L holes are d3 material, refused here`);
    const chipClasses = TG.CLASSES.filter((c) => c !== 'L');
    const bodyMin = d.bodyMin || 677;
    const inner = cardInner(rows, cols, bodyMin, CARD_PADDING);
    const maxW = inner.w - CARD_STAGE_GAP - chipW;
    const chipBox = (cls) => Math.max(44, TG.tanChip(cls, S).height + 8);   // svg height carries a 2 px pad each side: geometric h + 12
    const worstCol = [...chipClasses].map(chipBox).sort((a, b) => b - a).slice(0, chips).reduce((a, b) => a + b, 0) + CHIP_GAP * (chips - 1);
    if (worstCol > inner.h) throw new Error(`${ID} missing: the tallest chip column ${worstCol} > the card inner ${inner.h.toFixed(1)} under a ${bodyMin} body`);
    if (!Array.isArray(d.pool) || !d.pool.length) throw new Error(`${ID} missing: no figure pool`);
    for (const k of d.pool) if (!FIG.FIGURES[k]) throw new Error(`${ID} missing: pool names an unknown figure "${k}"`);
    const fits = (tans) => { const s = drawnSize(tans, S, pad); return s.w <= maxW && s.h <= inner.h; };
    const pool = d.pool.filter((k) => fits(FIG.figure(k).tans));
    const bankPool = FIG.poolFor('missing', { S, pool: d.pool, pad, chipW }, bodyMin);
    if (bankPool.join() !== pool.join()) throw new Error(`${ID} missing: the build's pool [${pool.join(' ')}] disagrees with the bank's poolFor [${bankPool.join(' ')}]`);
    if (pool.length < 4) throw new Error(`${ID} missing: only ${pool.length} of the pool [${d.pool.join(' ')}] fit at S ${S} under a ${bodyMin} body (>= 4 figures) — refuse`);
    const wantClasses = Math.min(4, holes.length);
    if (pool.length * holes.length < items) throw new Error(`${ID} missing: ${pool.length} figures x ${holes.length} hole classes < ${items} cards`);
    // shape classes (tree ≡ arrow cast one silhouette): a page spreads its cards over the shapes, at most
    // ceil(items / classes) per shape, so six cards never show one shape four times
    const shapes = [];
    for (const k of pool) { const c = shapes.find((cl) => sameShape(FIG.figure(cl[0]).tans, FIG.figure(k).tans)); if (c) c.push(k); else shapes.push([k]); }
    const shapeOf = (k) => shapes.findIndex((cl) => cl.includes(k));
    const perShape = Math.ceil(items / shapes.length);
    if (shapes.length * perShape * holes.length < items) throw new Error(`${ID} missing: ${shapes.length} shapes x ${holes.length} holes cannot fill ${items} cards`);
    // (figure, hole class) pairs: one per hole class first (>= min(4, holes) distinct classes), then the rest; no pair twice; the shape cap
    const all = rng.shuffle(pool.flatMap((k) => holes.map((c) => ({ key: k, cls: c }))));
    const chosen = [];
    const shapeCount = () => chosen.reduce((m, p) => { m[shapeOf(p.key)] = (m[shapeOf(p.key)] || 0) + 1; return m; }, {});
    const canTake = (p) => !chosen.includes(p) && (shapeCount()[shapeOf(p.key)] || 0) < perShape;
    for (const c of rng.shuffle(holes).slice(0, wantClasses)) { const p = all.find((x) => x.cls === c && canTake(x)); if (!p) throw new Error(`${ID} missing: no card for hole class ${c} under the shape cap`); chosen.push(p); }
    for (const p of all) { if (chosen.length >= items) break; if (canTake(p)) chosen.push(p); }
    if (chosen.length < items) throw new Error(`${ID} missing: only ${chosen.length} of ${items} cards under the shape cap ${perShape} — refuse`);
    const order = rng.shuffle(chosen.slice(0, items));
    const cards = [], meta = [];
    for (const { key, cls } of order) {
      const f = FIG.figure(key);
      const ts = TG.TRANSFORM_NAMES.filter((t) => fits(TG.transformTiling(f.tans, t)));
      const t = rng.pick(ts);
      const tans = TG.transformTiling(f.tans, t);
      const ids = tans.filter((x) => TG.clsOf(x.id) === cls).map((x) => x.id);
      const missing = rng.pick(ids);
      const holeTan = tans.find((x) => x.id === missing);
      // distractors: two other classes; a triangle hole always meets the OTHER triangle size
      const others = chipClasses.filter((c) => c !== cls);
      let dist;
      if (cls === 'M' || cls === 'S') { const tri = cls === 'M' ? 'S' : 'M'; dist = [tri, rng.pick(others.filter((c) => c !== tri))]; }
      else dist = rng.sample(others, chips - 1);
      const chipList = rng.shuffle([{ cls, correct: true, flip: cls === 'P' ? !!holeTan.flip : false }, ...dist.map((c) => ({ cls: c, correct: false, flip: c === 'P' ? rng.pick([false, true]) : false }))]);
      cards.push(C4.missingCard({ figure: { key, tans }, missing, S, chips: chipList, chipW, transform: t, pad, chipPad: 8 }));
      meta.push({ key, transform: t, missing, cls, chips: chipList.map((c) => c.cls + (c.flip ? '*' : '') + (c.correct ? '!' : '')) });
    }
    const cfg = { mode: 'missing', S, items, cols, rows, pool, holes, chips, chipW, pad, bodyMin };
    const bodyHtml = faceRoot('missing', cfg, { face: 'G1-355', floor: BAND_FLOOR.G1 }, cardGrid({ cards, cols, rows, numbered: true }));
    return { bodyHtml, meta: { mode: 'missing', S, cards: meta } };
  },

  /**
   * F4 G2-347 `match` — orientation discrimination: a shadow (the figure at t0) beside three drawn
   * solutions; exactly one stands like the shadow (`t:'id'`), the others are the SAME tiling turned or
   * flipped by a transform OUTSIDE the symmetry group of the shadow AS DRAWN (the group of the figure
   * conjugated by t0 — `tree` at rot90 is mirror-symmetric in Y, not X), so no distractor casts the
   * shadow. Rows x box + gaps use the page (top-anchored, the slack falls below): 4 x 162 + 3 x 9 =
   * 675 <= 677; row 4 x 162 + 3 x 9 = 675 <= 675. Box inner 158 holds the cat (157 at S 102, pad 1.5).
   */
  _matchFace(d, loc, ctx) {
    const rng = ctx.rng;
    const S = d.S;
    if (!(S > 0)) throw new Error(`${ID} match: bad scale ${S}`);
    faceFloor('match', S);
    const rows = d.rows, cands = d.candidates, box = d.box, gap = d.gap == null ? 9 : d.gap, pad = d.pad == null ? 1.5 : d.pad;
    if (!Number.isInteger(rows) || rows < 2 || rows > 4) throw new Error(`${ID} match: rows ${rows} outside 2..4`);
    if (cands !== 3 && cands !== 2) throw new Error(`${ID} match: candidates ${cands} (2 or 3)`);
    if (!(box >= 120 && box <= 220)) throw new Error(`${ID} match: box ${box} outside 120..220`);
    if (!(gap >= 6 && gap <= 16)) throw new Error(`${ID} match: gap ${gap} outside 6..16`);
    if (!(pad >= 1 && pad <= PAD)) throw new Error(`${ID} match: root pad ${pad} outside 1..${PAD}`);
    const bodyMin = d.bodyMin || 677;
    const rowW = box * (cands + 1) + gap * cands;
    if (rowW > BODY_W) throw new Error(`${ID} match: a row of ${cands + 1} boxes at ${box} + gap ${gap} = ${rowW} > ${BODY_W}`);
    const stack = rows * box + (rows - 1) * gap;
    if (stack > bodyMin) throw new Error(`${ID} match: stack ${stack} > the ${bodyMin} body`);
    if (stack < FACE_STAGE_FLOOR) throw new Error(`${ID} match: stack ${stack} < ${FACE_STAGE_FLOOR} — the rows do not use the page (sparse)`);
    const innerBox = box - 2 * 2;
    if (!Array.isArray(d.pool) || !d.pool.length) throw new Error(`${ID} match: no figure pool`);
    for (const k of d.pool) if (!FIG.FIGURES[k]) throw new Error(`${ID} match: pool names an unknown figure "${k}"`);
    if (d.pool.some((k) => FIG.F4_REFUSED.includes(k))) throw new Error(`${ID} match: ${d.pool.filter((k) => FIG.F4_REFUSED.includes(k)).join(' ')} refused (every transform casts the same shadow)`);
    const pool = FIG.poolFor('match', { S, pool: d.pool, box, pad }, bodyMin);
    const dropped = d.pool.filter((k) => !pool.includes(k));
    if (dropped.length) throw new Error(`${ID} match: pool entries [${dropped.join(' ')}] do not fit the ${innerBox} box at S ${S} or lack 2 transforms outside their group — the config lies about its pool`);
    if (pool.length < rows) throw new Error(`${ID} match: ${pool.length} figures < ${rows} rows (figures are distinct per page) — refuse`);
    const keys = rng.sample(pool, rows);
    const rowsHtml = [], meta = [];
    let correctPos = [], shadowKeys = [];
    for (let attempt = 0; attempt < 60; attempt++) {
      rowsHtml.length = 0; meta.length = 0; correctPos = []; shadowKeys = [];
      for (const k of keys) {
        const f = FIG.figure(k);
        const t0 = rng.pick(TG.TRANSFORM_NAMES);
        const target = TG.transformTiling(f.tans, t0);
        shadowKeys.push(shapeKeyOf(target));
        const group = TG.symmetryGroup(target);
        const outside = TG.TRANSFORM_NAMES.filter((t) => !group.includes(t));
        if (outside.length < cands - 1) throw new Error(`${ID} match: ${k} at ${t0} has ${outside.length} transforms outside its group`);
        // distractors prefer DISTINCT shadows among themselves (arrow: rot90 ≅ mirD under its mirror symmetry);
        // the rectangle's four outside transforms all stand the same way, so it falls back to any pair
        const ds = [rng.pick(outside)];
        while (ds.length < cands - 1) {
          const rest = outside.filter((t) => !ds.includes(t));
          const distinct = rest.filter((t) => ds.every((u) => shapeKeyOf(TG.transformTiling(target, t)) !== shapeKeyOf(TG.transformTiling(target, u))));
          ds.push(rng.pick(distinct.length ? distinct : rest));
        }
        const list = rng.shuffle([{ tans: target, t: 'id', correct: true }, ...ds.map((t) => ({ tans: TG.transformTiling(target, t), t, correct: false }))]);
        // the fit of every candidate under its transform (a transposing turn of the cat is 157 x 131: inside the square box)
        for (const c of list) { const s = drawnSize(c.tans, S, pad); if (s.w > innerBox || s.h > innerBox) throw new Error(`${ID} match: ${k} under ${t0}∘${c.t} is ${s.w} x ${s.h} > the box inner ${innerBox}`); }
        rowsHtml.push(C4.matchRow({ figure: { key: k, tans: target }, S, candidates: list, box, gap, transform: t0 }));
        correctPos.push(list.findIndex((c) => c.correct));
        meta.push({ key: k, t0, ts: list.map((c) => c.t), correct: list.findIndex((c) => c.correct) });
      }
      // the correct one never in the same position on every row; no two rows show the SAME shadow as drawn (tree ≡ arrow turned)
      if (new Set(correctPos).size > 1 && new Set(shadowKeys).size === shadowKeys.length) break;
    }
    if (new Set(correctPos).size < 2) throw new Error(`${ID} match: the correct candidate sits in one position on every row after 60 rolls`);
    if (new Set(shadowKeys).size !== shadowKeys.length) throw new Error(`${ID} match: two rows cast the same shadow after 60 rolls`);
    const cfg = { mode: 'match', S, rows, candidates: cands, box, gap, pad, pool, bodyMin };
    const style = `display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:${gap}px;flex:1 1 auto;min-height:0`;
    const bodyHtml = faceRoot('match', cfg, { face: 'G2-347', floor: BAND_FLOOR.G2, stack }, `<div data-lcs-match-stage style="display:flex;flex-direction:column;gap:${gap}px;flex:0 0 auto">${rowsHtml.join('')}</div>`, style);
    return { bodyHtml, meta: { mode: 'match', S, stack, rows: meta } };
  },

  /**
   * F5 K-359 `count` — count BY KIND inside a built sub-figure: triangles (three sizes, any tilt) in
   * the first box, squares (0 or 1; the tilted Q is a square, P is not) in the second. Sets are real
   * fragments of stored figures whose outline is neither a triangle nor a square (FIG.poolFor). Page
   * rule: 4 distinct sets, >= 3 triangle values, both square values, P on >= 2 cards, >= 1 card with a
   * triangle whose hypotenuse lies on the diagonal (rot % 90 !== 0 — transform-invariant).
   */
  _countFace(d, loc, ctx) {
    const rng = ctx.rng;
    const S = d.S;
    if (!(S > 0)) throw new Error(`${ID} count: bad scale ${S}`);
    faceFloor('count', S);
    const { cols, rows, items } = this._gridShape('count', d);
    if (!Array.isArray(d.boxes) || d.boxes.join() !== 'triangles,squares') throw new Error(`${ID} count: boxes ${JSON.stringify(d.boxes)} — this face draws exactly [triangles, squares]`);
    const tansR = d.tans, triR = d.triangles;
    if (!Array.isArray(tansR) || tansR.length !== 2 || !(tansR[0] >= 3 && tansR[1] <= 6 && tansR[0] <= tansR[1])) throw new Error(`${ID} count: tans range ${JSON.stringify(tansR)} outside 3..6`);
    if (!Array.isArray(triR) || triR.length !== 2 || !(triR[0] >= 1 && triR[1] <= 5 && triR[0] <= triR[1])) throw new Error(`${ID} count: triangles range ${JSON.stringify(triR)} outside 1..5`);
    const bodyMin = d.bodyMin || 677;
    const inner = cardInner(rows, cols, bodyMin, CARD_PADDING);
    const maxH = inner.h - CARD_STAGE_GAP - COUNT_ROW_H;
    if (!Array.isArray(d.pool) || !d.pool.length) throw new Error(`${ID} count: no set pool`);
    for (const k of d.pool) if (!FIG.SUBS[k]) throw new Error(`${ID} count: pool names an unknown set "${k}"`);
    const fits = (tans) => { const s = drawnSize(tans, S, PAD); return s.w <= inner.w && s.h <= maxH; };
    const pool = FIG.poolFor('count', { S, pool: d.pool }, bodyMin).filter((k) => { const s = FIG.sub(k); return s.counts.tans >= tansR[0] && s.counts.tans <= tansR[1] && s.counts.triangles >= triR[0] && s.counts.triangles <= triR[1]; });
    const dropped = d.pool.filter((k) => !pool.includes(k));
    if (dropped.length) throw new Error(`${ID} count: pool entries [${dropped.join(' ')}] do not fit at S ${S} under a ${bodyMin} body, or break the outline / range rules — the config lies about its pool`);
    if (pool.length < items) throw new Error(`${ID} count: ${pool.length} sets < ${items} cards — refuse`);
    const tilted = (tans) => tans.some((t) => 'LMS'.includes(TG.clsOf(t.id)) && ((t.rot || 0) % 90) !== 0);
    const pageOk = (ks) => {
      const subs = ks.map((k) => FIG.sub(k));
      return new Set(subs.map((s) => s.counts.triangles)).size >= 3 && subs.some((s) => s.counts.squares === 0) && subs.some((s) => s.counts.squares === 1) &&
        subs.filter((s) => s.tans.some((t) => t.id === 'P')).length >= 2 && subs.some((s) => tilted(s.tans));
    };
    let keys = null;
    for (let attempt = 0; attempt < 200 && !keys; attempt++) { const ks = rng.sample(pool, items); if (pageOk(ks)) keys = ks; }
    if (!keys) throw new Error(`${ID} count: no ${items}-set page from [${pool.join(' ')}] satisfies the page rule (>= 3 triangle values, both square values, P on >= 2, a tilted triangle)`);
    const cards = [], meta = [];
    for (const k of keys) {
      const s = FIG.sub(k);
      // among the fitting poses prefer the TALL ones (a narrow set stands up in its card: rabbit-head 86 x 165, not 165 x 86 — the sparse rule)
      const fitting = TG.TRANSFORM_NAMES.filter((t) => fits(TG.transformTiling(s.tans, t)));
      if (!fitting.length) throw new Error(`${ID} count: set ${k} fits under no transform`);
      const tallest = Math.max(...fitting.map((t) => drawnSize(TG.transformTiling(s.tans, t), S, PAD).h));
      const ts = fitting.filter((t) => drawnSize(TG.transformTiling(s.tans, t), S, PAD).h >= tallest - 0.5);
      const t = rng.pick(ts);
      cards.push(C4.countCard({ sub: { key: k, tans: TG.transformTiling(s.tans, t), counts: s.counts }, S, boxW: 64, boxH: COUNT_ROW_H, transform: t }));
      meta.push({ key: k, transform: t, counts: s.counts });
    }
    const cfg = { mode: 'count', S, items, cols, rows, boxes: d.boxes.slice(), tans: tansR, triangles: triR, pool, bodyMin };
    const bodyHtml = faceRoot('count', cfg, { face: 'K-359', floor: BAND_FLOOR.K }, cardGrid({ cards, cols, rows, numbered: true }));
    return { bodyHtml, meta: { mode: 'count', S, cards: meta } };
  },

  async verify(page) {
    const mode = await page.evaluate((ID) => { const r = document.querySelector(`[data-lcs-type="${ID}"]`); return r ? (r.dataset.lcsMode || null) : null; }, ID);
    if (mode) return this._verifyFace(page, mode);
    return page.evaluate(({ ID, K_FLOOR }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) { f.push('no root'); return f; }
      if (root.dataset.lcsMode) { f.push(`base verify on a face page (mode ${root.dataset.lcsMode})`); return f; }
      let cfg;
      try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { f.push('unreadable cfg'); return f; }
      const S = +cfg.S;
      if (!(S >= K_FLOOR / (Math.SQRT2 / 4))) f.push(`scale ${S} below the K floor (small edge ${(S * Math.SQRT2 / 4).toFixed(1)} < ${K_FLOOR})`);
      if (+root.dataset.lcsScale !== S) f.push('scale stamp ≠ cfg');
      const AREA = { L: 0.25, M: 0.125, S: 0.0625, Q: 0.125, P: 0.125 };
      const IDS = ['L1', 'L2', 'M', 'S1', 'S2', 'Q', 'P'];
      const pts = (el) => (el.getAttribute('points') || '').trim().split(/\s+/).map((p) => p.split(',').map(Number));
      const area = (p) => { let a = 0; for (let i = 0; i < p.length; i++) { const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length]; a += x1 * y2 - x2 * y1; } return a / 2; };
      const clip = (sub, clp) => { const sgn = area(clp) >= 0 ? 1 : -1; let out = sub; for (let i = 0; i < clp.length; i++) { const A = clp[i], B = clp[(i + 1) % clp.length]; const inp = out; out = []; const side = (p) => sgn * ((B[0] - A[0]) * (p[1] - A[1]) - (B[1] - A[1]) * (p[0] - A[0])); for (let j = 0; j < inp.length; j++) { const P = inp[j], Q = inp[(j + 1) % inp.length]; const sp = side(P), sq = side(Q); if (sp >= -1e-9) out.push(P); if ((sp >= -1e-9) !== (sq >= -1e-9)) { const t = sp / (sp - sq); out.push([P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]); } } if (!out.length) break; } return out.length ? Math.abs(area(out)) : 0; };
      const minEdge = (p) => Math.min(...p.map((v, i) => Math.hypot(v[0] - p[(i + 1) % p.length][0], v[1] - p[(i + 1) % p.length][1])));
      const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
      const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
      const inBody = (el, what) => { const r = el.getBoundingClientRect(); if (r.left < body.left - 0.6 || r.right > body.right + 0.6 || r.top < body.top - 0.6 || r.bottom > foot + 0.6) f.push(`${what} outside the body / into the footer`); };
      const unscaled = (svg, what) => { const r = svg.getBoundingClientRect(); if (Math.abs(r.width - +svg.getAttribute('width')) > 0.6 || Math.abs(r.height - +svg.getAttribute('height')) > 0.6) f.push(`${what} is CSS-scaled (${r.width.toFixed(1)}x${r.height.toFixed(1)} vs ${svg.getAttribute('width')}x${svg.getAttribute('height')})`); };
      // the seven tans of one drawing: ids, class areas, no overlap, sum, floor
      const checkTans = (svg, what, opts) => {
        const polys = [...svg.querySelectorAll('polygon[data-lcs-tan]')];
        const ids = polys.map((p) => p.dataset.lcsTan);
        if (ids.slice().sort().join() !== IDS.slice().sort().join()) { f.push(`${what}: tans [${ids.join(' ')}] are not the seven`); return; }
        const P = polys.map(pts);
        let sum = 0;
        polys.forEach((p, i) => {
          const cls = p.dataset.lcsClass;
          if (cls !== ids[i][0]) f.push(`${what}: ${ids[i]} stamped class ${cls}`);
          const a = Math.abs(area(P[i]));
          const want = AREA[cls] * S * S;
          if (Math.abs(a - want) > want * 0.01) f.push(`${what}: ${ids[i]} area ${a.toFixed(0)} ≠ ${want.toFixed(0)}`);
          sum += a;
          if (minEdge(P[i]) < K_FLOOR - 0.5) f.push(`${what}: ${ids[i]} edge ${minEdge(P[i]).toFixed(1)} < the K floor ${K_FLOOR}`);
          if (Math.abs(parseFloat(p.getAttribute('stroke-width')) - opts.seam) > 0.01) f.push(`${what}: ${ids[i]} seam ${p.getAttribute('stroke-width')} ≠ ${opts.seam}`);
          if (p.getAttribute('fill').toUpperCase() !== opts.fill) f.push(`${what}: ${ids[i]} fill ${p.getAttribute('fill')}`);
        });
        if (Math.abs(sum - S * S) > S * S * 0.01) f.push(`${what}: tan areas sum ${sum.toFixed(0)} ≠ S² ${S * S}`);
        for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) if (clip(P[i], P[j]) > 1) f.push(`${what}: ${ids[i]} overlaps ${ids[j]}`);
        if (+svg.dataset.lcsTans !== 7) f.push(`${what}: data-lcs-tans ${svg.dataset.lcsTans} ≠ 7`);
        return P;
      };
      // the cut-out set
      const sets = [...root.querySelectorAll('svg[data-lcs-set]')];
      if (sets.length !== 1) f.push(`${sets.length} cut-out sets`);
      else {
        const svg = sets[0];
        if (svg.dataset.lcsMode !== 'template' || svg.dataset.lcsFigure !== 'square') f.push('the set is not the square in template mode');
        if (+svg.dataset.lcsScale !== S) f.push('set scale ≠ cfg');
        const P = checkTans(svg, 'set', { seam: 3, fill: '#FBF3E4' });
        if (P) {
          const xs = P.flat().map((v) => v[0]), ys = P.flat().map((v) => v[1]);
          const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
          if (Math.abs(w - S) > 0.6 || Math.abs(h - S) > 0.6) f.push(`set bbox ${w.toFixed(1)}x${h.toFixed(1)} ≠ S ${S}`);
        }
        if (svg.querySelector('path, text, image')) f.push('the set carries a path / text / image');
        unscaled(svg, 'set'); inBody(svg, 'set');
      }
      if (root.querySelectorAll('[data-lcs-scissors]').length !== 1) f.push('scissors glyph count ≠ 1');
      // legend
      const rows = [...root.querySelectorAll('[data-lcs-legend]')];
      if (cfg.legend) {
        if (rows.map((r) => r.dataset.lcsLegend).join() !== 'L,M,S,Q,P') f.push(`legend rows [${rows.map((r) => r.dataset.lcsLegend).join(' ')}] ≠ L M S Q P`);
        const fills = new Set();
        rows.forEach((r) => {
          const sw = r.querySelector('[data-lcs-swatch]');
          const g = r.querySelector('[data-lcs-glyph]');
          if (!sw) f.push(`legend ${r.dataset.lcsLegend}: no swatch`);
          else { const fl = (sw.getAttribute('fill') || '').toUpperCase(); if (!/^#[0-9A-F]{6}$/.test(fl)) f.push(`legend ${r.dataset.lcsLegend}: swatch fill ${fl}`); if (fills.has(fl)) f.push(`legend ${r.dataset.lcsLegend}: swatch colour repeats`); fills.add(fl); }
          if (!g || g.dataset.lcsGlyph !== r.dataset.lcsLegend) f.push(`legend ${r.dataset.lcsLegend}: glyph ${g && g.dataset.lcsGlyph}`);
          if (r.querySelector('text') || (r.textContent || '').trim()) f.push(`legend ${r.dataset.lcsLegend}: carries text`);
          inBody(r, `legend ${r.dataset.lcsLegend}`);
        });
        const tb = sets[0] && sets[0].getBoundingClientRect();
        if (tb && rows.length) { const lb = rows[0].getBoundingClientRect(); if (lb.left < tb.right + 20) f.push('legend runs into the template'); }
      } else if (rows.length) f.push('a legend on a legend:false config');
      // the figures
      const figs = [...root.querySelectorAll('svg[data-lcs-figure]:not([data-lcs-set])')];
      if (figs.length !== cfg.figures) f.push(`${figs.length} figures ≠ cfg ${cfg.figures}`);
      const keys = figs.map((s) => s.dataset.lcsFigure);
      if (new Set(keys).size !== keys.length) f.push(`figures repeat (${keys.join(' ')})`);
      keys.forEach((k) => { if (!cfg.pool.includes(k)) f.push(`figure "${k}" not in the pool [${cfg.pool.join(' ')}]`); if (k === 'square') f.push('the square is drawn as a figure (it is the template)'); });
      const wantMode = cfg.seams ? 'solution' : 'silhouette';
      figs.forEach((svg, i) => {
        const what = `figure ${i + 1} (${svg.dataset.lcsFigure})`;
        if (svg.dataset.lcsMode !== wantMode) f.push(`${what}: mode ${svg.dataset.lcsMode} ≠ ${wantMode}`);
        if (+svg.dataset.lcsScale !== S) f.push(`${what}: scale ${svg.dataset.lcsScale} ≠ ${S}`);
        if (svg.querySelector('text, image, img')) f.push(`${what}: carries text or an image`);
        if (wantMode === 'solution') {
          checkTans(svg, what, { seam: 2, fill: '#FBF3E4' });
          const o = svg.querySelectorAll('path[data-lcs-outline]');
          if (o.length !== 1) f.push(`${what}: ${o.length} outline paths`);
          else if (o[0].getAttribute('fill') !== 'none' || Math.abs(parseFloat(o[0].getAttribute('stroke-width')) - 3) > 0.01) f.push(`${what}: outline is not a 3 px unfilled path`);
          if (svg.querySelector('[data-lcs-silhouette]')) f.push(`${what}: a silhouette path on a seamed figure`);
        } else {
          if (svg.querySelector('polygon[data-lcs-tan]')) f.push(`${what}: tan polygons on a shadow (seams visible)`);
          const p = svg.querySelectorAll('path[data-lcs-silhouette]');
          if (p.length !== 1) f.push(`${what}: ${p.length} silhouette paths`);
          else {
            const fill = (p[0].getAttribute('fill') || '').toUpperCase(), stroke = (p[0].getAttribute('stroke') || '').toUpperCase();
            if (fill !== stroke || fill !== '#146B5E') f.push(`${what}: shadow fill ${fill} / stroke ${stroke} (must both be teal)`);
          }
          if (+svg.dataset.lcsTans !== 0) f.push(`${what}: data-lcs-tans ${svg.dataset.lcsTans} on a shadow`);
        }
        unscaled(svg, what); inBody(svg, what);
      });
      // no two drawings overlap; the row sits under the template block
      const all = [...sets, ...figs].map((s) => s.getBoundingClientRect());
      for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const a = all[i], b = all[j]; if (a.left < b.right - 0.6 && b.left < a.right - 0.6 && a.top < b.bottom - 0.6 && b.top < a.bottom - 0.6) f.push(`drawings ${i + 1} and ${j + 1} overlap`); }
      const tplBlock = root.querySelector('[data-lcs-template-block]'), rowEl = root.querySelector('[data-lcs-figure-row]');
      if (!tplBlock || !rowEl) f.push('template block / figure row missing');
      else { const a = tplBlock.getBoundingClientRect(), b = rowEl.getBoundingClientRect(); const g = +cfg.gap || 16; if (b.top < a.bottom + g - 0.6) f.push(`figure row ${b.top.toFixed(0)} starts above the template block's bottom + ${g} (${a.bottom.toFixed(0)})`); if (a.width > 675.6 || b.width > 675.6) f.push('a block wider than 675'); }
      // nothing else on the page
      if (root.querySelector('img, text, [data-lcs-answer], .ws-answerbox, .ws-card, input')) f.push('the base page carries a picture, text, a card or an answer');
      if ((root.textContent || '').trim()) f.push(`text on the body: "${root.textContent.trim().slice(0, 30)}"`);
      return f;
    }, { ID, K_FLOOR });
  },

  /**
   * verify() for the five faces. The browser only SNAPSHOTS the DOM (stamps, polygon points, client
   * rects); every answer and every drawing is RE-DERIVED here in node from the bank (never from the
   * DOM): outlines / shadows / holes / candidates / count sets must equal the stored placement under
   * the stamped transform at the stamped scale, F3 chips must be true-size and the correct one
   * congruent to the hole by rotation, F4 distractors must lie outside the symmetry group of the
   * shadow AS DRAWN, F5 answers must equal the bank's class counts. Layout: every svg unscaled and
   * inside its card / box, the band floor measured on the polygon points, the card grid filling the
   * body (F4: the stage top-anchored, the band between rows === gap, stage >= 660), no text but the
   * card badges, no picture, no stray answer stamp.
   */
  async _verifyFace(page, mode) {
    const snap = await page.evaluate((ID) => {
      const R = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
      const pts = (el) => (el.getAttribute('points') || '').trim().split(/\s+/).map((p) => p.split(',').map(Number));
      const pathPts = (el) => { const d = el.getAttribute('d') || ''; const m = d.match(/-?\d+(?:\.\d+)?\s-?\d+(?:\.\d+)?/g) || []; return m.map((s) => s.split(' ').map(Number)); };
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      const out = { fails: [] };
      if (!root) { out.fails.push('no root'); return out; }
      out.stamps = { ...root.dataset };
      try { out.cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { out.fails.push('unreadable cfg'); return out; }
      out.body = R(document.querySelector('[data-lcs-body]'));
      out.foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
      out.hasForeign = !!root.querySelector('img, text, image, foreignObject, input');
      let txt = root.textContent || '';
      root.querySelectorAll('.ws-card-badge').forEach((b) => { txt = txt.replace(b.textContent, ''); });
      out.textOutsideBadges = txt.trim();
      out.answerStampsOutsideBoxes = [...root.querySelectorAll('[data-lcs-answer]')].filter((e) => !e.classList.contains('ws-answerbox')).length;
      const grid = root.querySelector('.ws-cardgrid');
      out.grid = grid ? R(grid) : null;
      const stage = root.querySelector('[data-lcs-match-stage]');
      out.stage = stage ? R(stage) : null;
      const cards = [...root.querySelectorAll('.ws-card')];
      out.cards = cards.map((c, i) => {
        const cs = getComputedStyle(c);
        const r = c.getBoundingClientRect();
        const pad = { l: parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth), t: parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth), r: parseFloat(cs.paddingRight) + parseFloat(cs.borderRightWidth), b: parseFloat(cs.paddingBottom) + parseFloat(cs.borderBottomWidth) };
        const inner = { left: r.left + pad.l, top: r.top + pad.t, right: r.right - pad.r, bottom: r.bottom - pad.b };
        const kids = [...c.querySelectorAll('svg[data-lcs-prim="tangram"], [data-lcs-glyph-strip], [data-lcs-answer-row], .ws-achip')].map((k) => k.getBoundingClientRect()).filter((k) => k.width > 0);
        const badge = c.querySelector('.ws-card-badge');
        return { i, rect: R(c), inner, padding: parseFloat(cs.paddingLeft), badge: badge ? badge.textContent.trim() : null, contentTop: Math.min(...kids.map((k) => k.top)), contentBottom: Math.max(...kids.map((k) => k.bottom)), contentLeft: Math.min(...kids.map((k) => k.left)), contentRight: Math.max(...kids.map((k) => k.right)) };
      });
      const rows = [...root.querySelectorAll('[data-lcs-match-row]')];
      out.rows = rows.map((row, i) => ({ i, key: row.dataset.lcsFigure, t0: row.dataset.lcsTransform, rect: R(row), target: row.querySelector('[data-lcs-target]') ? R(row.querySelector('[data-lcs-target]')) : null,
        candidates: [...row.querySelectorAll('[data-lcs-candidate]')].map((c) => ({ i: +c.dataset.lcsCandidate, t: c.dataset.lcsT, correct: c.dataset.lcsCorrect === '1', rect: R(c), svgs: c.querySelectorAll('svg[data-lcs-prim="tangram"]').length })) }));
      out.figures = [...root.querySelectorAll('svg[data-lcs-prim="tangram"]')].map((svg) => {
        const card = svg.closest('.ws-card'), row = svg.closest('[data-lcs-match-row]'), cand = svg.closest('[data-lcs-candidate]'), target = svg.closest('[data-lcs-target]');
        return {
          card: card ? cards.indexOf(card) : -1, row: row ? rows.indexOf(row) : -1, cand: cand ? +cand.dataset.lcsCandidate : -1, isTarget: !!target,
          key: svg.dataset.lcsFigure, mode: svg.dataset.lcsMode, transform: svg.dataset.lcsTransform || null, S: +svg.dataset.lcsScale, missing: svg.dataset.lcsMissing || null, tanCount: +svg.dataset.lcsTans,
          attrW: +svg.getAttribute('width'), attrH: +svg.getAttribute('height'), rect: R(svg), hasText: !!svg.querySelector('text, image, foreignObject'),
          tans: [...svg.querySelectorAll('polygon[data-lcs-tan]')].map((p) => ({ id: p.dataset.lcsTan, cls: p.dataset.lcsClass, pts: pts(p), sw: parseFloat(p.getAttribute('stroke-width')), fill: (p.getAttribute('fill') || '').toUpperCase() })),
          paths: [...svg.querySelectorAll('path')].map((p) => ({ kind: p.hasAttribute('data-lcs-outline') ? 'outline' : p.hasAttribute('data-lcs-silhouette') ? 'silhouette' : p.hasAttribute('data-lcs-hole') ? 'hole' : 'other', cls: p.dataset.lcsHole || null, pts: pathPts(p), fill: (p.getAttribute('fill') || '').toUpperCase(), stroke: (p.getAttribute('stroke') || '').toUpperCase(), sw: parseFloat(p.getAttribute('stroke-width')), dash: p.getAttribute('stroke-dasharray') || null })),
        };
      });
      out.strips = [...root.querySelectorAll('[data-lcs-glyph-strip]')].map((s) => ({ card: cards.indexOf(s.closest('.ws-card')), classes: [...s.querySelectorAll('svg[data-lcs-glyph]')].map((g) => g.dataset.lcsGlyph), rect: R(s), hasText: !!(s.textContent || '').trim() }));
      out.chips = [...root.querySelectorAll('.ws-achip[data-lcs-chip]')].map((c) => { const svg = c.querySelector('svg[data-lcs-chip]'); const poly = svg && svg.querySelector('polygon'); return { card: cards.indexOf(c.closest('.ws-card')), cls: c.dataset.lcsChip, flip: c.dataset.lcsFlip === '1', correct: c.dataset.lcsCorrect === '1', rect: R(c), svgRect: svg ? R(svg) : null, svgFlip: svg ? svg.dataset.lcsFlip === '1' : null, svgCls: svg ? svg.dataset.lcsChip : null, svgS: svg ? +svg.dataset.lcsScale : null, pts: poly ? pts(poly) : [], text: (c.textContent || '').trim() }; });
      out.answerRows = [...root.querySelectorAll('[data-lcs-answer-row]')].map((r) => ({ card: cards.indexOf(r.closest('.ws-card')), rect: R(r), boxes: [...r.querySelectorAll('.ws-answerbox')].map((b) => ({ answer: b.dataset.lcsAnswer, text: (b.textContent || '').trim(), rect: R(b) })), glyphs: [...r.querySelectorAll('[data-lcs-count-glyph]')].map((g) => g.dataset.lcsCountGlyph) }));
      return out;
    }, ID);
    const f = snap.fails.slice();
    if (f.length) return f;
    const cfg = snap.cfg;
    const S = +cfg.S;
    const band = FACE_BAND[mode];
    const floor = BAND_FLOOR[band];
    if (cfg.mode !== mode) f.push(`cfg mode ${cfg.mode} ≠ stamp ${mode}`);
    if (+snap.stamps.lcsScale !== S) f.push('scale stamp ≠ cfg');
    if (+snap.stamps.lcsFloor !== floor) f.push(`floor stamp ${snap.stamps.lcsFloor} ≠ the ${band} floor ${floor}`);
    if (!(TG.h * S >= floor - 0.5)) f.push(`scale ${S} draws a ${(TG.h * S).toFixed(1)} px small edge < the ${band} floor ${floor}`);
    if (snap.hasForeign) f.push('a picture / text / input on a face page');
    if (snap.textOutsideBadges) f.push(`text on the body besides the card badges: "${snap.textOutsideBadges.slice(0, 30)}"`);
    if (snap.answerStampsOutsideBoxes) f.push(`${snap.answerStampsOutsideBoxes} data-lcs-answer stamp(s) outside an answer box`);
    const body = snap.body, foot = snap.foot;
    const inBody = (r, what) => { if (r.left < body.left - 0.6 || r.right > body.right + 0.6 || r.top < body.top - 0.6 || r.bottom > foot + 0.6) f.push(`${what} outside the body / into the footer`); };
    const inside = (r, box, what) => { if (r.left < box.left - 0.6 || r.right > box.right + 0.6 || r.top < box.top - 0.6 || r.bottom > box.bottom + 0.6) f.push(`${what} outside its container (${r.left.toFixed(0)}..${r.right.toFixed(0)} x ${r.top.toFixed(0)}..${r.bottom.toFixed(0)} vs ${box.left.toFixed(0)}..${box.right.toFixed(0)} x ${box.top.toFixed(0)}..${box.bottom.toFixed(0)})`); };
    const near = (a, b, tol) => Math.abs(a[0] - b[0]) < tol && Math.abs(a[1] - b[1]) < tol;
    const sameSet = (got, want, tol = 0.02) => got.length === want.length && want.every((w) => got.some((g) => near(g, w, tol)));
    const minEdge = (p) => Math.min(...p.map((v, i) => Math.hypot(v[0] - p[(i + 1) % p.length][0], v[1] - p[(i + 1) % p.length][1])));
    const edges = (p) => p.map((v, i) => Math.hypot(v[0] - p[(i + 1) % p.length][0], v[1] - p[(i + 1) % p.length][1])).sort((a, b) => a - b);
    const normKey = (pts) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]); const x0 = Math.min(...xs), y0 = Math.min(...ys); return pts.map((p) => [(p[0] - x0).toFixed(3), (p[1] - y0).toFixed(3)].join(',')).sort().join('|'); };
    const TEAL = tokens.color.teal.toUpperCase(), WHITE = tokens.color.white.toUpperCase(), CREAM = tokens.color.cream.toUpperCase(), TEALSOFT = tokens.color.tealSoft.toUpperCase(), CORAL = tokens.color.coral.toUpperCase();
    for (const g of snap.figures) {
      const what = `${g.mode} ${g.key}${g.card >= 0 ? ' (card ' + (g.card + 1) + ')' : g.row >= 0 ? ' (row ' + (g.row + 1) + (g.cand >= 0 ? ', candidate ' + (g.cand + 1) : ', shadow') + ')' : ''}`;
      if (Math.abs(g.rect.width - g.attrW) > 0.6 || Math.abs(g.rect.height - g.attrH) > 0.6) f.push(`${what} is CSS-scaled`);
      if (g.S !== S) f.push(`${what} scale ${g.S} ≠ ${S}`);
      if (g.hasText) f.push(`${what} carries text / an image`);
      if (g.transform && !TG.TRANSFORMS[g.transform]) f.push(`${what} unknown transform ${g.transform}`);
      inBody(g.rect, what);
      if (g.card >= 0) inside(g.rect, snap.cards[g.card].inner, what);
      const edge = g.tans.length ? Math.min(...g.tans.map((t) => minEdge(t.pts))) : Infinity;
      if (g.tans.length && edge < floor - 0.5) f.push(`${what} smallest tan edge ${edge.toFixed(1)} < the ${band} floor ${floor}`);
    }
    // the card grid (compose / silhouette / missing / count): items cards, badges 1..n, the grid fills the body (sparse rule)
    const gridFace = mode !== 'match';
    if (gridFace) {
      if (!snap.grid) f.push('no card grid');
      else {
        if (snap.grid.top > body.top + 1) f.push(`the grid starts ${(snap.grid.top - body.top).toFixed(0)} px under the body top (not top-anchored)`);
        if (snap.grid.height < body.height - 2) f.push(`the grid is ${snap.grid.height.toFixed(0)} px in a ${body.height.toFixed(0)} px body: ${(body.height - snap.grid.height).toFixed(0)} px of blank paper under the stage (sparse)`);
      }
      if (snap.cards.length !== cfg.items) f.push(`${snap.cards.length} cards ≠ items ${cfg.items}`);
      snap.cards.forEach((c, i) => { if (c.badge !== String(i + 1)) f.push(`card ${i + 1} badge "${c.badge}"`); inBody(c.rect, `card ${i + 1}`); if (!(c.contentBottom > c.contentTop)) f.push(`card ${i + 1} has no content`); });
      if (mode === 'silhouette') snap.cards.forEach((c, i) => { if (Math.abs(c.padding - cfg.padding) > 0.01) f.push(`card ${i + 1} padding ${c.padding} ≠ cfg ${cfg.padding}`); });
      else snap.cards.forEach((c, i) => { if (Math.abs(c.padding - CARD_PADDING) > 0.01) f.push(`card ${i + 1} padding ${c.padding} ≠ ${CARD_PADDING}`); });
    }
    if (mode === 'compose') {
      const figs = snap.figures;
      if (figs.length !== cfg.items) f.push(`${figs.length} outlines ≠ items ${cfg.items}`);
      const keys = figs.map((g) => g.key);
      if (new Set(keys).size !== keys.length) f.push(`minis repeat (${keys.join(' ')})`);
      const n2 = keys.filter((k) => cfg.pool2.includes(k)).length, n3 = keys.filter((k) => cfg.pool3.includes(k)).length;
      if (n2 !== cfg.mix[0] || n3 !== cfg.mix[1]) f.push(`mix ${n2}+${n3} ≠ cfg ${cfg.mix.join('+')}`);
      const minH = Math.min(...[...cfg.pool2, ...cfg.pool3].map((k) => drawnSize(FIG.MINIS[k], S, PAD).h));
      for (const g of figs) {
        const what = `outline ${g.key} (card ${g.card + 1})`;
        if (g.mode !== 'outline') f.push(`${what}: mode ${g.mode}`);
        if (!cfg.pool2.includes(g.key) && !cfg.pool3.includes(g.key)) { f.push(`${what}: not in the pool`); continue; }
        let m; try { m = FIG.mini(g.key); } catch (e) { f.push(`${what}: ${e.message}`); continue; }
        if (g.tans.length) f.push(`${what}: ${g.tans.length} data-lcs-tan polygons on an outline (the seam is printed)`);
        if (g.tanCount !== 0) f.push(`${what}: data-lcs-tans ${g.tanCount} ≠ 0`);
        const o = g.paths.filter((p) => p.kind === 'outline');
        if (o.length !== 1 || g.paths.length !== 1) f.push(`${what}: ${g.paths.length} paths / ${o.length} outlines`);
        else {
          if (o[0].fill !== WHITE) f.push(`${what}: outline fill ${o[0].fill} is not white (a pencil seam must show)`);
          if (o[0].stroke !== TEAL || Math.abs(o[0].sw - 3) > 0.01) f.push(`${what}: outline stroke ${o[0].stroke} ${o[0].sw}`);
          if (!g.transform) f.push(`${what}: no transform stamp`);
          else {
            const tt = TG.transformTiling(m.tans, g.transform);
            const placed = TG.placeTans(tt, S, { pad: PAD });
            const loop = TG.silhouetteOf(tt.map(TG.placeUnit))[0].map(placed.toPx);
            if (!sameSet(o[0].pts, loop)) f.push(`${what}: outline path ≠ silhouette(transformTiling(${g.key}, ${g.transform})) at S ${S}`);
          }
        }
        const strip = snap.strips.find((s) => s.card === g.card);
        if (!strip) f.push(`${what}: no glyph strip`);
        else {
          const want = m.tans.map((t) => TG.clsOf(t.id)).sort().join();
          if (strip.classes.slice().sort().join() !== want) f.push(`${what}: glyph strip [${strip.classes.join(' ')}] ≠ the mini's classes [${want}]`);
          const order = strip.classes.map((c) => TG.CLASSES.indexOf(c));
          if (order.some((v, i) => i && v < order[i - 1])) f.push(`${what}: glyph strip not in the L M S Q P order`);
          if (strip.hasText) f.push(`${what}: text in the glyph strip`);
          if (strip.rect.bottom > g.rect.top - CARD_STAGE_GAP + 0.6) f.push(`${what}: the outline rises into the glyph strip`);
        }
        const card = snap.cards[g.card];
        if (card && card.contentBottom - card.contentTop < GLYPH_STRIP_H + CARD_STAGE_GAP + minH - 1) f.push(`card ${g.card + 1} content ${(card.contentBottom - card.contentTop).toFixed(0)} px < strip + gap + the smallest outline ${GLYPH_STRIP_H + CARD_STAGE_GAP + minH}`);
      }
    } else if (mode === 'silhouette') {
      const figs = snap.figures;
      if (figs.length !== cfg.items) f.push(`${figs.length} shadows ≠ items ${cfg.items}`);
      const keys = figs.map((g) => g.key);
      if (new Set(keys).size !== keys.length) f.push(`shadows repeat (${keys.join(' ')})`);
      // the two-height grid: row 1 === rowH, row 2 takes the rest; no two shadows are one shape (tree ≡ arrow)
      if (+snap.stamps.lcsRowH !== cfg.rowH) f.push(`row-h stamp ${snap.stamps.lcsRowH} ≠ cfg ${cfg.rowH}`);
      snap.cards.forEach((c, i) => { if (i < cfg.cols && Math.abs(c.rect.height - cfg.rowH) > 1) f.push(`card ${i + 1} is ${c.rect.height.toFixed(0)} tall, the tall row is ${cfg.rowH}`); });
      for (let i = 0; i < figs.length; i++) for (let j = i + 1; j < figs.length; j++) { if (FIG.FIGURES[figs[i].key] && FIG.FIGURES[figs[j].key] && sameShape(FIG.FIGURES[figs[i].key], FIG.FIGURES[figs[j].key])) f.push(`shadows ${figs[i].key} and ${figs[j].key} are ONE shape turned (cards ${figs[i].card + 1} and ${figs[j].card + 1})`); }
      for (const g of figs) {
        const what = `shadow ${g.key} (card ${g.card + 1})`;
        if (g.mode !== 'silhouette') f.push(`${what}: mode ${g.mode}`);
        if (!cfg.pool.includes(g.key)) { f.push(`${what}: not in the pool [${cfg.pool.join(' ')}]`); continue; }
        if (g.tans.length || g.tanCount !== 0) f.push(`${what}: tan polygons on a shadow (seams visible)`);
        const p = g.paths.filter((x) => x.kind === 'silhouette');
        if (p.length !== 1 || g.paths.length !== 1) f.push(`${what}: ${g.paths.length} paths / ${p.length} silhouettes`);
        else {
          if (p[0].fill !== p[0].stroke || p[0].fill !== TEAL) f.push(`${what}: fill ${p[0].fill} / stroke ${p[0].stroke} (must both be teal)`);
          if (!g.transform) f.push(`${what}: no transform stamp`);
          else { const tt = TG.transformTiling(FIG.figure(g.key).tans, g.transform); const placed = TG.placeTans(tt, S, { pad: PAD }); const loop = TG.silhouetteOf(tt.map(TG.placeUnit))[0].map(placed.toPx); if (!sameSet(p[0].pts, loop)) f.push(`${what}: path ≠ silhouette(transformTiling(${g.key}, ${g.transform})) at S ${S}`); }
        }
      }
    } else if (mode === 'missing') {
      const figs = snap.figures;
      if (figs.length !== cfg.items) f.push(`${figs.length} holed figures ≠ items ${cfg.items}`);
      const pairs = new Set(), holeClasses = new Set();
      for (const g of figs) {
        const what = `figure ${g.key} (card ${g.card + 1})`;
        if (g.mode !== 'hole') f.push(`${what}: mode ${g.mode}`);
        if (!cfg.pool.includes(g.key)) { f.push(`${what}: not in the pool [${cfg.pool.join(' ')}]`); continue; }
        if (!cfg.holes.includes(g.missing)) f.push(`${what}: hole class ${g.missing} not in ${cfg.holes.join(' ')}`);
        const pk = g.key + '/' + g.missing;
        if (pairs.has(pk)) f.push(`${what}: (figure, hole class) ${pk} twice on the page`); pairs.add(pk); holeClasses.add(g.missing);
        if (!g.transform) { f.push(`${what}: no transform stamp`); continue; }
        const tt = TG.transformTiling(FIG.figure(g.key).tans, g.transform);
        const placed = TG.placeTans(tt, S, { pad: cfg.pad });
        const ids = g.tans.map((t) => t.id);
        if (ids.length !== 6 || new Set(ids).size !== 6 || g.tanCount !== 6) f.push(`${what}: ${ids.length} tans drawn (six + the hole)`);
        const missingIds = TG.TAN_IDS.filter((id) => !ids.includes(id));
        if (missingIds.length !== 1) f.push(`${what}: missing ids [${missingIds.join(' ')}]`);
        const missingId = missingIds[0];
        if (missingId && TG.clsOf(missingId) !== g.missing) f.push(`${what}: the absent tan ${missingId} is not of the stamped class ${g.missing}`);
        for (const t of placed.tans) {
          const got = g.tans.find((x) => x.id === t.id);
          if (t.id === missingId) continue;
          if (!got || !sameSet(got.pts, t.pts)) f.push(`${what}: ${t.id} polygon ≠ the stored placement under ${g.transform} at S ${S}`);
          else { if (got.fill !== TEALSOFT) f.push(`${what}: ${t.id} fill ${got.fill} (six tans are tealSoft)`); if (Math.abs(got.sw - 2) > 0.01) f.push(`${what}: ${t.id} seam ${got.sw} ≠ 2`); }
        }
        const hole = g.paths.filter((p) => p.kind === 'hole');
        if (hole.length !== 1 || g.paths.length !== 1) f.push(`${what}: ${hole.length} hole paths`);
        else {
          const h = hole[0];
          const want = placed.tans.find((t) => t.id === missingId);
          if (want && !sameSet(h.pts, want.pts)) f.push(`${what}: hole path ≠ the missing tan's placement`);
          if (h.fill !== 'NONE') f.push(`${what}: hole fill ${h.fill} (must be none: page cream shows through)`);
          if (h.stroke !== CORAL || h.dash !== '8 6' || Math.abs(h.sw - 3) > 0.01) f.push(`${what}: hole stroke ${h.stroke} ${h.sw} dash ${h.dash}`);
          if (h.cls !== g.missing) f.push(`${what}: hole class stamp ${h.cls} ≠ ${g.missing}`);
          const a = Math.abs(TG.polyArea(h.pts)), wantA = TG.TANS[g.missing] ? TG.TANS[g.missing].area * S * S : 0;
          if (Math.abs(a - wantA) > wantA * 0.01) f.push(`${what}: hole area ${a.toFixed(0)} ≠ ${wantA.toFixed(0)}`);
        }
        // chips
        const chips = snap.chips.filter((c) => c.card === g.card);
        const card = snap.cards[g.card];
        if (chips.length !== cfg.chips) f.push(`${what}: ${chips.length} chips ≠ ${cfg.chips}`);
        const classes = chips.map((c) => c.cls);
        if (new Set(classes).size !== classes.length) f.push(`${what}: chip classes repeat [${classes.join(' ')}]`);
        if (classes.includes('L')) f.push(`${what}: an L chip`);
        const correct = chips.filter((c) => c.correct);
        if (correct.length !== 1) f.push(`${what}: ${correct.length} correct chips`);
        else if (correct[0].cls !== g.missing) f.push(`${what}: the correct chip is ${correct[0].cls}, the hole ${g.missing}`);
        if ((g.missing === 'M' || g.missing === 'S') && !classes.includes(g.missing === 'M' ? 'S' : 'M')) f.push(`${what}: a ${g.missing} hole without the other triangle size among the chips`);
        const holeTan = tt.find((t) => t.id === missingId);
        for (const c of chips) {
          const cw = `${what} chip ${c.cls}`;
          if (c.text) f.push(`${cw}: text "${c.text}"`);
          if (c.svgCls !== c.cls || c.svgFlip !== c.flip) f.push(`${cw}: the chip svg stamps ${c.svgCls}${c.svgFlip ? '*' : ''}`);
          if (c.svgS !== S) f.push(`${cw}: drawn at ${c.svgS}, not the figure's S ${S} (chips are true-size)`);
          if (c.flip && c.cls !== 'P') f.push(`${cw}: flip on a ${c.cls}`);
          if (c.rect.height < 44 - 0.6) f.push(`${cw}: box ${c.rect.height.toFixed(0)} < 44`);
          if (Math.abs(c.rect.width - cfg.chipW) > 0.6) f.push(`${cw}: box width ${c.rect.width.toFixed(0)} ≠ ${cfg.chipW}`);
          if (c.svgRect) inside(c.svgRect, c.rect, cw);
          if (card) inside(c.rect, card.inner, cw);
          if (!c.pts.length) { f.push(`${cw}: no polygon`); continue; }
          const want = edges(TG.canonicalPose(c.cls, S, { flip: c.flip }));
          const got = edges(c.pts);
          if (got.length !== want.length || got.some((e, i) => Math.abs(e - want[i]) > 0.5)) f.push(`${cw}: edges [${got.map((e) => e.toFixed(1)).join(' ')}] ≠ true-size [${want.map((e) => e.toFixed(1)).join(' ')}]`);
          if (c.correct && holeTan) {
            if (c.cls === 'P' && !!holeTan.flip !== c.flip) f.push(`${cw}: the correct P chip flip ${c.flip} ≠ the hole's ${!!holeTan.flip}`);
            // congruent to the hole by ROTATION (never a turn of the paper): some 45° turn of the chip equals the hole's point set
            const holePts = TG.placeUnit(holeTan);
            const chipUnit = c.pts.map((p) => [p[0] / S, p[1] / S]);
            const rotOk = [0, 45, 90, 135, 180, 225, 270, 315].some((deg) => { const th = deg * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th); return normKey(chipUnit.map(([x, y]) => [x * cs - y * sn, x * sn + y * cs])) === normKey(holePts); });
            if (!rotOk) f.push(`${cw}: not congruent to the hole by rotation`);
          }
          if (!c.correct && holeTan && c.cls === g.missing) f.push(`${cw}: a second chip of the hole's class`);
        }
        if (chips.length) { const col = chips.map((c) => c.rect); const top = Math.min(...col.map((r) => r.top)), bot = Math.max(...col.map((r) => r.bottom)); if (card && bot - top > card.inner.bottom - card.inner.top + 0.6) f.push(`${what}: chip column ${(bot - top).toFixed(0)} > the card inner`); if (g.rect.right > Math.min(...col.map((r) => r.left)) - CARD_STAGE_GAP + 0.6) f.push(`${what}: the figure runs into the chip column`); }
      }
      if (holeClasses.size < Math.min(4, cfg.holes.length)) f.push(`${holeClasses.size} hole classes on the page (< ${Math.min(4, cfg.holes.length)})`);
      // the shape cap: tree ≡ arrow is one silhouette; no shape on more than ceil(items / shapes) cards
      const shapes = [];
      for (const k of cfg.pool) if (FIG.FIGURES[k]) { const c = shapes.find((cl) => sameShape(FIG.FIGURES[cl[0]], FIG.FIGURES[k])); if (c) c.push(k); else shapes.push([k]); }
      const cap = Math.ceil(cfg.items / Math.max(1, shapes.length));
      const perShape = {};
      for (const g of figs) { const i = shapes.findIndex((cl) => cl.includes(g.key)); if (i >= 0) perShape[i] = (perShape[i] || 0) + 1; }
      for (const [i, n] of Object.entries(perShape)) if (n > cap) f.push(`shape [${shapes[i].join('/')}] on ${n} cards > the cap ${cap}`);
    } else if (mode === 'match') {
      if (!snap.stage) f.push('no match stage');
      else {
        if (snap.stage.top > body.top + 1) f.push(`the stage starts ${(snap.stage.top - body.top).toFixed(0)} px under the body top (not top-anchored)`);
        if (snap.stage.height < FACE_STAGE_FLOOR) f.push(`stage ${snap.stage.height.toFixed(0)} px < ${FACE_STAGE_FLOOR}: the rows do not use the page (sparse)`);
        if (+snap.stamps.lcsStack !== Math.round(snap.stage.height)) f.push(`stage ${snap.stage.height.toFixed(0)} ≠ the stamped stack ${snap.stamps.lcsStack}`);
        inBody(snap.stage, 'the stage');
      }
      const rows = snap.rows;
      if (rows.length !== cfg.rows) f.push(`${rows.length} rows ≠ cfg ${cfg.rows}`);
      const keys = rows.map((r) => r.key);
      if (new Set(keys).size !== keys.length) f.push(`figures repeat (${keys.join(' ')})`);
      const positions = [];
      rows.forEach((row, i) => {
        const what = `row ${i + 1} (${row.key})`;
        if (i) { const band = row.rect.top - rows[i - 1].rect.bottom; if (Math.abs(band - cfg.gap) > 1) f.push(`${what}: a ${band.toFixed(0)} px band above it (the gap is ${cfg.gap})`); }
        if (row.rect.width > BODY_W + 0.6) f.push(`${what}: ${row.rect.width.toFixed(0)} px wide > ${BODY_W}`);
        if (!cfg.pool.includes(row.key)) { f.push(`${what}: not in the pool`); return; }
        if (FIG.F4_REFUSED.includes(row.key)) f.push(`${what}: a refused figure`);
        if (!row.t0 || !TG.TRANSFORMS[row.t0]) { f.push(`${what}: no target transform`); return; }
        const fig = FIG.figure(row.key);
        const target = TG.transformTiling(fig.tans, row.t0);
        const group = TG.symmetryGroup(target);
        const placedT = TG.placeTans(target, S, { pad: cfg.pad });
        const loopT = TG.silhouetteOf(target.map(TG.placeUnit))[0].map(placedT.toPx);
        const shadow = snap.figures.find((g) => g.row === i && g.isTarget);
        if (!shadow) f.push(`${what}: no shadow`);
        else {
          if (shadow.mode !== 'silhouette' || shadow.key !== row.key || shadow.transform !== row.t0) f.push(`${what}: shadow stamps ${shadow.mode} ${shadow.key} ${shadow.transform}`);
          const p = shadow.paths.filter((x) => x.kind === 'silhouette');
          if (p.length !== 1 || shadow.tans.length) f.push(`${what}: the shadow is not one solid path`);
          else { if (p[0].fill !== p[0].stroke || p[0].fill !== TEAL) f.push(`${what}: shadow fill ${p[0].fill} / stroke ${p[0].stroke}`); if (!sameSet(p[0].pts, loopT)) f.push(`${what}: shadow path ≠ silhouette(transformTiling(${row.key}, ${row.t0}))`); }
          if (row.target) inside(shadow.rect, row.target, `${what} shadow`);
          if (row.target && (Math.abs(row.target.width - cfg.box) > 0.6 || Math.abs(row.target.height - cfg.box) > 0.6)) f.push(`${what}: shadow box ${row.target.width.toFixed(0)} x ${row.target.height.toFixed(0)} ≠ ${cfg.box}`);
        }
        if (row.candidates.length !== cfg.candidates) f.push(`${what}: ${row.candidates.length} candidates ≠ ${cfg.candidates}`);
        const correct = row.candidates.filter((c) => c.correct);
        if (correct.length !== 1) f.push(`${what}: ${correct.length} correct candidates`);
        else { if (correct[0].t !== 'id') f.push(`${what}: the correct candidate is stamped t ${correct[0].t}`); positions.push(row.candidates.indexOf(correct[0])); }
        const polySets = [];
        const targetKey = normKey(loopT);
        const targetP = target.find((t) => t.id === 'P');
        for (const c of row.candidates) {
          const cw = `${what} candidate ${c.i + 1} (${c.t})`;
          if (!TG.TRANSFORMS[c.t]) { f.push(`${cw}: unknown transform`); continue; }
          if (Math.abs(c.rect.width - cfg.box) > 0.6 || Math.abs(c.rect.height - cfg.box) > 0.6) f.push(`${cw}: box ${c.rect.width.toFixed(0)} x ${c.rect.height.toFixed(0)} ≠ ${cfg.box}`);
          if (c.svgs !== 1) f.push(`${cw}: ${c.svgs} drawings`);
          const g = snap.figures.find((x) => x.row === i && x.cand === c.i);
          if (!g) { f.push(`${cw}: no drawing`); continue; }
          inside(g.rect, c.rect, cw);
          if (g.mode !== 'solution' || g.key !== row.key) f.push(`${cw}: stamps ${g.mode} ${g.key}`);
          if (g.transform !== c.t) f.push(`${cw}: drawing transform ${g.transform} ≠ ${c.t}`);
          const tt = TG.transformTiling(target, c.t);
          const placed = TG.placeTans(tt, S, { pad: cfg.pad });
          if (g.tans.length !== 7) f.push(`${cw}: ${g.tans.length} tans`);
          for (const t of placed.tans) { const got = g.tans.find((x) => x.id === t.id); if (!got || !sameSet(got.pts, t.pts)) f.push(`${cw}: ${t.id} ≠ transformTiling(target, ${c.t}) at S ${S}`); else { if (got.fill !== CREAM) f.push(`${cw}: ${t.id} fill ${got.fill}`); if (Math.abs(got.sw - 2) > 0.01) f.push(`${cw}: ${t.id} seam ${got.sw}`); } }
          const o = g.paths.filter((p) => p.kind === 'outline');
          if (o.length !== 1) f.push(`${cw}: ${o.length} outline paths`);
          const loopC = TG.silhouetteOf(tt.map(TG.placeUnit))[0].map(placed.toPx);
          const key = normKey(loopC);
          if (c.correct) { if (c.t !== 'id' || key !== targetKey) f.push(`${cw}: the correct candidate does not cast the shadow`); }
          else {
            if (group.includes(c.t)) f.push(`${cw}: distractor transform ${c.t} lies INSIDE the symmetry group [${group.join(' ')}] of the shadow as drawn — a second right answer`);
            if (key === targetKey) f.push(`${cw}: the distractor casts the same shadow`);
            const pC = tt.find((t) => t.id === 'P');
            if (targetP && pC && TG.MIRRORS.has(c.t) && !!pC.flip === !!targetP.flip) f.push(`${cw}: a mirror candidate whose P did not flip`);
            if (targetP && pC && !TG.MIRRORS.has(c.t) && !!pC.flip !== !!targetP.flip) f.push(`${cw}: a turned candidate whose P flipped`);
          }
          polySets.push(g.tans.map((t) => t.id + ':' + normKey(t.pts)).sort().join('|'));
        }
        if (new Set(polySets).size !== polySets.length) f.push(`${what}: two candidates are the same drawing`);
      });
      if (rows.length > 1 && positions.length === rows.length && new Set(positions).size < 2) f.push(`the correct candidate sits in position ${positions[0] + 1} on every row`);
      const drawnShadows = rows.filter((r) => FIG.FIGURES[r.key] && TG.TRANSFORMS[r.t0]).map((r) => shapeKeyOf(TG.transformTiling(FIG.FIGURES[r.key], r.t0)));
      if (new Set(drawnShadows).size !== drawnShadows.length) f.push('two rows show the same shadow as drawn');
    } else if (mode === 'count') {
      const figs = snap.figures;
      if (figs.length !== cfg.items) f.push(`${figs.length} sets ≠ items ${cfg.items}`);
      const keys = figs.map((g) => g.key);
      if (new Set(keys).size !== keys.length) f.push(`sets repeat (${keys.join(' ')})`);
      const subs = [];
      for (const g of figs) {
        const what = `set ${g.key} (card ${g.card + 1})`;
        if (g.mode !== 'solution') f.push(`${what}: mode ${g.mode}`);
        if (!cfg.pool.includes(g.key)) { f.push(`${what}: not in the pool [${cfg.pool.join(' ')}]`); continue; }
        const s = FIG.sub(g.key);
        subs.push(s);
        if (s.outlineKind !== 'other') f.push(`${what}: the outline is a ${s.outlineKind} (a K child counts it too)`);
        if (!g.transform) { f.push(`${what}: no transform stamp`); continue; }
        const tt = TG.transformTiling(s.tans, g.transform);
        const placed = TG.placeTans(tt, S, { pad: PAD });
        if (g.tans.length !== s.tans.length || g.tanCount !== s.tans.length) f.push(`${what}: ${g.tans.length} tans drawn, the set has ${s.tans.length}`);
        for (const t of placed.tans) { const got = g.tans.find((x) => x.id === t.id); if (!got || !sameSet(got.pts, t.pts)) f.push(`${what}: ${t.id} ≠ the stored placement under ${g.transform} at S ${S}`); else { if (got.fill !== CREAM) f.push(`${what}: ${t.id} fill ${got.fill}`); if (Math.abs(got.sw - 2) > 0.01) f.push(`${what}: ${t.id} seam ${got.sw}`); } }
        const o = g.paths.filter((p) => p.kind === 'outline');
        if (o.length !== 1 || g.paths.length !== 1) f.push(`${what}: ${o.length} outline paths`);
        else { const loop = TG.silhouetteOf(tt.map(TG.placeUnit))[0].map(placed.toPx); if (!sameSet(o[0].pts, loop)) f.push(`${what}: outline ≠ the set's silhouette`); }
        // the tall-pose rule: the drawn height is the tallest of the poses that fit the 677 card zone
        { const inner = cardInner(cfg.rows, cfg.cols, cfg.bodyMin || 677, CARD_PADDING); const maxH = inner.h - CARD_STAGE_GAP - COUNT_ROW_H; const hs = TG.TRANSFORM_NAMES.map((t) => drawnSize(TG.transformTiling(s.tans, t), S, PAD)).filter((d) => d.w <= inner.w && d.h <= maxH).map((d) => d.h); if (hs.length && g.rect.height < Math.max(...hs) - 1) f.push(`${what}: drawn ${g.rect.height.toFixed(0)} tall in a flat pose; the tall pose is ${Math.max(...hs)} (sparse)`); }
        const row = snap.answerRows.find((r) => r.card === g.card);
        const card = snap.cards[g.card];
        if (!row) { f.push(`${what}: no answer row`); continue; }
        if (row.boxes.length !== 2) f.push(`${what}: ${row.boxes.length} answer boxes`);
        else {
          const tri = s.tans.filter((t) => 'LMS'.includes(TG.clsOf(t.id))).length, sq = s.tans.filter((t) => TG.clsOf(t.id) === 'Q').length;
          if (+row.boxes[0].answer !== tri) f.push(`${what}: box 1 stamps ${row.boxes[0].answer}, the set holds ${tri} triangles`);
          if (+row.boxes[1].answer !== sq) f.push(`${what}: box 2 stamps ${row.boxes[1].answer}, the set holds ${sq} square(s)`);
          row.boxes.forEach((b, j) => { if (b.text) f.push(`${what}: box ${j + 1} prints "${b.text}"`); if (b.rect.height < 44 - 0.6 || b.rect.width < 64 - 0.6) f.push(`${what}: box ${j + 1} ${b.rect.width.toFixed(0)} x ${b.rect.height.toFixed(0)} < 64 x 44`); if (card) inside(b.rect, card.inner, `${what} box ${j + 1}`); });
        }
        if (row.glyphs.join() !== 'triangle,square') f.push(`${what}: answer glyphs [${row.glyphs.join(' ')}]`);
        if (row.rect.top < g.rect.bottom + CARD_STAGE_GAP - 0.6) f.push(`${what}: the answer row rises into the figure`);
        if (row.rect.width > (card ? card.inner.right - card.inner.left : BODY_W) + 0.6) f.push(`${what}: the answer row is wider than the card`);
      }
      if (subs.length === cfg.items) {
        if (new Set(subs.map((s) => s.counts.triangles)).size < 3) f.push(`triangle counts [${subs.map((s) => s.counts.triangles).join(' ')}] take < 3 values`);
        if (!subs.some((s) => s.counts.squares === 0) || !subs.some((s) => s.counts.squares === 1)) f.push(`square counts [${subs.map((s) => s.counts.squares).join(' ')}] miss 0 or 1`);
        if (subs.filter((s) => s.tans.some((t) => t.id === 'P')).length < 2) f.push('P (the not-a-square decoy) on < 2 cards');
        if (!subs.some((s) => s.tans.some((t) => 'LMS'.includes(TG.clsOf(t.id)) && ((t.rot || 0) % 90) !== 0))) f.push('no card with a triangle on the diagonal (rot % 90 !== 0)');
      }
    } else f.push(`unknown face mode ${mode}`);
    return f;
  },
};
