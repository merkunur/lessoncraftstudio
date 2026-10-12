/**
 * hmx.js — the Maze Puzzles LEVEL SET scenes (2026-10-12): resolve a copy's unit ('hmx-…') into a full scene spec.
 *
 * A Level Set copy = (face, level, scene). The scene SKIN (data/hmx/scenes-*.js) is original art direction — setting,
 * palette, drawn scenery, hero, goal, cast — and is laid over the face's PUBLISHED scene (data/hm/scenes.js), which
 * supplies the topology the face's rule needs (generator, labels, strip, strata, …). The LEVEL preset (data/hmx/levels.js)
 * then sets the maze's difficulty knobs. Level 2 is the published face's own maze; the rule (and so the title and the
 * instruction) never changes with the level.
 *
 *   resolveHmx(unit, difficulty, mode) → scene spec (throws on an unknown unit or a unit that belongs to another face)
 *   skinOf(unit)                       → the raw skin
 *   allSkins()                         → every skin
 */
'use strict';
const { SCENES } = require('../data/hm/scenes.js');
const { FACES } = require('../data/b8/maze-puzzles.js');
const LEVELS = require('../data/hmx/levels.js');

let SKINS = null;
function load() {
  if (SKINS) return SKINS;
  SKINS = new Map();
  for (const f of require('../data/hmx/scenes.js').FILES) {
    for (const sk of require('../data/hmx/' + f)) {
      if (!/^hmx-[a-z0-9-]+$/.test(sk.id)) throw new Error('hmx: bad scene id ' + sk.id);
      if (SKINS.has(sk.id)) throw new Error('hmx: duplicate scene id ' + sk.id);
      if (!FACES[sk.face]) throw new Error('hmx: ' + sk.id + ' names unknown face ' + sk.face);
      SKINS.set(sk.id, sk);
    }
  }
  return SKINS;
}
const skinOf = (unit) => { const s = load().get(String(unit).replace(/@.*$/, '')); if (!s) throw new Error('hmx: unknown scene ' + unit); return s; };
const allSkins = () => [...load().values()];

const META = new Set(['id', 'face', 'setting', 'level', 'names', 'note', 'maze', 'labels']);
function resolveHmx(unit, difficulty, mode) {
  const sk = skinOf(unit);
  if (mode && sk.face !== mode) throw new Error('hmx: scene ' + sk.id + ' belongs to face ' + sk.face + ', not ' + mode);
  const base = SCENES[FACES[sk.face].scene];
  const lv = (LEVELS[sk.face] || {})[difficulty] || {};
  const out = { ...base };
  for (const [k, v] of Object.entries(sk)) if (!META.has(k)) out[k] = v;
  // a skin that places its hero / goal by SLOTS drops the published scene's explicit coordinates
  if (sk.slots) { delete out.keep; }
  const bm = base.maze || {};
  const maze = { ...bm, ...(lv.maze || {}), ...(sk.maze || {}) };
  maze.gates = { ...(bm.gates || {}), ...((lv.maze || {}).gates || {}), ...((sk.maze || {}).gates || {}) };
  for (const g of ['layers', 'streets', 'forest', 'strands', 'hex']) if (bm.gates && bm.gates[g]) maze.gates[g] = { ...bm.gates[g], ...(((lv.maze || {}).gates || {})[g] || {}), ...(((sk.maze || {}).gates || {})[g] || {}) };
  if (sk.slots && !(sk.maze && sk.maze.keep)) { delete maze.keep; delete maze.start; delete maze.goal; delete maze.startMouth; delete maze.goalMouth; }
  out.maze = maze;
  // tangled lines: a level may set the NUMBER of strings (3 / 4 / 5) — the slots are re-spaced evenly about the page
  // centre and the scene's first k holders and goals are drawn (the visual review: four strings on every page made the
  // nine pages one weave; three strings is the easier level, five the harder one)
  if (maze.gen === 'strands' && maze.k !== (bm.k || 4)) {
    const k = maze.k; const gap = { 3: 170, 5: 118 }[k]; if (!gap) throw new Error('hmx: no slot spacing for ' + k + ' strings');
    if ((out.holders || []).length < k || (out.goals || []).length < k) throw new Error('hmx: ' + sk.id + ' has fewer than ' + k + ' holders / goals');
    const slotX = [...Array(k).keys()].map((i) => Math.round(337 + (i - (k - 1) / 2) * gap));
    out.slotX = slotX; maze.slotX = slotX;
    out.discXY = slotX.map((x) => [x, (base.discXY || [[0, 606]])[0][1]]);
    // five holders fill the ground band: a corner picture down there would touch the first holder
    if (k > 4) out.cast = (out.cast || []).filter((c) => !(c.at && c.at[1] >= 600));
  }
  if (maze.gen === 'strands') { out.holders = out.holders.slice(0, maze.k); out.goals = out.goals.slice(0, maze.k); }
  if (base.labels || sk.labels) out.labels = { ...(base.labels || {}), ...(lv.labels || {}), ...(sk.labels || {}) };
  // a Level Set scene places its hero / goal by slots (the published base used hand-set points): 24 attempts by default
  out.tries = Math.max(out.tries || 0, lv.tries || 0, 24);
  // the published scene's own band drawings belong to its picture (a beach boat, a jungle palm), never to a new scene's
  if (!sk.bandArt) out.bandArt = [];
  // an avoid scene never draws, as island decor, anything that looks like one of its obstacles (a decor puddle beside a
  // puddle on the road would read as one more thing to avoid; a water-filled hole reads as a puddle)
  if (sk.face === 'avoid' && out.decor) {
    const fam = (k) => (/^rocks?$/.test(k) ? 'rock' : /^(puddle|pond)$/.test(k) ? 'water' : k);
    const obs = new Set((out.labels.kinds || []).map((k) => (k === 'hole' ? 'water' : String(k).startsWith('decor:') ? fam(k.slice(6)) : null)).filter(Boolean));
    out.decor = out.decor.filter((d) => !obs.has(fam(d.k)));
  }
  // a goal that IS water (a puddle, a pond) never shares its page with drawn water decor: "get to the puddle" must name
  // one puddle (the duckling page drew two ponds beside its puddle goal)
  if (out.decor && out.goal && /puddle|pond/.test(String(out.goal.src))) out.decor = out.decor.filter((d) => !/^(puddle|pond)$/.test(d.k));
  // likewise a FLOWER goal ("get to the flower") never shares its page with drawn flowerbeds
  if (out.decor && out.goal && /^flowers( bw[ 0-9]*)?\/|\/flower$/i.test(String(out.goal.src))) out.decor = out.decor.filter((d) => d.k !== 'flowerbed');
  out.hmxId = sk.id;
  return out;
}

module.exports = { resolveHmx, skinOf, allSkins };
