#!/usr/bin/env node
/* =====================================================================
   live-verify-linc-fact-chain.js — drives The Domino Track (Linc's Fact
   Chain) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the
   real activity page, real pointer. "Why it happens", the sun-on-snow
   round: the same-word lure dragged into the gap and checked → the chain
   stops, a miss with the hint; the right card dragged in and checked → the
   dominoes fall and the shell reads the authored joined sentence. The
   wrapper version is the one in page.tsx; the iframe grows with the card;
   every locale's page returns 200.
   Usage: node scripts/live-verify-linc-fact-chain.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '071-domino-track', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'linc-fact-chain-activities.json'), 'utf8')).find(r => r.id === 'linc-fact-chain.connect.ri-k-3');
const C = require(path.join(MT, 'linc-fact-chain-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, LincFactChainCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'linc-fact-chain-activity.js'), 'utf8') + ';this.__A = LincFactChainActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="linc-fact-chain-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds linc-fact-chain-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.LincFactChainActivity && window.LincFactChainActivity.st && window.LincFactChainCore && document.querySelector('.lf-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + Math.min(rr.height / 2, 40) }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const settle = () => frame.waitForFunction(() => !window.LincFactChainActivity._busy, { timeout: 15000 }).catch(() => {});
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); await settle(); await wait(150); };
    const drag = async (from, to) => { await toView(from); const a = await ctrOf(from), b = await ctrOf(to); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14); await page.mouse.up(); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.LincFactChainActivity.st; return JSON.parse(JSON.stringify({ placed: s.placed, misses: s.misses, done: s.done })); });
    const note = () => frame.evaluate(() => document.querySelector('.lf-note').textContent);
    await frame.evaluate(() => { const a = window.LincFactChainActivity; a.api.settings.level = 'cause'; a.api.settings.choices = 'more'; a._pool = null; const pool = a._ensurePool(), o = pool.map((x, i) => i), k = pool.indexOf('sun'); o.splice(k, 1); o.unshift(k); a._order = o; a._orderForPool = pool; a.OK_MS = 60000; a.FAST = true; a.MISS_MS = 0; window.LCS_reloadFirstTask(); });
    await wait(800);
    await drag('.lf-card[data-card="s"]', '.lf-gapslot[data-gap="0"]'); await tap('.lf-check'); let s = await st();
    is(s.misses === 1 && s.placed[0] === null && sp(await note()) === sp(STR.hintMiss1So[loc]), `[${loc} @${w}] the same-word lure in the gap — the chain stops, a miss with the hint`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await frame.evaluate(() => { window.LincFactChainActivity.OK_MS = 0; });
    await drag('.lf-card[data-card="r"]', '.lf-gapslot[data-gap="0"]'); await tap('.lf-check'); await wait(500); s = await st();
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    const joined = C.round(loc, 'cause', 'sun').joined;
    is(s.done && sp(bubble).includes(sp(joined)), `[${loc} @${w}] the right card — the chain falls: «${joined.slice(0, 50)}…»`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(2500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-linc-fact-chain: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
