#!/usr/bin/env node
/* =====================================================================
   local-test-question-lamp.js — the interaction gate for ACTIVITY #76, The
   Question Lamp (Wren's Question Window, L.K.1.d, 11 locales). Real pointer
   at 704: every round of every level in every locale is answered by clicks
   only — the key for the gold part (l1–l3), the right card into the reply
   slot (l4), every card into its lamp's tray (l5) — and Check: the gold
   card lights, the success line names the question and its answer.
   Once per locale: an empty Check is no miss; a wrong key → the lamp
   lights the card that word asks about, with its hint; a word whose kind
   the answer lacks → the lamp finds nothing; the second miss shows the
   kind marks; Write it → the question word typed; a wrong match card is a
   miss; a wrong tray leaves its card dark. Settings: Question words → 3 /
   4 / 6 keys, Answer → the letter keys.
   The width sweep (all locales at 320 / 704 / 1366, en at every width):
   no sideways scroll, controls ≥ 44 inside the card, text ≥ 14, pictures ≥
   96 (64 on a phone), Check above the fold.
   Usage: node scripts/local-test-question-lamp.js [--widths=…] [--locales=…] [--sweep-only] [--quick] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots'), QUICK = process.argv.includes('--quick');
const ID = 'wren-question-window.question-words.l-k-1-d';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '076-question-lamp', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'question-lamp-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, QuestionLampCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'question-lamp-activity.js'), 'utf8') + '\n;this.__A = QuestionLampActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const KM = { who: 'kWho', what: 'kWhat', where: 'kWhere', when: 'kWhen', why: 'kWhy', how: 'kHow' };
const sp = (s) => String(s).replace(/[  ]/g, ' ');
const fill = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, x) => x in a ? a[x] : m);
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
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/question-lamp-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.QuestionLampActivity && window.QuestionLampActivity.st && document.querySelector('.ql-board'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.QuestionLampActivity; a.FAST = true; a.OK_MS = 60000; });
    return { page, errs };
  }
  async function force(page, level, idx, answer) {
    await page.evaluate((level, idx, answer) => { const a = window.QuestionLampActivity; a.api.settings.level = level; a.api.settings.answer = answer || 'keys'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); }, level, idx, answer);
    await page.waitForFunction(() => [...document.querySelectorAll('.ql-wrap img')].every(i => i.complete), { timeout: 6000 }).catch(() => {});
  }
  const st = (page) => page.evaluate(() => { const s = window.QuestionLampActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, lamp: s.lamp, help: s.help }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ql-note').textContent);
  async function click(page, sel) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    if (!b) throw new Error('no ' + sel);
    await wait(10); await page.mouse.click(b.x, b.y); await wait(15);
  }
  async function answer(page, r, write) {
    if (r.type === 'ask') {
      if (write) { const form = C.norm(r.keys.find(k => k.kind === r.ask).form); for (const ch of form) await click(page, `.ql-letter[data-k="key-${ch === ' ' ? 'space' : ch}"]`); }
      else await click(page, `.ql-key[data-kind="${r.ask}"]`);
    } else if (r.type === 'match') await click(page, `.ql-card[data-card="${r.right}"]`);
    else for (let i = 0; i < r.cards.length; i++) { await click(page, `.ql-cards.is-pool .ql-card[data-card="${i}"]`); await click(page, `.ql-tray[data-tray="${r.cards[i].k}"]`); }
    await click(page, '.ql-check');
  }
  const okText = (loc, r) => {
    if (r.type === 'ask') { const key = r.keys.find(k => k.kind === r.ask); return fill(T(loc, 'okAsk'), { q: C.filled(r, key.form), c: r.chunks[r.framed].t.replace(/,$/, ''), w: key.form, k: T(loc, KM[r.ask]) }); }
    if (r.type === 'match') return fill(T(loc, 'okMatch'), { q: r.q, c: r.cards[r.right].t });
    return T(loc, 'okSort');
  };

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    const { page, errs } = await open(704, loc);
    for (const lv of C.LEVELS) {
      const list = QUICK ? C.ids(loc, lv).slice(-2) : C.ids(loc, lv);
      for (const i of list) {
        const r = C.round(loc, lv, i);
        await force(page, lv, i);
        await answer(page, r, false);
        const s = await st(page);
        is(s.done && s.misses === 0, `${loc} ${lv} ${i}: answered by clicks`);
        is(sp(await note(page)) === sp(okText(loc, r)), `${loc} ${lv} ${i}: «${await note(page)}»`);
        if (r.type === 'ask') is(await page.evaluate((f) => document.querySelector('.ql-chunk[data-c="' + f + '"]').classList.contains('is-won'), r.framed), `${loc} ${lv} ${i}: the gold card glows`);
      }
    }
    /* the misses */
    const r1 = C.round(loc, 'l1', 0); await force(page, 'l1', 0);
    await click(page, '.ql-check'); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hEmpty')), `${loc}: an empty Check is no miss`);
    const wrong = r1.keys.find(k => k.kind !== r1.ask);
    await click(page, `.ql-key[data-kind="${wrong.kind}"]`);
    is((await st(page)).lamp === null, `${loc}: the lamp does not move before Check`);
    await click(page, '.ql-check'); s = await st(page);
    const lit = C.lampTarget(r1, wrong.kind);
    is(s.misses === 1 && s.lamp === lit && await page.evaluate((c) => document.querySelector('.ql-chunk[data-c="' + c + '"]').classList.contains('is-lit'), lit) && sp(await note(page)) === sp(fill(T(loc, 'hWrong'), { w: wrong.form, k: T(loc, KM[wrong.kind]), c: r1.chunks[lit].t.replace(/,$/, '') })), `${loc}: “${wrong.form}” lights “${r1.chunks[lit].t}” — «${await note(page)}»`);
    await click(page, `.ql-key[data-kind="${wrong.kind}"]`); await click(page, '.ql-check'); s = await st(page);
    is(s.help === 2 && await page.evaluate(() => document.querySelector('.ql-wrap').classList.contains('is-marks') && getComputedStyle(document.querySelector('.ql-chunk .ql-mark')).display !== 'none'), `${loc}: the second miss shows the kind marks`);
    /* a word whose kind the answer lacks */
    const iN = C.ids(loc, 'l2').find(i => { const r = C.round(loc, 'l2', i); return r.keys.some(k => C.lampTarget(r, k.kind) === 'none'); });
    const rN = C.round(loc, 'l2', iN), kN = rN.keys.find(k => C.lampTarget(rN, k.kind) === 'none');
    await force(page, 'l2', iN); await click(page, `.ql-key[data-kind="${kN.kind}"]`); await click(page, '.ql-check'); s = await st(page);
    is(s.lamp === 'none' && s.last === 'none' && await page.evaluate(() => !document.querySelector('.ql-chunk.is-lit')), `${loc}: “${kN.form}” — the lamp finds nothing`);
    /* write it */
    const rw = C.round(loc, 'l3', 1); await force(page, 'l3', 1, 'write');
    is(await page.evaluate(() => document.querySelectorAll('.ql-letter').length) === C.keyLetters(loc, 'l3').length + 1, `${loc}: Write it → the letter keys`);
    await answer(page, rw, true); s = await st(page);
    is(s.done, `${loc}: the question word written`);
    /* match + sort misses */
    const rm = C.round(loc, 'l4', 0); await force(page, 'l4', 0);
    await click(page, `.ql-card[data-card="${(rm.right + 1) % 3}"]`); await click(page, '.ql-check'); s = await st(page);
    is(s.misses === 1 && s.last === 'wrongCard', `${loc}: a wrong answer card is a miss`);
    const rs = C.round(loc, 'l5', 0); await force(page, 'l5', 0);
    for (let i = 0; i < rs.cards.length; i++) { await click(page, `.ql-cards.is-pool .ql-card[data-card="${i}"]`); await click(page, `.ql-tray[data-tray="${i === 0 ? (rs.cards[0].k === 'who' ? 'what' : 'who') : rs.cards[i].k}"]`); }
    await click(page, '.ql-check'); s = await st(page);
    is(s.last === 'wrongTray' && await page.evaluate(() => document.querySelectorAll('.ql-card.is-dark').length === 1), `${loc}: one card in the wrong tray stays dark`);
    /* settings */
    for (const [lv, n] of [['l1', 3], ['l2', 4], ['l3', 6]]) { await force(page, lv, 0); is(await page.evaluate(() => document.querySelectorAll('.ql-key').length) === n, `${loc}: ${lv} → ${n} keys`); }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const [lv, idx, phase] of [['l1', 0, 'rest'], ['l2', 2, 'lit'], ['l3', 2, 'rest'], ['l4', 3, 'rest'], ['l5', 0, 'rest']]) {
      await force(page, lv, idx);
      const r = C.round(loc, lv, idx);
      if (phase === 'lit') { const wk = r.keys.find(k => k.kind !== r.ask && C.lampTarget(r, k.kind) !== 'none'); await click(page, `.ql-key[data-kind="${wk.kind}"]`); await click(page, '.ql-check'); }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await wait(60);
      const tag = `@${w} ${loc} ${lv} ${phase}`;
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
        const vis = (e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none';
        const ctl = [...document.querySelectorAll('.ql-wrap button')].filter(vis);
        const txt = [...document.querySelectorAll('.ql-note,.ql-check,.ql-q,.ql-ctext,.ql-key')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
        const pics = [...document.querySelectorAll('.ql-pic')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
        const boxes = [...document.querySelectorAll('.ql-chunk,.ql-card,.ql-keys,.ql-q,.ql-tray')].filter(vis).map(e => e.getBoundingClientRect());
        const out = boxes.concat(ctl.map(e => e.getBoundingClientRect())).filter(b => b.right > app.right + 1 || b.left < app.left - 1).length;
        const chk = document.querySelector('.ql-check').getBoundingClientRect();
        return { side: de.scrollWidth - de.clientWidth, small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className), out, txt: Math.min(...txt), pics, fold: chk.bottom + scrollY, H: innerHeight, W: document.querySelector('.ql-wrap').getBoundingClientRect().width };
      });
      const floor = m.W >= 520 ? 96 : 64;
      is(m.side <= 0 && !m.small.length && !m.out, `${tag}: no sideways scroll, controls ≥ 44, nothing off the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out})`);
      is(m.txt >= 14 && m.pics.length >= 1 && Math.min(...m.pics) >= floor - 0.6, `${tag}: text ≥ 14 (${m.txt}), pictures ≥ ${floor} (${m.pics.map(Math.round).join('/')})`);
      if (phase === 'rest' && lv === 'l1') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-${phase}.png`), fullPage: true });
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-question-lamp: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
