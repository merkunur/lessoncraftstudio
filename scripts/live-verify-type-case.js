#!/usr/bin/env node
/* =====================================================================
   live-verify-type-case.js — drives the Printer's Type Case ON PRODUCTION:
   the real activity page, real pointer. P1 (pairs): a wrong sort DRAGGED to
   the empty slot tips over (a miss, the slot stays empty), the right sort
   dragged in, the press pulled — done, the pair printed on the poster. L1
   (look-alikes): every target tapped, one look-alike tapped and untapped,
   the press — done. W1 (in words): every copy tapped, the count key set,
   the press — done. The wrapper version is the one in page.tsx; the iframe
   grows with the card.
   Usage: node scripts/live-verify-type-case.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '041-type-case', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'type-case-activities.json'), 'utf8'))[0];
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of LOCALES) {
    const url = `https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`;
    for (const w of [1366, 390]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
      const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
      is(res && (res.status() === 200 || res.status() === 304), `[${loc} @${w}] ${url} → ${res && res.status()}`);
      const frameEl = await page.waitForSelector('iframe[src*="type-case-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds type-case-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.TypeCaseActivity && window.TypeCaseActivity.st && document.querySelector('.tc-wrap'), { timeout: 30000 });
      await frame.evaluate(() => document.fonts && document.fonts.ready);
      const force = async (lv, id) => { await frame.evaluate((lv, id) => { const a = window.TypeCaseActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.level = lv; a.api.settings.direction = 'both'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id); await wait(900); };
      const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const ctrOf = async (sel) => {
        const get = (q) => frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, q);
        let b = await get(sel); if (!b) return null;
        let o = await frameOff();
        await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(350);
        o = await frameOff(); b = await get(sel);
        return b ? { x: o.x + b.x, y: o.y + b.y } : null;
      };
      const tap = async (sel) => { const p = await ctrOf(sel); if (!p) return false; await page.mouse.click(p.x, p.y); await wait(220); return true; };
      const drag = async (fromSel, toSel) => {
        const a = await ctrOf(fromSel); if (!a) return false;
        const o = await frameOff();
        const b = await frame.evaluate((q) => { const r = document.querySelector(q).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, toSel);
        await page.mouse.move(a.x, a.y); await page.mouse.down();
        for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (o.x + b.x - a.x) * i / 10, a.y + (o.y + b.y - a.y) * i / 10);
        await page.mouse.up(); await wait(450); return true;
      };
      const st = () => frame.evaluate(() => JSON.parse(JSON.stringify(window.TypeCaseActivity.st)));
      const bubble = async () => { await wait(700); return frame.evaluate(() => (document.querySelector('.lcs-activity-bubble') || {}).textContent || ''); };

      /* pairs */
      await force('pairs', 'P1');
      let s = await st();
      const wrong = s.tray.find(t => t.face !== s.r.answer), right = s.tray.find(t => t.face === s.r.answer);
      await drag(`.tc-sort[data-id="${wrong.id}"]`, '.is-empty');
      s = await st();
      is(s.misses === 1 && !s.placed, `[${loc} @${w}] a wrong sort dragged in bounces — one miss, the slot empty`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-bounce.png`) });
      await drag(`.tc-sort[data-id="${right.id}"]`, '.is-empty');
      is((await st()).placed === right.id, `[${loc} @${w}] the right sort dragged into the slot`);
      await tap('.tc-check');
      is((await st()).done, `[${loc} @${w}] the press — the pair printed`);
      is((await bubble()).length > 0, `[${loc} @${w}] the pairs win is announced`);

      /* look-alikes */
      await force('look', 'L1');
      s = await st();
      const T = s.stick.filter(t => t.face === s.r.target), notT = s.stick.find(t => t.face !== s.r.target);
      await tap(`.tc-sort[data-id="${notT.id}"]`); await tap(`.tc-sort[data-id="${notT.id}"]`);
      for (const t of T) await tap(`.tc-sort[data-id="${t.id}"]`);
      s = await st();
      is(s.stick.filter(t => t.marked).length === T.length && !s.stick.find(t => t.id === notT.id).marked, `[${loc} @${w}] every ${s.r.target} marked by a real tap, the look-alike unmarked again`);
      await tap('.tc-check');
      is((await st()).done, `[${loc} @${w}] look-alikes — done`);

      /* in words */
      await force('words', 'W1');
      s = await st();
      const same = (c, t) => c === t;
      const W = s.letters.filter(t => same(t.face, s.r.target));
      for (const t of W) await tap(`.tc-sort[data-id="${t.id}"]`);
      await tap(`.tc-key[data-n="${s.r.answer}"]`);
      is((await st()).count === s.r.answer, `[${loc} @${w}] the count key ${s.r.answer}`);
      await tap('.tc-check');
      is((await st()).done, `[${loc} @${w}] in words — done (${W.length} copies of ${s.r.target})`);
      await wait(1000);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-type-case: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
