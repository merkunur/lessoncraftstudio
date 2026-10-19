#!/usr/bin/env node
/* =====================================================================
   live-verify-tipping-pour.js — drives the Tipping Pour ON PRODUCTION:
   the real activity page, real pointer. Which holds more? The raspberry
   is DRAGGED onto the jug, the tap fills the little cup, the cup is
   tapped over the jug and TIPPED with the tip button (held): its juice
   leaves a dashed gap, the call wins ("…the juice did not fill it!");
   the pictures load; the iframe grows with the card.
   Usage: node scripts/live-verify-tipping-pour.js [--locales=en,sv,fi,de] [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCALES = arg('locales', 'en,sv,fi,de').split(',');
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '033-tipping-pour', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'tipping-pour-activities.json'), 'utf8'))[0];
global.TippingPourCore = require(path.join(MT, 'tipping-pour-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, TippingPourCore: global.TippingPourCore }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'tipping-pour-activity.js'), 'utf8') + '\n;this.__A = TippingPourActivity;', ctx); return ctx.__A.strings; })();
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of LOCALES) {
    const url = `https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`;
    for (const w of [1366, 390]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
      const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
      is(res && (res.status() === 200 || res.status() === 304), `[${loc} @${w}] ${url} → ${res && res.status()}`);
      const frameEl = await page.waitForSelector('iframe[src*="tipping-pour-activity.html"]', { timeout: 30000 }).catch(() => null);
      is(!!frameEl, `[${loc} @${w}] the page embeds tipping-pour-activity.html`);
      if (!frameEl) { await page.close(); continue; }
      const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
      is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER} (${src})`);
      const frame = await frameEl.contentFrame();
      await frame.waitForFunction(() => window.TippingPourActivity && window.TippingPourActivity.st && document.querySelector('.tp-vessel'), { timeout: 30000 });
      await frame.evaluate(() => { const t = window.TippingPourActivity; t.OK_MS = 60000; t.api.settings.cups = 'easy'; t.api.settings.question = 'more'; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === 'E1'); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); });
      await wait(900);
      is(await frame.evaluate(() => [...document.querySelectorAll('.tp-berry img, .tp-bramble')].every(i => i.complete && i.naturalWidth > 0)), `[${loc} @${w}] the raspberry and Bramble load`);
      is((await frame.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim())) === STR.promptMore[loc], `[${loc} @${w}] the prompt`);
      const off = () => page.evaluate(f => { const r = f.getBoundingClientRect(); return { x: r.left, y: r.top }; }, frameEl);
      const box = (sel) => frame.evaluate((s) => { const el = document.querySelector(s); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await frame.evaluate(() => document.querySelector('.tp-scene').scrollIntoView({ block: 'center', behavior: 'instant' })); await page.evaluate(f => f.scrollIntoView({ block: 'center', behavior: 'instant' }), frameEl); await wait(300);
      /* a real drag: the raspberry onto the jug */
      let o = await off(); const a = await box('.tp-berry'), b = await box('.tp-vessel-R');
      await page.mouse.move(o.x + a.x, o.y + a.y); await page.mouse.down();
      for (let i = 1; i <= 12; i++) { await page.mouse.move(o.x + a.x + (b.x - a.x) * i / 12, o.y + a.y + (b.y - a.y) * i / 12); await wait(20); }
      await page.mouse.up(); await wait(400);
      is((await frame.evaluate(() => window.TippingPourActivity.st.berry)) === 'B', `[${loc} @${w}] the berry dragged onto the jug`);
      o = await off(); const k = await box('.tp-knob'); await page.mouse.click(o.x + k.x, o.y + k.y);
      await frame.waitForFunction(() => window.TippingPourActivity.st.vol.L > 0 && window.TippingPourActivity._fillTo == null, { timeout: 8000 }).catch(() => {});
      is(await frame.evaluate(() => window.TippingPourActivity.st.vol.L > 0), `[${loc} @${w}] the tap fills the cup`);
      o = await off(); const v = await box('.tp-vessel-L'); await page.mouse.click(o.x + v.x, o.y + v.y); await wait(400);
      is((await frame.evaluate(() => window.TippingPourActivity._pose.docked)) === 'L', `[${loc} @${w}] the cup docks over the jug`);
      if (loc === LOCALES[0] || w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-docked.png`) });   /* not fullPage: it resizes the viewport and the next press misses */
      /* bring the tip button into the page's viewport (the iframe does not scroll; the page does) */
      let t = await box('.tp-tip'); o = await off();
      await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + t.y); await wait(300);   /* instant: the site scrolls smoothly, and a mid-glide offset misses the button */
      o = await off(); t = await box('.tp-tip');
      const hit = await page.evaluate((x, y) => { const e = document.elementFromPoint(x, y); return e ? e.tagName + '.' + String(e.className).slice(0, 40) : 'none'; }, o.x + t.x, o.y + t.y);
      const hitIn = await frame.evaluate((x, y) => { const e = document.elementFromPoint(x, y); return e ? e.tagName + '.' + String(e.className.baseVal != null ? e.className.baseVal : e.className).slice(0, 40) : 'none'; }, t.x, t.y);
      if (w < 500) console.log('   probe', loc, w, 'page:', hit, 'frame:', hitIn, 'scrollY', await page.evaluate(() => scrollY), 'off', JSON.stringify(o), 'vh', await page.evaluate(() => innerHeight));
      await page.mouse.move(o.x + t.x, o.y + t.y); await page.mouse.down(); await wait(2600); await page.mouse.up();
      await frame.waitForFunction(() => window.TippingPourActivity.st.outcome, { timeout: 15000 }).catch(() => {});
      /* the cup goes back (BACK_MS), the win shows; the shell's Check is pressed here because OK_MS was held off */
      await frame.waitForFunction(() => !window.TippingPourActivity._pose.docked, { timeout: 8000 }).catch(() => {});
      await wait(200);
      await frame.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (window.TippingPourActivity.st.done && c && !c.disabled) c.click(); });
      await wait(600);
      const st = await frame.evaluate(() => { const s = window.TippingPourActivity.st; return { tilt: s.tilt, vol: JSON.stringify(s.vol), docked: window.TippingPourActivity._pose.docked, done: s.done, outcome: s.outcome, gap: !!document.querySelector('.tp-gap'), bubble: document.querySelector('.lcs-activity-bubble').textContent }; });
      is(st.done && st.outcome === 'gap' && st.gap, `[${loc} @${w}] the juice leaves a gap and the call wins (${st.outcome} tilt ${st.tilt} docked ${st.docked} ${st.vol} tip@${o.x + t.x},${o.y + t.y})`);
      is(st.bubble.includes(STR.okMoreGap[loc]), `[${loc} @${w}] the win: "${st.bubble}"`);
      await wait(1500);
      const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
      is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
      await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`), fullPage: w < 500 });
      await page.close();
    }
  }
  await browser.close();
  console.log(`live-verify-tipping-pour: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
