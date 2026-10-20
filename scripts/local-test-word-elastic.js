#!/usr/bin/env node
/* =====================================================================
   local-test-word-elastic.js — the interaction gate for ACTIVITY #58, The
   Word Elastic (RF.K.3, 11 locales). Real pointer at 704:
     beads (every round, every Words setting) — the knob DRAGGED out pops
       one bead per sound and stops at the word's count; Check with empty
       beads asks (no miss); one bead filled with a trap → the snap kicks
       exactly that bead; the right tile DRAGGED onto it → right, the word
       snaps together, the shelf gets the picture, the shell celebrates;
     first / missing / bank / write / stretch / blend — the first rounds:
       the given bead cannot be moved; the missing tray; the bank card shows
       the word among four; keys typed (and the real keyboard); stretch:
       typing before pulling adds nothing, one bead too many → too many,
       let back → right; blend: a wrong picture → miss, the word's → right.
   Plus the Clue / Words options per locale. The width sweep (all locales
   at 320 / 704 / 1366, en at 320–1366) for every Clue at rest and after a
   miss: no sideways scroll, controls ≥ 44 px inside the card, pictures
   ≥ 96 / 64, text ≥ 14 px, Check above the fold.
   Usage: node scripts/local-test-word-elastic.js [--widths=…] [--locales=…] [--sweep-only]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const ID = 'cvc-builder.build-cvc-word.rf-k-3';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'word-elastic-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, WordElasticCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'word-elastic-activity.js'), 'utf8') + '\n;this.__A = WordElasticActivity;', ctx); return ctx.__A; })();
const STR = ACT.strings;
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/word-elastic-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.WordElasticActivity && window.WordElasticActivity.st && document.querySelector('.wel-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.WordElasticActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.WordElasticActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, beads: s.beads, stretch: s.stretch, trayOrder: s.trayOrder, choiceOrder: s.choiceOrder, bankOrder: s.bankOrder, pick: s.pick, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.wel-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 10; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 10, a.y + (b.y - a.y) * k / 10);
    await page.mouse.up(); await wait(50);
  }
  async function pullKnob(page, dx) {
    const a = await ctr(page, '.wel-knob'); await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 12; k++) await page.mouse.move(a.x + dx * k / 12, a.y); await page.mouse.up(); await wait(50);
  }
  async function force(page, clue, words, id) {
    await page.evaluate((c, w, id) => { const a = window.WordElasticActivity; a.FAST = true; a.api.settings.clue = c; a.api.settings.words = w; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, clue, words, id);
    await wait(70);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function check(page) { await tap(page, '.wel-check'); await page.waitForFunction(() => !window.WordElasticActivity._busy, { timeout: 15000 }); await wait(30); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const okRun = (page) => page.evaluate(() => { window.WordElasticActivity.OK_MS = 0; });
  const slotOf = (s, r, tid) => s.trayOrder.indexOf(tid);
  /* the tile with a grapheme that is not yet on a bead */
  const freeTile = (r, s, g) => r.tray.find(t => t.g === g && !s.beads.some(b => b && b.tid === t.id));
  const step = 76;   /* bead + gap at 704 */

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.WordElasticActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'clue:' + C.CLUES.join(',') + (C.wordModes(loc).length > 1 ? ' | words:' + C.wordModes(loc).join(',') : ''), `${loc}: options ${opts}`);
    for (const wm of C.wordModes(loc)) {
      /* BEADS — every round */
      for (const r of C.rounds(loc, 'beads', wm)) {
        await page.evaluate(() => { window.WordElasticActivity.OK_MS = 60000; });
        await force(page, 'beads', wm, r.id);
        const id = `${loc} ${wm} ${r.key}`, n = r.sounds.length;
        let s = await state(page);
        if (!r.stopless) {
          await pullKnob(page, step * (n + 2));
          s = await state(page); is(s.stretch === n, `${id}: the knob pulled out ${n} beads and stopped (${s.stretch})`);
        } else { await pullKnob(page, step * n); s = await state(page); is(s.beads.length === n, `${id}: stop-less — ${n} beads pulled out (${s.beads.length})`); }
        await check(page); s = await state(page);
        is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmpty'), `${id}: Check with empty beads asks, no miss`);
        const bad = n >= 3 ? n - 2 : n - 1;     /* the middle bead (or the last of two) gets a trap */
        const trap = r.tray.find(t => !r.sounds.map(x => x.toLowerCase()).includes(t.g.toLowerCase()));
        for (let i = 0; i < n; i++) { const t = i === bad ? trap : freeTile(r, await state(page), r.sounds[i]); await tap(page, `[data-k="tile${t.id}"]`); }
        s = await state(page); is(s.beads.every(Boolean), `${id}: each tapped tile went to the next empty bead`);
        await check(page); s = await state(page);
        is(s.misses === 1 && s.last && JSON.stringify(s.last.wrong) === JSON.stringify([bad]), `${id}: the snap kicks exactly bead ${bad + 1} (${s.last && JSON.stringify(s.last.wrong)})`);
        is(await page.evaluate((b) => document.querySelector(`[data-bead="${b}"]`).classList.contains('is-kick'), bad), `${id}: the kicked bead hangs out of the line`);
        const right = freeTile(r, s, r.sounds[bad]);
        await drag(page, `[data-k="tile${right.id}"]`, `[data-bead="${bad}"]`);
        s = await state(page); is(s.beads[bad] && s.beads[bad].g === r.sounds[bad] && !s.last, `${id}: the right tile dragged onto the kicked bead (the help goes)`);
        await okRun(page); await check(page); s = await state(page);
        is(s.done && await celebrated(page), `${id}: right → the word snaps together, celebrates`);
        is(await page.evaluate((w) => document.querySelector('.wel-word') && document.querySelector('.wel-word').textContent === w, r.word), `${id}: the beads clacked into «${r.word}»`);
      }
      /* FIRST */
      const f = C.rounds(loc, 'first', wm)[0]; await page.evaluate(() => { window.WordElasticActivity.OK_MS = 60000; });
      await force(page, 'first', wm, f.id);
      let s = await state(page);
      is(s.beads[0] && s.beads[0].given && await page.evaluate(() => document.querySelector('[data-bead="0"]').classList.contains('is-given')), `${loc} ${wm} first: the first bead is given`);
      await tap(page, '[data-bead="0"]'); s = await state(page); is(s.beads[0] && s.beads[0].given, `${loc} ${wm} first: tapping the given bead does not move it`);
      if (!f.stopless) { for (let i = 1; i < f.sounds.length; i++) { const t = freeTile(f, await state(page), f.sounds[i]); await tap(page, `[data-k="tile${t.id}"]`); } await okRun(page); await check(page); s = await state(page); is(s.done, `${loc} ${wm} first: built → done`); }
      /* MISSING */
      const m = C.rounds(loc, 'missing', wm)[0]; await page.evaluate(() => { window.WordElasticActivity.OK_MS = 60000; });
      await force(page, 'missing', wm, m.id); s = await state(page);
      is(s.beads.filter(Boolean).length === m.sounds.length - 1 && await page.evaluate(() => document.querySelectorAll('.wel-tile').length) === 4, `${loc} ${wm} missing: one empty bead, four tiles`);
      await tap(page, `[data-k="tile${m.tray.find(t => t.g === m.sounds[m.missing]).id}"]`); await okRun(page); await check(page); s = await state(page);
      is(s.done, `${loc} ${wm} missing: the missing letter → done`);
      /* BANK */
      const b = C.rounds(loc, 'bank', wm)[0]; await page.evaluate(() => { window.WordElasticActivity.OK_MS = 60000; });
      await force(page, 'bank', wm, b.id);
      const rows = await page.evaluate(() => [...document.querySelectorAll('.wel-bankrow')].map(e => e.textContent));
      is(rows.length === 4 && rows.includes(b.word), `${loc} ${wm} bank: four words, «${b.word}» among them (${rows.join(' ')})`);
      /* WRITE — keys clicked; the real keyboard */
      const wr = C.rounds(loc, 'write', wm)[0]; await page.evaluate(() => { window.WordElasticActivity.OK_MS = 60000; });
      await force(page, 'write', wm, wr.id);
      if (wr.stopless) await pullKnob(page, step * wr.sounds.length);
      for (const g of wr.sounds) await tap(page, `.wel-key[data-g="${g.toLowerCase()}"]`);
      await okRun(page); await check(page); s = await state(page); is(s.done, `${loc} ${wm} write: «${wr.word}» typed on the keys → done`);
      /* STRETCH */
      const sr = C.rounds(loc, 'stretch', wm)[0]; await page.evaluate(() => { window.WordElasticActivity.OK_MS = 60000; });
      await force(page, 'stretch', wm, sr.id);
      await tap(page, `.wel-key[data-g="${sr.sounds[0].toLowerCase()}"]`); s = await state(page); is(s.beads.length === 0, `${loc} ${wm} stretch: typing before pulling adds no bead`);
      await pullKnob(page, step * (sr.sounds.length + 1)); s = await state(page);
      is(s.beads.length === sr.sounds.length + 1, `${loc} ${wm} stretch: ${sr.sounds.length + 1} beads pulled out (${s.beads.length})`);
      await page.focus('.wel-wrap');
      for (const g of sr.sounds) { const k = [...g.toLowerCase()]; if (k.length === 1) await page.keyboard.type(k[0]); else await tap(page, `.wel-key[data-g="${g.toLowerCase()}"]`); }
      await check(page); s = await state(page);
      is(s.last && s.last.result === 'tooMany' && (await note(page)) === T(loc, 'hintTooMany'), `${loc} ${wm} stretch: one bead too many`);
      await page.focus('.wel-knob'); await page.keyboard.press('ArrowLeft'); await wait(40);
      await okRun(page); await check(page); s = await state(page); is(s.done, `${loc} ${wm} stretch: one bead let back, the real keyboard's letters → done`);
      /* BLEND */
      const bl = C.rounds(loc, 'blend', wm)[0]; await page.evaluate(() => { window.WordElasticActivity.OK_MS = 60000; });
      await force(page, 'blend', wm, bl.id); s = await state(page);
      await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintPick'), `${loc} ${wm} blend: Check with no picture asks`);
      await tap(page, `[data-k="choice${s.choiceOrder.indexOf(1)}"]`); await check(page); s = await state(page);
      is(s.misses === 1 && (await note(page)) === T(loc, 'hintBlend'), `${loc} ${wm} blend: a wrong picture → miss`);
      await tap(page, `[data-k="choice${s.choiceOrder.indexOf(0)}"]`); await okRun(page); await check(page); s = await state(page);
      is(s.done && await celebrated(page), `${loc} ${wm} blend: the word's picture → right`);
    }
    const shelf = await page.evaluate(() => document.querySelectorAll('.wel-slot.is-full').length);
    is(shelf === 9, `${loc}: the shelf holds nine built pictures (${shelf})`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    await page.evaluate(() => { window.WordElasticActivity.OK_MS = 60000; });
    for (const wm of C.wordModes(loc)) for (const clue of C.CLUES) {
      const R = C.rounds(loc, clue, wm), r = R.slice().sort((a, b) => (b.tray.length + b.sounds.length * 2) - (a.tray.length + a.sounds.length * 2))[0];
      await force(page, clue, wm, r.id);
      for (const phase of ['rest', 'miss']) {
        await page.evaluate((phase) => {
          const A = window.WordElasticActivity, K = window.WordElasticCore, st = A.st, r = st.r;
          if (r.clue !== 'blend') K.stretchTo(st, r.stopless ? r.sounds.length + 1 : r.sounds.length);
          if (phase === 'miss') {
            if (r.clue === 'blend') { K.pick(st, st.choiceOrder.indexOf(1)); K.check(st); K.check(st); }
            else if (r.keyboard) { r.sounds.slice().reverse().forEach(g => K.type(st, g)); K.check(st); K.check(st); }
            else { const ids = r.tray.map(t => t.id).filter(i => !K.used(st, i)).reverse(); st.beads.forEach((b, i) => { if (!b) K.place(st, ids.shift(), i); }); K.check(st); K.check(st); }
          }
          A._busy = false; A._view = {}; A._paint();
        }, phase);
        await wait(50);
        const tag = `@${w} ${loc} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.wel-bead,.wel-tile,.wel-key,.wel-knob,.wel-say,.wel-choice,.wel-check:not([hidden])')].filter(vis);
          const txt = [...document.querySelectorAll('.wel-bead,.wel-tile,.wel-key,.wel-note,.wel-bankrow,.wel-word,.wel-quiet')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.wel-pic img,.wel-choice img')].filter(vis).map(e => e.getBoundingClientRect().width);
          const chk = document.querySelector('.wel-check:not([hidden])');
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(m.pic >= Math.min(minPic, 80) - 0.5 && m.txt >= 14, `${tag}: pictures ≥ ${minPic} (${Math.round(m.pic)}), text ≥ 14 (${m.txt})`);
        is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-word-elastic: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
