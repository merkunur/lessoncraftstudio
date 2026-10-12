/**
 * data/hmx/sound-review.js — the HUMAN READ of the Maze Puzzles Level Set first-sound cards (/t/ and /p/), 2026-10-12.
 *
 * Every candidate card picture of every locale was OPENED on a contact sheet (59 /t/ + 114 /p/ pictures) and judged by
 * one question: would a five- or six-year-old NAME this picture with that word? A card a child names differently teaches
 * the wrong sound and is refused (never renamed). REFUSED_CARDS applies in every locale, REFUSED_BY_LOC in one.
 * Applied by tools/level-set/hmx-sound-pools.js (on top of data/hm/sound-review.js).
 */
'use strict';
const REFUSED_CARDS = new Map(Object.entries({
  'bakery/tart': 'a slice of cake: named "cake"',
  'beach/pelican': 'no throat pouch: the drawing reads as a stork (visual review 2026-10-12)',
  'birds/pelican': 'no throat pouch: the drawing reads as a stork (visual review 2026-10-12)',
  'forest creatures/porcupine': 'reads as a dark hedgehog: named "hedgehog" (visual review 2026-10-12)',
  'flowers/trillium': 'every flower is "flower" at five',
  'flowers/peony': 'every flower is "flower" at five',
  'flowers/petunia': 'every flower is "flower" at five',
  'music/trombone': 'named "trumpet"',
  'music/keyboard': 'named "piano"',
  'music/cymbals': 'a drum kit: named "drums"',
  'music/stage': 'not a thing a child names',
  'ocean life/tuna': 'named "fish"',
  'ocean life/pufferfish': 'named "fish"',
  'vehicles/ferry': 'named "boat" / "ship"',
  'vehicles/scooter': 'a MOTOR scooter: every kick-scooter word (trottinette, patinete, potkulauta) is wrong',
  'beach/snorkel': 'named "mask" / "goggles"',
  'spring/garden': 'a vignette: named "flowers"',
  'summer/beach': 'a vignette: named "sea" / "sun"',
  'fruits/grapefruit': 'read as an orange',
  'fruits/papaya': 'not K vocabulary',
  'fruits/persimmon': 'not K vocabulary; reads as a tomato',
  'fruits/peach': 'reads as an apple',
  'fruits/pomegranate': 'reads as an apple',
  'At the Supermarket/pasta': 'a packet: not nameable',
  'At the Supermarket/pretzels': 'the same food as bakery/pretzel (two cards of one thing)',
  'vegetables/parsnip': 'not K vocabulary; reads as a carrot',
  'vegetables/asparagus': 'not K vocabulary',
  'birds 2/magpie': 'named "bird"',
  'birds 2/sparrow': 'named "bird"',
  'birds 2/swallow': 'named "bird"',
  'birds 2/cardinal': 'named "bird"',
  'winter/earmuffs': 'not K vocabulary',
  'ocean life/scallop': 'named "shell"',
  'camping/grill': 'es-MX: "asador", not "parrilla"; named "barbecue" elsewhere',
  // the native + pedagogy review, 2026-10-12: names a child gives these pictures, not the dictionary word
  'birds 2/macaw': 'named "parrot" (papegaai / perroquet / pappagallo / papukaija, all /p/)',
  'pets/cockatiel': 'named "parrot" / "budgie"',
  'farm animals/foal': 'named "horse" (cheval / caballo / cavalinho / cavallino)',
  'birds 2/robin': 'named "bird"',
  'birds 2/dove': 'named "bird"',
}));
const REFUSED_BY_LOC = {
  es: ['forest creatures/badger', 'At the Supermarket/tomato', 'At the Supermarket/muffin'],   // MX: jitomate; panqué / panquecito (/p/)
  pt: ['camping/log', 'animals/tiger', 'winter/icicle'],   // BR "tigre" starts [tʃ]; sincelo is European PT
  fr: ['zoo animals/armadillo', 'farm animals/chicken', 'breakfast/porridge', 'desserts and sweets/pudding'],
  it: ['winter/walrus', 'animals/raccoon', 'breakfast/porridge', 'forest creatures/porcupine'],   // porcospino / riccio
  en: ['breakfast/porridge'],
  de: ['farm animals/turkey'],   // Pute (/p/) as often as Truthahn
  nl: ['breakfast/oatmeal'],   // pap, which is on the /p/ route
  fi: ['vehicles/sailboat', 'vehicles/van', 'camping/deer'],   // vene, auto, kauris
};
module.exports = { REFUSED_CARDS, REFUSED_BY_LOC };
