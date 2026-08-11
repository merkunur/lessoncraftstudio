/* =====================================================================
   MODEL GATE — TOOL #57, THE SHAPE STRETCHER
   =====================================================================
   ⚠⚠ THE ORACLE IS RE-DERIVED FROM THE GEOMETRY, NOT READ OFF THE TOOL.
   #51 shipped five live model bugs under 16,626 assertions because the
   oracle carried the same misconceptions the code did, and #44 shipped a
   MIRRORED profile because both sides of the comparison shared an index
   convention and agreed perfectly.

   So nothing below asks the tool what a right angle is. It builds the
   shape from its own definition — a SAS pair, sides a = 120 + k and
   b = 120 - k with an included angle theta at the apex — measures the
   angle at every vertex with a dot product, and compares. That is what
   found the shipped defect: `cornerRight` had i = 1 and i = 2 the wrong
   way round, so at theta = 60, k = +40 the little square was drawn on
   the THIRTY DEGREE corner. `anyCornerRight` unions over i and is
   identical either way, so the TAG was right and only the MARK was
   wrong — invisible to any gate that checks tags.

   ⭐⭐ THE HEADLINE LAW (L1). `tags` takes a FORM; the POSE is an input
   to the renderer and to nothing else. Proved twice over:
     (a) by PARSING the source of tags / sidesAllEqual / anyCornerRight /
         cornerRight and requiring the identifier `rot` to be absent, and
     (b) by evaluating EVERY form against EVERY rotation of the dial's
         own ladder — 4,336,200 pairs — and requiring the tag state to be
         byte-identical.
   ⚠⚠ WITH THE MANDATORY NON-VACUITY CONTROL, because a `tags()` that
   returns a constant passes (b) perfectly and (a) trivially. So the same
   gate proves that crossing a detent DOES flip a tag, that the flip set
   is non-empty, and that all four tag states are reachable.

   ⭐⭐ AND THE DETENT SET IS RECOMPUTED INDEPENDENTLY (L2), never by
   calling `detentsFor` to check itself. A detent is a rung where a tag
   holds and an adjacent rung of the SAME ladder loses it. For the dial
   that set is empty — not by a special case, but because the pose is not
   part of a form, so every rung of the dial maps to the same form.

   This gate binds NO PORT and opens NO BROWSER: everything here is
   arithmetic, so the mutation harness can run it ~60 times inside a 30s
   timeout each. The pixel channel — is the mark drawn on the corner the
   eye sees as square, does rotation change the drawn size — is
   `probe-shape-stretcher.js`'s job, and it must be, because no amount of
   arithmetic can see it.

   Run: node scripts/verify-shape-stretcher.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

/* ⚠ ENV INDIRECTION: the mutation harness points this at a tmp copy. */
const DIR = process.env.SHP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'shape-stretcher.js');
const T = require(SRC);
const SOURCE = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const eq = (a, b, m) => ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));

/* strip comments before ANY source scan. #22's `.lcs-` ban matched a
   COMMENT twice running, because `[^'"]*` crosses newlines and an
   apostrophe in ordinary English opens a match. */
const decomment = s => s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');

/* ================================================================== */
/* L0 — THE SURFACE EXISTS AND IS REACHABLE FROM A GATE. */
ok(T && typeof T === 'object', 'L0 the tool did not export an object');
ok(T.GEO && typeof T.GEO === 'object',
  'L0 ⚠⚠ the tool does not export GEO — a model gate would have to reconstruct the constants it is supposed to check, and a gate that reimplements what it checks is testing a copy (#44)');
const G = T.GEO || {};

/* ⚠⚠ THE CONSTANT LIST IS READ OFF THE OBJECT, NOT HARD-CODED. A
   hand-written list silently stops covering anything added after it was
   written — the same disease as a completeness check that names a subset
   of the required fields and then CERTIFIES (#42). Three constants were
   added to this tool while this gate was being written; a derived list
   covered them the moment they appeared. The names below are the ones
   the DESIGN depends on, asserted as a floor on top. */
const NEEDED = Object.keys(G);
ok(NEEDED.length >= 18, 'L0 non-vacuity: GEO exposes only ' + NEEDED.length + ' constants — the list is implausibly short');
['TARGET_R', 'K_MAX', 'TH_MIN', 'TH_MAX', 'TH_STEP', 'ROT_STEP', 'MARK_MIN',
  'T_POP', 'T_SEAT', 'RM_F', 'RM_FLOOR', 'SND_POP', 'SND_SEAT', 'T_SND_DEBOUNCE'].forEach(function (k) {
    ok(NEEDED.indexOf(k) >= 0, 'L0 GEO no longer declares ' + k + ', which the design depends on');
  });
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' is not a number'));
['sideA', 'sideB', 'sidesAllEqual', 'cornerRight', 'anyCornerRight', 'tags', 'detentsFor',
  'legalTheta', 'newState', 'form', 'setLen', 'setSkew', 'setRot', 'keep', 'drop', 'verts', '_formAt', '_range']
  .forEach(k => ok(typeof T[k] === 'function', 'L0 the model surface is missing ' + k + '()'));
ok(!T.tasks, 'L0 the tool declares `tasks` — a free-play instrument must not, or the shell renders activity chrome and a CCSS collision becomes possible');
eq(T.id, 'shape-stretcher', 'L0 the tool id does not match its filename');
eq(T.premium, false, 'L0 ⚠ the apparatus itself is not free');
ok(Array.isArray(T.settings) && T.settings.length === 1, 'L0 the sides setting is not declared');

/* the three ladders, as the CONTROLS see them. Everything below sweeps
   these, so they are asserted before anything uses them. */
const LEN = { lo: -G.K_MAX, hi: G.K_MAX, step: 1 };
const SKEW = { lo: G.TH_MIN, hi: G.TH_MAX, step: G.TH_STEP };
const TURN = { lo: 0, hi: 360 - G.ROT_STEP, step: G.ROT_STEP };
['len', 'skew', 'turn'].forEach(function (k, i) {
  const want = [LEN, SKEW, TURN][i], got = T._range(k);
  eq(got.lo, want.lo, 'L0 _range("' + k + '").lo');
  eq(got.hi, want.hi, 'L0 _range("' + k + '").hi');
  eq(got.step, want.step, 'L0 _range("' + k + '").step');
});

const FORMS = [];
for (const n of [3, 4]) {
  for (let k = LEN.lo; k <= LEN.hi; k += LEN.step) {
    for (let th = SKEW.lo; th <= SKEW.hi; th += SKEW.step) FORMS.push({ n: n, k: k, theta: th });
  }
}
const ROTS = [];
for (let r = TURN.lo; r <= TURN.hi; r += TURN.step) ROTS.push(r);
ok(FORMS.length > 20000, 'L0 non-vacuity: the form space holds only ' + FORMS.length + ' forms');
ok(ROTS.length === 180, 'L0 non-vacuity: the rotation ladder holds ' + ROTS.length + ' rungs, not 180');

/* ================================================================== */
/* ⭐⭐ L1 — TILT ANYTHING AND NOTHING POPS. Both halves, plus the
   control that makes the first half mean anything. */
{
  /* ---- (a) THE SOURCE OF EVERY PREDICATE IS FREE OF `rot` ---------- */
  const PRED = ['tags', 'sidesAllEqual', 'anyCornerRight', 'cornerRight'];
  PRED.forEach(function (fn) {
    const body = decomment(String(T[fn]));
    /* NON-VACUITY FIRST: a scan of an empty string finds nothing and
       reports success. #40's production gate compared two EMPTY
       NodeLists and would have passed on a tool with no tapes at all. */
    ok(body.length > 30, 'L1 non-vacuity: the source of ' + fn + '() is ' + body.length +
      ' chars after comment-stripping — the scan below would find nothing in it');
    ok(/\bf\b/.test(body), 'L1 non-vacuity: the source of ' + fn + '() never mentions the form it is given');
    ok(!/\brot\b/.test(body),
      'L1 ⭐⭐ THE IDENTIFIER `rot` OCCURS IN ' + fn + '() — the pose has reached a predicate, and "tilt anything and nothing pops" stops being structural');
  });
  /* poison the scanner in BOTH directions, or it is a ban nobody has
     watched fire (§23.6, bought three times over) */
  ok(/\brot\b/.test(decomment('function (f) { return f.rot === 0; }')),
    'L1 poison: the rot scan failed to fire on a function that plainly reads the pose');
  ok(!/\brot\b/.test(decomment('function (f) { /* rot is not read here */ return f.k === 0; }')),
    'L1 poison: the rot scan read a COMMENT as code');
  ok(/\brot\b/.test('var rot = 1;'), 'L1 poison: the word-boundary form failed on a bare identifier');
  ok(!/\brot\b/.test('var rotation = 1;'), 'L1 poison: the rot scan fired inside "rotation"');

  /* ---- (b) EVERY FORM AGAINST EVERY ROTATION ----------------------- */
  let pairs = 0, disagreed = 0, firstBad = null;
  FORMS.forEach(function (f) {
    const base = T.tags(f);
    ROTS.forEach(function (r) {
      pairs++;
      /* ⚠ the ROTATION IS CARRIED IN THE INPUT. Passing a bare form
         could not catch a predicate that reads `f.rot`; passing the
         POSED state is the hostile input the renderer actually holds. */
      const t = T.tags({ n: f.n, k: f.k, theta: f.theta, rot: r });
      if (t.equal !== base.equal || t.right !== base.right) {
        disagreed++;
        if (!firstBad) firstBad = JSON.stringify(f) + ' at rot ' + r;
      }
    });
  });
  pass += pairs - disagreed;
  ok(pairs > 4000000, 'L1 non-vacuity: only ' + pairs + ' (form, rotation) pairs were evaluated');
  eq(disagreed, 0, 'L1 ⭐⭐ THE TAGS MOVED UNDER A ROTATION at ' + disagreed +
    ' pairs (first: ' + firstBad + ') — the whole tool is the claim that they cannot');

  /* ---- ⚠⚠ (c) THE MANDATORY NON-VACUITY CONTROL -------------------
     A tags() returning a constant passes (a) and (b) perfectly. So:
     the tags must MOVE, all four states must be reachable, and crossing
     a detent must be what moves them. */
  const seen = {};
  let equalTrue = 0, rightTrue = 0;
  FORMS.forEach(function (f) {
    const t = T.tags(f);
    seen[(t.equal ? 'E' : 'e') + (t.right ? 'R' : 'r')] = (seen[(t.equal ? 'E' : 'e') + (t.right ? 'R' : 'r')] || 0) + 1;
    if (t.equal) equalTrue++;
    if (t.right) rightTrue++;
  });
  ['ER', 'Er', 'eR', 'er'].forEach(function (s) {
    ok(seen[s] > 0, 'L1 ⚠⚠ NON-VACUITY: the tag state "' + s + '" is unreachable in the whole space — tags() is closer to a constant than to a predicate');
  });
  ok(equalTrue > 0 && equalTrue < FORMS.length, 'L1 non-vacuity: the equal tag is constant across the space (' + equalTrue + ' of ' + FORMS.length + ')');
  ok(rightTrue > 0 && rightTrue < FORMS.length, 'L1 non-vacuity: the right tag is constant across the space (' + rightTrue + ' of ' + FORMS.length + ')');
  console.log('  L1: ' + pairs.toLocaleString() + ' (form, rotation) pairs; tag states ' +
    JSON.stringify(seen) + '; 0 moved under a rotation');
}

/* ================================================================== */
/* ⭐⭐ L2 — THE DETENT SET, RECOMPUTED INDEPENDENTLY.
   `detentsFor` is never called to check itself. The oracle below is the
   DEFINITION — a rung where a tag holds and an adjacent rung of the same
   ladder loses it — walked over the control's own ladder. */
{
  const ladder = tr => (tr === 'len' ? LEN : tr === 'skew' ? SKEW : TURN);
  /* ⚠ the oracle builds the form ITSELF rather than calling _formAt, so
     a mutation of _formAt cannot move both sides together */
  const at = (tr, f, v) => ({
    n: f.n,
    k: tr === 'len' ? v : f.k,
    theta: tr === 'skew' ? v : f.theta
  });
  const flipSet = function (tr, f) {
    const L = ladder(tr), out = [];
    for (let v = L.lo; v <= L.hi; v += L.step) {
      const here = T.tags(at(tr, f, v));
      if (!here.equal && !here.right) continue;
      for (const u of [v - L.step, v + L.step]) {
        if (u < L.lo || u > L.hi) continue;
        const there = T.tags(at(tr, f, u));
        if ((here.equal && !there.equal) || (here.right && !there.right)) { out.push(v); break; }
      }
    }
    return out;
  };
  /* poison the oracle in both directions before trusting it */
  ok(flipSet('len', { n: 4, k: 5, theta: 50 }).join() === '0',
    'L2 poison: the oracle does not find the one rung where a square becomes a rhombus');
  ok(flipSet('turn', { n: 4, k: 0, theta: 90 }).length === 0,
    'L2 poison: the oracle invented a detent on the dial');
  ok(flipSet('skew', { n: 4, k: 5, theta: 50 }).join() === '90',
    'L2 poison: the oracle does not find the one rung where the corners go square');

  /* ⭐⭐ (a) THE DIAL HAS NO NOTCHES, FOR EVERY FORM IN THE SPACE.
     ⚠ A home notch at rot = 0 would assert that upright is special,
     which is the misconception the tool exists to attack. */
  let dialNotches = 0, dialBad = null;
  FORMS.forEach(function (f) {
    const d = T.detentsFor('turn', f);
    if (!Array.isArray(d)) { fails.push('L2 detentsFor("turn") did not return an array'); return; }
    if (d.length) { dialNotches += d.length; if (!dialBad) dialBad = JSON.stringify(f) + ' -> ' + JSON.stringify(d); }
  });
  pass += FORMS.length - (dialBad ? 1 : 0);
  eq(dialNotches, 0, 'L2 ⭐⭐ THE DIAL CARRIES ' + dialNotches + ' NOTCHES (e.g. ' + dialBad +
    ') — the apparatus is asserting in its own furniture that some rotation is special');

  /* (b) and the emptiness is BY CONSTRUCTION: the rung is discarded, so
     every rung of the dial maps to the SAME form */
  const probe = { n: 4, k: 17, theta: 44 };
  ROTS.forEach(function (r) {
    const f2 = T._formAt('turn', probe, r);
    ok(f2.n === probe.n && f2.k === probe.k && f2.theta === probe.theta,
      'L2 ⚠⚠ _formAt("turn") let the rung into the form at rot ' + r + ' — the empty detent set would then be a special case, not a theorem');
  });
  eq(T._formAt('len', probe, -9).k, -9, 'L2 _formAt("len") ignored its rung');
  eq(T._formAt('skew', probe, 96).theta, 96, 'L2 _formAt("skew") ignored its rung');
  eq(T._formAt('len', probe, -9).theta, probe.theta, 'L2 _formAt("len") moved theta as well');
  eq(T._formAt('skew', probe, 96).k, probe.k, 'L2 _formAt("skew") moved k as well');

  /* ⭐ (c) len AND skew ARE EXACTLY THE FLIP SETS — over the whole space */
  let compared = 0, mismatched = 0, firstMM = null, totalNotches = 0, formsWithNotches = 0;
  FORMS.forEach(function (f) {
    ['len', 'skew'].forEach(function (tr) {
      compared++;
      const got = T.detentsFor(tr, f).join(','), want = flipSet(tr, f).join(',');
      if (got === want) { totalNotches += got ? got.split(',').length : 0; if (got) formsWithNotches++; return; }
      mismatched++;
      if (!firstMM) firstMM = tr + ' at ' + JSON.stringify(f) + ': tool [' + got + '] vs flip set [' + want + ']';
    });
  });
  pass += compared - mismatched;
  ok(compared > 40000, 'L2 non-vacuity: only ' + compared + ' (form, track) pairs were compared');
  eq(mismatched, 0, 'L2 ⭐⭐ ' + mismatched + ' (form, track) pairs disagree with the flip set (first: ' + firstMM + ')');
  /* ⚠⚠ AND THE FLIP SETS ARE NOT ALL EMPTY. Without this the block above
     passes on a tool whose rails carry no notches anywhere — which is
     the same vacuity trap as (b) in L1, one layer down. */
  ok(totalNotches > 500, 'L2 ⚠⚠ non-vacuity: only ' + totalNotches +
    ' notches exist in the entire space — the detent comparison is comparing empty lists');
  ok(formsWithNotches > 2000, 'L2 non-vacuity: only ' + formsWithNotches + ' forms carry any notch at all');

  /* ⭐ (d) CROSSING A DETENT REALLY DOES FLIP A TAG — stated as its own
     assertion rather than inherited from the oracle's definition. */
  let crossings = 0;
  [{ n: 4, k: 5, theta: 50 }, { n: 4, k: 0, theta: 90 }, { n: 3, k: 0, theta: 60 },
  { n: 3, k: 40, theta: 60 }, { n: 3, k: 5, theta: 90 }].forEach(function (f) {
    ['len', 'skew'].forEach(function (tr) {
      const L = ladder(tr);
      T.detentsFor(tr, f).forEach(function (v) {
        const here = T.tags(at(tr, f, v));
        let flipped = false;
        [v - L.step, v + L.step].forEach(function (u) {
          if (u < L.lo || u > L.hi) return;
          const there = T.tags(at(tr, f, u));
          if (here.equal !== there.equal || here.right !== there.right) flipped = true;
        });
        crossings++;
        ok(flipped, 'L2 ⚠⚠ the ' + tr + ' rail carries a notch at ' + v + ' for ' + JSON.stringify(f) +
          ' where crossing flips NOTHING — a notch is a promise about identity');
      });
    });
  });
  ok(crossings >= 8, 'L2 non-vacuity: only ' + crossings + ' detent crossings were exercised');
  console.log('  L2: dial notches 0 across ' + FORMS.length.toLocaleString() + ' forms; ' +
    totalNotches.toLocaleString() + ' notches on the two ladders, all of them flip a tag');
}

/* ================================================================== */
/* ⭐⭐ L3 — THE CORNERS, RE-DERIVED FROM THE GEOMETRY, PER INDEX.
   This is the block that found the shipped defect. It never asks the
   tool what a right angle is. */
{
  /* the DEFINITION of the shape: a SAS pair at the apex. */
  const build = function (f) {
    const a = 120 + f.k, b = 120 - f.k, th = f.theta * Math.PI / 180;
    if (f.n === 4) {
      return [[0, 0], [a, 0], [a + b * Math.cos(th), b * Math.sin(th)], [b * Math.cos(th), b * Math.sin(th)]];
    }
    return [[0, 0], [a, 0], [b * Math.cos(th), b * Math.sin(th)]];
  };
  const angleAt = function (pts, i) {
    const n = pts.length, p = pts[(i - 1 + n) % n], q = pts[i], r = pts[(i + 1) % n];
    const u = [p[0] - q[0], p[1] - q[1]], v = [r[0] - q[0], r[1] - q[1]];
    const du = Math.hypot(u[0], u[1]), dv = Math.hypot(v[0], v[1]);
    return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (du * dv)))) * 180 / Math.PI;
  };
  /* poison the oracle, both directions, on shapes whose angles are known
     without any of this machinery */
  ok(Math.abs(angleAt(build({ n: 4, k: 0, theta: 90 }), 0) - 90) < 1e-9, 'L3 poison: the oracle does not read a square corner as 90');
  ok(Math.abs(angleAt(build({ n: 4, k: 0, theta: 60 }), 0) - 60) < 1e-9, 'L3 poison: the oracle does not read a 60 degree corner as 60');
  ok(Math.abs(angleAt(build({ n: 3, k: 40, theta: 60 }), 1) - 30) < 1e-9, 'L3 poison: the oracle does not read the 30 degree corner of a 30-60-90');
  ok(Math.abs(angleAt(build({ n: 3, k: 40, theta: 60 }), 2) - 90) > 1e-9 === false,
    'L3 poison: the oracle does not read the right angle of a 30-60-90');

  /* ⭐⭐ (a) EVERY CORNER OF EVERY FORM, BY INDEX. */
  let corners = 0, wrong = 0, firstWrong = null, marked = 0;
  FORMS.forEach(function (f) {
    const pts = build(f), c = f.n === 4 ? 4 : 3;
    for (let i = 0; i < c; i++) {
      corners++;
      const want = Math.abs(angleAt(pts, i) - 90) < 1e-9;
      const got = !!T.cornerRight(f, i);
      if (want) marked++;
      if (want !== got) {
        wrong++;
        if (!firstWrong) firstWrong = JSON.stringify(f) + ' corner ' + i + ': the tool says ' + got +
          ' and the corner measures ' + angleAt(pts, i).toFixed(4) + ' degrees';
      }
    }
  });
  pass += corners - wrong;
  ok(corners > 80000, 'L3 non-vacuity: only ' + corners + ' corners were measured');
  ok(marked > 100 && marked < corners / 10,
    'L3 non-vacuity: ' + marked + ' of ' + corners + ' corners are right angles — the oracle is degenerate');
  eq(wrong, 0, 'L3 ⭐⭐ THE LITTLE SQUARE IS DRAWN ON THE WRONG CORNER at ' + wrong +
    ' (form, corner) pairs (first: ' + firstWrong + ')');

  /* ⭐ (b) THE RENDERER KEEPS BOTH THE ANGLES AND THE INDICES. The mark
     is placed at vertex i of `verts`, so if `verts` reordered or sheared
     the shape the mark would move even with cornerRight correct. */
  let vchecked = 0, vbad = 0;
  [{ n: 4, k: 0, theta: 90 }, { n: 4, k: 40, theta: 55 }, { n: 3, k: 40, theta: 60 },
  { n: 3, k: -40, theta: 60 }, { n: 3, k: -70, theta: 130 }, { n: 4, k: 82, theta: 18 }].forEach(function (f) {
    const modelPts = build(f), c = f.n === 4 ? 4 : 3;
    [0, 2, 44, 90, 178, 270, 358].forEach(function (r) {
      const v = T.verts(f, r);
      if (v.length !== c) { vbad++; fails.push('L3 verts() returned ' + v.length + ' points for an n=' + f.n + ' form'); return; }
      for (let i = 0; i < c; i++) {
        vchecked++;
        if (Math.abs(angleAt(v, i) - angleAt(modelPts, i)) > 1e-6) {
          vbad++;
          fails.push('L3 ⭐⭐ verts() moved corner ' + i + ' of ' + JSON.stringify(f) + ' at rot ' + r +
            ': the drawn corner measures ' + angleAt(v, i).toFixed(4) + ' and the form says ' + angleAt(modelPts, i).toFixed(4));
        }
      }
    });
  });
  pass += vchecked - vbad;
  ok(vchecked > 100, 'L3 non-vacuity: only ' + vchecked + ' drawn corners were compared against the form');

  /* ⭐ (c) THE 30-60-90 CLAIM, COUNTED.
     ⚠ THE CLAIM IS ABOUT THE **BASE** CORNERS. The apex is right
     whenever theta = 90 — a right triangle, but not a 30-60-90 — so
     stating the claim over ALL corners would be false by 165 states and
     stating it over the base corners is exactly true by two. */
  const base = [];
  FORMS.filter(f => f.n === 3).forEach(function (f) {
    const pts = build(f);
    [1, 2].forEach(function (i) {
      if (Math.abs(angleAt(pts, i) - 90) < 1e-9) base.push(f.k + '/' + f.theta + '/' + i);
    });
  });
  eq(base.length, 2, 'L3 ⭐ the whole space holds ' + base.length + ' triangles with a RIGHT BASE ANGLE, not two');
  eq(base.sort().join(' '), '-40/60/1 40/60/2',
    'L3 ⭐ the two base-right states are not k = -40 at corner 1 and k = +40 at corner 2');
  [[40, 2], [-40, 1]].forEach(function (pr) {
    const f = { n: 3, k: pr[0], theta: 60 }, pts = build(f);
    const angs = [0, 1, 2].map(i => Math.round(angleAt(pts, i))).sort((a, b) => a - b);
    eq(angs.join(','), '30,60,90', 'L3 ⭐ the k = ' + pr[0] + ' triangle is not a 30-60-90');
    ok(T.cornerRight(f, pr[1]), 'L3 the tool does not mark corner ' + pr[1] + ' of the k = ' + pr[0] + ' triangle');
    [0, 1, 2].filter(i => i !== pr[1]).forEach(function (i) {
      ok(!T.cornerRight(f, i), 'L3 ⭐⭐ the tool ALSO marks corner ' + i + ' of the k = ' + pr[0] +
        ' triangle, which measures ' + angleAt(pts, i).toFixed(1) + ' degrees');
    });
  });
  /* and the apex family, stated separately so neither claim launders the other */
  const apex = FORMS.filter(f => f.n === 3 && Math.abs(angleAt(build(f), 0) - 90) < 1e-9);
  eq(apex.length, LEN.hi - LEN.lo + 1, 'L3 the apex is right at ' + apex.length + ' triangle states, not at every k with theta = 90');
  ok(apex.every(f => f.theta === 90), 'L3 the apex is right at a theta other than 90');

  /* (d) the quadrilateral is all four or none — it is a parallelogram */
  let quads = 0;
  FORMS.filter(f => f.n === 4).forEach(function (f) {
    const c = [0, 1, 2, 3].map(i => !!T.cornerRight(f, i));
    quads++;
    ok(c.every(x => x === c[0]), 'L3 ⚠ the parallelogram ' + JSON.stringify(f) + ' has SOME square corners — a parallelogram has four or none');
    ok(c[0] === (f.theta === 90), 'L3 the parallelogram ' + JSON.stringify(f) + ' is square-cornered iff theta is 90');
  });
  ok(quads > 10000, 'L3 non-vacuity: only ' + quads + ' parallelograms were checked');

  /* (e) anyCornerRight is the union, and it is what the tag reads */
  let unionChecked = 0;
  FORMS.forEach(function (f) {
    const c = f.n === 4 ? 4 : 3;
    let want = false;
    for (let i = 0; i < c; i++) if (T.cornerRight(f, i)) want = true;
    unionChecked++;
    if (!!T.anyCornerRight(f) !== want) fails.push('L3 anyCornerRight disagrees with its own corners at ' + JSON.stringify(f));
    else pass++;
    if (T.tags(f).right !== want) fails.push('L3 the right TAG is not anyCornerRight at ' + JSON.stringify(f));
    else pass++;
  });
  ok(unionChecked === FORMS.length, 'L3 non-vacuity: the union check skipped forms');

  /* ⭐ (f) THE MARK FITS IN THE CORNER IT MARKS, wherever it is drawn.
     ⚠ MEASURED, NOT ASSUMED, AND SCOPED TO WHERE THE MARK EXISTS. My
     first pass swept the shortest side over the WHOLE space, found
     21.2px, and nearly filed the design's own "23.0px / 35%" derivation
     as unreproducible — at 21.2px (theta = 162) no mark is drawn at all.
     Scoped to the 827 corners that ARE marked it reproduces exactly. */
  let worstRatio = 0, worstAt = null, minLeg = Infinity, minSide = Infinity, drawnMarks = 0;
  FORMS.forEach(function (f) {
    const v = T.verts(f, 0), c = f.n === 4 ? 4 : 3;
    for (let i = 0; i < c; i++) {
      if (!T.cornerRight(f, i)) continue;
      drawnMarks++;
      const q = v[i], pv = v[(i - 1 + v.length) % v.length], nv = v[(i + 1) % v.length];
      const l1 = Math.hypot(pv[0] - q[0], pv[1] - q[1]), l2 = Math.hypot(nv[0] - q[0], nv[1] - q[1]);
      const short = Math.min(l1, l2);
      const leg = Math.min(14, Math.max(G.MARK_MIN, short * 0.22));
      minLeg = Math.min(minLeg, leg);
      minSide = Math.min(minSide, short);
      if (leg / short > worstRatio) { worstRatio = leg / short; worstAt = JSON.stringify(f) + ' corner ' + i; }
    }
  });
  ok(drawnMarks > 500, 'L3 non-vacuity: only ' + drawnMarks + ' right-angle marks are drawn anywhere in the space');
  ok(worstRatio <= 0.5, 'L3 ⚠⚠ a right-angle mark spans ' + (worstRatio * 100).toFixed(1) +
    '% of the side it sits on at ' + worstAt + ' — the L stops sitting INSIDE the corner');
  ok(worstRatio <= 0.35, 'L3 ⭐ the worst mark-to-side ratio is ' + (worstRatio * 100).toFixed(1) +
    '%, over the 35% the design derived K_MAX = ' + G.K_MAX + ' from');
  eq(minLeg, G.MARK_MIN, 'L3 MARK_MIN never binds — the smallest leg ever drawn is ' + minLeg.toFixed(2) + 'px');
  console.log('  L3: ' + corners.toLocaleString() + ' corners re-derived; ' + drawnMarks +
    ' marks drawn, shortest marked side ' + minSide.toFixed(2) + 'px, worst leg ratio ' +
    (worstRatio * 100).toFixed(1) + '%');
}

/* ================================================================== */
/* L4 — EVERY SIDE THE SAME LENGTH, RE-DERIVED FROM THE SIDE LENGTHS.
   The tool says `k === 0` (and, for a triangle, theta === 60). This
   block never reads that: it measures the three or four drawn sides. */
{
  const sidesOf = function (f) {
    const v = T.verts(f, 0), out = [];
    for (let i = 0; i < v.length; i++) {
      const w = v[(i + 1) % v.length];
      out.push(Math.hypot(w[0] - v[i][0], w[1] - v[i][1]));
    }
    return out;
  };
  ok(Math.abs(Math.max.apply(null, sidesOf({ n: 4, k: 0, theta: 90 })) - Math.min.apply(null, sidesOf({ n: 4, k: 0, theta: 90 }))) < 1e-9,
    'L4 poison: the side oracle cannot see that a square is equilateral');
  ok(Math.max.apply(null, sidesOf({ n: 4, k: 9, theta: 90 })) - Math.min.apply(null, sidesOf({ n: 4, k: 9, theta: 90 })) > 1,
    'L4 poison: the side oracle cannot see that a stretched rectangle is not');

  let checked = 0, bad = 0, equalCount = 0;
  FORMS.forEach(function (f) {
    const s = sidesOf(f);
    const want = (Math.max.apply(null, s) - Math.min.apply(null, s)) < 1e-9;
    const got = !!T.sidesAllEqual(f);
    checked++;
    if (want) equalCount++;
    if (want !== got) { bad++; fails.push('L4 sidesAllEqual(' + JSON.stringify(f) + ') = ' + got + ', and the drawn sides say ' + want + ' (' + s.map(x => x.toFixed(2)).join('/') + ')'); }
  });
  pass += checked - bad;
  eq(bad, 0, 'L4 ⭐ the equal-sides tag disagrees with the measured sides at ' + bad + ' forms');
  /* ⚠ AND IT IS NOT A CONSTANT: rhombi and equilateral triangles exist,
     and they are rare — one rhombus per rung of the lean ladder, plus
     the single equilateral triangle at 60.
     ⚠⚠ MY FIRST VERSION WROTE `SKEW.hi === 162 ? 74 : equalCount`, which
     is a conditional that CANNOT FAIL — it excused itself the moment the
     ladder moved, and a mutation of TH_MAX walked straight through it.
     The count is derived from the ladder instead. */
  const rungs = (SKEW.hi - SKEW.lo) / SKEW.step + 1;
  eq(equalCount, rungs + (T.legalTheta(60) ? 1 : 0),
    'L4 ⭐ ' + equalCount + ' forms in the whole space have all sides equal — expected one rhombus per lean rung plus one equilateral triangle');
  ok(T.sidesAllEqual({ n: 3, k: 0, theta: 60 }), 'L4 the equilateral triangle is not tagged');
  ok(!T.sidesAllEqual({ n: 3, k: 0, theta: 62 }), 'L4 ⚠ a k = 0 triangle at theta = 62 is tagged equilateral — two equal sides is not three');
  ok(T.sidesAllEqual({ n: 4, k: 0, theta: 44 }), 'L4 a k = 0 parallelogram is a rhombus and is not tagged');
  eq(T.sideA({ k: 0 }), T.sideB({ k: 0 }), 'L4 the two given sides are not equal at k = 0');
  eq(T.sideA({ k: 7 }) + T.sideB({ k: 7 }), 240, 'L4 the two given sides do not sum to a constant');
}

/* ================================================================== */
/* L5 — THE DEAL. ⭐ THE TOOL NEVER OPENS ON AN UPRIGHT SHAPE. */
{
  let worstOff = 1e9, deals = 0, illegal = 0;
  const seenN = {}, seenRot = {};
  for (let i = 0; i < 10000; i++) {
    const s = T.newState(i % 2 ? 'four' : 'three');
    deals++;
    seenN[s.n] = 1; seenRot[s.rot] = 1;
    const off = Math.min.apply(null, [0, 90, 180, 270, 360].map(c => Math.abs(s.rot - c)));
    if (off < worstOff) worstOff = off;
    if (s.k !== Math.round(s.k) || s.k < LEN.lo || s.k > LEN.hi) illegal++;
    if (!T.legalTheta(s.theta)) illegal++;
    if (s.rot % G.ROT_STEP !== 0 || s.rot < 0 || s.rot >= 360) illegal++;
    if (s.kept !== null) illegal++;
  }
  eq(deals, 10000, 'L5 non-vacuity: the deal loop ran ' + deals + ' times');
  ok(Object.keys(seenRot).length > 5, 'L5 non-vacuity: 10,000 deals produced only ' + Object.keys(seenRot).length + ' distinct poses');
  eq(illegal, 0, 'L5 ' + illegal + ' dealt states were outside the ladders the controls can reach');
  ok(worstOff >= 22, 'L5 ⭐⭐ a deal landed ' + worstOff +
    ' degrees from an upright pose — the tool must never open on a canonical shape, which is the misconception itself');
  eq(Object.keys(seenN).sort().join(','), '3,4', 'L5 the sides setting does not reach both shapes');
  /* determinism through the injected picker, so the deal is testable */
  const a = T.newState('four', () => 0), b2 = T.newState('four', () => 0);
  eq(JSON.stringify(a), JSON.stringify(b2), 'L5 the deal is not a pure function of its picker');
  eq(T.newState('four', () => 0).k, -G.K_MAX, 'L5 the picker floor does not reach the end of the stretch ladder');
  eq(T.newState('four', () => 0.999999).k, G.K_MAX, 'L5 the picker ceiling does not reach the end of the stretch ladder');
  /* legalTheta is the lattice, not just the interval */
  /* ⭐⭐ THE LEAN LADDER'S ENDS ARE ASSERTED, NOT READ. Every sweep above
     derives its ladder from GEO, so a mutation of TH_MAX moves the tool
     AND the oracle together and nothing notices — the #44 shared-
     convention trap, in my own gate. The law is structural: the ladder
     is SYMMETRIC ABOUT THE SQUARE (theta and 180 - theta are mirror
     images of the same parallelogram, so an asymmetric ladder lets the
     class lean further one way than the other, in an instrument whose
     whole subject is a lean), and it must LAND ON the two values every
     detent in the tool depends on. */
  eq(G.TH_MIN + G.TH_MAX, 180, 'L5 ⭐⭐ the lean ladder is not symmetric about the square — ' +
    G.TH_MIN + ' to ' + G.TH_MAX + ' leans further one way than the other');
  ok(T.legalTheta(90), 'L5 ⭐⭐ the lean ladder does not land on 90 — the square-corner detent is unreachable');
  ok(T.legalTheta(60), 'L5 ⭐⭐ the lean ladder does not land on 60 — the equilateral triangle and both 30-60-90s are unreachable');
  ok((G.TH_MAX - G.TH_MIN) / G.TH_STEP + 1 >= 60, 'L5 the lean ladder has only ' +
    ((G.TH_MAX - G.TH_MIN) / G.TH_STEP + 1) + ' rungs — a drag would jump the shape');
  ok(T.legalTheta(G.TH_MIN) && T.legalTheta(G.TH_MAX), 'L5 the ends of the lean ladder are not legal');
  ok(!T.legalTheta(G.TH_MIN - G.TH_STEP) && !T.legalTheta(G.TH_MAX + G.TH_STEP), 'L5 the lean ladder has no ends');
  ok(!T.legalTheta(G.TH_MIN + 1), 'L5 ⚠ a rung between the lean ladder\'s rungs is legal — the pointer and the keyboard would address different state spaces');
  ok(!T.legalTheta(60.5) && !T.legalTheta(NaN), 'L5 a fractional lean is legal');
  /* ⭐⭐ THE RING HAS NO ENDS, SO HOME AND END HAVE NOWHERE TO GO. Landing
     them anywhere means choosing a rung, and the only rung anyone would
     choose is 0 — which asserts that upright is special, i.e. the
     misconception itself, already forbidden as a home notch. */
  {
    const held = { n: 4, k: 3, theta: 40, rot: 66, kept: null };
    const saved = T.st, api = T.api;
    T.st = held;
    T.api = { announce: function () { }, sound: function () { }, t: function (k) { return k; } };
    T._paint = function () { };
    ['lo', 'hi'].forEach(function (d) {
      T.st = held;
      T._step('turn', d);
      eq(T.st.rot, 66, 'L5 ⭐⭐ Home/End on the DIAL jumped to a rung — the ring has no ends, and choosing one asserts that some pose is special');
    });
    T.st = { n: 4, k: 3, theta: 40, rot: 66, kept: null };
    T._step('len', 'lo');
    eq(T.st.k, -G.K_MAX, 'L5 Home on the stretch rail does not reach the end of its ladder');
    T.st = { n: 4, k: 3, theta: 40, rot: 66, kept: null };
    T._step('skew', 'hi');
    eq(T.st.theta, G.TH_MAX, 'L5 End on the lean rail does not reach the end of its ladder');
    T.st = saved; T.api = api;
    delete T._paint;
  }
}

/* ================================================================== */
/* L6 — THE MOVES: ONE REFUSAL CHANNEL, AND NOTHING MUTATES ITS INPUT. */
{
  const st = { n: 4, k: 10, theta: 90, rot: 20, kept: null };
  const frozen = JSON.stringify(st);
  ok(T.setLen(st, 11) !== null, 'L6 a legal stretch was refused');
  ok(T.setLen(st, 10) === null, 'L6 ⚠ setting the stretch to where it already is returns a new state — a move that changes nothing is a refusal');
  ok(T.setLen(st, 10.5) === null, 'L6 a fractional stretch was accepted');
  ok(T.setLen(st, G.K_MAX + 1) === null, 'L6 a stretch past the end of the ladder was accepted');
  ok(T.setLen(st, -G.K_MAX - 1) === null, 'L6 a stretch past the other end was accepted');
  ok(T.setSkew(st, 92) !== null, 'L6 a legal lean was refused');
  ok(T.setSkew(st, 90) === null, 'L6 leaning to where it already leans is not a refusal');
  ok(T.setSkew(st, 91) === null, 'L6 a lean between the rungs was accepted');
  ok(T.setSkew(st, G.TH_MAX + G.TH_STEP) === null, 'L6 a lean past the end of the ladder was accepted');
  ok(T.setRot(st, 22) !== null, 'L6 a legal turn was refused');
  ok(T.setRot(st, 20) === null, 'L6 turning to where it already points is not a refusal');
  ok(T.setRot(st, 21) === null, 'L6 a turn between the rungs was accepted');
  ok(T.setRot(st, 1.5) === null, 'L6 a fractional turn was accepted');
  /* ⭐ the dial WRAPS, and negative degrees come back inside the circle */
  eq(T.setRot(st, 362).rot, 2, 'L6 the dial does not wrap past a full turn');
  eq(T.setRot(st, -2).rot, 358, 'L6 ⚠ a negative turn is not normalised back into the circle');
  /* ⚠ -340 ≡ +20 (mod 360), not -380. My first version wrote -360-20 and
     reported a defect in a correct tool: a wrong measurement wearing the
     costume of a defect, in the assertion written to check normalisation. */
  eq(T.setRot(st, -340), null, 'L6 a turn that normalises onto the current pose is not a refusal');
  eq(T.setRot(st, -380).rot, 340, 'L6 the dial does not normalise a negative multi-turn value');
  eq(T.setRot(st, 720 + 40).rot, 40, 'L6 the dial does not normalise a multi-turn value');
  /* keep / drop, and the one-at-a-time law */
  const kept = T.keep(st);
  ok(kept && kept.kept && kept.kept.k === st.k && kept.kept.rot === st.rot,
    'L6 ⭐⭐ keeping a shape did not put a COPY of it on the pane — the simultaneous array is the whole pedagogy');
  ok(T.keep(kept) === null, 'L6 ⚠ a second shape can be kept — the pane holds the one in your hand and the one you kept, and nothing else');
  ok(T.drop(kept) !== null && T.drop(kept).kept === null, 'L6 the kept shape cannot be put away');
  ok(T.drop(st) === null, 'L6 ⚠ putting away a shape that is not there is not a refusal');
  /* ⭐ THE KEPT SHAPE IS A SNAPSHOT, NOT A REFERENCE. */
  const moved = T.setLen(kept, kept.k + 5);
  ok(moved.kept && moved.kept.k === st.k,
    'L6 ⭐⭐ moving the live shape moved THE KEPT ONE TOO — then there is one shape on the pane, not two, and the comparison the tool exists for cannot be made');
  eq(JSON.stringify(st), frozen, 'L6 ⚠ a move MUTATED the state it was given');
  /* totality. ⚠ `typeof _st(x) === "object"` passes on `return st;` as
     happily as on `return st || this.st;` — a wrong measurement that let
     a real mutation through. The law is the FALLBACK: every control
     calls these with null and expects the held state. */
  /* ⭐⭐ `_fmt` MUST HAVE A CALL SITE OR BE ABSENT — never declared and
     uncalled. Striking the banned degree numeral from the shape labels
     took the substituter's only consumer with it, and the tool deleted
     the function rather than leave a `hintTurn`. ⚠ The deletion also
     converts a LOUD failure into a SILENT one: while `_fmt` existed a
     locale still shipping `{rot}` rendered a number; with it gone the
     same locale renders literal braces to a screen reader. So both the
     function AND the placeholder are gated, and the token check below is
     what covers the case this deletion opened. */
  {
    const called = /this\._fmt\(/.test(decomment(SOURCE));
    const declared = typeof T._fmt === 'function';
    ok(declared === called,
      'L6 ⚠⚠ _fmt is ' + (declared ? 'DECLARED AND NEVER CALLED — a function with no consumer is a claim the machine does not make'
        : 'CALLED AND NOT DECLARED — the paint would throw on its first substitution'));
    /* poison, both directions, on synthetic sources */
    ok(/this\._fmt\(/.test('x = this._fmt(a, b);'), 'L6 poison: the _fmt call-site scan failed to fire');
    ok(!/this\._fmt\(/.test('/* this._fmt( is only mentioned */'.replace(/\/\*[\s\S]*?\*\//g, ' ')),
      'L6 poison: the _fmt call-site scan read a COMMENT as a call');
    if (declared) {
      eq(T._fmt('turned {rot}, {nope}', { rot: 44 }), 'turned 44, {nope}', 'L6 _fmt does not substitute what it is given');
    }
  }
  eq(T._st({ n: 1 }).n, 1, 'L6 _st does not return what it is given');
  {
    const held = { n: 4, k: 3, theta: 40, rot: 6, kept: null };
    const saved = T.st;
    T.st = held;
    ok(T._st(null) === held, 'L6 ⚠⚠ _st has no fallback — every control passes null and would read undefined');
    ok(T._st(undefined) === held, 'L6 ⚠ _st does not fall back on undefined');
    T.st = saved;
  }
}

/* ================================================================== */
/* L7 — EVERY CONSTANT REACHES A CALL SITE, AND THE TWO EQUALITIES.
   ⚠⚠ #55 shipped SEVEN dead constants past a gate written to catch
   exactly that, #56 shipped THREE more under a comment forbidding it by
   name, and THIS TOOL SHIPPED THREE: T_POP, T_SEAT and T_DETENT were
   declared and never read. They are now the travel returned by
   _announceTagChange. */
{
  const body = SOURCE.slice(SOURCE.indexOf('var ShapeStretcher'));
  ok(body.length > 5000, 'L7 non-vacuity: the object body is ' + body.length + ' chars — the call-site scan is looking at the wrong text');
  const dead = [];
  NEEDED.forEach(function (k) {
    const uses = (body.match(new RegExp('GEO\\.' + k + '(?![A-Z0-9_])', 'g')) || []).length;
    if (uses === 0) dead.push(k); else pass++;
  });
  eq(dead.length, 0, 'L7 ⚠⚠ ' + dead.length + ' GEO CONSTANTS ARE DECLARED AND NEVER READ: ' + dead.join(', ') +
    ' — a named number nobody reads is a claim about the machine that the machine does not make');
  /* poison the scan both ways */
  ok(/GEO\.T_POP(?![A-Z0-9_])/.test('this._paint(GEO.T_POP);'), 'L7 poison: the call-site scan failed to fire');
  ok(!/GEO\.T_POP(?![A-Z0-9_])/.test('this._paint(GEO.T_POPPED);'), 'L7 poison: the call-site scan matched a longer name');

  /* ⭐⭐ THE NO-VERDICT LAW, STATED AS TWO EQUALITIES OVER FOUR NUMBERS.
     A verdict is asymmetric by nature — you are told you are wrong and
     never told you are right by the identical mechanism. Here a tag is
     exactly as loud coming back as it was going. Two constants and an
     equality, never one shared constant, so a later differentiation is
     FALSIFIABLE rather than unstatable. */
  eq(G.T_POP, G.T_SEAT, 'L7 ⭐⭐ THE POP AND THE SEAT TRAVEL FOR DIFFERENT LENGTHS OF TIME — the more exciting animation IS the verdict, delivered by production values instead of by hue');
  eq(G.SND_POP, G.SND_SEAT, 'L7 ⭐⭐ THE POP AND THE SEAT SOUND AT DIFFERENT PITCHES — the same verdict, delivered by ear');
  ok(G.T_POP > 0 && G.SND_POP > 0, 'L7 the pop has no travel or no voice at all');
  /* ⚠ T_, NOT SND_: every other SND_* is a frequency and this one is ms */
  ok(/T_SND_DEBOUNCE/.test(SOURCE) && !/SND_DEBOUNCE:/.test(SOURCE.replace(/T_SND_DEBOUNCE/g, '')),
    'L7 ⚠ the sound debounce is named as if it were a frequency — pair-gate.js:126 still ships that defect');
  ok(G.T_SND_DEBOUNCE > 20 && G.T_SND_DEBOUNCE < 1000, 'L7 the sound debounce is not a plausible number of milliseconds');
  ok(G.RM_F > 0 && G.RM_F < 1, 'L7 ⚠ reduced motion does not COMPRESS — the factor is ' + G.RM_F);
  ok(G.RM_FLOOR > 0, 'L7 ⚠ reduced motion SKIPS rather than compresses — the floor is ' + G.RM_FLOOR);
  eq(T._dur.call({ _reduced: false }, 400), 400, 'L7 full motion does not run at its declared length');
  ok(T._dur.call({ _reduced: true }, 400) < 400 && T._dur.call({ _reduced: true }, 400) >= G.RM_FLOOR,
    'L7 reduced motion does not compress to the floor');
  eq(T._dur.call({ _reduced: true }, 100), G.RM_FLOOR, 'L7 reduced motion drops below its own floor');
  /* the scale is the circumradius, and it is TARGET_R */
  [{ n: 4, k: 0, theta: 90 }, { n: 3, k: 60, theta: 30 }, { n: 4, k: -82, theta: 162 }].forEach(function (f) {
    [0, 90, 213].forEach(function (r) {
      const v = T.verts(f, r);
      let cx = 0, cy = 0;
      v.forEach(p => { cx += p[0]; cy += p[1]; });
      cx /= v.length; cy /= v.length;
      const rr = Math.max.apply(null, v.map(p => Math.hypot(p[0] - cx, p[1] - cy)));
      ok(Math.abs(rr - G.TARGET_R) < 1e-9,
        'L7 ⚠⚠ the shape is fitted to ' + rr.toFixed(3) + ' and not to TARGET_R = ' + G.TARGET_R +
        ' — a bounding-box fit BREATHES as the shape turns, so a rotation that changes nothing would visibly change the size');
    });
  });
}

/* ================================================================== */
/* L8 — THE STRINGS AND THE REFUSE-LIST, WHICH IS A GATE AND NOT A NOTE. */
{
  const keys = Object.keys(T.strings);
  ok(keys.length >= 25, 'L8 non-vacuity: only ' + keys.length + ' strings are authored');
  keys.forEach(function (k) {
    ok(T.strings[k] && typeof T.strings[k].en === 'string' && T.strings[k].en.length > 0,
      'L8 `' + k + '` has no English — a flat strings map makes the shell render the KEY (#50)');
  });
  const prose = keys.map(k => T.strings[k].en).join('  ');
  ok(prose.length > 600, 'L8 non-vacuity: the prose under test is ' + prose.length + ' chars');

  /* ⚠ A `\b` BAN IS BORN DEAD IN TEN LOCALES, and this tool's locale
     file has not landed yet — so the unicode form is used from the
     start rather than retrofitted onto eleven panels' copy. */
  const ban = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');

  /* (a) NOTHING IS MARKED RIGHT OR WRONG */
  ['correct', 'incorrect', 'wrong', 'right answer', 'well done', 'oops', 'score', 'points',
    'streak', 'level up', 'perfect', 'mistake', 'try again'].forEach(function (w) {
      ok(!ban(w).test(prose), 'L8 ⚠⚠ "' + w + '" reaches the copy — a tag reports a PROPERTY, never a performance');
    });
  /* (b) NO READOUT THIS TOOL DOES NOT OWN. v5 entry 15 owns conserved
     perimeter, v5 entry 14 owns angle-as-turn and the degree numeral.
     ⭐⭐ ONE NAMED EXEMPTION, WITH ITS CITATION, NEVER A LOOSENED REGEX.
     `ariaShape3` / `ariaShape4` (shape-stretcher.js, the aria block) are
     the pane's accessible name and they say "turned {rot} degrees".
     That numeral is the POSE — the one fact a sighted child gets for
     free from looking at the pane — and a screen-reader user has no
     other channel for it. It is NOT an angle OF the shape: theta is
     never announced anywhere, which is what entry 14 actually owns.
     ⭐⭐ AND THE EXEMPTION IS GONE, WHICH IS THE OUTCOME TO WANT. This
     block first carried a NAMED exemption for `ariaShape3`/`ariaShape4`,
     which said "turned {rot} degrees" — the pose, argued as the one fact
     a sighted child gets for free. The tool then struck the numeral from
     those labels AND from the dial's `aria-valuenow`, on the stronger
     reading that `rot` enters no predicate so the number was meaningless
     on every channel. So the ban now applies to ALL the prose with no
     exemption at all, and that it PASSES is the assertion. ⚠ An
     exemption list is a debt; this one is recorded here only so nobody
     re-opens it by accident. */
  ['perimeter', 'area', 'circumference', 'degrees', 'degree', 'angle', 'protractor'].forEach(function (w) {
    ok(!ban(w).test(prose), 'L8 ⚠ "' + w + '" reaches the copy — that readout belongs to another instrument');
  });
  ok(!/\b\d+\s*(°|deg)/i.test(prose), 'L8 ⚠ a degree numeral reaches the copy');
  /* ⚠⚠ AND NO STRING MAY CARRY `{rot}`. With `_fmt` deleted there is no
     substituter left, so a locale shipping the old placeholder would
     read the literal braces aloud — and from the locale side
     "substituted" and "printed raw" are indistinguishable. */
  keys.forEach(function (k) {
    ok(!/\{rot\}/.test(T.strings[k].en),
      'L8 ⚠⚠ `' + k + '` still carries the {rot} placeholder and there is no substituter left — a screen reader would say the braces');
  });
  ok(!/\b\d+\s+of\s+\d+\b/i.test(prose), 'L8 ⚠ a completeness readout reaches the copy — a score wearing a fraction');
  /* (c) NO EFFICACY CLAIM IN ANY LANDING. There are no studies. */
  ['research', 'proven', 'evidence-based', 'studies show', 'raises scores', 'guaranteed'].forEach(function (w) {
    ok(!ban(w).test(prose), 'L8 ⚠⚠ "' + w + '" reaches the copy — zero efficacy studies exist for this routine');
  });
  /* (d) THE NOUNS THAT ARE ALREADY OWNED, each measured in the docblock:
     `clasp` is taken 21x AND INVERTED, `bench` is taken 506x and is a
     sibling's NAME in sv/da/no, `twin` belongs to folding-sheet. */
  ['bench', 'twin', 'clasp', 'tape', 'strand', 'jar', 'bag', 'hoop', 'drum', 'easel', 'lid', 'plank']
    .forEach(function (w) {
      ok(!ban(w).test(prose), 'L8 ⚠⚠ "' + w + '" reaches the copy — it is a shipped sibling\'s own noun');
    });
  /* (e) AND THE THREE NAMED PARTS THAT MUST BE THERE */
  eq(T.strings.title.en, 'The Shape Stretcher', 'L8 the product name is the operator\'s');
  ok(/shape/i.test(T.strings.instruction.en), 'L8 the instruction never names the shape');
  ok(/tag/i.test(T.strings.instruction.en), 'L8 the instruction never names the tags');
  ok(/turn/i.test(T.strings.instruction.en), 'L8 the instruction never tells the class to turn it — that is the first move of the routine');

  /* poison every ban, BOTH directions */
  ok(ban('score').test('keep the score'), 'L8 poison: the judge ban failed to fire');
  ok(!ban('score').test('scoreboard-ish'), 'L8 poison: the judge ban fired across a word boundary');
  ok(ban('bench').test('the bench holds it'), 'L8 poison: the sibling-noun ban failed to fire');
  ok(!ban('bench').test('benchmarking'), 'L8 poison: the sibling-noun ban fired inside a longer word');
  ok(ban('area').test('the area of it'), 'L8 poison: the readout ban failed to fire');
  ok(!ban('area').test('a rearing shape'), 'L8 poison: the readout ban fired inside another word');
  ok(ban('area').test('la area'), 'L8 poison: the ban is ASCII-only and will be born dead in ten locales');
  ok(!ban('area').test('arean'), 'L8 poison: the ban matched a suffixed Scandinavian form it should leave alone');

  /* (f) EVERY {token} IS ONE THE PAINT SUPPLIES — and with `_fmt` gone
     the supplied set is EMPTY, so any token at all is a defect. The
     poison below is what keeps this from being a check that cannot
     fire. */
  const SUPPLIED = {};
  let tokens = 0;
  keys.forEach(function (k) {
    (T.strings[k].en.match(/\{(\w+)\}/g) || []).forEach(function (tk) {
      tokens++;
      ok(SUPPLIED[tk.slice(1, -1)] === 1, 'L8 ⚠ `' + k + '` carries the token ' + tk + ', which nothing substitutes');
    });
  });
  eq(tokens, 0, 'L8 ⚠⚠ ' + tokens + ' placeholder tokens survive in the copy with no substituter left to fill them');
  ok(/\{(\w+)\}/.test('a {rot} b'), 'L8 poison: the token scan cannot see a token at all');
  ok(!/\{(\w+)\}/.test('a plain sentence'), 'L8 poison: the token scan fires on prose');

  /* ⭐⭐ (g) EVERY KEY THE RENDER ASKS FOR MUST EXIST. #50 shipped every
     string dead under 120k green model assertions, because renaming a
     key leaves good copy sitting in the map while the paint goes on
     asking for the old one and the shell renders THE KEY.
     ⚠ The converse — every AUTHORED key is REACHED — cannot be seen from
     source at all (a live t() call in a dead branch defeats it) and is
     smoke-shape-stretcher-locales.js's job, with a Proxy. */
  {
    const referenced = [];
    let mm;
    const reT = /\bt\('([a-zA-Z][\w]*)'\)/g;
    while ((mm = reT.exec(SOURCE)) !== null) referenced.push(mm[1]);
    const reMk = /_mk\([^)]*?'([a-zA-Z][\w]*)'\)/g;
    while ((mm = reMk.exec(SOURCE)) !== null) referenced.push(mm[1]);
    const uniq = Array.from(new Set(referenced));
    ok(uniq.length >= 15, 'L8 non-vacuity: only ' + uniq.length + ' string keys were found referenced in the source — the scan is not finding the call sites');
    uniq.forEach(function (k) {
      ok(Object.prototype.hasOwnProperty.call(T.strings, k),
        'L8 ⭐⭐ the render asks for `' + k + '` and NO SUCH STRING IS AUTHORED — the shell renders the KEY');
    });
    ok(!Object.prototype.hasOwnProperty.call(T.strings, 'sayTagsNope'), 'L8 poison: the key-existence test cannot tell a missing key from a present one');
    ok(Object.prototype.hasOwnProperty.call(T.strings, 'sayTagsBoth'), 'L8 poison: the key-existence test cannot find a key that is plainly there');
    /* the settings keys are the shell's business, and it asks by name */
    T.settings.forEach(function (f) {
      ok(!!T.strings[f.labelKey], 'L8 the settings field asks for `' + f.labelKey + '`, which is not authored');
      f.options.forEach(o => ok(!!T.strings[o.labelKey], 'L8 the settings option asks for `' + o.labelKey + '`, which is not authored'));
    });
  }
}

/* ================================================================== */
/* L9 — THE RULES THAT ONLY THE SOURCE CAN SHOW. */
{
  const css = (SOURCE.match(/injectCSS: function[\s\S]*?join\(''\);/) || [''])[0];
  ok(css.length > 1500, 'L9 non-vacuity: the stylesheet under test is ' + css.length + ' chars');

  /* ⚠⚠ THE COMPLETE HOUSE SCROLL FORM, IN TWO SEPARATE RULES.
     `html.x,body.x{}` is a selector LIST whose html half applies
     unconditionally, which makes the class decorative and its mutation
     unkillable; and `overflow-y:auto` alone is INERT against a shell
     that pins html,body{height:100%}. */
  ['html', 'body'].forEach(function (sel) {
    const re = new RegExp("'" + sel + "\\.shp-scroll\\{([^}]*)\\}'");
    const m = css.match(re);
    ok(!!m, 'L9 ⚠⚠ there is no `' + sel + '.shp-scroll` rule of its own — this tool is taller than the sibling that shipped a control physically unreachable at 320x568');
    if (m) {
      ok(/overflow-y\s*:\s*auto/.test(m[1]), 'L9 the ' + sel + ' scroll rule does not scroll');
      ok(/height\s*:\s*auto/.test(m[1]), 'L9 ⚠⚠ the ' + sel + ' scroll rule keeps its overflow but loses its HEIGHT, which makes it inert against the shell');
      ok(/min-height\s*:\s*100%/.test(m[1]), 'L9 the ' + sel + ' scroll rule drops its min-height');
    }
  });
  ok(!/'html\s*,\s*body\.shp-scroll\{/.test(css),
    'L9 ⚠⚠ the scroll escape is a selector LIST, so its html half applies unconditionally and the class is decorative');
  ok(/documentElement\.classList\.add\('shp-scroll'\)/.test(SOURCE), 'L9 the scroll class is never added to the document element');
  ok(/body\.classList\.add\('shp-scroll'\)/.test(SOURCE), 'L9 the scroll class is never added to the body');

  /* ⚠ `vh` IS FORBIDDEN INSIDE A MANIPULATIVE — it resolves against the
     IFRAME, and the tool page pins that iframe. `vw` is fine. */
  ok(!/\d\s*vh\b/.test(css), 'L9 ⚠ a `vh` length is used inside the manipulative');

  /* ⭐ ONE COLOUR ON THE TAG, FROM THE FIRST FRAME OF A POP TO THE LAST.
     No hue may encode anything, so the whole event is position and
     opacity. The muted kept-shape override and the print black are the
     only other values allowed. */
  const tagStrokes = [];
  css.replace(/'([^']*shp-tag[^']*)\{([^}]*)\}/g, function (all, sel, decl) {
    (decl.match(/stroke\s*:\s*([^;]+)/g) || []).forEach(s => tagStrokes.push(s.split(':')[1].trim().toLowerCase()));
    return all;
  });
  ok(tagStrokes.length >= 2, 'L9 non-vacuity: only ' + tagStrokes.length + ' tag stroke colours were found — the scan is not reading the stylesheet');
  const ALLOWED = ['#0e5147', '#7a6a55', '#000'];
  tagStrokes.forEach(function (c) {
    ok(ALLOWED.indexOf(c) >= 0, 'L9 ⚠⚠ the tag is stroked `' + c + '` somewhere — a second hue on a tag is a VERDICT delivered by colour');
  });
  /* ⭐⭐ THE POP AND THE SEAT ARE ONE GESTURE PLAYED IN TWO DIRECTIONS.
     ⚠ MY FIRST VERSION BANNED A STATE CLASS ON A TAG OUTRIGHT, and the
     tool then grew a real travel — `@keyframes shp-pop` / `shp-seat`,
     which is what `--shp-dur` had been missing (it was written on every
     paint and read by NOTHING, so both events took zero time and their
     equality was vacuously true). The ban would have condemned the fix.
     The right law is not "no state class" but SYMMETRY: same duration
     variable, same easing, same travel, and NO COLOUR in either — so the
     whole event is position and opacity and no hue can mean anything.
     The ban-too-wide trap, and the fence working is not the fence
     failing. */
  {
    const pop = (css.match(/\.shp-tag\.is-pop\{([^}]*)\}/) || [])[1];
    const seat = (css.match(/\.shp-tag\.is-seat\{([^}]*)\}/) || [])[1];
    ok(!!pop && !!seat, 'L9 ⚠⚠ the tag has no pop/seat travel at all — T_POP and T_SEAT would name a motion that never occurs, and their equality would be vacuously true');
    if (pop && seat) {
      const shape = s => s.replace(/shp-(pop|seat)/, 'shp-X');
      eq(shape(pop), shape(seat),
        'L9 ⭐⭐ THE POP AND THE SEAT DO NOT TRAVEL ALIKE — "' + pop + '" against "' + seat +
        '". A verdict is asymmetric by nature, and the more exciting animation IS the verdict');
      ok(/var\(--shp-dur/.test(pop) && /var\(--shp-dur/.test(seat),
        'L9 ⚠⚠ the travel is not driven by the duration the model computes — T_POP and T_SEAT would name nothing');
      [['pop', pop], ['seat', seat]].forEach(function (pr) {
        ok(!/(stroke|color|fill|background)\s*:/.test(pr[1]),
          'L9 ⚠⚠ the ' + pr[0] + ' rule sets a COLOUR — no hue may encode which of the two happened');
      });
    }
    /* and the keyframes are literal reverses of each other */
    /* ⚠ THE CLOSING BRACE IS INSIDE THE CAPTURE. A non-greedy match up to
       `}}` leaves the final `}` out, so the `to{...}` block has no
       terminator left and reads as absent — the check then reported "the
       two are not one gesture reversed" while printing the two values
       that plainly are. A wrong measurement wearing the costume of a
       defect, in the check written to catch asymmetry. */
    const kp = (css.match(/@keyframes shp-pop\{([\s\S]*?\})\}/) || [])[1];
    const ks = (css.match(/@keyframes shp-seat\{([\s\S]*?\})\}/) || [])[1];
    ok(!!kp && !!ks, 'L9 non-vacuity: the pop/seat keyframes were not found, so the symmetry check above compared nothing');
    if (kp && ks) {
      const frames = s => ({ from: (s.match(/from\{([^}]*)\}/) || [])[1], to: (s.match(/to\{([^}]*)\}/) || [])[1] });
      ok(!!frames(kp).from && !!frames(kp).to,
        'L9 non-vacuity: the pop keyframe parsed to ' + JSON.stringify(frames(kp)) + ' — the reversal check would compare undefined against undefined');
      const a = frames(kp), b2 = frames(ks);
      eq(a.from, b2.to, 'L9 ⭐ the seat does not end where the pop begins — the two are not one gesture reversed');
      eq(a.to, b2.from, 'L9 ⭐ the pop does not end where the seat begins — the two are not one gesture reversed');
      ok(!/(stroke|color|fill|background)\s*:/.test(kp + ks), 'L9 ⚠⚠ a keyframe touches a COLOUR — the whole event must be position and opacity');
    }
    ok(/var\(--shp-dur/.test(css), 'L9 ⚠⚠ `--shp-dur` is written by the paint and read by NO CSS rule — the named travel does not occur');
  }

  /* the print sheet resets the shell, or the whole page prints */
  ok(/@media print\{\.lcs-shell,\.shp-wrap\{display:none !important\}/.test(css),
    'L9 ⚠⚠ the print sheet does not reset the shell — pressing Print would print the whole web page (#40 and #41 both shipped that)');
  ok(/\.shp-sheet\{display:none\}/.test(css), 'L9 the paid sheet is visible on screen');

  /* the paywall guards the SHEET, not the button — Ctrl+P is a print
     path too, and a sibling handed the paid sheet to every visitor */
  ok(/beforeprint[\s\S]{0,240}if \(!self\.premium\)/.test(SOURCE),
    'L9 ⚠⚠ the beforeprint listener does not check entitlement — the browser\'s own print command hands the paid sheet to every non-subscriber');
  ok(/_print: function \(\) \{\s*if \(!this\.premium\)/.test(SOURCE), 'L9 the print control does not check entitlement');
  /* and it degrades to the FREE TIER, never to nothing */
  ok(/\['catch'\]\(function \(\) \{[\s\S]{0,120}\}\)/.test(SOURCE), 'L9 ⚠ the entitlement fetch has no failure path — offline it must degrade to the free tier, not to nothing');

  /* ⚠ THE TRACKS ARE REACHABLE THREE WAYS. Drag-only is dead to a
     keyboard, to assistive tech and to the liveness gate — a synthetic
     .click() never fires pointerdown (#41's flag, dead on nine paths). */
  ['pointerdown', 'pointermove', 'pointerup', 'keydown'].forEach(function (ev) {
    ok(new RegExp("rail\\.addEventListener\\('" + ev + "'").test(SOURCE),
      'L9 ⚠⚠ the rail has no ' + ev + ' handler — one integer ladder, THREE doors into it');
  });
  ['ArrowLeft', 'ArrowRight', 'PageDown', 'PageUp', 'Home', 'End', 'Enter'].forEach(function (k) {
    ok(SOURCE.indexOf("'" + k + "'") > 0, 'L9 the keyboard cannot walk the ladder with ' + k);
  });
  /* ⚠ ANCHOR ON THE CALL, NOT ON THE ATTRIBUTE NAME. `/tabindex', '0'/`
     matches `data-tabindex` just as happily, and a mutation renaming the
     attribute walked through it — a keyboard-dead rail certified by a
     regex that was reading the wrong thing. */
  ok(/rail\.setAttribute\('role', 'slider'\)/.test(SOURCE), 'L9 the rail is not a slider');
  ok(/rail\.setAttribute\('tabindex', '0'\)/.test(SOURCE),
    'L9 ⚠⚠ the rail is not focusable — a drag-only control is dead to a keyboard, to assistive tech and to the liveness gate');
  ok(!/rail\.setAttribute\('tabindex', '-1'\)/.test(SOURCE), 'L9 the rail is focusable only programmatically');

  /* ⭐ THE TRAVEL RETURNED BY THE ANNOUNCEMENT REACHES THE PAINT. Without
     this, dropping the return value leaves T_POP and T_SEAT "read" by
     the source scan while nothing they name ever happens. */
  ok(/this\._paint\(this\._announceTagChange\(before, after\)\)/.test(SOURCE),
    'L9 ⚠⚠ the pop/seat travel is computed and THROWN AWAY — the two constants stay referenced and stop meaning anything');
  ok(/return GEO\.T_POP;/.test(SOURCE) && /return GEO\.T_SEAT;/.test(SOURCE) && /return GEO\.T_DETENT;/.test(SOURCE),
    'L9 the announcement does not return the travel for all three outcomes');
  ok(/aria-valuenow/.test(SOURCE), 'L9 the rail never says where it is');

  /* ⭐⭐ THE DIAL CARRIES NO NUMBER, ON ANY CHANNEL. The degree numeral
     was struck from the shape labels and then found still shipping on a
     channel no string edit could reach: a `role="slider"` announces its
     `aria-valuenow`, so a screen-reader user heard 0-358 on every arrow
     press — the one quantity this file's refuse-list bans and its second
     invention proves irrelevant. `len` and `skew` keep their values,
     because those numbers change what the shape IS. */
  ok(/if \(key !== 'turn'\) \{[\s\S]{0,200}aria-valuenow/.test(SOURCE),
    'L9 ⚠⚠ the dial\'s numeric value is not gated — a screen-reader user hears a degree number on every arrow press');
  /* ⚠ ANCHOR ON THE BARE VARIABLE. `/rail\.setAttribute/` also matches
     `tr.rail.setAttribute`, which is the LEGITIMATE gated call in the
     paint — so the check condemned the correct tool. A greedy prefix is
     the recorded `[\w.]*` defect in a new dress. */
  ok(!/(?<![\w.])rail\.setAttribute\('aria-valuenow'/.test(SOURCE),
    'L9 ⚠⚠ the rail is BUILT with an aria-valuenow, so the dial announces its degrees from the first frame, before the gated paint can withhold it');
  ok(/(?<![\w.])rail\.setAttribute\('aria-label'/.test(SOURCE), 'L9 poison: the bare-variable anchor cannot see the rail construction at all');

  /* ⭐ AND IT PLAYS NO DETENT TONE. The one rail whose detent set is
     EMPTY BY CONSTRUCTION was the only one clicking on every rung —
     the second invention contradicted by ear. */
  ok(/if \(key === 'turn'\) \{ this\._turned\(\); return; \}/.test(SOURCE),
    'L9 ⚠⚠ the dial falls through to the tag announcement, so it plays a DETENT TONE on a rail that has no detents');
  ok(/T_SAY_THROTTLE/.test(SOURCE), 'L9 the dial says its one sentence once per rung across a 180-rung drag');
}

/* ================================================================== */
console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass.toLocaleString() + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
