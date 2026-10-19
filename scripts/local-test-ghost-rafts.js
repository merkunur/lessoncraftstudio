#!/usr/bin/env node
/* =====================================================================
   local-test-ghost-rafts.js — the interaction gate for ACTIVITY #31,
   "Dewey's Ten-Tank" (K.NBT.A.1), the Ghost Rafts.
   Real pointer on the bubbles (taps and a drag onto the raft), the raft
   frame, the sealed raft (press and hold to pop), the reeds, the number
   cards, the two tanks and Check. CATCH 13 — a card before the ten is
   caught (no miss), no count on the stage, catch nine, let one go, seal at
   the tenth (the rest hook onto the tow-line), the reversal card 31 builds
   three ghost rafts and one bubble, 14 (miss 2: the badge and 11-12-13),
   then 13. POP 12 — a short press does not pop, the hold does; 2 and 10
   build their ghosts, miss 2 lines the ten up 1–10. DOCK 15 — Check with
   nothing (no miss), spare bubbles drift until the raft docks, the ghost
   and the missing slot, success. FIX 14 — a second raft is refused. TWO
   TANKS 13 vs 18 — the pairing strip and the glow. Up to 15, the Words
   cards, Ghost bay, the width sweep. Expectations from the design (§5–7).
   Usage: node scripts/local-test-ghost-rafts.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-tank.ten-frame-tank.k-nbt-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const STR = require(path.join(MINI, 'ghost-rafts-activity.js')).strings;
const NW = require(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'number-words.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice(12)) : p.startsWith('/image-library-webp/') ? path.join(IMG, p.slice(20)) : path.join(MINI, p.replace(/^\//, ''));
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
    await page.goto(`${base}/ghost-rafts-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.GhostRaftsActivity && window.GhostRaftsActivity.st && document.querySelector('.gr-tank'), { timeout: 8000 });
    if (fast !== false) await page.evaluate(() => { window.GhostRaftsActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.GhostRaftsActivity._cur(); return { kind: s.kind, n: s.n, raft: s.tank.raft, seats: s.tank.seats, loose: s.tank.loose, tow: s.tank.tow, rraft: s.reeds.raft, spare: s.reeds.spare, misses: s.misses, help: s.help, done: s.done, explore: s.explore, popped: s.popped, cards: s.cards, two: s.two }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.gr-note'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const ghost = (page) => page.evaluate(() => [document.querySelectorAll('.gr-ghost .gr-graft').length, document.querySelectorAll('.gr-ghost .gr-gbub').length].join('+'));
  const center = async (page, sel, nth) => { const c = await page.evaluate((s, k) => { const el = [...document.querySelectorAll(s)].filter(e => e.offsetParent !== null && !e.hidden && !e.disabled)[k || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, nth || 0); if (!c) throw new Error('no visible enabled element ' + sel); return c; };
  async function clickSel(page, sel, ms, nth) { const c = await center(page, sel, nth); await page.mouse.click(c.x, c.y); await wait(ms || 50); }
  async function card(page, v, ms) { await clickSel(page, `.gr-card[data-v="${v}"]`, ms); }
  async function hold(page, sel, ms) { const c = await center(page, sel); await page.mouse.move(c.x, c.y); await page.mouse.down(); await wait(ms); await page.mouse.up(); await wait(60); }
  async function force(page, numbers, id) {
    await page.evaluate((numbers, id) => { const t = window.GhostRaftsActivity; t._playing = false; if (t.api.settings.numbers !== numbers) { t.api.settings.numbers = numbers; t._pool = null; } const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); const order = [i]; for (let q = 0; q < pool.length; q++) if (q !== i) order.push(q); t._order = order; t._deal = null; t._curPass = 0; window.LCS_reloadFirstTask(); }, numbers, id);
    await wait(120);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).catch(() => {});
  const stageNums = (page) => page.evaluate(() => { const st = document.querySelector('.lcs-stage'); const clone = st.cloneNode(true); clone.querySelectorAll('.gr-card, .gr-record, .gr-note, .gr-actions, .gr-baylab, svg').forEach(e => e.remove()); return (clone.textContent.match(/\d+/g) || []).join(','); });

  for (const loc of LOCALES) {
    const tag = `[${loc}]`, w = loc === 'en' ? 1024 : 412;
    const { page, errs } = await open(loc, w);
    is((await page.evaluate(() => getComputedStyle(document.querySelector('.lcs-activity-check')).display)) === 'none', `${tag} the shell Check is hidden`);
    is(await page.evaluate(() => { const i = document.querySelector('.gr-duck'); return i.complete && i.naturalWidth > 0; }), `${tag} the duckling picture loads`);
    /* ---- CATCH 13 ---- */
    await force(page, '19', 'catch.13');
    is((await prompt(page)) === STR.promptCatch[loc], `${tag} "${await prompt(page)}"`);
    let s = await state(page);
    is(s.loose === 13 && s.seats === 0 && !s.raft && s.cards.slice().sort((a, b) => a - b).join() === '13,14,31', `${tag} 13 loose bubbles, cards 13 · 14 · 31 (${s.cards})`);
    is((await stageNums(page)) === '', `${tag} no count on the stage during the task`);
    await card(page, 13);
    s = await state(page);
    is(!s.done && s.misses === 0 && (await note(page)) === STR.hintCatch[loc], `${tag} a card before the ten is caught: no miss, "${await note(page)}"`);
    for (let i = 0; i < 9; i++) await clickSel(page, '.gr-bub');
    s = await state(page);
    is(s.seats === 9 && s.loose === 4, `${tag} nine taps put nine bubbles on the seats (${s.seats}/${s.loose})`);
    await clickSel(page, '.gr-frame');
    s = await state(page);
    is(s.seats === 8 && s.loose === 5, `${tag} a tap on the raft lets the last one go (${s.seats}/${s.loose})`);
    await clickSel(page, '.gr-bub'); await clickSel(page, '.gr-bub', 80);
    s = await state(page);
    is(s.raft === 1 && s.seats === 0 && s.loose === 0 && s.tow === 3, `${tag} the tenth seals the raft; the other three hook on behind (${s.raft}, ${s.tow})`);
    is(await page.evaluate(() => document.querySelector('.gr-duck').classList.contains('is-aboard') && !document.querySelector('.gr-bar').hidden && document.querySelector('.gr-frame').hidden), `${tag} Dewey is aboard the sealed raft`);
    is((await page.evaluate(() => document.querySelectorAll('.gr-tow .gr-tb').length)) === 3, `${tag} three bubbles in a row on the tow-line`);
    is((await stageNums(page)) === '', `${tag} still no count on the stage`);
    await card(page, 31);
    s = await state(page);
    is(s.misses === 1 && (await ghost(page)) === '3+1' && (await note(page)) === interp(STR.hintGhost[loc], { m: 31 }), `${tag} 31: three ghost rafts and one ghost bubble — "${await note(page)}"`);
    await card(page, 14);
    s = await state(page);
    is(s.misses === 2 && (await ghost(page)) === '1+4' && (await note(page)) === interp(STR.hintOneTen[loc], { k: 3 }), `${tag} 14: one ghost raft and four bubbles; miss 2 — "${await note(page)}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.gr-tow .gr-tb b')].map(b => b.textContent).join(','))) === '11,12,13' && (await page.evaluate(() => getComputedStyle(document.querySelector('.gr-badge')).display)) !== 'none', `${tag} miss 2: the raft's 10 badge and 11, 12, 13 on the row`);
    await card(page, 13, 200); await celebrated(page);
    s = await state(page);
    is(s.done && (await bubble(page)) === interp(STR.okMake[loc], { k: 3, n: 13 }), `${tag} "${await bubble(page)}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.gr-record b')].map(b => b.textContent).join('|'))) === '10|3|13', `${tag} the record reads 10 + 3 = 13`);
    /* ---- POP 12 ---- */
    await force(page, '19', 'pop.12');
    is((await prompt(page)) === STR.promptPop[loc] && (await page.evaluate(() => [...document.querySelectorAll('.gr-record b')].map(b => b.textContent).join('|'))) === '10|2|', `${tag} pop: "${await prompt(page)}", the record 10 + 2 = ?`);
    await card(page, 12);
    is((await state(page)).misses === 0 && (await note(page)) === STR.hintPop[loc], `${tag} a card before the pop: no miss, "${await note(page)}"`);
    await hold(page, '.gr-bar', 60);
    s = await state(page);
    is(s.raft === 0 && s.loose === 10 && s.tow === 2 && s.popped, `${tag} the hold pops the raft: ten loose, the row of 2 stays`);
    await card(page, 2);
    is((await ghost(page)) === '0+2', `${tag} the card 2 builds two ghost bubbles and no raft`);
    await card(page, 10);
    is((await state(page)).misses === 2 && (await note(page)) === interp(STR.hintTenLoose[loc], { k: 2 }) && (await page.evaluate(() => [...document.querySelectorAll('.gr-bub b')].map(b => b.textContent).join(','))) === '1,2,3,4,5,6,7,8,9,10', `${tag} miss 2 lines the ten up 1–10: "${await note(page)}"`);
    await card(page, 12, 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.okPop[loc], { n: 12, k: 2 }), `${tag} "${await bubble(page)}"`);
    /* ---- DOCK 15 ---- */
    await force(page, '19', 'dock.15');
    is((await prompt(page)) === interp(STR.promptDock[loc], { n: 15 }), `${tag} "${await prompt(page)}"`);
    await clickSel(page, '.gr-check');
    is((await state(page)).misses === 0 && (await note(page)) === STR.hintDock[loc], `${tag} Check with nothing: no miss, "${await note(page)}"`);
    for (let i = 0; i < 4; i++) await clickSel(page, '.gr-pile');
    s = await state(page);
    is(s.loose === 4 && s.tow === 0 && s.spare === 5, `${tag} four spare bubbles drift loose before the raft docks`);
    await clickSel(page, '.gr-ready', 80);
    s = await state(page);
    is(s.raft === 1 && s.tow === 4 && s.loose === 0 && s.rraft === 0, `${tag} the raft docks and the four hook on behind`);
    await clickSel(page, '.gr-check');
    is((await state(page)).misses === 1 && (await ghost(page)) === '1+5' && (await note(page)) === STR.hintGhostMake[loc], `${tag} 14 for 15: the ghost of 15 — "${await note(page)}"`);
    await clickSel(page, '.gr-check');
    is((await note(page)) === interp(STR.hintNeed[loc], { k: 5 }) && (await page.evaluate(() => document.querySelectorAll('.gr-tb.is-slot').length)) === 1, `${tag} miss 2: "${await note(page)}", one dotted place`);
    await clickSel(page, '.gr-pile');
    await clickSel(page, '.gr-check', 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.okMake[loc], { k: 5, n: 15 }), `${tag} "${await bubble(page)}"`);
    /* ---- FIX 14 (starts 10 + 2) ---- */
    await force(page, '19', 'fix.14');
    s = await state(page);
    is(s.raft === 1 && s.tow === 2 && (await prompt(page)) === interp(STR.promptFix[loc], { n: 14 }), `${tag} fix: 10 + 2 in the tank, "${await prompt(page)}"`);
    await clickSel(page, '.gr-ready');
    is((await state(page)).raft === 1 && (await note(page)) === STR.hintOneTenOnly[loc], `${tag} a second raft is refused: "${await note(page)}"`);
    for (let i = 0; i < 3; i++) await clickSel(page, '.gr-pile');
    await clickSel(page, '.gr-check');
    is((await state(page)).misses === 1, `${tag} 15 for 14 is a miss`);
    await clickSel(page, '.gr-tow');
    is((await state(page)).tow === 4, `${tag} a tap on the row puts the last bubble back in the reeds`);
    await clickSel(page, '.gr-check', 200); await celebrated(page);
    is((await state(page)).done, `${tag} 14 fixed`);
    /* ---- TWO TANKS 13 vs 18 ---- */
    await force(page, '19', 'two.13-18');
    s = await state(page);
    const small = s.two[0] < s.two[1] ? 0 : 1;
    is((await prompt(page)) === STR.promptTwo[loc] && s.two.slice().sort().join() === '13,18', `${tag} "${await prompt(page)}" (${s.two})`);
    await clickSel(page, `.gr-mini[data-side="${small}"]`);
    is((await note(page)) === STR.hintSameTen[loc] && !(await page.evaluate(() => document.querySelector('.gr-pair').hidden)), `${tag} the wrong tank: "${await note(page)}", the rows paired`);
    await clickSel(page, `.gr-mini[data-side="${small}"]`);
    is((await page.evaluate(() => document.querySelectorAll('.gr-pair i.is-glow').length)) === 5, `${tag} miss 2: the five extra bubbles glow`);
    await clickSel(page, `.gr-mini[data-side="${1 - small}"]`, 200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.okTwo[loc], { a: 18, b: 13, ka: 8, kb: 3 }), `${tag} "${await bubble(page)}"`);
    /* ---- Up to 15 + Words ---- */
    await page.evaluate(() => { const t = window.GhostRaftsActivity; t.api.settings.numbers = '15'; t.onSettings(); }); await wait(150);
    s = await state(page);
    is(s.kind === 'catch' && [11, 12, 14, 15].includes(s.n), `${tag} Up to 15: a pass opens on a catch round within 15 (${s.kind} ${s.n})`);
    await force(page, '15', 'catch.12');
    await page.evaluate(() => { const t = window.GhostRaftsActivity; t.api.settings.cards = 'words'; t.onSettings(); }); await wait(80);
    is((await page.evaluate(() => [...document.querySelectorAll('.gr-card')].map(b => b.textContent.replace(/\u00ad/g, '')).sort().join('|'))) === [12, 21, 2].map(n => NW.numberWord(n, loc)).sort().join('|'), `${tag} Words: the cards say the reviewed number words`);
    await force(page, '15', 'dock.13');
    is((await prompt(page)) === interp(STR.promptDock[loc], { n: NW.numberWord(13, loc) }), `${tag} Words: "${await prompt(page)}"`);
    await page.evaluate(() => { const t = window.GhostRaftsActivity; t.api.settings.cards = 'digits'; t.onSettings(); }); await wait(60);
    /* ---- Ghost bay (open play) ---- */
    await clickSel(page, '.gr-playbtn');
    s = await state(page);
    is(s.explore && (await note(page)) === STR.playNote[loc], `${tag} Ghost bay: "${await note(page)}"`);
    for (let i = 0; i < 12; i++) await clickSel(page, '.gr-add', 20);
    for (let i = 0; i < 10; i++) await clickSel(page, '.gr-bub', 20);
    s = await state(page);
    is(s.raft === 1 && s.tow === 2, `${tag} Ghost bay: twelve bubbles, ten caught → a raft and two behind`);
    const v = await page.evaluate(() => +document.querySelector('.gr-card').getAttribute('data-v'));
    await clickSel(page, '.gr-card');
    is((await ghost(page)) === Math.floor(v / 10) + '+' + (v % 10), `${tag} Ghost bay: the card ${v} builds its ghost`);
    await clickSel(page, '.gr-playbtn');
    is(!(await state(page)).explore, `${tag} back to the rounds`);
    is(errs.length === 0, `${tag} no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the hold, the drag, the drift — not FAST */
  {
    const { page, errs } = await open('en', 1024, false);
    await force(page, '19', 'pop.12');
    await hold(page, '.gr-bar', 250);
    is((await state(page)).raft === 1, '[en hold] a short press does not pop');
    await hold(page, '.gr-bar', 750);
    is((await state(page)).raft === 0, '[en hold] a 600 ms hold pops the raft');
    await force(page, '19', 'catch.16');
    const p0 = await page.evaluate(() => { const r = document.querySelector('.gr-bub').getBoundingClientRect(); return [r.left, r.top]; });
    await wait(1000);
    const p1 = await page.evaluate(() => { const r = document.querySelector('.gr-bub').getBoundingClientRect(); return [r.left, r.top]; });
    const d = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
    is(d > 0.5 && d <= 13, `[en drift] a bubble drifts, slowly (${d.toFixed(1)} px in 1 s)`);
    const b = await center(page, '.gr-bub'), f = await page.evaluate(() => { const r = document.querySelector('.gr-frame').getBoundingClientRect(); return { x: r.left + r.width * 0.7, y: r.top + r.height / 2 }; });
    await page.mouse.move(b.x, b.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) { await page.mouse.move(b.x + (f.x - b.x) * i / 8, b.y + (f.y - b.y) * i / 8); await wait(16); }
    await page.mouse.up(); await wait(80);
    const s = await state(page);
    is(s.seats === 1 && s.loose === 15, `[en drag] a bubble dragged onto the raft takes a seat (${s.seats}/${s.loose})`);
    const b2 = await center(page, '.gr-bub');
    await page.mouse.move(b2.x, b2.y); await page.mouse.down();
    for (let i = 1; i <= 6; i++) { await page.mouse.move(b2.x + 6 * i, b2.y); await wait(16); }
    await page.mouse.up(); await wait(80);
    is((await state(page)).seats === 1, '[en drag] a bubble dropped in the water stays loose');
    is(errs.length === 0, '[en hold/drift/drag] no page errors');
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    for (const loc of w === 412 ? ['en', 'fi'] : ['en']) {
      const { page, errs } = await open(loc, w);
      for (const [lv, id, act] of [['19', 'catch.18', 'rest'], ['19', 'catch.18', 'miss2'], ['19', 'pop.12', 'popped'], ['19', 'dock.17', 'rest'], ['19', 'fix.14', 'rest'], ['19', 'dock.17', 'miss2'], ['19', 'two.13-18', 'miss2'], ['19', 'catch.13', 'words'], ['19', 'catch.13', 'play']]) {
        await force(page, lv, id);
        if (act === 'miss2') {
          if (id.startsWith('catch')) { for (let i = 0; i < 10; i++) await clickSel(page, '.gr-bub', 10); const st = await state(page); const wrong = st.cards.filter(c => c !== st.n); await card(page, wrong[0]); await card(page, wrong[1]); }
          if (id.startsWith('dock')) { await clickSel(page, '.gr-ready'); for (let i = 0; i < 3; i++) await clickSel(page, '.gr-pile', 10); await clickSel(page, '.gr-check'); await clickSel(page, '.gr-check'); }
          if (id.startsWith('two')) { const st = await state(page); const sm = st.two[0] < st.two[1] ? 0 : 1; await clickSel(page, `.gr-mini[data-side="${sm}"]`); await clickSel(page, `.gr-mini[data-side="${sm}"]`); }
        }
        if (act === 'popped') { await hold(page, '.gr-bar', 30); await card(page, 2); await card(page, 10); }
        if (act === 'words') { await page.evaluate(() => { const t = window.GhostRaftsActivity; t.api.settings.cards = 'words'; t.onSettings(); }); await wait(60); }
        if (act === 'play') { await clickSel(page, '.gr-playbtn'); for (let i = 0; i < 15; i++) await clickSel(page, '.gr-add', 10); }
        await page.evaluate(() => window.scrollTo(0, 0)); await wait(80);
        const m = await page.evaluate(() => {
          const over = document.documentElement.scrollWidth - window.innerWidth;
          const app = document.querySelector('.lcs-app').getBoundingClientRect();
          const vis = (e) => e.offsetParent && !e.hidden;
          const btns = [...document.querySelectorAll('.lcs-stage button')].filter(vis).filter(e => !e.classList.contains('gr-bub') || true).map(e => { const r = e.getBoundingClientRect(); return { d: Math.min(r.width, r.height), c: e.className, out: r.left < app.left - 1 || r.right > app.right + 1, bottom: r.bottom }; });
          const parts = [...document.querySelectorAll('.gr-tank, .gr-bay, .gr-reeds, .gr-record, .gr-cards, .gr-two, .gr-pair, .gr-frame, .gr-bar')].filter(vis).map(e => e.getBoundingClientRect());
          const tank = document.querySelector('.gr-tank'), tr = tank && vis(tank) ? tank.getBoundingClientRect() : null;
          const inTank = !tr ? 0 : [...document.querySelectorAll('.gr-frame, .gr-bar, .gr-tow .gr-tb')].filter(vis).filter(e => { const r = e.getBoundingClientRect(); return r.right > tr.right + 1 || r.left < tr.left - 1 || r.bottom > tr.bottom + 1; }).length;
          const font = Math.min(...[...document.querySelectorAll('.gr-note, .gr-card, .gr-record, .gr-baylab, .gr-mrec')].filter(vis).filter(e => e.textContent.trim()).map(e => parseFloat(getComputedStyle(e).fontSize)));
          return { over, minBtn: Math.min(...btns.map(b => b.d)), small: btns.filter(b => b.d < 44).map(b => b.c).slice(0, 3).join(','), out: btns.filter(b => b.out).length + parts.filter(r => r.left < app.left - 1 || r.right > app.right + 1).length, inTank, lowest: Math.max(...btns.map(b => b.bottom)), vh: window.innerHeight, font };
        });
        const tg = `[${loc} @${w} ${id} ${act}]`;
        is(m.over <= 0 && m.out === 0, `${tg} nothing outside the card (${m.over}, ${m.out})`);
        is(m.inTank === 0, `${tg} the raft and its row stay inside the tank (${m.inTank})`);
        is(m.minBtn >= 44, `${tg} every control ≥ 44 px (${m.minBtn.toFixed(0)} ${m.small})`);
        is(m.lowest <= m.vh + 1, `${tg} every control on screen (${m.lowest.toFixed(0)} ≤ ${m.vh})`);
        is(m.font >= 14, `${tg} text ≥ 14 px (${m.font})`);
        if (SHOT) await page.screenshot({ path: path.join(SHOT, `gr-${loc}-${id}-${act}-${w}.png`) });
        if (act === 'play') await clickSel(page, '.gr-playbtn');
        if (act === 'words') await page.evaluate(() => { const t = window.GhostRaftsActivity; t.api.settings.cards = 'digits'; t.onSettings(); });
      }
      is(errs.length === 0, `[${loc} @${w}] no page errors (${errs.slice(0, 2).join(' | ')})`);
      await page.close();
    }
  }
  await browser.close(); server.close();
  console.log(`local-test-ghost-rafts: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
