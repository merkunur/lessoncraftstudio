/**
 * data/fdx/catalog.js — every B&W library drawing READ on contact sheets (2026-10-10) for the Find the Differences
 * Level Set scenes. One line per drawing:  src | kind | h | places | tags | colours | note
 *   kind     animal · person · vehicle · plant · building · object · food · sky · X (refused; note = reason)
 *   h        the drawing's ink height in picture units at its natural size in a 600 x 560 scene
 *   places   g ground/floor · s sky · t on a table/counter/shelf · w hung on a wall · u under water · a afloat on a water line
 *   tags     the settings it belongs in (data/fdx/settings.js keys)
 *   colours  the natural crayon plan, largest part first (lib/cbn-render PALETTE names); small cells take a neighbour's
 * A drawing is never placed unseen: lib/fdx-layout.js refuses a src that is not here.
 */
'use strict';
const ROWS = String.raw`
Christmas bw/bell|object|70|w|xmas|yellow
Christmas bw/bow|object|50|w|xmas,party|red
Christmas bw/candle|object|80|t|xmas,party|red,yellow
Christmas bw/candy|food|40|t|xmas,party,sweets|pink
Christmas bw/candy_cane|food|80|t,w|xmas|none,red
Christmas bw/christmas|X|||||a whole little scene with snow ground and dots
Christmas bw/christmas_tree|plant|220|g|xmas,winter,livingroom|green,red,yellow,blue
Christmas bw/envelope|object|50|t|classroom,post|none,yellow
Christmas bw/gift_box|object|80|g,t|xmas,party|red,yellow
Christmas bw/gingerbread_man|food|70|t|xmas,bakery|brown
Christmas bw/lollipop|food|75|t|party,sweets,market|pink
Christmas bw/ornament|object|50|w|xmas|red
Christmas bw/reindeer|X|||||a head only
Christmas bw/santa_hat|object|50|t|xmas|red,none
Christmas bw/shopping_bag|object|75|g|market,shop|pink
Christmas bw/snow_globe|object|65|t|xmas,toyshop|lightblue,brown
Christmas bw/snowman|person|170|g|winter|none,none,red
Christmas bw/star|object|50|w|xmas|yellow
Christmas bw/stocking|object|75|w|xmas|red,none
Christmas bw/sweater|object|75|w,t|clothes,bedroom|green
Christmas bw/wreath|object|90|w|xmas|green,red
Christmas bw 2/candle|object|85|t|xmas,livingroom|red,yellow
Christmas bw 2/christmas_stocking|object|75|w|xmas|red,none
Christmas bw 2/christmas_tree|plant|220|g|xmas,livingroom|green,red,yellow
Christmas bw 2/cupcake|food|65|t|bakery,party|pink,brown
Christmas bw 2/fireplace|object|170|g|livingroom,xmas|red,brown,orange
Christmas bw 2/gift_box|object|85|g,t|xmas,party|red,yellow
Christmas bw 2/gingerbread_house|building|150|t,g|xmas,bakery|brown,pink
Christmas bw 2/gingerbread_man|food|70|t|bakery,xmas|brown
Christmas bw 2/ice_skates|object|75|g|winter,sports|lightblue,grey
Christmas bw 2/mug|object|55|t|kitchen,winter|red
Christmas bw 2/nutcracker|object|120|g,t|xmas,toyshop|red,blue
Christmas bw 2/ornament|object|55|w|xmas|red
Christmas bw 2/reindeer|animal|160|g|winter,xmas|brown
Christmas bw 2/sack|object|120|g|xmas|brown
Christmas bw 2/santa_claus|person|180|g|xmas,winter|red
Christmas bw 2/sleigh|vehicle|130|g|winter,xmas|red
Christmas bw 2/snow_globe|object|65|t|xmas,toyshop|lightblue
Christmas bw 2/snowman|person|170|g|winter|none,none,orange
Christmas bw 2/winter_jacket|object|80|w,t|clothes,winter|blue
Easter bw/angel|X|||||religious figure — kept off worksheets for every market
Easter bw/basket|object|100|g,t|easter,picnic|brown,pink,blue
Easter bw/bell|object|70|w|xmas|yellow
Easter bw/bible|X|||||religious book
Easter bw/bird|animal|90|g|garden,farm,park|yellow,orange
Easter bw/branch|plant|110|g,t|garden,forest|green
Easter bw/bread|food|55|t|bakery,kitchen,market|orange
Easter bw/bunny|X|||||a head only
Easter bw/butterfly|animal|60|s|garden,park,meadow|purple,orange
Easter bw/cake|food|80|t|party,bakery|pink,brown,red
Easter bw/candle|X|||||carries a cross
Easter bw/candy|food|45|t|party,sweets|pink
Easter bw/carrot|food|80|t|garden,farm,market,kitchen|orange,green
Easter bw/church|X|||||religious building
Easter bw/cookie|food|60|t|bakery,kitchen|brown
Easter bw/cross|X|||||religious symbol
Easter bw/dove|animal|70|s|park,garden|lightblue
Easter bw/easter|X|||||a whole little scene with grass and eggs
Easter bw/egg|object|65|g,t|easter|pink,blue
Easter bw/gift|object|80|g,t|party|red,yellow
Easter bw/lollipop|food|80|t|party,sweets|pink
Easter bw/mushroom|plant|90|g|forest,garden|red,none
Easter bw/rabbit|animal|90|g|garden,farm,meadow,park|grey
Easter bw/tulip|plant|110|g|garden,park|red,green
Easter bw 2/angel|X|||||angel egg — religious
Easter bw 2/balloon|object|130|s,w|party,fair|red,blue,yellow
Easter bw 2/basket|object|100|g,t|easter,picnic|brown,pink
Easter bw 2/bell|object|80|w|xmas|yellow,red
Easter bw 2/bunny|animal|90|g|easter|pink,none
Easter bw 2/cake|food|90|t|party,bakery|pink,brown,red
Easter bw 2/candle|object|70|t|livingroom|red,yellow
Easter bw 2/chick|animal|80|g|farm,easter|yellow,none
Easter bw 2/chicken|food|55|t|kitchen|orange,blue
Easter bw 2/chicken_2|animal|120|g|farm|brown,yellow
Easter bw 2/church|X|||||religious building
Easter bw 2/cookies|food|60|t|bakery,kitchen|brown,lightblue
Easter bw 2/dove|animal|70|s|park,garden|lightblue
Easter bw 2/egg|object|65|g,t|easter|pink,blue
Easter bw 2/gift|object|85|g,t|party,xmas|red,yellow
Easter bw 2/lily|plant|120|g|garden|yellow,green
Easter bw 2/sheep|animal|140|g|farm,meadow|none
animals bw/alligator|animal|110|g|pond,river,jungle,zoo|green
animals bw/alligator_2|animal|150|g|pond,river,jungle|green
animals bw/bat|animal|70|s|night,cave|purple,brown
animals bw/bat_2|animal|80|s|night,cave|purple,brown
animals bw/bear|animal|180|g|forest,zoo,mountain|brown
animals bw/bear_2|animal|180|g|forest,zoo|brown,orange
animals bw/beaver|animal|130|g|river,pond,forest|brown,orange
animals bw/bison|animal|170|g|meadow,mountain,zoo|brown
animals bw/bull|animal|180|g|farm|brown
animals bw/camel|animal|200|g|desert,zoo|orange
animals bw/camel_2|animal|190|g|desert|orange
animals bw/capybara|animal|120|g|river,zoo,jungle|brown
animals bw/cat_2|animal|110|g|livingroom,garden,bedroom,street|orange
animals bw/chameleon|X|||||sits on a loose branch line
animals bw/cow|animal|170|g|farm,meadow|none,pink
animals bw/cow_2|animal|130|g|farm|none,brown,pink
animals bw/crab|animal|70|g|beach|red
animals bw/dog|animal|120|g|park,garden,livingroom,street|brown
animals bw/dog_2|animal|115|g|park,garden,livingroom|orange,brown
animals bw/donkey|animal|160|g|farm|grey
animals bw/dragon|X|||||fantasy creature beside real animals
animals bw/duck|animal|90|g|pond,farm,river|yellow,orange
animals bw/elephant|animal|230|g|savanna,zoo|grey
animals bw/elephant_2|animal|200|g|savanna,zoo|grey
animals bw/elephant_3|animal|190|g|savanna,zoo|grey
animals bw/fish|animal|70|u|sea,reef,aquarium|orange,yellow
animals bw/fox|animal|110|g|forest,meadow|orange,none
animals bw/frog|animal|70|g|pond,river|green
animals bw/giraffe|animal|280|g|savanna,zoo|yellow,brown
animals bw/giraffe_2|animal|190|g|savanna,zoo|yellow,brown
animals bw/goat|animal|140|g|farm,mountain|none,grey
animals bw/hippopotamus|animal|190|g|savanna,river,zoo|purple,pink
animals bw/horse|animal|180|g|farm,meadow|brown
animals bw/kangaroo|animal|180|g|outback,zoo|orange
animals bw/koala|animal|110|g|outback,zoo|grey
animals bw/koala_2|animal|110|g|outback,zoo|grey
animals bw/lion|animal|170|g|savanna,zoo|yellow,orange
animals bw/lion_2|animal|150|g|savanna,zoo|yellow,orange
animals bw/llama|animal|190|g|mountain,farm,zoo|none,brown
animals bw/meerkat|animal|110|g|savanna,desert,zoo|orange
animals bw/monkey|animal|120|g|jungle,zoo|brown,orange
animals bw/monkey_2|animal|130|g|jungle,zoo|brown,orange
animals bw/mouse|animal|70|g|livingroom,kitchen,farm,garden|grey,pink
animals bw/octopus|animal|110|u|sea,reef|purple
animals bw/ostrich|animal|220|g|savanna|black,pink
animals bw/ostrich_2|animal|210|g|savanna|black,pink
animals bw/otter|animal|110|g|river,pond|brown
animals bw/otter_2|animal|110|g|river,pond|brown
animals bw/owl|animal|90|g,t|forest,night|brown,orange
animals bw/panda|animal|140|g|bamboo,zoo|none
animals bw/panda_2|animal|130|g|bamboo,zoo|none
animals bw/parrot|X|||||perches on a loose stick
animals bw/penguin|animal|120|g|polar,zoo|black,none,orange
animals bw/penguin_2|animal|120|g|polar,zoo|black,none,orange
animals bw/pig|animal|120|g|farm|pink
animals bw/piglet|animal|100|g|farm|pink
animals bw/rabbit|animal|100|g|garden,meadow,farm|grey,pink
animals bw/rabbit_2|animal|110|g|garden,meadow,park|none,pink
animals bw/raccoon|animal|110|g|forest,night|grey
animals bw/raccoon_2|animal|110|g|forest,night|grey
animals bw/raccoon_3|animal|110|g|forest,night|grey
animals bw/raccoon_4|animal|110|g|forest,night|grey
animals bw/reindeer|animal|160|g|winter,forest|brown
animals bw/rhinoceros|animal|170|g|savanna,zoo|grey
animals bw/rooster|animal|130|g|farm|red,orange,brown
animals bw/seahorse|animal|110|u|sea,reef|yellow,orange
animals bw/seal|animal|100|g|polar,beach,harbour|grey
animals bw/sheep|animal|130|g|farm,meadow|none
animals bw/sheep_2|animal|130|g|farm,meadow|none
animals bw/sloth|animal|110|g|jungle,zoo|brown
animals bw/snail|animal|60|g|garden,forest|orange,green
animals bw/squirrel|animal|100|g|park,forest,garden|orange
animals bw/swan|animal|100|g|pond,river,park|none,orange
animals bw/teddy_bear|object|90|g,t|bedroom,toyshop|brown,orange
animals bw/teddy_bear_2|object|90|g,t|bedroom,toyshop|brown,orange
animals bw/tiger|animal|140|g|jungle,zoo|orange
animals bw/turtle|animal|80|g|pond,river,beach|green,brown
animals bw/tyrannosaurus_rex|animal|170|g|dino|green
animals bw/unicorn|X|||||fantasy creature beside real animals
animals bw/whale|animal|120|u|sea|blue
animals bw/whale_2|animal|80|u|sea|lightblue|noword: reads as a dolphin
animals bw/zebra|animal|180|g|savanna,zoo|none
animals bw/zebra_2|animal|170|g|savanna,zoo|none
animals bw 2/bull|animal|160|g|farm|brown
animals bw 2/cat|animal|110|g|livingroom,garden,bedroom|grey
animals bw 2/cat_2|animal|100|g|livingroom,garden,kitchen|orange
animals bw 2/cow|animal|140|g|farm|none,brown,pink
animals bw 2/dog|animal|110|g|park,garden,livingroom|brown
animals bw 2/elephant|animal|200|g|savanna,zoo|grey
animals bw 2/fox|animal|110|g|forest,meadow|orange,none
animals bw 2/giraffe|animal|260|g|savanna,zoo|yellow,brown
animals bw 2/hippopotamus|animal|160|g|savanna,river,zoo|purple
animals bw 2/koala|animal|110|g|outback,zoo|grey
animals bw 2/leopard|animal|140|g|savanna,jungle,zoo|yellow,brown
animals bw 2/lion|animal|150|g|savanna,zoo|yellow,orange
animals bw 2/monkey|animal|120|g|jungle,zoo|brown,orange
animals bw 2/monkey_2|X|||||stands on its own rock and grass
animals bw 2/mouse|animal|60|g|kitchen,farm,garden|grey,pink
animals bw 2/panda|animal|130|g|bamboo,zoo|none
animals bw 2/pig|animal|120|g|farm|pink
animals bw 2/pony|animal|150|g|farm,meadow|brown,yellow
animals bw 2/porcupine|animal|90|g|forest|brown|noword: reads as a hedgehog
animals bw 2/rabbit|animal|110|g|garden,meadow|grey,pink
animals bw 2/raccoon|animal|110|g|forest|grey
animals bw 2/rhinoceros|animal|170|g|savanna,zoo|grey
animals bw 2/sheep|animal|130|g|farm,meadow|none
animals bw 2/sloth|X|||||hangs on a loose branch line
animals bw 2/squirrel|animal|100|g|park,forest,garden|orange
animals bw 2/teddy_bear|object|90|g,t|bedroom,toyshop|brown
animals bw 2/yak|animal|170|g|mountain,farm|brown
animals bw 2/zebra|animal|170|g|savanna,zoo|none
animals bw 3/alligator|animal|130|g|pond,river|green
animals bw 3/alligator_2|animal|110|g|pond,river|green
animals bw 3/bat|animal|75|s|night,cave|purple
animals bw 3/bee|animal|60|s|garden,meadow|yellow
animals bw 3/bee_2|animal|60|s|garden,meadow|yellow,lightblue
animals bw 3/bee_3|animal|60|s|garden,meadow|yellow,lightblue
animals bw 3/camel|animal|190|g|desert,zoo|orange
animals bw 3/cat|animal|110|g|livingroom,garden,night|grey
animals bw 3/cat_2|animal|100|g|livingroom,garden,bedroom|orange
animals bw 3/cat_3|animal|110|g|livingroom,garden,kitchen|grey
animals bw 3/chicken|animal|120|g|farm|none,red,orange
animals bw 3/cow|animal|130|g|farm|none,brown,pink
animals bw 3/cow_2|animal|130|g|farm|none,brown,pink
animals bw 3/cow_3|animal|140|g|farm,meadow|none,brown,pink
animals bw 3/crow|animal|90|g|farm,field|black,yellow
animals bw 3/deer|animal|140|g|forest,meadow|brown
animals bw 3/dinosaur|animal|150|g|dino|green
animals bw 3/dinosaur_2|animal|130|g|dino|orange
animals bw 3/dog|animal|120|g|park,garden,livingroom|brown
animals bw 3/dolphin|animal|110|u|sea|blue,lightblue
animals bw 3/dolphin_2|animal|100|u|sea|lightblue
animals bw 3/donkey|animal|150|g|farm|grey
animals bw 3/duck|animal|90|g|pond,farm|yellow,orange
animals bw 3/elephant|animal|190|g|savanna,zoo|grey
animals bw 3/elephant_2|animal|180|g|savanna,zoo|grey
animals bw 3/fish|animal|80|u|sea,reef,aquarium|blue,yellow
animals bw 3/fish_2|animal|80|u|sea,reef|orange,yellow
animals bw 3/frog|animal|75|g|pond,river|green
animals bw 3/frog_2|animal|75|g|pond,river|green
animals bw 3/giraffe|animal|260|g|savanna,zoo|yellow,brown
animals bw 3/giraffe_2|animal|250|g|savanna,zoo|yellow,brown
animals bw 3/hippopotamus|animal|160|g|savanna,river,zoo|purple
animals bw 3/hippopotamus_2|animal|150|g|savanna,river,zoo|purple
animals bw 3/horse|animal|170|g|farm,meadow|brown
animals bw 3/horse_2|animal|170|g|farm,meadow|orange,brown
animals bw 3/jellyfish|animal|110|u|sea|pink,purple
animals bw 3/ladybug|animal|70|g|garden,meadow|red
animals bw 3/lion|animal|160|g|savanna,zoo|yellow,orange
animals bw 3/lion_2|animal|140|g|savanna,zoo|yellow,orange
animals bw 3/monkey|animal|120|g|jungle,zoo|brown,orange
animals bw 3/mouse|animal|70|g|kitchen,farm,garden|grey,pink
animals bw 3/mouse_2|animal|70|g|kitchen,farm|grey,pink
animals bw 3/mouse_3|animal|70|g|kitchen,livingroom|grey,pink
animals bw 3/teddy_bear_2|X|||||its head outline is open to the paper — the head cannot be painted
animals bw 4/beaver|animal|110|g|river,pond,forest|brown,orange
animals bw 4/cat|animal|100|g|livingroom,garden,street|orange
animals bw 4/cat_2|animal|100|g|livingroom,garden,bedroom|grey
animals bw 4/cat_3|animal|100|g|livingroom,kitchen|orange
animals bw 4/chick|animal|70|g|farm,garden|yellow
animals bw 4/chicken|animal|110|g|farm|none,red
animals bw 4/cow|animal|140|g|farm,meadow|none,brown,pink
animals bw 4/crocodile|animal|130|g|river,jungle|green
animals bw 4/dog|animal|115|g|park,garden,livingroom|brown
animals bw 4/donkey|animal|150|g|farm|grey
animals bw 4/duck|animal|100|g|pond,farm|none,orange
animals bw 4/duck_2|animal|85|g|pond,farm|yellow,orange
animals bw 4/duck_3|animal|85|g|pond,farm|yellow,orange
animals bw 4/elephant|animal|200|g|savanna,zoo|grey
animals bw 4/giraffe|animal|230|g|savanna,zoo|yellow,brown
animals bw 4/goat|animal|140|g|farm,mountain|none,grey
animals bw 4/goat_2|animal|120|g|farm,mountain|none,grey
animals bw 4/hippopotamus|animal|140|g|savanna,river,zoo|purple
animals bw 4/kangaroo|animal|150|g|outback,zoo|orange
animals bw 4/koala|animal|110|g|outback,zoo|grey
animals bw 4/llama|animal|160|g|mountain,farm|none,brown
animals bw 4/monkey|animal|120|g|jungle,zoo|brown,orange
animals bw 4/mouse|animal|75|g|kitchen,farm,livingroom|grey,pink
animals bw 4/ostrich|animal|210|g|savanna|black,pink
animals bw 4/pig|animal|120|g|farm|pink
animals bw 4/pig_2|animal|110|g|farm|pink
animals bw 4/pony|X|||||carries a horn — a unicorn
animals bw 4/pony_2|animal|140|g|farm,meadow|brown,yellow
animals bw 4/rabbit|animal|100|g|garden,meadow|grey,pink
animals bw 4/rabbit_2|animal|95|g|garden,meadow,park|brown,pink
animals bw 4/rooster|animal|130|g|farm|red,orange,brown
animals bw 4/sheep|animal|130|g|farm,meadow|none
animals bw 4/sheep_2|animal|120|g|farm,meadow|none
animals bw 4/turtle|animal|90|g|pond,river,beach|green,brown
animals bw 4/unicorn|X|||||fantasy creature
animals bw 4/zebra|animal|160|g|savanna,zoo|none
animals bw 5/bat|animal|70|s|night,cave|purple
animals bw 5/bear|animal|160|g|forest,zoo|brown
animals bw 5/bee|animal|65|s|garden,meadow|yellow,lightblue
animals bw 5/bee_2|animal|65|s|garden,meadow|yellow,lightblue
animals bw 5/bird|animal|80|g|garden,park,farm|lightblue,orange
animals bw 5/bull|animal|150|g|farm|brown
animals bw 5/bull_2|animal|150|g|farm|brown
animals bw 5/camel|animal|160|g|desert|orange
animals bw 5/chameleon|animal|70|g|jungle,zoo|green
animals bw 5/chicken|animal|120|g|farm|none,red
animals bw 5/chinchilla|animal|80|g|livingroom,mountain|grey
animals bw 5/cow|animal|140|g|farm,meadow|none,brown,pink
animals bw 5/crab|animal|70|g|beach,reef|red
animals bw 5/crocodile|animal|90|g|river,jungle|green
animals bw 5/crocodile_2|animal|90|g|river,jungle|green
animals bw 5/dinosaur|animal|140|g|dino|green
animals bw 5/dinosaur_2|animal|130|g|dino|lightgreen
animals bw 5/dog|animal|110|g|park,garden,livingroom|brown
animals bw 5/dog_2|animal|115|g|park,garden,livingroom|orange
animals bw 5/dog_3|animal|115|g|park,garden,street|brown
animals bw 5/dolphin|animal|110|u|sea|blue
animals bw 5/donkey|animal|150|g|farm|grey
animals bw 5/duck|animal|90|g|pond,farm|yellow,orange
animals bw 5/eagle|animal|110|g|mountain,forest|brown,none
animals bw 5/elephant|animal|190|g|savanna,zoo|grey
animals bw 5/fish|animal|75|u|sea,reef,aquarium|orange,yellow
animals bw 5/flamingo|animal|170|g|pond,zoo|pink
animals bw 5/fox|animal|110|g|forest,meadow|orange
animals bw 5/fox_2|animal|105|g|forest,meadow|orange,none
animals bw 5/frog|animal|70|g|pond,river|green
animals bw 5/giraffe|animal|210|g|savanna,zoo|yellow,brown
animals bw 5/goat|animal|110|g|farm,mountain|none,grey
animals bw 5/gorilla|animal|150|g|jungle,zoo|grey
animals bw 5/hamster|animal|70|g,t|bedroom,livingroom|orange
animals bw 5/hedgehog|animal|80|g|garden,forest|brown
animals bw 5/hippopotamus|animal|140|g|savanna,river,zoo|purple
animals bw 5/jellyfish|animal|110|u|sea|pink
animals bw 5/kangaroo|animal|160|g|outback,zoo|orange
animals bw 5/koala|animal|110|g|outback,zoo|grey
animals bw 5/leopard|animal|130|g|savanna,jungle,zoo|yellow,brown
animals bw 5/lion|animal|150|g|savanna,zoo|yellow,orange
animals bw 5/lion_2|animal|150|g|savanna,zoo|yellow,orange
animals bw 5/lizard|animal|70|g|desert,jungle|green|noword: es 'lagarto' suggests a caiman in Mexico (native review 2026-10-10)
animals bw 5/llama|animal|160|g|mountain,farm|none,brown
animals bw 5/monkey|animal|110|g|jungle,zoo|brown,orange
animals bw 5/monkey_2|animal|110|g|jungle,zoo|brown,orange
animals bw 5/mouse|animal|70|g|kitchen,farm,livingroom|grey,pink
animals bw 5/ostrich|animal|210|g|savanna|black,pink
animals bw 5/ostrich_2|animal|210|g|savanna|black,pink
animals bw 5/owl|animal|90|g,t|forest,night|brown,orange
animals bw 5/panda|animal|120|g|bamboo,zoo|none
animals bw 5/peacock|animal|150|g|garden,zoo|blue,green
animals bw 5/penguin|animal|110|g|polar,zoo|lightblue
animals bw 5/penguin_2|animal|120|g|polar,zoo|black,none,orange
animals bw 5/pony|animal|140|g|farm,meadow|brown,yellow
animals bw 5/rabbit|animal|100|g|garden,meadow|grey,pink
animals bw 5/reindeer|animal|130|g|winter,forest|brown
animals bw 5/rhinoceros|animal|160|g|savanna,zoo|grey
animals bw 5/shark|animal|110|u|sea|grey
animals bw 5/sheep|animal|120|g|farm,meadow|none
animals bw 5/sloth|X|||||hangs on a loose branch line
animals bw 5/snake|animal|110|g|jungle,desert,zoo|green,yellow
animals bw 5/squirrel|animal|100|g|park,forest,garden|orange
animals bw 5/squirrel_2|X|||||its tail outline is open to the paper — the tail cannot be painted
animals bw 5/swan|animal|100|g|pond,river,park|none,orange
animals bw 5/tiger|animal|130|g|jungle,zoo|orange
animals bw 5/turtle|animal|70|g|pond,beach,river|green,brown
animals bw 5/vulture|animal|130|g|desert,savanna|brown,pink
animals bw 5/whale|animal|90|u|sea|lightblue
animals bw 5/zebra|animal|170|g|savanna,zoo|none
apparel bw/baby_overall|object|80|w,t|clothes|blue
apparel bw/babys_onesie|object|70|w,t|clothes|pink
apparel bw/boots|object|80|g|clothes,winter,bedroom|brown
apparel bw/cap|object|45|t,w|clothes,sports|red
apparel bw/coat|object|100|w|clothes|orange
apparel bw/coat_2|object|100|w|clothes,winter|purple
apparel bw/dress|object|100|w|clothes|pink
apparel bw/dress_2|object|100|w|clothes|purple
apparel bw/dress_3|object|90|w|clothes|lightblue
apparel bw/dress_4|object|90|w|clothes|yellow
apparel bw/dress_5|object|100|w|clothes|pink
apparel bw/flip_flops|object|60|g|beach,clothes|blue,pink
apparel bw/hat|object|50|t,w|clothes,beach|yellow,pink
apparel bw/hat_2|object|60|t,w|clothes,winter|red,blue
apparel bw/high-heeled_shoes|object|60|g|clothes|red
apparel bw/jacket|object|90|w|clothes|green
apparel bw/mittens|object|60|t,w|clothes,winter|red
apparel bw/necktie|object|70|w|clothes|blue
apparel bw/scarf_2|object|90|w,t|clothes,winter|red,none
apparel bw/shirt|object|80|w|clothes|lightblue
apparel bw/shirt_2|object|80|w|clothes|yellow
apparel bw/shorts|object|70|w|clothes,beach|blue
apparel bw/smartwatch|X|||||a gadget drawn at the size of a page
apparel bw/sock|object|60|w|clothes|green,red
apparel bw/sunglasses|object|30|t|beach,clothes|black
apparel bw/sweatshirt|X|||||solid black fills — not line art
apparel bw/t-shirt|object|75|w|clothes|orange
beach bw/anchor|object|90|g,w|harbour|grey|noword: it 'ancora' is spelled like the adverb 'ancora' (native review 2026-10-10)
beach bw/beach_ball|object|80|g|beach,park,playground|red,yellow,blue,none
beach bw/bucket|object|80|g|beach|red,yellow
beach bw/camera|object|50|t|beach,travel|grey,black
beach bw/compass|X|||||printed letters N E S W
beach bw/crab|animal|65|g|beach|red
beach bw/flip-flops|object|60|g|beach|pink
beach bw/flipper|object|70|g|beach|blue
beach bw/ice_cream|food|65|t|beach,cafe,party|pink,brown
beach bw/lemonade|food|70|t|beach,cafe,picnic|yellow
beach bw/lighthouse|building|260|g|beach,harbour|red,none
beach bw/lounge|object|110|g|beach,pool|blue,brown
beach bw/palm_tree|plant|260|g|beach,island|green,brown
beach bw/parasol|object|190|g|beach,cafe|red,yellow
beach bw/preserver_ring|object|80|w,g|harbour,beach,pool|red,none
beach bw/sailboat|vehicle|170|a|sea,harbour,lake|none,red
beach bw/sandcastle|building|130|g|beach|yellow,red
beach bw/seashell|object|60|g|beach,reef|pink|noword: da 'musling' is the living mussel, not the shell (native review 2026-10-10)
beach bw/snorkeling_mask|object|60|t,g|beach|blue
beach bw/starfish|animal|65|g,u|beach,reef|orange
beach bw/suitcase|object|80|g|travel,station,bedroom|brown
beach bw/suitcase_2|object|85|g|travel,station|red
beach bw/sun|sky|110|s|outdoor|yellow
beach bw/sunglasses|object|30|t|beach|black
beach bw/sunscreen|object|60|t,g|beach|orange
beach bw/surfboard|object|170|g|beach|blue,yellow
beach bw/umbrella|object|190|g|beach|red,yellow,blue
beach bw/watermelon|food|50|t|picnic,beach,market|red,green
beach bw 2/bag|object|90|g|beach,market,shop|yellow
beach bw 2/boat|vehicle|130|a|sea,harbour,lake|red,none
beach bw 2/boat_2|vehicle|110|a|sea,harbour,lake|orange,none
beach bw 2/bucket|object|85|g|beach|red,yellow
beach bw 2/camera|object|50|t|travel|grey,black
beach bw 2/cocktail|X|||||an adult drink
beach bw 2/crab|animal|70|g|beach|red
beach bw 2/deck_chair|object|130|g|beach,garden|blue
beach bw 2/flip_flops|object|65|g|beach|pink,yellow
beach bw 2/inflatable_ring|object|85|g,a|beach,pool|red
beach bw 2/island|X|||||a whole little island with its own sand
beach bw 2/lounger|object|100|g|beach,pool|blue,brown
beach bw 2/sandcastle|building|140|g|beach|yellow,red
beach bw 2/seashell|object|60|g|beach,reef|pink|noword: da 'musling' is the living mussel, not the shell (native review 2026-10-10)
beach bw 2/seashell_2|object|60|g|beach,reef|orange|noword: da 'musling' is the living mussel, not the shell (native review 2026-10-10)
beach bw 2/shorts|object|60|w,t|clothes,beach|blue
beach bw 2/signpost|object|150|g|beach,forest,park,camp|brown|noword: fi 'opastekyltti' / pt 'placa de sinalização' are adult words (native review 2026-10-10)
beach bw 2/snorkel|object|60|t,g|beach|blue
beach bw 2/suitcase|object|100|g|travel,station|red
beach bw 2/sunglasses|object|30|t|beach|black
beach bw 2/surfboard|object|170|g|beach|blue
beach bw 2/tote_bag|object|90|g|beach,market|yellow
beach bw 2/umbrella|object|180|g|beach|red,yellow
beach bw 2/watermelon|food|45|t|picnic,beach|red,green
birds bw/chicken|animal|120|g|farm|brown,red
birds bw/crow|animal|100|g|farm,field|black
birds bw/duck|object|70|t,a|bathroom,pool,toyshop|yellow,orange|a rubber duck — never 'duck' on a word face
birds bw/flamingo|animal|170|g|pond,zoo|pink
birds bw/hummingbird|animal|70|s|garden,jungle|green,orange
birds bw/kiwi|animal|80|g|forest|brown|noword: 'kiwi' reads as the fruit to a child (native review 2026-10-10)
birds bw/owl|animal|100|g,t|forest,night|brown,orange
birds bw/parrot|animal|130|g|jungle,zoo|red,blue,yellow
birds bw/peacock|animal|150|g|garden,zoo|blue,green
birds bw/pelican|animal|150|g|harbour,beach,pond|none,orange
birds bw/penguin|animal|110|g|polar,zoo|black,none,orange
birds bw/penguin_2|animal|110|g|polar,zoo|black,none,orange
birds bw/pigeon|animal|90|g|park,street,town|grey
birds bw/toucan|animal|110|g|jungle,zoo|black,orange
birds bw/vulture|animal|120|g|desert,savanna|brown
birds bw/woodpecker|animal|110|g|forest|red
birds bw 2/bird|animal|80|g|garden,park|lightblue,orange
birds bw 2/bird_2|animal|90|g|jungle,zoo|green,orange
birds bw 2/bird_3|animal|80|g|garden,park|yellow,orange
birds bw 2/chicken|animal|110|g|farm|none,red
birds bw 2/crow|animal|100|g|farm,field|black,yellow
birds bw 2/duck|animal|80|g,a|pond,farm|yellow,orange
birds bw 2/duck_2|animal|80|a|pond,river|yellow,orange
birds bw 2/flamingo|animal|170|g|pond,zoo|pink
birds bw 2/goose|animal|120|g|farm,pond|none,orange
birds bw 2/hummingbird|animal|70|s|garden,jungle|green,orange
birds bw 2/ostrich|animal|200|g|savanna|black,pink
birds bw 2/owl|animal|95|g,t|forest,night|brown,orange
birds bw 2/parrot|animal|110|g|jungle,zoo|green,yellow
birds bw 2/peacock|animal|140|g|garden,zoo|blue,green
birds bw 2/rooster|animal|130|g|farm|red,orange,brown
birds bw 2/swan|animal|100|g,a|pond,river,park|none,orange
birds bw 2/toucan|animal|120|g|jungle,zoo|black,orange
birds bw 2/turkey|animal|130|g|farm|brown,red
birds bw 2/turkey_2|animal|130|g|farm|brown,orange
birds bw 2/vulture|animal|120|g|desert,savanna|brown
classroom bw/bell|object|60|t,w|classroom|yellow
classroom bw/book|object|50|t|classroom,library,bedroom|blue
classroom bw/briefcase|object|70|g|classroom,office|brown
classroom bw/chair|object|130|g|classroom,kitchen,livingroom|brown
classroom bw/erlenmeyer_flask|object|60|t|lab|lightblue
classroom bw/globe|object|80|t|classroom,library|blue,green
classroom bw/graduation_cap|object|50|t|classroom|black
classroom bw/magnifying_glass|object|60|t|classroom,garden|grey
classroom bw/map|X|||||a world map — thin outline crumbs
classroom bw/marker|object|50|t|classroom|red
classroom bw/microphone|object|90|g,t|stage,music|grey
classroom bw/notebook|object|60|t|classroom|yellow
classroom bw/pen|object|50|t|classroom|blue
classroom bw/pencil|object|50|t|classroom|yellow
classroom bw/projector|object|60|t|classroom|grey
classroom bw/puzzle|object|60|t|classroom,toyshop|blue,red
classroom bw/ruler|object|20|t|classroom|yellow|thin — never a difference on its own
classroom bw/stamp|object|60|t|classroom,post|brown,red
classroom bw/table|object|90|g|classroom,kitchen,picnic|brown
classroom bw/telescope|object|130|g|night,space|blue
classroom bw/trophy|object|80|t|sports,classroom|yellow
classroom bw/whiteboard|object|110|w|classroom|none,brown
classroom bw 2/analog_clock|X|||||printed numerals on its face
classroom bw 2/backpack|object|85|g|classroom,bedroom,camp|red,yellow
classroom bw 2/book|object|45|t|classroom,library,bedroom|red
classroom bw 2/bookshelf|object|230|g|classroom,library,bedroom,livingroom|brown,yellow
classroom bw 2/calculator|object|60|t|classroom,office|grey
classroom bw 2/calendar|object|80|w|classroom,kitchen|none,red
classroom bw 2/chair|object|120|g|classroom,kitchen,livingroom|red
classroom bw 2/computer|object|90|t|classroom,office|grey,lightblue
classroom bw 2/dresser|object|130|g|bedroom,livingroom|brown,yellow
classroom bw 2/earth|sky|90|s|space|blue,green|noword: fi 'maa' reads as ground; the Earth beside a planet makes 'planet' a second right answer (native review 2026-10-10)
classroom bw 2/erlenmeyer_flask|object|60|t|lab|lightblue,green
classroom bw 2/globe|object|80|t|classroom,library|blue,green
classroom bw 2/human_torso|X|||||an anatomy chart
classroom bw 2/magnifying_glass|object|60|t|classroom|grey
classroom bw 2/map|object|90|w|classroom|lightblue,green
classroom bw 2/microscope|object|80|t|classroom,lab|grey
classroom bw 2/notebook|object|60|t|classroom|green
classroom bw 2/palette|object|50|t|classroom,artroom|brown,red,yellow,blue
classroom bw 2/paper_airplane|object|50|s,t|classroom,park,playground|none
classroom bw 2/pen|object|50|t|classroom|blue
classroom bw 2/pencil|object|50|t|classroom|yellow
classroom bw 2/scissors|object|55|t|classroom,artroom|red,grey
classroom bw 2/table|object|90|g|classroom,kitchen,livingroom|brown
classroom bw 2/whiteboard|object|160|g|classroom,artroom|none,brown
dessert bw/biscuit|food|45|t|bakery,kitchen|orange
dessert bw/cake|food|100|t|party,bakery|pink,yellow
dessert bw/cake_2|food|70|t|party,bakery,cafe|pink,brown
dessert bw/candy|food|40|t|party,sweets|pink
dessert bw/chocolate|food|55|t|sweets,shop|brown
dessert bw/cupcake|food|70|t|bakery,party|pink,brown
dessert bw/donut|food|60|t|bakery,cafe|pink,brown
dessert bw/ice_cream|food|80|t|cafe,beach,party|pink,orange
dessert bw/ice_pop|food|75|t|beach,cafe|red,brown
dessert bw/lollipop|food|80|t|party,sweets|pink
dessert bw/muffin|food|65|t|bakery,cafe|brown,yellow
dessert bw/pie|food|50|t|bakery,kitchen|orange
dessert bw/pudding|food|60|t|party,kitchen|yellow,brown
dessert bw/sundae|food|85|t|cafe,party|pink,lightblue
dessert bw/waffle|food|55|t|cafe,kitchen|orange,red
education bw/backpack|object|90|g|classroom,camp|blue,green
education bw/book|object|50|t|classroom,library,bedroom|green
education bw/book_2|object|45|t|classroom,library|blue
education bw/box|object|80|g|storeroom,bedroom,post|brown
education bw/calculator|object|50|t|classroom,office|grey
education bw/clock|X|||||tiny printed numerals on its face
education bw/crayon|object|50|t|classroom,artroom|red
education bw/crayon_2|object|50|t|classroom,artroom|blue
education bw/eraser|object|45|t|classroom|pink
education bw/gift_box|object|90|g,t|party|red,yellow
education bw/glasses|object|30|t|livingroom|black
education bw/glue|X|||||printed word GLUE
education bw/letter|X|||||scribbled writing
education bw/notebook|object|60|t|classroom|orange
education bw/paintbrush|object|60|t|classroom,artroom|brown,red
education bw/palette|object|50|t|artroom,classroom|brown,red,yellow,blue
education bw/pen|object|50|t|classroom|blue
education bw/pencil|object|50|t|classroom|yellow
education bw/push_pin|object|40|w,t|classroom|red|small — never a difference on its own
education bw/ruler|object|50|t|classroom|yellow
education bw/scissors|object|55|t|classroom,artroom|red,grey
education bw/umbrella|X|||||an open umbrella standing alone reads as floating
education bw/umbrella_2|X|||||an open umbrella standing alone reads as floating
faces bw/alligator|X|||||a head only
faces bw/bear|X|||||a head only
faces bw/boy|X|||||a head only
faces bw/cat|X|||||a head only
faces bw/chicken|X|||||a head only
faces bw/cow|X|||||a head only
faces bw/dog|X|||||a head only
faces bw/donkey|X|||||a head only
faces bw/duck|X|||||a head only
faces bw/duckling|X|||||a head only
faces bw/elephant|X|||||a head only
faces bw/fox|X|||||a head only
faces bw/giraffe|X|||||a head only
faces bw/girl|X|||||a head only
faces bw/hippopotamus|X|||||a head only
faces bw/horse|X|||||a head only
faces bw/koala|X|||||a head only
faces bw/lion|X|||||a head only
faces bw/monkey|X|||||a head only
faces bw/mouse|X|||||a head only
faces bw/panda_2|X|||||a head only
faces bw/rabbit|X|||||a head only
faces bw/rhino|X|||||a head only
faces bw/sheep|X|||||a head only
faces bw/tiger|X|||||a head only
faces bw/walrus|X|||||a head only
faces bw/wolf|X|||||a head only
faces bw/zebra|X|||||a head only
faces bw/zebra_2|X|||||a head only
farm animals bw/alpaca|animal|140|g|mountain,farm|none,brown
farm animals bw/alpaca_2|animal|160|g|mountain,farm|none,brown
farm animals bw/antelope|animal|150|g|savanna|orange|noword: reads as a deer or a goat
farm animals bw/bee|animal|65|s|garden,meadow|yellow,lightblue
farm animals bw/bee_2|animal|60|s|garden,meadow|yellow,lightblue
farm animals bw/bull|animal|150|g|farm|brown
farm animals bw/camel|animal|170|g|desert|orange
farm animals bw/cat|animal|100|g|livingroom,farm,garden|orange
farm animals bw/chicken|animal|120|g|farm|none,red
farm animals bw/chicken_2|animal|120|g|farm|brown,red
farm animals bw/cow|animal|140|g|farm,meadow|none,brown,pink
farm animals bw/crab|animal|65|g|beach|red
farm animals bw/dog|animal|110|g|park,garden,farm|brown
farm animals bw/donkey|animal|150|g|farm|grey
farm animals bw/donkey_2|animal|140|g|farm|grey
farm animals bw/duck|animal|100|g|pond,farm|none,orange
farm animals bw/duck_2|animal|90|g|pond,farm|yellow,orange
farm animals bw/duck_3|animal|80|s|pond,farm|yellow,orange|a flying duck
farm animals bw/fish|animal|75|u|sea,pond,aquarium|orange,yellow
farm animals bw/pig|animal|110|g|farm|pink
farm animals bw/pigeon|animal|90|g|park,street,farm|grey
farm animals bw/pony|animal|140|g|farm,meadow|brown,yellow
farm animals bw/rabbit|animal|110|g|garden,farm|grey,pink
farm animals bw/sheep|animal|120|g|farm,meadow|none
farm animals bw/swan|animal|100|g,a|pond,park|none,orange
farm animals bw/turkey|animal|130|g|farm|brown,red
farm animals bw/unicorn|X|||||fantasy creature
farm animals bw/yak|animal|160|g|mountain,farm|brown
farm bw/barn|building|200|g|farm|red,brown,grey
farm bw/cat|animal|100|g|farm,livingroom|orange
farm bw/cow|animal|130|g|farm|none,brown,pink
farm bw/dog|animal|110|g|farm,park,garden|brown
farm bw/donkey|animal|130|g|farm|grey
farm bw/donkey_2|animal|150|g|farm|grey
farm bw/duck|animal|90|g|farm,pond|yellow,orange
farm bw/duck_2|animal|90|g|farm,pond|yellow,orange
farm bw/farmer|person|180|g|farm,market|blue,yellow,orange
farm bw/fence|object|110|g|farm,garden,meadow|brown
farm bw/goat|animal|130|g|farm,mountain|none,grey
farm bw/hay|object|120|g|farm|yellow
farm bw/horse|animal|170|g|farm,meadow|brown
farm bw/nest|animal|110|g|farm|brown,none
farm bw/pig|animal|110|g|farm|pink
farm bw/rabbit|animal|100|g|farm,garden,easter|grey,pink
farm bw/rooster|animal|140|g|farm|red,orange,brown
farm bw/scarecrow|person|190|g|farm,field|blue,yellow,brown
farm bw/sheep|animal|120|g|farm,meadow|none
farm bw/tractor|vehicle|150|g|farm,field|red,black
farm bw/turkey|animal|130|g|farm|brown,red
farm bw/vegetables|food|90|g,t|market,farm,kitchen|brown,green,orange
farm bw/watering_can|object|80|g|garden,farm|green
farm bw/wheelbarrow|object|90|g|garden,farm|red,black
farm bw/windmill|building|240|g|farm,field|brown,none
food bw/bread|food|55|t|bakery,kitchen,picnic|orange
food bw/burrito|food|45|t|kitchen,cafe|yellow,brown
food bw/cheese|food|50|t|kitchen,picnic,market|yellow
food bw/cheeseburger|food|65|t|cafe,kitchen|orange,brown,green
food bw/chocolate|food|65|t|sweets,shop|brown
food bw/cookie|food|55|t|bakery,kitchen|brown
food bw/croissant|food|45|t|bakery,cafe|orange
food bw/cupcake|food|70|t|bakery,party|pink,brown
food bw/cupcake_2|food|75|t|bakery,party|pink,brown
food bw/donut|food|55|t|bakery,cafe|pink,brown
food bw/donut_2|food|55|t|bakery,cafe|brown,pink
food bw/fish|animal|70|u|pond,aquarium|orange
food bw/french_fries|food|70|t|cafe|yellow,red
food bw/fried_chicken|food|70|t|cafe|orange,red
food bw/fried_egg|food|45|t|kitchen|none,yellow
food bw/hot_dog|food|35|t|cafe,picnic|orange,red
food bw/ice_cream|food|85|t|cafe,party|pink,brown
food bw/ice_cream_2|food|85|t|cafe,party|pink,orange
food bw/lollipop|food|80|t|party,sweets|pink
food bw/pizza|food|45|t|kitchen,party,cafe|orange,red
food bw/pizza_2|food|60|t|cafe,party|orange,red
food bw/popcorn|food|80|t|cinema,fair,party|red,yellow
food bw/pretzel|food|55|t|bakery,market|brown
food bw/sandwich|food|60|t|picnic,kitchen|orange,green
food bw/taco|food|45|t|cafe,kitchen|yellow,green
food bw/turkey|food|50|t|kitchen|orange
food bw 2/bread|food|60|t|bakery,kitchen|orange
food bw 2/cake|food|55|t|bakery,cafe|pink,brown
food bw 2/cake_2|food|75|t|party,bakery|pink,red
food bw 2/cake_3|food|80|t|party,bakery|pink,yellow
food bw 2/cheese|food|50|t|kitchen,market|yellow
food bw 2/chips|X|||||printed word CHIPS
food bw 2/croissant|food|40|t|bakery,cafe|orange
food bw 2/donut|food|55|t|bakery,cafe|pink,brown
food bw 2/drumstick|food|60|t|kitchen|orange
food bw 2/egg|food|60|t|kitchen|none,yellow
food bw 2/french_fries|food|70|t|cafe|yellow,red
food bw 2/hamburger|food|60|t|cafe|orange,brown,green
food bw 2/hamburger_2|food|60|t|cafe|orange,brown,green
food bw 2/hot_dog|food|35|t|cafe,picnic|orange,red
food bw 2/ice_cream|food|85|t|cafe,party|pink,orange
food bw 2/lollipop|food|80|t|party,sweets|pink
food bw 2/muffin|food|65|t|bakery,cafe|brown,yellow
food bw 2/pizza|food|55|t|cafe,party|orange,red
food bw 2/popcorn|food|80|t|cinema,fair|red,yellow
food bw 2/pretzel|food|55|t|bakery,market|brown
food bw 2/sallad|food|50|t|kitchen,picnic|green,red
food bw 2/sandwich|food|50|t|picnic,kitchen|orange,green
food bw 2/sausage|food|20|t|kitchen|red|thin — never a difference on its own
food bw 2/soup|food|70|t|kitchen|orange,blue
food bw 2/taco|food|45|t|cafe,kitchen|yellow,green
food bw 2/turkey|food|50|t|kitchen|orange
food bw 3/biberon|object|80|t|nursery|lightblue|baby bottle; marks on the scale are lines, not digits
food bw 3/bread|food|65|t|bakery,kitchen|orange
food bw 3/bread_2|food|60|t|bakery,kitchen|orange
food bw 3/cheese|food|50|t|kitchen,market|yellow
food bw 3/cookie|food|55|t|bakery,kitchen|brown
food bw 3/croissant|food|45|t|bakery,cafe|orange
food bw 3/egg|food|50|t|kitchen,farm|none
food bw 3/glass|object|60|t|kitchen,cafe|lightblue
food bw 3/hamburger|food|65|t|cafe|orange,brown,green
food bw 3/hot_dog|food|40|t|cafe,picnic|orange,red
food bw 3/milk|X|||||printed word MILK
food bw 3/milk_2|X|||||printed word MILK
food bw 3/pizza|food|65|t|cafe|orange,red
food bw 3/pizza_2|food|45|t|kitchen,party|orange,red
food bw 3/popcorn|X|||||printed word POPCORN
food bw 3/pretzel|food|55|t|bakery,market|brown
food bw 3/sandwich|food|60|t|picnic,kitchen|orange,green
food bw 3/sandwich_2|food|45|t|picnic,kitchen|orange,green
food bw 3/soda|food|65|t|cafe,picnic|red
fruits bw/apple|food|60|t,g|kitchen,market,orchard,picnic|red,green
fruits bw/apple_2|food|60|t,g|kitchen,market,orchard|green,brown
fruits bw/apricot|food|55|t|kitchen,market|orange,green|noword: reads as an apple or a peach
fruits bw/banana|food|50|t|kitchen,market,jungle|yellow
fruits bw/blackberry|food|60|t|kitchen,market|purple,green
fruits bw/cherry|food|60|t|kitchen,market,orchard|red,green
fruits bw/durian|X|||||reads as a spiky ball
fruits bw/grapes|food|65|t|kitchen,market|purple,green
fruits bw/lemon|food|50|t|kitchen,market|yellow,green
fruits bw/orange|food|55|t|kitchen,market|orange,green
fruits bw/pear|food|65|t|kitchen,market,orchard|green,brown
fruits bw/pineapple|food|80|t|kitchen,market|yellow,green
fruits bw/pomegranate|food|55|t|kitchen,market|red|noword: a plain round fruit
fruits bw/strawberry|food|60|t|kitchen,market,garden|red,green
fruits bw/watermelon|food|70|t,g|kitchen,market,picnic|green
furniture bw/armchair|object|110|g|livingroom|blue
furniture bw/armchair_2|object|120|g|livingroom|pink,brown
furniture bw/bed|object|120|g|bedroom|lightblue,brown
furniture bw/bowl|object|50|t|kitchen|blue
furniture bw/cabinet|object|150|g|kitchen,livingroom,bedroom|brown
furniture bw/chair|object|130|g|kitchen,livingroom,classroom|brown
furniture bw/coffee_table|object|80|g|livingroom|brown
furniture bw/couch|object|100|g|livingroom|green
furniture bw/dresser|object|130|g|bedroom|brown,yellow
furniture bw/dresser_2|object|110|g|bedroom|blue
furniture bw/filing_cabinet|object|180|g|office,classroom|grey
furniture bw/floor_lamp|object|180|g|livingroom,bedroom|yellow,brown
furniture bw/nightstand|object|100|g|bedroom|brown
furniture bw/sofa|object|100|g|livingroom|blue
furniture bw/stool|object|100|g|kitchen,classroom|brown
furniture bw/table|object|90|g|kitchen,livingroom,cafe|brown
furniture bw/table_lamp|object|90|t|livingroom,bedroom|yellow,brown
furniture bw/vanity_table|object|160|g|bedroom|pink,brown
furniture bw/wardrobe|object|210|g|bedroom|brown
furniture bw/wardrobe_2|object|200|g|bedroom|brown
home and nature bw/boombox|object|60|t,g|bedroom,party,beach|red,grey
home and nature bw/bowl|object|50|t|kitchen|blue
home and nature bw/bulb|object|60|t|lab|yellow
home and nature bw/chair|object|130|g|livingroom,kitchen,garden|brown
home and nature bw/cloud|sky|60|s|outdoor|none
home and nature bw/desk_lamp|object|80|t|bedroom,classroom,office|red
home and nature bw/door|X|||||a landscape drawn inside the door
home and nature bw/dress|object|100|w|clothes|pink
home and nature bw/fan|object|80|t,g|bedroom,livingroom|lightblue
home and nature bw/flower|plant|130|g|garden,park,meadow|pink,green
home and nature bw/frame|object|110|w|livingroom,bedroom|brown,lightblue
home and nature bw/house|building|200|g|garden,street,village|red,orange,brown
home and nature bw/leaf|plant|70|s|forest,park|orange
home and nature bw/moon|sky|100|s|night,space|yellow
home and nature bw/nest|animal|60|g,t|forest,garden|brown,lightblue
home and nature bw/plant|plant|110|g,t|livingroom,bedroom,classroom|green,orange
home and nature bw/plate|object|30|t|kitchen|lightblue
home and nature bw/saucepan|object|60|t|kitchen|grey
home and nature bw/sofa|object|90|g|livingroom|red
home and nature bw/spoon|object|60|t|kitchen|grey
home and nature bw/table|object|90|g|kitchen,livingroom|brown
home and nature bw/table_lamp|object|90|t|livingroom,bedroom|yellow,brown
home and nature bw/teacup|object|50|t|kitchen,cafe|lightblue
home and nature bw/trash_can|object|90|g|street,kitchen,park|grey
home and nature bw/tree|plant|230|g|park,forest,garden,street,meadow|green,brown
home and nature bw/tree_2|plant|230|g|park,forest,garden,meadow|green,brown
home and nature bw/tree_3|plant|230|g|park,forest,garden,street|green,brown
home bw/alarm_clock|object|60|t|bedroom|red
home bw/alarm_clock_2|object|60|t|bedroom|blue
home bw/armchair|object|110|g|livingroom|orange
home bw/bathtub|object|120|g|bathroom|lightblue,none
home bw/blender|object|90|t|kitchen|lightblue,grey
home bw/cactus|plant|80|t|livingroom,classroom|green,orange
home bw/calendar|object|70|w|kitchen,classroom|none,red
home bw/chandelier|object|90|s|livingroom|yellow|hangs from the ceiling (sky band of a room)
home bw/clock|X|||||a printed 12 on its face
home bw/colander|object|50|t|kitchen|red
home bw/cuckoo_clock|object|110|w|livingroom,kitchen|brown
home bw/cup|object|55|t|kitchen,cafe|lightblue
home bw/dresser|object|120|g|bedroom|brown,yellow
home bw/espresso_machine|object|80|t|kitchen,cafe|red,grey
home bw/fan|object|90|t,g|bedroom,livingroom|lightblue,grey
home bw/fishbowl|object|80|t|livingroom,bedroom|lightblue,orange
home bw/frame|X|||||a landscape drawn inside the frame
home bw/frying_pan|object|40|t|kitchen|grey
home bw/lamp|object|100|t|livingroom,bedroom|yellow,brown
home bw/microwave|object|60|t|kitchen|grey,lightblue
home bw/mixer|object|80|t|kitchen,bakery|pink,grey
home bw/mortar|object|60|t|kitchen|grey
home bw/oven|object|130|g|kitchen,bakery|grey,orange
home bw/pot|object|60|t|kitchen|red
home bw/refrigerator|object|200|g|kitchen|lightblue
home bw/rocking_chair|object|130|g|livingroom|brown
home bw/speaker|object|100|g|livingroom,party|grey
home bw/teapot|object|70|t|kitchen,cafe|lightblue
home bw/toaster|object|70|t|kitchen|red,grey
home bw/washing_machine|object|130|g|bathroom,laundry|none,lightblue
home bw 2/air_conditioning|object|50|w|livingroom,bedroom|none
home bw 2/alarm_clock|X|||||printed numerals on its face
home bw 2/armchair|object|120|g|livingroom|red,yellow
home bw 2/bathtub|object|120|g|bathroom|lightblue
home bw 2/bed|object|110|g|bedroom|blue,brown
home bw 2/blender|object|90|t|kitchen|lightblue,grey
home bw 2/broom|object|130|g|kitchen|brown,yellow
home bw 2/bucket|object|80|g|garden,farm,beach|blue
home bw 2/chair|object|130|g|kitchen,classroom|red
home bw 2/desk|object|110|g|classroom,office,bedroom|brown
home bw 2/fan|object|90|t,g|bedroom,livingroom|lightblue
home bw 2/fireplace|object|160|g|livingroom|red,orange
home bw 2/flower|plant|90|t,g|livingroom,classroom,garden|red,green
home bw 2/hanger|object|40|w|clothes,bedroom|brown
home bw 2/iron|object|50|t|laundry|lightblue
home bw 2/ironing_board|object|110|g|laundry|blue
home bw 2/padlock|object|60|t|shop|yellow
home bw 2/paintbrush|object|60|t|artroom|brown
home bw 2/paintbrush_2|object|70|t|artroom|brown,red
home bw 2/picture_frame|X|||||a landscape painted on the easel
home bw 2/pillow|object|50|t,g|bedroom|lightblue
home bw 2/sewing_machine|object|70|t|livingroom|pink,grey
home bw 2/table|object|90|g|livingroom,cafe|brown
home bw 2/table_lamp|object|90|t|livingroom,bedroom|yellow,brown
home bw 2/television|object|80|t,g|livingroom|grey,lightblue
home bw 2/toaster|object|70|t|kitchen|red
home bw 2/vacuum_cleaner|object|100|g|livingroom|red,grey
home bw 2/wardrobe|object|200|g|bedroom|brown
home bw 2/washing_machine|object|130|g|bathroom,laundry|none,lightblue
home bw 2/watering_can|object|75|g|garden|green
household bw/alarm_clock|X|||||printed numerals on its face
household bw/bathtub|object|110|g|bathroom|lightblue
household bw/bed|object|110|g|bedroom|pink,brown
household bw/blender|object|90|t|kitchen|lightblue,grey
household bw/bookshelf|object|210|g|livingroom,library,classroom|brown,red
household bw/bottle|object|80|t|kitchen,picnic|green
household bw/bowl|object|50|t|kitchen|red
household bw/broom|object|140|g|kitchen|brown,yellow
household bw/bucket|object|80|g|garden,farm|blue
household bw/cabinet|object|170|g|kitchen,bedroom|brown
household bw/camera|object|60|t|travel,livingroom|grey,black
household bw/computer|object|70|t|office,classroom|grey,lightblue
household bw/cup|object|50|t|kitchen,cafe|lightblue
household bw/curtain|object|180|w|livingroom,bedroom|red,lightblue
household bw/desk_lamp|object|80|t|bedroom,classroom|red
household bw/globe|object|80|t|classroom,library|blue,green
household bw/hanger|X|||||the drawing is a towel on a hanger (same art as a towel)
household bw/iron|object|60|t|laundry|lightblue
household bw/lamp|object|90|t|livingroom,bedroom|yellow,green
household bw/light|object|80|s|kitchen,livingroom|yellow|hangs from the ceiling
household bw/microwave|object|60|t|kitchen|grey,lightblue
household bw/plant|X|||||three flowers among the leaves: no colour plan reads them all (home and nature bw/plant is used instead)
household bw/refrigerator|object|200|g|kitchen|lightblue
household bw/sink|object|160|g|bathroom|none,lightblue
household bw/sofa|object|90|g|livingroom|blue
household bw/speaker|object|110|g|livingroom,party|grey
household bw/spray|object|60|t|bathroom,laundry|lightblue
household bw/tablet|object|60|t|livingroom,office|grey
household bw/telephone|object|50|t|livingroom,office|red
household bw/television|object|80|t,g|livingroom|grey,lightblue
household bw/toilet|object|110|g|bathroom|none,lightblue
household bw/toilet_paper|object|60|t|bathroom|none
household bw/towel|object|80|w|bathroom|lightblue
household bw/umbrella|X|||||an open umbrella standing alone reads as floating
household bw/vacuum_cleaner|object|100|g|livingroom|green,grey
household bw/vanity|X|||||stands on its own rug
household bw/washing_machine|object|130|g|bathroom,laundry|none,lightblue
household bw/window|object|170|w|livingroom,bedroom,kitchen,classroom|lightblue,pink
kitchen bw/blender|object|90|t|kitchen|lightblue,grey
kitchen bw/bottle|object|80|t|kitchen|green
kitchen bw/bowl|object|50|t|kitchen|orange
kitchen bw/chefs_knife_2|X|||||a sharp knife
kitchen bw/coffee_carafe|object|70|t|kitchen,cafe|grey
kitchen bw/cutting_board|object|40|t|kitchen|brown
kitchen bw/electric_kettle|object|75|t|kitchen|lightblue
kitchen bw/fork|object|60|t|kitchen|grey|thin — never a difference on its own
kitchen bw/frying_pan|object|45|t|kitchen|grey
kitchen bw/glass|object|65|t|kitchen,cafe|lightblue
kitchen bw/grater|object|65|t|kitchen|grey
kitchen bw/jar|object|65|t|kitchen,pantry|lightblue
kitchen bw/kitchen_scale|object|75|t|kitchen,bakery|red
kitchen bw/ladle|object|70|t|kitchen|grey|thin — never a difference on its own
kitchen bw/microwave|object|60|t|kitchen|grey,lightblue
kitchen bw/plate|object|30|t|kitchen|lightblue
kitchen bw/pot|object|60|t|kitchen|red
kitchen bw/refrigerator|object|200|g|kitchen|lightblue
kitchen bw/rolling_pin|object|30|t|kitchen,bakery|brown
kitchen bw/saucepan|object|45|t|kitchen|grey
kitchen bw/spatula|object|70|t|kitchen|grey|thin — never a difference on its own
kitchen bw/spatula_2|object|70|t|kitchen|grey|thin — never a difference on its own
kitchen bw/spoon|object|65|t|kitchen|grey|thin — never a difference on its own
kitchen bw/teacup|object|50|t|kitchen,cafe|lightblue
kitchen bw/teapot|object|70|t|kitchen,cafe|lightblue
kitchen bw/whisk|object|70|t|kitchen,bakery|grey|thin — never a difference on its own
nature bw/bird|animal|70|g|garden,farm,park|yellow,orange
nature bw/butterfly|animal|70|s|garden,meadow,park|purple,orange
nature bw/cactus|plant|130|t,g|livingroom,classroom|green,orange|a POTTED cactus — never in a desert
nature bw/campfire|object|90|g|camp,night|orange,brown
nature bw/cloudy|sky|90|s|outdoor|none,yellow|noword: 'cloudy' is an adjective in a list of nouns (native review 2026-10-10)
nature bw/droplet|X|||||a lone water drop
nature bw/fish|animal|70|u|sea,pond,aquarium|orange
nature bw/flower|plant|130|g|garden,meadow|yellow,green
nature bw/ladybug|animal|55|g|garden,meadow|red
nature bw/leaf|plant|70|s|forest,park|green
nature bw/moon|sky|100|s|night,space|yellow
nature bw/mushroom|plant|90|g|forest,garden|red,none
nature bw/plant|plant|90|g|garden|green
nature bw/pyramid|building|180|g|desert|orange
nature bw/rain|sky|100|s|rain|lightblue,blue
nature bw/snowflake|sky|55|s|winter|lightblue
nature bw/star|sky|45|s|night,space|yellow
nature bw/sun|sky|110|s|outdoor|yellow
nature bw/tree|plant|240|g|park,forest,garden,meadow|green,brown
nature bw/tree_2|plant|240|g|park,forest,garden|green,brown
nature bw/umbrella|X|||||an open umbrella standing alone reads as floating
objects bw/binoculars|object|50|t|camp,travel|black,grey
objects bw/blanket|object|50|g|picnic,camp|red,yellow
objects bw/bone|object|35|g|park,garden|none|beside a dog
objects bw/bottle|X|||||printed word Water
objects bw/bucket|object|80|g|garden,farm,beach|blue
objects bw/bulb|object|60|t|lab|yellow
objects bw/comb|object|50|t|bathroom|pink
objects bw/globe|object|80|t|classroom,library|blue,green
objects bw/gloves|object|60|t,w|clothes,garden|green
objects bw/guitar|object|130|g|music,stage,bedroom|orange,brown
objects bw/hanger|object|40|w|clothes|brown
objects bw/hoodie|object|90|w|clothes|green
objects bw/iron|object|55|t|laundry|lightblue
objects bw/iron_2|object|55|t|laundry|blue
objects bw/jacket|object|90|w|clothes|red
objects bw/jeans|object|100|w|clothes|blue
objects bw/kettle|object|70|t|kitchen|red
objects bw/key|object|50|t|livingroom|yellow
objects bw/ladder|object|180|g|garden,shed,orchard|brown
objects bw/magnifying_glass|object|60|t|classroom,garden|grey
objects bw/medal|object|60|t,w|sports|yellow,red
objects bw/padlock|X|||||printed word LOCK
objects bw/scarf|object|90|w,t|clothes,winter|red
objects bw/shoe|object|60|g|clothes,bedroom|red,none
objects bw/shoes_2|object|50|g|clothes,bedroom|blue
objects bw/shorts|object|60|w|clothes|blue
objects bw/smartphone|object|60|t|livingroom|grey
objects bw/sneaker|object|40|g|clothes,sports|blue,none
objects bw/sneakers|object|55|g|clothes,sports|red,none
objects bw/spoon|object|60|t|kitchen|grey|thin — never a difference on its own
objects bw/suitcase|object|80|g|travel,station|brown
objects bw/sweater|object|90|w|clothes|green
objects bw/telescope|object|130|g|night,space|blue
objects bw/toothbrush|object|60|t|bathroom|lightblue|thin — never a difference on its own
objects bw/toothpaste|X|||||printed word Toothpaste
objects bw/vase|object|70|t|livingroom|blue
objects bw/whistle|object|50|t|sports|grey,red
sea life bw/clown_fish|animal|75|u|sea,reef|orange,none
sea life bw/crab|animal|70|g,u|beach,reef|red
sea life bw/dolphin|animal|130|u|sea|blue
sea life bw/fish|animal|70|u|sea,reef|yellow,orange
sea life bw/fish_2|animal|70|u|sea,reef|orange,yellow
sea life bw/fish_3|animal|65|u|sea,reef|blue,yellow
sea life bw/jellyfish|animal|110|u|sea|pink,purple
sea life bw/lobster|animal|70|u|sea,reef|red
sea life bw/narwhal|animal|90|u|polar,sea|lightblue
sea life bw/octopus|animal|100|u|sea,reef|purple
sea life bw/orca|animal|80|u|sea,polar|black,none
sea life bw/penguin|animal|110|g|polar,zoo|black,none,orange
sea life bw/pufferfish|animal|80|u|sea,reef|yellow,orange
sea life bw/seahorse|animal|110|u|sea,reef|orange
sea life bw/shark|animal|80|u|sea|grey
sea life bw/squid|animal|100|u|sea|pink
sea life bw/starfish|animal|70|g,u|beach,reef|orange
sea life bw/stingray|animal|90|u|sea,reef|grey
sea life bw/swordfish|animal|60|u|sea|blue|thin sword — small changes only
sea life bw/turtle|animal|100|u|sea,reef|green,brown
sea life bw/walrus|animal|100|g|polar|grey|noword: reads as a seal (no tusks)
sea life bw/whale|animal|90|u|sea|lightblue
sea life bw 2/clown_fish|animal|75|u|sea,reef|orange,none
sea life bw 2/dolphin|animal|110|u|sea|blue
sea life bw 2/fish|animal|70|u|sea,reef|yellow,orange
sea life bw 2/hermit_crab|animal|80|g,u|beach,reef|red,pink
sea life bw 2/jellyfish|animal|100|u|sea|pink
sea life bw 2/narwhal|animal|80|u|polar,sea|lightblue
sea life bw 2/octopus|animal|100|u|sea,reef|purple
sea life bw 2/puffer|animal|80|u|sea,reef|yellow
sea life bw 2/seahorse|animal|110|u|sea,reef|orange
sea life bw 2/seal|animal|90|g|polar,harbour,beach|grey
sea life bw 2/shark|animal|80|u|sea|grey
sea life bw 2/shrimp|X|||||its head outline is open to the paper — the head cannot be painted
sea life bw 2/snail|animal|70|g|garden,forest|orange,green
sea life bw 2/squid|animal|100|u|sea|pink
sea life bw 2/starfish|animal|75|g,u|beach,reef|orange
sea life bw 2/stingray|animal|90|u|sea,reef|grey
sea life bw 2/turtle|animal|80|u|sea,reef|green,brown
sea life bw 2/whale|animal|80|u|sea|lightblue
space bw/earth|sky|100|s|space|blue,green|noword: fi 'maa' reads as ground; the Earth beside a planet makes 'planet' a second right answer (native review 2026-10-10)
space bw/meteor|sky|80|s|space|orange,grey
space bw/planet|sky|90|s|space,night|orange,yellow
space bw/planet_2|sky|90|s|space,night|purple,lightblue
space bw/rocket|vehicle|150|g,s|space,night|red,none
space bw/sky|sky|100|s|night,space|yellow|a moon with two stars
space bw/telescope|object|120|g|night,space|blue
space bw/ufo|vehicle|70|s|space,night|lightblue,grey
sports bw/badminton|object|60|g|sports,park|none,red
sports bw/baseball|object|90|g|sports|brown|a bat — thin
sports bw/baseball_2|object|60|g|sports,park,playground|none,red
sports bw/basketball|object|70|g|sports,playground|orange
sports bw/beach_ball|object|70|g|beach,park,playground|red,yellow,blue
sports bw/bicycle|vehicle|110|g|park,street,playground|red
sports bw/bowling|object|70|g|sports|blue|noword: a plain ball
sports bw/boxing|object|70|t|sports|red
sports bw/cap|object|50|t|sports,clothes|blue
sports bw/cricket|object|90|g|sports|brown|a bat — thin
sports bw/dart|object|80|w|sports,livingroom|red,none
sports bw/dumbbell|object|50|g|sports|grey
sports bw/dumbbell_2|object|40|g|sports|grey
sports bw/eight_ball|X|||||a printed 8
sports bw/flag|object|120|g|sports|none,black
sports bw/football|object|60|g|sports|red,grey
sports bw/football_2|object|55|g|sports,park|brown
sports bw/goggles|object|35|t|sports,winter|blue
sports bw/golf|X|||||stands in its own grass patch
sports bw/golf_2|object|45|g|sports|none|noword: a plain ball
sports bw/helmet|object|70|t,g|sports|red
sports bw/hockey|object|100|g|sports,winter|brown|a stick — thin
sports bw/ice_skate|object|70|g|winter,sports|lightblue
sports bw/kettlebell|object|60|g|sports|grey
sports bw/race_car|vehicle|60|g|sports|red|carries a printed 1
sports bw/rollerblade|object|75|g|sports,park|pink
sports bw/rosette|object|70|w|sports,fair|blue,yellow
sports bw/scale|X|||||printed digits 45.32
sports bw/scooter|vehicle|100|g|street,town|red
sports bw/skateboard|object|35|g|park,playground,street|orange
sports bw/soccer|object|65|g|sports,park,playground|none,black
sports bw/stopwatch_2|X|||||printed numerals on its face
sports bw/table_tennis|object|60|t|sports|red
sports bw/tape_measure|object|55|t|shed,tools|yellow
sports bw/tennis|object|60|g|sports|yellow
sports bw/trophy|object|90|t|sports|yellow
sports bw/volleyball|object|65|g|sports,beach|yellow,blue
sports bw/whistle|object|50|t|sports|grey
sports bw 2/basketball|object|65|g|sports,playground|orange
sports bw 2/bowling_ball|object|65|g|sports|blue|noword: a plain ball
sports bw 2/bowling_pin|object|80|g|sports|none,red
sports bw 2/boxing_glove|object|75|t|sports|red
sports bw 2/flag|object|130|g|sports,beach,camp|red
sports bw 2/football|object|55|g|sports,park|brown
sports bw 2/helmet|object|70|t,g|sports|blue
sports bw 2/ice_skate|object|70|g|winter|lightblue
sports bw 2/jump_rope|object|70|g|playground,park|pink
sports bw 2/shuttlecock|object|55|g|sports|none
sports bw 2/skateboard|object|35|g|park,playground,street|green
sports bw 2/sneaker|object|45|g|sports,clothes|blue
sports bw 2/soccer_ball|object|65|g|sports,park,playground|none,black
sports bw 2/stopwatch|X|||||printed zeros on its face
sports bw 2/tennis_ball|object|55|g|sports,park|yellow
sports bw 2/tennis_racket|object|90|g|sports|blue
sports bw 2/torch|X|||||a held flame
sports bw 2/trophy|object|90|t|sports|yellow
sports bw 2/volleyball|object|70|g|sports,beach|yellow,blue
sports bw 2/water_bottle|object|70|t,g|sports,camp|blue
tools bw/axe|X|||||a sharp tool
tools bw/axe_2|X|||||a sharp tool
tools bw/bolt|object|60|t|shed,tools|grey
tools bw/chainsaw|X|||||a dangerous tool
tools bw/double-ended_wrench|object|80|t,w|shed,tools|grey|thin — never a difference on its own
tools bw/electric_drill|object|60|t|shed,tools|yellow,black
tools bw/garden_fork|object|110|g|garden,shed|grey,brown
tools bw/gloves|object|60|t,g|garden,shed|green
tools bw/hammer|object|70|t,w|shed,tools|grey,brown
tools bw/handsaw|X|||||a sharp tool
tools bw/ladder|object|180|g|garden,shed,orchard|brown
tools bw/lawn_mower|object|100|g|garden|red,black
tools bw/paint_roller|object|70|t|shed,artroom|blue,yellow
tools bw/pickaxe|X|||||a sharp tool
tools bw/pipe_wrench|object|35|t|shed,tools|red|thin — never a difference on its own
tools bw/pliers|object|70|t|shed,tools|red|thin — never a difference on its own
tools bw/pruning_shears|X|||||a sharp tool
tools bw/rubber_boot|object|80|g|garden,rain|yellow
tools bw/screw|object|60|t|shed,tools|grey
tools bw/screwdriver|object|60|t|shed,tools|red
tools bw/shovel|object|130|g|garden,shed,winter|brown,grey
tools bw/sickle|X|||||a sharp tool
tools bw/traffic_cone|object|90|g|street,roadworks|orange,none
tools bw/trowel|object|60|g,t|garden|grey,brown
tools bw/wheelbarrow|object|90|g|garden,farm|green,black
tools bw/wrench|object|80|t,w|shed,tools|grey|thin — never a difference on its own
tools bw/wrench_2|object|70|t,w|shed,tools|grey|thin — never a difference on its own
toys bw/airplane|vehicle|60|s,t|toyshop,bedroom,sky|lightblue,red
toys bw/boat|vehicle|70|t,a|toyshop,bathroom|red,none
toys bw/bucket|object|80|g|beach,playground|red,yellow
toys bw/cactus|plant|90|t|toyshop,desert|green,orange|a toy cactus with a face
toys bw/car|vehicle|80|g,t|toyshop,street,bedroom|red
toys bw/dinosaur|animal|100|g,t|toyshop,dino,bedroom|green
toys bw/drum|object|70|g,t|toyshop,music,bedroom|red,yellow
toys bw/duck|object|70|t,a|bathroom,toyshop|yellow,orange|a rubber duck — never 'duck' on a word face
toys bw/garbage_truck|vehicle|120|g|street,town|green,grey
toys bw/guitar|object|110|g|music,bedroom,toyshop|orange,brown
toys bw/helicopter|vehicle|70|s,t|toyshop,bedroom|yellow,lightblue
toys bw/loader|vehicle|80|g|roadworks,toyshop|yellow,black
toys bw/monster_truck|vehicle|100|g|toyshop|red,black
toys bw/motorcycle|vehicle|100|g|street|red,black
toys bw/party_hat|object|60|t|party|pink,yellow
toys bw/robot|X|||||printed digits on its chest
toys bw/rocket|vehicle|100|g,t|toyshop,bedroom,space|red,none
toys bw/rocking_horse|object|100|g|bedroom,toyshop|brown,yellow
toys bw/spinning_top|object|70|g,t|toyshop,bedroom|red,yellow
toys bw/tank|X|||||a war machine
toys bw/teddy_bear|object|90|g,t|bedroom,toyshop|brown
toys bw/tractor|vehicle|100|g|farm,toyshop|green,black
toys bw/train|vehicle|50|g,t|toyshop,bedroom|red,blue
toys bw/trumpet|object|45|t|music,party|yellow
toys bw/ufo|vehicle|50|s|space,night|lightblue,grey
toys bw/video_game|object|50|t|livingroom,bedroom|grey
toys bw 2/bucket|object|80|g|beach,playground|blue,yellow
toys bw 2/car|vehicle|45|g|street|red
toys bw 2/controller|object|60|t|livingroom,bedroom|grey
toys bw 2/dice|object|60|t,g|toyshop,livingroom|none,black
toys bw 2/dog|animal|100|g|park,garden,livingroom|brown
toys bw 2/duck|animal|90|g|pond,farm|none,orange
toys bw 2/guitar|object|130|g|music|red
toys bw 2/helicopter|vehicle|70|s|toyshop,sky|red,lightblue
toys bw 2/keyboard|object|40|t|music,bedroom|none,black
toys bw 2/kite|object|130|s|park,beach,meadow|red,yellow
toys bw 2/lego|X|||||a brand toy brick
toys bw 2/pinwheel|object|100|g,t|park,beach,garden|blue,yellow
toys bw 2/puzzle|object|65|t|classroom,toyshop|blue,red
toys bw 2/robot|object|100|g,t|toyshop,bedroom|grey,red
toys bw 2/rocket|vehicle|110|g|space,toyshop|red,none
toys bw 2/rocking_horse|object|100|g|bedroom,toyshop|brown,yellow
toys bw 2/teddy_bear|object|90|g,t|bedroom,toyshop|brown
toys bw 2/telephone|object|60|t|livingroom,toyshop|red
toys bw 2/truck|vehicle|80|g|roadworks,toyshop,street|yellow,grey
toys bw 2/trumpet|object|35|t|music,party|yellow
toys bw 2/ufo|vehicle|60|s|space,night|lightblue,grey
toys bw 2/xylophone|object|40|t,g|music,toyshop|red,yellow,blue
travel and holiday bw/airplane|vehicle|80|s|sky,airport|lightblue,red
travel and holiday bw/backpack|object|90|g|camp,travel,classroom|green
travel and holiday bw/binoculars|object|50|t|camp,travel|black,grey
travel and holiday bw/bus|vehicle|150|g|street,town|yellow
travel and holiday bw/cabin|building|170|g|forest,camp,mountain|brown
travel and holiday bw/cable_car|X|||||hangs from its own cable line
travel and holiday bw/camp|X|||||a whole little scene with trees and ground
travel and holiday bw/camper|vehicle|130|g|camp,street|none,lightblue
travel and holiday bw/campfire|object|100|g|camp,night|orange,brown
travel and holiday bw/car|vehicle|100|g|street,camp,town|red,brown
travel and holiday bw/cruise|vehicle|110|a|sea,harbour|none,blue
travel and holiday bw/double-decker|vehicle|140|g|street,town|red
travel and holiday bw/food|X|||||a laid table — a little scene of its own
travel and holiday bw/gas_pump|object|140|g|street|red
travel and holiday bw/globe|object|80|t|classroom,library|blue,green
travel and holiday bw/hat|object|35|t|clothes,travel|brown
travel and holiday bw/hotel|X|||||printed word HOTEL
travel and holiday bw/island|X|||||a whole little island with its own sea
travel and holiday bw/kayak|vehicle|60|a,g|river,lake,beach|orange
travel and holiday bw/lighthouse|building|260|g|beach,harbour|red,none
travel and holiday bw/lightning|sky|110|s|storm|grey,yellow
travel and holiday bw/log_cabin|building|170|g|forest,camp,winter|brown
travel and holiday bw/lounge|object|130|g|beach,pool|blue,red
travel and holiday bw/map|object|70|t|travel,classroom|yellow,lightblue
travel and holiday bw/mountain|building|130|g|mountain,camp|grey,none|a far mountain range — background only, never a difference
travel and holiday bw/museum|building|180|g|town,street|grey
travel and holiday bw/passport|X|||||printed word PASS
travel and holiday bw/scuba_diving|object|70|t,g|beach|blue
travel and holiday bw/shopping_cart|object|100|g|market,shop|grey,pink
travel and holiday bw/signpost|object|160|g|forest,camp,park|brown|noword: fi 'opastekyltti' / pt 'placa de sinalização' are adult words (native review 2026-10-10)
travel and holiday bw/stage|building|160|g|fair,stage|red,brown
travel and holiday bw/suitcase|object|90|g|travel,station|blue
travel and holiday bw/sunglasses|object|30|t|beach|black
travel and holiday bw/sunrise|X|||||sits on its own sea waves
travel and holiday bw/taxi|X|||||printed word TAXI
travel and holiday bw/tent|object|150|g|camp|green,orange
travel and holiday bw/ticket|object|50|t|station,travel|yellow
travel and holiday bw/train|X|||||stands on its own track lines
travel and holiday bw/yacht|vehicle|110|a|sea,harbour|none,blue
valentine bw/angel|X|||||winged heart with a halo — religious
valentine bw/balloon|object|130|s,w|party|red,pink
valentine bw/cake|food|100|t|party,bakery|pink,yellow
valentine bw/candle|object|70|t|livingroom|pink,yellow
valentine bw/candy|food|40|t|sweets,party|pink
valentine bw/card|object|60|t|post,party|pink
valentine bw/coffee_mug|object|55|t|kitchen,cafe|red
valentine bw/conversation|X|||||speech bubbles
valentine bw/cupcake|food|70|t|bakery,party|pink,brown
valentine bw/gift_box|object|80|g,t|party|red,pink
valentine bw/gift_box_2|object|80|g,t|party|pink,red
valentine bw/greeting_card|object|70|t|party,post|pink
valentine bw/heart|X|||||a symbol, not a thing in a scene
valentine bw/key|object|60|t|livingroom|yellow
valentine bw/note|X|||||a music symbol
valentine bw/padlock|object|60|t|shop|yellow
valentine bw/page|X|||||a printed 14
valentine bw/ring|X|||||jewellery rings
valentine bw/shopping_bag|object|80|g|market,shop|pink
valentine bw/teddy_bear|object|90|g,t|bedroom,toyshop|brown,red
valentine bw 2/balloon|object|130|s,w|party|red,pink
valentine bw 2/cake|food|100|t|party,bakery|pink,yellow
valentine bw 2/calendar|X|||||a printed 14
valentine bw 2/diamond|X|||||jewellery ring
valentine bw 2/gift|object|85|g,t|party|red,pink
valentine bw 2/handbag|object|70|g,t|shop,clothes|pink
valentine bw 2/key|object|70|t|livingroom|yellow
valentine bw 2/letter|object|55|t|post|pink,none
valentine bw 2/perfume|X|||||an adult cosmetic
valentine bw 2/sunglasses|object|30|t|beach,party|pink
valentine bw 2/tulip|plant|110|g|garden|red,green
vegetables bw/beetroot|food|70|t,g|market,garden,kitchen|purple,green
vegetables bw/bell_pepper|food|60|t|market,kitchen|red,green
vegetables bw/broccoli|food|65|t|market,kitchen|green
vegetables bw/carrot|X|||||its leaves are one part with the root: they cannot be painted green (Easter bw/carrot is used)
vegetables bw/corn|food|80|t|market,farm,kitchen|yellow,green
vegetables bw/cucumber|food|25|t|market,kitchen|green|thin
vegetables bw/eggplant|food|55|t|market,kitchen|purple,green
vegetables bw/garlic|food|60|t|market,kitchen|none
vegetables bw/lettuce|food|60|t,g|market,garden,kitchen|lightgreen
vegetables bw/onion|food|60|t|market,kitchen|orange
vegetables bw/potato|food|45|t|market,kitchen|brown
vegetables bw/pumpkin|food|90|g,t|farm,garden,market|orange,green
vegetables bw/radish|food|70|t,g|market,garden|red,green
vegetables bw/tomato|food|55|t|market,kitchen|red,green
vegetables bw 2/cauliflower|food|65|t|market,kitchen|none,green
vegetables bw 2/corn|food|80|t|market,farm|yellow,green
vegetables bw 2/eggplant|food|60|t|market,kitchen|purple,green
vegetables bw 2/lettuce|food|65|t,g|market,garden|lightgreen
vegetables bw 2/lettuce_2|food|60|t,g|market,garden|lightgreen
vegetables bw 2/mushroom|plant|80|g,t|forest,market|red,none
vegetables bw 2/pea|food|60|t|market,kitchen|green
vegetables bw 2/pepper|food|60|t|market,kitchen|red,green
vegetables bw 2/radish|food|75|t,g|market,garden|red,green
vegetables bw 2/spinach|food|70|t|market,kitchen|green
vegetables bw 2/turnip|food|75|t,g|market,garden|purple,green
vehicles bw/airplane|vehicle|60|s|sky,airport|lightblue,red
vehicles bw/ambulance|vehicle|110|g|street,town|none,red
vehicles bw/boat|vehicle|130|a|sea,lake,harbour|none,red
vehicles bw/boat_2|vehicle|100|a|sea,harbour|red,none
vehicles bw/bus|vehicle|110|g|street,town|yellow
vehicles bw/bus_2|vehicle|90|g|street,town|red
vehicles bw/camper|vehicle|110|g|street,camp|none,lightblue
vehicles bw/car|vehicle|50|g|street|red|a sports car — low and long
vehicles bw/car_2|vehicle|60|g|street,town|blue
vehicles bw/car_3|vehicle|110|g|street|yellow|seen from the front
vehicles bw/cement_mixer|vehicle|100|g|roadworks,street|orange,grey
vehicles bw/crane|vehicle|130|g|roadworks,harbour|yellow,grey
vehicles bw/delivery_truck|vehicle|100|g|street,town|lightblue,none
vehicles bw/dumper_truck|vehicle|100|g|roadworks|yellow,grey
vehicles bw/excavator|vehicle|120|g|roadworks|yellow,black
vehicles bw/forklift|vehicle|100|g|harbour,station|orange,black
vehicles bw/garbage_truck|vehicle|90|g|street,town|green,grey
vehicles bw/jeep|vehicle|90|g|savanna,street,camp|green,black
vehicles bw/monster_truck|vehicle|110|g|fair,toyshop|red,black
vehicles bw/motorcycle|vehicle|90|g|street|red,black
vehicles bw/pickup|vehicle|60|g|farm,street|red
vehicles bw/pickup_2|vehicle|90|g|farm,street|blue,green
vehicles bw/race_car|vehicle|50|g|sports|red
vehicles bw/sailboat|vehicle|160|a|sea,lake,harbour|none,red
vehicles bw/scooter|vehicle|100|g|street,town|pink,black
vehicles bw/suv|vehicle|65|g|street|grey
vehicles bw/tanker_truck|vehicle|70|g|street,harbour|orange,grey
vehicles bw/tow_truck|vehicle|90|g|street|red,grey
vehicles bw/tractor|vehicle|130|g|farm,field|green,black
vehicles bw/train|vehicle|120|g|station,toyshop|red,blue
vehicles bw 2/airplane|vehicle|60|s|sky,airport|lightblue
vehicles bw 2/airplane_2|vehicle|90|s|sky,airport|lightblue,red
vehicles bw 2/ambulance|vehicle|110|g|street,town|none,red
vehicles bw 2/boat|vehicle|110|a|sea,harbour|red,none
vehicles bw 2/boat_2|vehicle|120|a|sea,harbour|blue,none
vehicles bw 2/bus|vehicle|80|g|street,town|yellow
vehicles bw 2/bus_2|vehicle|100|g|street,town|yellow
vehicles bw 2/camper|vehicle|100|g|camp,street|none,orange
vehicles bw 2/car|vehicle|70|g|street,town|blue
vehicles bw 2/crane|vehicle|100|g|roadworks,street|yellow,grey
vehicles bw 2/delivery_truck|vehicle|100|g|street,town|none,red
vehicles bw 2/dump_truck|vehicle|90|g|roadworks|yellow,grey
vehicles bw 2/excavator|vehicle|130|g|roadworks|yellow,black
vehicles bw 2/excavator_2|vehicle|130|g|roadworks|orange,black
vehicles bw 2/garbage_truck|vehicle|90|g|street,town|green,grey
vehicles bw 2/helicopter_2|vehicle|90|s|sky,airport|red,lightblue
vehicles bw 2/hot_air_balloon|vehicle|160|s|sky,meadow,fair|red,yellow
vehicles bw 2/mixer_truck|vehicle|100|g|roadworks,street|orange,grey
vehicles bw 2/monster_truck|vehicle|120|g|fair|red,black
vehicles bw 2/pickup_2|vehicle|80|g|farm,street|red
vehicles bw 2/police_car|vehicle|80|g|street,town|blue,none
vehicles bw 2/race_car|vehicle|45|g|sports|red
vehicles bw 2/rocket|vehicle|150|g,s|space|red,none
vehicles bw 2/submarine|vehicle|70|u|sea|yellow
vehicles bw 2/tanker_truck|vehicle|70|g|street|orange,grey
vehicles bw 2/taxi|X|||||printed word TAXI
vehicles bw 2/tow_truck|vehicle|100|g|street|red,grey
vehicles bw 2/tractor|vehicle|140|g|farm,field|green,black
vehicles bw 2/train|vehicle|130|g|station,countryside|red,black|stands on its own short rail
vehicles bw 2/train_2|X|||||runs on a slanted track of its own
vehicles bw 2/ufo|vehicle|70|s|space,night|lightblue,grey
vehicles bw 2/van|vehicle|100|g|street,camp|orange,none
vehicles bw 2/van_2|vehicle|110|g|street,camp|lightblue,none
vehicles bw 2/van_3|vehicle|90|g|street,camp|green,none
vehicles bw 3/ambulance|vehicle|110|g|street,town|none,red
vehicles bw 3/baby_carriage|object|110|g|park,street|pink,black
vehicles bw 3/boat|vehicle|110|a|sea,harbour,lake|red,none
vehicles bw 3/boat_2|vehicle|60|a|river,lake|brown
vehicles bw 3/camper|vehicle|100|g|camp,street|none,lightblue
vehicles bw 3/car|vehicle|70|g|street,town|red
vehicles bw 3/carriage|vehicle|120|g|castle,fair|purple,yellow
vehicles bw 3/fire_truck|vehicle|90|g|street,town|red
vehicles bw 3/forklift|vehicle|100|g|harbour,station|orange,black
vehicles bw 3/garbage_truck|vehicle|80|g|street,town|green,grey
vehicles bw 3/ice_cream_truck|vehicle|110|g|street,park,beach|pink,none
vehicles bw 3/minibus|vehicle|90|g|street,town|lightblue
vehicles bw 3/mixer_truck|vehicle|90|g|roadworks,street|orange,grey
vehicles bw 3/motorcycle|vehicle|80|g|street|pink,black
vehicles bw 3/police_car|vehicle|60|g|street,town|blue,none
vehicles bw 3/rocket|vehicle|160|g,s|space|red,none
vehicles bw 3/van|vehicle|80|g|street,camp|green
zoo animals bw/alligator|animal|120|g|river,zoo|green
zoo animals bw/bear|animal|150|g|forest,zoo,polar|none,grey|noword: a white bear, may read as a polar bear
zoo animals bw/bear_2|animal|140|g|forest,zoo|brown
zoo animals bw/dinosaur|animal|130|g|dino|green
zoo animals bw/dog|animal|110|g|park,garden|brown
zoo animals bw/elephant|animal|190|g|savanna,zoo|grey
zoo animals bw/flamingo|animal|170|g|pond,zoo|pink
zoo animals bw/fox|animal|110|g|forest|orange,none
zoo animals bw/giraffe|animal|240|g|savanna,zoo|yellow,brown
zoo animals bw/gorilla|animal|150|g|jungle,zoo|grey
zoo animals bw/hippopotamus|animal|140|g|savanna,zoo|purple
zoo animals bw/hippopotamus_2|animal|130|g|savanna,river,zoo|purple
zoo animals bw/kangaroo|animal|150|g|outback,zoo|orange
zoo animals bw/koala|animal|110|g|outback,zoo|grey
zoo animals bw/leopard|animal|130|g|savanna,jungle,zoo|yellow,brown
zoo animals bw/lion|animal|150|g|savanna,zoo|yellow,orange
zoo animals bw/lion_2|animal|140|g|savanna,zoo|yellow,orange
zoo animals bw/monkey|animal|110|g|jungle,zoo|brown,orange
zoo animals bw/panda|X|||||its bamboo leaves cannot all be painted (half-green stems)
zoo animals bw/panda_2|animal|120|g|zoo|orange|noword: reads as a raccoon or a red panda
zoo animals bw/porcupine|animal|90|g|forest|brown|noword: reads as a hedgehog
zoo animals bw/porcupine_2|animal|90|g|forest|brown|noword: reads as a hedgehog
zoo animals bw/reindeer|animal|150|g|winter,forest|brown
zoo animals bw/rhinoceros|animal|150|g|savanna,zoo|grey
zoo animals bw/seal|animal|90|g|polar,harbour,zoo|grey
zoo animals bw/sloth|animal|110|g|jungle,zoo|brown
zoo animals bw/snake|animal|110|g|jungle,zoo|green,yellow
zoo animals bw/turtle|animal|90|g|pond,zoo|green,brown
zoo animals bw/yak|animal|140|g|mountain,zoo|brown
zoo animals bw/zebra|animal|170|g|savanna,zoo|none
`;
module.exports = { ROWS };

/** the parsed catalogue: Map src → { src, kind, h, places[], tags[], colours[], note, refused } */
const PARSED = new Map();
for (const line of ROWS.split('\n').map((l) => l.trim()).filter(Boolean)) {
  const [src, kind, h, places, tags, colours, note] = line.split('|');
  const refused = kind === 'X';
  PARSED.set(src, { src, kind, h: +h || 0, places: (places || '').split(',').filter(Boolean), tags: (tags || '').split(',').filter(Boolean),
    colours: (colours || '').split(',').filter(Boolean), note: refused ? (note || h || '') : (note || ''), refused,
    noword: /noword|rubber duck/.test(note || ''), thin: /thin/.test(note || '') });
}
module.exports.CATALOG = PARSED;
/**
 * Multi-crayon plans, by part RANK (largest part first; every part past the end takes the last crayon), set only after the
 * drawing's parts were listed and read (a two-colour default painted a pink rabbit and a black football). Everything else
 * is painted in its main colour.
 */
module.exports.RANK_PLANS = {
  // pandas: POINT plans (a rank plan moved its black onto the head when the drawing was small)
  'animals bw/panda': { base: 'none', points: [[0.48, 0.75, 'none'], [0.49, 0.12, 'none'], [0.12, 0.92, 'none'], [0.87, 0.93, 'none'], [0.27, 0.93, 'black'], [0.71, 0.92, 'black'], [0.36, 0.2, 'black'], [0.63, 0.19, 'black'], [0.78, 0.02, 'black'], [0.2, 0.02, 'black'], [0.23, 0.09, 'black'], [0.81, 0.09, 'black'], [0.47, 0.35, 'black']] },
  'animals bw 2/panda': { base: 'none', points: [[0.48, 0.15, 'none'], [0.49, 0.89, 'none'], [0.15, 0.95, 'none'], [0.88, 0.94, 'none'], [0.32, 0.25, 'black'], [0.68, 0.3, 'black'], [0.11, 0.05, 'black'], [0.8, 0.11, 'black'], [0.12, 0.13, 'black'], [0.83, 0.81, 'black'], [0.19, 0.82, 'black'], [0.35, 0.69, 'black'], [0.7, 0.65, 'black'], [0.5, 0.42, 'black']] },
  'zoo animals bw/panda': { base: 'none', points: [[0.43, 0.16, 'none'], [0.4, 0.88, 'none'], [0.16, 0.93, 'none'], [0.55, 0.96, 'none'], [0.12, 0.16, 'black'], [0.72, 0.1, 'black'], [0.27, 0.3, 'black'], [0.6, 0.3, 'black'], [0.39, 0.65, 'black'], [0.64, 0.66, 'black'], [0.21, 0.87, 'black'], [0.74, 0.86, 'black'], [0.95, 0.3, 'green'], [0.85, 0.2, 'green'], [0.9, 0.4, 'green'], [0.8, 0.35, 'green'], [0.06, 0.08, 'black'], [0.18, 0.04, 'black'], [0.68, 0.03, 'black'], [0.8, 0.12, 'black'], [0.05, 0.18, 'black'], [0.75, 0.6, 'brown']] },
  'animals bw/penguin': ['black', 'none', 'orange', 'orange', 'black', 'orange'],
  'animals bw/penguin_2': ['black', 'orange'],
  'animals bw 5/penguin': ['black', 'none', 'orange'],
  'animals bw 5/penguin_2': ['black', 'none', 'orange'],
  'birds bw/penguin': ['black', 'none', 'orange', 'orange', 'black', 'orange'],
  'birds bw/penguin_2': ['black', 'none', 'orange'],
  'sea life bw/penguin': ['none', 'black', 'orange'],
  'birds bw 2/toucan': ['black', 'orange', 'none', 'black', 'orange', 'black', 'orange', 'none', 'orange'],
  'birds bw/toucan': ['black', 'orange', 'none'],
  'beach bw/sailboat': ['none', 'red', 'none', 'none', 'red'],
  'vehicles bw/sailboat': ['none', 'red', 'none', 'none'],
  'classroom bw 2/earth': ['blue', 'green', 'green', 'green', 'green'],
  'space bw/earth': ['blue', 'green', 'green', 'green', 'green'],
  // people: skin pink (as on the reviewed Color by Number keys), read part by part on a numbered sheet
  // POINT plans (x, y as a share of the drawing's own box): the same at every size
  'farm bw/farmer': { base: 'blue', points: [[0.38, 0.62, 'blue'], [0.6, 0.62, 'blue'], [0.12, 0.38, 'red'], [0.85, 0.38, 'red'], [0.5, 0.2, 'pink'], [0.45, 0.42, 'blue'], [0.5, 0.42, 'blue'], [0.1, 0.18, 'yellow'], [0.9, 0.17, 'yellow'], [0.5, 0.05, 'yellow'], [0.3, 0.95, 'brown'], [0.7, 0.95, 'brown']] },
  'farm bw/scarecrow': { base: 'blue', points: [[0.5, 0.5, 'blue'], [0.15, 0.36, 'blue'], [0.85, 0.36, 'blue'], [0.5, 0.25, 'pink'], [0.5, 0.05, 'yellow'], [0.3, 0.17, 'yellow'], [0.7, 0.17, 'yellow'], [0.5, 0.92, 'brown'], [0.5, 0.82, 'brown'], [0.5, 0.97, 'brown'], [0.47, 0.87, 'brown'], [0.53, 0.87, 'brown'], [0.33, 0.22, 'yellow'], [0.67, 0.22, 'yellow'], [0.36, 0.27, 'yellow'], [0.64, 0.27, 'yellow'], [0.08, 0.36, 'yellow'], [0.92, 0.36, 'yellow']] },
  'Christmas bw 2/santa_claus': { base: 'red', points: [[0.5, 0.3, 'none'], [0.5, 0.12, 'pink'], [0.5, 0.04, 'red'], [0.06, 0.13, 'pink'], [0.94, 0.13, 'pink'], [0.2, 0.25, 'red'], [0.8, 0.25, 'red'], [0.32, 0.45, 'red'], [0.68, 0.45, 'red'], [0.5, 0.5, 'black'], [0.3, 0.62, 'red'], [0.7, 0.62, 'red'], [0.5, 0.72, 'red'], [0.4, 0.75, 'red'], [0.6, 0.75, 'red'], [0.36, 0.9, 'black'], [0.64, 0.9, 'black']] },
  'fruits bw/apple': { base: 'red', points: [[0.5, 0.6, 'red'], [0.25, 0.07, 'green'], [0.5, 0.15, 'brown']] },
  'fruits bw/cherry': { base: 'red', points: [[0.25, 0.75, 'red'], [0.75, 0.62, 'red'], [0.45, 0.4, 'none'], [0.82, 0.35, 'green'], [0.4, 0.2, 'green'], [0.55, 0.05, 'green'], [0.52, 0.3, 'green']] },
  'fruits bw/strawberry': { base: 'red', points: [[0.5, 0.65, 'red'], [0.35, 0.45, 'red'], [0.65, 0.45, 'red'], [0.5, 0.15, 'green'], [0.2, 0.2, 'green'], [0.8, 0.2, 'green'], [0.5, 0.02, 'green'], [0.35, 0.15, 'green'], [0.65, 0.15, 'green'], [0.05, 0.2, 'green'], [0.95, 0.22, 'green']] },
  'fruits bw/pineapple': { base: 'yellow', points: [[0.5, 0.25, 'green'], [0.3, 0.2, 'green'], [0.7, 0.2, 'green'], [0.5, 0.4, 'green'], [0.35, 0.42, 'green'], [0.65, 0.42, 'green'], [0.5, 0.75, 'yellow'], [0.3, 0.7, 'yellow'], [0.7, 0.7, 'yellow'], [0.5, 0.95, 'yellow']] },
  'fruits bw/lemon': { base: 'yellow', points: [[0.4, 0.6, 'yellow'], [0.85, 0.35, 'green'], [0.85, 0.1, 'brown']] },
  'fruits bw/orange': { base: 'orange', points: [[0.5, 0.65, 'orange'], [0.15, 0.12, 'green'], [0.3, 0.08, 'green'], [0.85, 0.12, 'green'], [0.7, 0.08, 'green'], [0.52, 0.0, 'brown']] },
  'food bw 2/ice_cream': { base: 'pink', points: [[0.5, 0.15, 'pink'], [0.5, 0.3, 'pink'], [0.5, 0.42, 'pink'], [0.2, 0.42, 'pink'], [0.8, 0.42, 'pink'], [0.5, 0.52, 'orange'], [0.5, 0.65, 'orange'], [0.45, 0.8, 'orange'], [0.5, 0.92, 'orange']] },
  'food bw/hot_dog': { base: 'orange', points: [[0.55, 0.8, 'orange'], [0.08, 0.45, 'red'], [0.95, 0.4, 'red'], [0.3, 0.38, 'yellow'], [0.45, 0.42, 'yellow'], [0.62, 0.42, 'yellow'], [0.78, 0.4, 'yellow']] },
  'food bw/ice_cream': { base: 'pink', points: [[0.5, 0.55, 'pink'], [0.5, 0.2, 'brown'], [0.5, 0.92, 'brown']] },
  'home and nature bw/flower': { base: 'green', points: [[0.15, 0.2, 'pink'], [0.38, 0.48, 'pink'], [0.88, 0.22, 'pink'], [0.8, 0.4, 'pink'], [0.46, 0.07, 'pink'], [0.55, 0.28, 'yellow'], [0.2, 0.82, 'green'], [0.8, 0.82, 'green'], [0.55, 0.8, 'green'], [0.55, 0.95, 'green'], [0.58, 0.62, 'green']] },
  'home and nature bw/plant': { base: 'green', points: [[0.5, 0.85, 'orange'], [0.5, 0.65, 'orange'], [0.2, 0.7, 'orange'], [0.8, 0.7, 'orange'], [0.3, 0.2, 'green'], [0.7, 0.2, 'green'], [0.5, 0.05, 'green'], [0.2, 0.4, 'green'], [0.8, 0.4, 'green'], [0.3, 0.5, 'green'], [0.7, 0.5, 'green'], [0.5, 0.35, 'green']] },
  'home and nature bw/tree': { base: 'green', points: [[0.5, 0.3, 'green'], [0.15, 0.3, 'green'], [0.85, 0.3, 'green'], [0.5, 0.05, 'green'], [0.3, 0.1, 'green'], [0.7, 0.1, 'green'], [0.5, 0.75, 'brown'], [0.5, 0.88, 'brown'], [0.4, 0.97, 'brown'], [0.6, 0.97, 'brown'], [0.5, 0.65, 'brown']] },
  'home and nature bw/tree_2': { base: 'green', points: [[0.5, 0.3, 'green'], [0.15, 0.3, 'green'], [0.85, 0.3, 'green'], [0.5, 0.05, 'green'], [0.3, 0.1, 'green'], [0.7, 0.1, 'green'], [0.5, 0.75, 'brown'], [0.5, 0.88, 'brown'], [0.4, 0.97, 'brown'], [0.6, 0.97, 'brown'], [0.5, 0.65, 'brown']] },
  'home and nature bw/tree_3': { base: 'green', points: [[0.5, 0.3, 'green'], [0.15, 0.3, 'green'], [0.85, 0.3, 'green'], [0.5, 0.05, 'green'], [0.3, 0.1, 'green'], [0.7, 0.1, 'green'], [0.5, 0.75, 'brown'], [0.5, 0.88, 'brown'], [0.4, 0.97, 'brown'], [0.6, 0.97, 'brown'], [0.5, 0.65, 'brown']] },
  'nature bw/tree': { base: 'green', points: [[0.5, 0.3, 'green'], [0.15, 0.3, 'green'], [0.85, 0.3, 'green'], [0.5, 0.05, 'green'], [0.3, 0.1, 'green'], [0.7, 0.1, 'green'], [0.5, 0.75, 'brown'], [0.5, 0.88, 'brown'], [0.4, 0.97, 'brown'], [0.6, 0.97, 'brown'], [0.5, 0.65, 'brown']] },
  'nature bw/tree_2': { base: 'green', points: [[0.5, 0.3, 'green'], [0.15, 0.3, 'green'], [0.85, 0.3, 'green'], [0.5, 0.05, 'green'], [0.3, 0.1, 'green'], [0.7, 0.1, 'green'], [0.5, 0.75, 'brown'], [0.5, 0.88, 'brown'], [0.4, 0.97, 'brown'], [0.6, 0.97, 'brown'], [0.5, 0.65, 'brown']] },
  'nature bw/flower': { base: 'green', points: [[0.55, 0.08, 'yellow'], [0.2, 0.25, 'yellow'], [0.85, 0.25, 'yellow'], [0.45, 0.05, 'yellow'], [0.65, 0.1, 'yellow'], [0.3, 0.6, 'green'], [0.7, 0.55, 'green'], [0.5, 0.75, 'green'], [0.5, 0.5, 'green'], [0.5, 0.97, 'brown'], [0.3, 0.97, 'brown'], [0.7, 0.97, 'brown']] },
  'valentine bw 2/tulip': { base: 'green', points: [[0.5, 0.2, 'red'], [0.2, 0.2, 'red'], [0.8, 0.2, 'red'], [0.4, 0.05, 'red'], [0.6, 0.05, 'red'], [0.35, 0.28, 'red'], [0.65, 0.28, 'red'], [0.5, 0.45, 'green'], [0.2, 0.7, 'green'], [0.8, 0.62, 'green'], [0.5, 0.9, 'green'], [0.5, 0.65, 'green']] },
  'Easter bw/tulip': { base: 'green', points: [[0.5, 0.2, 'red'], [0.2, 0.2, 'red'], [0.8, 0.2, 'red'], [0.4, 0.05, 'red'], [0.6, 0.05, 'red'], [0.35, 0.28, 'red'], [0.65, 0.28, 'red'], [0.5, 0.45, 'green'], [0.2, 0.7, 'green'], [0.8, 0.62, 'green'], [0.5, 0.9, 'green'], [0.5, 0.65, 'green']] },
  'beach bw/palm_tree': { base: 'green', points: [[0.5, 0.1, 'green'], [0.2, 0.2, 'green'], [0.8, 0.2, 'green'], [0.1, 0.3, 'green'], [0.9, 0.3, 'green'], [0.4, 0.6, 'brown'], [0.45, 0.8, 'brown'], [0.42, 0.45, 'brown'], [0.5, 0.97, 'yellow'], [0.25, 0.97, 'yellow'], [0.75, 0.97, 'yellow']] },
  'household bw/curtain': { base: 'red', points: [[0.31, 0.56, 'lightblue'], [0.7, 0.57, 'lightblue'], [0.35, 0.32, 'lightblue'], [0.64, 0.32, 'lightblue'], [0.39, 0.84, 'lightblue'], [0.6, 0.84, 'lightblue'], [0.16, 0.16, 'red'], [0.83, 0.17, 'red'], [0.08, 0.72, 'red'], [0.92, 0.82, 'red']] },
  'nature bw/cloudy': { base: 'none', points: [[0.4, 0.64, 'none'], [0.57, 0.14, 'yellow']] },
  'nature bw/mushroom': { base: 'red', points: [[0.46, 0.78, 'none'], [0.48, 0.23, 'red'], [0.85, 0.45, 'red'], [0.16, 0.41, 'red'], [0.61, 0.18, 'none'], [0.35, 0.11, 'none'], [0.5, 0.95, 'none'], [0.5, 0.6, 'none']] },
  'Easter bw/mushroom': { base: 'red', points: [[0.34, 0.13, 'red'], [0.7, 0.13, 'red'], [0.5, 0.77, 'none'], [0.5, 0.43, 'none'], [0.5, 0.95, 'none']] },
  'vegetables bw 2/mushroom': { base: 'red', points: [[0.33, 0.3, 'red'], [0.49, 0.81, 'none'], [0.65, 0.14, 'red'], [0.5, 0.35, 'red'], [0.18, 0.37, 'red'], [0.82, 0.38, 'red'], [0.23, 0.19, 'red'], [0.5, 0.95, 'none'], [0.5, 0.62, 'none']] },
  'sea life bw 2/shrimp': { base: 'pink', points: [[0.9, 0.42, 'pink'], [0.82, 0.24, 'pink'], [0.66, 0.28, 'pink'], [0.89, 0.58, 'pink'], [0.8, 0.69, 'pink'], [0.5, 0.45, 'pink'], [0.7, 0.5, 'pink'], [0.2, 0.32, 'pink'], [0.35, 0.28, 'pink'], [0.1, 0.38, 'pink']] },
  'sports bw/beach_ball': { base: 'red', points: [[0.41, 0.82, 'red'], [0.14, 0.53, 'yellow'], [0.73, 0.78, 'blue'], [0.88, 0.49, 'yellow'], [0.69, 0.14, 'red'], [0.25, 0.17, 'blue'], [0.44, 0.07, 'yellow'], [0.5, 0.23, 'none']] },
  'beach bw/beach_ball': { base: 'none', points: [[0.82, 0.58, 'red'], [0.58, 0.84, 'yellow'], [0.23, 0.76, 'blue'], [0.8, 0.24, 'yellow'], [0.07, 0.45, 'red'], [0.59, 0.07, 'blue'], [0.33, 0.25, 'none']] },
  'sports bw 2/soccer_ball': ['none'],   // a white ball: its black patches merged into one black blob when small
  'travel and holiday bw/campfire': { base: 'brown', points: [[0.58, 0.3, 'orange'], [0.5, 0.65, 'yellow'], [0.5, 0.15, 'orange'], [0.35, 0.4, 'orange'], [0.7, 0.4, 'orange'], [0.22, 0.72, 'brown'], [0.81, 0.78, 'brown'], [0.48, 0.84, 'brown'], [0.92, 0.66, 'brown'], [0.64, 0.84, 'brown'], [0.18, 0.64, 'brown']] },
  'nature bw/campfire': { base: 'brown', points: [[0.56, 0.53, 'orange'], [0.5, 0.2, 'orange'], [0.4, 0.4, 'orange'], [0.65, 0.4, 'orange'], [0.39, 0.72, 'brown'], [0.78, 0.77, 'brown'], [0.38, 0.83, 'brown'], [0.21, 0.76, 'brown'], [0.65, 0.72, 'brown'], [0.11, 0.9, 'brown']] },
  'vegetables bw/carrot': { base: 'orange', points: [[0.49, 0.43, 'orange'], [0.3, 0.7, 'orange'], [0.85, 0.08, 'green'], [0.75, 0.15, 'green'], [0.95, 0.15, 'green'], [0.8, 0.02, 'green']] },
  'vegetables bw/radish': { base: 'green', points: [[0.35, 0.65, 'red'], [0.25, 0.8, 'red'], [0.45, 0.55, 'red'], [0.68, 0.27, 'green'], [0.81, 0.38, 'green'], [0.43, 0.1, 'green'], [0.55, 0.32, 'green']] },
  'vegetables bw/tomato': { base: 'red', points: [[0.43, 0.7, 'red'], [0.49, 0.29, 'red'], [0.5, 0.21, 'green'], [0.3, 0.15, 'green'], [0.7, 0.15, 'green'], [0.5, 0.05, 'green']] },
  'vegetables bw/bell_pepper': { base: 'red', points: [[0.56, 0.53, 'red'], [0.15, 0.4, 'red'], [0.9, 0.35, 'red'], [0.27, 0.19, 'red'], [0.72, 0.19, 'red'], [0.55, 0.2, 'green'], [0.6, 0.05, 'green'], [0.7, 0.05, 'green'], [0.62, 0.12, 'green']] },
  'vegetables bw 2/eggplant': { base: 'purple', points: [[0.5, 0.71, 'purple'], [0.46, 0.15, 'green'], [0.5, 0.05, 'green'], [0.3, 0.2, 'green'], [0.65, 0.2, 'green']] },
  'vegetables bw 2/corn': { base: 'green', points: [[0.53, 0.76, 'green'], [0.66, 0.77, 'green'], [0.34, 0.74, 'green'], [0.5, 0.35, 'yellow'], [0.5, 0.2, 'yellow'], [0.5, 0.5, 'yellow']] },
  'vegetables bw/pumpkin': { base: 'orange', points: [[0.5, 0.62, 'orange'], [0.22, 0.69, 'orange'], [0.77, 0.65, 'orange'], [0.93, 0.52, 'orange'], [0.06, 0.56, 'orange'], [0.55, 0.21, 'orange'], [0.5, 0.05, 'green'], [0.48, 0.12, 'green'], [0.52, 0.0, 'green'], [0.55, 0.08, 'green']] },
  'Easter bw/carrot': { base: 'orange', points: [[0.58, 0.36, 'orange'], [0.8, 0.15, 'green'], [0.9, 0.05, 'green']] },
  // rank plans read on numbered sheets (2026-10-10): body, door, windows, bumpers, wheels
  'vehicles bw 2/camper': ['orange', 'yellow', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'grey', 'lightblue', 'grey', 'lightblue', 'grey', 'grey'],
  'vehicles bw 3/camper': ['lightblue', 'lightblue', 'none', 'none', 'lightblue', 'none', 'grey', 'grey', 'grey', 'grey'],
  'farm bw/barn': ['red', 'brown', 'grey', 'brown', 'red'],
  'home and nature bw/house': ['red', 'orange', 'brown', 'red'],
  'classroom bw/globe': ['blue', 'green', 'green', 'blue', 'blue', 'green', 'blue', 'green', 'green'],
};

// the plans the scenes use: every rank plan as its point plan (tools/fdx-plan-points.js → plan-points.json), point plans as written
{
  let PP = {}; try { PP = require('./plan-points.json'); } catch (e) { PP = {}; }
  const P = {};
  for (const [k, v] of Object.entries(module.exports.RANK_PLANS)) P[k] = Array.isArray(v) ? (PP[k] || v) : v;
  module.exports.PLANS = P;
}
