#!/usr/bin/env node
/* =====================================================================
   live-verify-clay-snake.js — drives de kleislang ON PRODUCTION (nl only):
   the real activity page, real pointer. Hakken: regenboog chopped once by
   a TAP → the stamp shows two klankgroepen on the last piece (one miss);
   one more TAP → Klaar! → one smooth snake. Plakken: panda's lumps DRAGGED
   onto the board in reverse → a cracked joint (miss); tapped back and
   tapped in order → done. Hakken met letters: bij with no cut → done.
   The wrapper version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-clay-snake.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '044-clay-snake', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'clay-snake-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/nl/activities/${ROW.slug.nl}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[nl @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="clay-snake-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[nl @${w}] the page embeds clay-snake-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[nl @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.ClaySnakeActivity && window.ClaySnakeActivity.st && document.querySelector('.cs-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.ClaySnakeActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.level = lv; a.api.settings.extra = 'uit'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { if (!(await toView(sel))) return null; const o = await frameOff(); const b = await frame.evaluate((q) => { const r = document.querySelector(q).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { const p = await ctrOf(sel); if (!p) return false; await page.mouse.click(p.x, p.y); await wait(220); return true; };
    const tapSnake = async (f) => { await toView('.cs-snakearea'); const o = await frameOff(); const b = await frame.evaluate(() => { const r = document.querySelector('.cs-snakearea').getBoundingClientRect(); return { l: r.left, w: r.width, y: r.top + r.height - 30 }; }); await page.mouse.click(o.x + b.l + b.w * f, o.y + b.y); await wait(250); };
    const st = () => frame.evaluate(() => JSON.parse(JSON.stringify(window.ClaySnakeActivity.st)));

    /* Hakken: regenboog */
    await force('hak', 'hak-rainbow');
    await tapSnake(0.5); await tap('.cs-check'); let s = await st();
    is(s.misses === 1 && s.last.result === 'short' && s.last.pieces[1].length === 2, `[nl @${w}] regenboog in two pieces — two klankgroepen on the last piece (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-nl-${w}-short.png`) });
    await tapSnake(0.8); await tap('.cs-check'); s = await st();
    is(s.done, `[nl @${w}] three pieces — one smooth snake`);

    /* Plakken: panda */
    await force('plak', 'plak-panda'); s = await st();
    const ids = s.lumps.filter(l => l.s >= 0).sort((a, b) => a.s - b.s).map(l => l.id);
    for (const id of ids.slice().reverse()) await tap(`.cs-tub .cs-lump[data-id="${id}"]`);
    await tap('.cs-check'); s = await st();
    is(s.misses === 1 && s.last.result === 'joints', `[nl @${w}] da + pan — the joint cracks (miss)`);
    for (const id of s.row.slice()) await tap(`.cs-prow .cs-lump[data-id="${id}"]`);
    for (const id of ids) await tap(`.cs-tub .cs-lump[data-id="${id}"]`);
    await tap('.cs-check'); s = await st();
    is(s.done, `[nl @${w}] pan + da = panda — done`);

    /* Hakken met letters: bij */
    await force('letters', 'letters-bee');
    await tap('.cs-check'); s = await st();
    is(s.done && s.misses === 0, `[nl @${w}] bij — no cut is right`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[nl @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-nl-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-clay-snake: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
