#!/usr/bin/env node
/**
 * verify-dk-kinder.js — the gate of the Batch K Kindergarten science and health pages (K-687 .. K-707, factory
 * types/_shared/dk-kinder.js, bank data/science/dk-kinder.js; Daily Teaching System Stage D-5, 2026-11-23).
 *
 *   node scripts/worksheet-gen/qa/verify-dk-kinder.js [--quick] [--seeds=400]
 *
 *   1. BANK: every item has ONE right answer by the bank's own facts (animal foods: the choices a row can hold meet the
 *      animal's `eats` set in exactly its right set; storm rows: no wrong choice is safe in that row's weather, by the
 *      gate's own safety table; the ball's direction by the gate's own reflection; the bedtime routine has exactly one
 *      valid order and the brushing-teeth routine is refused; the land and trusted pairs are one-to-one; the needs page
 *      holds no want that is a need in another frame). Every picture exists in the cache manifest AND on disk, and none
 *      is black-and-white.
 *   2. BUILD, `--seeds` (default 400) copies of every type at every level: the answer stamped on each item agrees with
 *      the bank; NO POSITIONAL TELL (where the answer sits, pooled over the seeds, is within a band of chance at every
 *      place; no page in a pattern; the bins never line up with the answers); every picture the page names is on disk;
 *      the three levels truly differ (their item counts or parts differ for the same seed); English only (another
 *      locale refuses).
 *   3. RENDER (render/render-instance.js, the print pipeline): every type at every level, 2 copies (1 with --quick): the
 *      type's verify() (the stack 620-740 measured on what is drawn, no blank band at the top or between parts, no two
 *      boxes colliding, no drawing out of its box, pictures loaded) and qa/lints.js are clean.
 *   4. POISONS: each check above FAILS on a page or bank spoiled for it (and passes on the real one).
 * Review round 1 (an American Kindergarten teacher, 2026-11-23) added: no picture a child names as something else
 * (REFUSED_ART: the banded worms read as a SNAKE; the bear has no teacher-safe wrong food); the bedtime cards each draw
 * their own picture (two cards on one empty bed have no forced order); the trusted page circles GROWN-UPS among
 * CHILDREN by the gate's own table (no vehicle, no child safety patrol) with the help-seeking line printed; and K-374's
 * grown-up's hand on every card from the curb (the K-369 builder and the drawn page both refuse a hand taken halfway).
 * Review round 2 added: no animal that reads as a hole digger (the ant; the beaver, read as a GROUNDHOG) is ever the
 * extra beside the rabbit hole (bank + every built page); the running girl (grown-up proportions) is no child on the
 * trusted page; K-374's look-right arrow never touches the grown-up's silhouette.
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const WG = path.join(__dirname, '..');
const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const DK = require(path.join(WG, 'types', '_shared', 'dk-kinder.js'));
const B = require(path.join(WG, 'data', 'science', 'dk-kinder.js'));
const MAN = require(path.join(WG, 'cache', 'manifest.json'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const SEEDS = Number(arg('seeds', '400'));
const IDS = ['K-687', 'K-688', 'K-689', 'K-690', 'K-691', 'K-692', 'K-693', 'K-694', 'K-695', 'K-696', 'K-697', 'K-698', 'K-699', 'K-700', 'K-701', 'K-702', 'K-703', 'K-704', 'K-705', 'K-706', 'K-707'];
const clone = (x) => JSON.parse(JSON.stringify(x));

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
/** a poison: `f` = the failures the check gave on the spoiled input; it must fire, for its own reason */
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ 1. the bank */
const isBw = (theme) => /\bbw\b/i.test(theme);
/** a picture: in the manifest, on disk (cache/themes-512 or cache/themes), and colour */
function artFaults(p, where) {
  const f = [];
  if (isBw(p.theme)) f.push(`${where}: ${p.theme}/${p.noun} is a black-and-white picture`);
  const t = MAN.themes[p.theme];
  const e = t && t.nouns[p.noun];
  if (!e) { f.push(`${where}: ${p.theme}/${p.noun} is not in the cache manifest`); return f; }
  const file = e.files[0];
  if (!fs.existsSync(path.join(WG, 'cache', 'themes-512', p.theme, file)) && !fs.existsSync(path.join(WG, 'cache', 'themes', p.theme, file))) f.push(`${where}: ${p.theme}/${p.noun} has no file on disk`);
  return f;
}
/** every picture the bank names */
function bankPictures(b) {
  const out = [];
  const walk = (o, where) => {
    if (!o || typeof o !== 'object') return;
    if (typeof o.theme === 'string' && typeof o.noun === 'string') { out.push([o, where]); return; }
    for (const [k, v] of Object.entries(o)) if (k !== 'REFUSED') walk(v, where + '.' + k);
  };
  for (const [k, v] of Object.entries(b)) if (!/REFUSED/.test(k)) walk(v, k);
  return out;
}

/** the gate's OWN safety table: in which weather each choice is a safe thing to do or wear (going indoors is safe in all
 *  of them; a tree is shade on a hot day; a pool cools you on a hot day) */
const SAFE_IN = {
  indoors: ['thunder', 'snow', 'hot', 'rain'], coat: ['snow'], mittens: ['snow'], winterhat: ['snow'], water: ['hot'],
  umbrella: ['rain'], tree: ['hot'], pool: ['hot'], playground: [], tshirt: ['hot'], shorts: ['hot'], flipflops: ['hot'],
  sunglasses: ['hot'], sunscreen: ['hot'], fan: ['hot'], swimsuit: ['hot'],
};
function stormFaults(rows) {
  const f = [];
  for (const r of rows) {
    const all = [r.safe, ...r.wrong];
    if (!SAFE_IN[r.safe.id] || !SAFE_IN[r.safe.id].includes(r.id)) f.push(`storm ${r.id}: the safe choice ${r.safe.id} is not safe in ${r.id} by the gate's table`);
    for (const w of r.wrong) {
      if (!SAFE_IN[w.id]) f.push(`storm ${r.id}: ${w.id} is not in the gate's safety table`);
      else if (SAFE_IN[w.id].includes(r.id)) f.push(`storm ${r.id}: the wrong choice ${w.id} is ALSO safe in ${r.id} (two right answers)`);
    }
    if (r.wrong.length < 2) f.push(`storm ${r.id}: fewer than two wrong choices`);
    if (new Set(all.map((x) => x.id)).size !== all.length) f.push(`storm ${r.id}: a choice twice`);
  }
  return f;
}
/** animal foods: never ∩ eats = ∅, every right set ⊆ eats; and every row the factory can build has exactly its right set */
function foodFaults(animals, foods) {
  const f = [];
  for (const a of animals) {
    for (const n of a.never) if (a.eats.includes(n)) f.push(`food ${a.id}: ${n} is both eaten and never eaten (two answers)`);
    for (const r of a.right) for (const x of r) if (!a.eats.includes(x)) f.push(`food ${a.id}: the right food ${x} is not one it eats`);
    for (const r of a.right) if (a.never.filter((n) => !r.includes(n)).length < 3 - r.length) f.push(`food ${a.id}: too few wrong foods for a row`);
    for (const x of [...a.eats, ...a.never]) if (!foods[x]) f.push(`food ${a.id}: no picture for ${x}`);
    // the rows the factory builds: the right set + wrong foods drawn from `never`; in every one, the foods the animal eats
    // are exactly the right set
    for (const r of a.right) for (const w of a.never.filter((n) => !r.includes(n))) {
      const eaten = [...r, w].filter((x) => a.eats.includes(x));
      if (eaten.length !== r.length) f.push(`food ${a.id}: a row with ${r.join('+')} and ${w} has ${eaten.length} right foods`);
    }
  }
  return f;
}
/** the ball meets a thing: the gate's own physics (top view, the ball rolls right along +x, the page's y grows down) */
function bounce(obstacle) {
  const N = { wall: [-1, 0], hand: [-1, 0], 'slant-up': [-Math.SQRT1_2, -Math.SQRT1_2], 'slant-down': [-Math.SQRT1_2, Math.SQRT1_2] }[obstacle];
  if (!N) return null;
  const v = [1, 0], d = v[0] * N[0] + v[1] * N[1];
  const out = [v[0] - 2 * d * N[0], v[1] - 2 * d * N[1]];
  if (Math.abs(out[0]) > 0.5) return out[0] < 0 ? 'back' : 'on';
  return out[1] < 0 ? 'up' : 'down';
}
function directionFaults(items) {
  const f = [];
  for (const it of items) {
    const p = bounce(it.obstacle);
    if (p !== it.right) f.push(`direction ${it.id}: the bank says ${it.right}, the ball goes ${p}`);
    if (it.wrong === p) f.push(`direction ${it.id}: the wrong arrow is where the ball goes`);
  }
  return f;
}
/** pictures a five-year-old names as something else (review round 1): never in the bank */
const REFUSED_ART = {
  'insects and bugs/worm': 'banded, with a face: reads as a snake', 'forest creatures/earthworm': 'banded, with a face: reads as a snake',
  'spring/worm': 'banded, with a face: reads as a snake', 'camping/bear': 'no food in the bank is safely wrong for a bear',
  'occupations/crossing_guard_2': 'a child safety patrol, not a grown-up', 'occupations/crossing_guard': 'a child safety patrol, not a grown-up',
  'kitchen tools/cup': 'a teacup full of a hot drink', 'camping/lake': 'a mountain landscape, not water',
};
/** the still ways to play (K-706): a child sitting still or a quiet game, by the gate's own table (review round 1: the
 *  empty bench reads as a place to climb, the TV set is an object and children dance to videos) */
const STILL_PLAY = new Set(['activities/reading', 'activities/puzzle', 'toys/video_game']);
function playFaults(P) { return P.still.filter((p) => !STILL_PLAY.has(p.theme + '/' + p.noun)).map((p) => `play: ${p.theme}/${p.noun} is not a still way to play by the gate's table`); }
function refusedArtFaults(b) { return bankPictures(b).filter(([p]) => REFUSED_ART[p.theme + '/' + p.noun]).map(([p, where]) => `${where}: ${p.theme}/${p.noun} is refused (${REFUSED_ART[p.theme + '/' + p.noun]})`); }
/** what is never a want on the needs page: needs in another frame (clothes, a bed, a house), air look-alikes, drinks */
const NOT_A_WANT = /^(shirt|t-shirt|coat|pants|bed|house|kite|balloon|beach_ball|milk|juice|water|soda|smoothie|lemonade)$/;
function needsFaults(n) {
  const f = [];
  for (const w of n.wants) if (NOT_A_WANT.test(w.pic.noun)) f.push(`needs: ${w.pic.noun} cannot be a want (it is a need or air in another frame)`);
  if (!n.air || n.air.drawn !== 'air') f.push('needs: no air card');
  if (n.food.length < 2) f.push('needs: fewer than two foods');
  return f;
}
function bedtimeFaults(cards) {
  const f = [];
  const ids = cards.map((c) => c.id);
  // every card draws its OWN picture (review round 1: an empty bed with a book and an empty bed with the moon have no
  // forced order, whatever the model's ranks say)
  const seen = {};
  for (const c of cards) for (const p of c.pics) { const k = p.theme + '/' + p.noun; if (seen[k]) f.push(`bedtime: ${c.id} and ${seen[k]} draw the same ${p.noun} (two cards on one picture have no forced order)`); else seen[k] = c.id; }
  const n = DK.validOrderCount(ids, DK.bedBefore);
  if (n !== 1) f.push(`bedtime ${ids.join(',')}: ${n} valid orders (exactly one)`);
  return f;
}
function pairFaults(list, a, b, what) {
  const f = [];
  const key = (p) => p.theme + '/' + p.noun;
  if (new Set(list.map((x) => key(x[a]))).size !== list.length) f.push(`${what}: two pairs share a ${a}`);
  if (new Set(list.map((x) => key(x[b]))).size !== list.length) f.push(`${what}: two pairs share a ${b}`);
  return f;
}
/** the gate's OWN table of who reads as a grown-up and who as a child (review round 1: helpers a child cannot swap) */
const GROWN_UP = new Set(['occupations/police_officer', 'occupations/firefighter', 'occupations/doctor', 'occupations/teacher', 'hospital/nurse', 'occupations/nurse', 'classroom/teacher']);
const CHILD = new Set(['classroom/student', 'toys/girl', 'activities/reading', 'activities/jumping', 'toys/baby_girl']);
/** review round 2: pictures that do NOT read as a young child (and so can be circled as a grown-up) */
const NOT_CHILD = { 'activities/running': 'grown-up proportions: reads as a teenager or a woman jogging', 'activities/biking': 'an older boy', 'activities/dancing': 'a young woman (ballerina)' };
function trustedFaults(T) {
  const f = [];
  const k = (p) => p.theme + '/' + p.noun;
  for (const p of T.grownUps) if (!GROWN_UP.has(k(p))) f.push(`trusted: ${k(p)} is not a grown-up by the gate's table`);
  for (const p of T.children) if (NOT_CHILD[k(p)]) f.push(`trusted: ${k(p)} is not clearly a child (${NOT_CHILD[k(p)]})`); else if (!CHILD.has(k(p))) f.push(`trusted: ${k(p)} is not a child by the gate's table`);
  if (T.grownUps.length < 4 || T.children.length < 4) f.push('trusted: fewer than 4 grown-ups or 4 children');
  if (!/^Always check first with your grown-up before you go anywhere with anyone\.$/.test(T.line || '')) f.push('trusted: the help-seeking line is not "Always check first with your grown-up before you go anywhere with anyone."');
  return f;
}
/** review round 2: animals that read as hole diggers: never the extra animal on a page that shows the rabbit hole */
const HOLE_LOOKALIKE = { 'insects and bugs/ant': 'digs tunnels', 'forest creatures/beaver': 'reads as a groundhog, which digs holes' };
function landFaults(L) {
  const f = [], k = (p) => p.theme + '/' + p.noun;
  const hole = L.find((p) => p.home === 'rabbit-hole');
  if (!hole) return f;
  for (const p of L) if (p !== hole && HOLE_LOOKALIKE[k(p.animal)] && !(hole.noExtraWith || []).includes(p.id)) f.push(`land: the ${p.animal.noun} can be the extra beside the rabbit hole (${HOLE_LOOKALIKE[k(p.animal)]})`);
  return f;
}
function frogFaults(F) {
  const f = [];
  const ids = new Set(F.fits.map((x) => x.pic.noun));
  for (const m of F.misfits) if (ids.has(m.pic.noun)) f.push(`frog: ${m.pic.noun} both fits and does not`);
  for (const need of ['water', 'food', 'home']) if (!F.fits.some((x) => x.need === need)) f.push(`frog: nothing for ${need}`);
  return f;
}
function bankFaults(b) {
  return [
    ...needsFaults(b.BODY_NEEDS), ...stormFaults(b.STORM_ROWS), ...foodFaults(b.ANIMAL_FOOD, b.FOODS), ...directionFaults(b.DIRECTION),
    ...bedtimeFaults(b.BEDTIME), ...refusedArtFaults(b), ...playFaults(b.PLAY),
    ...pairFaults(b.LAND_CHANGES.map((x) => ({ home: { theme: 'h', noun: x.home }, animal: x.animal })), 'home', 'animal', 'land'),
    ...trustedFaults(b.TRUSTED), ...landFaults(b.LAND_CHANGES), ...frogFaults(b.FROG_HOME),
    ...bankPictures(b).flatMap(([p, where]) => artFaults(p, where)),
  ];
}

/* ================================================================ 2. build sweep: answers, tells, levels */
/** the pictures a built page names (img data-dk-pic + svg image data-dk-pic) */
const picsOf = (html) => [...html.matchAll(/data-dk-pic="([^"]+)"/g)].map((m) => { const i = m[1].lastIndexOf('/'); return { theme: m[1].slice(0, i).replace(/&amp;/g, '&'), noun: m[1].slice(i + 1) }; });
/** chance bands: the pooled share at every place within ±tol of what chance gives */
function bandFaults(what, counts, total, expect, tol) {
  const f = [];
  counts.forEach((c, i) => { const s = c / total; if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds the answer ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); });
  return f;
}
/**
 * tellFaults(id, level, metas) — the positional-tell checks of one type and level over many built copies (metas). Pure:
 * a spoiled list of metas (the poison) runs through the same function.
 */
function tellFaults(id, lv, metas) {
  const f = [], N = metas.length, tag = `${id} L${lv}`;
  const mode = metas[0].mode;
  if (mode === 'needs' || mode === 'trusted') {
    const G = mode === 'needs' ? 'N' : 'G';
    const cells = metas[0].cells.length, need = metas[0].cells.filter((c) => c[0] === G).length;
    const cnt = Array(cells).fill(0);
    for (const m of metas) {
      m.cells.forEach((c, i) => { if (c[0] === G) cnt[i]++; });
      if (DK.patterned(m.cells.map((c) => c[0] === G))) f.push(`${tag}: a page's ${mode === 'needs' ? 'needs' : 'grown-ups'} follow a pattern`);
    }
    f.push(...bandFaults(`${tag} ${mode === 'needs' ? 'needs' : 'grown-ups'}`, cnt, N, cnt.map(() => need / cells), 0.1));
  } else if (mode === 'storm' || mode === 'eats') {
    const cnt = [0, 0, 0]; let rows = 0;
    for (const m of metas) {
      const pos = mode === 'storm' ? m.rows.map((r) => +r.split('@')[1]) : m.rows.map((r) => { const ch = r.split(':')[1].split(','); const plus = ch.filter((c) => c[0] === '+').length; return plus === 1 ? ch.findIndex((c) => c[0] === '+') : ch.findIndex((c) => c[0] === '-'); });
      pos.forEach((p) => { cnt[p]++; rows++; });
      if (pos.length >= 3 && new Set(pos).size === 1) f.push(`${tag}: every row's answer in one place`);
    }
    f.push(...bandFaults(`${tag} answer place`, cnt, rows, [1 / 3, 1 / 3, 1 / 3], 0.08));
  } else if (mode === 'frog-home' && metas[0].cards.some((c) => c[0] === '-')) {
    const n = metas[0].cards.length, cnt = Array(n).fill(0); let mis = 0;
    for (const m of metas) m.cards.forEach((c, i) => { if (c[0] === '-') { cnt[i]++; mis++; } });
    f.push(...bandFaults(`${tag} misfit place`, cnt, mis, cnt.map(() => 1 / n), 0.08));
  } else if (mode === 'land') {
    const off = {}; let tot = 0;
    for (const m of metas) {
      m.pairs.forEach((p, i) => { const j = m.right.indexOf(p); if (j === i) f.push(`${tag}: an answer straight across from its item`); off[j - i] = (off[j - i] || 0) + 1; tot++; });
      for (const x of answerFaults(id, '', m)) f.push(`${tag}: ${x}`);   // review round 2: every built page, not a sample
    }
    const top = Math.max(...Object.values(off)) / tot;
    if (top > 0.6) f.push(`${tag}: the answer is ${(100 * top).toFixed(0)}% of the time at the same offset from its item`);
  } else if (mode === 'pushpull') {
    let al = 0, sd = 0;
    for (const m of metas) {
      const bins = m.bins.split(','), cols = m.cols;
      const items = m.items.map((x) => x.split(':')[0]);
      let a = 0, s = 0;
      items.forEach((act, i) => { const c = i % cols; const side = c * 2 < cols - 1 ? 0 : c * 2 > cols - 1 ? 1 : -1; if (side < 0) return; s++; if (bins[side] === act) a++; });
      if (s && (a === s || a === 0)) f.push(`${tag}: the pictures line up with the bins`);
      if (DK.patterned(items.map((x) => x === 'push'))) f.push(`${tag}: the pushes follow a pattern`);
      al += a; sd += s;
    }
    if (Math.abs(al / sd - 0.5) > 0.12) f.push(`${tag}: a picture sits on its bin's side ${(100 * al / sd).toFixed(1)}% of the time`);
  } else if (mode === 'direction' && metas[0].items[0].includes('@')) {
    const cnt = [0, 0]; let tot = 0;
    for (const m of metas) m.items.forEach((x) => { cnt[+x.split('@')[1]]++; tot++; });
    f.push(...bandFaults(`${tag} right arrow`, cnt, tot, [0.5, 0.5], 0.08));
  } else if (mode === 'sleep-play') {
    const r = metas[0].routine.split(','), n = r.length, cnt = r.map(() => Array(n).fill(0));
    let act = Array(metas[0].play.length).fill(0);
    for (const m of metas) {
      const o = m.order.split(',');
      if (o.join() === m.routine) f.push(`${tag}: the cut-outs are printed in the right order`);
      if (o.join() === r.slice().reverse().join()) f.push(`${tag}: the cut-outs are printed in reverse order`);
      if (o.filter((x, i) => x !== r[i]).length < Math.min(3, n)) f.push(`${tag}: fewer than 3 cut-outs out of place`);
      o.forEach((x, i) => { cnt[r.indexOf(x)][i]++; });
      m.play.forEach((p, i) => { if (p[0] === '+') act[i]++; });
      if (DK.patterned(m.play.map((p) => p[0] === '+'))) f.push(`${tag}: the active pictures follow a pattern`);
    }
    // a cut-out is never always in one slot of the strip
    cnt.forEach((c, k) => { const top = Math.max(...c) / N; if (top > 0.75) f.push(`${tag}: ${r[k]} is printed ${(100 * top).toFixed(0)}% of the time in one slot`); });
    f.push(...bandFaults(`${tag} active place`, act, N, act.map(() => 0.5), 0.1));
  } else if (mode === 'sun-shade') {
    let left = 0, tot = 0;
    for (const m of metas) { const s = m.rows.map((x) => x.endsWith('sun-left')); left += s.filter(Boolean).length; tot += s.length; if (s.length >= 2 && s.every((x) => x === s[0])) f.push(`${tag}: the sun is on one side in every row`); }
    if (Math.abs(left / tot - 0.5) > 0.08) f.push(`${tag}: the sun is on the left ${(100 * left / tot).toFixed(1)}% of the time`);
  } else if (['boat-test', 'penny', 'ramps'].includes(mode)) {
    const key = { 'boat-test': 'order', penny: 'kinds', ramps: 'sides' }[mode];
    const firsts = {}; for (const m of metas) { const k = String(m[key]).split(',')[0]; firsts[k] = (firsts[k] || 0) + 1; }
    const top = Math.max(...Object.values(firsts)) / N;
    if (top > 0.6) f.push(`${tag}: the same thing is first on ${(100 * top).toFixed(0)}% of the pages`);
  }
  return f;
}
/** the answer each item carries on the page agrees with the bank */
function answerFaults(id, html, meta) {
  const f = [];
  if (meta.mode === 'eats') {
    for (const r of meta.rows) {
      const [a, ch] = r.split(':'); const A = B.ANIMAL_FOOD.find((x) => x.id === a);
      for (const c of ch.split(',')) { const eaten = A.eats.includes(c.slice(1)); if (eaten !== (c[0] === '+')) f.push(`${id}: ${a} row marks ${c.slice(1)} ${c[0] === '+' ? 'eaten' : 'not eaten'}`); }
      if (!ch.split(',').some((c) => c[0] === '+')) f.push(`${id}: ${a} row has no right food`);
    }
  }
  if (meta.mode === 'storm') for (const r of meta.rows) { const [rid, at] = r.split('@'); const R = B.STORM_ROWS.find((x) => x.id === rid); const m = new RegExp(`data-dk-item="${rid}"[\\s\\S]*?(?=data-dk-item=|$)`).exec(html); const ch = m ? [...m[0].matchAll(/data-dk-choice="([^"]+)" data-dk-answer="([^"]+)"/g)] : []; if (ch.length !== 3 || ch[+at][1] !== R.safe.id || ch.filter((c) => c[2] === 'safe').length !== 1) f.push(`${id}: ${rid} row's safe choice is not ${R.safe.id} at ${at}`); }
  if (meta.mode === 'needs') for (const c of meta.cells) { const it = [...B.BODY_NEEDS.food, B.BODY_NEEDS.water, B.BODY_NEEDS.air].some((x) => x.id === c.slice(2)); if (it !== (c[0] === 'N')) f.push(`${id}: ${c} has the wrong group`); }
  if (meta.mode === 'land' && meta.pairs.includes('burrow')) for (const r of meta.right.filter((x) => x.endsWith('*'))) { const P = B.LAND_CHANGES.find((x) => x.id === r.slice(0, -1)); const why = HOLE_LOOKALIKE[P.animal.theme + '/' + P.animal.noun]; if (why) f.push(`${id}: the ${P.animal.noun} is the extra beside the rabbit hole (${why})`); }
  if (meta.mode === 'trusted') for (const c of meta.cells) { const g = B.TRUSTED.grownUps.some((p) => p.noun === c.slice(2)); if (g !== (c[0] === 'G')) f.push(`${id}: ${c} has the wrong group`); }
  if (meta.mode === 'frog-home') for (const c of meta.cards) { const fit = B.FROG_HOME.fits.some((x) => x.id === c.slice(1)); if (fit !== (c[0] === '+')) f.push(`${id}: ${c} has the wrong group`); }
  if (meta.mode === 'pushpull') for (const x of meta.items) { const [act, iid] = x.replace('~', '').split(':'); if (B.PUSH_PULL.find((p) => p.id === iid).act !== act) f.push(`${id}: ${iid} is not a ${act}`); }
  if (meta.mode === 'direction') for (const x of meta.items) { const [iid, rest] = x.split(':'); const it = B.DIRECTION.find((p) => p.id === iid); if (bounce(it.obstacle) !== rest.split('@')[0]) f.push(`${id}: ${iid} answer ${rest}`); }
  if (meta.mode === 'sleep-play') { if (DK.validOrderCount(meta.routine.split(','), DK.bedBefore) !== 1) f.push(`${id}: the routine has more than one order`); for (const p of meta.play) { const act = B.PLAY.active.some((q) => q.noun === p.slice(1)); if (act !== (p[0] === '+')) f.push(`${id}: ${p} has the wrong group`); } }
  return f;
}
/** the levels of a type truly differ: their parts (the counts of each stamped part) differ for the same seed */
function levelSig(html) {
  const c = {};
  for (const m of html.matchAll(/data-dk-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1;
  return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k]));
}

/* ================================================================ main */
async function main() {
  // ---- 1. bank
  const bf = bankFaults(B);
  ok(!bf.length, 'bank: ' + bf.slice(0, 10).join(' | '));
  const P = (name, mut, re) => { const b = clone(B); mut(b); judge(name, bankFaults(b), re); };
  P('PB1 the cow row may hold a leaf (it eats leaves: two right foods)', (b) => { b.ANIMAL_FOOD.find((a) => a.id === 'cow').never.push('leaf'); }, /both eaten and never eaten|right foods/);
  P('PB2 the house (indoors) in the snow row', (b) => { b.STORM_ROWS.find((r) => r.id === 'snow').wrong.push({ id: 'indoors', pic: { theme: 'miscellaneous', noun: 'house' } }); }, /ALSO safe in snow/);
  P('PB3 brushing teeth in the bedtime routine', (b) => { b.BEDTIME.splice(2, 0, { id: 'teeth', pics: [{ theme: 'around the house', noun: 'toothbrush' }] }); }, /3 valid orders|valid orders \(exactly one\)/);
  P('PB4 the ball turns DOWN off a block slanted up', (b) => { b.DIRECTION.find((x) => x.id === 'slant-up').right = 'down'; }, /the ball goes up/);
  P('PB5 a picture missing from the library', (b) => { b.BODY_NEEDS.wants[0].pic = { theme: 'toys', noun: 'unicorn' }; }, /not in the cache manifest/);
  P('PB6 a black-and-white picture beside colour', (b) => { b.FOODS.grass = { theme: 'animals bw', noun: 'cat' }; }, /black-and-white/);
  P('PB7 a kite among the wants (looks like air)', (b) => { b.BODY_NEEDS.wants.push({ id: 'kite', pic: { theme: 'toys', noun: 'kite' }, word: 'kite' }); }, /cannot be a want/);
  P('PB8 a police car among the grown-ups (the old helper/place pairs: a vehicle is no helper)', (b) => { b.TRUSTED.grownUps.push({ theme: 'vehicles', noun: 'police_car' }); }, /not a grown-up by the gate's table/);
  P('PB8b a child safety patrol among the grown-ups', (b) => { b.TRUSTED.grownUps.push({ theme: 'occupations', noun: 'crossing_guard_2' }); }, /not a grown-up by the gate's table|crossing_guard_2 is refused/);
  P('PB8c the help-seeking line dropped', (b) => { b.TRUSTED.line = ''; }, /help-seeking line/);
  P('PB11 the banded worm back in the frog row (reads as a snake)', (b) => { b.FOODS.worm = { theme: 'insects and bugs', noun: 'worm' }; b.ANIMAL_FOOD.find((a) => a.id === 'frog').eats.push('worm'); }, /reads as a snake/);
  P('PB12 the bear back as an eats-both animal', (b) => { b.ANIMAL_FOOD.push({ id: 'bear', pic: { theme: 'camping', noun: 'bear' }, eats: ['fish', 'berries'], right: [['fish', 'berries']], never: ['carrot', 'meat', 'grass'], kind: 'both' }); }, /safely wrong for a bear/);
  P('PB15 the beaver allowed as the extra beside the rabbit hole (reads as a groundhog)', (b) => { b.LAND_CHANGES.find((x) => x.id === 'burrow').noExtraWith = ['anthill']; }, /beaver can be the extra beside the rabbit hole/);
  P('PB8d the running girl (grown-up proportions) back among the children', (b) => { b.TRUSTED.children.push({ theme: 'activities', noun: 'running' }); }, /not clearly a child/);
  P('PB14 the TV set back among the still ways to play', (b) => { b.PLAY.still.push({ theme: 'around the house', noun: 'television' }); }, /not a still way to play/);
  P('PB13 the two empty-bed cards back (book on the bed, moon on the bed)', (b) => { b.BEDTIME = [b.BEDTIME[0], b.BEDTIME[1], { id: 'story', pics: [{ theme: 'around the house', noun: 'bed' }, { theme: 'classroom', noun: 'book' }] }, { id: 'asleep', pics: [{ theme: 'around the house', noun: 'bed' }, { theme: 'space', noun: 'moon' }] }]; }, /draw the same bed/);
  P('PB9 a frog misfit that also fits', (b) => { b.FROG_HOME.misfits.push({ id: 'log2', pic: { theme: 'camping', noun: 'log' } }); }, /both fits and does not/);
  P('PB10 the umbrella offered as safe in a thunderstorm row', (b) => { b.STORM_ROWS.find((r) => r.id === 'thunder').wrong.push({ id: 'umbrella', pic: { theme: 'accessories', noun: 'umbrella' } }); b.STORM_ROWS.find((r) => r.id === 'thunder').safe = { id: 'umbrella', pic: { theme: 'accessories', noun: 'umbrella' } }; }, /not safe in thunder|a choice twice/);

  // ---- 2. build sweep
  const metasOf = {};
  for (const id of IDS) {
    const t = loadType(id);
    ok(t.exerciseType && /^[a-z-]+$/.test(t.exerciseType), `${id}: no family key`);
    let refused = false; try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const metas = [];
      for (let s = 1; s <= SEEDS; s++) {
        let r;
        try { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`dk|${id}|${lv}|${s}`), variant: s }); } catch (e) { ok(false, `${id} L${lv} #${s}: build throws ${e.message}`); break; }
        metas.push(r.meta);
        if (s <= 3) {
          const af = answerFaults(id, r.bodyHtml, r.meta); ok(!af.length, af.join(' | '));
          for (const p of picsOf(r.bodyHtml)) { const pf = artFaults(p, `${id} L${lv}`); ok(!pf.length, pf.join(' | ')); }
          if (s === 1) sigs[lv] = levelSig(r.bodyHtml);
        } else if (s % 50 === 0) { const af = answerFaults(id, r.bodyHtml, r.meta); ok(!af.length, af.join(' | ')); }
      }
      metasOf[id + ' ' + lv] = metas;
      const tf = tellFaults(id, lv, metas);
      ok(!tf.length, tf.slice(0, 6).join(' | '));
    }
    ok(sigs[1] !== sigs[2] && sigs[2] !== sigs[3] && sigs[1] !== sigs[3], `${id}: two levels draw the same parts`);
  }
  // tell poisons: the real metas, spoiled so the answer always sits in one place
  const spoil = (key, fn) => metasOf[key].map((m) => fn(clone(m)));
  judge('PT1 the storm safe choice always first', tellFaults('K-690', 2, spoil('K-690 2', (m) => ({ ...m, rows: m.rows.map((r) => r.split('@')[0] + '@0') }))), /place 1 holds|one place/);
  judge('PT2 the animal food always last', tellFaults('K-691', 1, spoil('K-691 1', (m) => ({ ...m, rows: m.rows.map((r) => { const [a, ch] = r.split(':'); const c = ch.split(','); const p = c.filter((x) => x[0] === '+'), q = c.filter((x) => x[0] !== '+'); return a + ':' + [...q, ...p].join(','); }) }))), /holds the answer/);
  judge('PT3 the needs all in the first row', tellFaults('K-687', 2, spoil('K-687 2', (m) => ({ ...m, cells: [...m.cells.filter((c) => c[0] === 'N'), ...m.cells.filter((c) => c[0] === 'W')] }))), /pattern|holds the answer/);
  judge('PT4 the push / pull pictures lined up over their bins', tellFaults('K-694', 1, spoil('K-694 1', (m) => { const bins = m.bins.split(','); return { ...m, items: [bins[0] + ':a', bins[1] + ':b', bins[0] + ':c', bins[1] + ':d'] }; })), /line up with the bins/);
  judge('PT5 the frog misfits always first', tellFaults('K-692', 2, spoil('K-692 2', (m) => ({ ...m, cards: [...m.cards.filter((c) => c[0] === '-'), ...m.cards.filter((c) => c[0] === '+')] }))), /misfit place/);
  judge('PT6 the maker always straight across', tellFaults('K-693', 2, spoil('K-693 2', (m) => ({ ...m, right: m.pairs.slice() }))), /straight across|same offset/);
  judge('PT7 the bedtime cut-outs in reverse', tellFaults('K-706', 2, spoil('K-706 2', (m) => ({ ...m, order: m.routine.split(',').reverse().join(',') }))), /reverse order/);
  judge('PT8 the sun always on the left', tellFaults('K-703', 2, spoil('K-703 2', (m) => ({ ...m, rows: m.rows.map((r) => r.split(':')[0] + ':sun-left') }))), /one side in every row|on the left/);
  judge('PT10 the grown-ups all in the first row', tellFaults('K-707', 2, spoil('K-707 2', (m) => ({ ...m, cells: [...m.cells.filter((c) => c[0] === 'G'), ...m.cells.filter((c) => c[0] === 'C')] }))), /pattern|holds the answer/);
  // K-374 (review round 1): the K-369 builder refuses a routine whose grown-up's hand is not held from the curb
  { const k = loadType('K-374'); const RS = require(path.join(WG, 'lib', 'b5-common.js')).bank('road-safety', 'en'); let why = '';
    try { k._buildWith({ block: { ...RS, steps: ['stop-kerb', 'look-left', 'look-right', 'look-left-again-hand', 'walk-across-hand'] }, config: k.difficulty[2] }, { locale: 'en' }, { rng: makeRng('pk1') }); why = 'built'; } catch (e) { why = e.message; }
    judge('PK1 K-374 the grown-up taken only at the again-look (not from the curb)', [why], /hand halfway/);
    let ctl = ''; try { k._buildWith({ block: RS, config: k.difficulty[2] }, { locale: 'en' }, { rng: makeRng('pk1') }); ctl = 'built'; } catch (e) { ctl = e.message; }
    ok(ctl === 'built', `K-374 en: the shipped all-hand routine does not build (${ctl})`); }
  judge('PT9 the right arrow always on the left', tellFaults('K-696', 1, spoil('K-696 1', (m) => ({ ...m, items: m.items.map((x) => x.split('@')[0] + '@0') }))), /right arrow/);
  // why hundreds of seeds: the same checks on 10-copy pools of the REAL pages report tells that are not there
  { let falseTells = 0, pools = 0; for (const [k, ms] of Object.entries(metasOf)) for (let i = 0; i + 10 <= Math.min(ms.length, 100); i += 10) { pools++; if (tellFaults(k.split(' ')[0], k.split(' ')[1], ms.slice(i, i + 10)).length) falseTells++; }
    console.log(`10-copy pools of the real pages: ${falseTells} of ${pools} report a tell (the ${SEEDS}-copy pools report none)`); }
  // levels: a type whose three levels are one config
  { const t = loadType('K-690'); const same = { ...t, difficulty: { 1: t.difficulty[2], 2: t.difficulty[2], 3: t.difficulty[2] } };
    const sg = [1, 2, 3].map((lv) => levelSig(same.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('lv') }).bodyHtml));
    judge('PL1 three levels with one config', sg[0] === sg[1] && sg[1] === sg[2] ? ['two levels draw the same parts'] : [], /same parts/); }
  // answers: a page whose stamp says a carrot is eaten by the lion
  judge('PA2 a land page with the beaver as the extra beside the rabbit hole', answerFaults('K-693', '', { mode: 'land', pairs: ['burrow', 'nest'], right: ['nest', 'burrow', 'lodge*'] }), /beaver is the extra beside the rabbit hole/);
  ok(!answerFaults('K-693', '', { mode: 'land', pairs: ['burrow', 'lodge'], right: ['lodge', 'nest*', 'burrow'] }).length, 'PA2 control: the robin as the extra beside the hole is allowed');
  judge('PA1 a lion row marking a carrot eaten', answerFaults('K-691', '', { mode: 'eats', rows: ['lion:+meat,+carrot,-grass'] }), /marks carrot eaten/);

  // ---- 3. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
  const OUT = path.join(require('os').tmpdir(), 'verify-dk-kinder');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const stacks = [];
  const render = async (type, lv, v, base) => {
    const strings = withLevelInstruction(resolveStrings(type.id, 'en', type), type.id, lv, 'en');
    const r = await renderInstance({ type, theme: null, difficulty: lv, locale: 'en', strings, variant: v, page, outDir: OUT, baseName: base });
    for (const x of ['.pdf', '.png', '.html']) try { fs.unlinkSync(path.join(OUT, base + x)); } catch (e) {}
    return r;
  };
  try {
    for (const id of IDS) {
      const t = loadType(id);
      for (const lv of [1, 2, 3]) for (let v = 1; v <= (QUICK ? 1 : 2); v++) {
        const r = await render(t, lv, v, `${id}-L${lv}-v${v}`);
        const bad = [].concat(r.qa.lints || [], r.qa.verify || []);
        ok(!bad.length, `${id} L${lv} v${v}: ${bad.slice(0, 3).join(' | ')}`);
        if (v === 1) {
          const st = await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom); return Math.round(Math.max(...ink) - rt.top); });
          stacks.push(`${id} L${lv} ${st}`);
        }
      }
    }
    // render poisons: a page spoiled for each in-page check (a wrapper type whose build spoils the real body)
    const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); return { ...r, bodyHtml: fn(r.bodyHtml) }; } }; };
    const pr = async (name, id, lv, fn, re) => { const r = await render(spoilType(id, fn), lv, 1, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re); };
    await pr('PR1 the page squeezed to 500 px (blank band at the bottom)', 'K-701', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="max-height:500px"'), /the stack is/);
    await pr('PR2 a box laid over another (collision)', 'K-690', 2, (h) => h.replace('<div class="dk-row"', '<div data-dk-box style="position:absolute;left:30px;top:30px;width:200px;height:120px;background:#FFFFFF"></div><div class="dk-row"'), /two boxes collide/);
    await pr('PR3 a drawing wider than its tile', 'K-694', 2, (h) => h.replace(/<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="198"/, '<svg xmlns="http://www.w3.org/2000/svg" style="min-width:330px" width="198"'), /runs out of its box/);
    await pr('PR4 a blank band at the top', 'K-689', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="padding-top:90px"'), /starts \d+ px below/);
    await pr('PR5 a picture that does not load', 'K-687', 2, (h) => h.replace(/src="file:[^"]+apple@3x\.webp"|src="file:[^"]+bread@3x\.webp"|src="file:[^"]+banana@3x\.webp"|src="file:[^"]+carrot@3x\.webp"/, 'src="file:///nope.webp"'), /did not load|broken image/);
    await pr('PR6 a storm row with two safe choices', 'K-690', 2, (h) => h.replace('data-dk-answer="no"', 'data-dk-answer="safe"'), /2 right choices/);
    await pr('PR7 a pull drawn without its rope', 'K-694', 2, (h) => h.replace(/data-dk-rope="1"/g, ''), /pull without its rope/);
    await pr('PR8 the trusted page without its help-seeking line', 'K-707', 2, (h) => h.replace(/(data-dk-line="1">)[^<]*/, '$1'), /help-seeking line is not printed/);
    // PR9 (K-374): the stop-at-the-curb card drawn WITHOUT the grown-up (the hand not from the curb) — the drawn page refuses
    { const k = loadType('K-374'); const C5 = require(path.join(WG, 'templates', 'components-b5.js'));
      const figOf = (step) => /<div class="rs-cfig"[\s\S]*?<\/svg><\/div>/.exec(C5.rsCrossingCard({ step, w: 200, figH: 130, minFrameH: 196, box: { w: 64, h: 60 } }))[0];
      const spoilK = { ...k, build(a, c) { const r = k.build(a, c); return { ...r, bodyHtml: r.bodyHtml.replace(/(data-lcs-step="stop-kerb-hand"[\s\S]*?)<div class="rs-cfig"[\s\S]*?<\/svg><\/div>/, (m, pre) => pre + figOf('stop-kerb')) }; } };
      const strings = require(path.join(WG, 'i18n', 'strings.js')).resolveStrings('K-374', 'en', k);
      const rc = await renderInstance({ type: k, theme: null, difficulty: 2, locale: 'en', strings, variant: 1, page, outDir: OUT, baseName: 'k374-ctl' });
      ok(![].concat(rc.qa.verify || [], rc.qa.lints || []).length, `K-374 en control: ${[].concat(rc.qa.verify || [], rc.qa.lints || []).slice(0, 2).join(' | ')}`);
      const rp = await renderInstance({ type: spoilK, theme: null, difficulty: 2, locale: 'en', strings, variant: 1, page, outDir: OUT, baseName: 'k374-poison' });
      judge('PR9 K-374 the grown-up missing from the stop-at-the-curb card', [].concat(rp.qa.verify || [], rp.qa.lints || []), /grown-up is drawn on only some cards/);
      // PR10 (review round 2): the grown-up raised into the look-right arc: the arrow touches the grown-up
      const spoilR = { ...k, build(a, c) { const r = k.build(a, c); return { ...r, bodyHtml: r.bodyHtml.replace(/(data-lcs-step="look-right-hand"[\s\S]*?data-lcs-adult="1" transform=")translate\(20 -28\.2\)/, '$1translate(20 -48.2)') }; } };
      const rr = await renderInstance({ type: spoilR, theme: null, difficulty: 2, locale: 'en', strings, variant: 1, page, outDir: OUT, baseName: 'k374-poison2' });
      judge('PR10 K-374 the look-right arrow touching the grown-up', [].concat(rr.qa.verify || [], rr.qa.lints || []), /a sight arrow touches the grown-up/);
      for (const b of ['k374-ctl', 'k374-poison', 'k374-poison2']) for (const x of ['.pdf', '.png', '.html']) try { fs.unlinkSync(path.join(OUT, b + x)); } catch (e) {} }
  } finally { await browser.close(); }

  console.log(`stacks (level 1-3, copy 1, measured on what is drawn): ${stacks.join(' · ')}`);
  console.log(`poisons ${killed}/${poisons} killed`); for (const l of plog) console.log(l);
  if (killed !== poisons) fails.push(`${poisons - killed} poison(s) not killed`);
  console.log(fails.length ? `FAIL (${fails.length} of ${assertions} assertions)\n  ` + fails.slice(0, 40).join('\n  ') : `PASS (${assertions} assertions, ${SEEDS} seeds a level)`);
  process.exit(fails.length ? 1 : 0);
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, tellFaults, answerFaults, bounce, SAFE_IN };
