/* =====================================================================
   word-elastic-core.js — the model of ACTIVITY #58 of the one-by-one
   rebuild: "Build the CVC Word" → THE WORD ELASTIC (RF.K.3, 11 locales).
   Design sheet: docs/activities-rebuild/designs/058-cvc-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: the word is an elastic. Stretching it pulls out one bead
   per sound; the child puts one letter on each bead; letting go snaps the
   beads back into the word and kicks out any bead whose letter is not the
   sound in that place.
     Clues: beads (letter tiles) · first (first sound given) · missing (one
     sound missing) · bank (a word bank to read) · write (a keyboard) ·
     stretch (no stops: the child pulls out one bead per sound heard, then
     types) · blend (the band arrives lettered; close it, find the picture)
     Words: simple (3 sounds; 4 in the CV-CV languages) · teams (letter
     teams share one bead; fi: long sounds = two beads of the same letter)
   Every word and its sound split come from sound-boxes-bank-<loc>.json.
   No DOM. UMD: window.WordElasticCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.WordElasticCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* per locale: words = key → 'picture|sounds (dot)|quiet letters'; simple / teams = the round words;
     traps = the extra tray letters (V · V2 · M · C, or a team's single letters + a vowel); blend = two other pictures; bank = three other words */
  /*DATA-BEGIN*/
  var DATA = {
    en: {
      words: {'cat': 'animals/cat|c.a.t|', 'hat': 'accessories/hat|h.a.t|', 'hen': 'birds 2/hen|h.e.n|', 'net': 'beach/net|n.e.t|', 'pig': 'animals/pig|p.i.g|', 'mop': 'around the house/mop|m.o.p|', 'log': 'camping/log|l.o.g|', 'cup': 'around the house/cup|c.u.p|', 'mug': 'kitchen tools/mug|m.u.g|', 'bag': 'At the Supermarket/bag|b.a.g|', 'van': 'vehicles/van|v.a.n|', 'bed': 'around the house/bed|b.e.d|', 'pen': 'classroom/pen|p.e.n|', 'pot': 'around the house/pot|p.o.t|', 'dog': 'animals/dog|d.o.g|', 'sun': 'beach/sun|s.u.n|', 'jug': 'kitchen tools/jug|j.u.g|', 'fish': 'animals/fish|f.i.sh|', 'ship': 'vehicles/ship|sh.i.p|', 'duck': 'animals/duck|d.u.ck|', 'sock': 'accessories/sock|s.o.ck|', 'rock': 'camping/rock|r.o.ck|', 'lock': 'around the house/lock|l.o.ck|', 'ring': 'accessories/ring|r.i.ng|', 'bell': 'christmas/bell|b.e.ll|', 'can': 'At the Supermarket/can|c.a.n|', 'cap': 'accessories/cap|c.a.p|', 'bat': 'animals/bat|b.a.t|', 'ham': 'At the Supermarket/ham|h.a.m|', 'bee': 'farm animals/bee|b.ee|', 'nest': 'spring/nest|n.e.s.t|', 'fig': 'fruits/fig|f.i.g|', 'pan': 'around the house/pan|p.a.n|', 'map': 'camping/map|m.a.p|', 'leg': 'body parts/leg|l.e.g|', 'bun': 'bakery/bun|b.u.n|', 'bus': 'vehicles/bus|b.u.s|', 'fan': 'around the house/fan|f.a.n|', 'drum': 'music/drum|d.r.u.m|', 'sheep': 'farm animals/sheep|sh.ee.p|', 'jam': 'At the Supermarket/jam|j.a.m|', 'flag': '4th of July/flag|f.l.a.g|', 'frog': 'reptiles and Amphibians/frog|f.r.o.g|', 'mask': 'accessories/mask|m.a.s.k|', 'sled': 'winter/sled|s.l.e.d|', 'lamp': 'furniture/lamp|l.a.m.p|', 'belt': 'clothing/belt|b.e.l.t|', 'boat': 'beach/boat|b.oa.t|', 'leaf': 'miscellaneous/leaf|l.ea.f|'},
      simple: ['cat', 'hat', 'hen', 'net', 'pig', 'mop', 'log', 'cup', 'mug', 'bag', 'van', 'bed', 'pen', 'pot', 'dog', 'sun', 'jug'],
      teams: ['fish', 'ship', 'duck', 'sock', 'rock', 'lock', 'ring', 'bell'],
      traps: {'cat': 'e o d g', 'hat': 'e o n p', 'hen': 'i a m r', 'net': 'i a m l', 'pig': 'e u b d', 'mop': 'u a b n', 'log': 'u a d p', 'cup': 'o a b m', 'mug': 'o a w n', 'bag': 'e o d p', 'van': 'e i w m', 'bed': 'i a p t', 'pen': 'i a b m', 'pot': 'u a b d', 'dog': 'u a b t', 'sun': 'o a m z', 'jug': 'o a p d', 'fish': 's h e', 'ship': 's h e', 'duck': 'c k o', 'sock': 'c k u', 'rock': 'c k u', 'lock': 'c k u', 'ring': 'n g e', 'bell': 'l i a'},
      blend: {'cat': 'can cap', 'hat': 'ham bat', 'hen': 'pen ham', 'net': 'nest bat', 'pig': 'fig pan', 'mop': 'map mug', 'log': 'leg dog', 'cup': 'cap can', 'mug': 'jug map', 'bag': 'bat bed', 'van': 'can fan', 'bed': 'bee bag', 'pen': 'pan hen', 'pot': 'pan pen', 'dog': 'log drum', 'sun': 'bun sheep', 'jug': 'mug jam', 'fish': 'flag frog', 'ship': 'sled sock', 'duck': 'drum dog', 'sock': 'lock rock', 'rock': 'lock sock', 'lock': 'rock sock', 'ring': 'rock fish', 'bell': 'belt boat'},
      bank: {'cat': 'bat can cap', 'hat': 'bat cat ham', 'hen': 'pen bed bee', 'net': 'bat bed bee', 'pig': 'fig bag dog', 'mop': 'map cap cup', 'log': 'dog leg bag', 'cup': 'cap bun bus', 'mug': 'jug bag bun', 'bag': 'bat bed bee', 'van': 'can fan pan', 'bed': 'bee bag bat', 'pen': 'hen pan bed', 'pot': 'bat cat dog', 'dog': 'log bag fig', 'sun': 'bun bus can', 'jug': 'mug bag bun', 'fish': 'flag frog mask', 'ship': 'lamp sled sock', 'duck': 'lock rock sock', 'sock': 'lock rock duck', 'rock': 'lock sock duck', 'lock': 'rock sock duck', 'ring': 'fish flag frog', 'bell': 'belt boat leaf'}
    },
    de: {
      words: {'Hut': 'accessories/hat|H.u.t|', 'Bus': 'vehicles/bus|B.u.s|', 'Tor': 'around the house/gate|T.o.r|', 'Tür': 'around the house/door|T.ü.r|', 'Wal': 'ocean life/whale|W.a.l|', 'Bär': 'camping/bear|B.ä.r|', 'Fuß': 'body parts/foot|F.u.ß|', 'Fisch': 'animals/fish|F.i.sch|', 'Schaf': 'farm animals/sheep|Sch.a.f|', 'Schal': 'accessories/scarf|Sch.a.l|', 'Schuh': 'clothing/shoe|Sch.uh|', 'Schiff': 'vehicles/ship|Sch.i.ff|', 'Buch': 'classroom/book|B.u.ch|', 'Elch': 'animals/moose|E.l.ch|', 'Reis': 'At the Supermarket/rice|R.ei.s|', 'Bein': 'body parts/leg|B.ei.n|', 'Maus': 'pets/mouse|M.au.s|', 'Haus': 'miscellaneous/house|H.au.s|', 'Zaun': 'around the house/fence|Z.au.n|', 'Auto': 'toys/car|Au.t.o|', 'Eule': 'animals/owl|Eu.l.e|', 'Katze': 'animals/cat|K.a.tz.e|', 'Netz': 'beach/net|N.e.tz|', 'Mütze': 'accessories/beanie|M.ü.tz.e|', 'Socke': 'accessories/sock|S.o.ck.e|', 'Jacke': 'clothing/jacket|J.a.ck.e|', 'Rock': 'clothing/skirt|R.o.ck|', 'Ball': 'toys/ball|B.a.ll|', 'Bett': 'around the house/bed|B.e.tt|', 'Kamm': 'around the house/comb|K.a.mm|', 'Tasse': 'around the house/cup|T.a.ss.e|', 'Biene': 'farm animals/bee|B.ie.n.e|', 'Ziege': 'farm animals/goat|Z.ie.g.e|', 'Zahn': 'body parts/tooth|Z.ah.n|', 'Huhn': 'farm animals/chicken|H.uh.n|', 'Boot': 'beach/boat|B.oo.t|', 'Mopp': 'around the house/mop|M.o.pp|', 'Sack': 'christmas/sack|S.a.ck|', 'Koch': 'occupations/cook|K.o.ch|', 'Tisch': 'around the house/table|T.i.sch|', 'Hahn': 'farm animals/rooster|H.ah.n|', 'Ring': 'accessories/ring|R.i.ng|', 'Hand': 'body parts/hand|H.a.n.d|', 'Wolf': 'animals/wolf|W.o.l.f|', 'Wolke': 'beach/cloud|W.o.l.k.e|', 'Glocke': 'christmas/bell|G.l.o.ck.e|', 'Blume': 'summer/flower|B.l.u.m.e|', 'Ente': 'animals/duck|E.n.t.e|', 'Glas': 'kitchen tools/glass|G.l.a.s|', 'Mond': 'space/moon|M.o.n.d|', 'Zelt': 'camping/tent|Z.e.l.t|', 'Nest': 'spring/nest|N.e.s.t|', 'Nase': 'body parts/nose|N.a.s.e|', 'Brot': 'At the Supermarket/bread|B.r.o.t|', 'Korb': 'At the Supermarket/basket|K.o.r.b|', 'Zebra': 'animals/zebra|Z.e.b.r.a|', 'Hund': 'animals/dog|H.u.n.d|', 'Krug': 'kitchen tools/jug|K.r.u.g|'},
      simple: ['Hut', 'Bus', 'Tor', 'Tür', 'Wal', 'Bär', 'Fuß'],
      teams: ['Fisch', 'Schaf', 'Schal', 'Schuh', 'Schiff', 'Buch', 'Elch', 'Reis', 'Bein', 'Maus', 'Haus', 'Zaun', 'Auto', 'Eule', 'Katze', 'Netz', 'Mütze', 'Socke', 'Jacke', 'Rock', 'Ball', 'Bett', 'Kamm', 'Tasse', 'Biene', 'Ziege', 'Zahn', 'Huhn', 'Boot', 'Mopp', 'Sack', 'Koch', 'Tisch', 'Hahn', 'Ring'],
      traps: {'Hut': 'o a N k', 'Bus': 'o a D l', 'Tor': 'u a F h', 'Tür': 'u a F l', 'Wal': 'e o M t', 'Bär': 'i a D n', 'Fuß': 'o a T k', 'Fisch': 's c h e', 'Schaf': 'S c h e', 'Schal': 'S c h e', 'Schuh': 'S c h u', 'Schiff': 'S c h f', 'Buch': 'c h o', 'Elch': 'c h i', 'Reis': 'e i a', 'Bein': 'e i a', 'Maus': 'a u e', 'Haus': 'a u e', 'Zaun': 'a u e', 'Auto': 'A u f p', 'Eule': 'E u i', 'Katze': 't z i', 'Netz': 't z i', 'Mütze': 't z u', 'Socke': 'c k u', 'Jacke': 'c k i', 'Rock': 'c k u', 'Ball': 'l e o', 'Bett': 't i a', 'Kamm': 'm e o', 'Tasse': 's i o', 'Biene': 'i a d j', 'Ziege': 'i a q p', 'Zahn': 'a h e', 'Huhn': 'u o a', 'Boot': 'o u a', 'Mopp': 'p u a', 'Sack': 'c k e', 'Koch': 'c h u', 'Tisch': 's c h e', 'Hahn': 'a e m t', 'Ring': 'n g e'},
      blend: {'Hut': 'Hahn Hand', 'Bus': 'Bär Ball', 'Tor': 'Tür Tasse', 'Tür': 'Tor Tasse', 'Wal': 'Wolf Wolke', 'Bär': 'Bus Ball', 'Fuß': 'Fisch Bus', 'Fisch': 'Tisch Fuß', 'Schaf': 'Schal Schuh', 'Schal': 'Schaf Schuh', 'Schuh': 'Schaf Schal', 'Schiff': 'Sack Schaf', 'Buch': 'Ball Bein', 'Elch': 'Ente Eule', 'Reis': 'Ring Rock', 'Bein': 'Bett Ball', 'Maus': 'Haus Mond', 'Haus': 'Maus Hahn', 'Zaun': 'Zahn Zelt', 'Auto': 'Bett Buch', 'Eule': 'Ente Elch', 'Katze': 'Kamm Koch', 'Netz': 'Nest Nase', 'Mütze': 'Maus Mond', 'Socke': 'Schaf Schal', 'Jacke': 'Socke Katze', 'Rock': 'Reis Ring', 'Ball': 'Bein Bett', 'Bett': 'Bein Boot', 'Kamm': 'Koch Korb', 'Tasse': 'Tisch Tor', 'Biene': 'Blume Ball', 'Ziege': 'Zebra Zahn', 'Zahn': 'Zaun Hahn', 'Huhn': 'Hund Hand', 'Boot': 'Brot Bett', 'Mopp': 'Mond Maus', 'Sack': 'Schaf Schal', 'Koch': 'Korb Kamm', 'Tisch': 'Fisch Tasse', 'Hahn': 'Zahn Hand', 'Ring': 'Reis Rock'},
      bank: {'Hut': 'Bus Fuß Bär', 'Bus': 'Bär Fuß Hut', 'Tor': 'Tür Bär Bus', 'Tür': 'Tor Bär Bus', 'Wal': 'Bus Bär Fuß', 'Bär': 'Bus Tor Tür', 'Fuß': 'Bus Hut Bär', 'Fisch': 'Tisch Biene Schuh', 'Schaf': 'Schal Schuh Socke', 'Schal': 'Schaf Schuh Socke', 'Schuh': 'Schaf Schal Fisch', 'Schiff': 'Glocke Biene Blume', 'Buch': 'Elch Koch Auto', 'Elch': 'Buch Koch Ente', 'Reis': 'Bein Bett Glas', 'Bein': 'Bett Reis Ball', 'Maus': 'Haus Zaun Ball', 'Haus': 'Maus Hahn Hand', 'Zaun': 'Zahn Hahn Haus', 'Auto': 'Bett Buch Ente', 'Eule': 'Ente Auto Ball', 'Katze': 'Mütze Jacke Tasse', 'Netz': 'Bett Nest Auto', 'Mütze': 'Katze Biene Blume', 'Socke': 'Jacke Wolke Biene', 'Jacke': 'Socke Katze Tasse', 'Rock': 'Koch Sack Boot', 'Ball': 'Bein Bett Boot', 'Bett': 'Bein Boot Brot', 'Kamm': 'Ball Hahn Hand', 'Tasse': 'Jacke Katze Tisch', 'Biene': 'Ziege Blume Fisch', 'Ziege': 'Biene Blume Fisch', 'Zahn': 'Hahn Zaun Huhn', 'Huhn': 'Hund Zahn Auto', 'Boot': 'Brot Bett Ball', 'Mopp': 'Mond Boot Koch', 'Sack': 'Rock Ball Buch', 'Koch': 'Buch Elch Korb', 'Tisch': 'Fisch Tasse Biene', 'Hahn': 'Zahn Hand Haus', 'Ring': 'Hand Hund Krug'}
    },
    nl: {
      words: {'vis': 'animals/fish|v.i.s|', 'zon': 'beach/sun|z.o.n|', 'kat': 'animals/cat|k.a.t|', 'pen': 'classroom/pen|p.e.n|', 'sok': 'accessories/sock|s.o.k|', 'bus': 'vehicles/bus|b.u.s|', 'mok': 'kitchen tools/mug|m.o.k|', 'kip': 'farm animals/chicken|k.i.p|', 'bal': 'toys/ball|b.a.l|', 'bel': 'christmas/bell|b.e.l|', 'ham': 'At the Supermarket/ham|h.a.m|', 'hek': 'around the house/fence|h.e.k|', 'jas': 'clothing/coat|j.a.s|', 'kam': 'around the house/comb|k.a.m|', 'kan': 'kitchen tools/jug|k.a.n|', 'kok': 'occupations/cook|k.o.k|', 'lam': 'farm animals/lamb|l.a.m|', 'mes': 'around the house/knife|m.e.s|', 'net': 'beach/net|n.e.t|', 'pan': 'around the house/pan|p.a.n|', 'pet': 'accessories/cap|p.e.t|', 'pot': 'around the house/pot|p.o.t|', 'rok': 'clothing/skirt|r.o.k|', 'tas': 'At the Supermarket/bag|t.a.s|', 'vos': 'animals/fox|v.o.s|', 'zak': 'christmas/sack|z.a.k|', 'maan': 'space/moon|m.aa.n|', 'boot': 'beach/boat|b.oo.t|', 'boek': 'classroom/book|b.oe.k|', 'muis': 'pets/mouse|m.ui.s|', 'uil': 'animals/owl|ui.l|', 'deur': 'around the house/door|d.eu.r|', 'vijg': 'fruits/fig|v.ij.g|', 'ring': 'accessories/ring|r.i.ng|', 'schip': 'vehicles/ship|s.ch.i.p|', 'huis': 'miscellaneous/house|h.ui.s|', 'kaas': 'At the Supermarket/cheese|k.aa.s|', 'vaas': 'around the house/vase|v.aa.s|', 'roos': 'flowers/rose|r.oo.s|', 'neus': 'body parts/nose|n.eu.s|', 'voet': 'body parts/foot|v.oe.t|', 'duif': 'birds 2/dove|d.ui.f|', 'kool': 'vegetables/cabbage|k.oo.l|', 'lamp': 'furniture/lamp|l.a.m.p|', 'vork': 'around the house/fork|v.o.r.k|', 'vlag': '4th of July/flag|v.l.a.g|', 'slak': 'insects and bugs/snail|s.l.a.k|', 'klok': 'around the house/clock|k.l.o.k|'},
      simple: ['vis', 'zon', 'kat', 'pen', 'sok', 'bus', 'mok', 'kip', 'bal', 'bel', 'ham', 'hek', 'jas', 'kam', 'kan', 'kok', 'lam', 'mes', 'net', 'pan', 'pet', 'pot', 'rok', 'tas', 'vos', 'zak'],
      teams: ['maan', 'boot', 'boek', 'muis', 'uil', 'deur', 'vijg', 'ring', 'schip', 'huis', 'kaas', 'vaas', 'roos', 'neus', 'voet', 'duif', 'kool'],
      traps: {'vis': 'e a b n', 'zon': 'u a m j', 'kat': 'e o h p', 'pen': 'i a b t', 'sok': 'u a h d', 'bus': 'o a d p', 'mok': 'u a n t', 'kip': 'e a h z', 'bal': 'e o d k', 'bel': 'i a d t', 'ham': 'e o n j', 'hek': 'i a n s', 'jas': 'e o b m', 'kam': 'e o h w', 'kan': 'e o h d', 'kok': 'u a h z', 'lam': 'e o t z', 'mes': 'i a n t', 'net': 'i a m w', 'pan': 'e o b s', 'pet': 'i a b j', 'pot': 'u a b h', 'rok': 'u a n t', 'tas': 'e o f p', 'vos': 'u a b r', 'zak': 'e o h n', 'maan': 'a e w t', 'boot': 'o u a', 'boek': 'o e u', 'muis': 'u i o', 'uil': 'u i o', 'deur': 'e u i', 'vijg': 'i j e', 'ring': 'n g e', 'schip': 'c h e', 'huis': 'u i o', 'kaas': 'a e h l', 'vaas': 'a e b k', 'roos': 'o u a', 'neus': 'e u i', 'voet': 'o e u', 'duif': 'u i o', 'kool': 'o u a'},
      blend: {'vis': 'vos vaas', 'zon': 'zak kan', 'kat': 'kam kan', 'pen': 'pan pet', 'sok': 'kok mok', 'bus': 'bal bel', 'mok': 'kok rok', 'kip': 'kam kan', 'bal': 'bel bus', 'bel': 'bal bus', 'ham': 'kam lam', 'hek': 'ham huis', 'jas': 'tas bal', 'kam': 'kan kat', 'kan': 'kam kat', 'kok': 'mok rok', 'lam': 'ham kam', 'mes': 'mok maan', 'net': 'pet neus', 'pan': 'pen kan', 'pet': 'pen pot', 'pot': 'pet pan', 'rok': 'kok mok', 'tas': 'jas bal', 'vos': 'vis vaas', 'zak': 'zon bal', 'maan': 'muis mes', 'boot': 'boek bal', 'boek': 'boot bal', 'muis': 'huis maan', 'uil': 'bal bel', 'deur': 'duif neus', 'vijg': 'vlag vaas', 'ring': 'roos rok', 'schip': 'slak sok', 'huis': 'muis ham', 'kaas': 'vaas klok', 'vaas': 'kaas vlag', 'roos': 'ring rok', 'neus': 'net deur', 'voet': 'vork vaas', 'duif': 'deur huis', 'kool': 'klok kaas'},
      bank: {'vis': 'vos bus jas', 'zon': 'kan kok mok', 'kat': 'kam kan bal', 'pen': 'pan pet bel', 'sok': 'kok mok rok', 'bus': 'bal bel jas', 'mok': 'kok rok sok', 'kip': 'kam kan kat', 'bal': 'bel bus ham', 'bel': 'bal bus hek', 'ham': 'kam lam bal', 'hek': 'bel ham kok', 'jas': 'tas bal bus', 'kam': 'ham kan kat', 'kan': 'kam kat pan', 'kok': 'mok rok sok', 'lam': 'ham kam bal', 'mes': 'bel bus hek', 'net': 'pet bel hek', 'pan': 'kan pen bal', 'pet': 'net pen pot', 'pot': 'pet kat kok', 'rok': 'kok mok sok', 'tas': 'jas bal bus', 'vos': 'vis bus jas', 'zak': 'bal ham hek', 'maan': 'kaas vaas lamp', 'boot': 'boek kool roos', 'boek': 'boot voet vork', 'muis': 'huis duif kaas', 'uil': 'bal bel kip', 'deur': 'neus duif boek', 'vijg': 'ring vlag vaas', 'ring': 'vijg roos vlag', 'schip': 'boek boot deur', 'huis': 'muis duif kaas', 'kaas': 'vaas maan huis', 'vaas': 'kaas maan vlag', 'roos': 'boot kool boek', 'neus': 'deur huis kaas', 'voet': 'boek boot vork', 'duif': 'huis muis deur', 'kool': 'boot klok roos'}
    },
    da: {
      words: {'sol': 'beach/sun|s.o.l|', 'hus': 'miscellaneous/house|h.u.s|', 'kat': 'animals/cat|k.a.t|', 'mus': 'pets/mouse|m.u.s|', 'bus': 'vehicles/bus|b.u.s|', 'ris': 'At the Supermarket/rice|r.i.s|', 'hat': 'accessories/hat|h.a.t|', 'sko': 'clothing/shoe|s.k.o|', 'kam': 'around the house/comb|k.a.m|', 'lam': 'farm animals/lamb|l.a.m|', 'gås': 'birds 2/goose|g.å.s|', 'kål': 'vegetables/cabbage|k.å.l|', 'lås': 'around the house/lock|l.å.s|', 'net': 'beach/net|n.e.t|', 'pen': 'around the house/pen|p.e.n|', 'lim': 'classroom/glue|l.i.m|', 'sæl': 'ocean life/seal|s.æ.l|', 'sæk': 'christmas/sack|s.æ.k|', 'kop': 'around the house/cup|k.o.p|', 'ost': 'At the Supermarket/cheese|o.s.t|', 'glas': 'kitchen tools/glass|g.l.a.s|'},
      simple: ['sol', 'hus', 'kat', 'mus', 'bus', 'ris', 'hat', 'sko', 'kam', 'lam', 'gås', 'kål', 'lås', 'net', 'pen', 'lim', 'sæl', 'sæk', 'kop', 'ost'],
      teams: [],
      traps: {'sol': 'u a z h', 'hus': 'o a n k', 'kat': 'e o h p', 'mus': 'o a n v', 'bus': 'o a d p', 'ris': 'e a n b', 'hat': 'e o n s', 'sko': 'u a z v', 'kam': 'e o h s', 'lam': 'e o t v', 'gås': 'o a q d', 'kål': 'o a h v', 'lås': 'o a t k', 'net': 'i a m s', 'pen': 'i a b t', 'lim': 'e a t f', 'sæl': 'e a z m', 'sæk': 'e a z m', 'kop': 'u a h s', 'ost': 'u a z r'},
      blend: {'sol': 'sæl sko', 'hus': 'bus mus', 'kat': 'kam hat', 'mus': 'bus hus', 'bus': 'hus mus', 'ris': 'bus gås', 'hat': 'kat hus', 'sko': 'sol sæk', 'kam': 'kat lam', 'lam': 'lim kam', 'gås': 'lås glas', 'kål': 'kam kat', 'lås': 'gås lam', 'net': 'hat kat', 'pen': 'net bus', 'lim': 'lam lås', 'sæl': 'sol sæk', 'sæk': 'sæl sko', 'kop': 'kam kat', 'ost': 'hat kat'},
      bank: {'sol': 'sæl kop kål', 'hus': 'bus mus gås', 'kat': 'hat kam kop', 'mus': 'bus hus gås', 'bus': 'hus mus gås', 'ris': 'bus gås hus', 'hat': 'kat hus kam', 'sko': 'sol sæk sæl', 'kam': 'kat lam hat', 'lam': 'kam lim hat', 'gås': 'lås bus hus', 'kål': 'gås kam kat', 'lås': 'gås bus hus', 'net': 'hat kat ost', 'pen': 'net bus gås', 'lim': 'lam kam lås', 'sæl': 'sol sæk kål', 'sæk': 'sæl sko sol', 'kop': 'kam kat kål', 'ost': 'hat kat net'}
    },
    sv: {
      words: {'sol': 'beach/sun|s.o.l|', 'mus': 'pets/mouse|m.u.s|', 'hus': 'miscellaneous/house|h.u.s|', 'ris': 'At the Supermarket/rice|r.i.s|', 'räv': 'animals/fox|r.ä.v|', 'lök': 'vegetables/onion|l.ö.k|', 'val': 'ocean life/whale|v.a.l|', 'får': 'farm animals/sheep|f.å.r|', 'bil': 'toys/car|b.i.l|', 'bok': 'classroom/book|b.o.k|', 'båt': 'toys/boat|b.å.t|', 'fot': 'body parts/foot|f.o.t|', 'gås': 'birds 2/goose|g.å.s|', 'kål': 'vegetables/cabbage|k.å.l|', 'lås': 'around the house/lock|l.å.s|', 'nät': 'beach/net|n.ä.t|', 'ros': 'flowers/rose|r.o.s|', 'säl': 'ocean life/seal|s.ä.l|', 'vas': 'around the house/vase|v.a.s|', 'lim': 'classroom/glue|l.i.m|', 'kam': 'around the house/comb|k.a.m|', 'kub': 'shapes/cube|k.u.b|', 'katt': 'animals/cat|k.a.tt|', 'hatt': 'accessories/hat|h.a.tt|', 'tupp': 'farm animals/rooster|t.u.pp|', 'lamm': 'easter/lamb|l.a.mm|', 'mugg': 'kitchen tools/mug|m.u.gg|', 'dörr': 'around the house/door|d.ö.rr|', 'boll': 'toys/ball|b.o.ll|', 'kopp': 'around the house/cup|k.o.pp|', 'mopp': 'around the house/mop|m.o.pp|', 'buss': 'vehicles/bus|b.u.ss|', 'ring': 'accessories/ring|r.i.ng|', 'säng': 'around the house/bed|s.ä.ng|', 'bi': 'farm animals/bee|b.i|'},
      simple: ['sol', 'mus', 'hus', 'ris', 'räv', 'lök', 'val', 'får', 'bil', 'bok', 'båt', 'fot', 'gås', 'kål', 'lås', 'nät', 'ros', 'säl', 'vas', 'lim', 'kam', 'kub'],
      teams: ['katt', 'hatt', 'tupp', 'lamm', 'mugg', 'dörr', 'boll', 'kopp', 'mopp', 'buss', 'ring', 'säng'],
      traps: {'sol': 'u a t h', 'mus': 'o a n v', 'hus': 'o a n k', 'ris': 'e a n b', 'räv': 'e a n m', 'lök': 'ä a t b', 'val': 'e o t b', 'får': 'a i t p', 'bil': 'e a d r', 'bok': 'u a d v', 'båt': 'a i d p', 'fot': 'u a l p', 'gås': 'a i q d', 'kål': 'a i h v', 'lås': 'a i t k', 'nät': 'e a m p', 'ros': 'u a n j', 'säl': 'e a t v', 'vas': 'e o b k', 'lim': 'e a t f', 'kam': 'e o h s', 'kub': 'o a h m', 'katt': 't e o', 'hatt': 't e o', 'tupp': 'p o a', 'lamm': 'm e o', 'mugg': 'g o a', 'dörr': 'r ä a', 'boll': 'l u a', 'kopp': 'p u a', 'mopp': 'p u a', 'buss': 's o a', 'ring': 'n g e', 'säng': 'n g e'},
      blend: {'sol': 'säl säng', 'mus': 'hus mopp', 'hus': 'mus hatt', 'ris': 'ros räv', 'räv': 'ris ros', 'lök': 'lim lås', 'val': 'vas bil', 'får': 'fot båt', 'bil': 'bok båt', 'bok': 'bil båt', 'båt': 'bil bok', 'fot': 'får bok', 'gås': 'lås båt', 'kål': 'kam kub', 'lås': 'gås lim', 'nät': 'båt fot', 'ros': 'ris räv', 'säl': 'sol säng', 'vas': 'val gås', 'lim': 'lås lök', 'kam': 'kub kål', 'kub': 'kam kål', 'katt': 'hatt kopp', 'hatt': 'katt hus', 'tupp': 'kopp mopp', 'lamm': 'lim lås', 'mugg': 'mopp mus', 'dörr': 'boll buss', 'boll': 'buss bi', 'kopp': 'mopp katt', 'mopp': 'kopp mugg', 'buss': 'boll bi', 'ring': 'ris ros', 'säng': 'sol säl'},
      bank: {'sol': 'säl bil bok', 'mus': 'hus gås kub', 'hus': 'mus gås kub', 'ris': 'ros bil gås', 'räv': 'nät ris ros', 'lök': 'bok lim lås', 'val': 'vas bil kam', 'får': 'båt fot gås', 'bil': 'bok båt kål', 'bok': 'bil båt fot', 'båt': 'bil bok fot', 'fot': 'bok båt får', 'gås': 'lås båt får', 'kål': 'bil båt får', 'lås': 'gås båt får', 'nät': 'båt fot räv', 'ros': 'ris bok fot', 'säl': 'sol bil kål', 'vas': 'val gås hus', 'lim': 'bil kam lås', 'kam': 'kub kål lim', 'kub': 'hus kam kål', 'katt': 'hatt kopp lamm', 'hatt': 'katt lamm boll', 'tupp': 'kopp mopp buss', 'lamm': 'hatt katt boll', 'mugg': 'buss mopp ring', 'dörr': 'boll buss hatt', 'boll': 'buss kopp mopp', 'kopp': 'mopp tupp boll', 'mopp': 'kopp tupp boll', 'buss': 'boll mugg tupp', 'ring': 'säng mugg boll', 'säng': 'ring mugg boll'}
    },
    no: {
      words: {'sol': 'beach/sun|s.o.l|', 'bil': 'toys/car|b.i.l|', 'hus': 'miscellaneous/house|h.u.s|', 'mus': 'pets/mouse|m.u.s|', 'sko': 'clothing/shoe|s.k.o|', 'lam': 'easter/lamb|l.a.m|', 'gås': 'birds 2/goose|g.å.s|', 'kål': 'vegetables/cabbage|k.å.l|', 'lås': 'around the house/lock|l.å.s|', 'lim': 'classroom/glue|l.i.m|', 'løk': 'At the Supermarket/onion|l.ø.k|', 'ris': 'At the Supermarket/rice|r.i.s|', 'sel': 'ocean life/seal|s.e.l|', 'bok': 'classroom/book|b.o.k|', 'båt': 'toys/boat|b.å.t|', 'fot': 'body parts/foot|f.o.t|', 'rev': 'animals/fox|r.e.v|', 'kam': 'around the house/comb|k.a.m|', 'tog': 'toys/train|t.o.g|', 'øre': 'body parts/ear|ø.r.e|', 'sau': 'farm animals/sheep|s.au|', 'katt': 'animals/cat|k.a.tt|', 'penn': 'classroom/pen|p.e.nn|', 'buss': 'vehicles/bus|b.u.ss|', 'ring': 'accessories/ring|r.i.ng|', 'hatt': 'accessories/hat|h.a.tt|', 'mopp': 'around the house/mop|m.o.pp|', 'kopp': 'around the house/cup|k.o.pp|', 'sokk': 'accessories/sock|s.o.kk|', 'nett': 'beach/net|n.e.tt|', 'tann': 'body parts/tooth|t.a.nn|', 'kokk': 'occupations/chef|k.o.kk|', 'sekk': 'christmas/sack|s.e.kk|', 'vott': 'accessories/mitten|v.o.tt|', 'seng': 'around the house/bed|s.e.ng|', 'gris': 'animals/pig|g.r.i.s|', 'fisk': 'animals/fish|f.i.s.k|', 'hest': 'farm animals/horse|h.e.s.t|'},
      simple: ['sol', 'bil', 'hus', 'mus', 'sko', 'lam', 'gås', 'kål', 'lås', 'lim', 'løk', 'ris', 'sel', 'bok', 'båt', 'fot', 'rev', 'kam', 'tog', 'øre'],
      teams: ['sau', 'katt', 'penn', 'buss', 'ring', 'hatt', 'mopp', 'kopp', 'sokk', 'nett', 'tann', 'kokk', 'sekk', 'vott', 'seng'],
      traps: {'sol': 'u a t h', 'bil': 'e a d r', 'hus': 'o a n k', 'mus': 'o a n v', 'sko': 'u a h v', 'lam': 'e o t v', 'gås': 'a i q d', 'kål': 'a i h v', 'lås': 'a i t k', 'lim': 'e a t f', 'løk': 'e a t p', 'ris': 'e a n b', 'sel': 'i a t j', 'bok': 'u a d v', 'båt': 'a i d p', 'fot': 'u a l p', 'rev': 'i a n t', 'kam': 'e o h s', 'tog': 'u a f n', 'øre': 'a o n k', 'sau': 'a u e', 'katt': 't e o', 'penn': 'n i a', 'buss': 's o a', 'ring': 'n g e', 'hatt': 't e o', 'mopp': 'p u a', 'kopp': 'p u a', 'sokk': 'k u a', 'nett': 't i a', 'tann': 'n e o', 'kokk': 'u a h t', 'sekk': 'k i a', 'vott': 't u a', 'seng': 'n g i'},
      blend: {'sol': 'sel sau', 'bil': 'bok båt', 'hus': 'mus hatt', 'mus': 'hus mopp', 'sko': 'sau sel', 'lam': 'lim kam', 'gås': 'lås gris', 'kål': 'kam katt', 'lås': 'gås lam', 'lim': 'lam lås', 'løk': 'lam lim', 'ris': 'rev ring', 'sel': 'sol sau', 'bok': 'bil båt', 'båt': 'bil bok', 'fot': 'fisk bok', 'rev': 'ris ring', 'kam': 'lam kål', 'tog': 'tann bok', 'øre': 'bil bok', 'sau': 'sel sko', 'katt': 'hatt kokk', 'penn': 'seng tann', 'buss': 'bil bok', 'ring': 'rev ris', 'hatt': 'katt hest', 'mopp': 'kopp mus', 'kopp': 'mopp kokk', 'sokk': 'sekk kokk', 'nett': 'hatt hest', 'tann': 'tog penn', 'kokk': 'sokk kopp', 'sekk': 'sokk seng', 'vott': 'hatt katt', 'seng': 'sekk sokk'},
      bank: {'sol': 'sel bil bok', 'bil': 'bok båt kål', 'hus': 'mus gås lås', 'mus': 'hus gås lås', 'sko': 'sau sel sol', 'lam': 'kam lim lås', 'gås': 'lås båt hus', 'kål': 'bil båt gås', 'lås': 'gås båt hus', 'lim': 'lam bil kam', 'løk': 'bok lam lim', 'ris': 'bil gås hus', 'sel': 'sol bil kål', 'bok': 'bil båt fot', 'båt': 'bil bok fot', 'fot': 'bok båt sol', 'rev': 'ris sel bil', 'kam': 'lam kål lim', 'tog': 'bok fot sol', 'øre': 'bil bok båt', 'sau': 'kam lam sel', 'katt': 'hatt nett vott', 'penn': 'seng tann hest', 'buss': 'fisk gris hest', 'ring': 'seng fisk penn', 'hatt': 'katt hest nett', 'mopp': 'kopp kokk sokk', 'kopp': 'mopp kokk katt', 'sokk': 'kokk sekk fisk', 'nett': 'hatt hest katt', 'tann': 'penn hatt katt', 'kokk': 'sokk kopp sekk', 'sekk': 'sokk kokk seng', 'vott': 'hatt katt nett', 'seng': 'penn ring sekk'}
    },
    es: {
      words: {'mapa': 'camping/map|m.a.p.a|', 'nido': 'spring/nest|n.i.d.o|', 'pera': 'fruits/pear|p.e.r.a|', 'foca': 'ocean life/seal|f.o.c.a|', 'nube': 'beach/cloud|n.u.b.e|', 'vaso': 'kitchen tools/glass|v.a.s.o|', 'lobo': 'animals/wolf|l.o.b.o|', 'rana': 'reptiles and Amphibians/frog|r.a.n.a|', 'gato': 'animals/cat|g.a.t.o|', 'pato': 'animals/duck|p.a.t.o|', 'casa': 'miscellaneous/house|c.a.s.a|', 'luna': 'camping/moon|l.u.n.a|', 'mesa': 'around the house/table|m.e.s.a|', 'vaca': 'farm animals/cow|v.a.c.a|', 'boca': 'body parts/mouth|b.o.c.a|', 'mano': 'body parts/hand|m.a.n.o|', 'mono': 'zoo animals/monkey|m.o.n.o|', 'cama': 'around the house/bed|c.a.m.a|', 'dedo': 'body parts/finger|d.e.d.o|', 'toro': 'farm animals/bull|t.o.r.o|', 'loro': 'birds 2/parrot|l.o.r.o|', 'cubo': 'shapes/cube|c.u.b.o|', 'lata': 'At the Supermarket/can|l.a.t.a|', 'vela': 'christmas/candle|v.e.l.a|', 'remo': 'camping/oar|r.e.m.o|', 'queso': 'At the Supermarket/cheese|qu.e.s.o|', 'perro': 'animals/dog|p.e.rr.o|', 'gallo': 'farm animals/rooster|g.a.ll.o|', 'silla': 'around the house/chair|s.i.ll.a|', 'gorro': 'accessories/beanie|g.o.rr.o|', 'pollo': 'farm animals/chicken|p.o.ll.o|', 'llave': 'around the house/key|ll.a.v.e|', 'carro': 'toys/car|c.a.rr.o|', 'burro': 'animals/donkey|b.u.rr.o|', 'pan': 'At the Supermarket/bread|p.a.n|', 'fresa': 'fruits/strawberry|fre.sa|', 'red': 'beach/net|r.e.d|', 'brócoli': 'vegetables/broccoli|bró.co.li|', 'tigre': 'animals/tiger|ti.gre|', 'globo': 'toys/balloon|glo.bo|', 'sal': 'At the Supermarket/salt|s.a.l|', 'sol': 'beach/sun|s.o.l|', 'cabra': 'farm animals/goat|ca.bra|', 'libro': 'classroom/book|li.bro|', 'cebra': 'animals/zebra|ce.bra|'},
      simple: ['mapa', 'nido', 'pera', 'foca', 'nube', 'vaso', 'lobo', 'rana', 'gato', 'pato', 'casa', 'luna', 'mesa', 'vaca', 'boca', 'mano', 'mono', 'cama', 'dedo', 'toro', 'loro', 'cubo', 'lata', 'vela', 'remo'],
      teams: ['queso', 'perro', 'gallo', 'silla', 'gorro', 'pollo', 'llave', 'carro', 'burro'],
      traps: {'mapa': 'e n d', 'nido': 'e m v', 'pera': 'i b n', 'foca': 'u t r', 'nube': 'o m t', 'vaso': 'e w d', 'lobo': 'u t m', 'rana': 'e m j', 'gato': 'e q b', 'pato': 'e b v', 'casa': 'e b m', 'luna': 'o t v', 'mesa': 'i n t', 'vaca': 'e w r', 'boca': 'u d n', 'mano': 'e w v', 'mono': 'u w v', 'cama': 'e n t', 'dedo': 'i b t', 'toro': 'u f p', 'loro': 'u t d', 'cubo': 'a d r', 'lata': 'e f p', 'vela': 'i w p', 'remo': 'i n d', 'queso': 'q u i', 'perro': 'r i a', 'gallo': 'l e i', 'silla': 'l e o', 'gorro': 'r u a', 'pollo': 'l u a', 'llave': 'l i o', 'carro': 'r e i', 'burro': 'r a i'},
      blend: {'mapa': 'mano mesa', 'nido': 'nube dedo', 'pera': 'pato pan', 'foca': 'boca fresa', 'nube': 'nido cubo', 'vaso': 'vaca vela', 'lobo': 'loro lata', 'rana': 'remo red', 'gato': 'pato gallo', 'pato': 'gato pera', 'casa': 'cama cubo', 'luna': 'lata lobo', 'mesa': 'mapa mano', 'vaca': 'vaso vela', 'boca': 'foca brócoli', 'mano': 'mono mapa', 'mono': 'mano mapa', 'cama': 'casa cubo', 'dedo': 'nido remo', 'toro': 'loro tigre', 'loro': 'lobo toro', 'cubo': 'cama casa', 'lata': 'luna lobo', 'vela': 'vaca vaso', 'remo': 'rana red', 'queso': 'burro fresa', 'perro': 'pollo pan', 'gallo': 'globo gorro', 'silla': 'sal sol', 'gorro': 'gallo globo', 'pollo': 'perro pan', 'llave': 'libro lata', 'carro': 'cabra cebra', 'burro': 'boca brócoli'},
      bank: {'mapa': 'cama casa lata', 'nido': 'dedo cubo gato', 'pera': 'mesa vela boca', 'foca': 'boca vaca cama', 'nube': 'cubo lobo luna', 'vaso': 'casa gato mano', 'lobo': 'loro cubo mono', 'rana': 'cama casa lata', 'gato': 'pato lata mano', 'pato': 'gato lata mano', 'casa': 'cama lata mapa', 'luna': 'lata rana boca', 'mesa': 'casa mapa pera', 'vaca': 'boca cama casa', 'boca': 'foca vaca cama', 'mano': 'mono gato mapa', 'mono': 'mano lobo loro', 'cama': 'casa lata mapa', 'dedo': 'nido remo cubo', 'toro': 'loro lobo mono', 'loro': 'lobo toro mono', 'cubo': 'lobo nube cama', 'lata': 'cama casa gato', 'vela': 'mesa pera vaca', 'remo': 'dedo cama cubo', 'queso': 'burro fresa carro', 'perro': 'burro carro gorro', 'gallo': 'carro globo gorro', 'silla': 'gallo pollo cabra', 'gorro': 'burro carro perro', 'pollo': 'gorro perro silla', 'llave': 'globo libro tigre', 'carro': 'burro cabra gorro', 'burro': 'carro gorro perro'}
    },
    it: {
      words: {'mano': 'body parts/hand|m.a.n.o|', 'naso': 'body parts/nose|n.a.s.o|', 'vaso': 'around the house/vase|v.a.s.o|', 'lupo': 'animals/wolf|l.u.p.o|', 'pane': 'At the Supermarket/bread|p.a.n.e|', 'fico': 'fruits/fig|f.i.c.o|', 'riso': 'At the Supermarket/rice|r.i.s.o|', 'cane': 'animals/dog|c.a.n.e|', 'casa': 'miscellaneous/house|c.a.s.a|', 'cubo': 'shapes/cube|c.u.b.o|', 'foca': 'ocean life/seal|f.o.c.a|', 'gufo': 'animals/owl|g.u.f.o|', 'luna': 'camping/moon|l.u.n.a|', 'mela': 'At the Supermarket/apple|m.e.l.a|', 'nave': 'vehicles/ship|n.a.v.e|', 'nido': 'spring/nest|n.i.d.o|', 'pala': 'toys/shovel|p.a.l.a|', 'pera': 'At the Supermarket/pear|p.e.r.a|', 'rana': 'camping/frog|r.a.n.a|', 'remo': 'camping/oar|r.e.m.o|', 'rete': 'beach/net|r.e.t.e|', 'rosa': 'flowers/rose|r.o.s.a|', 'sale': 'At the Supermarket/salt|s.a.l.e|', 'sole': 'beach/sun|s.o.l.e|', 'topo': 'forest creatures/mouse|t.o.p.o|', 'toro': 'farm animals/bull|t.o.r.o|', 'tubo': 'around the house/hose|t.u.b.o|', 'dito': 'body parts/finger|d.i.t.o|', 'lama': 'farm animals/llama|l.a.m.a|', 'faro': 'beach/lighthouse|f.a.r.o|', 'gatto': 'animals/cat|g.a.tt.o|', 'palla': 'toys/ball|p.a.ll.a|', 'penna': 'classroom/pen|p.e.nn.a|', 'mucca': 'farm animals/cow|m.u.cc.a|', 'pesce': 'animals/fish|p.e.sc.e|', 'chiave': 'around the house/key|ch.i.a.v.e|', 'giacca': 'clothing/jacket|gi.a.cc.a|', 'agnello': 'easter/lamb|a.gn.e.ll.o|', 'ragno': 'forest creatures/spider|r.a.gn.o|', 'pigna': 'camping/pinecone|p.i.gn.a|', 'treno': 'toys/train|t.r.e.n.o|'},
      simple: ['mano', 'naso', 'vaso', 'lupo', 'pane', 'fico', 'riso', 'cane', 'casa', 'cubo', 'foca', 'gufo', 'luna', 'mela', 'nave', 'nido', 'pala', 'pera', 'rana', 'remo', 'rete', 'rosa', 'sale', 'sole', 'topo', 'toro', 'tubo', 'dito', 'lama', 'faro'],
      teams: ['gatto', 'palla', 'penna', 'mucca', 'pesce', 'chiave', 'giacca', 'agnello', 'ragno', 'pigna'],
      traps: {'mano': 'e w s', 'naso': 'e m g', 'vaso': 'e w d', 'lupo': 'a t d', 'pane': 'i b t', 'fico': 'e t b', 'riso': 'e n t', 'cane': 'i m s', 'casa': 'e z b', 'cubo': 'a d g', 'foca': 'u t r', 'gufo': 'a q t', 'luna': 'o t v', 'mela': 'i n g', 'nave': 'i m f', 'nido': 'e m s', 'pala': 'e b m', 'pera': 'i b n', 'rana': 'e m f', 'remo': 'i n d', 'rete': 'i n d', 'rosa': 'u n m', 'sale': 'i z m', 'sole': 'u z m', 'topo': 'u f m', 'toro': 'u f p', 'tubo': 'a f p', 'dito': 'e b s', 'lama': 'e t v', 'faro': 'e t b', 'gatto': 't e i', 'palla': 'l e o', 'penna': 'n i o', 'mucca': 'c o i', 'pesce': 's c i', 'chiave': 'c h o', 'giacca': 'g i c e', 'agnello': 'g n l i', 'ragno': 'g n e', 'pigna': 'g n e'},
      blend: {'mano': 'mela mucca', 'naso': 'vaso nave', 'vaso': 'naso casa', 'lupo': 'luna lama', 'pane': 'cane pala', 'fico': 'faro foca', 'riso': 'remo rosa', 'cane': 'pane casa', 'casa': 'cane cubo', 'cubo': 'tubo cane', 'foca': 'fico faro', 'gufo': 'gatto giacca', 'luna': 'lama lupo', 'mela': 'mano mucca', 'nave': 'naso nido', 'nido': 'naso nave', 'pala': 'pane pera', 'pera': 'pala pane', 'rana': 'rosa remo', 'remo': 'rete riso', 'rete': 'remo rana', 'rosa': 'rana riso', 'sale': 'sole cane', 'sole': 'sale cane', 'topo': 'toro tubo', 'toro': 'topo tubo', 'tubo': 'cubo topo', 'dito': 'fico nido', 'lama': 'luna lupo', 'faro': 'fico foca', 'gatto': 'giacca gufo', 'palla': 'penna pigna', 'penna': 'pigna palla', 'mucca': 'mano mela', 'pesce': 'penna palla', 'chiave': 'cane casa', 'giacca': 'gatto gufo', 'agnello': 'cane casa', 'ragno': 'rana remo', 'pigna': 'penna palla'},
      bank: {'mano': 'cane faro naso', 'naso': 'vaso casa faro', 'vaso': 'naso casa faro', 'lupo': 'cubo gufo luna', 'pane': 'cane mano nave', 'fico': 'dito faro foca', 'riso': 'dito fico naso', 'cane': 'pane casa mano', 'casa': 'cane lama naso', 'cubo': 'tubo gufo lupo', 'foca': 'fico rosa casa', 'gufo': 'cubo lupo tubo', 'luna': 'lama lupo rana', 'mela': 'pala pera casa', 'nave': 'cane naso pane', 'nido': 'dito fico naso', 'pala': 'casa lama mela', 'pera': 'mela pala casa', 'rana': 'cane casa lama', 'remo': 'rete riso cubo', 'rete': 'remo cane dito', 'rosa': 'casa foca rana', 'sale': 'sole cane nave', 'sole': 'sale cane foca', 'topo': 'toro lupo tubo', 'toro': 'topo faro tubo', 'tubo': 'cubo gufo lupo', 'dito': 'fico nido riso', 'lama': 'casa luna pala', 'faro': 'fico mano naso', 'gatto': 'ragno palla treno', 'palla': 'penna pigna gatto', 'penna': 'pigna palla pesce', 'mucca': 'palla penna pesce', 'pesce': 'penna mucca palla', 'chiave': 'giacca agnello gatto', 'giacca': 'chiave agnello gatto', 'agnello': 'chiave giacca gatto', 'ragno': 'gatto pigna treno', 'pigna': 'penna palla ragno'}
    },
    pt: {
      words: {'rato': 'pets/mouse|r.a.t.o|', 'cama': 'around the house/bed|c.a.m.a|', 'dedo': 'body parts/finger|d.e.d.o|', 'vela': 'christmas/candle|v.e.l.a|', 'copo': 'kitchen tools/glass|c.o.p.o|', 'luva': 'accessories/glove|l.u.v.a|', 'gato': 'animals/cat|g.a.t.o|', 'pato': 'animals/duck|p.a.t.o|', 'casa': 'miscellaneous/house|c.a.s.a|', 'bola': 'toys/ball|b.o.l.a|', 'boca': 'body parts/mouth|b.o.c.a|', 'vaca': 'farm animals/cow|v.a.c.a|', 'faca': 'around the house/knife|f.a.c.a|', 'foca': 'ocean life/seal|f.o.c.a|', 'mapa': 'camping/map|m.a.p.a|', 'capa': 'accessories/cape|c.a.p.a|', 'lata': 'At the Supermarket/can|l.a.t.a|', 'pera': 'At the Supermarket/pear|p.e.r.a|', 'figo': 'fruits/fig|f.i.g.o|', 'galo': 'farm animals/rooster|g.a.l.o|', 'lobo': 'animals/wolf|l.o.b.o|', 'saco': 'christmas/sack|s.a.c.o|', 'sino': 'christmas/bell|s.i.n.o|', 'mesa': 'around the house/table|m.e.s.a|', 'pipa': 'toys/kite|p.i.p.a|', 'cubo': 'shapes/cube|c.u.b.o|', 'cola': 'classroom/glue|c.o.l.a|', 'chave': 'around the house/key|ch.a.v.e|', 'ninho': 'spring/nest|n.i.nh.o|', 'olho': 'body parts/eye|o.lh.o|', 'folha': 'miscellaneous/leaf|f.o.lh.a|', 'ovelha': 'farm animals/sheep|o.v.e.lh.a|', 'carro': 'toys/car|c.a.rr.o|', 'burro': 'animals/donkey|b.u.rr.o|'},
      simple: ['rato', 'cama', 'dedo', 'vela', 'copo', 'luva', 'gato', 'pato', 'casa', 'bola', 'boca', 'vaca', 'faca', 'foca', 'mapa', 'capa', 'lata', 'pera', 'figo', 'galo', 'lobo', 'saco', 'sino', 'mesa', 'pipa', 'cubo', 'cola'],
      teams: ['chave', 'ninho', 'olho', 'folha', 'ovelha', 'carro', 'burro'],
      traps: {'rato': 'e n m', 'cama': 'e n t', 'dedo': 'i b t', 'vela': 'i w p', 'copo': 'a b d', 'luva': 'o t f', 'gato': 'e q b', 'pato': 'e b g', 'casa': 'e b m', 'bola': 'u d v', 'boca': 'u d n', 'vaca': 'e w g', 'faca': 'e t v', 'foca': 'u t r', 'mapa': 'e n d', 'capa': 'e b m', 'lata': 'e f p', 'pera': 'i b n', 'figo': 'e t s', 'galo': 'e q v', 'lobo': 'a t m', 'saco': 'e b v', 'sino': 'e m g', 'mesa': 'i n t', 'pipa': 'e b l', 'cubo': 'a d g', 'cola': 'u t d', 'chave': 'c h o', 'ninho': 'h e a', 'olho': 'l h a', 'folha': 'l h u', 'ovelha': 'l h u', 'carro': 'r e i', 'burro': 'r a i'},
      blend: {'rato': 'gato pato', 'cama': 'capa casa', 'dedo': 'copo cubo', 'vela': 'vaca bola', 'copo': 'capa cola', 'luva': 'lata lobo', 'gato': 'galo pato', 'pato': 'gato rato', 'casa': 'cama capa', 'bola': 'boca cola', 'boca': 'bola foca', 'vaca': 'faca vela', 'faca': 'foca vaca', 'foca': 'faca boca', 'mapa': 'capa mesa', 'capa': 'cama casa', 'lata': 'luva lobo', 'pera': 'pipa pato', 'figo': 'faca foca', 'galo': 'gato pato', 'lobo': 'lata luva', 'saco': 'sino faca', 'sino': 'saco figo', 'mesa': 'mapa casa', 'pipa': 'pera pato', 'cubo': 'copo cama', 'cola': 'bola cama', 'chave': 'carro cama', 'ninho': 'burro carro', 'olho': 'ovelha copo', 'folha': 'faca figo', 'ovelha': 'olho boca', 'carro': 'chave cama', 'burro': 'boca bola'},
      bank: {'rato': 'gato pato galo', 'cama': 'capa casa cola', 'dedo': 'copo cubo figo', 'vela': 'bola cola mesa', 'copo': 'capa cola cubo', 'luva': 'lata boca bola', 'gato': 'galo pato rato', 'pato': 'gato rato galo', 'casa': 'cama capa cola', 'bola': 'boca cola foca', 'boca': 'bola foca cola', 'vaca': 'faca boca cama', 'faca': 'foca vaca boca', 'foca': 'boca faca bola', 'mapa': 'capa cama casa', 'capa': 'cama casa mapa', 'lata': 'cama capa casa', 'pera': 'mesa pipa vela', 'figo': 'sino copo cubo', 'galo': 'gato pato rato', 'lobo': 'copo cubo boca', 'saco': 'faca galo gato', 'sino': 'figo saco copo', 'mesa': 'casa mapa pera', 'pipa': 'capa mapa pera', 'cubo': 'copo lobo cama', 'cola': 'bola boca cama', 'chave': 'carro burro folha', 'ninho': 'burro carro folha', 'olho': 'copo cubo dedo', 'folha': 'ninho burro carro', 'ovelha': 'burro carro chave', 'carro': 'burro chave ninho', 'burro': 'carro ninho chave'}
    },
    fr: {
      words: {'bol': 'around the house/bowl|b.o.l|', 'sac': 'At the Supermarket/bag|s.a.c|', 'bus': 'vehicles/bus|b.u.s|', 'clé': 'around the house/key|c.l.é|', 'vélo': 'vehicles/bicycle|v.é.l.o|', 'sel': 'At the Supermarket/salt|s.e.l|', 'lune': 'space/moon|l.u.n|e', 'chat': 'animals/cat|ch.a|t', 'lit': 'around the house/bed|l.i|t', 'nid': 'spring/nest|n.i|d', 'loup': 'animals/wolf|l.ou|p', 'chou': 'vegetables/cabbage|ch.ou|', 'souris': 'pets/mouse|s.ou.r.i|s', 'tapis': 'around the house/carpet|t.a.p.i|s', 'poule': 'birds 2/hen|p.ou.l|e', 'bouche': 'body parts/mouth|b.ou.ch|e', 'poire': 'fruits/pear|p.oi.r|e', 'étoile': 'christmas/star|é.t.oi.l|e', 'pull': 'clothing/sweater|p.u.ll|', 'robe': 'clothing/dress|r.o.b|e', 'vase': 'around the house/vase|v.a.s|e', 'rose': 'flowers/rose|r.o.s|e', 'jupe': 'clothing/skirt|j.u.p|e', 'tasse': 'around the house/cup|t.a.ss|e', 'four': 'around the house/oven|f.ou.r|', 'pomme': 'At the Supermarket/apple|p.o.mm|e', 'cube': 'shapes/cube|c.u.b|e', 'cape': 'accessories/cape|c.a.p|e', 'rame': 'camping/oar|r.a.m|e', 'bague': 'accessories/ring|b.a.g|ue', 'tête': 'body parts/head|t.ê.t|e', 'luge': 'winter/sled|l.u.g|e', 'ours': 'camping/bear|ou.r.s|', 'mûre': 'fruits/blackberry|m.û.r|e', 'vache': 'farm animals/cow|v.a.ch|e', 'tomate': 'vegetables/tomato|t.o.m.a.t|e'},
      simple: ['bol', 'sac', 'bus', 'clé', 'vélo', 'sel', 'lune'],
      teams: ['chat', 'lit', 'nid', 'loup', 'chou', 'souris', 'tapis', 'poule', 'bouche', 'poire', 'étoile', 'lune', 'pull', 'robe', 'vase', 'rose', 'jupe', 'tasse', 'four', 'pomme', 'cube', 'cape', 'rame', 'bague', 'tête', 'luge', 'ours', 'mûre', 'vache'],
      traps: {'bol': 'u a d v', 'sac': 'e o b v', 'bus': 'o a d p', 'clé': 'è a t v', 'vélo': 'è w d', 'sel': 'i a t j', 'lune': 'o a t v', 'chat': 'c h e', 'lit': 'e a t v', 'nid': 'e a m v', 'loup': 'o u a', 'chou': 'c h o u', 'souris': 'o u e', 'tapis': 'e f m', 'poule': 'o u a', 'bouche': 'o u c h', 'poire': 'o i u', 'étoile': 'o i è', 'pull': 'l o a', 'robe': 'u a n j', 'vase': 'e o w n', 'rose': 'u a n f', 'jupe': 'o a b l', 'tasse': 's e o', 'four': 'o u a', 'pomme': 'm u a', 'cube': 'o a d m', 'cape': 'e o b n', 'rame': 'e o n b', 'bague': 'e o d t', 'tête': 'e a f r', 'luge': 'o a t b', 'ours': 'o u a', 'mûre': 'a o n t', 'vache': 'c h e'},
      blend: {'bol': 'bus bague', 'sac': 'sel souris', 'bus': 'bol bague', 'clé': 'cape chat', 'vélo': 'vase vache', 'sel': 'sac souris', 'lune': 'luge loup', 'chat': 'chou cape', 'lit': 'loup luge', 'nid': 'lit bol', 'loup': 'luge lune', 'chou': 'chat cape', 'souris': 'sac sel', 'tapis': 'tasse tomate', 'poule': 'poire pomme', 'bouche': 'bague bol', 'poire': 'pomme poule', 'étoile': 'bouche tomate', 'pull': 'poire pomme', 'robe': 'rose rame', 'vase': 'vélo vache', 'rose': 'robe rame', 'jupe': 'cape cube', 'tasse': 'tapis tomate', 'four': 'loup robe', 'pomme': 'poire poule', 'cube': 'cape chat', 'cape': 'cube chat', 'rame': 'robe rose', 'bague': 'bol bouche', 'tête': 'tapis tasse', 'luge': 'lune loup', 'ours': 'cube jupe', 'mûre': 'cape cube', 'vache': 'vase vélo'},
      bank: {'bol': 'bus sel clé', 'sac': 'sel bol bus', 'bus': 'bol clé lit', 'clé': 'bol bus lit', 'vélo': 'pull vase cape', 'sel': 'bol sac bus', 'lune': 'luge cube jupe', 'chat': 'chou cape cube', 'lit': 'nid bol bus', 'nid': 'lit bol bus', 'loup': 'four luge lune', 'chou': 'chat cape cube', 'souris': 'bouche tomate étoile', 'tapis': 'tasse bague vache', 'poule': 'poire pomme bague', 'bouche': 'souris tomate étoile', 'poire': 'pomme poule bague', 'étoile': 'bouche tomate souris', 'pull': 'cube jupe luge', 'robe': 'rose cube rame', 'vase': 'cape rame rose', 'rose': 'robe rame vase', 'jupe': 'cape cube luge', 'tasse': 'bague tapis vache', 'four': 'loup robe rose', 'pomme': 'poire poule bague', 'cube': 'cape jupe luge', 'cape': 'cube jupe rame', 'rame': 'cape robe rose', 'bague': 'tasse vache poire', 'tête': 'cape cube jupe', 'luge': 'lune cube jupe', 'ours': 'cube jupe luge', 'mûre': 'cape cube jupe', 'vache': 'bague tasse poire'}
    },
    fi: {
      words: {'susi': 'animals/wolf|s.u.s.i|', 'käsi': 'body parts/hand|k.ä.s.i|', 'muki': 'kitchen tools/mug|m.u.k.i|', 'lasi': 'kitchen tools/glass|l.a.s.i|', 'vene': 'beach/boat|v.e.n.e|', 'auto': 'toys/car|a.u.t.o|', 'kala': 'animals/fish|k.a.l.a|', 'talo': 'miscellaneous/house|t.a.l.o|', 'juna': 'toys/train|j.u.n.a|', 'kana': 'farm animals/chicken|k.a.n.a|', 'kani': 'animals/rabbit|k.a.n.i|', 'kori': 'At the Supermarket/basket|k.o.r.i|', 'kynä': 'around the house/pen|k.y.n.ä|', 'mato': 'spring/worm|m.a.t.o|', 'nenä': 'body parts/nose|n.e.n.ä|', 'pesä': 'spring/nest|p.e.s.ä|', 'rapu': 'beach/crab|r.a.p.u|', 'reki': 'christmas/sleigh|r.e.k.i|', 'sika': 'animals/pig|s.i.k.a|', 'tipu': 'farm animals/chick|t.i.p.u|', 'hame': 'clothing/skirt|h.a.m.e|', 'hana': 'around the house/faucet|h.a.n.a|', 'joki': 'camping/river|j.o.k.i|', 'pipo': 'accessories/beanie|p.i.p.o|', 'kuu': 'space/moon|k.u.u|', 'suu': 'body parts/mouth|s.u.u|', 'kukka': 'summer/flower|k.u.k.k.a|', 'kuppi': 'around the house/cup|k.u.p.p.i|', 'pallo': 'toys/ball|p.a.l.l.o|', 'kettu': 'animals/fox|k.e.t.t.u|', 'sukka': 'accessories/sock|s.u.k.k.a|', 'lippu': '4th of July/flag|l.i.p.p.u|', 'ovi': 'around the house/door|o.v.i|'},
      simple: ['susi', 'käsi', 'muki', 'lasi', 'vene', 'auto', 'kala', 'talo', 'juna', 'kana', 'kani', 'kori', 'kynä', 'mato', 'nenä', 'pesä', 'rapu', 'reki', 'sika', 'tipu', 'hame', 'hana', 'joki', 'pipo'],
      teams: ['kuu', 'suu', 'kukka', 'kuppi', 'pallo', 'kettu', 'sukka', 'lippu'],
      traps: {'susi': 'o z r', 'käsi': 'a h m', 'muki': 'o n t', 'lasi': 'e t p', 'vene': 'i w s', 'auto': 'e f j', 'kala': 'e h p', 'talo': 'e f h', 'juna': 'o m t', 'kana': 'e h v', 'kani': 'e h t', 'kori': 'u h m', 'kynä': 'u h t', 'mato': 'e n h', 'nenä': 'i m t', 'pesä': 'i b v', 'rapu': 'e n t', 'reki': 'a n l', 'sika': 'e z p', 'tipu': 'e f s', 'hame': 'i n k', 'hana': 'e m s', 'joki': 'u h v', 'pipo': 'e b v', 'kuu': 'o a h t', 'suu': 'o a z m', 'kukka': 'o h v', 'kuppi': 'o h v', 'pallo': 'e b v', 'kettu': 'i h r', 'sukka': 'o z m', 'lippu': 'e t h'},
      blend: {'susi': 'sika sukka', 'käsi': 'kani kori', 'muki': 'mato joki', 'lasi': 'lippu kani', 'vene': 'nenä hame', 'auto': 'mato juna', 'kala': 'kana kani', 'talo': 'tipu kala', 'juna': 'joki hana', 'kana': 'kala kani', 'kani': 'kana kala', 'kori': 'kani käsi', 'kynä': 'kana kani', 'mato': 'muki auto', 'nenä': 'kynä pesä', 'pesä': 'pipo pallo', 'rapu': 'reki tipu', 'reki': 'rapu joki', 'sika': 'susi sukka', 'tipu': 'talo pipo', 'hame': 'hana kala', 'hana': 'kana hame', 'joki': 'juna kori', 'pipo': 'pesä pallo', 'kuu': 'suu kala', 'suu': 'kuu sika', 'kukka': 'sukka kuppi', 'kuppi': 'kukka kettu', 'pallo': 'pesä pipo', 'kettu': 'kukka kuppi', 'sukka': 'kukka sika', 'lippu': 'lasi kuppi'},
      bank: {'susi': 'käsi lasi muki', 'käsi': 'kani kori lasi', 'muki': 'joki reki susi', 'lasi': 'kani käsi susi', 'vene': 'nenä hame hana', 'auto': 'mato juna muki', 'kala': 'kana hana kani', 'talo': 'kala mato auto', 'juna': 'hana kana auto', 'kana': 'hana kala kani', 'kani': 'kana hana kala', 'kori': 'joki kani käsi', 'kynä': 'kana kani nenä', 'mato': 'auto talo hame', 'nenä': 'kynä pesä vene', 'pesä': 'nenä kynä käsi', 'rapu': 'tipu hame hana', 'reki': 'joki muki kani', 'sika': 'hana joki juna', 'tipu': 'pipo rapu sika', 'hame': 'hana kala kana', 'hana': 'kana hame juna', 'joki': 'kori muki reki', 'pipo': 'tipu auto mato', 'kuu': 'suu ovi auto', 'suu': 'kuu ovi auto', 'kukka': 'sukka kuppi kettu', 'kuppi': 'kukka lippu kettu', 'pallo': 'kettu kukka kuppi', 'kettu': 'kukka kuppi lippu', 'sukka': 'kukka kuppi kettu', 'lippu': 'kuppi kettu kukka'}
    }
  };
  /*DATA-END*/

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var CLUES = ['beads', 'first', 'missing', 'bank', 'write', 'stretch', 'blend'];
  var MIN_ROUNDS = 7, MAX_BEADS = 6;
  /* the keyboard alphabet, in each locale's school order */
  var ALPHA = {
    en: 'abcdefghijklmnopqrstuvwxyz', de: 'abcdefghijklmnopqrstuvwxyzäöüß', nl: 'abcdefghijklmnopqrstuvwxyz', da: 'abcdefghijklmnopqrstuvwxyzæøå',
    sv: 'abcdefghijklmnopqrstuvwxyzåäö', no: 'abcdefghijklmnopqrstuvwxyzæøå', es: 'abcdefghijklmnñopqrstuvwxyz', it: 'abcdefghilmnopqrstuvzjkwxy',
    pt: 'abcdefghijklmnopqrstuvwxyzçáâãéêíóôõú', fr: 'abcdefghijklmnopqrstuvwxyzéèêâîôûç', fi: 'abcdefghijklmnopqrstuvwxyzåäö'
  };

  function locale(l) { l = String(l || 'en').slice(0, 2); return DATA[l] ? l : 'en'; }
  function lower(s) { return String(s).toLocaleLowerCase(); }
  function word(loc, key) {
    var w = DATA[loc].words[key]; if (!w) throw new Error('word-elastic: no word ' + loc + '/' + key);
    var p = w.split('|');
    return { key: key, word: key, pic: p[0], sounds: p[1].split('.'), quiet: p[2] || '' };
  }
  /* the Words settings a locale offers (teams only with ≥ 7 rounds; da has none) */
  function wordModes(loc) { loc = locale(loc); var m = ['simple']; if ((DATA[loc].teams || []).length >= MIN_ROUNDS) m.push('teams'); return m; }
  function wordMode(loc, w) { var m = wordModes(loc); return m.indexOf(w) >= 0 ? w : 'simple'; }
  function clue(c) { return CLUES.indexOf(c) >= 0 ? c : 'beads'; }
  /* fi long sounds run stop-less (stops would give the length away) */
  function stopless(loc, c, wm) { return c === 'stretch' || (locale(loc) === 'fi' && wm === 'teams' && (c === 'beads' || c === 'bank' || c === 'write')); }
  function keyboard(c) { return c === 'write' || c === 'stretch'; }
  var MISSING_PATTERN = ['mid', 'last', 'first', 'mid', 'last', 'mid', 'first', 'last', 'mid'];   /* 4 · 3 · 2 per nine */
  function missingAt(n, i) { var p = MISSING_PATTERN[i % 9]; if (n < 3) return p === 'first' ? 0 : n - 1;   /* a two-sound word has no middle */
    return p === 'first' ? 0 : p === 'last' ? n - 1 : (n >= 4 ? 1 + (i % (n - 2)) : 1); }

  function rounds(loc, c, wm) {
    loc = locale(loc); c = clue(c); wm = wordMode(loc, wm);
    var D = DATA[loc], keys = wm === 'teams' ? D.teams : D.simple;
    return keys.map(function (k, i) {
      var w = word(loc, k), n = w.sounds.length, traps = (D.traps[k] || '').split(' ').filter(Boolean);
      var r = { id: c + '-' + wm + '-' + lower(k), loc: loc, clue: c, words: wm, key: k, word: k, pic: w.pic, sounds: w.sounds, quiet: w.quiet, given: [], tray: [], bank: null, choices: null, stopless: stopless(loc, c, wm), keyboard: keyboard(c) };
      var tray = [];
      if (c === 'first') { r.given = [0]; tray = w.sounds.slice(1).concat(traps); }
      else if (c === 'missing') {
        var m = missingAt(n, i); r.missing = m;
        for (var g = 0; g < n; g++) if (g !== m) r.given.push(g);
        /* the right letter + the neighbouring vowel + a look-alike + a consonant */
        tray = [w.sounds[m]].concat(traps.filter(function (t) { return t !== w.sounds[m]; }).slice(0, 3));
      }
      else if (c === 'blend') { r.given = w.sounds.map(function (_, q) { return q; }); r.choices = [k].concat((D.blend[k] || '').split(' ')).map(function (x) { return word(loc, x); }); }
      else if (!r.keyboard) tray = w.sounds.concat(traps);
      if (c === 'bank') r.bank = [k].concat((D.bank[k] || '').split(' '));
      r.tray = tray.map(function (g, q) { return { id: q, g: g }; });
      return r;
    });
  }
  function letters(loc, wm) { loc = locale(loc); var L = ALPHA[loc].split(''); if (wm === 'teams' && loc !== 'fi') { var seen = {}; (DATA[loc].teams || []).forEach(function (k) { word(loc, k).sounds.forEach(function (s) { if (Array.from(s).length > 1 && !seen[lower(s)]) { seen[lower(s)] = 1; L.push(lower(s)); } }); }); } return L; }

  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  /* a tray order: never the word's own tiles side by side in word order */
  function dealTray(r, rnd) {
    var n = r.tray.length, need = r.sounds.length;
    for (var t = 0; t < 200; t++) {
      var o = shuffle(r.tray.map(function (_, i) { return i; }), rnd), bad = false;
      if (r.clue !== 'missing') for (var s = 0; s + need <= n && !bad; s++) { var run = true; for (var q = 0; q < need && run; q++) if (r.tray[o[s + q]].g !== r.sounds[q] || (r.given.indexOf(q) >= 0)) run = false; if (run) bad = true; }
      if (r.clue === 'first' && r.sounds.length > 2) { var rest = o.map(function (i) { return r.tray[i].g; }).join(','); if (rest.indexOf(r.sounds.slice(1).join(',')) >= 0) bad = true; }
      if (!bad) return o;
    }
    return r.tray.map(function (_, i) { return i; }).reverse();
  }
  /* blend: the right picture in each of the three places a third of the time (±1) */
  function dealChoices(n, rnd) { var s = []; for (var i = 0; i < n; i++) s.push(i % 3); shuffle(s, rnd); return s.map(function (t) { var o = shuffle([1, 2], rnd); o.splice(t, 0, 0); return o; }); }
  /* word bank: the round's word in each of the four rows at most ⌈n / 4⌉ + 1 times */
  function dealBank(n, rnd) { var s = []; for (var i = 0; i < n; i++) s.push(i % 4); shuffle(s, rnd); return s.map(function (t) { var o = shuffle([1, 2, 3], rnd); o.splice(t, 0, 0); return o; }); }

  function newState(r, opts) {
    opts = opts || {};
    var n = r.sounds.length;
    var st = { r: r, misses: 0, help: 0, show: false, last: null, done: false, pick: -1 };
    st.trayOrder = opts.trayOrder || r.tray.map(function (_, i) { return i; });
    st.choiceOrder = opts.choiceOrder || [0, 1, 2];
    st.bankOrder = opts.bankOrder || [0, 1, 2, 3];
    st.beads = []; for (var i = 0; i < (r.stopless ? 0 : n); i++) st.beads.push(null);
    r.given.forEach(function (g) { st.beads[g] = { g: r.sounds[g], given: true }; });
    st.stretch = r.clue === 'blend' ? n : (r.given.length ? n : 0);
    return st;
  }
  function moved(st) { st.show = false; st.last = null; }
  function nBeads(st) { return st.r.stopless ? st.beads.length : st.r.sounds.length; }
  function used(st, tid) { return st.beads.some(function (b) { return b && b.tid === tid; }); }
  function trayAt(st, slot) { return st.r.tray[st.trayOrder[slot]]; }
  /* the band: pull out (or let back) beads; fixed modes stop at the word's bead count */
  function stretchTo(st, k) {
    var r = st.r; if (st.done || r.clue === 'blend') return false;
    var max = r.stopless ? MAX_BEADS : r.sounds.length; k = Math.max(0, Math.min(max, k));
    if (r.stopless) {
      if (k === st.beads.length) return false;
      while (st.beads.length < k) st.beads.push(null);
      while (st.beads.length > k) st.beads.pop();
    } else if (k === st.stretch) return false;
    st.stretch = k; moved(st); return true;
  }
  /* a tile onto a bead (the band springs open if it was shut) */
  function place(st, tid, bead) {
    var r = st.r; if (st.done || r.keyboard || r.clue === 'blend') return false;
    if (bead === undefined || bead < 0) bead = firstEmpty(st);   /* stop-less: only the beads the child pulled out (the count is the child's own) */
    if (bead < 0 || bead >= nBeads(st)) return false;
    if (st.beads[bead] && st.beads[bead].given) return false;
    var t = r.tray[tid]; if (!t || used(st, tid)) return false;
    st.beads[bead] = { g: t.g, tid: tid };
    if (!r.stopless) st.stretch = r.sounds.length;
    moved(st); return true;
  }
  /* keyboard: a letter (or a team key) into the first empty bead */
  function type(st, g) {
    var r = st.r; if (st.done || !r.keyboard) return false;
    var b = firstEmpty(st);
    if (b < 0) return false;   /* stop-less: typing never adds a bead — the child pulls them out */
    st.beads[b] = { g: g, typed: true }; if (!r.stopless) st.stretch = r.sounds.length;
    moved(st); return true;
  }
  /* keyboard: Backspace empties the last filled bead */
  function backspace(st) { if (st.done) return false; for (var i = st.beads.length - 1; i >= 0; i--) if (st.beads[i] && !st.beads[i].given) { st.beads[i] = null; moved(st); return true; } return false; }
  function clearBead(st, i) { if (st.done || !st.beads[i] || st.beads[i].given) return false; st.beads[i] = null; moved(st); return true; }
  function firstEmpty(st) { for (var i = 0; i < st.beads.length; i++) if (!st.beads[i]) return i; return -1; }
  function pick(st, slot) { if (st.done || st.r.clue !== 'blend' || slot < 0 || slot > 2 || st.pick === slot) return false; st.pick = slot; moved(st); return true; }
  function choiceAt(st, slot) { return st.r.choices[st.choiceOrder[slot]]; }
  /* is a bead's letter the sound in that place? (German: the first letter is a capital; typed letters are case-blind) */
  function same(r, b, i) { var s = r.sounds[i]; if (!b) return false; return b.typed ? lower(b.g) === lower(s) : b.g === s; }

  function check(st) {
    var r = st.r, n = r.sounds.length;
    if (st.done) return { ok: true };
    if (r.clue === 'blend') {
      if (st.pick < 0) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
      if (choiceAt(st, st.pick).key === r.key) { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true }; }
      st.misses++; st.help = Math.min(3, st.misses); st.show = true; st.last = { result: 'wrongPick', pick: st.pick }; return { ok: false, kase: 'wrongPick' };
    }
    var filled = st.beads.filter(Boolean).length;
    if (r.stopless) {
      if (!filled) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
      if (st.beads.length > n) { st.misses++; st.help = Math.min(3, st.misses); st.show = true; st.last = { result: 'tooMany', extra: st.beads.length - n }; return { ok: false, kase: 'tooMany' }; }
      if (st.beads.length < n) {
        /* the gap opens where the missing sound belongs: after the last bead that still matches */
        var gap = 0; while (gap < st.beads.length && same(r, st.beads[gap], gap)) gap++;
        st.misses++; st.help = Math.min(3, st.misses); st.show = true; st.last = { result: 'tooFew', gap: gap }; return { ok: false, kase: 'tooFew', gap: gap };
      }
    }
    if (filled < n || st.stretch < n && !r.stopless) {
      var em = []; for (var i = 0; i < n; i++) if (!st.beads[i]) em.push(i);
      st.show = true; st.last = { result: 'empty', empty: em }; return { ok: false, kase: 'empty', empty: em };
    }
    var wrong = []; for (var j = 0; j < n; j++) if (!same(r, st.beads[j], j)) wrong.push(j);
    if (!wrong.length) { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true }; }
    var placed = st.beads.map(function (b) { return lower(b.g); }).sort().join(','), want = r.sounds.map(lower).sort().join(',');
    var order = placed === want;
    var team = -1; for (var t = 0; t < n - 1; t++) if (Array.from(r.sounds[t]).length > 1 && st.beads[t] && st.beads[t + 1] && lower(st.beads[t].g) + lower(st.beads[t + 1].g) === lower(r.sounds[t])) { team = t; break; }
    /* one letter of a letter team on the team's bead (k on ck, t on tt): it makes the right sound, the spelling needs both letters */
    var part = wrong.some(function (i) { var snd = r.sounds[i], b = st.beads[i]; return Array.from(snd).length > 1 && b && Array.from(b.g).length === 1 && lower(snd).indexOf(lower(b.g)) >= 0; });
    st.misses++; st.help = Math.min(3, st.misses); st.show = true;
    st.last = { result: 'wrong', wrong: wrong, order: order, team: team, part: part };
    return { ok: false, kase: 'wrong', wrong: wrong, order: order, team: team, part: part };
  }
  /* the place of a bead: first / middle / last */
  function placeOf(n, i) { return i === 0 ? 'first' : i === n - 1 ? 'last' : 'middle'; }
  /* miss 2: the place arrows and the two lit tiles; miss 3: the ghost letters */
  function helpOn(st) { return !st.done && st.show && st.help >= 2 && st.last && (st.last.result === 'wrong' || st.last.result === 'wrongPick'); }
  function ghostOn(st) { return helpOn(st) && st.help >= 3 && st.last.result === 'wrong'; }
  function litTiles(st) {
    var r = st.r, l = st.last; if (!helpOn(st) || l.result !== 'wrong' || r.keyboard) return [];
    var i = l.wrong[0], out = [];
    for (var s = 0; s < r.tray.length; s++) if (r.tray[s].g === r.sounds[i] && !used(st, s)) { out.push(s); break; }
    var b = st.beads[i]; if (b && b.tid !== undefined) out.push(b.tid);
    if (l.order && l.wrong.length >= 2) { var b2 = st.beads[l.wrong[1]]; if (b2 && b2.tid !== undefined && out.indexOf(b2.tid) < 0) out.push(b2.tid); }
    return out;
  }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, r = st.r;
    if (R === 'empty') return r.clue === 'blend' ? 'hintPick' : (r.stopless && !st.beads.length ? 'hintPull' : 'hintEmpty');
    if (R === 'tooMany') return 'hintTooMany';
    if (R === 'tooFew') return 'hintTooFew';
    if (R === 'wrongPick') return st.help >= 2 ? 'hintBlendHelp' : 'hintBlend';
    if (R !== 'wrong') return null;
    if (st.last.part || (st.last.team >= 0 && st.help >= 2)) return 'hintTeam';
    if (st.help >= 2) return { first: 'hintFirstSound', middle: 'hintMiddleSound', last: 'hintLastSound' }[placeOf(r.sounds.length, st.last.wrong[0])];
    return st.last.order ? 'hintOrder' : 'hintWrong';
  }
  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }
  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.pic = wide ? 150 : (W < 340 ? 84 : 112);
    L.bead = wide ? 72 : (W < 340 ? 52 : 60);
    L.tile = wide ? 60 : (W < 340 ? 46 : 56);
    L.knob = wide ? 56 : 52;
    return L;
  }

  return {
    DATA: DATA, LOCALES: LOCALES, CLUES: CLUES, MIN_ROUNDS: MIN_ROUNDS, MAX_BEADS: MAX_BEADS, ALPHA: ALPHA, MISSING_PATTERN: MISSING_PATTERN,
    locale: locale, word: word, wordModes: wordModes, wordMode: wordMode, clue: clue, stopless: stopless, keyboard: keyboard, missingAt: missingAt,
    rounds: rounds, letters: letters, seeded: seeded, dealTray: dealTray, dealChoices: dealChoices, dealBank: dealBank, newState: newState,
    nBeads: nBeads, used: used, trayAt: trayAt, stretchTo: stretchTo, place: place, type: type, backspace: backspace, clearBead: clearBead, firstEmpty: firstEmpty,
    pick: pick, choiceAt: choiceAt, same: same, check: check, placeOf: placeOf, helpOn: helpOn, ghostOn: ghostOn, litTiles: litTiles, hint: hint, order: order, layout: layout
  };
}));
