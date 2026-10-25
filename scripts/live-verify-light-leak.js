#!/usr/bin/env node
/* =====================================================================
   live-verify-light-leak.js — drives Mim's Glow Workshop (The Light-Leak
   Lantern) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. The hexagon lantern: a rhombus
   dragged from the tray into the frame (the light shrinks); Check → the
   locale's leak hint, the lamp blazes; then every piece the ghost names
   dragged in (tray turns by real taps) → Check → the locale's success
   line, the etched seams, a lantern on the garland. Every locale page
   (11) returns 200 — da / no / fi are new; the wrapper version is
   page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-light-leak.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '106-light-leak', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'shapeforge-activities.json'), 'utf8')).find(r => r.id === 'shapeforge.compose.1-g-a-2');
const C = require(path.join(MT, 'light-leak-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, LightLeakCore: C, Intl: Intl }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'light-leak-activity.js'), 'utf8') + ';this.__A = LightLeakActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
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
    await page.close(); await wait(300);
  }
  is(Object.keys(ROW.slug).length === 11, 'the row has all 11 locales');
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="light-leak-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds light-leak-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.LightLeakActivity && window.LightLeakActivity.st && document.querySelector('.ll-bench'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.LightLeakActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'glass'; a.api.settings.glass = 'colour'; a.api.settings.turning = 'tap'; a._memory = {}; a._garland = []; a._pool = null; a._ensurePool(); a._pos = null; a._start('L7', 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    /* bring a frame-local y into the page's view; return page coords of a frame point */
    const toPage = async (fx, fy) => { const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 350, behavior: 'instant' }), o0.y + fy); await wait(150); const o = await frameOff(); return { x: o.x + fx, y: o.y + fy }; };
    const elXY = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const modelXY = (m) => frame.evaluate((m) => { const a = window.LightLeakActivity, D = a._dims(), r = document.querySelector('.ll-bench').getBoundingClientRect(), q = a._px(D, m); return { x: r.left + q[0], y: r.top + q[1] }; }, m);
    const click = async (sel) => { const e = await elXY(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const p = await toPage(e.x, e.y); await page.mouse.click(p.x, p.y); await wait(200); };
    const drag = async (sel, m) => {
      const e = await elXY(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}» to drag`); return; }
      const t0 = await modelXY(m), mid = (e.y + t0.y) / 2; const o0 = await frameOff();
      await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 420, behavior: 'instant' }), o0.y + mid); await wait(150);
      const o = await frameOff(), a = { x: o.x + e.x, y: o.y + e.y }, b = await modelXY(m), bb = { x: o.x + b.x, y: o.y + b.y };
      await page.mouse.move(a.x, a.y); await page.mouse.down();
      for (let i = 1; i <= 10; i++) { await page.mouse.move(a.x + (bb.x - a.x) * i / 10, a.y + (bb.y - a.y) * i / 10); await wait(15); }
      await page.mouse.up(); await wait(250);
    };
    const st = () => frame.evaluate(() => { const a = window.LightLeakActivity, s = a.st, C = window.LightLeakCore, c = C.coverage(s); return { placed: s.placed.length, leak: c.uncovered.length, sealed: C.isSealed(s), done: s.done, misses: s.misses, sel: s.sel, rot: Object.assign({}, s.rot), garland: a._garland.length }; });
    const note = () => frame.evaluate(() => document.querySelector('.ll-note').textContent);
    let s = await st(); const leak0 = s.leak;
    await drag('[data-k="tray-rhombus"]', [1, 0.5]); s = await st();
    is(s.placed === 1 && s.leak === leak0 - 2, `[${loc} @${w}] a rhombus dragged into the frame — the light shrinks (${leak0} → ${s.leak})`);
    await click('[data-k="check"]'); s = await st();
    is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hintLeak')) && await frame.evaluate(() => !!document.querySelector('.ll-glow.is-blaze')), `[${loc} @${w}] Check → «${sp(await note())}», the lamp blazes`);
    for (let n = 0; n < 8; n++) {
      const g = await frame.evaluate(() => { const C = window.LightLeakCore, a = window.LightLeakActivity, g = C.ghost(a.st); return g ? { kind: g.kind, rot: g.rot, c: C.triCentre(g.cells) } : null; });
      if (!g) break;
      for (let k = 0; k < 8; k++) { s = await st(); if (s.sel === g.kind && (s.rot[g.kind] || 0) === g.rot) break; await click(`[data-k="tray-${g.kind}"]`); }
      await drag(`[data-k="tray-${g.kind}"]`, g.c);
    }
    s = await st(); is(s.sealed, `[${loc} @${w}] sealed by real drags`);
    await click('[data-k="check"]');
    await frame.waitForFunction(() => window.LightLeakActivity.st.done && document.querySelector('.ll-note').textContent, { timeout: 15000 }).catch(() => {}); s = await st();
    const okLine = sp(await note()), seams = await frame.evaluate(() => document.querySelectorAll('.ll-seam').length);
    is(s.done && okLine.indexOf(sp(T(loc, 'okHexagon'))) === 0 && seams === 1 && s.garland === 1, `[${loc} @${w}] → «${okLine}», the seams etched, a lantern on the garland`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-light-leak: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
