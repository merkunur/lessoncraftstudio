#!/usr/bin/env node
/**
 * fdx-read-sheets.js — every Find the Differences Level Set copy (data/fdx/allocation.json) rendered the way it ships —
 * print page, answer key, tap screen — and laid side by side, two copies per sheet, for READING before publish
 * (operator 2026-10-10: "visually analyze each of the worksheets before you publish them"). QA lints/verify are printed.
 *   node tools/level-set/fdx-read-sheets.js <outDir> [--locale=en] [--only=K-395] [--level=1]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp'); const puppeteer = require('puppeteer');
const { renderInstance } = require('../../render/render-instance.js');
const { resolveStrings } = require('../../i18n/strings.js');
const ROOT = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
const loc = arg('locale', 'en'), only = arg('only', null), onlyLv = arg('level', null);
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'fdx', 'allocation.json'), 'utf8'));
const II = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'interactive-instructions.json'), 'utf8'));
const load = (id) => { for (const d of ['k', 'g1', 'g2']) { const dir = path.join(ROOT, 'types', d); const f = fs.readdirSync(dir).find((x) => x.startsWith(id + '-')); if (f) return require(path.join(dir, f)); } throw new Error(id); };
const B = require('../../data/b7/find-the-differences.js');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const tmp = path.join(out, '_tmp'); fs.mkdirSync(tmp, { recursive: true });
  const rows = [];
  let bad = 0;
  for (const [id, lvs] of Object.entries(A.faces)) {
    if (only && !only.split(',').includes(id)) continue;
    const type = load(id);
    for (const [lv, list] of Object.entries(lvs)) {
      if (onlyLv && String(lv) !== onlyLv) continue;
      for (const c of list) {
        const s0 = resolveStrings(id, loc, type);
        const s1 = type.copyStrings ? type.copyStrings(s0, { locale: loc, difficulty: +lv, unit: c.unit, variant: c.copy, seedVariant: 1 }) : s0;
        const tapKey = B.TAP_KEY[type.difficulty[lv].mode];
        const r = await renderInstance({ type, theme: null, difficulty: +lv, locale: loc, unit: c.unit, strings: s1, page, variant: c.copy, seedVariant: 1,
          outDir: tmp, baseName: `${id}-L${lv}-c${c.copy}`, interactive: true, interactiveInstruction: II['find-the-differences'][tapKey][loc], keyPng: true });
        const issues = [...r.qa.lints, ...r.qa.verify, ...((r.interactive && r.interactive.lints) || [])];
        if (issues.length) { bad++; console.log(`QA ${id} L${lv} c${c.copy} ${c.unit}: ${JSON.stringify(issues).slice(0, 300)}`); }
        rows.push({ cap: `${id} L${lv} copy ${c.copy} · ${c.unit}${issues.length ? ' · QA!' : ''}`, files: [r.pngPath, path.join(tmp, `${id}-L${lv}-c${c.copy}.key.png`), r.interactive.pngPath] });
      }
    }
  }
  await browser.close();
  const H = 900;
  for (let k = 0; k < rows.length; k += 2) {
    const comps = []; let y = 0; let W = 0;
    for (const row of rows.slice(k, k + 2)) {
      let x = 0;
      comps.push({ input: Buffer.from(`<svg width="2000" height="30"><text x="4" y="22" font-size="20" font-family="Arial">${row.cap.replace(/&/g, '&amp;')}</text></svg>`), left: 0, top: y });
      for (const f of row.files) {
        if (!fs.existsSync(f)) continue;
        const img = await sharp(f).resize({ height: H }).png().toBuffer();
        const m = await sharp(img).metadata();
        comps.push({ input: img, left: x, top: y + 30 }); x += m.width + 16;
      }
      W = Math.max(W, x); y += H + 46;
    }
    await sharp({ create: { width: Math.max(W, 2000), height: y, channels: 3, background: '#fff' } }).composite(comps).png().toFile(path.join(out, `r${String(k / 2).padStart(3, '0')}.png`));
  }
  console.log(`${rows.length} copies, ${Math.ceil(rows.length / 2)} sheets, ${bad} with QA findings → ${out}`);
})().catch((e) => { console.error(e); process.exit(1); });
