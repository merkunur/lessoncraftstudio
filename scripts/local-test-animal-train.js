#!/usr/bin/env node
/* =====================================================================
   local-test-animal-train.js — the interaction gate for ACTIVITY #10,
   "Count to 10 with Animals" (K.CC.B.4), the Animal Train.
   Real mouse clicks on platform animals (each hops into the NEXT seat),
   the flashing seat number that fades, Go with one too many (named, the
   train numbers its passengers), a second wrong Go (the extra passenger is
   marked), a tap on the train (one gets off), Go right → the next stop's
   ticket (one more / one fewer) → one change → Go → the shell celebrates.
   Every round of both ranges, both counting-number settings, every locale
   asked for, the width sweep. Seat contents are read off the RENDERED
   seats (pictures present), not the state.
   Usage: node scripts/local-test-animal-train.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-frame.count-to-10.make-n.animals';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'animal-train-activity.js')).strings;
const CORE = require(path.join(MINI, 'animal-train-core.js'));
const PICS = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'animals.json'), 'utf8'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
/* the screen-reader name after a colon: lower case, except German nouns */
const label = (noun, loc) => { const s = PICS.nouns[noun].labels[loc][0]; return loc === 'de' ? s : s.toLocaleLowerCase(loc); };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
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
  async function open(loc, w) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() === 404 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push('404 ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/animal-train-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.AnimalTrainActivity && window.AnimalTrainActivity.st && window.AnimalTrainActivity._theme, { timeout: 8000 });
    await page.evaluate(() => { const t = window.AnimalTrainActivity; t.FLASH_MS = 700; t.CHUG_MS = 150; t.CHECK_MS = 120; t.FLY_MS = 60; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.AnimalTrainActivity.api.settings[k] = v; window.AnimalTrainActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.AnimalTrainActivity.st; return { id: s.id, n: s.n, stop: s.stop, noun: s.noun, ticket: s.ticket, leg: s.leg, aboard: s.seats.length, misses: s.misses, done: s.done }; });
  /* the rendered train */
  const view = (page) => page.evaluate(() => {
    const seats = [...document.querySelectorAll('.tr-seat')];
    const slots = [...document.querySelectorAll('.tr-slot')].filter(s => !s.hidden);
    const pic = (el) => { const im = el && el.querySelector('img'); if (!im) return null; const r = im.getBoundingClientRect(); return { src: im.getAttribute('src'), w: r.width, h: r.height, nat: im.naturalWidth, alt: im.alt }; };
    const seated = seats.map(s => { const b = s.querySelector('.tr-pass'); return !b.hidden && !!b.querySelector('img'); });
    const nums = seats.map(s => { const n = s.querySelector('.tr-num'); return n.classList.contains('is-on') ? n.textContent : ''; });
    const wrap = document.querySelector('.tr-wrap');
    const note = document.querySelector('.tr-note');
    return { mode: wrap.classList.contains('is-row') ? 'row' : 'stack', ticket: document.querySelector('.tr-ticket-num').textContent, ticketAria: document.querySelector('.tr-ticket').getAttribute('aria-label'),
      seated, nums, flash: seats.map(s => s.querySelector('.tr-num').classList.contains('is-flash')),
      extra: seats.map(s => s.classList.contains('is-extra')), need: seats.map(s => s.classList.contains('is-need')), gold: seats.map(s => s.querySelector('.tr-num').classList.contains('is-gold')),
      waiting: slots.map(s => !s.querySelector('.tr-animal').hidden), seatPic: pic(seats.find(s => !s.querySelector('.tr-pass').hidden)), platPic: pic(slots.find(s => !s.querySelector('.tr-animal').hidden)),
      boardAria: (slots.find(s => !s.querySelector('.tr-animal').hidden) || { querySelector: () => ({ getAttribute: () => '' }) }).querySelector('.tr-animal').getAttribute('aria-label'),
      note1: note.hidden ? '' : document.querySelector('.tr-note-1').textContent, note2: note.hidden ? '' : document.querySelector('.tr-note-2').textContent,
      go: document.querySelector('.tr-go').textContent, goOn: !document.querySelector('.tr-go').disabled,
      checkShown: getComputedStyle(document.querySelector('.lcs-activity-check')).display !== 'none' };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no element ' + sel); return c; };
  async function clickSel(page, sel) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(90); }
  /* a real click on the k-th animal still waiting (0-based among the waiting) */
  async function boardOne(page, k) {
    const idx = await page.evaluate((k) => { const slots = [...document.querySelectorAll('.tr-slot')]; const w = slots.map((s, i) => [s, i]).filter(([s]) => !s.hidden && !s.querySelector('.tr-animal').hidden); return w.length ? w[Math.min(k, w.length - 1)][1] : -1; }, k || 0);
    if (idx < 0) throw new Error('nobody waiting');
    await clickSel(page, `.tr-slot:nth-child(${idx + 1}) .tr-animal`);
  }
  async function offOne(page) { const s = await page.evaluate(() => { const seats = [...document.querySelectorAll('.tr-seat')]; let i = -1; seats.forEach((x, k) => { if (!x.querySelector('.tr-pass').hidden) i = k; }); return i; }); if (s < 0) throw new Error('nobody on board'); await clickSel(page, `.tr-seat:nth-child(${s + 1}) .tr-pass`); }
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.AnimalTrainActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(200); }
  const count = (arr) => arr.filter(Boolean).length;

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'tr');
      is((await page.evaluate(() => window.AnimalTrainActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ticket ${r.n}${r.stop ? ' ' + r.stop : ''}]`;
        await forceRound(page, ri);
        let v = await view(page), st = await state(page);
        is(st.id === r.id && v.ticket === String(r.n) && v.ticketAria === interp(STR.ticketLabel[loc], { t: r.n }), `${tag} the ticket reads ${r.n}`);
        is(count(v.seated) === 0 && count(v.waiting) === r.wait, `${tag} the train empty, ${r.wait} animals waiting`);
        is(!!v.platPic && v.platPic.src === PICS.nouns[r.noun].src && v.platPic.nat > 0 && v.platPic.w >= 96 && v.platPic.alt === '', `${tag} library ${r.noun} on the platform ≥ 96 px (${v.platPic && v.platPic.w.toFixed(0)})`);
        is(v.boardAria === interp(STR.boardLabel[loc], { animal: label(r.noun, loc) }), `${tag} the waiting animal is named "${v.boardAria}"`);
        is(v.go === STR.go[loc] && v.goOn && !v.checkShown, `${tag} Go reads "${v.go}"; the shell Check is hidden`);
        /* put one too many on, one by one, from all over the platform */
        const over = Math.min(r.n + 1, CORE.SEATS);
        for (let k = 0; k < over; k++) {
          await boardOne(page, (k * 5) % 3);
          if (k === 0) { const f = await view(page); is(f.nums[0] === '1' && f.flash[0] && count(f.seated) === 1, `${tag} the first animal hops into seat 1 and shows 1`); }
        }
        v = await view(page);
        is(count(v.seated) === over && v.seated.slice(0, over).every(Boolean), `${tag} ${over} on board, the seats filled in order`);
        is(!!v.seatPic && v.seatPic.w >= 96 && v.seatPic.w >= v.platPic.w - 0.5, `${tag} the passengers (${v.seatPic && v.seatPic.w.toFixed(0)}) are as big as the waiting animals or bigger`);
        await wait(850);
        v = await view(page);
        is(v.nums.every(x => x === ''), `${tag} the boarding number fades — the child keeps the count`);
        if (over > r.n) {
          await clickSel(page, '.tr-go'); v = await view(page); st = await state(page);
          is(v.note1 === interp(STR.noteCompare[loc], { a: over, t: r.n }) && v.note2 === STR.noteTooMany[loc] && st.misses === 1, `${tag} Go with ${over}: "${v.note1} ${v.note2}"`);
          is(v.nums.slice(0, over).join() === Array.from({ length: over }, (_, i) => String(i + 1)).join() && count(v.extra) === 0, `${tag} the train numbers its passengers 1…${over}`);
          await clickSel(page, '.tr-go'); v = await view(page);
          is(v.extra.map((x, i) => x ? i : -1).filter(i => i >= 0).join() === String(r.n) && count(v.seated) === over, `${tag} second wrong Go: seat ${r.n + 1} is marked extra; nobody moved`);
          await offOne(page); v = await view(page);
          is(count(v.seated) === r.n && v.note1 === '' && count(v.waiting) === r.wait - r.n, `${tag} a tap on the train lets one off; the note clears`);
        } else {
          /* the full train (10): one fewer first */
          await offOne(page); await clickSel(page, '.tr-go'); v = await view(page);
          is(v.note1 === interp(STR.noteCompare[loc], { a: r.n - 1, t: r.n }) && v.note2 === STR.noteTooFew[loc], `${tag} Go with ${r.n - 1}: "${v.note1} ${v.note2}"`);
          await clickSel(page, '.tr-go'); v = await view(page);
          is(v.need.map((x, i) => x ? i : -1).filter(i => i >= 0).join() === String(r.n - 1), `${tag} second wrong Go: the empty seat ${r.n} is marked`);
          await boardOne(page, 0);
        }
        await clickSel(page, '.tr-go');
        if (r.stop) {
          const t2 = CORE.secondTicket(r);
          await wait(260); v = await view(page); st = await state(page);
          is(st.leg === 1 && v.ticket === String(t2) && v.note1 === interp(STR.noteNewTicket[loc], { t: t2 }) && v.nums.every(x => x === ''), `${tag} next stop: the ticket reads ${t2}, "${v.note1}", no help showing`);
          if (r.stop === 'more') await boardOne(page, 0); else await offOne(page);
          await clickSel(page, '.tr-go'); await wait(260);
          v = await view(page);
          is(v.note1 === interp(STR[r.stop === 'more' ? 'noteOneMore' : 'noteOneFewer'][loc], { a: r.n, b: t2 }), `${tag} "${v.note1}"`);
        } else await wait(260);
        v = await view(page); st = await state(page);
        const fin = st.ticket;
        is(st.done && await celebrated(page) && (await bubble(page)) === STR.celebrate[loc], `${tag} done → the shell celebrates ("${await bubble(page)}")`);
        is(v.nums.slice(0, fin).join() === Array.from({ length: fin }, (_, i) => String(i + 1)).join() && v.gold[fin - 1] && count(v.gold) === 1, `${tag} everyone numbered, the last passenger gold with ${fin}`);
        is(!v.goOn, `${tag} Go rests once the round is done`);
      }
    }
    /* numbers said aloud: no number appears while boarding */
    await setSetting(page, 'range', 'to10'); await setSetting(page, 'numbers', 'hidden');
    await forceRound(page, 2);
    await boardOne(page, 0); await boardOne(page, 0);
    let v = await view(page);
    is(count(v.seated) === 2 && v.nums.every(x => x === ''), `[${loc}] numbers said aloud: no numbers while boarding`);
    await setSetting(page, 'numbers', 'shown');
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 1); for (let k = 0; k < 5; k++) await boardOne(page, k); await clickSel(page, '.tr-go'); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  /* width sweep: ticket 7 → one more, with a wrong Go, at every width */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    await forceRound(page, 1);
    for (let k = 0; k < 5; k++) await boardOne(page, k);
    await wait(850);
    let v = await view(page);
    const m = await page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(), wrap = document.querySelector('.tr-wrap').getBoundingClientRect(), car = document.querySelector('.tr-car').getBoundingClientRect(), plat = document.querySelector('.tr-plat').getBoundingClientRect(), go = document.querySelector('.tr-go').getBoundingClientRect(), tk = document.querySelector('.tr-ticket').getBoundingClientRect(), anim = [...document.querySelectorAll('.tr-animal')].filter(b => !b.hidden).map(b => b.getBoundingClientRect()); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: [car, plat, go, tk].every(r => r.left >= card.left - 1 && r.right <= card.right + 1), fill: (Math.max(car.right, plat.right) - Math.min(car.left, plat.left)) / wrap.width, goH: go.height, goW: go.width, tapMin: Math.min(...anim.map(r => Math.min(r.width, r.height))), carW: car.width, seat: document.querySelector('.tr-seat').getBoundingClientRect().width, topOverlap: tk.right > go.left - 4 && tk.bottom > go.top && tk.top < go.bottom }; });
    is(m.overflow <= 2 && m.inCard, `${tag} nothing spills out of the card`);
    is(m.goH >= 44 && m.tapMin >= 44, `${tag} Go (${m.goH.toFixed(0)}) and every animal (${m.tapMin.toFixed(0)}) ≥ 44 px to tap`);
    is(!m.topOverlap, `${tag} the ticket and Go do not touch`);
    is(v.mode === (w >= 600 ? 'row' : 'stack'), `${tag} ${v.mode} layout`);
    if (w >= 700) is(v.seatPic.w >= 96 && v.platPic.w >= 96 && m.fill >= 0.9, `${tag} pictures ≥ 96 px (seats ${v.seatPic.w.toFixed(0)}, platform ${v.platPic.w.toFixed(0)}), the train fills the width (${m.fill.toFixed(2)})`);
    else if (w >= 360) is(v.seatPic.w >= 60 && v.platPic.w >= 60, `${tag} pictures ≥ 60 px on a phone (${v.seatPic.w.toFixed(0)}/${v.platPic.w.toFixed(0)})`);
    await boardOne(page, 0); await boardOne(page, 0); await boardOne(page, 0);   /* 8 for 7 */
    await clickSel(page, '.tr-go');
    v = await view(page);
    is(v.note2 === STR.noteTooMany.en, `${tag} the note under the train`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await offOne(page); await clickSel(page, '.tr-go'); await wait(260); await boardOne(page, 0); await clickSel(page, '.tr-go'); await wait(260);
    is(await celebrated(page), `${tag} 7, then one more → 8 → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-animal-train: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
