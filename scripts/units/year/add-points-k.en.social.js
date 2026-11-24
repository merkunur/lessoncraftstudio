#!/usr/bin/env node
/**
 * Stage D-5 batch SK (2026-11-24): the teaching points of the 15 new Kindergarten social studies page types
 * K-712 … K-726 (types/_shared/dk-social-k.js; lines, review and rulings in lcs-stage-d/batch-sk). One point per new
 * lesson of the year design (design.en.social.json, grade K), the two teacher-led lessons included, so every published
 * type sits under a point.
 *
 *   Each point carries its C3 Framework Dimension 2 indicator (K-2) as `code`. The code reader of the English crosswalk
 *   (scripts/curricula/build-en.js readCodes) reads CCSS and NGSS only, so the English rows are authored here into
 *   curricula/en/crosswalk-overrides.json, as for the D-0 social points: `teaches` only where the page and its lesson ask
 *   what the indicator asks, `prepares` where they lead up to it.
 *   Every other curriculum, Texas included, is marked "not yet read": the reading comes with the Kindergarten social
 *   studies units (Stage D-3).
 * Social studies has no authored order (teaching-graph/order.json): build-points.js orders it mechanically.
 *
 *   node scripts/units/year/add-points-k.en.social.js        (refuses to run twice)
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
  { tp: 'K:class-rules', code: 'D2.Civ.12.K-2', type: 'K-712', skill: 'Tell the picture that follows a class rule from the one that does not, and say how the rule helps us',
    en: { rows: [T('D2.Civ.12.K-2'), P('D2.Civ.3.K-2')], why: 'Choosing, in each pair of the same moment, the picture that follows a class rule (walking in the hall, raising a hand, cleaning up, listening at story time) identifies how rules work in the classroom and school (D2.Civ.12, K-2); saying which picture keeps everyone safe or helps us learn leads up to the purposes of rules (D2.Civ.3, K-2).' } },
  { tp: 'K:take-turns-share', code: 'D2.Civ.7.K-2', type: 'K-713', skill: 'Tell taking turns, sharing and helping from acts that are not kind',
    en: { rows: [T('D2.Civ.7.K-2')], why: 'Telling friends who take turns, share and help from acts that are not kind (grabbing, pushing, knocking down a tower), and drawing myself helping a friend, apply civic virtues in school settings (D2.Civ.7, K-2).' } },
  { tp: 'K:many-kinds-of-families', code: 'D2.Civ.6.K-2', type: 'K-714', skill: 'Families come in many kinds, and every one is a family; the people who care for me',
    en: { rows: [P('D2.Civ.6.K-2')], why: 'Seeing six kinds of family (one parent, two fathers, a grandmother raising grandchildren, a foster family, a big family) and drawing the people who care for me name the family as the first group whose members share tasks and care; D2.Civ.6 (K-2) asks how communities accomplish common tasks and fill roles, which the page leads up to but does not ask.' } },
  { tp: 'K:family-traditions', code: 'D2.Geo.6.K-2', type: 'K-715', skill: 'Traditions families may keep: a birthday, Thanksgiving, Diwali, Lunar New Year, and my own family\'s',
    en: { rows: [P('D2.Geo.6.K-2')], why: 'Matching each tradition\'s object (a party hat, a pie, a diya, a red envelope) to the family scene that keeps it, and drawing my own family\'s tradition, identify cultural practices; D2.Geo.6 (K-2) ties cultural characteristics to specific places, which the page does not ask.' } },
  { tp: 'K:long-ago-today', code: 'D2.His.2.K-2', type: 'K-716', skill: 'Things from long ago and things we use today that do the same job',
    en: { rows: [T('D2.His.2.K-2')], why: 'Matching each long-ago thing (a washboard and tub, a candle, a horse and buggy, a wall telephone) to the thing that does the same job today compares life in the past to life today (D2.His.2, K-2).' } },
  { tp: 'K:choosing-one-thing', code: 'D2.Eco.2.K-2', type: 'K-717', skill: 'When I can have only one thing, I choose one and give up the other',
    en: { rows: [T('D2.Eco.2.K-2'), T('D2.Eco.1.K-2')], why: 'With one coin, one recess or one library book, the child chooses one thing and crosses out the one given up: the limit makes the decision (D2.Eco.1, K-2), and the choice and the thing given up are its benefit and its cost (D2.Eco.2, K-2).' } },
  { tp: 'K:goods-and-services', code: 'D2.Eco.3.K-2', type: 'K-718', skill: 'Workers make goods (bread, a house) or do services (a haircut, bringing the mail)',
    en: { rows: [P('D2.Eco.3.K-2')], why: 'Matching each worker (a baker, a builder, a barber, a mail carrier) to the good they make or the service they do names goods and services and who produces them; D2.Eco.3 (K-2) asks for the skills and knowledge each job needs, which the lesson only begins ("what did each worker have to learn?").' } },
  { tp: 'K:our-flag', code: 'D2.Civ.5.K-2', type: 'K-719', skill: 'Our country, the United States of America, and its flag: 13 stripes and 50 stars',
    en: { rows: [P('D2.Civ.5.K-2')], why: 'Coloring the flag of the United States and counting its 13 stripes name the country and its symbol; D2.Civ.5 (K-2) asks what governments are and what they do, which the lesson only begins (leaders who make rules for the whole country).' } },
  { tp: 'K:martin-luther-king', code: 'D2.Civ.14.K-2', type: 'K-720', skill: 'Martin Luther King Jr. worked peacefully, with many others, to change unfair laws',
    en: { rows: [T('D2.Civ.14.K-2'), P('D2.Civ.8.K-2')], why: 'The true story of Martin Luther King Jr., who worked peacefully with many others to change laws that kept Black people and white people apart, describes how people have tried to improve their communities (D2.Civ.14, K-2); drawing children playing a fair game leads up to fairness and equality (D2.Civ.8, K-2).' } },
  { tp: 'K:fair-for-everyone', code: 'D2.Civ.8.K-2', type: 'K-721', skill: 'Tell a fair moment from an unfair one, and show how to make it fair',
    en: { rows: [T('D2.Civ.8.K-2')], why: 'Choosing, in each pair of the same moment, the one that is fair to everyone (taking turns on the swing, crackers shared, everyone in the game) and drawing how to make an unfair moment fair describe fairness and equality (D2.Civ.8, K-2).' } },
  { tp: 'K:land-and-water', code: 'D2.Geo.3.K-2', type: 'K-722', skill: 'A globe shows land and water, and there is more water than land',
    en: { rows: [T('D2.Geo.3.K-2')], why: 'Coloring the water and the land of a globe that shows North and South America, and finding the United States on the class globe, use a globe to identify environmental characteristics of places (D2.Geo.3, K-2).' } },
  { tp: 'K:neighborhood-map', code: 'D2.Geo.2.K-2', type: 'K-723', skill: 'Read a neighborhood map seen from above with a picture key, and find a path along the streets',
    en: { rows: [T('D2.Geo.2.K-2'), P('D2.Geo.1.K-2')], why: 'Finding the school and the park on a map with a picture key and drawing a path along the streets from a house to the school use a map to describe places and how they connect (D2.Geo.2, K-2); drawing my own house and a path onto the map leads up to constructing a map (D2.Geo.1, K-2).' } },
  { tp: 'K:hot-cold-places', code: 'D2.Geo.4.K-2', type: 'K-724', skill: 'A hot place and a cold place change what people wear and do outside',
    en: { rows: [T('D2.Geo.4.K-2')], why: 'Sending each thing (a coat, mittens, a sled, a swimsuit, sandals, a beach ball) to the snowy town or the beach town where people use it explains how weather and climate affect people\'s lives in a place (D2.Geo.4, K-2).' } },
  { tp: 'K:school-helpers', code: 'D2.Civ.1.K-2', type: 'K-725', skill: 'The people who help at school and the problem each one helps with',
    en: { rows: [T('D2.Civ.1.K-2'), P('D2.Civ.2.K-2')], why: 'After a school walk on which each adult says what they are in charge of, matching each problem (a hurt knee, a spill, a book to find, an empty lunch tray, going home early) to the school helper who handles it describes the roles and responsibilities of people in authority at school (D2.Civ.1, K-2), and leads up to how all people play important roles in a community (D2.Civ.2, K-2).' } },
  { tp: 'K:class-vote', code: 'D2.Civ.11.K-2', type: 'K-726', skill: 'A class vote: each child votes once, we count together, and the most votes wins',
    en: { rows: [T('D2.Civ.11.K-2')], why: 'Voting once, counting the votes together on a class graph and reading the book that won, even when my own book did not win, show how people work together to make decisions in the classroom (D2.Civ.11, K-2).' } },
];
// ---- everything is read and checked first
const out = [];
{
  const ids = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
  for (const p of POINTS) if (ids.has(p.tp)) throw new Error(p.tp + ' is a point already');
}
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: 'K', strand: SS, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.types[p.type]) throw new Error(p.type + ' is listed already'); j.types[p.type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points[p.tp]) throw new Error('en override ' + p.tp + ' exists'); j.points[p.tp] = Object.assign({}, p.en, { review: 'batch-sk 2026-11-24' }); }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-24 for the new Kindergarten social studies pages of the English year (Stage D-5 batch SK); no unit teaches it yet. Read it against the wording when the Kindergarten social studies units are placed' + (loc === 'en-tx' ? ' (TEKS Social Studies, Kindergarten).' : ' and this language gets its pages.'), review: 'batch-sk 2026-11-24' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points with English C3 rows; files: ' + out.length);
