#!/usr/bin/env node
/**
 * verify-dk-social-1.js — the gate of the Batch S1 Grade 1 social studies pages (G1-653 .. G1-670; factory
 * types/_shared/dk-social-1.js + its drawings dk-social-1-art.js; bank data/social/dk-social-1.js; Daily Teaching System
 * Stage D-5, 2026-11-24).
 *
 *   node scripts/worksheet-gen/qa/verify-dk-social-1.js [--quick] [--seeds=400]
 *
 *   1. BANK: every closed item has ONE right answer by the gate's OWN tables (never the bank's word): which place each rule
 *      belongs to (and the two places a child could swap kept apart on level 1), the virtue of each citizen story and every
 *      virtue a child could defend (the printed distractor must be none of them), what each leader leads, the postcard's
 *      clues (who / when / where, each printed on the card; no wrong choice printed on it), long ago or today (pictures that
 *      do the same job, sentences), the community each sentence fits (by a thing drawn in that picture ONLY), the land of
 *      each worker (no worker drawn with its land's own things; no land drawn with another worker's), the park (every
 *      change a person's doing, drawn only in the evening, its help only on clean-up day), the symbols (the clue never
 *      says the name), the sources (one president each; the quarter's real size), the Fourth of July reasons, the facts
 *      about the four people (true, simple, kind: the gate's own words; no violence or death), goods and services, the
 *      goods from our town, the jobs, what pay can buy, the savings goal. Every library picture is in the manifest and on
 *      disk, colour, and not refused; every colour the drawings write is in PAL1.
 *   2. BUILD, `--seeds` (default 400) copies of every type at every level: the stamps agree with the gate's tables; NO
 *      POSITIONAL TELL (match partners: two pairs straight across half the time, three or more never, each row's partner
 *      spread, pooled over 2,000 copies; the right choice's side; the kind splits; the answer letters; the word box never in
 *      the cards' order; the right position of three; the changes asked), each pooled within a band of chance; skin tones
 *      vary on a page that shows people; the three levels differ; another locale refuses; record pages carry no answer.
 *   3. RENDER (the print pipeline), every type x level, 2 copies (1 with --quick): verify() (the Batch K page checks, the
 *      Grade 1 one-answer groups and frames, the SK checks (the flag, the speaker drawn small, the palette, skin tones) and
 *      the S1 checks (match dots and partners, drawing boxes about 2.5 inches, boxes to color about 0.5 inch, the quarter at
 *      its real size, the postcard's clues printed and the photo black and white, the park's counts, the jar's parts)) and
 *      qa/lints.js clean. Then the LAYOUT SWEEP: the generator's own seeds 1..SEEDS, every DISTINCT page swapped into the
 *      rendered page and judged by the type's own verify.
 *   4. POISONS: each check FAILS on a bank, a page or a set of pages spoiled for it; each page poison has a control that
 *      passes on the real page.
 *   Review round 1 (2026-11-24): the rules of the US first-grade teacher's review are checked too (a rule never prints its
 *   place's word, a place card never holds a rule's word; the paint story; setup pictures that show no choice; the state
 *   close-up; the photo questions; the interview asks about the past; time labels that never say the time; the
 *   communities' sentences name what is drawn; one park change = one thing, the helpers apart, one visitor; the long
 *   symbol line; the quarter's back; no "no" sign on a real reason; the town labels; the larger workers; the jar
 *   sentence; the job chart; the page fills its body) and G1-670 Prices at the Market (real US coins at their real
 *   sizes, EXACTLY ONE set of coins pays each price, the dearer thing of each pair).
 *   Review round 2 (2026-11-24): the haircut's cut hair is ONE lock and ONE small pile, each smaller than the child's ear;
 *   every clean-up helper plainly helps (a hand on the work; the can lifted with both hands; the cup going into a trash
 *   bag, held low); the stepped-on flowers (one shoe print, two flowers broken off); a picture and the sentence about the
 *   same thing never on one page (proved over the seed sweep); the suburb's garage, drawn in the suburb only, and no two
 *   sentences of a place naming one thing; "Place:" on its own line; "Circle one:" on the class meeting's level 3; the
 *   nickel of today (a front face); the coin key's own "Coins:" line and its quarter-inch margin; the paint story's teacher
 *   a plain grown-up on every cast and Maya's sorry face; no empty band inside a person card or the spend box.
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const WG = path.join(__dirname, '..');
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const B = require(path.join(WG, 'data', 'social', 'dk-social-1.js'));
const ART = require(path.join(WG, 'types', '_shared', 'dk-social-1-art.js'));
const MAN = require(path.join(WG, 'cache', 'manifest.json'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const SEEDS = Number(arg('seeds', '400'));
const IDS = Array.from({ length: 18 }, (_, k) => 'G1-' + (653 + k));
const clone = (x) => JSON.parse(JSON.stringify(x));
const key = (p) => p.theme + '/' + p.noun;
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
const RULES_OWN = { hand: 'classroom', quiet: 'library', walk: 'pool', wait: 'street' };
/** two places whose rules a child could swap: never both on a level-1 page */
const RULE_CONFUSE_OWN = [['classroom', 'library']];
/** each story: the virtue it shows and EVERY virtue a child could defend for it (the printed distractor is none of them) */
// review round 1: the paint story (owning up to a spill) replaces the lunch box (whose only printable wrong word, fair, a
// child could defend); for it a child can defend honest, responsible (she owns her mistake) and fair (no one else is blamed)
const CITIZEN_OWN = { paint: ['honest', ['honest', 'responsible', 'fair']], alone: ['kind', ['kind', 'fair']], fish: ['responsible', ['responsible', 'kind']], ball: ['fair', ['fair', 'kind']] };
/** words that are not a clue to a place (a rule and a place card may share them) */
const RULE_STOP = new Set(['the', 'and', 'for', 'with', 'your', 'you', 'not', 'are', 'its']);
const contentWords = (t) => (t.toLowerCase().match(/[a-z]+/g) || []).filter((w) => w.length >= 3 && !RULE_STOP.has(w));
const LEAD_OWN = { principal: 'school', mayor: 'town', governor: 'state', president: 'country' };
const SAYS_OWN = { principal: /a school/, mayor: /a town or a city/, governor: /a state/, president: /the whole country/ };
const TIME_OWN = { schoolhouse: 'long ago', 'school-today': 'today', 'pen-ink': 'long ago', laptop: 'today', 'walk-pail': 'long ago', 'school-bus': 'today', hoop: 'long ago', 'tablet-game': 'today', ink: 'long ago', 'one-room': 'long ago', pail: 'long ago', slate: 'long ago', bus: 'today', type: 'today', tablet: 'today', video: 'today' };
/** the community of each sentence, and the thing drawn ONLY in that community's picture */
// review round 2: "Our house is near a shopping center." (a second shopping-center clue) is replaced by the garage
const COMM_OWN = { subway: ['city', 'subway'], tall: ['city', 'apartment-building'], store: ['suburb', 'shopping-center'], garage: ['suburb', 'garage'], corn: ['town', 'corn-field'], silo: ['town', 'grain-silo'] };
/** review round 1: a sentence NAMES the thing drawn ("the big store" and "yards" fit a farm town too) */
const COMM_NAMES = { subway: /\bsubway\b/, 'apartment-building': /\bapartment\b/, 'shopping-center': /\bshopping center\b/, garage: /\bgarage\b/, 'corn-field': /\bcorn\b/, 'grain-silo': /\bsilo\b/ };
const COMM_REFUSE = /\byards?\b|\bbig store\b/;
/** review round 1: the farm town shows its town (a main street, a church steeple, a water tower) behind the fields */
const TOWN_MARKS = ['main-street', 'church-steeple', 'water-tower', 'grain-silo', 'corn-field'];
/** the land of each worker; the land's own things (never drawn with a worker) and the things that would let a child send
 *  ANOTHER worker to a land (never drawn in that land) */
const LAND_OWN = { fisher: 'coast', lumber: 'forest', farmer: 'farmland', ski: 'mountains' };
const LAND_MARK = { coast: ['fishing-boats', 'dock'], forest: ['tall-trees'], farmland: ['wheat-field'], mountains: ['snowy-mountains'] };
const PARK_OWN = { wrapper: 'pick-up', cup: 'pick-up-bench', bag: 'net', branch: 'carry-branch', flowers: 'plant', can: 'stand-can' };
/** review round 1: the drawn thing of each park change (one object each) */
const PARK_DRAWN = { wrapper: 'candy-wrapper', cup: 'cup-with-straw', bag: 'plastic-bag', branch: 'fallen-branch-with-swing', flowers: 'flowers-stepped-on', can: 'trash-can-on-its-side' };
/** review round 1: a picture label never says the time ("a school today" printed the answer); a long-ago label that fits
 *  today too is refused by name */
const TIME_WORDS = /\b(today|long ago|now|old|new|modern|newer|older)\b/i;
const THEN_LABEL_OWN = { 'pen-ink': /\bdip\b/ };
/** review round 2: each sentence and the picture that shows the same thing (never both on one page) */
const PAIR_OWN = { ink: 'pen-ink', 'one-room': 'schoolhouse', pail: 'walk-pail', bus: 'school-bus', type: 'laptop', tablet: 'tablet-game' };
/** the sentences that pair with a picture dealt on the page (each pair is the same fact asked twice) */
const pairFaults = (id, ids) => { const have = new Set(ids); return ids.filter((x) => PAIR_OWN[x] && have.has(PAIR_OWN[x])).map((x) => `${id}: the sentence "${x}" and the picture "${PAIR_OWN[x]}" (the same thing) on one page`); };
/** review round 2: the clean-up helpers' work things (a hand on one of them: plainly helping) */
const HELP_TOOL = { 'pick-up': ['wrapper', 'trash-bag'], 'pick-up-bench': ['cup', 'trash-bag'], net: ['net'], 'carry-branch': ['branch'], plant: ['trowel'], 'stand-can': ['can'] };
/** review round 2: the child figure's ear (a circle of 0.22 head radii; the head radius of a child is 9.6 units) */
const EAR_R = 0.22 * 9.6;
/** the points of the paths in an svg fragment (M / L / Q coordinates, control points too: a box that holds the drawing) */
const ptsOf = (frag) => [...frag.matchAll(/ d="([^"]+)"/g)].flatMap((m) => [...m[1].matchAll(/(-?[0-9.]+)[ ,](-?[0-9.]+)/g)].map((q) => [+q[1], +q[2]]));
const boxOf = (pts) => { const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]); return { w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys), cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, bottom: Math.max(...ys) }; };
/** review round 1: the long-ago children's clothes (a girl: long dress, pinafore, bonnet; a boy: knee pants, suspenders, a
 *  flat cap; both high boots), in both pictures of children */
const OLD_CLOTHES = ['long-dress', 'pinafore', 'bonnet', 'knee-pants', 'suspenders', 'flat-cap', 'high-boots'];
/** the ski teacher's winter gear (review round 1) */
const SKI_GEAR = ['skis', 'knit-hat', 'goggles', 'mittens', 'puffy-coat'];
/** Rosa Parks's bus (review round 1: two armchairs read as a waiting room) */
const BUS_MARKS = ['bus-body', 'bus-front-window', 'driver-seat', 'bus-pole', 'pull-cord', 'bus-seats-rows'];
/** jobs a first-grade class may not have (review: "fish feeder") */
const CLASS_JOB_REFUSE = /fish|hamster|pet|plant/i;
/** G1-670: the US coins (US Mint diameters, mm; cents), and each level's coins and price range (the design: level 1 to
 *  10 cents with pennies and ONE nickel; level 2 to 25 cents with pennies, nickels and dimes; level 3 to 50 cents, all four) */
const COIN_OWN = { penny: [19.05, 1], nickel: [21.21, 5], dime: [17.91, 10], quarter: [24.26, 25] };
const MARKET_OWN = { 1: { coins: ['penny', 'nickel'], max: 10, nickels: 1 }, 2: { coins: ['penny', 'nickel', 'dime'], max: 25 }, 3: { coins: ['penny', 'nickel', 'dime', 'quarter'], max: 50 } };
/** every way (counts per kind) the coins can pay the price, by the gate's own values */
function waysOwn(coins, price) {
  const kinds = [...new Set(coins)], have = kinds.map((k) => coins.filter((x) => x === k).length), val = kinds.map((k) => COIN_OWN[k][1]);
  const out = [];
  const walk = (i, left, pick) => { if (i === kinds.length) { if (left === 0 && pick.some((n) => n > 0)) out.push(Object.fromEntries(kinds.map((k, j) => [k, pick[j]]).filter((e) => e[1] > 0))); return; } for (let n = 0; n <= have[i] && n * val[i] <= left; n++) { pick[i] = n; walk(i + 1, left - n * val[i], pick); } pick[i] = 0; };
  walk(0, price, kinds.map(() => 0));
  return out;
}
const wayOwnKey = (w) => Object.keys(COIN_OWN).filter((k) => w[k]).map((k) => k + ':' + w[k]).join(',');
const SYMBOL_OWN = { flag: 'flag', eagle: 'bald eagle', statue: 'Statue of Liberty', bell: 'Liberty Bell' };
/** the words a clue must never print (it would say the name) */
const SYMBOL_NAMEWORDS = /\b(flag|eagle|statue|liberty|bell)\b/i;
const SOURCE_OWN = { painting: ['painting', 'Washington'], quarter: ['coin', 'Washington'], letter: ['letter', 'Lincoln'], memorial: ['building', 'Lincoln'] };
const PRES_OWN = { Washington: 'George Washington', Lincoln: 'Abraham Lincoln' };
const JULY_OWN = { laws: true, taxes: true, leaders: true, king: false, move: false, 'more-taxes': false };
/** review round 1: a real reason never looks wrong: its icon has no red "no" sign (a red circle or slash) */
const NO_SIGN = /stroke="#(D9534F|E03C31|E4574B)"/i;
/** the four people: the gate's own true sentences (checked word for word), and the skin tone each is drawn in */
const FAIRER_OWN = {
  parks: ['Rosa Parks', 'Rosa Parks would not give up her seat on a bus in Montgomery, Alabama, in 1955.'],
  bridges: ['Ruby Bridges', 'Ruby Bridges was the first Black child at her New Orleans school in 1960.'],
  keller: ['Helen Keller', 'Helen Keller could not see or hear. She wrote books and worked for people with disabilities.'],
  king: ['Martin Luther King Jr.', 'Martin Luther King Jr. led peaceful marches for fair laws.'],
};
const NO_VIOLENCE = /\b(kill|killed|shot|shoot|die|died|death|dead|murder|arrest|arrested|jail|hate|violence|attack|beat|hurt)\b/i;
const GOODS_OWN = { bread: 'good', milk: 'good', bananas: 'good', 't-shirt': 'good', apples: 'good', kite: 'good', haircut: 'service', checkup: 'service', 'bus-ride': 'service', 'story-time': 'service', mail: 'service', teeth: 'service' };
const TOWN_OWN = { bread: true, milk: true, apples: true, bananas: false, pineapple: false };
const JOBS_OWN = { baker: /bake bread/, 'bus-driver': /drive people/, dentist: /check teeth/, farmer: /food I grow and sell/ };
const SPEND_OWN = { food: true, home: true, clothes: true, shoes: true, sun: false, hug: false, rainbow: false };
const SAVE_OWN = { 1: 3, 2: 5, 3: 5 };
const REFUSED_ART = {
  'occupations/baker': 'light-skinned, like every library worker (the workers are drawn in varied skin tones)', 'occupations/farmer': 'light-skinned (drawn)', 'occupations/bus_driver_2': 'a bus with the words "TRV BUS"', 'occupations/doctor': 'light-skinned (drawn)', 'occupations/teacher': 'light-skinned (drawn)',
  'classroom/computer': 'an old screen with a tube (it reads as long ago)', 'around the house/computer': 'an old screen', 'activities/soccer': 'children played ball 100 years ago too (two times)', '4th of July/eagle': 'a red and black heraldic eagle, not a bald eagle',
  '4th of July/flag': 'a photo-style flag, not to the flag’s proportions (the flag is drawn)', 'christmas/bell': 'a Christmas bell, not the Liberty Bell', 'vehicles/subway': 'reads as a train above the ground', 'thanksgivinng/pie': 'a lattice pie',
};
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
const HEX = /#[0-9A-Fa-f]{6}\b/g;
const drawnOf = (svg) => new Set([...svg.matchAll(/data-s1-drawn="([^"]+)"/g)].map((m) => m[1]));

/* ================================================================ 1. the bank */
function bankFaults(b, src, art = ART) {
  const f = [];
  for (const r of b.RULES) if (RULES_OWN[r.id] !== r.place) f.push(`${r.id}: the bank puts "${r.text}" at the ${r.place} (the gate: ${RULES_OWN[r.id] || 'no ruling'})`);
  if (new Set(b.RULES.map((r) => r.place)).size !== b.RULES.length) f.push('two rules share one place');
  for (const [a, c] of RULE_CONFUSE_OWN) if (!b.RULE_CONFUSABLE.some(([x, y]) => (x === a && y === c) || (x === c && y === a))) f.push(`the ${a} / ${c} rules are not kept apart on level 1`);
  // review round 1: a rule never prints the word of a place card, and a place card never holds a word of a rule ("the
  // crosswalk" held "walk"): a child would match word to word without reading the rule
  for (const r of b.RULES) for (const [pl, label] of Object.entries(b.PLACE_WORD)) for (const w of contentWords(r.text)) for (const pw of [...contentWords(label), pl]) if (w === pw || pw.includes(w) || w.includes(pw)) f.push(`${r.id}: the rule "${r.text}" and the place card "${label}" share "${w}" (a word match, not a rule)`);
  for (const st of b.CITIZEN) {
    const o = CITIZEN_OWN[st.id];
    if (!o) { f.push(`${st.id}: a story the gate has no ruling for`); continue; }
    if (st.virtue !== o[0]) f.push(`${st.id}: the bank says ${st.virtue} (the gate: ${o[0]})`);
    if (!o[1].every((v) => st.defensible.includes(v))) f.push(`${st.id}: the bank's defensible virtues ${st.defensible.join('/')} leave out ${o[1].filter((v) => !st.defensible.includes(v)).join('/')} (a distractor a child could defend)`);
    if (!b.VIRTUES.some((v) => !o[1].includes(v))) f.push(`${st.id}: no virtue is left to print as the wrong one`);
  }
  // review round 1: the setup pictures show no choice (no running lines by the lone child; the ball on the ground, held by
  // no one); Lee holds the food in his hand over the tank; the crayon box lies tipped over
  { const k3 = [{ skin: 's2' }, { skin: 's4' }, { skin: 's5' }];
    if (/data-sk-motion/.test(art.citizenArt('alone', 'setup', k3))) f.push('alone: the setup picture has motion lines (the "runs off" choice)');
    const bs = art.citizenArt('ball', 'setup', k3), bm = /data-s1-drawn="ball"><circle cx="[0-9.]+" cy="([0-9.]+)"/.exec(bs);
    if (!bm || +bm[1] < 120) f.push('ball: the setup picture does not put the ball on the ground (a child holds it: the "keeps the ball" choice)');
    if (!/fish-food-in-hand/.test(art.citizenArt('fish', 'good', k3)) || /data-s1-drawn="fish-food"/.test(art.citizenArt('fish', 'good', k3))) f.push('fish: Lee does not hold the food in his hand (a box floats over the tank)');
    if (!/tipped-crayon-box/.test(art.citizenArt('crayons', 'setup', k3))) f.push('crayons: no tipped-over crayon box'); }
  // review round 2: the paint story's teacher is plainly a grown-up on EVERY cast (150 casts of the page's cast maker): a
  // full-size adult, at least 1.45 times Maya's height, with glasses and a lanyard; "I did it." is a sorry face, no grin
  { const SKC = require(path.join(WG, 'types', '_shared', 'dk-social-k.js')); const teacherFaults = new Set();
    for (let c = 1; c <= 150; c++) { const k3 = SKC.cast(3, makeRng('s1-teacher-' + c), { sex: ['f', c % 2 ? 'f' : 'm', c % 3 ? 'f' : 'm'] });
      for (const w of ['setup', 'good', 'not']) { const sv = art.citizenArt('paint', w, k3), tg = (sv.split('data-s1-teacher="1"')[1] || '');
        const ts = /scale\(([0-9.]+) [0-9.]+\)"[^>]*data-sk-age="adult"/.exec(tg), ms = /scale\(([0-9.]+) [0-9.]+\)"[^>]*data-sk-age="child"/.exec(sv);
        if (!ts || !ms) { teacherFaults.add(`paint ${w}: no teacher or no Maya drawn`); continue; }
        const ratio = (100 * +ts[1]) / (66 * +ms[1]); if (ratio < 1.45) teacherFaults.add(`paint ${w}: the teacher is ${ratio.toFixed(2)} times Maya's height (a plain grown-up: 1.45 or more)`);
        if (!/data-s1-drawn="lanyard"/.test(tg)) teacherFaults.add(`paint ${w}: the teacher has no lanyard`);
        if (!/<g fill="none" stroke="#3A3530" stroke-width="[0-9.]+"><circle/.test(tg.split('data-s1-drawn="lanyard"')[0])) teacherFaults.add(`paint ${w}: the teacher has no glasses`);
        if (w === 'good') { const maya = sv.split(/data-sk-age="child"/)[1] || ''; if (!/data-s1-drawn="sorry-face"/.test(sv)) teacherFaults.add('paint good: "I did it." has no sorry face'); if (/fill="#9B3B34"/.test(maya.split('</g></g>')[0])) teacherFaults.add('paint good: Maya grins at "I did it." (it reads as proud)'); } } }
    f.push(...teacherFaults); }
  for (const l of b.LEADERS) { if (LEAD_OWN[l.id] !== l.leads) f.push(`${l.id}: the bank says ${l.leads} (the gate: ${LEAD_OWN[l.id] || 'no ruling'})`); if (!SAYS_OWN[l.id] || !SAYS_OWN[l.id].test(l.says)) f.push(`${l.id}: says "${l.says}" (not what the ${l.id} leads)`); }
  if (new Set(b.LEADERS.map((l) => l.leads)).size !== b.LEADERS.length) f.push('two leaders lead one place');
  // review round 1: the state card is a close-up of one state (no lower 48, no Alaska, no Hawaii)
  { const st = art.usMap(340, 226, 'state'); if (!/data-s1-drawn="state-closeup"/.test(st) || /data-s1-us=/.test(st) || !/data-s1-state=/.test(st)) f.push('the state card is not a close-up of one state (it can be read as the whole country)'); }
  // the postcards: the studio and the town printed on the back, the year on the date stamp; no wrong choice printed on the card
  for (const pc of b.POSTCARDS) {
    const back = art.postcardBack(pc), front = art.postcardFront(pc, [{ skin: 's2' }, { skin: 's4' }, { skin: 's3' }]), all = (back + front).replace(/<[^>]+>/g, ' ');
    if (!back.includes(pc.studio) || !back.includes(pc.town)) f.push(`${pc.town}: the back does not print who made it and where`);
    if (!back.includes(String(pc.year))) f.push(`${pc.town}: the date stamp does not print ${pc.year}`);
    for (const t of pc.otherTowns) if (all.includes(t) || t === pc.town) f.push(`${pc.town}: a wrong town (${t}) is printed on the card`);
    for (const y of pc.otherYears) if (all.includes(String(y)) || y === pc.year) f.push(`${pc.town}: a wrong year (${y}) is printed on the card`);
    if (pc.shop.includes(pc.town) || pc.studio.includes(pc.town) || pc.shop === pc.studio) f.push(`${pc.town}: the shop or the studio carries the town's name (two answers to where)`);
    if (pc.otherTowns.length < 2 || pc.otherYears.length < 2) f.push(`${pc.town}: fewer than two wrong choices`);
    if (/#(?!FFFFFF)[0-9A-F]{6}/i.test((front + back).replace(new RegExp(['#FFFFFF', ...['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9'].map((k) => art.S1_SCENE[k])].join('|'), 'gi'), ''))) f.push(`${pc.town}: the old photograph is not black and white`);
  }
  // review round 1: the interview asks about the PAST (every question, the bank's own words)
  for (const x of b.INTERVIEW) if (!/^When you were little, /.test(x.q)) f.push(`${x.id}: the question "${x.q}" does not ask about the past`);
  // review round 1: no picture label says the time; a long-ago label never fits today
  for (const x of b.THEN_NOW_PICS) { if (TIME_WORDS.test(x.word)) f.push(`${x.id}: the label "${x.word}" says the time (the answer printed by its picture)`); if (THEN_LABEL_OWN[x.id] && !THEN_LABEL_OWN[x.id].test(x.word)) f.push(`${x.id}: the label "${x.word}" fits today too`); }
  for (const id of ['walk-pail', 'hoop']) { const sv = art.thenNowArt(id, { skin: 's2', other: { skin: 's5' } }); for (const m of OLD_CLOTHES) if (!new RegExp(`data-s1-drawn="${m}"`).test(sv)) f.push(`${id}: the children of long ago have no ${m}`); }
  // long ago and today: each job has one old and one new picture; sentences keyed by the gate
  for (const x of [...b.THEN_NOW_PICS, ...b.THEN_NOW_SENTENCES]) if (TIME_OWN[x.id] !== x.time) f.push(`${x.id}: the bank says ${x.time} (the gate: ${TIME_OWN[x.id] || 'no ruling'})`);
  const jobs = {}; for (const x of b.THEN_NOW_PICS) (jobs[x.job] = jobs[x.job] || []).push(x.time);
  for (const [j, t] of Object.entries(jobs)) if (t.sort().join() !== 'long ago,today') f.push(`the ${j} pictures are not one long ago and one today (the same job)`);
  // review round 2: each sentence names the picture it pairs with (the factory keeps the two apart by it)
  for (const x of b.THEN_NOW_SENTENCES) if ((PAIR_OWN[x.id] || undefined) !== (x.pair || undefined)) f.push(`${x.id}: the bank pairs it with ${x.pair || 'nothing'} (the gate: ${PAIR_OWN[x.id] || 'nothing'})`);
  // communities: each sentence fits ONE picture, by a thing drawn there only
  const commSvg = Object.fromEntries(b.COMMUNITIES.map((c) => [c.id, drawnOf(art.communityArt(c.id, [{ skin: 's1' }, { skin: 's4' }, { skin: 's2' }]))]));
  for (const s of b.COMMUNITY_SENTENCES) {
    const o = COMM_OWN[s.id];
    if (!o) { f.push(`${s.id}: a sentence the gate has no ruling for`); continue; }
    if (o[0] !== s.place) f.push(`${s.id}: the bank says the ${s.place} (the gate: the ${o[0]})`);
    for (const [c, set] of Object.entries(commSvg)) { if (c === o[0] && !set.has(o[1])) f.push(`${s.id}: the ${c} picture does not draw the ${o[1]}`); if (c !== o[0] && set.has(o[1])) f.push(`${s.id}: the ${c} picture draws a ${o[1]} too (two places fit)`); }
    if (!COMM_NAMES[o[1]] || !COMM_NAMES[o[1]].test(s.text)) f.push(`${s.id}: "${s.text}" does not name the thing drawn (${o[1]})`);
    if (COMM_REFUSE.test(s.text)) f.push(`${s.id}: "${s.text}" fits a farm town too`);
  }
  for (const m of TOWN_MARKS) if (!commSvg.town.has(m)) f.push(`the farm town has no ${m}`);
  // review round 2: no two sentences of one place name the same drawn thing (two shopping-center clues, none on the houses)
  for (const c of b.COMMUNITIES) { const named = {}; for (const st of b.COMMUNITY_SENTENCES.filter((x) => x.place === c.id)) for (const [thing, re] of Object.entries(COMM_NAMES)) if (re.test(st.text)) (named[thing] = named[thing] || []).push(st.id); for (const [thing, ids] of Object.entries(named)) if (ids.length > 1) f.push(`the ${c.id}: two sentences (${ids.join(', ')}) name the ${thing} (one clue twice)`); }
  // the land and its work
  for (const x of b.LAND_WORK) {
    if (LAND_OWN[x.id] !== x.land) f.push(`${x.id}: the bank sends the ${x.worker} to the ${x.land} (the gate: ${LAND_OWN[x.id] || 'no ruling'})`);
    const w = drawnOf(art.workerArt(x.id, { skin: 's2' }));
    for (const [land, marks] of Object.entries(LAND_MARK)) for (const m of marks) if (w.has(m)) f.push(`${x.id}: the worker is drawn with the ${land}'s ${m} (a picture match)`);
  }
  { const sk = drawnOf(art.workerArt('ski', { skin: 's2', kidSkin: 's4' })); for (const m of SKI_GEAR) if (!sk.has(m)) f.push(`ski: the ski teacher has no ${m}`); }
  const landSvg = Object.fromEntries(Object.keys(LAND_MARK).map((l) => [l, drawnOf(art.landArt(l))]));
  for (const [l, set] of Object.entries(landSvg)) { for (const m of LAND_MARK[l]) if (!set.has(m)) f.push(`the ${l} picture does not draw its ${m}`); for (const [l2, marks] of Object.entries(LAND_MARK)) if (l2 !== l) for (const m of marks) if (set.has(m)) f.push(`the ${l} picture draws the ${l2}'s ${m} (two lands fit one worker)`); }
  // the park: every change drawn only in the evening, its help only on clean-up day; one help each
  for (const c of b.PARK_CHANGES) {
    if (PARK_OWN[c.id] !== c.help) f.push(`${c.id}: the bank's help is ${c.help} (the gate: ${PARK_OWN[c.id] || 'no ruling: a change that is not a person’s doing'})`);
    let clean, after, up; try { clean = art.parkArt('clean', [c.id]); after = art.parkArt('after', [c.id]); up = art.parkArt('cleanup', [c.id], [{ skin: 's2' }]); } catch (e) { f.push(`${c.id}: the evening picture cannot draw it (${e.message})`); continue; }
    if (!after.includes(`data-s1-change="${c.id}"`)) f.push(`${c.id}: the evening picture does not draw it`);
    if (clean.includes('data-s1-change') || up.includes('data-s1-change')) f.push(`${c.id}: the change is drawn in the morning or on clean-up day`);
    if (!up.includes(`data-s1-help="${c.help}"`)) f.push(`${c.id}: clean-up day draws no ${c.help}`);
    // one thing: the change's group draws its own thing and no other change inside it
    const grp = (after.match(new RegExp(`<g data-s1-change="${c.id}"[^>]*>`)) || [''])[0];
    if (!PARK_DRAWN[c.id] || !grp.includes(`data-s1-drawn="${PARK_DRAWN[c.id]}"`)) f.push(`${c.id}: the evening picture does not draw it as ${PARK_DRAWN[c.id] || 'one thing'}`);
    if ((after.match(/data-s1-change=/g) || []).length !== 1) f.push(`${c.id}: drawn as more than one change`);
  }
  // review round 2: every clean-up helper holds its work (a visitor who does not help is in the picture); the can is
  // lifted with both hands and its lid lies on the grass; the cup goes into a trash bag held open
  { const all = Object.keys(PARK_OWN), up = art.parkArt('cleanup', all, Array.from({ length: 7 }, (_, i) => ({ skin: 's' + (1 + i % 6) })));
    for (const [help, tools] of Object.entries(HELP_TOOL)) { const seg = (up.split(`data-s1-help="${help}"`)[1] || '').split('data-s1-help=')[0]; for (const t of tools) if (!new RegExp(`data-s1-tool="${t}"`).test(seg)) f.push(`clean-up day: the ${help} helper holds no ${t} (every helper plainly helping)`); }
    const can = (up.split('data-s1-help="stand-can"')[1] || '').split('data-s1-help=')[0]; if (!/data-s1-drawn="can-being-lifted"/.test(can) || !/data-s1-drawn="can-lid"/.test(can)) f.push('clean-up day: the trash can is not being lifted (its lid on the grass)'); if (/data-s1-drawn="trash-can-on-its-side"/.test(can)) f.push('clean-up day: the trash can still lies on its side');
    const cup = (up.split('data-s1-help="pick-up-bench"')[1] || '').split('data-s1-help=')[0]; for (const m of ['cup-into-bag', 'trash-bag', 'trash-bag-mouth']) if (!new RegExp(`data-s1-drawn="${m}"`).test(cup)) f.push(`clean-up day: the cup helper has no ${m}`);
    // the stepped-on flower bed: one big shoe print, two flowers broken off lying on the dirt, loose petals; four upright
    const ev = art.parkArt('after', ['flowers']), ch = (ev.split('data-s1-change="flowers"')[1] || ''), up4 = (ev.split('data-s1-change="flowers"')[0].match(/data-s1-drawn="flower-upright"/g) || []).length;
    if ((ch.match(/data-s1-drawn="shoe-print"/g) || []).length !== 1) f.push('the stepped-on flowers have no one big shoe print'); if ((ch.match(/data-s1-drawn="broken-flower"/g) || []).length !== 2) f.push('the stepped-on flowers have no two flowers broken off'); if ((ch.match(/data-s1-drawn="loose-petal"/g) || []).length < 3) f.push('the stepped-on flowers have no loose petals'); if (up4 !== 4) f.push(`the stepped-on bed keeps ${up4} flowers upright (four, so the damage stands out)`); if ((art.parkArt('clean', ['flowers']).match(/data-s1-drawn="flower-upright"/g) || []).length !== 6) f.push('the morning bed has not six flowers'); }
  { const up = art.parkArt('cleanup', ['wrapper'], [{ skin: 's2' }]); if ((up.match(/data-s1-visitor=/g) || []).length !== 1) f.push('clean-up day has no visitor who is not cleaning (every person helps: nothing to look for)'); if (!/data-s1-drawn="rope-swing"/.test(art.parkArt('clean', ['wrapper']))) f.push('the morning tree has no rope swing (the broken branch has no people\'s cause)'); }
  if (new Set(b.PARK_CHANGES.map((c) => c.help)).size !== b.PARK_CHANGES.length) f.push('two changes share one help');
  if (b.PARK_CHANGES.length < 5) f.push('fewer than five changes (level 2 asks for five)');
  // symbols: the clue never prints the name
  for (const s of b.SYMBOLS) { if (SYMBOL_OWN[s.id] !== s.name) f.push(`${s.id}: the bank names it ${s.name} (the gate: ${SYMBOL_OWN[s.id] || 'no ruling'})`); if (SYMBOL_NAMEWORDS.test(s.clue)) f.push(`${s.id}: the clue "${s.clue}" says the name (the child copies it)`); }
  // sources: one president each, two of each; the quarter at its real size
  for (const s of b.SOURCES) { const o = SOURCE_OWN[s.id]; if (!o || o[0] !== s.kind || o[1] !== s.about) f.push(`${s.id}: the bank says ${s.kind} about ${s.about} (the gate: ${o ? o.join(' about ') : 'no ruling'})`); }
  if (new Set(b.SOURCES.map((s) => s.kind)).size !== b.SOURCES.length) f.push('two sources share one kind');
  if (Math.abs(b.QUARTER_MM - 24.26) > 0.005) f.push(`the quarter is ${b.QUARTER_MM} mm (24.26)`);
  if (typeof art.quarterBackArt !== 'function' || !/>QUARTER DOLLAR</.test(art.quarterBackArt(43.85, 'g'))) f.push('the quarter has no back saying QUARTER DOLLAR');
  // the Fourth of July
  for (const x of b.JULY4) if (JULY_OWN[x.id] !== x.real) f.push(`${x.id}: the bank says "${x.text}" is ${x.real ? 'a real reason' : 'not a reason'} (the gate: ${x.id in JULY_OWN ? (JULY_OWN[x.id] ? 'real' : 'not') : 'no ruling'})`);
  if (b.JULY4.filter((x) => x.real).length < 3 || b.JULY4.filter((x) => !x.real).length < 3) f.push('fewer than three of a kind (level 2 prints 1 + 3, 2 + 2 or 3 + 1)');
  for (const x of b.JULY4) if (x.real && NO_SIGN.test(art.july4Icon(x.id))) f.push(`${x.id}: a real reason's icon carries a red "no" sign (it looks wrong)`);
  { const rd = art.readingArt(makeRng('s1-crowd-1776')); for (const m of ['tricorn', 'mob-cap', 'long-dress']) if (!new RegExp(`data-s1-drawn="${m}"`).test(rd)) f.push(`the crowd of 1776 has no ${m}`); }
  { const pk = art.fairerArt('parks', null); for (const m of BUS_MARKS) if (!new RegExp(`data-s1-drawn="${m}"`).test(pk)) f.push(`Rosa Parks's bus has no ${m}`); }
  // the people: the gate's own true sentences, word for word; nothing violent
  for (const p of b.FAIRER) { const o = FAIRER_OWN[p.id]; if (!o || o[0] !== p.name || o[1] !== p.fact) f.push(`${p.id}: the bank's sentence "${p.fact}" is not the gate's true sentence`); if (NO_VIOLENCE.test(p.fact)) f.push(`${p.id}: violence or death on the child's page`); }
  // goods and services; the goods from our town
  for (const x of b.GOODS_SERVICES) if (GOODS_OWN[x.id] !== x.kind) f.push(`${x.id}: the bank says ${x.kind} (the gate: ${GOODS_OWN[x.id] || 'no ruling'})`);
  for (const x of b.TOWN_GOODS) { if (TOWN_OWN[x.id] !== x.local) f.push(`${x.id}: the bank says ${x.local ? 'from our town' : 'from far away'} (the gate: ${x.id in TOWN_OWN ? (TOWN_OWN[x.id] ? 'our town' : 'far away') : 'no ruling'})`); if (x.local !== /our town/.test(x.label) || x.local === /far away/.test(x.label)) f.push(`${x.id}: its label "${x.label}" does not say where it comes from`); }
  for (const x of b.JOBS) if (!JOBS_OWN[x.id] || !JOBS_OWN[x.id].test(x.says)) f.push(`${x.id}: says "${x.says}" (not that worker's job)`);
  { const bd = art.jobArt('bus-driver', { skin: 's2' }); for (const m of ['bus-side', 'front-window', 'steering-wheel']) if (!new RegExp(`data-s1-drawn="${m}"`).test(bd)) f.push(`the bus driver's card has no ${m} (a frame with a person reads as a TV)`); }
  // the haircut's cut hair: locks of hair (S1), never the small strands that read as bugs at this page's sizes
  { const hc = art.haircutArt({ skin: 's3', hairColor: 'black' }); if (!/data-s1-clipping="falling"/.test(hc) || !/data-s1-clipping="floor"/.test(hc) || /data-sk-clipping/.test(hc)) f.push('the haircut does not draw locks of cut hair falling and on the floor');
    // review round 2 (ruling): ONE lock falling beside the head and ONE small low pile on the floor, each smaller than the
    // child's ear (measured on the drawing's own coordinates against the child figure's ear)
    const grp = (w) => [...hc.matchAll(new RegExp(`<g data-s1-clipping="${w}">([\\s\\S]*?)</g>`, 'g'))].map((m) => m[1]);
    const fall = grp('falling'), floor = grp('floor'), kid = /<g transform="translate\(([0-9.]+) ([0-9.]+)\) scale\(([0-9.]+) [0-9.]+\)"[^>]*data-sk-age="child"/.exec(hc);
    if (fall.length !== 1 || floor.length !== 1) f.push(`the haircut draws ${fall.length} falling locks and ${floor.length} piles of cut hair (one of each: the tufts beside the chair read as combs)`);
    if (!kid) f.push('the haircut has no child to measure the cut hair against');
    else { const ear = 2 * EAR_R * +kid[3], head = [+kid[1], +kid[2] - (66 - 9.6) * +kid[3]], R = 9.6 * +kid[3];
      for (const [w, fr] of [...fall.map((x) => ['falling', x]), ...floor.map((x) => ['floor', x])]) { const b = boxOf(ptsOf(fr)); if (Math.max(b.w, b.h) >= ear) f.push(`the haircut's ${w} hair is ${Math.max(b.w, b.h).toFixed(2)} units across, not smaller than the child's ear (${ear.toFixed(2)})`);
        if (w === 'falling' && Math.hypot(b.cx - head[0], b.cy - head[1]) > 2 * R) f.push('the falling lock is not beside the child\'s head (by the scissors)');
        if (w === 'floor' && b.bottom < 86) f.push('the pile of cut hair is not on the floor'); } } }
  // the town map: every place on it has its good among the town labels
  { const places = [...art.townMapArt().matchAll(/data-s1-mapplace="([^"]+)"/g)].map((m) => m[1]); for (const pl of places) if (!b.TOWN_GOODS.some((x) => x.id === pl && x.local)) f.push(`the map's ${pl} place has no label of a good from our town`); if (places.length < 3) f.push('the town map names fewer than three places'); }
  for (const j of b.CLASS_JOBS) if (CLASS_JOB_REFUSE.test(j)) f.push(`the job chart lists "${j}" (not every first-grade class has it)`);
  // G1-670: the coins' real sizes and values; each level's coins and prices
  // review round 2: the nickel of today (made since 2006) shows Jefferson's face looking forward; the other coins a profile
  for (const k of Object.keys(COIN_OWN)) { const face = (/data-s1-face="([a-z]+)"/.exec(art.usCoin(k, 40, 'g')) || [])[1]; if (face !== (k === 'nickel' ? 'front' : 'profile')) f.push(`the ${k} is drawn with a ${face || 'no'} face (${k === 'nickel' ? 'today\'s nickel looks forward' : 'a profile, as the real coin'})`); }
  for (const c of b.US_COINS) { const o = COIN_OWN[c.id]; if (!o || Math.abs(o[0] - c.mm) > 0.005 || o[1] !== c.cents) f.push(`${c.id}: the bank says ${c.mm} mm, ${c.cents} cents (the gate: ${o ? o.join(' mm, ') + ' cents' : 'no ruling'})`); }
  for (const lv of [1, 2, 3]) { const L = b.MARKET_LEVEL[lv], o = MARKET_OWN[lv]; if (L.coins.join() !== o.coins.join()) f.push(`market level ${lv}: coins ${L.coins.join('/')} (the design: ${o.coins.join('/')})`); if (L.max > o.max || L.min < 1) f.push(`market level ${lv}: prices ${L.min}-${L.max} cents (the design: to ${o.max})`); if (o.nickels && L.maxOf.nickel > o.nickels) f.push(`market level ${lv}: ${L.maxOf.nickel} nickels on a tray (the design: one)`); }
  for (const x of b.SPEND) if (SPEND_OWN[x.id] !== x.buy) f.push(`${x.id}: the bank says pay ${x.buy ? 'can' : 'cannot'} buy it (the gate: ${x.id in SPEND_OWN ? (SPEND_OWN[x.id] ? 'can' : 'cannot') : 'no ruling'})`);
  for (const lv of [1, 2, 3]) if (b.SAVE_PRICE[lv] !== SAVE_OWN[lv]) f.push(`level ${lv}: a goal of $${b.SAVE_PRICE[lv]} (the design: $${SAVE_OWN[lv]})`);
  // pictures
  for (const [p, where] of bankPictures(b)) f.push(...artFaults(p, where));
  // the palette: every colour the drawings write is in PAL1
  if (src) for (const [name, text] of Object.entries(src)) { const bad = [...new Set((text.match(HEX) || []).map((c) => c.toUpperCase()))].filter((c) => !art.PAL1.has(c)); if (bad.length) f.push(`${name}: colours outside the S1 palette: ${bad.join(' ')}`); }
  return f;
}

/* ================================================================ 2. build sweep */
const picsOf = (html) => [...html.matchAll(/data-dk-pic="([^"]+)"/g)].map((m) => { const s = dec(m[1]); const i = s.lastIndexOf('/'); return { theme: s.slice(0, i), noun: s.slice(i + 1) }; });
/** a page's stamps, read from the html */
function pageOf(r) {
  const h = r.bodyHtml;
  // a one-answer group: its whole <div> (nested divs counted), so a group of drawn cards keeps every card
  const divEnd = (str) => { let d = 0; const re = /<div\b|<\/div>/g; let m; while ((m = re.exec(str))) { if (m[0] === '</div>') { d--; if (d === 0) return m.index; } else d++; } return str.length; };
  const groups = h.split(/(?=<div class="dk-row" data-dk-box data-g1-one="1" data-dk-item=")/).slice(1).map((seg) => { const id = /data-dk-item="([^"]+)"/.exec(seg)[1]; const body = seg.slice(0, divEnd(seg)); const ATTR = ['choice', 'virtue', 'time', 'says', 'about', 'pick', 'why', 'more'];
    // each choice: the opening tag that carries data-dk-answer; its name is the first of its data-s1-<kind> attributes
    const choices = [...body.matchAll(/<[a-z]+\b[^>]*data-dk-answer="([^"]+)"[^>]*>/g)].map((m) => { const tag = m[0]; const k = ATTR.find((a) => new RegExp(`data-s1-${a}="`).test(tag)); return [k ? new RegExp(`data-s1-${k}="([^"]+)"`).exec(tag)[1] : '?', m[1]]; });
    return { id, choices, raw: body }; });
  const lefts = [...h.matchAll(/data-s1-key="([^"]+)" data-dk-answer="([^"]+)"/g)].map((m) => [m[1], m[2]]);
  const rights = [...h.matchAll(/data-s1-key="([^"]+)" data-s1-right="1"/g)].map((m) => m[1]);
  // [id, answer, kind]: a stamp on a card, a box to write in, a sentence, a good of our town, a thing pay buys ...
  const stamps = [...h.matchAll(/data-s1-(item|write|reason|town|spend|trace|weeks)="([^"]*)"[^>]*?data-dk-answer="([^"]+)"/g)].map((m) => [m[2], m[3], m[1]]);
  // G1-670: each tray (its thing, price, stamped way to pay and the coins it holds, in order)
  const trays = h.split(/(?=<div class="dk-row" data-dk-box data-s1-tray=")/).slice(1).map((seg) => { const m = /data-s1-tray="([^"]+)" data-s1-price="(\d+)" data-dk-answer="([^"]+)"/.exec(seg); const body = seg.slice(0, seg.indexOf('</div>')); return { item: m[1], price: +m[2], way: m[3], coins: [...body.matchAll(/<span data-dk-box data-s1-coin="([a-z]+)"/g)].map((x) => x[1]) }; });
  const skins = [...h.matchAll(/data-sk-skin="(s\d)"/g)].map((m) => m[1]);
  return { meta: r.meta, groups, lefts, rights, stamps, skins, trays, html: h };
}
const patternedOwn = (bits) => { const s = bits.map((x) => (x ? 1 : 0)).join(''); return /^(1+|0+)$/.test(s) || /^(10)+1?$/.test(s) || /^(01)+0?$/.test(s) || /^1+0+$/.test(s) || /^0+1+$/.test(s); };
/** an order a child reads off (the gate's own): all alike, taking turns from 4, one block then the other from 6 */
const badOrderOwn = (bits) => { const s = bits.map((x) => (x ? 1 : 0)).join(''); return /^(1+|0+)$/.test(s) && s.length >= 3 || (s.length >= 4 && (/^(10)+1?$/.test(s) || /^(01)+0?$/.test(s))) || (s.length >= 6 && (/^1+0+$/.test(s) || /^0+1+$/.test(s))); };
function bandFaults(what, counts, total, expect, minTol) { const f = []; counts.forEach((c, i) => { const s = c / total, tol = Math.max(minTol, 3 * Math.sqrt(expect[i] * (1 - expect[i]) / total)); if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds it ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); }); return f; }
const MATCH = new Set(['G1-653', 'G1-655', 'G1-660', 'G1-667']);
const PRINT_ONLY_MONEY = 'G1-670';
/** the index of the right choice in a one-answer group */
const rightAt = (g) => g.choices.findIndex((c) => c[1] === 'right');
/** the positional tells, pooled over a level's copies */
function tellFaults(id, lv, pages) {
  const f = [], tag = `${id} L${lv}`;
  if (MATCH.has(id)) {
    const n = pages[0].rights.length; const cnt = Array.from({ length: n }, () => Array(n).fill(0)); let straight = 0;
    for (const p of pages) p.lefts.forEach((c, i) => { const j = p.rights.indexOf(c[1]); if (j === i) straight++; if (j >= 0) cnt[i][j]++; });
    if (n === 2) { const st = pages.filter((p) => p.rights.indexOf(p.lefts[0][1]) === 0).length; f.push(...bandFaults(tag + ' (two pairs straight across)', [st, pages.length - st], pages.length, [0.5, 0.5], 0.05)); }
    else if (straight) f.push(`${tag}: a partner straight across on ${straight} rows`);
    if (n >= 3) cnt.forEach((row2, i) => f.push(...bandFaults(`${tag} (row ${i + 1}'s partner)`, row2.filter((_, j) => j !== i), pages.length, Array(n - 1).fill(1 / (n - 1)), 0.06)));
  }
  // one-answer groups of two or three: the right choice's place, pooled per kind of group; rows of a page never a pattern
  const kinds = {};
  for (const p of pages) for (const g of p.groups) { const k = g.id.replace(/^[^:]*:/, '').replace(/^(paint|alone|fish|ball)$/, 'story').replace(/^(says):.*$/, 'says').replace(/^(who|when|where)$/, 'q').replace(/:about$/, 'about'); const n = g.choices.length; if (n < 2) continue; const kk = k + '/' + n; (kinds[kk] = kinds[kk] || { n, cnt: Array(n).fill(0), tot: 0 }); const i = rightAt(g); if (i >= 0) { kinds[kk].cnt[i]++; kinds[kk].tot++; } }
  for (const [k, v] of Object.entries(kinds)) if (!/time\/2|^[a-z-]+\/2$/.test(k) || /story|virtue|says|about|why|q/.test(k)) { if (/time/.test(k)) continue; f.push(...bandFaults(`${tag} (${k} right choice)`, v.cnt, v.tot, Array(v.n).fill(1 / v.n), 0.05)); }
  for (const p of pages) { const st = p.groups.filter((g) => /^(paint|alone|fish|ball)$/.test(g.id)).map((g) => rightAt(g) === 0); if (st.length >= 4 && patternedOwn(st)) { f.push(`${tag}: the good choices sit in a pattern`); break; } }
  // G1-670: the dearer thing on each side half the time; the coins that pay sit anywhere on the tray (their mean place
  // over the tray is the middle: never "the first coins" or "the last coins")
  if (id === 'G1-670') {
    const cnt = [0, 0]; for (const p of pages) for (const g of p.groups) if (/^more:/.test(g.id)) cnt[rightAt(g)]++;
    f.push(...bandFaults(`${tag} (the dearer thing's side)`, cnt, cnt[0] + cnt[1], [0.5, 0.5], 0.05));
    // each coin counts by the share of its kind that pays (two of three pennies: each penny 2/3), so alike coins never
    // make a place look favoured
    let sum = 0, n = 0, sum2 = 0;
    for (const p of pages) for (const t of p.trays) { const need = Object.fromEntries(t.way.split(',').map((x) => [x.split(':')[0], +x.split(':')[1]])); const k = t.coins.length; if (k < 2) continue; t.coins.forEach((c, i) => { const wgt = (need[c] || 0) / t.coins.filter((x) => x === c).length; if (!wgt) return; const v = i / (k - 1); sum += wgt * v; sum2 += wgt * v * v; n += wgt; }); }
    const mean = sum / n; if (Math.abs(mean - 0.5) > Math.max(0.03, 3 * Math.sqrt((sum2 / n - mean * mean) / n))) f.push(`${tag}: the coins that pay sit at ${mean.toFixed(3)} of the tray on average (the middle is 0.5)`);
  }
  // splits that vary: the kinds of a set (long ago / today, goods / services, real / not real, can buy / cannot) and their places
  const SPLITS = { 'G1-658': ['long ago', [1, 2, 3]], 'G1-666': ['good', lv === 1 ? [1, 2, 3] : [3, 4, 5]], 'G1-664': ['right', lv === 1 ? [1] : [1, 2, 3]], 'G1-667': ['right', lv === 1 ? [2, 3] : [2, 3, 4]] };
  if (SPLITS[id]) {
    const [kind, allowed] = SPLITS[id];
    const itemsOf = (p) => (id === 'G1-658' ? p.groups.filter((g) => /^(schoolhouse|school-today|pen-ink|laptop|walk-pail|school-bus|hoop|tablet-game)$/.test(g.id)).map((g) => TIME_OWN[g.id]) : id === 'G1-666' ? p.stamps.filter((s) => s[2] === 'item').map((s) => s[1]) : id === 'G1-664' ? p.stamps.filter((s) => s[2] === 'reason').map((s) => s[1]) : p.stamps.filter((s) => s[2] === 'spend').map((s) => s[1]));
    const sc = allowed.map(() => 0), n = itemsOf(pages[0]).length, pos = Array(n).fill(0);
    let pat = 0;
    for (const p of pages) { const it = itemsOf(p); const k = it.filter((x) => x === kind).length; const j = allowed.indexOf(k); if (j >= 0) sc[j]++; else f.push(`${tag}: a split of ${k} + ${it.length - k} (allowed: ${allowed.join(', ')})`); it.forEach((x, i) => { if (x === kind) pos[i]++; }); if (badOrderOwn(it.map((x) => x === kind))) pat++; }
    if (allowed.length > 1) f.push(...bandFaults(`${tag} (the split ${allowed.join('/')})`, sc, pages.length, allowed.map(() => 1 / allowed.length), 0.05));
    const share = allowed.reduce((a, k) => a + k, 0) / allowed.length / n;
    f.push(...bandFaults(`${tag} (${kind} at each place)`, pos, pages.length, Array(n).fill(share), 0.06));
    if (pat) f.push(`${tag}: ${pat} copies put the ${kind} items in a pattern`);
  }
  // the communities: each sentence's answer letter spread over A / B (/ C); the community at each letter spread
  if (id === 'G1-659') { const m = pages[0].meta.order.length, cnt = Array(m).fill(0), at = Array(m).fill(0); for (const p of pages) { p.stamps.filter((s) => s[2] === 'write').forEach((s) => { cnt['ABC'.indexOf(s[1])]++; }); at[p.meta.order.indexOf('city') >= 0 ? p.meta.order.indexOf('city') : 0]++; } const tot = cnt.reduce((a, x) => a + x, 0); f.push(...bandFaults(`${tag} (the answer letter)`, cnt, tot, Array(m).fill(1 / m), 0.05)); }
  // the park: which changes are asked, each about its share
  if (id === 'G1-661') { const cnt = Object.fromEntries(Object.keys(PARK_OWN).map((k) => [k, 0])); for (const p of pages) for (const c of p.meta.changes) cnt[c]++; const k = pages[0].meta.changes.length; f.push(...bandFaults(`${tag} (the changes asked)`, Object.values(cnt), pages.length, Object.values(cnt).map(() => k / 6), 0.06)); }
  // the word box never lists the words in the order the cards ask for them
  if (id === 'G1-662' || id === 'G1-663') for (const p of pages) { const box = [...p.html.matchAll(/data-s1-bank="([^"]+)"/g)].map((m) => m[1]), cards = [...p.html.matchAll(/data-s1-card="([^"]+)"/g)].map((m) => (id === 'G1-663' ? SOURCE_OWN[m[1]][0] : m[1])); if (box.length > 1 && box.join() === cards.join()) { f.push(`${tag}: the word box lists the words in the cards' order`); break; } }
  // saving: the goal and why, spread
  if (id === 'G1-668') { const cnt = [0, 0]; for (const p of pages) { const g = p.groups.find((x) => x.id === 'why'); if (g) cnt[rightAt(g)]++; } f.push(...bandFaults(`${tag} (the reason to circle)`, cnt, pages.length, [0.5, 0.5], 0.05)); }
  return f;
}
/** the stamps a page carries agree with the gate's own tables */
function answerFaults(id, lv, p) {
  const f = [], h = p.html;
  const recordIds = new Set(['G1-657', 'G1-665', 'G1-669']);
  if (recordIds.has(id) && /data-dk-answer=/.test(h)) f.push(`${id}: a record page carries an answer`);
  if (!recordIds.has(id) && !/data-dk-answer=/.test(h)) f.push(`${id}: a closed page carries no answer`);
  for (const g of p.groups) { const r = g.choices.filter((c) => c[1] === 'right'); if (r.length !== 1) f.push(`${id}: ${g.id} has ${r.length} right choices`); }
  if (MATCH.has(id)) {
    const own = id === 'G1-653' ? RULES_OWN : id === 'G1-655' ? LEAD_OWN : id === 'G1-660' ? LAND_OWN : Object.fromEntries(Object.keys(JOBS_OWN).map((k) => [k, k]));
    for (const [k, a] of p.lefts) if (own[k] !== a) f.push(`${id}: ${k} stamped with ${a} (the gate: ${own[k]})`);
    if (p.rights.slice().sort().join() !== p.lefts.map((c) => c[1]).sort().join()) f.push(`${id}: the right column is not the left column's partners, once each`);
    if (id === 'G1-653' && lv === 1) for (const [a, c] of RULE_CONFUSE_OWN) if (p.rights.includes(a) && p.rights.includes(c)) f.push(`${id}: level 1 puts the ${a} and the ${c} on one page (rules a child could swap)`);
  }
  if (id === 'G1-670') {
    const L = MARKET_OWN[lv];
    if (p.trays.length !== (lv === 1 ? 2 : 3)) f.push(`${id}: ${p.trays.length} things for sale (level ${lv}: ${lv === 1 ? 2 : 3})`);
    for (const t of p.trays) {
      const ways = waysOwn(t.coins, t.price), total = t.coins.reduce((a, c) => a + (COIN_OWN[c] ? COIN_OWN[c][1] : 0), 0);
      if (ways.length !== 1) f.push(`${id}: ${t.item} at ${t.price} cents can be paid ${ways.length} ways from ${t.coins.join(',')} (exactly one)`);
      else if (wayOwnKey(ways[0]) !== t.way) f.push(`${id}: ${t.item}: the way stamped ${t.way} (the gate: ${wayOwnKey(ways[0])})`);
      if (total <= t.price) f.push(`${id}: ${t.item}: the tray holds ${total} cents for a price of ${t.price} (nothing left to choose)`);
      if (t.coins.some((c) => !L.coins.includes(c))) f.push(`${id}: ${t.item}: a coin not of level ${lv} (${t.coins.join(',')})`);
      if (L.nickels && t.coins.filter((c) => c === 'nickel').length > L.nickels) f.push(`${id}: ${t.item}: more than one nickel on a level-1 tray`);
      if (!t.coins.includes(L.coins[L.coins.length - 1])) f.push(`${id}: ${t.item}: no ${L.coins[L.coins.length - 1]} on the tray (the level's coins)`);
      if (t.price < 1 || t.price > L.max) f.push(`${id}: ${t.item} costs ${t.price} cents (level ${lv}: to ${L.max})`);
      if (t.coins.length < 3 || t.coins.length > 6) f.push(`${id}: ${t.item}: ${t.coins.length} coins on a tray (3-6)`);
    }
    if (new Set(p.trays.map((t) => t.price)).size !== p.trays.length) f.push(`${id}: two things cost the same`);
    if (lv === 3 && !p.trays.some((t) => t.price > 25)) f.push(`${id}: no price above a quarter on level 3`);
    const priceOf = Object.fromEntries(p.trays.map((t) => [t.item, t.price]));
    for (const g of p.groups.filter((x) => /^more:/.test(x.id))) { const r = g.choices.find((c) => c[1] === 'right'), w = g.choices.find((c) => c[1] !== 'right'); if (!r || !w || !(priceOf[r[0]] > priceOf[w[0]])) f.push(`${id}: ${g.id}: the dearer thing is not the one stamped`); }
  }
  if (id === 'G1-654') for (const g of p.groups) {
    const story = g.id.split(':')[0], o = CITIZEN_OWN[story];
    if (g.id.endsWith(':virtue')) { const r = g.choices.find((c) => c[1] === 'right'), w = g.choices.filter((c) => c[1] !== 'right'); if (!r || r[0] !== o[0]) f.push(`${id}: ${story} stamps ${r && r[0]} as its virtue (the gate: ${o[0]})`); for (const x of w) if (o[1].includes(x[0])) f.push(`${id}: ${story} prints "${x[0]}" as the wrong virtue (a child could defend it)`); }
    else { const r = g.choices.find((c) => c[1] === 'right'); if (!r || r[0] !== 'good') f.push(`${id}: ${story}: the good-citizen choice is not the one stamped`); }
  }
  if (id === 'G1-655') for (const g of p.groups.filter((x) => x.id.startsWith('says:'))) { const who = g.id.slice(5), r = g.choices.find((c) => c[1] === 'right'); if (!r || r[0] !== who) f.push(`${id}: "${who}" says it, the stamp says ${r && r[0]}`); }
  if (id === 'G1-656') { const pc = B.POSTCARDS.find((x) => p.meta.card === x.town + '|' + x.year); for (const g of p.groups) { const r = g.choices.find((c) => c[1] === 'right'); const want = g.id === 'who' ? pc.studio : g.id === 'when' ? String(pc.year) : pc.town; if (!r || dec(r[0]) !== want) f.push(`${id}: ${g.id} stamped ${r && r[0]} (the card: ${want})`); if (g.choices.length !== 3) f.push(`${id}: ${g.id} has ${g.choices.length} choices (3)`); } if ((lv === 1) !== /data-s1-ring/.test(h)) f.push(`${id}: the clue rings ${lv === 1 ? 'are missing' : 'are printed above level 1'}`); }
  if (id === 'G1-658') f.push(...pairFaults(id, p.groups.map((g) => g.id)));
  if (id === 'G1-658') for (const g of p.groups) { const r = g.choices.find((c) => c[1] === 'right'); if (!r || r[0] !== TIME_OWN[g.id]) f.push(`${id}: ${g.id} stamped ${r && r[0]} (the gate: ${TIME_OWN[g.id]})`); }
  if (id === 'G1-659') { const order = p.meta.order; for (const [s, a] of p.stamps.filter((x) => x[2] === 'write')) if ('ABC'[order.indexOf(COMM_OWN[s][0])] !== a) f.push(`${id}: ${s} stamped ${a} (the gate: ${'ABC'[order.indexOf(COMM_OWN[s][0])]})`); }
  if (id === 'G1-661') { const ch = [...h.matchAll(/data-s1-change="([^"]+)"/g)].map((m) => m[1]), hp = [...h.matchAll(/data-s1-help="([^"]+)"/g)].map((m) => m[1]); if (ch.slice().sort().join() !== p.meta.changes.slice().sort().join()) f.push(`${id}: the evening picture draws ${ch.join(',')} (asked: ${p.meta.changes.join(',')})`); if (lv >= 2 && hp.slice().sort().join() !== p.meta.changes.map((c) => PARK_OWN[c]).sort().join()) f.push(`${id}: clean-up day does not fix each change once`); if (ch.length !== (lv === 1 ? 3 : 5)) f.push(`${id}: ${ch.length} changes (level ${lv}: ${lv === 1 ? 3 : 5})`); }
  if (id === 'G1-662') for (const [s, a] of [...h.matchAll(/data-s1-(?:write|trace)="([^"]+)" data-dk-answer="([^"]+)"/g)].map((m) => [m[1], dec(m[2])])) if (SYMBOL_OWN[s] !== a) f.push(`${id}: ${s} stamped "${a}" (the gate: ${SYMBOL_OWN[s]})`);
  if (id === 'G1-663') { for (const [s, a] of [...h.matchAll(/data-s1-write="([^"]+)" data-dk-answer="([^"]+)"/g)].map((m) => [m[1], m[2]])) if (SOURCE_OWN[s][0] !== a) f.push(`${id}: ${s} stamped ${a} (the gate: ${SOURCE_OWN[s][0]})`); for (const g of p.groups) { const s = g.id.split(':')[0], r = g.choices.find((c) => c[1] === 'right'); if (!r || r[0] !== SOURCE_OWN[s][1]) f.push(`${id}: ${s} is stamped about ${r && r[0]} (the gate: ${SOURCE_OWN[s][1]})`); } }
  if (id === 'G1-664') for (const [s, a] of p.stamps.filter((x) => x[2] === 'reason')) if ((a === 'right') !== JULY_OWN[s]) f.push(`${id}: "${s}" stamped ${a} (the gate: ${JULY_OWN[s] ? 'a real reason' : 'not a reason'})`);
  if (id === 'G1-666') { for (const [s, a] of p.stamps.filter((x) => x[2] === 'item')) if (GOODS_OWN[s] !== a) f.push(`${id}: ${s} stamped ${a} (the gate: ${GOODS_OWN[s]})`); for (const [s, a] of p.stamps.filter((x) => x[2] === 'town')) if ((a === 'right') !== TOWN_OWN[s]) f.push(`${id}: ${s} stamped ${a} (the gate: ${TOWN_OWN[s] ? 'from our town' : 'far away'})`); if ((lv === 3) !== /data-s1-townpart/.test(h)) f.push(`${id}: the town map ${lv === 3 ? 'is missing' : 'is printed below level 3'}`); }
  if (id === 'G1-667') for (const [s, a] of p.stamps.filter((x) => x[2] === 'spend')) if ((a === 'right') !== SPEND_OWN[s]) f.push(`${id}: ${s} stamped ${a} (the gate: pay ${SPEND_OWN[s] ? 'can' : 'cannot'} buy it)`);
  if (id === 'G1-668') { const af = /data-s1-after="(\d+)" data-dk-answer="(\d+)"/.exec(h); if (lv === 1 && af) f.push(`${id}: level 1 asks the after-some-weeks question`); if (lv > 1) { if (!af) f.push(`${id}: no after-some-weeks question at level ${lv}`); else if (+af[2] !== +af[1] || +af[1] < 2 || +af[1] >= SAVE_OWN[lv]) f.push(`${id}: after ${af[1]} weeks is stamped $${af[2]} (the gate: $${af[1]}, a week between 2 and ${SAVE_OWN[lv] - 1})`); if (af && !new RegExp(`After ${af[1]} weeks, [A-Z][a-z]+ has`).test(h)) f.push(`${id}: the after-some-weeks sentence does not name week ${af[1]}`); }
    const w = /data-s1-weeks="1" data-dk-answer="(\d+)"/.exec(h); if (!w || +w[1] !== SAVE_OWN[lv]) f.push(`${id}: the weeks are stamped ${w && w[1]} (the goal $${SAVE_OWN[lv]} at $1 a week)`); if (!new RegExp(`data-s1-parts="${SAVE_OWN[lv]}"`).test(h)) f.push(`${id}: the jar is not in ${SAVE_OWN[lv]} parts`); const g = p.groups.find((x) => x.id === 'why'); if (!g || dec(g.choices.find((c) => c[1] === 'right')[0]) !== B.SAVE_WHY.right) f.push(`${id}: the reason stamped is not "${B.SAVE_WHY.right}"`); }
  // skin tones vary on a page that shows people (from three generic people on, at least three tones)
  const people = p.skins.length, tones = new Set(p.skins).size;
  if (people >= 2 && tones < Math.min(3, people)) f.push(`${id} L${lv}: ${people} people in ${tones} skin tone(s)`);
  return f;
}
const textsOf = (html) => html.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').split(/<[^>]+>/).map((s) => dec(s).replace(/\s+/g, ' ').trim()).filter(Boolean);
/** the review classes of Batches K, 1, 2, 3 and SK, and the social studies rules of this brief */
function pageRuleFaults(id, lv, html, ins) {
  const f = [], T = textsOf(html).join(' ');
  // numbers on the child's part within 120 and never 0 (a year, a date, the 50 stars and the 13 colonies are facts, not counts)
  for (const t of textsOf(html)) for (const m of t.matchAll(/(?<!\d)\b\d+\b(?!,? ?\d)/g)) { const n = +m[0]; if (n === 0 || (n > 120 && !(m[0].length === 4 && n >= 1700 && n <= 2030))) f.push(`${id}: the number ${m[0]} on the page`); }
  // real people: their names only where the page is about them; never a portrait (checked in the render); kind words only
  const NAMES = /George Washington|Abraham Lincoln|Rosa Parks|Ruby Bridges|Helen Keller|Martin Luther King/;
  if (NAMES.test(T) && !['G1-663', 'G1-665'].includes(id)) f.push(`${id}: a real person's name on a page that is not about them`);
  if (NO_VIOLENCE.test(T) || NO_VIOLENCE.test(ins)) f.push(`${id}: violence or death on the page`);
  // the interview never asks the child to tell more about home than the child wants
  if (id === 'G1-657') { if (/\b(mom|dad|mother|father|parent|grandma|grandpa|home|house)\b/i.test(T + ' ' + ins)) f.push(`${id}: the interview asks about the child's home or family`); if (lv <= 2 && !/a family member, a neighbor, or someone at school/.test(ins)) f.push(`${id}: the instruction does not name who the child may ask`); }
  if (id === 'G1-664' && !/July 4, 1776/.test(ins) && lv <= 2) f.push(`${id}: the instruction does not give the date`);
  if (id === 'G1-664' && !/Declaration of Independence/.test(T)) f.push(`${id}: the picture's caption does not name the Declaration of Independence`);
  if (id === 'G1-662') { for (const s of B.SYMBOLS) if (new RegExp(`data-s1-clue="${s.id}"[^>]*>([^<]*)<`).test(html) && SYMBOL_NAMEWORDS.test(new RegExp(`data-s1-clue="${s.id}"[^>]*>([^<]*)<`).exec(html)[1])) f.push(`${id}: the ${s.id} clue says its name`); if (lv >= 2 && !/data-s1-wordbox/.test(html)) f.push(`${id}: no word box`); if (lv === 1 && !/data-s1-trace/.test(html)) f.push(`${id}: level 1 has no names to trace`); }
  if (id === 'G1-663' && /data-s1-art="source:quarter(?:-back)?"(?! data-s1-realsize=)/.test(html)) f.push(`${id}: the quarter is not drawn at its real size`);
  if (id === 'G1-656' && !/data-s1-art="postcard:back"/.test(html)) f.push(`${id}: the postcard has no back`);
  if (id === 'G1-661' && /data-s1-drawn="(rain|cloud|storm|wind)/.test(html)) f.push(`${id}: weather drawn as a change (the changes are people's doing)`);
  if (id === 'G1-661' && !/people/.test(ins)) f.push(`${id}: the instruction does not say the changes are what people did`);
  if (id === 'G1-669' && lv >= 2 && !/I heard/.test(T)) f.push(`${id}: no "I heard ___ say ___." frame`);
  if (id === 'G1-653' && lv === 3 && !/We/.test(T) | !/so that/.test(T)) f.push(`${id}: level 3 has no "We ___ so that ___." frame`);
  if (/\bfree\b/i.test(ins)) f.push(`${id}: the instruction says "free" (the sheet never claims free)`);
  // review round 1
  if (id === 'G1-656' && /data-s1-question="who"/.test(html) && !/Who took the photo\?/.test(T)) f.push(`${id}: the "who" question does not ask who took the photo (the shop on the sign can be argued)`);
  if (id === 'G1-657' && lv === 3 && !/When you were little,/.test(T.replace(/.*My own question:/, ''))) f.push(`${id}: the child's own question does not ask about the past`);
  if (id === 'G1-654' && lv === 3) { const seg = (html.split('data-s1-frame="more"')[1] || ''); if ((seg.match(/data-dk-writerow/g) || []).length < 2) f.push(`${id}: "I would ___." has fewer than two writing lines`); }
  // review round 2: "Place: ___" on a line of its own, then "People can ___ there because the land has ___." ("At the forest"
  // is English nobody says)
  if (id === 'G1-660' && lv === 3) { const seg = html.split('data-s1-frame="land"')[1] || '', fr = textsOf(seg.slice(seg.indexOf('>') + 1)); if (fr[0] !== 'Place:' || !/^People can$/.test(fr[1] || '') || fr[2] !== 'there' || !/^because the land has$/.test(fr[3] || '') || /\bAt the\b/.test(fr.join(' '))) f.push(`${id}: the frame is not "Place: ___" on its own line, then "People can ___ there because the land has ___." (${fr.join(' | ')})`); }
  // review round 2: the class meeting's level 3 tells the child to circle one of day, week, month (and its instruction says so)
  if (id === 'G1-669' && lv === 3) { const often = (html.split('data-s1-decide="often"')[1] || ''); if (!/Circle one:<\/span>(<span[^>]*data-s1-every="day")/.test(often)) f.push(`${id}: level 3 does not say "Circle one:" before day, week and month`); if (!/circle how often jobs change/.test(ins)) f.push(`${id}: the level-3 instruction does not say to circle how often jobs change`); }
  if (id === 'G1-661' && lv === 2 && /data-s1-note/.test(html)) f.push(`${id}: the "Find the changes" box repeats the instruction`);
  if (id === 'G1-666' && lv === 3) { if (!/Read the labels\./.test(T)) f.push(`${id}: the town part does not say to read the labels`); const towns = [...html.matchAll(/data-s1-town="([^"]+)"/g)].map((m) => m[1]); for (const g of B.TOWN_GOODS.filter((x) => x.local)) if (!towns.includes(g.id)) f.push(`${id}: the map's ${g.id} has no label on the page`); const far = towns.filter((t) => !TOWN_OWN[t]).length; if (far < 1 || far > 2) f.push(`${id}: ${far} labels of goods from far away (1-2)`); }
  if (id === 'G1-668') { if (/for each \$1/.test(T)) f.push(`${id}: "for each $1" (the child colors every dollar, not each week)`); if (!/Color one part for each week [A-Z][a-z]+ saves, until the jar is full\./.test(T)) f.push(`${id}: the jar sentence is not "one part for each week ... until the jar is full"`); if (lv === 3 && !/\$20 or less/.test(T + ' ' + ins)) f.push(`${id}: the child's own goal is not capped at $20`); }
  if (id === 'G1-669' && CLASS_JOB_REFUSE.test(T)) f.push(`${id}: the job chart lists a job not every class has`);
  if (id === 'G1-670') { const L = MARKET_OWN[lv]; for (const c of L.coins) if (!new RegExp(`data-s1-coinkey="${c}"`).test(html) || !new RegExp(`data-s1-coinvalue="${c}">${COIN_OWN[c][1]}¢<`).test(html)) f.push(`${id}: the coin key does not show the ${c} and its value`); if (new RegExp(`data-s1-coinkey="(?!(?:${L.coins.join('|')})")`).test(html)) f.push(`${id}: the key shows a coin of another level`); }
  return f;
}
/** what a level draws: the marked parts and how many of each, and what each drawing box asks for */
function levelSig(html) { const c = {}; for (const m of html.matchAll(/data-(?:dk|sk|s1|g1)-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; for (const m of html.matchAll(/data-dk-prompt="([^"]+)"/g)) c['prompt:' + m[1]] = 1; return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])); }
const insOf = (t, lv) => withLevelInstruction(resolveStrings(t.id, 'en', t), t.id, lv, 'en').instruction;
const SRC = () => ({ art: fs.readFileSync(path.join(WG, 'types', '_shared', 'dk-social-1-art.js'), 'utf8'), factory: fs.readFileSync(path.join(WG, 'types', '_shared', 'dk-social-1.js'), 'utf8') });

/* ================================================================ main */
async function main() {
  const src = SRC();
  const bf = bankFaults(B, src);
  ok(!bf.length, 'bank: ' + bf.slice(0, 10).join(' | '));
  const P = (name, mut, re, art) => { const b = clone(B); mut(b); judge(name, bankFaults(b, src, art), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 "Wait for the walk sign" sent to the pool', (b) => { find(b.RULES, 'wait').place = 'pool'; }, /wait: the bank puts/);
  P('PB2 the classroom / library confusion not kept apart', (b) => { b.RULE_CONFUSABLE = []; }, /classroom \/ library rules are not kept apart/);
  P('PB3 the paint story keyed kind', (b) => { find(b.CITIZEN, 'paint').virtue = 'kind'; }, /paint: the bank says kind/);
  P('PB4 "fair" dropped from what a child could defend for the child alone (it would print as the wrong word)', (b) => { find(b.CITIZEN, 'alone').defensible = ['kind']; }, /alone: the bank's defensible virtues .* leave out fair/);
  P('PB5 the governor sent to the town', (b) => { find(b.LEADERS, 'governor').leads = 'town'; }, /governor: the bank says town|two leaders lead one place/);
  P('PB6 the president says "I lead a school."', (b) => { find(b.LEADERS, 'president').says = 'I lead a school.'; }, /president: says/);
  P('PB7 a wrong town printed on the card (the studio in Lakeview)', (b) => { b.POSTCARDS[0].studio = 'Lakeview Studio'; }, /a wrong town \(Lakeview\) is printed|carries the town/);
  P('PB8 the shop named after the town (two answers to where)', (b) => { b.POSTCARDS[0].shop = 'Riverton Bakery'; }, /carries the town's name/);
  P('PB9 a wrong year on the card', (b) => { b.POSTCARDS[0].otherYears = [1955, 1985]; }, /a wrong year \(1955\)/);
  P('PB10 the school bus keyed long ago', (b) => { find(b.THEN_NOW_PICS, 'school-bus').time = 'long ago'; }, /school-bus: the bank says long ago|not one long ago and one today/);
  P('PB11 "I dip my pen in ink." keyed today', (b) => { find(b.THEN_NOW_SENTENCES, 'ink').time = 'today'; }, /ink: the bank says today/);
  P('PB12 the subway sentence keyed to the suburb', (b) => { find(b.COMMUNITY_SENTENCES, 'subway').place = 'suburb'; }, /subway: the bank says the suburb/);
  { const art = { ...ART, communityArt: (id, k) => ART.communityArt(id, k) + (id === 'suburb' ? '<g data-s1-drawn="subway"></g>' : '') }; P('PB13 a subway drawn in the suburb too (two places fit)', () => {}, /suburb picture draws a subway too/, art); }
  P('PB14 the ski teacher sent to the forest', (b) => { find(b.LAND_WORK, 'ski').land = 'forest'; }, /ski: the bank sends/);
  { const art = { ...ART, workerArt: (id, l) => ART.workerArt(id, l) + (id === 'fisher' ? '<g data-s1-drawn="fishing-boats"></g>' : '') }; P('PB15 the fisher drawn with the harbor\'s boats (a picture match)', () => {}, /fisher: the worker is drawn with the coast's fishing-boats/, art); }
  { const art = { ...ART, landArt: (id) => ART.landArt(id) + (id === 'mountains' ? '<g data-s1-drawn="tall-trees"></g>' : '') }; P('PB16 tall trees on the snowy mountains (two lands fit the lumber worker)', () => {}, /mountains picture draws the forest's tall-trees/, art); }
  P('PB17 a change with no person\'s doing (rain)', (b) => { b.PARK_CHANGES.push({ id: 'rain', help: 'umbrella', word: 'rain' }); }, /rain: the bank's help is umbrella|rain: the evening picture/);
  { const art = { ...ART, parkArt: (st, ch, k) => ART.parkArt(st, ch, k) + (st === 'clean' && ch.includes('bag') ? '<g data-s1-change="bag"></g>' : '') }; P('PB18 the plastic bag in the morning picture too', () => {}, /bag: the change is drawn in the morning/, art); }
  P('PB19 the eagle\'s clue says its name', (b) => { find(b.SYMBOLS, 'eagle').clue = 'The bald eagle is our national bird.'; }, /eagle: the clue .* says the name/);
  P('PB20 the letter keyed to Washington', (b) => { find(b.SOURCES, 'letter').about = 'Washington'; }, /letter: the bank says letter about Washington/);
  P('PB21 the quarter at 21.2 mm (a nickel? no: wrong size)', (b) => { b.QUARTER_MM = 21.2; }, /the quarter is 21.2 mm/);
  P('PB22 "They wanted a new king." keyed real', (b) => { find(b.JULY4, 'king').real = true; }, /king: the bank says .* a real reason/);
  P('PB23 a fact changed (Ruby Bridges in 1957)', (b) => { find(b.FAIRER, 'bridges').fact = 'Ruby Bridges was the first Black child at her New Orleans school in 1957.'; }, /bridges: the bank's sentence/);
  P('PB24 violence on the child\'s page', (b) => { find(b.FAIRER, 'king').fact = 'Martin Luther King Jr. was shot.'; }, /violence or death/);
  P('PB25 a haircut keyed a good', (b) => { find(b.GOODS_SERVICES, 'haircut').kind = 'good'; }, /haircut: the bank says good/);
  P('PB26 bananas keyed from our town', (b) => { find(b.TOWN_GOODS, 'bananas').local = true; }, /bananas: the bank says from our town|does not say where/);
  P('PB27 the dentist says "I am paid to drive people."', (b) => { find(b.JOBS, 'dentist').says = 'I am paid to drive people.'; }, /dentist: says/);
  P('PB28 a hug keyed as something pay buys', (b) => { find(b.SPEND, 'hug').buy = true; }, /hug: the bank says pay can buy it/);
  P('PB29 a goal of $4 on level 2', (b) => { b.SAVE_PRICE[2] = 4; }, /level 2: a goal of \$4/);
  P('PB30 a black-and-white picture', (b) => { find(b.GOODS_SERVICES, 'bread').pic = { theme: 'At the Supermarket bw', noun: 'bread' }; }, /black-and-white|not in the cache/);
  P('PB31 the light-skinned library farmer', (b) => { find(b.SYMBOLS, 'eagle').pic = { theme: 'occupations', noun: 'farmer' }; }, /occupations\/farmer is refused/);
  P('PB32 the heraldic 4th of July eagle', (b) => { find(b.SYMBOLS, 'eagle').pic = { theme: '4th of July', noun: 'eagle' }; }, /4th of July\/eagle is refused/);
  P('PB33 a picture missing from the library', (b) => { find(b.GOODS_SERVICES, 'milk').pic = { theme: 'At the Supermarket', noun: 'milk7' }; }, /not in the cache manifest/);
  { const s2 = { ...src, art: src.art + "\nconst X = '#123456';" }; judge('PB34 an off-palette colour in the drawings', bankFaults(B, s2), /colours outside the S1 palette: #123456/); }
  { const art = { ...ART, postcardFront: (pc, k) => ART.postcardFront(pc, k).replace(/#737373/g, '#D9534F') }; P('PB35 the old photograph in colour', () => {}, /not black and white/, art); }
  P('PB36 the studio dropped from the back of the card', () => {}, /the back does not print who made it/, { ...ART, postcardBack: (pc) => ART.postcardBack(pc).split(pc.studio).join('A Studio') });
  // review round 1
  P('PB37 "Walk, do not run, by the pool." (the rule prints its place)', (b) => { find(b.RULES, 'walk').text = 'Walk, do not run, by the pool.'; }, /walk: the rule .* share "pool"/);
  P('PB38 the street card labelled "the crosswalk" (it holds "walk")', (b) => { b.PLACE_WORD.street = 'the crosswalk'; }, /share "walk"/);
  P('PB39 the lunch box story back ("fair" printed as the wrong word, which a child can defend)', (b) => { const st = find(b.CITIZEN, 'paint'); st.id = 'lunch'; st.defensible = ['honest', 'kind', 'responsible']; }, /lunch: a story the gate has no ruling for/);
  { const art = { ...ART, citizenArt: (id, w, k) => ART.citizenArt(id, w, k) + (id === 'alone' && w === 'setup' ? '<g data-sk-motion="1"></g>' : '') }; P('PB40 motion lines back in the recess setup', () => {}, /alone: the setup picture has motion lines/, art); }
  { const art = { ...ART, citizenArt: (id, w, k) => (id === 'ball' && w === 'setup' ? ART.citizenArt(id, w, k).replace(/(data-s1-drawn="ball"><circle cx="[0-9.]+" cy=")[0-9.]+/, '$196') : ART.citizenArt(id, w, k)) }; P('PB41 the ball held up in the setup picture', () => {}, /ball: the setup picture does not put the ball on the ground/, art); }
  { const art = { ...ART, citizenArt: (id, w, k) => (id === 'fish' && w === 'good' ? ART.citizenArt(id, w, k).replace('fish-food-in-hand', 'fish-food') : ART.citizenArt(id, w, k)) }; P('PB42 the fish food floating over the tank', () => {}, /fish: Lee does not hold the food/, art); }
  { const art = { ...ART, usMap: (w, h, m) => (m === 'state' ? ART.usMap(w, h, 'country').replace('data-s1-us="lower48"', 'data-s1-us="lower48" data-s1-state="colorado"') : ART.usMap(w, h, m)) }; P('PB43 the state card as the whole country again', () => {}, /the state card is not a close-up/, art); }
  P('PB44 "What did you eat for lunch?" (answered about today)', (b) => { find(b.INTERVIEW, 'lunch').q = 'What did you eat for lunch?'; }, /lunch: the question .* does not ask about the past/);
  P('PB45 "a school today" (the label prints the answer)', (b) => { find(b.THEN_NOW_PICS, 'school-today').word = 'a school today'; }, /school-today: the label .* says the time/);
  P('PB46 "a pen and ink" (children use ink pens today)', (b) => { find(b.THEN_NOW_PICS, 'pen-ink').word = 'a pen and ink'; }, /pen-ink: the label .* fits today too/);
  { const art = { ...ART, thenNowArt: (id, l) => ART.thenNowArt(id, l).replace(/data-s1-drawn="flat-cap"/g, 'data-s1-drawn="cap"') }; P('PB47 the long-ago boy without his flat cap', () => {}, /have no flat-cap/, art); }
  P('PB48 "We drive to the big store near our street." (a farm town too)', (b) => { find(b.COMMUNITY_SENTENCES, 'store').text = 'We drive to the big store near our street.'; }, /store: .* does not name the thing drawn|fits a farm town too/);
  P('PB49 "The houses on our street have yards." (a farm town too)', (b) => { find(b.COMMUNITY_SENTENCES, 'garage').text = 'Our house has a garage and yards.'; }, /garage: .* fits a farm town too/);
  { const art = { ...ART, communityArt: (id, k) => ART.communityArt(id, k).replace('data-s1-drawn="main-street"', 'data-s1-drawn="x"') }; P('PB50 the farm town without its main street', () => {}, /the farm town has no main-street/, art); }
  { const art = { ...ART, workerArt: (id, l) => ART.workerArt(id, l).replace(/data-s1-drawn="goggles"/g, 'data-s1-drawn="x"') }; P('PB51 the ski teacher without goggles', () => {}, /ski: the ski teacher has no goggles/, art); }
  { const art = { ...ART, parkArt: (st, ch, k) => { const s = ART.parkArt(st, ch, k); return st === 'after' && ch.includes('wrapper') ? s + '<g data-s1-change="wrapper"></g>' : s; } }; P('PB52 the wrapper drawn as two things', () => {}, /wrapper: drawn as more than one change/, art); }
  { const art = { ...ART, parkArt: (st, ch, k) => ART.parkArt(st, ch, k).replace(/data-s1-visitor="1"/g, 'data-s1-x="1"') }; P('PB53 clean-up day with no visitor (every person helps)', () => {}, /clean-up day has no visitor/, art); }
  { const art = { ...ART, quarterBackArt: (r, u) => ART.quarterBackArt(r, u).replace('QUARTER DOLLAR</textPath>', 'LIBERTY</textPath>') }; P('PB54 the quarter\'s back without QUARTER DOLLAR', () => {}, /no back saying QUARTER DOLLAR/, art); }
  { const art = { ...ART, july4Icon: (id) => (id === 'taxes' ? ART.july4Icon(id) + '<line x1="26" y1="80" x2="74" y2="32" stroke="#D9534F" stroke-width="6"/>' : ART.july4Icon(id)) }; P('PB55 a red "no" slash on a real reason', () => {}, /taxes: a real reason's icon carries a red "no" sign/, art); }
  { const art = { ...ART, readingArt: (r) => ART.readingArt(r).replace(/data-s1-drawn="tricorn"/g, 'data-s1-drawn="x"') }; P('PB56 the crowd\'s hats not tricorns', () => {}, /the crowd of 1776 has no tricorn/, art); }
  { const art = { ...ART, fairerArt: (id, r) => ART.fairerArt(id, r).replace('data-s1-drawn="pull-cord"', 'data-s1-drawn="x"') }; P('PB57 Rosa Parks\'s bus without its pull cord', () => {}, /bus has no pull-cord/, art); }
  { const art = { ...ART, jobArt: (id, l) => ART.jobArt(id, l).replace('data-s1-drawn="bus-side"', 'data-s1-drawn="x"') }; P('PB58 the bus driver in a frame, not a bus', () => {}, /the bus driver's card has no bus-side/, art); }
  { const art = { ...ART, haircutArt: (c) => ART.haircutArt(c).replace(/data-s1-clipping/g, 'data-sk-clipping') }; P('PB59 the haircut\'s small strands back', () => {}, /does not draw locks of cut hair/, art); }
  P('PB60 "fish feeder" on the job chart', (b) => { b.CLASS_JOBS = [...b.CLASS_JOBS, 'fish feeder']; }, /lists "fish feeder"/);
  P('PB61 a penny of 21 mm', (b) => { find(b.US_COINS, 'penny').mm = 21; }, /penny: the bank says 21 mm/);
  P('PB62 two nickels on a level-1 tray', (b) => { b.MARKET_LEVEL[1].maxOf.nickel = 2; }, /market level 1: 2 nickels/);
  P('PB63 level-2 prices to 30 cents', (b) => { b.MARKET_LEVEL[2].max = 30; }, /market level 2: prices/);
  // review round 2
  const scaleD = (frag, k) => frag.replace(/ d="([^"]+)"/g, (m, d) => { const pts = [...d.matchAll(/(-?[0-9.]+)[ ,](-?[0-9.]+)/g)].map((q) => [+q[1], +q[2]]); const cx = pts.reduce((a, q) => a + q[0], 0) / pts.length, cy = pts.reduce((a, q) => a + q[1], 0) / pts.length; return ' d="' + d.replace(/(-?[0-9.]+)([ ,])(-?[0-9.]+)/g, (mm, x, sep, y) => (cx + (+x - cx) * k).toFixed(2) + sep + (cy + (+y - cy) * k).toFixed(2)) + '"'; });
  { const art = { ...ART, haircutArt: (c) => ART.haircutArt(c).replace(/(<g data-s1-clipping="falling">[\s\S]*?<\/g>)/, '$1$1') }; P('PB64 the tufts back beside the chair (two falling locks)', () => {}, /draws 2 falling locks/, art); }
  { const art = { ...ART, haircutArt: (c) => ART.haircutArt(c).replace(/(<g data-s1-clipping="falling">)([\s\S]*?)(<\/g>)/, (m, a, body, z) => a + scaleD(body, 4) + z) }; P('PB65 the falling lock as big as the child\'s head', () => {}, /falling hair is [0-9.]+ units across, not smaller than the child's ear/, art); }
  { const art = { ...ART, haircutArt: (c) => ART.haircutArt(c).replace(/(<g data-s1-clipping="floor">)([\s\S]*?)(<\/g>)/, (m, a, body, z) => a + body.replace(/ d="([^"]+)"/g, (mm, d) => ' d="' + d.replace(/(-?[0-9.]+)([ ,])(-?[0-9.]+)/g, (q, x, sep, y) => x + sep + (+y - 24).toFixed(2)) + '"') + z) }; P('PB66 the pile of hair up beside the chair (not on the floor)', () => {}, /not on the floor/, art); }
  { const art = { ...ART, citizenArt: (id, w, k) => (id === 'paint' ? ART.citizenArt(id, w, k).replace(/(data-s1-teacher="1"><g transform="translate\([0-9.]+ [0-9.]+\) scale\()1 1\)/, '$10.84 0.84)') : ART.citizenArt(id, w, k)) }; P('PB67 the teacher at 0.84 (1.27 times Maya: a second child)', () => {}, /times Maya's height/, art); }
  { const art = { ...ART, citizenArt: (id, w, k) => ART.citizenArt(id, w, k).replace('data-s1-drawn="lanyard"', 'data-s1-drawn="x"') }; P('PB68 the teacher without a lanyard', () => {}, /the teacher has no lanyard/, art); }
  { const art = { ...ART, citizenArt: (id, w, k) => ART.citizenArt(id, w, k).replace(/<g fill="none" stroke="#3A3530" stroke-width="([0-9.]+)"><circle/g, '<g fill="none" data-x="1" stroke="#3A3530" stroke-width="$1"><circle') }; P('PB69 the teacher without glasses', () => {}, /the teacher has no glasses/, art); }
  { const art = { ...ART, citizenArt: (id, w, k) => ART.citizenArt(id, w, k).replace('data-s1-drawn="sorry-face"', 'data-s1-drawn="x"') }; P('PB70 "I did it." without the sorry face', () => {}, /"I did it." has no sorry face/, art); }
  { const art = { ...ART, citizenArt: (id, w, k) => (id === 'paint' && w === 'good' ? ART.citizenArt(id, w, k).replace('data-sk-age="child">', 'data-sk-age="child"><path d="M0,0" fill="#9B3B34"/>') : ART.citizenArt(id, w, k)) }; P('PB71 the proud grin back on "I did it."', () => {}, /Maya grins at "I did it."/, art); }
  { const art = { ...ART, parkArt: (st, ch, k) => ART.parkArt(st, ch, k).replace('data-s1-tool="can"', 'data-s1-x="can"') }; P('PB72 the trash-can helper holding no can', () => {}, /the stand-can helper holds no can/, art); }
  { const art = { ...ART, parkArt: (st, ch, k) => ART.parkArt(st, ch, k).replace('data-s1-drawn="trash-bag-mouth"', 'data-s1-drawn="x"') }; P('PB73 the cup helper with no trash bag held open', () => {}, /the cup helper has no trash-bag-mouth/, art); }
  { const art = { ...ART, parkArt: (st, ch, k) => ART.parkArt(st, ch, k).replace('data-s1-drawn="shoe-print"', 'data-s1-drawn="x"') }; P('PB74 the stepped-on flowers with no shoe print', () => {}, /no one big shoe print/, art); }
  { const art = { ...ART, parkArt: (st, ch, k) => ART.parkArt(st, ch, k).replace('data-s1-drawn="broken-flower"', 'data-s1-drawn="flower-upright"') }; P('PB75 one flower broken off, not two', () => {}, /no two flowers broken off/, art); }
  P('PB76 a sentence and its picture not paired in the bank', (b) => { delete find(b.THEN_NOW_SENTENCES, 'ink').pair; }, /ink: the bank pairs it with nothing/);
  { const art = { ...ART, communityArt: (id, k) => ART.communityArt(id, k) + (id === 'town' ? '<g data-s1-drawn="garage"></g>' : '') }; P('PB77 a garage drawn in the farm town', () => {}, /the town picture draws a garage too/, art); }
  P('PB78 "Our house is near a shopping center." back (two shopping-center clues)', (b) => { const x = find(b.COMMUNITY_SENTENCES, 'garage'); x.text = 'Our house is near a shopping center.'; }, /two sentences \(store, garage\) name the shopping-center/);
  { const art = { ...ART, usCoin: (k, r, u) => ART.usCoin(k, r, u).replace('data-s1-face="front"', 'data-s1-face="profile"') }; P('PB79 the old nickel (Jefferson in profile)', () => {}, /the nickel is drawn with a profile face/, art); }

  // ---- 2. build sweep
  const pagesOf = {};
  for (const id of IDS) {
    const t = loadType(id);
    ok(t.exerciseType && /^[a-z-]+$/.test(t.exerciseType) && t.gradeBand === 'G1', `${id}: no family key or not Grade 1`);
    ok(typeof t.levelSetWords === 'function', `${id}: no levelSetWords (the Level Set builder would drop a face)`);
    let refused = false; try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const pages = []; const ins = insOf(t, lv);
      // a match page's partner spread and a split's places are pooled over 2,000 copies: many bands at 3 standard errors, one
      // of them falls outside by chance at a few hundred copies (G1-664 at 120 copies: 34% for 50%; 49.9% at 4,000). Raise the
      // sample, never the band.
      const want = MATCH.has(id) || ['G1-658', 'G1-664', 'G1-666', 'G1-667', 'G1-670'].includes(id) ? Math.max(SEEDS, 2000) : SEEDS;
      for (let s = 1; s <= want; s++) {
        let r;
        try { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`dks1|${id}|${lv}|${s}`), variant: s }); } catch (e) { ok(false, `${id} L${lv} #${s}: build throws ${e.message}`); break; }
        const p = pageOf(r);
        // the pool keeps only what the tells read (2,000 whole pages a level ran the gate out of memory)
        const slim = { ...p, groups: p.groups.map((g) => ({ id: g.id, choices: g.choices })), html: ['G1-662', 'G1-663'].includes(id) ? p.html : '' };
        pages.push(slim);
        if (s > SEEDS) continue;
        const af = answerFaults(id, lv, p); ok(!af.length, af.join(' | '));
        ok(t.levelSetWords(r.meta).length > 0, `${id} L${lv}: levelSetWords is empty`);
        if (s <= 3 || s % 25 === 0) {
          const pg = pageRuleFaults(id, lv, r.bodyHtml, ins); ok(!pg.length, pg.join(' | '));
          for (const q of picsOf(r.bodyHtml)) { const pf = artFaults(q, `${id} L${lv}`); ok(!pf.length, pf.join(' | ')); }
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
  judge('PT1 every rule partner straight across', tellFaults('G1-653', 2, spoil('G1-653 2', (p) => ({ ...p, rights: p.lefts.map((c) => c[1]) }))), /straight across/);
  judge('PT2 two-pair partners never straight across', tellFaults('G1-655', 1, spoil('G1-655 1', (p) => ({ ...p, rights: p.rights.indexOf(p.lefts[0][1]) === 0 ? p.rights.slice().reverse() : p.rights }))), /two pairs straight across/);
  judge('PT3 the land always one row down', tellFaults('G1-660', 2, spoil('G1-660 2', (p) => ({ ...p, rights: p.lefts.map((_, i) => p.lefts[(i + p.lefts.length - 1) % p.lefts.length][1]) }))), /partner\): place/);
  judge('PT4 the good-citizen choice always first', tellFaults('G1-654', 2, spoil('G1-654 2', (p) => ({ ...p, groups: p.groups.map((g) => (g.id.includes(':') ? g : { ...g, choices: [g.choices.find((c) => c[1] === 'right'), ...g.choices.filter((c) => c[1] !== 'right')] })) }))), /story\/2 right choice|pattern/);
  judge('PT5 the postcard answer always in the middle', tellFaults('G1-656', 2, spoil('G1-656 2', (p) => ({ ...p, groups: p.groups.map((g) => { const r = g.choices.find((c) => c[1] === 'right'), w = g.choices.filter((c) => c[1] !== 'right'); return { ...g, choices: [w[0], r, w[1]] }; }) }))), /q\/3 right choice/);
  judge('PT6 long ago always 2 + 2', tellFaults('G1-658', 1, spoil('G1-658 1', (p) => ({ ...p, groups: p.groups.map((g, i) => (TIME_OWN[g.id] ? { ...g, id: ['schoolhouse', 'laptop', 'hoop', 'tablet-game'][i % 4] } : g)) }))), /split/);
  judge('PT7 the goods always first', tellFaults('G1-666', 2, spoil('G1-666 2', (p) => ({ ...p, stamps: [...p.stamps.filter((s) => s[1] === 'good'), ...p.stamps.filter((s) => s[1] === 'service'), ...p.stamps.filter((s) => s[2] !== 'item')] }))), /pattern|good at each place/);
  judge('PT8 the answer letter always A', tellFaults('G1-659', 2, spoil('G1-659 2', (p) => ({ ...p, stamps: p.stamps.map((s) => (s[2] === 'write' ? [s[0], 'A', 'write'] : s)) }))), /answer letter/);
  judge('PT9 the park always asks the same changes', tellFaults('G1-661', 2, spoil('G1-661 2', (p) => ({ ...p, meta: { ...p.meta, changes: ['wrapper', 'cup', 'bag', 'branch', 'flowers'] } }))), /changes asked/);
  judge('PT10 the word box in the cards\' order', tellFaults('G1-662', 2, spoil('G1-662 2', (p) => { const cards = [...p.html.matchAll(/data-s1-card="([^"]+)"/g)].map((m) => m[1]); let h = p.html; const box = [...h.matchAll(/data-s1-bank="([^"]+)"/g)].map((m) => m[1]); box.forEach((b2, i) => { h = h.replace(`data-s1-bank="${b2}"`, `data-s1-bank="TMP${i}"`); }); cards.forEach((c, i) => { h = h.replace(`data-s1-bank="TMP${i}"`, `data-s1-bank="${c}"`); }); return { ...p, html: h }; })), /word box lists the words in the cards' order/);
  judge('PT11 the real reasons always first', tellFaults('G1-664', 2, spoil('G1-664 2', (p) => ({ ...p, stamps: [...p.stamps.filter((s) => s[1] === 'right'), ...p.stamps.filter((s) => s[1] !== 'right')] }))), /pattern|right at each place/);
  judge('PT13 the dearer thing always first (G1-670)', tellFaults('G1-670', 2, spoil('G1-670 2', (p) => ({ ...p, groups: p.groups.map((g) => (/^more:/.test(g.id) ? { ...g, choices: [g.choices.find((c) => c[1] === 'right'), g.choices.find((c) => c[1] !== 'right')] } : g)) }))), /dearer thing's side/);
  judge('PT14 the coins that pay always first on the tray (G1-670)', tellFaults('G1-670', 2, spoil('G1-670 2', (p) => ({ ...p, trays: p.trays.map((t) => { const need = Object.fromEntries(t.way.split(',').map((x) => [x.split(':')[0], +x.split(':')[1]])); const pay = [], rest = []; const left = { ...need }; for (const c of t.coins) { if (left[c] > 0) { left[c]--; pay.push(c); } else rest.push(c); } return { ...t, coins: [...pay, ...rest] }; }) }))), /coins that pay sit at/);
  judge('PT12 "to buy it later" always on top', tellFaults('G1-668', 2, spoil('G1-668 2', (p) => ({ ...p, groups: p.groups.map((g) => (g.id === 'why' ? { ...g, choices: [g.choices.find((c) => c[1] === 'right'), g.choices.find((c) => c[1] !== 'right')] } : g)) }))), /reason to circle/);
  { let falseTells = 0, pools = 0; for (const [k, ps] of Object.entries(pagesOf)) { if (ps[0].meta.record) continue; for (let i = 0; i + 40 <= Math.min(ps.length, 200); i += 40) { pools++; if (tellFaults(k.split(' ')[0], +k.split(' ')[1], ps.slice(i, i + 40)).length) falseTells++; } }
    console.log(`40-copy pools of the real closed pages: ${falseTells} of ${pools} report a tell (the ${SEEDS}-copy pools report none)`); }
  { const t = loadType('G1-653'); const same = { ...t, difficulty: { 1: t.difficulty[2], 2: t.difficulty[2], 3: t.difficulty[2] } };
    const sg = [1, 2, 3].map((lv) => levelSig(same.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('lv') }).bodyHtml));
    judge('PL1 three levels with one config', sg[0] === sg[1] && sg[1] === sg[2] ? ['two levels draw the same parts'] : [], /same parts/); }
  // answer and page-rule poisons on real pages (each with its control)
  const pagePoison = (name, id, lv, fn, re, insFn, which = 'rule', mustShow = null) => {
    const t = loadType(id); let r; for (let k = 0; k < 200; k++) { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('pg|' + id + '|' + lv + (k ? '|' + k : '')) }); if (!mustShow || r.bodyHtml.includes(mustShow)) break; } const ins = insOf(t, lv);
    const run = (h, i) => (which === 'rule' ? pageRuleFaults(id, lv, h, i) : answerFaults(id, lv, pageOf({ ...r, bodyHtml: h })));
    ok(!run(r.bodyHtml, ins).length, `${name} control: ${run(r.bodyHtml, ins).join(' | ')}`);
    judge(name, run(fn(r.bodyHtml), insFn ? insFn(ins) : ins), re);
  };
  pagePoison('PA1 the pool rule stamped to the street', 'G1-653', 2, (h) => h.replace('data-s1-key="walk" data-dk-answer="pool"', 'data-s1-key="walk" data-dk-answer="street"'), /walk stamped with street|once each/, null, 'answer');
  pagePoison('PA2 the classroom and the library on level 1', 'G1-653', 1, (h) => h.replace(/data-s1-key="(pool|street)" data-s1-right="1"/, 'data-s1-key="library" data-s1-right="1"').replace(/data-s1-key="(pool|street|classroom)" data-s1-right="1"/, (m) => m) .replace(/data-s1-key="(street|pool)" data-s1-right="1"/, 'data-s1-key="classroom" data-s1-right="1"'), /classroom and the library on one page|once each|stamped/, null, 'answer');
  pagePoison('PA3 "responsible" printed as the wrong word for the paint story (a child can defend it)', 'G1-654', 2, (h) => h.replace(/(data-dk-item="paint:virtue"[\s\S]*?)data-s1-pick="(kind)" data-dk-answer="no" data-s1-virtue="kind"/, '$1data-s1-pick="responsible" data-dk-answer="no" data-s1-virtue="responsible"'), /prints "responsible" as the wrong virtue/, null, 'answer', 'data-dk-item="paint:virtue"');
  pagePoison('PA4 the postcard: a wrong year stamped right', 'G1-656', 2, (h) => h.replace(/(data-dk-item="when"[\s\S]*?)data-dk-answer="right"/, '$1data-dk-answer="no"').replace(/(data-dk-item="when"[\s\S]*?)data-dk-answer="no"/, '$1data-dk-answer="right"'), /when stamped|right choices/, null, 'answer');
  pagePoison('PA5 the clue rings printed on level 2', 'G1-656', 2, (h) => h.replace('data-s1-art="postcard:back"', 'data-s1-art="postcard:back" data-s1-ring="x"'), /rings are printed above level 1/, null, 'answer');
  pagePoison('PA6 the tablet game stamped long ago', 'G1-658', 2, (h) => h.replace(/(data-dk-item="tablet-game"[\s\S]*?)data-dk-answer="no"/, '$1data-dk-answer="QQ"').replace(/(data-dk-item="tablet-game"[\s\S]*?)data-dk-answer="right"/, '$1data-dk-answer="no"').replace('data-dk-answer="QQ"', 'data-dk-answer="right"'), /tablet-game stamped long ago/, null, 'answer', 'data-dk-item="tablet-game"');
  pagePoison('PA7 a sentence stamped with another letter', 'G1-659', 2, (h) => h.replace(/(data-s1-write="subway" data-dk-answer=")([ABC])"/, (m, a, l) => a + (l === 'A' ? 'B' : 'A') + '"'), /subway stamped/, null, 'answer');
  pagePoison('PA8 the evening picture missing a change', 'G1-661', 2, (h) => h.replace(/data-s1-change="([a-z]+)"/, 'data-s1-x="$1"'), /the evening picture draws|changes \(level/, null, 'answer');
  pagePoison('PA9 the eagle stamped "flag"', 'G1-662', 2, (h) => h.replace('data-s1-write="eagle" data-dk-answer="bald eagle"', 'data-s1-write="eagle" data-dk-answer="flag"'), /eagle stamped "flag"/, null, 'answer');
  pagePoison('PA10 the memorial stamped about Washington', 'G1-663', 2, (h) => h.replace(/(data-dk-item="memorial:about"[\s\S]*?)data-dk-answer="right"/, '$1data-dk-answer="QQ"').replace(/(data-dk-item="memorial:about"[\s\S]*?)data-dk-answer="no"/, '$1data-dk-answer="right"').replace('data-dk-answer="QQ"', 'data-dk-answer="no"'), /memorial is stamped about Washington/, null, 'answer');
  pagePoison('PA11 "a new king" stamped a real reason', 'G1-664', 2, (h) => h.replace(/data-s1-reason="(king|move|more-taxes)" data-dk-answer="no"/, 'data-s1-reason="$1" data-dk-answer="right"'), /stamped right \(the gate: not a reason\)/, null, 'answer');
  pagePoison('PA12 a haircut stamped a good', 'G1-666', 2, (h) => h.replace(/data-s1-item="([a-z-]+)" data-dk-answer="service"/, 'data-s1-item="$1" data-dk-answer="good"'), /stamped good \(the gate: service\)/, null, 'answer');
  pagePoison('PA13 the sun stamped as something pay buys', 'G1-667', 2, (h) => h.replace(/data-s1-spend="([a-z]+)" data-dk-answer="no"/, 'data-s1-spend="$1" data-dk-answer="right"'), /stamped right \(the gate: pay cannot/, null, 'answer');
  pagePoison('PA17 after 3 weeks stamped $4', 'G1-668', 2, (h) => h.replace(/data-s1-after="(\d+)" data-dk-answer="\d+"/, (m, a) => `data-s1-after="${a}" data-dk-answer="${+a + 1}"`), /after \d+ weeks is stamped/, null, 'answer');
  pagePoison('PA18 level 2 without the after question', 'G1-668', 2, (h) => h.replace(/data-s1-after="\d+" data-dk-answer="\d+"/, ''), /no after-some-weeks question/, null, 'answer');
  pagePoison('PA14 the jar of $5 stamped 4 weeks', 'G1-668', 2, (h) => h.replace('data-s1-weeks="1" data-dk-answer="5"', 'data-s1-weeks="1" data-dk-answer="4"'), /weeks are stamped 4/, null, 'answer');
  pagePoison('PA15 an answer on the interview (a record page)', 'G1-657', 2, (h) => h.replace('data-s1-qbox="', 'data-dk-answer="right" data-s1-qbox="'), /a record page carries an answer/, null, 'answer');
  pagePoison('PA16 every person one skin tone', 'G1-654', 2, (h) => h.replace(/data-sk-skin="s\d"/g, 'data-sk-skin="s2"'), /skin tone/, null, 'answer');
  pagePoison('PG1 the number 0 on the page', 'G1-668', 2, (h) => h.replace('$1 each week', '$0 each week'), /the number 0/);
  pagePoison('PG2 a real person\'s name on the goods page', 'G1-666', 2, (h) => h.replace('services: color green', 'services: color green for Abraham Lincoln'), /a real person's name/);
  pagePoison('PG3 the interview asks about the child\'s home', 'G1-657', 2, (h) => h, /asks about the child's home/, (i) => i.replace('a family member, a neighbor, or someone at school', 'your mom or dad at home'));
  pagePoison('PG4 the symbol clue says the name', 'G1-662', 2, (h) => h.replace(/(data-s1-clue="eagle"[^>]*>)[^<]*</, '$1The bald eagle is our national bird.<'), /eagle clue says its name/);
  pagePoison('PG5 the quarter not at its real size', 'G1-663', 2, (h) => h.replace(/ data-s1-realsize="[0-9.]+"/, ''), /not drawn at its real size/, null, 'rule', 'source:quarter');
  pagePoison('PG6 "free" in the instruction', 'G1-664', 2, (h) => h, /says "free"/, (i) => i.replace('declared independence from', 'said they were free from'));
  pagePoison('PG7 weather drawn as a change', 'G1-661', 2, (h) => h.replace('data-s1-art="park:after"', 'data-s1-art="park:after"><g data-s1-drawn="rain-cloud"></g'), /weather drawn as a change/);
  pagePoison('PG9 a year past 2030 on the postcard', 'G1-656', 2, (h) => h.replace(/data-s1-pick="(19|20)\d\d"([^>]*>)(19|20)\d\d</, 'data-s1-pick="2099"$2' + '2099<'), /the number 2099/);
  pagePoison('PG8 the interview without who to ask', 'G1-657', 1, (h) => h, /does not name who the child may ask/, (i) => i.replace('a family member, a neighbor, or someone at school', 'someone'));
  // review round 1
  pagePoison('PG10 "Who made it?" back on the postcard', 'G1-656', 3, (h) => h.replace('Who took the photo?', 'Who made it?'), /does not ask who took the photo/);
  pagePoison('PG11 the own question without "When you were little,"', 'G1-657', 3, (h) => h.replace(/(My own question:[\s\S]*?)When you were little,/, '$1Ask'), /own question does not ask about the past/);
  pagePoison('PG12 "I would ___." on one line', 'G1-654', 3, (h) => { const i = h.indexOf('data-s1-frame="more"'); const a = h.slice(0, i), b = h.slice(i); let n = 0; return a + b.replace(/data-dk-writerow="1"/g, (m) => (++n === 2 ? 'data-x="1"' : m)); }, /fewer than two writing lines/);
  pagePoison('PG13 "People can ___ here" (no place named)', 'G1-660', 3, (h) => h.replace('>there<', '>here<'), /is not "Place: ___" on its own line/);
  pagePoison('PG20 "At the ___," back on the land frame', 'G1-660', 3, (h) => h.replace('>Place:<', '>At the<'), /is not "Place: ___" on its own line/);
  pagePoison('PG21 no "Circle one:" before day, week, month (class meeting level 3)', 'G1-669', 3, (h) => h.replace('>Circle one:<', '><'), /does not say "Circle one:"/);
  pagePoison('PG22 the level-3 instruction without "circle how often"', 'G1-669', 3, (h) => h, /does not say to circle how often/, (i) => i.replace('circle how often jobs change', 'think about the jobs'));
  pagePoison('PA23 a picture and the sentence about it on one page', 'G1-658', 2, (h) => { const pics = [...h.matchAll(/data-s1-card="([^"]+)"/g)].map((m) => m[1]); const sid = Object.keys(PAIR_OWN).find((k) => pics.includes(PAIR_OWN[k])); const sent = [...h.matchAll(/data-s1-sentence="([^"]+)"/g)].map((m) => m[1])[0]; return h.replace(`data-dk-item="${sent}"`, `data-dk-item="${sid}"`); }, /on one page/, null, 'answer');
  { // PS1: the pairing taken out of the dealing: the seed sweep must find a page with a picture and its own sentence
    const t = loadType('G1-658'), saved = B.THEN_NOW_SENTENCES.map((x) => x.pair); B.THEN_NOW_SENTENCES.forEach((x) => { delete x.pair; }); const pf = [];
    try { for (let sd = 1; sd <= SEEDS; sd++) pf.push(...pairFaults('G1-658', pageOf(t.build({ difficulty: 2, locale: 'en' }, { rng: makeRng(`dks1|G1-658|2|${sd}`), variant: sd })).groups.map((g) => g.id))); } finally { B.THEN_NOW_SENTENCES.forEach((x, i) => { if (saved[i]) x.pair = saved[i]; }); }
    judge('PS1 the pairing dropped from the dealing (seed sweep of level 2)', pf, /on one page/); }
  pagePoison('PG14 the "Find the changes" box back on level 2', 'G1-661', 2, (h) => h.replace('data-s1-art="park:clean"', 'data-s1-note="1" data-s1-art="park:clean"'), /repeats the instruction/);
  pagePoison('PG15 the bread label dropped from the town part', 'G1-666', 3, (h) => h.replace(/<div class="s1-sent" data-dk-box data-s1-town="bread"[\s\S]*?<\/div>/, ''), /bread has no label on the page/);
  pagePoison('PG16 "for each $1" back by the jar', 'G1-668', 2, (h) => h.replace(/Color one part for each week ([A-Z][a-z]+) saves, until the jar is full\./, 'Color one part of the jar for each $1 $1 saves.'), /for each \$1|not "one part for each week/);
  pagePoison('PG17 the own goal not capped at $20', 'G1-668', 3, (h) => h.replace('my goal ($20 or less)', 'my goal'), /not capped at \$20/, (i) => i.replace(' that costs $20 or less,', ''));
  pagePoison('PG18 "fish feeder" on the job chart', 'G1-669', 2, (h) => h.replace('>messenger<', '>fish feeder<'), /a job not every class has/);
  pagePoison('PG19 the quarter missing from the level-3 coin key', 'G1-670', 3, (h) => h.replace('data-s1-coinkey="quarter"', 'data-s1-coinkey="x"'), /does not show the quarter/);
  pagePoison('PA19 a tray with two ways to pay', 'G1-670', 2, (h) => h.replace(/(data-s1-tray="[^"]+" data-s1-price=")(\d+)(" data-dk-answer="[^"]+" style="[^"]*">)/, (m, a, pr, b) => a + pr + b + '<span data-dk-box data-s1-coin="penny"></span>'.repeat(+pr)), /can be paid \d+ ways|holds|coins on a tray/, null, 'answer');
  pagePoison('PA20 a tray whose coins make one way but the stamp says another', 'G1-670', 2, (h) => h.replace(/(data-s1-tray="[^"]+" data-s1-price="\d+" data-dk-answer=")[^"]+"/, '$1penny:99"'), /the way stamped penny:99/, null, 'answer');
  pagePoison('PA21 two nickels on a level-1 tray', 'G1-670', 1, (h) => h.replace('<span data-dk-box data-s1-coin="penny"', '<span data-dk-box data-s1-coin="nickel"></span><span data-dk-box data-s1-coin="penny"'), /more than one nickel|ways|holds/, null, 'answer');
  pagePoison('PA22 the cheaper thing stamped as costing more', 'G1-670', 2, (h) => h.replace(/(data-dk-item="more:[^"]+"[\s\S]*?)data-dk-answer="right"/, '$1data-dk-answer="QQ"').replace(/(data-dk-item="more:[^"]+"[\s\S]*?)data-dk-answer="no"/, '$1data-dk-answer="right"').replace('data-dk-answer="QQ"', 'data-dk-answer="no"'), /the dearer thing is not the one stamped/, null, 'answer');

  // ---- 3. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  const OUTD = path.join(require('os').tmpdir(), 'verify-dk-social-1');
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
      if (t.id === 'G1-658') for (const x of pairFaults(t.id, [...b.bodyHtml.matchAll(/data-dk-item="([^"]+)"/g)].map((m) => m[1]))) faults.push(`copy ${v}: ${x}`);
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
    // each render poison's control is the real page of the same type and level, rendered above (ok() on its verify)
    await pr('PR1 the page shrunk to 60% (a blank band at the bottom)', 'G1-660', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is/);
    await pr('PR2 a box laid over another', 'G1-667', 2, (h) => h.replace('<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;', '<div data-dk-box style="position:absolute;left:40px;top:40px;width:220px;height:140px;background:#FFFFFF"></div><div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;'), /two boxes collide/);
    await pr('PR3 a flag with 12 stripes', 'G1-662', 2, (h) => h.replace(/<rect [^>]*data-sk-stripe="white"\/>/, ''), /stripes \(13\)/);
    await pr('PR4 a flag with 49 stars', 'G1-662', 2, (h) => h.replace(/<polygon [^>]*data-sk-star="1"\/>/, ''), /49 stars \(50\)/);
    await pr('PR5 a match partner straight across (four rows)', 'G1-660', 2, (h) => { const ks = [...h.matchAll(/data-s1-key="([^"]+)" data-dk-answer="([^"]+)"/g)]; const rs = [...h.matchAll(/data-s1-key="([^"]+)" data-s1-right="1"/g)].map((m) => m[1]); let out = h; rs.forEach((k, j) => { out = out.replace(`data-s1-key="${k}" data-s1-right="1"`, `data-s1-key="TMP${j}" data-s1-right="1"`); }); ks.forEach((m, i) => { out = out.replace(`data-s1-key="TMP${i}" data-s1-right="1"`, `data-s1-key="${m[2]}" data-s1-right="1"`); }); return out; }, /straight across/);
    await pr('PR6 a match partner missing from the page', 'G1-655', 2, (h) => h.replace(/data-s1-key="state" data-s1-right="1"/, 'data-s1-key="moon" data-s1-right="1"'), /its partner is not on the page/);
    await pr('PR7 a card without its dot', 'G1-653', 2, (h) => h.replace(/<span class="dk-dot" data-dk-box data-s1-dot="R1"><\/span>/, ''), /without its dot/);
    await pr('PR8 every person one skin tone', 'G1-654', 2, (h) => h.replace(/data-sk-skin="s\d"/g, 'data-sk-skin="s3"'), /same skin tone/);
    await pr('PR9 an off-palette colour in a drawing', 'G1-659', 2, (h) => h.replace('fill="#9CCB7C"', 'fill="#123456"'), /outside the SK palette/);
    await pr('PR10 a drawing box 1.2 inches tall', 'G1-657', 1, (h) => h.replace(/min-height:236px;/g, 'min-height:110px;max-height:115px;'), /a drawing box \d+ px tall/);
    await pr('PR11 a box to color 0.3 inch', 'G1-666', 2, (h) => h.replace(/width:48px;height:48px/g, 'width:30px;height:30px'), /a box to color 30 px/);
    await pr('PR12 the quarter not at its real size', 'G1-663', 2, (h) => h.replace(/(data-s1-art="source:quarter")/, '$1 style="width:120px;height:120px"').replace(/width="91.7" height="91.7"/, 'width="120" height="120"'), /the quarter is 120/);
    await pr('PR13 the postcard\'s answer not printed on the back', 'G1-656', 2, (h) => h.replace(/(data-s1-art="postcard:back"[\s\S]*?)Photo by/, '$1Photo').replace(/(<text x="14" y="82"[^>]*>)[^<]*</, '$1A Studio,<'), /is not printed on the back/);
    await pr('PR14 the old photograph in colour', 'G1-656', 2, (h) => h.replace(/(data-s1-art="postcard:front"[^>]*>)/, '$1<rect x="10" y="10" width="40" height="30" fill="#4A7BD0"/>'), /not black and white/);
    await pr('PR15 the evening park with four changes on level 2', 'G1-661', 2, (h) => h.replace(/data-s1-change="([a-z]+)"/, 'data-s1-x="$1"'), /picture 2 shows 4 changes/);
    await pr('PR16 a jar of 4 parts for $5', 'G1-668', 2, (h) => h.replace(/<line [^>]*data-s1-jarline="4"\/>/, ''), /the jar has 4 parts for a price of \$5/);
    await pr('PR17 an answer on a record page', 'G1-669', 2, (h) => h.replace('data-s1-rule="one-voice"', 'data-s1-rule="one-voice" data-dk-answer="right"'), /a record page carries an answer/);
    await pr('PR18 the speaker drawn large (a portrait)', 'G1-665', 2, (h) => h.replace(/(data-sk-drawn="speaker-at-lectern"><g transform="translate\([0-9.]+ [0-9.]+\) scale\()0\.17( )0\.17/, '$11.2$21.2'), /drawn large/);
    await pr('PR19 a frame without its writing line', 'G1-664', 3, (h) => h.replace(/(data-s1-frame="wanted"[\s\S]*?)data-dk-writerow="1"/, '$1data-x="1"').replace(/(data-s1-frame="wanted"[\s\S]*?)data-dk-writerow="1"/, '$1data-x="1"'), /sentence frame without its writing line/);
    await pr('PR20 two right answers in a group', 'G1-656', 2, (h) => h.replace(/(data-dk-item="who"[\s\S]*?)data-dk-answer="no"/, '$1data-dk-answer="right"'), /2 right answers/);
    await pr('PR21 a picture that does not load', 'G1-666', 2, (h) => h.replace(/src="file:[^"]+"/, 'src="file:///nope.webp"'), /did not load|broken image/);
    { // PR22: a draw box that no longer takes the slack: the sweep must find an empty band or a short stack
      const sp = spoilType('G1-669', (h) => h.replace(/flex:1 1 auto;min-height:240px;/, 'flex:0 0 auto;height:80px;'));
      await render(sp, 1, 1, 'poison'); const sw = await layoutSweep(sp, 1, 6); judge('PR22 the drawing frame not taking the slack (layout sweep)', sw.faults, /empty band of \d+ px|the stack is|a drawing box/);
      const t = loadType('G1-669'); await render(t, 1, 1, 'poison'); const ctl = await layoutSweep(t, 1, 6); ok(!ctl.faults.length, `PR22 control: ${ctl.faults.slice(0, 2).join(' | ')}`); }
    // review round 1 (each control: the real page of the same type and level, rendered above)
    await pr('PR23 a park change spread over the picture (three wrappers)', 'G1-661', 2, (h) => h.replace(/(<g data-s1-change="[a-z]+" data-dk-answer="change"[^>]*>)/, '$1<rect x="0" y="40" width="200" height="4" fill="#D9534F"/>'), /is spread over/);
    await pr('PR34 a change drawn as two pieces apart (like the three wrappers)', 'G1-661', 2, (h) => h.replace(/(<g data-s1-change="[a-z]+" data-dk-answer="change"[^>]*>)/, '$1<circle cx="5" cy="115" r="3" fill="#D9534F"/>'), /is drawn in \d+ places apart|is spread over/);
    await pr('PR24 two helpers on top of each other', 'G1-661', 2, (h) => h.replace(/(<g data-dk-answer="help" data-s1-help="[a-z-]+">)(<g transform="translate\()([0-9.]+)( )/, (m, a, b, x, sp) => a + b + '142' + sp), /people overlap/);
    await pr('PR25 no visitor on clean-up day', 'G1-661', 2, (h) => h.replace('data-s1-visitor="1"', 'data-s1-x="1"'), /visitors \(one person who is not cleaning\)|people drawn for/);
    await pr('PR26 the page shrunk to 90% (an inch and more left empty)', 'G1-656', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.86);transform-origin:top center"'), /of empty page under the last part/);
    await pr('PR27 the state card shrunk (Colorado small on its card)', 'G1-655', 2, (h) => h.replace('data-s1-state="colorado"', 'data-s1-state="colorado" transform="scale(0.4)"'), /the state is \d+% of its card/);
    await pr('PR28 the quarter\'s back not at real size', 'G1-663', 2, (h) => h.replace(/(<svg[^>]*?)width="91.7" height="91.7"([^>]*data-s1-art="source:quarter-back")/, '$1width="70" height="70"$2'), /the quarter's back is 70/);
    await pr('PR29 a symbol\'s name line of 3 inches', 'G1-662', 2, (h) => h.replace(/(data-s1-write="[a-z]+" data-dk-answer="[^"]+" style=")/, '$1width:290px;overflow:hidden;'), /a line for a symbol's name 290/);
    await pr('PR30 a worker an inch wide', 'G1-667', 2, (h) => h.replace(/(<svg[^>]*?)width="148" height="148"([^>]*data-s1-art="job:)/, '$1width="96" height="96"$2'), /a worker drawn 96 px wide/);
    await pr('PR31 a dime drawn larger than it is', 'G1-670', 2, (h) => h.replace(/width="67.7" height="67.7"/, 'width="80" height="80"'), /a dime drawn 80.0 px across/);
    await pr('PR32 a numbered coin', 'G1-670', 2, (h) => h.replace(/(data-s1-art="coin:penny"[^>]*>)/, '$1<text x="20" y="30" font-size="12">1</text>'), /with a numeral on it/);
    await pr('PR33 the quarter without its back', 'G1-663', 2, (h) => h.replace('data-s1-art="source:quarter-back"', 'data-s1-art="source:x"'), /the quarter has no back/);
    // review round 2 (each control: the real page of the same type and level, rendered above; prMust renders its own)
    const spoilMust = (id, must, fn) => { const t = loadType(id); return { ...t, build(a, c) { let r = t.build(a, c); for (let k = 0; k < 400 && !r.bodyHtml.includes(must); k++) r = t.build(a, { ...c, rng: makeRng('must|' + id + '|' + k) }); if (!r.bodyHtml.includes(must)) throw new Error(`no copy of ${id} shows ${must}`); return { ...r, bodyHtml: fn(r.bodyHtml) }; } }; };
    const prMust = async (name, id, lv, must, fn, re) => { const c = await render(spoilMust(id, must, (h) => h), lv, 1, 'control'); const cf = [].concat(c.qa.verify || [], c.qa.lints || []); ok(!cf.length, `${name} control: ${cf.slice(0, 3).join(' | ')}`); const r = await render(spoilMust(id, must, fn), lv, 1, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re); };
    await prMust('PR35 the cut lock as big as the child\'s head', 'G1-666', 2, 'service:haircut', (h) => h.replace('<g data-s1-clipping="falling">', '<g data-s1-clipping="falling" transform="translate(62.4 34.6) scale(4) translate(-62.4 -34.6)">'), /the cut hair \(falling\) is [0-9.]+ px, not smaller than the child's ear/);
    await prMust('PR36 a second pile of hair (the tufts beside the chair)', 'G1-666', 2, 'service:haircut', (h) => h.replace(/(<g data-s1-clipping="floor">[\s\S]*?<\/g>)/, '$1$1'), /draws 1 falling locks and 2 piles/);
    await prMust('PR37 the trash-can helper\'s hands off the can', 'G1-661', 2, 'data-s1-help="stand-can"', (h) => h.replace(/(data-s1-drawn="can-being-lifted" data-s1-tool="can" transform=")(rotate\(20 105.5 70\))/, '$1translate(-40 6) $2'), /does not lift the can with both hands/);
    await prMust('PR38 the cup held up at the face again', 'G1-661', 2, 'data-s1-help="pick-up-bench"', (h) => h.replace('<g data-s1-drawn="cup-into-bag" data-s1-tool="cup">', '<g data-s1-drawn="cup-into-bag" data-s1-tool="cup" transform="translate(0 -16)">'), /the cup is held up at the face|not over the trash bag/);
    await prMust('PR39 a helper with no hand on the work (the net let go)', 'G1-661', 3, 'data-s1-help="net"', (h) => h.replace('data-s1-tool="net"', 'data-s1-x="net"'), /the net helper has no hand on the work/);
    await prMust('PR40 the shoe print shrunk (it no longer reads at print size)', 'G1-661', 2, 'data-s1-change="flowers"', (h) => h.replace('<g data-s1-drawn="shoe-print">', '<g data-s1-drawn="shoe-print" transform="translate(35 64) scale(0.4) translate(-35 -64)">'), /the shoe print is \d+ px wide/);
    await prMust('PR41 the teacher drawn at a child\'s height', 'G1-654', 2, 'citizen:paint:setup', (h) => h.replace(/(data-s1-teacher="1"><g transform="translate\([0-9.]+ [0-9.]+\) scale\()1 1\)/, '$10.75 0.75)'), /the teacher is [0-9.]+ times Maya's height/);
    await prMust('PR42 "I did it." without the sorry face (level 1)', 'G1-654', 1, 'citizen:paint:good', (h) => h.replace('data-s1-drawn="sorry-face"', 'data-s1-drawn="x"'), /"I did it." is not said with a sorry face/);
    await pr('PR43 a person card with an inch of empty card (level 1)', 'G1-665', 1, (h) => h.replace('height:auto;padding:6px 0;flex:1 1 auto;justify-content:center', 'height:470px;padding:6px 0;flex:0 0 auto;justify-content:center'), /px of empty box (above|below) its content/);
    await pr('PR44 the spend pictures small again (level 2)', 'G1-667', 2, (h) => h.replace(/width="132" height="132"/g, 'width="80" height="80"'), /the spend box: \d+ px of empty box/);
    await pr('PR45 "Coins:" back at the card\'s border (level 3)', 'G1-670', 3, (h) => h.replace('align-self:flex-start;margin-left:26px', 'align-self:flex-start;margin-left:2px'), /"Coins:" sits \d+ px from the card's border/);
    await pr('PR46 the coin key run to the card\'s border (level 3)', 'G1-670', 3, (h) => h.replace('gap:10px;justify-content:center', 'gap:30px;justify-content:center'), /the coin key runs to -?\d+ px from the card's border/);
    await pr('PR47 "Coins:" in the row with the coins (level 3)', 'G1-670', 3, (h) => h.replace(/(<span class="s1-q" data-dk-box data-s1-coinlabel="1"[^>]*>Coins:<\/span>)(<div class="dk-row" style="gap:10px;justify-content:center">)/, '$2$1'), /"Coins:" is not on its own line/);
    // 2026-11-25 picture fix: every person at furniture stands behind it (drawn before it, feet hidden by it), measured
    const furnitureFirst = (h, art, furn) => { const i = h.indexOf('data-s1-art="' + art + '"'), e = h.indexOf('</svg>', i), seg = h.slice(i, e), fm = new RegExp('<g data-s1-drawn="' + furn + '">[\\s\\S]*?</g>').exec(seg)[0], noF = seg.replace(fm, ''), p0 = noF.indexOf('<g transform="translate('); return h.slice(0, i) + noF.slice(0, p0) + fm + noF.slice(p0) + h.slice(e); };
      const unmark = (h, art) => { const i = h.indexOf('data-s1-art="' + art + '"'), e = h.indexOf('</svg>', i); return h.slice(0, i) + h.slice(i, e).replace(/data-sk-skin="/g, 'data-x-skin="') + h.slice(e); };
    await pr('PR48 the leader below the lectern\'s foot again', 'G1-655', 2, (h) => h.split('<g transform="translate(50 94)').join('<g transform="translate(50 98)'), /at the lectern: the feet are [0-9.]+ px below its foot/);
    await pr('PR49 the lectern drawn before the leader', 'G1-655', 1, (h) => furnitureFirst(h, 'leader:mayor', 'lectern'), /at the lectern is drawn after it/);
    await pr('PR50 the leader unmarked (the check measures nothing)', 'G1-655', 3, (h) => unmark(h, 'leader:president'), /people at furniture judged in "leader:president"/);
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
