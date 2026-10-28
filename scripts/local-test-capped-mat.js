#!/usr/bin/env node
/* =====================================================================
   local-test-capped-mat.js — ACTIVITY #149, The Capped Mat ("Hundreds,
   Tens, and Ones", 2.NBT.A.1), in a real browser with real pointer taps
   and a real pointer drag, in all 11 locales.
   Scenarios per locale (at 1024):
     · Build: the task line names the number; Check on an empty mat →
       hintBuildEmpty, no miss; a tenth block in a column is refused
       (nine stay, hintTenth<place>); a wrong build → the caps drop and
       read the BUILD, its column glows, hintBuildLook; a second miss →
       help: dashed outlines (too few) or crosses (too many); the right
       build → done, the lid, the ok line in the celebration, Next 0.5 s later.
     · Read (307, tidy): Check with no caps → hintCapAll; caps 3 and 7
       with the tens bare → the fold, the hint quotes "37"; a second fold
       → the 0 ghost cap; the 0 cap by a real tap → done.
     · Read (jumbled): Check with blocks still in the delivery →
       hintDelivery; every pile tapped into its column; a cap dragged onto
       a seat with the pointer; the digits typed on the keyboard → done.
     · Match: no tray → hintPickTray; the ticket dragged onto a wrong tray
       → its caps, the differing groups glow, the hint names its number;
       the right tray tapped → done.
   Then each state — Build at rest, Build at help, Read folded, Match
   wrong, solved — reached ONCE per locale, then resized through
   320…1366: no sideways scroll, nothing outside the card, controls ≥ 44
   px, Check above the fold at rest, the hint in view at a miss, no
   console errors.
   Usage: node scripts/local-test-capped-mat.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'capped-mat-core.js'));
const ACT = (() => { const ctx = { window: {}, CappedMatCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'capped-mat-activity.js'), 'utf8') + '\n;this.__A = CappedMatActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 150) console.error('   FAIL: ' + m); } };
/* the oracle comes from the round's own number, never from the tool */
const dig = (n) => ({ h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 });
const READ_K = C.rounds('read').findIndex(r => r.n === 307);
const MATCH = C.rounds('match');
if (READ_K < 0) throw new Error('the read pool has no 307');
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/capped-mat-activity.html?activity=place-value.hundreds-tens-and-ones.2-nbt-a-1&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.CappedMatActivity && window.CappedMatActivity.st && document.querySelector('.cm-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.CappedMatActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, job, blocks, k) {
    const ok = await page.evaluate((job, blocks, k) => {
      const a = window.CappedMatActivity; a.api.settings.job = job; a.api.settings.blocks = blocks; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.k === k && a.st.job === job && a.st.jumbled === (blocks === 'jumbled');
    }, job, blocks, k);
    if (!ok) throw new Error('force failed ' + job + '/' + blocks + '/' + k);
  }
  /* a real pointer tap on the control's centre; it must be enabled and on top */
  async function click(page, k, what) {
    const sel = '[data-k="' + k + '"]';
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(10); return true;
  }
  async function drag(page, fromSel, toSel, what) {
    const a = await page.$(fromSel), b = await page.$(toSel);
    if (!a || !b) { is(false, what + ': drag ends missing'); return false; }
    await page.evaluate(e => e.scrollIntoView({ block: 'center' }), b);
    const A = await a.boundingBox(), B = await b.boundingBox();
    await page.mouse.move(A.x + A.width / 2, A.y + A.height / 2); await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(A.x + A.width / 2 + (B.x + B.width / 2 - A.x - A.width / 2) * i / 8, A.y + A.height / 2 + (B.y + B.height / 2 - A.y - A.height / 2) * i / 8);
    await page.mouse.up(); await wait(30); return true;
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.CappedMatActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.cm-note'); return { text: n.textContent, hint: n.classList.contains('is-hint'), ok: n.classList.contains('is-ok') }; });
  const prompt = (page) => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt-text'); return p ? p.textContent : ''; });
  const capsShown = (page) => page.evaluate(() => { const o = {}; ['h', 't', 'o'].forEach(p => { const c = document.querySelector('.cm-col-' + p + ' .cm-seat .cm-capd'); o[p] = c ? +c.textContent : null; }); return o; });
  async function build(page, d, what) { for (const p of ['h', 't', 'o']) for (let i = 0; i < d[p]; i++) if (!(await click(page, 'add-' + p, what))) return false; return true; }

  async function scenarios(loc) {
    const { page, errs } = await open(1024, loc);
    /* ---- Build ---- */
    const bk = 1; await force(page, 'build', 'tidy', bk);
    let s = await st(page); const n = s.round.n, want = dig(n);
    is(sp(await prompt(page)) === sp(T(loc, 'taskBuild', { n })), loc + ' build: the task line names ' + n);
    await click(page, 'check', loc + ' empty check');
    s = await st(page); let nt = await note(page);
    is(s.misses === 0 && sp(nt.text) === sp(T(loc, 'hintBuildEmpty')) && !nt.hint, loc + ' build: an empty mat is a note, not a miss');
    /* the tenth block is refused */
    for (let i = 0; i < 10; i++) await click(page, 'add-o', loc + ' ones');
    s = await st(page); nt = await note(page);
    is(s.mat.o === 9 && sp(nt.text) === sp(T(loc, 'hintTenthO')), loc + ' build: the tenth cube is refused, nine stay (' + s.mat.o + ')');
    is(!!(await page.$('.cm-col-t .cm-tenghost')), loc + ' build: the refused tenth shows a rod outline over the tens');
    for (let i = 0; i < 9; i++) await click(page, 'rem-o', loc + ' remove');
    s = await st(page); is(s.mat.o === 0, loc + ' build: − takes the cubes away');
    /* a wrong build: one ten too many */
    const wrong = Object.assign({}, want, { t: want.t === 9 ? 8 : want.t + 1 });
    await build(page, wrong, loc + ' wrong build');
    await click(page, 'check', loc + ' check 1');
    s = await st(page); nt = await note(page);
    is(s.verdict && s.verdict.kind === 'wrongBuild' && s.misses === 1 && !s.help, loc + ' build: a wrong build is miss 1');
    const caps = await capsShown(page);
    is(caps.h === wrong.h && caps.t === wrong.t && caps.o === wrong.o, loc + ' build: the caps read the BUILD ' + JSON.stringify(caps));
    is(nt.hint && sp(nt.text) === sp(T(loc, 'hintBuildLook', { n, built: String(wrong.h) + wrong.t + wrong.o })), loc + ' build: hintBuildLook quotes ' + n);
    is((await page.$$('.cm-col.is-glow')).length === 1 && !!(await page.$('.cm-col-t.is-glow')), loc + ' build: only the tens column glows');
    /* a move clears the caps, then miss 2 → help */
    await click(page, 'add-o', loc + ' move'); s = await st(page);
    is(s.caps.h == null && s.caps.t == null && s.caps.o == null, loc + ' build: a move lifts the caps again');
    await click(page, 'rem-o', loc + ' move back');
    await click(page, 'check', loc + ' check 2');
    s = await st(page); nt = await note(page);
    const over = wrong.t > want.t;
    is(s.help && sp(nt.text) === sp(T(loc, over ? 'hintBuildTake' : 'hintBuildFill', { n })), loc + ' build: miss 2 → help (' + (over ? 'take' : 'fill') + ')');
    is(over ? (await page.$$('.cm-col-t .is-extra')).length === 1 : (await page.$$('.cm-col-t .is-ghost')).length >= 1, loc + ' build: help marks exactly the extra rod (or the missing ones)');
    /* the right build */
    if (over) await click(page, 'rem-t', loc + ' fix'); else await click(page, 'add-t', loc + ' fix');
    await page.evaluate(() => { window.CappedMatActivity.OK_MS = 500; });
    await click(page, 'check', loc + ' check right');
    s = await st(page);
    is(s.done && !!(await page.$('.cm-lid')), loc + ' build: the right build closes the lid');
    const c = { h: want.h, t: want.t, o: want.o };
    const word = (pl, k) => k + ' ' + T(loc, (pl === 'h' ? 'wH' : pl === 't' ? 'wT' : 'wO') + (k === 0 ? '0' : k === 1 ? '1' : 'n'));
        is(!(await page.$('[data-k="check"]')), loc + ' build: no Check after the win');
    const nextBefore = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-next'); return !!b && getComputedStyle(b).display !== 'none' && b.offsetParent !== null; });
    await wait(900);
    const nextAfter = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-next'); return !!b && getComputedStyle(b).display !== 'none' && b.offsetParent !== null; });
    is(!nextBefore && nextAfter, loc + ' build: Next appears 0.5 s after the result');
    { const got = sp(await page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble.show'); return b ? b.textContent : ''; })), exp = sp(T(loc, 'okLine', { h: word('h', c.h), t: word('t', c.t), o: word('o', c.o), n })); is(got === exp, loc + ' build: the ok line in the celebration [' + got + '] vs [' + exp + ']'); }
    await page.evaluate(() => { window.CappedMatActivity.OK_MS = 600000; });

    /* ---- Read, tidy: 307 ---- */
    await force(page, 'read', 'tidy', READ_K);
    is(sp(await prompt(page)) === sp(T(loc, 'qRead')), loc + ' read: the question');
    await click(page, 'check', loc + ' read empty');
    nt = await note(page); s = await st(page);
    is(s.misses === 0 && sp(nt.text) === sp(T(loc, 'hintCapAll')), loc + ' read: no caps is a note');
    await click(page, 'seat-h', loc + ' seat h'); await click(page, 'cap-3', loc + ' cap 3');
    await click(page, 'seat-o', loc + ' seat o'); await click(page, 'cap-7', loc + ' cap 7');
    s = await st(page); is(s.caps.h === 3 && s.caps.o === 7 && s.caps.t == null, loc + ' read: caps 3 and 7, the tens bare');
    await click(page, 'check', loc + ' fold');
    s = await st(page); nt = await note(page);
    is(s.verdict && s.verdict.kind === 'zeroFold' && s.verdict.fold === '37', loc + ' read: the bare tens folds 307 into 37');
    is(nt.hint && sp(nt.text) === sp(T(loc, 'hintZeroFold', { n: 307, fold: '37' })), loc + ' read: the hint quotes the fold 37, never the 307 to be read');
    is(!!(await page.$('.cm-col-t.is-bare')), loc + ' read: the tens column is marked bare');
    await click(page, 'check', loc + ' fold 2');
    s = await st(page); nt = await note(page);
    is(s.help && sp(nt.text) === sp(T(loc, 'hintZeroCap')) && !!(await page.$('.cm-col-t .cm-ghostcap')), loc + ' read: a second fold shows the 0 ghost cap');
    await click(page, 'seat-t', loc + ' seat t'); await click(page, 'cap-0', loc + ' cap 0');
    await click(page, 'check', loc + ' read right');
    s = await st(page); is(s.done, loc + ' read: the 0 cap closes 307');

    /* ---- Read, jumbled ---- */
    await force(page, 'read', 'jumbled', 0);
    s = await st(page); const jn = s.round.n, jd = dig(jn);
    await click(page, 'check', loc + ' jumbled early');
    nt = await note(page); is(sp(nt.text) === sp(T(loc, 'hintDelivery')), loc + ' jumbled: blocks still in the delivery is a note');
    for (let g = 0; g < 40; g++) { const p = await page.$('[data-k^="pile-"]'); if (!p) break; const k = await page.evaluate(e => e.getAttribute('data-k'), p); await click(page, k, loc + ' pile'); }
    s = await st(page);
    is(s.delivery.length === 0 && s.mat.h === jd.h && s.mat.t === jd.t && s.mat.o === jd.o, loc + ' jumbled: every block landed in its own column');
    /* a cap dragged with the pointer onto the hundreds seat */
    await drag(page, '[data-k="cap-' + jd.h + '"]', '.cm-col-h .cm-seat', loc + ' cap drag');
    s = await st(page); is(s.caps.h === jd.h, loc + ' jumbled: a dragged cap lands on its seat');
    /* the keyboard types the rest */
    await page.focus('.cm-wrap');
    for (const p of ['t', 'o']) { await page.keyboard.press(String(jd[p])); await wait(10); }
    s = await st(page); is(s.caps.t === jd.t && s.caps.o === jd.o, loc + ' jumbled: digits typed on the keyboard cap the next seats');
    await click(page, 'check', loc + ' jumbled right');
    s = await st(page); is(s.done, loc + ' jumbled: solved');

    /* ---- Match ---- */
    const mk = 0, mr = MATCH[mk], wrongI = mr.trays.findIndex(x => x !== mr.n);
    await force(page, 'match', 'tidy', mk);
    is(sp(await prompt(page)) === sp(T(loc, 'qMatch', { n: mr.n })), loc + ' match: the question names ' + mr.n);
    await click(page, 'check', loc + ' match empty');
    nt = await note(page); is(sp(nt.text) === sp(T(loc, 'hintPickTray')), loc + ' match: no tray is a note');
    await drag(page, '[data-k="ticket"]', '[data-k="tray-' + wrongI + '"]', loc + ' ticket drag');
    s = await st(page); is(s.tray === wrongI, loc + ' match: the dragged ticket lands on tray ' + (wrongI + 1));
    await click(page, 'check', loc + ' match wrong');
    s = await st(page); nt = await note(page);
    is(s.verdict && s.verdict.kind === 'wrongTray' && s.verdict.shown === mr.trays[wrongI], loc + ' match: the wrong tray is named by ITS number');
    is(nt.hint && sp(nt.text).includes(String(mr.trays[wrongI])), loc + ' match: the hint quotes ' + mr.trays[wrongI]);
    is(!!(await page.$('.cm-tray.is-wrong .cm-traycaps')) && (await page.$$('.cm-tray.is-wrong .cm-group.is-glow')).length >= 1, loc + ' match: the wrong tray shows its caps and lights its differing groups');
    await click(page, 'tray-' + mr.right, loc + ' right tray');
    await click(page, 'check', loc + ' match right');
    s = await st(page); is(s.done && !!(await page.$('.cm-tray.is-right')), loc + ' match: the right tray goes green');
    is(errs.length === 0, loc + ' scenarios: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }

  /* each state reached ONCE per locale by real taps, then resized through the widths */
  const STATES = [
    ['build-rest', async (page) => { await force(page, 'build', 'tidy', 4); }, { rest: true }],
    ['build-help', async (page) => { await force(page, 'build', 'tidy', 4); const d = dig((await st(page)).round.n); await build(page, Object.assign({}, d, { o: d.o ? d.o - 1 : 1 }), 'help'); await click(page, 'check', 'h1'); await click(page, 'check', 'h2'); }, { miss: true }],
    ['read-fold', async (page) => { await force(page, 'read', 'tidy', READ_K); await click(page, 'seat-h', 'sh'); await click(page, 'cap-3', 'c3'); await click(page, 'seat-o', 'so'); await click(page, 'cap-7', 'c7'); await click(page, 'check', 'fold'); }, { miss: true }],
    ['read-jumbled', async (page) => { await force(page, 'read', 'jumbled', 8); }, { rest: true }],
    ['match-wrong', async (page) => { await force(page, 'match', 'tidy', 3); const r = MATCH[3]; await click(page, 'tray-' + r.trays.findIndex(x => x !== r.n), 'wt'); await click(page, 'check', 'mw'); }, { miss: true }],
    ['solved', async (page) => { await force(page, 'build', 'tidy', 8); await build(page, dig((await st(page)).round.n), 'solve'); await click(page, 'check', 'win'); }, {}]
  ];
  async function measure(page, w, tag, opt) {
    const m = await page.evaluate(() => {
      const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
      const out = []; document.querySelectorAll('.cm-wrap *').forEach(e => { if (e.closest('.cm-ghost') || e.closest('.cm-note.is-ok') || e.closest('.cm-sr')) return; const r = e.getBoundingClientRect(); if (!r.width || !r.height) return; if (r.left < cr.left - 1 || r.right > cr.right + 1) out.push(e.className && e.className.baseVal != null ? e.className.baseVal : e.className); });
      const small = []; document.querySelectorAll('.cm-wrap button').forEach(b => { const r = b.getBoundingClientRect(); if (r.width && (r.width < 44 || r.height < 44)) small.push(b.getAttribute('data-k') + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
      const chk = document.querySelector('[data-k="check"]'), n = document.querySelector('.cm-note');
      const scrollY = window.scrollY, chkB = chk ? chk.getBoundingClientRect().bottom + scrollY : null, noteR = n && n.textContent ? n.getBoundingClientRect() : null;
      return { sideways: document.documentElement.scrollWidth > window.innerWidth + 1, out: out.slice(0, 3), small: small.slice(0, 4), chkB, vh: window.innerHeight, noteBottom: noteR ? noteR.bottom + scrollY : null };
    });
    is(!m.sideways, tag + ' @' + w + ': no sideways scroll');
    is(m.out.length === 0, tag + ' @' + w + ': nothing outside the card ' + m.out.join(','));
    is(m.small.length === 0, tag + ' @' + w + ': controls ≥ 44 px ' + m.small.join(','));
    if (opt.rest) is(m.chkB != null && m.chkB <= m.vh, tag + ' @' + w + ': Check above the fold (' + Math.round(m.chkB) + ' / ' + m.vh + ')');
    if (opt.miss) is(m.noteBottom != null && m.noteBottom <= m.vh + 300, tag + ' @' + w + ': the hint is near the work (' + Math.round(m.noteBottom) + ')');
  }
  for (const loc of LOCS) {
    const f0 = FAIL;
    await scenarios(loc);
    for (const [name, reach, opt] of STATES) {
      const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
      await reach(page); await wait(60);
      for (const w of WIDTHS) { await page.setViewport({ width: w, height: VH(w) }); await wait(120); await page.evaluate(() => window.scrollTo(0, 0)); await measure(page, w, loc + ' ' + name, opt); }
      is(errs.length === 0, loc + ' ' + name + ': no console errors ' + errs.slice(0, 3).join(' | '));
      await page.close();
    }
    console.log(loc + ': ' + (FAIL === f0 ? 'ok' : (FAIL - f0) + ' fail'));
  }
  await browser.close(); server.close();
  console.log(`local-test-capped-mat: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
