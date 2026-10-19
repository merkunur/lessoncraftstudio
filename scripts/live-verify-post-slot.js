#!/usr/bin/env node
/* =====================================================================
   live-verify-post-slot.js — drives the Letterbox ON PRODUCTION: the real
   activity page, real pointer. B1: one shape DRAGGED to the letter tray,
   the rest tapped onto trays with one flat shape on the parcel tray; Check
   — it bounces back with its edge-on view (miss 1, "a line on its edge");
   then it goes to the letter tray and the bag is posted. F1 (count): the
   tab opens the cube, six postmarks, the chip 6 — posted. T1: the dice
   picture loads with its outline. The wrapper version is the one in
   page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-post-slot.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '039-post-slot', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'post-slot-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'post-slot-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PostSlotCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'post-slot-activity.js'), 'utf8') + '\n;this.__A = PostSlotActivity;', ctx); return ctx.__A.strings; })();
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
      const frameEl = await page.waitForSelector('iframe[src*="post-slot-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds post-slot-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.PostSlotActivity && window.PostSlotActivity.st && document.querySelector('.ps-wrap'), { timeout: 30000 });
      const force = async (t, id) => { await frame.evaluate((t, id) => { const a = window.PostSlotActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.task = t; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, t, id); await wait(900); };
      const at = async (sel) => {
        let b = await frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        if (!b) return null;
        let o = await page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
        await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(350);
        o = await page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
        b = await frame.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
        return { x: o.x + b.x, y: o.y + b.y };
      };
      const tap = async (sel) => { const p = await at(sel); if (!p) return false; await page.mouse.click(p.x, p.y); await wait(220); return true; };
      const toTray = async (id, d) => { await tap(`.ps-it[data-id="${id}"]`); await tap(`.ps-tray[data-dest="${d}"] .ps-motif`); };
      const drag = async (id, d) => {
        const a = await at(`.ps-it[data-id="${id}"]`); const o = await page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
        const b = await frame.evaluate((d) => { const r = document.querySelector('.ps-tray[data-dest="' + d + '"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, d);
        await page.mouse.move(a.x, a.y); await page.mouse.down();
        for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (o.x + b.x - a.x) * i / 10, a.y + (o.y + b.y - a.y) * i / 10);
        await page.mouse.up(); await wait(250);
      };
      const st = () => frame.evaluate(() => { const s = window.PostSlotActivity.st; return JSON.parse(JSON.stringify({ bag: s.bag, trays: s.trays, misses: s.misses, done: s.done, unfolded: s.unfolded, stamps: s.stamps, chip: s.chip })); });
      const note = () => frame.evaluate(() => document.querySelector('.ps-note').textContent);

      await force('sort', 'B1');
      const r = C.rounds('sort').find(x => x.id === 'B1'), fl = id => C.byId(r, id).flat;
      is((await frame.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === STR.pSort[loc], `[${loc} @${w}] the prompt`);
      let s = await st(); const ids = s.bag.slice(), first = ids.find(fl), wrongF = ids.filter(fl)[1];
      await drag(first, 'letter');
      for (const id of ids.filter(x => x !== first)) await toTray(id, id === wrongF ? 'parcel' : (fl(id) ? 'letter' : 'parcel'));
      s = await st();
      is(s.bag.length === 0 && s.trays.letter.includes(first) && s.trays.parcel.includes(wrongF), `[${loc} @${w}] real pointer: one dragged, the rest tapped onto the trays`);
      await tap('.ps-check');
      s = await st();
      is(s.misses === 1 && s.bag.join() === wrongF && (await note()) === STR.hintLine[loc] && (await frame.evaluate(() => document.querySelectorAll('.ps-edge.is-flat').length)) === 1, `[${loc} @${w}] Check: the flat shape on the parcel tray bounces back as a line`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
      await toTray(wrongF, 'letter'); await tap('.ps-check');
      is((await st()).done, `[${loc} @${w}] the bag is posted`);
      await frame.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      await wait(600);
      const bub = await frame.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
      is(bub.includes(STR.okSort[loc]), `[${loc} @${w}] the win: "${bub}"`);

      await force('faces', 'F1');
      await tap('.ps-tab');
      is((await st()).unfolded && (await frame.evaluate(() => document.querySelectorAll('.ps-fg').length)) === 6, `[${loc} @${w}] the tab opens the cube into six faces`);
      for (let i = 0; i < 6; i++) {
        const p = await at(`.ps-fg[data-f="${i}"]`); const pt = await frame.evaluate((i) => { const g = document.querySelector('.ps-fg[data-f="' + i + '"]'), r = g.getBoundingClientRect(); for (let a = 1; a < 10; a++) for (let b = 1; b < 10; b++) { const x = r.left + r.width * ((a + 4) % 9 + 1) / 10, y = r.top + r.height * ((b + 4) % 9 + 1) / 10, h = document.elementFromPoint(x, y); if (h && h.closest('.ps-fg') === g) return { dx: x - (r.left + r.width / 2), dy: y - (r.top + r.height / 2) }; } return { dx: 0, dy: 0 }; }, i);
        await page.mouse.click(p.x + pt.dx, p.y + pt.dy); await wait(150);
      }
      await tap('.ps-chip[data-n="6"]'); await tap('.ps-check');
      s = await st();
      is(s.stamps.length === 6 && s.chip === 6 && s.done, `[${loc} @${w}] six postmarks and 6 — the net is posted`);

      await force('things', 'T1');
      is(await frame.evaluate(() => { const i = document.querySelector('.ps-thing'); return !!i && i.complete && i.naturalWidth > 0 && document.querySelectorAll('.ps-ovis').length === 9; }), `[${loc} @${w}] the dice picture loads with its cube outline`);
      await wait(1000);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-post-slot: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
