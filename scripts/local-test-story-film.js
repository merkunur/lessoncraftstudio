#!/usr/bin/env node
/* =====================================================================
   local-test-story-film.js — ACTIVITY #82, The Story Film ("Vet's
   Diagnosis Window", 1.OA.A.1), in a real browser with REAL pointer clicks
   (never a model call to make a move). For every locale:
     · take from, the geese (12 − ? = 8): Diagnose with nothing placed is a
       hint, no miss; every frame filled but no mystery is a hint; a frame
       with a tile is emptied by a tap and marked "?" by the next; the dial
       on that frame counts up; a dial of 6 lands two empty sockets in the
       last frame (miss 1); miss 2 numbers the 4 dots that went away; the
       right dial heals the patient, the question becomes its answer and
       the bubble shows 12 − 4 = 8;
     · the decoy on the change frame (Bo's shells) stops the film THERE:
       the frame and its sentence glow together;
     · put together: the known part on either part frame is fine;
     · Groups (4 squirrels share 20 acorns): 4 trays, the share heals with
       the locale's division sign;
     · en: the intro film lights each sentence and a tap skips it; ↑ on
       the keyboard turns the dial;
     · every round of every level at rest AND solved at 320–1366: every
       control above the fold at rest, the success line in view when
       solved, no sideways scroll, every control ≥ 44 px, every picture at
       its floor (96 px wide, 64 px phone).
   Usage: node scripts/local-test-story-film.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '082-story-film', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'story-film-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, StoryFilmCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'story-film-activity.js'), 'utf8') + '\n;this.__A = StoryFilmActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[   ]/g, ' ');
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
    await page.goto(`${base}/story-film-activity.html?activity=vet-diagnosis.word-problems.1-oa-a-1&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.StoryFilmActivity && window.StoryFilmActivity.st && document.querySelector('.sf-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.StoryFilmActivity; a.FAST = true; a.OK_MS = 600000; a.api.settings.read = 'off'; });
    return { page, errs };
  }
  async function force(page, level, idx, fast) {
    await page.evaluate((level, idx, fast) => { const a = window.StoryFilmActivity; a.FAST = fast !== false; a.api.settings.stories = level; a._pool = null; a._ensurePool(); a._start(idx, [0, 1, 2]); a._render2(); }, level, idx, fast);
    await page.waitForFunction(() => { const im = [...document.querySelectorAll('.sf-wrap img.sf-pic')]; return im.length >= 2 && im.every(i => i.complete && i.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(50);
  }
  const st = (page) => page.evaluate(() => { const s = window.StoryFilmActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, mystery: s.mystery, dial: s.dial, placed: Object.assign({}, s.placed), sel: s.sel }; });
  const note = (page) => page.evaluate(() => document.querySelector('.sf-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(30); return true;
  }
  const put = async (page, tile, role, tag) => { await click(page, `[data-k="tile-${tile}"]`, tag); await click(page, `.sf-frame[data-role="${role}"]`, tag); };
  const diag = (page, tag) => click(page, '[data-k="diag"]', tag);
  const dialTo = async (page, n, tag) => { let s = await st(page); while (s.dial < n) { await click(page, '[data-k="plus"]', tag); s = await st(page); } while (s.dial > n) { await click(page, '[data-k="minus"]', tag); s = await st(page); } };

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- the geese: 12 − ? = 8 (w20 round 4): tiles t0 = 12, t1 = 8, t2 = 3 (decoy) ---- */
    let tag = `${loc} geese`;
    await force(page, 'w20', 4);
    await diag(page, tag); let s = await st(page);
    is(s.misses === 0 && s.last === 'empty' && sp(await note(page)) === sp(T(loc, 'hEmpty')), `${tag}: Diagnose with nothing placed is a hint, no miss`);
    await put(page, 't0', 'start', tag); await put(page, 't1', 'result', tag); await put(page, 't2', 'change', tag); s = await st(page);
    is(s.placed.start === 't0' && s.placed.result === 't1' && s.placed.change === 't2', `${tag}: a tap on a tile, a tap on a frame places it`);
    await diag(page, tag); s = await st(page);
    is(s.misses === 0 && s.last === 'mystery' && sp(await note(page)) === sp(T(loc, 'hMystery')), `${tag}: no mystery is a hint`);
    await click(page, '.sf-frame[data-role="change"]', tag); s = await st(page);
    is(s.placed.change === null && s.mystery === null, `${tag}: a tap empties a frame`);
    await click(page, '.sf-frame[data-role="change"]', tag); s = await st(page);
    is(s.mystery === 'change' && s.dial === 1 && await count(page, '.sf-fw[data-role="change"] .sf-dial') === 1, `${tag}: the next tap marks it "?", the dial sits on that frame`);
    await dialTo(page, 6, tag); await diag(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '.sf-frame.is-bad[data-role="result"]') === 1 && await count(page, '.sf-frame[data-role="result"] .sf-sock.is-gap') === 2 && sp(await note(page)) === sp(T(loc, 'hMiss1')), `${tag}: 6 flew away — the last frame shows 2 empty sockets`);
    await diag(page, tag); s = await st(page);
    const rings = await page.evaluate(() => [...document.querySelectorAll('.sf-frame[data-role="change"] .sf-rnum')].map(e => e.textContent).join(','));
    is(s.misses === 2 && rings === '1,2,3,4' && sp(await note(page)) === sp(T(loc, 'hWent')), `${tag}: miss 2 numbers the 4 that went away (${rings})`);
    await dialTo(page, 4, tag); await diag(page, tag); s = await st(page);
    const r4 = C.round('w20', 4), t4 = C.text(loc, r4);
    is(s.done && sp(await note(page)) === sp(C.equation(loc, r4)) && sp(await page.evaluate(() => document.querySelector('.sf-q').textContent)) === sp(t4.a), `${tag}: healed — «${await note(page)}», «${t4.a}»`);
    is(await count(page, '.sf-patient .sf-pic.is-healed') === 1 && await count(page, '.sf-band') === 1, `${tag}: the patient turns to colour, the plaster lands`);
    /* ---- the decoy on the change frame (w20 round 3: t0 = 4, t1 = 13, t2 = 17) ---- */
    tag = `${loc} shells`;
    await force(page, 'w20', 3);
    await put(page, 't2', 'change', tag); await put(page, 't1', 'result', tag); await click(page, '.sf-frame[data-role="start"]', tag); await dialTo(page, 9, tag);
    await diag(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '.sf-frame.is-bad[data-role="change"]') === 1 && await count(page, '.sf-cl.is-bad[data-role="change"]') === 1, `${tag}: 17 on the change frame — the film stops there, with its sentence`);
    /* ---- put together: the known part on the other part frame (w20 round 7: t0 = 13 whole, t1 = 5) ---- */
    tag = `${loc} apples`;
    await force(page, 'w20', 7);
    await put(page, 't0', 'whole', tag); await put(page, 't1', 'part2', tag); await click(page, '.sf-frame[data-role="part1"]', tag); await dialTo(page, 8, tag);
    await diag(page, tag); s = await st(page);
    is(s.done, `${tag}: the known part fits either part frame`);
    /* ---- Groups: 4 squirrels share 20 acorns (grp round 4: roles groups, total; t0 = 20 total, t1 = 4 groups) ---- */
    tag = `${loc} share`;
    await force(page, 'grp', 4);
    await put(page, 't0', 'total', tag); await put(page, 't1', 'groups', tag); await click(page, '.sf-frame[data-role="each"]', tag); await dialTo(page, 5, tag);
    is(await count(page, '.sf-frame[data-role="groups"] .sf-traycirc') === 4, `${tag}: four trays for four squirrels`);
    await diag(page, tag); s = await st(page);
    const D = { en: '÷', es: '÷', pt: '÷' }[loc] || ':';
    is(s.done && sp(await note(page)) === sp(C.equation(loc, C.round('grp', 4))) && (await note(page)).indexOf(D) >= 0, `${tag}: «${await note(page)}» uses ${D}`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- en: the intro film, the keyboard ---- */
  {
    const { page } = await open(1024, 'en'); const tag = 'en intro';
    await force(page, 'w20', 1, false); await wait(500);
    is(await count(page, '.sf-cl.is-lit') === 1, `${tag}: the intro film lights a sentence`);
    { const c = await page.evaluate(() => { const r = document.querySelector('.sf-card').getBoundingClientRect(); return { x: r.left + 20, y: r.bottom - 12 }; }); await page.mouse.click(c.x, c.y); } await wait(80);
    is(await page.evaluate(() => window.StoryFilmActivity._view.intro == null), `${tag}: a tap skips the intro`);
    await page.evaluate(() => { window.StoryFilmActivity.FAST = true; });
    await click(page, '.sf-frame[data-role="change"]', tag); await page.focus('.sf-frame[data-role="change"]'); await page.keyboard.press('ArrowUp'); await page.keyboard.press('ArrowUp'); await wait(40);
    is((await st(page)).dial === 3, `${tag}: ↑ turns the dial`);
    await page.close();
  }

  /* ---- every round of every level at rest and solved, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) for (const idx of C.ids(lv)) for (const state of ['rest', 'solved']) {
      const tag = `${loc} @${w} ${lv}.${idx} ${state}`;
      await force(page, lv, idx);
      if (state === 'solved') {
        await page.evaluate(() => { const a = window.StoryFilmActivity, C = window.StoryFilmCore, s = a.st, r = s.r;
          Object.keys(r.v).forEach((k, j) => C.place(s, k, 't' + j)); C.markMystery(s, r.u); C.setDial(s, r.answer); a._paint(); a._check(); });
        await page.waitForFunction(() => [...document.querySelectorAll('.sf-wrap img.sf-pic')].every(i => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
        await wait(60);
      } else await page.evaluate(() => window.scrollTo(0, 0));
      const m = await page.evaluate(() => {
        const L = window.StoryFilmCore.layout(window.StoryFilmActivity._width()), out = { fails: [] };
        const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
        out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        out.low = Math.max.apply(null, [...document.querySelectorAll('.sf-tile,.sf-go,.sf-frame,.sf-dbtn')].filter(vis).map(e => e.getBoundingClientRect().bottom));
        const nr = document.querySelector('.sf-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
        [...document.querySelectorAll('.sf-tile,.sf-go,.sf-frame,.sf-dbtn,.sf-read')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(), min = 44; if (r.width < min || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        [...document.querySelectorAll('.sf-wrap img.sf-pic')].filter(vis).filter(i => !i.classList.contains('sf-band')).forEach(i => { const r = i.getBoundingClientRect(), floor = L.mode === 'wide' ? 96 : 64; if (Math.round(Math.min(r.width, r.height)) < floor) out.fails.push('picture ' + Math.round(r.width) + ' < ' + floor); });
        [...document.querySelectorAll('.sf-frame')].filter(vis).forEach(f => { const R = f.getBoundingClientRect(), d = f.querySelector('.sf-dots'); if (d) { const r = d.getBoundingClientRect(); if (r.right > R.right + 1 || r.left < R.left - 1) out.fails.push('dots spill out of a frame'); } });
        return out;
      });
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest') is(m.low <= VH(w), `${tag}: every control above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
      else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`);
      is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
      if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && idx === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${w}-${state}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-story-film: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
