/**
 * data/hm/sound-review.js — the HUMAN READ of the b8 first-sound cards (F18), 2026-10-11.
 *
 * Every /l/ card picture of every locale was OPENED on one contact sheet (64 pictures) and judged by one question:
 * would a five-year-old NAME this picture with the L word? A card the child names differently teaches the wrong
 * sound, so it is refused here (never renamed; the vocabulary is not edited). Applied by tools/hm-sound-pools.js.
 */
'use strict';
const REFUSED_CARDS = new Map(Object.entries({
  'zoo animals/lion': 'the hero: never a card',
  'beach/lifeguard': 'a person; named "girl" / "lady"',
  'camping/lake': 'a landscape; named "mountains" / "water"',
  'flowers/lavender': 'every flower is "flower" at five',
  'flowers/lilac': 'every flower is "flower" at five',
  'flowers/lily': 'every flower is "flower" at five',
  'flowers/lotus': 'every flower is "flower" at five',
  'flowers/phlox': 'every flower is "flower" at five',
  'vegetables/leek': 'not K vocabulary',
  'zoo animals/lemur': 'not K vocabulary',
  'animals/iguana': 'reads as a lizard / gecko',
  'At the Supermarket/soda': 'a cola bottle: named "cola" / "drink"',
  'At the Supermarket/lettuce': 'reads as a cabbage',
  'camping/campfire': 'named "fire" (Feuer / eld / bål), not the L compound',
  'winter/fireplace': 'not a picture a K child names',
  'zoo animals/otter': 'not K vocabulary',
  'ocean life/manatee': 'not K vocabulary',
  'pets/tortoise': 'named by the short word (Schildpad / sköldpadda), not the L compound',
  'birds 2/puffin': 'not K vocabulary',
  'camping/vest': 'not salient at five',
  'forest creatures/weasel': 'not K vocabulary',
  'spring/puddle': 'a blue blob: not nameable',
  'winter/skating': 'an activity, not a thing',
  'winter/snowboarding': 'an activity, not a thing',
}));
module.exports = { REFUSED_CARDS };
