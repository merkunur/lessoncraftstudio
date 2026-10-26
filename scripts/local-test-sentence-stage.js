#!/usr/bin/env node
/* =====================================================================
   local-test-sentence-stage.js — ACTIVITY #128, The Sentence Stage
   (Wiggles' Sentence Builder, L.1.1.j), in a real browser with real
   pointer actions (word blocks tapped onto the script line and back,
   Check clicked, the stage tapped for a replay), in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (five levels; slow / quick — the metronome dot on the
       script line shows the speed at rest);
     · level 1: the task line, the actor as a clue, the blocks in the
       wings, an empty script line; an empty Check → the hint, no miss; a
       block tapped onto the line and back; a part script → the hint, no
       miss; two words swapped → the show freezes (the place flickers, the
       stage frozen, the hint for that reason); Check again → miss 2: the
       first wrong place glows; the sentence → solved, every block green,
       the success line with the sentence; the stage tapped → a replay;
     · level 2: no clue on the stage;
     · level 4: a question or a shout plays (es with ¿ ¡);
     · level 5: the photo; a false describing word → the false hint, the
       photo pulses; a true sentence → solved.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real taps, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, the hint and the success
   line in view, controls ≥ 44 px, everything inside the card, no text cut
   off, the actors inside the stage, no two bands on top of each other.
   Usage: node scripts/local-test-sentence-stage.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '128-sentence-stage', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'sentence-stage-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, SentenceStageCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'sentence-stage-activity.js'), 'utf8') + '\n;this.__A = window.SentenceStageActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 120) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(IMGROOT, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    /* exact-case lookup, like the Linux server */
    if (p.startsWith('/image-library-webp/')) { const d = path.dirname(file); if (!fs.existsSync(d) || !fs.readdirSync(path.dirname(d)).includes(path.basename(d)) || !fs.readdirSync(d).includes(path.basename(file))) { res.statusCode = 404; res.end(); return; } }
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
/* the level-5 scripts: a true sentence and one with a false describing word, in the language's order */
function writeSeq(rd, trueAdj) {
  const f = (p) => rd.blocks.find(p), d = f(b => b.r === 'd'), a = f(b => b.r === 'a' && b.t === trueAdj), n = f(b => b.r === 'n' && b.t), v = f(b => b.r === 'v' && b.t), e = f(b => b.r === 'e');
  const tpl = C.DATA[rd.loc].l5.tpl, s = tpl === 'dna' ? [d, n, a, v, e] : tpl === 'an' ? [a, n, v, e] : [d, a, n, v, e];
  return s.filter(Boolean).map(b => b.id);
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
    await page.goto(`${base}/sentence-stage-activity.html?activity=sentence-builder.build-a-sentence.l-1-1-j&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SentenceStageActivity && window.SentenceStageActivity.st && document.querySelector('.ss-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.SentenceStageActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, speed) {
    const ok = await page.evaluate((lvl, r, speed) => {
      const a = window.SentenceStageActivity; a.api.settings.level = lvl; a.api.settings.speed = speed || 'slow'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, speed);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.SentenceStageActivity.st; return { r: s.r, lvl: s.lvl, slots: s.slots.slice(), misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ss-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const check = (page, tag) => click(page, K('check'), tag);
  async function lay(page, ids, tag) { for (const id of ids) await click(page, K('block-' + id), tag); }
  async function clearLine(page, tag) { const s = await st(page); for (let i = s.slots.length - 1; i >= 0; i--) if (s.slots[i] != null) await click(page, K('slot-' + i), tag); }
  /* the hint the model asks for, with the frozen word (as the page shows it) */
  const expectHint = (page, loc) => page.evaluate(() => { const a = window.SentenceStageActivity, s = a.st, C = window.SentenceStageCore, f = s.freeze; const id = f && f.at < s.slots.length ? s.slots[f.at] : null; return { key: C.hint(s), w: id != null ? a._blockText(id) : '' }; }).then(h => sp(T(loc, h.key, { w: h.w })));
  const swapped = (rd) => { const c = rd.canon.slice(); [c[1], c[2]] = [c[2], c[1]]; return c; };
  async function reach(page, rd, state, tag) {
    if (state === 'rest') return true;
    const right = rd.kind === 'build' ? rd.canon : writeSeq(rd, true), wrong = rd.kind === 'build' ? swapped(rd) : writeSeq(rd, false);
    if (state === 'solved') { await lay(page, right, tag); await check(page, tag); return true; }
    await lay(page, wrong, tag); await check(page, tag); await check(page, tag); return true;
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.SentenceStageActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === JSON.stringify(['level:1/2/3/4/5', 'speed:slow/quick']), `${loc}: the settings`);
    /* level 1 */
    const r1 = 0, rd1 = C.round(loc, '1', r1); tag = `${loc} L1.1`; await force(page, '1', r1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't1')), `${tag}: the task line`);
    is(await count(page, '.ss-stage .ss-actimg') === 1 && await count(page, '.ss-stage.is-clue') === 1, `${tag}: the actor on stage as a clue`);
    is(await count(page, '.ss-block') === rd1.n && await count(page, '.ss-slot.is-empty') === rd1.n && await count(page, '.ss-metro') === 1, `${tag}: ${rd1.n} blocks in the wings, an empty script line, the metronome`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → the hint, no miss`);
    await click(page, K('block-' + rd1.canon[2]), tag); s = await st(page); is(s.slots[0] === rd1.canon[2] && await count(page, '.ss-slot.is-full') === 1, `${tag}: a tapped block goes to the first place on the line`);
    await click(page, K('slot-0'), tag); s = await st(page); is(s.slots.every(x => x == null) && await count(page, '.ss-block') === rd1.n, `${tag}: tapped on the line → back to the wings`);
    await lay(page, rd1.canon.slice(0, 2), tag); await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintMissing')), `${tag}: a part script → the hint, no miss`);
    await clearLine(page, tag);
    await lay(page, swapped(rd1), tag); await check(page, tag); s = await st(page);
    const h1 = await expectHint(page, loc);
    is(s.misses === 1 && sp(await note(page)) === h1 && await count(page, '.ss-slot.is-stop') === 1 && await count(page, '.ss-stage.is-frozen') === 1, `${tag}: two words swapped → the show freezes, «${sp(await note(page))}»`);
    await check(page, tag); s = await st(page); is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'missGlow')) && await count(page, K('slot-1') + '.is-glow') === 1, `${tag}: miss 2 → the first wrong place glows`);
    await clearLine(page, tag); is((await st(page)).last === null && await count(page, '.is-glow') === 0, `${tag}: a move takes the help away`);
    await lay(page, rd1.canon, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okSentence', { s: C.canonText(rd1) })) && await count(page, '.ss-slot.is-ok') === rd1.n && await count(page, '.ss-stage.is-bow') === 1, `${tag}: the sentence → solved, the bow, «${sp(await note(page))}»`);
    await click(page, K('stage'), tag); is((await st(page)).done && await count(page, '.ss-stage .ss-actimg') >= 1, `${tag}: the stage tapped → a replay`);
    /* level 2: no clue */
    await force(page, '2', 3); is(await count(page, '.ss-stage .ss-actimg') === 0, `${loc} L2.4: no clue on the stage`);
    /* level 4: a question / a shout */
    for (const r of [0, 4]) {
      const rd = C.round(loc, '4', r); tag = `${loc} L4.${r + 1}`; await force(page, '4', r);
      if (loc === 'es') is(await page.evaluate(() => [...document.querySelectorAll('.ss-block')].some(b => /^[¿¡]$/.test(b.textContent))), `${tag}: an opening mark in the wings`);
      await lay(page, rd.canon, tag); await check(page, tag); s = await st(page);
      const key = C.okKey({ rd }); is(s.done && sp(await note(page)) === sp(T(loc, key, { s: C.canonText(rd) })), `${tag}: ${key} «${sp(await note(page))}»`);
    }
    /* level 5 */
    const rd5 = C.round(loc, '5', 1); tag = `${loc} L5.2`; await force(page, '5', 1);
    is(await count(page, '.ss-photoimg') === 1 && await count(page, '.ss-stage .ss-actimg') === 0, `${tag}: the photo, an empty stage`);
    await lay(page, writeSeq(rd5, false), tag); await check(page, tag); s = await st(page);
    is(s.reason === 'false' && sp(await note(page)) === await expectHint(page, loc) && await count(page, '.ss-photo.is-pulse') === 1, `${tag}: a false word → «${sp(await note(page))}», the photo pulses`);
    await clearLine(page, tag); await lay(page, writeSeq(rd5, true), tag); await check(page, tag); s = await st(page);
    const s5 = C.join(rd5, s.slots);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okPicture', { s: s5 })) && /^\p{Lu}/u.test(s5) && await count(page, '.ss-photo.is-ok') === 1, `${tag}: a true sentence → solved «${s5}»`);
    await force(page, '1', 0, 'quick'); is(await page.evaluate(() => document.querySelector('.ss-wrap').classList.contains('sp-quick')), `${loc}: quick speed shows on the metronome`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.ss-wrap button')].filter(vis).filter(e => !e.disabled && !e.classList.contains('ss-stage')).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + String(e.className).split(' ')[0] + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.ss-check'); out.cBottom = ck && vis(ck) ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.ss-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.ss-wrap')).getBoundingClientRect();
    document.querySelectorAll('.ss-theatre,.ss-rail,.ss-wings,.ss-slot,.ss-block,.ss-check').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const sc = document.querySelector('.ss-stage').getBoundingClientRect();
    document.querySelectorAll('.ss-actimg').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < sc.left - 1 || q.right > sc.right + 1 || q.top < sc.top - 1 || q.bottom > sc.bottom + 1) out.fails.push('an actor outside the stage'); });
    const band = ['.ss-theatre', '.ss-rail', '.ss-wings', '.ss-foot', '.ss-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.ss-slot,.ss-block,.ss-note').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.levels()) for (const r of C.rounds(lvl)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}.${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      const rd = await page.evaluate(() => JSON.parse(JSON.stringify(window.SentenceStageActivity.st.rd)));
      if (!(await reach(page, rd, state, t0))) continue;
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real taps (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real taps`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.SentenceStageActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.ss-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom > 0 && m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the ${state === 'solved' ? 'success line' : 'hint'} in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && ['en', 'de', 'fi'].indexOf(loc) >= 0 && [360, 704, 1024].indexOf(w) >= 0 && r % 4 === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-L${lvl}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-sentence-stage: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
