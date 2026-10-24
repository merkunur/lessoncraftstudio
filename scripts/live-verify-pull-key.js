#!/usr/bin/env node
/* =====================================================================
   live-verify-pull-key.js — drives Owl's Cuckoo Cottage (The Pull-Back Key)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. R3 (8:30, bedtime): ◀ winds the key back
   and it stops on the o'clock (the 8 ringed, the short hand on the 8);
   tap 7:30 → Check → a miss (hintBack, the spring rewound by itself);
   tap 8:30 → Check → the locale's celebration, Owl out, the evening
   window. Every locale page (11) returns 200, the wrapper version is
   page.tsx, Owl loads, the iframe grows with the card.
   Usage: node scripts/live-verify-pull-key.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '103-pull-key', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'clock-read-activities.json'), 'utf8')).find(r => r.id === 'clock-read.tell-time.1-md-b-3');
const C = require(path.join(MT, 'pull-key-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, PullKeyCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'pull-key-activity.js'), 'utf8') + ';this.__A = PullKeyActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = Object.assign({ name: ACT.strings.name[loc] }, a || {}); return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const OKT = (loc) => { const f = Object.create(ACT); f.api = { lang: loc, t: (k) => ACT.strings[k][loc], settings: {} }; f.st = C.newState(C.round('R3', 'readset')); return f._okText(); };
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
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
    const frameEl = await page.waitForSelector('iframe[src*="pull-key-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds pull-key-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.PullKeyActivity && window.PullKeyActivity.st && document.querySelector('.pk-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.PullKeyActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.times = 'half'; a.api.settings.rounds = 'readset'; a._pool = null; a._ensurePool(); a._start('R3', 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(250);
    };
    const st = () => frame.evaluate(() => { const a = window.PullKeyActivity, s = a.st, v = a._view; return { done: s.done, misses: s.misses, back: s.back, ring: v.ring, owl: v.owl, win: (document.querySelector('.pk-window') || {}).getAttribute ? document.querySelector('.pk-window').getAttribute('class') : '' }; });
    const note = () => frame.evaluate(() => document.querySelector('.pk-note').textContent);
    await frame.waitForFunction(() => Object.keys(window.PullKeyActivity._pics).length >= 5, { timeout: 20000 }).catch(() => {});
    await click('[data-k="back"]'); let s = await st();
    is(s.ring === 8 && s.back === 0, `[${loc} @${w}] ◀ winds the key back to the o'clock: the 8 ringed, then the clock whirrs back to 8:30 (ring ${s.ring})`);
    await click('[data-k="card-1"]'); await click('[data-k="check"]'); s = await st();
    is(s.misses === 1 && s.ring === 8 && sp(await note()) === sp(T(loc, 'hintBack')), `[${loc} @${w}] 7:30 → a miss, the spring rewound by itself, «${await note()}»`);
    await click('[data-k="card-2"]'); await click('[data-k="check"]'); await frame.waitForFunction(() => window.PullKeyActivity.st.done && document.querySelector('.pk-note').textContent, { timeout: 15000 }).catch(() => {}); s = await st();
    is(s.done && s.owl && s.win === 'pk-window is-evening' && sp(await note()) === sp(OKT(loc)), `[${loc} @${w}] 8:30 → «${await note()}», Owl out, the evening window`);
    await frame.waitForFunction(() => { const i = document.querySelector('.pk-owl'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const i = document.querySelector('.pk-owl'); return !!(i && i.naturalWidth > 0); }), `[${loc} @${w}] Owl (a library picture) loads`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-pull-key: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
