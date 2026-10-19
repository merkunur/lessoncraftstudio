#!/usr/bin/env node
/* =====================================================================
   local-test-ten-seat-wheel.js — the interaction gate for ACTIVITY #28,
   "Make 10" (K.OA.A.4), the Ten-Seat Wheel.
   Real pointer on every arrow, lever and gondola: the brake before boarding
   (no miss); a short call (the wheel settles with the empty seat on top); an
   over-call (riders stand on the edge, the brake holds, everyone hops off,
   count on, the down arrow glows); a starting rider who cannot leave and a
   boarded one who can; the right call (the shell celebrates, the ticket
   prints); WHOLE with the hub; the singular prompt; Seat numbers;
   Fairground; the running animation; the width sweep. Expectations from the
   design (§5–7).
   Usage: node scripts/local-test-ten-seat-wheel.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'numberbond.make-ten.k-oa-a-4';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const STR = require(path.join(MINI, 'ten-seat-wheel-activity.js')).strings;
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
  async function open(loc, w, fast) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/ten-seat-wheel-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TenSeatWheelActivity && window.TenSeatWheelActivity.st && document.querySelector('.tw-wheel'), { timeout: 8000 });
    if (fast !== false) await page.evaluate(() => { window.TenSeatWheelActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForFunction(() => [...document.querySelectorAll('.tw-rider')].some(i => !i.hidden && i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const C = window.TenSeatWheelCore, s = window.TenSeatWheelActivity._cur(); return { kind: s.kind, n: s.n, k: s.k, dial: s.dial, hub: s.hub, boarded: s.boarded, extras: s.extras, misses: s.misses, help: s.help, done: s.done, explore: s.explore, filled: C.filledCount(s) }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.tw-note'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => e.offsetParent !== null && !e.hidden && !e.disabled); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no visible enabled element ' + sel); return c; };
  async function clickSel(page, sel, ms) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(ms || 60); }
  async function clickTimes(page, sel, n) { for (let i = 0; i < n; i++) await clickSel(page, sel, 40); }
  /* a real tap on gondola i, wherever it hangs, even when it is disabled (a refused tap must do nothing) */
  async function tapSeat(page, i) {
    const c = await page.evaluate((i) => { const el = document.querySelectorAll('.tw-gond')[i]; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.6 }; }, i);
    await page.mouse.click(c.x, c.y); await wait(60);
  }
  async function force(page, level, kind, n, k) {
    await page.evaluate((level, kind, n, k) => {
      const t = window.TenSeatWheelActivity; t._playing = false;
      if (t.api.settings.wheel !== level) { t.api.settings.wheel = level; t._pool = null; }
      const pool = t._ensurePool(); const i = pool.findIndex(r => r.kind === kind && (n == null || r.n === n) && (k == null || r.k === k));
      if (i < 0) throw new Error('no round ' + kind + n + '/' + k);
      const order = [i]; for (let q = 0; q < pool.length; q++) if (q !== i) order.push(q); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask();
    }, level, kind, n == null ? null : n, k == null ? null : k);
    await wait(120);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).catch(() => {});

  for (const loc of LOCALES) {
    const tag = `[${loc}]`, w = loc === 'en' ? 1024 : 412;
    const { page, errs } = await open(loc, w);
    is((await page.evaluate(() => getComputedStyle(document.querySelector('.lcs-activity-check')).display)) === 'none', `${tag} the shell Check is hidden`);
    /* FILL 10, 7 aboard */
    await force(page, 'ten', 'fill', 10, 7);
    is((await prompt(page)) === interp(STR.promptFill10[loc], { k: 7 }), `${tag} "${await prompt(page)}"`);
    let s = await state(page);
    is(s.dial === 5 && (await page.evaluate(() => document.querySelector('.tw-dwin').textContent)) === '5', `${tag} the dial starts at 5`);
    is((await page.evaluate(() => document.querySelectorAll('.tw-gond.is-full').length)) === 7 && (await page.evaluate(() => document.querySelectorAll('.tw-gond.is-five').length)) === 5, `${tag} seven riders aboard; seats in two fives`);
    is((await page.evaluate(() => [...document.querySelectorAll('.tw-rider')].filter(i => !i.hidden).every(i => i.complete && i.naturalWidth > 0))), `${tag} every rider picture loaded`);
    is((await page.evaluate(() => document.querySelectorAll('.tw-qrider').length)) === (w >= 700 ? 3 : 2), `${tag} the queue shows the same few riders`);
    await clickSel(page, '.tw-brake');
    s = await state(page);
    is(s.misses === 0 && (await note(page)) === STR.hintDial[loc], `${tag} the brake before boarding: "${await note(page)}"`);
    /* too few: 2 */
    await clickTimes(page, '.tw-ddown', 3); await clickSel(page, '.tw-gate');
    s = await state(page);
    is(s.dial === 2 && s.boarded === 2 && s.filled === 9, `${tag} dial 2, the gate boards two`);
    await clickSel(page, '.tw-brake', 100);
    s = await state(page);
    is(s.misses === 1 && (await note(page)) === STR.hintShort[loc], `${tag} too few: "${await note(page)}"`);
    const top = await page.evaluate(() => { const g = [...document.querySelectorAll('.tw-gond')]; const ys = g.map(e => e.getBoundingClientRect().top); const empty = g.findIndex(e => e.classList.contains('is-empty')); return { emptyTop: ys[empty], minTop: Math.min(...ys), glow: document.querySelectorAll('.tw-gond.is-glow').length }; });
    is(Math.abs(top.emptyTop - top.minTop) < 2 && top.glow === 1, `${tag} the wheel settles with the empty seat on top (${JSON.stringify(top)})`);
    /* too many: 6 */
    await clickTimes(page, '.tw-dup', 4); await clickSel(page, '.tw-gate');
    s = await state(page);
    is(s.boarded === 3 && s.extras === 3 && (await page.evaluate(() => document.querySelectorAll('.tw-extra').length)) === 3, `${tag} dial 6 with three seats free: three riders stand on the edge`);
    await clickSel(page, '.tw-brake', 100);
    s = await state(page);
    is(s.misses === 2 && s.boarded === 0 && s.extras === 0 && s.filled === 7 && !s.done, `${tag} the brake holds; everyone boarded hops back off`);
    is((await note(page)) === interp(STR.hintCountOn[loc], { seq: '8, 9, 10' }), `${tag} miss 2: "${await note(page)}"`);
    is((await page.evaluate(() => document.querySelector('.tw-ddown').classList.contains('is-glow') && !document.querySelector('.tw-dup').classList.contains('is-glow'))), `${tag} the down arrow glows`);
    is((await page.evaluate(() => [...document.querySelectorAll('.tw-mark')].filter(e => !e.hidden).map(e => e.textContent).join())) === '8,9,10', `${tag} the empty seats count on 8, 9, 10`);
    /* let off: a starting rider stays, a boarded one leaves */
    await clickTimes(page, '.tw-ddown', 3); await clickSel(page, '.tw-gate');
    s = await state(page);
    is(s.boarded === 3 && s.extras === 0 && s.filled === 10, `${tag} dial 3 → three board, the wheel is full`);
    await tapSeat(page, 0);
    is((await state(page)).boarded === 3, `${tag} a starting rider cannot leave`);
    await tapSeat(page, 9);
    s = await state(page);
    is(s.boarded === 2 && s.dial === 2, `${tag} a boarded rider hops off; the dial follows (${s.dial})`);
    await clickSel(page, '.tw-dup'); await clickSel(page, '.tw-gate'); await clickSel(page, '.tw-brake', 200); await celebrated(page);
    s = await state(page);
    is(s.done && (await bubble(page)) === interp(STR.celebrateFill[loc], { k: 7, m: 3, n: 10 }), `${tag} 7 + 3: "${await bubble(page)}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.tw-bp')].map(e => e.textContent).join())) === '7,3', `${tag} the bond board fills 7 and 3`);
    if (w >= 700) is((await page.evaluate(() => [...document.querySelectorAll('.tw-ticket')].map(e => e.textContent).join('|'))) === '10 = 7 + 3', `${tag} the ticket prints 10 = 7 + 3`);
    /* singular */
    await force(page, 'ten', 'fill', 10, 1);
    is((await prompt(page)) === STR.promptFill10One[loc], `${tag} "${await prompt(page)}"`);
    await force(page, 'upto5', 'fill', 4, 1);
    is((await prompt(page)) === interp(STR.promptFillOne[loc], { n: 4 }), `${tag} "${await prompt(page)}"`);
    /* WHOLE 2 + 2 */
    await force(page, 'upto5', 'whole', 4);
    is((await prompt(page)) === STR.promptWhole[loc], `${tag} whole: "${await prompt(page)}"`);
    is((await page.evaluate(() => document.querySelector('.tw-hub').textContent)) === '?' && (await page.evaluate(() => document.querySelector('.tw-dwin').hidden && document.querySelector('.tw-gate').hidden)), `${tag} the hub shows ?, no gate`);
    await clickSel(page, '.tw-brake');
    is((await state(page)).misses === 0 && (await note(page)) === STR.hintHub[loc], `${tag} unset hub: "${await note(page)}"`);
    await clickSel(page, '.tw-dup'); await clickSel(page, '.tw-brake', 100);
    s = await state(page);
    is(s.hub === 6 && s.misses === 1 && (await note(page)) === STR.hintWhole[loc], `${tag} hub 6: "${await note(page)}"`);
    await clickTimes(page, '.tw-ddown', 2); await clickSel(page, '.tw-brake', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateWhole[loc], { a: 2, b: 2, n: 4 }), `${tag} "${await bubble(page)}"`);
    /* Seat numbers */
    await force(page, 'ten', 'fill', 10, 4);
    const off = await page.evaluate(() => [...document.querySelectorAll('.tw-seatno')].filter(e => getComputedStyle(e).display !== 'none').length);
    await page.evaluate(() => { const t = window.TenSeatWheelActivity; t.api.settings.seatNums = 'on'; t.onSettings(); }); await wait(60);
    const on = await page.evaluate(() => [...document.querySelectorAll('.tw-seatno')].filter(e => getComputedStyle(e).display !== 'none').map(e => e.textContent).join());
    is(off === 0 && on === '1,2,3,4,5,6,7,8,9,10', `${tag} Seat numbers on: 1–10 (${on})`);
    await page.evaluate(() => { const t = window.TenSeatWheelActivity; t.api.settings.seatNums = 'off'; t.onSettings(); });
    /* Fairground */
    await clickSel(page, '.tw-playbtn');
    s = await state(page);
    is(s.explore && s.n === 6 && (await note(page)) === STR.playNote[loc], `${tag} the Fairground opens on a wheel of 6`);
    await clickSel(page, '.tw-step:last-child');
    is((await state(page)).n === 7 && (await page.evaluate(() => document.querySelectorAll('.tw-gond').length)) === 7, `${tag} more seats`);
    await clickSel(page, '.tw-playbtn');
    is(!(await state(page)).explore, `${tag} back to the rounds`);
    is(errs.length === 0, `${tag} no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the running animation (not FAST) */
  {
    const { page, errs } = await open('en', 1024, false);
    await force(page, 'ten', 'fill', 10, 8);
    await clickTimes(page, '.tw-ddown', 3); await clickSel(page, '.tw-gate', 10);
    const mid = await page.evaluate(() => document.querySelectorAll('.tw-gond.is-full').length);
    await wait(1200);
    const end = await page.evaluate(() => document.querySelectorAll('.tw-gond.is-full').length);
    is(mid < 10 && end === 10, `[en run] riders hop in one at a time (${mid} → ${end})`);
    const r0 = await page.evaluate(() => window.TenSeatWheelActivity._v.rot);
    await clickSel(page, '.tw-brake', 10); await wait(600);
    const r1 = await page.evaluate(() => window.TenSeatWheelActivity._v.rot);
    is(r1 != null && r1 !== r0 && (await page.evaluate(() => document.querySelector('.tw-frame').classList.contains('is-chase'))), '[en run] the full wheel turns with its bulbs chasing');
    await wait(2600); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateFill.en, { k: 8, m: 2, n: 10 }), `[en run] "${await bubble(page)}"`);
    is(errs.length === 0, '[en run] no page errors');
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const [lv, kind, n, k, act] of [['ten', 'fill', 10, 7, 'short'], ['ten', 'fill', 10, 2, 'over'], ['upto5', 'whole', 5, null, 'wrong'], ['ten', 'play', null, null, null]]) {
      if (kind === 'play') { await force(page, 'ten', 'fill', 10, 4); await clickSel(page, '.tw-playbtn'); }
      else await force(page, lv, kind, n, k);
      if (act === 'short') { await clickTimes(page, '.tw-ddown', 3); await clickSel(page, '.tw-gate'); await clickSel(page, '.tw-brake'); }
      if (act === 'over') { await clickTimes(page, '.tw-dup', 4); await clickSel(page, '.tw-gate'); }
      if (act === 'wrong') { await clickSel(page, '.tw-dup'); await clickSel(page, '.tw-brake'); await clickSel(page, '.tw-brake'); }
      const m = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - window.innerWidth;
        const app = document.querySelector('.lcs-app').getBoundingClientRect();
        const vis = (e) => e.offsetParent && !e.hidden;
        const btns = [...document.querySelectorAll('.lcs-stage button')].filter(vis).map(e => { const r = e.getBoundingClientRect(); return { d: Math.min(r.width, r.height), c: e.className, out: r.left < app.left - 1 || r.right > app.right + 1, bottom: r.bottom }; });
        const imgs = [...document.querySelectorAll('.lcs-app img')].filter(e => vis(e) && !e.classList.contains('tw-extra')).map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
        const ctrls = btns.filter(b => !/tw-gond/.test(b.c));
        const brake = document.querySelector('.tw-brake').getBoundingClientRect();
        /* two gondolas' cups never overlap */
        const cups = [...document.querySelectorAll('.tw-cup')].map(e => e.getBoundingClientRect()).map(r => ({ x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 }));
        let overlap = 0; for (let i = 0; i < cups.length; i++) for (let j = i + 1; j < cups.length; j++) if (Math.hypot(cups[i].x - cups[j].x, cups[i].y - cups[j].y) < cups[i].r + cups[j].r - 1) overlap++;
        return { over, minBtn: Math.min(...btns.map(b => b.d)), small: btns.filter(b => b.d < 44).map(b => b.c).slice(0, 3).join(','), out: btns.filter(b => b.out).length, lowest: Math.max(...ctrls.map(b => b.bottom)), brake: brake.bottom, vh: window.innerHeight, minImg: imgs.length ? Math.min(...imgs) : 0, overlap };
      });
      const tg = `[en @${w} ${lv} ${kind}${act ? ' ' + act : ''}]`;
      is(m.over <= 0 && m.out === 0, `${tg} nothing outside the card (${m.over}, ${m.out})`);
      is(m.minBtn >= 44, `${tg} every control ≥ 44 px (${m.minBtn.toFixed(0)} ${m.small})`);
      is(m.brake <= m.vh + 1, `${tg} the brake on screen (${m.brake.toFixed(0)} ≤ ${m.vh})`);
      if (!act || act === 'over') is(m.lowest <= m.vh + 1, `${tg} every control on screen (${m.lowest.toFixed(0)} ≤ ${m.vh})`);
      is(m.minImg >= (w >= 700 ? 96 : w >= 340 ? 64 : 56) - 0.5, `${tg} pictures ${m.minImg.toFixed(1)} px`);
      is(m.overlap === 0, `${tg} no two gondolas overlap (${m.overlap})`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `tw-${kind}${act ? '-' + act : ''}-${w}.png`) });
      if (kind === 'play') await clickSel(page, '.tw-playbtn');
    }
    is(errs.length === 0, `[en @${w}] no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-ten-seat-wheel: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
