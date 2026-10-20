#!/usr/bin/env node
/* =====================================================================
   live-verify-silbenbogen.js — drives die Schwungbahn ON PRODUCTION (de
   only): the real activity page, real pointer. The pad TAPPED one bow too
   many times, the cards DRAGGED into their bows → "Ein Bogen ist leer."
   (one miss); the empty bow tapped away; Fahren! → the word with its
   capital — done. A one-syllable word: one swing, one card, done. The
   wrapper version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-silbenbogen.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '043-silbenbogen', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'silbenbogen-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const url = `https://www.lessoncraftstudio.com/de/activities/${ROW.slug.de}`;
  for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && (res.status() === 200 || res.status() === 304), `[de @${w}] ${url} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="silbenbogen-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[de @${w}] the page embeds silbenbogen-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[de @${w}] wrapper version ${WRAPPER} (${src})`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.SilbenbogenActivity && window.SilbenbogenActivity.st && document.querySelector('.sb-wrap'), { timeout: 30000 });
    const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.SilbenbogenActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
    const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
    const ctrOf = async (sel) => {
      const get = (q) => frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, q);
      let b = await get(sel); if (!b) return null;
      let o = await frameOff();
      await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300);
      o = await frameOff(); b = await get(sel);
      return b ? { x: o.x + b.x, y: o.y + b.y } : null;
    };
    const tap = async (sel) => { const p = await ctrOf(sel); if (!p) return false; await page.mouse.click(p.x, p.y); await wait(220); return true; };
    const drag = async (fromSel, b) => {
      const a = await ctrOf(fromSel); if (!a) return false;
      const o = await frameOff();
      const t = await frame.evaluate((b) => { const r = document.querySelector(`.sb-bow[data-b="${b}"] .sb-bed`).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, b);
      await page.mouse.move(a.x, a.y); await page.mouse.down();
      for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (o.x + t.x - a.x) * i / 10, a.y + (o.y + t.y - a.y) * i / 10);
      await page.mouse.up(); await wait(400); return true;
    };
    const st = () => frame.evaluate(() => JSON.parse(JSON.stringify(window.SilbenbogenActivity.st)));

    /* Schmetterling: four swings, three cards, one bow too many */
    await force('lang', 'lang-butterfly');
    for (let i = 0; i < 4; i++) await tap('.sb-pad');
    let s = await st();
    is(s.bows === 4, `[de @${w}] the pad tapped four times — four bows`);
    for (let n = 0; n < 3; n++) { const id = s.cards.find(c => c.s === n).id; await drag(`.sb-tcard[data-id="${id}"]`, n); }
    await tap('.sb-check'); s = await st();
    is(s.misses === 1 && s.last.reason === 'tooMany', `[de @${w}] one bow too many — a miss ("Ein Bogen ist leer.")`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-de-${w}-toomany.png`) });
    await tap('.sb-bow[data-b="3"] .sb-bed'); s = await st();
    is(s.bows === 3, `[de @${w}] the empty bow tapped away`);
    await tap('.sb-check'); s = await st();
    is(s.done && (await frame.evaluate(() => (document.querySelector('.sb-word') || {}).textContent)) === 'Schmetterling', `[de @${w}] Fahren! — Schmetterling`);

    /* Bär: one swing, one card */
    await force('kurz', 'kurz-bear');
    await tap('.sb-pad'); s = await st();
    await drag(`.sb-tcard[data-id="${s.cards[0].id}"]`, 0);
    await tap('.sb-check'); s = await st();
    is(s.done && s.misses === 0, `[de @${w}] Bär — one bow, one card, done`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[de @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.screenshot({ path: path.join(OUT, `live-de-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-silbenbogen: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
