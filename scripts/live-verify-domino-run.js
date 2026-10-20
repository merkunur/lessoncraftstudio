#!/usr/bin/env node
/* =====================================================================
   live-verify-domino-run.js — drives La fila de fichas ON PRODUCTION (es
   only): the real activity page, real pointer. Completa: ma·ri·_·sa —
   "ma" tapped onto the gap → it falls into the row and bounces back
   (miss); "po" → right, the fallen tiles close up into mariposa. Ordena:
   pa·ra·guas — "ra" alone → the run stops (no miss); the right order →
   right. ¿Cuántas fichas?: tigre — one blank → the last tile carries
   ti·gre (miss); two → right. The wrapper version is the one in
   page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-domino-run.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '050-domino-run', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'domino-run-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/es/activities/${ROW.slug.es}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[es @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="domino-run-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[es @${w}] the page embeds domino-run-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[es @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.DominoRunActivity && window.DominoRunActivity.st && document.querySelector('.drn-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.DominoRunActivity; a.OK_MS = 60000; a.FAST = true; Object.assign(a.api.settings, { decoy: 'no', letters: 'lower' }); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(300); return true; };
    const push = async () => { await tap('.drn-check'); await frame.waitForFunction(() => !window.DominoRunActivity._busy || window.DominoRunActivity.st.done, { timeout: 8000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.DominoRunActivity.st; return JSON.parse(JSON.stringify({ marks: s.marks, box: s.box, blanks: s.blanks, misses: s.misses, done: s.done, last: s.last })); });

    /* Completa: mariposa */
    await force('complete', 'complete-mariposa');
    await tap('.drn-loose[data-id="b"]'); await push(); let s = await st();
    is(s.misses === 1 && s.last.result === 'same' && s.box.includes('b'), `[es @${w}] «ma» on the gap falls into the row and bounces back (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-es-${w}-miss.png`) });
    await tap('.drn-loose[data-id="a"]'); await push(); s = await st();
    await frame.waitForFunction(() => !!document.querySelector('.drn-word'), { timeout: 5000 }).catch(() => {});
    is(s.done && (await frame.evaluate(() => (document.querySelector('.drn-word') || {}).textContent)) === 'mariposa', `[es @${w}] «po» — the tiles close up into mariposa`);

    /* Ordena: paraguas */
    await force('order', 'order-paraguas');
    await tap('.drn-loose[data-id="d1"]'); await push(); s = await st();
    is(s.misses === 0 && s.last.result === 'stop', `[es @${w}] «ra» alone — the run stops (no miss)`);
    await tap('.drn-dom[data-id="d1"]'); for (const id of ['d0', 'd1', 'd2']) await tap(`.drn-loose[data-id="${id}"]`);
    await push(); s = await st(); is(s.done, `[es @${w}] pa + ra + guas — right`);

    /* ¿Cuántas fichas?: tigre */
    await force('count', 'count-tigre');
    await tap('.drn-loose'); await push(); s = await st();
    is(s.misses === 1 && s.last.result === 'short' && JSON.stringify(s.last.printed) === '[["ti","gre"]]', `[es @${w}] one blank — it carries ti·gre (miss)`);
    await tap('.drn-loose'); await push(); s = await st(); is(s.done, `[es @${w}] two blanks — right`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[es @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-es-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-domino-run: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
