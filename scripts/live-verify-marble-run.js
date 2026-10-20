#!/usr/bin/env node
/* =====================================================================
   live-verify-marble-run.js — drives Tavukuularata ON PRODUCTION (fi
   only): the real activity page, real pointer. koira: nothing on the
   track asks (no miss); ra + koi tapped on → the marble reads «rakoi»
   and rolls into the dish (miss); taken off, koi + ra → the marble lands
   in the cup, the strip says koira. kissa (Tavuvahti): ki + ssa → the
   marble stops at the two-consonant step (miss); kis + sa → lands. The
   wrapper version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-marble-run.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '053-marble-run', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'marble-run-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/fi/activities/${ROW.slug.fi}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[fi @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="marble-run-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[fi @${w}] the page embeds marble-run-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[fi @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.MarbleRunActivity && window.MarbleRunActivity.st && document.querySelector('.tmr-wrap'), { timeout: 30000 });
    await wait(1500);
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.MarbleRunActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.decoy = 'yes'; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const go = async () => { await tap('.tmr-check'); await frame.waitForFunction(() => !window.MarbleRunActivity._busy, { timeout: 8000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.MarbleRunActivity.st; return JSON.parse(JSON.stringify({ places: s.places, misses: s.misses, done: s.done, last: s.last })); });
    const strip = () => frame.evaluate(() => document.querySelector('.tmr-read').textContent);
    const T = (id) => `.tmr-tray .tmr-piece[data-id="${id}"]`, B = (id) => `.tmr-board .tmr-piece[data-id="${id}"]`;

    await force('short', 'short-koira');
    await go(); let s = await st(); is(s.misses === 0 && s.last && s.last.result === 'empty', `[fi @${w}] nothing on the track asks (no miss)`);
    await tap(T('p1')); await tap(T('p0')); await go(); s = await st();
    is(s.misses === 1 && s.last.result === 'order' && (await strip()) === 'rakoi', `[fi @${w}] ra + koi → the marble reads «rakoi» (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-fi-${w}-miss.png`) });
    await tap(B('p1')); await tap(B('p0')); await tap(T('p0')); await tap(T('p1')); await go();
    await frame.waitForFunction(() => !!document.querySelector('.tmr-read.is-whole'), { timeout: 6000 }).catch(() => {});
    s = await st(); is(s.done && (await strip()) === 'koira', `[fi @${w}] koi + ra → the marble lands, the strip says koira`);

    await force('guard', 'guard-kissa');
    await tap(T('w0')); await tap(T('w1')); await go(); s = await st();
    is(s.last.result === 'step' && (await frame.evaluate(() => !!document.querySelector('.tmr-piece.is-stepbad'))), `[fi @${w}] ki + ssa → the marble stops at the two-consonant step`);
    await tap(B('w0')); await tap(B('w1')); await tap(T('p0')); await tap(T('p1')); await go();
    await frame.waitForFunction(() => !!document.querySelector('.tmr-read.is-whole'), { timeout: 6000 }).catch(() => {});
    s = await st(); is(s.done && (await strip()) === 'kissa', `[fi @${w}] kis + sa → lands on kissa`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[fi @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-fi-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-marble-run: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
