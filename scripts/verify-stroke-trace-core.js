#!/usr/bin/env node
/* =====================================================================
   BUILD GATE — stroke-trace-core.js
   ---------------------------------------------------------------------
   Exhaustive over BOTH glyph tables (alphabet-trace-core + number-trace-core):
   126 strokes, 62 glyphs. Browser-free.

   ⭐ THE GATE COMPUTES ITS OWN GROUND TRUTH.
   The core ships SOLVERS, and it would be far shorter to call them and
   check the verdicts. That is marking your own homework: a core whose
   `sample()` is broken in the same direction as its own solver would
   agree with itself and pass. So every trace this gate feeds in is
   synthesised HERE, from this file's own Catmull-Rom, and every
   expectation is stated HERE in absolute units. The core's SOLVERS are
   exercised too (§C) but only as a second opinion, never as the oracle.

   ⭐ AND IT POISON-TESTS ITSELF, IN BOTH DIRECTIONS.
   `--poison` re-runs the whole suite against a deliberately broken core
   (the ORIGINAL checkpoint tracer, faithfully reimplemented) and FAILS
   if that core passes. A gate nobody has watched fail is indistinguishable
   from a gate that cannot fail — this repo has shipped four such
   assertions in this tool alone.

   WHAT IT IS PROTECTING (all measured against the shipped build):
     * the tool drew 36.2% of every stroke FOR the child
     * 14 strokes completed from a single tap at their midpoint
     * a child could stop 18 units short and be told they had written it
     * all ten digits were judged against a lowercase "l"

   usage:  node scripts/verify-stroke-trace-core.js [--poison] [--quiet]
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', 'mini tools');
const POISON = process.argv.includes('--poison');
const QUIET = process.argv.includes('--quiet');

let errs = 0, checks = 0;
function ok(label, cond) {
  checks++;
  if (!cond) { errs++; console.log('  FAIL  ' + label); }
  else if (!QUIET) console.log('  pass  ' + label);
}
function head(s) { if (!QUIET) console.log('\n[' + s + ']'); }

/* ---------- load the three cores into one sandbox ---------- */
function load(poison) {
  const sandbox = { window: {}, console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  for (const f of ['alphabet-trace-core.js', 'number-trace-core.js', 'stroke-trace-core.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sandbox, { filename: f });
  }
  if (poison) sandbox.StrokeTraceCore = brokenCore(sandbox);
  return sandbox;
}

/* The ORIGINAL tracer, reimplemented exactly: one radius doing both jobs,
   checkpoints consumed by proximity, `done` when the cursor passes the
   last one. This is what shipped. Every assertion below must reject it. */
function brokenCore() {
  const TOL = 18;
  const d = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  function segD(a, b, p) {
    const vx = b.x - a.x, vy = b.y - a.y, wx = p.x - a.x, wy = p.y - a.y;
    const L2 = vx * vx + vy * vy; if (!L2) return d(a, p);
    let t = (wx * vx + wy * vy) / L2; t = t < 0 ? 0 : t > 1 ? 1 : t;
    return d({ x: a.x + t * vx, y: a.y + t * vy }, p);
  }
  return {
    newTrace: (strokes) => ({ lanes: strokes.map(s => ({ raw: s })), idx: 0, cp: 0, formed: false, strokesDone: 0 }),
    sample(s, pt) {
      const st = s.lanes[s.idx] && s.lanes[s.idx].raw; if (!st) return { on: false, done: false };
      let on = Infinity;
      for (let i = 0; i < st.length - 1; i++) on = Math.min(on, segD(st[i], st[i + 1], pt));
      const near = on <= TOL;
      if (near) while (s.cp < st.length && d(st[s.cp], pt) <= TOL) s.cp++;
      return { on: near, done: s.cp >= st.length };
    },
    endStroke(s) {
      const st = s.lanes[s.idx] && s.lanes[s.idx].raw; if (!st) return 'incomplete';
      if (s.cp < st.length) { return 'incomplete'; }
      s.idx++; s.strokesDone++; s.cp = 0;
      if (s.idx >= s.lanes.length) { s.formed = true; return 'formed'; }
      return 'stroke-ok';
    },
    clearStroke(s) { s.cp = 0; },
    isComplete: (s) => !!s.formed,
    /* ⚠ The stub must implement the WHOLE surface the gate calls, or the
       poison run throws part-way and the harness scores a CRASH as a
       FAILURE. Those are not the same thing: a crash stops the remaining
       assertions from ever being observed, so it hides how much of the
       gate is actually vacuous. */
    progress(s) {
      const st = s.lanes[s.idx] && s.lanes[s.idx].raw;
      return st ? Math.min(1, s.cp / st.length) : 0;
    },
    flatten: (stroke) => (stroke || []).slice(),   /* it never flattened: that was F2 */
    startPoint: (s) => (s.lanes[s.idx] && s.lanes[s.idx].raw[0]) || null,
    cursorPoint: (s) => (s.lanes[s.idx] && s.lanes[s.idx].raw[Math.min(s.cp, s.lanes[s.idx].raw.length - 1)]) || null
  };
}

/* ---------- the gate's OWN geometry (never the core's) ---------- */
function crFlatten(stroke, step) {
  step = step || 0.8;
  const d = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  if (!stroke || stroke.length < 2) return (stroke || []).slice();
  const out = [];
  if (stroke.length === 2) {
    const n = Math.max(1, Math.ceil(d(stroke[0], stroke[1]) / step));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      out.push({ x: stroke[0].x + (stroke[1].x - stroke[0].x) * t,
                 y: stroke[0].y + (stroke[1].y - stroke[0].y) * t });
    }
    return out;
  }
  out.push({ x: stroke[0].x, y: stroke[0].y });
  for (let k = 0; k < stroke.length - 1; k++) {
    const p0 = stroke[k - 1] || stroke[k], p1 = stroke[k];
    const p2 = stroke[k + 1], p3 = stroke[k + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    const n = Math.max(2, Math.ceil((d(p1, p2) * 1.2) / step));
    for (let i = 1; i <= n; i++) {
      const t = i / n, mt = 1 - t;
      out.push({
        x: mt * mt * mt * p1.x + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * p2.x,
        y: mt * mt * mt * p1.y + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * p2.y
      });
    }
  }
  return out;
}
function arc(flat) {
  const cum = [0];
  for (let i = 1; i < flat.length; i++) cum.push(cum[i - 1] + Math.hypot(flat[i].x - flat[i - 1].x, flat[i].y - flat[i - 1].y));
  return cum;
}
/* a synthetic finger: walks the curve, stopping `short` units from the
   end, with +/- `wob`/2 of jitter. Deterministic per seed. */
function finger(stroke, short, wob, seed) {
  const flat = crFlatten(stroke), cum = arc(flat), total = cum[cum.length - 1];
  const stop = Math.max(0, total - (short || 0));
  let r = seed || 1;
  const rnd = () => { r = (r * 1103515245 + 12345) % 2147483648; return r / 2147483648 - 0.5; };
  const out = [];
  for (let i = 0; i < flat.length; i++) {
    if (cum[i] > stop) break;
    out.push({ x: flat[i].x + rnd() * (wob || 0), y: flat[i].y + rnd() * (wob || 0) });
  }
  if (!out.length && flat.length) out.push({ x: flat[0].x, y: flat[0].y });
  return out;
}
function strokeLen(stroke) { const f = crFlatten(stroke); const c = arc(f); return c[c.length - 1]; }

function play(STC, strokes, pts) {
  const s = STC.newTrace(strokes);
  for (const p of pts) STC.sample(s, p);
  return { verdict: STC.endStroke(s), state: s };
}

/* ---------- run ---------- */
function run(poison) {
  const box = load(poison);
  const STC = box.StrokeTraceCore;
  const A = box.AlphabetTraceCore, N = box.NumberTraceCore;

  const strokes = [];
  for (const ch of Object.keys(A.GLYPHS)) A.GLYPHS[ch].forEach((st, i) => strokes.push({ id: ch + '#' + i, st }));
  for (const dg of Object.keys(N.GLYPHS)) N.GLYPHS[dg].forEach((st, i) => strokes.push({ id: 'digit ' + dg + '#' + i, st }));
  const glyphs = [];
  for (const ch of Object.keys(A.GLYPHS)) glyphs.push({ id: ch, g: A.GLYPHS[ch] });
  for (const dg of Object.keys(N.GLYPHS)) glyphs.push({ id: 'digit ' + dg, g: N.GLYPHS[dg] });

  /* the dots of i and j are ~3 units: you tap them, you do not trace
     them, so they are exempt from the trace assertions by construction
     and named explicitly rather than silently filtered. */
  const traceable = strokes.filter(s => strokeLen(s.st) > 6);
  const dots = strokes.filter(s => strokeLen(s.st) <= 6);

  head('A  scope');
  /* ⚠ NOT a hardcoded stroke count. The first version asserted exactly
     126 and broke the moment the type panel legitimately made `9` and `5`
     two strokes each — a gate that fails on correct work teaches you to
     edit the gate. What actually needs guarding is that the gate has not
     silently shrunk its own scope, so assert the FLOOR and that every
     glyph in both tables really contributed. */
  ok(`at least 120 strokes under test (found ${strokes.length})`, strokes.length >= 120);
  ok(`62 glyphs under test (found ${glyphs.length})`, glyphs.length === 62);
  ok('every glyph contributed at least one stroke',
     glyphs.every(g => g.g.length >= 1) &&
     strokes.length === glyphs.reduce((n, g) => n + g.g.length, 0));
  ok(`exactly 2 dot strokes, and they are i/j (found ${dots.map(d => d.id).join(',')})`,
     dots.length === 2 && dots.every(d => /^[ij]#/.test(d.id)));

  head('B  an honest child must always succeed');
  for (const wob of [0, 2, 4, 6]) {
    let pass = 0; const miss = [];
    for (const s of traceable) {
      const r = play(STC, [s.st], finger(s.st, 0, wob, s.id.charCodeAt(0) * 7 + 3));
      if (r.verdict === 'formed') pass++; else if (miss.length < 6) miss.push(s.id);
    }
    ok(`a full trace with ${wob}u of wobble completes ${pass}/${traceable.length}` +
       (miss.length ? '  missed ' + miss.join(' ') : ''), pass === traceable.length);
  }
  {
    let pass = 0; const miss = [];
    for (const g of glyphs) {
      const s = STC.newTrace(g.g);
      let good = true;
      for (let k = 0; k < g.g.length; k++) {
        const pts = strokeLen(g.g[k]) <= 6 ? [g.g[k][0]] : finger(g.g[k], 0, 2, k + 11);
        for (const p of pts) STC.sample(s, p);
        const v = STC.endStroke(s);
        if (v === 'incomplete') { good = false; break; }
      }
      if (good && STC.isComplete(s)) pass++; else if (miss.length < 6) miss.push(g.id);
    }
    ok(`every whole glyph completes when traced in order ${pass}/62` +
       (miss.length ? '  missed ' + miss.join(' ') : ''), pass === 62);
  }

  head('C  THE COMPLAINT — stopping short must never complete');
  /* ⚠ STATE THE EXPECTATION THE DESIGN ACTUALLY MAKES.
     The core finishes a stroke when at most END_SLACK remains, because
     the ink is 5.4 units wide and a shortfall smaller than the pen is not
     visible to the child — that is what "finished" means here. So the
     assertion is not "0 at 4u"; it is "0 once more than a pen width
     remains", and the constant is pinned separately so it cannot drift
     upward later. My first version asserted 0 at 4u, which contradicted
     the design and would have pushed me to weaken END_SLACK to pass it.
     The 5u row is the boundary and is allowed a little slack because this
     file and the core flatten at different resolutions (0.8 vs 1.2), so
     "5 units short" is not the same number to both. */
  ok(`END_SLACK is at most 4u, inside the 5.4u ink (got ${STC.END_SLACK})`, STC.END_SLACK <= 4);
  for (const short of [6, 8, 12, 20, 40]) {
    let cheated = 0; const who = [];
    for (const s of traceable) {
      if (strokeLen(s.st) <= short + 6) continue;      /* nothing left to trace */
      const r = play(STC, [s.st], finger(s.st, short, 2, s.id.charCodeAt(0) * 5 + 1));
      if (r.verdict === 'formed') { cheated++; if (who.length < 6) who.push(s.id); }
    }
    ok(`stopping ${short}u short completes 0 strokes (got ${cheated})` +
       (who.length ? '  ' + who.join(' ') : ''), cheated === 0);
  }

  head('D  cheats — every one must be refused');
  {
    let n = 0, who = [];
    for (const s of traceable) {
      const f = crFlatten(s.st);
      const r = play(STC, [s.st], [f[Math.floor(f.length / 2)]]);
      if (r.verdict === 'formed') { n++; if (who.length < 5) who.push(s.id); }
    }
    ok(`one tap at the midpoint completes 0 (got ${n}) ${who.join(' ')}`, n === 0);
  }
  {
    let n = 0, who = [];
    for (const s of traceable) {
      const f = crFlatten(s.st);
      const r = play(STC, [s.st], [f[0], f[f.length - 1]]);
      if (r.verdict === 'formed') { n++; if (who.length < 5) who.push(s.id); }
    }
    ok(`tap the start then tap the end completes 0 (got ${n}) ${who.join(' ')}`, n === 0);
  }
  {
    let n = 0, who = [];
    for (const s of traceable) {
      const r = play(STC, [s.st], finger(s.st, 0, 0, 9).reverse());
      if (r.verdict === 'formed') { n++; if (who.length < 5) who.push(s.id); }
    }
    ok(`tracing it backwards completes 0 (got ${n}) ${who.join(' ')}`, n === 0);
  }
  {
    let n = 0;
    for (const s of traceable) {
      const r = play(STC, [s.st], [{ x: 2, y: 2 }, { x: 7, y: 9 }, { x: 3, y: 11 }, { x: 9, y: 4 }]);
      if (r.verdict === 'formed') n++;
    }
    ok(`a scribble far off the path completes 0 (got ${n})`, n === 0);
  }
  {
    /* leave the path perpendicular and rejoin further along. Skipped where
       the stroke curves back on itself and a normal would land ON it —
       the solver must be able to guarantee its own premise. */
    let n = 0, tested = 0, who = [];
    for (const s of traceable) {
      const f = crFlatten(s.st), c = arc(f), total = c[c.length - 1];
      if (total < 30) continue;
      const ia = Math.floor(f.length * 0.25), ib = Math.floor(f.length * 0.75);
      const norm = (i) => {
        const p = f[i], q = f[Math.min(i + 1, f.length - 1)];
        const dx = q.x - p.x, dy = q.y - p.y, m = Math.hypot(dx, dy) || 1;
        return { x: p.x - (dy / m) * 40, y: p.y + (dx / m) * 40 };
      };
      const oa = norm(ia), ob = norm(ib);
      const clear = (p) => f.every(q => Math.hypot(q.x - p.x, q.y - p.y) > 25);
      if (!clear(oa) || !clear(ob)) continue;
      tested++;
      const pts = f.slice(0, ia).concat([oa, ob]).concat(f.slice(ib));
      const r = play(STC, [s.st], pts);
      if (r.verdict === 'formed') { n++; if (who.length < 5) who.push(s.id); }
    }
    ok(`a perpendicular detour completes 0 of ${tested} (got ${n}) ${who.join(' ')}`, n === 0);
    ok(`the detour test actually ran on a meaningful set (${tested} strokes)`, tested >= 40);
  }
  {
    /* a straight chord in place of a genuine curve */
    let n = 0, tested = 0, who = [];
    const segD = (a, b, p) => {
      const vx = b.x - a.x, vy = b.y - a.y, wx = p.x - a.x, wy = p.y - a.y;
      const L2 = vx * vx + vy * vy; if (!L2) return Math.hypot(wx, wy);
      let t = (wx * vx + wy * vy) / L2; t = t < 0 ? 0 : t > 1 ? 1 : t;
      return Math.hypot(a.x + t * vx - p.x, a.y + t * vy - p.y);
    };
    for (const s of traceable) {
      const f = crFlatten(s.st), a = f[0], b = f[f.length - 1];
      const dev = Math.max(...f.map(p => segD(a, b, p)));
      if (dev <= 6) continue;                      /* straight: the chord IS the stroke */
      tested++;
      const pts = []; const steps = Math.max(10, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y)));
      for (let i = 0; i <= steps; i++) { const t = i / steps; pts.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }); }
      const r = play(STC, [s.st], pts);
      if (r.verdict === 'formed') { n++; if (who.length < 5) who.push(s.id); }
    }
    ok(`a straight chord across a real curve completes 0 of ${tested} (got ${n}) ${who.join(' ')}`, n === 0);
    ok(`the chord test actually ran on a meaningful set (${tested} strokes)`, tested >= 25);
  }
  {
    /* stroke ORDER is strict: the second stroke cannot be drawn first */
    let n = 0, tested = 0;
    for (const g of glyphs) {
      if (g.g.length < 2 || strokeLen(g.g[1]) <= 6) continue;
      tested++;
      const s = STC.newTrace(g.g);
      for (const p of finger(g.g[1], 0, 0, 4)) STC.sample(s, p);
      if (STC.endStroke(s) !== 'incomplete') n++;
    }
    ok(`the second stroke drawn first is refused on all ${tested} multi-stroke glyphs (got ${n} accepted)`, n === 0);
  }

  head('E  the ink must never run ahead of the finger');
  {
    /* At every prefix of an honest trace, the progress the core reports
       must not exceed the arc length the finger has actually covered.
       This is the invariant the whole rebuild exists to hold, so it is
       asserted directly rather than inferred from the verdicts above. */
    /* ⚠ COMPARE FRACTIONS, NOT LENGTHS. This file flattens at 0.8 and the
       core at 1.2, so the two measure a curve's total length slightly
       differently; multiplying the core's progress by THIS file's total
       mixes the two and reported a 1.82u "lead" on digit 2 that was pure
       unit mismatch. Both sides are fractions of their own arc length, so
       compare them as fractions. The bound is derived, not invented: the
       cursor can sit at most one tremor-dedupe plus one flattening step
       from the finger, and that is what is allowed. */
    let worst = 0, who = '';
    for (const s of traceable) {
      const f = crFlatten(s.st), c = arc(f), total = c[c.length - 1];
      const bound = STC.RESUME + STC.STEP;
      const st = STC.newTrace([s.st]);
      for (let i = 0; i < f.length; i++) {
        const r = STC.sample(st, f[i]);
        const lead = ((r.progress != null ? r.progress : 0) - c[i] / total) * total;
        if (lead > worst) { worst = lead; who = s.id + ' at ' + i + ' (bound ' + bound.toFixed(1) + 'u)'; }
      }
    }
    const bound = STC.RESUME + STC.STEP;
    ok(`the cursor never leads the finger by more than ${bound.toFixed(1)}u = resume window + one flattening step (worst ${worst.toFixed(2)}u ${who})`, worst <= bound);
  }

  head('F  dots are tapped, not traced');
  for (const d of dots) {
    const r = play(STC, [d.st], [d.st[0]]);
    ok(`${d.id} completes on a single tap`, r.verdict === 'formed');
    const far = play(STC, [d.st], [{ x: d.st[0].x + 30, y: d.st[0].y + 30 }]);
    ok(`${d.id} does not complete from 30u away`, far.verdict !== 'formed');
  }

  head('G  a mid-stroke lift must not destroy the work');
  {
    let kept = 0;
    for (const s of traceable.slice(0, 30)) {
      const f = crFlatten(s.st);
      const st = STC.newTrace([s.st]);
      for (const p of f.slice(0, Math.floor(f.length * 0.6))) STC.sample(st, p);
      const before = STC.progress(st);
      STC.endStroke(st);                      /* the child lifts to re-grip */
      const after = STC.progress(st);
      if (after >= before - 1e-9 && after > 0.3) kept++;
    }
    ok(`lifting mid-stroke preserves progress on 30/30 samples (got ${kept})`, kept === 30);
  }

  head('H  the curve the judge measures is the curve the child sees');
  {
    /* ⚠ MEASURE AGAINST THE CURVE, NOT AGAINST ANOTHER SAMPLING OF IT.
       Comparing the core's points to this file's points measures the gap
       between two sample GRIDS — worst case half a step, plus curvature —
       which is a property of the two step sizes and says nothing about
       fidelity. It reported 0.59u and I nearly loosened the bound to
       accept it. The real question is whether each of the core's points
       lies ON the true Bezier, so sample the exact curve finely and ask
       that. Answer: to well under a tenth of a unit. */
    const TRUE_STEP = 0.08;
    let worst = 0, who = '';
    for (const s of traceable) {
      const truth = crFlatten(s.st, TRUE_STEP);
      for (const p of STC.flatten(s.st)) {
        let best = Infinity;
        for (const q of truth) {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < best) best = d;
          if (best < 0.02) break;
        }
        if (best > worst) { worst = best; who = s.id; }
      }
    }
    ok(`every point the core flattens lies on the true Catmull-Rom within 0.1u (worst ${worst.toFixed(3)}u ${who})`, worst <= 0.1);
  }

  return { errs, checks };
}

/* ---------- main ---------- */
console.log('=== verify-stroke-trace-core ===');
const real = run(false);
const realErrs = real.errs, realChecks = real.checks;

if (POISON) {
  console.log('\n\n=== POISON: the ORIGINAL checkpoint tracer must FAIL this gate ===');
  errs = 0; checks = 0;
  const bad = run(true);
  console.log(`\npoisoned core: ${bad.errs} failures of ${bad.checks} checks`);
  if (bad.errs === 0) {
    console.log('\nGATE IS VACUOUS — the broken core passed every assertion.');
    process.exit(1);
  }
  console.log('the gate rejects the shipped tracer, as it must.');
  errs = realErrs; checks = realChecks;
}

console.log(`\n${realErrs === 0 ? 'PASS' : 'FAIL'}  ${realChecks - realErrs}/${realChecks} checks`);
process.exit(realErrs === 0 ? 0 : 1);
