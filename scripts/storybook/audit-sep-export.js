#!/usr/bin/env node
/* =====================================================================
   audit-sep-export.js — AUDIT the operator's MANUAL "Export for Storybook"
   in every interactive app, to catch per-app discrepancies before the
   operator ever hits them.

   Per app (SoT: docs/storybook/app-coverage-matrix.json) it:
     1. headless-loads the app (?__sbHeadless=1) + generates a real worksheet
        via window.__sepGenerate(spec)  → the DEFAULT-crop SEP package (== the
        box the operator sees PRE-FILLED in the crop UI before they nudge it).
     2. re-exports at a deliberately WIDE crop (default crop + 40px pad) via
        window.__sepExport(rect) — same live canvas, no regenerate — to reveal
        decoration lurking just OUTSIDE the tight bbox that the operator would
        hit when widening the box.
   Writes docs/storybook/manual-export-audit/<app>/{descriptor.json,
   visual@2x.webp, wide.webp, wide-descriptor.json}. Nothing is auto-placed
   into a story (that headless-compose path is retired). Then a human Reads the
   visuals + descriptors and classifies each against the fix taxonomy.

   USAGE: node scripts/storybook/audit-sep-export.js [--only=wordsearch,addition]
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { serve } = require('./sep-generate.js');
const { APP_PARAMS } = require('./prove-app-sep.js');

const REPO = path.join(__dirname, '..', '..');
const MATRIX = JSON.parse(fs.readFileSync(path.join(REPO, 'docs', 'storybook', 'app-coverage-matrix.json'), 'utf8'));
const OUT = path.join(REPO, 'docs', 'storybook', 'manual-export-audit');

const onlyArg = (process.argv.find(a => a.startsWith('--only=')) || '').split('=')[1];
const ONLY = onlyArg ? onlyArg.split(',').map(s => s.trim()) : null;

async function auditApp(browser, base, app, family, params) {
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e).slice(0, 160)));
  await page.setViewport({ width: 1400, height: 1000 });
  await page.goto(base + '/worksheet-generators/' + app + '.html?__sbHeadless=1', { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForFunction('typeof window.__sepGenerate === "function" && typeof window.__sepExport === "function"', { timeout: 30000 });
  const spec = { app, family, params, seed: 7, locale: 'en', exId: 'p-en' };
  const got = await page.evaluate(async (s) => {
    function pkgToFiles(p) {
      const names = Object.keys(p.files);
      const out = {};
      return Promise.all(names.map(n => new Promise(res => {
        const fr = new FileReader(); fr.onload = () => { out[n] = fr.result; res(); }; fr.readAsDataURL(p.files[n]);
      }))).then(() => out);
    }
    try {
      const def = await window.__sepGenerate(s);   /* default-crop manual export */
      if (!def) return { error: 'no default package' };
      const defFiles = await pkgToFiles(def);
      /* WIDE crop = default crop padded 40px, clamped to page — reveals decor
         just outside the tight bbox (what the operator hits when widening). */
      const pg = def.descriptor.page, c = def.descriptor.crop, pad = 40;
      const wr = { x: Math.max(0, c.x - pad), y: Math.max(0, c.y - pad),
        w: Math.min(pg.width, c.w + pad * 2), h: Math.min(pg.height, c.h + pad * 2) };
      wr.w = Math.min(wr.w, pg.width - wr.x); wr.h = Math.min(wr.h, pg.height - wr.y);
      let wideDesc = null, wideFiles = null;
      try {
        const wide = await window.__sepExport(wr);
        if (wide) { wideDesc = wide.descriptor; wideFiles = await pkgToFiles(wide); }
      } catch (e) {}
      return { descriptor: def.descriptor, files: defFiles, wideDescriptor: wideDesc, wideFiles: wideFiles };
    } catch (e) { return { error: String(e).slice(0, 200) }; }
  }, spec);
  await page.close();
  if (!got || got.error) throw new Error(app + ': ' + ((got && got.error) || 'null') + (errs.length ? ' | ' + errs[0] : ''));

  const dir = path.join(OUT, app);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'descriptor.json'), JSON.stringify(got.descriptor, null, 2));
  Object.keys(got.files).forEach(n => {
    const fp = path.join(dir, n);
    fs.mkdirSync(path.dirname(fp), { recursive: true });   /* F-family reveal tiles live under assets/ */
    fs.writeFileSync(fp, Buffer.from(got.files[n].split(',')[1], 'base64'));
  });
  if (got.wideFiles) {
    Object.keys(got.wideFiles).forEach(n => {
      if (n.indexOf('visual@2x') === 0) {
        const ext = n.split('.').pop();
        fs.writeFileSync(path.join(dir, 'wide.' + ext), Buffer.from(got.wideFiles[n].split(',')[1], 'base64'));
      }
    });
    if (got.wideDescriptor) fs.writeFileSync(path.join(dir, 'wide-descriptor.json'), JSON.stringify(got.wideDescriptor, null, 2));
  }
  const el = got.descriptor.elements || {};
  const counts = Object.keys(el).map(k => Array.isArray(el[k]) ? k + ':' + el[k].length : null).filter(Boolean).join(' ');
  return { app: app, family: family, crop: got.descriptor.crop, visual: got.descriptor.visual, counts: counts };
}

(async () => {
  const apps = (MATRIX.apps || []).filter(a => a.interactive && (!ONLY || ONLY.indexOf(a.app) >= 0));
  fs.mkdirSync(OUT, { recursive: true });
  const srv = await serve();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const ok = [], fail = [];
  for (const row of apps) {
    const app = row.app;
    const family = (row.mapper && row.mapper[0]) || row.family;
    const params = APP_PARAMS[app] || { theme: 'animals' };
    try {
      const r = await auditApp(browser, base, app, family, params);
      ok.push(r);
      console.log('  ✓ ' + app.padEnd(16) + ' fam ' + family + '  crop ' + r.crop.w + '×' + r.crop.h +
        '  visual ' + r.visual.width + '×' + r.visual.height + '  [' + r.counts + ']');
    } catch (e) {
      fail.push(app);
      console.log('  ✗ ' + app.padEnd(16) + ' — ' + String(e.message).slice(0, 140));
    }
  }
  await browser.close(); srv.close();
  console.log('\n[audit-sep] ' + ok.length + ' ok' + (fail.length ? ', ' + fail.length + ' FAILED: ' + fail.join(',') : '') +
    ' → docs/storybook/manual-export-audit/');
})().catch(e => { console.error('[audit-sep] crashed: ' + e.stack); process.exit(1); });
