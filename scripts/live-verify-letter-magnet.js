#!/usr/bin/env node
/* =====================================================================
   live-verify-letter-magnet.js — drives The Letter Magnet ON PRODUCTION in
   en, de, sv and fi (desktop 1366 + phone 390): the real activity page,
   real pointer. One hook: the switch with nothing under the magnet asks (no
   miss); a wrong picture DRAGGED under it → it stays down (miss); the right
   one dragged → right. Two magnets: every picture tapped and placed (tap the
   card, tap the zone) → right, the name strips unroll.
   The wrapper version is the one in page.tsx; the iframe grows with the
   card; every locale's page returns 200.
   Usage: node scripts/live-verify-letter-magnet.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '059-letter-magnet', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8')).find(r => r.id === 'choice-board.beginning-sound.rf-k-3-a');
const C = require(path.join(MT, 'letter-magnet-core.js'));
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
    const frameEl = await page.waitForSelector('iframe[src*="letter-magnet-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds letter-magnet-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.LetterMagnetActivity && window.LetterMagnetActivity.st && document.querySelector('.lmg-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); };
    const drag = async (from, to) => { await toView('.lmg-wrap'); const a = await ctrOf(from), b = await ctrOf(to); if (!a || !b) throw new Error('nothing to drag: ' + from + ' → ' + to); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 14; k++) { await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14); await wait(15); } await page.mouse.up(); await wait(400); };
    const flip = async () => { await tap('.lmg-check'); await frame.waitForFunction(() => !window.LetterMagnetActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.LetterMagnetActivity.st; return JSON.parse(JSON.stringify({ zone: s.zone, hung: s.hung, misses: s.misses, done: s.done, last: s.last })); });
    const force = (lv, id) => frame.evaluate((lv, id) => { const a = window.LetterMagnetActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id);

    /* one hook */
    const r = C.rounds(loc, 'one')[0], right = r.cards.findIndex(c => c.belongs === 0), wrong = r.cards.findIndex(c => c.belongs < 0);
    await force('one', r.id); await wait(900);
    await flip(); let s = await st(); is(s.misses === 0 && s.last && s.last.result === 'empty', `[${loc} @${w}] the switch with nothing under the magnet asks (no miss)`);
    await drag(`[data-k="card${wrong}"]`, '.lmg-zone'); s = await st(); is(s.zone[0].includes(wrong), `[${loc} @${w}] «${r.cards[wrong].word}» dragged under the magnet`);
    await flip(); s = await st(); is(s.misses === 1 && s.last && s.last.result === 'stayed', `[${loc} @${w}] «${r.cards[wrong].word}» stays down (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await drag(`[data-k="card${right}"]`, '.lmg-zone'); await flip(); s = await st();
    is(s.done && s.hung[0].includes(right), `[${loc} @${w}] «${r.cards[right].word}» flies onto the hook → right`);
    /* two magnets: tap the card, tap the zone */
    const r2 = C.rounds(loc, 'two')[0];
    await force('two', r2.id); await wait(900);
    for (let ci = 0; ci < r2.cards.length; ci++) { await tap(`[data-k="card${ci}"]`); await tap(`[data-zone="${r2.cards[ci].belongs}"]`); }
    s = await st(); is(s.zone.every((z, m) => z.length === r2.cards.filter(c => c.belongs === m).length), `[${loc} @${w}] every picture placed by tapping`);
    await flip(); s = await st(); is(s.done, `[${loc} @${w}] two magnets (${r2.magnets.map(m => m.label).join(' / ')}) → right`);
    await wait(800);
    is(await frame.evaluate(() => document.querySelectorAll('.lmg-name').length) === r2.cards.length, `[${loc} @${w}] the name strips unroll`);
    await frame.evaluate(() => { const a = window.LetterMagnetActivity; a.OK_MS = 0; a._win(); });
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(r2.cards.find(c => c.belongs === 0).word), `[${loc} @${w}] the success text is filled («${bubble}»)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-letter-magnet: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
