#!/usr/bin/env node
/* =====================================================================
   live-verify-sound-roll.js — drives Stretch the Giraffe (The Sound Roll)
   ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. en / de / sv: Long or short — every vowel
   punched wrong (a held punch for a short vowel, a tap for a long one) →
   Check → the locale's hint and the word's rolls with coral holes; then
   punched right → the locale's success line and three song-book cards.
   fi (no Long or short): Count — one hole too many → hintCount; a hole
   tapped shut → the line. Every shipped locale page (7) returns 200; the
   wrapper version is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-sound-roll.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '109-sound-roll', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'stretch-giraffe-activities.json'), 'utf8')).find(r => r.id === 'stretch-giraffe.long-short-vowel.rf-1-2-a');
const C = require(path.join(MT, 'sound-roll-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, SoundRollCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'sound-roll-activity.js'), 'utf8') + ';this.__A = SoundRollActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
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
    await page.close(); await wait(300);
  }
  is(JSON.stringify(Object.keys(ROW.slug).sort()) === JSON.stringify(['da', 'de', 'en', 'fi', 'nl', 'no', 'sv']), 'the row ships in en de nl sv da no fi');
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="sound-roll-activity.html"]', { timeout: 30000 }).catch(() => null);
    if (!frameEl) console.error('   (iframes seen: ' + (await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.getAttribute('src')).join(' ; ')).catch(e => 'eval failed ' + e.message)) + ' @ ' + page.url() + ')');
    is(!!frameEl, `[${loc} @${w}] the page embeds sound-roll-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.SoundRollActivity && window.SoundRollActivity.st && document.querySelector('.sr-foot'), { timeout: 30000 });
    const clue = loc === 'fi' ? 'count' : 'los', r = loc === 'fi' ? 2 : 3;
    await frame.evaluate((clue, r) => { const a = window.SoundRollActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.clue = clue; a.api.settings.letters = 'hidden'; a._pool = null; a._ensurePool(); a._set = 0; a._start(r, r); a._render2(); }, clue, r);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const elXY = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const toPage = async (fx, fy) => { const o0 = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 350, behavior: 'instant' }), o0.y + fy); await wait(150); const o = await frameOff(); return { x: o.x + fx, y: o.y + fy }; };
    const click = async (sel) => { const e = await elXY(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const p = await toPage(e.x, e.y); await page.mouse.click(p.x, p.y); await wait(250); };
    const press = async (i, long) => { const e = await elXY(`[data-k="punch-${i}"]`); if (!e) { is(false, `[${loc} @${w}] punch ${i}`); return; } const p = await toPage(e.x, e.y); await page.mouse.move(p.x, p.y); await page.mouse.down(); await wait(long ? 650 : 60); await page.mouse.up(); await wait(250); };
    const st = () => frame.evaluate(() => { const s = window.SoundRollActivity.st; return { rolls: s.rolls ? s.rolls.slice() : null, holes: s.holes ? s.holes.slice() : null, done: s.done, misses: s.misses }; });
    const note = () => frame.evaluate(() => document.querySelector('.sr-note').textContent);
    let s;
    if (clue === 'los') {
      const want = C.DATA.los[loc][0][r].map(id => C.word(loc, id).long);
      for (let i = 0; i < 3; i++) await press(i, !want[i]);
      s = await st(); is(s.rolls.every((x, i) => x === (want[i] ? 'round' : 'long')), `[${loc} @${w}] three vowels punched (held for a slot, tapped for a hole)`);
      await click('[data-k="check"]'); await wait(300); s = await st();
      is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hintLos')) && await frame.evaluate(() => document.querySelectorAll('.sr-masterroll').length === 3 && document.querySelectorAll('.sr-hole.is-coral').length === 3), `[${loc} @${w}] Check → «${sp(await note())}», the word's rolls with coral holes`);
      for (let i = 0; i < 3; i++) await press(i, want[i]);
      await click('[data-k="check"]');
      await frame.waitForFunction(() => window.SoundRollActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
      const longs = want.filter(Boolean).length;
      is(s.done && sp(await note()) === sp(T(loc, longs === 3 ? 'okLos3L' : longs === 0 ? 'okLos3S' : 'okLosMix')) && await frame.evaluate(() => document.querySelectorAll('.sr-card').length >= 3), `[${loc} @${w}] → «${sp(await note())}», three cards in the song book`);
    } else {
      const id = C.DATA.count[loc][0][r], n = C.word(loc, id).boxes.length;
      for (let k = 0; k <= n; k++) await press(0, false);
      await click('[data-k="check"]'); await wait(300); s = await st();
      is(s.misses === 1 && sp(await note()) === sp(T(loc, 'hintCount')), `[${loc} @${w}] one hole too many → «${sp(await note())}»`);
      await click(`[data-roll="0"] .sr-hole[data-h="${n}"]`); s = await st(); is(s.holes.length === n, `[${loc} @${w}] a hole tapped shut`);
      await click('[data-k="check"]');
      await frame.waitForFunction(() => window.SoundRollActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
      is(s.done && sp(await note()) === sp(T(loc, 'okCount', { word: C.word(loc, id).display, n })), `[${loc} @${w}] → «${sp(await note())}»`);
    }
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-sound-roll: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
