#!/usr/bin/env node
/**
 * verify-dk-g3.js — the gate of the Batch 3 Grade 3 science and health pages (G3-581 .. G3-611; factories
 * types/_shared/dk-g3.js + dk-g3-health.js, bank data/science/dk-g3.js; Daily Teaching System Stage D-5, 2026-11-24).
 *
 *   node scripts/worksheet-gen/qa/verify-dk-g3.js [--quick] [--seeds=400]
 *
 *   1. BANK: every closed item has ONE right answer by the gate's OWN tables (never the bank's word): balanced or
 *      unbalanced forces (and arrows that show it), what a magnet pulls (by the material the card prints), the climate
 *      of each place (worked out from its own numbers, with a margin), the Seattle season facts the level 3 frame asks,
 *      the fossil columns (mutually exclusive options), the dog and cat families (every young one's trait shown by a
 *      parent), trait from the parents or changed by the environment, what living in a group does (each help named by
 *      the card's own text), the desert columns, the germ frames and their habits (no habit card fits two level 1
 *      frames), the drinks, the influences, the best helper, the fair solutions, when to get a grown-up, the refusals.
 *      No brand name and no name close to a real product. Every picture is in the manifest and on disk, colour, and not
 *      refused (a gold bolt for steel, a pink key for brass, a food can, white farm geese, a dial phone ...).
 *   2. BUILD, `--seeds` (default 400) copies of every type at every level: the stamps agree with the gate's tables; NO
 *      POSITIONAL TELL (each shuffled answer's place pooled within a band of chance; no strip in a pattern; the map
 *      letters never in the cards' order; the step cards never in order; the help lines never straight across); the
 *      Batch 3 page rules (the review classes of Batches K, 1 and 2); the three levels differ; another locale refuses.
 *   3. RENDER (the print pipeline), every type x level, 2 copies (1 with --quick): verify() (the Batch K, 1 and 2 page
 *      checks plus the Batch 3 checks: a dog, a cat and a bean plant drawn as their stamps say, a map dot on the map, a
 *      circle-all group with a right and a wrong chip) and qa/lints.js clean. Then the LAYOUT SWEEP: the generator's own
 *      seeds 1..SEEDS (instanceSeed, seedEpoch 1, variant v = a Level Set copy's seedVariant), every DISTINCT page
 *      swapped into the rendered page and judged by the type's own verify (the empty band, the stack, collisions).
 *   4. POISONS: each check FAILS on a bank, a page or a set of pages spoiled for it; each page poison has a control that
 *      passes on the real page.
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const WG = path.join(__dirname, '..');
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const B = require(path.join(WG, 'data', 'science', 'dk-g3.js'));
const MAN = require(path.join(WG, 'cache', 'manifest.json'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const SEEDS = Number(arg('seeds', '400'));
const IDS = Array.from({ length: 31 }, (_, k) => 'G3-' + (581 + k));
const clone = (x) => JSON.parse(JSON.stringify(x));
const key = (p) => p.theme + '/' + p.noun;
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
const FORCE_OWN = { tug: 'balanced', book: 'balanced', bag: 'balanced', kick: 'unbalanced', wagon: 'unbalanced', box: 'unbalanced' };
/** a magnet pulls iron and steel; it does not pull aluminum, copper, zinc, brass, wood, rubber or plastic */
const MAG_OWN = { 'paper-clip': 'pulled', nail: 'pulled', scissors: 'pulled', washer: 'pulled', 'safety-pin': 'pulled', 'bottle-cap': 'pulled', foil: 'not pulled', penny: 'not pulled', 'brass-key': 'not pulled', spoon: 'not pulled', eraser: 'not pulled', button: 'not pulled' };
const MAG_METAL_NOT = new Set(['foil', 'penny', 'brass-key']);
const CLIMATE_OWN = { alaska: 'cold', miami: 'hot and wet', sahara: 'hot and dry', amazon: 'hot and wet' };
const FOSSIL_OWN = { fish: ['a water animal', 'under water'], fern: ['a land plant', 'a warm forest on land'], shell: ['a water animal', 'under water'], palm: ['a land plant', 'a warm forest on land'] };
const TRAIT_OWN = { spots: 'parents', longfur: 'parents', ears: 'parents', flower: 'parents', heavy: 'environment', short: 'environment', pale: 'environment', bent: 'environment' };
const GROUP_OWN = { wolves: ['find food'], bees: ['find food', 'stay safe'], geese: ['save energy'], fish: ['stay safe'] };
/** the words in a group card's own text that name each help (the child circles what the TEXT says) */
const HELP_CUES = { 'find food': /hunt together|gather food/i, 'stay safe': /guard|enemies|trouble picking/i, 'save energy': /\benergy\b/i };
const DESERT_OWN = { cactus: 'well', camel: 'well', tortoise: 'well', horse: 'less', sunflower: 'less', goldfish: 'not', 'water-lily': 'not', 'polar-bear': 'not' };
const GERM_OWN = { sneeze: true, handle: true, 'ben-door': true, mouth: true, bottle: true, cam: false };   // review round 1: Ben washing after the shared handle, before lunch, stops it
/** which germ frames each habit would stop (a habit that fits two frames of one page is two answers) */
const HABIT_FITS = { 'sneeze into your elbow': ['sneeze'], 'wash your hands with soap for 20 seconds': ['handle', 'ben-door', 'mouth'], 'wash your hands before you eat': ['ben-door', 'mouth'], 'use your own water bottle': ['bottle'], 'stay home when you have a fever': [] };
/** G3-599 (review round 1): the column each card's OWN words give in the desert the page describes (a small water hole
 *  all year, small and shallow in summer): deep water or ice -> cannot survive; water every day or often -> less well (only
 *  near the small hole); stores water or goes without drinking -> well. Exactly one rule may fit a card. */
const DESERT_RULES = [['not', /deep (water|pond)|ice and snow/], ['less', /every day|often/], ['well', /stores water|without drinking/]];
const DESERT_TEXT = 'The desert: very little rain, hot days and cold nights. The only water is one small water hole. In the summer it gets very small and shallow. Plants that need water often can grow only right next to the water hole.';   // review round 2: a plant cannot walk to the hole
/** G3-593: a real design that works like each design the page offers (a raised house for the flood test, a wind block for the fan) */
const REAL_MATCH = { flood: ['posts', 'levee'], wind: ['windbreak'] };
const DRINK_OWN = { water: 'everyday', milk: 'everyday', soda: 'sometimes' };
const INFL_OWN = { helmet: ['friends', 'less healthy'], ad: ['ads', 'less healthy'], walk: ['family', 'healthy'], late: ['online videos', 'less healthy'], fruit: ['friends', 'healthy'], smoothie: ['online videos', 'healthy'] };
const HELPER_OWN = { stomach: 'nurse', worry: 'counselor', dream: 'parent', swim: 'lifeguard', fire: '911', lost: 'store', 'left-out': 'counselor', headache: 'parent' };
const FAIR_OWN = { 'take turns': true, 'play together': true, 'use a timer and switch': true, 'grab it first': false, 'say something mean': false, 'tell them to go away': false };
const GROWN_OWN = { swing: false, rules: false, game: false, hurt: true, hitting: true, threat: true };
const STEPS_OWN = ['Cool down.', 'Each tell your side with an I-message.', 'Listen to the other side.', 'Think of solutions together.', 'Choose one that is fair to both.'];
const Q601_OWN = ['yes', 'no', 'yes', 'yes'];
const REFUSED_ART = {
  'around the house/spoon': 'a red plastic-looking handle: not a wooden spoon (review round 1)', 'hospital/nurse': 'an old-style cap with a red cross (US school nurses wear scrubs; the emblem is protected)',
  'tools/bolt': 'a gold bolt reads as brass', 'tools/nut': 'a painted nut', 'around the house/key': 'a pink key', 'At the Supermarket/can': 'children call cans aluminum',
  'farm animals/goose': 'a white farm goose', 'Things That Fly/goose': 'a white farm goose', 'birds 2/goose': 'a white farm goose', 'camping/rope': 'not a tug-of-war rope',
  'around the house/telephone': 'an old dial phone', 'emotions/content': 'reads as happy', 'zoo animals/sloth': 'reads as a red panda', 'occupations/coach': 'reads as a friend', 'emotions/tired': 'reads as sick', 'toys/balloon': 'a speck in a tall frame (the balloon is drawn)',
};
/** real US brand names and names close to them: never on a page */
const BRANDS = /\b(Coca|Coke|Pepsi|Sprite|Fanta|Gatorade|Mountain Dew|Dr\.? Pepper|YouTube|TikTok|Roblox|Minecraft|Fortnite|Froot|Lucky Charms|Doritos|Cheetos|Oreo|Nike|Fizz Pop|Crunch Stars)\b/i;
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
/** the climate of a place by the gate's own rule, or null when a number sits within the margin of a line */
function ownClimate(p) {
  const warm = Math.max(...p.high), yr = p.rain.reduce((a, x) => a + x, 0);
  if (Math.abs(warm - 60) < 8) return null;
  if (warm < 60) return 'cold';
  if (Math.abs(yr - 40) < 8 || Math.abs(yr - 10) < 4) return null;
  return yr >= 40 ? 'hot and wet' : yr < 10 ? 'hot and dry' : null;
}

/* ================================================================ 1. the bank */
function bankFaults(b) {
  const f = [];
  for (const s of b.FORCE_SCENES) {
    if (FORCE_OWN[s.id] !== s.forces) f.push(`${s.id}: the bank says ${s.forces} (the gate: ${FORCE_OWN[s.id]})`);
    if ((s.forces === 'balanced') !== (s.motion === 'still')) f.push(`${s.id}: ${s.forces} forces but it ${s.motion === 'still' ? 'stays still' : 'moves'}`);
    const L = Object.fromEntries(s.arrows), bal = (L.left && L.left === L.right) || (L.up && L.up === L.down);
    if ((s.forces === 'balanced') !== !!bal) f.push(`${s.id}: the arrows drawn do not show ${s.forces} forces`);
  }
  for (const o of b.MAGNET_OBJECTS) {
    if (MAG_OWN[o.id] !== (o.pulled ? 'pulled' : 'not pulled')) f.push(`${o.id}: the bank says ${o.pulled ? 'pulled' : 'not pulled'} (the gate: ${MAG_OWN[o.id] || 'no entry'})`);
    if (/\b(steel|iron)\b/.test(o.made) !== o.pulled) f.push(`${o.id}: printed "made of ${o.made}" does not match ${o.pulled ? 'pulled' : 'not pulled'}`);
  }
  if ([...MAG_METAL_NOT].some((id) => !b.MAGNET_OBJECTS.find((o) => o.id === id))) f.push('the magnet bank lost a metal that is not pulled');
  for (const p of b.CLIMATE_PLACES) {
    const c = ownClimate(p);
    if (!c) f.push(`${p.id}: its numbers sit too close to a climate line (two answers)`);
    else if (c !== CLIMATE_OWN[p.id]) f.push(`${p.id}: its numbers make it ${c} (the gate's table: ${CLIMATE_OWN[p.id]})`);
    if (p.high.some((h) => h < 0) !== !!p.belowZeroNote) f.push(`${p.id}: a high below 0 °F with no note (the bar cannot show it)`);
    if (p.high.length !== 12 || p.rain.length !== 12) f.push(`${p.id}: not twelve months`);
  }
  if (!b.CLIMATE_SORT.every((x) => Object.values(CLIMATE_OWN).includes(x))) f.push('a climate choice the gate does not know');
  { const C = b.CITY, season = (ms) => ms.map((m) => C.months.indexOf(m)), sum = (a, i) => i.reduce((s, k) => s + a[k], 0);
    const S = { winter: season(['Dec', 'Jan', 'Feb']), spring: season(['Mar', 'Apr', 'May']), summer: season(['Jun', 'Jul', 'Aug']), fall: season(['Sep', 'Oct', 'Nov']) };
    const warm = Object.keys(S).sort((a, x) => sum(C.high, S[x]) - sum(C.high, S[a])), wet = Object.keys(S).sort((a, x) => sum(C.rain, S[x]) - sum(C.rain, S[a]));
    if (sum(C.high, S[warm[0]]) - sum(C.high, S[warm[1]]) < 15) f.push(`${C.name}: the warmest season is not clear`);
    if (sum(C.rain, S[wet[0]]) - sum(C.rain, S[wet[1]]) < 3) f.push(`${C.name}: the wettest season is not clear (whole-inch rounding could tie it)`);
    if (warm[0] === wet[0]) f.push(`${C.name}: the warmest and the wettest season are the same (level 3 compares them)`);
    if (C.high.some((h) => h < 0 || h > 100)) f.push(`${C.name}: a high off the 0-100 graph`);
    if (!/,/.test(C.name)) f.push(`${C.name}: not a named US city with its state`); }
  for (const x of b.FOSSILS) { const own = FOSSIL_OWN[x.id]; if (!own || own[0] !== x.lived || own[1] !== x.then) f.push(`${x.id}: the bank says ${x.lived} / ${x.then} (the gate: ${own})`); if (!b.FOSSIL_LIVED.includes(x.lived) || !b.FOSSIL_THEN.includes(x.then)) f.push(`${x.id}: its answer is not among the choices`); }
  if (new Set(b.FOSSIL_THEN).size !== b.FOSSIL_THEN.length || new Set(b.FOSSIL_LIVED).size !== b.FOSSIL_LIVED.length) f.push('a fossil choice printed twice');
  { const [mo, fa] = b.DOGS; for (const k of ['fur', 'ears', 'spots']) { if (mo[k] === fa[k]) f.push(`the dog parents share ${k} (a puppy's ${k} could not be traced)`); for (const p of b.DOGS.slice(2)) if (![mo[k], fa[k]].includes(p[k])) f.push(`${p.id}: ${k} ${p[k]} comes from neither parent`); }
    if (new Set(b.DOGS.slice(2).map((p) => p.fur + p.ears + p.spots)).size < 3) f.push('the puppies are too alike'); }
  { if (b.CATS.some((c) => c.fur === 'orange')) f.push('an orange kitten (orange rides on the X: not from a gray mother)'); const fa = { fur: /brown tabby/.test(b.CAT_FATHER) ? 'brown' : '?', paws: /no white paws/.test(b.CAT_FATHER) ? 'no' : '?' }, mo = b.CATS[0];
    for (const c of b.CATS.slice(1)) for (const k of ['fur', 'paws']) if (![mo[k], fa[k]].includes(c[k])) f.push(`${c.id}: ${k} ${c[k]} comes from neither parent`); }
  for (const t of b.TRAITS) if (TRAIT_OWN[t.id] !== t.from) f.push(`${t.id}: the bank says ${t.from} (the gate: ${TRAIT_OWN[t.id]})`);
  { const [pl, li] = b.BEAN_PLANTS; if (!(pl.inches > li.inches && pl.leaves > li.leaves)) f.push('the well-watered bean plant is not taller with more leaves'); }
  for (const a of b.GROUP_ANIMALS) {
    const own = GROUP_OWN[a.id] || [];
    if (own.slice().sort().join() !== a.helps.slice().sort().join()) f.push(`${a.id}: the bank says ${a.helps.join('+')} (the gate: ${own.join('+')})`);
    for (const h of b.GROUP_HELPS) if (HELP_CUES[h].test(a.text) !== own.includes(h)) f.push(`${a.id}: the card's text ${HELP_CUES[h].test(a.text) ? 'names' : 'does not name'} "${h}" (the gate: ${own.includes(h) ? 'it helps' : 'it does not'})`);
  }
  for (const c of b.DESERT_CARDS) if (DESERT_OWN[c.id] !== c.col) f.push(`${c.id}: the bank says ${c.col} (the gate: ${DESERT_OWN[c.id]})`);
  if (b.DESERT !== DESERT_TEXT || /dries up/.test(b.DESERT)) f.push('the desert card is not the one the gate rules on (a water hole that dries up leaves the less-well cards nothing to drink: two answers)');
  for (const c of b.DESERT_CARDS) { const fit = DESERT_RULES.filter(([, re]) => re.test(c.needs)).map(([k]) => k); if (fit.length !== 1 || fit[0] !== DESERT_OWN[c.id]) f.push(`${c.id}: its own words ("${c.needs}") give ${fit.join(' or ') || 'no column'} (the gate: ${DESERT_OWN[c.id]})`); }
  for (const fr of b.GERM_FRAMES) { if (GERM_OWN[fr.id] !== fr.stop) f.push(`${fr.id}: the bank says stop=${fr.stop}`); if (fr.stop && !(HABIT_FITS[fr.habit] || []).includes(fr.id)) f.push(`${fr.id}: its habit "${fr.habit}" does not stop the germ there`); }
  { const l1 = b.GERM_FRAMES.filter((x) => b.GERM_L1.includes(x.id)); for (const x of l1) { const fits = l1.filter((y) => (HABIT_FITS[x.habit] || []).includes(y.id)); if (fits.length !== 1) f.push(`level 1: the habit "${x.habit}" fits ${fits.length} frames (two answers)`); } }
  for (const d of b.DRINKS) if (DRINK_OWN[d.id] !== d.when) f.push(`${d.id}: the bank says ${d.when}`);
  for (const h of b.HABITS) if (!(HABIT_FITS[h] || []).some((fr) => b.GERM_FRAMES.some((x) => x.id === fr && x.stop))) f.push(`the habit "${h}" fits no frame of the germ's trip (a habit offered must stop the germ somewhere)`);
  for (const x of b.GERM_FRAMES) if (x.stop && !b.HABITS.some((h) => (HABIT_FITS[h] || []).includes(x.id))) f.push(`frame ${x.id}: no habit in the list stops the germ there`);
  for (const c of [...b.MAGNET_CRITERIA, ...b.HAZARD_CRITERIA]) if (b.LIMITS.includes(c) || /\b(cost|costs|money|cheap|price)\b/.test(c)) f.push(`"${c}" is a limit (a constraint), not a criterion`);
  if (!b.LIMITS || b.LIMITS.length < 2) f.push('no limits to circle');
  for (const [t, ids] of Object.entries(REAL_MATCH)) if (!ids.some((id) => b.REAL_EXAMPLES.some((e) => e.id === id))) f.push(`no real design that works like the ${t} test's design`);
  for (const s of b.INFLUENCE_SCENES) { const own = INFL_OWN[s.id]; if (!own || own[0] !== s.who || own[1] !== (s.way === 'healthy' ? 'healthy' : 'less healthy')) f.push(`${s.id}: the bank says ${s.who} / ${s.way} (the gate: ${own})`); if (BRANDS.test(s.label)) f.push(`${s.id}: a real brand name`); }
  for (const s of b.SITUATIONS) if (HELPER_OWN[s.id] !== s.helper) f.push(`${s.id}: the bank says ${s.helper} (the gate: ${HELPER_OWN[s.id]})`);
  { const l1 = b.SITUATIONS.filter((s) => b.SITUATIONS_L1.includes(s.id)); if (new Set(l1.map((s) => s.helper)).size !== l1.length) f.push('level 1: two problems with one helper'); }
  for (const s of b.CONFLICT_SOLUTIONS) if (FAIR_OWN[s.label] !== s.fair) f.push(`${s.label}: the bank says fair=${s.fair}`);
  for (const g of b.GROWN_UP_SORT) if (GROWN_OWN[g.id] !== g.grownUp) f.push(`${g.id}: the bank says grown-up=${g.grownUp}`);
  if (b.CONFLICT_STEPS.join('|') !== STEPS_OWN.join('|')) f.push('the five conflict steps are not the gate\'s order');
  for (const s of b.REFUSAL_SCENES) { if (!/^No\. /.test(s.no) || !/okay/i.test(s.yes) || /^No\. /.test(s.yes)) f.push(`${s.id}: the refusal is not a clear no (or the other choice does not give in)`); if (!/^No/.test(s.yes)) f.push(`${s.id}: only the right choice begins with "No" (a child can spot it without reading)`); }
  for (const [p, where] of bankPictures(b)) for (const x of artFaults(p, where)) f.push(x);
  if (BRANDS.test(JSON.stringify(b))) f.push('a real brand name in the bank');
  return f;
}

/* ================================================================ 2. build sweep */
const picsOf = (html) => [...html.matchAll(/data-dk-pic="([^"]+)"/g)].map((m) => { const s = dec(m[1]); const i = s.lastIndexOf('/'); return { theme: s.slice(0, i), noun: s.slice(i + 1) }; });
/** every chip group on a page: { item, opts: [...], right: [...] } (one() and some() groups) */
function groupsOf(html) {
  const out = [];
  for (const seg of html.split('data-dk-item="').slice(1)) {
    const item = dec(seg.slice(0, seg.indexOf('"'))), body = seg.slice(0, seg.indexOf('</div>'));
    const chips = [...body.matchAll(/data-g3-choice="([^"]*)" data-dk-answer="(right|no)"/g)].map((m) => [dec(m[1]), m[2]]);
    out.push({ item, opts: chips.map((c) => c[0]), right: chips.filter((c) => c[1] === 'right').map((c) => c[0]), some: /data-g3-some/.test(seg.slice(0, 200)) });
  }
  return out;
}
const cardsOf = (html) => [...html.matchAll(/data-g2-card="([^"]+)" data-dk-answer="([^"]+)"/g)].map((m) => [dec(m[1]), dec(m[2])]);
const patternedOwn = (bits) => { const s = bits.map((x) => (x ? 1 : 0)).join(''); return /^(1+|0+)$/.test(s) || /^(10)+1?$/.test(s) || /^(01)+0?$/.test(s) || /^1+0+$/.test(s) || /^0+1+$/.test(s); };
/** a place's share of the answer against chance: the band is three standard errors of the pool (never under minTol) */
function bandFaults(what, counts, total, expect, minTol) { const f = []; counts.forEach((c, i) => { const s = c / total, tol = Math.max(minTol, 3 * Math.sqrt(expect[i] * (1 - expect[i]) / total)); if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds the answer ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); }); return f; }
/** the positional tells, pooled over a level's copies */
function tellFaults(id, lv, pages) {
  const f = [], tag = `${id} L${lv}`;
  // a shuffled chip group: where its right chip sits
  const shuffled = { 'G3-600': /:(lived|then)$/, 'G3-611': /^(helmet|medicine|leave-out)$/ }[id];
  if (shuffled) { const cnt = {}, tot = {}; for (const p of pages) for (const g of p.groups) if (shuffled.test(g.item) && g.right.length === 1) { const n = g.opts.length; cnt[n] = cnt[n] || Array(n).fill(0); tot[n] = (tot[n] || 0) + 1; cnt[n][g.opts.indexOf(g.right[0])]++; }
    for (const n of Object.keys(cnt)) f.push(...bandFaults(tag + ` (${n} choices)`, cnt[n], tot[n], Array(+n).fill(1 / n), 0.05));
    if (id === 'G3-611') for (const p of pages) { const at = p.groups.filter((g) => shuffled.test(g.item)).map((g) => g.opts.indexOf(g.right[0])); if (at.length === 3 && new Set(at).size === 1) f.push(`${tag}: the "no" choice sits in one place on every scene`); } }
  // a strip whose order could follow its answers
  const seqOf = { 'G3-581': (p) => p.meta.items.map((x) => x.startsWith('balanced')), 'G3-585': (p) => p.meta.items.map((x) => x.startsWith('pulled')), 'G3-605': (p) => p.meta.items.map((x) => /\/healthy:/.test(x)),
    'G3-596': (p) => p.cards.map((c) => c[1] === 'parents'), 'G3-610': (p) => p.cards.filter((c) => /^(self|grown-up)$/.test(c[1])).map((c) => c[1] === 'grown-up') }[id];
  if (seqOf) { let pat = 0, n = 0; for (const p of pages) { const s = seqOf(p); if (s.length >= 4) { n++; if (patternedOwn(s)) pat++; } } if (n && pat) f.push(`${tag}: ${pat} of ${n} copies put the answers in a pattern`); }
  // the share of each category at each place of a sorted strip
  const catOf = { 'G3-596': (c) => c[1], 'G3-599': (c) => c[1], 'G3-610': (c) => (/^(self|grown-up)$/.test(c[1]) ? c[1] : null) }[id];
  if (catOf) { const cnt = {}, tot = {}, len = {}; for (const p of pages) { const cs = p.cards.map(catOf).filter(Boolean); cs.forEach((c, i) => { cnt[c] = cnt[c] || []; cnt[c][i] = (cnt[c][i] || 0) + 1; tot[c] = (tot[c] || 0) + 1; len[c] = cs.length; }); }
    for (const c of Object.keys(cnt)) { const L = len[c], share = tot[c] / pages.length / L, tol = Math.max(0.06, 3 * Math.sqrt(share * (1 - share) / pages.length)); for (let i = 0; i < L; i++) { const s = (cnt[c][i] || 0) / pages.length; if (Math.abs(s - share) > tol) { f.push(`${tag}: "${c}" sits at place ${i + 1} on ${(100 * s).toFixed(0)}% of the copies (chance ${(100 * share).toFixed(0)}%)`); break; } } } }
  if (id === 'G3-599') { const blocks = (cs) => cs.every((c, i) => i === 0 || c[1] === cs[i - 1][1] || !cs.slice(0, i).some((x) => x[1] === c[1])); for (const p of pages) if (blocks(p.cards)) { f.push(`${tag}: every column's cards in one block`); break; } }
  if (id === 'G3-591') for (const p of pages) if (p.meta.items.some((x, i) => x.endsWith('@' + 'ABCD'[i]))) { f.push(`${tag}: a map letter in the cards' own order`); break; }
  if (id === 'G3-610' && pages[0].steps.length) for (const p of pages) if (p.steps.some((s, i) => s === 'step-' + (i + 1))) { f.push(`${tag}: a step card already in its place`); break; }
  if (id === 'G3-608' && lv === 1) for (const p of pages) { const h = p.meta.helpers; if (p.meta.sits.some((x, i) => h[i] === x.split(':')[0])) { f.push(`${tag}: a problem straight across from its helper`); break; } }
  if (id === 'G3-602' && lv === 1) { const cnt = [0, 0, 0]; for (const p of pages) p.cards.forEach((c, i) => { if (c[1] === p.meta.frames[i].split(':')[1]) cnt[i]++; }); f.push(...bandFaults(tag + ' (habit cards under their frame)', cnt, pages.length, [1 / 3, 1 / 3, 1 / 3], 0.06)); }
  return f;
}
/** the stamps a page carries agree with the gate's own tables */
function answerFaults(id, html, meta) {
  const f = [], gs = groupsOf(html);
  for (const g of gs) if (!g.some && g.right.length !== 1) f.push(`${id}: ${g.item} has ${g.right.length} right chips`);
  const want = (g) => {
    const [a, b] = g.item.split(':');
    switch (id) {
      case 'G3-581': return b === 'forces' ? FORCE_OWN[a] : FORCE_OWN[a] === 'balanced' ? 'stays still' : 'starts to move';
      case 'G3-585': return MAG_OWN[a];
      case 'G3-591': return CLIMATE_OWN[a];
      case 'G3-595': if (a === 'same') return 'no'; { const d = a.startsWith('cat-') ? B.CATS.find((x) => 'cat-' + x.id === a) : B.DOGS.find((x) => x.id === a); return d && d[b]; }
      case 'G3-600': return FOSSIL_OWN[a] && FOSSIL_OWN[a][b === 'lived' ? 0 : 1];
      case 'G3-601': return Q601_OWN[Number(a.slice(1))];
      case 'G3-603': return DRINK_OWN[a];
      case 'G3-605': return INFL_OWN[a] && INFL_OWN[a][b === 'who' ? 0 : 1];
      case 'G3-611': { const s = B.REFUSAL_SCENES.find((x) => x.id === a); return s && s.no; }
      default: return undefined;
    }
  };
  for (const g of gs) {
    if (g.some) { const own = id === 'G3-597' ? GROUP_OWN[g.item] : id === 'G3-610' && g.item === 'fair' ? Object.keys(FAIR_OWN).filter((k) => FAIR_OWN[k]) : null; if (own && own.slice().sort().join() !== g.right.slice().sort().join()) f.push(`${id}: ${g.item} stamps ${g.right.join('+')} (the gate: ${own.join('+')})`); continue; }
    const w = want(g); if (w !== undefined && g.right[0] !== w) f.push(`${id}: ${g.item} stamped "${g.right[0]}" (the gate: "${w}")`);
  }
  for (const [c, a] of cardsOf(html)) {
    if (id === 'G3-596' && TRAIT_OWN[c] !== a) f.push(`${id}: ${c} stamped ${a}`);
    if (id === 'G3-599' && DESERT_OWN[c] !== a) f.push(`${id}: ${c} stamped ${a}`);
    if (id === 'G3-602') { const fr = c.replace(/^habit-/, ''), x = B.GERM_FRAMES.find((y) => y.id === fr); if (a !== fr || !x || !(HABIT_FITS[x.habit] || []).includes(fr)) f.push(`${id}: the card ${c} stamped ${a}`); }
    if (id === 'G3-610') { if (/^step\d$/.test(c)) { const n = Number(c.slice(4)); if (a !== 'step-' + n) f.push(`${id}: ${c} stamped ${a}`); } else if ((GROWN_OWN[c] ? 'grown-up' : 'self') !== a) f.push(`${id}: ${c} stamped ${a}`); }
  }
  if (id === 'G3-610') for (const m of html.replace(/<span style="white-space:nowrap">([^<]*)<\/span>/g, '$1').matchAll(/data-g2-card="step(\d)"[^>]*>([\s\S]*?)<\/span>/g)) { const t = dec(m[2].replace(/<[^>]+>/g, '').trim()); if (t !== STEPS_OWN[+m[1] - 1]) f.push(`${id}: step card ${m[1]} prints "${t}"`); }
  if (id === 'G3-602') for (const m of html.matchAll(/data-g3-frame="([^"]+)" data-dk-answer="(stop|no)"/g)) if ((m[2] === 'stop') !== GERM_OWN[m[1]]) f.push(`${id}: frame ${m[1]} stamped ${m[2]}`);
  if (id === 'G3-608') for (const m of html.matchAll(/data-g3-sit="([^"]+)" data-dk-answer="([^"]+)"/g)) if (HELPER_OWN[m[1]] !== m[2]) f.push(`${id}: ${m[1]} stamped ${m[2]}`);
  if (id === 'G3-594') for (const m of html.matchAll(/data-g3-slot="(\d)" data-dk-answer="([^"]+)"/g)) if (['egg', 'larva', 'pupa', 'adult beetle'][m[1] - 1] !== m[2]) f.push(`${id}: slot ${m[1]} stamped ${m[2]}`);
  if (id === 'G3-591') { const dots = Object.fromEntries([...html.matchAll(/data-g3-dot="([A-D])" data-g3-place="([a-z]+)"/g)].map((m) => [m[2], m[1]])); for (const m of html.matchAll(/data-g3-letter="([a-z]+)" data-dk-answer="([A-D])"/g)) if (dots[m[1]] !== m[2]) f.push(`${id}: ${m[1]}'s letter stamped ${m[2]} (its dot is ${dots[m[1]]})`); }
  if (id === 'G3-585') for (const m of html.matchAll(/data-g3-blank="metals" data-dk-answer="([^"]+)"/g)) if (m[1] !== 'no') f.push(`${id}: "Does a magnet pull all metals?" stamped ${m[1]}`);
  return f;
}
/** the Batch 3 page rules: the classes the Batch K, 1 and 2 reviews found, on a built page and its instruction */
function pageRuleFaults(id, lv, html, ins) {
  const f = [], has = (re) => re.test(html);
  // a bar graph the child fills: a line at every unit it must reach, labelled by 1s, 2s, 5s or 10s; numbers within 1,000
  for (const m of html.matchAll(/data-g2-graph="1" data-g2-max="(\d+)" data-g2-step="(\d+)" data-g3-per="(\d+)"([\s\S]*?)<\/svg>/g)) {
    const max = +m[1], step = +m[2], per = +m[3], ks = new Set([...m[4].matchAll(/data-g2-gridline="(\d+)"/g)].map((x) => +x[1]));
    for (let k = 0; k <= max; k++) if (!ks.has(k)) { f.push(`${id}: a bar graph with no line at ${k} (a line at every unit, 3.MD.B.3)`); break; }
    if (![1, 2, 5].includes(step) || max % step) f.push(`${id}: a bar graph labelled every ${step} lines`);
    if (max * per > 1000) f.push(`${id}: a graph past 1,000`);
    if (per > 1 && !/nearest 10/.test(html)) f.push(`${id}: a scaled graph (each line ${per}) that does not say to round`);
  }
  if (/data-g2-graph="1"(?! data-g2-max)/.test(html)) f.push(`${id}: a bar graph without its scale`);
  if (BRANDS.test(html)) f.push(`${id}: a real brand name on the page`);
  if (['G3-585', 'G3-586', 'G3-587', 'G3-588'].includes(id) && !has(/Keep magnets away from computers, tablets and phones\./)) f.push(`${id}: a magnet page without the electronics safety line`);
  if (['G3-585', 'G3-586', 'G3-587', 'G3-588'].includes(id) && !has(/Never put a magnet in your mouth\./)) f.push(`${id}: a magnet page without "Never put a magnet in your mouth."`);
  if (id === 'G3-582' && !has(/the same small distance every time/)) f.push(`${id}: the pull is not kept the same (not a fair test)`);
  if (id === 'G3-582' && lv > 1 && !has(/Use the same washer for every string\./)) f.push(`${id}: the washer is not kept the same for every string`);
  if (id === 'G3-583') { if (!has(/Start the car at the top of the board every time/)) f.push(`${id}: the car does not start at the same place`); if ((html.match(/data-g3-books="1"/g) || []).length !== 1 || /data-g3-books="[2-9]"/.test(html)) f.push(`${id}: the ramp is not drawn on ONE book`); }
  if (['G3-587', 'G3-592'].includes(id) && lv === 1) { const crit = (html.split('data-g3-criteria="1"')[1] || '').split('data-g3-limits')[0]; if (B.LIMITS.some((x) => crit.includes('>' + x + '<'))) f.push(`${id}: a limit among "what a good solution must do"`); if (!has(/data-g3-limits="1"/) || !B.LIMITS.every((x) => html.includes('>' + x + '<'))) f.push(`${id}: no limits to circle`); }
  if (['G3-587', 'G3-592'].includes(id) && lv === 3 && !has(/materials, money, time, size/)) f.push(`${id}: constraints with no example`);
  if (id === 'G3-588' && lv > 1 && (html.match(/>our limit:</g) || []).length < 2) f.push(`${id}: the scoring table has no rows for our limits (3-5-ETS1-2 scores criteria AND constraints)`);
  if (id === 'G3-589' && (has(/>some</) || !has(/>partly cloudy</))) f.push(`${id}: "some" clouds (US: partly cloudy)`);
  if (id === 'G3-593' && lv === 3 && !has(/a house raised on posts/)) f.push(`${id}: no real design like the raised house`);
  if (id === 'G3-594') { if (/going round|\bround the\b/.test(html)) f.push(`${id}: "round" (US: around)`); if (lv === 3 && (html.match(/data-g3-row=/g) || []).length < 8) f.push(`${id}: level 3 logs fewer than 8 observations`); }
  if (id === 'G3-597' && has(/data-g3-group="geese"/) && !has(/just behind and beside another goose/)) f.push(`${id}: the geese sentence reads as one goose pushing the next`);
  if (id === 'G3-602' && lv > 1) { const bank = [...(html.split('data-g3-wordbank="1"')[1] || '').matchAll(/class="g1-chip"[^>]*>([^<]+)</g)].map((m) => dec(m[1])); const stops = [...html.matchAll(/data-g3-frame="([^"]+)" data-dk-answer="stop"/g)].map((m) => m[1]); for (const h of bank) if (!(HABIT_FITS[h] || []).some((x) => stops.includes(x))) f.push(`${id}: the habit "${h}" fits no frame on the page`); for (const x of stops) if (!bank.some((h) => (HABIT_FITS[h] || []).includes(x))) f.push(`${id}: frame ${x} has no habit in the list`); }
  if (id === 'G3-604' && lv > 1 && !has(/Minutes of active play today/)) f.push(`${id}: active play counted in whole hours (it comes in 20-40 minute pieces)`);
  if (id === 'G3-604' && (html.match(/data-g3-half="1"/g) || []).length !== 24) f.push(`${id}: the hour boxes are not split into half hours`);
  if (id === 'G3-606' && (has(/Now I will:/) || !has(/After 21 days \(circle one\):/))) f.push(`${id}: the lead does not fit "I met my goal!" ("Now I will: I met my goal!")`);
  if (id === 'G3-598' && lv === 3 && (!html.includes('survived = 10 − found') || /survived = 10 - found/.test(html) || !/data-g3-oneline="1"[^>]*white-space:nowrap[^>]*>survived/.test(html))) f.push(`${id}: the helper is not "survived = 10 − found" on one line with a true minus sign`);
  if (id === 'G3-594') for (const m of html.matchAll(/data-dk-prompt="obs" style="[^"]*?height:(\d+(?:\.\d+)?)px/g)) if (+m[1] < 40) { f.push(`${id}: a drawing box ${m[1]} px tall (too small to draw in)`); break; }
  if (id === 'G3-606' && (has(/>finish it</) || !has(/>I met my goal!</))) f.push(`${id}: "finish it" (it reads as keep working)`);
  if (id === 'G3-609' && !B.FEELING_MORE.every((x) => has(new RegExp('>' + x + '<')))) f.push(`${id}: no word for a card's feeling (worried, frustrated ...)`);
  if (id === 'G3-581' && lv > 1 && !has(/A stronger push or pull gets a longer arrow/)) f.push(`${id}: the child draws arrows without the longer-arrow rule`);
  if (id === 'G3-581' && lv === 3 && !has(/The book does not fall because the table/)) f.push(`${id}: no table-pushes-up frame`);
  if (id === 'G3-582' && !has(/One swing = over and back/)) f.push(`${id}: a swing is not defined (counting each pass doubles the count)`);
  if (id === 'G3-583') { if (!has(/(no push)/)) f.push(`${id}: the car is not let go without a push (not a fair test)`); if (!has(/low ramp/)) f.push(`${id}: the ramp is not kept low (distances past the graph)`); }
  if (id === 'G3-584' && !has(/did NOT rub/) && lv > 1) f.push(`${id}: no unrubbed balloon to compare`);
  if (id === 'G3-585') { const ids = [...html.matchAll(/data-g3-object="([^"]+)"/g)].map((m) => m[1]); if (!ids.includes('foil') || !ids.includes('penny')) f.push(`${id}: the page does not show a metal the magnet does not pull`); }
  if (id === 'G3-590') { if (!has(/Seattle, Washington/) || !has(/1991 to 2020, rounded/)) f.push(`${id}: the climate table is not a named city with its years`); if (lv === 3 && has(/from the graph because/)) f.push(`${id}: "I can tell from the graph" (the wettest season is in the rain row, not the graph)`); }
  if (id === 'G3-591' && has(/data-g3-card="alaska"/) && !has(/In winter the high is below 0 °F/)) f.push(`${id}: Alaska's winter highs below 0 °F with no note`);
  if (id === 'G3-595' && lv === 3 && !has(/father is a brown tabby with no white paws/)) f.push(`${id}: the kittens' brown fur traces to no parent on the page`);
  if (id === 'G3-596' && !has(/same kind, grown from seeds of the same plant/)) f.push(`${id}: the bean plants are not said to be the same kind`);
  if (id === 'G3-598' && !has(/The moths that were not found survived/)) f.push(`${id}: "survived" is not said to mean "not found"`);
  if (id === 'G3-599' && (!has(/In the summer it gets very small and shallow\. Plants that need water often can grow only right next to the water hole\./) || has(/it dries up in the summer/))) f.push(`${id}: the desert card is not the one the columns follow from (the water hole must stay, small and shallow)`);
  if (id === 'G3-600' && has(/under the sea/)) f.push(`${id}: "under the sea" (a fish or a shell fossil can come from a lake)`);
  if (id === 'G3-602' && lv === 1) { const fr = [...html.matchAll(/data-g3-frame="([^"]+)"/g)].map((m) => m[1]); if (fr.join() !== B.GERM_L1.join()) f.push(`${id}: level 1 frames are not ${B.GERM_L1.join(', ')}`); }
  if (id === 'G3-604' && !has(/most of that half hour/)) f.push(`${id}: no rule for a half hour split between two things`);
  if (id === 'G3-604' && lv > 1 && !has(/9 to 12 hours/)) f.push(`${id}: no sleep mark`);
  if (id === 'G3-607') for (const s of ['two times a year', 'every month', 'get out and stay out', 'Call 911 from outside']) if (!new RegExp(s, 'i').test(html)) f.push(`${id}: the family checklist lacks "${s}"`);
  if (id === 'G3-608' && !has(/A helper can get more than one line\./)) f.push(`${id}: a helper with two problems is not allowed for (two lines read as wrong)`);
  if (id === 'G3-609' && has(/width:52px">worried</)) f.push(`${id}: the scared face labelled "worried"`);
  if (id === 'G3-611') for (const g of groupsOf(html)) if (g.opts.length !== 2) f.push(`${id}: ${g.item} offers ${g.opts.length} choices`);
  return f;
}
function levelSig(html) { const c = {}; for (const m of html.matchAll(/data-(?:dk|g1|g2|g3)-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])); }
const insOf = (t, lv) => withLevelInstruction(resolveStrings(t.id, 'en', t), t.id, lv, 'en').instruction;
const pageOf = (r) => ({ meta: r.meta, groups: groupsOf(r.bodyHtml), cards: cardsOf(r.bodyHtml), steps: [...r.bodyHtml.matchAll(/data-g2-card="step\d" data-dk-answer="(step-\d)"/g)].map((m) => m[1]) });

/* ================================================================ main */
async function main() {
  const bf = bankFaults(B);
  ok(!bf.length, 'bank: ' + bf.slice(0, 10).join(' | '));
  const P = (name, mut, re) => { const b = clone(B); mut(b); judge(name, bankFaults(b), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 the book on the table keyed unbalanced', (b) => { find(b.FORCE_SCENES, 'book').forces = 'unbalanced'; }, /book: the bank says unbalanced/);
  P('PB2 the tug-of-war drawn with unequal arrows', (b) => { find(b.FORCE_SCENES, 'tug').arrows = [['left', 3], ['right', 2]]; }, /tug: the arrows drawn/);
  P('PB3 the penny keyed pulled', (b) => { find(b.MAGNET_OBJECTS, 'penny').pulled = true; }, /penny: the bank says pulled/);
  P('PB4 the paper clip printed "made of aluminum"', (b) => { find(b.MAGNET_OBJECTS, 'paper-clip').made = 'aluminum'; }, /paper-clip: printed/);
  P('PB5 Miami with 30 inches of rain (too close to the line)', (b) => { find(b.CLIMATE_PLACES, 'miami').rain = [1, 1, 2, 2, 3, 5, 4, 4, 4, 2, 1, 1]; }, /miami: its numbers/);
  { const b = clone(B); const G = CLIMATE_OWN.sahara; CLIMATE_OWN.sahara = 'hot and wet'; judge('PB6 the gate\'s own table disagrees with the Sahara\'s numbers', bankFaults(b), /sahara: its numbers make it hot and dry/); CLIMATE_OWN.sahara = G; }
  P('PB7 Utqiagvik without its below-zero note', (b) => { delete find(b.CLIMATE_PLACES, 'alaska').belowZeroNote; }, /below 0 °F with no note/);
  P('PB8 Chicago back (summer warmest AND wettest)', (b) => { b.CITY = { name: 'Chicago, Illinois', months: b.CITY.months, high: [32, 36, 47, 59, 70, 80, 84, 82, 75, 62, 48, 36], rain: [2, 2, 2, 4, 4, 5, 4, 4, 3, 3, 2, 2] }; }, /warmest and the wettest season are the same/);
  P('PB9 a city with a tied wettest season', (b) => { b.CITY.rain = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]; }, /wettest season is not clear/);
  P('PB10 the fern fossil keyed "under water"', (b) => { find(b.FOSSILS, 'fern').then = 'under water'; }, /fern: the bank says/);
  P('PB11 a fossil choice printed twice', (b) => { b.FOSSIL_THEN.push('under water'); }, /printed twice/);
  P('PB12 a puppy with spots from neither parent (both parents plain)', (b) => { b.DOGS[1].spots = 'no'; }, /share spots|comes from neither parent/);
  P('PB13 a plain kitten back (no parent is plain)', (b) => { b.CATS[3].paws = 'maybe'; }, /kit3: paws/);
  P('PB13b an orange kitten of a gray mother', (b) => { b.CATS[2].fur = 'orange'; }, /an orange kitten/);
  P('PB14 the wind-bent tree keyed "from the parents"', (b) => { find(b.TRAITS, 'bent').from = 'parents'; }, /bent: the bank says parents/);
  P('PB15 the dry bean plant taller', (b) => { b.BEAN_PLANTS[1].inches = 12; }, /not taller/);
  P('PB16 the geese keyed "find food"', (b) => { find(b.GROUP_ANIMALS, 'geese').helps = ['find food']; }, /geese: the bank says/);
  P('PB17 the wolves\' card without its food words', (b) => { find(b.GROUP_ANIMALS, 'wolves').text = 'Wolves live in a pack and howl together.'; }, /wolves: the card's text does not name "find food"/);
  P('PB18 the horse keyed "survives well"', (b) => { find(b.DESERT_CARDS, 'horse').col = 'well'; }, /horse: the bank says well/);
  P('PB19 the door-handle frame at level 1 (two hand-washing habits fit)', (b) => { b.GERM_L1 = ['sneeze', 'handle', 'mouth']; b.GERM_FRAMES.find((x) => x.id === 'mouth').habit = 'wash your hands with soap for 20 seconds'; }, /fits 2 frames/);
  P('PB20 soda keyed an everyday drink', (b) => { find(b.DRINKS, 'soda').when = 'everyday'; }, /soda: the bank says/);
  P('PB21 a real brand in an influence scene', (b) => { find(b.INFLUENCE_SCENES, 'ad').label = 'A TV ad shows kids laughing while they drink a Coke.'; }, /real brand/);
  P('PB22 the headache at home keyed "school nurse"', (b) => { find(b.SITUATIONS, 'headache').helper = 'nurse'; }, /headache: the bank says nurse/);
  P('PB23 "grab it first" keyed fair', (b) => { b.CONFLICT_SOLUTIONS.find((x) => x.id === 'grab').fair = true; }, /grab it first: the bank says fair=true/);
  P('PB24 hitting keyed "we can work it out"', (b) => { find(b.GROWN_UP_SORT, 'hitting').grownUp = false; }, /hitting: the bank says/);
  P('PB25 the steps out of order', (b) => { [b.CONFLICT_STEPS[0], b.CONFLICT_STEPS[1]] = [b.CONFLICT_STEPS[1], b.CONFLICT_STEPS[0]]; }, /conflict steps/);
  P('PB26 a refusal that is not a clear no', (b) => { b.REFUSAL_SCENES[0].no = 'Maybe later.'; }, /not a clear no/);
  P('PB27 the gold bolt among the steel things', (b) => { find(b.MAGNET_OBJECTS, 'washer').pic = { theme: 'tools', noun: 'bolt' }; }, /gold bolt/);
  P('PB28 a white farm goose for the Canada geese', (b) => { const g = find(b.GROUP_ANIMALS, 'geese'); delete g.draw; g.pic = { theme: 'farm animals', noun: 'goose' }; }, /white farm goose/);
  P('PB29 a picture missing from the library', (b) => { find(b.DESERT_CARDS, 'camel').pic = { theme: 'zoo animals', noun: 'camel9' }; }, /not in the cache manifest/);
  P('PB30 a black-and-white picture', (b) => { find(b.DESERT_CARDS, 'horse').pic = { theme: 'animals bw', noun: 'horse' }; }, /black-and-white/);
  P('PB31 the giving-in choice not beginning with "No" (the answer spotted without reading)', (b) => { b.REFUSAL_SCENES[1].yes = 'Okay, if you say it helps.'; }, /only the right choice begins/);
  P('PB34 the water hole that dries up in summer (the horse has nothing to drink: two answers)', (b) => { b.DESERT = 'The desert: very little rain, hot days and cold nights. The only water is one small water hole, and it dries up in the summer.'; }, /two answers/);
  P('PB35 the goldfish without "deep" (its words give no column)', (b) => { find(b.DESERT_CARDS, 'goldfish').needs = 'must live in water all year'; }, /goldfish: its own words/);
  P('PB36 the fever habit back (it fits no frame)', (b) => { b.HABITS.push('stay home when you have a fever'); }, /fits no frame/);
  P('PB37 Ben\'s door not a stop and no habit for it', (b) => { b.HABITS = b.HABITS.filter((h) => h !== 'wash your hands with soap for 20 seconds' && h !== 'wash your hands before you eat'); }, /no habit in the list stops the germ/);
  P('PB38 "costs very little" back among the criteria', (b) => { b.MAGNET_CRITERIA.push('costs very little'); }, /is a limit/);
  P('PB39 no raised house among the real designs', (b) => { b.REAL_EXAMPLES = b.REAL_EXAMPLES.filter((e) => e.id !== 'posts' && e.id !== 'levee'); }, /flood test/);
  P('PB40 the library spoon back (it reads as plastic)', (b) => { const o = find(b.MAGNET_OBJECTS, 'spoon'); delete o.draw; o.pic = { theme: 'around the house', noun: 'spoon' }; }, /not a wooden spoon/);
  P('PB42 the desert without where the plants grow (the sunflower: two answers)', (b) => { b.DESERT = b.DESERT.replace(' Plants that need water often can grow only right next to the water hole.', ''); }, /two answers/);
  P('PB41 the library nurse back (a red cross cap)', (b) => { const o = b.HELPERS.find((x) => x.id === 'nurse'); delete o.draw; o.pic = { theme: 'hospital', noun: 'nurse' }; }, /red cross/);
  P('PB33 "a kitten born with blue eyes" back (every kitten is)', (b) => { b.TRAITS.push({ id: 'eyes', label: 'a kitten born with blue eyes', from: 'parents' }); }, /eyes: the bank says parents \(the gate: undefined\)/);
  P('PB32 a trait card the gate has no ruling for (the scar: is a scar a trait?)', (b) => { b.TRAITS.push({ id: 'scar', label: 'a dog with a scar from a cut on its leg', from: 'environment' }); }, /scar: the bank says environment \(the gate: undefined\)/);

  // ---- 2. build sweep
  const pagesOf = {};
  for (const id of IDS) {
    const t = loadType(id);
    ok(t.exerciseType && /^[a-z-]+$/.test(t.exerciseType) && t.gradeBand === 'G3', `${id}: no family key or not Grade 3`);
    let refused = false; try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const pages = [];
      for (let s = 1; s <= SEEDS; s++) {
        let r;
        try { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`dkg3|${id}|${lv}|${s}`), variant: s }); } catch (e) { ok(false, `${id} L${lv} #${s}: build throws ${e.message}`); break; }
        pages.push(pageOf(r));
        if (s <= 3 || s % 25 === 0) {
          const af = answerFaults(id, r.bodyHtml, r.meta); ok(!af.length, af.join(' | '));
          const pg = pageRuleFaults(id, lv, r.bodyHtml, insOf(t, lv)); ok(!pg.length, pg.join(' | '));
          for (const p of picsOf(r.bodyHtml)) { const pf = artFaults(p, `${id} L${lv}`); ok(!pf.length, pf.join(' | ')); }
          if (s === 1) sigs[lv] = levelSig(r.bodyHtml);
        }
      }
      pagesOf[id + ' ' + lv] = pages;
      const tf = tellFaults(id, lv, pages);
      ok(!tf.length, tf.slice(0, 6).join(' | '));
    }
    ok(sigs[1] !== sigs[2] && sigs[2] !== sigs[3] && sigs[1] !== sigs[3], `${id}: two levels draw the same parts`);
  }
  const spoil = (k, fn) => pagesOf[k].map((p) => fn(clone(p)));
  judge('PT1 the balanced scenes always first', tellFaults('G3-581', 2, spoil('G3-581 2', (p) => ({ ...p, meta: { ...p.meta, items: [...p.meta.items.filter((x) => x.startsWith('balanced')), ...p.meta.items.filter((x) => !x.startsWith('balanced'))] } }))), /pattern/);
  judge('PT2 the pulled objects always first', tellFaults('G3-585', 2, spoil('G3-585 2', (p) => ({ ...p, meta: { ...p.meta, items: [...p.meta.items.filter((x) => x.startsWith('pulled')), ...p.meta.items.filter((x) => !x.startsWith('pulled'))] } }))), /pattern/);
  judge('PT3 the right fossil choice always on top', tellFaults('G3-600', 1, spoil('G3-600 1', (p) => ({ ...p, groups: p.groups.map((g) => ({ ...g, opts: [g.right[0], ...g.opts.filter((o) => o !== g.right[0])] })) }))), /place 1 holds/);
  judge('PT4 the "no" choice first in every scene', tellFaults('G3-611', 2, spoil('G3-611 2', (p) => ({ ...p, groups: p.groups.map((g) => ({ ...g, opts: [g.right[0], ...g.opts.filter((o) => o !== g.right[0])] })) }))), /place 1 holds|one place on every scene/);
  judge('PT5 the map letters in the cards\' order', tellFaults('G3-591', 2, spoil('G3-591 2', (p) => ({ ...p, meta: { ...p.meta, items: p.meta.items.map((x, i) => x.split('@')[0] + '@' + 'ABCD'[i]) } }))), /cards' own order/);
  judge('PT6 the step cards already in order', tellFaults('G3-610', 2, spoil('G3-610 2', (p) => ({ ...p, steps: ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'] }))), /already in its place/);
  judge('PT7 the parent traits always first', tellFaults('G3-596', 2, spoil('G3-596 2', (p) => ({ ...p, cards: [...p.cards.filter((c) => c[1] === 'parents'), ...p.cards.filter((c) => c[1] !== 'parents')] }))), /pattern|sits at place/);
  judge('PT8 the desert cards sorted by column', tellFaults('G3-599', 2, spoil('G3-599 2', (p) => ({ ...p, cards: p.cards.slice().sort((a, b) => a[1].localeCompare(b[1])) }))), /in one block|sits at place/);
  judge('PT9 each problem straight across from its helper', tellFaults('G3-608', 1, spoil('G3-608 1', (p) => ({ ...p, meta: { ...p.meta, helpers: p.meta.sits.map((x) => x.split(':')[0]) } }))), /straight across/);
  judge('PT10 each habit card under its own frame', tellFaults('G3-602', 1, spoil('G3-602 1', (p) => ({ ...p, cards: p.meta.frames.map((x) => ['habit-' + x.split(':')[1], x.split(':')[1]]) }))), /under their frame/);
  judge('PT11 the healthy scenes always first', tellFaults('G3-605', 2, spoil('G3-605 2', (p) => ({ ...p, meta: { ...p.meta, items: [...p.meta.items.filter((x) => /\/healthy:/.test(x)), ...p.meta.items.filter((x) => !/\/healthy:/.test(x))] } }))), /pattern/);
  { let falseTells = 0, pools = 0; for (const [k, ps] of Object.entries(pagesOf)) { if (ps[0].meta.record) continue; for (let i = 0; i + 40 <= Math.min(ps.length, 200); i += 40) { pools++; if (tellFaults(k.split(' ')[0], +k.split(' ')[1], ps.slice(i, i + 40)).length) falseTells++; } }
    console.log(`40-copy pools of the real closed pages: ${falseTells} of ${pools} report a tell (the ${SEEDS}-copy pools report none)`); }
  { const t = loadType('G3-585'); const same = { ...t, difficulty: { 1: t.difficulty[2], 2: t.difficulty[2], 3: t.difficulty[2] } };
    const sg = [1, 2, 3].map((lv) => levelSig(same.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('lv') }).bodyHtml));
    judge('PL1 three levels with one config', sg[0] === sg[1] && sg[1] === sg[2] ? ['two levels draw the same parts'] : [], /same parts/); }
  // answer and page-rule poisons on real pages (each with its control)
  const pagePoison = (name, id, lv, fn, re, insFn, which = 'rule', mustShow = null) => {
    const t = loadType(id); let r; for (let k = 0; k < 200; k++) { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('pg|' + id + '|' + lv + (k ? '|' + k : '')) }); if (!mustShow || r.bodyHtml.includes(mustShow)) break; } const ins = insOf(t, lv);
    const run = (h, i) => (which === 'rule' ? pageRuleFaults(id, lv, h, i) : answerFaults(id, h, r.meta));
    ok(!run(r.bodyHtml, ins).length, `${name} control: ${run(r.bodyHtml, ins).join(' | ')}`);
    judge(name, run(fn(r.bodyHtml), insFn ? insFn(ins) : ins), re);
  };
  const flipGroup = (h, item) => { const i = h.indexOf(`data-dk-item="${item}"`), j = h.indexOf('</div>', i); const seg = h.slice(i, j).replace(/data-dk-answer="right"/, 'data-dk-answer="TMP"').replace(/data-dk-answer="no"/, 'data-dk-answer="right"').replace('data-dk-answer="TMP"', 'data-dk-answer="no"'); return h.slice(0, i) + seg + h.slice(j); };
  pagePoison('PA1 the kick stamped balanced', 'G3-581', 2, (h) => flipGroup(h, 'kick:forces'), /kick:forces stamped/, null, 'answer');
  pagePoison('PA2 the penny stamped pulled', 'G3-585', 2, (h) => flipGroup(h, 'penny'), /penny stamped "pulled"/, null, 'answer');
  pagePoison('PA3 a map letter stamped wrong', 'G3-591', 2, (h) => h.replace(/data-g3-letter="miami" data-dk-answer="([A-D])"/, (m, x) => `data-g3-letter="miami" data-dk-answer="${x === 'A' ? 'B' : 'A'}"`), /miami's letter stamped/, null, 'answer');
  pagePoison('PA4 the pupa slot stamped larva', 'G3-594', 1, (h) => h.replace('data-g3-slot="3" data-dk-answer="pupa"', 'data-g3-slot="3" data-dk-answer="larva"'), /slot 3 stamped larva/, null, 'answer');
  pagePoison('PA5 puppy 1 stamped floppy ears', 'G3-595', 2, (h) => flipGroup(h, 'pup1:ears'), /pup1:ears stamped/, null, 'answer');
  pagePoison('PA6 the wind-bent tree stamped "parents"', 'G3-596', 2, (h) => h.replace('data-g2-card="bent" data-dk-answer="environment"', 'data-g2-card="bent" data-dk-answer="parents"'), /bent stamped parents/, null, 'answer');
  pagePoison('PA7 the bees stamping one help', 'G3-597', 2, (h) => { const i = h.indexOf('data-dk-item="bees"'), j = h.indexOf('</div>', i); return h.slice(0, i) + h.slice(i, j).replace('data-g3-choice="stay safe" data-dk-answer="right"', 'data-g3-choice="stay safe" data-dk-answer="no"') + h.slice(j); }, /bees stamps/, null, 'answer');
  pagePoison('PA8 the goldfish stamped "less well"', 'G3-599', 2, (h) => h.replace('data-g2-card="goldfish" data-dk-answer="not"', 'data-g2-card="goldfish" data-dk-answer="less"'), /goldfish stamped less/, null, 'answer');
  pagePoison('PA9 the fern stamped "under water"', 'G3-600', 1, (h) => flipGroup(h, 'fern:then'), /fern:then stamped/, null, 'answer', 'fern:then');
  pagePoison('PA10 the Ben-door frame stamped "no stop"', 'G3-602', 2, (h) => h.replace('data-g3-frame="ben-door" data-dk-answer="stop"', 'data-g3-frame="ben-door" data-dk-answer="no"'), /frame ben-door stamped no/, null, 'answer');
  pagePoison('PA11 soda stamped everyday', 'G3-603', 2, (h) => flipGroup(h, 'soda'), /soda stamped "everyday"/, null, 'answer');
  pagePoison('PA12 the ad scene stamped "friends"', 'G3-605', 2, (h) => { const i = h.indexOf('data-dk-item="ad:who"'), j = h.indexOf('</div>', i); return h.slice(0, i) + h.slice(i, j).replace('data-g3-choice="ads" data-dk-answer="right"', 'data-g3-choice="ads" data-dk-answer="no"').replace('data-g3-choice="friends" data-dk-answer="no"', 'data-g3-choice="friends" data-dk-answer="right"') + h.slice(j); }, /ad:who stamped/, null, 'answer');
  pagePoison('PA13 the headache stamped "nurse"', 'G3-608', 2, (h) => h.replace('data-g3-sit="headache" data-dk-answer="parent"', 'data-g3-sit="headache" data-dk-answer="nurse"'), /headache stamped nurse/, null, 'answer');
  pagePoison('PA14 a step card printing another step', 'G3-610', 2, (h) => h.replace('Cool down.', 'Listen to the other side.'), /prints/, null, 'answer');
  pagePoison('PA15 the refusal "Okay, just this once." stamped right', 'G3-611', 1, (h) => flipGroup(h, 'helmet'), /helmet stamped/, null, 'answer');
  pagePoison('PA16 a one-answer group with two right chips', 'G3-581', 2, (h) => h.replace(/data-g3-choice="stays still" data-dk-answer="no"/, 'data-g3-choice="stays still" data-dk-answer="right"'), /2 right chips/, null, 'answer');
  pagePoison('PG1 a graph with a line only at every other unit', 'G3-590', 2, (h) => h.replace(/<line [^>]*data-g2-gridline="\d*[13579]"\/>/g, ''), /no line at 1 /);
  pagePoison('PG2 a graph labelled every 3 lines', 'G3-582', 3, (h) => h.replace('data-g2-max="30" data-g2-step="5"', 'data-g2-max="30" data-g2-step="3"'), /labelled every 3 lines/);
  pagePoison('PG3 a scaled graph without "round"', 'G3-583', 3, (h) => h.replace(/nearest 10/g, 'nearest ten'), /does not say to round/);
  pagePoison('PG4 a magnet page without the safety line', 'G3-586', 2, (h) => h.replace('Keep magnets away from computers, tablets and phones.', 'Have fun with magnets.'), /safety line/);
  pagePoison('PG5 the level 1 magnet page without a metal that is not pulled', 'G3-585', 1, (h) => h.replace('data-g3-object="foil"', 'data-g3-object="nail2"'), /a metal the magnet does not pull/);
  pagePoison('PG6 the arrow page without the longer-arrow rule', 'G3-581', 2, (h) => h.replace('A stronger push or pull gets a longer arrow.', ''), /longer-arrow rule/);
  pagePoison('PG7 a swing not defined', 'G3-582', 1, (h) => h.replace('One swing = over and back.', ''), /a swing is not defined/);
  pagePoison('PG8 the car given a push', 'G3-583', 2, (h) => h.replace('(no push)', ''), /without a push/);
  pagePoison('PG9 Chicago with no years on the table', 'G3-590', 2, (h) => h.replace('Seattle, Washington', 'Chicago').replace(' (1991 to 2020, rounded)', ''), /named city/);
  pagePoison('PG10 "I can tell from the graph" back', 'G3-590', 3, (h) => h.replace('These two seasons are different because', 'I can tell from the graph because'), /from the graph/);
  pagePoison('PG11 the kittens\' father not named', 'G3-595', 3, (h) => h.replace(/The kittens(’|&#39;|')? father is a brown tabby with no white paws\./, ''), /traces to no parent/);
  pagePoison('PG12 "under the sea" back', 'G3-600', 1, (h) => h.replace(/under water/g, 'under the sea'), /under the sea/);
  pagePoison('PG13 the day strip without its part-hour rule', 'G3-604', 2, (h) => h.replace(': use what you do for most of that half hour', ''), /split between two things/);
  pagePoison('PG14 the checklist without "every month"', 'G3-607', 2, (h) => h.replace('every month', 'every year'), /every month/);
  pagePoison('PG15 the help finder without "more than one line"', 'G3-608', 2, (h) => h.replace('A helper can get more than one line.', ''), /two problems is not allowed/);
  pagePoison('PG16 the scared face labelled "worried"', 'G3-609', 1, (h) => h.replace('>scared<', '>worried<'), /labelled "worried"/);
  pagePoison('PG17 a brand name on the influence page', 'G3-605', 2, (h) => h.replace('a big, sugary drink', 'a Pepsi'), /real brand/);
  pagePoison('PG18 the moth page without what "survived" means', 'G3-598', 1, (h) => h.replace(' The moths that were not found survived.', ''), /not found/);
  pagePoison('PG19 the water hole that dries up in the summer again', 'G3-599', 1, (h) => h.replace('In the summer it gets very small and shallow.', 'It dries up in the summer.').replace('The only water is one small water hole.', 'The only water is one small water hole, and it dries up in the summer.'), /must stay, small and shallow/);
  // review round 1
  pagePoison('PG21 a magnet page without "Never put a magnet in your mouth."', 'G3-585', 2, (h) => h.replace(' Never put a magnet in your mouth.', ''), /in your mouth/);
  pagePoison('PG22 the pendulum pulled any distance', 'G3-582', 1, (h) => h.replace('the same small distance every time, ', ''), /not a fair test/);
  pagePoison('PG23 a different washer for each string', 'G3-582', 2, (h) => h.replace(' Use the same washer for every string.', ''), /same for every string/);
  pagePoison('PG24 the car let go anywhere on the board', 'G3-583', 2, (h) => h.replace('Start the car at the top of the board every time, and let it', 'Let it'), /same place/);
  pagePoison('PG25 a stack of books under the ramp', 'G3-583', 1, (h) => h.replace('data-g3-books="1"', 'data-g3-books="3"'), /ONE book/);
  pagePoison('PG26 "costs very little" back among the criteria', 'G3-587', 1, (h) => h.replace('data-g3-criteria="1"', 'data-g3-criteria="1"><span class="g1-chip">costs very little</span'), /a limit among/);
  pagePoison('PG27 level 1 without the limits row', 'G3-592', 1, (h) => h.replace('data-g3-limits="1"', 'data-g3-x="1"'), /no limits to circle/);
  pagePoison('PG28 the scoring table without limit rows', 'G3-588', 2, (h) => h.split('>our limit:<').join('>must do:<'), /rows for our limits/);
  pagePoison('PG29 "some" clouds back', 'G3-589', 2, (h) => h.split('>partly cloudy<').join('>some<'), /partly cloudy/);
  pagePoison('PG30 no raised house among the real designs', 'G3-593', 3, (h) => h.replace('a house raised on posts', 'a tall fence'), /raised house/);
  pagePoison('PG31 "going round the arrows" back', 'G3-594', 1, (h) => h.replace('going around the arrows', 'going round the arrows'), /US: around/);
  pagePoison('PG32 level 3 with six log rows', 'G3-594', 3, (h) => h.replace(/data-g3-row="[67]"/g, 'data-gx-row="x"'), /fewer than 8/);
  pagePoison('PG33 the old geese sentence', 'G3-597', 2, (h) => h.replace(/Each goose flies just behind and beside another goose, where the air is pushed up\. This helps the flock use less energy\./, 'Each goose flies in the air pushed up by the goose in front, so the flock uses less energy.'), /one goose pushing/);
  pagePoison('PG34 the fever habit back in the list', 'G3-602', 2, (h) => h.replace('use your own water bottle</span>', 'use your own water bottle</span><span class="g1-chip" data-dk-box>stay home when you have a fever</span>'), /fits no frame on the page/);
  pagePoison('PG35 active play in hours again', 'G3-604', 2, (h) => h.replace('Minutes of active play today', 'Hours of active play'), /20-40 minute/);
  pagePoison('PG36 whole-hour boxes', 'G3-604', 1, (h) => h.split('data-g3-half="1"').join('data-gx="1"'), /half hours/);
  pagePoison('PG37 "finish it" back', 'G3-606', 2, (h) => h.replace('>I met my goal!<', '>finish it<'), /finish it/);
  // review round 2
  pagePoison('PG39 the desert card without where the plants grow', 'G3-599', 2, (h) => h.replace(' Plants that need water often can grow only right next to the water hole.', ''), /must stay, small and shallow/);
  pagePoison('PG40 the helper with a hyphen for minus', 'G3-598', 3, (h) => h.replace('survived = 10 − found', 'survived = 10 - found'), /true minus sign/);
  pagePoison('PG41 "Now I will:" back before "I met my goal!"', 'G3-606', 2, (h) => h.replace('After 21 days (circle one):', 'Now I will:'), /does not fit/);
  pagePoison('PG42 tiny drawing boxes in the mealworm log', 'G3-594', 2, (h) => h.split('data-dk-prompt="obs" style="flex-shrink:0;width:150px;height:40px').join('data-dk-prompt="obs" style="flex-shrink:0;width:150px;height:28px'), /too small to draw in/);
  pagePoison('PG38 no word for a worried card', 'G3-609', 1, (h) => h.split('>worried<').join('>calm<'), /no word for a card/);
  pagePoison('PG20 a level 1 germ frame swapped for the door handle', 'G3-602', 1, (h) => h.replace('data-g3-frame="mouth"', 'data-g3-frame="handle"'), /level 1 frames/);

  // ---- 3. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  const OUT = path.join(require('os').tmpdir(), 'verify-dk-g3');
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
    await pr('PR1 the page shrunk to 60% (a blank band at the bottom)', 'G3-586', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is/);
    await pr('PR2 a box laid over another', 'G3-597', 2, (h) => h.replace('<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;', '<div data-dk-box style="position:absolute;left:40px;top:40px;width:220px;height:140px;background:#FFFFFF"></div><div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;'), /two boxes collide/);
    await pr('PR3 a blank band at the top', 'G3-606', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="padding-top:90px"'), /starts \d+ px below/);
    await pr('PR4 a picture that does not load', 'G3-599', 2, (h) => h.replace(/src="file:[^"]+camel@3x\.webp"/, 'src="file:///nope.webp"'), /did not load|broken image/);
    await pr('PR5 a graph with lines only at its numbers', 'G3-598', 3, (h) => h.replace(/<line [^>]*stroke-width="0\.8" data-g2-gridline="\d+"\/>/g, ''), /not a line at every unit|without a line at every unit/);
    await pr('PR6 a puppy drawn with ears its stamp does not say', 'G3-595', 1, (h) => h.replace(/(data-g3-dog="pup1"[^>]*data-g3-ears=")pointed"/, '$1floppy"'), /ears drawn are not floppy/);
    await pr('PR7 a cat drawn without the white paws its stamp says', 'G3-595', 3, (h) => h.replace(/(data-g3-cat="mother"[\s\S]*?)data-g3-paw="white"/, '$1data-g3-paw="fur"'), /paws drawn/);
    await pr('PR8 a bean plant that lost a leaf', 'G3-596', 1, (h) => h.replace(/ data-g3-leaf="1"/, ''), /leaves drawn/);
    await pr('PR9 a map dot moved off the map', 'G3-591', 2, (h) => h.replace(/(<g data-g3-dot="A"[^>]*>)<circle cx="([0-9.]+)"/, (m, a, x) => `${a}<circle cx="${Number(x) + 2600}"`), /runs off the map/);
    await pr('PR10 a circle-all group with every chip right', 'G3-597', 2, (h) => { const i = h.indexOf('data-dk-item="wolves"'), j = h.indexOf('</div>', i); return h.slice(0, i) + h.slice(i, j).replace(/data-dk-answer="no"/g, 'data-dk-answer="right"') + h.slice(j); }, /a circle-all group with 3 right of 3/);
    await pr('PR13 a graph squeezed to half its height (lines under 5 mm apart)', 'G3-590', 2, (h) => h.replace(/(<svg [^>]*height=")([0-9.]+)("[^>]*data-g2-graph="1")/, (m, a, v, b2) => a + (Number(v) / 2).toFixed(1) + b2), /unit lines [0-9.]+ px apart/);
    await pr('PR15 the minus helper allowed to wrap', 'G3-598', 3, (h) => h.replace('white-space:nowrap">survived', 'width:60px">survived'), /wraps onto two lines/);
    await pr('PR16 a sort card squeezed onto its cut line', 'G3-610', 3, (h) => h.replace(/(data-g2-card="rules"[^>]*?height:)60px/, '$144px'), /comes [-0-9.]+ px from its cut line/);
    await pr('PR14 the desert columns too short for their cards', 'G3-599', 2, (h) => h.replace(/flex:1 1 0;min-height:\d+px" ?>/g, (m) => m).replace(/(data-g2-bin="(well|not)" style="[^"]*?)flex:1 1 0;min-height:\d+px/g, '$1flex:0 0 auto;height:170px'), /holds \d+ of its \d+ cards/);
    await pr('PR11 a one-answer group with two right answers', 'G3-585', 2, (h) => h.replace(/data-g3-choice="not pulled" data-dk-answer="no"/, 'data-g3-choice="not pulled" data-dk-answer="right"'), /2 right answers/);
    { // PR12: a draw box that no longer takes the slack (fixed at a short height): the sweep must find an empty band
      const sp = spoilType('G3-582', (h) => h.replace(/flex:1 1 auto;min-height:\d+px;align-self:center/, 'flex:0 0 auto;height:60px;align-self:center'));
      await render(sp, 1, 1, 'poison'); const sw = await layoutSweep(sp, 1, 12); judge('PR12 the pendulum draw box not taking the slack (layout sweep)', sw.faults, /empty band of \d+ px|the stack is/);
      const t = loadType('G3-582'); await render(t, 1, 1, 'poison'); const ctl = await layoutSweep(t, 1, 12); ok(!ctl.faults.length, `PR12 control: ${ctl.faults.slice(0, 2).join(' | ')}`); }
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
