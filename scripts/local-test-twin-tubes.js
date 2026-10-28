#!/usr/bin/env node
/* =====================================================================
   local-test-twin-tubes.js — ACTIVITY #142, The Twin Tubes ("Three Ways
   to Show a Number", 2.NBT.A.3), in a real browser with real pointer
   taps, in all 11 locales.
   Scenarios per locale (at 1024):
     · 247, 274, 427: one card → "put a second card"; 247 against
       200 + 70 + 4 → the tens tubes ringed, both clear → "the tens are
       different: 4 tens and 7 tens", the digits beside the ringed tubes;
       out; 247 against the word for 274 → the word pours into frosted
       glass, the hint names the clear card's 4 tens; a second miss → each
       part written over its tube; 247 with its word → a pair, the frost
       melts, the pair on the shelf; the pair with 200 + 40 + 7 → the
       triple line; the other two numbers the same way → the round line,
       Next 0.5 s later;
     · with zeros 305: 300 + 5 clips with 305 and leaves the tens tube dry;
     · digit values 721, 172, 217: the 7 of 721 clips with 700 → "the 7 in
       721 is worth 700".
   Then every round of every setting at rest, at a miss and solved —
   reached ONCE per locale by real taps, then resized through 320…1366:
   no sideways scroll, nothing outside the card, controls ≥ 44 px, the
   stand above the fold at rest, the hint in view at a miss, no card text
   clipped, no console errors.
   Usage: node scripts/local-test-twin-tubes.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'twin-tubes-core.js'));
const PV = (() => { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'place-value-core.js'), 'utf8'), ctx); return ctx.window.PlaceValueCore; })();
const ACT = (() => { const ctx = { window: { PlaceValueCore: PV }, TwinTubesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'twin-tubes-activity.js'), 'utf8') + '\n;this.__A = window.TwinTubesActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const CP = (loc, p, k) => T(loc, 'c' + 'HTO'[p] + (k === 0 ? '0' : k === 1 ? '1' : 'n'), { k });
const W = (loc, n) => PV._NUMBER_WORD_HELPERS[loc](n, 'cardinal');
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
    await page.goto(`${base}/twin-tubes-activity.html?activity=match-pairs.three-ways-to-show-a-number.2-nbt-a-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TwinTubesActivity && window.TwinTubesActivity.st && document.querySelector('.tt-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.TwinTubesActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, cards, nums, k) {
    const ok = await page.evaluate((cards, nums, k) => {
      const a = window.TwinTubesActivity; a.api.settings.cards = cards; a.api.settings.nums = nums; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.cards === cards && a.st.k === k && (cards === 'digits' || a.st.nums === nums);
    }, cards, nums, k);
    if (!ok) throw new Error('force failed ' + cards + '/' + nums + '/' + k);
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(10); return true;
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.TwinTubesActivity.st)));
  const noteT = async (page) => sp(await page.$eval('.tt-note', e => e.textContent));
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const tap = (page, k, what) => click(page, `[data-k="${k}"]`, what);
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });
  /* solve a key by taps: num/lit + word → pair; pair + exp/val → triple */
  const solveKey = async (page, key, what) => { await tap(page, 'n' + key, what); await tap(page, 'w' + key, what); await tap(page, 'pair-' + key, what); await tap(page, 'e' + key, what); };

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 247, 274, 427 */
    await force(page, 'three', 'nozero', 0);
    is((await count(page, '.tt-card')) === 9 && (await count(page, '.tt-frost')) === 0, `${loc}: nine cards, an empty stand`);
    is(sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent).catch(() => '')) === sp(T(loc, 'pThree')), `${loc}: the task line`);
    await tap(page, 'n0', loc + ' one'); is((await noteT(page)) === sp(T(loc, 'hSecond')) && (await st(page)).cradles[0] === 'n0', `${loc}: one card → put a second card`);
    await tap(page, 'e1', loc + ' diff'); let s = await st(page);
    const diff = T(loc, 'diffT', { a: CP(loc, 1, 4), b: CP(loc, 1, 7) });
    is(s.last && s.last.result === 'uneven' && (await noteT(page)) === sp(diff) && (await count(page, '.tt-glass.is-ring')) === 2 && (await page.$$eval('.tt-num', a => a.map(e => e.textContent).join())) === '4,7', `${loc}: 247 against 200 + 70 + 4 → «${diff}», the tens ringed, 4 and 7 beside them`);
    await tap(page, 'cradle-1', loc + ' out'); s = await st(page);
    is(s.cradles[1] == null && (await noteT(page)) === '' && (await count(page, '.tt-glass.is-ring')) === 0, `${loc}: a card taken out of the stand`);
    await force(page, 'three', 'nozero', 0); await tap(page, 'n0', loc); await tap(page, 'w1', loc + ' frost'); s = await st(page);
    const hint = sp(T(loc, 'notT') + ' ' + T(loc, 'hasCard', { count: CP(loc, 1, 4) }));
    is((await noteT(page)) === hint && (await count(page, '.tt-frost')) === 3 && (await page.$$eval('.tt-num', a => a.map(e => e.textContent).join())) === '4,?', `${loc}: the word for 274 pours into frosted glass → «${hint}»`);
    await tap(page, 'cradle-1', loc); await tap(page, 'e2', loc + ' miss2'); s = await st(page);
    is(s.help && (await noteT(page)) === sp(T(loc, 'miss2')) && (await count(page, '.tt-split')) === 2 && (await page.$$eval('.tt-split span', a => a.map(e => e.textContent).join('|'))) === '200|40|7|400|20|7', `${loc}: a second miss → each part written over its tube (200|40|7 against 400|20|7)`);
    await tap(page, 'cradle-1', loc); await tap(page, 'w0', loc + ' pair'); s = await st(page);
    is(s.found[0] && s.found[0].ids.length === 2 && (await noteT(page)) === sp(T(loc, 'okPair')) && (await count(page, '.tt-frost')) === 0 && (await count(page, '[data-k="pair-0"]')) === 1 && (await count(page, '.tt-fill')) === 6, `${loc}: 247 with its word → a pair, the frost melts, the pair on the shelf`);
    await tap(page, 'pair-0', loc); await tap(page, 'e0', loc + ' triple'); s = await st(page);
    const tri = T(loc, 'okTriple', { numeral: '247', word: W(loc, 247), expanded: '200 + 40 + 7' });
    is(s.found[0].ids.length === 3 && (await noteT(page)) === sp(tri) && (await count(page, '.tt-fan')) === 1, `${loc}: the pair and 200 + 40 + 7 → «${tri}»`);
    await page.evaluate(() => { window.TwinTubesActivity.OK_MS = 500; });
    await solveKey(page, 1, loc); await solveKey(page, 2, loc); s = await st(page);
    is(s.done && (await noteT(page)) === sp(T(loc, 'okTriple', { numeral: '427', word: W(loc, 427), expanded: '400 + 20 + 7' })), `${loc}: three triples → the round line`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.TwinTubesActivity.OK_MS = 600000; });
    /* with zeros: 305 */
    await force(page, 'three', 'zeros', 0);
    is(sp(await page.$eval('[data-k="e0"]', e => e.textContent)) === '300 + 5', `${loc}: 305 is written 300 + 5`);
    await tap(page, 'n0', loc); await tap(page, 'e0', loc + ' zero'); s = await st(page);
    is(s.found[0] && (await page.$$eval('.tt-half', h => h.map(x => x.querySelectorAll('.tt-fill').length).join())) === '2,2', `${loc}: 305 and 300 + 5 clip — the tens tubes stay dry`);
    /* digit values: 721 */
    await force(page, 'digits', 'nozero', 0);
    is(sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent).catch(() => '')) === sp(T(loc, 'pDigit')) && (await count(page, '.tt-lit')) === 3, `${loc}: digit values — three coloured digits`);
    await tap(page, 'n0', loc); await tap(page, 'e0', loc); await tap(page, 'pair-0', loc); await tap(page, 'w0', loc + ' digit'); s = await st(page);
    const dl = T(loc, 'okDigit', { d: 7, numeral: 721, value: 700 });
    is(s.found[0] && s.found[0].ids.length === 3 && (await noteT(page)) === sp(dl), `${loc}: «${dl}»`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const [cards, nums] of [['three', 'nozero'], ['three', 'zeros'], ['digits', 'nozero']]) for (let k = 0; k < C.rounds(cards, nums).length; k++) {
      await force(sw.page, cards, nums, k);
      for (const state of ['rest', 'miss', 'solved']) {
        if (state === 'miss') { await tap(sw.page, 'n0', ''); await tap(sw.page, 'e1', ''); }
        if (state === 'solved') { await tap(sw.page, 'cradle-1', ''); await tap(sw.page, 'cradle-0', ''); for (const key of [0, 1, 2]) await solveKey(sw.page, key, `${loc} ${cards}/${nums} r${k + 1}`); }
        const s2 = await st(sw.page), tag = `${loc} ${cards}/${nums} r${k + 1} ${state}`;
        if (state === 'miss') is(s2.last && s2.last.result === 'uneven', `${tag}: reached`);
        if (state === 'solved') is(s2.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.TwinTubesActivity, d = a._dims(), c = document.querySelector('.tt-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.tt-wrap button')).filter(vis).forEach(b => { const r = b.getBoundingClientRect(), k = b.getAttribute('data-k') || b.className; if (r.width < 43.5 || r.height < 43.5) F('small ' + k + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + k); if (b.scrollWidth > b.clientWidth + 1) F('clipped card text ' + k + ' «' + b.textContent.slice(0, 24) + '»'); });
            if (state === 'rest') document.querySelectorAll('.tt-cradle').forEach(c => { if (c.getBoundingClientRect().bottom > vh + 1) F('the stand below the fold ' + Math.round(c.getBoundingClientRect().bottom)); });
            const nt = document.querySelector('.tt-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            if (vis(nt) && !(nt.classList.contains('is-ok') && !nt.classList.contains('is-step')) && nt.scrollWidth > nt.clientWidth + 1) F('clipped hint');
            document.querySelectorAll('.tt-deck, .tt-stand, .tt-shelf, .tt-tubes, .tt-split').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1)) F('outside the card ' + e.className.split(' ')[0]); });
            document.querySelectorAll('.tt-half').forEach(h => { const hr = h.getBoundingClientRect(); h.querySelectorAll('.tt-tubes, .tt-cradle, .tt-split').forEach(t => { const r = t.getBoundingClientRect(); if (r.left < hr.left - 1 || r.right > hr.right + 1) F('a ' + t.getAttribute('class').split(' ')[0] + ' outside its half'); }); });
            const halves = Array.from(document.querySelectorAll('.tt-half')).map(h => h.getBoundingClientRect()); if (halves.length === 2 && halves[0].right > halves[1].left + 1 && halves[0].bottom > halves[1].top + 1) F('the two halves overlap'); const sr = document.querySelector('.tt-stand').getBoundingClientRect(); document.querySelectorAll('.tt-half').forEach(h => { const r = h.getBoundingClientRect(); if (r.left < sr.left - 1 || r.right > sr.right + 1) F('a half outside the stand'); });
            return out;
          }, state);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await sw.page.waitForFunction(() => document.querySelector('.tt-wrap').classList.contains('is-wide'), { timeout: 4000 }).catch(() => {}); await wait(80);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-twin-tubes: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
