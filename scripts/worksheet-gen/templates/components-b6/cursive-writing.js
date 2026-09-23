/**
 * components-b6/cursive-writing.js — the G2-377 `cursive-writing` components
 * (nt5-F; design docs/worksheet-gen/b6-designs/G2-377-cursive-writing.md §2).
 * Every export is prefixed `cw` (the b6 barrel refuses a duplicate name).
 *
 * THE RULE THAT LOCKS THE TYPE: every model / trace / ribbon string is ONE
 * HTML text node (never SVG <text>: of 176 strings rendered both ways the
 * critic measured 27 whose joins broke into extra ink islands in SVG, never in
 * HTML or canvas) in exactly ONE unit's font, shaping untouched (no
 * letter-spacing, no text-transform, no per-letter span, no feature override),
 * sized fs = X / xHeight(unit) from the MEASURED metric (primitives/
 * cursive-metrics.json) so the unit's x-height equals the ruling's x-band.
 *
 * Baseline placement: Chromium rounds the font's ascent and descent to whole
 * pixels for the line box and FLOORS the half-leading (measured 2026-09-23: a
 * ribbon span sized to the exact (lineAscent + lineDescent)·fs sat 0.9 px high,
 * a row span 0.4 px high). So the line box is set to the ROUNDED ascent +
 * descent (half-leading 0) and the span's top is yB − round(lineAscent·fs):
 * the baseline lands exactly on yB. (The design wrote line-height:normal, which
 * also adds the font's lineGap; the gate's raster measures every node ±1.2 px.)
 *
 * Exports (base page only; the face blocks cwCapitalBlock / cwJoinBlock /
 * cwWordBlock / cwReadMatch / cwCopyBlock / cwScriptTag are Phase E):
 *   cwFontFace(unit)                        ONE <style>@font-face</style> for the page's unit (file:// url)
 *   cwFamily(unit)                          'LCS Cursive <unit>'
 *   cwText({unit,text,fs,yB,left,role,…})   one absolutely positioned span = one text node
 *   cwChainRun({unit,texts,fs,yB,left,gap}) the grey chains of row A, one text node each, flex-laid
 *   cwRow({kind,unit,geom,w,marginX,…})     one ruled row (relative div + school ruling + its texts)
 *   cwRibbon({unit,letters,scriptName,…})   the cream family ribbon (letters in the unit + the script's name)
 *   cwBlock({…})                             one letter block: row A (model | margin | chains | open) + empty rows
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { esc } = require('../../primitives/_svg.js');
const { color } = require('../../primitives/_tokens.js');
const SR = require('../../primitives/school-ruling.js');

const FONTS_DIR = path.join(__dirname, '..', '..', 'assets', 'fonts');
const CURSIVE_CSS = fs.readFileSync(path.join(FONTS_DIR, 'cursive-fonts.css'), 'utf8');
const ROLE_COLOR = { model: color.ink, trace: color.grid, ribbon: color.ink };

const cwFamily = (unit) => `LCS Cursive ${unit}`;
const px = (v) => Math.round(v * 100) / 100;

/**
 * The page's ONE @font-face, lifted verbatim from assets/fonts/cursive-fonts.css (the single source of
 * the unit -> file mapping) with its relative url rewritten to an absolute file:// url exactly as
 * page/shell.js rewrites fonts.css. fonts.css itself is never touched: every other page stays
 * byte-identical (the release baseline). Throws on a unit the css does not declare.
 */
function cwFontFace(unit) {
  const re = new RegExp(`@font-face\\{font-family:'LCS Cursive ${unit.replace(/[-]/g, '\\-')}';[^}]*\\}`);
  const m = re.exec(CURSIVE_CSS);
  if (!m) throw new Error(`cursive-writing: assets/fonts/cursive-fonts.css declares no face for unit "${unit}"`);
  const rule = m[0].replace(/url\('([^']+\.woff2)'\)/g, (mm, f) =>
    "url('" + 'file:///' + path.join(FONTS_DIR, f).replace(/\\/g, '/').replace(/^\//, '') + "')");
  return `<style data-lcs-cursive-face="${esc(unit)}">${rule}</style>`;
}

/** the line box Chromium builds for this face at fsPx: rounded ascent, rounded descent */
function lineBox(unit, fsPx) {
  const m = SR.metricsFor(unit);
  const asc = Math.round(m.lineAscent * fsPx), desc = Math.round(m.lineDescent * fsPx);
  return { asc, desc, lh: asc + desc };
}

function textStyle(unit, fsPx, role) {
  const lh = lineBox(unit, fsPx).lh;
  return `font-family:'${cwFamily(unit)}';font-size:${px(fsPx)}px;line-height:${px(lh)}px;font-weight:400;font-style:normal;` +
    `color:${ROLE_COLOR[role]};white-space:nowrap;letter-spacing:0;word-spacing:0;text-transform:none`;
}

/** one span, one text node. `left` + optional `width` / `align` (the model cell centres its letter). */
function cwText({ unit, text, fs: fsPx, yB, left, width, align, role }) {
  if (!ROLE_COLOR[role]) throw new Error(`cursive-writing: unknown text role "${role}"`);
  if (typeof text !== 'string' || !text.length || /[<>&]/.test(text)) throw new Error(`cursive-writing: "${text}" is not a cursive literal`);
  const top = yB - lineBox(unit, fsPx).asc;
  const box = width != null ? `width:${px(width)}px;text-align:${align || 'center'};` : '';
  return `<span data-lcs-cursive="${esc(unit)}" data-lcs-role="${role}" data-lcs-fs="${px(fsPx)}" data-lcs-yb="${px(yB)}"` +
    ` style="position:absolute;left:${px(left)}px;top:${px(top)}px;${box}${textStyle(unit, fsPx, role)}">${esc(text)}</span>`;
}

/**
 * Row A's grey chains: a flex strip starting at `left`, one span (one text node) per chain, `gap` between.
 * The strip's top is yB − lineAscent·fs, so every chain shares the row baseline (align-items:flex-start +
 * equal line boxes). Widths are the font's; the gate measures that the strip ends inside the row.
 */
function cwChainRun({ unit, texts, fs: fsPx, yB, left, gap, role = 'trace' }) {
  const top = yB - lineBox(unit, fsPx).asc;
  const spans = texts.map((t) => {
    if (typeof t !== 'string' || !t.length || /[<>&\s]/.test(t)) throw new Error(`cursive-writing: chain "${t}" is not one joined literal`);
    return `<span data-lcs-cursive="${esc(unit)}" data-lcs-role="${role}" data-lcs-fs="${px(fsPx)}" data-lcs-yb="${px(yB)}" data-lcs-chain="${esc(t)}" style="${textStyle(unit, fsPx, role)}">${esc(t)}</span>`;
  }).join('');
  return `<div class="cw-chains" data-lcs-chains="${texts.length}" style="position:absolute;left:${px(left)}px;top:${px(top)}px;display:flex;align-items:flex-start;gap:${gap}px">${spans}</div>`;
}

/** one ruled row: the relative box, its school ruling (absolute svg) and whatever texts sit on it */
function cwRow({ kind, unit, geom, w, marginX, row, dashHelpers, inner = '', height, yB }) {
  const H = height != null ? height : geom.rowH;
  const baseline = yB != null ? yB : geom.yB;
  const svg = kind === 'seyes' ? '' : SR.schoolRuling({ kind, w, geom, marginX, dashHelpers });
  return `<div class="cw-row" data-lcs-row="${row}" data-lcs-yb="${px(baseline)}"${kind === 'seyes' ? '' : ` data-lcs-yx="${geom.yX}" data-lcs-ytop="${geom.yTop}" data-lcs-yd="${geom.yD}"`}` +
    ` style="position:relative;width:${w}px;height:${px(H)}px">${svg}${inner}</div>`;
}

/**
 * The cream family ribbon: the page's letters in the unit (one node each; no words to translate) and the
 * script's name at the right (Nunito 700 13 inkSoft, one literal per unit). Letter size: 0.9·fs, capped so
 * the unit's whole ascender-to-descender ink fits the 44 px ribbon with 4 px air (a looped l or g never
 * leaves the cream).
 */
function cwRibbon({ unit, letters, scriptName, fs: fsPx, w, h = 44 }) {
  const m = SR.metricsFor(unit);
  const rf = Math.min(0.9 * fsPx, (h - 8) / (m.ascender + m.descender));
  // baseline so the ascender..descender ink is centred in the ribbon
  const yB = (h - (m.ascender + m.descender) * rf) / 2 + m.ascender * rf;
  const top = yB - lineBox(unit, rf).asc;
  const spans = letters.map((l) => `<span data-lcs-cursive="${esc(unit)}" data-lcs-role="ribbon" data-lcs-fs="${px(rf)}" data-lcs-yb="${px(yB)}" style="${textStyle(unit, rf, 'ribbon')}">${esc(l)}</span>`).join('');
  return `<div class="cw-ribbon" data-lcs-ribbon="" style="position:relative;box-sizing:border-box;width:${w}px;height:${h}px;background:${color.cream};border:2px solid ${color.creamDeep};border-radius:14px">` +
    `<div style="position:absolute;left:16px;top:${px(top - 2)}px;display:flex;align-items:flex-start;gap:18px">${spans}</div>` +
    `<span data-lcs-script-name="" style="position:absolute;right:16px;top:0;height:${h - 4}px;display:flex;align-items:center;font-family:'Nunito';font-weight:700;font-size:13px;color:${color.inkSoft}">${esc(scriptName)}</span></div>`;
}

/**
 * A flexible gap between two flow items: `min` px in the §2 stack, growing up to `max` px when the chrome
 * leaves slack (SPARSE / FILL: a short title must not leave a band under the page). With `marginX` the gap
 * carries the coral margin rule on (rows of ONE block read as one cahier margin).
 */
function cwGap(min, max, marginX) {
  const rule = marginX != null ? `<div class="cw-gaprule" style="position:absolute;left:${px(marginX - 0.75)}px;top:0;width:1.5px;height:100%;background:${color.coral}"></div>` : '';
  return `<div data-lcs-gap="${min}" style="position:relative;flex:1 1 ${min}px;min-height:${min}px;max-height:${max}px">${rule}</div>`;
}

/**
 * One letter block (the base page). Row A: the ink model centred in the margin cell (0..marginX), the coral
 * margin rule, `chains` grey joined chains of three from marginX + 16, open ruling to the edge. Then
 * `writeRows` empty rows. Non-Seyès: the block is `display:contents`, so its rows and the growable gaps
 * between them are flow items of the page column (every row carries data-lcs-flow). A Seyès block is ONE
 * slice of the cahier (its rows ARE the writing lines, the skipped line included) and one flow item.
 */
function cwBlock({ unit, kind, letter, chains, writeRows, w, marginX, geom, seyes, dashHelpers, blockIndex, rowGap = [2, 14] }) {
  const chainTexts = Array.from({ length: chains }, () => letter.repeat(3));
  if (kind === 'seyes') {
    const g = seyes;   // seyesGeometry(): one svg for the slice, baselines[0] = row A
    const yA = g.baselines[0];
    const texts = cwText({ unit, text: letter, fs: g.fs, yB: yA, left: 0, width: marginX, align: 'center', role: 'model' }) +
      cwChainRun({ unit, texts: chainTexts, fs: g.fs, yB: yA, left: marginX + 16, gap: 26 });
    const svg = SR.schoolRuling({ kind, w, geom: g, marginX });
    return `<div class="cw-block" data-lcs-flow="" data-lcs-block="${blockIndex}" data-lcs-letter="${esc(letter)}" data-lcs-seyes="${g.i}" style="position:relative;flex:0 0 auto;width:${w}px;height:${g.height}px">` +
      svg + `<div class="cw-row" data-lcs-row="A" data-lcs-yb="${yA}" style="position:absolute;left:0;top:0;width:${w}px;height:${g.height}px">${texts}</div>` +
      g.baselines.slice(1).map((y, k) => `<div class="cw-row" data-lcs-row="${String.fromCharCode(66 + k)}" data-lcs-yb="${y}" data-lcs-empty="" style="position:absolute;left:0;top:0;width:${w}px;height:${g.height}px"></div>`).join('') +
      `</div>`;
  }
  const inner = cwText({ unit, text: letter, fs: geom.fs, yB: geom.yB, left: 0, width: marginX, align: 'center', role: 'model' }) +
    cwChainRun({ unit, texts: chainTexts, fs: geom.fs, yB: geom.yB, left: marginX + 16, gap: 26 });
  const rows = [flowRow(cwRow({ kind, unit, geom, w, marginX, row: 'A', dashHelpers, inner }))];
  for (let k = 0; k < writeRows; k++) {
    rows.push(cwGap(rowGap[0], rowGap[1], marginX));
    rows.push(flowRow(cwRow({ kind, unit, geom, w, marginX, row: String.fromCharCode(66 + k), dashHelpers }).replace('class="cw-row"', 'class="cw-row" data-lcs-empty=""')));
  }
  return `<div class="cw-block" data-lcs-block="${blockIndex}" data-lcs-letter="${esc(letter)}" style="display:contents">${rows.join('')}</div>`;
}
const flowRow = (html) => html.replace('class="cw-row"', 'class="cw-row" data-lcs-flow=""').replace('style="position:relative;', 'style="position:relative;flex:0 0 auto;');

/**
 * The closing practice lines: `k` more empty rows of the SAME ruling (Seyès: k one-writing-line slices of
 * 4 i, which tile the cahier), for the child's own joined writing of the lesson's letters. k is computed by
 * the spec from the measured 677 slack; the rows are honest writing space, never decoration.
 */
function cwPracticeRows({ unit, kind, k, w, marginX, geom, seyesI, dashHelpers, rowGap = [2, 14] }) {
  const out = [];
  for (let j = 0; j < k; j++) {
    if (j) out.push(cwGap(kind === 'seyes' ? 0 : rowGap[0], kind === 'seyes' ? 8 : rowGap[1], marginX));
    if (kind === 'seyes') {
      const i = seyesI;
      const g = { unit, kind: 'seyes', X: i, i, fs: 0, baselines: [Math.round(3 * i * 100) / 100], height: Math.round(4 * i * 100) / 100 };
      out.push(`<div class="cw-row" data-lcs-flow="" data-lcs-row="P${j + 1}" data-lcs-practice="" data-lcs-empty="" data-lcs-yb="${g.baselines[0]}" style="position:relative;flex:0 0 auto;width:${w}px;height:${g.height}px">${SR.schoolRuling({ kind: 'seyes', w, geom: g, marginX })}</div>`);
    } else {
      out.push(flowRow(cwRow({ kind, unit, geom, w, marginX, row: 'P' + (j + 1), dashHelpers }).replace('class="cw-row"', 'class="cw-row" data-lcs-practice="" data-lcs-empty=""')));
    }
  }
  return `<div class="cw-practice" data-lcs-practice-rows="${k}" style="display:contents">${out.join('')}</div>`;
}

// ─────────────────────────── the five faces (Phase E, design §3) ───────────────────────────

/** the face header: the script's name in a right-aligned cream pill (24 high + 8 gap = 32 of the stack) */
function cwScriptTag({ scriptName, w }) {
  return `<div class="cw-script-tag" data-lcs-script-tag="" style="flex:0 0 auto;display:flex;justify-content:flex-end;width:${w}px;height:24px;margin-bottom:8px">` +
    `<span data-lcs-script-name="" style="display:inline-flex;align-items:center;box-sizing:border-box;height:24px;padding:0 12px;border-radius:12px;background:${color.cream};border:1.5px solid ${color.creamDeep};font-family:'Nunito';font-weight:700;font-size:13px;color:${color.inkSoft}">${esc(scriptName)}</span></div>`;
}

/**
 * A run of cursive nodes on ONE baseline: [{ text, role, attrs? }] laid in a flex strip from `left`, `gap`
 * between; each node ONE text node (spaces allowed inside a node: a capital pair "M M", a sentence).
 */
function cwRun({ unit, items, fs: fsPx, yB, left, gap }) {
  const top = yB - lineBox(unit, fsPx).asc;
  const spans = items.map((it) => {
    if (!ROLE_COLOR[it.role]) throw new Error(`cursive-writing: unknown role "${it.role}"`);
    if (typeof it.text !== 'string' || !it.text.length || /[<>&]/.test(it.text)) throw new Error(`cursive-writing: "${it.text}" is not a cursive literal`);
    const extra = Object.entries(it.attrs || {}).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
    return `<span data-lcs-cursive="${esc(unit)}" data-lcs-role="${it.role}" data-lcs-fs="${px(fsPx)}" data-lcs-yb="${px(yB)}"${extra} style="${textStyle(unit, fsPx, it.role)}">${esc(it.text)}</span>`;
  }).join('');
  return `<div class="cw-chains" data-lcs-chains="${items.length}" style="position:absolute;left:${px(left)}px;top:${px(top)}px;display:flex;align-items:flex-start;gap:${gap}px">${spans}</div>`;
}

/** a cream picture tile (72 × 72, icon 64) for F3: a library picture, stamped with its pinned key */
function cwPictureTile({ src, key, size = 72, icon = 64, top = null }) {
  return `<div class="cw-pic" data-lcs-pic="${esc(key)}" style="position:absolute;left:0;top:${top == null ? '50%' : px(top) + 'px'};${top == null ? 'transform:translateY(-50%);' : ''}box-sizing:border-box;width:${size}px;height:${size}px;background:${color.cream};border:2px solid ${color.creamDeep};border-radius:10px;display:flex;align-items:center;justify-content:center">` +
    `<img src="${esc(src)}" alt="" style="width:${icon}px;height:${icon}px;object-fit:contain"></div>`;
}

/** F5's printed source line: Nunito 800 18 ink on a tealSoft strip 36 high (the one place Nunito prints a word) */
function cwSentenceStrip({ text, w, marginX }) {
  return `<div class="cw-strip" data-lcs-print="${esc(text)}" style="box-sizing:border-box;width:${w}px;height:36px;background:${color.tealSoft};border-radius:10px;display:flex;align-items:center;padding-left:${marginX + 16}px;font-family:'Nunito';font-weight:800;font-size:18px;color:${color.ink};white-space:nowrap"><span>${esc(text)}</span></div>`;
}

/**
 * One face block: an optional head (F5's printed strip + 6 px), row A carrying `rowAInner(fs, yB)`, then
 * `writeRows` rows 2 px apart (row B may carry `rowBInner`); an optional `overlay` (F3's picture tile,
 * left of the margin rule, spanning the rows). Non-Seyès: geom = rulingGeometry(); Seyès: seyes =
 * seyesGeometry() (one slice). The block is ONE flow item (data-lcs-flow) of the page column.
 */
function cwFaceBlock({ unit, kind, geom, seyes, w, marginX, writeRows, rowAInner, rowBInner, head, overlay, dashHelpers, blockIndex, attrs, rowGap = [2, 20], headGap = [6, 16] }) {
  const a = Object.entries(attrs || {}).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
  const leaf = (html) => html.replace(/^<div /, '<div data-lcs-leaf="" ');
  if (kind === 'seyes') {
    const g = seyes;
    const svg = SR.schoolRuling({ kind, w, geom: g, marginX });
    const rows = g.baselines.map((y, k) => {
      const inner = k === 0 ? rowAInner(g.fs, y) : (k === 1 && rowBInner ? rowBInner(g.fs, y) : '');
      return `<div class="cw-row" data-lcs-row="${String.fromCharCode(65 + k)}" data-lcs-yb="${y}"${inner ? '' : ' data-lcs-empty=""'} style="position:absolute;left:0;top:0;width:${w}px;height:${g.height}px">${inner}</div>`;
    }).join('');
    const headHtml = head ? leaf(head) + '<div data-lcs-gap="6" style="height:6px"></div>' : '';
    return `<div class="cw-block" data-lcs-flow="" data-lcs-block="${blockIndex}"${a} style="flex:0 0 auto;width:${w}px">${headHtml}` +
      `<div data-lcs-leaf="" style="position:relative;width:${w}px;height:${g.height}px">${svg}${rows}${overlay || ''}</div></div>`;
  }
  // a growable block: its inner gaps (strip -> row, row -> row) stretch with the page, each capped, so a
  // short chrome never leaves a band; the block's max-height is its minimum + the gaps' growth
  const parts = [];
  let minH = 0, grow = 0;
  if (head) { parts.push(leaf(head).replace('style="', 'style="flex:0 0 auto;')); parts.push(cwGap(headGap[0], headGap[1])); minH += 36 + headGap[0]; grow += headGap[1] - headGap[0]; }
  parts.push(leaf(cwRow({ kind, unit, geom, w, marginX, row: 'A', dashHelpers, inner: rowAInner(geom.fs, geom.yB) })).replace('style="position:relative;', 'style="position:relative;flex:0 0 auto;'));
  minH += geom.rowH;
  for (let k = 0; k < writeRows; k++) {
    parts.push(cwGap(rowGap[0], rowGap[1], marginX));
    const inner = k === 0 && rowBInner ? rowBInner(geom.fs, geom.yB) : '';
    parts.push(leaf(cwRow({ kind, unit, geom, w, marginX, row: String.fromCharCode(66 + k), dashHelpers, inner })).replace('class="cw-row"', inner ? 'class="cw-row"' : 'class="cw-row" data-lcs-empty=""').replace('style="position:relative;', 'style="position:relative;flex:0 0 auto;'));
    minH += rowGap[0] + geom.rowH; grow += rowGap[1] - rowGap[0];
  }
  return `<div class="cw-block" data-lcs-flow="" data-lcs-block="${blockIndex}"${a} style="position:relative;flex:1 1 auto;display:flex;flex-direction:column;width:${w}px;min-height:${px(minH)}px;max-height:${px(minH + grow)}px">${parts.join('')}${overlay || ''}</div>`;
}

/**
 * F4: reading the joined hand. `.ws-match` two columns: white word cards (one cursive node each, ink) and
 * cream picture tiles, coral match dots. The rows grow together (flex 1 1 minH, capped at maxH) so the
 * page fills its body at every chrome; both columns carry the same count, so row k faces row k.
 */
function cwReadMatch({ unit, fs: fsPx, words, pics, cardW = 300, minH, maxH, tileW = 88, icon = 72, gap = 12 }) {
  const m = SR.metricsFor(unit);
  const lb = lineBox(unit, fsPx);
  const inkH = (m.ascender + m.descender) * fsPx;
  const itemStyle = (wpx) => `width:${wpx}px;flex:1 1 ${minH}px;min-height:${minH}px;max-height:${maxH}px;box-sizing:border-box`;
  const left = words.map((wd, i) => {
    // the word's ink (ascender..descender) is centred in the card: a baseline stamped relative to the card
    const node = `<span data-lcs-cursive="${esc(unit)}" data-lcs-role="model" data-lcs-fs="${px(fsPx)}" data-lcs-word-node="${esc(wd.key)}" style="position:absolute;left:50%;top:calc(50% - ${px(inkH / 2 + (lb.asc - m.ascender * fsPx))}px);transform:translateX(-50%);${textStyle(unit, fsPx, 'model')}">${esc(wd.text)}</span>`;
    return `<div class="ws-match-item ws-match-item--plain cw-row cw-card" data-lcs-word="${esc(wd.key)}" data-lcs-row-index="${i}" data-lcs-card-yb="${px(m.ascender * fsPx - inkH / 2)}" style="${itemStyle(cardW)};position:relative">${node}<span class="ws-match-dot ws-match-dot--right"></span></div>`;
  }).join('');
  const right = pics.map((p, i) => `<div class="ws-match-item" data-lcs-pic="${esc(p.key)}" data-lcs-row-index="${i}" style="${itemStyle(tileW)}"><img src="${esc(p.src)}" alt="" style="width:${icon}px;height:${icon}px;object-fit:contain"><span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
  const col = (html) => `<div class="ws-match-col" style="justify-content:flex-start;gap:${gap}px">${html}</div>`;
  return `<div class="ws-match cw-read" data-lcs-flow="" style="flex:1 1 auto;padding:0 30px;justify-content:space-between;align-items:stretch">${col(left)}${col(right)}</div>`;
}

module.exports = { cwLineBox: lineBox, cwFontFace, cwFamily, cwText, cwChainRun, cwRow, cwRibbon, cwBlock, cwGap, cwPracticeRows, cwScriptTag, cwRun, cwPictureTile, cwSentenceStrip, cwFaceBlock, cwReadMatch };
