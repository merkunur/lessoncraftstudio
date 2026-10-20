#!/usr/bin/env node
/* =====================================================================
   live-verify-stepping-stones.js — drives Stenarna i bäcken ON PRODUCTION
   (sv only): the real activity page, real pointer. Räkna stavelser:
   helikopter — three stones (water + pile taps) → the last carries kop·ter
   and sinks (miss); one more → right. Bygg ordet: paraply — "ra" first →
   it tips back (miss); pa·ra·ply → right, the word over the water. Gömda
   ord: solros — "ros" lifted → the far bank shows the sun (miss); "sol"
   lifted → right. The wrapper version is the one in page.tsx; the iframe
   grows with the card.
   Usage: node scripts/live-verify-stepping-stones.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '048-stepping-stones', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'stepping-stones-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/sv/activities/${ROW.slug.sv}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[sv @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="stepping-stones-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[sv @${w}] the page embeds stepping-stones-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[sv @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.SteppingStonesActivity && window.SteppingStonesActivity.st && document.querySelector('.sst-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.SteppingStonesActivity; a.OK_MS = 60000; a.FAST = true; Object.assign(a.api.settings, { decoy: 'off', show: 'hop' }); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const hop = async () => { await tap('.sst-check'); await frame.waitForFunction(() => !window.SteppingStonesActivity._busy || window.SteppingStonesActivity.st.done, { timeout: 8000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.SteppingStonesActivity.st; return JSON.parse(JSON.stringify({ laid: s.laid, row: s.row, pile: s.pile, stones: s.stones, lifted: s.lifted, misses: s.misses, done: s.done, last: s.last })); });

    /* Räkna stavelser: helikopter */
    await force('count', 'count-helikopter');
    const water = async () => { await toView('.sst-scene'); const o = await frameOff(); const p = await frame.evaluate(() => { const A = window.SteppingStonesActivity, L = A._L, r = document.querySelector('.sst-scene').getBoundingClientRect(), xs = window.SteppingStonesCore.spread(A.st.laid + 1, L.x0, L.x1); return { x: r.left + xs[xs.length - 1], y: r.top + L.waterY + L.stoneH * 0.5 + 8 }; }); await page.mouse.click(o.x + p.x, o.y + p.y); await wait(250); };
    await water(); await tap('.sst-pstone'); await water(); let s = await st();
    is(s.laid === 3, `[sv @${w}] three stones laid (water and pile taps)`);
    await hop(); s = await st();
    is(s.misses === 1 && s.last.result === 'short' && (await frame.evaluate(() => (document.querySelector('.sst-stone.is-heavy .sst-chalk') || {}).textContent)) === 'kop·ter', `[sv @${w}] one short — the last stone carries kop·ter and sinks (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-sv-${w}-miss.png`) });
    await tap('.sst-pstone'); await hop(); s = await st();
    is(s.done, `[sv @${w}] four stones — right`);

    /* Bygg ordet: paraply */
    await force('build', 'build-paraply'); s = await st();
    const id = (n) => s.stones.find(x => x.s === n).id;
    await tap(`.sst-pstone[data-id="${id(1)}"]`); await hop(); s = await st();
    is(s.misses === 1 && !s.row.length && s.last.result === 'order', `[sv @${w}] "ra" first — it tips back (miss)`);
    for (const n of [0, 1, 2]) await tap(`.sst-pstone[data-id="${id(n)}"]`);
    await hop(); s = await st();
    await frame.waitForFunction(() => !!document.querySelector('.sst-word'), { timeout: 5000 }).catch(() => {});
    is(s.done && (await frame.evaluate(() => (document.querySelector('.sst-word') || {}).textContent)) === 'paraply', `[sv @${w}] pa + ra + ply — right, the word over the water`);

    /* Gömda ord: solros */
    await force('hidden', 'hidden-solros');
    await frame.evaluate(() => { window.SteppingStonesActivity.FAST = false; });
    await tap('.sst-stone[data-id="s1"]'); await tap('.sst-check'); await wait(1200);
    is(await frame.evaluate(() => { const f = document.querySelector('.sst-far'); return f.classList.contains('is-made') && /beach\/sun@2x/.test((f.querySelector('img') || {}).src || ''); }), `[sv @${w}] "ros" lifted — the far bank shows the sun (miss)`);
    await wait(1800); s = await st();
    is(s.misses === 1 && !s.lifted.length, `[sv @${w}] the stones splash back`);
    await frame.evaluate(() => { window.SteppingStonesActivity.FAST = true; });
    await tap('.sst-stone[data-id="s0"]'); await hop(); s = await st();
    is(s.done, `[sv @${w}] solros utan sol — right`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[sv @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-sv-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-stepping-stones: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
