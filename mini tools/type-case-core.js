/* =====================================================================
   type-case-core.js — the model of ACTIVITY #41 of the one-by-one
   rebuild: "Match Uppercase and Lowercase Letters" → THE PRINTER'S TYPE
   CASE (RF.K.1.d; K-222, K-229, K-327).
   Design sheet: docs/activities-rebuild/designs/041-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: a printer's type case — capitals live in the UPPER drawer
   and small letters in the LOWER drawer (which is where "uppercase" and
   "lowercase" come from). Every metal letter (a sort) carries its other
   form on its back, so a wrong match tips over and shows whose letter it
   really is. Right pairs are pulled on a little press onto an alphabet
   poster.

   The Big-and-small rounds are the old activity's 88 rounds, verbatim
   (the manifest keeps them; the gate compares). A letter's other form is
   computed here with the locale's own case rules (de ß has no pair here).
   No DOM. UMD: window.TypeCaseCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TypeCaseCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  function loc(l) { return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function isUpper(ch) { return ch !== ch.toLowerCase() && ch === ch.toUpperCase(); }
  function isLower(ch) { return ch !== ch.toUpperCase() && ch === ch.toLowerCase(); }
  /* a letter's other form (the back of its sort) */
  function pairOf(ch) { if (ch === 'ß') return null; return isUpper(ch) ? ch.toLowerCase() : isLower(ch) ? ch.toUpperCase() : null; }
  function sameLetter(a, b) { return a.toLowerCase() === b.toLowerCase(); }

  /* ---------------- Big and small: the old 88 rounds (prompt, answer, look-alikes) ---------------- */
  var MATCH = {
    en: [["B", "b", "dph"], ["R", "r", "nmh"], ["E", "e", "coa"], ["G", "g", "qpy"], ["a", "A", "HNV"], ["d", "D", "BPO"], ["m", "M", "NWH"], ["q", "Q", "OGC"]],
    de: [["B", "b", "dph"], ["Ü", "ü", "uäö"], ["M", "m", "nwh"], ["G", "g", "qyp"], ["d", "D", "BPO"], ["ä", "Ä", "AÖÜ"], ["n", "N", "MHU"], ["l", "L", "ITE"]],
    fr: [["B", "b", "dph"], ["R", "r", "nmv"], ["E", "e", "coa"], ["G", "g", "qpy"], ["a", "A", "VMN"], ["d", "D", "OPB"], ["l", "L", "IET"], ["é", "É", "EFC"]],
    es: [["B", "b", "dpq"], ["Ñ", "ñ", "nmh"], ["a", "A", "EOC"], ["n", "N", "MUH"], ["q", "Q", "OCG"], ["d", "D", "BPO"], ["e", "E", "FCL"], ["ñ", "Ñ", "NMU"]],
    pt: [["B", "b", "dph"], ["R", "r", "nmv"], ["E", "e", "cao"], ["G", "g", "qpy"], ["a", "A", "HNV"], ["m", "M", "NWH"], ["f", "F", "ETL"], ["ç", "Ç", "GOQ"]],
    it: [["B", "b", "dpq"], ["M", "m", "nur"], ["O", "o", "cea"], ["G", "g", "qpd"], ["d", "D", "BPR"], ["a", "A", "EOV"], ["n", "N", "MUH"], ["e", "E", "FLC"]],
    nl: [["B", "b", "dpq"], ["R", "r", "nmu"], ["O", "o", "cea"], ["M", "m", "nuw"], ["d", "D", "BPO"], ["a", "A", "EOC"], ["g", "G", "OQC"], ["p", "P", "BRD"]],
    sv: [["B", "b", "dph"], ["R", "r", "nmf"], ["G", "g", "qyj"], ["Å", "å", "aäo"], ["e", "E", "FBC"], ["l", "L", "ITE"], ["ä", "Ä", "ÅAÖ"], ["ö", "Ö", "OÄQ"]],
    da: [["B", "b", "dph"], ["R", "r", "nmv"], ["Æ", "æ", "aeo"], ["Ø", "ø", "oae"], ["g", "G", "COQ"], ["l", "L", "ITE"], ["å", "Å", "AOØ"], ["m", "M", "NWH"]],
    no: [["B", "b", "dph"], ["R", "r", "nmh"], ["Æ", "æ", "aeo"], ["G", "g", "qyp"], ["a", "A", "OHN"], ["ø", "Ø", "OQC"], ["å", "Å", "AOH"], ["l", "L", "ITE"]],
    fi: [["B", "b", "dph"], ["R", "r", "nmi"], ["A", "a", "oec"], ["Ä", "ä", "aoö"], ["n", "N", "MHU"], ["l", "L", "ITE"], ["o", "O", "AQC"], ["ö", "Ö", "OAÄ"]]
  };

  /* ---------------- Look-alikes: SETS of 8 sorts (re-dealt every pass) ---------------- */
  var LOOK = [['b', 'bdpbqdbp'], ['d', 'dbdpqddb'], ['p', 'pqbdpqdb'], ['q', 'dqpqbpqd'], ['n', 'numhnumh'], ['M', 'MWNMHWMN'], ['E', 'EFLEEFLE']];
  var LOOK7 = { de: ['Ü', 'ÜUÄÜÖÜUÜ'], es: ['ñ', 'ñnmñnñhñ'], pt: ['ç', 'çcçocçeç'], fr: ['é', 'éeéèeécé'], sv: ['ä', 'äaåäaäåä'], fi: ['ä', 'äaöäaäöä'], da: ['ø', 'øoæøoøæø'], no: ['ø', 'øoæøoøæø'] };

  /* ---------------- In words: three words with their library pictures; two rounds in CAPITALS ---------------- */
  function W(word, pic) { var s = pic.split('/'); return { word: word, dir: s[0], key: s[1] }; }
  var WORDS = {
    en: [
      ['u', 0, [W('cake', 'desserts and sweets/cake'), W('sun', 'beach/sun'), W('bus', 'vehicles/bus')]],
      ['A', 1, [W('BANANA', 'fruits/banana'), W('HAT', 'accessories/hat'), W('SOCK', 'accessories/sock')]],
      ['o', 0, [W('robot', 'toys/robot'), W('pig', 'farm animals/pig'), W('sock', 'accessories/sock')]],
      ['e', 0, [W('fox', 'animals/fox'), W('elephant', 'animals/elephant'), W('bee', 'farm animals/bee')]],
      ['I', 1, [W('PIG', 'farm animals/pig'), W('CUP', 'kitchen tools/cup'), W('FISH', 'animals/fish')]],
      ['t', 0, [W('tent', 'camping/tent'), W('cat', 'farm animals/cat'), W('sun', 'beach/sun')]],
      ['b', 0, [W('baby', 'toys/baby'), W('cup', 'kitchen tools/cup'), W('crab', 'beach/crab')]]
    ],
    de: [
      ['a', 0, [W('Katze', 'pets/cat'), W('Fuchs', 'animals/fox'), W('Banane', 'fruits/banana')]],
      ['E', 1, [W('HUND', 'pets/dog'), W('ESEL', 'farm animals/donkey'), W('ELEFANT', 'animals/elephant')]],
      ['ü', 0, [W('Mütze', 'accessories/beanie'), W('Tür', 'around the house/door'), W('Maus', 'pets/mouse')]],
      ['n', 0, [W('Spinne', 'insects and bugs/spider'), W('Mond', 'space/moon'), W('Igel', 'forest creatures/hedgehog')]],
      ['U', 1, [W('BOOT', 'vehicles/boat'), W('UHR', 'around the house/clock'), W('HUT', 'accessories/hat')]],
      ['e', 0, [W('Seestern', 'beach/starfish'), W('Kamm', 'around the house/comb'), W('Biene', 'farm animals/bee')]],
      ['t', 0, [W('Löwe', 'zoo animals/lion'), W('Karotte', 'vegetables/carrot'), W('Gitarre', 'music/guitar')]]
    ],
    fr: [
      ['a', 0, [W('ananas', 'fruits/pineapple'), W('chat', 'pets/cat'), W('poisson', 'animals/fish')]],
      ['O', 1, [W('ROBOT', 'toys/robot'), W('LAPIN', 'animals/rabbit'), W('OURS', 'forest creatures/bear')]],
      ['é', 0, [W('lune', 'space/moon'), W('éléphant', 'animals/elephant'), W('fusée', 'space/rocket')]],
      ['e', 0, [W('vache', 'farm animals/cow'), W('lit', 'furniture/bed'), W('pomme', 'fruits/apple')]],
      ['I', 1, [W('KIWI', 'fruits/kiwi'), W('POULE', 'farm animals/hen'), W('BUS', 'vehicles/bus')]],
      ['t', 0, [W('chien', 'pets/dog'), W('tomate', 'vegetables/tomato'), W('carotte', 'vegetables/carrot')]],
      ['s', 0, [W('saucisse', 'breakfast/sausage'), W('souris', 'pets/mouse'), W('vélo', 'vehicles/bicycle')]]
    ],
    es: [
      ['a', 0, [W('sol', 'beach/sun'), W('vaca', 'farm animals/cow'), W('rana', 'pets/frog')]],
      ['O', 1, [W('OSO', 'forest creatures/bear'), W('CAMA', 'furniture/bed'), W('TAZA', 'kitchen tools/cup')]],
      ['ñ', 0, [W('piña', 'fruits/pineapple'), W('luna', 'space/moon'), W('araña', 'insects and bugs/spider')]],
      ['e', 0, [W('gato', 'pets/cat'), W('elefante', 'animals/elephant'), W('pez', 'animals/fish')]],
      ['I', 1, [W('KIWI', 'fruits/kiwi'), W('SOL', 'beach/sun'), W('PIE', 'body parts/foot')]],
      ['t', 0, [W('jitomate', 'vegetables/tomato'), W('gato', 'farm animals/cat'), W('foca', 'ocean life/seal')]],
      ['o', 0, [W('globo', 'toys/balloon'), W('mesa', 'furniture/table'), W('coco', 'fruits/coconut')]]
    ],
    pt: [
      ['a', 0, [W('vaca', 'farm animals/cow'), W('sol', 'beach/sun'), W('gato', 'pets/cat')]],
      ['E', 1, [W('LUA', 'space/moon'), W('ELEFANTE', 'animals/elephant'), W('PEIXE', 'animals/fish')]],
      ['ç', 0, [W('cabeça', 'body parts/head'), W('maçã', 'fruits/apple'), W('cavalo', 'farm animals/horse')]],
      ['o', 0, [W('bolo', 'desserts and sweets/cake'), W('polvo', 'ocean life/octopus'), W('mesa', 'furniture/table')]],
      ['U', 1, [W('CAMA', 'furniture/bed'), W('URSO', 'forest creatures/bear'), W('LUVA', 'clothing/glove')]],
      ['r', 0, [W('rato', 'pets/mouse'), W('foca', 'ocean life/seal'), W('tartaruga', 'pets/turtle')]],
      ['p', 0, [W('faca', 'kitchen tools/knife'), W('pipoca', 'At the Supermarket/popcorn'), W('copo', 'kitchen tools/glass')]]
    ],
    it: [
      ['a', 0, [W('banana', 'fruits/banana'), W('rana', 'pets/frog'), W('pesce', 'animals/fish')]],
      ['O', 1, [W('ORSO', 'forest creatures/bear'), W('LUNA', 'space/moon'), W('MELA', 'fruits/apple')]],
      ['e', 0, [W('topo', 'pets/mouse'), W('elefante', 'animals/elephant'), W('ape', 'farm animals/bee')]],
      ['I', 1, [W('KIWI', 'fruits/kiwi'), W('CANE', 'pets/dog'), W('LIBRO', 'classroom/book')]],
      ['t', 0, [W('gatto', 'pets/cat'), W('tenda', 'camping/tent'), W('sedia', 'furniture/chair')]],
      ['o', 0, [W('zebra', 'zoo animals/zebra'), W('polpo', 'ocean life/octopus'), W('fiore', 'spring/flower')]],
      ['u', 0, [W('gufo', 'birds/owl'), W('mucca', 'farm animals/cow'), W('pera', 'fruits/pear')]]
    ],
    nl: [
      ['a', 0, [W('hond', 'pets/dog'), W('banaan', 'fruits/banana'), W('kat', 'pets/cat')]],
      ['E', 1, [W('EGEL', 'forest creatures/hedgehog'), W('KOE', 'farm animals/cow'), W('MUIS', 'pets/mouse')]],
      ['o', 0, [W('robot', 'toys/robot'), W('maan', 'space/moon'), W('pop', 'toys/doll')]],
      ['i', 0, [W('boot', 'vehicles/boat'), W('vis', 'animals/fish'), W('kip', 'farm animals/chicken')]],
      ['N', 1, [W('ANANAS', 'fruits/pineapple'), W('STOEL', 'furniture/chair'), W('PANDA', 'zoo animals/panda')]],
      ['e', 0, [W('peer', 'fruits/pear'), W('beer', 'forest creatures/bear'), W('hand', 'body parts/hand')]],
      ['t', 0, [W('tent', 'camping/tent'), W('muis', 'pets/mouse'), W('fiets', 'vehicles/bicycle')]]
    ],
    sv: [
      ['a', 0, [W('ananas', 'fruits/pineapple'), W('fisk', 'animals/fish'), W('katt', 'pets/cat')]],
      ['O', 1, [W('HUND', 'pets/dog'), W('ROBOT', 'toys/robot'), W('BOLL', 'toys/ball')]],
      ['å', 0, [W('båt', 'vehicles/boat'), W('får', 'farm animals/sheep'), W('hatt', 'accessories/hat')]],
      ['ö', 0, [W('björn', 'forest creatures/bear'), W('öga', 'body parts/eye'), W('äpple', 'fruits/apple')]],
      ['E', 1, [W('SOL', 'beach/sun'), W('ELEFANT', 'animals/elephant'), W('BEN', 'body parts/leg')]],
      ['t', 0, [W('tomat', 'vegetables/tomato'), W('mus', 'pets/mouse'), W('tält', 'camping/tent')]],
      ['n', 0, [W('gris', 'farm animals/pig'), W('banan', 'fruits/banana'), W('lejon', 'zoo animals/lion')]]
    ],
    da: [
      ['a', 0, [W('ananas', 'fruits/pineapple'), W('kat', 'pets/cat'), W('fisk', 'animals/fish')]],
      ['O', 1, [W('ROBOT', 'toys/robot'), W('HUND', 'pets/dog'), W('KO', 'farm animals/cow')]],
      ['æ', 0, [W('hest', 'farm animals/horse'), W('æble', 'fruits/apple'), W('næse', 'body parts/nose')]],
      ['ø', 0, [W('løve', 'zoo animals/lion'), W('ost', 'breakfast/cheese'), W('ørn', 'birds/eagle')]],
      ['E', 1, [W('ELEFANT', 'animals/elephant'), W('BEN', 'body parts/leg'), W('SOL', 'beach/sun')]],
      ['t', 0, [W('mus', 'pets/mouse'), W('tomat', 'vegetables/tomato'), W('telt', 'camping/tent')]],
      ['n', 0, [W('banan', 'fruits/banana'), W('kanin', 'animals/rabbit'), W('gris', 'farm animals/pig')]]
    ],
    no: [
      ['a', 0, [W('fisk', 'animals/fish'), W('banan', 'fruits/banana'), W('hatt', 'accessories/hat')]],
      ['O', 1, [W('ROBOT', 'toys/robot'), W('SOL', 'beach/sun'), W('MUS', 'pets/mouse')]],
      ['ø', 0, [W('løve', 'zoo animals/lion'), W('ost', 'breakfast/cheese'), W('bjørn', 'forest creatures/bear')]],
      ['å', 0, [W('katt', 'pets/cat'), W('båt', 'vehicles/boat'), W('gås', 'farm animals/goose')]],
      ['E', 1, [W('ELEFANT', 'animals/elephant'), W('HUND', 'pets/dog'), W('BEIN', 'body parts/leg')]],
      ['t', 0, [W('tomat', 'vegetables/tomato'), W('telt', 'camping/tent'), W('gris', 'farm animals/pig')]],
      ['l', 0, [W('ballong', 'toys/balloon'), W('sko', 'clothing/shoe'), W('lampe', 'furniture/lamp')]]
    ],
    fi: [
      ['a', 0, [W('kala', 'animals/fish'), W('lehmä', 'farm animals/cow'), W('kissa', 'pets/cat')]],
      ['O', 1, [W('LEIPÄ', 'At the Supermarket/bread'), W('OMENA', 'fruits/apple'), W('KOIRA', 'pets/dog')]],
      ['ä', 0, [W('pää', 'body parts/head'), W('käsi', 'body parts/hand'), W('sammakko', 'pets/frog')]],
      ['ö', 0, [W('pöllö', 'birds/owl'), W('pöytä', 'furniture/table'), W('orava', 'forest creatures/squirrel')]],
      ['I', 1, [W('AUTO', 'vehicles/car'), W('SIILI', 'forest creatures/hedgehog'), W('KIRAHVI', 'zoo animals/giraffe')]],
      ['t', 0, [W('tomaatti', 'vegetables/tomato'), W('lammas', 'farm animals/sheep'), W('kettu', 'animals/fox')]],
      ['u', 0, [W('pallo', 'toys/ball'), W('kuu', 'space/moon'), W('kukka', 'spring/flower')]]
    ]
  };

  /* ---------------- the poster: each locale's school alphabet ---------------- */
  var AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  function insertAfter(a, after, ch) { var i = a.indexOf(after); var b = a.slice(); b.splice(i + 1, 0, ch); return b; }
  var POSTER = {
    en: AZ, it: AZ, nl: AZ, de: AZ.concat(['Ä', 'Ö', 'Ü']), es: insertAfter(AZ, 'N', 'Ñ'), pt: insertAfter(AZ, 'C', 'Ç'), fr: insertAfter(AZ, 'E', 'É'),
    sv: AZ.concat(['Å', 'Ä', 'Ö']), da: AZ.concat(['Æ', 'Ø', 'Å']), no: AZ.concat(['Æ', 'Ø', 'Å']), fi: AZ.concat(['Å', 'Ä', 'Ö'])
  };

  /* ---------------- rounds ---------------- */
  var LEVELS = ['pairs', 'look', 'words'], DIRS = ['both', 'capital', 'small'];
  function level(v) { return LEVELS.indexOf(v) >= 0 ? v : 'pairs'; }
  function dir(v) { return DIRS.indexOf(v) >= 0 ? v : 'both'; }
  function rounds(l, lv, d) {
    l = loc(l); lv = level(lv); d = dir(d);
    if (lv === 'pairs') return MATCH[l].map(function (m, i) {
      var given = m[0], answer = m[1], look = m[2].split('');
      var givenUpper = isUpper(given);
      /* the direction setting turns a round round: the given letter swaps to its other form, the look-alikes too */
      if ((d === 'capital' && !givenUpper) || (d === 'small' && givenUpper)) { given = answer; answer = m[0]; look = look.map(function (c) { return pairOf(c) || c; }); }
      return { id: 'P' + (i + 1), kind: 'pairs', idx: i, given: given, answer: answer, look: look, upper: isUpper(given) };
    });
    if (lv === 'look') return LOOK.map(function (r, i) { var x = (i === 6 && LOOK7[l]) ? LOOK7[l] : r; return { id: 'L' + (i + 1), kind: 'look', idx: i, target: x[0], set: x[1].split(''), answer: x[1].split('').filter(function (c) { return c === x[0]; }).length }; });
    return WORDS[l].map(function (r, i) { var words = r[2]; var n = 0; words.forEach(function (w) { w.word.split('').forEach(function (c) { if (sameLetter(c, r[0])) n++; }); }); return { id: 'W' + (i + 1), kind: 'words', idx: i, target: r[0], caps: !!r[1], words: words, answer: n }; });
  }

  /* ---------------- the deal ---------------- */
  function seeded(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function hashId(id) { var h = 7; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return h; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  /* a look-alike stick: never all targets in one half, never strictly alternating */
  function stickOk(chars, t) {
    var hit = chars.map(function (c) { return c === t; }), h = chars.length / 2, a = 0, b = 0, i;
    for (i = 0; i < chars.length; i++) { if (hit[i]) { if (i < h) a++; else b++; } }
    if (!a || !b) return false;
    var alt = true; for (i = 1; i < hit.length; i++) if (hit[i] === hit[i - 1]) alt = false;
    return !alt;
  }
  function newState(r, rnd, pass) {
    pass = pass || 0;
    rnd = rnd || seeded(hashId(r.id + ':' + pass));
    var st = { r: r, misses: 0, help: 0, show: false, done: false, last: null };
    if (r.kind === 'pairs') {
      /* the answer's tray slot: each slot holds it exactly twice in a locale's eight rounds; the pass shifts it */
      var slot = (r.idx + pass) % 4, others = shuffle(r.look.slice(), rnd), tray = [];
      for (var i = 0, j = 0; i < 4; i++) tray.push(i === slot ? r.answer : others[j++]);
      st.tray = tray.map(function (c, k) { return { id: 's' + k, face: c, back: pairOf(c) }; });
      st.placed = null; st.bounced = null;
      st.flipped = {};
    } else if (r.kind === 'look') {
      var chars = r.set.slice();
      for (var t = 0; t < 200; t++) { shuffle(chars, rnd); if (stickOk(chars, r.target)) break; }
      st.stick = chars.map(function (c, k) { return { id: 's' + k, face: c, back: pairOf(c), marked: false }; });
      st.flipped = {};
    } else {
      var ws = shuffle(r.words.map(function (w, k) { return k; }), rnd);
      st.words = ws.map(function (k) { return r.words[k]; });
      st.letters = []; st.words.forEach(function (w, wi) { w.word.split('').forEach(function (c, ci) { st.letters.push({ id: 'w' + wi + 'c' + ci, word: wi, face: c, marked: false }); }); });
      st.count = null; st.flipped = {};
    }
    return st;
  }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function canFlip(st) { return !!(st.done || st.help >= 1); }

  /* ---------------- moves ---------------- */
  /* pairs: drop a tray sort into the empty compartment — it fits, or it tips over and shows its back */
  function drop(st, id) {
    if (st.r.kind !== 'pairs' || st.done || st.placed) return null;
    var s = byId(st.tray, id); if (!s) return null;
    st.show = false;
    if (s.face === st.r.answer) { st.placed = id; st.last = { result: 'fits' }; return st.last; }
    st.misses++; st.help = Math.min(2, st.help + 1); st.show = true; st.bounced = id;
    st.last = { result: 'wrong', face: s.face, back: s.back }; return st.last;
  }
  function lift(st) { if (st.r.kind !== 'pairs' || st.done || !st.placed) return false; st.placed = null; st.last = null; return true; }
  function flip(st, id) { if (!canFlip(st)) return false; st.flipped[id] = !st.flipped[id]; return true; }
  function mark(st, id) {
    if (st.done) return false;
    var list = st.r.kind === 'look' ? st.stick : st.r.kind === 'words' ? st.letters : null; if (!list) return false;
    var s = byId(list, id); if (!s) return false;
    s.marked = !s.marked; st.show = false; st.last = null; return true;
  }
  function setCount(st, n) { if (st.r.kind !== 'words' || st.done || n < 1 || n > 6) return false; st.count = n; st.show = false; st.last = null; return true; }
  function targetsOf(st) {
    var r = st.r;
    if (r.kind === 'look') return st.stick.filter(function (s) { return s.face === r.target; }).map(function (s) { return s.id; });
    if (r.kind === 'words') return st.letters.filter(function (s) { return sameLetter(s.face, r.target); }).map(function (s) { return s.id; });
    return [];
  }
  /* the press: prints a right column, a right set, a right count */
  function press(st) {
    var r = st.r;
    if (st.done) return st.last;
    if (r.kind === 'pairs') {
      if (!st.placed) { st.last = { result: 'empty' }; return st.last; }
      st.done = true; st.last = { result: 'ok' }; return st.last;
    }
    var list = r.kind === 'look' ? st.stick : st.letters, marked = list.filter(function (s) { return s.marked; }).map(function (s) { return s.id; }), want = targetsOf(st);
    if (!marked.length) { st.last = { result: 'empty' }; return st.last; }
    var extra = marked.filter(function (id) { return want.indexOf(id) < 0; }), missing = want.filter(function (id) { return marked.indexOf(id) < 0; });
    if (extra.length || missing.length) { st.misses++; st.help = Math.min(2, st.help + 1); st.show = true; st.last = { result: extra.length ? 'extra' : 'missing', extra: extra, missing: missing.length }; return st.last; }
    if (r.kind === 'words' && st.count !== want.length) {
      if (st.count == null) { st.last = { result: 'nocount' }; return st.last; }
      st.misses++; st.help = Math.min(2, st.help + 1); st.show = true; st.last = { result: 'count' }; return st.last;
    }
    st.done = true; st.last = { result: 'ok' }; return st.last;
  }
  function hint(st) {
    var l = st.last, r = st.r; if (!l || st.done) return null;
    if (l.result === 'empty') return r.kind === 'pairs' ? 'hintEmpty' : 'hintTap';
    if (l.result === 'nocount') return 'hintCountSet';
    if (r.kind === 'pairs') { if (l.result !== 'wrong') return null; return st.help >= 2 ? 'hintBack' : 'hintWrong'; }
    if (st.help >= 2) return 'hintBoth';
    if (l.result === 'count') return 'hintCount';
    return l.result === 'extra' ? 'hintNotTarget' : 'hintMore';
  }

  /* order-only reshuffle; pairs: never three same-direction rounds in a row; never the same answer three rounds running */
  function order(pool, rnd, prev) {
    var n = pool.length, best = null;
    for (var t = 0; t < 600; t++) {
      var o = []; for (var i = 0; i < n; i++) o.push(i);
      shuffle(o, rnd);
      if (prev && n > 1 && o.join() === prev.join()) continue;
      var bad = false;
      for (var q = 2; q < n && !bad; q++) {
        var a = pool[o[q]], b = pool[o[q - 1]], c = pool[o[q - 2]];
        if (a.kind === 'pairs' && a.upper === b.upper && a.upper === c.upper) bad = true;
        if (a.kind !== 'pairs' && a.answer === b.answer && a.answer === c.answer) bad = true;
      }
      if (bad) continue;
      best = o; break;
    }
    return best || pool.map(function (_, i) { return i; });
  }

  /* ---------------- layout ---------------- */
  function layout(W) {
    var wide = W >= 560, narrow = W < 340;
    var L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.side = wide ? 196 : 0;
    L.left = wide ? W - L.side - 12 : W;
    L.sort = wide ? 96 : narrow ? 62 : 76;
    L.sortH = wide ? 104 : narrow ? 72 : 84;
    L.glyph = wide ? 64 : narrow ? 44 : 52;
    L.stick = wide ? Math.min(96, Math.floor((L.left - 24 - 3 * 8) / 4)) : Math.floor((W - 16 - 3 * 8) / 4);
    L.pic = wide ? 72 : 36;
    L.key = wide ? 48 : 44;
    return L;
  }

  return {
    LOCALES: LOCALES, MATCH: MATCH, LOOK: LOOK, LOOK7: LOOK7, WORDS: WORDS, POSTER: POSTER, LEVELS: LEVELS, DIRS: DIRS,
    loc: loc, isUpper: isUpper, isLower: isLower, pairOf: pairOf, sameLetter: sameLetter,
    level: level, dir: dir, rounds: rounds, stickOk: stickOk, newState: newState, byId: byId, canFlip: canFlip,
    drop: drop, lift: lift, flip: flip, mark: mark, setCount: setCount, targetsOf: targetsOf, press: press, hint: hint, order: order, layout: layout
  };
}));
