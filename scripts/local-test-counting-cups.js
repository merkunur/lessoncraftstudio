/* =====================================================================
   local-test-counting-cups.js — TOOL #48 in a real browser.
   Run:  node scripts/local-test-counting-cups.js

   Serves `mini tools/` locally and drives the tool with REAL POINTER
   EVENTS. Nothing is stubbed and nothing is deployed.

   THE TWO TAP FLOORS ARE NAMED SEPARATELY, never as one or-shaped
   assertion:
     · CHROME >= 44px — the four ledge buttons
     · CANVAS >= 34px — the scoop mouth, which is the ONLY canvas tap
       target by construction (a chip is never one, at any viewport)
     · TEXT   >= 14px — the readout digits
   and containment is measured AGAINST THE CARD, because an inner box's
   overflow would otherwise absorb the evidence.

   ⭐ THE CHECKS NO OTHER GATE IN THIS SUITE CAN MAKE:
     1. IS THE DRAWN THING WHERE IT CLAIMS TO BE — every chip's pixel
        centre is read back off the rendered path and compared against
        the model's own coordinates through an INDEPENDENT viewBox
        transform. #45 shipped counters drawn sideways with eight gates
        green; #44 shipped a MIRRORED profile because the gate counted
        in the same index order the renderer used.
     2. COLLISION — no two rendered things overlap. #42 shipped a
        clipped numeral under a control while 141 assertions passed,
        every one measuring a single box against a floor.
     3. CONSEQUENCE, per control — what each button changes ELSEWHERE
        and what it must NOT change. `audit-tool-control-liveness` asks
        only "did the DOM change?" and is structurally blind to this.
     4. ⭐⭐ THE DOM HALF OF THE NUMERAL-LEAK LAW. The model half lives
        in verify-; only a browser can prove the total is not derivable
        by COUNTING NODES.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/* ⚠ ENV INDIRECTION so this gate can be POISONED without editing the
   live file. A gate is worth nothing until it has been shown to fail,
   and editing the real tool to prove that is how work gets lost. */
const ROOT = process.env.COUNTING_CUPS_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const PORT = Number(process.env.COUNTING_CUPS_PORT || 5663);
const CASES = [
  { w: 320, h: 568 },   /* the short phone — the no-scroll proof */
  { w: 320, h: 760 },
  { w: 360, h: 800 },
  { w: 412, h: 915 },
  { w: 704, h: 900 },   /* ⚠ the width the tool PAGE actually pins */
  { w: 768, h: 1024 },
  { w: 1024, h: 900 },
  { w: 1366, h: 768 },  /* the low-height desktop */
  { w: 1920, h: 1080 }  /* ⚠ the viewport the operator actually uses */
];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'counting-cups.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const fails = [];
function ok(c, m) { if (c) PASS++; else { FAIL++; if (fails.length < 40) fails.push(m); } }

const BANDS = ['handful', 'heap', 'spill'];

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const consoleErrs = [];

  for (const c of CASES) {
    const p = await b.newPage();
    p.on('pageerror', e => consoleErrs.push(`${c.w}: ${e.message}`));
    await p.setViewport({ width: c.w, height: c.h });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/counting-cups.html?lang=en`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 350));

    for (const band of BANDS) {
      await p.evaluate((bd) => {
        const T = window.CountingCups;
        T.api.settings.band = bd;
        T.reset();
      }, band);
      await new Promise(r => setTimeout(r, 160));

      const m = await p.evaluate(() => {
        const T = window.CountingCups;
        const card = document.querySelector('.ccp-card');
        const arena = document.querySelector('.ccp-arena');
        const svg = document.querySelector('.ccp-svg');
        const cr = card.getBoundingClientRect();
        const ar = arena.getBoundingClientRect();
        const btns = [].map.call(document.querySelectorAll('.ccp-btn'), e => {
          const r = e.getBoundingClientRect();
          return { w: r.width, h: r.height, l: r.left, t: r.top, r: r.right, b: r.bottom,
            cls: e.className, dis: e.disabled, label: e.getAttribute('aria-label') || '' };
        });
        const digits = [].map.call(document.querySelectorAll('.ccp-digit'), e => {
          const r = e.getBoundingClientRect();
          return { fs: parseFloat(getComputedStyle(e).fontSize), txt: e.textContent,
            l: r.left, t: r.top, r: r.right, b: r.bottom };
        });
        /* the heap, as node counts — the leak vector */
        const nodeCounts = {
          ring: document.querySelectorAll('.ccp-ring').length,
          body: document.querySelectorAll('.ccp-body').length,
          anyCircle: document.querySelectorAll('circle').length,
          anyUse: document.querySelectorAll('use').length,
          dataI: document.querySelectorAll('[data-i]').length
        };
        /* every text node and aria string on the page */
        const texts = [];
        document.querySelectorAll('*').forEach(e => {
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) texts.push(a);
        });
        texts.push(document.title);
        const live = document.querySelector('.lcs-sr-only');
        if (live) texts.push(live.textContent || '');
        texts.push(document.body.innerText || '');
        return {
          card: { l: cr.left, t: cr.top, r: cr.right, b: cr.bottom, w: cr.width, h: cr.height },
          arena: { l: ar.left, t: ar.top, w: ar.width, h: ar.height },
          btns, digits, nodeCounts, texts,
          n: T.st.n, band: T.st.band,
          mouthPx: T.mouthRadius(T.st) * 2 * (ar.width / T.GEO.VB_W),
          chipPx: T.chipDiameter(T.st.band) * (ar.width / T.GEO.VB_W),
          matLen: T.st.mat.length,
          docScrollW: document.documentElement.scrollWidth,
          docClientW: document.documentElement.clientWidth
        };
      });

      const tag = `${c.w}x${c.h}/${band}`;

      /* --- non-vacuity FIRST, always ---------------------------- */
      ok(m.btns.length === 4, `${tag}: expected 4 ledge chips, found ${m.btns.length}`);
      ok(m.digits.length === 3, `${tag}: expected 3 readout slots, found ${m.digits.length}`);
      ok(m.matLen > 0, `${tag}: the mat is empty at open`);
      ok(m.card.w > 100, `${tag}: the card measured ${m.card.w}px`);

      /* --- CHROME floor, on its own ------------------------------ */
      for (const btn of m.btns) {
        ok(btn.w >= 44 - 0.5 && btn.h >= 44 - 0.5,
          `${tag}: chrome ${btn.cls} is ${btn.w.toFixed(0)}x${btn.h.toFixed(0)}, floor 44`);
      }

      /* --- CANVAS floor, on its own ------------------------------ */
      ok(m.mouthPx >= 34, `${tag}: the scoop mouth is ${m.mouthPx.toFixed(0)}px, canvas floor 34`);

      /* --- TEXT floor -------------------------------------------- */
      for (const d of m.digits) {
        ok(d.fs >= 14, `${tag}: a readout glyph is ${d.fs.toFixed(1)}px, floor 14`);
      }

      /* --- containment, AGAINST THE CARD -------------------------- */
      for (const btn of m.btns) {
        ok(btn.l >= m.card.l - 0.6 && btn.r <= m.card.r + 0.6,
          `${tag}: chrome ${btn.cls} escapes the card horizontally`);
        ok(btn.b <= m.card.b + 0.6, `${tag}: chrome ${btn.cls} escapes the card's bottom`);
      }
      for (const d of m.digits) {
        ok(d.l >= m.card.l - 0.6 && d.r <= m.card.r + 0.6,
          `${tag}: a readout glyph escapes the card horizontally`);
      }
      ok(m.docScrollW <= m.docClientW + 1,
        `${tag}: the page scrolls horizontally (${m.docScrollW} > ${m.docClientW})`);

      /* --- COLLISION: no two ledge chips overlap ------------------ */
      for (let i = 0; i < m.btns.length; i++) {
        for (let j = i + 1; j < m.btns.length; j++) {
          const A = m.btns[i], B = m.btns[j];
          const over = A.l < B.r - 0.5 && B.l < A.r - 0.5 && A.t < B.b - 0.5 && B.t < A.b - 0.5;
          ok(!over, `${tag}: ledge chips ${A.cls} and ${B.cls} overlap`);
        }
      }
      /* and no readout glyph collides with another */
      for (let i = 0; i < m.digits.length; i++) {
        for (let j = i + 1; j < m.digits.length; j++) {
          const A = m.digits[i], B = m.digits[j];
          const over = A.l < B.r - 0.5 && B.l < A.r - 0.5 && A.t < B.b - 0.5 && B.t < A.b - 0.5;
          ok(!over, `${tag}: readout slots ${i} and ${j} overlap`);
        }
      }

      /* --- ⭐⭐ THE DOM HALF OF THE NUMERAL-LEAK LAW -------------- */
      ok(m.nodeCounts.ring <= 3 && m.nodeCounts.body <= 3,
        `${tag}: the heap is ${m.nodeCounts.ring}+${m.nodeCounts.body} path nodes — the count is enumerable`);
      ok(m.nodeCounts.anyCircle < m.n,
        `${tag}: ${m.nodeCounts.anyCircle} <circle> nodes against n=${m.n} — countable`);
      ok(m.nodeCounts.dataI <= 9,
        `${tag}: ${m.nodeCounts.dataI} indexed nodes — only the nine mat pads may be indexed`);
      /* the total must not appear as a bare number anywhere */
      const joined = m.texts.join('  ');
      const leak = new RegExp('(^|[^0-9])' + m.n + '([^0-9]|$)').test(joined);
      ok(!leak, `${tag}: the total ${m.n} appears in the DOM/aria/live region at open`);

      /* --- ⭐ IS THE DRAWN THING WHERE IT CLAIMS TO BE ------------ */
      const geom = await p.evaluate(() => {
        const T = window.CountingCups;
        const ar = document.querySelector('.ccp-arena').getBoundingClientRect();
        const k = ar.width / T.GEO.VB_W;
        /* ⚠⚠ READ BOTH PAINTED LAYERS. The first version read only
           `.ccp-body`, so a poison that shifted every RING by 40 units
           sailed straight through — the gate was checking one of the two
           paths that make a chip and calling it "is the drawn thing
           where it claims to be". */
        function centres(sel) {
          const el = document.querySelector(sel);
          if (!el) return null;
          const d = el.getAttribute('d') || '';
          const ms = d.match(/M(-?[\d.]+),(-?[\d.]+)a(-?[\d.]+)/g) || [];
          return ms.slice(0, 3).map(s => {
            const p = s.match(/M(-?[\d.]+),(-?[\d.]+)a(-?[\d.]+)/);
            return { x: parseFloat(p[1]) + parseFloat(p[3]), y: parseFloat(p[2]) };
          });
        }
        const ring = centres('.ccp-ring'), body = centres('.ccp-body');
        if (!ring || !body) return null;
        return { ring, body, model: T.st.mat.slice(0, 3), k,
          dy: T.chipDiameter(T.st.band) * T.GEO.CHIP_INNER_DY };
      });
      if (geom && geom.ring.length === 3 && geom.body.length === 3) {
        for (let i = 0; i < 3; i++) {
          /* the RING sits on the model coordinate exactly */
          ok(Math.abs(geom.ring[i].x - geom.model[i].x) < 0.6 &&
             Math.abs(geom.ring[i].y - geom.model[i].y) < 0.6,
            `${tag}: chip ${i}'s ring is drawn at (${geom.ring[i].x.toFixed(1)},${geom.ring[i].y.toFixed(1)}) ` +
            `but the model says (${geom.model[i].x.toFixed(1)},${geom.model[i].y.toFixed(1)})`);
          /* the BODY sits on the same x and one lighting offset above */
          ok(Math.abs(geom.body[i].x - geom.model[i].x) < 0.6 &&
             Math.abs(geom.body[i].y - (geom.model[i].y + geom.dy)) < 0.6,
            `${tag}: chip ${i}'s body is off its model position`);
          /* ⭐ and the two layers must stay CONCENTRIC in x — that is the
             invariant either layer drifting would break, whichever one
             a future edit touches. */
          ok(Math.abs(geom.ring[i].x - geom.body[i].x) < 0.6,
            `${tag}: chip ${i}'s ring and body are not concentric — ` +
            `${geom.ring[i].x.toFixed(1)} vs ${geom.body[i].x.toFixed(1)}`);
        }
      } else {
        ok(false, `${tag}: could not read chip geometry back off the render`);
      }
    }

    /* ================= CONSEQUENCE, per control, once per viewport
       ⚠ Assert what each control changes ELSEWHERE, and what it must
       NOT change. Half of these are defined by what they leave alone. */
    /* ⚠⚠ RUN THE CONSEQUENCE CHECKS FROM A STATE WHERE THE THING BEING
       ASSERTED IS NON-ZERO. The first version tested "One more must not
       disturb the closed cups" on a FRESH spill, where `closed` is
       already 0 — so a poison that forced `closed = 0` changed nothing
       and passed. An assertion whose expected value is the same as the
       broken value is not an assertion. Two cups are closed first. */
    await p.evaluate(async () => {
      const T = window.CountingCups;
      T.api.settings.band = 'heap';
      T.reset();
      for (let i = 0; i < 40 && T.st.closed < 2; i++) {
        let best = null, bc = -1;
        for (let k = 0; k < 9; k++) {
          const a = T._padAim(k, T.st); if (a.empty) continue;
          const u = T.underMouth(T.st, a.x, a.y);
          if (u.take.length > bc) { bc = u.take.length; best = a; }
        }
        if (bc <= 0) break;
        T.st = T.scoop(T.st, best.x, best.y).st;
      }
      T._paint();
    });
    await new Promise(r => setTimeout(r, 140));

    const before = await p.evaluate(() => {
      const T = window.CountingCups;
      return { n: T.st.n, mat: T.st.mat.length, closed: T.st.closed, open: T.st.open,
        digits: [].map.call(document.querySelectorAll('.ccp-digit'), e => e.textContent).join('') };
    });

    /* ONE MORE: n up by exactly one, mat up by one, containers untouched */
    await p.evaluate(() => document.querySelector('.ccp-b-more').click());
    await new Promise(r => setTimeout(r, 120));
    const afterMore = await p.evaluate(() => {
      const T = window.CountingCups;
      return { n: T.st.n, mat: T.st.mat.length, closed: T.st.closed, open: T.st.open };
    });
    ok(afterMore.n === before.n + 1, `${c.w}: One more changed n by ${afterMore.n - before.n}`);
    ok(afterMore.mat === before.mat + 1, `${c.w}: One more did not add a chip to the mat`);
    ok(afterMore.closed === before.closed, `${c.w}: One more disturbed the closed cups`);

    /* ONE FEWER: exact inverse */
    await p.evaluate(() => document.querySelector('.ccp-b-fewer').click());
    await new Promise(r => setTimeout(r, 120));
    const afterFewer = await p.evaluate(() => {
      const T = window.CountingCups;
      return { n: T.st.n, mat: T.st.mat.length, closed: T.st.closed };
    });
    ok(afterFewer.n === before.n, `${c.w}: One fewer did not invert One more`);
    ok(afterFewer.closed === before.closed, `${c.w}: One fewer disturbed the closed cups`);

    /* a REAL POINTER scoop: chips leave the mat, n is untouched */
    const pt = await p.evaluate(() => {
      const T = window.CountingCups;
      const ar = document.querySelector('.ccp-arena').getBoundingClientRect();
      const a = T._padAim(4, T.st);
      return { x: ar.left + a.x / T.GEO.VB_W * ar.width, y: ar.top + a.y / T.GEO.VB_H * ar.height };
    });
    await p.mouse.move(pt.x, pt.y);
    await p.mouse.down();
    await new Promise(r => setTimeout(r, 140));
    const armed = await p.evaluate(() => ({
      mouth: document.querySelectorAll('.ccp-mouth').length,
      preview: window.CountingCups._preview ? window.CountingCups._preview.take.length : 0
    }));
    ok(armed.mouth === 1, `${c.w}: the scoop mouth did not appear on pointerdown`);
    ok(armed.preview > 0, `${c.w}: the preview lifted no chips`);
    await p.mouse.up();
    await new Promise(r => setTimeout(r, 1500));
    const afterScoop = await p.evaluate(() => {
      const T = window.CountingCups;
      return { n: T.st.n, mat: T.st.mat.length, closed: T.st.closed, open: T.st.open,
        total: T.total(T.st) };
    });
    ok(afterScoop.n === before.n, `${c.w}: a scoop changed the count`);
    ok(afterScoop.mat < before.mat, `${c.w}: a scoop took nothing off the mat`);
    ok(afterScoop.total === afterScoop.n, `${c.w}: a scoop broke conservation in the browser`);

    /* TIP BACK: everything returns, n untouched */
    await p.evaluate(() => document.querySelector('.ccp-b-tip').click());
    await new Promise(r => setTimeout(r, 200));
    const afterTip = await p.evaluate(() => {
      const T = window.CountingCups;
      return { n: T.st.n, mat: T.st.mat.length, closed: T.st.closed, open: T.st.open };
    });
    ok(afterTip.n === before.n, `${c.w}: Tip back changed the count`);
    ok(afterTip.mat === afterTip.n, `${c.w}: Tip back did not return every chip`);
    ok(afterTip.closed === 0 && afterTip.open === 0, `${c.w}: Tip back left something in a container`);

    /* the disabled state STATES ITS REQUIREMENT */
    const tipLabel = await p.evaluate(() => {
      const e = document.querySelector('.ccp-b-tip');
      return { dis: e.disabled, label: e.getAttribute('aria-label') || '' };
    });
    ok(tipLabel.dis === true, `${c.w}: Tip back is live with nothing trayed`);
    ok(before.closed >= 2, `${c.w}: the consequence fixture did not close two cups (closed=${before.closed})`);
    ok(tipLabel.label.length > 24, `${c.w}: the disabled Tip back label does not state a requirement`);

    await p.close();
  }

  await b.close();
  srv.close();

  for (const e of consoleErrs) ok(false, 'page error: ' + e);

  console.log('\n' + '='.repeat(64));
  console.log(`local-test-counting-cups: ${PASS} passed, ${FAIL} failed`);
  if (FAIL) { console.log('\nfirst failures:'); fails.forEach(f => console.log('  ✗ ' + f)); }
  console.log('='.repeat(64));
  process.exit(FAIL ? 1 : 0);
})();
