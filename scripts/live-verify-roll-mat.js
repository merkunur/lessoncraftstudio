#!/usr/bin/env node
/* =====================================================================
   live-verify-roll-mat.js — drives Tuck's Ten Bundles (The Roll-Up Mats)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. 27 + 5: five cubes from the bin fill the
   ones mat (its tenth block covers the box) and two wait on the doorstep;
   Check → hintCovered; roll, drop the ten from the shelf; 32 → okAddRoll.
   Every locale page returns 200, the wrapper version is page.tsx, Tuck
   loads, the iframe grows with the card.
   Usage: node scripts/live-verify-roll-mat.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '096-roll-mat', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'place-value-regroup-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'place-value-regroup.add-compose-ten.1-nbt-c-4'); })();
const C = require(path.join(MT, 'roll-mat-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, RollMatCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'roll-mat-activity.js'), 'utf8') + ';this.__A = RollMatActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="roll-mat-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds roll-mat-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.RollMatActivity && window.RollMatActivity.st && document.querySelector('.rm-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.RollMatActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.numbers = 'add1'; a.api.settings.way = 'add'; a._pool = null; a._ensurePool(); a._start('a0', 0); a._render2(); });
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(350);
    };
    const st = () => frame.evaluate(() => { const s = window.RollMatActivity.st; return { done: s.done, misses: s.misses, full: s.cols.O.mat.length === 10, door: s.cols.O.door.length, tens: s.cols.T.mat.length, covered: !!document.querySelector('.rm-box.is-covered') }; });
    const note = () => frame.evaluate(() => document.querySelector('.rm-note').textContent);
    await frame.waitForFunction(() => { const i = [...document.querySelectorAll('.rm-hamster')]; return i.length === 1 && i.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const i = [...document.querySelectorAll('.rm-hamster')]; return i.length === 1 && i.every(x => x.naturalWidth > 0); }), `[${loc} @${w}] Tuck (a library picture) loads`);
    for (let k = 0; k < 5; k++) await click('[data-k="bin-O"]');
    let s = await st();
    is(s.full && s.door === 2 && s.covered, `[${loc} @${w}] 27 + 5: the ones mat is full, two wait on the doorstep, the box is covered`);
    await click('[data-k="check"]'); s = await st();
    is(s.misses === 0 && sp(await note()) === sp(T(loc, 'hintCovered')), `[${loc} @${w}] Check → hintCovered, no miss: «${await note()}»`);
    await click('[data-k="roll-O"]'); await click('[data-k="shelf-T"]'); s = await st();
    is(s.tens === 3 && !s.covered, `[${loc} @${w}] rolled, carried, dropped: three tens, the box open`);
    await click('[data-k="box-total"]'); await click('[data-k="key-3"]'); await click('[data-k="key-2"]'); await click('[data-k="check"]'); s = await st();
    is(s.done && sp(await note()) === sp(T(loc, 'okAddRoll', { a: 27, b: 5, c: 32 })), `[${loc} @${w}] 32 → «${await note()}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-roll-mat: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
