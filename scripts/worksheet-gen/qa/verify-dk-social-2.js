#!/usr/bin/env node
/**
 * verify-dk-social-2.js — the gate of the Batch S2 Grade 2 social studies pages (G2-614 .. G2-630; factory
 * types/_shared/dk-social-2.js + its drawings dk-social-2-art.js; bank data/social/dk-social-2.js; maps
 * data/social/dk-social-2-geo.js; Daily Teaching System Stage D-5, 2026-11-25).
 *
 *   node scripts/worksheet-gen/qa/verify-dk-social-2.js [--quick] [--seeds=400] [--no-render]
 *
 *   1. BANK: every closed item has ONE right answer by the gate's OWN tables (never the bank's word): the problem each law
 *      stops (no law shares a word with a problem; the two laws a child could argue over kept apart on level 1), the level
 *      of each leader, what is a government service, who changed each place (no sentence says "nature" or "people"; the
 *      times are mixed across the kinds), the flood's three changes, the kit's things, the hurricane coasts, the winter
 *      traditions (symbol, country, sentences of 12 words or fewer, "many families", never "we all"; the map names no
 *      country where one of the three is widely kept besides the right one), the sample labels and their countries (on
 *      the Natural Earth map), imports and exports, the islands' one trade cycle, the two stories (each sentence wholly a
 *      fact both tell or one only one tells), the town histories (one clue sentence naming the reason and the growth; no
 *      wrong reason mentioned), tools and skills, the lemonade costs (whole dollars, no total equal to what a price brings
 *      in), what banks do, the market coins. Every library picture is in the manifest, on disk, colour, not refused; every
 *      colour the drawings write is in PAL2; the maps are Natural Earth's (the module's source hash).
 *   2. BUILD, `--seeds` copies of every type at every level: the stamps agree with the gate's tables; NO POSITIONAL TELL
 *      (pooled within a band of chance: the answer letters, the right choice's place, the splits, the reason's place, the
 *      dearer price, the coins that pay on a tray, the order of leaders, the islands' places); the three levels differ;
 *      another locale refuses; record pages carry no answer; numbers within 1,000 (years are dates); no "free".
 *   3. RENDER (the print pipeline), every type x level, 2 copies (1 with --quick): verify() (the Batch K page checks, the
 *      Grade 1 groups and frames, the SK palette and skin tones, the S1 checks (match dots and partners, the page fills its
 *      body, the coins at their real size) and the S2 checks (map labels apart and inside, the star in the United States,
 *      the flood's three changes and the number asked, the menorah and the kinara, writing lines long enough, the town's
 *      places apart, no empty band inside a growing box, the photograph in greys)) and qa/lints.js clean. Then the LAYOUT
 *      SWEEP: the generator's own seeds 1..SEEDS, every DISTINCT page swapped into the rendered page and judged by its
 *      type's own verify.
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
const B = require(path.join(WG, 'data', 'social', 'dk-social-2.js'));
const B1 = require(path.join(WG, 'data', 'social', 'dk-social-1.js'));
const GEO = require(path.join(WG, 'data', 'social', 'dk-social-2-geo.js'));
const ART = require(path.join(WG, 'types', '_shared', 'dk-social-2-art.js'));
const MAN = require(path.join(WG, 'cache', 'manifest.json'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const NO_RENDER = process.argv.includes('--no-render');
const SEEDS = Number(arg('seeds', QUICK ? '60' : '400'));
const IDS = Array.from({ length: 17 }, (_, k) => 'G2-' + (614 + k));
const clone = (x) => JSON.parse(JSON.stringify(x));
const key = (p) => p.theme + '/' + p.noun;
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
const STOP = new Set(['the', 'and', 'for', 'with', 'your', 'you', 'not', 'are', 'its', 'on', 'at', 'in', 'do', 'a', 'an']);
const words = (t) => (t.toLowerCase().match(/[a-z]+/g) || []).filter((w) => w.length >= 3 && !STOP.has(w));
const stem = (w) => w.replace(/(ing|es|s)$/, '');
/** G2-615: the problem each law stops; two laws a child could argue over on a page of two (a crash can hurt a head) */
const LAW_OWN = { red: 'crash', leash: 'chase', litter: 'trash', helmet: 'head' };
const LAW_CONFUSE_OWN = [['red', 'helmet']];
/** G2-616: the level of each leader (the brief: local the mayor and the city council, state the governor, national the
 *  president and Congress) */
const GOV_OWN = { mayor: 'local', council: 'local', governor: 'state', president: 'national', congress: 'national' };
/** G2-617: government services (the brief's list) and businesses */
const SERVICE_OWN = { library: 'service', park: 'service', fire: 'service', road: 'service', school: 'service', mail: 'service', toys: 'business', pizza: 'business' };
/** G2-618: who changed each place */
const CHANGE_OWN = { hill: 'nature', desert: 'nature', pond: 'nature', beach: 'nature', village: 'people', field: 'people', garden: 'people' };
const TIME_PHRASES = [/long ago and today/, /in winter and in (summer|spring)/, /in spring and in summer/, /dry and after/];
/** G2-619 */
const FLOOD_OWN = ['road-water', 'school-closed', 'boat-helpers'];
const KIT_OWN = new Set(['water', 'flashlight', 'food', 'first-aid', 'batteries', 'radio', 'medicine']);
const COAST_OWN = { atlantic: true, gulf: true, pacific: false };
/** G2-620: each tradition's symbol and the country where it BEGAN (review round 1, row 23: "where it is widely kept" had
 *  two answers; the line goes to where it began: Las Posadas Mexico, Kwanzaa the United States, Lunar New Year China,
 *  Hanukkah long ago in Israel); the countries where one of those three is ALSO widely kept (never named on the map as a
 *  wrong one) */
const TRAD_OWN = { hanukkah: ['menorah', 'ISR'], christmas: ['tree', null], kwanzaa: ['kinara', 'USA'], posadas: ['pinata', 'MEX'], lunar: ['red-envelope', 'CHN'] };
const TRAD_ALSO = new Set(['GTM', 'CAN', 'VNM', 'KOR', 'PRK', 'TWN', 'SGP', 'MYS', 'MNG']);
const TRAD_NAME_OWN = { hanukkah: 'Hanukkah', christmas: 'Christmas', kwanzaa: 'Kwanzaa', posadas: 'Posadas', lunar: 'Lunar New Year' };
/** G2-621: the sample labels */
const ORIGIN_OWN = { banana: 'ECU', avocado: 'MEX', tshirt: 'VNM', coffee: 'COL' };
const COUNTRY_NAME_OWN = { ECU: 'Ecuador', MEX: 'Mexico', VNM: 'Vietnam', COL: 'Colombia', USA: 'United States', CHN: 'China', BRA: 'Brazil', IND: 'India', CAN: 'Canada', PER: 'Peru' };
/** G2-622: the brief: the United States buys bananas, cocoa and coffee; sells airplanes, soybeans and corn */
const TRADE_OWN = { banana: 'in', cocoa: 'in', coffee: 'in', airplane: 'out', soybeans: 'out', corn: 'out' };
/** G2-624: the facts both tellers tell, per day (by the gate's reading of the stories) */
const BOTH_OWN = { library: ['open', 'crowd', 'puppets'], parade: ['day', 'band', 'truck'], playground: ['open', 'sun', 'kids'] };
/** G2-626: per history, the clue sentence (0-based) and the words of the right reason */
const TOWN_OWN = { railroad: [3, 'railroad'], bridge: [3, 'bridge'], factory: [2, 'factory'], highway: [3, 'highway'] };
const GROWTH = /new (stores|houses|families|shops|homes)|families moved|moved to/;
/** G2-627 */
/** review round 1 (row 43): a skill is what a worker knows, read after "The baker uses or knows:" (how / when / which / a
 *  way to / a recipe for); a tool keeps "a" or "an"; over the copies, neither the first word nor the number of words sorts
 *  the cards better than SURFACE_MAX (the thought bubble, which IS the concept, is the only thing that does) */
const SKILL_FORM = /^(how (to|long)|when to|which|a (good )?(way|time) to|the steps to)\b/;
/** review round 2 (row 51): the thought bubbles a skill may show (each read: nothing in them is a paper, a book or a sign;
 *  the old recipe card, building-plan sheet, seed packets and calendar are refused) */
const THINK_OWN = new Set(['steps', 'bread-done', 'dough', 'sun-seed', 'sprouts', 'cow', 'house-idea', 'measure', 'wall']);
/** round 1's wording (the poison for the every-word measure: "to" and "for" sorted the cards 81-85%) */
const ROUND1_WORDS = { oven: 'an oven for baking', mixer: 'a mixer for dough', 'rolling-pin': 'a rolling pin', whisk: 'a whisk for eggs', tractor: 'a tractor for the fields', 'watering-can': 'a watering can', shovel: 'a shovel for digging', wheelbarrow: 'a wheelbarrow for dirt', drill: 'a drill for making holes', hammer: 'a hammer for nails', saw: 'a saw for cutting wood', ladder: 'a ladder to reach high', steps: 'a recipe for bread', 'bake-time': 'how long to bake bread', shape: 'a way to shape dough', 'when-plant': 'when to plant seeds', 'which-seeds': 'which seeds grow best', cows: 'a way to keep cows healthy', plan: 'how to read a building plan', measure: 'a good way to measure wood', wall: 'a way to build a strong wall' };
const SURFACE_MAX = 0.75;
const TOOL_OWN = { oven: 'tool', mixer: 'tool', 'rolling-pin': 'tool', whisk: 'tool', tractor: 'tool', 'watering-can': 'tool', shovel: 'tool', wheelbarrow: 'tool', drill: 'tool', hammer: 'tool', saw: 'tool', ladder: 'tool', steps: 'skill', 'bake-time': 'skill', shape: 'skill', 'when-plant': 'skill', 'which-seeds': 'skill', cows: 'skill', plan: 'skill', measure: 'skill', wall: 'skill' };
/** G2-628 */
const LEMON_NEEDS_OWN = { 3: ['lemons', 'sugar', 'cups'], 4: ['lemons', 'sugar', 'cups', 'sign'] };
const LEMON_CUPS_OWN = 10, LEMON_PRICES_OWN = [20, 50, 100];
/** G2-629: the picture and the sentence it shows; the savings statement's little extra (review round 1: whole dollars, at
 *  most 2 cents a dollar, like a real savings account's year) */
const STATEMENT_MAX_SHARE = 0.02;
const BANK_OWN = { safe: /keeps money safe/, interest: /pays savers interest/, loan: /lends money/ };
/** G2-630 (the US coins: US Mint values) */
const COIN_OWN = { penny: 1, nickel: 5, dime: 10, quarter: 25 };
const MARKET_OWN = { 1: { coins: ['penny', 'nickel', 'dime'], min: 10, max: 50 }, 2: { coins: ['penny', 'nickel', 'dime', 'quarter'], min: 26, max: 100 }, 3: { coins: ['penny', 'nickel', 'dime', 'quarter'], min: 26, max: 100 } };
function waysOwn(coins, price) {
  const kinds = [...new Set(coins)], have = kinds.map((k) => coins.filter((x) => x === k).length), val = kinds.map((k) => COIN_OWN[k]);
  const out = [];
  const walk = (i, left, pick) => { if (i === kinds.length) { if (left === 0 && pick.some((n) => n > 0)) out.push(Object.fromEntries(kinds.map((k, j) => [k, pick[j]]).filter((e) => e[1] > 0))); return; } for (let n = 0; n <= have[i] && n * val[i] <= left; n++) { pick[i] = n; walk(i + 1, left - n * val[i], pick); } pick[i] = 0; };
  walk(0, price, kinds.map(() => 0));
  return out;
}
const wayOwnKey = (w) => ['penny', 'nickel', 'dime', 'quarter'].filter((k) => w[k]).map((k) => k + ':' + w[k]).join(',');
const REFUSED_ART = { 'occupations/baker': 'light-skinned', 'occupations/farmer': 'light-skinned', 'christmas/bell': 'not a tradition symbol', 'thanksgivinng/pie': 'a lattice pie' };
const isBw = (theme) => /\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)\b/i.test(theme);
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
  for (const [k, v] of Object.entries(b)) if (typeof v !== 'function') walk(v, k);
  return out;
}
const sentencesOf = (t) => t.split(/(?<=[.!?])\s+/).filter(Boolean);
const wc = (s) => (s.match(/[A-Za-zñ'-]+/g) || []).length;
const HEX = /#[0-9A-Fa-f]{6}\b/g;

/* ================================================================ 1. the bank */
function bankFaults(b, art = ART, geo = GEO) {
  const f = [];
  // laws
  for (const l of b.LAWS) { if (LAW_OWN[l.id] !== l.problem) f.push(`law ${l.id}: the bank says ${l.problem} (the gate: ${LAW_OWN[l.id] || 'no ruling'})`); }
  if (new Set(b.LAWS.map((l) => l.problem)).size !== b.LAWS.length) f.push('two laws share one problem');
  for (const l of b.LAWS) for (const [pid, pt] of Object.entries(b.PROBLEMS)) for (const w of words(l.text)) for (const pw of words(pt)) if (stem(w) === stem(pw)) f.push(`law ${l.id} and the problem "${pt}" share "${w}" (a word match, not a reason)`);
  for (const [a, c] of LAW_CONFUSE_OWN) if (!b.LAW_CONFUSABLE.some(([x, y]) => (x === a && y === c) || (x === c && y === a))) f.push(`the ${a} / ${c} laws are not kept apart on level 1`);
  // government
  for (const l of b.GOV_LEADERS) if (GOV_OWN[l.id] !== l.level) f.push(`leader ${l.id}: the bank says ${l.level} (the gate: ${GOV_OWN[l.id] || 'no ruling'})`);
  if (!/^A government is the people who make laws and run services for a place\.$/.test(b.GOV_DEFINITION)) f.push('the definition of a government is not the brief\'s');
  for (const l of b.GOV_LEADERS) if (/[A-Z][a-z]+ [A-Z][a-z]+/.test(l.word.replace('Congress', ''))) f.push(`leader ${l.id}: "${l.word}" names a person (every leader is a role)`);
  // services
  for (const p of b.SERVICE_PLACES) if (SERVICE_OWN[p.id] !== p.kind) f.push(`place ${p.id}: the bank says ${p.kind} (the gate: ${SERVICE_OWN[p.id] || 'no ruling'})`);
  // places that change
  for (const x of b.PLACE_CHANGES) { if (CHANGE_OWN[x.id] !== x.kind) f.push(`change ${x.id}: the bank says ${x.kind} (the gate: ${CHANGE_OWN[x.id] || 'no ruling'})`); if (/\b(nature|natural|people|person)\b/i.test(x.text)) f.push(`change ${x.id}: "${x.text}" says who changed it (the answer)`); }
  for (const kind of ['nature', 'people']) { const ph = new Set(b.PLACE_CHANGES.filter((x) => x.kind === kind).map((x) => (TIME_PHRASES.findIndex((re) => re.test(x.text))))); if (!ph.has(0) || ph.size < 2) f.push(`the ${kind} changes do not mix "long ago and today" with the seasons (the time words would tell the kind)`); }
  if (b.CHANGE_CHOICES.nature !== 'Nature changed this place.' || b.CHANGE_CHOICES.people !== 'People changed this place.') f.push('the change choices are not "Nature / People changed this place."');
  // review round 1 (row 16): no sea-ice pair (a child can defend "people changed it": warming)
  for (const x of b.PLACE_CHANGES) if (/sea.?ice|arctic|polar|glacier/i.test(x.id + ' ' + x.text)) f.push(`change ${x.id}: a sea-ice / Arctic pair ("people changed it" can be defended)`);
  // flood, kit, coasts
  if (b.FLOOD_CHANGES.slice().sort().join() !== FLOOD_OWN.slice().sort().join()) f.push(`the flood changes are ${b.FLOOD_CHANGES.join(', ')} (the gate: ${FLOOD_OWN.join(', ')})`);
  for (const x of b.KIT) if (!KIT_OWN.has(x.id)) f.push(`the kit holds "${x.word}", not a thing a family keeps in an emergency kit`);
  for (const c of b.COASTS) if (COAST_OWN[c.id] !== c.hurricanes) f.push(`the ${c.id} coast: hurricanes ${c.hurricanes} (the gate: ${COAST_OWN[c.id]})`);
  if (b.COASTS.some((c) => /mexico|america/i.test(c.word))) f.push('a coast is named after the gulf (its name differs between maps: say "Gulf coast")');
  // traditions
  for (const t of b.TRADITIONS) {
    const o = TRAD_OWN[t.id];
    if (!o) { f.push(`tradition ${t.id}: no ruling`); continue; }
    if (o[0] !== t.symbol) f.push(`tradition ${t.id}: symbol ${t.symbol} (the gate: ${o[0]})`);
    if (o[1] !== t.country) f.push(`tradition ${t.id}: country ${t.country} (the gate: ${o[1]})`);
    for (const s of sentencesOf(t.text)) if (wc(s) > 12) f.push(`tradition ${t.id}: "${s}" has ${wc(s)} words (12 or fewer)`);
    if (/\bwe all\b|\bbest\b|\bbetter\b|\bonly true\b/i.test(t.text)) f.push(`tradition ${t.id}: "${t.text}" ranks or says "we all"`);
    if (o[1] && b.TRADITION_MAP.lines.includes(t.id) && !new RegExp('(began in|from) (the )?' + (COUNTRY_NAME_OWN[o[1]] || '§')).test(t.text)) f.push(`tradition ${t.id}: its sentence does not say it began in ${COUNTRY_NAME_OWN[o[1]]}`);
    // review round 1 (row 24): a card never names another tradition of the page ("a Christmas tradition" pulled Las
    // Posadas to the tree)
    for (const [oid, nm] of Object.entries(TRAD_NAME_OWN)) if (oid !== t.id && new RegExp('\\b' + nm + '\\b', 'i').test(t.text)) f.push(`tradition ${t.id}: its card names ${nm}, another tradition of the page`);
  }
  if (!/^Many Jewish families light a menorah/.test(b.TRADITIONS.find((t) => t.id === 'hanukkah').text)) f.push('the Hanukkah sentence is not the design\'s');
  for (const c of b.TRADITION_MAP.others) { if (TRAD_ALSO.has(c) || Object.values(TRAD_OWN).some((o) => o[1] === c)) f.push(`the traditions map names ${c}, where one of the three is widely kept (a child could defend it)`); if (!geo.WORLD.countries[c]) f.push(`the traditions map names ${c}, not on the map`); }
  // origins
  for (const x of b.ORIGINS) { if (ORIGIN_OWN[x.id] !== x.country) f.push(`origin ${x.id}: ${x.country} (the gate: ${ORIGIN_OWN[x.id]})`); if (!new RegExp(COUNTRY_NAME_OWN[ORIGIN_OWN[x.id]]).test(x.label)) f.push(`origin ${x.id}: the label "${x.label}" does not name ${COUNTRY_NAME_OWN[ORIGIN_OWN[x.id]]}`); if (!geo.WORLD.countries[x.country]) f.push(`origin ${x.id}: ${x.country} is not on the map`); }
  for (const c of b.ORIGIN_MAP_OTHERS) if (b.ORIGINS.some((x) => x.country === c)) f.push(`the origins map names ${c} as another country and as a label's`);
  // trade
  for (const x of b.TRADE_GOODS) { if (TRADE_OWN[x.id] !== x.way) f.push(`trade ${x.id}: ${x.way} (the gate: ${TRADE_OWN[x.id]})`); if (wc(x.fact) > 12) f.push(`trade ${x.id}: the fact has ${wc(x.fact)} words`); if ((x.way === 'out') !== /United States/.test(x.fact)) f.push(`trade ${x.id}: the fact does not say where it is made (${x.fact})`); }
  // islands: every island needs a thing exactly one other island makes; the needs make one cycle
  for (const set of [b.ISLANDS, b.ISLANDS_TWO]) { for (const I of set) { const makers = set.filter((J) => J.makes === I.needs); if (makers.length !== 1 || makers[0].id === I.id) f.push(`island ${I.id}: ${makers.length} islands make what it needs`); } }
  // accounts
  for (const ev of b.ACCOUNTS) {
    const own = new Set(BOTH_OWN[ev.id] || []);
    const both = new Set(ev.a.sentences.map((s) => s[0]).filter((id) => ev.b.sentences.some((t) => t[0] === id)));
    if ([...own].sort().join() !== [...both].sort().join()) f.push(`${ev.id}: the facts both tell are ${[...both].join(', ')} (the gate: ${[...own].join(', ')})`);
    for (const st of [ev.a, ev.b]) { for (const [, t] of st.sentences) if (wc(t) > 12) f.push(`${ev.id}: "${t}" has ${wc(t)} words`); if (st.sentences.filter((s) => !both.has(s[0])).length < 2) f.push(`${ev.id}: ${st.who} tells fewer than two facts of their own`); }
    for (const st of [ev.a, ev.b]) if (!['f', 'm'].includes(st.sex)) f.push(`${ev.id}: ${st.who} has no sex to draw them by (a girl named Ava drawn as a boy)`);
    for (const st of [ev.a, ev.b]) for (const [, t] of st.sentences) if (/\bchips\b/i.test(t) && !/\bwood chips\b/i.test(t)) f.push(`${ev.id}: "${t}" says chips (a child reads potato chips: wood chips)`);
  }
  // towns
  for (const h of b.TOWNS) {
    const o = TOWN_OWN[h.id];
    if (!o) { f.push(`town ${h.id}: no ruling`); continue; }
    if (h.clue !== o[0]) f.push(`town ${h.id}: the clue is sentence ${h.clue} (the gate: ${o[0]})`);
    const clues = h.sentences.filter((s) => new RegExp(o[1]).test(s.toLowerCase()) && GROWTH.test(s.toLowerCase()));
    if (clues.length !== 1 || clues[0] !== h.sentences[o[0]]) f.push(`town ${h.id}: ${clues.length} sentences name the reason and the growth (one)`);
    for (const s of h.sentences) if (wc(s) > 12) f.push(`town ${h.id}: "${s}" has ${wc(s)} words`);
    if (!new RegExp(o[1]).test(h.reason.toLowerCase())) f.push(`town ${h.id}: the right reason "${h.reason}" is not the ${o[1]}`);
    for (const w of b.TOWN_WRONG) for (const ww of words(w)) if (!['people', 'liked', 'big', 'lot', 'famous'].includes(ww) && h.sentences.join(' ').toLowerCase().includes(stem(ww))) f.push(`town ${h.id}: the wrong reason "${w}" is mentioned in the story ("${ww}")`);
  }
  // tools
  for (const p of b.PRODUCERS) { for (const x of p.tools) if (TOOL_OWN[x.id] !== 'tool') f.push(`${p.id}: ${x.id} is a tool (the gate: ${TOOL_OWN[x.id] || 'no ruling'})`); for (const x of p.skills) { if (TOOL_OWN[x.id] !== 'skill') f.push(`${p.id}: ${x.id} is a skill (the gate: ${TOOL_OWN[x.id] || 'no ruling'})`); if (!SKILL_FORM.test(x.word)) f.push(`${p.id}: the skill "${x.word}" does not say what the worker knows how to do`); if (!THINK_OWN.has(x.think)) f.push(`${p.id}: the skill ${x.id}'s bubble "${x.think}" is not one the gate has read (never a paper, a book or a sign)`); } for (const x of p.tools) { if (!Array.isArray(x.grip) || !Array.isArray(x.ink) || !(x.size > 0)) f.push(`${p.id}: the tool ${x.id} has no grip, ink or size (its hand would float)`); else if (x.grip[0] < (x.flip ? 1 - x.ink[2] : x.ink[0]) || x.grip[0] > (x.flip ? 1 - x.ink[0] : x.ink[2]) || x.grip[1] < x.ink[1] || x.grip[1] > x.ink[3]) f.push(`${p.id}: the tool ${x.id}'s grip lies outside its drawing`); } for (const x of p.tools) if (!/^an? /.test(x.word)) f.push(`${p.id}: the tool "${x.word}" is not named with a or an`); }
  // lemonade
  for (const x of b.LEMON_NEEDS) if (x.price.some((p) => !Number.isInteger(p) || p < 1 || p > 5)) f.push(`lemonade ${x.id}: a price not in whole dollars 1-5`);
  if (b.LEMON_CUPS !== LEMON_CUPS_OWN || b.LEMON_PRICES.join() !== LEMON_PRICES_OWN.join()) f.push('the lemonade cups or prices are not the gate\'s');
  for (const c of b.LEMON_PRICES) if ((c * b.LEMON_CUPS) % 100) f.push(`lemonade: ${b.LEMON_CUPS} cups at ${c} cents bring in a mixed amount (Grade 2: whole dollars)`);
  // banks
  for (const x of b.BANK_JOBS) if (!BANK_OWN[x.id] || !BANK_OWN[x.id].test(x.sentence)) f.push(`bank ${x.id}: "${x.sentence}" (the gate: ${BANK_OWN[x.id]})`);
  { const S = b.BANK_STATEMENT; if (!Number.isInteger(S.start) || !Number.isInteger(S.added) || S.added < 1 || S.added / S.start > STATEMENT_MAX_SHARE || S.start + S.added > 1000) f.push(`the savings statement adds $${S.added} to $${S.start} (a little extra: whole dollars, at most ${STATEMENT_MAX_SHARE * 100} cents a dollar, within 1,000)`); }
  // market
  for (const lv of [1, 2, 3]) { const L = b.MARKET2[lv], O = MARKET_OWN[lv]; if (L.coins.join() !== O.coins.join() || L.min !== O.min || L.max !== O.max) f.push(`market level ${lv}: the coins or prices are not the gate's`); if (!L.coins.includes(L.top)) f.push(`market level ${lv}: the coin always on a tray is not one of its coins`); }
  // pictures and colours
  for (const [p, where] of bankPictures(b)) f.push(...artFaults(p, where));
  const src = fs.readFileSync(path.join(WG, 'types', '_shared', 'dk-social-2-art.js'), 'utf8');
  const pal = new Set([...art.PAL2].map((c) => c.toUpperCase()));
  for (const h of new Set((src.match(HEX) || []).map((c) => c.toUpperCase()))) if (!pal.has(h)) f.push(`the drawings write ${h}, outside PAL2`);
  if (!/^[0-9a-f]{64}$/.test(geo.SOURCE_SHA256)) f.push('the maps carry no Natural Earth source hash');
  return f;
}

/* ================================================================ 2. build sweep */
const picsOf = (html) => [...html.matchAll(/data-dk-pic="([^"]+)"/g)].map((m) => { const s = dec(m[1]); const i = s.lastIndexOf('/'); return { theme: s.slice(0, i), noun: s.slice(i + 1) }; });
/** a page's stamps, read from the html */
function pageOf(r) {
  const h = r.bodyHtml;
  const divEnd = (str) => { let d = 0; const re = /<div\b|<\/div>/g; let m; while ((m = re.exec(str))) { if (m[0] === '</div>') { d--; if (d === 0) return m.index; } else d++; } return str.length; };
  const groups = h.split(/(?=<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item=")|(?=<div data-dk-box data-g1-one="1" data-dk-item=")/).slice(1).map((seg) => { const id = /data-dk-item="([^"]+)"/.exec(seg)[1]; const body = seg.slice(0, divEnd(seg)); const choices = [...body.matchAll(/<[a-z]+\b[^>]*data-dk-answer="([^"]+)"[^>]*>/g)].filter((m) => /data-s2-pick="/.test(m[0])).map((m) => { const tag = m[0]; const k = /data-s2-(kind|reason|price)="([^"]+)"/.exec(tag); return [k ? dec(k[2]) : '?', m[1]]; }); return { id, choices }; });
  const stamps = [...h.matchAll(/data-s2-([a-z-]+)="([^"]*)"(?: [^>]*?)?data-dk-answer="([^"]+)"/g)].map((m) => [m[1], dec(m[2]), m[3]]);
  const lefts = [...h.matchAll(/data-s1-key="([^"]+)" data-dk-answer="([^"]+)"/g)].map((m) => [m[1], m[2]]);
  const rights = [...h.matchAll(/data-s1-key="([^"]+)" data-s1-right="1"/g)].map((m) => m[1]);
  const trays = h.split(/(?=<div class="dk-row" data-dk-box data-s2-tray=")/).slice(1).map((seg) => { const m = /data-s2-tray="([^"]+)" data-s2-price="(\d+)" data-dk-answer="([^"]+)"/.exec(seg); const body = seg.slice(0, divEnd(seg)); return { item: m[1], price: +m[2], way: m[3], coins: [...body.matchAll(/<span data-dk-box data-s2-coin="([a-z]+)"/g)].map((x) => x[1]) }; });
  const skins = [...h.matchAll(/data-sk-skin="(s\d)"/g)].map((m) => m[1]);
  return { meta: r.meta, groups, stamps, lefts, rights, trays, skins, html: h };
}
const st = (p, kind) => p.stamps.filter((s) => s[0] === kind);
function bandFaults(what, counts, total, expect, minTol) { const f = []; counts.forEach((c, i) => { const s = c / total, tol = Math.max(minTol, 3 * Math.sqrt(expect[i] * (1 - expect[i]) / total)); if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds it ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); }); return f; }
const badOrderOwn = (bits) => { const s = bits.map((x) => (x ? 1 : 0)).join(''); return /^(1+|0+)$/.test(s) && s.length >= 3 || (s.length >= 4 && (/^(10)+1?$/.test(s) || /^(01)+0?$/.test(s))) || (s.length >= 6 && (/^1+0+$/.test(s) || /^0+1+$/.test(s))); };
const rightAt = (g) => g.choices.findIndex((c) => c[1] === 'right');

/** the stamps a page carries agree with the gate's own tables */
function answerFaults(id, lv, p) {
  const f = [], h = p.html;
  const record = id === 'G2-614' || (id === 'G2-625');
  if (record && /data-dk-answer=/.test(h)) f.push(`${id}: a record page carries an answer`);
  if (!record && !/data-dk-answer=/.test(h)) f.push(`${id}: a closed page carries no answer`);
  for (const g of p.groups) { const r = g.choices.filter((c) => c[1] === 'right'); if (r.length !== 1) f.push(`${id}: ${g.id} has ${r.length} right choices`); }
  if (id === 'G2-615') {
    const problems = [...h.matchAll(/data-s2-problem="([a-z]+)"/g)].map((m) => m[1]);
    for (const [, lid, letter] of st(p, 'write')) { const want = 'ABCD'[problems.indexOf(LAW_OWN[lid])]; if (letter !== want) f.push(`${id}: the law ${lid} stamped ${letter} (the gate: ${want})`); }
    if (st(p, 'write').length !== (lv === 1 ? 2 : 4)) f.push(`${id}: ${st(p, 'write').length} laws (level ${lv})`);
    if (problems.length !== st(p, 'write').length) f.push(`${id}: ${problems.length} problems for ${st(p, 'write').length} laws`);
    if (lv === 1) for (const [a, c] of LAW_CONFUSE_OWN) if (st(p, 'write').some((s) => s[1] === a) && st(p, 'write').some((s) => s[1] === c)) f.push(`${id}: level 1 puts the ${a} and ${c} laws on one page`);
  }
  if (id === 'G2-616') { const ls = st(p, 'leader'); for (const [, lid, a] of ls) if (GOV_OWN[lid] !== a) f.push(`${id}: ${lid} stamped ${a} (the gate: ${GOV_OWN[lid]})`); if (ls.length !== (lv === 1 ? 3 : 5)) f.push(`${id}: ${ls.length} leaders (level ${lv})`); if (lv === 1 && ls.map((s) => s[1]).sort().join() !== 'governor,mayor,president') f.push(`${id}: level 1 leaders are not the mayor, the governor and the president`); }
  if (id === 'G2-617') { const ps = st(p, 'place'); for (const [, pid, a] of ps) if (SERVICE_OWN[pid] !== a) f.push(`${id}: ${pid} stamped ${a} (the gate: ${SERVICE_OWN[pid]})`); const sv = ps.filter((s) => s[2] === 'service').length, bz = ps.filter((s) => s[2] === 'business').length; if (lv === 1 ? sv !== 4 || bz !== 1 : sv !== 6 || bz !== 2) f.push(`${id}: ${sv} services and ${bz} businesses (level ${lv})`); }
  if (id === 'G2-618') { for (const g of p.groups) { const k = CHANGE_OWN[g.id], r = g.choices.find((c) => c[1] === 'right'); if (!r || r[0] !== k) f.push(`${id}: ${g.id} stamped ${r && r[0]} (the gate: ${k})`); } if (p.groups.length !== (lv === 1 ? 2 : 3)) f.push(`${id}: ${p.groups.length} pairs (level ${lv})`); }
  if (id === 'G2-619') { const ch = st(p, 'change').map((s) => s[1]).sort(); if (ch.join() !== FLOOD_OWN.slice().sort().join()) f.push(`${id}: the after picture stamps ${ch.join(', ')}`); const co = st(p, 'coastlabel'); if (lv === 3) { for (const [, c, a] of co) if ((a === 'hurricane') !== COAST_OWN[c]) f.push(`${id}: the ${c} coast stamped ${a}`); if (co.length !== 3) f.push(`${id}: ${co.length} coasts`); } else if (co.length) f.push(`${id}: the coasts below level 3`); if ((lv >= 2) !== /data-s2-kit="1"/.test(h)) f.push(`${id}: the kit at level ${lv}`); }
  if (id === 'G2-620') { for (const [l, a] of p.lefts) if (TRAD_OWN[l][0] !== a) f.push(`${id}: ${l} matched to ${a} (the gate: ${TRAD_OWN[l][0]})`); if (p.rights.slice().sort().join() !== p.lefts.map((c) => c[1]).sort().join()) f.push(`${id}: the symbols are not the sentences' partners, once each`); for (const [, t, a] of st(p, 'tag')) if (TRAD_OWN[t][1] !== a) f.push(`${id}: the ${t} tag stamped ${a}`); if (p.lefts.length !== (lv === 1 ? 3 : 5)) f.push(`${id}: ${p.lefts.length} traditions`); if ((lv === 3) !== /data-s2-map="traditions"/.test(h)) f.push(`${id}: the map at level ${lv}`); }
  if (id === 'G2-621') { for (const [, o, a] of st(p, 'origin')) if (ORIGIN_OWN[o] !== a) f.push(`${id}: ${o} stamped ${a}`); const labels = [...h.matchAll(/data-s2-label="([A-Z]{3})"/g)].map((m) => m[1]); for (const [, , a] of st(p, 'origin')) if (!labels.includes(a)) f.push(`${id}: the map does not name ${a}`); const picks = [...h.matchAll(/data-s2-pick="([A-Z]{3})"/g)].map((m) => m[1]).sort(); const want = lv === 1 ? st(p, 'origin').map((s) => s[2]).sort() : []; if (picks.join() !== want.join()) f.push(`${id}: the outlined countries are ${picks.join(',') || 'none'} (level ${lv}: ${want.join(',') || 'none'})`); if (!/data-s2-star="1"/.test(h)) f.push(`${id}: no star`); if (lv === 1 && picks.includes('ECU') && picks.includes('COL')) f.push(`${id}: Ecuador and Colombia outlined together at level 1 (the two touch and read as one shape)`); const wantAttr = (/data-s2-want="([A-Z,]*)"/.exec(h) || [])[1] || ''; if (wantAttr.split(',').filter(Boolean).sort().join() !== st(p, 'origin').map((s) => s[2]).sort().join()) f.push(`${id}: the map's asked countries (${wantAttr}) are not the labels' countries`); }
  if (id === 'G2-622') { const t = st(p, 'trade'); for (const [, x, a] of t) if (TRADE_OWN[x] !== a) f.push(`${id}: ${x} stamped ${a}`); if (t.length !== (lv === 1 ? 4 : 6)) f.push(`${id}: ${t.length} products`); }
  if (id === 'G2-623') { const isl = st(p, 'trade-need'); for (const [, iid, a] of isl) { const set = lv === 1 ? B.ISLANDS_TWO : B.ISLANDS; const me = set.find((x) => x.id === iid), giver = set.find((x) => x.makes === me.needs); if (a !== me.needs + '<-' + giver.id) f.push(`${id}: ${iid} stamped ${a}`); } if (isl.length !== (lv === 1 ? 2 : 3)) f.push(`${id}: ${isl.length} islands`); }
  if (id === 'G2-624') { const ev = p.meta.event, own = new Set(BOTH_OWN[ev]); for (const [, sid, a] of st(p, 'sent')) { const idd = sid.split(':')[1]; if ((own.has(idd) ? 'both' : 'one') !== a) f.push(`${id}: ${sid} stamped ${a}`); } const sa = st(p, 'sent').filter((s) => s[1].startsWith('a:')), sb = st(p, 'sent').filter((s) => s[1].startsWith('b:')); for (const ss of [sa, sb]) { if (ss.length !== (lv === 1 ? 4 : 5)) f.push(`${id}: a story of ${ss.length} sentences (level ${lv})`); if (!ss.some((s) => s[2] === 'both') || !ss.some((s) => s[2] === 'one')) f.push(`${id}: a story without a fact of each kind`); } }
  if (id === 'G2-626') { const g = p.groups.find((x) => x.id === 'reason'); const own = TOWN_OWN[p.meta.town]; const r = g && g.choices.find((c) => c[1] === 'right'); if (!r || !new RegExp(own[1]).test(r[0].toLowerCase())) f.push(`${id}: the right reason is "${r && r[0]}"`); if (g && g.choices.length !== (lv === 1 ? 2 : 3)) f.push(`${id}: ${g.choices.length} reasons`); const clue = st(p, 'townsent').filter((s) => s[2] === 'clue').map((s) => +s[1]); if (clue.length !== 1 || clue[0] !== own[0]) f.push(`${id}: the clue stamped ${clue.join(',')} (the gate: ${own[0]})`); }
  if (id === 'G2-627') { const c = st(p, 'card'); for (const [, x, a] of c) if (TOOL_OWN[x] !== a) f.push(`${id}: ${x} stamped ${a}`); if (c.length !== (lv === 1 ? 4 : 12)) f.push(`${id}: ${c.length} cards`); }
  // level 3 asks 'With a __, the baker can make more bread': the baker's row shows a machine (an oven or a mixer)
  if (id === 'G2-627' && lv === 3) { const i = p.html.indexOf('data-s2-producerrow="baker"'), j = i < 0 ? -1 : p.html.indexOf('data-s2-producerrow=', i + 10); const seg = i < 0 ? '' : p.html.slice(i, j < 0 ? undefined : j); if (!/data-s2-card="(oven|mixer)"/.test(seg)) f.push(`${id}: the baker's row shows no machine (an oven or a mixer) for the level-3 sentence`); }
  if (id === 'G2-628') {
    const items = st(p, 'listitem'), need = items.filter((s) => s[2] === 'need').map((s) => s[1]).sort();
    const want = LEMON_NEEDS_OWN[lv === 1 ? 3 : 4].slice().sort();
    if (need.join() !== want.join()) f.push(`${id}: the things to buy are ${need.join(',')} (the gate: ${want.join(',')})`);
    const cost = Object.fromEntries([...h.matchAll(/data-s2-listitem="([a-z]+)"[\s\S]*?data-s2-cost="(\d+)"/g)].map((m) => [m[1], +m[2]]));
    const total = want.reduce((a, k) => a + (cost[k] || 0), 0);
    const tot = st(p, 'total'); if (tot.length !== 1 || +tot[0][2] !== total) f.push(`${id}: the total stamped ${tot[0] && tot[0][2]} (the gate: ${total})`);
    if (total > 9) f.push(`${id}: the costs add to $${total} (within $9)`);
    const shown = st(p, 'brings').map((s) => +s[1]);
    for (const [, c, a] of st(p, 'brings')) if (+a !== (+c * LEMON_CUPS_OWN) / 100) f.push(`${id}: ${c} cents a cup stamped $${a}`);
    if (shown.some((c) => (c * LEMON_CUPS_OWN) / 100 === total)) f.push(`${id}: a price brings in exactly the cost ($${total}): "covers" either way`);
    const low = shown.filter((c) => (c * LEMON_CUPS_OWN) / 100 > total).sort((a, b) => a - b)[0];
    const g = p.groups.find((x) => x.id === 'lowest'), r = g && g.choices.find((c) => c[1] === 'right');
    if (!low) f.push(`${id}: no price brings in more than $${total}`);
    else if (!r || +r[0] !== low) f.push(`${id}: the lowest price stamped ${r && r[0]} (the gate: ${low})`);
    if (shown.length !== (lv === 1 ? 2 : 3)) f.push(`${id}: ${shown.length} prices to try`);
    for (const [, x, a] of items) if (/^(kite|ball)$/.test(x) !== (a === 'no')) f.push(`${id}: ${x} stamped ${a}`);
  }
  if (id === 'G2-629') { const r = st(p, 'banklines'); for (const [, x, a] of r) if (x !== a || !BANK_OWN[x]) f.push(`${id}: the ${x} picture stamped ${a}`); if (r.length !== (lv === 1 ? 2 : 3)) f.push(`${id}: ${r.length} pictures`); const box = [...h.matchAll(/data-s2-banksent="([a-z]+)"/g)].map((m) => m[1]); if (box.slice().sort().join() !== r.map((s) => s[1]).sort().join()) f.push(`${id}: the sentence box does not hold the pictures' sentences`); }
  if (id === 'G2-630') {
    const L = MARKET_OWN[lv];
    if (p.trays.length !== 2) f.push(`${id}: ${p.trays.length} trays`);
    for (const t of p.trays) {
      const ways = waysOwn(t.coins, t.price), total = t.coins.reduce((a, c) => a + (COIN_OWN[c] || 0), 0);
      if (ways.length !== 1) f.push(`${id}: ${t.item} at ${t.price} cents can be paid ${ways.length} ways from ${t.coins.join(',')}`);
      else if (wayOwnKey(ways[0]) !== t.way) f.push(`${id}: ${t.item}: the way stamped ${t.way} (the gate: ${wayOwnKey(ways[0])})`);
      if (total <= t.price) f.push(`${id}: ${t.item}: the tray holds ${total} cents for ${t.price}`);
      if (t.coins.some((c) => !L.coins.includes(c))) f.push(`${id}: ${t.item}: a coin not of level ${lv}`);
      if (t.price < L.min || t.price > L.max) f.push(`${id}: ${t.item}: ${t.price} cents outside ${L.min}-${L.max}`);
      if (t.coins.length < 3 || t.coins.length > 6) f.push(`${id}: ${t.item}: ${t.coins.length} coins on a tray`);
    }
    const ch = st(p, 'changebox'); if (lv === 3) { const pr = +(/costs (\d+)¢\. You pay with 1 dollar/.exec(h) || [])[1]; if (ch.length !== 1 || +ch[0][2] !== 100 - pr) f.push(`${id}: the change stamped ${ch[0] && ch[0][2]} for a price of ${pr}`); } else if (ch.length) f.push(`${id}: a change question below level 3`);
    if (st(p, 'record').length) f.push(`${id}: the shopper's record carries an answer (the child's own)`);
  }
  return f;
}
/** the positional tells, pooled over a level's copies */
function tellFaults(id, lv, pages) {
  const f = [], tag = `${id} L${lv}`;
  if (id === 'G2-615') {
    // the letter of each law's problem: spread over A-D (or A-B); the problems never in the laws' own order from 4 laws
    const n = lv === 1 ? 2 : 4, cnt = Array(n).fill(0); let ident = 0, tot = 0;
    for (const p of pages) { const ls = st(p, 'write').map((s) => 'ABCD'.indexOf(s[2])); ls.forEach((x) => { cnt[x]++; tot++; }); if (n > 2 && ls.every((x, i) => x === i)) ident++; }
    f.push(...bandFaults(`${tag} (the answer letter)`, cnt, tot, Array(n).fill(1 / n), 0.04));
    if (ident) f.push(`${tag}: ${ident} copies letter the problems in the laws' own order`);
    if (n === 2) { const straight = pages.filter((p) => st(p, 'write')[0][2] === 'A').length; f.push(...bandFaults(`${tag} (two laws straight across)`, [straight, pages.length - straight], pages.length, [0.5, 0.5], 0.05)); }
  }
  if (id === 'G2-616') { const lvls = ['local', 'state', 'national'], n = lv === 1 ? 3 : 5, pos = lvls.map(() => Array(n).fill(0)); let sorted = 0; for (const p of pages) { const ls = st(p, 'leader').map((s) => s[2]); ls.forEach((a, i) => pos[lvls.indexOf(a)][i]++); if (ls.every((a, i) => !i || lvls.indexOf(ls[i - 1]) <= lvls.indexOf(a)) || ls.every((a, i) => !i || lvls.indexOf(ls[i - 1]) >= lvls.indexOf(a))) sorted++; } const share = lv === 1 ? [1 / 3, 1 / 3, 1 / 3] : [2 / 5, 1 / 5, 2 / 5]; lvls.forEach((l, k) => f.push(...bandFaults(`${tag} (a ${l} leader at each place)`, pos[k], pages.length, Array(n).fill(share[k]), 0.06))); if (lv > 1 && sorted) f.push(`${tag}: ${sorted} copies line the leaders up by level`); }
  if (id === 'G2-617') { const cnt = {}; for (const p of pages) for (const [, pid] of st(p, 'place')) cnt[pid] = (cnt[pid] || 0) + 1; if (lv === 1) { const sv = Object.keys(SERVICE_OWN).filter((k) => SERVICE_OWN[k] === 'service'); f.push(...bandFaults(`${tag} (the services drawn)`, sv.map((k) => cnt[k] || 0), pages.length, sv.map(() => 4 / 6), 0.06)); } }
  if (id === 'G2-618') { const n = lv === 1 ? 2 : 3, pos = Array(n).fill(0), splits = {}; let pat = 0; for (const p of pages) { const ks = p.groups.map((g) => CHANGE_OWN[g.id]); ks.forEach((k, i) => { if (k === 'nature') pos[i]++; }); const s = ks.filter((k) => k === 'nature').length; splits[s] = (splits[s] || 0) + 1; if (n >= 3 && badOrderOwn(ks.map((k) => k === 'nature'))) pat++; } const allowed = lv === 1 ? [0, 1, 2] : [1, 2]; const sc = allowed.map((k) => splits[k] || 0); if (Object.keys(splits).some((k) => !allowed.includes(+k))) f.push(`${tag}: a split outside ${allowed.join('/')}`); const exp = lv === 1 ? [1 / 3, 1 / 3, 1 / 3] : [0.5, 0.5]; f.push(...bandFaults(`${tag} (the split nature / people)`, sc, pages.length, exp, 0.05)); const share = lv === 1 ? 0.5 : 0.5; f.push(...bandFaults(`${tag} (nature at each place)`, pos, pages.length, Array(n).fill(share), 0.06)); if (pat) f.push(`${tag}: ${pat} copies put the kinds in a pattern`); }
  if (id === 'G2-620') { const n = lv === 1 ? 3 : 5; let straight = 0; const cnt = Array.from({ length: n }, () => Array(n).fill(0)); for (const p of pages) p.lefts.forEach((c, i) => { const j = p.rights.indexOf(c[1]); if (j === i) straight++; cnt[i][j]++; }); if (straight) f.push(`${tag}: a symbol straight across on ${straight} rows`); cnt.forEach((r, i) => f.push(...bandFaults(`${tag} (row ${i + 1}'s symbol)`, r.filter((_, j) => j !== i), pages.length, Array(n - 1).fill(1 / (n - 1)), 0.06))); }
  if (id === 'G2-622' && lv === 1) { const splits = [0, 0, 0], pos = [0, 0, 0, 0]; for (const p of pages) { const ws = st(p, 'trade').map((s) => s[2]); splits[ws.filter((w) => w === 'in').length - 1]++; ws.forEach((w, i) => { if (w === 'in') pos[i]++; }); } f.push(...bandFaults(`${tag} (the split in / out)`, splits, pages.length, [1 / 3, 1 / 3, 1 / 3], 0.05)); f.push(...bandFaults(`${tag} (in at each place)`, pos, pages.length, [0.5, 0.5, 0.5, 0.5], 0.06)); }
  if (id === 'G2-623') { const ids = (lv === 1 ? B.ISLANDS_TWO : B.ISLANDS).map((x) => x.id), n = ids.length, cnt = ids.map(() => Array(n).fill(0)); for (const p of pages) p.meta.order.forEach((iid, i) => cnt[ids.indexOf(iid)][i]++); ids.forEach((iid, k) => f.push(...bandFaults(`${tag} (${iid} at each place)`, cnt[k], pages.length, Array(n).fill(1 / n), 0.06))); }
  if (id === 'G2-624') { const cnt = {}; for (const p of pages) cnt[p.meta.event] = (cnt[p.meta.event] || 0) + 1; f.push(...bandFaults(`${tag} (the day told)`, B.ACCOUNTS.map((e) => cnt[e.id] || 0), pages.length, B.ACCOUNTS.map(() => 1 / B.ACCOUNTS.length), 0.06)); }
  if (id === 'G2-626') { const n = lv === 1 ? 2 : 3, cnt = Array(n).fill(0); for (const p of pages) { const g = p.groups.find((x) => x.id === 'reason'); cnt[rightAt(g)]++; } f.push(...bandFaults(`${tag} (the right reason's place)`, cnt, pages.length, Array(n).fill(1 / n), 0.05)); }
  if (id === 'G2-627') { const splits = [0, 0, 0], pos = [0, 0, 0, 0]; let rows = 0; for (const p of pages) { const c = st(p, 'card'); for (let r = 0; r < c.length / 4; r++) { const ks = c.slice(4 * r, 4 * r + 4).map((s) => s[2]); splits[ks.filter((k) => k === 'tool').length - 1]++; ks.forEach((k, i) => { if (k === 'tool') pos[i]++; }); rows++; } } f.push(...bandFaults(`${tag} (the split tools / skills)`, splits, rows, [1 / 3, 1 / 3, 1 / 3], 0.05)); f.push(...bandFaults(`${tag} (a tool at each place)`, pos, rows, [0.5, 0.5, 0.5, 0.5], 0.06)); }
  if (id === 'G2-628') { const ans = [0, 0], n = lv === 1 ? 2 : 3, pos = Array(n).fill(0); for (const p of pages) { const g = p.groups.find((x) => x.id === 'lowest'), r = g.choices.find((c) => c[1] === 'right'); ans[+r[0] === 50 ? 0 : 1]++; pos[rightAt(g)]++; } f.push(...bandFaults(`${tag} (50 cents or a dollar)`, ans, pages.length, [0.5, 0.5], 0.06)); f.push(...bandFaults(`${tag} (the lowest price's row)`, pos, pages.length, Array(n).fill(1 / n), 0.06)); }
  if (id === 'G2-629') { let same = 0; for (const p of pages) { const box = [...p.html.matchAll(/data-s2-banksent="([a-z]+)"/g)].map((m) => m[1]), rows = st(p, 'banklines').map((s) => s[1]); if (box.join() === rows.join()) same++; } if (same) f.push(`${tag}: ${same} copies list the sentences in the pictures' order`); }
  if (id === 'G2-630') { let sum = 0, n = 0, sum2 = 0; for (const p of pages) for (const t of p.trays) { const need = Object.fromEntries(t.way.split(',').map((x) => [x.split(':')[0], +x.split(':')[1]])); const k = t.coins.length; t.coins.forEach((c, i) => { const wgt = (need[c] || 0) / t.coins.filter((x) => x === c).length; if (!wgt) return; const v = i / (k - 1); sum += wgt * v; sum2 += wgt * v * v; n += wgt; }); } const mean = sum / n; if (Math.abs(mean - 0.5) > Math.max(0.03, 3 * Math.sqrt((sum2 / n - mean * mean) / n))) f.push(`${tag}: the coins that pay sit at ${mean.toFixed(3)} of the tray (the middle is 0.5)`); }
  if (id === 'G2-627') {
    const m = surfaceOf(pages); if (!pages.poisoned) MEASURED[tag] = m;
    if (!m.cards) f.push(`${tag}: no cards measured`);
    // review round 2 (row 50): EVERY word of the cards, the first word, the last word and the number of words: none may
    // sort the tools from the skills better than SURFACE_MAX (a single cue a child could use without the concept)
    for (const [w, a] of m.words) if (a > SURFACE_MAX) f.push(`${tag}: the word "${w}" sorts the cards ${(a * 100).toFixed(1)}% of the time (at most ${SURFACE_MAX * 100}%)`);
    for (const [w, a] of m.firsts) if (a > SURFACE_MAX) f.push(`${tag}: the first word "${w}" sorts the cards ${(a * 100).toFixed(1)}% of the time`);
    if (m.firstWord > SURFACE_MAX) f.push(`${tag}: the first word (a / an) sorts the cards ${(m.firstWord * 100).toFixed(1)}% of the time (at most ${SURFACE_MAX * 100}%)`);
    for (const [w, a] of m.lasts) if (a > SURFACE_MAX) f.push(`${tag}: the last word "${w}" sorts the cards ${(a * 100).toFixed(1)}% of the time`);
    if (m.length > SURFACE_MAX) f.push(`${tag}: the number of words sorts the cards ${(m.length * 100).toFixed(1)}% of the time (at most ${SURFACE_MAX * 100}%)`);
    if (m.worker < 1) f.push(`${tag}: ${((1 - m.worker) * 100).toFixed(1)}% of the cards show no worker`);
    if (m.bubble < 1) f.push(`${tag}: the thought bubble marks the skills ${(m.bubble * 100).toFixed(1)}% of the time (it IS the concept: 100%)`);
  }
  return f;
}
/** G2-627 (review rounds 1-2, rows 43 and 50): how well each SURFACE feature of a card sorts tools from skills over the
 *  copies (the best a child could do with that feature alone): the presence of each word, the first word, the last word,
 *  the number of words (the best cut), the worker drawn (every card: no help), the thought bubble (the concept itself) */
const MEASURED = {};
/** a G2-627 page's cards: id, kind, words, worker drawn, thought bubble (kept from the sweep; the page html is not) */
function cardsOf(p) {
  const kinds = Object.fromEntries(st(p, 'card').map((s) => [s[1], s[2]])), out = [];
  for (const seg of p.html.split(/(?=<div[^>]*data-s2-card=")/).slice(1)) { const m = /data-s2-card="([a-z-]+)"/.exec(seg); const w = (/data-s2-cardword="[^"]+"[^>]*>([^<]+)</.exec(seg) || [])[1]; if (!m || !w) continue; const body = seg.slice(0, seg.indexOf('data-s2-cardword=')); out.push({ id: m[1], kind: kinds[m[1]], word: dec(w).trim(), worker: /data-s2-worker="/.test(body), bubble: /data-s2-drawn="thought-bubble"/.test(body) }); }
  return out;
}
function surfaceOf(pages) {
  const cards = pages.flatMap((p) => p.cards || cardsOf(p));
  // no cards is a fault, never a pass (a measurement of nothing)
  if (!cards.length) return { cards: 0, firstWord: 1, length: 1, worker: 0, bubble: 0, share: 0, words: [], firsts: [], lasts: [] };
  const acc = (feat) => { const t = {}; for (const c of cards) { const v = feat(c); t[v] = t[v] || { tool: 0, skill: 0 }; t[v][c.kind]++; } return Object.values(t).reduce((a, x) => a + Math.max(x.tool, x.skill), 0) / cards.length; };
  const ws = (c) => c.word.toLowerCase().split(/\s+/), nw = (c) => ws(c).length;
  const by = (vals, feat) => [...new Set(vals)].map((v) => [v, acc((c) => feat(c, v))]).sort((a, b) => b[1] - a[1]);
  let length = 0; for (let cut = 1; cut <= 9; cut++) length = Math.max(length, acc((c) => nw(c) <= cut));
  return {
    cards: cards.length, firstWord: acc((c) => /^an? /i.test(c.word)), length, worker: cards.filter((c) => c.worker).length / cards.length, bubble: acc((c) => c.bubble), share: cards.filter((c) => c.kind === 'skill').length / cards.length,
    words: by(cards.flatMap(ws), (c, w) => ws(c).includes(w)), firsts: by(cards.map((c) => ws(c)[0]), (c, w) => ws(c)[0] === w), lasts: by(cards.map((c) => ws(c).slice(-1)[0]), (c, w) => ws(c).slice(-1)[0] === w),
  };
}
/** page rules (the whole page, as built) */
function pageRuleFaults(id, lv, html, ins) {
  const f = [];
  const text = dec(html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  if (/\bfree\b/i.test(text + ' ' + ins)) f.push(`${id} L${lv}: the page says "free"`);
  for (const m of text.matchAll(/\b\d[\d,]*\b/g)) { const n = Number(m[0].replace(/,/g, '')); if (n > 1000 && !(n >= 1700 && n <= 2030)) f.push(`${id} L${lv}: the number ${m[0]} (within 1,000; years are dates)`); }
  if (/\$\d+\.\d\d/.test(text)) f.push(`${id} L${lv}: dollars and cents together (Grade 2 writes cents to a dollar or whole dollars)`);
  if (id === 'G2-619') { const m = /circle the (\d+) things the flood changed/i.exec(text); if (!m || +m[1] !== FLOOD_OWN.length) f.push(`${id} L${lv}: the page does not ask for the ${FLOOD_OWN.length} changes`); if (!/circle the 3 things/i.test(ins)) f.push(`${id} L${lv}: the instruction does not say 3 things`); if (/gulf of (mexico|america)/i.test(text)) f.push(`${id} L${lv}: the page names the gulf (its name differs between maps)`); }
  if (id === 'G2-620') { if (/\bwe all\b/i.test(text)) f.push(`${id}: "we all"`); if (lv < 3 && !/if you want to/i.test(text + ins)) f.push(`${id} L${lv}: sharing a tradition is not offered as a choice`); }
  if (id === 'G2-616' && /\b(Biden|Trump|Obama|Bush|Lincoln|Washington)\b/.test(text)) f.push(`${id}: a real person's name`);
  if (id === 'G2-625' && !/about 1910/.test(text)) f.push(`${id}: the photograph is not dated about 1910`);
  if (id === 'G2-621' && lv === 1 && !/outlined/.test(ins)) f.push(`${id} L1: the instruction does not say the countries are outlined`);
  f.push(...roundOneFaults(id, lv, html, ins, text));
  return f;
}
/** review round 1 (2026-11-25): the rules the US Grade 2 teacher's review and the fix brief added, each poisoned below */
const sliceOf = (html, attr) => { const i = html.indexOf(attr); if (i < 0) return ''; const j = html.indexOf('data-s2-frame=', i + attr.length); return html.slice(i, j < 0 ? i + 6000 : j); };
const rowWidths = (seg) => [...seg.matchAll(/<svg data-dk-writerow="1"[^>]*?width="([0-9.]+)"/g)].map((m) => +m[1]);
function roundOneFaults(id, lv, html, ins, text) {
  const f = [];
  // G2-614 (rows 1-2): both views get the full-width second line at every level; the circles three lines a part (L2-L3)
  if (id === 'G2-614' && lv > 1) { for (const fr of ['mine', 'partner']) { const w = rowWidths(sliceOf(html, `data-s2-frame="${fr}"`)); if (w.length !== 3 || Math.max(...w) < 560) f.push(`${id} L${lv}: the ${fr} view has ${w.length} lines (two lines and "because", one full width)`); } const n = (html.match(/data-s2-vennline="me"/g) || []).length; if (n !== 3) f.push(`${id} L${lv}: the circles have ${n} lines a part (3)`); }
  // G2-615 (row 4): each problem used once, said at levels 2-3
  if (id === 'G2-615' && lv > 1 && !/Use each letter one time\./.test(ins)) f.push(`${id} L${lv}: the instruction does not say to use each letter one time`);
  // G2-616 (row 9): the state picture is "one state", and a line for our own state, on every level; (row 7) each leader
  // card a grown-up (no cap, puffs, pigtails, braids or ponytail) with a flag on a pole
  if (id === 'G2-616') {
    if (!/data-s2-onestate="1"/.test(html) || !/>one state</.test(html)) f.push(`${id} L${lv}: the state picture is not captioned "one state"`);
    if (!/data-s2-ourstate="1"/.test(html) || !/Our state is/.test(text)) f.push(`${id} L${lv}: no line "Our state is ___."`);
    const arts = html.split(/(?=<svg[^>]*data-s2-art="leader:)/).slice(1).map((x) => x.slice(0, x.indexOf('</svg>')));
    if (!arts.length) f.push(`${id} L${lv}: no leader cards`);
    for (const a of arts) { const who = /data-s2-art="leader:([a-z]+)"/.exec(a)[1]; if (!/data-s2-drawn="flag"/.test(a)) f.push(`${id} L${lv}: the ${who} card has no flag`); const hairs = [...a.matchAll(/data-s2-hair="([a-z]+)"/g)].map((m) => m[1]); if (!hairs.length) f.push(`${id} L${lv}: the ${who} card draws no grown-up`); for (const hh of hairs) if (!['short', 'bun', 'bald', 'hijab', 'curly'].includes(hh)) f.push(`${id} L${lv}: a ${who} with ${hh} hair (a grown-up leader: short hair or hair up)`); if (/data-sk-age="child"/.test(a)) f.push(`${id} L${lv}: a child on the ${who} card`); }
  }
  // G2-617 (row 14): "The ___ helps ___." (never "is used by")
  if (id === 'G2-617' && lv > 1) { if (/is used by/.test(text)) f.push(`${id} L${lv}: "is used by" (it does not fit the mail carrier or road work)`); if (!/The\s+helps/.test(text.replace(/\s+/g, ' '))) f.push(`${id} L${lv}: no frame "The ___ helps ___."`); }
  // G2-618 (row 16, row 17): no sea ice or polar bear; level 3's "because" line runs the card width
  if (id === 'G2-618') { if (/sea-ice|polar-bear|Arctic/.test(html)) f.push(`${id} L${lv}: the sea-ice pair (or its polar bear) is on the page`); if (lv === 3) { const segs = html.split('data-s2-pair="').slice(1); for (const s0 of segs) { const w = rowWidths(s0); if (!w.length || Math.max(...w) < 380) f.push(`${id} L3: an "It changed because" line ${Math.max(0, ...w)} px (at least 380)`); } } }
  // G2-619 (row 20): "this town" or "a town", never "our town"
  if (id === 'G2-619' && /\bour town\b/i.test(text + ' ' + ins)) f.push(`${id} L${lv}: "our town" (the flood is never the child's own town)`);
  // G2-620 (row 23): level 3 asks where each began
  if (id === 'G2-620' && lv === 3 && (!/country where it began/.test(text) || !/where it began/.test(ins) || /widely kept/.test(text + ins))) f.push(`${id} L3: the map does not ask where each tradition began`);
  // G2-621 (row 29): one thing in our classroom, never from home
  if (id === 'G2-621' && lv === 3 && (/from home/i.test(text + ins) || !/One thing in our classroom/.test(text))) f.push(`${id} L3: the label question asks about home`);
  // G2-623 (row 32): the instruction says which way an arrow points
  if (id === 'G2-623' && !/arrow from the island that has/.test(ins)) f.push(`${id} L${lv}: the instruction does not say which way the arrows point`);
  // G2-625 (row 38): the horse has its head
  if (id === 'G2-625' && !/data-s2-drawn="horse-head"/.test(html)) f.push(`${id} L${lv}: the horse is drawn without a head`);
  // G2-626 (row 41, notes): the clue says the town grew AND why; each town's "then" picture shows what its story names;
  // level 3's "less likely" line holds a whole reason
  if (id === 'G2-626') {
    if (!/says the town grew and tells why/.test(text) || !/says the town grew and tells why/.test(ins)) f.push(`${id} L${lv}: "copy the sentence that tells why" (two sentences tell why: say "says the town grew and tells why")`);
    const town = (/data-s2-art="town:then"[\s\S]*?<\/svg>/.exec(html) || [''])[0], t = (/history="1"[\s\S]*?The story of ([A-Za-z ]+)</.exec(html) || [])[1];
    const NEED = { 'Mill River': ['river', 'rowboat'], 'Pine Hill': ['one-store', 'one-school'], 'Sandy Creek': ['dirt-road'] };
    for (const d0 of NEED[t] || []) if (!new RegExp(`data-s2-drawn="${d0}"`).test(town)) f.push(`${id} L${lv}: ${t} at first shows no ${d0} (its story names it)`);
    if (/data-s2-drawn="(bridge|railroad|factory|highway)"/.test(town)) f.push(`${id} L${lv}: the "then" picture shows the reason the town grew`);
    if (lv === 3) { const w = rowWidths(sliceOf(html, 'data-s2-frame="less"')); if (!w.length || w[0] < 380) f.push(`${id} L3: the "less likely" line ${w[0] || 0} px (at least 380 for a whole reason)`); }
  }
  // G2-627 (rows 43-44): every card shows the worker; only a skill card has a thought bubble; level 3 "The baker uses"
  if (id === 'G2-627') {
    const cards = html.split(/(?=<div[^>]*data-s2-card=")/).slice(1);
    for (const c of cards) { const m = /data-s2-card="([a-z-]+)" data-dk-answer="(tool|skill)"/.exec(c); if (!m) continue; const body = c.slice(0, c.indexOf('data-s2-cardword=')); if (!/data-s2-worker="/.test(body)) f.push(`${id} L${lv}: the ${m[1]} card shows no worker`); const bub = /data-s2-drawn="thought-bubble"/.test(body); if (bub !== (m[2] === 'skill')) f.push(`${id} L${lv}: the ${m[2]} ${m[1]} ${bub ? 'has' : 'has no'} thought bubble`); }
    if (lv === 3 && (!/The baker uses/.test(text) || /With a\b/.test(text))) f.push(`${id} L3: the baker sentence is not "The baker uses ___ to make more bread"`);
  }
  // G2-628 (row 46): level 3 chooses a price that brings in more, then what is left over (and why, on a full line)
  // (ruling 11 read aloud with every answer: "1 dollars are left over" breaks, so the frame says "they have $___ left over")
  if (id === 'G2-628' && lv === 3) { if (!/Choose a price that brings in more than they must pay\./.test(text) || /At the price I would choose/.test(text) || /dollars are left over/.test(text) || !/they have \$/.test(text)) f.push(`${id} L3: the left-over sentence is not asked at a price that brings in more`); const w = rowWidths(sliceOf(html, 'data-s2-frame="left-over"')); if (!w.length || Math.max(...w) < 560) f.push(`${id} L3: no full line for "I chose it because"`); }
  // G2-629 (row 48, ruling 6): the banker holds the money out, the family's open hand takes it; the statement's numbers
  if (id === 'G2-629') {
    if (/data-s2-art="bank:loan"/.test(html) && (!/data-s2-drawn="bill-held-out" data-s2-giver="banker"/.test(html) || !/data-s2-drawn="open-hand"/.test(html))) f.push(`${id} L${lv}: the lending picture does not show the banker giving the money`);
    if (/data-s2-art="bank:interest"/.test(html)) { const S = B.BANK_STATEMENT; for (const v of [S.start, S.added, S.start + S.added]) if (!new RegExp(`>\\$${v}<`).test(html)) f.push(`${id} L${lv}: the statement does not show $${v}`); }
  }
  f.push(...roundTwoFaults(id, lv, html, ins, text));
  f.push(...roundThreeFaults(id, lv, html));
  return f;
}
/** review round 3 (REVIEW-3.tsv row 10): a skill's thought bubble never draws a tool or a measuring tool (the bank's tools,
 *  a ruler, a tape measure, a clock or a timer, a scale, a thermometer). Every shape in a bubble belongs to a named item
 *  (data-s2-item), and each item is one the gate has read for that bubble. */
const BUBBLE_FORBIDDEN = new Set([...B.PRODUCERS.flatMap((p) => p.tools.map((x) => x.id)), 'ruler', 'tape-measure', 'tape', 'measuring-tape', 'yardstick', 'clock', 'timer', 'scale', 'thermometer']);
const THINK_ITEMS_OWN = { steps: ['bowl-of-flour', 'arrow', 'loaf'], 'bread-done': ['loaf-unbaked', 'arrow', 'loaf'], dough: ['dough'], 'sun-seed': ['sun', 'soil', 'seed', 'sprout'], sprouts: ['soil', 'sprout'], cow: ['cow'], 'house-idea': ['house-outline', 'size-arrow'], measure: ['board', 'pencil-mark', 'arrow'], wall: ['bricks'] };
function roundThreeFaults(id, lv, html) {
  const f = [];
  if (id !== 'G2-627') return f;
  const opens = [...html.matchAll(/<g [^>]*data-s2-think="([a-z-]+)">/g)];
  if (!opens.length) f.push(`${id} L${lv}: no thought bubbles read`);
  for (const m of opens) {
    let rest = html.slice(m.index + m[0].length); const items = [];
    for (;;) { const it = /^<g data-s2-item="([a-z-]+)">([\s\S]*?)<\/g>/.exec(rest); if (!it) break; if (/<g\b/.test(it[2])) { f.push(`${id} L${lv}: the ${m[1]} bubble nests a group in its item ${it[1]}`); break; } items.push(it[1]); rest = rest.slice(it[0].length); }
    if (!rest.startsWith('</g>')) f.push(`${id} L${lv}: the ${m[1]} bubble draws something no item names`);
    for (const it of items) { if (BUBBLE_FORBIDDEN.has(it)) f.push(`${id} L${lv}: the ${m[1]} bubble draws a ${it} (a tool: a child can color it blue)`); else if (!(THINK_ITEMS_OWN[m[1]] || []).includes(it)) f.push(`${id} L${lv}: the ${m[1]} bubble draws a ${it}, not an item the gate has read for it`); }
  }
  return f;
}
/** review round 2 (2026-11-25, REVIEW-2.tsv and FIX-BRIEF-2.md): each rule poisoned below */
const OUR_STATE_MIN = 336;   // "North Carolina": 14 letters at a quarter inch, Grade 2 handwriting (3.5 inches)
const HILL_DRAWN_OK = new Set(['hill', 'tree-bare', 'tree-leaves']);
function roundTwoFaults(id, lv, html, ins, text) {
  const f = [];
  // G2-616 (row 10): the "Our state is" line holds the longest names
  if (id === 'G2-616') { const i = html.indexOf('data-s2-ourstate="1"'); const w = i < 0 ? [] : rowWidths(html.slice(i, i + 3000)); if (!w.length || w[0] < OUR_STATE_MIN) f.push(`${id} L${lv}: the "Our state is" line ${w[0] || 0} px (at least ${OUR_STATE_MIN}: North Carolina, Massachusetts)`); }
  // G2-618 (row 18): the hill pair: nothing on the hill a child could call planted or built (no flower, fence or house)
  if (id === 'G2-618') for (const m of html.matchAll(/<svg[^>]*data-s2-art="change:hill:[a-z]+"[\s\S]*?<\/svg>/g)) for (const d0 of m[0].matchAll(/data-s2-drawn="([a-z-]+)"/g)) if (!HILL_DRAWN_OK.has(d0[1])) f.push(`${id} L${lv}: the hill shows a ${d0[1]} (nothing planted or built)`);
  // G2-624 (row 39): Ms. Cole's hair shows under her cap
  if (id === 'G2-624' && /data-s2-art="teller:park worker"/.test(html)) { const m = /<svg[^>]*data-s2-art="teller:park worker"[\s\S]*?<\/svg>/.exec(html); if (!m || !/data-s2-drawn="ponytail"/.test(m[0])) f.push(`${id} L${lv}: Ms. Cole is drawn with no hair under her cap (she reads as a man)`); }
  // G2-629 (row 58): the lines are beside the pictures: "next to each picture"
  if (id === 'G2-629' && (!/next to each picture/.test(ins) || /under each picture/.test(ins))) f.push(`${id} L${lv}: the instruction does not say "next to each picture"`);
  return f;
}
/** what a level draws: the marked parts and how many of each */
function levelSig(html) { const c = {}; for (const m of html.matchAll(/data-(?:dk|s2|g1)-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; for (const m of html.matchAll(/data-dk-prompt="([^"]+)"/g)) c['prompt:' + m[1]] = 1; return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])); }
const insOf = (t, lv) => withLevelInstruction(resolveStrings(t.id, 'en', t), t.id, lv, 'en').instruction;
const buildPage = (t, lv, s) => t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`dks2|${t.id}|${lv}|${s}`), variant: s });

/* ================================================================ main */
async function main() {
  const t0 = Date.now();
  const bf = bankFaults(B);
  ok(!bf.length, 'bank: ' + bf.slice(0, 10).join(' | '));
  const P = (name, mut, re, art) => { const b = clone(B); mut(b); judge(name, bankFaults(b, art), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 the leash law sent to the trash problem', (b) => { find(b.LAWS, 'leash').problem = 'trash'; }, /leash: the bank says trash/);
  P('PB2 "a dog chasing children" back (shares "dog" with the leash law)', (b) => { b.PROBLEMS.chase = 'a dog chasing children'; }, /share "dog"|share "dogs"/);
  P('PB3 "trash in the park" (shares "park" with the leash law)', (b) => { b.PROBLEMS.trash = 'trash in the park'; }, /share "park"/);
  P('PB4 the red light / helmet laws not kept apart', (b) => { b.LAW_CONFUSABLE = []; }, /red \/ helmet laws are not kept apart/);
  P('PB5 the governor sent to the town', (b) => { find(b.GOV_LEADERS, 'governor').level = 'local'; }, /governor: the bank says local/);
  P('PB6 a leader named as a person', (b) => { find(b.GOV_LEADERS, 'president').word = 'President Smith Jones'; }, /names a person/);
  P('PB7 the pizza shop a government service', (b) => { find(b.SERVICE_PLACES, 'pizza').kind = 'service'; }, /pizza: the bank says service/);
  P('PB8 the village "changed by nature"', (b) => { find(b.PLACE_CHANGES, 'village').kind = 'nature'; }, /village: the bank says nature/);
  P('PB9 a sentence that says "people"', (b) => { find(b.PLACE_CHANGES, 'field').text = 'A field long ago and today: people built houses.'; }, /says who changed it/);
  P('PB10 every nature change in the seasons (the time words tell the kind)', (b) => { find(b.PLACE_CHANGES, 'beach').text = 'A beach in winter and in summer: the waves washed sand away.'; }, /nature changes do not mix/);
  P('PB11 a fourth flood change', (b) => { b.FLOOD_CHANGES.push('sandbags'); }, /the flood changes are/);
  P('PB12 a toy in the emergency kit', (b) => { b.KIT.push({ id: 'game', word: 'a video game', pic: null }); }, /not a thing a family keeps/);
  P('PB13 hurricanes on the Pacific coast', (b) => { find(b.COASTS, 'pacific').hurricanes = true; }, /pacific coast: hurricanes true/);
  P('PB14 the coast named "Gulf of Mexico coast"', (b) => { find(b.COASTS, 'gulf').word = 'Gulf of Mexico coast'; }, /named after the gulf/);
  P('PB15 Kwanzaa matched to the menorah', (b) => { find(b.TRADITIONS, 'kwanzaa').symbol = 'menorah'; }, /kwanzaa: symbol menorah/);
  P('PB16 "we all" in a tradition', (b) => { find(b.TRADITIONS, 'christmas').text = 'We all celebrate Christmas.'; }, /ranks or says "we all"/);
  P('PB17 a tradition sentence of 15 words', (b) => { find(b.TRADITIONS, 'posadas').text = 'Las Posadas, nine nights before Christmas, is a tradition from Mexico, often with a piñata.'; }, /has 1[3-9] words/);
  P('PB18 Vietnam named on the traditions map (Lunar New Year is widely kept there)', (b) => { b.TRADITION_MAP.others.push('VNM'); }, /names VNM, where one of the three/);
  P('PB19 Lunar New Year\'s sentence without its country', (b) => { find(b.TRADITIONS, 'lunar').text = 'At Lunar New Year many families give red envelopes.'; }, /lunar: its sentence does not say it began in China/);
  P('PB20 bananas grown in Peru', (b) => { find(b.ORIGINS, 'banana').country = 'PER'; }, /origin banana: PER/);
  P('PB21 a label that names another country', (b) => { find(b.ORIGINS, 'coffee').label = 'grown in Brazil'; }, /does not name Colombia/);
  P('PB22 airplanes bought from other countries', (b) => { find(b.TRADE_GOODS, 'airplane').way = 'in'; }, /trade airplane: in/);
  P('PB23 two islands making fish', (b) => { find(b.ISLANDS, 'hilly').makes = 'fish'; }, /islands make what it needs/);
  P('PB24 "Two hundred people came" (a "both" fact a child could call only one)', (b) => { const s = find(b.ACCOUNTS, 'library').b.sentences.find((x) => x[0] === 'crowd'); s[0] = 'two-hundred'; }, /facts both tell are/);
  P('PB25 Ava with no sex to draw her by', (b) => { delete find(b.ACCOUNTS, 'library').a.sex; }, /no sex to draw them by/);
  P('PB26 a second clue sentence (the railroad station "brought new stores")', (b) => { find(b.TOWNS, 'railroad').sentences[1] = 'In 1885, the railroad brought new stores.'; }, /2 sentences name the reason and the growth/);
  P('PB27 a wrong reason mentioned in the story', (b) => { find(b.TOWNS, 'bridge').sentences[1] = 'People liked the weather there.'; }, /is mentioned in the story/);
  P('PB28 a skill said as a thing ("a bag of flour")', (b) => { find(b.PRODUCERS, 'baker').skills[0].word = 'a bag of flour'; }, /does not say what the worker knows/);
  // review round 1
  P('PB37 the sea-ice pair back', (b) => { b.PLACE_CHANGES.push({ id: 'sea-ice', kind: 'nature', text: 'The Arctic Ocean in winter and in summer: the sea ice shrinks.' }); }, /sea-ice \/ Arctic pair/);
  P('PB38 Las Posadas "a Christmas tradition" again', (b) => { find(b.TRADITIONS, 'posadas').text = 'Las Posadas is a Christmas tradition from Mexico. Families often break a piñata.'; }, /posadas: its card names Christmas/);
  P('PB39 the bank adds $1 to $20 (5 cents a dollar)', (b) => { b.BANK_STATEMENT = { start: 20, added: 1 }; }, /savings statement adds \$1 to \$20/);
  P('PB40 "soft chips" again', (b) => { const s = find(b.ACCOUNTS, 'playground').b.sentences.find((x) => x[0] === 'chips'); s[1] = 'We put soft chips under the swings.'; }, /says chips/);
  P('PB41 a tool named without a or an', (b) => { find(b.PRODUCERS, 'farmer').tools[0].word = 'tractors'; }, /not named with a or an/);
  P('PB42 Lunar New Year not said to have begun in China', (b) => { find(b.TRADITIONS, 'lunar').text = 'At Lunar New Year many families give red envelopes. It is a big holiday in China.'; }, /lunar: its sentence does not say it began in China/);
  // review round 2
  P('PB43 a skill drawn as a paper recipe again', (b) => { find(b.PRODUCERS, 'baker').skills[0].think = 'recipe'; }, /bubble "recipe" is not one the gate has read/);
  P('PB44 a tool with no grip (its hand would float)', (b) => { delete find(b.PRODUCERS, 'builder').tools[1].grip; }, /has no grip, ink or size/);
  P('PB45 a grip off the drawing of the tool', (b) => { find(b.PRODUCERS, 'builder').tools[1].grip = [0.05, 0.5]; }, /grip lies outside its drawing/);
  P('PB46 the tree pair back (a tree is not a place)', (b) => { find(b.PLACE_CHANGES, 'hill').id = 'tree'; }, /change tree: the bank says nature/);
  P('PB29 the oven a skill', (b) => { find(b.PRODUCERS, 'baker').tools[0].id = 'recipe'; }, /recipe is a tool/);
  P('PB30 25 cents a cup back (10 cups bring in $2.50)', (b) => { b.LEMON_PRICES = [25, 50, 100]; }, /mixed amount|not the gate's/);
  P('PB31 the bank "keeps money" for the interest picture', (b) => { find(b.BANK_JOBS, 'interest').sentence = 'The bank keeps money.'; }, /bank interest/);
  P('PB32 a level-1 market with quarters', (b) => { b.MARKET2[1].coins.push('quarter'); }, /market level 1/);
  P('PB33 a library picture in black and white', (b) => { find(b.KIT, 'water').pic = { theme: 'animals bw', noun: 'dog' }; }, /black-and-white|not in the cache/);
  { const art = { ...ART, PAL2: new Set([...ART.PAL2].filter((c) => c !== '#9DC3D4')) }; P('PB34 a drawing colour outside PAL2', () => {}, /outside PAL2/, art); }
  P('PB35 a tradition in Canada (Kwanzaa is kept there too)', (b) => { b.TRADITION_MAP.others.push('CAN'); }, /names CAN, where one of the three/);
  P('PB36 a skill keyed a tool', (b) => { find(b.PRODUCERS, 'builder').skills[0].id = 'hammer'; }, /hammer is a skill/);

  // ---- 2. build sweep
  const pagesOf = {};
  const want = (id) => (['G2-615', 'G2-618', 'G2-620', 'G2-622', 'G2-626', 'G2-627', 'G2-628', 'G2-630', 'G2-623', 'G2-616'].includes(id) ? Math.max(SEEDS, 2000) : SEEDS);
  for (const id of IDS) {
    const t = loadType(id);
    ok(t.exerciseType && /^[a-z-]+$/.test(t.exerciseType) && t.gradeBand === 'G2', `${id}: no family key or not Grade 2`);
    ok(typeof t.levelSetWords === 'function', `${id}: no levelSetWords`);
    let refused = false; try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const pages = [], ins = insOf(t, lv), seen = new Set();
      for (let s = 1; s <= want(id); s++) {
        let r;
        try { r = buildPage(t, lv, s); } catch (e) { ok(false, `${id} L${lv} #${s}: build throws ${e.message}`); break; }
        const p = pageOf(r);
        pages.push({ ...p, html: ['G2-629', 'G2-615', 'G2-628', 'G2-630'].includes(id) ? p.html : '', cards: id === 'G2-627' ? cardsOf(p) : null });
        if (s > SEEDS) continue;
        const af = answerFaults(id, lv, p); ok(!af.length, af.join(' | '));
        ok(t.levelSetWords(r.meta).length > 0, `${id} L${lv}: levelSetWords is empty`);
        seen.add(JSON.stringify(t.levelSetWords(r.meta)));
        if (s <= 3 || s % 25 === 0) {
          const pg = pageRuleFaults(id, lv, r.bodyHtml, ins); ok(!pg.length, pg.join(' | '));
          for (const q of picsOf(r.bodyHtml)) { const pf = artFaults(q, `${id} L${lv}`); ok(!pf.length, pf.join(' | ')); }
          // skin tones vary on a page that shows people
          if (p.skins.length) ok(new Set(p.skins).size >= 2, `${id} L${lv} #${s}: every person one skin tone`);
          if (s === 1) sigs[lv] = levelSig(r.bodyHtml);
        }
      }
      pagesOf[id + ' ' + lv] = { pages, seen: seen.size };
      const tf = tellFaults(id, lv, pages);
      ok(!tf.length, tf.slice(0, 6).join(' | '));
    }
    ok(sigs[1] !== sigs[2] && sigs[2] !== sigs[3] && sigs[1] !== sigs[3], `${id}: two levels draw the same parts`);
    process.stdout.write(id + ' ');
  }
  console.log(`\nbuild sweep done (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  // tells: poisons on spoiled pools (each with its control: the real pool passed above)
  const spoil = (id, lv, fn) => Object.assign(pagesOf[id + ' ' + lv].pages.map((p) => fn(clone(p))), { poisoned: true });
  judge('PT1 the laws always lettered in their own order', tellFaults('G2-615', 2, spoil('G2-615', 2, (p) => { const ws = st(p, 'write'); p.stamps = p.stamps.map((s) => (s[0] === 'write' ? [s[0], s[1], 'ABCD'[ws.indexOf(s)]] : s)); return p; })), /laws' own order|answer letter/);
  judge('PT2 the leaders lined up by level', tellFaults('G2-616', 2, spoil('G2-616', 2, (p) => { const ls = st(p, 'leader').sort((a, b) => ['local', 'state', 'national'].indexOf(a[2]) - ['local', 'state', 'national'].indexOf(b[2])); p.stamps = [...p.stamps.filter((s) => s[0] !== 'leader'), ...ls]; return p; })), /line the leaders up|at each place/);
  judge('PT3 nature always first', tellFaults('G2-618', 2, spoil('G2-618', 2, (p) => { p.groups.sort((a, b) => (CHANGE_OWN[a.id] === 'nature' ? -1 : 1) - (CHANGE_OWN[b.id] === 'nature' ? -1 : 1)); return p; })), /nature at each place|pattern/);
  judge('PT4 a symbol straight across', tellFaults('G2-620', 2, spoil('G2-620', 2, (p) => { p.rights = p.lefts.map((c) => c[1]); return p; })), /straight across/);
  judge('PT5 the right reason always first', tellFaults('G2-626', 2, spoil('G2-626', 2, (p) => { const g = p.groups.find((x) => x.id === 'reason'); const r = g.choices.find((c) => c[1] === 'right'); g.choices = [r, ...g.choices.filter((c) => c !== r)]; return p; })), /right reason's place/);
  judge('PT6 tools always first in a row', tellFaults('G2-627', 2, spoil('G2-627', 2, (p) => { const c = st(p, 'card'); const rows = []; for (let r = 0; r < c.length / 4; r++) rows.push(c.slice(4 * r, 4 * r + 4).sort((a, b) => (a[2] === 'tool' ? -1 : 1) - (b[2] === 'tool' ? -1 : 1))); p.stamps = [...p.stamps.filter((s) => s[0] !== 'card'), ...rows.flat()]; return p; })), /a tool at each place/);
  judge('PT7 the answer always a dollar', tellFaults('G2-628', 2, spoil('G2-628', 2, (p) => { const g = p.groups.find((x) => x.id === 'lowest'); g.choices = g.choices.map((c) => [c[0], +c[0] === 100 ? 'right' : 'no']); return p; })), /50 cents or a dollar/);
  judge('PT8 the coins that pay always first', tellFaults('G2-630', 2, spoil('G2-630', 2, (p) => { for (const t of p.trays) { const need = Object.fromEntries(t.way.split(',').map((x) => [x.split(':')[0], +x.split(':')[1]])); const pay = [], rest = []; const left = { ...need }; for (const c of t.coins) { if (left[c] > 0) { pay.push(c); left[c]--; } else rest.push(c); } t.coins = [...pay, ...rest]; } return p; })), /coins that pay sit at/);
  judge('PT9 the sentences in the pictures\' order', tellFaults('G2-629', 2, spoil('G2-629', 2, (p) => { const rows = st(p, 'banklines').map((s) => s[1]); p.html = p.html.replace(/data-s2-banksent="[a-z]+"/g, () => `data-s2-banksent="${rows.shift()}"`); return p; })), /pictures' order/);
  judge('PT10 Sunny Island always at the first place', tellFaults('G2-623', 2, spoil('G2-623', 2, (p) => { p.meta = { ...p.meta, order: ['sunny', ...p.meta.order.filter((x) => x !== 'sunny')] }; return p; })), /sunny at each place/);
  judge('PT11 the split of goods never varies at level 1', tellFaults('G2-622', 1, spoil('G2-622', 1, (p) => { const t = st(p, 'trade'); p.stamps = [...p.stamps.filter((s) => s[0] !== 'trade'), ...t.map((s, i) => [s[0], s[1], i < 2 ? 'in' : 'out'])]; return p; })), /the split in \/ out|in at each place/);
  // answers on spoiled pages (control: the real page of the same type and level, answerFaults above)
  // review round 1 (row 43): the surface of a card never sorts it (control: the real copies, measured in the sweep)
  const reword = (fn) => (p) => { p.cards = p.cards.map((c) => ({ ...c, word: fn(c.kind, c.word) })); return p; };
  judge('PT12 every skill worded "knowing ..." again', tellFaults('G2-627', 2, spoil('G2-627', 2, reword((k, w) => (k === 'skill' ? 'knowing ' + w : w)))), /first word \(a \/ an\) sorts the cards/);
  judge('PT13 every tool named in two words ("a drill")', tellFaults('G2-627', 2, spoil('G2-627', 2, reword((k, w) => (k === 'tool' ? w.split(' ').slice(0, 2).join(' ') : w)))), /number of words sorts the cards/);
  judge('PT14 a tool card without its worker', tellFaults('G2-627', 2, spoil('G2-627', 2, (p) => { p.cards = p.cards.map((c) => (c.kind === 'tool' ? { ...c, worker: false } : c)); return p; })), /show no worker/);
  judge('PT15 the round-1 wording back ("to" and "for" sorted the cards 81-85%)', tellFaults('G2-627', 2, spoil('G2-627', 2, (p) => { p.cards = p.cards.map((c) => ({ ...c, word: ROUND1_WORDS[c.id] || c.word })); return p; })), /the word "(to|for)" sorts the cards/);
  const ap = (name, id, lv, fn, re) => { const r = buildPage(loadType(id), lv, 1); judge(name, answerFaults(id, lv, pageOf({ ...r, bodyHtml: fn(r.bodyHtml) })), re); };
  ap('PA1 a law stamped with the wrong letter', 'G2-615', 2, (h) => h.replace(/(data-s2-write="[a-z]+" data-dk-answer=")([A-D])"/, (m, a, l) => a + (l === 'A' ? 'B' : 'A') + '"'), /stamped [A-D] \(the gate/);
  ap('PA2 the governor stamped local', 'G2-616', 2, (h) => h.replace(/data-s2-leader="governor" data-dk-answer="state"/, 'data-s2-leader="governor" data-dk-answer="local"'), /governor stamped local/);
  ap('PA3 the toy store stamped a service', 'G2-617', 2, (h) => h.replace(/data-s2-place="toys" data-dk-answer="business"/, 'data-s2-place="toys" data-dk-answer="service"'), /toys stamped service/);
  ap('PA4 a fourth flood change drawn', 'G2-619', 1, (h) => h.replace('data-s2-change="road-water"', 'data-s2-change="sandbags" data-dk-answer="change"><g data-s2-change="road-water"'), /the after picture stamps/);
  ap('PA5 the Pacific coast stamped for hurricanes', 'G2-619', 3, (h) => h.replace(/data-s2-coastlabel="pacific" data-dk-answer="no"/, 'data-s2-coastlabel="pacific" data-dk-answer="hurricane"'), /pacific coast stamped hurricane/);
  ap('PA6 a tradition matched to the wrong symbol', 'G2-620', 2, (h) => h.replace(/(data-s1-key="kwanzaa" data-dk-answer=")kinara"/, '$1menorah"'), /kwanzaa matched to menorah/);
  ap('PA7 a label stamped with another country', 'G2-621', 2, (h) => h.replace(/data-s2-origin="banana" data-dk-answer="ECU"/, 'data-s2-origin="banana" data-dk-answer="PER"'), /banana stamped PER/);
  ap('PA8 level 1 without its outlines', 'G2-621', 1, (h) => h.replace(/data-s2-pick="/g, 'data-x-pick="'), /outlined countries are none/);
  ap('PA9 corn stamped as bought from other countries', 'G2-622', 2, (h) => h.replace(/data-s2-trade="corn" data-dk-answer="out"/, 'data-s2-trade="corn" data-dk-answer="in"'), /corn stamped in/);
  ap('PA10 an island stamped with the wrong giver', 'G2-623', 2, (h) => h.replace(/data-s2-trade-need="sunny" data-dk-answer="fish<-cold"/, 'data-s2-trade-need="sunny" data-dk-answer="fish<-hilly"'), /sunny stamped/);
  ap('PA11 a "both" sentence stamped "one"', 'G2-624', 2, (h) => h.replace(/(data-s2-sent="a:[a-z]+" data-dk-answer=")both"/, '$1one"'), /stamped one/);
  ap('PA12 the clue stamped on the wrong sentence', 'G2-626', 2, (h) => h.replace(' data-dk-answer="clue"', '').replace('data-s2-townsent="0"', 'data-s2-townsent="0" data-dk-answer="clue"'), /the clue stamped 0/);
  ap('PA13 a skill stamped a tool', 'G2-627', 2, (h) => h.replace(/(data-s2-card="[a-z-]+" data-dk-answer=")skill"/, '$1tool"'), /stamped tool/);
  ap('PA22 the level-3 baker row without a machine', 'G2-627', 3, (h) => h.replace(/data-s2-card="(oven|mixer)"/g, 'data-s2-card="whisk"'), /shows no machine/);
  ap('PA14 the lemonade total off by a dollar', 'G2-628', 2, (h) => h.replace(/(data-s2-total="1" data-dk-answer=")(\d+)"/, (m, a, n) => a + (+n + 1) + '"'), /the total stamped/);
  ap('PA15 the lowest price stamped on the dearest', 'G2-628', 2, (h) => h.replace(/(data-dk-item="lowest"[\s\S]*?)data-dk-answer="right"/, '$1data-dk-answer="QQ"').replace(/data-s2-pick="\$1 a cup" data-dk-answer="no"/, 'data-s2-pick="$$1 a cup" data-dk-answer="right"').replace('data-dk-answer="QQ"', 'data-dk-answer="no"'), /lowest price stamped|right choices/);
  ap('PA16 a picture stamped with another sentence', 'G2-629', 2, (h) => h.replace(/data-s2-banklines="safe" data-dk-answer="safe"/, 'data-s2-banklines="safe" data-dk-answer="loan"'), /safe picture stamped loan/);
  ap('PA17 a tray with two ways to pay', 'G2-630', 2, (h) => h.replace(/(data-s2-tray="[a-z]+" data-s2-price="(\d+)" data-dk-answer="[^"]+" style="[^"]*">)/, (m, a, pr) => a + '<span data-dk-box data-s2-coin="penny"></span>'.repeat(+pr)), /can be paid \d+ ways|coins on a tray/);
  ap('PA18 the change from a dollar wrong', 'G2-630', 3, (h) => h.replace(/(data-s2-changebox="1" data-dk-answer=")(\d+)"/, (m, a, n) => a + (+n + 5) + '"'), /the change stamped/);
  ap('PA19 an answer on the record page', 'G2-614', 2, (h) => h.replace('data-s2-venn="1"', 'data-s2-venn="1" data-dk-answer="x"'), /record page carries an answer/);
  ap('PA20 a quarter on a level-1 tray', 'G2-630', 1, (h) => h.replace('<span data-dk-box data-s2-coin="penny"', '<span data-dk-box data-s2-coin="quarter"></span><span data-dk-box data-s2-coin="penny"'), /a coin not of level 1|ways/);
  ap('PA21 a price that brings in exactly the cost', 'G2-628', 2, (h) => { const tot = +/data-s2-total="1" data-dk-answer="(\d+)"/.exec(h)[1]; return h.replace(/data-s2-brings="20" data-dk-answer="2"/, `data-s2-brings="${tot * 10}" data-dk-answer="${tot}"`); }, /brings in exactly the cost/);
  // page rules (control: the real page of the same type and level, pageRuleFaults above)
  ap('PA23 Ecuador and Colombia outlined together at level 1', 'G2-621', 1, (h) => { let n = 0; return h.replace(/data-s2-pick="[A-Z]{3}"/g, () => (n++ === 0 ? 'data-s2-pick="ECU"' : 'data-s2-pick="COL"')); }, /Ecuador and Colombia outlined together/);
  ap('PA24 the origins map asks about no country (the label check measures nothing)', 'G2-621', 2, (h) => h.replace(/ data-s2-want="[A-Z,]*"/, ''), /asked countries/);
  const pp = (name, id, lv, fn, re, insFn) => { const t = loadType(id), r = buildPage(t, lv, 1); judge(name, pageRuleFaults(id, lv, fn(r.bodyHtml), insFn ? insFn(insOf(t, lv)) : insOf(t, lv)), re); };
  pp('PG1 "free" on a page', 'G2-630', 2, (h) => h.replace('My shopping record', 'My free shopping record'), /says "free"/);
  pp('PG2 a number over 1,000', 'G2-628', 2, (h) => h.replace('want to sell lemonade', 'want to sell 1500 cups of lemonade'), /the number 1500/);
  pp('PG3 $2.50 on a page', 'G2-628', 2, (h) => h.replace('want to sell lemonade', 'want to sell lemonade for $2.50'), /dollars and cents together/);
  pp('PG4 the flood asks for 4 things', 'G2-619', 1, (h) => h.replace('circle the 3 things the flood changed', 'circle the 4 things the flood changed'), /does not ask for the 3 changes/);
  pp('PG5 "Gulf of Mexico" on the map', 'G2-619', 3, (h) => h.replace('>Gulf coast<', '>Gulf of Mexico coast<'), /names the gulf/);
  pp('PG6 sharing a tradition not a choice', 'G2-620', 1, (h) => h.replace(/If you want to,?/gi, 'Now'), /not offered as a choice/, (i) => i.replace(/If you want to,? /i, ''));
  pp('PG7 a real person\'s name on the leader cards', 'G2-616', 2, (h) => h.replace('>the president<', '>President Lincoln<'), /real person's name/);
  pp('PG8 the photograph not dated', 'G2-625', 2, (h) => h.replace('Main Street, about 1910', 'Main Street'), /not dated about 1910/);
  pp('PG9 the level-1 instruction not saying the countries are outlined', 'G2-621', 1, (h) => h, /does not say the countries are outlined/, (i) => i.replace('The countries are outlined on the map. ', ''));
  // review round 1
  pp('PG10 the partner\'s view without its second line (level 3)', 'G2-614', 3, (h) => { const i = h.indexOf('data-s2-frame="partner"'); const j = h.indexOf('<svg data-dk-writerow="1"', h.indexOf('<svg data-dk-writerow="1"', i) + 10); const k = h.indexOf('</svg>', j) + 6; return h.slice(0, j) + h.slice(k); }, /partner view has 2 lines/);
  pp('PG11 two lines a part in the circles (level 3)', 'G2-614', 3, (h) => h.replace(/<line [^>]*data-s2-vennline="me"\/>/, ''), /circles have 2 lines a part/);
  pp('PG12 the level-2 laws without "use each letter one time"', 'G2-615', 2, (h) => h, /use each letter one time/, (i) => i.replace(' Use each letter one time.', ''));
  pp('PG13 the state picture called "our state"', 'G2-616', 1, (h) => h.replace('>one state<', '>our state<'), /not captioned "one state"/);
  pp('PG14 no line for our own state', 'G2-616', 2, (h) => h.replace(/data-s2-ourstate="1"/, 'data-x-ourstate="1"'), /no line "Our state is/);
  pp('PG15 a leader in a ball cap', 'G2-616', 2, (h) => h.replace(/data-s2-hair="[a-z]+"/, 'data-s2-hair="cap"'), /with cap hair/);
  pp('PG16 a leader card without its flag', 'G2-616', 1, (h) => h.replace('data-s2-drawn="flag"', 'data-x-drawn="flag"'), /card has no flag/);
  pp('PG17 "is used by" back', 'G2-617', 2, (h) => h.replace(/>helps</g, '>is used by<'), /"is used by"/);
  pp('PG18 the sea ice back on the page', 'G2-618', 2, (h) => h.replace('data-s2-pair="', 'data-s2-pair="sea-ice" data-x="'), /sea-ice pair/);
  pp('PG19 a short "because" line at level 3', 'G2-618', 3, (h) => h.replace(/(data-s2-pair="[a-z]+"[\s\S]*?<svg data-dk-writerow="1"[^>]*?width=")([0-9.]+)"/, '$1200"'), /"It changed because" line 200 px/);
  pp('PG20 "our town" in the flood captions', 'G2-619', 1, (h) => h.replace('A town before the flood', 'Our town before the flood'), /"our town"/);
  pp('PG21 level 3 asks where each tradition is widely kept', 'G2-620', 3, (h) => h.replace('the country where it began', 'its country'), /does not ask where each tradition began/);
  pp('PG22 the label question about home', 'G2-621', 3, (h) => h.replace('One thing in our classroom', 'One thing from home'), /asks about home/);
  pp('PG23 the arrows without a direction', 'G2-623', 2, (h) => h, /which way the arrows point/, (i) => i.replace('Draw an arrow from the island that has each thing to the island that needs it.', 'Draw arrows to show the trades.'));
  pp('PG24 the horse without its head', 'G2-625', 1, (h) => h.replace('data-s2-drawn="horse-head"', 'data-x-drawn="horse-head"'), /without a head/);
  pp('PG25 "copy the sentence that tells why" back', 'G2-626', 2, (h) => h.replace('says the town grew and tells why', 'tells why the town grew'), /two sentences tell why/);
  pp('PG26 a town at first without what its story names', 'G2-626', 3, (h) => h.replace(/data-s2-drawn="(river|rowboat|one-store|one-school|dirt-road)"/g, 'data-x-drawn="$1"'), /at first shows no/);
  pp('PG27 a short "less likely" line', 'G2-626', 3, (h) => h.replace(/(data-s2-frame="less"[\s\S]*?<svg data-dk-writerow="1"[^>]*?width=")([0-9.]+)"/, '$1260"'), /"less likely" line 260 px/);
  pp('PG28 a skill card without its thought bubble', 'G2-627', 2, (h) => h.replace(/(data-dk-answer="skill"[\s\S]*?)data-s2-drawn="thought-bubble"/, '$1data-x-drawn="thought-bubble"'), /skill [a-z-]+ has no thought bubble/);
  pp('PG29 "With a ___" back', 'G2-627', 3, (h) => h.replace('The baker uses', 'With a'), /baker sentence is not/);
  pp('PG30 the left-over sentence at any price', 'G2-628', 3, (h) => h.replace('Choose a price that brings in more than they must pay.', 'At the price I would choose:'), /not asked at a price that brings in more/);
  pp('PG33 "1 dollars are left over" (the frame breaks on an answer of 1)', 'G2-628', 3, (h) => h.replace('a cup, they have $', 'a cup,').replace('>left over.<', '>dollars are left over.<'), /left-over sentence is not asked/);
  pp('PG34 "under each picture" again', 'G2-629', 2, (h) => h, /does not say "next to each picture"/, (i) => i.replace('next to each picture', 'under each picture'));
  pp('PG35 a short "Our state is" line', 'G2-616', 2, (h) => { const i = h.indexOf('data-s2-ourstate="1"'); return h.slice(0, i) + h.slice(i).replace(/(<svg data-dk-writerow="1"[^>]*?width=")([0-9.]+)"/, '$1220"'); }, /"Our state is" line 220 px/);
  pp('PG36 a fence on the hill', 'G2-618', 2, (h) => h.replace('data-s2-drawn="hill"', 'data-s2-drawn="fence"'), /the hill shows a fence/);
  { const t = loadType('G2-624'); let found = null; for (let sd = 1; sd <= 40 && !found; sd++) for (const lv of [1, 2, 3]) { const r = buildPage(t, lv, sd); if (/teller:park worker/.test(r.bodyHtml)) { found = [lv, r.bodyHtml]; break; } } judge('PG37 Ms. Cole without her hair', found ? pageRuleFaults('G2-624', found[0], found[1].replace('data-s2-drawn="ponytail"', 'data-x-drawn="ponytail"'), insOf(t, found[0])) : ['no playground page found'], /no hair under her cap/); }
  // review round 3 (row 10): a skill bubble never draws a tool (control: every real G2-627 page in the sweep)
  { const t = loadType('G2-627'); let found = null; for (let sd = 1; sd <= 40 && !found; sd++) for (const lv of [1, 2, 3]) { const r = buildPage(t, lv, sd); if (/data-s2-think="measure"/.test(r.bodyHtml)) { found = [lv, r.bodyHtml]; break; } }
    const tape = '<g data-s2-item="tape-measure"><rect x="-14" y="-10" width="12" height="10" fill="#F4C542"/><rect x="-2" y="-3" width="16" height="3" fill="#F4C542"/></g>';
    judge('PG38 the tape measure back in the measuring bubble', found ? pageRuleFaults('G2-627', found[0], found[1].replace('<g data-s2-item="board">', tape + '<g data-s2-item="board">'), insOf(t, found[0])) : ['no measuring bubble found'], /bubble draws a tape-measure \(a tool/);
    judge('PG39 a shape no item names in a bubble', found ? pageRuleFaults('G2-627', found[0], found[1].replace('data-s2-think="measure">', 'data-s2-think="measure"><rect x="0" y="0" width="5" height="5"/>'), insOf(t, found[0])) : ['no measuring bubble found'], /draws something no item names/); }
  pp('PG31 the family hands the banker the money', 'G2-629', 3, (h) => h.replace('data-s2-giver="banker"', 'data-s2-giver="family"'), /does not show the banker giving the money/);
  pp('PG32 the statement shows $20', 'G2-629', 2, (h) => h.replace('>$100<', '>$20<'), /statement does not show \$100/);

  // ---- 3. render
  if (!NO_RENDER) {
    const puppeteer = require('puppeteer');
    const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
    const OUTD = path.join(require('os').tmpdir(), 'verify-dk-social-2');
    fs.mkdirSync(OUTD, { recursive: true });
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const stacks = [];
    const render = async (type, lv, v, base) => {
      const strings = withLevelInstruction(resolveStrings(type.id, 'en', type), type.id, lv, 'en');
      const r = await renderInstance({ type, theme: null, difficulty: lv, locale: 'en', strings, variant: v, page, outDir: OUTD, baseName: base });
      for (const x of ['.pdf', '.png', '.html']) try { fs.unlinkSync(path.join(OUTD, base + x)); } catch (e) {}
      return r;
    };
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
          if (v === 1) { const stk = await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom); return Math.round(Math.max(...ink) - rt.top); }); stacks.push(`${id} L${lv} ${stk}`); }
          if (v === (QUICK ? 1 : 2)) { const sw = await layoutSweep(t, lv, QUICK ? 30 : SEEDS); swept += sw.n; ok(!sw.faults.length, `${id} L${lv} layout sweep (${sw.n} distinct of ${QUICK ? 30 : SEEDS} generator seeds): ${sw.faults.slice(0, 4).join(' | ')}`); }
        }
        process.stdout.write(id + ' ');
      }
      console.log(`\nrender done (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
      const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); return { ...r, bodyHtml: fn(r.bodyHtml) }; } }; };
      const pr = async (name, id, lv, fn, re) => { const r = await render(spoilType(id, fn), lv, 1, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re); };
      // each render poison's control is the real page of the same type and level, rendered above (ok() on its verify)
      await pr('PR1 the page shrunk (a blank band at the bottom)', 'G2-618', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is|empty page under/);
      await pr('PR2 two map labels on top of each other', 'G2-621', 2, (h) => h.replace(/(<g data-s2-label="PER">)<rect x="[0-9.]+" y="[0-9.]+"/, (m, a) => { const ecu = /<g data-s2-label="ECU"><rect x="([0-9.]+)" y="([0-9.]+)"/.exec(h); return a + `<rect x="${ecu[1]}" y="${ecu[2]}"`; }).replace(/(<g data-s2-label="PER"><rect x="[0-9.]+" y="[0-9.]+" width="[0-9.]+" height="[0-9.]+" rx="3" fill="#FFFFFF" stroke="#3A3530" stroke-width="0.8"\/><text x=")[0-9.]+(" y=")[0-9.]+/, (m, a, b) => { const ecu = /<g data-s2-label="ECU"><rect x="[0-9.]+" y="[0-9.]+" width="[0-9.]+" height="[0-9.]+" rx="3" fill="#FFFFFF" stroke="#3A3530" stroke-width="0.8"\/><text x="([0-9.]+)" y="([0-9.]+)/.exec(h); return a + ecu[1] + b + ecu[2]; }), /labels "[A-Z]{3}" and "[A-Z]{3}" overlap/);
      await pr('PR3 the star out of the United States', 'G2-621', 2, (h) => h.replace(/(data-s2-star="1")/, '$1 transform="translate(0 200)"'), /star is not inside the United States/);
      await pr('PR4 the after picture without the CLOSED sign', 'G2-619', 1, (h) => h.replace('data-s2-change="school-closed"', 'data-x="school-closed"'), /the after picture shows the changes/);
      await pr('PR5 the kinara\'s candles out of order', 'G2-620', 2, (h) => h.replace(/data-s2-candle="red"/, 'data-s2-candle="green"'), /the kinara's candles are/);
      await pr('PR6 a menorah of eight branches', 'G2-620', 2, (h) => h.replace('data-s2-branches="9"', 'data-s2-branches="8"'), /not nine branches/);
      await pr('PR7 a writing line 40 px', 'G2-629', 2, (h) => h.replace(/(data-s2-banklines="[a-z]+"[^>]*>)<svg ([^>]*?)width="[0-9.]+"/, '$1<svg $2width="40"'), /a writing line \d+ px/);
      await pr('PR8 a coin not at its real size', 'G2-630', 2, (h) => h.replace(/(<span data-dk-box data-s2-coin="quarter" style="display:block;flex-shrink:0"><svg xmlns="http:\/\/www.w3.org\/2000\/svg" width=")91.7(" height=")91.7"/, '$1120$2120"'), /a quarter drawn 120/);
      await pr('PR9 the old photograph in colour', 'G2-625', 2, (h) => h.replace(/(data-s2-art="old-photo"[^>]*>)/, '$1<rect x="10" y="10" width="40" height="30" fill="#4A7BD0"/>'), /not black and white/);
      await pr('PR10 two places of the town on top of each other', 'G2-617', 2, (h) => h.replace(/<g data-s2-place="pizza" data-dk-answer="business">/, '<g data-s2-place="pizza" data-dk-answer="business" transform="translate(0 -300)">'), /overlap \(one circle would take in both\)/);
      await pr('PR11 an empty band inside a story card', 'G2-624', 2, (h) => h.replace(/(data-s2-sent="a:[a-z]+" data-dk-answer="[a-z]+" style=")/g, (m, a) => a).replace(/(data-s2-storycard="a"[^>]*style="[^"]*)/, '$1;min-height:420px'), /empty box (above|below) its content|the stack/);
      await pr('PR12 the Venn without its "Both of us" part', 'G2-614', 2, (h) => h.replace('data-s2-part="both"', 'data-s2-part="x"'), /do not name their three parts/);
      await pr('PR13 an off-palette colour in a drawing', 'G2-623', 2, (h) => h.replace('fill="#8CC56B"', 'fill="#123456"'), /outside the SK palette/);
      await pr('PR14 every person one skin tone', 'G2-629', 2, (h) => h.replace(/data-sk-skin="s\d"/g, 'data-sk-skin="s3"'), /same skin tone/);
      await pr('PR15 a box laid over another', 'G2-626', 2, (h) => h.replace('data-s2-history="1"', 'data-s2-history="1"').replace(/(<div class="dk-tile dk-tile--white" data-dk-box data-s2-history="1" style=")/, '$1margin-top:-120px;'), /two boxes collide|empty band/);
      await pr('PR16 a kit box too small to draw in', 'G2-619', 2, (h) => h.replace(/width:(\d+)px;height:104px/g, 'width:$1px;height:40px'), /a kit box \d+ x 40 px/);
      await pr('PR17 a coast label on the land', 'G2-619', 3, (h) => h.replace(/(<g data-s2-coastlabel="gulf")/, '$1 transform="translate(0 -120)"'), /label covers the map|labels overlap/);
      await pr('PR18 the flood asks for 4 things (render)', 'G2-619', 2, (h) => h.replace('circle the 3 things the flood changed', 'circle the 4 things the flood changed'), /asks for 4 changes/);
      await pr('PR19 a tradition\'s symbol straight across (three rows)', 'G2-620', 1, (h) => { const ks = [...h.matchAll(/data-s1-key="([^"]+)" data-dk-answer="([^"]+)"/g)]; const rs = [...h.matchAll(/data-s1-key="([^"]+)" data-s1-right="1"/g)].map((m) => m[1]); let out = h; rs.forEach((k, j) => { out = out.replace(`data-s1-key="${k}" data-s1-right="1"`, `data-s1-key="TMP${j}" data-s1-right="1"`); }); ks.forEach((m, i) => { out = out.replace(`data-s1-key="TMP${i}" data-s1-right="1"`, `data-s1-key="${m[2]}" data-s1-right="1"`); }); return out; }, /straight across/);
      // review round 1
      await pr('PR20 a grown-up drawn smaller than the child beside them', 'G2-629', 2, (h) => h.replace(/(data-s2-art="bank:loan"[\s\S]*?data-s2-grownup="jacket"[^>]*>\s*<g transform="translate\([0-9.]+ [0-9.]+\) scale\()0\.62 0\.62/, '$10.3 0.3'), /a grown-up \d+ px tall beside a child/);
      await pr('PR21 a flood helper standing above the boat', 'G2-619', 1, (h) => h.replace(/(data-s2-grownup="lifevest"[^>]*>\s*<g transform="translate\([0-9.]+ )([0-9.]+)\)/, (m, a, y) => a + (+y - 22) + ')'), /a helper is not sitting in the boat/);
      await pr('PR22 a tradition symbol too small to count its candles', 'G2-620', 3, (h) => h.replace(/(<svg[^>]*?)width="74" height="74"([^>]*data-s2-art="symbol:)/g, '$1width="50" height="50"$2'), /a tradition symbol 50 px/);
      await pr('PR23 the United States label back over Mexico', 'G2-621', 2, (h) => { const m = /<g data-s2-label="USA"><rect x="([0-9.]+)" y="([0-9.]+)"/.exec(h); return h.replace(m[0], `<g data-s2-label="USA"><rect x="${(+m[1] + 6).toFixed(1)}" y="${(+m[2] + 40).toFixed(1)}"`); }, /lies on MEX/);
      // review round 2
      await pr('PR24 a tool floating beside the hand of the worker', 'G2-627', 1, (h) => h.replace('data-s2-drawn="tool-in-hand"', 'data-s2-drawn="tool-in-hand" transform="translate(40 -40)"'), /floats beside the worker's hand/);
      await pr('PR25 a sign word running past its sign', 'G2-625', 1, (h) => h.replace(/(<g data-s2-sign="HARDWARE"><rect x="[0-9.]+" y="[0-9.]+" width=")([0-9.]+)"/, '$150"'), /runs past its sign/);
      // 2026-11-25 picture fix: every person at furniture stands behind it (drawn before it, feet hidden by it), measured
      const furnitureFirst = (h, art, furn) => { const i = h.indexOf('data-s2-art="' + art + '"'), e = h.indexOf('</svg>', i), seg = h.slice(i, e), fm = new RegExp('<g data-s2-drawn="' + furn + '">[\\s\\S]*?</g>').exec(seg)[0], noF = seg.replace(fm, ''), p0 = noF.indexOf('<g transform="translate('); return h.slice(0, i) + noF.slice(0, p0) + fm + noF.slice(p0) + h.slice(e); };
      const unmark = (h, art) => { const i = h.indexOf('data-s2-art="' + art + '"'), e = h.indexOf('</svg>', i); return h.slice(0, i) + h.slice(i, e).replace(/data-sk-skin="/g, 'data-x-skin="') + h.slice(e); };
      await pr('PR26 the library desk drawn before the librarian', 'G2-624', 1, (h) => furnitureFirst(h, 'teller:librarian', 'desk'), /at the desk is drawn after it/);
      await pr('PR27 the loan desk short again (the banker\'s shoes under it)', 'G2-629', 2, (h) => h.replace('<rect x="104" y="74" width="50" height="30"', '<rect x="104" y="70" width="50" height="26"'), /at the desk: the feet are [0-9.]+ px below its foot/);
      await pr('PR28 the leader below the lectern\'s foot again', 'G2-616', 1, (h) => h.split('<g transform="translate(44 94)').join('<g transform="translate(44 99)'), /at the lectern: the feet are [0-9.]+ px below its foot/);
      await pr('PR29 the park bench moved under the child', 'G2-617', 2, (h) => { const i = h.indexOf('data-s2-art="town"'), e = h.indexOf('</svg>', i), seg = h.slice(i, e); const b = /<g data-s2-drawn="bench"><rect x="([0-9.]+)" y="[0-9.]+" width="([0-9.]+)"/.exec(seg), c = /<g transform="translate\(([0-9.]+) /.exec(seg.slice(b.index)); return h.slice(0, i) + seg.replace('<g data-s2-drawn="bench">', `<g data-s2-drawn="bench" transform="translate(${(+c[1] - (+b[1] + +b[2] / 2)).toFixed(1)} 0)">`) + h.slice(e); }, /at the bench is drawn after it/);
      await pr('PR30 the loan scene\'s people unmarked (the check measures nothing)', 'G2-629', 3, (h) => unmark(h, 'bank:loan'), /people at furniture judged in "bank:loan"/);
    } finally { await browser.close(); }
    console.log('stacks (level 1-3, copy 1, measured on what is drawn): ' + stacks.join(', '));
    console.log(`layout sweep: ${swept} distinct pages of the generator's seeds 1..${QUICK ? 30 : SEEDS} judged by each type's own verify`);
  }
  // the Level Set words: distinct word sets in 30 copies a level
  const ls = IDS.map((id) => id.slice(3) + ' ' + [1, 2, 3].map((lv) => { const t = loadType(id); return new Set(Array.from({ length: 30 }, (_, s) => JSON.stringify(t.levelSetWords(buildPage(t, lv, s + 1).meta)))).size; }).join('/')).join(' · ');
  console.log('Level Set words (distinct of 30 copies a level): ' + ls);
  console.log('G2-627 surface (best a child could sort by one cue alone, over the sweep copies; 50% is chance): ' + Object.entries(MEASURED).map(([k, m]) => `${k}: ${m.cards} cards, skills ${(m.share * 100).toFixed(1)}%; top words ${m.words.slice(0, 5).map(([w, a]) => `"${w}" ${(a * 100).toFixed(1)}%`).join(', ')}; first word ${m.firsts.slice(0, 1).map(([w, a]) => `"${w}" ${(a * 100).toFixed(1)}%`)} (a/an ${(m.firstWord * 100).toFixed(1)}%); last word ${m.lasts.slice(0, 1).map(([w, a]) => `"${w}" ${(a * 100).toFixed(1)}%`)}; number of words ${(m.length * 100).toFixed(1)}%; worker on the card ${(m.worker * 100).toFixed(0)}%; thought bubble ${(m.bubble * 100).toFixed(0)}% (the concept)`).join(' · '));
  console.log(plog.join('\n'));
  console.log(`poisons ${killed}/${poisons} killed`);
  ok(killed === poisons, `${poisons - killed} poisons not killed`);
  if (fails.length) { console.log('FAIL (' + fails.length + '):\n  ' + fails.slice(0, 60).join('\n  ')); process.exit(1); }
  console.log(`PASS (${assertions} assertions, ${SEEDS} seeds a level; ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
main().catch((e) => { console.error(e); process.exit(1); });
