#!/usr/bin/env node
/* =====================================================================
   live-verify-reach-back-e.js — drives Add the Magic e (The Reach-Back e)
   ON PRODUCTION in en (desktop 1366 + phone 390): the real activity page,
   real pointer. cap: a + the e → Check → hintExtra, the end socket rings;
   the e tapped off → Check → okNoE, the tag on the washing line. kite:
   i + the e → the arm taps the vowel, the gold name face → Check → okE.
   The page returns 200; the wrapper version is page.tsx's; the iframe
   grows with the card.
   Usage: node scripts/live-verify-reach-back-e.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '111-reach-back-e', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'cvc-builder-activities.json'), 'utf8')).find(r => r.id === 'cvc-builder.build-magic-e.rf-1-3-silent-e');
const C = require(path.join(MT, 'reach-back-e-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, ReachBackECore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'reach-back-e-activity.js'), 'utf8') + ';this.__A = ReachBackEActivity;', ctx); return ctx.__A; })();
const T = (k, a) => String(ACT.strings[k].en).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  is(JSON.stringify(Object.keys(ROW.slug)) === '["en"]', 'the row ships in en only');
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(`https://www.lessoncraftstudio.com/en/activities/${ROW.slug.en}`, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && res.status() === 200, `[@${w}] /en/activities/${ROW.slug.en} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="reach-back-e-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[@${w}] the page embeds reach-back-e-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[@${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.ReachBackEActivity && window.ReachBackEActivity.st && document.querySelector('.rb-foot'), { timeout: 30000 });
    const start = (word) => frame.evaluate((word) => { const a = window.ReachBackEActivity, C = window.ReachBackECore; a.OK_MS = 600000; a.FAST = true; a.api.settings.clue = 'finish'; a.api.settings.vowel = 'pick'; a._pool = null; a._ensurePool(); a._set = 0; a._pos = [1, 1, 1, 1, 1, 1, 1, 1, 1]; a._vFirst = null; a._start(C.FINISH[0].findIndex(x => x[0] === word), 0); a._render2(); }, word);
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, `[@${w}] there is a «${sel}»`); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const o = await off(); await page.mouse.click(o.x + e.x, o.y + e.y); await wait(250); };
    const tile = (kind, c) => frame.evaluate((kind, c) => window.ReachBackEActivity.st.tray.findIndex(t => t.k === kind && (c == null || t.c === c)), kind, c);
    const note = () => frame.evaluate(() => document.querySelector('.rb-note').textContent);
    const st = () => frame.evaluate(() => { const s = window.ReachBackEActivity.st; return { vowel: s.vowel, end: s.end, last: s.last, done: s.done }; });
    await start('cap');
    await click(`[data-k="tile-${await tile('v', 'a')}"]`); await click(`[data-k="tile-${await tile('e')}"]`); await click('[data-k="check"]');
    let s = await st(); is(s.last === 'eExtra' && sp(await note()) === sp(T('hintExtra')) && await frame.evaluate(() => !!document.querySelector('.rb-sock.is-end.is-wrong')), `[@${w}] cap + e → «${sp(await note())}», the end socket rings`);
    await click('[data-k="esock"]'); await click('[data-k="check"]');
    await frame.waitForFunction(() => window.ReachBackEActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    is(s.done && sp(await note()) === sp(T('okNoE', { word: 'cap', v: 'a' })) && await frame.evaluate(() => document.querySelectorAll('.rb-tag').length >= 1), `[@${w}] the e off → «${sp(await note())}», a tag on the washing line`);
    await start('kite');
    await click(`[data-k="tile-${await tile('v', 'i')}"]`); await click(`[data-k="tile-${await tile('e')}"]`);
    is(await frame.evaluate(() => !!document.querySelector('.rb-arm.is-tap') && !!document.querySelector('[data-k="vsock"] .rb-coin.is-name')), `[@${w}] kite: the arm taps the i, the gold name face`);
    await click('[data-k="check"]');
    await frame.waitForFunction(() => window.ReachBackEActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    is(s.done && sp(await note()) === sp(T('okE', { word: 'kite', v: 'i' })), `[@${w}] → «${sp(await note())}»`);
    await page.screenshot({ path: path.join(OUT, `live-en-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[@${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-reach-back-e: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
