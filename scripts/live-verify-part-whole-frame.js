#!/usr/bin/env node
/* =====================================================================
   live-verify-part-whole-frame.js — is the REBUILT board actually live?
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-part-whole-frame.js

   ⭐ THIS DRIVES THE MAIN CONTROL ON PRODUCTION. "It mounts" is not a
   verification: every defect this rebuild fixed was in a tool that
   mounted perfectly. So the run carries a counter across on the live
   page, in every locale, and measures what happened.

   ⚠ AND IT CHECKS THE THINGS A DEPLOY CAN SILENTLY DROP:
     · the served JS is the NEW build, not a cached old one behind
       `/mini-tools/`'s one-hour max-age — the cache-buster is the only
       way to ship JS here, so a stale `?v=` is a shipped no-op;
     · the landing page in each locale exists and names the tool what the
       tool names itself (seven locales were renamed by their panels);
     · the hub card carries its preview image, which is gitignored and
       travels by scp — the recorded #38 defect, which degrades silently.
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* what the tool calls itself, and what the landing must therefore say */
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'part-whole-frame.js'), 'utf8');
const box = { console, document: { getElementById: () => null, createElement: () => ({}), head: { appendChild() {} } }, window: {} };
box.globalThis = box;
vm.runInNewContext(SRC.replace(/\nfunction injectPartWholeFrameCSS[\s\S]*$/, ''), box);
const TITLES = box.PartWholeFrame.strings.title;
/* the cache-buster the tool is SUPPOSED to be served under */
const HTML = fs.readFileSync(path.join(ROOT, 'mini tools', 'part-whole-frame.html'), 'utf8');
const WANT_V = (HTML.match(/part-whole-frame\.js\?v=(\d+)/) || [])[1];
/* a marker only the rebuilt build carries */
const MARKER = 'pwf-partcovered';
const SLUGS = require(path.join(ROOT, 'frontend', 'messages', 'tool-content', 'en.json'));

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const settle = (ms) => new Promise((r) => setTimeout(r, ms || 400));

(async () => {
  if (!WANT_V) { console.error('could not read the cache-buster out of the html'); process.exit(1); }
  console.log(`[expecting part-whole-frame.js?v=${WANT_V}]`);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 1. the served JS is the new build ---- */
  console.log('[the served bytes]');
  const p0 = await browser.newPage();
  const js = await p0.goto(`${BASE}/mini-tools/part-whole-frame.js?v=${WANT_V}`, { waitUntil: 'domcontentloaded' });
  const body = await js.text();
  is(js.status() === 200, `the tool JS serves 200 (${js.status()})`);
  is(body.indexOf(MARKER) !== -1, `the served build is the REBUILT one (carries ${MARKER})`);
  is(body.indexOf('schemeValue(sc)') !== -1, 'the served build has the colour-swatch fix');
  is(body.indexOf('pwf-paid') !== -1, 'the served build has the print-gating fix');
  const htmlRes = await p0.goto(`${BASE}/mini-tools/part-whole-frame.html`, { waitUntil: 'domcontentloaded' });
  const htmlTxt = await htmlRes.text();
  is(new RegExp('part-whole-frame\\.js\\?v=' + WANT_V).test(htmlTxt),
    `the served html asks for ?v=${WANT_V} — a stale buster is a shipped no-op`);
  await p0.close();

  /* ---- 2. ⭐ carry one across, on production, in every locale ---- */
  console.log('[a real carry, live, in all eleven locales]');
  for (const loc of LOCALES) {
    const p = await browser.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.setViewport({ width: 1024, height: 900 });
    try {
      await p.goto(`${BASE}/mini-tools/part-whole-frame.html?lang=${loc}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await p.waitForSelector('.pwf-wrap', { timeout: 15000 });
      await settle(600);
      const before = await p.evaluate(() => ({
        a: document.querySelectorAll('.pwf-box-a .pwf-dot').length,
        b: document.querySelectorAll('.pwf-box-b .pwf-dot').length,
        nest: document.querySelectorAll('.pwf-box-whole .pwf-dot').length,
        title: (document.querySelector('.lcs-title') || {}).textContent || ''
      }));
      await p.evaluate(() => document.querySelector('.pwf-box-a .pwf-dish-live').click());
      await settle(600);
      const after = await p.evaluate(() => ({
        a: document.querySelectorAll('.pwf-box-a .pwf-dot').length,
        b: document.querySelectorAll('.pwf-box-b .pwf-dot').length,
        nest: document.querySelectorAll('.pwf-box-whole .pwf-dot').length
      }));
      is(after.a === before.a - 1 && after.b === before.b + 1,
        `${loc}: a live tap carried exactly one (${before.a}/${before.b} -> ${after.a}/${after.b})`);
      is(after.nest === before.nest, `${loc}: and the whole did not change (${after.nest})`);
      is(before.title.trim() === TITLES[loc], `${loc}: the page names the tool "${before.title.trim()}"`);
      is(errs.length === 0, `${loc}: no page error${errs.length ? ' — ' + errs[0] : ''}`);
    } catch (e) {
      bad(`${loc}: ${String(e).split('\n')[0]}`);
    }
    await p.close();
  }

  /* ---- 3. the landing page in every locale ---- */
  console.log('[the eleven landing pages]');
  for (const loc of LOCALES) {
    const p = await browser.newPage();
    let slug = null;
    try {
      const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'messages', 'tool-content', loc + '.json'), 'utf8'));
      slug = j['part-whole-frame'].slug;
    } catch (_) {}
    if (!slug) { bad(`${loc}: no slug in tool-content`); await p.close(); continue; }
    try {
      const r = await p.goto(`${BASE}/${loc}/tools/${slug}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      /* ⚠ 410 here means the tool key is missing from live-tool-slugs.ts —
         the single most dangerous omission in the whole registration */
      is(r.status() === 200, `${loc}: /${loc}/tools/${slug} serves 200 (${r.status()})`);
      const t = await p.evaluate(() => document.title + ' ' + document.body.innerText.slice(0, 2000));
      is(t.indexOf(TITLES[loc]) !== -1, `${loc}: the landing names the tool "${TITLES[loc]}"`);
    } catch (e) {
      bad(`${loc}: landing — ${String(e).split('\n')[0]}`);
    }
    await p.close();
  }

  /* ---- 4. the hub card's preview image ---- */
  console.log('[the hub thumbnail]');
  const pv = await browser.newPage();
  try {
    const r = await pv.goto(`${BASE}/mini-tools/tool-previews/part-whole-frame.webp`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    /* ⚠ gitignored, travels by scp, and its absence degrades SILENTLY to a
       generic glyph — the recorded #38 defect */
    is(r.status() === 200, `the preview webp serves 200 (${r.status()}) — a missing one falls back to a generic glyph, silently`);
    const len = parseInt(r.headers()['content-length'] || '0', 10);
    is(len > 2000, `and it is a real image (${len} bytes)`);
  } catch (e) { bad('preview: ' + String(e).split('\n')[0]); }
  await pv.close();

  await browser.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
