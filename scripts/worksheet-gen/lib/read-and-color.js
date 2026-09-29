/**
 * read-and-color.js — Level Set 2026-09-30: the shared pieces of the NEW Read and Color variations (G1-409 Two
 * Sentences, G1-410 Read and Color the Picture, G1-411 Stop at the Number). The published G1-242 / G1-251 / G1-252
 * keep their own code (byte-identical); these helpers repeat its rules, never change them:
 *   BW themes only (the child colours line art) · countable nouns · no line-art look-alikes on one card ·
 *   sentences = the bank's `color` frames filled by pure substitution (digit n, the frame's noun form, the colour
 *   literal) — the code never inflects.
 */
'use strict';
const { entriesFor, fileUri, countable } = require('./b2-common.js');
const { SENTENCES } = require('../data/b2/sentences.js');
const { COLOR_WORDS } = require('../data/color-words.js');
const SB = require('./sentence-bank.js');

const COLOR_KEYS = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'brown', 'pink'];
const OPAQUE_ASSETS = new Set(['seal']);
// 2026-09-30 native audits (11 locales): a picture whose count is not what a child counts (two cherries on one stem; a
// kangaroo carrying a joey), a picture a child names otherwise (loader = "tractor"), a word unknown at Grade 1 (capybara,
// durian), an acronym the lowercasing breaks (ufo -> "ufos"); per locale: the alligator a de / nl child calls "Krokodil"
// + (second audit round) the apricot drawn like an apple / peach, the toy-set tank (a military word, not a toy word) and potted cactus
// + (third round, every picture of the published themes opened): the blackberry drawn like a raspberry, the orange like an
// apple, a train = engine + wagons and a bunch of grapes = many grapes (neither can be counted as one picture)
const AVOID = new Set(['capybara', 'cherry', 'cherries', 'kangaroo', 'loader', 'durian', 'ufo', 'apricot', 'tank', 'cactus', 'blackberry', 'blackberries', 'orange', 'train', 'grape', 'grapes',
  // fourth round 2026-09-30 - every picture of the 47 other BW themes opened by a Grade 1 panel
  // count: the drawing is not ONE thing a child counts as one
  'balloon', 'biscuit', 'waffle', 'puzzle', 'pea', 'pillow', 'rain', 'pyramid', 'mountain', 'dart',
  // name: a child names the drawing otherwise, or the drawing is unclear
  'panda', 'porcupine', 'island', 'cocktail', 'lounger', 'angel', 'lily', 'drumstick', 'boombox', 'saucepan', 'kettle',
  'blanket', 'sky', 'pickaxe', 'radish', 'turnip', 'onion', 'nest', 'diamond', 'cricket', 'scale', 'smartwatch', 'sweatshirt',
  'shirt', 'walrus', 'woodpecker', 'crow', 'pony', 'flipper', 'compass', 'projector', 'stamp', 'burrito', 'camp', 'stage',
  'yacht', 'museum', 'chicken',
  // name: a word a Grade 1 child does not know
  'chinchilla', 'chameleon', 'yak', 'antelope', 'vulture', 'vanity', 'meteor', 'sickle', 'trowel', 'rosette', 'kettlebell',
  'chandelier', 'colander', 'narwhal', 'stingray', 'shuttlecock', 'nightstand']);
// one DRAWING of a key is wrong while its other drawings are fine: theme -> keys
const AVOID_ASSET = { 'classroom bw': ['map'], 'classroom bw 2': ['map'], 'nature bw': ['flower'], 'food bw': ['turkey'], 'food bw 2': ['turkey'],
  'vehicles bw 2': ['crane'], 'objects bw': ['key'], 'valentine bw': ['heart', 'ring', 'key'], 'valentine bw 2': ['key'], 'animals bw 5': ['bear'],
  'farm animals bw': ['pigeon'],
  // landing panels round 3: the horned animals-bw 'bull' reads as a cow, the upright otter as a hamster
  'animals bw': ['bull', 'otter'],
  // the toys-bw duck is a rubber duck (it: a paperella, not an anatra)
  'toys bw': ['duck'] };
// es (Mexico): the boat drawings are ships, and bote there is a can / a rowing boat - a child says barco
const AVOID_BY_LOC = { de: ['alligator'], nl: ['alligator'], es: ['boat'],
  // pt: the toys guitar is an ELECTRIC guitar (guitarra); the vocab word violao is the acoustic one
  pt: ['guitar'] };
// frames that add a task the page never asks for (nl c5 "Omcirkel ... en kleur ze" - circle AND colour)
const FRAME_SKIP = { nl: ['c5'] };
/** The family's noun rule (published pages included): not avoided, and no noun that IS a colour word of the locale
 * ("Color 2 oranges orange"). */
function familyNoun(e, loc, words, theme) {
  const k = String(e.vocabKey).toLowerCase();
  if (AVOID.has(k) || (AVOID_BY_LOC[loc] || []).includes(k)) return false;
  if (theme && (AVOID_ASSET[String(theme).toLowerCase()] || []).includes(k)) return false;
  const cw = new Set(Object.values(words || {}).map((w) => String(w).toLocaleLowerCase(loc)));
  return !cw.has(String(e.singular).toLocaleLowerCase(loc)) && !cw.has(String(e.plural).toLocaleLowerCase(loc));
}
// a {name} frame ("Mia colors 4 apples.") DESCRIBES a character; the page asks the child to colour what the sentence TELLS
// them to (native panels 2026-09-30) - every sentence must be an instruction to the child
function familyFrame(f, loc) { return !(FRAME_SKIP[loc] || []).includes(f.id) && !/\{name\}/.test(f.text); }
// in LINE ART the round fruits are one silhouette; a young animal is its parent drawn smaller
const CONFUSABLES = [['apple', 'orange', 'peach', 'apricot', 'nectarine', 'plum', 'cherry', 'cherries', 'tomato', 'mandarin', 'tangerine', 'clementine', 'lime', 'grapefruit', 'pomegranate', 'coconut', 'melon', 'onion', 'watermelon'], ['lemon', 'mango', 'papaya', 'pear', 'fig', 'avocado'], ['blueberry', 'blueberries', 'grape', 'grapes', 'blackberry', 'blackberries', 'raspberry', 'raspberries'], ['cat', 'kitten'], ['bull', 'cow', 'calf'], ['dog', 'puppy'], ['duck', 'duckling'], ['hen', 'chicken', 'chick', 'rooster'], ['sheep', 'lamb'], ['horse', 'foal', 'pony'], ['goat', 'kid'], ['pig', 'piglet'],
  // 2026-09-30 native audit: line-art look-alikes a child cannot tell apart on one card
  ['swan', 'goose', 'duck'], ['capybara', 'otter', 'beaver', 'hamster', 'guinea-pig', 'marmot', 'groundhog'], ['bear', 'panda', 'polar-bear', 'teddy-bear', 'koala'],
  ['tractor', 'loader', 'monster-truck', 'garbage-truck', 'truck', 'bulldozer', 'excavator'], ['goat', 'reindeer', 'deer'],
  // fourth round (the 47 other BW themes): two keys a child cannot tell apart in line art, or one thing under two keys
  ['bull', 'yak', 'cow'], ['porcupine', 'hedgehog'], ['alpaca', 'llama', 'sheep', 'lamb'], ['eagle', 'vulture', 'crow'], ['bunny', 'rabbit'], ['hamburger', 'sandwich', 'cheeseburger'],
  ['muffin', 'cupcake'], ['chicken', 'turkey', 'peacock'], ['cup', 'teacup', 'mug'], ['hanger', 'towel'], ['window', 'curtain'], ['lamp', 'light'], ['hoodie', 'jacket', 'sweatshirt'],
  ['shoe', 'sneaker'], ['bolt', 'screw'], ['hammer', 'pickaxe'], ['radish', 'turnip', 'carrot', 'beet'], ['van', 'minibus', 'camper', 'bus'], ['sky', 'moon'], ['boat', 'sailboat', 'yacht'],
  ['dolphin', 'orca'], ['walrus', 'seal'], ['pot', 'saucepan'], ['pony', 'unicorn', 'horse', 'donkey'], ['chick', 'bird'], ['parasol', 'umbrella'], ['pen', 'pencil'], ['couch', 'sofa'],
  ['cabinet', 'wardrobe', 'dresser', 'nightstand'], ['fox', 'wolf'], ['camp', 'tent']];

// one fruit drawn once, whose plural is spelled like its singular (de 3 Ananas, fr 3 ananas, sv 3 päron, da/no 3 jordbær):
// the digit carries the number and the picture is ONE thing, so it counts. The b2 countable() rule stays for what is
// not one thing (dice, lego, chess).
const INVARIANT_COUNTABLE = new Set(['pineapple', 'pear', 'strawberry']);
function familyCountable(e) { return countable(e) || (!!(e && e.singular) && INVARIANT_COUNTABLE.has(String(e.vocabKey).toLowerCase())); }

// A sentence must never ask for a picture's own real colour ("Color 3 bananas yellow"): the picture would give the
// colour away and the child could colour it without reading the colour word (native landing panels 2026-09-30, 3 of 4).
const NATURAL_COLOR = {
  banana: ['yellow', 'green'], lemon: ['yellow', 'green'], pear: ['green', 'yellow'], strawberry: ['red', 'green'], watermelon: ['green', 'red'],
  apple: ['red', 'green', 'yellow'], pineapple: ['yellow', 'brown', 'green'], pomegranate: ['red'], plum: ['purple'], tomato: ['red', 'green'],
  carrot: ['orange'], pumpkin: ['orange'], corn: ['yellow'], broccoli: ['green'], cucumber: ['green'], lettuce: ['green'],
  eggplant: ['purple'], potato: ['brown'], mushroom: ['brown'], peach: ['orange', 'pink'], lime: ['green'], avocado: ['green'],
  kiwi: ['green', 'brown'], mango: ['yellow', 'orange', 'green'], coconut: ['brown'], blueberry: ['blue'], raspberry: ['red', 'pink'],
  frog: ['green'], pig: ['pink'], piglet: ['pink'], flamingo: ['pink'], duck: ['yellow'], duckling: ['yellow'], chick: ['yellow'],
  lion: ['yellow', 'brown', 'orange'], tiger: ['orange'], fox: ['orange', 'brown'], bear: ['brown'], 'teddy-bear': ['brown'],
  monkey: ['brown'], giraffe: ['yellow', 'brown'], crocodile: ['green'], alligator: ['green'], turtle: ['green'],
  ladybug: ['red'], bee: ['yellow'], sun: ['yellow'], leaf: ['green'], tree: ['green', 'brown'], grass: ['green'],
  'fire-truck': ['red'], 'school-bus': ['yellow'], taxi: ['yellow'], chocolate: ['brown'], cookie: ['brown'], horse: ['brown'],
  camel: ['brown', 'yellow'], squirrel: ['brown', 'orange', 'red'], beaver: ['brown'], owl: ['brown'], dog: ['brown'], rabbit: ['brown'],
  parrot: ['green', 'red', 'blue', 'yellow'], heart: ['red', 'pink'], rose: ['red', 'pink'], whale: ['blue'], dolphin: ['blue'],
  crab: ['red', 'orange'], lobster: ['red'], snail: ['brown'], goldfish: ['orange'], donkey: ['brown'], sloth: ['brown'],
  meerkat: ['brown', 'yellow'], llama: ['brown'], bison: ['brown'], rooster: ['red'], dinosaur: ['green'], cactus: ['green'],
};
function natural(key, color) { return (NATURAL_COLOR[String(key).toLowerCase()] || []).includes(color); }
/** Re-order colours (in place) so no key gets its real colour: colors[i] belongs to keys[i]; colours at index >= keys.length
 * are spare. Swaps first, then an unused colour of the pool. Deterministic (no rng), so the page's draw is unchanged.
 * Returns false when no such assignment is found. */
function avoidNatural(keys, colors, pool) {
  for (let i = 0; i < keys.length; i++) {
    if (!natural(keys[i], colors[i])) continue;
    let done = false;
    for (let j = 0; j < colors.length && !done; j++) {
      if (j === i || natural(keys[i], colors[j]) || (j < keys.length && natural(keys[j], colors[i]))) continue;
      [colors[i], colors[j]] = [colors[j], colors[i]]; done = true;
    }
    for (const c of pool || []) { if (done) break; if (!colors.includes(c) && !natural(keys[i], c)) { colors[i] = c; done = true; } }
    if (!done) return false;
  }
  return true;
}

// one THING under two keys, or a young animal and its parent: two targets of one page may never be such a pair, even on
// different cards ("Find 2 pigs" next to "Make 3 piglets" - landing panel 2026-09-30)
const SAME_THING = [['cat', 'kitten'], ['dog', 'puppy'], ['duck', 'duckling'], ['hen', 'chicken', 'chick', 'rooster'], ['sheep', 'lamb'],
  ['horse', 'foal', 'pony'], ['goat', 'kid'], ['pig', 'piglet'], ['bull', 'cow', 'calf'], ['bunny', 'rabbit'], ['couch', 'sofa'],
  ['cup', 'teacup'], ['shoe', 'sneaker'], ['boat', 'sailboat', 'yacht']];
function sameThing(a, b) { return a !== b && SAME_THING.some((g) => g.includes(a) && g.includes(b)); }

function confusable(a, b) { return a === b || CONFUSABLES.some((g) => g.includes(a) && g.includes(b)); }

/** The context of a page: bank, colour words, eligible nouns (throws = the theme / locale cannot build the page). */
function pageContext(id, theme, loc, need) {
  const bank = SENTENCES[loc];
  if (!bank) throw new Error(`${id}: no sentence bank for ${loc}`);
  if (!/\bbw\b/i.test(theme)) throw new Error(`${id}: theme ${theme} is not a BW theme (colour art cannot be coloured)`);
  const words = COLOR_WORDS[loc];
  if (!words) throw new Error(`${id}: no colour words for ${loc}`);
  const entries = entriesFor(theme, loc).filter((e) => familyCountable(e) && !OPAQUE_ASSETS.has(String(e.vocabKey).toLowerCase()));
  const frames = bank.frames.filter((f) => f.kind === 'color' && familyFrame(f, loc));
  if (!frames.length) throw new Error(`${id}: no color frames for ${loc}`);
  // only nouns every colour frame can name (fi: a partitive form exists)
  const fb = module.exports.formFallback(loc);
  // capybara: an unfamiliar word at Grade 1 and drawn like the otter / beaver (native panels 2026-09-30)
  const named = entries.filter((e) => familyNoun(e, loc, words, theme) && frames.every((f) => { try { return !!SB.resolveNoun(bank, f, e, loc, fb); } catch (err) { return false; } }));
  if (named.length < need) throw new Error(`${id}: theme ${theme}/${loc} has ${named.length} nameable nouns < ${need}`);
  return { bank, words, entries: named, frames };
}

/** Pick k nouns no two of which are look-alikes (null = cannot). */
function distinctNouns(rng, entries, k, avoid = []) {
  const out = [];
  for (const e of rng.shuffle(entries)) {
    if (out.length >= k) break;
    if ([...out, ...avoid].some((o) => confusable(o.vocabKey, e.vocabKey))) continue;
    out.push(e);
  }
  return out.length === k ? out : null;
}

/** One filled sentence + the literals the page stamps (the noun form through the frame; throws on a missing form). */
function sentence(ctx, frame, e, n, colorKey, name, loc) {
  // the colour frames carry the PLURAL ("Color 3 cats", fi partitive after a number): 1 would print "Color 1 dogs"
  if (!(n >= 2)) throw new Error(`read-and-color: n ${n} < 2 (the frames are plural-only)`);
  const nounText = SB.resolveNoun(ctx.bank, frame, e, loc, module.exports.formFallback(loc));
  const colorText = SB.colorInSentence(ctx.bank, ctx.words, colorKey);
  const text = SB.fillFrame(frame.text, { name, n, noun: nounText, color: colorText });
  if (/\{/.test(text)) throw new Error(`unfilled slot in "${text}"`);
  return { text, nounText, colorText };
}

function icon(theme, e, px, rng, target) {
  return `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-noun="${e.vocabKey}"${target ? ' data-lcs-target="1"' : ''} ` +
    `style="width:${px}px;height:${px}px;transform:rotate(${(rng.next() * 12 - 6).toFixed(1)}deg)">`;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function sentenceP(text, font, extra = '') {
  return `<p style="font-family:'Nunito';font-weight:800;font-size:${font}px;line-height:1.35;color:#3A3530;margin:0" data-lcs-sentence ${extra}>${esc(text)}</p>`;
}

module.exports = { SAME_THING, sameThing, AVOID, AVOID_ASSET, familyNoun, familyCountable, NATURAL_COLOR, natural, avoidNatural, familyFrame, COLOR_KEYS, CONFUSABLES, confusable, pageContext, distinctNouns, sentence, icon, sentenceP, esc };

/**
 * Finnish partitive fallback (Level Set 2026-09-30): data/b2/sentences.js has a partitive table for 161 nouns;
 * the instructions bank's objForms carries `part` for 523, IDENTICAL on all 127 shared keys (measured). Asked only
 * for a key the sentence table lacks.
 */
let _objForms = null;
function formFallback(loc) {
  return (form, key) => {
    if (loc !== 'fi' || form !== 'partitive') return null;
    if (!_objForms) _objForms = ((require('./b3-common.js').bank('instructions', 'fi')) || {}).objForms || {};
    const f = _objForms[key];
    return f && typeof f.part === 'string' && f.part ? f.part : null;
  };
}
module.exports.formFallback = formFallback;
