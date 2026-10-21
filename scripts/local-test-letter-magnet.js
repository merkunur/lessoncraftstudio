#!/usr/bin/env node
/* =====================================================================
   local-test-letter-magnet.js — the interaction gate for ACTIVITY #59, The
   Letter Magnet (RF.K.3.a, 11 locales). Real pointer at 704, every level,
   EVERY round:
     the switch with nothing under a magnet asks (no miss); one right
     picture DRAGGED under its magnet and one wrong one put there by tap
     (a tap on a card, then on the zone, when there are several magnets) →
     the right one hangs on a hook, the wrong one shivers back to the table,
     miss 1 and the level's own hint; the rest put under their magnets →
     right: the name strips unroll, the shell celebrates.
   Once per level: miss 2 shows the letter tabs; a picture tapped in a zone
   goes back to the table; the number keys 1–3 put a focused card under a
   magnet. The shell's Check is hidden. The Magnets / Letters options per
   locale. The width sweep (all locales at 320 / 704 / 1366, en at
   320–1366), every level at rest, zones full, after miss 2 and won: no
   sideways scroll, controls ≥ 44 px inside the card, table pictures ≥ 96 /
   64, text ≥ 14 px, the switch above the fold, magnet labels inside their
   columns.
   Usage: node scripts/local-test-letter-magnet.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'choice-board.beginning-sound.rf-k-3-a';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '059-letter-magnet', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'letter-magnet-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, LetterMagnetCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'letter-magnet-activity.js'), 'utf8') + '\n;this.__A = LetterMagnetActivity;', ctx); return ctx.__A; })();
const STR = ACT.strings;
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
/* the magnet's label as the gate expects it (Letters: capital and small) */
const LABEL = (mg) => mg.kind === 'word' ? mg.label : mg.label.length > 1 ? mg.label.charAt(0).toLocaleUpperCase() + mg.label.slice(1) + ' ' + mg.label : mg.label.toLocaleUpperCase() + mg.label;
const Q = (loc, s) => { const q = ACT.QUOTES[loc]; return q[0] + s + q[1]; };
const emptyKey = (r) => r.read ? 'hintEmptyRead' : (r.level === 'team' || r.level === 'gap') ? 'hintEmptyTeam' : r.magnets.length > 1 ? 'hintEmptyTwo' : 'hintEmpty';
const stayedKey = (r) => r.read ? 'hintStayedRead' : (r.level === 'team' || r.level === 'gap') ? 'hintStayedTeam' : 'hintStayed';
const helpKey = (r) => r.read ? 'hintHelpRead' : (r.level === 'team' || r.level === 'gap') ? 'hintHelpTeam' : 'hintHelp';
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/letter-magnet-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LetterMagnetActivity && window.LetterMagnetActivity.st && document.querySelector('.lmg-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.LetterMagnetActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.LetterMagnetActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, zone: s.zone, hung: s.hung, table: s.table, order: s.order, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.lmg-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 12; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 12, a.y + (b.y - a.y) * k / 12);
    await page.mouse.up(); await wait(50);
  }
  async function force(page, lv, id) {
    await page.evaluate((lv, id) => { const a = window.LetterMagnetActivity; a.FAST = true; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id);
    await wait(70);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  /* put card ci under magnet m: a drag, or a tap (+ a tap on the zone when there are several magnets) */
  async function put(page, r, ci, m, how) {
    if (how === 'drag') return drag(page, `[data-k="card${ci}"]`, `.lmg-col[data-magnet="${m}"] .lmg-zone`);
    await tap(page, `[data-k="card${ci}"]`);
    if (r.magnets.length > 1) await tap(page, `[data-zone="${m}"]`);
  }
  async function flip(page) { await tap(page, '.lmg-check'); await page.waitForFunction(() => !window.LetterMagnetActivity._busy, { timeout: 15000 }); await wait(30); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const okRun = (page) => page.evaluate(() => { window.LetterMagnetActivity.OK_MS = 0; });

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.LetterMagnetActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'level:' + C.levels(loc).join(',') + ' | letters:both,upper,lower', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden (the switch is the check)`);
    for (const lv of C.levels(loc)) {
      C.rounds(loc, lv).forEach(() => {});
      const R = C.rounds(loc, lv);
      for (let k = 0; k < R.length; k++) {
        const r = R[k], id = `${loc} ${lv} ${r.id}`;
        await page.evaluate(() => { window.LetterMagnetActivity.OK_MS = 60000; });
        await force(page, lv, r.id);
        const u = Q(loc, LABEL(r.magnets[0]));
        let s = await state(page);
        is((await page.evaluate(() => document.querySelectorAll('.lmg-card').length)) === r.cards.length && (await page.evaluate(() => document.querySelectorAll('.lmg-col').length)) === r.magnets.length, `${id}: ${r.cards.length} pictures on the table, ${r.magnets.length} magnet(s)`);
        is(await page.evaluate((labs) => [...document.querySelectorAll('.lmg-disc')].map(e => e.textContent).sort().join('|') === labs, r.magnets.map(LABEL).sort().join('|')), `${id}: the magnets read ${r.magnets.map(LABEL).join(' / ')}`);
        await flip(page); s = await state(page);
        is(s.misses === 0 && (await note(page)) === T(loc, emptyKey(r), { u }), `${id}: the switch with nothing under a magnet asks, no miss («${await note(page)}»)`);
        /* one right picture dragged, one wrong one tapped */
        const rightCi = r.cards.findIndex(c => c.belongs >= 0), rm = r.cards[rightCi].belongs;
        let wrongCi = r.cards.findIndex(c => c.belongs < 0), wm = 0;
        if (wrongCi < 0) { wrongCi = r.cards.findIndex(c => c.belongs >= 0 && c.belongs !== rm); wm = rm; }
        const many = r.cards.filter(c => c.belongs >= 0).length >= 2;   /* one hook: the right picture would end the round, so the miss is the wrong one alone */
        if (many) { await put(page, r, rightCi, rm, 'drag'); s = await state(page); is(s.zone[rm].includes(rightCi), `${id}: the dragged picture sits under its magnet`); }
        await put(page, r, wrongCi, wm, 'tap');
        s = await state(page); is(s.zone[wm].includes(wrongCi), `${id}: the tapped picture sits under magnet ${wm}`);
        await flip(page); s = await state(page);
        is(s.misses === 1 && s.last && s.last.result === 'stayed' && (await note(page)) === T(loc, stayedKey(r), { u }), `${id}: a wrong picture stays down → miss 1, the level's hint («${await note(page)}»)`);
        if (many) is(s.hung[rm].includes(rightCi) && await page.evaluate(() => document.querySelectorAll('.lmg-hook.is-full').length) === 1, `${id}: the right picture hangs on a hook`);
        is(await page.evaluate((ci) => !!document.querySelector(`.lmg-card[data-card="${ci}"]`), wrongCi), `${id}: the wrong picture is back on the table`);
        /* the rest */
        let how = 'tap';
        for (let ci = 0; ci < r.cards.length; ci++) { const c = r.cards[ci]; if (c.belongs < 0 || (many && ci === rightCi)) continue; await put(page, r, ci, c.belongs, how); how = how === 'tap' ? 'drag' : 'tap'; }
        await okRun(page); await flip(page); s = await state(page);
        const n = r.cards.filter(c => c.belongs >= 0).length;
        is(s.done && await celebrated(page), `${id}: every picture under its magnet → right, celebrates`);
        const bubble = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; });
        const firstHung = r.read ? '' : r.cards.find(c => c.belongs >= 0).word;   /* read rounds celebrate without names (okRead) */
        is(bubble && !/\{\w+\}/.test(bubble) && bubble.includes(firstHung), `${id}: the shell's success text is filled${firstHung ? ' and names «' + firstHung + '»' : ''} («${bubble}»)`);
        is(await page.evaluate(() => document.querySelectorAll('.lmg-name').length) === n, `${id}: ${n} name strips unrolled`);
        if (k === 0) {
          /* miss 2 tabs; a zone card back; the number keys */
          await page.evaluate(() => { window.LetterMagnetActivity.OK_MS = 60000; });
          await force(page, lv, r.id);
          for (let t = 0; t < 2; t++) { await put(page, r, wrongCi, wm, 'tap'); await flip(page); }
          s = await state(page);
          is(s.misses === 2 && (await note(page)) === T(loc, helpKey(r), { u }) && await page.evaluate((n) => document.querySelectorAll('.lmg-tab').length === n, r.cards.length), `${id}: miss 2 → the help hint and a tab on every picture`);
          await put(page, r, wrongCi, wm, 'tap');
          is(await page.evaluate(() => document.querySelectorAll('.lmg-tab').length) === 0, `${id}: a move takes the tabs away`);
          await tap(page, `[data-k="zc${wrongCi}"]`); s = await state(page);
          is(s.zone.every(z => !z.includes(wrongCi)), `${id}: a picture tapped in a zone goes back to the table`);
          const key = r.magnets.length > 1 ? 2 : 1, target = s.order[key - 1];
          await page.focus(`[data-k="card${wrongCi}"]`); await page.keyboard.press(String(key)); await wait(40); s = await state(page);
          is(s.zone[target].includes(wrongCi), `${id}: key ${key} puts the focused picture under magnet ${key}`);
        }
      }
    }
    /* Letters */
    await force(page, 'one', C.rounds(loc, 'one')[0].id);
    for (const [mode, f] of [['upper', (l) => l.toLocaleUpperCase()], ['lower', (l) => l]]) {
      await page.evaluate((m) => { const a = window.LetterMagnetActivity; a.api.settings.letters = m; a.onSettings(); }, mode);
      await wait(40);
      const t = await page.evaluate(() => document.querySelector('.lmg-disc').textContent);
      is(t === f(C.rounds(loc, 'one')[0].magnets[0].label), `${loc}: Letters ${mode} → «${t}»`);
    }
    await page.evaluate(() => { const a = window.LetterMagnetActivity; a.api.settings.letters = 'both'; a.onSettings(); });
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    await page.evaluate(() => { window.LetterMagnetActivity.OK_MS = 60000; });
    for (const lv of C.levels(loc)) {
      const R = C.rounds(loc, lv);
      /* the heaviest round: most pictures, most magnets, longest magnet labels */
      const pick = [R.slice().sort((a, b) => (b.cards.length * 10 + b.magnets.length * 3 + Math.max(...b.magnets.map(m => m.label.length))) - (a.cards.length * 10 + a.magnets.length * 3 + Math.max(...a.magnets.map(m => m.label.length))))[0]];
      const rd = R.find(r => r.read); if (rd && rd !== pick[0]) pick.push(rd);
      for (const r of pick) {
        await force(page, lv, r.id);
        for (const phase of ['rest', 'zones', 'miss', 'won']) {
          await page.evaluate((phase) => {
            const A = window.LetterMagnetActivity, K = window.LetterMagnetCore, st = A.st, r = st.r;
            const all = () => r.cards.forEach((c, i) => K.toZone(st, i, c.belongs >= 0 ? c.belongs : 0));
            if (phase === 'zones') all();
            if (phase === 'miss') { const w = r.cards.findIndex(c => c.belongs < 0); const i = w >= 0 ? w : r.cards.findIndex(c => c.belongs === 0); const m = w >= 0 ? 0 : 1; K.toZone(st, i, m); K.flip(st); K.toZone(st, i, m); K.flip(st); }
            if (phase === 'won') { r.cards.forEach((c, i) => { if (c.belongs >= 0) K.toZone(st, i, c.belongs); }); K.flip(st); A._view = { won: true }; }
            else A._view = {};
            A._busy = false; A._sel = -1; A._paint();
          }, phase);
          await wait(60);
          const tag = `@${w} ${loc} ${r.id} ${phase}`;
          const m = await page.evaluate(() => {
            const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
            const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
            const ctl = [...document.querySelectorAll('.lmg-card,.lmg-zone,.lmg-zcard,.lmg-say,.lmg-check:not([hidden])')].filter(vis);
            const txt = [...document.querySelectorAll('.lmg-disc,.lmg-note,.lmg-strip,.lmg-name,.lmg-tab,.lmg-checkword')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
            const pics = [...document.querySelectorAll('.lmg-card img')].filter(vis).map(e => e.getBoundingClientRect().width);
            const chk = document.querySelector('.lmg-check:not([hidden])');
            const cols = [...document.querySelectorAll('.lmg-col')].map(c => { const cr = c.getBoundingClientRect(), d = c.querySelector('.lmg-disc').getBoundingClientRect(); return d.left >= cr.left - 1 && d.right <= cr.right + 1 && c.querySelector('.lmg-disc').scrollWidth <= c.querySelector('.lmg-disc').clientWidth + 1; });
            const strips = [...document.querySelectorAll('.lmg-strip,.lmg-name')].filter(e => { const b = e.getBoundingClientRect(), p = e.closest('.lmg-card,.lmg-col').getBoundingClientRect(); return b.left < p.left - 12 || b.right > p.right + 12; }).length;
            return {
              side: de.scrollWidth - de.clientWidth,
              small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
              out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
              txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
              fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight, cols: cols.every(Boolean), strips
            };
          });
          const minPic = w >= 704 ? 96 : 64;
          is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
          is(m.pic >= minPic - 0.5 && m.txt >= 14, `${tag}: table pictures ≥ ${minPic} (${Math.round(m.pic)}), text ≥ 14 (${m.txt})`);
          if (phase !== 'won') is(m.fold <= m.H + 1, `${tag}: the switch above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
          is(m.cols && !m.strips, `${tag}: magnet labels and word strips inside their columns / cards`);
          if (SHOTS && [360, 704, 1024].includes(w) && (phase === 'miss' || phase === 'won')) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${r.id}-${phase}.png`), fullPage: true });
        }
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-letter-magnet: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
