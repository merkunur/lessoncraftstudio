#!/usr/bin/env node
/* =====================================================================
   local-test-plate-stack.js — the interaction gate for ACTIVITY #75, Daisy's
   Plate Stack (L.K.1.c, 11 locales). Real pointer at 704:
     every round of every level in every locale is served by clicks only —
     the pile (a holder lands), the top holder (one comes off), the tray tile
     in its slot (the ending seats / the card flips), the seated tile (it
     comes off) — and Check: the order goes out, the success line names the
     word the bench shows.
   Once per locale: an empty Check is no miss; the wrong count → miss; more
   than one with an empty slot → the slot pulses; a wrong ending → miss with
   the beat dots where the beats differ; an ending on a word that changes
   inside does not seat; the flip tile on a regular word changes nothing;
   one holder keeps the slot shut; back to one with the ending on → it
   rattles; a second miss raises the right tile; Write it → the keys spell
   the ending. Settings: Words → the tray / ticket, Answer → the keys.
   The width sweep (all locales at 320 / 704 / 1366, en at every width), at
   rest and won: no sideways scroll, controls ≥ 44 inside the card, text ≥
   14, pictures ≥ 96 (64 on a phone), Check above the fold.
   Usage: node scripts/local-test-plate-stack.js [--widths=…] [--locales=…] [--sweep-only] [--quick] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots'), QUICK = process.argv.includes('--quick');
const ID = 'daisy-plate-stack.plurals.l-k-1-c';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '075-plate-stack', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'plate-stack-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, PlateStackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'plate-stack-activity.js'), 'utf8') + '\n;this.__A = PlateStackActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(LIB, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
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
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/plate-stack-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PlateStackActivity && window.PlateStackActivity.st && document.querySelector('.ps-bench'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.PlateStackActivity; a.FAST = true; a.OK_MS = 60000; });
    return { page, errs };
  }
  async function force(page, level, idx, answer) {
    await page.evaluate((level, idx, answer) => { const a = window.PlateStackActivity; a.api.settings.level = level; a.api.settings.answer = answer || 'tiles'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); }, level, idx, answer);
    await page.waitForFunction(() => document.querySelectorAll('.ps-pic').length > 0 && [...document.querySelectorAll('.ps-pic')].every(i => i.complete), { timeout: 6000 }).catch(() => {});
  }
  const st = (page) => page.evaluate(() => { const a = window.PlateStackActivity, s = a.st; return { h: s.holders, tile: s.tile, flipped: s.flipped, typed: s.typed, done: s.done, misses: s.misses, last: s.last && s.last.reason, word: PlateStackCore.word(s), pics: document.querySelectorAll('.ps-pic').length }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ps-note').textContent);
  async function click(page, sel) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 30) }; }, sel);
    if (!b) throw new Error('no ' + sel);
    await wait(10); await page.mouse.click(b.x, b.y); await wait(15);
  }
  const top = (page) => click(page, '.ps-holder.is-top');
  async function toCount(page, n) { for (let g = 0; g < 8; g++) { const s = await st(page); if (s.h === n) return; if (s.h < n) await click(page, '.ps-pile'); else await top(page); } }
  /* the right move for the round, by clicks */
  async function serveRight(page, r, write) {
    await toCount(page, r.target);
    if (r.back) { if (r.cls === 'flip') await click(page, `.ps-tile[data-tile="flip"]`); else if (write && r.cls === 'end') { for (let i = 0; i < r.pEnd.length; i++) await click(page, '.ps-key.is-back'); } else await click(page, '.ps-seated'); }
    else if (write && r.cls === 'end') { for (const ch of r.pEnd) await click(page, `.ps-key[data-k="key-${ch}"]`); }
    else await click(page, `.ps-tile[data-tile="${r.right}"]`);
    await click(page, '.ps-check');
  }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    const { page, errs } = await open(704, loc);
    for (const lv of C.LEVELS) {
      const list = QUICK ? C.ids(loc, lv).slice(-2) : C.ids(loc, lv);
      for (const i of list) {
        const r = C.round(loc, lv, i);
        await force(page, lv, i, 'tiles');
        const s0 = await st(page);
        is(s0.h === r.start && s0.pics === r.start, `${loc} ${lv} ${r.sing}: starts with ${r.start} holder(s), a picture on each (${s0.h}/${s0.pics})`);
        const task = await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text, .lcs-activity-prompt').textContent);
        is(sp(task).includes(sp(T(loc, r.back ? 'tBack' : lv === 'l5' ? 'tSentence' : 'tBuild'))), `${loc} ${lv} ${r.sing}: the task line`);
        await serveRight(page, r, false);
        const s = await st(page), want = r.back ? r.sing : r.plural;
        is(s.done && s.misses === 0 && s.word === want, `${loc} ${lv} ${r.sing}: served — the bench says «${s.word}» (want ${want})`);
        const okk = r.back ? 'okBack' : r.cls === 'flip' ? 'okFlip' : r.cls === 'same' ? 'okSame' : 'okAdd';
        is(sp(await note(page)) === sp(T(loc, okk).split('{w}').join(C.show(loc, want))), `${loc} ${lv} ${r.sing}: «${await note(page)}»`);
        if (lv === 'l5') is(await page.evaluate(() => !!document.querySelector('.ps-sentence:not(.is-off) .ps-gap')), `${loc} ${lv} ${r.sing}: the sentence with its gap`);
      }
    }
    /* the misses — on the first regular word of l2, the first flip of l3, the first l4 */
    const idxOf = (lv, f) => C.ids(loc, lv).find(i => f(C.round(loc, lv, i)));
    const e2 = idxOf('l2', x => x.cls === 'end'), r2 = C.round(loc, 'l2', e2);
    await force(page, 'l2', e2);
    await click(page, '.ps-check'); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hEmpty')), `${loc}: an empty Check is no miss`);
    await click(page, `.ps-tile[data-tile="${r2.right}"]`); s = await st(page);
    is(!s.tile && sp(await note(page)) === sp(T(loc, 'nOne')), `${loc}: with one holder the slot stays shut`);
    await click(page, '.ps-pile'); s = await st(page);
    is(s.h === 2 && await page.evaluate(() => !!document.querySelector('.ps-slot.is-open .ps-hole')), `${loc}: the second holder opens the slot`);
    await toCount(page, r2.target === 2 ? 3 : 2); await click(page, '.ps-check'); s = await st(page);
    is(s.misses === 1 && s.last === 'count' && await page.evaluate(() => !!document.querySelector('.ps-ticket.is-pulse')), `${loc}: the wrong count → miss, the ticket pulses`);
    await toCount(page, r2.target); await click(page, '.ps-check'); s = await st(page);
    is(s.last === 'noEnding' && await page.evaluate(() => !!document.querySelector('.ps-slot.is-pulse')), `${loc}: an empty slot → the slot pulses`);
    const wrong = r2.tray.find(t => t !== r2.right && t.startsWith('e:'));
    await click(page, `.ps-tile[data-tile="${wrong}"]`); await click(page, '.ps-check'); s = await st(page);
    const dots = await page.evaluate(() => document.querySelectorAll('.ps-beat').length);
    is((s.last === 'beats' && dots === C.beats(r2.plural)) || (s.last === 'wrongEnding' && dots === 0), `${loc}: a wrong ending → ${s.last} (${dots} beat dots)`);
    is(await page.evaluate((rt) => { const b = document.querySelector('.ps-tile[data-tile="' + rt + '"]'); return !!b && b.classList.contains('is-help'); }, r2.right) && sp(await note(page)) === sp(T(loc, 'hMiss2')), `${loc}: miss 2 raises the right tile`);
    await click(page, `.ps-tile[data-tile="flip"]`); s = await st(page);
    is(!s.flipped && sp(await note(page)) === sp(T(loc, 'nNoChange')), `${loc}: the flip tile on a regular word changes nothing`);
    const f3 = idxOf('l3', x => x.cls === 'flip');
    if (f3 !== undefined) {
      const r3 = C.round(loc, 'l3', f3); await force(page, 'l3', f3); await toCount(page, 2);
      await click(page, `.ps-tile[data-tile="${r3.tray.find(t => t.startsWith('e:'))}"]`); s = await st(page);
      is(!s.tile && sp(await note(page)) === sp(T(loc, 'nChanges')) && await page.evaluate(() => !!document.querySelector('.ps-card.is-edge')), `${loc}: an ending does not seat on a word that changes inside`);
    }
    const b4 = idxOf('l4', x => x.cls === 'end'), r4 = C.round(loc, 'l4', b4);
    await force(page, 'l4', b4); await toCount(page, 1); s = await st(page);
    is(s.h === 1 && !!s.tile && await page.evaluate(() => !!document.querySelector('.ps-slot.is-rattle')), `${loc}: back to one with the ending on — it rattles`);
    await click(page, '.ps-check'); s = await st(page);
    is(s.last === 'stillOn' && sp(await note(page)) === sp(T(loc, 'hStillOn')), `${loc}: Check with the ending on → still on`);
    /* write it */
    const w1 = idxOf('l1', x => x.cls === 'end'), rw = C.round(loc, 'l1', w1);
    await force(page, 'l1', w1, 'write');
    is(await page.evaluate(() => document.querySelectorAll('.ps-key').length) === C.keys(loc).length + 1, `${loc}: Write it → the keys`);
    await serveRight(page, rw, true); s = await st(page);
    is(s.done && s.word === rw.plural, `${loc}: written ending → «${s.word}»`);
    /* settings */
    await force(page, 'l3', f3 !== undefined ? f3 : 0);
    is(await page.evaluate(() => document.querySelectorAll('.ps-tile').length) === 3, `${loc}: Words → three tray tiles`);
    await force(page, 'l4', 0);
    is(await page.evaluate(() => document.querySelector('.ps-tnum') ? document.querySelector('.ps-tnum').textContent : 'fi') === (loc === 'fi' ? 'fi' : '1'), `${loc}: Back to one → the ticket says one`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    const longest = (lv) => C.ids(loc, lv).reduce((b, i) => (C.round(loc, lv, i).plural.length > C.round(loc, lv, b).plural.length ? i : b), 0);
    for (const [lv, phase] of [['l1', 'rest'], ['l2', 'won'], ['l5', 'won'], ['l4', 'rest']]) {
      const i = longest(lv), r = C.round(loc, lv, i);
      await force(page, lv, i);
      if (phase === 'won') { await serveRight(page, r, false); await toCount(page, r.target); }
      if (phase === 'won' && !r.back) { await click(page, '.ps-pile'); await toCount(page, 5); }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await wait(40);
      const tag = `@${w} ${loc} ${lv} ${r.sing} ${phase}`;
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
        const vis = (e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none';
        const ctl = [...document.querySelectorAll('.ps-wrap button, .ps-holder.is-top')].filter(vis);
        const txt = [...document.querySelectorAll('.ps-note,.ps-check,.ps-sentence')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
        const pics = [...document.querySelectorAll('.ps-pic')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
        const boxes = [...document.querySelectorAll('.ps-standbox,.ps-bench > *,.ps-tray,.ps-ticket,.ps-sentence')].filter(vis).map(e => e.getBoundingClientRect());
        const out = boxes.concat(ctl.map(e => e.getBoundingClientRect())).filter(b => b.right > app.right + 1 || b.left < app.left - 1).length;
        const chk = document.querySelector('.ps-check').getBoundingClientRect();
        return { side: de.scrollWidth - de.clientWidth, small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className), out, txt: Math.min(...txt), pics, fold: chk.bottom + scrollY, H: innerHeight, W: document.querySelector('.ps-wrap').getBoundingClientRect().width };
      });
      const floor = m.W >= 520 ? 96 : 64;
      is(m.side <= 0 && !m.small.length && !m.out, `${tag}: no sideways scroll, controls ≥ 44, nothing off the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out})`);
      is(m.txt >= 14 && m.pics.length >= 1 && Math.min(...m.pics) >= floor - 0.6, `${tag}: text ≥ 14 (${m.txt}), pictures ≥ ${floor} (${m.pics.map(Math.round).join('/')})`);
      if (phase === 'rest') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-${phase}.png`), fullPage: true });
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-plate-stack: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
