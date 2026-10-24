#!/usr/bin/env node
/* =====================================================================
   local-test-zero-cards.js — ACTIVITY #98, The Zero-Swallowing Cards, in a
   real browser with real pointer actions (never a model call to move a
   card), 11 locales.
   Scenarios per locale:
     · empty Check → hintEmpty, no miss; tap the 40 card → four rods pour;
     · drag the 7 card BESIDE the stand → it tips, hintTip, still 40;
       over the tens digit → tips; onto the 0 → 47, the 0 swallowed, 7 cubes;
       Check → okBuild with the locale's phrases, the rods count 10…40;
     · a tap right after a drag is not swallowed (the 300 ms window);
     · 12 built as 22 → miss 1 hintRods + the rods half glows; miss 2
       hintGhost + one rod outlined as extra, no ghost of the answer drawn
       before miss 2; then 12 → right;
     · a decade (90): the tens card alone → okBuild0;
     · how many tens? (30): no target card, the mat holds 3 given rods and
       the cards do not pour; 40 → hintRods; 30 → right;
     · stretch 43: built → hintStretch (no miss); drag the 7 to the side →
       40 + 3 → okApart; 67 together: stretched → hintTogether, the ⟷
       button joins it → okTogether; S on the keyboard stretches;
     · which blocks? 47: the stack is given, no rack; Check → hintPickTray;
       a wrong tray → miss, the stack's blocks laid over it, hintWhich1;
       the right tray → done; key 1/2/3 picks a tray; the right tray sits
       3/3/3 across a pass as RENDERED (not as planned);
     · to 20: the rack holds only 10 and 20.
   Then every round of every face at rest, at miss 2 and solved — reached ONCE
   per locale by real clicks, then resized through 320…1366: no sideways
   scroll, Check above the fold at rest, Check and the hint in view at miss 2,
   the success line in view, controls ≥ 44 px, nothing outside the card, the
   stand / mat / rack-or-trays / Check never overlap, nine rods and nine cubes
   fit the mat.
   Usage: node scripts/local-test-zero-cards.js [--widths=…] [--locales=…] [--faces=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const FACES = arg('faces', 'build,tens,stretch,which').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '098-zero-cards', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'zero-cards-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, ZeroCardsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'zero-cards-activity.js'), 'utf8') + '\n;this.__A = ZeroCardsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const TP = (loc, t) => t === 1 ? T(loc, 'pT1') : T(loc, 'pTn', { t });
const OP = (loc, o) => o === 1 ? T(loc, 'pO1') : T(loc, 'pOn', { o });
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
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
    await page.goto(`${base}/zero-cards-activity.html?activity=place-value.tens-and-ones.1-nbt-b-2&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.ZeroCardsActivity && window.ZeroCardsActivity.st && document.querySelector('.zc-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.ZeroCardsActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, face, id, numbers, code) {
    await page.evaluate((face, id, numbers, code) => { const a = window.ZeroCardsActivity; a.api.settings.task = face; a.api.settings.numbers = numbers || '99'; a._pool = null; a._ensurePool(); if (code != null) a._codes = { [id]: code }; a._start(id, 0); a._render2(); window.scrollTo(0, 0); }, face, id, numbers, code);
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.ZeroCardsActivity.st; return { tens: s.tens, ones: s.ones, v: (s.tens || 0) + (s.ones || 0), stretched: s.stretched, tray: s.tray, lastTray: s.lastTray, rightPos: s.rightPos, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.zc-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, left: r.left, right: r.right, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(10); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  const check = (page, tag) => click(page, K('check'), tag);
  /* drag a rack card to a spot relative to the stand: 'zero' (right cell), 'left' (over the tens cell), 'off' (just beside the stand) */
  async function dragTo(page, sel, where, tag) {
    const a = await centre(page, sel); if (!a) { is(false, `${tag}: there is a «${sel}» to drag`); return; }
    const s = await page.evaluate(() => { const st = document.querySelector('.zc-stand').getBoundingClientRect(), r = document.querySelector('.zc-cell.is-r').getBoundingClientRect(), l = document.querySelector('.zc-cell.is-l').getBoundingClientRect(); return { right: st.right, y: st.top + st.height / 2, rx: r.left + r.width / 2, lx: l.left + l.width / 2 }; });
    const x = where === 'zero' ? s.rx : where === 'left' ? s.lx : s.right + 50;
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 8; k++) { await page.mouse.move(a.x + (x - a.x) * k / 8, a.y + (s.y - a.y) * k / 8); await wait(8); }
    await page.mouse.up(); await wait(30);
  }
  async function dragSide(page, sel, dx) {
    const a = await centre(page, sel); if (!a) return;
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 6; k++) { await page.mouse.move(a.x + dx * k / 6, a.y); await wait(8); }
    await page.mouse.up(); await wait(30);
  }
  async function build(page, v, tag) { if (Math.floor(v / 10)) await click(page, K('rack-t' + Math.floor(v / 10) * 10), tag); if (v % 10) await click(page, K('rack-o' + (v % 10)), tag); }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} build 47`, s;
    /* ---- 47 as a number word: tip, tip, stack ---- */
    await force(page, 'build', 'b3');
    is(sp(await page.evaluate(() => document.querySelector('.zc-target').textContent)) === sp(ACT.WORDS[loc][47]), `${tag}: the target is the word «${ACT.WORDS[loc][47]}»`);
    await check(page, tag); s = await st(page);
    is(sp(await note(page)) === sp(T(loc, 'hintEmpty')) && s.misses === 0, `${tag}: empty → hintEmpty, no miss`);
    await click(page, K('rack-t40'), tag); s = await st(page);
    is(s.tens === 40 && await count(page, '.zc-mat .zc-rod') === 4 && await count(page, '.zc-mat .zc-cube') === 0, `${tag}: the 40 card pours four rods`);
    await dragTo(page, K('rack-o7'), 'off', tag); s = await st(page);
    is(s.v === 40 && s.ones === null && sp(await note(page)) === sp(T(loc, 'hintTip')) && await count(page, '.zc-card.is-tip') === 1, `${tag}: the 7 laid beside the stand tips off, hintTip, still 40`);
    await wait(60);
    await dragTo(page, K('rack-o7'), 'left', tag); s = await st(page);
    is(s.v === 40 && s.ones === null, `${tag}: the 7 over the tens digit tips off`);
    await wait(60);
    await dragTo(page, K('rack-o7'), 'zero', tag); s = await st(page);
    is(s.v === 47 && await count(page, '.zc-stand .zc-card') === 2 && await count(page, '.zc-mat .zc-cube') === 7, `${tag}: the 7 on the 0 → 47, seven cubes`);
    is(await page.evaluate(() => { const z = document.querySelector('.zc-card.is-tens .is-zero').getBoundingClientRect(), o = document.querySelector('.zc-card.is-ones').getBoundingClientRect(); return o.left <= z.left + 1 && o.right >= z.right - 1 && o.top <= z.top + 1 && o.bottom >= z.bottom - 1; }), `${tag}: the ones card covers the 0 completely`);
    /* the tap right after a drag is not swallowed */
    await wait(350); await click(page, K('rack-o3'), tag); s = await st(page);
    is(s.v === 43, `${tag}: a tap after a drag is not swallowed (43)`);
    await click(page, K('stand-o'), tag); s = await st(page);
    is(s.v === 40 && s.ones === null, `${tag}: tapping the placed ones card takes it back`);
    await click(page, K('rack-o7'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBuild', { n: 47, tp: TP(loc, 4), op: OP(loc, 7) })), `${tag}: 47 → okBuild «${sp(await note(page))}»`);
    is(await page.evaluate(() => [...document.querySelectorAll('.zc-mat .zc-rod')].map(r => r.getAttribute('data-n')).join()) === '10,20,30,40', `${tag}: the rods count 10, 20, 30, 40`);
    /* ---- 12 (ten frames) built as 22 ---- */
    tag = `${loc} build 12`;
    await force(page, 'build', 'b0');
    is(await count(page, '.zc-target .zc-tf b.is-on') === 12, `${tag}: ten frames show 12 dots`);
    await build(page, 22, tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintRods')) && await count(page, '.zc-half.is-rods.is-glow') === 1 && await count(page, '.zc-rod.is-ghost,.zc-cube.is-ghost,.zc-rod.is-extra') === 0, `${tag}: 22 → miss 1, hintRods, the rods half glows, nothing of the answer drawn`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintGhost')) && await count(page, '.zc-mat .zc-rod.is-extra') === 1, `${tag}: miss 2 → hintGhost, one rod outlined as extra`);
    await click(page, K('rack-t10'), tag); s = await st(page);
    is(s.v === 12 && await count(page, '.zc-rod.is-extra') === 0, `${tag}: a new move takes the help away`);
    await check(page, tag); is((await st(page)).done, `${tag}: 12 → right`);
    /* ---- a decade ---- */
    tag = `${loc} build 90`;
    await force(page, 'build', 'b8');
    is(sp(await page.evaluate(() => document.querySelector('.zc-target').textContent)) === sp(TP(loc, 9)), `${tag}: the target reads «${TP(loc, 9)}»`);
    await click(page, K('rack-t90'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBuild0', { n: 90, tp: TP(loc, 9) })), `${tag}: 90 alone → okBuild0`);
    /* ---- how many tens? ---- */
    tag = `${loc} tens 30`;
    await force(page, 'tens', 't0');
    is(await count(page, '.zc-target') === 0 && await count(page, '.zc-mat .zc-rod') === 3 && await count(page, '.zc-mat.is-given') === 1, `${tag}: no target card, three given rods on the mat`);
    await click(page, K('rack-t40'), tag);
    is(await count(page, '.zc-mat .zc-rod') === 3, `${tag}: the cards do not pour onto the given mat`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintRods')) && await count(page, '.zc-half.is-rods.is-glow') === 1, `${tag}: 40 → hintRods, the rods glow`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintTensCount')), `${tag}: miss 2 → hintTensCount`);
    await click(page, K('rack-t30'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBuild0', { n: 30, tp: TP(loc, 3) })), `${tag}: 30 → okBuild0`);
    /* ---- stretch apart ---- */
    tag = `${loc} stretch 43`;
    await force(page, 'stretch', 's0');
    is(await count(page, K('stretch')) === 1 && await page.evaluate(() => document.querySelector('[data-k="stretch"]').disabled), `${tag}: the stretch button waits for two cards`);
    await build(page, 43, tag); await check(page, tag); s = await st(page);
    is(!s.done && s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintStretch')), `${tag}: built → hintStretch, no miss`);
    await dragSide(page, K('stand-o'), 70); s = await st(page);
    is(s.stretched && s.v === 43 && await count(page, '.zc-plus') === 1, `${tag}: dragging the ones card aside stretches it: 40 + 3`);
    is(await page.evaluate(() => { const t = document.querySelector('.zc-card.is-tens').textContent.replace(/\s/g, ''); return t; }) === '40', `${tag}: stretched, the tens card shows its 0 again (40)`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okApart', { n: 43, a: 40, b: 3 })), `${tag}: okApart`);
    /* ---- stretch together ---- */
    tag = `${loc} together 67`;
    await force(page, 'stretch', 's1');
    is(sp(await page.evaluate(() => document.querySelector('.zc-target').textContent)) === '60 + 7', `${tag}: the target reads 60 + 7`);
    await build(page, 67, tag); await click(page, K('stretch'), tag); await check(page, tag); s = await st(page);
    is(s.stretched && !s.done && sp(await note(page)) === sp(T(loc, 'hintTogether')), `${tag}: stretched → hintTogether`);
    await click(page, K('stretch'), tag); s = await st(page); is(!s.stretched, `${tag}: the ⟷ button joins it`);
    await page.focus('.zc-wrap'); await page.keyboard.press('s'); s = await st(page); is(s.stretched, `${tag}: S on the keyboard stretches`);
    await page.keyboard.press('s'); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okTogether', { n: 67, a: 60, b: 7 })), `${tag}: okTogether`);
    /* ---- which blocks? ---- */
    tag = `${loc} which 47`;
    await force(page, 'which', 'w0', '99', 1);
    s = await st(page);
    is(await count(page, '.zc-rack') === 0 && await count(page, '.zc-tray') === 3 && await count(page, '.zc-target') === 0 && s.v === 47 && s.rightPos === 1, `${tag}: the stack is given, three trays, no rack`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintPickTray')) && (await st(page)).misses === 0, `${tag}: no tray → hintPickTray`);
    await click(page, K('tray-0'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.lastTray === 0 && sp(await note(page)) === sp(T(loc, 'hintWhich1')) && await count(page, '.zc-tray.is-miss') === 1 && await count(page, '.zc-tray.is-miss .is-extra,.zc-tray.is-miss .is-ghost') > 0, `${tag}: a wrong tray → miss, the stack laid over it, hintWhich1`);
    await page.focus('.zc-wrap'); await page.keyboard.press('2'); s = await st(page);
    is(s.tray === 1, `${tag}: key 2 picks the second tray`);
    await check(page, tag); s = await st(page); is(s.done && await count(page, '.zc-tray.is-right') === 1, `${tag}: the right tray`);
    /* the right tray as RENDERED over one pass */
    const posAt = await page.evaluate(async () => {
      const a = window.ZeroCardsActivity, out = []; a.api.settings.task = 'which'; a._pool = null; a._order = null;
      for (let k = 0; k < 9; k++) { const t = a.nextTask({ index: k }); t.setup(a); a._render2(); const trays = [...document.querySelectorAll('.zc-tray')]; out.push(trays.findIndex(b => { const n = b.querySelectorAll('.zc-rod').length * 10 + b.querySelectorAll('.zc-cube').length; return n === a.st.r.n; })); }
      return out;
    });
    const cnt = [0, 1, 2].map(x => posAt.filter(y => y === x).length);
    is(cnt.join() === '3,3,3', `${loc}: the right tray sits 3/3/3 over a pass as rendered (${posAt.join('')})`);
    /* ---- to 20 ---- */
    await force(page, 'build', 'b1', '20');
    is(await count(page, '.zc-rackt .zc-chip') === 2 && await count(page, K('rack-t20')) === 1, `${loc} to 20: the rack holds 10 and 20 only`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    if (r.kind === 'which') {
      const s = await st(page), wrong = [0, 1, 2].filter(i => i !== s.rightPos);
      if (state === 'solved') { await click(page, K('tray-' + s.rightPos), tag); await check(page, tag); return; }
      for (const i of wrong) { await click(page, K('tray-' + i), tag); await check(page, tag); }
      return;
    }
    if (state === 'solved') { await build(page, r.n, tag); if (r.kind === 'stretch' && r.dir === 'apart') await click(page, K('stretch'), tag); await check(page, tag); return; }
    const wrong = [r.n + 10, r.n - 10, r.n + 1, r.n - 1].find(v => v >= 1 && v <= 99 && Math.floor(v / 10) * 10 <= 90);
    await build(page, wrong, tag); await check(page, tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.zc-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.zc-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.zc-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.zc-wrap').getBoundingClientRect();
    document.querySelectorAll('.zc-target,.zc-stand,.zc-mat,.zc-chip,.zc-tray,.zc-check,.zc-stretch').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < W.left - 1 || q.right > W.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    /* the blocks stay inside their mat / tray */
    document.querySelectorAll('.zc-mat .zc-rod,.zc-mat .zc-cube').forEach(e => { const m = document.querySelector('.zc-mat').getBoundingClientRect(), q = e.getBoundingClientRect(); if (q.left < m.left - 1 || q.right > m.right + 1 || q.top < m.top - 1 || q.bottom > m.bottom + 1) out.fails.push('a block outside the mat'); });
    document.querySelectorAll('.zc-tray').forEach(t => { const m = t.getBoundingClientRect(); t.querySelectorAll('.zc-rod,.zc-cube').forEach(e => { const q = e.getBoundingClientRect(); if (q.left < m.left || q.right > m.right || q.top < m.top || q.bottom > m.bottom) out.fails.push('a block outside its tray'); }); });
    /* the bands never overlap */
    const band = ['.zc-target', '.zc-standrow', '.zc-mat', '.zc-right', '.zc-foot'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    /* the mat fits nine rods and nine cubes */
    const hr = document.querySelector('.zc-half.is-rods'), hc = document.querySelector('.zc-half.is-cubes'); if (hr && vis(hr)) { const ws = getComputedStyle(document.querySelector('.zc-wrap')), rw = parseFloat(ws.getPropertyValue('--zc-rw')), cu = parseFloat(ws.getPropertyValue('--zc-cu')), a = getComputedStyle(hr), b = getComputedStyle(hc); const needR = 9 * rw + 8 * parseFloat(a.columnGap) + parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), needC = 5 * cu + 4 * parseFloat(b.columnGap) + parseFloat(b.paddingLeft) + parseFloat(b.paddingRight); if (!(rw > 0) || needR > hr.getBoundingClientRect().width + 0.5) out.fails.push('nine rods would not fit side by side (' + Math.round(needR) + ' > ' + Math.round(hr.getBoundingClientRect().width) + ')'); if (!(cu > 0) || needC > hc.getBoundingClientRect().width + 0.5) out.fails.push('a row of five cubes would not fit'); }
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const face of FACES) for (const id of C.ids(face, '99')) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(face, '99', id), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${face} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, face, id);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${face} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.zc-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 300); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.zc-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^[btsw][0-1]$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${face}-${id}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-zero-cards: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
