#!/usr/bin/env node
/* =====================================================================
   live-verify-telescope.js — drives Kikkerten ON PRODUCTION (da only):
   the real activity page, real pointer. Træk ud: banan with one ring
   TAPPED out → Kig! blurs, the last ring carries two syllables (miss); one
   more ring → sharp. Byg kikkerten: kjole's rings DRAGGED on reversed →
   the collapse pops them back (miss); TAPPED in order → sharp. Den
   manglende ring: panda — "da" in the hollow is sent back (miss), "pan" → sharp.
   The wrapper version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-telescope.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '046-telescope', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'telescope-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/da/activities/${ROW.slug.da}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[da @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="telescope-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[da @${w}] the page embeds telescope-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[da @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TelescopeActivity && window.TelescopeActivity.st && document.querySelector('.ts-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.TelescopeActivity; a.OK_MS = 60000; a.FAST = true; Object.assign(a.api.settings, { extra: 'off', island: 'no' }); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const drag = async (from, to) => { await toView('.ts-sea'); const a = await ctrOf(from), b = await ctrOf(to); if (!a || !b) return false; await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await page.mouse.up(); await wait(300); return true; };
    const st = () => frame.evaluate(() => { const s = window.TelescopeActivity.st; return JSON.parse(JSON.stringify({ out: s.out, segs: s.segs, rack: s.rack, all: s.all, misses: s.misses, done: s.done, last: s.last })); });

    /* Træk ud: banan */
    await force('pull', 'pull-banan');
    await tap('.ts-lens'); await tap('.ts-check'); let s = await st();
    is(s.out === 1 && s.misses === 1 && s.last.result === 'short' && (await frame.evaluate(() => !!document.querySelector('.ts-view.is-short'))), `[da @${w}] banan on one ring — blurred, two syllables on the ring (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-da-${w}-short.png`) });
    await tap('.ts-lens'); await tap('.ts-check'); s = await st();
    is(s.done && (await frame.evaluate(() => !!document.querySelector('.ts-view.is-sharp'))), `[da @${w}] two rings — sharp`);

    /* Byg kikkerten: kjole */
    await force('build', 'build-kjole'); s = await st();
    const word = s.all.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.id);
    for (const id of word.slice().reverse()) await drag(`.ts-loose[data-id="${id}"]`, '.ts-scope');
    await tap('.ts-check'); s = await st();
    is(s.misses === 1 && s.last.result === 'order' && s.rack.length === 2, `[da @${w}] le + kjo — the rings pop back (miss)`);
    for (const id of word) await tap(`.ts-loose[data-id="${id}"]`);
    await tap('.ts-check'); s = await st();
    is(s.done, `[da @${w}] kjo + le = kjole — sharp`);

    /* Den manglende ring: panda */
    await force('gap', 'gap-panda'); s = await st();
    const same = s.all.find(b => b.s === -2), ans = s.all.find(b => b.s === 0);
    await tap(`.ts-loose[data-id="${same.id}"]`); await tap('.ts-check'); s = await st();
    is(s.misses === 1 && s.last.result === 'sameword', `[da @${w}] "da" in the hollow — in the word, but not here (miss)`);
    await tap(`.ts-loose[data-id="${ans.id}"]`); await tap('.ts-check'); s = await st();
    is(s.done, `[da @${w}] "pan" — sharp`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[da @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-da-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-telescope: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
