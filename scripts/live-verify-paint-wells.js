#!/usr/bin/env node
/* =====================================================================
   live-verify-paint-wells.js — drives Build Blend and Digraph Words (The
   Paint Wells) ON PRODUCTION in en, de, sv and es (desktop 1366 + phone
   390): the real activity page, real pointer. Pour, Picture only: every
   letter of a word with a letter team tapped into its own well → Check →
   the locale's hintLean and leaning wells; the team's second letter
   DRAGGED onto its partner's well → Check → the locale's success line,
   the dried strip and a strip on the shelf. Every shipped locale page (8)
   returns 200; the wrapper version is page.tsx's; the iframe grows with
   the card.
   Usage: node scripts/live-verify-paint-wells.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '110-paint-wells', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'cvc-builder-activities.json'), 'utf8')).find(r => r.id === 'cvc-builder.build-blend-word.rf-1-3');
const C = require(path.join(MT, 'paint-wells-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, PaintWellsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'paint-wells-activity.js'), 'utf8') + ';this.__A = PaintWellsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
/* a word with one letter team: the fix drags the team's other letters onto the well of its first letter */
const WORD = { en: 'ship', de: 'scarf', sv: 'katt', es: 'llave' };
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(300);
  }
  is(JSON.stringify(Object.keys(ROW.slug).sort()) === JSON.stringify(['de', 'en', 'es', 'it', 'nl', 'no', 'pt', 'sv']), 'the row ships in en de nl sv no es it pt');
  for (const loc of Object.keys(WORD)) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="paint-wells-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds paint-wells-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.PaintWellsActivity && window.PaintWellsActivity.st && document.querySelector('.pw-foot'), { timeout: 30000 });
    const id = WORD[loc], word = C.word(loc, id), n = word.display.length;
    await frame.evaluate((id) => { const a = window.PaintWellsActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.clue = 'pour'; a.api.settings.help = 'none'; a._pool = null; a._ensurePool(); a._set = 0; a._start(id, 0); a._render2(); }, id);
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const toPage = async (p) => { const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + p.y); await wait(150); const o = await off(); return { x: o.x + p.x, y: o.y + p.y }; };
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const p = await toPage(e); await page.mouse.click(p.x, p.y); await wait(250); };
    const drop = (wi) => frame.evaluate((wi) => window.PaintWellsActivity.st.tray.findIndex(x => x.wi === wi), wi);
    const st = () => frame.evaluate(() => { const s = window.PaintWellsActivity.st; return { wells: s.wells.map(x => x.length), last: s.last, done: s.done, misses: s.misses }; });
    const note = () => frame.evaluate(() => document.querySelector('.pw-note').textContent);
    for (let wi = 0; wi < n; wi++) await click(`[data-k="drop-${await drop(wi)}"]`);
    let s = await st(); is(s.wells.filter(Boolean).length === n && s.wells.every(x => x <= 1), `[${loc} @${w}] ${n} taps → ${n} wells, one letter each`);
    await click('[data-k="check"]'); await wait(300); s = await st();
    is(s.misses === 1 && s.last === 'lean' && sp(await note()) === sp(T(loc, 'hintLean')) && await frame.evaluate(() => document.querySelectorAll('.pw-well.is-lean').length >= 2), `[${loc} @${w}] Check → «${sp(await note())}», the wells lean`);
    /* drag the team's other letters, one by one, onto the well of its first letter */
    const G = C.graphemes(loc, id), gi = G.findIndex(g => g.length > 1), at = G.slice(0, gi).join('').length, len = G[gi].length;
    for (let k = 1; k < len; k++) {
      const a = await toPage(await xy('[data-well="' + (at + k) + '"]')), b0 = await xy('[data-well="' + at + '"]'), o = await off(), b = { x: o.x + b0.x, y: o.y + b0.y };
      await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let i = 1; i <= 10; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await wait(15); } await page.mouse.up(); await wait(300);
    }
    s = await st(); is(s.wells[at] === len, `[${loc} @${w}] drags share the well: ${G[gi]}`);
    await click('[data-k="check"]');
    await frame.waitForFunction(() => window.PaintWellsActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    const L = C.lead(loc, id), team = L ? word.boxes[C.graphemes(loc, id).indexOf(L.g)] : '';
    const line = T(loc, !L ? 'okBlend' : L.kind === 'team' ? 'okTeam' : 'okDouble', { sounds: word.boxes.join('–'), word: word.display, team });
    is(s.done && sp(await note()) === sp(line) && await frame.evaluate(() => document.querySelectorAll('.pw-strip .pw-tile').length > 0 && document.querySelectorAll('.pw-dried').length === 1), `[${loc} @${w}] → «${sp(await note())}», the dried strip, one strip on the shelf`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-paint-wells: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
