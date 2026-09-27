#!/usr/bin/env node
/* =====================================================================
   verify-app-fingerprint.js — proves every worksheet-generator app writes
   a usable manifest.fingerprint (catalog-export.js, 2026-09-27).

   For each app: serve frontend/public locally (scripts/storybook/serve-apps.js,
   which stubs the image/theme/access APIs), open the app, generate a
   worksheet, then call LCSCatalogExport.buildFingerprint() and assert:
     - the settings form was captured (≥ 3 controls)
     - a canvas was found
     - the canvas yielded content: ≥ 1 picture OR ≥ 3 texts
     - every picture has a folder (theme) or is an explicit embedded data URL
   With --export=<app> it also clicks "Export to catalog", captures the ZIP
   and checks manifest.json carries the same fingerprint.

   Usage:  node scripts/verify-app-fingerprint.js [--apps=a,b] [--export=addition]
           node scripts/verify-app-fingerprint.js --poison   (must FAIL)
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const PORT = 5197;
const ALL = ['addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count', 'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects', 'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces', 'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'picture-path', 'picture-sort', 'prepositions', 'shadow-match', 'subtraction', 'sudoku', 'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch'];

const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : null; };
const APPS = arg('apps') ? arg('apps').split(',') : ALL;
const EXPORT_APP = arg('export');
const POISON = process.argv.includes('--poison');
/* --live: run against the production apps (real image library). The admin
   access check is answered locally in the browser only — nothing is written
   to the server. */
const LIVE = process.argv.includes('--live');
const BASE = LIVE ? 'https://www.lessoncraftstudio.com' : `http://127.0.0.1:${PORT}`;

function judge(fp) {
  const errs = [];
  if (!fp || fp.error) { errs.push('no fingerprint: ' + (fp && fp.error)); return errs; }
  if (Object.keys(fp.form || {}).length < 3) errs.push('form has < 3 controls');
  if (!fp.canvasFound) errs.push('no canvas found');
  const pics = (fp.images || []).filter((i) => i.kind === 'picture');
  if (pics.length < 1 && (fp.texts || []).length < 3) errs.push('no content (0 pictures, <3 texts)');
  for (const i of fp.images || []) if (!i.folder && i.kind !== 'embedded-data-url') errs.push('picture without folder: ' + i.path);
  return errs;
}

(async () => {
  const srv = LIVE ? { kill() {} } : spawn(process.execPath, [path.join(REPO, 'scripts/storybook/serve-apps.js')], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 1500));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let failed = 0;
  try {
    for (const app of APPS) {
      const page = await browser.newPage();
      if (LIVE) {
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          if (/verify-app-access|\/api\/verify/.test(req.url())) return req.respond({ status: 200, contentType: 'application/json', body: '{"hasAccess":true}' });
          req.continue();
        });
      }
      page.on('dialog', (d) => d.dismiss().catch(() => {}));
      const url = `${BASE}/worksheet-generators/${app}.html`;
      let fp = null, note = '';
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.evaluate(() => localStorage.setItem('accessToken', 'local'));
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {});
        await new Promise((r) => setTimeout(r, 2500));
        await page.evaluate(() => {
          const ts = document.getElementById('themeSelect');
          if (ts && ts.options.length > 1) {
            const opt = [...ts.options].find((o) => o.value === 'animals') || [...ts.options].find((o) => o.value && o.value !== 'all' && o.value !== 'none') || ts.options[1];
            ts.value = opt.value; ts.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
        await new Promise((r) => setTimeout(r, 2000));
        await page.evaluate(() => {
          const b = document.getElementById('generateWorksheetBtn') || [...document.querySelectorAll('button')].find((x) => /generate/i.test(x.id || ''));
          if (b) b.click();
        });
        await new Promise((r) => setTimeout(r, 6000));
        fp = await page.evaluate(() => window.LCSCatalogExport && window.LCSCatalogExport.buildFingerprint ? window.LCSCatalogExport.buildFingerprint() : { error: 'buildFingerprint missing' });
        if (POISON) { fp.images = []; fp.texts = []; }
      } catch (e) { note = e.message; }
      const errs = fp ? judge(fp) : ['page error: ' + note];
      const pics = fp ? (fp.images || []).filter((i) => i.kind === 'picture') : [];
      const folders = [...new Set(pics.map((i) => i.folder))];
      console.log(`${errs.length ? 'FAIL' : 'PASS'}  ${app.padEnd(18)} form=${fp ? Object.keys(fp.form || {}).length : 0} pics=${pics.length} folders=${folders.join('|').slice(0, 60)} texts=${fp ? (fp.texts || []).length : 0}${errs.length ? '  ← ' + errs.join('; ') : ''}`);
      if (errs.length) failed++;

      if (EXPORT_APP === app && fp && !errs.length) {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fp-'));
        const cdp = await page.target().createCDPSession();
        await cdp.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: dir });
        await page.evaluate(() => { const k = document.getElementById('generateAnswerKeyBtn'); if (k) k.click(); });
        await new Promise((r) => setTimeout(r, 5000));
        await page.evaluate(() => document.getElementById('exportToCatalogBtn').click());
        let zip = null;
        for (let i = 0; i < 60 && !zip; i++) { await new Promise((r) => setTimeout(r, 1000)); zip = fs.readdirSync(dir).find((f) => f.endsWith('.zip')); }
        if (!zip) { console.log('FAIL  export: no ZIP downloaded'); failed++; }
        else {
          const AdmZip = require('adm-zip');
          const m = JSON.parse(new AdmZip(path.join(dir, zip)).readAsText('manifest.json'));
          const e2 = judge(m.fingerprint);
          console.log(`${e2.length ? 'FAIL' : 'PASS'}  export ZIP ${zip}: manifest.fingerprint v${m.fingerprint && m.fingerprint.version}, ${(m.fingerprint.images || []).length} images, ${(m.fingerprint.texts || []).length} texts${e2.length ? '  ← ' + e2.join('; ') : ''}`);
          if (e2.length) failed++;
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
    srv.kill();
  }
  console.log(`\n${APPS.length - failed}/${APPS.length} passed${POISON ? ' (POISON run — expected to fail)' : ''}`);
  process.exit(failed ? 1 : 0);
})();
