#!/usr/bin/env node
/* =====================================================================
   live-verify-sign-beam.js — drives Numbers Court (The Equal-Sign Beam)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. 6 + 2 = 8 + 1: = and the gavel — the seal
   holds, the beam stays (hEvid); ≠ and the gavel — the beam tips toward
   the 9 (okFalse); + to 3 and the gavel — flat (okFixed). Every locale's
   page returns 200, the wrapper version is page.tsx's, Tess and the
   witness load, the iframe grows with the card.
   Usage: node scripts/live-verify-sign-beam.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '088-sign-beam', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'numbers-court-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'numbers-court.judge-balance.1-oa-d-7'); })();
const C = require(path.join(MT, 'sign-beam-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, SignBeamCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'sign-beam-activity.js'), 'utf8') + ';this.__A = SignBeamActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="sign-beam-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds sign-beam-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.SignBeamActivity && window.SignBeamActivity.st && document.querySelector('.sb-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.SignBeamActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.claims = 'tf'; a.api.settings.numbers = '10'; a._pool = null; a._ensurePool(); a._start(8, 8); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.SignBeamActivity.st; return { done: s.done, misses: s.misses, phase: s.phase, dial: s.dial }; });
    const note = () => frame.evaluate(() => document.querySelector('.sb-note').textContent);
    const ang = () => frame.evaluate(() => +document.querySelector('.sb-beam').getAttribute('data-ang'));
    await frame.waitForFunction(() => [...document.querySelectorAll('.sb-tess,.sb-wit')].length === 2 && [...document.querySelectorAll('.sb-tess,.sb-wit')].every(i => i.complete && i.naturalWidth > 0), { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => [...document.querySelectorAll('.sb-tess,.sb-wit')].length === 2 && [...document.querySelectorAll('.sb-tess,.sb-wit')].every(i => i.naturalWidth > 0)), `[${loc} @${w}] Judge Tess and the witness (library pictures) load`);
    await click('[data-k="stamp-eq"]'); await click('[data-k="gavel"]'); let s = await st();
    is(s.misses === 1 && await ang() === 0 && sp(await note()) === sp(T(loc, 'hEvid')), `[${loc} @${w}] = on 6 + 2 = 8 + 1: the seal holds, the beam stays: «${await note()}»`);
    await click('[data-k="stamp-ne"]'); await click('[data-k="gavel"]'); s = await st();
    is(s.phase === 'repair' && await ang() > 4 && sp(await note()) === sp(T(loc, 'okFalse', { l: 8, r: 9 })), `[${loc} @${w}] ≠ breaks the seal, the beam tips toward the 9: «${await note()}»`);
    await click('[data-k="plus"]'); await click('[data-k="gavel"]'); s = await st();
    is(s.done && await ang() === 0 && sp(await note()) === sp(T(loc, 'okFixed', { c: '6 + 3 = 8 + 1' })), `[${loc} @${w}] 3 in the gold crate lays the beam flat: «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-sign-beam: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
