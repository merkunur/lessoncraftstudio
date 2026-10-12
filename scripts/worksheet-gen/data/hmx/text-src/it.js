/**
 * data/hmx/text-src/it.js — Italian words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: the noun with its definite article ('il riccio', 'lo scoiattolo', "l'orso", 'la mucca', 'gli', 'le'); the
 * prepositions al/allo/all'/alla…, del/dello/dell'/della… are read off the article. Templates: i18n/strings.it.json.
 */
'use strict';
const NOUNS = {
  'lamb': "l'agnellino", 'haystack': 'il mucchio di fieno', 'pig': 'il maialino', 'mud puddle': 'la pozza di fango', 'ox': 'il bue', 'apple basket': 'il cesto di mele',
  'snail': 'la lumaca', 'strawberry': 'la fragola', 'boy on the bike': 'il bambino in bici', 'slide': 'lo scivolo', 'duck': "l'anatra", 'bread': 'il pane',
  'squirrel': 'lo scoiattolo', 'pine cone': 'la pigna', 'mouse': 'il topolino', 'pumpkin': 'la zucca', 'sloth': 'il bradipo', 'tree': "l'albero",
  'zebra': 'la zebra', 'elephant': "l'elefante", 'camel': 'il cammello', 'palm tree': 'la palma', 'sea turtle': 'la tartaruga marina', 'sea': 'il mare',
  'girl on the sled': 'la bambina sullo slittino', 'cabin': 'la baita', 'seal': 'la foca', 'hole in the ice': 'il buco nel ghiaccio', 'hiker': "l'escursionista", 'tent': 'la tenda',
  'owl': 'il gufo', 'oak tree': 'la quercia', 'mail carrier': 'il postino', 'mailbox': 'la cassetta delle lettere', 'bunny': 'il coniglietto', 'Easter basket': 'il cestino di Pasqua',
  'firefighter': 'il pompiere', 'fire truck': "l'autopompa", 'seagull': 'il gabbiano', 'fish': 'il pesce', 'raccoon': 'il procione', 'cooler': 'la borsa frigo',
  'triceratops': 'il triceratopo', 'big tree': "l'albero grande", 'farmer': 'il contadino', 'tractor': 'il trattore', 'astronaut': "l'astronauta", 'rocket': 'il razzo',
  'pufferfish': 'il pesce palla', 'shell': 'la conchiglia', 'robot': 'il robot', 'ice cream': 'il gelato', 'donkey': "l'asinello", 'carrot': 'la carota',
  'beaver': 'il castoro', 'log': 'il tronco', 'turkey': 'il tacchino', 'corn': 'la pannocchia', 'skier': 'la sciatrice', 'snowman': 'il pupazzo di neve',
  'swan': 'il cigno', 'nest': 'il nido', 'macaw': 'il pappagallo', 'banana': 'la banana', 'fox': 'la volpe', 'lantern': 'la lanterna',
  'hamster': "il criceto", 'apple': 'la mela', 'kitten': 'il gattino', 'milk': 'il latte', 'crab': 'il granchio', 'beach ball': 'il pallone da spiaggia',
  'ladybug': 'la coccinella', 'sunflower': 'il girasole', 'penguin': 'il pinguino', 'igloo': "l'igloo", 'turtle': 'la tartaruga', 'flower': 'il fiore',
  'girl': 'la bambina', 'swing': "l'altalena", 'chick': 'il pulcino', 'egg': "l'uovo", 'horse': 'il cavallo', 'hen': 'la gallina',
  'toy dinosaur': 'il dinosauro giocattolo', 'cake': 'la torta', 'bird': "l'uccellino", 'birdhouse': 'la casetta per uccelli', 'monkey': 'la scimmia', 'rabbit': 'il coniglio',
  'cabbage': 'il cavolo', 'seahorse': 'il cavalluccio marino', 'seaweed': "l'alga", 'badger': 'il tasso', 'chestnut tree': 'il castagno', 'Santa': 'Babbo Natale',
  'sleigh': 'la slitta', 'llama': 'il lama', 'rhino': 'il rinoceronte', 'hippo': "l'ippopotamo", 'tortoise': 'la tartaruga', 'watermelon': "l'anguria",
  'dinosaur': 'il dinosauro', 'bear': "l'orso", 'honey': 'il miele', 'pelican': 'il pellicano', 'boat': 'la barca', 'garbage truck': 'il camion della spazzatura',
  'trash can': 'il bidone', 'canoe': 'la canoa', 'kayak': 'il kayak', 'ship': 'la nave', 'lighthouse': 'il faro', 'sailboat': 'la barca a vela', 'island': "l'isola",
  'beach hut': 'il capanno sulla spiaggia', 'frog': 'la rana', 'puffin': 'la pulcinella di mare', 'lifeguard tower': 'la torretta del bagnino', 'house': 'la casa', 'goose': "l'oca",
  'cheese': 'il formaggio', 'earthworm': 'il lombrico', 'leaf': 'la foglia', 'gopher': 'il gopher', 'potato': 'la patata', 'gerbil': 'il gerbillo', 'blueberry': 'il mirtillo',
  'meerkat': 'il suricato', 'ferret': 'il furetto', 'ball': 'la palla', 'chipmunk': 'lo scoiattolino', 'acorn': 'la ghianda', 'ambulance': "l'ambulanza", 'doctor': 'il dottore',
  'bus': "l'autobus", 'boy': 'il bambino', 'jeep': 'la jeep', 'surfboard': 'la tavola da surf', 'motorcycle': 'la moto', 'garage': 'il garage', 'van': 'il furgone',
  'package': 'il pacco', 'cement mixer': 'la betoniera', 'builder': 'il muratore', 'truck': 'il camion', 'forklift': 'il muletto', 'race car': "l'auto da corsa",
  'mechanic': 'il meccanico', 'bee': "l'ape", 'little girl': 'la bimba', 'basket': 'il cestino', 'foal': 'il puledro', 'porcupine': "l'istrice", 'apple tree': 'il melo',
  'hummingbird': 'il colibrì', 'cherry tree': 'il ciliegio', 'guinea pig': 'il porcellino d’India', 'bowl': 'la ciotola', 'moon': 'la luna', 'lemur': 'il lemure', 'elf': "l'elfo",
  'sack': 'il sacco', 'sandcastle': 'il castello di sabbia', 'duckling': "l'anatroccolo", 'puddle': 'la pozzanghera', 'coral': 'il corallo', 'planet': 'il pianeta',
  'snowboarder': 'lo snowboarder', 'hot cocoa': 'la cioccolata calda', 'butterfly': 'la farfalla', 'rose': 'la rosa', 'water lily': 'la ninfea', 'radish': 'il ravanello',
  'toy car': 'la macchinina', 'little dinosaur': 'il piccolo dinosauro', 'ant': 'la formica', 'cookie': 'il biscotto', 'gazelle': 'la gazzella', 'baobab tree': 'il baobab',
  'caterpillar': 'il bruco', 'toad': 'il rospo', 'dragonfly': 'la libellula', 'Earth': 'la Terra', 'teddy bear': "l'orsacchiotto", 'cupcake': 'il dolcetto', 'airplane': "l'aereo",
  'rainbow': "l'arcobaleno", 'helicopter': "l'elicottero", 'mountain': 'la montagna', 'submarine': 'il sottomarino', 'whale': 'la balena', 'toy train': 'il trenino',
  'camper': 'il camper', 'bike': 'la bicicletta', 'playground': 'il parco giochi', 'dragon': 'il drago', 'campfire': 'il falò', 'flying horse': 'il cavallo alato',
  'sun': 'il sole', 'oyster': "l'ostrica", 'monster truck': 'il camion gigante', 'big rock': 'il masso', 'octopus': 'il polpo', 'flamingo': 'il fenicottero',
  'stork': 'la cicogna', 'parrot': 'il pappagallo', 'grapes': "l'uva", 'koala': 'il koala', 'kangaroo': 'il canguro', 'bull': 'il toro', 'turnip': 'la rapa', 'cow': 'la mucca',
  'clover': 'il trifoglio', 'deer': 'il capriolo', 'bluebells': 'le campanule', 'dog': 'il cane', 'digger': 'la ruspa', 'rock': 'la roccia', 'scooter': 'lo scooter',
  'jet': 'il jet', 'cloud': 'la nuvola', 'eagle': "l'aquila", 'manatee': 'il lamantino', 'pineapple': "l'ananas", 'Christmas tree': "l'albero di Natale",
  'toy helicopter': "l'elicottero giocattolo", 'blocks': 'i mattoncini', 'bison': 'il bisonte', 'wheat': 'il grano', 'sheep': 'la pecora', 'grass': "l'erba",
  'moose': "l'alce", 'birch tree': 'la betulla', 'leopard': 'il leopardo', 'alligator': "l'alligatore", 'goat': 'la capra', 'lettuce': "l'insalata", 'tall tree': "l'albero alto",
  'peacock': 'il pavone', 'hat': 'il cappello', 'doll': 'la bambola', 'pudding': 'il budino', 'reindeer': 'la renna', 'bell': 'la campana', 'chinchilla': 'il cincillà',
  'raspberry': 'il lampone', 'squid': 'il calamaro', 'cat': 'il gatto', 'walnut tree': 'il noce', 'bulldozer': 'il bulldozer', 'sand pile': 'il mucchio di sabbia',
  'toy truck': 'il camioncino', 'ferry': 'il traghetto', 'train': 'il treno', 'backpack': 'lo zaino', 'banana tree': 'il banano', 'orange tree': "l'arancio",
  'cherry blossom': 'il ciliegio in fiore', 'tiger': 'la tigre', 'toucan': 'il tucano', 'panda': 'il panda', 'barn': 'il fienile', 'hay': 'il fieno', 'mushroom': 'il fungo',
  'pyramid': 'la piramide', 'umbrella': "l'ombrello", 'starfish': 'la stella marina', 'vegetables': 'le verdure', 'hedgehog': 'il riccio',
};
const COLLECT = { // [tutte le …, ogni …, manca …]
  'hmx-collect-acorns': ['tutte le ghiande', 'ogni ghianda', 'Manca una ghianda.'], 'hmx-collect-flowers': ['tutti i girasoli', 'ogni girasole', 'Manca un girasole.'],
  'hmx-collect-corn': ['tutte le pannocchie', 'ogni pannocchia', 'Manca una pannocchia.'], 'hmx-collect-fish': ['tutti i pesci', 'ogni pesce', 'Manca un pesce.'],
  'hmx-collect-shells': ['tutte le conchiglie', 'ogni conchiglia', 'Manca una conchiglia.'], 'hmx-collect-strawberries': ['tutte le fragole', 'ogni fragola', 'Manca una fragola.'],
  'hmx-collect-stars': ['tutte le stelle', 'ogni stella', 'Manca una stella.'], 'hmx-collect-bananas': ['tutte le banane', 'ogni banana', 'Manca una banana.'],
  'hmx-collect-presents': ['tutti i regali', 'ogni regalo', 'Manca un regalo.'], 'hmx-collect-eggs': ['tutte le uova di Pasqua', 'ogni uovo di Pasqua', 'Manca un uovo di Pasqua.'],
  'hmx-collect-apples': ['tutte le mele', 'ogni mela', 'Manca una mela.'], 'hmx-collect-hibiscus': ['tutti i fiori', 'ogni fiore', 'Manca un fiore.'],
};
const AVOID = { // [evita …, né da un A né da un B, da un A o da un B]
  'hmx-avoid-duckling': ['la volpe', 'né da una volpe né da un serpente', 'da una volpe o da un serpente'], 'hmx-avoid-fish': ['lo squalo', 'né da uno squalo né da una medusa', 'da uno squalo o da una medusa'],
  'hmx-avoid-rocket': ['gli asteroidi', 'né da un asteroide né da una meteora', 'da un asteroide o da una meteora'], 'hmx-avoid-snowboard': ['le rocce', 'né da una roccia né da un albero', 'da una roccia o da un albero'],
  'hmx-avoid-butterfly': ['il ragno', 'né da un ragno né da una vespa', 'da un ragno o da una vespa'], 'hmx-avoid-frog': ["l'airone", "né da un airone né da un alligatore", "da un airone o da un alligatore"],
  'hmx-avoid-rabbit': ['il falco', 'né da un falco né da un lupo', 'da un falco o da un lupo'], 'hmx-avoid-toycar': ['le pozzanghere', 'né da una pozzanghera né da un mucchio di sassi', 'da una pozzanghera o da un mucchio di sassi'],
  'hmx-avoid-raptor': ['il tirannosauro', 'né da un tirannosauro né da un mucchio di sassi', 'da un tirannosauro o da un mucchio di sassi'], 'hmx-avoid-penguin': ["l'orca", "né da un'orca né da un buco nel ghiaccio", "da un'orca o da un buco nel ghiaccio"],
  'hmx-avoid-ant': ['il ragno', 'né da una pozzanghera né da un ragno', 'da una pozzanghera o da un ragno'], 'hmx-avoid-gazelle': ['il leopardo', 'né da un leopardo né da una iena', 'da un leopardo o da una iena'],
};
const HOP = { 'hmx-hop-frog': 'sulle foglie dello stagno', 'hmx-hop-penguin': 'sui blocchi di ghiaccio', 'hmx-hop-caterpillar': 'sulle pietre del giardino', 'hmx-hop-astronaut': 'nello spazio', 'hmx-hop-teddy': 'sulle caramelle', 'hmx-hop-fox': "sulle foglie d'autunno" };
const COLOUR = { 'hmx-colour-pig': ['la fattoria', 'il disegno della fattoria'], 'hmx-colour-horse': ['il prato', 'il disegno del prato'], 'hmx-colour-monkey': ['la giungla', 'il disegno della giungla'],
  'hmx-colour-penguin': ['il ghiaccio', 'il disegno del ghiaccio'], 'hmx-colour-hedgehog': ['il prato fiorito', 'il disegno del prato'], 'hmx-colour-turtle': ['la spiaggia', 'il disegno della spiaggia'],
  'hmx-colour-squirrel': ['il bosco', 'il disegno del bosco'], 'hmx-colour-camel': ['il deserto', 'il disegno del deserto'], 'hmx-colour-frog': ['la giornata di pioggia', 'il disegno della pioggia'],
  'hmx-colour-octopus': ['il mare', 'il disegno del mare'], 'hmx-colour-bee': ['il giardino', 'il disegno del giardino'], 'hmx-colour-dog': ['la casa', 'il disegno della casa'],
  'hmx-colour-rocket': ['lo spazio', 'il disegno dello spazio'], 'hmx-colour-ambulance': ['la città', 'il disegno della città'], 'hmx-colour-snowman': ["l'inverno", "il disegno d'inverno"],
  'hmx-colour-tractor': ['il raccolto', 'il disegno del raccolto'] };
const BABIES = { 'hmx-babies-meadow': 'nel prato', 'hmx-babies-sunset': 'al tramonto', 'hmx-babies-snow': 'nella neve', 'hmx-babies-orchard': 'nel frutteto', 'hmx-babies-spring': 'in primavera', 'hmx-babies-wheat': 'nel campo di grano' };
const STRINGS = { farm: 'in fattoria', beach: 'in spiaggia', snow: 'nella neve', savanna: 'nella savana', pets: 'al parco', dinos: 'con i dinosauri', forest: 'nel bosco', kids: 'al parco giochi', jungle: 'nella giungla' };
const CUE = { 'hmx-sound-leopard': 'leopardo', 'hmx-sound-tiger': 'tigre', 'hmx-sound-toucan': 'tucano', 'hmx-sound-tractor': 'trattore', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pellicano' };

function forms(key) {
  const s = NOUNS[key]; if (!s) throw new Error('it: no forms for "' + key + '"');
  const P = [["l'", "all'", "dell'"], ['il ', 'al ', 'del '], ['lo ', 'allo ', 'dello '], ['la ', 'alla ', 'della '], ['i ', 'ai ', 'dei '], ['gli ', 'agli ', 'degli '], ['le ', 'alle ', 'delle ']];
  const p = P.find(([a]) => s.startsWith(a));
  if (!p) return { def: s, Def: s, a: 'a ' + s, di: 'di ' + s, fino: 'fino a ' + s };   // a name (Babbo Natale)
  const n = s.slice(p[0].length);
  return { def: s, Def: s[0].toUpperCase() + s.slice(1), a: p[1] + n, di: p[2] + n, fino: 'fino ' + p[1] + n };
}
function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  const ad = (verb) => (/^[aeiou]/i.test(verb) ? 'ad ' : 'a ') + verb;
  switch (f) {
    case 'base': return { title: `Labirinto per bambini: ${H.def} e ${G.def}`, printTitle: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}`, instruction: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}. Traccia una linea lungo la strada.`, tap: `Parti dal cerchio verde con la freccia. Trascina lungo la strada ${G.fino}.` };
    case 'first-maze': return { title: `Il mio primo labirinto: ${H.def} e ${G.def}`, printTitle: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}`, instruction: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}. Traccia una linea sulla strada larga senza uscire dai bordi.`, tap: `Parti dal cerchio verde. Trascina sulla strada larga ${G.fino}.` };
    case 'big-maze': return { title: `Labirinto grande classe prima: ${H.def} e ${G.def}`, printTitle: `Aiuta ${H.def} a trovare ${G.def}`, instruction: `Prima guarda tutto il labirinto. Poi traccia la strada ${H.di} ${G.fino}.`, tap: `Guarda prima e poi trascina dal cerchio verde ${G.fino}. Se una strada finisce, torna indietro.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Labirinto del fiume: ${H.def} e ${G.def}`, printTitle: swim ? `Aiuta ${H.def} a nuotare ${G.fino}` : `Porta ${H.def} ${G.fino}`, instruction: `${swim ? `Aiuta ${H.def} a nuotare nel fiume` : `Porta ${H.def} sull'acqua`} ${G.fino}. Traccia una linea nell'acqua.`, tap: `Parti dal cerchio verde. Trascina nell'acqua ${G.fino}.` }; }
    case 'burrow': return { title: `Labirinto sotterraneo: ${H.def} e ${G.def}`, printTitle: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}`, instruction: `Aiuta ${H.def} a scendere e salire nelle gallerie ${G.fino}. Traccia una linea lungo la strada.`, tap: `Parti dal cerchio verde. Trascina nelle gallerie ${G.fino}.` };
    case 'shortest-way': return { title: `Labirinto della città: ${H.def} e la strada più breve`, printTitle: `La strada più breve ${G.fino}`, instruction: `Molte strade portano ${G.a}. Traccia la strada più breve per ${H.def} e scrivi quanti pezzi di strada fa.`, tap: `Trascina la strada più breve dal cerchio verde ${G.fino}.` };
    case 'babies-mothers': return { title: `Labirinto: i cuccioli e le loro mamme ${BABIES[sk.id]}`, printTitle: 'Aiuta ogni cucciolo a trovare la sua mamma', instruction: 'Aiuta ogni cucciolo a trovare la sua mamma. Traccia una linea da ogni cucciolo fino alla sua mamma.', tap: 'Trascina da ogni cucciolo fino alla sua mamma.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'aquilone' : kites === 0 ? 'palloncino' : 'aquilone o palloncino'; const whatT = balloons === 0 ? "l'aquilone" : kites === 0 ? 'il palloncino' : 'ogni filo';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      return { title: `Fili aggrovigliati ${where}: di chi è ${whatT}?`, printTitle: `Di chi è ${whatT}?`,
        instruction: kids ? `Segui ogni filo da un bambino o da un giocattolo fino al suo ${what}. Scrivi il suo numero nella casella sopra.` : `Segui ogni filo da un animale fino al suo ${what}. Scrivi il numero dell'animale nella casella sopra.`,
        tap: kids ? `Trascina lungo ogni filo, dal bambino o dal giocattolo fino al suo ${what}.` : `Trascina lungo ogni filo, dall'animale fino al suo ${what}.` };
    }
    case 'collect': { const [all, each, missed] = COLLECT[sk.id]; return { title: `Labirinto: ${H.def} raccoglie ${all}`, printTitle: `Aiuta ${H.def} a raccogliere ${all}`, instruction: `Porta ${H.def} ${G.a} e raccogli ${each}, senza ripassare sulla stessa strada. Segna un cerchio per ${each}.`, tap: `Trascina dal cerchio verde ${G.fino}. Passa da ${each}.`, missed: missed + ' Guarda il cerchio rosso.' }; }
    case 'avoid': { const [t, none, one] = AVOID[sk.id]; return { title: `Labirinto: ${H.def} evita ${t}`, printTitle: `Porta ${H.def} ${G.fino} senza pericoli`, instruction: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}. Non prendere strade dove c'è ${one.replace(/^da /, '').replace(' o da ', ' o ')}.`, tap: `Trascina dal cerchio verde ${G.fino} senza prendere strade con ${one.replace(/^da /, '').replace(' o da ', ' o ')}.` }; }
    case 'letter-hop': return { title: `Salta le lettere in ordine: ${H.def} ${HOP[sk.id]}`, printTitle: `Salta ${HOP[sk.id]} in ordine alfabetico`, instruction: 'Parti dalla casella indicata dalla freccia. Colora la lettera successiva dell\'alfabeto in una casella vicina, fino alla {LAST}.', tap: 'Parti dal cerchio verde. Trascina di casella in casella alla lettera successiva dell\'alfabeto.' };
    case 'abc-capitals': return { title: `Labirinto dell'alfabeto: ${H.def} e ${G.def}`, printTitle: `Dalla A alla Z, porta ${H.def} ${G.fino}`, instruction: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}. A ogni incrocio vai alla pietra con la lettera successiva dell'alfabeto.`, tap: 'Parti dal cerchio verde. A ogni incrocio trascina alla lettera successiva.' };
    case 'abc-lowercase': return { title: `Labirinto delle lettere minuscole: ${H.def}`, printTitle: `Dalla a alla z, porta ${H.def} ${G.fino}`, instruction: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}. A ogni incrocio vai alla pietra con la minuscola successiva.`, tap: 'Parti dal cerchio verde. A ogni incrocio trascina alla minuscola successiva.' };
    case 'numbers-20': return { title: `Labirinto dei numeri da 1 a 20: ${H.def} e ${G.def}`, printTitle: `Conta con ${H.def} ${G.fino}`, instruction: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}. A ogni incrocio vai al numero successivo, da 1 a 20.`, tap: 'Parti dal cerchio verde. A ogni incrocio trascina al numero successivo.' };
    case 'skip-5': return { title: `Labirinto di 5 in 5: ${H.def} e ${G.def}`, printTitle: `Conta di 5 in 5 ${G.fino}`, instruction: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}. Conta di 5 in 5 di pietra in pietra fino a 100.`, tap: 'Parti dal cerchio verde. Trascina di pietra in pietra contando di 5 in 5.' };
    case 'make-10': return { title: `Labirinto degli amici del 10: ${H.def} e ${G.def}`, printTitle: 'Cammina solo sulle somme che fanno 10', instruction: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}. Cammina solo sulle pietre la cui somma fa 10.`, tap: 'Parti dal cerchio verde. Trascina solo sulle pietre che fanno 10.' };
    case 'subtract-20': return { title: `Labirinto delle sottrazioni: ${H.def} e ${G.def}`, printTitle: `Aiuta ${H.def} ${ad('arrivare')} ${G.a}`, instruction: `Guarda il numero accanto ${H.a}. Cammina solo sulle pietre il cui risultato è quel numero.`, tap: `Parti dal cerchio verde. Trascina solo sulle pietre che danno il numero ${H.di}.` };
    case 'running-total': return { title: `Labirinto di addizioni e sottrazioni: ${H.def}`, printTitle: `Calcola lungo la strada ${G.fino}`, instruction: `Parti dal numero ${H.di} e scrivi il nuovo numero in ogni casella. Trova la strada che finisce sul numero ${G.di}.`, tap: `Parti dal cerchio verde. Trascina lungo la strada che finisce sul numero ${G.di}.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Labirinto dei suoni iniziali: come ${c}`, printTitle: `Figure che iniziano come ${c}`, instruction: `Di' il nome di ogni figura. Cammina solo sulle figure che iniziano con lo stesso suono di ${c}.`, tap: `Parti dal cerchio verde. Trascina solo sulle figure che iniziano come ${c}.` }; }
    case 'maze-colouring': { const [place, dis] = COLOUR[sk.id]; return { title: `Labirinto da colorare: ${H.def} e ${G.def}`, printTitle: `Risolvi il labirinto e colora ${place}`, instruction: `Traccia la strada ${H.di} ${G.fino} e colora tutta la strada. Poi colora ${dis}.`, tap: `Parti dal cerchio verde. Trascina lungo la strada ${G.fino}.` }; }
    default: throw new Error('it: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
