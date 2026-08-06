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

      /* ⭐⭐ THE BAG REFUSES UNTIL THE CLASS HAS CLAIMED SOMETHING. Build #3
         committed an all-zero prior on the very first tap of the largest
         object on the stage, silently and with no undo — the signature
         invention destroyed by the tool's own primary affordance. */
      await page.evaluate(() => document.querySelector('.drb-bag').click());
      await wait(150);
      const drewCold = await page.evaluate(() => document.querySelectorAll('.drb-cell.drb-full').length);
      is(drewCold === 0, `[${loc}] ⭐ the bag will not draw before a claim exists`);
      const bandCold = await page.evaluate(() => (document.querySelector('.drb-doctrine') || {}).textContent || '');
      is(bandCold.trim() === T.strings.doctrine[loc], `[${loc}] the permanent line is the native doctrine`);

      /* 3 · the committed prior — place a guess, then prove it locks */
      /* ⚠ PLACEMENT IS LIFT-THEN-DROP FROM BUILD #4. A single click used to
         walk a piece round a three-zone cycle; it now only LIFTS, so a
         click-only sequence would leave the tray full, the bag refusing to
         draw, and every assertion below measuring a state no class reaches. */
      await page.evaluate(() => { const g = document.querySelector('.drb-shelf.drb-pool .drb-gpiece'); if (g) g.click(); });
      await wait(120);
      const carried = await page.evaluate(() => document.querySelectorAll('.drb-gpiece.drb-carry').length);
      is(carried === 1, `[${loc}] a tap LIFTS a piece rather than moving it somewhere unasked`);
      await page.evaluate(() => { const z = document.querySelector('.drb-shelf[data-zone="1"]'); if (z) z.click(); });
      await wait(200);
      const placed = await page.evaluate(() => document.querySelectorAll('.drb-shelf.drb-in .drb-gpiece').length);
      is(placed === 1, `[${loc}] a piece moves onto the in-the-bag shelf before any draw`);

      await page.evaluate(() => document.querySelector('.drb-bag').click());
      await wait(250);
      /* ⚠⚠ THE LOCK IS PROVED BY BEHAVIOUR, NOT BY A `disabled` ATTRIBUTE,
         and that is a corrected MEASUREMENT rather than a relaxed one. Build
         #4 freezes the prior by REFUSAL — `placeGuess` returns null once a
         draw has happened, so no path in the file can move it — and the
         frozen pieces stay live on purpose, because they become the control
         that lights their kind across both records. Asserting `.disabled`
         measured the old implementation, not the invariant; it failed in all
         eleven locales against a tool that locks perfectly well. */
      const before = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-gpiece'))
        .map((b) => b.getAttribute('data-kind') + ':' + b.closest('.drb-shelf').getAttribute('data-zone')).sort().join(','));
      await page.evaluate(() => { const g = document.querySelector('.drb-gpiece'); if (g) g.click(); });
      await wait(120);
      await page.evaluate(() => { const z = document.querySelector('.drb-shelf[data-zone="2"]'); if (z) z.click(); });
      await wait(120);
      const after = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-gpiece'))
        .map((b) => b.getAttribute('data-kind') + ':' + b.closest('.drb-shelf').getAttribute('data-zone')).sort().join(','));
      is(before === after && before.length > 0, `[${loc}] ⭐ the guess LOCKS on the first draw — no piece can be moved (${before})`);
      /* ⭐ and it is not inert: the same press now lights that kind on BOTH
         records, which is what turns two aligned rows into one texture */
      const litK = await page.evaluate(() => (document.querySelector('.drb-recs') || {}).getAttribute
        ? document.querySelector('.drb-recs').getAttribute('data-lit') : null);
      is(!!litK, `[${loc}] ⭐ and the frozen prior lights its kind instead of going dead (${litK})`);
      await page.evaluate(() => { const g = document.querySelector('.drb-gpiece.drb-on'); if (g) g.click(); });
      await wait(80);

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

      /* ⭐⭐ 4b · RUN TWO IS FREE, ON PRODUCTION, SIGNED OUT. This is the
         defect the operator reported as "the objects could not be placed on
         the second line at all": in build #3 the entire thesis of the
         instrument sat behind the paywall, a dashed unfillable second row was
         drawn on screen, and the bag went dead in the same tick. */
      is((await page.evaluate(() => !!window.DrawBag && window.DrawBag.premium)) === false,
        `[${loc}] this production load is anonymous — the free tier`);
      const againIdx0 = (await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((b) => b.textContent)))
        .indexOf(T.strings.againBtn[loc]);
      const againState = await page.evaluate((i) => {
        const c = document.querySelectorAll('.drb-foot .drb-chip')[i];
        const bag = document.querySelector('.drb-bag');
        return { ok: !!c && !c.disabled && c.className.indexOf('drb-locked') < 0, bagDead: bag ? bag.disabled : null };
      }, againIdx0);
      is(againState.ok, `[${loc}] ⭐ "${T.strings.againBtn[loc]}" is live for a free teacher`);
      is(againState.bagDead === false, `[${loc}] the bag does not go dead when the record fills`);
      await page.evaluate((i) => { const c = document.querySelectorAll('.drb-foot .drb-chip')[i]; if (c && !c.disabled) c.click(); }, againIdx0);
      await wait(250);
      for (let i = 0; i < 60; i++) {
        const done = await page.evaluate(() => { const b = document.querySelector('.drb-bag'); if (!b || b.disabled) return true; b.click(); return false; });
        if (done) break;
      }
      const two = await page.evaluate(() => ({
        rows: document.querySelectorAll('.drb-rec').length,
        filled: Array.from(document.querySelectorAll('.drb-rec')).map((r) => r.querySelectorAll('.drb-cell.drb-full').length),
        aligned: (() => {
          const r = document.querySelectorAll('.drb-rec');
          if (r.length !== 2) return false;
          const xs = (n) => Array.from(n.querySelectorAll('.drb-cell')).map((c) => c.getBoundingClientRect().left.toFixed(2)).join('|');
          return xs(r[0]) === xs(r[1]);
        })()
      }));
      is(two.rows === 2 && two.filled[1] === T.DEFAULT_LEN,
        `[${loc}] ⭐ the SECOND line fills on the free tier (${two.filled.join(' + ')})`);
      is(two.aligned, `[${loc}] record two aligns with record one, cell for cell`);
      const run2 = await page.evaluate(() => window.DrawBag.st.runs[1].draws.join(''));
      const want2 = (() => { const sd = T.seedFor(bag, 2), a = []; for (let i = 0; i < T.DEFAULT_LEN; i++) a.push(T.pick(bag, sd, i)); return a.join(''); })();
      is(run2 === want2, `[${loc}] and run two is the same bag with a different seed, piece for piece`);

      /* 5 · the reveal */
      const foot = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((b) => b.textContent));
      const openIdx = foot.indexOf(T.strings.openBtn[loc]);
      await page.evaluate((i) => { const c = document.querySelectorAll('.drb-foot .drb-chip')[i]; if (c && !c.disabled) c.click(); }, openIdx);
      await wait(300);
      const revealed = await page.evaluate(() => document.querySelectorAll('.drb-ocell').length);
      const total = T.total(bag);
      is(revealed === total, `[${loc}] "${T.strings.openBtn[loc]}" reveals all ${total} pieces (${revealed})`);
      is(await page.evaluate(() => !!document.querySelector('.drb-opened .drb-sack .drb-bagsvg')),
        `[${loc}] the contents are drawn INSIDE the opened bag`);
      const spill = await page.evaluate(() => {
        const sack = document.querySelector('.drb-sack').getBoundingClientRect();
        let out = 0;
        document.querySelectorAll('.drb-ocell').forEach((c) => {
          const r = c.getBoundingClientRect();
          if (r.left < sack.left - 1 || r.right > sack.right + 1 || r.top < sack.top - 1 || r.bottom > sack.bottom + 1) out++;
        });
        return out;
      });
      is(spill === 0, `[${loc}] no revealed piece spills through the cloth`);
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
