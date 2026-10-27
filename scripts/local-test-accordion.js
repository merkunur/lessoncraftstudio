#!/usr/bin/env node
/* =====================================================================
   local-test-accordion.js — ACTIVITY #139, The Accordion Sentence (Equal
   Groups, 2.OA.C.4), in a real browser with real pointer actions, in all
   11 locales.
   Scenarios per locale (at 1024):
     · Level 1, 3 groups of 4: Check on empty trays (no miss); taps add
       beads, 4 / 4 / 5; the squeeze springs back; a held press takes one
       out; the squeeze folds — one face of 4, the stamp "3 × 4"; a wrong
       total (the running totals on the creases); another (miss 2, the
       beads in one row); 12 → the success line, Next 0.5 s later;
     · Level 2 fix round with the totals shown: Check before fixing (the odd
       tray wobbles); a held press fixes it; a wrong crease window (it
       shakes, the line names the one before it); the right ones → done;
     · Level 2 with the totals hidden: no windows, the total alone → done;
     · Level 3 array: no trays to edit, no stamp before success; right
       factors with a wrong product → missTotal; 6 × 5 = 30 → the rows line.
   Then every round of every level at rest, at a miss and solved — reached
   ONCE per locale by real clicks, then resized through 320…1366: no
   sideways scroll, controls above the fold at rest, the hint in view,
   controls ≥ 44 px, nothing outside the card, trays large enough, no
   console errors.
   Usage: node scripts/local-test-accordion.js [--widths=…] [--locales=…] [--levels=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', '1,2,3').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'accordion-core.js'));
const ACT = (() => { const ctx = { window: {}, AccordionCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'accordion-activity.js'), 'utf8') + '\n;this.__A = window.AccordionActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
const DOT = /^(de|sv|da|no|fi)$/;
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
    await page.goto(`${base}/accordion-activity.html?activity=array.equal-groups.2-oa-c-4&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.AccordionActivity && window.AccordionActivity.st && document.querySelector('.ac-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.AccordionActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, level, k, run, pass) {
    const ok = await page.evaluate((level, k, run, pass) => {
      const a = window.AccordionActivity; a.api.settings.level = level; a.api.settings.run = run; a._pool = null; a._ensurePool();
      a._start(k, pass); a._view.spring = false; a._render2(); window.scrollTo(0, 0); return a.st.level === level && a.st.k === k;
    }, level, k, run || 'shown', pass || 0);
    if (!ok) throw new Error('force failed');
  }
  async function click(page, sel, what) {
    let h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    let b = await h.boundingBox(); if (!b) { await wait(120); h = await page.$(sel); b = h && await h.boundingBox(); }
    if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(15); return true;
  }
  async function hold(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return; }
    await page.evaluate(e => e.scrollIntoView({ block: 'center' }), h); const b = await h.boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await wait(700); await page.mouse.up(); await wait(30);
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.AccordionActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.ac-note'); return { t: n.textContent, cls: n.className }; });
  const typeIn = async (page, box, v, what) => { await click(page, `[data-k="${box}"]`, what); for (const d of String(v)) await click(page, `[data-k="key-${d}"]`, what); };
  const valOf = (s, box) => box === 'total' ? s.total : /^s/.test(box) ? s.sentence[+box[1]] : (s.windows[+box.slice(1)] || '');
  const clearBox = async (page, box) => { await click(page, `[data-k="${box}"]`, 'clear'); for (let i = 0; i < 3; i++) { if (!valOf(await st(page), box)) break; await click(page, '[data-k="key-del"]', 'del'); } };
  const tapN = async (page, i, n, what) => { for (let j = 0; j < n; j++) await click(page, `[data-k="tray-${i}"]`, what); };
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });
  const txt = (page, sel) => page.$$eval(sel, a => a.map(e => e.textContent));

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc), g = DOT.test(loc) ? '·' : '×';
    /* Level 1: 3 groups of 4 */
    await force(page, '1', 1, 'shown'); let s = await st(page);
    is(s.g === 3 && s.e === 4 && s.beads.join() === '0,0,0', `${loc}: L1 3 groups of 4, the trays empty`);
    is((await txt(page, '.ac-num')).length === 0 && (await txt(page, '.ac-run')).length === 0, `${loc}: no numeral on an empty pleat, no 0 anywhere`);
    await click(page, '[data-k="check"]', loc + ' empty'); s = await st(page);
    is(s.misses === 0 && sp((await note(page)).t) === sp(T(loc, 'hEmpty')), `${loc}: Check on empty trays — "beads first", no miss`);
    await tapN(page, 0, 4, loc); await tapN(page, 1, 4, loc); await tapN(page, 2, 5, loc); s = await st(page);
    is(s.beads.join() === '4,4,5', `${loc}: real taps fill the trays 4 / 4 / 5`);
    is((await txt(page, '.ac-num')).join() === '4,4,5' && (await txt(page, '.ac-run')).join() === '4,8', `${loc}: the pleats read 4 + 4 + 5 with the running totals 4, 8`);
    await click(page, '[data-k="squeeze"]', loc + ' squeeze'); s = await st(page);
    is(!s.folded && await page.$('.ac-strip.is-spring') !== null && await page.$('.ac-face') === null, `${loc}: unequal pleats spring back`);
    await hold(page, '[data-k="tray-2"]', loc + ' hold'); s = await st(page);
    is(s.beads.join() === '4,4,4', `${loc}: a held press takes one bead out (no bead added)`);
    await force(page, '1', 1, 'shown'); await tapN(page, 0, 4, loc); await tapN(page, 1, 4, loc); await tapN(page, 2, 4, loc);
    await click(page, '[data-k="squeeze"]', loc + ' fold'); s = await st(page);
    is(s.folded && (await txt(page, '.ac-facenum')).join() === '4' && sp((await txt(page, '.ac-times')).join()) === `3 ${g} 4` && (await page.$$('.ac-edge')).length === 3, `${loc}: equal pleats fold flat — one face of 4, three edges, the stamp 3 ${g} 4`);
    await typeIn(page, 'total', 13, loc); await click(page, '[data-k="check"]', loc + ' total'); s = await st(page);
    is(s.misses === 1 && sp((await note(page)).t) === sp(T(loc, "missTotal", { each: 4 })), `${loc}: a wrong total — miss 1 (${s.misses} ${s.total} «${(await note(page)).t}»)`);
    await click(page, '[data-k="check"]', loc + ' total2'); s = await st(page);
    is(s.help && sp((await note(page)).t) === sp(T(loc, 'miss2Total', { each: 4 })) && (await page.$$('.ac-rowbead')).length === 12 && (await txt(page, '.ac-rowrun')).join() === '4,8', `${loc}: miss 2 — the twelve beads in one row, counted on 4, 8`);
    await clearBox(page, 'total'); await typeIn(page, 'total', 12, loc);
    await page.evaluate(() => { window.AccordionActivity.OK_MS = 500; });
    await click(page, '[data-k="check"]', loc + ' ok'); s = await st(page);
    const okLine = T(loc, 'okGroups', { sum: '4 + 4 + 4', total: 12, groups: 3, each: 4 });
    is(s.done && /is-ok/.test((await note(page)).cls) && sp((await note(page)).t) === sp(okLine) && okLine.indexOf(`3 ${g} 4 = 12`) > 0, `${loc}: 12 — "${okLine}"`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.AccordionActivity.OK_MS = 600000; });
    /* Level 2 fix round, totals shown: 5 groups of 2, tray 3 holds 3 */
    await force(page, '2', 3, 'shown', 0); s = await st(page);
    is(s.fix && s.beads.join() === '2,2,3,2,2' && sp((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text') ? document.querySelector('.lcs-activity-prompt-text').textContent : ''))) === sp(T(loc, 'pFix')), `${loc}: L2 fix round arrives 2,2,3,2,2 with the number-free line`);
    await click(page, '[data-k="check"]', loc + ' fix early'); s = await st(page);
    is(s.misses === 1 && sp((await note(page)).t) === sp(T(loc, 'missUnequal')) && await page.$('[data-k="tray-2"].is-odd') !== null && await page.$('.ac-pleat.is-tall') !== null, `${loc}: Check before fixing — the odd tray and its tall pleat stand out`);
    await hold(page, '[data-k="tray-2"]', loc + ' fix'); s = await st(page); is(s.beads.join() === '2,2,2,2,2', `${loc}: a held press fixes the odd tray`);
    is((await page.$$('.ac-win')).length === 4, `${loc}: four crease windows to type`);
    await typeIn(page, 'w0', 2, loc); await typeIn(page, 'w1', 5, loc); await typeIn(page, 'w2', 6, loc); await typeIn(page, 'w3', 8, loc); await typeIn(page, 'total', 10, loc);
    await click(page, '[data-k="check"]', loc + ' run'); s = await st(page);
    is(sp((await note(page)).t) === sp(T(loc, s.help ? 'miss2Total' : 'missRun', { each: 2, previous: 2 })) && await page.$('[data-k="w1"].is-shake') !== null, `${loc}: a wrong crease window shakes, the line names the one before it`);
    await clearBox(page, 'w1'); await typeIn(page, 'w1', 4, loc); await click(page, '[data-k="check"]', loc + ' L2 ok'); s = await st(page);
    is(s.done && sp((await note(page)).t) === sp(T(loc, 'okGroups', { sum: '2 + 2 + 2 + 2 + 2', total: 10, groups: 5, each: 2 })), `${loc}: L2 — 2 + 2 + 2 + 2 + 2 = 10`);
    /* Level 2, totals hidden */
    await force(page, '2', 0, 'hidden', 0);
    is((await page.$$('.ac-win')).length === 0 && (await txt(page, '.ac-run')).length === 0, `${loc}: totals hidden — no windows, no running totals`);
    await typeIn(page, 'total', 6, loc); await click(page, '[data-k="check"]', loc + ' hidden ok'); is((await st(page)).done, `${loc}: totals hidden — 6 alone is enough`);
    /* Level 3 array 5 × 6 */
    await force(page, '3', 4, 'shown', 0);
    is((await page.$$('.ac-tray')).length === 0 && await page.$('.ac-array') !== null && (await txt(page, '.ac-times')).length === 0, `${loc}: L3 array — nothing to edit, no stamp to copy`);
    await click(page, '[data-k="squeeze"]', loc + ' L3 squeeze');
    is((await txt(page, '.ac-times')).length === 0 && (await page.$$('.ac-edge')).length === 5, `${loc}: L3 — the fold shows five edges, still no stamp`);
    await typeIn(page, 's0', 5, loc); await typeIn(page, 's1', 6, loc); await typeIn(page, 's2', 31, loc); await click(page, '[data-k="check"]', loc + ' L3 total');
    is(sp((await note(page)).t) === sp(T(loc, "missTotal", { each: 6 })), `${loc}: L3 — the right factors with a wrong product (${JSON.stringify((await st(page)).sentence)} «${(await note(page)).t}»)`);
    await clearBox(page, 's0'); await typeIn(page, 's0', 6, loc); await clearBox(page, 's1'); await typeIn(page, 's1', 5, loc); await clearBox(page, 's2'); await typeIn(page, 's2', 30, loc);
    await click(page, '[data-k="check"]', loc + ' L3 ok'); s = await st(page);
    is(s.done && sp((await note(page)).t) === sp(T(loc, 'okRows', { sum: '6 + 6 + 6 + 6 + 6', total: 30, rows: 5, cols: 6 })), `${loc}: L3 — 6 ${g} 5 = 30 also reads it; the rows line`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const lv of LEVELS) for (let k = 0; k < C.rounds(lv).length; k++) {
      await force(sw.page, lv, k, 'shown', 0);
      for (const state of ['rest', 'miss', 'solved']) {
        let s2 = await st(sw.page); const G = s2.g, E = s2.e, wins = lv === '2';
        if (state === 'miss') {
          if (lv === '1') { for (let i = 0; i < G; i++) await tapN(sw.page, i, E + (i === G - 1 ? 1 : 0), ''); await click(sw.page, '[data-k="check"]', ''); }
          else if (lv === '2') { if (!s2.fix) { for (let w = 0; w < G - 1; w++) await typeIn(sw.page, 'w' + w, E * (w + 1), ''); await typeIn(sw.page, 'total', G * E + 1, ''); } await click(sw.page, '[data-k="check"]', ''); }
          else { if (!s2.fix) { await typeIn(sw.page, 's0', G, ''); await typeIn(sw.page, 's1', E, ''); await typeIn(sw.page, 's2', G * E + 1, ''); } await click(sw.page, '[data-k="check"]', ''); }
        }
        if (state === 'solved') {
          if (lv === '1') { await hold(sw.page, `[data-k="tray-${G - 1}"]`, ''); await clearBox(sw.page, 'total'); await typeIn(sw.page, 'total', G * E, ''); }
          else {
            if (s2.fix) { const i = s2.odd; if (s2.beads[i] > E) await hold(sw.page, `[data-k="tray-${i}"]`, ''); else await click(sw.page, `[data-k="tray-${i}"]`, ''); }
            if (lv === '2') { if (wins && (await sw.page.$('[data-k="w0"]'))) for (let w = 0; w < G - 1; w++) { await clearBox(sw.page, 'w' + w); await typeIn(sw.page, 'w' + w, E * (w + 1), ''); } await clearBox(sw.page, 'total'); await typeIn(sw.page, 'total', G * E, ''); }
            else { for (const [bx, v] of [['s0', G], ['s1', E], ['s2', G * E]]) { await clearBox(sw.page, bx); await typeIn(sw.page, bx, v, ''); } }
          }
          await click(sw.page, '[data-k="check"]', '');
        }
        s2 = await st(sw.page); const tag = `${loc} L${lv} r${k + 1} ${state}`;
        if (state === 'miss') is(s2.misses >= 1, `${tag}: reached`);
        if (state === 'solved') is(s2.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.AccordionActivity, d = a._dims(), c = document.querySelector('.ac-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.ac-wrap button')).filter(vis).forEach(b => { const r = b.getBoundingClientRect(), k = b.getAttribute('data-k') || b.className; if (r.width < 43.5 || r.height < 43.5) F('small ' + k + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + k); if (state === 'rest' && r.bottom > vh + 1) F('below the fold ' + k + ' ' + Math.round(r.bottom)); });
            const nt = document.querySelector('.ac-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            const chk = document.querySelector('[data-k="check"]'); if (state === 'miss' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            document.querySelectorAll('.ac-note:not(.is-ok)').forEach(e => { if (vis(e) && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            document.querySelectorAll('.ac-board, .ac-strip, .ac-array, .ac-answer').forEach(e => { const r = e.getBoundingClientRect(); if (r.right > cr.right + 1 || r.left < cr.left - 1) F('a drawing outside the card ' + e.className.split(' ')[0]); });
            /* the windows sit inside the strip and never on each other */
            const ws = Array.from(document.querySelectorAll('.ac-win')).map(e => e.getBoundingClientRect());
            for (let i = 0; i < ws.length; i++) for (let j = i + 1; j < ws.length; j++) { const a = ws[i], b = ws[j]; if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) F('windows overlap ' + i + '/' + j); }
            const tray = Array.from(document.querySelectorAll('.ac-tray')).find(e => e.getBoundingClientRect().width > 0);
            if (tray && tray.getBoundingClientRect().width < 48) F('trays too small: ' + tray.getBoundingClientRect().width.toFixed(0));
            /* every numeral on the strip lies inside the strip (the stamp was once clipped) */
            const sb = document.querySelector('.ac-strip'); if (sb) { const r0 = sb.getBoundingClientRect(); document.querySelectorAll('.ac-times, .ac-num, .ac-run, .ac-rowrun, .ac-facenum').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.bottom > r0.bottom + 1 || r.top < r0.top - 1)) F('clipped numeral «' + e.textContent + '»'); }); }
            /* never a 0 on screen */
            document.querySelectorAll('.ac-num, .ac-run, .ac-rowrun, .ac-facenum').forEach(e => { if (e.textContent.trim() === '0') F('a 0 on the strip'); });
            return out;
          }, state);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await sw.page.waitForFunction(() => document.querySelector('.ac-wrap').classList.contains('is-wide'), { timeout: 4000 }).catch(() => {}); await wait(80);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-accordion: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
