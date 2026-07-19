#!/usr/bin/env node
/* =====================================================================
   local-test-story-line.js — the local Definition-of-Done for Story
   Line. Sections:
     A  viewports 320-1366 — no h-overflow, NO-SCROLL contract ≥768,
        tap targets ≥44px, slots hang on the rope sag
     B  the ritual — drag-peg narrates the POSITION's connective +
        caption; jumbled pegging accepted with zero refusal; playback
        reads the child's order verbatim; "the book's way" appears only
        after a full playback and replays CANONICAL order while the DOM
        card order stays the child's; un-peg; start-again re-deals
     C  art — library cards load (naturalWidth>0), glyph cards render,
        the 4 new glyphs exist
     D  free vs premium — ?set= deep-link suppressed to a free set;
        library locked tiles gate; narrator chip gated; premium: deep
        link honored, hide-narrator pegs chime-not-speech
     E  no-shame audit — no green/red on cards/slots, no verdict
        glyphs, non-spotlit cards NEVER dimmed during playback
     F  reduced motion    G  keyboard path
   Screenshots → docs/audit-results/story-line/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const QA = path.join(REPO, 'docs', 'audit-results', 'story-line', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const SETS = JSON.parse(fs.readFileSync(path.join(MINI, 'story-line-sets.json'), 'utf8'));

let pass = 0, fail = 0;
const bad = [];
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; bad.push(name); console.log('  ✗ FAIL ' + name + (extra ? ' — ' + extra : '')); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/image-library-webp/')) file = path.join(IMGLIB, p.slice('/image-library-webp/'.length));
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/story-line.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  async function newPage(opts) {
    opts = opts || {};
    const page = await browser.newPage();
    await page.setViewport({ width: opts.w || 1024, height: opts.h || 768 });
    await page.evaluateOnNewDocument((premium) => {
      try { localStorage.clear(); } catch (_) {}
      if (premium) {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          localStorage.setItem('lcs:story-line:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, settings: null, narratorOff: false }));
        } catch (_) {}
      }
    }, !!opts.premium);
    if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    page._errs = [];
    const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  async function ready(page) { await page.waitForSelector('.stl-slot', { timeout: 8000 }); await sleep(150); }
  async function spy(page) {
    await page.evaluate(() => {
      window.__spoken = [];
      if (window.LCSAudio) {
        LCSAudio.speak = function (o) { window.__spoken.push(o.text); };
        LCSAudio.cancel = function () {};
      }
      window.__notes = 0;
      const Real = AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function () { window.__notes++; return Real.call(this); };
    });
  }
  async function dragTrayToSlot(page, trayIdx, slotIdx) {
    const from = await page.evaluate((i) => {
      const c = document.querySelectorAll('.stl-card.in-tray')[i];
      const r = c.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, trayIdx);
    const to = await page.evaluate((i) => {
      const s = document.querySelectorAll('.stl-slot')[i];
      const r = s.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, slotIdx);
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    for (let i = 1; i <= 6; i++) await page.mouse.move(from.x + (to.x - from.x) * i / 6, from.y + (to.y - from.y) * i / 6);
    await page.mouse.up();
    await sleep(250);
  }

  /* ============================ A: viewports ============================ */
  console.log('A. viewport sweep');
  for (const [w, h] of [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]]) {
    const page = await newPage({ w, h });
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    const m = await page.evaluate(() => {
      const doc = document.scrollingElement || document.documentElement;
      const btns = [...document.querySelectorAll('button')].filter((b) => {
        if (b.offsetParent === null) return false;
        const cs = getComputedStyle(b);
        return cs.pointerEvents !== 'none' && parseFloat(cs.opacity) > 0.05;
      });
      const small = btns.filter((b) => { const r = b.getBoundingClientRect(); return (r.height < 44 || r.width < 44) && r.height > 0; })
        .map((b) => (b.textContent || b.className).trim().slice(0, 22));
      const dock = document.querySelector('.stl-dock').getBoundingClientRect();
      const tray = document.querySelector('.stl-tray').getBoundingClientRect();
      const slot0 = document.querySelector('.stl-slot').getBoundingClientRect();
      const line = document.querySelector('.stl-line').getBoundingClientRect();
      return {
        hOverflow: doc.scrollWidth > window.innerWidth + 1,
        slots: document.querySelectorAll('.stl-slot').length,
        small,
        dockBottom: dock.bottom,
        canScroll: getComputedStyle(document.body).overflowY,
        slotTopRel: slot0.top - line.top,
        dockOverlapsTray: dock.top < Math.max.apply(null, [...document.querySelectorAll('.stl-card.in-tray')].map((c) => c.getBoundingClientRect().bottom).concat([tray.bottom])) - 2
      };
    });
    ok(`${w}×${h} no horizontal overflow`, !m.hOverflow);
    ok(`${w}×${h} slots render`, m.slots >= 3);
    ok(`${w}×${h} tap targets ≥44px`, m.small.length === 0, m.small.join(', '));
    ok(`${w}×${h} slot hangs below the rope top`, m.slotTopRel > 10, `rel=${Math.round(m.slotTopRel)}`);
    ok(`${w}×${h} dock never overlaps the tray`, !m.dockOverlapsTray);
    if (w >= 768) ok(`${w}×${h} NO-SCROLL contract`, m.dockBottom <= h + 1, `dockBottom=${Math.round(m.dockBottom)}`);
    else ok(`${w}×${h} dock reachable`, m.dockBottom <= h + 1 || m.canScroll === 'auto');
    if (w === 360 || w === 768 || w === 1024) await page.screenshot({ path: path.join(QA, `idle-${w}.png`) });
    ok(`${w}×${h} clean console`, page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ B: the ritual ============================ */
  console.log('B. the ritual');
  {
    const page = await newPage({});
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    await spy(page);
    /* free featured = k-rainbow (freeSets[0]); its canonical captions: */
    const set = SETS.sets.find((s) => s.id === SETS.freeSets[0]);
    const caps = set.cards.map((c) => c.cap.en);

    /* which tray card is canonical card 0? read data-card off the tray */
    const trayMap = await page.evaluate(() => [...document.querySelectorAll('.stl-card.in-tray')].map((c) => Number(c.dataset.card)));

    /* JUMBLED pegging: put canonical card 2 into slot 0 */
    await dragTrayToSlot(page, trayMap.indexOf(2), 0);
    const said1 = await page.evaluate(() => window.__spoken[window.__spoken.length - 1] || '');
    ok('peg narrates POSITION connective + caption', said1.startsWith('First, ') && said1.includes(caps[2].slice(0, 12)), said1);
    ok('jumbled peg accepted (no refusal)', await page.evaluate(() => document.querySelectorAll('.stl-slot.filled').length === 1));

    /* peg the rest jumbled: card0→slot1, card1→slot2 */
    const trayMap2 = await page.evaluate(() => [...document.querySelectorAll('.stl-card.in-tray')].map((c) => Number(c.dataset.card)));
    await dragTrayToSlot(page, trayMap2.indexOf(0), 1);
    const trayMap3 = await page.evaluate(() => [...document.querySelectorAll('.stl-card.in-tray')].map((c) => Number(c.dataset.card)));
    await dragTrayToSlot(page, trayMap3.indexOf(1), 2);
    ok('all three pegged', await page.evaluate(() => document.querySelectorAll('.stl-slot.filled').length === 3));
    await page.screenshot({ path: path.join(QA, 'pegged-1024.png') });

    /* playback in tap-pace: reads the CHILD's order 2,0,1 */
    await page.evaluate(() => { StoryLine.api.settings.tapPace = true; });
    await page.evaluate(() => { window.__spoken.length = 0; });
    await page.evaluate(() => { [...document.querySelectorAll('.stl-big')].find((b) => !b.disabled).click(); });
    await sleep(400);
    await page.screenshot({ path: path.join(QA, 'spotlight-1024.png') });
    for (let i = 0; i < 3; i++) { await page.evaluate(() => { document.querySelector('.stl-wrap').click(); }); await sleep(300); }
    await sleep(2200);
    const played = await page.evaluate(() => window.__spoken.slice());
    const orderOk = played.length >= 4 &&
      played[0].includes(caps[2].slice(0, 12)) &&
      played[1].includes(caps[0].slice(0, 12)) &&
      played[2].includes(caps[1].slice(0, 12));
    ok('playback reads the child’s jumbled order verbatim', orderOk, played.join(' || ').slice(0, 160));
    ok('closing line spoken once at the end', played.filter((t) => t === 'And that’s the story.').length === 1);

    /* the book's way appears only now, replays canonical order, cards unmoved */
    const domBefore = await page.evaluate(() => [...document.querySelectorAll('.stl-slot .stl-card')].map((c) => c.dataset.card).join(','));
    const bookVisible = await page.evaluate(() => !![...document.querySelectorAll('.stl-chip')].find((c) => c.textContent.includes('book’s way')));
    ok('book’s-way chip appears after a full playback', bookVisible);
    await page.evaluate(() => { window.__spoken.length = 0; });
    await page.evaluate(() => { [...document.querySelectorAll('.stl-chip')].find((c) => c.textContent.includes('book’s way')).click(); });
    await sleep(300);
    for (let i = 0; i < 3; i++) { await page.evaluate(() => { document.querySelector('.stl-wrap').click(); }); await sleep(300); }
    await sleep(2200);
    const ghost = await page.evaluate(() => window.__spoken.slice());
    const ghostOk = ghost.length >= 3 &&
      ghost[0].includes(caps[0].slice(0, 12)) &&
      ghost[1].includes(caps[1].slice(0, 12)) &&
      ghost[2].includes(caps[2].slice(0, 12));
    ok('book’s way narrates CANONICAL order', ghostOk, ghost.join(' || ').slice(0, 160));
    const domAfter = await page.evaluate(() => [...document.querySelectorAll('.stl-slot .stl-card')].map((c) => c.dataset.card).join(','));
    ok('book’s way NEVER moves the child’s cards', domBefore === domAfter, `${domBefore} → ${domAfter}`);

    /* start again re-deals */
    await page.evaluate(() => { [...document.querySelectorAll('.stl-chip')].find((c) => c.textContent.includes('Start again')).click(); });
    await sleep(250);
    ok('start again returns all cards to the tray', await page.evaluate(() =>
      document.querySelectorAll('.stl-card.in-tray').length === 3 && document.querySelectorAll('.stl-slot.filled').length === 0));
    ok('B clean console', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ C: art ============================ */
  console.log('C. art (premium deep links)');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE + '?set=g1-school-day', { waitUntil: 'networkidle0' });
    await ready(page);
    await sleep(700);
    const m = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('.stl-card.in-tray img')];
      return { n: imgs.length, loaded: imgs.filter((i) => i.naturalWidth > 0).length };
    });
    ok('library cards load webp art', m.n === 4 && m.loaded === 4, `${m.loaded}/${m.n}`);
    await page.close();

    const p2 = await newPage({ premium: true });
    await p2.goto(BASE + '?set=g2-butterfly', { waitUntil: 'networkidle0' });
    await ready(p2);
    const g = await p2.evaluate(() => ({
      glyphs: document.querySelectorAll('.stl-card.in-tray .stl-glyph').length,
      total: document.querySelectorAll('.stl-card.in-tray').length
    }));
    ok('lifecycle set renders new glyphs (egg + cocoon)', g.glyphs === 2 && g.total === 4, JSON.stringify(g));
    await p2.screenshot({ path: path.join(QA, 'butterfly-1024.png') });
    await p2.close();
  }

  /* ============================ D: free vs premium ============================ */
  console.log('D. free vs premium');
  {
    const page = await newPage({});
    await page.goto(BASE + '?set=g2-turnip', { waitUntil: 'networkidle0' });
    await ready(page);
    const name = await page.evaluate(() => (document.querySelector('.stl-namechip') || {}).textContent);
    ok('free: ?set= deep link suppressed → free set', name === 'Rain and Rainbow' || name === 'Baking Day', name);
    await page.evaluate(() => { [...document.querySelectorAll('.stl-chip')].find((c) => c.textContent.includes('Story sets')).click(); });
    await page.waitForSelector('.stl-panel.open', { timeout: 5000 });
    const lib = await page.evaluate(() => ({
      tiles: document.querySelectorAll('.stl-tile').length,
      locked: document.querySelectorAll('.stl-tile.locked').length
    }));
    ok('free: 15 tiles visible, 13 soft-locked', lib.tiles === 15 && lib.locked === 13, JSON.stringify(lib));
    await page.screenshot({ path: path.join(QA, 'library-1024.png') });
    await page.evaluate(() => { document.querySelector('.stl-tile.locked').click(); });
    await sleep(250);
    ok('free: locked tile → inline gate', await page.evaluate(() =>
      !!document.querySelector('.stl-gate a[href*="/pricing?from=tool-story-line"]')));
    await page.evaluate(() => { const g = document.querySelector('.stl-gate'); if (g) g.remove(); });
    await page.evaluate(() => { [...document.querySelectorAll('.stl-chip')].find((c) => c.textContent.includes('Narrator')).click(); });
    await sleep(250);
    ok('free: narrator chip gated', await page.evaluate(() => !!document.querySelector('.stl-gate')));
    await page.close();

    /* premium: hide-narrator pegs chime, not speech */
    const p2 = await newPage({ premium: true });
    await p2.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(p2);
    await spy(p2);
    await p2.evaluate(() => { [...document.querySelectorAll('.stl-chip')].find((c) => c.textContent.includes('Narrator')).click(); });
    await sleep(250);
    const trayMap = await p2.evaluate(() => [...document.querySelectorAll('.stl-card.in-tray')].map((c) => Number(c.dataset.card)));
    await dragTrayToSlot(p2, 0, 0);
    const hid = await p2.evaluate(() => ({ spoken: window.__spoken.length, notes: window.__notes }));
    ok('premium hide-narrator: peg = one chime, zero speech', hid.spoken === 0 && hid.notes === 1, JSON.stringify(hid));
    await p2.close();
  }

  /* ============================ E: no-shame audit ============================ */
  console.log('E. no-shame audit');
  {
    const page = await newPage({});
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    await spy(page);
    const trayMap = await page.evaluate(() => [...document.querySelectorAll('.stl-card.in-tray')].map((c) => Number(c.dataset.card)));
    for (let s = 0; s < 3; s++) {
      const tm = await page.evaluate(() => [...document.querySelectorAll('.stl-card.in-tray')].map((c) => Number(c.dataset.card)));
      await dragTrayToSlot(page, 0, s);
    }
    await page.evaluate(() => { StoryLine.api.settings.tapPace = true; });
    await page.evaluate(() => { [...document.querySelectorAll('.stl-big')].find((b) => !b.disabled).click(); });
    await sleep(400);
    const m = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.stl-slot .stl-card')];
      const spot = document.querySelector('.stl-card.stl-spot');
      const others = cards.filter((c) => c !== spot);
      return {
        dimmed: others.filter((c) => parseFloat(getComputedStyle(c).opacity) < 0.99).length,
        glyphs: /[✓✔✗✘★👑🏆]/.test(document.body.innerText),
        spotShadow: spot ? getComputedStyle(spot).boxShadow : '',
        green: false
      };
    });
    ok('spotlight NEVER dims the other cards', m.dimmed === 0, `${m.dimmed} dimmed`);
    ok('no verdict glyphs in the DOM', !m.glyphs);
    ok('spotlight glow is honey, not green', m.spotShadow.includes('rgba(242, 200, 121') && !/rgb\(4[0-9], 1[6-9][0-9]/.test(m.spotShadow));
    await page.close();
  }

  /* ============================ F: reduced motion ============================ */
  console.log('F. reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    await dragTrayToSlot(page, 0, 0);
    const m = await page.evaluate(() => {
      const card = document.querySelector('.stl-slot.filled .stl-card');
      const pin = document.querySelector('.stl-pin');
      return {
        cardAnim: getComputedStyle(card).animationName,
        pinAnim: pin ? getComputedStyle(pin).animationName : 'none'
      };
    });
    ok('reduced motion: no swing/snap animations', m.cardAnim === 'none' && m.pinAnim === 'none', JSON.stringify(m));
    await page.close();
  }

  /* ============================ G: keyboard ============================ */
  console.log('G. keyboard path');
  {
    const page = await newPage({});
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    await spy(page);
    await page.evaluate(() => { document.querySelector('.stl-card.in-tray').focus(); });
    await page.keyboard.press('Enter');
    await sleep(300);
    ok('Enter pegs the focused tray card into the first empty slot', await page.evaluate(() =>
      document.querySelectorAll('.stl-slot.filled').length === 1));
    await page.evaluate(() => { document.querySelector('.stl-slot.filled .stl-card').focus(); });
    await page.keyboard.press('ArrowRight');
    await sleep(300);
    ok('ArrowRight moves the pegged card one slot', await page.evaluate(() =>
      [...document.querySelectorAll('.stl-slot')][1].classList.contains('filled')));
    await page.evaluate(() => { document.querySelector('.stl-slot.filled .stl-card').focus(); });
    await page.keyboard.press('Delete');
    await sleep(300);
    ok('Delete un-pegs back to the tray', await page.evaluate(() =>
      document.querySelectorAll('.stl-slot.filled').length === 0 && document.querySelectorAll('.stl-card.in-tray').length === 3));
    ok('G clean console', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nRESULT: ${fail ? 'FAIL' : 'PASS'}  (${pass} passed, ${fail} failed)`);
  if (fail) bad.forEach((b) => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
