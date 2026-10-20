#!/usr/bin/env node
/* =====================================================================
   live-verify-rhyme-chain.js — drives the Rhyme Chain ON PRODUCTION: the
   real activity page, real pointer. PICK: a wrong picture DRAGGED to the
   chain falls back (one miss, the picture back on the grass), the rhyme
   dragged on closes — done. JUDGE: the right ring button ends it. SORT:
   every picture dragged to its own chain, the wagon pulled — done. The
   wrapper version is the one in page.tsx; the iframe grows with the card.
   Usage: node scripts/live-verify-rhyme-chain.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '042-rhyme-chain', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'rhyme-chain-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'rhyme-chain-core.js'));
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of LOCALES) {
    const url = `https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`;
    const R = C.rounds(loc), pickId = R.find(r => r.kind === 'pick').id, judgeId = R.find(r => r.kind === 'judge').id, sortId = R.find(r => r.kind === 'sort').id;
    for (const w of [1366, 390]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
      const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
      is(res && (res.status() === 200 || res.status() === 304), `[${loc} @${w}] ${url} → ${res && res.status()}`);
      const frameEl = await page.waitForSelector('iframe[src*="rhyme-chain-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds rhyme-chain-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.RhymeChainActivity && window.RhymeChainActivity.st && document.querySelector('.rc-wrap'), { timeout: 30000 });
      const force = async (id) => { await frame.evaluate((id) => { const a = window.RhymeChainActivity; a.OK_MS = 60000; a.FAST = true; a._pool = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, id); await wait(900); };
      const frameOff = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const ctrOf = async (sel) => {
        const get = (q) => frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, q);
        let b = await get(sel); if (!b) return null;
        let o = await frameOff();
        await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(350);
        o = await frameOff(); b = await get(sel);
        return b ? { x: o.x + b.x, y: o.y + b.y } : null;
      };
      const tap = async (sel) => { const p = await ctrOf(sel); if (!p) return false; await page.mouse.click(p.x, p.y); await wait(250); return true; };
      const drag = async (id, ci) => {
        const a = await ctrOf(`.rc-card[data-id="${id}"]`); if (!a) return false;
        const o = await frameOff();
        const b = await frame.evaluate((ci) => { const r = document.querySelector(`.rc-rig[data-ci="${ci}"] .rc-chain`).getBoundingClientRect(); return { x: r.left + Math.min(r.width / 2, 120), y: r.top + r.height / 2 }; }, ci);
        await page.mouse.move(a.x, a.y); await page.mouse.down();
        for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (o.x + b.x - a.x) * i / 10, a.y + (o.y + b.y - a.y) * i / 10);
        await page.mouse.up(); await wait(450); return true;
      };
      const st = () => frame.evaluate(() => JSON.parse(JSON.stringify(window.RhymeChainActivity.st)));

      /* pick: a wrong drag falls back, the rhyme holds */
      await force(pickId);
      let s = await st();
      const ar = s.chains[0].anchor.rime, wrong = s.grass.find(c => c.rime !== ar), right = s.grass.find(c => c.rime === ar);
      await drag(wrong.id, 0); s = await st();
      is(s.misses === 1 && !s.done && s.grass.some(c => c.id === wrong.id), `[${loc} @${w}] pick: a wrong picture dragged on falls back — one miss`);
      if (w === 390 || loc === LOCALES[0]) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-fall.png`) });
      await drag(right.id, 0); s = await st();
      is(s.done && s.chains[0].links.length === 1, `[${loc} @${w}] pick: the rhyme dragged on closes — done`);

      /* judge: the right button */
      await force(judgeId); s = await st();
      await tap('.rc-vbtn.' + (s.pair[0].rime === s.pair[1].rime ? 'is-yes' : 'is-no'));
      is((await st()).done, `[${loc} @${w}] judge: the right ring button — done`);

      /* sort: every picture to its own chain, then the wagon */
      await force(sortId);
      for (let g = 0; g < 6; g++) { s = await st(); if (!s.grass.length) break; const c = s.grass[0]; await drag(c.id, s.chains.findIndex(ch => ch.anchor.rime === c.rime)); }
      await tap('.rc-check'); s = await st();
      is(s.done && s.misses === 0 && s.chains.every(ch => ch.links.every(c => c.rime === ch.anchor.rime)), `[${loc} @${w}] sort: every picture on its chain, the wagon pulled — done`);
      await wait(800);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-rhyme-chain: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
