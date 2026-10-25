#!/usr/bin/env node
/* =====================================================================
   live-verify-fair-mobile.js — drives Equal Halves and Fourths (The Fair
   Mobile) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. Halves #1: the unequal card
   tapped onto the mobile; Check → the bar tips, the locale's hint; then
   the fair card DRAGGED onto the mobile; Check → level, the locale's
   success line, a stacked ½ on both shares. Every locale page (11)
   returns 200; the wrapper version is page.tsx's; the iframe grows with
   the card.
   Usage: node scripts/live-verify-fair-mobile.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '107-fair-mobile', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'fair-mobile-activities.json'), 'utf8')).find(r => r.id === 'choice-board.fraction-equal-shares.1-g-a-3');
const C = require(path.join(MT, 'fair-mobile-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, FairMobileCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'fair-mobile-activity.js'), 'utf8') + ';this.__A = FairMobileActivity;', ctx); return ctx.__A; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="fair-mobile-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds fair-mobile-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.FairMobileActivity && window.FairMobileActivity.st && document.querySelector('.fm-mob'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.FairMobileActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = 'hf'; a.api.settings.bubble = 'on'; a._pool = null; a._ensurePool(); a._pos = null; a._start(0, 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const elXY = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const toPage = async (fx, fy) => { const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 350, behavior: 'instant' }), o0.y + fy); await wait(150); const o = await frameOff(); return { x: o.x + fx, y: o.y + fy }; };
    const click = async (sel) => { const e = await elXY(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const p = await toPage(e.x, e.y); await page.mouse.click(p.x, p.y); await wait(250); };
    const drag = async (sel) => {
      const e = await elXY(sel), m = await elXY('.fm-mob'); if (!e || !m) { is(false, `[${loc} @${w}] there is a «${sel}» to drag`); return; }
      const mid = (e.y + m.y) / 2, o0 = await frameOff();
      await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 420, behavior: 'instant' }), o0.y + mid); await wait(150);
      const o = await frameOff(), a = { x: o.x + e.x, y: o.y + e.y }, b = { x: o.x + m.x, y: o.y + m.y };
      await page.mouse.move(a.x, a.y); await page.mouse.down();
      for (let i = 1; i <= 10; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await wait(15); }
      await page.mouse.up(); await wait(300);
    };
    const st = () => frame.evaluate(() => { const s = window.FairMobileActivity.st; return { cards: s.cards.slice(), hung: s.hung, done: s.done, misses: s.misses }; });
    const note = () => frame.evaluate(() => document.querySelector('.fm-note').textContent);
    const angle = () => frame.evaluate(() => { const l = document.querySelector('.fm-mob line[stroke-width="10"]'); return Math.atan2(+l.getAttribute('y2') - +l.getAttribute('y1'), +l.getAttribute('x2') - +l.getAttribute('x1')) * 180 / Math.PI; });
    let s = await st();
    await click(`[data-k="card-${s.cards.indexOf('circle-halves-uneq')}"]`); s = await st();
    is(s.hung === s.cards.indexOf('circle-halves-uneq') && Math.abs(await angle()) < 0.5, `[${loc} @${w}] a tap hangs the unequal card; the pin holds it level`);
    await click('[data-k="check"]'); s = await st();
    is(s.misses === 1 && Math.abs(await angle()) >= 6 && sp(await note()) === sp(T(loc, 'hintUneq')), `[${loc} @${w}] Check → it tips ${(await angle()).toFixed(1)}°, «${sp(await note())}»`);
    await drag(`[data-k="card-${s.cards.indexOf('circle-halves-v')}"]`); s = await st();
    is(s.hung === s.cards.indexOf('circle-halves-v'), `[${loc} @${w}] the fair card dragged onto the mobile`);
    await click('[data-k="check"]');
    await frame.waitForFunction(() => window.FairMobileActivity.st.done && document.querySelectorAll('.fm-label').length === 2, { timeout: 15000 }).catch(() => {}); s = await st();
    const okLine = sp(await note()), labels = await frame.evaluate(() => [...document.querySelectorAll('.fm-label text')].map(t => t.textContent).join('/'));
    is(s.done && okLine === sp(T(loc, 'okHalves')) && Math.abs(await angle()) < 0.5 && labels === '1/2/1/2', `[${loc} @${w}] → level, «${okLine}», ½ on both shares`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-fair-mobile: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
