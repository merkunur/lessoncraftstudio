/* =====================================================================
   picture-bingo-core.js — the model of ACTIVITY #62 of the one-by-one
   rebuild: "Bingo's Word Hunt" → BINGO'S PICTURE CARD (RF.K.3.d,
   11 locales). Design sheet: docs/activities-rebuild/designs/062-bingo-word-hunt.md
   ---------------------------------------------------------------------
   THE INVENTION: a bingo card of look-alike words. Bingo (the library
   dog) calls a picture; the child puts a chip on the word that names it,
   and every word read right flips over into its picture — until the card
   is a picture card with a BINGO line, and the words left over are the
   ones never called. Levels:
     look    — look-alikes that differ by one letter (cat · cot · cut)
     family  — word families, one family per row
     blend   — words that start with a consonant blend (crab · crib)
     syll    — two-syllable words, with syllable-swap leftovers
     call    — You call: Bingo holds the pictures, the child holds three
               look-alike word cards and calls one; Bingo covers exactly
               what it names (his BINGO, a decoy, or nothing)
   A called square's word is the picture's own name in the library; a
   leftover is never a library word. Levels are shown per locale only
   with ≥ 7 calls. No DOM. UMD: window.PictureBingoCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PictureBingoCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* per locale: pics = called word → library picture; cards are rows split by ' / ', '*' = a called square;
     call = 'needed|other other' ('*' = a decoy whose picture is on Bingo's card). Bingo himself is farm animals/dog (a different drawing from the animals/dog a call may show). */
  /*DATA-BEGIN*/
  var DATA = {
    en: {
      pics: {'bag': 'At the Supermarket/bag', 'bat': 'animals/bat', 'bed': 'around the house/bed', 'can': 'At the Supermarket/can', 'cap': 'accessories/cap', 'cat': 'animals/cat', 'clock': 'around the house/clock', 'crab': 'beach/crab', 'crib': 'furniture/crib', 'cup': 'around the house/cup', 'dog': 'animals/dog', 'drum': 'music/drum', 'fan': 'around the house/fan', 'fig': 'fruits/fig', 'flag': '4th of July/flag', 'frog': 'pets/frog', 'ham': 'At the Supermarket/ham', 'hat': 'accessories/hat', 'hen': 'farm animals/hen', 'jug': 'kitchen tools/jug', 'lettuce': 'At the Supermarket/lettuce', 'log': 'camping/log', 'melon': 'At the Supermarket/melon', 'mitten': 'accessories/mitten', 'mug': 'kitchen tools/mug', 'net': 'beach/net', 'pan': 'around the house/pan', 'panda': 'animals/panda', 'pen': 'around the house/pen', 'pig': 'animals/pig', 'pillow': 'around the house/pillow', 'pot': 'around the house/pot', 'rabbit': 'animals/rabbit', 'rug': 'around the house/rug', 'sled': 'winter/sled', 'van': 'vehicles/van', 'window': 'around the house/window'},
      look: ['*cat cot hit / cut *pot cop / hut *cap *cup', 'dig *dog dug / peg *pig dot / bad *bed bid', 'nod *net not / pin *pan *pen / fin *fan fun'],
      family: ['*cat *hat *bat mat / *fan *van *pan *can / *mug *jug *rug hug', '*hen *pen ten / *pig *fig wig / *dog *log jog'],
      blend: ['*frog *flag flat / *crab *crib slid / *drum *sled *clock'],
      syll: ['*rab·bit *pan·da *mit·ten / *mel·on *pil·low *win·dow / *let·tuce pan·bit win·low'],
      call: ['cat|*cap cot', 'hat|*ham hit', 'pig|*pen peg', 'bed|*bag bid', 'cup|*cap cut', 'fan|*van fin', 'net|nod not', 'mug|*jug hug']
    },
    de: {
      pics: {'Besen': 'around the house/broom', 'Biene': 'farm animals/bee', 'Blume': 'easter/flower', 'Bluse': 'clothing/blouse', 'Boot': 'vehicles/boat', 'Brot': 'At the Supermarket/bread', 'Dose': 'At the Supermarket/can', 'Eimer': 'beach/bucket', 'Glas': 'kitchen tools/glass', 'Gras': 'spring/grass', 'Hahn': 'farm animals/rooster', 'Hand': 'body parts/hand', 'Haus': 'miscellaneous/house', 'Hose': 'clothing/trousers', 'Hund': 'animals/dog', 'Kamel': 'animals/camel', 'Kamm': 'around the house/comb', 'Kerze': 'christmas/candle', 'Kopf': 'body parts/head', 'Kranz': 'christmas/wreath', 'Krone': 'accessories/crown', 'Krug': 'kitchen tools/jug', 'Lamm': 'easter/lamb', 'Maus': 'pets/mouse', 'Mund': 'body parts/mouth', 'Mütze': 'accessories/beanie', 'Ohr': 'body parts/ear', 'Rose': 'flowers/rose', 'Sand': 'summer/sand', 'Topf': 'around the house/pot', 'Uhr': 'around the house/clock', 'Vogel': 'spring/bird', 'Zahn': 'body parts/tooth'},
      look: ['*Haus *Maus Laus / *Hand *Hund *Mund / *Hose *Rose *Dose', '*Hahn Kahn *Zahn / *Glas *Gras Gas / *Kopf *Topf Zopf', '*Boot *Brot Bart / *Kamm *Lamm Damm / *Ohr *Uhr Rohr'],
      family: ['*Hand *Sand Land Wand / *Dose *Hose *Rose Lose / *Kopf *Topf Zopf Knopf'],
      blend: ['*Krone *Krug *Kranz / *Blume *Bluse Blase / *Glas *Gras Glanz'],
      syll: ['*Bie·ne *Ka·mel *Ker·ze / *Müt·ze *Vo·gel *Be·sen / *Ei·mer Be·gel Müt·ne'],
      call: ['Maus|*Haus Laus', 'Hund|*Mund *Hand', 'Rose|*Hose *Dose', 'Kopf|*Topf Zopf', 'Glas|*Gras Gas', 'Hahn|*Zahn Kahn', 'Lamm|*Kamm Damm', 'Uhr|*Ohr Rohr']
    },
    nl: {
      pics: {'banaan': 'fruits/banana', 'beer': 'camping/bear', 'bezem': 'around the house/broom', 'boek': 'classroom/book', 'broek': 'clothing/trousers', 'das': 'forest creatures/badger', 'emmer': 'beach/bucket', 'engel': 'christmas/angel', 'hand': 'body parts/hand', 'hond': 'animals/dog', 'huis': 'miscellaneous/house', 'jas': 'clothing/coat', 'kam': 'around the house/comb', 'kan': 'kitchen tools/jug', 'kat': 'animals/cat', 'kever': 'Things That Fly/beetle', 'klok': 'around the house/clock', 'knop': 'spring/bud', 'kok': 'occupations/cook', 'kraai': 'birds 2/crow', 'kraan': 'around the house/faucet', 'krab': 'beach/crab', 'mand': 'At the Supermarket/basket', 'mok': 'kitchen tools/mug', 'muis': 'pets/mouse', 'pan': 'around the house/pan', 'peer': 'fruits/pear', 'pen': 'around the house/pen', 'rok': 'clothing/skirt', 'slak': 'forest creatures/snail', 'slang': 'around the house/hose', 'sok': 'accessories/sock', 'tand': 'body parts/tooth', 'tas': 'At the Supermarket/bag', 'veer': 'easter/feather', 'vis': 'animals/fish', 'vogel': 'spring/bird', 'vos': 'animals/fox', 'wortel': 'At the Supermarket/carrot', 'zand': 'summer/sand'},
      look: ['*kat *kam *kan / *pan *pen pin / *hand *mand *tand', '*huis *muis ruis / *beer *peer *veer / *boek *broek boef', '*kok *rok *sok / *jas *tas *das / *vis *vos vat'],
      family: ['*hand *mand *tand *zand / *tas *jas *das was / *sok *rok *mok *kok'],
      blend: ['*krab *kraan *kraai / *klok *knop klop / *slak *slang slag'],
      syll: ['*be·zem *em·mer *ke·ver / *ba·naan *wor·tel *en·gel / *vo·gel ke·zem wor·gel'],
      call: ['kat|*kam *kan', 'hand|*mand *hond', 'muis|*huis ruis', 'peer|*beer *veer', 'pen|*pan pin', 'sok|*rok *kok', 'tas|*jas was', 'vis|*vos vat']
    },
    da: {
      pics: {'banan': 'fruits/banana', 'bille': 'Things That Fly/beetle', 'bold': 'toys/ball', 'bolt': 'tools/bolt', 'bord': 'around the house/table', 'bus': 'vehicles/bus', 'bæver': 'forest creatures/beaver', 'glad': 'emotions/happy', 'glas': 'kitchen tools/glass', 'grib': 'animals/vulture', 'gris': 'animals/pig', 'græs': 'spring/grass', 'hat': 'accessories/hat', 'hund': 'animals/dog', 'hus': 'miscellaneous/house', 'hytte': 'camping/cabin', 'hånd': 'body parts/hand', 'kam': 'around the house/comb', 'kamel': 'animals/camel', 'kanin': 'animals/rabbit', 'kat': 'animals/cat', 'kok': 'occupations/chef', 'kop': 'around the house/cup', 'krage': 'birds 2/crow', 'krans': 'christmas/wreath', 'krone': 'accessories/crown', 'krus': 'kitchen tools/mug', 'lam': 'easter/lamb', 'larve': 'forest creatures/caterpillar', 'mund': 'body parts/mouth', 'mus': 'pets/mouse', 'pose': 'At the Supermarket/bag', 'rose': 'flowers/rose', 'sand': 'summer/sand', 'skab': 'around the house/cabinet', 'ske': 'around the house/spoon', 'skib': 'vehicles/ship', 'sko': 'clothing/shoe', 'sky': 'beach/cloud', 'sok': 'accessories/sock', 'sol': 'beach/sun', 'sæk': 'christmas/sack', 'tand': 'body parts/tooth', 'vand': 'beach/water'},
      look: ['*hus *mus *bus / *kam *lam ham / *sand *tand *vand', '*sok *sol sal / *bold *bolt *bord / *ske *sko *sky', '*gris *græs *grib / *kop *kok kor / *pose *rose rase'],
      family: ['*sand *tand *vand land / *mus *hus lus *krus / *kat *hat mat sat'],
      blend: ['*krage *krans *krone / *skib *skab skal / *glas *glad glat'],
      syll: ['*ka·nin *ka·mel *ba·nan / *bæ·ver *lar·ve *hyt·te / *bil·le ka·ver ba·nin'],
      call: ['hus|*mus *bus', 'hund|*mund *hånd', 'tand|*sand *vand', 'kat|*hat *kam', 'sok|*sol *sæk', 'bold|*bolt *bord', 'gris|*græs *grib', 'kop|*kok kor']
    },
    sv: {
      pics: {'banan': 'fruits/banana', 'band': 'accessories/ribbon', 'blus': 'clothing/blouse', 'bäver': 'forest creatures/beaver', 'glad': 'emotions/happy', 'glas': 'kitchen tools/glass', 'godis': 'At the Supermarket/candy', 'gris': 'animals/pig', 'gräs': 'spring/grass', 'hand': 'body parts/hand', 'hatt': 'accessories/hat', 'hund': 'animals/dog', 'hus': 'miscellaneous/house', 'hök': 'birds 2/hawk', 'kamel': 'animals/camel', 'kanin': 'animals/rabbit', 'katt': 'animals/cat', 'knopp': 'spring/bud', 'kopp': 'around the house/cup', 'korg': 'At the Supermarket/basket', 'kors': 'easter/cross', 'kort': 'toys/cards', 'korv': 'At the Supermarket/sausage', 'kran': 'around the house/faucet', 'krans': 'christmas/wreath', 'krona': 'accessories/crown', 'kök': 'around the house/kitchen', 'ljus': 'christmas/candle', 'lök': 'At the Supermarket/onion', 'mopp': 'around the house/mop', 'morot': 'At the Supermarket/carrot', 'mus': 'pets/mouse', 'sand': 'summer/sand', 'sko': 'clothing/shoe', 'skog': 'camping/forest', 'sol': 'beach/sun', 'stuga': 'camping/cabin', 'säl': 'ocean life/seal', 'tand': 'body parts/tooth'},
      look: ['*hand *hund *band / *sand *tand land / *hus *mus bus', '*kors *kort *korg / *korv *kopp *mopp / *hatt *katt matt', '*lök *kök *hök / *glad *glas glans / *sol *säl sal'],
      family: ['*band *hand *tand *sand / *kopp *mopp *knopp topp / *mus *hus *blus *ljus'],
      blend: ['*krona *kran *krans / *sko *skog skott / *gris *gräs gräv'],
      syll: ['*ka·nin *ka·mel *ba·nan / *bä·ver *mo·rot *go·dis / *stu·ga ba·mel go·nin'],
      call: ['hand|*hund *band', 'hus|*mus bus', 'katt|*hatt matt', 'kopp|*mopp topp', 'kort|*kors *korv', 'lök|*kök *hök', 'sol|*säl sal', 'glas|*glad gas']
    },
    no: {
      pics: {'banan': 'fruits/banana', 'bever': 'forest creatures/beaver', 'bål': 'miscellaneous/bonfire', 'båt': 'vehicles/boat', 'dukke': 'toys/doll', 'glad': 'emotions/happy', 'glass': 'kitchen tools/glass', 'hane': 'farm animals/rooster', 'hatt': 'accessories/hat', 'hest': 'animals/horse', 'hus': 'miscellaneous/house', 'hytte': 'camping/cabin', 'kamel': 'animals/camel', 'kanin': 'animals/rabbit', 'katt': 'animals/cat', 'knopp': 'spring/bud', 'kopp': 'around the house/cup', 'kors': 'easter/cross', 'kort': 'toys/cards', 'kost': 'around the house/broom', 'kran': 'around the house/faucet', 'krans': 'christmas/wreath', 'krone': 'accessories/crown', 'kål': 'vegetables/cabbage', 'larve': 'forest creatures/caterpillar', 'mopp': 'around the house/mop', 'mus': 'pets/mouse', 'pose': 'At the Supermarket/bag', 'rose': 'flowers/rose', 'sel': 'ocean life/seal', 'skap': 'around the house/cabinet', 'ski': 'winter/skiing', 'sko': 'clothing/shoe', 'sky': 'beach/cloud', 'sol': 'beach/sun', 'sopp': 'At the Supermarket/mushroom', 'svane': 'animals/swan', 'tann': 'body parts/tooth', 'trane': 'birds 2/crane', 'vann': 'beach/water', 'vest': 'accessories/vest'},
      look: ['*hus *mus lus / *hatt *katt matt / *kopp *mopp *sopp', '*kort *kors *kost / *ski *sko *sky / *tann *vann mann', '*sel *sol sal / *bål *båt *kål / *hest *vest rest'],
      family: ['*kopp *mopp *sopp *knopp / *hane *svane *trane bane / *pose *rose dose lose'],
      blend: ['*krone *kran *krans / *skap *sko skal / *glass *glad glatt'],
      syll: ['*ka·nin *ka·mel *ba·nan / *be·ver *duk·ke *hyt·te / *lar·ve ba·mel be·nin'],
      call: ['hus|*mus lus', 'katt|*hatt matt', 'kopp|*mopp *sopp', 'kort|*kors *kost', 'sko|*ski *sky', 'sol|*sel sal', 'båt|*bål *kål', 'vest|*hest rest']
    },
    es: {
      pics: {'boca': 'body parts/mouth', 'burro': 'animals/donkey', 'cama': 'around the house/bed', 'capa': 'accessories/cape', 'cara': 'body parts/face', 'casa': 'miscellaneous/house', 'cuna': 'furniture/crib', 'flor': 'easter/flower', 'foca': 'ocean life/seal', 'fresa': 'fruits/strawberry', 'gato': 'animals/cat', 'globo': 'toys/balloon', 'gorro': 'accessories/beanie', 'libro': 'classroom/book', 'lobo': 'animals/wolf', 'loro': 'pets/parrot', 'luna': 'camping/moon', 'mano': 'body parts/hand', 'mapa': 'camping/map', 'mono': 'zoo animals/monkey', 'papa': 'At the Supermarket/potato', 'pato': 'animals/duck', 'perro': 'animals/dog', 'piña': 'fruits/pineapple', 'plato': 'around the house/plate', 'playa': 'summer/beach', 'pluma': 'around the house/pen', 'pollo': 'birds 2/chicken', 'queso': 'At the Supermarket/cheese', 'roca': 'beach/rock', 'rosa': 'flowers/rose', 'silla': 'around the house/chair', 'toro': 'farm animals/bull', 'tren': 'vehicles/train', 'trébol': 'flowers/clover', 'zorro': 'animals/fox'},
      look: ['*gato *pato rato / *cama *casa *cara / *mapa *papa *capa', '*lobo *loro *toro / *roca *rosa *boca / *mano *mono mago', '*luna *cuna tuna / *gorro *zorro morro / *piña riña viña'],
      family: ['*gato *pato *plato rato / *capa *mapa *papa chapa / *roca *boca *foca toca'],
      blend: ['*flor *fresa freno / *plato *pluma *playa / *tren *trébol trigo'],
      syll: ['*pe·rro *bu·rro *po·llo / *si·lla *que·so *li·bro / *glo·bo pe·llo si·bro'],
      call: ['gato|*pato rato', 'cama|*casa *cara', 'mapa|*papa *capa', 'loro|*toro *lobo', 'rosa|*roca ropo', 'mano|*mono mago', 'luna|*cuna tuna', 'piña|riña viña']
    },
    it: {
      pics: {'benda': 'hospital/bandage', 'cane': 'animals/dog', 'colla': 'classroom/glue', 'cravatta': 'accessories/tie', 'croce': 'easter/cross', 'cubo': 'shapes/cube', 'culla': 'furniture/crib', 'gatto': 'animals/cat', 'gazza': 'birds 2/magpie', 'letto': 'around the house/bed', 'naso': 'body parts/nose', 'pacco': 'post office/package', 'palla': 'toys/ball', 'pane': 'At the Supermarket/bread', 'porta': 'around the house/door', 'sacco': 'christmas/sack', 'scala': 'tools/ladder', 'scarpa': 'clothing/shoe', 'scopa': 'around the house/broom', 'sedia': 'around the house/chair', 'tazza': 'around the house/cup', 'tenda': 'camping/tent', 'topo': 'pets/mouse', 'toro': 'farm animals/bull', 'torta': 'At the Supermarket/pie', 'treno': 'vehicles/train', 'tromba': 'music/trumpet', 'tubo': 'around the house/hose', 'vaso': 'around the house/vase', 'viso': 'body parts/face'},
      look: ['*cane *pane lane / *naso *vaso *viso / *topo *toro tono', '*porta *torta corta / *tenda *benda renda / *sacco *pacco tacco', '*tazza *gazza pazza / *cubo *tubo cupo / *colla *culla bolla'],
      family: ['*cane *pane lane / *vaso *naso caso / *torta *porta corta', '*sacco *pacco tacco / *tazza *gazza pazza / *tenda *benda renda'],
      blend: ['*croce *cravatta crema / *scala *scopa *scarpa / *treno *tromba trono'],
      syll: ['*gat·to *pal·la *let·to / *tor·ta *taz·za *ten·da / *se·dia gat·la let·za'],
      call: ['cane|*pane lane', 'naso|*vaso *viso', 'topo|*toro tono', 'porta|*torta corta', 'sacco|*pacco tacco', 'tazza|*gazza pazza', 'tenda|*benda renda', 'cubo|*tubo cupo']
    },
    pt: {
      pics: {'balde': 'beach/bucket', 'banco': 'furniture/bench', 'barco': 'vehicles/boat', 'bola': 'toys/ball', 'bolo': '4th of July/cake', 'burro': 'animals/donkey', 'cama': 'around the house/bed', 'capa': 'accessories/cape', 'carro': 'vehicles/car', 'casa': 'miscellaneous/house', 'cinto': 'accessories/belt', 'dente': 'body parts/tooth', 'faca': 'around the house/knife', 'flauta': 'music/flute', 'flor': 'easter/flower', 'gato': 'animals/cat', 'jato': 'vehicles/jet', 'livro': 'classroom/book', 'maca': 'hospital/stretcher', 'mão': 'body parts/hand', 'pato': 'animals/duck', 'pena': 'easter/feather', 'pente': 'around the house/comb', 'pera': 'fruits/pear', 'pombo': 'birds 2/pigeon', 'porta': 'around the house/door', 'praia': 'summer/beach', 'prato': 'around the house/plate', 'prego': 'tools/nail', 'pão': 'At the Supermarket/bread', 'rato': 'pets/mouse', 'torta': 'At the Supermarket/pie', 'trem': 'vehicles/train', 'trenó': 'christmas/sleigh', 'trevo': 'flowers/clover', 'vaca': 'farm animals/cow'},
      look: ['*gato *pato *rato / *faca *vaca fava / *bola *bolo bota', '*cama *capa *casa / *mão *pão cão / *dente *pente gente', '*porta *torta corta / *pera *pena peça / *pombo tombo lombo'],
      family: ['*gato *pato *rato *jato / *faca *vaca *maca saca / *porta *torta corta horta'],
      blend: ['*prato *praia *prego / *trem *trenó *trevo / *flor *flauta flora'],
      syll: ['*car·ro *bar·co *bur·ro / *ban·co *bal·de *cin·to / *li·vro car·co ban·ro'],
      call: ['gato|*pato *rato', 'faca|*vaca fava', 'bola|*bolo bova', 'cama|*casa *capa', 'pão|*mão cão', 'dente|*pente gente', 'pera|*pena peça', 'porta|*torta corta']
    },
    fr: {
      pics: {'bateau': 'vehicles/boat', 'bougie': 'christmas/candle', 'canard': 'animals/duck', 'carte': 'camping/map', 'chat': 'animals/cat', 'chou': 'vegetables/cabbage', 'clou': 'tools/nail', 'crabe': 'beach/crab', 'croix': 'easter/cross', 'crêpe': 'breakfast/pancake', 'dauphin': 'animals/dolphin', 'gland': 'miscellaneous/acorn', 'globe': 'classroom/globe', 'juge': 'occupations/judge', 'jupe': 'clothing/skirt', 'lapin': 'animals/rabbit', 'luge': 'winter/sled', 'lune': 'camping/moon', 'lutin': 'christmas/elf', 'main': 'body parts/hand', 'pain': 'At the Supermarket/bread', 'plage': 'summer/beach', 'plume': 'easter/feather', 'pomme': 'fruits/apple', 'poule': 'farm animals/hen', 'poêle': 'around the house/pan', 'robe': 'clothing/dress', 'rose': 'flowers/rose', 'sable': 'summer/sand', 'table': 'around the house/table', 'tapis': 'around the house/carpet', 'tarte': 'At the Supermarket/pie', 'terre': 'space/earth', 'train': 'vehicles/train', 'vache': 'farm animals/cow', 'verre': 'kitchen tools/glass'},
      look: ['*pomme somme comme / *robe *rose ronde / *pain *main bain', '*chat chut *chou / *juge *luge *lune / *vache tache *clou', '*sable *table fable / *terre *verre serre / *carte *tarte parte'],
      family: ['*pain *main *train / *table *sable fable / *verre *terre serre', '*robe *globe lobe / *juge *luge déluge / *clou *chou trou'],
      blend: ['*plume *plage plaid / *crabe *crêpe *croix / *globe *gland grand'],
      syll: ['*la·pin *ba·teau *ca·nard / *lu·tin *ta·pis *bou·gie / *dau·phin ba·pin ca·teau'],
      call: ['pain|*main bain', 'juge|*luge *jupe', 'chou|*clou choc', 'table|*sable fable', 'verre|*terre serre', 'carte|*tarte carpe', 'lune|*luge dune', 'poule|*poêle boule']
    },
    fi: {
      pics: {'bussi': 'vehicles/bus', 'hana': 'around the house/faucet', 'kakku': '4th of July/cake', 'kala': 'animals/fish', 'kana': 'farm animals/hen', 'kani': 'animals/rabbit', 'kauha': 'kitchen tools/ladle', 'kello': 'around the house/clock', 'kirja': 'classroom/book', 'kissa': 'animals/cat', 'kokki': 'occupations/chef', 'kukka': 'easter/flower', 'kukko': 'farm animals/rooster', 'kuu': 'camping/moon', 'lintu': 'spring/bird', 'lokki': 'animals/seagull', 'lukko': 'around the house/lock', 'maito': 'breakfast/milk', 'mato': 'insects and bugs/worm', 'matto': 'around the house/carpet', 'nauha': 'accessories/ribbon', 'pallo': 'toys/ball', 'pullo': 'kitchen tools/bottle', 'sukka': 'accessories/sock', 'suu': 'body parts/mouth', 'takka': 'around the house/fireplace', 'takki': 'clothing/coat', 'taksi': 'vehicles/taxi', 'tikka': 'animals/woodpecker', 'tuoli': 'around the house/chair', 'tussi': 'classroom/marker'},
      look: ['*kana *kala *kani / *kukka *kukko *sukka / *pallo *pullo pulla', '*takka *takki *tikka / *maito *matto *mato / *kuu *suu muu', '*kauha *nauha rauha / *kokki *lokki kokko / *bussi *tussi pussi'],
      family: ['*sukka *kukka nukka / *kauha *nauha rauha / *bussi *tussi pussi', '*kuu *suu muu / *hana *kana sana / *lukko *kukko ukko'],
      blend: [],
      syll: ['*kis·sa *pal·lo *kak·ku / *tuo·li *lin·tu *kel·lo / *kir·ja kis·tu pal·ja'],
      call: ['kana|*kala *kani', 'kukka|*kukko *sukka', 'pallo|*pullo pulla', 'takki|*takka *taksi', 'maito|*matto *mato', 'kuu|*suu muu', 'kauha|*nauha rauha', 'bussi|*tussi pussi']
    }
  };
  /*DATA-END*/
  var BINGO_PIC = 'farm animals/dog';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['look', 'family', 'blend', 'syll', 'call'];
  var MIN_ROUNDS = 7;

  function locale(l) { l = String(l || 'en').slice(0, 2); return DATA[l] ? l : 'en'; }
  function low(s) { return String(s).normalize('NFC').toLocaleLowerCase(); }
  function plain(w) { return String(w).replace(/·/g, ''); }

  /* a card: rows split by ' / ', '*' marks a called square; the lines are every full row, column and (square grids) diagonal */
  function card(loc, src, id) {
    var rows = src.split(' / ').map(function (r) { return r.split(' '); }), cols = rows[0].length, sq = [];
    rows.forEach(function (r, y) { r.forEach(function (t, x) {
      var called = t.charAt(0) === '*', w = called ? t.slice(1) : t;
      sq.push({ i: sq.length, row: y, col: x, word: plain(w), syll: w.indexOf('·') >= 0 ? w.split('·') : null, called: called, pic: called ? DATA[loc].pics[plain(w)] : null });
    }); });
    var lines = [], y, x;
    for (y = 0; y < rows.length; y++) { var a = []; for (x = 0; x < cols; x++) a.push(y * cols + x); lines.push(a); }
    for (x = 0; x < cols; x++) { var b = []; for (y = 0; y < rows.length; y++) b.push(y * cols + x); lines.push(b); }
    if (rows.length === cols) { var d1 = [], d2 = []; for (y = 0; y < cols; y++) { d1.push(y * cols + y); d2.push(y * cols + cols - 1 - y); } lines.push(d1, d2); }
    return { id: id, cols: cols, rows: rows.length, sq: sq, lines: lines };
  }
  function cards(loc, lv) { loc = locale(loc); return (DATA[loc][lv] || []).map(function (s, k) { return card(loc, s, lv + '-' + k); }); }
  /* the rounds: one per call (card levels) or one per call-slot turn (You call) */
  function rounds(loc, lv) {
    loc = locale(loc);
    if (lv === 'call') return (DATA[loc].call || []).map(function (s, k) {
      var p = s.split('|'), need = p[0], rest = p[1].split(' ');
      var hand = [need].concat(rest.map(function (t) { return t.replace(/^\*/, ''); }));
      var decoys = rest.filter(function (t) { return t.charAt(0) === '*'; }).map(function (t) { return t.slice(1); });
      return { id: 'call-' + k + '-' + low(need), level: lv, loc: loc, k: k, need: need, needPic: DATA[loc].pics[need], hand: hand, decoys: decoys.map(function (w) { return { word: w, pic: DATA[loc].pics[w] }; }) };
    });
    var out = [];
    cards(loc, lv).forEach(function (c) { c.sq.forEach(function (s) { if (s.called) out.push({ id: c.id + '-' + low(s.word), level: lv, loc: loc, card: c, sq: s.i, word: s.word, pic: s.pic }); }); });
    return out;
  }
  function levels(loc) { loc = locale(loc); return LEVELS.filter(function (lv) { return rounds(loc, lv).length >= MIN_ROUNDS; }); }
  function level(loc, lv) { var ls = levels(loc); return ls.indexOf(lv) >= 0 ? lv : ls[0]; }

  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }

  /* the order of a pass: card by card (the cards in a shuffled order), each card's calls shuffled so that two calls in a row
     never sit in the same row of the card when it can be helped; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) {
      var o;
      if (pool[0] && pool[0].level === 'call') o = shuffle(pool.map(function (_, i) { return i; }), rnd);
      else {
        var ids = [], by = {}; pool.forEach(function (r, i) { if (!by[r.card.id]) { by[r.card.id] = []; ids.push(r.card.id); } by[r.card.id].push(i); });
        o = []; shuffle(ids, rnd).forEach(function (id) {
          /* deal by rows: always from the row with the most calls left that is not the row just called (ties at random) */
          var rows = {}; shuffle(by[id].slice(), rnd).forEach(function (i) { var y = pool[i].card.sq[pool[i].sq].row; (rows[y] = rows[y] || []).push(i); });
          var prevRow = null, left = by[id].length;
          while (left--) {
            var ys = Object.keys(rows).filter(function (y) { return rows[y].length; }), cand = ys.filter(function (y) { return String(y) !== String(prevRow); });
            if (!cand.length) cand = ys;
            var most = Math.max.apply(null, cand.map(function (y) { return rows[y].length; }));
            cand = cand.filter(function (y) { return rows[y].length === most; });
            var pick = cand[Math.floor(rnd() * cand.length)];
            o.push(rows[pick].pop()); prevRow = pick;
          }
        });
      }
      if (prev && prev.join() === o.join()) continue;
      return o;
    }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  /* letter by letter (accents are letters): which positions of the chosen word differ from the right one; extra / missing */
  function diff(right, chosen) {
    var a = Array.from(plain(right).normalize('NFC')), b = Array.from(plain(chosen).normalize('NFC')), glow = [];
    for (var i = 0; i < Math.min(a.length, b.length); i++) if (low(a[i]) !== low(b[i])) glow.push(i);
    var extra = []; for (var j = a.length; j < b.length; j++) extra.push(j);
    return { glow: glow, extra: extra, missing: Math.max(0, a.length - b.length) };
  }
  /* syllable by syllable, for the syllable card */
  function sylDiff(right, chosen) { var out = []; for (var i = 0; i < Math.max(right.length, chosen.length); i++) if (low(right[i] || '') !== low(chosen[i] || '')) out.push(i); return out; }
  /* look-alikes: same length ± 1, at most one letter different (or one letter more / less) */
  function near(a, b) {
    a = low(plain(a)); b = low(plain(b)); if (a === b) return false;
    if (a.length === b.length) { var d = 0; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d === 1; }
    if (Math.abs(a.length - b.length) !== 1) return false;
    var s = a.length < b.length ? a : b, l = a.length < b.length ? b : a;
    for (var k = 0; k < l.length; k++) if (l.slice(0, k) + l.slice(k + 1) === s) return true;
    return false;
  }

  /* ---------------- a call on a card ---------------- */
  function newCardState(c) { return { card: c, flipped: [], lines: [] }; }
  function newState(r, cs, yc) {
    var st = { r: r, chip: null, misses: 0, help: 0, show: false, last: null, done: false };
    if (r.level === 'call') { st.slot = null; st.covered = []; st.bingo = false; st.youCard = yc || youCard(r, 4, seeded(r.id)); }
    else st.cs = cs || newCardState(r.card);
    return st;
  }
  function moved(st) { st.show = false; st.last = null; }
  function placeChip(st, i) {
    if (st.done || st.r.level === 'call') return false;
    var c = st.cs.card; if (i < 0 || i >= c.sq.length || st.cs.flipped.indexOf(i) >= 0) return false;
    st.chip = st.chip === i ? null : i; moved(st); return true;
  }
  /* edit distance, letter by letter */
  function dist(a, b) { a = Array.from(low(plain(a))); b = Array.from(low(plain(b))); var d = []; for (var i = 0; i <= a.length; i++) { d.push([i]); for (var j = 1; j <= b.length; j++) d[i].push(i ? Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) : j); } return d[a.length][b.length]; }
  /* the squares to compare at miss 2: the right one and the two words on the card nearest to it (never the right one alone) */
  function family(st) {
    var c = st.cs.card, right = c.sq[st.r.sq];
    var others = c.sq.filter(function (s) { return s.i !== right.i && st.cs.flipped.indexOf(s.i) < 0; }).sort(function (a, b) { return dist(a.word, right.word) - dist(b.word, right.word) || a.i - b.i; });
    return [right.i].concat(others.slice(0, 2).map(function (s) { return s.i; }));
  }
  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (r.level === 'call') return callCheck(st);
    if (st.chip === null) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    var c = st.cs.card, chosen = c.sq[st.chip];
    if (st.chip === r.sq) {
      st.cs.flipped.push(r.sq); st.chip = null; st.done = true; st.show = false;
      var fresh = c.lines.filter(function (L) { return L.indexOf(r.sq) >= 0 && L.every(function (i) { return st.cs.flipped.indexOf(i) >= 0; }); });
      fresh.forEach(function (L) { st.cs.lines.push(L); });
      var full = c.sq.filter(function (s) { return s.called; }).every(function (s) { return st.cs.flipped.indexOf(s.i) >= 0; });
      st.last = { result: 'right', lines: fresh, full: full };
      return { ok: true, lines: fresh, full: full };
    }
    st.misses++; st.help = Math.min(3, st.misses); st.show = true;
    var rightSq = c.sq[r.sq];
    st.last = { result: 'wrong', square: st.chip, diff: diff(rightSq.word, chosen.word), syl: rightSq.syll && chosen.syll ? sylDiff(rightSq.syll, chosen.syll) : null };
    st.chip = null;
    return { ok: false, kase: 'wrong', square: st.last.square };
  }
  /* what the help shows on the board */
  function helpOf(st) {
    if (st.done || !st.show || !st.last || st.last.result !== 'wrong') return null;
    var c = st.cs.card, right = c.sq[st.r.sq], fam = st.help >= 2 ? family(st) : [];
    var lit = {}; lit[st.last.square] = st.last.diff;
    if (st.help >= 2) fam.forEach(function (i) { lit[i] = diff(right.word, c.sq[i].word); });
    return { lit: lit, syl: st.last.syl, square: st.last.square, dim: st.help >= 2 ? c.sq.map(function (s) { return s.i; }).filter(function (i) { return fam.indexOf(i) < 0 && i !== st.last.square && st.cs.flipped.indexOf(i) < 0; }) : [], pulse: st.help >= 3 ? st.r.sq : -1 };
  }
  function leftovers(c) { return c.sq.filter(function (s) { return !s.called; }).map(function (s) { return s.word; }); }

  /* ---------------- You call ---------------- */
  /* Bingo's picture card for a round: the needed picture at a balanced position, a line through it with two pictures already
     chipped, the decoys off that line, the rest pictures from other rounds that are no look-alike of this round's words */
  function youCard(r, pos, rnd) {
    var R = rounds(r.loc, 'call'), words = r.hand;
    var fillers = []; R.forEach(function (o) { [{ word: o.need, pic: o.needPic }].concat(o.decoys).forEach(function (f) { if (f.pic && words.indexOf(f.word) < 0 && !words.some(function (w) { return near(w, f.word); }) && !fillers.some(function (x) { return x.pic === f.pic || x.word === f.word; })) fillers.push(f); }); });
    var lines = card(r.loc, '*a *b *c / *d *e *f / *g *h *i', 'you').lines.filter(function (L) { return L.indexOf(pos) >= 0; });
    var line = lines[Math.floor(rnd() * lines.length)], sq = [];
    for (var i = 0; i < 9; i++) sq.push(null);
    sq[pos] = { word: r.need, pic: r.needPic, need: true };
    var off = []; for (var j = 0; j < 9; j++) if (line.indexOf(j) < 0) off.push(j);
    shuffle(off, rnd);
    r.decoys.forEach(function (d, k) { sq[off[k]] = { word: d.word, pic: d.pic, decoy: true }; });
    shuffle(fillers, rnd); var f = 0;
    for (var m = 0; m < 9; m++) if (!sq[m]) { var fl = fillers[f++]; sq[m] = { word: fl.word, pic: fl.pic, chipped: line.indexOf(m) >= 0 }; }
    return { sq: sq, line: line, pos: pos };
  }
  /* the positions of the needed picture over a pass: all nine visited across two passes */
  function youPositions(n, pass, seed) { var all = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8], seeded('pos' + (seed || '') + Math.floor(pass / 2))), a = all.concat(all, all), start = (pass % 2) * n; return a.slice(start, start + n); }
  /* the hand: the right card's slot balanced over a pass (3/3/2) */
  function dealHands(R, rnd) {
    var slots = []; for (var q = 0; q < R.length; q++) slots.push(q % 3); shuffle(slots, rnd);
    return R.map(function (r, k) { var others = r.hand.slice(1); if (rnd() < 0.5) others.reverse(); var h = [], oi = 0; for (var s = 0; s < 3; s++) h.push(s === slots[k] ? r.need : others[oi++]); return h; });
  }
  function putInSlot(st, w) { if (st.done || st.r.level !== 'call' || st.r.hand.indexOf(w) < 0) return false; st.slot = st.slot === w ? null : w; moved(st); return true; }
  /* Bingo reads exactly what he is given and covers the picture it names, or nothing */
  function callCheck(st) {
    var r = st.r, yc = st.youCard;
    if (!st.slot) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    var w = st.slot, at = -1;
    for (var i = 0; i < 9; i++) if (yc.sq[i].word === w) at = i;
    st.slot = null;
    if (at === yc.pos) { st.covered.push(at); st.bingo = true; st.done = true; st.show = false; st.last = { result: 'right', at: at }; return { ok: true, at: at }; }
    st.misses++; st.help = Math.min(2, st.misses); st.show = true;
    if (at >= 0 && st.covered.indexOf(at) < 0) st.covered.push(at);
    st.last = { result: at >= 0 ? 'decoy' : 'none', at: at, word: w, diff: diff(r.need, w) };
    return { ok: false, kase: st.last.result, at: at };
  }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result;
    if (st.r.level === 'call') { if (R === 'empty') return 'hintEmptyCall'; if (st.help >= 2) return 'hintCall2'; return R === 'decoy' ? 'hintCallDecoy' : 'hintCallNone'; }
    if (R === 'empty') return 'hintEmpty';
    if (st.help >= 2) return st.r.level === 'syll' ? 'hintMiss2Syl' : 'hintMiss2';
    return st.r.level === 'syll' ? 'hintMissSyl' : 'hintMiss';
  }
  function layout(W, cols) {
    var wide = W >= 560, tiny = W < 310, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.dog = wide ? 96 : tiny ? 56 : 64; L.callPic = wide ? 136 : tiny ? 88 : 96;
    L.cols = wide ? cols : 3;
    L.sqW = Math.min(wide ? (cols === 4 ? 118 : 156) : 112, Math.floor((W - 8 * (L.cols - 1)) / L.cols));
    L.sqH = wide ? 98 : tiny ? 64 : 72; L.font = wide ? (cols === 4 ? 32 : 38) : tiny ? 24 : 28; L.flip = wide ? 72 : tiny ? 56 : 64;
    L.youPic = wide ? 72 : tiny ? 56 : 64;
    return L;
  }

  return {
    DATA: DATA, BINGO_PIC: BINGO_PIC, LOCALES: LOCALES, LEVELS: LEVELS, MIN_ROUNDS: MIN_ROUNDS,
    locale: locale, plain: plain, cards: cards, rounds: rounds, levels: levels, level: level, seeded: seeded, order: order,
    diff: diff, sylDiff: sylDiff, near: near, dist: dist, newCardState: newCardState, newState: newState, placeChip: placeChip, family: family, check: check, helpOf: helpOf, leftovers: leftovers,
    youCard: youCard, youPositions: youPositions, dealHands: dealHands, putInSlot: putInSlot, hint: hint, layout: layout
  };
}));
