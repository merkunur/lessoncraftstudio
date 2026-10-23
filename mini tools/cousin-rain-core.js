/* =====================================================================
   cousin-rain-core.js — the model of ACTIVITY #78 of the one-by-one
   rebuild: "Mim's Memory Baskets" → THE COUSIN RAIN (L.K.5.A, 11 locales).
   Design sheet: docs/activities-rebuild/designs/078-mims-baskets.md
   ---------------------------------------------------------------------
   THE INVENTION: the baskets carry no labels — the child makes the groups.
   A basket that holds two or more things of ONE kind makes Mim's little
   cloud over it rain down a COUSIN: a new member of that kind (a dog and a
   cat → a rabbit). At Check a basket that mixes two kinds makes its cloud
   split in two, and each half rains a cousin of ONE of the kinds onto its
   own relatives — the two families appear side by side, and in the colour
   and shape rounds the cousins do NOT share the confusing look.
   Levels: Sort (2–4 baskets, l1) · The stray (one big basket + the little
   basket for the one of another kind, l2) · Two clouds (three baskets
   under two rule clouds, the middle one for things with both traits, l3).
   Every success sentence is a LITERAL per locale and per round — nothing is
   assembled from inflected parts. No DOM. UMD: window.CousinRainCore /
   module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CousinRainCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['l1', 'l2', 'l3'];
  var BASKETS = ['any', 'two'];
  var RAINS = ['live', 'check'];

  /* every thing is one library picture (contact sheets read 2026-10-23: the duck is a DUCKLING and never
     flies here — the goose does; the train is a small toy-like engine and is never "big in real life";
     fruits/pear has a red blush — the supermarket pear is plain green-yellow; fruits/cherry is an apple) */
  var PIC = {
    dog: 'pets/dog', cat: 'pets/cat', fish: 'pets/fish', rabbit: 'pets/rabbit', turtle: 'pets/turtle',
    duck: 'farm-animals/duck', horse: 'farm-animals/horse', cow: 'farm-animals/cow', pig: 'farm-animals/pig', sheep: 'farm-animals/sheep',
    apple: 'fruits/apple', banana: 'fruits/banana', pear: 'at-the-supermarket/pear', orange: 'fruits/orange', strawberry: 'fruits/strawberry',
    kiwi: 'at-the-supermarket/kiwi', cherry: 'at-the-supermarket/cherry', blueberry: 'at-the-supermarket/blueberry',
    carrot: 'vegetables/carrot', broccoli: 'vegetables/broccoli', potato: 'vegetables/potato', corn: 'vegetables/corn', lettuce: 'vegetables/lettuce',
    bread: 'at-the-supermarket/bread', cheese: 'at-the-supermarket/cheese',
    car: 'vehicles/car', bus: 'vehicles/bus', train: 'vehicles/train', tractor: 'vehicles/tractor', boat: 'vehicles/boat',
    airplane: 'vehicles/airplane', helicopter: 'vehicles/helicopter', ship: 'vehicles/ship',
    ball: 'toys/ball', blocks: 'toys/blocks', robot: 'toys/robot', kite: 'toys/kite',
    shoe: 'clothing/shoe', strawhat: 'clothing/hat', coat: 'clothing/coat', shirt: 'clothing/shirt', tshirt: 'clothing/t-shirt',
    swimsuit: 'clothing/swimsuit', mitten: 'clothing/mitten', cap: 'clothing/cap', bluehat: 'accessories/hat',
    star: 'shapes/star', circle: 'shapes/circle', triangle: 'shapes/triangle', square: 'shapes/square',
    crab: 'ocean-life/crab', octopus: 'ocean-life/octopus', dolphin: 'ocean-life/dolphin', jellyfish: 'ocean-life/jellyfish',
    starfish: 'ocean-life/starfish', whale: 'ocean-life/whale',
    fox: 'forest-creatures/fox', deer: 'forest-creatures/deer', squirrel: 'forest-creatures/squirrel', hedgehog: 'forest-creatures/hedgehog',
    butterfly: 'forest-creatures/butterfly', mouse: 'forest-creatures/mouse',
    bee: 'things-that-fly/bee', goose: 'things-that-fly/goose', swan: 'birds-2/swan', eagle: 'birds-2/eagle', pelican: 'birds-2/pelican',
    seagull: 'birds-2/seagull', penguin: 'birds-2/penguin', owl: 'birds-2/owl', cardinal: 'birds-2/cardinal',
    ladybug: 'insects-and-bugs/ladybug', lion: 'zoo-animals/lion', elephant: 'zoo-animals/elephant',
    haystack: 'thanksgivinng/haystack', scarecrow: 'thanksgivinng/scarecrow', farmcorn: 'thanksgivinng/corn',
    snowman: 'winter/snowman', igloo: 'winter/igloo', sled: 'winter/sled', snowflake: 'weather/snowflake',
    clock: 'around-the-house/clock', plate: 'kitchen-tools/plate', house: 'miscellaneous/house'
  };
  var MIM = 'weather/cloud';
  /* the word a picture is called by in THIS activity where the library label is wrong for a child (reviewer 2026-10-23:
     pt Veado is a slur in Brazil, cervo; pt Mitene is a fingerless glove, luva; pt maiô is the child's word for a swimsuit;
     es manopla is rare in Mexico, guante; it children say macchina / aereo) */
  var LABEL = { pt: { deer: 'Cervo', mitten: 'Luva', swimsuit: 'Maiô' }, es: { mitten: 'Guante' }, it: { car: 'Macchina', airplane: 'Aereo' } };

  /* L3 traits — what each thing really is or does (the gate keeps its own copy and re-derives every place) */
  var TRAITS = {
    eagle: ['animal', 'flies'], bee: ['animal', 'flies'], goose: ['animal', 'flies', 'swims'], swan: ['animal', 'flies', 'swims'],
    dolphin: ['animal', 'swims'], fish: ['animal', 'swims'], owl: ['animal', 'flies'], butterfly: ['animal', 'flies'],
    pelican: ['animal', 'flies', 'swims'], seagull: ['animal', 'flies', 'swims'], whale: ['animal', 'swims', 'big'], penguin: ['animal', 'swims'],
    banana: ['food', 'fruit'], pear: ['food', 'fruit'], strawberry: ['food', 'fruit', 'red'], apple: ['food', 'fruit', 'red', 'round'],
    ladybug: ['animal', 'red'], tractor: ['vehicle', 'red', 'farm'], lion: ['animal'], cow: ['animal', 'farm'], sheep: ['animal', 'farm'],
    haystack: ['farm'], car: ['vehicle'], train: ['vehicle'], airplane: ['vehicle', 'flies', 'big'], helicopter: ['vehicle', 'flies'],
    kite: ['toy', 'flies'], swimsuit: ['clothing'], tshirt: ['clothing'], coat: ['clothing', 'winter', 'red'], mitten: ['clothing', 'winter'],
    snowman: ['winter'], sled: ['winter'], carrot: ['food'], orange: ['food', 'fruit', 'round'], ball: ['toy', 'round'], clock: ['round'],
    mouse: ['animal'], elephant: ['animal', 'big'], bus: ['vehicle', 'big'], house: ['big'],
    /* rule pictures */
    octopus: ['animal', 'swims'], cardinal: ['animal', 'flies', 'red'], dog: ['animal'], scarecrow: ['farm'], farmcorn: ['farm', 'food'],
    boat: ['vehicle', 'swims'], shoe: ['clothing'], cap: ['clothing'], snowflake: ['winter'], igloo: ['winter'], bread: ['food'], cheese: ['food'],
    circle: ['round'], plate: ['round'], cat: ['animal'], duck: ['animal'], ship: ['vehicle', 'big']
  };

  /* Level 1 — Sort: [kind, [things], cousin]; baskets = kinds. Confound rounds: the cousins never share the confusing look. */
  var L1 = [
    [['animal', ['dog', 'cat'], 'rabbit'], ['food', ['apple', 'banana'], 'bread']],
    [['animal', ['dog', 'horse'], 'pig'], ['food', ['apple', 'corn'], 'cheese'], ['vehicle', ['car', 'train'], 'bus']],
    [['food', ['apple', 'banana'], 'kiwi'], ['vehicle', ['tractor', 'bus'], 'airplane']],
    [['animal', ['dog', 'fish', 'duck', 'turtle'], 'rabbit'], ['vehicle', ['car', 'bus'], 'helicopter']],   /* no boat: fish+duck+turtle+boat vs dog+car would be a second right sort (in water / on land) */
    [['toy', ['ball', 'blocks'], 'kite'], ['food', ['orange', 'pear'], 'banana'], ['clothing', ['shoe', 'bluehat'], 'shirt']],
    [['clothing', ['bluehat', 'shoe'], 'coat'], ['vehicle', ['train', 'bus'], 'car'], ['food', ['corn', 'carrot'], 'bread'], ['animal', ['cat', 'rabbit'], 'cow']],
    [['animal', ['rabbit', 'turtle', 'owl'], 'fish'], ['toy', ['blocks', 'robot'], 'ball'], ['food', ['bread', 'cheese'], 'apple']],
    [['food', ['banana', 'strawberry'], 'kiwi'], ['animal', ['duck', 'pig'], 'cow'], ['clothing', ['strawhat', 'coat'], 'shirt']],
    [['shape', ['star', 'circle', 'triangle'], 'square'], ['food', ['strawberry', 'apple'], 'banana'], ['animal', ['horse', 'cow'], 'sheep']],
    [['fruit', ['apple', 'banana', 'pear'], 'strawberry'], ['vegetable', ['carrot', 'broccoli', 'potato'], 'lettuce']],
    [['ocean', ['crab', 'octopus', 'dolphin'], 'starfish'], ['forest', ['fox', 'deer', 'squirrel'], 'hedgehog']],
    [['farm', ['cow', 'pig'], 'sheep'], ['ocean', ['crab', 'jellyfish'], 'whale'], ['forest', ['fox', 'hedgehog'], 'deer']],
    [['toy', ['ball', 'kite', 'robot'], 'blocks'], ['clothing', ['shoe', 'coat', 'mitten'], 'strawhat']],
    [['vehicle', ['bus', 'tractor', 'helicopter'], 'airplane'], ['animal', ['cow', 'sheep', 'horse'], 'lion']]
  ];
  /* Level 2 — The stray: [bigKind, [three things], bigCousin], [strayKind, stray, strayCousin] */
  var L2 = [
    [['animal', ['dog', 'cat', 'fish'], 'rabbit'], ['vehicle', 'car', 'bus']],
    [['fruit', ['apple', 'banana', 'pear'], 'kiwi'], ['toy', 'ball', 'kite']],
    [['vehicle', ['train', 'bus', 'car'], 'boat'], ['animal', 'rabbit', 'cow']],
    [['clothing', ['shoe', 'bluehat', 'coat'], 'shirt'], ['food', 'apple', 'banana']],
    [['fruit', ['strawberry', 'apple', 'cherry'], 'pear'], ['vehicle', 'tractor', 'airplane']],
    [['fruit', ['orange', 'apple', 'blueberry'], 'banana'], ['toy', 'ball', 'kite']],
    [['animal', ['duck', 'pig', 'cow'], 'sheep'], ['food', 'banana', 'bread']],
    [['animal', ['fish', 'owl', 'turtle'], 'rabbit'], ['toy', 'kite', 'ball']],
    [['vegetable', ['carrot', 'broccoli', 'potato'], 'lettuce'], ['fruit', 'banana', 'kiwi']]
  ];
  /* Level 3 — Two clouds: rule A + its two pictures, rule B + its two, then the places [A only] [both] [B only] */
  var L3 = [
    [['flies', ['airplane', 'butterfly']], ['swims', ['octopus', 'whale']], [['eagle', 'bee'], ['goose', 'swan'], ['dolphin', 'fish']]],
    [['flies', ['helicopter', 'bee']], ['swims', ['octopus', 'dolphin']], [['owl', 'butterfly'], ['pelican', 'seagull'], ['whale', 'penguin']]],
    [['fruit', ['kiwi', 'orange']], ['red', ['cardinal', 'coat']], [['banana', 'pear'], ['strawberry', 'apple'], ['ladybug', 'tractor']]],
    [['animal', ['dog', 'fish']], ['farm', ['scarecrow', 'farmcorn']], [['lion', 'dolphin'], ['cow', 'sheep'], ['tractor', 'haystack']]],
    [['vehicle', ['bus', 'boat']], ['flies', ['bee', 'owl']], [['car', 'train'], ['airplane', 'helicopter'], ['kite', 'butterfly']]],
    [['clothing', ['shoe', 'cap']], ['winter', ['snowflake', 'igloo']], [['swimsuit', 'tshirt'], ['coat', 'mitten'], ['snowman', 'sled']]],
    [['food', ['bread', 'cheese']], ['round', ['circle', 'plate']], [['banana', 'carrot'], ['orange', 'apple'], ['ball', 'clock']]],
    [['animal', ['cat', 'duck']], ['big', ['ship', 'airplane']], [['mouse', 'ladybug'], ['elephant', 'whale'], ['bus', 'house']]]
  ];
  /* the round that opens a pass (the on-ramp; with "two baskets" the first two-kind round of three each) */
  var OPENER = { 'l1.any': 0, 'l1.two': 12, 'l2.any': 0, 'l3.any': 0 };

  /* ---- words: every sentence literal per locale ----
     kinds: "<kind> with <kind>" (a success line lists the round's kinds, then {line} wraps them)
     extra: the round's one teaching sentence (L1 rounds named by index); l2/l3: one sentence per round */
  var WORDS = {
    en: {
      line: '{k}!', remembers: 'Mim remembers!',
      kinds: { animal: 'animals with animals', food: 'food with food', vehicle: 'vehicles with vehicles', toy: 'toys with toys', clothing: 'clothes with clothes', shape: 'shapes with shapes', fruit: 'fruits with fruits', vegetable: 'vegetables with vegetables', ocean: 'sea animals with sea animals', forest: 'forest animals with forest animals', farm: 'farm animals with farm animals' },
      extra: {
        2: 'Red is only a color: the apple is food, and the tractor is a vehicle.',
        3: 'A fish, a duck, and a turtle look very different, but they are all animals.',
        4: 'Round is only a shape: the ball is a toy, and the orange is food.',
        7: 'Yellow is only a color: the banana is food, the duck is an animal, and the hat is clothing.',
        9: 'Fruits carry the plant’s seeds. The carrot is a root, and the lettuce is leaves.',
        10: 'The dolphin swims with its fins, and the fox’s thick fur keeps it warm in the forest.',
        11: 'The whale swims by pushing its big tail up and down, and the hedgehog curls up in its spines.',
        13: 'The tractor is on the farm too, but it is a vehicle, not an animal.'
      },
      l2: ['The car is not an animal. It is a vehicle!', 'The ball is not a fruit. It is a toy!', 'The rabbit is not a vehicle. It is an animal!', 'The apple is not clothing. It is food!', 'The tractor is red too, but it is a vehicle, not a fruit!', 'The ball is round too, but it is a toy, not a fruit!', 'The banana is yellow like the duck, but it is food, not an animal!', 'The kite flies like the owl, but it is a toy, not an animal!', 'The banana is not a vegetable. It is a fruit!'],
      l3: ['The goose and the swan fly and swim!', 'The pelican and the seagull fly and swim!', 'The strawberry and the apple are red fruits!', 'The cow and the sheep are farm animals!', 'The airplane and the helicopter are vehicles that fly!', 'The coat and the mitten are winter clothes!', 'The orange and the apple are round food!', 'The elephant and the whale are big animals!']
    },
    de: {
      line: '{k}!', remembers: 'Mim erinnert sich!',
      kinds: { animal: 'Tiere zu Tieren', food: 'Essen zu Essen', vehicle: 'Fahrzeuge zu Fahrzeugen', toy: 'Spielsachen zu Spielsachen', clothing: 'Kleidung zu Kleidung', shape: 'Formen zu Formen', fruit: 'Obst zu Obst', vegetable: 'Gemüse zu Gemüse', ocean: 'Meerestiere zu Meerestieren', forest: 'Waldtiere zu Waldtieren', farm: 'Bauernhoftiere zu Bauernhoftieren' },
      extra: {
        2: 'Rot ist nur eine Farbe: Der Apfel ist zum Essen, der Traktor ist ein Fahrzeug.',
        3: 'Fisch, Ente und Schildkröte sehen ganz verschieden aus, aber alle sind Tiere.',
        4: 'Rund ist nur eine Form: Der Ball ist ein Spielzeug, die Orange ist zum Essen.',
        7: 'Gelb ist nur eine Farbe: Die Banane ist zum Essen, die Ente ist ein Tier, der Hut ist Kleidung.',
        9: 'Obst trägt die Samen der Pflanze. Die Karotte ist eine Wurzel, und beim Salat essen wir die Blätter.',
        10: 'Der Delfin schwimmt mit seinen Flossen, und den Fuchs hält sein dickes Fell im Wald warm.',
        11: 'Der Wal schwimmt mit seiner großen Schwanzflosse, und der Igel rollt sich zur Stachelkugel zusammen.',
        13: 'Der Traktor ist auch auf dem Bauernhof, aber er ist ein Fahrzeug und kein Tier.'
      },
      l2: ['Das Auto ist kein Tier. Es ist ein Fahrzeug!', 'Der Ball ist kein Obst. Er ist ein Spielzeug!', 'Das Kaninchen ist kein Fahrzeug. Es ist ein Tier!', 'Der Apfel ist keine Kleidung. Er ist zum Essen!', 'Der Traktor ist auch rot, aber er ist ein Fahrzeug und kein Obst!', 'Der Ball ist auch rund, aber er ist ein Spielzeug und kein Obst!', 'Die Banane ist gelb wie die Ente, aber sie ist zum Essen und kein Tier!', 'Der Drachen fliegt wie die Eule, aber er ist ein Spielzeug und kein Tier!', 'Die Banane ist kein Gemüse. Sie ist Obst!'],
      l3: ['Die Gans und der Schwan fliegen und schwimmen!', 'Der Pelikan und die Möwe fliegen und schwimmen!', 'Die Erdbeere und der Apfel sind rotes Obst!', 'Die Kuh und das Schaf sind Bauernhoftiere!', 'Das Flugzeug und der Hubschrauber sind Fahrzeuge, die fliegen!', 'Der Mantel und der Fäustling sind Winterkleidung!', 'Die Orange und der Apfel sind rund und zum Essen!', 'Der Elefant und der Wal sind große Tiere!']
    },
    nl: {
      line: '{k}!', remembers: 'Mim weet het weer!',
      kinds: { animal: 'dieren bij dieren', food: 'eten bij eten', vehicle: 'voertuigen bij voertuigen', toy: 'speelgoed bij speelgoed', clothing: 'kleren bij kleren', shape: 'vormen bij vormen', fruit: 'fruit bij fruit', vegetable: 'groente bij groente', ocean: 'zeedieren bij zeedieren', forest: 'bosdieren bij bosdieren', farm: 'boerderijdieren bij boerderijdieren' },
      extra: {
        2: 'Rood is maar een kleur: de appel is eten, en de tractor is een voertuig.',
        3: 'De vis, de eend en de schildpad zien er heel anders uit, maar het zijn allemaal dieren.',
        4: 'Rond is maar een vorm: de bal is speelgoed, en de sinaasappel is eten.',
        7: 'Geel is maar een kleur: de banaan is eten, de eend is een dier, en de hoed is kleding.',
        9: 'In fruit zitten de zaadjes van de plant. De wortel is echt een wortel van de plant, en van de sla eten we de blaadjes.',
        10: 'De dolfijn zwemt met zijn vinnen, en de dikke vacht houdt de vos warm in het bos.',
        11: 'De walvis zwemt met zijn grote staart, en de egel rolt zich op tot een stekelbal.',
        13: 'De tractor staat ook op de boerderij, maar het is een voertuig, geen dier.'
      },
      l2: ['De auto is geen dier. Het is een voertuig!', 'De bal is geen fruit. Het is speelgoed!', 'Het konijn is geen voertuig. Het is een dier!', 'De appel is geen kleding. Het is eten!', 'De tractor is ook rood, maar het is een voertuig, geen fruit!', 'De bal is ook rond, maar het is speelgoed, geen fruit!', 'De banaan is geel, net als de eend, maar het is eten, geen dier!', 'De vlieger vliegt net als de uil, maar het is speelgoed, geen dier!', 'De banaan is geen groente. Het is fruit!'],
      l3: ['De gans en de zwaan vliegen en zwemmen!', 'De pelikaan en de zeemeeuw vliegen en zwemmen!', 'De aardbei en de appel zijn rood fruit!', 'De koe en het schaap zijn boerderijdieren!', 'Het vliegtuig en de helikopter zijn voertuigen die vliegen!', 'De jas en de want zijn winterkleren!', 'De sinaasappel en de appel zijn rond eten!', 'De olifant en de walvis zijn grote dieren!']
    },
    da: {
      line: '{k}!', remembers: 'Mim kan huske det!',
      kinds: { animal: 'dyr med dyr', food: 'mad med mad', vehicle: 'køretøjer med køretøjer', toy: 'legetøj med legetøj', clothing: 'tøj med tøj', shape: 'former med former', fruit: 'frugt med frugt', vegetable: 'grøntsager med grøntsager', ocean: 'havdyr med havdyr', forest: 'skovdyr med skovdyr', farm: 'bondegårdsdyr med bondegårdsdyr' },
      extra: {
        2: 'Rød er bare en farve: Æblet er mad, og traktoren er et køretøj.',
        3: 'Fisken, anden og skildpadden ligner slet ikke hinanden, men de er alle sammen dyr.',
        4: 'Rund er bare en form: Bolden er legetøj, og appelsinen er mad.',
        7: 'Gul er bare en farve: Bananen er mad, anden er et dyr, og hatten er tøj.',
        9: 'Frugt gemmer plantens frø. Guleroden er en rod, og salaten er blade.',
        10: 'Delfinen svømmer med sine finner, og den tykke pels holder ræven varm i skoven.',
        11: 'Hvalen svømmer med sin store hale, og pindsvinet ruller sig sammen til en kugle af pigge.',
        13: 'Traktoren er også på bondegården, men den er et køretøj, ikke et dyr.'
      },
      l2: ['Bilen er ikke et dyr. Den er et køretøj!', 'Bolden er ikke frugt. Den er legetøj!', 'Kaninen er ikke et køretøj. Den er et dyr!', 'Æblet er ikke tøj. Det er mad!', 'Traktoren er også rød, men den er et køretøj, ikke frugt!', 'Bolden er også rund, men den er legetøj, ikke frugt!', 'Bananen er gul ligesom anden, men den er mad, ikke et dyr!', 'Dragen flyver ligesom uglen, men den er legetøj, ikke et dyr!', 'Bananen er ikke en grøntsag. Den er frugt!'],
      l3: ['Gåsen og svanen flyver og svømmer!', 'Pelikanen og mågen flyver og svømmer!', 'Jordbærret og æblet er røde frugter!', 'Koen og fåret er bondegårdsdyr!', 'Flyvemaskinen og helikopteren er køretøjer, der flyver!', 'Frakken og vanten er vintertøj!', 'Appelsinen og æblet er rund mad!', 'Elefanten og hvalen er store dyr!']
    },
    sv: {
      line: '{k}!', remembers: 'Mim minns!',
      kinds: { animal: 'djur med djur', food: 'mat med mat', vehicle: 'fordon med fordon', toy: 'leksaker med leksaker', clothing: 'kläder med kläder', shape: 'former med former', fruit: 'frukt med frukt', vegetable: 'grönsaker med grönsaker', ocean: 'havsdjur med havsdjur', forest: 'skogsdjur med skogsdjur', farm: 'bondgårdsdjur med bondgårdsdjur' },
      extra: {
        2: 'Rött är bara en färg: äpplet är mat, och traktorn är ett fordon.',
        3: 'Fisken, ankan och sköldpaddan ser helt olika ut, men alla är djur.',
        4: 'Runt är bara en form: bollen är en leksak, och apelsinen är mat.',
        7: 'Gult är bara en färg: bananen är mat, ankan är ett djur, och hatten hör till kläderna.',
        9: 'I frukten finns växtens frön. Moroten är en rot, och salladen är blad.',
        10: 'Delfinen simmar med sina fenor, och den tjocka pälsen håller räven varm i skogen.',
        11: 'Valen simmar med sin stora stjärt, och igelkotten rullar ihop sig till en taggig boll.',
        13: 'Traktorn finns också på bondgården, men den är ett fordon, inte ett djur.'
      },
      l2: ['Bilen är inte ett djur. Den är ett fordon!', 'Bollen är inte en frukt. Den är en leksak!', 'Kaninen är inte ett fordon. Den är ett djur!', 'Äpplet är inte kläder. Det är mat!', 'Traktorn är också röd, men den är ett fordon, inte en frukt!', 'Bollen är också rund, men den är en leksak, inte en frukt!', 'Bananen är gul som ankan, men den är mat, inte ett djur!', 'Draken flyger som ugglan, men den är en leksak, inte ett djur!', 'Bananen är inte en grönsak. Den är en frukt!'],
      l3: ['Gåsen och svanen flyger och simmar!', 'Pelikanen och fiskmåsen flyger och simmar!', 'Jordgubben och äpplet är röda frukter!', 'Kon och fåret är bondgårdsdjur!', 'Flygplanet och helikoptern är fordon som flyger!', 'Kappan och vanten är vinterkläder!', 'Apelsinen och äpplet är rund mat!', 'Elefanten och valen är stora djur!']
    },
    no: {
      line: '{k}!', remembers: 'Mim husker det!',
      kinds: { animal: 'dyr med dyr', food: 'mat med mat', vehicle: 'kjøretøy med kjøretøy', toy: 'leker med leker', clothing: 'klær med klær', shape: 'former med former', fruit: 'frukt med frukt', vegetable: 'grønnsaker med grønnsaker', ocean: 'havdyr med havdyr', forest: 'skogsdyr med skogsdyr', farm: 'gårdsdyr med gårdsdyr' },
      extra: {
        2: 'Rød er bare en farge: Eplet er mat, og traktoren er et kjøretøy.',
        3: 'Fisken, anda og skilpadda ser helt forskjellige ut, men alle er dyr.',
        4: 'Rund er bare en form: Ballen er en leke, og appelsinen er mat.',
        7: 'Gul er bare en farge: Bananen er mat, anda er et dyr, og hatten hører til klærne.',
        9: 'Frukt gjemmer plantens frø. Gulroten er en rot, og salaten er blader.',
        10: 'Delfinen svømmer med finnene sine, og den tykke pelsen holder reven varm i skogen.',
        11: 'Hvalen svømmer med den store halen sin, og pinnsvinet ruller seg sammen til en piggball.',
        13: 'Traktoren er også på gården, men den er et kjøretøy, ikke et dyr.'
      },
      l2: ['Bilen er ikke et dyr. Den er et kjøretøy!', 'Ballen er ikke frukt. Den er en leke!', 'Kaninen er ikke et kjøretøy. Den er et dyr!', 'Eplet er ikke klær. Det er mat!', 'Traktoren er også rød, men den er et kjøretøy, ikke frukt!', 'Ballen er også rund, men den er en leke, ikke frukt!', 'Bananen er gul som anda, men den er mat, ikke et dyr!', 'Dragen flyr som ugla, men den er en leke, ikke et dyr!', 'Bananen er ikke en grønnsak. Den er frukt!'],
      l3: ['Gåsa og svanen flyr og svømmer!', 'Pelikanen og måken flyr og svømmer!', 'Jordbæret og eplet er røde frukter!', 'Kua og sauen er gårdsdyr!', 'Flyet og helikopteret er kjøretøy som flyr!', 'Frakken og votten er vinterklær!', 'Appelsinen og eplet er rund mat!', 'Elefanten og hvalen er store dyr!']
    },
    es: {
      line: '¡{k}!', remembers: '¡Mim se acuerda!',
      kinds: { animal: 'animales con animales', food: 'comida con comida', vehicle: 'vehículos con vehículos', toy: 'juguetes con juguetes', clothing: 'ropa con ropa', shape: 'figuras con figuras', fruit: 'frutas con frutas', vegetable: 'verduras con verduras', ocean: 'animales del mar con animales del mar', forest: 'animales del bosque con animales del bosque', farm: 'animales de granja con animales de granja' },
      extra: {
        2: 'El rojo es solo un color: la manzana es comida y el tractor es un vehículo.',
        3: 'El pez, el pato y la tortuga se ven muy distintos, pero todos son animales.',
        4: 'Redondo es solo una forma: la pelota es un juguete y la naranja es comida.',
        7: 'El amarillo es solo un color: el plátano es comida, el pato es un animal y el sombrero es ropa.',
        9: 'Las frutas guardan las semillas de la planta. La zanahoria es una raíz y la lechuga son hojas.',
        10: 'El delfín nada con sus aletas, y el zorro tiene un pelaje grueso que lo mantiene calientito en el bosque.',
        11: 'La ballena nada moviendo su gran cola, y el erizo se hace bolita entre sus púas.',
        13: 'El tractor también está en la granja, pero es un vehículo, no un animal.'
      },
      l2: ['El carro no es un animal. ¡Es un vehículo!', 'La pelota no es una fruta. ¡Es un juguete!', 'El conejo no es un vehículo. ¡Es un animal!', 'La manzana no es ropa. ¡Es comida!', 'El tractor también es rojo, pero es un vehículo, ¡no una fruta!', 'La pelota también es redonda, pero es un juguete, ¡no una fruta!', 'El plátano es amarillo como el pato, pero es comida, ¡no un animal!', 'El papalote vuela como el búho, pero es un juguete, ¡no un animal!', 'El plátano no es una verdura. ¡Es una fruta!'],
      l3: ['¡El ganso y el cisne vuelan y nadan!', '¡El pelícano y la gaviota vuelan y nadan!', '¡La fresa y la manzana son frutas rojas!', '¡La vaca y la oveja son animales de granja!', '¡El avión y el helicóptero son vehículos que vuelan!', '¡El abrigo y el guante son ropa de invierno!', '¡La naranja y la manzana son comida redonda!', '¡El elefante y la ballena son animales grandes!']
    },
    it: {
      line: '{k}!', remembers: 'Mim se lo ricorda!',
      kinds: { animal: 'animali con animali', food: 'cibo con cibo', vehicle: 'veicoli con veicoli', toy: 'giocattoli con giocattoli', clothing: 'vestiti con vestiti', shape: 'forme con forme', fruit: 'frutta con frutta', vegetable: 'verdura con verdura', ocean: 'animali del mare con animali del mare', forest: 'animali del bosco con animali del bosco', farm: 'animali della fattoria con animali della fattoria' },
      extra: {
        2: 'Il rosso è solo un colore: la mela è cibo e il trattore è un veicolo.',
        3: 'Il pesce, l’anatra e la tartaruga sono molto diversi, ma sono tutti animali.',
        4: 'Rotondo è solo una forma: la palla è un giocattolo e l’arancia è cibo.',
        7: 'Il giallo è solo un colore: la banana è cibo, l’anatra è un animale e il cappello si indossa.',
        9: 'La frutta porta i semi della pianta. La carota è una radice e la lattuga sono foglie.',
        10: 'Il delfino nuota con le pinne, e la pelliccia folta tiene al caldo la volpe nel bosco.',
        11: 'La balena nuota muovendo la grande coda, e il riccio si chiude a palla tra i suoi aculei.',
        13: 'Anche il trattore sta in fattoria, ma è un veicolo, non un animale.'
      },
      l2: ['La macchina non è un animale. È un veicolo!', 'La palla non è frutta. È un giocattolo!', 'Il coniglio non è un veicolo. È un animale!', 'La mela non è un vestito. È cibo!', 'Anche il trattore è rosso, ma è un veicolo, non frutta!', 'Anche la palla è rotonda, ma è un giocattolo, non frutta!', 'La banana è gialla come l’anatra, ma è cibo, non un animale!', 'L’aquilone vola come il gufo, ma è un giocattolo, non un animale!', 'La banana non è verdura. È frutta!'],
      l3: ['L’oca e il cigno volano e nuotano!', 'Il pellicano e il gabbiano volano e nuotano!', 'La fragola e la mela sono frutti rossi!', 'La mucca e la pecora sono animali della fattoria!', 'L’aereo e l’elicottero sono veicoli che volano!', 'Il cappotto e la muffola sono vestiti da inverno!', 'L’arancia e la mela sono cibi rotondi!', 'L’elefante e la balena sono animali grandi!']
    },
    pt: {
      line: '{k}!', remembers: 'A Mimi lembrou!',
      kinds: { animal: 'animais com animais', food: 'comida com comida', vehicle: 'veículos com veículos', toy: 'brinquedos com brinquedos', clothing: 'roupas com roupas', shape: 'formas com formas', fruit: 'frutas com frutas', vegetable: 'legumes e verduras juntos', ocean: 'animais do mar com animais do mar', forest: 'animais da floresta com animais da floresta', farm: 'animais da fazenda com animais da fazenda' },
      extra: {
        2: 'Vermelho é só uma cor: a maçã é comida e o trator é um veículo.',
        3: 'O peixe, o pato e a tartaruga são bem diferentes, mas todos são animais.',
        4: 'Redondo é só uma forma: a bola é um brinquedo e a laranja é comida.',
        7: 'Amarelo é só uma cor: a banana é comida, o pato é um animal e o chapéu é roupa.',
        9: 'As frutas guardam as sementes da planta. A cenoura é uma raiz e a alface são folhas.',
        10: 'O golfinho nada com as nadadeiras, e o pelo grosso deixa a raposa quentinha na floresta.',
        11: 'A baleia nada mexendo a grande cauda, e o ouriço vira uma bolinha de espinhos.',
        13: 'O trator também fica na fazenda, mas é um veículo, não um animal.'
      },
      l2: ['O carro não é um animal. É um veículo!', 'A bola não é uma fruta. É um brinquedo!', 'O coelho não é um veículo. É um animal!', 'A maçã não é roupa. É comida!', 'O trator também é vermelho, mas é um veículo, não uma fruta!', 'A bola também é redonda, mas é um brinquedo, não uma fruta!', 'A banana é amarela como o pato, mas é comida, não um animal!', 'A pipa voa como a coruja, mas é um brinquedo, não um animal!', 'A banana não é legume nem verdura. É uma fruta!'],
      l3: ['O ganso e o cisne voam e nadam!', 'O pelicano e a gaivota voam e nadam!', 'O morango e a maçã são frutas vermelhas!', 'A vaca e a ovelha são animais da fazenda!', 'O avião e o helicóptero são veículos que voam!', 'O casaco e a luva são roupas de inverno!', 'A laranja e a maçã são comidas redondas!', 'O elefante e a baleia são animais grandes!']
    },
    fr: {
      line: '{k} !', remembers: 'Mim se souvient !',
      kinds: { animal: 'les animaux avec les animaux', food: 'la nourriture avec la nourriture', vehicle: 'les véhicules avec les véhicules', toy: 'les jouets avec les jouets', clothing: 'les vêtements avec les vêtements', shape: 'les formes avec les formes', fruit: 'les fruits avec les fruits', vegetable: 'les légumes avec les légumes', ocean: 'les animaux de la mer avec les animaux de la mer', forest: 'les animaux de la forêt avec les animaux de la forêt', farm: 'les animaux de la ferme avec les animaux de la ferme' },
      extra: {
        2: 'Le rouge n’est qu’une couleur : la pomme se mange, et le tracteur est un véhicule.',
        3: 'Le poisson, le canard et la tortue ne se ressemblent pas du tout, mais ce sont tous des animaux.',
        4: 'Rond, ce n’est qu’une forme : le ballon est un jouet, et l’orange se mange.',
        7: 'Le jaune n’est qu’une couleur : la banane se mange, le canard est un animal, et le chapeau est un vêtement.',
        9: 'Les fruits portent les graines de la plante. La carotte est une racine, et la laitue, ce sont des feuilles.',
        10: 'Le dauphin nage avec ses nageoires, et le renard a une fourrure épaisse qui le garde au chaud dans la forêt.',
        11: 'La baleine nage en remuant sa grande queue, et le hérisson se roule en boule dans ses piquants.',
        13: 'Le tracteur est aussi à la ferme, mais c’est un véhicule, pas un animal.'
      },
      l2: ['La voiture n’est pas un animal. C’est un véhicule !', 'Le ballon n’est pas un fruit. C’est un jouet !', 'Le lapin n’est pas un véhicule. C’est un animal !', 'La pomme n’est pas un vêtement. Elle se mange !', 'Le tracteur est rouge lui aussi, mais c’est un véhicule, pas un fruit !', 'Le ballon est rond lui aussi, mais c’est un jouet, pas un fruit !', 'La banane est jaune comme le canard, mais elle se mange : ce n’est pas un animal !', 'Le cerf-volant vole comme le hibou, mais c’est un jouet, pas un animal !', 'La banane n’est pas un légume. C’est un fruit !'],
      l3: ['L’oie et le cygne volent et nagent !', 'Le pélican et la mouette volent et nagent !', 'La fraise et la pomme sont des fruits rouges !', 'La vache et le mouton sont des animaux de la ferme !', 'L’avion et l’hélicoptère sont des véhicules qui volent !', 'Le manteau et la moufle sont des vêtements d’hiver !', 'L’orange et la pomme sont rondes et se mangent !', 'L’éléphant et la baleine sont de gros animaux !']
    },
    fi: {
      line: '{k}!', remembers: 'Mim muistaa!',
      kinds: { animal: 'eläimet eläinten kanssa', food: 'ruoat ruokien kanssa', vehicle: 'kulkuneuvot kulkuneuvojen kanssa', toy: 'lelut lelujen kanssa', clothing: 'vaatteet vaatteiden kanssa', shape: 'muodot muotojen kanssa', fruit: 'hedelmät hedelmien kanssa', vegetable: 'kasvikset kasvisten kanssa', ocean: 'meren eläimet meren eläinten kanssa', forest: 'metsän eläimet metsän eläinten kanssa', farm: 'maatilan eläimet maatilan eläinten kanssa' },
      extra: {
        2: 'Punainen on vain väri: omena on ruokaa, ja traktori on kulkuneuvo.',
        3: 'Kala, ankka ja kilpikonna näyttävät aivan erilaisilta, mutta kaikki ovat eläimiä.',
        4: 'Pyöreä on vain muoto: pallo on lelu, ja appelsiini on ruokaa.',
        7: 'Keltainen on vain väri: banaani on ruokaa, ankka on eläin, ja hattu on vaate.',
        9: 'Hedelmissä on kasvin siemenet. Porkkana on juuri, ja salaatti on lehtiä.',
        10: 'Delfiini ui evillään, ja paksu turkki pitää ketun lämpimänä metsässä.',
        11: 'Valas ui isolla pyrstöllään, ja siili käpertyy piikkipalloksi.',
        13: 'Traktorikin on maatilalla, mutta se on kulkuneuvo eikä eläin.'
      },
      l2: ['Auto ei ole eläin. Se on kulkuneuvo!', 'Pallo ei ole hedelmä. Se on lelu!', 'Kani ei ole kulkuneuvo. Se on eläin!', 'Omena ei ole vaate. Se on ruokaa!', 'Traktorikin on punainen, mutta se on kulkuneuvo eikä hedelmä!', 'Pallokin on pyöreä, mutta se on lelu eikä hedelmä!', 'Banaani on keltainen kuin ankka, mutta se on ruokaa eikä eläin!', 'Leija lentää niin kuin pöllö, mutta se on lelu eikä eläin!', 'Banaani ei ole kasvis. Se on hedelmä!'],
      l3: ['Hanhi ja joutsen lentävät ja uivat!', 'Pelikaani ja lokki lentävät ja uivat!', 'Mansikka ja omena ovat punaisia hedelmiä!', 'Lehmä ja lammas ovat maatilan eläimiä!', 'Lentokone ja helikopteri ovat lentäviä kulkuneuvoja!', 'Takki ja kinnas ovat talvivaatteita!', 'Appelsiini ja omena ovat pyöreää ruokaa!', 'Norsu ja valas ovat suuria eläimiä!']
    }
  };

  function locale(l) { l = String(l || 'en').slice(0, 2); return WORDS[l] ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(v) >= 0 ? v : 'l1'; }
  function basketsOf(v) { return BASKETS.indexOf(v) >= 0 ? v : 'any'; }
  function rainOf(v) { return RAINS.indexOf(v) >= 0 ? v : 'live'; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function hasTrait(key, t) { return (TRAITS[key] || []).indexOf(t) >= 0; }

  /* the rounds a pool holds: with "two baskets" Level 1 keeps its two-kind rounds; the other levels are unchanged */
  function ids(level, baskets) {
    level = levelOf(level);
    var src = level === 'l1' ? L1 : level === 'l2' ? L2 : L3, out = [];
    for (var i = 0; i < src.length; i++) if (!(level === 'l1' && basketsOf(baskets) === 'two' && src[i].length !== 2)) out.push(i);
    return out;
  }
  function opener(level, baskets) { level = levelOf(level); var k = level + '.' + (level === 'l1' ? basketsOf(baskets) : 'any'); return OPENER[k]; }

  /* one round: things {key, kind, want}; kinds in order; cousins by kind; nb = number of baskets.
     want = the basket a thing must end in where baskets have identity (l2: 0 big, 1 little; l3: 0 A only, 1 both, 2 B only); l1 = null */
  function round(level, idx) {
    level = levelOf(level);
    var r = { id: level + '.' + idx, level: level, idx: idx, things: [], kinds: [], cousin: {} };
    if (level === 'l1') {
      L1[idx].forEach(function (g) { r.kinds.push(g[0]); r.cousin[g[0]] = g[2]; g[1].forEach(function (k) { r.things.push({ key: k, kind: g[0], want: null }); }); });
      r.nb = r.kinds.length;
    } else if (level === 'l2') {
      var big = L2[idx][0], st = L2[idx][1];
      r.kinds = [big[0], st[0]]; r.cousin[big[0]] = big[2]; r.cousin[st[0]] = st[2];
      big[1].forEach(function (k) { r.things.push({ key: k, kind: big[0], want: 0 }); });
      r.things.push({ key: st[1], kind: st[0], want: 1 });
      r.stray = r.things.length - 1; r.nb = 2;
    } else {
      var x = L3[idx];
      r.rule = [{ trait: x[0][0], pics: x[0][1].slice() }, { trait: x[1][0], pics: x[1][1].slice() }];
      x[2].forEach(function (place, p) { place.forEach(function (k) { r.things.push({ key: k, kind: 'p' + p, want: placeFor(k, x[0][0], x[1][0]) }); }); });
      r.kinds = ['p0', 'p1', 'p2']; r.nb = 3;
    }
    return r;
  }
  /* L3: the place a thing's own traits decide (A only → 0, both → 1, B only → 2, neither → -1) */
  function placeFor(key, a, b) { var A = hasTrait(key, a), B = hasTrait(key, b); return A && B ? 1 : A ? 0 : B ? 2 : -1; }

  /* the grass: rows of up to four; a deal never puts two things of one kind side by side in a row
     (the little-basket level is exempt — three of one kind in a row of four cannot be kept apart; there the stray's spot is uniform) */
  function rowsFor(n) { return n <= 4 ? [n] : n === 5 ? [3, 2] : n === 6 ? [3, 3] : n === 7 ? [4, 3] : [4, 4]; }
  function adjacentSame(r, order) {
    var rows = rowsFor(order.length), at = 0;
    for (var q = 0; q < rows.length; q++) { for (var c = 1; c < rows[q]; c++) if (r.things[order[at + c]].kind === r.things[order[at + c - 1]].kind) return true; at += rows[q]; }
    return false;
  }
  function deal(r, rnd) {
    var n = r.things.length, base = [];
    for (var i = 0; i < n; i++) base.push(i);
    if (r.level === 'l2') return shuffle(base, rnd);
    for (var t = 0; t < 4000; t++) { var o = shuffle(base.slice(), rnd); if (!adjacentSame(r, o)) return o; }
    return null;   /* the gate proves every round can be dealt */
  }
  /* order of one pass: the opener first, the rest shuffled, never the same as the pass before */
  function plan(level, baskets, rnd, prev) {
    var all = ids(level, baskets), first = opener(level, baskets), rest = all.filter(function (i) { return i !== first; });
    for (var t = 0; t < 2000; t++) { var o = [first].concat(shuffle(rest.slice(), rnd)); if (prev && prev.length > 2 && prev.join() === o.join()) continue; return o; }
    return [first].concat(shuffle(rest.slice(), rnd));
  }

  function newState(r, rain, rnd) {
    var n = r.things.length, place = [];
    for (var i = 0; i < n; i++) place.push(null);
    return { r: r, rain: r.level === 'l3' ? 'check' : rainOf(rain), place: place, meadow: deal(r, rnd || Math.random), sel: null, misses: 0, tries: 0, help: 0, last: null, done: false };
  }
  function clear(st) { st.last = null; st.help = 0; }

  /* the hand */
  function select(st, i) { if (st.done || i < 0 || i >= st.r.things.length) return false; st.sel = st.sel === i ? null : i; return true; }
  function placeAt(st, i, b) {
    if (st.done || i < 0 || i >= st.r.things.length) return false;
    if (b !== null && (b < 0 || b >= st.r.nb)) return false;
    st.place[i] = b; st.sel = null; clear(st); return true;
  }
  function inBasket(st, b) { var out = []; for (var i = 0; i < st.place.length; i++) if (st.place[i] === b) out.push(i); return out; }
  function onMeadow(st) { return inBasket(st, null); }
  function kindsIn(st, b) { var ks = []; inBasket(st, b).forEach(function (i) { var k = st.r.things[i].kind; if (ks.indexOf(k) < 0) ks.push(k); }); return ks; }
  function pureKind(st, b) { var t = inBasket(st, b), ks = kindsIn(st, b); return t.length >= 2 && ks.length === 1 ? ks[0] : null; }

  /* the live rain: a pure basket's cloud rains one cousin of its kind (once per kind — a second pure basket of the same kind stays dry);
     rain set to "only at Check" (and the Two-clouds level) never rains live */
  function cousins(st) {
    var out = {}, used = {};
    if (st.r.level === 'l3') return out;
    if (st.rain !== 'live' && !st.done) return out;
    for (var b = 0; b < st.r.nb; b++) {
      var k = pureKind(st, b);
      if (st.done && !k) { var ks = kindsIn(st, b); if (ks.length === 1) k = ks[0]; }   /* at success every family gets its cousin, the little basket's too */
      if (k && !used[k]) { used[k] = 1; out[b] = st.r.cousin[k]; }
    }
    return out;
  }

  function miss(st, reason, extra) { st.misses++; st.tries++; st.help = Math.min(2, st.tries); st.last = { reason: reason }; if (extra) for (var k in extra) st.last[k] = extra[k]; return { ok: false, reason: reason }; }
  function mixedBaskets(st) { var out = []; for (var b = 0; b < st.r.nb; b++) if (kindsIn(st, b).length > 1) out.push(b); return out; }
  function check(st) {
    if (st.done) return { ok: true };
    st.sel = null;
    if (onMeadow(st).length) { st.last = { reason: 'meadow' }; st.help = 0; return { ok: false, reason: 'meadow' }; }   /* not a miss */
    var r = st.r;
    if (r.level === 'l3') {
      var wrong = []; r.things.forEach(function (t, i) { if (st.place[i] !== t.want) wrong.push(i); });
      if (wrong.length) return miss(st, 'traits', { wrong: wrong });
    } else {
      var mixed = mixedBaskets(st);
      if (mixed.length) return miss(st, 'mixed', { baskets: mixed });
      if (r.level === 'l2' && st.place[r.stray] !== 1) return miss(st, 'swapped');
    }
    st.done = true; st.last = null; st.help = 0;
    return { ok: true };
  }
  function hint(st) {
    if (st.done || !st.last) return null;
    var R = st.last.reason;
    if (R === 'meadow') return 'hMeadow';
    if (R === 'traits') return st.help >= 2 ? 'hMiss2L3' : 'hTraits';
    if (st.help >= 2) return 'hMiss2';
    return R === 'swapped' ? 'hSwapped' : 'hMixed';
  }
  /* miss 1, l1/l2: a mixed basket's cloud splits — one family per kind, each with its own cousin, landing on its relatives */
  function split(st) {
    var out = {};
    if (!st.last || st.last.reason !== 'mixed') return out;
    st.last.baskets.forEach(function (b) {
      out[b] = kindsIn(st, b).map(function (k) { return { kind: k, things: inBasket(st, b).filter(function (i) { return st.r.things[i].kind === k; }), cousin: st.r.cousin[k] }; });
    });
    return out;
  }
  /* miss 1, l3: the drops each thing catches — the traits it really has */
  function badges(st) {
    if (!st.last || st.last.reason !== 'traits') return null;
    var r = st.r; return r.things.map(function (t) { return { a: hasTrait(t.key, r.rule[0].trait), b: hasTrait(t.key, r.rule[1].trait) }; });
  }
  /* miss 2: which things are misplaced and the basket their family is in (a dotted thread joins them) */
  function threads(st) {
    if (st.help < 2 || !st.last || st.done) return [];
    var r = st.r, out = [];
    if (r.level !== 'l1') {
      r.things.forEach(function (t, i) { if (st.place[i] !== t.want && (r.level === 'l3' || st.last.reason === 'swapped' || mixedBaskets(st).indexOf(st.place[i]) >= 0)) out.push({ thing: i, to: t.want }); });
      return out;
    }
    if (st.last.reason !== 'mixed') return out;
    mixedBaskets(st).forEach(function (b) {
      var ks = kindsIn(st, b), moved = false;
      ks.forEach(function (k) {   /* a kind whose family already sits alone in another basket goes there */
        for (var c = 0; c < r.nb; c++) if (c !== b && inBasket(st, c).length && kindsIn(st, c).length === 1 && kindsIn(st, c)[0] === k) {
          inBasket(st, b).forEach(function (i) { if (r.things[i].kind === k) out.push({ thing: i, to: c }); }); moved = true; return;
        }
      });
      if (moved) return;
      /* otherwise the kind with fewer things here (the later one on a tie) goes to an empty basket, or the basket with the fewest things */
      var counts = ks.map(function (k) { return inBasket(st, b).filter(function (i) { return r.things[i].kind === k; }).length; });
      var pick = 0; for (var q = 1; q < ks.length; q++) if (counts[q] <= counts[pick]) pick = q;
      var to = -1, few = 1e9; for (var c2 = 0; c2 < r.nb; c2++) { if (c2 === b) continue; var n2 = inBasket(st, c2).length; if (n2 < few) { few = n2; to = c2; } }
      inBasket(st, b).forEach(function (i) { if (r.things[i].kind === ks[pick]) out.push({ thing: i, to: to }); });
    });
    return out;
  }

  /* the success sentence — literal per locale: the round's kinds (l1) + its teaching sentence, or the round's own line (l2, l3) */
  function success(loc, st) {
    var W = WORDS[locale(loc)], r = st.r;
    if (r.level === 'l2') return W.l2[r.idx];
    if (r.level === 'l3') return W.l3[r.idx];
    var k = r.kinds.map(function (x) { return W.kinds[x]; }).join(', ');
    k = k.charAt(0).toLocaleUpperCase(locale(loc)) + k.slice(1);
    return W.line.replace('{k}', k) + ' ' + (W.extra[r.idx] || W.remembers);
  }

  /* sizes per width: every library picture at the floor (96 at a desktop card, 64 on a phone) */
  function layout(W) {
    var wide = W >= 560, tiny = W < 300;
    return { mode: wide ? 'wide' : 'narrow', tiny: tiny, W: W, pic: wide ? 96 : 64, cloud: wide ? 96 : 64, mim: wide ? 110 : 64, perRow: wide ? 4 : 2 };
  }

  return {
    DATA: { PIC: PIC, MIM: MIM, LABEL: LABEL, TRAITS: TRAITS, L1: L1, L2: L2, L3: L3, WORDS: WORDS, OPENER: OPENER },
    LOCALES: LOCALES, LEVELS: LEVELS, BASKETS: BASKETS, RAINS: RAINS,
    locale: locale, levelOf: levelOf, basketsOf: basketsOf, rainOf: rainOf, shuffle: shuffle, hasTrait: hasTrait, placeFor: placeFor,
    ids: ids, opener: opener, round: round, rowsFor: rowsFor, adjacentSame: adjacentSame, deal: deal, plan: plan, newState: newState,
    select: select, placeAt: placeAt, inBasket: inBasket, onMeadow: onMeadow, kindsIn: kindsIn, pureKind: pureKind, cousins: cousins,
    mixedBaskets: mixedBaskets, check: check, hint: hint, split: split, badges: badges, threads: threads, success: success, layout: layout
  };
}));
