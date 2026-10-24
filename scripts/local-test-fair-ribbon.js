#!/usr/bin/env node
/* =====================================================================
   local-test-fair-ribbon.js — ACTIVITY #91, The Fair Ribbon ("The Sharing
   Jar — Make It Fair", 1.OA.D.8), in a real browser with REAL clicks on
   the tiles, Check and the jars, and the keyboard (never a model call to
   make a move). For every locale, Clear jars, MORE Pim 5 / Bo 3 (answer 2):
     · at rest: two jars (Pim 5 beads, Bo 3), the ribbon, tiles 1–10, no 0;
       Check with no tile → hNone and no miss;
     · tile 1 → one dashed gap bead under the ribbon (hGap); tile 4 → two
       coral beads past the ribbon, Pim quiet, the second miss numbers them
       1, 2 (hCountGlow); tile 2 → fair: both jars gold, the friends lean
       in, okMore "3 and 2 more make 5";
     · tapping Pim's jar lights its 5 beads; the keys 3 + Enter check 3;
     · HOW MANY MORE 6/2: tiles 1 then 10 → the second miss is past what
       can move → hTooFar and nothing numbered;
     · START (got 4, now 7): tile 2 → one dashed bead between the start
       beads and the new ones (hStart), the gold bracket beside the new;
     · Frosted MORE 8/5: frost on both jars, lids 8 and 5, no beads to
       count by tapping; tile 3 → the frost clears, fair;
     · "Only how many more": 7 rounds.
   And every round of both levels at rest, at miss 2 and solved — each state
   reached ONCE per locale by real clicks, then the window resized through
   320–1366 and measured at every width: no sideways scroll, every control
   ≥ 44 px, Check above the fold at rest, the hint and Check in view after a
   miss, the success line in view, both friends loaded library pictures
   (≥ 96 px wide layout, ≥ 64 px otherwise), the jars inside the card.
   Usage: node scripts/local-test-fair-ribbon.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '091-fair-ribbon', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'fair-ribbon-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, FairRibbonCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'fair-ribbon-activity.js'), 'utf8') + '\n;this.__A = FairRibbonActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(LIB, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/fair-ribbon-activity.html?activity=sharing-jar.make-fair.1-oa-d-8&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FairRibbonActivity && window.FairRibbonActivity.st && document.querySelector('.fr-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.FairRibbonActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, story, idx, swap) {
    await page.evaluate((level, story, idx, swap) => { const a = window.FairRibbonActivity; a.api.settings.jars = level; a.api.settings.story = story; a._pool = null; a._ensurePool(); a._start(idx, !!swap, 0); a._render2(); window.scrollTo(0, 0); }, level, story, idx, swap);
    await page.waitForFunction(() => { const i = [...document.querySelectorAll('.fr-pic')]; return i.length === 2 && i.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.FairRibbonActivity.st; return { chosen: s.chosen, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.fr-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled, hid: getComputedStyle(e).visibility === 'hidden' }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis || b.hid) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const tile = (page, n, tag) => click(page, `[data-k="tile-${n}"]`, tag);
  const check = (page, tag) => click(page, '[data-k="check"]', tag);
  const say = async (page, n, tag) => { await tile(page, n, tag); await check(page, tag); };
  const beads = (page, who, kind) => page.evaluate((w, k) => document.querySelectorAll(`[data-jar="${w}"] .fr-bead.is-${k}`).length, who, kind);

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} clear MORE 5/3`;
    await force(page, 'clear', 'all', 0);
    is(await count(page, '[data-jar]') === 2 && await beads(page, 'pim', 'b') === 5 && await beads(page, 'bo', 'b') === 3 && await count(page, '.fr-ribbon') === 1, `${tag}: two jars, Pim 5 beads, Bo 3, one ribbon`);
    is(await count(page, '.fr-tile') === 10 && await count(page, '[data-k="tile-0"]') === 0 && await count(page, '[data-k="check"]') === 1 && sp(await note(page)) === '', `${tag}: tiles 1–10, no 0, Check, no note`);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text') ? document.querySelector('.lcs-activity-prompt-text').textContent : '')) === sp(T(loc, 'pMore')), `${tag}: the task line is pMore`);
    await check(page, tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hNone')), `${tag}: Check with no tile → hNone, no miss`);
    await say(page, 1, tag); s = await st(page);
    is(s.misses === 1 && await beads(page, 'bo', 'dash') === 1 && await beads(page, 'bo', 'mv') === 1 && sp(await note(page)) === sp(T(loc, 'hGap')), `${tag}: tile 1 — one bead moves, one dashed gap under the ribbon (hGap)`);
    await say(page, 4, tag); s = await st(page);
    is(s.misses === 2 && await beads(page, 'bo', 'over') === 2 && await count(page, '.fr-num') === 2 && sp(await note(page)) === sp(T(loc, 'hCountGlow')), `${tag}: tile 4 — two beads past the ribbon, numbered (hCountGlow)`);
    is(await count(page, '.fr-friend.is-quiet[data-who="pim"]') === 1, `${tag}: the overshoot quiets Pim`);
    await say(page, 2, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okMore', { b: 3, n: 2, a: 5 })) && await count(page, '.fr-halo.is-gold') === 2 && await count(page, '.fr-friend.is-lean') === 2 && await count(page, '[data-k="check"]') === 0, `${tag}: tile 2 — fair: okMore, both jars gold, the friends lean in`);
    /* counting a jar + keys */
    tag = `${loc} count + keys`;
    await force(page, 'clear', 'all', 0);
    await click(page, '[data-jar="pim"] .fr-glass', tag);
    is(await count(page, '[data-jar="pim"] .fr-bead.is-lit') === 5, `${tag}: tapping Pim's jar lights its 5 beads`);
    await page.focus('.fr-wrap'); await page.keyboard.press('3'); await page.keyboard.press('Enter'); await wait(25); s = await st(page);
    is(s.chosen === 3 && s.misses === 1, `${tag}: 3 + Enter checks 3`);
    /* too far */
    tag = `${loc} clear HMM 6/2`;
    await force(page, 'clear', 'all', 1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'pHmm')), `${tag}: the task line is pHmm`);
    await say(page, 1, tag);
    is(await beads(page, 'pim', 'still') === 3 && await count(page, '.fr-bead.is-lift') === 1 && sp(await note(page)) === sp(T(loc, 'hAbove')), `${tag}: tile 1 — one bead lifted, three still above the ribbon (hAbove)`);
    await say(page, 10, tag);
    is(sp(await note(page)) === sp(T(loc, 'hTooFar')) && await count(page, '.fr-num') === 0, `${tag}: tile 10 — more than Pim has → hTooFar, nothing numbered`);
    /* START */
    tag = `${loc} clear START +4=7`;
    await force(page, 'clear', 'all', 4);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'pStart', { r: 4, t: 7 })) && await count(page, '.fr-bracket') === 1 && await beads(page, 'bo', 'new') === 4, `${tag}: pStart, the 4 new beads glow, the bracket beside them`);
    await say(page, 2, tag);
    is(await beads(page, 'bo', 'st') === 2 && await beads(page, 'bo', 'gapb') === 1 && sp(await note(page)) === sp(T(loc, 'hStart')), `${tag}: tile 2 — two start beads, one dashed between (hStart)`);
    await say(page, 3, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okStart', { n: 3, r: 4, t: 7 })), `${tag}: tile 3 → okStart`);
    /* GIVE + PUT prompts */
    await force(page, 'clear', 'all', 2);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'pGive', { s: 7 })) && await count(page, '.fr-pencil') === 1, `${loc} GIVE: pGive {s}=7, the pencil mark`);
    await say(page, 3, `${loc} GIVE`);
    is(sp(await note(page)) === sp(T(loc, 'okGive', { n: 3, r: 4, s: 7 })), `${loc} GIVE: tile 3 → okGive`);
    await force(page, 'clear', 'all', 3); await say(page, 2, `${loc} PUT`);
    is(sp(await note(page)) === sp(T(loc, 'okPut', { n: 2, a: 6, t: 4 })), `${loc} PUT: tile 2 → okPut`);
    /* frosted */
    tag = `${loc} frosted MORE 8/5`;
    await force(page, 'frosted', 'all', 0);
    is(await count(page, '.fr-frost') === 2 && (await page.evaluate(() => [...document.querySelectorAll('.fr-lidnum')].map(e => e.textContent).join(','))) === '8,5' && await count(page, '.fr-tile') === 20, `${tag}: frost on both jars, lids 8 and 5, tiles 1–20`);
    await click(page, '[data-jar="pim"] .fr-glass', tag);
    is(await count(page, '.fr-bead.is-lit') === 0, `${tag}: a frosted jar cannot be counted by tapping`);
    await say(page, 3, tag); s = await st(page);
    is(s.done && await count(page, '.fr-frost') === 0, `${tag}: tile 3 → the frost clears, fair`);
    /* story setting */
    await force(page, 'clear', 'more', 0);
    is(await page.evaluate(() => window.FairRibbonActivity._pool.length) === 7, `${loc}: "Only how many more" has 7 rounds`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale, then resized through every width ---- */
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.fr-tile,.fr-check')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (e.scrollWidth > e.clientWidth + 1) out.fails.push('a label overflows ' + e.textContent); });
    const ck = document.querySelector('.fr-check'), tl = [...document.querySelectorAll('.fr-tile')];
    out.cBottom = Math.max(ck ? ck.getBoundingClientRect().bottom : 0, ...tl.map(e => e.getBoundingClientRect().bottom)); out.cTop = ck ? ck.getBoundingClientRect().top : tl[0].getBoundingClientRect().top;
    const nr = document.querySelector('.fr-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.fr-wrap').getBoundingClientRect(), wide = W.width >= 560;
    document.querySelectorAll('.fr-svg,.fr-tiles,.fr-friend').forEach(e => { const q = e.getBoundingClientRect(); if (q.width && (q.left < W.left - 1 || q.right > W.right + 1)) out.fails.push((e.className.baseVal != null ? 'svg' : e.className) + ' outside the card'); });
    [...document.querySelectorAll('.fr-pic')].forEach(p => { if (!p.complete || !p.naturalWidth) out.fails.push('a friend did not load'); else if (p.getBoundingClientRect().width < (wide ? 96 : 64) - 1) out.fails.push('a friend is small ' + Math.round(p.getBoundingClientRect().width)); });
    if (document.querySelectorAll('.fr-pic').length !== 2) out.fails.push('two friends');
    /* the friends' layout boxes (a lean is a small rotation, not a move) beside the jars, not over them */
    const jb = document.querySelector('.fr-jars'), jl = jb.offsetLeft, jr = jl + jb.offsetWidth;
    [...document.querySelectorAll('.fr-friend')].forEach(f => { const l = f.offsetLeft, r = l + f.offsetWidth; if (r > jl + 2 && l < jr - 2) out.fails.push('a friend covers the jars'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of C.LEVELS) for (const idx of C.ids(level, 'all')) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(level, 'all', idx), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${level}.${idx} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, level, 'all', idx, idx % 2);
      if (state === 'miss2') { const a = r.ans > 1 ? r.ans - 1 : r.ans + 2, b = r.ans + 1; await say(page, a, t0); await say(page, b, t0); }
      if (state === 'solved') await say(page, r.ans, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses`);
      if (state === 'solved') is(s0.done, `${t0}: made fair by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${level}.${idx} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction((ew) => { const e = document.querySelector('.fr-wrap'), W = Math.floor(e.getBoundingClientRect().width), s = document.querySelector('.fr-svg'); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 330) && s && +s.getAttribute('width') === (W >= 560 ? 296 : W < 330 ? 148 : 200); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.fr-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: the tiles and Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && idx <= 1) await page.screenshot({ path: path.join(SHOT_DIR, `${level}-${idx}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-fair-ribbon: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
