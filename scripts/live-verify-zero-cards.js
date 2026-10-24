#!/usr/bin/env node
/* =====================================================================
   live-verify-zero-cards.js — drives Tens and Ones (The Zero-Swallowing
   Cards) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. 47 as a word: tap the 40 card
   (four rods pour), drag the 7 beside the stand → it tips off, still 40;
   drag the 7 onto the 0 → 47; Check → okBuild. Every locale page returns
   200, the wrapper version is page.tsx, the iframe grows with the card.
   Usage: node scripts/live-verify-zero-cards.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '098-zero-cards', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'place-value-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'place-value.tens-and-ones.1-nbt-b-2'); })();
const C = require(path.join(MT, 'zero-cards-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, ZeroCardsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'zero-cards-activity.js'), 'utf8') + ';this.__A = ZeroCardsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
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
    const frameEl = await page.waitForSelector('iframe[src*="zero-cards-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds zero-cards-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.ZeroCardsActivity && window.ZeroCardsActivity.st && document.querySelector('.zc-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.ZeroCardsActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.task = 'build'; a.api.settings.numbers = '99'; a._pool = null; a._ensurePool(); a._start('b3', 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    /* scroll the element to mid-screen, then return its centre in PAGE coordinates */
    const at = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return null; }
      const y0 = await frame.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, right: r.right }; }, sel);
      return { x: o.x + b.x, y: o.y + b.y, right: o.x + b.right };
    };
    const click = async (sel) => { const p = await at(sel); if (p) { await page.mouse.click(p.x, p.y); await wait(350); } };
    /* measure WITHOUT scrolling (both ends of a drag must come from the same scroll position) */
    const here = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, right: r.right }; }, sel); return { x: o.x + b.x, y: o.y + b.y, right: o.x + b.right }; };
    const drag = async (sel, toX, toY) => { const p = await here(sel); if (!p) return; await page.mouse.move(p.x, p.y); await page.mouse.down(); for (let k = 1; k <= 8; k++) { await page.mouse.move(p.x + (toX - p.x) * k / 8, p.y + (toY - p.y) * k / 8); await wait(15); } await page.mouse.up(); await wait(400); };
    const st = () => frame.evaluate(() => { const s = window.ZeroCardsActivity.st; return { done: s.done, misses: s.misses, v: (s.tens || 0) + (s.ones || 0), ones: s.ones }; });
    const note = () => frame.evaluate(() => document.querySelector('.zc-note').textContent);
    await click('[data-k="rack-t40"]'); let s = await st();
    is(s.v === 40 && await frame.evaluate(() => document.querySelectorAll('.zc-mat .zc-rod').length) === 4, `[${loc} @${w}] the 40 card pours four rods`);
    /* the 7 dragged just beside the stand tips off */
    await at('.zc-stand'); const stand = await here('.zc-stand');
    await drag('[data-k="rack-o7"]', stand.right + 50, stand.y); s = await st();
    is(s.v === 40 && s.ones === null && sp(await note()) === sp(T(loc, 'hintTip')), `[${loc} @${w}] the 7 beside the stand tips off: «${await note()}»`);
    await at('.zc-stand'); const cell2 = await here('.zc-cell.is-r');
    await drag('[data-k="rack-o7"]', cell2.x, cell2.y); s = await st();
    is(s.v === 47, `[${loc} @${w}] the 7 on the 0 → 47`);
    await click('[data-k="check"]'); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okBuild', { n: 47, tp: T(loc, 'pTn', { t: 4 }), op: T(loc, 'pOn', { o: 7 }) })), `[${loc} @${w}] 47 → «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-zero-cards: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
