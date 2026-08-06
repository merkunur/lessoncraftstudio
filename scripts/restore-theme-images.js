/**
 * restore-theme-images.js
 *
 * Restores topic-relevant themeImages to all content files (256 total).
 * Images served from /image-library/{theme}/{file}.webp on the server.
 *
 * Usage: node scripts/restore-theme-images.js [--type idea|guide|start|bundle] [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const TYPE_FILTER = (() => {
  const idx = process.argv.indexOf('--type');
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

// ============================================================
// SERVER WEBP FILES PER THEME (sorted alphabetically)
// These exist at /var/www/lcs-media/image-library/{theme}/
// ============================================================
const THEME_FILES = {
  animals: ['antelope.webp','bat.webp','camel.webp','cat.webp','dog.webp','dolphin.webp','donkey.webp','duck.webp','elephant.webp','fish.webp','fox.webp','giraffe.webp','hippopotamus.webp','horse.webp','iguana.webp','jaguar.webp','koala.webp','leopard.webp','moose.webp','orangutan.webp','owl.webp','panda.webp','penguin.webp','pig.webp','rabbit.webp','raccoon.webp','reindeer.webp','seagull.webp','sheep.webp','swan.webp','tiger.webp','turtle.webp','vulture.webp','whale.webp','wolf.webp','woodpecker.webp','zebra.webp'],
  birds: ['eagle.webp','flamingo.webp','hornbill.webp','macaw.webp','ostrich.webp','owl.webp','parrot.webp','peacock.webp','pelican.webp','penguin.webp','toucan.webp','vulture.webp'],
  camping: ['backpack.webp','bear.webp','binoculars.webp','boots.webp','cabin.webp','camper.webp','campfire.webp','camping-chair.webp','canoe.webp','compass.webp','cooler.webp','deer.webp','firefly.webp','fish.webp','fishing-rod.webp','flashlight.webp','forest.webp','fox.webp','frog.webp','grill.webp','hammock.webp','hat.webp','hot-dog.webp','kayak.webp','kettle.webp','lake.webp','lantern.webp','log.webp','map.webp','moon.webp','mountain.webp','oar.webp','owl.webp','picnic-table.webp','pine-tree.webp','pinecone.webp','rabbit.webp','raccoon.webp','river.webp','rock.webp','rope.webp','sleeping-bag.webp','squirrel.webp','tent.webp','trail.webp','vest.webp','water.webp'],
  christmas: ['angel.webp','bell.webp','candle.webp','candy-cane.webp','chimney.webp','church.webp','cookie.webp','crystal-ball.webp','elf.webp','garland.webp','gingerbread.webp','lights.webp','mistletoe.webp','nativity.webp','nutcracker.webp','ornament.webp','present.webp','reindeer.webp','ribbon.webp','rudolph.webp','sack.webp','santa.webp','sleigh.webp','snowman.webp','star.webp','stocking.webp','tree.webp','wreath.webp'],
  classroom: ['backpack.webp','binder.webp','book.webp','cabinet.webp','calculator.webp','calender.webp','chair.webp','clock.webp','computer.webp','crayon.webp','desk.webp','eraser.webp','folder.webp','globe.webp','glue.webp','librarian.webp','lunchbox.webp','map.webp','marker.webp','notebook.webp','paper.webp','pen.webp','pencil.webp','ruler.webp','scissors.webp','shelf.webp','stapler.webp','student.webp','table.webp','tablet.webp','tape.webp','teacher.webp','whiteboard.webp'],
  dinosaurs: ['allosaurus.webp','ankylosaurus.webp','apatosaurus.webp','argentinosaurus.webp','brachiosaurus.webp','brontosaurus.webp','carnotaurus.webp','deinonychus.webp','dimetrodon.webp','diplodocus.webp','giganotosaurus.webp','ichthyosaurus.webp','iguanodon.webp','maiasaura.webp','mosasaurus.webp','oviraptor.webp','pachycephalosaurus.webp','parasaurolophus.webp','plesiosaurus.webp','stegosaurus.webp','styracosaurus.webp','therizinosaurus.webp','triceratops.webp','tyrannosaurus-rex.webp','velociraptor.webp'],
  flowers: ['aster.webp','azalea.webp','begonia.webp','bluebell.webp','buttercup.webp','carnation.webp','cherry-blossom.webp','clover.webp','columbine.webp','cornflower.webp','crocus.webp','daffodil.webp','dahlia.webp','dandelion.webp','forget-me-not.webp','forsythia.webp','hibiscus.webp','hydrangea.webp','jasmine.webp','lavender.webp','lilac.webp','lily.webp','lotus.webp','marigold.webp','morning-glory.webp','orchid.webp','peony.webp','petunia.webp','phlox.webp','rose.webp','snowdrop.webp','sunflower.webp','trillium.webp','tulip.webp','violet.webp','water-lily.webp','wisteria.webp','zinnia.webp'],
  fruits: ['apple.webp','apricot.webp','avocado.webp','banana.webp','blackberry.webp','blueberry.webp','cherry.webp','clementine.webp','coconut.webp','cranberry.webp','dragonfruit.webp','fig.webp','grapefruit.webp','kiwi.webp','lemon.webp','lime.webp','mango.webp','nectarine.webp','orange.webp','papaya.webp','peach.webp','pear.webp','persimmon.webp','pineapple.webp','plum.webp','pomegranate.webp','raspberry.webp','strawberry.webp','watermelon.webp'],
  music: ['accordion.webp','cymbals.webp','drum.webp','flute.webp','guitar.webp','harp.webp','keyboard.webp','note.webp','piano.webp','saxophone.webp','singer.webp','stage.webp','trombone.webp','trumpet.webp','violin.webp','xylophone.webp'],
  pets: ['cat.webp','chinchilla.webp','cockatiel.webp','dog.webp','ferret.webp','finch.webp','fish.webp','frog.webp','gecko.webp','gerbil.webp','goldfish.webp','guinea-pig.webp','hamster.webp','iguana.webp','lizard.webp','mouse.webp','parrot.webp','rabbit.webp','tortoise.webp','turtle.webp'],
  shapes: ['circle.webp','cone.webp','cube.webp','cylinder.webp','diamond.webp','heart.webp','heptagon.webp','hexagon.webp','moon.webp','octogon.webp','oval.webp','parallelogram.webp','pentagon.webp','pyramid.webp','rectangle.webp','rectangular-box.webp','sphere.webp','square.webp','star.webp','trapezoid.webp','triangle.webp'],
  space: ['asteroid.webp','astronaut.webp','comet.webp','earth.webp','galaxy.webp','jupiter.webp','mars.webp','mercury.webp','meteor.webp','moon.webp','neptune.webp','planet.webp','rocket.webp','satellite.webp','saturn.webp','sun.webp','telescope.webp','uranus.webp','venus.webp'],
  spring: ['bee.webp','bicycle.webp','bird.webp','birdhouse.webp','bud.webp','bunny.webp','butterfly.webp','caterpillar.webp','chick.webp','cloud.webp','duckling.webp','easter-egg.webp','flower.webp','frog.webp','garden.webp','grass.webp','kite.webp','lamb.webp','leaf.webp','nest.webp','puddle.webp','rain.webp','rain-boots.webp','rainbow.webp','raincoat.webp','robin.webp','shovel.webp','snail.webp','sun.webp','tulip.webp','umbrella.webp','watering-can.webp','worm.webp'],
  summer: ['barbecue.webp','beach.webp','beach-ball.webp','bucket.webp','butterfly.webp','campfire.webp','cap.webp','crab.webp','dolphin.webp','flip-flops.webp','flower.webp','hot-dog.webp','ice-cream.webp','jellyfish.webp','kite.webp','ladybug.webp','lemonade.webp','life-jacket.webp','palm-tree.webp','pineapple.webp','pool.webp','popsicle.webp','rainbow.webp','sand.webp','sandals.webp','sandcastle.webp','seashell.webp','shorts.webp','spade.webp','starfish.webp','strawberry.webp','sunglasses.webp','sun-hat.webp','surfboard.webp','swimming.webp','swimsuit.webp','t-shirt.webp','tent.webp','umbrella.webp','watermelon.webp'],
  tools: ['bolt.webp','caulking-gun.webp','electric-drill.webp','extension-cord.webp','flashlight.webp','hammer.webp','handsaw.webp','ladder.webp','nail.webp','nut.webp','paint-brush.webp','pliers.webp','plunger.webp','screwdriver.webp','spanner.webp','spirit-level.webp','tape-measure.webp'],
  toys: ['airplane.webp','baby.webp','baby-girl.webp','ball.webp','balloon.webp','bicycle.webp','blocks.webp','boat.webp','bucket.webp','car.webp','cards.webp','chess.webp','crayons.webp','dice.webp','dinosaur.webp','doll.webp','domino.webp','girl.webp','helicopter.webp','kite.webp','lego.webp','race-car.webp','robot.webp','rocket.webp','sandbox.webp','scooter.webp','shovel.webp','skateboard.webp','slide.webp','swing.webp','teddy-bear.webp','train.webp','truck.webp','video-game.webp'],
  vegetables: ['asparagus.webp','beetroot.webp','bell-pepper.webp','broccoli.webp','cabbage.webp','carrot.webp','cauliflower.webp','celery.webp','chilli-pepper.webp','corn.webp','cucumber.webp','eggplant.webp','garlic.webp','green-beans.webp','leek.webp','lettuce.webp','mushroom.webp','onion.webp','parsnip.webp','potato.webp','pumpkin.webp','radish.webp','spinach.webp','squash.webp','tomato.webp','turnip.webp'],
  vehicles: ['airplane.webp','ambulance.webp','bicycle.webp','boat.webp','bulldozer.webp','bus.webp','canoe.webp','car.webp','cement-mixer.webp','crane.webp','dump-truck.webp','excavator.webp','ferry.webp','fire-truck.webp','forklift.webp','garbage-truck.webp','helicopter.webp','jeep.webp','jet.webp','mail-truck.webp','monster-truck.webp','motorcycle.webp','police-car.webp','race-car.webp','rocket.webp','sailboat.webp','school-bus.webp','scooter.webp','ship.webp','skateboard.webp','submarine.webp','subway.webp','taxi.webp','tow-truck.webp','tractor.webp','train.webp','truck.webp','van.webp','yacht.webp'],
  weather: ['cloud.webp','cloudy.webp','cold.webp','hot.webp','mittens.webp','partly-cloudy.webp','puddle.webp','rain-boots.webp','rainbow.webp','raincoat.webp','raindrop.webp','rainy.webp','scarf.webp','snowflake.webp','stormy.webp','sun.webp','sunglasses.webp','sunny.webp','thermometer.webp','thunderstorm.webp','umbrella.webp'],
  winter: ['boots.webp','cabin.webp','coat.webp','cocoa.webp','earmuffs.webp','evergreen.webp','fireplace.webp','hat.webp','hockey.webp','ice.webp','icicle.webp','igloo.webp','mittens.webp','owl.webp','penguin.webp','pine.webp','pinecone.webp','polar-bear.webp','seal.webp','shovel.webp','skating.webp','skiing.webp','sled.webp','sledding.webp','sleigh.webp','snowboarding.webp','snowflake.webp','snowman.webp','sweater.webp','walrus.webp'],
  'farm animals': ['bee.webp','bull.webp','calf.webp','cat.webp','cat-2.webp','chick.webp','chicken.webp','cow.webp','dog.webp','donkey.webp','duck.webp','duckling.webp','foal.webp','goat.webp','goose.webp','hen.webp','horse.webp','horse-2.webp','lamb.webp','llama.webp','owl.webp','ox.webp','pig.webp','rabbit.webp','rooster.webp','sheep.webp','turkey.webp'],
  'forest creatures': ['ant.webp','badger.webp','bat.webp','bear.webp','beaver.webp','bee.webp','blue-jay.webp','butterfly.webp','cardinal.webp','caterpillar.webp','chipmunk.webp','deer.webp','dragonfly.webp','eagle.webp','earthworm.webp','finch.webp','firefly.webp','fox.webp','frog.webp','gopher.webp','grasshopper.webp','hawk.webp','hedgehog.webp','ladybug.webp','lizard.webp','moose.webp','mouse.webp','owl.webp','porcupine.webp','rabbit.webp','raccoon.webp','slug.webp','snail.webp','spider.webp','squirrel.webp','toad.webp','turkey.webp','turtle.webp','weasel.webp','wolf.webp','woodpecker.webp'],
  'insects and bugs': ['ant.webp','bee.webp','butterfly.webp','caterpillar.webp','centipede.webp','cricket.webp','dragonfly.webp','ladybug.webp','millipede.webp','mosquito.webp','slug.webp','snail.webp','spider.webp','wasp.webp','worm.webp'],
  'ocean life': ['angelfish.webp','clownfish.webp','coral.webp','crab.webp','dolphin.webp','fish.webp','jellyfish.webp','manatee.webp','narwhal.webp','octopus.webp','orca.webp','oyster.webp','pufferfish.webp','ray.webp','scallop.webp','sea-horse.webp','sea-lion.webp','sea-turtle.webp','seal.webp','seaweed.webp','shark.webp','shrimp.webp','squid.webp','starfish.webp','tuna.webp','whale.webp'],
  'zoo animals': ['antelope.webp','armadillo.webp','bat.webp','bear.webp','bison.webp','camel.webp','cheetah.webp','chimpanzee.webp','elephant.webp','fox.webp','gazelle.webp','giraffe.webp','gorilla.webp','hippopotamus.webp','hyena.webp','jaguar.webp','kangaroo.webp','koala.webp','lemur.webp','leopard.webp','lion.webp','meerkat.webp','monkey.webp','moose.webp','orangutan.webp','otter.webp','panda.webp','polar-bear.webp','reindeer.webp','rhinoceros.webp','sea-lion.webp','seal.webp','sloth.webp','tiger.webp','wolf.webp','zebra.webp'],
  'around the house': ['alarm-clock.webp','armchair.webp','bathtub.webp','bed.webp','blender.webp','bookshelf.webp','bowl.webp','broom.webp','brush.webp','cabinet.webp','carpet.webp','chair.webp','clock.webp','closet.webp','coffee-table.webp','comb.webp','computer.webp','couch.webp','cup.webp','curtains.webp','cushion.webp','desk.webp','dishwasher.webp','door.webp','dresser.webp','dryer.webp','dustpan.webp','fan.webp','faucet.webp','fence.webp','fireplace.webp','floor-lamp.webp','fork.webp','fridge.webp','garage.webp','gate.webp','glass.webp','grill.webp','hammer.webp','heater.webp','hose.webp','iron.webp','ironing-board.webp','kettle.webp','key.webp','kitchen.webp','knife.webp','lamp.webp','laundry-basket.webp','lawn-mower.webp','light-switch.webp','lock.webp','mailbox.webp','microwave.webp','mirror.webp','mop.webp','nightstand.webp','outlet.webp','oven.webp','pan.webp','pen.webp','pencil.webp','picture-frame.webp','pillow.webp','plate.webp','pot.webp','rake.webp','refrigerator.webp','remote-control.webp','rug.webp','scissors.webp','shampoo.webp','shovel.webp','sink.webp','sofa.webp','spoon.webp','stairs.webp','stove.webp','table.webp','telephone.webp','television.webp','toaster.webp','toilet.webp','toilet-paper.webp','toolbox.webp','toothbrush.webp','toothpaste.webp','trash-can.webp','vacuum-cleaner.webp','vase.webp','wardrobe.webp','washing-machine.webp','watering-can.webp','window.webp'],
  'sports bw': ['badminton.webp','baseball.webp','baseball-2.webp','basketball.webp','beach-ball.webp','bicycle.webp','bowling.webp','boxing.webp','cap.webp','cricket.webp','dart.webp','dumbbell.webp','dumbbell-2.webp','eight-ball.webp','flag.webp','football.webp','football-2.webp','goggles.webp','golf.webp','golf-2.webp','helmet.webp','hockey.webp','ice-skate.webp','kettlebell.webp','race-car.webp','rollerblade.webp','rosette.webp','scale.webp','scooter.webp','skateboard.webp','soccer.webp','stopwatch-2.webp','table-tennis.webp','tape-measure.webp','tennis.webp','trophy.webp','volleyball.webp','whistle.webp'],
};

// ============================================================
// GERMAN TRANSLATIONS (from DB: image_library_items.translations->>'de')
// ============================================================
const DE_TRANSLATIONS = {
  animals: {antelope:'Antilope',bat:'Fledermaus',camel:'Kamel',cat:'Katze',dog:'Hund',dolphin:'Delfin',donkey:'Esel',duck:'Ente',elephant:'Elefant',fish:'Fisch',fox:'Fuchs',giraffe:'Giraffe',hippopotamus:'Nilpferd',horse:'Pferd',iguana:'Leguan',jaguar:'Jaguar',koala:'Koala',leopard:'Leopard',moose:'Elch',orangutan:'Orang-Utan',owl:'Eule',panda:'Panda',penguin:'Pinguin',pig:'Schwein',rabbit:'Kaninchen',raccoon:'Waschbär',reindeer:'Rentier',seagull:'Möwe',sheep:'Schaf',swan:'Schwan',tiger:'Tiger',turtle:'Schildkröte',vulture:'Geier',whale:'Wal',wolf:'Wolf',woodpecker:'Specht',zebra:'Zebra'},
  birds: {eagle:'Adler',flamingo:'Flamingo',hornbill:'Nashornvogel',macaw:'Ara',ostrich:'Strauß',owl:'Eule',parrot:'Papagei',peacock:'Pfau',pelican:'Pelikan',penguin:'Pinguin',toucan:'Tukan',vulture:'Geier'},
  camping: {backpack:'Rucksack',bear:'Bär',binoculars:'Fernglas',boots:'Stiefel',cabin:'Hütte',camper:'Wohnmobil',campfire:'Lagerfeuer','camping-chair':'Campingstuhl',canoe:'Kanu',compass:'Kompass',cooler:'Kühlbox',deer:'Hirsch',firefly:'Glühwürmchen',fish:'Fisch','fishing-rod':'Angelrute',flashlight:'Taschenlampe',forest:'Wald',fox:'Fuchs',frog:'Frosch',grill:'Grill',hammock:'Hängematte',hat:'Hut','hot-dog':'Hotdog',kayak:'Kajak',kettle:'Wasserkocher',lake:'See',lantern:'Laterne',log:'Holzscheit',map:'Karte',moon:'Mond',mountain:'Berg',oar:'Ruder',owl:'Eule','picnic-table':'Picknicktisch','pine-tree':'Kiefer',pinecone:'Tannenzapfen',rabbit:'Kaninchen',raccoon:'Waschbär',river:'Fluss',rock:'Felsen',rope:'Seil','sleeping-bag':'Schlafsack',squirrel:'Eichhörnchen',tent:'Zelt',trail:'Wanderweg',vest:'Weste',water:'Wasser'},
  christmas: {angel:'Engel',bell:'Glocke',candle:'Kerze','candy-cane':'Zuckerstange',chimney:'Schornstein',church:'Kirche',cookie:'Keks','crystal-ball':'Schneekugel',elf:'Elf',garland:'Girlande',gingerbread:'Lebkuchen',lights:'Lichterkette',mistletoe:'Mistelzweig',nativity:'Krippe',nutcracker:'Nussknacker',ornament:'Christbaumkugel',present:'Geschenk',reindeer:'Rentier',ribbon:'Band',rudolph:'Rudolph',sack:'Sack',santa:'Weihnachtsmann',sleigh:'Schlitten',snowman:'Schneemann',star:'Stern',stocking:'Weihnachtsstrumpf',tree:'Baum',wreath:'Kranz'},
  classroom: {backpack:'Rucksack',binder:'Ordner',book:'Buch',cabinet:'Schrank',calculator:'Taschenrechner',calender:'Kalender',chair:'Stuhl',clock:'Uhr',computer:'Computer',crayon:'Wachsmalstift',desk:'Schreibtisch',eraser:'Radiergummi',folder:'Mappe',globe:'Globus',glue:'Kleber',librarian:'Bibliothekar',lunchbox:'Brotdose',map:'Karte',marker:'Marker',notebook:'Notizbuch',paper:'Papier',pen:'Stift',pencil:'Bleistift',ruler:'Lineal',scissors:'Schere',shelf:'Regal',stapler:'Hefter',student:'Schüler',table:'Tisch',tablet:'Tablet',tape:'Klebeband',teacher:'Lehrer',whiteboard:'Whiteboard'},
  dinosaurs: {allosaurus:'Allosaurus',ankylosaurus:'Ankylosaurus',apatosaurus:'Apatosaurus',argentinosaurus:'Argentinosaurus',brachiosaurus:'Brachiosaurus',brontosaurus:'Brontosaurus',carnotaurus:'Carnotaurus',deinonychus:'Deinonychus',dimetrodon:'Dimetrodon',diplodocus:'Diplodocus',giganotosaurus:'Giganotosaurus',ichthyosaurus:'Ichthyosaurus',iguanodon:'Iguanodon',maiasaura:'Maiasaura',mosasaurus:'Mosasaurus',oviraptor:'Oviraptor',pachycephalosaurus:'Pachycephalosaurus',parasaurolophus:'Parasaurolophus',plesiosaurus:'Plesiosaurus',stegosaurus:'Stegosaurus',styracosaurus:'Styracosaurus',therizinosaurus:'Therizinosaurus',triceratops:'Triceratops','tyrannosaurus-rex':'Tyrannosaurus Rex',velociraptor:'Velociraptor'},
  flowers: {aster:'Aster',azalea:'Azalee',begonia:'Begonie',bluebell:'Glockenblume',buttercup:'Butterblume',carnation:'Nelke','cherry-blossom':'Kirschblüte',clover:'Klee',columbine:'Akelei',cornflower:'Kornblume',crocus:'Krokus',daffodil:'Narzisse',dahlia:'Dahlie',dandelion:'Löwenzahn','forget-me-not':'Vergissmeinnicht',forsythia:'Forsythie',hibiscus:'Hibiskus',hydrangea:'Hortensie',jasmine:'Jasmin',lavender:'Lavendel',lilac:'Flieder',lily:'Lilie',lotus:'Lotus',marigold:'Ringelblume','morning-glory':'Trichterwinde',orchid:'Orchidee',peony:'Pfingstrose',petunia:'Petunie',phlox:'Phlox',rose:'Rose',snowdrop:'Schneeglöckchen',sunflower:'Sonnenblume',trillium:'Waldlilie',tulip:'Tulpe',violet:'Veilchen','water-lily':'Seerose',wisteria:'Glyzinie',zinnia:'Zinnie'},
  fruits: {apple:'Apfel',apricot:'Aprikose',avocado:'Avocado',banana:'Banane',blackberry:'Brombeere',blueberry:'Blaubeere',cherry:'Kirsche',clementine:'Clementine',coconut:'Kokosnuss',cranberry:'Cranberry',dragonfruit:'Drachenfrucht',fig:'Feige',grapefruit:'Grapefruit',kiwi:'Kiwi',lemon:'Zitrone',lime:'Limette',mango:'Mango',nectarine:'Nektarine',orange:'Orange',papaya:'Papaya',peach:'Pfirsich',pear:'Birne',persimmon:'Kaki',pineapple:'Ananas',plum:'Pflaume',pomegranate:'Granatapfel',raspberry:'Himbeere',strawberry:'Erdbeere',watermelon:'Wassermelone'},
  music: {accordion:'Akkordeon',cymbals:'Becken',drum:'Trommel',flute:'Flöte',guitar:'Gitarre',harp:'Harfe',keyboard:'Keyboard',note:'Musiknote',piano:'Klavier',saxophone:'Saxophon',singer:'Sänger',stage:'Bühne',trombone:'Posaune',trumpet:'Trompete',violin:'Violine',xylophone:'Xylophon'},
  pets: {cat:'Katze',chinchilla:'Chinchilla',cockatiel:'Nymphensittich',dog:'Hund',ferret:'Frettchen',finch:'Fink',fish:'Fisch',frog:'Frosch',gecko:'Gecko',gerbil:'Rennmaus',goldfish:'Goldfisch','guinea-pig':'Meerschweinchen',hamster:'Hamster',iguana:'Leguan',lizard:'Eidechse',mouse:'Maus',parrot:'Papagei',rabbit:'Kaninchen',tortoise:'Schildkröte',turtle:'Wasserschildkröte'},
  shapes: {circle:'Kreis',cone:'Kegel',cube:'Würfel',cylinder:'Zylinder',diamond:'Raute',heart:'Herz',heptagon:'Siebeneck',hexagon:'Sechseck',moon:'Mond',octogon:'Achteck',oval:'Oval',parallelogram:'Parallelogramm',pentagon:'Fünfeck',pyramid:'Pyramide',rectangle:'Rechteck','rectangular-box':'Quader',sphere:'Kugel',square:'Quadrat',star:'Stern',trapezoid:'Trapez',triangle:'Dreieck'},
  space: {asteroid:'Asteroid',astronaut:'Astronaut',comet:'Komet',earth:'Erde',galaxy:'Galaxie',jupiter:'Jupiter',mars:'Mars',mercury:'Merkur',meteor:'Meteor',moon:'Mond',neptune:'Neptun',planet:'Planet',rocket:'Rakete',satellite:'Satellit',saturn:'Saturn',sun:'Sonne',telescope:'Teleskop',uranus:'Uranus',venus:'Venus'},
  spring: {bee:'Biene',bicycle:'Fahrrad',bird:'Vogel',birdhouse:'Vogelhaus',bud:'Knospe',bunny:'Häschen',butterfly:'Schmetterling',caterpillar:'Raupe',chick:'Küken',cloud:'Wolke',duckling:'Entchen','easter-egg':'Osterei',flower:'Blume',frog:'Frosch',garden:'Garten',grass:'Gras',kite:'Drachen',lamb:'Lamm',leaf:'Blatt',nest:'Nest',puddle:'Pfütze',rain:'Regen','rain-boots':'Gummistiefel',rainbow:'Regenbogen',raincoat:'Regenmantel',robin:'Rotkehlchen',shovel:'Schaufel',snail:'Schnecke',sun:'Sonne',tulip:'Tulpe',umbrella:'Regenschirm','watering-can':'Gießkanne',worm:'Wurm'},
  summer: {barbecue:'Grill',beach:'Strand','beach-ball':'Wasserball',bucket:'Eimer',butterfly:'Schmetterling',campfire:'Lagerfeuer',cap:'Mütze',crab:'Krabbe',dolphin:'Delfin','flip-flops':'Flip-Flops',flower:'Blume','hot-dog':'Hotdog','ice-cream':'Eiscreme',jellyfish:'Qualle',kite:'Drachen',ladybug:'Marienkäfer',lemonade:'Limonade','life-jacket':'Schwimmweste','palm-tree':'Palme',pineapple:'Ananas',pool:'Schwimmbad',popsicle:'Eis am Stiel',rainbow:'Regenbogen',sand:'Sand',sandals:'Sandalen',sandcastle:'Sandburg',seashell:'Muschel',shorts:'Shorts',spade:'Schaufel',starfish:'Seestern',strawberry:'Erdbeere',sunglasses:'Sonnenbrille','sun-hat':'Sonnenhut',surfboard:'Surfbrett',swimming:'Schwimmen',swimsuit:'Badeanzug','t-shirt':'T-Shirt',tent:'Zelt',umbrella:'Sonnenschirm',watermelon:'Wassermelone'},
  tools: {bolt:'Schraube','caulking-gun':'Kartuschenpistole','electric-drill':'Bohrmaschine','extension-cord':'Verlängerungskabel',flashlight:'Taschenlampe',hammer:'Hammer',handsaw:'Handsäge',ladder:'Leiter',nail:'Nagel',nut:'Mutter','paint-brush':'Pinsel',pliers:'Zange',plunger:'Saugglocke',screwdriver:'Schraubenzieher',spanner:'Schraubenschlüssel','spirit-level':'Wasserwaage','tape-measure':'Maßband'},
  toys: {airplane:'Flugzeug',baby:'Baby','baby-girl':'Baby Mädchen',ball:'Ball',balloon:'Luftballon',bicycle:'Fahrrad',blocks:'Bauklötze',boat:'Boot',bucket:'Eimer',car:'Auto',cards:'Karten',chess:'Schach',crayons:'Buntstifte',dice:'Würfel',dinosaur:'Dinosaurier',doll:'Puppe',domino:'Domino',girl:'Mädchen',helicopter:'Hubschrauber',kite:'Drachen',lego:'Lego','race-car':'Rennauto',robot:'Roboter',rocket:'Rakete',sandbox:'Sandkasten',scooter:'Roller',shovel:'Schaufel',skateboard:'Skateboard',slide:'Rutsche',swing:'Schaukel','teddy-bear':'Teddybär',train:'Zug',truck:'Lastwagen','video-game':'Videospiel'},
  vegetables: {asparagus:'Spargel',beetroot:'Rote Bete','bell-pepper':'Paprika',broccoli:'Brokkoli',cabbage:'Kohl',carrot:'Karotte',cauliflower:'Blumenkohl',celery:'Sellerie','chilli-pepper':'Chilischote',corn:'Mais',cucumber:'Gurke',eggplant:'Aubergine',garlic:'Knoblauch','green-beans':'Grüne Bohnen',leek:'Lauch',lettuce:'Salat',mushroom:'Pilz',onion:'Zwiebel',parsnip:'Pastinake',potato:'Kartoffel',pumpkin:'Kürbis',radish:'Radieschen',spinach:'Spinat',squash:'Kürbis',tomato:'Tomate',turnip:'Rübe'},
  vehicles: {airplane:'Flugzeug',ambulance:'Krankenwagen',bicycle:'Fahrrad',boat:'Boot',bulldozer:'Bulldozer',bus:'Bus',canoe:'Kanu',car:'Auto','cement-mixer':'Betonmischer',crane:'Kran','dump-truck':'Kipplaster',excavator:'Bagger',ferry:'Fähre','fire-truck':'Feuerwehrauto',forklift:'Gabelstapler','garbage-truck':'Müllwagen',helicopter:'Hubschrauber',jeep:'Jeep',jet:'Düsenflugzeug','mail-truck':'Postauto','monster-truck':'Monstertruck',motorcycle:'Motorrad','police-car':'Polizeiauto','race-car':'Rennwagen',rocket:'Rakete',sailboat:'Segelboot','school-bus':'Schulbus',scooter:'Roller',ship:'Schiff',skateboard:'Skateboard',submarine:'U-Boot',subway:'U-Bahn',taxi:'Taxi','tow-truck':'Abschleppwagen',tractor:'Traktor',train:'Zug',truck:'Lastwagen',van:'Lieferwagen',yacht:'Yacht'},
  weather: {cloud:'Wolke',cloudy:'Bewölkt',cold:'Kalt',hot:'Heiß',mittens:'Fäustlinge','partly-cloudy':'Teilweise bewölkt',puddle:'Pfütze','rain-boots':'Gummistiefel',rainbow:'Regenbogen',raincoat:'Regenmantel',raindrop:'Regentropfen',rainy:'Regnerisch',scarf:'Schal',snowflake:'Schneeflocke',stormy:'Stürmisch',sun:'Sonne',sunglasses:'Sonnenbrille',sunny:'Sonnig',thermometer:'Thermometer',thunderstorm:'Gewitter',umbrella:'Regenschirm'},
  winter: {boots:'Stiefel',cabin:'Hütte',coat:'Mantel',cocoa:'Heiße Schokolade',earmuffs:'Ohrenschützer',evergreen:'Immergrün',fireplace:'Kamin',hat:'Wintermütze',hockey:'Eishockey',ice:'Eis',icicle:'Eiszapfen',igloo:'Iglu',mittens:'Fäustlinge',owl:'Eule',penguin:'Pinguin',pine:'Kiefer',pinecone:'Tannenzapfen','polar-bear':'Eisbär',seal:'Robbe',shovel:'Schneeschaufel',skating:'Schlittschuhlaufen',skiing:'Skifahren',sled:'Schlitten',sledding:'Rodeln',sleigh:'Pferdeschlitten',snowboarding:'Snowboarden',snowflake:'Schneeflocke',snowman:'Schneemann',sweater:'Pullover',walrus:'Walross'},
  'farm animals': {bee:'Biene',bull:'Stier',calf:'Kalb',cat:'Katze','cat-2':'Katze 2',chick:'Küken',chicken:'Huhn',cow:'Kuh',dog:'Hund',donkey:'Esel',duck:'Ente',duckling:'Entchen',foal:'Fohlen',goat:'Ziege',goose:'Gans',hen:'Henne',horse:'Pferd','horse-2':'Pferd 2',lamb:'Lamm',llama:'Lama',owl:'Eule',ox:'Ochse',pig:'Schwein',rabbit:'Kaninchen',rooster:'Hahn',sheep:'Schaf',turkey:'Truthahn'},
  'forest creatures': {ant:'Ameise',badger:'Dachs',bat:'Fledermaus',bear:'Bär',beaver:'Biber',bee:'Biene','blue-jay':'Blauhäher',butterfly:'Schmetterling',cardinal:'Kardinal',caterpillar:'Raupe',chipmunk:'Streifenhörnchen',deer:'Hirsch',dragonfly:'Libelle',eagle:'Adler',earthworm:'Regenwurm',finch:'Fink',firefly:'Glühwürmchen',fox:'Fuchs',frog:'Frosch',gopher:'Erdhörnchen',grasshopper:'Heuschrecke',hawk:'Habicht',hedgehog:'Igel',ladybug:'Marienkäfer',lizard:'Eidechse',moose:'Elch',mouse:'Maus',owl:'Eule',porcupine:'Stachelschwein',rabbit:'Kaninchen',raccoon:'Waschbär',slug:'Nacktschnecke',snail:'Schnecke',spider:'Spinne',squirrel:'Eichhörnchen',toad:'Kröte',turkey:'Truthahn',turtle:'Schildkröte',weasel:'Wiesel',wolf:'Wolf',woodpecker:'Specht'},
  'insects and bugs': {ant:'Ameise',bee:'Biene',butterfly:'Schmetterling',caterpillar:'Raupe',centipede:'Tausendfüßler',cricket:'Grille',dragonfly:'Libelle',ladybug:'Marienkäfer',millipede:'Tausendfüßer',mosquito:'Mücke',slug:'Nacktschnecke',snail:'Schnecke',spider:'Spinne',wasp:'Wespe',worm:'Wurm'},
  'ocean life': {angelfish:'Kaiserfisch',clownfish:'Clownfisch',coral:'Koralle',crab:'Krabbe',dolphin:'Delfin',fish:'Fisch',jellyfish:'Qualle',manatee:'Seekuh',narwhal:'Narwal',octopus:'Oktopus',orca:'Orca',oyster:'Auster',pufferfish:'Kugelfisch',ray:'Rochen',scallop:'Jakobsmuschel','sea-horse':'Seepferdchen','sea-lion':'Seelöwe','sea-turtle':'Meeresschildkröte',seal:'Robbe',seaweed:'Seetang',shark:'Hai',shrimp:'Garnele',squid:'Tintenfisch',starfish:'Seestern',tuna:'Thunfisch',whale:'Wal'},
  'zoo animals': {antelope:'Antilope',armadillo:'Gürteltier',bat:'Fledermaus',bear:'Bär',bison:'Bison',camel:'Kamel',cheetah:'Gepard',chimpanzee:'Schimpanse',elephant:'Elefant',fox:'Fuchs',gazelle:'Gazelle',giraffe:'Giraffe',gorilla:'Gorilla',hippopotamus:'Nilpferd',hyena:'Hyäne',jaguar:'Jaguar',kangaroo:'Känguru',koala:'Koala',lemur:'Lemur',leopard:'Leopard',lion:'Löwe',meerkat:'Erdmännchen',monkey:'Affe',moose:'Elch',orangutan:'Orang-Utan',otter:'Otter',panda:'Panda','polar-bear':'Eisbär',reindeer:'Rentier',rhinoceros:'Nashorn','sea-lion':'Seelöwe',seal:'Robbe',sloth:'Faultier',tiger:'Tiger',wolf:'Wolf',zebra:'Zebra'},
  'around the house': {'alarm-clock':'Wecker',armchair:'Sessel',bathtub:'Badewanne',bed:'Bett',blender:'Mixer',bookshelf:'Bücherregal',bowl:'Schüssel',broom:'Besen',brush:'Bürste',cabinet:'Schrank',carpet:'Teppich',chair:'Stuhl',clock:'Uhr',closet:'Schrank','coffee-table':'Couchtisch',comb:'Kamm',computer:'Computer',couch:'Couch',cup:'Tasse',curtains:'Vorhänge',cushion:'Kissen',desk:'Schreibtisch',dishwasher:'Geschirrspüler',door:'Tür',dresser:'Kommode',dryer:'Trockner',dustpan:'Kehrschaufel',fan:'Ventilator',faucet:'Wasserhahn',fence:'Zaun',fireplace:'Kamin','floor-lamp':'Stehlampe',fork:'Gabel',fridge:'Kühlschrank',garage:'Garage',gate:'Tor',glass:'Glas',grill:'Grill',hammer:'Hammer',heater:'Heizung',hose:'Schlauch',iron:'Bügeleisen','ironing-board':'Bügelbrett',kettle:'Wasserkocher',key:'Schlüssel',kitchen:'Küche',knife:'Messer',lamp:'Lampe','laundry-basket':'Wäschekorb','lawn-mower':'Rasenmäher','light-switch':'Lichtschalter',lock:'Schloss',mailbox:'Briefkasten',microwave:'Mikrowelle',mirror:'Spiegel',mop:'Mopp',nightstand:'Nachttisch',outlet:'Steckdose',oven:'Ofen',pan:'Pfanne',pen:'Stift',pencil:'Bleistift','picture-frame':'Bilderrahmen',pillow:'Kissen',plate:'Teller',pot:'Topf',rake:'Rechen',refrigerator:'Kühlschrank','remote-control':'Fernbedienung',rug:'Teppich',scissors:'Schere',shampoo:'Shampoo',shovel:'Schaufel',sink:'Spüle',sofa:'Sofa',spoon:'Löffel',stairs:'Treppe',stove:'Herd',table:'Tisch',telephone:'Telefon',television:'Fernseher',toaster:'Toaster',toilet:'Toilette','toilet-paper':'Toilettenpapier',toolbox:'Werkzeugkasten',toothbrush:'Zahnbürste',toothpaste:'Zahnpasta','trash-can':'Mülleimer','vacuum-cleaner':'Staubsauger',vase:'Vase',wardrobe:'Kleiderschrank','washing-machine':'Waschmaschine','watering-can':'Gießkanne',window:'Fenster'},
  'sports bw': {badminton:'Badminton',baseball:'Baseball','baseball-2':'Baseball 2',basketball:'Basketball','beach-ball':'Wasserball',bicycle:'Fahrrad',bowling:'Bowling',boxing:'Boxen',cap:'Mütze',cricket:'Cricket',dart:'Dartpfeil',dumbbell:'Hantel','dumbbell-2':'Hantel 2','eight-ball':'Billardkugel',flag:'Flagge',football:'Football','football-2':'Football 2',goggles:'Schwimmbrille',golf:'Golf','golf-2':'Golf 2',helmet:'Helm',hockey:'Hockey','ice-skate':'Schlittschuh',kettlebell:'Kugelhantel','race-car':'Rennwagen',rollerblade:'Inlineskate',rosette:'Rosette',scale:'Waage',scooter:'Roller',skateboard:'Skateboard',soccer:'Fußball','stopwatch-2':'Stoppuhr','table-tennis':'Tischtennis','tape-measure':'Maßband',tennis:'Tennis',trophy:'Pokal',volleyball:'Volleyball',whistle:'Pfeife'},
};

// ============================================================
// TOPIC → THEME MAPPING
// ============================================================

const IDEA_MAPPING = {
  'back-to-school-printable-ideas': 'classroom',
  'birds-printable-ideas': 'birds',
  'bulk-licensing-printable-ideas': 'animals',
  'camping-printable-ideas': 'camping',
  'christmas-printable-ideas': 'christmas',
  'construction-printable-ideas': 'tools',
  'custom-worksheet-service-ideas': 'animals',
  'digital-download-printable-ideas': 'animals',
  'dinosaur-printable-ideas': 'dinosaurs',
  'easter-printable-ideas': 'spring',
  'esl-printable-ideas': 'classroom',
  'fairy-tale-printable-ideas': 'animals',
  'farm-animals-printable-ideas': 'farm animals',
  'first-grade-printable-ideas': 'classroom',
  'food-cooking-printable-ideas': 'fruits',
  'forest-animals-printable-ideas': 'forest creatures',
  'halloween-printable-ideas': 'animals',
  'homeschool-printable-ideas': 'classroom',
  'insects-printable-ideas': 'insects and bugs',
  'kindergarten-printable-ideas': 'toys',
  'math-facts-printable-ideas': 'shapes',
  'music-printable-ideas': 'music',
  'ocean-animals-printable-ideas': 'ocean life',
  'parents-day-printable-ideas': 'flowers',
  'party-supply-printable-ideas': 'animals',
  'pets-printable-ideas': 'pets',
  'physical-printable-product-ideas': 'animals',
  'pirates-printable-ideas': 'ocean life',
  'preschool-printable-ideas': 'toys',
  'print-on-demand-printable-ideas': 'animals',
  'safari-animals-printable-ideas': 'zoo animals',
  'second-grade-printable-ideas': 'classroom',
  'space-printable-ideas': 'space',
  'special-education-printable-ideas': 'shapes',
  'sports-printable-ideas': 'sports bw',
  'spring-printable-ideas': 'spring',
  'subscription-box-printable-ideas': 'animals',
  'summer-learning-printable-ideas': 'summer',
  'summer-printable-ideas': 'summer',
  'thanksgiving-printable-ideas': 'fruits',
  'third-grade-printable-ideas': 'classroom',
  'transportation-printable-ideas': 'vehicles',
  'underwater-printable-ideas': 'ocean life',
  'valentines-day-printable-ideas': 'flowers',
  'winter-printable-ideas': 'winter',
};

const GUIDE_MAPPING = {
  'create-addition-worksheets': 'animals',
  'create-alphabet-worksheets': 'farm animals',
  'create-bingo-cards': 'ocean life',
  'create-chart-count-worksheets': 'fruits',
  'create-coloring-pages': 'dinosaurs',
  'create-counting-worksheets': 'zoo animals',
  'create-crossword-puzzles': 'pets',
  'create-cryptogram-puzzles': 'birds',
  'create-drawing-worksheets': 'vehicles',
  'create-etsy-coloring-pages': 'forest creatures',
  'create-etsy-worksheet-bundles': 'flowers',
  'create-handwriting-sheets': 'animals',
  'create-hidden-object-worksheets': 'camping',
  'create-matching-worksheets': 'insects and bugs',
  'create-math-puzzle-worksheets': 'space',
  'create-maze-worksheets': 'animals',
  'create-missing-pieces-puzzles': 'farm animals',
  'create-odd-one-out-puzzles': 'vegetables',
  'create-pattern-worksheets': 'shapes',
  'create-picture-sudoku': 'ocean life',
  'create-preposition-worksheets': 'around the house',
  'create-printable-product-line': 'dinosaurs',
  'create-sell-tpt-resources': 'classroom',
  'create-shadow-matching-worksheets': 'zoo animals',
  'create-size-comparison-worksheets': 'fruits',
  'create-sorting-worksheets': 'pets',
  'create-subtraction-worksheets': 'birds',
  'create-treasure-hunt-worksheets': 'camping',
  'create-word-search-puzzles': 'animals',
  'create-worksheet-bundles': 'forest creatures',
  'automate-printable-business': 'vehicles',
  'best-kdp-activity-book-niches': 'dinosaurs',
  'copyright-printable-sellers': 'zoo animals',
  'customer-support-digital-products': 'pets',
  'digital-vs-physical-printables': 'fruits',
  'email-marketing-printables': 'birds',
  'etsy-seo-educational-printables': 'farm animals',
  'get-reviews-printable-products': 'flowers',
  'kdp-formatting-worksheets': 'ocean life',
  'kdp-vs-etsy-printables': 'dinosaurs',
  'make-money-kdp-activity-books': 'forest creatures',
  'math-activity-books-kdp': 'shapes',
  'multilingual-printable-business': 'animals',
  'niche-selection-printables': 'insects and bugs',
  'passive-income-worksheets': 'zoo animals',
  'pinterest-marketing-worksheets': 'camping',
  'price-etsy-printables': 'vegetables',
  'pricing-educational-printables': 'fruits',
  'publish-puzzle-books-kdp': 'space',
  'quality-standards-worksheets': 'pets',
  'research-profitable-niches': 'birds',
  'scale-printable-business-guide': 'vehicles',
  'seasonal-marketing-printables': 'christmas',
  'sell-creative-fabrica': 'farm animals',
  'sell-educational-printables-etsy': 'flowers',
  'sell-math-worksheets-etsy': 'shapes',
  'sell-printables-gumroad': 'ocean life',
  'sell-word-search-etsy': 'forest creatures',
  'social-media-printable-marketing': 'animals',
  'start-etsy-printable-shop': 'dinosaurs',
  'sudoku-books-kdp': 'zoo animals',
  'tpt-store-optimization': 'classroom',
  'understanding-commercial-licenses': 'weather',
  'word-search-books-kdp': 'camping',
  'worksheets-multiple-languages': 'animals',
};

const START_MAPPING = {
  'amazon-kdp-activity-books': 'dinosaurs',
  'commercial-license-guide': 'zoo animals',
  'complete-guide-printable-business': 'animals',
  'create-multilingual-worksheets': 'birds',
  'create-worksheets-that-sell': 'farm animals',
  'etsy-printable-business': 'pets',
  'marketing-printable-business': 'vehicles',
  'printable-business-blueprint': 'flowers',
  'printable-business-income': 'ocean life',
  'printable-business-legal': 'forest creatures',
  'scaling-printable-business': 'fruits',
  'tools-for-printable-business': 'insects and bugs',
};

const BUNDLE_MAPPING = {
  'literacy-bundle': 'animals',
  'matching-bundle': 'farm animals',
  'math-bundle': 'shapes',
  'puzzle-bundle': 'dinosaurs',
  'search-bundle': 'ocean life',
  'visual-bundle': 'zoo animals',
};

// How many images per content type
const IMAGES_PER_TYPE = {
  idea: 6,
  guide: 5,
  start: 5,
  bundle: 8,
};

// ============================================================
// HELPERS
// ============================================================

function filenameToName(filename) {
  // cat.webp -> Cat, ice-cream.webp -> Ice Cream, tyrannosaurus-rex.webp -> Tyrannosaurus Rex
  return filename.replace('.webp', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getDeTranslation(theme, filename) {
  const key = filename.replace('.webp', '');
  const themeTranslations = DE_TRANSLATIONS[theme];
  if (themeTranslations && themeTranslations[key]) {
    return themeTranslations[key];
  }
  // Fallback to English name
  return filenameToName(filename);
}

function buildThemeUrl(theme, filename) {
  // URL-encode spaces in theme folder names
  const encodedTheme = theme.replace(/ /g, '%20');
  return `/image-library/${encodedTheme}/${filename}`;
}

function pickImages(theme, count) {
  const files = THEME_FILES[theme];
  if (!files) {
    console.error(`  ERROR: No files found for theme "${theme}"`);
    return [];
  }
  // Pick first N (already sorted alphabetically)
  return files.slice(0, count);
}

function buildThemeImagesEN(theme, count) {
  const files = pickImages(theme, count);
  return files.map(f => {
    const name = filenameToName(f);
    return {
      src: buildThemeUrl(theme, f),
      alt: `${name} — themed educational image`,
      caption: name,
    };
  });
}

function buildThemeImagesDE(theme, count) {
  const files = pickImages(theme, count);
  return files.map(f => {
    const deName = getDeTranslation(theme, f);
    return {
      src: buildThemeUrl(theme, f),
      alt: `${deName} — thematisches Lernbild`,
      caption: deName,
    };
  });
}

function formatThemeImagesArray(images) {
  const lines = images.map(img => {
    const parts = [`src: '${img.src}'`, `alt: '${img.alt.replace(/'/g, "\\'")}'`];
    if (img.caption) {
      parts.push(`caption: '${img.caption.replace(/'/g, "\\'")}'`);
    }
    return `    { ${parts.join(', ')} }`;
  });
  return `  themeImages: [\n${lines.join(',\n')},\n  ],`;
}

// ============================================================
// FILE PROCESSING
// ============================================================

function processFile(filePath, theme, count, locale) {
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP (not found): ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if themeImages already exists
  if (content.includes('themeImages:') && content.includes('themeImages: [')) {
    console.log(`  SKIP (already has themeImages): ${path.basename(filePath)}`);
    return false;
  }

  // Build images
  const images = locale === 'en' ? buildThemeImagesEN(theme, count) : buildThemeImagesDE(theme, count);
  if (images.length === 0) return false;

  const themeImagesBlock = formatThemeImagesArray(images);

  // Find insertion point: before youtubeId or before the closing };
  // Strategy: insert before `youtubeId:` if present, otherwise before `};`
  let inserted = false;

  // Try inserting before youtubeId
  const youtubeMatch = content.match(/(\n\n\s*youtubeId:)/);
  if (youtubeMatch) {
    content = content.replace(youtubeMatch[1], `\n\n${themeImagesBlock}\n${youtubeMatch[1]}`);
    inserted = true;
  }

  if (!inserted) {
    // Insert before the closing `};` (last one)
    const lastClosing = content.lastIndexOf('};');
    if (lastClosing !== -1) {
      // Check if there's already a trailing comma/newline before };
      const before = content.substring(0, lastClosing).trimEnd();
      const after = content.substring(lastClosing);
      // Add themeImages before };
      content = before + '\n\n' + themeImagesBlock + '\n' + after;
      inserted = true;
    }
  }

  if (!inserted) {
    console.log(`  ERROR: Could not find insertion point in ${path.basename(filePath)}`);
    return false;
  }

  if (DRY_RUN) {
    console.log(`  DRY RUN: Would update ${path.basename(filePath)} with ${images.length} images from "${theme}"`);
    return true;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  UPDATED: ${path.basename(filePath)} — ${images.length} images from "${theme}"`);
  return true;
}

function processContentType(type, mapping, baseDir) {
  const count = IMAGES_PER_TYPE[type];
  let updated = 0;
  let total = 0;

  for (const [slug, theme] of Object.entries(mapping)) {
    total += 2; // EN + DE

    // EN
    const enPath = path.join(baseDir, `${type}-content`, 'en', `${slug}.ts`);
    if (processFile(enPath, theme, count, 'en')) updated++;

    // DE
    const dePath = path.join(baseDir, `${type}-content`, 'de', `${slug}.ts`);
    if (processFile(dePath, theme, count, 'de')) updated++;
  }

  return { updated, total };
}

// ============================================================
// MAIN
// ============================================================

function main() {
  const baseDir = path.join(__dirname, '..', 'frontend', 'config');

  console.log(`\nRestore Theme Images Script`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Filter: ${TYPE_FILTER || 'all'}\n`);

  const types = [
    { name: 'idea', mapping: IDEA_MAPPING },
    { name: 'guide', mapping: GUIDE_MAPPING },
    { name: 'start', mapping: START_MAPPING },
    { name: 'bundle', mapping: BUNDLE_MAPPING },
  ];

  let grandTotal = 0;
  let grandUpdated = 0;

  for (const { name, mapping } of types) {
    if (TYPE_FILTER && TYPE_FILTER !== name) continue;

    console.log(`\n=== ${name.toUpperCase()} CONTENT (${Object.keys(mapping).length} slugs × 2 locales) ===`);
    const { updated, total } = processContentType(name, mapping, baseDir);
    grandTotal += total;
    grandUpdated += updated;
    console.log(`  Result: ${updated}/${total} files updated`);
  }

  console.log(`\n=== GRAND TOTAL: ${grandUpdated}/${grandTotal} files updated ===\n`);
}

main();
