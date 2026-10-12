/**
 * data/hmx/text-src/nl.js — Dutch words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: the noun with its definite article ('de egel', 'het lam', 'de druiven'). Possession as "van de …".
 * Templates follow the published Dutch face strings (i18n/strings.nl.json).
 */
'use strict';
const NOUNS = {
  'lamb': 'het lammetje', 'haystack': 'de hooiberg', 'pig': 'het varken', 'mud puddle': 'de modderplas', 'ox': 'de os', 'apple basket': 'de appelmand',
  'snail': 'de slak', 'strawberry': 'de aardbei', 'boy on the bike': 'de jongen op de fiets', 'slide': 'de glijbaan', 'duck': 'de eend', 'bread': 'het brood',
  'squirrel': 'de eekhoorn', 'pine cone': 'de dennenappel', 'mouse': 'de muis', 'pumpkin': 'de pompoen', 'sloth': 'de luiaard', 'tree': 'de boom',
  'zebra': 'de zebra', 'elephant': 'de olifant', 'camel': 'de kameel', 'palm tree': 'de palmboom', 'sea turtle': 'de zeeschildpad', 'sea': 'de zee',
  'girl on the sled': 'het meisje op de slee', 'cabin': 'de hut', 'seal': 'de zeehond', 'hole in the ice': 'het wak in het ijs', 'hiker': 'de wandelaar', 'tent': 'de tent',
  'owl': 'de uil', 'oak tree': 'de eik', 'mail carrier': 'de postbode', 'mailbox': 'de brievenbus', 'bunny': 'het konijntje', 'Easter basket': 'het paasmandje',
  'firefighter': 'de brandweerman', 'fire truck': 'de brandweerauto', 'seagull': 'de meeuw', 'fish': 'de vis', 'raccoon': 'de wasbeer', 'cooler': 'de koelbox',
  'triceratops': 'de triceratops', 'big tree': 'de grote boom', 'farmer': 'de boer', 'tractor': 'de tractor', 'astronaut': 'de astronaut', 'rocket': 'de raket',
  'pufferfish': 'de kogelvis', 'shell': 'de schelp', 'robot': 'de robot', 'ice cream': 'het ijsje', 'donkey': 'de ezel', 'carrot': 'de wortel',
  'beaver': 'de bever', 'log': 'de boomstam', 'turkey': 'de kalkoen', 'corn': 'de maïskolf', 'skier': 'de skiër', 'snowman': 'de sneeuwpop',
  'swan': 'de zwaan', 'nest': 'het nest', 'macaw': 'de papegaai', 'banana': 'de banaan', 'fox': 'de vos', 'lantern': 'de lantaarn',
  'hamster': 'de hamster', 'apple': 'de appel', 'kitten': 'het poesje', 'milk': 'de melk', 'crab': 'de krab', 'beach ball': 'de strandbal',
  'ladybug': 'het lieveheersbeestje', 'sunflower': 'de zonnebloem', 'penguin': 'de pinguïn', 'igloo': 'de iglo', 'turtle': 'de schildpad', 'flower': 'de bloem',
  'girl': 'het meisje', 'swing': 'de schommel', 'chick': 'het kuikentje', 'egg': 'het ei', 'horse': 'het paard', 'hen': 'de kip',
  'toy dinosaur': 'de speelgoeddino', 'cake': 'de taart', 'bird': 'het vogeltje', 'birdhouse': 'het vogelhuisje', 'monkey': 'de aap', 'rabbit': 'het konijn',
  'cabbage': 'de kool', 'seahorse': 'het zeepaardje', 'seaweed': 'het zeewier', 'badger': 'de das', 'chestnut tree': 'de kastanjeboom', 'Santa': 'de kerstman',
  'sleigh': 'de slee', 'llama': 'de lama', 'rhino': 'de neushoorn', 'hippo': 'het nijlpaard', 'tortoise': 'de schildpad', 'watermelon': 'de watermeloen',
  'dinosaur': 'de dinosaurus', 'bear': 'de beer', 'honey': 'de honing', 'pelican': 'de pelikaan', 'boat': 'de boot', 'garbage truck': 'de vuilniswagen',
  'trash can': 'de vuilnisbak', 'canoe': 'de kano', 'kayak': 'de kajak', 'ship': 'het schip', 'lighthouse': 'de vuurtoren', 'sailboat': 'de zeilboot', 'island': 'het eiland',
  'beach hut': 'het strandhuisje', 'frog': 'de kikker', 'puffin': 'de papegaaiduiker', 'lifeguard tower': 'de reddingstoren', 'house': 'het huis', 'goose': 'de gans',
  'cheese': 'de kaas', 'earthworm': 'de regenworm', 'leaf': 'het blad', 'gopher': 'de goffer', 'potato': 'de aardappel', 'gerbil': 'de woestijnrat', 'blueberry': 'de blauwe bes',
  'meerkat': 'het stokstaartje', 'ferret': 'de fret', 'ball': 'de bal', 'chipmunk': 'de wangzakeekhoorn', 'acorn': 'de eikel', 'ambulance': 'de ambulance', 'doctor': 'de dokter',
  'bus': 'de bus', 'boy': 'de jongen', 'jeep': 'de jeep', 'surfboard': 'de surfplank', 'motorcycle': 'de motor', 'garage': 'de garage', 'van': 'het busje',
  'package': 'het pakketje', 'cement mixer': 'de betonmixer', 'builder': 'de bouwvakker', 'truck': 'de vrachtwagen', 'forklift': 'de heftruck', 'race car': 'de raceauto',
  'mechanic': 'de monteur', 'bee': 'de bij', 'little girl': 'het kleine meisje', 'basket': 'de mand', 'foal': 'het veulen', 'porcupine': 'het stekelvarken', 'apple tree': 'de appelboom',
  'hummingbird': 'de kolibrie', 'cherry tree': 'de kersenboom', 'guinea pig': 'de cavia', 'bowl': 'de kom', 'moon': 'de maan', 'lemur': 'de maki', 'elf': 'de kerstelf',
  'sack': 'de zak', 'sandcastle': 'het zandkasteel', 'duckling': 'het eendje', 'puddle': 'de plas', 'coral': 'het koraal', 'planet': 'de planeet',
  'snowboarder': 'de snowboarder', 'hot cocoa': 'de warme chocolademelk', 'butterfly': 'de vlinder', 'rose': 'de roos', 'water lily': 'de waterlelie', 'radish': 'het radijsje',
  'toy car': 'het speelgoedautootje', 'little dinosaur': 'de kleine dino', 'ant': 'de mier', 'cookie': 'het koekje', 'gazelle': 'de gazelle', 'baobab tree': 'de baobab',
  'caterpillar': 'de rups', 'toad': 'de pad', 'dragonfly': 'de libel', 'Earth': 'de aarde', 'teddy bear': 'de teddybeer', 'cupcake': 'de cupcake', 'airplane': 'het vliegtuig',
  'rainbow': 'de regenboog', 'helicopter': 'de helikopter', 'mountain': 'de berg', 'submarine': 'de duikboot', 'whale': 'de walvis', 'toy train': 'het speelgoedtreintje',
  'camper': 'de camper', 'bike': 'de fiets', 'playground': 'de speeltuin', 'dragon': 'de draak', 'campfire': 'het kampvuur', 'flying horse': 'het vliegende paard',
  'sun': 'de zon', 'oyster': 'de oester', 'monster truck': 'de monstertruck', 'big rock': 'de grote rots', 'octopus': 'de octopus', 'flamingo': 'de flamingo',
  'stork': 'de ooievaar', 'parrot': 'de papegaai', 'grapes': 'de druiven', 'koala': 'de koala', 'kangaroo': 'de kangoeroe', 'bull': 'de stier', 'turnip': 'de raap', 'cow': 'de koe',
  'clover': 'de klaver', 'deer': 'het hert', 'bluebells': 'de boshyacinten', 'dog': 'de hond', 'digger': 'de graafmachine', 'rock': 'de rots', 'scooter': 'de scooter',
  'jet': 'het straalvliegtuig', 'cloud': 'de wolk', 'eagle': 'de arend', 'manatee': 'de zeekoe', 'pineapple': 'de ananas', 'Christmas tree': 'de kerstboom',
  'toy helicopter': 'de speelgoedhelikopter', 'blocks': 'de blokken', 'bison': 'de bizon', 'wheat': 'de tarwe', 'sheep': 'het schaap', 'grass': 'het gras',
  'moose': 'de eland', 'birch tree': 'de berk', 'leopard': 'de luipaard', 'alligator': 'de alligator', 'goat': 'de geit', 'lettuce': 'de sla', 'tall tree': 'de hoge boom',
  'peacock': 'de pauw', 'hat': 'de hoed', 'doll': 'de pop', 'pudding': 'de pudding', 'reindeer': 'het rendier', 'bell': 'de bel', 'chinchilla': 'de chinchilla',
  'raspberry': 'de framboos', 'squid': 'de inktvis', 'cat': 'de kat', 'walnut tree': 'de walnotenboom', 'bulldozer': 'de bulldozer', 'sand pile': 'de zandhoop',
  'toy truck': 'de speelgoedvrachtwagen', 'ferry': 'de veerboot', 'train': 'de trein', 'backpack': 'de rugzak', 'banana tree': 'de bananenboom', 'orange tree': 'de sinaasappelboom',
  'cherry blossom': 'de kersenbloesem', 'tiger': 'de tijger', 'toucan': 'de toekan', 'panda': 'de panda', 'barn': 'de schuur', 'hay': 'het hooi', 'mushroom': 'de paddenstoel',
  'pyramid': 'de piramide', 'umbrella': 'de paraplu', 'starfish': 'de zeester', 'vegetables': 'de groente', 'hedgehog': 'de egel',
};
const COLLECT = { // [alle …, elke …, er mist …]
  'hmx-collect-acorns': ['alle eikels', 'elke eikel', 'Er mist een eikel.'], 'hmx-collect-flowers': ['alle zonnebloemen', 'elke zonnebloem', 'Er mist een zonnebloem.'],
  'hmx-collect-corn': ['alle maïskolven', 'elke maïskolf', 'Er mist een maïskolf.'], 'hmx-collect-fish': ['alle vissen', 'elke vis', 'Er mist een vis.'],
  'hmx-collect-shells': ['alle schelpen', 'elke schelp', 'Er mist een schelp.'], 'hmx-collect-strawberries': ['alle aardbeien', 'elke aardbei', 'Er mist een aardbei.'],
  'hmx-collect-stars': ['alle sterren', 'elke ster', 'Er mist een ster.'], 'hmx-collect-bananas': ['alle bananen', 'elke banaan', 'Er mist een banaan.'],
  'hmx-collect-presents': ['alle cadeautjes', 'elk cadeautje', 'Er mist een cadeautje.'], 'hmx-collect-eggs': ['alle paaseieren', 'elk paasei', 'Er mist een paasei.'],
  'hmx-collect-apples': ['alle appels', 'elke appel', 'Er mist een appel.'], 'hmx-collect-hibiscus': ['alle bloemen', 'elke bloem', 'Er mist een bloem.'],
};
const AVOID = { // [ontwijk …, een A of een B]
  'hmx-avoid-duckling': ['de vos', 'een vos of een slang'], 'hmx-avoid-fish': ['de haai', 'een haai of een kwal'], 'hmx-avoid-rocket': ['de planetoïden', 'een planetoïde of een meteoriet'],
  'hmx-avoid-snowboard': ['de rotsen', 'een rots of een boom'], 'hmx-avoid-butterfly': ['de spin', 'een spin of een wesp'], 'hmx-avoid-frog': ['de reiger', 'een reiger of een alligator'],
  'hmx-avoid-rabbit': ['de havik', 'een havik of een wolf'], 'hmx-avoid-toycar': ['de plassen', 'een plas of een stapel stenen'], 'hmx-avoid-raptor': ['de tyrannosaurus', 'een tyrannosaurus of een stapel stenen'],
  'hmx-avoid-penguin': ['de orka', 'een orka of een wak in het ijs'], 'hmx-avoid-ant': ['de spin', 'een plas of een spin'], 'hmx-avoid-gazelle': ['de luipaard', 'een luipaard of een hyena'],
};
const HOP = { 'hmx-hop-frog': 'over de waterleliebladeren', 'hmx-hop-penguin': 'over de ijsschotsen', 'hmx-hop-caterpillar': 'over de stapstenen', 'hmx-hop-astronaut': 'door de ruimte', 'hmx-hop-teddy': 'over de snoepjes', 'hmx-hop-fox': 'over de herfstbladeren' };
const COLOUR = { 'hmx-colour-pig': ['de boerderij', 'de boerderijtekening'], 'hmx-colour-horse': ['de wei', 'de weitekening'], 'hmx-colour-monkey': ['de jungle', 'de jungletekening'],
  'hmx-colour-penguin': ['het ijs', 'de ijstekening'], 'hmx-colour-hedgehog': ['de bloemenwei', 'de weitekening'], 'hmx-colour-turtle': ['het strand', 'de strandtekening'],
  'hmx-colour-squirrel': ['het bos', 'de bostekening'], 'hmx-colour-camel': ['de woestijn', 'de woestijntekening'], 'hmx-colour-frog': ['de regendag', 'de regentekening'],
  'hmx-colour-octopus': ['de zee', 'de zeetekening'], 'hmx-colour-bee': ['de tuin', 'de tuintekening'], 'hmx-colour-dog': ['het huis', 'de tekening van het huis'],
  'hmx-colour-rocket': ['de ruimte', 'de ruimtetekening'], 'hmx-colour-ambulance': ['de stad', 'de stadstekening'], 'hmx-colour-snowman': ['de winter', 'de wintertekening'],
  'hmx-colour-tractor': ['de oogst', 'de oogsttekening'] };
const BABIES = { 'hmx-babies-meadow': 'in de wei', 'hmx-babies-sunset': 'bij zonsondergang', 'hmx-babies-snow': 'in de sneeuw', 'hmx-babies-orchard': 'in de boomgaard', 'hmx-babies-spring': 'in de lente', 'hmx-babies-wheat': 'in het korenveld' };
const STRINGS = { farm: 'op de boerderij', beach: 'op het strand', snow: 'in de sneeuw', savanna: 'op de savanne', pets: 'in het park', dinos: 'bij de dino’s', forest: 'in het bos', kids: 'in de speeltuin', jungle: 'in de jungle' };
const CUE = { 'hmx-sound-leopard': 'luipaard', 'hmx-sound-tiger': 'tijger', 'hmx-sound-toucan': 'toekan', 'hmx-sound-tractor': 'tractor', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pelikaan' };

function forms(key) {
  const s = NOUNS[key]; if (!s) throw new Error('nl: no forms for "' + key + '"');
  return { def: s, Def: s[0].toUpperCase() + s.slice(1), van: 'van ' + s, naar: 'naar ' + s };
}
function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Doolhofpuzzel: help ${H.def} ${G.naar}`, printTitle: `Help ${H.def} ${G.naar}`, instruction: `Help ${H.def} ${G.naar}. Teken een lijn langs de weg.`, tap: `Begin bij de groene cirkel met de pijl. Sleep langs de weg ${G.naar}.` };
    case 'first-maze': return { title: `Mijn eerste doolhof: ${H.def} en ${G.def}`, printTitle: `Help ${H.def} ${G.naar}`, instruction: `Help ${H.def} ${G.naar}. Teken een lijn over de brede weg en blijf binnen de randen.`, tap: `Begin bij de groene cirkel. Sleep over de brede weg ${G.naar}.` };
    case 'big-maze': return { title: `Grote doolhofpuzzel groep 3: ${H.def} en ${G.def}`, printTitle: `Help ${H.def} ${G.def} te vinden`, instruction: `Kijk eerst naar het hele doolhof. Teken daarna de weg ${H.van} ${G.naar}.`, tap: `Kijk eerst en sleep dan van de groene cirkel ${G.naar}. Houdt een weg op, ga dan terug.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Rivierdoolhof: ${H.def} en ${G.def}`, printTitle: swim ? `Help ${H.def} ${G.naar} te zwemmen` : en[2] === 'paddle' ? `Peddel met ${H.def} ${G.naar}` : `Vaar ${H.def} ${G.naar}`, instruction: `${swim ? `Help ${H.def} over het water ${G.naar} te zwemmen` : `${en[2] === 'paddle' ? 'Peddel' : 'Vaar'} met ${H.def} over het water ${G.naar}`}. Teken een lijn door het water.`, tap: `Begin bij de groene cirkel. Sleep door het water ${G.naar}.` }; }
    case 'burrow': return { title: `Doolhof onder de grond: ${H.def} en ${G.def}`, printTitle: `Help ${H.def} ${G.naar}`, instruction: `Help ${H.def} door de gangen naar beneden en naar boven, tot bij ${G.def}. Teken een lijn langs de weg.`, tap: `Begin bij de groene cirkel. Sleep door de gangen ${G.naar}.` };
    case 'shortest-way': return { title: `Stadsdoolhof: ${H.def} en de kortste weg`, printTitle: `De kortste weg ${G.naar}`, instruction: `Veel straten gaan ${G.naar}. Teken de kortste weg voor ${H.def} en schrijf op hoeveel stukjes straat het zijn.`, tap: `Sleep de kortste weg van de groene cirkel ${G.naar}.` };
    case 'babies-mothers': return { title: `Doolhof: jonge dieren zoeken hun moeder ${BABIES[sk.id]}`, printTitle: 'Help elk jong dier zijn moeder te vinden', instruction: 'Help elk jong dier zijn eigen moeder te vinden. Teken een lijn van elk jong naar zijn moeder.', tap: 'Sleep van elk jong naar zijn eigen moeder.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'vlieger' : kites === 0 ? 'ballon' : 'vlieger of ballon'; const whatT = balloons === 0 ? 'de vlieger' : kites === 0 ? 'de ballon' : 'elk touwtje';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      return { title: `Warrige lijnen ${where}: van wie is ${whatT}?`, printTitle: `Van wie is ${whatT}?`,
        instruction: kids ? `Volg elk touwtje van een kind of speelgoed naar zijn ${what}. Schrijf het nummer in het vakje erboven.` : `Volg elk touwtje van een dier naar zijn ${what}. Schrijf het nummer van het dier in het vakje erboven.`,
        tap: kids ? `Sleep langs elk touwtje van het kind of speelgoed naar zijn ${what}.` : `Sleep langs elk touwtje van het dier naar zijn ${what}.` };
    }
    case 'collect': { const [all, each, missed] = COLLECT[sk.id]; return { title: `Doolhof: ${H.def} verzamelt ${all}`, printTitle: `Help ${H.def} ${all} te verzamelen`, instruction: `Help ${H.def} ${G.naar} en verzamel ${each}, zonder een pad twee keer te nemen. Kruis voor ${each} een rondje aan.`, tap: `Sleep van de groene cirkel ${G.naar}. Kom langs ${each}.`, missed: missed + ' Kijk naar de rode cirkel.' }; }
    case 'avoid': { const [t, one] = AVOID[sk.id]; return { title: `Doolhof: ${H.def} ontwijkt ${t}`, printTitle: `Breng ${H.def} veilig ${G.naar}`, instruction: `Help ${H.def} ${G.naar}. Neem geen weg met ${one}.`, tap: `Sleep van de groene cirkel ${G.naar}. Neem geen weg met ${one}.` }; }
    case 'letter-hop': return { title: `Letterdoolhof: ${H.def} springt ${HOP[sk.id]}`, printTitle: `Spring in ABC-volgorde ${HOP[sk.id]}`, instruction: 'Begin in het vakje waar de pijl naar wijst. Kleur de volgende letter van het alfabet in een vakje ernaast, tot aan de {LAST}.', tap: 'Begin bij de groene cirkel. Sleep vakje voor vakje naar de volgende letter van het alfabet.' };
    case 'abc-capitals': return { title: `Letterdoolhof A tot Z: ${H.def} en ${G.def}`, printTitle: `Van A tot Z met ${H.def} ${G.naar}`, instruction: `Help ${H.def} ${G.naar}. Ga bij elke splitsing naar de steen met de volgende letter van het alfabet.`, tap: 'Begin bij de groene cirkel. Sleep bij elke splitsing naar de volgende letter.' };
    case 'abc-lowercase': return { title: `Letterdoolhof met kleine letters: ${H.def}`, printTitle: `Van a tot z met ${H.def} ${G.naar}`, instruction: `Help ${H.def} ${G.naar}. Ga bij elke splitsing naar de steen met de volgende kleine letter.`, tap: 'Begin bij de groene cirkel. Sleep bij elke splitsing naar de volgende kleine letter.' };
    case 'numbers-20': return { title: `Getallendoolhof tot 20: ${H.def} en ${G.def}`, printTitle: `Tel met ${H.def} ${G.naar}`, instruction: `Help ${H.def} ${G.naar}. Ga bij elke splitsing naar het volgende getal, van 1 tot 20.`, tap: 'Begin bij de groene cirkel. Sleep bij elke splitsing naar het volgende getal.' };
    case 'skip-5': return { title: `Sprongen van 5: ${H.def} en ${G.def}`, printTitle: `Tel met sprongen van 5 ${G.naar}`, instruction: `Help ${H.def} ${G.naar}. Tel met sprongen van 5 van steen naar steen, tot 100.`, tap: 'Begin bij de groene cirkel. Sleep van steen naar steen en tel met sprongen van 5.' };
    case 'make-10': return { title: `Rekendoolhof groep 3: verliefde harten met ${H.def}`, printTitle: 'Stap alleen op sommen die 10 maken', instruction: `Help ${H.def} ${G.naar}. Stap alleen op de stenen waarvan de som 10 is.`, tap: 'Begin bij de groene cirkel. Sleep alleen over de stenen die 10 maken.' };
    case 'subtract-20': return { title: `Minsommen tot 20: ${H.def} en ${G.def}`, printTitle: `Help ${H.def} ${G.naar}`, instruction: `Kijk naar het getal bij ${H.def}. Stap alleen op de stenen met dat getal als antwoord.`, tap: `Begin bij de groene cirkel. Sleep alleen over de stenen met het getal ${H.van} als antwoord.` };
    case 'running-total': return { title: `Plus en min tot 100: ${H.def} en ${G.def}`, printTitle: `Reken onderweg ${G.naar}`, instruction: `Begin met het getal ${H.van} en schrijf het nieuwe getal in elk vakje. Zoek de weg die eindigt op het getal ${G.van}.`, tap: `Begin bij de groene cirkel. Sleep langs de weg die eindigt op het getal ${G.van}.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Doolhof met beginklanken: zoals ${c}`, printTitle: `Plaatjes die beginnen zoals ${c}`, instruction: `Zeg de naam van elk plaatje. Stap alleen op plaatjes die met dezelfde klank beginnen als ${c}.`, tap: `Begin bij de groene cirkel. Sleep alleen over plaatjes die beginnen zoals ${c}.` }; }
    case 'maze-colouring': { const [place, tek] = COLOUR[sk.id]; return { title: `Doolhof kleurplaat: ${H.def} en ${G.def}`, printTitle: `Los het doolhof op en kleur ${place}`, instruction: `Teken de weg ${H.van} ${G.naar} en kleur de hele weg. Kleur daarna ${tek}.`, tap: `Begin bij de groene cirkel. Sleep langs de weg ${G.naar}.` }; }
    default: throw new Error('nl: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
