#!/usr/bin/env node
/* =====================================================================
   local-test-paint-wells.js — ACTIVITY #110, The Paint Wells, in a real
   browser with real pointer and key actions (droppers TAPPED into the
   next empty well and DRAGGED onto a well, wells tapped to hand back
   their last letter and dragged to another well, jars and words tapped,
   Check clicked), in every shipped locale (en de nl sv no es it pt).
   Scenarios per locale (at 1024):
     · Pour: the clue list per locale; an empty Check → hintEmpty, no
       miss; the given first letter sits locked in well 1; every letter
       tapped → one per well (a tap never shares); a team in two wells →
       hintLean, the wells lean; miss 2 → hintLean2; a drag puts the
       partner in the same well and takes the help away; Check → the line,
       the dried strip, the shelf grows; a blend in one well → split,
       the crack, hintSplit; a wrong letter → hintWrong, at miss 2 only two
       droppers bright; a dropped letter → hintGap, the notch; a tapped well
       hands its letter back; Enter / Shift+Enter on a dropper;
     · Team jars (en de): a wrong jar → hintJar, then the place hint; the
       right jar → the line;
     · Sentence (en): one extra word → hintSentExtra; a missing one →
       hintSentMiss; exactly the sh words → the line and the drops.
   Then every clue × round at rest, at miss 2 and solved — reached ONCE per
   locale by real actions, then resized through 320…1366: no sideways
   scroll, Check above the fold at rest, Check and the hint in view at
   miss 2, the success line in view, controls ≥ 44 px, pictures ≥ 64 px
   (≥ 96 from 704), nothing outside the card, no bands overlap.
   Usage: node scripts/local-test-paint-wells.js [--widths=…] [--locales=…] [--clues=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,sv,no,es,it,pt').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const CLUES = arg('clues', 'pour,jars,sentence').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '110-paint-wells', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'paint-wells-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, PaintWellsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'paint-wells-activity.js'), 'utf8') + '\n;this.__A = PaintWellsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
const W = (loc, id) => C.word(loc, id), G = (loc, id) => C.graphemes(loc, id);
const teamWord = (loc) => C.DATA.pour[loc][0].find(id => G(loc, id).some((g, i) => g.length === 2 && i > 0)) || C.DATA.pour[loc][0].find(id => G(loc, id).some(g => g.length === 2));
const blendWord = (loc) => C.DATA.pour[loc].flat().find(id => { const g = G(loc, id); return g.length >= 3 && g.every(x => x.length === 1) && !/[aeiouyåäöæø]/.test(g[0]) && !/[aeiouyåäöæø]/.test(g[1]); });
const lead = (loc, id) => { const L = C.lead(loc, id), w = W(loc, id); return L ? w.boxes[G(loc, id).indexOf(L.g)] : ''; };
const okLine = (loc, id) => { const L = C.lead(loc, id); return T(loc, !L ? 'okBlend' : L.kind === 'team' ? 'okTeam' : 'okDouble', { sounds: W(loc, id).boxes.join('–'), word: W(loc, id).display, team: lead(loc, id) }); };

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
    await page.goto(`${base}/paint-wells-activity.html?activity=cvc-builder.build-blend-word.rf-1-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PaintWellsActivity && window.PaintWellsActivity.st && document.querySelector('.pw-foot'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.PaintWellsActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* the test seam: clue + help, then a round started fresh (Pour: a word id; jars / sentence: an index) */
  async function force(page, clue, r, help) {
    const ok = await page.evaluate((clue, r, help) => { const a = window.PaintWellsActivity; a.api.settings.clue = clue; a.api.settings.help = help || 'first'; a._pool = null; a._ensurePool(); a._set = 0; a._pos = [1, 0, 2, 1, 0, 2, 1, 0, 2]; a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.clue === clue; }, clue, r, help || 'first');
    if (!ok) throw new Error('force: clue ' + clue + ' not reached');
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.PaintWellsActivity.st; return { clue: s.clue, id: s.id, wells: s.wells ? s.wells.map(w => w.slice()) : null, picked: s.picked, right: s.right, tapped: s.tapped ? s.tapped.slice() : null, misses: s.misses, show: s.show, done: s.done, last: s.last }; });
  const note = (page) => page.evaluate(() => document.querySelector('.pw-note').textContent);
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
  /* droppers are found by the word's letter index (wi) or by a trap letter */
  const dropFor = (page, wi) => page.evaluate((wi) => window.PaintWellsActivity.st.tray.findIndex(x => x.wi === wi), wi);
  const dropTrap = (page, k) => page.evaluate((k) => { const t = window.PaintWellsActivity.st.tray; return t.findIndex(x => x.wi < 0 && x.c === window.PaintWellsCore.word(window.PaintWellsActivity.st.loc, window.PaintWellsActivity.st.id).traps[k]); }, k);
  const tapDrop = async (page, d, tag) => click(page, K('drop-' + d), tag);
  async function drag(page, fromSel, toSel, tag) {
    await page.evaluate(() => window.scrollTo(0, Math.max(0, document.querySelector('.pw-wells').getBoundingClientRect().top + window.scrollY - 160)));
    await wait(15);
    const pos = (s) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, s);
    const a = await pos(fromSel), b = await pos(toSel);
    if (!a || !b) { is(false, `${tag}: drag ${fromSel} → ${toSel}`); return; }
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8); await wait(8); }
    await page.mouse.up(); await wait(40);
  }
  const check = (page, tag) => click(page, K('check'), tag);
  /* pour a word one sound per well by real actions: the first letter of each sound by a tap (it lands in the next empty
     well), its partners dragged onto that well; the given first letter is already there */
  async function pourRight(page, loc, id, help, tag) {
    const g = G(loc, id); let wi = 0;
    for (let gi = 0; gi < g.length; gi++) for (let li = 0; li < g[gi].length; li++, wi++) {
      if (gi === 0 && li === 0 && help === 'first') continue;
      const d = await dropFor(page, wi);
      if (li === 0) await tapDrop(page, d, tag); else await drag(page, K('drop-' + d), `[data-well="${gi}"]`, tag);
    }
  }
  async function pourEach(page, loc, id, help, upTo, tag) { const n = W(loc, id).display.length; for (let wi = 0; wi < (upTo == null ? n : upTo); wi++) { if (wi === 0 && help === 'first') continue; await tapDrop(page, await dropFor(page, wi), tag); } }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    const have = C.clues(loc); let tag, s;
    const setKeys = await page.evaluate(() => window.PaintWellsActivity.settings.map(f => f.key + ':' + f.options.map(o => o.value).join('/')));
    is(have.length > 1 ? setKeys[0] === 'clue:' + have.join('/') : setKeys.every(k => !/^clue:/.test(k)), `${loc}: the settings offer ${have.length > 1 ? have.join(', ') : 'no clue choice'} (${setKeys.join(' ')})`);
    /* ---- Pour ---- */
    const tw = teamWord(loc); tag = `${loc} pour ${tw}`;
    await force(page, 'pour', tw, 'first');
    is(sp(await prompt(page)) === sp(T(loc, 'tPour')), `${tag}: the task line`);
    is(await count(page, '.pw-well') === 6, `${tag}: six wells, whatever the word`);
    s = await st(page); const d0 = await dropFor(page, 0);
    is(s.wells[0].length === 1 && s.wells[0][0] === d0 && await count(page, '.pw-well.is-locked') === 1, `${tag}: the first letter given, locked in well 1`);
    await page.evaluate(() => { const e = document.querySelector('[data-well="0"]'); e.click(); }); s = await st(page); is(s.wells[0].length === 1, `${tag}: the given letter stays`);
    await force(page, 'pour', tw, 'none'); s = await st(page); is(s.wells.every(w => !w.length), `${tag}: Picture only → every well empty`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
    await pourEach(page, loc, tw, 'none', null, tag); s = await st(page);
    is(s.wells.filter(w => w.length).length === W(loc, tw).display.length && s.wells.every(w => w.length <= 1), `${tag}: every tap → the next empty well, one letter each`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.last === 'lean' && sp(await note(page)) === sp(T(loc, 'hintLean')) && await count(page, '.pw-well.is-lean') >= 2, `${tag}: a team in two wells → hintLean, the wells lean`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintLean2')), `${tag}: miss 2 → hintLean2`);
    /* fix: carry each team partner onto its sound's well by dragging the well, then close the gaps by dragging */
    await force(page, 'pour', tw, 'none'); await pourEach(page, loc, tw, 'none', null, tag); await check(page, tag);
    const g = G(loc, tw); let wi = 0, fixed = false;
    for (let gi = 0; gi < g.length && !fixed; gi++) { if (g[gi].length > 1) { const from = wi + 1; await drag(page, `[data-well="${from}"]`, `[data-well="${wi}"]`, tag); fixed = true; } wi += g[gi].length; }
    s = await st(page); is(s.last === null && sp(await note(page)) === '' && await count(page, '.pw-well.is-lean') === 0, `${tag}: a drag shares the well and takes the help away`);
    if (g.filter(x => x.length > 1).length === 1) {
      await check(page, tag); s = await st(page);
      is(s.done && sp(await note(page)) === sp(okLine(loc, tw)), `${tag}: right → «${sp(await note(page))}»`);
      is(await count(page, '.pw-strip .pw-tile') === g.length && await count(page, '.pw-dried') === 1, `${tag}: the dried strip and one strip on the shelf`);
    }
    /* a word poured right by taps and drags, with the given first letter */
    const id2 = C.DATA.pour[loc][0][2]; tag = `${loc} pour ${id2}`;
    await force(page, 'pour', id2, 'first'); await pourRight(page, loc, id2, 'first', tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(okLine(loc, id2)), `${tag}: poured right by real taps and drags → the line`);
    /* a blend in one well → split */
    const bw = blendWord(loc);
    if (bw) {
      tag = `${loc} pour ${bw}`; await force(page, 'pour', bw, 'none'); await pourEach(page, loc, bw, 'none', null, tag);
      await drag(page, '[data-well="1"]', '[data-well="0"]', tag); await check(page, tag); s = await st(page);
      is(s.last === 'split' && sp(await note(page)) === sp(T(loc, 'hintSplit')) && await count(page, '.pw-well.is-split .pw-crack') === 1, `${tag}: two sounds in one well → split, the crack, hintSplit`);
      await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintSplit2')), `${tag}: miss 2 → hintSplit2`);
      await force(page, 'pour', bw, 'none'); const n = W(loc, bw).display.length; await pourEach(page, loc, bw, 'none', null, tag);
      await click(page, '[data-well="1"]', tag); s = await st(page); is(s.wells[1].length === 0, `${tag}: a tapped well hands its letter back`);
      await check(page, tag); s = await st(page); is(s.last === 'gap' && sp(await note(page)) === sp(T(loc, 'hintGap')) && await count(page, '.pw-notch') === 1, `${tag}: a missing sound → hintGap, the notch`); void n;
    }
    /* a wrong letter: a trap in place of the last letter */
    tag = `${loc} pour wrong`; const iw = C.DATA.pour[loc][0][0], nw = W(loc, iw).display.length;
    await force(page, 'pour', iw, 'none'); await pourEach(page, loc, iw, 'none', nw - 1, tag);
    const tr = await dropTrap(page, 0); await tapDrop(page, tr, tag); await check(page, tag); s = await st(page);
    is(s.last === 'wrong' && sp(await note(page)) === sp(T(loc, 'hintWrong')) && await count(page, '.pw-well.is-wrong') >= 1, `${tag}: a wrong letter → hintWrong, the well clouds`);
    await check(page, tag);
    const bright = await page.evaluate(() => [...document.querySelectorAll('.pw-drop')].filter(e => !e.classList.contains('is-dim')).map(e => e.textContent.trim().toLowerCase()));
    is(sp(await note(page)) === sp(T(loc, 'hintWrong2')) && new Set(bright).size === 2, `${tag}: miss 2 → hintWrong2, only two letters stay bright (${[...new Set(bright)].join(',')})`);
    /* the keyboard */
    tag = `${loc} keys`; await force(page, 'pour', tw, 'none');
    const k0 = await dropFor(page, 0), k1 = await dropFor(page, 1);
    await page.evaluate((k) => document.querySelector(`[data-k="drop-${k}"]`).focus(), k0); await page.keyboard.press('Enter');
    await page.evaluate((k) => document.querySelector(`[data-k="drop-${k}"]`).focus(), k1); await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift');
    s = await st(page); is(s.wells[0].length === 2, `${tag}: Enter pours, Shift+Enter shares the last well`);
    await page.evaluate(() => document.querySelector('[data-well="0"]').focus()); await page.keyboard.press('Delete'); s = await st(page); is(s.wells[0].length === 1, `${tag}: Delete on a well hands its last letter back`);
    /* ---- Team jars ---- */
    if (have.includes('jars')) {
      tag = `${loc} jars`; await force(page, 'jars', 0);
      is(sp(await prompt(page)) === sp(T(loc, 'tJars')), `${tag}: the task line`);
      is(await count(page, '.pw-jar') === 3 && await count(page, '.pw-well.is-target') === 1, `${tag}: three jars, one empty well`);
      await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintJarEmpty')), `${tag}: no jar → hintJarEmpty, no miss`);
      await click(page, K('jar-' + ((s.right + 1) % 3)), tag); await check(page, tag); s = await st(page);
      is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintJar')), `${tag}: a wrong jar → hintJar`);
      await check(page, tag); const pl = await page.evaluate(() => window.PaintWellsCore.place(window.PaintWellsActivity.st));
      is(sp(await note(page)) === sp(T(loc, 'hintJar' + pl)), `${tag}: miss 2 → the place hint (${pl})`);
      await click(page, K('jar-' + s.right), tag); await check(page, tag); s = await st(page);
      const R = C.DATA.jars[loc].rounds[0], wj = W(loc, R[0]);
      is(s.done && sp(await note(page)) === sp(T(loc, 'okJar' + pl, { word: wj.display, team: wj.boxes[R[1]] })), `${tag}: the right jar → the line`);
    }
    /* ---- Sentence ---- */
    if (have.includes('sentence')) {
      tag = `${loc} sentence`; await force(page, 'sentence', 2);
      const words = await page.evaluate(() => window.PaintWellsActivity.st.words.map(w => w.has));
      is(sp(await prompt(page)) === sp(T(loc, 'tSent')), `${tag}: the task line`);
      const other = words.indexOf(false), shs = words.map((h, i) => h ? i : -1).filter(i => i >= 0);
      for (const i of shs) await click(page, K('word-' + i), tag);
      await click(page, K('word-' + other), tag); await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintSentExtra')), `${tag}: one extra → hintSentExtra`);
      await click(page, K('word-' + other), tag); await click(page, K('word-' + shs[0]), tag); await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintSentMiss')), `${tag}: one missing → hintSentMiss`);
      await click(page, K('word-' + shs[0]), tag); await check(page, tag); s = await st(page);
      is(s.done && sp(await note(page)) === sp(T(loc, 'okSent', { n: shs.length })) && await count(page, '.pw-jarglass i') === shs.length, `${tag}: exactly the sh words → the line, ${shs.length} drops`);
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every clue × round at rest, at miss 2 and solved — reached ONCE per locale by real actions, then resized ---- */
  async function reach(page, loc, clue, r, state, tag) {
    if (state === 'rest') return;
    if (clue === 'pour') {
      if (state === 'solved') await pourRight(page, loc, r, 'first', tag);
      else { const n = W(loc, r).display.length; await pourEach(page, loc, r, 'first', n - 1, tag); await tapDrop(page, await dropTrap(page, 0), tag); }
    } else if (clue === 'jars') { const s = await st(page); await click(page, K('jar-' + (state === 'solved' ? s.right : (s.right + 1) % 3)), tag); }
    else { const words = await page.evaluate(() => window.PaintWellsActivity.st.words.map(w => w.has)); if (state === 'solved') { for (let i = 0; i < words.length; i++) if (words[i]) await click(page, K('word-' + i), tag); } else await click(page, K('word-' + words.indexOf(false)), tag); }
    await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.pw-wrap button')].filter(vis).filter(e => !e.disabled && e.tabIndex !== -1).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.pw-pic img').forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 63.5 || (Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.pw-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.pw-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.pw-wrap')).getBoundingClientRect();
    document.querySelectorAll('.pw-pic,.pw-wells,.pw-well,.pw-drop,.pw-jar,.pw-word,.pw-paper,.pw-check,.pw-strip').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.pw-shelf', '.pw-top', '.pw-wells', '.pw-tray', '.pw-foot', '.pw-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const clue of CLUES.filter(c => C.clues(loc).includes(c))) {
      const rounds = clue === 'pour' ? C.DATA.pour[loc].flat() : C.rounds(loc, clue, 0);
      for (const r of rounds) for (const state of ['rest', 'miss2', 'solved']) {
        const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${clue} ${r} ${state}`;
        await page.setViewport({ width: w0, height: VH(w0) });
        await force(page, clue, r);
        await reach(page, loc, clue, r, state, t0);
        const s0 = await st(page);
        if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real actions (${s0.misses})`);
        if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
        for (const w of WIDTHS) {
          const tag = `${loc} @${w} ${clue} ${r} ${state}`;
          await page.setViewport({ width: w, height: VH(w) });
          await page.waitForFunction(() => { const a = window.PaintWellsActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
          await wait(40);
          const s1 = await st(page);
          is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
          if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
          else await page.evaluate(() => document.querySelector('.pw-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
          await wait(15);
          const m = await page.evaluate(MEASURE);
          is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
          if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
          else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
          else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
          is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
          if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && rounds.indexOf(r) < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${clue}-${r}-${w}-${state}.png`), fullPage: true });
        }
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-paint-wells: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
