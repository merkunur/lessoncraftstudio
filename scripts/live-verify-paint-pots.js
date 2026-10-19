#!/usr/bin/env node
/* =====================================================================
   live-verify-paint-pots.js — drives the Paint Pots ON PRODUCTION: the
   real activity page, real pointer. The house: the triangle tin, the roof
   and the wall painted (wet), Check — the roof sets, the wall sheds into
   the puddle ("count its corners"); then every triangle and square is
   painted and the picture is done. The quilt: an open triangle leaks.
   The wrapper version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-paint-pots.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '037-paint-pots', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'paint-pots-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'paint-pots-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PaintPotsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'paint-pots-activity.js'), 'utf8') + '\n;this.__A = PaintPotsActivity;', ctx); return ctx.__A.strings; })();
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
      const frameEl = await page.waitForSelector('iframe[src*="paint-pots-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds paint-pots-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.PaintPotsActivity && window.PaintPotsActivity.st && document.querySelector('.pp-piece'), { timeout: 30000 });
      const force = async (b, id) => { await frame.evaluate((b, id) => { const t = window.PaintPotsActivity; t.OK_MS = 60000; t.FAST = true; t.api.settings.board = b; t.api.settings.labels = 'shape'; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); }, b, id); await wait(900); };
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      /* a point that really presses a piece (a parent's centre may sit under an inset) */
      const pointOf = (sel, pid) => frame.evaluate((sel, pid) => {
        if (sel) { const e = document.querySelector(sel); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
        const t = window.PaintPotsActivity, pc = t._byId[pid], el = t._pEls[pid], svg = t._boardEl, m = svg.getScreenCTM(), c = PaintPotsCore.centroid(pc.pts);
        const xs = pc.pts.map(p => p[0]), ys = pc.pts.map(p => p[1]), cand = [c];
        for (let i = 1; i < 12; i++) for (let j = 1; j < 12; j++) cand.push([Math.min(...xs) + (Math.max(...xs) - Math.min(...xs)) * i / 12, Math.min(...ys) + (Math.max(...ys) - Math.min(...ys)) * j / 12]);
        for (const p of cand) { const pt = svg.createSVGPoint(); pt.x = p[0]; pt.y = p[1]; const q = pt.matrixTransform(m), h = document.elementFromPoint(q.x, q.y); if (h && (el.contains(h) || (h.getAttribute && h.getAttribute('data-id') === pid))) return { x: q.x, y: q.y }; }
        return null;
      }, sel, pid);
      const tapIn = async (sel, pid) => { let b = await pointOf(sel, pid), o = await off(); if (!b) return false; await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(150); o = await off(); b = await pointOf(sel, pid); if (!b) return false; await page.mouse.click(o.x + b.x, o.y + b.y); await wait(220); return true; };
      const st = () => frame.evaluate(() => JSON.parse(JSON.stringify(window.PaintPotsActivity.st)));

      await force('picture', 'house');
      const r = C.rounds('picture').find(x => x.id === 'house'), T = C.targets(r), ps = C.piecesOf(r), ti = r.tins.indexOf('triangle'), si = r.tins.indexOf('square');
      const wall = ps.find(p => p.t === 'rect' && p.spec.w === 240).id;
      is((await frame.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === STR.pPicture[loc], `[${loc} @${w}] the prompt`);
      await tapIn(`.pp-tin[data-i="${ti}"]`);
      await tapIn(null, T.triangle[0]); await tapIn(null, wall);
      let s = await st();
      is(s.painted[T.triangle[0]] === ti && s.painted[wall] === ti, `[${loc} @${w}] real taps: the roof and the wall are wet`);
      await tapIn('.pp-check');
      s = await st();
      is(s.set[T.triangle[0]] === ti && s.set[wall] == null && (await frame.evaluate(() => document.querySelector('.pp-note').textContent)) === STR.hintWrong[loc], `[${loc} @${w}] Check: the roof sets, the wall sheds`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
      await tapIn(null, T.triangle[1]);
      await tapIn(`.pp-tin[data-i="${si}"]`);
      for (const p of T.square) await tapIn(null, p);
      await tapIn('.pp-check');
      is((await st()).done, `[${loc} @${w}] the house is painted`);
      await frame.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      await wait(600);
      const bub = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(bub.includes(STR.ok_house[loc]), `[${loc} @${w}] the win: "${bub}"`);

      await force('quilt', 'q-tri-1');
      const q = C.rounds('quilt')[0], openP = C.piecesOf(q).find(p => p.open);
      await tapIn('.pp-tin[data-i="0"]'); await tapIn(`.pp-patch[data-id="${openP.id}"]`); await tapIn('.pp-check');
      is((await frame.evaluate(() => document.querySelector('.pp-note').textContent)) === STR.hintLeak[loc], `[${loc} @${w}] the open triangle leaks`);
      await wait(1200);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-paint-pots: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
