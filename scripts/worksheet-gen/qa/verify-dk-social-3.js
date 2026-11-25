#!/usr/bin/env node
/**
 * verify-dk-social-3.js — the gate of the Batch S3 Grade 3 social studies pages (G3-612 .. G3-629; factory
 * types/_shared/dk-social-3.js + its drawings dk-social-3-art.js; bank data/social/dk-social-3.js; the US maps
 * data/social/dk-social-3-geo.js; Daily Teaching System Stage D-5, 2026-11-25).
 *
 *   node scripts/worksheet-gen/qa/verify-dk-social-3.js [--quick] [--seeds=400] [--no-render]
 *
 *   1. BANK: every closed item has ONE right answer by the gate's OWN tables (never the bank's word): the civic virtue of
 *      each situation and the other virtues a child could still defend for it (no situation shares a word with a virtue
 *      or what it means); the Constitution's first words and date; the three stories of changing laws (the chart's
 *      answers are in each story); the map that answers each map-scale question; the many / few people at each real
 *      place, RE-COUNTED from the drawn dots and its landform re-tested on the drawn regions; the town sites; the level of
 *      every leader and service; the branch of every card; the level each tax pays for; the three ways to decide; the
 *      primary and secondary sources; the timeline's dates and its "within five years" pairs (exactly the design's);
 *      the bakery's resources; each cause and its effect. Sentences a child reads have 15 words or fewer. Every colour
 *      the drawings write is in PAL3; the maps carry their sources' sha256.
 *   2. BUILD, `--seeds` copies of every type at every level (2,000 for the sort and match types): the stamps agree with
 *      the gate's tables; the one-answer tests (a unique assignment of the virtues; the map distances re-measured from
 *      the places, whole inches or half inches as the level asks, and right when printed at 97%); NO POSITIONAL TELL (the
 *      answer at each place, pooled, within a band of chance); NO SURFACE TELL: every word of the cards, the first word,
 *      the last word and the number of words, each sorts the cards no better than 75% (balanced accuracy, one kind
 *      against the rest); the three levels differ; another locale refuses; record pages carry no answer; numbers within
 *      1,000 (years are dates); no "free".
 *   3. RENDER (the print pipeline), every type x level, 2 copies (1 with --quick): verify() (the Batch K, G1, SK, S1 and
 *      S2 page checks and the S3 checks: the map's inches on paper, the scale bar's true inch, labels clear of the places,
 *      the letters on land and on the same place on both maps, the drawn dots at each letter, the sites on their land,
 *      the timeline's ticks, columns with the same lines) and qa/lints.js clean; the stack. Then the LAYOUT SWEEP: the
 *      generator's own seeds 1..SEEDS, every DISTINCT page swapped into the rendered page and judged by its type's verify.
 *   4. POISONS: each check FAILS on a bank, a page or a set of pages spoiled for it; each page poison has a control that
 *      passes (the real page of the same type and level).
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const WG = path.join(__dirname, '..');
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const B = require(path.join(WG, 'data', 'social', 'dk-social-3.js'));
const GEO = require(path.join(WG, 'data', 'social', 'dk-social-3-geo.js'));
const ART = require(path.join(WG, 'types', '_shared', 'dk-social-3-art.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const NO_RENDER = process.argv.includes('--no-render');
const SEEDS = Number(arg('seeds', QUICK ? '60' : '400'));
const BIG = QUICK ? 300 : 2000;   // copies a level for the sort and match types (the surface measure)
const IDS = Array.from({ length: 18 }, (_, k) => 'G3-' + (612 + k));
const clone = (x) => JSON.parse(JSON.stringify(x));
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#8220;|&#8221;/g, '"');

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
const STOP = new Set(['the', 'and', 'for', 'from', 'with', 'your', 'you', 'not', 'are', 'its', 'on', 'at', 'in', 'do', 'a', 'an', 'to', 'of', 'is', 'it', 'they', 'them', 'that', 'what', 'who', 'when', 'was', 'has', 'have', 'their', 'there', 'but', 'his', 'her', 'she', 'he', 'one', 'all', 'even', 'about', 'other', 'people']);
const words = (t) => (t.toLowerCase().match(/[a-z']+/g) || []).map((w) => w.replace(/'s$/, '')).filter((w) => w.length >= 3 && !STOP.has(w));
const stem = (w) => w.replace(/(ness|ing|ed|es|s)$/, '').replace(/e$/, '');
/** two words of one root: the same stem, or one stem the start of the other (fair / fairness, honest / honesty, tell / telling) */
/** review round 2: the content words two texts share (stop words, "our" and "us" aside), by the stem rule below */
const sharedWords = (a, b) => { const ws = (t) => t.toLowerCase().replace(/[^a-z' ]+/g, ' ').split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w) && w !== 'our' && w !== 'us'); const B0 = ws(b); return [...new Set(ws(a).filter((w) => B0.some((v) => same(w, v))))]; };
const artOfPage = (html, k) => { const i = html.indexOf(`data-s3-art="${k}"`); return i < 0 ? '' : html.slice(i, html.indexOf('</svg>', i)); };
const same = (a, b) => { const x = stem(a), y = stem(b); return x === y || (Math.min(x.length, y.length) >= 4 && (x.startsWith(y) || y.startsWith(x))); };
const sentencesOf = (t) => t.split(/(?<=[.!?])\s+/).filter(Boolean);
const wc = (s) => (s.match(/[A-Za-z0-9'-]+/g) || []).length;
const MAX_WORDS = 15;
/** G3-612: the virtue each situation calls for, and the other virtues a child could still defend for it (read one by
 *  one, every virtue tried on every situation) */
const VIRTUE_OWN = { spill: 'honesty', race: 'honesty', prize: 'honesty', language: 'respect', lunch: 'respect', idea: 'respect', plant: 'responsibility', markers: 'responsibility', fish: 'responsibility', computer: 'fairness', crackers: 'fairness', ball: 'fairness', bus: 'courage', snack: 'courage', alone: 'courage' };
const ALSO_OWN = { spill: ['courage', 'responsibility'], race: ['courage', 'fairness'], prize: ['fairness', 'respect'], language: [], lunch: [], idea: ['fairness'], plant: [], markers: ['honesty'], fish: ['honesty'], computer: [], crackers: [], ball: [], bus: ['respect'], snack: ['fairness', 'respect'], alone: ['respect', 'fairness'] };
const VIRTUES_OWN = ['honesty', 'respect', 'responsibility', 'fairness', 'courage'];
/** G3-613 (the brief's facts) */
const CONSTITUTION_OWN = { words: 'We the People of the United States', date: 'September 17, 1787', freedoms: ['speech', 'religion', 'press'] };
/** G3-614: what each column of the chart wants, by the gate's reading of each story (the words must be in the story) */
const CHANGE_OWN = { vote: { who: 'women and men', did: ['speeches', 'letters', 'marched'], changed: 'right to vote', facts: ['19th Amendment', '1920', 'more than 70 years'] }, ada: { who: 'people with disabilities', did: ['spoke out', 'wrote to Congress', 'marched'], changed: 'ramps, wide doors and fair hiring', facts: ['1990', 'Americans with Disabilities Act'] }, crosswalk: { who: 'neighbors', did: ['signatures', 'city council meeting'], changed: 'crosswalk was painted', facts: ['sample town'] } };
/** G3-615: the map that answers each question */
const COMPARE_OWN = { streets: 'town', cities: 'state', land: 'state', buildings: 'town' };
const PX_IN = 96, PRINT_SCALE = 0.97;
/** fix round 1: the town's streets (inches): up-down at SX, cross at SY; the places' dots sit on SY_OWN */
const SX_OWN = [0.25, 1.25, 2.25, 3.25, 4.25], SY_OWN = [1.25, 2.25];
const streetOwn = (a, b) => (Math.abs(a.y - b.y) < 1e-9 && [0.25, ...SY_OWN].includes(a.y) ? 'y' + a.y : Math.abs(a.x - b.x) < 1e-9 && SX_OWN.includes(a.x) ? 'x' + a.x : null);
/** G3-617: many or few people at each kind of place (the brief); the dots re-counted here from the drawn dots */
const LIVE_OWN = { atlantic: 'many', lakes: 'many', desert: 'few', mountains: 'few' };
const MANY_MIN = 60, FEW_MAX = 12;
/** fix round 1: a many letter's circle touches no mountain or desert shading; a few letter's circle lies wholly in its own */
const LETTER_R = 23;
const circleOk = (geo, p) => { const pts = [[p.x, p.y], ...Array.from({ length: 48 }, (_, i) => [p.x + LETTER_R * Math.cos(i * Math.PI / 24), p.y + LETTER_R * Math.sin(i * Math.PI / 24)])]; return LIVE_OWN[p.kind] === 'many' ? pts.every(([a, c]) => !inD(a, c, geo.regions.mountains) && !inD(a, c, geo.regions.desert)) : pts.every(([a, c]) => inD(a, c, geo.regions[LANDFORM_OWN[p.kind]])); };
const LANDFORM_OWN = { desert: 'desert', mountains: 'mountains' };
/** G3-618 */
const SITE_OWN = { river: { offers: ['water', 'soil'], poor: false }, dry: { offers: [], poor: true }, harbor: { offers: ['harbor'], poor: false } };
/** G3-619 (the brief's levels) */
const LEVEL_OWN = { mayor: 'local', council: 'local', park: 'local', fire: 'local', trash: 'local', governor: 'state', legislature: 'state', highway: 'state', license: 'state', president: 'national', congress: 'national', mail: 'national', natpark: 'national', money: 'national' };
/** G3-620 (the brief's branches) */
const BRANCH_OWN = { congress: 'legislative', makes: 'legislative', statelaw: 'legislative', president: 'executive', carries: 'executive', governor: 'executive', supreme: 'judicial', decides: 'judicial', statecourt: 'judicial' };
/** G3-621: the level that collects the taxes for each service (and the word that names the level in its name) */
const TAX_OWN = { firetruck: 'local', books: 'local', trash: 'local', license: 'state', patrol: 'state', soldiers: 'national', astronauts: 'national' };
/** review round 2: the five big East Coast cities (real places, the gate's own coordinates): no mountain or desert
 *  shading within a letter's circle of any of them on the land map */
const CITIES_OWN = { 'new-york': [-74.006, 40.7128], philadelphia: [-75.1652, 39.9526], boston: [-71.0589, 42.3601], baltimore: [-76.6122, 39.2904], washington: [-77.0369, 38.9072] };
/** the Albers equal-area projection (the US national atlas), the gate's own: the module gives only its frame's numbers */
function albersOwn(F, lon, lat) { const D = Math.PI / 180, n = (Math.sin(F.lat1 * D) + Math.sin(F.lat2 * D)) / 2, C0 = Math.cos(F.lat1 * D) ** 2 + 2 * n * Math.sin(F.lat1 * D), r0 = Math.sqrt(C0 - 2 * n * Math.sin(F.lat0 * D)) / n, r = Math.sqrt(C0 - 2 * n * Math.sin(lat * D)) / n, t = n * (lon - F.lon0) * D; return [(r * Math.sin(t) - F.minX) * F.uk, (-(r0 - r * Math.cos(t)) - F.minY) * F.uk]; }
/** review round 2: what a G3-621 level-1 page prints beside the services (labels, word box, captions): no service shares a
 *  word with any of it (a shared word sorts the card without knowing its level) */
const TAX_PAGE_WORDS_OWN = ['local: our town', 'state: our state', 'national: our country', 'Word box (use each word one time): local state national', 'People and businesses pay taxes.', 'Each level of government collects its own taxes.'];
/** fix round 1: no level-1 service prints a level word (the child knows the level; never copies it) */
const LEVEL_WORDS = /(?<![a-z])(local|town|city|state|national|nation|federal|government)(?![a-z])/i;
/** G3-622 */
const DECIDE_OWN = { class: { who: 'the students', how: 'the choice with the most votes wins' }, council: { who: 'the council members', how: 'the council members vote' }, election: { who: 'citizens 18 and older', how: 'the person with the most votes wins' } };
/** G3-623 */
const CARRY_OWN = 'workers';
/** G3-624 */
const SOURCE_OWN = { diary: 'primary', photo: 'primary', letter: 'primary', map: 'primary', newspaper: 'primary', textbook: 'secondary', encyclopedia: 'secondary', museum: 'secondary' };
/** G3-625: the design's dates and the ONLY pairs within five years (one event on each timeline) */
const DATE_OWN = { school: ['town', 1870], station: ['town', 1885], library: ['town', 1920], road: ['town', 1930], railroad: ['us', 1869], flight: ['us', 1903], vote: ['us', 1920] };
const PAIRS_OWN = ['railroad|school', 'library|vote'];
const pairsWithin = (ids) => { const out = []; for (const a of ids) for (const b of ids) { if (a >= b) continue; if (DATE_OWN[a][0] !== DATE_OWN[b][0] && Math.abs(DATE_OWN[a][1] - DATE_OWN[b][1]) <= 5) out.push([a, b].sort().join('|')); } return out.sort(); };
/** G3-627 */
const RES_OWN = { wheat: 'natural', water: 'natural', salt: 'natural', skill: 'human', cashier: 'human', oven: 'capital', mixer: 'capital', van: 'capital', building: 'capital' };
/** G3-628: each cause and its effect; two causes a child could argue over (a railroad brings families too) */
const CAUSE_OWN = { railroad: 'Farmers shipped crops to cities.', flood: 'Houses were built on the hill.', opened: 'Many families moved in.', closed: 'Many families moved away.' };
const CAUSE_CONFUSE_OWN = [['railroad', 'opened'], ['flood', 'closed']];
const SURFACE_MAX = 0.75;
/** the words the BRIEF requires a card to carry (every service names its one level: "say 'a city street' or 'a state
 *  highway'"): measured and printed, never failed */
const SURFACE_REQUIRED = {};
const HEX = /#[0-9A-Fa-f]{6}\b/g;
/** ring parsing for the gate's own point-in-region tests */
const ringsOf = (d) => d.split(/Z/).map((p) => [...p.matchAll(/(-?[0-9.]+),(-?[0-9.]+)/g)].map((m) => [+m[1], +m[2]])).filter((r) => r.length >= 3);
const inRing = (x, y, r) => { let c = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const inD = (x, y, d) => ringsOf(d).some((r) => inRing(x, y, r));
const dotsNear = (geo, x, y) => geo.dots.filter(([a, b]) => Math.hypot(a - x, b - y) <= geo.PLACE_R).length;
const nearLine = (x, y, d, R) => ringsOf(d + 'Z').some((r) => r.some((p, i) => i && segDist(x, y, r[i - 1], p) <= R));
function segDist(x, y, a, b) { const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy; const t = L ? Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / L)) : 0; return Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy); }

/* ================================================================ 1. the bank */
/** a word every definition says is no cue to any one of them */
const everyDef = (defs, w) => Object.values(defs).every((d) => words(d).some((x) => same(x, w)));
function bankFaults(b, art = ART, geo = GEO) {
  const f = [];
  // civic virtues
  const vids = b.VIRTUES.map((v) => v.id);
  if (vids.slice().sort().join() !== VIRTUES_OWN.slice().sort().join()) f.push(`the virtues are ${vids.join(', ')}`);
  for (const x of b.SITUATIONS) {
    if (VIRTUE_OWN[x.id] !== x.virtue) f.push(`situation ${x.id}: the bank says ${x.virtue} (the gate: ${VIRTUE_OWN[x.id] || 'no ruling'})`);
    if (ALSO_OWN[x.id] && (x.also || []).slice().sort().join() !== ALSO_OWN[x.id].slice().sort().join()) f.push(`situation ${x.id}: the other defensible virtues are ${(x.also || []).join(', ') || 'none'} (the gate: ${ALSO_OWN[x.id].join(', ') || 'none'})`);
    for (const s of sentencesOf(x.text)) if (wc(s) > MAX_WORDS) f.push(`situation ${x.id}: "${s}" has ${wc(s)} words`);
    for (const v of b.VIRTUES) for (const w of words(x.text)) for (const vw of [...words(v.word), ...words(v.means), ...words(v.id)]) if (same(w, vw)) f.push(`situation ${x.id} shares "${w}" with the virtue ${v.id} or what it means (a word match, not a reason)`);
  }
  for (const v of VIRTUES_OWN) if (b.SITUATIONS.filter((x) => x.virtue === v).length < 2) f.push(`the virtue ${v} has fewer than two situations`);
  // the Constitution
  if (b.CONSTITUTION_WORDS !== CONSTITUTION_OWN.words) f.push(`the first words are "${b.CONSTITUTION_WORDS}"`);
  if (!b.CONSTITUTION_SAYS.some((s) => s.includes(CONSTITUTION_OWN.date))) f.push('the panel does not say it was signed on September 17, 1787');
  if (b.FREEDOMS.map((x) => x.id).join() !== CONSTITUTION_OWN.freedoms.join()) f.push('the freedoms are not speech, religion and the press');
  for (const s of b.CONSTITUTION_SAYS) if (wc(s) > MAX_WORDS) f.push(`"${s}" has ${wc(s)} words`);
  // changing laws
  for (const c of b.CHANGES) {
    const o = CHANGE_OWN[c.id]; if (!o) { f.push(`change ${c.id}: no ruling`); continue; }
    const t = c.text.join(' ');
    for (const s of c.text) if (wc(s) > MAX_WORDS) f.push(`change ${c.id}: "${s}" has ${wc(s)} words`);
    for (const k of o.facts) if (!t.includes(k)) f.push(`change ${c.id}: the story does not say "${k}"`);
    if (c.who !== o.who) f.push(`change ${c.id}: who wanted it is "${c.who}" (the gate: ${o.who})`);
    if (!t.toLowerCase().includes(o.who.toLowerCase().replace(/^women and men$/, 'women and men'))) f.push(`change ${c.id}: the story does not name who (${o.who})`);
    for (const k of o.did) if (!t.includes(k) || !c.did.includes(k.replace('city council meeting', 'city council meeting'))) f.push(`change ${c.id}: "${k}" is not both in the story and in what they did`);
    if (!c.changed.includes(o.changed.split(' ')[0]) || !t.includes(o.changed.split(',')[0].split(' was')[0])) f.push(`change ${c.id}: what changed ("${c.changed}") is not the story's`);
  }
  // the map scale
  for (const c of b.SCALE_COMPARE) if (COMPARE_OWN[c.id] !== c.map) f.push(`compare ${c.id}: the bank says the ${c.map} map (the gate: ${COMPARE_OWN[c.id]})`);
  // where people live: the places are real; many / few re-counted from the drawn dots; the landform re-tested
  for (const [k, v] of Object.entries(b.LIVE_KINDS)) if (LIVE_OWN[k] !== v.people) f.push(`live ${k}: ${v.people} people (the gate: ${LIVE_OWN[k]})`);
  for (const p of geo.places) {
    const n = dotsNear(geo, p.x, p.y), want = LIVE_OWN[p.kind];
    if (want === 'many' && n < MANY_MIN) f.push(`the place ${p.id}: ${n} dots near it (many people: at least ${MANY_MIN})`);
    if (want === 'few' && n > FEW_MAX) f.push(`the place ${p.id}: ${n} dots near it (few people: at most ${FEW_MAX})`);
    if (!inD(p.x, p.y, geo.US.d)) f.push(`the place ${p.id} is not in the lower 48`);
    if (!circleOk(geo, p)) f.push(`the place ${p.id}: its letter's circle ${want === 'many' ? 'touches mountain or desert shading (a child reads few people)' : 'leaves its own ' + LANDFORM_OWN[p.kind] + ' shading'}`);
    if (LANDFORM_OWN[p.kind] && !inD(p.x, p.y, geo.regions[LANDFORM_OWN[p.kind]])) f.push(`the place ${p.id} is not in the ${LANDFORM_OWN[p.kind]} drawn on the land map`);
    if (p.kind === 'lakes' && !Object.values(geo.lakes).some((d) => ringsOf(d).some((r) => r.some(([a, c]) => Math.hypot(a - p.x, c - p.y) < 30)))) f.push(`the place ${p.id} is not by a Great Lake`);
    if (p.kind === 'atlantic' && !ringsOf(geo.US.d).some((r) => r.some(([a, c]) => a > 800 && Math.hypot(a - p.x, c - p.y) < 30))) f.push(`the place ${p.id} is not on the Atlantic coast`);
  }
  for (const k of Object.keys(LIVE_OWN)) if (geo.places.filter((p) => p.kind === k).length < 2) f.push(`fewer than two places for ${k}`);
  // review round 2: New York City, Philadelphia, Boston, Baltimore and Washington are drawn on low land: no mountain or
  // desert shading within a letter's circle of any of them (projected by the gate itself), each on the drawn land
  if (!geo.FRAME) f.push('the geo module gives no frame (the city check would measure nothing)');
  else for (const [cid, [lo, la]] of Object.entries(CITIES_OWN)) {
    const [x, y] = albersOwn(geo.FRAME, lo, la), m = (geo.CITIES || []).find((c) => c.id === cid);
    if (!m || Math.hypot(m.x - x, m.y - y) > 0.3) f.push(`the city ${cid}: the module puts it at ${m && m.x},${m && m.y} (the gate: ${x.toFixed(1)},${y.toFixed(1)})`);
    if (!inD(x, y, geo.US.d) && !ringsOf(geo.US.d).some((r) => r.some((q, i) => i && segDist(x, y, r[i - 1], q) <= 4))) f.push(`the city ${cid} is not on the land drawn`);
    const pts = [[x, y], ...Array.from({ length: 48 }, (_, i) => [x + LETTER_R * Math.cos(i * Math.PI / 24), y + LETTER_R * Math.sin(i * Math.PI / 24)])];
    if (pts.some(([a, c]) => inD(a, c, geo.regions.mountains) || inD(a, c, geo.regions.desert)) || ringsOf(geo.regions.mountains + ' ' + geo.regions.desert).some((r) => r.some(([a, c]) => Math.hypot(a - x, c - y) <= LETTER_R))) f.push(`the city ${cid} has mountain or desert shading within a letter's circle (many people would read as in the mountains)`);
  }
  // towns grow
  for (const s of b.TOWN_SITES) { const o = SITE_OWN[s.id]; if (!o) { f.push(`site ${s.id}: no ruling`); continue; } if (o.poor !== s.poor || o.offers.slice().sort().join() !== s.offers.slice().sort().join()) f.push(`site ${s.id}: offers ${s.offers.join(',')} / poor ${s.poor} (the gate: ${o.offers.join(',')} / ${o.poor})`); }
  // levels and branches and taxes
  for (const c of b.LEVEL_CARDS) { if (LEVEL_OWN[c.id] !== c.level) f.push(`card ${c.id}: the bank says ${c.level} (the gate: ${LEVEL_OWN[c.id] || 'no ruling'})`); if (/[A-Z][a-z]+ [A-Z][a-z]+/.test(c.word.replace('Congress', ''))) f.push(`card ${c.id}: "${c.word}" names a person (every leader is a role)`); }
  for (const lv of ['local', 'state', 'national']) if (b.LEVEL_CARDS.filter((c) => c.level === lv && c.kind === 'service').length < 2 || b.LEVEL_CARDS.filter((c) => c.level === lv && c.kind === 'leader').length !== 2) f.push(`the ${lv} level has not two leaders and two or more services`);
  if (/\b(road|repaired)\b/.test(b.LEVEL_CARDS.map((c) => c.word).join(' '))) f.push('a level card says "road" without its level');
  for (const c of b.BRANCH_CARDS) if (BRANCH_OWN[c.id] !== c.branch) f.push(`branch card ${c.id}: ${c.branch} (the gate: ${BRANCH_OWN[c.id] || 'no ruling'})`);
  for (const x of b.TAX_SERVICES) { if (TAX_OWN[x.id] !== x.level) f.push(`tax ${x.id}: ${x.level} (the gate: ${TAX_OWN[x.id] || 'no ruling'})`); if (LEVEL_WORDS.test(x.word)) f.push(`tax ${x.id}: "${x.word}" prints a level word (level 1 must not)`); if (/\bmail\b/i.test(x.word)) f.push(`tax ${x.id}: the mail is paid by stamps, not taxes`); }
  // review round 2: the state keeps one service by the fix brief's ruling (the driver's license left: a fee pays for it);
  // local and national keep two or more
  for (const lv of ['local', 'state', 'national']) if (b.TAX_SERVICES.filter((x) => x.level === lv).length < (lv === 'state' ? 1 : 2)) f.push(`the ${lv} level has too few services`);
  for (const x of b.TAX_SERVICES) if (/licen[cs]e|stamp|\bmail\b|\bfee\b/i.test(x.word)) f.push(`tax ${x.id}: "${x.word}" is paid by a fee, not by taxes`);
  for (const x of b.TAX_SERVICES) { const shared = sharedWords(x.word, TAX_PAGE_WORDS_OWN.join(' ')); if (shared.length) f.push(`tax ${x.id}: "${x.word}" shares ${shared.join(', ')} with the page's labels (a word tell)`); }
  // ways to decide
  for (const w of b.DECIDE_WAYS) { const o = DECIDE_OWN[w.id]; if (!o) { f.push(`way ${w.id}: no ruling`); continue; } if (w.who !== o.who) f.push(`way ${w.id}: who decides is "${w.who}" (the gate: ${o.who})`); const t = w.text.join(' '); if (!t.includes(w.who.replace(/^the /, ''))) f.push(`way ${w.id}: who decides is not in the text`); for (const s of w.text) if (wc(s) > MAX_WORDS) f.push(`way ${w.id}: "${s}" has ${wc(s)} words`); }
  if (!b.DECIDE_WAYS.find((w) => w.id === 'election').text.join(' ').includes('18 and older')) f.push('the election text does not say citizens 18 and older vote');
  // fix round 1: the election says who wins; "how" is the rule (three different), "say" what one person does
  if (!/most votes wins/.test(b.DECIDE_WAYS.find((w) => w.id === 'election').text.join(' '))) f.push('the election text does not say the person with the most votes wins');
  // review round 2: "the person with the most votes wins" is never said of a president (the Electoral College): the
  // election names a mayor or a governor, and no president
  { const et = b.DECIDE_WAYS.find((w) => w.id === 'election').text.join(' '); if (!/\b(mayor|governor)\b/.test(et) || /president/i.test(et)) f.push('the election text does not name a mayor or a governor, or names a president (most votes does not always win for president)'); }
  for (const w of b.DECIDE_WAYS) if (DECIDE_OWN[w.id] && DECIDE_OWN[w.id].how !== w.how) f.push(`way ${w.id}: how they decide is "${w.how}" (the gate: ${DECIDE_OWN[w.id].how})`);
  const light = b.SOLUTIONS.find((x) => x.id === 'light'); if (!light || /all day long/.test(light.benefit) || !/whenever/.test(light.benefit)) f.push('the crossing light is said to stop cars all day long (it stops them when someone needs to cross)');
  // the community problem
  if ((b.CARRY_OUT.find((c) => c.right) || {}).id !== CARRY_OWN || b.CARRY_OUT.filter((c) => c.right).length !== 1) f.push('the one who carries out the plan is not city workers alone');
  for (const s of b.PROBLEM_TEXT) if (wc(s) > MAX_WORDS) f.push(`problem: "${s}" has ${wc(s)} words`);
  // sources
  for (const x of b.SOURCES) { if (SOURCE_OWN[x.id] !== x.kind) f.push(`source ${x.id}: ${x.kind} (the gate: ${SOURCE_OWN[x.id] || 'no ruling'})`); if (wc(x.word + ' ' + x.about) > MAX_WORDS) f.push(`source ${x.id}: ${wc(x.word + ' ' + x.about)} words`); for (const k of ['primary', 'secondary']) for (const w of words(x.word + ' ' + x.about)) for (const dw of words(b.SOURCE_DEFS[k])) if (same(w, dw) && !everyDef(b.SOURCE_DEFS, dw)) f.push(`source ${x.id} shares "${w}" with what a ${k} source is`); }
  if (b.SOURCE_SCHOOL_1900 !== 'diary' || !/1900/.test(b.SOURCES.find((x) => x.id === 'diary').about) || !/school/.test(b.SOURCES.find((x) => x.id === 'diary').about)) f.push('the source for school in 1900 is not the diary of 1900');
  // the timeline
  for (const e of b.TIMELINE_EVENTS) { const o = DATE_OWN[e.id]; if (!o || o[0] !== e.line || o[1] !== e.year) f.push(`event ${e.id}: ${e.line} ${e.year} (the gate: ${o && o.join(' ')})`); if (wc(e.word) > MAX_WORDS) f.push(`event ${e.id}: ${wc(e.word)} words`); }
  if (pairsWithin(b.TIMELINE_EVENTS.map((e) => e.id)).join() !== PAIRS_OWN.slice().sort().join()) f.push(`the pairs within five years are ${pairsWithin(b.TIMELINE_EVENTS.map((e) => e.id)).join(' ')} (the design: ${PAIRS_OWN.join(' ')})`);
  if (pairsWithin(b.TIMELINE_LEVEL1).join() !== PAIRS_OWN.slice().sort().join()) f.push('level 1 does not hold both pairs');
  // resources
  for (const x of b.RESOURCES) { if (RES_OWN[x.id] !== x.kind) f.push(`resource ${x.id}: ${x.kind} (the gate: ${RES_OWN[x.id] || 'no ruling'})`); for (const [k, d] of Object.entries(b.RESOURCE_DEFS)) for (const w of words(x.word)) for (const dw of words(d)) if (same(w, dw) && !everyDef(b.RESOURCE_DEFS, dw)) f.push(`resource ${x.id} shares "${w}" with what a ${k} resource is`); }
  // causes and effects
  for (const c of b.CAUSES) {
    if (CAUSE_OWN[c.id] !== c.effect) f.push(`cause ${c.id}: its effect is "${c.effect}" (the gate: ${CAUSE_OWN[c.id] || 'no ruling'})`);
    for (const w of words(c.cause)) for (const e of b.CAUSES) for (const ew of words(e.effect)) if (same(w, ew)) f.push(`the cause "${c.cause}" shares "${w}" with the effect "${e.effect}"`);
    const st = c.story.replace('{year}', '1900').replace('{town}', 'Town');
    for (const s of sentencesOf(st)) if (wc(s) > MAX_WORDS) f.push(`cause ${c.id}: "${s}" has ${wc(s)} words`);
  }
  for (const [a, c] of CAUSE_CONFUSE_OWN) if (!b.CAUSE_CONFUSABLE.some(([x, y]) => (x === a && y === c) || (x === c && y === a))) f.push(`the ${a} / ${c} causes are not kept apart on level 1`);
  // the drawings and the maps
  const src = fs.readFileSync(path.join(WG, 'types', '_shared', 'dk-social-3-art.js'), 'utf8');
  const pal = new Set([...art.PAL3].map((c) => c.toUpperCase()));
  for (const h of new Set((src.match(HEX) || []).map((c) => c.toUpperCase()))) if (!pal.has(h)) f.push(`the drawings write ${h}, outside PAL3`);
  if (Object.keys(geo.SOURCES || {}).length < 5 || Object.values(geo.SOURCES || {}).some((h) => !/^[0-9a-f]{64}$/.test(h))) f.push('the maps carry no source hashes');
  return f;
}

/* ================================================================ 2. build sweep */
/** a page's stamps, read from the html */
function pageOf(r) {
  const h = r.bodyHtml;
  const divEnd = (str) => { let d = 0; const re = /<div\b|<\/div>/g; let m; while ((m = re.exec(str))) { if (m[0] === '</div>') { d--; if (d === 0) return m.index; } else d++; } return str.length; };
  const groups = h.split(/(?=<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item=")/).slice(1).map((seg) => { const id = /data-dk-item="([^"]+)"/.exec(seg)[1]; const body = seg.slice(0, divEnd(seg)); const choices = [...body.matchAll(/<span class="s3-pick"[^>]*data-s3-pick="([^"]+)" data-dk-answer="([^"]+)"[^>]*>/g)].map((m) => [dec(m[1]), m[2], (/data-s3-(people|map|site|resource|carry)="([^"]+)"/.exec(m[0]) || [])[2]]); return { id, choices }; });
  const stamps = [...h.matchAll(/data-s3-([a-z-]+)="([^"]*)"(?: [^>]*?)?data-dk-answer="([^"]*)"/g)].map((m) => [m[1], dec(m[2]), dec(m[3])]);
  const lefts = [...h.matchAll(/data-s1-key="([^"]+)" data-dk-answer="([^"]+)"/g)].map((m) => [m[1], m[2]]);
  const rights = [...h.matchAll(/data-s1-key="([^"]+)" data-s1-right="1"/g)].map((m) => m[1]);
  const skins = [...h.matchAll(/data-sk-skin="(s\d)"/g)].map((m) => m[1]);
  const text = dec(h.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  return { meta: r.meta, groups, stamps, lefts, rights, skins, html: h, text };
}
const st = (p, kind) => p.stamps.filter((s) => s[0] === kind);
function bandFaults(what, counts, total, expect, minTol) { const f = []; counts.forEach((c, i) => { const s = c / total, tol = Math.max(minTol, 3 * Math.sqrt(expect[i] * (1 - expect[i]) / total)); if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds it ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); }); return f; }
const rightOf = (g) => g && g.choices.find((c) => c[1] === 'right');
const matchCount = (allowed, answers) => { let n = 0; const used = new Set(); const walk = (i) => { if (i === allowed.length) { n++; return; } for (const a of answers) if (allowed[i].includes(a) && !used.has(a)) { used.add(a); walk(i + 1); used.delete(a); } }; walk(0); return n; };
const half = (v) => Math.round(v * 2) / 2;
const fmtOwn = (v) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : Math.floor(v) ? Math.floor(v) + ' 1/2' : '1/2');
const RECORD = (id, lv) => ['G3-616', 'G3-626', 'G3-629'].includes(id) || (id === 'G3-613' && lv > 1) || (id === 'G3-621' && lv > 1) || (id === 'G3-623' && lv < 3);

/** the stamps a page carries agree with the gate's own tables */
function answerFaults(id, lv, p) {
  const f = [], h = p.html;
  const record = RECORD(id, lv);
  if (record && /data-dk-answer=/.test(h)) f.push(`${id} L${lv}: a record page carries an answer`);
  if (!record && !/data-dk-answer=/.test(h)) f.push(`${id} L${lv}: a closed page carries no answer`);
  for (const g of p.groups) { const r = g.choices.filter((c) => c[1] === 'right'); if (r.length !== 1) f.push(`${id}: ${g.id} has ${r.length} right choices`); }
  if (id === 'G3-612') {
    const w = st(p, 'write'), box = [...h.matchAll(/data-s3-virtue="([a-z]+)"/g)].map((m) => m[1]);
    for (const [, sid, a] of w) if (VIRTUE_OWN[sid] !== a) f.push(`${id}: ${sid} stamped ${a} (the gate: ${VIRTUE_OWN[sid]})`);
    if (w.length !== (lv === 1 ? 3 : 5)) f.push(`${id}: ${w.length} situations (level ${lv})`);
    if (box.slice().sort().join() !== w.map((s) => VIRTUE_OWN[s[1]]).sort().join()) f.push(`${id}: the word box (${box.join(',')}) is not the situations' virtues once each`);
    if (lv === 1) for (const [, sid] of w) for (const a of ALSO_OWN[sid]) if (box.includes(a)) f.push(`${id} L1: ${sid} could also be ${a}, which is in the word box`);
    { const n = matchCount(w.map((s) => [VIRTUE_OWN[s[1]], ...ALSO_OWN[s[1]]]), box); if (n !== 1) f.push(`${id} L${lv}: ${n} ways to give the situations their words (one)`); }
    if (box.join() === w.map((s) => VIRTUE_OWN[s[1]]).join()) f.push(`${id}: the word box lists the virtues in the situations' order`);
  }
  if (id === 'G3-613' && lv === 1) { const want = CONSTITUTION_OWN.freedoms.map((x) => x + '>pic-' + x).sort().join(); if (p.lefts.map((l) => l[0] + '>' + l[1]).sort().join() !== want) f.push(`${id} L1: the freedoms do not each go to their own picture`); if (p.rights.slice().sort().join() !== CONSTITUTION_OWN.freedoms.map((x) => 'pic-' + x).sort().join()) f.push(`${id} L1: the pictures are not the three freedoms'`); }
  if (id === 'G3-614') { for (const [, cell, a] of st(p, 'cell')) { const [cid, k] = cell.split(':'); const o = CHANGE_OWN[cid]; const want = k === 'who' ? o.who : k === 'did' ? o.did : o.changed; if (k === 'did' ? !want.every((x) => a.includes(x)) : !a.includes(want.split(',')[0])) f.push(`${id}: the ${cid} ${k} cell stamped "${a}"`); } const n = (lv === 1 ? 1 : 3) * 3 - (lv === 1 ? 1 : 0); if (st(p, 'cell').length !== n) f.push(`${id}: ${st(p, 'cell').length} cells to fill (level ${lv}: ${n})`); }
  if (id === 'G3-615') {
    const pos = p.meta.pos, ds = st(p, 'pair');
    if (ds.length !== (lv === 2 ? 4 : 3)) f.push(`${id}: ${ds.length} distances (level ${lv})`);
    for (const [, pr, a] of ds) {
      const [x, y] = pr.split('|'), A0 = pos[x], B0 = pos[y], d = Math.hypot(A0.x - B0.x, A0.y - B0.y);
      if (!streetOwn(A0, B0)) f.push(`${id}: ${x} and ${y} are not along one street (no pair runs across a block)`);
      if (fmtOwn(d) !== a) f.push(`${id}: ${x} to ${y} is ${d} inches, stamped ${a}`);
      if (lv === 1 && Math.abs(d - Math.round(d)) > 1e-9) f.push(`${id} L1: ${x} to ${y} is not a whole inch (${d})`);
      if (Math.abs(d * 2 - Math.round(d * 2)) > 1e-9) f.push(`${id}: ${x} to ${y} is not a whole or half inch (${d})`);
      const printed = d * PRINT_SCALE, round = lv === 1 ? Math.round(printed) : half(printed);
      if (Math.abs(round - d) > 1e-9) f.push(`${id}: ${x} to ${y} printed at 97% measures ${printed.toFixed(2)} inches, which rounds to ${round}, not ${d}`);
      if (d > 4.75 || d < 0.99) f.push(`${id}: ${x} to ${y} is ${d} inches (1 to 4 1/2)`);
    }
    if (lv === 2 && !ds.some((s) => s[2].includes('1/2'))) f.push(`${id} L2: no half-inch distance`);
    for (const [pid, q0] of Object.entries(pos)) if (!SY_OWN.includes(q0.y)) f.push(`${id}: the ${pid}'s dot is not on a cross street (${q0.y} in)`);
    const ids = Object.keys(pos); for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) if (Math.hypot(pos[ids[i]].x - pos[ids[j]].x, pos[ids[i]].y - pos[ids[j]].y) < 1 - 1e-9) f.push(`${id}: ${ids[i]} and ${ids[j]} less than an inch apart`);
    for (const g of p.groups) { const r = rightOf(g); if (!r || r[2] !== COMPARE_OWN[g.id]) f.push(`${id}: "${g.id}" stamped the ${r && r[2]} map (the gate: ${COMPARE_OWN[g.id]})`); }
    if (p.groups.length !== 2 || new Set(p.groups.map((g) => COMPARE_OWN[g.id])).size !== 2) f.push(`${id}: the map questions are not one answered by each map`);
    const tf = st(p, 'tripfirst'), tl = st(p, 'triplen');
    if (lv === 3) {
      const m = /From the school to the ([a-z ]+) and the ([a-z ]+):/.exec(p.text); const W2 = Object.fromEntries(B.SCALE_PLACES.map((x) => [x.word, x.id]));
      if (!m) f.push(`${id} L3: no trip`); else { const a = W2[m[1]], c = W2[m[2]], S0 = pos.school; const sa = Math.hypot(S0.x - pos[a].x, S0.y - pos[a].y), sc = Math.hypot(S0.x - pos[c].x, S0.y - pos[c].y), ac = Math.hypot(pos[a].x - pos[c].x, pos[a].y - pos[c].y); const first = sa < sc ? a : c, len = Math.min(sa, sc) + ac; if (Math.abs(sa - sc) < 0.49) f.push(`${id} L3: the two orders of the trip are about as long`); const st0 = streetOwn(pos.school, pos[a]); if (!st0 || streetOwn(pos.school, pos[c]) !== st0 || streetOwn(pos[a], pos[c]) !== st0) f.push(`${id} L3: the trip's school, ${a} and ${c} are not on one street (a leg runs across a block)`); if (Math.min(sa, sc) + ac < 2 - 1e-9) f.push(`${id} L3: the trip is under 2 miles ("miles" would break)`); if (!tf.length || tf[0][2] !== first) f.push(`${id} L3: the trip's first stop stamped ${tf[0] && tf[0][2]} (the gate: ${first})`); if (!tl.length || tl[0][2] !== fmtOwn(len)) f.push(`${id} L3: the trip stamped ${tl[0] && tl[0][2]} miles (the gate: ${fmtOwn(len)})`); for (const v of [sa, sc, ac]) if (Math.abs(v * 2 - Math.round(v * 2)) > 1e-9) f.push(`${id} L3: a leg of the trip is ${v} inches`);
        // review round 2: the school sits BETWEEN the two places (one on each side): the order matters and the length is
        // added up (near + near + far), never a distance the page already asks; every leg rounds right at 97%
        const side = (q0) => (st0 && st0[0] === 'y' ? q0.x - S0.x : q0.y - S0.y); if (!(side(pos[a]) * side(pos[c]) < 0)) f.push(`${id} L3: the school is not between the ${a} and the ${c} (the trip is one straight distance)`);
        if (ds.some(([, , v0]) => v0 === fmtOwn(len))) f.push(`${id} L3: the trip's length (${fmtOwn(len)}) is a distance the page already asks`);
        for (const v of [sa, sc, ac]) { const pr0 = half(v * PRINT_SCALE); if (Math.abs(pr0 - v) > 1e-9) f.push(`${id} L3: a leg of ${v} inches printed at 97% rounds to ${pr0}`); } }
    } else if (tf.length || tl.length) f.push(`${id}: a trip below level 3`);
  }
  if (id === 'G3-617') { for (const g of p.groups) { const L0 = g.id, pl = GEO.places.find((x) => x.id === (p.meta.places[L0.charCodeAt(0) - 65])); const r = rightOf(g); if (!pl) { f.push(`${id}: no place for ${L0}`); continue; } if (!r || r[2] !== LIVE_OWN[pl.kind]) f.push(`${id}: the letter ${L0} (${pl.id}) stamped ${r && r[2]} (the gate: ${LIVE_OWN[pl.kind]})`); } if (p.groups.length !== (lv === 1 ? 2 : 4)) f.push(`${id}: ${p.groups.length} letters (level ${lv})`); if (new Set(p.meta.places.map((x) => GEO.places.find((y) => y.id === x).kind)).size !== p.meta.places.length) f.push(`${id}: two letters on one kind of place`); }
  if (id === 'G3-618') {
    const sites = p.meta.sites, byL = Object.fromEntries(Object.entries(sites).map(([k, v]) => [v, k]));
    if (lv === 1) { const g = p.groups.find((x) => x.id === 'better'), r = rightOf(g); if (!r || SITE_OWN[byL[r[2]]].poor) f.push(`${id} L1: the better site stamped ${r && r[2]}`); const g2 = p.groups.find((x) => x.id === 'resource'), r2 = rightOf(g2), good = byL[r && r[2]]; if (!r2 || !SITE_OWN[good] || !SITE_OWN[good].offers.includes(r2[2])) f.push(`${id} L1: the resource stamped ${r2 && r2[2]} is not at the better site`); for (const c of (g2 ? g2.choices : [])) if (c[1] === 'no' && SITE_OWN[good] && SITE_OWN[good].offers.includes(c[2])) f.push(`${id} L1: the wrong choice ${c[2]} is at the better site too`); if (Object.keys(sites).length !== 2 || !sites.dry) f.push(`${id} L1: not the dry site and one good site`); }
    else {
      const rk = st(p, 'worst'); if (rk.length !== 1 || byL[rk[0][2]] !== 'dry') f.push(`${id} L${lv}: the worst site stamped ${rk.map((x) => x[2]).join(',') || 'nowhere'}`);
      const of = st(p, 'offer'); if (of.map((x) => x[1]).join('') !== 'ABC') f.push(`${id} L${lv}: what each site has is asked for ${of.map((x) => x[1]).join('') || 'no site'} (every site, in letter order: naming only the good ones gives the worst away)`);
      for (const [, L0, a] of of) { const own = SITE_OWN[byL[L0]]; if (own.poor ? a !== 'none' : own.offers.slice().sort().join() !== a.split(',').sort().join()) f.push(`${id}: site ${L0} has ${a} (the gate: ${own.poor ? 'none' : own.offers})`); }
      if (/Site [A-C] is the worst|Number the sites/.test(p.text)) f.push(`${id} L${lv}: the page names the worst site, or asks for an order of the two good sites`);
      if (Object.keys(sites).length !== 3) f.push(`${id} L${lv}: not three sites`);
    }
  }
  if (id === 'G3-619') { const c = st(p, 'card'); for (const [, x, a] of c) if (LEVEL_OWN[x] !== a) f.push(`${id}: ${x} stamped ${a} (the gate: ${LEVEL_OWN[x]})`); if (c.length !== (lv === 1 ? 6 : 12)) f.push(`${id}: ${c.length} cards`); if (lv > 1) for (const L0 of ['local', 'state', 'national']) if (c.filter((x) => x[2] === L0).length !== 4) f.push(`${id} L${lv}: ${c.filter((x) => x[2] === L0).length} ${L0} cards (4 each, the columns' lines)`); if (lv === 1 && c.some((x) => !['mayor', 'council', 'governor', 'legislature', 'president', 'congress'].includes(x[1]))) f.push(`${id} L1: a service among the leaders`); const sw = st(p, 'swingwrite'); if ((lv === 3) !== (sw.length === 1) || (sw.length && sw[0][2] !== 'local')) f.push(`${id} L${lv}: the broken swing stamped ${sw.map((x) => x[2])}`); }
  if (id === 'G3-620') { const c = st(p, 'bcard'); for (const [, x, a] of c) if (BRANCH_OWN[x] !== a) f.push(`${id}: ${x} stamped ${a} (the gate: ${BRANCH_OWN[x]})`); if (c.length !== (lv === 1 ? 6 : 9)) f.push(`${id}: ${c.length} cards`); }
  if (id === 'G3-621' && lv === 1) { const c = st(p, 'levelwrite'); for (const [, x, a] of c) if (TAX_OWN[x] !== a) f.push(`${id}: ${x} stamped ${a} (the gate: ${TAX_OWN[x]})`); if (c.map((x) => x[2]).sort().join() !== 'local,national,state') f.push(`${id} L1: the services are not one of each level`); }
  if (id === 'G3-622') { for (const [, cell, a] of st(p, 'cell')) { const [w, k] = cell.split(':'); const way = B.DECIDE_WAYS.find((x) => x.id === w); if (k === 'who' && a !== DECIDE_OWN[w].who) f.push(`${id}: ${w} who stamped "${a}"`); const tw = way ? words(way.text.join(' ')) : []; const miss = words(a).filter((x) => !tw.some((y) => same(x, y))); if (!way || miss.length) f.push(`${id}: the ${w} ${k} answer "${a}" says ${miss.join(', ')}, not in its text`); if (k === 'how') for (const o of B.DECIDE_WAYS) if (o.id !== w && o[k] === a) f.push(`${id}: the ${w} and ${o.id} ${k} answers are the same`); } }
  if (id === 'G3-623' && lv === 3) { const g = p.groups.find((x) => x.id === 'carry'), r = rightOf(g); if (!r || r[2] !== CARRY_OWN) f.push(`${id} L3: who carries out the plan stamped ${r && r[2]}`); }
  if (id === 'G3-624') { const c = st(p, 'source'); for (const [, x, a] of c) if (SOURCE_OWN[x] !== a) f.push(`${id}: ${x} stamped ${a} (the gate: ${SOURCE_OWN[x]})`); if (c.length !== (lv === 1 ? 4 : 8)) f.push(`${id}: ${c.length} sources`); if (lv === 1 && new Set(c.map((x) => x[2])).size !== 2) f.push(`${id} L1: the four sources are all of one kind`); const sw = st(p, 'schoolwrite'); if ((lv === 3) !== (sw.length === 1) || (sw.length && sw[0][2] !== 'diary')) f.push(`${id} L${lv}: the source for school in 1900 stamped ${sw.map((x) => x[2])}`); }
  if (id === 'G3-625') { const e = st(p, 'event'); for (const [, x, a] of e) if (a !== DATE_OWN[x].join(':')) f.push(`${id}: ${x} stamped ${a}`); if (pairsWithin(e.map((x) => x[1])).join() !== PAIRS_OWN.slice().sort().join()) f.push(`${id} L${lv}: the pairs within five years are ${pairsWithin(e.map((x) => x[1])).join(' ')} (the design: ${PAIRS_OWN.join(' ')})`); if (e.length !== (lv === 1 ? 4 : 7)) f.push(`${id}: ${e.length} events`); }
  if (id === 'G3-627') { const c = st(p, 'rcard'); for (const [, x, a] of c) if (RES_OWN[x] !== a) f.push(`${id}: ${x} stamped ${a} (the gate: ${RES_OWN[x]})`); if (c.length !== (lv === 1 ? 6 : 9)) f.push(`${id}: ${c.length} cards`); if (lv === 1) for (const k of ['natural', 'human', 'capital']) if (c.filter((x) => x[2] === k).length !== 2) f.push(`${id} L1: not two ${k} cards`); }
  if (id === 'G3-628') { for (const [l, a] of p.lefts) if (a !== 'eff-' + l) f.push(`${id}: ${l} matched to ${a}`); if (p.rights.slice().sort().join() !== p.lefts.map((c) => c[1]).sort().join()) f.push(`${id}: the effects are not the causes' partners, once each`); if (p.lefts.length !== (lv === 1 ? 2 : 4)) f.push(`${id}: ${p.lefts.length} causes`); if (lv === 1) for (const [a, c] of CAUSE_CONFUSE_OWN) if (p.lefts.some((x) => x[0] === a) && p.lefts.some((x) => x[0] === c)) f.push(`${id} L1: the ${a} and ${c} causes on one page`); const effects = [...h.matchAll(/data-s3-effect="([a-z]+)"[^>]*>([^<]+)</g)]; for (const m of effects) if (dec(m[2]) !== CAUSE_OWN[m[1]]) f.push(`${id}: the effect card of ${m[1]} says "${m[2]}"`); }
  return f;
}
/** the positional tells, pooled over a level's copies */
function tellFaults(id, lv, pages) {
  const f = [], tag = `${id} L${lv}`;
  const posBand = (what, seqs, classes, minTol = 0.05) => { const n = seqs[0].length, cnt = classes.map(() => Array(n).fill(0)), share = classes.map((c) => seqs.flat().filter((x) => x === c).length / (seqs.length * n)); for (const s of seqs) s.forEach((c, i) => cnt[classes.indexOf(c)][i]++); classes.forEach((c, k) => f.push(...bandFaults(`${tag} (${what}: ${c} at each place)`, cnt[k], seqs.length, Array(n).fill(share[k]), minTol))); };
  if (id === 'G3-612') { posBand('the virtue', pages.map((p) => st(p, 'write').map((s) => s[2])), VIRTUES_OWN); if (lv === 1) { const seen = {}; for (const p of pages) for (const v of p.box) seen[v] = (seen[v] || 0) + 1; for (const v of VIRTUES_OWN) if ((seen[v] || 0) / pages.length < 0.15) f.push(`${tag}: ${v} is on ${(100 * (seen[v] || 0) / pages.length).toFixed(1)}% of level-1 pages (at least 15%)`); } }
  if (id === 'G3-613' && lv === 1) { let straight = 0; for (const p of pages) p.lefts.forEach((c, i) => { if (p.rights[i] === c[1]) straight++; }); if (straight) f.push(`${tag}: a picture straight across on ${straight} rows`); }
  if (id === 'G3-615') { const pos = [0, 0]; let n = 0; for (const p of pages) for (const g of p.groups) { pos[g.choices.findIndex((c) => c[1] === 'right')]++; n++; } f.push(...bandFaults(`${tag} (the right map's place)`, pos, n, [0.5, 0.5], 0.05)); const vals = new Set(pages.flatMap((p) => st(p, 'pair').map((s) => s[2]))); if (vals.size < 3) f.push(`${tag}: the distances are only ${[...vals].join(', ')}`);
    // review round 2: the trip's length is not nearly always the same (a guess would be right)
    if (lv === 3) { const cnt = {}; for (const p of pages) { const t0 = st(p, 'triplen')[0]; if (t0) cnt[t0[2]] = (cnt[t0[2]] || 0) + 1; } const top0 = Math.max(0, ...Object.values(cnt)); if (!Object.keys(cnt).length) f.push(`${tag}: no trip lengths measured`); else if (top0 / pages.length > SURFACE_MAX) f.push(`${tag}: the trip is ${Object.keys(cnt).find((k) => cnt[k] === top0)} miles on ${(100 * top0 / pages.length).toFixed(1)}% of the copies (at most ${SURFACE_MAX * 100}%)`); } }
  if (id === 'G3-617') { posBand('many or few', pages.map((p) => p.groups.map((g) => rightOf(g)[2])), ['many', 'few']); if (lv === 1) { const sp = {}; for (const p of pages) { const k = p.groups.map((g) => rightOf(g)[2]).sort().join(); sp[k] = (sp[k] || 0) + 1; } if (Object.keys(sp).length < 3) f.push(`${tag}: the level-1 splits are only ${Object.keys(sp).join(' / ')}`); } }
  if (id === 'G3-618') { if (lv === 1) { const pos = [0, 0], rp = [0, 0, 0]; for (const p of pages) { pos[p.groups.find((g) => g.id === 'better').choices.findIndex((c) => c[1] === 'right')]++; rp[p.groups.find((g) => g.id === 'resource').choices.findIndex((c) => c[1] === 'right')]++; } f.push(...bandFaults(`${tag} (the better site's letter)`, pos, pages.length, [0.5, 0.5], 0.05)); f.push(...bandFaults(`${tag} (the resource's place)`, rp, pages.length, [1 / 3, 1 / 3, 1 / 3], 0.05)); } else { const pos = [0, 0, 0]; for (const p of pages) pos['ABC'.indexOf(p.meta.sites.dry)]++; f.push(...bandFaults(`${tag} (the worst site's letter)`, pos, pages.length, [1 / 3, 1 / 3, 1 / 3], 0.05)); } }
  if (id === 'G3-619') posBand('the level', pages.map((p) => st(p, 'card').map((s) => s[2])), ['local', 'state', 'national'], 0.06);
  if (id === 'G3-620') posBand('the branch', pages.map((p) => st(p, 'bcard').map((s) => s[2])), ['legislative', 'executive', 'judicial'], 0.06);
  if (id === 'G3-621' && lv === 1) posBand('the level', pages.map((p) => st(p, 'levelwrite').map((s) => s[2])), ['local', 'state', 'national']);
  if (id === 'G3-622') { const cnt = {}; for (const p of pages) { const o = p.meta.items.join(); cnt[o] = (cnt[o] || 0) + 1; } if (Object.keys(cnt).length < 6) f.push(`${tag}: the three ways in only ${Object.keys(cnt).length} orders`); }
  if (id === 'G3-624' && lv > 1) posBand('the kind', pages.map((p) => st(p, 'source').map((s) => s[2])), ['primary', 'secondary'], 0.06);
  if (id === 'G3-625') { const cnt = {}; for (const p of pages) { const L0 = p.meta.letters.school; cnt[L0] = (cnt[L0] || 0) + 1; } f.push(...bandFaults(`${tag} (the first school's letter)`, [...'ABCDEFG'.slice(0, lv === 1 ? 4 : 7)].map((L0) => cnt[L0] || 0), pages.length, Array(lv === 1 ? 4 : 7).fill(1 / (lv === 1 ? 4 : 7)), 0.05)); }
  if (id === 'G3-627' && lv > 1) posBand('the kind', pages.map((p) => st(p, 'rcard').map((s) => s[2])), ['natural', 'human', 'capital'], 0.06);
  if (id === 'G3-628') { let straight = 0; const n = lv === 1 ? 2 : 4, cnt = Array.from({ length: n }, () => Array(n).fill(0)); for (const p of pages) p.lefts.forEach((c, i) => { const j = p.rights.indexOf(c[1]); if (j === i && n > 2) straight++; cnt[i][j]++; }); if (n > 2 && straight) f.push(`${tag}: an effect straight across on ${straight} rows`); if (n === 2) { const s2 = pages.filter((p) => p.rights[0] === p.lefts[0][1]).length; f.push(...bandFaults(`${tag} (two causes straight across)`, [s2, pages.length - s2], pages.length, [0.5, 0.5], 0.05)); } if (n > 2) cnt.forEach((r, i) => f.push(...bandFaults(`${tag} (row ${i + 1}'s effect)`, r.filter((_, j) => j !== i), pages.length, Array(n - 1).fill(1 / (n - 1)), 0.06))); }
  // the surface of the cards: every word, the first word, the last word and the number of words (balanced accuracy, one
  // kind against the rest), at most SURFACE_MAX each; measured over the copies of the sort and match types
  const cards = pages.flatMap((p) => p.cards || []);
  if (SURFACE_TYPES[id] && !(id === 'G3-621' && lv > 1)) {
    if (!cards.length) f.push(`${tag}: no cards measured (a measurement of nothing)`);
    const m = surfaceOf(cards, SURFACE_REQUIRED[id]); if (!pages.poisoned) MEASURED[tag] = m;
    // G3-621 level 1: every service names its level (the brief's rule: "a city street", "a state highway"), one service a level,
    // so the level word, and every word beside it, is the answer printed on the card: measured and printed, never failed
    for (const [what, a] of m.top) if (a > SURFACE_MAX) f.push(`${tag}: ${what} sorts the cards ${(a * 100).toFixed(1)}% of the time (at most ${SURFACE_MAX * 100}%)`);
  }
  // the match type: a child pairing each cause with an effect by its length (longest with longest) or by a word they
  // share pairs them right no more often than SURFACE_MAX of the time, pooled over the copies
  if (id === 'G3-628') {
    const all = pages.map((p) => p.pairs).filter(Boolean);
    if (!all.length) f.push(`${tag}: no pairs measured (a measurement of nothing)`);
    else { const m = matchSurfaceOf(all); if (!pages.poisoned) MEASURED[tag] = m; for (const [what, a] of m.top) if (a > SURFACE_MAX) f.push(`${tag}: pairing ${what} is right ${(a * 100).toFixed(1)}% of the time (at most ${SURFACE_MAX * 100}%)`); }
  }
  return f;
}
/** a G3-628 page's causes and effects, in the order printed: [{ id, text }] */
function matchPairsOf(p) {
  const side = (k) => [...p.html.matchAll(new RegExp(`data-s3-${k}="([a-z]+)"[^>]*>([^<]+)<`, 'g'))].map((m) => ({ id: m[1], text: dec(m[2]).trim() }));
  return { causes: side('cause'), effects: side('effect') };
}
/** the share of causes a child pairs right by length order (ties in printed order) or by a shared word (else a guess
 *  among the effects left, counted at its expected value) */
function matchSurfaceOf(all) {
  const nw = (t) => t.split(/\s+/).length;
  let n = 0, byLen = 0, byWord = 0;
  for (const { causes, effects } of all) {
    const rc = causes.map((c, i) => [c, i]).sort((a, b) => nw(a[0].text) - nw(b[0].text) || a[1] - b[1]).map((x) => x[0]);
    const re = effects.map((c, i) => [c, i]).sort((a, b) => nw(a[0].text) - nw(b[0].text) || a[1] - b[1]).map((x) => x[0]);
    rc.forEach((c, i) => { if (re[i].id === c.id) byLen++; });
    for (const c of causes) { const sh = effects.filter((e) => words(e.text).some((w) => words(c.text).some((x) => same(x, w)))); byWord += sh.length ? (sh.some((e) => e.id === c.id) ? 1 / sh.length : 0) : 1 / effects.length; }
    n += causes.length;
  }
  const top = [['by length', byLen / n], ['by a shared word', byWord / n]].sort((a, b) => b[1] - a[1]);
  return { cards: n, kinds: 0, top, req: [] };
}
/** the cards of a page each sort type reads: [text, kind] */
const SURFACE_TYPES = {
  'G3-612': (p) => [...p.html.matchAll(/data-s3-situation="([a-z]+)"[^>]*>([^<]+)</g)].map((m) => [dec(m[2]), VIRTUE_OWN[m[1]]]),
  'G3-619': (p) => [...p.html.matchAll(/data-s3-cardword="([a-z]+)"[^>]*>([^<]+)</g)].map((m) => [dec(m[2]), LEVEL_OWN[m[1]]]),
  'G3-620': (p) => [...p.html.matchAll(/data-s3-bcard="([a-z]+)"[^>]*>([^<]+)</g)].map((m) => [dec(m[2]), BRANCH_OWN[m[1]]]),
  'G3-621': (p) => [...p.html.matchAll(/data-s3-service="([a-z]+)"[^>]*>([^<]+)</g)].map((m) => [dec(m[2]), TAX_OWN[m[1]]]),
  'G3-624': (p) => [...p.html.matchAll(/data-s3-sourceword="([a-z]+)"[^>]*>([^<]+)<[\s\S]*?data-s3-about="\1"[^>]*>([^<]+)</g)].map((m) => [dec(m[2] + ' ' + m[3]), SOURCE_OWN[m[1]]]),
  'G3-627': (p) => [...p.html.matchAll(/data-s3-rcard="([a-z]+)"[^>]*>([^<]+)</g)].map((m) => [dec(m[2]), RES_OWN[m[1]]]),
};
const MEASURED = {};
function surfaceOf(cards, required = new Set()) {
  // review round 2: a kind with one card in all the copies is that card (the fix brief keeps one state service in G3-621):
  // its words name the card, not a pattern; it is reported (single) and measured only as "the rest" of the other kinds
  const allKinds = [...new Set(cards.map((c) => c[1]))], single = allKinds.filter((k) => new Set(cards.filter((c) => c[1] === k).map((c) => c[0])).size === 1);
  const kinds = allKinds.filter((k) => !single.includes(k));
  const ws = (t) => t.toLowerCase().replace(/[.,?!]/g, '').split(/\s+/).filter(Boolean);
  const bal = (feat) => { let best = 0; for (const k of kinds) { let tp = 0, fn = 0, fp = 0, tn = 0; for (const c of cards) { const v = feat(c), pos = c[1] === k; if (v && pos) tp++; else if (!v && pos) fn++; else if (v && !pos) fp++; else tn++; } const b0 = ((tp / (tp + fn || 1)) + (tn / (tn + fp || 1))) / 2; best = Math.max(best, b0, 1 - b0); } return best; };
  const top = [];
  const vocab = new Set(cards.flatMap((c) => ws(c[0])));
  for (const w of vocab) if (!required.has(w)) top.push([`the word "${w}"`, bal((c) => ws(c[0]).includes(w))]);
  for (const w of new Set(cards.map((c) => ws(c[0])[0]))) top.push([`the first word "${w}"`, bal((c) => ws(c[0])[0] === w)]);
  for (const w of new Set(cards.map((c) => ws(c[0]).slice(-1)[0]))) if (!required.has(w)) top.push([`the last word "${w}"`, bal((c) => ws(c[0]).slice(-1)[0] === w)]);
  for (let k = 1; k <= 20; k++) top.push([`a length of ${k} words or fewer`, bal((c) => ws(c[0]).length <= k)]);
  top.push(["a word ending in 's", bal((c) => /'s\b/.test(c[0].toLowerCase()))]);
  const req = [...required].map((w) => [w, bal((c) => ws(c[0]).includes(w))]);
  top.sort((a, b) => b[1] - a[1]);
  return { cards: cards.length, top, req, kinds: kinds.length, single };
}
/** page rules (the whole page, as built) */
const SAMPLE_OWN = { 'G3-615': /A sample town/, 'G3-618': /A sample state/, 'G3-623': /sample town/, 'G3-628': /a sample town/, 'G3-625': /Our sample town/ };
/** fix round 1 (2026-11-25): the rules the review and the fix brief added, each poisoned below */
const cellLines = (html, attr) => { const i = html.indexOf(attr); if (i < 0) return -1; const ends = ['data-s3-cell=', 'data-s3-frame='].map((k) => html.indexOf(k, i + attr.length)).filter((j) => j > 0); return (html.slice(i, ends.length ? Math.min(...ends) : i + 4000).match(/data-dk-writerow/g) || []).length; };
function roundOneFaults(id, lv, html, ins, text) {
  const f = [];
  const artOf = (k) => { const i = html.indexOf(`data-s3-art="${k}"`); return i < 0 ? '' : html.slice(i, html.indexOf('</svg>', i)); };
  if (id === 'G3-614') {
    if (lv > 1) for (const c of ['vote', 'ada', 'crosswalk']) for (const k of ['who', 'did', 'changed']) { const n = cellLines(html, `data-s3-cell="${c}:${k}"`); if (n !== 3) f.push(`${id} L${lv}: the ${c} ${k} cell has ${n} lines (three)`); }
    if (lv === 3 && !/How I would ask:/.test(text)) f.push(`${id} L3: no "How I would ask"`);
    const ada = artOf('change:ada');
    if (ada) { if (/data-sk-age="child"/.test(ada)) f.push(`${id} L${lv}: a child among the disability-rights marchers`); if ((ada.match(/data-s3-seated="1"/g) || []).length !== 2) f.push(`${id} L${lv}: the wheelchair users are not seated in their chairs`); for (const m of ada.matchAll(/data-s2-hair="([a-z]+)"/g)) if (!['short', 'bun', 'bald', 'hijab', 'curly'].includes(m[1])) f.push(`${id} L${lv}: a marcher with ${m[1]} hair (a grown-up: short hair or hair up)`); }
    const vote = artOf('change:vote');
    if (vote) { if ((vote.match(/data-s3-skirt="ankle"/g) || []).length < 3) f.push(`${id} L${lv}: the 1915 marchers' skirts do not reach the ankle`); if (!/marcher-1915-man/.test(vote)) f.push(`${id} L${lv}: no man among the 1915 marchers (the story says women and men)`); }
  }
  if (id === 'G3-615') {
    if (/inches =/.test(text) || !/data-s3-colhead="inches"/.test(html) || !/data-s3-colhead="miles"/.test(html)) f.push(`${id} L${lv}: "inches" and "miles" are not column labels above the boxes ("1 inches = 1 miles")`);
    if (lv === 3 && !/The shortest trip\. Measure from dot to dot\./.test(text)) f.push(`${id} L3: the trip box does not say to measure from dot to dot`);
    if (lv === 3 && !/Use a ruler/.test(ins)) f.push(`${id} L3: the instruction drops "Use a ruler"`);
    if (!/1 inch stands for 100 miles/.test(text)) f.push(`${id} L${lv}: the sample state's scale is not 1 inch for 100 miles`);
  }
  if (id === 'G3-616') {
    if (/Main Street|Oak Street/.test(text)) f.push(`${id} L${lv}: a named street on a map of OUR neighborhood`);
    if (lv === 1 && (html.match(/data-s3-streetname=/g) || []).length !== 2) f.push(`${id} L1: the streets have no blank name labels`);
    if (/\bblocks?\b(?!\(s\))/.test(text.replace(/1 square = 1 block/, ''))) f.push(`${id} L${lv}: "block" or "blocks" where any number may go ("block(s)")`);
    const keys = lv === 1 ? (html.match(/data-s3-art="key:/g) || []).length : (html.match(/data-s3-keybox="1"/g) || []).length;
    if (keys !== 5) f.push(`${id} L${lv}: ${keys} key rows (five: the checklist needs five symbols)`);
    if (lv === 1 && !/= a place to eat/.test(text)) f.push(`${id} L1: no key symbol for a place to eat`);
  }
  if (id === 'G3-620') {
    if (!/To check means to stop or limit\. For example, the president can say no to a bill \(a veto\)\./.test(text)) f.push(`${id} L${lv}: the page does not say what "check" means`);
    if (lv > 1 && !/job cards (in|go in) the national chart/.test(ins)) f.push(`${id} L${lv}: the instruction does not say where the job cards go`);
  }
  if (id === 'G3-621') {
    for (const m of html.matchAll(/data-s3-service="[a-z]+"[^>]*>([^<]+)</g)) if (LEVEL_WORDS.test(m[1])) f.push(`${id} L${lv}: the service "${m[1]}" prints a level word`);
    for (const w of ['local: our town', 'state: our state', 'national: our country']) { const [a, c] = w.split(': '); if (!new RegExp(a + ':[^<]*</text><text[^>]*>' + c).test(html)) f.push(`${id} L${lv}: the government buildings are not labeled "${w}"`); }
  }
  if (id === 'G3-628' && lv === 3 && !/It happened because/.test(text)) f.push(`${id} L3: the frame breaks with a whole-sentence answer (no "It happened because")`);
  // review round 2
  if (id === 'G3-620' && lv === 3 && !/Another way one branch can check another:\s*The\b.*\bcan\b/.test(text)) f.push(`${id} L3: the frame does not ask for ANOTHER way to check (the veto is the page's own example)`);
  if (id === 'G3-620' && !html.includes('(a\u00a0veto)')) f.push(`${id} L${lv}: "(a veto)" can break across two lines (no no-break space)`);
  if (id === 'G3-621' && lv === 1) { const labels = [...html.matchAll(/data-s3-(?:step|levelword)="[^"]*"[^>]*>([^<]+)</g)].map((m) => dec(m[1])).join(' ') + ' ' + [...(artOfPage(html, 'tax:governments').matchAll(/<text[^>]*>([^<]+)<\/text>/g))].map((m) => dec(m[1])).join(' ') + ' ' + ((/data-s3-wordbox[^>]*>[\s\S]*?<\/span>/.exec(html) || [''])[0].replace(/<[^>]+>/g, ' ')) + ' Word box (use each word one time):'; for (const m of html.matchAll(/data-s3-service="([a-z]+)"[^>]*>([^<]+)</g)) { const sh = sharedWords(dec(m[2]), labels); if (sh.length) f.push(`${id} L1: the service "${dec(m[2])}" shares ${sh.join(', ')} with a label, the word box or a caption`); } }
  if (id === 'G3-626') { const lamp = artOfPage(html, 'then:light'); if (lamp) { const girl = /data-s3-drawn="girl-1900"[\s\S]*?data-s3-skirtpath="1"/.exec(lamp) && /<path d="([^"]+)"[^>]*data-s3-skirtpath="1"/.exec(lamp); const ys = girl ? [...girl[1].matchAll(/-?[0-9.]+,(-?[0-9.]+)/g)].map((m) => +m[1]) : []; if (!girl) f.push(`${id} L${lv}: the girl in the lamp photo wears no dress of about 1900`); else if (Math.max(...ys) < -8) f.push(`${id} L${lv}: the girl's dress ends at ${Math.max(...ys)} (above mid-calf: a child's leg runs from -26 to 0)`); if (/data-sk-age="child"/.test(lamp) && (lamp.match(/data-sk-age="child"/g) || []).length !== (lamp.match(/data-s3-drawn="girl-1900"/g) || []).length) f.push(`${id} L${lv}: a child in the lamp photo not in a dress of about 1900`); } }
  if (id === 'G3-629' && !/I can accept it because/.test(text)) f.push(`${id} L${lv}: no "I can accept it because"`);
  return f;
}
function pageRuleFaults(id, lv, html, ins) {
  const f = [];
  const text = dec(html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  if (/\bfree\b/i.test(text + ' ' + ins)) f.push(`${id} L${lv}: the page says "free"`);
  for (const m of text.matchAll(/\b\d[\d,]*\b/g)) { const n = Number(m[0].replace(/,/g, '')); if (n > 1000 && !(n >= 1700 && n <= 2030) && n !== 100000) f.push(`${id} L${lv}: the number ${m[0]} (within 1,000; years are dates)`); }
  // every sentence a child reads (the texts, the situations, the cards) has MAX_WORDS words or fewer
  for (const m of html.matchAll(/data-s3-(situation|storytext|waytext|problemtext|about|thentext|storysent|say)="[^"]*"[^>]*>([^<]+)</g)) for (const s of sentencesOf(dec(m[2]))) if (wc(s) > MAX_WORDS) f.push(`${id} L${lv}: "${s}" has ${wc(s)} words (${MAX_WORDS} or fewer)`);
  if (SAMPLE_OWN[id] && !SAMPLE_OWN[id].test(text)) f.push(`${id} L${lv}: the sample town or state does not say it is a sample`);
  if (/\b(Biden|Trump|Obama|Bush|Clinton|Lincoln|Washington|Roberts|Harris|Anthony|Stanton)\b/.test(text)) f.push(`${id} L${lv}: a real person's name`);
  if (id === 'G3-612' && !/Use each word one time|using each word one time/.test(ins)) f.push(`${id} L${lv}: the instruction does not say to use each word one time`);
  if (id === 'G3-628' && lv > 1 && !/each effect one time/.test(ins)) f.push(`${id} L${lv}: the instruction does not say to use each effect one time`);
  if (id === 'G3-615') { if (!/1 inch on the map stands for 1 mile/.test(text)) f.push(`${id}: the scale is not said in words`); if (lv === 1 ? !/nearest inch/.test(ins + text) : !/nearest half inch/.test(ins + text)) f.push(`${id} L${lv}: the page does not say how near to measure`); if (!/dot to dot/.test(ins)) f.push(`${id} L${lv}: the instruction does not say to measure from dot to dot`); }
  if (id === 'G3-617' && !/= 100,000 people/.test(text)) f.push(`${id}: the dot map has no key`);
  if (id === 'G3-625' && !/within five years/.test(ins)) f.push(`${id} L${lv}: the instruction does not ask for the events within five years`);
  if (id === 'G3-613' && (!/We the People of the United States/.test(text) || !/September 17, 1787/.test(text))) f.push(`${id} L${lv}: the Constitution's first words or its date are missing`);
  if (id === 'G3-622' && !/18 and older/.test(text)) f.push(`${id} L${lv}: the election text does not say 18 and older`);
  f.push(...roundOneFaults(id, lv, html, ins, text));
  // grown-ups drawn as grown-ups: every leader card draws grown-ups only (no child), short hair or hair up (batch S2)
  if (id === 'G3-619') for (const a of html.split(/(?=<svg[^>]*data-s3-art="card:)/).slice(1).map((x) => x.slice(0, x.indexOf('</svg>')))) { const who = /data-s3-art="card:([a-z]+)"/.exec(a)[1]; if (!['mayor', 'council', 'governor', 'legislature', 'president', 'congress'].includes(who)) continue; if (!/data-s2-drawn="flag"/.test(a)) f.push(`${id} L${lv}: the ${who} card has no flag`); const hairs = [...a.matchAll(/data-s2-hair="([a-z]+)"/g)].map((m) => m[1]); if (!hairs.length) f.push(`${id} L${lv}: the ${who} card draws no grown-up`); for (const hh of hairs) if (!['short', 'bun', 'bald', 'hijab', 'curly'].includes(hh)) f.push(`${id} L${lv}: a ${who} with ${hh} hair (a grown-up leader: short hair or hair up)`); if (/data-sk-age="child"/.test(a)) f.push(`${id} L${lv}: a child on the ${who} card`); }
  // a write-in or open line holds a whole answer (at least LINE_MIN px; the S2 page check holds every frame line to 60)
  return f;
}
function levelSig(html) { const c = {}; for (const m of html.matchAll(/data-(?:dk|s3|g1)-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; for (const m of html.matchAll(/data-s3-frame="([^"]+)"/g)) c['frame:' + m[1]] = 1; return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])); }
const insOf = (t, lv) => withLevelInstruction(resolveStrings(t.id, 'en', t), t.id, lv, 'en').instruction;
const buildPage = (t, lv, s) => t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`dks3|${t.id}|${lv}|${s}`), variant: s });

/* ================================================================ main */
async function main() {
  const t0 = Date.now();
  const bf = bankFaults(B);
  ok(!bf.length, 'bank: ' + bf.slice(0, 12).join(' | '));
  const P = (name, mut, re, art, geo) => { const b = clone(B); mut(b); judge(name, bankFaults(b, art, geo), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 a situation given the wrong virtue', (b) => { find(b.SITUATIONS, 'plant').virtue = 'fairness'; }, /plant: the bank says fairness/);
  P('PB2 a second defensible virtue left out of the bank', (b) => { find(b.SITUATIONS, 'bus').also = []; }, /bus: the other defensible virtues are none/);
  P('PB3 a situation that says the virtue\'s own word ("fair")', (b) => { find(b.SITUATIONS, 'ball').text = 'Five children want a fair turn with the new ball.'; }, /shares "fair" with the virtue fairness/);
  P('PB4 a situation of 17 words', (b) => { find(b.SITUATIONS, 'lunch').text = 'A girl at your table opens a big lunch that you have never ever seen before at all.'; }, /has 1[6-9] words/);
  P('PB5 the Constitution signed in 1776', (b) => { b.CONSTITUTION_SAYS[1] = 'It was signed on July 4, 1776.'; }, /September 17, 1787/);
  P('PB6 the 19th Amendment dated 1919', (b) => { find(b.CHANGES, 'vote').text[2] = 'In 1919, the 19th Amendment was added to the Constitution.'; }, /does not say "1920"/);
  P('PB7 the state map said to show the streets', (b) => { find(b.SCALE_COMPARE, 'streets').map = 'state'; }, /streets: the bank says the state map/);
  P('PB8 the desert said to have many people', (b) => { b.LIVE_KINDS.desert.people = 'many'; }, /live desert: many/);
  { const g = clone(GEO); g.places.find((x) => x.id === 'nevada').x = g.places.find((x) => x.id === 'chicago').x; g.places.find((x) => x.id === 'nevada').y = g.places.find((x) => x.id === 'chicago').y; P('PB9 the desert letter moved to Chicago (the dots say many)', () => {}, /nevada: \d+ dots near it/, ART, g); }
  { const g = clone(GEO); const p = g.places.find((x) => x.id === 'idaho'); p.x -= 60; P('PB10 the mountain place moved off the mountains drawn', () => {}, /idaho is not in the mountains|idaho: \d+ dots/, ART, g); }
  P('PB11 the dry site said to have water', (b) => { find(b.TOWN_SITES, 'dry').offers = ['water']; }, /site dry: offers water/);
  P('PB12 the governor sent to the town', (b) => { find(b.LEVEL_CARDS, 'governor').level = 'local'; }, /governor: the bank says local/);
  P('PB13 a leader named as a person', (b) => { find(b.LEVEL_CARDS, 'mayor').word = 'Mayor Ann Lee'; }, /names a person/);
  P('PB14 "a repaired road" (no level)', (b) => { find(b.LEVEL_CARDS, 'highway').word = 'a repaired road'; }, /"road" without its level/);
  P('PB15 the courts making the laws', (b) => { find(b.BRANCH_CARDS, 'supreme').branch = 'legislative'; }, /supreme: legislative/);
  P('PB16 the soldiers paid by the state', (b) => { find(b.TAX_SERVICES, 'soldiers').level = 'state'; }, /soldiers: state/);
  P('PB17 a level-1 service that prints its level', (b) => { find(b.TAX_SERVICES, 'patrol').word = 'state highway patrol cars'; }, /prints a level word/);
  P('PB30 fish without honesty (a promise, like the markers)', (b) => { find(b.SITUATIONS, 'fish').also = []; }, /fish: the other defensible virtues are none/);
  { const g = clone(GEO); const p = g.places.find((x) => x.id === 'nevada'), q = g.places.find((x) => x.id === 'chicago'); p.x = q.x; p.y = q.y; P('PB31 a few letter whose circle leaves its desert', () => {}, /nevada: its letter's circle leaves its own desert/, ART, g); }
  { const g = clone(GEO); const p = g.places.find((x) => x.id === 'chicago'), q = g.places.find((x) => x.id === 'wyoming'); p.x = q.x + 30; p.y = q.y; P('PB32 a many letter whose circle touches the mountains', () => {}, /chicago: its letter's circle touches mountain or desert shading/, ART, g); }
  P('PB33 the election without who wins', (b) => { const e = find(b.DECIDE_WAYS, 'election'); e.text = e.text.filter((t) => !/most votes/.test(t)); }, /does not say the person with the most votes wins/);
  P('PB34 the crossing light stops cars all day long', (b) => { find(b.SOLUTIONS, 'light').benefit = 'stops cars all day long'; }, /stop cars all day long/);
  P('PB35 the mail as a tax service', (b) => { b.TAX_SERVICES.push({ id: 'mail', word: 'the mail', level: 'national' }); }, /paid by stamps/);
  // review round 2
  P('PB36 the driver\'s license back in the pool', (b) => { b.TAX_SERVICES.push({ id: 'license', word: "a driver's license", level: 'state' }); }, /license" is paid by a fee/);
  P('PB37 the soldiers protect "our country" again', (b) => { find(b.TAX_SERVICES, 'soldiers').word = 'soldiers who protect our country'; }, /shares country with the page's labels/);
  P('PB38 the election names a president', (b) => { const e = find(b.DECIDE_WAYS, 'election'); e.text = e.text.map((x) => x.replace('a mayor or a governor', 'a president')); }, /names a president/);
  { const g = clone(GEO), c = g.CITIES.find((x) => x.id === 'new-york'); g.regions.mountains += ` M${c.x - 4},${c.y - 4} L${c.x + 4},${c.y - 4} L${c.x + 4},${c.y + 4} L${c.x - 4},${c.y + 4} Z`; P('PB39 mountain shading back over New York City', () => {}, /new-york has mountain or desert shading/, ART, g); }
  { const g = clone(GEO), c = g.CITIES.find((x) => x.id === 'boston'); g.regions.mountains += ` M${c.x + 12},${c.y - 3} L${c.x + 18},${c.y - 3} L${c.x + 18},${c.y + 3} L${c.x + 12},${c.y + 3} Z`; P('PB40 mountain shading inside Boston\'s circle (the city itself clear)', () => {}, /boston has mountain or desert shading/, ART, g); }
  { const g = clone(GEO); g.CITIES.find((x) => x.id === 'washington').x += 6; P('PB41 the module moves Washington (the gate projects it itself)', () => {}, /the city washington: the module puts it/, ART, g); }
  P('PB18 the election without "18 and older"', (b) => { find(b.DECIDE_WAYS, 'election').text[0] = 'In an election, citizens vote for leaders.'; }, /18 and older/);
  P('PB19 the governor carries out the city\'s plan', (b) => { find(b.CARRY_OUT, 'governor').right = true; }, /not city workers alone/);
  P('PB20 a museum sign called primary', (b) => { find(b.SOURCES, 'museum').kind = 'primary'; }, /museum: primary/);
  P('PB21 the town library opens in 1925 (no pair with the vote)', (b) => { find(b.TIMELINE_EVENTS, 'library').year = 1925; }, /library: town 1925|pairs within five years/);
  P('PB22 the paved road in 1923 (a third pair)', (b) => { find(b.TIMELINE_EVENTS, 'road').year = 1923; }, /road: town 1923|pairs within five years/);
  P('PB23 the oven a natural resource', (b) => { find(b.RESOURCES, 'oven').kind = 'natural'; }, /oven: natural/);
  P('PB24 a cause that shares a word with an effect', (b) => { find(b.CAUSES, 'closed').cause = 'The factory closed, and families left.'; }, /shares "families"/);
  P('PB25 the railroad / factory causes not kept apart', (b) => { b.CAUSE_CONFUSABLE = []; }, /railroad \/ opened causes are not kept apart/);
  P('PB26 a resource card that says "nature"', (b) => { find(b.RESOURCES, 'salt').word = 'salt from nature'; }, /shares "nature"/);
  P('PB27 a source that says "later"', (b) => { find(b.SOURCES, 'textbook').about = 'written later to explain how people lived'; }, /shares "later"/);
  { const art = { ...ART, PAL3: new Set([...ART.PAL3].filter((c) => c !== '#B98D63')) }; P('PB28 a drawing colour outside PAL3', () => {}, /outside PAL3/, art); }
  P('PB29 the story of a change without who', (b) => { find(b.CHANGES, 'crosswalk').text[0] = 'People in a sample town wanted a crosswalk near the park.'; }, /does not name who/);

  // ---- 2. build sweep
  const pagesOf = {};
  const want = (id) => (SURFACE_TYPES[id] || ['G3-613', 'G3-615', 'G3-617', 'G3-618', 'G3-625', 'G3-628'].includes(id) ? Math.max(SEEDS, BIG) : SEEDS);
  for (const id of IDS) {
    const t = loadType(id);
    ok(t.exerciseType && /^[a-z-]+$/.test(t.exerciseType) && t.gradeBand === 'G3', `${id}: no family key or not Grade 3`);
    ok(typeof t.levelSetWords === 'function', `${id}: no levelSetWords`);
    let refused = false; try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const pages = [], ins = insOf(t, lv);
      for (let s = 1; s <= want(id); s++) {
        let r;
        try { r = buildPage(t, lv, s); } catch (e) { ok(false, `${id} L${lv} #${s}: build throws ${e.message}`); break; }
        const p = pageOf(r);
        pages.push({ ...p, html: ['G3-613', 'G3-628'].includes(id) ? p.html : '', text: '', box: [...p.html.matchAll(/data-s3-virtue="([a-z]+)"/g)].map((m) => m[1]), cards: SURFACE_TYPES[id] ? SURFACE_TYPES[id](p) : null, pairs: id === 'G3-628' ? matchPairsOf(p) : null });
        if (s > SEEDS) continue;
        const af = answerFaults(id, lv, p); ok(!af.length, af.join(' | '));
        ok(t.levelSetWords(r.meta).length > 0, `${id} L${lv}: levelSetWords is empty`);
        if (s <= 3 || s % 25 === 0) {
          const pg = pageRuleFaults(id, lv, r.bodyHtml, ins); ok(!pg.length, pg.join(' | '));
          if (p.skins.length) ok(new Set(p.skins).size >= 2, `${id} L${lv} #${s}: every person one skin tone`);
          if (s === 1) sigs[lv] = levelSig(r.bodyHtml);
        }
      }
      pagesOf[id + ' ' + lv] = { pages };
      const tf = tellFaults(id, lv, pages);
      ok(!tf.length, tf.slice(0, 6).join(' | '));
    }
    ok(sigs[1] !== sigs[2] && sigs[2] !== sigs[3] && sigs[1] !== sigs[3], `${id}: two levels draw the same parts`);
    process.stdout.write(id + ' ');
  }
  console.log(`\nbuild sweep done (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  // tells: poisons on spoiled pools (each with its control: the real pool passed above)
  const spoil = (id, lv, fn) => Object.assign(pagesOf[id + ' ' + lv].pages.map((p) => fn(clone(p))), { poisoned: true });
  judge('PT1 the virtues always in one order', tellFaults('G3-612', 2, spoil('G3-612', 2, (p) => { const w = st(p, 'write').sort((a, b) => VIRTUES_OWN.indexOf(a[2]) - VIRTUES_OWN.indexOf(b[2])); p.stamps = [...p.stamps.filter((s) => s[0] !== 'write'), ...w]; return p; })), /honesty at each place|respect at each place/);
  judge('PT2 every honesty situation starts "Your teacher asks"', tellFaults('G3-612', 2, spoil('G3-612', 2, (p) => { p.cards = p.cards.map((c) => (c[1] === 'honesty' ? ['Your teacher asks ' + c[0], c[1]] : c)); return p; })), /the word "(teacher|asks)"|first word/);
  judge('PT3 the town map always first', tellFaults('G3-615', 2, spoil('G3-615', 2, (p) => { p.groups = p.groups.map((g) => ({ ...g, choices: g.choices.slice().sort((a) => (a[1] === 'right' ? -1 : 1)) })); return p; })), /the right map's place/);
  judge('PT4 many people always at A', tellFaults('G3-617', 2, spoil('G3-617', 2, (p) => { p.groups = p.groups.map((g, i) => ({ ...g, choices: g.choices.map((c) => [c[0], (i < 2) === (c[2] === 'many') ? 'right' : 'no', c[2]]) })); return p; })), /many at each place/);
  judge('PT5 the worst site always C', tellFaults('G3-618', 2, spoil('G3-618', 2, (p) => { p.meta = { ...p.meta, sites: { ...p.meta.sites, dry: 'C' } }; return p; })), /the worst site's letter/);
  judge('PT6 the cards lined up by level', tellFaults('G3-619', 2, spoil('G3-619', 2, (p) => { const c = st(p, 'card').sort((a, b) => ['local', 'state', 'national'].indexOf(a[2]) - ['local', 'state', 'national'].indexOf(b[2])); p.stamps = [...p.stamps.filter((s) => s[0] !== 'card'), ...c]; return p; })), /at each place/);
  judge('PT7 every state card says "state"', tellFaults('G3-619', 2, spoil('G3-619', 2, (p) => { p.cards = p.cards.map((c) => (c[1] === 'state' && !/state/.test(c[0]) ? ['the state ' + c[0].replace(/^(the|a) /, ''), c[1]] : c)); return p; })), /the word "state"/);
  judge('PT8 the branches always in order', tellFaults('G3-620', 2, spoil('G3-620', 2, (p) => { const c = st(p, 'bcard').sort((a, b) => ['legislative', 'executive', 'judicial'].indexOf(a[2]) - ['legislative', 'executive', 'judicial'].indexOf(b[2])); p.stamps = [...p.stamps.filter((s) => s[0] !== 'bcard'), ...c]; return p; })), /at each place/);
  judge('PT9 every human resource ends "work"', tellFaults('G3-627', 2, spoil('G3-627', 2, (p) => { p.cards = p.cards.map((c) => (c[1] === 'human' ? [c[0].replace(/\s\S+$/, ' work'), c[1]] : c)); return p; })), /the (last )?word "work"/);
  judge('PT10 the sources in one kind first', tellFaults('G3-624', 2, spoil('G3-624', 2, (p) => { const c = st(p, 'source').sort((a) => (a[2] === 'primary' ? -1 : 1)); p.stamps = [...p.stamps.filter((s) => s[0] !== 'source'), ...c]; return p; })), /at each place/);
  judge('PT11 an effect straight across', tellFaults('G3-628', 2, spoil('G3-628', 2, (p) => { p.rights = p.lefts.map((c) => c[1]); return p; })), /straight across/);
  judge('PT12 the first school always lettered A', tellFaults('G3-625', 2, spoil('G3-625', 2, (p) => { p.meta = { ...p.meta, letters: { ...p.meta.letters, school: 'A' } }; return p; })), /first school's letter/);
  judge('PT14 the two causes of level 1 always crossed', tellFaults('G3-628', 1, spoil('G3-628', 1, (p) => { p.rights = [p.lefts[1][1], p.lefts[0][1]]; return p; })), /two causes straight across/);
  judge('PT15 the cause cards that sort their effects by length', tellFaults('G3-628', 2, spoil('G3-628', 2, (p) => { const L = { railroad: 'A', flood: 'A b', opened: 'A b c', closed: 'A b c d' }, E = { railroad: 'X', flood: 'X y', opened: 'X y z', closed: 'X y z w' }; p.pairs = { causes: p.pairs.causes.map((c) => ({ ...c, text: L[c.id] })), effects: p.pairs.effects.map((e) => ({ ...e, text: E[e.id] })) }; return p; })), /pairing by length is right/);
  // review round 2: the trip's length nearly always the same; a kind of TWO cards sharing a word (the single-card rule
  // must not hide it)
  judge('PT16 the trip always 3 1/2 miles', tellFaults('G3-615', 3, spoil('G3-615', 3, (p) => { p.stamps = p.stamps.map((x) => (x[0] === 'triplen' ? [x[0], x[1], '3 1/2'] : x)); return p; })), /the trip is 3 1\/2 miles on/);
  judge('PT17 a second state card that shares "highway"', tellFaults('G3-621', 1, (() => { let k = 0; return spoil('G3-621', 1, (p) => { k++; p.cards = p.cards.map((c) => (c[1] === 'state' && k % 2 === 0 ? ['snowplows on the highway', 'state'] : c)); return p; }); })()), /highway" sorts the cards/);
  judge('PT13 no cards to measure (a measure of nothing)', tellFaults('G3-627', 2, spoil('G3-627', 2, (p) => { p.cards = []; return p; })), /no cards measured/);
  // answers on spoiled pages (control: the real page of the same type and level, answerFaults above)
  const ap = (name, id, lv, fn, re) => { const r = buildPage(loadType(id), lv, 1); judge(name, answerFaults(id, lv, pageOf({ ...r, bodyHtml: fn(r.bodyHtml) })), re); };
  ap('PA1 a situation stamped with another virtue', 'G3-612', 2, (h) => h.replace(/(data-s3-write="[a-z]+" data-dk-answer=")([a-z]+)"/, (m, a, v) => a + (v === 'honesty' ? 'courage' : 'honesty') + '"'), /stamped (courage|honesty) \(the gate/);
  { const t = loadType('G3-612'); let found = null; for (let s = 1; s <= 200 && !found; s++) { const r = buildPage(t, 1, s); if (/data-s3-write="spill"/.test(r.bodyHtml) && !/data-s3-virtue="courage"/.test(r.bodyHtml)) found = r; }
    judge('PA2 level 1 offers the other virtue a child could defend (courage beside the spill)', found ? answerFaults('G3-612', 1, pageOf({ ...found, bodyHtml: found.bodyHtml.replace(/data-s3-virtue="(?!honesty)[a-z]+"/, 'data-s3-virtue="courage"') })) : ['no spill page'], /could also be courage|word box/); }
  ap('PA3 a level-2 page with two ways to give the words', 'G3-612', 2, (h) => h.replace(/data-s3-write="[a-z]+" data-dk-answer="respect"/, 'data-s3-write="bus" data-dk-answer="courage"').replace(/data-s3-write="[a-z]+" data-dk-answer="courage"/, 'data-s3-write="alone" data-dk-answer="courage"'), /ways to give the situations their words|stamped/);
  ap('PA4 a freedom matched to another picture', 'G3-613', 1, (h) => h.replace(/data-s1-key="speech" data-dk-answer="pic-speech"/, 'data-s1-key="speech" data-dk-answer="pic-press"'), /own picture/);
  ap('PA5 a chart cell stamped from another story', 'G3-614', 2, (h) => h.replace(/data-s3-cell="vote:changed" data-dk-answer="[^"]+"/, 'data-s3-cell="vote:changed" data-dk-answer="a crosswalk was painted"'), /vote changed cell stamped/);
  ap('PA6 a distance stamped a half inch long', 'G3-615', 2, (h) => h.replace(/(data-s3-pair="[a-z]+\|[a-z]+" data-dk-answer=")([^"]+)"/, (m, a, v) => a + (v === '2' ? '2 1/2' : '2') + '"'), /inches, stamped/);
  ap('PA7 a map question stamped on the wrong map', 'G3-615', 1, (h) => h.replace(/(data-dk-item="[a-z]+"[^>]*>)(<span class="s3-pick"[^>]*data-dk-answer=")(right|no)("[^>]*>)([^<]*<\/span>)(<span class="s3-pick"[^>]*data-dk-answer=")(right|no)/, (m, a, b, c, d, e, f2, g2) => a + b + g2 + d + e + f2 + c), /stamped the (town|state) map/);
  ap('PA8 the trip\'s first stop stamped the farther place', 'G3-615', 3, (h) => h.replace(/data-s3-tripfirst="1" data-dk-answer="([a-z]+)"/, 'data-s3-tripfirst="1" data-dk-answer="nowhere"'), /trip's first stop stamped nowhere/);
  ap('PA9 a desert letter stamped many people', 'G3-617', 2, (h) => h.replace(/(data-s3-people="many")/g, 'data-x="1" $1').replace(/data-dk-answer="(right|no)" data-x="1" data-s3-people="many"/g, (m, a) => `data-dk-answer="${a === 'right' ? 'no' : 'right'}" data-s3-people="many"`).replace(/data-dk-answer="(right|no)"( data-s3-people="few")/g, (m, a, b) => `data-dk-answer="${a === 'right' ? 'no' : 'right'}"${b}`), /stamped (many|few) \(the gate/);
  ap('PA10 the worst site stamped a good site', 'G3-618', 2, (h) => h.replace(/data-s3-worst="1" data-dk-answer="([A-C])"/, (m, L) => `data-s3-worst="1" data-dk-answer="${L === 'A' ? 'B' : 'A'}"`), /worst site stamped/);
  ap('PA25 the page names the worst site (the frame gives the answer)', 'G3-618', 2, (h) => h.replace(/is the worst place for a town because/, 'is the worst place for a town because Site C is the worst'), /names the worst site/);
  // review round 2: the trip
  { const r = buildPage(loadType('G3-615'), 3, 1), pos = clone(r.meta.pos), T0 = r.meta.trip, S0 = pos.school; pos[T0.far].x = 2 * S0.x - pos[T0.far].x;
    judge('PA29 the school not between the two places (one straight distance)', answerFaults('G3-615', 3, pageOf({ ...r, meta: { ...r.meta, pos } })), /school is not between/); }
  ap('PA30 the trip\'s length is an asked distance', 'G3-615', 3, (h) => { const L0 = /data-s3-triplen="1" data-dk-answer="([^"]+)"/.exec(h)[1]; return h.replace(/(data-s3-pair="[a-z]+\|[a-z]+" data-dk-answer=")[^"]+"/, '$1' + L0 + '"'); }, /already asks/);
  { const r = buildPage(loadType('G3-615'), 3, 1), pos = clone(r.meta.pos), T0 = r.meta.trip, S0 = pos.school; pos[T0.far].x = S0.x + Math.sign(pos[T0.far].x - S0.x) * 9.5;
    judge('PA31 a trip leg that does not round right at 97%', answerFaults('G3-615', 3, pageOf({ ...r, meta: { ...r.meta, pos } })), /printed at 97% rounds/); }
  ap('PA26 what the sites have asked of the good sites only', 'G3-618', 3, (h) => h.replace(/data-s3-offer="A" data-dk-answer="[^"]*"/, 'data-x="1"'), /every site, in letter order/);
  // fix round 1: the map scale's places on the streets
  { const r = buildPage(loadType('G3-615'), 2, 1), pos = clone(r.meta.pos), id0 = Object.keys(pos)[0]; pos[id0].y = 1.75;
    judge('PA27 a place\'s dot between two streets', answerFaults('G3-615', 2, pageOf({ ...r, meta: { ...r.meta, pos } })), /not on a cross street/); }
  { const t = loadType('G3-615'); let found = null; for (let s0 = 1; s0 <= 60 && !found; s0++) { const r = buildPage(t, 3, s0); const m = /From the school to the ([a-z ]+) and the ([a-z ]+):/.exec(pageOf(r).text); if (m) found = [r, m]; }
    const [r, m] = found, W2 = Object.fromEntries(B.SCALE_PLACES.map((x) => [x.word, x.id])), pos = clone(r.meta.pos), a = W2[m[1]]; pos[a].y = pos[a].y === 1.25 ? 2.25 : 1.25;
    judge('PA28 a trip leg across a block', answerFaults('G3-615', 3, pageOf({ ...r, meta: { ...r.meta, pos } })), /are not on one street/); }
  ap('PA11 a level-1 resource that the better site does not have', 'G3-618', 1, (h) => h.replace(/(data-dk-item="resource"[\s\S]*?)data-dk-answer="right"/, '$1data-dk-answer="QQ"').replace(/data-dk-answer="no"( data-s3-resource="minerals")/, 'data-dk-answer="right"$1').replace('data-dk-answer="QQ"', 'data-dk-answer="no"'), /resource stamped minerals/);
  ap('PA12 the mayor stamped national', 'G3-619', 1, (h) => h.replace(/data-s3-card="mayor" data-dk-answer="local"/, 'data-s3-card="mayor" data-dk-answer="national"'), /mayor stamped national/);
  ap('PA13 the broken swing stamped state', 'G3-619', 3, (h) => h.replace('data-s3-swingwrite="1" data-dk-answer="local"', 'data-s3-swingwrite="1" data-dk-answer="state"'), /broken swing stamped state/);
  ap('PA14 the governor stamped judicial', 'G3-620', 2, (h) => h.replace(/data-s3-bcard="governor" data-dk-answer="executive"/, 'data-s3-bcard="governor" data-dk-answer="judicial"'), /governor stamped judicial/);
  ap('PA15 a level-1 service stamped with another level', 'G3-621', 1, (h) => h.replace(/data-s3-levelwrite="([a-z]+)" data-dk-answer="local"/, 'data-s3-levelwrite="$1" data-dk-answer="state"'), /stamped state|one of each level/);
  ap('PA16 who decides in an election stamped "the mayor"', 'G3-622', 2, (h) => h.replace(/data-s3-cell="election:who" data-dk-answer="[^"]+"/, 'data-s3-cell="election:who" data-dk-answer="the mayor"'), /election who stamped/);
  ap('PA17 the Supreme Court carries out the plan', 'G3-623', 3, (h) => h.replace(/data-dk-answer="right"( data-s3-carry="workers")/, 'data-dk-answer="no"$1').replace(/data-dk-answer="no"( data-s3-carry="court")/, 'data-dk-answer="right"$1'), /carries out the plan stamped court/);
  ap('PA18 the diary stamped secondary', 'G3-624', 2, (h) => h.replace(/data-s3-source="diary" data-dk-answer="primary"/, 'data-s3-source="diary" data-dk-answer="secondary"'), /diary stamped secondary/);
  ap('PA19 the source for school in 1900 stamped the textbook', 'G3-624', 3, (h) => h.replace('data-s3-schoolwrite="1" data-dk-answer="diary"', 'data-s3-schoolwrite="1" data-dk-answer="textbook"'), /school in 1900 stamped textbook/);
  ap('PA20 the first school stamped 1880', 'G3-625', 2, (h) => h.replace(/data-s3-event="school" data-dk-answer="town:1870"/, 'data-s3-event="school" data-dk-answer="town:1880"'), /school stamped town:1880/);
  ap('PA21 the oven stamped human', 'G3-627', 2, (h) => h.replace(/data-s3-rcard="oven" data-dk-answer="capital"/, 'data-s3-rcard="oven" data-dk-answer="human"'), /oven stamped human/);
  ap('PA22 a cause matched to another effect', 'G3-628', 2, (h) => h.replace(/data-s1-key="flood" data-dk-answer="eff-flood"/, 'data-s1-key="flood" data-dk-answer="eff-closed"'), /flood matched to eff-closed|partners/);
  ap('PA23 an answer on a record page', 'G3-629', 2, (h) => h.replace('data-s3-frame="question"', 'data-s3-frame="question" data-dk-answer="x"'), /record page carries an answer/);
  ap('PA24 level 1 of the timeline without the vote', 'G3-625', 1, (h) => h.replace(/data-s3-event="vote" data-dk-answer="us:1920"/, 'data-s3-event="flight" data-dk-answer="us:1903"'), /pairs within five years are/);
  // page rules (control: the real page of the same type and level, pageRuleFaults above)
  const pp = (name, id, lv, fn, re, insFn) => { const t = loadType(id), r = buildPage(t, lv, 1); judge(name, pageRuleFaults(id, lv, fn(r.bodyHtml), insFn ? insFn(insOf(t, lv)) : insOf(t, lv)), re); };
  pp('PG1 "free" on a page', 'G3-629', 2, (h) => h.replace('Our question', 'Our free question'), /says "free"/);
  pp('PG2 a number over 1,000', 'G3-615', 2, (h) => h.replace('A sample town', 'A sample town of 4500 people'), /the number 4500/);
  pp('PG3 a 17-word sentence in a story', 'G3-614', 2, (h) => h.replace(/(data-s3-storytext="vote"[^>]*>)/, '$1In the years before 1920, many brave women and men in many states worked very hard to win the vote. '), /has (1[6-9]|[2-9][0-9]) words/);
  pp('PG4 the sample town not called a sample', 'G3-628', 2, (h) => h.replace(', a sample town', ''), /does not say it is a sample/);
  pp('PG5 a real person on the page', 'G3-620', 2, (h) => h.replace('the president', 'President Lincoln'), /a real person's name/);
  pp('PG6 level 2 virtues without "use each word one time"', 'G3-612', 2, (h) => h, /use each word one time/, (i) => i.replace(' Use each word one time.', ''));
  pp('PG7 the scale not said in words', 'G3-615', 1, (h) => h.replace('1 inch on the map stands for 1 mile.', 'The scale.'), /scale is not said in words/);
  pp('PG8 the dot map without its key', 'G3-617', 2, (h) => h.replace('= 100,000 people', ''), /dot map has no key/);
  pp('PG9 the timeline not asking for five years', 'G3-625', 2, (h) => h, /within five years/, (i) => i.replace('within five years of each other', 'at about the same time'));
  pp('PG10 a leader card with a child', 'G3-619', 1, (h) => { const i = h.indexOf('data-s3-art="card:mayor"'); return h.slice(0, i) + h.slice(i).replace('data-sk-age="adult"', 'data-sk-age="child"'); }, /a child on the mayor card/);
  pp('PG11 a leader in a ball cap', 'G3-619', 1, (h) => h.replace(/data-s2-hair="[a-z]+"/, 'data-s2-hair="cap"'), /with cap hair/);
  pp('PG12 the Constitution without its date', 'G3-613', 2, (h) => h.replace('September 17, 1787', 'long ago'), /first words or its date/);
  pp('PG13 the causes without "use each effect one time"', 'G3-628', 2, (h) => h, /each effect one time/, (i) => i.replace(' Use each effect one time.', ''));
  // fix round 1: each new page rule with its poison (the control: the real page of the same type and level, judged above)
  pp('PG14 level 1 virtues without "use each word one time"', 'G3-612', 1, (h) => h, /use each word one time/, (i) => i.replace(' Use each word one time.', ''));
  pp('PG15 a child among the disability-rights marchers', 'G3-614', 2, (h) => { const i = h.indexOf('data-s3-art="change:ada"'); return h.slice(0, i) + h.slice(i).replace('data-sk-age="adult"', 'data-sk-age="child"'); }, /a child among the disability-rights marchers/);
  pp('PG16 a chart cell with two lines', 'G3-614', 2, (h) => h.replace(/(data-s3-cell="vote:did"[\s\S]*?)data-dk-writerow/, '$1data-x'), /the vote did cell has 2 lines/);
  pp('PG17 the 1915 march without a man', 'G3-614', 2, (h) => h.replace(/marcher-1915-man/g, 'marcher-1915'), /no man among the 1915 marchers/);
  pp('PG18 a wheelchair user not seated', 'G3-614', 2, (h) => h.replace('data-s3-seated="1"', 'data-x="1"'), /not seated/);
  pp('PG19 "inches" and "miles" after the boxes again', 'G3-615', 1, (h) => h.replace(/data-s3-colhead="inches"/, 'data-x="1"'), /column labels/);
  pp('PG20 the trip box without "Measure from dot to dot"', 'G3-615', 3, (h) => h.replace('The shortest trip. Measure from dot to dot.', 'The shortest trip.'), /measure from dot to dot/);
  pp('PG21 the sample state at 50 miles an inch', 'G3-615', 2, (h) => h.replace('1 inch stands for 100 miles', '1 inch stands for 50 miles'), /not 1 inch for 100 miles/);
  pp('PG22 level 3 without "Use a ruler"', 'G3-615', 3, (h) => h, /drops "Use a ruler"/, (i) => i.replace('Use a ruler. ', ''));
  pp('PG23 a named street on our neighborhood map', 'G3-616', 1, (h) => h.replace('>Street<', '>Main Street<'), /a named street/);
  pp('PG24 "go __ blocks"', 'G3-616', 3, (h) => h.replace('block(s)', 'blocks'), /"block" or "blocks"/);
  pp('PG25 four key rows', 'G3-616', 2, (h) => h.replace('data-s3-keybox="1"', 'data-x="1"'), /4 key rows/);
  pp('PG26 level 1 without the place-to-eat symbol', 'G3-616', 1, (h) => h.replace('data-s3-art="key:eat"', 'data-x="1"'), /4 key rows|place to eat/);
  pp('PG27 the page does not say what check means', 'G3-620', 3, (h) => h.replace('To check means to stop or limit.', 'To check is to look.'), /what "check" means/);
  pp('PG28 the job cards with no place to go', 'G3-620', 2, (h) => h, /where the job cards go/, (i) => i.replace(' Write the three job cards in the national chart.', ''));
  pp('PG29 a level-1 service that prints its level', 'G3-621', 1, (h) => h.replace(/(data-s3-service="[a-z]+"[^>]*>)([^<]+)</, '$1$2 for the town<'), /prints a level word/);
  pp('PG30 a government building without its word-box label', 'G3-621', 2, (h) => h.replace('our country', 'the nation'), /not labeled/);
  pp('PG31 "In our town, __ happened because" again', 'G3-628', 3, (h) => h.replace('It happened because', 'happened because'), /It happened because/);
  // review round 2
  pp('PG33 a level-1 service that shares a word with a label', 'G3-621', 1, (h) => h.replace(/(data-s3-service="[a-z]+"[^>]*>)[^<]+</, '$1soldiers who protect our country<'), /shares country with a label/);
  pp('PG34 level 3 asks for "one way" to check (the veto copied)', 'G3-620', 3, (h) => h.replace('Another way one branch can check another:', 'One way a branch can check another:'), /ANOTHER way/);
  pp('PG35 "(a veto)" with a plain space', 'G3-620', 2, (h) => h.split('(a\u00a0veto)').join('(a veto)'), /can break across two lines/);
  pp('PG36 the girl\'s dress at the knee', 'G3-626', 1, (h) => h.replace(/(<path d=")([^"]+)("[^>]*data-s3-skirtpath="1")/, (m, a, d, b) => a + d.replace(/,-5(?![0-9.])/g, ',-15') + b), /above mid-calf/);
  pp('PG37 the girl in the lamp photo without her dress of 1900', 'G3-626', 2, (h) => h.replace('data-s3-drawn="girl-1900"', 'data-x="1"'), /wears no dress|not in a dress/);
  pp('PG32 the record without "I can accept it because"', 'G3-629', 2, (h) => h.replace('I can accept it because', 'I think'), /I can accept it because/);

  // ---- 3. render
  const stacks = [];
  let swept = 0;
  if (!NO_RENDER) {
    const puppeteer = require('puppeteer');
    const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
    const OUTD = path.join(require('os').tmpdir(), 'verify-dk-social-3');
    fs.mkdirSync(OUTD, { recursive: true });
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const render = async (type, lv, v, base) => {
      const strings = withLevelInstruction(resolveStrings(type.id, 'en', type), type.id, lv, 'en');
      const r = await renderInstance({ type, theme: null, difficulty: lv, locale: 'en', strings, variant: v, page, outDir: OUTD, baseName: base });
      for (const x of ['.pdf', '.png', '.html']) try { fs.unlinkSync(path.join(OUTD, base + x)); } catch (e) {}
      return r;
    };
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
          if (v === 1) { const stk = await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom); return Math.round(Math.max(...ink) - rt.top); }); stacks.push(`${id.slice(3)} L${lv} ${stk}`); }
          if (v === (QUICK ? 1 : 2)) { const sw = await layoutSweep(t, lv, QUICK ? 30 : SEEDS); swept += sw.n; ok(!sw.faults.length, `${id} L${lv} layout sweep (${sw.n} distinct of ${QUICK ? 30 : SEEDS} generator seeds): ${sw.faults.slice(0, 4).join(' | ')}`); }
        }
        process.stdout.write(id + ' ');
      }
      console.log(`\nrender done (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
      const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); return { ...r, bodyHtml: fn(r.bodyHtml) }; } }; };
      const pr = async (name, id, lv, fn, re) => { const r = await render(spoilType(id, fn), lv, 1, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re); };
      // each render poison's control is the real page of the same type and level, rendered above (ok() on its verify)
      await pr('PR1 the page shrunk (a blank band at the bottom)', 'G3-612', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is|empty page under|page fills/);
      await pr('PR2 a place\'s dot moved 12 px (a distance not its inches)', 'G3-615', 2, (h) => h.replace(/(<circle cx=")([0-9.]+)(" cy="[0-9.]+" r="4" fill="#3A3530" data-s3-dot=")/, (m, a, x, b) => a + (+x + 12) + b), /inches on the page, the page says/);
      await pr('PR3 the town map drawn at 90% (its inch not an inch)', 'G3-615', 1, (h) => { const o = h.replace(/(<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="432" height="[0-9]+" viewBox="[^"]*") style="display:block;overflow:hidden"( data-lcs-prim="sk-art" data-s3-art="town-map")/, '$1 style="display:block;overflow:hidden;width:389px"$2'); if (o === h) throw new Error('PR3: no town map to shrink'); return o; }, /not at its own size|inches on the page/);
      await pr('PR4 the scale bar\'s mile not an inch', 'G3-615', 1, (h) => h.replace(/(data-s3-art="scale-bar"[^>]*>)/, '$1<g transform="scale(0.9 1)">').replace(/(data-s3-art="scale-bar"[\s\S]*?)(<\/svg>)/, '$1</g>$2'), /scale bar's mile is/);
      await pr('PR5 a place label over another place', 'G3-615', 2, (h) => { const m = /<circle cx="([0-9.]+)" cy="([0-9.]+)" r="4" fill="#3A3530" data-s3-dot="([a-z]+)"\/>/.exec(h); const other = [...h.matchAll(/data-s3-label="([a-z]+)"><rect x="([0-9.]+)" y="([0-9.]+)"/g)].find((x) => x[1] !== m[3]); return h.replace(other[0], `data-s3-label="${other[1]}"><rect x="${(+m[1] - 10).toFixed(1)}" y="${(+m[2] - 20).toFixed(1)}"`); }, /covers the/);
      await pr('PR6 a letter moved into the sea on one map', 'G3-617', 2, (h) => h.replace(/(<g data-s3-mark="A" data-s3-place="[a-z-]+"><circle cx=")([0-9.]+)/, (m, a) => a + '326'), /not on land|not at the same place/);
      await pr('PR7 a letter stamped few on a crowded place', 'G3-617', 2, (h) => { const L0 = /data-s3-mark="([A-D])" data-s3-place="(miami|jacksonville|chicago|cleveland)"/.exec(h)[1]; return h.replace(new RegExp(`(data-dk-item="${L0}"[\\s\\S]*?)data-dk-answer="right"( data-s3-people="many")`), '$1data-dk-answer="no"$2').replace(new RegExp(`(data-dk-item="${L0}"[\\s\\S]*?)data-dk-answer="no"( data-s3-people="few")`), '$1data-dk-answer="right"$2'); }, /the map shows many people/);
      await pr('PR8 the dot map with no dots', 'G3-617', 1, (h) => h.replace(/(<g data-s3-dots="\d+" fill="#3A3530">)[\s\S]*?<\/g>/, '$1</g>'), /draws no dots/);
      await pr('PR9 the dry site moved onto the river', 'G3-618', 2, (h) => h.replace(/(<g data-s3-site="dry"><circle cx=")([0-9.]+)(" cy=")([0-9.]+)/, (m, a, x, b) => a + (h.includes('data-s3-mirror="1"') ? 280 : 150) + b + '150'), /dry site is (not in the dry|near the river)/);
      await pr('PR10 a land word over a site', 'G3-618', 2, (h) => { const m = /<g data-s3-site="harbor"><circle cx="([0-9.]+)" cy="([0-9.]+)"/.exec(h); return h.replace(/(<g data-s3-landlabel="farmland"><rect x=")([0-9.]+)(" y=")([0-9.]+)/, (x, a, b, c) => a + (+m[1] - 20) + c + (+m[2] - 6)); }, /covers a site/);
      await pr('PR11 a timeline tick off its year', 'G3-625', 2, (h) => h.replace(/(<line x1=")([0-9.]+)(" y1="[0-9.]+" x2=")([0-9.]+)("[^>]*data-s3-tick="1900")/, (m, a, x, b, x2, c) => a + (+x + 6) + b + (+x2 + 6) + c), /tick of 1900 is off/);
      await pr('PR12 a column with one line fewer', 'G3-627', 2, (h) => h.replace(/(data-s3-column="human"[\s\S]*?)<div data-dk-box data-dk-blank="1" style="line-height:0;flex-shrink:0"><svg data-dk-writerow="1"[\s\S]*?<\/svg><\/div>/, '$1'), /the columns hold/);
      await pr('PR13 an off-palette colour in a drawing', 'G3-627', 2, (h) => h.replace(/fill="#F7E3C9"/, 'fill="#123456"'), /outside the SK palette/);
      await pr('PR14 a grown-up drawn smaller than the child beside them', 'G3-623', 2, (h) => h.replace(/(data-s3-art="problem"[\s\S]*?data-s2-grownup="jacket"[^>]*>\s*<g transform="translate\([0-9.]+ [0-9.]+\) scale\()0\.6 0\.6/, '$10.3 0.3'), /a grown-up \d+ px tall beside a child/);
      await pr('PR15 the banner\'s words past the banner', 'G3-614', 2, (h) => h.replace(/(<g data-s3-sign="VOTES FOR WOMEN"><rect x="[0-9.]+" y="[0-9.]+" width=")([0-9.]+)"/, '$140"').replace('data-s3-sign="VOTES FOR WOMEN"', 'data-s2-sign="VOTES FOR WOMEN"'), /runs past its sign/);
      await pr('PR16 a writing line 40 px', 'G3-629', 2, (h) => h.replace(/(data-s3-frame="reached"[\s\S]*?<svg data-dk-writerow="1"[^>]*?)width="[0-9.]+"/, '$1width="40"'), /a writing line \d+ px/);
      await pr('PR17 two boxes on top of each other', 'G3-622', 2, (h) => h.replace(/(<div class="dk-tile dk-tile--white" data-dk-box data-s3-chart="1"[^>]*style=")/, '$1margin-top:-90px;'), /two boxes collide|empty band/);
      await pr('PR18 an empty band inside a growing box', 'G3-628', 2, (h) => h.replace(/(data-s3-matchpart="1"[^>]*style="[^"]*)/, '$1;min-height:560px'), /empty box (above|below) its content|the stack/);
      await pr('PR19 every person one skin tone', 'G3-621', 1, (h) => h.replace(/data-sk-skin="s\d"/g, 'data-sk-skin="s3"'), /same skin tone/);
      await pr('PR20 the harbor site moved by the river', 'G3-618', 2, (h) => h.replace(/(<g data-s3-site="harbor"><circle cx=")([0-9.]+)(" cy=")([0-9.]+)/, (m, a, x, b) => a + (h.includes('data-s3-mirror="1"') ? 430 - 300 : 300) + b + '246'), /harbor site is not by the harbor|by the harbor too|near the river/);
      // fix round 1: each new render check with its poison
      await pr('PR21 a virtue line of 150 px', 'G3-612', 2, (h) => h.replace(/(data-s3-write="[a-z]+" data-dk-answer="[a-z]+"[^>]*><svg data-dk-writerow="1" xmlns="http:\/\/www.w3.org\/2000\/svg" )width="240"/, '$1width="150"'), /virtue line is 150 px/);
      await pr('PR22 a place\'s dot moved off its street', 'G3-615', 2, (h) => h.replace(/(<circle cx="[0-9.]+" cy=")([0-9.]+)(" r="4" fill="#3A3530" data-s3-dot=")/, (m, a, y, b) => a + (+y - 30) + b), /dot is not on a street/);
      await pr('PR23 a rule line half the width', 'G3-613', 2, (h) => h.replace(/(data-s3-frame="constitution"[\s\S]*?<svg data-dk-writerow="1" xmlns="http:\/\/www.w3.org\/2000\/svg" )width="[0-9.]+"([\s\S]*?<svg data-dk-writerow="1" xmlns="http:\/\/www.w3.org\/2000\/svg" )width="[0-9.]+"([\s\S]*?<svg data-dk-writerow="1" xmlns="http:\/\/www.w3.org\/2000\/svg" )width="[0-9.]+"/, '$1width="250"$2width="250"$3width="250"'), /long lines for/);
      await pr('PR24 the mine moved beside the dry site', 'G3-618', 2, (h) => h.replace('<g data-s3-drawn="mine">', `<g data-s3-drawn="mine" transform="translate(${h.includes('data-s3-mirror="1"') ? 60 : -60} 200)">`), /site is near the mine/);
      await pr('PR25 the payers with no tax box', 'G3-621', 1, (h) => h.replace('data-s3-drawn="tax-box"', 'data-x="1"'), /no tax box/);
      await pr('PR26 a service drawing box too small', 'G3-621', 2, (h) => h.replace(/(data-s3-drawbox="0" style="[^"]*?)height:\d+px/, '$1height:60px'), /drawing boxes/);
      // review round 2
      await pr('PR27 a service card with an empty band', 'G3-621', 1, (h) => h.replace(/(data-s3-servicebox="[a-z]+" data-s3-fill="[^"]*"[^>]*style=")/, '$1min-height:600px;'), /empty box (above|below) its content|the stack/);
      await pr('PR28 an empty band in the side column', 'G3-616', 2, (h) => h.replace(/(data-s3-box="title"[^>]*style=")/, '$1margin-bottom:70px;'), /empty band of \d+ px between its boxes/);
      await pr('PR29 a street-name plate too small to write in', 'G3-616', 1, (h) => h.replace(/(data-s3-streetname="across"><rect [^>]*?)width="[0-9.]+" height="[0-9.]+"/, '$1width="80" height="16"'), /across street's name plate is/);
      await pr('PR30 a key line too short', 'G3-616', 2, (h) => h.replace(/(data-s3-box="key"[\s\S]*?<svg data-dk-writerow="1"[^>]*?)width="150"/, '$1width="70"'), /key line 1 is/);
      await pr('PR31 the north arrow on the land', 'G3-618', 2, (h) => h.replace('<g data-s3-drawn="north-arrow">', '<g data-s3-drawn="north-arrow" transform="translate(-200 -60)">'), /north arrow sits on/);
      await pr('PR32 "(a veto)" broken across two lines', 'G3-620', 2, (h) => h.split('(a\u00a0veto)').join('(a veto)'), /breaks across two lines/);
      await pr('PR33 level 3\'s story smaller than level 2\'s', 'G3-628', 3, (h) => h.replace(/font-size:18px;line-height:25px/g, 'font-size:16px;line-height:23px'), /a story sentence at 16px/);
      // review round 3
      await pr('PR34 the up-down street\'s plate turned on its side', 'G3-616', 1, (h) => h.replace('<g data-s3-streetname="down">', '<g data-s3-streetname="down" transform="rotate(90 218 17)">'), /down street's name plate is turned on its side/);
      await pr('PR35 the up-down street\'s plate off its street', 'G3-616', 1, (h) => h.replace('<g data-s3-streetname="down">', '<g data-s3-streetname="down" transform="translate(70 0)">'), /down street's name plate is not on its street/);
      await pr('PR36 the land key without "other land"', 'G3-617', 2, (h) => h.replace(/<rect[^>]*data-s3-keyfill="#EFEBDD"\/>/, ''), /colour #EFEBDD has no key entry/);
      await pr('PR37 a land-map colour the key does not name', 'G3-617', 1, (h) => h.replace(/(data-s3-art="us-land"[\s\S]*?fill=")#D9D9D9"/, '$1#E2E0DA"'), /colour #E2E0DA has no key entry/);
    } finally { await browser.close(); }
    console.log('stacks (level 1-3, copy 1, measured on what is drawn): ' + stacks.join(', '));
    console.log(`layout sweep: ${swept} distinct pages of the generator's seeds 1..${QUICK ? 30 : SEEDS} judged by each type's own verify`);
  }
  // the Level Set words: distinct word sets in 30 copies a level
  const ls = IDS.map((id) => id.slice(3) + ' ' + [1, 2, 3].map((lv) => { const t = loadType(id); return new Set(Array.from({ length: 30 }, (_, s) => JSON.stringify(t.levelSetWords(buildPage(t, lv, s + 1).meta)))).size; }).join('/')).join(' · ');
  console.log('Level Set words (distinct of 30 copies a level): ' + ls);
  console.log('surface (the best a child could sort the cards by one cue alone; balanced accuracy, 50% is chance):');
  for (const [k, m] of Object.entries(MEASURED)) console.log(`  ${k}: ${m.cards} cards, ${m.kinds} kinds; top ${m.top.slice(0, 5).map(([w, a]) => `${w} ${(a * 100).toFixed(1)}%`).join(', ')}${m.req.length ? '; the level words the brief requires (not failed): ' + m.req.map(([w, a]) => `"${w}" ${(a * 100).toFixed(1)}%`).join(', ') : ''}`);
  console.log(plog.join('\n'));
  console.log(`poisons ${killed}/${poisons} killed`);
  ok(killed === poisons, `${poisons - killed} poisons not killed`);
  if (fails.length) { console.log('FAIL (' + fails.length + '):\n  ' + fails.slice(0, 60).join('\n  ')); process.exit(1); }
  console.log(`PASS (${assertions} assertions, ${SEEDS} seeds a level, ${BIG} for the sort and match types; ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, answerFaults, tellFaults, pageOf, surfaceOf, SURFACE_TYPES, matchPairsOf, matchSurfaceOf, buildPage, IDS };
