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

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/fraction-kitchen.html`;
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
      const el = document.querySelector(`.frk-hit[data-kind="${kind}"][data-idx="${idx}"]`);
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
  async function dragCenter(page, fromSel, toSel) {
    const from = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, fromSel);
    const to = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, toSel);
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(from.x + (to.x - from.x) * i / 8, from.y + (to.y - from.y) * i / 8);
    await page.mouse.up();
    await sleep(250);
  }

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
    /* reset via Cut again, then the DISTRACTOR unequal-beat */
    await page.evaluate(() => { window.__spoken = []; });
    await page.click('.frk-dock .frk-chiprow:nth-child(2) .frk-chip:last-child');
    await sleep(300);
    await knifeCut(page, 'd', 0, 1);
    await sleep(500);
    const beat = await page.evaluate(() => ({
      unequal: document.querySelector('.frk-foodbox').classList.contains('unequal'),
      groups: document.querySelectorAll('.frk-uneq').length
    }));
    ok('distractor → unequal-beat shows 2 separated groups', beat.unequal && beat.groups === 2);
    await page.screenshot({ path: path.join(QA, 'B-unequal-beat.png') });
    await sleep(1600);
    const healed = await page.evaluate(() => ({
      unequal: document.querySelector('.frk-foodbox').classList.contains('unequal'),
      guides: document.querySelectorAll('.frk-guide').length,
      committed: FractionKitchen.committed.length,
      spoke: window.__spoken.some((s) => /same size/i.test(s))
    }));
    ok('beat heals; guides return unmarked; nothing committed', !healed.unequal && healed.guides === 2 && healed.committed === 0);
    ok('kind voice line spoke once', healed.spoke);
    /* second distractor cut: silent (≤1 per food) */
    await page.evaluate(() => { window.__spoken = []; });
    await knifeCut(page, 'd', 0, 1);
    await sleep(2000);
    const second = await page.evaluate(() => window.__spoken.some((s) => /same size/i.test(s)));
    ok('second distractor is silent (≤1 voice line per food)', !second);
    /* tap-to-cut fallback */
    const g = await guidePts(page, 'c', 0);
    await page.mouse.click((g.a.x + g.b.x) / 2, (g.a.y + g.b.y) / 2);
    await sleep(400);
    const tapped = await page.evaluate(() => FractionKitchen.sliced);
    ok('tap-to-cut fallback commits', tapped === true);
    ok('B no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
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
    await dragCenter(page, '.frk-piece[data-piece="0"]', '.frk-plate[data-plate="0"]');
    let sh = await page.evaluate(() => ({
      placed: FractionKitchen.placed.length,
      onPlate: !!document.querySelector('.frk-plate[data-plate="0"] svg')
    }));
    ok('slice fly-drags onto a plate', sh.placed === 1 && sh.onPlate);
    /* second slice onto the SAME plate slides back */
    await dragCenter(page, '.frk-piece[data-piece="1"]', '.frk-plate[data-plate="0"]');
    sh = await page.evaluate(() => ({ placed: FractionKitchen.placed.length, svgs: document.querySelectorAll('.frk-plate[data-plate="0"] svg').length }));
    ok('second slice on the same plate slides back', sh.placed === 1 && sh.svgs === 1);
    /* complete the share */
    await page.evaluate(() => { window.__spoken = []; });
    await dragCenter(page, '.frk-piece[data-piece="1"]', '.frk-plate[data-plate="1"]');
    await sleep(700);
    const done = await page.evaluate(() => window.__spoken.join(' | '));
    ok('fair-share completion line speaks', /fair share/i.test(done), done);
    await page.screenshot({ path: path.join(QA, 'C-share-complete.png') });
    /* faces never frown: the face path is the same smile before/after */
    const smile = await page.evaluate(() => document.querySelectorAll('.frk-face path[d*="q5.5 4.5 11 0"]').length);
    ok('faces keep the same warm smile', smile === 2);
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
    for (let i = 0; i < 3; i++) await dragCenter(p2, `.frk-piece[data-piece="${i}"]`, `.frk-plate[data-plate="${i}"]`);
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
      const d = document.querySelector('.frk-guide[data-kind="d"]');
      const identical = c && d && cs(c) === cs(d);
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
      return { identical, badColors: badColors.slice(0, 3), glyphs };
    });
    ok('distractor guide styled IDENTICALLY to correct guide', audit.identical);
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
    await knifeCut(page, 'd', 0, 1);
    await sleep(500);
    const held = await page.evaluate(() => document.querySelector('.frk-foodbox').classList.contains('unequal'));
    ok('reduced motion still shows the unequal hold', held);
    await sleep(1500);
    const healed = await page.evaluate(() => !document.querySelector('.frk-foodbox').classList.contains('unequal') && document.querySelectorAll('.frk-guide').length === 2);
    ok('reduced motion heals without animation', healed);
    await knifeCut(page, 'c', 0, 1);
    await sleep(300);
    const cut = await page.evaluate(() => FractionKitchen.sliced);
    ok('reduced motion cut still works', cut);
    ok('G no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ H: keyboard ============================= */
  console.log('H. keyboard reachability');
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
    ok('H no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + bad.join(' · ')); process.exit(1); }
  console.log('local-test-fraction-kitchen: ALL GREEN');
})();
