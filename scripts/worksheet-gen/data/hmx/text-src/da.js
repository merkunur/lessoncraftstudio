/**
 * data/hmx/text-src/da.js — Danish words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: the DEFINITE form, written out ('pindsvinet', 'lammet', 'vindruerne'); the genitive adds -s (none after s / x / z).
 * Templates follow the published Danish face strings (i18n/strings.da.json).
 */
'use strict';
const NOUNS = {
  'lamb': 'lammet', 'haystack': 'høstakken', 'pig': 'grisen', 'mud puddle': 'mudderpølen', 'ox': 'oksen', 'apple basket': 'æblekurven',
  'snail': 'sneglen', 'strawberry': 'jordbærret', 'boy on the bike': 'drengen på cyklen', 'slide': 'rutsjebanen', 'duck': 'anden', 'bread': 'brødet',
  'squirrel': 'egernet', 'pine cone': 'koglen', 'mouse': 'musen', 'pumpkin': 'græskarret', 'sloth': 'dovendyret', 'tree': 'træet',
  'zebra': 'zebraen', 'elephant': 'elefanten', 'camel': 'kamelen', 'palm tree': 'palmen', 'sea turtle': 'havskildpadden', 'sea': 'havet',
  'girl on the sled': 'pigen på kælken', 'cabin': 'hytten', 'seal': 'sælen', 'hole in the ice': 'hullet i isen', 'hiker': 'vandreren', 'tent': 'teltet',
  'owl': 'uglen', 'oak tree': 'egetræet', 'mail carrier': 'postbuddet', 'mailbox': 'postkassen', 'bunny': 'kaninungen', 'Easter basket': 'påskekurven',
  'firefighter': 'brandmanden', 'fire truck': 'brandbilen', 'seagull': 'mågen', 'fish': 'fisken', 'raccoon': 'vaskebjørnen', 'cooler': 'køletasken',
  'triceratops': 'triceratopsen', 'big tree': 'det store træ', 'farmer': 'landmanden', 'tractor': 'traktoren', 'astronaut': 'astronauten', 'rocket': 'raketten',
  'pufferfish': 'kuglefisken', 'shell': 'muslingeskallen', 'robot': 'robotten', 'ice cream': 'isen', 'donkey': 'æslet', 'carrot': 'guleroden',
  'beaver': 'bæveren', 'log': 'træstammen', 'turkey': 'kalkunen', 'corn': 'majskolben', 'skier': 'skiløberen', 'snowman': 'snemanden',
  'swan': 'svanen', 'nest': 'reden', 'macaw': 'papegøjen', 'banana': 'bananen', 'fox': 'ræven', 'lantern': 'lygten',
  'hamster': 'hamsteren', 'apple': 'æblet', 'kitten': 'killingen', 'milk': 'mælken', 'crab': 'krabben', 'beach ball': 'badebolden',
  'ladybug': 'mariehønen', 'sunflower': 'solsikken', 'penguin': 'pingvinen', 'igloo': 'igloen', 'turtle': 'skildpadden', 'flower': 'blomsten',
  'girl': 'pigen', 'swing': 'gyngen', 'chick': 'kyllingen', 'egg': 'ægget', 'horse': 'hesten', 'hen': 'hønen',
  'toy dinosaur': 'legetøjsdinosauren', 'cake': 'kagen', 'bird': 'fuglen', 'birdhouse': 'fuglehuset', 'monkey': 'aben', 'rabbit': 'kaninen',
  'cabbage': 'kålen', 'seahorse': 'søhesten', 'seaweed': 'tangen', 'badger': 'grævlingen', 'chestnut tree': 'kastanjetræet', 'Santa': 'julemanden',
  'sleigh': 'kanen', 'llama': 'lamaen', 'rhino': 'næsehornet', 'hippo': 'flodhesten', 'tortoise': 'skildpadden', 'watermelon': 'vandmelonen',
  'dinosaur': 'dinosauren', 'bear': 'bjørnen', 'honey': 'honningen', 'pelican': 'pelikanen', 'boat': 'båden', 'garbage truck': 'skraldebilen',
  'trash can': 'skraldespanden', 'canoe': 'kanoen', 'kayak': 'kajakken', 'ship': 'skibet', 'lighthouse': 'fyrtårnet', 'sailboat': 'sejlbåden', 'island': 'øen',
  'beach hut': 'strandhytten', 'frog': 'frøen', 'puffin': 'søpapegøjen', 'lifeguard tower': 'livredderens tårn', 'house': 'huset', 'goose': 'gåsen',
  'cheese': 'osten', 'earthworm': 'regnormen', 'leaf': 'bladet', 'gopher': 'gopheren', 'potato': 'kartoflen', 'gerbil': 'ørkenrotten', 'blueberry': 'blåbærret',
  'meerkat': 'surikaten', 'ferret': 'fritten', 'ball': 'bolden', 'chipmunk': 'jordegernet', 'acorn': 'agernet', 'ambulance': 'ambulancen', 'doctor': 'lægen',
  'bus': 'bussen', 'boy': 'drengen', 'jeep': 'jeepen', 'surfboard': 'surfbrættet', 'motorcycle': 'motorcyklen', 'garage': 'garagen', 'van': 'varevognen',
  'package': 'pakken', 'cement mixer': 'betonblanderen', 'builder': 'bygningsarbejderen', 'truck': 'lastbilen', 'forklift': 'gaffeltrucken', 'race car': 'racerbilen',
  'mechanic': 'mekanikeren', 'bee': 'bien', 'little girl': 'den lille pige', 'basket': 'kurven', 'foal': 'føllet', 'porcupine': 'hulepindsvinet', 'apple tree': 'æbletræet',
  'hummingbird': 'kolibrien', 'cherry tree': 'kirsebærtræet', 'guinea pig': 'marsvinet', 'bowl': 'skålen', 'moon': 'månen', 'lemur': 'lemuren', 'elf': 'nissen',
  'sack': 'sækken', 'sandcastle': 'sandslottet', 'duckling': 'ællingen', 'puddle': 'vandpytten', 'coral': 'koralen', 'planet': 'planeten',
  'snowboarder': 'snowboarderen', 'hot cocoa': 'den varme kakao', 'butterfly': 'sommerfuglen', 'rose': 'rosen', 'water lily': 'åkanden', 'radish': 'radisen',
  'toy car': 'legetøjsbilen', 'little dinosaur': 'den lille dinosaur', 'ant': 'myren', 'cookie': 'småkagen', 'gazelle': 'gazellen', 'baobab tree': 'baobabtræet',
  'caterpillar': 'larven', 'toad': 'tudsen', 'dragonfly': 'guldsmeden', 'Earth': 'Jorden', 'teddy bear': 'bamsen', 'cupcake': 'muffinen', 'airplane': 'flyet',
  'rainbow': 'regnbuen', 'helicopter': 'helikopteren', 'mountain': 'bjerget', 'submarine': 'ubåden', 'whale': 'hvalen', 'toy train': 'legetøjstoget',
  'camper': 'autocamperen', 'bike': 'cyklen', 'playground': 'legepladsen', 'dragon': 'dragen', 'campfire': 'lejrbålet', 'flying horse': 'den flyvende hest',
  'sun': 'solen', 'oyster': 'østersen', 'monster truck': 'monstertrucken', 'big rock': 'den store sten', 'octopus': 'blæksprutten', 'flamingo': 'flamingoen',
  'stork': 'storken', 'parrot': 'papegøjen', 'grapes': 'vindruerne', 'koala': 'koalaen', 'kangaroo': 'kænguruen', 'bull': 'tyren', 'turnip': 'roen', 'cow': 'koen',
  'clover': 'kløveren', 'deer': 'rådyret', 'bluebells': 'klokkeblomsterne', 'dog': 'hunden', 'digger': 'gravkoen', 'rock': 'stenen', 'scooter': 'scooteren',
  'jet': 'jetflyet', 'cloud': 'skyen', 'eagle': 'ørnen', 'manatee': 'søkoen', 'pineapple': 'ananassen', 'Christmas tree': 'juletræet',
  'toy helicopter': 'legetøjshelikopteren', 'blocks': 'klodserne', 'bison': 'bisonen', 'wheat': 'hveden', 'sheep': 'fåret', 'grass': 'græsset',
  'moose': 'elgen', 'birch tree': 'birketræet', 'leopard': 'leoparden', 'alligator': 'alligatoren', 'goat': 'geden', 'lettuce': 'salaten', 'tall tree': 'det høje træ',
  'peacock': 'påfuglen', 'hat': 'hatten', 'doll': 'dukken', 'pudding': 'buddingen', 'reindeer': 'rensdyret', 'bell': 'klokken', 'chinchilla': 'chinchillaen',
  'raspberry': 'hindbærret', 'squid': 'blæksprutten', 'cat': 'katten', 'walnut tree': 'valnøddetræet', 'bulldozer': 'bulldozeren', 'sand pile': 'sandbunken',
  'toy truck': 'legetøjslastbilen', 'ferry': 'færgen', 'train': 'toget', 'backpack': 'rygsækken', 'banana tree': 'banantræet', 'orange tree': 'appelsintræet',
  'cherry blossom': 'kirsebærblomsten', 'tiger': 'tigeren', 'toucan': 'tukanen', 'panda': 'pandaen', 'barn': 'laden', 'hay': 'høet', 'mushroom': 'svampen',
  'pyramid': 'pyramiden', 'umbrella': 'paraplyen', 'starfish': 'søstjernen', 'vegetables': 'grøntsagerne', 'hedgehog': 'pindsvinet',
};
const COLLECT = { // [alle …, hver/hvert …, der mangler …]
  'hmx-collect-acorns': ['alle agern', 'hvert agern', 'Der mangler et agern.'], 'hmx-collect-flowers': ['alle solsikker', 'hver solsikke', 'Der mangler en solsikke.'],
  'hmx-collect-corn': ['alle majskolber', 'hver majskolbe', 'Der mangler en majskolbe.'], 'hmx-collect-fish': ['alle fisk', 'hver fisk', 'Der mangler en fisk.'],
  'hmx-collect-shells': ['alle muslingeskaller', 'hver muslingeskal', 'Der mangler en muslingeskal.'], 'hmx-collect-strawberries': ['alle jordbær', 'hvert jordbær', 'Der mangler et jordbær.'],
  'hmx-collect-stars': ['alle stjerner', 'hver stjerne', 'Der mangler en stjerne.'], 'hmx-collect-bananas': ['alle bananer', 'hver banan', 'Der mangler en banan.'],
  'hmx-collect-presents': ['alle gaver', 'hver gave', 'Der mangler en gave.'], 'hmx-collect-eggs': ['alle påskeæg', 'hvert påskeæg', 'Der mangler et påskeæg.'],
  'hmx-collect-apples': ['alle æbler', 'hvert æble', 'Der mangler et æble.'], 'hmx-collect-hibiscus': ['alle blomster', 'hver blomst', 'Der mangler en blomst.'],
};
const AVOID = { // [undgår …, en A eller en B]
  'hmx-avoid-duckling': ['ræven', 'en ræv eller en slange'], 'hmx-avoid-fish': ['hajen', 'en haj eller en vandmand'], 'hmx-avoid-rocket': ['asteroiderne', 'en asteroide eller en meteor'],
  'hmx-avoid-snowboard': ['stenene', 'en sten eller et træ'], 'hmx-avoid-butterfly': ['edderkoppen', 'en edderkop eller en hveps'], 'hmx-avoid-frog': ['hejren', 'en hejre eller en alligator'],
  'hmx-avoid-rabbit': ['høgen', 'en høg eller en ulv'], 'hmx-avoid-toycar': ['vandpytterne', 'en vandpyt eller en stenbunke'], 'hmx-avoid-raptor': ['tyrannosauren', 'en tyrannosaur eller en stenbunke'],
  'hmx-avoid-penguin': ['spækhuggeren', 'en spækhugger eller et hul i isen'], 'hmx-avoid-ant': ['edderkoppen', 'en vandpyt eller en edderkop'], 'hmx-avoid-gazelle': ['leoparden', 'en leopard eller en hyæne'],
};
const HOP = { 'hmx-hop-frog': 'over åkandebladene', 'hmx-hop-penguin': 'over isflagerne', 'hmx-hop-caterpillar': 'over havestenene', 'hmx-hop-astronaut': 'gennem rummet', 'hmx-hop-teddy': 'over slikfelterne', 'hmx-hop-fox': 'over efterårsbladene' };
const COLOUR = { 'hmx-colour-pig': ['bondegården', 'bondegårdsbilledet'], 'hmx-colour-horse': ['engen', 'engbilledet'], 'hmx-colour-monkey': ['junglen', 'junglebilledet'],
  'hmx-colour-penguin': ['isen', 'isbilledet'], 'hmx-colour-hedgehog': ['blomsterengen', 'engbilledet'], 'hmx-colour-turtle': ['stranden', 'strandbilledet'],
  'hmx-colour-squirrel': ['skoven', 'skovbilledet'], 'hmx-colour-camel': ['ørkenen', 'ørkenbilledet'], 'hmx-colour-frog': ['regnvejrsdagen', 'regnbilledet'],
  'hmx-colour-octopus': ['havet', 'havbilledet'], 'hmx-colour-bee': ['haven', 'havebilledet'], 'hmx-colour-dog': ['huset', 'billedet med huset'],
  'hmx-colour-rocket': ['rummet', 'rumbilledet'], 'hmx-colour-ambulance': ['byen', 'bybilledet'], 'hmx-colour-snowman': ['vinteren', 'vinterbilledet'],
  'hmx-colour-tractor': ['høsten', 'høstbilledet'] };
const BABIES = { 'hmx-babies-meadow': 'på engen', 'hmx-babies-sunset': 'i solnedgangen', 'hmx-babies-snow': 'i sneen', 'hmx-babies-orchard': 'i frugthaven', 'hmx-babies-spring': 'om foråret', 'hmx-babies-wheat': 'i hvedemarken' };
const STRINGS = { farm: 'på bondegården', beach: 'på stranden', snow: 'i sneen', savanna: 'på savannen', pets: 'i parken', dinos: 'hos dinosaurerne', forest: 'i skoven', kids: 'på legepladsen', jungle: 'i junglen' };
const CUE = { 'hmx-sound-leopard': 'leopard', 'hmx-sound-tiger': 'tiger', 'hmx-sound-toucan': 'tukan', 'hmx-sound-tractor': 'traktor', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pelikan' };

function forms(key) {
  const s = NOUNS[key]; if (!s) throw new Error('da: no forms for "' + key + '"');
  return { def: s, gen: /[sxz]$/.test(s) ? s : s + 's' };
}
function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Labyrint for børn: ${H.def} og ${G.def}`, printTitle: `Hjælp ${H.def} hen til ${G.def}`, instruction: `Hjælp ${H.def} hen til ${G.def}. Tegn en streg langs vejen.`, tap: `Start ved den grønne cirkel med pilen. Træk langs vejen hen til ${G.def}.` };
    case 'first-maze': return { title: `Min første labyrint: ${H.def} og ${G.def}`, printTitle: `Hjælp ${H.def} hen til ${G.def}`, instruction: `Hjælp ${H.def} hen til ${G.def}. Tegn en streg på den brede vej, og hold dig inden for kanterne.`, tap: `Start ved den grønne cirkel. Træk på den brede vej hen til ${G.def}.` };
    case 'big-maze': return { title: `Stor labyrint 1. klasse: ${H.def} og ${G.def}`, printTitle: `Hjælp ${H.def} med at finde ${G.def}`, instruction: `Se først på hele labyrinten. Tegn derefter ${H.gen} vej hen til ${G.def}.`, tap: `Se først, og træk så fra den grønne cirkel hen til ${G.def}. Hvis en vej slutter, så gå tilbage.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Flodlabyrint: ${H.def} og ${G.def}`, printTitle: swim ? `Hjælp ${H.def} med at svømme hen til ${G.def}` : `${en[2] === 'paddle' ? 'Padl' : 'Sejl'} ${H.def} hen til ${G.def}`, instruction: `${swim ? `Hjælp ${H.def} med at svømme` : `Styr ${H.def}`} gennem vandet hen til ${G.def}. Tegn en streg gennem vandet.`, tap: `Start ved den grønne cirkel. Træk gennem vandet hen til ${G.def}.` }; }
    case 'burrow': return { title: `Labyrint under jorden: ${H.def} og ${G.def}`, printTitle: `Hjælp ${H.def} hen til ${G.def}`, instruction: `Hjælp ${H.def} ned og op gennem gangene hen til ${G.def}. Tegn en streg langs vejen.`, tap: `Start ved den grønne cirkel. Træk gennem gangene hen til ${G.def}.` };
    case 'shortest-way': return { title: `Bylabyrint: ${H.def} og den korteste vej`, printTitle: `Den korteste vej hen til ${G.def}`, instruction: `Mange gader fører hen til ${G.def}. Tegn den korteste vej for ${H.def}, og skriv, hvor mange gadestykker det er.`, tap: `Træk den korteste vej fra den grønne cirkel hen til ${G.def}.` };
    case 'babies-mothers': return { title: `Labyrint: ungerne finder deres mødre ${BABIES[sk.id]}`, printTitle: 'Hjælp hver unge med at finde sin mor', instruction: 'Hjælp hver dyreunge med at finde sin egen mor. Tegn en streg fra hver unge hen til dens mor.', tap: 'Træk fra hver unge hen til dens egen mor.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'drage' : kites === 0 ? 'ballon' : 'drage eller ballon';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      const t = kites && balloons ? 'hvis drage eller ballon er det?' : `hvis ${what} er det?`;
      return { title: `Filtrede snore ${where}: ${t}`, printTitle: t[0].toUpperCase() + t.slice(1),
        instruction: kids ? `Følg hver snor fra et barn eller et stykke legetøj hen til dets ${what}. Skriv nummeret i boksen ovenover.` : `Følg hver snor fra et dyr hen til dets ${what}. Skriv dyrets nummer i boksen ovenover.`,
        tap: kids ? `Træk langs hver snor fra barnet eller legetøjet hen til dets ${what}.` : `Træk langs hver snor fra dyret hen til dets ${what}.` };
    }
    case 'collect': { const [all, each, missed] = COLLECT[sk.id]; return { title: `Labyrint: ${H.def} samler ${all}`, printTitle: `Hjælp ${H.def} med at samle ${all}`, instruction: `Hjælp ${H.def} hen til ${G.def}, og saml ${each} uden at gå den samme vej to gange. Sæt kryds i en cirkel for ${each}.`, tap: `Træk fra den grønne cirkel hen til ${G.def}. Gå over ${each}.`, missed: missed + ' Se på den røde cirkel.' }; }
    case 'avoid': { const [t, one] = AVOID[sk.id]; return { title: `Labyrint: ${H.def} undgår ${t}`, printTitle: `Få ${H.def} sikkert hen til ${G.def}`, instruction: `Hjælp ${H.def} hen til ${G.def}. Tag ingen vej, hvor der er ${one}.`, tap: `Træk fra den grønne cirkel hen til ${G.def}. Tag ingen vej med ${one}.` }; }
    case 'letter-hop': return { title: `Hop i alfabetisk rækkefølge: ${H.def} ${HOP[sk.id]}`, printTitle: `Hop ${HOP[sk.id]} i alfabetisk rækkefølge`, instruction: 'Start i feltet, som pilen peger på. Farvelæg det næste bogstav i alfabetet i et felt ved siden af, helt til {LAST}.', tap: 'Start ved den grønne cirkel. Træk felt for felt hen til det næste bogstav i alfabetet.' };
    case 'abc-capitals': return { title: `Alfabetlabyrint fra A til Å: ${H.def} og ${G.def}`, printTitle: `Fra A til Å med ${H.def} hen til ${G.def}`, instruction: `Hjælp ${H.def} hen til ${G.def}. Gå hen til stenen med det næste bogstav i alfabetet, hver gang vejen deler sig.`, tap: 'Start ved den grønne cirkel. Træk hen til det næste bogstav, hver gang vejen deler sig.' };
    case 'abc-lowercase': return { title: `Labyrint med små bogstaver: ${H.def}`, printTitle: `Fra a til å med ${H.def} hen til ${G.def}`, instruction: `Hjælp ${H.def} hen til ${G.def}. Gå hen til stenen med det næste lille bogstav, hver gang vejen deler sig.`, tap: 'Start ved den grønne cirkel. Træk hen til det næste lille bogstav, hver gang vejen deler sig.' };
    case 'numbers-20': return { title: `Labyrint med tal 1-20: ${H.def} og ${G.def}`, printTitle: `Tæl med ${H.def} hen til ${G.def}`, instruction: `Hjælp ${H.def} hen til ${G.def}. Gå hen til det næste tal, fra 1 til 20, hver gang vejen deler sig.`, tap: 'Start ved den grønne cirkel. Træk hen til det næste tal, hver gang vejen deler sig.' };
    case 'skip-5': return { title: `Tæl 5 ad gangen: ${H.def} og ${G.def}`, printTitle: `Tæl 5 ad gangen hen til ${G.def}`, instruction: `Hjælp ${H.def} hen til ${G.def}. Tæl 5 ad gangen fra sten til sten, helt til 100.`, tap: 'Start ved den grønne cirkel. Træk fra sten til sten, og tæl 5 ad gangen.' };
    case 'make-10': return { title: `Matematiklabyrint 1. klasse: tiervenner med ${H.def}`, printTitle: 'Gå kun på de stykker, der giver 10', instruction: `Hjælp ${H.def} hen til ${G.def}. Gå kun på de sten, hvor summen er 10.`, tap: 'Start ved den grønne cirkel. Træk kun hen over de sten, der giver 10.' };
    case 'subtract-20': return { title: `Minus til 20: ${H.def} og ${G.def}`, printTitle: `Hjælp ${H.def} hen til ${G.def}`, instruction: `Se på tallet ved ${H.def}. Gå kun på de sten, hvor resultatet er det tal.`, tap: `Start ved den grønne cirkel. Træk kun hen over de sten, hvor resultatet er ${H.gen} tal.` };
    case 'running-total': return { title: `Plus og minus til 100: ${H.def} og ${G.def}`, printTitle: `Regn undervejs hen til ${G.def}`, instruction: `Start med ${H.gen} tal, og skriv det nye tal i hver boks. Find vejen, der slutter på ${G.gen} tal.`, tap: `Start ved den grønne cirkel. Træk langs vejen, der slutter på ${G.gen} tal.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Forlydslabyrint: som ${c}`, printTitle: `Billeder, der starter som ${c}`, instruction: `Sig navnet på hvert billede. Gå kun på billeder, der starter med samme lyd som ${c}.`, tap: `Start ved den grønne cirkel. Træk kun hen over billeder, der starter som ${c}.` }; }
    case 'maze-colouring': { const [place, bil] = COLOUR[sk.id]; return { title: `Labyrint til farvelægning: ${H.def} og ${G.def}`, printTitle: `Løs labyrinten, og farvelæg ${place}`, instruction: `Tegn ${H.gen} vej hen til ${G.def}, og farvelæg hele vejen. Farvelæg så ${bil}.`, tap: `Start ved den grønne cirkel. Træk langs vejen hen til ${G.def}.` }; }
    default: throw new Error('da: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
