#!/usr/bin/env node
/* =====================================================================
   local-test-measure-stations.js — the interaction gate for ACTIVITY #32,
   "Describe Measurable Attributes" (K.MD.A.1), the Measuring Stations.
   Real pointer: a DRAG of the picture onto the track (the giraffe tips over
   and the track measures how long — the wrong thing; its sign flag pops up
   beside the question's), the tap-tap path to the spring (miss 2: the post
   glows), a direct tap on the post (the cap, the bar = the standing height,
   the shell celebrates); two ways with the kite (light, then tall; the
   album card); the size window (one picture at a time; a whole row: an
   empty Check, a small one ringed, the window, all the big ones); Try
   anything; the width sweep. Expectations from the design (§5–7).
   Usage: node scripts/local-test-measure-stations.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.describe-attribute.k-md-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const STR = require(path.join(MINI, 'measure-stations-activity.js')).strings;
const C = require(path.join(MINI, 'measure-stations-core.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
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
    await page.goto(`${base}/measure-stations-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.MeasureStationsActivity && window.MeasureStationsActivity.st && document.querySelector('.ms-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.MeasureStationsActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.MeasureStationsActivity._cur(); return { mode: s.mode, noun: s.noun, step: s.step, placed: s.placed, misses: s.misses, help: s.help, done: s.done, explore: s.explore, rings: s.rings.slice(), row: s.row ? s.row.slice() : null }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.ms-note'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const center = async (page, sel, nth) => { const c = await page.evaluate((s, k) => { const el = [...document.querySelectorAll(s)].filter(e => e.offsetParent !== null && !e.hidden && !e.disabled)[k || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, nth || 0); if (!c) throw new Error('no visible enabled element ' + sel); return c; };
  async function clickSel(page, sel, ms, nth) { const c = await center(page, sel, nth); await page.mouse.click(c.x, c.y); await wait(ms || 60); }
  async function drag(page, from, to) {
    const a = await center(page, from); await page.evaluate(() => window.scrollTo(0, 0));
    const a2 = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.6 }; }, to);
    await page.mouse.move(a2.x, a2.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) { await page.mouse.move(a2.x + (b.x - a2.x) * i / 10, a2.y + (b.y - a2.y) * i / 10); await wait(16); }
    await page.mouse.up(); await wait(80); void a;
  }
  async function force(page, m, l, id) {
    await page.evaluate((m, l, id) => { const t = window.MeasureStationsActivity; t._playing = false; t.api.settings.measure = m; t.api.settings.level = l; t._pool = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); }, m, l, id);
    await wait(150);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).catch(() => {});
  const stageWords = (page) => page.evaluate(() => { const st = document.querySelector('.lcs-stage'); const c = st.cloneNode(true); c.querySelectorAll('.ms-note, .ms-actions, .ms-step, .ms-album, svg').forEach(e => e.remove()); return c.textContent.trim(); });

  for (const loc of LOCALES) {
    const tag = `[${loc}]`, w = loc === 'en' ? 1024 : 412;
    const { page, errs } = await open(loc, w);
    is((await page.evaluate(() => getComputedStyle(document.querySelector('.lcs-activity-check')).display)) === 'none', `${tag} the shell Check is hidden`);
    /* ---- one way: the giraffe, how tall ---- */
    await force(page, 'stations', 'one', 'one.giraffe');
    is((await prompt(page)) === STR.promptTall[loc] && (await page.evaluate(() => document.querySelector('.ms-qcard').getAttribute('data-q'))) === 'tall', `${tag} "${await prompt(page)}", the ↕ card`);
    is((await page.evaluate(() => { const s = document.querySelector('.ms-qcard svg').getBoundingClientRect(); return s.width > 30 && s.height > 30; })), `${tag} the question card shows its sign`);
    is((await stageWords(page)) === '', `${tag} no words on the apparatus`);
    is(await page.evaluate(() => { const i = document.querySelector('.ms-plinth .ms-img'); return i && i.complete && i.naturalWidth > 0; }), `${tag} the giraffe picture loads`);
    await page.evaluate(() => { window.MeasureStationsActivity.BACK_MS = 60000; window.MeasureStationsActivity.FAST = false; });
    await drag(page, '.ms-plinth', '.ms-bay.ms-track');
    let s = await state(page);
    is(s.placed === 'track' && s.misses === 1 && (await note(page)) === STR.hintTrackTall[loc], `${tag} dragged onto the track: "${await note(page)}"`);
    const tip = await page.evaluate(() => { const i = document.querySelector('.ms-track .ms-img'); return i ? { cls: i.className, w: parseFloat(i.style.width) } : null; });
    is(tip && /ms-tip/.test(tip.cls), `${tag} the giraffe lies down on the track`);
    const lenBar = await page.evaluate(() => parseFloat(document.querySelector('.ms-track .ms-bar-long').style.width));
    const k = await page.evaluate(() => { const t = window.MeasureStationsActivity; return window.MeasureStationsCore.scaleFor('giraffe', t._L); });
    is(Math.abs(lenBar - C.shown('giraffe', 'track', k).bar) < 0.6, `${tag} the track bar is the giraffe's length lying down (${lenBar.toFixed(1)})`);
    is(await page.evaluate(() => document.querySelector('.ms-bay.ms-track').classList.contains('is-flag') && document.querySelector('.ms-qcard').classList.contains('is-pulse')), `${tag} the track's ↔ flag beside the question's ↕`);
    await page.evaluate(() => { const t = window.MeasureStationsActivity; t._clearTimers(); t._busy = false; t._fx.back = true; t._paint(); t.FAST = true; });
    await clickSel(page, '.ms-plinth');
    is(await page.evaluate(() => document.querySelector('.ms-plinth').classList.contains('is-sel')), `${tag} a tap picks the picture up`);
    await clickSel(page, '.ms-bay.ms-spring');
    s = await state(page);
    is(s.placed === 'spring' && s.misses === 2 && (await note(page)) === STR.hintTrySign[loc] && (await page.evaluate(() => document.querySelector('.ms-bay.ms-post').classList.contains('is-glow'))), `${tag} the spring is wrong too: the post glows — "${await note(page)}"`);
    is(await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.ms-track .ms-bar-long')).opacity) < 0.5), `${tag} the track keeps its bar, faint`);
    await clickSel(page, '.ms-bay.ms-post', 200); await celebrated(page);
    s = await state(page);
    is(s.done && (await bubble(page)) === STR.okTall[loc], `${tag} "${await bubble(page)}"`);
    const hBar = await page.evaluate(() => parseFloat(document.querySelector('.ms-post .ms-bar-tall').style.height));
    is(Math.abs(hBar - C.shown('giraffe', 'post', k).bar) < 0.6, `${tag} the post bar is the giraffe's standing height (${hBar.toFixed(1)})`);
    /* ---- the pencil: how long ---- */
    await force(page, 'stations', 'one', 'one.pencil');
    await clickSel(page, '.ms-bay.ms-post');
    is((await note(page)) === STR.hintPostLong[loc], `${tag} the pencil at the post: "${await note(page)}"`);
    await page.evaluate(() => { const t = window.MeasureStationsActivity; t._clearTimers(); t._busy = false; t._fx.back = true; t._paint(); });
    await clickSel(page, '.ms-bay.ms-track', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === STR.okLong[loc], `${tag} "${await bubble(page)}"`);
    /* ---- two ways: the sunflower (light, then tall) ---- */
    await force(page, 'stations', 'two', 'two.sunflower');
    is((await prompt(page)) === STR.promptTwoWays[loc] && (await page.evaluate(() => document.querySelector('.ms-step').textContent)) === STR.promptHeavy[loc], `${tag} two ways: "${await prompt(page)}" / "${STR.promptHeavy[loc]}"`);
    await clickSel(page, '.ms-bay.ms-spring', 80);
    s = await state(page);
    is(s.step === 1 && !s.done && (await note(page)) === STR.okHeavy[loc], `${tag} the spring answers the first question; its sentence stays ("${await note(page)}")`);
    is(await page.evaluate(() => document.querySelector('.ms-step').textContent) === STR.promptTall[loc], `${tag} the second question: ${STR.promptTall[loc]}`);
    await clickSel(page, '.ms-bay.ms-post', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.okTwoWays[loc], { badge1: STR.badgeLight[loc], badge2: STR.badgeTall[loc] }), `${tag} "${await bubble(page)}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.ms-acard:not(.is-empty) b')].map(b => b.textContent).join('|'))) === STR.badgeLight[loc] + '|' + STR.badgeTall[loc], `${tag} the album card: ${STR.badgeLight[loc]} · ${STR.badgeTall[loc]}`);
    /* ---- size: two pictures ---- */
    await force(page, 'size', 'one', 'pair.apple');
    is((await prompt(page)) === STR.promptBigOne[loc], `${tag} "${await prompt(page)}"`);
    await clickSel(page, '.ms-card', 60, 1); await clickSel(page, '.ms-card', 60, 0);
    s = await state(page);
    is(s.rings.join() === '0', `${tag} one picture at a time`);
    await clickSel(page, '.ms-check', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === STR.okBigOne[loc], `${tag} "${await bubble(page)}"`);
    /* ---- size: a whole row ---- */
    await force(page, 'size', 'two', 'row.pig');
    s = await state(page);
    const bigs = s.row.map((b, i) => b ? i : -1).filter(i => i >= 0), small = s.row.indexOf(false);
    await clickSel(page, '.ms-check');
    is((await state(page)).misses === 0 && (await note(page)) === STR.hintTapFirst[loc], `${tag} Check with nothing: no miss, "${await note(page)}"`);
    await clickSel(page, '.ms-card', 60, small);
    await clickSel(page, '.ms-check', 120);
    s = await state(page);
    is(s.misses === 1 && (await note(page)) === STR.hintWindow[loc] && (await page.evaluate(() => document.querySelector('.ms-window').classList.contains('is-on'))), `${tag} a small one ringed: the window — "${await note(page)}"`);
    is(await page.evaluate((i) => document.querySelectorAll('.ms-card')[i].classList.contains('is-loose'), small), `${tag} the small one rattles loose in the window`);
    const geo = await page.evaluate(() => { const w = document.querySelector('.ms-window').getBoundingClientRect(); const t = window.MeasureStationsActivity; return { w: w.width, big: t._bigPx }; });
    is(Math.abs(geo.w - geo.big * 0.8) < 1, `${tag} the window is 0.80 of the big picture (${geo.w.toFixed(1)} / ${geo.big})`);
    await clickSel(page, '.ms-card', 60, small);
    for (const i of bigs) await clickSel(page, '.ms-card', 40, i);
    await clickSel(page, '.ms-check', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.okBigAll[loc], { n: bigs.length }), `${tag} "${await bubble(page)}"`);
    /* ---- try anything ---- */
    await force(page, 'stations', 'one', 'one.rock');
    await clickSel(page, '.ms-playbtn', 120);
    is((await state(page)).explore && (await note(page)) === STR.playNote[loc] && (await page.evaluate(() => document.querySelectorAll('.ms-chip').length)) === 17, `${tag} Try anything: 17 pictures — "${await note(page)}"`);
    await clickSel(page, '.ms-chip[data-n="kite"]');
    await clickSel(page, '.ms-bay.ms-spring');
    s = await state(page);
    is(s.noun === 'kite' && s.placed === 'spring' && s.misses === 0 && !s.done, `${tag} Try anything: the kite on the spring, nothing graded`);
    await clickSel(page, '.ms-playbtn', 120);
    is(!(await state(page)).explore, `${tag} back to the questions`);
    is(errs.length === 0, `${tag} no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    for (const loc of w === 412 ? ['en', 'fi'] : ['en']) {
      const { page, errs } = await open(loc, w);
      for (const [m, l, id, act] of [['stations', 'one', 'one.lighthouse', 'rest'], ['stations', 'one', 'one.lighthouse', 'wrong'], ['stations', 'one', 'one.train', 'done'], ['stations', 'two', 'two.giraffe', 'half'], ['size', 'one', 'pair.kite', 'rest'], ['size', 'two', 'row.apple', 'miss'], ['size', 'two', 'row.cupcake', 'rest'], ['stations', 'one', 'one.rock', 'play']]) {
        await force(page, m, l, id);
        if (act === 'wrong') { await page.evaluate(() => { const t = window.MeasureStationsActivity; t.FAST = false; t.BACK_MS = 60000; }); await clickSel(page, '.ms-bay.ms-track', 700); }
        if (act === 'done') await clickSel(page, '.ms-bay.ms-track', 100);
        if (act === 'half') { await clickSel(page, '.ms-bay.ms-post', 100); await clickSel(page, '.ms-bay.ms-spring', 100); }
        if (act === 'miss') { await clickSel(page, '.ms-card', 40, 1); await clickSel(page, '.ms-check', 120); }
        if (act === 'play') await clickSel(page, '.ms-playbtn', 120);
        await page.evaluate(() => window.scrollTo(0, 0)); await wait(80);
        const mm = await page.evaluate(() => {
          const over = document.documentElement.scrollWidth - window.innerWidth;
          const app = document.querySelector('.lcs-app').getBoundingClientRect();
          const vis = (e) => e.offsetParent && !e.hidden;
          const btns = [...document.querySelectorAll('.lcs-stage button')].filter(vis).map(e => { const r = e.getBoundingClientRect(); return { d: Math.min(r.width, r.height), c: e.className, out: r.left < app.left - 1 || r.right > app.right + 1, bottom: r.bottom }; });
          const answer = btns.filter(b => /ms-bay|ms-card|ms-check|ms-plinth/.test(b.c));
          const font = Math.min(...[...document.querySelectorAll('.ms-note, .ms-step, .ms-acard b, .ms-tool, .ms-check')].filter(vis).filter(e => e.textContent.trim()).map(e => parseFloat(getComputedStyle(e).fontSize)));
          const imgs = [...document.querySelectorAll('.ms-bay .ms-img')].map(i => { const r = i.getBoundingClientRect(), b = i.closest('.ms-bay').getBoundingClientRect(); return r.width > 0 ? 0 : 0; }).length;
          return { over, minBtn: Math.min(...btns.map(b => b.d)), small: btns.filter(b => b.d < 44).map(b => b.c).slice(0, 3).join(','), out: btns.filter(b => b.out).length, lowest: Math.max(...answer.map(b => b.bottom)), vh: window.innerHeight, font, imgs };
        });
        const tg = `[${loc} @${w} ${id} ${act}]`;
        is(mm.over <= 0 && mm.out === 0, `${tg} nothing outside the card (${mm.over}, ${mm.out})`);
        is(mm.minBtn >= 44, `${tg} every control ≥ 44 px (${mm.minBtn.toFixed(0)} ${mm.small})`);
        is(mm.lowest <= mm.vh + 1, `${tg} the stations / cards / Check on screen (${mm.lowest.toFixed(0)} ≤ ${mm.vh})`);
        is(mm.font >= 14, `${tg} text ≥ 14 px (${mm.font})`);
        if (SHOT) await page.screenshot({ path: path.join(SHOT, `ms-${loc}-${id}-${act}-${w}.png`) });
        await page.evaluate(() => { const t = window.MeasureStationsActivity; t._clearTimers(); t._busy = false; t.FAST = true; t.BACK_MS = 1500; if (t._playing) t._togglePlay(); });
      }
      is(errs.length === 0, `[${loc} @${w}] no page errors (${errs.slice(0, 2).join(' | ')})`);
      await page.close();
    }
  }
  await browser.close(); server.close();
  console.log(`local-test-measure-stations: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
