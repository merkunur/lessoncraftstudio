#!/usr/bin/env node
/* =====================================================================
   local-test-wake-up-pip.js — the interaction gate for ACTIVITY #64, The
   Flipbook (Wake Up, Pip!, RL.K.2, 11 locales). Real pointer at 704:
     WATCH — the story plays in the flipbook (slots hidden, its caption
     under it), then its pages fall out into the loose pages.
     Story order (4 and 3 pages, all 8 books) — Flip with empty slots asks
     (no miss); the pages tapped and DRAGGED into the slots in reverse;
     Flip stops at slot 2 with its pages jiggling (miss 1); Flip again is
     miss 2: Watch again glows and the right page ghosts into slot 1;
     the pages put in order → the book plays through, Pip sits up, the
     ribbon puts a starter over each page's sentence, the shell
     celebrates.
     The missing page (all 8) — the trivial page is a dead frame (pause
     bar), the foreign page stops the flip, the key page plays through.
     Fix the flipbook (all 8) — the flip stops where the book is broken;
     the repair plays through.
     Match the sentences (every book, 4 pages) — the strips, a wrong one
     slides back, all right wins.
   Once per locale: keyboard (a page, then the slot's number), Pip
   stirring when tapped, a locked page opening the flipbook. The width
   sweep (all locales at 320 / 704 / 1366, en at 320–1366), each game at
   rest, picked, miss 2 and won: no sideways scroll, every control ≥ 44
   inside the card, text ≥ 14, every picture ≥ 96 (≥ 64 on a phone),
   Flip above the fold.
   Usage: node scripts/local-test-wake-up-pip.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'wake-up-pip.retell-story.rl-k-2';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '064-flipbook', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'wake-up-pip-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, WakeUpPipCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'wake-up-pip-activity.js'), 'utf8') + '\n;this.__A = WakeUpPipActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
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
    await page.goto(`${base}/wake-up-pip-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.WakeUpPipActivity && window.WakeUpPipActivity.st && document.querySelector('.wup-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.WakeUpPipActivity; a.FAST = true; a.OK_MS = 60000; a.STEP_MS = 0; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.WakeUpPipActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, sockets: s.sockets, tray: s.tray, sel: s.sel, misses: s.misses, help: s.help, done: s.done, last: s.last, phase: s.phase, strips: s.strips, caps: s.caps })); });
  const note = (page) => page.evaluate(() => document.querySelector('.wup-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(50);
  }
  const loose = (id) => `[data-page="${id}"]`, slot = (i) => `[data-socket="${i}"]`;
  async function force(page, game, n, caps, story) {
    await page.evaluate((game, n, caps, story) => { const a = window.WakeUpPipActivity; a.api.settings.game = game; a.api.settings.pages = String(n); a.api.settings.caps = caps; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.story === story); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; a._deal = null; window.LCS_reloadFirstTask(); }, game, n, caps, story);
    await wait(60);
  }
  async function flip(page) { await tap(page, '[data-k="check"]'); await page.waitForFunction(() => !window.WakeUpPipActivity._busy, { timeout: 15000 }); await wait(30); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; });
  async function win(page, id, loc, r) {
    await page.evaluate(() => { window.WakeUpPipActivity.OK_MS = 0; });
    await flip(page); const s = await state(page);
    const rib = await page.evaluate(() => [...document.querySelectorAll('.wup-rtab')].map(t => [t.querySelector('.wup-starter').textContent, t.querySelector('.wup-rcap').textContent]));
    const lab = C.retell(r).map(x => [x.starter, x.caption]);
    is(s.done && JSON.stringify(rib) === JSON.stringify(lab) && await page.evaluate(() => document.querySelector('.wup-pip').classList.contains('is-awake')), `${id}: plays through — Pip sits up, the ribbon reads ${lab.map(x => x[0]).join(' / ')}`);
    is(await celebrated(page), `${id}: the shell celebrates`);
    const b = await bubble(page); is(b && b.includes(T(loc, 'okWin')), `${id}: the success text («${b}»)`);
    await page.evaluate(() => { window.WakeUpPipActivity.OK_MS = 60000; });
  }
  async function placeAll(page, ids) { for (let i = 0; i < ids.length; i++) { const s = await state(page); if (s.sockets[i] === ids[i]) continue; if (s.tray.includes(ids[i])) { await tap(page, loose(ids[i])); } else { await tap(page, slot(s.sockets.indexOf(ids[i]))); } await tap(page, slot(i)); } }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.WakeUpPipActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'game:order,missing,fix | pages:3,4 | caps:off,on', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);
    /* WATCH */
    {
      const r = C.rounds(loc, 'order', 4)[0];
      await page.evaluate(() => { const a = window.WakeUpPipActivity; a.FAST = false; a.WATCH_MS = 400; });
      await force(page, 'order', 4, 'off', r.story);
      const w0 = await page.evaluate(() => ({ watching: document.querySelector('.wup-wrap').classList.contains('is-watching'), cap: (document.querySelector('.wup-vcap') || {}).textContent, tray: document.querySelector('.wup-tray').hidden, sockets: getComputedStyle(document.querySelector('.wup-sockets')).visibility }));
      is(w0.watching && w0.cap === r.pages[0].caption && w0.tray && w0.sockets === 'hidden', `${loc}: WATCH — the story plays in the flipbook with its caption, slots and pages hidden`);
      await wait(400 * 4 + 300);
      is(await page.evaluate(() => !document.querySelector('.wup-wrap').classList.contains('is-watching') && !document.querySelector('.wup-tray').hidden && document.querySelector('.wup-viewer').hidden), `${loc}: after the WATCH the pages fall out into the loose pages`);
      await page.evaluate(() => { window.WakeUpPipActivity.FAST = true; });
    }
    /* Story order */
    for (const n of [4, 3]) for (const r of C.rounds(loc, 'order', n)) {
      const id = `${loc} order${n} ${r.story}`, ids = r.pages.map(p => p.id);
      await force(page, 'order', n, 'off', r.story);
      let s = await state(page);
      is(s.tray.slice().sort().join() === ids.slice().sort().join() && s.sockets.every(x => x === null), `${id}: ${n} loose pages, ${n} empty slots`);
      await flip(page); s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmpty'), `${id}: Flip with empty slots asks, no miss`);
      const rev = ids.slice().reverse();
      await drag(page, loose(rev[0]), slot(0)); s = await state(page); is(s.sockets[0] === rev[0], `${id}: a page dragged into slot 1`);
      for (let i = 1; i < n; i++) { await tap(page, loose(rev[i])); await tap(page, slot(i)); }
      await flip(page); s = await state(page);
      is(s.misses === 1 && s.last.result === 'backwards' && s.last.at === 1 && (await note(page)) === T(loc, 'hintBack') && await page.evaluate(() => document.querySelectorAll('.wup-socket.is-jiggle').length === 2), `${id}: reversed — the flip stops at slot 2, its pages jiggle (miss 1)`);
      await flip(page); s = await state(page);
      is(s.misses === 2 && (await note(page)) === T(loc, 'hintMiss2') && await page.evaluate((p) => !!document.querySelector(`[data-socket="0"] [data-ghost="${p}"]`) && document.querySelector('[data-k="watch"]').classList.contains('is-glow'), ids[0]), `${id}: miss 2 — page 1 ghosts into slot 1, Watch again glows`);
      await placeAll(page, ids);
      await win(page, id, loc, r);
    }
    /* The missing page */
    for (const r of C.rounds(loc, 'missing', 4)) {
      const id = `${loc} missing ${r.story}`;
      await force(page, 'missing', 4, 'off', r.story);
      let s = await state(page);
      is(s.sockets[r.empty] === null && s.tray.length === 3, `${id}: slot ${r.empty + 1} empty, three loose pages`);
      await tap(page, loose(r.trivial.id)); await tap(page, slot(r.empty)); await flip(page); s = await state(page);
      is(s.last.result === 'dead' && (await note(page)) === T(loc, 'hintDead') && await page.evaluate((i) => !!document.querySelector(`[data-socket="${i}"] .wup-pause`), r.empty), `${id}: the trivial page is a dead frame (pause bar)`);
      await tap(page, slot(r.empty)); await tap(page, loose(r.foreign.id)); s = await state(page);
      await tap(page, slot(r.empty)); await flip(page); s = await state(page);
      is(s.last.result === 'foreign' && (await note(page)) === T(loc, s.help >= 2 ? 'hintMiss2' : 'hintForeign'), `${id}: the foreign page stops the flip`);
      await tap(page, loose(r.pages[r.empty].id)); await tap(page, slot(r.empty));
      await win(page, id, loc, r);
    }
    /* Fix the flipbook */
    for (const r of C.rounds(loc, 'fix', 4)) {
      const id = `${loc} fix ${r.story}`, ids = r.pages.map(p => p.id);
      await force(page, 'fix', 4, 'off', r.story);
      await flip(page); let s = await state(page);
      is(r.fix.kind === 'swap' ? (s.last.result === 'backwards' && s.last.at === r.fix.b) : (s.last.result === 'foreign' && s.last.at === r.fix.at), `${id}: the flip stops where the book is broken (${JSON.stringify(s.last)})`);
      await placeAll(page, ids);
      await win(page, id, loc, r);
    }
    /* Match the sentences */
    for (const r of C.rounds(loc, 'order', 4)) {
      const id = `${loc} sentences ${r.story}`, ids = r.pages.map(p => p.id);
      await force(page, 'order', 4, 'on', r.story);
      await placeAll(page, ids); await flip(page);
      let s = await state(page);
      is(s.phase === 'captions' && s.strips.length === 4 && await page.evaluate(() => document.querySelectorAll('.wup-strip').length === 4 && document.querySelectorAll('.wup-capslot').length === 4), `${id}: in order — four sentence strips and four sentence slots`);
      const wrongFirst = s.strips.find(x => x !== ids[0]);
      await drag(page, loose(wrongFirst), slot(0)); s = await state(page); is(s.caps[0] === wrongFirst, `${id}: a strip dragged under page 1`);
      await flip(page); s = await state(page);
      is(s.last.result === 'capEmpty', `${id}: Flip with empty sentence slots asks`);
      for (let i = 1; i < 4; i++) { const st0 = await state(page); const pickId = st0.strips.find(x => x === ids[i]) || st0.strips[0]; await tap(page, loose(pickId)); await tap(page, slot(i)); }
      await flip(page); s = await state(page);
      is(s.last.result === 'capWrong' && s.caps[0] === null && (await note(page)) === T(loc, 'hintCapWrong'), `${id}: the wrong sentence slides back`);
      for (let i = 0; i < 4; i++) { const st0 = await state(page); if (st0.caps[i] === ids[i]) continue; await tap(page, loose(ids[i])); await tap(page, slot(i)); }
      await win(page, id, loc, r);
    }
    /* keyboard, Pip, a locked page */
    {
      const r = C.rounds(loc, 'order', 4)[2]; await force(page, 'order', 4, 'off', r.story);
      const s0 = await state(page); await page.focus(loose(s0.tray[0])); await page.keyboard.press('Enter'); await page.keyboard.press('3'); await wait(30);
      is((await state(page)).sockets[2] === s0.tray[0], `${loc}: keyboard — a page, then 3, goes into slot 3`);
      await tap(page, '[data-k="pip"]'); is(await page.evaluate(() => document.querySelector('.wup-pip').classList.contains('is-poke') && !!document.querySelector('.wup-puff')), `${loc}: Pip puffs a snore when tapped`);
      const m = C.rounds(loc, 'missing', 4)[0]; await force(page, 'missing', 4, 'off', m.story);
      const li = m.empty === 0 ? 1 : 0; await page.evaluate(() => { window.WakeUpPipActivity.FAST = false; }); await tap(page, slot(li));
      is(await page.evaluate(() => !document.querySelector('.wup-viewer').hidden), `${loc}: a locked page opens the flipbook to it`);
      await wait(1500); await page.evaluate(() => { window.WakeUpPipActivity.FAST = true; });
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const [game, n, caps] of [['order', 4, 'off'], ['order', 3, 'off'], ['missing', 4, 'off'], ['fix', 4, 'off'], ['order', 4, 'on']]) {
      const R = C.rounds(loc, game, n), r = R.slice().sort((a, b) => b.pages.reduce((x, p) => x + p.caption.length, 0) - a.pages.reduce((x, p) => x + p.caption.length, 0))[0];
      await force(page, game, n, caps, r.story);
      for (const phase of ['rest', 'picked', 'miss2', 'won']) {
        await page.evaluate((phase, caps) => {
          const A = window.WakeUpPipActivity, K = window.WakeUpPipCore, st0 = A.st, r = st0.r, ids = r.pages.map(p => p.id);
          const st = K.newState(r, { tray: st0.tray.length ? st0.tray : [] }); st.withCaptions = caps === 'on';
          if (r.level === 'fix') { st.sockets = st0.sockets.slice(); st.tray = st0.tray.slice(); }
          if (phase === 'picked' && st.tray.length) K.pick(st, st.tray[0]);
          if (phase === 'miss2') { if (r.level === 'order') { ids.slice().reverse().forEach((id, i) => { K.pick(st, id); K.put(st, i); }); } if (r.level === 'missing') { K.pick(st, r.trivial.id); K.put(st, r.empty); } K.flip(st); K.flip(st); }
          if (phase === 'won') { st.tray = []; st.sockets = ids.slice(); st.locked = st.locked.map(() => false); if (caps === 'on') { st.phase = 'captions'; st.strips = ids.slice(1); st.caps = [ids[0], null, null, null]; } else st.done = true; }
          A.st = st; A._busy = false; A._view = phase === 'won' && caps !== 'on' ? { awake: true, msg: 'x' } : {}; A._paint();
        }, phase, caps);
        await wait(60);
        const tag = `@${w} ${loc} ${game}${n}${caps === 'on' ? '+sentences' : ''} ${r.story} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.wup-socket,.wup-loose,.wup-strip,.wup-watch:not([hidden]),.wup-check:not([hidden]),.wup-pip,.wup-rtab')].filter(vis);
          const txt = [...document.querySelectorAll('.wup-note,.wup-check,.wup-watch,.wup-strip,.wup-capslot,.wup-starter,.wup-rcap,.wup-vcap,.wup-count')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.lcs-app img')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
          const chk = document.querySelector('.wup-check:not([hidden])');
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const floor = w >= 700 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(m.txt >= 14 && m.pic >= floor - .5, `${tag}: text ≥ 14 (${m.txt}), every picture ≥ ${floor} (${Math.round(m.pic)})`);
        if (phase !== 'won') is(m.fold <= m.H + 1, `${tag}: Flip above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${game}${n}${caps === 'on' ? 's' : ''}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-wake-up-pip: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
