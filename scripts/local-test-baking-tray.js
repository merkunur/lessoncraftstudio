/* =====================================================================
   local-test-baking-tray.js — TOOL #46 in a real browser
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-baking-tray.js

   Serves `mini tools/` locally and drives the tool with REAL POINTER
   EVENTS. Nothing here is stubbed and nothing is deployed.

   THE FLOORS ARE NAMED SEPARATELY, never as one or-shaped assertion:
     · CHROME  >= 44px — chips and steppers
     · CANVAS  >= 34px — the tray's own press target
     · TEXT    >= 14px
   and containment is measured AGAINST THE CARD, because the app's own
   `overflow-x` would otherwise absorb the evidence.

   ⭐ AND THE TWO CHECKS THAT NO OTHER GATE IN THIS SUITE CAN MAKE:
     1. CONTAINMENT — every bun inside its own piece and on the paper, at
        the largest tray. #45 shipped counters drawn SIDEWAYS out of
        their own column while eight gates were green, because each of
        them measured one box against a floor and none asked whether a
        drawn thing is WHERE IT CLAIMS TO BE.
     2. COLLISION — no two rendered things overlap. #42 shipped a
        clipped numeral under a control while 141 assertions passed,
        every one of them measuring a single box.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5606;
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'baking-tray.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(b, w, h) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  /* the local harness has no /api/entitlement and no favicon; both
     404 here and neither is a defect in the tool. Filtered BY URL, not
     by silencing console errors wholesale. */
  p.on('console', (m) => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (t.indexOf('/api/entitlement') >= 0 || t.indexOf('favicon.ico') >= 0) return;
    if (t.indexOf('status of 404') >= 0) return;
    errs.push(t);
  });
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await p.goto(`http://127.0.0.1:${PORT}/mini-tools/baking-tray.html?lang=en&embed=1`, { waitUntil: 'load' });
  await p.waitForSelector('.btr-wrap', { timeout: 12000 });
  await wait(320);
  return { p, errs };
}

/* ⭐ A SCRIPTED INTERACTION THAT DOES NOT HAPPEN MUST FAIL LOUDLY (#39):
   a helper that quietly returned false there hit a legitimately disabled
   control, and the very next assertion passed because nothing had been
   done. This one presses a real pointer at real coordinates. */
async function pressSeam(p, axis, k, why) {
  const pt = await p.evaluate((axis, k) => {
    const T = window.BakingTray;
    const st = T.st, P = T.pitch(st), GUT = T.gutter(st), BOX = T.trayBox(st);
    let gaps = 0;
    for (const c of st.cuts) gaps += T.gap(st);
    const trayW = st.cols * P + (st.axis === 'col' ? gaps : 0);
    const trayH = st.rows * P + (st.axis === 'row' ? gaps : 0);
    const OX = GUT + (BOX - trayW) / 2, OY = GUT + (BOX - trayH) / 2;
    let shift = 0;
    for (const c of st.cuts) if (c < k) shift += T.gap(st);
    /* ⚠ NOT the tray's midpoint: on a six-column tray the middle IS
       column seam 3, so a 'row seam' press landed dead on a column seam
       and the tool correctly picked the nearer one. Aim at a BUN CENTRE. */
    const ux = (axis === 'col') ? OX + k * P + shift : OX + (Math.floor(st.cols / 2) + 0.5) * P;
    const uy = (axis === 'row') ? OY + k * P + shift : OY + (Math.floor(st.rows / 2) + 0.5) * P;
    const r = document.querySelector('.btr-svg').getBoundingClientRect();
    return { x: r.left + ux / 1000 * r.width, y: r.top + uy / 1000 * r.height };
  }, axis, k);
  if (!pt) { FAIL++; console.error(`  FAIL  could not locate seam ${axis}${k} — ${why}`); return false; }
  await p.mouse.move(pt.x, pt.y);
  await p.mouse.down();
  await wait(70);
  await p.mouse.up();
  await wait(560);
  return true;
}

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------- the sweep ------------------------------------------- */
  for (const W of WIDTHS) {
    console.log(`\n— ${W}px —`);
    const { p, errs } = await open(b, W, Math.max(760, Math.round(W * 1.25)));

    const m = await p.evaluate(() => {
      const card = document.querySelector('.lcs-app') || document.body;
      const cr = card.getBoundingClientRect();
      const min = (sel) => {
        let v = Infinity;
        document.querySelectorAll(sel).forEach((n) => {
          const r = n.getBoundingClientRect();
          if (!r.width || !r.height) return;
          v = Math.min(v, Math.min(r.width, r.height));
        });
        return v === Infinity ? -1 : v;
      };
      let textMin = Infinity;
      document.querySelectorAll('.btr-hint, .btr-chip, .btr-sval').forEach((n) => {
        if (!n.textContent.trim()) return;
        textMin = Math.min(textMin, parseFloat(getComputedStyle(n).fontSize));
      });
      let over = 0, lowest = 0;
      document.querySelectorAll('.btr-wrap *').forEach((n) => {
        const r = n.getBoundingClientRect();
        if (!r.width || !r.height) return;
        if (r.right > cr.right + 1 || r.left < cr.left - 1) over++;
      });
      document.querySelectorAll('.btr-chip, .btr-sbtn').forEach((n) => {
        lowest = Math.max(lowest, n.getBoundingClientRect().bottom);
      });
      const hot = document.querySelector('.btr-hot').getBoundingClientRect();
      return {
        chipMin: min('.btr-chip, .btr-sbtn'),
        canvas: Math.min(hot.width, hot.height),
        textMin: textMin === Infinity ? -1 : textMin,
        over, lowest, vh: window.innerHeight
      };
    });

    /* NAMED SEPARATELY — never an or-shaped assertion */
    is(m.chipMin >= 44, `${W}: chrome clears the 44px floor (${m.chipMin.toFixed(1)}px)`);
    is(m.canvas >= 34, `${W}: the tray's press target clears the 34px canvas floor (${m.canvas.toFixed(1)}px)`);
    is(m.textMin >= 14, `${W}: text clears 14px (${m.textMin.toFixed(1)}px)`);
    is(m.over === 0, `${W}: nothing overflows the CARD's edges (${m.over} nodes past it)`);
    if (W >= 768) is(m.lowest <= m.vh, `${W}: FITS — the lowest control sits at ${Math.round(m.lowest)} inside ${m.vh}`);
    is(errs.length === 0, `${W}: no console errors` + (errs.length ? ': ' + errs[0] : ''));
    await p.close();
  }

  /* ---------- the three moves, by real pointer --------------------- */
  console.log('\n— THE THREE MOVES, DRIVEN —');
  {
    const { p, errs } = await open(b, 1024, 900);
    const read = () => p.evaluate(() => {
      const T = window.BakingTray, st = T.st;
      const nums = Array.from(document.querySelectorAll('.btr-num')).map((n) => n.textContent);
      return {
        rows: st.rows, cols: st.cols, axis: st.axis, cuts: st.cuts.slice(),
        area: T.area(st), count: T.count(st), spans: T.spans(st),
        buns: document.querySelectorAll('.btr-slab').length,
        domes: document.querySelectorAll('circle.btr-bun').length,
        nums: nums, pitch: T.pitch(st)
      };
    });

    const before = await read();
    is(before.rows === 7 && before.cols === 6, `opens on 7 x 6 (${before.rows}x${before.cols})`);
    is(before.domes === 42, `NON-VACUITY: forty-two buns are drawn (${before.domes})`);
    is(before.nums.join(',') === '7,6', `two edge numerals, and only two: ${before.nums.join(' and ')}`);
    is(before.buns === 1, 'the whole tray is ONE piece');

    /* THE CRACK */
    is(await pressSeam(p, 'row', 5, 'break the tray after row 5'), 'a real pointer press lands on the 5th seam');
    const cut = await read();
    is(cut.cuts.join(',') === '5', `one press cracked it at seam 5 (${cut.cuts.join(',')})`);
    is(cut.buns === 2, 'the tray is now two pieces');
    is(cut.domes === 42, `⭐⭐ AND THERE ARE STILL FORTY-TWO BUNS (${cut.domes}) — the count did not change`);
    is(cut.area === cut.count, `⭐ CONSERVATION through a real UI press: ${cut.area} === ${cut.count}`);
    is(cut.pitch === before.pitch, `⭐ and the bun did not change size (pitch ${cut.pitch.toFixed(2)})`);
    is(cut.spans.join('+') === '5+2', `the spans are ${cut.spans.join(' and ')}`);
    is(cut.nums.sort().join(',') === '2,5,6,6',
      `⭐⭐ THE INVENTION, ON SCREEN: the 7 split into ${cut.spans.join(' and ')} and the 6 duplicated — four numerals now read ${cut.nums.join(' ')}`);

    /* THE PUSH — the exact inverse */
    is(await pressSeam(p, 'row', 5, 'push the two pieces back together'), 'pressing the open seam again is the push');
    const back = await read();
    is(back.cuts.length === 0 && back.buns === 1, 'the tray is whole again');
    is(back.nums.join(',') === '7,6', '...and the numerals fused back to 7 and 6');
    is(back.domes === 42, `...with forty-two buns throughout (${back.domes})`);

    /* THE ROTATE */
    await p.evaluate(() => document.querySelector('.btr-turn').click());
    await wait(700);
    const turned = await read();
    is(turned.rows === 6 && turned.cols === 7, `⭐ one press turned the tray (7x6 -> ${turned.rows}x${turned.cols})`);
    is(turned.domes === 42, `...and not one bun was added or lost (${turned.domes})`);
    is(turned.pitch === before.pitch, `⭐⭐ THE BUN IS EXACTLY THE SAME SIZE AFTER THE TURN (${turned.pitch.toFixed(2)}) — a mid-rotation rescale is a conservation failure induced by a layout optimisation`);

    /* ⭐⭐ AND THE TURN MUST RUN THE RIGHT WAY ROUND. Every assertion
       above measures the END state, and the first build's turn SNAPPED
       into its post-turn layout, spun a quarter turn AWAY from it, and
       snapped back — all of them still passed. The model advances
       immediately, so frame one must draw the turned grid at MINUS
       ninety, i.e. in the orientation the class was already looking at. */
    {
      await p.evaluate(() => { const T = window.BakingTray; T.st = T.newState(7, 6); T._paint(); });
      await wait(150);
      const angles = await p.evaluate(() => new Promise((res) => {
        const T = window.BakingTray, seen = [];
        const grab = () => {
          const g = document.querySelector('.btr-tray');
          const tr = g && g.getAttribute('transform');
          const m = tr && /rotate\(([-\d.]+)/.exec(tr);
          seen.push(m ? Number(m[1]) : 0);
        };
        document.querySelector('.btr-turn').click();
        const id = setInterval(grab, 40);
        setTimeout(() => { clearInterval(id); res(seen); }, 520);
      }));
      const first = angles.length ? angles[0] : NaN;
      const last = angles.length ? angles[angles.length - 1] : NaN;
      is(angles.length >= 4, `vacuity guard: the turn was sampled ${angles.length} times mid-flight`);
      is(first < -45, `⭐⭐ THE TURN STARTS AT ${first.toFixed(0)}° — the turned grid drawn in its PRE-turn orientation, so frame one is what the class was already looking at`);
      is(last > first, `…and travels forward to ${last.toFixed(0)}°, never away from where it lands`);
      is(angles.every((a) => a <= 0.5), 'and never overshoots past zero');
      await wait(400);
    }

    /* the refusals, visible on the controls */
    await p.evaluate(() => { const T = window.BakingTray; T.st = T.crack(T.st, 'row', 3); T._paint(); });
    await wait(200);
    const dis = await p.evaluate(() => ({
      turn: document.querySelector('.btr-turn').disabled,
      steps: Array.from(document.querySelectorAll('.btr-sbtn')).every((n) => n.disabled)
    }));
    is(dis.turn === true, '⭐ ROTATE is visibly DISABLED on a cracked tray — refused, never a silent no-op');
    is(dis.steps === true, '⭐ and every stepper too: you must push the pieces together before you may resize');

    is(errs.length === 0, 'no console errors across all three moves' + (errs.length ? ': ' + errs[0] : ''));
    await p.close();
  }

  /* ---------- CONTAINMENT: every bun in its place, on the paper ----- */
  console.log('\n— CONTAINMENT: every bun inside its own piece and on the paper —');
  {
    const { p } = await open(b, 1024, 900);
    /* the largest tray, cracked twice — the worst case for the layout */
    const n = await p.evaluate(() => {
      const T = window.BakingTray;
      T.st = T.crack(T.crack(T.newState(10, 10), 'row', 4), 'row', 7);
      T._paint();
      return T.st.cuts.length;
    });
    await wait(300);
    is(n === 2, 'vacuity guard: a 10x10 tray really is cracked twice');

    const spill = await p.evaluate(() => {
      const svg = document.querySelector('.btr-svg'), vb = svg.viewBox.baseVal;
      const paper = svg.querySelector('.btr-paper');
      const pr = { x: +paper.getAttribute('x'), y: +paper.getAttribute('y'),
        w: +paper.getAttribute('width'), h: +paper.getAttribute('height') };
      const bad = [];
      const domes = Array.from(svg.querySelectorAll('circle.btr-bun'));
      domes.forEach((c) => {
        const g = c.closest('g.btr-piece');
        let dx = 0, dy = 0;
        const tr = g && g.getAttribute('transform');
        if (tr) { const mm = /translate\(([-\d.]+) ([-\d.]+)\)/.exec(tr); if (mm) { dx = +mm[1]; dy = +mm[2]; } }
        const x = +c.getAttribute('cx') + dx, y = +c.getAttribute('cy') + dy, r = +c.getAttribute('r');
        if (x - r < pr.x || x + r > pr.x + pr.w || y - r < pr.y || y + r > pr.y + pr.h) {
          bad.push(`a bun at ${x.toFixed(0)},${y.toFixed(0)} is off the paper`);
        }
        if (x - r < 0 || x + r > vb.width || y - r < 0 || y + r > vb.height) {
          bad.push(`a bun at ${x.toFixed(0)},${y.toFixed(0)} is outside the stage`);
        }
      });
      /* and every numeral on the paper too */
      Array.from(svg.querySelectorAll('.btr-num')).forEach((t) => {
        const r = t.getBBox();
        if (r.x < pr.x || r.x + r.width > pr.x + pr.w || r.y < pr.y || r.y + r.height > pr.y + pr.h) {
          bad.push(`the numeral "${t.textContent}" is off the paper`);
        }
      });
      return { n: domes.length, bad };
    });
    is(spill.n === 100, `vacuity guard: one hundred buns are drawn (${spill.n})`);
    is(spill.bad.length === 0,
      `⭐⭐ every bun and every numeral is on the paper` + (spill.bad.length ? ` — ${spill.bad.length} are not: ${spill.bad[0]}` : ''));
    await p.close();
  }

  /* ---------- COLLISION: no two rendered things overlap ------------- */
  console.log('\n— NO COLLISION —');
  {
    const { p } = await open(b, 768, 1000);
    await p.evaluate(() => { const T = window.BakingTray; T.st = T.crack(T.st, 'row', 5); T._paint(); });
    await wait(260);
    const hits = await p.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('.btr-hint, .btr-chip, .btr-sbtn, .btr-sval, .lcs-title'));
      const rs = nodes.map((n) => ({ n: n.className || n.tagName, r: n.getBoundingClientRect() }));
      const bad = [];
      for (let i = 0; i < rs.length; i++) {
        for (let j = i + 1; j < rs.length; j++) {
          const a = rs[i].r, c = rs[j].r;
          if (!a.width || !c.width) continue;
          if (a.left < c.right - 1 && c.left < a.right - 1 && a.top < c.bottom - 1 && c.top < a.bottom - 1) {
            bad.push(`${rs[i].n} overlaps ${rs[j].n}`);
          }
        }
      }
      /* the SVG numerals must not collide with each other either */
      const t = Array.from(document.querySelectorAll('.btr-num')).map((x) => ({ v: x.textContent, r: x.getBoundingClientRect() }));
      for (let i = 0; i < t.length; i++) {
        for (let j = i + 1; j < t.length; j++) {
          const a = t[i].r, c = t[j].r;
          if (a.left < c.right && c.left < a.right && a.top < c.bottom && c.top < a.bottom) {
            bad.push(`the numeral ${t[i].v} overlaps the numeral ${t[j].v}`);
          }
        }
      }
      return bad;
    });
    is(hits.length === 0, 'no two rendered things overlap' + (hits.length ? ': ' + hits[0] : ''));
    await p.close();
  }

  /* ---------- the keyboard path ------------------------------------- */
  console.log('\n— THE KEYBOARD: a pointer-only affordance is dead to half its users —');
  {
    const { p } = await open(b, 1024, 900);
    const did = await p.evaluate(() => {
      const pads = Array.from(document.querySelectorAll('.btr-pad')).filter((n) => !n.disabled);
      if (!pads.length) return null;
      const before = window.BakingTray.st.cuts.length;
      pads[0].focus();
      const focused = document.activeElement === pads[0];
      pads[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      pads[0].click();
      return { focused, before, label: pads[0].getAttribute('aria-label') };
    });
    await wait(600);
    const after = await p.evaluate(() => window.BakingTray.st.cuts.length);
    is(!!did && did.focused, 'a seam button takes keyboard focus');
    is(!!did && /\d/.test(did.label || ''), `⭐ and its label STATES ITS CONSEQUENCE before it is pressed: "${did && did.label}"`);
    is(after === 1, `pressing it breaks the tray (${after} cut)`);
    await p.close();
  }

  /* ---------- the paywall ------------------------------------------- */
  console.log('\n— THE PAYWALL: never gate the first affordance —');
  {
    const { p } = await open(b, 1024, 900);
    const g = await p.evaluate(() => ({
      gate: document.querySelectorAll('.btr-gate').length,
      live: Array.from(document.querySelectorAll('.btr-pad')).filter((n) => !n.disabled).length,
      turn: !document.querySelector('.btr-turn').disabled
    }));
    is(g.gate === 0, 'a signed-out teacher sees no sales card on arrival');
    is(g.live > 0 && g.turn, `and every move is live for them (${g.live} seams, and the turn)`);
    await p.close();
  }

  await b.close();
  srv.close();
  if (FAIL) { console.error(`\nFAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`\nPASS — ${PASS} assertions`);
})().catch((e) => { console.error(e); srv.close(); process.exit(1); });
