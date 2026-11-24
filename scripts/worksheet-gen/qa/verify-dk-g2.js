#!/usr/bin/env node
/**
 * verify-dk-g2.js — the gate of the Batch 2 Grade 2 science and health pages (G2-584 .. G2-613; factories
 * types/_shared/dk-g2.js + dk-g2-health.js, bank data/science/dk-g2.js; Daily Teaching System Stage D-5, 2026-11-24).
 *
 *   node scripts/worksheet-gen/qa/verify-dk-g2.js [--quick] [--seeds=400]
 *
 *   1. BANK: every closed item has ONE right answer by the gate's OWN tables (never the bank's word): the water cards
 *      (solid / liquid, salty / fresh), fast or slow Earth changes, what a real solution slows, which changes can go
 *      back, how a seed travels, where a living thing lives, the plant-to-place match (exactly one perfect matching over
 *      every defensible pairing), the three parts of being well, the influence clues, the ad tricks, who helps with a
 *      health problem, the safe choice, the weather lines a page must have, and every word-bank blank. Every picture is
 *      in the manifest and on disk, colour, and not refused (a lake landscape, an iceberg, a duckling-duck, a cloud with
 *      a face, a bagel, the library pharmacist ...).
 *   2. BUILD, `--seeds` (default 400) copies of every type at every level: the stamps agree with the gate's tables; NO
 *      POSITIONAL TELL (each answer's place pooled within a band of chance; no strip in a pattern; never straight
 *      across); the Batch 2 page rules (the review classes of Batches K and 1); the three levels differ; another locale
 *      refuses.
 *   3. RENDER (the print pipeline), every type x level, 2 copies (1 with --quick): verify() (the Batch K and Batch 1 page
 *      checks plus the Batch 2 checks) and qa/lints.js clean. Then the LAYOUT SWEEP (review round 3: the Level Set refused
 *      G2-607 L3 copy 14, a 92 px empty band no gate seed had reached): the generator's own seeds 1..SEEDS (instanceSeed,
 *      seedEpoch 1, variant v = a Level Set copy's seedVariant), every DISTINCT page swapped into the rendered page and
 *      judged by the type's own verify, the generator's page QA (the empty band, the stack, collisions, pictures).
 *   4. POISONS: each check FAILS on a bank, a page or a set of pages spoiled for it; each page poison has a control that
 *      passes on the real page.
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const WG = path.join(__dirname, '..');
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const crypto = require('crypto');
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const B = require(path.join(WG, 'data', 'science', 'dk-g2.js'));
const MAN = require(path.join(WG, 'cache', 'manifest.json'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const SEEDS = Number(arg('seeds', '400'));
const IDS = Array.from({ length: 30 }, (_, k) => 'G2-' + (584 + k));
const clone = (x) => JSON.parse(JSON.stringify(x));
const key = (p) => p.theme + '/' + p.noun;
const pkey = (x) => (x.pic ? key(x.pic) : 'drawn/' + x.draw);

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
const WATER_OWN = {   // what a US second grader and teacher agree on (one answer each)
  'beach/wave': ['liquid', 'salty'], 'camping/river': ['liquid', 'fresh'], 'weather/puddle': ['liquid', 'fresh'], 'weather/raindrop': ['liquid', 'fresh'],
  'camping/mountain': ['solid', 'fresh'], 'winter/icicle': ['solid', 'fresh'], 'winter/ice': ['solid', 'fresh'], 'weather/snowflake': ['solid', 'fresh'],
};
const WATER_TWO = { iceberg: 'frozen FRESH water floating in the SALTY sea', 'camping/lake': 'a mountain landscape (Batch K: not water)', 'sea-ice': 'frozen sea water is less salty' };
const SPEED_OWN = { earthquake: 'fast', volcano: 'fast', landslide: 'fast', flood: 'fast', canyon: 'slow', mountain: 'slow', 'ice-crack': 'slow', dunes: 'slow' };
const SLOWS_OWN = { seawall: 'water', windbreak: 'wind', 'sand-fence': 'wind', 'riverbank-rocks': 'water' };
const BACK_OWN = { ice: 'can', chocolate: 'can', butter: 'can', egg: 'cannot', bread: 'cannot', batter: 'cannot', clay: 'cannot' };
const MOVES_OWN = { burr: 'sticks', cleavers: 'sticks', maple: 'wind', dandelion: 'wind', cherry: 'eaten', acorn: 'eaten' };
const HOME_OWN = { camel: 'desert', meerkat: 'desert', cactus: 'desert', toucan: 'rain forest', 'tree-frog': 'rain forest', monkey: 'rain forest', octopus: 'ocean', whale: 'ocean', starfish: 'ocean' };
/** where each plant could be said to grow (every defensible pairing): the match must have exactly one perfect matching */
const PLANT_EDGES = { cactus: ['desert'], fern: ['shady forest'], 'water-lily': ['pond'] };
const PART_OWN = { cactus: 'a thick stem that holds water', fern: 'big leaves to catch a little light', 'water-lily': 'leaves that float' };
const WELL_OWN = { sleep: 'body', apple: 'body', running: 'body', breath: 'feelings', worry: 'feelings', drawing: 'feelings', sharing: 'friendships', inviting: 'friendships', turns: 'friendships' };
const CLUE_OWN = { carrots: 'family', 'cereal-toy': 'ads', 'late-show': 'tv' };
const TRICK_OWN = { cereal: ['a cartoon character', 'a free prize'], drink: ['“everybody loves it”'], snack: ['rainbow colors'] };
const CARE_OWN = { fever: 'see', tooth: 'see', ear: 'see', fall: 'see', scrape: 'home', tired: 'home', dental: 'see', yearly: 'see' };
const CHECKUP_OWN = new Set(['dental', 'yearly']);
const SAFE_OWN = { 'bike-helmet-on': true, 'bike-helmet-off': false, 'pool-watched': true, 'pool-alone': false, 'boat-jacket': true, 'boat-no-jacket': false, 'scooter-sidewalk': true, 'scooter-street': false };
/** the lines each weather MUST have; ALSO = lines a teacher also accepts (never required) */
const WEATHER_MUST = { beach: ['sunscreen', 'sun-hat', 'water'], hot: ['sunscreen', 'sun-hat', 'water', 'shade'], cloudy: ['sunscreen'], snow: ['coat', 'mittens'] };
const BLANK_OWN = { tray: 'minutes', canyon: 'millions of years', cannot: 'heat', most: 'the ocean' };
const REFUSED_ART = {
  'camping/lake': 'a mountain landscape, not water', 'weather/cloud': 'a cloud with a face', 'weather/cloudy': 'a cloud with a face', 'spring/rain': 'a cloud with a face',
  'weather/sun': 'a sun with a face', 'farm animals/duck': 'drawn as a duckling', 'At the Supermarket/bagel': 'reads as a donut', 'occupations/pharmacist': 'a boy in a doctor\'s coat',
  'kitchen tools/jar': 'reads as a plastic peanut-butter jar', 'kitchen tools/cup': 'a hot drink', 'At the Supermarket/butter': 'reads as cheese', 'breakfast/butter': 'reads as cheese',
  'kitchen tools/spoon': 'a purple spoon reads as plastic', 'flowers/dandelion': 'reads as a daisy', 'toys/scooter': 'a motor scooter', 'insects and bugs/worm': 'reads as a snake',
  // review round 1 (a US second-grade teacher)
  'zoo animals/sloth': 'reads as a red panda or a fox', 'occupations/coach': 'a child in a cap: reads as a friend', 'emotions/tired': 'red cheeks: reads as sick',
  'emotions/bored': 'red cheeks: reads as sick', 'fruits/cherry': 'one round cherry: reads as an apple', 'At the Supermarket/cherry': 'one cherry: reads as an apple',
  'flowers/clover': 'a four-leaf clover (a good-luck charm)', 'breakfast/cereal': 'a bowl: says breakfast, not a package', 'zoo animals/tiger': 'a tiger on a cereal box recalls a real mascot',
};
/** the plants of the schoolyard survey (checked, never tallied: nobody counts the blades of a lawn) */
const PLANT_OWN = new Set(['grass', 'clover', 'dandelion', 'moss']);
/** ad names close to real US products (2026-11-24 search): never on a page */
const NEAR_REAL = /Crunch Stars|Fizz Pop|Fizzy Pop|Fruity Bites|Fruit Bites|Cr[oö]+nchy Stars/i;
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
function countMatchings(lefts, rights, edgesOf) { let n = 0; const used = new Set(); const rec = (i) => { if (i === lefts.length) { n++; return; } for (const r of rights) if (!used.has(r) && edgesOf(lefts[i]).includes(r)) { used.add(r); rec(i + 1); used.delete(r); } }; rec(0); return n; }

/* ================================================================ 1. the bank */
function bankFaults(b) {
  const f = [];
  for (const c of b.WATER_CARDS) {
    const own = WATER_OWN[pkey(c)];
    if (WATER_TWO[c.id] || WATER_TWO[pkey(c)]) f.push(`water ${c.id}: two answers (${WATER_TWO[c.id] || WATER_TWO[pkey(c)]})`);
    else if (!own) f.push(`water ${c.id}: ${pkey(c)} is not in the gate's water table`);
    else if (own[0] !== c.state || own[1] !== c.salt) f.push(`water ${c.id}: the bank says ${c.state} + ${c.salt}, the gate ${own.join(' + ')}`);
  }
  if (b.WATER_CARDS.filter((c) => c.state === 'liquid').length < 3 || b.WATER_CARDS.filter((c) => c.state === 'solid').length < 3) f.push('water: fewer than 3 cards of a kind');
  for (const e of b.EARTH_EVENTS) if (SPEED_OWN[e.id] !== e.speed) f.push(`fast-slow ${e.id}: the bank says ${e.speed}, the gate ${SPEED_OWN[e.id]}`);
  for (const s of b.SOLUTIONS) if (SLOWS_OWN[s.id] !== s.slows) f.push(`solution ${s.id}: the bank says ${s.slows}, the gate ${SLOWS_OWN[s.id]}`);
  for (const p of b.CHANGE_PAIRS) if (BACK_OWN[p.id] !== p.back) f.push(`change ${p.id}: the bank says ${p.back}, the gate ${BACK_OWN[p.id]}`);
  for (const s of b.SEEDS) if (MOVES_OWN[s.id] !== s.moves) f.push(`seed ${s.id}: the bank says ${s.moves}, the gate ${MOVES_OWN[s.id]}`);
  for (const c of b.HABITAT_BANK) if (HOME_OWN[c.id] !== c.home) f.push(`habitat ${c.id}: the bank says ${c.home}, the gate ${HOME_OWN[c.id]}`);
  { const ids = b.PLANT_HOMES.map((p) => p.id); const n = countMatchings(ids, b.PLANT_HOMES.map((p) => p.home), (id) => PLANT_EDGES[id] || []); if (n !== 1) f.push(`plant homes: ${n} perfect matchings (one)`); for (const p of b.PLANT_HOMES) if (!(PLANT_EDGES[p.id] || []).includes(p.home)) f.push(`plant ${p.id}: ${p.home} is not where it grows by the gate`); for (const p of b.PLANT_HOMES) if (PART_OWN[p.id] !== p.part) f.push(`plant ${p.id}: the helping part "${p.part}" is not the gate's`); }
  for (const c of b.WELL_CARDS) if (WELL_OWN[c.id] !== c.part) f.push(`wellness ${c.id}: the bank says ${c.part}, the gate ${WELL_OWN[c.id]}`);
  for (const c of b.CHOICES.filter((x) => x.level1)) if (CLUE_OWN[c.id] !== c.clue) f.push(`influence ${c.id}: the bank's clue ${c.clue} is not the gate's ${CLUE_OWN[c.id]}`);
  for (const a of b.ADS) { const own = TRICK_OWN[a.id] || []; if (own.slice().sort().join() !== a.tricks.slice().sort().join()) f.push(`ad ${a.id}: the tricks ${a.tricks.join(',')} are not the gate's ${own.join(',')}`); if (/(Cheerios|Coca|Pepsi|Sprite|Frosted|Lucky|Skittles|Gushers|Kellogg|Nabisco)/i.test(a.name)) f.push(`ad ${a.id}: a real brand name`); }
  for (const c of b.CARE_CARDS) { if (CARE_OWN[c.id] !== c.go) f.push(`care ${c.id}: the bank says ${c.go}, the gate ${CARE_OWN[c.id]}`); if (!!c.checkup !== CHECKUP_OWN.has(c.id)) f.push(`care ${c.id}: the checkup mark disagrees with the gate`); }
  for (const p of b.SAFETY_PAIRS) { if (SAFE_OWN[p.safe.draw] !== true) f.push(`safety ${p.id}: the safe card ${p.safe.draw} is not safe by the gate`); if (SAFE_OWN[p.risky.draw] !== false) f.push(`safety ${p.id}: the other card ${p.risky.draw} is safe too (two answers)`); }
  if (b.TRAY_FRAME.tray !== BLANK_OWN.tray || b.TRAY_FRAME.canyon !== BLANK_OWN.canyon) f.push('erosion frame: the blanks are not the gate\'s');
  if (b.CANNOT_FRAME.answer !== BLANK_OWN.cannot) f.push('cannot frame: the blank is not the gate\'s');
  if (b.MOST_WATER.answer !== BLANK_OWN.most) f.push('most-water frame: the blank is not the gate\'s');
  for (const fr of [b.TRAY_FRAME, b.CANNOT_FRAME, b.MOST_WATER]) if (new Set(fr.bank).size !== fr.bank.length) f.push('a word bank holds a word twice');
  for (const a of b.ADS) if (NEAR_REAL.test(a.name)) f.push(`ad ${a.id}: "${a.name}" is close to a real product name`);
  if (b.SEEDS.some((x) => x.id === 'acorn' && x.moves === 'eaten') && !/buried/.test(b.SEED_BINS.eaten)) f.push('seeds: the acorn is sorted with the eaten seeds, but the bin does not say buried (squirrels bury acorns)');
  if (!b.GARDEN_FLOWER || Array.isArray(b.GARDEN_FLOWER) || b.GARDEN_FLOWERS) f.push('garden: not ONE kind of flower (pollen must reach a flower of the same kind)');
  for (const k of b.SURVEY_KINDS) if (PLANT_OWN.has(k.id) !== !!k.plant) f.push(`survey ${k.id}: ${PLANT_OWN.has(k.id) ? 'a plant set to be tallied' : 'an animal set to be checked'}`);
  for (const [p, where] of bankPictures(b)) f.push(...artFaults(p, where));
  return f;
}

/* ================================================================ 2. build sweep */
const picsOf = (html) => [...html.matchAll(/data-dk-pic="([^"]+)"/g)].map((m) => { const s = m[1].replace(/&amp;/g, '&'); const i = s.lastIndexOf('/'); return { theme: s.slice(0, i), noun: s.slice(i + 1) }; });
function bandFaults(what, counts, total, expect, tol) { const f = []; counts.forEach((c, i) => { const s = c / total; if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds the answer ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); }); return f; }
const patternedOwn = (bits) => { const s = bits.map((b) => (b ? 1 : 0)).join(''); return /^(1+|0+)$/.test(s) || /^(10)+1?$/.test(s) || /^(01)+0?$/.test(s) || /^1+0+$/.test(s) || /^0+1+$/.test(s); };
/** a sorted strip (cards "category:id"): where each category sits, pooled, against the category's share */
function stripTell(tag, metas, keyName, cats) {
  const f = [], n = metas[0][keyName].length, cnt = {}, tot = {};
  for (const c of cats) { cnt[c] = Array(n).fill(0); tot[c] = 0; }
  for (const m of metas) { const k = m[keyName].map((x) => x.split(':')[0]); if (cats.length === 2 && patternedOwn(k.map((x) => x === cats[0]))) f.push(`${tag}: the cards follow a pattern`); k.forEach((x, i) => { if (cnt[x]) { cnt[x][i]++; tot[x]++; } }); }
  for (const c of cats) if (tot[c]) { const share = tot[c] / (metas.length * n); f.push(...bandFaults(`${tag} ${c}`, cnt[c], metas.length, cnt[c].map(() => share), 0.12)); }
  return f;
}
function tellFaults(id, lv, metas) {
  const f = [], tag = `${id} L${lv}`, mode = metas[0].mode;
  const offsets = (get) => { const off = {}; let tot = 0; for (const m of metas) { const [L, R] = get(m); L.forEach((x, i) => { const j = R.indexOf(x); if (j === i) f.push(`${tag}: an answer straight across from its item`); off[j - i] = (off[j - i] || 0) + 1; tot++; }); } if (Math.max(...Object.values(off)) / tot > 0.6) f.push(`${tag}: one offset holds the answer over 60% of the time`); };
  const at = (k) => { const cnt = Array(k).fill(0); let tot = 0; for (const m of metas) { const pos = m.items.map((x) => +x.split('@')[1]); pos.forEach((p) => { cnt[p]++; tot++; }); if (pos.length >= 3 && new Set(pos).size === 1) f.push(`${tag}: every row's answer in one place`); } f.push(...bandFaults(`${tag} answer place`, cnt, tot, cnt.map(() => 1 / k), 0.08)); };
  if (mode === 'g2-water-sort') f.push(...stripTell(tag, metas.map((m) => ({ cards: m.cards.map((c) => c.split(':')[0].split(' + ')[0] + ':' + c.split(':')[1]) })), 'cards', ['liquid', 'solid']));
  else if (mode === 'g2-fast-slow') f.push(...stripTell(tag, metas, 'cards', ['fast', 'slow']));
  else if (mode === 'g2-can-go-back') f.push(...stripTell(tag, metas, 'pairs', ['can', 'cannot']));
  else if (mode === 'g2-care') f.push(...stripTell(tag, metas, 'cards', ['see', 'home']));
  else if (mode === 'g2-wellness') f.push(...stripTell(tag, metas, 'cards', ['body', 'feelings', 'friendships']));
  else if (mode === 'g2-seeds' && metas[0].cards) f.push(...stripTell(tag, metas, 'cards', ['sticks', 'eaten', 'wind']));
  else if (mode === 'g2-habitats3' && metas[0].cards) f.push(...stripTell(tag, metas, 'cards', ['desert', 'rain forest', 'ocean']));
  else if (mode === 'g2-solutions' || mode === 'g2-safety') at(2);
  else if (mode === 'g2-plant-homes') { offsets((m) => [m.pairs, m.right]); if (metas[0].items.length) at(3); }
  else if (mode === 'g2-map' && metas[0].tags) { const cnt = {}; for (const m of metas) { m.tags.forEach((t) => { const [n, ft] = t.split(':'); cnt[ft] = cnt[ft] || [0, 0, 0, 0]; cnt[ft][n - 1]++; }); if (m.bank.join() === m.tags.map((t) => t.split(':')[1]).join()) f.push(`${tag}: the word bank lists the features in the tags' order`); } for (const [ft, c] of Object.entries(cnt)) f.push(...bandFaults(`${tag} tag of ${ft}`, c, metas.length, [0.25, 0.25, 0.25, 0.25], 0.08)); }
  else if (mode === 'g2-influence' && metas[0].choices[0].includes(':')) f.push(...stripTell(tag, metas, 'choices', ['family', 'ads', 'tv']));
  return f;
}
/** the stamps a page carries agree with the gate's own tables */
function answerFaults(id, html, meta) {
  const f = [];
  const stamps = (attr) => [...html.matchAll(new RegExp(`${attr}="([^"]+)"[^>]*?data-dk-answer="([^"]+)"`, 'g'))].map((m) => [m[1], m[2].replace(/&amp;/g, '&')]);
  if (meta.mode === 'g2-water-sort') for (const [cid, a] of stamps('data-g2-card')) { const c = B.WATER_CARDS.find((x) => x.id === cid); const own = c && WATER_OWN[pkey(c)]; const want = meta.grid ? own && own.join(' + ') : own && own[0]; if (a !== want) f.push(`${id}: ${cid} stamped "${a}" (the gate: "${want}")`); }
  if (meta.mode === 'g2-fast-slow') for (const [cid, a] of stamps('data-g2-card')) if (SPEED_OWN[cid] !== a) f.push(`${id}: ${cid} stamped ${a}`);
  if (meta.mode === 'g2-seeds') for (const [cid, a] of stamps('data-g2-card')) if (MOVES_OWN[cid] !== a) f.push(`${id}: ${cid} stamped ${a}`);
  if (meta.mode === 'g2-habitats3') for (const [cid, a] of stamps('data-g2-card')) if (HOME_OWN[cid] !== a) f.push(`${id}: ${cid} stamped ${a}`);
  if (meta.mode === 'g2-wellness') for (const [cid, a] of stamps('data-g2-card')) if (WELL_OWN[cid] !== a) f.push(`${id}: ${cid} stamped ${a}`);
  if (meta.mode === 'g2-influence') for (const [cid, a] of stamps('data-g2-card')) if (CLUE_OWN[cid] !== a) f.push(`${id}: ${cid} stamped ${a}`);
  if (meta.mode === 'g2-care') for (const [cid, a] of stamps('data-g2-care')) if (CARE_OWN[cid] !== a) f.push(`${id}: ${cid} stamped ${a}`);
  if (meta.mode === 'g2-safety') for (const [cid, a] of stamps('data-g2-pcard')) if ((a === 'safe') !== SAFE_OWN[cid]) f.push(`${id}: ${cid} stamped ${a}`);
  if (meta.mode === 'g2-solutions') { const segs = html.split('data-g2-row="').slice(1); for (const s of segs) { const sid = s.slice(0, s.indexOf('"')); const r = [...s.matchAll(/data-g2-choice="(wind|water)" data-dk-answer="right"/g)].map((m) => m[1]); if (r.length !== 1 || r[0] !== SLOWS_OWN[sid]) f.push(`${id}: ${sid} stamps ${r.join('+') || 'nothing'} right (the gate: ${SLOWS_OWN[sid]})`); } }
  if (meta.mode === 'g2-can-go-back') { const segs = html.split('data-g2-pair="').slice(1); for (const s of segs) { const pid = s.slice(0, s.indexOf('"')); const r = [...s.matchAll(/data-g2-choice="(can|cannot)" data-dk-answer="right"/g)].map((m) => m[1]); if (r.length !== 1 || r[0] !== BACK_OWN[pid]) f.push(`${id}: ${pid} stamps ${r.join('+') || 'nothing'} (the gate: ${BACK_OWN[pid]})`); } }
  if (meta.mode === 'g2-plant-homes') { if (countMatchings(meta.pairs, meta.right.map((p) => B.PLANT_HOMES.find((x) => x.id === p).home), (p) => PLANT_EDGES[p] || []) !== 1) f.push(`${id}: the match has not one answer`); for (const [part, a] of stamps('data-g2-part')) { const owner = Object.keys(PART_OWN).find((k) => PART_OWN[k] === part); void owner; } const segs = html.split('data-dk-item="').slice(1).filter((s) => /data-g1-one/.test(s.slice(0, 200))); for (const s of segs) { const pid = s.slice(0, s.indexOf('"')); const r = [...s.slice(0, 2000).matchAll(/data-g2-part="([^"]+)" data-dk-answer="right"/g)].map((m) => m[1]); if (r.length !== 1 || r[0] !== PART_OWN[pid]) f.push(`${id}: ${pid} part stamped ${r.join('+')}`); } }
  if (meta.mode === 'g2-ads') { const segs = html.split('data-g2-tricks="').slice(1); for (const s of segs) { const aid = s.slice(0, s.indexOf('"')); const seg = s.slice(0, s.indexOf('</div>')); const r = [...seg.matchAll(/data-g2-trick-chip="([^"]+)" data-dk-answer="trick"/g)].map((m) => m[1].replace(/&amp;/g, '&')); if (r.slice().sort().join() !== (TRICK_OWN[aid] || []).slice().sort().join()) f.push(`${id}: ${aid} stamps the tricks ${r.join(',')}`); } for (const m of html.matchAll(/data-g2-healthy="([^"]+)">([\s\S]*?)<\/div>/g)) { if (!/>no<\/span>/.test(m[2]) || !/data-dk-answer="right">no</.test(m[2])) f.push(`${id}: ${m[1]} does not stamp "no" for the healthy question`); } }
  if (meta.mode === 'g2-map' && meta.tags) for (const m of html.matchAll(/data-g2-tag="(\d)" data-dk-answer="([a-z]+)"/g)) { const t = meta.tags.find((x) => x.startsWith(m[1] + ':')); if (!t || t.split(':')[1] !== m[2]) f.push(`${id}: tag ${m[1]} stamped ${m[2]}`); }
  if (meta.mode === 'g2-weather-ready') for (const m of html.matchAll(/data-g2-weather="([a-z]+)" data-g2-must="([^"]*)"/g)) { const must = m[2] ? m[2].split(',') : []; const own = (WEATHER_MUST[m[1]] || []).filter((x) => html.includes(`data-g2-protect="${x}"`)); if (must.slice().sort().join() !== own.slice().sort().join()) f.push(`${id}: ${m[1]} must reach ${must.join(',')} (the gate: ${own.join(',')})`); if (!must.length) f.push(`${id}: ${m[1]} has no line to draw`); }
  for (const m of html.matchAll(/data-g2-blank="([a-z]+)" data-dk-answer="([^"]+)"/g)) if (BLANK_OWN[m[1]] !== m[2]) f.push(`${id}: the blank ${m[1]} stamped ${m[2]}`);
  for (const m of html.matchAll(/data-g2-frame="most" data-dk-answer="([^"]+)"/g)) if (BLANK_OWN.most !== m[1]) f.push(`${id}: the most-water blank stamped ${m[1]}`);
  return f;
}
/** the Batch 2 page rules: the classes the Batch K and Batch 1 reviews found, on a built page and its instruction */
function pageRuleFaults(id, lv, html, ins) {
  const f = [], has = (re) => re.test(html);
  if (id === 'G2-588' && has(/data-g2-landform="river"/)) f.push(`${id}: a river card (from the side it looks like the lake)`);
  if (id === 'G2-589') { if (has(/camping\/lake/)) f.push(`${id}: the lake landscape (reads as mountains, not water)`); if (has(/iceberg/)) f.push(`${id}: an iceberg (fresh ice in the salty sea: two answers)`); if (lv > 1 && !has(/Some boxes may stay empty/)) f.push(`${id}: the grid does not say a box may stay empty`); }
  if (id === 'G2-585' && !has(/If it never leaked, write 20\+/)) f.push(`${id}: no rule for a roof that never leaked`);
  // ---- review round 1
  if (id === 'G2-584' && lv === 2) { const cols = html.split('data-g2-sortcol="').slice(1); if (cols.length !== 4) f.push(`${id}: not four sort columns`); for (const c of cols) { const n = (c.slice(0, c.indexOf('</div></div>') + 1 || 4000).match(/data-dk-writerow/g) || []).length; if (n < 3) f.push(`${id}: the sort column ${c.slice(0, c.indexOf('"'))} has ${n} writing line(s) (the names need three)`); } }
  if (id === 'G2-586' && has(/same 10 pieces/)) f.push(`${id}: the page says the answer (the same pieces) before it asks`);
  if (id === 'G2-594' && lv === 1 && !/for our sandy hill/.test(ins)) f.push(`${id}: the pick does not say what it is for`);
  if (id === 'G2-595') { if (!has(/ice cubes of the same size/)) f.push(`${id}: the cubes are not said to be the same size`); if (lv > 1) for (const p of ['tray', 'mitten']) { const seg = (html.split(`data-dk-item="${p}"`)[1] || '').slice(0, 3000); if (!/data-g2-where="in the shade"/.test(seg)) f.push(`${id}: the ${p} row does not say where it sits (not a fair test)`); } }
  if (id === 'G2-597') { if (has(/data-g2-drawn="melted-chocolate"/) && !has(/data-g2-fill="chocolate"/)) f.push(`${id}: the melted chocolate is not brown`); if (has(/data-g2-drawn="melted-butter"/) && !has(/data-g2-fill="butter"/)) f.push(`${id}: the melted butter is not yellow`); }
  if (id === 'G2-598' && lv === 3) { if (has(/does the opposite/) || /does the opposite/.test(ins)) f.push(`${id}: "a change that does the opposite" has two readings`); if (!has(/How could you change it back\?/) || !has(/It cannot change back\./)) f.push(`${id}: no one-reading question with its cannot-answer`); }
  if (id === 'G2-599') { const cells = html.split('data-g2-cell="').slice(1); for (const c of cells) if (!/data-g2-leaf="brown or dry"/.test(c.slice(0, 2500))) { f.push(`${id}: a plant cell offers no leaf color for a dry plant`); break; } if (lv === 1 && has(/data-g2-note="1"/)) f.push(`${id}: the dark-cup note on a page with no dark cup`); if (has(/data-g2-graph="1"/) && !has(/>15<\/text>/)) f.push(`${id}: the height graph stops below 15 inches`); }
  if (id === 'G2-600') { const burr = (html.match(/data-g2-drawn="burr"[\s\S]*?<\/svg>/) || [''])[0]; if (burr && ((burr.match(/data-g2-hook/g) || []).length < 16 || !/data-g2-fill="burr"/.test(burr))) f.push(`${id}: the burr is not a brown ball of hooks (a pale disc with rays reads as a sun)`); if (has(/data-g2-bin="eaten"/) && !has(/eaten or buried by animals/)) f.push(`${id}: the acorn bin does not say buried`); }
  if (id === 'G2-601') { const kinds = new Set([...html.matchAll(/data-g2-flower="([^"]+)"/g)].map((m) => m[1])); if (kinds.size !== 1) f.push(`${id}: ${kinds.size} kinds of flower in the garden (pollen must reach a flower of the same kind)`); if (has(/its chalk color/) || /its chalk color/.test(ins)) f.push(`${id}: an instruction says to color every circle with its own chalk color`); if (!has(/If a flower got chalk from another flower, color its circle with that chalk color\./)) f.push(`${id}: the page does not say which circles to color`); if (!has(/Write the word pollen/)) f.push(`${id}: the label is not said plainly`); }
  if (id === 'G2-602') { if (/data-g2-tally="(grass|clover|dandelion|moss|other-plant)\|/.test(html)) f.push(`${id}: a plant to tally (nobody counts the blades of a lawn)`); if (has(/data-g2-tally=/) && !has(/data-g2-check="grass\|/)) f.push(`${id}: no plant to check`); for (const m of html.split('data-g2-more="1"').slice(1)) if (!/data-g2-tie="1"/.test(m.slice(0, 1500))) f.push(`${id}: "which had more" has no answer for a tie`); if (has(/data-g2-graph="1"/) && !has(/data-g2-tiebox="1"/)) f.push(`${id}: the sentence has no answer for a tie`); }
  if (id === 'G2-603' && lv === 1) for (const c of html.split('data-g2-card="').slice(1)) if (!/data-g2-cardname="1"/.test(c.slice(0, 1200))) { f.push(`${id}: a cut-out card without its name`); break; }
  if (id === 'G2-604') { const fern = (html.match(/data-g2-drawn="fern"[\s\S]*?<\/svg>/) || [''])[0]; if (fern && (fern.match(/data-g2-frond=/g) || []).length < 4) f.push(`${id}: the fern is not a clump of fronds (one frond reads as a palm leaf or a feather)`); }
  if (id === 'G2-605') { if (has(/running and playing/)) f.push(`${id}: "running and playing" is also a friendship`); const inv = (html.match(/data-g2-scene="inviting"[\s\S]*?<\/svg>/) || [''])[0]; if (/data-k2-palm/.test(inv)) f.push(`${id}: the inviting card shows the STOP hand`); }
  if (id === 'G2-606') { const coach = (html.match(/data-g2-influence="coach"[\s\S]*?<\/svg>/) || [''])[0]; if (!/data-k2-fig="grown-up"/.test(coach) || !/data-g2-whistle/.test(coach)) f.push(`${id}: the coach is not a grown-up with a whistle`); const cer = (html.match(/data-g2-card="cereal-toy"[\s\S]*?<\/svg>/) || [''])[0]; if (cer && !/data-g2-toy/.test(cer)) f.push(`${id}: the cereal card does not show its toy`); if (/data-dk-answer/.test((html.match(/data-g2-card="[^"]+"[^>]*>/g) || []).join(''))) f.push(`${id}: a choice card keyed to one helper (a choice can have more than one)`); if (!has(/helped YOU most/)) f.push(`${id}: the page does not ask for the helper that helped YOU most`); }
  if (id === 'G2-607') { if (/fizzy/i.test(html)) f.push(`${id}: "fizzy drink" (US: a soda)`); if (NEAR_REAL.test(html)) f.push(`${id}: an ad name close to a real product`); }
  if (id === 'G2-609') { if (!has(/If you feel sick at school, tell your teacher\./) || (has(/data-g2-care="fever"/) && !has(/a fever at school/))) f.push(`${id}: the page is not framed at school`); const pics = (seg) => new Set([...seg.matchAll(/data-dk-pic="([^"]+)"|data-g2-scene="([^"]+)"/g)].map((m) => m[1] || m[2])); const dest = pics((html.split('data-g2-dest="see"')[1] || '').split('data-g2-dest=')[0].slice(0, 5000)); for (const c of html.split('data-g2-care="').slice(1)) for (const p of pics(c.split(/data-g2-care=|data-g2-dest=/)[0].slice(0, 3000))) if (dest.has(p)) f.push(`${id}: a card repeats the picture of its helper (${p})`); }
  if (id === 'G2-611' && has(/data-g2-pcard="boat-jacket"/) && !has(/data-g2-lifejacket="1"/)) f.push(`${id}: no life jacket drawn`);
  // ---- review round 2
  for (const m of html.matchAll(/data-g2-graph="1" data-g2-max="(\d+)" data-g2-step="(\d+)"([\s\S]*?)<\/svg>/g)) { const max = +m[1], step = +m[2]; const ks = new Set([...m[3].matchAll(/data-g2-gridline="(\d+)"/g)].map((x) => +x[1]));
    for (let k = 0; k <= max; k++) if (!ks.has(k)) { f.push(`${id}: a bar graph with no line at ${k} (a line at every unit, 2.MD.D.10)`); break; }
    if (![1, 2, 5, 10].includes(step) || max % step) f.push(`${id}: a bar graph labelled by ${step}s (Grade 2 counts by 2s, 5s or 10s)`); }
  if (/data-g2-graph="1"(?! data-g2-max)/.test(html)) f.push(`${id}: a bar graph without its scale`);
  if (id === 'G2-601') { if (!has(/A flower makes seeds only with pollen from a flower of the same kind\./)) f.push(`${id}: the pollen fact is missing`); if (has(/Bees carry pollen to flowers of the same kind/)) f.push(`${id}: "Bees carry pollen to flowers of the same kind" is not true (bees visit many kinds)`); }
  if (id === 'G2-606') { const cer = (html.match(/data-g2-card="cereal-toy"[\s\S]*?<\/svg>/) || [''])[0]; if (cer && (!/data-g2-bowl/.test(cer) || !/data-g2-boxside/.test(cer))) f.push(`${id}: the cereal card is not a box with a bowl on it (a pale box of rings reads as a jar)`); }
  if (id === 'G2-609' && has(/data-g2-care="scrape"/) && !has(/a small scrape at home/)) f.push(`${id}: the scrape is not said to be at home (at school it goes to the nurse)`);
  if (id === 'G2-594' && lv === 3 && !/why you picked it/.test(ins)) f.push(`${id}: the star is not asked as an opinion with a reason`);
  if (id === 'G2-607') { const drink = (html.match(/data-g2-ad="drink"[\s\S]*?<\/svg>/) || [''])[0]; if (/data-k2-fig/.test(drink)) f.push(`${id}: people on the drink ad (they could be called cartoon characters: two answers)`); for (const m of html.matchAll(/font-size="(\d+(?:\.\d+)?)"[^>]*>(FREE|TOY)</g)) if (+m[1] < 10) f.push(`${id}: the FREE TOY words are too small`); if (/Cheerios|Coca|Pepsi|Sprite|Skittles|Frosted/i.test(html)) f.push(`${id}: a real brand`); }
  if (id === 'G2-608' && has(/data-lcs-pose="drink-water"/)) f.push(`${id}: the drink-water figure (it reads as holding a phone)`);
  if (id === 'G2-609') { const den = (html.match(/data-g2-scene="dentist"[\s\S]*?<\/svg>/) || [''])[0]; if ((den || lv > 1) && !/data-g2-coat="1"/.test(den)) f.push(`${id}: the dentist is not a grown-up in a coat`); if (lv > 1 && (html.match(/data-g2-checkup="1"/g) || []).length !== 2) f.push(`${id}: not two checkups to circle`); }
  if (id === 'G2-611' && lv === 3 && !has(/A helmet sits/)) f.push(`${id}: no helmet rule`);
  if (id === 'G2-612') { if (!has(/Draw all the lines you can/)) f.push(`${id}: the page does not say a thing can protect in more than one weather`); if (has(/weather\/cloud"|weather\/cloudy"/)) f.push(`${id}: a cloud with a face`); }
  return f;
}
function levelSig(html) { const c = {}; for (const m of html.matchAll(/data-(?:dk|g1|g2)-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])); }
const insOf = (t, lv) => withLevelInstruction(resolveStrings(t.id, 'en', t), t.id, lv, 'en').instruction;

/* ================================================================ main */
async function main() {
  const bf = bankFaults(B);
  ok(!bf.length, 'bank: ' + bf.slice(0, 10).join(' | '));
  const P = (name, mut, re) => { const b = clone(B); mut(b); judge(name, bankFaults(b), re); };
  P('PB1 an iceberg card (frozen fresh water in the salty sea)', (b) => { b.WATER_CARDS.push({ id: 'iceberg', label: 'iceberg', draw: 'iceberg', state: 'solid', salt: 'salty' }); }, /two answers/);
  P('PB2 the lake landscape back', (b) => { b.WATER_CARDS.push({ id: 'lake', label: 'lake', pic: { theme: 'camping', noun: 'lake' }, state: 'liquid', salt: 'fresh' }); }, /two answers|mountain landscape/);
  P('PB3 the river keyed salty', (b) => { b.WATER_CARDS.find((c) => c.id === 'river').salt = 'salty'; }, /river: the bank says/);
  P('PB4 a canyon keyed fast', (b) => { b.EARTH_EVENTS.find((e) => e.id === 'canyon').speed = 'fast'; }, /canyon: the bank says fast/);
  P('PB5 the seawall keyed wind', (b) => { b.SOLUTIONS.find((s) => s.id === 'seawall').slows = 'wind'; }, /seawall: the bank says wind/);
  P('PB6 toast keyed "can change back"', (b) => { b.CHANGE_PAIRS.find((p) => p.id === 'bread').back = 'can'; }, /bread: the bank says can/);
  P('PB7 the burr keyed "blown by the wind"', (b) => { b.SEEDS.find((s) => s.id === 'burr').moves = 'wind'; }, /burr: the bank says wind/);
  P('PB8 the camel keyed rain forest', (b) => { b.HABITAT_BANK.find((c) => c.id === 'camel').home = 'rain forest'; }, /camel: the bank says/);
  P('PB9 two plants for the pond (two matchings)', (b) => { b.PLANT_HOMES.find((p) => p.id === 'fern').home = 'pond'; }, /perfect matchings|not where it grows/);
  P('PB10 sharing keyed "my body"', (b) => { b.WELL_CARDS.find((c) => c.id === 'sharing').part = 'body'; }, /sharing: the bank says body/);
  P('PB11 the cereal ad without its prize trick', (b) => { b.ADS[0].tricks = ['a cartoon character']; }, /tricks .* are not the gate's/);
  P('PB12 a real brand name on an ad', (b) => { b.ADS[1].name = 'Sprite'; }, /real brand/);
  P('PB13 a small scrape keyed "see the doctor"', (b) => { b.CARE_CARDS.find((c) => c.id === 'scrape').go = 'see'; }, /scrape: the bank says see/);
  P('PB14 the street keyed safe', (b) => { const p = b.SAFETY_PAIRS.find((x) => x.id === 'scooter'); [p.safe, p.risky] = [p.risky, p.safe]; }, /not safe by the gate|two answers/);
  P('PB15 the cannot-frame blank "cold"', (b) => { b.CANNOT_FRAME.answer = 'cold'; }, /cannot frame/);
  P('PB16 a picture missing from the library', (b) => { b.SURVEY_KINDS[0].pic = { theme: 'insects and bugs', noun: 'beetle2' }; }, /not in the cache manifest/);
  P('PB17 a black-and-white picture', (b) => { b.HABITAT_BANK[0].pic = { theme: 'animals bw', noun: 'cat' }; }, /black-and-white/);
  P('PB18 the bagel back among the foods', (b) => { b.CLAIM_CHANGES[3].pic = { theme: 'At the Supermarket', noun: 'bagel' }; }, /reads as a donut/);
  P('PB19 an ad name close to a real product (Fizz Pop)', (b) => { b.ADS[1].name = 'Fizz Pop'; }, /close to a real product/);
  P('PB20 the acorn bin without "buried"', (b) => { b.SEED_BINS.eaten = 'eaten by animals'; }, /does not say buried/);
  P('PB21 a garden of four kinds of flowers', (b) => { b.GARDEN_FLOWERS = [b.GARDEN_FLOWER, { theme: 'flowers', noun: 'tulip' }]; }, /not ONE kind of flower/);
  P('PB22 grass set to be tallied', (b) => { b.SURVEY_KINDS.find((k) => k.id === 'grass').plant = false; }, /grass: a plant set to be tallied/);
  P('PB23 the sloth back (it reads as a red panda)', (b) => { b.HABITAT_BANK.find((c) => c.id === 'tree-frog').pic = { theme: 'zoo animals', noun: 'sloth' }; }, /red panda/);
  P('PB24 the child coach back', (b) => { const c = b.INFLUENCES.find((x) => x.id === 'coach'); delete c.draw; c.pic = { theme: 'occupations', noun: 'coach' }; }, /reads as a friend/);
  P('PB25 the red-cheeked tired face back', (b) => { const c = b.CARE_CARDS.find((x) => x.id === 'tired'); delete c.draw; c.pic = { theme: 'emotions', noun: 'tired' }; }, /reads as sick/);
  P('PB26 a four-leaf clover on the survey', (b) => { const c = b.SURVEY_KINDS.find((x) => x.id === 'clover'); delete c.draw; c.pic = { theme: 'flowers', noun: 'clover' }; }, /four-leaf/);

  // ---- 2. build sweep
  const metasOf = {};
  for (const id of IDS) {
    const t = loadType(id);
    ok(t.exerciseType && /^[a-z-]+$/.test(t.exerciseType) && t.gradeBand === 'G2', `${id}: no family key or not Grade 2`);
    let refused = false; try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const metas = [];
      for (let s = 1; s <= SEEDS; s++) {
        let r;
        try { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`dkg2|${id}|${lv}|${s}`), variant: s }); } catch (e) { ok(false, `${id} L${lv} #${s}: build throws ${e.message}`); break; }
        metas.push(r.meta);
        if (s <= 3 || s % 25 === 0) {
          const af = answerFaults(id, r.bodyHtml, r.meta); ok(!af.length, af.join(' | '));
          const pg = pageRuleFaults(id, lv, r.bodyHtml, insOf(t, lv)); ok(!pg.length, pg.join(' | '));
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
  judge('PT1 the liquid cards always first', tellFaults('G2-589', 2, spoil('G2-589 2', (m) => ({ ...m, cards: [...m.cards.filter((c) => c.startsWith('liquid')), ...m.cards.filter((c) => !c.startsWith('liquid'))] }))), /pattern|holds the answer/);
  judge('PT2 the fast cards always first', tellFaults('G2-591', 2, spoil('G2-591 2', (m) => ({ ...m, cards: [...m.cards.filter((c) => c.startsWith('fast')), ...m.cards.filter((c) => c.startsWith('slow'))] }))), /pattern|holds the answer/);
  judge('PT3 "wind" always the right chip on top', tellFaults('G2-594', 2, spoil('G2-594 2', (m) => ({ ...m, items: m.items.map((x) => x.split('@')[0] + '@0') }))), /place 1 holds|one place/);
  judge('PT4 the safe card always first', tellFaults('G2-611', 2, spoil('G2-611 2', (m) => ({ ...m, items: m.items.map((x) => x.split('@')[0] + '@0') }))), /place 1 holds|one place/);
  judge('PT5 each plant straight across from its place', tellFaults('G2-604', 1, spoil('G2-604 1', (m) => ({ ...m, right: m.pairs.slice() }))), /straight across|offset/);
  judge('PT6 the map tags in the word bank\'s order', tellFaults('G2-587', 2, spoil('G2-587 2', (m) => ({ ...m, bank: m.tags.map((t) => t.split(':')[1]) }))), /word bank lists the features in the tags/);
  judge('PT7 the body cards always first', tellFaults('G2-605', 2, spoil('G2-605 2', (m) => ({ ...m, cards: [...m.cards.filter((c) => c.startsWith('body')), ...m.cards.filter((c) => !c.startsWith('body'))] }))), /holds the answer/);
  judge('PT8 the "can" pairs always on top', tellFaults('G2-597', 2, spoil('G2-597 2', (m) => ({ ...m, pairs: [...m.pairs.filter((c) => c.startsWith('can:')), ...m.pairs.filter((c) => !c.startsWith('can:'))] }))), /pattern|holds the answer/);
  { let falseTells = 0, pools = 0; for (const [k, ms] of Object.entries(metasOf)) { if (ms[0].record) continue; for (let i = 0; i + 10 <= Math.min(ms.length, 100); i += 10) { pools++; if (tellFaults(k.split(' ')[0], k.split(' ')[1], ms.slice(i, i + 10)).length) falseTells++; } }
    console.log(`10-copy pools of the real closed pages: ${falseTells} of ${pools} report a tell (the ${SEEDS}-copy pools report none)`); }
  { const t = loadType('G2-589'); const same = { ...t, difficulty: { 1: t.difficulty[2], 2: t.difficulty[2], 3: t.difficulty[2] } };
    const sg = [1, 2, 3].map((lv) => levelSig(same.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('lv') }).bodyHtml));
    judge('PL1 three levels with one config', sg[0] === sg[1] && sg[1] === sg[2] ? ['two levels draw the same parts'] : [], /same parts/); }
  // answer and page-rule poisons on real pages (each with its control)
  const pagePoison = (name, id, lv, fn, re, insFn, which = 'rule', mustShow = null) => {
    const t = loadType(id); let r; for (let k = 0; k < 200; k++) { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('pg|' + id + '|' + lv + (k ? '|' + k : '')) }); if (!mustShow || r.bodyHtml.includes(mustShow)) break; } const ins = insOf(t, lv);
    const run = (h, i) => (which === 'rule' ? pageRuleFaults(id, lv, h, i) : answerFaults(id, h, r.meta));
    ok(!run(r.bodyHtml, ins).length, `${name} control: ${run(r.bodyHtml, ins).join(' | ')}`);
    judge(name, run(fn(r.bodyHtml), insFn ? insFn(ins) : ins), re);
  };
  pagePoison('PA1 a water card stamped in the wrong box', 'G2-589', 2, (h) => h.replace(/data-g2-card="river" data-dk-answer="liquid \+ fresh"/, 'data-g2-card="river" data-dk-answer="liquid + salty"'), /river stamped/, null, 'answer');
  pagePoison('PA2 the seawall stamped "wind"', 'G2-594', 2, (h) => { const i = h.indexOf('data-g2-row="seawall"'), j = h.indexOf('data-g2-row=', i + 10); const seg = h.slice(i, j < 0 ? h.length : j).replace('data-g2-choice="wind" data-dk-answer="no"', 'data-g2-choice="wind" data-dk-answer="right"').replace('data-g2-choice="water" data-dk-answer="right"', 'data-g2-choice="water" data-dk-answer="no"'); return h.slice(0, i) + seg + (j < 0 ? '' : h.slice(j)); }, /seawall stamps wind/, null, 'answer');
  pagePoison('PA3 an ad stamping "yes" for the healthy question', 'G2-607', 2, (h) => h.replace(/data-dk-answer="no">yes<\/span><span class="g1-chip" data-dk-box data-dk-answer="right">no</, 'data-dk-answer="right">yes</span><span class="g1-chip" data-dk-box data-dk-answer="no">no<'), /does not stamp "no"/, null, 'answer');
  pagePoison('PA4 a weather with a line it does not need', 'G2-612', 2, (h) => h.replace(/data-g2-weather="snow" data-g2-must="[^"]*"/, 'data-g2-weather="snow" data-g2-must="coat,mittens,sunscreen"'), /snow must reach/, null, 'answer');
  pagePoison('PA5 a map tag stamped with the wrong feature', 'G2-587', 2, (h) => h.replace(/data-g2-tag="1" data-dk-answer="([a-z]+)"/, (m, ft) => `data-g2-tag="1" data-dk-answer="${ft === 'lake' ? 'hill' : 'lake'}"`), /tag 1 stamped/, null, 'answer');
  pagePoison('PG1 a river card back on the landform page', 'G2-588', 1, (h) => h.replace('data-g2-landform="hill"', 'data-g2-landform="river"'), /river card/);
  pagePoison('PG2 the grid without "some boxes may stay empty"', 'G2-589', 2, (h) => h.replace('Some boxes may stay empty.', ''), /may stay empty/);
  pagePoison('PG3 the umbrella page without its never-leaked rule', 'G2-585', 2, (h) => h.replace(' If it never leaked, write 20+.', ''), /never leaked/);
  pagePoison('PG4 people back on the drink ad', 'G2-607', 2, (h) => h.replace(/(data-g2-ad="drink"[^>]*>)/, '$1<g data-k2-fig="child"></g>'), /people on the drink ad/);
  pagePoison('PG5 the drink-water figure on the goal page', 'G2-608', 1, (h) => h.replace('data-lcs-pictogram="habit"', 'data-lcs-pictogram="habit" data-lcs-pose="drink-water"'), /drink-water figure/);
  pagePoison('PG6 the dentist without a coat', 'G2-609', 2, (h) => h.replace(/(data-g2-scene="dentist"[\s\S]*?)data-g2-coat="1"/, '$1'), /dentist is not a grown-up/);
  pagePoison('PG7 one checkup to circle', 'G2-609', 2, (h) => h.replace('data-g2-checkup="1"', ''), /not two checkups/);
  pagePoison('PG8 the star not asked as an opinion with a reason', 'G2-594', 3, (h) => h, /opinion with a reason/, (i) => i.replace('Then tell why you picked it.', ''));
  pagePoison('PG9 an iceberg card on the water page', 'G2-589', 2, (h) => h.replace('data-g2-card="icicle"', 'data-g2-card="iceberg"'), /an iceberg/);
  pagePoison('PG10 the weather page without "all the lines"', 'G2-612', 2, (h) => h.replace('Draw all the lines you can.', ''), /more than one weather/);
  // review round 1
  pagePoison('PG11 one writing line under a sort heading', 'G2-584', 2, (h) => h.replace(/(data-g2-sortcol="hard"[\s\S]*?)<div data-dk-box data-dk-blank="1"[\s\S]*?<\/svg><\/div><div data-dk-box data-dk-blank="1"[\s\S]*?<\/svg><\/div>/, '$1'), /writing line/);
  pagePoison('PG12 "the same 10 pieces" before the question', 'G2-586', 2, (h) => h.replace('We have 10 pieces.', 'We use the same 10 pieces for both objects.'), /says the answer/);
  pagePoison('PG13 the level 1 pick not said to be for the sandy hill', 'G2-594', 1, (h) => h, /what it is for/, (i) => i.replace(' for our sandy hill', ''));
  pagePoison('PG14 the mitten not said to sit in the shade', 'G2-595', 2, (h) => h.replace(/(data-dk-item="mitten"[\s\S]*?)data-g2-where="in the shade"/, '$1'), /mitten row does not say/);
  pagePoison('PG15 the melted chocolate black again', 'G2-597', 2, (h) => h.replace(/data-g2-fill="chocolate"/g, ''), /chocolate is not brown/, null, 'rule', 'melted-chocolate');
  pagePoison('PG16 "a change that does the opposite" back', 'G2-598', 3, (h) => h.replace('How could you change it back?', 'A change that does the opposite:'), /two readings/);
  pagePoison('PG17 green or pale only', 'G2-599', 2, (h) => h.replace(/<span class="g1-chip" data-dk-box data-g2-leaf="brown or dry"[^<]*<\/span>/g, ''), /dry plant/);
  pagePoison('PG18 the height graph stopping at 10 inches', 'G2-599', 3, (h) => h.replace(/>15<\/text>/, '>10</text>'), /below 15 inches/);
  pagePoison('PG19 the burr as a pale disc with rays', 'G2-600', 2, (h) => h.replace(/data-g2-fill="burr"/, ''), /not a brown ball of hooks/);
  pagePoison('PG20 two kinds of flower in the garden', 'G2-601', 2, (h) => h.replace('data-g2-flower="sunflower"', 'data-g2-flower="tulip"'), /kinds of flower/);
  pagePoison('PG21 the old strip: each circle with its chalk color', 'G2-601', 2, (h) => h.replace('If a flower got chalk from another flower, color its circle with that chalk color.', 'Color the small circle under each flower with its chalk color.'), /its own chalk color|which circles/);
  pagePoison('PG22 grass to tally', 'G2-602', 2, (h) => h.replace(/data-g2-check="grass\|lawn"/, 'data-g2-tally="grass|lawn"'), /a plant to tally/);
  pagePoison('PG23 "which had more" without the tie', 'G2-602', 1, (h) => h.replace(/ data-g2-tie="1"/, ''), /no answer for a tie/);
  pagePoison('PG24 a level 1 habitat card without its name', 'G2-603', 1, (h) => h.replace('data-g2-cardname="1"', ''), /without its name/);
  pagePoison('PG25 one fern frond', 'G2-604', 1, (h) => h.replace(/data-g2-frond="[1-4]"/g, ''), /not a clump of fronds/);
  pagePoison('PG26 "running and playing" back', 'G2-605', 2, (h) => h.replace('running fast', 'running and playing'), /also a friendship/);
  pagePoison('PG27 the coach a child again', 'G2-606', 2, (h) => h.replace(/(data-g2-influence="coach"[\s\S]*?)data-k2-fig="grown-up"/, '$1data-k2-fig="child"'), /not a grown-up/);
  pagePoison('PG28 a level 1 choice keyed to one helper', 'G2-606', 1, (h) => h.replace('data-g2-card="carrots"', 'data-g2-card="carrots" data-dk-answer="family"'), /keyed to one helper/);
  pagePoison('PG29 "a fizzy drink" back', 'G2-607', 2, (h) => h.replace('a soda', 'a fizzy drink'), /fizzy/);
  pagePoison('PG30 the yearly checkup with the doctor of the see box', 'G2-609', 2, (h) => h.replace(/(data-g2-care="yearly"[\s\S]*?)data-dk-pic="hospital\/stethoscope"/, '$1data-dk-pic="hospital/doctor"'), /repeats the picture/);
  pagePoison('PG31 the page not framed at school', 'G2-609', 2, (h) => h.replace('a fever at school', 'a fever'), /not framed at school/);
  // review round 2
  pagePoison('PG32 a graph with lines only at its numbers', 'G2-585', 2, (h) => h.replace(/<line [^>]*stroke-width="0\.8" data-g2-gridline="\d+"\/>/g, ''), /no line at 1 /);
  pagePoison('PG33 a graph labelled by 3s', 'G2-599', 3, (h) => h.replace('data-g2-max="15" data-g2-step="5"', 'data-g2-max="15" data-g2-step="3"'), /labelled by 3s/);
  pagePoison('PG34 "Bees carry pollen to flowers of the same kind" back', 'G2-601', 2, (h) => h.replace('A flower makes seeds only with pollen from a flower of the same kind.', 'Bees carry pollen to flowers of the same kind.'), /not true|fact is missing/);
  pagePoison('PG35 the tie written over the "more" frame', 'G2-602', 3, (h) => h.replace('data-g2-tiebox="1"', ''), /no answer for a tie/);
  pagePoison('PG36 the cereal card a pale box of rings', 'G2-606', 2, (h) => h.replace('data-g2-bowl="1"', ''), /not a box with a bowl/);
  pagePoison('PG37 the scrape not at home', 'G2-609', 2, (h) => h.replace('a small scrape at home', 'a small scrape'), /not said to be at home/);

  // ---- 3. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  const OUT = path.join(require('os').tmpdir(), 'verify-dk-g2');
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
  /** the page now shows type t at level lv (just rendered): swap in every distinct copy of seeds 1..n, run t.verify */
  let swept = 0;
  const layoutSweep = async (t, lv, n) => {
    const seen = new Set(), faults = [];
    for (let v = 1; v <= n; v++) {
      const b = t.build({ theme: null, difficulty: lv, locale: 'en', unit: null }, { rng: makeRng(instanceSeed({ typeId: t.id, theme: null, difficulty: lv, seedEpoch: 1, variant: v })), variant: v, seedVariant: v });
      const h = crypto.createHash('sha1').update(b.bodyHtml).digest('hex'); if (seen.has(h)) continue; seen.add(h);
      await page.evaluate((html) => { document.querySelector('main.ws-body').innerHTML = html; }, b.bodyHtml);
      await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; })))));
      for (const x of await t.verify(page)) faults.push(`copy ${v}: ${x}`);
    }
    return { n: seen.size, faults };
  };
  try {
    for (const id of IDS) {
      const t = loadType(id);
      for (const lv of [1, 2, 3]) for (let v = 1; v <= (QUICK ? 1 : 2); v++) {
        const r = await render(t, lv, v, `${id}-L${lv}-v${v}`);
        const bad = [].concat(r.qa.lints || [], r.qa.verify || []);
        ok(!bad.length, `${id} L${lv} v${v}: ${bad.slice(0, 3).join(' | ')}`);
        if (v === 1) { const st = await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom); return Math.round(Math.max(...ink) - rt.top); }); stacks.push(`${id} L${lv} ${st}`); }
        if (v === 2 || QUICK) { const sw = await layoutSweep(t, lv, QUICK ? 40 : SEEDS); swept += sw.n; ok(!sw.faults.length, `${id} L${lv} layout sweep (${sw.n} distinct of ${QUICK ? 40 : SEEDS} generator seeds): ${sw.faults.slice(0, 4).join(' | ')}`); }
      }
    }
    const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); return { ...r, bodyHtml: fn(r.bodyHtml) }; } }; };
    const pr = async (name, id, lv, fn, re) => { const r = await render(spoilType(id, fn), lv, 1, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re); };
    await pr('PR1 the page shrunk to 60% (a blank band at the bottom)', 'G2-586', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is/);
    await pr('PR2 a box laid over another', 'G2-597', 2, (h) => h.replace('<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:6px">', '<div data-dk-box style="position:absolute;left:40px;top:40px;width:220px;height:140px;background:#FFFFFF"></div><div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;gap:6px">'), /two boxes collide/);
    await pr('PR3 a blank band at the top', 'G2-610', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="padding-top:90px"'), /starts \d+ px below/);
    await pr('PR4 a picture that does not load', 'G2-603', 1, (h) => h.replace(/src="file:[^"]+camel@3x\.webp"/, 'src="file:///nope.webp"'), /did not load|broken image/);
    await pr('PR5 a card whose answer is no bin on the page', 'G2-600', 2, (h) => h.replace(/data-g2-card="burr" data-dk-answer="sticks"/, 'data-g2-card="burr" data-dk-answer="floats"'), /no bin on the page/);
    await pr('PR6 a map tag moved off the map', 'G2-587', 2, (h) => h.replace(/data-g2-tagpos="1"/, 'data-g2-tagpos="1" data-x="1"').replace(/(<div style="position:absolute;left:)([0-9.]+)(px;top:[0-9.]+px" data-g2-tagpos="1")/, (m, a, x, b) => a + (Number(x) + 900) + b), /runs off the map|runs off the page|runs out of/);
    await pr('PR7 a sun strip that lost a sun', 'G2-608', 1, (h) => h.replace(/data-g1-sun="1"/, ''), /the sun strip has 13 suns/);
    await pr('PR8 a safety pair with two safe cards', 'G2-611', 1, (h) => h.replace(/data-dk-answer="no"/, 'data-dk-answer="safe"'), /not one safe card of two/);
    await pr('PR10 the life jacket over the head', 'G2-611', 1, (h) => h.replace(/(<g transform="translate\()([0-9.]+) ([0-9.]+)(\) scale\([0-9.]+ [0-9.]+\) translate\(-52 -95\)" data-g2-lifejacket="1")/g, (m, a, x, y, b) => a + x + ' ' + (Number(y) - 26) + b), /not on the torso/);
    await pr('PR11 a helmet lifted off the head', 'G2-613', 1, (h) => h.replace(/<g data-g2-helmet="1">/g, '<g data-g2-helmet="1" transform="translate(0 -70)">'), /on no head/);
    { // PR14: the draw box that no longer takes the slack (fixed at a short height): the sweep must find an empty band
      const sp = spoilType('G2-607', (h) => h.replace(/flex:1 1 auto;min-height:\d+px;align-self:center/, 'flex:0 0 auto;height:200px;align-self:center'));
      await render(sp, 3, 1, 'poison'); const sw = await layoutSweep(sp, 3, 12); judge('PR14 the ad page\'s draw box not taking the slack (layout sweep)', sw.faults, /empty band of \d+ px/);
      const t = loadType('G2-607'); await render(t, 3, 1, 'poison'); const ctl = await layoutSweep(t, 3, 12); ok(!ctl.faults.length, `PR14 control: ${ctl.faults.slice(0, 2).join(' | ')}`); }
    await pr('PR12 a graph with lines only at its numbers', 'G2-590', 2, (h) => h.replace(/<line [^>]*stroke-width="0\.8" data-g2-gridline="\d+"\/>/g, ''), /not a line at every unit|without a line at every unit/);
    await pr('PR13 an ad name that runs past its package', 'G2-607', 2, (h) => h.replace(/(<g data-g2-adname="Zingle Pop"><text x="60" y="56"[^>]*font-size=")13("[^>]*>)Zingle(<\/text>)/, '$118$2Zingle Pop$3'), /runs out of its package/);
    await pr('PR9 a one-answer group with two right answers', 'G2-597', 2, (h) => h.replace(/data-g2-choice="(can|cannot)" data-dk-answer="no"/, 'data-g2-choice="$1" data-dk-answer="right"'), /2 right answers/);
  } finally { await browser.close(); }

  console.log(`stacks (level 1-3, copy 1, measured on what is drawn): ${stacks.join(' · ')}`);
  console.log(`layout sweep: ${swept} distinct pages of the generator's seeds 1..${QUICK ? 40 : SEEDS} judged by each type's own verify`);
  console.log(`poisons ${killed}/${poisons} killed`); for (const l of plog) console.log(l);
  if (killed !== poisons) fails.push(`${poisons - killed} poison(s) not killed`);
  console.log(fails.length ? `FAIL (${fails.length} of ${assertions} assertions)\n  ` + fails.slice(0, 40).join('\n  ') : `PASS (${assertions} assertions, ${SEEDS} seeds a level)`);
  process.exit(fails.length ? 1 : 0);
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, tellFaults, answerFaults, pageRuleFaults };
