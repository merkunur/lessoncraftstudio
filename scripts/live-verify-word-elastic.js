#!/usr/bin/env node
/* =====================================================================
   live-verify-word-elastic.js — drives The Word Elastic ON PRODUCTION in
   en, de, sv and fi (desktop 1366 + phone 390): the real activity page,
   real pointer. Letter beads: the knob DRAGGED out pops one bead per
   sound; Check with empty beads asks (no miss); a trap on one bead → the
   snap kicks exactly that bead (miss); the right tile DRAGGED onto it →
   right. Write it: the word typed on the keys → right.
   The wrapper version is the one in page.tsx; the iframe grows with the
   card; every locale's page returns 200.
   Usage: node scripts/live-verify-word-elastic.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '058-word-elastic', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'cvc-builder-activities.json'), 'utf8')).find(r => r.id === 'cvc-builder.build-cvc-word.rf-k-3');
const C = require(path.join(MT, 'word-elastic-core.js'));
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
    const frameEl = await page.waitForSelector('iframe[src*="word-elastic-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds word-elastic-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.WordElasticActivity && window.WordElasticActivity.st && document.querySelector('.wel-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const drag = async (from, to) => { await toView(to); const a = await ctrOf(from), b = await ctrOf(to); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 12; k++) { await page.mouse.move(a.x + (b.x - a.x) * k / 12, a.y + (b.y - a.y) * k / 12); await wait(15); } await page.mouse.up(); await wait(400); };
    const check = async () => { await tap('.wel-check'); await frame.waitForFunction(() => !window.WordElasticActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.WordElasticActivity.st; return JSON.parse(JSON.stringify({ beads: s.beads, stretch: s.stretch, misses: s.misses, done: s.done, last: s.last })); });
    const force = (lv, id) => frame.evaluate((lv, id) => { const a = window.WordElasticActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.clue = lv; a.api.settings.words = 'simple'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id);

    const r = C.rounds(loc, 'beads', 'simple')[0], n = r.sounds.length;
    await force('beads', r.id); await wait(900);
    const k0 = await ctrOf('.wel-knob'); await page.mouse.move(k0.x, k0.y); await page.mouse.down(); for (let q = 1; q <= 14; q++) { await page.mouse.move(k0.x + (n + 2) * 70 * q / 14, k0.y); await wait(15); } await page.mouse.up(); await wait(400);
    let s = await st(); is(s.stretch === n, `[${loc} @${w}] the knob pulled out ${n} beads (${s.stretch})`);
    await check(); s = await st(); is(s.misses === 0, `[${loc} @${w}] Check with empty beads asks (no miss)`);
    const trap = r.tray.find(t => !r.sounds.includes(t.g)), free = (g) => r.tray.find(t => t.g === g && !(s.beads || []).some(b => b && b.tid === t.id));
    for (let i = 0; i < n; i++) { s = await st(); const t = i === 1 ? trap : free(r.sounds[i]); await tap(`[data-k="tile${t.id}"]`); }
    await check(); s = await st(); is(s.misses === 1 && s.last && JSON.stringify(s.last.wrong) === '[1]', `[${loc} @${w}] «${trap.g}» on bead 2 → the snap kicks exactly that bead`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    s = await st(); await drag(`[data-k="tile${free(r.sounds[1]).id}"]`, '[data-bead="1"]'); await check(); s = await st();
    is(s.done, `[${loc} @${w}] the right tile dragged in → «${r.word}»`);
    const wr = C.rounds(loc, 'write', 'simple')[0];
    await force('write', wr.id); await wait(900);
    for (const g of wr.sounds) await tap(`.wel-key[data-g="${g.toLowerCase()}"]`);
    await check(); s = await st(); is(s.done, `[${loc} @${w}] «${wr.word}» typed on the keys → right`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(600);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-word-elastic: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
