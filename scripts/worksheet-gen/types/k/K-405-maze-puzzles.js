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
const { composeScene, composeStrands, composeHex } = require('../../lib/hm-scene.js');
const { SCENES } = require('../../data/hm/scenes.js');
const { withSlots } = require('../../lib/hm-slots.js');
const { generateLooped, generateLayers, generateStreets, generateForest, generateStrands, generateHexHop } = require('../../lib/hm-maze.js');
const R = require('../../lib/hm-rules.js');
const { COLLATION } = require('../../data/b2/collation.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');

/**
 * THE MAKER (2026-11-02, ENGINES-ART §8.2): a maze is a retry search (0.4-30 s a page on an unlucky seed), so a maker
 * page never searches — copy n of a face at a level is the n-th entry of data/hm/maker-pins.json (tools/build-maze-pins.js):
 * the face's own scene at that level, then its Level Set scenes, each at a seed measured to build fast (per language for
 * the label faces). The page is built from that seed and scene exactly as the catalogue would build it; a Level Set
 * scene brings its own title and instruction. The catalogue never reads the pins (no ctx.slotsOut there).
 */
let _pins = null;
function pinFor(typeId, difficulty, locale, copy) {
  const platform = require('../../lib/platform/index.js');
  const f = require('path').join(__dirname, '..', '..', 'data', 'hm', 'maker-pins.json');
  if (!_pins) _pins = platform.exists(f) ? platform.readJson(f) : {};
  const lv = ((_pins.faces || {})[typeId] || {})[String(difficulty)];
  if (!lv) return null;
  const list = lv[String(locale || 'en').slice(0, 2)] || lv['*'];
  return list && list.length ? list[(copy - 1) % list.length] : null;
}
/** the copy a maker page asks for: its variant, or a fresh-seed retry k copies on from the copy it retries (ctx.retry
 *  "<maker copy>.<k>"; counted from ctx.variant — at level 2 the type's copy is the maker's + 1, so retry 1 counted
 *  from the maker copy rebuilt the same pin, 2026-11-03) */
function copyOf(ctx) {
  if (ctx && ctx.retry) return Math.max(1, parseInt(ctx.variant || 1, 10) || 1) + (+String(ctx.retry).split('.')[1] || 0);
  const v = String((ctx && (ctx.seedVariant || ctx.variant)) || 1);
  if (/^\d+$/.test(v)) return +v;
  const [a, k] = v.split('.');
  return (+a || 1) + (+k || 0);
}

/** the printed words of a Level Set scene in a locale (data/hmx/text/<loc>.js) — a missing entry REFUSES */
function hmxText(unit, locale) {
  const loc = String(locale || 'en').slice(0, 2); const id = String(unit).replace(/@.*$/, '');
  let T; try { T = require('../../lib/platform/index.js').requireData(require('path').join(__dirname, '..', '..', 'data', 'hmx', 'text', loc + '.js')); } catch (e) { throw new Error('K-405: no Level Set text file for ' + loc); }
  const t = T[id]; if (!t) throw new Error('K-405: no Level Set text for ' + id + ' in ' + loc);
  for (const k of ['title', 'printTitle', 'instruction', 'tap']) if (!t[k]) throw new Error('K-405: Level Set text ' + id + ' / ' + loc + ' has no ' + k);
  return t;
}

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
  // a Level Set copy passes its resolved scene spec (lib/hmx.js) instead of a published scene id
  const raw = (sceneId && typeof sceneId === 'object') ? sceneId : SCENES[sceneId];
  if (!raw) throw new Error('K-405: unknown scene ' + sceneId);
  if (raw !== SCENES[sceneId]) sceneId = raw.hmxId || 'hmx';
  let sc = withSlots(raw);
  // a face whose signs are pills tells the generator their real size (a copy: the shared scene data is never mutated)
  if (sc.labels && sc.labels.size) sc = { ...sc, maze: { ...sc.maze, stoneSize: sc.labels.size } };
  let last = null;
  // a scene may raise its own attempt budget (a sparse wide-road tree builds on ~40 % of point sets: 24 tries ≈ 5e-6 page failure)
  const T = Math.max(tries, sc.tries || 0);
  for (let t = 0; t < T; t++) {
    let m;
    if (sc.maze.gen === 'hex') {
      // F13: a 14-letter run from a seeded mid-alphabet start; the Nordic alphabets (Å / Ö at the end) end on their last letter
      const seq = sequenceFor({ alphabet: true, case: 'upper' }, locale); const L = seq.length; const n = sc.maze.run;
      const loc = String(locale || 'en').slice(0, 2); const startIdx = ['sv', 'da', 'no', 'fi'].includes(loc) ? [L - n, L - n] : [4, L - n];
      m = generateHexHop({ ...sc.maze, startIdx }, seq, rng.next, R.LOOKALIKE_UPPER);
    } else if (sc.labels && sc.labels.rule === 'seq') {
      const seq = sequenceFor(sc.labels, locale); const L = sc.labels;
      const r = (L.rByLen && L.rByLen[seq.length]) || sc.maze.r;
      const kind = L.alphabet ? (L.case === 'lower' ? 'lower' : 'upper') : 'number';
      const keep = (sc.maze.keep || []).map((k) => [k[0], k[1], k[2] + (L.stoneR || 28)]);   // a stone must not reach under the hero / goal
      m = generateLooped({ ...sc.maze, keep, r, seqLen: seq.length, stoneR: L.stoneR || (L.size ? Math.max(L.size[0], L.size[1]) / 2 : 28), label: (adj, route, rnd) => R.assignSequence(adj, route, seq, rnd, kind), rule: R.seqRule(seq), lgates: { decoys: L.decoyCount || Math.ceil((L.decoyMin || 0.55) * seq.length), nearShare: L.nearShare == null ? 0.9 : L.nearShare, reversals: L.reversalMin } }, rng.next);
      if (m && !m.fail) m.ruleStamp = { kind: 'seq', seq };
    } else if (sc.labels && sc.labels.rule === 'pred') {
      const L = sc.labels; const target = Array.isArray(L.target) ? L.target[Math.floor(rng.next() * L.target.length)] : L.target;
      const pools = R.factPools({ op: L.op, target, a: L.a, b: L.b });
      const keep = (sc.maze.keep || []).map((k) => [k[0], k[1], k[2] + (L.stoneR || 40)]);
      m = generateLooped({ ...sc.maze, keep, seqLen: L.route, stoneR: L.stoneR || (L.size ? Math.max(L.size[0], L.size[1]) / 2 : 40), label: (adj, route, rnd) => R.assignPredicate(adj, route, pools, rnd), rule: R.predRule({ target }), lgates: { decoys: L.decoyCount } }, rng.next);
      if (m && !m.fail) m.ruleStamp = { kind: 'pred', target };
    } else if (sc.labels && sc.labels.rule === 'ops') {
      const L = sc.labels; const keep = (sc.maze.keep || []).map((k) => [k[0], k[1], k[2] + (L.stoneR || 36)]);
      m = generateLooped({ ...sc.maze, keep, seqLen: L.route, stoneR: L.stoneR || 36, label: (adj, route, rnd) => R.assignOps(adj, route, rnd, { opSet: L.opSet, startRange: L.start, range: L.range }), ruleFor: (lab) => R.opsRule({ start: lab.start, target: lab.target }), nearMissShortest: L.nearMissShortest, lgates: { decoys: L.decoyCount } }, rng.next);
      if (m && !m.fail) m.ruleStamp = { kind: 'ops', start: m.assigned.start, target: m.assigned.target };
    } else if (sc.labels && sc.labels.rule === 'sound') {
      const L = sc.labels; const loc = String(locale || 'en').slice(0, 2);
      // a Level Set scene names its own onset (data/hmx/sound-pools.json: /t/, /p/); /l/ reads the published pool. The cue's own
      // noun is never a card (the leopard is the cue on a leopard page).
      let pool = L.target && L.target !== 'l' ? (require('../../data/hmx/sound-pools.json')[loc] || {})[L.target] : require('../../data/hm/sound-pools.json')[loc];
      if (pool && sc.hmxId) { const cueNoun = String(sc.hero.src).split('/')[1]; pool = { ...pool, l: pool.l.filter((c) => c.src.split('/')[1] !== cueNoun) }; }
      if (!pool) throw new Error('K-405: no first-sound pool for ' + loc);
      const keep = (sc.maze.keep || []).map((k) => [k[0], k[1], k[2] + (L.stoneR || 36)]);
      m = generateLooped({ ...sc.maze, keep, seqLen: L.route, stoneR: L.stoneR || 36, label: (adj, route, rnd) => R.assignSound(adj, route, pool, rnd, L.laterLMin || 3), rule: R.soundRule({ good: pool.l.map((c) => c.src) }), lgates: { decoys: L.decoyCount } }, rng.next);
      if (m && !m.fail) m.ruleStamp = { kind: 'sound', good: pool.l.map((c) => c.src) };
    } else if (sc.labels && sc.labels.rule === 'kind') {
      // K-480 picture path: step only on pictures of a KIND (the good themes' pictures) among pictures of other kinds —
      // the sound face's machinery (a card is good or a decoy), its pool built from the themes (pictures only, no words)
      const L = sc.labels; const { labelSafeNouns } = require('../../image-cache/resolve.js');
      // labels.exclude: pictures a child may not read as the kind (a bee is an animal, but many five-year-olds say a bug is not)
      const ex = new Set(L.exclude || []);
      const cards = (themes) => [...new Map(themes.flatMap((th) => labelSafeNouns(th).filter((n) => !ex.has(n.noun) && !ex.has(n.vocabKey)).map((n) => [n.vocabKey, { src: th + '/' + n.noun }]))).values()];
      const pool = { l: cards(L.good), decoy: cards(L.decoy) };
      const keep = (sc.maze.keep || []).map((k) => [k[0], k[1], k[2] + (L.stoneR || 36)]);
      m = generateLooped({ ...sc.maze, keep, seqLen: L.route, stoneR: L.stoneR || 36, label: (adj, route, rnd) => R.assignSound(adj, route, pool, rnd, L.laterLMin || 0), rule: R.soundRule({ good: pool.l.map((c) => c.src) }), lgates: { decoys: L.decoyCount } }, rng.next);
      if (m && !m.fail) m.ruleStamp = { kind: 'sound', good: pool.l.map((c) => c.src) };
    } else if (sc.labels && (sc.labels.rule === 'collect' || sc.labels.rule === 'avoid')) {
      const L = sc.labels; const keep = (sc.maze.keep || []).map((k) => [k[0], k[1], k[2] + (L.stoneR || 28)]);
      const collect = L.rule === 'collect';
      const stamp = collect ? { kind: 'collect', item: L.item, n: L.n } : { kind: 'avoid', kinds: L.kinds };
      m = generateLooped({ ...sc.maze, keep, seqLen: L.route, stoneR: L.stoneR || 28,
        label: (adj, route, rnd) => (collect ? R.assignCollect(adj, route, rnd, { item: L.item, n: L.n }) : R.assignAvoid(adj, route, rnd, { kinds: L.kinds, count: L.count })),
        rule: collect ? R.collectRule(stamp) : R.avoidRule(stamp), lgates: {} }, rng.next);
      if (m && !m.fail) m.ruleStamp = stamp;
    } else if (sc.maze.gen === 'layers') m = generateLayers(sc.maze, rng.next);   // F5: soil levels joined by shafts
    else if (sc.maze.gen === 'streets') m = generateStreets(sc.maze, rng.next);     // F6: a street lattice, ONE shortest way
    else if (sc.maze.gen === 'forest') m = generateForest({ ...sc.maze, paddocks: sc.paddocks }, rng.next);   // F7: k trees, baby → mother by a derangement
    else if (sc.maze.gen === 'strands') m = generateStrands(sc.maze, rng.next);     // F8: strings through crossings, no choices
    else m = generateTree(sc.maze, rng.next);
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
  // an open-ended letter run (F13 hex hop): a dense honeycomb has astronomically many simple paths, so search only along
  // the alphabet — from the start, every next cell must touch the last and carry the next letter; exactly one run
  if (T.rule && T.rule.openEnd && T.rule.kind === 'seq') {
    return T.routes.map((r) => {
      const seq = T.rule.seq; const found = [];
      const go = (path) => { if (found.length > 1) return; const v = path[path.length - 1]; const i = path.length - 2;   // path[0] = the virtual start
        if (i === seq.length - 1) { found.push(path.slice()); return; }
        for (const w of adj[v]) if (!path.includes(w) && T.labels[w] === seq[i + 1]) { path.push(w); go(path); path.pop(); } };
      for (const w of adj[r.start]) if (T.labels[w] === seq[0]) go([r.start, w]);
      if (found.length !== 1) throw new Error('K-405 oracle: ' + found.length + ' valid letter runs on the page');
      return found[0];
    });
  }
  // never zero (the operator's rule, 2026-11-03): no stone adds or takes away nothing — "10 + 0" is not making 10
  if (T.rule && T.rule.kind === 'pred' && T.labels.some((l) => /(^|\D)0\s*[+−-]|[+−-]\s*0(\D|$)/.test(String(l == null ? '' : l)))) throw new Error('K-405 oracle: a stone with a 0 operand');
  if (T.rule) {
    const R = require('../../lib/hm-rules.js');
    const rule = T.rule.kind === 'seq' ? R.seqRule(T.rule.seq) : T.rule.kind === 'pred' ? R.predRule(T.rule) : T.rule.kind === 'ops' ? R.opsRule(T.rule) : T.rule.kind === 'sound' ? R.soundRule(T.rule) : T.rule.kind === 'collect' ? R.collectRule(T.rule) : T.rule.kind === 'avoid' ? R.avoidRule(T.rule) : null;
    if (!rule) throw new Error('K-405 oracle: unknown rule ' + T.rule.kind);
    return T.routes.map((r) => {
      const label = new Map(T.labels.map((l, i) => [i, l]));
      const found = R.validPaths(adj, r.start, r.goal, label, (L) => rule.valid(T.rule.openEnd ? L.slice(1) : L.slice(1, -1)));
      if (found.paths.length !== 1) throw new Error('K-405 oracle: ' + found.paths.length + ' valid paths on the page');
      return found.paths[0];
    });
  }
  // no rule: the route is the SHORTEST way (a tree has one way; a street lattice has many, and the page is only right
  // when exactly one of them is shortest — counted here from the declared graph, never read from the answer)
  return T.routes.map((r) => {
    const prev = new Map([[r.start, -1]]); const dist = new Map([[r.start, 0]]); const cnt = new Map([[r.start, 1]]); const q = [r.start];
    while (q.length) { const c = q.shift(); for (const n of adj[c]) { if (!dist.has(n)) { dist.set(n, dist.get(c) + 1); cnt.set(n, cnt.get(c)); prev.set(n, c); q.push(n); } else if (dist.get(n) === dist.get(c) + 1) cnt.set(n, cnt.get(n) + cnt.get(c)); } }
    if (!prev.has(r.goal)) throw new Error('K-405 oracle: goal unreachable in the declared graph');
    if (cnt.get(r.goal) !== 1) throw new Error('K-405 oracle: ' + cnt.get(r.goal) + ' shortest ways on the page');
    const p = []; for (let c = r.goal; c !== -1; c = prev.get(c)) p.unshift(c); return p;
  });
}

/**
 * the LEGEND STRIP of a T2 face (675 × 64, no words): collect = the item picture, its count as a numeral and one
 * tick circle per item; avoid = each obstacle kind inside a coral "not" ring; sound = the hero's card + a sound glyph.
 */
function stripSvg(sc, m, o = {}) {
  const { centred } = require('../../lib/hm-scene.js');
  const W = 675, H = 64, parts = [`<rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="16" fill="#FBF3E4" stroke="#146B5E" stroke-width="2"/>`];
  const st = m.ruleStamp || {};
  if (st.kind === 'collect') {
    parts.push(centred(st.item, 170, 32, 50).svg);
    parts.push(`<text x="250" y="44" text-anchor="middle" font-family="&quot;Baloo 2&quot;, Nunito, sans-serif" font-weight="700" font-size="34" fill="#146B5E">${st.n}</text>`);
    for (let i = 0; i < st.n; i++) parts.push(`<circle cx="${320 + i * 46}" cy="32" r="15" fill="#FFFFFF" stroke="#146B5E" stroke-width="3"/>`);
  } else if (st.kind === 'shortest') {
    // the unit: ONE street piece with its cover = 1 (so "how many" means covers driven over); the box is for the answer
    const C = sc.corridor, SC = sc.streets || {};
    parts.push(`<path d="M110 32 H210" stroke="${C.edge}" stroke-width="${28 + 2 * (C.outline || 3.5)}" stroke-linecap="round"/><path d="M110 32 H210" stroke="${C.fill}" stroke-width="28" stroke-linecap="round"/>`);
    parts.push(`<circle cx="160" cy="32" r="${SC.coverR || 7}" fill="${SC.cover || '#B9B4AB'}" stroke="${SC.coverEdge || '#8F8A82'}" stroke-width="1.6"/>`);
    parts.push(`<text x="270" y="43" text-anchor="middle" font-family="&quot;Baloo 2&quot;, Nunito, sans-serif" font-weight="700" font-size="32" fill="#146B5E">= 1</text>`);
    if (!o.screen) {
      parts.push(`<rect x="430" y="6" width="52" height="52" rx="8" fill="#FFFFFF" stroke="#146B5E" stroke-width="2.5" stroke-dasharray="7 5" data-lcs-paper-only="1"/>`);
      if (o.key) parts.push(`<text x="456" y="45" text-anchor="middle" font-family="&quot;Baloo 2&quot;, Nunito, sans-serif" font-weight="700" font-size="32" fill="#F2784B" data-lcs-hm-key-n="${st.n}">${st.n}</text>`);
    }
  } else if (st.kind === 'avoid') {
    st.kinds.forEach((k, i) => {
      const cx = W / 2 + (i - (st.kinds.length - 1) / 2) * 120;
      if (k === 'hole') parts.push(`<ellipse cx="${cx}" cy="32" rx="22" ry="13" fill="#5E9FC0" stroke="#3F7FA0" stroke-width="2.5"/>`);
      else if (String(k).startsWith('decor:')) parts.push(require('../../lib/hmx-scenery.js').decorSvg(k.slice(6), cx, 32, 1, { pal: sc.decorPal || {} }).svg);
      else parts.push(centred(k, cx, 32, 40).svg);
      parts.push(`<circle cx="${cx}" cy="32" r="27" fill="none" stroke="#F2784B" stroke-width="4"/><line x1="${cx - 19}" y1="${32 + 19}" x2="${cx + 19}" y2="${32 - 19}" stroke="#F2784B" stroke-width="4" stroke-linecap="round" opacity=".75"/>`);
    });
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-prim="hm-strip">${parts.join('')}</svg>`;
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
  interactive: { kind: 'trace-path', instructionKey: (difficulty, spec) => 'mz-' + ((spec.difficulty[difficulty] || spec.difficulty[2]).mode || 'base'), oracle: traceOracle,
    // the screen's own words (Go back, Keep going, …): the family bank's chrome block — a locale without one REFUSES
    chrome: (locale, unit) => {
      const c = require('../../lib/b8-common.js').bank('maze-puzzles', locale).chrome;
      // a Level Set collect scene names its own item in the "missed" hint (the bank's sentence names the carrot)
      if (unit && /^hmx-/.test(String(unit))) { const t = hmxText(unit, locale); if (t.missed) return { ...c, mzMissed: t.missed }; }
      return c;
    } },

  /** Level Set copies (data/hmx, 2026-10-12): every scene prints its own title, heading, instruction and screen line */
  copyStrings(s0, ctx) {
    const unit = String((ctx && ctx.unit) || '');
    if (!/^hmx-/.test(unit)) return s0;
    const t = hmxText(unit, ctx.locale);
    return { ...s0, title: t.title, printTitle: t.printTitle, instruction: t.instruction, screenInstruction: t.tap };
  },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    let rng = ctx.rng;
    // the maker: the pinned scene + seed of this copy (see pinFor); the face's own scene takes the level presets
    const pin = ctx && ctx.slotsOut && !unit && !ctx.noPin ? pinFor(this.id, difficulty, locale, copyOf(ctx)) : null;
    if (pin) { unit = pin.u || null; rng = makeRng(instanceSeed({ typeId: this.id, theme: null, difficulty: Number(difficulty), seedEpoch: 1, variant: pin.s, unit })); }
    const hmx = unit && /^hmx-/.test(String(unit));
    const own = !hmx && ctx && ctx.slotsOut && Number(difficulty) !== 2;
    const scene = hmx ? require('../../lib/hmx.js').resolveHmx(unit, difficulty, d.mode) : own ? require('../../lib/hmx.js').resolveOwn(d.mode, difficulty, d.scene) : d.scene;
    const sceneName = hmx ? String(unit) : d.scene;
    // a maze the composer cannot dress (no island big enough for a required drawing) is replaced by the next maze from
    // the same rng — print, screen and key replay the identical sequence, so they stay one instance (2026-10-11: a
    // denser jungle left the toucan no room; one refusal failed the whole page)
    const key = !!(ctx && ctx.answerKey);
    let sc, m, out, lastMissing = [];
    for (let a = 0; a < 12; a++) {
      ({ sc, m } = mazeFor(scene, rng, 12, locale));
      out = sc.maze.gen === 'strands' ? composeStrands(sc, m, { key, screen: !!(ctx && ctx.interactive) }) : sc.maze.gen === 'hex' ? composeHex(sc, m, { key }) : composeScene(sc, m, { key, rnd: rng.next, screen: !!(ctx && ctx.interactive) });
      if (!out.missing.length) break;
      lastMissing = out.missing;
    }
    if (out.missing.length) throw new Error('K-405: scene ' + sceneName + ' could not place ' + lastMissing.join(', '));
    const meta = { mode: d.mode, scene: sceneName, route: m.m.route, dead: m.m.dead, junctions: m.m.junctions, sol: m.route ? m.route.join('-') : m.perm.join('-'), crossings: m.m.crossings };
    // T2 faces: the scene (640) + a 12 px gap + a 64 px LEGEND STRIP under it, language-free (design C, F6 F9 F10 F18)
    const strip = sc.strip ? stripSvg(sc, m, { key, screen: !!(ctx && ctx.interactive) }) : '';
    const bodyHtml = `<div data-ws-content data-lcs-hm-mode="${d.mode}" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:12px">${out.svg}${strip}</div>`;
    // F13 names the run's last letter in its instruction ({LAST}, filled by render-instance on every page)
    // a pinned Level Set scene prints its own words (the hero is not the face's): runtime.makePage takes them unless edited
    const own3 = pin && hmx ? (() => { const t = hmxText(unit, locale); return { strings: { title: t.title, printTitle: t.printTitle, instruction: t.instruction, screenInstruction: t.tap } }; })() : {};
    return { bodyHtml, meta, ...(m.run ? { tokens: { LAST: m.run[m.run.length - 1] } } : {}), ...own3, ...(pin && pin.u ? { unit: pin.u } : {}) };
  },

  async verify(page) {
    const fails = [];
    const info = await page.evaluate(() => {
      const svg = document.querySelector('svg[data-lcs-prim="hm-scene"]');
      if (!svg) return null;
      const r = svg.getBoundingClientRect();
      return { graph: JSON.parse(svg.getAttribute('data-lcs-hm-graph')), clip: { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height }, w: svg.viewBox.baseVal.width, key: !!svg.querySelector('[data-lcs-hm-key]'), svg: svg.outerHTML };
    });
    if (!info) return ['no maze scene'];
    if (info.key) return fails;   // the key is judged by the key gate, not the walkable-page oracle
    // in the maker (makers 2026-11-02; spike S6): the same oracle on the scene's own SVG rasterised by the browser
    // platform — a browser cannot screenshot itself. The catalogue keeps the screenshot below
    if (page.live) {
      const { analyzeSvg } = require('../../lib/hm-verify.js');
      // a LINE-ART scene is walked by its ink: at scale 1 a 1-px outline anti-aliases to light grey and reads as paper,
      // so the flood "leaks" through a closed road (2026-11-03: the pinned colouring scenes, 124,000 px at scale 1, clean
      // at 2). The catalogue's screenshot is never that coarse; a colour scene is walked by colour and stays at 1
      return fails.concat(await analyzeSvg({ svg: info.svg, graph: info.graph, scale: info.graph && info.graph.line ? 2 : 1, seam: 1 }));
    }
    const png = await page.screenshot({ clip: info.clip });
    const dpr = await page.evaluate(() => window.devicePixelRatio || 1);
    const { analyzeScene } = require('../../lib/hm-verify.js');
    const issues = await analyzeScene({ png, graph: info.graph, scale: (info.clip.width / info.w) * dpr });
    return fails.concat(issues);
  },
};
