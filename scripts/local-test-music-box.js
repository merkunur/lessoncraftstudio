#!/usr/bin/env node
/* =====================================================================
   local-test-music-box.js — the interaction gate for ACTIVITY #29,
   "Quick Facts to 5" (K.OA.A.5), the Music-Box Strip.
   Real pointer on every bar, the five-frame button and the crank: a wrong
   bar (nothing punched, the rods lie beside it), a second wrong bar (the
   frame opens, the rods move to the right bar, its disc lifts), a right bar
   (the hole, the fact flashes complete), the full strip (the crank wakes,
   the song plays, the lid picture, the shell celebrates with the song's
   name); Dots and Pictures; Notes; To 10 (two rows on phones); Add only;
   the Music box; the running playback; the width sweep. Expectations from
   the design (§5–7).
   Usage: node scripts/local-test-music-box.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-frame.quick-facts-to-5.k-oa-a-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const ACT = require(path.join(MINI, 'music-box-activity.js')), STR = ACT.strings;
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

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
  async function open(loc, w, fast) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/music-box-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.MusicBoxActivity && window.MusicBoxActivity.st && document.querySelector('.mb-bars .mb-bar'), { timeout: 8000 });
    if (fast !== false) await page.evaluate(() => { window.MusicBoxActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const C = window.MusicBoxCore, s = window.MusicBoxActivity._cur(), f = C.fact(s); return { pos: s.pos, punched: s.punched.slice(), help: s.help, full: s.full, done: s.done, explore: s.explore, n: s.notes.length, level: s.level, ans: f ? C.answerOf(f) : null, fact: f, facts: s.facts.map(x => x.op) }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.mb-note'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => e.offsetParent !== null && !e.hidden && !e.disabled); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.bottom - 8 }; }, sel); if (!c) throw new Error('no visible enabled element ' + sel); return c; };
  async function clickSel(page, sel, ms) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(ms || 60); }
  const bar = (page, k, ms) => clickSel(page, `.mb-bar[data-k="${k}"]`, ms);
  async function setting(page, key, val) { await page.evaluate((key, val) => { const t = window.MusicBoxActivity; t.api.settings[key] = val; t.onSettings(); }, key, val); await wait(120); }
  async function force(page, songId) {
    await page.evaluate((songId) => { const t = window.MusicBoxActivity; t._playing = false; const pool = t._ensurePool(); const i = pool.findIndex(r => r.songId === songId); if (i < 0) throw new Error('no song ' + songId); const order = [i]; for (let q = 0; q < pool.length; q++) if (q !== i) order.push(q); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, songId);
    await wait(120);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).catch(() => {});
  /* answer the rest of the strip with real taps */
  async function finish(page) { for (let i = 0; i < 12; i++) { const s = await state(page); if (s.full || s.done) break; await bar(page, s.ans, 40); } }

  for (const loc of LOCALES) {
    const tag = `[${loc}]`, w = loc === 'en' ? 704 : 412;
    const { page, errs } = await open(loc, w);
    is((await page.evaluate(() => getComputedStyle(document.querySelector('.lcs-activity-check')).display)) === 'none', `${tag} the shell Check is hidden`);
    await force(page, 'frere1');
    is((await prompt(page)) === STR.promptTap[loc], `${tag} "${await prompt(page)}"`);
    let s = await state(page);
    is(s.n === 8 && (await page.evaluate(() => document.querySelectorAll('.mb-bar').length)) === 5, `${tag} Frère Jacques: 8 facts, 5 bars`);
    is((await page.evaluate(() => [...document.querySelectorAll('.mb-bar')].map(b => b.querySelectorAll('.mb-block').length).join())) === '1,2,3,4,5', `${tag} bar k is k blocks tall`);
    const cardTxt = await page.evaluate(() => document.querySelector('.mb-card').textContent.trim());
    is(cardTxt === `${s.fact.a} ${s.fact.op === '+' ? '+' : '−'} ${s.fact.b}` && s.ans === 5, `${tag} the first fact "${cardTxt}" answers 5`);
    /* miss 1 */
    const k1 = 3; await bar(page, k1);
    s = await state(page);
    is(s.pos === 0 && s.punched.length === 0 && (await note(page)) === STR.hintRods[loc], `${tag} bar 3: nothing punched, "${await note(page)}"`);
    const rod1 = await page.evaluate((k) => { const r = document.querySelector(`.mb-bar[data-k="${k}"] .mb-rod`); return r && !r.hidden ? r.querySelectorAll('.mb-rb:not(.is-off)').length : -1; }, k1);
    is(rod1 === 5, `${tag} the rods (5 blocks kept) lie beside bar 3 (${rod1})`);
    is((await page.evaluate(() => document.querySelector('.mb-frame').hidden)), `${tag} the frame stays shut at miss 1`);
    /* miss 2 */
    await bar(page, 2);
    is((await note(page)) === STR.hintCount[loc] && !(await page.evaluate(() => document.querySelector('.mb-frame').hidden)), `${tag} miss 2: the frame opens, "${await note(page)}"`);
    is((await page.evaluate(() => { const r = document.querySelector('.mb-bar[data-k="2"] .mb-rod'); const r5 = document.querySelector('.mb-bar[data-k="5"] .mb-rod'); return r && !r.hidden && r5.hidden; })), `${tag} the rods stay beside the tapped bar 2 — never beside the answer`);
    /* right */
    await bar(page, 5);
    s = await state(page);
    is(s.pos === 1 && s.punched.join() === '5' && s.help === 0 && (await page.evaluate(() => document.querySelectorAll('.mb-hole').length)) === 1, `${tag} bar 5 punches a hole`);
    is((await page.evaluate(() => [...document.querySelectorAll('.mb-rod')].every(r => r.hidden))), `${tag} the rods go home`);
    const nxt = await page.evaluate(() => { const C = window.MusicBoxCore, f = C.fact(window.MusicBoxActivity.st); return f.a + ' ' + (f.op === '+' ? '+' : '−') + ' ' + f.b; });
    is((await page.evaluate(() => document.querySelector('.mb-card').textContent.trim())) === nxt, `${tag} the card shows the next fact at once (${nxt}) — never a fact already answered`);
    /* the five-frame on request */
    await clickSel(page, '.mb-framebtn');
    is(!(await page.evaluate(() => document.querySelector('.mb-frame').hidden)) && (await page.evaluate(() => document.querySelector('.mb-framebtn').getAttribute('aria-pressed'))) === 'true', `${tag} the frame button opens the counters`);
    s = await state(page);
    is((await page.evaluate(() => document.querySelectorAll('.mb-frame .mb-ctr:not(.is-off)').length)) === s.ans, `${tag} the frame shows the fact as counters (${s.ans} left)`);
    await clickSel(page, '.mb-framebtn');
    /* finish the strip */
    is((await page.evaluate(() => document.querySelector('.mb-crank').disabled)), `${tag} the crank sleeps until the strip is full`);
    await finish(page);
    s = await state(page);
    is(s.full && (await note(page)) === STR.hintCrank[loc] && !(await page.evaluate(() => document.querySelector('.mb-crank').disabled)), `${tag} full strip: "${await note(page)}"`);
    is(s.punched.join() === '5,4,3,5,5,4,3,5', `${tag} the holes are the tune's notes`);
    await clickSel(page, '.mb-crank', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateSong[loc], { song: STR.songFrere[loc], n: 8 }), `${tag} "${await bubble(page)}"`);
    is((await page.evaluate(() => { const i = document.querySelector('.mb-lidpic'); return !i.hidden && i.complete && i.naturalWidth > 0; })), `${tag} the bell pops up on the lid`);
    /* Dots, Pictures */
    await setting(page, 'display', 'dots'); await force(page, 'buns');
    s = await state(page);
    is((await page.evaluate(() => !!document.querySelector('.mb-card .mb-domino'))), `${tag} Dots: a domino (or crossed dice)`);
    const pipsN = await page.evaluate(() => document.querySelectorAll('.mb-card .mb-pip').length);
    is(pipsN === (s.fact.op === '+' ? s.fact.a + s.fact.b : s.fact.a), `${tag} the pips are the fact's numbers (${pipsN})`);
    await setting(page, 'display', 'pictures'); await wait(300);
    s = await state(page);
    const pics = await page.evaluate(() => [...document.querySelectorAll('.mb-card .mb-fr img')].map(i => i.complete && i.naturalWidth > 0));
    is(pics.length === (s.fact.op === '+' ? s.fact.a + s.fact.b : s.fact.a) && pics.every(Boolean), `${tag} Pictures: ${pics.length} fruit, loaded`);
    await setting(page, 'display', 'numbers');
    /* Notes */
    await setting(page, 'notes', 'go');
    is((await page.evaluate(() => document.querySelector('.mb-wrap').classList.contains('is-ring'))), `${tag} Notes: As you go marks the bars`);
    await setting(page, 'notes', 'end');
    /* Add only */
    await setting(page, 'facts', 'add');
    s = await state(page);
    is(s.facts.every(o => o === '+'), `${tag} Add only: every fact is an addition`);
    await setting(page, 'facts', 'both');
    /* To 10 */
    await setting(page, 'level', 'to10');
    is((await page.evaluate(() => document.querySelectorAll('.mb-bar').length)) === 10 && (await page.evaluate(() => document.querySelectorAll('.mb-barrow').length)) === (w >= 600 ? 1 : 2), `${tag} To 10: ten bars in ${w >= 600 ? 'one row' : 'two rows'}`);
    await setting(page, 'level', 'to5');
    /* the Music box */
    await clickSel(page, '.mb-playbtn');
    s = await state(page);
    is(s.explore && (await note(page)) === STR.playNote[loc], `${tag} the Music box opens`);
    await bar(page, 1); await bar(page, 3); await bar(page, 5);
    is((await state(page)).punched.join() === '1,3,5' && !(await page.evaluate(() => document.querySelector('.mb-crank').disabled)), `${tag} any bar punches; the crank wakes`);
    await clickSel(page, '.mb-clear');
    is((await state(page)).punched.length === 0, `${tag} a new strip`);
    await clickSel(page, '.mb-playbtn');
    is(!(await state(page)).explore, `${tag} back to the songs`);
    is(errs.length === 0, `${tag} no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the running playback (not FAST): the song plays at its own tempo, the holes light in turn */
  {
    const { page, errs } = await open('en', 704, false);
    await force(page, 'frere2');
    { const s0 = await state(page); await bar(page, s0.ans, 80); const nt = await note(page); is(new RegExp('= ' + s0.ans + '$').test(nt), `[en run] the note flashes the answered fact (${nt})`); }
    await wait(1100);
    await page.evaluate(() => { window.MusicBoxActivity.FLASH_MS = 0; });
    await finish(page);
    await clickSel(page, '.mb-crank', 10);
    const lits = [];
    for (let i = 0; i < 12; i++) { lits.push(await page.evaluate(() => window.MusicBoxActivity._lit)); await wait(260); }
    const seen = [...new Set(lits.filter(x => x != null))];
    is(seen.length >= 4 && seen.every((x, i) => i === 0 || x > seen[i - 1]), `[en run] the holes light in order (${seen.join(',')})`);
    await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateSong.en, { song: STR.songFrere.en, n: 6 }), `[en run] "${await bubble(page)}"`);
    is(errs.length === 0, '[en run] no page errors');
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const [cfg, act] of [[{}, 'miss'], [{ display: 'pictures', facts: 'add' }, null], [{ display: 'pictures' }, 'miss'], [{ level: 'to10', display: 'dots' }, 'miss'], [{ level: 'to10', display: 'pictures' }, null], [{}, 'play']]) {
      for (const [k, v] of Object.entries(Object.assign({ level: 'to5', facts: 'both', display: 'numbers' }, cfg))) await setting(page, k, v);
      if (act === 'miss') { const s = await state(page); await bar(page, s.ans === 1 ? 2 : 1); const s2 = await state(page); await bar(page, s2.ans === 2 ? 3 : 2); }
      if (act === 'play') { await clickSel(page, '.mb-playbtn'); for (const k of [1, 2, 3, 4, 5]) await bar(page, k, 30); }
      await wait(150);
      /* measure from the top of the page: the real taps above scrolled it */
      await page.evaluate(() => window.scrollTo(0, 0)); await wait(50);
      const m = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - window.innerWidth;
        const app = document.querySelector('.lcs-app').getBoundingClientRect();
        const vis = (e) => e.offsetParent && !e.hidden;
        const btns = [...document.querySelectorAll('.lcs-stage button')].filter(vis).map(e => { const r = e.getBoundingClientRect(); return { d: Math.min(r.width, r.height), c: e.className, out: r.left < app.left - 1 || r.right > app.right + 1, bottom: r.bottom }; });
        const parts = [...document.querySelectorAll('.mb-box, .mb-card, .mb-frame, .mb-bars, .mb-strip')].filter(vis).map(e => e.getBoundingClientRect());
        const imgs = [...document.querySelectorAll('.lcs-app img')].filter(vis).map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
        const font = Math.min(...[...document.querySelectorAll('.mb-disc, .mb-num')].filter(vis).map(e => parseFloat(getComputedStyle(e).fontSize)));
        const play = btns.filter(b => /mb-bar|mb-crank/.test(b.c));
        return { over, minBtn: Math.min(...btns.map(b => b.d)), small: btns.filter(b => b.d < 44).map(b => b.c).slice(0, 3).join(','), out: btns.filter(b => b.out).length + parts.filter(r => r.left < app.left - 1 || r.right > app.right + 1).length, lowest: Math.max(...btns.map(b => b.bottom)), lowestPlay: Math.max(...play.map(b => b.bottom)), vh: window.innerHeight, minImg: imgs.length ? Math.min(...imgs) : 999, font };
      });
      const tg = `[en @${w} ${JSON.stringify(cfg)}${act ? ' ' + act : ''}]`;
      is(m.over <= 0 && m.out === 0, `${tg} nothing outside the card (${m.over}, ${m.out})`);
      is(m.minBtn >= 44, `${tg} every control ≥ 44 px (${m.minBtn.toFixed(0)} ${m.small})`);
      /* the default page fits whole; a teacher's heavier setting keeps every bar and the crank on screen */
      if (!Object.keys(cfg).length) is(m.lowest <= m.vh + 1, `${tg} every control on screen (${m.lowest.toFixed(0)} ≤ ${m.vh})`);
      else is(m.lowestPlay <= m.vh + 1, `${tg} every bar and the crank on screen (${m.lowestPlay.toFixed(0)} ≤ ${m.vh})`);
      is(m.minImg >= (w >= 700 ? 96 : w >= 340 ? 64 : 56) - 0.5, `${tg} pictures ${m.minImg.toFixed(1)} px`);
      is(m.font >= 14, `${tg} numerals ≥ 14 px (${m.font})`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `mb-${Object.values(cfg).join('-') || 'default'}${act ? '-' + act : ''}-${w}.png`) });
      if (act === 'play') await clickSel(page, '.mb-playbtn');
    }
    is(errs.length === 0, `[en @${w}] no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-music-box: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
