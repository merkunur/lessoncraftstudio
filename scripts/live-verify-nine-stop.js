#!/usr/bin/env node
/* =====================================================================
   live-verify-nine-stop.js — drives Ten More, Ten Less (The Nine-Stop Tubes)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. 34 + 10: ▲ on the ones tube makes 35 —
   Check → a miss, hintTenMore, the tens tube lit; ▼ back, ▲ on the tens
   tube; 44 → okTenMore. Every locale page returns 200, the wrapper version
   is page.tsx, the iframe grows with the card.
   Usage: node scripts/live-verify-nine-stop.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '097-nine-stop', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'choice-board.ten-more-less.1-nbt-c-5'); })();
const C = require(path.join(MT, 'nine-stop-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, NineStopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'nine-stop-activity.js'), 'utf8') + ';this.__A = NineStopActivity;', ctx); return ctx.__A.strings; })();
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ');
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
    const frameEl = await page.waitForSelector('iframe[src*="nine-stop-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds nine-stop-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.NineStopActivity && window.NineStopActivity.st && document.querySelector('.ns-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.NineStopActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.task = 'ten'; a.api.settings.glass = 'clear'; a._pool = null; a._ensurePool(); a._start('n0', 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.NineStopActivity.st; return { done: s.done, misses: s.misses, v: s.t * 10 + s.o }; });
    const note = () => frame.evaluate(() => document.querySelector('.ns-note').textContent);
    const rods = () => frame.evaluate(() => document.querySelectorAll('.ns-glass[data-tube="t"] .ns-blk').length);
    const tensLit = () => frame.evaluate(() => !!document.querySelector('.ns-glass[data-tube="t"].is-glow'));
    let s = await st();
    is(s.v === 34 && await rods() === 3, `[${loc} @${w}] 34 stands in the tubes: three rods`);
    await click('[data-k="up-o"]'); await click('[data-k="check"]'); s = await st();
    is(s.v === 35 && s.misses === 1 && sp(await note()) === sp(T(loc, 'hintTenMore')) && await tensLit(), `[${loc} @${w}] 35 → a miss, «${await note()}», the tens tube lit`);
    await click('[data-k="down-o"]'); await click('[data-k="up-t"]'); await click('[data-k="check"]'); s = await st();
    is(s.done && s.v === 44 && sp(await note()) === sp(T(loc, 'okTenMore', { start: 34, answer: 44 })), `[${loc} @${w}] 44 → «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-nine-stop: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
