#!/usr/bin/env node
/* =====================================================================
   live-verify-question-lamp.js — drives Wren's Question Window (The
   Question Lamp) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the real activity page, real pointer. A Level-2 when-round: an empty
   Check is a hint, no miss; "who" swings the lamp onto the who card (not the
   gold one) and is a miss; "when" lights the gold card and the round is won,
   the bubble naming the word. Every locale's page returns 200, the wrapper
   version is page.tsx's, the pictures load, the iframe grows with the card.
   Usage: node scripts/live-verify-question-lamp.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '076-question-lamp', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'wren-question-window-activities.json'), 'utf8')).find(r => r.id === 'wren-question-window.question-words.l-k-1-d');
const C = require(path.join(MT, 'question-lamp-core.js'));
const STR = (() => { const vm = require('vm'); const ctx = { window: {}, QuestionLampCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'question-lamp-activity.js'), 'utf8') + ';this.__A = QuestionLampActivity;', ctx); return ctx.__A.strings; })();
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
    const frameEl = await page.waitForSelector('iframe[src*="question-lamp-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds question-lamp-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.QuestionLampActivity && window.QuestionLampActivity.st && document.querySelector('.ql-board'), { timeout: 30000 });
    const i = C.ids(loc, 'l2').find(x => { const r = C.round(loc, 'l2', x); return r.ask === 'when' && r.chunks.some(c => c.k === 'who'); }), r = C.round(loc, 'l2', i);
    const whoAt = r.chunks.findIndex(c => c.k === 'who');
    await frame.evaluate((i) => { const a = window.QuestionLampActivity; a.OK_MS = 600000; a.api.settings.level = 'l2'; a.api.settings.answer = 'keys'; a._pool = null; a._ensurePool(); a._start(i); a._render2(); }, i);
    const nPic = r.chunks.filter(c => c.pic).length;
    await frame.waitForFunction((n) => { const im = [...document.querySelectorAll('.ql-wrap img.ql-pic')]; return im.length === n && im.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 20000 }, nPic).catch(() => {});
    is(await frame.evaluate(() => { const im = [...document.querySelectorAll('.ql-wrap img.ql-pic')]; return im.length >= 2 && im.every(x => x.naturalWidth > 0); }), `[${loc} @${w}] the pictures load`);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const click = async (sel) => {
      const y0 = await frame.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return b.top + b.height / 2; }, sel);
      const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 300, behavior: 'instant' }), o0.y + y0); await wait(200);
      const o = await frameOff(); const b = await frame.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await page.mouse.click(o.x + b.x, o.y + b.y); await wait(900);
    };
    const st = () => frame.evaluate(() => { const s = window.QuestionLampActivity.st; return { misses: s.misses, done: s.done, last: s.last && s.last.reason, lamp: s.lamp }; });
    const note = () => frame.evaluate(() => document.querySelector('.ql-note').textContent);
    await click('.ql-check'); let s = await st();
    is(s.misses === 0 && sp(await note()) === sp(STR.hEmpty[loc]), `[${loc} @${w}] an empty Check: the hint, no miss`);
    await click('.ql-key[data-k="key-who"]'); await click('.ql-check'); s = await st();
    const litAt = await frame.evaluate(() => [...document.querySelectorAll('.ql-strip .ql-chunk')].findIndex(e => e.classList.contains('is-lit')));
    is(s.misses === 1 && s.lamp === whoAt && litAt === whoAt && litAt !== r.framed, `[${loc} @${w}] "who" lights the who card, not the gold one (lamp ${s.lamp}, lit ${litAt}, gold ${r.framed})`);
    await click('.ql-key[data-k="key-when"]'); await click('.ql-check'); s = await st();
    const msg = sp(await note()), form = r.keys.find(k => k.kind === 'when').form;
    is(s.done && msg.includes(form), `[${loc} @${w}] "when" lights the gold card: «${msg}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-question-lamp: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
