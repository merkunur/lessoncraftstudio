/**
 * hm-rules.js — the RULES of the b8 Handmade Mazes label faces (design: K-405-maze-puzzles.md §3 F9-F19, P1).
 *
 * On a LOOPED page many physical paths reach the goal; exactly ONE obeys the face's rule, and the labels are what
 * decide it (pedagogy P1: on a tree the labels would be decoration). One pure module serves two masters:
 *   - the generator assigns labels (route = the rule's answer, decoys = near misses) and PROVES uniqueness by
 *     exhaustive simple-path search;
 *   - the robot's oracle recomputes the one valid path from the printed labels alone (never from the stored answer).
 *
 * A rule = { kind, valid(pathLabels, path) → bool, ... }. Labels live on interior stations; the two mouth stations
 * carry none. Kinds:
 *   seq      the interior labels read exactly seq[0..N-1] (letters, numbers 1-20, skip counting)
 *   pred     every interior label is GOOD (sums that make 10, differences = target, first sound)
 *   ops      start value + the interior ops lands exactly on target (running total)
 *   collect  the path visits every item station (labels 'item' / '')
 *   avoid    the path visits no obstacle station (labels 'obstacle' / '')
 */
'use strict';
const H = require('./hm-graph.js');

// ---------------------------------------------------------------------------------------------------- sequences
const LOOKALIKE_UPPER = { E: ['F'], F: ['E'], M: ['N', 'W'], N: ['M'], W: ['M'], O: ['Q', 'C'], Q: ['O'], P: ['R', 'B'], R: ['P'], B: ['P', 'D'], C: ['G', 'O'], G: ['C'], U: ['V'], V: ['U'], I: ['J', 'L'], J: ['I'], Å: ['A'], Ä: ['A'], Ö: ['O'], Ø: ['O'], Æ: ['A'], Ñ: ['N'] };
const REVERSAL_LOWER = { b: ['d'], d: ['b'], p: ['q'], q: ['p'], m: ['w'], w: ['m'], n: ['u'], u: ['n'] };
const LOOKALIKE_LOWER = { h: ['n'], n: ['h', 'u'], i: ['j', 'l'], j: ['i'], f: ['t'], t: ['f'], a: ['o'], o: ['a', 'c'], c: ['o', 'e'], e: ['c'], å: ['a'], ä: ['a'], ö: ['o'], ø: ['o'], æ: ['a'], ñ: ['n'] };

/** near-miss candidates for a decoy beside a route stone whose NEXT label is seq[i+1] */
function nearMisses(seq, i, kind) {
  const next = seq[i + 1], out = [];
  if (next === undefined) return out;
  if (seq[i + 2] !== undefined) out.push(seq[i + 2]);   // next + 1 (a skipped step)
  out.push(seq[i]);                                    // a repeat of the current one
  if (kind === 'lower') { for (const r of (REVERSAL_LOWER[next] || [])) out.unshift(r); for (const l of (LOOKALIKE_LOWER[next] || [])) out.push(l); }
  if (kind === 'upper') for (const l of (LOOKALIKE_UPPER[next] || [])) out.push(l);
  if (kind === 'number') {
    const n = +next, step = +seq[1] - +seq[0];
    const s = String(n); if (s.length === 2 && s[0] !== s[1]) out.unshift(s[1] + s[0]);   // digit reversal 13 ↔ 31
    out.push(String(n + step), String(n - 1), String(n + 1));
    if (step === 5) out.push(String(n + 10), String(n + 15));
  }
  return [...new Set(out.map(String))].filter((v) => v !== String(next));
}

/**
 * assign SEQUENCE labels. route = [s, r1 … rN, g]; every other station with neighbours gets a decoy under the
 * FORWARD RULE: no station may carry the successor of a neighbour's label unless both are consecutive route stones,
 * and no decoy carries seq[0]. Decoys prefer near misses (reversals first on the lowercase face). null = cannot.
 */
function assignSequence(adj, route, seq, rnd, kind) {
  const N = seq.length; if (route.length !== N + 2) return null;
  const label = new Map(); route.slice(1, -1).forEach((v, i) => label.set(v, String(seq[i])));
  const pos = new Map(); route.forEach((v, i) => pos.set(v, i));
  const idx = new Map(seq.map((v, i) => [String(v), i]));
  const succ = (l) => { const i = idx.get(l); return i === undefined ? undefined : (seq[i + 1] !== undefined ? String(seq[i + 1]) : undefined); };
  const okAt = (v, l) => {
    if (l === String(seq[0])) return false;
    for (const u of adj[v]) {
      const lu = label.get(u); if (lu === undefined) continue;
      const consecutive = pos.has(u) && pos.has(v) && Math.abs(pos.get(u) - pos.get(v)) === 1;
      if (consecutive) continue;
      if (succ(lu) === l || succ(l) === lu) return false;
    }
    return true;
  };
  // decoy stations in BFS order from the route (stations nearer the route are decided first)
  const order = []; const seen = new Set(route); let frontier = route.slice();
  while (frontier.length) { const nx = []; for (const v of frontier) for (const u of adj[v]) if (!seen.has(u) && adj[u].length) { seen.add(u); order.push(u); nx.push(u); } frontier = nx; }
  let near = 0, beside = 0, reversals = 0;   // near-miss share is measured where the child CHOOSES: decoys beside a route stone
  for (const v of order) {
    const routeNb = adj[v].filter((u) => pos.has(u) && pos.get(u) > 0 && pos.get(u) < route.length - 1);
    let cands = [];
    for (const u of routeNb) cands = cands.concat(nearMisses(seq, pos.get(u) - 1, kind));
    cands = H.shuffle([...new Set(cands)], rnd);
    let pick = cands.find((l) => idx.has(l) || kind === 'number' ? okAt(v, l) : false);
    if (pick !== undefined && kind !== 'number' && !idx.has(pick)) pick = undefined;
    if (routeNb.length) beside++;
    if (pick !== undefined && routeNb.length) near++;
    if (pick !== undefined && kind === 'lower' && routeNb.some((u) => (REVERSAL_LOWER[String(seq[pos.get(u)])] || []).includes(pick))) reversals++;
    else { const pool = H.shuffle(seq.map(String), rnd); pick = pool.find((l) => okAt(v, l)); }
    if (pick === undefined) return null;
    label.set(v, pick);
  }
  return { label, decoys: order.length, nearShare: beside ? near / beside : 1, reversals };
}

/** the sequence rule over a path's interior labels */
const seqRule = (seq) => ({ kind: 'seq', valid: (labels) => labels.length === seq.length && labels.every((l, i) => l === String(seq[i])) });

// ---------------------------------------------------------------------------------------------------- predicates
const MINUS = '−', THIN = ' ';
const fact = (a, op, b) => a + THIN + (op === '-' ? MINUS : '+') + THIN + b;
/** evaluate a printed fact "a + b" / "a − b" (the oracle reads the PRINTED label, never the generator's data) */
function evalFact(s) {
  const m = String(s).replace(/ /g, ' ').match(/^\s*(\d+)\s*([+−-])\s*(\d+)\s*$/);
  if (!m) return NaN;
  return m[2] === '+' ? +m[1] + +m[3] : +m[1] - +m[3];
}
/**
 * the facts for a predicate face. op '+' (make-N: every route stone sums to target) or '-' (every route stone's
 * difference is target). good = the true facts (distinct, commuted pairs distinct); bad = near misses (target ± 1)
 * sharing an operand range with the good ones, so the child must COMPUTE at each junction.
 */
function factPools({ op, target, a, b }) {
  const good = [], bad = [];
  for (let x = a[0]; x <= a[1]; x++) for (let y = b[0]; y <= b[1]; y++) {
    const v = op === '+' ? x + y : x - y;
    if (op === '-' && v < 0) continue;
    if (v === target) good.push(fact(x, op, y));
    else if (Math.abs(v - target) === 1) bad.push(fact(x, op, y));
  }
  return { good, bad };
}
/** route interior = distinct good facts; every decoy station a bad fact (distinct where the pool allows) */
function assignPredicate(adj, route, pools, rnd) {
  const interior = route.slice(1, -1);
  if (pools.good.length < interior.length) return null;
  const label = new Map(); const goods = H.shuffle(pools.good, rnd).slice(0, interior.length);
  interior.forEach((v, i) => label.set(v, goods[i]));
  const onR = new Set(route); const order = [];
  for (let v = 0; v < adj.length; v++) if (adj[v].length && !onR.has(v)) order.push(v);
  let bads = H.shuffle(pools.bad, rnd); let k = 0;
  for (const v of order) { if (k >= bads.length) { bads = bads.concat(H.shuffle(pools.bad, rnd)); } label.set(v, bads[k++]); }
  return { label, decoys: order.length, nearShare: 1 };
}
const predRule = (stamp) => ({ kind: 'pred', valid: (labels) => labels.every((l) => evalFact(l) === stamp.target) });

// ---------------------------------------------------------------------------------------------------- running total
const opLabel = (v) => (v >= 0 ? '+' : MINUS) + Math.abs(v);
const opValue = (s) => { const m = String(s).match(/^([+−-])(\d+)$/); return m ? (m[1] === '+' ? +m[2] : -m[2]) : NaN; };
/**
 * route interior = ops from opSet keeping every running total inside range (start drawn from startRange);
 * target = the route's final total; decoys = ops from the same set. Gates (design F19): the route never touches
 * the target before its last stone. Uniqueness is the caller's search.
 */
function assignOps(adj, route, rnd, { opSet, startRange, range }) {
  const interior = route.slice(1, -1);
  for (let attempt = 0; attempt < 40; attempt++) {
    const start = startRange[0] + Math.floor(rnd() * (startRange[1] - startRange[0] + 1));
    let tot = start; const ops = []; let ok = true;
    for (let i = 0; i < interior.length; i++) {
      const cands = H.shuffle(opSet.filter((o) => tot + o >= range[0] && tot + o <= range[1]), rnd);
      if (!cands.length) { ok = false; break; }
      ops.push(cands[0]); tot += cands[0];
    }
    if (!ok) continue;
    const target = tot;
    let run = start, early = false;
    for (let i = 0; i < ops.length - 1; i++) { run += ops[i]; if (run === target) early = true; }
    if (early || target === start) continue;
    const label = new Map(); interior.forEach((v, i) => label.set(v, opLabel(ops[i])));
    const onR = new Set(route);
    let decoys = 0;
    for (let v = 0; v < adj.length; v++) if (adj[v].length && !onR.has(v)) { label.set(v, opLabel(opSet[Math.floor(rnd() * opSet.length)])); decoys++; }
    return { label, decoys, nearShare: 1, start, target };
  }
  return null;
}
const opsRule = (stamp) => ({ kind: 'ops', valid: (labels) => labels.reduce((t, l) => t + opValue(l), stamp.start) === stamp.target });

// ---------------------------------------------------------------------------------------------------- first sound
/**
 * route interior = /l/ cards of the locale (distinct, the reviewed pool data/hm/sound-pools.json); decoys = stop /
 * vowel onsets, at least laterLMin of them CONTAINING an l later (so spotting the letter inside a word fails).
 * Labels are picture srcs; the rule checks membership in the locale's L set (the oracle reads the stamped set).
 */
function assignSound(adj, route, pool, rnd, laterLMin = 3) {
  const interior = route.slice(1, -1);
  if (pool.l.length < interior.length) return null;
  const label = new Map(); const ls = H.shuffle(pool.l, rnd).slice(0, interior.length);
  interior.forEach((v, i) => label.set(v, ls[i].src));
  const onR = new Set(route); const order = []; for (let v = 0; v < adj.length; v++) if (adj[v].length && !onR.has(v)) order.push(v);
  // look-alike families (read on the rendered page 2026-10-11: an antelope beside a deer reads as the same card twice):
  // at most one deer-like animal, two flowers, two birds on one page
  const famOf = (src) => (/\/(deer|antelope|gazelle|reindeer|moose|elk|fawn)/.test(src) ? 'deer' : /^flowers\//.test(src) ? 'flower' : /^birds( 2)?\//.test(src) ? 'bird' : null);
  const CAP = { deer: 1, flower: 2, bird: 2 };
  const used = {}; const fits = (d) => { const f = famOf(d.src); return !f || (used[f] || 0) < CAP[f]; };
  const take = (d) => { const f = famOf(d.src); if (f) used[f] = (used[f] || 0) + 1; return d; };
  const later = H.shuffle(pool.decoy.filter((d) => d.laterL), rnd), rest = H.shuffle(pool.decoy.filter((d) => !d.laterL), rnd);
  const need = Math.min(laterLMin, order.length);
  const picks = [];
  for (const d of later) { if (picks.length >= need) break; if (fits(d)) picks.push(take(d)); }
  for (const d of H.shuffle(later.filter((x) => !picks.includes(x)).concat(rest), rnd)) { if (picks.length >= order.length) break; if (fits(d)) picks.push(take(d)); }
  if (picks.length < order.length) return null;
  H.shuffle(order, rnd).forEach((v, i) => label.set(v, picks[i].src));
  return { label, decoys: order.length, nearShare: 1, laterL: picks.filter((p) => p.laterL).length };
}
const soundRule = (stamp) => { const good = new Set(stamp.good); return { kind: 'sound', valid: (labels) => labels.every((l) => good.has(l)) }; };

// ---------------------------------------------------------------------------------------------------- collect / avoid
/**
 * COLLECT (F9): `n` copies of one item picture on route stations that lie on a cycle (removing the station keeps the
 * start joined to the goal: no item on a spur, and the child can miss one); valid path = it visits every item.
 * Uniqueness, ≥ 4 paths, the shortest path missing an item: the caller's P1 search and gates.
 */
function assignCollect(adj, route, rnd, { item, n }) {
  const interior = route.slice(1, -1); const s = route[0], g = route[route.length - 1];
  const onCycle = interior.filter((v) => { const a2 = adj.map((nb, i) => (i === v ? [] : nb.filter((x) => x !== v))); return H.reaches(a2, s, g, v); });
  if (onCycle.length < n) return null;
  for (let t = 0; t < 30; t++) {
    const pick = H.shuffle(onCycle, rnd).slice(0, n).sort((a, b) => route.indexOf(a) - route.indexOf(b));
    // spread: never two items on consecutive route stations (a pair reads as one stop)
    if (pick.some((v, i) => i && route.indexOf(v) - route.indexOf(pick[i - 1]) < 2)) continue;
    const label = new Map(pick.map((v) => [v, item]));
    return { label, decoys: interior.length - n, nearShare: 1, items: pick };
  }
  return null;
}
const collectRule = (stamp) => ({ kind: 'collect', valid: (labels) => labels.filter((l) => l === stamp.item).length === stamp.n });

/**
 * AVOID (F10): obstacles on stations OFF the route, chosen as a greedy hitting set over every other simple path,
 * then thinned so each obstacle is necessary; kinds alternate so the page shows each kind. Valid = no obstacle.
 */
function assignAvoid(adj, route, rnd, { kinds, count }) {
  const s = route[0], g = route[route.length - 1]; const onR = new Set(route);
  const others = H.simplePaths(adj, s, g, 200000).filter((p) => p.join('-') !== route.join('-'));
  if (!others.length) return null;
  let chosen = new Set(); let open = others.slice();
  while (open.length) {
    const score = new Map();
    for (const p of open) for (const v of p) if (!onR.has(v)) score.set(v, (score.get(v) || 0) + 1);
    if (!score.size) return null;   // a path made only of route stations: cannot be blocked off the route
    const best = [...score.entries()].sort((a, b) => b[1] - a[1] || rnd() - 0.5)[0][0];
    chosen.add(best); open = open.filter((p) => !p.includes(best));
  }
  for (const v of [...chosen]) { const trial = new Set(chosen); trial.delete(v); if (others.every((p) => p.some((x) => trial.has(x)))) chosen = trial; }
  if (chosen.size < count[0] || chosen.size > count[1]) return null;
  const label = new Map(); H.shuffle([...chosen], rnd).forEach((v, i) => label.set(v, kinds[i % kinds.length]));
  return { label, decoys: chosen.size, nearShare: 1, obstacles: [...chosen] };
}
const avoidRule = (stamp) => { const bad = new Set(stamp.kinds); return { kind: 'avoid', valid: (labels) => !labels.some((l) => bad.has(l)) }; };

// ---------------------------------------------------------------------------------------------------- the search
/** every simple path s → g whose interior labels obey `valid` (exhaustive; cap) */
function validPaths(adj, s, g, label, valid, cap = 300000) {
  const out = []; let n = 0; const on = new Uint8Array(adj.length); const path = [s]; on[s] = 1;
  const rec = (c) => {
    if (++n > cap) return;
    if (c === g) { const L = path.slice(1, -1).map((v) => label.get(v)); if (valid(L, path)) out.push(path.slice()); return; }
    for (const w of adj[c]) { if (on[w]) continue; on[w] = 1; path.push(w); rec(w); path.pop(); on[w] = 0; }
  };
  rec(s);
  return { paths: out, exhausted: n <= cap };
}

module.exports = { nearMisses, assignSequence, seqRule, validPaths, LOOKALIKE_UPPER, REVERSAL_LOWER, fact, evalFact, factPools, assignPredicate, predRule, opLabel, opValue, assignOps, opsRule, assignSound, soundRule, assignCollect, collectRule, assignAvoid, avoidRule };
