#!/usr/bin/env node
/**
 * verify-dk-g1.js — the gate of the Batch 1 Grade 1 science and health pages (G1-626 .. G1-652; factory
 * types/_shared/dk-g1.js + dk-g1-health.js, bank data/science/dk-g1.js; Daily Teaching System Stage D-5, 2026-11-23).
 *
 *   node scripts/worksheet-gen/qa/verify-dk-g1.js [--quick] [--seeds=400]
 *
 *   1. BANK: every closed item has ONE right answer by the gate's OWN tables, never by the bank's word: the mirror turn
 *      by the gate's own reflection; the animal-part and helper matches by counting the perfect matchings of every set
 *      a page can draw over the gate's own table of every pairing a child or teacher could defend (exactly 1); the
 *      parent and young clues by the gate's own reading of the two pictures; the parent that never cares by the gate's
 *      own table; ask-first and MyPlate by the gate's own tables (no food of two MyPlate groups, no thing a child may
 *      use alone); the friendly reminder by the gate's own words; the step orders by the gate's own model (exactly one
 *      valid order). Every picture is in the cache manifest AND on disk, colour, and not on the refused list (a cloud
 *      with a face, the sun with a face, a duck that reads as a duckling, a paramedic who reads as a child ...).
 *   2. BUILD, `--seeds` (default 400) copies of every type at every level: the answer stamped on each item agrees with
 *      the gate's tables; NO POSITIONAL TELL (where the answer sits, pooled over the seeds, within a band of chance;
 *      never straight across; the cards never line up with the plate's sides; step cards never in order); every
 *      picture on disk; the shadows on a page are told apart; the three levels truly differ; another locale refuses.
 *   3. RENDER (render/render-instance.js, the print pipeline), every type x level, 2 copies (1 with --quick): the type's
 *      verify() (the Batch K page check: the stack 620-740 measured on what is drawn, no blank band, no collision, no
 *      drawing out of its box, pictures loaded; plus the Batch 1 checks: one right answer per one-answer group, every
 *      sentence frame on its writing line, a number box per step card, every drawn child inside its card) and
 *      qa/lints.js are clean.
 *   4. POISONS: each check FAILS on a bank, a page or a set of pages spoiled for it (and passes on the real one).
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const WG = path.join(__dirname, '..');
const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const PM = require(path.join(WG, 'lib', 'picture-masks.js'));
const B = require(path.join(WG, 'data', 'science', 'dk-g1.js'));
const MAN = require(path.join(WG, 'cache', 'manifest.json'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const SEEDS = Number(arg('seeds', '400'));
const IDS = Array.from({ length: 27 }, (_, k) => 'G1-' + (626 + k));
const clone = (x) => JSON.parse(JSON.stringify(x));
const key = (p) => p.theme + '/' + p.noun;

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
/** the reflection of a ray along v off a mirror turned `turn` (page y grows down) */
function reflectOwn(v, turn) {
  const m = { slash: [Math.SQRT1_2, -Math.SQRT1_2], backslash: [Math.SQRT1_2, Math.SQRT1_2], upright: [0, 1] }[turn];
  const d = v[0] * m[0] + v[1] * m[1];
  return [Math.round(2 * d * m[0] - v[0]), Math.round(2 * d * m[1] - v[1])];
}
const STAR_DIR = { up: [0, -1], down: [0, 1] };
/** the turns that send the flashlight's rightward light to the star (exactly one must) */
const turnsToStar = (star) => ['slash', 'backslash', 'upright'].filter((t) => { const r = reflectOwn([1, 0], t); return r[0] === STAR_DIR[star][0] && r[1] === STAR_DIR[star][1]; });

/** every pairing a child or teacher could defend: animal (as drawn, with its printed part) -> invention */
const COPY_EDGES = {
  duck: ['paddle'],                       // webbed feet push the water like a paddle
  toucan: ['tongs'],                      // the beak picks up fruit like tongs
  beaver: ['saw', 'paddle'],              // the front teeth cut wood; the flat tail paddles
  whale: ['submarine', 'paddle'],         // the body shape dives; the flippers paddle
  woodpecker: ['hammer', 'tongs', 'saw'], // the beak hammers; a beak also grabs; it cuts holes in wood
};
/** who each helper PICTURE could be read as (the nurse's cap; the doctor's stethoscope, also a nurse's; the
 *  pharmacist's white coat, also a doctor's; the firefighter's gear) */
// review round 1: the drawn pharmacy (a grown-up behind a counter, shelves of medicine) reads only as the pharmacist; the
// library pharmacist (a boy in a doctor's coat) is refused
const HELPER_READS = { 'drawn/pharmacy': ['pharmacist'], 'hospital/nurse': ['nurse'], 'hospital/doctor': ['doctor', 'nurse'], 'occupations/pharmacist': ['pharmacist', 'doctor'], 'occupations/firefighter': ['firefighter'], 'occupations/doctor_2': ['doctor', 'nurse', 'pharmacist'], 'occupations/nurse': ['nurse', 'doctor'] };
/** perfect matchings of lefts onto rights over edges(left) */
function countMatchings(lefts, rights, edgesOf) {
  let n = 0; const used = new Set();
  const rec = (i) => { if (i === lefts.length) { n++; return; } for (const r of rights) if (!used.has(r) && edgesOf(lefts[i]).includes(r)) { used.add(r); rec(i + 1); used.delete(r); } };
  rec(0); return n;
}
const subsets = (arr, k) => { const out = []; const rec = (i, cur) => { if (cur.length === k) { out.push(cur.slice()); return; } for (let j = i; j < arr.length; j++) { cur.push(arr[j]); rec(j + 1, cur); cur.pop(); } }; rec(0, []); return out; };
/** what the two pictures of each parent-and-young pair show (opened at 260 px) */
const PY_FACTS = {
  // review round 1: a "same" clue is a fact BOTH have ("has a mane": the foal's is short, so a bare "mane" had two answers)
  horse: { size: 'different', 'has four legs': 'same', 'has a mane': 'same' },
  sheep: { size: 'different', 'has four legs': 'same', 'has wool': 'same' },
  hen: { size: 'different', 'has two legs': 'same', color: 'different', 'has a beak': 'same' },
};
/** clues a teacher could answer either way for that pair (refused) */
const PY_AMBIGUOUS = { horse: ['color', 'spots', 'tail', 'mane'], sheep: ['color', 'face', 'wool'], hen: ['feathers', 'beak'] };
/** a "same" clue must name something both have (has ...) or the size / color the pictures differ in */
const SAME_CLUE = /^has /;
const CARES = { robin: true, cat: true, kangaroo: true, penguin: true, 'sea-turtle': false };
// review round 1: the lesson's own things (medicine, gummy vitamins drawn as bears in a medicine bottle, a spray cleaner,
// a shot); the iron and the knife (tool safety) are out
const ADULT_ONLY = new Set(['hospital/medicine', 'hospital/syringe', 'drawn/vitamins', 'drawn/spray']);
const EVERYDAY = new Set(['fruits/apple', 'breakfast/milk', 'At the Supermarket/water', 'At the Supermarket/bread', 'fruits/banana', 'vegetables/carrot']);
/** things a child may use with or without a grown-up (two answers on an ask-first page) */
const EITHER_WAY = new Set(['hospital/thermometer', 'hospital/bandage', 'At the Supermarket/shampoo', 'around the house/toothpaste', 'At the Supermarket/candy', 'At the Supermarket/juice', 'kitchen tools/bottle']);
/** MyPlate, by the gate's own table (USDA MyPlate groups) */
const MYPLATE_OWN = {
  'fruits/apple': 'fruits', 'fruits/banana': 'fruits', 'fruits/strawberry': 'fruits', 'fruits/orange': 'fruits', 'fruits/pear': 'fruits',
  'vegetables/carrot': 'vegetables', 'vegetables/broccoli': 'vegetables', 'vegetables/lettuce': 'vegetables', 'vegetables/celery': 'vegetables',
  'At the Supermarket/bread': 'grains', 'breakfast/cereal': 'grains', 'bakery/toast': 'grains', 'breakfast/oatmeal': 'grains',
  'breakfast/boiled_egg': 'protein', 'At the Supermarket/fish': 'protein', 'At the Supermarket/ham': 'protein',
  'breakfast/milk': 'dairy', 'breakfast/yoghurt': 'dairy', 'At the Supermarket/cheese': 'dairy',
};
const TWO_GROUPS = new Set(['vegetables/tomato', 'vegetables/cucumber', 'vegetables/corn', 'vegetables/green_beans', 'At the Supermarket/peas', 'At the Supermarket/corn', 'At the Supermarket/tomato', 'At the Supermarket/cucumber']);
const NOT_MYPLATE = new Set(['At the Supermarket/butter', 'breakfast/butter', 'At the Supermarket/ice_cream', 'At the Supermarket/candy']);
/** a reminder a friend would listen to: an invitation in a friendly voice; a bossy one orders */
const friendlyOwn = (t) => /^(Let’s|Let's|Come |Do you want)/.test(t) && !/\b(Now|Hurry)\b/.test(t);
const bossyOwn = (t) => /\b(Now|Hurry)\b|^(Get out|Stop|Go |Wash your)/.test(t) && !/^(Let’s|Let's|Do you want)/.test(t);
/** the step orders, by the gate's own model: a pair (a, b) = a must come before b */
const FIRE_BEFORE = [['stop', 'drop'], ['drop', 'roll']];
const NOGO_BEFORE = [['no', 'go'], ['go', 'tell']];
function orderCount(ids, pairs) {
  let n = 0; const perm = (arr, k) => { if (k === arr.length) { const pos = Object.fromEntries(arr.map((x, i) => [x, i])); if (pairs.every(([a, b]) => !(a in pos) || !(b in pos) || pos[a] < pos[b])) n++; return; } for (let i = k; i < arr.length; i++) { [arr[k], arr[i]] = [arr[i], arr[k]]; perm(arr, k + 1); [arr[k], arr[i]] = [arr[i], arr[k]]; } };
  perm(ids.slice(), 0); return n;
}
/** pictures that read as something else (Batch K review classes + this batch's openings) */
const REFUSED_ART = {
  'weather/sun': 'a sun with a face', 'space/sun': 'a photo sun on a black square', 'weather/cloud': 'a cloud with a face', 'weather/cloudy': 'a cloud with a face',
  'beach/cloud': 'a cloud with a face', 'spring/cloud': 'a cloud with a face', 'weather/partly_cloudy': 'a cloud with a face', 'weather/stormy': 'a cloud with a face',
  'insects and bugs/worm': 'reads as a snake', 'forest creatures/earthworm': 'reads as a snake', 'spring/worm': 'reads as a snake',
  'farm animals/duck': 'drawn as a duckling', 'farm animals/duckling': 'the same as the duck', 'occupations/paramedic': 'reads as a child',
  'body parts/mouth': 'an open mouth (talking)', 'body parts/elbow': 'reads as a leg or a boot', 'kitchen tools/cup': 'a hot drink', 'camping/rope': 'reads as a broom',
  // review round 1
  'At the Supermarket/bagel': 'reads as a donut (a sometimes food)', 'occupations/pharmacist': 'reads as a boy in a doctor\'s coat',
  'around the house/iron': 'tool safety, not the medicine lesson', 'kitchen tools/knife': 'tool safety, not the medicine lesson',
};
const pkey = (x) => (x.pic ? key(x.pic) : 'drawn/' + x.draw);
const isBw = (theme) => /\bbw\b/i.test(theme);
function artFaults(p, where) {
  const f = [];
  if (isBw(p.theme)) f.push(`${where}: ${key(p)} is a black-and-white picture`);
  if (REFUSED_ART[key(p)]) f.push(`${where}: ${key(p)} is refused (${REFUSED_ART[key(p)]})`);
  const t = MAN.themes[p.theme]; const e = t && t.nouns[p.noun];
  if (!e) { f.push(`${where}: ${key(p)} is not in the cache manifest`); return f; }
  if (!fs.existsSync(path.join(WG, 'cache', 'themes-512', p.theme, e.files[0])) && !fs.existsSync(path.join(WG, 'cache', 'themes', p.theme, e.files[0]))) f.push(`${where}: ${key(p)} has no file on disk`);
  return f;
}
function bankPictures(b) {
  const out = [];
  const walk = (o, where) => { if (!o || typeof o !== 'object') return; if (typeof o.theme === 'string' && typeof o.noun === 'string') { out.push([o, where]); return; } for (const [k, v] of Object.entries(o)) walk(v, where + '.' + k); };
  for (const [k, v] of Object.entries(b)) if (k !== 'REFUSED') walk(v, k);
  return out;
}

/* ================================================================ 1. the bank */
function bankFaults(b) {
  const f = [];
  // the mirror: the bank's turn is the one (and only one) the gate's reflection sends to the star
  for (const r of b.MIRROR_ROOMS) {
    if (!STAR_DIR[r.star]) { if (r.star !== 'back') f.push(`mirror ${r.id}: unknown star place`); continue; }
    const t = turnsToStar(r.star);
    if (t.length !== 1) f.push(`mirror ${r.id}: ${t.length} turns reach the star (one)`);
    if (t[0] !== r.mirror) f.push(`mirror ${r.id}: the bank's ${r.mirror} does not send the light to the star (the gate: ${t[0]})`);
  }
  // the two-mirror room: right -> slash -> up -> slash -> right (the star at the right)
  { const a = reflectOwn([1, 0], 'slash'), c = reflectOwn(a, 'slash'); if (!(a[1] === -1 && c[0] === 1)) f.push('mirror: the two-mirror room does not reach the star'); }
  // animal parts -> inventions: every set of three a page can draw has exactly one perfect matching
  const invOf = Object.fromEntries(b.COPY_PAIRS.map((p) => [p.id, p.inv]));
  if (new Set(b.COPY_PAIRS.map((p) => p.inv)).size !== b.COPY_PAIRS.length) f.push('copy: two animals share an invention');
  if (new Set(b.COPY_PAIRS.map((p) => key(p.invention))).size !== b.COPY_PAIRS.length) f.push('copy: two inventions share a picture');
  for (const s of subsets(b.COPY_PAIRS.map((p) => p.id), 3)) {
    const n = countMatchings(s, s.map((id) => invOf[id]), (id) => COPY_EDGES[id] || [invOf[id]]);
    if (n !== 1) f.push(`copy ${s.join('+')}: ${n} perfect matchings (one)`);
    for (const id of s) if (!(COPY_EDGES[id] || []).includes(invOf[id])) f.push(`copy ${id}: its invention ${invOf[id]} is not one the gate's table lets it copy`);
  }
  // helpers -> names: the level-1 set (no pharmacist) and the full set have exactly one matching
  for (const set of [b.HELPERS.filter((h) => h.id !== 'pharmacist'), b.HELPERS]) {
    const n = countMatchings(set.map(pkey), set.map((h) => h.name), (k) => HELPER_READS[k] || []);
    if (n !== 1) f.push(`helpers ${set.map((h) => h.id).join('+')}: ${n} matchings (one)`);
    for (const h of set) if (!(HELPER_READS[pkey(h)] || []).includes(h.name)) f.push(`helpers: ${pkey(h)} does not read as ${h.name}`);
  }
  // parent and young: every clue's answer is what the gate reads in the two pictures; no ambiguous clue
  for (const p of b.PARENT_YOUNG) {
    const own = PY_FACTS[p.id];
    if (!own) { f.push(`parent-young ${p.id}: not in the gate's table`); continue; }
    for (const [c, a] of Object.entries(p.clues)) {
      if ((PY_AMBIGUOUS[p.id] || []).includes(c)) f.push(`parent-young ${p.id}: the clue "${c}" has two answers for these pictures`);
      else if (a === 'same' && !SAME_CLUE.test(c)) f.push(`parent-young ${p.id}: the same-clue "${c}" does not say what both have`);
      else if (own[c] !== a) f.push(`parent-young ${p.id}: "${c}" is ${a} in the bank, ${own[c] || 'unknown'} by the gate`);
    }
  }
  // the parent that never cares: every family cares, the no-care animal does not
  for (const fam of b.ANIMAL_FAMILIES) if (CARES[fam.id] !== true) f.push(`parents: ${fam.id} is not a parent that cares by the gate's table`);
  if (CARES[b.NO_CARE.id] !== false) f.push(`parents: ${b.NO_CARE.id} is not a parent that never cares by the gate's table`);
  // ask first
  for (const x of b.ASK_FIRST.adult) if (!ADULT_ONLY.has(pkey(x))) f.push(`ask-first: ${pkey(x)} is not only-for-a-grown-up by the gate's table${EITHER_WAY.has(pkey(x)) ? ' (a child may use it: two answers)' : ''}`);
  if (!b.ASK_FIRST.adult.some((x) => x.draw === 'vitamins') || b.ASK_FIRST.adult[1].id !== 'vitamins') f.push('ask-first: no gummy vitamins on every page (medicine can look like candy)');
  if (!/look like candy/.test(b.ASK_FIRST.candyLine || '')) f.push('ask-first: the "medicine can look like candy" line is missing');
  for (const x of b.ASK_FIRST.food) if (!EVERYDAY.has(key(x.pic))) f.push(`ask-first: ${key(x.pic)} is not an everyday food or drink by the gate's table`);
  if (b.ASK_FIRST.adult[0].id !== 'medicine') f.push('ask-first: the medicine is not the page\'s first grown-up thing');
  // MyPlate
  for (const x of b.MYPLATE.foods) {
    const k = key(x.pic);
    if (TWO_GROUPS.has(k)) f.push(`myplate: ${k} belongs to two groups`);
    else if (NOT_MYPLATE.has(k)) f.push(`myplate: ${k} is in no MyPlate group`);
    else if (MYPLATE_OWN[k] !== x.g) f.push(`myplate: ${k} is ${x.g} in the bank, ${MYPLATE_OWN[k] || 'unknown'} by the gate`);
  }
  for (const g of b.MYPLATE.groups) if (b.MYPLATE.foods.filter((x) => x.g === g).length < 3) f.push(`myplate: fewer than three ${g}`);
  // friendly reminders
  for (const s of b.FRIEND_SCENES) { if (!friendlyOwn(s.friendly)) f.push(`friend ${s.id}: the friendly reminder is not friendly by the gate`); if (!bossyOwn(s.bossy)) f.push(`friend ${s.id}: the other reminder is not bossy by the gate`); }
  // step orders
  if (orderCount(b.FIRE_STEPS, FIRE_BEFORE) !== 1) f.push(`fire steps ${b.FIRE_STEPS.join(',')}: ${orderCount(b.FIRE_STEPS, FIRE_BEFORE)} valid orders (one)`);
  if (orderCount(b.NO_GO_TELL, NOGO_BEFORE) !== 1) f.push(`no-go-tell ${b.NO_GO_TELL.join(',')}: ${orderCount(b.NO_GO_TELL, NOGO_BEFORE)} valid orders (one)`);
  if (b.FIRE_STEPS.join() !== 'stop,drop,roll') f.push('fire steps: not stop, drop, roll');
  if (b.NO_GO_TELL.join() !== 'no,go,tell') f.push('no-go-tell: not no, go, tell');
  // shadows: two toys on a page never cast look-alike shadows (every pair of the bank told apart)
  const T = b.SHADOW_TOYS;
  for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) { const u = PM.iou(PM.maskA(T[i].theme, T[i].noun), PM.maskA(T[j].theme, T[j].noun)); if (u >= 0.72) f.push(`shadows: ${T[i].noun} and ${T[j].noun} cast look-alike shadows (${u.toFixed(2)})`); }
  // review round 1: the daylight axis starts at 7 whole hours (no month in the 48 states has an empty bar); every sound test
  // names what moved, and the speaker is felt
  if (b.DAYLIGHT_HOURS[0] > 7) f.push(`daylight: the axis starts at ${b.DAYLIGHT_HOURS[0]} (a December bar can be empty)`);
  for (const t of b.SOUND_TESTS) { if (!t.chips || t.chips.length !== 2 || t.chips.some((c) => /^it /.test(c))) f.push(`sound ${t.id}: the choices do not name what moved`); if (t.id === 'speaker' && !/felt/.test((t.chips || [])[0])) f.push('sound speaker: the speaker row is not a felt choice'); }
  // pictures
  for (const [p, where] of bankPictures(b)) f.push(...artFaults(p, where));
  return f;
}

/* ================================================================ 2. build sweep */
const picsOf = (html) => [...html.matchAll(/data-dk-pic="([^"]+)"/g)].map((m) => { const s = m[1].replace(/&amp;/g, '&'); const i = s.lastIndexOf('/'); return { theme: s.slice(0, i), noun: s.slice(i + 1) }; });
function bandFaults(what, counts, total, expect, tol) {
  const f = [];
  counts.forEach((c, i) => { const s = c / total; if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds the answer ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); });
  return f;
}
const patternedOwn = (bits) => { const s = bits.map((b) => (b ? 1 : 0)).join(''); return /^(1+|0+)$/.test(s) || /^(10)+1?$/.test(s) || /^(01)+0?$/.test(s) || /^1+0+$/.test(s) || /^0+1+$/.test(s); };
/** the positional-tell checks of one type and level over many built copies (pure: a spoiled list runs through it) */
function tellFaults(id, lv, metas) {
  const f = [], N = metas.length, tag = `${id} L${lv}`, mode = metas[0].mode;
  const offsets = (get) => { const off = {}; let tot = 0; for (const m of metas) { const [L, R] = get(m); L.forEach((x, i) => { const j = R.indexOf(x); if (j === i) f.push(`${tag}: an answer straight across from its item`); off[j - i] = (off[j - i] || 0) + 1; tot++; }); } const top = Math.max(...Object.values(off)) / tot; if (top > 0.6) f.push(`${tag}: the answer is ${(100 * top).toFixed(0)}% of the time at the same offset from its item`); };
  if ((mode === 'g1-mirror' && metas[0].items.length) || (mode === 'g1-animal-parents' && metas[0].items.length) || (mode === 'g1-help-friend' && metas[0].items.length)) {
    const k = mode === 'g1-help-friend' ? 2 : 3, cnt = Array(k).fill(0); let tot = 0;
    for (const m of metas) { const pos = m.items.map((x) => +x.split('@')[1]); pos.forEach((p) => { cnt[p]++; tot++; }); if (pos.length >= 3 && new Set(pos).size === 1) f.push(`${tag}: every row's answer in one place`); }
    f.push(...bandFaults(`${tag} answer place`, cnt, tot, cnt.map(() => 1 / k), 0.08));
  } else if (mode === 'g1-shadows') offsets((m) => [m.pairs, m.right]);
  else if (mode === 'g1-copy-animal' && metas[0].right) offsets((m) => [m.pairs, m.right]);
  else if (mode === 'g1-health-helpers') offsets((m) => [m.left, m.right]);
  else if (mode === 'g1-ask-first') {
    const cells = metas[0].cells.length, need = metas[0].cells.filter((c) => c[0] === 'A').length, cnt = Array(cells).fill(0), cols = metas[0].cols;
    for (const m of metas) { const bits = m.cells.map((c) => c[0] === 'A'); bits.forEach((b, i) => { if (b) cnt[i]++; }); if (patternedOwn(bits)) f.push(`${tag}: the grown-up things follow a pattern`); if ([bits.slice(0, cols), bits.slice(cols)].some((r) => r.every(Boolean))) f.push(`${tag}: a row of only grown-up things`); }
    f.push(...bandFaults(`${tag} grown-up things`, cnt, N, cnt.map(() => need / cells), 0.1));
  } else if (mode === 'g1-myplate-sort') {
    let al = 0, tot = 0, exp = 0;
    for (const m of metas) {
      const L = m.left.map((x) => x.split(':')[0]), R = m.right.map((x) => x.split(':')[0]), n = L.length + R.length;
      const left = (g) => g === 'fruits' || g === 'vegetables';
      const a = L.filter(left).length + R.filter((g) => !left(g)).length;
      if (a === n || a === 0) f.push(`${tag}: the food cards line up with the plate's sides`);
      const nl = [...L, ...R].filter(left).length; exp += (nl / n) * (L.length / n) * n + ((n - nl) / n) * (R.length / n) * n;
      al += a; tot += n;
    }
    if (Math.abs(al / tot - exp / tot) > 0.1) f.push(`${tag}: a card sits on its group's side ${(100 * al / tot).toFixed(1)}% of the time (chance ${(100 * exp / tot).toFixed(1)}%)`);
  } else if (mode === 'g1-parent-young') {
    // chance at each place = the mean, over the rows that have that place, of the row's own share of "same" clues (the
    // hen row has four clues, the others three: one pooled share for every place would invent a tell at place 4)
    const pos = {};
    for (const m of metas) for (const p of m.clueOrder) { const cl = p.split(':')[1].split(','); const share = cl.filter((c) => c.endsWith('=same')).length / cl.length; cl.forEach((c, i) => { pos[i] = pos[i] || [0, 0, 0]; pos[i][0] += c.endsWith('=same') ? 1 : 0; pos[i][1]++; pos[i][2] += share; }); }
    for (const [i, [s, n, e]] of Object.entries(pos)) if (Math.abs(s / n - e / n) > 0.1) f.push(`${tag}: clue place ${+i + 1} is "same" ${(100 * s / n).toFixed(0)}% of the time (chance ${(100 * e / n).toFixed(0)}%)`);
    const first = {}; for (const m of metas) for (const p of m.clueOrder) { const c = p.split(':')[1].split(',')[0].split('=')[0]; first[c] = (first[c] || 0) + 1; }
    const top = Math.max(...Object.values(first)) / metas.reduce((a, m) => a + m.clueOrder.length, 0); if (top > 0.6) f.push(`${tag}: the same clue is first ${(100 * top).toFixed(0)}% of the time`);
  } else if (mode === 'g1-fire-safety' || mode === 'g1-say-no') {
    const firsts = {};
    for (const m of metas) { const o = m.order.split(','), r = m.routine.split(','); if (o.join() === r.join()) f.push(`${tag}: the step cards are printed in order`); if (o.join() === r.slice().reverse().join()) f.push(`${tag}: the step cards are printed in reverse`); if (o.some((x, i) => x === r[i])) f.push(`${tag}: a step card in its own place`); firsts[o[0]] = (firsts[o[0]] || 0) + 1; }
    if (Math.max(...Object.values(firsts)) / N > 0.6) f.push(`${tag}: the same card is printed first on most pages`);
  }
  return f;
}
/** the answers each page carries agree with the gate's own tables */
function answerFaults(id, html, meta) {
  const f = [];
  const items = (attr) => { const out = []; const re = new RegExp(`data-dk-item="([^"]+)"[^>]*data-g1-one="1"`, 'g'); let m; const idx = []; while ((m = re.exec(html))) idx.push([m.index, m[1]]); idx.forEach(([at, nm], i) => out.push([nm, html.slice(at, i + 1 < idx.length ? idx[i + 1][0] : html.length)])); return out; };
  if (meta.mode === 'g1-mirror') for (const [nm, seg] of items()) { const room = B.MIRROR_ROOMS.find((r) => r.id === nm); const opts = [...seg.matchAll(/data-g1-option="([a-z]+)" data-dk-answer="([a-z]+)"/g)]; const right = opts.filter((o) => o[2] === 'right'); if (right.length !== 1 || !turnsToStar(room.star).includes(right[0][1])) f.push(`${id}: the mirror room ${nm} stamps ${right.map((o) => o[1]).join('+') || 'nothing'} right`); }
  if (meta.mode === 'g1-animal-parents') for (const m of html.matchAll(/data-g1-parent="([^"]+)" data-dk-answer="([a-z]+)"/g)) { if ((m[2] === 'right') !== (CARES[m[1]] === false)) f.push(`${id}: ${m[1]} stamped ${m[2]} in the never-cares row`); }
  if (meta.mode === 'g1-parent-young') for (const m of html.matchAll(/data-g1-clue="([^"]+)" data-dk-answer="([a-z]+)"/g)) { const pair = meta.pairs.find((p) => (meta.clueOrder.find((c) => c.startsWith(p + ':')) || '').includes(m[1] + '=' + m[2])); if (!pair || PY_FACTS[pair][m[1]] !== m[2]) f.push(`${id}: the clue ${m[1]} stamped ${m[2]}`); }
  if (meta.mode === 'g1-ask-first') { const all = [...B.ASK_FIRST.adult, ...B.ASK_FIRST.food]; for (const m of html.matchAll(/data-g1-cell="([^"]+)" data-dk-answer="([a-z]+)"/g)) { const x = all.find((y) => y.id === m[1]); const k = x ? pkey(x) : m[1]; if ((m[2] === 'adult') !== ADULT_ONLY.has(k)) f.push(`${id}: ${k} stamped ${m[2]}`); } }
  if (meta.mode === 'g1-myplate-sort') for (const m of html.matchAll(/data-g1-food="([^"]+)" data-dk-answer="([a-z]+)"[^>]*>[\s\S]*?data-dk-pic="([^"]+)"/g)) { const k = m[3].replace(/&amp;/g, '&'); if (MYPLATE_OWN[k] !== m[2]) f.push(`${id}: ${k} stamped ${m[2]} (the gate: ${MYPLATE_OWN[k]})`); }
  if (meta.mode === 'g1-help-friend') for (const m of html.matchAll(/data-g1-reminder="1" data-dk-answer="([a-z]+)">([^<]+)</g)) { const t = m[2].replace(/&#39;/g, '\''); if ((m[1] === 'right') !== friendlyOwn(t)) f.push(`${id}: "${t}" stamped ${m[1]}`); }
  if (meta.mode === 'g1-health-helpers') {
    if (meta.right.slice().sort().join() !== meta.left.slice().sort().join()) f.push(`${id}: the names are not the helpers`);
    const n = countMatchings(meta.left.map((h) => pkey(B.HELPERS.find((x) => x.id === h))), meta.right.map((h) => B.HELPERS.find((x) => x.id === h).name), (k) => HELPER_READS[k] || []);
    if (n !== 1) f.push(`${id}: ${n} matchings`);
    if (meta.school && meta.school !== 'nurse') f.push(`${id}: the school sentence's answer is not the nurse`);
  }
  if (meta.mode === 'g1-copy-animal' && meta.right) { const inv = Object.fromEntries(B.COPY_PAIRS.map((p) => [p.id, p.inv])); const n = countMatchings(meta.pairs, meta.pairs.map((p) => inv[p]), (p) => COPY_EDGES[p] || []); if (n !== 1) f.push(`${id}: ${n} matchings for ${meta.pairs.join('+')}`); }
  if (meta.mode === 'g1-shadows') { if (meta.right.slice().sort().join() !== meta.pairs.slice().sort().join()) f.push(`${id}: the shadows are not the toys`); const T = meta.pairs.map((n) => B.SHADOW_TOYS.find((p) => p.noun === n)); for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) if (PM.iou(PM.maskA(T[i].theme, T[i].noun), PM.maskA(T[j].theme, T[j].noun)) >= 0.72) f.push(`${id}: ${T[i].noun} and ${T[j].noun} cast look-alike shadows on one page`); }
  if (meta.mode === 'g1-fire-safety') if (orderCount(meta.routine.split(','), FIRE_BEFORE) !== 1) f.push(`${id}: the fire steps have more than one order`);
  if (meta.mode === 'g1-say-no') if (orderCount(meta.routine.split(','), NOGO_BEFORE) !== 1) f.push(`${id}: the steps have more than one order`);
  return f;
}
/** review round 1 (a US first-grade teacher): the page rules her findings added, on a built page (pure on its html and
 *  the level's printed instruction) */
function pageRuleFaults(id, lv, html, ins) {
  const f = [];
  const has = (re) => re.test(html);
  if (id === 'G1-627') { if (has(/>it (moved|stayed still)</)) f.push(`${id}: a choice says "it" without naming what moved`); if (/data-g1-test="speaker"/.test(html) && !has(/>I felt it shake</)) f.push(`${id}: the speaker row is not a felt choice`); }
  if (id === 'G1-629') { if (has(/>window (open|closed)</) || has(/data-g1-window=/)) f.push(`${id}: the lid opening is called a window (a window lets light in)`); if (!has(/data-g1-flap="closed"/) || !has(/data-g1-ray="stopped"/)) f.push(`${id}: the light does not stop on the closed flap`); }
  if (id === 'G1-630') { if (lv === 3 && (html.match(/<svg[^>]*data-g1-lighticon="[a-z]+"[^>]*>/g) || []).some((t) => !/viewBox="0 0 92 40"/.test(t))) f.push(`${id}: a word-bank icon is not drawn inside its own box (the beam runs under the word)`); if (/data-g1-swatch="cardboard"/.test(html) && !has(/data-g1-corrugated="1"/)) f.push(`${id}: the cardboard has no corrugated edge (it read as a ruler)`); if (lv === 3 && !has(/data-g1-name="1"/)) f.push(`${id}: my material has no line for its name`); }
  if (id === 'G1-633') { const rows = (html.match(/data-g1-msgs="(sent|read)"/g) || []).length, keys = (html.match(/data-g1-code="/g) || []).length; if (rows < 4 || (html.match(/data-g1-msg="/g) || []).length !== rows * keys) f.push(`${id}: the test rows are not circled message chips in both columns`); }
  if (id === 'G1-634') { if (!has(/We face south\./)) f.push(`${id}: the page does not say we face south`); if (/under each Sun/.test(ins)) f.push(`${id}: the instruction puts the shadow under the Sun`); }
  if (id === 'G1-635') {
    // review round 2: the new Moon in the key is a dark filled circle, never a blank circle like the journal's
    const nm = (html.match(/<svg data-g1-litkey="1"[^>]*data-lcs-phase="0"[\s\S]*?<\/svg>/) || [''])[0];
    if (nm && !/fill="#8A8276" data-lcs-part="dark"/.test(nm)) f.push(`${id}: the new Moon in the key is a blank circle (like the journal circles)`);
    const k8 = html.match(/<svg data-g1-litkey="1"[\s\S]*?<\/svg>/g) || [];
    if (k8.length !== 8) f.push(`${id}: the Moon-shape key is not on the page (8 shapes)`);
    for (const k of k8) { if (/data-lcs-phase="0"/.test(k)) continue; if (/data-lcs-part="dark"/.test(k) && !/fill="#FFFFFF" data-lcs-part="dark"/.test(k)) f.push(`${id}: the key shades the dark part (children color the bright part)`); if (/fill="#FFFFFF" data-lcs-part="lit"/.test(k)) f.push(`${id}: the key leaves the bright part white`); }
    if (!has(/data-g1-mark="not-in-sky"/)) f.push(`${id}: no mark for "the Moon was not in the sky"`);
  }
  // review round 2: "the shortest month" reads as February; three southern months can tie ("all of them", not "both")
  if (id === 'G1-637') { if (!has(/data-g1-tie="1"[^>]*>[^<]*If months are the same, circle all of them/)) f.push(`${id}: no rule for months the same (all of them)`); if (/shortest month/.test(ins)) f.push(`${id}: the instruction says "the shortest month" (reads as February)`); if (/\bboth\b/.test(ins) || has(/circle both/)) f.push(`${id}: the tie rule says "both" (three months can tie)`); if (!has(/21st/)) f.push(`${id}: the page does not say the hours are read on the 21st`); if (!has(/>7<\/text>/)) f.push(`${id}: the axis does not start at 7`); if (!/21st/.test(ins) && lv < 3 || !/all of them/.test(ins)) f.push(`${id}: the instruction lacks the 21st or the tie`); }
  if (id === 'G1-641') { const tri = (html.match(/data-g1-trifoliate="1"/g) || []).length, leaf = (html.match(/data-g1-leaflet="1"/g) || []).length, pods = (html.match(/data-g1-pod="1"/g) || []).length; if (!has(/data-g1-beanplant="1"/) || tri < 4 || leaf !== tri * 3 || pods < 2) f.push(`${id}: the grown plant is not a bean plant (leaves in threes, pods)`); if (has(/data-lcs-figure="plant-/)) f.push(`${id}: the plant-figure flower (a daisy) is back`); if (!has(/our grown bean plant/)) f.push(`${id}: the page does not name our grown bean plant`); }
  if (id === 'G1-643' && lv === 3 && !/or both, if they held the same/.test(ins)) f.push(`${id}: the better raft has no rule for a tie`);
  if (id === 'G1-644') { if (!has(/data-g1-askart="vitamins"/)) f.push(`${id}: no gummy vitamins on the page`); if (!has(/data-g1-candyline="1"[^>]*>Medicine can look like candy/)) f.push(`${id}: the "medicine can look like candy" line is not printed`); }
  if (id === 'G1-646' && (!/on a school day/.test(ins) || /yesterday/.test(ins))) f.push(`${id}: the times are not the school-day times`);
  if (id === 'G1-647' && lv === 3 && !has(/>Every day I will</)) f.push(`${id}: the level-3 frame is not "Every day I will ___."`);
  if (id === 'G1-648' && /data-g1-left="pharmacist"/.test(html)) { const at = html.indexOf('data-g1-left="pharmacist"'), seg = html.slice(at, at + 12000); if (!/data-g1-pharmacy="1"/.test(seg) || !/data-g1-counter="1"/.test(seg)) f.push(`${id}: the pharmacist is not a grown-up at a pharmacy counter`);
    // review round 2: it read as a cashier: a white coat, an Rx or red-cross sign over the shelves, real medicine bottles on them
    if (!/data-g1-coat="1"/.test(seg)) f.push(`${id}: the pharmacist wears no white coat`); if (!/data-g1-rxsign="1"/.test(seg) && !/data-g1-crosssign="1"/.test(seg)) f.push(`${id}: no Rx or red-cross sign over the shelves`); if ((seg.match(/data-g1-shelfmed="1"/g) || []).length < 6) f.push(`${id}: the shelves hold no real medicine bottles`); }
  if (id === 'G1-651' && lv > 1 && !/at recess, and at home/.test(ins)) f.push(`${id}: the list lacks its Oxford comma`);
  return f;
}
function levelSig(html) { const c = {}; for (const m of html.matchAll(/data-(?:dk|g1)-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])); }

/* ================================================================ main */
async function main() {
  const bf = bankFaults(B);
  ok(!bf.length, 'bank: ' + bf.slice(0, 10).join(' | '));
  const P = (name, mut, re) => { const b = clone(B); mut(b); judge(name, bankFaults(b), re); };
  P('PB1 the star-up room keyed to the backslash mirror', (b) => { b.MIRROR_ROOMS[0].mirror = 'backslash'; }, /does not send the light to the star/);
  P('PB2 the woodpecker copied by the saw (two animals for one invention)', (b) => { const w = b.COPY_PAIRS.find((p) => p.id === 'woodpecker'); w.inv = 'saw'; w.invention = { theme: 'tools', noun: 'handsaw' }; }, /share an invention|perfect matchings/);
  P('PB3 the capless nurse picture (reads as a doctor too: two matchings)', (b) => { b.HELPERS.find((h) => h.id === 'nurse').pic = { theme: 'occupations', noun: 'nurse' }; }, /2 matchings \(one\)/);
  P('PB4 the horse and foal "color" clue back (the foal is speckled)', (b) => { b.PARENT_YOUNG[0].clues.color = 'same'; }, /two answers for these pictures/);
  P('PB5 the robin as the parent that never cares', (b) => { b.NO_CARE = { ...b.ANIMAL_FAMILIES[0] }; }, /never cares by the gate/);
  P('PB6 a thermometer among the grown-up things', (b) => { b.ASK_FIRST.adult.push({ id: 'thermometer', pic: { theme: 'hospital', noun: 'thermometer' }, word: 'thermometer' }); }, /a child may use it/);
  P('PB7 cheese back in protein', (b) => { b.MYPLATE.foods.find((x) => x.id === 'cheese').g = 'protein'; }, /cheese is protein in the bank, dairy by the gate/);
  P('PB7b a tomato among the vegetables (two groups)', (b) => { b.MYPLATE.foods.push({ id: 'tomato', pic: { theme: 'vegetables', noun: 'tomato' }, g: 'vegetables' }); }, /belongs to two groups/);
  P('PB8 the bossy reminder keyed friendly', (b) => { const s = b.FRIEND_SCENES[0]; [s.friendly, s.bossy] = [s.bossy, s.friendly]; }, /not friendly by the gate/);
  P('PB9 a fourth fire card with no forced place (call 911)', (b) => { b.FIRE_STEPS = [...b.FIRE_STEPS, 'call']; }, /valid orders \(one\)/);
  P('PB10 a picture missing from the library', (b) => { b.LISTEN[0].pic = { theme: 'body parts', noun: 'eyeball' }; }, /not in the cache manifest/);
  P('PB11 a black-and-white picture beside colour', (b) => { b.SOUND_STATIONS[1].pic = { theme: 'animals bw', noun: 'cat' }; }, /black-and-white/);
  P('PB12 a cloud with a face in the bank', (b) => { b.HELP_WAYS.push({ theme: 'weather', noun: 'cloud' }); }, /cloud with a face/);
  P('PB13 two look-alike shadows (the teddy bear twice)', (b) => { b.SHADOW_TOYS.push({ theme: 'toys', noun: 'teddy_bear' }); }, /look-alike shadows/);
  // review round 1 (bank)
  P('PB15 the bare "mane" clue back (the foal\'s mane is short)', (b) => { b.PARENT_YOUNG[0].clues = { size: 'different', 'has four legs': 'same', mane: 'same' }; }, /two answers for these pictures|does not say what both have/);
  P('PB16 the iron back among the grown-up things', (b) => { b.ASK_FIRST.adult.push({ id: 'iron', pic: { theme: 'around the house', noun: 'iron' }, word: 'iron' }); }, /tool safety|not only-for-a-grown-up/);
  P('PB17 the bagel (reads as a donut) back among the grains', (b) => { b.MYPLATE.foods.find((x) => x.id === 'cereal').pic = { theme: 'At the Supermarket', noun: 'bagel' }; }, /reads as a donut/);
  P('PB18 the library pharmacist (a boy in a doctor\'s coat) back', (b) => { const h = b.HELPERS.find((x) => x.id === 'pharmacist'); delete h.draw; h.pic = { theme: 'occupations', noun: 'pharmacist' }; }, /boy in a doctor/);
  P('PB19 the daylight axis from 8 (a December bar can be empty)', (b) => { b.DAYLIGHT_HOURS = b.DAYLIGHT_HOURS.slice(1); }, /axis starts at 8/);
  P('PB20 the gummy vitamins dropped', (b) => { b.ASK_FIRST.adult = b.ASK_FIRST.adult.filter((x) => x.id !== 'vitamins'); }, /no gummy vitamins/);
  P('PB21 the speaker row back to "it moved" / "it stayed still"', (b) => { b.SOUND_TESTS.find((x) => x.id === 'speaker').chips = ['it moved', 'it stayed still']; }, /do not name what moved/);
  P('PB14 the duckling-like duck as a parent', (b) => { b.PARENT_YOUNG.push({ id: 'duck', parent: { theme: 'farm animals', noun: 'duck' }, young: { theme: 'farm animals', noun: 'duckling' }, clues: { size: 'different' } }); }, /drawn as a duckling|not in the gate's table/);

  // ---- 2. build sweep
  const metasOf = {};
  const { resolveStrings: rs0, withLevelInstruction: wl0 } = require(path.join(WG, 'i18n', 'strings.js'));
  const insOf = (t, lv) => wl0(rs0(t.id, 'en', t), t.id, lv, 'en').instruction;
  for (const id of IDS) {
    const t = loadType(id);
    ok(t.exerciseType && /^[a-z-]+$/.test(t.exerciseType) && t.gradeBand === 'G1', `${id}: no family key or not Grade 1`);
    let refused = false; try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const metas = [];
      for (let s = 1; s <= SEEDS; s++) {
        let r;
        try { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`dkg1|${id}|${lv}|${s}`), variant: s }); } catch (e) { ok(false, `${id} L${lv} #${s}: build throws ${e.message}`); break; }
        metas.push(r.meta);
        if (s <= 3 || s % 25 === 0) {
          const pg = pageRuleFaults(id, lv, r.bodyHtml, insOf(t, lv)); ok(!pg.length, pg.join(' | '));
          const af = answerFaults(id, r.bodyHtml, r.meta); ok(!af.length, af.join(' | '));
          for (const p of picsOf(r.bodyHtml)) { const pf = artFaults(p, `${id} L${lv}`); ok(!pf.length, pf.join(' | ')); }
          if (s === 1) sigs[lv] = levelSig(r.bodyHtml);
        }
      }
      metasOf[id + ' ' + lv] = metas;
      const tf = tellFaults(id, lv, metas);
      ok(!tf.length, tf.slice(0, 6).join(' | '));
    }
    ok(sigs[1] !== sigs[2] && sigs[2] !== sigs[3] && sigs[1] !== sigs[3], `${id}: two levels draw the same parts`);
  }
  const spoil = (k, fn) => metasOf[k].map((m) => fn(clone(m)));
  judge('PT1 the right mirror always first', tellFaults('G1-631', 2, spoil('G1-631 2', (m) => ({ ...m, items: m.items.map((x) => x.split('@')[0] + '@0') }))), /place 1 holds|one place/);
  judge('PT2 each shadow straight across from its toy', tellFaults('G1-632', 1, spoil('G1-632 1', (m) => ({ ...m, right: m.pairs.slice() }))), /straight across|same offset/);
  judge('PT3 the sea turtle always last', tellFaults('G1-638', 2, spoil('G1-638 2', (m) => ({ ...m, items: ['turtle@2'] }))), /place 3 holds/);
  judge('PT4 the grown-up things all in the first row', tellFaults('G1-644', 2, spoil('G1-644 2', (m) => ({ ...m, cells: [...m.cells.filter((c) => c[0] === 'A'), ...m.cells.filter((c) => c[0] === 'F')] }))), /pattern|row of only|holds the answer/);
  judge('PT5 the MyPlate cards lined up with the plate sides', tellFaults('G1-645', 2, spoil('G1-645 2', (m) => { const all = [...m.left, ...m.right]; const L = all.filter((x) => /^(fruits|vegetables):/.test(x)); const R = all.filter((x) => !/^(fruits|vegetables):/.test(x)); return { ...m, left: [...L, ...R.slice(0, 5 - L.length)], right: R.slice(5 - L.length) }; })), /line up with the plate|on its group's side/);
  judge('PT6 the fire step cards printed in order', tellFaults('G1-650', 2, spoil('G1-650 2', (m) => ({ ...m, order: m.routine }))), /printed in order/);
  judge('PT7 the friendly reminder always on top', tellFaults('G1-652', 2, spoil('G1-652 2', (m) => ({ ...m, items: m.items.map((x) => x.split('@')[0] + '@0') }))), /place 1 holds|one place/);
  judge('PT8 the "size" clue always first and different', tellFaults('G1-640', 2, spoil('G1-640 2', (m) => ({ ...m, clueOrder: m.clueOrder.map((p) => { const [id, cl] = p.split(':'); const c = cl.split(','); return id + ':' + [...c.filter((x) => x.startsWith('size=')), ...c.filter((x) => !x.startsWith('size='))].join(','); }) }))), /clue place 1|is first/);
  judge('PT9 each helper straight across from its name', tellFaults('G1-648', 2, spoil('G1-648 2', (m) => ({ ...m, right: m.left.slice() }))), /straight across|same offset/);
  { let falseTells = 0, pools = 0; for (const [k, ms] of Object.entries(metasOf)) for (let i = 0; i + 10 <= Math.min(ms.length, 100); i += 10) { if (ms[0].record) continue; pools++; if (tellFaults(k.split(' ')[0], k.split(' ')[1], ms.slice(i, i + 10)).length) falseTells++; }
    console.log(`10-copy pools of the real closed pages: ${falseTells} of ${pools} report a tell (the ${SEEDS}-copy pools report none)`); }
  { const t = loadType('G1-645'); const same = { ...t, difficulty: { 1: t.difficulty[2], 2: t.difficulty[2], 3: t.difficulty[2] } };
    const sg = [1, 2, 3].map((lv) => levelSig(same.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('lv') }).bodyHtml));
    judge('PL1 three levels with one config', sg[0] === sg[1] && sg[1] === sg[2] ? ['two levels draw the same parts'] : [], /same parts/); }
  { const t = loadType('G1-631'); const r = t.build({ difficulty: 2, locale: 'en' }, { rng: makeRng('pa1') });
    const bad = r.bodyHtml.replace(/data-g1-option="([a-z]+)" data-dk-answer="right"/, 'data-g1-option="$1" data-dk-answer="no"').replace(/data-g1-option="([a-z]+)" data-dk-answer="no"/, 'data-g1-option="$1" data-dk-answer="right"');
    ok(!answerFaults('G1-631', r.bodyHtml, r.meta).length, 'PA1 control: the real mirror page');
    judge('PA1 a mirror page stamping a wrong turn right', answerFaults('G1-631', bad, r.meta), /stamps/); }
  { const t = loadType('G1-645'); const r = t.build({ difficulty: 2, locale: 'en' }, { rng: makeRng('pa2') });
    // review round 1 (pages): each page rule fails on a real page spoiled for it, and passes on the real one
    const pgPoison = (name, id, lv, fn, re, insFn) => { const t = loadType(id); const r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('pg|' + id + '|' + lv) }); const ins = insOf(t, lv);
      ok(!pageRuleFaults(id, lv, r.bodyHtml, ins).length, `${name} control: ${pageRuleFaults(id, lv, r.bodyHtml, ins).join(' | ')}`);
      judge(name, pageRuleFaults(id, lv, fn(r.bodyHtml), insFn ? insFn(ins) : ins), re); };
    pgPoison('PG1 a sound choice back to "it moved"', 'G1-627', 2, (h) => h.replace('>the rice moved<', '>it moved<'), /without naming what moved/);
    pgPoison('PG2 the peep box flap called a window again', 'G1-629', 1, (h) => h.replace('>flap closed<', '>window closed<'), /called a window/);
    pgPoison('PG3 my material without its name line', 'G1-630', 3, (h) => h.replace('data-g1-name="1"', ''), /line for its name/);
    pgPoison('PG4 the light-code tests back to empty boxes', 'G1-633', 2, (h) => h.replace(/data-g1-msg="/g, 'data-x="'), /circled message chips/);
    pgPoison('PG5 "We face south." dropped', 'G1-634', 2, (h) => h.replace('We face south.', ''), /face south/);
    pgPoison('PG6 the Moon key shading the dark part again', 'G1-635', 2, (h) => h.replace(/fill="#FFFFFF" data-lcs-part="dark"/g, 'fill="#8A8276" data-lcs-part="dark"'), /shades the dark part/);
    pgPoison('PG7 the "not in the sky" mark dropped', 'G1-635', 3, (h) => h.replace(/data-g1-mark="not-in-sky"/g, ''), /not in the sky/);
    pgPoison('PG8 the daylight tie rule dropped', 'G1-637', 2, (h) => h.replace('If months are the same, circle all of them.', ''), /months the same/);
    pgPoison('PG17 "Circle the shortest month" back (reads as February)', 'G1-637', 3, (h) => h, /shortest month/, (i) => i.replace('Circle the month with the shortest day.', 'Circle the shortest month.'));
    pgPoison('PG18 the tie rule back to "both" (three months can tie)', 'G1-637', 1, (h) => h.replace('If months are the same, circle all of them.', 'If two months are the same, circle both.'), /all of them|says "both"/);
    pgPoison('PG19 the new Moon key a blank circle again', 'G1-635', 2, (h) => h.replace(/fill="#8A8276" data-lcs-part="dark"/, 'fill="#FFFFFF" data-lcs-part="dark"'), /new Moon in the key is a blank circle/);
    pgPoison('PG20 the pharmacist without the white coat', 'G1-648', 2, (h) => h.replace('data-g1-coat="1"', ''), /no white coat/);
    pgPoison('PG21 no Rx or red-cross sign', 'G1-648', 2, (h) => h.replace('data-g1-rxsign="1"', '').replace('data-g1-crosssign="1"', ''), /Rx or red-cross sign/);
    pgPoison('PG22 the shelves without real medicine bottles', 'G1-648', 2, (h) => h.replace(/data-g1-shelfmed="1"/g, ''), /no real medicine bottles/);
    pgPoison('PG23 the lunch times back to "yesterday"', 'G1-646', 2, (h) => h, /school-day times/, (i) => i.replace('on a school day', 'yesterday').replace('eat or drink', 'ate or drank'));
    pgPoison('PG24 a word-bank beam running under its word', 'G1-630', 3, (h) => h.replace(/viewBox="0 0 92 40"([^>]*data-g1-lighticon="all")/, 'viewBox="0 0 74 32"$1'), /beam runs under the word/);
    pgPoison('PG9 the daisy (plant-figure) back as the grown plant', 'G1-641', 2, (h) => h.replace('data-g1-beanplant="1"', 'data-lcs-figure="plant-full"'), /not a bean plant|daisy/);
    pgPoison('PG10 the gummy vitamins off the page', 'G1-644', 1, (h) => h.replace('data-g1-askart="vitamins"', 'data-g1-askart="x"'), /no gummy vitamins/);
    pgPoison('PG11 the candy line not printed', 'G1-644', 2, (h) => h.replace('>Medicine can look like candy', '>'), /look like candy/);
    pgPoison('PG12 the pharmacist without the pharmacy counter', 'G1-648', 2, (h) => h.replace('data-g1-pharmacy="1"', ''), /pharmacy counter/);
    pgPoison('PG13 "under each Sun" back in the instruction', 'G1-634', 1, (h) => h, /under the Sun/, () => 'Draw the stick’s shadow under each Sun. Circle when the shadow was shortest.');
    pgPoison('PG14 the list without its Oxford comma', 'G1-651', 2, (h) => h, /Oxford comma/, (i) => i.replace('at recess, and', 'at recess and'));
    pgPoison('PG15 the habit frame back to "I will ___ more every day."', 'G1-647', 3, (h) => h.replace('>Every day I will<', '>I will<'), /Every day I will/);
    pgPoison('PG16 the better raft without a tie rule', 'G1-643', 3, (h) => h, /no rule for a tie/, (i) => i.replace(' (or both, if they held the same)', ''));
    judge('PA2 a MyPlate food stamped in the wrong group', answerFaults('G1-645', r.bodyHtml.replace(/data-dk-answer="dairy"/, 'data-dk-answer="protein"'), r.meta), /stamped protein/); }

  // ---- 3. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
  const OUT = path.join(require('os').tmpdir(), 'verify-dk-g1');
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
    const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); return { ...r, bodyHtml: fn(r.bodyHtml) }; } }; };
    const pr = async (name, id, lv, fn, re) => { const r = await render(spoilType(id, fn), lv, 1, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re); };
    await pr('PR1 the page squeezed to 500 px', 'G1-643', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="max-height:500px"'), /the stack is/);
    await pr('PR2 a box laid over another', 'G1-644', 2, (h) => h.replace('<div style="flex:1 1 auto;min-height:0;display:grid', '<div data-dk-box style="position:absolute;left:40px;top:40px;width:220px;height:140px;background:#FFFFFF"></div><div style="flex:1 1 auto;min-height:0;display:grid'), /two boxes collide/);
    await pr('PR3 a drawing wider than its card', 'G1-650', 2, (h) => h.replace(/(<svg[^>]*?) width="([0-9.]+)"([^>]*data-g1-stepart=)/, '$1 width="420"$3'), /runs out of its box|runs out of its card/);
    await pr('PR4 a blank band at the top', 'G1-649', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="padding-top:90px"'), /starts \d+ px below/);
    await pr('PR5 a picture that does not load', 'G1-649', 2, (h) => h.replace(/src="file:[^"]+ear@3x\.webp"/, 'src="file:///nope.webp"'), /did not load|broken image/);
    await pr('PR6 a mirror row with two right mirrors', 'G1-631', 2, (h) => h.replace('data-dk-answer="no"', 'data-dk-answer="right"'), /2 right answers/);
    await pr('PR7 a sentence frame without its writing line', 'G1-626', 3, (h) => h.replace(/(<div class="dk-row" data-g1-frame="1"[\s\S]*?)<div data-dk-box data-dk-blank="1" style="line-height:0;flex-shrink:0">[\s\S]*?<\/svg><\/div>/, '$1'), /frame without its writing line/);
    await pr('PR8 a step card without its number box', 'G1-651', 2, (h) => h.replace(/<div class="ws-blankbox" data-dk-box data-g1-stepbox="1"[^>]*><\/div>/, ''), /step cards for 2 number boxes/);
    await pr('PR10 the pharmacist\'s head sunk to the counter (it read as a cashier)', 'G1-648', 2, (h) => h.replace('data-g1-phead="1"', 'data-g1-phead="1" transform="translate(0 46)"'), /head is not well above the counter/);
    await pr('PR9 a drawn child moved out of its card', 'G1-651', 2, (h) => h.replace(/(data-k2-fig="grown-up")/, '$1 style="transform:translate(140px,0)"'), /drawn child runs out of its card/);
  } finally { await browser.close(); }

  console.log(`stacks (level 1-3, copy 1, measured on what is drawn): ${stacks.join(' · ')}`);
  console.log(`poisons ${killed}/${poisons} killed`); for (const l of plog) console.log(l);
  if (killed !== poisons) fails.push(`${poisons - killed} poison(s) not killed`);
  console.log(fails.length ? `FAIL (${fails.length} of ${assertions} assertions)\n  ` + fails.slice(0, 40).join('\n  ') : `PASS (${assertions} assertions, ${SEEDS} seeds a level)`);
  process.exit(fails.length ? 1 : 0);
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, tellFaults, answerFaults, reflectOwn, countMatchings };
