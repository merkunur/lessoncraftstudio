#!/usr/bin/env node
/* =====================================================================
   live-verify-kite-tail.js — drives The Kite Tail ON PRODUCTION (en only):
   the real activity page, real pointer. How many bows: butterfly with one
   bow TAPPED on (two bows) → the kite spins (miss); one more → steady.
   Tie the word: carrot's bows DRAGGED on in reverse → the tail knots
   (miss); untied and tapped in order → steady. The kite fence: the panda
   card DRAGGED onto the one-bow kite (miss), then the two-bow kite → fits.
   The wrapper version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-kite-tail.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '045-kite-tail', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'kite-tail-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/en/activities/${ROW.slug.en}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[en @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="kite-tail-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[en @${w}] the page embeds kite-tail-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[en @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.KiteTailActivity && window.KiteTailActivity.st && document.querySelector('.kt-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.KiteTailActivity; a.OK_MS = 60000; a.FAST = true; Object.assign(a.api.settings, { bows: 'pick', kites: '123', cards: 'pictures' }); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(220); return true; };
    const drag = async (from, to) => { await toView('.kt-wrap'); const a = await ctrOf(from), b = await ctrOf(to); if (!a || !b) return false; await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await page.mouse.up(); await wait(300); return true; };
    const st = () => frame.evaluate(() => { const s = window.KiteTailActivity.st; return JSON.parse(JSON.stringify({ bows: s.bows, knots: s.knots, bowsAll: s.bowsAll, misses: s.misses, done: s.done, last: s.last, r: s.r })); });

    /* How many bows: butterfly */
    await force('count', 'count-butterfly');
    await tap('.kt-spare'); await tap('.kt-check'); let s = await st();
    is(s.bows === 2 && s.misses === 1 && s.last.result === 'spin', `[en @${w}] butterfly on two bows — the kite spins (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-en-${w}-spin.png`) });
    await tap('.kt-spare'); await tap('.kt-check'); s = await st();
    is(s.done, `[en @${w}] three bows — steady`);

    /* Tie the word: carrot */
    await force('tie', 'tie-carrot'); s = await st();
    const word = s.bowsAll.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.id), n = word.length;
    for (let i = 0; i < n; i++) await drag(`.kt-boxbow[data-id="${word[n - 1 - i]}"]`, `.kt-tail .kt-knot[data-k="${i}"]`);
    await tap('.kt-check'); s = await st();
    is(s.misses === 1 && s.last.result === 'tangle', `[en @${w}] rot + car — the tail knots (miss)`);
    for (let i = 0; i < n; i++) await tap(`.kt-tail .kt-knot[data-k="${i}"]`);
    for (const id of word) await tap(`.kt-boxbow[data-id="${id}"]`);
    await tap('.kt-check'); s = await st();
    is(s.done, `[en @${w}] car + rot = carrot — steady`);

    /* The kite fence: panda */
    await force('fence', 'fence-panda'); s = await st();
    const right = s.r.kites.indexOf(2), wrong = s.r.kites.indexOf(1);
    await drag('.kt-card', `.kt-fkite[data-kite="${wrong}"]`); s = await st();
    is(s.misses === 1 && !s.done, `[en @${w}] panda on the one-bow kite — too few bows (miss)`);
    await drag('.kt-card', `.kt-fkite[data-kite="${right}"]`); s = await st();
    is(s.done, `[en @${w}] panda on the two-bow kite — fits`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[en @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-en-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-kite-tail: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
