#!/usr/bin/env node
/* =====================================================================
   live-verify-blink-camera.js — drives The Blink Camera ON PRODUCTION in
   en, de, sv and fi (desktop 1366 + phone 390): the real activity page,
   real pointer. Snap and find: Check before snapping asks (no miss); the
   shutter hides the cards while it is open; a wrong card → miss; the
   right one → right, the success text filled. Find every one: every copy
   bracketed, the count → right. In the story: every copy → right.
   The wrapper version is the one in page.tsx; the iframe grows with the
   card; every locale's page returns 200.
   Usage: node scripts/live-verify-blink-camera.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '060-blink-camera', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8')).find(r => r.id === 'choice-board.read-sight-word.rf-k-3-c');
const C = require(path.join(MT, 'blink-camera-core.js'));
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(400);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="blink-camera-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds blink-camera-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.BlinkCameraActivity && window.BlinkCameraActivity.st && document.querySelector('.bcm-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(200); };
    const idle = () => frame.waitForFunction(() => { const a = window.BlinkCameraActivity; return !a._busy && !a.st.open; }, { timeout: 15000 }).catch(() => {}).then(() => wait(250));
    const st = () => frame.evaluate(() => { const s = window.BlinkCameraActivity.st; return JSON.parse(JSON.stringify({ cards: s.cards, tiles: s.tiles, misses: s.misses, done: s.done, phase: s.phase, brackets: s.brackets, up: s.up })); });
    const force = (g, id) => frame.evaluate((g, id) => { const a = window.BlinkCameraActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.game = g; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; a._deals = null; window.LCS_reloadFirstTask(); }, g, id);

    /* Snap and find */
    const r = C.rounds(loc, 'snap')[0];
    await force('snap', r.id); await wait(800);
    await tap('[data-k="check"]'); let s = await st();
    is(s.misses === 0 && !s.up, `[${loc} @${w}] Check before snapping asks (no miss)`);
    await frame.evaluate(() => { window.BlinkCameraActivity.HOLD = true; });
    await tap('[data-k="shutter"]');
    const open = await frame.evaluate(() => ({ back: document.querySelectorAll('.bcm-card.is-back').length, lens: document.querySelector('.bcm-lword').textContent }));
    is(open.back === 4 && open.lens === r.target, `[${loc} @${w}] the shutter open: cards face down, «${open.lens}» in the lens`);
    await frame.evaluate(() => { const a = window.BlinkCameraActivity; a.HOLD = false; a._shut(); }); await wait(300);
    s = await st();
    const wrong = s.cards.findIndex(x => x !== r.target), right = s.cards.indexOf(r.target);
    await tap(`[data-k="card${wrong}"]`); await tap('[data-k="check"]'); await idle(); s = await st();
    is(s.misses === 1 && s.up, `[${loc} @${w}] «${s.cards[wrong]}» → miss 1, the camera looks again`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-snap.png`) });
    await tap(`[data-k="card${right}"]`);
    await frame.evaluate(() => { window.BlinkCameraActivity.OK_MS = 0; });
    await tap('[data-k="check"]'); await wait(600); s = await st();
    is(s.done, `[${loc} @${w}] «${r.target}» → right`);
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(r.target), `[${loc} @${w}] the success text is filled («${bubble}»)`);

    /* Find every one */
    const h = C.rounds(loc, 'hunt')[1];
    await force('hunt', h.id); await wait(800);
    await tap('[data-k="shutter"]'); await idle(); s = await st();
    for (const i of s.tiles.map((x, j) => x === h.target ? j : -1).filter(j => j >= 0)) await tap(`[data-k="tile${i}"]`);
    await tap('[data-k="check"]'); await idle(); s = await st();
    is(s.phase === 'count' && s.misses === 0, `[${loc} @${w}] every «${h.target}» bracketed → how many?`);
    await tap(`[data-k="n${h.copies}"]`); await tap('[data-k="check"]'); await wait(400); s = await st();
    is(s.done, `[${loc} @${w}] ${h.copies} → right`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-hunt.png`) });

    /* In the story */
    const t = C.rounds(loc, 'story')[0];
    await force('story', t.id); await wait(800);
    await tap('[data-k="shutter"]'); await idle();
    const cp = t.tokens.map((k, i) => (k.word && !k.elided && k.t.toLocaleLowerCase() === t.target.toLocaleLowerCase()) ? i : -1).filter(i => i >= 0);
    for (const i of cp) await tap(`[data-k="tok${i}"]`);
    await tap('[data-k="check"]'); await wait(400); s = await st();
    is(s.done && s.misses === 0, `[${loc} @${w}] every «${t.target}» in the story → right`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-story.png`) });
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-blink-camera: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
