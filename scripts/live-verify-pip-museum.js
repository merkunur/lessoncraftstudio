#!/usr/bin/env node
/* =====================================================================
   live-verify-pip-museum.js — drives Professor Pip's Museum ON PRODUCTION:
   the real activity page, real pointer. S1: three treasures tapped onto
   their pedestals and one DRAGGED onto the wrong one; Check — three clasps
   close, the wrong one rides back with its ghost clasp ("count its
   corners"); then it is placed right and the wing opens. D3 (solids): every
   solid tapped to its object or to the Mystery Gallery and the wing opens.
   The wrapper version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-pip-museum.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '038-pip-museum', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'pip-museum-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'pip-museum-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PipMuseumCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'pip-museum-activity.js'), 'utf8') + '\n;this.__A = PipMuseumActivity;', ctx); return ctx.__A.strings; })();
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
      const frameEl = await page.waitForSelector('iframe[src*="pip-museum-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds pip-museum-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.PipMuseumActivity && window.PipMuseumActivity.st && document.querySelector('.pm-tr'), { timeout: 30000 });
      is(await frame.evaluate(() => [...document.querySelectorAll('img.pm-pip')].every(i => i.complete && i.naturalWidth > 0)), `[${loc} @${w}] Pip's picture loads`);
      const force = async (h, id) => { await frame.evaluate((h, id) => { const t = window.PipMuseumActivity; t.OK_MS = 60000; t.FAST = true; t.api.settings.hall = h; t.api.settings.plates = 'names'; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); }, h, id); await wait(900); };
      /* a control's centre in PAGE coordinates, scrolled into view first */
      const at = async (sel) => {
        let b = await frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        if (!b) return null;
        let o = await page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
        await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(150);
        o = await page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
        b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        return { x: o.x + b.x, y: o.y + b.y };
      };
      const tap = async (sel) => { const p = await at(sel); if (!p) return false; await page.mouse.click(p.x, p.y); await wait(220); return true; };
      const route = async (id, d) => { await tap(`.pm-tr[data-id="${id}"]`); await tap(`.pm-top[data-dest="${d}"]`); };
      const drag = async (id, d) => {
        const a = await at(`.pm-tr[data-id="${id}"]`); const o = await page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
        const b = await frame.evaluate((d) => { const r = document.querySelector('.pm-tray[data-dest="' + d + '"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, d);
        await page.mouse.move(a.x, a.y); await page.mouse.down();
        for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (o.x + b.x - a.x) * i / 10, a.y + (o.y + b.y - a.y) * i / 10);
        await page.mouse.up(); await wait(250);
      };
      const st = () => frame.evaluate(() => { const s = window.PipMuseumActivity.st; return JSON.parse(JSON.stringify({ belt: s.belt, trays: s.trays, held: s.held, misses: s.misses, done: s.done })); });
      const note = () => frame.evaluate(() => document.querySelector('.pm-note').textContent);

      await force('shapes', 'S1');
      const r = C.rounds('shapes').find(x => x.id === 'S1'), D = C.dests(r), ids = r.belt.map(t => t.id);
      is((await frame.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === STR.pShapes[loc], `[${loc} @${w}] the prompt`);
      const last = ids[3], right = C.rightOf(r, C.byId(r, last)), wrong = D.find(x => x !== right);
      for (const id of ids.slice(0, 3)) await route(id, C.rightOf(r, C.byId(r, id)));
      await drag(last, wrong);
      let s = await st();
      is(s.trays[wrong].includes(last) && s.belt.length === 0, `[${loc} @${w}] real pointer: three tapped on, one dragged onto the wrong pedestal`);
      await tap('.pm-check');
      s = await st();
      is(s.misses === 1 && s.belt.join() === last && ids.slice(0, 3).every(id => s.held[id]) && (await note()) === STR.hintTruth[loc], `[${loc} @${w}] Check: three clasps close, the wrong one rides back`);
      is(await frame.evaluate((id) => !!document.querySelector('.pm-tr[data-id="' + id + '"] .pm-ghost'), last), `[${loc} @${w}] it wears its ghost clasp`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
      await route(last, right); await tap('.pm-check');
      is((await st()).done, `[${loc} @${w}] the wing opens`);
      await frame.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      await wait(600);
      const bub = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(bub.includes(STR.ok_S1[loc]), `[${loc} @${w}] the win: "${bub}"`);

      await force('solids', 'D3');
      const rd = C.rounds('solids').find(x => x.id === 'D3');
      is(await frame.evaluate(() => [...document.querySelectorAll('img.pm-obj')].length === 2 && [...document.querySelectorAll('img.pm-obj')].every(i => i.complete && i.naturalWidth > 0)), `[${loc} @${w}] the solids' objects load from the library`);
      for (const t of rd.belt) await route(t.id, C.rightOf(rd, t));
      await tap('.pm-check');
      is((await st()).done, `[${loc} @${w}] the solids wing opens`);
      await wait(1200);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-pip-museum: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
