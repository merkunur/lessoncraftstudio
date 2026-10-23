#!/usr/bin/env node
/* =====================================================================
   live-verify-story-film.js — drives Vet's Diagnosis Window (The Story
   Film) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the
   real activity page, real pointer. The geese, 12 − ? = 8: the two numbers
   go on their frames, the change frame is marked "?", a dial of 6 lands
   two empty sockets in the last frame, a dial of 4 heals the patient. Every locale's page returns 200, the wrapper
   version is page.tsx's, the pictures load, the iframe grows with the card.
   Usage: node scripts/live-verify-story-film.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '082-story-film', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = (() => { const j = JSON.parse(fs.readFileSync(path.join(MT, 'vet-diagnosis-activities.json'), 'utf8')); return (Array.isArray(j) ? j : j.activities).find(r => r.id === 'vet-diagnosis.word-problems.1-oa-a-1'); })();
const C = require(path.join(MT, 'story-film-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, StoryFilmCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'story-film-activity.js'), 'utf8') + ';this.__A = StoryFilmActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
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
    const frameEl = await page.waitForSelector('iframe[src*="story-film-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds story-film-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.StoryFilmActivity && window.StoryFilmActivity.st && document.querySelector('.sf-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.StoryFilmActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.stories = 'w20'; a.api.settings.read = 'off'; a._pool = null; a._ensurePool(); a._start(4, [0, 1, 2]); a._render2(); });
    await frame.waitForFunction(() => { const im = [...document.querySelectorAll('.sf-wrap img.sf-pic')]; return im.length >= 2 && im.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 20000 }).catch(() => {});
    is(await frame.evaluate(() => { const im = [...document.querySelectorAll('.sf-wrap img.sf-pic')]; return im.length >= 2 && im.every(x => x.naturalWidth > 0); }), `[${loc} @${w}] the pictures load`);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const ok = await frame.evaluate((s) => !!document.querySelector(s), sel); if (!ok) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; }
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(450);
    };
    const st = () => frame.evaluate(() => { const s = window.StoryFilmActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, dial: s.dial, mystery: s.mystery }; });
    const note = () => frame.evaluate(() => document.querySelector('.sf-note').textContent);
    await click('[data-k="tile-t0"]'); await click('.sf-frame[data-role="start"]'); await click('[data-k="tile-t1"]'); await click('.sf-frame[data-role="result"]'); await click('.sf-frame[data-role="change"]');
    let s = await st(); is(s.mystery === 'change' && s.dial === 1, `[${loc} @${w}] the change frame is marked "?"`);
    for (let k = 0; k < 5; k++) await click('[data-k="plus"]');
    await click('[data-k="diag"]'); s = await st();
    is(s.misses === 1 && (await frame.evaluate(() => document.querySelectorAll('.sf-frame[data-role="result"] .sf-sock.is-gap').length)) === 2, `[${loc} @${w}] a dial of 6 leaves 2 empty sockets in the last frame`);
    await click('[data-k="minus"]'); await click('[data-k="minus"]'); await click('[data-k="diag"]'); s = await st();
    const msg = sp(await note()), want = sp(C.equation(loc, C.round('w20', 4)));
    is(s.done && msg === want && (await frame.evaluate(() => document.querySelectorAll('.sf-pic.is-healed').length)) === 1, `[${loc} @${w}] 4 heals the patient: «${msg}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-story-film: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
