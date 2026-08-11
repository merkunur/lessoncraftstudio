/* =====================================================================
   GATE — scripts/_shp-symmetry.js        TOOL #57 THE SHAPE STRETCHER
   ---------------------------------------------------------------------
   ⚠⚠ WHY THIS GATE EXISTS AT ALL, AND IT IS THE WHOLE LESSON.

   The tool's answer to three panels' sharpest objection is that a tag is
   EXACTLY AS LOUD COMING BACK AS IT WAS GOING — a property reported, not
   a performance judged. That law was stated in the header, asserted in
   `verify-shape-stretcher.js` as `T_POP === T_SEAT`, and NOT RENDERED:
   the file contained no `transition`, no `animation` and no `@keyframes`
   at all, and `--shp-dur` was written on every paint by `_paint` and
   read by ZERO CSS rules. So both events took zero time, and the
   equality held BECAUSE BOTH SIDES WERE ZERO. An equality between two
   nothings certifies a law that is never performed.

   ⭐ THE STANDING RULE: a constant reaching a CALL SITE is not a
   constant reaching the SCREEN, and no source scan can tell them apart.
   So this gate never reads the source and never reads GEO. It drives the
   real tool in a real browser, makes a tag leave and makes a tag arrive,
   and reads the two animations OFF THE RENDERED ELEMENTS — duration,
   offset, angle, opacity, and colour — then asserts they are reverses of
   one another.

   ⚠ NON-VACUITY FIRST, EVERY TIME. Two empty NodeLists compare equal,
   and two absent animations have equal (undefined) durations. Every
   symmetry assertion below is preceded by a check that the thing it
   compares EXISTS and is non-zero — the #40 lesson, which passed a tape
   gate that had selected nothing.

   POISON, IN BOTH DIRECTIONS (`--poison=<case>`):
     control  a correct tool must PASS
     none     strip the keyframes      -> must FAIL (nothing rendered)
     asym     lengthen only the seat   -> must FAIL (production values)
     hue      recolour only the pop    -> must FAIL (a verdict by hue)
     curve    ease-out on both halves  -> must FAIL (identical endpoints,
              identical duration, identical colour, and the pop still
              leaves in a leap while the seat creeps back. THIS IS THE
              DEFECT THIS GATE'S FIRST VERSION SHIPPED — it compared the
              two ends and never looked at the middle.)
     still    zero the travel          -> must FAIL (equal but vacuous)
   `--poison=all` runs every case and asserts control PASSES and each
   poison FAILS.

   Usage:  node scripts/_shp-symmetry.js [--poison=all]
   ===================================================================== */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const pup = require('puppeteer');

const ROOT = path.join(process.cwd(), 'mini tools');
const PORT = 5917;
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json' };

const POISONS = ['none', 'asym', 'hue', 'curve', 'still'];
const argPoison = (process.argv.find(a => a.startsWith('--poison=')) || '').split('=')[1] || '';

/* ---------------------------------------------------------------- */
/* the measurement, run inside the page. Returns a plain record; every
   judgement is made in Node, so the oracle never lives beside the code
   it grades. */
const MEASURE = async function (poison) {
  const T = window.ShapeStretcher;
  const out = { err: null, pop: null, seat: null, poison: poison };
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  if (!T || !T._apply) { out.err = 'the tool is not mounted'; return out; }

  /* apply the poison to the LIVE stylesheet, never to the source */
  if (poison) {
    const st = document.getElementById('shp-css');
    if (!st) { out.err = 'no stylesheet to poison'; return out; }
    if (poison === 'none') {
      st.textContent = st.textContent
        .replace(/@keyframes shp-pop\{[^@]*?\}\}/, '')
        .replace(/@keyframes shp-seat\{[^@]*?\}\}/, '')
        .replace(/\.shp-tag\.is-pop\{[^}]*\}/, '')
        .replace(/\.shp-tag\.is-seat\{[^}]*\}/, '');
    } else if (poison === 'asym') {
      st.textContent += '.shp-tag.is-seat{animation-duration:640ms !important}';
    } else if (poison === 'hue') {
      st.textContent += '.shp-tag.is-pop{stroke:#B03A2E !important}';
    } else if (poison === 'curve') {
      /* the defect this gate MISSED on its first version: identical
         endpoints, identical duration, identical colour — and the pop
         leaves in a leap while the seat creeps back */
      st.textContent += '.shp-tag.is-pop{animation-timing-function:ease-out !important}';
      st.textContent += '.shp-tag.is-seat{animation-timing-function:ease-out !important}';
    } else if (poison === 'still') {
      st.textContent += '.shp-pane{--shp-rz:0deg !important}';
      st.textContent += '.shp-tag{--shp-tx:0px !important;--shp-ty:0px !important}';
    }
  }

  /* read whatever is animating on a tag right now.
     ⭐⭐ AND SAMPLE THE MIDDLE, NOT ONLY THE TWO ENDS. The first version
     of this gate read the keyframes and compared endpoints, and it
     CERTIFIED an asymmetric motion: with `ease-out` on both halves the
     pop had covered 9.6px of its 14 at mid-flight while the seat had
     covered 4.4 — the pop leaving in a leap and the seat creeping back,
     which is the verdict delivered by production values, exactly the
     thing the law exists to forbid. Endpoints are necessary and nowhere
     near sufficient. The animation is paused and scrubbed to real times,
     so these are the numbers a child's eye actually receives. */
  const SAMPLES = [0.25, 0.5, 0.75];
  const read = function (sel) {
    const els = Array.prototype.slice.call(document.querySelectorAll(sel));
    const rec = { count: els.length, anims: 0, durMs: null, frames: null, stroke: null, scrub: null };
    if (!els.length) return rec;
    const el = els[0];
    rec.stroke = getComputedStyle(el).stroke;
    const as = el.getAnimations ? el.getAnimations() : [];
    rec.anims = as.length;
    if (!as.length) return rec;
    const a = as[0];
    rec.durMs = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming().duration : null;
    try {
      rec.frames = a.effect.getKeyframes().map(function (k) {
        return { offset: k.computedOffset, transform: k.transform || null, opacity: k.opacity == null ? null : String(k.opacity) };
      });
    } catch (e) { rec.frames = null; }
    if (rec.durMs) {
      a.pause();
      rec.scrub = SAMPLES.map(function (fr) {
        a.currentTime = rec.durMs * fr;
        const cs = getComputedStyle(el);
        return { at: fr, transform: cs.transform, opacity: parseFloat(cs.opacity) };
      });
    }
    return rec;
  };

  /* --- THE SEAT: from a shape with no tag, put one on ------------- */
  T.st = { n: 4, k: 5, theta: 88, rot: 34, kept: null };
  T.render();
  await sleep(30);
  T._apply('skew', 90);                  /* right angle arrives */
  await sleep(20);
  out.seat = read('.shp-live .shp-tag.is-seat');

  /* --- THE POP: from that same shape, take the tag off ------------ */
  T.st = { n: 4, k: 5, theta: 90, rot: 34, kept: null };
  T.render();
  await sleep(30);
  T._apply('skew', 88);                  /* right angle leaves */
  await sleep(20);
  out.pop = read('.shp-ghost .shp-tag.is-pop');

  return out;
};

/* ---------------------------------------------------------------- */
/* parsing, in Node. `transform` arrives as a matrix or as a function
   list depending on the engine, so both shapes are handled and the
   parser REFUSES rather than guessing. */
function parseXform(s) {
  if (!s || s === 'none') return { tx: 0, ty: 0, deg: 0, ok: true };
  let m = /matrix\(\s*([-\d.eE]+),\s*([-\d.eE]+),\s*([-\d.eE]+),\s*([-\d.eE]+),\s*([-\d.eE]+),\s*([-\d.eE]+)\s*\)/.exec(s);
  if (m) {
    const a = +m[1], b = +m[2], e = +m[5], f = +m[6];
    return { tx: e, ty: f, deg: Math.atan2(b, a) * 180 / Math.PI, ok: true };
  }
  const t = /translate\(\s*([-\d.]+)px[,\s]+([-\d.]+)px\s*\)/.exec(s);
  const r = /rotate\(\s*([-\d.]+)deg\s*\)/.exec(s);
  if (!t && !r) return { tx: 0, ty: 0, deg: 0, ok: false };
  return { tx: t ? +t[1] : 0, ty: t ? +t[2] : 0, deg: r ? +r[1] : 0, ok: true };
}
const mag = p => Math.sqrt(p.tx * p.tx + p.ty * p.ty);
const near = (a, b, tol) => Math.abs(a - b) <= (tol == null ? 0.5 : tol);

/* ---------------------------------------------------------------- */
function judge(rec, label) {
  const fails = [];
  let pass = 0;
  const ok = (c, m) => { if (c) pass++; else fails.push(label + ': ' + m); };

  if (rec.err) { fails.push(label + ': ' + rec.err); return { pass, fails }; }
  const P = rec.pop, S = rec.seat;

  /* ---- NON-VACUITY, BEFORE ANY COMPARISON ---------------------- */
  ok(P && P.count > 0, '⚠⚠ NO POPPING TAG WAS RENDERED AT ALL — every assertion below would compare two empty sets');
  ok(S && S.count > 0, '⚠⚠ NO SEATING TAG WAS RENDERED AT ALL — every assertion below would compare two empty sets');
  if (!P || !S || !P.count || !S.count) return { pass, fails };

  ok(P.anims > 0, '⚠⚠ THE POP IS NOT ANIMATED — this is the shipped defect: --shp-dur written, read by no rule, both events instantaneous');
  ok(S.anims > 0, '⚠⚠ THE SEAT IS NOT ANIMATED — same defect, other half');
  if (!P.anims || !S.anims) return { pass, fails };

  ok(typeof P.durMs === 'number' && P.durMs > 0, 'the pop has no duration (' + P.durMs + ') — an equality between two zeroes is not a law');
  ok(typeof S.durMs === 'number' && S.durMs > 0, 'the seat has no duration (' + S.durMs + ')');
  ok(Array.isArray(P.frames) && P.frames.length >= 2, 'the pop has fewer than two keyframes — nothing travels');
  ok(Array.isArray(S.frames) && S.frames.length >= 2, 'the seat has fewer than two keyframes — nothing travels');
  if (!P.durMs || !S.durMs || !P.frames || !S.frames) return { pass, fails };

  /* ---- THE FOUR SYMMETRIES ------------------------------------- */
  ok(near(P.durMs, S.durMs, 1),
    '⭐⭐ THE POP AND THE SEAT TRAVEL FOR DIFFERENT LENGTHS OF TIME (' + P.durMs + 'ms vs ' + S.durMs + 'ms) — the more exciting animation IS the verdict, delivered by production values');

  const pA = parseXform(P.frames[0].transform), pB = parseXform(P.frames[P.frames.length - 1].transform);
  const sA = parseXform(S.frames[0].transform), sB = parseXform(S.frames[S.frames.length - 1].transform);
  ok(pA.ok && pB.ok && sA.ok && sB.ok, 'a keyframe transform could not be parsed — the measurement is refusing rather than guessing');

  const pTravel = Math.abs(mag(pB) - mag(pA));
  const sTravel = Math.abs(mag(sB) - mag(sA));
  ok(pTravel > 1, '⚠ THE POP TRAVELS NOWHERE (' + pTravel.toFixed(2) + 'px) — equal travel that is no travel is the vacuous equality again');
  ok(sTravel > 1, '⚠ THE SEAT TRAVELS NOWHERE (' + sTravel.toFixed(2) + 'px)');
  ok(near(pTravel, sTravel, 0.6),
    '⭐⭐ THE POP AND THE SEAT TRAVEL DIFFERENT DISTANCES (' + pTravel.toFixed(2) + 'px vs ' + sTravel.toFixed(2) + 'px)');

  const pTurn = Math.abs(pB.deg - pA.deg), sTurn = Math.abs(sB.deg - sA.deg);
  ok(pTurn > 1, '⚠ THE POP ROTATES BY NOTHING (' + pTurn.toFixed(2) + 'deg)');
  ok(near(pTurn, sTurn, 0.6),
    '⭐⭐ THE POP AND THE SEAT ROTATE BY DIFFERENT AMOUNTS (' + pTurn.toFixed(2) + 'deg vs ' + sTurn.toFixed(2) + 'deg)');

  /* the reverse relation, stated on the endpoints: where one starts the
     other ends. This is what makes them ONE gesture rather than two. */
  ok(near(mag(pA), mag(sB), 0.6) && near(mag(pB), mag(sA), 0.6),
    '⭐⭐ THE SEAT IS NOT THE POP RUN BACKWARDS — pop goes ' + mag(pA).toFixed(1) + '->' + mag(pB).toFixed(1) + 'px while the seat goes ' + mag(sA).toFixed(1) + '->' + mag(sB).toFixed(1) + 'px');

  const pOp = [P.frames[0].opacity, P.frames[P.frames.length - 1].opacity];
  const sOp = [S.frames[0].opacity, S.frames[S.frames.length - 1].opacity];
  ok(pOp[0] === sOp[1] && pOp[1] === sOp[0],
    '⭐ THE OPACITY IS NOT MIRRORED — pop ' + pOp.join('->') + ' against seat ' + sOp.join('->'));

  /* ---- ⭐⭐ THE MIDDLE, NOT ONLY THE TWO ENDS -------------------- */
  ok(Array.isArray(P.scrub) && P.scrub.length === 3 && Array.isArray(S.scrub) && S.scrub.length === 3,
    'non-vacuity: the animations could not be scrubbed, so the mid-flight comparison below would compare nothing');
  if (Array.isArray(P.scrub) && Array.isArray(S.scrub) && P.scrub.length === 3 && S.scrub.length === 3) {
    /* the seat is the pop run backwards, so pop at t must match seat at
       1-t: same distance from the settled position, same opacity */
    for (let i = 0; i < 3; i++) {
      const pAt = P.scrub[i], sAt = S.scrub[2 - i];
      const pm = mag(parseXform(pAt.transform)), sm = mag(parseXform(sAt.transform));
      ok(near(pm, sm, 0.75),
        '⭐⭐ MID-FLIGHT THE POP AND THE SEAT ARE IN DIFFERENT PLACES — at ' + Math.round(pAt.at * 100) + '% the pop is ' + pm.toFixed(2) +
        'px out while at ' + Math.round(sAt.at * 100) + '% the seat is ' + sm.toFixed(2) + 'px out. Same endpoints, same duration, ' +
        'same colour — and the pop still LEAVES IN A LEAP while the seat CREEPS BACK. That is the more exciting animation, i.e. the ' +
        'verdict delivered by production values, and an endpoint-only gate certifies it (it did).');
      ok(Math.abs(pAt.opacity - sAt.opacity) <= 0.04,
        '⭐ MID-FLIGHT THE POP AND THE SEAT ARE DIFFERENT STRENGTHS — ' + pAt.opacity.toFixed(3) + ' against ' + sAt.opacity.toFixed(3));
    }
    /* and it must actually be moving in the middle, or all six of the
       comparisons above are between two zeroes */
    ok(mag(parseXform(P.scrub[1].transform)) > 1, 'non-vacuity: the pop is not displaced at mid-flight, so the mirror check is vacuous');
  }

  /* ---- AND NO HUE ---------------------------------------------- */
  ok(!!P.stroke && P.stroke !== 'none', 'the popping tag has no stroke colour to compare');
  ok(P.stroke === S.stroke,
    '⭐⭐ THE POP AND THE SEAT ARE DIFFERENT COLOURS (' + P.stroke + ' vs ' + S.stroke + ') — the refuse-list forbids a hue encoding anything, and this is a verdict delivered by hue');

  return { pass, fails };
}

/* ---------------------------------------------------------------- */
(async function () {
  const srv = http.createServer((q, s) => {
    const f = path.join(ROOT, q.url.split('?')[0].replace(/^\/mini-tools/, ''));
    fs.readFile(f, (e, d) => {
      if (e) { s.writeHead(404); s.end(); }
      else { s.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' }); s.end(d); }
    });
  });
  await new Promise(r => srv.listen(PORT, r));

  const browser = await pup.launch({ headless: 'new', args: ['--no-sandbox'] });
  const run = async function (poison) {
    const p = await browser.newPage();
    await p.setViewport({ width: 900, height: 900 });
    const errs = [];
    p.on('pageerror', e => errs.push(String(e)));
    await p.goto('http://localhost:' + PORT + '/shape-stretcher.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));
    const rec = await p.evaluate(MEASURE, poison || '');
    await p.close();
    if (errs.length) rec.err = 'page error: ' + errs[0];
    return rec;
  };

  let exit = 0;

  if (argPoison === 'all') {
    /* ⭐ THE CONTROL RUNS FIRST. A poison suite with no control cannot
       distinguish "the gate catches everything" from "the gate fails on
       everything", which is how a correct tool gets condemned. */
    const ctrl = judge(await run(''), 'control');
    console.log('control       ' + (ctrl.fails.length ? 'FAIL' : 'PASS') + '  ' + ctrl.pass + ' assertions');
    ctrl.fails.forEach(f => console.log('    x ' + f));
    if (ctrl.fails.length) { exit = 1; console.log('  ⚠⚠ THE CONTROL FAILED — the gate is condemning a correct tool, so no poison result below means anything'); }

    for (const pz of POISONS) {
      const r = judge(await run(pz), 'poison:' + pz);
      const fired = r.fails.length > 0;
      console.log('poison ' + pz.padEnd(7) + (fired ? 'FIRED (good)' : '⚠⚠ SURVIVED') + '  ' + r.pass + ' assertions passed');
      if (fired) console.log('    -> ' + r.fails[0]);
      else exit = 1;
    }
  } else {
    const r = judge(await run(argPoison), argPoison ? 'poison:' + argPoison : 'measured');
    console.log('\n' + (r.fails.length ? 'FAIL' : 'PASS') + '  ' + r.pass + ' assertions, ' + r.fails.length + ' failures');
    r.fails.forEach(f => console.log('  x ' + f));
    if (r.fails.length) exit = 1;
  }

  await browser.close();
  srv.close();
  process.exit(exit);
})().catch(e => { console.error(e); process.exit(1); });
