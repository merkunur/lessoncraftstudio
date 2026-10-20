#!/usr/bin/env node
/* =====================================================================
   live-verify-lacing-board.js — drives Snørebrettet ON PRODUCTION (no
   only): the real activity page, real pointer. Tre ordet: solsikke — the
   lace's tip DRAGGED onto "sik" → Stram! slips it out (miss); sol, sik, ke
   TAPPED → right, the word card on the rail. Lureknappen: paraply — the
   trick button threaded → it slips off (miss); pa·ra·ply → right. Hvor
   mange hull?: hund — two holes → a blank button (miss); one taken off →
   right. The wrapper version is the one in page.tsx; the iframe grows
   with the card.
   Usage: node scripts/live-verify-lacing-board.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '047-lacing-board', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'lacing-board-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/no/activities/${ROW.slug.no}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[no @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="lacing-board-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[no @${w}] the page embeds lacing-board-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[no @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.LacingBoardActivity && window.LacingBoardActivity.st && document.querySelector('.lc-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.LacingBoardActivity; a.OK_MS = 60000; a.FAST = true; Object.assign(a.api.settings, { decoys: 'one', layout: 'scatter' }); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const lace = async (id) => { await toView('.lc-board'); const a = await ctrOf('.lc-aglet'), b = await ctrOf(`.lc-btn[data-id="${id}"]`); if (!a || !b) return false; await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await page.mouse.up(); await wait(300); return true; };
    const st = () => frame.evaluate(() => { const s = window.LacingBoardActivity.st; return JSON.parse(JSON.stringify({ buttons: s.buttons, path: s.path, misses: s.misses, done: s.done, last: s.last })); });
    const word = (s) => s.buttons.filter(b => b.s !== null && b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.id);

    /* Tre ordet: solsikke */
    await force('thread', 'thread-solsikke'); let s = await st(), wd = word(s);
    await lace(wd[1]); s = await st(); is(s.path.join() === wd[1], `[no @${w}] the tip dragged onto "sik" threads it`);
    await tap('.lc-check'); s = await st();
    is(s.misses === 1 && !s.path.length && s.last.result === 'order', `[no @${w}] "sik" first — it slips out (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-no-${w}-miss.png`) });
    for (const id of wd) await tap(`.lc-btn[data-id="${id}"]`);
    await tap('.lc-check'); s = await st();
    is(s.done && (await frame.evaluate(() => (document.querySelector('.lc-word') || {}).textContent)) === 'solsikke', `[no @${w}] sol + sik + ke — right, the word on the rail`);

    /* Lureknappen: paraply */
    await force('decoy', 'decoy-paraply'); s = await st(); wd = word(s);
    const dec = s.buttons.find(b => b.s === -1);
    await tap(`.lc-btn[data-id="${dec.id}"]`); await tap('.lc-check'); s = await st();
    is(s.misses === 1 && s.last.result === 'decoy' && !s.path.length, `[no @${w}] the trick button "${dec.text}" slips off (miss)`);
    for (const id of wd) await tap(`.lc-btn[data-id="${id}"]`);
    await tap('.lc-check'); s = await st(); is(s.done, `[no @${w}] pa + ra + ply — right`);

    /* Hvor mange hull?: hund */
    await force('count', 'count-hund'); s = await st();
    await tap(`.lc-btn[data-id="${s.buttons[0].id}"]`); await tap(`.lc-btn[data-id="${s.buttons[1].id}"]`); await tap('.lc-check'); s = await st();
    is(s.misses === 1 && s.last.result === 'long' && (await frame.evaluate(() => document.querySelectorAll('.lc-btn.is-blank').length)) === 1, `[no @${w}] hund on two holes — a blank button (miss)`);
    await tap(`.lc-btn[data-id="${s.buttons[1].id}"]`); await tap('.lc-check'); s = await st();
    is(s.done, `[no @${w}] one hole — right`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[no @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-no-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-lacing-board: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
