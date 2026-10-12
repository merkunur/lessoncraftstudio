#!/usr/bin/env node
/**
 * hmx-en-text.js — writes data/hmx/text/en.js: the ENGLISH words of every Maze Puzzles Level Set scene (2026-10-12),
 * from each face's published sentence patterns (data/b8/maze-puzzles.js EN_STRINGS) and a small per-scene table of what
 * is drawn (hero, goal, item, obstacles, cue, place). Every other locale is written by hand from this file and the
 * locale's own shipped face strings — never machine-translated.
 *   node tools/level-set/hmx-en-text.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { allSkins } = require('../../lib/hmx.js');

// per scene: [hero, goal, extra] — nouns as a K-2 child names the drawing (US English)
const N = {
  'hmx-meadow-lamb': ['lamb', 'haystack'], 'hmx-farm-pig': ['pig', 'mud puddle'], 'hmx-orchard-ox': ['ox', 'apple basket'],
  'hmx-garden-snail': ['snail', 'strawberry'], 'hmx-park-bike': ['boy on the bike', 'slide'], 'hmx-pond-duck': ['duck', 'bread'],
  'hmx-forest-squirrel': ['squirrel', 'pine cone'], 'hmx-autumn-mouse': ['mouse', 'pumpkin'], 'hmx-jungle-sloth': ['sloth', 'tree'],
  'hmx-savanna-zebra': ['zebra', 'elephant'], 'hmx-desert-camel': ['camel', 'palm tree'], 'hmx-beach-turtle': ['sea turtle', 'sea'],
  'hmx-snow-sledding': ['girl on the sled', 'cabin'], 'hmx-arctic-seal': ['seal', 'hole in the ice'], 'hmx-mountain-hike': ['hiker', 'tent'],
  'hmx-night-owl': ['owl', 'oak tree'], 'hmx-rain-mail': ['mail carrier', 'mailbox'], 'hmx-blossom-bunny': ['bunny', 'Easter basket'],
  'hmx-town-firefighter': ['firefighter', 'fire truck'], 'hmx-harbour-seagull': ['seagull', 'fish'], 'hmx-camp-raccoon': ['raccoon', 'cooler'],
  'hmx-dino-triceratops': ['triceratops', 'big tree'], 'hmx-wheat-farmer': ['farmer', 'tractor'], 'hmx-space-astronaut': ['astronaut', 'rocket'],
  'hmx-reef-pufferfish': ['pufferfish', 'shell'], 'hmx-candy-robot': ['robot', 'ice cream'], 'hmx-sunset-donkey': ['donkey', 'carrot'],
  'hmx-forest-beaver': ['beaver', 'log'], 'hmx-autumn-turkey': ['turkey', 'corn'], 'hmx-snow-skier': ['skier', 'snowman'],
  'hmx-pond-swan': ['swan', 'nest'], 'hmx-jungle-macaw': ['macaw', 'banana'], 'hmx-camp-night-fox': ['fox', 'lantern'],
  'hmx-first-hamster': ['hamster', 'apple'], 'hmx-first-kitten': ['kitten', 'milk'], 'hmx-first-crab': ['crab', 'beach ball'],
  'hmx-first-ladybug': ['ladybug', 'sunflower'], 'hmx-first-penguin': ['penguin', 'snowman'], 'hmx-first-turtle': ['turtle', 'flower'],
  'hmx-first-girl': ['girl', 'swing'], 'hmx-first-chick': ['chick', 'egg'], 'hmx-first-horse': ['horse', 'carrot'],
  'hmx-first-chicken': ['hen', 'corn'], 'hmx-first-dino-toy': ['toy dinosaur', 'cake'], 'hmx-first-bird': ['bird', 'birdhouse'],
  'hmx-big-monkey': ['monkey', 'banana'], 'hmx-big-rabbit': ['rabbit', 'cabbage'], 'hmx-big-seahorse': ['seahorse', 'seaweed'],
  'hmx-big-badger': ['badger', 'chestnut tree'], 'hmx-big-santa': ['Santa', 'sleigh'], 'hmx-big-llama': ['llama', 'cabin'],
  'hmx-big-rhino': ['rhino', 'hippo'], 'hmx-big-tortoise': ['tortoise', 'watermelon'], 'hmx-big-parasaur': ['dinosaur', 'big tree'],
  'hmx-big-bear': ['bear', 'honey'], 'hmx-big-seagull': ['seagull', 'boat'], 'hmx-big-garbage': ['garbage truck', 'trash can'],
  'hmx-river-canoe': ['canoe', 'tent', 'paddle'], 'hmx-river-kayak': ['kayak', 'cabin', 'paddle'], 'hmx-river-ship': ['ship', 'lighthouse', 'sail'],
  'hmx-river-sailboat': ['sailboat', 'island', 'sail'], 'hmx-river-duck': ['duck', 'beach ball', 'swim'], 'hmx-river-yacht': ['boat', 'beach hut', 'sail'],
  'hmx-river-beaver': ['beaver', 'birch tree', 'swim'], 'hmx-river-turtle': ['turtle', 'frog', 'swim'], 'hmx-river-puffin': ['puffin', 'igloo', 'swim'],
  'hmx-river-fishing-boat': ['boat', 'lifeguard tower', 'sail'], 'hmx-river-tug': ['boat', 'house', 'sail'], 'hmx-river-goose': ['goose', 'nest', 'swim'],
  'hmx-burrow-mouse': ['mouse', 'cheese'], 'hmx-burrow-earthworm': ['earthworm', 'leaf'], 'hmx-burrow-bunny': ['bunny', 'carrot'],
  'hmx-burrow-gopher': ['gopher', 'potato'], 'hmx-burrow-gerbil': ['gerbil', 'blueberry'], 'hmx-burrow-meerkat': ['meerkat', 'watermelon'],
  'hmx-burrow-ferret': ['ferret', 'ball'], 'hmx-burrow-chipmunk': ['chipmunk', 'acorn'], 'hmx-burrow-snowy-fox': ['fox', 'apple'],
  'hmx-town-ambulance': ['ambulance', 'doctor'], 'hmx-town-bus': ['bus', 'boy'], 'hmx-town-jeep': ['jeep', 'surfboard'],
  'hmx-town-motorcycle': ['motorcycle', 'garage'], 'hmx-town-van': ['van', 'package'], 'hmx-town-mixer': ['cement mixer', 'builder'],
  'hmx-town-truck': ['truck', 'forklift'], 'hmx-town-racecar': ['race car', 'mechanic'], 'hmx-town-tractor': ['tractor', 'haystack'],
  'hmx-babies-meadow': ['', '', 'in the Meadow'], 'hmx-babies-sunset': ['', '', 'at Sunset'], 'hmx-babies-snow': ['', '', 'in the Snow'],
  'hmx-babies-orchard': ['', '', 'in the Orchard'], 'hmx-babies-spring': ['', '', 'in Spring'], 'hmx-babies-wheat': ['', '', 'in the Wheat Field'],
  'hmx-strings-farm': ['farm animals', 'kite or balloon'], 'hmx-strings-beach': ['beach animals', 'kite or balloon'], 'hmx-strings-snow': ['polar animals', 'kite or balloon'],
  'hmx-strings-savanna': ['savanna animals', 'kite or balloon'], 'hmx-strings-pets': ['pets', 'kite or balloon'], 'hmx-strings-dinos': ['dinosaurs', 'kite or balloon'],
  'hmx-strings-forest': ['forest animals', 'kite or balloon'], 'hmx-strings-kids': ['children and toys', 'kite or balloon'], 'hmx-strings-jungle': ['jungle animals', 'kite or balloon'],
  'hmx-collect-acorns': ['squirrel', 'oak tree', ['acorn', 'acorns', 'An acorn']], 'hmx-collect-flowers': ['bee', 'honey', ['sunflower', 'sunflowers', 'A sunflower']],
  'hmx-collect-corn': ['hen', 'nest', ['ear of corn', 'ears of corn', 'An ear of corn']], 'hmx-collect-fish': ['penguin', 'hole in the ice', ['fish', 'fish', 'A fish']],
  'hmx-collect-shells': ['crab', 'sandcastle', ['shell', 'shells', 'A shell']], 'hmx-collect-strawberries': ['guinea pig', 'bowl', ['strawberry', 'strawberries', 'A strawberry']],
  'hmx-collect-stars': ['rocket', 'moon', ['star', 'stars', 'A star']], 'hmx-collect-bananas': ['lemur', 'palm tree', ['banana', 'bananas', 'A banana']],
  'hmx-collect-presents': ['elf', 'sack', ['present', 'presents', 'A present']], 'hmx-collect-eggs': ['little girl', 'basket', ['Easter egg', 'Easter eggs', 'An Easter egg']],
  'hmx-collect-apples': ['foal', 'apple tree', ['apple', 'apples', 'An apple']], 'hmx-collect-hibiscus': ['hummingbird', 'cherry tree', ['flower', 'flowers', 'A flower']],
  'hmx-avoid-duckling': ['duckling', 'puddle', ['fox', 'snake']], 'hmx-avoid-fish': ['fish', 'coral', ['shark', 'jellyfish']],
  'hmx-avoid-rocket': ['rocket', 'planet', ['asteroid', 'meteor']], 'hmx-avoid-snowboard': ['snowboarder', 'hot cocoa', ['rock', 'tree']],
  'hmx-avoid-butterfly': ['butterfly', 'rose', ['spider', 'wasp']], 'hmx-avoid-frog': ['frog', 'water lily', ['heron', 'alligator']],
  'hmx-avoid-rabbit': ['rabbit', 'radish', ['hawk', 'wolf']], 'hmx-avoid-toycar': ['toy car', 'garage', ['puddle', 'rock pile']],
  'hmx-avoid-raptor': ['little dinosaur', 'tree', ['T-rex', 'rock pile']], 'hmx-avoid-penguin': ['penguin', 'fish', ['orca', 'hole in the ice']],
  'hmx-avoid-ant': ['ant', 'cookie', ['puddle', 'spider']], 'hmx-avoid-gazelle': ['gazelle', 'baobab tree', ['leopard', 'hyena']],
  'hmx-hop-frog': ['frog', 'dragonfly', 'lily pads'], 'hmx-hop-penguin': ['penguin', 'fish', 'ice floes'], 'hmx-hop-caterpillar': ['caterpillar', 'cabbage', 'stepping stones'],
  'hmx-hop-astronaut': ['astronaut', 'Earth', 'space tiles'], 'hmx-hop-teddy': ['teddy bear', 'cupcake', 'candy tiles'], 'hmx-hop-fox': ['fox', 'pumpkin', 'autumn tiles'],
  'hmx-caps-airplane': ['airplane', 'rainbow'], 'hmx-caps-helicopter': ['helicopter', 'mountain'], 'hmx-caps-submarine': ['submarine', 'whale'],
  'hmx-caps-toytrain': ['toy train', 'camper'], 'hmx-caps-bicycle': ['bike', 'playground'], 'hmx-caps-dragon': ['dragon', 'campfire'],
  'hmx-caps-butterfly': ['butterfly', 'flower'], 'hmx-caps-whale': ['whale', 'oyster'], 'hmx-caps-monster-truck': ['monster truck', 'big rock'],
  'hmx-lower-octopus': ['octopus', 'seaweed'], 'hmx-lower-snail': ['snail', 'lettuce'], 'hmx-lower-flamingo': ['flamingo', 'flower'],
  'hmx-lower-stork': ['stork', 'house'], 'hmx-lower-parrot': ['parrot', 'grapes'], 'hmx-lower-koala': ['koala', 'tree'],
  'hmx-lower-kangaroo': ['kangaroo', 'tree'], 'hmx-lower-bull': ['bull', 'turnip'], 'hmx-lower-hippo': ['hippo', 'water lily'],
  'hmx-nums-cow': ['cow', 'clover'], 'hmx-nums-elephant': ['elephant', 'watermelon'], 'hmx-nums-camel': ['camel', 'palm tree'],
  'hmx-nums-deer': ['deer', 'bluebells'], 'hmx-nums-dog': ['dog', 'ball'], 'hmx-nums-seal': ['seal', 'fish'],
  'hmx-nums-excavator': ['digger', 'rock'], 'hmx-nums-scooter': ['scooter', 'house'], 'hmx-nums-owl': ['owl', 'moon'],
  'hmx-skip-jet': ['jet', 'cloud'], 'hmx-skip-eagle': ['eagle', 'mountain'], 'hmx-skip-manatee': ['manatee', 'coral'],
  'hmx-skip-parrot': ['parrot', 'pineapple'], 'hmx-skip-sleigh': ['sleigh', 'Christmas tree'], 'hmx-skip-helicopter': ['toy helicopter', 'blocks'],
  'hmx-ten-bison': ['bison', 'wheat'], 'hmx-ten-sheep': ['sheep', 'grass'], 'hmx-ten-moose': ['moose', 'birch tree'],
  'hmx-ten-leopard': ['leopard', 'big tree'], 'hmx-ten-alligator': ['alligator', 'log'], 'hmx-ten-goat': ['goat', 'apple'],
  'hmx-ten-rabbit': ['rabbit', 'lettuce'], 'hmx-ten-brachio': ['dinosaur', 'tall tree'], 'hmx-ten-peacock': ['peacock', 'flower'],
  'hmx-sub-snowman': ['snowman', 'hat'], 'hmx-sub-doll': ['doll', 'pudding'], 'hmx-sub-rudolph': ['reindeer', 'bell'],
  'hmx-sub-ladybug': ['ladybug', 'flower'], 'hmx-sub-chinchilla': ['chinchilla', 'raspberry'], 'hmx-sub-squid': ['squid', 'oyster'],
  'hmx-sub-cat': ['cat', 'milk'], 'hmx-sub-owl': ['owl', 'walnut tree'], 'hmx-sub-bulldozer': ['bulldozer', 'sand pile'],
  'hmx-run-firetruck': ['fire truck', 'firefighter'], 'hmx-run-toytruck': ['toy truck', 'wheat'], 'hmx-run-forklift': ['forklift', 'package'],
  'hmx-run-camper': ['camper', 'campfire'], 'hmx-run-subway': ['train', 'backpack'], 'hmx-run-ferry': ['ferry', 'island'],
  'hmx-sound-leopard': ['leopard', 'palm tree'], 'hmx-sound-tiger': ['tiger', 'banana tree'], 'hmx-sound-toucan': ['toucan', 'orange tree'],
  'hmx-sound-tractor': ['tractor', 'pumpkin'], 'hmx-sound-panda': ['panda', 'cherry blossom'], 
  'hmx-colour-pig': ['pig', 'barn', 'Farm'], 'hmx-colour-horse': ['horse', 'hay', 'Field'], 'hmx-colour-monkey': ['monkey', 'tree', 'Jungle'],
  'hmx-colour-penguin': ['penguin', 'fish', 'Ice'], 'hmx-colour-hedgehog': ['hedgehog', 'mushroom', 'Meadow'], 'hmx-colour-turtle': ['turtle', 'island', 'Beach'],
  'hmx-colour-squirrel': ['squirrel', 'tree', 'Forest'], 'hmx-colour-camel': ['camel', 'pyramid', 'Desert'], 'hmx-colour-frog': ['frog', 'umbrella', 'Rainy Day'],
  'hmx-colour-octopus': ['octopus', 'starfish', 'Sea'], 'hmx-colour-bee': ['bee', 'flower', 'Garden'], 'hmx-colour-dog': ['dog', 'house', 'Yard'],
  'hmx-colour-rocket': ['rocket', 'Earth', 'Space Picture'], 'hmx-colour-ambulance': ['ambulance', 'house', 'Town'], 'hmx-colour-snowman': ['snowman', 'Christmas tree', 'Winter Picture'],
  'hmx-colour-tractor': ['tractor', 'vegetables', 'Harvest'],
};

const T = (s) => s.replace(/(^|[\s-])([a-z])/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(On|The|In|At|And|To|Of|Or)\b(?!$)/g, (m) => m.toLowerCase()).replace(/^./, (c) => c.toUpperCase());
const the = (n) => (/^[A-Z]/.test(n) && !/^(Easter|Christmas)/.test(n) ? n : 'the ' + n);
const The = (n) => the(n).replace(/(^|\s)([a-z])/g, (m, a, b) => a + b.toUpperCase());
/** US title case: every word capitalised but the small words (never the first word, never after a colon) */
const SMALL = new Set(['the', 'and', 'to', 'of', 'on', 'in', 'at', 'or', 'a', 'an', 'for', 'from', 'with', 'by']);
const titleCase = (str) => str.split(' ').map((w, i, a) => { const lw = w.toLowerCase(); if (i > 0 && !/:$/.test(a[i - 1]) && SMALL.has(lw)) return lw; return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');

function textFor(sk) {
  const [hero, goal, x] = N[sk.id] || [];
  if (hero === undefined) throw new Error('hmx-en-text: no nouns for ' + sk.id);
  const f = sk.face;
  switch (f) {
    case 'base': return { title: `Picture Maze: Help ${The(hero)} Reach ${The(goal)}`, printTitle: `Help ${The(hero)} Reach ${The(goal)}`, instruction: `Help ${the(hero)} get to ${the(goal)}. Draw a line along the way.`, tap: `Start at the green circle with the arrow. Drag along the path to ${the(goal)}.` };
    case 'first-maze': return { title: `My First Maze for Preschool: ${The(hero)} and ${The(goal)}`, printTitle: `Help ${The(hero)} Get to ${The(goal)}`, instruction: `Help ${the(hero)} get to ${the(goal)}. Draw a line along the wide road and stay between its edges.`, tap: `Start at the green circle. Drag along the wide road to ${the(goal)}.` };
    case 'big-maze': return { title: `Big Picture Maze for 1st Grade: ${The(hero)} and ${The(goal)}`, printTitle: `Help ${The(hero)} Find ${The(goal)}`, instruction: `Look at the whole maze first. Then draw ${the(hero)}'s way to ${the(goal)}.`, tap: `Look first, then drag from the green circle to ${the(goal)}. If a path stops, go back.` };
    case 'river': {
      const v = x === 'sail' ? 'Sail' : x === 'paddle' ? 'Paddle' : 'Swim';
      return { title: `River Maze: ${v === 'Swim' ? 'Help ' + The(hero) + ' Swim' : v + ' ' + The(hero)} to ${The(goal)}`, printTitle: v === 'Swim' ? `Help ${The(hero)} Swim to ${The(goal)}` : `${v} ${The(hero)} to ${The(goal)}`, instruction: `${v === 'Swim' ? 'Help ' + the(hero) + ' swim' : v + ' ' + the(hero)} along the water to ${the(goal)}. Draw a line through the water.`, tap: `Start at the green circle. Drag through the water to ${the(goal)}.` };
    }
    case 'burrow': return { title: `Underground Maze: ${The(hero)}'s Tunnels`, printTitle: `Help ${The(hero)} Reach ${The(goal)}`, instruction: `Help ${the(hero)} go down and up through the tunnels to ${the(goal)}. Draw a line along the way.`, tap: `Start at the green circle. Drag through the tunnels to ${the(goal)}.` };
    case 'shortest-way': return { title: `Town Maze: ${The(hero)} and the Shortest Way`, printTitle: `The Shortest Way to ${The(goal)}`, instruction: `Many streets lead to ${the(goal)}. Draw the shortest way for ${the(hero)} and write how many street pieces it takes.`, tap: `Drag the shortest way from the green circle to ${the(goal)}.` };
    case 'babies-mothers': return { title: `Babies and Mothers Maze ${x}`, printTitle: 'Help Each Baby Find Its Mother', instruction: 'Help each baby animal find its own mother. Draw a line from every baby to its mother.', tap: 'Drag from each baby to its own mother.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'kite' : kites === 0 ? 'balloon' : 'kite or balloon';
      const where = { farm: 'on the Farm', beach: 'at the Beach', snow: 'in the Snow', savanna: 'on the Savanna', pets: 'in the Park', dinos: 'with the Dinosaurs', forest: 'in the Forest', kids: 'at the Playground', jungle: 'in the Jungle' }[sk.id.replace('hmx-strings-', '')];
      return { title: `Tangled Lines ${where}: Whose ${what === 'kite or balloon' ? 'Kite or Balloon' : T(what)} Is It?`, printTitle: `Whose ${what === 'kite or balloon' ? 'Kite or Balloon' : T(what)} Is It?`, instruction: `Follow each string from an animal to its ${what}. Write the animal's number in the box above it.`.replace('an animal', /kids/.test(sk.id) ? 'a child or toy' : 'an animal').replace("Write the animal's number", /kids/.test(sk.id) ? 'Write the number from its circle' : "Write the animal's number"), tap: `Drag along each string from ${/kids/.test(sk.id) ? 'each child or toy' : 'the animal'} to its ${what}.` };
    }
    case 'collect': { const [one, many, cap] = x; return { title: `Collect-the-${T(many).replace(/ /g, '-')} Maze: ${The(hero)}`, printTitle: `Help ${The(hero)} Pick Up Every ${T(one)}`, instruction: `Help ${the(hero)} get to ${the(goal)} and pick up every ${one}, without using a path twice. Tick a circle for each ${one}.`, tap: `Drag from the green circle to ${the(goal)}. Pass every ${one} on the way.`, missed: `${cap} was missed. Look at the red ring.` }; }
    case 'avoid': { const [a, b] = x; const ar = (w) => (/^[aeiou]/i.test(w) && !/^T\. /.test(w) ? 'an ' : 'a ') + w; return { title: `Avoid the ${T(a)}: ${The(hero)} Maze`.replace('Avoid the T. rex', 'Avoid the T. rex'), printTitle: `Bring ${The(hero)} to ${The(goal)} Safely`, instruction: `Help ${the(hero)} get to ${the(goal)}. Do not take a road with ${ar(a)} or ${ar(b)}.`, tap: `Drag from the green circle to ${the(goal)}. Do not take a road with ${ar(a)} or ${ar(b)}.` }; }
    case 'letter-hop': return { title: `ABC Order Letter Hop: ${The(hero)} on the ${T(x)}`, printTitle: `Hop Across the ${T(x)} in ABC Order`, instruction: 'Start in the cell the arrow points to. Color each next letter of the alphabet in a touching cell, all the way to {LAST}.', tap: 'Start at the green circle. Drag to the next letter of the alphabet, cell by cell.' };
    case 'abc-capitals': return { title: titleCase(`Alphabet Maze: ${The(hero)} and ${The(goal)}`).replace('Alphabet Maze:', 'Alphabet Maze A to Z:'), printTitle: titleCase(`Take ${The(hero)} to ${The(goal)}`) + ' from A to Z', instruction: `Help ${the(hero)} get to ${the(goal)}. At every fork, go to the stone with the next letter of the alphabet.`, tap: 'Start at the green circle. At every fork, drag to the next letter.' };
    case 'abc-lowercase': return { title: 'Lowercase Letter Maze a to z: ' + titleCase(The(hero)), printTitle: titleCase(`Take ${The(hero)} to ${The(goal)}`) + ' from a to z', instruction: `Help ${the(hero)} get to ${the(goal)}. At every fork, go to the stone with the next small letter.`, tap: 'Start at the green circle. At every fork, drag to the next small letter.' };
    case 'numbers-20': return { title: `Number Maze 1 to 20: ${The(hero)} and ${The(goal)}`, printTitle: `Count Along with ${The(hero)} to ${The(goal)}`, instruction: `Help ${the(hero)} get to ${the(goal)}. At every fork, go to the next number from 1 to 20.`, tap: 'Start at the green circle. At every fork, drag to the next number.' };
    case 'skip-5': return { title: `Skip Counting Maze by 5s: ${The(hero)} and ${The(goal)}`, printTitle: `Count by 5s to ${The(goal)}`, instruction: `Help ${the(hero)} get to ${the(goal)}. Count by 5s from stone to stone, all the way to 100.`, tap: 'Start at the green circle. Drag from stone to stone, counting by 5s.' };
    case 'make-10': return { title: `Addition Maze for 1st Grade: ${The(hero)}'s Sums That Make 10`, printTitle: 'Step on the Sums That Make 10', instruction: `Help ${the(hero)} get to ${the(goal)}. Step only on the stones whose sum is 10.`, tap: 'Start at the green circle. Drag only over the stones whose sum is 10.' };
    case 'subtract-20': return { title: `Subtraction Maze Within 20: ${The(hero)} and ${The(goal)}`, printTitle: `Help ${The(hero)} Reach ${The(goal)}`, instruction: `Look at the number by ${the(hero)}. Step only on the stones whose answer is that number.`, tap: `Start at the green circle. Drag only over the stones whose answer is ${the(hero)}'s number.` };
    case 'running-total': return { title: `Math Maze for 2nd Grade: ${The(hero)} Within 100`, printTitle: `Add and Subtract on the Way to ${The(goal)}`, instruction: `Start with ${the(hero)}'s number and, on your road, write the new number in each sign's box. Find the road that ends on ${the(goal)}'s number.`, tap: `Start at the green circle. Drag along the road that ends on ${the(goal)}'s number.` };
    case 'first-sound': return { title: `Beginning Sounds Maze: Pictures That Start Like ${T(hero)}`, printTitle: `Pictures That Start Like ${T(hero)}`, instruction: `Say each picture's name. Step only on pictures that start with the same sound as ${hero}.`, tap: `Start at the green circle. Drag only over pictures that start like ${hero}.` };
    case 'maze-colouring': return { title: `Maze Coloring Page: ${The(hero)} and ${The(goal)}`, printTitle: `Solve the Maze, Then Color the ${x}`, instruction: `Draw ${the(hero)}'s way to ${the(goal)} and color the whole road. Then color the ${x.toLowerCase().replace(' picture', '')} picture.`, tap: `Start at the green circle. Drag along the path to ${the(goal)}.` };
    default: throw new Error('hmx-en-text: no pattern for face ' + f);
  }
}

if (require.main !== module) { module.exports = { N }; return; }
const out = {}; const errs = [];
for (const sk of allSkins()) {
  const t = textFor(sk);
  // the alphabet faces print their letters as written (A to Z / a to z); everything else in US title case
  if (!/^abc-/.test(sk.face)) { t.title = titleCase(t.title); t.printTitle = titleCase(t.printTitle); }
  out[sk.id] = t;
  if (t.title.length > 70) errs.push(sk.id + ': title ' + t.title.length + ' > 70: ' + t.title);
  if (t.instruction.length > 150) errs.push(sk.id + ': instruction ' + t.instruction.length);
}
const body = Object.entries(out).map(([k, v]) => '  ' + JSON.stringify(k) + ': ' + JSON.stringify(v) + ',').join('\n');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'hmx', 'text', 'en.js'),
  "/** data/hmx/text/en.js — GENERATED by tools/level-set/hmx-en-text.js (edit the table there). The English words of every Maze Puzzles Level Set scene. */\n'use strict';\nmodule.exports = {\n" + body + '\n};\n');
errs.forEach((e) => console.error(' - ' + e));
console.log(Object.keys(out).length + ' scenes → data/hmx/text/en.js' + (errs.length ? ' (' + errs.length + ' errors)' : ''));
process.exit(errs.length ? 1 : 0);
