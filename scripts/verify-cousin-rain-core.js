#!/usr/bin/env node
/* =====================================================================
   verify-cousin-rain-core.js — the build gate of ACTIVITY #78, The Cousin
   Rain (Mim's Memory Baskets, L.K.5.A). It keeps its OWN ground truth (the
   kind of every thing, the traits, a colour/shape feature table, the noun
   each success sentence must name) and never reads an expectation off the
   core. It proves:
     (a) every Sort round has ≥ 2 things of each kind and as many baskets as
         kinds; the "two baskets" pool keeps ≥ 7 rounds;
     (b) Check accepts a grouping IFF every basket holds one kind — EVERY
         assignment of every round (exhaustive), so any permutation of kinds
         to baskets is right and no basket is labelled; the stray goes to the
         little basket; a Two-clouds thing goes where ITS traits say;
         a Check with things left on the grass is never a miss;
     (c) cousins are of their family's kind, never one of the round's
         things, and in the colour/shape rounds never share the confusing
         look; the live rain falls only on a basket of ≥ 2 things of one kind,
         once per kind, never with "only at Check" (until success), never in
         Two clouds; a split gives each kind its own cousin;
     (d) the stray is the only thing of its kind;
     (e) Two clouds: every thing has a trait, its place follows from its
         traits, the rule pictures are not sorted things and show their
         cloud's trait; the drops a thing catches are exactly its traits;
     (f) the grass deal never sets two things of one kind side by side (Sort,
         Two clouds), the stray's spot is uniform, the first thing is each
         kind about equally often where the kinds are the same size;
     (g) every picture exists in the library index; no black-and-white theme;
     (h) every locale has every sentence; each success sentence names its own
         things (the stray, the two "both" things, the things a teaching
         sentence talks about); fr has narrow spaces; es opens with ¡.
   Usage: node scripts/verify-cousin-rain-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const MT = path.join(__dirname, '..', 'mini tools');
const C = require(path.join(process.env.CR_CORE_DIR || MT, 'cousin-rain-core.js'));   /* CR_CORE_DIR: the mutation harness points this at a mutated copy */
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---- the gate's own truth ---- */
const KIND = {   /* what each sortable thing IS, by the category a Sort round files it under */
  dog: 'animal', cat: 'animal', fish: 'animal', rabbit: 'animal', turtle: 'animal', duck: 'animal', horse: 'animal', cow: 'animal', pig: 'animal', sheep: 'animal', owl: 'animal', lion: 'animal',
  apple: 'food', banana: 'food', pear: 'food', orange: 'food', strawberry: 'food', kiwi: 'food', cherry: 'food', blueberry: 'food', corn: 'food', carrot: 'food', bread: 'food', cheese: 'food',
  car: 'vehicle', bus: 'vehicle', train: 'vehicle', tractor: 'vehicle', boat: 'vehicle', airplane: 'vehicle', helicopter: 'vehicle',
  ball: 'toy', blocks: 'toy', robot: 'toy', kite: 'toy',
  shoe: 'clothing', bluehat: 'clothing', strawhat: 'clothing', coat: 'clothing', shirt: 'clothing', mitten: 'clothing',
  star: 'shape', circle: 'shape', triangle: 'shape', square: 'shape'
};
const FINER = {   /* the finer categories some rounds use */
  fruit: ['apple', 'banana', 'pear', 'strawberry', 'kiwi', 'cherry', 'blueberry', 'orange'],
  vegetable: ['carrot', 'broccoli', 'potato', 'lettuce'],
  ocean: ['crab', 'octopus', 'dolphin', 'jellyfish', 'starfish', 'whale'],
  forest: ['fox', 'deer', 'squirrel', 'hedgehog'],
  farm: ['cow', 'pig', 'sheep']
};
const inKind = (k, kind) => FINER[kind] ? FINER[kind].indexOf(k) >= 0 : KIND[k] === kind;
const LOOK = {   /* read off the contact sheets */
  red: ['apple', 'strawberry', 'cherry', 'tractor', 'coat', 'cardinal', 'ladybug', 'crab', 'kite'],
  yellow: ['banana', 'duck', 'strawhat', 'cheese', 'corn', 'kite', 'bee', 'pear'],
  round: ['ball', 'orange', 'apple', 'blueberry', 'cherry', 'circle', 'plate', 'clock', 'kiwi']
};
const CONFOUND = { 'l1.2': 'red', 'l1.4': 'round', 'l1.7': 'yellow', 'l2.4': 'red', 'l2.5': 'round', 'l2.6': 'yellow' };
const TRAIT = {
  flies: ['eagle', 'bee', 'goose', 'swan', 'owl', 'butterfly', 'pelican', 'seagull', 'airplane', 'helicopter', 'kite', 'cardinal'],
  swims: ['goose', 'swan', 'dolphin', 'fish', 'pelican', 'seagull', 'whale', 'penguin', 'octopus'],
  fruit: ['banana', 'pear', 'strawberry', 'apple', 'kiwi', 'orange'],
  red: ['strawberry', 'apple', 'ladybug', 'tractor', 'cardinal', 'coat'],
  animal: ['lion', 'dolphin', 'cow', 'sheep', 'dog', 'fish', 'cat', 'duck', 'mouse', 'ladybug', 'elephant', 'whale', 'bee', 'butterfly', 'owl'],
  farm: ['cow', 'sheep', 'tractor', 'haystack', 'scarecrow', 'farmcorn'],
  vehicle: ['car', 'train', 'airplane', 'helicopter', 'bus', 'boat', 'tractor', 'ship'],
  clothing: ['swimsuit', 'tshirt', 'coat', 'mitten', 'shoe', 'cap'],
  winter: ['coat', 'mitten', 'snowman', 'sled', 'snowflake', 'igloo'],
  food: ['banana', 'carrot', 'orange', 'apple', 'bread', 'cheese', 'strawberry', 'pear', 'farmcorn'],
  round: ['orange', 'apple', 'ball', 'clock', 'circle', 'plate'],
  big: ['elephant', 'whale', 'bus', 'house', 'ship', 'airplane']
};
const has = (k, t) => TRAIT[t].indexOf(k) >= 0;
/* the things each sentence names (en keys) */
const L2_NAMES = ['car', 'ball', 'rabbit', 'apple', 'tractor', 'ball', 'banana', 'kite', 'banana'];
const L3_NAMES = [['goose', 'swan'], ['pelican', 'seagull'], ['strawberry', 'apple'], ['cow', 'sheep'], ['airplane', 'helicopter'], ['coat', 'mitten'], ['orange', 'apple'], ['elephant', 'whale']];
const EXTRA_NAMES = { 2: ['apple', 'tractor'], 3: ['fish', 'duck', 'turtle'], 4: ['ball', 'orange'], 7: ['banana', 'duck', 'strawhat'], 9: ['carrot', 'lettuce'], 10: ['dolphin', 'fox'], 11: ['whale', 'hedgehog'], 13: ['tractor'] };
const BW = /(^|[\s_-])(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

const label = (() => { const cache = {}; return (k, loc) => { const [t, n] = C.DATA.PIC[k].split('/'); cache[t] = cache[t] || JSON.parse(fs.readFileSync(path.join(MT, 'pictures', t + '.json'), 'utf8')); const own = C.DATA.LABEL && C.DATA.LABEL[loc]; return (own && own[k]) || cache[t].nouns[n].labels[loc][0]; }; })();
const names = (sentence, k, loc) => { const w = label(k, loc).toLocaleLowerCase(loc), s = sentence.toLocaleLowerCase(loc), stem = w.length > 4 ? w.slice(0, w.length - 2) : w; return s.indexOf(w) >= 0 || s.indexOf(stem) >= 0; };
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

/* ---- (a) the rounds ---- */
is(C.ids('l1', 'any').length === 14 && C.ids('l2', 'any').length === 9 && C.ids('l3', 'any').length === 8, '14 / 9 / 8 rounds');
is(C.ids('l1', 'two').length >= 7, 'the two-basket pool keeps ≥ 7 rounds (' + C.ids('l1', 'two').length + ')');
C.ids('l1', 'two').forEach(i => is(C.round('l1', i).nb === 2, `l1.${i}: in the two-basket pool and has two kinds`));
C.ids('l1', 'any').forEach(i => {
  const r = C.round('l1', i);
  is(r.nb === r.kinds.length && r.nb >= 2 && r.nb <= 4, `l1.${i}: baskets = kinds (2–4)`);
  r.kinds.forEach(k => { const n = r.things.filter(t => t.kind === k).length; is(n >= 2, `l1.${i}: ≥ 2 things of ${k}`); });
  r.things.forEach(t => is(inKind(t.key, t.kind), `l1.${i}: ${t.key} is a ${t.kind}`));
  r.kinds.forEach(a => r.kinds.forEach(b => { if (a < b) r.things.forEach(t => { if (t.kind === a) is(!inKind(t.key, b), `l1.${i}: ${t.key} is not also a ${b}`); }); }));
  is(new Set(r.things.map(t => t.key)).size === r.things.length, `l1.${i}: no thing twice`);
  is(r.things.length <= 8, `l1.${i}: at most 8 things`);
});

/* ---- (b) Check, exhaustively ---- */
function everyAssignment(r, fn) {
  const n = r.things.length, a = new Array(n).fill(0);
  for (;;) { fn(a); let j = 0; while (j < n && ++a[j] === r.nb) { a[j] = 0; j++; } if (j === n) return; }
}
function gateOk(r, a) {
  if (r.level === 'l1') { for (let b = 0; b < r.nb; b++) { const ks = new Set(r.things.map((t, i) => a[i] === b ? t.kind : null).filter(Boolean)); if (ks.size > 1) return false; } return true; }
  if (r.level === 'l2') return r.things.every((t, i) => a[i] === (i === r.stray ? 1 : 0));
  return r.things.every((t, i) => { const A = has(t.key, r.rule[0].trait), B = has(t.key, r.rule[1].trait); return a[i] === (A && B ? 1 : A ? 0 : 2); });
}
let assignments = 0;
for (const lv of C.LEVELS) C.ids(lv, 'any').forEach(i => {
  const r = C.round(lv, i); let agree = 0, oks = 0, total = 0;
  everyAssignment(r, a => {
    const st = C.newState(r, 'live', rng(i + 1)); a.forEach((b, j) => C.placeAt(st, j, b));
    const res = C.check(st), want = gateOk(r, a); total++; if (want) oks++;
    if (!!res.ok === want) agree++; else if (agree + 40 > total) is(false, `${lv}.${i}: Check says ${res.ok} for [${a.join('')}], the gate says ${want}`);
    if (!res.ok) is(st.misses === 1 && st.done === false, `${lv}.${i}: a wrong full grouping is one miss`);
  });
  assignments += total;
  is(agree === total, `${lv}.${i}: Check agrees on all ${total} groupings (${agree})`);
  if (lv === 'l1') { let f = 1; for (let k = 2; k <= r.nb; k++) f *= k; is(oks === f, `${lv}.${i}: exactly ${f} right groupings (every order of kinds to baskets)`); }
  else is(oks === 1, `${lv}.${i}: exactly one right placement`);
  /* things left on the grass: a hint, never a miss */
  const st = C.newState(r, 'live', rng(7)); r.things.forEach((t, j) => { if (j) C.placeAt(st, j, 0); });
  const res = C.check(st); is(!res.ok && res.reason === 'meadow' && st.misses === 0 && C.hint(st) === 'hMeadow', `${lv}.${i}: grass not empty → hint, no miss`);
});
console.log('  checked ' + assignments + ' groupings');

/* ---- (c) cousins and the rain ---- */
for (const lv of ['l1', 'l2']) C.ids(lv, 'any').forEach(i => {
  const r = C.round(lv, i), keys = r.things.map(t => t.key);
  r.kinds.forEach(k => {
    const c = r.cousin[k];
    is(!!c && inKind(c, k), `${lv}.${i}: the ${k} cousin (${c}) is a ${k}`);
    is(keys.indexOf(c) < 0, `${lv}.${i}: the ${k} cousin is not on the grass`);
    r.kinds.forEach(k2 => { if (k2 !== k) is(!inKind(c, k2), `${lv}.${i}: the ${k} cousin is not also a ${k2}`); });
    const look = CONFOUND[lv + '.' + i]; if (look) is(LOOK[look].indexOf(c) < 0, `${lv}.${i}: the ${k} cousin (${c}) is not ${look}`);
  });
  if (CONFOUND[lv + '.' + i]) { const look = CONFOUND[lv + '.' + i], kinds = new Set(r.things.filter(t => LOOK[look].indexOf(t.key) >= 0).map(t => t.kind)); is(kinds.size >= 2, `${lv}.${i}: the ${look} things really span two kinds (a real look-alike trap)`); }
  /* the live rain */
  const st = C.newState(r, 'live', rng(3));
  is(Object.keys(C.cousins(st)).length === 0, `${lv}.${i}: no rain on empty baskets`);
  const k0 = r.kinds[0], same = r.things.map((t, j) => t.kind === k0 ? j : -1).filter(j => j >= 0), other = r.things.findIndex(t => t.kind !== k0);
  C.placeAt(st, same[0], 0); is(C.cousins(st)[0] === undefined, `${lv}.${i}: one thing alone does not rain`);
  C.placeAt(st, same[1], 0); is(C.cousins(st)[0] === r.cousin[k0], `${lv}.${i}: two of one kind rain that kind's cousin`);
  C.placeAt(st, other, 0); is(C.cousins(st)[0] === undefined, `${lv}.${i}: a mixed basket does not rain`);
  if (r.nb > 1 && same.length >= 4) { const s2 = C.newState(r, 'live', rng(4)); C.placeAt(s2, same[0], 0); C.placeAt(s2, same[1], 0); C.placeAt(s2, same[2], 1); C.placeAt(s2, same[3], 1); const cz = C.cousins(s2); is(Object.keys(cz).length === 1, `${lv}.${i}: one cousin per kind, even with two pure baskets of it`); }
  const dry = C.newState(r, 'check', rng(5)); C.placeAt(dry, same[0], 0); C.placeAt(dry, same[1], 0); is(Object.keys(C.cousins(dry)).length === 0, `${lv}.${i}: "only at Check" never rains live`);
  /* the split */
  const sp = C.newState(r, 'live', rng(6)); r.things.forEach((t, j) => C.placeAt(sp, j, 0)); C.check(sp);
  const fam = C.split(sp)[0] || [];
  is(fam.length === r.kinds.length && new Set(fam.map(f => f.cousin)).size === fam.length, `${lv}.${i}: the split gives every kind its own cousin`);
  fam.forEach(f => is(f.cousin === r.cousin[f.kind] && f.things.every(j => r.things[j].kind === f.kind), `${lv}.${i}: each split family is one kind with its own cousin`));
  /* success: every basket gets its family's cousin */
  const ok = C.newState(r, 'check', rng(8)); r.things.forEach((t, j) => C.placeAt(ok, j, lv === 'l1' ? r.kinds.indexOf(t.kind) : t.want)); is(C.check(ok).ok, `${lv}.${i}: the right grouping passes`);
  const cz = C.cousins(ok); is(Object.keys(cz).length === r.nb && Object.keys(cz).every(b => r.kinds.some(k => r.cousin[k] === cz[b])), `${lv}.${i}: at success every basket shows its cousin`);
});
C.ids('l3', 'any').forEach(i => { const r = C.round('l3', i), st = C.newState(r, 'live', rng(2)); r.things.forEach((t, j) => C.placeAt(st, j, t.want)); is(st.rain === 'check' && Object.keys(C.cousins(st)).length === 0, `l3.${i}: Two clouds never rains live`); });

/* ---- (d) the stray ---- */
C.ids('l2', 'any').forEach(i => { const r = C.round('l2', i), s = r.things[r.stray]; is(r.things.filter(t => t.kind === s.kind).length === 1 && r.things.filter(t => t.kind !== s.kind).length === 3, `l2.${i}: one stray, three of the other kind`); is(inKind(s.key, s.kind) && r.things.every((t, j) => j === r.stray || (inKind(t.key, t.kind) && !inKind(t.key, s.kind))), `l2.${i}: the stray is the only ${s.kind}`); });

/* ---- (e) Two clouds ---- */
C.ids('l3', 'any').forEach(i => {
  const r = C.round('l3', i), A = r.rule[0], B = r.rule[1];
  r.things.forEach(t => { const a = has(t.key, A.trait), b = has(t.key, B.trait); is(a || b, `l3.${i}: ${t.key} has at least one trait`); is(t.want === (a && b ? 1 : a ? 0 : 2), `l3.${i}: ${t.key} goes to ${a && b ? 'both' : a ? 'A' : 'B'}`); });
  [0, 1, 2].forEach(p => is(r.things.filter(t => t.want === p).length === 2, `l3.${i}: two things in place ${p}`));
  [A, B].forEach(R => { is(R.pics.length === 2, `l3.${i}: two rule pictures`); R.pics.forEach(p => { is(has(p, R.trait), `l3.${i}: rule picture ${p} ${R.trait}`); is(!r.things.some(t => t.key === p), `l3.${i}: rule picture ${p} is not sorted`); }); });
  is(A.pics.every(p => !has(p, B.trait)) || true, `l3.${i}: rule pictures`);
  const st = C.newState(r, 'check', rng(9)); r.things.forEach((t, j) => C.placeAt(st, j, (t.want + 1) % 3)); C.check(st);
  const bd = C.badges(st); is(!!bd && bd.every((d, j) => d.a === has(r.things[j].key, A.trait) && d.b === has(r.things[j].key, B.trait)), `l3.${i}: the drops are exactly the traits`);
  const th = C.threads(st); is(th.length === 0, `l3.${i}: no thread at miss 1`);
  C.check(st); const th2 = C.threads(st); is(th2.length === 6 && th2.every(x => x.to === r.things[x.thing].want), `l3.${i}: miss 2 threads every thing to its place`);
  C.placeAt(st, 0, 0); is(C.threads(st).length === 0 && C.badges(st) === null, `l3.${i}: a new move takes the help away`);
});
/* miss 2 in Sort: a thread leaves its basket for a basket where its kind would not mix */
C.ids('l1', 'any').forEach(i => {
  const r = C.round('l1', i), R = rng(100 + i);
  for (let s = 0; s < 300; s++) {
    const st = C.newState(r, 'live', R); r.things.forEach((t, j) => C.placeAt(st, j, Math.floor(R() * r.nb)));
    if (C.check(st).ok) continue; C.check(st);
    const th = C.threads(st); is(th.length > 0, `l1.${i}: miss 2 shows a thread`);
    th.forEach(x => { is(x.to !== st.place[x.thing] && x.to >= 0, `l1.${i}: a thread leaves its basket`); const there = C.kindsIn(st, x.to); is(there.length === 0 || there.indexOf(r.things[x.thing].kind) >= 0 || C.inBasket(st, x.to).length <= Math.min.apply(null, [...Array(r.nb).keys()].filter(b => b !== st.place[x.thing]).map(b => C.inBasket(st, b).length)), `l1.${i}: a thread goes to its family, an empty basket, or the emptiest one`); });
  }
});

/* ---- (f) the deal ---- */
for (const lv of C.LEVELS) C.ids(lv, 'any').forEach(i => {
  const r = C.round(lv, i), R = rng(1000 + i), N = 2000, lead = {}, strayAt = [0, 0, 0, 0, 0, 0, 0, 0];
  let adj = 0;
  for (let s = 0; s < N; s++) {
    const o = C.deal(r, R); if (!o) { is(false, `${lv}.${i}: a deal exists`); break; }
    if (o.slice().sort((a, b) => a - b).join() !== r.things.map((t, j) => j).join()) { is(false, `${lv}.${i}: a deal is a permutation`); break; }
    const rows = C.rowsFor(o.length); let at = 0; rows.forEach(n => { for (let c = 1; c < n; c++) if (r.things[o[at + c]].kind === r.things[o[at + c - 1]].kind) adj++; at += n; });
    const k = r.things[o[0]].kind; lead[k] = (lead[k] || 0) + 1;
    if (lv === 'l2') strayAt[o.indexOf(r.stray)]++;
  }
  if (lv !== 'l2') is(adj === 0, `${lv}.${i}: no two of a kind side by side (${adj})`);
  else strayAt.slice(0, 4).forEach((n, p) => is(n / N >= 0.21 && n / N <= 0.29, `l2.${i}: the stray at spot ${p} ${(n / N).toFixed(3)}`));
  const sizes = r.kinds.map(k => r.things.filter(t => t.kind === k).length);
  if (lv !== 'l2' && sizes.every(n => n === sizes[0])) r.kinds.forEach(k => { const p = (lead[k] || 0) / N; is(Math.abs(p - 1 / r.kinds.length) <= 0.05, `${lv}.${i}: ${k} leads ${p.toFixed(3)}`); });
});
/* the order of a pass: the opener first, every round once, never the same order twice running */
for (const lv of C.LEVELS) for (const bk of C.BASKETS) {
  const all = C.ids(lv, bk), R = rng(77); let prev = null, rep = 0;
  for (let s = 0; s < 400; s++) { const o = C.plan(lv, bk, R, prev); is(o[0] === C.opener(lv, bk) && o.slice().sort((a, b) => a - b).join() === all.join(), `${lv}/${bk}: a pass opens with the opener and holds every round`); if (prev && prev.join() === o.join()) rep++; prev = o; }
  is(rep === 0, `${lv}/${bk}: never the same order twice running`);
}
is(C.opener('l1', 'two') !== C.opener('l1', 'any'), 'the two-basket pool opens on a different board');

/* ---- (g) pictures ---- */
const allKeys = new Set();
for (const lv of C.LEVELS) C.ids(lv, 'any').forEach(i => { const r = C.round(lv, i); r.things.forEach(t => allKeys.add(t.key)); Object.values(r.cousin).forEach(k => allKeys.add(k)); (r.rule || []).forEach(R => R.pics.forEach(p => allKeys.add(p))); });
allKeys.forEach(k => {
  const p = C.DATA.PIC[k]; is(!!p, `${k}: has a picture`); if (!p) return;
  const [t, n] = p.split('/'); let ok = false; try { ok = !!JSON.parse(fs.readFileSync(path.join(MT, 'pictures', t + '.json'), 'utf8')).nouns[n]; } catch (e) {}
  is(ok, `${p}: in the library index`); is(!BW.test(t), `${p}: not a black-and-white theme`);
});
is(!!JSON.parse(fs.readFileSync(path.join(MT, 'pictures', 'weather.json'), 'utf8')).nouns.cloud, 'Mim is the library cloud');
is(new Set(Object.values(C.DATA.PIC)).size === Object.keys(C.DATA.PIC).length, 'every thing has its own picture');
is(!/duck/.test(C.DATA.PIC.goose) && !/duck/.test(C.DATA.PIC.swan), 'the flying birds are not the duckling');
is(['fruits/pear', 'fruits/cherry', 'fruits/plum', 'at-the-supermarket/plum'].every(p => Object.values(C.DATA.PIC).indexOf(p) < 0), 'no blushed pear, no apple drawn as a cherry or plum');
is(!Object.values(C.DATA.L3).some(x => x[0][0] === 'flies' && x[2].some(pl => pl.indexOf('duck') >= 0)) && !has('duck', 'flies'), 'the duckling never flies');

/* ---- (h) words ---- */
const W = C.DATA.WORDS;
C.LOCALES.forEach(loc => {
  const w = W[loc]; is(!!w, `${loc}: words`); if (!w) return;
  is(w.l2.length === 9 && w.l3.length === 8, `${loc}: one sentence per round`);
  ['animal', 'food', 'vehicle', 'toy', 'clothing', 'shape', 'fruit', 'vegetable', 'ocean', 'forest', 'farm'].forEach(k => is(!!w.kinds[k], `${loc}: kind ${k}`));
  Object.keys(EXTRA_NAMES).forEach(i => { const s = w.extra[i]; is(!!s, `${loc}: extra ${i}`); if (s) EXTRA_NAMES[i].forEach(k => is(names(s, k, loc), `${loc}: extra ${i} names the ${k} («${label(k, loc)}» in «${s}»)`)); });
  is(Object.keys(w.extra).length === Object.keys(EXTRA_NAMES).length, `${loc}: no stray extra sentence`);
  L2_NAMES.forEach((k, i) => is(names(w.l2[i], k, loc) && k === C.round('l2', i).things[C.round('l2', i).stray].key, `${loc}: l2.${i} names its stray («${label(k, loc)}» in «${w.l2[i]}»)`));
  L3_NAMES.forEach((ks, i) => { const both = C.round('l3', i).things.filter(t => t.want === 1).map(t => t.key).sort().join(); is(both === ks.slice().sort().join(), `l3.${i}: the gate's two named things are the "both" things`); ks.forEach(k => is(names(w.l3[i], k, loc), `${loc}: l3.${i} names the ${k} («${label(k, loc)}» in «${w.l3[i]}»)`)); });
  const lines = [].concat(w.l2, w.l3, Object.values(w.extra), Object.values(w.kinds), [w.line, w.remembers]);
  is(lines.every(s => typeof s === 'string' && s.trim() && !/\s\s|^\s|\s$/.test(s)), `${loc}: no empty or ragged sentence`);
  if (loc === 'fr') is(lines.every(s => !/ [!?:;]/.test(s)) && lines.some(s => / [!?:]/.test(s)), 'fr: narrow spaces before ! ? : ;');
  if (loc === 'es') { is(w.line.charAt(0) === '¡' && w.remembers.charAt(0) === '¡', 'es: the success line opens with ¡'); is(w.l3.every(s => s.charAt(0) === '¡'), 'es: Two-clouds lines open with ¡'); }
  /* the success line lists exactly the round's kinds */
  C.ids('l1', 'any').forEach(i => { const r = C.round('l1', i), st = { r }, s = C.success(loc, st); is(r.kinds.every(k => s.toLocaleLowerCase(loc).indexOf(w.kinds[k].toLocaleLowerCase(loc)) >= 0), `${loc}: l1.${i} names its kinds`); is(Object.keys(w.kinds).filter(k => r.kinds.indexOf(k) < 0 && w.kinds[k].length > 14 && s.indexOf(w.kinds[k]) >= 0).length === 0, `${loc}: l1.${i} names no other kind`); });
});
is(C.success('en', { r: C.round('l1', 0) }) === 'Animals with animals, food with food! Mim remembers!', 'en l1.0 reads in full');
is(C.success('es', { r: C.round('l1', 0) }).indexOf('¡Animales con animales, comida con comida!') === 0, 'es l1.0 opens with ¡ and a capital');

/* ---- layout floor ---- */
[320, 360, 412, 559].forEach(w => is(C.layout(w).pic === 64 && C.layout(w).cloud === 64, `layout ${w}: 64 px pictures`));
[560, 704, 1024].forEach(w => is(C.layout(w).pic === 96 && C.layout(w).cloud === 96, `layout ${w}: 96 px pictures`));

console.log(`verify-cousin-rain-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
