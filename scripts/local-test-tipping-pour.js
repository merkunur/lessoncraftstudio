#!/usr/bin/env node
/* =====================================================================
   local-test-tipping-pour.js — the interaction gate for ACTIVITY #33,
   "Which Holds More?" (K.MD.A.2), the Tipping Pour.
   Real pointer: the tap refuses before the berry (it wiggles); the berry
   DRAGGED onto a vessel; the tap fills the left one; the left one DRAGGED
   onto the other and TIPPED by dragging down — the juice leaves a gap (the
   dashed band) and the call wins; a wrong call over a spill (the puddle,
   the berry rolls back, the evidence hint), miss 2 by tap-tap on "=" (the
   right vessel glows), then the right drop; the same-round brim through the
   TIP button; the fit round's own coasters; a "less" question; free play
   pouring back the other way (juice conserved); the keyboard path; the
   width sweep at rest, mid-pour and won. Expectations from the design §5–7.
   Usage: node scripts/local-test-tipping-pour.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'bramble.holds-more.k-md-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'tipping-pour-core.js'));
global.TippingPourCore = C;
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, TippingPourCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'tipping-pour-activity.js'), 'utf8') + '\n;this.__A = TippingPourActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice(12)) : p.startsWith('/image-library-webp/') ? path.join(IMG, p.slice(20)) : path.join(MINI, p.replace(/^\//, ''));
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
    await page.goto(`${base}/tipping-pour-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TippingPourActivity && window.TippingPourActivity.st && document.querySelector('.tp-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.TippingPourActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.TippingPourActivity.st; return { id: s.round, L: s.L, R: s.R, berry: s.berry, vol: Object.assign({}, s.vol), spilled: s.spilled, outcome: s.outcome, misses: s.misses, help: s.help, done: s.done, tilt: s.tilt, polarity: s.polarity, docked: window.TippingPourActivity._pose.docked }; });
  const note = (page) => page.evaluate(() => document.querySelector('.tp-note').textContent);
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const center = (page, sel, nth) => page.evaluate((s, k) => { const el = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null)[k || 0]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }; }, sel, nth || 0);
  async function click(page, sel, ms) { const c = await center(page, sel); if (!c) throw new Error('no ' + sel); await page.mouse.click(c.x, c.y); await wait(ms || 80); }
  async function drag(page, from, to, dy) {
    const a = await center(page, from), b = to ? await center(page, to) : { x: a.x, y: a.y + dy };
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 12; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 12, a.y + (b.y - a.y) * i / 12); await wait(20); }
    await page.mouse.up(); await wait(120);
  }
  /* dock the left one by a real drag over the other's mouth, then tip it by dragging down */
  async function pourByDrag(page) {
    const st = await state(page);
    const target = await page.evaluate(() => { const t = window.TippingPourActivity, C = TippingPourCore, X = t._L.X, st = t.st; const d = C.dockPose(st.L, st.R, X.L, X.R), p = t._px(d.x, d.y + C.outer(C.V[st.L]).h / 2), sr = t._scene.getBoundingClientRect(); return { x: sr.left + p.left, y: sr.top + p.top }; });
    const a = await center(page, '.tp-vessel-L');
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 14; i++) { await page.mouse.move(a.x + (target.x - a.x) * i / 14, a.y + (target.y - a.y) * i / 14); await wait(20); }
    await page.mouse.up(); await wait(150);
    is((await state(page)).docked === 'L', `${st.id}: dragged over the other one, it docks`);
    const v = await center(page, '.tp-vessel-L');
    await page.mouse.move(v.x, v.y); await page.mouse.down();
    for (let i = 1; i <= 16; i++) { await page.mouse.move(v.x, v.y + i * 12); await wait(30); }
    await page.mouse.up();
    await page.waitForFunction(() => window.TippingPourActivity.st.outcome, { timeout: 8000 }).catch(() => {});
    await wait(250);
  }
  async function force(page, cups, question, id, swapPass) {
    await page.evaluate((cups, q, id, pass) => {
      const t = window.TippingPourActivity; t.api.settings.cups = cups; t.api.settings.question = q; t._pool = null; t._poolKey = null;
      const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id);
      t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = pass || 0; window.LCS_reloadFirstTask();
    }, cups, question, id, swapPass || 0);
    await wait(200);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const stageWords = (page) => page.evaluate(() => { const st = document.querySelector('.lcs-stage'); const c = st.cloneNode(true); c.querySelectorAll('.tp-note, svg').forEach(e => e.remove()); return c.textContent.trim(); });
  const T = (loc, k) => STR[k][loc];

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);

    /* 1. E1, more: the tap first (refused), the berry dragged, the fill, the pour: a GAP */
    await force(page, 'easy', 'more', 'E1');
    is((await prompt(page)) === T(loc, 'promptMore'), `${loc}: the more prompt`);
    is((await stageWords(page)) === '', `${loc}: no words on the apparatus`);
    await click(page, '.tp-knob');
    let s = await state(page);
    is(s.vol.L === 0 && !s.berry, `${loc}: the tap refuses before the berry`);
    is((await note(page)) === T(loc, 'hintPutMore'), `${loc}: …and says why (${await note(page)})`);
    is(await page.evaluate(() => document.querySelector('.tp-berry').classList.contains('is-wiggle')), `${loc}: the berry wiggles`);
    await click(page, '.tp-vessel-L');
    is((await state(page)).docked === null, `${loc}: the cup will not move before the call`);
    await drag(page, '.tp-berry', '.tp-vessel-R');
    s = await state(page);
    is(s.berry === 'B' && !s.done, `${loc}: the berry dragged onto the jug is a guess, nothing more (${s.berry})`);
    is((await note(page)) === T(loc, 'stepFill'), `${loc}: next: fill it`);
    await click(page, '.tp-knob', 200);
    s = await state(page);
    is(Math.abs(s.vol.L - C.capacity(C.V[s.L])) < 1e-6, `${loc}: the tap fills the cup to the brim`);
    is((await note(page)) === T(loc, 'stepPour'), `${loc}: next: tip it`);
    await pourByDrag(page);
    s = await state(page);
    is(s.outcome === 'gap' && s.spilled < 1, `${loc}: the cup's juice leaves a gap in the jug (${s.outcome})`);
    is(await page.evaluate(() => !!document.querySelector('.tp-gap') && !document.querySelector('.tp-puddle')), `${loc}: the dashed band, no puddle`);
    is(Math.abs(s.vol.L + s.vol.R + s.spilled - C.capacity(C.V[s.L])) < 1e-6 * C.capacity(C.V[s.L]), `${loc}: every drop accounted for`);
    is(s.done && (await celebrated(page)), `${loc}: the right call wins and the shell celebrates`);
    is((await page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent)).includes(T(loc, 'okMoreGap')), `${loc}: the win names the gap`);
    await wait(260);
    is((await note(page)) === T(loc, 'playNote') && (await page.evaluate(() => { const b = document.querySelector('.tp-berry').getBoundingClientRect(), d = window.TippingPourActivity._berryHome(), sr = window.TippingPourActivity._scene.getBoundingClientRect(); return Math.abs(b.left + b.width / 2 - sr.left - d.left) < 2; })), `${loc}: then the note invites free pouring, the berry back in its dish`);
    is((await page.evaluate(() => document.querySelector('.tp-scene').getAttribute('aria-label'))) === T(loc, 'ariaGap'), `${loc}: the live label says what the juice did`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'e1-won.png') });

    /* free play: pour the jug back into the cup — the juice is conserved, the cup overflows */
    if (loc === 'en' || loc === 'fi') {
      const total0 = (await state(page)).vol.R;
      await click(page, '.tp-knob', 150);
      const r = await center(page, '.tp-vessel-R');
      await page.evaluate(() => window.TippingPourActivity._dock('R')); await wait(150);
      is((await state(page)).docked === 'R', `${loc}: after the call, the jug can be poured back`);
      const t = await center(page, '.tp-tip');
      for (let i = 0; i < 5; i++) { await page.mouse.click(t.x, t.y); await wait(60); }
      await wait(1500);
      s = await state(page);
      const capL = C.capacity(C.V[s.L]);
      is(Math.abs(s.vol.L + s.vol.R + s.spilled - (capL + total0)) < 1e-6 * capL, `${loc}: poured back and forth, never more, never less`);
      is(s.vol.L > capL - 1e-6, `${loc}: the cup brims over again`);
      if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'freeplay-back.png') });
      await page.keyboard.press('Escape'); await wait(150);
      is((await state(page)).docked === null && (await page.evaluate(() => window.TippingPourActivity._sky)) === C.skyFor(s.L, s.R, C.layout(await page.evaluate(() => window.TippingPourActivity._width())), false), `${loc}: Escape puts it back, the sky shrinks again`);
      void r;
    }

    /* 2. E2, more, a WRONG call over a spill: the puddle, the berry rolls back; miss 2 by tap-tap; the right drop */
    await force(page, 'easy', 'more', 'E2');
    await drag(page, '.tp-berry', '.tp-vessel-R');
    await click(page, '.tp-knob', 200);
    await pourByDrag(page);
    s = await state(page);
    is(s.outcome === 'spill' && s.spilled > 0, `${loc}: the bowl spills over the little cup`);
    is(s.misses === 1 && !s.berry && !s.done, `${loc}: a wrong call — the berry rolls back to the dish`);
    is(await page.evaluate(() => !!document.querySelector('.tp-puddle') && !!document.querySelector('.tp-ring')), `${loc}: the puddle is ringed`);
    is((await note(page)) === T(loc, 'hintSpill'), `${loc}: miss 1 points at the spill (${await note(page)})`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'e2-miss1.png') });
    await click(page, '.tp-berry'); await click(page, '.tp-coaster');
    s = await state(page);
    is(s.misses === 2 && s.help === 2, `${loc}: tap-tap onto "the same" — miss 2`);
    is((await note(page)) === T(loc, 'hintHere'), `${loc}: miss 2: the berry goes here`);
    is(await page.evaluate(() => document.querySelector('.tp-vessel-L').classList.contains('is-glow') && !!document.querySelector('.tp-glowline')), `${loc}: the bowl glows`);
    await drag(page, '.tp-berry', '.tp-vessel-L');
    s = await state(page);
    is(s.done && (await celebrated(page)), `${loc}: the right drop after the pour wins at once`);
    is((await bubble(page)).includes(T(loc, 'okMoreSpill')), `${loc}: the win names the spill`);

    /* 3. T10, the same: berry on "=", the pour by the TIP button: the brim sparkles */
    await force(page, 'tricky', 'more', 'T10');
    await click(page, '.tp-berry'); await click(page, '.tp-coaster');
    is((await state(page)).berry === 'SAME', `${loc}: tap-tap onto "the same"`);
    await click(page, '.tp-knob', 200);
    await click(page, '.tp-vessel-L', 150);
    is((await state(page)).docked === 'L', `${loc}: a tap on the glass docks it over the tub`);
    is(await page.evaluate(() => !document.querySelector('.tp-tip').hidden), `${loc}: the tip button appears`);
    const tb = await center(page, '.tp-tip');
    is(tb.w >= 56, `${loc}: the tip button is big (${tb.w})`);
    await page.mouse.move(tb.x, tb.y); await page.mouse.down(); await wait(2200); await page.mouse.up();
    await page.waitForFunction(() => window.TippingPourActivity.st.outcome, { timeout: 8000 }).catch(() => {});
    await wait(250);
    s = await state(page);
    is(s.outcome === 'brim' && s.done, `${loc}: the tall glass fills the low tub to the brim — the same (${s.outcome})`);
    is(await page.evaluate(() => document.querySelectorAll('.tp-spark').length === 3), `${loc}: the brim sparkles`);
    is((await bubble(page)).includes(T(loc, 'okSame')), `${loc}: the win says the same`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 't10-brim.png') });

    /* 4. T9, the fit round: its own coasters */
    await force(page, 'tricky', 'more', 'T9');
    is((await prompt(page)) === T(loc, 'promptFit'), `${loc}: the fit prompt`);
    is(await page.evaluate(() => [...document.querySelectorAll('.tp-coaster')].map(b => b.dataset.place).join() === 'FITS,SPILLS'), `${loc}: two coasters: fits, spills`);
    await drag(page, '.tp-berry', '.tp-vessel-R');
    is(!(await state(page)).berry, `${loc}: in the fit round the vessels are not berry places`);
    await click(page, '.tp-berry'); await click(page, '.tp-coaster');
    await click(page, '.tp-knob', 200);
    await pourByDrag(page);
    s = await state(page);
    is(s.outcome === 'gap' && s.done && (await bubble(page)).includes(T(loc, 'okFits')), `${loc}: it fits, with room to spare`);

    /* 5. a "less" question: the cup is the answer */
    await force(page, 'easy', 'less', 'E1');
    is((await prompt(page)) === T(loc, 'promptLess'), `${loc}: the less prompt`);
    await drag(page, '.tp-berry', '.tp-vessel-L');
    await click(page, '.tp-knob', 200);
    await pourByDrag(page);
    s = await state(page);
    is(s.done && (await bubble(page)).includes(T(loc, 'okLessGap')), `${loc}: the cup holds less — its juice did not fill the jug`);

    /* 6. the swapped side: the truth follows the cups, not the place */
    await force(page, 'easy', 'more', 'E1', 1);
    s = await state(page);
    is(s.L === 'jug34' && s.R === 'cup15', `${loc}: on an odd pass the sides swap`);

    /* 7. the keyboard path */
    if (loc === 'en' || loc === 'de') {
      await force(page, 'easy', 'more', 'E4');
      await page.focus('.tp-berry'); await page.keyboard.press('Enter'); await page.focus('.tp-vessel-R'); await page.keyboard.press('Enter'); await wait(80);
      is((await state(page)).berry === 'B', `${loc}: keyboard: Enter on the berry, Enter on the jug`);
      await page.focus('.tp-knob'); await page.keyboard.press('Enter'); await wait(200);
      await page.focus('.tp-vessel-L'); await page.keyboard.press('Enter'); await wait(120);
      is((await state(page)).docked === 'L', `${loc}: keyboard: Enter docks the mug`);
      for (let i = 0; i < 10; i++) { await page.keyboard.press('ArrowDown'); await wait(30); }
      await page.waitForFunction(() => window.TippingPourActivity.st.outcome, { timeout: 8000 }).catch(() => {});
      await wait(200);
      is((await state(page)).done, `${loc}: keyboard: ArrowDown tips it, the call wins`);
    }

    /* 8. mixed: more, then less */
    await page.evaluate(() => { const t = window.TippingPourActivity; t.api.settings.cups = 'easy'; t.api.settings.question = 'mixed'; t._pool = null; t._poolKey = null; t._order = null; window.LCS_reloadFirstTask(); });
    await wait(200);
    is((await prompt(page)) === T(loc, 'promptMore'), `${loc}: mixed starts with more`);
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();
  }

  /* the width sweep: at rest, mid-pour and won — nothing overflows, every control in reach and big enough */
  for (const w of WIDTHS) {
    const { page, errs } = await open('fi', w);
    for (const [cups, id] of [['tricky', 'T8'], ['tricky', 'T4'], ['easy', 'E5'], ['easy', 'E1'], ['tricky', 'T9']]) {
      await force(page, cups, 'more', id);
      const check = async (phase) => {
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), sc = document.querySelector('.tp-scene').getBoundingClientRect();
          const ctl = [...document.querySelectorAll('.tp-berry, .tp-coaster, .tp-knob, .tp-tip, .tp-vessel')].filter(e => !e.hidden && e.offsetParent !== null).map(e => { const r = e.getBoundingClientRect(); return { c: e.className, l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height }; });
          const ink = [...document.querySelectorAll('.tp-v')].map(g => g.getBoundingClientRect());
          return { docW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight, app: { l: app.left, r: app.right, b: app.bottom }, sc: { l: sc.left, r: sc.right, t: sc.top, b: sc.bottom }, ctl, ink: ink.map(r => ({ l: r.left, r: r.right, t: r.top, b: r.bottom })) };
        });
        is(m.docW <= m.vw + 1, `${w} ${id} ${phase}: no sideways scroll (${m.docW} > ${m.vw})`);
        m.ctl.forEach(c => {
          if (c.l < m.app.l - 1 || c.r > m.app.r + 1) is(false, `${w} ${id} ${phase}: ${c.c} inside the card`);
          if (Math.min(c.w, c.h) < 44) is(false, `${w} ${id} ${phase}: ${c.c} is ${Math.round(c.w)}×${Math.round(c.h)} — under 44`);
          if (c.b > m.vh + 1) is(false, `${w} ${id} ${phase}: ${c.c} below the fold (${Math.round(c.b)} > ${m.vh})`);
        });
        m.ink.forEach(r => { if (r.l < m.sc.l - 2 || r.r > m.sc.r + 2 || r.t < m.sc.t - 2 || r.b > m.sc.b + 2) is(false, `${w} ${id} ${phase}: a vessel drawn outside the stage (${Math.round(r.l)}..${Math.round(r.r)} / ${Math.round(r.t)}..${Math.round(r.b)} vs ${Math.round(m.sc.l)}..${Math.round(m.sc.r)} / ${Math.round(m.sc.t)}..${Math.round(m.sc.b)})`); });
        /* every control can be pressed: its centre hit-tests to itself (the 390 berry once covered the tip button) */
        const blocked = await page.evaluate(() => [...document.querySelectorAll('.tp-berry, .tp-coaster, .tp-knob, .tp-tip')].filter(e => !e.hidden && e.offsetParent !== null).map(e => { const r = e.getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; if (y < 0 || y > innerHeight) return null; const h = document.elementFromPoint(x, y); return h && (h === e || e.contains(h)) ? null : e.className.split(' ')[0] + ' under ' + (h ? String(h.className.baseVal != null ? h.className.baseVal : h.className).split(' ')[0] : 'none'); }).filter(Boolean));
        is(blocked.length === 0, `${w} ${id} ${phase}: every control can be pressed (${blocked.join(', ')})`);
      };
      await check('rest');
      if (id !== 'T9') {
        await page.evaluate(() => { const t = window.TippingPourActivity, C = TippingPourCore; C.place(t.st, 'B'); C.fill(t.st); t._dock('L'); t.st.tilt = 60; t._paint(); });
        await wait(80); await check('mid-pour');
        await page.evaluate(() => { const t = window.TippingPourActivity; t.st.tilt = TippingPourCore.MAX_TILT; t._paint(); });
        await wait(60); await check('full tilt');
        await page.evaluate(() => window.TippingPourActivity._undock());
        await page.evaluate(() => { const t = window.TippingPourActivity; t.st.done = true; t._dock('R'); t.st.tilt = TippingPourCore.MAX_TILT; t._paint(); });
        await wait(80); await check('poured back');
        if (SHOT && (w === 360 || w === 704 || w === 1024) && id === 'T8') await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}-back.png`) });
        await page.evaluate(() => window.TippingPourActivity._undock());
      }
      if (SHOT && (w === 360 || w === 704 || w === 1024)) { await force(page, cups, 'more', id); await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}.png`) }); }
    }
    is(errs.length === 0, `${w}: no errors (${errs.join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-tipping-pour: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
