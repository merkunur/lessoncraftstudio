#!/usr/bin/env node
/* =====================================================================
   live-verify-atlas-fact-files.js — drives The Highlighter (Atlas's Fact
   Files) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. The bees fact, "where do bees
   live": the highlighter swiped across the other sentence's answer → the
   card reads it back, a miss with the hint; swiped across the answer →
   the card reads the authored sentence, the success text. Then a fact
   file: a strip tapped into its drawer shows its key detail. The wrapper
   version is the one in page.tsx; the iframe grows with the card; every
   locale's page returns 200.
   Usage: node scripts/live-verify-atlas-fact-files.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '069-highlighter', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'atlas-fact-files-activities.json'), 'utf8')).find(r => r.id === 'atlas-fact-files.key-detail.ri-k-1');
const C = require(path.join(MT, 'atlas-fact-files-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, AtlasFactFilesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'atlas-fact-files-activity.js'), 'utf8') + ';this.__A = AtlasFactFilesActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="atlas-fact-files-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds atlas-fact-files-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.AtlasFactFilesActivity && window.AtlasFactFilesActivity.st && window.AtlasFactFilesCore && document.querySelector('.af-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); await frame.waitForFunction(() => !window.AtlasFactFilesActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(150); };
    const swipe = async (i, j) => { await toView(`.af-w[data-i="${i}"]`); const a = await ctrOf(`.af-w[data-i="${i}"]`), b = await ctrOf(`.af-w[data-i="${j}"]`); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 10; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 10, a.y + (b.y - a.y) * k / 10); await page.mouse.up(); await wait(200); };
    const st = () => frame.evaluate(() => { const s = window.AtlasFactFilesActivity.st; return JSON.parse(JSON.stringify({ sel: s.sel, misses: s.misses, done: s.done, filed: s.filed })); });
    const note = () => frame.evaluate(() => document.querySelector('.af-note').textContent);
    const force = (level, key, q) => frame.evaluate((level, key, q) => { const a = window.AtlasFactFilesActivity, K = window.AtlasFactFilesCore; a.OK_MS = 60000; a.FAST = true; a.MISS_MS = 0; a.api.settings.level = level; const r = K.round(a._loc(), level, key, q); a._pool = [r]; a._poolKey = a._key(); a._deal = [K.deal(r, K.seeded('live'), 1)]; a._order = null; a._pass = 0; window.LCS_reloadFirstTask(); }, level, key, q);
    const r = C.round(loc, 'find', 'bees', 0);
    await force('find', 'bees', 0); await wait(800);
    await swipe(r.trap[0], r.trap[1]); await tap('.af-check'); let s = await st();
    is(s.misses === 1 && sp(await note()) === sp(STR.hintRead[loc]), `[${loc} @${w}] the other sentence's answer highlighted — the card reads it back, a miss`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await frame.evaluate(() => { window.AtlasFactFilesActivity.OK_MS = 0; });
    await swipe(r.span[0], r.span[1]); await tap('.af-check'); await wait(500); s = await st();
    const card = C.frameFill(r.frame, C.words(r, r.span));
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(s.done && sp(bubble).includes(sp(card)), `[${loc} @${w}] the answer highlighted — «${card}»`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-found.png`) });
    await force('file', 'rabbit', 0); await wait(800);
    await tap('[data-strip="0"]'); await tap('[data-drawer="eats"]'); s = await st();
    const det = await frame.evaluate(() => document.querySelector('[data-drawer="eats"] .af-det').textContent);
    is(s.filed['0'] === 'eats' && det === C.DATA.TEXT[loc].files.rabbit.s[0][1], `[${loc} @${w}] the eats strip filed — the drawer shows «${det}»`);
    await wait(2500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-atlas-fact-files: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
