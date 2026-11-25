#!/usr/bin/env node
/**
 * Stage D-5 batch S1 (2026-11-24): the teaching points of the 17 new Grade 1 social studies page types
 * G1-653 … G1-669 (types/_shared/dk-social-1.js; lines, review and rulings in lcs-stage-d/batch-s1) and G1-670 (Prices at
 * the Market, the page of G2-472 under a Grade 1 id). One point per new lesson of the year design (design.en.social.json,
 * grade 1), the teacher-led class meeting included, so every published type sits under a point.
 *
 *   Each point carries its C3 Framework Dimension 2 indicator (K-2) as `code`. The code reader of the English crosswalk
 *   (scripts/curricula/build-en.js readCodes) reads CCSS and NGSS only, so the English rows are authored here into
 *   curricula/en/crosswalk-overrides.json, as for the D-0 social points: `teaches` only where the page and its lesson ask
 *   what the indicator asks, `prepares` where they lead up to it.
 *   Every other curriculum, Texas included, is marked "not yet read": the reading comes with the Grade 1 social studies
 *   units (Stage D-3).
 * Social studies has no authored order (teaching-graph/order.json): build-points.js orders it mechanically.
 *
 *   node scripts/units/year/add-points-1.en.social.js        (refuses to run twice)
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
const SS = 'Social Studies';
const T = (id) => ({ id, rel: 'teaches' }), P = (id) => ({ id, rel: 'prepares' });
const POINTS = [
  { tp: '1:rules-in-places', code: 'D2.Civ.3.K-2', type: 'G1-653', skill: 'Match a rule to the place it is for, and tell why the rule is there',
    en: { rows: [T('D2.Civ.3.K-2')], why: 'Matching each rule to its place (the library, the pool, the bus, the classroom) and finishing "We ___ so that ___." explain the need for and purposes of rules in settings inside and outside of school (D2.Civ.3, K-2).' } },
  { tp: '1:class-meeting', code: 'D2.Civ.9.K-2', type: 'G1-669', skill: 'Hold a class meeting with talking rules, say back what a classmate said, and decide together',
    en: { rows: [T('D2.Civ.9.K-2')], why: 'A class meeting with agreed talking rules, where each speaker says back what the last one said before adding an idea and the class decides how the class jobs work, follows agreed-upon rules for discussions while making a group decision (D2.Civ.9, K-2).' } },
  { tp: '1:good-citizen', code: 'D2.Civ.7.K-2', type: 'G1-654', skill: 'Choose what a good citizen does at school and name the virtue: honest, kind, fair, responsible',
    en: { rows: [T('D2.Civ.7.K-2')], why: 'Choosing what a good citizen does in short school stories and naming the virtue it shows (honest, kind, fair, responsible) apply civic virtues in school settings (D2.Civ.7, K-2).' } },
  { tp: '1:leaders-jobs', code: 'D2.Civ.1.K-2', type: 'G1-655', skill: 'Match each leader to the place they lead (school, town, state, country) and to what they do',
    en: { rows: [T('D2.Civ.1.K-2')], why: 'Matching the principal, the mayor, the governor and the president to the school, town, state and country they lead, and to what each does, describes the roles and responsibilities of people in authority (D2.Civ.1, K-2).' } },
  { tp: '1:old-postcard-clues', code: 'D2.His.11.K-2', type: 'G1-656', skill: 'Find who made an old postcard, when and where, from the clues on the card itself',
    en: { rows: [T('D2.His.11.K-2')], why: 'Finding on the front and back of an old postcard who made it, when and where (a studio name, a year, a town sign) identifies the maker, date and place of a historical source from the source itself (D2.His.11, K-2).' } },
  { tp: '1:ask-someone-older', code: 'D2.His.10.K-2', type: 'G1-657', skill: 'Ask an older person about their childhood and tell one thing the answers teach about the past',
    en: { rows: [T('D2.His.10.K-2')], why: 'Asking an older person planned questions about their childhood and writing "I learned that ___." use a person\'s memories as a source to study the past (D2.His.10, K-2).' } },
  { tp: '1:school-play-long-ago', code: 'D2.His.4.K-2', type: 'G1-658', skill: 'Sort how children went to school and played long ago and today',
    en: { rows: [T('D2.His.2.K-2'), P('D2.His.4.K-2')], why: 'Sorting pictures and sentences in a child\'s voice into long ago and today compares life in the past to life today (D2.His.2, K-2); the sentences told by children of each time lead up to comparing their perspectives (D2.His.4, K-2).' } },
  { tp: '1:city-suburb-town', code: 'D2.Geo.8.K-2', type: 'G1-659', skill: 'Tell a city, a suburb and a small town apart and how people live in each',
    en: { rows: [P('D2.Geo.8.K-2')], why: 'Telling a city, a suburb and a small town apart and matching sentences about life in each lead up to comparing how people in different communities use near and distant places to meet their needs (D2.Geo.8, K-2).' } },
  { tp: '1:work-fits-land', code: 'D2.Geo.9.K-2', type: 'G1-660', skill: 'Match the land (fields, sea, forest, mountains) to the work people do there',
    en: { rows: [T('D2.Geo.9.K-2')], why: 'Matching each kind of land to the work people do there (farming on open fields, fishing by the sea, and so on) describes how the physical environment of a place connects to the work found there (D2.Geo.9, K-2).' } },
  { tp: '1:caring-for-places', code: 'D2.Geo.5.K-2', type: 'G1-661', skill: 'Find what people changed in a park, and how people can care for the places we share',
    en: { rows: [T('D2.Geo.5.K-2')], why: 'Circling what people changed in the same park after a careless day and after a clean-up day, and planning one way to care for the schoolyard, describe how human activities affect a place (D2.Geo.5, K-2).' } },
  { tp: '1:us-symbols', code: 'D2.Civ.8.K-2', type: 'G1-662', skill: 'Name the symbols of the United States (the flag, the bald eagle, the Statue of Liberty, the Liberty Bell) and what they stand for',
    en: { rows: [P('D2.Civ.8.K-2')], why: 'Naming the flag, the bald eagle, the Statue of Liberty and the Liberty Bell and reading what they stand for (freedom, one star for each state) lead up to the democratic principles such as equality and fairness that D2.Civ.8 (K-2) asks the child to describe.' } },
  { tp: '1:washington-lincoln', code: 'D2.His.9.K-2', type: 'G1-663', skill: 'Tell kinds of historical sources apart (a painting, a coin, a letter, a building) and the president each is about',
    en: { rows: [T('D2.His.9.K-2')], why: 'Writing whether each source about George Washington or Abraham Lincoln is a painting, a coin, a letter or a building identifies different kinds of historical sources (D2.His.9, K-2).' } },
  { tp: '1:fourth-of-july', code: 'D2.His.14.K-2', type: 'G1-664', skill: 'Tell why the colonists declared independence on July 4, 1776',
    en: { rows: [T('D2.His.14.K-2')], why: 'Choosing the real reasons the colonists gave in 1776 (to make their own laws, to choose their own leaders, no taxes they had no say in) and telling one in their own words give reasons for an event of the past (D2.His.14, K-2).' } },
  { tp: '1:people-made-fairer', code: 'D2.His.3.K-2', type: 'G1-665', skill: 'Ask questions about people who made life fairer (Rosa Parks, Ruby Bridges, Helen Keller, Martin Luther King Jr.)',
    en: { rows: [T('D2.His.3.K-2')], why: 'Reading one true fact about Rosa Parks, Ruby Bridges, Helen Keller and Martin Luther King Jr. and writing a question to one of them generate questions about individuals who shaped a significant change (D2.His.3, K-2).' } },
  { tp: '1:goods-services-near-far', code: 'D2.Eco.4.K-2', type: 'G1-666', skill: 'Sort goods and services, and tell what our town makes and what comes from far away',
    en: { rows: [T('D2.Eco.4.K-2')], why: 'Sorting goods from services and telling what is made in a sample town from what comes from other places describe the goods and services produced in the local community and in others (D2.Eco.4, K-2).' } },
  { tp: '1:jobs-earning-money', code: 'D2.Eco.6.K-2', type: 'G1-667', skill: 'Match workers to what they are paid for, and what a family spends its pay on',
    en: { rows: [T('D2.Eco.6.K-2')], why: 'Matching each worker to "I am paid to ___." and naming what a family spends its pay on explain how people earn income (D2.Eco.6, K-2).' } },
  { tp: '1:prices-market', code: 'D2.Eco.5.K-2', type: 'G1-670', skill: 'Read the price tags at a market, pay each price exactly with US coins, and tell which costs more',
    en: { rows: [T('D2.Eco.5.K-2')], why: 'Reading the price tag of each thing at a market stall, paying it exactly with real US coins and circling the one that costs more identify the prices of products in a local market (D2.Eco.5, K-2).' } },
  { tp: '1:saving-goal', code: 'D2.Eco.10.K-2', type: 'G1-668', skill: 'Save a little each week toward a goal and tell why people save',
    en: { rows: [T('D2.Eco.10.K-2')], why: 'Coloring a savings jar week by week toward a kite and choosing why the child saved (to buy it later, not to spend today) explain why people save (D2.Eco.10, K-2).' } },
];
// ---- everything is read and checked first
const out = [];
{
  const ids = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
  for (const p of POINTS) if (ids.has(p.tp)) throw new Error(p.tp + ' is a point already');
}
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '1', strand: SS, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.types[p.type]) throw new Error(p.type + ' is listed already'); j.types[p.type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points[p.tp]) throw new Error('en override ' + p.tp + ' exists'); j.points[p.tp] = Object.assign({}, p.en, { review: 'batch-s1 2026-11-24' }); }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-24 for the new Grade 1 social studies pages of the English year (Stage D-5 batch S1); no unit teaches it yet. Read it against the wording when the Grade 1 social studies units are placed' + (loc === 'en-tx' ? ' (TEKS Social Studies, Grade 1).' : ' and this language gets its pages.'), review: 'batch-s1 2026-11-24' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points with English C3 rows; files: ' + out.length);
