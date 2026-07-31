/* =====================================================================
   live-verify-draw-bag.js — TOOL #38 on production, all 11 locales
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-draw-bag.js

   ⚠ NEVER "it mounts". This DRIVES the tool: it places a guess, proves
   the guess LOCKS on the first draw, fills the whole record, and then
   checks the drawn pieces against the model's OWN sequence for that
   bag's seed — which is only possible because the draw is a pure
   function of (bag, seed, index) and Oslo and Lisbon therefore see the
   identical run. A tool that merely rendered would pass a weaker check
   and ship broken, which is the recorded class-graph defect.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const C = require('./_draw-bag-content.js');

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'draw-bag.js'), 'utf8') + '\n;this.__T = DrawBag;', sandbox);
const T = sandbox.__T;
const BOOK = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'draw-bag-bags.json'), 'utf8'));
const FIRST_FREE = BOOK.bags.filter((b) => b.free)[0];

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  for (const loc of LOCALES) {
    /* a fresh browser per locale — a shared one caches the module and
       every later locale passes on the first's copy */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const entry = C[loc];

      /* 1 · the landing page exists and carries the native name */
      const p0 = await browser.newPage();
      const res = await p0.goto(`${BASE}/${loc}/tools/${entry.slug}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      const html = await p0.content();
      is(res && res.status() === 200, `[${loc}] /${loc}/tools/${entry.slug} -> ${res ? res.status() : 'no response'}`);
      is(html.indexOf(entry.name) >= 0, `[${loc}] the landing carries the native name ${JSON.stringify(entry.name)}`);
      await p0.close();

      /* 2 · the tool itself loads and speaks this locale */
      const page = await browser.newPage();
      page._errs = [];
      page.on('pageerror', (e) => page._errs.push(String(e)));
      await page.setViewport({ width: 1024, height: 950 });
      await page.goto(`${BASE}/mini-tools/draw-bag.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForSelector('.drb-bag', { timeout: 20000 });
      await wait(500);

      const title = await page.evaluate(() => { const t = document.querySelector('.lcs-title'); return t ? t.textContent : ''; });
      is(!title || title === T.strings.title[loc], `[${loc}] title is ${JSON.stringify(title)}`);

      /* 3 · the committed prior — place a guess, then prove it locks */
      await page.evaluate(() => { const g = document.querySelector('.drb-shelf.drb-pool .drb-gpiece'); if (g) g.click(); });
      await wait(200);
      const placed = await page.evaluate(() => document.querySelectorAll('.drb-shelf.drb-in .drb-gpiece').length);
      is(placed === 1, `[${loc}] a piece moves onto the in-the-bag shelf before any draw`);

      await page.evaluate(() => document.querySelector('.drb-bag').click());
      await wait(250);
      const locked = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-gpiece')).every((b) => b.disabled));
      is(locked, `[${loc}] ⭐ the guess LOCKS on the first draw`);

      /* 4 · the record is the model's own sequence for this bag */
      for (let i = 0; i < 40; i++) {
        const done = await page.evaluate(() => { const b = document.querySelector('.drb-bag'); if (!b || b.disabled) return true; b.click(); return false; });
        if (done) break;
        await wait(35);
      }
      const got = await page.evaluate(() => {
        const rec = document.querySelectorAll('.drb-rec')[0];
        if (!rec) return null;
        return Array.from(rec.querySelectorAll('.drb-cell')).map((c) => {
          const s = c.querySelector('svg');
          if (!s) return '';
          const m = /drb-k-([a-z])/.exec(s.getAttribute('class') || '');
          return m ? m[1] : '?';
        }).join('');
      });
      const bag = {}; for (const k of T.KINDS) bag[k] = FIRST_FREE.b[k] || 0;
      const seed = T.seedFor(bag, 1);
      let want = '';
      for (let i = 0; i < T.DEFAULT_LEN; i++) want += T.pick(bag, seed, i);
      is(got === want, `[${loc}] ⭐ the record on production matches the model, piece for piece (${(got || '').slice(0, 10)}…)`);

      /* 5 · the reveal */
      const foot = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((b) => b.textContent));
      const openIdx = foot.indexOf(T.strings.openBtn[loc]);
      await page.evaluate((i) => { const c = document.querySelectorAll('.drb-foot .drb-chip')[i]; if (c && !c.disabled) c.click(); }, openIdx);
      await wait(300);
      const revealed = await page.evaluate(() => document.querySelectorAll('.drb-ocell').length);
      const total = T.total(bag);
      is(revealed === total, `[${loc}] "${T.strings.openBtn[loc]}" reveals all ${total} pieces (${revealed})`);
      is(page._errs.length === 0, `[${loc}] no page errors` + (page._errs.length ? ' — ' + page._errs[0] : ''));
      await page.close();
    } catch (e) {
      FAIL++;
      console.error(`  FAIL [${loc}] ${e && e.message ? e.message : e}`);
    }
    await browser.close();
  }
  console.log('');
  if (FAIL) { console.error('FAIL — ' + FAIL + ' of ' + (PASS + FAIL) + ' assertions on production'); process.exit(1); }
  console.log('PASS — ' + PASS + ' assertions driven on production across ' + LOCALES.length + ' locales');
})();
