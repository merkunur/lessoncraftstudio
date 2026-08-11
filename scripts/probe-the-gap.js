/* =====================================================================
   RENDER PROBE — TOOL #56, THE GAP
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
   asks the questions no floor can answer:

     1. does anything sit OUTSIDE THE CARD;
     2. do any two rendered things OVERLAP;
     3. are the marks ON the ground — the whole stage is one line with
        things standing on it, and a mark whose box crosses the baseline
        is not standing on anything;
     4. is the DOM EMPTY OF MARKS while the ground is dark — the tool's
        central claim, and the one thing a screenshot cannot settle.

   ⚠⚠ REACHABILITY USES `page.mouse.wheel`, NEVER `window.scrollTo`.
   scrollTo moves an `overflow:hidden` root PROGRAMMATICALLY while a
   child's swipe cannot, so a scrollTo-based check cannot fail on a
   single-rule removal — it measures SCRIPT reachability while claiming
   USER reachability (#55 shipped exactly that, poisoned both ways, both
   passed).

   ⭐⭐ AND THE POISON MATRIX IS MEASURED, NOT ASSUMED. The commission
   asked for each scroll rule to be poisoned SEPARATELY and each to fail.
   Measured at 320x568, that is false for the body half, and the gate
   records what is true instead:
       html rule removed  -> UNREACHABLE   (fails, as it must)
       both rules removed -> UNREACHABLE   (fails, as it must)
       body rule removed  -> still reachable: html is then `height:auto`,
                             the document grows, and the WINDOW scrolls.
       both rules made INERT (`overflow-y:auto` with the height left
                             pinned) -> still reachable, and by a third
                             mechanism: `document.body` becomes its own
                             scroll container, so `window.scrollY` stays
                             0 and `documentElement.scrollHeight` equals
                             the viewport while the control is perfectly
                             reachable. ⚠ A reachability check written
                             against `maxScroll > 0` would have called
                             that a defect. This one measures the
                             control's RECT, which is the child's
                             question.
   So: two poisons that MUST fail, one control that MUST pass, and the
   body-rule finding reported rather than gated. The rule stays in the
   tool (verify L4 holds its shape); it is simply not the thing that
   carries reachability at this viewport, and saying otherwise would be
   an invented law.

   Run: node scripts/probe-the-gap.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const puppeteer = require('puppeteer');

const ROOT = process.env.THE_GAP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'the-gap', 'qa');
/* ⚠ env-overridable: a hard-coded port makes the gate unrunnable while a
   sibling gate or an orphaned poison run holds it, and "cannot bind" is
   indistinguishable from "failed" at a glance. */
const PORT = Number(process.env.THE_GAP_PROBE_PORT) || 5688;
/* the poison self-test drives these two */
const POISON = process.env.THE_GAP_PROBE_POISON || '';
const ONLY_REACH = process.env.THE_GAP_PROBE_ONLY_REACH === '1';
const SHOT = [360, 768, 1024];

/* the two floors are SEPARATE and they are different numbers */
const TAP_FLOOR = 44;      /* chrome controls AND the rail numerals */
const MARK_FLOOR = 12;     /* legibility of a featureless mark — NOT a tap floor */

/* ⚠ THE MARK-TO-GROUND GAP IS READ OUT OF THE TOOL, NOT CHOSEN. It is
   `.crt-ground{...margin-top:Npx}`, and parsing it means this assertion
   tracks the design instead of drifting from it. */
const GROUND_GAP = (function () {
  const src = fs.readFileSync(path.join(ROOT, 'the-gap.js'), 'utf8');
  const rule = src.match(/'\.crt-ground\{([^}]*)\}'/);
  const m = rule && rule[1].match(/margin-top\s*:\s*(\d+)px/);
  if (!m) { console.log('⚠⚠ could not read the ground margin out of the tool — the standing-on-the-ground check cannot be made'); process.exit(1); }
  return Number(m[1]);
})();

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'the-gap.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  let body = fs.readFileSync(fp);
  if (f === 'the-gap.js' && POISON) {
    let s = body.toString('utf8');
    if (POISON === 'html' || POISON === 'both') s = s.replace("'html.crt-scroll{", "'html.crt-POISONED{");
    if (POISON === 'body' || POISON === 'both') s = s.replace("'body.crt-scroll{", "'body.crt-POISONED{");
    if (POISON === 'inert') {
      s = s.replace("'html.crt-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'html.crt-scroll{overflow-y:auto}'")
        .replace("'body.crt-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'body.crt-scroll{overflow-y:auto}'");
    }
    body = Buffer.from(s, 'utf8');
  }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(body);
}).listen(PORT);

/* ------------------------------------------------------------------ */
/* Read the apparatus in PIXELS. The oracle must not share the
   renderer's convention (#44 shipped a mirrored profile that way), so
   everything below comes from getBoundingClientRect and computed style
   — never from a model field or a class name that means "should be". */
const READ = () => {
  const R = e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, b: b.bottom, r: b.right }; };
  const card = document.querySelector('.lcs-app');
  const stage = document.querySelector('.crt-stage');
  if (!card || !stage) return null;
  const q = s => document.querySelector(s);

  const named = {};
  ['.crt-wrap', '.crt-stage', '.crt-marks', '.crt-ground', '.crt-counts', '.crt-say',
    '.crt-rail', '.crt-row', '.crt-gate', '.crt-b-run', '.crt-b-clear', '.crt-b-again', '.crt-b-print']
    .forEach(function (s) { const e = q(s); if (e) named[s] = R(e); });

  const markEls = [].slice.call(document.querySelectorAll('.crt-mark'));
  const markBoxes = markEls.map(R);
  const railEls = [].slice.call(document.querySelectorAll('.crt-k'));

  /* what a collision check must consider: the laid-out siblings, every
     control, every rail numeral, every numeral in the readout, and every
     mark. A mark overlapping a mark is the #39 defect (a fixed-px child
     in a percentage layout) and it is invisible to any floor. */
  const collide = [];
  ['.crt-stage', '.crt-counts', '.crt-say', '.crt-rail', '.crt-row', '.crt-gate']
    .forEach(function (s) { const e = q(s); if (e && e.getBoundingClientRect().height > 0) collide.push({ s: s, r: R(e) }); });
  ['.crt-marks', '.crt-ground']
    .forEach(function (s) { const e = q(s); if (e && e.getBoundingClientRect().height > 0) collide.push({ s: s, r: R(e) }); });
  ['.crt-b-run', '.crt-b-clear', '.crt-b-again', '.crt-b-print']
    .forEach(function (s) { const e = q(s); if (e && e.getBoundingClientRect().height > 0) collide.push({ s: s, r: R(e) }); });
  railEls.forEach(function (e, i) { if (e.getBoundingClientRect().height > 0) collide.push({ s: '.crt-k[' + i + ']', r: R(e) }); });
  markEls.forEach(function (e, i) { if (e.getBoundingClientRect().height > 0) collide.push({ s: '.crt-mark[' + i + ']', r: R(e) }); });
  [].slice.call(document.querySelectorAll('.crt-num')).forEach(function (e, i) {
    if (e.getBoundingClientRect().height > 0) collide.push({ s: '.crt-num[' + i + ']', r: R(e) });
  });

  /* ⚠ a mark must not be a clickable AFFORDANCE — it is deliberately
     allowed under the 34px canvas floor, which is only honest if nothing
     about it invites a tap. */
  const markAffordance = markEls.slice(0, 6).map(function (m) {
    const cs = getComputedStyle(m);
    return { ariaHidden: m.getAttribute('aria-hidden'), tabindex: m.getAttribute('tabindex'),
      role: m.getAttribute('role'), cursor: cs.cursor, tag: m.tagName };
  });

  const g = q('.crt-ground');
  return {
    card: R(card),
    named: named,
    marks: markBoxes.length,
    markW: markBoxes.length ? Math.min.apply(null, markBoxes.map(b => Math.min(b.w, b.h))) : null,
    markMaxBottom: markBoxes.length ? Math.max.apply(null, markBoxes.map(b => b.b)) : null,
    groundTop: g ? R(g).y : null,
    markBoxes: markBoxes,
    markAffordance: markAffordance,
    rail: railEls.length,
    railMin: railEls.length ? Math.min.apply(null, railEls.map(function (e) {
      const b = e.getBoundingClientRect(); return Math.min(b.width, b.height);
    })) : null,
    railOn: (q('.crt-rail').className.indexOf('is-on') >= 0),
    railPressed: [].slice.call(document.querySelectorAll('.crt-k.is-on')).length,
    isGap: stage.className.indexOf('is-gap') >= 0,
    isOut: q('.crt-wave').className.indexOf('is-out') >= 0,
    nums: [].slice.call(document.querySelectorAll('.crt-num')).map(e => e.textContent),
    tryNums: [].slice.call(document.querySelectorAll('.crt-num.is-try')).map(e => e.textContent),
    say: q('.crt-say').textContent,
    runOff: q('.crt-b-run').className.indexOf('is-off') >= 0,
    clearOff: q('.crt-b-clear').className.indexOf('is-off') >= 0,
    gateOn: !!q('.crt-gate.is-on'),
    stageAria: stage.getAttribute('aria-label') || '',
    groundAria: g ? (g.getAttribute('aria-label') || '') : '',
    collide: collide,
    docH: document.documentElement.scrollHeight,
    winH: window.innerHeight,
    htmlOverflow: getComputedStyle(document.documentElement).overflowY,
    bodyOverflow: getComputedStyle(document.body).overflowY,
    appOverflow: getComputedStyle(card).overflowX
  };
};

/* ------------------------------------------------------------------ */
const fails = [];
let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

/* ⚠ A `display:none` ELEMENT HAS A ZERO RECT AT (0,0), AND THAT IS NOT
   AN OVERFLOW — the rail is legitimately hidden until the gap has
   lifted. Rects with no area are skipped; rects with area are held to
   the card exactly. */
const drawn = r => r && r.w > 0.5 && r.h > 0.5;
const inside = (r, box, tol) => r.x >= box.x - tol && r.y >= box.y - tol && r.r <= box.r + tol && r.b <= box.b + tol;
const overlap = (a, b) => Math.max(a.x, b.x) < Math.min(a.r, b.r) - 0.6 && Math.max(a.y, b.y) < Math.min(a.b, b.b) - 0.6;

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
}

/* ⚠⚠ A CLICK HELPER THAT SILENTLY DOES NOTHING HOLLOWS OUT EVERY
   ASSERTION AFTER IT (#39: a no-op click made "the toggle is not
   swapped" pass because nothing had been toggled). This one THROWS. */
const clickSel = async (p, sel, settle) => {
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
  await new Promise(r => setTimeout(r, settle === undefined ? 220 : settle));
  return true;
};

/* the reachability measurement, shared by the sweep and by the poison
   children so that both ask exactly the same question */
async function measureReach(p) {
  for (let i = 0; i < 40; i++) await p.mouse.wheel({ deltaY: 400 });
  await new Promise(r => setTimeout(r, 140));
  return await p.evaluate(() => {
    let low = 0, name = '';
    [].slice.call(document.querySelectorAll('.crt-btn')).forEach(function (e) {
      const r = e.getBoundingClientRect();
      if (r.height > 0 && r.bottom > low) { low = r.bottom; name = e.className.split(' ').pop(); }
    });
    const res = {
      low: Math.round(low), name: name, win: window.innerHeight,
      sy: Math.round(window.scrollY || 0), bodyTop: Math.round(document.body.scrollTop || 0),
      doc: document.documentElement.scrollHeight
    };
    window.scrollTo(0, 0); document.body.scrollTop = 0;
    return res;
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ================================================================
     THE POISON SELF-TEST, FIRST. A gate nobody has watched fail is not
     a gate. ⚠ It is skipped inside a poison child, or it would recurse. */
  if (!POISON && !ONLY_REACH) {
    const runPoison = (mode) => {
      try {
        execFileSync(process.execPath, [__filename], {
          env: Object.assign({}, process.env, {
            THE_GAP_PROBE_POISON: mode, THE_GAP_PROBE_ONLY_REACH: '1',
            THE_GAP_PROBE_PORT: String(PORT + 20 + mode.length)
          }), stdio: 'pipe', timeout: 90000
        });
        return 'PASS';
      } catch (e) { return (e.killed || /ETIMEDOUT/.test(String(e.code))) ? 'TIMEOUT' : 'FAIL'; }
    };
    console.log('POISON SELF-TEST (each is a real removal, served on the fly):');
    ['html', 'both'].forEach(function (mode) {
      const r = runPoison(mode);
      ok(r === 'FAIL', '⚠⚠ THE REACHABILITY CHECK CANNOT FAIL: with the ' + mode +
        ' scroll rule removed it reported ' + r + ' — it is measuring something that is always true');
      console.log('   ' + mode.padEnd(6) + ' -> ' + r + (r === 'FAIL' ? '  ✓ (must fail)' : '  ✗'));
    });
    /* ⚠ AND THE OTHER DIRECTION, or a check that always fails would pass
       the poison and be just as useless. */
    ['body', 'inert'].forEach(function (mode) {
      const r = runPoison(mode);
      console.log('   ' + mode.padEnd(6) + ' -> ' + r + '   (MEASURED, NOT GATED — see the docblock: the body ' +
        'rule is not what carries reachability at 320x568)');
    });
  }

  const VIEWS = ONLY_REACH ? [{ w: 320, h: 568 }] : [
    { w: 320, h: 568 }, { w: 360, h: 640 }, { w: 412, h: 732 }, { w: 704, h: 900 },
    { w: 768, h: 1024 }, { w: 1024, h: 768 }, { w: 1366, h: 768 }, { w: 1920, h: 1080 }
  ];

  for (const v of VIEWS) {
    const tag = v.w;
    const p = await b.newPage();
    p.on('pageerror', e => fails.push(tag + ': page error ' + e.message));
    /* ⚠ THE HARNESS'S OWN 404s ARE NAMED, NOT BLANKET-IGNORED: the
       browser's favicon, the platform entitlement endpoint this static
       server does not host (the tool is REQUIRED to degrade to the free
       tier without it), and the two Google font hosts, which make a
       network-dependent gate intermittent. A blanket "ignore resource
       errors" would blind this to a missing tool file. */
    p.on('console', m => {
      if (m.type() !== 'error') return;
      const url = (m.location() || {}).url || '';
      if (/favicon\.ico/.test(url) || /api\/entitlement/.test(url)) return;
      if (/^https?:\/\/fonts\.(gstatic|googleapis)\.com\//.test(url)) return;
      fails.push(tag + ': console error [' + (url || 'no url') + '] ' + m.text());
    });
    await p.setViewport({ width: v.w, height: v.h });
    await p.goto('http://127.0.0.1:' + PORT + '/mini-tools/the-gap.html?lang=en', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    /* ---- NON-VACUITY FIRST ---------------------------------------- */
    const s0 = await p.evaluate(READ);
    if (!s0) { fails.push(tag + ': ⚠⚠ NOTHING RENDERED — no card or no stage'); await p.close(); continue; }

    /* ---- REACHABILITY, which is all a poison child runs ------------ */
    const reach = await measureReach(p);
    ok(reach.name !== '', tag + ': non-vacuity — the reachability check found no control to measure');
    ok(reach.low > 0, tag + ': non-vacuity — the lowest control measured 0px');
    ok(reach.low <= reach.win + 1,
      tag + ': ⚠⚠ THE LOWEST CONTROL IS PHYSICALLY UNREACHABLE — ' + reach.name + ' sits at ' + reach.low +
      'px with the page scrolled as far as it goes (window ' + reach.sy + ', body ' + reach.bodyTop +
      ') in a ' + reach.win + 'px viewport');
    if (ONLY_REACH) {
      console.log('[poison ' + (POISON || 'none') + '] lowest control ' + reach.low + ' in ' + reach.win +
        ' (window scrolled ' + reach.sy + ', body ' + reach.bodyTop + ')');
      await p.close();
      continue;
    }

    ok(Object.keys(s0.named).length >= 12, tag + ': non-vacuity — only ' + Object.keys(s0.named).length + ' named parts rendered');
    ok(s0.card.w > 100 && s0.card.h > 100, tag + ': non-vacuity — the card measures ' + s0.card.w + 'x' + s0.card.h);
    ok(s0.marks >= 3, tag + ': non-vacuity — only ' + s0.marks + ' marks are drawn; there is nothing to count');
    ok(s0.marks <= 16, tag + ': ' + s0.marks + ' marks drawn, over the declared cap of 16');
    ok(s0.collide.length >= 12, tag + ': non-vacuity — the collision set holds only ' + s0.collide.length + ' boxes');
    ok(s0.nums.length === 1, tag + ': the readout shows ' + s0.nums.length + ' numerals before the gap, not 1');
    ok(+s0.nums[0] === s0.marks, tag + ': ⚠ the readout says ' + s0.nums[0] + ' and ' + s0.marks + ' marks are drawn');
    ok(!s0.isGap, tag + ': the ground is already dark at rest');
    ok(!s0.railOn, tag + ': ⚠⚠ the rail is live BEFORE the gap — a control taking an answer to a question nobody asked');
    ok(s0.rail === 0, tag + ': ' + s0.rail + ' rail numerals exist before there is a question');
    ok(s0.clearOff, tag + ': the clear control is live with nothing to clear');
    ok(!s0.runOff, tag + ': ⚠ the run control is dead at rest — the class cannot start');
    ok(s0.gateOn, tag + ': the paid gate is not shown to a free visitor');
    ok(s0.stageAria.length > 15, tag + ': the stage carries no aria label — the marks are aria-hidden, so nothing describes the ground');
    ok(!/\{\w+\}/.test(s0.stageAria + ' ' + s0.groundAria), tag + ': ⚠ a RAW TOKEN is rendering in an aria label: ' + s0.stageAria);

    /* ---- the two floors, SEPARATELY -------------------------------- */
    ['.crt-b-run', '.crt-b-clear', '.crt-b-again', '.crt-b-print'].forEach(function (sel) {
      const r = s0.named[sel];
      ok(!!r, tag + ': the control ' + sel + ' did not render');
      if (r) ok(Math.min(r.w, r.h) >= TAP_FLOOR,
        tag + ': ⚠ the control ' + sel + ' measures ' + Math.round(Math.min(r.w, r.h)) + 'px, under the ' + TAP_FLOOR + 'px chrome floor');
    });
    ok(s0.markW >= MARK_FLOOR, tag + ': ⚠ a mark measures ' +
      (s0.markW == null ? 'null' : s0.markW.toFixed(1)) + 'px, under the ' + MARK_FLOOR + 'px minimum honest mark');
    ok(s0.markAffordance.length > 0, tag + ': non-vacuity — no mark was inspected for affordance');
    s0.markAffordance.forEach(function (m, i) {
      ok(m.ariaHidden === 'true', tag + ': mark[' + i + '] is not aria-hidden — the marks are not tap targets and must not be announced');
      ok(m.tabindex === null, tag + ': mark[' + i + '] is focusable');
      ok(m.role === null, tag + ': mark[' + i + '] claims a role');
      ok(m.cursor !== 'pointer', tag + ': ⚠ mark[' + i + '] carries a pointer cursor — it invites a tap it is too small to take');
      ok(m.tag !== 'BUTTON' && m.tag !== 'A', tag + ': mark[' + i + '] is a <' + m.tag + '>');
    });

    /* ---- containment / collision / standing on the ground ---------- */
    const contain = (st, when) => {
      Object.keys(st.named).forEach(function (sel) {
        if (!drawn(st.named[sel])) return;
        ok(inside(st.named[sel], st.card, 1.5),
          tag + ': ⚠⚠ ' + sel + ' is OUTSIDE THE CARD ' + when + ' (' + Math.round(st.named[sel].x) + ',' +
          Math.round(st.named[sel].y) + ' ' + Math.round(st.named[sel].w) + 'x' + Math.round(st.named[sel].h) +
          ' vs card ' + Math.round(st.card.w) + 'x' + Math.round(st.card.h) + ')');
      });
      st.markBoxes.forEach(function (m, i) { ok(inside(m, st.card, 1.5), tag + ': ⚠ mark[' + i + '] is outside the card ' + when); });
      ok(st.card.r <= v.w + 1.5, tag + ': the card itself overflows the viewport ' + when);
    };
    const ANC = [['.crt-stage', '.crt-marks'], ['.crt-stage', '.crt-ground'], ['.crt-stage', '.crt-mark'],
      ['.crt-marks', '.crt-mark'], ['.crt-row', '.crt-b-'], ['.crt-rail', '.crt-k'], ['.crt-counts', '.crt-num']];
    const collideCheck = (st, when) => {
      for (let i = 0; i < st.collide.length; i++) {
        for (let j = i + 1; j < st.collide.length; j++) {
          const A = st.collide[i], B = st.collide[j];
          const anc = (x, y) => ANC.some(pr => x === pr[0] && y.indexOf(pr[1]) === 0);
          if (anc(A.s, B.s) || anc(B.s, A.s)) continue;
          ok(!overlap(A.r, B.r),
            tag + ': ⚠⚠ ' + A.s + ' and ' + B.s + ' OVERLAP ' + when + ' — one is drawn on top of the other');
        }
      }
    };
    /* ⭐ THE MARKS STAND ON THE GROUND. The whole stage is one line with
       things on it; a mark whose box crosses the baseline is not standing
       on anything, and no floor-against-a-box assertion can see it. */
    const onGround = (st, when) => {
      ok(st.groundTop !== null, tag + ': non-vacuity — there is no ground to stand on ' + when);
      ok(st.marks > 0, tag + ': non-vacuity — no marks to place ' + when);
      if (st.groundTop === null || !st.marks) return;
      ok(st.markMaxBottom <= st.groundTop + 1.0,
        tag + ': ⚠⚠ THE MARKS ARE NOT ON THE GROUND ' + when + ' — the lowest mark reaches ' +
        st.markMaxBottom.toFixed(1) + 'px and the ground begins at ' + st.groundTop.toFixed(1) + 'px');
      /* ⚠ AND THE GAP TO THE GROUND IS THE ONE THE DESIGN DECLARES, read
         out of the tool's own `.crt-ground{...margin-top:Npx}` rather
         than invented. My first version allowed anything within 200px,
         which is a number I liked rather than a number I measured — and
         it would have passed marks floating half a stage above the line
         they are supposed to stand on. */
      ok(st.markMaxBottom >= st.groundTop - GROUND_GAP - 1.5,
        tag + ': ⚠ the marks float ' + (st.groundTop - st.markMaxBottom).toFixed(1) +
        'px above the ground ' + when + ', and the stylesheet declares ' + GROUND_GAP + 'px');
    };
    contain(s0, 'at rest'); collideCheck(s0, 'at rest'); onGround(s0, 'before the gap');
    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'before-' + tag + '.png'), fullPage: true });

    /* ================================================================
       ⭐⭐ DRIVE IT BY POINTER, AND CATCH THE GAP WHILE IT IS DARK.
       The gap lasts T_FALL + T_PULSE = 1000ms, so 500ms lands squarely
       inside it. This is the assertion the whole tool is built around
       and it can only be made here. */
    await clickSel(p, '.crt-b-run', 0);
    await new Promise(r => setTimeout(r, 500));
    const sg = await p.evaluate(READ);
    ok(sg.isGap, tag + ': ⚠⚠ pressing the run control did not cover the ground');
    ok(sg.marks === 0,
      tag + ': ⚠⚠ ' + sg.marks + ' MARKS ARE IN THE DOM WHILE THE GROUND IS DARK — the non-leak is structural or it is nothing');
    ok(sg.nums.length === 0, tag + ': ' + sg.nums.length + ' numerals are still readable during the gap');
    ok(sg.say === '', tag + ': the tool is still talking during the gap: "' + sg.say + '"');
    ok(sg.rail === 0, tag + ': the rail is live during the gap');
    ok(sg.runOff, tag + ': ⚠ the run control is still LIVE mid-run — it looks refused and is not');
    ok(sg.stageAria.length > 15 && sg.stageAria !== s0.stageAria,
      tag + ': the stage announces the same thing covered as uncovered');
    ok(sg.groundAria.length > 15, tag + ': ⚠ the ground announces nothing — a screen-reader user gets the gap and no evidence at all');
    contain(sg, 'during the gap'); collideCheck(sg, 'during the gap');
    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'gap-' + tag + '.png'), fullPage: true });

    /* ---- the gap lifts --------------------------------------------- */
    await new Promise(r => setTimeout(r, 900));
    const s2 = await p.evaluate(READ);
    ok(!s2.isGap, tag + ': ⚠⚠ the gap never lifted');
    ok(s2.marks > 0, tag + ': the marks did not come back');
    ok(s2.nums.length === 2, tag + ': the readout shows ' + s2.nums.length + ' numerals after the gap, not 2 (before and after)');
    ok(+s2.nums[0] === +s0.nums[0], tag + ': ⚠ the BEFORE count changed across the gap (' + s0.nums[0] + ' -> ' + s2.nums[0] + ')');
    ok(+s2.nums[1] === s2.marks, tag + ': ⚠ the readout says ' + s2.nums[1] + ' and ' + s2.marks + ' marks are drawn');
    ok(+s2.nums[1] !== +s2.nums[0], tag + ': ⚠⚠ nothing happened across the gap — both counts read ' + s2.nums[0]);
    ok(Math.abs(+s2.nums[1] - +s2.nums[0]) >= 2,
      tag + ': ⚠⚠ the change was ' + Math.abs(+s2.nums[1] - +s2.nums[0]) + ' — one pulse over a change of one IS the answer');
    ok(s2.railOn && s2.rail > 0, tag + ': ⚠⚠ the rail is not live once the question exists — the class cannot state a theory');
    ok(s2.railPressed === 0, tag + ': a theory is already stated before anyone pressed anything');
    ok(s2.railMin >= TAP_FLOOR,
      tag + ': ⚠ a rail numeral measures ' + (s2.railMin || 0).toFixed(1) + 'px, under the ' + TAP_FLOOR + 'px tap floor');
    contain(s2, 'after the gap'); collideCheck(s2, 'after the gap'); onGround(s2, 'after the gap');

    /* ---- ⭐⭐ THE HEADLINE, BY POINTER: state a theory --------------- */
    const keys = await p.$$('.crt-k');
    ok(keys.length === s2.rail, tag + ': non-vacuity — the rail reports ' + s2.rail + ' numerals and ' + keys.length + ' are pressable');
    await clickSel(p, '.crt-k');
    const s3 = await p.evaluate(READ);
    ok(s3.railPressed === 1, tag + ': ⚠⚠ pressing a rail numeral did nothing — the child cannot state a theory');
    ok(s3.tryNums.length === 1, tag + ': the theory was not drawn on the ground (' + s3.tryNums.length + ' try numerals)');
    ok(s3.nums.length === 3, tag + ': the readout shows ' + s3.nums.length + ' numerals with a theory stated, not 3');
    ok(+s3.nums[0] === +s2.nums[0] && +s3.nums[1] === +s2.nums[1],
      tag + ': ⚠ stating a theory changed what the class had already counted');
    ok(!s3.clearOff, tag + ': the clear control is still dead with a theory on the ground');
    ok(s3.say.length > 0, tag + ': the tool says nothing about the theory');
    contain(s3, 'with a theory stated'); collideCheck(s3, 'with a theory stated'); onGround(s3, 'with a theory stated');
    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'after-' + tag + '.png'), fullPage: true });

    /* ---- clear it, and the question must survive -------------------- */
    await clickSel(p, '.crt-b-clear');
    const s4 = await p.evaluate(READ);
    ok(s4.railPressed === 0 && s4.tryNums.length === 0, tag + ': ⚠ the theory could not be cleared');
    ok(s4.nums.length === 2, tag + ': clearing the theory did not leave the two counts behind');
    ok(s4.railOn, tag + ': ⚠ clearing the theory took the question away with it');
    ok(s4.clearOff, tag + ': the clear control is still live with nothing to clear');

    /* ---- a new scene ------------------------------------------------ */
    await clickSel(p, '.crt-b-again');
    const s5 = await p.evaluate(READ);
    ok(!s5.isGap && !s5.railOn, tag + ': a new scene did not return to the uncovered start');
    ok(s5.nums.length === 1, tag + ': a new scene shows ' + s5.nums.length + ' numerals');
    ok(+s5.nums[0] === s5.marks, tag + ': after a new scene the readout and the ground disagree');
    ok(s5.markW >= MARK_FLOOR, tag + ': after a new scene a mark measures ' + s5.markW.toFixed(1) + 'px');
    contain(s5, 'on a new scene'); collideCheck(s5, 'on a new scene'); onGround(s5, 'on a new scene');

    /* ---- ⭐⭐ SWEEP THE BAND, NOT THE DEFAULT -----------------------
       #42's recorded defect verbatim: a containment gate sampled ONE
       point of a band, passed at every viewport, and the top of the band
       shipped a numeral clipped in half. The band here is the mark
       COUNT, and the top of it only exists on the sixteen setting. */
    await clickSel(p, '.lcs-ctrl');
    await new Promise(r => setTimeout(r, 260));
    const chips = await p.$$('.lcs-chip');
    ok(chips.length >= 2, tag + ': non-vacuity — the settings drawer offered ' + chips.length + ' chips');
    if (chips.length >= 2) {
      const cb = await chips[chips.length - 1].boundingBox();
      ok(!!cb, tag + ': the range chip has no box');
      if (cb) await p.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2);
      await new Promise(r => setTimeout(r, 300));
    }
    const scrim = await p.$('.lcs-drawer-scrim');
    if (scrim) { const sb = await scrim.boundingBox(); if (sb) await p.mouse.click(sb.x + 6, sb.y + 6); }
    await new Promise(r => setTimeout(r, 260));

    let worst = 0, topChecked = 0;
    for (let i = 0; i < 30; i++) {
      const d = await p.evaluate(READ);
      if (d.marks > worst) worst = d.marks;
      if (d.marks >= 12) {
        topChecked++;
        ok(d.markW >= MARK_FLOOR,
          tag + ': ⚠ at ' + d.marks + ' marks one measures ' + d.markW.toFixed(1) + 'px, under the ' + MARK_FLOOR + 'px floor');
        ok(+d.nums[0] === d.marks, tag + ': at ' + d.marks + ' marks the readout says ' + d.nums[0]);
        contain(d, 'at the top of the band, ' + d.marks + ' marks');
        collideCheck(d, 'at the top of the band, ' + d.marks + ' marks');
        onGround(d, 'at the top of the band, ' + d.marks + ' marks');
      }
      await clickSel(p, '.crt-b-again', 120);
    }
    ok(worst >= 13, tag + ': non-vacuity — 30 deals on the sixteen setting never exceeded ' + worst +
      ' marks; the top of the band was never sampled');
    ok(topChecked >= 4, tag + ': non-vacuity — only ' + topChecked + ' top-of-band scenes were checked');

    console.log('[' + tag + '] ' + s0.marks + ' marks at ' + s0.markW.toFixed(1) + 'px | card ' +
      Math.round(s0.card.w) + 'x' + Math.round(s0.card.h) + ' | doc ' + s0.docH + '/' + s0.winH +
      ' html:' + s0.htmlOverflow + ' | ' + s0.nums[0] + ' -> ' + s2.nums[1] + ' | rail ' + s2.rail +
      ' at ' + (s2.railMin || 0).toFixed(0) + 'px | band top ' + worst + ' (' + topChecked + ' checked)');
    await p.close();
  }

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + checks + ' render checks, ' + fails.length + ' failures');
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length > 40) console.log('  ... and ' + (fails.length - 40) + ' more');
  if (fails.length) process.exit(1);
})();
