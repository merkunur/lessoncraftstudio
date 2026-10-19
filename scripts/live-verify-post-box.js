#!/usr/bin/env node
/* =====================================================================
   live-verify-post-box.js — drives the Number Post Box ON PRODUCTION: the
   real activity page, real pointer. C2 (count): a peg on a side, door 3 —
   "3 sticks for 4 sides", door 4 — posted. S1 (sort): one shape DRAGGED,
   the rest tapped to their doors, Check — done, six name plates. R2 (real):
   the long rectangle bounces off the square door ("lengths"), the real
   square is posted, Check — done. The wrapper version is the one in
   page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-post-box.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '040-post-box', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'post-box-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'post-box-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PostBoxCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'post-box-activity.js'), 'utf8') + '\n;this.__A = PostBoxActivity;', ctx); return ctx.__A.strings; })();
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
      const frameEl = await page.waitForSelector('iframe[src*="post-box-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds post-box-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.PostBoxActivity && window.PostBoxActivity.st && document.querySelector('.pb-wrap'), { timeout: 30000 });
      const force = async (md, id) => { await frame.evaluate((md, id) => { const a = window.PostBoxActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.mode = md; a.api.settings.shapes = 'first'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, md, id); await wait(900); };
      const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      /* a point in frame coordinates → page coordinates, scrolled into view and settled */
      const toPage = async (getPt) => {
        let b = await frame.evaluate(getPt); if (!b) return null;
        let o = await frameOff();
        await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(350);
        o = await frameOff(); b = await frame.evaluate(getPt);
        return b ? { x: o.x + b.x, y: o.y + b.y } : null;
      };
      const ctrOf = (sel) => toPage(new Function('const e = document.querySelector(' + JSON.stringify(sel) + '); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };'));
      const tap = async (sel) => { const p = await ctrOf(sel); if (!p) return false; await page.mouse.click(p.x, p.y); await wait(220); return true; };
      const st = () => frame.evaluate(() => { const s = window.PostBoxActivity.st; return JSON.parse(JSON.stringify({ pegs: s.pegs, posted: s.posted, done: s.done, tiles: s.tiles })); });
      const note = () => frame.evaluate(() => document.querySelector('.pb-note').textContent);

      /* count */
      await force('count', 'C2');
      is((await frame.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === STR.pCount[loc], `[${loc} @${w}] the prompt`);
      const sp = await toPage(() => { const ln = document.querySelector('.pb-side[data-side="0"]'), svg = ln.ownerSVGElement, m = svg.getScreenCTM(), pt = svg.createSVGPoint(); pt.x = (+ln.getAttribute('x1') + +ln.getAttribute('x2')) / 2; pt.y = (+ln.getAttribute('y1') + +ln.getAttribute('y2')) / 2; const q = pt.matrixTransform(m); return { x: q.x, y: q.y }; });
      await page.mouse.click(sp.x, sp.y); await wait(220);
      is((await st()).pegs.join() === '0', `[${loc} @${w}] real pointer: a peg on side 1`);
      await tap('.pb-door[data-door="3"]');
      is((await note()) === STR.resTooFew[loc].replace('{a}', '3').replace('{b}', '4') && !(await st()).done, `[${loc} @${w}] door 3 — "3 sticks for 4 sides"`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-bounce.png`) });
      await tap('.pb-door[data-door="4"]');
      is((await st()).done, `[${loc} @${w}] door 4 — posted`);
      await frame.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      await wait(600);
      const bub = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(bub.includes(STR.ok_rect[loc]), `[${loc} @${w}] the win: "${bub}"`);

      /* sort */
      await force('sort', 'S1');
      const sr = C.rounds('sort', 'first')[0], rightOf = (key) => sr.doors.find(d => C.fits(C.shapeOf(key), d));
      let s = await st(); const first = s.tiles[0];
      const a = await ctrOf(`.pb-tile[data-id="${first.id}"]`), dsel = `.pb-door[data-door="${rightOf(first.key)}"]`;
      const b = await frame.evaluate((q) => { const r = document.querySelector(q).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, dsel), o = await frameOff();
      await page.mouse.move(a.x, a.y); await page.mouse.down();
      for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (o.x + b.x - a.x) * i / 10, a.y + (o.y + b.y - a.y) * i / 10);
      await page.mouse.up(); await wait(400);
      is((await st()).posted.includes(first.id), `[${loc} @${w}] a drag posts a shape`);
      for (const t of s.tiles.slice(1)) { await tap(`.pb-tile[data-id="${t.id}"]`); await tap(`.pb-door[data-door="${rightOf(t.key)}"]`); }
      await tap('.pb-check');
      is((await st()).done && (await frame.evaluate(() => document.querySelectorAll('.pb-plate').length)) === 6, `[${loc} @${w}] every shape posted — six name plates`);

      /* real */
      await force('real', 'R2');
      s = await st();
      const nl = s.tiles.find(t => t.key === 'N-long'), q1 = s.tiles.find(t => t.key === 'Q1');
      await tap(`.pb-tile[data-id="${nl.id}"]`); await tap('.pb-door[data-door="sq"]');
      is((await note()) === STR.resLengths[loc] && !(await st()).posted.includes(nl.id), `[${loc} @${w}] the long rectangle bounces off the square door`);
      await tap(`.pb-tile[data-id="${q1.id}"]`); await tap('.pb-door[data-door="sq"]'); await tap('.pb-check');
      is((await st()).done, `[${loc} @${w}] the real square posted — done`);
      await wait(1000);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-post-box: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
