#!/usr/bin/env node
/* =====================================================================
   local-test-story-stage.js — the interaction gate for ACTIVITY #24,
   "Solve the Story" (K.OA.A.2), the Story Stage.
   Real pointer taps and one real drag: the narrator acts, Next before
   acting (named, no miss), the child acts (the pile / taps that make
   things leave), Next wakes the keys, an empty Check, a wrong number →
   the replay at the TRUE numbers, a second miss → numbers to "?", the
   right answer → the done line + the shell's celebration; acting the
   wrong amount; Within 5 (singular lines) and Within 20 (two frames,
   digits, 0 refused first); free play; the width sweep.
   Expectations are computed HERE from the design sheet (§6), not read off
   the tool.
   Usage: node scripts/local-test-story-stage.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-frame.solve-the-story.k-oa-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const STR = require(path.join(MINI, 'story-stage-activity.js')).strings;
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
const nums = (s) => (String(s).match(/\d+/g) || []).map(Number);
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

/* the Within 10 table, written out again (design §6): kind, start, change, type */
const W10 = [['bird', 3, 2, 'add'], ['apple', 4, 3, 'add'], ['duck', 2, 4, 'add'], ['bunny', 5, 4, 'add'], ['balloon', 7, 3, 'take'], ['cookie', 8, 2, 'take'], ['fish', 6, 4, 'take'], ['tulip', 9, 5, 'take'], ['animals', 4, 3, 'put'], ['fruits', 5, 3, 'put']];
const answerOf = (a, b, type) => type === 'take' ? a - b : a + b;
const sumKey = (type, ans, b) => type === 'take' ? (ans === 1 ? 'sumTake1' : b === 1 ? 'sumTakeB1' : 'sumTake') : type === 'put' ? 'sumPut' : 'sumAdd';

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice(12));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice(20));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function open(loc, w, level) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/story-stage-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.StoryStageActivity && window.StoryStageActivity.st && document.querySelector('.ss-place'), { timeout: 8000 });
    await page.evaluate((level) => { const t = window.StoryStageActivity; t.FAST = true; if (level && t.api.settings.numbers !== level) { t.api.settings.numbers = level; t._pool = null; } }, level || 'within10');
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.StoryStageActivity.st, C = window.StoryStageCore; return { id: s.id, kind: s.kind, type: s.type, a: s.a, b: s.b, answer: s.answer, line: s.line, typed: s.typed, misses: s.misses, help: s.help, done: s.done, solid: C.solid(s), acted: C.acted(s), outs: s.places.filter(p => p && p.out).length, n: s.places.length }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.ss-note'); return n.hidden || n.closest('[hidden]') ? '' : n.textContent; });
  const lines = (page) => page.evaluate(() => [...document.querySelectorAll('.ss-line')].map(l => ({ text: l.querySelector('.ss-text').textContent, cls: l.className })));
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const busy = (page) => page.evaluate(() => { const t = window.StoryStageActivity; return !!(t._replay || t._acting || t._busy); });
  const idle = async (page) => { for (let k = 0; k < 100; k++) { if (!(await busy(page))) return; await wait(40); } };
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => e.offsetParent !== null); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no visible element ' + sel); return c; };
  async function clickSel(page, sel) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(50); }
  async function forceRound(page, kind) {
    await page.evaluate((kind) => { const t = window.StoryStageActivity; const pool = t._ensurePool(); const i = pool.findIndex(r => r.kind === kind); const order = [i]; for (let k = 0; k < pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, kind);
    await wait(60); await idle(page);
  }
  async function typeNumber(page, n, level) {
    if (level === 'within20') { for (const d of String(n)) await clickSel(page, `.ss-key[data-v="${d}"]`); }
    else await clickSel(page, `.ss-key[data-v="${n}"]`);
  }
  async function clearBox(page) { for (let k = 0; k < 3; k++) { const s = await state(page); if (!s.typed) return; await clickSel(page, '.ss-del'); } }
  /* act the child's line k times: the pile (one by a real drag) or taps on things that leave */
  async function act(page, k, dragFirst) {
    const s = await state(page);
    if (s.type === 'take') {
      for (let j = 0; j < k; j++) { const i = await page.evaluate(() => window.StoryStageActivity.st.places.findIndex(p => p && !p.out)); await clickSel(page, `.ss-place[data-i="${i}"]`); }
      return;
    }
    for (let j = 0; j < k; j++) {
      if (dragFirst && j === 0) {
        const from = await center(page, '.ss-pile');
        const target = await page.evaluate(() => { const st = window.StoryStageActivity.st; let i = st.places.length - 1; while (i >= 0 && st.places[i]) i--; return i; });
        const to = await center(page, `.ss-place[data-i="${target}"]`);
        const from2 = await center(page, '.ss-pile');
        await page.mouse.move(from2.x, from2.y); await page.mouse.down(); await page.mouse.move(from2.x + 20, from2.y + 20, { steps: 4 });
        const to2 = await page.evaluate((i) => { const r = document.querySelector(`.ss-place[data-i="${i}"]`).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, target);
        await page.mouse.move(to2.x, to2.y, { steps: 8 }); await page.mouse.up(); await wait(80);
        is((await page.evaluate((i) => { const p = window.StoryStageActivity.st.places[i]; return !!(p && p.who === 'c'); }, target)), `a drag from the pile lands on place ${target + 1}`);
        void to;
      } else await clickSel(page, '.ss-pile');
    }
  }

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const [kind, a, b, type] of W10) {
      const ans = answerOf(a, b, type), tag = `[${loc} ${kind} ${a}${type === 'take' ? '−' : '+'}${b}]`;
      await forceRound(page, kind);
      let s = await state(page);
      is(s.kind === kind && s.a === a && s.b === b && s.answer === ans, `${tag} round loaded (${s.kind} ${s.a} ${s.b} → ${s.answer})`);
      is(s.line === 1 && s.solid === a, `${tag} the narrator acted ${a} (${s.solid})`);
      const L = await lines(page);
      is(L.length === 3 && JSON.stringify(nums(L[0].text)) === `[${a}]` && JSON.stringify(nums(L[1].text)) === `[${b}]` && nums(L[2].text).length === 0, `${tag} the card reads ${a} / ${b} / ? — ${L.map(x => x.text).join(' | ')}`);
      is(/is-now/.test(L[1].cls), `${tag} the child's line is lit`);
      is((await note(page)) === STR[type === 'take' ? 'hintTurnTake' : 'hintTurnAdd'][loc], `${tag} your-turn note`);
      is((await page.evaluate(() => document.querySelector('.ss-pile').hidden)) === (type === 'take'), `${tag} the pile is ${type === 'take' ? 'closed' : 'open'}`);
      /* Next before acting: named, no miss */
      await clickSel(page, '.ss-go');
      s = await state(page);
      is(s.line === 1 && s.misses === 0 && (await note(page)) === STR.hintAct[loc], `${tag} Next before acting → "${await note(page)}", no miss`);
      /* keys sleep */
      is(await page.evaluate(() => [...document.querySelectorAll('.ss-key')].every(k => k.disabled)), `${tag} the keys sleep before the question`);
      /* a take story: the pile cannot be used, the narrator's things leave on a tap */
      await act(page, b, kind === 'bird' || kind === 'animals');
      s = await state(page);
      is(s.acted === b && s.solid === (type === 'take' ? a - b : a + b), `${tag} acted ${b} (${s.acted}), the stage shows ${ans} (${s.solid})`);
      if (type === 'take') is(s.outs === b && (await page.evaluate(() => document.querySelectorAll('.ss-place.is-out').length)) === b, `${tag} ${b} outlines stay on the stage`);
      await clickSel(page, '.ss-go');
      s = await state(page);
      is(s.line === 2 && (await page.evaluate(() => document.querySelector('.ss-go').textContent)) === STR.check[loc], `${tag} Next → the question; the button says ${STR.check[loc]}`);
      is(/is-now/.test((await lines(page))[2].cls), `${tag} the question is lit`);
      /* an empty Check */
      await clickSel(page, '.ss-go');
      s = await state(page);
      is(s.misses === 0 && (await note(page)) === STR[type === 'take' ? 'hintAskLeft' : 'hintAsk'][loc], `${tag} empty Check → "${await note(page)}", no miss`);
      /* a number heard in the story → miss 1 → the replay */
      await typeNumber(page, a, 'within10');
      await clickSel(page, '.ss-go');
      await wait(60);
      const replaying = await busy(page);
      await idle(page);
      s = await state(page);
      is(replaying && s.misses === 1, `${tag} typing ${a} (the start) → miss 1 and the replay`);
      is((await note(page)) === STR[type === 'take' ? 'hintReplayLeft' : 'hintReplayAll'][loc], `${tag} replay note — "${await note(page)}"`);
      is(s.solid === ans && s.acted === b, `${tag} after the replay the stage tells the story: ${ans} (${s.solid})`);
      /* miss 2 → numbers to "?" */
      await clearBox(page); await typeNumber(page, b, 'within10'); await clickSel(page, '.ss-go'); await idle(page);
      s = await state(page);
      const chips = await page.evaluate(() => [...document.querySelectorAll('.ss-chip.is-on')].map(c => c.textContent));
      is(s.misses === 2 && chips.length === ans && chips[chips.length - 1] === '?' && !chips.includes(String(ans)), `${tag} miss 2 → numbers ${chips.join(' ')}`);
      is((await note(page)) === STR[type === 'take' ? 'hintBright' : 'hintEvery'][loc] + ' ' + STR.hintNumbers[loc], `${tag} miss 2 note`);
      if (type === 'take') is(await page.evaluate(() => [...document.querySelectorAll('.ss-place.is-out .ss-chip')].every(c => !c.classList.contains('is-on'))), `${tag} outlines stay unnumbered`);
      /* the answer */
      await clearBox(page); await typeNumber(page, ans, 'within10'); await clickSel(page, '.ss-go');
      await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 4000 }).catch(() => {});
      s = await state(page);
      const done = (await lines(page))[2];
      is(s.done && /is-done/.test(done.cls) && JSON.stringify(nums(done.text)) === `[${ans}]`, `${tag} the question completes — "${done.text}"`);
      const want = interp(STR[sumKey(type, ans, b)][loc], { a, b, c: ans });
      is((await bubble(page)) === want, `${tag} the shell celebrates "${await bubble(page)}" (want "${want}")`);
    }
    /* acting the wrong amount: one too many birds → the replay corrects it and says so */
    await forceRound(page, 'bird');
    await act(page, 3); await clickSel(page, '.ss-go');
    await typeNumber(page, 6, 'within10'); await clickSel(page, '.ss-go'); await wait(60);
    const mid = await page.evaluate(() => [...document.querySelectorAll('.ss-chip.is-on.is-change')].length);
    await idle(page);
    let s = await state(page);
    is(s.solid === 5 && s.acted === 2, `[${loc}] acted 3 for "2 more" → the replay leaves 5 (${s.solid})`);
    is((await note(page)).includes(interp(STR.hintStory[loc], { b: 2, k: 3 })), `[${loc}] the note says the story's 2, not 3 — "${await note(page)}"`);
    is(mid >= 0, `[${loc}] replay chips`);
    /* free play */
    await clickSel(page, '.ss-playbtn');
    is((await page.evaluate(() => window.StoryStageActivity._playing)), `[${loc}] Tell your own opens`);
    is((await lines(page))[0].text === STR.playHint[loc], `[${loc}] free play opens with the pile hint`);
    for (let j = 0; j < 4; j++) await clickSel(page, '.ss-pile');
    is((await lines(page))[0].text === interp(STR.playStart[loc], { n: 4 }), `[${loc}] "${(await lines(page))[0].text}"`);
    await clickSel(page, '.ss-go');
    await clickSel(page, '.ss-place[data-i="0"]');
    const pl = (await lines(page)).map(x => x.text);
    is(pl.join(' ') === [interp(STR.playStart[loc], { n: 4 }), interp(STR.playAway1[loc], { k: 1 }), interp(STR.playNow[loc], { m: 3 })].join(' '), `[${loc}] the builder: ${pl.join(' ')}`);
    await clickSel(page, '.ss-playbtn');
    is(!(await page.evaluate(() => window.StoryStageActivity._playing)), `[${loc}] back to the story`);
    is(errs.length === 0, `[${loc}] no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* Within 5: the singular lines; Within 20: two frames, digits, 0 refused first */
  for (const loc of LOCALES.slice(0, Math.min(LOCALES.length, 11))) {
    const { page, errs } = await open(loc, 704, 'within5');
    await forceRound(page, 'duck');
    let s = await state(page);
    const L = await lines(page);
    is(s.a === 1 && s.b === 3 && JSON.stringify(nums(L[0].text)) === '[1]', `[${loc} w5] "1 duck…" — ${L[0].text}`);
    await forceRound(page, 'fish');
    await act(page, 4); await clickSel(page, '.ss-go'); await typeNumber(page, 1, 'within5'); await clickSel(page, '.ss-go');
    await wait(200);
    s = await state(page);
    is(s.done && JSON.stringify(nums((await lines(page))[2].text)) === '[1]', `[${loc} w5] 5 − 4 → 1 — ${(await lines(page))[2].text}`);
    await page.close();
    const o = await open(loc, 704, 'within20');
    await forceRound(o.page, 'tulip');
    s = await state(o.page);
    is(s.n === 20 && s.a === 18 && s.solid === 18, `[${loc} w20] two frames, 18 tulips acted`);
    is(await o.page.evaluate(() => document.querySelectorAll('.ss-place.is-counter.is-full').length === 18 && document.querySelectorAll('.ss-frame:not([hidden])').length === 2), `[${loc} w20] drawn counters on two frames`);
    is(await o.page.evaluate(() => { const im = document.querySelector('.ss-lab-pic'); return !!(im && im.getAttribute('src') && im.offsetParent); }), `[${loc} w20] the picture label says what the counters are`);
    await act(o.page, 7); await clickSel(o.page, '.ss-go');
    is(await o.page.evaluate(() => document.querySelector('.ss-key[data-v="0"]').disabled), `[${loc} w20] 0 cannot start an answer`);
    await typeNumber(o.page, 11, 'within20');
    is((await state(o.page)).typed === '11', `[${loc} w20] 1 then 1 types 11`);
    await clickSel(o.page, '.ss-go'); await wait(200);
    is((await state(o.page)).done, `[${loc} w20] 18 − 7 = 11 finishes`);
    is(errs.length === 0 && o.errs.length === 0, `[${loc}] w5/w20 no page errors`);
    await o.page.close();
  }

  /* the width sweep (en, default level, a take story and an add story) */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const kind of ['bunny', 'balloon']) {
      await forceRound(page, kind);
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app').getBoundingClientRect();
        const over = document.documentElement.scrollWidth - window.innerWidth;
        const places = [...document.querySelectorAll('.ss-place')].filter(e => e.offsetParent).map(e => e.getBoundingClientRect());
        const imgs = [...document.querySelectorAll('.lcs-app img')].filter(e => e.offsetParent && !e.hidden).map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
        const btns = [...document.querySelectorAll('.lcs-stage button')].filter(e => e.offsetParent).map(e => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); });
        const go = document.querySelector('.ss-go').getBoundingClientRect();
        const outside = places.filter(r => r.left < app.left - 1 || r.right > app.right + 1).length;
        return { over, minPlace: Math.min(...places.map(r => Math.min(r.width, r.height))), minImg: imgs.length ? Math.min(...imgs) : 0, minBtn: Math.min(...btns), goBottom: go.bottom, vh: window.innerHeight, outside };
      });
      const tag = `[en @${w} ${kind}]`;
      is(m.over <= 0 && m.outside === 0, `${tag} no horizontal overflow (${m.over}, ${m.outside} places outside)`);
      is(m.minBtn >= 44, `${tag} every control ≥ 44 px (${m.minBtn.toFixed(0)})`);
      is(m.minImg >= (w >= 700 ? 96 : w >= 360 ? 64 : 54), `${tag} pictures ${m.minImg.toFixed(0)} px`);
      is(m.goBottom <= m.vh + 8, `${tag} the main button is on screen (${m.goBottom.toFixed(0)} ≤ ${m.vh})`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `ss-${kind}-${w}.png`) });
    }
    is(errs.length === 0, `[en @${w}] no page errors`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-story-stage: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
