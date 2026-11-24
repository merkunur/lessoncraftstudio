#!/usr/bin/env node
/**
 * verify-dk-social-k.js — the gate of the Batch SK Kindergarten social studies pages (K-712 .. K-726; factory
 * types/_shared/dk-social-k.js + its drawings dk-social-k-art.js; bank data/social/dk-social-k.js; Daily Teaching System
 * Stage D-5, 2026-11-24).
 *
 *   node scripts/worksheet-gen/qa/verify-dk-social-k.js [--quick] [--seeds=400]
 *
 *   1. BANK: every closed item has ONE right answer by the gate's OWN tables (never the bank's word): the class rules and
 *      the fair moments (which picture of a pair), the kind acts, the traditions and their objects (and the two that a
 *      child could tie to the wrong scene), long ago and today (the same JOB), the workers and what they make or do, the
 *      school helpers and their problems, hot or cold place, the flag (13 stripes, 7 red, 50 stars in 9 rows of 6 and 5,
 *      10 : 19, the canton over 7 stripes; no count choice a child could defend by counting the red stripes, the white ones
 *      or the stars), the globe (more water than land, the ocean dots on water, recomputed from the land data), the six
 *      kinds of family the design asks for, one red door. Every library picture is in the manifest and on disk, colour, and
 *      not refused (the light-skinned library workers, the red-cross nurse, the old-style car, the flag photo ...). Every
 *      colour written in the drawings is in the SK palette.
 *   2. BUILD, `--seeds` (default 400) copies of every type at every level: the stamps agree with the gate's tables; NO
 *      POSITIONAL TELL (the right picture of a pair, the kind cards and their split, the match partners (from three pairs:
 *      never straight across, spread over the other rows, pooled over 2,000 copies; two pairs: straight across half the time),
 *      the cold things, the 13, the wave, the school on the map: each pooled within a band of chance; no strip in a
 *      pattern); skin tones vary on every page that shows people; only the labels the gate allows are printed on the
 *      child's part (Kindergarten does not read), numbers within 13 and never 0; the three levels differ; another locale
 *      refuses.
 *   3. RENDER (the print pipeline), every type x level, 2 copies (1 with --quick): verify() (the Batch K page checks plus
 *      the SK checks: the flag's geometry, the globe's water and dots, the map path on the streets, the speaker drawn small,
 *      each tradition's object in its own scene only, no worker showing what the job makes, the match dots and partners,
 *      the vote columns of ten, one child per pair, the palette) and qa/lints.js clean. Then the LAYOUT SWEEP: the
 *      generator's own seeds 1..SEEDS (instanceSeed, seedEpoch 1, variant v = a Level Set copy's seedVariant), every
 *      DISTINCT page swapped into the rendered page and judged by the type's own verify (the empty band, the stack,
 *      collisions).
 *   4. POISONS: each check FAILS on a bank, a page or a set of pages spoiled for it; each page poison has a control that
 *      passes on the real page.
 * Review round 1 (2026-11-24, one US Kindergarten teacher): the rules each changed page now keeps are checked here too
 * (marked "round 1" below) and each has its poison with a control.
 * Review round 2 (2026-11-24, the same teacher): the same for its rules (marked "round 2"): the level-3 drawing boxes of
 * K-712, K-713 and K-725 about 2.5 inches; K-713 level 3 two cards across; the tear happening; the book in the hand a
 * book; the haircut's straight cut hair and its part line; K-720's word pictures; K-722's green dots never a speck and
 * level 3's wave-or-tree question; K-726's two rows of ten square boxes a book.
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const WG = path.join(__dirname, '..');
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const B = require(path.join(WG, 'data', 'social', 'dk-social-k.js'));
const ART = require(path.join(WG, 'types', '_shared', 'dk-social-k-art.js'));
const MAN = require(path.join(WG, 'cache', 'manifest.json'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const SEEDS = Number(arg('seeds', '400'));
const IDS = Array.from({ length: 15 }, (_, k) => 'K-' + (712 + k));
const clone = (x) => JSON.parse(JSON.stringify(x));
const key = (p) => p.theme + '/' + p.noun;
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
/** each class-rule pair: [the picture that follows the rule, the one that does not] */
const RULES_OWN = { hall: ['walk', 'run'], hand: ['raise', 'shout'], blocks: ['clean', 'leave'], story: ['listen', 'play'] };
const FRIENDS_OWN = { slide: 'kind', crayons: 'kind', 'help-up': 'kind', snack: 'kind', grab: 'not', push: 'not', tower: 'not', tear: 'not' };
/** round 1: the kind / not-kind split each level may print (at least one of each, the split varies) */
const SPLITS_OWN = { 4: ['1+3', '2+2', '3+1'], 6: ['2+4', '3+3', '4+2'] };
/** round 2: a level-1 green dot is never smaller than this (r, globe units): a smaller one reads as a printing speck */
const LAND_MIN_R_OWN = 16;
/** round 1 ruling (K-726): the whole class votes together, 20 boxes a book, numbered 1 to 20; the tie rule's own words */
const VOTE_OWN = { boxes: 20, tie: 'If two books tie for the most votes, we vote again on just those two.' };
const FAIR_OWN = { swing: ['turns', 'keep'], crackers: ['shared', 'all'], game: ['everyone', 'left-out'] };
/** the six kinds of family the design names, by who is drawn (adult-f, adult-m, elder-f, elder-m, teen, child, baby) */
const FAMILY_OWN = { 'mom-child': ['adult-f', 'child'], 'two-dads': ['adult-m', 'adult-m', 'child', 'child'], grandma: ['elder-f', 'child', 'child'], foster: ['adult-f', 'adult-m', 'child', 'child', 'child'], big: ['elder-m', 'adult-f', 'adult-m', 'child', 'child', 'baby'], 'dad-teen': ['adult-m', 'teen'] };
const TRAD_OWN = { birthday: 'hat', thanksgiving: 'pie', diwali: 'diya', 'new-year': 'envelope' };
/** an object a child could tie to another scene: the diya's flame to the birthday candles, the pie to the birthday cake */
const CONFUSE_OWN = [['diya', 'birthday'], ['pie', 'birthday']];
/** long ago and today: the old thing, the new thing, and the JOB both do */
const THEN_OWN = { washboard: ['washer', 'washing clothes'], candle: ['lamp', 'light at night'], buggy: ['car', 'getting around'], 'wall-phone': ['cell-phone', 'talking to someone far away'] };
const WORK_OWN = { baker: 'bread', builder: 'house', barber: 'haircut', 'mail-carrier': 'letter' };
const HELP_OWN = { knee: 'nurse', book: 'librarian', spill: 'custodian', lunch: 'cafeteria', pickup: 'office' };
const PLACE_OWN = { coat: 'cold', mittens: 'cold', sled: 'cold', 'winter-hat': 'cold', 'snow-boots': 'cold', swimsuit: 'hot', sandals: 'hot', 'beach-ball': 'hot', 'flip-flops': 'hot' };
const FLAG_OWN = { stripes: 13, red: 7, white: 6, stars: 50, rows: [6, 5, 6, 5, 6, 5, 6, 5, 6], fly: 1.9, cantonStripes: 7, cantonW: 0.76 };
/** a count choice a child could defend: the red stripes (7), the white ones (6), the stars (50) */
const FLAG_DEFENSIBLE = [7, 6, 50];
const REFUSED_ART = {
  'occupations/baker': 'light-skinned, like every library worker: the workers are drawn in varied skin tones', 'occupations/barber': 'light-skinned (the workers are drawn)',
  'occupations/construction_worker': 'light-skinned (the workers are drawn)', 'occupations/mail_carrier': 'a red shirt and a box: reads as a delivery driver', 'occupations/mail_carrier_2': 'reads as a delivery driver',
  'post office/postman': 'light-skinned (the workers are drawn)', 'occupations/janitor': 'light-skinned (the helpers are drawn)', 'occupations/cook': 'light-skinned (the helpers are drawn)', 'occupations/office_worker': 'light-skinned (the helpers are drawn)',
  'classroom/librarian': 'light-skinned (the helpers are drawn)', 'occupations/librarian': 'reads as a teacher', 'occupations/nurse': 'a cap with a red cross (US school nurses wear scrubs; the emblem is protected)', 'hospital/nurse': 'a cap with a red cross',
  'vehicles/car': 'an old-style car (it reads as long ago)', 'toys/car': 'an old-style car', 'around the house/telephone': 'a desk dial phone: neither the wall phone nor a cell phone', 'christmas/candle': 'a Christmas candle with no holder',
  '4th of July/flag': 'a colour photo-style flag on a pole, not to the flag’s proportions', 'thanksgivinng/pie': 'a red lattice pie reads as cherry (round 1: the pie is a drawn pumpkin pie)', 'summer/sunglasses': 'used in the snow too (two places)', 'summer/sun_hat': 'used on a sunny ski slope too', 'beach/umbrella': 'an umbrella is used in the rain anywhere',
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
  for (const [k, v] of Object.entries(b)) if (k !== 'REFUSED' && typeof v !== 'function') walk(v, k);
  return out;
}
/** the polygon area (shoelace) and point-in-polygon (ray casting) for the globe's land rings */
const area = (r) => { let s = 0; for (let i = 0; i < r.length; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length]; s += x1 * y2 - x2 * y1; } return Math.abs(s) / 2; };
const inPoly = (x, y, r) => { let c = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const HEX = /#[0-9A-Fa-f]{6}\b/g;

/* ================================================================ 1. the bank */
function bankFaults(b, src) {
  const f = [];
  for (const r of b.RULES) { const o = RULES_OWN[r.id]; if (!o) f.push(`${r.id}: a rule pair the gate has no ruling for`); else if (o[0] !== r.follow || o[1] !== r.not) f.push(`${r.id}: the bank says ${r.follow} follows the rule (the gate: ${o[0]})`); }
  for (const x of b.FRIENDS) if (FRIENDS_OWN[x.id] !== (x.kind ? 'kind' : 'not')) f.push(`${x.id}: the bank says ${x.kind ? 'kind' : 'not kind'} (the gate: ${FRIENDS_OWN[x.id] || 'no ruling'})`);
  if (b.FRIENDS.filter((x) => x.kind).length < 4 || b.FRIENDS.filter((x) => !x.kind).length < 4) f.push('the friends bank has fewer than four of a kind (a page of six prints 2 + 4, 3 + 3 or 4 + 2)');
  for (const x of b.FAIR) { const o = FAIR_OWN[x.id]; if (!o) f.push(`${x.id}: a fair pair the gate has no ruling for`); else if (o[0] !== x.fair || o[1] !== x.unfair) f.push(`${x.id}: the bank says ${x.fair} is fair (the gate: ${o[0]})`); }
  // the families: the six kinds the design names, each with a grown-up who cares and someone cared for
  const famIds = b.FAMILIES.map((x) => x.id);
  for (const id of Object.keys(FAMILY_OWN)) if (!famIds.includes(id)) f.push(`the families lose "${id}" (the design names six kinds)`);
  for (const x of b.FAMILIES) {
    const own = FAMILY_OWN[x.id];
    if (!own) { f.push(`${x.id}: a family the gate has no ruling for`); continue; }
    if (own.slice().sort().join() !== x.members.slice().sort().join()) f.push(`${x.id}: the bank draws ${x.members.join(', ')} (the gate: ${own.join(', ')})`);
    if (!x.members.some((m) => /^(adult|elder)/.test(m))) f.push(`${x.id}: a family with no grown-up`);
    if (!x.members.some((m) => /^(child|teen|baby)/.test(m))) f.push(`${x.id}: a family with no one cared for`);
  }
  // the traditions: one object each, each object in one scene
  for (const t of b.TRADITIONS) if (TRAD_OWN[t.id] !== t.object) f.push(`${t.id}: the bank's object is ${t.object} (the gate: ${TRAD_OWN[t.id] || 'no ruling'})`);
  if (new Set(b.TRADITIONS.map((t) => t.object)).size !== b.TRADITIONS.length) f.push('two traditions share one object');
  for (const [o, sc] of CONFUSE_OWN) if (!b.TRADITION_CONFUSABLE.some(([a, c]) => a === o && c === sc)) f.push(`the ${o} / ${sc} confusion is not kept apart on level 1`);
  // long ago and today: the same job, one partner each
  for (const t of b.THEN_NOW) { const o = THEN_OWN[t.old]; if (!o) f.push(`${t.old}: an old thing the gate has no ruling for`); else { if (o[0] !== t.now) f.push(`${t.old}: the bank pairs it with ${t.now} (the gate: ${o[0]})`); if (o[1] !== t.job) f.push(`${t.old} / ${t.now}: not the same job (${t.job}; the gate: ${o[1]})`); } }
  if (new Set(b.THEN_NOW.map((t) => t.now)).size !== b.THEN_NOW.length) f.push('two old things share one new thing');
  // the choices: two different things a child cannot both have; nothing is right or wrong
  for (const c of b.CHOICES) { if (!['coin', 'recess', 'book'].includes(c.lead)) f.push(`${c.id}: no limit drawn (one coin, recess time, one book)`); if (JSON.stringify(c.a) === JSON.stringify(c.b)) f.push(`${c.id}: one thing twice`); if ('right' in c || 'answer' in c) f.push(`${c.id}: a choice with a right answer`); }
  for (const w of b.WORKERS) if (WORK_OWN[w.id] !== w.result) f.push(`${w.id}: the bank says ${w.result} (the gate: ${WORK_OWN[w.id] || 'no ruling'})`);
  for (const w of b.WORKERS) { const sv = ART.worker(w.id, { skin: 's3' }); if (new RegExp(`data-sk-drawn="[^"]*${w.result === 'letter' ? 'letter|mailbox' : w.result}`).test(sv) || (w.result === 'haircut' && /barber-cape|barber-chair/.test(sv))) f.push(`${w.id}: the worker's drawing shows what the job makes`); }
  for (const h of b.HELPERS) if (HELP_OWN[h.problem] !== h.id) f.push(`${h.problem}: the bank sends it to ${h.id} (the gate: ${HELP_OWN[h.problem] || 'no ruling: a problem two helpers could take'})`);
  if (new Set(b.HELPERS.map((h) => h.problem)).size !== b.HELPERS.length) f.push('two helpers share one problem');
  if (!b.HELPER_L1.every((id) => b.HELPERS.find((h) => h.id === id))) f.push('a level 1 helper is not in the bank');
  for (const x of b.PLACE_ITEMS) if (PLACE_OWN[x.id] !== x.place) f.push(`${x.id}: the bank says ${x.place} (the gate: ${PLACE_OWN[x.id] || 'no ruling: a thing used in both places'})`);
  if (b.PLACE_ITEMS.filter((x) => x.place === 'cold').length < 3 || b.PLACE_ITEMS.filter((x) => x.place === 'hot').length < 3) f.push('fewer than three things for a place');
  // the flag
  const F = b.FLAG;
  for (const k of ['stripes', 'red', 'white', 'stars', 'fly', 'cantonStripes', 'cantonW']) if (F[k] !== FLAG_OWN[k]) f.push(`the flag: ${k} is ${F[k]} (the gate: ${FLAG_OWN[k]})`);
  if (F.rows.join() !== FLAG_OWN.rows.join() || F.rows.reduce((a, x) => a + x, 0) !== 50) f.push('the flag’s stars are not 9 rows of 6 and 5 (50)');
  if (F.countWrong.some((n) => n === 13 || FLAG_DEFENSIBLE.includes(n) || n < 1 || n > 20)) f.push('a stripe-count choice a child could defend (the red stripes, the white ones, the stars) or past 20');
  // the globe: more water than land; the ocean dots on water; the United States on the Americas
  const G = b.GLOBE_DATA(), R = G.header.R, C = G.header.frame / 2;
  const land = G.rings.reduce((a, r) => a + area(r.pts), 0) / (Math.PI * R * R);
  if (land >= 0.5) f.push(`the globe is ${(100 * land).toFixed(0)}% land: not more water than land`);
  for (const [k, d] of Object.entries(G.dots)) { if (Math.hypot(d.x - C, d.y - C) > R - 30) f.push(`the ${k} dot is off the globe`); if (G.rings.some((r) => inPoly(d.x, d.y, r.pts))) f.push(`the ${k} dot is on land`); }
  if (!G.rings.some((r) => r.name === 'americas' && inPoly(G.us.x, G.us.y, r.pts))) f.push('the United States is not on the Americas');
  if (G.rings.filter((r) => r.area >= 1500).length >= G.rings.length) f.push('level 1 has no fewer land shapes than level 2');
  // round 1: level 1's green dots, each on its own land shape with room round it (never on water), every big land shape one
  const dseg = (x, y, a, c) => { const dx = c[0] - a[0], dy = c[1] - a[1]; const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy); };
  for (const d of b.LAND_DOTS || []) { const own = G.rings.filter((r) => r.name === d.ring && inPoly(d.x, d.y, r.pts)); if (!own.length) { f.push(`a green dot (${d.ring} ${d.x},${d.y}) is not on its land: on water`); continue; } const room = Math.min(...own[0].pts.map((p, i) => dseg(d.x, d.y, p, own[0].pts[(i + 1) % own[0].pts.length]))); if (room < d.r) f.push(`the ${d.ring} green dot runs over the coast`); }
  // round 2: every green dot at least LAND_MIN_R_OWN (a smaller one reads as a speck); a big land shape may go without a
  // dot only if the bank says why AND the gate measures that it cannot hold one (its widest inner circle under the minimum)
  for (const d of b.LAND_DOTS || []) if (d.r < LAND_MIN_R_OWN) f.push(`a green dot of r ${d.r} on the ${d.ring} land (a speck: at least ${LAND_MIN_R_OWN})`);
  if (b.LAND_DOT_MIN_R !== LAND_MIN_R_OWN) f.push(`the bank's smallest green dot is ${b.LAND_DOT_MIN_R} (the gate: ${LAND_MIN_R_OWN})`);
  const roomOf = (pts) => { const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]); let best = 0; for (let x = Math.min(...xs); x <= Math.max(...xs); x += 1.5) for (let y = Math.min(...ys); y <= Math.max(...ys); y += 1.5) { if (!inPoly(x, y, pts)) continue; const m = Math.min(...pts.map((q, i) => dseg(x, y, q, pts[(i + 1) % pts.length]))); if (m > best) best = m; } return best; };
  for (const r of G.rings.filter((q) => q.area >= 1500)) {
    if ((b.LAND_DOTS || []).some((d) => d.ring === r.name && inPoly(d.x, d.y, r.pts))) continue;
    if (!(b.LAND_NODOT || {})[r.name]) { f.push(`the ${r.name} land shape has no green dot on level 1`); continue; }
    const room = roomOf(r.pts); if (room >= LAND_MIN_R_OWN) f.push(`the ${r.name} land shape could hold a green dot (room ${room.toFixed(1)}) but goes without`);
  }
  // the map: one house with a red door; every other door, and the key's, plain (round 1)
  if (b.HOODS.doors.filter((d) => d === 'red').length !== 1 || b.HOODS.doors.some((d) => d !== 'red' && d !== 'plain')) f.push('the doors: not one red door and the others plain');
  if (b.HOODS.keyDoor !== 'plain' || !b.HOODS.doorColor.plain || b.HOODS.doorColor.plain === b.HOODS.doorColor.red) f.push("the key's house door is not plain");
  // the vote (round 1 ruling): 20 boxes a book, the tie rule for the MOST votes
  if (b.VOTE_BOXES !== VOTE_OWN.boxes) f.push(`the vote has ${b.VOTE_BOXES} boxes a book (the whole class votes: ${VOTE_OWN.boxes})`);
  if (b.VOTE_TIE_RULE !== VOTE_OWN.tie) f.push(`the tie rule is "${b.VOTE_TIE_RULE}" ("${VOTE_OWN.tie}")`);
  for (const p of ['school', 'park']) if (!b.HOODS.places.includes(p)) f.push(`the map has no ${p}`);
  // pictures
  for (const [p, where] of bankPictures(b)) f.push(...artFaults(p, where));
  // the palette: every colour the drawings write is in PAL
  if (src) for (const [name, text] of Object.entries(src)) { const bad = [...new Set((text.match(HEX) || []).map((c) => c.toUpperCase()))].filter((c) => !ART.PAL.has(c)); if (bad.length) f.push(`${name}: colours outside the SK palette: ${bad.join(' ')}`); }
  return f;
}

/* ================================================================ 2. build sweep */
const picsOf = (html) => [...html.matchAll(/data-dk-pic="([^"]+)"/g)].map((m) => { const s = dec(m[1]); const i = s.lastIndexOf('/'); return { theme: s.slice(0, i), noun: s.slice(i + 1) }; });
/** a page's stamps, read from the html */
function pageOf(r) {
  const h = r.bodyHtml;
  const items = h.split('data-dk-item="').slice(1).map((seg) => ({ id: seg.slice(0, seg.indexOf('"')), choices: [...seg.split('data-dk-item=')[0].matchAll(/data-sk-choice="([^"]+)"(?: data-dk-answer="([^"]+)")?/g)].map((m) => [m[1], m[2] || null]) }));
  const cards = [...h.matchAll(/data-sk-key="([^"]+)" data-dk-answer="([^"]+)"/g)].map((m) => [m[1], m[2]]);
  const rights = [...h.matchAll(/data-sk-key="([^"]+)" style=/g)].map((m) => m[1]);
  const skins = [...h.matchAll(/data-sk-skin="(s\d)"/g)].map((m) => m[1]);
  const places = [...h.matchAll(/data-sk-at="(\d)"[^>]*><g data-sk-place="([\w-]+)"(?: data-sk-door="(\w+)")?/g)].map((m) => ({ cell: +m[1], kind: m[2], door: m[3] || null }));
  return { meta: r.meta, items, cards, rights, skins, places, html: h };
}
const patternedOwn = (bits) => { const s = bits.map((x) => (x ? 1 : 0)).join(''); return /^(1+|0+)$/.test(s) || /^(10)+1?$/.test(s) || /^(01)+0?$/.test(s) || /^1+0+$/.test(s) || /^0+1+$/.test(s); };
function bandFaults(what, counts, total, expect, minTol) { const f = []; counts.forEach((c, i) => { const s = c / total, tol = Math.max(minTol, 3 * Math.sqrt(expect[i] * (1 - expect[i]) / total)); if (Math.abs(s - expect[i]) > tol) f.push(`${what}: place ${i + 1} holds the answer ${(100 * s).toFixed(1)}% of the time (chance ${(100 * expect[i]).toFixed(1)}%)`); }); return f; }
const MATCH = new Set(['K-715', 'K-716', 'K-718', 'K-725']);
/** the positional tells, pooled over a level's copies */
function tellFaults(id, lv, pages) {
  const f = [], tag = `${id} L${lv}`;
  // a pair: the right picture's side (left / right), pooled; the sides of a page never in a pattern (from 4 rows)
  if (id === 'K-712' || id === 'K-721') {
    const right = id === 'K-712' ? 'follow' : 'fair'; const cnt = [0, 0]; let tot = 0, pat = 0, n4 = 0;
    for (const p of pages) { const sides = p.items.map((it) => it.choices.findIndex((c) => c[1] === right)); sides.forEach((s) => { if (s >= 0) { cnt[s]++; tot++; } }); if (sides.length >= 4) { n4++; if (patternedOwn(sides.map(Boolean))) pat++; } if (sides.length === 3 && new Set(sides).size === 1) pat++; }
    f.push(...bandFaults(tag + ' (the right picture of a pair)', cnt, tot, [0.5, 0.5], 0.04));
    if (pat) f.push(`${tag}: ${pat} copies put the right pictures in a pattern`);
  }
  // the kind cards (round 1 ruling): the split varies (each allowed split about a third of the copies), the places are
  // random (each place's share of kind cards against chance)
  if (id === 'K-713') {
    const n = pages[0].cards.length, cnt = Array(n).fill(0), splits = SPLITS_OWN[n], sc = splits.map(() => 0);
    for (const p of pages) { p.cards.forEach((c, i) => { if (c[1] === 'kind') cnt[i]++; }); const k = p.cards.filter((c) => c[1] === 'kind').length; const j = splits.indexOf(k + '+' + (n - k)); if (j >= 0) sc[j]++; }
    f.push(...bandFaults(tag + ' (kind cards)', cnt, pages.length, Array(n).fill(0.5), 0.06));
    f.push(...bandFaults(tag + ' (the kind / not-kind split ' + splits.join(', ') + ')', sc, pages.length, splits.map(() => 1 / 3), 0.05));
  }
  // a match page: from three pairs on no partner straight across, each row's partner spread over the other rows; with
  // TWO pairs (round 1 ruling) the partners sit straight across half the time, at random (never: the lines always cross)
  if (MATCH.has(id)) {
    const n = pages[0].rights.length; const cnt = Array.from({ length: n }, () => Array(n).fill(0)); let straight = 0;
    for (const p of pages) p.cards.forEach((c, i) => { const j = p.rights.indexOf(c[1]); if (j === i) straight++; if (j >= 0) cnt[i][j]++; });
    if (n === 2) { const st = pages.filter((p) => p.rights.indexOf(p.cards[0][1]) === 0).length; f.push(...bandFaults(tag + ' (two pairs straight across)', [st, pages.length - st], pages.length, [0.5, 0.5], 0.05)); }
    else if (straight) f.push(`${tag}: a partner straight across on ${straight} rows`);
    if (n >= 3) cnt.forEach((row2, i) => f.push(...bandFaults(`${tag} (row ${i + 1}'s partner)`, row2.filter((_, j) => j !== i), pages.length, Array(n - 1).fill(1 / (n - 1)), 0.06)));
  }
  // hot or cold: the share of cold things at each place; never a pattern; the cold place on the left half the time
  if (id === 'K-724') {
    const n = pages[0].cards.filter((c) => /^(hot|cold)$/.test(c[1])).length, cnt = Array(n).fill(0); let pat = 0, left = 0;
    for (const p of pages) { const its = p.cards.filter((c) => /^(hot|cold)$/.test(c[1])); its.forEach((c, i) => { if (c[1] === 'cold') cnt[i]++; }); if (patternedOwn(its.map((c) => c[1] === 'cold'))) pat++; if (p.meta.left === 'cold') left++; }
    f.push(...bandFaults(tag + ' (cold things)', cnt, pages.length, Array(n).fill(0.5), 0.06));
    f.push(...bandFaults(tag + ' (the cold place on the left)', [left, pages.length - left], pages.length, [0.5, 0.5], 0.05));
    if (pat) f.push(`${tag}: ${pat} copies put the things in a pattern`);
  }
  // more water or more land (round 1): where the wave sits
  if (id === 'K-722' && lv >= 2) { const cnt = [0, 0]; for (const p of pages) { const i = p.cards.findIndex((c) => c[1] === 'right'); if (i >= 0) cnt[i]++; } f.push(...bandFaults(tag + ' (the wave)', cnt, pages.length, [0.5, 0.5], 0.05)); }
  // the stripe count: where the 13 sits
  if (id === 'K-719' && lv === 3) { const cnt = [0, 0, 0]; for (const p of pages) { const i = p.cards.findIndex((c) => c[1] === 'right'); if (i >= 0) cnt[i]++; } f.push(...bandFaults(tag + ' (the 13)', cnt, pages.length, [1 / 3, 1 / 3, 1 / 3], 0.05)); }
  // the map: the school and the park over the nine blocks
  if (id === 'K-723') for (const k of ['school', 'park']) { const cnt = Array(9).fill(0); for (const p of pages) { const q = p.places.find((x) => x.kind === k); if (q) cnt[q.cell]++; } f.push(...bandFaults(`${tag} (the ${k}'s block)`, cnt, pages.length, Array(9).fill(1 / 9), 0.05)); }
  return f;
}
/** the stamps a page carries agree with the gate's own tables */
function answerFaults(id, lv, p) {
  const f = [], h = p.html;
  if (id === 'K-712' || id === 'K-721') {
    const own = id === 'K-712' ? RULES_OWN : FAIR_OWN, right = id === 'K-712' ? 'follow' : 'fair';
    for (const it of p.items) { const o = own[it.id]; if (!o) { f.push(`${id}: ${it.id} has no ruling`); continue; } const r = it.choices.filter((c) => c[1] === right).map((c) => c[0]); if (it.choices.length !== 2 || r.length !== 1 || r[0] !== o[0]) f.push(`${id}: ${it.id} stamped ${r.join('+') || 'nothing'} (the gate: ${o[0]})`); }
  }
  if (id === 'K-713') { for (const [k, a] of p.cards) if (FRIENDS_OWN[k] !== a) f.push(`${id}: ${k} stamped ${a} (the gate: ${FRIENDS_OWN[k]})`); const k = p.cards.filter((c) => c[1] === 'kind').length; if (!SPLITS_OWN[p.cards.length].includes(k + '+' + (p.cards.length - k))) f.push(`${id}: the split ${k} + ${p.cards.length - k} (not one of ${SPLITS_OWN[p.cards.length].join(', ')})`); }
  if (id === 'K-722' && lv >= 2) { const w = p.cards.filter((c) => c[1] === 'right').map((c) => c[0]); if (w.length !== 1 || w[0] !== 'water' || p.cards.length !== 2) f.push(`${id}: the wave (more water) is not the one answer`); }
  if (MATCH.has(id)) {
    const own = id === 'K-715' ? Object.fromEntries(Object.entries(TRAD_OWN).map(([s, o]) => [o, s])) : id === 'K-716' ? Object.fromEntries(Object.entries(THEN_OWN).map(([o, v]) => [o, v[0]])) : id === 'K-718' ? WORK_OWN : HELP_OWN;
    for (const [k, a] of p.cards) if (own[k] !== a) f.push(`${id}: ${k} stamped with ${a} (the gate: ${own[k]})`);
    if (p.rights.slice().sort().join() !== p.cards.map((c) => c[1]).sort().join()) f.push(`${id}: the right column is not the left column's partners, once each`);
    if (id === 'K-715' && lv === 1) for (const [o, sc] of CONFUSE_OWN) if (p.cards.some((c) => c[0] === o) && p.rights.includes(sc)) f.push(`${id}: level 1 puts the ${o} beside the ${sc} scene (two lines a child could defend)`);
  }
  if (id === 'K-724') for (const [k, a] of p.cards) if (k !== 'cold' && k !== 'hot' && PLACE_OWN[k] !== a) f.push(`${id}: ${k} stamped ${a} (the gate: ${PLACE_OWN[k]})`);
  if (id === 'K-719' && lv === 3) { const nums = p.cards.map((c) => +c[0]), r = p.cards.filter((c) => c[1] === 'right').map((c) => +c[0]); if (r.length !== 1 || r[0] !== 13) f.push(`${id}: the stripe count is not 13`); if (nums.some((n) => n !== 13 && FLAG_DEFENSIBLE.includes(n))) f.push(`${id}: a count choice a child could defend`); }
  if (id === 'K-723') {
    const school = p.places.filter((x) => x.kind === 'school'), park = p.places.filter((x) => x.kind === 'park'), red = p.places.filter((x) => x.door === 'red');
    if (school.length !== 1 || park.length !== 1 || red.length !== 1) f.push(`${id}: not one school, one park and one red door`);
    else if (Math.floor(red[0].cell / 3) === Math.floor(school[0].cell / 3) || red[0].cell % 3 === school[0].cell % 3) f.push(`${id}: the red-door house and the school share a street (the path has no corner)`);
    if (!/data-sk-key="school" data-dk-answer="circle"/.test(h) || !/data-sk-key="park" data-dk-answer="x"/.test(h)) f.push(`${id}: the school or the park is not stamped`);
    if ((lv === 1) !== /data-sk-path="trace"/.test(h)) f.push(`${id}: the dotted path ${lv === 1 ? 'is missing' : 'is printed above level 1'}`);
    if (new Set(p.places.map((x) => x.cell)).size !== p.places.length) f.push(`${id}: two places on one block`);
  }
  if (id === 'K-717') { for (const it of p.items) { if (it.choices.length !== 2 || it.choices[0][0] === it.choices[1][0]) f.push(`${id}: ${it.id} is not two different things`); if (it.choices.some((c) => c[1])) f.push(`${id}: ${it.id} stamps a right answer`); } }
  if (id === 'K-714') { const fams = [...h.matchAll(/data-sk-art="family:([\w-]+)"/g)].map((m) => m[1]); if (new Set(fams).size !== fams.length || !fams.every((x) => FAMILY_OWN[x])) f.push(`${id}: a family twice, or one the gate does not know`); }
  // skin tones vary on a page that shows people (three tones from three people on)
  const people = (id === 'K-712' || id === 'K-721') ? Math.ceil(p.skins.length / 2) : p.skins.length, tones = new Set(p.skins).size;
  if (people >= 2 && tones < Math.min(3, people)) f.push(`${id} L${lv}: ${people} people in ${tones} skin tone(s)`);
  return f;
}
/** the labels the gate allows on the child's part of each page (Kindergarten does not read; the teacher reads these) */
const LABELS = {
  'K-712': ['or', 'one more class rule'], 'K-713': ['me helping a friend'], 'K-714': ['someone who cares for me', 'everyone at home', 'we do this together', 'names:'],
  'K-715': ['a tradition my family keeps'], 'K-716': ['long ago', 'today', 'a toy a grown-up at home played with long ago'], 'K-717': ['1', 'or', 'me with the thing I picked'],
  'K-718': ['a job I want to learn', 'what it makes or does'], 'K-719': ['color it like this', 'red', 'white', 'blue', 'How many stripes?', '#'],
  'K-720': ['me and my friend', 'a game where everyone gets a turn', 'my word:', 'fair', 'kind', 'share'], 'K-721': ['or', '→', 'make it fair'],
  'K-722': ['water: blue', 'land: green', 'the United States', 'or'], 'K-723': ['N', 'key', 'house', 'school', 'park', 'fire station', 'store'], 'K-724': ['what I wear outside today'],
  'K-725': ['a helper I met on our school walk'], 'K-726': ['My vote: circle one book.', 'Our votes: color one box for each vote.', '#', 'The book with the most votes wins. Color the star by the book that won.', VOTE_OWN.tie, 'Did my book win?', 'yes', 'no', 'We all read the book that won.', 'a new vote: choice 1', 'choice 2'],
};
const textsOf = (html) => html.replace(/<style[\s\S]*?<\/style>/g, '').split(/<[^>]+>/).map((s) => dec(s).replace(/\s+/g, ' ').trim()).filter(Boolean);
/** the review classes of Batches K, 1, 2 and 3, and the social studies rules of this brief */
function pageRuleFaults(id, lv, html, ins) {
  const f = [];
  for (const t of textsOf(html)) { const okNum = LABELS[id].includes('#') && /^\d+$/.test(t); if (!okNum && !LABELS[id].includes(t)) f.push(`${id}: "${t.slice(0, 40)}" is printed on the child's part (Kindergarten does not read)`); }
  for (const t of textsOf(html)) if (/^\d+$/.test(t) && (+t === 0 || +t > (id === 'K-719' || id === 'K-726' ? 20 : 10))) f.push(`${id}: the number ${t} on the page (counting never includes 0; within 10, 20 for the stripes and the class vote)`);
  if (/King/.test(textsOf(html).join(' '))) f.push(`${id}: a name on the child's part of the page`);
  if (id === 'K-720' && !/Martin Luther King Jr\./.test(ins)) f.push(`${id}: the teacher text does not name him`);
  if (id === 'K-715' && lv === 2 && !/Each family picture gets one line\./.test(ins)) f.push(`${id}: the four-line page does not say each picture gets one line`);
  if (id === 'K-717' && !(/Circle the one you choose/.test(ins) && /X on the one you do not pick/.test(ins))) f.push(`${id}: the instruction does not ask for one circle and one X in every row`);
  // round 1: "give up" reads as "quit" at five: never printed (the teacher says it out loud); every level says there is
  // no wrong answer and that a row allows only one thing
  if (id === 'K-717' && !/There is no wrong answer\./.test(ins)) f.push(`${id}: the instruction does not say there is no wrong answer`);
  if (id === 'K-717' && !/You can have only one thing in each row\./.test(ins)) f.push(`${id}: the instruction does not say only one thing in each row`);
  if (id === 'K-717' && (/give up/i.test(ins) || /give up/i.test(textsOf(html).join(' ')))) f.push(`${id}: "give up" is printed (a five-year-old hears "quit")`);
  // round 1: the flag's stars stay white: the box is colored blue AROUND them
  if (id === 'K-719' && !(/Color the box blue around the stars/.test(ins) && /eave the stars white/.test(ins))) f.push(`${id}: the instruction does not keep the stars white`);
  if (id === 'K-719' && /box of stars blue/.test(ins)) f.push(`${id}: "the box of stars blue" (a child colors the stars blue too)`);
  if (id === 'K-714' && !/Every one is a family\./.test(ins)) f.push(`${id}: the instruction drops "Every one is a family." (the point of the lesson)`);
  if (id === 'K-723' && lv >= 2 && !/along the streets/.test(ins)) f.push(`${id}: the path instruction drops "along the streets"`);
  if (id === 'K-720' && lv === 1 && ((html.match(/data-dk-draw/g) || []).length !== 1 || !/data-dk-prompt="me-and-friend"/.test(html))) f.push(`${id}: level 1 is not one box for me and my friend`);
  if (id === 'K-720' && lv >= 2 && !/a game where everyone gets a turn/.test(ins)) f.push(`${id}: the drawing is not a game where everyone gets a turn`);
  if (id === 'K-720' && lv === 3 && (!/circle the word/i.test(ins) || /class="sk-line"/.test(html))) f.push(`${id}: level 3 does not circle one word (or keeps the line too)`);
  if (id === 'K-726' && !textsOf(html).includes(VOTE_OWN.tie)) f.push(`${id}: the tie rule is not "${VOTE_OWN.tie}"`);
  if (id === 'K-726' && (!/Color the star by the book that won/.test(html) || /circle it under the graph/.test(html))) f.push(`${id}: the winner is not marked with a star (a second circle mixes with the vote)`);
  if (id === 'K-725') { const i = html.indexOf('data-sk-art="problem:book"'); if (i >= 0 && /bookshelf/.test(html.slice(i, html.indexOf('</svg>', i)))) f.push(`${id}: a bookshelf on the book problem (shelf matches shelf)`); }
  if (id === 'K-718' && /data-sk-drawn="hand-mirror"/.test(html)) f.push(`${id}: the hand mirror is back on the haircut`);
  // round 2: level 3 of K-722 asks the lesson's question too (more water or more land: the wave or the tree)
  if (id === 'K-722' && lv >= 2 && !/Is there more water or more land\?/.test(ins)) f.push(`${id}: level ${lv} does not ask "more water or more land?"`);
  if (id === 'K-722' && lv >= 2 && !(/data-sk-art="more:wave"/.test(html) && /data-sk-art="more:tree"/.test(html))) f.push(`${id}: level ${lv} has no wave and tree to circle`);
  if (id === 'K-723' && !/house with the red door/.test(ins)) f.push(`${id}: the path's start is not named`);
  if (id === 'K-723' && !/data-sk-north="1"/.test(html)) f.push(`${id}: the map has no north arrow`);
  if (id === 'K-722' && !(/blue/.test(ins) && /green/.test(ins))) f.push(`${id}: the colours are not named`);
  if (id === 'K-726' && !/one box for each vote/.test(ins)) f.push(`${id}: the count is not one box for each vote`);
  if (id === 'K-715' && /thanksgivinng\/pie/.test(html)) f.push(`${id}: the library lattice pie (the pie is a pumpkin pie)`);
  if (id === 'K-726' && lv >= 2 && !(/data-sk-mine="yes"/.test(html) && /data-sk-mine="no"/.test(html) && /We all read the book that won\./.test(html))) f.push(`${id}: the page does not work when the child's book did not win`);
  if (id === 'K-719' && !/data-sk-flag="model"/.test(html)) f.push(`${id}: no colored model of the flag`);
  if (id === 'K-719' && lv === 1 && !/data-sk-reddot/.test(html)) f.push(`${id}: level 1 does not dot the red stripes`);
  if (id === 'K-720' && !/data-sk-drawn="speaker-at-lectern"/.test(html)) f.push(`${id}: no speaker at the lectern`);
  if (id === 'K-716' && /data-dk-pic="(christmas\/candle|around the house\/telephone|vehicles\/car|toys\/car)"/.test(html)) f.push(`${id}: a library picture that does not read as long ago or today`);
  if (id === 'K-725' && /data-dk-pic="(occupations|hospital|classroom)\//.test(html)) f.push(`${id}: a library helper (light-skinned, or a red-cross cap)`);
  return f;
}
/** what a level draws: the marked parts and how many of each, and (round 1) what each drawing box asks for: K-720's level 1
 *  (one box, me and my friend) and level 2 (one box, a game where everyone gets a turn) differ in the drawing asked */
function levelSig(html) { const c = {}; for (const m of html.matchAll(/data-(?:dk|sk)-([a-z-]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; for (const m of html.matchAll(/data-dk-prompt="([^"]+)"/g)) c['prompt:' + m[1]] = 1; return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])); }
const insOf = (t, lv) => withLevelInstruction(resolveStrings(t.id, 'en', t), t.id, lv, 'en').instruction;
const SRC = () => ({ art: fs.readFileSync(path.join(WG, 'types', '_shared', 'dk-social-k-art.js'), 'utf8'), factory: fs.readFileSync(path.join(WG, 'types', '_shared', 'dk-social-k.js'), 'utf8') });

/* ================================================================ main */
async function main() {
  const src = SRC();
  const bf = bankFaults(B, src);
  ok(!bf.length, 'bank: ' + bf.slice(0, 10).join(' | '));
  const P = (name, mut, re) => { const b = clone(B); b.GLOBE_DATA = B.GLOBE_DATA; mut(b); judge(name, bankFaults(b, src), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 running in the hall keyed as following the rule', (b) => { const r = find(b.RULES, 'hall'); [r.follow, r.not] = [r.not, r.follow]; }, /hall: the bank says run follows/);
  P('PB2 grabbing a toy keyed kind', (b) => { find(b.FRIENDS, 'grab').kind = true; }, /grab: the bank says kind/);
  P('PB3 keeping the swing keyed fair', (b) => { const r = find(b.FAIR, 'swing'); [r.fair, r.unfair] = [r.unfair, r.fair]; }, /swing: the bank says keep is fair/);
  P('PB4 the two dads dropped (a design family lost)', (b) => { b.FAMILIES = b.FAMILIES.filter((x) => x.id !== 'two-dads'); }, /lose "two-dads"/);
  P('PB5 a family with no grown-up', (b) => { find(b.FAMILIES, 'grandma').members = ['child', 'child', 'child']; }, /no grown-up/);
  P('PB6 the pie keyed to the birthday', (b) => { find(b.TRADITIONS, 'birthday').object = 'pie'; }, /birthday: the bank's object is pie/);
  P('PB7 the diya / birthday confusion not kept apart', (b) => { b.TRADITION_CONFUSABLE = [['pie', 'birthday']]; }, /diya \/ birthday confusion/);
  P('PB8 the candle paired with the car (another job)', (b) => { const t = find(b.THEN_NOW, 'light'); t.now = 'car'; }, /candle: the bank pairs it with car|two old things share/);
  P('PB9 a pair that does not do the same job', (b) => { find(b.THEN_NOW, 'ride').job = 'light at night'; }, /not the same job/);
  P('PB10 the builder paired with bread', (b) => { find(b.WORKERS, 'builder').result = 'bread'; }, /builder: the bank says bread/);
  P('PB11 the spill sent to the cafeteria', (b) => { find(b.HELPERS, 'custodian').problem = 'lunch'; }, /lunch: the bank sends it to custodian|two helpers share/);
  P('PB12 a lost lunch (the office or the cafeteria)', (b) => { find(b.HELPERS, 'office').problem = 'lost-lunch'; }, /lost-lunch: .*no ruling/);
  P('PB13 the sled keyed to the beach', (b) => { find(b.PLACE_ITEMS, 'sled').place = 'hot'; }, /sled: the bank says hot/);
  P('PB14 sunglasses back (used in the snow too)', (b) => { b.PLACE_ITEMS.push({ id: 'sunglasses', pic: { theme: 'summer', noun: 'sunglasses' }, place: 'hot' }); }, /sunglasses: .*no ruling|used in the snow/);
  P('PB15 a flag with 12 stripes', (b) => { b.FLAG.stripes = 12; }, /stripes is 12/);
  P('PB16 a flag with 49 stars', (b) => { b.FLAG.rows = [6, 5, 6, 5, 6, 5, 6, 5, 5]; }, /9 rows of 6 and 5/);
  P('PB17 7 among the stripe-count choices (the red stripes)', (b) => { b.FLAG.countWrong = [7, 12]; }, /could defend/);
  P('PB18 the Atlantic dot on land (Brazil)', (b) => { const G = clone(B.GLOBE_DATA()); const am = G.rings.find((r) => r.name === 'americas'); const [x, y] = am.pts.reduce((a, q) => [a[0] + q[0] / am.pts.length, a[1] + q[1] / am.pts.length], [0, 0]); G.dots.atlantic = { x: 640, y: 640 }; void x; void y; b.GLOBE_DATA = () => G; }, /atlantic dot is on land/);
  P('PB19 a globe more land than water', (b) => { const G = clone(B.GLOBE_DATA()); G.rings.push({ name: 'x', area: 1, pts: [[0, 0], [1000, 0], [1000, 800], [0, 800]] }); b.GLOBE_DATA = () => G; }, /not more water than land/);
  P('PB20 a second red door', (b) => { b.HOODS.doors = ['red', 'red', 'yellow', 'green']; }, /not one red door/);
  P('PB21 the library baker back (light-skinned)', (b) => { find(b.WORKERS, 'baker').pic = { theme: 'occupations', noun: 'baker' }; }, /baker is refused/);
  P('PB22 the library flag photo', (b) => { b.FLAG_PIC = { theme: '4th of July', noun: 'flag' }; }, /flag is refused/);
  P('PB23 a black-and-white picture', (b) => { find(b.PLACE_ITEMS, 'coat').pic = { theme: 'winter bw', noun: 'coat' }; }, /black-and-white/);
  P('PB24 a picture missing from the library', (b) => { find(b.PLACE_ITEMS, 'mittens').pic = { theme: 'winter', noun: 'mittens9' }; }, /not in the cache manifest/);
  P('PB25 a choice with a right answer', (b) => { b.CHOICES[0].answer = 'a'; }, /a choice with a right answer/);
  { const s2 = { ...src, art: src.art + "\nconst X = '#123456';" }; judge('PB26 an off-palette colour in the drawings', bankFaults(B, s2), /colours outside the SK palette: #123456/); }
  { const save = ART.worker; ART.worker = (k, l) => save(k, l) + (k === 'baker' ? '<g data-sk-drawn="bread-loaf"></g>' : ''); judge('PB27 the baker drawn holding bread (a picture match)', bankFaults(B, src), /baker: the worker's drawing shows/); ART.worker = save; }
  // round 1
  P('PB28 a vote column of 10 boxes (the class voting in groups)', (b) => { b.VOTE_BOXES = 10; }, /10 boxes a book/);
  P('PB29 the tie rule without "for the most votes"', (b) => { b.VOTE_TIE_RULE = 'If two books have the same, we vote again.'; }, /the tie rule is/);
  P('PB30 a map house with a blue door again', (b) => { b.HOODS.doors = ['red', 'blue', 'plain', 'plain']; }, /others plain/);
  P("PB31 the key's house with a red door", (b) => { b.HOODS.keyDoor = 'red'; }, /key's house door/);
  P('PB32 a green dot moved onto water', (b) => { b.LAND_DOTS = b.LAND_DOTS.map((d, i) => (i === 1 ? { ...d, x: 810, y: 388 } : d)); }, /on water/);
  P('PB33 a big land shape without its green dot', (b) => { b.LAND_DOTS = b.LAND_DOTS.filter((d) => d.ring !== 'greenland'); }, /greenland land shape has no green dot/);
  P('PB34 a kind act dropped (a page of six cannot print 4 + 2)', (b) => { b.FRIENDS = b.FRIENDS.filter((x) => x.id !== 'snack'); }, /fewer than four of a kind/);
  P('PB35 the library lattice pie back', (b) => { b.PIE = { theme: 'thanksgivinng', noun: 'pie' }; }, /thanksgivinng\/pie is refused/);
  // round 2
  P('PB36 the speck back on Baffin Island (r 7)', (b) => { b.LAND_DOTS = [...b.LAND_DOTS, { ring: 'island', x: 532, y: 95, r: 7 }]; }, /a green dot of r 7 on the island land/);
  P('PB37 Greenland left without its dot (it has room for one)', (b) => { b.LAND_DOTS = b.LAND_DOTS.filter((d) => d.ring !== 'greenland'); b.LAND_NODOT = { ...b.LAND_NODOT, greenland: 'no room' }; }, /greenland land shape could hold a green dot/);
  P('PB38 Baffin Island without a dot and without a reason', (b) => { b.LAND_NODOT = {}; }, /island land shape has no green dot/);

  // ---- 2. build sweep
  const pagesOf = {};
  for (const id of IDS) {
    const t = loadType(id);
    ok(t.exerciseType && /^[a-z-]+$/.test(t.exerciseType) && t.gradeBand === 'K', `${id}: no family key or not Kindergarten`);
    let refused = false; try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /English/.test(e.message); }
    ok(refused, `${id}: another locale does not refuse`);
    const sigs = {};
    for (const lv of [1, 2, 3]) {
      const pages = []; const ins = insOf(t, lv);
      // a match page's partner spread is pooled over 2,000 copies: 400 pool four places per row of five rows and one band
      // of the many fell 3.7 standard errors off by chance (17% for 25%; 23% at 4,000 copies). Raise the sample, never the band.
      const want = MATCH.has(id) ? Math.max(SEEDS, 2000) : SEEDS;
      for (let s = 1; s <= want; s++) {
        let r;
        try { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng(`dksk|${id}|${lv}|${s}`), variant: s }); } catch (e) { ok(false, `${id} L${lv} #${s}: build throws ${e.message}`); break; }
        const p = pageOf(r); pages.push(p);
        if (s > SEEDS) continue;   // the extra copies feed the spread band only
        const af = answerFaults(id, lv, p); ok(!af.length, af.join(' | '));
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
  judge('PT1 the rule-following picture always on the left', tellFaults('K-712', 2, spoil('K-712 2', (p) => ({ ...p, items: p.items.map((it) => ({ ...it, choices: [it.choices.find((c) => c[1] === 'follow'), it.choices.find((c) => c[1] !== 'follow')] })) }))), /place 1 holds|pattern/);
  judge('PT2 the fair picture always on the right', tellFaults('K-721', 2, spoil('K-721 2', (p) => ({ ...p, items: p.items.map((it) => ({ ...it, choices: [it.choices.find((c) => c[1] !== 'fair'), it.choices.find((c) => c[1] === 'fair')] })) }))), /place 2 holds|pattern/);
  judge('PT3 the kind cards always first', tellFaults('K-713', 2, spoil('K-713 2', (p) => ({ ...p, cards: [...p.cards.filter((c) => c[1] === 'kind'), ...p.cards.filter((c) => c[1] !== 'kind')] }))), /pattern|kind cards/);
  judge('PT4 every partner straight across', tellFaults('K-716', 2, spoil('K-716 2', (p) => ({ ...p, rights: p.cards.map((c) => c[1]) }))), /straight across/);
  judge('PT5 the partners always one row down', tellFaults('K-718', 2, spoil('K-718 2', (p) => ({ ...p, rights: p.cards.map((_, i) => p.cards[(i + p.cards.length - 1) % p.cards.length][1]) }))), /partner\): place/);
  judge('PT6 the cold things always first', tellFaults('K-724', 2, spoil('K-724 2', (p) => { const its = p.cards.filter((c) => /^(hot|cold)$/.test(c[1])); return { ...p, cards: [...its.filter((c) => c[1] === 'cold'), ...its.filter((c) => c[1] === 'hot')] }; })), /pattern|cold things/);
  judge('PT7 the 13 always first', tellFaults('K-719', 3, spoil('K-719 3', (p) => ({ ...p, cards: [p.cards.find((c) => c[1] === 'right'), ...p.cards.filter((c) => c[1] !== 'right')] }))), /the 13/);
  // round 1 tells
  judge('PT9 two-pair partners never straight across (400 copies)', tellFaults('K-716', 1, spoil('K-716 1', (p) => ({ ...p, rights: p.rights.indexOf(p.cards[0][1]) === 0 ? p.rights.slice().reverse() : p.rights }))), /two pairs straight across/);
  judge('PT10 two-pair partners always straight across (400 copies)', tellFaults('K-718', 1, spoil('K-718 1', (p) => ({ ...p, rights: p.cards.map((c) => c[1]) }))), /two pairs straight across/);
  { let q = 0; judge('PT11 the kind / not-kind split fixed at 2 + 2', tellFaults('K-713', 1, spoil('K-713 1', (p) => { q++; return { ...p, cards: p.cards.map((c, i) => [c[0], (i + q) % 2 ? 'kind' : 'not']) }; })), /split/); }
  judge('PT13 level 3: the wave always on the left', tellFaults('K-722', 3, spoil('K-722 3', (p) => ({ ...p, cards: [p.cards.find((c) => c[1] === 'right'), p.cards.find((c) => c[1] !== 'right')] }))), /the wave/);
  judge('PT12 the wave always on the left', tellFaults('K-722', 2, spoil('K-722 2', (p) => ({ ...p, cards: [p.cards.find((c) => c[1] === 'right'), p.cards.find((c) => c[1] !== 'right')] }))), /the wave/);
  judge('PT8 the school always on the top-left block', tellFaults('K-723', 2, spoil('K-723 2', (p) => ({ ...p, places: p.places.map((x) => (x.kind === 'school' ? { ...x, cell: 0 } : x)) }))), /school's block/);
  { let falseTells = 0, pools = 0; for (const [k, ps] of Object.entries(pagesOf)) { if (ps[0].meta.record) continue; for (let i = 0; i + 40 <= Math.min(ps.length, 200); i += 40) { pools++; if (tellFaults(k.split(' ')[0], +k.split(' ')[1], ps.slice(i, i + 40)).length) falseTells++; } }
    console.log(`40-copy pools of the real closed pages: ${falseTells} of ${pools} report a tell (the ${SEEDS}-copy pools report none)`); }
  { const t = loadType('K-716'); const same = { ...t, difficulty: { 1: t.difficulty[2], 2: t.difficulty[2], 3: t.difficulty[2] } };
    const sg = [1, 2, 3].map((lv) => levelSig(same.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('lv') }).bodyHtml));
    judge('PL1 three levels with one config', sg[0] === sg[1] && sg[1] === sg[2] ? ['two levels draw the same parts'] : [], /same parts/); }
  // answer and page-rule poisons on real pages (each with its control)
  const pagePoison = (name, id, lv, fn, re, insFn, which = 'rule', mustShow = null) => {
    const t = loadType(id); let r; for (let k = 0; k < 200; k++) { r = t.build({ difficulty: lv, locale: 'en' }, { rng: makeRng('pg|' + id + '|' + lv + (k ? '|' + k : '')) }); if (!mustShow || r.bodyHtml.includes(mustShow)) break; } const ins = insOf(t, lv);
    const run = (h, i) => (which === 'rule' ? pageRuleFaults(id, lv, h, i) : answerFaults(id, lv, pageOf({ ...r, bodyHtml: h })));
    ok(!run(r.bodyHtml, ins).length, `${name} control: ${run(r.bodyHtml, ins).join(' | ')}`);
    judge(name, run(fn(r.bodyHtml), insFn ? insFn(ins) : ins), re);
  };
  const swapIn = (h, item, right = 'follow') => { const i = h.indexOf(`data-dk-item="${item}"`); const j = h.indexOf('data-dk-item=', i + 10) > 0 ? h.indexOf('data-dk-item=', i + 10) : h.length; return h.slice(0, i) + h.slice(i, j).replace(`data-dk-answer="${right}"`, 'data-dk-answer="QQ"').replace('data-dk-answer="not"', `data-dk-answer="${right}"`).replace('data-dk-answer="QQ"', 'data-dk-answer="not"') + h.slice(j); };
  pagePoison('PA1 running stamped as following the rule', 'K-712', 2, (h) => swapIn(h, 'hall'), /hall stamped run/, null, 'answer', 'data-dk-item="hall"');
  pagePoison('PA2 a kind card stamped unkind', 'K-713', 2, (h) => h.replace(/data-dk-answer="kind"/, 'data-dk-answer="not"'), /stamped not/, null, 'answer');
  pagePoison('PA3 the diya beside the birthday on level 1', 'K-715', 1, (h) => h.replace(/data-sk-key="(pie|hat|envelope)" data-dk-answer="(thanksgiving|birthday|new-year)"/, 'data-sk-key="diya" data-dk-answer="diwali"').replace(/data-sk-key="(thanksgiving|new-year|diwali)" style=/, 'data-sk-key="birthday" style='), /beside the birthday|stamped with|once each/, null, 'answer');
  pagePoison('PA4 the 13 not stamped', 'K-719', 3, (h) => h.replace('data-dk-answer="right"', 'data-dk-answer="no"'), /not 13/, null, 'answer');
  pagePoison('PA5 a second red door on the map', 'K-723', 2, (h) => h.replace(/data-sk-door="plain"/, 'data-sk-door="red"'), /one red door/, null, 'answer');
  pagePoison('PA9 level 3: the tree stamped as more water', 'K-722', 3, (h) => h.replace('data-sk-key="water" data-dk-answer="right"', 'data-sk-key="water" data-dk-answer="no"').replace('data-sk-key="land" data-dk-answer="no"', 'data-sk-key="land" data-dk-answer="right"'), /the wave \(more water\) is not the one answer/, null, 'answer');
  pagePoison('PA8 the tree stamped as more water', 'K-722', 2, (h) => h.replace('data-sk-key="water" data-dk-answer="right"', 'data-sk-key="water" data-dk-answer="no"').replace('data-sk-key="land" data-dk-answer="no"', 'data-sk-key="land" data-dk-answer="right"'), /the wave \(more water\) is not the one answer/, null, 'answer');
  pagePoison('PA6 every person one skin tone', 'K-714', 2, (h) => h.replace(/data-sk-skin="s\d"/g, 'data-sk-skin="s2"'), /skin tone/, null, 'answer');
  pagePoison('PA7 the dotted path printed on level 2', 'K-723', 2, (h) => h.replace('data-sk-map="1">', 'data-sk-map="1"><polyline data-sk-path="trace" points="0,0 1,1"/>'), /printed above level 1/, null, 'answer');
  pagePoison('PG1 a word for the child to read', 'K-724', 2, (h) => h.replace('</div>', '<span>Snow</span></div>'), /"Snow" is printed/);
  pagePoison('PG2 his name on the child’s page', 'K-720', 2, (h) => h.replace('a game where everyone gets a turn', 'a game where everyone gets a turn, like King'), /a name on the child/);
  pagePoison('PG3 a 0 on the vote graph', 'K-726', 2, (h) => h.replace('data-sk-axis="1">1</text>', 'data-sk-axis="1">0</text>'), /the number 0/);
  pagePoison('PG4 the four-line traditions page without "one line"', 'K-715', 2, (h) => h, /one line/, (i) => i.replace(' Each family picture gets one line.', ''));
  pagePoison('PG5 the choice page without "There is no wrong answer."', 'K-717', 2, (h) => h, /no wrong answer/, (i) => i.replace(' There is no wrong answer.', ''));
  // round 1
  pagePoison('PG10 "give up" printed on the child\'s page', 'K-717', 3, (h) => h.replace('me with the thing I picked', 'one thing I give up'), /"give up" is printed/);
  pagePoison('PG11 "give up" back in the instruction', 'K-717', 2, (h) => h, /"give up" is printed/, (i) => i.replace('the one you do not pick', 'the one you give up'));
  pagePoison('PG12 level 3 without "only one thing in each row"', 'K-717', 3, (h) => h, /only one thing in each row/, (i) => i.replace('You can have only one thing in each row. ', ''));
  pagePoison('PG13 the tie rule without "for the most votes" on the page', 'K-726', 3, (h) => h.replace(VOTE_OWN.tie, 'If two books have the same, we vote again.'), /the tie rule is not/);
  pagePoison('PG14 the winner circled under the graph again', 'K-726', 2, (h) => h.replace('The book with the most votes wins. Color the star by the book that won.', 'The book with the most votes wins: circle it under the graph.'), /not marked with a star/);
  pagePoison('PG15 the bookshelf back on the book problem', 'K-725', 2, (h) => h.replace(/(data-sk-art="problem:book"[^>]*>)/, '$1<g data-sk-drawn="bookshelf"></g>'), /bookshelf on the book problem/);
  pagePoison('PG16 "the box of stars blue" back', 'K-719', 2, (h) => h, /box of stars blue|keep the stars white/, (i) => i.replace('Color the box blue around the stars. Leave the stars white.', 'Color the box of stars blue.'));
  pagePoison('PG17 level 1 of K-720 back to two boxes', 'K-720', 1, (h) => h.replace('data-dk-prompt="me-and-friend"', 'data-dk-prompt="me"').replace('me and my friend', 'me'), /not one box for me and my friend|"me" is printed/);
  pagePoison('PG18 level 3 of K-714 without "Every one is a family."', 'K-714', 3, (h) => h, /Every one is a family/, (i) => i.replace(' Every one is a family.', ''));
  pagePoison('PG19 level 3 of K-723 without "along the streets"', 'K-723', 3, (h) => h, /along the streets/, (i) => i.replace(' along the streets', ''));
  pagePoison('PG20 level 3 of K-720 keeps the line beside the words', 'K-720', 3, (h) => h.replace(/(data-sk-wordpick="share"[\s\S]*?>share<\/span>)/, '$1<span class="sk-line" style="flex:1 1 auto"></span>'), /circle one word/);
  // round 2
  pagePoison('PG22 level 3 of K-722 without the more-water question', 'K-722', 3, (h) => h, /does not ask "more water or more land\?"/, (i) => i.replace(' Is there more water or more land? Circle the wave for more water or the tree for more land.', ''));
  pagePoison('PG23 level 3 of K-722 without the wave and the tree', 'K-722', 3, (h) => h.replace('data-sk-art="more:wave"', 'data-sk-art="x"'), /no wave and tree to circle/);
  pagePoison('PG21 the hand mirror back on the haircut', 'K-718', 2, (h) => h.replace(/(data-sk-art="result:haircut"[^>]*>)/, '$1<g data-sk-drawn="hand-mirror"></g>'), /hand mirror/);
  pagePoison('PG6 the vote page without "did my book win"', 'K-726', 2, (h) => h.replace('data-sk-mine="no"', 'data-sk-mine="maybe"'), /did not win/);
  pagePoison('PG7 the library telephone back on long ago', 'K-716', 2, (h) => h.replace('data-sk-art="old:wall-phone"', 'data-dk-pic="around the house/telephone"'), /does not read as long ago/, null, 'rule', 'old:wall-phone');
  pagePoison('PG8 a library helper back', 'K-725', 2, (h) => h.replace('data-sk-art="helper:office"', 'data-sk-art="helper:office" data-dk-pic="occupations/office_worker"'), /a library helper/);
  pagePoison('PG9 the map without its north arrow', 'K-723', 2, (h) => h.replace('data-sk-north="1"', 'data-sk-x="1"'), /no north arrow/);

  // ---- 3. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  const OUTD = path.join(require('os').tmpdir(), 'verify-dk-social-k');
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
    /** round 2: a render poison on the FIRST copy (variant 1..40) whose page shows `needle`; the control is that real copy */
    const prv = async (name, id, lv, fn, re, needle) => {
      const t = loadType(id); let v = 0;
      for (let k = 1; k <= 40 && !v; k++) { const b = t.build({ theme: null, difficulty: lv, locale: 'en', unit: null }, { rng: makeRng(instanceSeed({ typeId: id, theme: null, difficulty: lv, seedEpoch: 1, variant: k })), variant: k }); if (b.bodyHtml.includes(needle)) v = k; }
      if (!v) { ok(false, `${name}: no copy of ${id} level ${lv} shows ${needle}`); return; }
      const c = await render(t, lv, v, 'control'); const cf = [].concat(c.qa.verify || [], c.qa.lints || []); ok(!cf.length, `${name} control (copy ${v}): ${cf.slice(0, 2).join(' | ')}`);
      const r = await render(spoilType(id, fn), lv, v, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re);
    };
    const pr = async (name, id, lv, fn, re) => {
      const r = await render(spoilType(id, fn), lv, 1, 'poison'); judge(name, [].concat(r.qa.verify || [], r.qa.lints || []), re);
    };
    // each render poison's control is the real page of the same type and level, rendered above (ok() on its verify)
    await pr('PR1 the page shrunk to 60% (a blank band at the bottom)', 'K-716', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is/);
    await pr('PR2 a box laid over another', 'K-718', 2, (h) => h.replace('<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;', '<div data-dk-box style="position:absolute;left:40px;top:40px;width:220px;height:140px;background:#FFFFFF"></div><div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;'), /two boxes collide/);
    await pr('PR3 a flag with 12 stripes', 'K-719', 2, (h) => h.replace(/<rect [^>]*data-sk-stripe="white"\/>/, ''), /stripes \(13\)/);
    await pr('PR4 the blue box over 6 stripes', 'K-719', 2, (h) => h.replace(/(<rect x="0" y="0" width="[0-9.]+" height=")([0-9.]+)("[^>]*data-sk-canton="1")/, (m, a, v, b2) => a + (Number(v) * 6 / 7).toFixed(1) + b2), /blue box/);
    await pr('PR5 a red dot in a white stripe', 'K-719', 1, (h) => h.replace(/(<circle cx="[0-9.]+" cy=")([0-9.]+)("[^>]*data-sk-reddot="1")/, (m, a, v, b2) => a + (Number(v) + 640 / 1.9 / 13).toFixed(1) + b2), /white stripe/);
    await pr('PR6 an ocean dot moved onto land', 'K-722', 1, (h) => h.replace(/<circle cx="\d+" cy="\d+"( r="22"[^>]*data-sk-oceandot="atlantic")/, (m, rest) => `<circle cx="${B.GLOBE_DATA().us.x}" cy="${B.GLOBE_DATA().us.y}"${rest}`), /atlantic dot is not on water/);
    await pr('PR7 a globe that is mostly land', 'K-722', 2, (h) => h.replace('data-sk-globe="1"/>', 'data-sk-globe="1"/><path d="M0,0 L1000,0 L1000,800 L0,800 Z" fill="#FFFFFF" data-sk-land="x"/>'), /not more water than land/);
    await pr('PR8 the traced path across a block', 'K-723', 1, (h) => h.replace(/(data-sk-path="trace")/, '$1').replace(/<polyline points="([^"]+)"([^>]*data-sk-path="trace")/, (m, pts, rest) => { const P2 = pts.split(' '); return `<polyline points="${P2[0]} ${P2[P2.length - 1]}"${rest}`; }), /crosses a block/);
    await pr('PR9 the speaker drawn large', 'K-720', 2, (h) => h.replace(/(data-sk-drawn="speaker-at-lectern"><g transform="translate\([0-9.]+ [0-9.]+\) scale\()0\.3\d*( )0\.3\d*/, '$11.3$21.3'), /drawn large/);
    await pr('PR10 a diya in the birthday scene', 'K-715', 2, (h) => h.replace(/(data-sk-art="tradition:birthday"[^>]*>)/, '$1<g data-sk-drawn="diya"></g>'), /birthday scene shows a diya/);
    await pr('PR11 the baker drawn with bread', 'K-718', 2, (h) => h.replace(/(data-sk-art="worker:baker"[^>]*>)/, '$1<g data-sk-drawn="bread"></g>'), /shows what the job makes/);
    await pr('PR12 a partner straight across (four pairs)', 'K-716', 2, (h) => { const ks = [...h.matchAll(/data-sk-key="([^"]+)" data-dk-answer="([^"]+)"/g)]; const rs = [...h.matchAll(/data-sk-key="([^"]+)" style=/g)].map((m) => m[1]); let out = h; rs.forEach((k, j) => { out = out.replace(`data-sk-key="${k}" style=`, `data-sk-key="TMP${j}" style=`); }); ks.forEach((m, i) => { out = out.replace(`data-sk-key="TMP${i}" style=`, `data-sk-key="${m[2]}" style=`); }); return out; }, /straight across/);
    await pr('PR13 every person one skin tone', 'K-713', 2, (h) => h.replace(/data-sk-skin="s\d"/g, 'data-sk-skin="s3"'), /same skin tone/);
    await pr('PR14 a rule pair with two different children', 'K-712', 2, (h) => { const i = h.indexOf('data-sk-age="child"'); const j = h.lastIndexOf('data-sk-skin="', i); return h.slice(0, j) + 'data-sk-skin="s9" ' + h.slice(j + 'data-sk-skin="s1" '.length); }, /same child/);
    await pr('PR15 an off-palette colour in a drawing', 'K-721', 2, (h) => h.replace('fill="#6BB36B"', 'fill="#123456"'), /outside the SK palette/);
    await pr('PR16 a vote bar with nineteen boxes', 'K-726', 2, (h) => h.replace(/<rect [^>]*data-sk-cell="20"[^>]*\/>/, ''), /a vote bar with 19 boxes/);
    // round 1 render poisons (each control: the real page of the same type and level, rendered above)
    await pr('PR19 a vote bar of 10 boxes', 'K-726', 1, (h) => h.replace(/<rect [^>]*data-sk-cell="(1[1-9]|20)"[^>]*\/>/g, (m) => (m.includes('data-sk-graphcol') ? m : '')), /a vote bar with 10 boxes/);
    await pr('PR20 the tie rule on the page without "for the most votes"', 'K-726', 2, (h) => h.replace(VOTE_OWN.tie, 'If two books have the same, we vote again.'), /the tie rule is not/);
    await pr('PR21 a framed lead card (K-717)', 'K-717', 2, (h) => h.replace('<div data-dk-box data-sk-lead=', '<div class="dk-tile dk-tile--lead" data-dk-box data-sk-lead='), /lead card is framed/);
    await pr('PR22 the lead card as big as the choices', 'K-717', 1, (h) => h.replace(/style="flex-shrink:0;width:96px;/g, 'style="flex-shrink:0;width:214px;'), /not smaller than the choices/);
    await pr("PR23 the key's house with a coloured door", 'K-723', 2, (h) => { const i = h.indexOf('data-sk-keyrow="house"'); return h.slice(0, i) + h.slice(i).replace('data-sk-door="plain"', 'data-sk-door="blue"').replace('fill="#8B5E3C" stroke="#3A3530" stroke-width="1.4" data-sk-housedoor', 'fill="#4A7BD0" stroke="#3A3530" stroke-width="1.4" data-sk-housedoor'); }, /key's house has a coloured door/);
    await pr('PR24 a map house with a blue door', 'K-723', 2, (h) => h.replace('data-sk-door="plain"', 'data-sk-door="blue"'), /a house on the map has a coloured door/);
    await pr('PR25 the helping-up hands not joined', 'K-713', 2, (h) => h.replace(/data-sk-person="fallen"/, 'data-sk-person="fallen" style="transform:translateX(9px)"'), /hands are not joined/);
    await pr('PR26 the listening child drawn from behind', 'K-712', 2, (h) => h.replace(/(data-sk-art="story:listen"[\s\S]*?data-sk-age="child")/, '$1 data-sk-back="1"'), /drawn from behind/);
    await pr('PR27 the listening child turned away from the teacher', 'K-712', 2, (h) => h.replace(/(data-sk-art="story:listen"[\s\S]*?data-sk-age="child" data-sk-turn=")-1/, '$11'), /listening child does not turn toward/);
    await pr('PR28 the blocks in front of the child leaving them', 'K-712', 2, (h) => h.replace(/(data-sk-art="blocks:leave"[\s\S]*?)<rect x="[0-9.]+"( y="[0-9.]+" width="11"[^>]*data-sk-block="1")/, '$1<rect x="186"$2'), /block lies in front/);
    await pr('PR29 level 3 rule cards narrowed again', 'K-712', 3, (h) => h.replace(/width:222px;height:115px/g, 'width:170px;height:115px'), /rule picture 170 px wide/);
    await pr('PR30 a green dot on water', 'K-722', 1, (h) => h.replace(/<circle cx="376" cy="236"/, '<circle cx="810" cy="440"'), /green dot \(americas\) is not on land/);
    await pr('PR31 a land shape without its green dot', 'K-722', 1, (h) => h.replace(/<circle [^>]*data-sk-landdot="greenland"\/>/, ''), /greenland land has no green dot/);
    await pr('PR32 the diya drawn long (a boat)', 'K-715', 2, (h) => h.replace(/<g data-sk-bowl="1">/g, '<g data-sk-bowl="1" transform="translate(47 70) scale(2 1) translate(-47 -70)">'), /times as wide as tall/);
    await pr('PR33 the New Year scene without its lanterns', 'K-715', 2, (h) => h.replace(/data-sk-drawn="lantern"/g, 'data-sk-drawn="x"'), /New Year scene shows no celebration/);
    await pr('PR34 the library lattice pie back', 'K-715', 2, (h) => h.replace(/(data-sk-art="object:pie"[^>]*>)/, '$1<image data-dk-pic="thanksgivinng/pie" href="#" x="0" y="0" width="1" height="1"/>'), /lattice pie/);
    await pr('PR35 the hand mirror back on the haircut', 'K-718', 2, (h) => h.replace(/(data-sk-art="result:haircut"[^>]*>)/, '$1<g data-sk-drawn="hand-mirror"></g>'), /hand mirror/);
    await pr('PR36 the teenager as tall as the dad', 'K-714', 2, (h) => h.replace(/(data-sk-art="family:dad-teen"[\s\S]*?scale\()0\.912( 0\.912\)[^>]*data-sk-age="teen")/, '$11.2$2').replace(/(scale\(1\.2) 0\.912(\)[^>]*data-sk-age="teen")/, '$1 1.2$2'), /teenager is \d+% of the dad|hand is not on the teen/);
    await pr('PR37 the dotted path starting at the edge of the block', 'K-723', 1, (h) => h.replace(/<polyline points="([0-9.]+),([0-9.]+) /, (m, x, y) => `<polyline points="${x},${(+y + 30).toFixed(1)} `), /from the red door to the school door|crosses a block/);
    await pr('PR38 the dotted path faint again', 'K-723', 1, (h) => h.replace(/stroke-width="7" stroke-dasharray="0.1 13"/, 'stroke-width="5" stroke-dasharray="0.1 10"'), /too faint/);
    await pr('PR39 the fire station without its fire truck', 'K-723', 2, (h) => h.replace(/data-sk-drawn="fire-truck"/g, 'data-sk-drawn="y"'), /fire station without its fire truck/);
    await pr('PR40 a place picture stretched sideways (seams)', 'K-724', 3, (h) => h.replace(/viewBox="0 0 ([0-9.]+) 200"([^>]*data-sk-art="place:cold")/, (m, vw, rest) => `viewBox="-20 0 ${vw} 200"${rest}`), /stretched sideways/);
    await pr('PR41 keeping the swing, not turned away', 'K-721', 2, (h) => h.replace(/(data-sk-art="swing:keep"[\s\S]*?)data-sk-turn="-1"/, '$1'), /does not turn away/);
    await pr('PR42 the office card as a computer desk', 'K-725', 2, (h) => h.replace(/data-sk-drawn="staff-mailboxes"/, 'data-sk-drawn="computer"'), /office card has no staff-mailboxes|computer desk/);
    await pr('PR43 the bookshelf back on the book problem (a shared picture)', 'K-725', 2, (h) => h.replace(/(data-sk-art="problem:book"[^>]*>)/, '$1<g data-sk-drawn="bookshelf"></g>'), /bookshelf on a problem card AND on a helper card/);
    await pr('PR44 a level-1 scene card past the margin', 'K-715', 1, (h) => h.replace(/width:330px;height:318px/g, 'width:380px;height:318px'), /runs past the margin|runs off the page/);
    // round 2 (prv: the first copy that shows the spoiled part; its control is that real copy, rendered first)
    await pr('PR45 K-712 level 3: the drawing box back to 1.2 inches', 'K-712', 3, (h) => h.replace('min-height:236px', 'min-height:110px').replace(/flex:0 0 auto/g, 'flex:1 1 0;min-height:0').replace('flex:1 1 auto;min-height:0', 'flex:0.8 1 0;min-height:0'), /the drawing box is \d+ px tall/);
    await pr('PR46 K-725 level 3: the helper box back to 1.25 inches', 'K-725', 3, (h) => h.replace('min-height:236px', 'min-height:120px').replace(/flex:0 0 auto/g, 'flex:1 1 0;min-height:0'), /the drawing box is \d+ px tall/);
    await pr('PR47 K-713 level 3: three small cards across again', 'K-713', 3, (h) => h.replace('repeat(2,322px)', 'repeat(3,214px)').replace(/width:322px;height:154px/g, 'width:214px;height:154px'), /kind-or-not card 214 px wide/);
    await pr('PR48 K-713 level 3: the cards as tall as level 2 (the drawing box shrinks)', 'K-713', 3, (h) => h.replace(/width:322px;height:154px/g, 'width:322px;height:200px').replace('min-height:230px', 'min-height:150px'), /the drawing box is \d+ px tall/);
    await prv('PR49 the drawing torn into two separate pieces (round 1)', 'K-713', 2, (h) => h.replace(/<path [^>]*data-sk-joined="1"\/>/, ''), /two separate pieces/, 'friend:tear');
    await prv('PR50 the tearing hands off the drawing', 'K-713', 2, (h) => h.replace(/<circle cx="([0-9.]+)"([^>]*data-sk-grip="l")/, (m, x, rest) => `<circle cx="${(+x - 30).toFixed(1)}"${rest}`), /hands are not on the drawing/, 'friend:tear');
    await prv("PR51 the crayons on the tearing child's side", 'K-713', 2, (h) => h.replace('<g data-sk-drawn="friends-crayons">', '<g data-sk-drawn="friends-crayons" transform="translate(84 0)">'), /crayons are on the tearing child's side/, 'friend:tear');
    await prv('PR52 the friend whose drawing is torn not crying', 'K-713', 2, (h) => { const i = h.indexOf('data-sk-person="friend"'); return h.slice(0, i) + h.slice(i).replace('fill="#9FD3E8"', 'fill="#FFFFFF"'); }, /is not crying/, 'friend:tear');
    await pr('PR53 the cut hair curled again', 'K-718', 2, (h) => h.replace(/(data-sk-clipping="cape">)<line x1="([0-9.]+)" y1="([0-9.]+)" x2="[0-9.]+" y2="[0-9.]+" (stroke="#[0-9A-F]{6}")[^>]*\/>/, '$1<path d="M$2,$3 q2.6,-2.4 5.2,0" fill="none" $4/>'), /the cut hair has a path/);
    await pr('PR54 the cut hair in another colour', 'K-718', 2, (h) => { const m = /data-sk-haircolor="(#[0-9A-F]{6})"/.exec(h); const i = h.indexOf('data-sk-clipping="floor"'); return h.slice(0, i) + h.slice(i, i + 900).split(`stroke="${m[1]}"`).join('stroke="#D9534F"') + h.slice(i + 900); }, /cut strand is not the child's hair colour/);
    await pr('PR55 no heap of cut hair on the floor', 'K-718', 2, (h) => h.replace(/data-sk-clipping="floor"/g, 'data-sk-clipping="cape"'), /no heap of cut hair on the floor/);
    await pr('PR56 the new haircut without its part line', 'K-718', 3, (h) => h.replace('data-sk-part="1"', 'data-sk-x="1"'), /no part line/);
    await pr('PR57 K-720 level 3: a word without its picture', 'K-720', 3, (h) => h.replace('data-sk-wordpic="help-up"', 'data-sk-x="help-up"'), /the word "kind" has no picture/);
    await pr('PR58 K-720 level 3: two words share one picture', 'K-720', 3, (h) => h.replace('data-sk-wordpic="crayons"', 'data-sk-wordpic="slide"'), /share one picture|shows the slide picture/);
    await prv('PR59 the book in the hand as a flat slab again (no page edges, no cover picture)', 'K-717', 2, (h) => h.replace('data-sk-book-pages="1"', 'data-sk-x="1"').replace('data-sk-book-pic="1"', 'data-sk-y="1"'), /book in the hand has no pages|book in the hand has no pic/, 'lead:book');
    await pr('PR60 K-722 level 1: the speck dot back on Baffin Island', 'K-722', 1, (h) => h.replace(/(<circle [^>]*data-sk-landdot="greenland"\/>)/, '$1<circle cx="532" cy="95" r="7" fill="#3F9B4B" stroke="#3A3530" stroke-width="1.6" data-sk-landdot="island"/>'), /a green dot of r 7/);
    await pr('PR61 K-726: thin boxes again (the round-1 bar, 27 px wide)', 'K-726', 2, (h) => h.replace(/width="53" height="53"/g, 'width="27" height="53"'), /not a square/);
    await pr('PR62 K-726 level 1: squares under 0.55 inch', 'K-726', 1, (h) => h.replace(/width="53" height="53"/g, 'width="46" height="46"'), /not a square of at least 52.5/);
    await pr('PR63 K-726: the second ten on top of the first (one row)', 'K-726', 2, (h) => h.replace(/<rect x="([0-9.]+)" y="([0-9.]+)"( width="53" height="53"[^>]*data-sk-cellrow="2")/g, (m, x, y, rest) => `<rect x="${x}" y="${(+y - 53).toFixed(1)}"${rest}`), /not two rows/);
    await pr('PR64 K-726: the numbers 11-20 over the top row', 'K-726', 2, (h) => h.replace(/<text x="([0-9.]+)" y="([0-9.]+)"([^>]*data-sk-axis="(1[1-9]|20)")/g, (m, x, y, rest) => `<text x="${x}" y="${(+y - 140).toFixed(1)}"${rest}`), /is not under its own box/);
    await pr('PR65 K-726: no heavier line after 5', 'K-726', 3, (h) => h.replace(/data-sk-five="1"/g, 'data-sk-x="1"'), /heavier line after 5/);
    await pr('PR17 a picture that does not load', 'K-724', 2, (h) => h.replace(/src="file:[^"]+"/, 'src="file:///nope.webp"'), /did not load|broken image/);
    { // PR18: a draw box that no longer takes the slack (fixed at a short height): the sweep must find an empty band
      const sp = spoilType('K-720', (h) => h.replace(/flex:1 1 auto;min-height:200px/, 'flex:0 0 auto;height:80px'));   // level 2's one frame
      await render(sp, 2, 1, 'poison'); const sw = await layoutSweep(sp, 2, 12); judge('PR18 the drawing frame not taking the slack (layout sweep)', sw.faults, /empty band of \d+ px|the stack is/);
      const t = loadType('K-720'); await render(t, 2, 1, 'poison'); const ctl = await layoutSweep(t, 2, 12); ok(!ctl.faults.length, `PR18 control: ${ctl.faults.slice(0, 2).join(' | ')}`); }
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
