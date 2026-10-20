#!/usr/bin/env node
/* =====================================================================
   live-verify-lid-boxes.js — drives the Pop-Up Sound Boxes ON PRODUCTION
   in en, de, sv and fi (desktop 1366 + phone 390): the real activity page,
   real pointer. Task 1, the first round of First sound in each locale:
   Check with nothing on the boxes asks (no miss); the distractor that
   shares a sound elsewhere DRAGGED onto the boxes → its lids pop where the
   lid test says, the asked box stays shut (miss); the answer dragged on →
   right, the pair on the shelf. Then Task 2 (a wrong box opens every lid,
   the right box wins) and Task 3 (all sorted). The wrapper version is the
   one in page.tsx; the iframe grows with the card; every locale's page
   returns 200.
   Usage: node scripts/live-verify-lid-boxes.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '055-lid-boxes', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'sound-boxes-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'lid-boxes-core.js'));
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
    const frameEl = await page.waitForSelector('iframe[src*="lid-boxes-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds lid-boxes-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.LidBoxesActivity && window.LidBoxesActivity.st && document.querySelector('.lbx-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const drag = async (from, to) => { await toView(from); const a = await ctrOf(from), b = await ctrOf(to); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 12; k++) { await page.mouse.move(a.x + (b.x - a.x) * k / 12, a.y + (b.y - a.y) * k / 12); await wait(15); } await page.mouse.up(); await wait(300); };
    const check = async () => { await tap('.lbx-check'); await frame.waitForFunction(() => !window.LidBoxesActivity._busy, { timeout: 8000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.LidBoxesActivity.st; return JSON.parse(JSON.stringify({ test: s.test, layout: s.layout, misses: s.misses, done: s.done, chosen: s.chosen, bins: s.bins, order: s.order })); });
    const force = (task, pos, id) => frame.evaluate((task, pos, id) => { const a = window.LidBoxesActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.task = task; if (pos) a.api.settings.pos = pos; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, task, pos, id);

    /* Task 1 */
    const R = C.rounds(loc, 'same', 'first'), r = R.find(x => x.cands.some(c => c.role !== 'answer' && C.lidTest(x.target, c.w).some(p => p.i !== 0 && p.same))) || R[0];
    await force('same', 'first', r.id); await wait(900);
    await check(); let s = await st(); is(s.misses === 0, `[${loc} @${w}] Check with nothing on the boxes asks (no miss)`);
    const d = r.cands.find(c => c.role !== 'answer' && C.lidTest(r.target, c.w).some(p => p.i !== 0 && p.same)) || r.cands[1];
    const want = C.lidTest(r.target, d.w).filter(p => p.same).length;
    const slot = s.layout.indexOf(r.cands.indexOf(d));
    await drag(`.lbx-pic.is-cand[data-i="${slot}"]`, '.lbx-test'); s = await st(); is(s.test === slot, `[${loc} @${w}] «${d.w.word}» dragged onto the boxes`);
    await check(); s = await st();
    const pop = await frame.evaluate(() => ({ t: document.querySelectorAll('.lbx-row.is-target .lbx-box.is-pop').length, asked: document.querySelector('.lbx-row.is-target .lbx-box.is-asked').classList.contains('is-pop') }));
    is(s.misses === 1 && pop.t === want && !pop.asked, `[${loc} @${w}] «${d.w.word}» on «${r.target.word}»: ${want} lid(s) pop, the first box stays shut`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    const aslot = s.layout.indexOf(0);
    await drag(`.lbx-pic.is-cand[data-i="${aslot}"]`, '.lbx-test'); await check(); s = await st();
    is(s.done && (await frame.evaluate(() => document.querySelectorAll('.lbx-token').length)) >= 1, `[${loc} @${w}] «${r.cands[0].w.word}» — right, the pair on the shelf`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    /* Task 2 */
    const wr = C.rounds(loc, 'where')[0]; await force('where', null, wr.id); await wait(700);
    await tap(`.lbx-box[data-k="box${(wr.answer + 1) % wr.target.boxes.length}"]`); await check(); s = await st();
    is(s.misses === 1 && (await frame.evaluate(() => document.querySelectorAll('.lbx-row.is-where .lbx-box.is-open').length)) === wr.target.boxes.length, `[${loc} @${w}] Task 2: a wrong box opens every lid`);
    await tap(`.lbx-box[data-k="box${wr.answer}"]`); await check(); s = await st(); is(s.done, `[${loc} @${w}] Task 2: «${wr.card}» in «${wr.target.word}» — the right box`);
    /* Task 3 */
    const sr = C.rounds(loc, 'sort')[0]; await force('sort', null, sr.id); await wait(700); s = await st();
    for (const i of s.order) { await tap(`.lbx-pic[data-k="item${i}"]`); await tap(`.lbx-blabel[data-k="bin-${sr.items[i].yes ? 'yes' : 'no'}"]`); }
    await check(); s = await st(); is(s.done, `[${loc} @${w}] Task 3: all eight sorted`);
    await wait(600);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-lid-boxes: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
