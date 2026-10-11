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

module.exports = { nearMisses, assignSequence, seqRule, validPaths, LOOKALIKE_UPPER, REVERSAL_LOWER };
