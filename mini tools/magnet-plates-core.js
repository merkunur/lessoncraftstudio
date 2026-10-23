/* =====================================================================
   magnet-plates-core.js — the model of ACTIVITY #77 of the one-by-one
   rebuild: "Sunny-Side Diner" → THE MAGNET PLATES AND THE GOLDEN "AND"
   (L.K.1.f, 11 locales). Design sheet:
   docs/activities-rebuild/designs/077-sunny-side-diner.md
   ---------------------------------------------------------------------
   THE INVENTION: order plates are magnets that push each other apart —
   only the golden "and" holds two of them together, and the kitchen hatch
   opens only for a WHOLE sentence: the beginning cap ("I would like"), the
   plates joined, and the end cap ("please."). With a third plate the first
   "and" turns into a comma by itself (en keeps ", and").
   Rounds: gather the order on the tray, then build the sentence (l1) · the
   missing "and" (l2) · fix the robot's order (l3) · "and one more thing!"
   (l4). Every phrase, cap and conjunction is a LITERAL per-locale string —
   nothing is inflected or spelled by code; the sentence is those pieces
   joined by spaces and commas. No DOM. UMD: window.MagnetPlatesCore /
   module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MagnetPlatesCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['l1', 'l2', 'l3', 'l4'];
  var ORDERS = ['show', 'listen'];
  var MAXQ = 3;

  /* the pictures (library, colour) */
  var FOOD_PIC = {
    pancake: 'breakfast/pancake', croissant: 'breakfast/croissant', donut: 'breakfast/donut', muffin: 'breakfast/muffin',
    banana: 'breakfast/banana', apple: 'breakfast/apple', orange: 'breakfast/orange', strawberry: 'breakfast/strawberry',
    milk: 'breakfast/milk', waffle: 'bakery/waffle', cookie: 'bakery/cookie', cupcake: 'bakery/cupcake', bagel: 'bakery/bagel',
    juice: 'At the Supermarket/juice'
  };
  var CUSTOMER_PIC = { bear: 'camping/bear', cat: 'pets/cat', mouse: 'pets/mouse', pig: 'farm animals/pig', rabbit: 'pets/rabbit', robot: 'toys/robot' };
  /* drinks are mass nouns: no numeral on the ticket, one bottle on the tray, no count word on the plate */
  var DRINKS = { milk: 1, juice: 1 };

  /* the rounds (the same in every locale). [food, qty] pairs; a drink is always [drink, 1].
     l1/l4: the order + the bins (four, the order's foods placed so each bin holds an order food equally often).
     l2: the plates ready, no "and"; the end cap already docked in the first three.
     l3: the robot's sentence with one wrong plate (slot, plate) and one more spare plate on the counter.
     l4: as l1, then a third item arrives. */
  var ROUNDS = {
    l1: [
      { c: 'bear', o: [['pancake', 2], ['milk', 1]], bins: ['pancake', 'milk', 'croissant', 'juice'] },
      { c: 'cat', o: [['croissant', 2], ['juice', 1]], bins: ['waffle', 'milk', 'croissant', 'juice'] },
      { c: 'mouse', o: [['waffle', 1], ['banana', 2]], bins: ['waffle', 'cookie', 'banana', 'apple'] },
      { c: 'pig', o: [['cookie', 3], ['milk', 1]], bins: ['donut', 'milk', 'banana', 'cookie'] },
      { c: 'rabbit', o: [['muffin', 2], ['juice', 1]], bins: ['juice', 'cupcake', 'orange', 'muffin'] },
      { c: 'bear', o: [['bagel', 1], ['strawberry', 3]], bins: ['muffin', 'strawberry', 'bagel', 'apple'] },
      { c: 'cat', o: [['donut', 2], ['orange', 1]], bins: ['orange', 'donut', 'pancake', 'juice'] },
      { c: 'mouse', o: [['apple', 3], ['cupcake', 1]], bins: ['banana', 'cookie', 'cupcake', 'apple'] }
    ],
    l2: [
      { c: 'bear', o: [['cookie', 3], ['milk', 1]], end: true },
      { c: 'cat', o: [['muffin', 2], ['juice', 1]], end: true },
      { c: 'rabbit', o: [['waffle', 1], ['orange', 1]], end: true },
      { c: 'mouse', o: [['banana', 2], ['milk', 1]], end: false },
      { c: 'pig', o: [['pancake', 2], ['juice', 1]], end: false },
      { c: 'bear', o: [['strawberry', 3], ['bagel', 1]], end: false },
      { c: 'cat', o: [['croissant', 1], ['apple', 2]], end: false }
    ],
    l3: [
      { c: 'robot', o: [['croissant', 2], ['milk', 1]], slot: 1, bad: ['juice', 1], spare: [['milk', 1], ['banana', 2]] },
      { c: 'robot', o: [['pancake', 1], ['banana', 2]], slot: 0, bad: ['waffle', 1], spare: [['pancake', 2], ['pancake', 1]] },
      { c: 'robot', o: [['cookie', 3], ['juice', 1]], slot: 0, bad: ['cookie', 2], spare: [['cookie', 3], ['strawberry', 3]] },
      { c: 'robot', o: [['muffin', 2], ['orange', 1]], slot: 1, bad: ['apple', 1], spare: [['milk', 1], ['orange', 1]] },
      { c: 'robot', o: [['bagel', 1], ['strawberry', 2]], slot: 0, bad: ['cupcake', 1], spare: [['bagel', 1], ['waffle', 1]] },
      { c: 'robot', o: [['donut', 2], ['milk', 1]], slot: 0, bad: ['donut', 3], spare: [['donut', 1], ['donut', 2]] },
      { c: 'robot', o: [['waffle', 1], ['apple', 3]], slot: 1, bad: ['banana', 3], spare: [['apple', 3], ['apple', 2]] }
    ],
    l4: [
      { c: 'mouse', o: [['pancake', 2], ['milk', 1]], x: ['croissant', 1], bins: ['donut', 'pancake', 'milk', 'juice'] },
      { c: 'bear', o: [['waffle', 1], ['juice', 1]], x: ['banana', 2], bins: ['juice', 'cookie', 'milk', 'waffle'] },
      { c: 'cat', o: [['cookie', 2], ['milk', 1]], x: ['apple', 1], bins: ['muffin', 'orange', 'cookie', 'milk'] },
      { c: 'rabbit', o: [['strawberry', 3], ['juice', 1]], x: ['muffin', 1], bins: ['strawberry', 'bagel', 'milk', 'juice'] },
      { c: 'pig', o: [['donut', 2], ['orange', 1]], x: ['milk', 1], bins: ['apple', 'donut', 'juice', 'orange'] },
      { c: 'bear', o: [['bagel', 1], ['apple', 2]], x: ['juice', 1], bins: ['bagel', 'cupcake', 'apple', 'banana'] },
      { c: 'mouse', o: [['cupcake', 2], ['milk', 1]], x: ['strawberry', 3], bins: ['pancake', 'cupcake', 'milk', 'juice'] }
    ]
  };

  /* the words: per locale the beginning cap, the end cap, the "and", whether a comma stands before the last "and"
     (en: the serial comma of US schools), and every plate phrase as written — [food][qty], a drink as one string. */
  var WORDS = {
    en: { start: 'I would like', end: 'please.', and: 'and', serial: true, ph: {
      pancake: { 1: 'a pancake', 2: 'two pancakes' }, croissant: { 1: 'a croissant', 2: 'two croissants' }, waffle: { 1: 'a waffle' },
      banana: { 2: 'two bananas', 3: 'three bananas' }, cookie: { 2: 'two cookies', 3: 'three cookies' }, muffin: { 1: 'a muffin', 2: 'two muffins' },
      bagel: { 1: 'a bagel' }, strawberry: { 2: 'two strawberries', 3: 'three strawberries' }, donut: { 1: 'a donut', 2: 'two donuts', 3: 'three donuts' },
      orange: { 1: 'an orange' }, apple: { 1: 'an apple', 2: 'two apples', 3: 'three apples' }, cupcake: { 1: 'a cupcake', 2: 'two cupcakes' },
      milk: 'milk', juice: 'juice' } },
    de: { start: 'Ich hätte gern', end: 'bitte.', and: 'und', serial: false, ph: {
      pancake: { 1: 'einen Pancake', 2: 'zwei Pancakes' }, croissant: { 1: 'ein Croissant', 2: 'zwei Croissants' }, waffle: { 1: 'eine Waffel' },
      banana: { 2: 'zwei Bananen', 3: 'drei Bananen' }, cookie: { 2: 'zwei Kekse', 3: 'drei Kekse' }, muffin: { 1: 'einen Muffin', 2: 'zwei Muffins' },
      bagel: { 1: 'einen Bagel' }, strawberry: { 2: 'zwei Erdbeeren', 3: 'drei Erdbeeren' }, donut: { 1: 'einen Donut', 2: 'zwei Donuts', 3: 'drei Donuts' },
      orange: { 1: 'eine Orange' }, apple: { 1: 'einen Apfel', 2: 'zwei Äpfel', 3: 'drei Äpfel' }, cupcake: { 1: 'einen Cupcake', 2: 'zwei Cupcakes' },
      milk: 'eine Milch', juice: 'einen Saft' } },
    nl: { start: 'Ik wil graag', end: 'alstublieft.', and: 'en', serial: false, ph: {
      pancake: { 1: 'een pannenkoek', 2: 'twee pannenkoeken' }, croissant: { 1: 'een croissant', 2: 'twee croissants' }, waffle: { 1: 'een wafel' },
      banana: { 2: 'twee bananen', 3: 'drie bananen' }, cookie: { 2: 'twee koekjes', 3: 'drie koekjes' }, muffin: { 1: 'een muffin', 2: 'twee muffins' },
      bagel: { 1: 'een bagel' }, strawberry: { 2: 'twee aardbeien', 3: 'drie aardbeien' }, donut: { 1: 'een donut', 2: 'twee donuts', 3: 'drie donuts' },
      orange: { 1: 'een sinaasappel' }, apple: { 1: 'een appel', 2: 'twee appels', 3: 'drie appels' }, cupcake: { 1: 'een cupcake', 2: 'twee cupcakes' },
      milk: 'melk', juice: 'sap' } },
    da: { start: 'Jeg vil gerne have', end: 'tak.', and: 'og', serial: false, ph: {
      pancake: { 1: 'en pandekage', 2: 'to pandekager' }, croissant: { 1: 'en croissant', 2: 'to croissanter' }, waffle: { 1: 'en vaffel' },
      banana: { 2: 'to bananer', 3: 'tre bananer' }, cookie: { 2: 'to småkager', 3: 'tre småkager' }, muffin: { 1: 'en muffin', 2: 'to muffins' },
      bagel: { 1: 'en bagel' }, strawberry: { 2: 'to jordbær', 3: 'tre jordbær' }, donut: { 1: 'en donut', 2: 'to donuts', 3: 'tre donuts' },
      orange: { 1: 'en appelsin' }, apple: { 1: 'et æble', 2: 'to æbler', 3: 'tre æbler' }, cupcake: { 1: 'en cupcake', 2: 'to cupcakes' },
      milk: 'mælk', juice: 'juice' } },
    sv: { start: 'Jag skulle vilja ha', end: 'tack.', and: 'och', serial: false, ph: {
      pancake: { 1: 'en pannkaka', 2: 'två pannkakor' }, croissant: { 1: 'en croissant', 2: 'två croissanter' }, waffle: { 1: 'en våffla' },
      banana: { 2: 'två bananer', 3: 'tre bananer' }, cookie: { 2: 'två kakor', 3: 'tre kakor' }, muffin: { 1: 'en muffin', 2: 'två muffins' },
      bagel: { 1: 'en bagel' }, strawberry: { 2: 'två jordgubbar', 3: 'tre jordgubbar' }, donut: { 1: 'en munk', 2: 'två munkar', 3: 'tre munkar' },
      orange: { 1: 'en apelsin' }, apple: { 1: 'ett äpple', 2: 'två äpplen', 3: 'tre äpplen' }, cupcake: { 1: 'en cupcake', 2: 'två cupcakes' },
      milk: 'mjölk', juice: 'juice' } },
    no: { start: 'Jeg vil gjerne ha', end: 'takk.', and: 'og', serial: false, ph: {
      pancake: { 1: 'en pannekake', 2: 'to pannekaker' }, croissant: { 1: 'en croissant', 2: 'to croissanter' }, waffle: { 1: 'en vaffel' },
      banana: { 2: 'to bananer', 3: 'tre bananer' }, cookie: { 2: 'to kjeks', 3: 'tre kjeks' }, muffin: { 1: 'en muffins', 2: 'to muffins' },
      bagel: { 1: 'en bagel' }, strawberry: { 2: 'to jordbær', 3: 'tre jordbær' }, donut: { 1: 'en donut', 2: 'to donuts', 3: 'tre donuts' },
      orange: { 1: 'en appelsin' }, apple: { 1: 'et eple', 2: 'to epler', 3: 'tre epler' }, cupcake: { 1: 'en cupcake', 2: 'to cupcakes' },
      milk: 'melk', juice: 'juice' } },
    es: { start: 'Me da', end: 'por favor.', and: 'y', serial: false, ph: {
      pancake: { 1: 'un hot cake', 2: 'dos hot cakes' }, croissant: { 1: 'un cuernito', 2: 'dos cuernitos' }, waffle: { 1: 'un waffle' },
      banana: { 2: 'dos plátanos', 3: 'tres plátanos' }, cookie: { 2: 'dos galletas', 3: 'tres galletas' }, muffin: { 1: 'un muffin', 2: 'dos muffins' },
      bagel: { 1: 'un bagel' }, strawberry: { 2: 'dos fresas', 3: 'tres fresas' }, donut: { 1: 'una dona', 2: 'dos donas', 3: 'tres donas' },
      orange: { 1: 'una naranja' }, apple: { 1: 'una manzana', 2: 'dos manzanas', 3: 'tres manzanas' }, cupcake: { 1: 'un cupcake', 2: 'dos cupcakes' },
      milk: 'leche', juice: 'jugo' } },
    it: { start: 'Vorrei', end: 'per favore.', and: 'e', serial: false, ph: {
      pancake: { 1: 'un pancake', 2: 'due pancake' }, croissant: { 1: 'un cornetto', 2: 'due cornetti' }, waffle: { 1: 'un waffle' },
      banana: { 2: 'due banane', 3: 'tre banane' }, cookie: { 2: 'due biscotti', 3: 'tre biscotti' }, muffin: { 1: 'un muffin', 2: 'due muffin' },
      bagel: { 1: 'un bagel' }, strawberry: { 2: 'due fragole', 3: 'tre fragole' }, donut: { 1: 'una ciambella', 2: 'due ciambelle', 3: 'tre ciambelle' },
      orange: { 1: 'un’arancia' }, apple: { 1: 'una mela', 2: 'due mele', 3: 'tre mele' }, cupcake: { 1: 'un cupcake', 2: 'due cupcake' },
      milk: 'del latte', juice: 'un succo' } },
    pt: { start: 'Eu queria', end: 'por favor.', and: 'e', serial: false, ph: {
      pancake: { 1: 'uma panqueca', 2: 'duas panquecas' }, croissant: { 1: 'um croissant', 2: 'dois croissants' }, waffle: { 1: 'um waffle' },
      banana: { 2: 'duas bananas', 3: 'três bananas' }, cookie: { 2: 'dois cookies', 3: 'três cookies' }, muffin: { 1: 'um muffin', 2: 'dois muffins' },
      bagel: { 1: 'um bagel' }, strawberry: { 2: 'dois morangos', 3: 'três morangos' }, donut: { 1: 'um donut', 2: 'dois donuts', 3: 'três donuts' },
      orange: { 1: 'uma laranja' }, apple: { 1: 'uma maçã', 2: 'duas maçãs', 3: 'três maçãs' }, cupcake: { 1: 'um cupcake', 2: 'dois cupcakes' },
      milk: 'leite', juice: 'suco' } },
    fr: { start: 'Je voudrais', end: 's’il vous plaît.', and: 'et', serial: false, ph: {
      pancake: { 1: 'un pancake', 2: 'deux pancakes' }, croissant: { 1: 'un croissant', 2: 'deux croissants' }, waffle: { 1: 'une gaufre' },
      banana: { 2: 'deux bananes', 3: 'trois bananes' }, cookie: { 2: 'deux cookies', 3: 'trois cookies' }, muffin: { 1: 'un muffin', 2: 'deux muffins' },
      bagel: { 1: 'un bagel' }, strawberry: { 2: 'deux fraises', 3: 'trois fraises' }, donut: { 1: 'un donut', 2: 'deux donuts', 3: 'trois donuts' },
      orange: { 1: 'une orange' }, apple: { 1: 'une pomme', 2: 'deux pommes', 3: 'trois pommes' }, cupcake: { 1: 'un cupcake', 2: 'deux cupcakes' },
      milk: 'du lait', juice: 'du jus' } },
    /* fi: the polite request is a QUESTION (Saisinko …, kiitos?); one thing takes the object form, a numeral the partitive singular */
    fi: { start: 'Saisinko', end: 'kiitos?', and: 'ja', serial: false, ph: {
      pancake: { 1: 'pannukakun', 2: 'kaksi pannukakkua' }, croissant: { 1: 'croissantin', 2: 'kaksi croissantia' }, waffle: { 1: 'vohvelin' },
      banana: { 2: 'kaksi banaania', 3: 'kolme banaania' }, cookie: { 2: 'kaksi keksiä', 3: 'kolme keksiä' }, muffin: { 1: 'muffinin', 2: 'kaksi muffinia' },
      bagel: { 1: 'bagelin' }, strawberry: { 2: 'kaksi mansikkaa', 3: 'kolme mansikkaa' }, donut: { 1: 'munkin', 2: 'kaksi munkkia', 3: 'kolme munkkia' },
      orange: { 1: 'appelsiinin' }, apple: { 1: 'omenan', 2: 'kaksi omenaa', 3: 'kolme omenaa' }, cupcake: { 1: 'kuppikakun', 2: 'kaksi kuppikakkua' },
      milk: 'maitoa', juice: 'mehua' } }
  };

  function locale(l) { l = String(l || 'en').slice(0, 2); return WORDS[l] ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(v) >= 0 ? v : 'l1'; }
  function orderOf(v) { return ORDERS.indexOf(v) >= 0 ? v : 'show'; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function plate(food, qty) { return { food: food, qty: DRINKS[food] ? 1 : qty }; }
  function same(a, b) { return !!a && !!b && a.food === b.food && a.qty === b.qty; }
  function isDrink(food) { return !!DRINKS[food]; }

  /* the phrase written on a plate (literal) */
  function phrase(loc, p) {
    var W = WORDS[locale(loc)].ph[p.food];
    if (typeof W === 'string') return W;
    if (!W || !W[p.qty]) throw new Error('no phrase ' + loc + ' ' + p.food + ' ' + p.qty);
    return W[p.qty];
  }
  function words(loc) { return WORDS[locale(loc)]; }

  function ids(level) { var a = ROUNDS[levelOf(level)], out = []; for (var i = 0; i < a.length; i++) out.push(i); return out; }
  var TYPES = { l1: 'gather', l2: 'insert', l3: 'repair', l4: 'extend' };
  /* a round */
  function round(level, idx) {
    level = levelOf(level);
    var x = ROUNDS[level][idx];
    if (!x) throw new Error('no round ' + level + ' ' + idx);
    var r = { id: level + '.' + idx, level: level, idx: idx, type: TYPES[level], customer: x.c, ticket: x.o.map(function (o) { return plate(o[0], o[1]); }) };
    if (x.bins) r.bins = x.bins.slice();
    if (level === 'l2') r.endDocked = !!x.end;
    if (level === 'l3') { r.slot = x.slot; r.bad = plate(x.bad[0], x.bad[1]); r.spare = x.spare.map(function (s) { return plate(s[0], s[1]); }); }
    if (level === 'l4') r.extra = plate(x.x[0], x.x[1]);
    return r;
  }
  /* every pass is an order-only reshuffle: never the last order, never its last round first */
  function plan(level, rnd, prev) {
    var all = ids(level);
    for (var t = 0; t < 2000; t++) { var o = shuffle(all.slice(), rnd); if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue; return o; }
    return shuffle(all.slice(), rnd);
  }

  /* ---------------- the hand ---------------- */
  function newState(r, order) {
    var st = { r: r, order: orderOf(order), phase: 'tray', tray: {}, plates: [], joints: [], end: false, extended: false, spares: [], lift: null, tries: 0, misses: 0, help: 0, last: null, done: false, at0: '' };
    if (r.type === 'insert') toRail(st, r.endDocked);
    else if (r.type === 'repair') {
      toRail(st, true);
      st.plates[r.slot] = r.bad;
      for (var i = 0; i < st.joints.length; i++) st.joints[i] = 'and';
      st.spares = r.spare.slice();
    }
    st.at0 = sig(st);
    return st;
  }
  function toRail(st, end) { st.phase = 'rail'; st.plates = st.r.ticket.map(function (p) { return plate(p.food, p.qty); }); st.joints = st.plates.slice(1).map(function () { return null; }); st.end = !!end; st.lift = null; st.at0 = sig(st); }
  function sig(st) { return [st.phase, JSON.stringify(st.tray), JSON.stringify(st.plates), st.joints.join(','), st.end, st.spares.length].join('|'); }
  function clear(st) { st.last = null; st.help = 0; }

  /* the tray */
  function addToTray(st, food) {
    if (st.done || st.phase !== 'tray' || !st.r.bins || st.r.bins.indexOf(food) < 0) return false;
    var n = st.tray[food] || 0; if (n >= MAXQ) return false;
    st.tray[food] = n + 1; clear(st); return true;
  }
  function removeFromTray(st, food) {
    if (st.done || st.phase !== 'tray' || !st.tray[food]) return false;
    st.tray[food]--; if (!st.tray[food]) delete st.tray[food]; clear(st); return true;
  }
  /* the tray against the ticket: the foods whose count is wrong (missing, short, extra) */
  function trayDiff(st) {
    var want = {}, out = [];
    st.r.ticket.forEach(function (p) { want[p.food] = p.qty; });
    st.r.bins.forEach(function (f) { if ((st.tray[f] || 0) !== (want[f] || 0)) out.push(f); });
    return out;
  }

  /* the rail: how many golden "and"s still hang on the hook */
  function hookAnds(st) { var n = 0; for (var i = 0; i < st.joints.length; i++) if (st.joints[i] !== 'and') n++; return st.phase === 'rail' ? n : 0; }
  /* lift a piece off its hook: 'and' or 'end' */
  function lift(st, what) {
    if (st.done || st.phase !== 'rail') return false;
    if (what === 'and' && hookAnds(st) < 1) return false;
    if (what === 'end' && st.end) return false;
    if (what !== 'and' && what !== 'end') return false;
    st.lift = st.lift === what ? null : what; return true;
  }
  /* drop the lifted piece on a place: 'joint:i' (between plate i and i+1), 'open:start' / 'open:end' (an open end of the rail), 'dock' (after the last plate).
     An "and" holds only where there is a plate on BOTH sides; the end cap only docks at the end. */
  function dropAt(st, where) {
    if (st.done || st.phase !== 'rail' || !st.lift) return { held: false, reason: 'none' };
    var what = st.lift; st.lift = null; clear(st);
    var m = /^joint:(\d+)$/.exec(where);
    if (what === 'and') {
      if (m) { var i = +m[1]; if (i >= 0 && i < st.joints.length && st.joints[i] !== 'and' && st.plates[i] && st.plates[i + 1]) { st.joints[i] = 'and'; return { held: true }; } }
      return { held: false, reason: 'oneSide' };
    }
    if (where === 'dock') { st.end = true; return { held: true }; }
    return { held: false, reason: 'notEnd' };
  }
  function unjoin(st, i) { if (st.done || st.phase !== 'rail' || st.joints[i] !== 'and') return false; st.joints[i] = null; clear(st); return true; }
  function undock(st) { if (st.done || st.phase !== 'rail' || !st.end) return false; st.end = false; clear(st); return true; }
  /* push plate i toward a neighbour: an unjoined pair springs apart ('repel'); a joined one holds ('locked') */
  function nudge(st, i) {
    if (st.phase !== 'rail' || !st.plates[i]) return null;
    var right = i < st.joints.length ? st.joints[i] : 'edge', left = i > 0 ? st.joints[i - 1] : 'edge';
    if (right === null || left === null) return 'repel';
    return 'locked';
  }
  /* the robot's order: take a plate off (it goes to the counter), put a counter plate in the empty place */
  function takeOff(st, i) {
    if (st.done || st.r.type !== 'repair' || st.phase !== 'rail' || !st.plates[i]) return false;
    if (st.plates.some(function (p) { return !p; })) return false;               /* one empty place at a time */
    st.spares.push(st.plates[i]); st.plates[i] = null; clear(st); return true;
  }
  function putOn(st, k) {
    if (st.done || st.r.type !== 'repair' || st.phase !== 'rail' || !st.spares[k]) return false;
    var hole = st.plates.indexOf(null); if (hole < 0) return false;
    st.plates[hole] = st.spares[k]; st.spares.splice(k, 1); clear(st); return true;
  }

  /* what is on the rail, in reading order: [{t:'start'}, {t:'plate', i}, {t:'joint', i, label:'and'|','|', and'|null}, …, {t:'end'|'dock'}] */
  function jointLabel(loc, st, i) {
    if (st.joints[i] !== 'and') return null;
    var W = words(loc), last = st.joints.length - 1;
    if (i < last && st.joints[last] === 'and') return ',';                       /* the first "and" turns into a comma once the last is joined */
    if (i === last && last > 0 && W.serial) return ', ' + W.and;
    return W.and;
  }
  /* the sentence of a list of plates, all joined (only literal pieces, joined by spaces and commas): 'A and B' · 'A, B and C' (en: 'A, B, and C') */
  function say(loc, plates) {
    var W = words(loc), n = plates.length, s = W.start + ' ';
    for (var i = 0; i < n; i++) {
      if (i > 0) s += i < n - 1 ? ', ' : (n > 2 && W.serial ? ', ' : ' ') + W.and + ' ';
      s += phrase(loc, plates[i]);
    }
    return s + ', ' + W.end;
  }
  /* the sentence the rail says; null while the rail is not whole */
  function sentence(loc, st) { return railWhole(st) ? say(loc, st.plates) : null; }
  function railWhole(st) { return st.phase !== 'tray' && st.plates.length > 0 && st.plates.every(function (p) { return !!p; }) && st.joints.every(function (j) { return j === 'and'; }) && st.end; }
  /* what the rail lacks, first thing first */
  function railFault(st) {
    var r = st.r;
    if (st.plates.some(function (p) { return !p; })) return 'hole';
    var want = r.ticket.concat(st.extended ? [r.extra] : []);
    for (var i = 0; i < st.plates.length; i++) if (!same(st.plates[i], want[i])) return 'wrongPlate';
    var last = st.joints.length - 1;
    if (st.plates.length >= 3 && st.joints[last] !== 'and' && st.joints.slice(0, last).every(function (j) { return j === 'and'; })) return 'extendGap';
    if (st.joints.some(function (j) { return j !== 'and'; })) return 'gap';
    if (!st.end) return 'end';
    return null;
  }

  /* Check: the tray against the ticket, then the rail; an extend round's first whole sentence brings the third thing */
  function check(st) {
    if (st.done) return { ok: true };
    var r = st.r;
    st.lift = null;
    if (st.phase === 'tray') {
      if (!Object.keys(st.tray).length) { st.last = { reason: 'emptyTray' }; return { ok: false, reason: 'emptyTray' }; }
      var diff = trayDiff(st);
      if (diff.length) return miss(st, 'tray', { diff: diff });
      toRail(st, false); st.tries = 0; st.help = 0; st.last = { reason: 'toRail' };
      return { ok: false, step: 'rail' };
    }
    if (sig(st) === st.at0) { st.last = { reason: 'emptyRail' }; return { ok: false, reason: 'emptyRail' }; }
    var f = railFault(st);
    if (f) return miss(st, f);
    if (r.type === 'extend' && !st.extended) {
      st.extended = true; st.plates.push(plate(r.extra.food, r.extra.qty)); st.joints.push(null); st.end = false; st.tries = 0; st.help = 0;
      st.at0 = sig(st); st.last = { reason: 'more' };
      return { ok: false, step: 'more' };
    }
    st.done = true; st.phase = 'done'; st.last = { reason: 'right' };
    return { ok: true };
  }
  function miss(st, reason, extra) { st.misses++; st.tries++; st.help = Math.min(2, st.tries); st.last = { reason: reason }; if (extra) for (var k in extra) st.last[k] = extra[k]; return { ok: false, reason: reason }; }
  function hint(st) {
    if (!st.last) return null;
    var R = st.last.reason;
    if (R === 'right' || R === 'toRail') return null;
    if (R === 'more') return 'tMore';
    if (st.help >= 2) return R === 'tray' ? 'hTray2' : 'hMiss2';
    return ({ emptyTray: 'hEmptyTray', tray: 'hTray', emptyRail: st.r.type === 'repair' ? 'hEmptyRepair' : 'hEmptyRail', gap: 'hGap', end: 'hEnd', wrongPlate: 'hWrongPlate', hole: 'hHole', extendGap: 'hExtendGap' })[R] || null;
  }
  /* miss 2: the piece that is needed and the place it goes (the view glows both) */
  function help(st) {
    if (st.help < 2 || !st.last || st.done) return null;
    var R = st.last.reason;
    if (R === 'tray') return { bins: st.last.diff.slice() };
    if (R === 'gap' || R === 'extendGap') { var i = R === 'extendGap' ? st.joints.length - 1 : st.joints.indexOf(null); return { piece: 'and', place: 'joint:' + i }; }
    if (R === 'end') return { piece: 'end', place: 'dock' };
    if (R === 'hole') { var want = st.r.ticket.concat(st.extended ? [st.r.extra] : []), h = st.plates.indexOf(null), k = -1; st.spares.forEach(function (s, j) { if (k < 0 && same(s, want[h])) k = j; }); return { spare: k, place: 'plate:' + h }; }
    if (R === 'wrongPlate') { var w = st.r.ticket.concat(st.extended ? [st.r.extra] : []), b = -1; st.plates.forEach(function (p, j) { if (b < 0 && !same(p, w[j])) b = j; }); return { plate: b }; }
    return null;
  }

  /* sizes per width: every library picture at the floor (96 at a desktop card, 64 on a phone) */
  function layout(W) {
    var wide = W >= 560, tiny = W < 300;
    return { mode: wide ? 'wide' : 'narrow', tiny: tiny, W: W, pic: wide ? 96 : 64, cust: wide ? 110 : 64, bin: wide ? 112 : tiny ? 66 : 76, plateW: wide ? 150 : 112, cap: wide ? 96 : 76 };
  }

  return {
    DATA: { ROUNDS: ROUNDS, WORDS: WORDS, FOOD_PIC: FOOD_PIC, CUSTOMER_PIC: CUSTOMER_PIC, DRINKS: DRINKS },
    LOCALES: LOCALES, LEVELS: LEVELS, ORDERS: ORDERS, MAXQ: MAXQ,
    locale: locale, levelOf: levelOf, orderOf: orderOf, shuffle: shuffle, plate: plate, same: same, isDrink: isDrink, phrase: phrase, words: words,
    ids: ids, round: round, plan: plan, newState: newState, addToTray: addToTray, removeFromTray: removeFromTray, trayDiff: trayDiff,
    hookAnds: hookAnds, lift: lift, dropAt: dropAt, unjoin: unjoin, undock: undock, nudge: nudge, takeOff: takeOff, putOn: putOn,
    jointLabel: jointLabel, say: say, sentence: sentence, railWhole: railWhole, railFault: railFault, check: check, hint: hint, help: help, layout: layout
  };
}));
