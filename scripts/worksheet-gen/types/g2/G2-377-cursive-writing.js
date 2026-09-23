/**
 * G2-377 — Cursive Letters (nt5-F; family key `cursive-writing`, G2, letters /
 * handwriting, NO CCSS — CCSS 2010 omits cursive). Design:
 * docs/worksheet-gen/b6-designs/G2-377-cursive-writing.md §2 / §5; rulings
 * _work/G2-377-critic.md; build record _work/G2-377-build.md.
 *
 * "Copybook rows": a cream family ribbon (the page's letters in the unit + the
 * script's name), then one block per letter of the unit's lesson 0: row A = the
 * ink model letter in the margin cell | the coral margin rule | grey joined
 * chains of three ("uuu", each chain ONE text node) | open ruling to the edge;
 * then `writeRows` empty rows of the same ruling. The child traces the chains,
 * then writes the letter joined on her own for the rest of row A and the rows
 * below. Everything the child writes on sits on the LOCALE's school ruling
 * (primitives/school-ruling.js: us3 / lin4 / doble / seyes — DATA in the bank),
 * placed on the MEASURED ink of the page's ONE Playwrite unit
 * (primitives/cursive-metrics.json, tools/measure-cursive-metrics.js).
 *
 * THE RULE THAT LOCKS THE TYPE (§1): every model / trace string is ONE HTML
 * text node (never SVG <text>) in exactly one unit's font, shaping untouched,
 * letter-spacing 0, no text-transform, no per-letter span; fs = X / xHeight so
 * the unit's x-height equals the x-band; a page never mixes two units.
 *
 * unitAxis = the SCRIPT (the ONE fan knob): units(loc) / exemplar(loc) from the
 * bank. build() uses `unit || exemplar`; a unit outside the locale's units
 * THROWS. sv + fi: the whole type is REFUSED (no block -> bank() throws).
 * THEME OFF (themeAxis non-applicable; landings carry theme:''). The base has
 * no randomness: the page is lessons[unit][0] in bank order.
 *
 * Ladder (guards key on the RESOLVED config, never on the level index):
 *   d1 {mode:'base', letters:'all', chains:2, writeRows:[1],   xDelta:[+2, 0]}  (design: first ≤ 3 letters — deviated: the
 *      printed title names the whole lesson, so a 3-letter page contradicted its own title; build report)
 *   d2 {mode:'base', letters:'all', chains:2, writeRows:[2,1], xDelta: 0}  (ships; 2 rows where they fit 677)
 *   d3 {mode:'base', letters:'all', chains:1, writeRows:[2,1], xDelta: 0}
 * Capacity (validator rule 3 / §2): stack = 56 + N·((1+w)·rowH + 2w) + 10(N−1)
 * ≤ 677 (Seyès: 56 + (4(2+w)(N−1) + 5 + 4w)·i); a lesson that does not fit at
 * the level's floor X THROWS — the page never truncates a lesson silently.
 *
 * Answer-hiding: an open template — no answer exists. verify() re-derives the
 * page from its stamps: root data-lcs-face="base" data-lcs-unit -lesson
 * -letters="i|t|u|w" -x -floor -ruling -write-rows -chains -stack; every text
 * node data-lcs-cursive="<unit>" data-lcs-role="model|trace|ribbon". The
 * RASTER half (ink on its lines ±1 px, every join ONE ink piece, ink inside its
 * row) runs in verify() too, so every generated deck measures itself.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b6-common.js');
const C6 = require('../../templates/components-b6.js');
const SR = require('../../primitives/school-ruling.js');
const { color } = require('../../primitives/_tokens.js');
const { CURSIVE_WRITING_NEUTRAL: NEUTRAL } = require('../../data/b6/cursive-writing.js');

const ID = 'G2-377';
const KEY = 'cursive-writing';
const BODY_W = 675;
const STACK_MAX = 677;
const RIBBON_H = 44, RIBBON_GAP = 12, BLOCK_GAP = 10, ROW_GAP = 2;
const MARGIN_X = 76;
const CHAIN_GAP = 26;
const BANDS = ['K', 'G1', 'G2', 'G3'];

function bandOfLevel(locale, levelKey) {
  const keys = NEUTRAL.levelKeys[locale];
  if (!keys) throw new Error(`${ID}: no level keys for ${locale}`);
  const i = keys.indexOf(levelKey);
  if (i < 0) throw new Error(`${ID}: ${locale} level "${levelKey}" is not one of ${keys.join(' / ')}`);
  return BANDS[i];
}

function xFor(bankLoc, unit, mode) {
  const x = bankLoc.xPx && ((bankLoc.xPx[unit] && bankLoc.xPx[unit][mode]) != null ? bankLoc.xPx[unit][mode] : bankLoc.xPx[mode]);
  if (!(x > 0)) throw new Error(`${ID}: no xPx.${mode} for unit ${unit}`);
  return x;
}

/** §2 stack formulas (px); w = writeRows, N = letters */
function stackOf({ kind, rowH, i, N, w }) {
  if (kind === 'seyes') return Math.round((RIBBON_H + RIBBON_GAP + (4 * (2 + w) * (N - 1) + 5 + 4 * w) * i) * 100) / 100;
  return RIBBON_H + RIBBON_GAP + N * ((1 + w) * rowH + ROW_GAP * w) + BLOCK_GAP * (N - 1);
}

/**
 * Resolve the page: the unit, ruling kind, X, letters, write rows and the stack. THROWS on every refusal
 * (a unit the locale does not ship, an X under the level floor, a lesson that does not fit 677).
 */
function resolvePage(bankLoc, d, locale, unit) {
  if (!bankLoc || typeof bankLoc !== 'object') throw new Error(`${ID}: no ${locale} bank block`);
  if (bankLoc.refused) throw new Error(`${ID}: type refused in ${locale}: ${bankLoc.refused.reason || bankLoc.refused}`);
  if (!d || d.mode !== 'base') throw new Error(`${ID}: only the base (mode 'base') is built; got mode "${d && d.mode}" (the faces are Phase E)`);
  const units = bankLoc.units || [];
  // exemplarByMode (optional, nt5-F de): a locale that ships TWO scripts publishes each face in ONE of them
  // (de: VA on base/joins/copy, LA on capitals/words/reading), so every face is one deck with no unit segment
  const u = unit || (bankLoc.exemplarByMode && bankLoc.exemplarByMode[d.mode]) || bankLoc.exemplar;
  if (!units.includes(u)) throw new Error(`${ID}: unit "${u}" is not a ${locale} unit (${units.join(', ') || 'none'})`);
  if (!NEUTRAL.units[u]) throw new Error(`${ID}: unit "${u}" is not a vendored Playwrite unit`);
  const lesson = (bankLoc.lessons && bankLoc.lessons[u] || [])[d.lesson || 0];
  if (!Array.isArray(lesson) || !lesson.length) throw new Error(`${ID}: ${locale} has no lesson ${d.lesson || 0} for unit ${u}`);
  const letters = d.letters === 'all' ? lesson.slice() : lesson.slice(0, d.letters);
  const band = bandOfLevel(locale, bankLoc.levels && bankLoc.levels.base);
  const kind = bankLoc.ruling && bankLoc.ruling[band];
  if (!SR.KINDS.includes(kind)) throw new Error(`${ID}: ${locale} ruling for ${band} is "${kind}"`);
  const floor = NEUTRAL.xFloor[band];
  const baseX = kind === 'seyes' ? NEUTRAL.seyesI[band] : xFor(bankLoc, u, 'base');
  if (!(baseX >= floor)) throw new Error(`${ID}: X ${baseX} < the ${band} floor ${floor} (${locale} ${u})`);
  // the first (X delta, write rows) pair, in ladder order, whose stack fits 677 (Seyès keeps its interline)
  const deltas = kind === 'seyes' ? [0] : [].concat(d.xDelta || 0);
  let pick = null;
  for (const dx of deltas) {
    const X = baseX + dx;
    const geom = kind === 'seyes' ? null : SR.rulingGeometry({ unit: u, kind, X, cap: false });
    for (const w of d.writeRows) {
      const stack = stackOf({ kind, rowH: geom && geom.rowH, i: X, N: letters.length, w });
      if (stack <= STACK_MAX) { pick = { w, stack, X, geom }; break; }
    }
    if (pick) break;
  }
  if (!pick) throw new Error(`${ID}: ${locale} ${u} lesson ${d.lesson || 0} (${letters.join(' ')}) at X ${baseX} does not fit ${STACK_MAX} px with ${d.writeRows.join(' or ')} write rows — the page never truncates a lesson (refuse)`);
  const { X, geom } = pick;
  const scriptName = bankLoc.scriptName && bankLoc.scriptName[u];
  if (typeof scriptName !== 'string' || !scriptName.trim()) throw new Error(`${ID}: ${locale} has no scriptName for ${u}`);
  // closing practice lines (SPARSE / FILL, lead review 2026-09-23): as many more empty rows of the same
  // ruling as the 677 budget still holds after the lesson — measured slack, never a larger glyph
  const unitH = kind === 'seyes' ? 4 * X : geom.rowH + ROW_GAP;
  const lead = kind === 'seyes' ? 0 : BLOCK_GAP - ROW_GAP;   // the first practice row follows a block gap
  const practice = Math.max(0, Math.floor((STACK_MAX - pick.stack - lead) / unitH));
  const total = Math.round((pick.stack + (practice ? lead + practice * unitH - (kind === 'seyes' ? 0 : 0) : 0)) * 100) / 100;
  return { unit: u, kind, X, floor, band, letters, lesson: d.lesson || 0, chains: d.chains, writeRows: pick.w, stack: pick.stack, practice, total, geom, scriptName, lift: NEUTRAL.units[u].lift, dashHelpers: !!bankLoc.dashHelpers };
}

/** min..max flexible gap (the stack is computed at the minimum; a short chrome's slack spreads over every gap,
 *  each capped so no blank band between two content boxes exceeds 40 px — SPARSE) */
const spacer = (min, max) => C6.cwGap(min, max);
// faceBlock: a face's between-item gap (fix round 2: no practice rows, so the gaps carry the slack; 40 = the SPARSE band)
// faceTag: tag → first item (the tag's own 8 px margin + 32 = the 40 px band); faceRow: row A → the writing line
const GAP_MAX = { ribbon: 30, block: 34, row: 20, seyesBlock: 30, faceBlock: 40, faceTag: 32, faceRow: 30 };

function composeBody(p, locale) {
  const fsPx = p.kind === 'seyes' ? p.X / SR.metricsFor(p.unit).xHeight : p.geom.fs;
  const blocks = p.letters.map((letter, k) => {
    const seyes = p.kind === 'seyes' ? SR.seyesGeometry({ unit: p.unit, i: p.X, rows: 1 + p.writeRows, last: k === p.letters.length - 1 }) : null;
    return C6.cwBlock({ unit: p.unit, kind: p.kind, letter, chains: p.chains, writeRows: p.writeRows, w: BODY_W, marginX: MARGIN_X, geom: p.geom, seyes, dashHelpers: p.dashHelpers, blockIndex: k, rowGap: [ROW_GAP, GAP_MAX.row] });
  });
  const seyes = p.kind === 'seyes';
  const blockHtml = blocks.map((b, k) => (k ? (seyes ? spacer(0, GAP_MAX.seyesBlock) : spacer(BLOCK_GAP, GAP_MAX.block)) : '') + b).join('');
  const practice = p.practice ? (seyes ? spacer(0, GAP_MAX.seyesBlock) : spacer(BLOCK_GAP, GAP_MAX.block)) +
    C6.cwPracticeRows({ unit: p.unit, kind: p.kind, k: p.practice, w: BODY_W, marginX: MARGIN_X, geom: p.geom, seyesI: p.X, dashHelpers: p.dashHelpers, rowGap: [ROW_GAP, GAP_MAX.row] }) : '';
  return C6.cwFontFace(p.unit) +
    `<div class="cw-page" data-ws-content="" data-lcs-cw="" data-lcs-type="${ID}" data-lcs-face="base" data-lcs-mode="base" data-lcs-locale="${locale}"` +
    ` data-lcs-unit="${p.unit}" data-lcs-lesson="${p.lesson}" data-lcs-letters="${p.letters.join('|')}" data-lcs-x="${p.X}" data-lcs-floor="${p.floor}"` +
    ` data-lcs-ruling="${p.kind}" data-lcs-write-rows="${p.writeRows}" data-lcs-chains="${p.chains}" data-lcs-stack="${p.total}" data-lcs-lesson-stack="${p.stack}" data-lcs-practice="${p.practice}" data-lcs-lift="${p.lift}"` +
    ` style="display:flex;flex-direction:column;justify-content:flex-start;height:100%;width:${BODY_W}px;margin:0 auto">` +
    `<div style="flex:0 0 auto">${C6.cwRibbon({ unit: p.unit, letters: p.letters, scriptName: p.scriptName, fs: fsPx, w: BODY_W, h: RIBBON_H })}</div>` +
    spacer(RIBBON_GAP, GAP_MAX.ribbon) + blockHtml + practice + `</div>`;
}

/**
 * The browser half of verify() — structural (serialised into page.evaluate; self-contained).
 * data = { ID, STACK_MAX, ink, grid }
 */
function browserVerify(data) {
  const { ID, STACK_MAX, ink, grid } = data;   // + data.face (faces only): the bank literals the page is re-derived against
  const fails = [];
  const root = document.querySelector(`[data-lcs-cw][data-lcs-type="${ID}"]`);
  if (!root) return [`${ID}: no cursive root`];
  const ds = root.dataset;
  const unit = ds.lcsUnit;
  const fam = `LCS Cursive ${unit}`;
  if (!root.hasAttribute('data-ws-content')) fails.push('root lacks data-ws-content');
  // ONE face per page, and it is the page's unit
  const faces = [...document.querySelectorAll('style[data-lcs-cursive-face]')];
  if (faces.length !== 1) fails.push(`${faces.length} cursive @font-face blocks (want exactly 1)`);
  else if (faces[0].dataset.lcsCursiveFace !== unit || !faces[0].textContent.includes(`'${fam}'`)) fails.push(`the @font-face is "${faces[0].dataset.lcsCursiveFace}", the page unit is ${unit}`);
  // exactly one LCS Cursive family used by any element
  const used = new Set();
  for (const el of document.querySelectorAll('.ws-page *')) {
    const f = getComputedStyle(el).fontFamily || '';
    const m = f.match(/LCS Cursive [a-z-]+/g);
    if (m) m.forEach((x) => used.add(x));
  }
  if (used.size !== 1 || !used.has(fam)) fails.push(`cursive families used on the page: ${[...used].join(', ') || 'none'} (want only ${fam})`);
  // no cursive in SVG
  for (const t of document.querySelectorAll('svg text, svg tspan')) {
    if (/LCS Cursive/.test(getComputedStyle(t).fontFamily || '') || /LCS Cursive/.test(t.getAttribute('font-family') || '')) fails.push(`cursive drawn as SVG <${t.tagName}> "${t.textContent}"`);
  }
  // no stroke arrows / start dots (§1: no stroke data exists for cursive)
  if (root.querySelector('[data-lcs-start-dot], [data-lcs-arrow], marker')) fails.push('a stroke arrow or start dot on the page');
  const letters = (ds.lcsLetters || '').split('|').filter(Boolean);
  const isBase = ds.lcsFace === 'base';
  if (isBase && !letters.length) fails.push('no letters stamped');
  // a title that names letters names THIS page's letters (a d1 page of i t u under "…: i, t, u and w")
  const titleEl = document.querySelector('[data-lcs-title]');
  const tt = titleEl ? titleEl.textContent : '';
  const named = tt.includes(':') ? (tt.slice(tt.indexOf(':') + 1).match(/(?<!\p{L})\p{Ll}(?!\p{L})/gu) || []) : [];
  if (isBase && named.length >= 2 && named.slice().sort().join('') !== letters.slice().sort().join('')) fails.push(`the title names ${named.join(' ')}, the page teaches ${letters.join(' ')}`);
  const nodes = [...root.querySelectorAll('[data-lcs-cursive]')];
  const ctx = document.createElement('canvas').getContext('2d');
  const want = { model: ink, ribbon: ink, trace: grid };
  let sumHtml = 0, sumSerif = 0;
  for (const n of nodes) {
    const tag = `${n.dataset.lcsRole} "${n.textContent}"`;
    if (n.dataset.lcsCursive !== unit) fails.push(`${tag}: stamped unit ${n.dataset.lcsCursive} ≠ ${unit}`);
    if (n.childNodes.length !== 1 || n.firstChild.nodeType !== 3 || n.children.length) fails.push(`${tag}: not exactly one text node (${n.childNodes.length} children)`);
    const cs = getComputedStyle(n);
    if (!(cs.fontFamily.replace(/["']/g, '') === fam)) fails.push(`${tag}: font-family ${cs.fontFamily}`);
    if (!(cs.letterSpacing === 'normal' || parseFloat(cs.letterSpacing) === 0)) fails.push(`${tag}: letter-spacing ${cs.letterSpacing}`);
    if (!/\s/.test(n.textContent) && !(cs.wordSpacing === '0px' || cs.wordSpacing === 'normal')) fails.push(`${tag}: word-spacing ${cs.wordSpacing} on a node with no space`);
    if (cs.textTransform !== 'none') fails.push(`${tag}: text-transform ${cs.textTransform}`);
    if (cs.fontFeatureSettings !== 'normal') fails.push(`${tag}: font-feature-settings ${cs.fontFeatureSettings}`);
    if (cs.fontVariantLigatures !== 'normal') fails.push(`${tag}: font-variant-ligatures ${cs.fontVariantLigatures}`);
    if (cs.color !== want[n.dataset.lcsRole]) fails.push(`${tag}: colour ${cs.color} (want ${want[n.dataset.lcsRole]})`);
    const fs = parseFloat(cs.fontSize);
    const spec = `${fs}px "${fam}"`;
    if (!document.fonts.check(spec, n.textContent)) fails.push(`${tag}: document.fonts.check false for ${spec}`);
    // the fallback-width test: the node's own text width == the unit's canvas width, ≠ the default serif's
    const range = document.createRange(); range.selectNodeContents(n);
    const wHtml = range.getBoundingClientRect().width;
    // around a SPACE the laid-out run and the canvas disagree by a kern (measured: nl "J J" 90.1 in layout, 93.7 on
    // canvas — "JJ", "M M", "A A" agree to 0.01 px), so each space buys 0.1 em of tolerance; nothing else does
    ctx.font = spec; ctx.wordSpacing = cs.wordSpacing === 'normal' ? '0px' : cs.wordSpacing; const wUnit = ctx.measureText(n.textContent).width; ctx.wordSpacing = '0px';
    const tol = 1 + 0.1 * fs * (n.textContent.match(/\s/g) || []).length;
    ctx.font = `${fs}px serif`; const wSerif = ctx.measureText(n.textContent).width;
    if (Math.abs(wHtml - wUnit) > tol) fails.push(`${tag}: rendered width ${wHtml.toFixed(1)} ≠ the unit's ${wUnit.toFixed(1)} (a fallback glyph?)`);
    sumHtml += wHtml; sumSerif += wSerif;
  }
  // a single narrow letter ("i") can be as wide in the default serif as in the school script, so the
  // "≠ the fallback" half is read over the whole page's cursive text (per-node: == the unit's width above)
  if (nodes.length && Math.abs(sumHtml - sumSerif) < 4) fails.push(`the page's cursive text is ${sumHtml.toFixed(1)} px wide, the serif fallback's ${sumSerif.toFixed(1)} (the face did not load)`);
  // ── the FACES (Phase E): each page re-derived from its stamps against the bank literals ──
  if (ds.lcsFace !== 'base') {
    const F = data.face || {};
    const tagEl = root.querySelector('[data-lcs-script-tag]');
    if (!tagEl) fails.push('no script tag');
    const blocks = [...root.querySelectorAll('.cw-block')];
    const count = Number(ds.lcsCount);
    const nodesIn = (b, kind) => [...b.querySelectorAll(`[data-lcs-cursive][data-lcs-kind="${kind}"]`)];
    const low = (s) => String(s).toLocaleLowerCase();
    if (F.mode !== ds.lcsFace) fails.push(`verify data for ${F.mode}, page face ${ds.lcsFace}`);
    if (ds.lcsFace === 'capitals') {
      if (blocks.length !== count) fails.push(`${blocks.length} blocks, ${count} stamped`);
      const seen = new Set();
      const initials = []; for (const nm of F.names) { const C = [...nm][0]; if (!initials.includes(C)) initials.push(C); }
      blocks.forEach((b, k) => {
        const C = b.dataset.lcsCapital, nm = b.dataset.lcsName;
        if (seen.has(C)) fails.push(`capital ${C} twice`); seen.add(C);
        if (C !== initials[k]) fails.push(`block ${k}: capital ${C} ≠ the ${k + 1}. distinct initial of the names (${initials[k]})`);
        if (!F.names.includes(nm) || [...nm][0] !== C) fails.push(`block ${k}: name "${nm}" is not a bank name starting with ${C}`);
        const model = b.querySelector('[data-lcs-role="model"]');
        if (!model || model.textContent !== C) fails.push(`block ${k}: model "${model && model.textContent}" ≠ ${C}`);
        const pair = nodesIn(b, 'capital-pair'), name = nodesIn(b, 'name');
        if (pair.length !== 1 || pair[0].textContent !== C + ' ' + C) fails.push(`block ${k}: grey capitals "${pair.map((x) => x.textContent)}" ≠ "${C} ${C}"`);
        if (name.length !== 1 || name[0].textContent !== nm) fails.push(`block ${k}: grey name "${name.map((x) => x.textContent)}" ≠ "${nm}"`);
      });
    } else if (ds.lcsFace === 'joins') {
      if (blocks.length !== count) fails.push(`${blocks.length} blocks, ${count} stamped`);
      const seen = new Set();
      blocks.forEach((b, k) => {
        const pr = b.dataset.lcsPair, wd = b.dataset.lcsWord;
        if (seen.has(pr)) fails.push(`pair ${pr} twice`); seen.add(pr);
        if (!F.joins.some((j) => j.pair === pr && j.word === wd)) fails.push(`block ${k}: ${pr} / ${wd} is not a bank join`);
        if (!wd.includes(pr)) fails.push(`block ${k}: word "${wd}" does not contain "${pr}"`);
        if ([...pr].every((ch) => ch === [...pr][0])) fails.push(`block ${k}: pair "${pr}" is a base chain`);
        if (F.lift.includes([...pr][0])) fails.push(`block ${k}: pair "${pr}" starts with a LIFT letter`);
        if ((F.oneLetter || []).includes(low(pr))) fails.push(`block ${k}: pair "${pr}" is ONE letter in this locale's school teaching, not a join of two`);
        const model = b.querySelector('[data-lcs-role="model"]');
        if (!model || model.textContent !== pr) fails.push(`block ${k}: model "${model && model.textContent}" ≠ ${pr}`);
        const p2 = nodesIn(b, 'pair'), w2 = nodesIn(b, 'word');
        if (p2.length !== 1 || p2[0].textContent !== pr + ' ' + pr) fails.push(`block ${k}: grey pairs "${p2.map((x) => x.textContent)}" ≠ "${pr} ${pr}"`);
        if (w2.length !== 1 || w2[0].textContent !== wd) fails.push(`block ${k}: grey word ≠ "${wd}"`);
      });
    } else if (ds.lcsFace === 'words') {
      if (blocks.length !== count) fails.push(`${blocks.length} blocks, ${count} stamped`);
      let dotted = 0, joined = 0;
      blocks.forEach((b, k) => {
        const key = b.dataset.lcsWord, text = b.dataset.lcsText;
        if (!F.pictures.includes(key) || F.exclude.includes(key)) fails.push(`block ${k}: picture ${key} is not an opened, pinned picture`);
        if (F.words[key] !== text) fails.push(`block ${k}: word "${text}" ≠ the bank literal "${F.words[key]}"`);
        const tile = b.querySelector('[data-lcs-pic]');
        if (!tile || tile.dataset.lcsPic !== key) fails.push(`block ${k}: the picture tile is ${tile && tile.dataset.lcsPic}, the word is ${key}`);
        else { const r = tile.getBoundingClientRect(); if (r.width < 71.5 || r.height < 71.5) fails.push(`block ${k}: picture tile ${Math.round(r.width)}×${Math.round(r.height)} < 72`); if (tile.textContent.trim()) fails.push(`block ${k}: text printed on the picture`); }
        for (const x of [...nodesIn(b, 'word-model'), ...nodesIn(b, 'word')]) if (x.textContent !== text) fails.push(`block ${k}: cursive "${x.textContent}" ≠ "${text}"`);
        if (nodesIn(b, 'word').length !== 1) fails.push(`block ${k}: ${nodesIn(b, 'word').length} grey words`);
        if ([...low(text)].some((ch) => F.dots.includes(ch))) dotted++;
        if (F.joins.some((j) => low(text).includes(j.pair))) joined++;
      });
      if (dotted < 2) fails.push(`${dotted} words carry a dot / cross / accent (≥ 2: the instruction asks for them last)`);
      // fix round 2: every mark class the PRINTED instruction names is carried by ≥ 1 word on the page
      const insEl = document.querySelector('[data-lcs-instruction]');
      const ins = insEl ? insEl.textContent : '';
      for (const [src, flags, letters, what] of F.marks || []) {
        if (!new RegExp(src, flags).test(ins)) continue;
        if (!blocks.some((b) => [...low(b.dataset.lcsText)].some((ch) => letters.includes(ch)))) fails.push(`the instruction asks for ${what}, but no word on the page carries one`);
      }
      if (joined < 1) fails.push('no word carries a join pair');
    } else if (ds.lcsFace === 'copy') {
      if (blocks.length !== count) fails.push(`${blocks.length} blocks, ${count} stamped`);
      const under = ds.lcsModelUnder;
      blocks.forEach((b, k) => {
        const s = b.dataset.lcsSentence;
        const strip = b.querySelector('[data-lcs-print]');
        if (!strip || strip.textContent !== s) fails.push(`block ${k}: printed "${strip && strip.textContent}" ≠ "${s}"`);
        if (!F.sentences.includes(s)) fails.push(`block ${k}: "${s}" is not a bank sentence`);
        const toks = s.trim().split(/\s+/);
        if (toks.length < 4 || toks.length > 6 || !/^\p{Lu}/u.test(s) || !/^[^.!?]*\.$/.test(s)) fails.push(`block ${k}: "${s}" is not a 4-6 word sentence with a capital and one full stop`);
        const want = under === 'all' || (under === 'first' && k === 0);
        const models = nodesIn(b, 'sentence');
        if (want !== (models.length === 1) || models.length > 1) fails.push(`block ${k}: ${models.length} grey models (modelUnder ${under})`);
        if (models[0]) {
          if (models[0].textContent !== s) fails.push(`block ${k}: the grey model "${models[0].textContent}" ≠ the printed sentence`);
          const row = models[0].closest('.cw-row');
          if (models[0].getBoundingClientRect().right > row.getBoundingClientRect().right - 4) fails.push(`block ${k}: the model runs past its row`);
        }
      });
    } else if (ds.lcsFace === 'read') {
      const cards = [...root.querySelectorAll('.cw-card')], tiles = [...root.querySelectorAll('.ws-match-col:last-child [data-lcs-pic]')];
      if (cards.length !== count || tiles.length !== count) fails.push(`${cards.length} words, ${tiles.length} pictures, ${count} stamped`);
      const keysL = cards.map((x) => x.dataset.lcsWord), keysR = tiles.map((x) => x.dataset.lcsPic);
      if (keysL.slice().sort().join('|') !== keysR.slice().sort().join('|')) fails.push('the words and the pictures are not one set');
      const off = keysL.map((kk, i) => keysR.indexOf(kk) - i);
      if (off.some((o) => o === 0)) fails.push(`a word faces its own picture (row offsets ${off.join(',')})`);
      const n = keysL.length;
      if (n > 1 && (off.every((o) => o === off[0]) || off.map((o) => (o + n) % n).every((o, _, a) => o === a[0]))) fails.push(`the partner is a constant shift (offsets ${off.join(',')})`);
      if (off.filter((o) => Math.abs(o) === 1).length > 1) fails.push(`position tell: ${off.filter((o) => Math.abs(o) === 1).length} partners stand one row away (offsets ${off.join(',')}; ≤ 1 allowed)`);
      if (n > 2 && keysR.join('|') === keysL.slice().reverse().join('|')) fails.push('the pictures are the words reversed');
      // fix round 2 (fr panel): a PARTIAL shift (more than shiftShareMax partners on one cyclic offset) is a position tell too
      { const cnt = {}; off.forEach((o) => { const c = (o + n) % n; cnt[c] = (cnt[c] || 0) + 1; }); const top = Math.max(0, ...Object.values(cnt)); if (top > F.shiftShareMax) fails.push(`position tell: ${top} partners share one row offset (offsets ${off.join(',')}; ≤ ${F.shiftShareMax} allowed)`); }
      const texts = cards.map((x) => x.querySelector('[data-lcs-cursive]').textContent);
      cards.forEach((x, i) => { if (F.words[keysL[i]] !== texts[i]) fails.push(`card ${i}: "${texts[i]}" ≠ the bank literal`); if (x.getBoundingClientRect().height < 75.5) fails.push(`card ${i}: ${Math.round(x.getBoundingClientRect().height)} px < 76`); });
      let same = 0, close = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const a = low(texts[i]), b = low(texts[j]); if ([...a][0] === [...b][0]) { same++; if (Math.abs([...a].length - [...b].length) <= 1) close++; } }
      if (same < 2 || close < 1) fails.push(`clash: ${same} same-initial pairs, ${close} within one letter of length (want ≥ 2 and ≥ 1)`);
      for (const t of tiles) { if (t.textContent.trim()) fails.push('text printed on a picture tile'); const im = t.querySelector('img'); if (!im || im.getBoundingClientRect().width < 71.5) fails.push('a picture under 72 px'); if (!F.pictures.includes(t.dataset.lcsPic) || F.exclude.includes(t.dataset.lcsPic)) fails.push(`picture ${t.dataset.lcsPic} not pinned`); }
    }
    // X floor + the stack at the minimum + SPARSE
    if (!(Number(ds.lcsX) >= Number(ds.lcsFloor))) fails.push(`X ${ds.lcsX} < floor ${ds.lcsFloor}`);
    if (!(Number(ds.lcsStack) <= STACK_MAX)) fails.push(`stack ${ds.lcsStack} > ${STACK_MAX}`);
    const flow = [...root.querySelectorAll('[data-lcs-flow]')];
    if (ds.lcsFace !== 'read') {
      const leaves = [...root.querySelectorAll('[data-lcs-leaf], [data-lcs-practice=""]')];
      const measured = tagEl.getBoundingClientRect().height + 8 + [...root.querySelectorAll('[data-lcs-gap]')].reduce((s, g) => s + Number(g.dataset.lcsGap), 0) + leaves.reduce((s, b) => s + b.getBoundingClientRect().height, 0);
      if (Math.abs(measured - Number(ds.lcsStack)) > 1.5) fails.push(`rendered stack ${measured.toFixed(1)} ≠ stamped ${ds.lcsStack}`);
      if (Number(ds.lcsPractice) !== root.querySelectorAll('[data-lcs-practice=""]').length) fails.push('practice rows ≠ stamped');
      // fix round 2 (landing audit): NO orphan ruled row — every ruled row belongs to a block that carries an item
      const orphans = [...root.querySelectorAll('.cw-row')].filter((r) => !r.closest('.cw-block'));
      if (orphans.length) fails.push(`orphan ruled row: ${orphans.length} ruled row(s) belong to no item (a closing practice row the instruction never names)`);
      // ... and every item gets the writing lines its instruction names: ONE free line (capitals / joins / words),
      // TWO under every sentence (copy: "on the two lines below it"; the grey model's own row is not a free line)
      const wantFree = ds.lcsFace === 'copy' ? 2 : 1;
      blocks.forEach((b, k) => {
        const free = [...b.querySelectorAll('.cw-row')].filter((r) => !r.querySelector('[data-lcs-cursive]')).length;
        if (free !== wantFree) fails.push(`block ${k}: ${free} free writing line(s), the instruction names ${wantFree}`);
      });
    }
    // the content boxes are the LEAVES (rows, printed strips, Seyès slices, practice rows): a band inside a grown block counts too
    const content = ds.lcsFace === 'read' ? [...root.querySelectorAll('.cw-card')] : [...root.querySelectorAll('[data-lcs-leaf], [data-lcs-practice=""]')].sort((x, y) => x.getBoundingClientRect().top - y.getBoundingClientRect().top);
    const boxes = [tagEl, ...content].map((e) => e.getBoundingClientRect());
    for (let k = 1; k < boxes.length; k++) { const band = boxes[k].top - boxes[k - 1].bottom; if (band > 40.5) fails.push(`SPARSE: a ${Math.round(band)} px blank band between content boxes ${k - 1} and ${k}`); }
    const bodyEl = document.querySelector('.ws-body');
    if (bodyEl && boxes.length) {
      const tail = bodyEl.getBoundingClientRect().bottom - boxes[boxes.length - 1].bottom;
      if (tail > 60.5) fails.push(`SPARSE: ${Math.round(tail)} px blank under the last row (≤ 60)`);
      if (tail < -0.6) fails.push(`the content runs ${Math.round(-tail)} px past the body`);
    }
    return fails.map((f) => `${ID}: ${f}`);
  }
  // the page re-derived from the stamps
  const ribbon = nodes.filter((n) => n.dataset.lcsRole === 'ribbon').map((n) => n.textContent);
  if (ribbon.join('|') !== letters.join('|')) fails.push(`ribbon letters ${ribbon.join('|')} ≠ stamped ${letters.join('|')}`);
  const blocks = [...root.querySelectorAll('.cw-block')];
  if (blocks.length !== letters.length) fails.push(`${blocks.length} blocks for ${letters.length} letters`);
  const chains = Number(ds.lcsChains), wRows = Number(ds.lcsWriteRows);
  blocks.forEach((b, k) => {
    const L = letters[k];
    if (b.dataset.lcsLetter !== L) fails.push(`block ${k}: letter ${b.dataset.lcsLetter} ≠ ${L}`);
    const models = [...b.querySelectorAll('[data-lcs-role="model"]')];
    if (models.length !== 1 || models[0].textContent !== L) fails.push(`block ${k}: model ${models.map((m) => m.textContent).join(',')} ≠ "${L}"`);
    const traces = [...b.querySelectorAll('[data-lcs-role="trace"]')];
    if (traces.length !== chains || traces.some((t) => t.textContent !== L.repeat(3))) fails.push(`block ${k}: chains ${traces.map((t) => t.textContent).join(',')} (want ${chains} × "${L.repeat(3)}")`);
    const rowsA = b.querySelectorAll('.cw-row[data-lcs-row="A"]').length, empty = b.querySelectorAll('.cw-row[data-lcs-empty]').length;
    if (rowsA !== 1 || empty !== wRows) fails.push(`block ${k}: ${rowsA} model rows + ${empty} empty rows (want 1 + ${wRows})`);
    // row A leaves the child room: ≥ 200 px of open ruling right of the last chain
    const strip = b.querySelector('.cw-chains');
    if (strip) {
      const last = traces[traces.length - 1];
      const open = b.querySelector('.cw-row[data-lcs-row="A"]').getBoundingClientRect().right - last.getBoundingClientRect().right;
      if (open < 200) fails.push(`block ${k}: only ${Math.round(open)} px of open ruling after the chains`);
    }
  });
  // X floor + the stack (rendered heights at the minimum gaps)
  if (!(Number(ds.lcsX) >= Number(ds.lcsFloor))) fails.push(`X ${ds.lcsX} < floor ${ds.lcsFloor}`);
  if (!(Number(ds.lcsStack) <= STACK_MAX)) fails.push(`stack ${ds.lcsStack} > ${STACK_MAX}`);
  const rib = root.querySelector('.cw-ribbon');
  const flow = [...root.querySelectorAll('[data-lcs-flow]')];
  const measured = rib.getBoundingClientRect().height + [...root.querySelectorAll('[data-lcs-gap]')].reduce((s, g) => s + Number(g.dataset.lcsGap), 0) + flow.reduce((s, b) => s + b.getBoundingClientRect().height, 0);
  if (Math.abs(measured - Number(ds.lcsStack)) > 1.5) fails.push(`rendered stack ${measured.toFixed(1)} ≠ stamped ${ds.lcsStack}`);
  if (Number(ds.lcsPractice) !== root.querySelectorAll('[data-lcs-practice=""]').length) fails.push(`${root.querySelectorAll('[data-lcs-practice=""]').length} practice rows rendered, ${ds.lcsPractice} stamped`);
  // SPARSE (lead review): no blank band > 40 px between two consecutive content boxes, and the content reaches
  // within 60 px of the body's bottom (a short lesson fills the page with writing lines, never a blank band)
  const boxes = [rib, ...flow].map((e) => e.getBoundingClientRect());
  for (let k = 1; k < boxes.length; k++) { const band = boxes[k].top - boxes[k - 1].bottom; if (band > 40.5) fails.push(`SPARSE: a ${Math.round(band)} px blank band between content boxes ${k - 1} and ${k}`); }
  const bodyEl = document.querySelector('.ws-body');
  if (bodyEl && boxes.length) {
    const tail = bodyEl.getBoundingClientRect().bottom - boxes[boxes.length - 1].bottom;
    if (tail > 60.5) fails.push(`SPARSE: ${Math.round(tail)} px blank under the last writing line (≤ 60)`);
    if (tail < -0.6) fails.push(`the content runs ${Math.round(-tail)} px past the body`);
  }
  return fails.map((f) => `${ID}: ${f}`);
}

/**
 * The raster half (node side; screenshots the page). The rulings, the ribbon's cream and the script name are
 * hidden and every cursive node inked for the capture only (restored in finally, before the PDF). Per node:
 *  ON THE LINES  ink top / bottom == the rendered base line − / + the string's canvas ink ascent / descent (±1.2 px)
 *  INSIDE ITS ROW every ink pixel within the row box (no clipped loop or descender)
 *  ONE PIECE     connected ink components == the same string drawn on a canvas (the critic's oracle: canvas and
 *                HTML keep joins, SVG breaks 27 strings), and a chain of three never has more pieces than
 *                1 + 3·(c1 − 1) (3·c1 after a LIFT letter), c1 = the isolated letter's pieces.
 * `opts.expectXCalibration` (the gate's "xxx" page): the chain ink top sits ON the x-line (±1.2 px).
 */
async function rasterVerify(page, opts = {}) {
  const css = '[data-lcs-cw] svg,[data-lcs-cw] .cw-gaprule{visibility:hidden!important}[data-lcs-cw] .cw-ribbon{background:transparent!important;border-color:transparent!important}' +
    '[data-lcs-cw] [data-lcs-script-name]{visibility:hidden!important}[data-lcs-cursive]{color:#3A3530!important}' +
    '[data-lcs-cw] .cw-pic,[data-lcs-cw] .cw-strip,[data-lcs-cw] .ws-match-dot,[data-lcs-cw] .ws-match-item img{visibility:hidden!important}[data-lcs-cw] .ws-match-item{border-color:transparent!important;background:transparent!important}';
  const box = await page.evaluate((css) => {
    const s = document.createElement('style'); s.id = 'cw-qa-raster'; s.textContent = css; document.head.appendChild(s);
    const r = document.querySelector('[data-lcs-cw]');
    if (!r) return null;
    const b = r.getBoundingClientRect();
    return { x: b.left + window.scrollX, y: b.top + window.scrollY, width: b.width, height: b.height };
  }, css);
  if (!box) return [`${ID}: raster — no cursive root`];
  let shot;
  try {
    await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
    shot = await page.screenshot({ clip: { x: Math.floor(box.x), y: Math.floor(box.y), width: Math.ceil(box.width) + 1, height: Math.ceil(box.height) + 1 }, encoding: 'base64' });
  } finally {
    await page.evaluate(() => { const s = document.getElementById('cw-qa-raster'); if (s) s.remove(); });
  }
  return page.evaluate(rasterAnalyse, { png: shot, clipX: Math.floor(box.x), clipY: Math.floor(box.y), ID, calib: !!opts.expectXCalibration });
}

/** in-page raster analysis (self-contained) */
async function rasterAnalyse({ png, clipX, clipY, ID, calib }) {
  const fails = [];
  const img = new Image();
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + png; });
  const cv = document.createElement('canvas'); cv.width = img.naturalWidth; cv.height = img.naturalHeight;
  const cx = cv.getContext('2d', { willReadFrequently: true }); cx.drawImage(img, 0, 0);
  const W = cv.width, H = cv.height;
  const data = cx.getImageData(0, 0, W, H).data;
  const s = window.devicePixelRatio || 1;
  // two thresholds: pieces are counted on solid ink (< 200, so a faint anti-aliased halo never bridges two
  // pieces); the ink EXTENT is read on any visible ink (< 240, so the faint pixels at the tangent of a round
  // stroke's extreme are not lost at a small size)
  const INK = 200, FAINT = 240;
  const inkAt = (d, w, x, y) => { const o = (y * w + x) * 4; return (d[o] + d[o + 1] + d[o + 2]) / 3 < INK; };
  const faintAt = (d, w, x, y) => { const o = (y * w + x) * 4; return (d[o] + d[o + 1] + d[o + 2]) / 3 < FAINT; };
  function components(d, w, x0, y0, x1, y1, minArea) {
    const seen = new Uint8Array((x1 - x0) * (y1 - y0));
    let n = 0; const ww = x1 - x0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const i = (y - y0) * ww + (x - x0);
      if (seen[i] || !inkAt(d, w, x, y)) continue;
      let area = 0; const st = [[x, y]]; seen[i] = 1;
      while (st.length) {
        const [px, py] = st.pop(); area++;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const qx = px + dx, qy = py + dy;
          if (qx < x0 || qy < y0 || qx >= x1 || qy >= y1) continue;
          const j = (qy - y0) * ww + (qx - x0);
          if (seen[j] || !inkAt(d, w, qx, qy)) continue;
          seen[j] = 1; st.push([qx, qy]);
        }
      }
      if (area >= minArea) n++;
    }
    return n;
  }
  function bbox(d, w, x0, y0, x1, y1) {
    let t = Infinity, b = -Infinity, l = Infinity, r = -Infinity;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) if (faintAt(d, w, x, y)) { if (y < t) t = y; if (y > b) b = y; if (x < l) l = x; if (x > r) r = x; }
    return t === Infinity ? null : { t, b: b + 1, l, r: r + 1 };
  }
  /** the same string drawn on a canvas at the same device size: its component count */
  function canvasPieces(text, fam, fsDev, minArea, wsDev = 0) {
    const c = document.createElement('canvas');
    const k = c.getContext('2d', { willReadFrequently: true });
    k.font = `${fsDev}px "${fam}"`;
    const m = k.measureText(text);
    const pad = Math.ceil(fsDev * 0.6);
    c.width = Math.ceil(m.width + 2 * pad + fsDev); c.height = Math.ceil(fsDev * 3.5);
    k.fillStyle = '#FFFFFF'; k.fillRect(0, 0, c.width, c.height);
    k.font = `${fsDev}px "${fam}"`; k.wordSpacing = wsDev + 'px'; k.fillStyle = '#3A3530'; k.textBaseline = 'alphabetic';
    k.fillText(text, pad, Math.round(fsDev * 2));
    const dd = k.getImageData(0, 0, c.width, c.height).data;
    return components(dd, c.width, 0, 0, c.width, c.height, minArea);
  }
  const root = document.querySelector(`[data-lcs-cw][data-lcs-type="${ID}"]`);
  const unit = root.dataset.lcsUnit, fam = `LCS Cursive ${unit}`, lift = root.dataset.lcsLift || '';
  const mctx = document.createElement('canvas').getContext('2d');
  const nodes = [...root.querySelectorAll('[data-lcs-cursive]')];
  let checked = 0;
  for (const n of nodes) {
    const tag = `${n.dataset.lcsRole} "${n.textContent}"`;
    const fs = parseFloat(getComputedStyle(n).fontSize);
    const rng = document.createRange(); rng.selectNodeContents(n);
    const tr = rng.getBoundingClientRect();
    const row = n.closest('.cw-row') || n.closest('.cw-ribbon');
    const rr = row.getBoundingClientRect();
    // the horizontal window: halfway to the neighbouring text on the same row (entry / exit strokes overhang the advance)
    const sibs = [...row.querySelectorAll('[data-lcs-cursive]')].map((x) => { const q = document.createRange(); q.selectNodeContents(x); return { x, r: q.getBoundingClientRect() }; }).sort((a, b) => a.r.left - b.r.left);
    const at = sibs.findIndex((q) => q.x === n);
    const L = at > 0 ? (sibs[at - 1].r.right + tr.left) / 2 : rr.left;
    const R = at < sibs.length - 1 ? (tr.right + sibs[at + 1].r.left) / 2 : rr.right;
    const toDev = (v, o) => Math.round((v - o) * s);
    const pad = 14;
    const x0 = Math.max(0, toDev(L, clipX)), x1 = Math.min(W, toDev(R, clipX));
    const y0 = Math.max(0, toDev(rr.top - pad, clipY)), y1 = Math.min(H, toDev(rr.bottom + pad, clipY));
    const bb = bbox(data, W, x0, y0, x1, y1);
    if (!bb) { fails.push(`${tag}: no ink rendered`); continue; }
    const inkTop = bb.t / s + clipY, inkBot = bb.b / s + clipY;
    // inside its row
    if (inkTop < rr.top - 0.6 || inkBot > rr.bottom + 0.6) fails.push(`${tag}: ink ${inkTop.toFixed(1)}..${inkBot.toFixed(1)} leaves its row ${rr.top.toFixed(1)}..${rr.bottom.toFixed(1)} (a clipped loop or descender)`);
    // on its lines: the rendered base line (svg) of the row, else the stamped baseline
    const base = row.querySelector ? row.querySelector('line[data-lcs-line="base"]') : null;
    const blockSvgBase = !base && row.classList.contains('cw-row') ? row.closest('.cw-block') : null;
    let yB;
    if (base) { const lr = base.getBoundingClientRect(); yB = (lr.top + lr.bottom) / 2; }
    else if (row.dataset.lcsCardYb != null) yB = rr.top + rr.height / 2 + Number(row.dataset.lcsCardYb);   // F4: ink centred in its card
    else yB = rr.top + Number(n.dataset.lcsYb);
    mctx.font = `${fs}px "${fam}"`;
    const m = mctx.measureText(n.textContent);
    const expTop = yB - m.actualBoundingBoxAscent, expBot = yB + m.actualBoundingBoxDescent;
    if (Math.abs(inkTop - expTop) > 1.2 || Math.abs(inkBot - expBot) > 1.2) fails.push(`${tag}: ink ${inkTop.toFixed(1)}..${inkBot.toFixed(1)} vs its baseline ${yB.toFixed(1)} expects ${expTop.toFixed(1)}..${expBot.toFixed(1)} (±1.2)`);
    if (calib && n.dataset.lcsRole === 'trace') {
      const xl = row.querySelector('line[data-lcs-line="x"]');
      if (xl) { const lr = xl.getBoundingClientRect(); const yx = (lr.top + lr.bottom) / 2; if (Math.abs(inkTop - yx) > 1.2) fails.push(`${tag}: x-height ink top ${inkTop.toFixed(1)} is not on the x-line ${yx.toFixed(1)}`); }
    }
    void blockSvgBase;
    // one piece per join
    const fsDev = fs * s;
    const minArea = Math.max(4, 0.00375 * fsDev * fsDev);
    const html = components(data, W, x0, y0, x1, y1, minArea);
    const canv = canvasPieces(n.textContent, fam, fsDev, minArea, (parseFloat(getComputedStyle(n).wordSpacing) || 0) * s);
    if (html !== canv) fails.push(`${tag}: ${html} ink pieces in the page, ${canv} in the canvas oracle (a broken join)`);
    // every JOIN merges two bodies: a node's pieces ≤ Σ(its letters' own pieces) − (its joins), a join being two
    // consecutive lowercase letters with no LIFT after the first (capitals and spaces are never counted as joins);
    // for a base chain "iii" this is the old 1 + 3·(c1 − 1) bound
    {
      const chars = [...n.textContent];
      let sum = 0, joins = 0;
      const memo = {};
      chars.forEach((ch, i) => {
        if (/\s/.test(ch)) return;
        if (!(ch in memo)) memo[ch] = canvasPieces(ch, fam, fsDev, minArea);
        sum += memo[ch];
        const nx = chars[i + 1];
        if (nx && /\p{Ll}/u.test(ch) && /\p{Ll}/u.test(nx) && !lift.includes(ch)) joins++;
      });
      if (joins && html > sum - joins) fails.push(`${tag}: ${html} ink pieces > ${sum - joins} (its letters are ${sum} pieces with ${joins} joins; a join must merge them)`);
    }
    // WORD GAP (fix round 1): two words on one node stand ≥ 0.3 em apart, measured row by row on the page: split
    // at the middle of each space's advance box, the rightmost ink of the word before and the leftmost ink of the
    // word after, on every device row where both have ink; the closest row is the gap
    if (/\s/.test(n.textContent)) {
      const tn = n.firstChild, txt = n.textContent;
      for (let ci = 0; ci < txt.length; ci++) {
        if (!/\s/.test(txt[ci])) continue;
        const sp = document.createRange(); sp.setStart(tn, ci); sp.setEnd(tn, ci + 1);
        const sr = sp.getBoundingClientRect();
        let a = ci - 1; while (a > 0 && !/\s/.test(txt[a - 1])) a--;
        let b = ci + 2; while (b < txt.length && !/\s/.test(txt[b])) b++;
        const wr = document.createRange(); wr.setStart(tn, a); wr.setEnd(tn, ci); const pr = wr.getBoundingClientRect();
        const nr = document.createRange(); nr.setStart(tn, ci + 1); nr.setEnd(tn, b); const nx = nr.getBoundingClientRect();
        const mid = toDev((sr.left + sr.right) / 2, clipX);
        const xa = Math.max(0, toDev(pr.left - 0.5 * fs, clipX)), xb = Math.min(W, toDev(nx.right + 0.5 * fs, clipX));
        // ink belongs to a WORD by its connected piece (a j's lead-in hook that reaches back past the space stays
        // the next word's): label the pieces, give each to the side of the space its centre of mass lies on
        const ww = xb - xa, hh = y1 - y0, lab = new Int32Array(ww * hh).fill(-1), side = [];
        for (let y = y0; y < y1; y++) for (let x = xa; x < xb; x++) {
          const i0 = (y - y0) * ww + (x - xa);
          if (lab[i0] >= 0 || !faintAt(data, W, x, y)) continue;
          const id = side.length; let sx = 0, cnt = 0; const st = [[x, y]]; lab[i0] = id;
          while (st.length) { const [px, py] = st.pop(); sx += px; cnt++;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const qx = px + dx, qy = py + dy; if (qx < xa || qy < y0 || qx >= xb || qy >= y1) continue; const j = (qy - y0) * ww + (qx - xa); if (lab[j] >= 0 || !faintAt(data, W, qx, qy)) continue; lab[j] = id; st.push([qx, qy]); } }
          side.push(sx / cnt < mid ? 0 : 1);
        }
        let gap = Infinity;
        for (let y = y0; y < y1; y++) {
          let r = -1, l = Infinity;
          for (let x = xa; x < xb; x++) { const id = lab[(y - y0) * ww + (x - xa)]; if (id < 0) continue; if (side[id] === 0) r = Math.max(r, x); else l = Math.min(l, x); }
          if (r >= 0 && l < Infinity) gap = Math.min(gap, (l - r - 1) / s);
        }
        const word = txt.slice(a, b);
        if (gap < 0.3 * fs - 0.5) fails.push(`${tag}: the words in "${word}" stand ${gap === Infinity ? 'n/a' : gap.toFixed(1)} px apart (< 0.3 em = ${(0.3 * fs).toFixed(1)} px)`);
      }
    }
    checked++;
  }
  if (!checked) fails.push('raster: no cursive node measured');
  return fails.map((f) => `${ID}: ${f}`);
}


// ════════════════════════════ THE FIVE FACES (Phase E, design §3) ════════════════════════════
// CODE faces on the ONE `mode` knob; the base path (mode 'base') is untouched, byte for byte.
//   capitals (G2-384) · joins (G2-385) · words (G2-386) · read (G2-387) · copy (G3-401)
// Every face: the script tag (32 px) instead of the ribbon, the same copybook row grammar, the count
// = min(target, capacity at 677), closing practice rows of the same ruling to the 677 budget, gaps that
// grow (each capped: no band > 40 px) so the page fills the body at 814 / 722 / 677.

const FACE_MODES = ['capitals', 'joins', 'words', 'read', 'copy'];
const TAG_H = 32;
const FACE_MARGIN = { capitals: 92, joins: 96, words: 84, copy: 76 };
const FACE_FLOOR_N = { capitals: 3, joins: 3, words: 3, copy: 2, read: 4 };
// §3 F3: the letters a child adds LAST (dots, crosses, accents), per locale
const DOT_CROSS = { en: 'ijtx', de: 'ijtäöü', es: 'ijtáéíóúñ', pt: 'ijtãõáéêç', fr: 'ijtéèêàç', it: 'ijtàèìòù', nl: 'ijtë', da: 'ijtæøå', no: 'ijtæøå' };
const DERANGE_TRIES = 500;
// fix round 2 (nl panel): digraphs a locale's school teaches as ONE letter (nl "de lange ij") are not a join of
// two letters — the joins face never draws them (the bank gate asks the panel for a replacement pair)
const ONE_LETTER_DIGRAPHS = { nl: ['ij'] };
/**
 * Fix round 2 (fr panel: "ajoute … les accents" over chat / canard / train): every class of mark the G2-386
 * instruction NAMES must occur on the page. Per locale: [the phrase that names the class, the letters that carry
 * it, a label]. A class the instruction does not name is not required. The build reads the locale's own
 * instruction from the bank and draws a word set carrying every named class (none possible → refuse); verify()
 * re-derives it from the PRINTED instruction and the page's words.
 */
const MARK_CLASSES = {
  en: [[/(?<!\p{L})dots?(?!\p{L})/iu, 'ij', 'dots'], [/(?<!\p{L})cross(es)?(?!\p{L})/iu, 'tx', 'crosses']],
  de: [[/(?<!\p{L})punkt/iu, 'ijäöü', 'Punkte'], [/(?<!\p{L})strich/iu, 't', 'Striche']],
  es: [[/(?<!\p{L})punto/iu, 'ij', 'puntos'], [/(?<!\p{L})rayita/iu, 't', 'rayita'], [/(?<!\p{L})acento/iu, 'áéíóú', 'acentos']],
  pt: [[/(?<!\p{L})pingo/iu, 'ij', 'pingos'], [/(?<!\p{L})corte/iu, 't', 'cortes'], [/(?<!\p{L})acento/iu, 'áéíóúâêôãõà', 'acentos']],
  fr: [[/(?<!\p{L})points?(?!\p{L})/iu, 'ijïî', 'points'], [/(?<!\p{L})barres?(?!\p{L})/iu, 't', 'barres'], [/(?<!\p{L})accents?(?!\p{L})/iu, 'éèêëàâùûîïôç', 'accents']],
  it: [[/(?<!\p{L})puntin/iu, 'ij', 'puntini'], [/(?<!\p{L})tagliett/iu, 't', 'taglietti'], [/(?<!\p{L})accent/iu, 'àèéìòù', 'accenti']],
  nl: [[/(?<!\p{L})puntje/iu, 'ijë', 'puntjes'], [/(?<!\p{L})streepje/iu, 't', 'streepjes']],
  da: [[/(?<!\p{L})prik/iu, 'ij', 'prikker'], [/(?<!\p{L})streg/iu, 't', 'streger']],
  no: [[/(?<!\p{L})prikk/iu, 'ij', 'prikker'], [/(?<!\p{L})(tverr)?strek/iu, 't', 'tverrstreker']],
};
/** the mark classes an instruction names (locale table) */
function namedMarks(loc, instruction) { return (MARK_CLASSES[loc] || []).filter(([re]) => re.test(instruction || '')); }

/** the common face context: unit, level band, ruling kind, X, floor (a refusal THROWS) */
function faceContext(bankLoc, d, locale, unit) {
  if (!bankLoc || typeof bankLoc !== 'object') throw new Error(`${ID}: no ${locale} bank block`);
  if (bankLoc.refused) throw new Error(`${ID}: type refused in ${locale}: ${bankLoc.refused.reason || bankLoc.refused}`);
  if (!FACE_MODES.includes(d.mode)) throw new Error(`${ID}: unknown face mode "${d.mode}"`);
  const faceRef = bankLoc.refusedFaces && bankLoc.refusedFaces[d.mode];
  if (faceRef) throw new Error(`${ID}: face ${d.mode} refused in ${locale}: ${faceRef}`);
  const units = bankLoc.units || [];
  // exemplarByMode (optional, nt5-F de): a locale that ships TWO scripts publishes each face in ONE of them
  // (de: VA on base/joins/copy, LA on capitals/words/reading), so every face is one deck with no unit segment
  const u = unit || (bankLoc.exemplarByMode && bankLoc.exemplarByMode[d.mode]) || bankLoc.exemplar;
  if (!units.includes(u)) throw new Error(`${ID}: unit "${u}" is not a ${locale} unit (${units.join(', ') || 'none'})`);
  if (!NEUTRAL.units[u]) throw new Error(`${ID}: unit "${u}" is not a vendored Playwrite unit`);
  const band = bandOfLevel(locale, bankLoc.levels && bankLoc.levels[d.mode]);
  const kind = bankLoc.ruling && bankLoc.ruling[band];
  if (!SR.KINDS.includes(kind)) throw new Error(`${ID}: ${locale} ruling for ${band} is "${kind}"`);
  const floor = NEUTRAL.xFloor[band];
  const X = kind === 'seyes' && d.mode !== 'read' ? NEUTRAL.seyesI[band] : xFor(bankLoc, u, d.mode);
  if (!(X >= floor)) throw new Error(`${ID}: ${d.mode} X ${X} < the ${band} floor ${floor} (${locale} ${u})`);
  const scriptName = bankLoc.scriptName && bankLoc.scriptName[u];
  if (typeof scriptName !== 'string' || !scriptName.trim()) throw new Error(`${ID}: ${locale} has no scriptName for ${u}`);
  return { unit: u, band, kind, X, floor, scriptName, lift: NEUTRAL.units[u].lift, dashHelpers: !!bankLoc.dashHelpers, locale, mode: d.mode };
}

/**
 * one block's height at the minimum (§3 stacks): rows + 2 px between; a head (F5 strip 36 + 6); a Seyès slice.
 * Fix round 2 (landing audit): a face's Seyès slice is ALWAYS the closed shape (3 + 4·(rows − 1) + 2 interlines:
 * room above the model line, the writing lines, the descender room) — the open shape's trailing skipped line read
 * as a THIRD writing line (fr panel: "three lines" under an instruction naming two) and cost the page a whole item.
 */
function faceBlockH(c, geom, rows, head) {
  if (c.kind === 'seyes') return (head ? 42 : 0) + (3 + 4 * (rows - 1) + SEYES_FACE_TAIL) * c.X;
  return (head ? 36 + FACE_HEAD_GAP[0] : 0) + rows * geom.rowH + (rows - 1) * ROW_GAP;
}
/**
 * the minimum gap between two face blocks. F5 (copy): 6 px — the next sentence's printed strip is itself the
 * separator (fix round 2: the model block's third row must not cost nl its third sentence; the gap still grows
 * to 40 with the page's slack)
 */
function faceBlockGap(c) { return c.mode === 'copy' ? 6 : BLOCK_GAP; }
/** F5's strip → row A gap (ruled pages; a Seyès slice keeps its fixed 6): min 4 (fix round 2, the same nl budget), grows to 16 */
const FACE_HEAD_GAP = [4, 16];
/** `rows` = a number (every block) or a function of the block index (F5: the model block carries one more row) */
function faceStack(c, geom, n, rows, head, minH) {
  const gap = c.kind === 'seyes' ? 0 : faceBlockGap(c);
  const rowsOf = typeof rows === 'function' ? rows : () => rows;
  let h = TAG_H;
  for (let k = 0; k < n; k++) h += Math.max(minH || 0, faceBlockH(c, geom, rowsOf(k), head)) + (k ? gap : 0);
  return Math.round(h * 100) / 100;
}
/** the largest count ≤ target that fits 677 (THROWS under the face's floor count: refuse, never a thin page) */
function fitCount(c, geom, target, rows, head, minH, mode) {
  for (let n = target; n >= 1; n--) {
    const st = faceStack(c, geom, n, rows, head, minH);
    if (st <= STACK_MAX) {
      if (n < FACE_FLOOR_N[mode]) break;
      return { n, stack: st };
    }
  }
  throw new Error(`${ID}: ${c.locale} ${c.unit} ${mode}: fewer than ${FACE_FLOOR_N[mode]} items fit ${STACK_MAX} px at X ${c.X} (refuse)`);
}
/**
 * Fix round 2 (landing audit, en / de / es / fr / nl panels): a face carries NO closing practice rows. A ruled row
 * with no item above it is an orphan the instruction never mentions ("a fifth ruled block with no word and no
 * picture"). The slack under the items is spread over the growable gaps instead (each capped: no band > 40 px).
 */
function practiceFor(c, geom, stack) {
  return { k: 0, total: stack };
}

/** THE PAGE COLUMN of a ruled face: tag, blocks (growable gaps) — no practice rows (fix round 2) */
function faceColumn(c, mode, geom, blocks, practice, total, rootAttrs, count) {
  const seyes = c.kind === 'seyes';
  const gap = () => (seyes ? spacer(0, GAP_MAX.faceBlock) : spacer(faceBlockGap(c), GAP_MAX.faceBlock));
  const body = blocks.map((b, k) => (k ? gap() : '') + b).join('');
  if (practice) throw new Error(`${ID}: a face never carries closing practice rows (fix round 2: an orphan ruled row)`);
  const prac = '';
  return C6.cwFontFace(c.unit) +
    `<div class="cw-page" data-ws-content="" data-lcs-cw="" data-lcs-type="${ID}" data-lcs-face="${mode}" data-lcs-mode="${mode}" data-lcs-locale="${c.locale}"` +
    ` data-lcs-unit="${c.unit}" data-lcs-x="${c.X}" data-lcs-floor="${c.floor}" data-lcs-ruling="${c.kind}" data-lcs-stack="${total}" data-lcs-practice="${practice}"` +
    ` data-lcs-count="${count}" data-lcs-lift="${c.lift}"${rootAttrs || ''} style="display:flex;flex-direction:column;justify-content:flex-start;height:100%;width:${BODY_W}px;margin:0 auto">` +
    C6.cwScriptTag({ scriptName: c.scriptName, w: BODY_W }) + spacer(0, GAP_MAX.faceTag) + body + prac + `</div>`;
}

function geomFor(c, cap) { return c.kind === 'seyes' ? null : SR.rulingGeometry({ unit: c.unit, kind: c.kind, X: c.X, cap }); }
// a face's closed Seyès slice keeps THREE interlines under its last writing line (the descender band + one of air):
// with no closing practice rows the cahier needs that air at a one-line chrome (fix round 2), and a 4th would draw the
// next writing line (a third line under an instruction naming one)
const SEYES_FACE_TAIL = 3;
function seyesFor(c, rows, last) { return SR.seyesGeometry({ unit: c.unit, i: c.X, rows, last, tail: last ? SEYES_FACE_TAIL : 2 }); }
function wordText(v) { return typeof v === 'string' ? v : v && v.text; }

/** F1: distinct initials of the locale's names, in bank order, one name each */
function capitalsOf(names) {
  const out = [], seen = new Set();
  for (const nm of names || []) { const C = [...nm][0]; if (!seen.has(C)) { seen.add(C); out.push({ capital: C, name: nm }); } }
  return out;
}

/** a derangement of 0..n-1 that is NOT a constant shift (cyclic or plain): the partner is never "one down" */
/** order[k] = the word row whose picture stands on picture row k → each word row's distance to its partner */
function partnerDistances(order) { return order.map((w, k) => ({ w, k })).sort((a, b) => a.w - b.w).map(({ w, k }) => Math.abs(k - w)); }
/** the most partners sharing ONE cyclic offset (picture row − word row mod n): a partial constant shift */
const SHIFT_SHARE_MAX = 2;
function maxOffsetShare(order) {
  const n = order.length, count = {};
  order.forEach((w, k) => { const o = (k - w + n) % n; count[o] = (count[o] || 0) + 1; });
  return Math.max(0, ...Object.values(count));
}
function derangeOrder(n, rng) {
  for (let t = 0; t < DERANGE_TRIES; t++) {
    const p = rng.shuffle(Array.from({ length: n }, (_, i) => i));
    if (p.some((v, i) => v === i)) continue;
    const off = p.map((v, i) => (v - i + n) % n);
    if (off.every((o) => o === off[0])) continue;
    if (p.join(',') === Array.from({ length: n }, (_, i) => n - 1 - i).join(',')) continue;   // the reversal
    // POSITION TELL (fix round 1, da panel): three adjacent swaps put every partner exactly one row away. A word
    // row's partner stands at |pictureRow − wordRow|; at most ONE may stand at distance 1 (none at 0)
    if (partnerDistances(p).filter((d) => d === 1).length > 1) continue;
    // PARTIAL SHIFT (fix round 2, fr panel: lampe / cochon / cheval / souris all three rows down): no more than
    // SHIFT_SHARE_MAX partners may share one cyclic offset, or a child who finds one link guesses the next ones
    if (maxOffsetShare(p) > SHIFT_SHARE_MAX) continue;
    return p;
  }
  throw new Error(`${ID}: no admissible derangement of ${n} in ${DERANGE_TRIES} tries`);
}
/** F4 clash rule: ≥ 2 same-initial pairs and ≥ 1 of them within one letter of length (initial + length cannot solve it) */
function readClash(texts) {
  let same = 0, close = 0;
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
    const a = texts[i].toLocaleLowerCase(), b = texts[j].toLocaleLowerCase();
    if ([...a][0] === [...b][0]) { same++; if (Math.abs([...a].length - [...b].length) <= 1) close++; }
  }
  return { same, close, ok: same >= 2 && close >= 1 };
}

function buildFace(bankLoc, d, { locale, unit }, ctx) {
  const c = faceContext(bankLoc, d, locale, unit);
  const rng = ctx && ctx.rng;
  if (!rng) throw new Error(`${ID}: a face needs the seeded rng`);
  const mode = d.mode;
  const M = FACE_MARGIN[mode];
  const fsOf = (geom) => (c.kind === 'seyes' ? c.X / SR.metricsFor(c.unit).xHeight : geom.fs);
  if (mode === 'capitals') {
    const { SENTENCES } = require('../../data/b2/sentences.js');
    const pool = capitalsOf((SENTENCES[locale] || {}).names);
    if (pool.length < FACE_FLOOR_N.capitals) throw new Error(`${ID}: ${locale} names give ${pool.length} distinct capitals`);
    const geom = geomFor(c, true);
    const fit = fitCount(c, geom, Math.min(d.capitals || 5, pool.length), 2, false, 0, mode);
    const items = pool.slice(0, fit.n);
    const blocks = items.map((it, k) => C6.cwFaceBlock({
      unit: c.unit, kind: c.kind, geom, seyes: c.kind === 'seyes' ? seyesFor(c, 2, true) : null, w: BODY_W, marginX: M, writeRows: 1, dashHelpers: c.dashHelpers, blockIndex: k, rowGap: [ROW_GAP, GAP_MAX.faceRow],
      attrs: { capital: it.capital, name: it.name },
      rowAInner: (fs, yB) => C6.cwText({ unit: c.unit, text: it.capital, fs, yB, left: 0, width: M, align: 'center', role: 'model' }) +
        C6.cwRun({ unit: c.unit, fs, yB, left: M + 16, gap: 24, items: [{ text: it.capital + ' ' + it.capital, role: 'trace', attrs: { kind: 'capital-pair' } }, (d.nameTrace === false ? null : { text: it.name, role: 'trace', attrs: { kind: 'name' } })].filter(Boolean) }),
    }));
    const pr = practiceFor(c, geom, fit.stack);
    return { bodyHtml: faceColumn(c, mode, geom, blocks, pr.k, pr.total, ` data-lcs-capitals="${items.map((i) => i.capital).join('|')}"`, items.length), meta: { mode, unit: c.unit, items: items.map((i) => i.name), stack: fit.stack, total: pr.total, practice: pr.k } };
  }
  if (mode === 'joins') {
    const js = ((bankLoc.joins || {})[c.unit] || []).filter((j) => !c.lift.includes([...j.pair][0]) && !(ONE_LETTER_DIGRAPHS[locale] || []).includes(j.pair.toLocaleLowerCase(locale)));
    const geom = geomFor(c, false);
    const fit = fitCount(c, geom, Math.min(d.pairs || 5, js.length), 2, false, 0, mode);
    // seeded choice, bank order kept on the page
    const pickIdx = rng.sample(js.map((_, i) => i), fit.n).sort((a, b) => a - b);
    const items = pickIdx.map((i) => js[i]);
    const blocks = items.map((j, k) => C6.cwFaceBlock({
      unit: c.unit, kind: c.kind, geom, seyes: c.kind === 'seyes' ? seyesFor(c, 2, true) : null, w: BODY_W, marginX: M, writeRows: 1, dashHelpers: c.dashHelpers, blockIndex: k, rowGap: [ROW_GAP, GAP_MAX.faceRow],
      attrs: { pair: j.pair, word: j.word },
      rowAInner: (fs, yB) => C6.cwText({ unit: c.unit, text: j.pair, fs, yB, left: 0, width: M, align: 'center', role: 'model' }) +
        C6.cwRun({ unit: c.unit, fs, yB, left: M + 16, gap: 24, items: [{ text: j.pair + ' ' + j.pair, role: 'trace', attrs: { kind: 'pair' } }, (d.wordTrace === false ? null : { text: j.word, role: 'trace', attrs: { kind: 'word' } })].filter(Boolean) }),
    }));
    const pr = practiceFor(c, geom, fit.stack);
    return { bodyHtml: faceColumn(c, mode, geom, blocks, pr.k, pr.total, ` data-lcs-pairs="${items.map((j) => j.pair).join('|')}"`, items.length), meta: { mode, unit: c.unit, items: items.map((j) => j.pair), stack: fit.stack, total: pr.total, practice: pr.k } };
  }
  if (mode === 'words') {
    const dots = DOT_CROSS[locale] || '';
    const pairs = ((bankLoc.joins || {})[c.unit] || []).map((j) => j.pair);
    const all = Object.entries(bankLoc.words || {}).map(([key, v]) => ({ key, text: wordText(v) }))
      .filter((w) => NEUTRAL.pictures.includes(w.key) && !NEUTRAL.excludePictures.includes(w.key) && [...w.text].length <= (d.maxLetters || 8));
    const cap = all.some((w) => /^\p{Lu}/u.test(w.text));
    const geom = geomFor(c, cap);
    const fit = fitCount(c, geom, d.words || 4, 2, false, 72, mode);
    const hasDot = (t) => [...t.toLocaleLowerCase()].some((ch) => dots.includes(ch));
    const hasJoin = (t) => pairs.some((p) => t.toLocaleLowerCase().includes(p));
    // every mark class the locale's own instruction names must be carried by ≥ 1 word (fix round 2)
    const marks = namedMarks(locale, ((bankLoc.strings || {})['G2-386'] || {}).instruction);
    const carries = (t, letters) => [...t.toLocaleLowerCase()].some((ch) => letters.includes(ch));
    let items = null;
    for (let t = 0; t < 400 && !items; t++) {
      const s = rng.sample(all, fit.n);
      if (s.filter((w) => hasDot(w.text)).length >= 2 && s.some((w) => hasJoin(w.text)) && marks.every(([, letters]) => s.some((w) => carries(w.text, letters)))) items = s;
    }
    if (!items) throw new Error(`${ID}: ${locale} words: no ${fit.n}-word set with ≥ 2 dot / cross words, ≥ 1 join word and every mark the instruction names (${marks.map((m) => m[2]).join(', ') || 'none'}) (refuse)`);
    const B2 = require('../../lib/b2-common.js');
    const blocks = items.map((w, k) => {
      const [theme, noun] = w.key.split('/');
      const src = B2.fileUri(theme, noun);
      return C6.cwFaceBlock({
        unit: c.unit, kind: c.kind, geom, seyes: c.kind === 'seyes' ? seyesFor(c, 2, true) : null, w: BODY_W, marginX: M, writeRows: 1, dashHelpers: c.dashHelpers, blockIndex: k, rowGap: [ROW_GAP, GAP_MAX.faceRow],
        attrs: { word: w.key, text: w.text },
        overlay: C6.cwPictureTile({ src, key: w.key, top: c.kind === 'seyes' ? 0 : null }),
        rowAInner: (fs, yB) => C6.cwRun({ unit: c.unit, fs, yB, left: M + 12, gap: 24, items: [(d.modelWord === false ? null : { text: w.text, role: 'model', attrs: { kind: 'word-model' } }), { text: w.text, role: 'trace', attrs: { kind: 'word' } }].filter(Boolean) }),
      });
    });
    const pr = practiceFor(c, geom, fit.stack);
    return { bodyHtml: faceColumn(c, mode, geom, blocks, pr.k, pr.total, ` data-lcs-words="${items.map((w) => w.key).join('|')}"`, items.length), meta: { mode, unit: c.unit, items: items.map((w) => w.text), stack: fit.stack, total: pr.total, practice: pr.k } };
  }
  if (mode === 'copy') {
    const ss = (bankLoc.sentences || []).slice();
    const geom = geomFor(c, true);
    const fs = fsOf(geom);
    const room = BODY_W - FACE_MARGIN.copy - 16 - 8;
    const fits = ss.filter((s) => [...s].length * 0.62 * fs <= room);
    const under = d.modelUnder || 'first';
    const hasModel = (k) => under === 'all' || (under === 'first' && k === 0);
    // fix round 2 (en / de / es / fr landing panels): the instruction promises TWO lines to copy on under every
    // sentence; the grey model takes row A of its block, so a model block carries three rows (A + two free)
    const rowsOf = (k) => (hasModel(k) ? 3 : 2);
    const fit = fitCount(c, geom, Math.min(d.sentences || 3, fits.length), rowsOf, true, 0, mode);
    const items = rng.sample(fits, fit.n);
    const blocks = items.map((s, k) => {
      const model = under === 'all' || (under === 'first' && k === 0);
      return C6.cwFaceBlock({
        unit: c.unit, kind: c.kind, geom, seyes: c.kind === 'seyes' ? seyesFor(c, rowsOf(k), true) : null, w: BODY_W, marginX: FACE_MARGIN.copy, writeRows: rowsOf(k) - 1, dashHelpers: c.dashHelpers, blockIndex: k, rowGap: [ROW_GAP, GAP_MAX.faceRow],
        attrs: { sentence: s, model: model ? '1' : '0' },
        head: C6.cwSentenceStrip({ text: s, w: BODY_W, marginX: FACE_MARGIN.copy }), headGap: FACE_HEAD_GAP,
        rowAInner: (f, yB) => (model ? C6.cwRun({ unit: c.unit, fs: f, yB, left: FACE_MARGIN.copy + 16, gap: 0, items: [{ text: s, role: 'trace', attrs: { kind: 'sentence' } }] }) : ''),
      });
    });
    const pr = practiceFor(c, geom, fit.stack);
    return { bodyHtml: faceColumn(c, mode, geom, blocks, pr.k, pr.total, ` data-lcs-model-under="${under}"`, items.length), meta: { mode, unit: c.unit, items, stack: fit.stack, total: pr.total, practice: pr.k } };
  }
  // read (F4): no ruling — word cards against picture tiles
  const m = SR.metricsFor(c.unit);
  const fs = c.X / m.xHeight;
  const ratio = (m.ascender + m.descender) / m.xHeight;
  const minH = Math.max(76, Math.ceil(ratio * c.X) + 10);
  const n = d.pairs || 6;
  const stack = TAG_H + n * minH + (n - 1) * 12;
  if (stack > STACK_MAX) throw new Error(`${ID}: ${locale} read: ${n} cards at ${minH} px = ${stack} > ${STACK_MAX} (refuse)`);
  const all = Object.entries(bankLoc.words || {}).map(([key, v]) => ({ key, text: wordText(v) }))
    .filter((w) => NEUTRAL.pictures.includes(w.key) && !NEUTRAL.excludePictures.includes(w.key) && [...w.text].length <= 8);
  let items = null;
  for (let t = 0; t < 2000 && !items; t++) {
    const s = rng.sample(all, n);
    if (readClash(s.map((w) => w.text)).ok) items = s;
  }
  if (!items) throw new Error(`${ID}: ${locale} read: no ${n}-word set with 2 same-initial pairs (refuse)`);
  const order = derangeOrder(n, rng);   // picture row k shows the partner of word order[k]
  const B2 = require('../../lib/b2-common.js');
  const pics = order.map((i) => { const [theme, noun] = items[i].key.split('/'); return { key: items[i].key, src: B2.fileUri(theme, noun) }; });
  const maxH = Math.floor((814 - TAG_H - (n - 1) * 12) / n);
  const match = C6.cwReadMatch({ unit: c.unit, fs, words: items, pics, minH, maxH, gap: 12 });
  const html = C6.cwFontFace(c.unit) +
    `<div class="cw-page" data-ws-content="" data-lcs-cw="" data-lcs-type="${ID}" data-lcs-face="read" data-lcs-mode="read" data-lcs-locale="${locale}"` +
    ` data-lcs-unit="${c.unit}" data-lcs-x="${c.X}" data-lcs-floor="${c.floor}" data-lcs-ruling="none" data-lcs-stack="${stack}" data-lcs-practice="0" data-lcs-count="${n}" data-lcs-lift="${c.lift}"` +
    ` data-lcs-order="${order.join(',')}" style="display:flex;flex-direction:column;justify-content:flex-start;height:100%;width:${BODY_W}px;margin:0 auto">` +
    C6.cwScriptTag({ scriptName: c.scriptName, w: BODY_W }) + match + `</div>`;
  return { bodyHtml: html, meta: { mode, unit: c.unit, items: items.map((w) => w.text), order, stack } };
}

/** the node-side expectations a face's browser verify re-derives against (the bank literals) */
function faceVerifyData(bankLoc, loc, mode, unit) {
  const { SENTENCES } = require('../../data/b2/sentences.js');
  return {
    mode, dots: DOT_CROSS[loc] || '',
    names: (SENTENCES[loc] || {}).names || [],
    joins: (bankLoc.joins || {})[unit] || [],
    words: Object.fromEntries(Object.entries(bankLoc.words || {}).map(([k, v]) => [k, wordText(v)])),
    sentences: bankLoc.sentences || [],
    pictures: NEUTRAL.pictures, exclude: NEUTRAL.excludePictures,
    lift: (NEUTRAL.units[unit] || {}).lift || '',
    shiftShareMax: SHIFT_SHARE_MAX,
    oneLetter: ONE_LETTER_DIGRAPHS[loc] || [],
    marks: (MARK_CLASSES[loc] || []).map(([re, letters, what]) => [re.source, re.flags, letters, what]),
  };
}

const TYPE = {
  id: ID,
  slug: KEY,
  gradeBand: 'G2',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: (loc) => { const b = loadBank(KEY, String(loc).slice(0, 2)); return (b.units || []).slice(); },
    // the face's own mode picks its script when the locale ships two (de: VA on base/joins/copy, LA on capitals/words/read) —
    // the title token must name the script the page is written in, never the locale default
    exemplar: (loc, spec) => {
      const b = loadBank(KEY, String(loc).slice(0, 2));
      const m = spec && spec.difficulty && spec.difficulty[2] && spec.difficulty[2].mode;
      return (b.exemplarByMode && m && b.exemplarByMode[m]) || b.exemplar;
    },
    // {U} = the unit's native name (de titles only, §1); never the raw unit id
    tokens: (unit, loc) => {
      const b = loadBank(KEY, String(loc).slice(0, 2));
      const name = (b.unitLabel && b.unitLabel[unit]) || (b.scriptName && b.scriptName[unit]);
      if (!name) throw new Error(`${ID}: ${loc} has no unitLabel / scriptName for ${unit}`);
      return { U: name, L: name.toLocaleLowerCase(loc), UNIT: unit };
    },
  },
  difficulty: {
    // d1 keeps the WHOLE lesson (the sheet's title names its letters) at a larger X where it fits
    1: { mode: 'base', lesson: 0, letters: 'all', chains: 2, writeRows: [1], xDelta: [2, 0] },
    2: { mode: 'base', lesson: 0, letters: 'all', chains: 2, writeRows: [2, 1], xDelta: 0 },
    3: { mode: 'base', lesson: 0, letters: 'all', chains: 1, writeRows: [2, 1], xDelta: 0 },
  },
  i18n: {
    en: {
      title: 'Cursive Letters: i, t, u and w',
      instruction: 'Trace the grey letters, then keep writing each letter joined on your own to the end of its line and on the empty line below.',
    },
  },
  resolvePage,
  stackOf,
  FACE_MODES,
  derangeOrder,
  partnerDistances,
  maxOffsetShare,
  SHIFT_SHARE_MAX,
  readClash,

  build({ difficulty, locale, unit }) {
    const loc = String(locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    if (NEUTRAL.refusedLocales[loc]) throw new Error(`${ID}: type refused in ${loc}: no national joined script (${NEUTRAL.refusedLocales[loc]})`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc, unit }, arguments[1]);
  },

  /** the whole build over an INJECTED bank block (the gate's poison / probe seam) */
  _buildWith(bankLoc, d, { locale, unit }, ctx) {
    // a face config dispatches BEFORE the base path, so the base (mode 'base') is byte-identical
    if (d && d.mode !== 'base' && FACE_MODES.includes(d.mode)) return buildFace(bankLoc, d, { locale, unit }, ctx);
    const p = resolvePage(bankLoc, d, locale, unit);
    return {
      bodyHtml: composeBody(p, locale),
      meta: { mode: 'base', unit: p.unit, ruling: p.kind, X: p.X, letters: p.letters, writeRows: p.writeRows, chains: p.chains, stack: p.stack, fs: p.geom ? p.geom.fs : null, rowH: p.geom ? p.geom.rowH : null },
    };
  },

  async verify(page) {
    const info = await page.evaluate((ID) => { const r = document.querySelector(`[data-lcs-cw][data-lcs-type="${ID}"]`); return r ? { loc: r.dataset.lcsLocale, face: r.dataset.lcsFace, unit: r.dataset.lcsUnit } : null; }, ID);
    let face = null;
    if (info && info.face && info.face !== 'base') {
      try { face = faceVerifyData(TYPE._verifyBank ? TYPE._verifyBank(info.loc) : loadBank(KEY, info.loc), info.loc, info.face, info.unit); } catch (e) { return [`${ID}: ${e.message}`]; }
    }
    const fails = await page.evaluate(browserVerify, { ID, STACK_MAX, ink: hexToRgb(color.ink), grid: hexToRgb(color.grid), face });
    if (fails.length && /no cursive root/.test(fails[0])) return fails;
    return fails.concat(await rasterVerify(page));
  },
};
function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`; }
TYPE._browserVerify = browserVerify;
TYPE._rasterVerify = rasterVerify;
/** the G2-386 mark classes of a locale as [source, flags, letters, label] (the bank gate reads the same table) */
TYPE.ONE_LETTER_DIGRAPHS = ONE_LETTER_DIGRAPHS;
TYPE._markClasses = (loc) => (MARK_CLASSES[loc] || []).map(([re, letters, what]) => [re.source, re.flags, letters, what]);

module.exports = TYPE;
