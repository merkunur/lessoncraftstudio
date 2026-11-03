/**
 * G2-480 — My Words in Cursive (Cursive Handwriting maker 2026-11-02, NEW-TEMPLATES §35 T1): the teacher's own
 * spelling words or sentences in the locale's school script. The teacher types the items (free-text slots: a word up to
 * 12 characters, a sentence up to 40, written as typed); until she does, the page shows the locale's own cursive words /
 * sentences, the list walked by copy. Built on G2-377's face machinery (G2-377._cw): the locale's unit and school
 * ruling (us3 / lin4 / Seyès / doble), ONE HTML text node per grey line in exactly one Playwrite unit. A typed item is
 * refused (the page keeps its own item and the maker says it does not fit) when it holds a character the locale's
 * cursive pages never print (lib/cursive-coverage.js) or does not fit its line at the page's letter size
 * (primitives/cursive-advances.json) — never a fallback glyph, never a squeezed line.
 * Levels: 1 a spelling list — one school line per word: the word printed in the margin, traced in grey, then written
 * again beside it · 2 sentences: printed on a strip, traced on the first line, written on the line below · 3 sentences:
 * printed on a strip, written on the two lines below (from print to joined writing, no grey line). Each page holds as
 * many items as its ruling fits (the first sentence gets one more line when the page has room).
 * Budget: a maker page whose title is at most 3 lines (the maker's rule) and never offered in fi (whose 4-line titles set
 * the family's 677): 700 px, less the px a teacher's longer title or instruction takes (ctx.chromeExtra, fitsChrome).
 * Offered where the locale has a joined school script (sv / fi refused by data, like the family).
 */
'use strict';
const G = require('./G2-377-cursive-writing.js');
const C6 = require('../../templates/components-b6.js');
const SR = require('../../primitives/school-ruling.js');
const slot = require('../../lib/slot.js');
const { coverageOf, uncovered } = require('../../lib/cursive-coverage.js');
const { color } = require('../../primitives/_tokens.js');
const ADV = require('../../primitives/cursive-advances.json');
const CW = G._cw;
const ID = 'G2-480';

const D = {
  1: { kind: 'words', ctxMode: 'words', n: 9, free: 0, max: 12, floor: 4 },
  2: { kind: 'sentences', ctxMode: 'copy', n: 4, free: 1, max: 40, floor: 2 },
  3: { kind: 'sentences', ctxMode: 'copy', n: 4, free: 2, max: 40, floor: 2 },
};
const BUDGET = 700, STRIP_MARGIN = 76, WORD_MARGIN = 168, LEFT_PAD = 16, FIT_SAFETY = 1.08;

/** the width (px) one grey node of `text` takes at fs: the measured advances + the word space the component adds */
function widthOf(unit, text, fs) {
  const a = ADV[unit];
  if (!a) throw new Error(`${ID}: primitives/cursive-advances.json has no unit ${unit} (node tools/measure-cursive-advances.js)`);
  let em = 0;
  for (const ch of text) { if (a[ch] == null) return Infinity; em += a[ch]; }
  const spaces = (text.match(/\s/g) || []).length;
  return (em + spaces * C6.cwWordSpaceEm(unit)) * fs * FIT_SAFETY;
}

/** the locale's own items, in bank order (words: letters only; sentences: the bank + its level-set sentences) */
function defaultsOf(bankLoc, ls, kind) {
  if (kind === 'words') return [...new Set(Object.values(bankLoc.words || {}).map(CW.wordText).filter((w) => w && /^\p{L}+$/u.test(w)))];
  return [...new Set((bankLoc.sentences || []).concat(((ls && ls.sentencesMore) || []).map((x) => x.text)))];
}

const defaultUnit = (b) => (b.exemplarByMode && b.exemplarByMode.copy) || b.exemplar;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

module.exports = {
  id: ID,
  slug: 'my-words-in-cursive',
  gradeBand: 'G2',
  assetClass: 'geometry',
  exerciseType: 'cursive-writing',
  themeAxis: { applicable: false },
  // one script on every level: the copy face's (de: VA); a teacher picks the other one from the script setting
  unitAxis: { ...G.unitAxis, exemplar: (loc) => defaultUnit(CW.loadBank(CW.KEY, String(loc).slice(0, 2))) },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'My Words in Cursive', instruction: 'Read each sentence. Trace it in cursive, joining the letters, then write it on your own on the line below.' } },

  build({ difficulty, locale, unit }, ctx0) {
    const ctx = ctx0 || {};
    const d = D[difficulty] || D[2], loc = String(locale || 'en').slice(0, 2);
    if (CW.NEUTRAL.refusedLocales[loc]) throw new Error(`${ID}: refused in ${loc}: no national joined school script (${CW.NEUTRAL.refusedLocales[loc]})`);
    const bankLoc = CW.loadBank(CW.KEY, loc), ls = CW.levelSetData(loc);
    // the letter size + ruling of the borrowed face; blocks laid out as the copy face's (6 px gaps)
    const c = { ...CW.faceContext(bankLoc, { mode: d.ctxMode }, loc, unit || defaultUnit(bankLoc)), typeId: ID, mode: 'copy' };
    // the letter size does not depend on capitals (fs = X / xHeight); the ruling's headroom does — set once the items are known
    const fs = c.X / SR.metricsFor(c.unit).xHeight;
    const words = d.kind === 'words';
    const margin = words ? WORD_MARGIN : STRIP_MARGIN;
    const room = CW.BODY_W - margin - LEFT_PAD - 8;
    // a word line holds the grey word AND room to write it again (its own width + 24); a sentence line holds the sentence
    const fits = (t) => (words ? 2 * widthOf(c.unit, t, fs) + 24 : widthOf(c.unit, t, fs)) <= room && [...t].length <= d.max;
    const cov = coverageOf(bankLoc, ls, ((require('../../data/b2/sentences.js').SENTENCES[loc]) || {}).names);
    const pool = defaultsOf(bankLoc, ls, d.kind).filter((t) => !uncovered(t, cov).length && fits(t));
    // the most items the budget holds; then one more empty line under the FIRST sentence when the same count still fits
    const budget = BUDGET - ((ctx && ctx.chromeExtra) || 0);
    // a sentence keeps two lines on both levels: L2 the grey line + one empty, L3 two empty (no grey line)
    const base = words ? 1 : 2;
    // the ruling's headroom: a capital on the page needs capital room (the published words face's rule) — planned on the
    // locale's own items, widened below if a typed item brings a capital to a page of small letters
    const hasCap = (ts) => ts.some((t) => /\p{Lu}/u.test(t));
    let geom = CW.geomFor(c, hasCap(pool));
    let n = Math.min(d.n, pool.length);
    while (n >= d.floor && CW.faceStack(c, geom, n, base, !words, 0) > budget) n--;
    if (n < d.floor) throw new Error(`${ID}: ${loc} ${c.unit}: fewer than ${d.floor} ${d.kind} fit ${budget} px (refuse)`);
    const extra = !words && CW.faceStack(c, geom, n, (k) => (k === 0 ? base + 1 : base), true, 0) <= budget;
    const rowsOf = (k) => (extra && k === 0 ? base + 1 : base);
    const copy = Math.max(1, parseInt(String(ctx.variant || 1), 10) || 1);
    const start = ((copy - 1) * n) % pool.length;
    // the page's own items, walked from the copy's start; two sentences ending alike ("Sola skinner i dag." beside "Det regner
    // i dag.") would contradict or echo each other, so the later one waits for another page (review 2026-11-02)
    const tail = (t) => t.toLocaleLowerCase(loc).replace(/[.!?]+$/, '').split(/\s+/).slice(-2).join(' ');
    const defaults = [];
    for (let j = 0; defaults.length < n && j < pool.length; j++) {
      const t = pool[(start + j) % pool.length];
      if (words || !defaults.some((x) => tail(x) === tail(t))) defaults.push(t);
    }
    for (let j = 0; defaults.length < n && j < pool.length; j++) { const t = pool[(start + j) % pool.length]; if (!defaults.includes(t)) defaults.push(t); }
    const items = [];
    for (let i = 0; i < n; i++) {
      const own = defaults[i];
      let t = slot.text(ctx, own, 'item' + i, d.max);
      // refused: a character the school script was never shown to draw, too long for its line, no letter, or already on the page
      if (uncovered(t, cov).length || !fits(t) || !/\p{L}/u.test(t) || items.includes(t)) { if (t !== own) slot.refuse(ctx, 'item' + i); t = own; }
      items.push(t);
    }
    if (geom && !geom.cap && hasCap(items)) {
      geom = CW.geomFor(c, true);
      // the taller ruling may hold one item less: the last ones leave the page (never a squeezed or clipped line)
      while (items.length > d.floor && CW.faceStack(c, geom, items.length, rowsOf, !words, 0) > budget) items.pop();
    }
    n = items.length;
    const stackFinal = CW.faceStack(c, geom, n, rowsOf, !words, 0);
    if (stackFinal > budget) throw new Error(`${ID}: ${loc} ${c.unit}: ${n} ${d.kind} need ${stackFinal} px > ${budget} (refuse)`);
    const blocks = items.map((t, k) => {
      const rows = rowsOf(k);
      const grey = d.free === 2 ? null : { text: t, role: 'trace', attrs: { kind: 'own' } };
      // the word's printed form in the margin cell, on the line's baseline (a raster-hidden strip: not cursive ink)
      const label = (yB) => `<span class="cw-strip" data-lcs-print="${esc(t)}" style="position:absolute;left:4px;top:${Math.round(yB - 15)}px;width:${margin - 16}px;height:20px;line-height:18px;font-family:'Nunito';font-weight:800;font-size:18px;color:${color.ink};white-space:nowrap;overflow:hidden;background:transparent">${esc(t)}</span>`;
      const html = C6.cwFaceBlock({
        unit: c.unit, kind: c.kind, geom, seyes: c.kind === 'seyes' ? CW.seyesFor(c, rows, true) : null, w: CW.BODY_W, marginX: margin,
        writeRows: rows - 1, dashHelpers: c.dashHelpers, blockIndex: k, rowGap: [CW.ROW_GAP, CW.GAP_MAX.faceRow],
        attrs: { item: t, rows },
        ...(words ? {} : { head: C6.cwSentenceStrip({ text: t, w: CW.BODY_W, marginX: margin }), headGap: CW.FACE_HEAD_GAP }),
        rowAInner: (f, yB) => (words ? label(yB) : '') + (grey ? C6.cwRun({ unit: c.unit, fs: f, yB, left: margin + LEFT_PAD, gap: 0, items: [grey] }) : ''),
      });
      // the typed item is a slot of the page: its block carries the tap target
      return html.replace('class="cw-block"', `class="cw-block"${slot.attr(ctx, 'item' + k, 0)}`);
    });
    const body = CW.faceColumn(c, 'own', geom, blocks, 0, stackFinal, ` data-lcs-own-kind="${d.kind}" data-lcs-free="${d.free}" data-lcs-budget="${budget}"${d.free === 2 ? ' data-lcs-model-under="none"' : ''}`, items.length);
    return { bodyHtml: body, meta: { items, unit: c.unit, stack: stackFinal } };
  },

  async verify(page) {
    const info = await page.evaluate(() => { const r = document.querySelector('[data-lcs-cw][data-lcs-type="G2-480"]'); return r ? { budget: +r.dataset.lcsBudget } : null; });
    if (!info) return [`${ID}: no cursive root`];
    // the family's DOM half: one face, one text node per grey line, the unit's own widths (no fallback glyph), stack, bands
    const fails = await page.evaluate(CW.browserVerify, { ID, STACK_MAX: info.budget, ink: CW.hexToRgb(color.ink), grid: CW.hexToRgb(color.grid), face: { mode: 'own', freeLines: null } });
    const own = await page.evaluate(() => {
      const out = [];
      const root = document.querySelector('[data-lcs-cw]'), kind = root.dataset.lcsOwnKind, free = +root.dataset.lcsFree;
      const blocks = [...root.querySelectorAll('.cw-block')];
      if (blocks.length < 2) out.push(`${blocks.length} items`);
      const seen = new Set();
      blocks.forEach((b, k) => {
        const t = b.dataset.lcsItem, print = b.querySelector('[data-lcs-print]');
        if (!print || print.textContent !== t) out.push(`item ${k + 1}: printed "${print && print.textContent}" ≠ "${t}"`);
        const grey = [...b.querySelectorAll('[data-lcs-cursive][data-lcs-kind="own"]')];
        if (grey.length !== (free === 2 ? 0 : 1) || grey.some((g) => g.textContent !== t)) out.push(`item ${k + 1}: ${grey.length} grey lines of "${t}"`);
        const rows = [...b.querySelectorAll('.cw-row')], empty = rows.filter((r) => !r.querySelector('[data-lcs-cursive]')).length;
        // a word: its one line holds the grey word and room to write it again; a sentence: the free lines its level names
        if (kind === 'words') {
          const row = rows[0].getBoundingClientRect(), g = grey[0] && grey[0].getBoundingClientRect();
          if (g && row.right - g.right < g.width + 20) out.push(`item ${k + 1}: no room on the line to write "${t}" again`);
          if (print && print.scrollWidth > print.clientWidth + 1) out.push(`item ${k + 1}: the printed word is cut in the margin`);
        } else if (empty < free || empty > free + 1) out.push(`item ${k + 1}: ${empty} empty lines (the level names ${free})`);
        grey.forEach((g) => { if (g.getBoundingClientRect().right > rows[0].getBoundingClientRect().right - 4) out.push(`item ${k + 1}: the grey line runs past its row`); });
        if (seen.has(t)) out.push(`"${t}" twice`); seen.add(t);
      });
      return out;
    });
    const all = fails.concat(own.map((f) => `${ID}: ${f}`));
    if (page.live) return all;
    return all.concat(await CW.rasterVerify(page, { ID }));
  },
};
