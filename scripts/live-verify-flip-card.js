#!/usr/bin/env node
/* =====================================================================
   live-verify-flip-card.js — drives Pepper's Flip Card ON PRODUCTION in
   en, de, sv and fi (desktop 1366 + phone 390): the real activity page,
   real pointer. First sound: Check with no picture asks (no miss); the
   "nearly" picture tapped → the card shows the real new word (miss); the
   answer → right. Swap: a wrong tile DRAGGED onto the card → the card
   flips to exactly the word its tiles make; the goal's tile dragged on →
   right. The wrapper version is the one in page.tsx; the iframe grows with
   the card; every locale's page returns 200.
   Usage: node scripts/live-verify-flip-card.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '056-flip-card', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'pepper-sound-swap-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'flip-card-core.js'));
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
    const frameEl = await page.waitForSelector('iframe[src*="flip-card-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds flip-card-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.FlipCardActivity && window.FlipCardActivity.st && document.querySelector('.fcd-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const drag = async (from, to) => { await toView(to); const a = await ctrOf(from), b = await ctrOf(to); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 12; k++) { await page.mouse.move(a.x + (b.x - a.x) * k / 12, a.y + (b.y - a.y) * k / 12); await wait(15); } await page.mouse.up(); await wait(400); };
    const check = async () => { await tap('.fcd-check'); await frame.waitForFunction(() => !window.FlipCardActivity._busy, { timeout: 8000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.FlipCardActivity.st; return JSON.parse(JSON.stringify({ layout: s.layout, trayOrder: s.trayOrder, card: s.card, misses: s.misses, done: s.done, last: s.last })); });
    const force = (lv, id) => frame.evaluate((lv, id) => { const a = window.FlipCardActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id);
    const label = () => frame.evaluate(() => { const c = document.querySelector('.fcd-card'); return { blank: c.classList.contains('is-blank'), label: c.getAttribute('aria-label') }; });

    const r = C.rounds(loc, 'first')[0];
    await force('first', r.id); await wait(900);
    await check(); let s = await st(); is(s.misses === 0, `[${loc} @${w}] Check with no picture asks (no miss)`);
    await tap(`.fcd-choice[data-i="${s.layout.indexOf(1)}"]`); await check(); s = await st();
    is(s.misses === 1 && s.last.face && s.last.face.word === r.answer.word, `[${loc} @${w}] «${r.choices[1].word}» — the card shows «${r.answer.word}» (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap(`.fcd-choice[data-i="${s.layout.indexOf(0)}"]`); await check(); s = await st();
    is(s.done, `[${loc} @${w}] «${r.answer.word}» — right`);
    const sr = C.rounds(loc, 'swap')[0];
    await force('swap', sr.id); await wait(900); s = await st();
    const p = sr.start.keys.findIndex((k, i) => k !== sr.goal.keys[i]), tr = s.trayOrder.map(i => sr.tray[i]);
    const gi = tr.findIndex(t => t.k === sr.goal.keys[p] && t.g === sr.goal.tiles[p]), wi = tr.findIndex((t, i) => i !== gi && t.k !== sr.start.keys[p]);
    await drag(`.fcd-tile.is-tray[data-i="${wi}"]`, `.fcd-tile.is-slot[data-slot="${p}"]`); s = await st();
    const want = C.lookup(loc, C.apply(sr.start, p, tr[wi]).keys), cw = await label();
    is(s.card.tiles[p] === tr[wi].g && (want ? !cw.blank : cw.blank), `[${loc} @${w}] ${tr[wi].g} dragged in — the card flips to ${want ? want.word : 'a blank card'}`);
    await drag(`.fcd-tile.is-tray[data-i="${gi}"]`, `.fcd-tile.is-slot[data-slot="${p}"]`); await check(); s = await st();
    is(s.done, `[${loc} @${w}] the goal «${sr.goal.word}»`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(600);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-flip-card: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
