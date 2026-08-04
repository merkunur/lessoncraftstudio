#!/usr/bin/env node
/* =====================================================================
   local-test-fraction-kitchen.js — the local Definition-of-Done for
   Fraction Kitchen. Sections:
     A  viewports 320-1366 — no h-overflow, NO-SCROLL contract ≥768,
        visible tap targets ≥44px, board+dock content rects don't overlap
     B  the knife — drag along a CORRECT guide → commit → pieces explode
        + TTS speaks the fraction name; drag along the DISTRACTOR →
        the unequal-beat (visibly separated unequal groups) → heals →
        guide returns unmarked; kind voice line ≤1× per food; a partial
        drag (<80%) commits nothing; tap-to-cut fallback works
     C  share — plates appear, fly-drag a slice onto a plate (face
        bounces, never frowns), second slice on the same plate slides
        back, completion line speaks, leftover = observation line then
        the tool WAITS (no further audio)
     D  equivalence tray (premium) — fill ½ with 2×¼ → exact-fit glow +
        dyad + equivDone line; the extra piece glides back silently
     E  free vs premium — ?food=cake&n=8 suppressed to free pizza;
        bar/cake + thirds chips locked and gate; premium honors deep link
     F  no-shame audit — distractor guide computed style === correct
        guide style; no red / verdict-green anywhere; no ✗ glyphs
     G  reduced motion    H  keyboard reachability
   Screenshots → docs/audit-results/fraction-kitchen/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const QA = path.join(REPO, 'docs', 'audit-results', 'fraction-kitchen', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

let pass = 0, fail = 0;
const bad = [];
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; bad.push(name); console.log('  ✗ FAIL ' + name + (extra ? ' — ' + extra : '')); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* FRK_TOOL_DIR overlays a doctored copy of a single file over the real
   mini-tools tree, so a poison run can prove an assertion FAILS on the
   defect it claims to catch. Anything not present there is served
   normally — the overlay is one file, not a whole tree. */
const OVERLAY = process.env.FRK_TOOL_DIR || null;
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const rel = p.startsWith('/mini-tools/') ? p.slice('/mini-tools/'.length) : p.replace(/^\//, '');
    let file = path.join(MINI, rel);
    if (OVERLAY && fs.existsSync(path.join(OVERLAY, rel))) file = path.join(OVERLAY, rel);
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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/fraction-kitchen.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  async function newPage(opts) {
    opts = opts || {};
    const page = await browser.newPage();
    /* ⚠ hasTouch MUST be on for the touch path, or Chrome declines to
       synthesise touch at all and every touch assertion passes on
       nothing. isMobile rides along so the compositor runs the real
       touch-action hit test rather than the desktop one. */
    await page.setViewport({
      width: opts.w || 1024, height: opts.h || 768,
      hasTouch: !!opts.touch, isMobile: !!opts.touch
    });
    await page.evaluateOnNewDocument((premium) => {
      try { localStorage.clear(); } catch (_) {}
      if (premium) {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          localStorage.setItem('lcs:fraction-kitchen:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, settings: null }));
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
  async function ready(page) { await page.waitForSelector('.frk-board', { timeout: 8000 }); await sleep(200); }
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
  /* viewport coords of a guide segment (by kind+idx) */
  async function guidePts(page, kind, idx) {
    return page.evaluate((kind, idx) => {
      const svg = document.querySelector('.frk-food');
      const r = svg.getBoundingClientRect();
      const el = document.querySelector(`.frk-guide[data-kind="${kind}"][data-idx="${idx}"]`);
      const to = (x, y) => ({ x: r.left + x / 100 * r.width, y: r.top + y / 100 * r.height });
      return { a: to(+el.getAttribute('x1'), +el.getAttribute('y1')), b: to(+el.getAttribute('x2'), +el.getAttribute('y2')) };
    }, kind, idx);
  }
  /* knife-drag along a guide from a→b, stopping at `frac` of the way */
  async function knifeCut(page, kind, idx, frac) {
    frac = frac == null ? 1 : frac;
    const k = await page.evaluate(() => {
      const r = document.querySelector('.frk-knife').getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    const g = await guidePts(page, kind, idx);
    await page.mouse.move(k.x, k.y);
    await page.mouse.down();
    await page.mouse.move(g.a.x, g.a.y, { steps: 4 });
    const steps = 10;
    for (let i = 1; i <= steps * frac; i++) {
      await page.mouse.move(g.a.x + (g.b.x - g.a.x) * i / steps, g.a.y + (g.b.y - g.a.y) * i / steps);
    }
    await page.mouse.up();
    await sleep(200);
  }
  /* drag the knife from food-point a to food-point b, ignoring guides */
  async function freeCut(page, a, b) {
    const pts = await page.evaluate((a, b) => {
      const r = document.querySelector('.frk-food').getBoundingClientRect();
      const to = (p) => ({ x: r.left + p.x / 100 * r.width, y: r.top + p.y / 100 * r.height });
      return { a: to(a), b: to(b) };
    }, a, b);
    const k = await page.evaluate(() => {
      const r = document.querySelector('.frk-knife').getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    await page.mouse.move(k.x, k.y);
    await page.mouse.down();
    await page.mouse.move(pts.a.x, pts.a.y, { steps: 4 });
    for (let i = 1; i <= 14; i++) {
      await page.mouse.move(pts.a.x + (pts.b.x - pts.a.x) * i / 14, pts.a.y + (pts.b.y - pts.a.y) * i / 14);
    }
    await page.mouse.up();
    await sleep(200);
  }
  async function dragCenter(page, fromSel, toSel) {
    const from = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, fromSel);
    const to = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, toSel);
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(from.x + (to.x - from.x) * i / 8, from.y + (to.y - from.y) * i / 8);
    await page.mouse.up();
    await sleep(250);
  }

  /* ---- the TOUCH path -------------------------------------------------
     `page.mouse` dispatches pointerType:'mouse' and never engages the
     browser's pan/scroll gesture, so it cannot see the defect class that
     makes a drag die on a phone. `page.touchscreen.tap()` is no use
     either — start+end with no moves in between is not a drag.

     Assert the OUTCOME and the CANCEL COUNT, never the move count:
     Chrome throttles touchmove, so a gate that counts pointermove events
     is flaky by construction. pointercancel is the sharper signal — it
     fires the moment the browser decides the gesture is a pan, which is
     exactly the defect, and it fails even when the outcome survives. */
  async function armTouchWatch(page) {
    await page.evaluate(() => {
      window.__cancels = 0;
      window.__scrolled = 0;
      addEventListener('pointercancel', () => { window.__cancels++; }, true);
      addEventListener('scroll', () => { window.__scrolled++; }, true);
      try { document.scrollingElement.scrollTop = 0; } catch (_) {}
    });
  }
  async function touchDrag(page, from, to, steps) {
    steps = steps || 12;
    const t = await page.touchscreen.touchStart(from.x, from.y);
    for (let i = 1; i <= steps; i++) {
      await t.move(from.x + (to.x - from.x) * i / steps, from.y + (to.y - from.y) * i / steps);
      await sleep(24);
    }
    await t.end();
    await sleep(260);
  }
  async function touchWatch(page) {
    return page.evaluate(() => ({
      cancels: window.__cancels,
      scrollTop: (document.scrollingElement && document.scrollingElement.scrollTop) || 0
    }));
  }
  const centerOf = (page, sel) => page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, sel);

  /* ============================ A: viewports ============================ */
  console.log('A. viewport sweep');
  for (const [w, h] of [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]]) {
    const page = await newPage({ w, h });
    await page.goto(BASE);
    await ready(page);
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const hOver = doc.scrollWidth - doc.clientWidth;
      const vOver = doc.scrollHeight - doc.clientHeight;
      const tiny = [];
      document.querySelectorAll('button, a').forEach((b) => {
        const r = b.getBoundingClientRect();
        const cs = getComputedStyle(b);
        if (r.width === 0 || cs.pointerEvents === 'none' || parseFloat(cs.opacity) < 0.05) return;
        if (r.width < 44 || r.height < 44) tiny.push(`${(b.textContent || b.className).trim().slice(0, 18)} ${Math.round(r.width)}x${Math.round(r.height)}`);
      });
      const board = document.querySelector('.frk-board').getBoundingClientRect();
      const dock = document.querySelector('.frk-dock').getBoundingClientRect();
      const overlap = board.bottom - 2 > dock.top && dock.height > 0;
      return { hOver, vOver, tiny, overlap };
    });
    ok(`${w}x${h} no h-overflow`, m.hOver <= 1, `${m.hOver}px`);
    if (w >= 768) ok(`${w}x${h} NO-SCROLL`, m.vOver <= 2, `${m.vOver}px`);
    ok(`${w}x${h} tap targets ≥44`, m.tiny.length === 0, m.tiny.join('; '));
    ok(`${w}x${h} board clear of dock`, !m.overlap);
    await page.screenshot({ path: path.join(QA, `A-${w}x${h}.png`) });
    ok(`${w}x${h} no js errors`, page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ B: the knife ============================ */
  console.log('B. knife — cut, unequal-beat, heal');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    /* partial drag: no commit */
    await knifeCut(page, 'c', 0, 0.4);
    let st = await page.evaluate(() => ({ committed: FractionKitchen.committed.length, sliced: FractionKitchen.sliced }));
    ok('partial drag commits nothing', st.committed === 0 && !st.sliced);
    /* full drag along the correct halves line */
    await knifeCut(page, 'c', 0, 1);
    await sleep(400);
    st = await page.evaluate(() => ({
      sliced: FractionKitchen.sliced,
      pieces: document.querySelectorAll('.frk-piece').length,
      exploded: document.querySelector('.frk-foodbox').classList.contains('exploded'),
      spoken: window.__spoken.join(' | ')
    }));
    ok('knife drag commits the halves cut', st.sliced === true);
    ok('2 pieces render exploded', st.pieces === 2 && st.exploded);
    ok('cutDone speaks the fraction word', /halves/i.test(st.spoken), st.spoken);
    await page.screenshot({ path: path.join(QA, 'B-halves-cut.png') });
    /* reset, then a FREEHAND cut nowhere near a guide.
       The decoy line is gone; the whole food is cuttable instead, and the
       beat now runs from the child's own stroke. */
    await page.evaluate(() => { window.__spoken = []; });
    await page.click('.frk-dock .frk-chiprow:nth-child(2) .frk-chip:last-child');
    await sleep(300);
    await freeCut(page, { x: 32, y: 8 }, { x: 32, y: 92 });   /* ~22/78 — a real, lopsided attempt */   /* a lopsided vertical chord */
    await sleep(500);
    const beat = await page.evaluate(() => ({
      unequal: document.querySelector('.frk-foodbox').classList.contains('unequal'),
      groups: document.querySelectorAll('.frk-uneq').length
    }));
    ok('a freehand off-pattern cut runs the beat from the child’s own line', beat.unequal && beat.groups === 2);
    await page.screenshot({ path: path.join(QA, 'B-unequal-beat.png') });
    await sleep(1600);
    const healed = await page.evaluate(() => ({
      unequal: document.querySelector('.frk-foodbox').classList.contains('unequal'),
      guides: document.querySelectorAll('.frk-guide').length,
      committed: FractionKitchen.committed.length,
      spoke: window.__spoken.some((s) => /same size/i.test(s))
    }));
    ok('beat heals; guides return unmarked; nothing committed', !healed.unequal && healed.guides === 1 && healed.committed === 0);
    ok('kind voice line spoke once', healed.spoke);
    /* second unequal cut: silent (≤1 per food) */
    await page.evaluate(() => { window.__spoken = []; });
    await freeCut(page, { x: 32, y: 8 }, { x: 32, y: 92 });   /* ~22/78 — a real, lopsided attempt */
    await sleep(2000);
    const second = await page.evaluate(() => window.__spoken.some((s) => /same size/i.test(s)));
    ok('second unequal cut is silent (≤1 voice line per food)', !second);
    /* ⭐ the seesaw is a BALANCE, not a verdict: an off-guide cut that
       happens to halve the food must NOT be told its pieces differ */
    await sleep(200);
    await page.evaluate(() => { window.__spoken = []; window.__seesaw = 0;
      const box = document.querySelector('.frk-foodbox');
      new MutationObserver(() => { if (box.classList.contains('seesaw')) window.__seesaw++; })
        .observe(box, { attributes: true, attributeFilter: ['class'] }); });
    await freeCut(page, { x: 12, y: 12 }, { x: 88, y: 88 });   /* a DIAMETER at 45° — equal halves */
    await sleep(700);
    const level = await page.evaluate(() => ({
      seesaw: window.__seesaw,
      /* NON-VACUITY: seesaw===0 is worthless unless the beat actually RAN.
         A cut that never happened also never seesaws. */
      ran: document.querySelectorAll('.frk-uneq').length,
      spoke: window.__spoken.some((s) => /same size/i.test(s))
    }));
    ok('an equal freehand cut still CUTS (non-vacuity for the level check)', level.ran === 2, `groups=${level.ran}`);
    ok('an equal freehand cut sits LEVEL — no seesaw, no “not the same size”',
      level.seesaw === 0 && !level.spoke, `seesaw=${level.seesaw} spoke=${level.spoke}`);
    await sleep(1600);
    /* tap-to-cut fallback */
    const g = await guidePts(page, 'c', 0);
    await page.mouse.click((g.a.x + g.b.x) / 2, (g.a.y + g.b.y) / 2);
    await sleep(400);
    const tapped = await page.evaluate(() => FractionKitchen.sliced);
    ok('tap-to-cut fallback commits', tapped === true);
    ok('B no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ==================== B2: one stroke, one handler =====================
     Two properties of the OLD knife that no gate could see, because both
     are invisible to an outcome check:

       · _commit rebuilt the food and re-wired the knife on every cut, so
         the node the gesture was running on was destroyed under the
         finger. Cutting a cross needed TWO press-drag-releases.
       · that re-wire never replaced the knife element, so each cut stacked
         another pointerdown/move/up/cancel quadruple on the same node.
         By the fourth cut of a cake, five drag state machines ran per
         pointermove. That is why the knife got heavier as you cut. */
  console.log('B2. one continuous stroke; no stacked handlers');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => { FractionKitchen.n = 4; FractionKitchen._resetCut(true); });
    await sleep(250);
    const k = await centerOf(page, '.frk-knife');
    const g0 = await guidePts(page, 'c', 0);
    const g1 = await guidePts(page, 'c', 1);
    ok('B2 non-vacuity: fourths gives two correct guides', !!g0 && !!g1 && !!k);
    /* ONE press. Both lines. ONE release. */
    await page.mouse.move(k.x, k.y);
    await page.mouse.down();
    await page.mouse.move(g0.a.x, g0.a.y, { steps: 4 });
    for (let i = 1; i <= 10; i++) await page.mouse.move(g0.a.x + (g0.b.x - g0.a.x) * i / 10, g0.a.y + (g0.b.y - g0.a.y) * i / 10);
    await page.mouse.move(g1.a.x, g1.a.y, { steps: 4 });
    for (let i = 1; i <= 10; i++) await page.mouse.move(g1.a.x + (g1.b.x - g1.a.x) * i / 10, g1.a.y + (g1.b.y - g1.a.y) * i / 10);
    await page.mouse.up();
    await sleep(400);
    const st = await page.evaluate(() => ({ committed: FractionKitchen.committed.length, sliced: FractionKitchen.sliced }));
    ok('B2 ONE stroke cuts the whole cross', st.sliced && st.committed === 2, `committed=${st.committed} sliced=${st.sliced}`);

    /* handler count, measured: one gesture must drive _moveKnife once per
       pointermove — not once per cut already made */
    const page2 = await newPage({});
    await page2.goto(BASE);
    await ready(page2);
    await page2.evaluate(() => { FractionKitchen.n = 4; FractionKitchen._resetCut(true); });
    await sleep(250);
    const a0 = await guidePts(page2, 'c', 0);
    const kk = await centerOf(page2, '.frk-knife');
    await page2.mouse.move(kk.x, kk.y);
    await page2.mouse.down();
    await page2.mouse.move(a0.a.x, a0.a.y, { steps: 4 });
    for (let i = 1; i <= 10; i++) await page2.mouse.move(a0.a.x + (a0.b.x - a0.a.x) * i / 10, a0.a.y + (a0.b.y - a0.a.y) * i / 10);
    await page2.mouse.up();
    await sleep(250);
    /* now instrument, and run a SECOND gesture of a known length */
    await page2.evaluate(() => {
      window.__mk = 0;
      const real = FractionKitchen._moveKnife.bind(FractionKitchen);
      FractionKitchen._moveKnife = function (e) { window.__mk++; return real(e); };
    });
    const kk2 = await centerOf(page2, '.frk-knife');
    await page2.mouse.move(kk2.x, kk2.y);
    await page2.mouse.down();
    for (let i = 1; i <= 6; i++) await page2.mouse.move(kk2.x + i * 3, kk2.y + i * 3);
    await page2.mouse.up();
    const mk = await page2.evaluate(() => window.__mk);
    /* 1 from onStart + 6 moves = 7. A single leaked quadruple would double it. */
    ok('B2 one handler per gesture after a cut (no stacking)', mk <= 9, `_moveKnife ran ${mk}× for 6 pointermoves (expected ~7)`);
    ok('B2 no js errors', page._errs.length === 0 && page2._errs.length === 0, page._errs[0] || page2._errs[0]);
    await page.close(); await page2.close();
  }

  /* ============================ C: share ================================ */
  console.log('C. share — plates, fair share, discussion moments');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    /* cut halves via tool call (mechanics proven in B), enter share */
    await page.evaluate(() => {
      const T = FractionKitchen;
      T.committed = [0]; T.sliced = true; T.mode = 'share'; T.friends = 2; T.render();
    });
    await sleep(300);
    const plates = await page.evaluate(() => document.querySelectorAll('.frk-plate').length);
    ok('2 plates with faces appear', plates === 2);
    await dragCenter(page, '.frk-piecebtn[data-piece="0"]', '.frk-plate[data-plate="0"]');
    let sh = await page.evaluate(() => ({
      placed: FractionKitchen.placed.length,
      onPlate: !!document.querySelector('.frk-plate[data-plate="0"] svg')
    }));
    ok('slice fly-drags onto a plate', sh.placed === 1 && sh.onPlate);
    /* second slice onto the SAME plate slides back */
    await dragCenter(page, '.frk-piecebtn[data-piece="1"]', '.frk-plate[data-plate="0"]');
    sh = await page.evaluate(() => ({ placed: FractionKitchen.placed.length, svgs: document.querySelectorAll('.frk-plate[data-plate="0"] svg').length }));
    ok('second slice on the same plate slides back', sh.placed === 1 && sh.svgs === 1);
    /* complete the share */
    await page.evaluate(() => { window.__spoken = []; });
    await dragCenter(page, '.frk-piecebtn[data-piece="1"]', '.frk-plate[data-plate="1"]');
    await sleep(700);
    const done = await page.evaluate(() => window.__spoken.join(' | '));
    ok('fair-share completion line speaks', /fair share/i.test(done), done);
    await page.screenshot({ path: path.join(QA, 'C-share-complete.png') });
    /* Faces never react to performance. Read the mouth off the ARTEFACT
       rather than matching a literal path (the previous version pinned
       the exact `d` string and went stale the moment the art changed):
       every friend wears the SAME curve, and it opens downward in SVG
       coordinates, which is a smile. */
    const mouths = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.frk-face path[stroke="#B4573C"]').forEach((p) => out.push(p.getAttribute('d')));
      return out;
    });
    const q = (mouths[0] || '').match(/q\s*[-\d.]+\s+([-\d.]+)/);
    ok('C non-vacuity: every friend has a mouth', mouths.length === 2, `found ${mouths.length}`);
    ok('faces keep the same warm smile', mouths.length === 2 && new Set(mouths).size === 1 && q && parseFloat(q[1]) > 0,
      JSON.stringify(mouths[0]));
    /* leftover discussion moment (premium: 3 friends, fourths) */
    const p2 = await newPage({ premium: true });
    await p2.goto(BASE);
    await ready(p2);
    await spy(p2);
    await p2.evaluate(() => {
      const T = FractionKitchen;
      T.n = 4; T.committed = [0, 1]; T.sliced = true; T.mode = 'share'; T.friends = 3; T.render();
    });
    await sleep(300);
    await p2.evaluate(() => { window.__spoken = []; });
    for (let i = 0; i < 3; i++) await dragCenter(p2, `.frk-piecebtn[data-piece="${i}"]`, `.frk-plate[data-plate="${i}"]`);
    await sleep(800);
    const leftover = await p2.evaluate(() => window.__spoken.join(' | '));
    ok('leftover speaks the observation line', /left over/i.test(leftover), leftover);
    const spokenCount = await p2.evaluate(() => window.__spoken.length);
    await sleep(1500);
    const later = await p2.evaluate(() => window.__spoken.length);
    ok('then the tool WAITS (no further audio)', later === spokenCount);
    await p2.screenshot({ path: path.join(QA, 'C-leftover-discussion.png') });
    ok('C no js errors', page._errs.length === 0 && p2._errs.length === 0, page._errs[0] || p2._errs[0]);
    await page.close(); await p2.close();
  }

  /* ============================ D: equivalence tray ===================== */
  console.log('D. equivalence tray (premium)');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    await page.evaluate(() => {
      const T = FractionKitchen;
      T.mode = 'equiv';
      T.equivTask = T.EQUIV[0];      /* ½ = 2×¼ pizza — deterministic */
      T.equivFilled = 0; T.equivMisses = 0;
      T.render();
    });
    await sleep(300);
    const trays = await page.evaluate(() => ({
      ref: !!document.querySelector('.frk-tray.ref'),
      fill: !!document.querySelector('.frk-tray.fill'),
      supply: document.querySelectorAll('.frk-supplypiece').length
    }));
    ok('ref + fill trays and 3 supply pieces render', trays.ref && trays.fill && trays.supply === 3);
    await page.evaluate(() => { window.__spoken = []; window.__notes = 0; });
    await dragCenter(page, '.frk-supplypiece[data-slot="0"]', '.frk-tray.fill');
    let eq = await page.evaluate(() => FractionKitchen.equivFilled);
    ok('first fourth snaps into the outline', eq === 1);
    await dragCenter(page, '.frk-supplypiece[data-slot="1"]', '.frk-tray.fill');
    await sleep(500);
    eq = await page.evaluate(() => ({
      filled: FractionKitchen.equivFilled,
      fit: document.querySelector('.frk-tray.fill').classList.contains('fit'),
      spoken: window.__spoken.join(' | '),
      notes: window.__notes
    }));
    ok('exact fit → honey glow', eq.filled === 2 && eq.fit);
    ok('equivDone line speaks', /fill it exactly/i.test(eq.spoken), eq.spoken);
    ok('fit dyad plays', eq.notes >= 2);
    await page.screenshot({ path: path.join(QA, 'D-tray-fit.png') });
    /* the extra piece glides back silently */
    await page.evaluate(() => { window.__spoken = []; });
    await dragCenter(page, '.frk-supplypiece[data-slot="2"]', '.frk-tray.fill');
    const extra = await page.evaluate(() => ({
      filled: FractionKitchen.equivFilled,
      used: document.querySelectorAll('.frk-supplypiece.used').length,
      spoken: window.__spoken.length
    }));
    ok('extra piece glides back silently', extra.filled === 2 && extra.used === 2 && extra.spoken === 0);
    ok('D no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ==================== D2: the board→tray path ==========================
     Section D drives ONLY `.frk-supplypiece`. The `up` handler in
     _wirePieces forks at its last line — share → _dropOnPlate, else →
     _dropOnTray — and nothing has ever taken the second branch, which is
     how a call to an undefined method shipped.

     The assertion is deliberately shaped to survive either repair: if the
     board keeps its pieces in equiv mode, dragging one must not throw; if
     the board stops rendering there, there is nothing to drag and the
     tool must still be alive. What is NOT allowed is an exception. */
  console.log('D2. board pieces in Fill-the-tray');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => {
      const T = FractionKitchen;
      T.food = 'pizza'; T.n = 4;
      T.committed = [0, 1]; T.sliced = true;      /* the child has cut it */
      T.mode = 'equiv';
      T.equivTask = T.EQUIV[0];                   /* pizza ½ = 2×¼ — deterministic */
      T.equivFilled = 0; T.equivMisses = 0;
      T.render();
    });
    await sleep(300);
    const hasPieces = await page.evaluate(() => document.querySelectorAll('.frk-piece[data-piece], .frk-piecebtn[data-piece]').length);
    if (hasPieces) {
      const sel = await page.evaluate(() =>
        document.querySelector('.frk-piecebtn[data-piece="0"]') ? '.frk-piecebtn[data-piece="0"]' : '.frk-piece[data-piece="0"]');
      await dragCenter(page, sel, '.frk-tray.fill');
    }
    ok('board piece dragged in equiv mode throws nothing', page._errs.length === 0, page._errs[0]);
    const alive = await page.evaluate(() => !!document.querySelector('.frk-dock') && !!document.querySelector('.frk-tray.fill'));
    ok('D2 the tool is still alive after the drag', alive);
    await page.close();
  }

  /* ============================ E: free vs premium ====================== */
  console.log('E. free vs premium');
  {
    const page = await newPage({});
    await page.goto(BASE + '?food=cake&n=8');
    await ready(page);
    const free = await page.evaluate(() => ({
      food: FractionKitchen.food, n: FractionKitchen.n,
      lockedChips: document.querySelectorAll('.frk-chip.locked').length
    }));
    ok('free: ?food=cake&n=8 suppressed to pizza', free.food === 'pizza' && (free.n === 2 || free.n === 4));
    ok('free: locked chips show locks', free.lockedChips >= 4);
    /* clicking a locked chip gates and does NOT switch */
    await page.evaluate(() => {
      const chips = [...document.querySelectorAll('.frk-chiprow:first-child .frk-chip')];
      chips.find((c) => c.classList.contains('locked')).click();
    });
    await sleep(300);
    const gated = await page.evaluate(() => ({
      gate: !!document.querySelector('.frk-gate'),
      href: document.querySelector('.frk-gate a') && document.querySelector('.frk-gate a').getAttribute('href'),
      food: FractionKitchen.food
    }));
    ok('locked chip gates instead of switching', gated.gate && gated.food === 'pizza');
    ok('gate links to pricing with from=', /from=tool-fraction-kitchen/.test(gated.href || ''), gated.href);
    await page.screenshot({ path: path.join(QA, 'E-free-gate.png') });
    const p2 = await newPage({ premium: true });
    await p2.goto(BASE + '?food=cake&n=8');
    await ready(p2);
    const prem = await p2.evaluate(() => ({ food: FractionKitchen.food, n: FractionKitchen.n }));
    ok('premium honors ?food=cake&n=8', prem.food === 'cake' && prem.n === 8);
    await p2.screenshot({ path: path.join(QA, 'E-premium-cake8.png') });
    ok('E no js errors', page._errs.length === 0 && p2._errs.length === 0, page._errs[0] || p2._errs[0]);
    await page.close(); await p2.close();
  }

  /* ============================ F: no-shame audit ======================= */
  console.log('F. no-shame audit');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    const audit = await page.evaluate(() => {
      const cs = (el) => {
        const s = getComputedStyle(el);
        return s.stroke + '|' + s.strokeDasharray + '|' + s.strokeWidth;
      };
      const c = document.querySelector('.frk-guide[data-kind="c"]');
      /* the decoy is no longer DRAWN at all — the overlay shows only the
         true equal-parts figure, and the beat is reached by cutting
         freehand instead. So the invariant flipped: there must be none. */
      const decoys = document.querySelectorAll('.frk-guide[data-kind="d"]').length;
      const guides = document.querySelectorAll('.frk-guide').length;
      /* red / verdict-green sweep over rendered UI colors */
      const badColors = [];
      const isBad = (col) => {
        const m = col && col.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return false;
        const [r, g, b] = [+m[1], +m[2], +m[3]];
        if (r > 185 && g < 90 && b < 90) return true;               /* alarm red */
        if (g > 150 && r < 100 && b < 100) return true;             /* verdict green */
        return false;
      };
      document.querySelectorAll('.frk-wrap *').forEach((el) => {
        const s = getComputedStyle(el);
        [s.color, s.backgroundColor, s.borderColor, s.stroke, s.fill].forEach((col) => {
          if (isBad(col)) badColors.push(el.className + ':' + col);
        });
      });
      const glyphs = /[✗✘❌]/.test(document.body.textContent);
      return { decoys, guides, hasC: !!c, badColors: badColors.slice(0, 3), glyphs };
    });
    ok('F non-vacuity: the true guides ARE drawn', audit.hasC && audit.guides >= 1, `guides=${audit.guides}`);
    ok('no decoy line is drawn among the guides', audit.decoys === 0, `decoys=${audit.decoys}`);
    ok('no alarm-red / verdict-green anywhere', audit.badColors.length === 0, audit.badColors.join('; '));
    ok('no ✗ glyphs', !audit.glyphs);
    /* strings sweep: no timer/score words leak into the DOM */
    const words = await page.evaluate(() => /\b(score|timer|streak|points)\b/i.test(document.body.textContent));
    ok('no score/timer vocabulary in the DOM', !words);
    ok('F no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ G: reduced motion ======================= */
  console.log('G. reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    await freeCut(page, { x: 32, y: 8 }, { x: 32, y: 92 });   /* ~22/78 — a real, lopsided attempt */
    await sleep(500);
    const held = await page.evaluate(() => document.querySelector('.frk-foodbox').classList.contains('unequal'));
    ok('reduced motion still shows the unequal hold', held);
    await sleep(1500);
    const healed = await page.evaluate(() => !document.querySelector('.frk-foodbox').classList.contains('unequal') && document.querySelectorAll('.frk-guide').length === 1);
    ok('reduced motion heals without animation', healed);
    await knifeCut(page, 'c', 0, 1);
    await sleep(300);
    const cut = await page.evaluate(() => FractionKitchen.sliced);
    ok('reduced motion cut still works', cut);
    ok('G no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ H: keyboard ============================= */
  console.log('H. keyboard + tap parity (the APPARATUS, not just the chrome)');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    const reached = await page.evaluate(async () => {
      const chips = [...document.querySelectorAll('.frk-chip')];
      chips[0].focus();
      return document.activeElement.classList.contains('frk-chip');
    });
    ok('chips are focusable buttons', reached);
    const allButtons = await page.evaluate(() => [...document.querySelectorAll('.frk-chip')].every((b) => b.tagName === 'BUTTON'));
    ok('every chip is a real <button>', allButtons);

    /* the old H checked only the dock. The apparatus itself — the knife,
       the cut lines, the pieces, the plates — was pointer-drag only, so
       "keyboard reachability" certified the chrome and called it done. */
    const shape = await page.evaluate(() => ({
      cutBtns: document.querySelectorAll('.frk-cutbtn').length,
      allBtn: [...document.querySelectorAll('.frk-cutbtn')].every((b) => b.tagName === 'BUTTON'),
      knifeBtn: !!document.querySelector('button.frk-knife-btn'),
      /* the no-telegraph lock, extended to the accessibility tree */
      labels: [...new Set([...document.querySelectorAll('.frk-cutbtn')].map((b) => b.getAttribute('aria-label')))]
    }));
    /* the floor is DERIVED from the model, not invented: one button per
       uncommitted correct cut of the current (food, n) */
    const want = await page.evaluate(() => FractionKitchen.cuts(FractionKitchen.food, FractionKitchen.n).correct.length);
    ok('H non-vacuity: one real button per correct cut', shape.cutBtns === want && shape.allBtn && want >= 1,
      `buttons=${shape.cutBtns} expected=${want}`);
    ok('H the knife is a real <button>', shape.knifeBtn);
    ok('H every cut target carries the SAME aria-label (no telegraphing to a screen reader)',
      shape.labels.length === 1 && !!shape.labels[0], JSON.stringify(shape.labels));

    /* the overlay's percentage maths is exact only on a square box */
    const box = await page.evaluate(() => {
      const r = document.querySelector('.frk-foodbox').getBoundingClientRect();
      return { w: r.width, h: r.height };
    });
    ok('H the foodbox renders SQUARE (the hit overlay depends on it)',
      Math.abs(box.w - box.h) <= 1, `${box.w.toFixed(1)}×${box.h.toFixed(1)}`);

    /* knife → Enter → focus lands on a cut target → Enter → it cuts */
    await page.evaluate(() => document.querySelector('.frk-knife-btn').focus());
    await page.keyboard.press('Enter');
    await sleep(150);
    const armed = await page.evaluate(() => ({
      on: document.querySelector('.frk-foodbox').classList.contains('guides-on'),
      focused: document.activeElement && document.activeElement.classList.contains('frk-cutbtn')
    }));
    ok('H Enter on the knife arms the board and focuses a cut target', armed.on && armed.focused,
      `guides-on=${armed.on} focused=${armed.focused}`);
    await page.keyboard.press('Enter');
    await sleep(300);
    const cut = await page.evaluate(() => ({ committed: FractionKitchen.committed.length, sliced: FractionKitchen.sliced }));
    ok('H Enter on a cut target cuts', cut.committed >= 1 || cut.sliced, `committed=${cut.committed}`);
    ok('H no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }
  {
    /* tap-to-select, then tap a plate — the touch path that needs no drag */
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => {
      const T = FractionKitchen;
      T.food = 'pizza'; T.n = 2; T.committed = [0]; T.sliced = true;
      T.mode = 'share'; T.friends = 2; T.placed = [];
      T.render();
    });
    await sleep(250);
    await page.click('.frk-piecebtn[data-piece="0"]');
    await sleep(150);
    const sel = await page.evaluate(() => ({
      sel: FractionKitchen._sel,
      pressed: document.querySelector('.frk-piecebtn[data-piece="0"]').getAttribute('aria-pressed')
    }));
    ok('H tapping a piece SELECTS it (and says so in aria-pressed)', sel.sel === 0 && sel.pressed === 'true',
      `sel=${sel.sel} aria-pressed=${sel.pressed}`);
    await page.click('.frk-plate[data-plate="0"]');
    await sleep(300);
    const placed = await page.evaluate(() => FractionKitchen.placed.length);
    ok('H tapping a plate PLACES the selected piece — no drag needed', placed === 1, `placed=${placed}`);
    /* a plate with nothing selected still acts: it takes the next piece */
    await page.click('.frk-plate[data-plate="1"]');
    await sleep(300);
    const placed2 = await page.evaluate(() => FractionKitchen.placed.length);
    ok('H a plate is never a dead control (takes the next piece unprompted)', placed2 === 2, `placed=${placed2}`);
    ok('H tap-path no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ T: TOUCH ================================
     The defect the operator reported. Every assertion below is on a real
     touch pointer at a phone viewport — the first in this repo; there is
     no dispatchTouchEvent or .touchscreen. anywhere else in scripts/.

     Three surfaces, three outcomes, and for each one `pointercancel === 0`,
     because a cancel IS the defect: it is the browser deciding mid-gesture
     that the child meant to scroll the page. */
  console.log('T. touch pointer (412×915, hasTouch)');
  {
    /* T1 — the knife along a correct guide */
    const page = await newPage({ w: 412, h: 915, touch: true });
    await page.goto(BASE);
    await ready(page);
    await armTouchWatch(page);
    const knife = await centerOf(page, '.frk-knife');
    const g = await guidePts(page, 'c', 0).catch(() => null);
    ok('T1 non-vacuity: knife and guide 0 are both on screen', !!knife && !!g,
      `knife=${JSON.stringify(knife)} guide=${g ? 'ok' : 'missing'}`);
    if (knife && g) {
      /* press the knife, travel to the guide, then along it */
      const t = await page.touchscreen.touchStart(knife.x, knife.y);
      for (let i = 1; i <= 4; i++) { await t.move(knife.x + (g.a.x - knife.x) * i / 4, knife.y + (g.a.y - knife.y) * i / 4); await sleep(24); }
      for (let i = 1; i <= 12; i++) { await t.move(g.a.x + (g.b.x - g.a.x) * i / 12, g.a.y + (g.b.y - g.a.y) * i / 12); await sleep(24); }
      await t.end();
      await sleep(300);
      const st = await page.evaluate(() => ({ committed: FractionKitchen.committed.length, sliced: FractionKitchen.sliced }));
      const w = await touchWatch(page);
      ok('T1 a touch drag along a guide CUTS', st.committed >= 1 || st.sliced, `committed=${st.committed} sliced=${st.sliced}`);
      ok('T1 no pointercancel — the browser never took it for a pan', w.cancels === 0, `cancels=${w.cancels}`);
      ok('T1 the page did not scroll instead of cutting', w.scrollTop === 0, `scrollTop=${w.scrollTop}`);
    }
    ok('T1 no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }
  {
    /* T2 — a cut piece onto a plate */
    const page = await newPage({ w: 412, h: 915, touch: true });
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => {
      const T = FractionKitchen;
      T.food = 'pizza'; T.n = 2; T.committed = [0]; T.sliced = true;
      T.mode = 'share'; T.friends = 2; T.placed = [];
      T.render();
    });
    await sleep(300);
    await armTouchWatch(page);
    const pieceSel = await page.evaluate(() =>
      document.querySelector('.frk-piecebtn[data-piece="0"]') ? '.frk-piecebtn[data-piece="0"]' : '.frk-piece[data-piece="0"]');
    const from = await centerOf(page, pieceSel);
    const to = await centerOf(page, '.frk-plate');
    ok('T2 non-vacuity: a cut piece and a plate are both on screen', !!from && !!to);
    if (from && to) {
      await touchDrag(page, from, to);
      const placed = await page.evaluate(() => FractionKitchen.placed.length);
      const w = await touchWatch(page);
      ok('T2 a touch drag puts a slice on a plate', placed === 1, `placed=${placed}`);
      ok('T2 no pointercancel', w.cancels === 0, `cancels=${w.cancels}`);
      ok('T2 the page did not scroll', w.scrollTop === 0, `scrollTop=${w.scrollTop}`);
    }
    ok('T2 no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }
  {
    /* T3 — a supply chip into the tray */
    const page = await newPage({ w: 412, h: 915, touch: true, premium: true });
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => {
      const T = FractionKitchen;
      T.mode = 'equiv'; T.equivTask = T.EQUIV[0];
      T.equivFilled = 0; T.equivMisses = 0;
      T.render();
    });
    await sleep(300);
    await armTouchWatch(page);
    const from = await centerOf(page, '.frk-supplypiece[data-slot="0"]');
    const to = await centerOf(page, '.frk-tray.fill');
    ok('T3 non-vacuity: a supply chip and the fill tray are both on screen', !!from && !!to);
    if (from && to) {
      await touchDrag(page, from, to);
      const filled = await page.evaluate(() => FractionKitchen.equivFilled);
      const w = await touchWatch(page);
      ok('T3 a touch drag fills a tray slot', filled === 1, `equivFilled=${filled}`);
      ok('T3 no pointercancel', w.cancels === 0, `cancels=${w.cancels}`);
      ok('T3 the page did not scroll', w.scrollTop === 0, `scrollTop=${w.scrollTop}`);
    }
    ok('T3 no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + bad.join(' · ')); process.exit(1); }
  console.log('local-test-fraction-kitchen: ALL GREEN');
})();
