const fs = require('fs');
const path = require('path');

// Load server file list
const serverFiles = new Set(
  fs.readFileSync('C:/Users/rkgen/lessoncraftstudio/scripts/server-image-list.txt', 'utf8')
    .trim().split('\n').map(l => l.trim().replace(/\r/g, ''))
);

// Exact replacements for wrong paths
const fixMap = {
  // Case-sensitivity
  '/image-library/space/earth.webp': '/image-library/space/Earth.webp',
  '/image-library/space/jupiter.webp': '/image-library/space/Jupiter.webp',
  // Christmas
  '/image-library/christmas/christmas tree.webp': '/image-library/christmas/tree.webp',
  '/image-library/christmas/santa claus.webp': '/image-library/christmas/Santa.webp',
  // Flowers
  '/image-library/flowers/daisy.webp': '/image-library/flowers/rose.webp',
  '/image-library/garden/daisy.png': '/image-library/flowers/rose.webp',
  // Dinosaurs
  '/image-library/dinosaurs/tyrannosaurus.png': '/image-library/dinosaurs/tyrannosaurus rex.webp',
  '/image-library/dinosaurs/pteranodon.png': '/image-library/dinosaurs/deinonychus.webp',
  // Weather
  '/image-library/weather/rain cloud.webp': '/image-library/weather/rainy.webp',
  '/image-library/weather/lightning.webp': '/image-library/weather/thunderstorm.webp',
  // Fruits
  '/image-library/fruits/grape.webp': '/image-library/fruits/grapefruit.webp',
  // Safari -> zoo animals/animals
  '/image-library/safari/hippo.webp': '/image-library/zoo animals/hippopotamus.webp',
  '/image-library/safari/elephant.webp': '/image-library/animals/elephant.webp',
  '/image-library/safari/giraffe.webp': '/image-library/animals/giraffe.webp',
  '/image-library/safari/lion.webp': '/image-library/animals/lion.webp',
  '/image-library/safari/zebra.webp': '/image-library/animals/zebra.webp',
  // Halloween -> various
  '/image-library/halloween/bat.webp': '/image-library/forest creatures/bat.webp',
  '/image-library/halloween/ghost.webp': '/image-library/winter/cabin.webp',
  '/image-library/halloween/pumpkin.webp': '/image-library/vegetables/pumpkin.webp',
  '/image-library/halloween/spider.webp': '/image-library/insects and bugs/cricket.webp',
  '/image-library/halloween/witch.webp': '/image-library/miscellaneous/cauldron.webp',
  // Pirates -> various
  '/image-library/pirates/anchor.webp': '/image-library/ocean life/starfish.webp',
  '/image-library/pirates/cannon.webp': '/image-library/camping/binoculars.webp',
  '/image-library/pirates/flag.webp': '/image-library/camping/backpack.webp',
  '/image-library/pirates/map.webp': '/image-library/camping/boots.webp',
  '/image-library/pirates/parrot.webp': '/image-library/birds/parrot.webp',
  '/image-library/pirates/ship.webp': '/image-library/vehicles/boat.webp',
  '/image-library/pirates/treasure.webp': '/image-library/christmas/present.webp',
  // Fantasy -> various
  '/image-library/fantasy/castle.webp': '/image-library/christmas/church.webp',
  '/image-library/fantasy/dragon.webp': '/image-library/dinosaurs/carnotaurus.webp',
  '/image-library/fantasy/fairy.webp': '/image-library/spring/butterfly.webp',
  '/image-library/fantasy/knight.webp': '/image-library/occupations/firefighter.webp',
  '/image-library/fantasy/unicorn.webp': '/image-library/animals/horse.webp',
  // Construction -> vehicles/tools
  '/image-library/construction/bulldozer.webp': '/image-library/vehicles/bulldozer.webp',
  '/image-library/construction/crane.webp': '/image-library/vehicles/crane.webp',
  '/image-library/construction/excavator.webp': '/image-library/vehicles/excavator.webp',
  '/image-library/construction/hammer.webp': '/image-library/tools/hammer.webp',
  '/image-library/construction/truck.webp': '/image-library/vehicles/truck.webp',
  // Sea creatures -> ocean life
  '/image-library/sea creatures/clam.webp': '/image-library/ocean life/starfish.webp',
  '/image-library/sea creatures/crab.webp': '/image-library/ocean life/crab.webp',
  '/image-library/sea creatures/dolphin.webp': '/image-library/ocean life/dolphin.webp',
  '/image-library/sea creatures/jellyfish.webp': '/image-library/ocean life/jellyfish.webp',
  '/image-library/sea creatures/octopus.webp': '/image-library/ocean life/octopus.webp',
  // Social media
  '/image-library/social-media/instagram.webp': '/image-library/classroom/computer.webp',
  // Sports -> sports bw
  '/image-library/sports/cycling.webp': '/image-library/sports bw/bicycle.webp',
  '/image-library/sports/soccer.webp': '/image-library/sports bw/soccer ball.webp',
  '/image-library/sports/basketball.webp': '/image-library/sports bw/basketball.webp',
  '/image-library/sports/tennis.webp': '/image-library/sports bw/tennis.webp',
  '/image-library/sports/swimming.webp': '/image-library/sports bw/swimming.webp',
  '/image-library/sports/running.webp': '/image-library/sports bw/running.webp',
  '/image-library/sports/football.webp': '/image-library/sports bw/football.webp',
  '/image-library/sports/boxing.webp': '/image-library/sports bw/boxing.webp',
  '/image-library/sports/baseball.webp': '/image-library/sports bw/baseball.webp',
  // Travel -> camping/vehicles
  '/image-library/travel/airplane.webp': '/image-library/vehicles/airplane.webp',
  '/image-library/travel/camera.webp': '/image-library/camping/camera.webp',
  '/image-library/travel/compass.webp': '/image-library/camping/compass.webp',
  '/image-library/travel/map.webp': '/image-library/camping/boots.webp',
  '/image-library/travel/suitcase.webp': '/image-library/camping/backpack.webp',
  // Tools fabricated
  '/image-library/tools/resolution-comparison.png': '/image-library/tools/hammer.webp',
  '/image-library/tools/margin-safe-zone.png': '/image-library/tools/level.webp',
  '/image-library/tools/color-palette-example.png': '/image-library/tools/paintbrush.webp',
  '/image-library/tools/print-test-results.png': '/image-library/tools/screwdriver.webp',
  '/image-library/tools/answer-key-verification.png': '/image-library/tools/wrench.webp',
  // Insects -> insects and bugs
  '/image-library/insects/ant.webp': '/image-library/insects and bugs/ant.webp',
  '/image-library/insects/bee.webp': '/image-library/insects and bugs/bee.webp',
  '/image-library/insects/butterfly.webp': '/image-library/insects and bugs/butterfly.webp',
  '/image-library/insects/dragonfly.webp': '/image-library/insects and bugs/dragonfly.webp',
  '/image-library/insects/ladybug.webp': '/image-library/insects and bugs/ladybug.webp',
  // Ocean animals -> ocean life
  '/image-library/ocean animals/dolphin.png': '/image-library/ocean life/dolphin.webp',
  '/image-library/ocean animals/jellyfish.png': '/image-library/ocean life/jellyfish.webp',
  '/image-library/ocean animals/octopus.png': '/image-library/ocean life/octopus.webp',
  '/image-library/ocean animals/seahorse.png': '/image-library/ocean life/seahorse.webp',
  '/image-library/ocean animals/whale.png': '/image-library/ocean life/whale.webp',
  // Musical instruments -> music
  '/image-library/musical instruments/drum.webp': '/image-library/music/drum.webp',
  '/image-library/musical instruments/flute.webp': '/image-library/music/flute.webp',
  '/image-library/musical instruments/guitar.webp': '/image-library/music/guitar.webp',
  '/image-library/musical instruments/piano.webp': '/image-library/music/piano.webp',
  '/image-library/musical instruments/violin.webp': '/image-library/music/violin.webp',
  // Household items -> around the house
  '/image-library/household items/broom.webp': '/image-library/around the house/broom.webp',
  '/image-library/household items/bucket.webp': '/image-library/around the house/bucket.webp',
  '/image-library/household items/clock.webp': '/image-library/around the house/clock.webp',
  '/image-library/household items/iron.webp': '/image-library/around the house/iron.webp',
  '/image-library/household items/lamp.webp': '/image-library/furniture/lamp.webp',
  // Food -> specific folders
  '/image-library/food/apple.webp': '/image-library/fruits/apple.webp',
  '/image-library/food/banana.webp': '/image-library/fruits/banana.webp',
  '/image-library/food/bread.webp': '/image-library/bakery/bread.webp',
  '/image-library/food/cake.webp': '/image-library/desserts and sweets/cake.webp',
  '/image-library/food/carrot.webp': '/image-library/vegetables/carrot.webp',
  '/image-library/food/cheese.webp': '/image-library/breakfast/cheese.webp',
  '/image-library/food/cherry.webp': '/image-library/fruits/cherry.webp',
  '/image-library/food/pizza.webp': '/image-library/breakfast/pizza.webp',
  // Jungle -> correct folders
  '/image-library/jungle/chameleon.webp': '/image-library/reptiles and Amphibians/chameleon.webp',
  '/image-library/jungle/gorilla.webp': '/image-library/zoo animals/gorilla.webp',
  '/image-library/jungle/monkey.webp': '/image-library/zoo animals/monkey.webp',
  '/image-library/jungle/parrot.webp': '/image-library/birds/parrot.webp',
  '/image-library/jungle/toucan.webp': '/image-library/birds/toucan.webp',
  // Garden -> correct folders
  '/image-library/garden/butterfly.webp': '/image-library/insects and bugs/butterfly.webp',
  '/image-library/garden/cactus.png': '/image-library/flowers/begonia.webp',
  '/image-library/garden/flower.webp': '/image-library/flowers/rose.webp',
  '/image-library/garden/ladybug.webp': '/image-library/insects and bugs/ladybug.webp',
  '/image-library/garden/snail.webp': '/image-library/forest creatures/snail.webp',
  '/image-library/garden/watering can.webp': '/image-library/around the house/broom.webp',
  // .png -> .webp for various existing files
  '/image-library/animals/elephant.png': '/image-library/animals/elephant.webp',
  '/image-library/animals/giraffe.png': '/image-library/animals/giraffe.webp',
  '/image-library/animals/lion.png': '/image-library/animals/lion.webp',
  '/image-library/animals/monkey.png': '/image-library/animals/monkey.webp',
  '/image-library/animals/zebra.png': '/image-library/animals/zebra.webp',
  '/image-library/dinosaurs/brachiosaurus.png': '/image-library/dinosaurs/brachiosaurus.webp',
  '/image-library/dinosaurs/stegosaurus.png': '/image-library/dinosaurs/stegosaurus.webp',
  '/image-library/dinosaurs/triceratops.png': '/image-library/dinosaurs/triceratops.webp',
  '/image-library/flowers/rose.png': '/image-library/flowers/rose.webp',
  '/image-library/flowers/sunflower.png': '/image-library/flowers/sunflower.webp',
  '/image-library/flowers/tulip.png': '/image-library/flowers/tulip.webp',
  '/image-library/pets/cat.png': '/image-library/pets/cat.webp',
  '/image-library/pets/dog.png': '/image-library/pets/dog.webp',
  '/image-library/pets/fish.png': '/image-library/pets/fish.webp',
  '/image-library/pets/hamster.png': '/image-library/pets/hamster.webp',
  '/image-library/pets/rabbit.png': '/image-library/pets/rabbit.webp',
};

// Scan all Dutch content directories
const dirs = [
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/guide-content/nl',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/bundle-content/nl',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/idea-content/nl',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/start-content/nl',
  'C:/Users/rkgen/lessoncraftstudio/frontend/config/app-content/nl',
];

let totalFixed = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');
    let fileFixed = 0;

    for (const [wrong, right] of Object.entries(fixMap)) {
      // Handle both raw and URL-encoded versions
      const wrongEncoded = wrong.split('/').map((s, i) => i <= 1 ? s : encodeURIComponent(s)).join('/');

      if (content.includes(wrong)) {
        content = content.split(wrong).join(right);
        fileFixed++;
      }
      if (wrong !== wrongEncoded && content.includes(wrongEncoded)) {
        content = content.split(wrongEncoded).join(right);
        fileFixed++;
      }
    }

    if (fileFixed > 0) {
      fs.writeFileSync(fp, content, 'utf8');
      console.log('FIXED: ' + file + ' (' + fileFixed + ' replacements)');
      totalFixed += fileFixed;
    }
  }
}

console.log('\nTotal fixes applied: ' + totalFixed);

// Now verify ALL remaining /image-library/ paths
console.log('\n=== VERIFICATION: Checking ALL remaining paths ===');
let remainingIssues = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const fp = path.join(dir, file);
    const content = fs.readFileSync(fp, 'utf8');
    const regex = /\/image-library\/([^'"]+)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const decoded = decodeURIComponent(match[1]);
      if (!serverFiles.has(decoded)) {
        console.log('STILL BROKEN: ' + file + ': ' + decoded);
        remainingIssues++;
      }
    }
  }
}

console.log('\nRemaining broken paths: ' + remainingIssues);
