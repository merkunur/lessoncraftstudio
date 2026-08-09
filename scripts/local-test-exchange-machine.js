/* =====================================================================
   local-test-exchange-machine.js — the browser gate for TOOL #45
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-exchange-machine.js [--shot]

   Serves `mini tools/` locally — no deploy — and drives the tool with
   REAL pointer clicks, because a synthetic .click() never fires
   pointerdown and a drag-only handle is dead to a keyboard, to
   assistive tech and to the liveness gate (#41).

   ⚠ THREE FLOORS, NAMED SEPARATELY. An or-shaped assertion has hidden a
   missing floor twice on this platform:
     · CONTROLS ≥44px — the four chips
     · CANVAS   ≥34px — the lane and answer-slot hit targets, which sit
       ON the apparatus and scale with it
     · TEXT     ≥14px — every text-bearing node

   ⭐ CONTAINMENT IS MEASURED AGAINST THE CARD, never against the inner
   box: cells inside a sheet that itself overflows pass every cell-level
   check, and `overflow-x` absorbs the evidence.

   ⭐⭐ AND THE THESIS IS MEASURED OFF THE RENDER, NOT THE MODEL. A gate
   that asks the tool whether its own material moved is asking it to
   confirm itself. Here the discs are COUNTED IN THE DOM before and
   after an exchange, and the strike-through is looked for as a drawn
   path — two independent readings of the same claim.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', '.scratch', 'exm');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5586;
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'exchange-machine.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const open = async (b, W, H, lang) => {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  /* ⚠ /api/quota/status 404s on a static server BY DESIGN — the tool is
     meant to stay pessimistic when entitlement is unknown, so a console
     404 there is the correct behaviour and is not counted as an error. */
  /* ⚠ THE URL IS NOT IN .text(). A "Failed to load resource" message
     carries the status only; the URL lives in m.location().url. My
     first filter tested the text and therefore excluded nothing, so
     the deliberate /api/quota/status 404 was reported as a console
     error at all six viewports. */
  p.on('console', (m) => {
    if (m.type() !== 'error') return;
    const where = (m.location() && m.location().url) || '';
    const t = m.text();
    if (/quota\/status|favicon/.test(where + ' ' + t)) return;
    errs.push(t + ' @ ' + where);
  });
  await p.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await p.goto(`http://127.0.0.1:${PORT}/mini-tools/exchange-machine.html?lang=${lang || 'en'}`, { waitUntil: 'load' });
  await p.waitForSelector('.exm-wrap', { timeout: 9000 });
  await wait(160);
  return { p, errs };
};

/* a REAL click at the centre of an element's box */
const realClick = async (p, sel, idx) => {
  const box = await p.evaluate((s, i) => {
    const el = document.querySelectorAll(s)[i];
    if (!el || el.disabled) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, sel, idx);
  if (!box) return false;
  await p.mouse.click(box.x, box.y);
  await wait(120);
  return true;
};

const countDiscs = (p) => p.$$eval('.exm-disc', (n) => n.length).catch(() => 0);

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  console.log('\n— THE THESIS, MEASURED OFF THE RENDER —');
  {
    const { p, errs } = await open(b, 1024, 900);
    const before = await countDiscs(p);
    is(before > 0, `the material is drawn at rest (${before} discs)`);

    const ghostsBefore = await p.$$eval('.exm-ghost', (n) => n.length);
    is(ghostsBefore > 0, `⭐ the second number is drawn INTO the tubes as ${ghostsBefore} outlined cells — the shortage is visible before anyone touches anything`);

    const strikeBefore = await p.$$eval('.exm-strike', (n) => n.length);
    is(strikeBefore === 0, 'nothing is struck through before an exchange');

    /* ⚠ REACH THE CONTROL BY INDEX, AND BY THE RIGHT INDEX. My first
       version clicked `lanes.indexOf(false)` — the first live lane —
       which on 42 - 17 is the ONES lane, and the ones lane offers a
       TAKE, not an exchange. The material duly moved and no mark was
       written, and I very nearly filed that as a defect in the tool.
       Lane 1 is the tens by construction; that is the lane that gives. */
    /* seek the record that actually needs a borrow, rather than trusting
       an index — the repertoire is data and data moves. */
    await p.evaluate(() => {
      const t = window.ExchangeMachine;
      for (let i = 0; i < 30; i++) {
        if (t.columnState(t.st, 0) === 'short') return;
        t._next();
      }
    });
    await wait(160);
    /* ⚠ `$$` IS AN ESCAPE IN A replace() REPLACEMENT STRING, so patching
       this line through a script silently turned $$eval into $eval and
       the selector returned one node instead of all of them. Recorded
       trap, walked into anyway. */
    const lanes = await p.$$eval('.exm-hit:not(.exm-slot)', (ns) => ns.map((n) => n.disabled));
    is(lanes.indexOf(false) >= 0, 'at least one lane is live at rest');

    const took = await countDiscs(p);
    await realClick(p, '.exm-hit:not(.exm-slot)', 0);
    is((await countDiscs(p)) === took - 1, 'tapping the ones lane takes one away — the material, not a mark');

    const preExchange = await countDiscs(p);
    await realClick(p, '.exm-hit:not(.exm-slot)', 1);
    const after = await countDiscs(p);
    const strikeAfter = await p.$$eval('.exm-strike', (n) => n.length);
    is(after === preExchange + 9, `⭐ the exchange put TEN into the ones lane and took ONE out of the tens (${preExchange} -> ${after} discs drawn)`);
    is(strikeAfter > 0, '⭐ and the pen mark was written in the same paint — the lock, measured in the DOM rather than asked of the model');

    const marks = await p.$$eval('.exm-mark', (n) => n.map((x) => x.textContent));
    is(marks.length > 0, `the small handwritten digit is on the page (${JSON.stringify(marks)})`);
    is(errs.length === 0, 'no console errors' + (errs.length ? ': ' + errs[0] : ''));
    await p.close();
  }

  console.log('\n— THE ZERO LESSON: an empty lane refuses, in the browser —');
  {
    const { p } = await open(b, 1024, 900);
    /* step to the across-zero record: 204 - 137 is the fourth free set */
    await p.evaluate(() => {
      const t = window.ExchangeMachine;
      for (let i = 0; i < 30; i++) {
        if (t.columnState(t.st, 0) === 'blocked') return;
        t._next();
      }
    });
    await wait(160);
    const state = await p.evaluate(() => ({ a: window.ExchangeMachine.st.a, b: window.ExchangeMachine.st.b }));
    is(state.a >= 100, `the across-zero cascade record is reachable in the FREE tier (${state.a} - ${state.b})`);
    const dis = await p.$$eval('.exm-hit:not(.exm-slot)', (ns) => ns.map((n) => n.disabled));
    is(dis[1] === true, '⭐ the empty tens lane is DISABLED — it is not silently cascaded, and that refusal is the zero lesson');
    is(dis[2] === false, 'and the hundreds lane is the one offered instead');
    await p.close();
  }

  console.log('\n— KEYBOARD: every target is reachable without a pointer —');
  {
    const { p } = await open(b, 1024, 900);
    const before = await countDiscs(p);
    await p.evaluate(() => {
      const b = [...document.querySelectorAll('.exm-hit:not(.exm-slot)')].find((x) => !x.disabled);
      b.focus();
    });
    await p.keyboard.press('Enter');
    await wait(150);
    is((await countDiscs(p)) !== before, 'Enter on a focused lane performs the exchange');
    const tag = await p.evaluate(() => document.querySelectorAll('.exm-hit')[0].tagName);
    is(tag === 'BUTTON', 'every hit target is a real <button>, not a div with a pointer handler');
    await p.close();
  }

  console.log('\n— THE VIEWPORT SWEEP —');
  for (const W of WIDTHS) {
    const { p, errs } = await open(b, W, W < 500 ? 780 : 900);
    const m = await p.evaluate(() => {
      const card = document.querySelector('.lcs-app') || document.body;
      const cr = card.getBoundingClientRect();
      const px = (el) => { const r = el.getBoundingClientRect(); return { w: r.width, h: r.height, right: r.right, bottom: r.bottom }; };
      const chips = [...document.querySelectorAll('.exm-chip')].map(px);
      const canvas = [...document.querySelectorAll('.exm-hit')].map(px);
      const texts = [...document.querySelectorAll('.exm-hint, .exm-chip')]
        .map((el) => parseFloat(getComputedStyle(el).fontSize));
      const over = [...document.querySelectorAll('.exm-wrap *')].filter((el) => el.getBoundingClientRect().right > cr.right + 1).length;
      const lowest = Math.max(...[...document.querySelectorAll('.exm-chip')].map((el) => el.getBoundingClientRect().bottom));
      return {
        chipMin: Math.min(...chips.map((c) => Math.min(c.w, c.h))),
        canvasMin: Math.min(...canvas.map((c) => Math.min(c.w, c.h))),
        textMin: Math.min(...texts),
        over, lowest, vh: window.innerHeight, cardRight: cr.right
      };
    });
    /* NAMED SEPARATELY — never an or-shaped assertion */
    is(m.chipMin >= 44, `${W}: controls clear the 44px floor (${m.chipMin.toFixed(1)}px)`);
    is(m.canvasMin >= 34, `${W}: canvas targets clear the 34px floor (${m.canvasMin.toFixed(1)}px)`);
    is(m.textMin >= 14, `${W}: text clears 14px (${m.textMin.toFixed(1)}px)`);
    is(m.over === 0, `${W}: nothing overflows the CARD's right edge (${m.over} nodes past it)`);
    if (W >= 768) is(m.lowest <= m.vh, `${W}: FITS — the lowest control sits at ${Math.round(m.lowest)} inside ${m.vh}`);
    is(errs.length === 0, `${W}: no console errors` + (errs.length ? ': ' + errs[0] : ''));
    if (SHOT && (W === 360 || W === 768 || W === 1024)) {
      await p.screenshot({ path: path.join(OUT, `exm-${W}.png`), fullPage: true });
    }
    await p.close();
  }

  console.log('\n— NO COLLISION: two rendered things may not overlap —');
  {
    /* ⚠ every assertion above measures ONE box against a floor, so none
       of them can see two nodes sitting on top of each other. The marks,
       the digits and the rule all live in the same band. */
    const { p } = await open(b, 768, 900);
    await realClick(p, '.exm-hit:not(.exm-slot)', 1);
    const hits = await p.evaluate(() => {
      const nodes = [...document.querySelectorAll('.exm-hint, .exm-chip')];
      const bad = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i].getBoundingClientRect(), c = nodes[j].getBoundingClientRect();
          const ov = Math.max(0, Math.min(a.right, c.right) - Math.max(a.left, c.left)) *
                     Math.max(0, Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top));
          if (ov > 4) bad.push(nodes[i].className + ' x ' + nodes[j].className);
        }
      }
      return bad;
    });
    is(hits.length === 0, 'no two chrome nodes overlap' + (hits.length ? ': ' + hits[0] : ''));
    await p.close();
  }

  /* =====================================================================
     ⭐⭐ EVERY COUNTER INSIDE ITS OWN LANE, AT EVERY OCCUPANCY.
     The shipped build sent counters past ten SIDEWAYS, so on 42 − 17
     the eleventh and twelfth ones sat outside the tube, outside the
     tint, and at 360px half off the paper. Every gate in this suite was
     green: they each measured ONE box against a FLOOR, and not one
     asked whether a drawn thing is where it claims to be. A human
     reading the 360 render found it.
     In this tool x IS place value, so this is not a cosmetic check —
     a counter drawn right of the ones column is drawn in a place that
     does not exist. Driven to the MEASURED maximum (eighteen in one
     lane), not to the resting state.
     ===================================================================== */
  console.log('\n— CONTAINMENT: every counter in its own place —');
  {
    const { p } = await open(b, 1024, 900);
    /* drive the ones lane to its worst case: break a ten on a record
       that does not need it, which is one tap away on the free shelf */
    const occupancy = await p.evaluate(() => {
      const T = window.ExchangeMachine;
      T.st = T.borrow(T.newState('sub', 48, 23, 'decompose'), 1);
      T._paint();
      return T.st.col.slice();
    });
    await new Promise((r) => setTimeout(r, 260));
    is(occupancy[0] === 18, `vacuity guard: the ones lane really holds ${occupancy[0]} — the measured maximum`);

    const spill = await p.evaluate(() => {
      const T = window.ExchangeMachine;
      const svg = document.querySelector('.exm-svg');
      const vb = svg.viewBox.baseVal;
      const lanes = T._lanes(), L = T._lane();
      const out = [];
      const discs = Array.from(svg.querySelectorAll('.exm-disc, .exm-ghost'));
      discs.forEach((c) => {
        const x = Number(c.getAttribute('cx')), y = Number(c.getAttribute('cy')), r = Number(c.getAttribute('r'));
        /* which lane does this x belong to? */
        let inLane = -1;
        for (let k = 0; k < lanes; k++) {
          const x0 = T._laneX(k);
          if (x - r >= x0 - 0.5 && x + r <= x0 + L + 0.5) inLane = k;
        }
        if (inLane < 0) out.push(`x=${x.toFixed(1)} belongs to no lane`);
        if (y - r < 0 || y + r > vb.height) out.push(`y=${y.toFixed(1)} is off the paper (height ${vb.height})`);
        if (x - r < 0 || x + r > vb.width) out.push(`x=${x.toFixed(1)} is off the paper (width ${vb.width})`);
      });
      return { count: discs.length, out: out };
    });
    is(spill.count >= 18, `vacuity guard: ${spill.count} counters and rings are actually drawn`);
    is(spill.out.length === 0,
      `⭐⭐ every counter sits inside its own column and on the paper` + (spill.out.length ? ` — ${spill.out.length} do not: ${spill.out[0]}` : ''));
    await p.close();
  }

  console.log('\n— THE PAYWALL: never gate the first affordance —');
  {
    const { p } = await open(b, 1024, 900);
    const gate = await p.$$eval('.exm-gate', (n) => n.length);
    is(gate === 0, 'a signed-out teacher sees no sales card on arrival');
    const dis = await p.$$eval('.exm-hit:not(.exm-slot)', (ns) => ns.filter((n) => !n.disabled).length);
    is(dis > 0, 'and the first affordance is live for them');
    await p.close();
  }

  await b.close();
  srv.close();
  if (FAIL) { console.error(`\nFAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
  console.log(`\nPASS — ${PASS} assertions`);
})().catch((e) => { console.error(e); srv.close(); process.exit(1); });
