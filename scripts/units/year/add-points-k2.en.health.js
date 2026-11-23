#!/usr/bin/env node
/**
 * Stage D-5 batch K2 (2026-11-23): the teaching points of the 4 new Kindergarten health page types
 * K-708 … K-711 (types/_shared/dk-k2.js; lessons, review and rulings in lcs-stage-d/batch-k). One point per lesson
 * of the year designs (design.en.science.json, design.en.health.json), so every published type sits under a point.
 *
 *   science points carry their NGSS performance expectation as `code` (NGSS:…): the English crosswalk reads it
 *   (scripts/curricula/build-en.js readCodes); health points carry their NHES indicator, and their English rows are
 *   authored in curricula/en/crosswalk-overrides.json (the code reader does not read NHES), as for the D-0 points.
 *   Every other curriculum, Texas included, is marked "not yet read": no unit teaches these points yet; the reading
 *   comes with the Kindergarten units (Stage D-3).
 * Science and health have no authored order (teaching-graph/order.json): build-points.js orders them mechanically.
 *
 *   node scripts/units/year/add-points-k2.en.health.js        (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const jsonLike = (raw, obj) => {   // keeps the file's indent and line ends
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  return out + (/\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '');
};
const S = 'Science', H = 'Health';   // ("Health & Safety" is not a strand of strand-map.json; road safety's comes from the coverage map)
const POINTS = [
  { tp: 'K:calm-down', strand: H, code: 'NHES.8.2.1', type: 'K-708', skill: 'Use a calm-down tool (smell the flower, blow out the candle; count to 5; squeeze and let go) and ask for a break or for help',
    en: { rows: [{ id: 'NHES.8.2.1', rel: 'teaches' }, { id: 'NHES.4.2.1', rel: 'prepares' }], why: 'Saying "I need a break, please." or "Can you help me?" makes a request that supports health and well-being (NHES 8.2.1, PreK-2); naming the feeling first leads to expressing feelings and needs (NHES 4.2.1).' } },
  { tp: 'K:kind-words', strand: H, code: 'NHES.4.2.5', type: 'K-709', skill: 'Tell a kind act from an unkind one and use kind words and kind hands',
    en: { rows: [{ id: 'NHES.4.2.5', rel: 'teaches' }], why: 'Circling the kind act in each scene (helping up, building together, sharing) and tracing kind words demonstrate ways to show kindness and compassion (NHES 4.2.5, PreK-2).' } },
  { tp: 'K:space-bubble', strand: H, code: 'NHES.4.2.4', type: 'K-710', skill: 'Ask before touching, accept "yes" and "no, thank you", and stop when someone says "Stop, please"',
    en: { rows: [{ id: 'NHES.4.2.4', rel: 'teaches' }], why: 'Asking "May I give you a hug?", accepting either answer and stopping at "Stop, please." communicate and respect the boundaries of self and others (NHES 4.2.4, PreK-2).' } },
  { tp: 'K:germ-busters', strand: H, code: 'NHES.7.2.2', type: 'K-711', skill: 'Know when to wash hands (after the bathroom, before eating, after coughing or sneezing, after playing outside) and wash for 20 seconds',
    en: { rows: [{ id: 'NHES.7.2.2', rel: 'teaches' }, { id: 'NHES.7.2.1', rel: 'teaches' }], why: 'Choosing the times to wash and washing for two "Happy Birthday" songs demonstrate practices that support the health of self and others (NHES 7.2.2) and identify a healthy practice (NHES 7.2.1), PreK-2.' } },
];
// ---- everything is read and checked first
const out = [];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: 'K', strand: p.strand, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.types[p.type]) throw new Error(p.type + ' is listed already'); j.types[p.type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS.filter((x) => x.en)) { if (j.points[p.tp]) throw new Error('en override ' + p.tp + ' exists'); j.points[p.tp] = Object.assign({}, p.en, { review: 'batch-k 2026-11-23' }); }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-23 for the new Kindergarten health pages of the English year (Stage D-5 batch K2); no unit teaches it yet. Read it against the wording when the Kindergarten science and health units are placed' + (loc === 'en-tx' ? ' (TEKS Science K and Health K).' : ' and this language gets its pages.'), review: 'batch-k 2026-11-23' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points (' + POINTS.filter((p) => p.en).length + ' with English NHES rows); files: ' + out.length);
