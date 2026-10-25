#!/usr/bin/env node
/* =====================================================================
   local-test-marlo-magnifier.js — ACTIVITY #117, The Lens That Finds,
   Then Focuses, in a real browser with real pointer actions (clue cards
   tapped under Marlo's magnifier and tapped again to change them, Check
   clicked), in all 11 locales.
   Scenarios per locale (at 1024):
     · the setting and its three cases;
     · Proof: an empty Check → hintEmpty, no miss; a card → under the lens,
       nothing found yet; another card swaps in — one at a time; the same
       card again takes it out; a did-not-happen card → hintFog, the lens
       fogs, no sentence lit;
     · Proof or just a detail?: the in-story card → hintNotProof naming the
       claim, its own sentence lit, the ring not gold; again → hintMiss2,
       the key sentence underlined, the ringed word pulsing; a new card
       takes the help away; the proof → okProof, the ring gold, a seal,
       the proof's sentence lit, a case on the board; the cards rest;
     · Questions: a wrong card → hintNotAnswer; the answer → okQuestion;
     · the sweep animates (not FAST): the lens hops over the story, then
       the result settles.
   Then every round of every case at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in view
   at miss 2, the success line in view, controls ≥ 44 px, pictures ≥ 64 px
   (≥ 96 from 704), the lens inside the card, nothing outside the card, no
   bands overlap, no text cut off.
   Usage: node scripts/local-test-marlo-magnifier.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '117-lens-finds-then-focuses', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'marlo-magnifier-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, MarloLensCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'marlo-magnifier-activity.js'), 'utf8') + '\n;this.__A = window.MarloMagnifierActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
const plain = (c) => (c.pre + c.word + c.post).trim(), claimNoStop = (c) => plain(c).replace(/[\s ]*[.!?]\s*$/, '').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
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
    await page.goto(`${base}/marlo-magnifier-activity.html?activity=marlo-magnifier.trait-evidence.rl-1-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.MarloMagnifierActivity && window.MarloMagnifierActivity.st && document.querySelector('.mm-foot .mm-check'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.MarloMagnifierActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* a round of a case, its right card at a known slot */
  async function force(page, lv, r, slot) {
    await page.evaluate((lv, r, slot) => {
      const a = window.MarloMagnifierActivity; a.api.settings.case = lv; a._pool = null; a._ensurePool();
      a._slots = Array(8).fill(slot); a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0);
    }, lv, r, slot);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.MarloMagnifierActivity.st; return { level: s.level, r: s.r, clip: s.clip, misses: s.misses, show: s.show, last: s.last, found: s.found, fog: s.fog, focus: s.focus, done: s.done }; });
  const R0 = (page) => page.evaluate(() => { const s = window.MarloMagnifierActivity.st; return { cards: s.cards, right: s.right, F: s.F }; });
  const note = (page) => page.evaluate(() => document.querySelector('.mm-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const has = (page, sel) => page.evaluate((s) => !!document.querySelector(s), sel);
  const sents = (page, cls) => page.evaluate((c) => [...document.querySelectorAll('.mm-sent')].map(e => e.classList.contains(c) ? 1 : 0).join(''), cls);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const kindAt = (r, k) => r.cards.findIndex(c => c.kind === k);
  const wrongOf = (r) => r.cards.findIndex(c => !c.ok);
  async function solve(page, tag) { const r = await R0(page); await click(page, K('card-' + r.right), tag); await check(page, tag); }
  async function missTwice(page, tag) { const r = await R0(page); await click(page, K('card-' + wrongOf(r)), tag); await check(page, tag); await check(page, tag); }
  const line = (n) => [0, 1, 2].map(i => +(i === n)).join('');

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s, r;
    is(JSON.stringify(await page.evaluate(() => window.MarloMagnifierActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === '["case:proof/detail/questions"]', `${loc}: the setting`);
    /* Proof */
    tag = `${loc} proof`; await force(page, 'proof', 0, 2); r = await R0(page);
    is(sp(await prompt(page)) === sp(T(loc, 'tProof')) && await count(page, '.mm-card') === 3 && await count(page, '.mm-sent') === 3 && sp(await page.evaluate(() => document.querySelector('.mm-word').textContent)) === sp(r.F.claim.word), `${tag}: the task line, the claim with its ringed word, three sentences, three cards`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
    const m0 = r.cards.findIndex(c => c.kind === 'missing'), m1 = r.cards.findIndex((c, i) => c.kind === 'missing' && i !== m0);
    await click(page, K('card-' + m0), tag); s = await st(page);
    is(s.clip === m0 && await count(page, '.mm-card.is-in') === 1 && await has(page, '.mm-lens.is-held') && s.found === null && await sents(page, 'is-found') === '000', `${tag}: a card under the lens, nothing found before Check`);
    await click(page, K('card-' + m1), tag); s = await st(page); is(s.clip === m1 && await count(page, '.mm-card.is-in') === 1, `${tag}: another card swaps in — one at a time`);
    await click(page, K('card-' + m1), tag); s = await st(page); is(s.clip === null && !(await has(page, '.mm-lens.is-held')), `${tag}: the same card again takes it out`);
    await click(page, K('card-' + m0), tag); await check(page, tag); s = await st(page);
    is(s.last === 'fog' && sp(await note(page)) === sp(T(loc, 'hintFog')) && await has(page, '.mm-lens.is-fog') && await sents(page, 'is-found') === '000' && !(await has(page, '.mm-claim.is-sharp')), `${tag}: a clue that did not happen → hintFog, the lens fogs, nothing lit`);
    /* Proof or just a detail? */
    tag = `${loc} detail`; await force(page, 'detail', 5, 0); r = await R0(page);
    const ins = kindAt(r, 'detail');
    await click(page, K('card-' + ins), tag); await check(page, tag); s = await st(page);
    is(s.last === 'notProof' && sp(await note(page)) === sp(T(loc, 'hintNotProof', { claim: claimNoStop(r.F.claim) })) && await sents(page, 'is-found') === line(r.F.ins.s) && !(await has(page, '.mm-claim.is-sharp')) && !(await has(page, '.mm-lens.is-fog')), `${tag}: the in-story detail → hintNotProof, sentence ${r.F.ins.s + 1} lit, the ring not gold`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintMiss2')) && await sents(page, 'is-key') === line(r.F.proof.s) && await has(page, '.mm-claim.is-pulse'), `${tag}: miss 2 → the key sentence ${r.F.proof.s + 1} underlined, the word pulses`);
    await click(page, K('card-' + kindAt(r, 'missing')), tag); is(await sents(page, 'is-key') === '000' && !(await has(page, '.mm-wrap.is-help')), `${tag}: a new move takes the help away`);
    await click(page, K('card-' + r.right), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okProof', { claim: claimNoStop(r.F.claim) })) && await has(page, '.mm-claim.is-sharp') && await has(page, '.mm-seal') && await sents(page, 'is-found') === line(r.F.proof.s) && await count(page, '.mm-tab.is-on') === 1, `${tag}: the proof → okProof, the ring gold, a seal, sentence ${r.F.proof.s + 1} lit, a case on the board`);
    is(await page.evaluate(() => [...document.querySelectorAll('.mm-card')].every(b => b.disabled)), `${tag}: the cards rest once solved`);
    /* Questions */
    tag = `${loc} questions`; await force(page, 'questions', 3, 1); r = await R0(page);
    is(sp(await prompt(page)) === sp(T(loc, 'tQuestion')) && sp(await page.evaluate(() => document.querySelector('.mm-word').textContent)) === sp(r.F.q.word), `${tag}: the question with its ringed question word`);
    const w = wrongOf(r); await click(page, K('card-' + w), tag); await check(page, tag); s = await st(page);
    is(s.last === 'notAnswer' && sp(await note(page)) === sp(T(loc, 'hintNotAnswer')) && await sents(page, 'is-found') === line(r.cards[w].s), `${tag}: a wrong card → hintNotAnswer, its own sentence lit`);
    await click(page, K('card-' + r.right), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okQuestion', { question: plain(r.F.q), answer: r.F.ans.t.replace(/[.!]\s*$/, '') })), `${tag}: the answer → okQuestion`);
    /* the sweep, animated */
    tag = `${loc} sweep`; await force(page, 'proof', 1, 0); r = await R0(page);
    await page.evaluate(() => { window.MarloMagnifierActivity.FAST = false; });
    await click(page, K('card-' + r.right), tag); await click(page, K('check'), tag); await wait(60);
    is(await has(page, '.mm-lens.at-sent') && await count(page, '.mm-sent.is-under') === 1 && await page.evaluate(() => document.querySelector('.mm-check').disabled), `${tag}: the lens hops over the story, Check waits`);
    await wait(1600); s = await st(page);
    is(s.done && await has(page, '.mm-claim.is-sharp') && await has(page, '.mm-lens.at-park'), `${tag}: the sweep ends, the ring gold, the lens back in its dock`);
    await page.evaluate(() => { window.MarloMagnifierActivity.FAST = true; });
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.mm-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.mm-pic img,.mm-marlo img').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.width < 63.5 || (Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.mm-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.mm-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.mm-wrap')).getBoundingClientRect();
    document.querySelectorAll('.mm-claim,.mm-story,.mm-card,.mm-check,.mm-lens,.mm-marlo,.mm-board').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const band = ['.mm-top', '.mm-story', '.mm-tray', '.mm-foot', '.mm-note', '.mm-board'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.mm-card,.mm-sent').forEach(c => { if (c.scrollWidth > c.clientWidth + 1 || c.scrollHeight > c.clientHeight + 2) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    /* the claim: its TEXT inside its card (the seal on the card's corner is decoration, not text) */
    const cb = document.querySelector('.mm-claim').getBoundingClientRect(), tb = document.querySelector('.mm-ctext').getBoundingClientRect();
    if (tb.left < cb.left - 1 || tb.right > cb.right + 1 || tb.top < cb.top - 1 || tb.bottom > cb.bottom + 1) out.fails.push('the claim text leaves its card');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lv of C.LEVELS) for (const r of C.rounds(loc)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${lv} ${r} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lv, r, C.SLOTS[lv][r]);
      if (state === 'solved') await solve(page, t0); else if (state === 'miss2') await missTwice(page, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${lv} ${r} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.MarloMagnifierActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.mm-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${r}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-marlo-magnifier: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
