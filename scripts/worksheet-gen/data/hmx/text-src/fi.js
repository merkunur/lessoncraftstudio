/**
 * data/hmx/text-src/fi.js — Finnish words of the Maze Puzzles Level Set scenes (2026-10-12).
 * NOUNS: 'nominatiivi|genetiivi|partitiivi', every form written out (never built by a guessed suffix rule).
 * Templates follow the published Finnish face strings (i18n/strings.fi.json): "Auta X:ää … Y:n luo".
 */
'use strict';
const NOUNS = {
  'lamb': 'karitsa|karitsan|karitsaa', 'haystack': 'heinäkasa|heinäkasan|heinäkasaa', 'pig': 'possu|possun|possua', 'mud puddle': 'mutalätäkkö|mutalätäkön|mutalätäkköä',
  'ox': 'härkä|härän|härkää', 'apple basket': 'omenakori|omenakorin|omenakoria', 'snail': 'etana|etanan|etanaa', 'strawberry': 'mansikka|mansikan|mansikkaa',
  'boy on the bike': 'pyöräilevä poika|pyöräilevän pojan|pyöräilevää poikaa', 'slide': 'liukumäki|liukumäen|liukumäkeä', 'duck': 'ankka|ankan|ankkaa', 'bread': 'leipä|leivän|leipää',
  'squirrel': 'orava|oravan|oravaa', 'pine cone': 'käpy|kävyn|käpyä', 'mouse': 'hiiri|hiiren|hiirtä', 'pumpkin': 'kurpitsa|kurpitsan|kurpitsaa',
  'sloth': 'laiskiainen|laiskiaisen|laiskiaista', 'tree': 'puu|puun|puuta', 'zebra': 'seepra|seepran|seepraa', 'elephant': 'norsu|norsun|norsua',
  'camel': 'kameli|kamelin|kamelia', 'palm tree': 'palmu|palmun|palmua', 'sea turtle': 'merikilpikonna|merikilpikonnan|merikilpikonnaa', 'sea': 'meri|meren|merta',
  'girl on the sled': 'pulkkaileva tyttö|pulkkailevan tytön|pulkkailevaa tyttöä', 'cabin': 'mökki|mökin|mökkiä', 'seal': 'hylje|hylkeen|hyljettä', 'hole in the ice': 'avanto|avannon|avantoa',
  'hiker': 'retkeilijä|retkeilijän|retkeilijää', 'tent': 'teltta|teltan|telttaa', 'owl': 'pöllö|pöllön|pöllöä', 'oak tree': 'tammi|tammen|tammea',
  'mail carrier': 'postinkantaja|postinkantajan|postinkantajaa', 'mailbox': 'postilaatikko|postilaatikon|postilaatikkoa', 'bunny': 'pupu|pupun|pupua', 'Easter basket': 'pääsiäiskori|pääsiäiskorin|pääsiäiskoria',
  'firefighter': 'palomies|palomiehen|palomiestä', 'fire truck': 'paloauto|paloauton|paloautoa', 'seagull': 'lokki|lokin|lokkia', 'fish': 'kala|kalan|kalaa',
  'raccoon': 'pesukarhu|pesukarhun|pesukarhua', 'cooler': 'kylmälaukku|kylmälaukun|kylmälaukkua', 'triceratops': 'triceratops|triceratopsin|triceratopsia', 'big tree': 'iso puu|ison puun|isoa puuta',
  'farmer': 'maanviljelijä|maanviljelijän|maanviljelijää', 'tractor': 'traktori|traktorin|traktoria', 'astronaut': 'astronautti|astronautin|astronauttia', 'rocket': 'raketti|raketin|rakettia',
  'pufferfish': 'pallokala|pallokalan|pallokalaa', 'shell': 'simpukankuori|simpukankuoren|simpukankuorta', 'robot': 'robotti|robotin|robottia', 'ice cream': 'jäätelö|jäätelön|jäätelöä',
  'donkey': 'aasi|aasin|aasia', 'carrot': 'porkkana|porkkanan|porkkanaa', 'beaver': 'majava|majavan|majavaa', 'log': 'tukki|tukin|tukkia',
  'turkey': 'kalkkuna|kalkkunan|kalkkunaa', 'corn': 'maissintähkä|maissintähkän|maissintähkää', 'skier': 'hiihtäjä|hiihtäjän|hiihtäjää', 'snowman': 'lumiukko|lumiukon|lumiukkoa',
  'swan': 'joutsen|joutsenen|joutsenta', 'nest': 'pesä|pesän|pesää', 'macaw': 'papukaija|papukaijan|papukaijaa', 'banana': 'banaani|banaanin|banaania',
  'fox': 'kettu|ketun|kettua', 'lantern': 'lyhty|lyhdyn|lyhtyä', 'hamster': 'hamsteri|hamsterin|hamsteria', 'apple': 'omena|omenan|omenaa',
  'kitten': 'kissanpentu|kissanpennun|kissanpentua', 'milk': 'maito|maidon|maitoa', 'crab': 'rapu|ravun|rapua', 'beach ball': 'rantapallo|rantapallon|rantapalloa',
  'ladybug': 'leppäkerttu|leppäkertun|leppäkerttua', 'sunflower': 'auringonkukka|auringonkukan|auringonkukkaa', 'penguin': 'pingviini|pingviinin|pingviiniä', 'igloo': 'iglu|iglun|iglua',
  'turtle': 'kilpikonna|kilpikonnan|kilpikonnaa', 'flower': 'kukka|kukan|kukkaa', 'girl': 'tyttö|tytön|tyttöä', 'swing': 'keinu|keinun|keinua',
  'chick': 'tipu|tipun|tipua', 'egg': 'muna|munan|munaa', 'horse': 'hevonen|hevosen|hevosta', 'hen': 'kana|kanan|kanaa',
  'toy dinosaur': 'leludinosaurus|leludinosauruksen|leludinosaurusta', 'cake': 'kakku|kakun|kakkua', 'bird': 'lintu|linnun|lintua', 'birdhouse': 'linnunpönttö|linnunpöntön|linnunpönttöä',
  'monkey': 'apina|apinan|apinaa', 'rabbit': 'kani|kanin|kania', 'cabbage': 'kaali|kaalin|kaalia', 'seahorse': 'merihevonen|merihevosen|merihevosta',
  'seaweed': 'merilevä|merilevän|merilevää', 'badger': 'mäyrä|mäyrän|mäyrää', 'chestnut tree': 'kastanjapuu|kastanjapuun|kastanjapuuta', 'Santa': 'joulupukki|joulupukin|joulupukkia',
  'sleigh': 'reki|reen|rekeä', 'llama': 'laama|laaman|laamaa', 'rhino': 'sarvikuono|sarvikuonon|sarvikuonoa', 'hippo': 'virtahepo|virtahevon|virtahepoa',
  'tortoise': 'kilpikonna|kilpikonnan|kilpikonnaa', 'watermelon': 'vesimeloni|vesimelonin|vesimelonia', 'dinosaur': 'dinosaurus|dinosauruksen|dinosaurusta', 'bear': 'karhu|karhun|karhua',
  'honey': 'hunaja|hunajan|hunajaa', 'pelican': 'pelikaani|pelikaanin|pelikaania', 'boat': 'vene|veneen|venettä', 'garbage truck': 'roska-auto|roska-auton|roska-autoa',
  'trash can': 'roskis|roskiksen|roskista', 'canoe': 'kanootti|kanootin|kanoottia', 'kayak': 'kajakki|kajakin|kajakkia', 'ship': 'laiva|laivan|laivaa',
  'lighthouse': 'majakka|majakan|majakkaa', 'sailboat': 'purjevene|purjeveneen|purjevenettä', 'island': 'saari|saaren|saarta', 'beach hut': 'rantamaja|rantamajan|rantamajaa',
  'frog': 'sammakko|sammakon|sammakkoa', 'puffin': 'lunni|lunnin|lunnia', 'lifeguard tower': 'hengenpelastajan torni|hengenpelastajan tornin|hengenpelastajan tornia', 'house': 'talo|talon|taloa',
  'goose': 'hanhi|hanhen|hanhea', 'cheese': 'juusto|juuston|juustoa', 'earthworm': 'kastemato|kastemadon|kastematoa', 'leaf': 'lehti|lehden|lehteä',
  'gopher': 'taskurotta|taskurotan|taskurottaa', 'potato': 'peruna|perunan|perunaa', 'gerbil': 'gerbiili|gerbiilin|gerbiiliä', 'blueberry': 'mustikka|mustikan|mustikkaa',
  'meerkat': 'surikaatti|surikaatin|surikaattia', 'ferret': 'fretti|fretin|frettiä', 'ball': 'pallo|pallon|palloa', 'chipmunk': 'maaorava|maaoravan|maaoravaa',
  'acorn': 'tammenterho|tammenterhon|tammenterhoa', 'ambulance': 'ambulanssi|ambulanssin|ambulanssia', 'doctor': 'lääkäri|lääkärin|lääkäriä', 'bus': 'bussi|bussin|bussia',
  'boy': 'poika|pojan|poikaa', 'jeep': 'maastoauto|maastoauton|maastoautoa', 'surfboard': 'surffilauta|surffilaudan|surffilautaa', 'motorcycle': 'moottoripyörä|moottoripyörän|moottoripyörää',
  'garage': 'autotalli|autotallin|autotallia', 'van': 'pakettiauto|pakettiauton|pakettiautoa', 'package': 'paketti|paketin|pakettia', 'cement mixer': 'betoniauto|betoniauton|betoniautoa',
  'builder': 'rakentaja|rakentajan|rakentajaa', 'truck': 'kuorma-auto|kuorma-auton|kuorma-autoa', 'forklift': 'trukki|trukin|trukkia', 'race car': 'kilpa-auto|kilpa-auton|kilpa-autoa',
  'mechanic': 'mekaanikko|mekaanikon|mekaanikkoa', 'bee': 'mehiläinen|mehiläisen|mehiläistä', 'little girl': 'pieni tyttö|pienen tytön|pientä tyttöä', 'basket': 'kori|korin|koria',
  'foal': 'varsa|varsan|varsaa', 'porcupine': 'piikkisika|piikkisian|piikkisikaa', 'apple tree': 'omenapuu|omenapuun|omenapuuta', 'hummingbird': 'kolibri|kolibrin|kolibria', 'cherry tree': 'kirsikkapuu|kirsikkapuun|kirsikkapuuta',
  'guinea pig': 'marsu|marsun|marsua', 'bowl': 'kulho|kulhon|kulhoa', 'moon': 'kuu|kuun|kuuta', 'lemur': 'lemuri|lemurin|lemuria', 'elf': 'tonttu|tontun|tonttua',
  'sack': 'säkki|säkin|säkkiä', 'sandcastle': 'hiekkalinna|hiekkalinnan|hiekkalinnaa', 'duckling': 'ankanpoikanen|ankanpoikasen|ankanpoikasta', 'puddle': 'lätäkkö|lätäkön|lätäkköä',
  'coral': 'koralli|korallin|korallia', 'planet': 'planeetta|planeetan|planeettaa', 'snowboarder': 'lumilautailija|lumilautailijan|lumilautailijaa', 'hot cocoa': 'kaakao|kaakaon|kaakaota',
  'butterfly': 'perhonen|perhosen|perhosta', 'rose': 'ruusu|ruusun|ruusua', 'water lily': 'lumme|lumpeen|lummetta', 'radish': 'retiisi|retiisin|retiisiä',
  'toy car': 'leluauto|leluauton|leluautoa', 'little dinosaur': 'pieni dinosaurus|pienen dinosauruksen|pientä dinosaurusta', 'ant': 'muurahainen|muurahaisen|muurahaista', 'cookie': 'keksi|keksin|keksiä',
  'gazelle': 'gaselli|gasellin|gasellia', 'baobab tree': 'apinanleipäpuu|apinanleipäpuun|apinanleipäpuuta', 'caterpillar': 'toukka|toukan|toukkaa', 'toad': 'rupikonna|rupikonnan|rupikonnaa', 'dragonfly': 'sudenkorento|sudenkorennon|sudenkorentoa',
  'Earth': 'Maa|Maan|Maata', 'teddy bear': 'nalle|nallen|nallea', 'cupcake': 'muffinssi|muffinssin|muffinssia', 'airplane': 'lentokone|lentokoneen|lentokonetta',
  'rainbow': 'sateenkaari|sateenkaaren|sateenkaarta', 'helicopter': 'helikopteri|helikopterin|helikopteria', 'mountain': 'vuori|vuoren|vuorta', 'submarine': 'sukellusvene|sukellusveneen|sukellusvenettä',
  'whale': 'valas|valaan|valasta', 'toy train': 'lelujuna|lelujunan|lelujunaa', 'camper': 'asuntoauto|asuntoauton|asuntoautoa', 'bike': 'polkupyörä|polkupyörän|polkupyörää',
  'playground': 'leikkipuisto|leikkipuiston|leikkipuistoa', 'dragon': 'lohikäärme|lohikäärmeen|lohikäärmettä', 'campfire': 'nuotio|nuotion|nuotiota', 'flying horse': 'lentävä hevonen|lentävän hevosen|lentävää hevosta',
  'sun': 'aurinko|auringon|aurinkoa', 'oyster': 'osteri|osterin|osteria', 'monster truck': 'monsteriauto|monsteriauton|monsteriautoa', 'big rock': 'iso kivi|ison kiven|isoa kiveä',
  'octopus': 'mustekala|mustekalan|mustekalaa', 'flamingo': 'flamingo|flamingon|flamingoa', 'stork': 'haikara|haikaran|haikaraa', 'parrot': 'papukaija|papukaijan|papukaijaa',
  'grapes': 'viinirypäleet|viinirypäleiden|viinirypäleitä', 'koala': 'koala|koalan|koalaa', 'kangaroo': 'kenguru|kengurun|kengurua', 'bull': 'sonni|sonnin|sonnia',
  'turnip': 'nauris|nauriin|naurista', 'cow': 'lehmä|lehmän|lehmää', 'clover': 'apila|apilan|apilaa', 'deer': 'kauris|kauriin|kaurista',
  'bluebells': 'kissankellot|kissankellojen|kissankelloja', 'dog': 'koira|koiran|koiraa', 'digger': 'kaivinkone|kaivinkoneen|kaivinkonetta', 'rock': 'kivi|kiven|kiveä',
  'scooter': 'skootteri|skootterin|skootteria', 'jet': 'suihkukone|suihkukoneen|suihkukonetta', 'cloud': 'pilvi|pilven|pilveä', 'eagle': 'kotka|kotkan|kotkaa',
  'manatee': 'manaatti|manaatin|manaattia', 'pineapple': 'ananas|ananaksen|ananasta', 'Christmas tree': 'joulukuusi|joulukuusen|joulukuusta', 'toy helicopter': 'leluhelikopteri|leluhelikopterin|leluhelikopteria',
  'blocks': 'palikat|palikoiden|palikoita', 'bison': 'biisoni|biisonin|biisonia', 'wheat': 'vehnä|vehnän|vehnää', 'sheep': 'lammas|lampaan|lammasta',
  'grass': 'ruoho|ruohon|ruohoa', 'moose': 'hirvi|hirven|hirveä', 'birch tree': 'koivu|koivun|koivua', 'leopard': 'leopardi|leopardin|leopardia',
  'alligator': 'alligaattori|alligaattorin|alligaattoria', 'goat': 'vuohi|vuohen|vuohta', 'lettuce': 'salaatti|salaatin|salaattia', 'tall tree': 'korkea puu|korkean puun|korkeaa puuta',
  'peacock': 'riikinkukko|riikinkukon|riikinkukkoa', 'hat': 'hattu|hatun|hattua', 'doll': 'nukke|nuken|nukkea', 'pudding': 'vanukas|vanukkaan|vanukasta',
  'reindeer': 'poro|poron|poroa', 'bell': 'kello|kellon|kelloa', 'chinchilla': 'chinchilla|chinchillan|chinchillaa', 'raspberry': 'vadelma|vadelman|vadelmaa',
  'squid': 'kalmari|kalmarin|kalmaria', 'cat': 'kissa|kissan|kissaa', 'walnut tree': 'saksanpähkinäpuu|saksanpähkinäpuun|saksanpähkinäpuuta', 'bulldozer': 'puskutraktori|puskutraktorin|puskutraktoria',
  'sand pile': 'hiekkakasa|hiekkakasan|hiekkakasaa', 'toy truck': 'lelukuorma-auto|lelukuorma-auton|lelukuorma-autoa', 'ferry': 'lautta|lautan|lauttaa', 'train': 'juna|junan|junaa',
  'backpack': 'reppu|repun|reppua', 'banana tree': 'banaanipuu|banaanipuun|banaanipuuta', 'orange tree': 'appelsiinipuu|appelsiinipuun|appelsiinipuuta', 'cherry blossom': 'kirsikankukka|kirsikankukan|kirsikankukkaa',
  'tiger': 'tiikeri|tiikerin|tiikeriä', 'toucan': 'tukaani|tukaanin|tukaania', 'panda': 'panda|pandan|pandaa', 'barn': 'lato|ladon|latoa', 'hay': 'heinä|heinän|heinää',
  'mushroom': 'sieni|sienen|sientä', 'pyramid': 'pyramidi|pyramidin|pyramidia', 'umbrella': 'sateenvarjo|sateenvarjon|sateenvarjoa', 'starfish': 'meritähti|meritähden|meritähteä',
  'vegetables': 'vihannekset|vihannesten|vihanneksia', 'hedgehog': 'siili|siilin|siiliä',
};
const COLLECT = { // [kaikki … (obj.), jokainen …, jokaisesta … (elat.), jokaisen … kautta, … puuttuu]
  'hmx-collect-acorns': ['kaikki tammenterhot', 'jokainen tammenterho', 'jokaisesta tammenterhosta', 'jokaisen tammenterhon', 'Yksi tammenterho puuttuu.'],
  'hmx-collect-flowers': ['kaikki auringonkukat', 'jokainen auringonkukka', 'jokaisesta auringonkukasta', 'jokaisen auringonkukan', 'Yksi auringonkukka puuttuu.'],
  'hmx-collect-corn': ['kaikki maissintähkät', 'jokainen maissintähkä', 'jokaisesta maissintähkästä', 'jokaisen maissintähkän', 'Yksi maissintähkä puuttuu.'],
  'hmx-collect-fish': ['kaikki kalat', 'jokainen kala', 'jokaisesta kalasta', 'jokaisen kalan', 'Yksi kala puuttuu.'],
  'hmx-collect-shells': ['kaikki simpukankuoret', 'jokainen simpukankuori', 'jokaisesta simpukankuoresta', 'jokaisen simpukankuoren', 'Yksi simpukankuori puuttuu.'],
  'hmx-collect-strawberries': ['kaikki mansikat', 'jokainen mansikka', 'jokaisesta mansikasta', 'jokaisen mansikan', 'Yksi mansikka puuttuu.'],
  'hmx-collect-stars': ['kaikki tähdet', 'jokainen tähti', 'jokaisesta tähdestä', 'jokaisen tähden', 'Yksi tähti puuttuu.'],
  'hmx-collect-bananas': ['kaikki banaanit', 'jokainen banaani', 'jokaisesta banaanista', 'jokaisen banaanin', 'Yksi banaani puuttuu.'],
  'hmx-collect-presents': ['kaikki lahjat', 'jokainen lahja', 'jokaisesta lahjasta', 'jokaisen lahjan', 'Yksi lahja puuttuu.'],
  'hmx-collect-eggs': ['kaikki pääsiäismunat', 'jokainen pääsiäismuna', 'jokaisesta pääsiäismunasta', 'jokaisen pääsiäismunan', 'Yksi pääsiäismuna puuttuu.'],
  'hmx-collect-apples': ['kaikki omenat', 'jokainen omena', 'jokaisesta omenasta', 'jokaisen omenan', 'Yksi omena puuttuu.'],
  'hmx-collect-hibiscus': ['kaikki kukat', 'jokainen kukka', 'jokaisesta kukasta', 'jokaisen kukan', 'Yksi kukka puuttuu.'],
};
const AVOID = { // [väistää … (part.), A tai B (nominative: "tie, jolla on A tai B")]
  'hmx-avoid-duckling': ['kettua', 'kettu tai käärme'], 'hmx-avoid-fish': ['haita', 'hai tai meduusa'],
  'hmx-avoid-rocket': ['asteroideja', 'asteroidi tai meteori'], 'hmx-avoid-snowboard': ['kiviä', 'kivi tai puu'],
  'hmx-avoid-butterfly': ['hämähäkkiä', 'hämähäkki tai ampiainen'], 'hmx-avoid-frog': ['haikaraa', 'haikara tai alligaattori'],
  'hmx-avoid-rabbit': ['haukkaa', 'haukka tai susi'], 'hmx-avoid-toycar': ['lätäköitä', 'lätäkkö tai kivikasa'],
  'hmx-avoid-raptor': ['tyrannosaurusta', 'tyrannosaurus tai kivikasa'], 'hmx-avoid-penguin': ['miekkavalasta', 'miekkavalas tai avanto'],
  'hmx-avoid-ant': ['hämähäkkiä', 'lätäkkö tai hämähäkki'], 'hmx-avoid-gazelle': ['leopardia', 'leopardi tai hyeena'],
};
const HOP = { 'hmx-hop-frog': ['lumpeenlehdillä', 'lumpeenlehtien yli'], 'hmx-hop-penguin': ['jäälautoilla', 'jäälauttojen yli'], 'hmx-hop-caterpillar': ['puutarhan kivillä', 'puutarhan kivien yli'],
  'hmx-hop-astronaut': ['avaruudessa', 'avaruuden halki'], 'hmx-hop-teddy': ['karkkiruuduilla', 'karkkiruutujen yli'], 'hmx-hop-fox': ['syyslehdillä', 'syyslehtien yli'] };
const COLOUR = { 'hmx-colour-pig': ['maatila', 'maatilakuva'], 'hmx-colour-horse': ['niitty', 'niittykuva'], 'hmx-colour-monkey': ['viidakko', 'viidakkokuva'],
  'hmx-colour-penguin': ['jää', 'jääkuva'], 'hmx-colour-hedgehog': ['kukkaniitty', 'niittykuva'], 'hmx-colour-turtle': ['ranta', 'rantakuva'],
  'hmx-colour-squirrel': ['metsä', 'metsäkuva'], 'hmx-colour-camel': ['aavikko', 'aavikkokuva'], 'hmx-colour-frog': ['sadepäivä', 'sadekuva'],
  'hmx-colour-octopus': ['meri', 'merikuva'], 'hmx-colour-bee': ['puutarha', 'puutarhakuva'], 'hmx-colour-dog': ['piha', 'pihakuva'],
  'hmx-colour-rocket': ['avaruus', 'avaruuskuva'], 'hmx-colour-ambulance': ['kaupunki', 'kaupunkikuva'], 'hmx-colour-snowman': ['talvi', 'talvikuva'],
  'hmx-colour-tractor': ['sato', 'satokuva'] };
const BABIES = { 'hmx-babies-meadow': 'niityllä', 'hmx-babies-sunset': 'auringonlaskussa', 'hmx-babies-snow': 'lumessa', 'hmx-babies-orchard': 'hedelmätarhassa', 'hmx-babies-spring': 'keväällä', 'hmx-babies-wheat': 'vehnäpellolla' };
const STRINGS = { farm: 'maatilalla', beach: 'rannalla', snow: 'lumessa', savanna: 'savannilla', pets: 'puistossa', dinos: 'dinosaurusten luona', forest: 'metsässä', kids: 'leikkipuistossa', jungle: 'viidakossa' };
const CUE = { 'hmx-sound-leopard': 'leopardi', 'hmx-sound-tiger': 'tiikeri', 'hmx-sound-toucan': 'tukaani', 'hmx-sound-tractor': 'traktori', 'hmx-sound-panda': 'panda', 'hmx-sound-pelican': 'pelikaani' };

function forms(key) {
  const s = NOUNS[key]; if (!s) throw new Error('fi: no forms for "' + key + '"');
  const [nom, gen, part] = s.split('|'); if (!part) throw new Error('fi: "' + key + '" needs nom|gen|part');
  return { nom, gen, part, luo: gen + ' luo', Nom: nom[0].toUpperCase() + nom.slice(1) };
}
function build(sk, en) {
  const [hk, gk] = en; const f = sk.face;
  const H = hk && !/^(babies|tangled)/.test(f) ? forms(hk) : null, G = gk && !/^(babies|tangled)/.test(f) ? forms(gk) : null;
  switch (f) {
    case 'base': return { title: `Labyrintti lapsille: ${H.nom} ja ${G.nom}`, printTitle: `Auta ${H.part} ${G.luo}`, instruction: `Auta ${H.part} pääsemään ${G.luo}. Piirrä viiva tietä pitkin.`, tap: `Aloita vihreästä ympyrästä, jossa on nuoli. Vedä tietä pitkin ${G.luo}.` };
    case 'first-maze': return { title: `Ensimmäinen labyrinttini: ${H.nom} ja ${G.nom}`, printTitle: `Auta ${H.part} ${G.luo}`, instruction: `Auta ${H.part} pääsemään ${G.luo}. Piirrä viiva leveää tietä pitkin ja pysy reunojen sisällä.`, tap: `Aloita vihreästä ympyrästä. Vedä leveää tietä pitkin ${G.luo}.` };
    case 'big-maze': return { title: `Iso labyrintti 1. luokalle: ${H.nom} ja ${G.nom}`, printTitle: `Auta ${H.part} löytämään ${G.nom}`, instruction: `Katso ensin koko labyrintti. Piirrä sitten ${H.gen} reitti ${G.luo}.`, tap: `Katso ensin ja vedä sitten vihreästä ympyrästä ${G.luo}. Jos tie loppuu, palaa takaisin.` };
    case 'river': { const swim = en[2] === 'swim'; return { title: `Jokilabyrintti: ${H.nom} ja ${G.nom}`, printTitle: swim ? `Auta ${H.part} uimaan ${G.luo}` : `Ohjaa ${H.nom} ${G.luo}`, instruction: `${swim ? `Auta ${H.part} uimaan vedessä` : `Ohjaa ${H.nom} vettä pitkin`} ${G.luo}. Piirrä viiva veden läpi.`, tap: `Aloita vihreästä ympyrästä. Vedä veden läpi ${G.luo}.` }; }
    case 'burrow': return { title: `Maanalainen labyrintti: ${H.nom} ja ${G.nom}`, printTitle: `Auta ${H.part} ${G.luo}`, instruction: `Auta ${H.part} kulkemaan käytävissä alas ja ylös ${G.luo}. Piirrä viiva tietä pitkin.`, tap: `Aloita vihreästä ympyrästä. Vedä käytäviä pitkin ${G.luo}.` };
    case 'shortest-way': return { title: `Kaupunkilabyrintti: ${H.nom} ja lyhin reitti`, printTitle: `Lyhin reitti ${G.luo}`, instruction: `Monta katua vie ${G.luo}. Piirrä ${H.gen.slice(0, -1)}lle lyhin reitti ja kirjoita, kuinka monta katupalaa siinä on.`, tap: `Vedä lyhin reitti vihreästä ympyrästä ${G.luo}.` };
    case 'babies-mothers': return { title: `Labyrintti: poikaset etsivät emonsa ${BABIES[sk.id]}`, printTitle: 'Auta jokaista poikasta löytämään emonsa', instruction: 'Auta jokaista poikasta löytämään oma emonsa. Piirrä viiva jokaiselta poikaselta sen emon luo.', tap: 'Vedä jokaiselta poikaselta sen omalle emolle.' };
    case 'tangled-lines': {
      const kites = sk.goals.filter((g) => /kite/.test(g.src)).length, balloons = sk.goals.length - kites;
      const what = balloons === 0 ? 'leijalle' : kites === 0 ? 'ilmapallolle' : 'leijalle tai ilmapallolle'; const whatT = balloons === 0 ? 'leija' : kites === 0 ? 'ilmapallo' : 'leija tai ilmapallo';
      const where = STRINGS[sk.id.replace('hmx-strings-', '')]; const kids = /kids/.test(sk.id);
      return { title: `Sotkuiset narut ${where}: kenen ${whatT}?`, printTitle: `Kenen ${whatT} se on?`,
        instruction: kids ? `Seuraa jokaista narua lapselta tai lelulta sen ${what}. Kirjoita sen numero yläpuolella olevaan ruutuun.` : `Seuraa jokaista narua eläimeltä sen ${what}. Kirjoita eläimen numero sen yläpuolella olevaan ruutuun.`,
        tap: kids ? `Vedä jokaista narua pitkin lapselta tai lelulta sen ${what}.` : `Vedä jokaista narua pitkin eläimeltä sen ${what}.` };
    }
    case 'collect': { const [all, each, eachEl, eachGen, missed] = COLLECT[sk.id]; return { title: `Labyrintti: ${H.nom} kerää ${all}`, printTitle: `Auta ${H.part} keräämään ${all}`, instruction: `Auta ${H.part} pääsemään ${G.luo} ja kerää ${each} kulkematta samaa polkua kahdesti. Rastita ympyrä ${eachEl}.`, tap: `Vedä vihreästä ympyrästä ${G.luo}. Kulje ${eachGen} kautta.`, missed: missed + ' Katso punaista ympyrää.' }; }
    case 'avoid': { const [t, pair] = AVOID[sk.id]; return { title: `Labyrintti: ${H.nom} väistää ${t}`, printTitle: `Vie ${H.nom} turvallisesti ${G.luo}`, instruction: `Auta ${H.part} pääsemään ${G.luo}. Älä valitse tietä, jolla on ${pair}.`, tap: `Vedä vihreästä ympyrästä ${G.luo} valitsematta tietä, jolla on ${pair}.` }; }
    case 'letter-hop': { const [on, over] = HOP[sk.id]; return { title: `Hypi aakkosjärjestyksessä: ${H.nom} ${on}`, printTitle: `Hypi ${over} aakkosjärjestyksessä`, instruction: 'Aloita ruudusta, johon nuoli osoittaa. Väritä aina aakkosten seuraava kirjain viereisessä ruudussa, kirjaimeen {LAST} asti.', tap: 'Aloita vihreästä ympyrästä. Vedä ruutu kerrallaan aakkosten seuraavalle kirjaimelle.' }; }
    case 'abc-capitals': return { title: `Labyrintti A:sta Ö:hön: ${H.nom} ja ${G.nom}`, printTitle: `Vie ${H.nom} ${G.luo} A:sta Ö:hön`, instruction: `Auta ${H.part} pääsemään ${G.luo}. Mene jokaisessa risteyksessä kivelle, jossa on aakkosten seuraava kirjain.`, tap: 'Aloita vihreästä ympyrästä. Vedä jokaisessa risteyksessä seuraavalle kirjaimelle.' };
    case 'abc-lowercase': return { title: `Pienten kirjainten labyrintti: ${H.nom}`, printTitle: `Vie ${H.nom} ${G.luo} a:sta ö:hön`, instruction: `Auta ${H.part} pääsemään ${G.luo}. Mene jokaisessa risteyksessä kivelle, jossa on seuraava pieni kirjain.`, tap: 'Aloita vihreästä ympyrästä. Vedä jokaisessa risteyksessä seuraavalle pienelle kirjaimelle.' };
    case 'numbers-20': return { title: `Numerolabyrintti 1–20: ${H.nom} ja ${G.nom}`, printTitle: `Laske ${H.gen} kanssa ${G.luo}`, instruction: `Auta ${H.part} pääsemään ${G.luo}. Mene jokaisessa risteyksessä seuraavaan lukuun, 1:stä 20:een.`, tap: 'Aloita vihreästä ympyrästä. Vedä jokaisessa risteyksessä seuraavaan lukuun.' };
    case 'skip-5': return { title: `Viiden välein: ${H.nom} ja ${G.nom}`, printTitle: `Laske viiden välein ${G.luo}`, instruction: `Auta ${H.part} pääsemään ${G.luo}. Laske viiden välein kiveltä kivelle aina sataan asti.`, tap: 'Aloita vihreästä ympyrästä. Vedä kiveltä kivelle viiden välein laskien.' };
    case 'make-10': return { title: `Kymppiparit: ${H.nom} ja ${G.nom}`, printTitle: 'Astu vain laskuille, joiden summa on 10', instruction: `Auta ${H.part} pääsemään ${G.luo}. Astu vain kiville, joiden summa on 10.`, tap: 'Aloita vihreästä ympyrästä. Vedä vain kivien yli, joiden summa on 10.' };
    case 'subtract-20': return { title: `Vähennyslaskut 20:een asti: ${H.nom} ja ${G.nom}`, printTitle: `Auta ${H.part} ${G.luo}`, instruction: `Katso ${H.gen} vieressä olevaa lukua. Astu vain kiville, joiden vastaus on se luku.`, tap: `Aloita vihreästä ympyrästä. Vedä vain kivien yli, joiden vastaus on ${H.gen} luku.` };
    case 'running-total': return { title: `Plus ja miinus 100:aan asti: ${H.nom} ja ${G.nom}`, printTitle: `Laske matkalla ${G.luo}`, instruction: `Aloita ${H.gen} luvusta ja kirjoita uusi luku jokaiseen ruutuun. Etsi tie, joka päättyy ${G.gen} lukuun.`, tap: `Aloita vihreästä ympyrästä. Vedä pitkin tietä, joka päättyy ${G.gen} lukuun.` };
    case 'first-sound': { const c = CUE[sk.id]; return { title: `Alkuäännelabyrintti: kuin ${c}`, printTitle: `Kuvat, jotka alkavat kuin ${c}`, instruction: `Sano jokaisen kuvan nimi. Astu vain kuville, jotka alkavat samalla äänteellä kuin ${c}.`, tap: `Aloita vihreästä ympyrästä. Vedä vain kuvien yli, jotka alkavat kuin ${c}.` }; }
    case 'maze-colouring': { const [place, kuva] = COLOUR[sk.id]; return { title: `Labyrintti ja värityskuva: ${H.nom} ja ${G.nom}`, printTitle: `Ratkaise labyrintti ja väritä ${place}`, instruction: `Piirrä ${H.gen} tie ${G.luo} ja väritä koko tie. Väritä sitten ${kuva}.`, tap: `Aloita vihreästä ympyrästä. Vedä tietä pitkin ${G.luo}.` }; }
    default: throw new Error('fi: no template for ' + f);
  }
}
module.exports = { build, NOUNS };
