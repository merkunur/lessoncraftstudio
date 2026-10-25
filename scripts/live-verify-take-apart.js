#!/usr/bin/env node
/* =====================================================================
   live-verify-take-apart.js — drives Is It Still a Triangle? (The Take-
   Apart Tray) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the real activity page, real pointer. Level 1, round 1: a tap
   takes the open "triangle" apart (3 sticks, one EMPTY cup); every shape
   sorted by tap-then-box with the turned small triangle in "not a
   triangle" → Check → a miss (hintTurn, its sticks on the tray); that
   triangle moved to the yes-box → Check → the locale's success line, the
   lid, three bundles of sticks. Every locale page (11) returns 200, the
   wrapper version is page.tsx, the iframe grows with the card; the
   2.G.A.1 sibling page (still on sort-bins) returns 200 in all 11.
   Usage: node scripts/live-verify-take-apart.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '105-take-apart', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'take-apart-activities.json'), 'utf8')).find(r => r.id === 'sort-bins.defining-attributes.1-g-a-1');
const SIB = JSON.parse(fs.readFileSync(path.join(MT, 'sort-bins-activities.json'), 'utf8')).find(r => r.id === 'sort-bins.sort-by-sides.2-g-a-1');
const C = require(path.join(MT, 'take-apart-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, TakeApartCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'take-apart-activity.js'), 'utf8') + ';this.__A = TakeApartActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [row, what] of [[ROW, 'take-apart'], [SIB, 'the 2.G.A.1 sibling']]) for (const loc of Object.keys(row.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${row.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] ${what}: /${loc}/activities/${row.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(300);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="take-apart-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds take-apart-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TakeApartActivity && window.TakeApartActivity.st && document.querySelector('.ta-shelf'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.TakeApartActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'real'; a.api.settings.tray = 'open'; a.api.settings.shapes = '6'; a._pool = null; a._ensurePool(); a._pos = null; a._start(0, 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      if (y0 == null) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(250);
    };
    const st = () => frame.evaluate(() => { const s = window.TakeApartActivity.st; return { items: s.items.map(i => ({ id: i.id, truth: i.truth })), place: s.place.slice(), tray: s.tray, misses: s.misses, done: s.done }; });
    const note = () => frame.evaluate(() => document.querySelector('.ta-note').textContent);
    let s = await st();
    const to = s.items.findIndex(x => x.id === 'tri_open'), tr = s.items.findIndex(x => x.id === 'tri_right');
    await click(`[data-k="shape-${to}"]`);
    const row = await frame.evaluate(() => { const r = document.querySelector('.ta-tray svg.ta-row:not(.ta-rest)'); return r ? { sticks: r.querySelectorAll('.ta-stick').length, empty: r.querySelectorAll('.ta-empty').length } : null; });
    is(row && row.sticks === 3 && row.empty === 1, `[${loc} @${w}] a tap takes the open "triangle" apart: 3 sticks, one empty cup (${JSON.stringify(row)})`);
    await click(`[data-k="shape-${to}"]`);   /* a second tap puts it back together (else the sorting loop would toggle it) */
    for (let i = 0; i < s.items.length; i++) { await click(`[data-k="shape-${i}"]`); await click(`[data-k="box-${i === tr ? 'no' : (s.items[i].truth ? 'yes' : 'no')}"]`); }
    s = await st(); is(s.place.every(p => p), `[${loc} @${w}] every shape sorted by tap-then-box`);
    await click('[data-k="check"]'); s = await st();
    is(s.misses === 1 && s.tray === tr && sp(await note()) === sp(T(loc, 'hintTurn')), `[${loc} @${w}] the turned small triangle in "not" → a miss, «${sp(await note())}», its sticks on the tray`);
    await click(`[data-k="shape-${tr}"]`); await click('[data-k="box-yes"]');
    await click('[data-k="check"]');
    await frame.waitForFunction(() => window.TakeApartActivity.st.done && document.querySelector('.ta-note').textContent, { timeout: 15000 }).catch(() => {}); s = await st();
    const fin = await frame.evaluate(() => ({ lid: document.querySelectorAll('.ta-lid').length, bundles: document.querySelectorAll('.ta-bundle').length }));
    is(s.done && sp(await note()) === sp(T(loc, 'okTri')) && fin.lid === 1 && fin.bundles === 3, `[${loc} @${w}] moved to the yes-box → «${sp(await note())}», the lid, ${fin.bundles} bundles`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-take-apart: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
