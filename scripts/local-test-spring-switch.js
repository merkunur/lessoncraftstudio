#!/usr/bin/env node
/* =====================================================================
   local-test-spring-switch.js — the interaction gate for ACTIVITY #25,
   "Chuffer's Switchyard" (K.OA.A.3), the Spring Switch.
   Real pointer: a tap on the release lever = one crate, a HOLD = a stream;
   the switch flicked between crates; the dials; the coupler (and Check);
   a one-car Check, an unset plate, a wrong left number (counted again),
   a banked way, the turntable's mirror, a repeated way, every way of 4 →
   the shell celebrates; a sealed round (send the missing part) and a
   back-up round (merge, set the whole); Make ten and 6 to 9 rounds; free
   play; the width sweep. Expectations computed HERE from the design (§6–7).
   Usage: node scripts/local-test-spring-switch.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'chuffer.rail-decompose.k-oa-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const STR = require(path.join(MINI, 'spring-switch-activity.js')).strings;
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice(12));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice(20));
    else file = path.join(MINI, p.replace(/^\//, ''));
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
  async function open(loc, w, level) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/spring-switch-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SpringSwitchActivity && window.SpringSwitchActivity.st && document.querySelector('.sw-yard'), { timeout: 8000 });
    await page.evaluate((level) => { const t = window.SpringSwitchActivity; t.FAST = true; if (level && t.api.settings.numbers !== level) { t.api.settings.numbers = level; t._pool = null; } }, level || 'upto5');
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.SpringSwitchActivity._cur(); return { id: s.id, kind: s.kind, n: s.n, hill: s.hill, L: s.L, R: s.R, sw: s.sw, plate: Object.assign({}, s.plate), found: s.found.slice(), misses: s.misses, help: s.help, done: s.done, backed: s.backed, explore: s.explore }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.sw-note'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => e.offsetParent !== null && !e.hidden); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no visible element ' + sel); return c; };
  async function clickSel(page, sel, ms) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(ms || 40); }
  async function hold(page, ms) { const c = await center(page, '.sw-lever'); await page.mouse.move(c.x, c.y); await page.mouse.down(); await wait(ms); await page.mouse.up(); await wait(60); }
  async function force(page, suffix) {
    await page.evaluate((suffix) => { const t = window.SpringSwitchActivity; t._playing = false; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id.endsWith(suffix)); const order = [i]; for (let k = 0; k < pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, suffix);
    await wait(80);
  }
  async function setSwitch(page, side) { const s = await state(page); if (s.sw !== side) await clickSel(page, '.sw-switch'); is((await state(page)).sw === side, `switch set to ${side}`); }
  async function dial(page, box, v) { await clickSel(page, '.sw-circle-' + box); await clickSel(page, `.sw-key:nth-child(${v})`); }
  /* route a + b by real taps: a crates left, then the rest right */
  async function route(page, a, b) {
    await setSwitch(page, 'L');
    for (let i = 0; i < a; i++) await clickSel(page, '.sw-lever');
    await setSwitch(page, 'R');
    for (let i = 0; i < b; i++) await clickSel(page, '.sw-lever');
  }

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    const tag = `[${loc}]`;
    /* ALL WAYS 4 */
    await force(page, 'all.4');
    let s = await state(page);
    is(s.kind === 'all' && s.n === 4 && s.hill === 4 && s.L === 0 && s.R === 0, `${tag} all 4 loaded (${s.hill})`);
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === interp(STR.promptAll[loc], { n: 4 }), `${tag} prompt "${interp(STR.promptAll[loc], { n: 4 })}"`);
    await clickSel(page, '.sw-go');
    is((await note(page)) === STR.hintStart[loc] && (await state(page)).misses === 0, `${tag} empty Check → "${await note(page)}"`);
    await setSwitch(page, 'L');
    await clickSel(page, '.sw-lever');
    s = await state(page);
    is(s.L === 1 && s.R === 0 && s.hill === 3, `${tag} a tap on the lever = exactly one crate, to the left (L ${s.L})`);
    await clickSel(page, '.sw-coupler');
    is((await note(page)) === STR.hintOneEmpty[loc] && (await state(page)).misses === 0, `${tag} the coupler with one car empty → "${await note(page)}"`);
    await setSwitch(page, 'R');
    await hold(page, 260);
    s = await state(page);
    is(s.R === 3 && s.hill === 0, `${tag} holding the lever streams the rest to the right (R ${s.R})`);
    is(await page.evaluate(() => document.querySelectorAll('.sw-car-r .sw-slot.is-full').length === 3 && document.querySelectorAll('.sw-car-l .sw-slot.is-full').length === 1), `${tag} the cars show 1 and 3`);
    await clickSel(page, '.sw-go');
    is((await note(page)) === STR.hintUnset[loc], `${tag} plate unset → "${await note(page)}"`);
    await dial(page, 'a', 2); await dial(page, 'b', 3);
    s = await state(page);
    is(s.plate.a === 2 && s.plate.b === 3, `${tag} the dials set 2 and 3`);
    await clickSel(page, '.sw-go');
    s = await state(page);
    is(s.misses === 1 && (await note(page)) === STR.hintCountL[loc] && (await page.evaluate(() => document.querySelector('.sw-car-l').classList.contains('is-lit'))), `${tag} a wrong left number → "${await note(page)}", the left car lights`);
    is(!(await page.evaluate(() => document.querySelector('.sw-eq').classList.contains('is-on'))), `${tag} the equation is not printed by the app`);
    await dial(page, 'a', 1);
    await clickSel(page, '.sw-coupler');
    s = await state(page);
    is(s.found.join() === '1+3' && s.hill === 4 && !s.L && !s.R && s.plate.a == null, `${tag} 1 + 3 banked, the crates back home`);
    is((await note(page)) === interp(STR.banked[loc], { n: 4, a: 1, b: 3 }) && (await page.evaluate(() => document.querySelector('.sw-eq').textContent)) === '4 = 1 + 3', `${tag} "${await note(page)}" and the equation 4 = 1 + 3`);
    is(await page.evaluate(() => document.querySelectorAll('.sw-row.is-found').length === 1 && document.querySelectorAll('.sw-row').length === 3), `${tag} the route book: 1 of 3 rows`);
    /* the turntable */
    await clickSel(page, '.sw-turn');
    s = await state(page);
    is(s.L === 3 && s.R === 1 && s.plate.a == null, `${tag} the turntable turns the pair round: 3 and 1`);
    await dial(page, 'a', 3); await dial(page, 'b', 1); await clickSel(page, '.sw-go');
    is((await state(page)).found.join() === '1+3,3+1', `${tag} 3 + 1 banked`);
    /* a repeated way */
    await route(page, 1, 3); await dial(page, 'a', 1); await dial(page, 'b', 3); await clickSel(page, '.sw-go');
    s = await state(page);
    is(s.found.length === 2 && s.misses === 0 && (await note(page)) === STR.hintRepeat[loc] && s.hill === 4, `${tag} a repeated way → "${await note(page)}", not banked, backed up`);
    /* the last way: 2 + 2 completes the round */
    await route(page, 2, 2); await dial(page, 'a', 2); await dial(page, 'b', 2); await clickSel(page, '.sw-go');
    await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 4000 }).catch(() => {});
    s = await state(page);
    is(s.done && s.found.length === 3, `${tag} every way of 4 found`);
    is((await bubble(page)) === interp(STR.celebrateAll[loc], { n: 4 }), `${tag} "${await bubble(page)}"`);
    /* the back-up chip: crates home, the whole unchanged */
    await force(page, 'all.5');
    await route(page, 2, 3);
    await clickSel(page, '.sw-back');
    s = await state(page);
    is(s.hill === 5 && !s.L && !s.R, `${tag} back up rolls every crate home (5)`);
    /* SEALED 5 = 2 + ☐ (the left car under the tarp) */
    await force(page, 'sealed.2-3');
    s = await state(page);
    is(s.hill === 10 && s.sw === 'R' && (await page.evaluate(() => !document.querySelector('.sw-tarp').hidden && document.querySelector('.sw-tarp').textContent === '2')), `${tag} sealed: the tarp says 2, the wagon holds 10, the switch faces the open car`);
    await clickSel(page, '.sw-switch');
    is((await state(page)).sw === 'R', `${tag} sealed: the switch does not move`);
    for (let i = 0; i < 4; i++) await clickSel(page, '.sw-lever');
    await dial(page, 'b', 4); await clickSel(page, '.sw-go');
    s = await state(page);
    is(s.misses === 1 && (await note(page)) === interp(STR.hintTogether[loc], { n: 5 }), `${tag} sealed: 4 sent → "${await note(page)}"`);
    is(await page.evaluate(() => document.querySelectorAll('.sw-car-r .sw-slot.is-extra').length === 1), `${tag} sealed: the extra crate is ringed`);
    await clickSel(page, '.sw-back');
    for (let i = 0; i < 3; i++) await clickSel(page, '.sw-lever');
    await dial(page, 'b', 3); await clickSel(page, '.sw-go');
    await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 4000 }).catch(() => {});
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateMake[loc], { a: 2, b: 3, n: 5 }), `${tag} sealed: "${await bubble(page)}"`);
    /* BACK UP 2 + 1 */
    await force(page, 'backup.2-1');
    s = await state(page);
    is(s.L === 2 && s.R === 1 && s.hill === 0, `${tag} back-up: two loaded cars`);
    await clickSel(page, '.sw-go');
    is((await note(page)) === STR.hintBackFirst[loc], `${tag} back-up: "${await note(page)}"`);
    await clickSel(page, '.sw-back');
    is((await state(page)).hill === 3, `${tag} back-up: the crates merge in the wagon`);
    await dial(page, 'w', 2); await clickSel(page, '.sw-go');
    is((await note(page)) === STR.hintCountAll[loc] && (await state(page)).misses === 1, `${tag} back-up: a part as the whole → "${await note(page)}"`);
    await dial(page, 'w', 3); await clickSel(page, '.sw-go');
    await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 4000 }).catch(() => {});
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateMake[loc], { a: 2, b: 1, n: 3 }), `${tag} back-up: "${await bubble(page)}"`);
    /* free play */
    await clickSel(page, '.sw-playbtn');
    s = await state(page);
    is(s.explore && s.n === 5 && (await note(page)) === STR.playNote[loc], `${tag} the shunting yard opens`);
    await clickSel(page, '.sw-stepper .sw-step:nth-child(2)');
    is((await state(page)).n === 6, `${tag} the load goes up to 6`);
    await hold(page, 260);
    s = await state(page);
    is(s.hill === 0 && s.L === 6 && (await page.evaluate(() => document.querySelector('.sw-circle-a').textContent)) === '6', `${tag} the plate reads itself (6)`);
    await clickSel(page, '.sw-playbtn');
    is(!(await state(page)).explore, `${tag} back to the task`);
    is(errs.length === 0, `${tag} no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* 6 to 9 (four ways of 8) and Make ten (one staircase across the pass) */
  {
    const { page, errs } = await open('en', 704, 'six9');
    await force(page, 'all.8');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === interp(STR.promptSome.en, { n: 8, w: 4 }), '6–9: "Find 4 ways to split 8 crates."');
    is(await page.evaluate(() => document.querySelectorAll('.sw-row').length === 7), '6–9: the route book shows 7 rows for 8');
    for (const [a, b] of [[1, 7], [2, 6], [3, 5], [4, 4]]) { await route(page, a, b); await dial(page, 'a', a); await dial(page, 'b', b); await clickSel(page, '.sw-go'); }
    await wait(150);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateSome.en, { n: 8, w: 4 }), '6–9: four ways of 8 complete the round');
    await page.close();
    const o = await open('en', 704, 'ten');
    await o.page.evaluate(() => { const t = window.SpringSwitchActivity; t._order = [0, 1, 2, 3, 4, 5, 6, 7, 8]; t._curPass = 0; window.LCS_reloadFirstTask(); });
    await wait(80);
    for (let r = 0; r < 2; r++) {
      const st = await state(o.page);
      const sealedL = await o.page.evaluate(() => window.SpringSwitchActivity.st.sealed.side === 'L');
      const k = await o.page.evaluate(() => window.SpringSwitchActivity.st.sealed.k);
      for (let i = 0; i < 10 - k; i++) await clickSel(o.page, '.sw-lever');
      await dial(o.page, sealedL ? 'b' : 'a', 10 - k); await clickSel(o.page, '.sw-go');
      await wait(100);
      is(await o.page.evaluate((n) => document.querySelectorAll('.sw-row.is-found').length === n && document.querySelectorAll('.sw-row').length === 9, r + 1), `Make ten: ${r + 1} bond(s) of 10 on the staircase`);
      await o.page.evaluate(() => { const c = document.querySelector('.lcs-activity-next'); if (c && !c.disabled) c.click(); });
      await wait(250);
      void st;
    }
    is(errs.length === 0 && o.errs.length === 0, 'six9/ten: no page errors');
    await o.page.close();
  }

  /* the width sweep (en, default level) */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const sfx of ['all.5', 'sealed.2-3', 'backup.2-3']) {
      await force(page, sfx);
      if (sfx === 'all.5') { await page.evaluate(() => { const t = window.SpringSwitchActivity; t._releaseOne(); t._releaseOne(); t._flick('R'); t._releaseOne(); t._openDial('a'); }); await wait(60); }
      const m = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - window.innerWidth;
        const app = document.querySelector('.lcs-app').getBoundingClientRect();
        const btns = [...document.querySelectorAll('.lcs-stage button')].filter(e => e.offsetParent && !e.hidden).map(e => { const r = e.getBoundingClientRect(); return { d: Math.min(r.width, r.height), c: e.className, out: r.left < app.left - 1 || r.right > app.right + 1 }; });
        const img = document.querySelector('.sw-train'); const ir = img && !img.hidden ? img.getBoundingClientRect() : null;
        const go = document.querySelector('.sw-go').getBoundingClientRect();
        const yard = document.querySelector('.sw-yard').getBoundingClientRect();
        return { over, minBtn: Math.min(...btns.map(b => b.d)), small: btns.filter(b => b.d < 44).map(b => b.c).join(','), out: btns.filter(b => b.out).length, train: ir ? Math.min(ir.width, ir.height) : 0, goBottom: go.bottom, vh: window.innerHeight, yardOut: yard.right > app.right + 1 };
      });
      const tg = `[en @${w} ${sfx}]`;
      is(m.over <= 0 && m.out === 0 && !m.yardOut, `${tg} no horizontal overflow (${m.over}, ${m.out})`);
      is(m.minBtn >= 44, `${tg} every control ≥ 44 px (${m.minBtn.toFixed(0)} ${m.small})`);
      is(m.train >= (w >= 700 ? 96 : 64) - 0.5, `${tg} the train ${m.train.toFixed(0)} px`);
      is(m.goBottom <= m.vh + 8, `${tg} Check on screen (${m.goBottom.toFixed(0)} ≤ ${m.vh})`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `sw-${sfx}-${w}.png`) });
    }
    is(errs.length === 0, `[en @${w}] no page errors`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-spring-switch: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
