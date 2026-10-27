#!/usr/bin/env node
/* =====================================================================
   local-test-group-photo.js — ACTIVITY #131, The Group Photo (Ziggy's
   Odd One Out, L.1.5.a), in a real browser with real pointer clicks, in
   all 11 locales.
   Scenarios per locale (at 1024):
     · the shutter with nobody on the step → the step glows, the hint, no
       miss; a wrong seat to the step, the shutter → a cloudy photo with no
       name and the miss-1 hint; another seat tapped IN THE PHOTO swaps onto
       the step; the shutter → miss 2: the members sharp, the kind word
       pencilled, the odd one blurred; the odd one tapped in the photo, the
       shutter → a sharp photo with its name and the success line; Next
       0.5 s later; the photo pinned on the wall, tapped open and closed;
     · "I name it": the sharp photo waits with three tags; a wrong tag
       slides off; the right one writes the name;
     · level 4 (word cards) solved by taps;
     · level 5: a wrong seat plan tapped in → the wrong ticks shake and the
       clues they break light up; again → a certain cell glows; the right
       plan tapped in → the two sentences; a wrong lamp → the cell pulses;
       the right lamps → the plan is read out.
   Then every round of every level at rest, at miss 2 (seat plan: miss 2)
   and solved (seat plan: the sentences, then done) — reached ONCE per
   locale by real clicks, then resized through 320…1366: no sideways
   scroll, the shutter above the fold at rest, the hint / success line /
   tags / lamps in view, controls ≥ 44 px (seat-plan cells ≥ 40), nothing
   outside the card, no clipped text, no two seats on top of each other,
   pictures loaded, no console errors.
   Usage: node scripts/local-test-group-photo.js [--widths=…] [--locales=…] [--levels=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', '1,2,3,4,5').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'group-photo-core.js'));
const ACT = (() => { const ctx = { window: {}, GroupPhotoCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'group-photo-activity.js'), 'utf8') + '\n;this.__A = window.GroupPhotoActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => String(ACT.strings[k][loc]);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 150) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(IMGROOT, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    /* pictures are served case-exactly, as on the Linux server */
    if (p.startsWith('/image-library-webp/')) { const d = path.dirname(file); if (!fs.existsSync(d) || !fs.readdirSync(path.dirname(d)).includes(path.basename(d)) || !fs.readdirSync(d).includes(path.basename(file))) { res.statusCode = 404; res.end(); return; } }
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/group-photo-activity.html?activity=ziggy-odd-one-out.category.l-1-5-a&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.GroupPhotoActivity && window.GroupPhotoActivity.st && document.querySelector('.gp-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.GroupPhotoActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, cap) {
    return page.evaluate((lvl, r, cap) => {
      const a = window.GroupPhotoActivity; a.api.settings.level = lvl; a.api.settings.cap = cap || 'show'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, cap);
  }
  /* a real click: the element must exist, be enabled and be hit by the pointer at its centre */
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    try { await h.click(); } catch (e) { if (!/detached/.test(String(e))) throw e; await wait(80); const h2 = await page.$(sel); if (!h2) { is(false, what + ': ' + sel + ' vanished'); return false; } await h2.click(); }
    await wait(40); return true;
  }
  const st = (page) => page.evaluate(() => { const a = window.GroupPhotoActivity, s = a.st; return { step: s.step, misses: s.misses, phase: s.phase, done: s.done, last: s.last, odd: s.rd.odd, n: s.rd.seats ? s.rd.seats.length : 0, sol: s.rd.sol, tf: s.rd.tf && s.rd.tf.map(t => t.truth), cells: s.cells, wrong: s.wrong, lit: s.lit, glow: s.glow, caption: s.rd.caption, tags: s.rd.tags && s.rd.tags.map(t => t.right) }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.gp-note'); return { t: n.textContent, cls: n.className }; });
  const inView = (page, sel) => page.evaluate(s => { const e = document.querySelector(s); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.top >= 0 && r.bottom <= window.innerHeight + 1; }, sel);
  /* the seat plan, tapped in cell by cell until each row has its tick where s says */
  async function plan(page, s, what) {
    for (let f = 0; f < 3; f++) for (let guard = 0; guard < 3; guard++) {
      const c = (await st(page)).cells[f][s[f]]; if (c === 'v') break;
      if (!(await click(page, `[data-k="cell-${f}-${s[f]}"]`, what))) return;
    }
  }

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* ---------- scenario: a bench round, all the way ---------- */
    if (LEVELS.includes('1')) {
      await force(page, '1', 0);
      let s = await st(page); const odd = s.odd, w1 = odd === 0 ? 1 : 0, w2 = odd === 2 ? 3 : 2;
      await click(page, '[data-k="check"]', loc + ' empty shutter');
      s = await st(page); let n = await note(page);
      is(s.misses === 0 && sp(n.t) === sp(T(loc, 'hintStep')) && /is-hint/.test(n.cls), `${loc}: the empty shutter → the hint, no miss`);
      is(await page.$('.gp-step.is-glow') !== null, `${loc}: the empty step glows`);
      await click(page, `[data-k="seat-${w1}"]`, loc + ' a wrong seat');
      s = await st(page); is(s.step === w1 && await page.$('[data-k="step"]') !== null, `${loc}: the seat stands on the step`);
      await click(page, '[data-k="check"]', loc + ' shutter 1');
      s = await st(page); n = await note(page);
      is(s.misses === 1 && await page.$('.gp-photo.is-cloudy') !== null && sp(n.t) === sp(T(loc, 'miss1')), `${loc}: miss 1 → a cloudy photo and its hint`);
      is((await page.$eval('.gp-photo .gp-capline', e => e.textContent.trim())) === '', `${loc}: the cloudy photo has no name`);
      await click(page, `.gp-photo [data-k="seat-${w2}"]`, loc + ' a seat tapped in the photo');
      s = await st(page); is(s.step === w2 && await page.$('.gp-photo') === null, `${loc}: a seat tapped in the photo swaps onto the step and the photo goes`);
      await click(page, '[data-k="check"]', loc + ' shutter 2');
      s = await st(page); n = await note(page);
      const cap = await page.$eval('.gp-photo .gp-capline', e => ({ t: e.textContent.trim(), pencil: e.classList.contains('is-pencil') }));
      const blurred = await page.$$eval('.gp-photo .gp-pseat.is-blur', es => es.map(e => e.getAttribute('data-k')));
      is(s.misses === 2 && cap.pencil && sp(cap.t) === sp(s.caption) && blurred.length === 1 && blurred[0] === 'seat-' + odd && sp(n.t) === sp(T(loc, 'miss2')), `${loc}: miss 2 → the name pencilled, only the odd one blurred (${blurred})`);
      await page.evaluate(() => { window.GroupPhotoActivity.OK_MS = 500; });
      await click(page, `.gp-photo [data-k="seat-${odd}"]`, loc + ' the odd one in the photo');
      await click(page, '[data-k="check"]', loc + ' shutter 3');
      s = await st(page); n = await note(page);
      const want = C.okLine({ rd: C.round(loc, '1', 0, (await page.evaluate(() => window.GroupPhotoActivity._perms[0])) || null), loc }, a => a.join('|'));
      is(s.done && await page.$('.gp-photo.is-sharp') !== null && /is-ok/.test(n.cls), `${loc}: the odd one on the step → a sharp photo, the success line`);
      is(sp(await page.$eval('.gp-photo .gp-capline', e => e.textContent)) === sp(s.caption), `${loc}: the sharp photo carries its name`);
      is(n.t.indexOf(T(loc, 'shutter')) < 0 && n.t.length > 8 && want.split(/[:|]/).length > 2, `${loc}: the success line lists the group (${n.t})`);
      await wait(1100);
      is(await page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); }), `${loc}: Next 0.5 s after the result`);
      is(await page.$('[data-k="wall-0"]') !== null, `${loc}: the photo is pinned on the wall`);
      await page.evaluate(() => { const a = window.GroupPhotoActivity; a.OK_MS = 600000; a._start(a._order ? a._order[1] : 1, 1); a._render2(); });
      await click(page, '[data-k="wall-0"]', loc + ' the pinned photo');
      is(await page.$('.gp-photo.is-pinned') !== null, `${loc}: a pinned photo opens big`);
      await click(page, '[data-k="wall-close"]', loc + ' close the pinned photo');
      is(await page.$('.gp-photo.is-pinned') === null && await page.$('.gp-bench') !== null, `${loc}: closing it shows the bench again`);
      /* I name it */
      await force(page, '1', 2, 'name');
      is(await page.$('.gp-capslot') !== null, `${loc}: "I name it" shows an empty name line at rest`);
      s = await st(page); await click(page, `[data-k="seat-${s.odd}"]`, loc + ' name: the odd one'); await click(page, '[data-k="check"]', loc + ' name: shutter');
      s = await st(page); n = await note(page);
      is(s.phase === 'name' && !s.done && (await page.$$('.gp-tag')).length === 3 && sp(n.t) === sp(T(loc, 'nameAsk')), `${loc}: a sharp photo waits for its name, three tags`);
      const bad = s.tags.findIndex(x => !x), good = s.tags.findIndex(x => x);
      await click(page, `[data-k="tag-${bad}"]`, loc + ' a wrong tag');
      s = await st(page); n = await note(page);
      is(!s.done && await page.$(`[data-k="tag-${bad}"].is-off`) !== null && sp(n.t) === sp(T(loc, 'nameWrong')), `${loc}: a wrong tag slides off`);
      await click(page, `[data-k="tag-${good}"]`, loc + ' the right tag');
      s = await st(page); is(s.done && sp(await page.$eval('.gp-photo .gp-capline', e => e.textContent)) === sp(s.caption), `${loc}: the right tag writes the name`);
    }
    if (LEVELS.includes('4')) {
      await force(page, '4', 3); let s = await st(page);
      await click(page, `[data-k="seat-${s.odd}"]`, loc + ' L4 odd card'); await click(page, '[data-k="check"]', loc + ' L4 shutter');
      s = await st(page); is(s.done && (await page.$$('.gp-photo .gp-word')).length === 4, `${loc}: level 4 — the odd card sent off, the four cards photographed`);
    }
    /* ---------- the seat plan ---------- */
    if (LEVELS.includes('5')) {
      await force(page, '5', 0); let s = await st(page); const sol = s.sol;
      await click(page, '[data-k="check"]', loc + ' empty plan');
      is(sp((await note(page)).t) === sp(T(loc, 'hintGrid')) && (await st(page)).misses === 0, `${loc}: an empty plan → the hint, no miss`);
      await click(page, '[data-k="cell-0-0"]', loc + ' a cell'); s = await st(page);
      is(s.cells[0][0] === 'x', `${loc}: one tap → an X`);
      await click(page, '[data-k="cell-0-0"]', loc + ' the cell again'); s = await st(page);
      is(s.cells[0][0] === 'v' && s.cells[0][1] === 'x' && s.cells[1][0] === 'x' && await page.$('[data-k="cell-1-0"] .gp-stone.is-x') !== null, `${loc}: a tick pushes Xs along its row and column`);
      await click(page, '[data-k="cell-0-0"]', loc + ' lift the tick'); s = await st(page);
      is(s.cells[0][0] === 'e' && s.cells[0][1] === 'e' && s.cells[1][0] === 'e', `${loc}: lifting the tick lifts its Xs`);
      const wrong = [sol[1], sol[0], sol[2]]; await plan(page, wrong, loc + ' wrong plan');
      await click(page, '[data-k="check"]', loc + ' plan shutter 1'); s = await st(page);
      is(s.misses === 1 && (await page.$$('.gp-cell.is-wrong')).length === 2 && (await page.$$('.gp-clue.is-lit')).length === s.lit.length && s.lit.length >= 1, `${loc}: miss 1 → the wrong ticks shake, the broken clues light`);
      await click(page, '[data-k="check"]', loc + ' plan shutter 2'); s = await st(page);
      is(s.misses === 2 && (await page.$$('.gp-cell.is-glow')).length === 1 && sp((await note(page)).t) === sp(T(loc, 'gridMiss2')), `${loc}: miss 2 → one cell glows`);
      await plan(page, sol, loc + ' right plan');
      await click(page, '[data-k="check"]', loc + ' plan shutter 3'); s = await st(page);
      is(s.phase === 'tf' && (await page.$$('.gp-st')).length === 2 && sp((await note(page)).t) === sp(T(loc, 'tfAsk')), `${loc}: the right plan → the two sentences`);
      const t0v = s.tf[0];
      await click(page, `[data-k="tf-0-${t0v ? 0 : 1}"]`, loc + ' a wrong lamp'); s = await st(page);
      is(!s.done && (await page.$$('.gp-cell.is-pulse')).length === 1 && sp((await note(page)).t) === sp(T(loc, 'tfWrong')), `${loc}: a wrong lamp → the cell it is about pulses`);
      await click(page, `[data-k="tf-0-${t0v ? 1 : 0}"]`, loc + ' lamp 1'); await click(page, `[data-k="tf-1-${s.tf[1] ? 1 : 0}"]`, loc + ' lamp 2'); s = await st(page);
      const rd = C.round(loc, '5', 0);
      is(s.done && sp((await note(page)).t) === sp(rd.solved), `${loc}: both lamps right → the plan read out`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep: every round at rest, miss 2 and solved; reached once by clicks, then resized ---------- */
    const sw = await open(1024, loc);
    for (const lvl of LEVELS) for (const r of C.rounds(lvl)) {
      await force(sw.page, lvl, r);
      const states = lvl === '5' ? ['rest', 'miss2', 'tf', 'solved'] : ['rest', 'miss2', 'solved'];
      for (const state of states) {
        let s = await st(sw.page);
        if (state === 'miss2') {
          if (lvl === '5') { await plan(sw.page, [s.sol[1], s.sol[0], s.sol[2]], `${loc} L5.${r + 1}`); await click(sw.page, '[data-k="check"]', ''); await click(sw.page, '[data-k="check"]', ''); }
          else { const w1 = s.odd === 0 ? 1 : 0, w2 = s.odd === 2 ? 3 : 2; await click(sw.page, `[data-k="seat-${w1}"]`, ''); await click(sw.page, '[data-k="check"]', ''); await click(sw.page, `.gp-photo [data-k="seat-${w2}"]`, ''); await click(sw.page, '[data-k="check"]', ''); }
        }
        if (state === 'tf') { await plan(sw.page, s.sol, `${loc} L5.${r + 1}`); await click(sw.page, '[data-k="check"]', ''); }
        if (state === 'solved') {
          if (lvl === '5') { s = await st(sw.page); await click(sw.page, `[data-k="tf-0-${s.tf[0] ? 1 : 0}"]`, ''); await click(sw.page, `[data-k="tf-1-${s.tf[1] ? 1 : 0}"]`, ''); }
          else { await click(sw.page, `.gp-photo [data-k="seat-${s.odd}"]`, `${loc} L${lvl}.${r + 1} odd`); await click(sw.page, '[data-k="check"]', ''); }
        }
        s = await st(sw.page);
        const tag = `${loc} L${lvl}.${r + 1} ${state}`;
        if (state === 'miss2') is(s.misses === 2, `${tag}: reached`);
        if (state === 'tf') is(s.phase === 'tf', `${tag}: reached`);
        if (state === 'solved') is(s.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state, lvl) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x);
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            const btns = Array.from(document.querySelectorAll('.gp-wrap button')).filter(b => b.offsetParent !== null);
            btns.forEach(b => { const r = b.getBoundingClientRect(), min = b.classList.contains('gp-cell') ? 40 : 44; if (r.width < min - 0.5 || r.height < min - 0.5) F('small ' + (b.getAttribute('data-k') || b.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + b.getAttribute('data-k')); });
            const shut = document.querySelector('.gp-shutter');
            if (state === 'rest' && shut && shut.getBoundingClientRect().bottom > vh) F('the shutter below the fold');
            const nt = document.querySelector('.gp-note');
            if (state !== 'rest' && !nt.classList.contains('is-ok') && nt.textContent.trim() && nt.getBoundingClientRect().bottom > vh + 1) F('the note below the fold');
            document.querySelectorAll('.gp-lamp, .gp-tag').forEach(b => { if (b.offsetParent && b.getBoundingClientRect().bottom > vh + 1) F('a ' + b.className.split(' ')[0] + ' below the fold'); });
            if (lvl !== '5' && state === 'rest') document.querySelectorAll('[data-k^="seat-"]').forEach(b => { if (b.getBoundingClientRect().bottom > vh + 1) F('a seat below the fold ' + b.getAttribute('data-k')); });
            if (lvl === '5' && state === 'rest') document.querySelectorAll('.gp-cell').forEach(b => { if (b.getBoundingClientRect().bottom > vh + 1) F('a cell below the fold'); });
            document.querySelectorAll('.gp-lab, .gp-word, .gp-clue, .gp-sttext, .gp-capline, .gp-tag, .gp-note:not(.is-ok)').forEach(e => { if (e.offsetParent && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            const seats = Array.from(document.querySelectorAll('.gp-seat, .gp-pseat, .gp-step')).filter(e => e.offsetParent).map(e => ({ k: e.getAttribute('data-k') || e.className, r: e.getBoundingClientRect() }));
            for (let i = 0; i < seats.length; i++) for (let j = i + 1; j < seats.length; j++) { const a = seats[i].r, b = seats[j].r; if (seats[i].k === 'step' || seats[j].k === 'step') continue; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 3 && oy > 3 && !(a.left >= b.left && a.right <= b.right && a.top >= b.top && a.bottom <= b.bottom) && !(b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom)) F('overlap ' + seats[i].k + ' / ' + seats[j].k); }
            document.querySelectorAll('.gp-wrap img').forEach(im => { if (!im.complete || !im.naturalWidth) F('a picture did not load ' + im.src.slice(-40)); else { const r = im.getBoundingClientRect(); const floor = im.closest('.gp-grid') ? 40 : (document.querySelector('.gp-wrap.is-wide') ? 96 : 64); if (r.width < floor - 0.5) F('a picture below ' + floor + ' px: ' + Math.round(r.width)); } });
            if (state === 'solved') { const sh = document.querySelector('.lcs-activity-prompt'); if (sh && sh.getBoundingClientRect().bottom > vh + 1) F('the result bubble below the fold'); }
            return out;
          }, state, lvl);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await wait(150);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-group-photo: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
