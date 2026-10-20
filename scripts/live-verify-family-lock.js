#!/usr/bin/env node
/* =====================================================================
   live-verify-family-lock.js — drives O cadeado das famílias ON
   PRODUCTION (pt only): the real activity page, real pointer. Duas
   sílabas: gato — Check untouched asks (no miss); one nub click on a
   wheel → Check → miss (pins on right wheels); the gold nubs after miss
   2 finish it → the lock opens, the plate reads gato, a key on the
   keyring. Monte o cadeado: tigre — the right wheels tapped in order →
   opens. The wrapper version is the one in page.tsx; the iframe grows
   with the card.
   Usage: node scripts/live-verify-family-lock.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '051-family-lock', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'family-lock-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/pt/activities/${ROW.slug.pt}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[pt @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="family-lock-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[pt @${w}] the page embeds family-lock-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[pt @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.FamilyLockActivity && window.FamilyLockActivity.st && document.querySelector('.flk-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.FamilyLockActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.notch = 'after'; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { y: r.top + r.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const check = async () => { await tap('.flk-check'); await frame.waitForFunction(() => !window.FamilyLockActivity._busy, { timeout: 8000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.FamilyLockActivity.st; return JSON.parse(JSON.stringify({ wheels: s.wheels.map(w => ({ idx: w.idx, answer: w.answer, len: (w.faces || []).length })), misses: s.misses, done: s.done, pinned: s.pinned, last: s.last })); });
    const plate = () => frame.evaluate(() => document.querySelector('.flk-read').textContent);

    /* Duas sílabas: gato */
    await force('two', 'two-gato');
    await check(); let s = await st(); is(s.misses === 0 && s.last && s.last.result === 'empty', `[pt @${w}] Check untouched asks (no miss)`);
    await tap('.flk-nub.is-dn[data-q="0"]'); await check(); s = await st();
    is(s.misses === 1 && !s.done && JSON.stringify(s.pinned) === JSON.stringify(s.wheels.map((x, q) => x.idx === x.answer ? q : -1).filter(q => q >= 0)), `[pt @${w}] a nub click, Check → miss 1, pins on the right wheels`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-pt-${w}-miss.png`) });
    for (let g = 0; g < 12; g++) { s = await st(); const q = s.wheels.findIndex(x => x.idx !== x.answer); if (q < 0) break; const x = s.wheels[q]; await tap(`.flk-nub.${((x.answer - x.idx + x.len) % x.len) <= x.len / 2 ? 'is-dn' : 'is-up'}[data-q="${q}"]`); }
    await check(); await frame.waitForFunction(() => !!document.querySelector('.flk-plate.is-word'), { timeout: 6000 }).catch(() => {});
    s = await st(); is(s.done && (await plate()) === 'gato' && (await frame.evaluate(() => [...document.querySelectorAll('.flk-key .flk-shaft')].map(e => e.textContent))).includes('gato'), `[pt @${w}] the lock opens: the plate reads gato, a key on the keyring`);

    /* Monte o cadeado: tigre */
    await force('build', 'build-tigre');
    await tap('.flk-tray .flk-lw[data-id="w0"]'); await tap('.flk-tray .flk-lw[data-id="w1"]');
    await check(); await frame.waitForFunction(() => !!document.querySelector('.flk-plate.is-word'), { timeout: 6000 }).catch(() => {});
    s = await st(); is(s.done && (await plate()) === 'tigre', `[pt @${w}] ti + gre tapped into the sockets — the lock opens on tigre`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[pt @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-pt-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-family-lock: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
