#!/usr/bin/env node
/* =====================================================================
   live-verify-picture-story.js — drives The Bookmark (Fable's Picture
   Stories) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390):
   the real activity page, real pointer. Ask the book: Check with no mark
   asks (no miss); a wrong phrase is a miss and the answer line shows it;
   the bookmark on the answering phrase wins, the success text is filled.
   Caption the pages: a wrong page is a miss; every sentence into its page
   wins. The wrapper version is the one in page.tsx; the iframe grows with
   the card; every locale's page returns 200.
   Usage: node scripts/live-verify-picture-story.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '063-bookmark', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'picture-story-activities.json'), 'utf8')).find(r => r.id === 'picture-story.read.rl-k-1');
const C = require(path.join(MT, 'picture-story-core.js'));
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
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
    const frameEl = await page.waitForSelector('iframe[src*="picture-story-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds picture-story-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.PictureStoryActivity && window.PictureStoryActivity.st && document.querySelector('.pst-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rs = e.getClientRects(), rr = rs[0] || e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(200); };
    const check = async () => { await tap('[data-k="check"]'); await frame.waitForFunction(() => !window.PictureStoryActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(250); };
    const st = () => frame.evaluate(() => { const s = window.PictureStoryActivity.st; return JSON.parse(JSON.stringify({ mark: s.mark, misses: s.misses, done: s.done, last: s.last, k: s.k, order: s.order })); });
    const force = (mode, id) => frame.evaluate((mode, id) => { const a = window.PictureStoryActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.mode = mode; a.api.settings.pages = '3'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, mode, id);
    const goPage = async (p) => { if (w >= 560) return; for (let i = 0; i < 4; i++) { const cur = await frame.evaluate(() => +document.querySelector('.pst-page').getAttribute('data-p')); if (cur === p) return; await tap(cur < p ? '[data-k="next"]' : '[data-k="prev"]'); } };

    /* Ask the book: "Where did the mitten slip off?" */
    const r = C.askRounds(loc, 3).find(x => x.key === 'mWhere'), bk = C.book(loc, r.story, 3);
    await force('ask', r.id); await wait(800);
    await check(); let s = await st();
    is(s.misses === 0 && s.mark === null, `[${loc} @${w}] Check with no mark asks (no miss)`);
    const wrong = C.targets(bk).find(t => t.kind === 'phrase' && !C.right(r, t));
    await goPage(wrong.page); await tap(`[data-tid="${wrong.id}"]`); await check(); s = await st();
    const shown = await frame.evaluate(() => (document.querySelector('.pst-ans .pst-anstext') || {}).textContent || '');
    is(s.misses === 1 && shown === wrong.text, `[${loc} @${w}] «${wrong.text}» is a miss, the answer line shows it`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    const right = C.rightTargets(r, bk).find(x => x[0] === 'f');
    await goPage(r.page); await tap(`[data-tid="${right}"]`);
    await frame.evaluate(() => { window.PictureStoryActivity.OK_MS = 0; });
    await check(); await wait(500); s = await st();
    is(s.done, `[${loc} @${w}] the bookmark on the answer wins`);
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(r.answer), `[${loc} @${w}] the success text is filled («${bubble}»)`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });

    /* Caption the pages */
    const c = C.capRounds(loc, 3).find(x => x.story === 'pig');
    await force('caption', c.id); await wait(800);
    s = await st();
    const wp = s.order[0] === 1 ? 2 : 1;
    await goPage(wp); await tap(`[data-tid="p${wp}"]`); await check(); s = await st();
    is(s.misses === 1 && s.k === 0, `[${loc} @${w}] Caption: page ${wp} is the wrong page — a miss`);
    for (let k = 0; k < 3; k++) { const p = s.order[k]; await goPage(p); await tap(`[data-tid="p${p}"]`); if (k === 2) await frame.evaluate(() => { window.PictureStoryActivity.OK_MS = 0; }); await check(); }
    s = await st(); is(s.done, `[${loc} @${w}] Caption: every sentence in its page`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-caption.png`) });
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-picture-story: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
