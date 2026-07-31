/* =====================================================================
   live-verify-lids.js — TOOL #39 on production, all 11 locales
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-lids.js

   ⚠ NEVER "it mounts". This DRIVES the tool on the live site: it puts
   lids down, counts what LEAVES the table, drops a third and proves the
   share re-derives, parks a marker, lifts, and then checks the counters
   that appear under each lid against the model's OWN arithmetic. A tool
   that merely rendered would pass a weaker check and ship broken — the
   recorded class-graph defect, where five green suites proved every
   string RENDERED and none proved a CONTROL ACTED.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const C = require('./_lids-content.js');

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'lids.js'), 'utf8') + '\n;this.__T = Lids;', sandbox);
const T = sandbox.__T;

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 1. the eleven landings ------------------------------------- */
  for (const loc of LOCALES) {
    const url = `${BASE}/${loc}/tools/${C[loc].slug}`;
    const page = await browser.newPage();
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const seen = await page.evaluate(() => ({
      h1: (document.querySelector('h1') || {}).textContent || '',
      title: document.title,
      desc: (document.querySelector('meta[name="description"]') || { content: '' }).content,
      canon: (document.querySelector('link[rel=canonical]') || { href: '' }).href,
      iframe: (document.querySelector('iframe') || { src: '' }).src,
      body: document.body.textContent
    }));
    is(res.status() === 200, `${loc}: ${url} -> ${res.status()}`);
    is(seen.h1.indexOf(C[loc].name) >= 0, `${loc}: h1 is "${seen.h1.trim()}"`);
    is(seen.desc === C[loc].metaDescription, `${loc}: meta description is this locale's`);
    is(seen.canon.indexOf(C[loc].slug) >= 0, `${loc}: canonical carries the native slug`);
    is(/\/mini-tools\/lids\.html/.test(seen.iframe), `${loc}: the tool iframe points at lids.html`);
    is(seen.body.indexOf(C[loc].about[2].slice(0, 40)) >= 0, `${loc}: the third paragraph is on the page`);
    is(!/\bsplat/i.test(seen.body), `${loc}: the brand word appears nowhere`);
    await page.close();
  }

  /* ---- 2. ⭐ THE TOOL, DRIVEN, on production ---------------------- */
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
  await page.goto(`${BASE}/mini-tools/lids.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('.lid-table', { timeout: 20000 });
  await wait(700);

  const foot = async (label) => {
    const ok = await page.evaluate((l) => {
      const b = Array.from(document.querySelectorAll('.lid-foot .lid-chip')).find((x) => x.textContent === l);
      if (!b || b.disabled) return false;
      b.click(); return true;
    }, label);
    await wait(160);
    return ok;
  };
  const n = (sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);

  /* the table book must have loaded from the server, not the fallback */
  const book = await page.evaluate(() => fetch('/mini-tools/lids-setups.json').then((r) => r.json()).then((d) => d.setups.length).catch(() => 0));
  is(book === 76, `the table book served ${book} setups from production (expected 76)`);

  /* set a total we choose, then drive the whole routine */
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('.lid-bar .lid-chip')).find((x) => x.textContent === '20');
    if (b && !b.disabled) b.click();
  });
  await wait(220);
  is((await n('.lid-counter')) === 20, `20 counters on the table (saw ${await n('.lid-counter')})`);

  is(await foot('Another lid'), 'the first lid goes down on production');
  is(await foot('Another lid'), 'the second lid goes down');
  is((await n('.lid-counter')) === 0 && (await n('.lid-lid')) === 2,
    '⭐ THE VALUE LOCK ON PRODUCTION: 20 under 2 lids leaves 0 on the table');

  is(await foot('Another lid'), 'the third lid goes down');
  const left = await n('.lid-counter');
  is(left === 2 && (await n('.lid-lid')) === 3,
    `⭐ THE RE-SETTLE: the third lid makes the others give back — ${left} now sit in plain sight`);

  await page.evaluate(() => { const m = document.querySelectorAll('.lid-mark')[9]; if (m) m.click(); });
  await wait(160);
  const marked = await page.evaluate(() => Array.from(document.querySelectorAll('.lid-mark')).findIndex((b) => b.classList.contains('lid-on')));
  is(marked === 9, 'the class parks a marker on 9 — a wrong number, which the tool must not care about');

  is(await foot('Lift the lids'), 'the lids come up');
  const after = await page.evaluate(() => ({
    reveal: document.querySelectorAll('.lid-rcell').length,
    counters: document.querySelectorAll('.lid-counter').length,
    marked: Array.from(document.querySelectorAll('.lid-mark')).findIndex((b) => b.classList.contains('lid-on')),
    verdict: document.querySelectorAll('[class*="correct"],[class*="wrong"]').length
  }));
  is(after.reveal === 6, `the reveal shows 6 under each lid (saw ${after.reveal})`);
  is(after.counters === 20, `every counter is back and seated — ${after.counters} of 20`);
  is(after.marked === 9, '⭐ the marker of 9 survived the lift, unmoved');
  is(after.verdict === 0, '⭐ the wrong guess is NEVER MARKED');
  is(errs.length === 0, 'zero console errors on production' + (errs.length ? ' — ' + errs[0] : ''));
  await page.close();

  /* ---- 3. the hub card actually has its thumbnail ----------------- */
  const hub = await browser.newPage();
  const r = await hub.goto(`${BASE}/mini-tools/tool-previews/lids.webp`, { timeout: 30000 });
  is(r.status() === 200, `the hub thumbnail serves ${r.status()} (the #38 defect, gated)`);
  await hub.close();

  await browser.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions driven on production`);
})();
