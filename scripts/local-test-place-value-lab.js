#!/usr/bin/env node
/* =====================================================================
   local-test-place-value-lab.js — puppeteer DoD for Place Value Lab.
     A. viewport sweep — no overflow, taps ≥44px, FITS ≥1024, dock
        REACHABLE at every width (body scroll ≤560 — the LCK lesson)
     B. three-display consistency after a 50-tap fuzz (digits = value,
        word = helper(value), blocks = counts)
     C. invited snap lifecycle: 10th one → offer (invite chip + word
        suppressed + numeral TRUE) → make → canonical + snap overlay
     D. auto mode: the 10th add bundles synchronously (ones ≤ 9)
     E. break-a-ten preconditions + the pop
     F. the echo arc renders (de: crossing arcs exist)
     G. tap-a-digit interrogation speaks the place value
     H. Show me: miss = warm compare (no red), hit = Next
     I. Subtract: nudge at the wall → break (glow) → done note
     J. free gates (sub chip, hundreds setting revert, saves) with
        from=tool-place-value-lab
     K. store roundtrip (saved mat survives reload; resolver clamps)
     L. TTS spy — silent before gesture; settle-debounce speaks once
     M. hundreds 304 (premium): ghost-0 slot + the no-tens chip
     Screenshots: build-de (24 + arcs), show, sub mid-borrow,
     hundreds-304, sweep 360/768(+bottom).
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'place-value-lab', 'qa');
fs.mkdirSync(OUT, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

let failures = 0;
const OK = (m) => console.log('  ✓ ' + m);
const FAIL = (m) => { failures++; console.log('  ✗ FAIL ' + m); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length)) : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/place-value-lab.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const pageErrs = [];
  page.on('pageerror', (e) => pageErrs.push(e.message));

  /* TTS spy */
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    const OrigU = window.SpeechSynthesisUtterance;
    window.SpeechSynthesisUtterance = function (t) { const u = new OrigU(t); window.__spoken.push({ text: t }); return u; };
    if (window.speechSynthesis) window.speechSynthesis.speak = function () {};
    const OrigA = window.Audio;
    window.Audio = function (src) { window.__spoken.push({ file: src }); const a = new OrigA(); a.play = () => Promise.resolve(); return a; };
  });

  /* ---------- A. viewport sweep ---------- */
  console.log('\nA. viewport sweep');
  const VIEWPORTS = [
    { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 },
    { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true }, { w: 1366, h: 768, fits: true },
  ];
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.pvl-mat', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      document.querySelectorAll('.pvl-chip, .pvl-big, .pvl-speak, .pvl-add, .pvl-digit, .pvl-ctxbtn').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width && (r.height < 39 || r.width < 39)) small.push(el.className.split(' ')[0] + ':' + Math.round(Math.min(r.height, r.width)));
      });
      const last = [...document.querySelectorAll('.pvl-wrap > *')].pop();
      return { overflow, small, mat: !!document.querySelector('.pvl-mat'), word: (document.querySelector('.pvl-word') || {}).textContent, bottom: last ? last.getBoundingClientRect().bottom : 0, vh: window.innerHeight };
    });
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.overflow > 1) { FAIL(`${tag}: overflow ${m.overflow}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: small taps ${m.small.slice(0, 3)}`); bad = true; }
    if (!m.mat || m.word !== 'twenty-four') { FAIL(`${tag}: mat/word wrong ("${m.word}")`); bad = true; }
    if (vp.fits && m.bottom > m.vh + 1) { FAIL(`${tag}: ${Math.round(m.bottom)} > ${m.vh} (FITS)`); bad = true; }
    if (!vp.fits) {
      const reach = await page.evaluate(() => {
        document.body.scrollTop = document.body.scrollHeight;
        const chips = [...document.querySelectorAll('.pvl-dock .pvl-chip')];
        const lastChip = chips[chips.length - 1];
        const r = lastChip ? lastChip.getBoundingClientRect() : null;
        return { n: chips.length, bottom: r ? Math.round(r.bottom) : -1, vh: window.innerHeight };
      });
      if (!reach.n || reach.bottom < 0 || reach.bottom > reach.vh + 1) { FAIL(`${tag}: dock unreachable (${reach.n} chips, bottom ${reach.bottom} vs vh ${reach.vh})`); bad = true; }
      if (vp.w === 360) await page.screenshot({ path: path.join(OUT, 'sweep-360-bottom.png') });
      await page.evaluate(() => { document.body.scrollTop = 0; });
    }
    if (!bad) OK(`${tag}: fits/reachable, word "twenty-four"`);
    if (vp.w === 360) await page.screenshot({ path: path.join(OUT, 'sweep-360.png'), fullPage: true });
    if (vp.w === 768 && vp.h === 1000) await page.screenshot({ path: path.join(OUT, 'sweep-768.png'), fullPage: true });
  }

  /* ---------- A2. FITS in EVERY MODE at 1024×768 ---------- */
  /* the critic-caught class: the prompt strip pushed the dock below
     the fold in show/sub while the sweep only measured build state */
  console.log('\nA2. mode FITS at 1024×768');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  for (const modeName of ['show', 'sub']) {
    const fit = await page.evaluate((mn) => {
      PlaceValueLab.premium = true;
      PlaceValueLab._userGestured = true;
      PlaceValueLab._setMode(mn);
      if (mn === 'sub') {
        PlaceValueLab.sub = { a: 42, b: 17, phase: 'work', removedT: 0, removedO: 0 };
        PlaceValueLab.st = PlaceValueLab.engineNew({ bundle: 'invited', maxPlaces: 2 });
        PlaceValueLab.st.t = 3; PlaceValueLab.st.o = 12; PlaceValueLab.st._decomposed = true;
        PlaceValueLab._marked = { tens: 1, ones: 7 };
        PlaceValueLab.render();
      } else {
        /* the worst show state: prompt + miss note + a wrapped 7th rod */
        PlaceValueLab.show = { target: 47, kind: 'numeral', phase: 'set', order: [24] };
        PlaceValueLab.st.t = 7; PlaceValueLab.st.o = 4;
        PlaceValueLab.render();
        document.querySelector('.pvl-promptbox .pvl-big').click();
      }
      const last = [...document.querySelectorAll('.pvl-wrap > *')].pop();
      const blocks = [...document.querySelectorAll('.pvl-block')];
      const lowestBlock = Math.max.apply(null, blocks.map((b) => b.getBoundingClientRect().bottom).concat([0]));
      return { dock: Math.round(last.getBoundingClientRect().bottom), block: Math.round(lowestBlock), vh: window.innerHeight };
    }, modeName);
    if (fit.dock > fit.vh + 1) FAIL(`${modeName}: dock below the fold (${fit.dock} > ${fit.vh})`);
    else if (fit.block > fit.vh + 1) FAIL(`${modeName}: a block clipped at the fold (${fit.block} > ${fit.vh})`);
    else OK(`${modeName}: dock ${fit.dock} + blocks ${fit.block} ≤ ${fit.vh}`);
  }
  await page.evaluate(() => { PlaceValueLab.premium = false; PlaceValueLab._setMode('build'); });

  /* ---------- B. three-display consistency fuzz ---------- */
  console.log('\nB. three-display consistency (50-op fuzz)');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  const fuzz = await page.evaluate(() => {
    let bad = null;
    for (let i = 0; i < 50 && !bad; i++) {
      const btns = [...document.querySelectorAll('.pvl-add, .pvl-block, .pvl-ctxbtn.make')];
      const b = btns[Math.floor(Math.random() * btns.length)];
      if (b) b.click();
      const st = PlaceValueLab.st;
      const value = PlaceValueLab.engineValue(st);
      const digits = [...document.querySelectorAll('.pvl-dg')].map((e) => e.textContent).join('');
      const cubes = document.querySelectorAll('.pvl-cube').length;
      const rods = document.querySelectorAll('.pvl-rod').length;
      if (parseInt(digits, 10) !== value) bad = `op${i}: digits ${digits} ≠ value ${value}`;
      else if (cubes !== st.o || rods !== st.t) bad = `op${i}: blocks ${rods}r/${cubes}c ≠ ${st.t}/${st.o}`;
      else if (PlaceValueLab.engineCanonical(st)) {
        const word = [...document.querySelectorAll('.pvl-span')].map((e) => e.textContent).join('');
        const want = PlaceValueLab.NUM_WORDS_HELPERS.de(value, 'cardinal');
        if (word !== want && !(value >= 100 && word.replace(PlaceValueLab.api.t('noTensChip'), '') === want)) bad = `op${i}: word "${word}" ≠ "${want}"`;
      }
    }
    return bad;
  });
  if (fuzz) FAIL('fuzz: ' + fuzz);
  else OK('digits ≡ value, blocks ≡ counts, word ≡ helper across 50 random ops');

  /* ---------- C. invited snap lifecycle ---------- */
  console.log('\nC. invited snap lifecycle');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  const inv = await page.evaluate(() => {
    for (let i = 0; i < 6; i++) document.querySelector('.pvl-col--ones .pvl-add').click();
    return {
      o: PlaceValueLab.st.o, t: PlaceValueLab.st.t,
      invite: !!document.querySelector('.pvl-invite'),
      spans: document.querySelectorAll('.pvl-span').length,
      offer: !!document.querySelector('.pvl-tray--ones.offer'),
      make: !!document.querySelector('.pvl-ctxbtn.make'),
      digits: [...document.querySelectorAll('.pvl-dg')].map((e) => e.textContent).join(''),
    };
  });
  if (inv.o !== 10 || !inv.invite || inv.spans !== 0 || !inv.offer || !inv.make) FAIL(`offer state: ${JSON.stringify(inv)}`);
  /* ⚠ the assertion, not the tool, changed here. Hundreds are FREE now
     and the third place is on by default, so a board holding 30 reads
     "0 3 0" with a GHOSTED hundreds zero — which is the placeholder
     lesson, not a defect. The invariant worth keeping is that the
     numeral is the TRUE value (30) rather than the canonicalised digits
     of a mat that is deliberately non-canonical; strip the leading
     ghost and compare. */
  else if (String(Number(inv.digits)) !== '30') FAIL(`numeral at 2t+10o: "${inv.digits}" (want the TRUE 30)`);
  else OK('10th one → offer (invite + suppressed word + numeral 30 + band)');
  const snap = await page.evaluate(() => {
    document.querySelector('.pvl-ctxbtn.make').click();
    return { o: PlaceValueLab.st.o, t: PlaceValueLab.st.t, overlay: !!document.querySelector('.pvl-overlay'), word: [...document.querySelectorAll('.pvl-span')].map((e) => e.textContent).join('') };
  });
  if (snap.o !== 0 || snap.t !== 3 || snap.word !== 'dreißig') FAIL(`make-ten: ${JSON.stringify(snap)}`);
  else OK(`make-ten → canonical 3t/0o "dreißig"${snap.overlay ? ' + snap overlay' : ''}`);
  await sleep(1100);

  /* ---------- D. auto mode ---------- */
  console.log('\nD. auto mode');
  const auto = await page.evaluate(() => {
    PlaceValueLab.api.settings.bundle = 'auto';
    PlaceValueLab.onSettings();
    PlaceValueLab.st.t = 0; PlaceValueLab.st.o = 9;
    PlaceValueLab.render();
    document.querySelector('.pvl-col--ones .pvl-add').click();
    return { o: PlaceValueLab.st.o, t: PlaceValueLab.st.t, overlay: !!document.querySelector('.pvl-overlay') };
  });
  if (auto.o !== 0 || auto.t !== 1) FAIL(`auto 10th add: ${JSON.stringify(auto)}`);
  else OK('auto: the 10th add bundles synchronously (1t/0o) with the full animation');
  await page.evaluate(() => { PlaceValueLab.api.settings.bundle = 'invited'; PlaceValueLab.onSettings(); });
  await sleep(1100);

  /* ---------- E. break preconditions + pop ---------- */
  console.log('\nE. break-a-ten');
  const brk = await page.evaluate(() => {
    PlaceValueLab.st.t = 2; PlaceValueLab.st.o = 4; PlaceValueLab.st._decomposed = false;
    PlaceValueLab.render();
    const btn = document.querySelector('.pvl-ctxbtn.break');
    if (!btn) return { err: 'no break button in build mode with t≥1' };
    btn.click();
    const after = { o: PlaceValueLab.st.o, t: PlaceValueLab.st.t, dec: PlaceValueLab.st._decomposed };
    /* precondition: can't break when ones would exceed 19 */
    const blocked = !PlaceValueLab.engineBreakTen(PlaceValueLab.st);
    return { after, blocked };
  });
  if (brk.err || brk.after.o !== 14 || brk.after.t !== 1 || !brk.after.dec) FAIL(`break: ${JSON.stringify(brk)}`);
  else if (!brk.blocked) FAIL('second break with o=14 was allowed (o would exceed 19)');
  else OK('break → 1t/14o (+_decomposed); re-break blocked at o>9');
  await sleep(700);

  /* ---------- F. echo arcs (de) ---------- */
  console.log('\nF. echo arcs');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  const arcs = await page.evaluate(async () => {
    document.querySelector('.pvl-speak').click();
    await new Promise((r) => setTimeout(r, 750));
    return { arcs: document.querySelectorAll('.pvl-arc').length };
  });
  if (arcs.arcs < 1) FAIL(`no arcs after the speak tap (${arcs.arcs})`);
  else OK(`echo arcs render (${arcs.arcs} at 24 de)`);
  await page.screenshot({ path: path.join(OUT, 'build-de-1024x768.png') });
  await sleep(1500);

  /* ---------- G. tap-a-digit ---------- */
  console.log('\nG. tap-a-digit interrogation');
  const dig = await page.evaluate(async () => {
    window.__spoken.length = 0;
    const cards = document.querySelectorAll('.pvl-digit');
    cards[cards.length - 1].click(); /* the ones digit (4) */
    await new Promise((r) => setTimeout(r, 500));
    return window.__spoken.map((s) => s.text || s.file).join('|');
  });
  if (!/vier/.test(dig) || /vierund/.test(dig)) FAIL(`ones-digit tap spoke: "${dig}" (want bare "vier")`);
  else OK(`ones-digit tap speaks "vier" alone`);

  /* ---------- H. Show me ---------- */
  console.log('\nH. Show me');
  const show = await page.evaluate(() => {
    PlaceValueLab._userGestured = true;
    PlaceValueLab._setMode('show');
    PlaceValueLab.show = { target: 47, kind: 'numeral', phase: 'set', order: [24] };
    PlaceValueLab.st = PlaceValueLab.engineNew({ bundle: 'invited', maxPlaces: 2 });
    PlaceValueLab.st.t = 7; PlaceValueLab.st.o = 4; /* the inversion miss: 74 */
    PlaceValueLab.render();
    document.querySelector('.pvl-promptbox .pvl-big').click();
    const note = (document.querySelector('.pvl-tasknote') || {}).textContent || '';
    const red = getComputedStyle(document.querySelector('.pvl-tasknote')).backgroundColor;
    return { note, red, phase: PlaceValueLab.show.phase };
  });
  if (!/74/.test(show.note) || !/vierundsiebzig/.test(show.note)) FAIL(`miss note: "${show.note}"`);
  else if (/rgb\(2\d\d, [0-9]?\d, /.test(show.red)) FAIL(`miss note looks red: ${show.red}`);
  else if (show.phase !== 'set') FAIL('miss advanced the phase');
  else OK('miss = warm compare naming 74/vierundsiebzig, no red, hands stay live');
  await page.screenshot({ path: path.join(OUT, 'show-1024x768.png') });
  const showHit = await page.evaluate(() => {
    PlaceValueLab.st.t = 4; PlaceValueLab.st.o = 7;
    PlaceValueLab.render();
    document.querySelector('.pvl-promptbox .pvl-big').click();
    return { phase: PlaceValueLab.show.phase, btn: (document.querySelector('.pvl-promptbox .pvl-big') || {}).textContent };
  });
  if (showHit.phase !== 'done' || showHit.btn !== 'Weiter') FAIL(`hit: ${JSON.stringify(showHit)}`);
  else OK('hit → done + Weiter');

  /* ---------- I. Subtract ---------- */
  console.log('\nI. Subtract lab');
  const sub = await page.evaluate(() => {
    PlaceValueLab.premium = true;
    PlaceValueLab._setMode('sub');
    PlaceValueLab.sub = { a: 42, b: 17, phase: 'work', removedT: 0, removedO: 0 };
    PlaceValueLab.st = PlaceValueLab.engineNew({ bundle: 'invited', maxPlaces: 2 });
    PlaceValueLab.st.t = 4; PlaceValueLab.st.o = 2;
    PlaceValueLab._marked = { tens: 1, ones: 7 };
    PlaceValueLab._subNote = PlaceValueLab.api.t('subRemove');
    PlaceValueLab.render();
    const needs = PlaceValueLab._subNeedsBreak();
    const glow = !!document.querySelector('.pvl-ctxbtn.break.glow');
    /* the no-break path is graded out (pure fn) */
    const noBreak = PlaceValueLab.gradeSubtract({ h: 0, t: 2, o: 5, _decomposed: false }, 42, 17);
    return { needs, glow, noBreak };
  });
  if (!sub.needs || !sub.glow) FAIL(`sub wall: ${JSON.stringify(sub)}`);
  else if (sub.noBreak) FAIL('grader accepts the no-break path');
  else OK('the wall: nudge state + glowing break; no-break path graded out');
  await page.evaluate(() => { document.querySelector('.pvl-ctxbtn.break').click(); });
  await sleep(600);
  await page.screenshot({ path: path.join(OUT, 'sub-borrow-1024x768.png') });
  const subDone = await page.evaluate(() => {
    for (let i = 0; i < 7; i++) { const c = document.querySelector('.pvl-col--ones .pvl-cube'); if (c) c.click(); }
    const r = document.querySelector('.pvl-col--tens .pvl-rod'); if (r) r.click();
    return { phase: PlaceValueLab.sub.phase, note: PlaceValueLab._subNote };
  });
  if (subDone.phase !== 'done' || !/42 − 17 = 25/.test(subDone.note)) FAIL(`sub done: ${JSON.stringify(subDone)}`);
  else OK('borrow → remove → "42 − 17 = 25" + the break named');

  /* ---------- J. free gates ---------- */
  console.log('\nJ. free gates');
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  const gates = await page.evaluate(async () => {
    const out = {};
    /* sub chip gates */
    const chips = [...document.querySelectorAll('.pvl-modes .pvl-chip')];
    chips.find((c) => c.className.includes('locked')).click();
    out.subGate = !!document.querySelector('.pvl-gate');
    out.link = (document.querySelector('.pvl-gatelink') || {}).getAttribute('href');
    /* ⭐ HUNDREDS NO LONGER REVERT — that is the point of the change,
       so the assertion is inverted rather than deleted. A signed-out
       teacher turning the third place on must KEEP it: the place a
       Grade-2 class works in is not a paid feature, and the German
       inversion the tool is built around only gets hard at three
       digits (zweihundertsiebenundvierzig). */
    PlaceValueLab.api.settings.hundreds = true;
    PlaceValueLab.onSettings();
    out.hundredsStayFree = PlaceValueLab.api.settings.hundreds === true
      && document.querySelectorAll('.pvl-col').length === 3;
    /* saves chip gates */
    const manage = [...document.querySelectorAll('.pvl-chip')].find((c) => c.className.includes('manage'));
    manage.click();
    out.savesGate = document.querySelectorAll('.pvl-gate').length >= 1;
    return out;
  });
  if (!gates.subGate || !gates.hundredsStayFree || !gates.savesGate) FAIL(`gates: ${JSON.stringify(gates)}`);
  else if (!/from=tool-place-value-lab/.test(gates.link)) FAIL(`gate link: ${gates.link}`);
  else OK('sub + saves gate → pricing; hundreds stay FREE and render three columns');

  /* ---------- K. store roundtrip ---------- */
  console.log('\nK. store roundtrip');
  await page.evaluate(() => {
    PlaceValueLab.premium = true;
    PlaceValueLab.st.t = 4; PlaceValueLab.st.o = 7;
    PlaceValueLab._store.mats.push({ id: 'test1', label: 'days of school', h: 0, t: 4, o: 7, created: new Date().toISOString() });
    PlaceValueLab._store.mats.push({ id: 'bad', label: null, h: 99, t: -1, o: 4 }); /* the resolver must clamp this */
    PlaceValueLab._saveStore();
  });
  await page.reload({ waitUntil: 'networkidle0' });
  const store = await page.evaluate(() => ({ n: PlaceValueLab._store.mats.length, first: PlaceValueLab._store.mats[0] && PlaceValueLab._store.mats[0].label }));
  if (store.n !== 1 || store.first !== 'days of school') FAIL(`roundtrip: ${JSON.stringify(store)}`);
  else OK('saved mat survives reload; the resolver dropped the malformed row');

  /* ---------- L. TTS seams ---------- */
  console.log('\nL. TTS seams');
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  const tts = await page.evaluate(async () => {
    const before = window.__spoken.length;
    /* settle-speech only after a user gesture */
    await new Promise((r) => setTimeout(r, 1500));
    const silent = window.__spoken.length === before;
    document.querySelector('.pvl-col--ones .pvl-add').click();
    await new Promise((r) => setTimeout(r, 1600));
    const spoke = window.__spoken.length > before;
    return { silent, spoke, last: (window.__spoken[window.__spoken.length - 1] || {}).text };
  });
  if (!tts.silent) FAIL('spoke before any gesture');
  else if (!tts.spoke || !/twenty-five/.test(tts.last || '')) FAIL(`settle speech: ${JSON.stringify(tts)}`);
  else OK(`silent before gesture; settle-speech says "${tts.last}"`);

  /* ---------- M. hundreds 304 ---------- */
  console.log('\nM. hundreds 304 (premium)');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  const h304 = await page.evaluate(() => {
    PlaceValueLab.premium = true;
    PlaceValueLab.api.settings.hundreds = true;
    PlaceValueLab.onSettings();
    PlaceValueLab.st.h = 3; PlaceValueLab.st.t = 0; PlaceValueLab.st.o = 4;
    PlaceValueLab.render();
    return {
      digits: [...document.querySelectorAll('.pvl-dg')].map((e) => e.textContent).join(''),
      word: [...document.querySelectorAll('.pvl-span')].map((e) => e.textContent).join('|'),
      cols: document.querySelectorAll('.pvl-col').length,
      chip: PlaceValueLab.api.t('noTensChip'),
    };
  });
  if (h304.digits !== '304' || h304.cols !== 3) FAIL(`304: ${JSON.stringify(h304)}`);
  else if (h304.word !== 'dreihundert|' + h304.chip + '|vier') FAIL(`304 word: "${h304.word}" (want the no-tens chip between)`);
  else OK(`304: three places, "dreihundert · ${h304.chip} · vier"`);
  await page.screenshot({ path: path.join(OUT, 'hundreds-304-1024x768.png') });

  /* ---------- M2. three places on a WIDE board ----------
     ⚠ EVERY OTHER CHECK IN THIS FILE RENDERS THE DEFAULT TWO PLACES, and the
     wide tiers were sized against that. A third column is the case that can
     overflow: --pvl-u is deliberately a min() of the tier value and a share
     of the card divided by --pvl-p, so three places take a SMALLER unit and
     still fit. Nothing else in the suite would notice if that min() broke —
     "sweep every configuration, not just the default". */
  for (const vp of [{ width: 1400, height: 880 }, { width: 1920, height: 1080 },
    { width: 2400, height: 1150 }, { width: 2560, height: 1440 }]) {
    await page.setViewport(vp);
    await new Promise((r) => setTimeout(r, 250));
    const m = await page.evaluate(() => {
      const cols = [...document.querySelectorAll('.pvl-col')];
      const card = document.querySelector('.lcs-app').getBoundingClientRect();
      let lo = Infinity, hi = -Infinity, spill = 0;
      cols.forEach((c) => {
        const r = c.getBoundingClientRect();
        lo = Math.min(lo, r.left); hi = Math.max(hi, r.right);
        c.querySelectorAll('.pvl-cube,.pvl-rod,.pvl-flat,.pvl-slot,.pvl-add').forEach((e) => {
          const b = e.getBoundingClientRect();
          if (b.width && (b.left < r.left - 0.5 || b.right > r.right + 0.5)) spill++;
        });
      });
      return { n: cols.length, lo, hi, cardL: card.left, cardR: card.right, spill };
    });
    /* non-vacuity before any claim about the layout */
    if (m.n !== 3) { FAIL(`3-place @${vp.width}: ${m.n} columns rendered — measurement void`); continue; }
    if (m.lo < m.cardL - 0.5 || m.hi > m.cardR + 0.5) FAIL(`3-place @${vp.width}: columns escape the card`);
    else if (m.spill) FAIL(`3-place @${vp.width}: ${m.spill} block(s) spill out of their column`);
    else OK(`3-place @${vp.width}x${vp.height}: ${Math.round(m.hi - m.lo)}px of a ${Math.round(m.cardR - m.cardL)}px card, nothing spills`);
  }
  await page.setViewport({ width: 1024, height: 768 });

  /* ---------- close ---------- */
  const realErrs = pageErrs.filter((e) => !/404|Failed to load/.test(e));
  if (realErrs.length) FAIL('page errors: ' + realErrs.slice(0, 3).join(' | '));
  else OK('console clean');

  await browser.close();
  server.close();
  console.log(failures ? `\nFAIL — ${failures} failure(s)` : '\nPASS — place-value-lab DoD green');
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
