#!/usr/bin/env node
/* =====================================================================
   live-verify-name-tag.js — drives The Sticky Name Tag ON PRODUCTION in
   en, de, sv and fi (desktop 1366 + phone 390): the real activity page,
   real pointer. Read: Check with the tag in the tray asks (no miss); the
   tag DRAGGED onto the nearest look-alike → it peels at the first
   different letter (miss); dragged onto its picture → right. Syllables:
   the pieces tapped in order, the tag dragged onto its picture → right.
   The wrapper version is the one in page.tsx; the iframe grows with the
   card; every locale's page returns 200.
   Usage: node scripts/live-verify-name-tag.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '057-name-tag', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'name-tag-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'name-tag-core.js'));
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
    const frameEl = await page.waitForSelector('iframe[src*="name-tag-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds name-tag-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.NameTagActivity && window.NameTagActivity.st && document.querySelector('.ntg-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const drag = async (from, to) => { await toView(to); const a = await ctrOf(from), b = await ctrOf(to); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 12; k++) { await page.mouse.move(a.x + (b.x - a.x) * k / 12, a.y + (b.y - a.y) * k / 12); await wait(15); } await page.mouse.up(); await wait(400); };
    const check = async () => { await tap('.ntg-check'); await frame.waitForFunction(() => !window.NameTagActivity._busy, { timeout: 8000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.NameTagActivity.st; return JSON.parse(JSON.stringify({ layout: s.layout, hung: s.hung, built: s.built, misses: s.misses, done: s.done, last: s.last })); });
    const force = (lv, id) => frame.evaluate((lv, id) => { const a = window.NameTagActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.level = lv; a.api.settings.look = 'close'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id);

    const r = C.rounds(loc, 'read', 'close')[0];
    await force('read', r.id); await wait(900);
    await check(); let s = await st(); is(s.misses === 0, `[${loc} @${w}] Check with the tag in the tray asks (no miss)`);
    await drag('.ntg-tray .ntg-tag', `.ntg-frame[data-frame="${s.layout.indexOf(r.near)}"]`); await check(); s = await st();
    const k = C.stickTest(r.tag.letters, r.wall[r.near].letters).stuck;
    is(s.misses === 1 && s.hung[0] === -1 && s.last.stuck === k, `[${loc} @${w}] «${r.tag.word}» on «${r.wall[r.near].word}» peels after ${k} letters (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await drag('.ntg-tray .ntg-tag', `.ntg-frame[data-frame="${s.layout.indexOf(0)}"]`); await check(); s = await st();
    is(s.done, `[${loc} @${w}] «${r.tag.word}» on its picture — it sticks`);
    const sr = C.rounds(loc, 'syllables')[0];
    await force('syllables', sr.id); await wait(900); s = await st();
    for (let i = 0; i < sr.tag.parts.length; i++) await tap(`[data-k="piece${i}"]`);
    s = await st(); is(s.built.length === sr.tag.parts.length, `[${loc} @${w}] the pieces joined: ${sr.tag.parts.join('·')}`);
    await drag('.ntg-tray .ntg-tag', `.ntg-frame[data-frame="${s.layout.indexOf(0)}"]`); await check(); s = await st();
    is(s.done, `[${loc} @${w}] «${sr.tag.word}» — right`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(600);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-name-tag: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
