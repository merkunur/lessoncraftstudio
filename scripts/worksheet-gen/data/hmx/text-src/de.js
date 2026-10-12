/**
 * data/hmx/text-src/de.js — German words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: 'Nominativ mit Artikel|Dativ mit Artikel' (written out; weak nouns carry their own dative). Every other form
 * (zum / zur / zu den, vom, beim, Akkusativ) is read off these two by the article alone.
 * Templates follow the published German face strings (i18n/strings.de.json K-405 … G2-393).
 */
'use strict';
const NOUNS = {
  'lamb': 'das Lamm|dem Lamm', 'haystack': 'der Heuhaufen|dem Heuhaufen', 'pig': 'das Schwein|dem Schwein', 'mud puddle': 'die Matschpfütze|der Matschpfütze',
  'ox': 'der Ochse|dem Ochsen', 'apple basket': 'der Apfelkorb|dem Apfelkorb', 'snail': 'die Schnecke|der Schnecke', 'strawberry': 'die Erdbeere|der Erdbeere',
  'boy on the bike': 'der Junge auf dem Rad|dem Jungen auf dem Rad', 'slide': 'die Rutsche|der Rutsche', 'duck': 'die Ente|der Ente', 'bread': 'das Brot|dem Brot',
  'squirrel': 'das Eichhörnchen|dem Eichhörnchen', 'pine cone': 'der Tannenzapfen|dem Tannenzapfen', 'mouse': 'die Maus|der Maus', 'pumpkin': 'der Kürbis|dem Kürbis',
  'sloth': 'das Faultier|dem Faultier', 'tree': 'der Baum|dem Baum', 'zebra': 'das Zebra|dem Zebra', 'elephant': 'der Elefant|dem Elefanten',
  'camel': 'das Kamel|dem Kamel', 'palm tree': 'die Palme|der Palme', 'sea turtle': 'die Meeresschildkröte|der Meeresschildkröte', 'sea': 'das Meer|dem Meer',
  'girl on the sled': 'das Mädchen auf dem Schlitten|dem Mädchen auf dem Schlitten', 'cabin': 'die Hütte|der Hütte', 'seal': 'die Robbe|der Robbe', 'hole in the ice': 'das Eisloch|dem Eisloch',
  'hiker': 'die Wanderin|der Wanderin', 'tent': 'das Zelt|dem Zelt', 'owl': 'die Eule|der Eule', 'oak tree': 'die Eiche|der Eiche',
  'mail carrier': 'der Briefträger|dem Briefträger', 'mailbox': 'der Briefkasten|dem Briefkasten', 'bunny': 'der Hase|dem Hasen', 'Easter basket': 'das Osternest|dem Osternest',
  'firefighter': 'der Feuerwehrmann|dem Feuerwehrmann', 'fire truck': 'das Feuerwehrauto|dem Feuerwehrauto', 'seagull': 'die Möwe|der Möwe', 'fish': 'der Fisch|dem Fisch',
  'raccoon': 'der Waschbär|dem Waschbären', 'cooler': 'die Kühlbox|der Kühlbox', 'triceratops': 'der Triceratops|dem Triceratops', 'big tree': 'der große Baum|dem großen Baum',
  'farmer': 'der Bauer|dem Bauern', 'tractor': 'der Traktor|dem Traktor', 'astronaut': 'der Astronaut|dem Astronauten', 'rocket': 'die Rakete|der Rakete',
  'pufferfish': 'der Kugelfisch|dem Kugelfisch', 'shell': 'die Muschel|der Muschel', 'robot': 'der Roboter|dem Roboter', 'ice cream': 'das Eis|dem Eis',
  'donkey': 'der Esel|dem Esel', 'carrot': 'die Karotte|der Karotte', 'beaver': 'der Biber|dem Biber', 'log': 'der Baumstamm|dem Baumstamm',
  'turkey': 'der Truthahn|dem Truthahn', 'corn': 'der Maiskolben|dem Maiskolben', 'skier': 'die Skifahrerin|der Skifahrerin', 'snowman': 'der Schneemann|dem Schneemann',
  'swan': 'der Schwan|dem Schwan', 'nest': 'das Nest|dem Nest', 'macaw': 'der Papagei|dem Papagei', 'banana': 'die Banane|der Banane',
  'fox': 'der Fuchs|dem Fuchs', 'lantern': 'die Laterne|der Laterne', 'hamster': 'der Hamster|dem Hamster', 'apple': 'der Apfel|dem Apfel',
  'kitten': 'das Kätzchen|dem Kätzchen', 'milk': 'die Milch|der Milch', 'crab': 'die Krabbe|der Krabbe', 'beach ball': 'der Wasserball|dem Wasserball',
  'ladybug': 'der Marienkäfer|dem Marienkäfer', 'sunflower': 'die Sonnenblume|der Sonnenblume', 'penguin': 'der Pinguin|dem Pinguin', 'igloo': 'das Iglu|dem Iglu',
  'turtle': 'die Schildkröte|der Schildkröte', 'flower': 'die Blume|der Blume', 'girl': 'das Mädchen|dem Mädchen', 'swing': 'die Schaukel|der Schaukel',
  'chick': 'das Küken|dem Küken', 'egg': 'das Ei|dem Ei', 'horse': 'das Pferd|dem Pferd', 'hen': 'das Huhn|dem Huhn',
  'toy dinosaur': 'der Spielzeug-Dino|dem Spielzeug-Dino', 'cake': 'der Kuchen|dem Kuchen', 'bird': 'der Vogel|dem Vogel', 'birdhouse': 'das Vogelhaus|dem Vogelhaus',
  'monkey': 'der Affe|dem Affen', 'rabbit': 'das Kaninchen|dem Kaninchen', 'cabbage': 'der Kohl|dem Kohl', 'seahorse': 'das Seepferdchen|dem Seepferdchen',
  'seaweed': 'der Seetang|dem Seetang', 'badger': 'der Dachs|dem Dachs', 'chestnut tree': 'der Kastanienbaum|dem Kastanienbaum', 'Santa': 'der Weihnachtsmann|dem Weihnachtsmann',
  'sleigh': 'der Schlitten|dem Schlitten', 'llama': 'das Lama|dem Lama', 'rhino': 'das Nashorn|dem Nashorn', 'hippo': 'das Nilpferd|dem Nilpferd',
  'tortoise': 'die Schildkröte|der Schildkröte', 'watermelon': 'die Wassermelone|der Wassermelone', 'dinosaur': 'der Dinosaurier|dem Dinosaurier', 'bear': 'der Bär|dem Bären',
  'honey': 'der Honig|dem Honig', 'pelican': 'der Pelikan|dem Pelikan', 'boat': 'das Boot|dem Boot', 'garbage truck': 'das Müllauto|dem Müllauto',
  'trash can': 'die Mülltonne|der Mülltonne', 'canoe': 'das Kanu|dem Kanu', 'kayak': 'das Kajak|dem Kajak', 'ship': 'das Schiff|dem Schiff',
  'lighthouse': 'der Leuchtturm|dem Leuchtturm', 'sailboat': 'das Segelboot|dem Segelboot', 'island': 'die Insel|der Insel', 'beach hut': 'die Strandhütte|der Strandhütte',
  'frog': 'der Frosch|dem Frosch', 'puffin': 'der Papageitaucher|dem Papageitaucher', 'lifeguard tower': 'der Rettungsturm|dem Rettungsturm', 'house': 'das Haus|dem Haus',
  'goose': 'die Gans|der Gans', 'cheese': 'der Käse|dem Käse', 'earthworm': 'der Regenwurm|dem Regenwurm', 'leaf': 'das Blatt|dem Blatt',
  'gopher': 'die Taschenratte|der Taschenratte', 'potato': 'die Kartoffel|der Kartoffel', 'gerbil': 'die Rennmaus|der Rennmaus', 'blueberry': 'die Heidelbeere|der Heidelbeere',
  'meerkat': 'das Erdmännchen|dem Erdmännchen', 'ferret': 'das Frettchen|dem Frettchen', 'ball': 'der Ball|dem Ball', 'chipmunk': 'das Streifenhörnchen|dem Streifenhörnchen',
  'acorn': 'die Eichel|der Eichel', 'ambulance': 'der Krankenwagen|dem Krankenwagen', 'doctor': 'der Arzt|dem Arzt', 'bus': 'der Bus|dem Bus', 'boy': 'der Junge|dem Jungen',
  'jeep': 'der Geländewagen|dem Geländewagen', 'surfboard': 'das Surfbrett|dem Surfbrett', 'motorcycle': 'das Motorrad|dem Motorrad', 'garage': 'die Garage|der Garage',
  'van': 'der Lieferwagen|dem Lieferwagen', 'package': 'das Paket|dem Paket', 'cement mixer': 'der Betonmischer|dem Betonmischer', 'builder': 'der Bauarbeiter|dem Bauarbeiter',
  'truck': 'der Lastwagen|dem Lastwagen', 'forklift': 'der Gabelstapler|dem Gabelstapler', 'race car': 'der Rennwagen|dem Rennwagen', 'mechanic': 'der Mechaniker|dem Mechaniker',
  'bee': 'die Biene|der Biene', 'little girl': 'das kleine Mädchen|dem kleinen Mädchen', 'basket': 'der Korb|dem Korb', 'foal': 'das Fohlen|dem Fohlen', 'porcupine': 'das Stachelschwein|dem Stachelschwein',
  'apple tree': 'der Apfelbaum|dem Apfelbaum', 'hummingbird': 'der Kolibri|dem Kolibri', 'cherry tree': 'der Kirschbaum|dem Kirschbaum', 'guinea pig': 'das Meerschweinchen|dem Meerschweinchen',
  'bowl': 'die Schüssel|der Schüssel', 'moon': 'der Mond|dem Mond', 'lemur': 'der Lemur|dem Lemuren', 'elf': 'der Wichtel|dem Wichtel', 'sack': 'der Sack|dem Sack',
  'sandcastle': 'die Sandburg|der Sandburg', 'duckling': 'das Entenküken|dem Entenküken', 'puddle': 'die Pfütze|der Pfütze', 'coral': 'die Koralle|der Koralle',
  'planet': 'der Planet|dem Planeten', 'snowboarder': 'der Snowboarder|dem Snowboarder', 'hot cocoa': 'der Kakao|dem Kakao', 'butterfly': 'der Schmetterling|dem Schmetterling',
  'rose': 'die Rose|der Rose', 'water lily': 'die Seerose|der Seerose', 'radish': 'das Radieschen|dem Radieschen', 'toy car': 'das Spielzeugauto|dem Spielzeugauto',
  'little dinosaur': 'der kleine Dino|dem kleinen Dino', 'ant': 'die Ameise|der Ameise', 'cookie': 'der Keks|dem Keks', 'gazelle': 'die Gazelle|der Gazelle',
  'baobab tree': 'der Affenbrotbaum|dem Affenbrotbaum', 'caterpillar': 'die Raupe|der Raupe', 'toad': 'die Kröte|der Kröte', 'dragonfly': 'die Libelle|der Libelle', 'Earth': 'die Erde|der Erde',
  'teddy bear': 'der Teddy|dem Teddy', 'cupcake': 'der Muffin|dem Muffin', 'airplane': 'das Flugzeug|dem Flugzeug', 'rainbow': 'der Regenbogen|dem Regenbogen',
  'helicopter': 'der Hubschrauber|dem Hubschrauber', 'mountain': 'der Berg|dem Berg', 'submarine': 'das U-Boot|dem U-Boot', 'whale': 'der Wal|dem Wal',
  'toy train': 'die Spielzeugeisenbahn|der Spielzeugeisenbahn', 'camper': 'das Wohnmobil|dem Wohnmobil', 'bike': 'das Fahrrad|dem Fahrrad', 'playground': 'der Spielplatz|dem Spielplatz',
  'dragon': 'der Drache|dem Drachen', 'campfire': 'das Lagerfeuer|dem Lagerfeuer', 'flying horse': 'das fliegende Pferd|dem fliegenden Pferd', 'sun': 'die Sonne|der Sonne',
  'oyster': 'die Auster|der Auster', 'monster truck': 'der Monstertruck|dem Monstertruck', 'big rock': 'der große Felsen|dem großen Felsen', 'octopus': 'der Krake|dem Kraken',
  'flamingo': 'der Flamingo|dem Flamingo', 'stork': 'der Storch|dem Storch', 'parrot': 'der Papagei|dem Papagei', 'grapes': 'die Weintrauben|den Weintrauben',
  'koala': 'der Koala|dem Koala', 'kangaroo': 'das Känguru|dem Känguru', 'bull': 'der Stier|dem Stier', 'turnip': 'die Rübe|der Rübe', 'cow': 'die Kuh|der Kuh',
  'clover': 'der Klee|dem Klee', 'deer': 'das Reh|dem Reh', 'bluebells': 'die Glockenblumen|den Glockenblumen', 'dog': 'der Hund|dem Hund', 'digger': 'der Bagger|dem Bagger',
  'rock': 'der Felsen|dem Felsen', 'scooter': 'der Motorroller|dem Motorroller', 'jet': 'der Düsenjet|dem Düsenjet', 'cloud': 'die Wolke|der Wolke', 'eagle': 'der Adler|dem Adler',
  'manatee': 'die Seekuh|der Seekuh', 'pineapple': 'die Ananas|der Ananas', 'Christmas tree': 'der Weihnachtsbaum|dem Weihnachtsbaum', 'toy helicopter': 'der Spielzeughubschrauber|dem Spielzeughubschrauber',
  'blocks': 'die Bauklötze|den Bauklötzen', 'bison': 'der Bison|dem Bison', 'wheat': 'der Weizen|dem Weizen', 'sheep': 'das Schaf|dem Schaf', 'grass': 'das Gras|dem Gras',
  'moose': 'der Elch|dem Elch', 'birch tree': 'die Birke|der Birke', 'leopard': 'der Leopard|dem Leoparden', 'alligator': 'der Alligator|dem Alligator', 'goat': 'die Ziege|der Ziege',
  'lettuce': 'der Salat|dem Salat', 'tall tree': 'der hohe Baum|dem hohen Baum', 'peacock': 'der Pfau|dem Pfau', 'hat': 'der Hut|dem Hut', 'doll': 'die Puppe|der Puppe',
  'pudding': 'der Pudding|dem Pudding', 'reindeer': 'das Rentier|dem Rentier', 'bell': 'die Glocke|der Glocke', 'chinchilla': 'das Chinchilla|dem Chinchilla',
  'raspberry': 'die Himbeere|der Himbeere', 'squid': 'der Tintenfisch|dem Tintenfisch', 'cat': 'die Katze|der Katze', 'walnut tree': 'der Walnussbaum|dem Walnussbaum',
  'bulldozer': 'die Planierraupe|der Planierraupe', 'sand pile': 'der Sandhaufen|dem Sandhaufen', 'toy truck': 'der Spielzeuglaster|dem Spielzeuglaster', 'ferry': 'die Fähre|der Fähre',
  'train': 'der Zug|dem Zug', 'backpack': 'der Rucksack|dem Rucksack', 'banana tree': 'die Bananenstaude|der Bananenstaude', 'orange tree': 'der Orangenbaum|dem Orangenbaum',
  'cherry blossom': 'die Kirschblüte|der Kirschblüte', 'tiger': 'der Tiger|dem Tiger', 'toucan': 'der Tukan|dem Tukan', 'panda': 'der Panda|dem Panda',
  'barn': 'die Scheune|der Scheune', 'hay': 'das Heu|dem Heu', 'mushroom': 'der Pilz|dem Pilz', 'pyramid': 'die Pyramide|der Pyramide', 'umbrella': 'der Regenschirm|dem Regenschirm',
  'starfish': 'der Seestern|dem Seestern', 'vegetables': 'das Gemüse|dem Gemüse', 'hedgehog': 'der Igel|dem Igel',
};

// per scene: the words a face's rule needs
const COLLECT = { // [alle …, jede … (Akk.), jeder … (Dat.), fehlt-Satz]
  'hmx-collect-acorns': ['alle Eicheln', 'jede Eichel', 'jeder Eichel', 'Eine Eichel fehlt.'],
  'hmx-collect-flowers': ['alle Sonnenblumen', 'jede Sonnenblume', 'jeder Sonnenblume', 'Eine Sonnenblume fehlt.'],
  'hmx-collect-corn': ['alle Maiskolben', 'jeden Maiskolben', 'jedem Maiskolben', 'Ein Maiskolben fehlt.'],
  'hmx-collect-fish': ['alle Fische', 'jeden Fisch', 'jedem Fisch', 'Ein Fisch fehlt.'],
  'hmx-collect-shells': ['alle Muscheln', 'jede Muschel', 'jeder Muschel', 'Eine Muschel fehlt.'],
  'hmx-collect-strawberries': ['alle Erdbeeren', 'jede Erdbeere', 'jeder Erdbeere', 'Eine Erdbeere fehlt.'],
  'hmx-collect-stars': ['alle Sterne', 'jeden Stern', 'jedem Stern', 'Ein Stern fehlt.'],
  'hmx-collect-bananas': ['alle Bananen', 'jede Banane', 'jeder Banane', 'Eine Banane fehlt.'],
  'hmx-collect-presents': ['alle Geschenke', 'jedes Geschenk', 'jedem Geschenk', 'Ein Geschenk fehlt.'],
  'hmx-collect-eggs': ['alle Ostereier', 'jedes Osterei', 'jedem Osterei', 'Ein Osterei fehlt.'],
  'hmx-collect-apples': ['alle Äpfel', 'jeden Apfel', 'jedem Apfel', 'Ein Apfel fehlt.'],
  'hmx-collect-hibiscus': ['alle Blüten', 'jede Blüte', 'jeder Blüte', 'Eine Blüte fehlt.'],
};
const AVOID = { // [Titelwort (Dat. Pl./Sg. nach „Weiche … aus"), „ein A oder ein B" (Nom.), „einem A oder einem B" (Dat.)]
  'hmx-avoid-duckling': ['dem Fuchs', 'ein Fuchs oder eine Schlange', 'einem Fuchs oder einer Schlange'],
  'hmx-avoid-fish': ['dem Hai', 'ein Hai oder eine Qualle', 'einem Hai oder einer Qualle'],
  'hmx-avoid-rocket': ['den Asteroiden', 'ein Asteroid oder ein Meteor', 'einem Asteroiden oder einem Meteor'],
  'hmx-avoid-snowboard': ['den Felsen', 'ein Felsen oder ein Baum', 'einem Felsen oder einem Baum'],
  'hmx-avoid-butterfly': ['der Spinne', 'eine Spinne oder eine Wespe', 'einer Spinne oder einer Wespe'],
  'hmx-avoid-frog': ['dem Reiher', 'ein Reiher oder ein Alligator', 'einem Reiher oder einem Alligator'],
  'hmx-avoid-rabbit': ['dem Habicht', 'ein Habicht oder ein Wolf', 'einem Habicht oder einem Wolf'],
  'hmx-avoid-toycar': ['den Pfützen', 'eine Pfütze oder ein Steinhaufen', 'einer Pfütze oder einem Steinhaufen'],
  'hmx-avoid-raptor': ['dem Tyrannosaurus', 'ein Tyrannosaurus oder ein Steinhaufen', 'einem Tyrannosaurus oder einem Steinhaufen'],
  'hmx-avoid-penguin': ['dem Orca', 'ein Orca oder ein Loch im Eis', 'einem Orca oder einem Loch im Eis'],
  'hmx-avoid-ant': ['der Spinne', 'eine Pfütze oder eine Spinne', 'einer Pfütze oder einer Spinne'],
  'hmx-avoid-gazelle': ['dem Leoparden', 'ein Leopard oder eine Hyäne', 'einem Leoparden oder einer Hyäne'],
};
const HOP = { 'hmx-hop-frog': 'auf den Seerosenblättern', 'hmx-hop-penguin': 'auf den Eisschollen', 'hmx-hop-caterpillar': 'auf den Trittsteinen', 'hmx-hop-astronaut': 'auf den Weltraumplatten', 'hmx-hop-teddy': 'auf den Bonbonplatten', 'hmx-hop-fox': 'auf den Herbstplatten' };
const HOP_ACC = { 'hmx-hop-frog': 'über die Seerosenblätter', 'hmx-hop-penguin': 'über die Eisschollen', 'hmx-hop-caterpillar': 'über die Trittsteine', 'hmx-hop-astronaut': 'über die Weltraumplatten', 'hmx-hop-teddy': 'über die Bonbonplatten', 'hmx-hop-fox': 'über die Herbstplatten' };
const COLOUR = { // [„… und male … aus" (Akk.), „das …bild"]
  'hmx-colour-pig': ['den Bauernhof', 'das Bauernhofbild'], 'hmx-colour-horse': ['die Wiese', 'das Wiesenbild'], 'hmx-colour-monkey': ['den Dschungel', 'das Dschungelbild'],
  'hmx-colour-penguin': ['das Eis', 'das Eisbild'], 'hmx-colour-hedgehog': ['die Blumenwiese', 'das Wiesenbild'], 'hmx-colour-turtle': ['den Strand', 'das Strandbild'],
  'hmx-colour-squirrel': ['den Wald', 'das Waldbild'], 'hmx-colour-camel': ['die Wüste', 'das Wüstenbild'], 'hmx-colour-frog': ['den Regentag', 'das Regenbild'],
  'hmx-colour-octopus': ['das Meer', 'das Meeresbild'], 'hmx-colour-bee': ['den Garten', 'das Gartenbild'], 'hmx-colour-dog': ['den Garten am Haus', 'das Bild mit dem Haus'],
  'hmx-colour-rocket': ['den Weltraum', 'das Weltraumbild'], 'hmx-colour-ambulance': ['die Stadt', 'das Stadtbild'], 'hmx-colour-snowman': ['das Winterbild', 'das Winterbild'],
  'hmx-colour-tractor': ['die Ernte', 'das Erntebild'],
};
const BABIES = { 'hmx-babies-meadow': 'auf der Wiese', 'hmx-babies-sunset': 'am Abend', 'hmx-babies-snow': 'im Schnee', 'hmx-babies-orchard': 'im Obstgarten', 'hmx-babies-spring': 'im Frühling', 'hmx-babies-wheat': 'im Weizenfeld' };
const STRINGS = { farm: 'auf dem Bauernhof', beach: 'am Strand', snow: 'im Schnee', savanna: 'in der Savanne', pets: 'im Park', dinos: 'bei den Dinos', forest: 'im Wald', kids: 'auf dem Spielplatz', jungle: 'im Dschungel' };
const CUE = { 'hmx-sound-leopard': 'Leopard', 'hmx-sound-tiger': 'Tiger', 'hmx-sound-toucan': 'Tukan', 'hmx-sound-tractor': 'Traktor', 'hmx-sound-panda': 'Panda', 'hmx-sound-pelican': 'Pelikan' };

function forms(key) {
  const s = NOUNS[key]; if (!s) throw new Error('de: no forms for "' + key + '"');
  const [nom, dat] = s.split('|');
  const art = nom.split(' ')[0], dart = dat.split(' ')[0], dnoun = dat.slice(dart.length + 1);
  const g = art === 'das' ? 'n' : art === 'der' ? 'm' : dart === 'den' ? 'pl' : 'f';
  const zu = g === 'f' ? 'zur ' + dnoun : g === 'pl' ? 'zu den ' + dnoun : 'zum ' + dnoun;
  const von = g === 'f' ? 'von der ' + dnoun : g === 'pl' ? 'von den ' + dnoun : 'vom ' + dnoun;
  const beim = g === 'f' ? 'bei der ' + dnoun : g === 'pl' ? 'bei den ' + dnoun : 'beim ' + dnoun;
  const acc = g === 'm' ? 'den ' + dnoun : nom;
  return { nom, Nom: nom[0].toUpperCase() + nom.slice(1), dat, zu, von, beim, acc };
}

function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Labyrinth-Rätsel: ${H.Nom} und ${G.nom}`, printTitle: `Hilf ${H.dat} ${G.zu}`, instruction: `Hilf ${H.dat}, ${G.zu} zu kommen. Zeichne eine Linie entlang des Weges.`, tap: `Beginne am grünen Kreis mit dem Pfeil. Ziehe den Weg entlang bis ${G.zu}.` };
    case 'first-maze': return { title: `Mein erstes Labyrinth: ${H.Nom} und ${G.nom}`, printTitle: `Hilf ${H.dat} ${G.zu}`, instruction: `Hilf ${H.dat}, ${G.zu} zu kommen. Zeichne eine Linie auf dem breiten Weg und bleib zwischen den Rändern.`, tap: `Beginne am grünen Kreis. Ziehe auf dem breiten Weg bis ${G.zu}.` };
    case 'big-maze': return { title: `Großes Labyrinth 1. Klasse: ${H.Nom} und ${G.nom}`, printTitle: `Hilf ${H.dat} ${G.zu}`, instruction: `Schau dir zuerst das ganze Labyrinth an. Zeichne dann den Weg ${H.von} ${G.zu}.`, tap: `Schau zuerst und ziehe dann vom grünen Kreis bis ${G.zu}. Endet ein Weg, geh zurück.` };
    case 'river': {
      const swim = en[2] === 'swim';
      return { title: `Fluss-Labyrinth: ${H.Nom} ${G.zu}`, printTitle: swim ? `Hilf ${H.dat}, ${G.zu} zu schwimmen` : en[2] === 'paddle' ? `Paddle mit ${H.dat} ${G.zu}` : hk === 'sailboat' ? `Segle mit ${H.dat} ${G.zu}` : `Fahr mit ${H.dat} ${G.zu}`,
        instruction: `${swim ? `Hilf ${H.dat}, das Wasser entlang ${G.zu} zu schwimmen` : `${en[2] === 'paddle' ? 'Paddle' : hk === 'sailboat' ? 'Segle' : 'Fahr'} mit ${H.dat} das Wasser entlang ${G.zu}`}. Zeichne eine Linie durch das Wasser.`, tap: `Beginne am grünen Kreis. Ziehe durch das Wasser bis ${G.zu}.` };
    }
    case 'burrow': return { title: `Labyrinth unter der Erde: ${H.Nom} und ${G.nom}`, printTitle: `Hilf ${H.dat} ${G.zu}`, instruction: `Hilf ${H.dat}, durch die Gänge hinunter und hinauf ${G.zu} zu kommen. Zeichne eine Linie entlang des Weges.`, tap: `Beginne am grünen Kreis. Ziehe durch die Gänge bis ${G.zu}.` };
    case 'shortest-way': return { title: `Stadt-Labyrinth: ${H.Nom} und der kürzeste Weg`, printTitle: `Der kürzeste Weg ${G.zu}`, instruction: `Viele Straßen führen ${G.zu}. Zeichne den kürzesten Weg für ${H.acc} und schreib auf, wie viele Straßenstücke es sind.`, tap: `Ziehe den kürzesten Weg vom grünen Kreis bis ${G.zu}.` };
    case 'babies-mothers': return { title: `Labyrinth: Tierkinder finden ihre Mütter ${BABIES[sk.id]}`, printTitle: 'Hilf jedem Tierkind zu seiner Mutter', instruction: 'Hilf jedem Tierkind, seine eigene Mutter zu finden. Zeichne von jedem Tierkind eine Linie zu seiner Mutter.', tap: 'Ziehe von jedem Tierkind bis zu seiner eigenen Mutter.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'Drachen' : kites === 0 ? 'Ballon' : 'Drachen oder Ballon';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      return { title: `Schnur-Rätsel ${where}: Wem gehört der ${what}?`, printTitle: `Wem gehört der ${what}?`,
        instruction: kids ? `Folge jeder Schnur von einem Kind oder Spielzeug bis zu seinem ${what}. Schreib seine Nummer in das Kästchen darüber.` : `Folge jeder Schnur von einem Tier bis zu seinem ${what}. Schreib die Nummer des Tieres in das Kästchen darüber.`,
        tap: kids ? `Ziehe jede Schnur entlang vom Kind oder Spielzeug bis zu seinem ${what}.` : `Ziehe jede Schnur entlang vom Tier bis zu seinem ${what}.` };
    }
    case 'collect': { const [all, each, eachDat, missed] = COLLECT[sk.id]; return { title: `Sammel-Labyrinth: ${H.Nom} sammelt ${all}`, printTitle: `Hilf ${H.dat}, ${all} zu sammeln`, instruction: `Hilf ${H.dat} ${G.zu} und sammle ${each} ein, ohne einen Weg zweimal zu gehen. Kreuze für ${each} einen Kreis an.`, tap: `Ziehe vom grünen Kreis bis ${G.zu}. Komm an ${eachDat} vorbei.`, missed: missed + ' Schau dir den roten Kreis an.' }; }
    case 'avoid': { const [t, nom, dat] = AVOID[sk.id]; return { title: `Labyrinth: ${H.Nom} weicht ${t} aus`, printTitle: `Bring ${H.acc} sicher ${G.zu}`, instruction: `Hilf ${H.dat} ${G.zu}. Nimm keinen Weg, auf dem ${nom} ist.`, tap: `Ziehe vom grünen Kreis bis ${G.zu}. Nimm keinen Weg mit ${dat}.` }; }
    case 'letter-hop': return { title: `Buchstaben-Hüpfspiel: ${H.Nom} ${HOP[sk.id]}`, printTitle: `Hüpf im ABC ${HOP_ACC[sk.id]}`, instruction: 'Beginne im Feld, auf das der Pfeil zeigt. Male immer den nächsten Buchstaben im Alphabet in einem Nachbarfeld aus, bis zum {LAST}.', tap: 'Beginne am grünen Kreis. Ziehe Feld für Feld zum nächsten Buchstaben im Alphabet.' };
    case 'abc-capitals': return { title: `ABC-Labyrinth: ${H.Nom} und ${G.nom}`, printTitle: `Von A bis Z mit ${H.dat} ${G.zu}`, instruction: `Hilf ${H.dat}, ${G.zu} zu kommen. Geh an jeder Gabelung zu dem Stein mit dem nächsten Buchstaben im Alphabet.`, tap: 'Beginne am grünen Kreis. Ziehe an jeder Gabelung zum nächsten Buchstaben.' };
    case 'abc-lowercase': return { title: `Labyrinth mit kleinen Buchstaben: ${H.Nom}`, printTitle: `Von a bis z mit ${H.dat} ${G.zu}`, instruction: `Hilf ${H.dat}, ${G.zu} zu kommen. Geh an jeder Gabelung zum Stein mit dem nächsten kleinen Buchstaben.`, tap: 'Beginne am grünen Kreis. Ziehe an jeder Gabelung zum nächsten kleinen Buchstaben.' };
    case 'numbers-20': return { title: `Zahlenlabyrinth bis 20: ${H.Nom} und ${G.nom}`, printTitle: `Zähl mit ${H.dat} bis ${G.zu}`, instruction: `Hilf ${H.dat}, ${G.zu} zu kommen. Geh an jeder Gabelung zur nächsten Zahl von 1 bis 20.`, tap: 'Beginne am grünen Kreis. Ziehe an jeder Gabelung zur nächsten Zahl.' };
    case 'skip-5': return { title: `Fünferschritte-Labyrinth: ${H.Nom} und ${G.nom}`, printTitle: `Zähl in Fünferschritten bis ${G.zu}`, instruction: `Hilf ${H.dat} ${G.zu}. Zähle in Fünferschritten von Stein zu Stein bis 100.`, tap: 'Beginne am grünen Kreis. Ziehe von Stein zu Stein in Fünferschritten.' };
    case 'make-10': return { title: `Rechenlabyrinth 1. Klasse: Verliebte Zahlen mit ${H.dat}`, printTitle: 'Tritt nur auf Aufgaben mit dem Ergebnis 10', instruction: `Hilf ${H.dat} ${G.zu}. Tritt nur auf die Steine, deren Ergebnis 10 ist.`, tap: 'Beginne am grünen Kreis. Ziehe nur über die Steine mit dem Ergebnis 10.' };
    case 'subtract-20': return { title: `Minus-Labyrinth bis 20: ${H.Nom} und ${G.nom}`, printTitle: `Hilf ${H.dat} ${G.zu}`, instruction: `Schau dir die Zahl ${H.beim} an. Tritt nur auf die Steine, deren Ergebnis diese Zahl ist.`, tap: `Ziehe nur über die Steine, deren Ergebnis die Zahl ${H.beim} ist.` };
    case 'running-total': return { title: `Rechenlabyrinth bis 100: ${H.Nom} und ${G.nom}`, printTitle: `Plus und Minus auf dem Weg ${G.zu}`, instruction: `Beginne mit der Zahl ${H.beim} und schreib die neue Zahl in jedes Kästchen. Finde den Weg zur Zahl ${G.beim}.`, tap: `Beginne am grünen Kreis. Ziehe den Weg zur Zahl ${G.beim}.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Anlaut-Labyrinth: Wie ${c}`, printTitle: `Bilder, die wie ${c} anfangen`, instruction: `Sag den Namen jedes Bildes. Tritt nur auf Bilder, die mit demselben Laut anfangen wie ${c}.`, tap: `Beginne am grünen Kreis. Ziehe nur über Bilder, die wie ${c} anfangen.` }; }
    case 'maze-colouring': { const [acc, bild] = COLOUR[sk.id]; return { title: `Labyrinth zum Ausmalen: ${H.Nom} und ${G.nom}`, printTitle: `Löse das Labyrinth und male ${acc} aus`, instruction: `Zeichne den Weg ${H.von} ${G.zu} und male den ganzen Weg aus. Male dann ${bild} aus.`, tap: `Beginne am grünen Kreis. Ziehe den Weg entlang bis ${G.zu}.` }; }
    default: throw new Error('de: no template for ' + f);
  }
}

module.exports = { build, NOUNS };
