/**
 * data/hmx/text-src/sv.js — Swedish words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: the DEFINITE form, written out ('igelkotten', 'lammet', 'vindruvorna'); the genitive adds -s (a noun already
 * ending in s / x / z takes none). Templates follow the published Swedish face strings (i18n/strings.sv.json).
 */
'use strict';
const NOUNS = {
  'lamb': 'lammet', 'haystack': 'höstacken', 'pig': 'grisen', 'mud puddle': 'lerpölen', 'ox': 'oxen', 'apple basket': 'äppelkorgen',
  'snail': 'snigeln', 'strawberry': 'jordgubben', 'boy on the bike': 'pojken på cykeln', 'slide': 'rutschkanan', 'duck': 'ankan', 'bread': 'brödet',
  'squirrel': 'ekorren', 'pine cone': 'kotten', 'mouse': 'musen', 'pumpkin': 'pumpan', 'sloth': 'sengångaren', 'tree': 'trädet',
  'zebra': 'zebran', 'elephant': 'elefanten', 'camel': 'kamelen', 'palm tree': 'palmen', 'sea turtle': 'havssköldpaddan', 'sea': 'havet',
  'girl on the sled': 'flickan på pulkan', 'cabin': 'stugan', 'seal': 'sälen', 'hole in the ice': 'vaken i isen', 'hiker': 'vandraren', 'tent': 'tältet',
  'owl': 'ugglan', 'oak tree': 'eken', 'mail carrier': 'brevbäraren', 'mailbox': 'brevlådan', 'bunny': 'kaninungen', 'Easter basket': 'påskkorgen',
  'firefighter': 'brandmannen', 'fire truck': 'brandbilen', 'seagull': 'måsen', 'fish': 'fisken', 'raccoon': 'tvättbjörnen', 'cooler': 'kylväskan',
  'triceratops': 'triceratopsen', 'big tree': 'det stora trädet', 'farmer': 'bonden', 'tractor': 'traktorn', 'astronaut': 'astronauten', 'rocket': 'raketen',
  'pufferfish': 'blåsfisken', 'shell': 'snäckan', 'robot': 'roboten', 'ice cream': 'glassen', 'donkey': 'åsnan', 'carrot': 'moroten',
  'beaver': 'bävern', 'log': 'stocken', 'turkey': 'kalkonen', 'corn': 'majskolven', 'skier': 'skidåkaren', 'snowman': 'snögubben',
  'swan': 'svanen', 'nest': 'boet', 'macaw': 'papegojan', 'banana': 'bananen', 'fox': 'räven', 'lantern': 'lyktan',
  'hamster': 'hamstern', 'apple': 'äpplet', 'kitten': 'kattungen', 'milk': 'mjölken', 'crab': 'krabban', 'beach ball': 'badbollen',
  'ladybug': 'nyckelpigan', 'sunflower': 'solrosen', 'penguin': 'pingvinen', 'igloo': 'igloon', 'turtle': 'sköldpaddan', 'flower': 'blomman',
  'girl': 'flickan', 'swing': 'gungan', 'chick': 'kycklingen', 'egg': 'ägget', 'horse': 'hästen', 'hen': 'hönan',
  'toy dinosaur': 'leksaksdinosaurien', 'cake': 'tårtan', 'bird': 'fågeln', 'birdhouse': 'fågelholken', 'monkey': 'apan', 'rabbit': 'kaninen',
  'cabbage': 'kålhuvudet', 'seahorse': 'sjöhästen', 'seaweed': 'tången', 'badger': 'grävlingen', 'chestnut tree': 'kastanjen', 'Santa': 'tomten',
  'sleigh': 'släden', 'llama': 'laman', 'rhino': 'noshörningen', 'hippo': 'flodhästen', 'tortoise': 'sköldpaddan', 'watermelon': 'vattenmelonen',
  'dinosaur': 'dinosaurien', 'bear': 'björnen', 'honey': 'honungen', 'pelican': 'pelikanen', 'boat': 'båten', 'garbage truck': 'sopbilen',
  'trash can': 'soptunnan', 'canoe': 'kanoten', 'kayak': 'kajaken', 'ship': 'fartyget', 'lighthouse': 'fyren', 'sailboat': 'segelbåten', 'island': 'ön',
  'beach hut': 'badhytten', 'frog': 'grodan', 'puffin': 'lunnefågeln', 'lifeguard tower': 'livräddartornet', 'house': 'huset', 'goose': 'gåsen',
  'cheese': 'osten', 'earthworm': 'daggmasken', 'leaf': 'lövet', 'gopher': 'kindpåsråttan', 'potato': 'potatisen', 'gerbil': 'ökenråttan', 'blueberry': 'blåbäret',
  'meerkat': 'surikaten', 'ferret': 'illern', 'ball': 'bollen', 'chipmunk': 'jordekorren', 'acorn': 'ekollonet', 'ambulance': 'ambulansen', 'doctor': 'doktorn',
  'bus': 'bussen', 'boy': 'pojken', 'jeep': 'jeepen', 'surfboard': 'surfbrädan', 'motorcycle': 'motorcykeln', 'garage': 'garaget', 'van': 'skåpbilen',
  'package': 'paketet', 'cement mixer': 'betongbilen', 'builder': 'byggarbetaren', 'truck': 'lastbilen', 'forklift': 'gaffeltrucken', 'race car': 'racerbilen',
  'mechanic': 'mekanikern', 'bee': 'biet', 'little girl': 'den lilla flickan', 'basket': 'korgen', 'foal': 'fölet', 'porcupine': 'piggsvinet', 'apple tree': 'äppelträdet',
  'hummingbird': 'kolibrin', 'cherry tree': 'körsbärsträdet', 'guinea pig': 'marsvinet', 'bowl': 'skålen', 'moon': 'månen', 'lemur': 'lemuren', 'elf': 'tomtenissen',
  'sack': 'säcken', 'sandcastle': 'sandslottet', 'duckling': 'ankungen', 'puddle': 'vattenpölen', 'coral': 'korallen', 'planet': 'planeten',
  'snowboarder': 'snowboardåkaren', 'hot cocoa': 'den varma chokladen', 'butterfly': 'fjärilen', 'rose': 'rosen', 'water lily': 'näckrosen', 'radish': 'rädisan',
  'toy car': 'leksaksbilen', 'little dinosaur': 'den lilla dinosaurien', 'ant': 'myran', 'cookie': 'kakan', 'gazelle': 'gasellen', 'baobab tree': 'baobabträdet',
  'caterpillar': 'larven', 'toad': 'paddan', 'dragonfly': 'trollsländan', 'Earth': 'jorden', 'teddy bear': 'nallen', 'cupcake': 'muffinsen', 'airplane': 'flygplanet',
  'rainbow': 'regnbågen', 'helicopter': 'helikoptern', 'mountain': 'berget', 'submarine': 'ubåten', 'whale': 'valen', 'toy train': 'leksakståget',
  'camper': 'husbilen', 'bike': 'cykeln', 'playground': 'lekplatsen', 'dragon': 'draken', 'campfire': 'lägerelden', 'flying horse': 'den flygande hästen',
  'sun': 'solen', 'oyster': 'ostronet', 'monster truck': 'monstertrucken', 'big rock': 'det stora stenblocket', 'octopus': 'bläckfisken', 'flamingo': 'flamingon',
  'stork': 'storken', 'parrot': 'papegojan', 'grapes': 'vindruvorna', 'koala': 'koalan', 'kangaroo': 'kängurun', 'bull': 'tjuren', 'turnip': 'rovan', 'cow': 'kon',
  'clover': 'klövern', 'deer': 'rådjuret', 'bluebells': 'blåklockorna', 'dog': 'hunden', 'digger': 'grävmaskinen', 'rock': 'stenen', 'scooter': 'vespan',
  'jet': 'jetplanet', 'cloud': 'molnet', 'eagle': 'örnen', 'manatee': 'sjökon', 'pineapple': 'ananasen', 'Christmas tree': 'julgranen',
  'toy helicopter': 'leksakshelikoptern', 'blocks': 'klossarna', 'bison': 'bisonoxen', 'wheat': 'vetet', 'sheep': 'fåret', 'grass': 'gräset',
  'moose': 'älgen', 'birch tree': 'björken', 'leopard': 'leoparden', 'alligator': 'alligatorn', 'goat': 'geten', 'lettuce': 'salladen', 'tall tree': 'det höga trädet',
  'peacock': 'påfågeln', 'hat': 'hatten', 'doll': 'dockan', 'pudding': 'puddingen', 'reindeer': 'renen', 'bell': 'klockan', 'chinchilla': 'chinchillan',
  'raspberry': 'hallonet', 'squid': 'bläckfisken', 'cat': 'katten', 'walnut tree': 'valnötsträdet', 'bulldozer': 'bulldozern', 'sand pile': 'sandhögen',
  'toy truck': 'leksakslastbilen', 'ferry': 'färjan', 'train': 'tåget', 'backpack': 'ryggsäcken', 'banana tree': 'bananträdet', 'orange tree': 'apelsinträdet',
  'cherry blossom': 'körsbärsblomman', 'tiger': 'tigern', 'toucan': 'tukanen', 'panda': 'pandan', 'barn': 'ladan', 'hay': 'höet', 'mushroom': 'svampen',
  'pyramid': 'pyramiden', 'umbrella': 'paraplyet', 'starfish': 'sjöstjärnan', 'vegetables': 'grönsakerna', 'hedgehog': 'igelkotten',
};
const COLLECT = { // [alla …, varje …, … saknas]
  'hmx-collect-acorns': ['alla ekollon', 'varje ekollon', 'Ett ekollon saknas.'], 'hmx-collect-flowers': ['alla solrosor', 'varje solros', 'En solros saknas.'],
  'hmx-collect-corn': ['alla majskolvar', 'varje majskolv', 'En majskolv saknas.'], 'hmx-collect-fish': ['alla fiskar', 'varje fisk', 'En fisk saknas.'],
  'hmx-collect-shells': ['alla snäckor', 'varje snäcka', 'En snäcka saknas.'], 'hmx-collect-strawberries': ['alla jordgubbar', 'varje jordgubbe', 'En jordgubbe saknas.'],
  'hmx-collect-stars': ['alla stjärnor', 'varje stjärna', 'En stjärna saknas.'], 'hmx-collect-bananas': ['alla bananer', 'varje banan', 'En banan saknas.'],
  'hmx-collect-presents': ['alla paket', 'varje paket', 'Ett paket saknas.'], 'hmx-collect-eggs': ['alla påskägg', 'varje påskägg', 'Ett påskägg saknas.'],
  'hmx-collect-apples': ['alla äpplen', 'varje äpple', 'Ett äpple saknas.'], 'hmx-collect-hibiscus': ['alla blommor', 'varje blomma', 'En blomma saknas.'],
};
const AVOID = { // [undviker …, en A eller en B]
  'hmx-avoid-duckling': ['räven', 'en räv eller en orm'], 'hmx-avoid-fish': ['hajen', 'en haj eller en manet'], 'hmx-avoid-rocket': ['asteroiderna', 'en asteroid eller en meteor'],
  'hmx-avoid-snowboard': ['stenarna', 'en sten eller ett träd'], 'hmx-avoid-butterfly': ['spindeln', 'en spindel eller en geting'], 'hmx-avoid-frog': ['hägern', 'en häger eller en alligator'],
  'hmx-avoid-rabbit': ['höken', 'en hök eller en varg'], 'hmx-avoid-toycar': ['vattenpölarna', 'en vattenpöl eller en stenhög'], 'hmx-avoid-raptor': ['tyrannosaurien', 'en tyrannosaurie eller en stenhög'],
  'hmx-avoid-penguin': ['späckhuggaren', 'en späckhuggare eller en vak'], 'hmx-avoid-ant': ['spindeln', 'en vattenpöl eller en spindel'], 'hmx-avoid-gazelle': ['leoparden', 'en leopard eller en hyena'],
};
const HOP = { 'hmx-hop-frog': 'över näckrosbladen', 'hmx-hop-penguin': 'över isflaken', 'hmx-hop-caterpillar': 'över trädgårdsstenarna', 'hmx-hop-astronaut': 'genom rymden', 'hmx-hop-teddy': 'över godisrutorna', 'hmx-hop-fox': 'över höstlöven' };
const COLOUR = { 'hmx-colour-pig': ['bondgården', 'bondgårdsbilden'], 'hmx-colour-horse': ['ängen', 'ängsbilden'], 'hmx-colour-monkey': ['djungeln', 'djungelbilden'],
  'hmx-colour-penguin': ['isen', 'isbilden'], 'hmx-colour-hedgehog': ['blomsterängen', 'ängsbilden'], 'hmx-colour-turtle': ['stranden', 'strandbilden'],
  'hmx-colour-squirrel': ['skogen', 'skogsbilden'], 'hmx-colour-camel': ['öknen', 'ökenbilden'], 'hmx-colour-frog': ['regndagen', 'regnbilden'],
  'hmx-colour-octopus': ['havet', 'havsbilden'], 'hmx-colour-bee': ['trädgården', 'trädgårdsbilden'], 'hmx-colour-dog': ['huset', 'bilden med huset'],
  'hmx-colour-rocket': ['rymden', 'rymdbilden'], 'hmx-colour-ambulance': ['staden', 'stadsbilden'], 'hmx-colour-snowman': ['vintern', 'vinterbilden'],
  'hmx-colour-tractor': ['skörden', 'skördebilden'] };
const BABIES = { 'hmx-babies-meadow': 'på ängen', 'hmx-babies-sunset': 'i solnedgången', 'hmx-babies-snow': 'i snön', 'hmx-babies-orchard': 'i fruktträdgården', 'hmx-babies-spring': 'på våren', 'hmx-babies-wheat': 'i vetefältet' };
const STRINGS = { farm: 'på bondgården', beach: 'på stranden', snow: 'i snön', savanna: 'på savannen', pets: 'i parken', dinos: 'hos dinosaurierna', forest: 'i skogen', kids: 'på lekplatsen', jungle: 'i djungeln' };
const CUE = { 'hmx-sound-leopard': 'leopard', 'hmx-sound-tiger': 'tiger', 'hmx-sound-toucan': 'tukan', 'hmx-sound-tractor': 'traktor', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pelikan' };

function forms(key) {
  const s = NOUNS[key]; if (!s) throw new Error('sv: no forms for "' + key + '"');
  const gen = /[sxz]$/.test(s) ? s : s + 's';
  return { def: s, Def: s[0].toUpperCase() + s.slice(1), gen };
}
function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Labyrint för barn: ${H.def} och ${G.def}`, printTitle: `Hjälp ${H.def} till ${G.def}`, instruction: `Hjälp ${H.def} att komma till ${G.def}. Rita en linje längs vägen.`, tap: `Börja vid den gröna cirkeln med pilen. Dra längs vägen fram till ${G.def}.` };
    case 'first-maze': return { title: `Min första labyrint: ${H.def} och ${G.def}`, printTitle: `Hjälp ${H.def} till ${G.def}`, instruction: `Hjälp ${H.def} att komma till ${G.def}. Rita en linje på den breda vägen och håll dig innanför kanterna.`, tap: `Börja vid den gröna cirkeln. Dra på den breda vägen fram till ${G.def}.` };
    case 'big-maze': return { title: `Stor labyrint åk 1: ${H.def} och ${G.def}`, printTitle: `Hjälp ${H.def} att hitta ${G.def}`, instruction: `Titta först på hela labyrinten. Rita sedan ${H.gen} väg till ${G.def}.`, tap: `Titta först och dra sedan från den gröna cirkeln till ${G.def}. Tar en väg slut, gå tillbaka.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Flodlabyrint: ${H.def} och ${G.def}`, printTitle: swim ? `Hjälp ${H.def} att simma till ${G.def}` : `Styr ${H.def} till ${G.def}`, instruction: `${swim ? `Hjälp ${H.def} att simma` : `Styr ${H.def}`} genom vattnet till ${G.def}. Rita en linje genom vattnet.`, tap: `Börja vid den gröna cirkeln. Dra genom vattnet fram till ${G.def}.` }; }
    case 'burrow': return { title: `Labyrint under jorden: ${H.def} och ${G.def}`, printTitle: `Hjälp ${H.def} till ${G.def}`, instruction: `Hjälp ${H.def} att ta sig ner och upp genom gångarna till ${G.def}. Rita en linje längs vägen.`, tap: `Börja vid den gröna cirkeln. Dra genom gångarna fram till ${G.def}.` };
    case 'shortest-way': return { title: `Stadslabyrint: ${H.def} och kortaste vägen`, printTitle: `Kortaste vägen till ${G.def}`, instruction: `Många gator leder till ${G.def}. Rita den kortaste vägen för ${H.def} och skriv hur många gatubitar det är.`, tap: `Dra den kortaste vägen från den gröna cirkeln till ${G.def}.` };
    case 'babies-mothers': return { title: `Labyrint: ungarna hittar sina mammor ${BABIES[sk.id]}`, printTitle: 'Hjälp varje unge att hitta sin mamma', instruction: 'Hjälp varje djurunge att hitta sin egen mamma. Rita en linje från varje unge till dess mamma.', tap: 'Dra från varje unge till dess egen mamma.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'drake' : kites === 0 ? 'ballong' : 'drake eller ballong'; const whatT = balloons === 0 ? 'drake är det' : kites === 0 ? 'ballong är det' : 'snöre är vilket';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      const t = kites && balloons ? `Trassliga snören ${where}: vems drake eller ballong?` : `Trassliga snören ${where}: vems ${whatT}?`;
      return { title: t, printTitle: kites && balloons ? 'Vems drake eller ballong?' : `Vems ${whatT}?`,
        instruction: kids ? `Följ varje snöre från ett barn eller en leksak till dess ${what}. Skriv numret i rutan ovanför.` : `Följ varje snöre från ett djur till dess ${what}. Skriv djurets nummer i rutan ovanför.`,
        tap: kids ? `Dra längs varje snöre från barnet eller leksaken till dess ${what}.` : `Dra längs varje snöre från djuret till dess ${what}.` };
    }
    case 'collect': { const [all, each, missed] = COLLECT[sk.id]; return { title: `Labyrint: ${H.def} samlar ${all}`, printTitle: `Hjälp ${H.def} att samla ${all}`, instruction: `Hjälp ${H.def} till ${G.def} och samla ${each} utan att gå samma väg två gånger. Kryssa i en cirkel för ${each}.`, tap: `Dra från den gröna cirkeln till ${G.def}. Gå via ${each}.`, missed: missed + ' Titta på den röda cirkeln.' }; }
    case 'avoid': { const [t, one] = AVOID[sk.id]; return { title: `Labyrint: ${H.def} undviker ${t}`, printTitle: `Hjälp ${H.def} säkert till ${G.def}`, instruction: `Hjälp ${H.def} till ${G.def}. Ta ingen väg där det finns ${one}.`, tap: `Dra från den gröna cirkeln till ${G.def}. Ta ingen väg med ${one}.` }; }
    case 'letter-hop': return { title: `Hoppa i bokstavsordning: ${H.def} ${HOP[sk.id]}`, printTitle: `Hoppa ${HOP[sk.id]} i bokstavsordning`, instruction: 'Börja i rutan som pilen pekar på. Färglägg nästa bokstav i alfabetet i en ruta bredvid, en i taget, ända till {LAST}.', tap: 'Börja vid den gröna cirkeln. Dra ruta för ruta till nästa bokstav i alfabetet.' };
    case 'abc-capitals': return { title: `Labyrint från A till Ö: ${H.def} och ${G.def}`, printTitle: `Från A till Ö med ${H.def} till ${G.def}`, instruction: `Hjälp ${H.def} att komma till ${G.def}. Vid varje vägskäl går du till stenen med nästa bokstav i alfabetet.`, tap: 'Börja vid den gröna cirkeln. Vid varje vägskäl drar du till nästa bokstav.' };
    case 'abc-lowercase': return { title: `Labyrint med små bokstäver: ${H.def}`, printTitle: `Från a till ö med ${H.def} till ${G.def}`, instruction: `Hjälp ${H.def} att komma till ${G.def}. Vid varje vägskäl går du till stenen med nästa lilla bokstav.`, tap: 'Börja vid den gröna cirkeln. Vid varje vägskäl drar du till nästa lilla bokstav.' };
    case 'numbers-20': return { title: `Sifferlabyrint 1–20: ${H.def} och ${G.def}`, printTitle: `Räkna med ${H.def} till ${G.def}`, instruction: `Hjälp ${H.def} att komma till ${G.def}. Vid varje vägskäl går du till nästa tal, från 1 till 20.`, tap: 'Börja vid den gröna cirkeln. Vid varje vägskäl drar du till nästa tal.' };
    case 'skip-5': return { title: `Räkna fem i taget: ${H.def} och ${G.def}`, printTitle: `Räkna fem i taget till ${G.def}`, instruction: `Hjälp ${H.def} till ${G.def}. Räkna fem i taget från sten till sten, ända till 100.`, tap: 'Börja vid den gröna cirkeln. Dra från sten till sten och räkna fem i taget.' };
    case 'make-10': return { title: `Mattelabyrint åk 1: tiokamrater med ${H.def}`, printTitle: 'Gå bara på uppgifterna som blir 10', instruction: `Hjälp ${H.def} till ${G.def}. Gå bara på stenarna där summan blir 10.`, tap: 'Börja vid den gröna cirkeln. Dra bara över stenarna som blir 10.' };
    case 'subtract-20': return { title: `Minus inom 20: ${H.def} och ${G.def}`, printTitle: `Hjälp ${H.def} till ${G.def}`, instruction: `Titta på talet vid ${H.def}. Gå bara på stenarna där svaret är det talet.`, tap: `Börja vid den gröna cirkeln. Dra bara över stenarna där svaret är ${H.gen} tal.` };
    case 'running-total': return { title: `Plus och minus till 100: ${H.def} och ${G.def}`, printTitle: `Räkna på vägen till ${G.def}`, instruction: `Börja med ${H.gen} tal och skriv det nya talet i varje ruta. Hitta vägen som slutar på ${G.gen} tal.`, tap: `Börja vid den gröna cirkeln. Dra längs vägen som slutar på ${G.gen} tal.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Labyrint med första ljudet: som ${c}`, printTitle: `Bilder som börjar som ${c}`, instruction: `Säg namnet på varje bild. Gå bara på bilder som börjar med samma ljud som ${c}.`, tap: `Börja vid den gröna cirkeln. Dra bara över bilder som börjar som ${c}.` }; }
    case 'maze-colouring': { const [place, bild] = COLOUR[sk.id]; return { title: `Labyrint att färglägga: ${H.def} och ${G.def}`, printTitle: `Lös labyrinten och färglägg ${place}`, instruction: `Rita ${H.gen} väg till ${G.def} och färglägg hela vägen. Färglägg sedan ${bild}.`, tap: `Börja vid den gröna cirkeln. Dra längs vägen fram till ${G.def}.` }; }
    default: throw new Error('sv: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
