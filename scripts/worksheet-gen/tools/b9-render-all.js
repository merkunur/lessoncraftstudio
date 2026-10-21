#!/usr/bin/env node
/**
 * b9-render-all.js <locale> [--only=K-419,…] — render every Picture Tracing face (K-418 + the 19 faces) for one locale
 * through the REAL page shell (render/render-instance.js: title, instruction, body, footer, the QA lints and the
 * type's verify) into out/b9/<locale>/<id>.{png,pdf}, one browser, and print one line per face: QA verdict + metrics.
 * Then a contact sheet out/b9/<locale>/_sheet.png (5 × 4 pages) for the human read.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const puppeteer = require('puppeteer'); const sharp = require('sharp');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { FACES } = require('../data/b9/picture-tracing.js');
const loc = process.argv[2] || 'en';
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const out = path.join(__dirname, '..', 'out', 'b9', loc); fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const ids = Object.values(FACES).map((f) => f.id).filter((id) => !only.length || only.includes(id));
  let bad = 0;
  try {
    for (const id of ids) {
      const type = loadType(id);
      let strings; try { strings = require('../i18n/strings.js').resolveStrings(type.id, loc, type); } catch (e) { strings = undefined; }
      try {
        const r = await renderInstance({ type, theme: null, difficulty: 2, locale: loc, strings, page, outDir: out, baseName: id });
        const fails = [...r.qa.lints, ...r.qa.verify];
        if (fails.length) bad++;
        console.log(id.padEnd(7), fails.length ? 'FAIL ' + fails.slice(0, 3).join(' | ') : 'ok');
      } catch (e) { bad++; console.log(id.padEnd(7), 'ERROR ' + String(e.message || e).slice(0, 200)); }
    }
  } finally { await browser.close(); }
  // contact sheet
  const pngs = ids.map((id) => path.join(out, id + '.png')).filter((f) => fs.existsSync(f));
  if (pngs.length) {
    const T = 360, H = Math.round(T * 1.414), COLS = 5;
    const tiles = await Promise.all(pngs.map((f) => sharp(f).resize(T, H, { fit: 'contain', background: '#fff' }).extend({ top: 2, bottom: 2, left: 2, right: 2, background: '#888' }).png().toBuffer()));
    const comp = tiles.map((b, i) => ({ input: b, left: (i % COLS) * (T + 8), top: Math.floor(i / COLS) * (H + 8) }));
    await sharp({ create: { width: COLS * (T + 8), height: Math.ceil(tiles.length / COLS) * (H + 8), channels: 3, background: '#ccc' } }).composite(comp).png().toFile(path.join(out, '_sheet.png'));
  }
  console.log(bad ? `${bad} face(s) with findings` : 'all clean');
  process.exitCode = bad ? 1 : 0;
})().catch((e) => { console.error(e); process.exit(1); });
