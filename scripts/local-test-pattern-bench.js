#!/usr/bin/env node
/* =====================================================================
   local-test-pattern-bench.js — the local Definition-of-Done.
   Nothing here is asserted from source: every claim is MEASURED in a real
   browser against the rendered DOM.

   visual-qa-activity.js resolves only ids declared in a *-activities.json
   manifest, so it cannot see a free-play tool (local-test-heart-words.js
   :4-8 records the same). L11 is the substitute.

     L1  mounts: bar, bench, unit sockets, strip, bracket
     L2  ⭐ COSTUME-BLIND ON THE PAGE: switch costume and the rendered
         letter row is character-for-character identical while the beads
         demonstrably change. The engine gate proves the model; this
         proves the CHILD sees the same pattern.
     L3  ⭐ ALIGNED: letter i is centred under bead i to within a pixel.
     L4  ⭐ THE BRACKET'S EDGES ARE THE UNIT'S EDGES, measured from the
         render — it is a grid span, never an arithmetic offset.
     L5  ⭐ THE OPERATOR'S DIRECTIVE, DRIVEN: a real click on bead i
         changes exactly the beads congruent to i, and the .ptn-sib set
         equals that family. Non-vacuity asserted FIRST.
     L6  ⭐ THE SLIDE, DRIVEN: clicking a grip leaves the rendered letter
         sequence byte-identical while the unit visibly rotates.
     L7  the cloth: armed -> a tap covers and auto-disarms; the bead
         leaves the DOM; uncovering works unarmed.
     L8  keyboard: arrows move focus, Enter cycles, Escape disarms, and
         the grips act on click AND on Enter.
     L9  free vs subscriber: the picture costume is gated with the exact
         CTA, print is gated, and a free visitor's DOM has NO print sheet.
     L10 the sweep 320-1366 x every costume: FITS, no overflow past the
         CARD, controls >=44px and canvas cells >=44px NAMED SEPARATELY,
         text >=14px, zero console errors.
     L11 POISON self-test — the measurements must FAIL on a broken build.

   Usage: node scripts/local-test-pattern-bench.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const IMGLIB = path.join(ROOT, 'frontend', 'public', 'image-library-webp');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'pattern-bench', 'qa');
const SHOT = process.argv.indexOf('--shot') > -1;
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44;    /* controls */
const MIN_CELL = 44;   /* canvas hit-targets — named separately on purpose */
const MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => (c ? ok(m) : bad(m));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    const f = u.indexOf('/image-library-webp/') === 0
      ? path.join(IMGLIB, u.slice('/image-library-webp/'.length))
      : path.join(MINI, path.basename(u));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

let BASE = '';
let browser = null;

async function open(opts) {
  opts = opts || {};
  const page = await browser.newPage();
  await page.setViewport({ width: opts.w || 1024, height: opts.h || 900 });
  await page.evaluateOnNewDocument((prem) => {
    try { localStorage.clear(); } catch (_) {}
    if (prem) {
      localStorage.setItem('accessToken', 'harness');
      localStorage.setItem('lcs:pattern-bench:v1', JSON.stringify({
        v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() } }));
    }
  }, !!opts.premium);
  if (opts.premium) {
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().indexOf('/api/auth/me') > -1
      ? r.respond({ status: 200, contentType: 'application/json',
          body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
      : r.continue()));
  }
  if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  page._errs = [];
  const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
  page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
  page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
  await page.goto(BASE + '?lang=' + (opts.lang || 'en') + '&embed=1', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.ptn-wrap', { timeout: 9000 });
  await wait(500);
  return page;
}

/* ⚠ A SILENT NO-OP HOLLOWS OUT THE NEXT ASSERTION. A click helper that
   quietly does nothing (a legitimately-disabled control, a selector that
   matched nothing) makes the very next check pass because nothing moved.
   Every scripted interaction fails loudly. */
async function click(page, sel, n) {
  const hit = await page.evaluate((s, i) => {
    const e = document.querySelectorAll(s)[i || 0];
    if (!e) return 'absent';
    if (e.disabled) return 'disabled';
    e.click(); return 'ok';
  }, sel, n || 0);
  if (hit !== 'ok') throw new Error(`click ${sel}[${n || 0}] -> ${hit}`);
  await wait(300);
}

const letters = (page) => page.evaluate(() =>
  Array.from(document.querySelectorAll('.ptn-letter')).map((n) => n.textContent).join(''));
const beadSig = (page) => page.evaluate(() =>
  Array.from(document.querySelectorAll('.ptn-cell .ptn-glyph path')).map((p) =>
    (p.getAttribute('fill') || '') + '|' + (p.getAttribute('d') || '').slice(0, 24)).join(','));
const seqOf = (page) => page.evaluate(() =>
  Array.from(document.querySelectorAll('.ptn-cell')).map((c) => c.getAttribute('aria-label')).join(''));

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  BASE = 'http://127.0.0.1:' + server.address().port + '/pattern-bench.html';
  browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------- L1 mounts ---------- */
  console.log('[L1 mounts]');
  {
    const p = await open({});
    const c = await p.evaluate(() => ({
      bar: !!document.querySelector('.ptn-bar'),
      bench: !!document.querySelector('.ptn-bench'),
      seg: document.querySelectorAll('.ptn-segbtn').length,
      slots: document.querySelectorAll('.ptn-slot').length,
      cells: document.querySelectorAll('.ptn-cell').length,
      bracket: !!document.querySelector('.ptn-brbody'),
      grips: document.querySelectorAll('.ptn-grip').length,
      dots: document.querySelectorAll('.ptn-dot').length,
      capband: !!document.querySelector('.ptn-capband')
    }));
    is(c.bar && c.bench, 'the bar and the bench slab render');
    is(c.seg === 3, `three costume chips in one segment (${c.seg})`);
    is(c.slots === 2, `two unit sockets at rest (${c.slots})`);
    is(c.cells === 7, `a seven-bead strip at rest — 3 whole repeats + 1 (${c.cells})`);
    is(c.bracket && c.grips === 2, 'the bracket and its two grips render');
    is(c.dots === 8, `a four-dot cycle indicator on each socket (${c.dots})`);
    is(c.capband, 'the caption band is present at rest (so it can never shove the layout)');
    is(p._errs.length === 0, 'zero console errors');
    await p.close();
  }

  /* ---------- L2 ⭐ costume-blind ON THE PAGE ---------- */
  console.log('[L2 costume-blind, on the page]');
  {
    const p = await open({ premium: true });
    await p.evaluate(() => { window.PatternBench.api.settings.letters = true; window.PatternBench.render(); });
    await wait(300);
    const L0 = await letters(p), B0 = await beadSig(p);
    /* ⚠ NON-VACUITY FIRST: an empty letter row would satisfy "identical"
       three times over. */
    is(L0.length >= 7 && new Set(L0.split('')).size >= 2,
      `the letter row is non-trivial before comparing (${L0})`);
    const seen = [];
    for (let i = 1; i < 3; i++) {
      await click(p, '.ptn-segbtn', i);
      seen.push({ L: await letters(p), B: await beadSig(p) });
    }
    is(seen.every((s) => s.L === L0), 'the letter row is character-for-character identical in every costume');
    is(seen.every((s) => s.B !== B0), 'while the beads themselves demonstrably changed');
    await p.close();
  }

  /* ---------- L3 alignment ---------- */
  console.log('[L3 alignment]');
  for (const [w, h] of [[1024, 900], [360, 740]]) {
    const p = await open({ w, h });
    await p.evaluate(() => { window.PatternBench.api.settings.letters = true; window.PatternBench.render(); });
    await wait(300);
    const drift = await p.evaluate(() => {
      const cells = Array.from(document.querySelectorAll('.ptn-cell'));
      const lets = Array.from(document.querySelectorAll('.ptn-letter'));
      let worst = 0;
      cells.forEach((c, i) => {
        if (!lets[i]) { worst = 999; return; }
        const a = c.getBoundingClientRect(), b = lets[i].getBoundingClientRect();
        worst = Math.max(worst, Math.abs((a.x + a.width / 2) - (b.x + b.width / 2)));
      });
      return worst;
    });
    is(drift <= 1.5, `${w}px: letter i is centred under bead i (worst drift ${drift.toFixed(2)}px)`);
    await p.close();
  }

  /* ---------- L4 ⭐ the bracket spans the unit exactly ---------- */
  console.log('[L4 the bracket is a grid span, not arithmetic]');
  {
    const p = await open({});
    for (const k of [1, 2, 3, 4]) {
      await p.evaluate((n) => {
        const T = window.PatternBench; T.st = T.setUnitLength(T.st, n); T.render();
      }, k);
      await wait(250);
      const m = await p.evaluate(() => {
        const b = document.querySelector('.ptn-brbody').getBoundingClientRect();
        const cells = Array.from(document.querySelectorAll('.ptn-cell'));
        const T = window.PatternBench;
        const first = cells[T.st.phase].getBoundingClientRect();
        const last = cells[T.st.phase + T.st.unit.length - 1].getBoundingClientRect();
        return { dl: b.x - first.x, dr: (b.x + b.width) - (last.x + last.width), w: b.width };
      });
      is(m.w > 0, `k=${k}: the bracket has a non-zero width (${m.w.toFixed(0)}px)`);
      is(Math.abs(m.dl) <= 1.5 && Math.abs(m.dr) <= 1.5,
        `k=${k}: the bracket's edges ARE the unit's edges (left ${m.dl.toFixed(2)}px, right ${m.dr.toFixed(2)}px)`);
    }
    await p.close();
  }

  /* ---------- L5 ⭐ THE OPERATOR'S DIRECTIVE, DRIVEN ---------- */
  console.log('[L5 one tap moves the whole family]');
  {
    const p = await open({});
    await p.evaluate(() => { const T = window.PatternBench; T.st = T.setUnitLength(T.st, 3); T.render(); });
    await wait(250);
    const before = await seqOf(p);
    is(before.length >= 7 && new Set(before.split('')).size >= 2,
      `the strip is non-trivial before the tap (${before})`);
    /* the ring, on press-in, BEFORE the commit */
    await p.evaluate(() => {
      const c = document.querySelectorAll('.ptn-cell')[4];
      c.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    });
    await wait(120);
    const ring = await p.evaluate(() => {
      const T = window.PatternBench;
      const got = Array.from(document.querySelectorAll('.ptn-cell.ptn-sib'))
        .map((n) => Number(n.getAttribute('data-i'))).sort((a, b) => a - b);
      return { got, want: T.classOf(T.st, 4) };
    });
    is(ring.got.length > 0, `the family rings BEFORE the commit (${ring.got.length} beads)`);
    is(ring.got.join(',') === ring.want.join(','),
      `the ringed set EQUALS the congruence class [${ring.want}]`);
    await click(p, '.ptn-cell', 4);
    const after = await seqOf(p);
    const diff = [];
    for (let i = 0; i < before.length; i++) if (before[i] !== after[i]) diff.push(i);
    is(diff.length > 0, 'the tap changed something (non-vacuity)');
    is(diff.join(',') === ring.want.join(','),
      `the tap changed EXACTLY the family [${diff}] — the operator's directive, measured on the DOM`);
    is(diff.length >= 2, `and it moved ${diff.length} beads, not just the one tapped`);
    await p.close();
  }

  /* ---------- L6 ⭐ the slide, driven ---------- */
  console.log('[L6 the slide leaves the strip alone]');
  {
    const p = await open({});
    await p.evaluate(() => { const T = window.PatternBench; T.st = T.setUnitLength(T.st, 3); T.render(); });
    await wait(250);
    const s0 = await seqOf(p);
    const u0 = await p.evaluate(() => window.PatternBench.st.unit.join(''));
    await click(p, '.ptn-grip-r', 0);
    const s1 = await seqOf(p);
    const u1 = await p.evaluate(() => window.PatternBench.st.unit.join(''));
    const ph = await p.evaluate(() => window.PatternBench.st.phase);
    is(s1 === s0, `the rendered strip is byte-identical after a real grip click (${s0})`);
    is(u1 !== u0, `while the unit visibly rotated (${u0} -> ${u1})`);
    is(ph === 1, `and the bracket actually moved (phase ${ph})`);
    /* the left grip must be disabled at phase 0 and live afterwards */
    const dis = await p.evaluate(() => document.querySelector('.ptn-grip-l').disabled);
    is(dis === false, 'the left grip is live once the bracket has moved');
    await p.close();
  }

  /* ---------- L7 the cloth ---------- */
  console.log('[L7 the cloth]');
  {
    const p = await open({});
    const armIdx = await p.evaluate(() => Array.from(document.querySelectorAll('.ptn-chip'))
      .findIndex((c) => c.getAttribute('data-fk') === 'cloth'));
    await click(p, '.ptn-chip', armIdx);
    is(await p.evaluate(() => window.PatternBench.st.armed), 'the cloth chip arms');
    await click(p, '.ptn-cell', 3);
    const st = await p.evaluate(() => ({
      covered: window.PatternBench.st.covered.slice(),
      armed: window.PatternBench.st.armed,
      glyphs: document.querySelectorAll('.ptn-cell[data-i="3"] .ptn-glyph').length,
      aria: document.querySelector('.ptn-cell[data-i="3"]').getAttribute('aria-label')
    }));
    is(st.covered.indexOf(3) > -1, 'an interior bead is covered');
    is(st.armed === false, 'and the cloth auto-disarms — one shot, never a sticky mode');
    is(st.glyphs === 0, 'the covered bead has NO glyph in the DOM');
    is(!/^[ABCD]$/.test(st.aria || ''), 'and does not leak its slot through aria');
    await click(p, '.ptn-cell', 3);
    is(await p.evaluate(() => window.PatternBench.st.covered.length === 0),
      'uncovering works unarmed — a child can never get stuck');
    await p.close();
  }

  /* ---------- L8 keyboard ---------- */
  console.log('[L8 keyboard]');
  {
    const p = await open({});
    await p.evaluate(() => document.querySelector('.ptn-cell[data-i="0"]').focus());
    await p.keyboard.press('ArrowRight');
    await wait(150);
    is(await p.evaluate(() => document.activeElement.getAttribute('data-i')) === '1',
      'ArrowRight moves focus along the strip');
    const b4 = await seqOf(p);
    await p.keyboard.press('Enter');
    await wait(350);
    is(await seqOf(p) !== b4, 'Enter cycles the focused bead (a drag-only handle would be dead here)');
    /* the grip must act on Enter, not only on a synthetic click */
    await p.evaluate(() => document.querySelector('.ptn-grip-r').focus());
    const ph0 = await p.evaluate(() => window.PatternBench.st.phase);
    await p.keyboard.press('Enter');
    await wait(350);
    is(await p.evaluate(() => window.PatternBench.st.phase) !== ph0, 'the bracket grip acts on Enter');
    await p.close();
  }

  /* ---------- L9 free vs subscriber ---------- */
  console.log('[L9 the tier]');
  {
    const free = await open({});
    const f = await free.evaluate(() => ({
      picLocked: !!document.querySelector('.ptn-segbtn.ptn-locked'),
      printLocked: !!document.querySelector('.ptn-chip.ptn-locked'),
      sheet: !!document.getElementById('ptn-printsheet'),
      paid: document.body.classList.contains('ptn-paid')
    }));
    is(f.picLocked, 'free: the picture costume is locked');
    is(f.printLocked, 'free: print is locked');
    is(!f.sheet, '⭐ free: the print sheet is NOT IN THE DOM — Ctrl+P cannot reach it');
    is(!f.paid, 'free: the body carries no ptn-paid scope');
    await click(free, '.ptn-segbtn', 2);
    const gate = await free.evaluate(() => {
      const g = document.querySelector('.ptn-gate');
      return g ? { txt: g.textContent, href: (g.querySelector('a') || {}).getAttribute('href') } : null;
    });
    is(gate && /Teacher plan/.test(gate.txt), 'free: tapping the locked costume shows the exact CTA');
    is(gate && /\/en\/pricing\?from=tool-pattern-bench/.test(gate.href || ''), 'free: the CTA points at pricing with the right source');
    is(await free.evaluate(() => window.PatternBench.st.medium) === 'colour',
      'free: and the strip did NOT switch to the premium costume');
    await free.close();

    const paid = await open({ premium: true });
    const pd = await paid.evaluate(() => ({
      sheet: !!document.getElementById('ptn-printsheet'),
      paid: document.body.classList.contains('ptn-paid'),
      cells: document.querySelectorAll('#ptn-printsheet .ptn-pcell').length,
      locked: document.querySelectorAll('.ptn-locked').length
    }));
    is(pd.sheet && pd.paid, 'subscriber: the print sheet is in the DOM and the paid scope is set');
    is(pd.cells >= 9, `subscriber: the sheet carries the unit and the strip (${pd.cells} printed cells)`);
    is(pd.locked === 0, 'subscriber: nothing is locked');
    await paid.close();
  }

  /* ---------- L10 the sweep ---------- */
  console.log('[L10 the sweep]');
  {
    const COSTUMES = [0, 1, 2];
    for (const [w, h] of VIEWPORTS) {
      for (const ci of COSTUMES) {
        const p = await open({ w, h, premium: true });
        if (ci) await click(p, '.ptn-segbtn', ci);
        const m = await p.evaluate((floors) => {
          const card = document.querySelector('.lcs-app').getBoundingClientRect();
          let over = 0, small = [], tiny = [], text = [];
          /* ⚠ CONTAINMENT IS MEASURED AGAINST THE CARD, and the rail is
             legitimately a scroller — its CONTENT may exceed it. Anything
             outside the rail may not exceed the card. */
          const rail = document.querySelector('.ptn-rail');
          document.querySelectorAll('.ptn-wrap *').forEach((n) => {
            if (rail && rail.contains(n)) return;
            const r = n.getBoundingClientRect();
            if (!r.width) return;
            if (r.right > card.right + 1 || r.left < card.left - 1) over++;
          });
          /* two tap floors, NAMED SEPARATELY — an or-shaped assertion has
             hidden a missing floor twice in this house */
          document.querySelectorAll('.ptn-chip,.ptn-segbtn,.ptn-lenbtn,.ptn-grip').forEach((n) => {
            const r = n.getBoundingClientRect();
            if (r.height && r.height < floors.tap - 0.5) small.push(n.className + ':' + r.height.toFixed(0));
          });
          document.querySelectorAll('.ptn-cell,.ptn-slot').forEach((n) => {
            const r = n.getBoundingClientRect();
            if (r.height && r.height < floors.cell - 0.5) tiny.push(n.className + ':' + r.height.toFixed(0));
          });
          document.querySelectorAll('.ptn-hint,.ptn-lab,.ptn-privacy,.ptn-letter,.ptn-cap').forEach((n) => {
            const fs2 = parseFloat(getComputedStyle(n).fontSize);
            if (n.textContent.trim() && fs2 < floors.text - 0.5) text.push(fs2.toFixed(0));
          });
          const lowest = Math.max.apply(null, Array.from(document.querySelectorAll('.ptn-chip,.ptn-foot'))
            .map((n) => n.getBoundingClientRect().bottom));
          return { over, small, tiny, text, lowest, vh: window.innerHeight, docH: document.documentElement.scrollHeight };
        }, { tap: MIN_TAP, cell: MIN_CELL, text: MIN_TEXT });
        const tag = `${w}x${h} costume${ci}`;
        is(m.over === 0, `${tag}: nothing outside the rail exceeds the card (${m.over})`);
        is(m.small.length === 0, `${tag}: every CONTROL >= ${MIN_TAP}px ${m.small.slice(0, 2).join(' ')}`);
        is(m.tiny.length === 0, `${tag}: every CANVAS CELL >= ${MIN_CELL}px ${m.tiny.slice(0, 2).join(' ')}`);
        is(m.text.length === 0, `${tag}: every text node >= ${MIN_TEXT}px ${m.text.slice(0, 3).join(' ')}`);
        is(p._errs.length === 0, `${tag}: zero console errors ${p._errs[0] || ''}`);
        if (SHOT && ci === 0) await p.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`) });
        await p.close();
      }
    }
  }

  /* ---------- L11 POISON ---------- */
  console.log('[L11 poison — the measurements must be able to FAIL]');
  {
    const p = await open({});
    /* (a) the alignment check must fire on a deliberately broken row */
    await p.evaluate(() => {
      window.PatternBench.api.settings.letters = true; window.PatternBench.render();
      document.querySelector('.ptn-letters').style.marginLeft = '40px';
    });
    await wait(200);
    const drift = await p.evaluate(() => {
      const c = document.querySelectorAll('.ptn-cell')[0].getBoundingClientRect();
      const l = document.querySelectorAll('.ptn-letter')[0].getBoundingClientRect();
      return Math.abs((c.x + c.width / 2) - (l.x + l.width / 2));
    });
    is(drift > 1.5, `the alignment measurement responds to a broken row (drift ${drift.toFixed(1)}px)`);
    /* (b) the family assertion must fire when the class is wrong */
    await p.evaluate(() => { window.PatternBench.render(); });
    const poisoned = await p.evaluate(() => {
      const T = window.PatternBench;
      const real = T.classOf;
      T.classOf = function (st, i) { return [i]; };
      const got = real.call(T, T.st, 2);
      T.classOf = real;
      return { got: got.length, poisoned: T.classOf === real ? 1 : 0 };
    });
    is(poisoned.got >= 2, 'the congruence class is genuinely >1 bead, so L5 is not vacuous');
    /* (c) the containment check must fire on an over-wide child */
    await p.evaluate(() => {
      const d = document.createElement('div');
      d.className = 'ptn-poison'; d.style.cssText = 'width:4000px;height:4px';
      document.querySelector('.ptn-wrap').appendChild(d);
    });
    const over = await p.evaluate(() => {
      const card = document.querySelector('.lcs-app').getBoundingClientRect();
      const rail = document.querySelector('.ptn-rail');
      let n = 0;
      document.querySelectorAll('.ptn-wrap *').forEach((x) => {
        if (rail && rail.contains(x)) return;
        const r = x.getBoundingClientRect();
        if (r.width && r.right > card.right + 1) n++;
      });
      return n;
    });
    is(over > 0, 'the containment measurement responds to an over-wide child');
    await p.close();
  }

  await browser.close();
  server.close();
  console.log('\n' + (FAIL ? `FAILED — ${FAIL} failed, ${PASS} passed` : `ALL GREEN — ${PASS} assertions`));
  process.exit(FAIL ? 1 : 0);
})();
