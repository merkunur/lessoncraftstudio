/* =====================================================================
   name-tag-core.js — the model of ACTIVITY #57 of the one-by-one
   rebuild: "Read the Word, Tap the Picture" → THE STICKY NAME TAG
   (RF.K.3, 11 locales). Design sheet: docs/activities-rebuild/designs/057-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: the printed word is a name tag. Hang it on a picture and
   press Check: it sticks down letter by letter from the left, and on the
   wrong picture it peels off at the FIRST letter that differs — so the
   child sees exactly how far the word matched and that a guess from the
   first letter fails at the end.
     Levels (each shown only where the locale has ≥ 7 rounds):
       read      — one tag, four pictures that share its beginning
       family    — a word family: hang every tag; one picture is not in it
       syllables — join the syllable pieces, then hang the tag (it sticks
                   part by part and peels at the first part that differs)
       memory    — face-down cards: a picture and its tag make a pair
   Words are compared letter by letter (grapheme by grapheme, case-blind);
   a letter with a mark is its own letter (ö ≠ o, ñ ≠ n).
   No DOM. UMD: window.NameTagCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NameTagCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* per locale: words = key → picture; l1 'word|close close close|far far far'; fam 'tag tag tag|extra extra';
     syl 'pie·ces|partner|other other' (the wall: the target, its same-first-part partner, two others); mem 'w w w' */
  /*DATA-BEGIN*/
  var DATA = {
    en: {
      words: {'bag': 'At the Supermarket/bag', 'basket': 'At the Supermarket/basket', 'basketball': 'activities/basketball', 'bat': 'animals/bat', 'bed': 'around the house/bed', 'bee': 'farm animals/bee', 'bell': 'christmas/bell', 'bun': 'bakery/bun', 'bus': 'vehicles/bus', 'can': 'At the Supermarket/can', 'cap': 'accessories/cap', 'car': 'toys/car', 'cat': 'animals/cat', 'clock': 'around the house/clock', 'coat': 'clothing/coat', 'cow': 'farm animals/cow', 'cup': 'around the house/cup', 'cupcake': 'bakery/cupcake', 'deer': 'camping/deer', 'dog': 'animals/dog', 'door': 'around the house/door', 'drum': 'music/drum', 'duck': 'animals/duck', 'fan': 'around the house/fan', 'fig': 'fruits/fig', 'fish': 'animals/fish', 'flag': '4th of July/flag', 'fox': 'animals/fox', 'frog': 'camping/frog', 'ham': 'At the Supermarket/ham', 'hammer': 'tools/hammer', 'hamster': 'pets/hamster', 'hand': 'body parts/hand', 'hat': 'accessories/hat', 'hen': 'farm animals/hen', 'jam': 'At the Supermarket/jam', 'jar': 'kitchen tools/jar', 'jug': 'kitchen tools/jug', 'log': 'camping/log', 'map': 'camping/map', 'mask': 'accessories/mask', 'milk': 'At the Supermarket/milk', 'monkey': 'zoo animals/monkey', 'moon': 'space/moon', 'mop': 'around the house/mop', 'mouse': 'pets/mouse', 'muffin': 'bakery/muffin', 'mug': 'kitchen tools/mug', 'net': 'beach/net', 'pan': 'around the house/pan', 'pancake': 'breakfast/pancake', 'panda': 'animals/panda', 'pen': 'classroom/pen', 'pencil': 'around the house/pencil', 'penguin': 'animals/penguin', 'pie': 'At the Supermarket/pie', 'pig': 'animals/pig', 'popcorn': 'At the Supermarket/popcorn', 'rainbow': 'weather/rainbow', 'raincoat': 'clothing/raincoat', 'rug': 'around the house/rug', 'sled': 'winter/sled', 'star': 'christmas/star', 'sun': 'beach/sun', 'van': 'vehicles/van'},
      l1: ['cat|cap can car|cow cup clock', 'can|cat cap car|cow cup coat', 'cap|cat can car|cow cup clock', 'bus|bun bag bed|bag bed bell', 'bun|bus bat bee|bat bee bell', 'hat|ham hand hen|hen sun bed', 'bat|bag bed bee|bed bell sun', 'jam|jar jug ham|jug sun pig', 'pen|pan pig pie|pan sun hat', 'mop|moon mouse map|map mask milk', 'fan|fig fish flag|fox sun bed', 'dog|door duck drum|deer sun hat'],
      fam: ['cat hat bat|cap', 'can fan van|pen', 'bag flag|bat cat', 'bed sled|bus hen', 'car jar star|cat', 'bun sun|bus cup', 'hen pen|ham net', 'mug jug rug|map', 'dog log frog|duck'],
      syl: ['pen·cil|pen·guin|mon·key muf·fin', 'pen·guin|pen·cil|pop·corn rain·bow', 'rain·bow|rain·coat|cup·cake ham·mer', 'rain·coat|rain·bow|muf·fin pan·da', 'ham·mer|ham·ster|bas·ket mon·key', 'ham·ster|ham·mer|pan·cake pen·cil', 'pan·da|pan·cake|bas·ket cup·cake', 'pan·cake|pan·da|bas·ket·ball pop·corn', 'bas·ket|bas·ket·ball|muf·fin rain·coat', 'bas·ket·ball|bas·ket|pen·guin ham·ster'],
      mem: ['cat can cap', 'bus bun bed', 'hat ham hand', 'jam jar jug', 'pen pig pan', 'mop map mug', 'fan fox fig', 'dog duck door']
    },
    de: {
      words: {'affe': 'zoo animals/monkey', 'ameise': 'forest creatures/ant', 'apfel': 'fruits/apple', 'auge': 'body parts/eye', 'auto': 'toys/car', 'bagger': 'vehicles/excavator', 'ball': 'toys/ball', 'banane': 'fruits/banana', 'bein': 'body parts/leg', 'bett': 'around the house/bed', 'biene': 'farm animals/bee', 'blume': 'spring/flower', 'bluse': 'clothing/blouse', 'feige': 'fruits/fig', 'fisch': 'animals/fish', 'frosch': 'reptiles and Amphibians/frog', 'fuchs': 'animals/fox', 'fuß': 'body parts/foot', 'giraffe': 'animals/giraffe', 'gitarre': 'music/guitar', 'hahn': 'farm animals/rooster', 'hand': 'body parts/hand', 'hase': 'animals/rabbit', 'haus': 'miscellaneous/house', 'huhn': 'farm animals/chicken', 'hund': 'animals/dog', 'hut': 'accessories/hat', 'kamm': 'around the house/comb', 'katze': 'animals/cat', 'kleid': 'clothing/dress', 'koch': 'occupations/cook', 'kopf': 'body parts/head', 'korb': 'At the Supermarket/basket', 'kreis': 'shapes/circle', 'krug': 'kitchen tools/jug', 'kuh': 'farm animals/cow', 'mais': 'At the Supermarket/corn', 'mantel': 'clothing/coat', 'maus': 'forest creatures/mouse', 'milch': 'At the Supermarket/milk', 'mond': 'camping/moon', 'mopp': 'around the house/mop', 'mund': 'body parts/mouth', 'nagel': 'tools/nail', 'nase': 'body parts/nose', 'nest': 'spring/nest', 'netz': 'beach/net', 'puppe': 'toys/doll', 'rakete': 'toys/rocket', 'reis': 'At the Supermarket/rice', 'sack': 'christmas/sack', 'sand': 'summer/sand', 'schaf': 'animals/sheep', 'schal': 'accessories/scarf', 'schaufel': 'toys/shovel', 'schaukel': 'toys/swing', 'schiff': 'vehicles/ship', 'schuh': 'clothing/shoe', 'socke': 'accessories/sock', 'tisch': 'around the house/table', 'tor': 'around the house/gate', 'trommel': 'music/drum', 'trompete': 'music/trumpet', 'tulpe': 'spring/tulip', 'tür': 'around the house/door', 'vase': 'around the house/vase', 'wal': 'ocean life/whale', 'zaun': 'around the house/fence', 'zebra': 'animals/zebra', 'zug': 'toys/train'},
      l1: ['ball|bagger banane bein|bein bett biene', 'hut|huhn hund hand|hahn hand hase', 'hand|hahn hase hund|huhn hund hut', 'nase|nagel nest netz|nest netz affe', 'katze|kamm kleid koch|kleid koch kopf', 'maus|mais mantel milch|milch mond mopp', 'auto|auge apfel affe|apfel affe ameise', 'fuß|fuchs feige fisch|feige fisch frosch', 'schaf|schal schiff sack|sack sand socke', 'schuh|schaf schal sack|sack sand socke', 'haus|hahn hand hund|huhn hund hut', 'korb|koch kopf kamm|kamm katze kleid'],
      fam: ['nase vase hase|haus', 'wal schal|schaf schuh', 'fisch tisch|tor tür', 'schuh kuh|schaf schal', 'reis kreis|krug kleid', 'maus haus|hand hahn', 'hund mund|hut huhn', 'hand sand|haus sack', 'krug zug|kreis zaun'],
      syl: ['gi·raf·fe|gi·tar·re|ap·fel so·cke', 'gi·tar·re|gi·raf·fe|pup·pe ze·bra', 'trom·mel|trom·pe·te|kat·ze tul·pe', 'trom·pe·te|trom·mel|ra·ke·te ba·na·ne', 'schau·fel|schau·kel|ap·fel so·cke', 'schau·kel|schau·fel|pup·pe ze·bra', 'blu·me|blu·se|kat·ze tul·pe', 'blu·se|blu·me|ra·ke·te ba·na·ne'],
      mem: ['ball bagger banane', 'hut huhn hund', 'hand hahn hase', 'nase nagel nest', 'katze kamm kleid', 'maus mais mantel', 'auto auge apfel', 'fuß fuchs feige', 'schaf schal schiff', 'korb koch kopf']
    },
    nl: {
      words: {'appel': 'At the Supermarket/apple', 'bal': 'toys/ball', 'banaan': 'At the Supermarket/banana', 'bed': 'around the house/bed', 'been': 'body parts/leg', 'beer': 'camping/bear', 'boek': 'classroom/book', 'boot': 'beach/boat', 'bos': 'camping/forest', 'haan': 'farm animals/rooster', 'ham': 'At the Supermarket/ham', 'hand': 'body parts/hand', 'hek': 'around the house/fence', 'hen': 'farm animals/hen', 'hond': 'animals/dog', 'huis': 'miscellaneous/house', 'kaart': 'camping/map', 'kaas': 'At the Supermarket/cheese', 'kam': 'around the house/comb', 'kat': 'animals/cat', 'kikker': 'camping/frog', 'kip': 'farm animals/chicken', 'klok': 'around the house/clock', 'kok': 'occupations/cook', 'kom': 'around the house/bowl', 'konijn': 'animals/rabbit', 'kool': 'vegetables/cabbage', 'lam': 'farm animals/lamb', 'maan': 'camping/moon', 'mand': 'At the Supermarket/basket', 'melk': 'At the Supermarket/milk', 'mes': 'around the house/knife', 'mok': 'kitchen tools/mug', 'mond': 'body parts/mouth', 'muis': 'forest creatures/mouse', 'nest': 'spring/nest', 'net': 'beach/net', 'neus': 'body parts/nose', 'pan': 'around the house/pan', 'panda': 'animals/panda', 'pannenkoek': 'breakfast/pancake', 'peer': 'At the Supermarket/pear', 'pen': 'around the house/pen', 'pet': 'accessories/cap', 'pot': 'around the house/pot', 'potlood': 'around the house/pencil', 'radijs': 'vegetables/radish', 'raket': 'toys/rocket', 'schip': 'vehicles/ship', 'slak': 'insects and bugs/snail', 'slot': 'around the house/lock', 'sok': 'accessories/sock', 'taart': 'At the Supermarket/pie', 'tafel': 'around the house/table', 'tand': 'body parts/tooth', 'tas': 'At the Supermarket/bag', 'tijger': 'animals/tiger', 'trommel': 'music/drum', 'trompet': 'music/trumpet', 'vaas': 'around the house/vase', 'veer': 'easter/feather', 'vest': 'accessories/vest', 'vlinder': 'spring/butterfly', 'voet': 'body parts/foot', 'vork': 'around the house/fork', 'vos': 'animals/fox', 'zak': 'christmas/sack', 'zand': 'summer/sand', 'zebra': 'animals/zebra', 'zeehond': 'zoo animals/seal', 'zeester': 'beach/starfish'},
      l1: ['kat|kaart kaas kikker|kikker kip klok', 'pen|peer pet pan|pan pot bal', 'bed|been beer bal|bal banaan boek', 'bal|banaan bed been|bed been beer', 'tas|taart tafel tand|bal banaan bed', 'neus|nest net bal|bal banaan bed', 'haan|ham hand hek|hek hen hond', 'maan|mand melk mes|melk mes mok', 'kam|kaart kaas kikker|kikker kip klok', 'boot|boek bos bal|bal banaan bed', 'kok|kom kool kaart|kaart kaas kam', 'vork|voet vos vaas|vaas veer vest'],
      fam: ['sok mok klok|mond', 'mand tand zand|maan', 'ham kam lam|kat', 'peer beer veer|been', 'pen hen|hek pet', 'kip schip|kikker kat', 'maan haan|ham mand', 'muis huis|mok maan', 'slak zak|zand slot'],
      syl: ['trom·mel|trom·pet|ze·bra ko·nijn', 'trom·pet|trom·mel|kik·ker ap·pel', 'zee·hond|zee·ster|tij·ger vlin·der', 'zee·ster|zee·hond|pot·lood ba·naan', 'pan·da|pan·nen·koek|ze·bra ko·nijn', 'pan·nen·koek|pan·da|kik·ker ap·pel', 'ra·ket|ra·dijs|tij·ger vlin·der', 'ra·dijs|ra·ket|pot·lood ba·naan'],
      mem: ['kat kaart kaas', 'pen peer pet', 'bed been beer', 'bal banaan bed', 'tas taart tafel', 'neus nest net', 'haan ham hand', 'maan mand melk', 'boot boek bos', 'kok kom kool', 'vork voet vos']
    },
    da: {
      words: {'and': 'animals/duck', 'badekar': 'around the house/bathtub', 'banan': 'At the Supermarket/banana', 'ben': 'body parts/leg', 'bi': 'farm animals/bee', 'bus': 'vehicles/bus', 'bål': 'miscellaneous/bonfire', 'delfin': 'animals/dolphin', 'dukke': 'toys/doll', 'gaffel': 'around the house/fork', 'ged': 'farm animals/goat', 'glas': 'kitchen tools/glass', 'gris': 'animals/pig', 'gryde': 'around the house/pot', 'gås': 'farm animals/goose', 'hat': 'accessories/hat', 'hest': 'animals/horse', 'hund': 'animals/dog', 'hus': 'miscellaneous/house', 'kajak': 'camping/kayak', 'kam': 'around the house/comb', 'kamel': 'animals/camel', 'kanin': 'animals/rabbit', 'kat': 'animals/cat', 'knop': 'spring/bud', 'ko': 'farm animals/cow', 'kok': 'occupations/chef', 'kop': 'around the house/cup', 'kost': 'around the house/broom', 'krus': 'kitchen tools/mug', 'kål': 'vegetables/cabbage', 'lam': 'farm animals/lamb', 'lampe': 'around the house/lamp', 'lås': 'around the house/lock', 'medalje': 'accessories/medal', 'melon': 'At the Supermarket/melon', 'mund': 'body parts/mouth', 'mus': 'forest creatures/mouse', 'panda': 'animals/panda', 'pingvin': 'animals/penguin', 'ris': 'At the Supermarket/rice', 'salt': 'At the Supermarket/salt', 'sand': 'summer/sand', 'sko': 'clothing/shoe', 'skål': 'around the house/bowl', 'sok': 'accessories/sock', 'sol': 'beach/sun', 'stol': 'around the house/chair', 'sæk': 'christmas/sack', 'sæl': 'ocean life/seal', 'traktor': 'vehicles/tractor', 'vest': 'accessories/vest', 'zebra': 'animals/zebra'},
      l1: ['kop|kok kost kam|kam kat knop', 'sol|sok salt sand|salt sand sko', 'kat|kam knop ko|knop ko krus', 'sko|skål salt sand|salt sand sok', 'sæl|sæk salt sand|salt sand sko', 'krus|kam kat knop|kam kat hest', 'stol|salt sand sko|salt sand mund', 'gris|gryde ged glas|ged glas gås', 'hus|hund hat hest|hat hest and', 'gås|ged glas gris|ged glas sand', 'bus|ben bi bål|ben bi sand'],
      fam: ['hus mus krus|hund', 'kål bål skål|sko', 'kat hat|kam hus', 'ko sko|skål sol', 'ris gris|gryde glas', 'kam lam|kat ko', 'gås lås|gris glas', 'hest vest|hus hat', 'kok sok|sol kop'],
      syl: ['ka·nin|ka·mel|ze·bra pan·da', 'ka·mel|ka·nin|duk·ke lam·pe', 'me·lon|me·dal·je|del·fin trak·tor', 'me·dal·je|me·lon|ping·vin gaf·fel', 'ba·nan|ba·de·kar|ze·bra pan·da', 'ba·de·kar|ba·nan|duk·ke lam·pe', 'ka·jak|ka·nin|del·fin trak·tor'],
      mem: ['kop kok kost', 'sol sok salt', 'kat kam knop', 'sko skål salt', 'sæl sæk salt', 'stol salt sand', 'gris gryde ged', 'hus hund hat', 'gås ged glas', 'bus ben bi']
    },
    sv: {
      words: {'banan': 'At the Supermarket/banana', 'ben': 'body parts/leg', 'bi': 'farm animals/bee', 'bo': 'spring/nest', 'bok': 'classroom/book', 'boll': 'toys/ball', 'buss': 'vehicles/bus', 'båt': 'toys/boat', 'cykel': 'toys/bicycle', 'delfin': 'animals/dolphin', 'fjäder': 'easter/feather', 'fjäril': 'spring/butterfly', 'flygplan': 'toys/airplane', 'gris': 'animals/pig', 'groda': 'camping/frog', 'gryta': 'around the house/pot', 'gurka': 'At the Supermarket/cucumber', 'gås': 'farm animals/goose', 'haj': 'ocean life/shark', 'hand': 'body parts/hand', 'hatt': 'accessories/hat', 'hund': 'animals/dog', 'hus': 'miscellaneous/house', 'häst': 'animals/horse', 'kam': 'around the house/comb', 'kamel': 'animals/camel', 'kanin': 'animals/rabbit', 'katt': 'animals/cat', 'ko': 'farm animals/cow', 'kopp': 'around the house/cup', 'kub': 'shapes/cube', 'kål': 'vegetables/cabbage', 'kök': 'around the house/kitchen', 'lamm': 'easter/lamb', 'lim': 'classroom/glue', 'lås': 'around the house/lock', 'lök': 'At the Supermarket/onion', 'löv': 'spring/leaf', 'mapp': 'classroom/folder', 'mopp': 'around the house/mop', 'mugg': 'kitchen tools/mug', 'mus': 'forest creatures/mouse', 'papegoja': 'Things That Fly/parrot', 'paraply': 'accessories/umbrella', 'ring': 'accessories/ring', 'ris': 'At the Supermarket/rice', 'ros': 'flowers/rose', 'räv': 'animals/fox', 'sand': 'summer/sand', 'sko': 'clothing/shoe', 'skål': 'around the house/bowl', 'skåp': 'around the house/cabinet', 'soffa': 'around the house/couch', 'sol': 'beach/sun', 'stol': 'around the house/chair', 'säl': 'ocean life/seal', 'säng': 'around the house/bed', 'tand': 'body parts/tooth', 'trumma': 'music/drum', 'trumpet': 'music/trumpet', 'äpple': 'At the Supermarket/apple'},
      l1: ['skål|skåp sko sand|sand sol stol', 'hatt|haj hand hund|hund hus häst', 'säl|säng sand sko|sand sko skål', 'katt|kam ko kub|ko kub kål', 'bok|boll ben bi|ben bi buss', 'hus|hund haj hand|haj hand hatt', 'sol|sand sko skål|sand sko häst', 'ben|bi bo buss|bi bo häst', 'lök|löv lamm lim|lamm lim lås', 'båt|ben bi bo|ben bi häst', 'mus|mugg mapp mopp|mapp mopp ben', 'ris|ring ros räv|ros räv ben'],
      fam: ['ko bo sko|skål', 'hand tand sand|hatt', 'mus hus|mugg hund', 'ris gris|ring gryta', 'lök kök|löv ko', 'katt hatt|kam hand', 'gås lås|lök lamm', 'kål skål|skåp sko', 'kopp mopp|mus katt'],
      syl: ['pa·pe·go·ja|pa·ra·ply|ba·nan cy·kel', 'pa·ra·ply|pa·pe·go·ja|äpp·le del·fin', 'trum·ma|trum·pet|gro·da gur·ka', 'trum·pet|trum·ma|sof·fa flyg·plan', 'ka·nin|ka·mel|ba·nan cy·kel', 'ka·mel|ka·nin|äpp·le del·fin', 'fjä·ril|fjä·der|gro·da gur·ka', 'fjä·der|fjä·ril|sof·fa flyg·plan'],
      mem: ['skål skåp sko', 'hatt haj hand', 'säl säng sand', 'katt kam ko', 'bok boll ben', 'hus hund haj', 'sol sand sko', 'ben bi bo', 'lök löv lamm', 'mus mugg mapp', 'ris ring ros']
    },
    no: {
      words: {'banan': 'At the Supermarket/banana', 'bein': 'body parts/leg', 'bil': 'toys/car', 'bok': 'classroom/book', 'brød': 'At the Supermarket/bread', 'buss': 'vehicles/bus', 'bål': 'miscellaneous/bonfire', 'båt': 'toys/boat', 'delfin': 'animals/dolphin', 'dukke': 'toys/doll', 'gaffel': 'around the house/fork', 'gitar': 'music/guitar', 'gris': 'animals/pig', 'gryte': 'around the house/pot', 'gås': 'farm animals/goose', 'hai': 'ocean life/shark', 'hammer': 'around the house/hammer', 'hatt': 'accessories/hat', 'hest': 'animals/horse', 'hund': 'animals/dog', 'hus': 'miscellaneous/house', 'kam': 'around the house/comb', 'kamel': 'animals/camel', 'kanin': 'animals/rabbit', 'katt': 'animals/cat', 'kokk': 'occupations/chef', 'kopp': 'around the house/cup', 'ku': 'farm animals/cow', 'kål': 'vegetables/cabbage', 'lam': 'farm animals/lamb', 'lampe': 'around the house/lamp', 'lås': 'around the house/lock', 'mopp': 'around the house/mop', 'mus': 'forest creatures/mouse', 'panda': 'animals/panda', 'panne': 'around the house/pan', 'ring': 'accessories/ring', 'ris': 'At the Supermarket/rice', 'sau': 'farm animals/sheep', 'sekk': 'christmas/sack', 'sel': 'ocean life/seal', 'seng': 'around the house/bed', 'sjiraff': 'animals/giraffe', 'ski': 'winter/skiing', 'sko': 'clothing/shoe', 'sky': 'beach/cloud', 'snøfnugg': 'winter/snowflake', 'snømann': 'winter/snowman', 'sokk': 'accessories/sock', 'sol': 'beach/sun', 'sopp': 'vegetables/mushroom', 'stein': 'beach/rock', 'stol': 'around the house/chair', 'sykkel': 'toys/bicycle', 'tromme': 'music/drum', 'trompet': 'music/trumpet', 'vest': 'accessories/vest'},
      l1: ['sol|sokk sopp sau|sau sekk sel', 'sko|ski sky sau|sau sekk sel', 'sel|sekk seng sau|sau ski sko', 'stol|stein sau sekk|sau sekk sel', 'båt|bål bein bil|bein bil bok', 'katt|kam kokk kopp|kokk kopp ku', 'hus|hund hai hatt|hai hatt hest', 'hatt|hai hest hund|hest hund hus', 'bil|bein bok brød|bein bok sau', 'gris|gryte gaffel gås|gaffel gås bein', 'buss|bein bil bok|bein bil kokk', 'ku|kam katt kokk|kam katt sol'],
      fam: ['mopp kopp sopp|sol', 'hus mus|hund hest', 'lam kam|katt ku', 'gås lås|lam gris', 'hest vest|hus hund', 'gris ris|ring gryte', 'katt hatt|kam hai', 'kål bål|båt ku', 'sokk kokk|sol kopp'],
      syl: ['trom·me|trom·pet|ba·nan del·fin', 'trom·pet|trom·me|duk·ke gi·tar', 'ka·nin|ka·mel|ham·mer lam·pe', 'ka·mel|ka·nin|syk·kel sji·raff', 'pan·ne|pan·da|ba·nan del·fin', 'pan·da|pan·ne|duk·ke gi·tar', 'snø·mann|snø·fnugg|ham·mer lam·pe', 'snø·fnugg|snø·mann|syk·kel sji·raff'],
      mem: ['sol sokk sopp', 'sko ski sky', 'sel sekk seng', 'stol stein sau', 'båt bål bein', 'katt kam kokk', 'hus hund hai', 'hatt hai hest', 'bil bein bok', 'gris gryte gaffel']
    },
    es: {
      words: {'ajo': 'At the Supermarket/garlic', 'banca': 'furniture/bench', 'boca': 'body parts/mouth', 'caballo': 'animals/horse', 'cabra': 'farm animals/goat', 'cama': 'around the house/bed', 'campana': 'christmas/bell', 'capa': 'accessories/cape', 'cara': 'body parts/face', 'caracol': 'spring/snail', 'carro': 'toys/car', 'casa': 'miscellaneous/house', 'cebra': 'animals/zebra', 'coco': 'fruits/coconut', 'cubo': 'shapes/cube', 'cuna': 'furniture/crib', 'foca': 'zoo animals/seal', 'fresa': 'At the Supermarket/strawberry', 'gallo': 'farm animals/rooster', 'gato': 'animals/cat', 'globo': 'toys/balloon', 'gorra': 'accessories/cap', 'gorro': 'accessories/beanie', 'jirafa': 'animals/giraffe', 'lata': 'At the Supermarket/can', 'leche': 'At the Supermarket/milk', 'león': 'zoo animals/lion', 'libro': 'classroom/book', 'llama': 'farm animals/llama', 'llave': 'around the house/key', 'lobo': 'animals/wolf', 'loro': 'birds 2/parrot', 'luna': 'camping/moon', 'mano': 'body parts/hand', 'mapa': 'camping/map', 'melón': 'At the Supermarket/melon', 'mesa': 'around the house/table', 'mochila': 'accessories/backpack', 'mono': 'zoo animals/monkey', 'muñeca': 'toys/doll', 'pala': 'toys/shovel', 'pan': 'At the Supermarket/bread', 'papa': 'At the Supermarket/potato', 'pato': 'animals/duck', 'pelota': 'toys/ball', 'pera': 'At the Supermarket/pear', 'perro': 'animals/dog', 'pez': 'animals/fish', 'pluma': 'around the house/pen', 'rana': 'reptiles and Amphibians/frog', 'ratón': 'pets/mouse', 'red': 'beach/net', 'remo': 'camping/oar', 'roca': 'beach/rock', 'rosa': 'flowers/rose', 'sal': 'At the Supermarket/salt', 'silla': 'around the house/chair', 'sofá': 'furniture/sofa', 'sol': 'beach/sun', 'sombrero': 'accessories/hat', 'tambor': 'music/drum', 'tiburón': 'ocean life/shark', 'tigre': 'animals/tiger', 'tornillo': 'tools/bolt', 'toro': 'farm animals/bull', 'tortuga': 'animals/turtle', 'vaca': 'farm animals/cow', 'vaso': 'kitchen tools/glass', 'vela': 'christmas/candle', 'zorro': 'animals/fox'},
      l1: ['gato|gallo globo gorra|globo gorra gorro', 'pato|pala pan pera|pera perro pez', 'sol|sofá sal silla|sal silla ajo', 'casa|cabra cama cebra|cebra coco cubo', 'pez|pera perro pala|pala pan papa', 'mesa|melón mano mapa|mano mapa mono', 'vaca|vaso vela ajo|vela ajo banca', 'rana|ratón red remo|red remo roca', 'león|leche lata libro|lata libro llama', 'carro|cara cabra cebra|cebra coco cubo', 'cabra|cama capa cebra|cebra coco cubo', 'pan|pala papa pera|pera perro pez'],
      fam: ['boca foca roca|rosa', 'mapa capa papa|pato', 'gato pato|pan gallo', 'luna cuna|cubo casa', 'mesa fresa|melón mano', 'lobo globo|loro gato', 'gorro zorro|gorra gato', 'cama llama|llave casa', 'toro loro|lobo luna'],
      syl: ['tor·tu·ga|tor·ni·llo|ji·ra·fa mu·ñe·ca', 'tor·ni·llo|tor·tu·ga|glo·bo som·bre·ro', 'pe·rro|pe·lo·ta|plu·ma mo·chi·la', 'pe·lo·ta|pe·rro|cam·pa·na tam·bor', 'ca·ba·llo|ca·ra·col|ji·ra·fa mu·ñe·ca', 'ca·ra·col|ca·ba·llo|glo·bo som·bre·ro', 'ti·gre|ti·bu·rón|plu·ma mo·chi·la', 'ti·bu·rón|ti·gre|cam·pa·na tam·bor'],
      mem: ['gato gallo globo', 'pato pala pan', 'sol sofá sal', 'casa cabra cama', 'pez pera perro', 'mesa melón mano', 'vaca vaso vela', 'rana ratón red', 'león leche lata', 'carro cara cabra']
    },
    it: {
      words: {'barca': 'beach/boat', 'bocca': 'body parts/mouth', 'cane': 'animals/dog', 'capra': 'farm animals/goat', 'casa': 'miscellaneous/house', 'cavallo': 'animals/horse', 'cavolo': 'vegetables/cabbage', 'cervo': 'camping/deer', 'chiave': 'around the house/key', 'chitarra': 'music/guitar', 'colla': 'classroom/glue', 'corvo': 'birds 2/crow', 'cubo': 'shapes/cube', 'culla': 'furniture/crib', 'farfalla': 'spring/butterfly', 'gallo': 'birds 2/rooster', 'gatto': 'animals/cat', 'gazza': 'birds 2/magpie', 'giacca': 'clothing/jacket', 'gufo': 'animals/owl', 'lama': 'farm animals/llama', 'libro': 'classroom/book', 'limone': 'At the Supermarket/lemon', 'luna': 'camping/moon', 'lupo': 'animals/wolf', 'mano': 'body parts/hand', 'medusa': 'beach/jellyfish', 'mela': 'At the Supermarket/apple', 'melone': 'At the Supermarket/melon', 'mucca': 'farm animals/cow', 'naso': 'body parts/nose', 'nave': 'vehicles/ship', 'nido': 'spring/nest', 'pacco': 'post office/package', 'pala': 'toys/shovel', 'palla': 'toys/ball', 'panca': 'furniture/bench', 'panda': 'animals/panda', 'pane': 'At the Supermarket/bread', 'pecora': 'animals/sheep', 'penna': 'around the house/pen', 'pera': 'At the Supermarket/pear', 'pesce': 'animals/fish', 'piuma': 'easter/feather', 'porta': 'around the house/door', 'ragno': 'forest creatures/spider', 'rana': 'camping/frog', 'remo': 'camping/oar', 'rete': 'beach/net', 'riso': 'At the Supermarket/rice', 'sacco': 'christmas/sack', 'scala': 'tools/ladder', 'tamburo': 'music/drum', 'tavolo': 'around the house/table', 'tazza': 'around the house/cup', 'tenda': 'camping/tent', 'topo': 'forest creatures/mouse', 'toro': 'farm animals/bull', 'torta': 'At the Supermarket/pie', 'tubo': 'around the house/hose', 'vaso': 'around the house/vase', 'viso': 'body parts/face', 'zucca': 'At the Supermarket/pumpkin'},
      l1: ['gatto|gallo gazza giacca|giacca gufo barca', 'pane|panca panda penna|penna pera pesce', 'luna|lupo lama barca|lama barca bocca', 'cane|casa cavolo cervo|cervo chiave colla', 'pera|penna pesce pacco|pacco pala palla', 'mela|mano mucca barca|mano panda barca', 'rana|ragno remo rete|remo rete riso', 'topo|toro torta tavolo|tavolo tazza tenda', 'naso|nave nido barca|nido barca bocca', 'palla|pala pacco penna|penna pera pesce', 'cubo|culla cane casa|cane casa cavolo', 'colla|corvo cane casa|cane casa cavolo'],
      fam: ['naso vaso|nave nido', 'pane cane|panca panda', 'riso viso|rana vaso', 'mucca zucca|mela mano', 'cubo tubo|culla topo', 'pala scala|palla pane', 'porta torta|toro topo', 'pacco sacco|pane palla', 'gazza tazza|gatto tavolo'],
      syl: ['pe·sce|pe·co·ra|gat·to far·fal·la', 'pe·co·ra|pe·sce|muc·ca cer·vo', 'me·lo·ne|me·du·sa|ten·da piu·ma', 'me·du·sa|me·lo·ne|tam·bu·ro chi·tar·ra', 'ca·val·lo|ca·pra|gat·to far·fal·la', 'ca·pra|ca·val·lo|muc·ca cer·vo', 'li·mo·ne|li·bro|ten·da piu·ma', 'li·bro|li·mo·ne|tam·bu·ro chi·tar·ra'],
      mem: ['gatto gallo gazza', 'pane panca panda', 'luna lupo lama', 'cane casa cavolo', 'pera penna pesce', 'mela mano mucca', 'rana ragno remo', 'topo toro torta', 'naso nave nido', 'palla pala pacco', 'cubo culla cane', 'colla corvo cane']
    },
    pt: {
      words: {'anel': 'accessories/ring', 'boca': 'body parts/mouth', 'bola': 'toys/ball', 'bolo': '4th of July/cake', 'bolsa': 'accessories/handbag', 'burro': 'animals/donkey', 'cama': 'around the house/bed', 'capa': 'accessories/cape', 'caracol': 'spring/snail', 'carro': 'toys/car', 'casa': 'miscellaneous/house', 'cavalo': 'animals/horse', 'chave': 'around the house/key', 'cola': 'classroom/glue', 'copo': 'kitchen tools/glass', 'dedo': 'body parts/finger', 'dente': 'body parts/tooth', 'faca': 'around the house/knife', 'foca': 'zoo animals/seal', 'folha': 'miscellaneous/leaf', 'galo': 'farm animals/rooster', 'ganso': 'farm animals/goose', 'gato': 'animals/cat', 'globo': 'classroom/globe', 'lata': 'At the Supermarket/can', 'lobo': 'animals/wolf', 'lua': 'camping/moon', 'luva': 'accessories/glove', 'macaco': 'zoo animals/monkey', 'mamão': 'fruits/papaya', 'mapa': 'camping/map', 'melão': 'At the Supermarket/melon', 'mesa': 'around the house/table', 'mão': 'body parts/hand', 'ninho': 'spring/nest', 'panela': 'around the house/pot', 'pato': 'animals/duck', 'peixe': 'animals/fish', 'pena': 'easter/feather', 'pente': 'around the house/comb', 'pera': 'At the Supermarket/pear', 'pia': 'around the house/sink', 'picolé': 'summer/popsicle', 'pipa': 'toys/kite', 'pipoca': 'At the Supermarket/popcorn', 'pomba': 'birds 2/dove', 'porta': 'around the house/door', 'pão': 'At the Supermarket/bread', 'rato': 'forest creatures/mouse', 'saco': 'christmas/sack', 'sal': 'At the Supermarket/salt', 'sapo': 'forest creatures/frog', 'sino': 'christmas/bell', 'sofá': 'furniture/sofa', 'sol': 'beach/sun', 'tambor': 'music/drum', 'torta': 'At the Supermarket/pie', 'tubarão': 'ocean life/shark', 'tucano': 'Things That Fly/toucan', 'vaca': 'farm animals/cow', 'vela': 'christmas/candle'},
      l1: ['gato|galo globo anel|globo anel boca', 'casa|cama capa chave|chave cola copo', 'mesa|melão mapa mão|mapa mão anel', 'pato|panela pena pente|pena pente pera', 'bola|bolo boca burro|burro anel cama', 'lua|luva lata lobo|lata lobo anel', 'pipa|pia panela pato|panela pato pena', 'sofá|sol saco sal|saco sal sapo', 'cama|capa carro chave|chave cola copo', 'pera|pena pente panela|panela pato pia', 'porta|pomba panela pato|panela pato pena', 'saco|sal sapo sino|sino sofá sol'],
      fam: ['gato pato rato|galo', 'bola cola|bolo copo', 'vaca faca|vela folha', 'boca foca|bola bolo', 'mapa capa|casa cama', 'lobo globo|lua gato', 'porta torta|pomba pato', 'mão pão|pato pipa', 'dente pente|pena dedo'],
      syl: ['ca·va·lo|ca·ra·col|pei·xe bur·ro', 'ca·ra·col|ca·va·lo|tam·bor glo·bo', 'tu·ca·no|tu·ba·rão|pen·te ni·nho', 'tu·ba·rão|tu·ca·no|gan·so bol·sa', 'ma·ca·co|ma·mão|pei·xe bur·ro', 'ma·mão|ma·ca·co|tam·bor glo·bo', 'pi·po·ca|pi·co·lé|pen·te ni·nho', 'pi·co·lé|pi·po·ca|gan·so bol·sa'],
      mem: ['gato galo globo', 'casa cama capa', 'mesa melão mapa', 'pato panela pena', 'bola bolo boca', 'lua luva lata', 'pipa pia panela', 'sofá sol saco', 'pera pena pente', 'porta pomba panela', 'saco sal sapo']
    },
    fr: {
      words: {'balai': 'around the house/broom', 'bateau': 'toys/boat', 'cadeau': 'christmas/present', 'canard': 'animals/duck', 'cape': 'accessories/cape', 'carte': 'camping/map', 'chaise': 'around the house/chair', 'chameau': 'animals/camel', 'chapeau': 'accessories/hat', 'chat': 'animals/cat', 'chou': 'vegetables/cabbage', 'citron': 'At the Supermarket/lemon', 'clou': 'tools/nail', 'clé': 'around the house/key', 'coq': 'farm animals/rooster', 'coussin': 'around the house/cushion', 'dauphin': 'animals/dolphin', 'filet': 'beach/net', 'four': 'around the house/oven', 'gilet': 'accessories/vest', 'girafe': 'animals/giraffe', 'globe': 'classroom/globe', 'gâteau': '4th of July/cake', 'juge': 'occupations/judge', 'jupe': 'clothing/skirt', 'luge': 'winter/sled', 'lune': 'camping/moon', 'main': 'body parts/hand', 'mouton': 'animals/sheep', 'pain': 'At the Supermarket/bread', 'paon': 'birds 2/peacock', 'poire': 'fruits/pear', 'pomme': 'At the Supermarket/apple', 'poule': 'birds 2/hen', 'pull': 'clothing/sweater', 'radis': 'vegetables/radish', 'rame': 'camping/oar', 'renard': 'animals/fox', 'requin': 'ocean life/shark', 'riz': 'At the Supermarket/rice', 'robe': 'clothing/dress', 'rose': 'flowers/rose', 'râpe': 'kitchen tools/grater', 'râteau': 'around the house/rake', 'sable': 'summer/sand', 'sac': 'At the Supermarket/bag', 'seau': 'beach/bucket', 'sel': 'At the Supermarket/salt', 'soda': 'At the Supermarket/soda', 'sofa': 'furniture/sofa', 'souris': 'pets/mouse', 'table': 'around the house/table', 'tambour': 'music/drum', 'tapis': 'around the house/carpet', 'tarte': 'At the Supermarket/pie', 'tasse': 'around the house/cup', 'terre': 'space/earth', 'tomate': 'vegetables/tomato', 'tortue': 'animals/turtle', 'train': 'toys/train', 'veau': 'farm animals/calf', 'verre': 'kitchen tools/glass', 'vélo': 'vehicles/bicycle'},
      l1: ['tapis|table tarte terre|terre tomate train', 'tasse|table tapis terre|terre tomate train', 'chat|chaise chou cape|cape carte clou', 'sofa|soda souris sable|sable sac seau', 'clé|clou cape carte|cape carte chaise', 'poule|poire pomme pain|pain paon pull', 'cape|carte chaise chat|chaise chat chou', 'sac|sable seau sel|seau sel soda', 'coq|cape carte chaise|cape carte seau', 'robe|rose rame riz|rame riz râpe', 'râpe|râteau rame riz|rame riz robe', 'pain|paon poire pomme|poire pomme poule'],
      fam: ['pain main train|paon', 'robe globe|rose rame', 'luge juge|lune jupe', 'gâteau râteau|râpe robe', 'carte tarte|tapis tasse', 'seau veau|sel verre', 'sable table|sac tapis', 'filet gilet|girafe four', 'terre verre|veau vélo'],
      syl: ['cha·peau|cha·meau|tam·bour dau·phin', 'cha·meau|cha·peau|cous·sin ci·tron', 're·nard|re·quin|mou·ton tor·tue', 're·quin|re·nard|sou·ris ra·dis', 'ca·nard|ca·deau|tam·bour dau·phin', 'ca·deau|ca·nard|cous·sin ci·tron', 'ba·teau|ba·lai|mou·ton tor·tue', 'ba·lai|ba·teau|sou·ris ra·dis'],
      mem: ['tapis table tarte', 'chat chaise chou', 'sofa soda souris', 'clé clou cape', 'poule poire pomme', 'cape carte chaise', 'sac sable seau', 'robe rose rame', 'râpe râteau rame', 'pain paon poire']
    },
    fi: {
      words: {'ankka': 'animals/duck', 'auto': 'toys/car', 'bussi': 'vehicles/bus', 'hame': 'clothing/skirt', 'hammas': 'body parts/tooth', 'hana': 'around the house/faucet', 'kakku': '4th of July/cake', 'kala': 'animals/fish', 'kana': 'farm animals/chicken', 'kani': 'animals/rabbit', 'kannu': 'kitchen tools/jug', 'kassi': 'At the Supermarket/bag', 'kenguru': 'zoo animals/kangaroo', 'kenkä': 'clothing/shoe', 'kettu': 'animals/fox', 'kiivi': 'At the Supermarket/kiwi', 'kirahvi': 'animals/giraffe', 'kirja': 'classroom/book', 'kirje': 'post office/letter', 'kissa': 'animals/cat', 'kitara': 'music/guitar', 'koira': 'animals/dog', 'kokki': 'occupations/chef', 'kolmio': 'shapes/triangle', 'kori': 'At the Supermarket/basket', 'kukka': 'spring/flower', 'kukko': 'farm animals/rooster', 'kuppi': 'around the house/cup', 'kuu': 'camping/moon', 'kynä': 'around the house/pen', 'käsi': 'body parts/hand', 'lammas': 'animals/sheep', 'lasi': 'kitchen tools/glass', 'liivi': 'accessories/vest', 'lippu': '4th of July/flag', 'lokki': 'animals/seagull', 'lukko': 'around the house/lock', 'mango': 'fruits/mango', 'mansikka': 'At the Supermarket/strawberry', 'nukke': 'toys/doll', 'pallo': 'toys/ball', 'panda': 'animals/panda', 'pannu': 'around the house/pan', 'reki': 'christmas/sleigh', 'rumpu': 'music/drum', 'sika': 'animals/pig', 'solmio': 'accessories/tie', 'sukka': 'accessories/sock', 'susi': 'animals/wolf', 'suu': 'body parts/mouth', 'takka': 'around the house/fireplace', 'takki': 'clothing/coat', 'talo': 'miscellaneous/house', 'tipu': 'farm animals/chick', 'tuoli': 'around the house/chair', 'tussi': 'classroom/marker'},
      l1: ['kala|kakku kana kettu|kettu kiivi kirja', 'kana|kani kannu kettu|kettu kiivi kirja', 'kassi|kakku kala kettu|kettu kiivi kirja', 'kuu|kukka kukko kakku|kakku kala kana', 'kukka|kukko kuppi kakku|kakku kala kana', 'kori|koira kokki kakku|kakku kala kana', 'kokki|koira kolmio kakku|kakku kala kana', 'kiivi|kirja kirje kakku|kakku kala kana', 'kissa|kiivi kirja kakku|kakku kala kana', 'kynä|kakku kala kana|kakku kala reki', 'talo|takka takki tipu|tipu tussi auto', 'susi|sukka suu sika|sika solmio auto'],
      fam: ['kuu suu|susi kukka', 'kukka sukka|kukko susi', 'kana hana|kani kannu', 'kukko lukko|kukka kuu', 'pannu kannu|kana kani', 'tussi bussi|talo tipu', 'kokki lokki|kori kolmio', 'kiivi liivi|lippu kirja', 'lammas hammas|hame lasi'],
      syl: ['ki·rah·vi|ki·ta·ra|kis·sa koi·ra', 'ki·ta·ra|ki·rah·vi|pal·lo nuk·ke', 'ken·gu·ru|ken·kä|ank·ka ket·tu', 'ken·kä|ken·gu·ru|rum·pu tuo·li', 'pan·nu|pan·da|kis·sa koi·ra', 'pan·da|pan·nu|pal·lo nuk·ke', 'man·sik·ka|man·go|ank·ka ket·tu', 'man·go|man·sik·ka|rum·pu tuo·li'],
      mem: ['kala kakku kana', 'kana kani kannu', 'kuu kukka kukko', 'kori koira kokki', 'kiivi kirja kirje', 'talo takka takki', 'susi sukka suu', 'kynä kala käsi']
    }
  };
  /*DATA-END*/

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVEL_KEYS = ['read', 'family', 'syllables', 'memory'];
  var MIN_ROUNDS = 7;

  function locale(l) { l = String(l || 'en').slice(0, 2); return DATA[l] ? l : 'en'; }
  function units(w) { return Array.from(String(w).normalize('NFC').toLocaleLowerCase()); }
  /* how a word is printed: German nouns carry their capital */
  function display(loc, key) { return loc === 'de' ? key.charAt(0).toLocaleUpperCase('de') + key.slice(1) : key; }
  function entry(loc, spec) {
    var parts = spec.split('·'), key = parts.join(''), pic = DATA[loc].words[key];
    if (!pic) throw new Error('name-tag: no picture for ' + loc + '/' + key);
    var w = display(loc, key), pieces = [], i = 0;
    parts.forEach(function (p) { pieces.push(w.slice(i, i + p.length)); i += p.length; });
    return { key: key, word: w, pic: pic, letters: units(key), parts: pieces, sparts: parts.map(function (p) { return p.toLocaleLowerCase(); }) };
  }
  function shared(a, b) { var A = units(a), B = units(b), k = 0; while (k < A.length && k < B.length && A[k] === B[k]) k++; return k; }

  /* THE STICK TEST: units press down from the left while they match; the first different one lifts the tag.
     stuck = how many pressed; full = every unit of the tag AND of the picture's name pressed. */
  function stickTest(tagUnits, nameUnits) {
    var k = 0; while (k < tagUnits.length && k < nameUnits.length && tagUnits[k] === nameUnits[k]) k++;
    var full = k === tagUnits.length && k === nameUnits.length;
    return { stuck: k, full: full, peelAt: full ? -1 : k, short: !full && k === tagUnits.length };
  }

  function rounds(loc, lv, look) {
    loc = locale(loc); var D = DATA[loc];
    if (lv === 'read') return D.l1.map(function (t) {
      var p = t.split('|'), set = look === 'far' ? p[2] : p[1], target = entry(loc, p[0]);
      var others = set.split(' ').map(function (w) { return entry(loc, w); });
      var near = 1; others.forEach(function (o, i) { if (shared(o.key, target.key) > shared(others[near - 1].key, target.key)) near = i + 1; });
      return { id: 'read-' + target.key + '-' + (look === 'far' ? 'far' : 'close'), level: lv, loc: loc, tag: target, wall: [target].concat(others), near: near };
    });
    if (lv === 'family') return D.fam.map(function (t) {
      var p = t.split('|'), tags = p[0].split(' ').map(function (w) { return entry(loc, w); }), extras = p[1].split(' ').map(function (w) { return entry(loc, w); });
      return { id: 'family-' + tags.map(function (x) { return x.key; }).join('-'), level: lv, loc: loc, tags: tags, wall: tags.concat(extras), ending: ending(tags) };
    });
    if (lv === 'syllables') return D.syl.map(function (t) {
      var p = t.split('|'), target = entry(loc, p[0]), partner = entry(loc, p[1]), others = p[2].split(' ').map(function (w) { return entry(loc, w); });
      return { id: 'syllables-' + target.key, level: lv, loc: loc, tag: target, wall: [target, partner].concat(others), near: 1 };
    });
    if (lv === 'memory') return D.mem.map(function (t) {
      var ws = t.split(' ').map(function (w) { return entry(loc, w); });
      return { id: 'memory-' + ws.map(function (x) { return x.key; }).join('-'), level: lv, loc: loc, words: ws };
    });
    return [];
  }
  /* the shared ending of a family (its rime) */
  function ending(tags) {
    var a = tags.map(function (t) { return t.letters.slice().reverse(); }), k = 0;
    while (a.every(function (x) { return k < x.length && x[k] === a[0][k]; })) k++;
    var end = a[0].slice(0, k).reverse().join(''), v = end.search(/[aeiouyäöüåæøéèêëàáâãíìîïóòôõúùûœ]/);
    return v > 0 ? end.slice(v) : end;   /* the rime: from the vowel (kreis/reis → -eis, sko/ko → -o) */
  }
  function levels(loc) { loc = locale(loc); return LEVEL_KEYS.filter(function (lv) { return rounds(loc, lv, 'close').length >= MIN_ROUNDS; }); }
  function level(loc, lv) { var ls = levels(loc); return ls.indexOf(lv) >= 0 ? lv : ls[0]; }

  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  /* the 2 × 2 wall: frames 0 1 / 2 3; side by side = a row or a column neighbour (0-3 and 1-2 are diagonal) */
  var NEIGH = [[1, 2], [0, 3], [0, 3], [1, 2]], DIAG = [3, 2, 1, 0];
  /* one pass of wall layouts: the target in each frame a quarter of the time (±1); the nearest look-alike beside it in exactly half the rounds */
  function deal(n, rnd) {
    var tf = []; for (var i = 0; i < n; i++) tf.push(i % 4);
    shuffle(tf, rnd);
    var side = []; for (var j = 0; j < n; j++) side.push(j < Math.round(n / 2));
    shuffle(side, rnd);
    return tf.map(function (t, i) {
      var nf = side[i] ? NEIGH[t][Math.floor(rnd() * 2)] : DIAG[t];
      var rest = shuffle([0, 1, 2, 3].filter(function (f) { return f !== t && f !== nf; }), rnd);
      var lay = [0, 0, 0, 0]; lay[t] = 0; lay[nf] = 1; lay[rest[0]] = 2; lay[rest[1]] = 3;
      return lay;   /* lay[frame] = wall index (0 = the target, 1 = the nearest look-alike) */
    });
  }
  /* a family wall: any order */
  function dealFree(n, rnd) { var out = []; for (var i = 0; i < n; i++) out.push(shuffle([0, 1, 2, 3], rnd)); return out; }
  /* memory: 6 cards (3 pictures + 3 tags) on a 3 × 2 grid in any order */
  function dealCards(n, rnd) { var out = []; for (var i = 0; i < n; i++) out.push(shuffle([0, 1, 2, 3, 4, 5], rnd)); return out; }

  function newState(r, opts) {
    opts = opts || {};
    var st = { r: r, misses: 0, help: 0, show: false, last: null, done: false };
    if (r.level === 'memory') {
      var order = opts.cards || [0, 1, 2, 3, 4, 5];
      st.cards = order.map(function (c) { return { kind: c < 3 ? 'pic' : 'tag', i: c % 3 }; });
      st.up = []; st.found = [];
      return st;
    }
    st.layout = opts.layout || [0, 1, 2, 3];
    if (r.level === 'family') { st.hung = r.tags.map(function () { return -1; }); st.locked = r.tags.map(function () { return false; }); }
    else st.hung = [-1];
    if (r.level === 'syllables') { st.pieceOrder = opts.pieceOrder || r.tag.parts.map(function (_, i) { return i; }); st.built = []; }
    return st;
  }
  function moved(st) { st.show = false; st.last = null; }
  function wallAt(st, frame) { return st.r.wall[st.layout[frame]]; }
  function tagsOf(st) { return st.r.level === 'family' ? st.r.tags : [st.r.tag]; }
  /* the tag as built so far (syllables) — the pieces in the order the child joined them */
  function builtWord(st) { var r = st.r; return st.built.map(function (i) { return r.tag.parts[i]; }); }
  function tagReady(st) { return st.r.level !== 'syllables' || st.built.length === st.r.tag.parts.length; }
  /* syllables: clip piece i onto the right end of the tag (or start it) */
  function join(st, i) { var r = st.r; if (st.done || r.level !== 'syllables' || i < 0 || i >= r.tag.parts.length || st.built.indexOf(i) >= 0 || st.hung[0] >= 0) return false; st.built.push(i); moved(st); return true; }
  /* syllables: break the tag apart again */
  function unjoin(st) { if (st.done || st.r.level !== 'syllables' || !st.built.length) return false; st.built = []; st.hung[0] = -1; moved(st); return true; }
  /* hang tag t on frame f (another loose tag there goes back to the tray) */
  function hang(st, t, f) {
    var r = st.r;
    if (st.done || r.level === 'memory' || f < 0 || f > 3 || t < 0 || t >= st.hung.length || !tagReady(st)) return false;
    if (st.locked && st.locked[t]) return false;
    if (st.hung[t] === f) return false;
    for (var o = 0; o < st.hung.length; o++) if (o !== t && st.hung[o] === f) { if (st.locked && st.locked[o]) return false; st.hung[o] = -1; }
    st.hung[t] = f; moved(st);
    return true;
  }
  function unhang(st, t) { if (st.done || !st.hung || st.hung[t] < 0 || (st.locked && st.locked[t])) return false; st.hung[t] = -1; moved(st); return true; }
  function test(st, t) {
    var r = st.r, tag = tagsOf(st)[t], pic = wallAt(st, st.hung[t]);
    if (r.level === 'syllables') { var tu = builtWord(st).map(function (p) { return p.toLocaleLowerCase(); }); return stickTest(tu, pic.sparts); }
    return stickTest(tag.letters, pic.letters);
  }

  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (r.level === 'memory') return { ok: false, kase: 'memory' };
    if (r.level === 'syllables' && !tagReady(st)) { st.show = true; st.last = { result: 'join' }; return { ok: false, kase: 'join' }; }
    if (st.hung.every(function (h) { return h < 0; })) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    if (r.level === 'family' && st.hung.some(function (h) { return h < 0; })) { st.show = true; st.last = { result: 'tray' }; return { ok: false, kase: 'tray' }; }
    var tests = st.hung.map(function (_, t) { return test(st, t); });
    var all = tests.every(function (x) { return x.full; });
    if (r.level === 'family') {
      var peels = [];
      tests.forEach(function (x, t) { if (x.full) st.locked[t] = true; else peels.push({ tag: t, frame: st.hung[t], stuck: x.stuck, peelAt: x.peelAt, short: x.short }); });
      if (all) { st.done = true; st.show = false; st.last = { result: 'right', tests: tests }; return { ok: true, tests: tests }; }
      peels.forEach(function (p) { st.hung[p.tag] = -1; });
      st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { result: 'peel', peels: peels, tests: tests };
      return { ok: false, kase: 'peel', peels: peels, tests: tests };
    }
    var x = tests[0], frame = st.hung[0];
    if (x.full) { st.done = true; st.show = false; st.last = { result: 'right', frame: frame, test: x }; return { ok: true, test: x, frame: frame }; }
    st.hung[0] = -1; st.misses++; st.help = Math.min(2, st.misses); st.show = true;
    st.last = { result: 'peel', frame: frame, stuck: x.stuck, peelAt: x.peelAt, short: x.short, peels: [{ tag: 0, frame: frame, stuck: x.stuck, peelAt: x.peelAt, short: x.short }] };
    return { ok: false, kase: 'peel', test: x, frame: frame };
  }

  /* memory: turn a card face up; the second card decides */
  function flip(st, c) {
    if (st.done || st.r.level !== 'memory' || c < 0 || c >= st.cards.length) return null;
    if (st.found.indexOf(st.cards[c].i + ':' + st.cards[c].kind) >= 0 || st.up.indexOf(c) >= 0 || st.up.length >= 2) return null;
    st.up.push(c); moved(st);
    if (st.up.length < 2) return { kase: 'one' };
    var a = st.cards[st.up[0]], b = st.cards[st.up[1]];
    if (a.kind !== b.kind && a.i === b.i) {
      st.found.push(a.i + ':pic', a.i + ':tag'); st.up = [];
      if (st.found.length === 6) { st.done = true; st.last = { result: 'right' }; return { kase: 'done' }; }
      return { kase: 'pair', i: a.i };
    }
    var res = { kase: 'miss' };
    if (a.kind !== b.kind) { var tg = a.kind === 'tag' ? a : b, pc = a.kind === 'tag' ? b : a; res.test = stickTest(st.r.words[tg.i].letters, st.r.words[pc.i].letters); res.tag = tg.i; res.pic = pc.i; }
    st.misses++; st.show = true; st.last = { result: 'mismatch', test: res.test };
    return res;
  }
  /* memory: the two unmatched cards turn back over */
  function settle(st) { if (st.up.length !== 2) return false; st.up = []; return true; }
  function isUp(st, c) { var k = st.cards[c]; return st.up.indexOf(c) >= 0 || st.found.indexOf(k.i + ':' + k.kind) >= 0; }

  /* miss 2 brings the help (the reading finger); any move takes it away again */
  function helpOn(st) { return !st.done && st.show && st.help >= 2 && st.last && st.last.result === 'peel'; }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, r = st.r;
    if (R === 'empty') return 'hintHang';
    if (R === 'tray') return 'hintTray';
    if (R === 'join') return 'hintJoin';
    if (R === 'mismatch') return 'hintMem';
    if (R !== 'peel') return null;
    if (st.help >= 2) return r.level === 'syllables' ? 'hintHelpSyl' : 'hintHelp';
    if (r.level === 'family') return 'hintFamily';
    var syl = r.level === 'syllables';
    if (st.last.short) return 'hintShortSyl';   /* only a syllable tag can be the start of a longer name (bas·ket on bas·ket·ball): the data keeps letter walls prefix-free */
    if (st.last.stuck === 0) return syl ? 'hintFirstSyl' : 'hintFirst';
    return syl ? 'hintPeelSyl' : (st.last.stuck === 1 ? 'hintPeel1' : 'hintPeel');
  }
  /* the unit the tag peeled at (for the hint and the coral ring) */
  function peelUnit(st) {
    var l = st.last, r = st.r; if (!l || l.result !== 'peel' || l.short) return '';
    if (r.level === 'syllables') return builtWord(st)[l.peelAt] || '';
    if (r.level === 'family') return '';
    return Array.from(r.tag.word)[l.peelAt] || '';
  }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pic = wide ? 136 : (W < 340 ? 92 : 104);
    L.font = wide ? 52 : (W < 340 ? 36 : 40);
    L.card = wide ? 112 : (W < 340 ? 84 : 96);
    return L;
  }

  return {
    DATA: DATA, LOCALES: LOCALES, LEVEL_KEYS: LEVEL_KEYS, MIN_ROUNDS: MIN_ROUNDS, NEIGH: NEIGH, DIAG: DIAG,
    locale: locale, units: units, display: display, entry: entry, shared: shared, stickTest: stickTest, rounds: rounds, ending: ending,
    levels: levels, level: level, seeded: seeded, deal: deal, dealFree: dealFree, dealCards: dealCards, newState: newState,
    wallAt: wallAt, tagsOf: tagsOf, builtWord: builtWord, tagReady: tagReady, join: join, unjoin: unjoin, hang: hang, unhang: unhang, test: test,
    check: check, flip: flip, settle: settle, isUp: isUp, helpOn: helpOn, hint: hint, peelUnit: peelUnit, order: order, layout: layout
  };
}));
