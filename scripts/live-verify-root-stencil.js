#!/usr/bin/env node
/* =====================================================================
   live-verify-root-stencil.js — drives Build Words with Endings (The
   Root Stencil) ON PRODUCTION in en, de, sv and fi (desktop 1366 +
   phone 390): the real activity page, real pointer. Find the root, first
   round: a look-alike tapped into the frame → Check → the locale's
   hintLetter and a coral window; the built word tapped → Check → okFind,
   the stencil flat and its hook tag. Every one of the ten pages returns 200; the wrapper version is page.tsx's; the iframe
   grows with the card.
   Usage: node scripts/live-verify-root-stencil.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '114-root-stencil', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).find(r => r.id === 'syllable-builder.build-endings.rf-1-3-f');
const C = require(path.join(MT, 'root-stencil-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, RootStencilCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'root-stencil-activity.js'), 'utf8') + ';this.__A = RootStencilActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  is(Object.keys(ROW.slug).length === 10 && !ROW.slug.it, 'the row ships in ten locales, it refused');
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(300);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="root-stencil-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds root-stencil-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.RootStencilActivity && window.RootStencilActivity.st && document.querySelector('.rs-foot'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.RootStencilActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.clue = 'find'; a.api.settings.look = 'plain'; a._pool = null; a._ensurePool(); a._pos = [2]; a._start(0, 0); a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const o = await off(); await page.mouse.click(o.x + e.x, o.y + e.y); await wait(200); };
    const st = () => frame.evaluate(() => { const s = window.RootStencilActivity.st; return { cards: s.cards, right: s.right, R: s.R, last: s.last, done: s.done }; });
    const note = () => frame.evaluate(() => document.querySelector('.rs-note').textContent);
    let s = await st(); const wrong = s.cards.findIndex((c, i) => i !== s.right && !c.startsWith(s.R.root));
    await click(`[data-k="card-${wrong}"]`); await click('[data-k="check"]'); await wait(300); s = await st();
    is(s.last === 'wrongLetter' && sp(await note()) === sp(T(loc, 'hintLetter')) && await frame.evaluate(() => document.querySelectorAll('.rs-win.is-bad').length >= 1), `[${loc} @${w}] ${s.cards[wrong]} → «${sp(await note())}», a coral window`);
    await click(`[data-k="card-${s.right}"]`); await click('[data-k="check"]');
    await frame.waitForFunction(() => window.RootStencilActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okFind', { built: s.R.built, root: s.R.root, end: s.R.end })) && await frame.evaluate((w) => [...document.querySelectorAll('.rs-tag')].some(e => e.textContent === w), s.R.built), `[${loc} @${w}] → «${sp(await note())}», its hook tag`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-root-stencil: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
