#!/usr/bin/env node
/* =====================================================================
   live-verify-picture-bingo.js — drives Bingo's Picture Card ON
   PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. A look-alike card: Check with no chip asks
   (no miss); a chip on a look-alike slides off (miss) and its differing
   letters light; the chip on the right word flips it into its picture and
   the success text is filled. You call: a decoy card is covered (miss),
   the right card is BINGO. The wrapper version is the one in page.tsx;
   the iframe grows with the card; every locale's page returns 200.
   Usage: node scripts/live-verify-picture-bingo.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '062-picture-bingo', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'bingo-word-hunt-activities.json'), 'utf8')).find(r => r.id === 'bingo-word-hunt.read-match.rf-k-3-d');
const C = require(path.join(MT, 'picture-bingo-core.js'));
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
    const frameEl = await page.waitForSelector('iframe[src*="picture-bingo-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds picture-bingo-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.PictureBingoActivity && window.PictureBingoActivity.st && document.querySelector('.pbg-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(200); };
    const check = async () => { await tap('[data-k="check"]'); await frame.waitForFunction(() => !window.PictureBingoActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(250); };
    const st = () => frame.evaluate(() => { const s = window.PictureBingoActivity.st; return JSON.parse(JSON.stringify({ chip: s.chip, misses: s.misses, done: s.done, last: s.last, flipped: s.cs ? s.cs.flipped : null, covered: s.covered, bingo: s.bingo })); });
    const force = (lv, id) => frame.evaluate((lv, id) => { const a = window.PictureBingoActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; a._cards = {}; a._deal = null; window.LCS_reloadFirstTask(); }, lv, id);
    const sq = (i) => `.pbg-sq[data-sq="${i}"]`;

    /* a look-alike card */
    const r = C.rounds(loc, 'look')[0];
    await force('look', r.id); await wait(800);
    await check(); let s = await st();
    is(s.misses === 0 && s.chip === null, `[${loc} @${w}] Check with no chip asks (no miss)`);
    const wrong = r.card.sq.find(x => x.i !== r.sq && C.near(x.word, r.word)) || r.card.sq.find(x => x.i !== r.sq);
    await tap(sq(wrong.i)); await check(); s = await st();
    const lit = await frame.evaluate((i) => document.querySelectorAll(`.pbg-sq[data-sq="${i}"] .is-diff`).length, wrong.i);
    is(s.misses === 1 && lit > 0, `[${loc} @${w}] «${wrong.word}» slides off → miss 1, ${lit} letters lit`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap(sq(r.sq));
    await frame.evaluate(() => { window.PictureBingoActivity.OK_MS = 0; });
    await check(); await wait(500); s = await st();
    is(s.done && s.flipped.includes(r.sq), `[${loc} @${w}] «${r.word}» flips into its picture`);
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(r.word), `[${loc} @${w}] the success text is filled («${bubble}»)`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });

    /* You call */
    const y = C.rounds(loc, 'call')[0];
    await force('call', y.id); await wait(800);
    const dec = y.decoys[0].word;
    await tap(`.pbg-wcard[data-word="${dec}"]`); await check(); s = await st();
    is(s.misses === 1 && s.last.result === 'decoy', `[${loc} @${w}] «${dec}» → Bingo covers the decoy (miss)`);
    await tap(`.pbg-wcard[data-word="${y.need}"]`); await check(); s = await st();
    is(s.done && s.bingo, `[${loc} @${w}] «${y.need}» → BINGO`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-call.png`) });
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-picture-bingo: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
