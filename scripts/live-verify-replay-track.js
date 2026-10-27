#!/usr/bin/env node
/* =====================================================================
   live-verify-replay-track.js — drives Story Problems (The Replay Track)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. Tom's marbles: the told numbers added (62)
   and replayed → the bar sails past the 45 flag, the gap shaded, the miss
   line; the right number (28) → every flag hit, the equation 28 + 17 = 45
   and the success line. Every one of the 11 pages returns 200; the
   wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-replay-track.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '136-replay-track', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'number-bond-activities.json'), 'utf8')).find(x => x.id === 'numberbond.story-problem.2-oa-a-1');
const C = require(path.join(MT, 'replay-track-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, ReplayTrackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'replay-track-activity.js'), 'utf8') + ';this.__A = window.ReplayTrackActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
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
    const frameEl = await page.waitForSelector('iframe[src*="replay-track-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds replay-track-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.ReplayTrackActivity && window.ReplayTrackActivity.st && document.querySelector('.rt-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.ReplayTrackActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.story = 'w100'; a._pool = null; a._ensurePool(); a._start(8); a._render2(); });
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, '[' + loc + ' @' + w + '] there is a «' + sel + '»'); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(200); };
    const note = () => frame.evaluate(() => document.querySelector('.rt-note').textContent);
    const typeNum = async (n) => { for (const d of String(n)) await click('[data-k="key-' + d + '"]'); };
    await typeNum(62); await click('[data-k="replay"]');
    is(sp(await note()) === sp(T(loc, 'miss1', { guess: 62, flag: 45 })) && await frame.evaluate(() => !!document.querySelector('.rt-gap') && !!document.querySelector('.rt-flag.is-miss')), `[${loc} @${w}] 62 sails past the 45 flag, «${sp(await note())}»`);
    await click('[data-k="key-del"]'); await click('[data-k="key-del"]'); await typeNum(28); await click('[data-k="replay"]');
    await frame.waitForFunction(() => window.ReplayTrackActivity.st.done, { timeout: 15000 }).catch(() => {});
    const eq = await frame.evaluate(() => { const e = document.querySelector('.rt-eq'); return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; });
    is(await frame.evaluate(() => window.ReplayTrackActivity.st.done) && eq === '28 + 17 = 45' && sp(await note()) === sp(T(loc, 'ok', { answer: 28 })), `[${loc} @${w}] 28 → every flag hit, «${eq}», «${sp(await note())}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-replay-track: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
