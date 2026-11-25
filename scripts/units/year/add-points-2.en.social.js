#!/usr/bin/env node
/**
 * Stage D-5 batch S2 (2026-11-25): the teaching points of the 17 new Grade 2 social studies page types
 * G2-614 … G2-630 (types/_shared/dk-social-2.js; lines, review and rulings in lcs-stage-d/batch-s2). One point per new
 * lesson of the year design (design.en.social.json, grade 2), the teacher-led class market day included, so every
 * published type sits under a point. The three Grade 2 lessons served by existing pages keep their points
 * (2:cardinal-directions, 2:continents, 2:family-relationships).
 *
 *   Each point carries its C3 Framework Dimension 2 indicator (K-2) as `code`. The code reader of the English crosswalk
 *   (scripts/curricula/build-en.js readCodes) reads CCSS and NGSS only, so the English rows are authored here into
 *   curricula/en/crosswalk-overrides.json, as for the Grade 1 points: `teaches` only where the page and its lesson ask
 *   what the indicator asks, `prepares` where they lead up to it.
 *   Every other curriculum, Texas included, is marked "not yet read": the reading comes with the Grade 2 social studies
 *   units (Stage D-3) and each language's own pages.
 * Social studies has no authored order (teaching-graph/order.json): build-points.js orders it mechanically.
 *
 *   node scripts/units/year/add-points-2.en.social.js        (refuses to run twice)
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
  { tp: '2:class-agreement', code: 'D2.Civ.10.K-2', type: 'G2-614', skill: 'Write the class rule I think matters most and why, compare it with a partner\'s, and help write a class agreement',
    en: { rows: [T('D2.Civ.10.K-2')], why: 'Writing the rule each child thinks matters most and why, writing a partner\'s rule and reason, and sorting the two into "only me", "both of us" and "only my partner" compare the child\'s own point of view with another\'s (D2.Civ.10, K-2).' } },
  { tp: '2:community-laws', code: 'D2.Civ.3.K-2', type: 'G2-615', skill: 'Match each community law to the problem it prevents, and tell why the community needs it',
    en: { rows: [T('D2.Civ.3.K-2')], why: 'Matching each community law (stop at a red light, a leash in the park, no litter, a bike helmet) to the one problem it prevents, and finishing "Our community needs this law because ___.", explain the need for and purposes of rules outside of school (D2.Civ.3, K-2).' } },
  { tp: '2:levels-of-government', code: 'D2.Civ.5.K-2', type: 'G2-616', skill: 'Tell what a government is, sort the mayor, city council, governor, president and Congress into local, state and national, and write a job of each',
    en: { rows: [T('D2.Civ.5.K-2')], why: 'Reading that a government is the people who make laws and run services for a place, writing each leader in the local, state or national box, and writing one job of each level explain what governments are and some of their functions (D2.Civ.5, K-2).' } },
  { tp: '2:government-services', code: 'D2.Eco.12.K-2', type: 'G2-617', skill: 'Find the services a government provides in a town (a library, a park, a fire station, road repair, a public school, mail) and who uses them',
    en: { rows: [T('D2.Eco.12.K-2')], why: 'Circling the services a government provides in a town picture (a library, a park, a fire station, road repair, a public school, a mail carrier) apart from businesses, and finishing "The ___ helps ___." for two of them, describe examples of the services governments provide (D2.Eco.12, K-2).' } },
  { tp: '2:places-change', code: 'D2.Geo.10.K-2', type: 'G2-618', skill: 'Compare before-and-after pictures of places and tell whether nature or people changed each one',
    en: { rows: [T('D2.Geo.10.K-2')], why: 'Comparing before-and-after pictures of places (a tree bare in winter and in leaf in spring, a desert after a rare rain, an empty lot that became a garden, a village that grew into a city) and telling whether nature or people changed each describe changes in the physical and cultural characteristics of world regions (D2.Geo.10, K-2).' } },
  { tp: '2:disaster-ready', code: 'D2.Geo.12.K-2', type: 'G2-619', skill: 'Find what a flood changed in a town, fill a family emergency kit, and find the coasts where hurricanes most often come ashore',
    en: { rows: [T('D2.Geo.12.K-2')], why: 'Circling what a flood changed in a town (water on the road, a closed school, helpers in a boat), filling a family emergency kit, coloring the Atlantic and Gulf coasts where hurricanes most often come ashore and writing how neighbors help identify ways a disaster may affect people living in a place (D2.Geo.12, K-2).' } },
  { tp: '2:winter-traditions', code: 'D2.Geo.6.K-2', type: 'G2-620', skill: 'Match winter traditions families may keep (Hanukkah, Christmas, Kwanzaa, Las Posadas, Lunar New Year) to their symbols and to the country where each began',
    en: { rows: [T('D2.Geo.6.K-2')], why: 'Matching winter traditions families may keep to their symbols (a menorah, a decorated tree, a kinara, a piñata, a red envelope) and drawing a line from Lunar New Year, Kwanzaa and Las Posadas to the country where each began identify cultural characteristics of specific places (D2.Geo.6, K-2).' } },
  { tp: '2:where-it-comes-from', code: 'D2.Geo.11.K-2', type: 'G2-621', skill: 'Read where everyday things were grown or made, find each country on a world map, and connect it to our community',
    en: { rows: [T('D2.Geo.11.K-2')], why: 'Reading sample labels (bananas grown in Ecuador, avocados grown in Mexico, a T-shirt made in Vietnam, coffee grown in Colombia), finding each country on a world map and drawing a line to the United States explain how buying products connects people to distant places (D2.Geo.11, K-2).' } },
  { tp: '2:made-here-sold-there', code: 'D2.Eco.15.K-2', type: 'G2-622', skill: 'Sort products into made abroad and sold here, and made here and sold abroad',
    en: { rows: [T('D2.Eco.15.K-2')], why: 'Writing each product under the arrow into the United States (bananas, cocoa, coffee) or the arrow out of it (airplanes, soybeans, corn), and finishing "The United States sells ___ / buys ___", describe products produced abroad and sold domestically and products produced domestically and sold abroad (D2.Eco.15, K-2).' } },
  { tp: '2:why-countries-trade', code: 'D2.Eco.14.K-2', type: 'G2-623', skill: 'Draw the trades that let islands that each make one thing meet every need, and tell why countries trade',
    en: { rows: [T('D2.Eco.14.K-2')], why: 'Drawing the trades that let islands that each make one thing (fruit, fish, wool) meet every island\'s need, and finishing "Countries trade because ___.", describe why people in one country trade goods with people in other countries (D2.Eco.14, K-2).' } },
  { tp: '2:two-accounts', code: 'D2.His.6.K-2', type: 'G2-624', skill: 'Read two accounts of the same day, mark what both say and what only one says, and tell why they differ',
    en: { rows: [T('D2.His.6.K-2')], why: 'Reading a child\'s and a librarian\'s accounts of the day a library opened, marking what both say and what only one says, and finishing "They noticed different things because ___." compare different accounts of the same event (D2.His.6, K-2).' } },
  { tp: '2:old-photo-questions', code: 'D2.His.12.K-2', type: 'G2-625', skill: 'Look closely at an old photograph of a main street, say what I see and think, and write questions about how the town changed',
    en: { rows: [T('D2.His.12.K-2')], why: 'Finding what a sample photograph of a main street about 1910 shows (a horse-drawn wagon, early cars, a streetcar), writing what it shows about life then, and writing questions and how to find out generate questions about a historical source as it relates to how a town changed (D2.His.12, K-2).' } },
  { tp: '2:why-town-changed', code: 'D2.His.16.K-2', type: 'G2-626', skill: 'Read a short town history, choose the most likely reason the town grew, and copy the clue that shows it',
    en: { rows: [T('D2.His.16.K-2')], why: 'Reading a short history of a sample town, circling the most likely reason it grew among two or three, copying the sentence that says the town grew and tells why, and writing why another reason is less likely select which reasons are more likely than others to explain a historical development (D2.His.16, K-2).' } },
  { tp: '2:tools-and-skills', code: 'D2.Eco.13.K-2', type: 'G2-627', skill: 'Sort what producers need into tools and machines, and skills learned by study and practice',
    en: { rows: [T('D2.Eco.13.K-2')], why: 'Coloring what a baker, a farmer and a builder need as tools and machines (an oven, a tractor, a drill) or skills (the steps to make bread, a good time to plant seeds, how to read a building plan), and writing how a tool helps the baker make more, describe examples of capital goods and human capital (D2.Eco.13, K-2).' } },
  { tp: '2:cost-to-make', code: 'D2.Eco.7.K-2', type: 'G2-628', skill: 'List and add what a lemonade stand must pay for before it sells, and find the lowest price per cup that brings in more than the costs',
    en: { rows: [T('D2.Eco.7.K-2')], why: 'Circling what a lemonade stand must buy before it can sell (and leaving out what it does not need), adding those costs, finding the lowest price per cup that brings in more than they must pay and writing what is left over at a chosen price describe examples of costs of production (D2.Eco.7, K-2).' } },
  { tp: '2:what-banks-do', code: 'D2.Eco.9.K-2', type: 'G2-629', skill: 'Match each picture to what a bank does: keeps money safe, pays savers interest, lends money',
    en: { rows: [T('D2.Eco.9.K-2')], why: 'Writing under each picture what the bank does there (keeps money safe, pays savers interest, a little extra such as $1 on $100 saved, lends money) and why a family might borrow and must pay it back describe the role of banks in an economy (D2.Eco.9, K-2).' } },
  { tp: '2:class-market', code: 'D2.Eco.5.K-2', type: 'G2-630', skill: 'Run a class market: set and write prices, buy and sell with coins, and record what I bought and how I paid',
    en: { rows: [T('D2.Eco.5.K-2')], why: 'Running a class market with written price tags, then recording what each shopper bought, its price and the coins paid (with practice trays that pay each price exactly) identify the prices of products in a local market (D2.Eco.5, K-2).' } },
];
// ---- everything is read and checked first
const out = [];
{
  const ids = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
  for (const p of POINTS) if (ids.has(p.tp)) throw new Error(p.tp + ' is a point already');
}
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '2', strand: SS, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.types[p.type]) throw new Error(p.type + ' is listed already'); j.types[p.type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points[p.tp]) throw new Error('en override ' + p.tp + ' exists'); j.points[p.tp] = Object.assign({}, p.en, { review: 'batch-s2 2026-11-25' }); }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-25 for the new Grade 2 social studies pages of the English year (Stage D-5 batch S2); no unit teaches it yet. Read it against the wording when the Grade 2 social studies units are placed' + (loc === 'en-tx' ? ' (TEKS Social Studies, Grade 2).' : ' and this language gets its pages.'), review: 'batch-s2 2026-11-25' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points with English C3 rows; files: ' + out.length);
