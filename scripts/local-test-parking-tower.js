#!/usr/bin/env node
/* =====================================================================
   local-test-parking-tower.js — the interaction gate for ACTIVITY #36,
   Bramble's Parking Tower (K.G.A.1 → G2 grid codes + compass).
   Real pointer: Check with nothing parked (asks, no miss); an occupied
   bay refuses; a wrong bay → the truck drives the lift there and the
   route stays; miss 1 grows the asked arrows (teal) and the done arrow
   (coral); miss 2 glows the right bay with a ghost; a new park clears the
   showing; the right bay wins (barrier, bubble); free re-park after the
   win; a reverse round (tap his truck); vertical "between"; the tower
   words (the basement is a ride DOWN, the street spots, a closed roof
   on the level rounds); the plan: a code tapped (letter and number
   swapped is wrong — the tickets, the lit strips), the compass on a
   turned rose, a code read on the dials, the 10 × 10 plan; the setting
   changes the board; the keyboard; the width sweep (no sideways scroll,
   every control ≥ 44 px, inside the card, above the fold, pressable;
   pictures ≥ 96 / 64 px; no library picture used as a map token).
   Usage: node scripts/local-test-parking-tower.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'parking-tower.place-by-relation.k-g-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'parking-tower-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, ParkingTowerCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'parking-tower-activity.js'), 'utf8') + '\n;this.__A = ParkingTowerActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));

/* a case-sensitive server, like production */
function exact(file) { const parts = path.relative(REPO, file).split(path.sep); let cur = REPO; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice(12)) : p.startsWith('/image-library-webp/') ? path.join(IMG, p.slice(20)) : path.join(MINI, p.replace(/^\//, ''));
    if (!exact(file)) { res.statusCode = 404; res.end(); return; }
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function open(loc, w) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/parking-tower-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.ParkingTowerActivity && window.ParkingTowerActivity.st && document.querySelector('.pt-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.ParkingTowerActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.ParkingTowerActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, read: s.read, parked: s.parked, sel: s.sel, dials: s.dials, misses: s.misses, help: s.help, done: s.done })); });
  const note = (page) => page.evaluate(() => document.querySelector('.pt-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  const bay = (page, k) => ctr(page, `.pt-spot[data-k="${k}"]`);
  const sqr = (page, code) => ctr(page, `.pt-sq[data-code="${code}"]`);
  async function tap(p, page) { if (!p) throw new Error('nothing to tap'); await page.mouse.click(p.x, p.y); await wait(90); }
  async function force(page, words, id) {
    await page.evaluate((w, id) => { const t = window.ParkingTowerActivity; t.api.settings.words = w; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); }, words, id);
    await wait(250);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const check = (page) => tap(null, page).catch(() => {}).then(async () => { await tap(await ctr(page, '.pt-check'), page); });
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const T = (loc, k) => STR[k][loc];
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);

    /* 1. N1: next to the bus */
    await force(page, 'near', 'N1');
    is((await prompt(page)) === T(loc, 'p_N1'), `${loc}: the prompt (${await prompt(page)})`);
    const u = await page.evaluate(() => [...document.querySelectorAll('.pt-u')].map(e => e.className.split(' ')[1] + ':' + e.textContent));
    const want = T(loc, 'u_N1').split('|');
    is(u.length === 2 && u[0] === 'is-mv:' + want[0] && u[1] === 'is-lm:' + want[1], `${loc}: the truck word underlined teal, the bus word coral (${u})`);
    is(await page.evaluate(() => { const c = document.querySelector('.pt-stage').cloneNode(true); return c.textContent.trim() === ''; }), `${loc}: no words on the apparatus`);
    is(await page.evaluate(() => [...document.querySelectorAll('.pt-stage img')].every(i => i.complete && i.naturalWidth > 0)), `${loc}: every picture loads (case-exact)`);
    is(await count(page, '.pt-ring.is-lm') === 1 && await page.evaluate(() => getComputedStyle(document.querySelector('.pt-mover')).outlineColor === 'rgb(20, 107, 94)'), `${loc}: a coral ring on the bus, a teal ring on the truck`);
    await check(page);
    is((await state(page)).misses === 0 && (await note(page)) === T(loc, 'hintTapFree'), `${loc}: Check with nothing parked asks — not a miss`);
    await tap(await bay(page, '1,3'), page);
    is((await state(page)).parked === null, `${loc}: an occupied bay refuses`);
    await tap(await bay(page, '1,2'), page); await wait(150);
    let s = await state(page);
    is(s.parked && s.parked.c === 1 && s.parked.l === 2, `${loc}: a tap on a free bay parks the truck there`);
    is(await page.evaluate(() => { const pl = document.querySelector('.pt-route'); return pl && pl.getAttribute('points').split(' ').length === 4; }), `${loc}: the route stays: to the lift, up, across`);
    await check(page);
    is((await note(page)) === T(loc, 'hintNext') && (await state(page)).misses === 1, `${loc}: miss 1 — next to is the same floor`);
    is(await count(page, '.pt-arrow.is-ask') === 2 && await count(page, '.pt-arrow.is-did') === 1 && await count(page, '.pt-spot.is-wrongspot') === 1, `${loc}: two teal arrows (both sides), one coral arrow to the truck`);
    await check(page);
    is((await note(page)) === T(loc, 'hintStrong') && await page.evaluate(() => document.querySelector('.pt-spot.is-right') && document.querySelector('.pt-spot.is-right').getAttribute('data-k') === '2,1' && !document.querySelector('.pt-ghost').hidden), `${loc}: miss 2 — the right bay glows with a ghost truck`);
    await tap(await bay(page, '3,2'), page); await wait(120);
    is((await state(page)).help === 0 && await count(page, '.pt-arrow') === 0 && (await note(page)) === '', `${loc}: a new park clears the showing`);
    if (SHOT && loc === 'en') { await force(page, 'near', 'N1'); await tap(await bay(page, '1,2'), page); await check(page); await page.screenshot({ path: path.join(SHOT, 'n1-miss.png') }); }
    await tap(await bay(page, '2,1'), page); await wait(120); await check(page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'ok_N1')), `${loc}: next to the bus wins (${await bubble(page)})`);
    is(await page.evaluate(() => document.querySelector('.pt-booth').classList.contains('is-open')), `${loc}: Bramble lifts the barrier`);
    await tap(await bay(page, '1,2'), page); await wait(120);
    s = await state(page);
    is(s.done && s.parked.c === 1 && s.parked.l === 2, `${loc}: after the win the truck can be re-parked (free play)`);

    /* 2. N7: Bramble parked above the bus — tap his truck */
    await force(page, 'near', 'N7');
    is((await prompt(page)) === T(loc, 'p_N7') && await count(page, '.pt-ring.is-mv') === 3 && await page.evaluate(() => document.querySelector('.pt-mover').hidden), `${loc}: N7 — three trucks ringed teal, none waiting`);
    await tap(await bay(page, '2,2'), page); await check(page);
    is((await note(page)) === T(loc, 'hintAbove') && await count(page, '.pt-slab.is-pulse') === 1, `${loc}: the diagonal truck is not above the bus — the slab pulses`);
    await tap(await bay(page, '3,2'), page); await check(page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'ok_N7')), `${loc}: his truck is above the bus`);

    /* 3. N9: between the two trucks — up the column */
    await force(page, 'near', 'N9');
    await tap(await bay(page, '2,1'), page); await wait(120); await check(page);
    is((await note(page)) === T(loc, 'hintBetween') && await count(page, '.pt-arrow.is-ask') === 2, `${loc}: N9 — beside only the lower truck: two inward arrows`);
    await tap(await bay(page, '1,2'), page); await wait(120); await check(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'ok_N9')), `${loc}: the car between the two trucks`);

    /* 4. T3: under the tower — the basement is a ride DOWN */
    await force(page, 'tower', 'T3');
    is(await count(page, '.pt-spot.is-base') === 1 && await count(page, '.pt-spot.is-roof') === 0, `${loc}: T3 — a basement, no roof deck`);
    await tap(await bay(page, 'SR'), page); await wait(120); await check(page);
    is((await note(page)) === T(loc, 'hintTUnder') && await count(page, '.pt-zone') === 1, `${loc}: the street is not under the tower — the basement glows`);
    await tap(await bay(page, 'BASE'), page); await wait(120);
    is(await page.evaluate(() => { const p = document.querySelector('.pt-route').getAttribute('points').split(' ').map(x => x.split(',').map(Number)); return p[2][1] > p[1][1] + 20; }), `${loc}: the route to the basement goes DOWN the lift`);
    await check(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'ok_T3')), `${loc}: the truck under the tower`);
    await force(page, 'tower', 'T6');
    is(await count(page, '.pt-spot.is-base') === 0 && await count(page, '.pt-spot.is-roof') === 0 && await count(page, '.pt-parapet') === 1, `${loc}: T6 — the top level: no basement, a closed roof`);
    await tap(await bay(page, '1,1'), page); await wait(120); await check(page);
    is((await note(page)) === T(loc, 'hintTTop') && await count(page, '.pt-zone') === 1, `${loc}: the bottom level is not the top — the top floor glows`);
    await tap(await bay(page, '1,3'), page); await wait(120); await check(page);
    is((await state(page)).done, `${loc}: the bus on the top level`);
    await force(page, 'tower', 'T1');
    await tap(await bay(page, 'ROOF'), page); await wait(120); await check(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'ok_T1')), `${loc}: the car on top of the tower`);

    /* 5. P3: a code — letter and number swapped is wrong */
    await force(page, 'plan6', 'P3');
    is((await prompt(page)) === interp(T(loc, 'pCode_bulldozer'), { code: 'A6' }), `${loc}: "park the bulldozer in A6"`);
    is(await count(page, '.pt-sq img') === 0 && await count(page, '.pt-key img') === 1, `${loc}: the map holds drawn tokens; the key holds the picture`);
    await tap(await sqr(page, 'F1'), page); await check(page);
    is((await note(page)) === T(loc, 'hintCode') && await page.evaluate(() => [...document.querySelectorAll('.pt-tk')].map(e => e.textContent).join() === 'F1,A6') && await page.evaluate(() => document.querySelector('.pt-collab.is-lit').textContent + document.querySelector('.pt-rowlab.is-lit').textContent) === 'F1', `${loc}: F1 is wrong — the tickets F1 / A6, the F column and row 1 light`);
    await tap(await sqr(page, 'A6'), page); await check(page);
    is((await state(page)).done && (await bubble(page)).includes(interp(T(loc, 'okCode'), { code: 'A6' })), `${loc}: A6 wins`);

    /* 6. P8: south on a rose whose north points right */
    await force(page, 'plan6', 'P8');
    is((await prompt(page)) === T(loc, 'p_P8') && await page.evaluate(() => /rotate\(90\)/.test(document.querySelector('.pt-rose').innerHTML)), `${loc}: P8 — the rose is turned`);
    await tap(await sqr(page, 'C4'), page); await check(page);
    is((await note(page)) === T(loc, 'hintNorth') && await page.evaluate(() => document.querySelector('.pt-rose').classList.contains('is-hint')) && await count(page, '.pt-arrow.is-did') === 1, `${loc}: down the screen is not south here — find north first`);
    await tap(await sqr(page, 'B3'), page); await check(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'ok_P8')), `${loc}: one square south (to the left)`);

    /* 7. P4: read the code on the dials */
    await force(page, 'plan6', 'P4');
    is((await prompt(page)) === T(loc, 'pRead_bus') && await count(page, '.pt-dialbtn') === 4, `${loc}: P4 — where is the bus? two dials`);
    await check(page);
    is((await note(page)) === T(loc, 'hintDials') && (await state(page)).misses === 0, `${loc}: Check with the dials unset asks`);
    const dn = async (i, n) => { for (let k = 0; k < n; k++) await tap(await page.evaluate((i) => { const b = document.querySelectorAll('.pt-dialbtn')[i]; const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, i), page); };
    await dn(1, 4); await dn(3, 2);
    is((await state(page)).dials.l === 4 && (await state(page)).dials.n === 2, `${loc}: ▼ turns the wheels: D, 2`);
    await check(page);
    is((await state(page)).help === 1 && await page.evaluate(() => !document.querySelector('.pt-movetok.is-ghost').hidden), `${loc}: D2 is wrong — a ghost token drives to D2`);
    await dn(3, 1); await check(page);
    is((await state(page)).done && (await bubble(page)).includes(interp(T(loc, 'okCode'), { code: 'D3' })), `${loc}: D3 wins`);

    /* 8. Q3: the 10 × 10 plan at a desktop card — tap J9 */
    await force(page, 'plan10', 'Q3');
    is(await count(page, 'button.pt-sq') === 100 && !(await state(page)).read, `${loc}: Q3 — a hundred tappable squares`);
    await tap(await sqr(page, 'J9'), page); await check(page);
    is((await state(page)).done, `${loc}: J9 wins`);

    /* 9. the setting changes the board */
    for (const [w, sel, n] of [['near', '.pt-spot', 9], ['tower', '.pt-spot.is-sl', 1], ['plan6', '.pt-sq', 36], ['plan10', '.pt-sq', 100]]) {
      await page.evaluate((w) => { const t = window.ParkingTowerActivity; t.api.settings.words = w; t.onSettings(); }, w); await wait(250);
      is((await count(page, sel)) === n, `${loc}: "${w}" — ${n} × ${sel}`);
    }

    /* 10. the keyboard */
    if (loc === 'en' || loc === 'fi') {
      await force(page, 'near', 'N1');
      await page.focus('.pt-spot[data-k="1,2"]'); await page.keyboard.press('Enter'); await wait(120);
      s = await state(page);
      is(s.parked && s.parked.c === 1 && s.parked.l === 2, `${loc}: keyboard: Enter on a free bay parks`);
      await page.keyboard.press('ArrowRight'); await wait(40);
      is(await page.evaluate(() => document.activeElement.getAttribute('data-k')) === '3,2', `${loc}: keyboard: Right skips the taken (2,2) and lands on the free (3,2)`);
    }
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('fi', w);
    for (const [m, id] of [['near', 'N4'], ['near', 'N7'], ['tower', 'T1'], ['tower', 'T3'], ['plan6', 'P1'], ['plan6', 'P4'], ['plan6', 'P8'], ['plan10', 'Q1'], ['plan10', 'Q5']]) {
      await force(page, m, id);
      const probe = async (phase) => {
        const mm = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect();
          const vis = (e) => !e.hidden && e.offsetParent !== null && !e.closest('[hidden]');
          const ctl = [...document.querySelectorAll('.pt-spot, button.pt-sq, .pt-dialbtn, .pt-check')].filter(vis).map(e => { const r = e.getBoundingClientRect(); return { c: e.className.split(' ')[0], l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height }; });
          const pics = [...document.querySelectorAll('.pt-veh, .pt-mover, .pt-beaver, .pt-keypic')].filter(vis).map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
          return { docW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight, app: { l: app.left, r: app.right }, ctl, pics, sy: scrollY };
        });
        is(mm.docW <= mm.vw + 1, `${w} ${id} ${phase}: no sideways scroll`);
        mm.ctl.forEach(c => {
          if (c.l < mm.app.l - 1 || c.r > mm.app.r + 1) is(false, `${w} ${id} ${phase}: ${c.c} inside the card`);
          if (Math.min(c.w, c.h) < 44) is(false, `${w} ${id} ${phase}: ${c.c} is ${Math.round(c.w)}×${Math.round(c.h)} — under 44`);
          if (c.b + mm.sy > mm.vh + 1) is(false, `${w} ${id} ${phase}: ${c.c} below the fold (${Math.round(c.b + mm.sy)} > ${mm.vh})`);
        });
        const floor = w >= 700 ? 96 : 64;
        mm.pics.forEach(s => { if (s < floor - 0.5) is(false, `${w} ${id} ${phase}: a picture ${s.toFixed(0)} px < ${floor}`); });
        const blocked = await page.evaluate(() => [...document.querySelectorAll('.pt-spot, button.pt-sq, .pt-dialbtn, .pt-check')].filter(e => !e.hidden && e.offsetParent !== null && !e.closest('[hidden]') && !e.disabled).map(e => { e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2; const h = document.elementFromPoint(x, y); return h && (h === e || e.contains(h)) ? null : e.className.split(' ')[0] + '[' + (e.getAttribute('data-k') || e.getAttribute('data-code') || '') + '] under ' + (h ? String(h.className.baseVal != null ? h.className.baseVal : h.className).split(' ')[0] : 'none'); }).filter(Boolean));
        is(blocked.length === 0, `${w} ${id} ${phase}: every control can be pressed (${blocked.join(', ')})`);
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      };
      await probe('rest');
      await page.evaluate(() => { const t = window.ParkingTowerActivity, C = ParkingTowerCore, st = t.st, r = st.r, right = C.rightOf(r);
        if (st.read) { C.turn(st, 'l', 1); C.turn(st, 'n', 1); if (C.dialCode(st) === C.planAnswer(r)) C.turn(st, 'n', 1); }
        else if (r.kind === 'tap') C.select(st, r.cands.find(c => !C.same(c, right)));
        else if (r.mode.indexOf('plan') === 0) { for (let x = 1; x <= C.size(r) && !st.parked; x++) for (let y = 1; y <= C.size(r) && !st.parked; y++) { const c = C.codeOf(x, y); if (c !== right) C.park(st, c); } }
        else C.park(st, r.cands.find(c => !C.same(c, right)));
        C.check(st); if (st.parked && r.mode.indexOf('plan') !== 0) t._route = t._routeOf(st.parked); t._paint(); });
      await wait(60); await probe('miss 1');
      await page.evaluate(() => { const t = window.ParkingTowerActivity; ParkingTowerCore.check(t.st); t._paint(); });
      await wait(60); await probe('miss 2');
      if (SHOT && (w === 360 || w === 704 || w === 1024)) await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}.png`) });
    }
    is(errs.length === 0, `${w}: no errors (${errs.join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-parking-tower: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
