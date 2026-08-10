/* =====================================================================
   MODEL GATE — TOOL #52, THE ROUNDING HILL
   =====================================================================
   ⚠⚠ THE ORACLE IS DERIVED FROM THE STATED RULE, NOT FROM THE CODE.
   On #51 a native panel found five live model bugs that 16,626
   assertions had passed, because the gate's oracle encoded the SAME
   wrong tie-rule the tool did — two wrongs agreeing perfectly. So here
   the rule is written out in words first and then in arithmetic, and
   every boundary case is named explicitly rather than swept up by a
   loop that shares the tool's convention.

   THE RULE, in words: the ground has a dip at each of two consecutive
   round numbers and a ridge exactly halfway between them. A stone runs
   DOWNHILL to whichever dip it is nearer. Exactly on the ridge the
   ground is level and it runs NOWHERE — and that null is not a failure,
   it is the whole tool.

   ⚠ NON-VACUITY FIRST. Every enumeration reports how many states it
   visited against a count computed here.

   Run: node scripts/verify-rounding-hill.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

const DIR = process.env.ROUNDING_HILL_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'rounding-hill.js');
const T = require(SRC);
const G = T.GEO;

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const eq = (a, b, m) => ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));

/* ---- THE ORACLE, from the rule as stated above --------------------- */
const oRidge = (lo, hi) => (lo + hi) / 2;
const oRunsTo = (lo, hi, v) => {
  const r = oRidge(lo, hi);
  if (v === r) return null;            /* level ground: nowhere */
  return v < r ? lo : hi;
};
/* ⭐ AND AN INDEPENDENT SECOND DERIVATION: away from the ridge, running
   downhill to the nearer dip must agree with ordinary round-to-nearest.
   If these two ever disagree, the ground is not a rounding machine. */
const oRoundToNearest = (lo, hi, v) => {
  const step = hi - lo;
  return Math.round((v - lo) / step) * step + lo;
};

/* L0 — constants present and sane */
const NEEDED = ['DIP_STEP', 'STEP', 'T_SETTLE', 'T_ARRIVE', 'T_TEETER', 'TEETER_DEG',
  'T_TILT', 'TILT_DEG', 'T_REFUSE', 'RM_F', 'RM_FLOOR', 'SND_SET', 'SND_SETTLE',
  'SND_TEETER', 'SND_TILT', 'SND_REFUSE', 'SND_DEBOUNCE'];
ok(NEEDED.length >= 15, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing'));

/* ================================================================== */
/* ⭐ L1 — THE GROUND IS A ROUNDING MACHINE, AND THE TIE IS THE ONLY
   PLACE IT REFUSES. Enumerated over both grounds, every whole number. */
{
  let grounds = 0, values = 0, ties = 0, agreed = 0;
  [['tens', 10], ['hundreds', 100]].forEach(function (cfg) {
    const st = T.newState(cfg[0]);
    grounds++;
    /* ⭐⭐ THE SPAN IS ONE STEP. Built first with two, the dips were 40
       and 60 and 47 ran DOWN to 40 — the ground rounded to the nearest
       TWENTY. Named here so it can never come back. */
    eq(st.hi - st.lo, cfg[1], 'L1 ⭐ the two dips must be ONE step apart on ' + cfg[0]);
    eq(st.lo % cfg[1], 0, 'L1 the low dip is not a round number');
    eq(st.hi % cfg[1], 0, 'L1 the high dip is not a round number');
    eq(T.ridge(st), oRidge(st.lo, st.hi), 'L1 the ridge is not halfway');
    eq(T.ridge(st) % cfg[1], cfg[1] / 2, 'L1 ⭐ the ridge is not the five between the tens');

    for (let v = st.lo; v <= st.hi; v++) {
      const got = T.runsTo(st, v);
      eq(got, oRunsTo(st.lo, st.hi, v), 'L1 runs-to for ' + v + ' on ' + st.lo + '-' + st.hi);
      if (v === T.ridge(st)) {
        ok(got === null, 'L1 ⭐⭐ the ridge at ' + v + ' must run NOWHERE — got ' + got);
        ties++;
      } else {
        /* the second derivation: downhill == round-to-nearest */
        eq(got, oRoundToNearest(st.lo, st.hi, v),
          'L1 ⭐ downhill disagrees with round-to-nearest at ' + v + ' — the ground is not a rounding machine');
        agreed++;
      }
      /* the ground's shape: highest at the ridge, zero at both dips */
      const h = T.heightAt(st, v);
      ok(h >= -1e-9 && h <= 1 + 1e-9, 'L1 height out of range at ' + v);
      values++;
    }
    eq(T.heightAt(st, st.lo), 0, 'L1 the low dip is not at ground level');
    eq(T.heightAt(st, st.hi), 0, 'L1 the high dip is not at ground level');
    eq(T.heightAt(st, T.ridge(st)), 1, 'L1 the ridge is not the high point');
  });
  eq(grounds, 2, 'L1 non-vacuity: grounds walked');
  eq(ties, 2, 'L1 non-vacuity: exactly one tie per ground');
  ok(agreed >= 100, 'L1 non-vacuity: only ' + agreed + ' values agreed with round-to-nearest');
  ok(values >= 110, 'L1 non-vacuity: only ' + values + ' values walked');
}

/* ================================================================== */
/* ⭐⭐ L2 — THE MACHINE NEVER DECIDES THE TIE. Enumerated: with the
   ridge level, releasing on the ridge teeters, and NO sequence of
   moves, releases or re-releases ever resolves it. Only setTilt can. */
{
  const base = T.newState('tens');
  const r = T.ridge(base);
  let st = T.again(base, r);
  ok(st !== null, 'L2 could not put the stone on the ridge');
  eq(st.tilt, 0, 'L2 the ridge does not start level');

  st = T.release(st);
  eq(st.phase, 'teeter', 'L2 ⭐⭐ releasing on a level ridge did not teeter');
  eq(st.rest, null, 'L2 ⭐⭐ the machine chose a dip on its own');

  /* every other move, tried against the teetering stone: none resolves */
  let tried = 0;
  [T.release(st), T.move(st, 1), T.move(st, -1), T.move(st, T.step(st)), T.again(st, r)]
    .forEach(function (x) {
      tried++;
      if (x === null) return;                     /* a refusal is fine */
      if (x.at === r && x.phase === 'settled') fails.push('L2 ⚠⚠ a move resolved the tie: ' + JSON.stringify(x));
      else pass++;
    });
  ok(tried === 5, 'L2 non-vacuity: only ' + tried + ' moves tried against the teeter');

  /* ⚠ and the teeter must be a LOOP in the drawing, not a timeout —
     a wobble that ended by itself would mean the machine decided */
  const src = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
  /* ⚠ TEST THE PROPERTY, NOT THE RULE'S DECLARATION ORDER. Written first
     as `is-teeter{animation:`, it condemned a correct tool the moment a
     transform-origin was added ahead of the animation — the assertion was
     really about the order of declarations, which is not what it claims
     to check and not what matters. */
  ok(/is-teeter\{[^}]*animation:[^};]*infinite/.test(src),
    'L2 ⚠⚠ the teeter is not an infinite animation — it resolves itself, which is the one thing forbidden');
  ok(!/setTimeout\([^)]*T_TEETER/.test(src), 'L2 ⚠⚠ the teeter is on a timeout');
}

/* ⭐ L3 — ONCE THE CLASS SETS THE RULE IT HOLDS, AND IT TOUCHES ONLY
   THE TIE. A settled ridge must never change where 47 goes. */
{
  const base = T.newState('tens');
  const r = T.ridge(base);
  let checked = 0, changed = 0;
  [-1, 1].forEach(function (dir) {
    const tilted = T.setTilt(T.again(base, r), dir);
    ok(tilted !== null, 'L3 setTilt(' + dir + ') refused');
    eq(tilted.tilt, dir, 'L3 the tilt did not take');
    eq(T.settleOf(tilted, r), dir > 0 ? tilted.hi : tilted.lo, 'L3 ⭐ the tie did not obey the class rule');
    for (let v = base.lo; v <= base.hi; v++) {
      if (v === r) continue;
      eq(T.settleOf(tilted, v), oRunsTo(base.lo, base.hi, v),
        'L3 ⚠⚠ the class rule changed where ' + v + ' goes — it must touch ONLY the tie');
      checked++;
    }
    /* releasing on the ridge now resolves at once, because the class
       already decided — not because the machine did */
    const rel = T.release(T.again(tilted, r));
    eq(rel.phase, 'settled', 'L3 a set ridge did not resolve the release');
    eq(rel.rest, dir > 0 ? base.hi : base.lo, 'L3 the set ridge resolved the wrong way');
    changed++;
  });
  /* ⚠ COMPUTED, NOT GUESSED. My first version asserted >= 30, which is
     a number I liked rather than a measurement: the tens ground holds 11
     whole positions, one of them the tie, tried in two directions — so
     the answer is exactly 20 and any other value is a real defect. */
  eq(checked, 2 * ((base.hi - base.lo + 1) - 1), 'L3 non-vacuity: non-tie values checked');
  eq(changed, 2, 'L3 non-vacuity: both directions exercised');

  /* ⭐ and taking the rule away takes its consequence with it */
  const settled = T.release(T.again(T.setTilt(T.again(base, r), 1), r));
  eq(settled.phase, 'settled', 'L3 setup: the stone did not settle');
  const cleared = T.setTilt(settled, 0);
  ok(cleared !== null, 'L3 could not un-settle the ridge');
  eq(cleared.phase, 'teeter', 'L3 ⭐ un-settling the ridge left the stone resolved — the apparatus would be claiming it fell on its own');
  eq(cleared.rest, null, 'L3 un-settling left a resting dip behind');
  /* but a stone that settled by GRAVITY is untouched by clearing */
  const gravity = T.release(T.again(T.setTilt(T.again(base, base.lo + 2), 1), base.lo + 2));
  const g2 = T.setTilt(gravity, 0);
  eq(g2.phase, 'settled', 'L3 ⚠ clearing the rule disturbed a stone that ran downhill on its own');
  eq(g2.rest, base.lo, 'L3 the gravity-settled stone moved');
}

/* L4 — phase gating and honest refusals, over every position */
{
  const base = T.newState('tens');
  let walked = 0, refusedEdge = 0, refusedPhase = 0;
  for (let v = base.lo; v <= base.hi; v++) {
    const held = T.again(base, v);
    ok(held !== null, 'L4 again(' + v + ') refused');
    eq(held.phase, 'held', 'L4 a new stone is not held');
    walked++;
    /* out of the ground is a refusal, never a clamp */
    if (v === base.lo) { ok(T.move(held, -1) === null, 'L4 ⚠ moved below the ground'); refusedEdge++; }
    if (v === base.hi) { ok(T.move(held, 1) === null, 'L4 ⚠ moved above the ground'); refusedEdge++; }
    ok(T.again(base, base.lo - 1) === null, 'L4 a stone was set down off the ground');
    ok(T.again(base, base.hi + 1) === null, 'L4 a stone was set down off the ground');
    /* a settled stone cannot be moved or re-released */
    const rel = T.release(held);
    if (rel && rel.phase === 'settled') {
      ok(T.move(rel, 1) === null, 'L4 a resting stone was moved');
      ok(T.release(rel) === null, 'L4 a resting stone was released again');
      refusedPhase += 2;
    }
    /* setTilt to the value it already has is a refusal, not a no-op that
       reports success — a control that "acts" without changing anything
       is the consequence-free-control defect */
    ok(T.setTilt(held, 0) === null, 'L4 setting the ridge level when it already is reported success');
    ok(T.setTilt(held, 2) === null, 'L4 an out-of-range tilt was accepted');
  }
  eq(walked, base.hi - base.lo + 1, 'L4 non-vacuity: positions walked');
  eq(refusedEdge, 2, 'L4 non-vacuity: edge refusals');
  ok(refusedPhase > 0, 'L4 non-vacuity: no phase refusal exercised');
}

/* ================================================================== */
/* @@ L4b - THE STORED ANSWER MUST AGREE WITH THE LAW THAT PRODUCED IT.
   This is the assertion the first version of this gate did not have. It
   interrogated settleOf - the law - and never the stored `rest`, so
   oracle and subject were the SAME EXPRESSION and could not disagree.
   An art panel swept the space by hand and found 4 contradictions in 132
   states: tilt -1 sitting beside a stone resting in the HIGH dip,
   reachable in two presses. Exactly #51's defect in a new dress.
   Every reachable state is swept here, and the count is reported. */
{
  let seen = 0, bad = 0, settledSeen = 0;
  ['tens', 'hundreds'].forEach(function (span) {
    const base = T.newState(span);
    for (let v = base.lo; v <= base.hi; v++) {
      [-1, 0, 1].forEach(function (t0) {
        [-1, 0, 1].forEach(function (t1) {
          let st = T.again(base, v);
          if (!st) return;
          if (t0 !== 0) { const x = T.setTilt(st, t0); if (x) st = x; }
          const r = T.release(st); if (r) st = r;
          if (t1 !== st.tilt) { const y = T.setTilt(st, t1); if (y) st = y; }
          seen++;
          if (st.phase === 'settled') {
            settledSeen++;
            if (st.rest !== T.settleOf(st, st.at)) {
              bad++;
              if (bad <= 3) fails.push('L4b @@ stored rest ' + st.rest + ' contradicts the law ('
                + T.settleOf(st, st.at) + ') at ' + st.at + ' with tilt ' + st.tilt);
            }
          } else {
            ok(st.rest === null, 'L4b a stone that is not settled has a resting dip');
          }
        });
      });
    }
  });
  ok(seen >= 1000, 'L4b non-vacuity: only ' + seen + ' states swept');
  ok(settledSeen > 0, 'L4b non-vacuity: no settled state was ever reached');
  eq(bad, 0, 'L4b @@ contradictions between the stored answer and the law');
}

/* L5 — every named constant reaches a call site */
{
  const src = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
  const body = src.replace(/\/\*[\s\S]*?\*\//g, '');
  const declared = Object.keys(G);
  ok(declared.length >= 15, 'L5 non-vacuity: implausibly few constants');
  declared.forEach(function (k) {
    const uses = (body.match(new RegExp('GEO\\.' + k + '\\b', 'g')) || []).length;
    ok(uses >= 1, 'L5 ⚠ GEO.' + k + ' is DEAD — declared, documented and never read');
  });
}

/* @@ L5b - THE TWO FIXES THE ART PANEL BOUGHT MUST STAY BOUGHT.
   Both of these mutations SURVIVED the first version of this gate. A
   fix with no law behind it is a fix with a half-life. */
{
  /* ⚠ split/join, not a regex literal: a `\r\n` written through a
     generator collapses to a REAL newline and breaks the pattern it sits
     in — the recorded escape trap, walked into again. */
  const src = fs.readFileSync(SRC, 'utf8').split(String.fromCharCode(13, 10)).join('\n');
  /* (a) the teeter duration must be reachable by _dur(). Baked into the
     stylesheet at injectCSS() it was the ONE motion path deaf to reduced
     motion, and it is the path the whole lesson lives in. */
  ok(/animation:rnh-teeter var\(--rnh-teet\)/.test(src),
    'L5b @@ the teeter duration is hard-coded in the stylesheet - _dur() cannot reach it');
  ok(/setProperty\('--rnh-teet', this\._dur\(GEO\.T_TEETER\)/.test(src),
    'L5b @@ the teeter duration is not being set from _dur()');
  /* (b) the ground and the stone must come from ONE expression. They
     were `250 - h*190` and `h*63% + 6px` - two expressions, a fixed px
     inside a percentage layout, and 63 against the true 63.33 agreeing
     by coincidence. It shipped the stone buried to 61% of its diameter. */
  ok(/groundY: function/.test(src) && /groundUp: function/.test(src),
    'L5b the shared ground expression is gone');
  ok(/this\.groundY\(s, v\)/.test(src), 'L5b the path no longer samples the shared expression');
  ok(/this\.groundUp\(s, shown\)/.test(src), 'L5b @@ the stone is no longer placed on the shared ground line');
  ok(!/heightAt\(s, shown\) \* 63/.test(src), 'L5b the old second expression is back');
  /* and the two must agree numerically at every sampled point */
  let checked = 0;
  ['tens', 'hundreds'].forEach(function (span) {
    const st = T.newState(span);
    for (let v = st.lo; v <= st.hi; v++) {
      const y = T.groundY(st, v), up = T.groundUp(st, v);
      ok(Math.abs((G.VB_H - y) / G.VB_H - up) < 1e-9, 'L5b groundY and groundUp disagree at ' + v);
      ok(up >= 0 && up <= 1, 'L5b the ground line left the arena at ' + v);
      checked++;
    }
  });
  ok(checked >= 110, 'L5b non-vacuity: only ' + checked + ' points compared');
  eq(T.groundY(T.newState('tens'), 40), G.G_BASE, 'L5b a dip is not at the base line');
  eq(T.groundY(T.newState('tens'), 45), G.G_BASE - G.G_RISE, 'L5b the ridge is not at the top line');
}

/* L6 — strings are per-locale objects and no part is named after
   another tool's part */
{
  const OWNED = ['valley', 'ball', 'marble', 'bucket', 'wind', 'gravity', 'runway', 'ghost', 'tape', 'column'];
  const ban = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
  const all = Object.keys(T.strings);
  ok(all.length >= 25, 'L6 non-vacuity: implausibly few strings (' + all.length + ')');
  all.forEach(function (k) {
    const v = T.strings[k];
    ok(v && typeof v === 'object' && !Array.isArray(v),
      'L6 ⚠ `' + k + '` is not a per-locale object — the shell will render the KEY');
    ok(v && typeof v.en === 'string' && v.en.length > 0, 'L6 ⚠ `' + k + '` has no English');
  });
  all.filter(k => k !== 'title').forEach(function (k) {
    OWNED.forEach(function (w) {
      ok(!ban(w).test(T.strings[k].en), 'L6 ⚠ `' + k + '` uses "' + w + '", another tool\'s part');
    });
  });
  ok(ban('valley').test('down in the valley'), 'L6 poison: the ban failed to fire');
  ok(!ban('ball').test('ballot'), 'L6 poison: the ban fired inside another word');
  ok(!ban('wind').test('window'), 'L6 poison: the ban fired inside "window"');
  eq(T.strings.title.en, 'The Rounding Hill', 'L6 the product name is the operator\'s');
}

console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
