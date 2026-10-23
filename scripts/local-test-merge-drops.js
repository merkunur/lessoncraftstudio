#!/usr/bin/env node
/* =====================================================================
   local-test-merge-drops.js — ACTIVITY #83, The Merging Drops ("Add Three
   Numbers", 1.OA.A.2), in a real browser with REAL pointer drags and clicks
   (never a model call to make a move). For every locale:
     · 3 + 4 + 5: the tick with nothing typed is a hint, no miss; a real
       drag of A onto B joins them (7); the round arrow undoes it; a tap on
       A then C joins them (8); a leading 0 is refused; typing 9 (= 4 + 5)
       joins exactly B and C and leaves A outside, pulsing, with hTwo;
       a new key press clears the hint; 11 is miss 2: everything joined,
       the pearl ring with "10" on it, the beads past ten NOT numbered (the child counts on); typing 12
       succeeds; "Try another way" shows three orders and okAny;
     · 6 + 4 + 9: drag A onto B makes a pearl (10); C onto it rises into
       the whole circle; the success line is the child's own path,
       4 + 6 = 10 and 10 + 9 = 19; "u" on the keyboard undoes before that;
     · Within 10 (2 + 1 + 3): a miss that is no pair sum joins everything
       with hJoined (no pearl); miss 2 is hCountAll; 5 + 1 + 4 (exactly ten) gets hPearlTen then hCountTen, and a drop of 1 reads in the singular;
     · Beads "numerals only": single drops carry no beads.
   And every round of both levels at rest, at miss 2 and solved at
   320–1366: every control above the fold at rest, the keypad in view after
   a miss, the success line in view when solved, no sideways scroll, every
   control ≥ 44 px, every bead inside its drop, the last drop inside the
   whole circle, beads ≥ 9 px.
   Usage: node scripts/local-test-merge-drops.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '083-merge-drops', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'merge-drops-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, MergeDropsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'merge-drops-activity.js'), 'utf8') + '\n;this.__A = MergeDropsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/merge-drops-activity.html?activity=numberbond.add-three.1-oa-a-2&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.MergeDropsActivity && window.MergeDropsActivity.st && document.querySelector('.md-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.MergeDropsActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx, beads) {
    await page.evaluate((level, idx, beads) => { const a = window.MergeDropsActivity; a.api.settings.numbers = level; a.api.settings.beads = beads || 'show'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); window.scrollTo(0, 0); }, level, idx, beads);
    await wait(40);
  }
  const st = (page) => page.evaluate(() => { const s = window.MergeDropsActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, typed: s.typed, drops: s.drops.map(d => d.id + ':' + d.n), log: s.log.length }; });
  const note = (page) => page.evaluate(() => document.querySelector('.md-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(30); return true;
  }
  async function drag(page, from, to, tag) {
    await page.evaluate(() => window.scrollTo(0, 0));
    const pts = await page.evaluate((f, t) => { const a = document.querySelector(f), b = document.querySelector(t); if (!a || !b) return null; const r = a.getBoundingClientRect(), q = b.getBoundingClientRect(); return { x0: r.left + r.width / 2, y0: r.top + r.height / 2, x1: q.left + q.width / 2, y1: q.top + q.height / 2 }; }, from, to);
    if (!pts) { is(false, `${tag}: both drops to drag exist`); return; }
    await page.mouse.move(pts.x0, pts.y0); await page.mouse.down();
    for (let k = 1; k <= 8; k++) await page.mouse.move(pts.x0 + (pts.x1 - pts.x0) * k / 8, pts.y0 + (pts.y1 - pts.y0) * k / 8);
    await page.mouse.up(); await wait(40);
  }
  const typeKeys = async (page, s, tag) => { for (const d of s) await click(page, `[data-k="key-${d}"]`, tag); };
  const ok = (page, tag) => click(page, '[data-k="key-ok"]', tag);

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- 3 + 4 + 5 = 12 (w20 round 0) ---- */
    let tag = `${loc} 3+4+5`;
    await force(page, 'w20', 0);
    await ok(page, tag); let s = await st(page);
    is(s.misses === 0 && s.last === 'empty' && sp(await note(page)) === sp(T(loc, 'hEmpty')), `${tag}: the tick with nothing typed is a hint, no miss`);
    await drag(page, '[data-id="A"]', '[data-id="B"]', tag); s = await st(page);
    is(s.drops.length === 2 && s.drops.indexOf('BA:7') >= 0, `${tag}: a real drag of A onto B joins them (${s.drops})`);
    is(await count(page, '.md-drop.is-joined .md-num') === 0, `${tag}: the joined drop carries no numeral`);
    await click(page, '[data-k="undo"]', tag); s = await st(page);
    is(s.drops.join() === 'A:3,B:4,C:5', `${tag}: the round arrow undoes the join (${s.drops})`);
    await click(page, '[data-id="A"]', tag); is(await count(page, '.md-drop.is-sel') === 1, `${tag}: a tap selects a drop`);
    await click(page, '[data-id="C"]', tag); s = await st(page);
    is(s.drops.indexOf('CA:8') >= 0, `${tag}: tap A then C joins them (${s.drops})`);
    await click(page, '[data-k="undo"]', tag);
    await click(page, '[data-k="key-0"]', tag); s = await st(page);
    is(s.typed === '', `${tag}: a leading 0 is refused`);
    await typeKeys(page, '9', tag); await ok(page, tag); s = await st(page);
    is(s.last === 'two' && s.misses === 1 && s.drops.length === 2 && s.drops.indexOf('A:3') >= 0 && s.drops.indexOf('BC:9') >= 0, `${tag}: 9 joins exactly B and C, A outside (${s.drops})`);
    is(await count(page, '.md-drop.is-out[data-id="A"]') === 1, `${tag}: the drop left outside pulses`);
    is(sp(await note(page)) === sp(T(loc, 'hTwo', { n: 9 })), `${tag}: hTwo names the 9 (${await note(page)})`);
    await click(page, '[data-k="key-del"]', tag);
    is((await note(page)) === '', `${tag}: a new key press clears the hint`);
    await typeKeys(page, '11', tag); await ok(page, tag); s = await st(page);
    is(s.last === 'count' && s.misses === 2 && s.drops.length === 1, `${tag}: miss 2 joins everything (${s.drops})`);
    is(await count(page, '.md-drop.is-whole .md-pearl') === 1 && await count(page, '.md-drop.is-whole .md-ten') === 1, `${tag}: the last drop holds the pearl, "10" on it`);
    is(await count(page, '.md-bnum') === 0, `${tag}: the beads past ten are NOT numbered (the child counts on)`);
    is(sp(await note(page)) === sp(T(loc, 'hCount')), `${tag}: hCount`);
    await click(page, '[data-k="key-del"]', tag); await click(page, '[data-k="key-del"]', tag);
    await typeKeys(page, '12', tag); await ok(page, tag); s = await st(page);
    is(s.done, `${tag}: 12 succeeds`);
    is(sp(await note(page)).indexOf('= 12') >= 0, `${tag}: the success line ends in 12 (${await note(page)})`);
    is(await page.evaluate(() => [...document.querySelectorAll('.md-key')].every(k => k.disabled)), `${tag}: the keys lock`);
    await click(page, '[data-k="other"]', tag);
    is(await count(page, '.md-way') === 3, `${tag}: "Try another way" shows three orders`);
    is(sp(await note(page)).indexOf(sp(T(loc, 'okAny', { total: 12 }))) >= 0, `${tag}: okAny`);

    /* ---- 6 + 4 + 9 = 19 (w20 round 9): the pearl and the child's own path ---- */
    tag = `${loc} 6+4+9`;
    await force(page, 'w20', 9);
    await drag(page, '[data-id="A"]', '[data-id="B"]', tag); s = await st(page);
    is(s.drops.indexOf('BA:10') >= 0 && await count(page, '.md-drop.is-joined .md-pearl') === 1, `${tag}: A onto B makes a pearl (${s.drops})`);
    await page.focus('.md-wrap'); await page.keyboard.press('u'); await wait(30); s = await st(page);
    is(s.drops.length === 3, `${tag}: "u" undoes`);
    await drag(page, '[data-id="A"]', '[data-id="B"]', tag);
    await drag(page, '[data-id="C"]', '[data-id="BA"]', tag); s = await st(page);
    is(s.drops.length === 1 && await count(page, '.md-drop.is-whole') === 1, `${tag}: the last drop rises into the whole circle`);
    is(await count(page, '.md-drop.is-whole .md-bnum') === 0, `${tag}: beads are not numbered without a miss`);
    await page.focus('.md-wrap'); await page.keyboard.press('1'); await page.keyboard.press('9'); await wait(30);
    is((await st(page)).typed === '19', `${tag}: digits typed on the keyboard`);
    await ok(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okPath', { a: 4, b: 6, s: 10, c: 9, total: 19 })), `${tag}: the success line is the child's path (${await note(page)})`);
    is(await count(page, '.md-wc.is-full') === 1, `${tag}: the whole circle fills`);

    /* ---- Within 10: 2 + 1 + 3 = 6 ---- */
    tag = `${loc} w10 2+1+3`;
    await force(page, 'w10', 0);
    await typeKeys(page, '2', tag); await ok(page, tag); s = await st(page);
    is(s.last === 'joined' && s.drops.length === 1 && sp(await note(page)) === sp(T(loc, 'hJoined')), `${tag}: a miss that is no pair sum joins everything, hJoined`);
    is(await count(page, '.md-pearl') === 0, `${tag}: no pearl below ten`);
    await click(page, '[data-k="key-del"]', tag); await typeKeys(page, '5', tag); await ok(page, tag);
    is(await count(page, '.md-ten') === 0 && sp(await note(page)) === sp(T(loc, 'hCountAll')), `${tag}: miss 2 below ten: hCountAll, no label`);
    /* ---- Within 10: 5 + 1 + 4 = exactly ten ---- */
    tag = `${loc} w10 5+1+4`;
    await force(page, 'w10', 4);
    is(await page.evaluate(() => document.querySelector('[data-id="B"]').getAttribute('aria-label')) === T(loc, 'ariaDrop1'), `${tag}: a drop of 1 is read in the singular`);
    await typeKeys(page, '2', tag); await ok(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hPearlTen')) && await count(page, '.md-pearl') === 1, `${tag}: a full pearl and nothing more: hPearlTen`);
    await click(page, '[data-k="key-del"]', tag); await typeKeys(page, '3', tag); await ok(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hCountTen')) && await count(page, '.md-ten') === 1, `${tag}: miss 2 at ten: hCountTen, the pearl says 10`);

    /* ---- numerals only ---- */
    tag = `${loc} numerals`;
    await force(page, 'w20', 0, 'num');
    is(await count(page, '.md-drop .md-bead') === 0 && await count(page, '.md-drop .md-num') === 3, `${tag}: single drops show only their numerals`);
    await drag(page, '[data-id="A"]', '[data-id="B"]', tag);
    is(await count(page, '.md-drop.is-joined .md-bead') === 7, `${tag}: a joined drop still shows its beads`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round of every level at rest, at miss 2 and solved, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) for (const idx of C.ids(lv)) for (const state of ['rest', 'miss2', 'solved']) {
      const tag = `${loc} @${w} ${lv}.${idx} ${state}`, r = C.round(lv, idx);
      await force(page, lv, idx);
      if (state === 'miss2') {
        const wrong = String(r.total + 1), w2 = String(r.total - 1);
        await typeKeys(page, wrong, tag); await ok(page, tag);
        for (const _ of wrong) await click(page, '[data-k="key-del"]', tag);
        await typeKeys(page, w2, tag); await ok(page, tag);
        await page.evaluate(() => { const k = document.querySelector('.md-keys'); k.scrollIntoView({ block: 'nearest', behavior: 'instant' }); });
      } else if (state === 'solved') {
        await drag(page, '[data-id="A"]', '[data-id="B"]', tag);
        await drag(page, '[data-id="C"]', '[data-id="BA"]', tag);
        await typeKeys(page, String(r.total), tag); await ok(page, tag);
        await page.evaluate(() => { const n = document.querySelector('.md-note'); n.scrollIntoView({ block: 'nearest', behavior: 'instant' }); });
      }
      await wait(30);
      const m = await page.evaluate(() => {
        const out = { fails: [] };
        const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.hidden; };
        out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const ctrls = [...document.querySelectorAll('.md-drop,.md-key,.md-tbtn')].filter(vis);
        out.low = Math.max.apply(null, ctrls.map(e => e.getBoundingClientRect().bottom));
        const kr = document.querySelector('.md-keys').getBoundingClientRect(); out.kTop = kr.top; out.kBottom = kr.bottom;
        const nr = document.querySelector('.md-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
        ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        [...document.querySelectorAll('.md-drop')].forEach(d => { const R = d.getBoundingClientRect(); d.querySelectorAll('.md-bead').forEach(b => { const q = b.getBoundingClientRect(); if (q.left < R.left - 1 || q.right > R.right + 1 || q.top < R.top - 1 || q.bottom > R.bottom + 1) out.fails.push('a bead outside its drop'); if (q.width < 8.5) out.fails.push('bead ' + q.width.toFixed(1) + 'px'); }); });
        const wd = document.querySelector('.md-drop.is-whole'), wc = document.querySelector('.md-wc');
        if (wd && wc) { const a = wd.getBoundingClientRect(), b = wc.getBoundingClientRect(); if (a.left < b.left - 2 || a.right > b.right + 2 || a.top < b.top - 2 || a.bottom > b.bottom + 2) out.fails.push('the last drop overflows the whole circle'); }
        const keys = [...document.querySelectorAll('.md-key')]; out.keysEnabled = keys.every(k => !k.disabled);
        return out;
      });
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest') is(m.low <= VH(w), `${tag}: every control above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
      else if (state === 'miss2') is(m.kTop >= 0 && m.kBottom <= VH(w) + 1, `${tag}: the keypad in view after the help (${Math.round(m.kTop)}–${Math.round(m.kBottom)})`);
      else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`);
      if (state === 'solved') is((await st(page)).done, `${tag}: solved by real drags + keys`);
      is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
      if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 9 || idx === 0)) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${idx}-${w}-${state}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-merge-drops: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
