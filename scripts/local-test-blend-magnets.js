#!/usr/bin/env node
/* =====================================================================
   local-test-blend-magnets.js — the interaction gate for ACTIVITY #54,
   The Blending Magnets (RF.K.2.c, 11 locales). Real pointer, every round
   of both levels in every locale at 704:
     Level 1 — Check with the magnets apart asks (no miss); the first-sound
       magnet DRAGGED halfway (the gap and the pause dots shrink), then into
       the pull zone (it snaps: one bar); Check without a picture asks; the
       RHYME tapped → the magnet test: its first sound pushes away, its end
       sticks (hintRhyme, miss 1); the SAME-ONSET picture → miss 2: the
       first letters on every picture (hintHelp); the target → right: the
       word on the fridge, celebrates;
     Level 2 — every sound magnet DRAGGED into the next until one bar; a
       distractor → «n stick, m push apart»; the target → right.
   Also: Magnet pull gentle (the same drag stops short), pulling a snapped
   pair apart, the keyboard (← → move a magnet), the German capital in the
   success line. And the width sweep (all locales at 320 / 704 / 1366, en
   at 320–1366) at rest, miss 2 and right: no sideways scroll, controls ≥
   44 px inside the card, the magnets inside the rail and never
   overlapping, text ≥ 14 px, pictures ≥ 96 / 64 px, every control above
   the fold.
   Usage: node scripts/local-test-blend-magnets.js [--widths=…] [--locales=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.onset-rime-blend.rf-k-2-c';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'blend-magnets-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, BlendMagnetsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'blend-magnets-activity.js'), 'utf8') + '\n;this.__A = BlendMagnetsActivity;', ctx); return ctx.__A.strings; })();
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/blend-magnets-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.BlendMagnetsActivity && window.BlendMagnetsActivity.st && document.querySelector('.bmg-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.BlendMagnetsActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.BlendMagnetsActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, gaps: s.gaps, chosen: s.chosen, layout: s.layout, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.bmg-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(40); }
  /* drag magnet i right by a fraction f of its current gap */
  async function dragMag(page, i, f) {
    const p = await ctr(page, `.bmg-mag[data-i="${i}"]`);
    const dx = await page.evaluate((i, f) => { const A = window.BlendMagnetsActivity; return A.st.gaps[i] * A._G.share * f; }, i, f);
    await page.mouse.move(p.x, p.y); await page.mouse.down();
    for (let k = 1; k <= 8; k++) await page.mouse.move(p.x + dx * k / 8, p.y);
    await page.mouse.up(); await wait(60);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.BlendMagnetsActivity; a.FAST = true; Object.assign(a.api.settings, { pull: 'strong' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(100);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function check(page) { await tap(page, '.bmg-check'); await page.waitForFunction(() => !window.BlendMagnetsActivity._busy, { timeout: 8000 }); await wait(40); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.BlendMagnetsActivity.OK_MS = 0; }); };
  const slotOf = (s, role) => s.layout.indexOf(role);
  const FRAME = (s) => `.bmg-frame[data-i="${s}"]`;

  for (const loc of LOCS) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === STR.title[loc], `${loc}: the title`);
    for (const r of C.rounds(loc, 'onset')) {
      await okRun(page); await force(page, 'onset', r.id);
      let s = await state(page);
      is((await page.evaluate(() => document.querySelectorAll('.bmg-frame').length)) === 3 && (await page.evaluate(() => document.querySelectorAll('.bmg-mag').length)) === 2 && (await page.evaluate(() => document.querySelectorAll('.bmg-dots i').length)) === 6, `${loc} ${r.id}: three pictures, two magnets, six pause dots`);
      await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintSnap'), `${loc} ${r.id}: Check with the magnets apart asks (no miss)`);
      await dragMag(page, 0, 0.5); s = await state(page);
      is(s.gaps[0] > 0.3 && s.gaps[0] < 0.7 && (await page.evaluate(() => document.querySelectorAll('.bmg-dots i').length)) === 3, `${loc} ${r.id}: dragged halfway — the gap and the dots shrink (${s.gaps[0].toFixed(2)})`);
      await dragMag(page, 0, 0.85); s = await state(page);
      is(s.gaps[0] === 0 && (await page.evaluate(() => document.querySelectorAll('.bmg-mag.is-jr').length)) === 1, `${loc} ${r.id}: into the pull zone — it snaps into one bar`);
      await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintChoose'), `${loc} ${r.id}: no picture yet asks (no miss)`);
      await tap(page, FRAME(slotOf(s, 1))); await check(page); s = await state(page);
      const tm = await page.evaluate(() => [...document.querySelectorAll('.bmg-tm')].map(e => e.textContent + ':' + (e.classList.contains('is-stick') ? 1 : 0)));
      is(s.misses === 1 && (await note(page)) === T(loc, 'hintRhyme') && tm.join() === r.pics[1].parts[0] + ':0,' + r.pics[1].parts[1] + ':1', `${loc} ${r.id}: the rhyme "${r.pics[1].word}" — its first sound pushes, its end sticks (${tm.join(' ')})`);
      await tap(page, FRAME(slotOf(s, 2))); await check(page); s = await state(page);
      const tags = await page.evaluate(() => [...document.querySelectorAll('.bmg-frame')].map(f => (f.querySelector('.bmg-tag') || {}).textContent || ''));
      is(s.help === 2 && (await note(page)) === T(loc, 'hintHelp', { onset: r.parts[0] }) && tags.every(Boolean), `${loc} ${r.id}: miss 2 — the first letters on every picture (${tags.join(' ')})`);
      await tap(page, FRAME(slotOf(s, 0))); await check(page); s = await state(page);
      is(s.done && (await page.evaluate(() => [...document.querySelectorAll('.bmg-fw')].map(e => e.textContent))).includes(r.word), `${loc} ${r.id}: the target — right, "${r.word}" on the fridge`);
      is(await celebrated(page), `${loc} ${r.id}: celebrates`);
    }
    for (const r of C.rounds(loc, 'sounds')) {
      await okRun(page); await force(page, 'sounds', r.id);
      let s = await state(page); const n = r.parts.length;
      is((await page.evaluate(() => document.querySelectorAll('.bmg-mag').length)) === n, `${loc} ${r.id}: ${n} sound magnets`);
      for (let i = 0; i < n - 1; i++) await dragMag(page, i, 0.9);
      s = await state(page); is(s.gaps.every(g => g === 0), `${loc} ${r.id}: every magnet dragged into the next — one bar`);
      await tap(page, FRAME(slotOf(s, 1))); await check(page); s = await state(page);
      const dp = r.pics[1].parts, stick = dp.filter((x, i) => x === r.parts[i]).length;
      is(s.misses === 1 && (await note(page)) === T(loc, 'hintSounds', { n: stick, m: Math.max(n, dp.length) - stick }), `${loc} ${r.id}: "${r.pics[1].word}" — ${stick} stick, ${Math.max(n, dp.length) - stick} push apart`);
      await tap(page, FRAME(slotOf(s, 0))); await check(page); s = await state(page);
      is(s.done && (await celebrated(page)), `${loc} ${r.id}: the target — right`);
    }
    if (loc === 'de') {
      await page.evaluate(() => { window.BlendMagnetsActivity.OK_MS = 60000; });
      await force(page, 'onset', C.rounds('de', 'onset')[0].id); await dragMag(page, 0, 0.9); let s = await state(page); await tap(page, FRAME(slotOf(s, 0))); await check(page);
      const okLine = await page.evaluate(() => { const A = window.BlendMagnetsActivity; return A._t('okOnset', A._args); });
      is(/Maus!/.test(okLine) && !/maus!/.test(okLine), `de: the success line capitalises the noun (${okLine})`);
    }
    if (loc === 'en') {
      await page.evaluate(() => { window.BlendMagnetsActivity.OK_MS = 60000; });
      await force(page, 'onset', 'onset-cat', { pull: 'gentle' }); await dragMag(page, 0, 0.85); let s = await state(page);
      is(s.gaps[0] > 0, `Magnet pull gentle: the same 85 % drag stops short (${s.gaps[0].toFixed(2)})`);
      await dragMag(page, 0, 0.99); s = await state(page); is(s.gaps[0] === 0, 'Magnet pull gentle: right up close it snaps');
      await page.focus('.bmg-mag[data-i="0"]'); await page.keyboard.press('ArrowLeft'); s = await state(page); is(s.gaps[0] > 0, '← pulls a snapped magnet apart');
      await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); s = await state(page); is(s.gaps[0] === 0, '→ pushes it back until it snaps');
      const p = await ctr(page, '.bmg-mag[data-i="0"]'); await page.mouse.move(p.x, p.y); await page.mouse.down(); for (let k = 1; k <= 8; k++) await page.mouse.move(p.x - 12 * k, p.y); await page.mouse.up(); await wait(60);
      s = await state(page); is(s.gaps[0] > 0, 'a firm pull to the left separates a snapped pair');
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const o = await open(w, loc);
    await o.page.evaluate(() => { window.BlendMagnetsActivity.OK_MS = 60000; });
    const cases = C.rounds(loc, 'onset').map(r => ['onset', r.id]).concat(C.rounds(loc, 'sounds').map(r => ['sounds', r.id]));
    for (const [lv, id] of cases) {
      await force(o.page, lv, id);
      const tag = `@${w} ${loc} ${id}`;
      for (const phase of ['rest', 'miss', 'right']) {
        if (phase === 'miss') await o.page.evaluate(() => {
          const A = window.BlendMagnetsActivity, C2 = window.BlendMagnetsCore, st = A.st;
          A._fridge = ['cat', 'sun', 'flag', 'star', 'bed', 'dog', 'hen', 'jar'].map(w => ({ parts: [w[0], w.slice(1)] }));
          st.gaps.forEach((_, i) => C2.move(st, i, 0)); C2.choose(st, st.layout.indexOf(1)); C2.check(st); C2.choose(st, st.layout.indexOf(2)); C2.check(st);
          A._busy = false; A._view = {}; A._paint();
        });
        if (phase === 'right') await o.page.evaluate(() => { const A = window.BlendMagnetsActivity, C2 = window.BlendMagnetsCore, st = A.st; A._clearTimers(); A._busy = false; C2.choose(st, st.layout.indexOf(0)); A._check(); });
        await wait(phase === 'right' ? 300 : 40);
        if (phase === 'miss') { const s3 = await state(o.page); if (s3.done || s3.misses < 2) throw new Error('miss phase did not land on miss 2: ' + id); }
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement, rail = document.querySelector('.bmg-rail').getBoundingClientRect();
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.bmg-frame,button.bmg-mag,.bmg-check:not([hidden]),.bmg-say')].filter(vis);
          const mags = [...document.querySelectorAll('.bmg-mag')].map(e => e.getBoundingClientRect());
          let hit = 0; for (let i = 0; i < mags.length; i++) for (let j = i + 1; j < mags.length; j++) if (mags[i].left < mags[j].right - 1 && mags[j].left < mags[i].right - 1) hit++;
          const inside = mags.every(b => b.left >= rail.left - 1 && b.right <= rail.right + 1);
          const txt = [...document.querySelectorAll('.bmg-mag span,.bmg-wm,.bmg-tm,.bmg-tag,.bmg-note')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.bmg-frame img')].map(e => e.getBoundingClientRect().width);
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 - 0.5 || b.height < 44 - 0.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            hit, inside, txt: txt.length ? Math.min(...txt) : 99, pic: Math.min(...pics),
            low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.pic >= minPic - 0.5, `${tag} ${phase}: no sideways scroll, controls ≥ 44 inside the card, pictures ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, pic ${Math.round(m.pic)})`);
        is(m.inside && m.hit === 0 && m.txt >= 14, `${tag} ${phase}: magnets inside the rail and not overlapping, text ≥ 14 px (inside ${m.inside}, hit ${m.hit}, txt ${m.txt})`);
        is(m.low <= m.H, `${tag} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['onset-cat', 'onset-flag', 'sounds-frog', 'onset-maus', 'onset-kukka', 'sounds-kannu'].includes(id)) await o.page.screenshot({ path: path.join(SHOT, `${loc}-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w} ${loc}: no console errors (${o.errs.slice(0, 2).join(' | ')})`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-blend-magnets: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
