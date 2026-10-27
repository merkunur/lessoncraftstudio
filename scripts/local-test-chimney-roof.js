#!/usr/bin/env node
/* =====================================================================
   local-test-chimney-roof.js — ACTIVITY #137, The Chimney Roof (Even or
   Odd?, 2.OA.C.3), in a real browser with real pointer clicks, in all 11
   locales.
   Scenarios per locale (at 1024):
     · a roof before the bricks are poured: "pour first", no miss;
     · the bag poured brick by brick by real taps; a tap on the tower sends
       one back; a held press pours on its own;
     · the wrong roof falls: the top glows, miss 1; again: miss 2, every
       layer's pair bracketed and the lone brick ringed; the right roof
       fits with its line;
     · the equation: Check with empty boxes, 6 + 7 for 13 refused as
       unequal, 6 + 6 + 1 → the success line, Next 0.5 s later;
     · the roof chosen before the tower hovers, then lands on the last
       brick;
     · to 99: wrong roofs on the shelf fall back while a right one stays;
       four right roofs → the street, the line, Next;
     · numbers to 10 change the rounds.
   Then every round of every setting at rest, after a fallen roof, at the
   equation and solved — reached ONCE per locale by real clicks, then
   resized through 320…1366: no sideways scroll, the bag, the roofs and
   Check above the fold, the hint in view, controls ≥ 44 px, nothing
   outside the card, bricks never below 18 px tall, no console errors.
   Usage: node scripts/local-test-chimney-roof.js [--widths=…] [--locales=…] [--nums=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const NUMS = arg('nums', '10,20,99').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'chimney-roof-core.js'));
const ACT = (() => { const ctx = { window: {}, ChimneyRoofCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'chimney-roof-activity.js'), 'utf8') + '\n;this.__A = window.ChimneyRoofActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 150) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/chimney-roof-activity.html?activity=choice-board.even-odd.2-oa-c-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.ChimneyRoofActivity && window.ChimneyRoofActivity.st && document.querySelector('.cr-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.ChimneyRoofActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, num, roof, r) {
    const ok = await page.evaluate((num, roof, r) => {
      const a = window.ChimneyRoofActivity; a.api.settings.num = num; a.api.settings.roof = roof; a._pool = null; a._plan = null; a._ensurePool();
      a._start(r); a._render2(); window.scrollTo(0, 0); return a.st.num === num && a.st.r === r;
    }, num, roof, r);
    if (!ok) throw new Error('force failed');
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    let b = await h.boundingBox(); if (!b) { await wait(120); const h2 = await page.$(sel); b = h2 && await h2.boundingBox(); } if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; } await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(15); return true;
  }
  const st = (page) => page.evaluate(() => { const s = window.ChimneyRoofActivity.st; return JSON.parse(JSON.stringify({ n: s.n, poured: s.poured, roof: s.roof, hover: s.hover, phase: s.phase, misses: s.misses, eqMisses: s.eqMisses, help: s.help, done: s.done, eq: s.eq, bags: s.bags, last: s.last })); });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.cr-note'); return { t: n.textContent, cls: n.className }; });
  const pourAll = async (page, n, what) => { for (let i = 0; i < n; i++) await click(page, '[data-k="bag"]', what); };
  const typeNum = async (page, box, v, what) => { await click(page, `[data-k="box-${box}"]`, what); for (const d of String(v)) await click(page, `[data-k="key-${d}"]`, what); };

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 13 (to 20, round 2) */
    await force(page, '20', 'after', 2); let s = await st(page);
    await click(page, '[data-k="roof-chimney"]', loc + ' roof early'); s = await st(page);
    is(s.misses === 0 && !s.roof && sp((await note(page)).t) === sp(T(loc, 'hPour')), `${loc}: a roof before the bricks — "pour first", no miss`);
    await pourAll(page, 13, loc + ' pour'); s = await st(page);
    is(s.poured === 13 && (await page.$$('.cr-brick')).length === 13, `${loc}: 13 taps on the bag pour 13 bricks`);
    await click(page, '[data-k="tower"]', loc + ' send back'); s = await st(page); is(s.poured === 12, `${loc}: a tap on the tower sends a brick back`);
    await click(page, '[data-k="bag"]', loc + ' pour again');
    await click(page, '[data-k="roof-flat"]', loc + ' wrong roof'); s = await st(page);
    is(s.misses === 1 && !s.roof && sp((await note(page)).t) === sp(T(loc, 'miss1')) && await page.$('.cr-brick.is-glow') !== null, `${loc}: the flat roof on 13 falls — the lone brick glows, miss 1`);
    await click(page, '[data-k="roof-flat"]', loc + ' wrong roof 2'); s = await st(page);
    is(s.help && sp((await note(page)).t) === sp(T(loc, 'miss2')) && (await page.$$('.cr-pair')).length === 6 && await page.$('.cr-ring') !== null, `${loc}: miss 2 — six pairs bracketed, the lone brick ringed`);
    await click(page, '[data-k="roof-chimney"]', loc + ' right roof'); s = await st(page);
    is(s.roof === 'chimney' && s.phase === 'eq' && sp((await note(page)).t) === sp(T(loc, 'roofChim')) && await page.$('.cr-chim') !== null && await page.$('.cr-one') !== null, `${loc}: the chimney roof fits — the "+ 1" card appears`);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text') ? document.querySelector('.lcs-activity-prompt-text').textContent : '')) === sp(T(loc, 'tEq')), `${loc}: the task line asks for the two equal parts`);
    await click(page, '[data-k="check"]', loc + ' check empty'); s = await st(page);
    is(s.eqMisses === 0 && sp((await note(page)).t) === sp(T(loc, 'hEq')), `${loc}: Check with empty boxes — the hint, no miss`);
    await typeNum(page, 0, 6, loc + ' 6'); await typeNum(page, 1, 7, loc + ' 7');
    await click(page, '[data-k="check"]', loc + ' check 6+7'); s = await st(page);
    is(!s.done && s.eqMisses === 1 && sp((await note(page)).t) === sp(T(loc, 'eqUnequal')) && (await page.$$('.cr-count')).length === 2, `${loc}: 6 + 7 for 13 is refused — two unequal parts`);
    await click(page, '[data-k="box-1"]', loc + ' box 1'); await click(page, '[data-k="key-del"]', loc + ' del'); await click(page, '[data-k="key-6"]', loc + ' 6');
    await page.evaluate(() => { window.ChimneyRoofActivity.OK_MS = 500; });
    await click(page, '[data-k="check"]', loc + ' check 6+6'); s = await st(page);
    is(s.done && /is-ok/.test((await note(page)).cls) && sp((await note(page)).t) === sp(T(loc, 'okOdd', { n: 13, a: 6 })), `${loc}: 13 = 6 + 6 + 1 — the success line`);
    await wait(1100);
    is(await page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); }), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.ChimneyRoofActivity.OK_MS = 600000; });
    /* a held press pours on its own */
    await force(page, '20', 'after', 8);
    { const b = await (await page.$('[data-k="bag"]')).boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await wait(1300); await page.mouse.up(); await wait(50); }
    s = await st(page); is(s.poured >= 4, `${loc}: holding the bag pours on its own (${s.poured})`);
    /* before the tower: the roof hovers, then lands on the last brick */
    await force(page, '20', 'before', 3); s = await st(page);
    await click(page, '[data-k="roof-chimney"]', loc + ' hover'); await click(page, '[data-k="roof-flat"]', loc + ' swap');
    is(await page.$('.cr-roofg.is-hovering') !== null && (await st(page)).hover === 'flat', `${loc}: before the tower the roof hovers and can be swapped`);
    await pourAll(page, 14, loc + ' pour 14'); s = await st(page);
    is(s.roof === 'flat' && s.phase === 'eq', `${loc}: the hovering roof lands on the last brick of 14 and fits`);
    /* to 99 */
    await force(page, '99', 'after', 0); s = await st(page);
    is((await page.$$('.cr-slab')).length === s.bags.reduce((a, b) => a + Math.floor(b.n / 10), 0) && (await page.$$('.cr-brick')).length === 0, `${loc}: to 99 — the tens stand as slabs, the ones still in the bags`);
    await click(page, '[data-k="roof-flat"]', loc + ' sel flat'); for (let i = 0; i < 4; i++) await click(page, `[data-k="bag-${i}"]`, loc + ' seat');
    await click(page, '[data-k="pour"]', loc + ' pour 99'); s = await st(page);
    const wrong = s.bags.map((b, i) => b.n % 2 ? i : -1).filter(i => i >= 0);
    is(s.misses === 1 && s.bags.every((b, i) => b.landed === (b.n % 2 === 0)) && sp((await note(page)).t) === sp(T(loc, 'miss99')) && (await page.$$('.cr-bag99.is-fell')).length === wrong.length, `${loc}: flat roofs on all four — the odd ones fall back, the even ones stay`);
    await click(page, '[data-k="roof-chimney"]', loc + ' sel chimney'); for (const i of wrong) await click(page, `[data-k="bag-${i}"]`, loc + ' reseat');
    await page.evaluate(() => { window.ChimneyRoofActivity.OK_MS = 500; });
    await click(page, '[data-k="pour"]', loc + ' pour again'); s = await st(page);
    is(s.done && sp((await note(page)).t) === sp(T(loc, 'ok99')) && (await page.$$('.cr-house .cr-roof')).length === 4, `${loc}: four right roofs — the street, the line`);
    await wait(1100);
    is(await page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); }), `${loc}: to 99 — Next 0.5 s after the result`);
    await page.evaluate(() => { window.ChimneyRoofActivity.OK_MS = 600000; });
    await force(page, '10', 'after', 0); s = await st(page); is(s.n === 2 && (await page.$('[data-k="bag"] .cr-tagn')) !== null, `${loc}: numbers to 10`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const num of NUMS) for (let r = 0; r < C.rounds(num).length; r++) {
      await force(sw.page, num, 'after', r);
      const states = num === '99' ? ['rest', 'miss', 'solved'] : ['rest', 'miss', 'eq', 'solved'];
      for (const state of states) {
        let s2 = await st(sw.page);
        if (num !== '99') {
          const n = s2.n, right = n % 2 ? 'chimney' : 'flat', wrongR = n % 2 ? 'flat' : 'chimney', h = Math.floor(n / 2);
          if (state === 'miss') { await pourAll(sw.page, n, ''); await click(sw.page, `[data-k="roof-${wrongR}"]`, ''); await click(sw.page, `[data-k="roof-${wrongR}"]`, ''); }
          if (state === 'eq') await click(sw.page, `[data-k="roof-${right}"]`, '');
          if (state === 'solved') { await typeNum(sw.page, 0, h, ''); await typeNum(sw.page, 1, h, ''); await click(sw.page, '[data-k="check"]', ''); }
        } else {
          if (state === 'miss') { await click(sw.page, '[data-k="roof-flat"]', ''); for (let i = 0; i < 4; i++) await click(sw.page, `[data-k="bag-${i}"]`, ''); await click(sw.page, '[data-k="pour"]', ''); }
          if (state === 'solved') { s2 = await st(sw.page); await click(sw.page, '[data-k="roof-chimney"]', ''); for (let i = 0; i < 4; i++) if (!s2.bags[i].landed) await click(sw.page, `[data-k="bag-${i}"]`, ''); await click(sw.page, '[data-k="pour"]', ''); }
        }
        s2 = await st(sw.page); const tag = `${loc} ${num} r${r + 1} ${state}`;
        if (state === 'miss') is(s2.misses >= 1, `${tag}: reached`);
        if (state === 'eq') is(!!s2.roof, `${tag}: reached`);
        if (state === 'solved') is(s2.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.ChimneyRoofActivity, d = a._dims(), c = document.querySelector('.cr-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.cr-wrap button')).filter(vis).forEach(b => { const r = b.getBoundingClientRect(), k = b.getAttribute('data-k') || b.className; if (r.width < 43.5 || r.height < 43.5) F('small ' + k + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + k); });
            const need = state === 'rest' ? ['[data-k="bag"]', '[data-k="roof-flat"]', '[data-k="roof-chimney"]', '[data-k="pour"]'] : state === 'eq' ? ['[data-k="check"]'] : state === 'miss' ? ['[data-k="roof-flat"]', '[data-k="roof-chimney"]', '[data-k="pour"]'] : [];
            need.forEach(sel => { const e = document.querySelector(sel); if (vis(e) && e.getBoundingClientRect().bottom > vh + 1) F('below the fold ' + sel + ' ' + Math.round(e.getBoundingClientRect().bottom)); });
            const nt = document.querySelector('.cr-note'); if (state === 'miss' && nt.textContent.trim() && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            document.querySelectorAll('.cr-note:not(.is-ok), .cr-word, .cr-eq').forEach(e => { if (vis(e) && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            document.querySelectorAll('.cr-svg, .cr-house').forEach(s => { const r = s.getBoundingClientRect(); if (r.right > cr.right + 1 || r.left < cr.left - 1) F('a drawing outside the card'); });
            const br = Array.from(document.querySelectorAll('.cr-tower .cr-brick')).find(e => e.getBoundingClientRect().height > 0); if (br && br.getBoundingClientRect().height < (state === 'eq' || state === 'solved' ? 14 : 16)) F('bricks too small: ' + br.getBoundingClientRect().height.toFixed(1));
            const hb = Array.from(document.querySelectorAll('.cr-house .cr-brick')).find(e => e.getBoundingClientRect().height > 0); if (hb && hb.getBoundingClientRect().height < 9) F('street bricks too small: ' + hb.getBoundingClientRect().height.toFixed(1));
            const tags = Array.from(document.querySelectorAll('.cr-tagn')).filter(t => t.getBoundingClientRect().height > 0); if (tags.some(t => t.getBoundingClientRect().height < 14)) F('bag numerals too small');
            return out;
          }, state);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await sw.page.waitForFunction(() => document.querySelector('.cr-wrap').classList.contains('is-wide'), { timeout: 4000 }).catch(() => {}); await wait(80);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-chimney-roof: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
