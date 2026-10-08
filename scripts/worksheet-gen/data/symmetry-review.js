/**
 * symmetry-review.js — which library pictures a CHILD sees as mirror-symmetric (sym) or clearly lopsided (asym), read by
 * eye on contact sheets (Geometry Level Set 2026-10-08). Only pictures listed here are used by the mirror-symmetry
 * worksheets (G2-247 Mirror Line?, G2-248 Find the Mirror Picture).
 *
 * Why: the pages used to pick pictures by a 24×24 silhouette score, which disagrees with the eye — a blackberry scored
 * "not symmetric" (0.64) and looks symmetric, while things a child sees as lopsided (contents of a bookshelf, the hands
 * of a clock, a two-coloured sweater, a planet lit from one side) scored "symmetric". A page then had two or three
 * pictures that are "the same on both sides". The score now only pre-filters (sym ≥ 0.95, asym ≤ 0.6); a picture is
 * used only when its verdict is written here. Anything unclear is simply left out.
 */
'use strict';
module.exports = {
  animals: {
    sym: ['bat', 'sheep'],
    asym: ['antelope', 'camel', 'dog', 'dolphin', 'donkey', 'duck', 'fox', 'giraffe', 'iguana', 'horse', 'jaguar', 'moose', 'rabbit', 'raccoon', 'seagull', 'reindeer', 'swan', 'vulture', 'wolf', 'woodpecker', 'whale', 'zebra'],
  },
  fruits: {
    sym: ['blueberry', 'persimmon', 'pomegranate', 'watermelon'],
    asym: ['banana', 'clementine', 'cranberry'],
  },
  'around the house': {
    sym: ['curtains', 'couch', 'fireplace', 'fork', 'gate', 'lamp', 'lock', 'mirror', 'oven', 'plate', 'pot', 'sofa', 'vase', 'window', 'bowl'],
    asym: ['bed', 'broom', 'chair', 'comb', 'desk', 'dustpan', 'faucet', 'hammer', 'grill', 'hose', 'knife', 'mop', 'pan', 'pen', 'pencil', 'spoon', 'toilet', 'toothpaste'],
  },
  'At the Supermarket': {
    sym: ['bagel', 'blueberry', 'jam', 'juice', 'milk', 'muffin', 'orange', 'pasta', 'sauce', 'salt', 'water'],
    asym: ['bacon', 'banana', 'carrot', 'corn', 'cucumber', 'fish', 'grapes', 'melon', 'peas', 'pie', 'sausage', 'toothbrush'],
  },
  'kitchen tools': {
    sym: ['bottle', 'bowl', 'colander', 'jar', 'pan', 'plate', 'pot'],
    asym: ['jug', 'knife', 'ladle', 'pitcher', 'saucepan', 'spatula', 'tongs', 'whisk'],
  },
  classroom: {
    sym: ['shelf', 'whiteboard'],
    asym: ['chair', 'marker', 'pencil', 'ruler', 'tape'],
  },
  christmas: {
    sym: ['angel', 'gingerbread', 'nutcracker', 'present', 'star'],
    asym: ['lights', 'mistletoe', 'reindeer', 'rudolph', 'santa', 'stocking'],
  },
  clothing: {
    sym: ['beanie', 'blouse', 'dress', 'jeans', 'pants', 'shorts', 'underpants', 'vest', 'coat'],
    asym: ['boots', 'cap', 'flip-flops', 'mitten', 'shoe'],
  },
  easter: {
    sym: ['butterfly', 'egg', 'ribbon'],
    asym: ['candy', 'carrot', 'chocolate', 'daffodil', 'duckling', 'feather', 'lily', 'lamb'],
  },
  bakery: {
    sym: ['bagel', 'cupcake', 'muffin', 'pretzel', 'toast', 'waffle'],
    asym: ['baguette', 'cheesecake', 'croissant', 'eclair'],
  },
  breakfast: {
    sym: ['bagel', 'cereal', 'honey', 'juice', 'muffin', 'pancake', 'porridge', 'toast'],
    asym: ['bacon', 'cheese', 'croissant', 'smoothie'],
  },
  summer: {
    sym: ['bucket', 'butterfly', 'rainbow', 'seashell', 'shorts', 'sunglasses', 'surfboard'],
    asym: ['cap', 'dolphin', 'lemonade', 'starfish'],
  },
  accessories: {
    sym: ['badge', 'barrette', 'apron', 'headband', 'medal', 'sunglasses', 'suspenders', 'tiara'],
    asym: ['bracelet', 'sock', 'whistle'],
  },
  'forest creatures': {
    sym: ['butterfly', 'dragonfly', 'owl', 'spider', 'toad'],
    asym: ['ant', 'bat', 'badger', 'beaver', 'bee', 'cardinal', 'caterpillar', 'deer', 'eagle', 'earthworm', 'finch', 'firefly', 'fox', 'frog', 'grasshopper', 'hawk', 'lizard', 'moose', 'rabbit', 'raccoon', 'slug', 'turkey', 'turtle', 'weasel', 'wolf', 'woodpecker'],
  },
  'Things That Fly': {
    sym: ['bat', 'balloon', 'dragonfly', 'frisbee', 'owl'],
    asym: ['airplane', 'bee', 'bird', 'dragon', 'eagle', 'firefly', 'flamingo', 'goose', 'grasshopper', 'hawk', 'helicopter', 'hummingbird', 'jet', 'parrot', 'mosquito', 'pegasus', 'pigeon', 'pelican', 'robin', 'swan', 'seagull', 'toucan', 'wasp'],
  },
  music: {
    sym: ['drum', 'stage', 'violin'],
    asym: ['cymbals', 'flute', 'guitar', 'keyboard', 'harp', 'singer', 'saxophone', 'trumpet', 'trombone', 'xylophone'],
  },
  toys: {
    sym: ['shovel'],
    asym: ['airplane', 'bicycle', 'dinosaur', 'helicopter', 'rocket', 'scooter', 'slide'],
  },
  'insects and bugs': {
    sym: ['butterfly', 'dragonfly'],
    asym: ['bee', 'ant', 'caterpillar', 'cricket', 'millipede', 'mosquito', 'slug', 'spider', 'wasp', 'worm'],
  },
  camping: {
    sym: ['owl'],
    asym: ['deer', 'firefly', 'flashlight', 'grill', 'fox', 'kayak', 'oar'],
  },
};
