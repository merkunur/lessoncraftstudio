/* =====================================================================
   live-verify-arrow-strip.js — production, 11 locales, fresh browser each
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-arrow-strip.js

   ⚠ IT DRIVES THE TOOL, it does not check that the page mounted. Drop
   cards, press Run, and assert the beetle actually moved and the trail
   the browser drew is the run the model says it is.
   ⚠ Fresh browser per locale — a shared one caches the module and every
   later locale passes on the first locale's copy.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const C = require('./_arrow-strip-content.js');

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'arrow-strip.js'), 'utf8') + '\n;this.__T = ArrowStrip;', sandbox);
const T = sandbox.__T;

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  for (const loc of LOCALES) {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 900 });

      /* 1: the landing page exists and carries this locale's own name */
      const landing = `${BASE}/${loc}/tools/${C[loc].slug}`;
      const r = await page.goto(landing, { waitUntil: 'domcontentloaded', timeout: 45000 });
      is(r && r.status() === 200, `${loc}: landing ${landing} → ${r && r.status()}`);
      const html = await page.content();
      is(html.indexOf(C[loc].name) > -1, `${loc}: the landing carries "${C[loc].name}"`);

      /* 2: the mini-tool itself, and DRIVE it */
      await page.goto(`${BASE}/mini-tools/arrow-strip.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForSelector('.arw-card', { timeout: 20000 });
      await wait(400);

      const title = await page.evaluate(() => (document.querySelector('.lcs-title') || {}).textContent || '');
      is(title.indexOf(T.strings.title[loc]) > -1 || title === '', `${loc}: the tool is in ${loc} ("${title.trim() || 'title hidden by embed'}")`);

      const rail = ['F', 'F', 'R', 'F'];
      const IDX = { F: 0, B: 1, L: 2, R: 3 };
      for (const k of rail) {
        await page.evaluate((i) => document.querySelectorAll('.arw-card')[i].click(), IDX[k]);
        await wait(60);
      }
      is(await page.evaluate(() => document.querySelectorAll('.arw-place.arw-filled').length) === 4,
        `${loc}: four cards are in the rail`);
      is(!(await page.evaluate(() => !!document.querySelector('.arw-trail'))),
        `${loc}: nothing has moved yet — the rail is inert while it is built`);

      /* ⚠ WAIT ON THE SIGNAL. The run is STEPPED — one beat per card — so a
         fixed 600ms sleep expires mid-journey and everything after it is
         correctly refused by the tool. */
      await page.evaluate(() => document.querySelector('[data-fk="run"]').click());
      await page.waitForFunction(() => !document.querySelector('.arw-mat.arw-running'), { timeout: 25000, polling: 80 });
      await wait(160);

      const pts = await page.evaluate(() => {
        const el = document.querySelector('.arw-trail');
        return el ? el.getAttribute('points').trim().split(/\s+/).map((p) => p.split(',').map(Number)) : null;
      });
      const st0 = T.newState();
      /* ⚠ the trail is the model's OFFSET polyline, not bare cell centres:
         every vertex is pushed perpendicular to travel so a there-and-back
         rail draws two lanes instead of one line. Compare against the
         model's own render function — still the model, never a second
         guess. */
      const want = T.trailPoints(T.run(st0.pose, rail, st0.n)).map((p) => [p.x, p.y]);
      is(pts && pts.length === want.length && pts.every((p, i) => p[0] === want[i][0] && p[1] === want[i][1]),
        `${loc}: ⭐ it RAN — the trail on production is the model's own geometry, all ${want.length} vertices`);
      /* ⭐ and a turn is VISIBLE on it — the defect that shipped */
      const pivots = await page.evaluate(() => document.querySelectorAll('.arw-pivot').length);
      is(pivots === 1, `${loc}: ⭐ the turn card leaves a pivot mark on the trail (${pivots})`);

      /* 3: the beetle's-eye toggle really rotates the mat, and the beetle
         rides it. ⚠ THE OLD ASSERTION HERE DEMANDED `.arw-fixed` — i.e. it
         demanded the DEFECT: a beetle pinned to the mat centre, which on an
         even-sided mat is a grid vertex and never a square. */
      await page.evaluate(() => document.querySelector('[data-fk="eye"]').click());
      await wait(700);
      const rot = await page.evaluate(() => {
        const f = document.querySelector('.arw-frame');
        const b = document.querySelector('.arw-beetle');
        const m = f ? new DOMMatrixReadOnly(getComputedStyle(f).transform) : null;
        return {
          deg: m ? Math.round(Math.atan2(m.b, m.a) * 180 / Math.PI) : 0,
          inside: !!(f && b && f.contains(b)),
          pinned: !!document.querySelector('.arw-beetle.arw-fixed')
        };
      });
      is(rot.deg !== 0 && rot.inside && !rot.pinned,
        `${loc}: the mat turns ${rot.deg}deg with the beetle riding it on its own square`);
    } catch (e) {
      FAIL++; console.error(`  FAIL ${loc}: ${e.message}`);
    } finally {
      await browser.close();
    }
  }
  console.log('');
  console.log(FAIL ? `FAIL — ${PASS} passed, ${FAIL} failed` : `PASS — ${PASS} assertions on production across ${LOCALES.length} locales`);
  process.exit(FAIL ? 1 : 0);
})();
