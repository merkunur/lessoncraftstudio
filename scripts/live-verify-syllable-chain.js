#!/usr/bin/env node
/* =====================================================================
   live-verify-syllable-chain.js — drives La catena delle sillabe ON
   PRODUCTION (it only): the real activity page, real pointer. Catene
   corte: pal·la — the trick picture sca·la tapped twice → it will not
   close (miss); la·ma DRAGGED onto the open clasp → it closes; ma·no →
   the chain is closed. Catene lunghe: stel·la → la·ma → ma·ti·ta →
   ta·vo·lo by tap-tap. Conta e forma: ca·ne — one socket → Conta → the
   last crammed (miss); + → Conta → tiles; ca, ne → right. The wrapper
   version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-syllable-chain.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '049-syllable-chain', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'syllable-chain-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/it/activities/${ROW.slug.it}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[it @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="syllable-chain-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[it @${w}] the page embeds syllable-chain-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[it @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.SyllableChainActivity && window.SyllableChainActivity.st && document.querySelector('.scn-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.SyllableChainActivity; a.OK_MS = 60000; a.FAST = true; Object.assign(a.api.settings, { lure: 'yes', labels: 'after' }); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(300); return true; };
    const twice = async (k) => { await tap(`.scn-card[data-id="${k}"]`); await tap(`.scn-card[data-id="${k}"]`); };
    const st = () => frame.evaluate(() => { const s = window.SyllableChainActivity.st; return JSON.parse(JSON.stringify({ chain: s.chain, misses: s.misses, done: s.done, last: s.last, phase: s.phase })); });

    /* Catene corte: palla */
    await force('short', 'short-palla-0');
    await twice('scala'); let s = await st();
    is(s.misses === 1 && s.last.result === 'lure' && s.chain.length === 1, `[it @${w}] sca·la will not close — it ENDS with «la» (miss)`);
    await wait(400);
    await toView('.scn-stage'); const a = await ctrOf('.scn-card[data-id="lama"]'), b = await ctrOf('.scn-open');
    await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await page.mouse.up(); await wait(400);
    s = await st(); is(s.chain.join() === 'palla,lama', `[it @${w}] la·ma dragged onto the clasp — it closes`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-it-${w}-mid.png`) });
    await twice('mano'); s = await st(); is(s.done && s.chain.join() === 'palla,lama,mano', `[it @${w}] ma·no — the chain is closed`);

    /* Catene lunghe: stella */
    await force('long', 'long-stella-7');
    for (const k of ['lama', 'matita', 'tavolo']) await twice(k);
    s = await st(); is(s.done && s.chain.join() === 'stella,lama,matita,tavolo', `[it @${w}] stel·la → la·ma → ma·ti·ta → ta·vo·lo`);

    /* Conta e forma: cane */
    await force('build', 'build-cane');
    await tap('.scn-check'); s = await st();
    is(s.misses === 1 && s.last.result === 'short' && (await frame.evaluate(() => (document.querySelector('.scn-sock.is-crammed') || {}).textContent)) === 'ca·ne', `[it @${w}] one socket — ca·ne crammed (miss)`);
    await tap('.scn-more'); await tap('.scn-check'); s = await st(); is(s.phase === 'build', `[it @${w}] two sockets — the tiles come`);
    await tap('.scn-tile[data-id="t0"]'); await tap('.scn-tile[data-id="t1"]'); await tap('.scn-check'); s = await st();
    is(s.done && (await frame.evaluate(() => (document.querySelector('.scn-bigword') || {}).textContent)) === 'cane', `[it @${w}] ca + ne = cane`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[it @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-it-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-syllable-chain: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
