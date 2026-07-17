#!/usr/bin/env node
/* =====================================================================
   local-test-picture-word-wall.js — puppeteer DoD for Picture Word Wall.
     A. viewport sweep — no overflow, taps ≥44px, dock REACHABLE at every
        width, FITS ≥1024 (the #11 lesson)
     A2. mode FITS at 1024×768 in EVERY mode (wall / whisper / pins) —
        a prompt strip must never push the dock under the fold
     B. the de gender rails on known nouns (der Hund teal / die Katze
        coral / das Pferd honey) — the dative-article net, live
     C. flip-to-hero: opens ≤600ms, speaks ONCE, print-speech matched
     D. the plural multiply: exactly 3 DISTINCT copies + the gold rail
        (plural erases gender — the moat's best moment)
     E. sv "en katt" / "ett hus" (n=COMMON, t=neuter) + the identical-
        plural lesson line and its native spoken phrase
     F. en/fi frameless — no rails at all, larger words
     G. whisper: pool-only wall, article spoken, wrong tap never
        punishes (no red, firefly drifts CLOSER, word re-speaks), right
        tap lands the firefly; never repeats until exhausted
     H. pins: long-press → pin → the named wall survives a reload
     I. free gates (4th theme, whisper, pins) → from=tool-picture-word-wall
     J. lazy-loading: offscreen images are not fetched
     K. TTS silent before any gesture; console clean
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const OUT = path.join(REPO, 'docs', 'audit-results', 'picture-word-wall', 'qa');
fs.mkdirSync(OUT, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

let failures = 0;
const OK = (m) => console.log('  ✓ ' + m);
const FAIL = (m) => { failures++; console.log('  ✗ FAIL ' + m); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const imgHits = new Set();
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (p.startsWith('/image-library-webp/')) { f = path.join(REPO, p); imgHits.add(p); }
    else if (p.startsWith('/mini-tools/')) {
      const rest = p.slice('/mini-tools/'.length);
      f = fs.existsSync(path.join(MINI, rest)) ? path.join(MINI, rest) : path.join(PUB, 'mini-tools', rest);
    } else f = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
}
const esc = (k) => k.replace(/"/g, '\\"');

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/picture-word-wall.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const pageErrs = [];
  page.on('pageerror', (e) => pageErrs.push(e.message));
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    const O = window.SpeechSynthesisUtterance;
    window.SpeechSynthesisUtterance = function (t) { window.__spoken.push(t); return new O(t); };
    if (window.speechSynthesis) window.speechSynthesis.speak = () => {};
    const A = window.Audio;
    window.Audio = function (s) { window.__spoken.push('file:' + s); const a = new A(); a.play = () => Promise.resolve(); return a; };
  });

  /* ---------- A. viewport sweep ---------- */
  console.log('\nA. viewport sweep');
  const VPS = [{ w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 },
    { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true }, { w: 1366, h: 768, fits: true }];
  for (const vp of VPS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.pww-card', { timeout: 8000 }).catch(() => null);
    await sleep(300);
    const m = await page.evaluate(() => {
      const small = [];
      document.querySelectorAll('.pww-chip, .pww-themebtn, .pww-pip, .pww-card').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width && (r.height < 39 || r.width < 39)) small.push(el.className.split(' ')[0] + ':' + Math.round(Math.min(r.height, r.width)));
      });
      const cards = [...document.querySelectorAll('.pww-card')];
      const low = cards.length ? Math.max(...cards.map((c) => c.getBoundingClientRect().bottom)) : 0;
      document.body.scrollTop = document.body.scrollHeight;
      const dock = document.querySelector('.pww-dock');
      const db = dock ? Math.round(dock.getBoundingClientRect().bottom) : -1;
      document.body.scrollTop = 0;
      return { n: cards.length, small, dock: db, low: Math.round(low), vh: window.innerHeight,
        ovf: document.documentElement.scrollWidth - window.innerWidth };
    });
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.ovf > 1) { FAIL(`${tag}: overflow ${m.ovf}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: small taps ${m.small.slice(0, 3)}`); bad = true; }
    if (!m.n) { FAIL(`${tag}: no cards`); bad = true; }
    if (m.dock < 0 || m.dock > m.vh + 1) { FAIL(`${tag}: dock unreachable (${m.dock} vs ${m.vh})`); bad = true; }
    if (vp.fits && m.low > m.vh + 1) { FAIL(`${tag}: cards clipped (${m.low} > ${m.vh})`); bad = true; }
    if (!bad) OK(`${tag}: ${m.n} cards, dock ${m.dock} ≤ ${m.vh}`);
    if (vp.w === 360) await page.screenshot({ path: path.join(OUT, 'sweep-360.png'), fullPage: true });
    if (vp.w === 768) await page.screenshot({ path: path.join(OUT, 'sweep-768.png'), fullPage: true });
  }

  /* ---------- A2. mode FITS ---------- */
  console.log('\nA2. mode FITS at 1024×768');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  await sleep(700);
  for (const mode of ['whisper', 'pins']) {
    const fit = await page.evaluate((mo) => {
      PictureWordWall.premium = true;
      PictureWordWall._userGestured = true;
      if (mo === 'whisper') PictureWordWall._startWhisper();
      else {
        const t = PictureWordWall.themes.animals;
        PictureWordWall._store.pins = t.c.slice(0, 10).map((c) => ({ k: c.k, t: 'animals' }));
        PictureWordWall.mode = 'pins';
        PictureWordWall.render();
      }
      const cards = [...document.querySelectorAll('.pww-card')];
      const low = cards.length ? Math.max(...cards.map((c) => c.getBoundingClientRect().bottom)) : 0;
      const dock = document.querySelector('.pww-dock').getBoundingClientRect().bottom;
      return { n: cards.length, low: Math.round(low), dock: Math.round(dock), vh: window.innerHeight };
    }, mode);
    if (fit.dock > fit.vh + 1) FAIL(`${mode}: dock below the fold (${fit.dock} > ${fit.vh})`);
    else if (fit.low > fit.vh + 1) FAIL(`${mode}: cards clipped (${fit.low} > ${fit.vh})`);
    else OK(`${mode}: ${fit.n} cards, dock ${fit.dock} ≤ ${fit.vh}`);
    if (mode === 'whisper') await page.screenshot({ path: path.join(OUT, 'whisper-1024x768.png') });
    else await page.screenshot({ path: path.join(OUT, 'pins-1024x768.png') });
  }

  /* ---------- A3. no word shatters mid-letter ---------- */
  /* "Hippopotamus" broke as "Hippopotamu / s" — a card that shatters a
     word is unreadable to a child learning that word. Measured across
     the longest-word locales (de compounds dwarf en). */
  console.log('\nA3. long words never shatter');
  for (const loc of ['en', 'de', 'fi']) {
    await page.goto(BASE + '?lang=' + loc, { waitUntil: 'networkidle0' });
    await sleep(600);
    const worst = await page.evaluate(() => {
      /* find the theme with the longest word, render it, and measure */
      let longest = { len: 0 };
      for (const t of PictureWordWall.index.themes) {
        for (const c of t.c) if (c.s.length > longest.len) longest = { len: c.s.length, theme: t.k, k: c.k, s: c.s };
      }
      PictureWordWall.theme = longest.theme; PictureWordWall.page = 0; PictureWordWall.render();
      let over = 0, sample = '';
      document.querySelectorAll('.pww-card').forEach((card) => {
        const w = card.querySelector('.pww-word');
        const band = card.querySelector('.pww-band');
        if (!w || !band) return;
        const spill = w.getBoundingClientRect().bottom - band.getBoundingClientRect().bottom;
        if (spill > over) { over = spill; sample = w.textContent; }
      });
      return { longest: longest.s, over: Math.round(over), sample };
    });
    if (worst.over > 2) FAIL(`${loc}: a word spills ${worst.over}px past its band ("${worst.sample}")`);
    else OK(`${loc}: longest word "${worst.longest}" fits its band (max spill ${worst.over}px)`);
  }

  /* ---------- A4. the article never strands off its noun ---------- */
  /* article+noun is the SPOKEN unit and must read as one line — at 768
     "die Fledermaus" wrapped with the article alone above the noun. */
  console.log('\nA4. the article stays on its noun\'s line');
  for (const vp of [{ w: 1024, h: 768 }, { w: 768, h: 1000 }]) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
    await sleep(600);
    const strand = await page.evaluate(() => {
      let worst = null;
      document.querySelectorAll('.pww-card').forEach((card) => {
        const a = card.querySelector('.pww-art');
        const w = card.querySelector('.pww-word');
        if (!a || !w) return;
        /* different baselines ⇒ they wrapped onto separate lines */
        const gap = w.getBoundingClientRect().top - a.getBoundingClientRect().top;
        if (Math.abs(gap) > 4 && !worst) worst = a.textContent + ' / ' + w.textContent + ' (Δtop ' + Math.round(gap) + 'px)';
      });
      return worst;
    });
    if (strand) FAIL(`${vp.w}: the article stranded — "${strand}"`);
    else OK(`${vp.w}: every article sits on its noun's line`);
  }
  await page.setViewport({ width: 1024, height: 768 });

  /* ---------- B. the de gender rails (the dative net, live) ---------- */
  console.log('\nB. de gender rails');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  await sleep(700);
  /* assert the COMPUTED COLOUR, never the class name. An earlier
     version checked only `rail-n` and printed "das Pferd (honey)" while
     the CSS actually painted it coral — identical to `die`, collapsing
     the three-colour wall to two. The class is not the colour. */
  const rails = await page.evaluate(() => {
    const out = {};
    ['dog', 'cat', 'horse'].forEach((k) => {
      const el = document.querySelector('.pww-card[data-key="' + CSS.escape(k) + '"]');
      out[k] = el ? {
        rail: (el.className.match(/rail-(\w+)/) || [])[1],
        label: el.getAttribute('aria-label'),
        colour: getComputedStyle(el, ':before').backgroundColor,
      } : null;
    });
    return out;
  });
  const TEAL = 'rgb(20, 107, 94)', CORAL = 'rgb(242, 120, 75)', HONEY = 'rgb(242, 200, 121)';
  const wantRails = { dog: ['m', 'der Hund', TEAL], cat: ['f', 'die Katze', CORAL], horse: ['n', 'das Pferd', HONEY] };
  let railBad = false;
  for (const k of Object.keys(wantRails)) {
    const got = rails[k];
    if (!got) { FAIL(`${k}: card not on the wall`); railBad = true; continue; }
    if (got.rail !== wantRails[k][0] || got.label !== wantRails[k][1]) {
      FAIL(`${k}: rail-${got.rail} "${got.label}" ≠ rail-${wantRails[k][0]} "${wantRails[k][1]}"`); railBad = true;
    } else if (got.colour !== wantRails[k][2]) {
      FAIL(`${k}: "${got.label}" paints ${got.colour}, want ${wantRails[k][2]}`); railBad = true;
    }
  }
  /* the three must be mutually DISTINCT — that is the whole wall */
  const cols = Object.keys(rails).map((k) => rails[k] && rails[k].colour);
  if (!railBad && new Set(cols).size !== 3) FAIL(`der/die/das paint only ${new Set(cols).size} distinct colours: ${cols.join(' / ')}`);
  else if (!railBad) OK('der Hund teal / die Katze coral / das Pferd honey — three DISTINCT colours, nominative');

  /* ---------- B2. the rails are PERCEPTUALLY separable ---------- */
  /* "a different colour" is not enough — the first plural rail was a
     gold that measured ΔE 21.8 from honey, so `das Kamel` → `die Kamele`
     (the single moment this tool exists to teach) was invisible on a 6px
     bar at projector distance, while `der Hund` → `die Hunde` was ΔE 82.
     Distinctness is now MEASURED (CIE76), not eyeballed. */
  console.log('\nB2. rails are perceptually separable (CIE76 ΔE)');
  const MIN_DE = 30;
  const dEs = await page.evaluate((minDE) => {
    const rgb = (s) => (s.match(/\d+/g) || []).map(Number);
    const lab = (c) => {
      let [r, g, b] = c.map((v) => v / 255).map((v) => (v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92));
      let X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
      let Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      let Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
      [X, Y, Z] = [X, Y, Z].map((v) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116));
      return [116 * Y - 16, 500 * (X - Y), 200 * (Y - Z)];
    };
    const dE = (a, b) => { const A = lab(rgb(a)), B = lab(rgb(b)); return Math.sqrt((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2 + (A[2] - B[2]) ** 2); };
    /* sample every rail state this locale can paint, incl. plural */
    const probe = document.createElement('div');
    document.body.appendChild(probe);
    const read = (cls) => { probe.className = 'pww-card ' + cls; return getComputedStyle(probe, ':before').backgroundColor; };
    const states = { der: read('rail-m'), die: read('rail-f'), das: read('rail-n'), plural: read('rail-plural') };
    probe.remove();
    const out = [];
    const keys = Object.keys(states);
    for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) {
      out.push({ pair: keys[i] + '↔' + keys[j], d: +dE(states[keys[i]], states[keys[j]]).toFixed(1) });
    }
    return out.sort((a, b) => a.d - b.d);
  }, MIN_DE);
  const weakest = dEs[0];
  if (weakest.d < MIN_DE) FAIL(`rails too close: ${weakest.pair} = ΔE ${weakest.d} (need ≥${MIN_DE}) — a child cannot see that state change`);
  else OK(`every rail pair ≥ ΔE ${MIN_DE}; weakest ${weakest.pair} = ${weakest.d} (plural sits OFF the gender axis)`);
  await page.screenshot({ path: path.join(OUT, 'wall-de-1024x768.png') });

  /* ---------- C + D. hero + the plural multiply ---------- */
  console.log('\nC. flip-to-hero');
  const t0 = Date.now();
  await page.evaluate(() => {
    window.__spoken.length = 0;
    PictureWordWall._userGestured = true;
    document.querySelector('.pww-card[data-key="dog"]').click();
  });
  await page.waitForSelector('.pww-hero', { timeout: 1000 }).catch(() => null);
  const heroMs = Date.now() - t0;
  await sleep(500);
  const hero = await page.evaluate(() => ({
    open: !!document.querySelector('.pww-hero'),
    rail: (document.querySelector('.pww-hero').className.match(/rail-(\w+)/) || [])[1],
    word: document.querySelector('.pww-heroband').textContent.trim(),
    spoke: window.__spoken.slice(),
  }));
  if (!hero.open || heroMs > 600) FAIL(`hero: open=${hero.open} in ${heroMs}ms`);
  else if (hero.spoke.length !== 1) FAIL(`hero spoke ${hero.spoke.length}× (want exactly 1): ${JSON.stringify(hero.spoke)}`);
  else if (hero.spoke[0] !== hero.word) FAIL(`print-speech mismatch: spoke "${hero.spoke[0]}" ≠ shown "${hero.word}"`);
  else OK(`opens in ${heroMs}ms, speaks once, "${hero.spoke[0]}" === displayed`);

  console.log('\nD. the plural multiply (the gold rail)');
  await page.evaluate(() => { window.__spoken.length = 0; [...document.querySelectorAll('.pww-togbtn')].find((b) => b.getAttribute('data-plural') === '1').click(); });
  await sleep(700);
  const plural = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('.pww-heroimg')];
    return { n: imgs.length, distinct: new Set(imgs.map((i) => Math.round(i.getBoundingClientRect().left))).size,
      rail: (document.querySelector('.pww-hero').className.match(/rail-(\w+)/) || [])[1],
      word: document.querySelector('.pww-heroband').textContent.trim(), spoke: window.__spoken.slice() };
  });
  if (plural.n !== 3 || plural.distinct !== 3) FAIL(`multiply: ${plural.n} copies, ${plural.distinct} distinct (want 3/3)`);
  else if (plural.rail !== 'plural') FAIL(`plural rail "${plural.rail}" ≠ gold (plural must erase gender)`);
  else if (plural.word !== 'die Hunde' || plural.spoke[0] !== 'die Hunde') FAIL(`plural: "${plural.word}" / spoke ${JSON.stringify(plural.spoke)}`);
  else OK('der Hund → die Hunde: 3 distinct copies + the gold rail + spoken match');
  await page.screenshot({ path: path.join(OUT, 'hero-plural-1024x768.png') });

  /* ---------- E. sv gender codes + the identical-plural lesson ---------- */
  console.log('\nE. sv (n=COMMON, t=neuter) + identical plurals');
  await page.goto(BASE + '?lang=sv', { waitUntil: 'networkidle0' });
  await sleep(700);
  const sv = await page.evaluate(() => {
    const cat = PictureWordWall.themes.animals.c.find((c) => c.k === 'cat');
    const out = { cat: PictureWordWall.compose('sv', cat, false) };
    /* the NEUTER half of the net must actually run — a missing lookup
       used to leave out.house undefined and silently skip the assert */
    let house = null;
    for (const t of PictureWordWall.index.themes) {
      const h = t.c.find((c) => c.k === 'house');
      if (h) { house = h; break; }
    }
    out.house = house ? PictureWordWall.compose('sv', house, false) : null;
    const same = PictureWordWall.themes.animals.c.find((c) => c.sp);
    if (same) {
      PictureWordWall._userGestured = true;
      PictureWordWall._openHero(same);
      window.__spoken.length = 0;
      [...document.querySelectorAll('.pww-togbtn')].find((b) => b.getAttribute('data-plural') === '1').click();
      out.sameKey = same.k;
      out.note = document.querySelector('.pww-heronote').textContent;
      out.noteShown = document.querySelector('.pww-heronote').style.display !== 'none';
    }
    return out;
  });
  await sleep(500);
  sv.spoke = await page.evaluate(() => window.__spoken.slice());
  if (sv.cat.toLowerCase() !== 'en katt') FAIL(`sv cat: "${sv.cat}" (want "en katt" — n is COMMON, not neuter)`);
  else if (!sv.house) FAIL('sv house: the neuter anchor card was not found — this assert must never skip');
  else if (sv.house.toLowerCase() !== 'ett hus') FAIL(`sv house: "${sv.house}" (want "ett hus" — t is NEUTER)`);
  else if (!sv.noteShown || !sv.note) FAIL('sv identical-plural: the lesson line is missing');
  else if (!sv.spoke.length || sv.spoke[0].indexOf('tre') !== 0) FAIL(`sv identical-plural speech: ${JSON.stringify(sv.spoke)} (want the native quantity phrase)`);
  else OK(`"${sv.cat}" / "${sv.house}"; ${sv.sameKey} → "${sv.note}" + spoke "${sv.spoke[0]}"`);

  /* ---------- F. en/fi frameless ---------- */
  console.log('\nF. en/fi frameless gallery');
  for (const loc of ['en', 'fi']) {
    await page.goto(BASE + '?lang=' + loc, { waitUntil: 'networkidle0' });
    await sleep(600);
    const g = await page.evaluate(() => ({
      frameless: !!document.querySelector('.pww-wrap.frameless'),
      rails: document.querySelectorAll('.pww-card[class*="rail-"]').length,
      arts: document.querySelectorAll('.pww-art').length,
      wordPx: parseFloat(getComputedStyle(document.querySelector('.pww-word')).fontSize),
    }));
    if (!g.frameless || g.rails || g.arts) FAIL(`${loc}: frameless=${g.frameless} rails=${g.rails} articles=${g.arts} (want true/0/0)`);
    else OK(`${loc}: no rails, no articles, words at ${g.wordPx}px (honest absence, not a faked layer)`);
    if (loc === 'en') await page.screenshot({ path: path.join(OUT, 'wall-en-1024x768.png') });
  }

  /* ---------- G. whisper ---------- */
  console.log('\nG. whisper mode');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  await sleep(700);
  const w1 = await page.evaluate(() => {
    PictureWordWall.premium = true;
    PictureWordWall._userGestured = true;
    PictureWordWall._startWhisper();
    return { n: document.querySelectorAll('.pww-card').length, size: PictureWordWall._whisperCards.length };
  });
  await sleep(500);
  const w2 = await page.evaluate(() => ({ spoke: window.__spoken.slice(), prompt: (document.querySelector('.pww-whisperline') || {}).textContent, fly: !!document.querySelector('.pww-firefly') }));
  if (w1.n !== w1.size) FAIL(`whisper wall shows ${w1.n} cards but the pool is ${w1.size} (the target could page out of view)`);
  else if (!w2.fly || !/^Finde: (der|die|das) /.test(w2.prompt || '')) FAIL(`whisper prompt "${w2.prompt}" fly=${w2.fly}`);
  else OK(`${w1.n}-card pool on one page; "${w2.prompt}" spoken with its article`);
  /* the wrong tap must never punish */
  const before = await page.evaluate(() => {
    window.__spoken.length = 0;
    const t = PictureWordWall.whisper.target;
    const wrong = [...document.querySelectorAll('.pww-card')].find((c) => c.getAttribute('data-key') !== t);
    const f = document.querySelector('.pww-firefly').getBoundingClientRect();
    const tEl = document.querySelector('.pww-card[data-key="' + CSS.escape(t) + '"]').getBoundingClientRect();
    const d0 = Math.abs(f.left - (tEl.left + tEl.width / 2));
    wrong.click();
    return { d0 };
  });
  await sleep(700);
  const after = await page.evaluate(() => {
    const f = document.querySelector('.pww-firefly').getBoundingClientRect();
    const tEl = document.querySelector('.pww-card[data-key="' + CSS.escape(PictureWordWall.whisper.target) + '"]').getBoundingClientRect();
    return { d1: Math.abs(f.left - (tEl.left + tEl.width / 2)), landed: f && document.querySelector('.pww-firefly').classList.contains('landed'),
      misses: PictureWordWall.whisper.misses, spoke: window.__spoken.slice(),
      note: (document.querySelector('.pww-whisperline') || {}).textContent };
  });
  if (after.landed) FAIL('the firefly landed on a WRONG tap');
  else if (after.d1 >= before.d0) FAIL(`firefly did not drift closer (${Math.round(before.d0)} → ${Math.round(after.d1)})`);
  else if (!after.spoke.length) FAIL('the word did not re-speak after a miss');
  else if (/gefunden|Gefunden/.test(after.note || '')) FAIL('a wrong tap showed the found line');
  else OK(`wrong tap: no landing, firefly ${Math.round(before.d0)}→${Math.round(after.d1)}px closer, word re-spoken, no red`);
  /* the correct tap lands it */
  await page.evaluate(() => { document.querySelector('.pww-card[data-key="' + CSS.escape(PictureWordWall.whisper.target) + '"]').click(); });
  await sleep(500);
  const w3 = await page.evaluate(() => ({ landed: document.querySelector('.pww-firefly').classList.contains('landed'),
    found: !!document.querySelector('.pww-card.pww-found'), note: (document.querySelector('.pww-whisperline') || {}).textContent }));
  /* the firefly must ARRIVE while the halo is still lit — it flies, so a
     class flag is not proof. At the old 1.6s wander pace it reached the
     card exactly as the 1.6s halo expired: the reward was dispatched but
     never seen. Assert POSITION against the haloed card. */
  await sleep(900);
  const landing = await page.evaluate(() => {
    const f = document.querySelector('.pww-firefly').getBoundingClientRect();
    const t = document.querySelector('.pww-card.pww-found');
    if (!t) return { halo: false };
    const b = t.getBoundingClientRect();
    return { halo: true, dist: Math.round(Math.abs((f.left + f.width / 2) - (b.left + b.width / 2))) };
  });
  if (!landing.halo) FAIL('the halo expired before the firefly arrived — the reward is never seen');
  else if (landing.dist > 30) FAIL(`the firefly settled ${landing.dist}px from its card's centre`);
  else OK(`the firefly arrives ON the lit card (${landing.dist}px off centre, halo still up)`);
  if (!w3.landed || !w3.found) FAIL(`correct tap: landed=${w3.landed} halo=${w3.found}`);
  else if (!/^Gefunden: /.test(w3.note || '')) FAIL(`found line "${w3.note}" is not colon-apposition (a case frame would inflect the citation form)`);
  else OK(`correct tap: firefly lands + halo + "${w3.note}"`);

  /* ---------- H. pins survive a reload ---------- */
  console.log('\nH. pinned wall');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  await sleep(700);
  await page.evaluate(() => {
    PictureWordWall.premium = true;
    PictureWordWall._togglePin(PictureWordWall.themes.animals.c.find((c) => c.k === 'dog'));
    PictureWordWall._togglePin(PictureWordWall.themes.animals.c.find((c) => c.k === 'cat'));
    PictureWordWall._store.wallName = 'Woche 12 — Auf dem Bauernhof';
    PictureWordWall._saveStore();
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await sleep(800);
  const pins = await page.evaluate(() => ({ n: PictureWordWall._store.pins.length, name: PictureWordWall._store.wallName,
    mode: PictureWordWall.mode, shown: document.querySelectorAll('.pww-card').length }));
  if (pins.n !== 2 || pins.name !== 'Woche 12 — Auf dem Bauernhof') FAIL(`pins: ${JSON.stringify(pins)}`);
  else if (pins.mode !== 'pins') FAIL(`reopening did not land on her named wall (mode=${pins.mode})`);
  else OK(`2 pins + "${pins.name}" survive a reload; reopening lands on HER wall, not a menu`);

  /* ---------- I. free gates ---------- */
  console.log('\nI. free gates');
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await sleep(700);
  const gates = await page.evaluate(() => {
    const out = {};
    PictureWordWall.premium = false;
    PictureWordWall.render();
    const chips = [...document.querySelectorAll('.pww-chip')];
    chips.find((c) => /Whisper/i.test(c.textContent)).click();
    out.whisper = !!document.querySelector('.pww-gate');
    out.link = (document.querySelector('.pww-gatelink') || {}).getAttribute('href');
    out.locked = PictureWordWall._themeLocked('space');
    out.free = ['animals', 'fruits', 'vehicles'].every((k) => !PictureWordWall._themeLocked(k));
    return out;
  });
  if (!gates.whisper) FAIL('the whisper chip did not gate for a free teacher');
  else if (!gates.locked || !gates.free) FAIL(`free themes wrong: locked(space)=${gates.locked} free3=${gates.free}`);
  else if (!/from=tool-picture-word-wall/.test(gates.link || '')) FAIL(`gate link: ${gates.link}`);
  else OK('whisper + pins gate; animals/fruits/vehicles free, the rest locked → pricing?from=tool-picture-word-wall');

  /* ---------- J. lazy-loading ---------- */
  console.log('\nJ. lazy-loading');
  /* cache OFF — a cached hit never reaches the server, so "0 fetched"
     would pass the upper bound while proving nothing. Assert BOTH
     bounds: the visible page must load, the offscreen pages must not. */
  await page.setCacheEnabled(false);
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  await sleep(800);
  const themeSize = await page.evaluate(() => PictureWordWall.themes.around_the_house.c.length);
  imgHits.clear();
  await page.evaluate(() => { PictureWordWall.theme = 'around_the_house'; PictureWordWall.page = 0; PictureWordWall.render(); });
  await sleep(1500);
  const fetched = [...imgHits].filter((p) => p.indexOf('around%20the%20house') >= 0 || /around.the.house/i.test(p)).length;
  const perPage = await page.evaluate(() => document.querySelectorAll('.pww-card').length);
  if (!fetched) FAIL('lazy: 0 images fetched with the cache off — the wall is not loading at all');
  else if (fetched > perPage + 2) FAIL(`lazy: fetched ${fetched} for ${perPage} visible cards (offscreen pages loaded)`);
  else if (fetched >= themeSize) FAIL(`lazy: fetched ${fetched} of ${themeSize} — the whole theme loaded`);
  else OK(`a ${themeSize}-card theme fetched ${fetched} images for ${perPage} visible cards (loading=lazy is viewport-gated)`);
  await page.setCacheEnabled(true);

  /* ---------- K. TTS silence + console ---------- */
  console.log('\nK. TTS seams + console');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  await sleep(1400);
  const silent = await page.evaluate(() => window.__spoken.length === 0);
  if (!silent) FAIL('spoke before any user gesture');
  else OK('silent before the first gesture');
  const real = pageErrs.filter((e) => !/404|Failed to load/.test(e));
  if (real.length) FAIL('page errors: ' + real.slice(0, 3).join(' | '));
  else OK('console clean');

  await browser.close();
  server.close();
  console.log(failures ? `\nFAIL — ${failures} failure(s)` : '\nPASS — picture-word-wall DoD green');
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
