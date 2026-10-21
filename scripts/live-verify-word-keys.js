#!/usr/bin/env node
/* =====================================================================
   live-verify-word-keys.js — drives The Word Keys ON PRODUCTION in en,
   de, sv and fi (desktop 1366 + phone 390): the real activity page, real
   pointer. Three keys: Turn with no key asks (no miss); a wrong key jams
   (miss) and its teeth glow; a tap on the lock takes it out; the right key
   opens, the success text is filled. Key ring: every key into its lock
   (on a phone through the pager) → open. Cut the key: the word cut from
   the tray → open. The wrapper version is the one in page.tsx; the iframe
   grows with the card; every locale's page returns 200.
   Usage: node scripts/live-verify-word-keys.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '061-word-keys', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8')).find(r => r.id === 'choice-board.tell-words-apart.rf-k-3-c');
const C = require(path.join(MT, 'word-keys-core.js'));
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
    const frameEl = await page.waitForSelector('iframe[src*="word-keys-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds word-keys-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.WordKeysActivity && window.WordKeysActivity.st && document.querySelector('.wky-wrap'), { timeout: 30000 });
    await wait(1500);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(250); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) throw new Error('nothing to tap: ' + sel); const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(200); };
    const turn = async () => { await tap('[data-k="turn"]'); await frame.waitForFunction(() => !window.WordKeysActivity._busy, { timeout: 15000 }).catch(() => {}); await wait(250); };
    const st = () => frame.evaluate(() => { const s = window.WordKeysActivity.st; return JSON.parse(JSON.stringify({ keys: s.keys, inLock: s.inLock, opened: s.opened, misses: s.misses, done: s.done, cut: s.cut })); });
    const force = (g, id) => frame.evaluate((g, id) => { const a = window.WordKeysActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.game = g; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; a._deals = null; window.LCS_reloadFirstTask(); }, g, id);
    const key = (wd) => `.wky-rail [data-key="${wd}"]`;

    /* Three keys */
    const r = C.rounds(loc, 'three')[0];
    await force('three', r.id); await wait(800);
    await turn(); let s = await st();
    is(s.misses === 0 && !s.inLock[0], `[${loc} @${w}] Turn with no key asks (no miss)`);
    const wrong = s.keys.find(k => k !== r.target);
    await tap(key(wrong)); await turn(); s = await st();
    const glow = await frame.evaluate(() => document.querySelectorAll('.wky-lt.is-diff, .wky-lt.is-extra, .wky-lt.is-empty').length);
    is(s.misses === 1 && glow > 0, `[${loc} @${w}] «${wrong}» jams → miss 1, ${glow} teeth show the difference`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-jam.png`) });
    await tap('.wky-lock'); s = await st(); is(s.inLock[0] === null, `[${loc} @${w}] a tap on the lock takes the key out`);
    await tap(key(r.target));
    await frame.evaluate(() => { window.WordKeysActivity.OK_MS = 0; });
    await turn(); await wait(500); s = await st();
    is(s.done, `[${loc} @${w}] «${r.target}» opens the lock`);
    await frame.waitForFunction(() => { const b = document.querySelector('.lcs-activity-bubble'); return b && b.textContent; }, { timeout: 15000 }).catch(() => {});
    const bubble = await frame.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return b ? b.textContent : ''; });
    is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(r.target), `[${loc} @${w}] the success text is filled («${bubble}»)`);

    /* Key ring */
    const g = C.rounds(loc, 'ring')[0];
    await force('ring', g.id); await wait(800);
    for (let i = 0; i < 3; i++) { if (w < 560) await tap(`[data-k="page${i}"]`); else await tap(`[data-lock="${i}"]`); await tap(key(g.keys[i])); }
    s = await st(); is(s.inLock.join('|') === g.keys.join('|'), `[${loc} @${w}] every key in its lock (${s.inLock.join(' ')})`);
    await turn(); s = await st(); is(s.done && s.misses === 0, `[${loc} @${w}] the key ring opens every lock`);
    if (w === 1366) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-ring.png`) });

    /* Cut the key */
    const c = C.rounds(loc, 'cut')[0];
    await force('cut', c.id); await wait(800);
    for (const ch of Array.from(c.target.toLocaleLowerCase())) await tap(`[data-k="tile-${ch}"]`);
    s = await st(); is(s.cut === c.target.toLocaleLowerCase(), `[${loc} @${w}] «${s.cut}» cut from the tray`);
    await turn(); s = await st(); is(s.done && s.misses === 0, `[${loc} @${w}] the cut key opens the lock`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-cut.png`) });
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-word-keys: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
