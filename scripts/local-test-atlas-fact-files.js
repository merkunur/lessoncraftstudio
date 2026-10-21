#!/usr/bin/env node
/* =====================================================================
   local-test-atlas-fact-files.js — the interaction gate for ACTIVITY #69,
   The Highlighter That Lifts Facts (Atlas's Fact Files, RI.K.1, 11
   locales). Real pointer at 704, every round of every level, every locale:
     Find the answer — the highlighter DRAGGED across the other sentence's
     answer and checked → the card reads those words back (miss 1); dragged
     again → miss 2: the answer sentence bright, the other faded, the gold
     signpost before the answer; dragged across the answer → the card reads
     the authored sentence and the shell celebrates. Once per locale: the
     whole answer sentence highlighted → an echo, trimmed, a success.
     Fill the fact file — a strip TAPPED into a wrong drawer → it slides
     back with the hint; DRAGGED into another wrong drawer → the right
     drawer glows; every strip filed (tap and drag); the claims: the wrong
     side → hint; the right sides → the file is full.
     Word-bank file — the trap tile tapped into a sentence → hint; a tile
     dragged to a wrong sentence; all five placed; three sentences picked →
     the summary, the success.
   The width sweep (all locales at 320 / 704 / 1366, en at 320–1366), each
   level at rest and after: no sideways scroll, every control ≥ 44 inside
   the card, text ≥ 14, every picture at its floor, the words ≥ 44 tall,
   and on Find the answer the Check button above the fold.
   Usage: node scripts/local-test-atlas-fact-files.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'atlas-fact-files.key-detail.ri-k-1';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '069-highlighter', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'atlas-fact-files-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, AtlasFactFilesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'atlas-fact-files-activity.js'), 'utf8') + '\n;this.__A = AtlasFactFilesActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
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
    await page.goto(`${base}/atlas-fact-files-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.AtlasFactFilesActivity && window.AtlasFactFilesActivity.st && document.querySelector('.af-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.AtlasFactFilesActivity; a.FAST = true; a.OK_MS = 60000; a.MISS_MS = 0; });
    return { page, errs };
  }
  async function force(page, level, round, deal) {
    await page.evaluate((level, round, deal) => { const a = window.AtlasFactFilesActivity, K = window.AtlasFactFilesCore; a.api.settings.level = level; const r = K.round(round.loc, level, round.key, round.q || 0); a._pool = [r]; a._poolKey = a._key(); a._deal = [deal || K.deal(r, K.seeded('t'), 1)]; a._order = null; a._orderForPool = null; a._pass = 0; window.LCS_reloadFirstTask(); }, level, round, deal);
    await wait(40);
  }
  const st = (page) => page.evaluate(() => { const s = window.AtlasFactFilesActivity.st; return JSON.parse(JSON.stringify({ sel: s.sel, misses: s.misses, done: s.done, phase: s.phase, filed: s.filed, placed: s.placed, picks: s.picks, ci: s.ci })); });
  const note = (page) => page.evaluate(() => document.querySelector('.af-note').textContent);
  const settle = (page) => page.waitForFunction(() => !window.AtlasFactFilesActivity._busy, { timeout: 15000 }).catch(() => {});
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(50);
  }
  /* the highlighter: press on word i, move across to word j, release */
  async function swipe(page, i, j) {
    const a = await ctr(page, `.af-w[data-i="${i}"]`), b = await page.evaluate((j) => { const r = document.querySelector(`.af-w[data-i="${j}"]`).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, j);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 10; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 10, a.y + (b.y - a.y) * k / 10);
    await page.mouse.up(); await wait(40);
  }
  const won = async (page, fn) => { await page.evaluate(() => { window.AtlasFactFilesActivity.OK_MS = 0; }); await fn(); const c = await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false); const b = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; }); await page.evaluate(() => { window.AtlasFactFilesActivity.OK_MS = 60000; }); return { c, b }; };

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.AtlasFactFilesActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'level:find,file,bank | pics:on,off', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);
    /* Find the answer: every fact, both questions over two passes */
    for (const r of C.plan(loc, 'find', C.seeded(loc), 0, null).concat(C.plan(loc, 'find', C.seeded(loc), 1, C.plan(loc, 'find', C.seeded(loc), 0, null)))) {
      const id = `${loc} ${r.id}`; await force(page, 'find', r);
      await swipe(page, r.trap[0], r.trap[1]); let s = await st(page);
      is(s.sel && s.sel[0] === r.trap[0] && s.sel[1] === r.trap[1], `${id}: the highlighter swiped across the other sentence's answer`);
      const live = await page.evaluate(() => document.querySelector('.af-gap').textContent);
      is(sp(live) === sp(C.words(r, r.trap)), `${id}: the caught words show in the card's gap («${live}»)`);
      await tap(page, '.af-check'); await settle(page); s = await st(page);
      is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintRead')), `${id}: the wrong words — the card does not shut, the hint (miss 1)`);
      await swipe(page, r.trap[1], r.trap[0]); await tap(page, '.af-check'); await settle(page); s = await st(page);
      const m2 = await page.evaluate(() => ({ faint: document.querySelectorAll('.af-w.is-faint').length, sign: document.querySelectorAll('.af-w.is-sign').length }));
      is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintSign')) && m2.faint > 0 && m2.sign === (r.span[0] > 0 && r.toks[r.span[0] - 1].s === r.toks[r.span[0]].s ? 1 : 0), `${id}: miss 2 — the other sentence fades, the gold signpost (${JSON.stringify(m2)})`);
      await swipe(page, r.span[0], r.span[1]);
      const w = await won(page, () => tap(page, '.af-check')); s = await st(page);
      const card = C.frameFill(r.frame, C.words(r, r.span));
      is(s.done && w.c && sp(w.b).includes(sp(card)), `${id}: the answer — the card reads «${card}», celebrates`);
    }
    {
      const r = C.round(loc, 'find', 'bees', 0); await force(page, 'find', r);
      const sen = r.toks.map((t, i) => i).filter(i => r.toks[i].s === 0);
      await swipe(page, sen[0], sen[sen.length - 1]);
      const w = await won(page, () => tap(page, '.af-check'));
      is(w.c && sp(w.b).includes(sp(C.frameFill(r.frame, C.words(r, r.span)))) && await page.evaluate(() => document.querySelectorAll('.af-w.is-peel').length > 0), `${loc}: the whole answer sentence — an echo, the extra words peel, the card reads the answer`);
      await force(page, 'find', r); await tap(page, '.af-check'); const s = await st(page);
      is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'emptyHL')), `${loc}: an empty check names the highlighter and is no miss`);
      await page.evaluate(() => { const a = window.AtlasFactFilesActivity; a.api.settings.pics = 'off'; a._paint(); });
      is(await page.evaluate(() => !document.querySelector('.af-factpic')), `${loc}: Pictures off hides the picture`);
      await page.evaluate(() => { const a = window.AtlasFactFilesActivity; a.api.settings.pics = 'on'; a._paint(); });
    }
    /* Fill the fact file: every file */
    for (const k of C.DATA.FILE_ORDER) {
      const r = C.round(loc, 'file', k), id = `${loc} file ${k}`, dl = C.deal(r, C.seeded(id), 1);
      await force(page, 'file', { loc, key: k }, dl);
      const s0 = dl.strips[0], right = r.sents[s0].heading, wrongs = C.DATA.HEADINGS.filter(h => h !== right);
      await tap(page, `[data-strip="${s0}"]`); await tap(page, `[data-drawer="${wrongs[0]}"]`); let s = await st(page);
      is(s.misses === 1 && !s.filed[s0] && sp(await note(page)) === sp(T(loc, 'hintDrawer')), `${id}: a strip tapped into a wrong drawer slides back with the hint`);
      await drag(page, `[data-strip="${s0}"]`, `[data-drawer="${wrongs[1]}"]`); s = await st(page);
      is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintDrawer2')) && await page.evaluate((h) => document.querySelector(`[data-drawer="${h}"]`).classList.contains('is-help'), right), `${id}: dragged into another wrong drawer — the right drawer glows`);
      for (const [n, i] of dl.strips.entries()) { if (n % 2) await drag(page, `[data-strip="${i}"]`, `[data-drawer="${r.sents[i].heading}"]`); else { await tap(page, `[data-strip="${i}"]`); await tap(page, `[data-drawer="${r.sents[i].heading}"]`); } }
      s = await st(page);
      const dets = await page.evaluate(() => [...document.querySelectorAll('.af-dr .af-det')].map(e => e.textContent));
      is(s.phase === 'claims' && JSON.stringify(dets) === JSON.stringify(r.sents.map(x => x.detail)), `${id}: every strip filed — each drawer shows its key detail`);
      const c0 = r.claims[dl.claims[0]];
      await tap(page, `[data-judge="${c0.truth ? 'out' : 'in'}"]`); s = await st(page);
      is(s.misses === 1 && s.ci === 0 && sp(await note(page)) === sp(T(loc, 'hintClaim')), `${id}: «${c0.text}» on the wrong side — the hint`);
      for (let q = 0; q < 2; q++) { const c = r.claims[dl.claims[q]]; await tap(page, `[data-judge="${c.truth ? 'in' : 'out'}"]`); }
      const c2 = r.claims[dl.claims[2]];
      const w = await won(page, () => tap(page, `[data-judge="${c2.truth ? 'in' : 'out'}"]`)); s = await st(page);
      is(s.done && w.c && sp(w.b).includes(sp(T(loc, 'okFile'))), `${id}: three claims judged — the file is full`);
    }
    /* Word-bank file: every file */
    for (const k of C.DATA.FILE_ORDER) {
      const r = C.round(loc, 'bank', k), id = `${loc} bank ${k}`, dl = C.deal(r, C.seeded(id));
      await force(page, 'bank', { loc, key: k }, dl);
      await tap(page, '[data-tile="5"]'); await tap(page, '[data-frame="0"]'); let s = await st(page);
      is(s.misses === 1 && Object.keys(s.placed).length === 0 && sp(await note(page)) === sp(T(loc, 'hintTile')), `${id}: the trap tile into a sentence — the hint`);
      await drag(page, '[data-tile="1"]', '[data-frame="0"]'); s = await st(page);
      is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintTile2')) && await page.evaluate(() => document.querySelector('[data-frame="1"]').classList.contains('is-help')), `${id}: a tile dragged to a wrong sentence — the right sentence glows`);
      for (let f = 0; f < 5; f++) { if (f % 2) await drag(page, `[data-tile="${f}"]`, `[data-frame="${f}"]`); else { await tap(page, `[data-tile="${f}"]`); await tap(page, `[data-frame="${f}"]`); } }
      s = await st(page);
      is(s.phase === 'pick' && await page.evaluate(() => document.querySelectorAll('.af-frame.is-pickable').length === 5), `${id}: five tiles placed — pick three`);
      await tap(page, '[data-frame="4"]'); await tap(page, '[data-frame="1"]');
      const w = await won(page, () => tap(page, '[data-frame="2"]')); s = await st(page);
      const lines = await page.evaluate(() => [...document.querySelectorAll('.af-sline')].map(e => e.textContent));
      is(s.done && w.c && sp(w.b).includes(sp(T(loc, 'okBank'))) && JSON.stringify(lines) === JSON.stringify([4, 1, 2].map(i => r.sents[i].text)), `${id}: three picks — the three sentences in pick order, celebrates`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    const longest = C.DATA.FACT_ORDER.map(k => C.round(loc, 'find', k, 1)).sort((a, b) => (b.text.length + b.question.length) - (a.text.length + a.question.length))[0];
    const fileKey = C.DATA.FILE_ORDER.slice().sort((a, b) => C.DATA.TEXT[loc].files[b].s.join('').length - C.DATA.TEXT[loc].files[a].s.join('').length)[0];
    const cases = [['find', longest, 'rest'], ['find', longest, 'miss2'], ['find', longest, 'won'], ['file', { loc, key: fileKey }, 'rest'], ['file', { loc, key: fileKey }, 'claims'], ['bank', { loc, key: fileKey }, 'rest'], ['bank', { loc, key: fileKey }, 'done']];
    for (const [level, r, phase] of cases) {
      await force(page, level, r);
      await page.evaluate((phase) => {
        const A = window.AtlasFactFilesActivity, K = window.AtlasFactFilesCore, s = A.st, r = s.r;
        if (s.level === 'find' && phase === 'miss2') { K.highlight(s, r.trap[0], r.trap[1]); K.check(s); K.highlight(s, r.trap[0], r.trap[1]); K.check(s); K.clearSel(s); s.show = true; }
        if (s.level === 'find' && phase === 'won') { K.highlight(s, r.span[0], r.span[1]); const res = K.check(s); A._view = { msg: A._t('okFind', { card: res.card }) }; }
        if (s.level === 'file' && phase === 'claims') r.sents.forEach((x, i) => K.file(s, i, x.heading));
        if (s.level === 'bank' && phase === 'done') { for (let f = 0; f < 5; f++) K.place(s, f, f); [0, 2, 4].forEach(f => K.pick(s, f)); A._view = { msg: A._t('okBank') }; }
        A._busy = false; if (phase !== 'won' && phase !== 'done') A._view = {}; A._paint();
      }, phase);
      await wait(50);
      const tag = `@${w} ${loc} ${level} ${r.key || r.id} ${phase}`;
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
        const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
        const ctl = [...document.querySelectorAll('.af-wrap button')].filter(vis);
        const txt = [...document.querySelectorAll('.af-note,.af-q,.af-w,.af-card,.af-strip,.af-lab,.af-det,.af-claim,.af-judge,.af-ftext,.af-frame,.af-tile,.af-sline')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
        const pics = [...document.querySelectorAll('.af-wrap img')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
        const words = [...document.querySelectorAll('.af-text')].map(e => parseFloat(getComputedStyle(e).lineHeight));
        const chk = document.querySelector('.af-check');
        return {
          side: de.scrollWidth - de.clientWidth,
          small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)).slice(0, 3),
          out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
          txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999, line: words.length ? Math.min(...words) : 99,
          fold: chk && !chk.hidden ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
        };
      });
      const floor = w >= 700 ? 96 : 64;
      is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
      is(m.txt >= 14 && m.pic >= floor - .5 && m.line >= 43.5, `${tag}: text ≥ 14 (${m.txt}), every picture ≥ ${floor} (${Math.round(m.pic)}), words ≥ 44 tall (${m.line})`);
      if (level === 'find') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${level}-${phase}.png`), fullPage: true });
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-atlas-fact-files: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
