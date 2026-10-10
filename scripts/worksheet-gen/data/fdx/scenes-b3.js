/** data/fdx/scenes-b3.js — kitchen, living room, bedroom, classroom, bakery, toy shop, bathroom, party, market, picnic,
 *  street, station, village, camp, night, space, garden (read 2026-10-10). */
'use strict';
module.exports = (Sc) => [
  // ---------------------------------------------------------------- kitchen
  Sc('kitchen-cat', 'Cat in the Kitchen', 'kitchen', 0, 'animals bw 3/cat_3', ['home bw/refrigerator', 'kitchen bw/teapot', 'fruits bw/banana', 'furniture bw/chair', 'household bw/window', 'home bw/cuckoo_clock', 'animals bw 3/mouse']),
  Sc('kitchen-mouse', 'Mouse in the Kitchen', 'kitchen', 1, 'animals bw 4/mouse', ['kitchen bw/pot', 'household bw/window', 'fruits bw/apple', 'classroom bw 2/calendar'], { level: 1, mirror: true, heroScale: 2.4 }),
  Sc('kitchen-baking', 'Baking Day', 'kitchen', 2, 'animals bw 2/cat_2', ['home bw/oven', 'home bw/mixer', 'kitchen bw/kitchen_scale', 'food bw 2/bread', 'dessert bw/cupcake', 'fruits bw/pear', 'home bw/calendar', 'household bw/window', 'home bw 2/broom'], { level: 3, heroScale: 2.0 }),
  Sc('kitchen-dog', 'Dog in the Kitchen', 'kitchen', 0, 'animals bw 5/dog_3', ['kitchen bw/refrigerator', 'home bw/toaster', 'kitchen bw/electric_kettle', 'fruits bw/orange', 'home bw/cuckoo_clock', 'household bw/bucket', 'objects bw/bone'], { mirror: true }),
  // ---------------------------------------------------------------- living room
  Sc('living-cat', 'Cat in the Living Room', 'livingroom', 0, 'animals bw 4/cat_2', ['furniture bw/sofa', 'home and nature bw/frame', 'household bw/television', 'home and nature bw/plant', 'home bw 2/fireplace', 'toys bw/teddy_bear'], { heroScale: 2.0 }),
  Sc('living-dog', 'Dog by the Armchair', 'livingroom', 1, 'animals bw 2/dog', ['furniture bw/armchair', 'household bw/window', 'toys bw 2/dice', 'furniture bw/table_lamp'], { level: 1, mirror: true }),
  Sc('living-cosy', 'Cozy Living Room', 'livingroom', 2, 'animals bw/cat_2', ['furniture bw/coffee_table', 'home bw/rocking_chair', 'household bw/bookshelf', 'home bw 2/television', 'household bw/window', 'home bw/cuckoo_clock', 'home bw 2/vacuum_cleaner'], { level: 3, heroScale: 1.9 }),
  // ---------------------------------------------------------------- bedroom
  Sc('bed-teddy', 'Teddy in the Bedroom', 'bedroom', 0, 'toys bw/teddy_bear', ['furniture bw/bed', 'classroom bw 2/dresser', 'home bw/alarm_clock', 'household bw/window', 'toys bw 2/robot', 'home bw/lamp'], { heroScale: 2.0 }),
  Sc('bed-kitten', 'Kitten in the Bedroom', 'bedroom', 1, 'animals bw 3/cat_2', ['home bw 2/bed', 'household bw/window', 'toys bw/spinning_top', 'apparel bw/boots'], { level: 1, mirror: true, heroScale: 2.0 }),
  Sc('bed-hamster', 'Hamster in the Bedroom', 'bedroom', 2, 'animals bw 5/hamster', ['household bw/bed', 'furniture bw/wardrobe', 'furniture bw/nightstand', 'home and nature bw/desk_lamp', 'classroom bw 2/book', 'classroom bw 2/backpack', 'household bw/window', 'objects bw/sneakers'], { level: 3, heroScale: 2.6 }),
  // ---------------------------------------------------------------- classroom
  Sc('class-board', 'In the Classroom', 'classroom', 0, 'classroom bw 2/whiteboard', ['classroom bw 2/table', 'classroom bw 2/chair', 'classroom bw 2/backpack', 'household bw/window', 'classroom bw/book', 'education bw/crayon', 'classroom bw 2/bookshelf'], { heroScale: 1.4 }),
  Sc('class-desk', 'School Desk', 'classroom', 1, 'home bw 2/desk', ['classroom bw/chair', 'classroom bw 2/map', 'classroom bw 2/notebook', 'education bw/pencil'], { level: 1, mirror: true, heroScale: 1.6 }),
  Sc('class-science', 'Science Corner', 'classroom', 2, 'classroom bw/telescope', ['classroom bw 2/microscope', 'classroom bw 2/computer', 'classroom bw/whiteboard', 'education bw/backpack', 'furniture bw/filing_cabinet', 'classroom bw 2/calendar', 'furniture bw/stool'], { level: 3, heroScale: 1.6 }),
  // ---------------------------------------------------------------- bakery
  Sc('bakery-cake', 'At the Bakery', 'bakery', 0, 'dessert bw/cake', ['food bw/croissant', 'food bw 2/bread', 'dessert bw/donut', 'dessert bw/muffin', 'dessert bw/cupcake', 'food bw/pretzel', 'kitchen bw/rolling_pin'], { heroScale: 2.0 }),
  Sc('bakery-cupcake', 'Cupcakes for Sale', 'bakery', 1, 'food bw/cupcake_2', ['dessert bw/cake_2', 'food bw 2/donut', 'food bw 3/bread', 'dessert bw/pie'], { level: 1, mirror: true, heroScale: 2.0 }),
  Sc('bakery-cat', 'Cat at the Bakery', 'bakery', 2, 'farm bw/cat', ['food bw 2/cake_3', 'dessert bw/biscuit', 'food bw 3/croissant', 'food bw 2/muffin', 'dessert bw/waffle', 'kitchen bw/kitchen_scale', 'Christmas bw 2/gingerbread_house'], { level: 3, heroScale: 1.8 }),
  // ---------------------------------------------------------------- toy shop
  Sc('toy-robot', 'Robot in the Toy Shop', 'toyshop', 0, 'toys bw 2/robot', ['toys bw/rocket', 'toys bw/spinning_top', 'toys bw/drum', 'toys bw 2/xylophone', 'toys bw/monster_truck', 'toys bw/helicopter', 'toys bw 2/dice', 'toys bw 2/teddy_bear'], { heroScale: 1.8 }),
  Sc('toy-horse', 'Rocking Horse', 'toyshop', 1, 'toys bw/rocking_horse', ['toys bw/car', 'toys bw/drum', 'toys bw 2/puzzle', 'toys bw/train'], { level: 1, mirror: true, heroScale: 1.8 }),
  Sc('toy-dino', 'Toy Shop Shelves', 'toyshop', 2, 'toys bw/dinosaur', ['toys bw 2/guitar', 'toys bw/airplane', 'toys bw/helicopter', 'toys bw 2/telephone', 'classroom bw/puzzle', 'toys bw 2/rocket', 'Christmas bw 2/nutcracker', 'toys bw/video_game', 'toys bw 2/truck', 'animals bw 2/teddy_bear'], { level: 3, heroScale: 2.0 }),
  // ---------------------------------------------------------------- bathroom
  Sc('bath-tub', 'Bath Time', 'bathroom', 0, 'home bw/bathtub', ['household bw/toilet', 'household bw/sink', 'birds bw/duck', 'household bw/towel', 'objects bw/comb', 'household bw/toilet_paper'], { heroScale: 1.7 }),
  Sc('bath-cat', 'Cat in the Bathroom', 'bathroom', 1, 'animals bw 4/cat_3', ['household bw/bathtub', 'household bw/towel', 'home bw 2/bucket', 'household bw/towel', 'household bw/toilet'], { level: 1, mirror: true, heroScale: 2.0 }),
  Sc('bath-wash', 'Washing Day', 'bathroom', 2, 'home bw/washing_machine', ['home bw 2/bathtub', 'household bw/toilet', 'toys bw/duck', 'household bw/towel', 'household bw/bucket', 'household bw/broom', 'home bw 2/iron'], { level: 3, heroScale: 1.6 }),
  // ---------------------------------------------------------------- party
  Sc('party-dog', 'Birthday Party', 'party', 0, 'animals bw/dog', ['dessert bw/cake', 'valentine bw 2/gift', 'Easter bw 2/balloon', 'toys bw/party_hat', 'home bw/speaker', 'education bw/gift_box'], { heroScale: 1.9 }),
  Sc('party-gifts', 'Party Presents', 'party', 1, 'Christmas bw 2/gift_box', ['valentine bw/balloon', 'dessert bw/cupcake', 'toys bw 2/trumpet', 'valentine bw 2/gift', 'toys bw/party_hat'], { level: 1, mirror: true, heroScale: 1.8 }),
  Sc('party-bear', 'Teddy Bear Party', 'party', 2, 'valentine bw/teddy_bear', ['valentine bw 2/cake', 'Easter bw/gift', 'valentine bw/gift_box', 'Easter bw 2/balloon', 'valentine bw 2/balloon', 'toys bw/trumpet', 'food bw 2/pizza'], { level: 3, heroScale: 1.8 }),
  // ---------------------------------------------------------------- market
  Sc('market-veg', 'Vegetable Market', 'market', 0, 'farm bw/vegetables', ['Easter bw/carrot', 'vegetables bw/tomato', 'fruits bw/pineapple', 'vegetables bw 2/cauliflower', 'fruits bw/grapes', 'travel and holiday bw/shopping_cart', 'nature bw/sun', 'home and nature bw/cloud'], { heroScale: 1.6 }),
  Sc('market-fruit', 'Fruit Stall', 'market', 1, 'fruits bw/watermelon', ['fruits bw/banana', 'fruits bw/pear', 'fruits bw/strawberry', 'nature bw/sun'], { level: 1, mirror: true, heroScale: 1.8 }),
  Sc('market-dog', 'Dog at the Market', 'market', 2, 'animals bw 4/dog', ['vegetables bw/pumpkin', 'vegetables bw 2/eggplant', 'fruits bw/lemon', 'food bw/cheese', 'food bw/bread', 'beach bw 2/tote_bag', 'nature bw/sun', 'home and nature bw/cloud'], { level: 3 }),
  // ---------------------------------------------------------------- picnic
  Sc('picnic-dog', 'Picnic in the Sun', 'picnic', 0, 'farm bw/dog', ['Easter bw 2/basket', 'food bw/sandwich', 'beach bw/watermelon', 'home and nature bw/tree', 'nature bw/sun', 'home and nature bw/cloud', 'nature bw/butterfly']),
  Sc('picnic-bear', 'Teddy Picnic', 'picnic', 1, 'animals bw/teddy_bear_2', ['food bw/cheese', 'fruits bw/apple', 'nature bw/sun', 'home and nature bw/cloud'], { level: 1, mirror: true, heroScale: 1.8 }),
  Sc('picnic-rabbit', 'Picnic Fun', 'picnic', 2, 'animals bw 5/rabbit', ['food bw 3/sandwich_2', 'food bw/hot_dog', 'Easter bw/basket', 'home and nature bw/tree_3', 'toys bw 2/kite', 'nature bw/sun', 'home and nature bw/cloud', 'animals bw 4/chick'], { level: 3, heroScale: 2.0 }),
  // ---------------------------------------------------------------- street
  Sc('street-bus', 'Bus in the Street', 'street', 0, 'vehicles bw 2/bus_2', ['home and nature bw/house', 'tools bw/traffic_cone', 'birds bw/pigeon', 'beach bw/sun', 'home and nature bw/cloud', 'vehicles bw 3/baby_carriage', 'vehicles bw 2/car']),
  Sc('street-fire', 'Fire Truck', 'street', 1, 'vehicles bw 3/fire_truck', ['home and nature bw/house', 'home and nature bw/tree_3', 'nature bw/sun', 'home and nature bw/cloud'], { level: 1, mirror: true }),
  Sc('street-busy', 'Busy Street', 'street', 2, 'vehicles bw/ambulance', ['vehicles bw 2/police_car', 'travel and holiday bw/museum', 'home and nature bw/trash_can', 'nature bw/sun', 'home and nature bw/cloud', 'farm animals bw/pigeon'], { level: 3 }),
  Sc('street-garbage', 'Garbage Truck', 'street', 0, 'vehicles bw/garbage_truck', ['travel and holiday bw/museum', 'home and nature bw/tree', 'home and nature bw/trash_can', 'animals bw 4/cat', 'nature bw/sun', 'home and nature bw/cloud', 'vehicles bw 3/car'], { mirror: true }),
  // ---------------------------------------------------------------- station
  Sc('station-train', 'At the Station', 'station', 0, 'vehicles bw/train', ['travel and holiday bw/suitcase', 'beach bw 2/suitcase', 'travel and holiday bw/backpack', 'farm animals bw/pigeon', 'nature bw/sun', 'home and nature bw/cloud', 'vehicles bw 3/forklift'], { heroScale: 1.6 }),
  Sc('station-steam', 'Steam Train', 'station', 1, 'vehicles bw 2/train', ['beach bw/suitcase_2', 'nature bw/sun', 'home and nature bw/cloud', 'classroom bw 2/backpack'], { level: 1, mirror: true, heroScale: 1.6 }),
  // ---------------------------------------------------------------- village
  Sc('village-house', 'House in the Village', 'village', 0, 'home and nature bw/house', ['home and nature bw/tree', 'vehicles bw 2/car', 'animals bw 4/cat', 'nature bw/sun', 'home and nature bw/cloud', 'home and nature bw/flower'], { heroScale: 1.2 }),
  Sc('village-van', 'Van in the Village', 'village', 1, 'vehicles bw 2/van', ['home and nature bw/house', 'home and nature bw/tree_2', 'nature bw/sun', 'home and nature bw/cloud'], { level: 1, mirror: true }),
  Sc('village-cabin', 'Village Lane', 'village', 2, 'travel and holiday bw/cabin', ['home and nature bw/tree_3', 'nature bw/tree', 'vehicles bw/scooter', 'home and nature bw/flower', 'nature bw/sun', 'home and nature bw/cloud'], { level: 3, heroScale: 1.1 }),
  // ---------------------------------------------------------------- camp
  Sc('camp-tent', 'Camping Trip', 'camp', 0, 'travel and holiday bw/tent', ['travel and holiday bw/campfire', 'travel and holiday bw/backpack', 'home and nature bw/tree', 'beach bw 2/signpost', 'nature bw/sun', 'home and nature bw/cloud', 'sports bw 2/water_bottle'], { heroScale: 1.4 }),
  Sc('camp-camper', 'Camper Van', 'camp', 1, 'vehicles bw 2/camper', ['travel and holiday bw/tent', 'nature bw/sun', 'home and nature bw/cloud', 'nature bw/tree_2'], { level: 1, mirror: true }),
  Sc('camp-night', 'Camp at Night', 'camp', 2, 'animals bw/raccoon_3', ['nature bw/campfire', 'travel and holiday bw/tent', 'home and nature bw/tree', 'home and nature bw/tree_2', 'nature bw/moon', 'nature bw/star', 'travel and holiday bw/backpack', 'animals bw 2/raccoon'], { level: 3, heroScale: 1.8 }),
  // ---------------------------------------------------------------- night
  Sc('night-cat', 'Cat at Night', 'night', 0, 'animals bw 3/cat', ['home and nature bw/house', 'nature bw/moon', 'nature bw/star', 'space bw/planet', 'animals bw 3/bat', 'birds bw/owl', 'classroom bw/telescope']),
  Sc('night-bat', 'Bat at Night', 'night', 1, 'animals bw 5/bat', ['nature bw/moon', 'home and nature bw/tree_2', 'nature bw/star', 'animals bw/owl', 'space bw/planet'], { level: 1, mirror: true, heroScale: 2.4 }),
  Sc('night-owl', 'Owl at Night', 'night', 2, 'birds bw 2/owl', ['nature bw/moon', 'space bw/planet_2', 'nature bw/star', 'animals bw/bat_2', 'home and nature bw/tree', 'travel and holiday bw/log_cabin', 'animals bw/raccoon', 'space bw/ufo', 'animals bw 3/bat'], { level: 3, heroScale: 2.0 }),
  // ---------------------------------------------------------------- space
  Sc('space-rocket', 'Rocket in Space', 'space', 0, 'vehicles bw 2/rocket', ['space bw/planet', 'space bw/planet_2', 'space bw/earth', 'space bw/ufo', 'nature bw/star', 'space bw/meteor', 'space bw/telescope'], { heroScale: 1.6 }),
  Sc('space-ufo', 'Flying Saucer', 'space', 1, 'toys bw 2/ufo', ['space bw/rocket', 'classroom bw 2/earth', 'nature bw/star', 'space bw/meteor', 'space bw/planet_2'], { level: 1, mirror: true, heroScale: 2.4 }),
  Sc('space-moon', 'On the Moon', 'space', 2, 'vehicles bw 3/rocket', ['vehicles bw 2/ufo', 'space bw/planet', 'space bw/meteor', 'classroom bw 2/earth', 'nature bw/moon', 'nature bw/star', 'toys bw/rocket', 'toys bw/ufo'], { level: 3, heroScale: 1.5 }),
  // ---------------------------------------------------------------- garden
  Sc('garden-snail', 'Snail in the Garden', 'garden', 0, 'sea life bw 2/snail', ['home and nature bw/flower', 'valentine bw 2/tulip', 'farm bw/watering_can', 'nature bw/butterfly', 'tools bw/wheelbarrow', 'nature bw/sun', 'home and nature bw/cloud', 'farm bw/rabbit'], { heroScale: 2.4 }),
  Sc('garden-bird', 'Bird in the Garden', 'garden', 1, 'Easter bw/bird', ['Easter bw/tulip', 'nature bw/sun', 'home and nature bw/cloud', 'tools bw/rubber_boot'], { level: 1, mirror: true, heroScale: 2.0 }),
  Sc('garden-peacock', 'Peacock in the Garden', 'garden', 2, 'birds bw 2/peacock', ['home and nature bw/house', 'home and nature bw/tree_2', 'tools bw/lawn_mower', 'tools bw/shovel', 'home and nature bw/flower', 'nature bw/flower', 'Easter bw/tulip', 'animals bw 3/bee_3', 'nature bw/sun', 'home and nature bw/cloud', 'tools bw/trowel'], { level: 3 }),
];
