#!/usr/bin/env node
/* =====================================================================
   local-test-type-case.js — the interaction gate for ACTIVITY #41, the
   Printer's Type Case (RF.K.1.d). Real pointer. Big and small: the press
   with the slot empty asks; a wrong sort tips over and shows its own other
   form (miss 1) — then sorts may be flipped (a long press); a second wrong
   sort flips the given one (miss 2); a DRAG puts the right sort in; the
   press prints the pair onto the poster. The direction setting. Look-alikes:
   "k more to find" with hollow dots, a wrong mark flips to its back, both
   forms in the case at miss 2, then every copy printed. In words: the
   pictures, no number asks, the wrong count numbers the marks, the right
   count prints. The settings, the keyboard, and the width sweep (no sideways
   scroll, controls ≥ 44 px — word letters ≥ 20 px wide and 44 px tall —
   inside the card, above the fold, pressable), plus the 320 fold in every
   locale. Library pictures served at their EXACT case.
   Usage: node scripts/local-test-type-case.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.letter-case.rf-k-1-d';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'type-case-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, TypeCaseCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'type-case-activity.js'), 'utf8') + '\n;this.__A = TypeCaseActivity;', ctx); return ctx.__A.strings; })();
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
  async function open(loc, w) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/type-case-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TypeCaseActivity && window.TypeCaseActivity.st && document.querySelector('.tc-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.TypeCaseActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.TypeCaseActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, kind: s.r.kind, placed: s.placed, misses: s.misses, help: s.help, show: s.show, done: s.done, flipped: s.flipped, count: s.count, tray: s.tray, stick: s.stick, letters: s.letters })); });
  const note = (page) => page.evaluate(() => document.querySelector('.tc-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(p, page) { if (!p) throw new Error('nothing to tap'); await page.mouse.click(p.x, p.y); await wait(90); }
  const sort = (id) => `.tc-sort[data-id="${id}"]`;
  const press = async (page) => tap(await ctr(page, '.tc-check'), page);
  async function longPress(page, sel) { const p = await ctr(page, sel); await page.mouse.move(p.x, p.y); await page.mouse.down(); await wait(650); await page.mouse.up(); await wait(90); }
  async function drag(page, id) {
    const a = await ctr(page, sort(id));
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    const b = await page.evaluate(() => { const r0 = window.TypeCaseActivity.st.r, e = document.querySelector('.tc-drawer.is-' + (r0.upper ? 'lower' : 'upper') + ' .tc-lit'); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8);
    await page.mouse.up(); await wait(90);
  }
  async function force(page, lv, dr, id) {
    await page.evaluate((lv, dr, id) => { const a = window.TypeCaseActivity; a.api.settings.level = lv; a.api.settings.direction = dr; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, dr, id);
    await wait(250);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);
    is(await page.evaluate(() => document.fonts.check('700 40px Andika')), `${loc}: Andika is loaded`);

    /* 1. Big and small: the first capital-given round */
    const R = C.rounds(loc, 'pairs', 'both'), rc = R.find(r => r.upper);
    await force(page, 'pairs', 'both', rc.id);
    is((await prompt(page)) === T(loc, 'pCap', { given: rc.given }) && (await count(page, '.tc-drawer')) === 2 && (await count(page, '.tc-sort.is-tray')) === 4, `${loc}: "${await prompt(page)}" — two drawers, four sorts`);
    is(await page.evaluate((g) => document.querySelector('.tc-drawer.is-upper .tc-sort.is-given').textContent === g && !!document.querySelector('.tc-drawer.is-lower .tc-lit.is-empty'), rc.given), `${loc}: the capital in the upper drawer, the lower slot empty and glowing`);
    await press(page);
    is((await state(page)).misses === 0 && (await note(page)) === T(loc, 'hintEmpty'), `${loc}: the press with the slot empty asks — not a miss`);
    let s = await state(page);
    const wrong = s.tray.find(x => x.face !== rc.answer), wrong2 = s.tray.filter(x => x.face !== rc.answer)[1], right = s.tray.find(x => x.face === rc.answer);
    await longPress(page, sort(wrong.id));
    is(!(await state(page)).flipped[wrong.id], `${loc}: before any miss a long press does not flip a sort`);
    await tap(await ctr(page, sort(wrong.id)), page);
    s = await state(page);
    is(s.misses === 1 && !s.placed && (await note(page)) === T(loc, 'hintWrong', { letter: wrong.face, target: rc.answer }), `${loc}: a wrong sort — "${await note(page)}"`);
    is(await page.evaluate((b) => { const t = document.querySelector('.tc-sort.is-tipped'); return !!t && t.textContent === b; }, wrong.back), `${loc}: it tips over in the column and shows ${wrong.back}`);
    await longPress(page, sort(wrong2.id));
    is((await state(page)).flipped[wrong2.id] && await page.evaluate((id, b) => document.querySelector('.tc-sort[data-id="' + id + '"]').textContent === b, wrong2.id, wrong2.back), `${loc}: after the miss a long press flips a sort to its back`);
    await longPress(page, sort(wrong2.id));
    await tap(await ctr(page, sort(wrong2.id)), page);
    is((await state(page)).help === 2 && (await note(page)) === T(loc, 'hintBack', { target: rc.answer }) && (await count(page, '.tc-sort.is-given.is-flipped')) === 1, `${loc}: miss 2 — the given sort turns to show ${rc.answer}`);
    await drag(page, right.id);
    is((await state(page)).placed === right.id && (await count(page, '.tc-lit.is-fit')) === 1, `${loc}: a drag puts ${rc.answer} in the slot`);
    await press(page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'okPairs', { Target: rc.given, target: rc.answer })), `${loc}: printed — ${await bubble(page)}`);
    is(await page.evaluate((g) => [...document.querySelectorAll('.tc-cell.is-on')].some(c => c.textContent.startsWith(g)), rc.given), `${loc}: the pair is on the poster`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'pairs-won.png') });

    /* 2. the direction setting */
    for (const [dr, k, drawer] of [['capital', 'pCap', 'upper'], ['small', 'pSmall', 'lower']]) {
      const rr = C.rounds(loc, 'pairs', dr)[0];
      await force(page, 'pairs', dr, rr.id);
      is((await prompt(page)) === T(loc, k, { given: rr.given }) && await page.evaluate((d) => !!document.querySelector('.tc-drawer.is-' + d + ' .tc-sort.is-given'), drawer), `${loc}: ${dr} first — the given letter in the ${drawer} drawer`);
    }

    /* 3. look-alikes */
    const lr = C.rounds(loc, 'look')[1];
    await force(page, 'look', 'both', lr.id);
    is((await prompt(page)) === T(loc, 'pLook', { target: lr.target }) && (await count(page, '.tc-sort.is-stick')) === 8 && (await count(page, '.tc-drawer')) === 1, `${loc}: look-alikes — eight sorts, the target in one drawer`);
    s = await state(page);
    const tg = s.stick.filter(x => x.face === lr.target), nt = s.stick.filter(x => x.face !== lr.target);
    await tap(await ctr(page, sort(tg[0].id)), page); await tap(await ctr(page, sort(tg[1].id)), page);
    is(await page.evaluate((id) => document.querySelector('.tc-sort[data-id="' + id + '"]').getAttribute('aria-pressed') === 'true', tg[0].id), `${loc}: a tap marks a sort`);
    await press(page);
    is((await note(page)) === T(loc, 'hintMore', { k: tg.length - 2 }) && (await count(page, '.tc-hollow')) === tg.length - 2, `${loc}: "${await note(page)}" with ${tg.length - 2} hollow dots`);
    await tap(await ctr(page, sort(nt[0].id)), page);
    await press(page);
    is((await state(page)).help === 2 && (await note(page)) === T(loc, 'hintBoth', { Target: C.isLower(lr.target) ? C.pairOf(lr.target) : lr.target, low: C.isUpper(lr.target) ? C.pairOf(lr.target) : lr.target }) && (await count(page, '.tc-lit.is-both .tc-sort')) === 2, `${loc}: a look-alike marked — both forms in the case (miss 2)`);
    is(await page.evaluate((id) => document.querySelector('.tc-sort[data-id="' + id + '"]').classList.contains('is-flipped'), nt[0].id), `${loc}: the wrong mark shows its back`);
    await tap(await ctr(page, sort(nt[0].id)), page);
    for (const x of tg.slice(2)) await tap(await ctr(page, sort(x.id)), page);
    await press(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'okLook', { target: lr.target, n: lr.answer })), `${loc}: every ${lr.target} found`);

    /* 4. in words */
    const wr = C.rounds(loc, 'words')[1];
    await force(page, 'words', 'both', wr.id);
    is((await prompt(page)) === T(loc, 'pWords', { target: wr.target }) && (await count(page, '.tc-wordrow')) === 3, `${loc}: in words — three words`);
    is(await page.evaluate(() => [...document.querySelectorAll('.tc-pic')].every(i => i.complete && i.naturalWidth > 0)), `${loc}: the three pictures load`);
    s = await state(page);
    const wt = s.letters.filter(x => x.face.toLowerCase() === wr.target.toLowerCase());
    for (const x of wt) await tap(await ctr(page, sort(x.id)), page);
    await press(page);
    is((await note(page)) === T(loc, 'hintCountSet') && (await state(page)).misses === 0, `${loc}: no number — asks`);
    await tap(await ctr(page, `.tc-key[data-n="${wr.answer === 6 ? 5 : wr.answer + 1}"]`), page); await press(page);
    is((await note(page)) === T(loc, 'hintCount') && (await count(page, '.tc-numtag')) === wt.length, `${loc}: the wrong number — the marks count themselves 1…${wt.length}`);
    await tap(await ctr(page, `.tc-key[data-n="${wr.answer}"]`), page); await press(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'okWords', { target: wr.target, n: wr.answer })), `${loc}: ${wr.answer} — printed`);

    /* 5. the settings change the board */
    for (const [lv, sel] of [['look', '.tc-stick'], ['words', '.tc-words'], ['pairs', '.tc-tray']]) { await page.evaluate((lv) => { const a = window.TypeCaseActivity; a.api.settings.level = lv; a.api.settings.direction = 'both'; a.onSettings(); }, lv); await wait(250); is((await count(page, sel)) === 1, `${loc}: "${lv}" — ${sel}`); }

    /* 6. the keyboard */
    if (loc === 'en' || loc === 'fi') {
      await force(page, 'pairs', 'both', rc.id);
      s = await state(page); const kw = s.tray.find(x => x.face !== rc.answer), kr = s.tray.find(x => x.face === rc.answer);
      await page.focus(sort(kw.id)); await page.keyboard.press('Enter'); await wait(60);
      is((await state(page)).misses === 1, `${loc}: keyboard — Enter drops a sort`);
      await page.focus(sort(kw.id)); await page.keyboard.press('f'); await wait(60);
      is((await state(page)).flipped[kw.id], `${loc}: keyboard — F flips it (after the miss)`);
      await page.focus(sort(kr.id)); await page.keyboard.press('Enter'); await wait(60);
      await page.focus(sort(kr.id)); await page.keyboard.press('p'); await wait(60);
      is((await state(page)).done, `${loc}: keyboard — Enter, then P pulls the press`);
    }
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();

    /* 7. the fold at 320, every locale, on the tallest boards */
    const { page: p320, errs: e320 } = await open(loc, 320);
    for (const [lv, id] of [['words', 'W6'], ['words', 'W3'], ['look', 'L1'], ['pairs', 'P1']]) {
      await force(p320, lv, 'both', id);
      await p320.evaluate(() => { const a = window.TypeCaseActivity, C = TypeCaseCore, st = a.st, r = st.r; if (r.kind === 'pairs') { C.drop(st, st.tray.find(s => s.face !== r.answer).id); } else { const T = C.targetsOf(st); C.mark(st, T[0]); C.press(st); } a._paint(); });
      const low = await p320.evaluate(() => { const c = document.querySelector('.tc-check'); return c.getBoundingClientRect().bottom + scrollY; });
      is(low <= 641, `${loc} 320 ${id}: the press above the fold (${Math.round(low)})`);
      const over = await p320.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1 || [...document.querySelectorAll('.tc-sort')].some(e => { const r = e.getBoundingClientRect(), a = document.querySelector('.lcs-app').getBoundingClientRect(); return r.right > a.right + 1 || r.left < a.left - 1; }));
      is(!over, `${loc} 320 ${id}: nothing overflows`);
    }
    is(e320.length === 0, `${loc} 320: no errors (${e320.join(' | ')})`);
    await p320.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    for (const loc of ['fi', 'pt']) {
      const { page, errs } = await open(loc, w);
      for (const [lv, id] of [['pairs', 'P1'], ['pairs', 'P4'], ['look', 'L7'], ['words', 'W6'], ['words', 'W5']]) {
        await force(page, lv, 'both', id);
        const probe = async (phase) => {
          const m = await page.evaluate(() => {
            const app = document.querySelector('.lcs-app').getBoundingClientRect();
            const ctl = [...document.querySelectorAll('.tc-sort.is-tray, .tc-sort.is-stick, .tc-sort.is-letter, .tc-key, .tc-check')].filter(e => !e.hidden && e.offsetParent !== null && !e.classList.contains('is-gone')).map(e => { const r = e.getBoundingClientRect(); return { c: String(e.className).split(' ').slice(0, 2).join('.') + ' ' + (e.getAttribute('data-id') || e.getAttribute('data-n') || ''), letter: e.classList.contains('is-letter'), l: r.left, r: r.right, b: r.bottom + scrollY, w: r.width, h: r.height }; });
            return { docW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight, app: { l: app.left, r: app.right }, ctl };
          });
          is(m.docW <= m.vw + 1, `${w} ${loc} ${id} ${phase}: no sideways scroll`);
          m.ctl.forEach(c => {
            if (c.l < m.app.l - 1 || c.r > m.app.r + 1) is(false, `${w} ${loc} ${id} ${phase}: ${c.c} inside the card`);
            if (c.letter ? (c.w < 20 || c.h < 44) : Math.min(c.w, c.h) < 44) is(false, `${w} ${loc} ${id} ${phase}: ${c.c} is ${Math.round(c.w)}×${Math.round(c.h)}`);
            if (c.b > m.vh + 1) is(false, `${w} ${loc} ${id} ${phase}: ${c.c} below the fold (${Math.round(c.b)} > ${m.vh})`);
          });
          const blocked = await page.evaluate(() => {
            const out = [];
            [...document.querySelectorAll('.tc-sort.is-tray, .tc-sort.is-stick, .tc-sort.is-letter, .tc-key, .tc-check')].filter(e => !e.hidden && !e.disabled && e.offsetParent !== null && !e.classList.contains('is-gone')).forEach(e => { e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(), hh = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); if (!(hh && (hh === e || e.contains(hh)))) out.push(String(e.className).split(' ')[0] + ' ' + (e.getAttribute('data-id') || e.getAttribute('data-n') || '')); });
            window.scrollTo({ top: 0, behavior: 'instant' });
            return out;
          });
          is(blocked.length === 0, `${w} ${loc} ${id} ${phase}: every control can be pressed (${blocked.join(', ')})`);
        };
        await probe('rest');
        await page.evaluate(() => { const a = window.TypeCaseActivity, C = TypeCaseCore, st = a.st, r = st.r; if (r.kind === 'pairs') { const ws = st.tray.filter(s => s.face !== r.answer); C.drop(st, ws[0].id); C.drop(st, ws[1].id); } else { const T = C.targetsOf(st), list = r.kind === 'look' ? st.stick : st.letters; C.mark(st, T[0]); C.mark(st, list.find(s => T.indexOf(s.id) < 0).id); C.press(st); C.press(st); } a._paint(); });
        await wait(60); await probe('miss 2');
        if (SHOT && (w === 360 || w === 704 || w === 1024) && loc === 'pt') await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${loc}-${id}.png`), fullPage: true });
      }
      is(errs.length === 0, `${w} ${loc}: no errors (${errs.join(' | ')})`);
      await page.close();
    }
  }
  await browser.close(); server.close();
  console.log(`local-test-type-case: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
