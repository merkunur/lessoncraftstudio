/* =====================================================================
   RENDER PROBE — TOOL #57, THE SHAPE STRETCHER
   =====================================================================
   ⚠⚠ REAL POINTER AND KEYBOARD INPUT ONLY. Nothing here calls
   page.evaluate to set state. #54's headline branch shipped unreachable
   under 626 assertions because every gate reached the model directly,
   and #41's flag shipped INVISIBLE because eleven scripts asserted
   `!!querySelector` and never once dragged it.

   ⭐⭐ THE ASSERTION THIS PROBE EXISTS FOR — ROTATION EQUIVARIANCE.
   The stretch grip runs along a rail, and the shape it stretches is
   turned. An identical physical drag must therefore produce an identical
   change in the stretch AT EVERY ROTATION. A naive implementation that
   reads the drag as a displacement along the SIDE'S CURRENT DIRECTION
   works perfectly at rot = 0 and does NOTHING at rot = 90, and no model
   gate can see that — the model is fed the number the drag produced.
   ⚠ The dial's ladder is in twos, so 45/135/225/315 are not rungs and
   cannot be reached by any control. The nearest rungs (44/134/224/314)
   are used and NAMED; asking for a value the apparatus cannot hold would
   be measuring my expectation rather than the tool.

   ⭐⭐ AND THE SECOND ONE — TURNING DOES NOT CHANGE THE SIZE. The shape
   is fitted to its CIRCUMRADIUS, never to its bounding box, which
   breathes as the shape turns. So the whole dial is walked by keyboard
   and every drawn side length is compared.
   ⚠⚠ THE TOLERANCE IS DERIVED FROM THE ARTEFACT, NOT CHOSEN. The
   commission asked for 0.01px. The polygon's `points` attribute is
   written with toFixed(2) — parsed out of the tool here rather than
   assumed — so each coordinate carries +-0.005 and a side length
   measured across two rotations can differ by up to 4 * 0.005 * sqrt(2)
   = 0.0283 user units by rounding alone. Measured worst: 0.0154. So
   0.01 is asserting a precision THE DRAWN DATA DOES NOT CARRY (§23.6:
   the model length and the picture's length are two quantities), and the
   gate asserts the derived bound instead — plus a ratio bound three
   orders of magnitude tighter than a bounding-box fit could survive.

   ⭐ AND THE THIRD — THE LITTLE SQUARE IS ON THE CORNER THE EYE SEES AS
   SQUARE, measured in the RENDERED DOM. #44 shipped a mirrored profile
   because the gate's oracle shared the renderer's index convention. Here
   the mark's own vertex is found by POSITION among the drawn points and
   that point's angle is measured from the drawn coordinates, so no
   shared convention can satisfy it by accident. This is the pixel
   counterpart of verify L3, which found the shipped index swap.

   ⚠⚠ REACHABILITY USES `page.mouse.wheel`, NEVER `window.scrollTo`.
   scrollTo moves an `overflow:hidden` root PROGRAMMATICALLY while a
   child's swipe cannot, so a scrollTo-based check measures SCRIPT
   reachability while claiming USER reachability (#55 shipped exactly
   that, poisoned both ways, both passed). Each scroll rule is poisoned
   SEPARATELY and the matrix is MEASURED, not assumed.

   Run: node scripts/probe-shape-stretcher.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const puppeteer = require('puppeteer');

const ROOT = process.env.SHP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'shape-stretcher', 'qa');
/* ⚠ env-overridable: a hard-coded port makes the gate unrunnable while a
   sibling gate or an orphaned poison child holds it, and "cannot bind"
   is indistinguishable from "failed" at a glance. */
const PORT = Number(process.env.SHP_PROBE_PORT) || 5691;
const POISON = process.env.SHP_PROBE_POISON || '';
const ONLY_REACH = process.env.SHP_PROBE_ONLY_REACH === '1';
const SHOT = [360, 768, 1024];

/* the two floors are SEPARATE and they are different questions */
const TAP_FLOOR = 44;      /* every chrome control and every rail */
const CANVAS_FLOOR = 34;   /* anything on the canvas a finger may aim at */

/* ⚠ THE SERIALISATION QUANTUM IS READ OUT OF THE TOOL, NOT CHOSEN, so
   this bound tracks the design instead of drifting from it. */
const QUANTUM = (function () {
  const src = fs.readFileSync(path.join(ROOT, 'shape-stretcher.js'), 'utf8');
  const m = src.match(/q\[0\]\.toFixed\((\d+)\)/);
  if (!m) { console.log('⚠⚠ could not read the polygon\'s coordinate precision out of the tool — the size-invariance tolerance cannot be derived'); process.exit(1); }
  return 0.5 * Math.pow(10, -Number(m[1]));
})();
/* two endpoints, two rotations, worst-case diagonal each */
const SIZE_TOL = 4 * QUANTUM * Math.SQRT2;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'shape-stretcher.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  let body = fs.readFileSync(fp);
  if (f === 'shape-stretcher.js' && POISON) {
    let s = body.toString('utf8');
    if (POISON === 'html' || POISON === 'both') s = s.replace("'html.shp-scroll{", "'html.shp-POISONED{");
    if (POISON === 'body' || POISON === 'both') s = s.replace("'body.shp-scroll{", "'body.shp-POISONED{");
    if (POISON === 'inert') {
      s = s.replace("'html.shp-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'html.shp-scroll{overflow-y:auto}'")
        .replace("'body.shp-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'body.shp-scroll{overflow-y:auto}'");
    }
    body = Buffer.from(s, 'utf8');
  }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(body);
}).listen(PORT);

/* ------------------------------------------------------------------ */
/* Read the apparatus in PIXELS. The oracle must not share the
   renderer's convention (#44), so everything below comes from
   getBoundingClientRect, computed style and the drawn `points`
   attribute — never from a model field or a class name that means
   "should be". */
const READ = () => {
  const R = e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, b: b.bottom, r: b.right }; };
  const card = document.querySelector('.lcs-app');
  const pane = document.querySelector('.shp-pane');
  if (!card || !pane) return null;
  const q = s => document.querySelector(s);
  const all = s => [].slice.call(document.querySelectorAll(s));

  const named = {};
  ['.shp-wrap', '.shp-pane', '.shp-svg', '.shp-say', '.shp-row', '.shp-gate',
    '.shp-track-len', '.shp-track-skew', '.shp-track-turn',
    '.shp-b-keep', '.shp-b-drop', '.shp-b-quarter', '.shp-b-deal', '.shp-b-print']
    .forEach(function (s) { const e = q(s); if (e) named[s] = R(e); });

  /* The collision set: every laid-out sibling, every control, every
     label. ⚠⚠ ANCESTRY IS COMPUTED WITH `Node.contains`, NOT FROM A
     HAND-WRITTEN LIST OF NAME PAIRS. My first version listed the pairs
     and missed that each track's LABEL lives inside the track, so it
     reported 96 overlaps that were a box inside its own parent — a
     wrong measurement wearing the costume of a defect, at eight
     viewports and four states each. Asking the DOM removes the whole
     class instead of adding one more name to a list. */
  const collideEls = [];
  const push = (sel, e) => { if (e && e.getBoundingClientRect().height > 0) collideEls.push({ s: sel, e: e }); };
  ['.shp-pane', '.shp-say', '.shp-track-len', '.shp-track-skew', '.shp-track-turn', '.shp-row', '.shp-gate']
    .forEach(s => push(s, q(s)));
  ['.shp-b-keep', '.shp-b-drop', '.shp-b-quarter', '.shp-b-deal', '.shp-b-print'].forEach(s => push(s, q(s)));
  all('.shp-tlabel').forEach((e, i) => push('.shp-tlabel[' + i + ']', e));
  all('.shp-rail').forEach((e, i) => push('.shp-rail[' + i + ']', e));
  all('.shp-gate-h, .shp-gate-b, .shp-gate-cta').forEach((e, i) => push('.shp-gate-part[' + i + ']', e));
  const collide = collideEls.map(x => ({ s: x.s, r: R(x.e) }));
  const nested = [];
  for (let i = 0; i < collideEls.length; i++) {
    for (let j = i + 1; j < collideEls.length; j++) {
      if (collideEls[i].e.contains(collideEls[j].e) || collideEls[j].e.contains(collideEls[i].e)) nested.push(i + '|' + j);
    }
  }

  /* ⚠ NOTHING ON THE CANVAS IS A TAP TARGET, which is only honest if
     nothing about it invites a tap. */
  const canvasBits = all('.shp-poly, .shp-corner, .shp-tag').slice(0, 12).map(function (e) {
    const cs = getComputedStyle(e);
    return { tag: e.tagName, cursor: cs.cursor, pe: cs.pointerEvents,
      tabindex: e.getAttribute('tabindex'), role: e.getAttribute('role'), onclick: !!e.onclick };
  });

  const rails = all('.shp-rail').map(function (e) {
    const b = e.getBoundingClientRect();
    return { w: b.width, h: b.height, now: e.getAttribute('aria-valuenow'),
      min: e.getAttribute('aria-valuemin'), max: e.getAttribute('aria-valuemax'),
      role: e.getAttribute('role'), tab: e.getAttribute('tabindex'), label: e.getAttribute('aria-label') };
  });

  /* the DRAWN shape: the attribute the browser actually paints */
  const live = q('.shp-live .shp-poly');
  const pts = live ? live.getAttribute('points').trim().split(/\s+/).map(p => p.split(',').map(Number)) : null;
  const ctm = live && live.getScreenCTM ? live.getScreenCTM() : null;

  return {
    card: R(card),
    named: named,
    collide: collide,
    nested: nested,
    canvasBits: canvasBits,
    rails: rails,
    notches: { len: document.querySelectorAll('.shp-track-len .shp-notch').length,
      skew: document.querySelectorAll('.shp-track-skew .shp-notch').length,
      turn: document.querySelectorAll('.shp-track-turn .shp-notch').length },
    grips: all('.shp-grip').map(e => e.getBoundingClientRect().width),
    polys: document.querySelectorAll('.shp-poly').length,
    keptPolys: document.querySelectorAll('.shp-kept .shp-poly').length,
    corners: document.querySelectorAll('.shp-live .shp-corner').length,
    ticks: document.querySelectorAll('.shp-live .shp-tag-tick').length,
    squares: document.querySelectorAll('.shp-live .shp-tag-sq').length,
    squarePts: all('.shp-live .shp-tag-sq').map(e => e.getAttribute('points')),
    pts: pts,
    ctmScale: ctm ? Math.hypot(ctm.a, ctm.b) : null,
    say: (q('.shp-say') || {}).textContent || '',
    sayLive: q('.shp-say') ? q('.shp-say').getAttribute('aria-live') : null,
    paneAria: pane.getAttribute('aria-label') || '',
    keepOff: !!q('.shp-b-keep.is-off'),
    dropOff: !!q('.shp-b-drop.is-off'),
    printOff: !!q('.shp-b-print.is-off'),
    gateOn: !!q('.shp-gate.is-on'),
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
  ok(SIZE_TOL > 0.02 && SIZE_TOL < 0.05, 'poison: the derived size tolerance is ' + SIZE_TOL + ', which is not a plausible rounding bound');
}

/* geometry read off the DRAWN points — never off the model */
const sideLengths = pts => pts.map((p, i) => {
  const q = pts[(i + 1) % pts.length];
  return Math.hypot(q[0] - p[0], q[1] - p[1]);
});
const circum = function (pts) {
  let cx = 0, cy = 0;
  pts.forEach(p => { cx += p[0]; cy += p[1]; });
  cx /= pts.length; cy /= pts.length;
  return Math.max.apply(null, pts.map(p => Math.hypot(p[0] - cx, p[1] - cy)));
};
const angleAt = function (pts, i) {
  const n = pts.length, p = pts[(i - 1 + n) % n], q = pts[i], r = pts[(i + 1) % n];
  const u = [p[0] - q[0], p[1] - q[1]], v = [r[0] - q[0], r[1] - q[1]];
  return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) /
    (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]))))) * 180 / Math.PI;
};

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
  await p.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(r => setTimeout(r, settle === undefined ? 140 : settle));
  return true;
};

/* press a rail at a fraction of its length — REAL POINTER INPUT, and the
   value it lands on is READ BACK from the rail rather than assumed */
const railValue = async (p, track) =>
  Number(await p.$eval('.shp-track-' + track + ' .shp-rail', e => e.getAttribute('aria-valuenow')));

/* ⭐⭐ THE DIAL'S POSE IS MEASURED FROM THE DRAWN SHAPE, because the dial
   DELIBERATELY CARRIES NO NUMBER — a `role="slider"` announces its
   `aria-valuenow`, and the tool refuses to say a degree number on the
   one quantity its second invention proves irrelevant. So the pose is
   recovered the way a child recovers it: by looking. The unrotated
   vertex-0 angle is computed from the FORM (read off the two rails that
   DO carry numbers, because those numbers change what the shape IS) and
   subtracted from the drawn one. This also proves, for free, that the
   renderer applies exactly the rotation the dial holds. */
const centroidAngle = function (pts) {
  let cx = 0, cy = 0;
  pts.forEach(p2 => { cx += p2[0]; cy += p2[1]; });
  cx /= pts.length; cy /= pts.length;
  return Math.atan2(pts[0][1] - cy, pts[0][0] - cx) * 180 / Math.PI;
};
const modelPts = function (n, k, theta) {
  const a = 120 + k, b = 120 - k, th = theta * Math.PI / 180;
  return n === 4
    ? [[0, 0], [a, 0], [a + b * Math.cos(th), b * Math.sin(th)], [b * Math.cos(th), b * Math.sin(th)]]
    : [[0, 0], [a, 0], [b * Math.cos(th), b * Math.sin(th)]];
};
const measureRot = async (p) => {
  const st = await p.evaluate(() => {
    const e = document.querySelector('.shp-live .shp-poly');
    return { pts: e.getAttribute('points').trim().split(/\s+/).map(q => q.split(',').map(Number)),
      n: document.querySelectorAll('.shp-live .shp-corner').length };
  });
  const k = await railValue(p, 'len'), theta = await railValue(p, 'skew');
  const raw = centroidAngle(st.pts) - centroidAngle(modelPts(st.n, k, theta));
  return ((Math.round(raw / 2) * 2) % 360 + 360) % 360;
};

const pressRail = async (p, track, frac) => {
  const h = await p.$('.shp-track-' + track + ' .shp-rail');
  if (!h) throw new Error('no rail for ' + track);
  await h.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 80));
  const b = await h.boundingBox();
  if (!b) throw new Error('the ' + track + ' rail has no box');
  await p.mouse.click(b.x + Math.max(2, Math.min(b.width - 2, b.width * frac)), b.y + b.height / 2);
  await new Promise(r => setTimeout(r, 60));
  return railValue(p, track);
};

/* ⭐ LAND ON AN EXACT RUNG, BY REAL INPUT ONLY: press the rail at the
   computed fraction, then walk the last rung or two with the arrow keys.
   ⚠ A CLICK CANNOT ADDRESS EVERY RUNG AT EVERY WIDTH — at 320 the turn
   rail is ~180px for 180 rungs, so one pixel IS one rung and the click
   inset alone lands two rungs in. My first version asked for `within 2
   degrees of 0`, got 4, and reported a defect in a correct rail: the
   pointer's RESOLUTION is not the tool's precision. The keyboard is
   equally real input, and this way the state is exact and MEASURED. */
const setRail = async (p, track, value, span) => {
  await pressRail(p, track, Math.min(1, Math.max(0, span.frac(value))));
  await p.focus('.shp-track-' + track + ' .shp-rail');
  const read = () => (track === 'turn' ? measureRot(p) : railValue(p, track));
  for (let i = 0; i < 40; i++) {
    const now = await read();
    if (now === value) return now;
    let fwd = now < value;
    if (track === 'turn') fwd = ((value - now) % 360 + 360) % 360 <= 180;
    await p.keyboard.press(fwd ? 'ArrowRight' : 'ArrowLeft');
  }
  return read();
};

/* an IDENTICAL PHYSICAL DRAG: same start, same distance, every time */
const dragRail = async (p, track, fromFrac, toFrac) => {
  const h = await p.$('.shp-track-' + track + ' .shp-rail');
  await h.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 80));
  const b = await h.boundingBox();
  const y = b.y + b.height / 2;
  const x0 = b.x + b.width * fromFrac, x1 = b.x + b.width * toFrac;
  await p.mouse.move(x0, y);
  await p.mouse.down();
  for (let i = 1; i <= 8; i++) await p.mouse.move(x0 + (x1 - x0) * i / 8, y);
  await p.mouse.up();
  await new Promise(r => setTimeout(r, 60));
  return railValue(p, track);
};

async function measureReach(p) {
  for (let i = 0; i < 40; i++) await p.mouse.wheel({ deltaY: 400 });
  await new Promise(r => setTimeout(r, 140));
  return await p.evaluate(() => {
    let low = 0, name = '';
    [].slice.call(document.querySelectorAll('.shp-btn, .shp-gate-cta, .shp-rail')).forEach(function (e) {
      const r = e.getBoundingClientRect();
      if (r.height > 0 && r.bottom > low) { low = r.bottom; name = e.className.split(' ').pop(); }
    });
    const res = { low: Math.round(low), name: name, win: window.innerHeight,
      sy: Math.round(window.scrollY || 0), bodyTop: Math.round(document.body.scrollTop || 0),
      doc: document.documentElement.scrollHeight };
    window.scrollTo(0, 0); document.body.scrollTop = 0;
    return res;
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ================================================================
     THE POISON SELF-TEST, FIRST. A gate nobody has watched fail is not
     a gate. ⚠ Skipped inside a poison child, or it would recurse. */
  if (!POISON && !ONLY_REACH) {
    const runPoison = (mode) => {
      try {
        execFileSync(process.execPath, [__filename], {
          env: Object.assign({}, process.env, {
            SHP_PROBE_POISON: mode, SHP_PROBE_ONLY_REACH: '1',
            SHP_PROBE_PORT: String(PORT + 20 + mode.length)
          }), stdio: 'pipe', timeout: 90000
        });
        return 'PASS';
      } catch (e) { return (e.killed || /ETIMEDOUT/.test(String(e.code))) ? 'TIMEOUT' : 'FAIL'; }
    };
    console.log('POISON SELF-TEST — each scroll rule removed SEPARATELY, served on the fly:');
    const matrix = {};
    ['html', 'body', 'both', 'inert'].forEach(function (mode) { matrix[mode] = runPoison(mode); });
    Object.keys(matrix).forEach(m => console.log('   ' + m.padEnd(6) + ' -> ' + matrix[m]));
    /* ⚠⚠ WHAT MUST FAIL IS MEASURED, NOT DECREED. `both` removes the
       escape entirely; if THAT does not make the lowest control
       unreachable at 320x568, the reachability check cannot fail and is
       measuring something always true. The single-rule results are
       reported as findings — a sibling measured the body half as not
       carrying reachability at this viewport, and calling that a defect
       would be an invented law. */
    ok(matrix.both === 'FAIL',
      '⚠⚠ THE REACHABILITY CHECK CANNOT FAIL: with BOTH scroll rules removed it reported ' +
      matrix.both + ' — it is measuring something that is always true');
    console.log('   (MEASURED, NOT DECREED: `both` must fail; the single-rule and inert rows are ' +
      'reported — each can stay reachable by a different mechanism, and gating them would be an invented law)');
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
       favicon, the platform entitlement endpoint this static server does
       not host (the tool is REQUIRED to degrade to the free tier without
       it), and the two Google font hosts, which would make a
       network-dependent gate intermittent. */
    p.on('console', m => {
      if (m.type() !== 'error') return;
      const url = (m.location() || {}).url || '';
      if (/favicon\.ico/.test(url) || /api\/entitlement/.test(url)) return;
      if (/^https?:\/\/fonts\.(gstatic|googleapis)\.com\//.test(url)) return;
      fails.push(tag + ': console error [' + (url || 'no url') + '] ' + m.text());
    });
    await p.setViewport({ width: v.w, height: v.h });
    await p.goto('http://127.0.0.1:' + PORT + '/mini-tools/shape-stretcher.html?lang=en', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    /* ---- NON-VACUITY FIRST ---------------------------------------- */
    const s0 = await p.evaluate(READ);
    if (!s0) { fails.push(tag + ': ⚠⚠ NOTHING RENDERED — no card or no pane'); await p.close(); continue; }

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
        ' (window scrolled ' + reach.sy + ', body ' + reach.bodyTop + ', doc ' + reach.doc + ')');
      await p.close();
      continue;
    }

    ok(Object.keys(s0.named).length >= 13, tag + ': non-vacuity — only ' + Object.keys(s0.named).length + ' named parts rendered');
    ok(s0.card.w > 100 && s0.card.h > 100, tag + ': non-vacuity — the card measures ' + s0.card.w + 'x' + s0.card.h);
    ok(s0.polys === 1, tag + ': ' + s0.polys + ' shapes are on the pane at rest, not 1');
    ok(s0.corners === 4, tag + ': the four-sided shape draws ' + s0.corners + ' corner discs');
    ok(!!s0.pts && s0.pts.length === 4, tag + ': non-vacuity — the drawn polygon carries ' + (s0.pts ? s0.pts.length : 0) + ' points');
    ok(s0.rails.length === 3, tag + ': ' + s0.rails.length + ' rails rendered, not 3');
    ok(s0.gateOn, tag + ': the paid gate is not shown to a free visitor');
    ok(s0.printOff, tag + ': ⚠ the print control is live for a free visitor');
    ok(s0.dropOff, tag + ': ⚠ the put-away control is live with nothing kept');
    ok(!s0.keepOff, tag + ': ⚠ the keep control is dead with nothing kept yet');
    /* ⚠ THE TAG SENTENCE IS NOT IN THE PANE'S LABEL, AND THAT IS THE
       DESIGN. The caption is an `aria-live` region, so the tags are
       announced ON CHANGE and sit in the accessibility tree exactly
       once; repeating them in the label would have a screen reader
       re-read the whole description on every arrow press of the one
       control that by theorem changes nothing. My first version held
       the label to a 25-character floor and condemned the correct tool
       at all eight viewports — a floor written against the older shape
       of the same information. Both channels are asserted instead. */
    ok(s0.paneAria.length > 10, tag + ': the pane carries no accessible name — nothing on the canvas is a tap target, so the aria carries it');
    ok(s0.say.length > 5, tag + ': ⚠⚠ the caption says nothing about the tags, and the pane\'s label deliberately does not repeat it — so the tags reach a screen reader on NO channel');
    ok(s0.sayLive === 'polite', tag + ': ⚠⚠ the caption is not a live region, so the tag sentence changes silently for a screen-reader user');
    ok(!/\{\w+\}/.test(s0.paneAria + ' ' + s0.say), tag + ': ⚠ a RAW TOKEN is rendering: ' + s0.paneAria);

    /* ⭐⭐ THE DIAL HAS NO NOTCHES, AND THE OTHER TWO DO. This is the
       tool's first invention, stated in furniture. */
    ok(s0.notches.turn === 0,
      tag + ': ⭐⭐ THE TURN RAIL CARRIES ' + s0.notches.turn + ' NOTCHES — the apparatus is asserting that some rotation is special, which is the misconception itself');
    ok(s0.notches.len >= 1, tag + ': ⭐ the stretch rail carries no notch at all on the four-sided default');
    ok(s0.notches.skew >= 1, tag + ': ⭐ the lean rail carries no notch at all on the four-sided default');
    ok(s0.notches.len < 20 && s0.notches.skew < 20,
      tag + ': ⚠⚠ the rails carry ' + s0.notches.len + '/' + s0.notches.skew +
      ' notches — a solid bar of ticks is not a detent set (the shipped defect: every rung where a tag merely HELD was notched)');

    /* ---- the two floors, SEPARATELY -------------------------------- */
    ['.shp-b-keep', '.shp-b-drop', '.shp-b-quarter', '.shp-b-deal', '.shp-b-print'].forEach(function (sel) {
      const r = s0.named[sel];
      ok(!!r, tag + ': the control ' + sel + ' did not render');
      if (r) ok(Math.min(r.w, r.h) >= TAP_FLOOR,
        tag + ': ⚠ the control ' + sel + ' measures ' + Math.round(Math.min(r.w, r.h)) + 'px, under the ' + TAP_FLOOR + 'px chrome floor');
    });
    s0.rails.forEach(function (r, i) {
      ok(r.h >= TAP_FLOOR, tag + ': ⚠ rail[' + i + '] is ' + Math.round(r.h) + 'px tall, under the ' + TAP_FLOOR + 'px tap floor');
      ok(r.w >= 80, tag + ': rail[' + i + '] is only ' + Math.round(r.w) + 'px long — the ladder cannot be walked by drag');
      ok(r.role === 'slider' && r.tab === '0', tag + ': ⚠⚠ rail[' + i + '] is not a focusable slider — a drag-only control is dead to a keyboard');
      ok(!!r.label && r.label.length > 1, tag + ': rail[' + i + '] has no accessible name');
    });
    /* ⭐⭐ TWO RAILS SAY WHERE THEY ARE AND THE DIAL DOES NOT, ON PURPOSE.
       A `role="slider"` announces its `aria-valuenow`, so a dial that
       carried one would read a degree number aloud on every arrow press
       — the one quantity the refuse-list bans and the second invention
       proves irrelevant. `len` and `skew` keep theirs: those numbers
       change what the shape IS. */
    [0, 1].forEach(function (i) {
      const r = s0.rails[i];
      ok(r && r.now !== null && r.min !== null && r.max !== null,
        tag + ': rail[' + i + '] (' + (r && r.label) + ') never says where it is, and its number is what changes the shape');
    });
    ok(s0.rails[2] && s0.rails[2].now === null && s0.rails[2].min === null && s0.rails[2].max === null,
      tag + ': ⚠⚠ THE DIAL CARRIES A NUMERIC VALUE (' + (s0.rails[2] || {}).now +
      ') — a screen-reader user hears a degree number on every arrow press, on a channel no string edit can reach');
    s0.grips.forEach(function (w, i) { ok(w >= 18, tag + ': grip[' + i + '] is ' + Math.round(w) + 'px wide'); });

    /* ⚠ NOTHING ON THE CANVAS IS A TAP TARGET. The corner discs are 8px
       across — deliberately under the 34px canvas floor, which is only
       honest if nothing about them invites a tap. */
    ok(s0.canvasBits.length >= 5, tag + ': non-vacuity — only ' + s0.canvasBits.length + ' canvas parts were inspected for affordance');
    s0.canvasBits.forEach(function (m, i) {
      ok(m.cursor !== 'pointer', tag + ': ⚠⚠ canvas part[' + i + '] (' + m.tag + ') carries a pointer cursor — it invites a tap it is far too small to take (' + CANVAS_FLOOR + 'px floor)');
      ok(m.tabindex === null, tag + ': canvas part[' + i + '] is focusable');
      ok(m.role === null, tag + ': canvas part[' + i + '] claims a role');
      ok(!m.onclick, tag + ': canvas part[' + i + '] has a click handler');
      ok(m.tag !== 'BUTTON' && m.tag !== 'A', tag + ': canvas part[' + i + '] is a <' + m.tag + '>');
    });

    /* ---- containment / collision ----------------------------------- */
    const contain = (st, when) => {
      Object.keys(st.named).forEach(function (sel) {
        if (!drawn(st.named[sel])) return;
        ok(inside(st.named[sel], st.card, 1.5),
          tag + ': ⚠⚠ ' + sel + ' is OUTSIDE THE CARD ' + when + ' (' + Math.round(st.named[sel].x) + ',' +
          Math.round(st.named[sel].y) + ' ' + Math.round(st.named[sel].w) + 'x' + Math.round(st.named[sel].h) +
          ' vs card ' + Math.round(st.card.w) + 'x' + Math.round(st.card.h) + ')');
      });
      ok(st.card.r <= v.w + 1.5, tag + ': the card itself overflows the viewport ' + when);
      ok(st.appOverflow !== 'scroll', tag + ': the card scrolls sideways ' + when);
    };
    const collideCheck = (st, when) => {
      const nest = {};
      st.nested.forEach(k => { nest[k] = 1; });
      /* ⚠ non-vacuity: if EVERY pair were nested there would be nothing
         left to compare, and this check would certify by comparing
         nothing at all */
      const total = st.collide.length * (st.collide.length - 1) / 2;
      ok(st.nested.length < total * 0.6,
        tag + ': non-vacuity — ' + st.nested.length + ' of ' + total + ' pairs are nested ' + when + ', so the collision check has almost nothing to look at');
      for (let i = 0; i < st.collide.length; i++) {
        for (let j = i + 1; j < st.collide.length; j++) {
          if (nest[i + '|' + j]) continue;
          const A = st.collide[i], B = st.collide[j];
          ok(!overlap(A.r, B.r),
            tag + ': ⚠⚠ ' + A.s + ' and ' + B.s + ' OVERLAP ' + when + ' — one is drawn on top of the other');
        }
      }
    };
    ok(s0.collide.length >= 12, tag + ': non-vacuity — the collision set holds only ' + s0.collide.length + ' boxes');
    contain(s0, 'at rest'); collideCheck(s0, 'at rest');
    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'rest-' + tag + '.png'), fullPage: true });

    /* ================================================================
       ⭐⭐ ROTATION EQUIVARIANCE — THE LIKELIEST BUG IN THE BUILD.
       An identical physical drag on the stretch rail must produce an
       identical stretch at every rotation of the shape. */
    /* ⚠ 45, 135, 225 and 315 ARE NOT RUNGS — the dial walks in twos, so
       no control can reach them. The nearest rung is used and NAMED. */
    const WANT = [[0, 0], [45, 44], [90, 90], [135, 134], [180, 180], [225, 224], [270, 270], [315, 314]];
    const TURN_SPAN = { frac: v2 => v2 / 358 };
    const equiv = [];
    for (const [want, rung] of WANT) {
      const got = await setRail(p, 'turn', rung, TURN_SPAN);
      const k0 = await pressRail(p, 'len', 0.5);
      const k1 = await dragRail(p, 'len', 0.5, 0.7);
      equiv.push({ want: want, rung: rung, rot: got, k0: k0, k1: k1, d: k1 - k0 });
    }
    ok(equiv.length === WANT.length, tag + ': non-vacuity — only ' + equiv.length + ' rotations were driven');
    ok(new Set(equiv.map(e => e.rot)).size === WANT.length,
      tag + ': non-vacuity — the dial did not actually move between the eight rotations (' + equiv.map(e => e.rot).join(',') + ')');
    ok(equiv.every(e => e.rot === e.rung),
      tag + ': the dial could not be driven to its own rungs: ' + equiv.map(e => e.want + '->' + e.rot).join(' '));
    ok(Math.abs(equiv[0].d) >= 20,
      tag + ': ⚠⚠ non-vacuity — the identical drag moved the stretch by ' + equiv[0].d +
      ', so "the same at every rotation" would pass on a rail that does nothing at all');
    const d0 = equiv[0].d;
    equiv.forEach(function (e) {
      ok(e.d === d0,
        tag + ': ⭐⭐ THE SAME PHYSICAL DRAG PRODUCED A DIFFERENT STRETCH AT ' + e.rot + ' DEGREES (' +
        e.d + ' vs ' + d0 + ') — the grip is being read along the side\'s current direction, so it works at 0 and dies at 90');
      ok(e.k0 === equiv[0].k0, tag + ': the rail did not return to the same rung before the drag at ' + e.rot + ' degrees');
    });

    /* ⭐ AND TURNING DOES NOT CHANGE THE SIZE. The whole dial, by
       keyboard, comparing the DRAWN side lengths and the circumradius. */
    /* ⚠ NO `Home` HERE. The ring has no ends, so the dial DECLINES Home
       and End — landing them anywhere would mean choosing a rung, and
       the only rung anyone would choose is upright. The sweep therefore
       starts wherever the dial is and walks the whole ladder, which is
       all it needs. */
    await p.focus('.shp-track-turn .shp-rail');
    const sizes = [];
    const STEPS = v.w === 768 ? 180 : 24;   /* the full ladder at the operator's viewport */
    for (let i = 0; i < STEPS; i++) {
      const st = await p.evaluate(() => {
        const e = document.querySelector('.shp-live .shp-poly');
        return { pts: e.getAttribute('points').trim().split(/\s+/).map(q => q.split(',').map(Number)) };
      });
      st.rot = centroidAngle(st.pts).toFixed(3);
      sizes.push(st);
      for (let j = 0; j < (v.w === 768 ? 1 : 7); j++) await p.keyboard.press('ArrowRight');
    }
    ok(sizes.length === STEPS, tag + ': non-vacuity — only ' + sizes.length + ' poses were measured');
    ok(new Set(sizes.map(s => s.rot)).size >= STEPS - 1,
      tag + ': non-vacuity — the keyboard did not walk the dial (' + new Set(sizes.map(s => s.rot)).size + ' distinct poses)');
    {
      const base = sideLengths(sizes[0].pts).slice().sort((a, b) => a - b);
      const baseC = circum(sizes[0].pts);
      let worstS = 0, worstC = 0, worstAt = 0;
      sizes.forEach(function (s) {
        const ss = sideLengths(s.pts).slice().sort((a, b) => a - b);
        ss.forEach(function (x, i) { if (Math.abs(x - base[i]) > worstS) { worstS = Math.abs(x - base[i]); worstAt = s.rot; } });
        worstC = Math.max(worstC, Math.abs(circum(s.pts) - baseC));
      });
      ok(base[0] > 20, tag + ': non-vacuity — the drawn shape has a ' + base[0].toFixed(1) + ' unit side; there is nothing to compare');
      ok(worstS <= SIZE_TOL,
        tag + ': ⭐⭐ TURNING CHANGED THE DRAWN SIZE — a side moved by ' + worstS.toFixed(4) +
        ' units at ' + worstAt + ' degrees, over the ' + SIZE_TOL.toFixed(4) +
        ' the coordinate rounding can account for. The shape is being fitted to something that BREATHES as it turns');
      ok(worstC <= SIZE_TOL, tag + ': ⭐ the drawn circumradius moved by ' + worstC.toFixed(4) + ' units under a rotation');
      /* the ratio bound: three orders of magnitude tighter than a
         bounding-box fit could survive, and immune to the quantum */
      ok(worstS / base[0] < 0.001, tag + ': the drawn side swung by ' +
        (100 * worstS / base[0]).toFixed(3) + '% under a rotation');
      if (v.w === 768) {
        console.log('  [768] size invariance over ' + STEPS + ' poses: worst side ' + worstS.toFixed(4) +
          ' units (' + (worstS * (s0.ctmScale || 1)).toFixed(4) + 'px), worst circumradius ' + worstC.toFixed(4) +
          ' units; rounding bound ' + SIZE_TOL.toFixed(4));
      }
    }

    /* ================================================================
       ⭐ THE LITTLE SQUARE IS ON THE CORNER THE EYE SEES AS SQUARE.
       Driven to a 30-60-90 by pointer, then measured in the DOM. */
    await clickSel(p, '.lcs-ctrl');
    await new Promise(r => setTimeout(r, 260));
    const chips = await p.$$('.lcs-chip');
    ok(chips.length >= 2, tag + ': non-vacuity — the settings drawer offered ' + chips.length + ' chips');
    if (chips.length >= 2) {
      const cb = await chips[chips.length - 1].boundingBox();
      ok(!!cb, tag + ': the three-sides chip has no box');
      if (cb) await p.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2);
      await new Promise(r => setTimeout(r, 320));
    }
    /* ⚠⚠ CLOSE IT BY ITS OWN CLOSE BUTTON, AND ASSERT IT CLOSED. My
       first version clicked the scrim's top-left corner, which at 768
       lands on the DRAWER PANEL instead — so the drawer stayed open, the
       next click on the lean rail was swallowed, and the rail reported
       the random lean the settings change had just dealt (148). Every
       assertion after it was then measuring a state I never reached:
       #39's silent no-op, verbatim. */
    await clickSel(p, '.lcs-drawer-head .lcs-ctrl');
    await new Promise(r => setTimeout(r, 220));
    ok(!(await p.$('.lcs-drawer.open')),
      tag + ': ⚠⚠ the settings drawer did not close — every click after this one would be swallowed and every assertion after it would be measuring a state nobody reached');

    /* ⚠ THE POINTER ALONE MUST DO IT ON THESE TWO. They are coarse
       ladders (73 and 165 rungs on the same rail the dial's 180 sit on),
       so a click can address every rung at every width — and asserting
       it here keeps the keyboard correction below from silently papering
       over a rail that no longer takes a press at all. */
    const thClick = await pressRail(p, 'skew', (60 - 18) / 144);
    ok(thClick === 60, tag + ': ⚠⚠ a pointer press at the 60 mark landed the lean rail on ' + thClick);
    const kClick = await pressRail(p, 'len', (40 + 82) / 164);
    ok(kClick === 40, tag + ': ⚠⚠ a pointer press at the +40 mark landed the stretch rail on ' + kClick);
    const th = await setRail(p, 'skew', 60, { frac: v2 => (v2 - 18) / 144 });
    const kk = await setRail(p, 'len', 40, { frac: v2 => (v2 + 82) / 164 });
    ok(th === 60, tag + ': the lean rail could not be driven to 60 (landed on ' + th + ')');
    ok(kk === 40, tag + ': the stretch rail could not be driven to +40 (landed on ' + kk + ')');
    const tri = await p.evaluate(READ);
    ok(tri.corners === 3, tag + ': the three-sided setting draws ' + tri.corners + ' corners');
    ok(tri.squares === 1, tag + ': ⚠⚠ the 30-60-90 shows ' + tri.squares + ' right-angle marks, not exactly one');
    ok(tri.ticks === 0, tag + ': the 30-60-90 also claims every side the same length');
    if (tri.squares === 1 && tri.pts && tri.pts.length === 3) {
      /* the mark's own corner point is its MIDDLE point; find which drawn
         vertex it sits on, BY POSITION, then measure that vertex's angle
         from the drawn coordinates. No index convention is shared. */
      const mk = tri.squarePts[0].trim().split(/\s+/).map(q => q.split(',').map(Number));
      ok(mk.length === 3, tag + ': the right-angle mark is not a three-point polyline');
      const legMid = [mk[0][0] + mk[2][0] - mk[1][0], mk[0][1] + mk[2][1] - mk[1][1]];
      let best = -1, bestD = 1e9;
      tri.pts.forEach(function (q, i) { const d = Math.hypot(q[0] - legMid[0], q[1] - legMid[1]); if (d < bestD) { bestD = d; best = i; } });
      ok(bestD < 6, tag + ': non-vacuity — the mark does not sit on any drawn vertex (' + bestD.toFixed(2) + ' units away)');
      const a = angleAt(tri.pts, best);
      ok(Math.abs(a - 90) < 0.5,
        tag + ': ⭐⭐ THE LITTLE SQUARE IS DRAWN ON A ' + a.toFixed(1) +
        ' DEGREE CORNER — the mark and the shape disagree, and only a measurement of the DRAWN points can see it');
      const others = [0, 1, 2].filter(i => i !== best).map(i => angleAt(tri.pts, i).toFixed(0)).sort();
      ok(others.join(',') === '30,60', tag + ': the other two corners of the 30-60-90 measure ' + others.join(' and '));
    }
    contain(tri, 'on a 30-60-90'); collideCheck(tri, 'on a 30-60-90');

    /* ---- the kept shape: two on the pane at once -------------------- */
    await clickSel(p, '.shp-b-keep');
    const kept = await p.evaluate(READ);
    ok(kept.polys === 2, tag + ': ⭐⭐ keeping a shape did not put TWO on the pane (' + kept.polys + ') — the simultaneous array is the whole pedagogy');
    ok(kept.keptPolys === 1, tag + ': the kept shape is not drawn as the kept one');
    ok(kept.keepOff, tag + ': ⚠ a second shape can still be kept');
    ok(!kept.dropOff, tag + ': ⚠ the put-away control is still dead with a shape kept');
    /* ⭐⭐ THE KEPT SHAPE SAYS WHAT IT IS. The one mechanism with the
       effect size behind it was sighted-only while the pane announced
       the live form and then a bare "a kept shape stands beside it". */
    ok(kept.paneAria.length > tri.paneAria.length + 20,
      tag + ': ⚠⚠ the kept shape adds ' + (kept.paneAria.length - tri.paneAria.length) +
      ' characters to the pane\'s label — its own sides and its own tags must be there, or the comparison is sighted-only');
    contain(kept, 'with a shape kept'); collideCheck(kept, 'with a shape kept');
    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'kept-' + tag + '.png'), fullPage: true });

    /* and it can be put away again — the control that was never built */
    await clickSel(p, '.shp-b-drop');
    const dropped = await p.evaluate(READ);
    ok(dropped.polys === 1, tag + ': ⚠⚠ the kept shape could not be put away (' + dropped.polys + ' shapes remain)');
    ok(dropped.dropOff && !dropped.keepOff, tag + ': the keep/put-away pair did not return to its resting state');

    /* ---- a quarter turn changes nothing but the pose ---------------- */
    const beforeQ = await p.evaluate(READ);
    await clickSel(p, '.shp-b-quarter');
    const afterQ = await p.evaluate(READ);
    ok(afterQ.squares === beforeQ.squares && afterQ.ticks === beforeQ.ticks,
      tag + ': ⭐⭐ A QUARTER TURN CHANGED THE TAGS (' + beforeQ.squares + '/' + beforeQ.ticks + ' -> ' +
      afterQ.squares + '/' + afterQ.ticks + ') — the tool is the claim that it cannot');
    ok(afterQ.say === beforeQ.say, tag + ': a quarter turn changed what the tool says about the tags');
    ok(afterQ.notches.turn === 0, tag + ': the dial grew a notch after a quarter turn');
    ok(JSON.stringify(afterQ.pts) !== JSON.stringify(beforeQ.pts), tag + ': ⚠ the quarter turn did not move the shape at all');

    /* ---- and the four-press identity: back where you began ---------- */
    for (let i = 0; i < 3; i++) await clickSel(p, '.shp-b-quarter');
    const round = await p.evaluate(READ);
    ok(JSON.stringify(round.pts) === JSON.stringify(beforeQ.pts),
      tag + ': ⭐ four quarter turns did not return the shape to where it began');

    contain(round, 'after a full turn'); collideCheck(round, 'after a full turn');
    if (SHOT.indexOf(v.w) >= 0) await p.screenshot({ path: path.join(OUT, 'triangle-' + tag + '.png'), fullPage: true });

    console.log('[' + tag + '] card ' + Math.round(s0.card.w) + 'x' + Math.round(s0.card.h) +
      ' | doc ' + s0.docH + '/' + s0.winH + ' html:' + s0.htmlOverflow +
      ' | notches len/skew/turn ' + s0.notches.len + '/' + s0.notches.skew + '/' + s0.notches.turn +
      ' | drag ' + d0 + ' at every rotation (' + equiv.map(e => e.rot).join(',') + ')');
    await p.close();
  }

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + checks + ' render checks, ' + fails.length + ' failures');
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length > 40) console.log('  ... and ' + (fails.length - 40) + ' more');
  if (fails.length) process.exit(1);
})();
