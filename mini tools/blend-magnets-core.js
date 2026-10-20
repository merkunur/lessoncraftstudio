/* =====================================================================
   blend-magnets-core.js — the model of ACTIVITY #54 of the one-by-one
   rebuild: "Blend Onset and Rime" → THE BLENDING MAGNETS (RF.K.2.c, 11
   locales). Design sheet: docs/activities-rebuild/designs/054-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: the first sound and the rest of the word are two magnets
   on a rail — the gap between them is the pause, and pushing them close
   enough snaps them into one word. Then three pictures: the word, a
   picture that RHYMES (same rest, other first sound) and one with the
   SAME FIRST SOUND (other rest). The magnet test runs part by part on the
   chosen picture's own name: matching parts attract, different parts
   repel — so the rhyme shows "the end is right, the start is not".
   Level 2 (single sounds): one magnet per sound.

   Germanic locales use onset + rime; es / it / pt / fr / fi use FIRST
   SOUND + REST OF THE WORD (the honest form of this work in syllable-timed
   languages); fi's first magnet is only ever the first consonant. Every
   round below was measured from the picture library: both rhyme partners
   pictured and labelled in the locale, every picture opened on a contact
   sheet. No DOM. UMD: window.BlendMagnetsCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BlendMagnetsCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* per locale: the picture of every word; Level 1 rounds 'target rhyme same-onset'; Level 2 rounds 'target distractor distractor', sounds joined by · */
  var DATA = {
    en: {
      pics: {'cat': 'animals/cat', 'bat': 'animals/bat', 'cup': 'around the house/cup', 'hat': 'accessories/hat', 'ham': 'At the Supermarket/ham', 'bag': 'At the Supermarket/bag', 'flag': '4th of July/flag', 'bus': 'vehicles/bus', 'bed': 'around the house/bed', 'sled': 'winter/sled', 'bun': 'bakery/bun', 'pig': 'animals/pig', 'fig': 'fruits/fig', 'pen': 'around the house/pen', 'car': 'toys/car', 'jar': 'kitchen tools/jar', 'jam': 'At the Supermarket/jam', 'fan': 'around the house/fan', 'van': 'vehicles/van', 'fox': 'animals/fox', 'hen': 'farm animals/hen', 'sun': 'beach/sun', 'mug': 'kitchen tools/mug', 'jug': 'kitchen tools/jug', 'map': 'camping/map', 'sock': 'accessories/sock', 'flower': 'spring/flower', 'slide': 'toys/slide', 'star': 'christmas/star', 'stool': 'furniture/stool', 'cap': 'accessories/cap', 'dog': 'animals/dog', 'log': 'camping/log', 'duck': 'animals/duck', 'mop': 'around the house/mop', 'frog': 'camping/frog', 'crab': 'beach/crab', 'drum': 'music/drum'},
      l1: ['cat bat cup', 'hat cat ham', 'bag flag bus', 'bed sled bun', 'pig fig pen', 'car jar cat', 'jar car jam', 'fan van fox', 'hen pen hat', 'bun sun bed', 'mug jug map', 'sun bun sock', 'flag bag flower', 'sled bed slide', 'star car stool'],
      l2: ['c·a·t c·a·p b·a·t', 'p·i·g f·i·g p·e·n', 's·u·n b·u·n s·o·ck', 'd·o·g l·o·g d·u·ck', 'b·u·s b·u·n c·u·p', 'h·e·n p·e·n h·a·m', 'm·o·p m·a·p m·u·g', 'f·r·o·g f·l·a·g d·o·g', 'c·r·a·b c·a·p c·ar', 'd·r·u·m d·u·ck d·o·g', 'f·l·a·g f·a·n b·a·g']
    },
    de: {
      pics: {'maus': 'forest creatures/mouse', 'haus': 'miscellaneous/house', 'mund': 'body parts/mouth', 'hund': 'animals/dog', 'hahn': 'farm animals/rooster', 'fisch': 'animals/fish', 'tisch': 'around the house/table', 'feige': 'fruits/fig', 'topf': 'around the house/pot', 'kopf': 'body parts/head', 'nase': 'body parts/nose', 'vase': 'around the house/vase', 'netz': 'beach/net', 'kamm': 'around the house/comb', 'lamm': 'farm animals/lamb', 'kuh': 'farm animals/cow', 'schuh': 'clothing/shoe', 'rose': 'flowers/rose', 'hose': 'clothing/trousers', 'reis': 'At the Supermarket/rice', 'zahn': 'body parts/tooth', 'zug': 'toys/train', 'bein': 'body parts/leg', 'schwein': 'animals/pig', 'bett': 'around the house/bed', 'glocke': 'christmas/bell', 'socke': 'accessories/sock', 'glas': 'kitchen tools/glass', 'hut': 'accessories/hat', 'fuß': 'body parts/foot'},
      l1: ['maus haus mund', 'haus maus hund', 'hund mund hahn', 'fisch tisch feige', 'topf kopf tisch', 'nase vase netz', 'kamm lamm kopf', 'kuh schuh kamm', 'rose hose reis', 'zahn hahn zug', 'bein schwein bett', 'glocke socke glas'],
      l2: ['m·au·s h·au·s m·u·n·d', 'h·u·n·d m·u·n·d h·u·t', 'f·i·sch t·i·sch f·u·ß', 'k·a·mm l·a·mm k·o·pf', 't·o·pf k·o·pf t·i·sch', 'r·o·s·e h·o·s·e r·ei·s', 'n·a·s·e v·a·s·e n·e·tz', 'b·ei·n b·e·tt h·au·s']
    },
    nl: {
      pics: {'hond': 'animals/dog', 'mond': 'body parts/mouth', 'huis': 'miscellaneous/house', 'muis': 'forest creatures/mouse', 'sok': 'accessories/sock', 'rok': 'clothing/skirt', 'sap': 'At the Supermarket/juice', 'kam': 'around the house/comb', 'lam': 'farm animals/lamb', 'kip': 'farm animals/chicken', 'pan': 'around the house/pan', 'kan': 'kitchen tools/jug', 'pen': 'around the house/pen', 'hen': 'farm animals/hen', 'jas': 'clothing/coat', 'tas': 'At the Supermarket/bag', 'jurk': 'clothing/dress', 'vaas': 'around the house/vase', 'kaas': 'At the Supermarket/cheese', 'vos': 'animals/fox', 'peer': 'At the Supermarket/pear', 'beer': 'camping/bear', 'pot': 'around the house/pot', 'boek': 'classroom/book', 'broek': 'clothing/trousers', 'bus': 'vehicles/bus', 'schip': 'vehicles/ship', 'mus': 'birds 2/sparrow', 'slot': 'around the house/lock', 'maan': 'camping/moon', 'haan': 'farm animals/rooster', 'bal': 'toys/ball', 'bos': 'camping/forest', 'vis': 'animals/fish', 'hand': 'body parts/hand'},
      l1: ['hond mond huis', 'muis huis mond', 'sok rok sap', 'kam lam kip', 'pan kan pen', 'pen hen pan', 'jas tas jurk', 'vaas kaas vos', 'peer beer pot', 'boek broek bus', 'kip schip kam', 'bus mus boek', 'pot slot peer', 'maan haan muis'],
      l2: ['k·i·p k·a·m s·ch·i·p', 'p·e·n h·e·n p·a·n', 's·o·k r·o·k s·a·p', 'k·a·m l·a·m k·i·p', 'b·u·s m·u·s b·a·l', 'v·o·s b·o·s v·i·s', 'j·a·s t·a·s j·u·r·k', 'h·o·n·d m·o·n·d h·a·n·d']
    },
    da: {
      pics: {'hat': 'accessories/hat', 'kat': 'animals/cat', 'hund': 'animals/dog', 'mus': 'forest creatures/mouse', 'hus': 'miscellaneous/house', 'mund': 'body parts/mouth', 'kam': 'around the house/comb', 'sok': 'accessories/sock', 'kok': 'occupations/chef', 'sol': 'beach/sun', 'hest': 'animals/horse', 'vest': 'accessories/vest', 'gås': 'farm animals/goose', 'lås': 'around the house/lock', 'ged': 'farm animals/goat', 'lam': 'farm animals/lamb', 'gris': 'animals/pig', 'ris': 'At the Supermarket/rice', 'gryde': 'around the house/pot', 'stol': 'around the house/chair', 'ko': 'farm animals/cow', 'sko': 'clothing/shoe', 'kop': 'around the house/cup', 'knop': 'spring/bud', 'tand': 'body parts/tooth', 'sand': 'summer/sand', 'tog': 'toys/train', 'ben': 'body parts/leg', 'pen': 'around the house/pen', 'bus': 'vehicles/bus'},
      l1: ['hat kat hund', 'mus hus mund', 'kat hat kam', 'sok kok sol', 'hest vest hus', 'gås lås ged', 'lam kam lås', 'gris ris gryde', 'sol stol sok', 'ko sko kop', 'kop knop kat', 'tand sand tog'],
      l2: ['k·a·t h·a·t k·a·m', 'l·a·m k·a·m l·å·s', 'g·r·i·s r·i·s g·å·s', 'h·u·s m·u·s h·a·t', 's·o·k k·o·k s·o·l', 'b·e·n p·e·n b·u·s', 's·o·l s·t·o·l s·o·k', 'm·u·s b·u·s k·a·t']
    },
    sv: {
      pics: {'katt': 'animals/cat', 'hatt': 'accessories/hat', 'kam': 'around the house/comb', 'gris': 'animals/pig', 'ris': 'At the Supermarket/rice', 'gryta': 'around the house/pot', 'sol': 'beach/sun', 'stol': 'around the house/chair', 'sand': 'summer/sand', 'kopp': 'around the house/cup', 'mopp': 'around the house/mop', 'gås': 'farm animals/goose', 'lås': 'around the house/lock', 'gaffel': 'around the house/fork', 'hus': 'miscellaneous/house', 'mus': 'forest creatures/mouse', 'häst': 'animals/horse', 'väst': 'accessories/vest', 'kål': 'vegetables/cabbage', 'skål': 'around the house/bowl', 'ko': 'farm animals/cow', 'tand': 'body parts/tooth', 'hand': 'body parts/hand', 'tåg': 'toys/train', 'sko': 'clothing/shoe', 'ben': 'body parts/leg', 'bil': 'toys/car', 'bok': 'classroom/book'},
      l1: ['katt hatt kam', 'gris ris gryta', 'sol stol sand', 'kopp mopp katt', 'gås lås gaffel', 'hus mus hatt', 'häst väst hus', 'kål skål ko', 'tand hand tåg', 'ko sko kopp', 'mus hus mopp'],
      l2: ['k·a·tt h·a·tt k·a·m', 'g·r·i·s r·i·s g·å·s', 's·o·l s·t·o·l s·k·o', 'k·o·pp m·o·pp k·a·m', 'm·u·s h·u·s m·o·pp', 'k·o s·k·o k·a·m', 'h·ä·s·t v·ä·s·t h·a·tt', 'b·e·n b·i·l b·o·k']
    },
    no: {
      pics: {'katt': 'animals/cat', 'hatt': 'accessories/hat', 'kam': 'around the house/comb', 'sokk': 'accessories/sock', 'kokk': 'occupations/chef', 'sol': 'beach/sun', 'hest': 'animals/horse', 'vest': 'accessories/vest', 'hus': 'miscellaneous/house', 'gås': 'farm animals/goose', 'lås': 'around the house/lock', 'gaffel': 'around the house/fork', 'kopp': 'around the house/cup', 'mopp': 'around the house/mop', 'mus': 'forest creatures/mouse', 'lam': 'farm animals/lamb', 'gris': 'animals/pig', 'ris': 'At the Supermarket/rice', 'gryte': 'around the house/pot', 'stol': 'around the house/chair', 'bein': 'body parts/leg', 'stein': 'beach/rock', 'bil': 'toys/car', 'bok': 'classroom/book'},
      l1: ['katt hatt kam', 'sokk kokk sol', 'hest vest hus', 'gås lås gaffel', 'kopp mopp katt', 'mus hus mopp', 'lam kam lås', 'gris ris gryte', 'sol stol sokk', 'hatt katt hest', 'bein stein bil'],
      l2: ['k·a·tt h·a·tt k·a·m', 'g·r·i·s r·i·s g·å·s', 's·o·l s·t·o·l s·o·kk', 'k·o·pp m·o·pp k·a·m', 'm·u·s h·u·s m·o·pp', 'h·e·s·t v·e·s·t h·a·tt', 'l·a·m k·a·m l·å·s', 'b·i·l b·ei·n b·o·k']
    },
    es: {
      pics: {'gato': 'animals/cat', 'pato': 'animals/duck', 'gorro': 'accessories/beanie', 'luna': 'camping/moon', 'cuna': 'furniture/crib', 'lobo': 'animals/wolf', 'foca': 'zoo animals/seal', 'boca': 'body parts/mouth', 'faro': 'beach/lighthouse', 'mono': 'zoo animals/monkey', 'cono': 'shapes/cone', 'mesa': 'around the house/table', 'toro': 'farm animals/bull', 'loro': 'birds 2/parrot', 'taza': 'around the house/cup', 'zorro': 'animals/fox', 'zapato': 'clothing/shoe', 'fresa': 'At the Supermarket/strawberry', 'cama': 'around the house/bed', 'llama': 'farm animals/llama', 'casa': 'miscellaneous/house', 'papa': 'At the Supermarket/potato', 'mapa': 'camping/map', 'sol': 'beach/sun', 'col': 'vegetables/cabbage', 'silla': 'around the house/chair', 'globo': 'toys/balloon', 'capa': 'accessories/cape', 'mano': 'body parts/hand', 'sal': 'At the Supermarket/salt'},
      l1: ['gato pato gorro', 'luna cuna lobo', 'foca boca faro', 'mono cono mesa', 'toro loro taza', 'zorro gorro zapato', 'mesa fresa mono', 'cama llama casa', 'papa mapa pato', 'sol col silla', 'lobo globo luna'],
      l2: ['g·a·t·o p·a·t·o g·o·rr·o', 'l·u·n·a c·u·n·a l·o·b·o', 'f·o·c·a b·o·c·a f·a·r·o', 'm·o·n·o c·o·n·o m·e·s·a', 't·o·r·o l·o·r·o t·a·z·a', 'm·a·p·a c·a·p·a m·a·n·o', 'c·a·m·a ll·a·m·a c·a·s·a', 's·o·l c·o·l s·a·l']
    },
    it: {
      pics: {'cane': 'animals/dog', 'pane': 'At the Supermarket/bread', 'casa': 'miscellaneous/house', 'torta': 'At the Supermarket/pie', 'porta': 'around the house/door', 'tazza': 'around the house/cup', 'vaso': 'around the house/vase', 'naso': 'body parts/nose', 'volpe': 'animals/fox', 'mucca': 'farm animals/cow', 'zucca': 'At the Supermarket/pumpkin', 'mela': 'At the Supermarket/apple', 'sacco': 'christmas/sack', 'pacco': 'post office/package', 'sale': 'At the Supermarket/salt', 'tavolo': 'around the house/table', 'cavolo': 'vegetables/cabbage', 'tenda': 'camping/tent', 'cubo': 'shapes/cube', 'tubo': 'around the house/hose', 'bocca': 'body parts/mouth', 'brocca': 'kitchen tools/jug', 'borsa': 'accessories/handbag', 'nave': 'vehicles/ship', 'luna': 'camping/moon', 'lupo': 'animals/wolf', 'lama': 'farm animals/llama', 'pera': 'At the Supermarket/pear'},
      l1: ['cane pane casa', 'torta porta tazza', 'vaso naso volpe', 'mucca zucca mela', 'sacco pacco sale', 'tavolo cavolo tenda', 'cubo tubo cane', 'bocca brocca borsa', 'naso vaso nave'],
      l2: ['c·a·n·e p·a·n·e c·a·s·a', 'v·a·s·o n·a·s·o v·o·l·p·e', 'm·u·cc·a z·u·cc·a m·e·l·a', 't·o·r·t·a p·o·r·t·a t·a·zz·a', 'c·u·b·o t·u·b·o c·a·s·a', 'l·u·n·a l·u·p·o l·a·m·a', 'p·e·r·a p·a·n·e m·e·l·a', 'n·a·v·e n·a·s·o c·a·n·e']
    },
    pt: {
      pics: {'gato': 'animals/cat', 'rato': 'forest creatures/mouse', 'galo': 'farm animals/rooster', 'vaca': 'farm animals/cow', 'faca': 'around the house/knife', 'vela': 'christmas/candle', 'dente': 'body parts/tooth', 'pente': 'around the house/comb', 'dedo': 'body parts/finger', 'porta': 'around the house/door', 'torta': 'At the Supermarket/pie', 'pato': 'animals/duck', 'foca': 'zoo animals/seal', 'boca': 'body parts/mouth', 'bola': 'toys/ball', 'cola': 'classroom/glue', 'bolo': '4th of July/cake', 'janela': 'around the house/window', 'panela': 'around the house/pot', 'jarra': 'kitchen tools/jug', 'mão': 'body parts/hand', 'pão': 'At the Supermarket/bread', 'mapa': 'camping/map', 'capa': 'accessories/cape', 'mesa': 'around the house/table', 'rio': 'camping/river', 'lobo': 'animals/wolf', 'globo': 'classroom/globe', 'lua': 'camping/moon'},
      l1: ['gato rato galo', 'vaca faca vela', 'dente pente dedo', 'porta torta pato', 'foca boca faca', 'bola cola bolo', 'janela panela jarra', 'mão pão mapa', 'mapa capa mesa', 'pato gato pão'],
      l2: ['g·a·t·o p·a·t·o g·a·l·o', 'v·a·c·a f·a·c·a v·e·l·a', 'b·o·l·a c·o·l·a b·o·l·o', 'd·en·t·e p·en·t·e d·e·d·o', 'm·a·p·a c·a·p·a m·e·s·a', 'f·o·c·a b·o·c·a f·a·c·a', 'r·a·t·o g·a·t·o r·i·o', 'l·o·b·o g·l·o·b·o l·u·a']
    },
    fr: {
      pics: {'main': 'body parts/hand', 'pain': 'At the Supermarket/bread', 'moto': 'vehicles/motorcycle', 'gilet': 'accessories/vest', 'filet': 'beach/net', 'girafe': 'animals/giraffe', 'bouche': 'body parts/mouth', 'louche': 'kitchen tools/ladle', 'bol': 'around the house/bowl', 'gâteau': '4th of July/cake', 'râteau': 'around the house/rake', 'gant': 'accessories/glove', 'chaise': 'around the house/chair', 'fraise': 'At the Supermarket/strawberry', 'chou': 'vegetables/cabbage', 'poussin': 'farm animals/chick', 'coussin': 'around the house/cushion', 'robe': 'clothing/dress', 'globe': 'classroom/globe', 'riz': 'At the Supermarket/rice', 'train': 'toys/train', 'clou': 'tools/nail', 'clé': 'around the house/key', 'bus': 'vehicles/bus', 'four': 'around the house/oven', 'sac': 'At the Supermarket/bag', 'coq': 'farm animals/rooster'},
      l1: ['main pain moto', 'gilet filet girafe', 'bouche louche bol', 'gâteau râteau gant', 'chaise fraise chou', 'poussin coussin pain', 'robe globe riz', 'pain train poussin', 'clou chou clé'],
      l2: ['m·ain p·ain m·o·t·o', 'p·ain m·ain b·u·s', 't·r·ain p·ain f·ou·r', 'b·u·s b·o·l s·a·c', 'b·o·l b·u·s c·o·q', 'ch·ou c·l·ou f·ou·r', 'c·l·ou ch·ou c·o·q', 's·a·c b·u·s c·o·q']
    },
    fi: {
      pics: {'kukka': 'spring/flower', 'sukka': 'accessories/sock', 'kana': 'farm animals/chicken', 'lammas': 'animals/sheep', 'hammas': 'body parts/tooth', 'lukko': 'around the house/lock', 'kukko': 'farm animals/rooster', 'kuu': 'camping/moon', 'suu': 'body parts/mouth', 'kissa': 'animals/cat', 'hana': 'around the house/faucet', 'kala': 'animals/fish', 'kannu': 'kitchen tools/jug', 'pannu': 'around the house/pan', 'kakku': '4th of July/cake', 'bussi': 'vehicles/bus', 'tussi': 'classroom/marker', 'banaani': 'At the Supermarket/banana', 'juna': 'toys/train', 'muna': 'easter/egg', 'jalka': 'body parts/foot', 'raketti': 'toys/rocket', 'paketti': 'post office/package', 'rapu': 'beach/crab', 'kolmio': 'shapes/triangle', 'solmio': 'accessories/tie', 'koira': 'animals/dog', 'makkara': 'At the Supermarket/sausage', 'jakkara': 'furniture/stool', 'muki': 'kitchen tools/mug', 'kani': 'animals/rabbit', 'lasi': 'kitchen tools/glass', 'kassi': 'At the Supermarket/bag'},
      l1: ['kukka sukka kana', 'lammas hammas lukko', 'kukko lukko kuu', 'kuu suu kissa', 'kana hana kala', 'kannu pannu kakku', 'bussi tussi banaani', 'juna muna jalka', 'raketti paketti rapu', 'kolmio solmio koira', 'makkara jakkara muna'],
      l2: ['k·uu s·uu k·a·n·a', 'k·a·n·a h·a·n·a k·a·l·a', 'm·u·n·a j·u·n·a m·u·k·i', 'k·a·l·a k·a·n·a k·a·n·i', 'k·u·kk·a s·u·kk·a k·u·kk·o', 'l·u·kk·o k·u·kk·o l·a·s·i', 'k·a·nn·u p·a·nn·u k·a·n·a', 'k·i·ss·a k·a·ss·i k·uu']
    }
  };

  var LOCALES = Object.keys(DATA), LEVEL_KEYS = ['onset', 'sounds'];
  var VOWELS = { en: 'aeiouy', de: 'aeiouäöüy', nl: 'aeiouy', da: 'aeiouyæøå', sv: 'aeiouyåäö', no: 'aeiouyæøå', fi: 'aeiouyäö', es: 'aeiouáéíóú', it: 'aeiouàèéìòù', pt: 'aeiouáâãéêíóôõú', fr: 'aeiouyàâéèêëîïôûüœ' };
  var PULL = { strong: 0.22, gentle: 0.07 };
  function level(v) { return LEVEL_KEYS.indexOf(v) >= 0 ? v : 'onset'; }
  function locale(l) { return DATA[l] ? l : 'en'; }

  /* first sound + rest: the leading consonant letters (fi: only the first consonant) */
  function split(loc, w) {
    var V = VOWELS[loc] || VOWELS.en, i = 0;
    while (i < w.length && V.indexOf(w[i]) < 0) i++;
    if (loc === 'fi' && i > 1) i = 1;
    return [w.slice(0, i), w.slice(i)];
  }
  /* how a word is shown in the success line: German nouns keep their capital (the magnets stay lower case) */
  function display(loc, w) { return loc === 'de' ? w.charAt(0).toUpperCase() + w.slice(1) : w; }

  function rounds(loc, lv) {
    loc = locale(loc); lv = level(lv);
    var d = DATA[loc];
    if (lv === 'onset') return d.l1.map(function (t, i) {
      var ws = t.split(' ');
      return { id: 'onset-' + ws[0], level: lv, i: i, loc: loc, word: ws[0], parts: split(loc, ws[0]),
        pics: ws.map(function (w, k) { return { word: w, pic: d.pics[w], parts: split(loc, w), role: ['target', 'rhyme', 'onset'][k] }; }) };
    });
    return d.l2.map(function (t, i) {
      var ws = t.split(' ');
      return { id: 'sounds-' + ws[0].split('·').join(''), level: lv, i: i, loc: loc, word: ws[0].split('·').join(''), parts: ws[0].split('·'),
        pics: ws.map(function (p, k) { var w = p.split('·').join(''); return { word: w, pic: d.pics[w], parts: p.split('·'), role: ['target', 'a', 'b'][k] }; }) };
    });
  }

  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  /* one pass of gallery layouts: the target in each slot a third of the time (±1); the rhyme / first distractor beside the target in about half the rounds */
  function deal(n, rnd) {
    var slots = []; for (var i = 0; i < n; i++) slots.push(i % 3);
    shuffle(slots, rnd);
    var mids = slots.filter(function (s) { return s === 1; }).length, need = Math.max(0, Math.round(n / 2) - mids);
    var edges = []; slots.forEach(function (s, i) { if (s !== 1) edges.push(i); });
    shuffle(edges, rnd);
    return slots.map(function (t, i) {
      var adj = t === 1 || edges.indexOf(i) < need, other = [0, 1, 2].filter(function (s) { return s !== t; });
      var rh = t === 1 ? other[Math.floor(rnd() * 2)] : (adj ? 1 : (t === 0 ? 2 : 0));
      var lay = [null, null, null]; lay[t] = 0; lay[rh] = 1; lay[other.filter(function (s) { return s !== rh; })[0]] = 2;
      return lay;
    });
  }

  function newState(r, opts) {
    opts = opts || {};
    var n = r.parts.length, st = { r: r, gaps: [], chosen: -1, misses: 0, help: 0, show: false, last: null, done: false, test: null, pull: opts.pull === 'gentle' ? 'gentle' : 'strong' };
    for (var i = 0; i < n - 1; i++) st.gaps.push(1);
    st.layout = opts.layout || [0, 1, 2];
    return st;
  }
  function moved(st) { st.show = false; st.last = null; st.test = null; }
  /* move magnet i: its gap to the next magnet becomes g (0 = touching, 1 = far); inside the pull zone it snaps */
  function move(st, i, g) {
    if (i < 0 || i >= st.gaps.length) return false;
    g = Math.max(0, Math.min(1, g));
    if (g <= PULL[st.pull]) g = 0;
    if (g === st.gaps[i]) return false;
    st.gaps[i] = g; if (!st.done) moved(st); return true;
  }
  /* pull a snapped pair apart again (free play) */
  function separate(st, i) { if (i < 0 || i >= st.gaps.length || st.gaps[i] > 0) return false; st.gaps[i] = 0.5; if (!st.done) moved(st); return true; }
  function whole(st) { return st.gaps.every(function (g) { return g === 0; }); }
  function choose(st, slot) { if (st.done || slot < 0 || slot > 2 || st.chosen === slot) return false; st.chosen = slot; moved(st); return true; }
  function picAt(st, slot) { return st.r.pics[st.layout[slot]]; }
  /* the dots under the rail: one per sixth of the full gap */
  function dots(g) { return Math.round(g * 6); }

  /* the magnet test: the chosen picture's own name, part by part, against the blended word */
  function testPic(r, p) {
    var n = Math.max(r.parts.length, p.parts.length), out = [];
    for (var i = 0; i < n; i++) out.push({ part: p.parts[i] || '', attract: p.parts[i] !== undefined && p.parts[i] === r.parts[i] });
    return out;
  }
  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (!whole(st)) { st.show = true; st.last = { result: 'snap' }; return { ok: false, kase: 'snap' }; }
    if (st.chosen < 0) { st.show = true; st.last = { result: 'choose' }; return { ok: false, kase: 'choose' }; }
    var p = picAt(st, st.chosen), t = testPic(r, p);
    st.test = { slot: st.chosen, parts: t };
    if (p.role === 'target') { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true, test: t }; }
    var stick = t.filter(function (x) { return x.attract; }).length, kase;
    if (r.level === 'onset') kase = t[0].attract ? 'onset' : (t[1] && t[1].attract ? 'rhyme' : 'none');
    else kase = 'sounds';
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { result: kase, stick: stick, apart: t.length - stick };
    return { ok: false, kase: kase, test: t };
  }
  /* miss 2: each picture shows its first letter(s) on a little magnet */
  function helpOn(st) { return !st.done && st.show && st.help >= 2; }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result;
    if (R === 'snap') return 'hintSnap';
    if (R === 'choose') return 'hintChoose';
    if (st.help >= 2) return 'hintHelp';
    return { rhyme: 'hintRhyme', onset: 'hintOnset', none: 'hintNone', sounds: 'hintSounds' }[R];
  }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }

  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.frame = wide ? 150 : Math.max(88, Math.min(110, Math.floor((W - 24) / 3)));
    L.pic = wide ? 128 : L.frame - 18;
    L.mh = wide ? 64 : 52; L.fs = wide ? 40 : 32; L.fs2 = wide ? 32 : 28;
    return L;
  }

  return {
    DATA: DATA, LOCALES: LOCALES, LEVEL_KEYS: LEVEL_KEYS, PULL: PULL,
    level: level, locale: locale, split: split, display: display, rounds: rounds, deal: deal, newState: newState,
    move: move, separate: separate, whole: whole, choose: choose, picAt: picAt, dots: dots, testPic: testPic, check: check,
    helpOn: helpOn, hint: hint, order: order, layout: layout
  };
}));
