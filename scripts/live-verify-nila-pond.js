#!/usr/bin/env node
/* =====================================================================
   live-verify-nila-pond.js — drives The Idea Umbrella (Nila's Idea Pond)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. The bear-warm text: a detail umbrella
   dragged onto the pond and checked → it rains, a miss with the hint; the
   big idea tapped and checked → step 2, the stranger dragged out into the
   rain → the shell retells the text. The wrapper version is the one in
   page.tsx; the iframe grows with the card; every locale's page returns 200.
   Usage: node scripts/live-verify-nila-pond.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '070-idea-umbrella', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'nila-pond-activities.json'), 'utf8')).find(r => r.id === 'nila-pond.main-idea-net.ri-k-2');
const C = require(path.join(MT, 'nila-pond-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, NilaPondCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'nila-pond-activity.js'), 'utf8') + ';this.__A = NilaPondActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
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
    const frameEl = await page.waitForSelector('iframe[src*="nila-pond-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds nila-pond-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.NilaPondActivity && window.NilaPondActivity.st && window.NilaPondCore && document.querySelector('.np-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + Math.min(rr.height / 2, 40) }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const settle = () => frame.waitForFunction(() => !window.NilaPondActivity._busy, { timeout: 15000 }).catch(() => {});
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); await settle(); await wait(150); };
    const drag = async (from, to) => { await toView(from); const a = await ctrOf(from), b = await ctrOf(to); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14); await page.mouse.up(); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.NilaPondActivity.st; return JSON.parse(JSON.stringify({ rail: s.rail, hung: s.hung, misses: s.misses, done: s.done, phase: s.phase, under: s.under })); });
    const note = () => frame.evaluate(() => document.querySelector('.np-note').textContent);
    await frame.evaluate(() => { const a = window.NilaPondActivity, pool = a._ensurePool(), o = pool.map((x, i) => i), k = pool.indexOf('bear-warm'); o.splice(k, 1); o.unshift(k); a._order = o; a._orderForPool = pool; a.OK_MS = 60000; a.FAST = true; a.MISS_MS = 0; a.STEP_MS = 0; window.LCS_reloadFirstTask(); });
    await wait(800);
    let s = await st();
    await drag(`.np-umb[data-peg="${s.rail.indexOf(1)}"]`, '.np-pond'); s = await st();
    is(s.hung === 1, `[${loc} @${w}] a detail umbrella dragged onto the pond`);
    await tap('.np-check'); s = await st();
    is(s.misses === 1 && s.hung === null && sp(await note()) === sp(STR.hintMiss1[loc]), `[${loc} @${w}] it rains on the uncovered pads — a miss with the hint`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap(`.np-umb[data-peg="${s.rail.indexOf(0)}"]`); await tap('.np-check'); s = await st();
    is(s.phase === 'step2' && s.under.includes(3), `[${loc} @${w}] the big idea keeps every pad dry — a stranger drifts in`);
    await frame.evaluate(() => { window.NilaPondActivity.OK_MS = 0; });
    await drag('.np-pad[data-pad="3"]', '.np-open'); await tap('.np-check'); await wait(500); s = await st();
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    const ok = C.round(loc, 'bear-warm').ok;
    is(s.done && sp(bubble).includes(sp(ok)), `[${loc} @${w}] the stranger pushed into the rain — «${ok.slice(0, 50)}…»`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(2500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-nila-pond: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
