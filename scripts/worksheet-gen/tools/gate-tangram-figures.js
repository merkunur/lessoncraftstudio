#!/usr/bin/env node
/**
 * gate-tangram-figures.js — data/b4/tangram-figures.js (K-353 `tangram`)
 * against the design's §5 rules, in node, with its OWN geometry checks over
 * primitives/tangram.js (never the bank's memoised derivations). Runs in
 * deploy.sh beside the b3 gates; refuses to run on an empty bank; every rule
 * is a failure line, exit 1 on any real failure OR any silent poison.
 *
 *   (1)  every id in TANS; a FIGURE has exactly the 7 ids once; a SUB 3..6
 *        distinct ids; a MINI 2..3 ids within the multiplicities (<= 2 L, 1 M,
 *        2 S, 1 Q, 1 P)
 *   (2)  rot % 45 === 0; flip only on P
 *   (3)  area: FIGURES and SET sum to 1 (1e-9); SUBS / MINIS to their tans
 *   (4)  no two tans overlap: pairwise clip area < 1e-9 (touching allowed)
 *   (5)  edge-connected: shared collinear opposite segments > 1e-6 form a
 *        connected graph; corner-only touching does not count
 *   (6)  silhouette: one loop, area = the tan area sum; the symmetry group
 *        DIFFED against the design's table (a silent change of a figure
 *        changes F4's distractor set)
 *   (7)  MINIS: every pool mini reports exactly 1 tiling under the lattice
 *        tiler (a CONCAVE-capable containment: ear-clipped triangles);
 *        controls: `sq-from-2s` and `rect-m-2s` (MINI_REFUSED) report 2;
 *        the concave sub-figure `cat-head` reports 1 and `rabbit-head` 4
 *        (the scratch's convex clipper returned 0 on both); `l-from-2s-q`
 *        reports 1 — the design's "2" was a −0.00000 key artefact of the
 *        scratch tiler (measured 2026-09-21, see _work/K-353-build.md), so
 *        it is a proven-unique CANDIDATE (MINI_CANDIDATES), in no pool
 *   (8)  F4 eligibility: `square` refused; every F4 pool figure has >= 2
 *        transforms outside its group
 *   (9)  F5: outlineKind === 'other' for every d2 set; triangles in 1..4,
 *        tans in 3..6; the pool covers >= 3 triangle values and both square
 *        values; SUBS_EXCLUDED entries FAIL the outline rule (so the rule is
 *        proven live)
 *   (10) per-face pool floors at the SHIPPED body heights 722 and 677: base
 *        >= 2, F1 >= 4 with >= 2 in each of pool2 / pool3, F2 >= 4, F3 >= 4
 *        figures, F4 >= 3, F5 >= 4
 *   (11) keys unique across FIGURES + MINIS + SUBS (a sub may reuse a mini's
 *        key with the SAME placements), ASCII slug shape; every key a face
 *        pool names exists
 *   (12) no `name`, no label, no string in any locale lives in the file
 * Poison (each must FAIL for its own rule; the real bank is the control):
 *   P1 a figure with S1 twice and no S2 → rule 1 · P2 two tans overlapping
 *   → rule 4 · P3 tans touching at a corner only → rule 5 · P4 `sq-from-2s`
 *   in the F1 pool (2 tilings) → rule 7 · P5 `square` in the F4 pool → rule
 *   8 · P12 `half-h` in the F5 pool → rule 9 (triangle outline) · P13 a full
 *   figure in the F5 pool → rule 9 (tans 7 > 6) · P16 a figure of area 15/16
 *   (a tan dropped) → rule 3 / rule 1 · P6' a symmetry-table row edited →
 *   rule 6 · P7' a mini with a flipped M → rule 2 · P11' a pool naming a
 *   missing key → rule 11 · P12' a string in the file → rule 12
 *
 *   node tools/gate-tangram-figures.js            the rules + the poisons
 *   require(...).check(bankLike) → [failures]      (the qa gate re-uses it)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const P = require('../primitives/tangram.js');

const BANK_FILE = path.join(__dirname, '..', 'data', 'b4', 'tangram-figures.js');
const MULT = { L: 2, M: 1, S: 2, Q: 1, P: 1 };
const FULL = ['L1', 'L2', 'M', 'S1', 'S2', 'Q', 'P'];
const KEY_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function ownAnalysis(tans, kind) {
  const f = [];
  const ids = tans.map((t) => t.id);
  if (ids.some((id) => !FULL.includes(id))) f.push('rule 1: unknown id ' + ids.filter((id) => !FULL.includes(id)).join(' '));
  if (new Set(ids).size !== ids.length) f.push('rule 1: an id twice (' + ids.join(' ') + ')');
  if (kind === 'figure' && ids.slice().sort().join() !== FULL.slice().sort().join()) f.push('rule 1: a FIGURE needs exactly the 7 ids (' + ids.join(' ') + ')');
  if (kind === 'sub' && (ids.length < 2 || ids.length > 6)) f.push('rule 1: a SUB needs 2..6 tans (' + ids.length + ')');
  if (kind === 'mini' && (ids.length < 2 || ids.length > 3)) f.push('rule 1: a MINI needs 2..3 tans (' + ids.length + ')');
  const per = {};
  for (const id of ids) { const c = id[0]; per[c] = (per[c] || 0) + 1; if (MULT[c] && per[c] > MULT[c]) f.push(`rule 1: class ${c} used ${per[c]} > ${MULT[c]}`); }
  for (const t of tans) {
    if (!Number.isFinite(t.x) || !Number.isFinite(t.y)) f.push('rule 2: ' + t.id + ' non-numeric position');
    if ((t.rot || 0) % 45 !== 0) f.push('rule 2: ' + t.id + ' rot ' + t.rot);
    if (t.flip && t.id[0] !== 'P') f.push('rule 2: flip on ' + t.id);
  }
  if (f.length) return { f };
  const polys = tans.map(P.placeUnit);
  const expected = tans.reduce((a, t) => a + P.TANS[t.id[0]].area, 0);
  const area = polys.reduce((a, p) => a + Math.abs(P.polyArea(p)), 0);
  if (Math.abs(area - expected) > 1e-9) f.push(`rule 3: area ${area.toFixed(6)} != ${expected.toFixed(6)}`);
  if (kind === 'figure' && Math.abs(expected - 1) > 1e-9) f.push('rule 3: a FIGURE must sum to 1');
  const adj = polys.map(() => new Set());
  for (let i = 0; i < polys.length; i++) for (let j = i + 1; j < polys.length; j++) {
    const ov = P.clipArea(polys[i], polys[j]);
    if (ov > 1e-9) f.push(`rule 4: ${tans[i].id} overlaps ${tans[j].id} by ${ov.toFixed(6)}`);
    if (P.contactLength(polys[i], polys[j]) > 1e-6) { adj[i].add(j); adj[j].add(i); }
  }
  const seen = new Set([0]); const st = [0];
  while (st.length) { const v = st.pop(); adj[v].forEach((w) => { if (!seen.has(w)) { seen.add(w); st.push(w); } }); }
  if (seen.size !== polys.length) f.push(`rule 5: not edge-connected (${seen.size}/${polys.length})`);
  const loops = P.silhouetteOf(polys);
  if (loops.length !== 1 || !loops[0]) f.push(`rule 6: silhouette is ${loops.length} loop(s)`);
  else if (Math.abs(Math.abs(P.polyArea(loops[0])) - expected) > 1e-9) f.push('rule 6: silhouette area != tan area');
  return { f, loop: loops[0] || null, polys };
}

/** Every rule over a bank-like object; returns the failure lines. */
function check(B, opts = {}) {
  const F = [];
  const tables = [['figure', B.FIGURES], ['mini', B.MINIS], ['mini', B.MINI_REFUSED || {}], ['mini', B.MINI_CANDIDATES || {}], ['sub', B.SUBS], ['sub', B.SUBS_EXCLUDED || {}]];
  if (!B.FIGURES || !Object.keys(B.FIGURES).length) { F.push('empty bank (no FIGURES) — refuse to run'); return F; }
  const loops = {};
  for (const [kind, table] of tables) for (const [k, tans] of Object.entries(table)) {
    if (!KEY_RE.test(k)) F.push(`rule 11: key "${k}" is not an ASCII slug`);
    const a = ownAnalysis(tans, kind);
    for (const x of a.f) F.push(`${kind} ${k}: ${x}`);
    loops[kind + ':' + k] = a.loop;
  }
  // rule 3 (SET) + rule 6 (the symmetry table diff)
  if (B.SET !== B.FIGURES.square) F.push('rule 3: SET is not FIGURES.square');
  for (const [k, want] of Object.entries(B.SYMMETRY_TABLE || {})) {
    const loop = loops['figure:' + k];
    if (!loop) { F.push(`rule 6: symmetry table names ${k} which has no silhouette`); continue; }
    const got = P.TRANSFORM_NAMES.filter((n) => {
      const snap = (v) => (Math.abs(v) < 5e-7 ? 0 : v); const norm = (pts) => { const b = P.bboxOf([pts]); return pts.map((p) => [snap(p[0] - b.x0).toFixed(6), snap(p[1] - b.y0).toFixed(6)].join(',')).sort().join('|'); };
      return norm(loop.map((p) => P.TRANSFORMS[n](p))) === norm(loop);
    });
    if (got.join() !== want.join()) F.push(`rule 6: ${k} symmetry group derived [${got.join(' ')}] != table [${want.join(' ')}]`);
  }
  for (const k of Object.keys(B.FIGURES)) if (!(B.SYMMETRY_TABLE || {})[k]) F.push(`rule 6: figure ${k} has no row in the symmetry table`);
  // rule 7: the tiler (skippable for the fast poison runs that do not touch it)
  if (!opts.skipTiler) {
    const count = (tans) => { const a = ownAnalysis(tans, 'sub'); if (!a.loop) return -1; return P.countTilings(a.loop, tans.map((t) => t.id[0])); };
    for (const k of [...(B.F1_POOL2 || []), ...(B.F1_POOL3 || [])]) {
      const tans = B.MINIS[k];
      if (!tans) { F.push(`rule 7: F1 pool names unknown mini ${k}`); continue; }
      const n = count(tans);
      if (n !== 1) F.push(`rule 7: mini ${k} has ${n} tilings (the F1 pool needs exactly 1)`);
    }
    const controls = { 'sq-from-2s': 2, 'rect-m-2s': 2 };
    for (const [k, want] of Object.entries(controls)) {
      const tans = (B.MINI_REFUSED || {})[k];
      if (!tans) { F.push(`rule 7: control ${k} missing from MINI_REFUSED`); continue; }
      const n = count(tans);
      if (n !== want) F.push(`rule 7: control ${k} reports ${n}, expected ${want} (the tiler is broken)`);
    }
    for (const [k, want] of Object.entries({ 'cat-head': 1, 'rabbit-head': 4 })) {   // concave controls
      const tans = (B.SUBS || {})[k];
      if (!tans) { F.push(`rule 7: concave control ${k} missing from SUBS`); continue; }
      const n = count(tans);
      if (n !== want) F.push(`rule 7: concave control ${k} reports ${n}, expected ${want} (containment is not concave-capable)`);
    }
    for (const [k, tans] of Object.entries(B.MINI_CANDIDATES || {})) { const n = count(tans); if (n !== 1) F.push(`rule 7: candidate ${k} reports ${n} (a candidate is a PROVEN-unique mini in no pool)`); }
    if (opts.recordTilings) opts.recordTilings.push(...Object.keys(B.MINIS).map((k) => [k, count(B.MINIS[k])]));
  }
  // rule 8
  if (!(B.F4_REFUSED || []).includes('square')) F.push('rule 8: square must be F4_REFUSED');
  for (const k of B.F4_POOL || []) {
    if ((B.F4_REFUSED || []).includes(k)) F.push(`rule 8: ${k} is in the F4 pool AND refused`);
    const row = (B.SYMMETRY_TABLE || {})[k] || [];
    const outside = P.TRANSFORM_NAMES.filter((t) => !row.includes(t)).length;
    if (outside < 2) F.push(`rule 8: ${k} has ${outside} transforms outside its group (needs >= 2)`);
  }
  // rule 9
  const triVals = new Set(), sqVals = new Set();
  for (const k of B.F5_POOL || []) {
    const tans = B.SUBS[k];
    if (!tans) { F.push(`rule 9: F5 pool names unknown sub ${k}`); continue; }
    const loop = loops['sub:' + k];
    const kind = kindOf(loop);
    if (kind !== 'other') F.push(`rule 9: ${k} outline is a ${kind} (a K child counts the outline too)`);
    const tri = tans.filter((t) => 'LMS'.includes(t.id[0])).length, sq = tans.filter((t) => t.id[0] === 'Q').length;
    if (tans.length < 3 || tans.length > 6) F.push(`rule 9: ${k} has ${tans.length} tans (3..6)`);
    if (tri < 1 || tri > 4) F.push(`rule 9: ${k} has ${tri} triangles (1..4)`);
    triVals.add(tri); sqVals.add(sq);
  }
  if ((B.F5_POOL || []).length && triVals.size < 3) F.push(`rule 9: the F5 pool covers ${triVals.size} triangle values (< 3)`);
  if ((B.F5_POOL || []).length && !(sqVals.has(0) && sqVals.has(1))) F.push('rule 9: the F5 pool lacks a square value (0 and 1 both needed)');
  for (const k of Object.keys(B.SUBS_EXCLUDED || {})) { const loop = loops['sub:' + k]; const tans = B.SUBS_EXCLUDED[k]; if (kindOf(loop) === 'other' && tans.length >= 3) F.push(`rule 9: SUBS_EXCLUDED ${k} passes the outline rule — why is it excluded?`); }
  // rule 10 (the loader's poolFor at both shipped heights)
  if (typeof B.poolFor === 'function') {
    const floors = [['base', { S: 216 }, 2], ['compose', { S: 216 }, 4], ['silhouette', { S: 216 }, 4], ['missing', { S: 128, chipW: 104, pad: 1.5 }, 4], ['match', { S: 102, box: 160, pad: 1.5 }, 3], ['count', { S: 160 }, 4]];
    for (const [face, cfg, min] of floors) for (const H of [722, 677]) {
      let pool;
      try { pool = B.poolFor(face, cfg, H); } catch (e) { F.push(`rule 10: poolFor(${face}) threw ${e.message}`); continue; }
      if (pool.length < min) F.push(`rule 10: ${face} pool at ${H} = ${pool.length} < ${min} [${pool.join(' ')}]`);
      if (face === 'compose') {
        const p2 = pool.filter((k) => (B.F1_POOL2 || []).includes(k)).length, p3 = pool.filter((k) => (B.F1_POOL3 || []).includes(k)).length;
        if (p2 < 2 || p3 < 2) F.push(`rule 10: compose pool at ${H} has ${p2} two-tan / ${p3} three-tan minis (>= 2 each)`);
      }
    }
  } else F.push('rule 10: the bank exports no poolFor');
  // rule 11
  const seen = new Map();
  const noteKey = (kind, k, tans) => { const prev = seen.get(k); if (prev && prev.tans !== tans && JSON.stringify(prev.tans) !== JSON.stringify(tans)) F.push(`rule 11: key "${k}" used by ${prev.kind} and ${kind} with different placements`); if (!prev) seen.set(k, { kind, tans }); };
  for (const [kind, table] of tables) for (const [k, tans] of Object.entries(table)) noteKey(kind, k, tans);
  for (const k of [...(B.BASE_POOL || []), ...(B.F2_POOL || []), ...(B.F3_POOL || []), ...(B.F4_POOL || [])]) if (!B.FIGURES[k]) F.push(`rule 11: a face pool names unknown figure ${k}`);
  for (const k of [...(B.F1_POOL2 || []), ...(B.F1_POOL3 || [])]) if (!B.MINIS[k]) F.push(`rule 11: the F1 pool names unknown mini ${k}`);
  for (const k of B.F5_POOL || []) if (!B.SUBS[k]) F.push(`rule 11: the F5 pool names unknown sub ${k}`);
  if ((B.BASE_POOL || []).includes('square')) F.push('rule 11: square in the BASE pool (it is the template)');
  // rule 12: no string values in any table entry
  for (const [kind, table] of tables) for (const [k, tans] of Object.entries(table)) for (const t of tans) for (const [prop, v] of Object.entries(t)) if (prop !== 'id' && typeof v === 'string') F.push(`rule 12: ${kind} ${k}.${t.id}.${prop} is a string ("${v}") — no label lives in this file`);
  if (opts.source && /\b(name|label|title)\s*:/.test(opts.source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''))) F.push('rule 12: the file source carries a name / label / title property');
  return F;
}
function kindOf(loop) {
  if (!loop) return 'other';
  if (loop.length === 3) return 'triangle';
  if (loop.length === 4) {
    const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const sides = loop.map((p, i) => d(p, loop[(i + 1) % 4]));
    if (sides.every((s) => Math.abs(s - sides[0]) < 1e-6) && Math.abs(d(loop[0], loop[2]) - d(loop[1], loop[3])) < 1e-6) return 'square';
  }
  return 'other';
}

function loadBank() { delete require.cache[require.resolve(BANK_FILE)]; return require(BANK_FILE).TANGRAM_FIGURES; }
const clone = (o) => JSON.parse(JSON.stringify(o));

function main() {
  const B = loadBank();
  const source = fs.readFileSync(BANK_FILE, 'utf8');
  const t0 = Date.now();
  const tilings = [];
  const real = check(B, { source, recordTilings: tilings });
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  // poisons: a shallow copy of the bank with ONE table / pool edited; `check` runs its own geometry
  const T = (id, x, y, rot, flip) => ({ id, x, y, rot, flip: !!flip });
  const h = Math.SQRT2 / 4;
  const with_ = (edit) => { const b = { ...B, FIGURES: clone(B.FIGURES), MINIS: clone(B.MINIS), MINI_REFUSED: clone(B.MINI_REFUSED), SUBS: clone(B.SUBS), SUBS_EXCLUDED: clone(B.SUBS_EXCLUDED), SYMMETRY_TABLE: clone(B.SYMMETRY_TABLE), F1_POOL2: B.F1_POOL2.slice(), F1_POOL3: B.F1_POOL3.slice(), F4_POOL: B.F4_POOL.slice(), F5_POOL: B.F5_POOL.slice(), BASE_POOL: B.BASE_POOL.slice() }; b.SET = b.FIGURES.square; edit(b); return b; };
  const poisons = [
    ['P1 a figure with S1 twice and no S2', (b) => { b.FIGURES.tree = b.FIGURES.tree.map((t) => (t.id === 'S2' ? { ...t, id: 'S1' } : t)); }, /rule 1/, true],
    ['P2 two tans overlapping 0.5 unit²', (b) => { b.FIGURES.square = b.FIGURES.square.map((t) => (t.id === 'L2' ? { ...t, x: 0, rot: 0 } : t)); b.SET = b.FIGURES.square; }, /rule 4/, true],
    ['P3 tans touching at a corner only', (b) => { b.MINIS['m-from-2s'] = [T('S1', 0, 0, 0), T('S2', 0.5, 0, 180)].map((t) => (t.id === 'S2' ? { ...t, x: 0.5, y: 0.5, rot: 180 } : t)); }, /rule 5/, true],
    ['P4 sq-from-2s (2 tilings) in the F1 pool', (b) => { b.MINIS['sq-from-2s'] = b.MINI_REFUSED['sq-from-2s']; delete b.MINI_REFUSED['sq-from-2s']; b.F1_POOL2.push('sq-from-2s'); }, /rule 7: mini sq-from-2s has 2/, false],
    ['P5 square in the F4 pool', (b) => { b.F4_POOL.push('square'); }, /rule 8/, true],
    ['P12 half-h in the F5 pool', (b) => { b.SUBS['half-h'] = b.SUBS_EXCLUDED['half-h']; delete b.SUBS_EXCLUDED['half-h']; b.F5_POOL.push('half-h'); }, /rule 9: half-h outline is a triangle/, true],
    ['P13 a full figure in the F5 pool', (b) => { b.SUBS.tree = b.FIGURES.tree; b.F5_POOL.push('tree'); }, /rule 9: tree has 7 tans/, true],
    ['P16 a figure of area 15/16 (S2 dropped)', (b) => { b.FIGURES.arrow = b.FIGURES.arrow.filter((t) => t.id !== 'S2'); }, /figure arrow: rule 1|rule 3/, true],
    ["P6' the symmetry table lists rectangle as mirror-free", (b) => { b.SYMMETRY_TABLE.rectangle = ['id', 'rot180']; }, /rule 6: rectangle/, true],
    ["P7' a flipped M in a mini", (b) => { b.MINIS['trap-m-s'] = b.MINIS['trap-m-s'].map((t) => (t.id === 'M' ? { ...t, flip: true } : t)); }, /rule 2/, true],
    ["P11' a pool naming a missing key", (b) => { b.F5_POOL.push('dragon'); }, /rule 11|rule 9: F5 pool names unknown/, true],
    ["P12' a label in a placement", (b) => { b.FIGURES.cat = b.FIGURES.cat.map((t) => (t.id === 'Q' ? { ...t, name: 'head' } : t)); }, /rule 12/, true],
    ["P10' an F2 pool of two", (b) => { b.poolFor = (face, cfg, H) => (face === 'silhouette' ? ['tree', 'arrow'] : B.poolFor(face, cfg, H)); }, /rule 10: silhouette/, true],
  ];
  let killed = 0;
  for (const [name, mut, want, skipTiler] of poisons) {
    let r;
    try { r = check(with_(mut), { skipTiler }); } catch (e) { r = ['threw ' + e.message]; }
    const ok = r.some((x) => want.test(x));
    console.log('  poison ' + name + ': ' + (ok ? 'KILLED' : 'SURVIVED — ' + (r[0] || 'no fault')));
    if (ok) killed++;
  }
  console.log(`tangram-figures: ${Object.keys(B.FIGURES).length} figures · ${Object.keys(B.MINIS).length} minis (${tilings.map(([k, n]) => k + ':' + n).join(' ')}) · ${Object.keys(B.SUBS).length} subs · ${real.length} failures · poison ${killed}/${poisons.length} · ${secs}s`);
  real.slice(0, 40).forEach((x) => console.log('  FAIL ' + x));
  process.exit(real.length || killed !== poisons.length ? 1 : 0);
}

if (require.main === module) main();
module.exports = { check, ownAnalysis, kindOf };
