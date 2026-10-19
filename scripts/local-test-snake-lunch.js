#!/usr/bin/env node
/* =====================================================================
   local-test-snake-lunch.js — the interaction gate for ACTIVITY #26,
   "Clunk's Lost Lunch" (K.OA.A.3), the Snake-Groove Lunchbox.
   Real pointer: strands tapped and one real drag onto the box; the lid
   tapped over a gap three times (count on); a tail over the rim (bonk);
   a strand tapped out of the box; the padlocked lever; a first lunch, the
   same set again (repeat), a new lunch → the shell celebrates; EXACTLY 3
   refusing 6 + 4; TOO FULL; HALF PACKED; WHAT DID with the cloud keys;
   free play; the width sweep. Expectations from the design (§6–7).
   Usage: node scripts/local-test-snake-lunch.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'clunks-lost-lunch.make-total.k-oa-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const STR = require(path.join(MINI, 'snake-lunch-activity.js')).strings;
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
    await page.goto(`${base}/snake-lunch-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SnakeLunchActivity && window.SnakeLunchActivity.st && document.querySelector('.sl-box'), { timeout: 8000 });
    await page.evaluate((level) => { const t = window.SnakeLunchActivity; t.FAST = true; if (level && t.api.settings.size !== level) { t.api.settings.size = level; t._pool = null; } }, level || 'six10');
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const C = window.SnakeLunchCore, s = window.SnakeLunchActivity._cur(); return { kind: s.kind, n: s.n, filled: C.filled(s), lid: C.lid(s), ways: s.ways.slice(), misses: s.misses, done: s.done, cloud: s.cloud, box: C.inBox(s).map(x => x.k), explore: s.explore }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.sl-note'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => e.offsetParent !== null && !e.hidden && !e.disabled); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no visible element ' + sel); return c; };
  async function clickSel(page, sel, ms) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(ms || 50); }
  const strandSel = (page, k) => page.evaluate((k) => { const st = window.SnakeLunchActivity._cur(); const s = st.strands.find(x => x.at === 'wall' && !x.locked && x.k === k); return s ? `.sl-strand[data-id="${s.id}"]` : null; }, k);
  async function tapStrand(page, k) { const sel = await strandSel(page, k); if (!sel) throw new Error('no strand ' + k); await clickSel(page, sel, 80); }
  async function dragStrand(page, k) {
    const sel = await strandSel(page, k);
    const a = await center(page, sel);
    await page.mouse.move(a.x, a.y); await page.mouse.down(); await page.mouse.move(a.x + 10, a.y + 10, { steps: 3 });
    const b = await page.evaluate(() => { const r = document.querySelector('.sl-boxwrap').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await page.mouse.move(b.x, b.y, { steps: 8 }); await page.mouse.up(); await wait(100);
  }
  async function force(page, kind, n) {
    await page.evaluate((kind, n) => { const t = window.SnakeLunchActivity; t._playing = false; const pool = t._ensurePool(); const i = pool.findIndex(r => r.kind === kind && (n == null || r.n === n)); const order = [i]; for (let k = 0; k < pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, kind, n);
    await wait(80);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 4000 }).catch(() => {});

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    const tag = `[${loc}]`;
    /* ANY WAY 10 */
    await force(page, 'any', 10);
    let s = await state(page);
    is(s.n === 10 && s.filled === 0 && (await page.evaluate(() => document.querySelector('.sl-cloud').textContent)) === '10', `${tag} any 10: the cloud says 10`);
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === interp(STR.promptAny[loc], { n: 10 }), `${tag} prompt`);
    is(await page.evaluate(() => document.querySelector('.sl-lever').classList.contains('is-locked')), `${tag} the lever is padlocked`);
    await clickSel(page, '.sl-lever');
    is((await note(page)) === STR.hintStart[loc] && (await state(page)).misses === 0, `${tag} feeding an empty box → "${await note(page)}"`);
    await tapStrand(page, 6);
    s = await state(page);
    is(s.box.join() === '6' && s.lid === 'gap' && (await page.evaluate(() => document.querySelectorAll('.sl-cup.is-full').length)) === 6, `${tag} a tap sends the 6 into six cups`);
    for (let i = 0; i < 3; i++) await clickSel(page, '.sl-lid', 80);
    is((await note(page)) === interp(STR.hintCountOn[loc], { n: 10 }) && (await page.evaluate(() => [...document.querySelectorAll('.sl-cup.is-counton .sl-num')].map(x => x.textContent).join())) === '7,8,9,10', `${tag} three lid tries → count on 7, 8, 9, 10`);
    is((await state(page)).misses === 0, `${tag} lid tries are not misses`);
    await tapStrand(page, 8);
    s = await state(page);
    is(s.lid === 'bonk' && (await page.evaluate(() => document.querySelectorAll('.sl-over i').length)) === 4, `${tag} 6 + 8: four treats hang over the rim`);
    await clickSel(page, '.sl-lever');
    is((await note(page)) === STR.hintBonk[loc] && (await state(page)).misses === 0, `${tag} feeding a bonk → "${await note(page)}", no miss`);
    /* tap a cup of the 8 → it slithers out */
    await page.evaluate(() => { const C = window.SnakeLunchCore, st = window.SnakeLunchActivity.st; window.__ci = C.cups(st).inside.findIndex(c => C.byId(st, c.strand).k === 8); });
    await clickSel(page, '.sl-cup:nth-child(' + (await page.evaluate(() => window.__ci + 1)) + ')');
    is((await state(page)).box.join() === '6', `${tag} a tap on the 8 takes the whole strand out`);
    await dragStrand(page, 4);
    s = await state(page);
    is(s.box.join() === '6,4' && s.lid === 'shut' && !(await page.evaluate(() => document.querySelector('.sl-lever').classList.contains('is-locked'))), `${tag} a drag drops the 4: the lid shuts, the padlock drops`);
    await clickSel(page, '.sl-lever', 120);
    s = await state(page);
    is(s.ways.join() === '6+4' && s.filled === 0 && !s.done, `${tag} Clunk eats 6 + 4, the box comes back empty`);
    is((await note(page)) === interp(STR.yum[loc], { n: 10, a: 6, b: 4 }) + ' ' + interp(STR.promptAgain[loc], { n: 10 }), `${tag} "${await note(page)}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.sl-strip.is-on b')].map(b => b.textContent).join('|'))) === '10 = 6 + 4', `${tag} the log prints 10 = 6 + 4`);
    await tapStrand(page, 4); await tapStrand(page, 6); await clickSel(page, '.sl-lever', 120);
    s = await state(page);
    is(s.misses === 1 && (await note(page)) === STR.hintRepeat[loc], `${tag} 4 + 6 is the same lunch → "${await note(page)}"`);
    await page.evaluate(() => { const C = window.SnakeLunchCore, st = window.SnakeLunchActivity.st; C.inBox(st).forEach(x => C.takeOut(st, x.id)); window.SnakeLunchActivity._paint(); });
    await tapStrand(page, 7); await tapStrand(page, 3); await clickSel(page, '.sl-lever', 200);
    await celebrated(page);
    s = await state(page);
    is(s.done && s.ways.join() === '6+4,7+3', `${tag} a new lunch 7 + 3 ends the round`);
    is((await bubble(page)) === interp(STR.celebrateTwo[loc], { n: 10 }), `${tag} "${await bubble(page)}"`);
    /* EXACTLY 3 */
    await force(page, 'exact');
    await tapStrand(page, 6); await tapStrand(page, 4); await clickSel(page, '.sl-lever', 100);
    s = await state(page);
    is(s.lid === 'shut' && s.misses === 1 && (await note(page)) === interp(STR.hintExactly[loc], { k: 3 }), `${tag} exactly 3: 6 + 4 refused → "${await note(page)}"`);
    await page.evaluate(() => { const C = window.SnakeLunchCore, st = window.SnakeLunchActivity.st; C.inBox(st).forEach(x => C.takeOut(st, x.id)); window.SnakeLunchActivity._paint(); });
    await tapStrand(page, 4); await tapStrand(page, 4); await tapStrand(page, 2); await clickSel(page, '.sl-lever', 200);
    await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateFed[loc], { n: 10 }), `${tag} exactly 3: 4 + 4 + 2 → "${await bubble(page)}"`);
    /* TOO FULL 8 */
    await force(page, 'toofull');
    s = await state(page);
    is(s.box.length === 4 && s.lid === 'bonk', `${tag} too full: the box arrives bulging`);
    for (const k of [4, 2]) { await page.evaluate((k) => { const C = window.SnakeLunchCore, st = window.SnakeLunchActivity.st; window.__ci = C.cups(st).inside.findIndex(c => C.byId(st, c.strand).k === k); }, k); await clickSel(page, '.sl-cup:nth-child(' + (await page.evaluate(() => window.__ci + 1)) + ')'); }
    s = await state(page);
    is(s.lid === 'shut' && s.box.slice().sort().join() === '3,5', `${tag} too full: 4 and 2 out, the lid shuts on 5 + 3`);
    await clickSel(page, '.sl-lever', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateJust[loc], { n: 8 }), `${tag} too full: "${await bubble(page)}"`);
    /* HALF PACKED 10 (6 locked) */
    await force(page, 'half', 10);
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === interp(STR.promptHalf[loc], { g: 6 }), `${tag} half: "${interp(STR.promptHalf[loc], { g: 6 })}"`);
    await page.evaluate(() => { const C = window.SnakeLunchCore, st = window.SnakeLunchActivity.st; window.__ci = 0; });
    await clickSel(page, '.sl-cup:nth-child(1)');
    is((await state(page)).box.join() === '6', `${tag} half: the locked strand stays`);
    await tapStrand(page, 4); await clickSel(page, '.sl-lever', 200); await celebrated(page);
    is((await state(page)).done, `${tag} half: 6 + 4 fed`);
    /* WHAT DID (6 + 3) */
    await force(page, 'whatdid');
    is((await page.evaluate(() => document.querySelector('.sl-cloud').textContent)) === '?', `${tag} what did: the cloud shows "?"`);
    await clickSel(page, '.sl-lever');
    is((await note(page)) === STR.hintCloud[loc], `${tag} what did: "${await note(page)}"`);
    await clickSel(page, '.sl-cloud'); await clickSel(page, '.sl-key[data-v="6"]');
    await clickSel(page, '.sl-lever', 100);
    is((await state(page)).misses === 1 && (await note(page)) === STR.hintCountCups[loc], `${tag} what did: 6 → "${await note(page)}"`);
    await clickSel(page, '.sl-cloud'); await clickSel(page, '.sl-key[data-v="9"]'); await clickSel(page, '.sl-lever', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateWhat[loc], { a: 6, b: 3, n: 9 }), `${tag} what did: "${await bubble(page)}"`);
    /* free play */
    await clickSel(page, '.sl-playbtn');
    s = await state(page);
    is(s.explore && s.n === 6 && (await note(page)) === STR.playNote[loc], `${tag} the snack bar opens`);
    await tapStrand(page, 5); await tapStrand(page, 1);
    is((await page.evaluate(() => [...document.querySelectorAll('.sl-strip.is-on b')].map(b => b.textContent).join('|'))) === '6 = 5 + 1', `${tag} the log writes 6 = 5 + 1 by itself`);
    await clickSel(page, '.sl-playbtn');
    is(!(await state(page)).explore, `${tag} back to the task`);
    is(errs.length === 0, `${tag} no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep (en, the default level) */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const [kind, n] of [['any', 10], ['toofull', null], ['whatdid', null], ['exact', null]]) {
      await force(page, kind, n);
      if (kind === 'whatdid') { await page.evaluate(() => window.SnakeLunchActivity._toggleKeys()); await wait(60); }
      if (kind === 'any') { await page.evaluate(() => { const t = window.SnakeLunchActivity, st = t.st; t._drop(st.strands.find(s => s.k === 8).id); t._drop(st.strands.find(s => s.k === 4).id); }); await wait(60); }
      const m = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - window.innerWidth;
        const app = document.querySelector('.lcs-app').getBoundingClientRect();
        const btns = [...document.querySelectorAll('.lcs-stage button')].filter(e => e.offsetParent && !e.hidden).map(e => { const r = e.getBoundingClientRect(); return { d: Math.min(r.width, r.height), c: e.className, out: !e.closest('.sl-wall') && (r.left < app.left - 1 || r.right > app.right + 1), bottom: r.bottom }; });
        const wallBox = document.querySelector('.sl-wall').getBoundingClientRect();
        const wallOk = document.querySelector('.sl-wall').scrollWidth <= document.querySelector('.sl-wall').clientWidth + 1 || getComputedStyle(document.querySelector('.sl-wall')).overflowX === 'auto';
        void wallBox; void wallOk;
        const imgs = [...document.querySelectorAll('.lcs-app img')].filter(e => e.offsetParent && !e.hidden).map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
        const lever = document.querySelector('.sl-lever').getBoundingClientRect();
        return { over, minBtn: Math.min(...btns.map(b => b.d)), small: btns.filter(b => b.d < 44).map(b => b.c).slice(0, 3).join(','), out: btns.filter(b => b.out).length, minImg: imgs.length ? Math.min(...imgs) : 0, lowest: Math.max(...btns.map(b => b.bottom)), lever: lever.bottom, vh: window.innerHeight };
      });
      const tg = `[en @${w} ${kind}]`;
      is(m.over <= 0 && m.out === 0, `${tg} no horizontal overflow (${m.over}, ${m.out})`);
      is(m.minBtn >= 44, `${tg} every control ≥ 44 px (${m.minBtn.toFixed(0)} ${m.small})`);
      is(m.minImg >= (w >= 700 ? 96 : w >= 360 ? 64 : 54) - 0.5, `${tg} pictures ${m.minImg.toFixed(1)} px`);
      is(m.lever <= m.vh + 8, `${tg} the lever on screen (${m.lever.toFixed(0)} ≤ ${m.vh})`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `sl-${kind}-${w}.png`) });
    }
    is(errs.length === 0, `[en @${w}] no page errors`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-snake-lunch: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
