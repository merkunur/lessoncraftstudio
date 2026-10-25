#!/usr/bin/env node
/* =====================================================================
   local-test-root-stencil.js — ACTIVITY #114, The Root Stencil, in a real
   browser with real pointer and key actions (word cards tapped into the
   frame, the frame tapped to take a card back, the word tapped between two
   letters to place the line, Arrow keys moving it, sleeves tapped onto the
   root, Check clicked), in all ten shipped locales.
   Scenarios per locale (at 1024):
     · the clue list (en: + the look-alikes setting; elsewhere none);
     · Find: an empty Check → hintEmptyFind, no miss; a card tapped → its
       letters in the frame; the frame tapped → back; a look-alike → hintLetter
       and a coral window; another → hintFind2 and the stencil's letters; a
       new card takes them away; the right card → okFind, flat, sleeved, the
       hook tag; en Tricky: the trap → hintTrap, its leftover droops;
     · Peel: no line → hintEmptyPeel; a line inside the root → hintPeel; the
       line moved by Arrow keys; the root's end → okPeel (en: the -ed sound);
     · Add: no sleeve → hintEmptyAdd; a wrong sleeve → hintAdd, it pops off,
       the signal lights; again → hintAdd2 naming the signal; the right one
       → okAdd; as many pictures as the sentence says.
   Then every clue × round (en: both look-alike sets) at rest, at miss 2 and
   solved — reached ONCE per locale by real actions, then resized through
   320…1366: no sideways scroll, Check above the fold at rest, Check and
   the hint in view at miss 2, the success line in view, controls ≥ 44 px,
   pictures ≥ 64 px (≥ 96 from 704), nothing outside the card, no bands
   overlap, every letter inside the word, the stencil over the frame.
   Usage: node scripts/local-test-root-stencil.js [--widths=…] [--locales=…] [--clues=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,fr,es,pt,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const CLUES = arg('clues', 'find,peel,add').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '114-root-stencil', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'root-stencil-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, RootStencilCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'root-stencil-activity.js'), 'utf8') + '\n;this.__A = RootStencilActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/root-stencil-activity.html?activity=syllable-builder.build-endings.rf-1-3-f&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RootStencilActivity && window.RootStencilActivity.st && document.querySelector('.rs-foot'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.RootStencilActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, clue, look, r) {
    await page.evaluate((clue, look, r) => { const a = window.RootStencilActivity; a.api.settings.clue = clue; a.api.settings.look = look; a._pool = null; a._ensurePool(); a._pos = [1, 3, 0, 2, 1, 0, 2, 3, 1]; a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0); }, clue, look, r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.RootStencilActivity.st; return { clue: s.clue, frame: s.frame, framed: s.frame == null ? null : s.cards[s.frame], gap: s.gap, sleeve: s.sleeve, misses: s.misses, show: s.show, done: s.done, last: s.last, right: s.right }; });
  const R0 = (page) => page.evaluate(() => { const s = window.RootStencilActivity.st; return { R: s.R, cards: s.cards, sleeves: s.sleeves }; });
  const note = (page) => page.evaluate(() => document.querySelector('.rs-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(20); return true;
  }
  /* Peel: tap the word between letter g-1 and letter g */
  async function tapGap(page, g, tag) {
    const p = await page.evaluate((g) => { const b = document.querySelector('[data-k="frame"]'); b.scrollIntoView({ block: 'center', behavior: 'instant' }); const ls = b.querySelectorAll('.rs-l'); if (!ls[g]) return null; const a = ls[g - 1].getBoundingClientRect(), c = ls[g].getBoundingClientRect(); return { x: (a.right + c.left) / 2, y: (a.top + a.bottom) / 2 }; }, g);
    if (!p) { is(false, `${tag}: a gap ${g}`); return; }
    await page.mouse.click(p.x, p.y); await wait(20);
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const cardIdx = (cards, w) => cards.indexOf(w);
  const wrongCards = (r) => r.cards.filter((w, i) => i !== r.right && !w.startsWith(r.R.root));

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s, r;
    is(JSON.stringify(await page.evaluate(() => window.RootStencilActivity.settings.map(f => f.key))) === (loc === 'en' ? '["clue","look"]' : '["clue"]'), `${loc}: the settings (look-alikes only in en)`);
    is(JSON.stringify(await page.evaluate(() => window.RootStencilActivity.settings[0].options.map(o => o.value))) === '["find","peel","add"]', `${loc}: the clue list`);
    /* Find */
    tag = `${loc} find`; await force(page, 'find', 'plain', 0); r = await R0(page); s = await st(page); r.right = s.right;
    is(sp(await prompt(page)) === sp(T(loc, 'tFind')) && await count(page, '.rs-card') === 4, `${tag}: the task line, four cards`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && s.last === 'tray' && sp(await note(page)) === sp(T(loc, 'hintEmptyFind')), `${tag}: an empty Check → hintEmptyFind, no miss`);
    const w1 = wrongCards(r)[0], w2 = wrongCards(r)[1];
    await click(page, K('card-' + cardIdx(r.cards, w1)), tag); s = await st(page);
    is(s.framed === w1 && await page.evaluate(() => [...document.querySelectorAll('.rs-word .rs-l')].map(e => e.textContent).join('')) === w1, `${tag}: a card tapped → its letters in the frame`);
    await click(page, K('frame'), tag); s = await st(page); is(s.frame === null, `${tag}: the frame tapped → the card back`);
    await click(page, K('card-' + cardIdx(r.cards, w1)), tag); await check(page, tag); s = await st(page);
    is(s.last === 'wrongLetter' && s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintLetter')) && await count(page, '.rs-win.is-bad') >= 1 && await count(page, '.rs-stencil.is-reveal') === 0, `${tag}: ${w1} → hintLetter, a coral window`);
    await click(page, K('card-' + cardIdx(r.cards, w2)), tag); await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintFind2')) && await count(page, '.rs-stencil.is-reveal') === 1 && sp(await page.evaluate(() => [...document.querySelectorAll('.rs-stencil.is-reveal .rs-win b')].map(e => e.textContent).join(''))) === r.R.root, `${tag}: miss 2 → hintFind2, the stencil shows ${r.R.root}`);
    await click(page, K('card-' + cardIdx(r.cards, w1)), tag); is(await count(page, '.rs-stencil') === 0 && (await note(page)) === '', `${tag}: a new card takes the help away`);
    await click(page, K('card-' + r.right), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okFind', { built: r.R.built, root: r.R.root, end: r.R.end })) && await count(page, '.rs-stencil.is-flat') === 1 && await count(page, '.rs-zip') === 1, `${tag}: ${r.R.built} → okFind, the stencil flat, the sleeve on`);
    is(await page.evaluate((w) => [...document.querySelectorAll('.rs-tag')].some(e => e.textContent === w), r.R.built), `${tag}: ${r.R.built} hangs on its hook`);
    if (loc === 'en') {
      tag = 'en tricky'; await force(page, 'find', 'tricky', 3); r = await R0(page); s = await st(page);
      await click(page, K('card-' + cardIdx(r.cards, r.R.trap)), tag); await check(page, tag); s = await st(page);
      is(s.last === 'fakeEnding' && sp(await note(page)) === sp(T(loc, 'hintTrap')) && await count(page, '.rs-l.is-droop') === r.R.trap.length - r.R.root.length && await count(page, '.rs-win.is-bad') === 0, `${tag}: ${r.R.trap} → hintTrap, its leftover droops, every window fits`);
    }
    /* Peel */
    tag = `${loc} peel`; await force(page, 'peel', 'plain', 1); r = await R0(page);
    is(sp(await prompt(page)) === sp(T(loc, 'tPeel')) && await count(page, '.rs-tray .rs-card') === 0, `${tag}: the task line, no cards`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmptyPeel')), `${tag}: no line → hintEmptyPeel`);
    await tapGap(page, 1, tag); s = await st(page); is(s.gap === 1 && await count(page, '.rs-line') === 1, `${tag}: a tap between letters 1 and 2 places the line`);
    await check(page, tag); s = await st(page); is(s.last === 'wrongSplit' && sp(await note(page)) === sp(T(loc, 'hintPeel')), `${tag}: a line inside ${r.R.root} → hintPeel`);
    await page.focus(K('frame')); for (let k = 1; k < r.R.root.length; k++) await page.keyboard.press('ArrowRight'); await wait(20); s = await st(page);
    is(s.gap === r.R.root.length, `${tag}: Arrow keys move the line (${s.gap})`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okPeel', { root: r.R.root, end: r.R.end, built: r.R.built })), `${tag}: the line after ${r.R.root} → okPeel`);
    if (loc === 'en') {
      tag = 'en peel -ed'; await force(page, 'peel', 'plain', 7); r = await R0(page); await tapGap(page, r.R.root.length, tag); await check(page, tag);
      is(sp(await note(page)) === sp(T('en', 'okPeel', { root: 'jump', end: 'ed', built: 'jumped' }) + ' ' + T('en', 'okSay', { s: 't' })), `${tag}: jumped → the -ed says /t/`);
    }
    /* Add */
    tag = `${loc} add`; await force(page, 'add', 'plain', 0); r = await R0(page);
    is(sp(await prompt(page)) === sp(T(loc, 'tAdd')) && await count(page, '.rs-sleeve') === C.DATA[loc].endsAdd.length, `${tag}: the task line, the sleeves`);
    is(await count(page, '.rs-pic') === (r.R.pic ? r.R.n : 0), `${tag}: ${r.R.n} picture(s) for the sentence`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmptyAdd')), `${tag}: no sleeve → hintEmptyAdd`);
    const wrong = r.sleeves.find(e => e !== r.R.end);
    await click(page, K('sleeve-' + r.sleeves.indexOf(wrong)), tag); is(await count(page, '.rs-on') === 1, `${tag}: a sleeve tapped hangs on the root`);
    await check(page, tag); s = await st(page);
    is(s.last === 'wrongEnding' && s.sleeve === null && await count(page, '.rs-on') === 0 && await count(page, '.rs-sig.is-lit') === 1 && sp(await note(page)) === sp(T(loc, 'hintAdd')), `${tag}: -${wrong} → hintAdd, it pops off, the signal lights`);
    await click(page, K('sleeve-' + r.sleeves.indexOf(wrong)), tag); await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)).indexOf(sp(r.R.sig)) >= 0 && await count(page, '.rs-sig.is-thread') === 1, `${tag}: miss 2 names «${r.R.sig}»`);
    await click(page, K('sleeve-' + r.sleeves.indexOf(r.R.end)), tag); await check(page, tag); s = await st(page);
    const P = r.R.s.split('{gap}');
    is(s.done && sp(await note(page)) === sp(T(loc, 'okAdd', { line: (P[0] + r.R.root + r.R.end + P[1]).trim(), mean: C.DATA[loc].mean[r.R.end] })), `${tag}: -${r.R.end} → okAdd`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every clue × round at rest, at miss 2 and solved — reached ONCE per locale by real actions, then resized ---- */
  async function reach(page, loc, clue, state, tag) {
    if (state === 'rest') return;
    const r = await R0(page), s0 = await st(page); r.right = s0.right;
    if (clue === 'find') {
      if (state === 'solved') { await click(page, K('card-' + r.right), tag); await check(page, tag); return; }
      const w = r.cards.filter((x, i) => i !== r.right).sort((p, q) => p.length - q.length);   /* the two shortest: the worst case for the stencil's width */ await click(page, K('card-' + r.cards.indexOf(w[0])), tag); await check(page, tag); await click(page, K('card-' + r.cards.indexOf(w[1])), tag); await check(page, tag); return;
    }
    if (clue === 'peel') {
      if (state === 'solved') { await tapGap(page, r.R.root.length, tag); await check(page, tag); return; }
      const g = r.R.root.length === 1 ? 2 : 1; await tapGap(page, g, tag); await check(page, tag); await tapGap(page, g, tag); await check(page, tag); return;
    }
    if (state === 'solved') { await click(page, K('sleeve-' + r.sleeves.indexOf(r.R.end)), tag); await check(page, tag); return; }
    const wrong = r.sleeves.find(e => e !== r.R.end);
    for (let k = 0; k < 2; k++) { await click(page, K('sleeve-' + r.sleeves.indexOf(wrong)), tag); await check(page, tag); }
  }
  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.rs-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.rs-pic img').forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 63.5 || (Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.rs-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.rs-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.rs-wrap')).getBoundingClientRect();
    document.querySelectorAll('.rs-pic,.rs-frame,.rs-word,.rs-card,.rs-sleeve,.rs-check,.rs-bench,.rs-hooks,.rs-sentence,.rs-stencil').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.rs-hooks', '.rs-bench', '.rs-tray', '.rs-foot', '.rs-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const w = document.querySelector('.rs-word'); if (w) { const q = w.getBoundingClientRect(); w.querySelectorAll('.rs-l').forEach(l => { const r = l.getBoundingClientRect(); if (r.left < q.left - 1 || r.right > q.right + 1) out.fails.push('a letter spills out of the word'); }); }
    const fr = document.querySelector('.rs-frame'), stc = document.querySelector('.rs-stencil'); if (fr && stc) { const a = fr.getBoundingClientRect(), b = stc.getBoundingClientRect(); if (b.top < a.top - 1 || b.left < a.left - 1 || b.right > a.right + 1) out.fails.push('the stencil leaves the frame'); }
    document.querySelectorAll('.rs-card').forEach(c => { if (c.scrollWidth > c.clientWidth + 1) out.fails.push('a card word is cut off'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const clue of CLUES) for (const look of (clue === 'find' && loc === 'en' ? ['plain', 'tricky'] : ['plain'])) for (const r of C.rounds(loc, clue, look)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${clue}/${look} ${r} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, clue, look, r);
      await reach(page, loc, clue, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${clue}/${look} ${r} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.RootStencilActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.rs-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${clue}-${look}-${r}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-root-stencil: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
