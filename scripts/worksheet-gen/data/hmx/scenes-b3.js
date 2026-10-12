/**
 * data/hmx/scenes-b3.js — Maze Puzzles Level Set scenes, batch 3: UNDERGROUND (G1-421, 9), TOWN — SHORTEST WAY (G1-422, 9),
 * BABIES AND MOTHERS (K-408, 6) and TANGLED LINES (G1-423, 9). Topology comes from the face's published scene; a skin
  // the library holds four drawable baby/mother pairs (every "duck" is a yellow duckling, so no duck mother exists):
  // four distinct trios, one page each
 * sets the world (soil, sky, lawns), the characters and — where the generator allows — the mirror image.
 */
'use strict';

// ------------------------------------------------------------------ UNDERGROUND: a cross-section; the hero goes down (and once up) to its store
// mirrored = the hole at the top LEFT and the store at the bottom RIGHT (the generator's start / goal cells swapped)
const MIRROR = { maze: { start: [0, 0], goal: [9, 2], startMouth: [48, 2], goalMouth: [627, 556] }, chambersGoal: [591, 572, 42], heroAt: [119, 0], goalAt: [587, 598] };
function burrow(id, o) {
  const m = !!o.mirror;
  return {
    id, face: 'burrow', setting: 'soil-' + o.soilName,
    band: { h: 76, sky: o.sky, hill: o.grass, flat: { grass: o.grass, h: 18 } },
    field: o.soil[0], strata: [[180, o.soil[1]], [400, o.soil[2]]],
    corridor: { fill: o.tunnel || '#F4E1C6', edge: o.tunnelEdge || '#8F6640', outline: 3.5 },
    ...(m ? { maze: MIRROR.maze } : {}),
    hero: { src: o.hero, h: o.heroH, at: m ? MIRROR.heroAt : [556, 0] },
    goal: { src: o.goal, h: o.goalH, at: m ? MIRROR.goalAt : [88, 598] },
    chambers: { r: 30, goal: m ? MIRROR.chambersGoal : [84, 572, 42], bugH: 34, bugs: o.bugs },
    bandArt: o.bandArt.map((b) => ({ ...b, x: m ? 675 - b.x : b.x })),
    ...(o.motifs ? { motifs: o.motifs } : {}),
    texture: { n: 26, gap: 40, kinds: ['pebble', 'pebble', 'dot'], colours: { pebble: o.pebbles, dot: [o.pebbles[1]] } },
  };
}

// ------------------------------------------------------------------ TOWN: a street lattice, ONE shortest way; the vehicles park in the side margins
function town(id, o) {
  return {
    id, face: 'shortest-way', setting: 'streets-' + o.look,
    band: { h: 6, sky: o.field, hill: o.field }, field: o.field,
    corridor: o.road || { fill: '#E4E2DE', edge: '#A9A49C', outline: 4 }, strip: true,
    streets: o.covers || { cover: '#B9B4AB', coverEdge: '#8F8A82', coverR: 7 },
    hero: { src: o.hero, h: o.heroH }, goal: { src: o.goal, h: o.goalH },
    cast: o.cast, texture: o.texture, ...(o.decor ? { decor: o.decor } : {}),
  };
}

// ------------------------------------------------------------------ BABIES AND MOTHERS: three trees, each baby's road ends at its own mother
function babies(id, o) {
  return {
    id, face: 'babies-mothers', setting: 'paddocks-' + o.look,
    band: { h: 40, sky: o.sky, hill: o.sky, fence: o.fence },
    field: o.field, corridor: o.road, paddockFill: o.paddock,
    pairs: o.pairs, cast: o.cast, texture: o.texture,
  };
}

// ------------------------------------------------------------------ TANGLED LINES: four strings from four holders to four flyers
function strings(id, o) {
  return {
    id, face: 'tangled-lines', setting: 'strings-' + o.look,
    sky: o.sky, hill: o.hill, strings: { ink: o.ink || '#4A3F36', width: 10 },
    goals: o.goals, holders: o.holders, cast: o.cast,
  };
}

module.exports = [
  burrow('hmx-burrow-mouse', { soilName: 'brown', sky: '#DCEFF6', grass: '#9CCB6E', soil: ['#C99A6B', '#B88559', '#A47149'], pebbles: ['#8E6A49', '#9B7653'], mirror: true,
    hero: 'pets/mouse', heroH: 52, goal: 'At the Supermarket/cheese', goalH: 42, bugs: ['insects and bugs/centipede', 'insects and bugs/snail', 'insects and bugs/spider', 'insects and bugs/worm'],
    bandArt: [{ src: 'flowers/clover', x: 300, h: 44 }, { src: 'flowers/buttercup', x: 420, h: 52 }, { src: 'spring/butterfly', x: 210, h: 30 }] }),
  burrow('hmx-burrow-earthworm', { soilName: 'dark', sky: '#D9CCEB', grass: '#8EBF63', soil: ['#A57D5A', '#8F6A4B', '#79583E'], pebbles: ['#6E5038', '#7E5C42'], tunnel: '#F2DFC2', tunnelEdge: '#6E4E33',
    hero: 'forest creatures/earthworm', heroH: 48, goal: 'spring/leaf', goalH: 42, bugs: ['insects and bugs/ant', 'insects and bugs/millipede', 'insects and bugs/slug', 'Things That Fly/beetle'],
    bandArt: [{ src: 'vegetables/carrot', x: 120, h: 54 }, { src: 'vegetables/beetroot', x: 260, h: 50 }, { src: 'spring/grass', x: 400, h: 44 }] }),
  burrow('hmx-burrow-bunny', { soilName: 'sandy', sky: '#D2E9F4', grass: '#A8D27C', soil: ['#D9B580', '#C9A26C', '#B48C5A'], pebbles: ['#A9865C', '#B89468'], mirror: true,
    hero: 'easter/bunny', heroH: 58, goal: 'easter/carrot', goalH: 46, bugs: ['insects and bugs/worm', 'insects and bugs/ladybug', 'insects and bugs/cricket'],
    bandArt: [{ src: 'flowers/daffodil', x: 120, h: 54 }, { src: 'easter/tulip', x: 240, h: 54 }, { src: 'spring/butterfly', x: 380, h: 30 }] }),
  burrow('hmx-burrow-gopher', { soilName: 'red', sky: '#CBE6E0', grass: '#B3C979', soil: ['#C98767', '#B57256', '#9E5E45'], pebbles: ['#8A5340', '#975D48'],
    hero: 'forest creatures/gopher', heroH: 54, goal: 'vegetables/potato', goalH: 40, bugs: ['insects and bugs/centipede', 'insects and bugs/worm', 'forest creatures/spider'],
    bandArt: [{ src: 'vegetables/corn', x: 110, h: 60 }, { src: 'vegetables/squash', x: 250, h: 40 }, { src: 'thanksgivinng/haystack', x: 400, h: 44 }] }),
  burrow('hmx-burrow-gerbil', { soilName: 'loam', sky: '#CFE4F2', grass: '#8FC56A', soil: ['#B9946E', '#A6805C', '#91704F'], pebbles: ['#7D5E43', '#8C6A4C'], mirror: true,
    hero: 'pets/gerbil', heroH: 52, goal: 'fruits/blueberry', goalH: 36, bugs: ['insects and bugs/ant', 'insects and bugs/slug', 'Things That Fly/beetle', 'insects and bugs/millipede'],
    bandArt: [{ src: 'flowers/bluebell', x: 140, h: 50 }, { src: 'flowers/violet', x: 300, h: 44 }, { src: 'spring/bee', x: 400, h: 26 }] }),
  burrow('hmx-burrow-meerkat', { soilName: 'desert', sky: '#FBD9B0', grass: '#D9B76A', soil: ['#E2C08A', '#D2AC76', '#BE9662'], pebbles: ['#B28A5A', '#A57E50'], tunnel: '#FBEFDC', tunnelEdge: '#9A6E3E',
    hero: 'zoo animals/meerkat', heroH: 58, goal: 'fruits/watermelon', goalH: 38, bugs: ['insects and bugs/cricket', 'insects and bugs/spider', 'insects and bugs/centipede'],
    bandArt: [{ src: 'birds 2/ostrich', x: 140, h: 62 }, { src: 'camping/rock', x: 300, h: 30 }], motifs: [{ k: 'sun', x: 520, y: 26, r: 14, col: '#F7B65A' }] }),
  burrow('hmx-burrow-ferret', { soilName: 'clay', sky: '#BCD8EC', grass: '#9CC27A', soil: ['#B79A86', '#A38572', '#8E705E'], pebbles: ['#7C6152', '#8A6D5D'], tunnel: '#E4E4E0',
    hero: 'pets/ferret', heroH: 54, goal: 'toys/ball', goalH: 38, bugs: ['insects and bugs/worm', 'insects and bugs/snail', 'insects and bugs/ladybug'],
    bandArt: [{ src: 'flowers/dandelion', x: 110, h: 56 }, { src: 'pets/dog', x: 260, h: 44 }, { src: 'flowers/clover', x: 380, h: 36 }] }),
  burrow('hmx-burrow-chipmunk', { soilName: 'autumn', sky: '#F2CFA0', grass: '#B9B266', soil: ['#B08A62', '#9C7752', '#856344'], pebbles: ['#735437', '#82603F'], tunnel: '#E4E4E0', mirror: true,
    hero: 'forest creatures/chipmunk', heroH: 54, goal: 'thanksgivinng/acorn', goalH: 40, bugs: ['insects and bugs/millipede', 'Things That Fly/beetle', 'insects and bugs/spider'],
    bandArt: [{ src: 'miscellaneous/leaf', x: 120, h: 34 }, { src: 'thanksgivinng/pumpkin', x: 270, h: 40 }, { src: 'vegetables/mushroom', x: 380, h: 36 }] }),
  burrow('hmx-burrow-snowy-fox', { soilName: 'frozen', sky: '#BFD3E6', grass: '#E9F1F7', soil: ['#A99B8C', '#968878', '#827466'], pebbles: ['#756759', '#857767'], tunnel: '#F3E0C4', tunnelEdge: '#6F5F4F',
    hero: 'animals/fox', heroH: 56, goal: 'fruits/apple', goalH: 36, bugs: ['insects and bugs/worm', 'insects and bugs/centipede', 'Things That Fly/beetle'],
    bandArt: [{ src: 'winter/evergreen', x: 120, h: 62 }, { src: 'winter/snowman', x: 290, h: 56 }, { src: 'winter/snowflake', x: 400, h: 26 }] }),

  // ------------------------------------------------------------------ TOWN
  town('hmx-town-ambulance', { look: 'spring', field: '#BFDB98', hero: 'vehicles/ambulance', heroH: 44, goal: 'occupations/doctor', goalH: 58,
    cast: [{ src: 'miscellaneous/house', h: 54, optional: true }, { src: 'tree/cherry', h: 60, optional: true }, { src: 'around the house/mailbox', h: 44, optional: true }, { src: 'flowers/tulip', h: 36, optional: true }, { src: 'pets/dog', h: 34, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['tuft'], colours: { tuft: ['#A6CB7A', '#96BE68'] } } }),
  town('hmx-town-bus', { look: 'autumn', field: '#D7C98B', hero: 'vehicles/bus', heroH: 44, goal: 'classroom/student', goalH: 58,
    cast: [{ src: 'tree/maple', h: 60, optional: true }, { src: 'camping/cabin', h: 52, optional: true }, { src: 'around the house/fence', h: 30, optional: true }, { src: 'thanksgivinng/pumpkin', h: 32, optional: true }, { src: 'miscellaneous/autumn', h: 60, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['leaf'], colours: { leaf: ['#E2793F', '#C95C3A'] } } }),
  town('hmx-town-jeep', { look: 'beach', field: '#EED8A6', road: { fill: '#E0DEDA', edge: '#A39C90', outline: 4 }, hero: 'vehicles/jeep', heroH: 44, goal: 'summer/surfboard', goalH: 58,
    cast: [{ src: 'summer/palm_tree', h: 64, optional: true }, { src: 'beach/cabana', h: 50, optional: true }, { src: 'summer/umbrella', h: 46, optional: true }, { src: 'beach/seagull', h: 32, optional: true }, { src: 'summer/flip-flops', h: 28, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['pebble'], colours: { pebble: ['#DDBF86', '#D4B57B'] } } }),
  town('hmx-town-motorcycle', { look: 'evening', field: '#A9C792', hero: 'vehicles/motorcycle', heroH: 42, goal: 'around the house/garage', goalH: 52,
    cast: [{ src: 'winter/cabin', h: 52, optional: true }, { src: 'tree/oak', h: 60, optional: true }, { src: 'around the house/floor_lamp', h: 50, optional: true }, { src: 'pets/cat', h: 32, optional: true }, { src: 'tree/birch', h: 60, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['tuft'], colours: { tuft: ['#93B57E', '#86A873'] } } }),
  town('hmx-town-van', { look: 'village', field: '#C3DE9C', hero: 'vehicles/van', heroH: 44, goal: 'post office/package', goalH: 44,
    cast: [{ src: 'miscellaneous/house', h: 54, optional: true }, { src: 'post office/mailbox', h: 46, optional: true }, { src: 'tree/apple', h: 60, optional: true }, { src: 'farm animals/goose', h: 34, optional: true }, { src: 'flowers/sunflower', h: 44, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['tuft', 'dot'], colours: { tuft: ['#A9CC80', '#9AC073'], dot: ['#F29BB4'] } } }),
  town('hmx-town-mixer', { look: 'building-site', field: '#D9C7A6', road: { fill: '#E9E6E1', edge: '#9F978B', outline: 4 }, hero: 'vehicles/cement_mixer', heroH: 44, goal: 'occupations/construction_worker', goalH: 58,
    cast: [{ src: 'vehicles/excavator', h: 44, optional: true }, { src: 'vehicles/bulldozer', h: 42, optional: true }, { src: 'camping/log', h: 30, optional: true }, { src: 'tools/hammer', h: 30, optional: true }, { src: 'camping/rock', h: 30, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['pebble'], colours: { pebble: ['#BDB4A6', '#B0A595'] } } }),
  town('hmx-town-truck', { look: 'harbour', field: '#C2BCB2', road: { fill: '#ECE9E4', edge: '#958D82', outline: 4 }, covers: { cover: '#A39E95', coverEdge: '#7E786F', coverR: 7 }, hero: 'vehicles/truck', heroH: 44, goal: 'vehicles/forklift', goalH: 46,
    cast: [{ src: 'post office/package', h: 34, optional: true }, { src: 'beach/lighthouse', h: 64, optional: true }, { src: 'beach/seagull', h: 32, optional: true }, { src: 'vehicles/ship', h: 40, optional: true }, { src: 'camping/rope', h: 30, optional: true }],
    texture: { n: 14, gap: 48, kinds: ['pebble'], colours: { pebble: ['#ABA192', '#B3AA9C'] } } }),
  town('hmx-town-racecar', { look: 'summer', field: '#B4D98C', hero: 'vehicles/race_car', heroH: 36, goal: 'occupations/mechanic', goalH: 52,
    cast: [{ src: 'tree/poplar', h: 60, optional: true }, { src: 'around the house/garage', h: 46, optional: true }, { src: 'vehicles/bicycle', h: 30, optional: true }, { src: 'flowers/marigold', h: 36, optional: true }, { src: 'toys/ball', h: 26, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['tuft'], colours: { tuft: ['#9CC872', '#8DBC66'] } } }),
  town('hmx-town-tractor', { look: 'farm', field: '#E2D497', road: { fill: '#F3EEE6', edge: '#A99D8C', outline: 4 }, covers: { cover: '#C2B49C', coverEdge: '#9A8B72', coverR: 7 }, hero: 'vehicles/tractor', heroH: 46, goal: 'thanksgivinng/haystack', goalH: 50,
    cast: [{ src: 'farm animals/cow', h: 44, optional: true }, { src: 'farm animals/sheep', h: 38, optional: true }, { src: 'thanksgivinng/harvest', h: 44, optional: true }, { src: 'miscellaneous/orchard', h: 60, optional: true }, { src: 'farm animals/rooster', h: 36, optional: true }],
    texture: { n: 16, gap: 46, kinds: ['tuft'], colours: { tuft: ['#D3C07A', '#C6B06A'] } } }),

  // ------------------------------------------------------------------ BABIES AND MOTHERS
  babies('hmx-babies-meadow', { look: 'meadow', sky: '#CFE7F4', fence: { rail: '#E9D2A6', post: '#D4B580' }, field: '#C3DF96', road: { fill: '#FBF1D6', edge: '#B89A5E', outline: 3.5 }, paddock: '#D9ECB3',
    pairs: [{ baby: 'farm animals/chick', babyH: 40, mother: 'birds 2/hen', motherH: 62 }, { baby: 'farm animals/calf', babyH: 46, mother: 'farm animals/cow', motherH: 64 }, { baby: 'farm animals/lamb', babyH: 44, mother: 'farm animals/sheep', motherH: 60 }],
    cast: [{ src: 'flowers/dandelion', h: 44, optional: true }, { src: 'spring/butterfly', h: 34, optional: true }],
    texture: { n: 22, gap: 44, kinds: ['tuft', 'dot'], colours: { tuft: ['#AACB80', '#9DBF72'], dot: ['#FFFFFF', '#F6D45E'] } } }),
  babies('hmx-babies-snow', { look: 'snow', sky: '#BCD3E6', fence: { rail: '#B98D63', post: '#9F744C' }, field: '#D3E3EF', road: { fill: '#FFFFFF', edge: '#86AFCB', outline: 3.5 }, paddock: '#E6EEF5',
    pairs: [{ baby: 'farm animals/calf', babyH: 46, mother: 'farm animals/cow', motherH: 64 }, { baby: 'farm animals/foal', babyH: 48, mother: 'farm animals/horse_2', motherH: 66 }, { baby: 'easter/lamb', babyH: 42, mother: 'farm animals/sheep', motherH: 60 }],
    cast: [{ src: 'winter/snowman', h: 50, optional: true }, { src: 'winter/evergreen', h: 60, optional: true }],
    texture: { n: 20, gap: 46, kinds: ['dot'], colours: { dot: ['#B3C9DC', '#A9C1D6'] } } }),

  // ------------------------------------------------------------------ TANGLED LINES
  strings('hmx-strings-farm', { look: 'farm', sky: '#D6ECF6', hill: '#BDD98A',
    goals: [{ src: 'Things That Fly/balloon', h: 70 }, { src: 'spring/kite', h: 72 }, { src: 'toys/kite', h: 72 }, { src: 'toys/balloon', h: 70 }, { src: 'summer/kite', h: 72 }],
    holders: [{ src: 'farm animals/pig', h: 54 }, { src: 'farm animals/goat', h: 62 }, { src: 'farm animals/duck', h: 52 }, { src: 'farm animals/dog', h: 58 }, { src: 'farm animals/cow', h: 52 }],
    cast: [{ src: 'weather/cloud', at: [52, 330], h: 36, centre: true }, { src: 'spring/bird', at: [628, 300], h: 32, centre: true }, { src: 'flowers/tulip', at: [44, 704], h: 34 }] }),
  strings('hmx-strings-beach', { look: 'beach', sky: '#C6E6F4', hill: '#F0D9A4',
    goals: [{ src: 'beach/kite', h: 72 }, { src: 'summer/kite', h: 72 }, { src: 'Things That Fly/kite', h: 74 }, { src: 'toys/balloon', h: 70 }, { src: 'Things That Fly/balloon', h: 70 }],
    holders: [{ src: 'summer/crab', h: 46 }, { src: 'beach/turtle', h: 44 }, { src: 'beach/seagull', h: 56 }, { src: 'ocean life/seal', h: 54 }, { src: 'ocean life/starfish', h: 46 }],
    cast: [{ src: 'beach/cloud', at: [52, 320], h: 32, centre: true }, { src: 'beach/sun', at: [626, 300], h: 40, centre: true }, { src: 'beach/seashell', at: [44, 704], h: 28 }] }),
  strings('hmx-strings-snow', { look: 'snow', sky: '#B9D0E6', hill: '#E9F1F7',
    goals: [{ src: 'Things That Fly/balloon', h: 70 }, { src: 'Things That Fly/kite', h: 74 }, { src: 'spring/kite', h: 72 }, { src: 'beach/kite', h: 72 }, { src: 'toys/balloon', h: 70 }],
    holders: [{ src: 'zoo animals/reindeer', h: 60 }, { src: 'winter/polar_bear', h: 46 }, { src: 'winter/walrus', h: 48 }, { src: 'winter/seal', h: 54 }, { src: 'winter/owl', h: 50 }],
    cast: [{ src: 'winter/snowflake', at: [52, 330], h: 30, centre: true }, { src: 'weather/cloud', at: [626, 300], h: 34, centre: true }, { src: 'winter/evergreen', at: [44, 704], h: 50 }] }),
  strings('hmx-strings-savanna', { look: 'savanna', sky: '#FCE2BE', hill: '#E2C27E',
    goals: [{ src: 'toys/kite', h: 72 }, { src: 'toys/balloon', h: 70 }, { src: 'summer/kite', h: 72 }, { src: 'Things That Fly/balloon', h: 70 }, { src: 'beach/kite', h: 72 }],
    holders: [{ src: 'zoo animals/zebra', h: 62 }, { src: 'zoo animals/lion', h: 58 }, { src: 'zoo animals/elephant', h: 58 }, { src: 'zoo animals/meerkat', h: 54 }, { src: 'zoo animals/giraffe', h: 64 }],
    cast: [{ src: 'birds 2/eagle', at: [52, 320], h: 34, centre: true }, { src: 'weather/sun', at: [626, 300], h: 40, centre: true }, { src: 'tree/baobab', at: [40, 704], h: 60 }] }),
  strings('hmx-strings-pets', { look: 'park', sky: '#F5D9EE', hill: '#B3DB8B',
    goals: [{ src: 'spring/kite', h: 72 }, { src: 'Things That Fly/balloon', h: 70 }, { src: 'beach/kite', h: 72 }, { src: 'toys/kite', h: 72 }, { src: 'toys/balloon', h: 70 }],
    holders: [{ src: 'pets/cat', h: 54 }, { src: 'pets/hamster', h: 48 }, { src: 'pets/rabbit', h: 58 }, { src: 'pets/dog', h: 56 }, { src: 'pets/parrot', h: 54 }],
    cast: [{ src: 'Things That Fly/butterfly', at: [52, 330], h: 30, centre: true }, { src: 'weather/cloud', at: [626, 310], h: 36, centre: true }, { src: 'flowers/clover', at: [44, 704], h: 28 }] }),
  strings('hmx-strings-dinos', { look: 'prehistoric', sky: '#F2C49B', hill: '#A9C27F',
    goals: [{ src: 'Things That Fly/kite', h: 74 }, { src: 'toys/balloon', h: 70 }, { src: 'summer/kite', h: 72 }, { src: 'spring/kite', h: 72 }, { src: 'Things That Fly/balloon', h: 70 }],
    holders: [{ src: 'dinosaurs/stegosaurus', h: 48 }, { src: 'dinosaurs/triceratops', h: 50 }, { src: 'dinosaurs/tyrannosaurus_rex', h: 60 }, { src: 'dinosaurs/oviraptor', h: 56 }, { src: 'dinosaurs/parasaurolophus', h: 56 }],
    cast: [{ src: 'Things That Fly/dragonfly', at: [52, 330], h: 30, centre: true }, { src: 'weather/sun', at: [626, 300], h: 40, centre: true }, { src: 'tree/palm', at: [40, 704], h: 60 }] }),
  strings('hmx-strings-forest', { look: 'autumn', sky: '#BFDCEB', hill: '#D9A35C',
    goals: [{ src: 'toys/balloon', h: 70 }, { src: 'beach/kite', h: 72 }, { src: 'Things That Fly/balloon', h: 70 }, { src: 'Things That Fly/kite', h: 74 }, { src: 'summer/kite', h: 72 }],
    holders: [{ src: 'forest creatures/deer', h: 64 }, { src: 'forest creatures/hedgehog', h: 44 }, { src: 'forest creatures/owl', h: 52 }, { src: 'forest creatures/mouse', h: 48 }, { src: 'forest creatures/squirrel', h: 54 }],
    cast: [{ src: 'miscellaneous/leaf', at: [52, 330], h: 30, centre: true }, { src: 'birds 2/swallow', at: [626, 300], h: 32, centre: true }, { src: 'vegetables/mushroom', at: [44, 704], h: 30 }] }),
  strings('hmx-strings-kids', { look: 'evening', sky: '#F4BE95', hill: '#A9CF85',
    goals: [{ src: 'summer/kite', h: 72 }, { src: 'spring/kite', h: 72 }, { src: 'Things That Fly/balloon', h: 70 }, { src: 'toys/balloon', h: 70 }, { src: 'beach/kite', h: 72 }],
    holders: [{ src: 'toys/girl', h: 62 }, { src: 'classroom/student', h: 62 }, { src: 'toys/doll', h: 56 }, { src: 'toys/teddy_bear', h: 52 }, { src: 'toys/robot', h: 58 }],
    cast: [{ src: 'Things That Fly/seagull', at: [52, 320], h: 30, centre: true }, { src: 'weather/sunny', at: [626, 300], h: 40, centre: true }, { src: 'flowers/tulip', at: [44, 704], h: 34 }] }),
  strings('hmx-strings-jungle', { look: 'jungle', sky: '#C3E3C0', hill: '#7FB771',
    goals: [{ src: 'Things That Fly/balloon', h: 70 }, { src: 'summer/kite', h: 72 }, { src: 'toys/balloon', h: 70 }, { src: 'beach/kite', h: 72 }, { src: 'spring/kite', h: 72 }],
    holders: [{ src: 'zoo animals/monkey', h: 56 }, { src: 'zoo animals/gorilla', h: 54 }, { src: 'zoo animals/sloth', h: 56 }, { src: 'zoo animals/tiger', h: 54 }, { src: 'reptiles and Amphibians/chameleon', h: 40 }],
    cast: [{ src: 'birds 2/toucan', at: [52, 320], h: 34, centre: true }, { src: 'Things That Fly/butterfly', at: [626, 300], h: 30, centre: true }, { src: 'flowers/hibiscus', at: [44, 704], h: 34 }] }),
];
