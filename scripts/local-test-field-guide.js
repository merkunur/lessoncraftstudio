#!/usr/bin/env node
/* =====================================================================
   local-test-field-guide.js — ACTIVITY #121, The Book That Only Opens
   Where You Send It (Detective Dewey's Field Guide, 1.RI.5), in a real
   browser with real pointer actions in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (tools: A / B / C / D; help: after / start);
     · contents: a wrong line opens the wrong page (its heading's key and
       the question's key dotted side by side, hint 1); its first sentence
       is reading, not a miss; the ribbon closes the book back; a second
       wrong line → hint 2, every key underlined, the right line's in teal,
       the book back at the contents; the right line → its page, the dial
       on its number; the first sentence does not end it, the second does:
       it lands on Dewey's card;
     · headings: a wrong flap unfolds (hint), the right one folds it away;
     · a bold word: the glossary is shut until the word is tapped; then
       alphabetical; a wrong meaning → hint, the right one → solved;
     · the index (es/pt: a glossary round): alphabetical, then the page;
     · picture labels: captions closed until a label is tapped; three leader
       lines from the labels to drawn points on the picture; a wrong caption
       → hint, the right one → solved;
     · which tool: the closed book's tabs (es/pt two) open their part of the
       book; the screen book's buttons do their own job;
     · help from the start underlines without marking the match;
     · the riffle (not FAST).
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, the book's controls above the fold at rest, the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, Dewey ≥ 64
   px, the picture ≥ 96 px, everything inside the card, no text cut off,
   the leader lines on the picture.
   Usage: node scripts/local-test-field-guide.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '121-book-that-opens-where-you-send-it', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'field-guide-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, FieldGuideCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'field-guide-activity.js'), 'utf8') + '\n;this.__A = window.FieldGuideActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 400) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/field-guide-activity.html?activity=field-guide.text-features.1-ri-5&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FieldGuideActivity && window.FieldGuideActivity.st && document.querySelector('.fg-card'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.FieldGuideActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* a round of a level, set through the settings the drawer writes */
  async function force(page, lvl, r, help) {
    const ok = await page.evaluate((lvl, r, help) => {
      const a = window.FieldGuideActivity; a.api.settings.tools = lvl; a.api.settings.help = help || 'after'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0);
      return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, help);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.FieldGuideActivity.st; return { lvl: s.lvl, r: s.r, kind: s.kind, rd: s.rd, opened: s.opened, flap: s.flap, glossOpen: s.glossOpen, labels: s.labels, tab: s.tab, icon: s.icon, screen: s.screen, misses: s.misses, show: s.show, last: s.last, done: s.done, found: s.found }; });
  const note = (page) => page.evaluate(() => document.querySelector('.fg-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const has = (page, sel) => page.evaluate((s) => !!document.querySelector(s) && document.querySelector(s).getClientRects().length > 0, sel);
  const text = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const narrow = (page) => page.evaluate(() => window.FieldGuideActivity._wrap.classList.contains('is-narrow'));
  /* back to the feature on a phone (one page at a time) */
  async function toFeature(page, tag) { const s = await st(page); if (s.opened && await narrow(page)) await click(page, K('back'), tag); }
  const answer = (s) => C.answer(s.rd);
  const choices = (loc, s) => s.kind === 'label' ? s.rd.order : s.kind === 'tab' ? C.tabs(loc).map(t => t.id) : s.kind === 'icon' ? s.rd.icons : C.lines(loc, s.rd).map(l => l.part);
  async function choose(page, loc, s, c, tag) {
    if (s.kind === 'toc' || s.kind === 'index') { await toFeature(page, tag); await click(page, K('line-' + c), tag); }
    else if (s.kind === 'head') await click(page, K('flap-' + c), tag);
    else if (s.kind === 'gloss') await click(page, K('entry-' + c), tag);
    else if (s.kind === 'bold') { if (!(await st(page)).glossOpen) await click(page, K('bold'), tag); await click(page, K('entry-' + c), tag); }
    else if (s.kind === 'label') { if (!(await st(page)).labels[c]) await click(page, K('label-' + c), tag); await click(page, K('cap-' + c), tag); }
    else if (s.kind === 'tab') await click(page, K('tab-' + c), tag);
    else if (s.kind === 'icon') await click(page, K('icon-' + c), tag);
  }
  async function solve(page, loc, tag) {
    const s = await st(page), a = answer(s);
    await choose(page, loc, s, a, tag);
    if (['toc', 'index', 'head'].indexOf(s.kind) >= 0) await click(page, K('sent-' + a + '-1'), tag);
  }
  async function missTwice(page, loc, tag) {
    const s = await st(page), a = answer(s), wr = choices(loc, s).filter(c => c !== a);
    for (const c of wr.slice(0, 2)) { await choose(page, loc, s, c, tag); await wait(30); }
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.FieldGuideActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === '["tools:A/B/C/D","help:after/start"]', `${loc}: the settings`);
    /* contents */
    tag = `${loc} contents`; await force(page, 'A', 0); s = await st(page);
    const A0 = answer(s), lines0 = C.lines(loc, s.rd), w1 = lines0.find(l => l.part !== A0).part, w2 = lines0.filter(l => l.part !== A0)[1].part;
    is(sp(await prompt(page)) === sp(T(loc, 'instruction')) && await count(page, '.fg-line') === 3 && await has(page, '.fg-page.is-blank') && !(await has(page, '.fg-sent')), `${tag}: the contents, a blank page, no page turner`);
    is(sp(await text(page, '.fg-q')) === sp(C.plain(C.question(loc, s.rd))), `${tag}: the question on Dewey's card`);
    await click(page, K('line-' + w1), tag); s = await st(page);
    is(s.opened === w1 && s.misses === 1 && sp(await text(page, '.is-chapter .fg-phead')) === sp(C.plain(C.heading(loc, w1))) && sp(await note(page)) === sp(T(loc, 'hintLine1')) && await count(page, '.fg-k.k-ask') === 1 && await count(page, '.fg-k.k-wrong') >= 1, `${tag}: a wrong line opens its own page, the two keys dotted, hint 1`);
    is(sp(await text(page, '.fg-dial b')) === String(C.pageOf(w1)), `${tag}: the dial shows that page`);
    await click(page, K('sent-' + w1 + '-1'), tag); s = await st(page); is(!s.done && s.misses === 1 && sp(await note(page)) === sp(T(loc, 'readOn')), `${tag}: a sentence on the wrong page is reading, not a miss`);
    await click(page, K('back'), tag); s = await st(page); is(s.opened === null && await has(page, '.fg-page.is-blank'), `${tag}: the ribbon closes the book back`);
    await click(page, K('line-' + w2), tag); await wait(40); s = await st(page);
    is(s.misses === 2 && s.opened === null && sp(await note(page)) === sp(T(loc, 'hintLine2')) && await count(page, '.fg-line .fg-k.k-help') === 2 && await count(page, `${K('line-' + A0)} .fg-k.k-match`) === 1, `${tag}: miss 2 → back at the contents, every key underlined, the right one in teal`);
    await click(page, K('line-' + A0), tag); s = await st(page);
    is(s.opened === A0 && await count(page, '.fg-k.k-help,.fg-k.k-match') === 0 && sp(await note(page)) === sp(T(loc, 'nudgeRead')) && sp(await text(page, '.fg-dial b')) === String(C.pageOf(A0)), `${tag}: the right line → its page, the help gone, the dial on its number`);
    await click(page, K('sent-' + A0 + '-0'), tag); s = await st(page); is(!s.done && sp(await note(page)) === sp(T(loc, 'readOn')), `${tag}: the first sentence does not answer`);
    await click(page, K('sent-' + A0 + '-1'), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okPage', { p: C.pageOf(A0) })) && sp(await text(page, '.fg-found')) === sp(C.page(loc, A0).s[1]) && await count(page, '.fg-sent.is-found') === 1, `${tag}: the fact lands on Dewey's card`);
    /* headings */
    tag = `${loc} headings`; await force(page, 'A', 4); s = await st(page);
    const A4 = answer(s), wf = s.rd.flaps.find(p => p !== A4);
    is(await count(page, '.fg-flap') === 3 && await count(page, '.fg-sent') === 0, `${tag}: three folded headings`);
    await click(page, K('flap-' + wf), tag); s = await st(page); is(s.flap === wf && s.misses === 1 && await count(page, '.fg-sent') === 2 && sp(await note(page)) === sp(T(loc, 'hintHead1')), `${tag}: a wrong heading unfolds, hint`);
    await click(page, K('flap-' + A4), tag); is(await count(page, '.fg-sec.is-open') === 1 && await has(page, K('sent-' + A4 + '-1')) && !(await has(page, K('sent-' + wf + '-1'))), `${tag}: the right heading folds the other away`);
    await click(page, K('sent-' + A4 + '-1'), tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T(loc, 'okHead')), `${tag}: the fact → solved`);
    /* a bold word */
    tag = `${loc} bold`; await force(page, 'B', 3); s = await st(page);
    is(await count(page, '.fg-entry') === 0 && await has(page, K('bold')), `${tag}: the glossary shut, a bold word on the page`);
    await click(page, K('bold'), tag); const gl = await page.evaluate(() => [...document.querySelectorAll('.fg-entry b')].map(e => e.textContent));
    is(gl.length === 3 && gl.join() === C.lines(loc, s.rd).map(l => l.name).join() && sp(await note(page)) === sp(T(loc, 'nudgeGloss')), `${tag}: the bold word opens the glossary, alphabetical (${gl})`);
    const B3 = answer(s), wg = C.lines(loc, s.rd).find(l => l.part !== B3).part;
    await click(page, K('entry-' + wg), tag); s = await st(page); is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintGloss1')), `${tag}: a wrong meaning → hint`);
    await click(page, K('entry-' + B3), tag); s = await st(page); const tB = C.partText(loc, B3);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okGloss', { word: tB.name, gloss: C.plain(tB.gloss) })), `${tag}: the right meaning → solved`);
    /* the index (es/pt: a glossary round) */
    tag = `${loc} index`; await force(page, 'B', 5); s = await st(page);
    if (C.hasIndex(loc)) {
      const ix = await page.evaluate(() => [...document.querySelectorAll('.fg-line .fg-lt')].map(e => e.textContent));
      is(s.kind === 'index' && ix.length === 3 && ix.join() === C.lines(loc, s.rd).map(l => C.plain(l.topic)).join() && sp(await text(page, '.is-feat .fg-phead')) === sp(C.featName(loc, 'index')), `${tag}: the index, alphabetical (${ix})`);
      await solve(page, loc, tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T(loc, 'okPage', { p: C.pageOf(answer(s)) })), `${tag}: index → page → fact`);
    } else { is(s.kind === 'gloss' && !(await has(page, '.fg-line')), `${tag}: no index in this book: a glossary round`); await solve(page, loc, tag); is((await st(page)).done, `${tag}: solved`); }
    /* picture labels */
    tag = `${loc} labels`; await force(page, 'C', 0); s = await st(page);
    is(await count(page, '.fg-tag') === 3 && await count(page, '.fg-cap') === 0 && await count(page, '.fg-leaders line') === 3, `${tag}: three labels on leader lines, captions closed`);
    const onPic = await page.evaluate(() => { const p = document.querySelector('.fg-pic').getBoundingClientRect(), R = document.querySelector('.is-picpage .fg-pbody').getBoundingClientRect(); return [...document.querySelectorAll('.fg-leaders line')].every(l => { const x = +l.getAttribute('x2') + R.left, y = +l.getAttribute('y2') + R.top; return x >= p.left && x <= p.right && y >= p.top && y <= p.bottom; }); });
    is(onPic, `${tag}: every leader line ends on the picture`);
    const C0 = answer(s), wl = s.rd.order.find(k => k !== C0);
    await click(page, K('label-' + wl), tag); is(await count(page, '.fg-cap') === 1, `${tag}: a label opens its caption`);
    await click(page, K('cap-' + wl), tag); s = await st(page); is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintLabel1')), `${tag}: a wrong caption → hint`);
    await click(page, K('label-' + C0), tag); await click(page, K('cap-' + C0), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okLabel', { label: C.picture(loc, s.rd).labels.find(l => l.key === C0).label })), `${tag}: the right caption → solved`);
    /* which tool: tabs */
    tag = `${loc} tabs`; await force(page, 'D', 0); s = await st(page);
    const tabs = C.tabs(loc).map(t => t.id);
    is(await count(page, '.fg-tab') === tabs.length && await has(page, '.fg-cover'), `${tag}: the closed book, ${tabs.length} tabs`);
    const wt = tabs.find(t => t !== answer(s));
    await click(page, K('tab-' + wt), tag); s = await st(page);
    is(s.misses === 1 && sp(await text(page, '.fg-closed .fg-phead')) === sp(C.featName(loc, wt)) && sp(await note(page)) === sp(T(loc, 'hintTab1')), `${tag}: a wrong tab opens its own part, hint`);
    await click(page, K('tab-' + answer(s)), tag); s = await st(page); is(s.done && sp(await note(page)) === sp(C.tool(loc, 'okMeaning')), `${tag}: Words to Know → solved`);
    /* which tool: the screen book */
    tag = `${loc} screen`; await force(page, 'D', 2); s = await st(page);
    is(await count(page, '.fg-icon') === 4, `${tag}: four buttons`);
    await click(page, K('icon-listen'), tag); is(await has(page, '.fg-waves') && sp(await note(page)) === sp(T(loc, 'hintIcon1')), `${tag}: the speaker shows sound waves, hint`);
    const p0 = await text(page, '.fg-screen .fg-pnum'); await click(page, K('icon-next'), tag); s = await st(page);
    is(await text(page, '.fg-screen .fg-pnum') !== p0 && s.misses === 2 && sp(await note(page)) === sp(C.tool(loc, 'explainIcons')), `${tag}: the arrow turns the page, miss 2 explains the buttons`);
    await click(page, K('icon-search'), tag); s = await st(page); is(s.done && await has(page, '.fg-searchbox') && sp(await note(page)) === sp(C.tool(loc, 'okSearch')), `${tag}: the magnifier opens a search box → solved`);
    /* help from the start */
    tag = `${loc} help start`; await force(page, 'A', 1, 'start');
    is(await count(page, '.fg-line .fg-k.k-help') === 3 && await count(page, '.fg-line .fg-k.k-match') === 0 && await count(page, '.fg-q .fg-k.k-match') === 1, `${tag}: every key underlined, the match not marked`);
    /* the riffle */
    tag = `${loc} riffle`; await force(page, 'A', 2); s = await st(page);
    await page.evaluate(() => { window.FieldGuideActivity.FAST = false; });
    await click(page, K('line-' + answer(s)), tag); is(await count(page, '.fg-page.is-riffle') === 1 && await count(page, '.fg-dial.is-turn') === 1, `${tag}: the page riffles open, the dial turns`);
    await wait(700); is(await count(page, '.fg-page.is-riffle') === 0, `${tag}: then lies open`);
    await page.evaluate(() => { window.FieldGuideActivity.FAST = true; });
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth, wide = document.querySelector('.fg-wrap').classList.contains('is-wide');
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.fg-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.fg-dewey img').forEach(e => { if (vis(e) && e.getBoundingClientRect().width < 63.5) out.fails.push('Dewey ' + Math.round(e.getBoundingClientRect().width)); });
    document.querySelectorAll('.fg-pic').forEach(e => { if (vis(e) && e.getBoundingClientRect().width < 95.5) out.fails.push('picture ' + Math.round(e.getBoundingClientRect().width)); });
    const ctl = [...document.querySelectorAll('.fg-line:not(.is-static),.fg-flap,.fg-entry,.fg-bold,.fg-tag,.fg-tab,.fg-icon')].filter(vis);
    out.ctlBottom = ctl.length ? Math.max(...ctl.map(e => e.getBoundingClientRect().bottom)) : 0;
    const nr = document.querySelector('.fg-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.fg-wrap')).getBoundingClientRect();
    document.querySelectorAll('.fg-card,.fg-book,.fg-page,.fg-line,.fg-entry,.fg-tag,.fg-cap,.fg-tab,.fg-tablet,.fg-icon').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const band = ['.fg-card', '.fg-book', '.fg-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.fg-q,.fg-line,.fg-entry,.fg-cap,.fg-tag,.fg-tab,.fg-flap,.fg-sent,.fg-note,.fg-phead,.fg-found').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    const pic = document.querySelector('.fg-pic');
    if (pic && vis(pic)) { const p = pic.getBoundingClientRect(), R = document.querySelector('.is-picpage .fg-pbody').getBoundingClientRect(), ls = [...document.querySelectorAll('.fg-leaders line')]; if (ls.length !== 3 || !ls.every(l => { const x = +l.getAttribute('x2') + R.left, y = +l.getAttribute('y2') + R.top; return x >= p.left - 1 && x <= p.right + 1 && y >= p.top - 1 && y <= p.bottom + 1; })) out.fails.push('a leader line off the picture'); }
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.LEVELS) for (const r of C.rounds(lvl)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${lvl}${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      if (state === 'solved') await solve(page, loc, t0); else if (state === 'miss2') await missTwice(page, loc, t0);
      await wait(20);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= Math.min(2, choices(loc, s0).length - 1), `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${lvl}${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.FieldGuideActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.fg-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.ctlBottom <= VH(w), `${tag}: the book's controls above the fold (${Math.round(m.ctlBottom)} ≤ ${VH(w)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the ${state === 'solved' ? 'success line' : 'hint'} in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r % 4 === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${lvl}${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-field-guide: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
