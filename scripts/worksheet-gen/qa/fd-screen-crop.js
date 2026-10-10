#!/usr/bin/env node
/**
 * fd-screen-crop.js — does a Find the Differences tap screen cut off a picture? (read 2026-10-10: the screen image is
 * cropped just below the lowest TAPPABLE spot, so a page whose lowest change sat high showed half a bottom picture).
 * Renders the screen of every given copy and compares the crop bottom with the lowest picture frame's bottom.
 *   node qa/fd-screen-crop.js --published            (the 11 published faces, L2 copy 1, every locale)
 *   node qa/fd-screen-crop.js --allocation [--locale=en]
 * Exit 1 if any screen cuts a picture.
 */
'use strict';
const fs = require('fs'); const path = require('path'); const os = require('os'); const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { resolveStrings } = require('../i18n/strings.js');
const ROOT = path.join(__dirname, '..');
const II = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'interactive-instructions.json'), 'utf8'));
const B = require('../data/b7/find-the-differences.js');
const load = (id) => { for (const d of ['k', 'g1', 'g2']) { const dir = path.join(ROOT, 'types', d); const f = fs.readdirSync(dir).find((x) => x.startsWith(id + '-')); if (f) return require(path.join(dir, f)); } throw new Error(id); };
const IDS = ['K-395', 'K-397', 'K-398', 'G1-412', 'G2-388', 'G1-413', 'G1-414', 'G1-415', 'K-399', 'K-400', 'G2-389'];
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
(async () => {
  const jobs = [];
  if (process.argv.includes('--published')) {
    for (const loc of (arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi')).split(',')) for (const id of IDS) { const t = load(id); const d = t.difficulty[2]; jobs.push({ id, lv: 2, copy: 1, unit: d.units ? d.units.join('|') : d.unit, loc }); }
  } else {
    const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'fdx', 'allocation.json'), 'utf8'));
    for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) for (const c of list) jobs.push({ id, lv: +lv, copy: c.copy, unit: c.unit, loc: arg('locale', 'en') });
  }
  const browser = await puppeteer.launch({ headless: 'new' }); const page = await browser.newPage();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fdcrop-'));
  const bad = [];
  for (const j of jobs) {
    const type = load(j.id);
    const s0 = resolveStrings(j.id, j.loc, type);
    const s1 = type.copyStrings ? type.copyStrings(s0, { locale: j.loc, difficulty: j.lv, unit: j.unit, variant: j.copy, seedVariant: 1 }) : s0;
    const tapKey = B.TAP_KEY[type.difficulty[j.lv].mode];
    const r = await renderInstance({ type, theme: null, difficulty: j.lv, locale: j.loc, unit: j.unit, strings: s1, page, variant: j.copy, ...(process.argv.includes('--published') ? {} : { seedVariant: 1 }),
      outDir: tmp, baseName: `${j.id}-${j.loc}-${j.lv}-${j.copy}`, interactive: true, interactiveInstruction: II['find-the-differences'][tapKey][j.loc] });
    const sh = path.join(tmp, `${j.id}-${j.loc}-${j.lv}-${j.copy}.screen.html`);
    await page.goto('file:///' + sh.split(path.sep).join('/'), { waitUntil: 'networkidle0' });
    const m = await page.evaluate(() => {
      const full = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      const lowest = Math.max(...[...document.querySelectorAll('[data-lcs-fd-hotspot], [data-lcs-keep]')].map((el) => el.getBoundingClientRect().bottom));
      const crop = Math.min(full.height, lowest - full.top + 36);
      const frame = Math.max(...[...document.querySelectorAll('[data-lcs-fd-panel]')].map((el) => el.getBoundingClientRect().bottom)) - full.top;
      return { crop: Math.round(crop), frame: Math.round(frame) };
    });
    if (m.frame > m.crop + 1) bad.push(`${j.id} ${j.loc} L${j.lv} c${j.copy} ${j.unit}: crop ${m.crop} < picture bottom ${m.frame}`);
  }
  await browser.close();
  console.log(`${jobs.length} screens, ${bad.length} cut a picture`); bad.forEach((b) => console.log('  ' + b));
  process.exit(bad.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
