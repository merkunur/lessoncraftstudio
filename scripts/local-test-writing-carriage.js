#!/usr/bin/env node
/* =====================================================================
   local-test-writing-carriage.js — the interaction gate for ACTIVITY #73,
   The Writing Carriage (Penny's Alphabet Trace, L.K.1.a, 11 locales). Real
   pointer at 704:
     every letter of every alphabet (capitals and lowercase) in every locale
     is TRACED on its road and then WRITTEN with only the ruling and the
     green dot, by a mouse following the stroke; each finished letter glides
     out of the window onto the line, and the round ends with the child's
     letter pinned on the wall (kept in this browser).
   Once per locale: an empty Check is no miss; a stroke drawn from the wrong
   end stays pale with its hint, no miss; an unfinished trace + Check → miss
   1 and the travelling light; in the write step a line off the path +
   Check → the shadow letter, again → the spark and the step turns back
   into tracing; the eraser clears the letter; Space shows the spark and
   credits nothing; the bell rings. Settings: Practice → 3 / 1 step pips,
   Letters → the wall's slots, Lowercase → the lowercase wall.
   The width sweep (all locales at 320 / 704 / 1366, en at 320–1366), at
   rest, mid-letter and won: no sideways scroll, controls ≥ 44 inside the
   card, text ≥ 14, the x-height at its floor (84 px wide, 64 on a phone,
   58 below 320), the wall inside the card, the buttons above the fold.
   Usage: node scripts/local-test-writing-carriage.js [--widths=…] [--locales=…] [--sweep-only] [--quick] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots'), QUICK = process.argv.includes('--quick');
const ID = 'penny-alphabet-trace.letter-formation.l-k-1-a';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '073-writing-carriage', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'writing-carriage-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, WritingCarriageCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'writing-carriage-activity.js'), 'utf8') + '\n;this.__A = WritingCarriageActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); const file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'text/html'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/writing-carriage-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.WritingCarriageActivity && window.WritingCarriageActivity.st && document.querySelector('.wc-svg'), { timeout: 8000 });
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} const a = window.WritingCarriageActivity; a.FAST = true; a.OK_MS = 60000; a._wallKey = null; });
    return { page, errs };
  }
  async function force(page, level, id, extra) {
    await page.evaluate((level, id, extra) => { const a = window.WritingCarriageActivity; a.api.settings.level = level; a.api.settings.letters = (extra && extra.letters) || 'all'; a.api.settings.practice = (extra && extra.practice) || 'tw'; a._pool = null; a._paper = null; const pool = a._ensurePool(), o = pool.map((x, i) => i), k = pool.indexOf(id); o.splice(k, 1); o.unshift(k); a._order = o; a._orderForPool = pool; window.LCS_reloadFirstTask(); }, level, id, extra);
    await wait(30);
  }
  const st = (page) => page.evaluate(() => { const s = window.WritingCarriageActivity.st; return { letter: s.r.letter, step: s.step, kinds: s.kinds, idx: s.tr.idx, u: s.tr.u, misses: s.misses, done: s.done, inks: s.inks.length, ink: s.ink.length, pale: s.ink.filter(x => x.pale).length }; });
  const note = (page) => page.evaluate(() => document.querySelector('.wc-note').textContent);
  const settle = (page) => page.waitForFunction(() => !window.WritingCarriageActivity._busy || window.WritingCarriageActivity.st.done, { timeout: 8000 }).catch(() => {});
  const pts = (page, mode) => page.evaluate((mode) => { const a = window.WritingCarriageActivity, s = a.st, L = s.tr.lanes[s.tr.idx]; let p = L.pts.filter((x, i) => i % 3 === 0 || i === L.pts.length - 1); if (mode === 'rev') p = p.slice().reverse(); if (mode === 'part') p = p.slice(0, Math.max(3, Math.floor(p.length / 3))); if (mode === 'off') p = p.map(q => ({ x: q.x + 16, y: q.y + 6 })); return p.map(q => a._toClient(q)); }, mode);
  async function stroke(page, mode) {
    const P = await pts(page, mode);
    await page.mouse.move(P[0].x, P[0].y); await page.mouse.down();
    for (const q of P.slice(1)) await page.mouse.move(q.x, q.y);
    if (P.length === 1) await page.mouse.move(P[0].x + 0.4, P[0].y + 0.4);
    await page.mouse.up(); await wait(15); await settle(page);
  }
  async function writeLetter(page) { for (let g = 0; g < 40; g++) { const s = await st(page); if (s.done) return true; await stroke(page); } return false; }
  async function tap(page, sel) { const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!b) throw new Error('nothing to tap: ' + sel); await page.mouse.click(b.x, b.y); await wait(30); }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    const { page, errs } = await open(704, loc);
    for (const lv of C.LEVELS) {
      const letters = QUICK ? C.ids(loc, lv, 'all').slice(-4) : C.ids(loc, lv, 'all');
      for (const id of letters) {
        await force(page, lv, id);
        const task = await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text, .lcs-activity-prompt').textContent);
        const ok = await writeLetter(page), s = await st(page);
        const wall = await page.evaluate((id) => { const e = document.querySelector('.wc-slot[data-slot="' + id + '"]'); return e ? e.className : ''; }, id);
        const old = await page.evaluate(() => document.querySelectorAll('.wc-sheet > g').length);
        is(ok && s.done && s.inks === 2 && s.misses === 0 && /is-pinned/.test(wall) && old === 2 && sp(task).includes(sp(T(loc, 'tTW'))), `${loc} ${lv} ${id}: traced, written, two letters on the line, pinned on the wall (ok ${ok} done ${s.done} inks ${s.inks} misses ${s.misses} wall ${wall} old ${old} task «${task.slice(0, 40)}»)`);
        const okMsg = sp(await note(page));
        is(okMsg === sp(T(loc, 'okLetter').replace('{g}', id)), `${loc} ${lv} ${id}: «${okMsg}»`);
      }
    }
    const kept = await page.evaluate((loc) => { try { return Object.keys(JSON.parse(localStorage.getItem('lcs-wc-wall-' + loc + '-upper')) || {}).length; } catch (e) { return -1; } }, loc);
    is(kept === (QUICK ? 4 : C.ids(loc, 'upper', 'all').length), `${loc}: the wall keeps every capital the child wrote (${kept})`);
    /* the miss paths, on O (one closed stroke) and on L (two strokes) */
    await force(page, 'upper', 'O');
    await tap(page, '.wc-check'); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hEmpty')), `${loc}: an empty Check is no miss`);
    await stroke(page, 'rev'); s = await st(page);
    is(s.idx === 0 && s.misses === 0 && s.pale === 1 && sp(await note(page)) === sp(T(loc, 'hWrongEnd')) && await page.evaluate(() => !!document.querySelector('.wc-ink.is-pale')), `${loc}: O drawn backwards stays pale, the wrong-end hint, no miss (${JSON.stringify(s)} «${await note(page)}»)`);
    await stroke(page, 'part'); await tap(page, '.wc-check'); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hUnfinished')) && await page.evaluate(() => !!document.querySelector('.wc-light')), `${loc}: an unfinished trace → miss 1, the travelling light`);
    await tap(page, '.wc-erase'); s = await st(page);
    is(s.ink === 0 && s.u === 0 && s.misses === 1, `${loc}: the eraser clears the letter, no miss`);
    await page.focus('.wc-wrap'); await page.keyboard.press('Space'); await wait(40); s = await st(page);
    is(await page.evaluate(() => !!document.querySelector('.wc-spark')) && s.u === 0 && s.idx === 0, `${loc}: Space shows the spark and credits nothing`);
    await force(page, 'upper', 'L');
    await stroke(page); await stroke(page); await settle(page); s = await st(page);
    is(s.step === 1 && s.kinds[1] === 'write' && await page.evaluate(() => !document.querySelector('.wc-road')) && sp(await note(page)) === sp(T(loc, 'nWrite')), `${loc}: the write step — no road, the write note`);
    await stroke(page, 'off'); await tap(page, '.wc-check'); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hOff')) && await page.evaluate(() => document.querySelectorAll('.wc-shadow').length === 2), `${loc}: off the path → the shadow letter`);
    await tap(page, '.wc-check'); s = await st(page);
    is(s.misses === 2 && s.kinds[1] === 'trace' && sp(await note(page)) === sp(T(loc, 'hMiss2')) && await page.evaluate(() => !!document.querySelector('.wc-spark') && !!document.querySelector('.wc-road')), `${loc}: again → the spark, the step turns back into tracing`);
    is(await writeLetter(page), `${loc}: the letter is finished by tracing`);
    await tap(page, '.wc-bell'); is(await page.evaluate(() => !!document.querySelector('.wc-bell.is-ring')), `${loc}: the bell rings`);
    /* settings */
    await force(page, 'upper', 'B', { practice: 'tww' });
    is(await page.evaluate(() => document.querySelectorAll('.wc-pip').length) === 3, `${loc}: Trace, then write twice → three step pips`);
    await force(page, 'upper', 'B', { practice: 't' });
    is(await page.evaluate(() => document.querySelectorAll('.wc-pip').length) === 1, `${loc}: Trace only → one step pip`);
    await force(page, 'upper', 'A', { letters: 'vowels' });
    is(await page.evaluate(() => document.querySelectorAll('.wc-slot').length) === C.setLetters(loc, 'upper', 'vowels').length, `${loc}: Vowels → the wall shows the vowels`);
    await force(page, 'lower', 'a');
    is(await page.evaluate(() => document.querySelector('.wc-slot').getAttribute('data-slot')) === 'a' && await page.evaluate(() => document.querySelectorAll('.wc-slot').length) === C.alphabet(loc, 'lower').length, `${loc}: Lowercase → the lowercase wall`);
    if (loc === 'it') is(await page.evaluate(() => document.querySelectorAll('.wc-wallrow.is-foreign .wc-slot').length) === 5, 'it: J K W X Y on the second wall row');
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const [lv, id] of [['upper', C.ids(loc, 'upper', 'all').slice(-1)[0]], ['lower', 'g']]) for (const phase of ['rest', 'mid', 'won']) {
      await force(page, lv, id);
      if (phase !== 'rest') { await stroke(page); if (phase === 'won') await writeLetter(page); }
      await wait(40);
      const tag = `@${w} ${loc} ${lv} ${id} ${phase}`;
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
        const vis = (e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden';
        const ctl = [...document.querySelectorAll('.wc-wrap button')].filter(vis);
        const bell = document.querySelector('.wc-bellhit').getBoundingClientRect();
        const txt = [...document.querySelectorAll('.wc-note,.wc-check')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
        const svg = document.querySelector('.wc-svg').getBoundingClientRect(), wall = document.querySelector('.wc-wall').getBoundingClientRect();
        const out = [svg, wall].concat(ctl.map(e => e.getBoundingClientRect())).filter(b => b.right > app.right + 1 || b.left < app.left - 1).length;
        const low = Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY));
        return { side: de.scrollWidth - de.clientWidth, small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).concat(bell.width < 43.5 ? ['bell ' + Math.round(bell.width)] : []), out, txt: txt.length ? Math.min(...txt) : 99, xh: svg.height / 128 * 40, fold: low, H: innerHeight, W: document.querySelector('.wc-wrap').getBoundingClientRect().width };
      });
      const floor = m.W >= 560 ? 84 : m.W < 320 ? 58 : 64;
      is(m.side <= 0 && !m.small.length && !m.out, `${tag}: no sideways scroll, controls ≥ 44, nothing off the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out})`);
      is(m.txt >= 14 && m.xh >= floor - 0.6, `${tag}: text ≥ 14 (${m.txt}), x-height ≥ ${floor} (${m.xh.toFixed(1)})`);
      if (phase === 'rest') is(m.fold <= m.H + 1, `${tag}: the buttons above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-${phase}.png`), fullPage: true });
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-writing-carriage: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
