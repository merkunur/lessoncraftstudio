#!/usr/bin/env node
/* =====================================================================
   local-test-replay-track.js — ACTIVITY #136, The Replay Track (Story
   Problems, 2.OA.A.1), in a real browser with real pointer clicks, in
   all 11 locales.
   Scenarios per locale (at 1024):
     · Replay with an empty box: the hint, no miss, the blank "?" bar;
     · the keypad types into the box and the "?" chip mirrors it; ⌫;
     · a wrong number (adding the told numbers): the bar misses its flag,
       the gap is shaded, the miss line names the number and the flag;
       again → miss 2: the help outlines the place, never a numeral;
       a new digit takes the help away;
     · the right number: every flag hit, the bond and the equation, the
       success line, Next 0.5 s later; then free play is not judged;
     · the step dots scrub the replay; ← → too;
     · flags "only on replay": no told flag before Replay; "from the
       start": the told flag stands at rest;
     · every setting changes the stories.
   Then every round of every setting at rest, at miss 2 and solved —
   reached ONCE per locale by real clicks, then resized through 320…1366:
   no sideways scroll, Replay and every key above the fold at rest, the
   hint in view at miss 2, the equation in view when solved, controls
   ≥ 44 px, nothing outside the card, the story never clipped, numerals
   on the ruler legible, unit squares never below 11 px, no console errors.
   Usage: node scripts/local-test-replay-track.js [--widths=…] [--locales=…] [--sets=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const SETS = arg('sets', 'w20,w100,two,groups').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'replay-track-core.js'));
const ACT = (() => { const ctx = { window: {}, ReplayTrackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'replay-track-activity.js'), 'utf8') + '\n;this.__A = window.ReplayTrackActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
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
    await page.goto(`${base}/replay-track-activity.html?activity=numberbond.story-problem.2-oa-a-1&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.ReplayTrackActivity && window.ReplayTrackActivity.st && document.querySelector('.rt-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.ReplayTrackActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, set, r, flags) {
    const ok = await page.evaluate((set, r, flags) => {
      const a = window.ReplayTrackActivity; a.api.settings.story = set; a.api.settings.flags = flags || 'first'; a._pool = null; a._ensurePool();
      a._start(r); a._render2(); window.scrollTo(0, 0); return a.st.set === set && a.st.r === r;
    }, set, r, flags);
    if (!ok) throw new Error('force failed ' + set + ' ' + r);
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(20); return true;
  }
  const typeNum = async (page, n, what) => { for (const d of String(n)) await click(page, `[data-k="key-${d}"]`, what + ' key ' + d); };
  const clear = async (page) => { for (let i = 0; i < 3; i++) { const t = await page.evaluate(() => window.ReplayTrackActivity.st.typed); if (!t) break; await click(page, '[data-k="key-del"]', 'del'); } };
  const st = (page) => page.evaluate(() => { const s = window.ReplayTrackActivity.st; return { typed: s.typed, misses: s.misses, help: s.help, done: s.done, last: s.last && s.last.result }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.rt-note'); return { t: n.textContent, cls: n.className }; });

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* Tom's marbles: ? + 17 = 45 */
    await force(page, 'w100', 8, 'first');
    is(await page.$('.rt-flag.is-told') !== null, `${loc}: flags from the start — the told flag stands at rest`);
    await click(page, '[data-k="replay"]', loc + ' empty replay'); let s = await st(page);
    is(s.misses === 0 && sp((await note(page)).t) === sp(T(loc, 'hEmpty')) && await page.$('.rt-blank') !== null, `${loc}: Replay with an empty box — the hint, the blank bar, no miss`);
    await typeNum(page, 62, loc + ' type 62'); s = await st(page);
    is(s.typed === '62' && sp(await page.$eval('.rt-box', e => e.textContent)) === '62' && sp(await page.$eval('[data-k="qchip"]', e => e.textContent)) === '62' && await page.$('.rt-blank') === null, `${loc}: the keypad types 62, the box and the "?" chip show it, the empty replay is gone`);
    await click(page, '[data-k="key-del"]', loc + ' del'); s = await st(page); is(s.typed === '6', `${loc}: ⌫ deletes a digit`);
    await typeNum(page, 2, loc + ' type 2');
    await click(page, '[data-k="replay"]', loc + ' replay 62'); s = await st(page);
    is(s.misses === 1 && !s.help && sp((await note(page)).t) === sp(T(loc, 'miss1', { guess: 62, flag: 45 })) && await page.$('.rt-gap') !== null && await page.$('.rt-flag.is-miss') !== null, `${loc}: adding the told numbers (62) — the bar overshoots the 45 flag, the gap shows, the miss line`);
    await click(page, '[data-k="replay"]', loc + ' replay 62 again'); s = await st(page);
    const helpText = await page.$$eval('.rt-help text', x => x.length);
    is(s.misses === 2 && s.help && sp((await note(page)).t) === sp(T(loc, 'miss2', { flag: 45 })) && await page.$('.rt-region') !== null && helpText === 0, `${loc}: miss 2 — the help outlines the place, no numeral`);
    await click(page, '[data-k="key-1"]', loc + ' digit'); s = await st(page);
    is(!s.help && await page.$('.rt-region') === null, `${loc}: a new digit takes the help away`);
    /* scrub after a replay */
    await clear(page); await typeNum(page, 30, loc + ' type 30'); await click(page, '[data-k="replay"]', loc + ' replay 30');
    await click(page, '[data-k="step-0"]', loc + ' step 0');
    let k = await page.evaluate(() => window.ReplayTrackActivity._view.k);
    is(k === 1 && await page.$('[data-k="step-0"].is-now') !== null, `${loc}: a step dot scrubs the replay back to step one`);
    await page.focus('.rt-wrap'); await page.keyboard.press('ArrowRight'); k = await page.evaluate(() => window.ReplayTrackActivity._view.k);
    is(k === 2, `${loc}: → steps the replay on`);
    /* the right number */
    await page.evaluate(() => { window.ReplayTrackActivity.OK_MS = 500; });
    await clear(page); await typeNum(page, 28, loc + ' type 28'); await click(page, '[data-k="replay"]', loc + ' replay 28'); s = await st(page);
    const eq = sp(await page.$eval('.rt-eq', e => e.textContent).catch(() => ''));
    is(s.done && /is-ok/.test((await note(page)).cls) && sp((await note(page)).t) === sp(T(loc, 'ok', { answer: 28 })) && eq === '28 + 17 = 45' && (await page.$$('.rt-bond .rt-bc')).length === 3 && (await page.$$('.rt-flag.is-hit')).length >= 1, `${loc}: 28 — every flag hit, the bond and «${eq}», the success line`);
    await wait(1100);
    is(await page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); }), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.ReplayTrackActivity.OK_MS = 600000; });
    const mBefore = (await st(page)).misses; await clear(page); await typeNum(page, 50, loc + ' free'); await click(page, '[data-k="replay"]', loc + ' free replay'); s = await st(page);
    is(s.done && s.last === 'free' && s.misses === mBefore && !/is-hint/.test((await note(page)).cls), `${loc}: after success, a replay is free play — not judged`);
    /* flags only on replay */
    await force(page, 'w100', 1, 'replay');
    is(await page.$('.rt-flag') === null && await page.$('.rt-num') === null && await page.$('.rt-axis') !== null, `${loc}: the track only on replay — a blank ruler, no flag before Replay`);
    await typeNum(page, 20, loc + ' books'); await click(page, '[data-k="replay"]', loc + ' books replay');
    is(await page.$('.rt-flag.is-hit') !== null && await page.$('.rt-num') !== null && (await st(page)).done, `${loc}: …and the numbers and the flag come with the replay`);
    /* the settings change the stories */
    for (const set of ['w20', 'two', 'groups']) { await force(page, set, 0, 'first'); const txt = sp(await page.$eval('.rt-story', e => e.textContent)), want = ACT.stories[set][loc][0]; is(txt.replace(/[’ ]/g, '').indexOf(sp(want).replace(/['  ]/g, '').slice(0, 0)) >= 0 && sp(txt).replace(/[^\p{L}\d]/gu, '').indexOf(sp(want).replace(/[^\p{L}\d]/gu, '')) === 0, `${loc}: the ${set} setting shows its own stories`); }
    /* sharing deals the told number of shares; making groups cuts told-size pieces */
    await force(page, 'groups', 5, 'first'); await typeNum(page, 5, loc + ' share'); await click(page, '[data-k="replay"]', loc + ' share replay');
    is(await page.$$eval('.rt-you', x => x.length) === 4, `${loc}: sharing 24 among 4 deals four shares of your number`);
    await force(page, 'groups', 8, 'first'); await typeNum(page, 5, loc + ' group'); await click(page, '[data-k="replay"]', loc + ' group replay');
    is(await page.$$eval('.rt-you', x => x.length) === 5, `${loc}: 4 eggs in each box, 5 boxes — five pieces of 4`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const set of SETS) for (let r = 0; r < C.rounds(set).length; r++) {
      const rd = C.rounds(set)[r], ans = C.answer(rd), wrong = rd.told.reduce((a, b) => a + b, 0) === ans ? ans + 1 : rd.told.reduce((a, b) => a + b, 0);
      await force(sw.page, set, r, 'first');
      for (const state of ['rest', 'miss2', 'solved']) {
        if (state === 'miss2') { await typeNum(sw.page, wrong, `${loc} ${set} r${r + 1}`); await click(sw.page, '[data-k="replay"]', ''); await click(sw.page, '[data-k="replay"]', ''); }
        if (state === 'solved') { await clear(sw.page); await typeNum(sw.page, ans, `${loc} ${set} r${r + 1}`); await click(sw.page, '[data-k="replay"]', ''); }
        const s2 = await st(sw.page), tag = `${loc} ${set} r${r + 1} ${state}`;
        if (state === 'miss2') is(s2.help, `${tag}: reached`);
        if (state === 'solved') is(s2.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.ReplayTrackActivity, d = a._dims(), c = document.querySelector('.rt-wrap').classList, svg = document.querySelector('.rt-svg'); return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp && svg && Math.abs(+svg.getAttribute('width') - Math.max(240, d.W)) < 2; }, { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state, set) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x);
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.rt-wrap button')).filter(b => b.offsetParent !== null).forEach(b => { const r = b.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) F('small ' + (b.getAttribute('data-k') || b.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + b.getAttribute('data-k')); if (state === 'rest' && r.bottom > vh + 1 && !/^step/.test(b.getAttribute('data-k') || '')) F('below the fold ' + b.getAttribute('data-k') + ' ' + Math.round(r.bottom)); });
            const nt = document.querySelector('.rt-note');
            if (state === 'miss2' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            if (state === 'solved') { const e = document.querySelector('.rt-eq'); if (!e) F('no equation'); else if (e.getBoundingClientRect().bottom > vh + 1) F('the equation below the fold ' + Math.round(e.getBoundingClientRect().bottom)); }
            const cd = document.querySelector('.rt-card'); if (cd.scrollHeight > cd.clientHeight + 1 || cd.scrollWidth > cd.clientWidth + 1) F('the story is clipped');
            document.querySelectorAll('.rt-note:not(.is-ok), .rt-eq').forEach(e => { if (e.offsetParent && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            const trEl = document.querySelector('.rt-track'), shown = trEl.offsetParent !== null; if (state === 'solved' && !shown && !document.querySelector('.rt-bond')) F('the track folded away with no bond'); const tr = trEl.getBoundingClientRect(), svg = document.querySelector('.rt-svg').getBoundingClientRect();
            if (shown && (svg.right > tr.right + 1 || svg.left < tr.left - 1)) F('the track drawn outside its box');
            Array.from(document.querySelectorAll('.rt-svg text')).forEach(t => { const q = t.getBoundingClientRect(); if (q.width && (q.right > tr.right + 1 || q.left < tr.left - 1)) F('a label outside the track «' + t.textContent + '»'); });
            const nums = !shown ? [] : Array.from(document.querySelectorAll('.rt-num')).map(t => t.getBoundingClientRect()); if (nums.some(q => q.height < 12)) F('ruler numerals too small');
            for (let i = 1; i < nums.length; i++) if (nums[i].left < nums[i - 1].right - 1) F('ruler numerals overlap');
            const u = Array.from(document.querySelectorAll('.rt-unit')).find(c => c.getBoundingClientRect().width > 0); if (u && u.getBoundingClientRect().width < 11) F('unit squares below 11 px: ' + u.getBoundingClientRect().width.toFixed(1));
            const pic = document.querySelector('.rt-pic'); if (pic && pic.getBoundingClientRect().width < 50) F('picture below 50 px');
            if (state === 'miss2' && document.querySelectorAll('.rt-help text').length) F('the help prints a numeral');
            return out;
          }, state, set);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await wait(100);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-replay-track: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
