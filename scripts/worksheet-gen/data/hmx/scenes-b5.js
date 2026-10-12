/**
 * data/hmx/scenes-b5.js — Maze Puzzles Level Set scenes, batch 5: the LABEL faces — ABC capitals (K-409, 9), lowercase
 * (K-410, 9), numbers 1-20 (K-411, 9), skip counting by 5s (G2-392, 6), sums that make 10 (G1-427, 9), subtraction within
 * 20 (G1-428, 9) and the running total (G2-393, 6). FLAT scenes: the maze fills the frame; the stones carry the rule, so a
 * skin changes only the world and the characters (the published face's labels config stays).
 */
'use strict';
const { SET } = require('./settings.js');
const L = (face) => (set, v, flip, rest, o = {}) => ({ face, setting: set + v + (o.kind ? '-' + o.kind : ''), ...SET[set]({ v, flip, flat: true, ...o }), ...rest });
const caps = L('abc-capitals'), lower = L('abc-lowercase'), nums = L('numbers-20'), skip = L('skip-5'), ten = L('make-10'), sub = L('subtract-20'), run = L('running-total');
const h = (src, hh) => ({ src, h: hh });
const opt = (src, hh) => ({ src, h: hh, optional: true });

module.exports = [
  // ------------------------------------------------------------------ ABC CAPITALS (published slots BL → TC)
  caps('sky', 0, false, { id: 'hmx-caps-airplane', slots: ['BL', 'TC'], hero: h('vehicles/airplane', 56), goal: h('weather/rainbow', 76), cast: [opt('Things That Fly/seagull', 40), opt('Things That Fly/kite', 44), opt('weather/sun', 44)] }),
  caps('mountain', 1, false, { id: 'hmx-caps-helicopter', slots: ['BR', 'TC'], hero: h('vehicles/helicopter', 60), goal: h('camping/mountain', 70), cast: [opt('birds 2/eagle', 40), opt('tree/spruce', 70), opt('forest creatures/moose', 54)] }),
  caps('reef', 0, false, { id: 'hmx-caps-submarine', slots: ['BL', 'TC'], hero: h('vehicles/submarine', 46), goal: h('ocean life/whale', 66), cast: [opt('ocean life/octopus', 44), opt('ocean life/jellyfish', 44), opt('ocean life/starfish', 34)] }),
  caps('forest', 1, false, { id: 'hmx-caps-toytrain', slots: ['L', 'TC'], hero: h('toys/train', 60), goal: h('camping/camper', 64), cast: [opt('forest creatures/deer', 54), opt('tree/pine', 70), opt('forest creatures/squirrel', 40)] }),
  caps('park', 0, false, { id: 'hmx-caps-bicycle', slots: ['BR', 'TC'], hero: h('vehicles/bicycle', 52), goal: h('activities/playground', 76), cast: [opt('pets/dog', 40), opt('birds 2/pigeon', 34), opt('flowers/tulip', 40)] }),
  caps('prehistoric', 2, false, { id: 'hmx-caps-dragon', slots: ['BL', 'TC'], hero: h('Things That Fly/dragon', 74), goal: h('miscellaneous/bonfire', 66), cast: [opt('dinosaurs/stegosaurus', 44), opt('tree/palm', 74), opt('dinosaurs/brachiosaurus', 56)] }),
  caps('sky', 2, false, { id: 'hmx-caps-butterfly', slots: ['BR', 'TC'], hero: h('Things That Fly/butterfly', 58), goal: h('flowers/marigold', 70), cast: [opt('weather/cloud', 40), opt('Things That Fly/hot_air_balloon', 56), opt('Things That Fly/bird', 34)] }),
  caps('reef', 1, false, { id: 'hmx-caps-whale', slots: ['BL', 'TC'], hero: h('ocean life/whale', 56), goal: h('ocean life/oyster', 54), cast: [opt('ocean life/ray', 40), opt('ocean life/crab', 34), opt('ocean life/angelfish', 40)] }),
  caps('desert', 2, false, { id: 'hmx-caps-monster-truck', slots: ['BR', 'TC'], hero: h('vehicles/monster_truck', 56), goal: h('camping/rock', 50), cast: [opt('animals/camel', 60), opt('reptiles and Amphibians/gecko', 34), opt('birds 2/vulture', 44)] }),

  // ------------------------------------------------------------------ abc LOWERCASE (published slots TL → BR)
  lower('reef', 2, false, { id: 'hmx-lower-octopus', slots: ['TL', 'BR'], hero: h('ocean life/octopus', 62), goal: h('ocean life/seaweed', 80), cast: [opt('ocean life/clownfish', 40), opt('ocean life/shrimp', 36), opt('ocean life/scallop', 36)] }),
  lower('garden', 0, false, { id: 'hmx-lower-snail', slots: ['TR', 'BL'], hero: h('insects and bugs/snail', 54), goal: h('vegetables/lettuce', 60), cast: [opt('spring/worm', 34), opt('flowers/tulip', 44), opt('insects and bugs/ladybug', 30)] }),
  lower('pond', 0, true, { id: 'hmx-lower-flamingo', slots: ['TL', 'BR'], hero: h('birds 2/flamingo', 84), goal: h('flowers/hibiscus', 56), cast: [opt('forest creatures/frog', 36), opt('birds 2/heron', 54), opt('insects and bugs/dragonfly', 30)] }),
  lower('meadow', 2, false, { id: 'hmx-lower-stork', slots: ['TR', 'BL'], hero: h('birds 2/stork', 82), goal: h('miscellaneous/house', 84), cast: [opt('farm animals/sheep', 40), opt('flowers/cornflower', 40), opt('birds 2/sparrow', 30)] }),
  lower('jungle', 0, false, { id: 'hmx-lower-parrot', slots: ['TL', 'BR'], hero: h('pets/parrot', 62), goal: h('At the Supermarket/grapes', 54), cast: [opt('zoo animals/chimpanzee', 50), opt('flowers/orchid', 40), opt('reptiles and Amphibians/chameleon', 34)] }),
  lower('forest', 2, false, { id: 'hmx-lower-koala', slots: ['TR', 'BL'], hero: h('zoo animals/koala', 62), goal: h('tree/ash', 110), cast: [opt('forest creatures/owl', 40), opt('forest creatures/blue_jay', 36), opt('forest creatures/snail', 30)] }),
  lower('savanna', 1, false, { id: 'hmx-lower-kangaroo', slots: ['TL', 'BR'], hero: h('zoo animals/kangaroo', 76), goal: h('tree/sycamore', 110), cast: [opt('birds 2/ostrich', 54), opt('zoo animals/meerkat', 40), opt('camping/rock', 34)] }),
  lower('farmyard', 0, false, { id: 'hmx-lower-bull', slots: ['TR', 'BL'], hero: h('farm animals/bull', 66), goal: h('vegetables/turnip', 54), cast: [opt('farm animals/rooster', 40), opt('farm animals/duck', 36), opt('farm animals/cat', 34)] }),
  lower('water', 2, false, { id: 'hmx-lower-hippo', slots: ['TL', 'BR'], hero: h('zoo animals/hippopotamus', 62), goal: h('flowers/water_lily', 50), cast: [opt('birds 2/heron', 44), opt('birds 2/kingfisher', 34), opt('flowers/lotus', 40)] }, { kind: 'marsh' }),

  // ------------------------------------------------------------------ NUMBERS 1-20 (published slots L → TR)
  nums('meadow', 0, false, { id: 'hmx-nums-cow', slots: ['L', 'TR'], hero: h('farm animals/cow', 66), goal: h('flowers/clover', 62), cast: [opt('farm animals/sheep', 40), opt('insects and bugs/bee', 28), opt('flowers/buttercup', 40)] }),
  nums('savanna', 2, true, { id: 'hmx-nums-elephant', slots: ['R', 'TL'], hero: h('zoo animals/elephant', 74), goal: h('fruits/watermelon', 44), cast: [opt('zoo animals/zebra', 50), opt('birds 2/ostrich', 50), opt('tree/baobab', 80)] }),
  nums('desert', 1, false, { id: 'hmx-nums-camel', slots: ['L', 'TR'], hero: h('zoo animals/camel', 82), goal: h('tree/palm', 110), cast: [opt('reptiles and Amphibians/cobra', 36), opt('zoo animals/meerkat', 40), opt('birds 2/vulture', 40)] }),
  nums('forest', 0, false, { id: 'hmx-nums-deer', slots: ['R', 'TL'], hero: h('camping/deer', 76), goal: h('flowers/bluebell', 64), cast: [opt('forest creatures/rabbit', 40), opt('forest creatures/owl', 40), opt('tree/birch', 80)] }),
  nums('park', 1, false, { id: 'hmx-nums-dog', slots: ['L', 'TR'], hero: h('farm animals/dog', 66), goal: h('toys/ball', 52), cast: [opt('pets/cat', 40), opt('birds 2/pigeon', 34), opt('toys/kite', 40)] }),
  nums('arctic', 2, false, { id: 'hmx-nums-seal', slots: ['R', 'TL'], hero: h('zoo animals/seal', 62), goal: h('animals/fish', 46), cast: [opt('winter/walrus', 40), opt('winter/snowflake', 30), opt('ocean life/narwhal', 40)] }),
  nums('wheat', 2, false, { id: 'hmx-nums-excavator', slots: ['L', 'TR'], hero: h('vehicles/excavator', 56), goal: h('camping/rock', 46), cast: [opt('vehicles/dump_truck', 40), opt('vehicles/cement_mixer', 40), opt('camping/log', 30)] }),
  nums('town', 1, false, { id: 'hmx-nums-scooter', slots: ['R', 'TL'], hero: h('vehicles/scooter', 54), goal: h('miscellaneous/house', 80), cast: [opt('around the house/mailbox', 44), opt('vehicles/bicycle', 34), opt('pets/cat', 32)] }),
  nums('night', 2, false, { id: 'hmx-nums-owl', slots: ['L', 'TR'], hero: h('Things That Fly/owl', 60), goal: h('camping/moon', 64), cast: [opt('forest creatures/bat', 36), opt('forest creatures/firefly', 30), opt('forest creatures/raccoon', 40)] }),

  // ------------------------------------------------------------------ SKIP COUNTING BY 5s (published slots BC → TR)
  skip('sky', 0, true, { id: 'hmx-skip-jet', slots: ['BC', 'TR'], hero: h('vehicles/jet', 56), goal: h('weather/cloud', 60), cast: [opt('Things That Fly/seagull', 36), opt('Things That Fly/kite', 40), opt('Things That Fly/hot_air_balloon', 50)] }),
  skip('mountain', 2, false, { id: 'hmx-skip-eagle', slots: ['BC', 'TL'], hero: h('Things That Fly/eagle', 64), goal: h('camping/mountain', 66), cast: [opt('forest creatures/moose', 50), opt('tree/spruce', 66), opt('birds 2/falcon', 36)] }),
  skip('reef', 1, false, { id: 'hmx-skip-manatee', slots: ['BC', 'TR'], hero: h('ocean life/manatee', 52), goal: h('ocean life/coral', 76), cast: [opt('ocean life/sea_turtle', 40), opt('ocean life/angelfish', 36), opt('ocean life/seaweed', 50)] }),
  skip('jungle', 2, false, { id: 'hmx-skip-parrot', slots: ['BC', 'TL'], hero: h('Things That Fly/parrot', 60), goal: h('fruits/pineapple', 60), cast: [opt('zoo animals/sloth', 44), opt('birds 2/toucan', 38), opt('flowers/hibiscus', 36)] }),
  skip('snow', 2, false, { id: 'hmx-skip-sleigh', slots: ['BC', 'TR'], hero: h('winter/sleigh', 52), goal: h('christmas/tree', 84), cast: [opt('christmas/reindeer', 54), opt('christmas/present', 32), opt('winter/snowman', 50)] }),
  skip('park', 2, true, { id: 'hmx-skip-helicopter', slots: ['BC', 'TL'], hero: h('toys/helicopter', 54), goal: h('toys/blocks', 56), cast: [opt('toys/ball', 34), opt('toys/kite', 40), opt('toys/teddy_bear', 40)] }),

  // ------------------------------------------------------------------ SUMS THAT MAKE 10 (published slots BR → TL)
  ten('wheat', 0, false, { id: 'hmx-ten-bison', slots: ['BR', 'TL'], hero: h('zoo animals/bison', 72), goal: h('thanksgivinng/harvest', 70), cast: [opt('miscellaneous/crow', 34), opt('thanksgivinng/scarecrow', 70), opt('vehicles/tractor', 44)] }),
  ten('meadow', 1, false, { id: 'hmx-ten-sheep', slots: ['BL', 'TR'], hero: h('farm animals/sheep', 70), goal: h('spring/grass', 62), cast: [opt('farm animals/goose', 40), opt('flowers/dandelion', 40), opt('spring/butterfly', 30)] }),
  ten('forest', 0, true, { id: 'hmx-ten-moose', slots: ['BR', 'TL'], hero: h('forest creatures/moose', 86), goal: h('tree/birch', 110), cast: [opt('forest creatures/porcupine', 40), opt('forest creatures/woodpecker', 38), opt('forest creatures/frog', 30)] }),
  ten('jungle', 1, false, { id: 'hmx-ten-leopard', slots: ['BL', 'TR'], hero: h('zoo animals/leopard', 66), goal: h('tree/banyan', 110), cast: [opt('birds 2/macaw', 40), opt('reptiles and Amphibians/chameleon', 32), opt('zoo animals/gorilla', 50)] }),
  ten('water', 0, false, { id: 'hmx-ten-alligator', slots: ['BR', 'TL'], hero: h('reptiles and Amphibians/alligator', 50), goal: h('camping/log', 44), cast: [opt('birds 2/heron', 54), opt('forest creatures/dragonfly', 30), opt('forest creatures/frog', 30)] }, { kind: 'marsh' }),
  ten('orchard', 0, false, { id: 'hmx-ten-goat', slots: ['BL', 'TR'], hero: h('farm animals/goat', 72), goal: h('fruits/apple', 50), cast: [opt('tree/apple', 80), opt('birds 2/robin', 32), opt('insects and bugs/bee', 26)] }),
  ten('garden', 0, true, { id: 'hmx-ten-rabbit', slots: ['BR', 'TL'], hero: h('pets/rabbit', 66), goal: h('vegetables/lettuce', 56), cast: [opt('spring/watering_can', 38), opt('flowers/tulip', 40), opt('spring/worm', 30)] }),
  ten('prehistoric', 1, true, { id: 'hmx-ten-brachio', slots: ['BL', 'TR'], hero: h('dinosaurs/brachiosaurus', 90), goal: h('tree/sequoia', 110), cast: [opt('insects and bugs/dragonfly', 32), opt('insects and bugs/snail', 30)] }),
  ten('park', 0, true, { id: 'hmx-ten-peacock', slots: ['BR', 'TL'], hero: h('birds 2/peacock', 76), goal: h('flowers/peony', 60), cast: [opt('birds 2/pigeon', 32), opt('insects and bugs/butterfly', 32), opt('birds 2/sparrow', 30)] }),

  // ------------------------------------------------------------------ SUBTRACTION WITHIN 20 (published slots BC → TL)
  sub('snow', 0, false, { id: 'hmx-sub-snowman', slots: ['BC', 'TL'], hero: h('christmas/snowman', 72), goal: h('winter/hat', 50), cast: [opt('winter/sled', 34), opt('winter/mittens', 36), opt('winter/evergreen', 70)] }),
  sub('candy', 2, false, { id: 'hmx-sub-doll', slots: ['BC', 'TR'], hero: h('toys/doll', 72), goal: h('desserts and sweets/pudding', 54), cast: [opt('desserts and sweets/cupcake', 40), opt('desserts and sweets/lollipop', 44), opt('desserts and sweets/macaron', 32)] }),
  sub('night', 1, false, { id: 'hmx-sub-rudolph', slots: ['BC', 'TL'], hero: h('christmas/rudolph', 72), goal: h('christmas/bell', 50), cast: [opt('christmas/star', 34), opt('christmas/stocking', 40), opt('christmas/candle', 40)] }),
  sub('garden', 1, true, { id: 'hmx-sub-ladybug', slots: ['BC', 'TR'], hero: h('Things That Fly/ladybug', 52), goal: h('flowers/zinnia', 64), cast: [opt('insects and bugs/caterpillar', 30), opt('spring/bee', 34), opt('insects and bugs/snail', 30)] }),
  sub('mountain', 0, true, { id: 'hmx-sub-chinchilla', slots: ['BC', 'TL'], hero: h('pets/chinchilla', 62), goal: h('fruits/raspberry', 46), cast: [opt('flowers/bluebell', 40), opt('camping/rock', 34), opt('birds 2/eagle', 40)] }),
  sub('reef', 2, true, { id: 'hmx-sub-squid', slots: ['BC', 'TR'], hero: h('ocean life/squid', 62), goal: h('ocean life/oyster', 50), cast: [opt('ocean life/pufferfish', 38), opt('ocean life/shrimp', 34), opt('ocean life/seaweed', 50)] }),
  sub('farmyard', 1, false, { id: 'hmx-sub-cat', slots: ['BC', 'TL'], hero: h('farm animals/cat', 62), goal: h('breakfast/milk', 58), cast: [opt('farm animals/hen', 40), opt('farm animals/pig', 40), opt('thanksgivinng/haystack', 50)] }),
  sub('night', 0, true, { id: 'hmx-sub-owl', slots: ['BC', 'TR'], hero: h('birds 2/owl', 62), goal: h('tree/walnut', 110), cast: [opt('forest creatures/bat', 34), opt('forest creatures/mouse', 32), opt('camping/lantern', 40)] }),
  sub('desert', 0, true, { id: 'hmx-sub-bulldozer', slots: ['BC', 'TL'], hero: h('vehicles/bulldozer', 54), goal: h('summer/sand', 50), cast: [opt('vehicles/excavator', 40), opt('camping/rock', 32), opt('vehicles/dump_truck', 38)] }),

  // ------------------------------------------------------------------ RUNNING TOTAL WITHIN 100 (published slots R → L)
  run('town', 2, false, { id: 'hmx-run-firetruck', slots: ['R', 'L'], hero: h('vehicles/fire_truck', 56), goal: h('occupations/firefighter', 76), cast: [opt('around the house/fence', 30), opt('miscellaneous/house', 50), opt('pets/dog', 32)] }),
  run('farmyard', 2, true, { id: 'hmx-run-toytruck', slots: ['L', 'R'], hero: h('toys/truck', 54), goal: h('thanksgivinng/harvest', 60), cast: [opt('farm animals/cow', 40), opt('farm animals/goat', 40), opt('thanksgivinng/pumpkin', 34)] }),
  run('harbour', 2, false, { id: 'hmx-run-forklift', slots: ['R', 'L'], hero: h('vehicles/forklift', 56), goal: h('post office/package', 50), cast: [opt('vehicles/ship', 40), opt('beach/seagull', 32), opt('camping/rope', 30)] }),
  run('campsite', 1, false, { id: 'hmx-run-camper', slots: ['L', 'R'], hero: h('camping/camper', 56), goal: h('camping/campfire', 60), cast: [opt('camping/tent', 44), opt('camping/canoe', 30), opt('camping/deer', 50)] }),
  run('park', 1, true, { id: 'hmx-run-subway', slots: ['R', 'L'], hero: h('vehicles/subway', 50), goal: h('classroom/backpack', 54), cast: [opt('birds 2/pigeon', 32), opt('vehicles/bicycle', 32), opt('tree/elm', 70)] }),
  run('water', 2, false, { id: 'hmx-run-ferry', slots: ['L', 'R'], hero: h('vehicles/ferry', 46), goal: h('beach/island', 60), cast: [opt('beach/seagull', 32), opt('beach/lighthouse', 70), opt('vehicles/sailboat', 44)] }, { kind: 'sea' }),
];
