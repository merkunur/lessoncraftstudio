/**
 * data/hmx/text-src/fr.js — French words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: the noun with its definite article, written out ('le hérisson', "l'ours:m", 'la fusée', 'les raisins').
 * "à + le" / "de + le" contractions are read off the article. Templates follow the published French face strings.
 */
'use strict';
const NOUNS = {
  'lamb': "l'agneau:m", 'haystack': 'la meule de foin', 'pig': 'le cochon', 'mud puddle': 'la flaque de boue', 'ox': 'le bœuf', 'apple basket': 'le panier de pommes',
  'snail': "l'escargot:m", 'strawberry': 'la fraise', 'boy on the bike': 'le garçon à vélo', 'slide': 'le toboggan', 'duck': 'le canard', 'bread': 'le pain',
  'squirrel': "l'écureuil:m", 'pine cone': 'la pomme de pin', 'mouse': 'la souris', 'pumpkin': 'la citrouille', 'sloth': 'le paresseux', 'tree': "l'arbre:m",
  'zebra': 'le zèbre', 'elephant': "l'éléphant:m", 'camel': 'le chameau', 'palm tree': 'le palmier', 'sea turtle': 'la tortue de mer', 'sea': 'la mer',
  'girl on the sled': 'la fille sur sa luge', 'cabin': 'le chalet', 'seal': 'le phoque', 'hole in the ice': 'le trou dans la glace', 'hiker': 'la randonneuse', 'tent': 'la tente',
  'owl': 'la chouette', 'oak tree': 'le chêne', 'mail carrier': 'le facteur', 'mailbox': 'la boîte aux lettres', 'bunny': 'le lapin', 'Easter basket': 'le panier de Pâques',
  'firefighter': 'le pompier', 'fire truck': 'le camion de pompiers', 'seagull': 'la mouette', 'fish': 'le poisson', 'raccoon': 'le raton laveur', 'cooler': 'la glacière',
  'triceratops': 'le tricératops', 'big tree': 'le grand arbre', 'farmer': 'le fermier', 'tractor': 'le tracteur', 'astronaut': "l'astronaute:m", 'rocket': 'la fusée',
  'pufferfish': 'le poisson-globe', 'shell': 'le coquillage', 'robot': 'le robot', 'ice cream': 'la glace', 'donkey': "l'âne:m", 'carrot': 'la carotte',
  'beaver': 'le castor', 'log': 'la bûche', 'turkey': 'la dinde', 'corn': "l'épi de maïs:m", 'skier': 'la skieuse', 'snowman': 'le bonhomme de neige',
  'swan': 'le cygne', 'nest': 'le nid', 'macaw': 'le perroquet', 'banana': 'la banane', 'fox': 'le renard', 'lantern': 'la lanterne',
  'hamster': 'le hamster', 'apple': 'la pomme', 'kitten': 'le chaton', 'milk': 'le lait', 'crab': 'le crabe', 'beach ball': 'le ballon de plage',
  'ladybug': 'la coccinelle', 'sunflower': 'le tournesol', 'penguin': 'le manchot', 'igloo': "l'igloo:m", 'turtle': 'la tortue', 'flower': 'la fleur',
  'girl': 'la fille', 'swing': 'la balançoire', 'chick': 'le poussin', 'egg': "l'œuf:m", 'horse': 'le cheval', 'hen': 'la poule',
  'toy dinosaur': 'le dinosaure en jouet', 'cake': 'le gâteau', 'bird': "l'oiseau:m", 'birdhouse': 'le nichoir', 'monkey': 'le singe', 'rabbit': 'le lapin',
  'cabbage': 'le chou', 'seahorse': "l'hippocampe:m", 'seaweed': "l'algue:f", 'badger': 'le blaireau', 'chestnut tree': 'le châtaignier', 'Santa': 'le père Noël',
  'sleigh': 'le traîneau', 'llama': 'le lama', 'rhino': 'le rhinocéros', 'hippo': "l'hippopotame:m", 'tortoise': 'la tortue', 'watermelon': 'la pastèque',
  'dinosaur': 'le dinosaure', 'bear': "l'ours:m", 'honey': 'le miel', 'pelican': 'le pélican', 'boat': 'le bateau', 'garbage truck': 'le camion-poubelle',
  'trash can': 'la poubelle', 'canoe': 'le canoë', 'kayak': 'le kayak', 'ship': 'le navire', 'lighthouse': 'le phare', 'sailboat': 'le voilier', 'island': "l'île:f",
  'beach hut': 'la cabine de plage', 'frog': 'la grenouille', 'puffin': 'le macareux', 'lifeguard tower': 'le poste de secours', 'house': 'la maison', 'goose': "l'oie:f",
  'cheese': 'le fromage', 'earthworm': 'le ver de terre', 'leaf': 'la feuille', 'gopher': 'le petit rongeur', 'potato': 'la pomme de terre', 'gerbil': 'la gerbille',
  'blueberry': 'la myrtille', 'meerkat': 'le suricate', 'ferret': 'le furet', 'ball': 'la balle', 'chipmunk': 'le tamia', 'acorn': 'le gland', 'ambulance': "l'ambulance:f",
  'doctor': 'le médecin', 'bus': "l'autobus:m", 'boy': 'le garçon', 'jeep': 'la jeep', 'surfboard': 'la planche de surf', 'motorcycle': 'la moto', 'garage': 'le garage',
  'van': 'la camionnette', 'package': 'le colis', 'cement mixer': 'la bétonnière', 'builder': "l'ouvrier:m", 'truck': 'le camion', 'forklift': 'le chariot élévateur',
  'race car': 'la voiture de course', 'mechanic': 'le mécanicien', 'bee': "l'abeille:f", 'little girl': 'la petite fille', 'basket': 'le panier', 'foal': 'le poulain', 'porcupine': 'le porc-épic',
  'apple tree': 'le pommier', 'hummingbird': 'le colibri', 'cherry tree': 'le cerisier', 'guinea pig': 'le cochon d’Inde', 'bowl': 'le bol', 'moon': 'la lune',
  'lemur': 'le lémurien', 'elf': 'le lutin', 'sack': 'la hotte', 'sandcastle': 'le château de sable', 'duckling': 'le caneton', 'puddle': 'la flaque', 'coral': 'le corail',
  'planet': 'la planète', 'snowboarder': 'le snowboardeur', 'hot cocoa': 'le chocolat chaud', 'butterfly': 'le papillon', 'rose': 'la rose', 'water lily': 'le nénuphar',
  'radish': 'le radis', 'toy car': 'la petite voiture', 'little dinosaur': 'le petit dinosaure', 'ant': 'la fourmi', 'cookie': 'le biscuit', 'gazelle': 'la gazelle',
  'baobab tree': 'le baobab', 'caterpillar': 'la chenille', 'toad': 'le crapaud', 'dragonfly': 'la libellule', 'Earth': 'la Terre', 'teddy bear': 'le nounours', 'cupcake': 'le petit gâteau',
  'airplane': "l'avion:m", 'rainbow': "l'arc-en-ciel:m", 'helicopter': "l'hélicoptère:m", 'mountain': 'la montagne', 'submarine': 'le sous-marin', 'whale': 'la baleine',
  'toy train': 'le petit train', 'camper': 'le camping-car', 'bike': 'le vélo', 'playground': "l'aire de jeux:f", 'dragon': 'le dragon', 'campfire': 'le feu de camp',
  'flying horse': 'le cheval volant', 'sun': 'le soleil', 'oyster': "l'huître:f", 'monster truck': 'le camion géant', 'big rock': 'le gros rocher', 'octopus': 'la pieuvre',
  'flamingo': 'le flamant rose', 'stork': 'la cigogne', 'parrot': 'le perroquet', 'grapes': 'le raisin', 'koala': 'le koala', 'kangaroo': 'le kangourou', 'bull': 'le taureau',
  'turnip': 'le navet', 'cow': 'la vache', 'clover': 'le trèfle', 'deer': 'le chevreuil', 'bluebells': 'les jacinthes', 'dog': 'le chien', 'digger': 'la pelleteuse',
  'rock': 'le rocher', 'scooter': 'le scooter', 'jet': "l'avion à réaction:m", 'cloud': 'le nuage', 'eagle': "l'aigle:m", 'manatee': 'le lamantin', 'pineapple': "l'ananas:m",
  'Christmas tree': 'le sapin de Noël', 'toy helicopter': "l'hélicoptère en jouet:m", 'blocks': 'les cubes', 'bison': 'le bison', 'wheat': 'le blé', 'sheep': 'le mouton',
  'grass': "l'herbe:f", 'moose': "l'élan:m", 'birch tree': 'le bouleau', 'leopard': 'le léopard', 'alligator': "l'alligator:m", 'goat': 'la chèvre', 'lettuce': 'la salade',
  'tall tree': 'le grand arbre', 'peacock': 'le paon', 'hat': 'le chapeau', 'doll': 'la poupée', 'pudding': 'le flan', 'reindeer': 'le renne', 'bell': 'la cloche',
  'chinchilla': 'le chinchilla', 'raspberry': 'la framboise', 'squid': 'le calmar', 'cat': 'le chat', 'walnut tree': 'le noyer', 'bulldozer': 'le bulldozer',
  'sand pile': 'le tas de sable', 'toy truck': 'le camion en jouet', 'ferry': 'le ferry', 'train': 'le train', 'backpack': 'le sac à dos', 'banana tree': 'le bananier',
  'orange tree': "l'oranger:m", 'cherry blossom': 'le cerisier en fleurs', 'tiger': 'le tigre', 'toucan': 'le toucan', 'panda': 'le panda', 'barn': 'la grange', 'hay': 'le foin',
  'mushroom': 'le champignon', 'pyramid': 'la pyramide', 'umbrella': 'le parapluie', 'starfish': "l'étoile de mer:f", 'vegetables': 'les légumes', 'hedgehog': 'le hérisson',
};
const COLLECT = { // [toutes les …, chaque …, il manque …]
  'hmx-collect-acorns': ['tous les glands', 'chaque gland', 'Il manque un gland.'], 'hmx-collect-flowers': ['tous les tournesols', 'chaque tournesol', 'Il manque un tournesol.'],
  'hmx-collect-corn': ['tous les épis de maïs', 'chaque épi de maïs', 'Il manque un épi de maïs.'], 'hmx-collect-fish': ['tous les poissons', 'chaque poisson', 'Il manque un poisson.'],
  'hmx-collect-shells': ['tous les coquillages', 'chaque coquillage', 'Il manque un coquillage.'], 'hmx-collect-strawberries': ['toutes les fraises', 'chaque fraise', 'Il manque une fraise.'],
  'hmx-collect-stars': ['toutes les étoiles', 'chaque étoile', 'Il manque une étoile.'], 'hmx-collect-bananas': ['toutes les bananes', 'chaque banane', 'Il manque une banane.'],
  'hmx-collect-presents': ['tous les cadeaux', 'chaque cadeau', 'Il manque un cadeau.'], 'hmx-collect-eggs': ['tous les œufs de Pâques', 'chaque œuf de Pâques', 'Il manque un œuf de Pâques.'],
  'hmx-collect-apples': ['toutes les pommes', 'chaque pomme', 'Il manque une pomme.'], 'hmx-collect-hibiscus': ['toutes les fleurs', 'chaque fleur', 'Il manque une fleur.'],
};
const AVOID = { // [évite …, aucun A ni aucun B, un A ou un B]
  'hmx-avoid-duckling': ['le renard', 'aucun renard ni aucun serpent', 'un renard ou un serpent'], 'hmx-avoid-fish': ['le requin', 'aucun requin ni aucune méduse', 'un requin ou une méduse'],
  'hmx-avoid-rocket': ['les astéroïdes', 'aucun astéroïde ni aucune météorite', 'un astéroïde ou une météorite'], 'hmx-avoid-snowboard': ['les rochers', 'aucun rocher ni aucun sapin', 'un rocher ou un sapin'],
  'hmx-avoid-butterfly': ["l'araignée", 'aucune araignée ni aucune guêpe', 'une araignée ou une guêpe'], 'hmx-avoid-frog': ['le héron', 'aucun héron ni aucun alligator', 'un héron ou un alligator'],
  'hmx-avoid-rabbit': ["l'épervier", 'aucun épervier ni aucun loup', 'un épervier ou un loup'], 'hmx-avoid-toycar': ['les flaques', 'aucune flaque ni aucun tas de pierres', 'une flaque ou un tas de pierres'],
  'hmx-avoid-raptor': ['le tyrannosaure', 'aucun tyrannosaure ni aucun tas de pierres', 'un tyrannosaure ou un tas de pierres'], 'hmx-avoid-penguin': ["l'orque", 'aucune orque ni aucun trou dans la glace', 'une orque ou un trou'],
  'hmx-avoid-ant': ["l'araignée", 'aucune flaque ni aucune araignée', 'une flaque ou une araignée'], 'hmx-avoid-gazelle': ['le léopard', 'aucun léopard ni aucune hyène', 'un léopard ou une hyène'],
};
const HOP = { 'hmx-hop-frog': 'les feuilles de nénuphar', 'hmx-hop-penguin': 'la banquise', 'hmx-hop-caterpillar': 'les pierres du jardin', 'hmx-hop-astronaut': "les cases de l'espace", 'hmx-hop-teddy': 'les cases en bonbon', 'hmx-hop-fox': "les cases d'automne" };
const HOP_ON = { 'hmx-hop-frog': 'sur les feuilles de nénuphar', 'hmx-hop-penguin': 'sur la banquise', 'hmx-hop-caterpillar': 'sur les pierres du jardin', 'hmx-hop-astronaut': "dans l'espace", 'hmx-hop-teddy': 'sur les cases en bonbon', 'hmx-hop-fox': "sur les cases d'automne" };
const COLOUR = { 'hmx-colour-pig': ['la ferme', 'le dessin de la ferme'], 'hmx-colour-horse': ['le pré', 'le dessin du pré'], 'hmx-colour-monkey': ['la jungle', 'le dessin de la jungle'],
  'hmx-colour-penguin': ['la banquise', 'le dessin de la banquise'], 'hmx-colour-hedgehog': ['la prairie', 'le dessin de la prairie'], 'hmx-colour-turtle': ['la plage', 'le dessin de la plage'],
  'hmx-colour-squirrel': ['la forêt', 'le dessin de la forêt'], 'hmx-colour-camel': ['le désert', 'le dessin du désert'], 'hmx-colour-frog': ['le jour de pluie', 'le dessin sous la pluie'],
  'hmx-colour-octopus': ['la mer', 'le dessin de la mer'], 'hmx-colour-bee': ['le jardin', 'le dessin du jardin'], 'hmx-colour-dog': ['la maison', 'le dessin de la maison'],
  'hmx-colour-rocket': ["l'espace", "le dessin de l'espace"], 'hmx-colour-ambulance': ['la ville', 'le dessin de la ville'], 'hmx-colour-snowman': ["l'hiver", "le dessin d'hiver"],
  'hmx-colour-tractor': ['la récolte', 'le dessin de la récolte'] };
const BABIES = { 'hmx-babies-meadow': 'dans le pré', 'hmx-babies-sunset': 'au coucher du soleil', 'hmx-babies-snow': 'dans la neige', 'hmx-babies-orchard': 'dans le verger', 'hmx-babies-spring': 'au printemps', 'hmx-babies-wheat': 'dans le champ de blé' };
const STRINGS = { farm: 'à la ferme', beach: 'à la plage', snow: 'dans la neige', savanna: 'dans la savane', pets: 'au parc', dinos: 'chez les dinosaures', forest: 'dans la forêt', kids: "à l'aire de jeux", jungle: 'dans la jungle' };
const CUE = { 'hmx-sound-leopard': 'léopard', 'hmx-sound-tiger': 'tigre', 'hmx-sound-toucan': 'toucan', 'hmx-sound-tractor': 'tracteur', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pélican' };

function forms(key) {
  let s = NOUNS[key]; if (!s) throw new Error('fr: no forms for "' + key + '"');
  let g = null; const m = s.match(/:(m|f)$/); if (m) { g = m[1]; s = s.slice(0, -2); }
  let a, de;
  if (s.startsWith("l'")) { a = "à l'" + s.slice(2); de = "de l'" + s.slice(2); }
  else if (s.startsWith('le ')) { a = 'au ' + s.slice(3); de = 'du ' + s.slice(3); }
  else if (s.startsWith('la ')) { a = 'à la ' + s.slice(3); de = 'de la ' + s.slice(3); }
  else if (s.startsWith('les ')) { a = 'aux ' + s.slice(4); de = 'des ' + s.slice(4); }
  else throw new Error('fr: no article in "' + s + '"');
  return { def: s, Def: s[0].toUpperCase() + s.slice(1), a, de };
}

function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Jeu de labyrinthe : ${H.def} et ${G.def}`, printTitle: `Aide ${H.def} à rejoindre ${G.def}`, instruction: `Aide ${H.def} à aller jusqu'${G.a.replace(/^à /, 'à ').replace(/^au /, 'au ').replace(/^aux /, 'aux ')}. Trace une ligne le long du chemin.`.replace("jusqu'à ", "jusqu'à ").replace("jusqu'au ", "jusqu'au ").replace("jusqu'aux ", "jusqu'aux "), tap: `Commence au rond vert avec la flèche. Glisse le long du chemin jusqu'${G.a}.` };
    case 'first-maze': return { title: `Mon premier labyrinthe : ${H.def} et ${G.def}`, printTitle: `Aide ${H.def} à rejoindre ${G.def}`, instruction: `Aide ${H.def} à aller jusqu'${G.a}. Trace une ligne sur le large chemin sans dépasser les bords.`, tap: `Commence au rond vert. Glisse sur le large chemin jusqu'${G.a}.` };
    case 'big-maze': return { title: `Grand labyrinthe CP : ${H.def} et ${G.def}`, printTitle: `Aide ${H.def} à trouver ${G.def}`, instruction: `Regarde d'abord tout le labyrinthe. Trace ensuite le chemin ${H.de} jusqu'${G.a}.`, tap: `Regarde d'abord, puis glisse du rond vert jusqu'${G.a}. Si un chemin s'arrête, reviens en arrière.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Labyrinthe de la rivière : ${H.def} et ${G.def}`, printTitle: swim ? `Aide ${H.def} à nager jusqu'${G.a}` : `Conduis ${H.def} jusqu'${G.a}`, instruction: `${swim ? `Aide ${H.def} à nager` : `Conduis ${H.def}`} sur l'eau jusqu'${G.a}. Trace une ligne dans l'eau.`, tap: `Commence au rond vert. Glisse dans l'eau jusqu'${G.a}.` }; }
    case 'burrow': return { title: `Labyrinthe souterrain : ${H.def} et ${G.def}`, printTitle: `Aide ${H.def} à rejoindre ${G.def}`, instruction: `Aide ${H.def} à descendre et remonter dans les galeries jusqu'${G.a}. Trace une ligne le long du chemin.`, tap: `Commence au rond vert. Glisse dans les galeries jusqu'${G.a}.` };
    case 'shortest-way': return { title: `Labyrinthe de la ville : ${H.def} et le plus court chemin`, printTitle: `Le plus court chemin jusqu'${G.a}`, instruction: `Beaucoup de rues mènent ${G.a}. Trace le plus court chemin pour ${H.def} et écris combien de bouts de rue il y a.`, tap: `Glisse le long du plus court chemin, du rond vert jusqu'${G.a}.` };
    case 'babies-mothers': return { title: `Labyrinthe : les bébés retrouvent leur maman ${BABIES[sk.id]}`, printTitle: 'Aide chaque petit à retrouver sa maman', instruction: 'Aide chaque bébé animal à retrouver sa maman. Trace une ligne de chaque bébé jusqu\'à sa maman.', tap: 'Glisse de chaque bébé jusqu\'à sa maman.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'cerf-volant' : kites === 0 ? 'ballon' : 'cerf-volant ou son ballon'; const whatT = balloons === 0 ? 'est le cerf-volant' : kites === 0 ? 'est le ballon' : 'est chaque fil';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      return { title: `Fils emmêlés ${where} : à qui ${whatT} ?`, printTitle: `À qui ${whatT} ?`,
        instruction: kids ? `Suis chaque fil d'un enfant ou d'un jouet jusqu'à son ${what}. Écris son numéro dans la case au-dessus.` : `Suis chaque fil d'un animal jusqu'à son ${what}. Écris le numéro de l'animal dans la case au-dessus.`,
        tap: kids ? `Glisse le long de chaque fil, de l'enfant ou du jouet jusqu'à son ${what}.` : `Glisse le long de chaque fil, de l'animal jusqu'à son ${what}.` };
    }
    case 'collect': { const [all, each, missed] = COLLECT[sk.id]; return { title: `Labyrinthe : ${H.def} ramasse ${all}`, printTitle: `Aide ${H.def} à ramasser ${all}`, instruction: `Emmène ${H.def} jusqu'${G.a} en ramassant ${each}, sans repasser par le même chemin. Coche un rond pour ${each}.`, tap: `Glisse du rond vert jusqu'${G.a}. Passe par ${each}.`, missed: missed + ' Regarde le rond rouge.' }; }
    case 'avoid': { const [t, none, one] = AVOID[sk.id]; return { title: `Labyrinthe : ${H.def} évite ${t}`, printTitle: `Ramène ${H.def} sans danger jusqu'${G.a}`, instruction: `Aide ${H.def} à rejoindre ${G.def}. Ne prends aucun chemin où il y a ${one}.`, tap: `Glisse du rond vert jusqu'${G.a}, sans prendre de chemin avec ${one}.` }; }
    case 'letter-hop': return { title: `Ordre alphabétique : ${H.def} saute ${HOP_ON[sk.id]}`, printTitle: `Saute ${HOP_ON[sk.id]} dans l'ordre alphabétique`, instruction: 'Commence dans la case montrée par la flèche. Colorie à chaque fois la lettre suivante dans une case voisine, jusqu\'au {LAST}.', tap: 'Commence au rond vert. Glisse de case en case vers la lettre suivante de l\'alphabet.' };
    case 'abc-capitals': return { title: `Labyrinthe des lettres capitales : ${H.def} et ${G.def}`, printTitle: `De A à Z, emmène ${H.def} jusqu'${G.a}`, instruction: `Aide ${H.def} à aller jusqu'${G.a}. À chaque croisement, va vers la pierre avec la lettre suivante de l'alphabet.`, tap: 'Commence au rond vert. À chaque croisement, glisse vers la lettre suivante.' };
    case 'abc-lowercase': return { title: `Labyrinthe des lettres minuscules : ${H.def}`, printTitle: `De a à z, emmène ${H.def} jusqu'${G.a}`, instruction: `Aide ${H.def} à aller jusqu'${G.a}. À chaque croisement, va vers la pierre avec la minuscule suivante.`, tap: 'Commence au rond vert. À chaque croisement, glisse vers la minuscule suivante.' };
    case 'numbers-20': return { title: `Labyrinthe des nombres de 1 à 20 : ${H.def} et ${G.def}`, printTitle: `Compte avec ${H.def} jusqu'${G.a}`, instruction: `Aide ${H.def} à aller jusqu'${G.a}. À chaque croisement, va vers le nombre suivant, de 1 à 20.`, tap: 'Commence au rond vert. À chaque croisement, glisse vers le nombre suivant.' };
    case 'skip-5': return { title: `Labyrinthe de 5 en 5 : ${H.def} et ${G.def}`, printTitle: `Compte de 5 en 5 jusqu'${G.a}`, instruction: `Aide ${H.def} à rejoindre ${G.def}. Compte de 5 en 5 de pierre en pierre, jusqu'à 100.`, tap: 'Commence au rond vert. Glisse de pierre en pierre en comptant de 5 en 5.' };
    case 'make-10': return { title: `Labyrinthe des compléments à 10 : ${H.def} et ${G.def}`, printTitle: 'Marche sur les additions qui font 10', instruction: `Aide ${H.def} à rejoindre ${G.def}. Marche seulement sur les pierres dont la somme fait 10.`, tap: 'Commence au rond vert. Glisse seulement sur les pierres qui font 10.' };
    case 'subtract-20': return { title: `Labyrinthe des soustractions : ${H.def} et ${G.def}`, printTitle: `Aide ${H.def} à rejoindre ${G.def}`, instruction: `Regarde le nombre à côté ${H.de}. Marche seulement sur les pierres dont le résultat est ce nombre.`, tap: `Commence au rond vert. Glisse seulement sur les pierres qui donnent le nombre ${H.de}.` };
    case 'running-total': return { title: `Labyrinthe des additions et soustractions : ${H.def}`, printTitle: `Calcule sur la route jusqu'${G.a}`, instruction: `Pars du nombre ${H.de} et écris le nouveau nombre dans la case de chaque panneau. Trouve la route qui finit sur le nombre ${G.de}.`, tap: `Commence au rond vert. Glisse le long de la route qui finit sur le nombre ${G.de}.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Labyrinthe des sons : comme ${c}`, printTitle: `Les images qui commencent comme ${c}`, instruction: `Dis le nom de chaque image. Marche seulement sur les images qui commencent par le même son que ${c}.`, tap: `Commence au rond vert. Glisse seulement sur les images qui commencent comme ${c}.` }; }
    case 'maze-colouring': { const [place, dessin] = COLOUR[sk.id]; return { title: `Labyrinthe à colorier : ${H.def} et ${G.def}`, printTitle: `Résous le labyrinthe, puis colorie ${place}`, instruction: `Trace le chemin ${H.de} jusqu'${G.a} et colorie tout le chemin. Colorie ensuite ${dessin}.`, tap: `Commence au rond vert. Glisse le long du chemin jusqu'${G.a}.` }; }
    default: throw new Error('fr: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
