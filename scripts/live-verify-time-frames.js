#!/usr/bin/env node
/* =====================================================================
   live-verify-time-frames.js — drives The Clock Tower (Photo, Window,
   Envelope) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. Level 1, round one (a past round):
   a wrong card → Check → it bumps against the album, the album hint; the
   right card → Check → it files into the album as a photo and the success
   line names the sentence. Every one of the 11 pages returns 200; the
   wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-time-frames.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '125-time-frames', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'tense-activities.json'), 'utf8')).find(x => x.id === 'tense.past-present-future.l-1-1-e');
const C = require(path.join(MT, 'time-frames-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, TimeFramesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'time-frames-activity.js'), 'utf8') + ';this.__A = window.TimeFramesActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
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
    const frameEl = await page.waitForSelector('iframe[src*="time-frames-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds time-frames-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.TimeFramesActivity && window.TimeFramesActivity.st && document.querySelector('.vt-wrap'), { timeout: 30000 });
    const r = 0, rd = C.round(loc, '1', r), wrong = rd.cards.find(c => c.tense !== rd.right).tense;
    await frame.evaluate((r) => { const a = window.TimeFramesActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = '1'; a._pool = null; a._ensurePool(); a._start(r, 0); a._render2(); }, r);
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, '[' + loc + ' @' + w + '] there is a «' + sel + '»'); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(250); };
    const count = (sel) => frame.evaluate((s) => document.querySelectorAll(s).length, sel);
    const note = () => frame.evaluate(() => document.querySelector('.vt-note').textContent);
    await click('[data-k="card-' + wrong + '"]'); await click('[data-k="check"]');
    is(sp(await note()) === sp(T(loc, 'missAlbum')) && await count('.vt-op.op-album .vt-fr.is-bump') === 1, `[${loc} @${w}] a wrong card → it bumps against the album, «${sp(await note())}»`);
    await click('[data-k="card-' + rd.right + '"]'); await click('[data-k="check"]');
    await frame.waitForFunction(() => window.TimeFramesActivity.st.done, { timeout: 15000 }).catch(() => {});
    const want = T(loc, C.okKey(rd), { s: C.filled(rd, rd.right).replace(/[.!]$/, '') });
    is(await frame.evaluate(() => window.TimeFramesActivity.st.done) && await count('.vt-op.op-album .vt-fr.is-in.is-photo') === 1 && sp(await note()) === sp(want), `[${loc} @${w}] the right card → it files into the album as a photo, «${sp(await note())}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-time-frames: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
