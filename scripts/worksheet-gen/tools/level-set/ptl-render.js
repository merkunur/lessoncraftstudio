#!/usr/bin/env node
/**
 * ptl-render.js <locale> [--face=K-419,…] [--units=ptx-a,ptx-b] — render the Picture Tracing Level Set copies (data/ptx) through
 * the REAL page shell (render/render-instance.js with the copy's unit + level, its copyStrings) into out/ptl/<loc>/<unit>.png,
 * print one line per copy (QA verdict + traced length + smallest picture), and write one sheet per face —
 * out/ptl/<loc>/_sheet-<face>.png: the published core page first, then the 15 copies by level (L1 · L2 · L3), labelled — for
 * the human read (every page is read before publishing).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const puppeteer = require('puppeteer'); const sharp = require('sharp');
const { renderInstance } = require('../../render/render-instance.js');
const { loadType } = require('../../lib/load-types.js');
const { resolveStrings } = require('../../i18n/strings.js');
const { catalog } = require('../../lib/ptx.js');
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const loc = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'en';
const faces = arg('face').split(',').filter(Boolean), unitsOnly = arg('units').split(',').filter(Boolean);
const out = path.join(__dirname, '..', '..', 'out', 'ptl', loc); fs.mkdirSync(out, { recursive: true });
const pub = path.join(__dirname, '..', '..', 'out', 'b9', loc);
(async () => {
  const all = [...catalog().values()].filter((e) => (!faces.length || faces.includes(e.face)) && (!unitsOnly.length || unitsOnly.includes(e.id)));
  const browser = await puppeteer.launch({ headless: 'new' }); const page = await browser.newPage();
  let bad = 0;
  try {
    for (const e of all) {
      const type = loadType(e.face);
      let s0; try { s0 = resolveStrings(type.id, loc, type); } catch (x) { s0 = undefined; }
      // before a locale's names are authored the copy strings refuse; the preview then keeps the published strings (marked)
      let strings = s0, draft = '';
      if (type.copyStrings && s0) try { strings = type.copyStrings(s0, { locale: loc, difficulty: e.level, unit: e.id }); } catch (x) { draft = ' [DRAFT TEXT: ' + String(x.message).slice(0, 60) + ']'; }
      try {
        const r = await renderInstance({ type, theme: null, difficulty: e.level, locale: loc, unit: e.id, strings, page, outDir: out, baseName: e.id });
        // the printed heading holds on at most 2 lines, the instruction on at most 3 and without a widow (measured on the rendered page: a
        // character cap only approximates this, and a lead sentence + an eight-part list is legitimately long)
        const lines = await page.evaluate(() => {
          const rows = (el) => { const by = new Map(); if (!el) return by; const rg = document.createRange(); rg.selectNodeContents(el);
            for (const q of rg.getClientRects()) { if (q.width <= 1) continue; const k = Math.round(q.top); const r = by.get(k) || [Infinity, -Infinity]; by.set(k, [Math.min(r[0], q.left), Math.max(r[1], q.right)]); } return by; };
          const ins = rows(document.querySelector('[data-lcs-instruction]')); const w = [...ins.values()].map((r) => r[1] - r[0]);
          return { title: rows(document.querySelector('.ws-title')).size, instr: ins.size, lastFill: w.length ? w[w.length - 1] / Math.max(...w) : 0 };
        });
        const fails = [...r.qa.lints, ...r.qa.verify];
        if (lines.title > 2) fails.push('heading on ' + lines.title + ' lines');
        // an eight-part list may take a third line, never a widow (a last line under 30 % of the longest)
        if (lines.instr > 3) fails.push('instruction on ' + lines.instr + ' lines');
        if (lines.instr > 1 && lines.lastFill < 0.3) fails.push('instruction widow (' + Math.round(lines.lastFill * 100) + ' % last line)');
        if (!lines.title || !lines.instr) fails.push('heading/instruction not measured');
        if (fails.length) bad++;
        const m = (r.meta && r.meta.metrics) || {};
        console.log(e.id.padEnd(40), 'L' + e.level, fails.length ? 'FAIL ' + fails.slice(0, 3).join(' | ') : 'ok', (m.tracedLen != null ? 'len ' + m.tracedLen + ' minPic ' + m.minPic : '') + draft);
      } catch (x) { bad++; console.log(e.id.padEnd(40), 'L' + e.level, 'ERROR ' + String(x.message || x).slice(0, 220)); }
    }
  } finally { await browser.close(); }
  // one sheet per face: published core page + the copies by level, each labelled
  const byFace = {}; for (const e of all) (byFace[e.face] = byFace[e.face] || []).push(e);
  const T = 300, H = Math.round(T * 1.414), COLS = 4, LAB = 26;
  for (const [face, list] of Object.entries(byFace)) {
    list.sort((a, b) => a.level - b.level || a.id.localeCompare(b.id));
    const cells = [{ f: path.join(pub, face + '.png'), label: face + ' published (L2)' }, ...list.map((e) => ({ f: path.join(out, e.id + '.png'), label: 'L' + e.level + ' ' + e.id.replace(/^ptx-[^-]+-[^-]+-/, '') }))].filter((c) => fs.existsSync(c.f));
    const tiles = await Promise.all(cells.map(async (c) => {
      const img = await sharp(c.f).resize(T, H, { fit: 'contain', background: '#fff' }).png().toBuffer();
      const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${T}" height="${LAB}"><rect width="100%" height="100%" fill="#222"/><text x="6" y="18" font-family="Arial" font-size="14" fill="#fff">${c.label.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text></svg>`);
      return sharp({ create: { width: T, height: H + LAB, channels: 3, background: '#fff' } }).composite([{ input: svg, left: 0, top: 0 }, { input: img, left: 0, top: LAB }]).png().toBuffer();
    }));
    const comp = tiles.map((b, i) => ({ input: b, left: (i % COLS) * (T + 8), top: Math.floor(i / COLS) * (H + LAB + 8) }));
    await sharp({ create: { width: COLS * (T + 8), height: Math.ceil(tiles.length / COLS) * (H + LAB + 8), channels: 3, background: '#bbb' } }).composite(comp).png().toFile(path.join(out, '_sheet-' + face + '.png'));
  }
  console.log(bad ? `${bad} copy(ies) with findings` : 'all clean');
  process.exitCode = bad ? 1 : 0;
})().catch((e) => { console.error(e); process.exit(1); });
