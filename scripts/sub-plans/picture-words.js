#!/usr/bin/env node
/**
 * Does a guest teacher script name only things that are on the page it is shown with? (Part 5.4, review of the week
 * days, 2026-11-22: almost every script error was one script shared by page variants it does not describe: a maze's
 * rabbit on the bee page, "popcorn" on a page that starts with bluebell, a fox and a panda in a supermarket.)
 *
 * A picture word is a noun of the picture library (REFERENCE TRANSLATIONS/image-vocabulary.js, English singular and
 * plural; an entry whose German form has no gender is no noun). Every picture word a week day's script names must be on
 * that block's page: one of its pictures (the page's manifest), a word it prints (its title, directions, word bank or
 * text; scripts/sub-plans/page-pictures.json), or a thing the type draws itself (DRAWN, read from the pages). Allowed
 * besides: GENERIC words (the classroom and the body) and a point's EXAMPLES (the fixed example words of its rule, said
 * or written on the board as examples, never as pictures of the page), each with its reason. A script that names the
 * things of one page is a `byPage` text of that page.
 *
 *   node scripts/sub-plans/picture-words.js      lists every finding of the week days (exit 1 when there is one)
 *   used by gate P4 (scripts/units/gates.js), with a poison in each direction
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');

// the classroom and the body: things the guest teacher points to or the children use
const GENERIC = {
  board: 'the classroom board', paper: 'a sheet of paper', pencil: 'the child\'s pencil', crayon: 'crayons', crayons: 'crayons', book: 'a book to read', books: 'books',
  chair: 'a chair of the classroom', desk: 'the child\'s desk', door: 'the classroom door', table: 'a table of the classroom', clock: 'the classroom clock', calendar: 'the classroom calendar', window: 'the classroom window',
  hand: 'the child\'s hand', hands: 'hands', finger: 'the child\'s finger', fingers: 'fingers', thumb: 'the child\'s thumb', chin: 'the hand under the chin', lips: 'lips', mouth: 'the mouth', teeth: 'teeth', tongue: 'tongue',
};
// nouns of the library that are also words of the directions themselves (what to draw, where to write, the parts of a
// page, people, actions): a script uses them about the page, never as one of its pictures
const DIRECTION_WORDS = new Set(['circle', 'circles', 'square', 'squares', 'rectangle', 'rectangles', 'triangle', 'triangles', 'letter', 'letters', 'box', 'boxes', 'card', 'cards', 'key', 'cross',
  'puzzle', 'puzzles', 'map', 'maps', 'family', 'families', 'line', 'lines', 'dot', 'dots', 'page', 'pages', 'picture', 'pictures', 'word', 'words', 'number', 'numbers', 'scale', 'scales', 'stage', 'stages',
  'tree', 'flag', 'shelf', 'ring', 'compass', 'cube', 'cubes', 'heart', 'mirror', 'house', 'head', 'slide', 'orange', 'watch', 'sink', 'can', 'water', 'plant', 'plants', 'leaf', 'leaves', 'boy', 'girl',
  'baby', 'babies', 'brother', 'brothers', 'sister', 'sisters', 'mom', 'dad', 'grandma', 'grandpa', 'aunt', 'uncle', 'cousin', 'child', 'children', 'teacher', 'class', 'school', 'face', 'faces', 'present',
  'read', 'reading', 'walk', 'walks', 'jump', 'jumps', 'eat', 'eats', 'run', 'runs', 'stand', 'stands', 'sit', 'sits', 'light', 'food', 'legs', 'feet', 'ears', 'hair', 'ice']);
// things a type draws itself (not library pictures, so not in the manifest), read from its pages
const DRAWN = {
  'G2-366': ['butterfly', 'caterpillar', 'frog', 'tadpole', 'ladybug', 'egg', 'eggs'],
  'G2-365': ['butterfly', 'caterpillar', 'egg', 'eggs'],
  'G2-368': ['sun', 'earth'],
  'K-338': ['snowflake', 'flower', 'sun', 'leaf'],
  'K-370': ['star'],
  'K-375': ['star'],
  // the Kindergarten social studies pages (Stage D-5 batch SK, 2026-11-24): drawn scenes, people and objects
  'K-712': ['hall', 'lockers', 'door', 'easel', 'rug', 'blocks', 'book', 'toy car'],
  'K-713': ['slide', 'crayons', 'teddy bear', 'tower', 'blocks', 'cookies', 'picnic', 'drawing', 'line'],
  'K-716': ['washboard', 'tub', 'candle', 'candle holder', 'horse', 'buggy', 'telephone', 'phone', 'cell phone', 'car'],
  'K-717': ['coin', 'hand', 'book', 'books'],
  'K-718': ['baker', 'hat', 'apron', 'rolling pin', 'builder', 'hard hat', 'hammer', 'barber', 'scissors', 'comb', 'barber pole', 'mail carrier', 'cap', 'bag', 'letters', 'letter', 'haircut', 'chair'],
  'K-719': ['stripes', 'stripe', 'stars', 'star', 'crayon', 'crayons'],
  'K-721': ['swing', 'swings', 'crackers', 'ball', 'game', 'play', 'crayons'],
  'K-724': ['beach', 'snow', 'snowy place', 'mountain', 'town', 'palm tree', 'sailboat'],
};
// the example words of a point's rule, each with its reason
const EXAMPLES = {
  '3:closed-open-syllables': { pen: 'pen | cil in the reference answers', tiger: 'ti | ger, the open example on the board', napkin: 'nap | kin, the closed example on the board', rabbit: 'rab | bit, the closed example of the rule', robot: 'ro | bot, the open example the page prints' },
  '2:compound-words': { sunflower: 'sun + flower, the example of a compound word', sun: 'sun + flower', flower: 'sun + flower' },
  '1:animal-classes-coverings': { plates: '"small, hard plates": what scales are', eggs: 'the question "Does it lay eggs?"', milk: 'the question "Does it feed its babies milk?"', feathers: 'the question "Fur, feathers, or scales?"' },
  '1:food-groups': { bread: 'a grain, the example of the group', pasta: 'a grain, the example of the group', eggs: 'a protein, the example of the group', fish: 'a protein, the example of the group' },
  '1:blends-start': { sled: 's and l in sled, the example of a blend' },
  '1:long-or-short-vowel': { bag: 'the short a in bag, the example of the rule', rake: 'the long a in rake, the example of the rule' },
  '1:coins': { play: '"play coins", only if the classroom has them' },
  '1:word-classes': { dog: '"like dog or school", the example of a noun' },
  '2:adjective-or-adverb': { dog: '"a brave dog", the example on the board', fox: '"a quick fox", the example on the board' },
  '2:mass-grams': { cup: 'the measuring cup the page shows' },
  '2:suffixes-ful-less-ly': { play: 'playful, the example on the board' },
  '2:vowel-teams-long-a-e-o': { rain: 'the example words on the board', play: 'the example words on the board', boat: 'the example words on the board' },
  '3:events-cause-effect': { rain: '"Because it rained", the example on the board' },
  '1:mazes': { fork: 'a fork in the road, where the path splits' },
  'K:mazes': { fork: 'a fork in the road, where the path splits' },
  '1:phoneme-boxes': { turtle: '"slowly, like a turtle"' },
  '2:cardinal-directions': { waffles: '"Never Eat Soggy Waffles", the saying for N, E, S, W', rose: 'the compass rose' },
  '2:plant-parts': { bees: '"the part bees visit", how the flower is described', flowers: 'the name of a plant part' },
  '2:sink-float': { ball: 'a ball of clay', bathtub: '"in a bathtub or a pool", where the child has seen things float', pool: '"in a bathtub or a pool"' },
  '2:words-in-real-life': { blanket: '"a soft blanket", the example of a describing word', soup: '"hot soup", the example of a describing word' },
  '2:life-cycles': { frog: '"a tadpole is a baby frog", why the tadpole does not belong' },
  'K:all-about-me-personal': { brush: '"I can brush my teeth", a sentence of the page read aloud' },
  'K:before-after-back': { rocket: '"a countdown, like for a rocket"' },
  'K:beginning-sounds': { 'salt shaker': '"salt (the salt shaker)": what the salt picture shows', soup: '"can (a soup can)": what the can picture shows' },
  'K:cvc-build': { bread: '"bun (the bread)": what the bun picture shows', sun: '"hot (the hot sun)": what the hot picture shows' },
  'K:rhyme': { cat: '"cat, hat" and "cat, dog", the pairs said aloud to show a rhyme', hat: 'the pair "cat, hat"', dog: 'the pair "cat, dog"', bread: '"bun (the bread)": what the bun picture shows', envelope: '"letter (the envelope)": what the letter picture shows' },
  'K:word-picture-match': { bread: '"bun (the bread)": what the bun picture shows', soup: '"can (a soup can)": what the can picture shows', sun: '"hot (the hot sun)": what the hot picture shows', cow: '"ox (it looks like a cow)": what the ox picture shows' },
  'K:fruit-vegetable': { kitchen: '"a vegetable in the kitchen"' },
  'K:seasons': { beach: '"to the beach or in the snow?", the question about clothes' },
};
let VOCAB = null;
function vocab() {
  if (VOCAB) return VOCAB;
  const src = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
  const keyForms = new Map(), formKeys = new Map();
  for (const m of src.matchAll(/^\s*"([^"]+)":\s*\{"en":\["([^"]+)","([^"]*)"\],"de":\["[^"]*","[^"]*"(,"[mfn]")?/gm)) {
    if (!m[4]) continue;
    const forms = [...new Set([m[2].toLowerCase(), m[3].toLowerCase()].filter(Boolean).map((f) => f.replace(/-/g, ' ')))];
    if (forms.some((f) => DIRECTION_WORDS.has(f))) continue;
    keyForms.set(m[1], forms);
    for (const f of forms) { if (!formKeys.has(f)) formKeys.set(f, new Set()); formKeys.get(f).add(m[1]); }
  }
  const all = [...formKeys.keys()].filter((f) => f.length >= 3 && /^[a-z][a-z ]*[a-z]$/.test(f));
  const re = new RegExp('(?<![a-z])(' + all.sort((a, b) => b.length - a.length).map((f) => f.replace(/ /g, '[- ]')).join('|') + ')(?![a-z])', 'g');
  VOCAB = { keyForms, formKeys, re };
  return VOCAB;
}
/** the picture words a text names (lowercased, in their library form) */
function named(text) {
  const { re } = vocab();
  return [...new Set([...String(text).toLowerCase().matchAll(re)].map((m) => m[1].replace(/-/g, ' ')))];
}
/** every form of the library entries a word belongs to (a page that prints "cups" shows a "cup") */
function formsOf(w) {
  const { keyForms, formKeys } = vocab();
  const out = new Set([w]);
  for (const k of formKeys.get(w) || []) for (const f of keyForms.get(k)) out.add(f);
  return out;
}
/** findings for the week days of a packs file: [{ pack, block, point, type, core, word }] */
function mismatches(packs, pagePictures) {
  const { keyForms } = vocab();
  const out = [];
  for (const p of packs.filter((x) => x.week)) for (const b of p.blocks) {
    const page = pagePictures[b.core];
    const at = { pack: p.id, block: b.key, point: b.point, type: b.type, core: b.core };
    if (!page) { out.push({ ...at, word: '(the page is not in page-pictures.json)' }); continue; }
    const shown = new Set();
    for (const w of [...page.words, ...(DRAWN[b.type] || [])]) for (const f of formsOf(w)) shown.add(f);
    for (const k of page.pictures) { shown.add(k.replace(/-/g, ' ')); for (const f of keyForms.get(k) || []) shown.add(f); }
    const ex = EXAMPLES[b.point] || {};
    for (const w of named([b.script.say, b.script.first, b.script.stuck].join(' '))) if (!shown.has(w) && !GENERIC[w] && !ex[w]) out.push({ ...at, word: w });
  }
  return out;
}
module.exports = { mismatches, named, GENERIC, EXAMPLES, DRAWN };

if (require.main === module) {
  const packs = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'sub-plans', 'packs.en.json'), 'utf8')).packs;
  const pics = JSON.parse(fs.readFileSync(path.join(__dirname, 'page-pictures.json'), 'utf8')).pages;
  const found = mismatches(packs, pics);
  const by = new Map();
  for (const f of found) { const k = f.point + ' ' + f.type + ' "' + f.word + '"'; if (!by.has(k)) by.set(k, []); by.get(k).push(f.pack); }
  for (const [k, v] of [...by].sort()) console.log(k + '  (' + v.join(' ') + ')');
  console.log(found.length + ' finding(s) in ' + by.size + ' script/word pair(s)');
  process.exit(found.length ? 1 : 0);
}
