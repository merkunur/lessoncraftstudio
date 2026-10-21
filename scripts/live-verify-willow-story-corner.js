#!/usr/bin/env node
/* =====================================================================
   live-verify-willow-story-corner.js — drives The Story Zipper (Willow's
   Story Corner) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the real activity page, real pointer. A tale tooth: put in the
   wrong place and pulled → the zipper jams with the hint (a miss); put in
   the right place and pulled → it closes with the success sentence. The
   last tooth of an animal zipper: the right place → the whole zipper zips
   shut. The wrapper version is the one in page.tsx; the iframe grows with
   the card; every locale's page returns 200.
   Usage: node scripts/live-verify-willow-story-corner.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '068-story-zipper', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'willow-story-corner-activities.json'), 'utf8')).find(r => r.id === 'willow-story-corner.compare-tales.rl-k-9');
const C = require(path.join(MT, 'story-zipper-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, StoryZipperCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'willow-story-corner-activity.js'), 'utf8') + ';this.__A = WillowStoryCornerActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
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
    const frameEl = await page.waitForSelector('iframe[src*="willow-story-corner-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds willow-story-corner-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.WillowStoryCornerActivity && window.WillowStoryCornerActivity.st && window.StoryZipperCore && document.querySelector('.sz-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); await frame.waitForFunction(() => !window.WillowStoryCornerActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(150); };
    const st = () => frame.evaluate(() => { const s = window.WillowStoryCornerActivity.st; return JSON.parse(JSON.stringify({ spot: s.spot, misses: s.misses, done: s.done })); });
    const note = () => frame.evaluate(() => document.querySelector('.sz-note').textContent);
    const force = (kind, r) => frame.evaluate((kind, r) => { const a = window.WillowStoryCornerActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.compare = kind; a.api.settings.listen = 'tap'; a._plan = [r]; a._planKey = a._key(); a._pass = 0; a._order = null; window.LCS_reloadFirstTask(); }, kind, r);
    const bubbleHas = async (text) => { await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {}); const b = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; }); return b && !/\{\w+\}/.test(b) && sp(b).includes(sp(text)); };
    /* a tale tooth: wrong place → jam; right place → closes */
    const r = C.plan('tales', C.seeded('live' + loc), 0, null).find(x => x.pair === 'fb' && x.dim === 'help');
    await force('tales', r); await wait(800);
    const wrong = r.spot === 'mid' ? 'pocket' : 'mid';
    await tap(`[data-spot="${wrong}"]`); await tap('.sz-check'); let s = await st();
    const hk = (wrong === 'mid' ? 'hintBoth' : 'hintPocket');
    is(s.misses === 1 && sp(await note()) === sp(STR[hk][loc]), `[${loc} @${w}] the tooth in ${wrong} jams — the hint, a miss`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-jam.png`) });
    await frame.evaluate(() => { window.WillowStoryCornerActivity.OK_MS = 0; });
    await tap(`[data-spot="${r.spot}"]`); await tap('.sz-slider'); await wait(500); s = await st();
    is(s.done, `[${loc} @${w}] the tooth in ${r.spot}, the slider pulled — it closes`);
    is(await bubbleHas(C.DATA.TEXT[loc].ok['fb.help']), `[${loc} @${w}] the success sentence`);
    /* the last tooth of an animal zipper zips the whole zipper */
    const pa = C.plan('animals', C.seeded('live' + loc), 0, null), last = pa.find(x => x.last);
    await force('animals', last); await wait(800);
    await frame.evaluate(() => { window.WillowStoryCornerActivity.OK_MS = 0; });
    await tap(`[data-spot="${last.spot}"]`); await tap('.sz-check'); await wait(900);
    const z = await frame.evaluate(() => document.querySelector('.sz-wrap').classList.contains('is-zipped'));
    is(z && await bubbleHas(STR.okZip[loc]), `[${loc} @${w}] the fifth tooth closes — the whole zipper zips shut`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-zipped.png`) });
    await wait(3000);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-willow-story-corner: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
