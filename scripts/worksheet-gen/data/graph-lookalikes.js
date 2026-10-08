/**
 * graph-lookalikes.js — the pictures that LOOK ALIKE at icon size, per theme, read by eye on contact sheets
 * (tools/contact-sheet.js, 2026-10-08, Graphs and Data). A graph's categories must be told apart at a glance: a tally
 * graph showed an apple, a fig and a pomegranate as three "different" categories. A graph never shows two pictures from
 * one group. Only the themes listed here are used on graph pages (they were read); the 8×8 Lab signatures
 * (data/picture-signatures.json) pointed at the candidate pairs, the eye decided.
 */
'use strict';
module.exports = {
  animals: [['jaguar', 'leopard'], ['cat', 'tiger'], ['antelope', 'reindeer'], ['seagull', 'swan'], ['dolphin', 'whale'], ['wolf', 'raccoon'], ['camel', 'horse', 'donkey']],
  fruits: [['apple', 'cherry', 'cranberry', 'pomegranate', 'plum', 'peach'], ['apricot', 'clementine', 'orange', 'nectarine', 'persimmon', 'mango'],
    ['raspberry', 'strawberry', 'dragonfruit'], ['blackberry', 'blueberry'], ['fig', 'plum'], ['lemon', 'lime']],
  vehicles: [['boat', 'ship', 'ferry', 'yacht', 'submarine', 'sailboat'], ['airplane', 'jet'], ['car', 'jeep', 'taxi', 'police_car'],
    ['dump_truck', 'truck', 'garbage_truck', 'cement_mixer', 'tow_truck', 'crane', 'fire_truck', 'monster_truck'], ['bus', 'school_bus', 'subway', 'train'],
    ['ambulance', 'mail_truck', 'van'], ['scooter', 'motorcycle'], ['bulldozer', 'excavator', 'forklift', 'tractor']],
  shapes: [['circle', 'oval', 'sphere'], ['square', 'diamond', 'rectangle'], ['cube', 'rectangular_box'], ['pentagon', 'hexagon', 'heptagon', 'octogon'],
    ['parallelogram', 'trapezoid', 'rectangle'], ['triangle', 'pyramid', 'cone']],
  toys: [['baby', 'baby_girl', 'girl', 'doll'], ['car', 'race_car', 'truck'], ['blocks', 'lego'], ['airplane', 'helicopter'], ['bucket', 'sandbox']],
  'farm animals': [['cat', 'cat_2'], ['chick', 'duck', 'duckling'], ['chicken', 'hen', 'goose', 'rooster'], ['horse', 'horse_2', 'foal', 'llama'],
    ['lamb', 'sheep', 'goat'], ['calf', 'cow'], ['bull', 'ox']],
  'ocean life': [['dolphin', 'narwhal', 'whale', 'orca'], ['seal', 'sea_lion', 'manatee'], ['octopus', 'squid'], ['angelfish', 'pufferfish'],
    ['fish', 'clownfish'], ['shark', 'tuna'], ['oyster', 'scallop'], ['coral', 'seaweed']],
  pets: [['gerbil', 'hamster', 'guinea_pig', 'mouse', 'chinchilla'], ['gecko', 'iguana', 'lizard'], ['fish', 'goldfish'], ['tortoise', 'turtle'], ['cockatiel', 'finch'], ['cat', 'ferret']],
  'zoo animals': [['cheetah', 'jaguar', 'leopard'], ['antelope', 'gazelle', 'reindeer'], ['chimpanzee', 'gorilla'], ['monkey', 'orangutan'], ['fox', 'hyena'],
    ['meerkat', 'otter'], ['bison', 'moose'], ['seal', 'sea_lion'], ['tiger', 'lion']],
  vegetables: [['beetroot', 'radish', 'turnip'], ['bell_pepper', 'tomato', 'chilli_pepper'], ['cucumber', 'green_beans'], ['celery', 'leek', 'asparagus'],
    ['garlic', 'onion'], ['cabbage', 'lettuce'], ['pumpkin', 'squash']],
  'desserts and sweets': [['apple_pie', 'pie', 'tart'], ['cupcake', 'muffin'], ['cake', 'pudding']],
  'kitchen tools': [['cup', 'mug', 'measuring_cup'], ['jug', 'pitcher'], ['pot', 'pan', 'saucepan'], ['butter_knife', 'knife'],
    ['baking_sheet', 'cookie_sheet', 'cake_pan', 'muffin_tin'], ['glass', 'jar'], ['teapot', 'kettle'], ['mixer', 'blender'], ['bowl', 'plate']],
  clothing: [['boots', 'rain_boots', 'snow_boots'], ['cap', 'hat'], ['coat', 'raincoat', 'jacket', 'cardigan', 'hoodie', 'sweatshirt', 'sweater'],
    ['jeans', 'pants', 'trousers', 'sweatpants', 'leggings'], ['shirt', 'uniform', 'blouse', 't-shirt', 'tank_top'], ['jumpsuit', 'overalls', 'snowsuit', 'pajamas'],
    ['flip-flops', 'slippers', 'shoe'], ['glove', 'mitten'], ['dress', 'skirt'], ['shorts', 'underpants'], ['apron', 'vest']],
  music: [['trumpet', 'trombone', 'saxophone'], ['keyboard', 'accordion', 'piano']],
  space: [['jupiter', 'mars', 'mercury', 'neptune', 'uranus', 'venus', 'planet', 'saturn'], ['asteroid', 'moon'], ['comet', 'meteor'], ['galaxy', 'sun']],
  'Things That Fly': [['airplane', 'jet'], ['bee', 'wasp', 'firefly', 'mosquito'], ['beetle', 'ladybug'], ['goose', 'swan', 'seagull', 'duck', 'pelican'],
    ['eagle', 'hawk'], ['bird', 'robin', 'blue_jay'], ['parrot', 'hawk']],
  classroom: [['book', 'binder', 'notebook', 'folder'], ['crayon', 'marker', 'pencil', 'pen'], ['desk', 'table'], ['teacher', 'librarian'], ['computer', 'tablet'], ['paper', 'notebook']],
  beach: [['bathing_suit', 'swimsuit'], ['beach_umbrella', 'umbrella', 'cabana'], ['hat', 'sun_hat'], ['shovel', 'spade'], ['flip-flops', 'sandals'],
    ['boat', 'sailboat'], ['dolphin', 'whale'], ['seagull', 'pelican']],
  breakfast: [['bagel', 'donut'], ['muffin', 'muffin_2'], ['cereal', 'oatmeal', 'porridge'], ['boiled_egg', 'fried_egg'], ['butter', 'cheese'], ['honey', 'jam'],
    ['juice', 'smoothie'], ['pancake', 'biscuit']],
  christmas: [['reindeer', 'rudolph'], ['garland', 'mistletoe']],
  // pictures that do not read as a THING when stamped in a row (a swing is an empty frame, a whiteboard a blank
  // rectangle, a plate a plain circle) — never a graph category
  // + classroom people (18 librarians in one class is a wrong fact) and mass nouns (paper, glue) — native review 2026-10-08
  _unclear: { toys: ['swing'], classroom: ['whiteboard', 'shelf', 'librarian', 'teacher', 'paper', 'glue'], 'kitchen tools': ['plate'] },
};
