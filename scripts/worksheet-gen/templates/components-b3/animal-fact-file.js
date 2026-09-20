/**
 * components-b3/animal-fact-file.js — the G2-318 `animal-fact-file` family
 * components (design: docs/worksheet-gen/b3-designs/G2-318-animal-fact-file.md
 * §2). Merged into the templates/components-b3.js namespace; HTML + inline
 * SVG on the token palette, scoped inline CSS, no page.css edit. Nothing here
 * prints a fact: every fact row is a LABELLED EMPTY school-line lane; ground
 * truth rides on `data-lcs-fact-<field>` row stamps (answer key only) that
 * the gate re-derives in node from data/b3/animal-facts.json.
 *
 * Base-page exports (Phase 1; the four NEW names the design file lists that
 * the base consumes — choiceRow / miniFactFile / sameDiffGrid / riddleCard
 * are added when their faces are built, never ahead of their spec):
 *
 *   heroFrame({ src|null, size = 244, pic = 220, noun, unit, drawKey = 'hero', stretch = false })
 *     The framed hero picture: white, teal 3, radius 16 (`stretch` lets the
 *     frame fill a taller row — d3's special block — keeping `size` as the
 *     minimum; the picture stays `pic` and centred); the `.ws-icon` sits
 *     `pic` px square, centred (the 12 px inset the design quotes is measured
 *     from the frame EDGE, so the padding inside the 3 px border is 9).
 *     `<img class="ws-icon" data-lcs-hero data-lcs-noun data-lcs-unit>`.
 *     `src:null` (the wave-pinnable `blank` unit) → the frame holds a dashed
 *     coral drawing zone instead (`data-lcs-drawbox="hero"`), no <img>.
 *
 *   nameBanner({ name|null, w = 417, h = 76, fontPx = 34, eyebrow, laneW = 357,
 *                glyphH = 28, minPx = 30, longAt = 15 })
 *     tealSoft, radius 14, padding 0 16: a coral paw glyph 28 (SVG,
 *     aria-hidden) + the animal name Baloo 2 700 `fontPx` teal, stamped
 *     `data-lcs-name` (the vocab singular as stored, initial capital). A name
 *     of >= `longAt` letters drops to `minPx` (never smaller — the design's
 *     `Hippopotamus` rule). `name:null` → an eyebrow (Nunito 800 16 inkSoft,
 *     `data-lcs-eyebrow`) + an EMPTY `writingRow` `laneW` × 56 (`data-lcs-name`
 *     on the lane, glyphH 28) for the `blank` unit.
 *
 *   factTable({ rows, w = 675, rowMin = 60, glyphH = 28, labelW = 160, labelPx = 17,
 *               laneH = 56, lanePad = 8 })
 *     The framed six-row fact table: white, teal 2, radius 14, overflow hidden;
 *     a grid `<labelW>px 1fr` with `grid-auto-rows:minmax(<rowMin>px,1fr)` so the
 *     chrome slack opens in the rows; 1.5 px `grid`-colour rules between rows
 *     and between the two columns. Label cell: tealSoft, padding 0 8 (inner
 *     labelW - 16), Nunito 800 labelPx ink, `white-space:normal`, line-height
 *     labelPx + 6 (the gate asserts <= 2 measured lines and no clip),
 *     `data-lcs-label`. Lane cell: padding `lanePad`, holds ONE component by
 *     `row.lane`:
 *        'write'   (base)  → an EMPTY writingRow (w - 4 - labelW - 2·lanePad) × laneH,
 *                            glyphH, xHeight rules, `data-lcs-lane`
 *        'choice'  (F2)    → row.html verbatim (a choiceRow; Phase 2)
 *        'printed' (F4/F5) → row.value as Nunito 800 16 text (Phase 2)
 *     Row stamps: `data-lcs-row`, `data-lcs-field="<key>"`, and — ONLY when
 *     `row.fact !== null && row.fact !== undefined` — `data-lcs-fact-<key>="<fact>"`
 *     (the answer key; never text). Root stamps `data-lcs-table
 *     data-lcs-rows="<n>" data-lcs-fields="<k1,k2,…>"`.
 *
 *   factLane({ starter|null, caption|null, w = 675, h = 60, glyphH = 28, starterPx = 20 })
 *     The fact-sentence lane: `.ws-lane` with the inline `padding:6px 16px`
 *     (inner w - 36 × h - 16: 639 × 44 at the design size — the README's
 *     `.ws-lane` rule: the 2 px border is part of the box). `[starter Nunito
 *     700 starterPx inkSoft, data-lcs-starter][10][writingRow rest × h-16]`;
 *     with `caption` instead of a starter the caption prints (Nunito 800 16
 *     inkSoft, `data-lcs-caption`) — the "no `def` literal" fallback, never a
 *     bare vocab word. Root `data-lcs-factlane`.
 *
 * Face exports (Phase 2, 2026-09-14 — design §3; every one ADDITIVE, the base
 * output byte-identical, tools/b3-baseline.js is the proof):
 *
 *   factTable rows gained `r.attrs` (extra row attributes, e.g. F2's
 *     `data-lcs-correct="<i>"`; absent on base rows → '' → byte-identical).
 *
 *   choiceRow({ options:[{key,label}], pillPx = 16, h = 40, gap = 8, padX = 20 })
 *     F2's lane: N `.ws-pill` chips (Baloo 2 700 pillPx, padding 4 padX,
 *     height h, gap) — `data-lcs-opt="<key>"` on each chip, NO glyph, NO
 *     tint: the chips are styled identically, the truth rides on the ROW's
 *     `data-lcs-correct` index (answer key, never a mark).
 *
 *   factBank({ words:[{word, field}], w, h, wordPx = 17 })
 *     F3's word bank in the draw-box slot: the `.ws-scene-banner ws-bank`
 *     look of components-b2 wordBank (same page.css classes, no icons),
 *     `data-lcs-bank-word` + `data-lcs-bank-field` per word, the slot
 *     `data-lcs-bankslot` w × h (the gate measures scrollHeight ≤ h).
 *
 *   miniFactFile({ rows:[{key,label,value,fact}], w, rowH = 20, labelW = 160,
 *                  labelPx = 14, valuePx = 16, border = 2 })
 *     A PRINTED fact table (F4's source, F5's two files): grid labelW 1fr,
 *     rows rowH, label Nunito 800 labelPx inkSoft on tealSoft, value Nunito
 *     800 valuePx ink, `data-lcs-mini-row data-lcs-field data-lcs-value`
 *     (+ `data-lcs-fact-<key>` — the same answer-key stamp as the table).
 *
 *   sameDiffGrid({ cells:[{key,label,same}], sameLabel, diffLabel, w = 675,
 *                  cols = 2, cellH = 48, gap = 8, pillPx = 16 })
 *     F5's circle-same-or-different grid: per field a `.ws-lane` cell
 *     [label 14][chips same | different, fixed order, no glyph],
 *     `data-lcs-same="1|0"` on the cell (answer key), `data-lcs-sd="same|diff"`
 *     on the chips.
 *
 *   riddleCard({ n, clues:[{text, field, value}], answer, prompt, nameLabel,
 *                cluesW = 300, laneW = 165, drawW = 146, drawH = 140, minH = 180,
 *                glyphH = 26, cluePx = 16 })
 *     F6's card: a `.ws-lane` [prompt + clues cluesW][16][name lane:
 *     nameLabel + writingRow laneW × 56][16][drawBox drawW × drawH]; each
 *     clue line `data-lcs-clue="<field>=<value>"` (answer key); the card
 *     `data-lcs-riddle="<n>" data-lcs-answer="<key>"`. No picture on a card.
 *
 * The drawing box the base sets under the banner is G1-308's `drawBox`
 * (./read-and-do.js) REQUIRED through the namespace and wrapped by the spec
 * with its label — not redefined here (the namespace refuses a duplicate).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { writingRow, textLaneGeometry, LM } = require('../../primitives/trace-path.js');
const { starterFontPx } = require('../components-b2.js');

const T = tokens.color;
const F = tokens.font;

/* --------------------------------------------------------------- paw glyph */
function pawGlyph(size = 28) {
  // four toe pads + a heel pad, coral, no stroke — reads at 28 px and in mono
  const pad = (cx, cy, rx, ry) => el('ellipse', { cx, cy, rx, ry, fill: T.coral });
  return svgRoot({ width: size, height: size, viewBox: '0 0 28 28', label: '' }, [
    pad(6.5, 10, 3, 3.6), pad(12, 5.5, 3, 3.6), pad(18.5, 6.5, 3, 3.6), pad(23.5, 12, 2.8, 3.4),
    el('path', { d: 'M14 12.5c-4.6 0-8.4 3.4-8.4 7.4 0 2.6 1.6 4.6 4.1 4.6 1.6 0 2.7-.8 4.3-.8s2.7.8 4.3.8c2.5 0 4.1-2 4.1-4.6 0-4-3.8-7.4-8.4-7.4z', fill: T.coral }),
  ], { 'aria-hidden': 'true', 'data-lcs-paw': '1', style: 'flex:0 0 auto' });
}

/* -------------------------------------------------------------- hero frame */
function heroFrame({ src = null, size = 244, pic = 220, noun = '', unit = '', drawKey = 'hero', border = 3, stretch = false }) {
  const inset = Math.max(0, Math.round((size - pic) / 2) - border);
  const height = stretch ? `min-height:${size}px;align-self:stretch` : `height:${size}px`;
  const inner = src
    ? `<img class="ws-icon" data-lcs-hero data-lcs-noun="${esc(noun)}" data-lcs-unit="${esc(unit)}" src="${esc(src)}" width="${pic}" height="${pic}" alt="" style="width:${pic}px;height:${pic}px;display:block">`
    : `<span data-lcs-drawbox="${esc(drawKey)}" style="display:block;width:${pic}px;height:${pic}px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:12px"></span>`;
  return `<div data-lcs-hero-frame data-lcs-pic="${pic}" data-lcs-stretch="${stretch ? 1 : 0}" style="width:${size}px;${height};flex:0 0 ${size}px;padding:${inset}px;` +
    `background:${T.white};border:${border}px solid ${T.teal};border-radius:16px;display:flex;align-items:center;justify-content:center;min-width:0">${inner}</div>`;
}

/* ------------------------------------------------------------- name banner */
function nameBanner({ name = null, w = 417, h = 76, fontPx = 34, eyebrow = null, laneW = 357, glyphH = 28, minPx = 30, longAt = 15, eyebrowPx = 16 }) {
  let body;
  if (name != null) {
    const px = [...String(name)].length >= longAt ? minPx : fontPx;
    body = `<span data-lcs-name data-lcs-name-px="${px}" style="font-family:${F.display},cursive;font-weight:700;font-size:${px}px;line-height:1.1;color:${T.teal};` +
      `white-space:nowrap;min-width:0;overflow:hidden;text-overflow:clip">${esc(name)}</span>`;
  } else {
    const laneH = 56;
    // the lane fills what the eyebrow leaves (its width is a font measurement
    // node cannot make): full-width rules, no viewBox scaling — see fullWidthRow
    body = `<span data-lcs-eyebrow style="font-family:${F.body},sans-serif;font-weight:800;font-size:${eyebrowPx}px;line-height:${eyebrowPx + 4}px;color:${T.inkSoft};white-space:nowrap;flex:0 0 auto">${esc(eyebrow || '')}</span>` +
      `<span data-lcs-name data-lcs-lane-w="${laneW}" style="display:inline-flex;flex:1 1 auto;min-width:0;height:${laneH}px">${fullWidthRow({ w: laneW, h: laneH, glyphH })}</span>`;
  }
  return `<div data-lcs-banner style="display:flex;align-items:center;gap:12px;width:${w}px;height:${h}px;padding:0 16px;` +
    `background:${T.tealSoft};border-radius:14px;min-width:0">${pawGlyph(28)}${body}</div>`;
}

/* -------------------------------------------------------------- fact table */
function factTable({ rows, w = 675, rowMin = 60, glyphH = 28, labelW = 160, labelPx = 17, laneH = 56, lanePad = 8, border = 2 }) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('factTable: no rows');
  const laneW = w - 2 * border - labelW - 2 * lanePad;
  const rule = `1.5px solid ${T.grid}`;
  const cells = rows.map((r, i) => {
    const top = i ? `border-top:${rule};` : '';
    const factAttr = (r.fact !== null && r.fact !== undefined) ? ` data-lcs-fact-${esc(r.key)}="${esc(String(r.fact))}"` : '';
    let lane;
    if (r.lane === 'choice') lane = r.html || '';
    else if (r.lane === 'printed') lane = `<span data-lcs-printed style="font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:20px;color:${T.ink}">${esc(r.value == null ? '' : r.value)}</span>`;
    else lane = `<span data-lcs-lane="${esc(r.key)}" style="display:inline-flex;width:${laneW}px;height:${laneH}px">${writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg}</span>`;
    const extra = r.attrs ? ' ' + r.attrs : '';
    return `<div data-lcs-row data-lcs-field="${esc(r.key)}"${factAttr}${extra} style="display:contents">` +
      `<div data-lcs-label="${esc(r.key)}" style="${top}border-right:${rule};background:${T.tealSoft};padding:0 8px;display:flex;align-items:center;min-width:0;min-height:0">` +
      `<span data-lcs-label-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:${labelPx}px;line-height:${labelPx + 6}px;color:${T.ink};white-space:normal;overflow-wrap:normal;word-break:normal">${esc(r.label)}</span></div>` +
      `<div data-lcs-lane-cell style="${top}padding:${lanePad}px;display:flex;align-items:center;min-width:0;min-height:0">${lane}</div></div>`;
  });
  return `<div data-lcs-table data-lcs-rows="${rows.length}" data-lcs-fields="${esc(rows.map((r) => r.key).join(','))}" data-lcs-row-min="${rowMin}" data-lcs-lane-w="${laneW}" ` +
    `style="width:${w}px;flex:1 1 auto;display:grid;grid-template-columns:${labelW}px 1fr;grid-auto-rows:minmax(${rowMin}px,1fr);` +
    `background:${T.white};border:${border}px solid ${T.teal};border-radius:14px;overflow:hidden;min-height:0">${cells.join('')}</div>`;
}

/* --------------------------------------------------------------- fact lane */
function factLane({ starter = null, caption = null, w = 675, h = 60, glyphH = 28, captionPx = 16 }) {
  const innerH = h - 16;
  // The starter is a model ON the frame (the child continues it on the same
  // rules), so it takes the frame's own size — its x-height IS the row's x
  // band (components-b2 starterFontPx, measured Nunito) — and its baseline
  // is registered on the row's baseline rule: the row items align by
  // BASELINE, and the writing-row svg's box ends at its baseline (its flex
  // baseline is its bottom edge; nothing is drawn below yBase, overflow
  // visible keeps the rule's lower half). The fixed 20 px flex-centred span
  // it replaces put the cap on the dashed midline (2026-09-20 report).
  const f = starterFontPx({ h: innerH, glyphH });
  const head = starter != null
    ? `<span data-lcs-starter data-lcs-starter-px="${f.px}" style="font-family:${F.body},sans-serif;font-weight:700;font-size:${f.px}px;line-height:1;color:${T.inkSoft};white-space:nowrap;flex:0 0 auto">${esc(starter)}</span>`
    : `<span data-lcs-caption style="font-family:${F.body},sans-serif;font-weight:800;font-size:${captionPx}px;line-height:${captionPx + 4}px;color:${T.inkSoft};white-space:nowrap;flex:0 0 auto">${esc(caption || '')}</span>`;
  const align = starter != null ? 'baseline' : 'center';
  const row = starter != null
    ? fullWidthRow({ w: w - 36, h: innerH, glyphH }).replace('<svg ', `<svg style="height:${f.yBase.toFixed(2)}px;overflow:visible;display:block" `)
    : fullWidthRow({ w: w - 36, h: innerH, glyphH });
  // The lane fills what the starter leaves (a starter's width is a font
  // measurement node cannot make) — fullWidthRow; the gate measures the
  // rendered lane width against the lane inner width.
  return `<div class="ws-lane" data-lcs-factlane style="padding:6px 16px;width:${w}px;height:${h}px;display:flex;align-items:${align};gap:10px;min-width:0">` +
    head + `<span data-lcs-lane="sentence" style="display:inline-flex;flex:1 1 auto;min-width:0;height:${innerH}px">${row}</span></div>`;
}

/**
 * A writingRow whose three rules run x=0 → 100% of whatever width the flex
 * layout gives the lane, with NO viewBox (so nothing scales: the rule
 * geometry, stroke and dash pattern stay identical to the fixed table lanes).
 * `w` is only the nominal width the primitive is asked for.
 */
function fullWidthRow({ w, h, glyphH }) {
  const svg = writingRow({ w, h, glyphH, xHeight: true }).svg
    .replace(/ viewBox="[^"]*"/, '')
    .replace(` width="${w}" `, ' width="100%" ')
    .replace(new RegExp(` x2="${w}"`, 'g'), ' x2="100%"');
  if (!/width="100%"/.test(svg) || (svg.match(/x2="100%"/g) || []).length !== 3) throw new Error('fullWidthRow: the writing row did not take the full-width rule form');
  return svg;
}

/* -------------------------------------------------------- F2: choice row */
function choiceRow({ options, pillPx = 16, h = 40, gap = 8, padX = 20 }) {
  if (!Array.isArray(options) || options.length < 2) throw new Error('choiceRow: needs >= 2 options');
  const chips = options.map((o) =>
    `<span class="ws-pill" data-lcs-opt="${esc(o.key)}" style="height:${h}px;padding:4px ${padX}px;font-size:${pillPx}px;line-height:1;white-space:nowrap;flex:0 0 auto">${esc(o.label)}</span>`).join('');
  return `<span data-lcs-choicerow data-lcs-n="${options.length}" style="display:inline-flex;gap:${gap}px;align-items:center;min-width:0">${chips}</span>`;
}

/* -------------------------------------------------------- F3: fact bank */
function factBank({ words, w, h, wordPx = 17 }) {
  if (!Array.isArray(words) || !words.length) throw new Error('factBank: no words');
  const items = words.map((wd) =>
    `<span class="ws-bankword" style="font-size:${wordPx}px;line-height:1.2" data-lcs-bank-word="${esc(wd.word)}" data-lcs-bank-field="${esc(wd.field)}"><span>${esc(wd.word)}</span></span>`).join('');
  return `<div data-lcs-bankslot data-lcs-bank-n="${words.length}" style="width:${w}px;height:${h}px;flex:0 0 ${h}px;display:flex;flex-direction:column;justify-content:center;min-width:0">` +
    `<div class="ws-scene-banner ws-bank" data-lcs-bank-banner style="margin:0">${items}</div></div>`;
}

/* --------------------------------------------------- F4/F5: printed file */
function miniFactFile({ rows, w, rowH = 20, labelW = 160, labelPx = 14, valuePx = 16, border = 2 }) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('miniFactFile: no rows');
  const rule = `1px solid ${T.grid}`;
  const labLine = Math.min(labelPx + 4, rowH - 2), valLine = Math.min(valuePx + 4, rowH - 2);   // the 1-px rule sits inside rowH
  const cells = rows.map((r, i) => {
    const top = i ? `border-top:${rule};` : '';
    const factAttr = (r.fact !== null && r.fact !== undefined) ? ` data-lcs-fact-${esc(r.key)}="${esc(String(r.fact))}"` : '';
    return `<div data-lcs-mini-row data-lcs-field="${esc(r.key)}" data-lcs-value="${esc(r.value)}"${factAttr} style="display:contents">` +
      `<div data-lcs-mini-label style="${top}background:${T.tealSoft};padding:0 8px;display:flex;align-items:center;min-width:0;min-height:0"><span data-lcs-label-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:${labelPx}px;line-height:${labLine}px;color:${T.inkSoft};white-space:nowrap">${esc(r.label)}</span></div>` +
      `<div data-lcs-mini-value style="${top}padding:0 10px;display:flex;align-items:center;min-width:0;min-height:0"><span data-lcs-printed style="font-family:${F.body},sans-serif;font-weight:800;font-size:${valuePx}px;line-height:${valLine}px;color:${T.ink};white-space:nowrap">${esc(r.value)}</span></div></div>`;
  });
  return `<div data-lcs-mini data-lcs-rows="${rows.length}" style="width:${w}px;display:grid;grid-template-columns:${labelW}px 1fr;grid-auto-rows:${rowH}px;` +
    `background:${T.white};border:${border}px solid ${T.teal};border-radius:12px;overflow:hidden;min-height:0">${cells.join('')}</div>`;
}

/* ---------------------------------------------------- F5: same / different */
function sameDiffGrid({ cells, sameLabel, diffLabel, w = 675, cols = 2, cellH = 48, gap = 8, pillPx = 16 }) {
  if (!Array.isArray(cells) || !cells.length) throw new Error('sameDiffGrid: no cells');
  const chip = (k, text) => `<span class="ws-pill" data-lcs-sd="${k}" style="height:32px;padding:4px 12px;font-size:${pillPx}px;line-height:1;white-space:nowrap;flex:0 0 auto">${esc(text)}</span>`;
  const items = cells.map((c) =>
    `<div class="ws-lane" data-lcs-sdcell data-lcs-field="${esc(c.key)}" data-lcs-same="${c.same ? 1 : 0}" style="padding:4px 10px;height:${cellH}px;display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0">` +
      `<span data-lcs-label-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:14px;line-height:18px;color:${T.ink};min-width:0">${esc(c.label)}</span>` +
      `<span data-lcs-sdchips style="display:inline-flex;gap:8px;align-items:center;flex:0 0 auto">${chip('same', sameLabel)}${chip('diff', diffLabel)}</span></div>`).join('');
  return `<div data-lcs-sdgrid data-lcs-n="${cells.length}" style="width:${w}px;display:grid;grid-template-columns:repeat(${cols},1fr);gap:${gap}px;flex:0 0 auto">${items}</div>`;
}

/* ---------------------------------------------------------- F6: riddle card */
function riddleCard({ n, clues, answer, prompt, nameLabel, cluesW = 300, laneW = 165, drawW = 146, drawH = 140, minH = 180, glyphH = 26, cluePx = 16 }) {
  if (!Array.isArray(clues) || clues.length < 3) throw new Error('riddleCard: needs >= 3 clues');
  const lines = clues.map((c) =>
    `<span data-lcs-clue="${esc(c.field)}=${esc(String(c.value))}" style="display:block;font-family:${F.body},sans-serif;font-weight:800;font-size:${cluePx}px;line-height:1.35;color:${T.ink}">${esc(c.text)}</span>`).join('');
  const laneH = 56;
  return `<div class="ws-lane" data-lcs-riddle="${n}" data-lcs-answer="${esc(answer)}" data-lcs-clues="${clues.length}" style="padding:10px 16px;width:675px;min-height:${minH}px;flex:1 1 ${minH}px;display:flex;align-items:center;gap:16px;min-width:0">` +
    `<div data-lcs-cluebox style="width:${cluesW}px;flex:0 0 ${cluesW}px;display:flex;flex-direction:column;gap:2px;min-width:0">` +
      `<span data-lcs-prompt style="font-family:${F.display},cursive;font-weight:700;font-size:18px;line-height:22px;color:${T.teal};margin-bottom:2px">${esc(prompt)}</span>${lines}</div>` +
    `<div data-lcs-namelane style="width:${laneW}px;flex:0 0 ${laneW}px;display:flex;flex-direction:column;gap:2px;min-width:0">` +
      `<span data-lcs-eyebrow style="font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:20px;color:${T.inkSoft};white-space:nowrap">${esc(nameLabel)}</span>` +
      `<span data-lcs-lane="name" style="display:inline-flex;width:${laneW}px;height:${laneH}px">${writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg}</span></div>` +
    `<span data-lcs-drawbox="riddle" style="display:block;width:${drawW}px;height:${drawH}px;flex:0 0 ${drawW}px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:12px"></span></div>`;
}

module.exports = { heroFrame, nameBanner, factTable, factLane, choiceRow, factBank, miniFactFile, sameDiffGrid, riddleCard };
