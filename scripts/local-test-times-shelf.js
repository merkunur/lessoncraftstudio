/* =====================================================================
   local-test-times-shelf.js — TOOL #47 in a real browser.
   Run:  node scripts/local-test-times-shelf.js

   Serves `mini tools/` locally and drives the tool with REAL POINTER
   EVENTS. Nothing is stubbed and nothing is deployed.

   THE FLOORS ARE NAMED SEPARATELY, never as one or-shaped assertion:
     · CHROME >= 44px — the six ledge buttons, the only measured targets
     · CANVAS >= 34px — the shelf, which is ONE region by construction
     · TEXT   >= 14px — including the one three-digit card
   and containment is measured AGAINST THE CARD, because the app's own
   overflow-x would otherwise absorb the evidence.

   ⭐ THE THREE CHECKS NO OTHER GATE IN THIS SUITE CAN MAKE:
     1. IS THE DRAWN THING WHERE IT CLAIMS TO BE. Every numeral is read
        back off the DOM, its grid position recomputed from its own
        pixel centre, and its text compared against r*c from an
        INDEPENDENT oracle. #45 shipped counters drawn sideways out of
        their own column with eight gates green; #44 shipped a MIRRORED
        profile because the gate counted in the same index order the
        renderer used and both sides of the comparison carried the bug.
     2. COLLISION — no two rendered things overlap. #42 shipped a
        clipped numeral under a control while 141 assertions passed,
        every one of them measuring a single box against a floor.
     3. CONSEQUENCE, per control — what each button changes ELSEWHERE
        and what it must NOT change. `audit-tool-control-liveness` asks
        only "did the DOM change?" and is structurally blind to this.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5647;
const CASES = [
  { w: 320, h: 568 },   /* the short phone — the no-scroll proof */
  { w: 320, h: 760 },
  { w: 360, h: 800 },
  { w: 412, h: 915 },
  { w: 768, h: 1024 },
  { w: 1024, h: 900 },
  { w: 1366, h: 768 },  /* the low-height desktop */
  { w: 1920, h: 1080 }  /* ⚠ the viewport the operator actually uses */
];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'times-shelf.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(b, w, h) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (t.indexOf('/api/entitlement') >= 0 || t.indexOf('favicon.ico') >= 0) return;
    if (t.indexOf('status of 404') >= 0) return;
    errs.push(t);
  });
  await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await p.goto(`http://127.0.0.1:${PORT}/mini-tools/times-shelf.html?lang=en&embed=1`, { waitUntil: 'load' });
  await p.waitForSelector('.tsh-wrap', { timeout: 12000 });
  await wait(320);
  return { p, errs };
}

/* ⭐ A SCRIPTED INTERACTION THAT DOES NOT HAPPEN MUST FAIL LOUDLY (#39):
   a helper that quietly returned false there hit a legitimately disabled
   control, and the very NEXT assertion passed because nothing had been
   done. Controls are reached BY INDEX, never by English text — #44's
   "Another BLUEPRINT" contains the word "print" and a /print/i probe
   reported a defect in a working tool. */
async function pressBtn(p, sel, nth, why) {
  const box = await p.evaluate((sel, nth) => {
    const n = document.querySelectorAll(sel)[nth];
    if (!n || n.disabled) return null;
    const r = n.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, sel, nth);
  if (!box) { FAIL++; console.error(`  FAIL  ${sel}[${nth}] is missing or disabled — ${why}`); return false; }
  await p.mouse.move(box.x, box.y);
  await p.mouse.down();
  await wait(40);
  await p.mouse.up();
  await wait(700);
  return true;
}

/* press a card at a grid coordinate, with a REAL pointer */
async function pressCard(p, r, c) {
  const pt = await p.evaluate((r, c) => {
    const T = window.TimesShelf, L = T.live(T.st), n = L.length;
    const ir = L.indexOf(r), ic = L.indexOf(c);
    if (ir < 0 || ic < 0) return null;
    const G = T.GEO;
    const ux = T.centre(n, ic), uy = T.centre(n, ir);
    const b = document.querySelector('.tsh-arena').getBoundingClientRect();
    return { x: b.left + ux / G.VB * b.width, y: b.top + uy / G.VB * b.height };
  }, r, c);
  if (!pt) { FAIL++; console.error(`  FAIL  card ${r}x${c} is not on the shelf`); return false; }
  await p.mouse.move(pt.x, pt.y);
  await p.mouse.down();
  await wait(120);
  return true;
}

/* ---- the independent oracle, written here from the spec ---------- */
function oracleCards(off, stacked) {
  const L = [];
  for (let v = 1; v <= 10; v++) if (off.indexOf(v) < 0) L.push(v);
  const out = [];
  for (const r of L) for (const c of L) { if (stacked && r > c) continue; out.push({ r, c, p: r * c }); }
  return out;
}

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* =============== the sweep ====================================== */
  for (const C of CASES) {
    const tag = `${C.w}x${C.h}`;
    const { p, errs } = await open(b, C.w, C.h);

    const m = await p.evaluate(() => {
      const card = document.querySelector('.lcs-app') || document.body;
      const cr = card.getBoundingClientRect();
      const boxes = [];
      const push = (sel, kind) => document.querySelectorAll(sel).forEach((n) => {
        const r = n.getBoundingClientRect();
        if (!r.width || !r.height) return;
        boxes.push({ kind, sel, x: r.left, y: r.top, w: r.width, h: r.height,
          txt: (n.textContent || '').trim(),
          fs: parseFloat(getComputedStyle(n).fontSize) || 0 });
      });
      push('.tsh-btn', 'chrome');
      push('.tsh-arena', 'canvas');
      push('.tsh-card', 'cardrect');
      push('.tsh-p', 'num');
      push('.tsh-h', 'head');
      push('.tsh-seat', 'seat');

      /* the pairing the renderer itself uses: _card() appends the card
         rect and then its numeral, so the k-th .tsh-card and the k-th
         .tsh-p are the same object. That pairing is what makes check 1
         possible — and it is exactly the shared convention that has to
         be broken by measuring in PIXELS, which is what we do below. */
      const T = window.TimesShelf, L = T.live(T.st), n = L.length, G = T.GEO;
      const ar = document.querySelector('.tsh-arena').getBoundingClientRect();
      const read = [];
      document.querySelectorAll('.tsh-p').forEach((t) => {
        const r = t.getBoundingClientRect();
        const cx = (r.left + r.width / 2 - ar.left) / ar.width * G.VB;
        const cy = (r.top + r.height / 2 - ar.top) / ar.height * G.VB;
        const P = G.S / n;
        const ic = Math.floor((cx - G.LANE) / P);
        const ir = Math.floor((cy - G.LANE) / P);
        read.push({ txt: (t.textContent || '').trim(), ir, ic,
          inRange: ir >= 0 && ir < n && ic >= 0 && ic < n });
      });

      return {
        cr: { x: cr.left, y: cr.top, w: cr.width, h: cr.height },
        boxes, read, live: L, n,
        apparatus: document.querySelectorAll('.tsh-b-fam,.tsh-b-stack,.tsh-b-restore').length,
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
        pageH: document.documentElement.scrollHeight,
        cards: T.cards(T.st).length
      };
    });

    is(errs.length === 0, `${tag} no console errors — ${errs.join(' | ')}`);
    is(m.scrollW <= m.clientW + 1, `${tag} no horizontal overflow (${m.scrollW} vs ${m.clientW})`);
    is(m.cards === 100, `${tag} opens on the full hundred — got ${m.cards}`);

    /* ---- floors, named separately -------------------------------- */
    /* six apparatus controls plus the paid print chip, all on one
       wrapping ledge — see the measured note in the tool's CSS */
    const chrome = m.boxes.filter((x) => x.kind === 'chrome');
    is(chrome.length === 7, `${tag} six apparatus controls plus the print chip — got ${chrome.length}`);
    is(m.apparatus === 6, `${tag} exactly six apparatus controls — got ${m.apparatus}`);
    chrome.forEach((x, i) => {
      is(x.w >= 44 && x.h >= 44, `${tag} chrome floor 44px on button ${i} (${x.w.toFixed(1)}x${x.h.toFixed(1)})`);
    });
    const canvas = m.boxes.filter((x) => x.kind === 'canvas')[0];
    is(canvas && canvas.w >= 34 && canvas.h >= 34,
      `${tag} the shelf is ONE canvas target well above 34px (${canvas && canvas.w.toFixed(1)})`);

    const nums = m.boxes.filter((x) => x.kind === 'num');
    const heads = m.boxes.filter((x) => x.kind === 'head');
    is(nums.length === 100, `${tag} a hundred numerals are drawn — got ${nums.length}`);
    is(heads.length === 20, `${tag} twenty header numerals — got ${heads.length}`);
    const minFs = Math.min.apply(null, nums.concat(heads).map((x) => x.fs));
    is(minFs >= 14, `${tag} TEXT floor 14px — smallest rendered numeral is ${minFs.toFixed(1)}px`);
    /* ⚠ M5 — `100` is the only three-digit card and it must NOT have
       been shrunk to fit. It carries the same font-size as every other
       card and is condensed by textLength instead. */
    const hundred = nums.filter((x) => x.txt === '100')[0];
    is(!!hundred, `${tag} the hundred card is drawn`);
    if (hundred) {
      const two = nums.filter((x) => x.txt === '21')[0];
      is(two && Math.abs(hundred.fs - two.fs) < 0.5,
        `${tag} "100" keeps the same font-size as a two-digit card (${hundred.fs.toFixed(1)} vs ${two && two.fs.toFixed(1)})`);
    }

    /* ---- containment, AGAINST THE CARD --------------------------- */
    const inCard = (x) => x.x >= m.cr.x - 1 && x.y >= m.cr.y - 1
      && x.x + x.w <= m.cr.x + m.cr.w + 1 && x.y + x.h <= m.cr.y + m.cr.h + 1;
    const escaped = m.boxes.filter((x) => !inCard(x));
    is(escaped.length === 0, `${tag} everything is inside the card — ${escaped.length} escaped (${escaped.slice(0, 3).map((e) => e.sel + ':' + e.txt).join(',')})`);

    /* ---- CHECK 1: is the drawn thing WHERE IT CLAIMS TO BE? ------- */
    /* Recomputed from PIXELS, then compared against an oracle written
       here from the spec — so no shared index convention can satisfy
       both sides by accident. */
    const oracle = oracleCards([], false);
    const bad = [];
    m.read.forEach((r) => {
      if (!r.inRange) { bad.push('out of the shelf: ' + r.txt); return; }
      const rv = m.live[r.ir], cv = m.live[r.ic];
      const want = oracle.filter((o) => o.r === rv && o.c === cv)[0];
      if (!want) { bad.push(`no card at ${rv}x${cv}`); return; }
      if (String(want.p) !== r.txt) bad.push(`${rv}x${cv} draws "${r.txt}", should be ${want.p}`);
    });
    is(bad.length === 0, `${tag} every numeral is the product of ITS OWN row and column — ${bad.slice(0, 4).join('; ')}`);

    /* ---- CHECK 2: COLLISION -------------------------------------- */
    const ov = (a, c) => !(a.x + a.w <= c.x + 0.6 || c.x + c.w <= a.x + 0.6
      || a.y + a.h <= c.y + 0.6 || c.y + c.h <= a.y + 0.6);
    const rects = m.boxes.filter((x) => x.kind === 'cardrect');
    let hits = 0;
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
      if (ov(rects[i], rects[j])) hits++;
    }
    is(hits === 0, `${tag} no two cards overlap — ${hits} collisions`);
    let chits = 0;
    for (let i = 0; i < chrome.length; i++) for (let j = i + 1; j < chrome.length; j++) {
      if (ov(chrome[i], chrome[j])) chits++;
    }
    is(chits === 0, `${tag} no two ledge buttons overlap — ${chits} collisions`);
    const arenaBox = canvas;
    const ledgeOnArena = chrome.filter((x) => ov(x, arenaBox)).length;
    is(ledgeOnArena === 0, `${tag} the ledge does not sit on the shelf — ${ledgeOnArena}`);
    /* ⚠ MEASURE THE INK, NOT THE LINE BOX. `getBoundingClientRect` on an
       SVG <text> returns the LAYOUT box — 48px tall for a 30px font —
       so comparing it against a 43px card reported all one hundred
       numerals as escaping a tool that was drawing them correctly.
       `getBBox()` returns the tight glyph geometry in user units, which
       is the thing the eye actually sees. Verify the measurement before
       the defect. */
    const ink = await p.evaluate(() => {
      /* ⚠ getBBox's HEIGHT is the em box too — only its WIDTH is ink.
         So the vertical question is asked as cap-height clearance
         instead: Baloo 2's caps run about 0.72em, and a digit never
         descends. This is the third measurement of this one property;
         the first two were both wrong in the tool's favour. */
      const cards = document.querySelectorAll('.tsh-card');
      const nums = document.querySelectorAll('.tsh-p');
      let outside = 0, worst = '';
      for (let i = 0; i < nums.length && i < cards.length; i++) {
        const c = cards[i].getBBox(), t = nums[i].getBBox();
        const fs = parseFloat(nums[i].getAttribute('font-size'));
        const capH = fs * 0.78;
        if (t.x < c.x - 0.5 || t.x + t.width > c.x + c.width + 0.5 || capH > c.height + 0.5) {
          outside++;
          if (!worst) worst = nums[i].textContent + ' ink w' + t.width.toFixed(0)
            + ' cap' + capH.toFixed(0) + ' in card ' + c.width.toFixed(0);
        }
      }
      return { outside, worst };
    });
    is(ink.outside === 0, `${tag} every numeral's INK sits inside its own card — ${ink.outside} outside (${ink.worst})`);

    /* ---- no vertical clipping ------------------------------------ */
    const lowest = Math.max.apply(null, m.boxes.map((x) => x.y + x.h));
    is(lowest <= C.h + 1, `${tag} nothing is cut off below the fold (lowest ${lowest.toFixed(0)} vs ${C.h})`);

    await p.close();
  }

  /* =============== driving it, at one viewport ==================== */
  const { p, errs } = await open(b, 768, 1024);

  const state = () => p.evaluate(() => {
    const T = window.TimesShelf;
    return {
      live: T.live(T.st), cards: T.cards(T.st).length, seats: T.seats(T.st).length,
      stacked: T.st.stacked,
      diag: T.cards(T.st).filter((c) => c.r === c.c).length,
      rects: document.querySelectorAll('.tsh-card').length,
      seatRects: document.querySelectorAll('.tsh-seat').length,
      lit: document.querySelectorAll('.tsh-card.is-lit').length,
      headLit: document.querySelectorAll('.tsh-h.is-lit').length,
      stackDisabled: document.querySelector('.tsh-b-stack').disabled,
      restoreDisabled: document.querySelector('.tsh-b-restore').disabled,
      famDisabled: Array.prototype.map.call(document.querySelectorAll('.tsh-b-fam'), (n) => n.disabled),
      pads: document.querySelectorAll('.tsh-pad').length
    };
  });

  let s = await state();
  is(s.cards === 100 && s.rects === 100, `opens on a hundred cards (${s.cards}/${s.rects})`);
  is(s.stackDisabled === true, 'STACK is refused before the four families are away — visibly disabled');
  is(s.restoreDisabled === true, 'PUT IT ALL BACK is refused in the virgin state');
  is(s.pads === 121, `121 keyboard pads at ten wide — got ${s.pads}`);

  /* ---- CHECK 3: CONSEQUENCE, per control ------------------------- */
  const before = s;
  await pressBtn(p, '.tsh-b-fam', 0, 'put away the ones');
  s = await state();
  is(s.cards === 81 && s.rects === 81, `the ones cross removes 19 — ${before.cards} to ${s.cards}`);
  is(s.live.join() === '2,3,4,5,6,7,8,9,10', `the ones are gone from the headers — ${s.live.join()}`);
  is(s.diag === 9, `a family toggle must NOT touch the rest of the diagonal — ${s.diag} squares standing`);
  is(s.seatRects === 0, 'a family removal leaves NO empty seat — the shelf closes up');
  is(s.restoreDisabled === false, 'PUT IT ALL BACK became live');

  /* the cards GREW — the whole legibility argument, measured */
  const grew = await p.evaluate(() => {
    const r = document.querySelector('.tsh-card').getBoundingClientRect();
    return r.width;
  });
  await pressBtn(p, '.tsh-b-fam', 0, 'put the ones back');
  s = await state();
  is(s.cards === 100, `the family button is a TOGGLE — back to ${s.cards}`);
  const orig = await p.evaluate(() => document.querySelector('.tsh-card').getBoundingClientRect().width);
  is(grew > orig + 2, `the cards GROW when a family goes (${orig.toFixed(1)} -> ${grew.toFixed(1)}px)`);

  /* all four, then stack */
  for (let i = 0; i < 4; i++) await pressBtn(p, '.tsh-b-fam', i, `family ${i}`);
  s = await state();
  is(s.cards === 36 && s.live.join() === '3,4,6,7,8,9', `the residue is 36 on {3,4,6,7,8,9} — ${s.cards} / ${s.live.join()}`);
  is(s.stackDisabled === false, 'STACK went live once all four were away');

  const liveBefore = s.live.join();
  await pressBtn(p, '.tsh-b-stack', 0, 'stack');
  s = await state();
  is(s.cards === 21 && s.rects === 21, `⭐ TWENTY-ONE cards — got ${s.cards}`);
  is(s.seats === 15 && s.seatRects === 15, `fifteen seats stay empty — ${s.seats}/${s.seatRects}`);
  is(s.diag === 6, `six squares survive — ${s.diag}`);
  is(s.live.join() === liveBefore, 'STACK must NOT change the live row set');
  is(s.famDisabled.every((d) => d === true), 'the family buttons are visibly disabled while stacked');

  /* ⚠ EXISTENCE IS NOT VISIBILITY, and asserting the first while
     meaning the second is how the payoff of the whole STACK move
     shipped invisible once: fifteen `.tsh-second` nodes were present
     and every one of them was covered by the lip painted on top of it.
     So MEASURE THE PEEK — how much of the card underneath actually
     protrudes past the card on top. */
  const dbl = await p.evaluate(() => {
    const seconds = document.querySelectorAll('.tsh-second');
    const cards = document.querySelectorAll('.tsh-card');
    if (!seconds.length) return { n: 0, peek: 0 };
    let worst = Infinity, best2 = -Infinity;
    for (let i = 0; i < seconds.length; i++) {
      const s = seconds[i].getBoundingClientRect();
      /* the top card that sits on it is the nearest one up-left */
      let best = null, bd = Infinity;
      for (let j = 0; j < cards.length; j++) {
        const c = cards[j].getBoundingClientRect();
        const d = Math.abs(c.left - s.left) + Math.abs(c.top - s.top);
        if (d < bd) { bd = d; best = c; }
      }
      const peek = Math.min(s.right - best.right, s.bottom - best.bottom);
      if (peek < worst) worst = peek;
      if (peek > best2) best2 = peek;
    }
    return { n: seconds.length, peek: worst, spread: best2 - worst };
  });
  is(dbl.n === 15, `fifteen cards hold two — got ${dbl.n}`);
  is(dbl.peek >= 3, `⭐ and the card underneath is VISIBLE, not merely present — peek ${dbl.peek.toFixed(1)}px`);
  /* ⚠ a MINIMUM hides an asymmetry: the outermost column and row were
     trimmed by the clip and the min still cleared its floor. Uniformity
     is the property that was actually wanted. */
  is(dbl.spread < 1, `every doubled card shows the SAME peek — spread ${dbl.spread.toFixed(2)}px`);

  /* ---- the same-number look ------------------------------------- */
  await pressBtn(p, '.tsh-b-stack', 0, 'unstack');
  await pressBtn(p, '.tsh-b-restore', 0, 'put it all back');
  s = await state();
  is(s.cards === 100, `PUT IT ALL BACK restores the hundred — ${s.cards}`);

  await pressCard(p, 3, 4);
  s = await state();
  is(s.lit === 4, `⭐ twelve lives in FOUR places — ${s.lit} lit`);
  is(s.headLit === 2, `the pressed card lights its own two headers — ${s.headLit}`);
  await p.mouse.up();
  await wait(120);

  await pressCard(p, 6, 6);
  s = await state();
  is(s.lit === 3, `thirty-six lives in THREE — ${s.lit} lit (and that is why it is not a mirror)`);
  await p.mouse.up();
  await wait(120);

  await pressCard(p, 7, 7);
  s = await state();
  is(s.lit === 1, `forty-nine lives in ONE — ${s.lit} lit`);
  await p.mouse.up();
  await wait(160);
  s = await state();
  is(s.lit === 0, 'the look is transient — it clears on release');

  /* ---- keyboard ------------------------------------------------- */
  const kb = await p.evaluate(() => {
    const pads = document.querySelectorAll('.tsh-pad');
    let tabbable = 0;
    pads.forEach((n) => { if (n.tabIndex === 0) tabbable++; });
    return { tabbable, first: pads[0].getAttribute('data-kind'), labelled: Array.prototype.every.call(pads, (n) => !!n.getAttribute('aria-label')) };
  });
  is(kb.tabbable === 1, `the 121 pads are ONE tab stop — got ${kb.tabbable}`);
  is(kb.labelled, 'every pad carries an accessible name');

  await p.evaluate(() => document.querySelectorAll('.tsh-pad')[0].focus());
  await p.keyboard.press('ArrowDown');
  await p.keyboard.press('ArrowRight');
  const focus = await p.evaluate(() => {
    const n = document.activeElement;
    return { kind: n.getAttribute('data-kind'), label: n.getAttribute('aria-label') };
  });
  is(focus.kind === 'cell', `arrows walk from the corner into the grid — landed on ${focus.kind}`);
  is(/row 1, column 1/.test(focus.label || ''), `and the pad names itself — "${focus.label}"`);

  await p.keyboard.press('Enter');
  await wait(150);
  const litK = await p.evaluate(() => document.querySelectorAll('.tsh-card.is-lit').length);
  is(litK >= 1, `Enter on a card performs the look — ${litK} lit`);

  /* every family button reachable by keyboard AND by synthetic click */
  const synth = await p.evaluate(() => {
    const n = document.querySelectorAll('.tsh-b-fam')[1];
    const was = window.TimesShelf.cards(window.TimesShelf.st).length;
    n.click();
    return { was, now: window.TimesShelf.cards(window.TimesShelf.st).length };
  });
  is(synth.now === synth.was - 19, `a synthetic .click() drives the tool (${synth.was} -> ${synth.now})`);

  is(errs.length === 0, `no console errors while driving — ${errs.join(' | ')}`);
  await p.close();

  /* =============== the print sheet ================================ */
  const { p: pp } = await open(b, 1024, 900);
  const sheet = await pp.evaluate(() => {
    const T = window.TimesShelf;
    T.premium = true;
    for (const k of [1, 2, 5, 10]) T.st = T.putAway(T.st, k);
    T.st = T.stack(T.st);
    T._paint();
    T._buildSheet();
    const sh = document.querySelector('.tsh-sheet');
    return {
      exists: !!sh,
      sibling: !!sh && sh.parentNode === document.querySelector('.tsh-wrap').parentNode,
      insideWrap: !!sh && !!sh.closest('.tsh-wrap'),
      items: sh ? sh.querySelectorAll('li').length : 0,
      texts: sh ? Array.prototype.map.call(sh.querySelectorAll('li'), (n) => n.textContent) : [],
      rects: sh ? sh.querySelectorAll('.tsh-p-card').length : 0,
      gone: sh ? sh.querySelectorAll('.tsh-p-gone').length : 0
    };
  });
  is(sheet.exists, 'the print sheet is built');
  is(sheet.sibling && !sheet.insideWrap,
    '⚠ the sheet is a SIBLING of the wrap — a hidden parent kills the whole subtree on paper');
  is(sheet.items === 21, `the study list prints TWENTY-ONE facts — got ${sheet.items}`);
  is(sheet.rects === 21 && sheet.gone === 15, `the sheet draws the shelf as it stands (${sheet.rects} standing, ${sheet.gone} retired)`);
  const twentyFours = sheet.texts.filter((t) => / 24$/.test(t)).length;
  is(twentyFours === 2, `⚠ the sheet keeps BOTH twenty-fours — got ${twentyFours}`);
  const smallerFirst = sheet.texts.every((t) => {
    const m2 = t.match(/^(\d+) . (\d+) = (\d+)$/);
    return m2 && Number(m2[1]) <= Number(m2[2]) && Number(m2[1]) * Number(m2[2]) === Number(m2[3]);
  });
  is(smallerFirst, 'every printed fact is smaller-factor-first and arithmetically true');
  await pp.close();

  await b.close();
  srv.close();
  console.log(`\nlocal-test-times-shelf: ${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})();
