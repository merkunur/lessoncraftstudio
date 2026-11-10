/**
 * data/fl/crayons.js — the crayons of the Color by Number pictures made from the library (docs/makers/FLAGSHIP.md): what a
 * child expects each thing to be. MAIN lists the nouns of each main colour; the other parts follow ACCENT[main]. A noun
 * not listed takes its group's colours (GROUP). Colours: lib/cbn-render.js PALETTE.
 */
'use strict';
const MAIN = {
  green: 'plant potted_plant house_plant frog crocodile alligator turtle gecko chameleon cactus leaf fern pear lettuce broccoli cucumber peas pea spinach snake dinosaur stegosaurus brachiosaurus diplodocus triceratops t_rex plesiosaur grasshopper praying_mantis caterpillar sea_turtle avocado kiwi lime grapes tree pine_tree christmas_tree palm_tree apple_tree tent camping_tent tractor garden_gnome mushroom_house watering_can alien alien_baby baby_dinosaur dino_friends dino_in_a_hat velociraptor parasaurolophus spinosaurus ankylosaurus dragon frog_prince river_rock_frog fuzzy_monster little_monster leaf_friend coral_reef baobab traffic_light signpost eggplant_leaf turnip bell_pepper hummingbird iguana lizard',
  red: 'apple tomato strawberry cherry cherries ladybug fire_truck fire_engine rose poppy heart valentine_heart crab lobster raspberry radish watermelon santa_claus santa_hat christmas_stocking bull race_car tulip tulip_friend balloon gift gift_box cardinal mailbox stop_sign chili pomegranate mitten_pair mittens fire_hydrant toolbox boxing_glove teacher_apple firefighter rocket_car rooster jam',
  orange: 'fox carrot pumpkin jack_o_lantern orange tiger clownfish goldfish basketball squirrel flame_friend campfire traffic_cone chipmunk kangaroo orangutan pretzel pancakes croissant arctic_fox cheetah pufferfish starfish dump_truck excavator bulldozer mandarin apricot shrimp autumn_leaf fish_bowl sweet_potato',
  yellow: 'pyramid sunrise sunset moon moon_friend crescent_moon half_moon tennis_ball volleyball banana lemon sun sun_friend chick baby_chick duckling duck rubber_duck bee corn cheese pineapple star star_friend lion giraffe school_bus taxi sunflower pear_yellow lightning honey_pot bee_hive firefly crown corn_cob canary hard_hat egg fried_egg ice_cream_van pencil magic_lamp medal trophy sunscreen scarecrow hay hay_bale butter lemonade rubber_boots rain_boots',
  blue: 'whale dolphin shark blueberry police_car police_officer bluebird jellyfish ocean submarine bus airplane rain rain_drop rain_cloud droplet earth globe water_bottle jeans blue_jay narwhal seal snowflake ice_skate mermaid seahorse sailboat boat ship tugboat astronaut rocket robot robot_friend round_robot tall_robot robot_dog toy_robot space_helmet satellite ufo space_station winter_hat parrot peacock macaw',
  purple: 'grapes_purple eggplant plum butterfly unicorn pegasus wizard witch_hat fairy octopus jelly_monster one_eyed_monster tentacle_monster horned_monster violet lavender magic_wand beet beetroot blackberry dragonfly bat crocus',
  pink: 'pig piglet flamingo cupcake ice_cream ice_cream_cone donut lollipop candy candy_basket princess piggy_bank bubble_gum cotton_candy shrimp_pink peach cherry_blossom popsicle ice_pop tooth_fairy birthday_cake cake pudding party_hat birthday_hat doll hibiscus',
  brown: 'mushroom toadstool porcupine sea_otter otter treasure_chest ostrich chicken hen vulture eagle hawk turkey goat bear teddy_bear horse pony deer reindeer moose donkey cow_brown owl snowy_owl_brown beaver hedgehog dog puppy sheep_dog monkey sloth squirrel_brown mole mouse hamster guinea_pig rabbit bunny easter_bunny kitten_brown raccoon wolf_brown chocolate cookie cookies biscuit bread toast potato burger hamburger cheeseburger hot_dog sausage taco coconut acorn pinecone wood_log log tree_stump barn_brown bird_nest nest wheelbarrow wicker_basket egg_basket basket guitar violin drum camel coffee_mug tree_trunk mammoth woodpecker walnut gingerbread_man gingerbread_house nutcracker rocking_horse toy_train log_cabin harp',
  grey: 'pigeon dove sheep lamb soccer_ball baseball baseball_2 elephant rhino rhinoceros hippo hippopotamus koala gray_wolf wolf husky walrus penguin_grey snail spider ant mouse_grey dumbbell kettlebell anchor knight sled_dog helicopter wrench hammer pliers screwdriver saw axe scissors magnifying_glass ladder tin_can milk_can stone_friend fossil mountain gorilla',
  black: 'toucan penguin panda skunk zebra cat kitten farm_cat beetle crow orca badger bowling_ball eight_ball top_hat hockey',
  lightblue: 'cloud snowman polar_bear polar_bear_cub igloo ice_cave snow_globe winter_jacket icicles window telescope bath_tub bathtub toothbrush_friend toothpaste cup milk_carton milk',
  lightgreen: 'snail_green mantis',
};
/** the crayons after the main one, for the parts in size order */
const ACCENT = {
  green: ['yellow', 'lightgreen', 'orange', 'brown'],
  red: ['yellow', 'green', 'brown', 'orange'],
  orange: ['yellow', 'brown', 'green', 'red'],
  yellow: ['orange', 'brown', 'green', 'red'],
  blue: ['lightblue', 'yellow', 'red', 'grey'],
  purple: ['pink', 'yellow', 'blue', 'green'],
  pink: ['red', 'yellow', 'brown', 'purple'],
  brown: ['orange', 'yellow', 'pink', 'green'],
  grey: ['pink', 'yellow', 'blue', 'brown'],
  black: ['grey', 'pink', 'orange', 'yellow'],
  lightblue: ['blue', 'orange', 'yellow', 'red'],
  lightgreen: ['green', 'yellow', 'pink', 'brown'],
};
/** an animal whose first accents are fixed (read on the keys 2026-11-08): the first is for its markings (spots, inner
 *  ears, a face), the second for its small outer parts (legs, hooves, paws) — a sheep's face pink and its legs black, never pink legs; a
 *  pig's trotters brown, never red; a ladybug's spots black; a black cat's lone paw stays black */
const NOUN_ACCENT = {
  sheep: ['pink', 'black'], lamb: ['pink', 'black'],
  pig: ['red', 'pink'], piglet: ['red', 'pink'],
  ladybug: ['black', 'black'],
  rhino: ['pink', 'yellow'], rhinoceros: ['pink', 'yellow'],
  toucan: ['yellow', 'orange'],
  // read on the keys 2026-11-08: a tree's trunk is brown (it came out yellow or light green); the Earth's land green
  tree: ['brown', 'yellow'], apple_tree: ['brown', 'red'], pine_tree: ['brown', 'yellow'], palm_tree: ['brown', 'yellow'], oak_tree: ['brown', 'yellow'], baobab: ['brown', 'yellow'],
  earth: ['green', 'green'], globe: ['green', 'yellow'],
  cat: ['pink', 'black'], kitten: ['pink', 'black'], farm_cat: ['pink', 'black'],
};
/** a noun not listed: its group's main colour */
const GROUP = {
  animals: 'brown', pets: 'orange', farm: 'brown', safari: 'orange', forest: 'brown', ocean: 'blue', polar: 'lightblue', birds: 'blue', bugs: 'green', dinosaurs: 'green', fairy: 'purple',
  space: 'blue', robots: 'purple', vehicles: 'red', food: 'orange', fruit: 'red', vegetables: 'green', kitchen: 'grey', home: 'blue', nature: 'green', school: 'orange', music: 'orange', toys: 'red',
  sports: 'orange', clothes: 'blue', tools: 'grey', objects: 'blue', beach: 'yellow', travel: 'blue', people: 'blue', seasons: 'yellow', celebrations: 'red', christmas: 'green', easter: 'purple', valentine: 'red', shapes: 'purple',
};
const byNoun = new Map(Object.entries(MAIN).flatMap(([c, list]) => list.split(/\s+/).map((n) => [n, c])));
/** the crayon list of a picture: main colour first */
function crayonsFor(noun, group) {
  const base = String(noun).replace(/_\d+$/, '');
  // a word two things share: the kiwi of the birds is a brown bird, not the green fruit
  const main = (group === 'birds' && base === 'kiwi' ? 'brown' : null) || byNoun.get(base) || GROUP[group] || 'orange';
  const out = [main, ...(NOUN_ACCENT[base] || []), ...ACCENT[main]];
  if (NOUN_ACCENT[base]) out.outer = NOUN_ACCENT[base][1]; // the small outer parts take this one, markings or not
  return out;
}
module.exports = { crayonsFor, MAIN, ACCENT, GROUP, NOUN_ACCENT };
