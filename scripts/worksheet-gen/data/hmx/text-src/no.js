/**
 * data/hmx/text-src/no.js — Norwegian (bokmål) words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: the DEFINITE form, written out ('pinnsvinet', 'lammet', 'druene'); the genitive adds -s (none after s / x / z).
 * Templates follow the published Norwegian face strings (i18n/strings.no.json).
 */
'use strict';
const NOUNS = {
  'lamb': 'lammet', 'haystack': 'høystakken', 'pig': 'grisen', 'mud puddle': 'gjørmepytten', 'ox': 'oksen', 'apple basket': 'eplekurven',
  'snail': 'sneglen', 'strawberry': 'jordbæret', 'boy on the bike': 'gutten på sykkelen', 'slide': 'sklien', 'duck': 'anda', 'bread': 'brødet',
  'squirrel': 'ekornet', 'pine cone': 'kongla', 'mouse': 'musa', 'pumpkin': 'gresskaret', 'sloth': 'dovendyret', 'tree': 'treet',
  'zebra': 'sebraen', 'elephant': 'elefanten', 'camel': 'kamelen', 'palm tree': 'palmen', 'sea turtle': 'havskilpadden', 'sea': 'havet',
  'girl on the sled': 'jenta på akebrettet', 'cabin': 'hytta', 'seal': 'selen', 'hole in the ice': 'hullet i isen', 'hiker': 'turgåeren', 'tent': 'teltet',
  'owl': 'ugla', 'oak tree': 'eiketreet', 'mail carrier': 'postbudet', 'mailbox': 'postkassen', 'bunny': 'kaninungen', 'Easter basket': 'påskekurven',
  'firefighter': 'brannmannen', 'fire truck': 'brannbilen', 'seagull': 'måken', 'fish': 'fisken', 'raccoon': 'vaskebjørnen', 'cooler': 'kjølebagen',
  'triceratops': 'triceratopsen', 'big tree': 'det store treet', 'farmer': 'bonden', 'tractor': 'traktoren', 'astronaut': 'astronauten', 'rocket': 'raketten',
  'pufferfish': 'kulefisken', 'shell': 'skjellet', 'robot': 'roboten', 'ice cream': 'isen', 'donkey': 'eselet', 'carrot': 'gulroten',
  'beaver': 'beveren', 'log': 'tømmerstokken', 'turkey': 'kalkunen', 'corn': 'maiskolben', 'skier': 'skiløperen', 'snowman': 'snømannen',
  'swan': 'svanen', 'nest': 'redet', 'macaw': 'papegøyen', 'banana': 'bananen', 'fox': 'reven', 'lantern': 'lykta',
  'hamster': 'hamsteren', 'apple': 'eplet', 'kitten': 'kattungen', 'milk': 'melka', 'crab': 'krabben', 'beach ball': 'badeballen',
  'ladybug': 'marihøna', 'sunflower': 'solsikken', 'penguin': 'pingvinen', 'igloo': 'igloen', 'turtle': 'skilpadden', 'flower': 'blomsten',
  'girl': 'jenta', 'swing': 'husken', 'chick': 'kyllingen', 'egg': 'egget', 'horse': 'hesten', 'hen': 'høna',
  'toy dinosaur': 'lekedinosauren', 'cake': 'kaka', 'bird': 'fuglen', 'birdhouse': 'fuglekassen', 'monkey': 'apen', 'rabbit': 'kaninen',
  'cabbage': 'kålhodet', 'seahorse': 'sjøhesten', 'seaweed': 'tangen', 'badger': 'grevlingen', 'chestnut tree': 'kastanjetreet', 'Santa': 'julenissen',
  'sleigh': 'sleden', 'llama': 'lamaen', 'rhino': 'neshornet', 'hippo': 'flodhesten', 'tortoise': 'skilpadden', 'watermelon': 'vannmelonen',
  'dinosaur': 'dinosauren', 'bear': 'bjørnen', 'honey': 'honningen', 'pelican': 'pelikanen', 'boat': 'båten', 'garbage truck': 'søppelbilen',
  'trash can': 'søppeldunken', 'canoe': 'kanoen', 'kayak': 'kajakken', 'ship': 'skipet', 'lighthouse': 'fyret', 'sailboat': 'seilbåten', 'island': 'øya',
  'beach hut': 'strandhytta', 'frog': 'frosken', 'puffin': 'lunden', 'lifeguard tower': 'livvakttårnet', 'house': 'huset', 'goose': 'gåsa',
  'cheese': 'osten', 'earthworm': 'meitemarken', 'leaf': 'bladet', 'gopher': 'gopheren', 'potato': 'poteten', 'gerbil': 'ørkenrotta', 'blueberry': 'blåbæret',
  'meerkat': 'surikaten', 'ferret': 'ilderen', 'ball': 'ballen', 'chipmunk': 'jordekornet', 'acorn': 'eikenøtta', 'ambulance': 'ambulansen', 'doctor': 'legen',
  'bus': 'bussen', 'boy': 'gutten', 'jeep': 'jeepen', 'surfboard': 'surfebrettet', 'motorcycle': 'motorsykkelen', 'garage': 'garasjen', 'van': 'varebilen',
  'package': 'pakken', 'cement mixer': 'betongbilen', 'builder': 'bygningsarbeideren', 'truck': 'lastebilen', 'forklift': 'gaffeltrucken', 'race car': 'racerbilen',
  'mechanic': 'mekanikeren', 'bee': 'bia', 'little girl': 'den lille jenta', 'basket': 'kurven', 'foal': 'føllet', 'porcupine': 'hulepinnsvinet', 'apple tree': 'epletreet',
  'hummingbird': 'kolibrien', 'cherry tree': 'kirsebærtreet', 'guinea pig': 'marsvinet', 'bowl': 'bollen', 'moon': 'månen', 'lemur': 'lemuren', 'elf': 'nissen',
  'sack': 'sekken', 'sandcastle': 'sandslottet', 'duckling': 'andungen', 'puddle': 'vannpytten', 'coral': 'korallen', 'planet': 'planeten',
  'snowboarder': 'snowboarderen', 'hot cocoa': 'den varme kakaoen', 'butterfly': 'sommerfuglen', 'rose': 'rosen', 'water lily': 'nøkkerosen', 'radish': 'reddiken',
  'toy car': 'lekebilen', 'little dinosaur': 'den lille dinosauren', 'ant': 'mauren', 'cookie': 'kjeksen', 'gazelle': 'gasellen', 'baobab tree': 'baobabtreet',
  'caterpillar': 'larven', 'toad': 'padda', 'dragonfly': 'øyenstikkeren', 'Earth': 'jorda', 'teddy bear': 'bamsen', 'cupcake': 'muffinsen', 'airplane': 'flyet',
  'rainbow': 'regnbuen', 'helicopter': 'helikopteret', 'mountain': 'fjellet', 'submarine': 'ubåten', 'whale': 'hvalen', 'toy train': 'leketoget',
  'camper': 'bobilen', 'bike': 'sykkelen', 'playground': 'lekeplassen', 'dragon': 'dragen', 'campfire': 'leirbålet', 'flying horse': 'den flyvende hesten',
  'sun': 'sola', 'oyster': 'østersen', 'monster truck': 'monstertrucken', 'big rock': 'den store steinen', 'octopus': 'blekkspruten', 'flamingo': 'flamingoen',
  'stork': 'storken', 'parrot': 'papegøyen', 'grapes': 'druene', 'koala': 'koalaen', 'kangaroo': 'kenguruen', 'bull': 'tyren', 'turnip': 'nepa', 'cow': 'kua',
  'clover': 'kløveren', 'deer': 'rådyret', 'bluebells': 'blåklokkene', 'dog': 'hunden', 'digger': 'gravemaskinen', 'rock': 'steinen', 'scooter': 'scooteren',
  'jet': 'jetflyet', 'cloud': 'skyen', 'eagle': 'ørnen', 'manatee': 'sjøkua', 'pineapple': 'ananasen', 'Christmas tree': 'juletreet',
  'toy helicopter': 'lekehelikopteret', 'blocks': 'klossene', 'bison': 'bisonen', 'wheat': 'hveten', 'sheep': 'sauen', 'grass': 'gresset',
  'moose': 'elgen', 'birch tree': 'bjørka', 'leopard': 'leoparden', 'alligator': 'alligatoren', 'goat': 'geita', 'lettuce': 'salaten', 'tall tree': 'det høye treet',
  'peacock': 'påfuglen', 'hat': 'hatten', 'doll': 'dukka', 'pudding': 'puddingen', 'reindeer': 'reinen', 'bell': 'bjella', 'chinchilla': 'chinchillaen',
  'raspberry': 'bringebæret', 'squid': 'blekkspruten', 'cat': 'katten', 'walnut tree': 'valnøttreet', 'bulldozer': 'bulldoseren', 'sand pile': 'sandhaugen',
  'toy truck': 'lekelastebilen', 'ferry': 'ferja', 'train': 'toget', 'backpack': 'ryggsekken', 'banana tree': 'banantreet', 'orange tree': 'appelsintreet',
  'cherry blossom': 'kirsebærblomsten', 'tiger': 'tigeren', 'toucan': 'tukanen', 'panda': 'pandaen', 'barn': 'låven', 'hay': 'høyet', 'mushroom': 'soppen',
  'pyramid': 'pyramiden', 'umbrella': 'paraplyen', 'starfish': 'sjøstjerna', 'vegetables': 'grønnsakene', 'hedgehog': 'pinnsvinet',
};
const COLLECT = { // [alle …, hver/hvert …, det mangler …]
  'hmx-collect-acorns': ['alle eikenøttene', 'hver eikenøtt', 'Det mangler en eikenøtt.'], 'hmx-collect-flowers': ['alle solsikkene', 'hver solsikke', 'Det mangler en solsikke.'],
  'hmx-collect-corn': ['alle maiskolbene', 'hver maiskolbe', 'Det mangler en maiskolbe.'], 'hmx-collect-fish': ['alle fiskene', 'hver fisk', 'Det mangler en fisk.'],
  'hmx-collect-shells': ['alle skjellene', 'hvert skjell', 'Det mangler et skjell.'], 'hmx-collect-strawberries': ['alle jordbærene', 'hvert jordbær', 'Det mangler et jordbær.'],
  'hmx-collect-stars': ['alle stjernene', 'hver stjerne', 'Det mangler en stjerne.'], 'hmx-collect-bananas': ['alle bananene', 'hver banan', 'Det mangler en banan.'],
  'hmx-collect-presents': ['alle gavene', 'hver gave', 'Det mangler en gave.'], 'hmx-collect-eggs': ['alle påskeeggene', 'hvert påskeegg', 'Det mangler et påskeegg.'],
  'hmx-collect-apples': ['alle eplene', 'hvert eple', 'Det mangler et eple.'], 'hmx-collect-hibiscus': ['alle blomstene', 'hver blomst', 'Det mangler en blomst.'],
};
const AVOID = { // [unngår …, en A eller en B]
  'hmx-avoid-duckling': ['reven', 'en rev eller en slange'], 'hmx-avoid-fish': ['haien', 'en hai eller en manet'], 'hmx-avoid-rocket': ['asteroidene', 'en asteroide eller en meteor'],
  'hmx-avoid-snowboard': ['steinene', 'en stein eller et tre'], 'hmx-avoid-butterfly': ['edderkoppen', 'en edderkopp eller en veps'], 'hmx-avoid-frog': ['hegren', 'en hegre eller en alligator'],
  'hmx-avoid-rabbit': ['hauken', 'en hauk eller en ulv'], 'hmx-avoid-toycar': ['vannpyttene', 'en vannpytt eller en steinhaug'], 'hmx-avoid-raptor': ['tyrannosauren', 'en tyrannosaur eller en steinhaug'],
  'hmx-avoid-penguin': ['spekkhoggeren', 'en spekkhogger eller et hull i isen'], 'hmx-avoid-ant': ['edderkoppen', 'en vannpytt eller en edderkopp'], 'hmx-avoid-gazelle': ['leoparden', 'en leopard eller en hyene'],
};
const HOP = { 'hmx-hop-frog': 'over nøkkerosebladene', 'hmx-hop-penguin': 'over isflakene', 'hmx-hop-caterpillar': 'over hagesteinene', 'hmx-hop-astronaut': 'gjennom verdensrommet', 'hmx-hop-teddy': 'over godterutene', 'hmx-hop-fox': 'over høstbladene' };
const COLOUR = { 'hmx-colour-pig': ['gården', 'gårdsbildet'], 'hmx-colour-horse': ['enga', 'engbildet'], 'hmx-colour-monkey': ['jungelen', 'jungelbildet'],
  'hmx-colour-penguin': ['isen', 'isbildet'], 'hmx-colour-hedgehog': ['blomsterenga', 'engbildet'], 'hmx-colour-turtle': ['stranden', 'strandbildet'],
  'hmx-colour-squirrel': ['skogen', 'skogsbildet'], 'hmx-colour-camel': ['ørkenen', 'ørkenbildet'], 'hmx-colour-frog': ['regnværsdagen', 'regnbildet'],
  'hmx-colour-octopus': ['havet', 'havbildet'], 'hmx-colour-bee': ['hagen', 'hagebildet'], 'hmx-colour-dog': ['huset', 'bildet med huset'],
  'hmx-colour-rocket': ['verdensrommet', 'rombildet'], 'hmx-colour-ambulance': ['byen', 'bybildet'], 'hmx-colour-snowman': ['vinteren', 'vinterbildet'],
  'hmx-colour-tractor': ['innhøstingen', 'innhøstingsbildet'] };
const BABIES = { 'hmx-babies-meadow': 'på enga', 'hmx-babies-sunset': 'i solnedgangen', 'hmx-babies-snow': 'i snøen', 'hmx-babies-orchard': 'i frukthagen', 'hmx-babies-spring': 'om våren', 'hmx-babies-wheat': 'i hveteåkeren' };
const STRINGS = { farm: 'på gården', beach: 'på stranden', snow: 'i snøen', savanna: 'på savannen', pets: 'i parken', dinos: 'hos dinosaurene', forest: 'i skogen', kids: 'på lekeplassen', jungle: 'i jungelen' };
const CUE = { 'hmx-sound-leopard': 'leopard', 'hmx-sound-tiger': 'tiger', 'hmx-sound-toucan': 'tukan', 'hmx-sound-tractor': 'traktor', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pelikan' };

function forms(key) {
  const s = NOUNS[key]; if (!s) throw new Error('no: no forms for "' + key + '"');
  return { def: s, gen: /[sxz]$/.test(s) ? s : s + 's' };
}
function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Labyrint for barn: ${H.def} og ${G.def}`, printTitle: `Hjelp ${H.def} fram til ${G.def}`, instruction: `Hjelp ${H.def} fram til ${G.def}. Tegn en strek langs veien.`, tap: `Start ved den grønne sirkelen med pilen. Dra langs veien fram til ${G.def}.` };
    case 'first-maze': return { title: `Min første labyrint: ${H.def} og ${G.def}`, printTitle: `Hjelp ${H.def} fram til ${G.def}`, instruction: `Hjelp ${H.def} fram til ${G.def}. Tegn en strek på den brede veien, og hold deg innenfor kantene.`, tap: `Start ved den grønne sirkelen. Dra på den brede veien fram til ${G.def}.` };
    case 'big-maze': return { title: `Stor labyrint 2. trinn: ${H.def} og ${G.def}`, printTitle: `Hjelp ${H.def} med å finne ${G.def}`, instruction: `Se først på hele labyrinten. Tegn så ${H.gen} vei fram til ${G.def}.`, tap: `Se først, og dra så fra den grønne sirkelen fram til ${G.def}. Hvis en vei stopper, gå tilbake.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Elvelabyrint: ${H.def} og ${G.def}`, printTitle: swim ? `Hjelp ${H.def} med å svømme fram til ${G.def}` : `Styr ${H.def} fram til ${G.def}`, instruction: `${swim ? `Hjelp ${H.def} med å svømme` : `Styr ${H.def}`} gjennom vannet fram til ${G.def}. Tegn en strek gjennom vannet.`, tap: `Start ved den grønne sirkelen. Dra gjennom vannet fram til ${G.def}.` }; }
    case 'burrow': return { title: `Labyrint under jorda: ${H.def} og ${G.def}`, printTitle: `Hjelp ${H.def} fram til ${G.def}`, instruction: `Hjelp ${H.def} ned og opp gjennom gangene fram til ${G.def}. Tegn en strek langs veien.`, tap: `Start ved den grønne sirkelen. Dra gjennom gangene fram til ${G.def}.` };
    case 'shortest-way': return { title: `Bylabyrint: ${H.def} og den korteste veien`, printTitle: `Den korteste veien til ${G.def}`, instruction: `Mange gater fører til ${G.def}. Tegn den korteste veien for ${H.def}, og skriv hvor mange gatebiter det er.`, tap: `Dra den korteste veien fra den grønne sirkelen fram til ${G.def}.` };
    case 'babies-mothers': return { title: `Labyrint: ungene finner mammaene sine ${BABIES[sk.id]}`, printTitle: 'Hjelp hver unge med å finne mammaen sin', instruction: 'Hjelp hver dyreunge med å finne sin egen mamma. Tegn en strek fra hver unge fram til mammaen dens.', tap: 'Dra fra hver unge fram til dens egen mamma.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'dragen' : kites === 0 ? 'ballongen' : 'dragen eller ballongen';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      return { title: `Floker ${where}: hvem eier ${what}?`, printTitle: `Hvem eier ${what}?`,
        instruction: kids ? `Følg hver snor fra et barn eller en leke fram til ${what} dens. Skriv nummeret i ruten over.` : `Følg hver snor fra et dyr fram til ${what} dens. Skriv dyrets nummer i ruten over.`,
        tap: kids ? `Dra langs hver snor fra barnet eller leken fram til ${what} dens.` : `Dra langs hver snor fra dyret fram til ${what} dens.` };
    }
    case 'collect': { const [all, each, missed] = COLLECT[sk.id]; return { title: `Labyrint: ${H.def} samler ${all}`, printTitle: `Hjelp ${H.def} med å samle ${all}`, instruction: `Hjelp ${H.def} fram til ${G.def}, og saml ${each} uten å gå samme vei to ganger. Sett kryss i en sirkel for ${each}.`, tap: `Dra fra den grønne sirkelen fram til ${G.def}. Gå innom ${each}.`, missed: missed + ' Se på den røde sirkelen.' }; }
    case 'avoid': { const [t, one] = AVOID[sk.id]; return { title: `Labyrint: ${H.def} unngår ${t}`, printTitle: `Få ${H.def} trygt fram til ${G.def}`, instruction: `Hjelp ${H.def} fram til ${G.def}. Ikke ta en vei der det er ${one}.`, tap: `Dra fra den grønne sirkelen fram til ${G.def}. Ikke ta en vei med ${one}.` }; }
    case 'letter-hop': return { title: `Hopp i alfabetisk rekkefølge: ${H.def} ${HOP[sk.id]}`, printTitle: `Hopp ${HOP[sk.id]} i alfabetisk rekkefølge`, instruction: 'Start i ruten som pilen peker på. Fargelegg neste bokstav i alfabetet i en rute ved siden av, helt til {LAST}.', tap: 'Start ved den grønne sirkelen. Dra rute for rute til neste bokstav i alfabetet.' };
    case 'abc-capitals': return { title: `Alfabetlabyrint fra A til Å: ${H.def} og ${G.def}`, printTitle: `Fra A til Å med ${H.def} fram til ${G.def}`, instruction: `Hjelp ${H.def} fram til ${G.def}. Gå ved hvert veiskille til steinen med neste bokstav i alfabetet.`, tap: 'Start ved den grønne sirkelen. Dra ved hvert veiskille til neste bokstav.' };
    case 'abc-lowercase': return { title: `Labyrint med små bokstaver: ${H.def}`, printTitle: `Fra a til å med ${H.def} fram til ${G.def}`, instruction: `Hjelp ${H.def} fram til ${G.def}. Gå ved hvert veiskille til steinen med neste lille bokstav.`, tap: 'Start ved den grønne sirkelen. Dra ved hvert veiskille til neste lille bokstav.' };
    case 'numbers-20': return { title: `Labyrint med tall 1-20: ${H.def} og ${G.def}`, printTitle: `Tell med ${H.def} fram til ${G.def}`, instruction: `Hjelp ${H.def} fram til ${G.def}. Gå ved hvert veiskille til neste tall, fra 1 til 20.`, tap: 'Start ved den grønne sirkelen. Dra ved hvert veiskille til neste tall.' };
    case 'skip-5': return { title: `Tell fem og fem: ${H.def} og ${G.def}`, printTitle: `Tell fem og fem fram til ${G.def}`, instruction: `Hjelp ${H.def} fram til ${G.def}. Tell fem og fem fra stein til stein, helt til 100.`, tap: 'Start ved den grønne sirkelen. Dra fra stein til stein, og tell fem og fem.' };
    case 'make-10': return { title: `Mattelabyrint 2. trinn: tiervenner med ${H.def}`, printTitle: 'Gå bare på regnestykkene som blir 10', instruction: `Hjelp ${H.def} fram til ${G.def}. Gå bare på steinene der summen er 10.`, tap: 'Start ved den grønne sirkelen. Dra bare over steinene som blir 10.' };
    case 'subtract-20': return { title: `Minus til 20: ${H.def} og ${G.def}`, printTitle: `Hjelp ${H.def} fram til ${G.def}`, instruction: `Se på tallet ved ${H.def}. Gå bare på steinene der svaret er det tallet.`, tap: `Start ved den grønne sirkelen. Dra bare over steinene der svaret er ${H.gen} tall.` };
    case 'running-total': return { title: `Pluss og minus til 100: ${H.def} og ${G.def}`, printTitle: `Regn underveis fram til ${G.def}`, instruction: `Start med ${H.gen} tall, og skriv det nye tallet i hver rute. Finn veien som slutter på ${G.gen} tall.`, tap: `Start ved den grønne sirkelen. Dra langs veien som slutter på ${G.gen} tall.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Labyrint med første lyd: som ${c}`, printTitle: `Bilder som begynner som ${c}`, instruction: `Si navnet på hvert bilde. Gå bare på bilder som begynner med samme lyd som ${c}.`, tap: `Start ved den grønne sirkelen. Dra bare over bilder som begynner som ${c}.` }; }
    case 'maze-colouring': { const [place, bil] = COLOUR[sk.id]; return { title: `Labyrint til fargelegging: ${H.def} og ${G.def}`, printTitle: `Løs labyrinten, og fargelegg ${place}`, instruction: `Tegn ${H.gen} vei fram til ${G.def}, og fargelegg hele veien. Fargelegg så ${bil}.`, tap: `Start ved den grønne sirkelen. Dra langs veien fram til ${G.def}.` }; }
    default: throw new Error('no: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
