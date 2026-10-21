#!/usr/bin/env node
/* =====================================================================
   local-test-inky-book-workshop.js — the interaction gate for ACTIVITY
   #66, The Two Inks (Inky's Book Workshop, RL.K.6, 11 locales). Real
   pointer at 704, every book, every locale, both Jobs settings (Jobs 3
   with open desks, Jobs 2 with name plates only):
     a page with a half missing; the wrong maker TAPPED → the ink lands
     in the wrong place, the hint names that maker's job, the page stays
     (miss 1); the page DRAGGED to another wrong person → miss 2: look at
     what is missing, the empty half pulses, the doors open; the right
     maker tapped → the page turns; page 2 dragged to its maker; Jobs 3:
     the finished page to the author → "this page is finished", to the
     reader → the cover. The cover: the author on the picture slot is a
     miss with its hint; the illustrator's portrait DRAGGED onto the
     picture slot stamps; the author tapped then the words slot → the
     book is done, the shell celebrates with the success text.
   Once per locale: closed desks show only the plates (people hidden),
   the keyboard delivers by seat number. The width sweep (all locales at
   320 / 704 / 1366, en at 320–1366), each Jobs × Desks at rest, the
   wrong ink, miss 2 and the cover: no sideways scroll, every control
   ≥ 44 inside the card, every plate inside its desk, text ≥ 14, every
   picture ≥ 96 (≥ 64 on a phone), the desks above the fold.
   Usage: node scripts/local-test-inky-book-workshop.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'inky-book-workshop.author-illustrator.rl-k-6';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '066-two-inks', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'inky-workshop-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, InkyWorkshopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'inky-book-workshop-activity.js'), 'utf8') + '\n;this.__A = InkyBookWorkshopActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/inky-book-workshop-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.InkyBookWorkshopActivity && window.InkyBookWorkshopActivity.st && document.querySelector('.iw-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.InkyBookWorkshopActivity; a.FAST = true; a.OK_MS = 60000; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.InkyBookWorkshopActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, page: s.page, phase: s.phase, seats: s.seats, cover: s.cover, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.iw-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(40); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(60);
  }
  const desk = (role) => `.iw-desk[data-role="${role}"]`, slot = (s) => `.iw-credit[data-slot="${s}"]`;
  async function force(page, jobs, desks, book) {
    await page.evaluate((jobs, desks, book) => { const a = window.InkyBookWorkshopActivity; a.api.settings.jobs = jobs; a.api.settings.desks = desks; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.book === book); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; a._deal = null; window.LCS_reloadFirstTask(); }, jobs, desks, book);
    await wait(60);
  }
  const settle = (page) => page.waitForFunction(() => !window.InkyBookWorkshopActivity._busy, { timeout: 15000 }).catch(() => {});
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; });
  const other = (role) => role === 'author' ? 'illustrator' : 'author';

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.InkyBookWorkshopActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'jobs:2,3 | desks:open,plates', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);
    for (const [jobs, desks] of [['3', 'open'], ['2', 'plates']]) for (const r of C.rounds(loc, jobs)) {
      const id = `${loc} jobs${jobs} ${desks} ${r.book}`, p0 = r.pages[0], right = C.roleFor(p0.missing), wrong = other(right);
      await force(page, jobs, desks, r.book);
      let s = await state(page);
      const rest = await page.evaluate(() => ({ box: document.querySelector('.iw-box').classList.contains('is-empty'), lines: document.querySelector('.iw-lines').classList.contains('is-empty'), desks: [...document.querySelectorAll('.iw-desk')].map(d => d.getAttribute('data-role')), doors: document.querySelectorAll('.iw-desk.is-door').length, plates: [...document.querySelectorAll('.iw-plate')].map(p => p.textContent) }));
      is(rest.box === (p0.missing === 'picture') && rest.lines === (p0.missing === 'words') && JSON.stringify(rest.desks) === JSON.stringify(s.seats), `${id}: page 1 shows its empty ${p0.missing}, the desks sit in the dealt order`);
      is(desks === 'plates' ? rest.doors === r.roles.length : rest.doors === 0, `${id}: ${desks === 'plates' ? 'every desk closed' : 'every desk open'}`);
      is(JSON.stringify(rest.plates.slice().sort()) === JSON.stringify(s.seats.map(x => C.DATA.TEXT[loc].roles[x]).sort()), `${id}: the plates read ${rest.plates.join(' / ')}`);
      await tap(page, desk(wrong)); await settle(page); s = await state(page);
      is(s.page === 0 && s.misses === 1 && (await note(page)) === T(loc, wrong === 'author' ? 'hintAuthor' : 'hintIllus'), `${id}: the ${wrong} tapped — wrong ink, its hint, the page stays (miss 1)`);
      await drag(page, '.iw-page', desk(jobs === '3' ? 'reader' : wrong)); await settle(page); s = await state(page);
      const m2 = await page.evaluate((miss) => ({ pulse: document.querySelector(miss === 'picture' ? '.iw-box' : '.iw-lines').classList.contains('is-pulse'), doors: document.querySelectorAll('.iw-desk.is-door').length }), p0.missing);
      is(s.misses === 2 && (await note(page)) === T(loc, 'hintLook') && m2.pulse && m2.doors === 0, `${id}: the page dragged to a wrong desk — miss 2: look at what is missing, the empty ${p0.missing} pulses, the doors open`);
      await tap(page, desk(right)); await settle(page); s = await state(page);
      is(s.page === 1 && s.misses === 0, `${id}: the ${right} tapped — the page turns`);
      await drag(page, '.iw-page', desk(C.roleFor(r.pages[1].missing))); await settle(page); s = await state(page);
      is(s.page === 2, `${id}: page 2 dragged to its maker`);
      if (jobs === '3') {
        await tap(page, desk('author')); await settle(page); s = await state(page);
        is(s.page === 2 && (await note(page)) === T(loc, 'hintDone'), `${id}: the finished page to the author — this page is finished`);
        await tap(page, desk('reader')); await settle(page); s = await state(page);
      }
      is(s.phase === 'cover' && (await note(page)) === T(loc, 'instrCover') && await page.evaluate(() => document.querySelectorAll('.iw-credit').length === 2), `${id}: the cover opens with two credit slots`);
      await tap(page, desk('author')); await tap(page, slot('picture')); await settle(page); s = await state(page);
      is(s.cover.picture === null && (await note(page)) === T(loc, 'hintCoverAuthor'), `${id}: the author on the picture slot slides back with its hint`);
      await drag(page, `${desk('illustrator')} .iw-person`, slot('picture')); await settle(page); s = await state(page);
      is(s.cover.picture === 'illustrator' && await page.evaluate(() => !!document.querySelector('.iw-credit[data-slot="picture"] .iw-portrait')), `${id}: the illustrator dragged onto the picture slot is stamped`);
      await page.evaluate(() => { window.InkyBookWorkshopActivity.OK_MS = 0; });
      await tap(page, desk('author')); await tap(page, slot('words')); await settle(page); s = await state(page);
      is(s.done && await celebrated(page), `${id}: the author on the words slot — the book is done, the shell celebrates`);
      const b = await bubble(page); is(b && b.includes(T(loc, 'okWin')), `${id}: the success text`);
      await page.evaluate(() => { window.InkyBookWorkshopActivity.OK_MS = 60000; });
    }
    {
      const r = C.rounds(loc, '3')[2]; await force(page, '3', 'plates', r.book);
      is(await page.evaluate(() => [...document.querySelectorAll('.iw-desk.is-door .iw-person')].every(p => getComputedStyle(p).visibility === 'hidden')), `${loc}: closed desks hide the people — only the plates show`);
      const s0 = await state(page), k = s0.seats.indexOf(C.roleFor(r.pages[0].missing)) + 1;
      await page.focus('.iw-wrap'); await page.keyboard.press(String(k)); await settle(page);
      is((await state(page)).page === 1, `${loc}: keyboard — the seat number delivers the page`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const [jobs, desks] of [['3', 'open'], ['3', 'plates'], ['2', 'open']]) {
      const len = (r) => r.pages.reduce((x, p) => x + p.sentence.length, 0);
      const r = C.rounds(loc, jobs).slice().sort((a, b) => len(b) - len(a))[0];
      await force(page, jobs, desks, r.book);
      for (const phase of ['rest', 'ink', 'miss2', 'cover']) {
        await page.evaluate((phase) => {
          const A = window.InkyBookWorkshopActivity, K = window.InkyWorkshopCore, st = K.newState(A.st.r, { seats: A.st.seats, coverSwap: A.st.coverSwap });
          const p = K.current(st), wrong = p.missing === 'picture' ? 'author' : 'illustrator';
          let view = {};
          if (phase === 'ink') { const res = K.deliver(st, wrong); view = { work: { role: wrong, page: p, landed: res.landed, ok: false } }; }
          if (phase === 'miss2') { K.deliver(st, wrong); K.deliver(st, wrong); }
          if (phase === 'cover') { while (st.phase === 'page') K.deliver(st, K.roleFor(K.current(st).missing)); K.placePortrait(st, 'author', 'words'); }
          A.st = st; A._busy = false; A._view = view; A._paint();
        }, phase);
        await wait(60);
        const tag = `@${w} ${loc} jobs${jobs} ${desks} ${r.book} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.iw-page,.iw-desk,.iw-credit')].filter(vis);
          const txt = [...document.querySelectorAll('.iw-note,.iw-text,.iw-plate')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.lcs-app img:not(.iw-squash)')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
          const plates = [...document.querySelectorAll('.iw-desk')].filter(d => { const pl = d.querySelector('.iw-plate').getBoundingClientRect(), b = d.getBoundingClientRect(); return pl.left < b.left - .5 || pl.right > b.right + .5; }).map(d => d.querySelector('.iw-plate').textContent);
          const desks = [...document.querySelectorAll('.iw-desk')];
          return {
            side: de.scrollWidth - de.clientWidth, plates,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: Math.max(...desks.map(d => d.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const floor = w >= 700 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length && !m.plates.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card, every plate inside its desk (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')}, plates ${m.plates.join('/')})`);
        is(m.txt >= 14 && m.pic >= floor - .5, `${tag}: text ≥ 14 (${m.txt}), every picture ≥ ${floor} (${Math.round(m.pic)})`);
        is(m.fold <= m.H + 1, `${tag}: the desks above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${jobs}${desks}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-inky-book-workshop: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
