#!/usr/bin/env node
/* =====================================================================
   local-test-round-trip.js — ACTIVITY #143, The Round-Trip Cart ("Gus's
   Snack Cart", 2.NBT.B.5), in a real browser with real pointer taps, in
   all 11 locales.
   Scenarios per locale (at 1024):
     · 45 − 8: Check with nothing typed → a note, no miss; 47 → the cart
       comes back to 55, the gap chip reads 10, "47 + 8 → 55"; 49 → miss 2,
       the story's hops replayed to a ghost cart; 37 → home, the success
       line, Next 0.5 s later; then free play: a tap on the road rolls the
       cart there;
     · the turn tab writes the sum in columns and back, the answer travels;
     · route 24 → +30 → −6 → +15: 54, 49, 63 → the second sign is the one
       that misses (back to 55, not 54); 48 → home;
     · round first 38 + 21: Check → round first; the farther ten 30 → the
       note, no tag; 40, then 20; about 60, exact 59 → home with the
       about line; 25 + 42: the lower ten 20 → "five rounds up".
   Then every round of every setting at rest, at a miss and solved —
   reached ONCE per locale by real taps, then resized through 320…1366:
   no sideways scroll, nothing outside the card, controls ≥ 44 px, Check
   above the fold at rest, the hint in view at a miss, the cart and the
   snack at their picture size, no console errors.
   Usage: node scripts/local-test-round-trip.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'round-trip-core.js'));
const ACT = (() => { const ctx = { window: {}, RoundTripCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'round-trip-activity.js'), 'utf8') + '\n;this.__A = window.RoundTripActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const HOPS = (loc, step) => { ACT.api = { t: k => ACT.strings[k][loc] }; const r = ACT._hopsPhrase(step); ACT.api = null; return r; };
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 150) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/round-trip-activity.html?activity=gus-snack-cart.within-100.2-nbt-b-5&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RoundTripActivity && window.RoundTripActivity.st && document.querySelector('.rt-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.RoundTripActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, trips, round, k) {
    const ok = await page.evaluate((trips, round, k) => {
      const a = window.RoundTripActivity; a.api.settings.trips = trips; a.api.settings.round = round; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.k === k && a.st.mode === window.RoundTripCore.modeOf(trips, round);
    }, trips, round, k);
    if (!ok) throw new Error('force failed ' + trips + '/' + round + '/' + k);
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(10); return true;
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.RoundTripActivity.st)));
  const noteT = async (page) => sp(await page.$eval('.rt-note', e => e.textContent));
  const texts = (page, sel) => page.$$eval(sel, a => a.map(e => e.textContent.replace(/\s+/g, ' ').trim()));
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const type = async (page, digits, what) => { for (const d of String(digits)) await click(page, `[data-k="key-${d}"]`, what); };
  const check = (page, what) => click(page, '[data-k="check"]', what);
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 45 − 8 */
    await force(page, 'one', 'off', 0);
    is((await texts(page, '.rt-chip')).join() === '45' && (await count(page, '.rt-flag')) === 1 && (await count(page, '.rt-snack')) === 1, `${loc}: the cart parked on its flag at 45, the snack picture`);
    is(sp(await page.$eval('.rt-tale', e => e.textContent)) === sp(T(loc, 'sOne0')), `${loc}: the story «${T(loc, 'sOne0')}»`);
    await check(page, loc + ' empty'); let s = await st(page);
    is(s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintStart')), `${loc}: Check with nothing typed → a note, no miss`);
    await type(page, '47', loc); await check(page, loc + ' 47'); s = await st(page);
    is(s.misses === 1 && (await noteT(page)) === sp(T(loc, 'hintGap', { r: 55, a: 45 })) && (await texts(page, '.rt-gapnum')).join() === '10' && (await texts(page, '.rt-chip')).join() === '55' && sp((await texts(page, '.rt-written')).join()) === sp('47 + 8 → 55'), `${loc}: 47 → back to 55, the gap 10, «47 + 8 → 55»`);
    await click(page, '[data-k="key-del"]', loc); is((await count(page, '.rt-gapnum')) === 0, `${loc}: a new entry clears the bracket`);
    await type(page, '9', loc); await check(page, loc + ' 49'); s = await st(page);
    const hh = T(loc, 'hintHops', { a: 45, parts: HOPS(loc, -8) });
    is(s.help && (await noteT(page)) === sp(hh) && (await count(page, '.rt-cart.is-ghost')) === 1 && (await count(page, '.rt-arc.is-ghost, .rt-step.is-ghost')) === 8, `${loc}: a second miss → «${hh}», the ghost cart, eight ghost steps`);
    await click(page, '[data-k="key-del"]', loc); await click(page, '[data-k="key-del"]', loc);
    await page.evaluate(() => { window.RoundTripActivity.OK_MS = 500; });
    await type(page, '37', loc); await check(page, loc + ' 37'); s = await st(page);
    const okl = T(loc, 'okSub', { a: 45, b: 8, c: 37 });
    is(s.done && (await noteT(page)) === sp(okl) && (await texts(page, '.rt-chip')).join() === '45' && (await count(page, '.rt-loop')) === 1 && (await count(page, '.rt-key')) === 0, `${loc}: 37 → home, «${okl}», the loop stripe, the keypad away`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.RoundTripActivity.OK_MS = 600000; });
    const roadBox = await (await page.$('.rt-road')).boundingBox(), g = await page.evaluate(() => { const a = window.RoundTripActivity; const G = a._geo(a._dims()); return { pad: G.pad, W: G.W }; });
    await page.mouse.click(roadBox.x + g.pad + 72 * (g.W - 2 * g.pad) / 100, roadBox.y + roadBox.height * 0.6);
    is((await st(page)).cart === 72 && (await texts(page, '.rt-chip')).join() === '72', `${loc}: free play — a tap on the road rolls the cart to 72`);
    /* the turn tab */
    await force(page, 'one', 'off', 5); await type(page, '6', loc); await click(page, '[data-k="turn"]', loc + ' turn');
    is((await count(page, '.rt-col')) === 1 && (await texts(page, '.rt-col .rt-cd')).join() === '2,7,3,6' && (await st(page)).typed.answer === '6', `${loc}: the turn tab writes 27 + 36 in columns, the 6 travels`);
    await type(page, '3', loc); is((await texts(page, '.rt-col .is-digit')).join() === '6,3', `${loc}: the answer fills the two digit boxes`);
    await click(page, '[data-k="turn"]', loc + ' back'); is((await count(page, '.rt-col')) === 0 && (await st(page)).typed.answer === '63', `${loc}: turned back, the answer still 63`);
    /* the route */
    await force(page, 'route', 'off', 0);
    is((await count(page, '.rt-snack')) === 0 && sp(await page.$eval('.rt-tale', e => e.textContent)) === sp(T(loc, 'sRoute', { a: 24 })), `${loc}: the route story, no snack picture`);
    await type(page, '544963', loc); await check(page, loc + ' route'); s = await st(page);
    is(s.trip && s.trip.fail === 1 && (await noteT(page)) === sp(T(loc, 'hintGap', { r: 55, a: 54 })) && (await count(page, '.rt-leg.is-wait')) === 1, `${loc}: route — the second sign misses: back to 55, not 54; the third waits`);
    await click(page, '[data-k="box-leg1"]', loc); await click(page, '[data-k="key-del"]', loc); await click(page, '[data-k="key-del"]', loc); await type(page, '48', loc); await check(page, loc + ' route ok'); s = await st(page);
    is(s.done && (await noteT(page)) === sp(T(loc, 'okRoute', { a: 24, s1: '+30', s2: '−6', s3: '+15' })), `${loc}: route 54, 48, 63 → home`);
    /* round first */
    await force(page, 'one', 'on', 0);
    is((await count(page, '.rt-num.is-now')) === 1 && (await count(page, '[data-k="post-30"], [data-k="post-40"]')) === 2, `${loc}: round first — 38 marked, its two tens offered`);
    is((await count(page, '[data-k="check"]')) === 0 && (await count(page, '.rt-key')) === 0, `${loc}: the keypad sleeps while rounding`);
    await page.focus('.rt-wrap'); await page.keyboard.press('Enter'); is((await noteT(page)) === sp(T(loc, 'hintRound')), `${loc}: Enter before rounding → round first`);
    await click(page, '[data-k="post-30"]', loc); s = await st(page); is(s.rounded[0] == null && (await noteT(page)) === sp(T(loc, 'hintFar')), `${loc}: the farther ten → the note, no tag`);
    await click(page, '[data-k="post-40"]', loc); await click(page, '[data-k="post-20"]', loc); s = await st(page);
    is(s.rounded.join() === '40,20' && s.focus === 'about' && (await texts(page, '.rt-tagnum')).join() === '40,20', `${loc}: 38 → 40, 21 → 20`);
    await type(page, '60', loc); await click(page, '[data-k="box-answer"]', loc); await type(page, '59', loc);
    await check(page, loc + ' round ok'); s = await st(page);
    const rl = T(loc, 'okAdd', { a: 38, b: 21, c: 59 }) + ' ' + T(loc, 'okAbout', { c: 59, about: 60 });
    is(s.done && s.aboutOk === true && (await noteT(page)) === sp(rl), `${loc}: about 60, exact 59 → «${rl}»`);
    await force(page, 'one', 'on', 2); await click(page, '[data-k="post-20"]', loc);
    is((await st(page)).rounded[0] == null && (await noteT(page)) === sp(T(loc, 'hintFive')), `${loc}: 25 — the lower ten → «${T(loc, 'hintFive')}»`);
    /* the trip ANIMATED (FAST off): the keys sleep while it drives, and it settles where the model says */
    await force(page, 'one', 'off', 0); await page.evaluate(() => { window.RoundTripActivity.FAST = false; });
    await type(page, '47', loc); await check(page, loc + ' animated');
    await wait(400); const mid = await page.evaluate(() => ({ anim: !!window.RoundTripActivity._view.anim, keys: Array.from(document.querySelectorAll('.rt-key')).every(b => b.disabled) }));
    is(mid.anim && mid.keys, `${loc}: while the cart drives, the keys sleep`);
    await page.waitForFunction(() => !window.RoundTripActivity._view.anim, { timeout: 8000 }).catch(() => {});
    is((await noteT(page)) === sp(T(loc, 'hintGap', { r: 55, a: 45 })) && (await texts(page, '.rt-chip')).join() === '55' && (await texts(page, '.rt-gapnum')).join() === '10', `${loc}: the animated trip settles at 55, the gap 10`);
    await page.evaluate(() => { window.RoundTripActivity.FAST = true; });
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const [trips, round] of [['one', 'off'], ['route', 'off'], ['one', 'on']]) {
      const mode = C.modeOf(trips, round);
      for (let k = 0; k < C.rounds(mode).length; k++) {
        await force(sw.page, trips, round, k);
        const rd = C.rounds(mode)[k], stops = C.stops(rd);
        for (const state of ['rest', 'miss', 'solved']) {
          if (state === 'miss' || state === 'solved') {
            if (state === 'solved') { await force(sw.page, trips, round, k); }
            if (mode === 'round') { await click(sw.page, `[data-k="post-${C.nearerTen(rd.start)}"]`, ''); await click(sw.page, `[data-k="post-${C.nearerTen(rd.steps[0])}"]`, ''); await type(sw.page, String(C.nearerTen(rd.start) + C.nearerTen(rd.steps[0])), ''); await click(sw.page, '[data-k="box-answer"]', ''); }
            const right = stops.map(String), wrong = stops.map((v, i) => String(i === stops.length - 1 ? (v === 99 ? 98 : v + 1) : v));
            for (const v of (state === 'solved' ? right : wrong)) await type(sw.page, v.length === 1 && mode === 'route' ? v : v, '');
            await check(sw.page, '');
          }
          const s2 = await st(sw.page), tag = `${loc} ${mode} r${k + 1} ${state}`;
          if (state === 'miss') is(s2.trip && s2.trip.fail >= 0, `${tag}: reached`);
          if (state === 'solved') is(s2.done, `${tag}: reached`);
          for (const w of WIDTHS) {
            await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
            await sw.page.waitForFunction(() => { const a = window.RoundTripActivity, d = a._dims(), c = document.querySelector('.rt-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
            await sw.page.evaluate(() => window.scrollTo(0, 0));
            const m = await sw.page.evaluate((state) => {
              const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
              if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
              const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
              const btns = Array.from(document.querySelectorAll('.rt-wrap button')).filter(vis);
              btns.forEach(b => { const r = b.getBoundingClientRect(), k = b.getAttribute('data-k') || b.className; if (r.width < 43.5 || r.height < 43.5) F('small ' + k + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + k); });
              for (let i = 0; i < btns.length; i++) for (let j = i + 1; j < btns.length; j++) { const a = btns[i].getBoundingClientRect(), b = btns[j].getBoundingClientRect(); if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) F('overlapping ' + btns[i].getAttribute('data-k') + ' / ' + btns[j].getAttribute('data-k')); }
              const chk = document.querySelector('[data-k="check"]'); if (state === 'rest' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
              const nt = document.querySelector('.rt-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
              const road = document.querySelector('.rt-road').getBoundingClientRect();
              document.querySelectorAll('.rt-cart:not(.is-ghost), .rt-chip').forEach(e => { const r = e.getBoundingClientRect(); if (r.left < road.left - 1 || r.right > road.right + 1 || r.top < road.top - 1) F('outside the road ' + e.className); });
              if (road.right > cr.right + 1 || road.left < cr.left - 1) F('the road outside the card');
              document.querySelectorAll('.rt-svg text').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.left < road.left - 1 || r.right > road.right + 1 || r.bottom > road.bottom + 1)) F('a numeral outside the road «' + e.textContent + '»'); });
              const cart = document.querySelector('.rt-cart:not(.is-ghost)').getBoundingClientRect(), snack = document.querySelector('.rt-snack');
              if (cart.width < (vw >= 700 ? 95 : 63)) F('the cart too small ' + Math.round(cart.width));
              if (snack && snack.getBoundingClientRect().width < (vw >= 700 ? 95 : 63)) F('the snack too small');
              const eq = document.querySelector('.rt-eq'); if (eq.scrollWidth > eq.clientWidth + 1) F('the equation card overflows');
              document.querySelectorAll('.rt-tale, .rt-note:not(.is-ok)').forEach(e => { if (vis(e) && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
              return out;
            }, state);
            is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
          }
          await sw.page.setViewport({ width: 1024, height: VH(1024) }); await sw.page.waitForFunction(() => document.querySelector('.rt-wrap').classList.contains('is-wide'), { timeout: 4000 }).catch(() => {}); await wait(80);
        }
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-round-trip: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
