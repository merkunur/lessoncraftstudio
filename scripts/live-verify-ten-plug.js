#!/usr/bin/env node
/* =====================================================================
   live-verify-ten-plug.js — drives Make a Ten to Add (The Ten Plug) ON
   PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. 8 + 5: a tap snaps the 5 into 2 | 3, the 3
   bounces, the 2 fills the ten; 15 is named as the 10 + 5 slip; 13 succeeds.
   Every locale's page returns 200, the wrapper version is page.tsx's, the
   iframe grows with the card.
   Usage: node scripts/live-verify-ten-plug.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '085-ten-plug', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'number-bond-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'numberbond.make-ten-to-add.1-oa-c-6'); })();
const C = require(path.join(MT, 'ten-plug-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, TenPlugCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'ten-plug-activity.js'), 'utf8') + ';this.__A = TenPlugActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="ten-plug-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds ten-plug-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TenPlugActivity && window.TenPlugActivity.st && document.querySelector('.tp-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.TenPlugActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'add'; a.api.settings.mode = 'snap'; a._pool = null; a._ensurePool(); a._start(0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.TenPlugActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, plugged: s.plugged, pieces: s.pieces.map(p => p.len + p.where[0]).join(',') }; });
    const note = () => frame.evaluate(() => document.querySelector('.tp-note').textContent);
    const onPage = async (fn, arg) => { const o = await frameOff(); const q = await frame.evaluate(fn, arg); return q && { x: o.x + q.x, y: o.y + q.y, x1: q.x1 != null ? o.x + q.x1 : null, y1: q.y1 != null ? o.y + q.y1 : null }; };
    const scrollTo = async (sel) => { const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel); const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(250); };
    await scrollTo('.tp-rack');
    const j = await onPage((len) => { const a = window.TenPlugActivity, G = a._geom(a._width()), b = [...document.querySelectorAll('.tp-piece')].find(e => +e.getAttribute('data-len') === len); const r = b.getBoundingClientRect(); return { x: r.left + (r.width - len * G.p) / 2 + 2 * G.p, y: r.top + r.height / 2 }; }, 5);
    await page.mouse.click(j.x, j.y); await wait(400);
    let s = await st(); is(s.pieces === '2m,3m', `[${loc} @${w}] a real tap snaps the 5 into 2 | 3 (${s.pieces})`);
    const drag = async (len) => { const d = await onPage((len) => { const b = [...document.querySelectorAll('.tp-piece')].find(e => +e.getAttribute('data-len') === len), k = document.querySelector('.tp-rack'); const r = b.getBoundingClientRect(), q = k.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, x1: q.left + q.width * 0.8, y1: q.top + q.height / 2 }; }, len); await page.mouse.move(d.x, d.y); await page.mouse.down(); for (let k = 1; k <= 8; k++) await page.mouse.move(d.x + (d.x1 - d.x) * k / 8, d.y + (d.y1 - d.y) * k / 8); await page.mouse.up(); await wait(400); };
    await drag(3); s = await st(); is(s.last === 'long' && !s.plugged, `[${loc} @${w}] the 3 is too long and bounces back`);
    await drag(2); s = await st(); is(s.plugged && sp(await note()) === sp(T(loc, 'nFit')), `[${loc} @${w}] the 2 fills the ten: «${await note()}»`);
    await click('[data-k="key-1"]'); await click('[data-k="key-5"]'); await click('[data-k="key-ok"]'); s = await st();
    is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hOver')), `[${loc} @${w}] 15 (10 + 5) is named: «${await note()}»`);
    await click('[data-k="key-del"]'); await click('[data-k="key-3"]'); await click('[data-k="key-ok"]'); s = await st();
    is(s.done && sp(await note()) === '8 + 5 = 8 + 2 + 3 = 10 + 3 = 13', `[${loc} @${w}] 13 succeeds: «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-ten-plug: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
