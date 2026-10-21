#!/usr/bin/env node
/* =====================================================================
   local-test-willow-story-corner.js — the interaction gate for ACTIVITY
   #68, The Story Zipper (Willow's Story Corner, RL.K.9, 11 locales).
   Real pointer at 704, every tooth of a pass, both settings (two stories,
   two animals), every locale:
     the tooth TAPPED onto a wrong spot and the Zip button pressed → the
     slider jams, the hint names the mistake (miss 1); the tooth DRAGGED to
     another wrong place and the SLIDER tapped → miss 2: the evidence glows
     (panels / feature rings) or the pocket shimmers; the right place
     tapped and pulled → the tooth closes with the success sentence; on
     the fifth tooth the whole zipper zips shut and the shell celebrates.
   Once per locale: an empty pull names the empty tooth and is no miss; a
   panel tapped puts its caption on the note line; Willow reads the two
   stories panel by panel; the keyboard places (← ↓ → P) and pulls (Enter).
   The width sweep (all locales at 320 / 704 / 1366, en at 320–1366), both
   settings at rest, miss 2 and zipped: no sideways scroll, every control
   ≥ 44 inside the card, text ≥ 14, every picture ≥ 96 (≥ 64 on a phone),
   the Zip button above the fold.
   Usage: node scripts/local-test-willow-story-corner.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'willow-story-corner.compare-tales.rl-k-9';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '068-story-zipper', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'story-zipper-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, StoryZipperCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'willow-story-corner-activity.js'), 'utf8') + '\n;this.__A = WillowStoryCornerActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
const plainSp = (s) => String(s).replace(/[  ]/g, ' ');
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
    await page.goto(`${base}/willow-story-corner-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.WillowStoryCornerActivity && window.WillowStoryCornerActivity.st && document.querySelector('.sz-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.WillowStoryCornerActivity; a.FAST = true; a.OK_MS = 60000; a.api.settings.listen = 'tap'; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.WillowStoryCornerActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, row: s.r.row, spot: s.spot, truth: s.r.spot, misses: s.misses, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.sz-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(50);
  }
  /* the pass the page plays: seed per locale + kind; a round is forced by putting it first */
  async function force(page, kind, round) {
    await page.evaluate((kind, round) => { const a = window.WillowStoryCornerActivity; a.api.settings.compare = kind; a.api.settings.listen = 'tap'; a._plan = [round]; a._planKey = a._key(); a._pass = 0; window.LCS_reloadFirstTask(); }, kind, round);
    await wait(40);
  }
  const settle = (page) => page.waitForFunction(() => !window.WillowStoryCornerActivity._busy, { timeout: 15000 }).catch(() => {});
  const spotSel = (s) => `[data-spot="${s}"]`;
  const won = async (page, how) => { await page.evaluate(() => { window.WillowStoryCornerActivity.OK_MS = 0; }); await tap(page, how); const c = await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false); const b = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; }); await page.evaluate(() => { window.WillowStoryCornerActivity.OK_MS = 60000; }); return { c, b }; };
  const HINT = (kind, s, truth) => (s === 'mid' ? 'hintBoth' : s === 'pocket' ? 'hintPocket' : truth === 'mid' ? 'hintOther' : 'hintThis') + (kind === 'animals' ? 'A' : '');

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.WillowStoryCornerActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'compare:tales,animals | listen:always,tap', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);
    for (const kind of C.KINDS) {
      const pl = C.plan(kind, C.seeded(loc + kind), 0, null);
      for (const r of pl) {
        const id = `${loc} ${r.id} row ${r.row + 1}`, wrong = C.SPOTS.filter(s => s !== r.spot);
        await force(page, kind, r);
        const shownQ = await page.evaluate(() => document.querySelector('.sz-q').textContent);
        const TT = C.DATA.TEXT[loc], q = TT.q[r.pair + '.' + r.dim] || TT.q[r.dim];
        is(shownQ === q, `${id}: the tooth asks «${q}»`);
        const rows = await page.evaluate(() => [...document.querySelectorAll('.sz-zrow')].map(e => (e.className.match(/is-(left|mid|right|pocket)\b/) || [])[1] || ''));
        is(rows.slice(0, r.row).join() === r.history.map(h => h.spot).join() && rows.slice(r.row).every(x => x === ''), `${id}: the rows above hold the teeth already closed (${rows})`);
        await tap(page, spotSel(wrong[0])); await tap(page, '.sz-check'); await settle(page); let s = await state(page);
        is(s.misses === 1 && plainSp(await note(page)) === plainSp(T(loc, HINT(kind, wrong[0], r.spot))), `${id}: the tooth in ${wrong[0]} jams — ${HINT(kind, wrong[0], r.spot)} (miss 1)`);
        await drag(page, '.sz-tooth', spotSel(wrong[1])); s = await state(page);
        is(s.spot === wrong[1], `${id}: the tooth dragged to ${wrong[1]}`);
        await tap(page, '.sz-slider'); await settle(page); s = await state(page);
        const glow = await page.evaluate(() => ({ panels: document.querySelectorAll('.sz-panel.is-help').length, rings: document.querySelectorAll('.sz-glow.is-help').length, pocket: !!document.querySelector('.sz-pocket.is-help') }));
        const nEv = (r.spot === 'mid' ? 2 : r.spot === 'pocket' ? 0 : 1);
        is(s.misses === 2 && plainSp(await note(page)) === plainSp(T(loc, (r.spot === 'pocket' ? 'hintNone' : 'hintGlow') + (kind === 'animals' ? 'A' : ''))) && (kind === 'tales' ? glow.panels : glow.rings) === nEv && glow.pocket === (r.spot === 'pocket'), `${id}: miss 2 — the evidence lights (${JSON.stringify(glow)})`);
        await tap(page, spotSel(r.spot));
        const w = await won(page, '.sz-check'); s = await state(page);
        const okT = TT.ok[r.pair + '.' + r.dim] + (r.last ? ' ' + T(loc, 'okZip') : '');
        is(s.done && w.c && plainSp(w.b).includes(plainSp(TT.ok[r.pair + '.' + r.dim])) && (!r.last || plainSp(w.b).includes(plainSp(T(loc, 'okZip')))), `${id}: the tooth closes — «${okT}»`);
        const after = await page.evaluate(() => ({ rows: [...document.querySelectorAll('.sz-zrow')].map(e => (e.className.match(/is-(left|mid|right|pocket)\b/) || [])[1] || ''), zipped: document.querySelector('.sz-wrap').classList.contains('is-zipped'), ok: document.querySelectorAll('.sz-panel.is-ok,.sz-glow.is-ok').length }));
        is(after.rows[r.row] === r.spot && after.ok === nEv && after.zipped === !!r.last, `${id}: the row shows the closed tooth, its evidence glows, ${r.last ? 'the whole zipper zips shut' : 'the zipper waits for the next tooth'}`);
      }
    }
    {
      const r = C.plan('tales', C.seeded('k' + loc), 0, null)[0]; await force(page, 'tales', r);
      await tap(page, '.sz-check'); let s = await state(page);
      is(s.misses === 0 && plainSp(await note(page)) === plainSp(T(loc, 'emptyPull')), `${loc}: an empty pull names the empty tooth and is no miss`);
      await tap(page, '[data-panel="right1"]');
      const S = C.sides('tales', r.pair, r.swap), cap = C.DATA.TEXT[loc].caps[S.right][1];
      is(plainSp(await note(page)) === plainSp(cap), `${loc}: a tapped panel puts its caption on the note line`);
      await page.evaluate(() => { const a = window.WillowStoryCornerActivity; a.FAST = false; a.READ_MS = 60; });
      await tap(page, '.sz-willow');
      const seen = []; for (let k = 0; k < 14; k++) { const t = plainSp(await note(page)); if (!seen.includes(t)) seen.push(t); await wait(30); }
      const want = ['left', 'right'].flatMap(side => C.DATA.TEXT[loc].caps[S[side]]).map(plainSp);
      is(want.every(x => seen.includes(x)), `${loc}: Willow reads both stories panel by panel (${seen.length} captions seen)`);
      await page.evaluate(() => { const a = window.WillowStoryCornerActivity; a.FAST = true; a.READ_MS = 2200; });
      await settle(page); await wait(100);
      const map = { left: 'ArrowLeft', mid: 'ArrowDown', right: 'ArrowRight', pocket: 'p' };
      await page.evaluate(() => { const a = window.WillowStoryCornerActivity; a._clearTimers(); a._reading = null; a._view = {}; a._paint(); document.querySelector('.sz-wrap').focus(); });
      await page.keyboard.press(map[r.spot]); s = await state(page);
      is(s.spot === r.spot, `${loc}: keyboard — ${map[r.spot]} places the tooth`);
      await page.evaluate(() => document.querySelector('.sz-wrap').focus());
      await page.keyboard.press('Enter'); await settle(page); s = await state(page);
      is(s.done, `${loc}: keyboard — Enter pulls the zipper`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const kind of C.KINDS) {
      const pl = C.plan(kind, C.seeded('sweep'), 0, null), TT = C.DATA.TEXT[loc];
      const r = pl.filter(x => x.last).sort((a, b) => (TT.q[b.pair + '.' + b.dim] || TT.q[b.dim]).length - (TT.q[a.pair + '.' + a.dim] || TT.q[a.dim]).length)[0];
      await force(page, kind, r);
      for (const phase of ['rest', 'miss2', 'zipped']) {
        await page.evaluate((phase) => {
          const A = window.WillowStoryCornerActivity, K = window.StoryZipperCore, st = K.newState(A.st.r), r = st.r;
          if (phase !== 'rest') { K.place(st, K.SPOTS.filter(s => s !== r.spot)[0]); K.pull(st); K.pull(st); }
          if (phase === 'zipped') { K.place(st, r.spot); K.pull(st); }
          A.st = st; A._busy = false; A._view = phase === 'zipped' ? { msg: 'ok', zipped: true } : {}; A._paint();
        }, phase);
        await wait(50);
        const tag = `@${w} ${loc} ${kind} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.sz-wrap button')].filter(vis);
          const txt = [...document.querySelectorAll('.sz-note,.sz-q,.sz-cap,.sz-name')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.sz-col img.sz-img')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
          const chk = document.querySelector('.sz-check'), cb = chk && !chk.hidden ? chk.getBoundingClientRect() : document.querySelector('.sz-bar').getBoundingClientRect();
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: cb.bottom + scrollY, H: innerHeight
          };
        });
        const floor = w >= 700 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(m.txt >= 14 && m.pic >= floor - .5, `${tag}: text ≥ 14 (${m.txt}), every picture ≥ ${floor} (${Math.round(m.pic)})`);
        is(m.fold <= m.H + 1, `${tag}: the Zip button above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${kind}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-willow-story-corner: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
