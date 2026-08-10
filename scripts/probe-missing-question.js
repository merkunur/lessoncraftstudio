/* =====================================================================
   RENDER PROBE — TOOL #55, THE MISSING QUESTION
   =====================================================================
   ⚠⚠ REAL POINTER INPUT ONLY. Nothing here calls page.evaluate to set
   state. #54's headline branch shipped unreachable under 626 assertions
   and 16 pixel checks because every gate reached the model directly, and
   #41's flag shipped INVISIBLE because eleven scripts asserted
   `!!querySelector` and never once dragged it.

   ⚠⚠ AND EVERY OTHER GATE ON THIS SHELF MEASURES ONE BOX AGAINST A
   FLOOR. #22 shipped a build hint clipped mid-word under an absolutely
   positioned speaker while 141 such assertions were green, because not
   one of them asked whether two rendered things COLLIDE. So this probe
   asks three questions no floor can answer:

     1. does anything sit OUTSIDE THE CARD (.lcs-app carries
        `overflow:hidden`, so outside the card is not merely ugly, it is
        gone — and the shell pins html and body to overflow:hidden too);
     2. do any two rendered things OVERLAP;
     3. is the drawn thing WHERE IT CLAIMS TO BE — a shutter marked down
        must actually cover the region it is drawn over.

   ⚠ THE MARKS ARE NOT TAP TARGETS, BY CONSTRUCTION. At a=16 on the
   704px surface a mark draws about 33px, under the 34px canvas floor,
   so the child taps PLACES and never objects. This probe therefore does
   NOT hold the marks to a tap floor. It holds them to a LEGIBILITY floor
   (12px, the minimum honest mark with no interior feature), asserts they
   are not clickable affordances, and separately proves the two PLACES —
   the ledge and the air — and both shutters really do respond to a
   pointer.

   Run: node scripts/probe-missing-question.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.MISSING_QUESTION_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'missing-question', 'qa');
/* ⚠ env-overridable: a hard-coded port makes the gate unrunnable while a
   sibling gate or an orphaned poison run holds it, and "cannot bind" is
   indistinguishable from "failed" at a glance. */
const PORT = Number(process.env.MISSING_QUESTION_PORT) || 5682;
const SHOT = [360, 768, 1024];

/* the two floors are SEPARATE and they are different numbers */
const TAP_FLOOR = 44;      /* chrome controls */
const MARK_FLOOR = 12;     /* legibility of a mark — NOT a tap floor */

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'missing-question.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

/* ------------------------------------------------------------------ */
/* Read the apparatus in PIXELS. The oracle must not share the
   renderer's convention (#44 shipped a mirrored profile that way), so
   everything below comes from getBoundingClientRect and computed style
   — never from a model field or a class name that means "should be". */
const READ = () => {
  const R = e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, b: b.bottom, r: b.right }; };
  const card = document.querySelector('.lcs-app');
  const stage = document.querySelector('.mqu-stage');
  if (!card || !stage) return null;
  const q = s => document.querySelector(s);
  const named = {};
  ['.mqu-stage', '.mqu-air', '.mqu-ledge', '.mqu-bar', '.mqu-total', '.mqu-list', '.mqu-say',
    '.mqu-row', '.mqu-gate', '.mqu-b-ledge', '.mqu-b-air', '.mqu-b-tally', '.mqu-b-deal', '.mqu-b-print']
    .forEach(function (s) { const e = q(s); if (e) named[s] = R(e); });

  const down = s => { const e = q(s); return !!e && e.className.indexOf('is-down') >= 0; };
  const shutRect = s => { const e = q(s); const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 ? R(e) : null; };

  const marks = [].slice.call(document.querySelectorAll('.mqu-mark'));
  const visMarks = marks.filter(m => {
    const b = m.getBoundingClientRect();
    return b.width > 0 && getComputedStyle(m.parentNode).visibility !== 'hidden';
  });
  const markBoxes = visMarks.map(R);

  /* things a collision check must consider: laid-out siblings, plus the
     three bands inside the stage. A shutter is EXPECTED to cover its own
     region, so it is handled separately by the covers-what-it-claims
     check rather than counted as a collision. */
  const collide = [];
  ['.mqu-stage', '.mqu-total', '.mqu-list', '.mqu-say', '.mqu-row', '.mqu-gate']
    .forEach(function (s) { const e = q(s); if (e && e.getBoundingClientRect().height > 0) collide.push({ s: s, r: R(e) }); });
  ['.mqu-air', '.mqu-bar', '.mqu-ledge']
    .forEach(function (s) { const e = q(s); if (e && e.getBoundingClientRect().height > 0) collide.push({ s: s, r: R(e) }); });
  ['.mqu-b-ledge', '.mqu-b-air', '.mqu-b-tally', '.mqu-b-deal', '.mqu-b-print']
    .forEach(function (s) { const e = q(s); if (e && e.getBoundingClientRect().height > 0) collide.push({ s: s, r: R(e) }); });
  /* the paragraphs and the tally pills, which is where #22's clip lived */
  [].slice.call(document.querySelectorAll('.mqu-pair')).forEach(function (e, i) {
    if (e.getBoundingClientRect().height > 0) collide.push({ s: '.mqu-pair[' + i + ']', r: R(e) });
  });

  /* ⚠ a mark must not be a clickable AFFORDANCE. It may sit inside a
     region that is one — that is the design — but it must not announce
     itself, take focus, or carry a pointer cursor of its own. */
  const markAffordance = visMarks.slice(0, 6).map(function (m) {
    const cs = getComputedStyle(m);
    return {
      ariaHidden: m.getAttribute('aria-hidden'),
      tabindex: m.getAttribute('tabindex'),
      role: m.getAttribute('role'),
      cursor: cs.cursor,
      tag: m.tagName
    };
  });

  return {
    card: R(card),
    named: named,
    marks: markBoxes.length,
    markW: markBoxes.length ? Math.min.apply(null, markBoxes.map(b => Math.min(b.w, b.h))) : null,
    markBoxes: markBoxes,
    markAffordance: markAffordance,
    ledgeDown: down('.mqu-shut-ledge'),
    airDown: down('.mqu-shut-air'),
    ledgeShut: shutRect('.mqu-shut-ledge'),
    airShut: shutRect('.mqu-shut-air'),
    listOn: (q('.mqu-list').className.indexOf('is-on') >= 0),
    pairs: document.querySelectorAll('.mqu-pair').length,
    total: q('.mqu-total').textContent,
    say: q('.mqu-say').textContent,
    tallyOff: q('.mqu-b-tally').className.indexOf('is-off') >= 0,
    tallyLabel: q('.mqu-b-tally .mqu-label').textContent,
    stageAria: q('.mqu-stage').getAttribute('aria-label') || '',
    collide: collide,
    /* the escape: can the page actually be scrolled if it needs to be? */
    docH: document.documentElement.scrollHeight,
    winH: window.innerHeight,
    htmlOverflow: getComputedStyle(document.documentElement).overflowY,
    bodyOverflow: getComputedStyle(document.body).overflowY,
    appOverflow: getComputedStyle(card).overflowY
  };
};

/* ------------------------------------------------------------------ */
const fails = [];
let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

/* ⚠ A `display:none` ELEMENT HAS A ZERO RECT AT (0,0), AND THAT IS NOT
   AN OVERFLOW. My first run reported `.mqu-list is OUTSIDE THE CARD` at
   every viewport in every state — the tally list is legitimately hidden
   until a shutter is down. A wrong measurement dressed as a defect, and
   it would have taught me to loosen a correct check. Rects with no area
   are skipped; rects with area are held to the card exactly. */
const drawn = r => r && r.w > 0.5 && r.h > 0.5;
const inside = (r, box, tol) => r.x >= box.x - tol && r.y >= box.y - tol &&
  r.r <= box.r + tol && r.b <= box.b + tol;
const overlap = (a, b) => Math.max(a.x, b.x) < Math.min(a.r, b.r) - 0.6 &&
  Math.max(a.y, b.y) < Math.min(a.b, b.b) - 0.6;
const covers = (lid, box, tol) => lid.x <= box.x + tol && lid.y <= box.y + tol &&
  lid.r >= box.r - tol && lid.b >= box.b - tol;

/* ⚠ POISON THE GEOMETRY HELPERS BEFORE TRUSTING THEM. #40's production
   gate keyed on a selector the tool never emits and compared two EMPTY
   NodeLists, so it would have passed on a tool with no tapes at all. */
{
  const A = { x: 0, y: 0, w: 10, h: 10, r: 10, b: 10 };
  const B = { x: 5, y: 5, w: 10, h: 10, r: 15, b: 15 };
  const C = { x: 20, y: 20, w: 10, h: 10, r: 30, b: 30 };
  ok(overlap(A, B), 'poison: overlap() failed to fire on two boxes that plainly overlap');
  ok(!overlap(A, C), 'poison: overlap() fired on two boxes that do not touch');
  ok(!overlap(A, { x: 10, y: 0, w: 10, h: 10, r: 20, b: 10 }), 'poison: overlap() fired on edge-to-edge boxes');
  ok(inside(A, { x: -1, y: -1, w: 20, h: 20, r: 19, b: 19 }, 0), 'poison: inside() failed on a contained box');
  ok(!inside(C, A, 0), 'poison: inside() passed a box that is outside');
  ok(!drawn({ x: 0, y: 0, w: 0, h: 0, r: 0, b: 0 }), 'poison: drawn() counted a zero rect as rendered');
  ok(drawn(A), 'poison: drawn() rejected a box with area');
  ok(covers({ x: -1, y: -1, w: 12, h: 12, r: 11, b: 11 }, A, 0), 'poison: covers() failed on a lid that covers');
  ok(!covers({ x: 0, y: 0, w: 5, h: 5, r: 5, b: 5 }, A, 0), 'poison: covers() passed a lid half the size of its box');
}

/* ⚠⚠ A CLICK HELPER THAT SILENTLY DOES NOTHING HOLLOWS OUT EVERY
   ASSERTION AFTER IT (#39: a no-op click made "the toggle is not
   swapped" pass because nothing had been toggled). This one THROWS.
   ⚠ And it scrolls first, because a real teacher scrolls: a control
   below the fold is reachable if the page moves and unreachable if it
   does not — which is a separate, explicitly measured assertion, not
   something to be quietly absorbed here. */
const clickSel = async (p, sel) => {
  const h = await p.$(sel);
  if (!h) throw new Error('no element for ' + sel);
  let box = await h.boundingBox();
  if (!box || box.width < 1 || box.height < 1) throw new Error('zero-size target ' + sel);
  const vh = p.viewport().height;
  if (box.y < 0 || box.y + box.height > vh) {
    await h.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 120));
    box = await h.boundingBox();
  }
  if (!box || box.y < 0 || box.y + box.height > vh) {
    throw new Error('UNREACHABLE target ' + sel + ' — it cannot be brought into a ' + vh + 'px viewport');
  }
  /* ⚠ REAL POINTER INPUT. A synthetic .click() never fires pointerdown,
     which is how #41's flag scored DEAD on all nine paths. */
  await p.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(r => setTimeout(r, 220));
  return true;
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  const VIEWS = [
    { w: 320, h: 568 }, { w: 360, h: 640 }, { w: 412, h: 732 }, { w: 704, h: 900 },
    { w: 768, h: 1024 }, { w: 1024, h: 768 }, { w: 1366, h: 768 }, { w: 1920, h: 1080 }
  ];

  for (const v of VIEWS) {
    const tag = v.w;
    const p = await b.newPage();
    p.on('pageerror', e => fails.push(tag + ': page error ' + e.message));
    /* ⚠ TWO 404s ARE THE HARNESS, NOT THE TOOL, AND THEY ARE NAMED
       RATHER THAN BLANKET-IGNORED: /favicon.ico is the browser, and
       /api/entitlement is the platform endpoint this static server does
       not host — the tool is REQUIRED to degrade to the free tier when
       it is absent, so its 404 is the designed path. Everything else is
       a failure. */
    p.on('console', m => {
      if (m.type() !== 'error') return;
      const t = m.text();
      if (/favicon\.ico/.test(t) || /api\/entitlement/.test(t)) return;
      if (/status of 404/.test(t) && !/missing-question|lcs-shell/.test(t)) return;
      fails.push(tag + ': console error ' + t);
    });
    await p.setViewport({ width: v.w, height: v.h });
    await p.goto('http://127.0.0.1:' + PORT + '/mini-tools/missing-question.html?lang=en',
      { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 550));

    /* ---- NON-VACUITY FIRST ------------------------------------------
       Assert the collection is non-empty and in range BEFORE asserting
       anything about its contents. */
    const s0 = await p.evaluate(READ);
    if (!s0) { fails.push(tag + ': ⚠⚠ NOTHING RENDERED — no card or no stage'); await p.close(); continue; }
    ok(Object.keys(s0.named).length >= 13, tag + ': non-vacuity — only ' + Object.keys(s0.named).length + ' named parts rendered');
    ok(s0.card.w > 100 && s0.card.h > 100, tag + ': non-vacuity — the card measures ' + s0.card.w + 'x' + s0.card.h);
    ok(s0.marks >= 4, tag + ': non-vacuity — only ' + s0.marks + ' marks are drawn; there is nothing to look at');
    ok(s0.marks <= 16, tag + ': ' + s0.marks + ' marks drawn, over the declared cap of 16');
    ok(s0.collide.length >= 10, tag + ': non-vacuity — the collision set holds only ' + s0.collide.length + ' boxes');
    ok(+s0.total >= 4 && +s0.total <= 16, tag + ': the total reads "' + s0.total + '"');
    ok(+s0.total === s0.marks, tag + ': ⚠ the tally reads ' + s0.total + ' but ' + s0.marks + ' marks are drawn');
    ok(!s0.ledgeDown && !s0.airDown, tag + ': a shutter is already down at rest');
    ok(!s0.listOn, tag + ': the tally is showing before anything is hidden');
    ok(s0.tallyOff, tag + ': ⚠⚠ the tally control is LIVE with nothing hidden — the tool asks its own question');

    /* ---- the two floors, SEPARATELY ---------------------------------- */
    ['.mqu-b-ledge', '.mqu-b-air', '.mqu-b-tally', '.mqu-b-deal', '.mqu-b-print'].forEach(function (sel) {
      const r = s0.named[sel];
      ok(!!r, tag + ': the control ' + sel + ' did not render');
      if (r) ok(Math.min(r.w, r.h) >= TAP_FLOOR,
        tag + ': ⚠ the control ' + sel + ' measures ' + Math.round(Math.min(r.w, r.h)) + 'px, under the ' + TAP_FLOOR + 'px chrome floor');
    });
    ok(s0.markW >= MARK_FLOOR,
      tag + ': ⚠ a mark measures ' + (s0.markW == null ? 'null' : s0.markW.toFixed(1)) +
      'px, under the ' + MARK_FLOOR + 'px minimum honest mark');

    /* ⚠ AND THE MARKS MUST NOT BE TAP TARGETS. They are deliberately
       allowed under 34px, which is only honest if nothing about them
       invites a tap. */
    ok(s0.markAffordance.length > 0, tag + ': non-vacuity — no mark was inspected for affordance');
    s0.markAffordance.forEach(function (m, i) {
      ok(m.ariaHidden === 'true', tag + ': mark[' + i + '] is not aria-hidden — the marks are not tap targets and must not be announced');
      ok(m.tabindex === null, tag + ': mark[' + i + '] is focusable');
      ok(m.role === null, tag + ': mark[' + i + '] claims a role');
      ok(m.cursor !== 'pointer', tag + ': ⚠ mark[' + i + '] carries a pointer cursor — it invites a tap it is too small to take');
      ok(m.tag !== 'BUTTON' && m.tag !== 'A', tag + ': mark[' + i + '] is a <' + m.tag + '>');
    });

    /* ---- CONTAINMENT AGAINST THE CARD, NOT THE INNER BOX -------------
       `.lcs-app` carries overflow:hidden, so anything past its edge is
       not untidy — it is GONE. An inner `overflow-x:auto` would absorb
       the evidence, which is why the card is the reference. */
    const contain = (st, when) => {
      Object.keys(st.named).forEach(function (sel) {
        if (!drawn(st.named[sel])) return;      /* legitimately hidden */
        ok(inside(st.named[sel], st.card, 1.5),
          tag + ': ⚠⚠ ' + sel + ' is OUTSIDE THE CARD ' + when +
          ' (' + Math.round(st.named[sel].x) + ',' + Math.round(st.named[sel].y) +
          ' ' + Math.round(st.named[sel].w) + 'x' + Math.round(st.named[sel].h) +
          ' vs card ' + Math.round(st.card.w) + 'x' + Math.round(st.card.h) + ')');
      });
      st.markBoxes.forEach(function (m, i) {
        ok(inside(m, st.card, 1.5), tag + ': ⚠ mark[' + i + '] is outside the card ' + when);
      });
      ok(st.card.r <= v.w + 1.5, tag + ': the card itself overflows the viewport ' + when);
    };
    const collideCheck = (st, when) => {
      for (let i = 0; i < st.collide.length; i++) {
        for (let j = i + 1; j < st.collide.length; j++) {
          const A = st.collide[i], B = st.collide[j];
          /* .mqu-stage contains the three bands; .mqu-row contains the
             buttons; .mqu-list contains the pairs — ancestors, not
             collisions. */
          const anc = (x, y) => (x === '.mqu-stage' && ['.mqu-air', '.mqu-bar', '.mqu-ledge'].indexOf(y) >= 0) ||
            (x === '.mqu-row' && y.indexOf('.mqu-b-') === 0) ||
            (x === '.mqu-list' && y.indexOf('.mqu-pair') === 0);
          if (anc(A.s, B.s) || anc(B.s, A.s)) continue;
          ok(!overlap(A.r, B.r),
            tag + ': ⚠⚠ ' + A.s + ' and ' + B.s + ' OVERLAP ' + when +
            ' — one of them is drawn on top of the other');
        }
      }
    };
    contain(s0, 'at rest');
    collideCheck(s0, 'at rest');

    /* ⚠⚠ REACHABILITY, MEASURED — NOT INFERRED FROM A CSS PROPERTY.
       This is the assertion that catches the #22 class, and it must ask
       the question the child asks: CAN I GET TO THE CONTROL? Reading
       `overflow-y` is not that question — a rule can be PRESENT and
       INERT, which is exactly what happened here: `overflow-y:auto`
       without `height:auto; min-height:100%` leaves the shell's
       `height:100%` pinned, the document never grows, scrollY stays 0,
       and every control below the fold is gone. Two shipped siblings
       still ship the inert form. So: scroll as far as the page will go,
       then measure whether the LOWEST control has come into view. */
    const reach = await p.evaluate(() => {
      window.scrollTo(0, 999999);
      const sy = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      let low = 0, name = '';
      [].slice.call(document.querySelectorAll('.mqu-btn')).forEach(function (e) {
        const r = e.getBoundingClientRect();
        if (r.height > 0 && r.bottom > low) { low = r.bottom; name = e.className.split(' ').pop(); }
      });
      const res = { sy: sy, low: Math.round(low), name: name, win: window.innerHeight,
        maxScroll: Math.max(0, document.documentElement.scrollHeight - window.innerHeight) };
      window.scrollTo(0, 0);
      return res;
    });
    ok(reach.name !== '', tag + ': non-vacuity — the reachability check found no control to measure');
    ok(reach.low <= reach.win + 1,
      tag + ': ⚠⚠ THE LOWEST CONTROL IS PHYSICALLY UNREACHABLE — ' + reach.name +
      ' sits at ' + reach.low + 'px with the page scrolled as far as it goes (' + reach.sy +
      ' of a possible ' + reach.maxScroll + ') in a ' + reach.win + 'px window');
    ok(s0.docH <= s0.winH + 2 || reach.maxScroll > 0,
      tag + ': ⚠⚠ the document is ' + s0.docH + 'px in a ' + s0.winH +
      'px window and NOTHING CAN BE SCROLLED — the scroll escape is present but inert');

    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'frame-' + tag + '.png'), fullPage: true });

    /* ---- DRIVE IT BY POINTER ---------------------------------------- */
    /* the LEDGE is a PLACE: clicking it must close its shutter */
    await clickSel(p, '.mqu-ledge');
    const s1 = await p.evaluate(READ);
    ok(s1.ledgeDown, tag + ': ⚠⚠ clicking the LEDGE did nothing — the child taps places, and the place is dead');
    ok(!s1.airDown, tag + ': clicking the ledge also closed the air shutter');
    ok(s1.ledgeShut !== null, tag + ': the ledge shutter is marked down but draws nothing');
    /* ⭐ AND THE DRAWN THING MUST BE WHERE IT CLAIMS TO BE. */
    if (s1.ledgeShut && s1.named['.mqu-ledge']) {
      ok(covers(s1.ledgeShut, s1.named['.mqu-ledge'], 1.5),
        tag + ': ⚠⚠ THE LEDGE SHUTTER DOES NOT COVER THE LEDGE — lid ' +
        Math.round(s1.ledgeShut.w) + 'x' + Math.round(s1.ledgeShut.h) + ' at y' + Math.round(s1.ledgeShut.y) +
        ', region ' + Math.round(s1.named['.mqu-ledge'].w) + 'x' + Math.round(s1.named['.mqu-ledge'].h) +
        ' at y' + Math.round(s1.named['.mqu-ledge'].y));
      ok(inside(s1.ledgeShut, s1.card, 1.5), tag + ': the ledge shutter is drawn outside the card');
    }
    ok(!s1.tallyOff, tag + ': the tally control is still dead with a shutter down');
    contain(s1, 'with the ledge shut');
    collideCheck(s1, 'with the ledge shut');

    /* the AIR is the other place */
    await clickSel(p, '.mqu-air');
    const s2 = await p.evaluate(READ);
    ok(s2.airDown && s2.ledgeDown, tag + ': ⚠⚠ clicking the AIR did not close its shutter (air=' + s2.airDown + ')');
    if (s2.airShut && s2.named['.mqu-air']) {
      ok(covers(s2.airShut, s2.named['.mqu-air'], 1.5),
        tag + ': ⚠⚠ THE AIR SHUTTER DOES NOT COVER THE AIR — lid ' +
        Math.round(s2.airShut.w) + 'x' + Math.round(s2.airShut.h) + ' at y' + Math.round(s2.airShut.y) +
        ', region ' + Math.round(s2.named['.mqu-air'].w) + 'x' + Math.round(s2.named['.mqu-air'].h) +
        ' at y' + Math.round(s2.named['.mqu-air'].y));
    }
    ok(!overlap(s2.ledgeShut || { x: 0, y: 0, r: 0, b: 0 }, s2.airShut || { x: 9e9, y: 9e9, r: 9e9, b: 9e9 }),
      tag + ': ⚠⚠ the two shutters OVERLAP each other');
    contain(s2, 'with both shut');
    collideCheck(s2, 'with both shut');
    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'both-shut-' + tag + '.png'), fullPage: true });

    /* ⭐⭐ THE HEADLINE, BY POINTER: both shutters down, the tally showing
       a-1 pairs. #54's equivalent branch shipped unreachable. */
    await clickSel(p, '.mqu-b-tally');
    const s3 = await p.evaluate(READ);
    ok(s3.listOn, tag + ': ⚠⚠ THE HEADLINE IS UNREACHABLE BY POINTER — the tally would not open with both shutters down');
    ok(s3.pairs === +s0.total - 1,
      tag + ': ⚠⚠ the tally lists ' + s3.pairs + ' pairs; ' + (+s0.total - 1) + ' decompositions of ' + s0.total + ' exist');
    ok(s3.pairs >= 3, tag + ': only ' + s3.pairs + ' pairs — there is nothing to decompose');
    ok(s3.say.length > 0, tag + ': the tally says nothing');
    ok(s3.tallyLabel.length > 0, tag + ': the tally control lost its label');
    contain(s3, 'with the tally showing');
    collideCheck(s3, 'with the tally showing');
    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'tally-' + tag + '.png'), fullPage: true });

    /* the shutter itself is a tap target — click it to re-open */
    await clickSel(p, '.mqu-shut-ledge');
    const s4 = await p.evaluate(READ);
    ok(!s4.ledgeDown, tag + ': ⚠ clicking the down SHUTTER did not re-open it');
    ok(s4.listOn, tag + ': the tally went away while the air is still hidden');
    ok(s4.pairs === 1, tag + ': one shutter left did not fix exactly one pair (' + s4.pairs + ')');
    contain(s4, 'with one shutter re-opened');

    /* ⚠ opening the LAST shutter must take the tally with it */
    await clickSel(p, '.mqu-shut-air');
    const s5 = await p.evaluate(READ);
    ok(!s5.airDown && !s5.ledgeDown, tag + ': the air shutter would not re-open');
    ok(!s5.listOn, tag + ': ⚠ the tally is still up with NOTHING hidden — it describes a frame nobody is hiding');
    ok(s5.tallyOff, tag + ': the tally control is live again with nothing hidden');
    ok(s5.marks === +s5.total, tag + ': the marks did not come back (' + s5.marks + ' of ' + s5.total + ')');

    /* the deal must produce a legal frame at every viewport */
    let dealtOK = 0;
    for (let i = 0; i < 6; i++) {
      await clickSel(p, '.mqu-b-deal');
      const d = await p.evaluate(READ);
      ok(d.marks === +d.total, tag + ': after a deal ' + d.marks + ' marks are drawn but the tally reads ' + d.total);
      ok(+d.total >= 4 && +d.total <= 16, tag + ': the deal produced a total of ' + d.total);
      ok(!d.ledgeDown && !d.airDown, tag + ': the deal left a shutter down');
      ok(!d.listOn, tag + ': the deal left the tally up');
      ok(d.markW >= MARK_FLOOR, tag + ': after a deal a mark measures ' + d.markW.toFixed(1) + 'px');
      contain(d, 'after deal ' + (i + 1));
      collideCheck(d, 'after deal ' + (i + 1));
      dealtOK++;
    }
    ok(dealtOK === 6, tag + ': non-vacuity — only ' + dealtOK + ' deals exercised');

    /* ---- ⭐⭐ SWEEP THE WORST CASE, NOT JUST THE DEFAULT --------------
       Every check above ran on whatever the random deal happened to
       give. That is #42's recorded defect verbatim: a numeral-containment
       gate sampled ONE point of a band, passed at every viewport, and the
       top of the band shipped a numeral clipped in half.

       The band here is the mark COUNT, and the geometry is asymmetric by
       construction: a shutter is a FIXED
       `height: calc(var(--mqu-d) * 2.1 + 8px)` while the region under it
       is `flex-wrap` with that same value only as a MIN-height. So the
       moment a region wraps to a second row the lid is, by arithmetic,
       too short for its box — and the narrower the viewport the sooner
       that happens. Drive the setting to sixteen BY POINTER and hunt for
       the largest total the deal will give. */
    await clickSel(p, '.lcs-ctrl');                       /* settings */
    await new Promise(r => setTimeout(r, 260));
    const chips = await p.$$('.lcs-chip');
    ok(chips.length >= 2, tag + ': non-vacuity — the settings drawer offered ' + chips.length + ' chips');
    if (chips.length >= 2) {
      const cb = await chips[chips.length - 1].boundingBox();   /* "up to sixteen" */
      ok(!!cb, tag + ': the range chip has no box');
      if (cb) await p.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2);
      await new Promise(r => setTimeout(r, 300));
    }
    const scrim = await p.$('.lcs-drawer-scrim');
    if (scrim) { const sb = await scrim.boundingBox(); if (sb) await p.mouse.click(sb.x + 6, sb.y + 6); }
    await new Promise(r => setTimeout(r, 260));

    let worst = 0, worstChecked = 0, sawWrap = 0;
    for (let i = 0; i < 40; i++) {
      const d = await p.evaluate(READ);
      if (+d.total > worst) worst = +d.total;
      /* only the big frames are interesting, but check EVERY one that
         reaches the top half of the band */
      if (+d.total >= 11) {
        /* ⚠ measure the mark BEFORE the shutters come down — with both
           regions hidden there is no mark to measure, and a null there
           is the absence of the measurement, not a passing one. */
        ok(d.markW !== null && d.markW >= MARK_FLOOR,
          tag + ': at a=' + d.total + ' a mark measures ' +
          (d.markW === null ? 'nothing (no mark rendered)' : d.markW.toFixed(1) + 'px'));
        ok(d.marks === +d.total, tag + ': at a=' + d.total + ' only ' + d.marks + ' marks are drawn');
        await clickSel(p, '.mqu-ledge');
        await clickSel(p, '.mqu-air');
        const w = await p.evaluate(READ);
        worstChecked++;
        if (w.ledgeShut && w.named['.mqu-ledge']) {
          if (w.named['.mqu-ledge'].h > w.ledgeShut.h + 1) sawWrap++;
          /* ⚠ THE MESSAGE REPORTS THE MEASUREMENT, NOT A THEORY. My
             first version asserted "the region wrapped and the lid did
             not" — and the run that fired it recorded ZERO wrapped
             regions. The real fault was an 8px vertical offset. A
             failure message that explains rather than measures sends
             the next reader hunting the wrong thing. */
          ok(covers(w.ledgeShut, w.named['.mqu-ledge'], 1.5),
            tag + ': ⚠⚠ AT a=' + w.total + ' THE LEDGE SHUTTER DOES NOT COVER THE LEDGE — lid y' +
            Math.round(w.ledgeShut.y) + '..' + Math.round(w.ledgeShut.b) + ' over region y' +
            Math.round(w.named['.mqu-ledge'].y) + '..' + Math.round(w.named['.mqu-ledge'].b) +
            ' (top off by ' + (w.ledgeShut.y - w.named['.mqu-ledge'].y).toFixed(1) +
            ', bottom off by ' + (w.ledgeShut.b - w.named['.mqu-ledge'].b).toFixed(1) + ')');
        }
        if (w.airShut && w.named['.mqu-air']) {
          if (w.named['.mqu-air'].h > w.airShut.h + 1) sawWrap++;
          ok(covers(w.airShut, w.named['.mqu-air'], 1.5),
            tag + ': ⚠⚠ AT a=' + w.total + ' THE AIR SHUTTER DOES NOT COVER THE AIR — lid y' +
            Math.round(w.airShut.y) + '..' + Math.round(w.airShut.b) + ' over region y' +
            Math.round(w.named['.mqu-air'].y) + '..' + Math.round(w.named['.mqu-air'].b) +
            ' (top off by ' + (w.airShut.y - w.named['.mqu-air'].y).toFixed(1) +
            ', bottom off by ' + (w.airShut.b - w.named['.mqu-air'].b).toFixed(1) + ')');
        }
        contain(w, 'at the top of the band, a=' + w.total);
        collideCheck(w, 'at the top of the band, a=' + w.total);
        ok(w.marks === 0, tag + ': ⚠ ' + w.marks + ' marks are still visible with BOTH shutters down');
        /* ⭐ THE STRUCTURAL FORM OF THE SAME LAW, NAMED. `covers` is
           satisfied by any lid at least as big as its region; the lid
           here is its region's own box, so the two must be EQUAL. This
           is what makes the invariant survive a wrapped region — the
           previous fixed-height lid could only ever be right for a
           single row, and no amount of dealing guarantees this sweep
           observes one (measured: 0 wrapped regions in 200+ deals). */
        [['.mqu-ledge', w.ledgeShut], ['.mqu-air', w.airShut]].forEach(function (pair) {
          const reg = w.named[pair[0]], lid = pair[1];
          if (!reg || !lid) return;
          ok(Math.abs(lid.h - reg.h) < 1.5 && Math.abs(lid.y - reg.y) < 1.5,
            tag + ': ⚠ the lid over ' + pair[0] + ' is not its region\'s own box — lid ' +
            lid.h.toFixed(1) + 'px at y' + lid.y.toFixed(1) + ', region ' +
            reg.h.toFixed(1) + 'px at y' + reg.y.toFixed(1) +
            ' (coverage is arithmetic here, not structural, and it will drift)');
        });
        await clickSel(p, '.mqu-shut-ledge');
        await clickSel(p, '.mqu-shut-air');
      }
      await clickSel(p, '.mqu-b-deal');
    }
    ok(worst >= 13, tag + ': non-vacuity — 40 deals on the sixteen setting never exceeded a=' + worst +
      '; the top of the band was never sampled');
    ok(worstChecked >= 5, tag + ': non-vacuity — only ' + worstChecked + ' top-of-band frames were checked');
    console.log('      worst-case sweep: largest total ' + worst + ', ' + worstChecked +
      ' top-of-band frames checked, ' + sawWrap + ' wrapped regions seen');

    /* the aria label must carry the frame, since the marks do not */
    const sF = await p.evaluate(READ);
    ok(sF.stageAria.length > 20, tag + ': the stage carries no aria label — the marks are aria-hidden, so nothing describes the frame');
    ok(!/\{\w+\}/.test(sF.stageAria), tag + ': ⚠ a RAW TOKEN is rendering in the stage label: ' + sF.stageAria);

    console.log('[' + tag + '] total ' + s0.total + ', ' + s0.marks + ' marks at ' + s0.markW.toFixed(1) +
      'px | card ' + Math.round(s0.card.w) + 'x' + Math.round(s0.card.h) +
      ' | doc ' + s0.docH + '/' + s0.winH + ' html:' + s0.htmlOverflow +
      ' | headline ' + s3.pairs + ' pairs');
    await p.close();
  }

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + checks + ' render checks, ' + fails.length + ' failures');
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length > 40) console.log('  ... and ' + (fails.length - 40) + ' more');
  if (fails.length) process.exit(1);
})();
