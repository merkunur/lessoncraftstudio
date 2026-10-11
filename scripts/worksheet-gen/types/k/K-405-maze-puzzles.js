/**
 * K-405 — Maze Puzzles ("Handmade Mazes", b8 flagship; docs/worksheet-gen/b8-designs/K-405-maze-puzzles.md).
 *
 * One big framed picture with light curvy roads through it: a hero at one mouth (teal start disc), a goal at the
 * other (coral pennant). The child plans, then draws ONE line along the way. The maze is a declared graph built
 * ROUTE FIRST by lib/hm-graph.js + lib/hm-maze.js from the face's scene config and the instance seed, accepted only
 * when every quality gate passes (one route, tempting dead ends, no position tell, no wall-follower shortcut);
 * the RENDERED page is re-proved by the raster oracle (lib/hm-verify.js) in verify().
 *
 * The print page, the screen (trace-path) and the key are the SAME instance: the maze is the first consumer of the
 * rng. The page never prints the answer; the key draws the route in coral.
 */
'use strict';
const { generateTree } = require('../../lib/hm-maze.js');
const { composeScene } = require('../../lib/hm-scene.js');
const { SCENES } = require('../../data/hm/scenes.js');
const { withSlots } = require('../../lib/hm-slots.js');
const { generateLooped } = require('../../lib/hm-maze.js');
const R = require('../../lib/hm-rules.js');
const { COLLATION } = require('../../data/b2/collation.js');

const D = {
  1: { mode: 'base', scene: 'orchard-hedgehog' },
  2: { mode: 'base', scene: 'orchard-hedgehog' },
  3: { mode: 'base', scene: 'orchard-hedgehog' },
};

/** build the gated maze for a scene from the instance rng (the FIRST rng use; the oracle replays it) */
/** the label sequence a face's rule walks, for a locale (the locale's own school alphabet / the number run) */
function sequenceFor(L, locale) {
  const loc = String(locale || 'en').slice(0, 2);
  if (L.alphabet) { const C = COLLATION[loc]; if (!C) throw new Error('K-405: no collation for ' + loc); return C.strip.map((c) => (L.case === 'lower' ? c : c.toLocaleUpperCase(loc))); }
  if (L.numbers) { const out = []; for (let v = L.numbers[0]; v <= L.numbers[1]; v += L.numbers[2] || 1) out.push(String(v)); return out; }
  throw new Error('K-405: the label config names no sequence');
}

function mazeFor(sceneId, rng, tries = 12, locale) {
  if (!SCENES[sceneId]) throw new Error('K-405: unknown scene ' + sceneId);
  const sc = withSlots(SCENES[sceneId]);
  let last = null;
  for (let t = 0; t < tries; t++) {
    let m;
    if (sc.labels && sc.labels.rule === 'seq') {
      const seq = sequenceFor(sc.labels, locale); const L = sc.labels;
      const r = (L.rByLen && L.rByLen[seq.length]) || sc.maze.r;
      const kind = L.alphabet ? (L.case === 'lower' ? 'lower' : 'upper') : 'number';
      const keep = (sc.maze.keep || []).map((k) => [k[0], k[1], k[2] + (L.stoneR || 28)]);   // a stone must not reach under the hero / goal
      m = generateLooped({ ...sc.maze, keep, r, seqLen: seq.length, stoneR: L.stoneR || (L.size ? Math.max(L.size[0], L.size[1]) / 2 : 28), label: (adj, route, rnd) => R.assignSequence(adj, route, seq, rnd, kind), rule: R.seqRule(seq), lgates: { decoys: L.decoyCount || Math.ceil((L.decoyMin || 0.55) * seq.length), nearShare: L.nearShare == null ? 0.9 : L.nearShare, reversals: L.reversalMin } }, rng.next);
      if (m && !m.fail) m.ruleStamp = { kind: 'seq', seq };
    } else m = generateTree(sc.maze, rng.next);
    if (m && !m.fail) return { sc, m };
    last = m && m.fail;
  }
  throw new Error('K-405: no maze passed the gates for ' + sceneId + ' (' + (last || []).join(', ') + ')');
}

/**
 * The robot's ORACLE (qa/verify-interactive.js): each route recomputed from the DECLARED graph by breadth-first
 * search from its start to its goal (on a tree faces the one path), never from the page's answer map.
 */
function traceOracle(B) {
  const T = B.ctx.trace; const adj = T.nodes.map(() => []);
  for (const e of T.edges) { adj[e.a].push(e.b); adj[e.b].push(e.a); }
  // a LOOPED label face: the one path whose interior labels obey the printed rule (the path is [virtual start, start
  // station, …labelled stations…, goal station, virtual goal]); exactly one, or the page is wrong
  if (T.rule) {
    const R = require('../../lib/hm-rules.js');
    const rule = T.rule.kind === 'seq' ? R.seqRule(T.rule.seq) : null;
    if (!rule) throw new Error('K-405 oracle: unknown rule ' + T.rule.kind);
    return T.routes.map((r) => {
      const label = new Map(T.labels.map((l, i) => [i, l]));
      const found = R.validPaths(adj, r.start, r.goal, label, (L) => rule.valid(L.slice(1, -1)));
      if (found.paths.length !== 1) throw new Error('K-405 oracle: ' + found.paths.length + ' valid paths on the page');
      return found.paths[0];
    });
  }
  return T.routes.map((r) => {
    const prev = new Map([[r.start, -1]]); const q = [r.start];
    while (q.length) { const c = q.shift(); if (c === r.goal) break; for (const n of adj[c]) if (!prev.has(n)) { prev.set(n, c); q.push(n); } }
    if (!prev.has(r.goal)) throw new Error('K-405 oracle: goal unreachable in the declared graph');
    const p = []; for (let c = r.goal; c !== -1; c = prev.get(c)) p.unshift(c); return p;
  });
}

module.exports = {
  id: 'K-405',
  slug: 'maze-puzzles',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'maze-puzzles',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Picture Maze: Help the Hedgehog Reach the Apple Tree',
      printTitle: 'Help the Hedgehog Reach the Apple Tree',
      instruction: 'Help the hedgehog get to the apple tree. Draw a line along the way.',
    },
  },
  mazeFor,
  interactive: { kind: 'trace-path', instructionKey: () => 'mz-base', oracle: traceOracle },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const { sc, m } = mazeFor(d.scene, ctx.rng, 12, locale);
    const key = !!(ctx && ctx.answerKey);
    const out = composeScene(sc, m, { key, rnd: ctx.rng.next });
    if (out.missing.length) throw new Error('K-405: scene ' + d.scene + ' could not place ' + out.missing.join(', '));
    const meta = { mode: d.mode, scene: d.scene, route: m.m.route, dead: m.m.dead, junctions: m.m.junctions, sol: m.route.join('-') };
    const bodyHtml = `<div data-ws-content data-lcs-hm-mode="${d.mode}" style="flex:1;display:flex;align-items:flex-start;justify-content:center">${out.svg}</div>`;
    return { bodyHtml, meta };
  },

  async verify(page) {
    const fails = [];
    const info = await page.evaluate(() => {
      const svg = document.querySelector('svg[data-lcs-prim="hm-scene"]');
      if (!svg) return null;
      const r = svg.getBoundingClientRect();
      return { graph: JSON.parse(svg.getAttribute('data-lcs-hm-graph')), clip: { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height }, w: svg.viewBox.baseVal.width, key: !!svg.querySelector('[data-lcs-hm-key]') };
    });
    if (!info) return ['no maze scene'];
    if (info.key) return fails;   // the key is judged by the key gate, not the walkable-page oracle
    const png = await page.screenshot({ clip: info.clip });
    const dpr = await page.evaluate(() => window.devicePixelRatio || 1);
    const { analyzeScene } = require('../../lib/hm-verify.js');
    const issues = await analyzeScene({ png, graph: info.graph, scale: (info.clip.width / info.w) * dpr });
    return fails.concat(issues);
  },
};
