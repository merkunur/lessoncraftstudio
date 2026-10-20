/* =====================================================================
   lid-boxes-core.js — the model of ACTIVITY #55 of the one-by-one
   rebuild: "Coco's Sound Boxes — First, Middle & Last Sounds" → THE
   POP-UP SOUND BOXES (RF.K.2.d, 11 locales).
   Design sheet: docs/activities-rebuild/designs/055-sound-boxes.md
   ---------------------------------------------------------------------
   THE INVENTION: a word sits in sound boxes, one box per sound. Drop a
   picture on the boxes and the lids pop open wherever its sounds are the
   SAME as the target's, AT THE SAME PLACE — so the child sees that a sound
   matched and WHERE it matched. The boxes listen, they do not read: cat
   and kite pop together although one box says c and the other k.
     Task 1 "same sound": find the picture with the same first / middle /
       last sound (every distractor shares a sound at ANOTHER place).
     Task 2 "where is the sound": tap the box that holds a sound (a letter
       team is ONE box).
     Task 3 "hear it anywhere": sort pictures by whether the word has the
       sound at all.
   Sounds are matched by KEY (one key per box, authored per locale; vowel
   length marked where it changes the sound). The letters in each box are
   the locale's sound-boxes bank split (verify-lid-boxes-core.js reads the
   bank and fails on any difference). it / fi / es / pt have too few
   three-sound picture words, so their Task 1 offers First and Last only:
   the middle is hidden, never faked. No DOM. UMD: LidBoxesCore.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LidBoxesCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* per locale: pos = the Task 1 positions it offers; words = 'picture|boxes (dot)|keys (space)|silent tail';
     same = Task 1 rounds 'target answer distractor distractor'; where = Task 2 'card word';
     sort = Task 3 'key|card|yes words|no words' */
  var DATA = {
    en: {
      pos: ['first', 'middle', 'last'],
      words: {'cat': 'animals/cat|c.a.t|k a t|', 'kite': 'toys/kite|k.i_e.t|k ai t|', 'hat': 'accessories/hat|h.a.t|h a t|', 'bag': 'At the Supermarket/bag|b.a.g|b a g|', 'bat': 'animals/bat|b.a.t|b a t|', 'bun': 'bakery/bun|b.u.n|b u n|', 'pig': 'animals/pig|p.i.g|p i g|', 'pen': 'classroom/pen|p.e.n|p e n|', 'fig': 'fruits/fig|f.i.g|f i g|', 'dog': 'animals/dog|d.o.g|d o g|', 'sun': 'beach/sun|s.u.n|s u n|', 'sock': 'accessories/sock|s.o.ck|s o k|', 'hen': 'birds 2/hen|h.e.n|h e n|', 'duck': 'animals/duck|d.u.ck|d u k|', 'log': 'camping/log|l.o.g|l o g|', 'mug': 'kitchen tools/mug|m.u.g|m u g|', 'mop': 'around the house/mop|m.o.p|m o p|', 'jug': 'kitchen tools/jug|j.u.g|j u g|', 'fan': 'around the house/fan|f.a.n|f a n|', 'van': 'vehicles/van|v.a.n|v a n|', 'cup': 'around the house/cup|c.u.p|k u p|', 'can': 'At the Supermarket/can|c.a.n|k a n|', 'bus': 'vehicles/bus|b.u.s|b u s|', 'map': 'camping/map|m.a.p|m a p|', 'net': 'beach/net|n.e.t|n e t|', 'cap': 'accessories/cap|c.a.p|k a p|', 'pot': 'around the house/pot|p.o.t|p o t|', 'ham': 'At the Supermarket/ham|h.a.m|h a m|', 'fish': 'animals/fish|f.i.sh|f i sh|', 'bed': 'around the house/bed|b.e.d|b e d|', 'jam': 'At the Supermarket/jam|j.a.m|j a m|', 'leg': 'body parts/leg|l.e.g|l e g|', 'ship': 'vehicles/ship|sh.i.p|sh i p|', 'chick': 'farm animals/chick|ch.i.ck|ch i k|', 'bench': 'furniture/bench|b.e.n.ch|b e n ch|', 'tooth': 'body parts/tooth|t.oo.th|t oo th|', 'sheep': 'farm animals/sheep|sh.ee.p|sh ee p|', 'brush': 'around the house/brush|b.r.u.sh|b r u sh|', 'tie': 'accessories/tie|t.ie|t ai|', 'tent': 'camping/tent|t.e.n.t|t e n t|', 'drum': 'music/drum|d.r.u.m|d r u m|', 'nest': 'spring/nest|n.e.s.t|n e s t|'},
      same: {first: ['cat kite hat bag', 'bat bun hat pig', 'pig pen fig dog', 'sun sock bun hen', 'dog duck log pig', 'hen hat pen sun', 'mug mop jug bag', 'fan fig van hen', 'cup can bus map'], middle: ['hat van hen net', 'sun jug sock pen', 'dog pot duck pig', 'pig fish pen bag', 'bed hen bun fan', 'cup bus can map', 'fan jam fig hen', 'mop log mug cup', 'net leg hat sun'], last: ['cat net cap fan', 'dog pig duck pot', 'sun pen sock bus', 'van bun bag cup', 'mop cup mug dog', 'hat pot ham cap', 'pig bag pen fish', 'hen fan hat bed', 'cup map can bus']},
      where: ['u bus', 's sun', 'p map', 'sh ship', 'sh fish', 'ch chick', 'ch bench', 'a bag', 'th tooth', 'sh sheep', 'u jug', 'e hen'],
      sort: ['u|u|bus sun cup mug|cat pig hen dog', 'a|a|cat bag map van|dog pig sun hen', 'sh|sh|ship fish sheep brush|sock duck cup chick', 't|t|tie tent hat net|sun pig hen mop', 'm|m|mop mug jam drum|pig bed bus sock', 's|s|sun sock bus nest|cat pig hen mop', 'e|e|bed hen pen net|cat sun dog pig']
    },
    de: {
      pos: ['first', 'middle', 'last'],
      words: {'Hut': 'accessories/hat|h.u.t|h u: t|', 'Bus': 'vehicles/bus|b.u.s|b u s|', 'Fuß': 'body parts/foot|f.u.ß|f u: s|', 'Wal': 'ocean life/whale|w.a.l|v a: l|', 'Elf': 'christmas/elf|e.l.f|e l f|', 'Bett': 'around the house/bed|b.e.tt|b e t|', 'Boot': 'beach/boat|b.oo.t|b o: t|', 'Buch': 'classroom/book|b.u.ch|b u: x|', 'Fisch': 'animals/fish|f.i.sch|f i sch|', 'Schaf': 'farm animals/sheep|sch.a.f|sch a: f|', 'Schal': 'accessories/scarf|sch.a.l|sch a: l|', 'Schiff': 'vehicles/ship|sch.i.ff|sch i f|', 'Kamm': 'around the house/comb|k.a.mm|k a m|', 'Mopp': 'around the house/mop|m.o.pp|m o p|', 'Netz': 'beach/net|n.e.tz|n e ts|', 'Rock': 'clothing/skirt|r.o.ck|r o k|', 'Sack': 'christmas/sack|s.a.ck|z a k|', 'Koch': 'occupations/cook|k.o.ch|k o x|', 'Tisch': 'around the house/table|t.i.sch|t i sch|', 'Ball': 'toys/ball|b.a.ll|b a l|', 'Hahn': 'farm animals/rooster|h.ah.n|h a: n|', 'Huhn': 'farm animals/chicken|h.uh.n|h u: n|', 'Zahn': 'body parts/tooth|z.ah.n|ts a: n|', 'Maus': 'pets/mouse|m.au.s|m au s|', 'Haus': 'miscellaneous/house|h.au.s|h au s|', 'Zaun': 'around the house/fence|z.au.n|ts au n|', 'Bein': 'body parts/leg|b.ei.n|b ai n|', 'Reis': 'At the Supermarket/rice|r.ei.s|r ai s|', 'Ring': 'accessories/ring|r.i.ng|r i ng|', 'Nest': 'spring/nest|n.e.s.t|n e s t|', 'Zelt': 'camping/tent|z.e.l.t|ts e l t|', 'Wolf': 'animals/wolf|w.o.l.f|v o l f|'},
      same: {first: ['Wal Wolf Zahn Bett', 'Hahn Hut Bein Ring', 'Nest Netz Bett Mopp', 'Schiff Schaf Wolf Ball', 'Bus Boot Haus Schaf', 'Zelt Zaun Bett Hahn', 'Bein Buch Hahn Rock', 'Koch Kamm Buch Wal', 'Buch Bett Fuß Nest'], middle: ['Ring Schiff Rock Huhn', 'Ball Sack Bett Koch', 'Hahn Schaf Bein Boot', 'Bett Netz Hut Haus', 'Zahn Schal Bein Buch', 'Maus Zaun Reis Bett', 'Sack Kamm Rock Boot', 'Rock Mopp Ring Tisch', 'Hut Huhn Bett Mopp'], last: ['Bein Hahn Reis Bus', 'Wal Ball Hahn Schiff', 'Schaf Wolf Wal Mopp', 'Buch Koch Bett Nest', 'Zahn Zaun Zelt Kamm', 'Hut Zelt Hahn Schiff', 'Wolf Elf Wal Nest', 'Maus Fuß Mopp Wal', 'Haus Reis Zaun Zelt']},
      where: ['sch Schaf', 'sch Schiff', 'k Kamm', 'n Netz', 'au Zaun', 'ei Reis', 'o Koch', 'u Hut', 'ng Ring', 'ch Buch', 'f Elf', 't Zelt'],
      sort: ['t|t|Boot Nest Tisch Hut|Elf Koch Ring Wal', 'l|l|Wolf Schal Zelt Wal|Tisch Zahn Reis Sack', 'f|f|Fisch Elf Wolf Schaf|Koch Nest Buch Sack', 'n|n|Zahn Nest Zaun Hahn|Buch Haus Tisch Maus', 'e|e|Netz Elf Nest Bett|Hahn Tisch Zaun Kamm', 's|s|Haus Bus Maus Nest|Bett Wal Kamm Ball', 'sch|sch|Schaf Schal Fisch Schiff|Fuß Boot Maus Huhn']
    },
    nl: {
      pos: ['first', 'middle', 'last'],
      words: {'vis': 'animals/fish|v.i.s|v i s|', 'zon': 'beach/sun|z.o.n|z o n|', 'kat': 'animals/cat|k.a.t|k a t|', 'pen': 'around the house/pen|p.e.n|p e n|', 'sok': 'accessories/sock|s.o.k|s o k|', 'bus': 'vehicles/bus|b.u.s|b u s|', 'mok': 'kitchen tools/mug|m.o.k|m o k|', 'kip': 'farm animals/chicken|k.i.p|k i p|', 'bal': 'toys/ball|b.a.l|b a l|', 'bel': 'christmas/bell|b.e.l|b e l|', 'bol': 'shapes/sphere|b.o.l|b o l|', 'ham': 'At the Supermarket/ham|h.a.m|h a m|', 'hek': 'around the house/fence|h.e.k|h e k|', 'jas': 'clothing/coat|j.a.s|j a s|', 'kam': 'around the house/comb|k.a.m|k a m|', 'kan': 'kitchen tools/jug|k.a.n|k a n|', 'kok': 'occupations/cook|k.o.k|k o k|', 'lam': 'farm animals/lamb|l.a.m|l a m|', 'mes': 'around the house/knife|m.e.s|m e s|', 'net': 'beach/net|n.e.t|n e t|', 'pan': 'around the house/pan|p.a.n|p a n|', 'pet': 'accessories/cap|p.e.t|p e t|', 'pot': 'around the house/pot|p.o.t|p o t|', 'rok': 'clothing/skirt|r.o.k|r o k|', 'tas': 'At the Supermarket/bag|t.a.s|t a s|', 'vos': 'animals/fox|v.o.s|v o s|', 'zak': 'christmas/sack|z.a.k|z a k|', 'boek': 'classroom/book|b.oe.k|b oe k|', 'boot': 'beach/boat|b.oo.t|b oo t|', 'muis': 'pets/mouse|m.ui.s|m ui s|', 'huis': 'miscellaneous/house|h.ui.s|h ui s|', 'maan': 'space/moon|m.aa.n|m aa n|', 'kaas': 'At the Supermarket/cheese|k.aa.s|k aa s|', 'vaas': 'around the house/vase|v.aa.s|v aa s|', 'roos': 'flowers/rose|r.oo.s|r oo s|', 'neus': 'body parts/nose|n.eu.s|n eu s|', 'voet': 'body parts/foot|v.oe.t|v oe t|', 'duif': 'birds 2/dove|d.ui.f|d ui f|', 'kool': 'vegetables/cabbage|k.oo.l|k oo l|', 'ring': 'accessories/ring|r.i.ng|r i ng|'},
      same: {first: ['rok ring zak bal', 'bus boot muis voet', 'boek bel sok tas', 'pot pet voet neus', 'kam kool lam duif', 'ring roos kip vos', 'voet vaas net pen', 'boot bol voet pan', 'kaas kip mes bol'], middle: ['ham zak hek voet', 'voet boek kat kip', 'ring vis rok maan', 'zak kam boek kok', 'kat bal kok mes', 'mok kok zak vis', 'vaas maan bus muis', 'pot bol net jas', 'sok vos zak maan'], last: ['hek zak net vis', 'vos bus voet lam', 'pot net bol bus', 'pan pen kat net', 'bel bal pen huis', 'kan zon kip duif', 'kaas mes kip mok', 'net voet neus muis', 'vaas huis maan ring']},
      where: ['b bus', 'l lam', 'k kam', 't tas', 'ui duif', 'ui huis', 'o sok', 'a jas', 'ng ring', 's roos', 's muis', 'l bol'],
      sort: ['s|s|vos sok vaas muis|kam voet pen pan', 't|t|voet tas kat net|jas neus bol kool', 'l|l|bol bel bal lam|tas jas kam kat', 'p|p|pen pot kip pet|zon maan duif net', 'n|n|zon pan kan neus|kool pet vos boot', 'k|k|hek kip kan kool|pet boot ring zon', 'm|m|maan kam mok mes|huis ring vis bus']
    },
    sv: {
      pos: ['first', 'middle', 'last'],
      words: {'sol': 'beach/sun|s.o.l|s o: l|', 'mus': 'pets/mouse|m.u.s|m u: s|', 'hus': 'miscellaneous/house|h.u.s|h u: s|', 'ris': 'At the Supermarket/rice|r.i.s|r i: s|', 'ben': 'body parts/leg|b.e.n|b e: n|', 'räv': 'animals/fox|r.ä.v|r ä: v|', 'lök': 'vegetables/onion|l.ö.k|l ö: k|', 'val': 'ocean life/whale|v.a.l|v a: l|', 'bil': 'toys/car|b.i.l|b i: l|', 'bok': 'classroom/book|b.o.k|b o: k|', 'båt': 'toys/boat|b.å.t|b å: t|', 'fot': 'body parts/foot|f.o.t|f o: t|', 'gås': 'birds 2/goose|g.å.s|g å: s|', 'kål': 'vegetables/cabbage|k.å.l|k å: l|', 'lås': 'around the house/lock|l.å.s|l å: s|', 'nät': 'beach/net|n.ä.t|n ä: t|', 'ros': 'flowers/rose|r.o.s|r o: s|', 'säl': 'ocean life/seal|s.ä.l|s ä: l|', 'vas': 'around the house/vase|v.a.s|v a: s|', 'katt': 'animals/cat|k.a.tt|k a t|', 'hatt': 'accessories/hat|h.a.tt|h a t|', 'lamm': 'easter/lamb|l.a.mm|l a m|', 'tupp': 'farm animals/rooster|t.u.pp|t u p|', 'mugg': 'kitchen tools/mug|m.u.gg|m u g|', 'boll': 'toys/ball|b.o.ll|b å l|', 'kopp': 'around the house/cup|k.o.pp|k å p|', 'mopp': 'around the house/mop|m.o.pp|m å p|', 'buss': 'vehicles/bus|b.u.ss|b u s|', 'ring': 'accessories/ring|r.i.ng|r i ng|', 'säng': 'around the house/bed|s.ä.ng|s ä ng|', 'lim': 'classroom/glue|l.i.m|l i m|', 'kam': 'around the house/comb|k.a.m|k a m|', 'kub': 'shapes/cube|k.u.b|k u: b|', 'kon': 'shapes/cone|k.o.n|k o: n|'},
      same: {first: ['sol säl fot räv', 'mopp mugg kopp kam', 'lim lamm kam vas', 'räv ris nät boll', 'ris ring hus katt', 'säl säng räv ben', 'kopp kon boll räv', 'lök lås bok mugg', 'katt kål fot ben'], middle: ['hatt katt fot lök', 'mugg tupp mopp kon', 'bil ris båt lås', 'kub mus kål säng', 'nät räv katt tupp', 'kopp mopp kub säng', 'tupp buss kopp lök', 'gås kål hus buss', 'sol kon bil mugg'], last: ['gås ros kål sol', 'kål sol kub nät', 'lim lamm lök kopp', 'boll bil bok lås', 'säl val nät lim', 'ris mus räv fot', 'båt katt gås lim', 'ben kon boll mopp', 'mus hus mugg katt']},
      where: ['k katt', 'm mus', 'b boll', 'l lamm', 'a vas', 'i ris', 'i lim', 'o bok', 'ng ring', 'ng säng', 'm kam', 's lås'],
      sort: ['k|k|lök kopp kam kub|hatt bil lamm båt', 't|t|båt fot tupp nät|hus sol ris gås', 'l|l|lås sol lim bil|nät hus fot ris', 'b|b|kub boll buss båt|ris mopp lamm kam', 's|s|ros säl vas hus|mugg kon kål båt', 'm|m|lim mugg mus mopp|kub lås nät kål', 'a|a|kam hatt katt lamm|kon hus lås mugg']
    },
    da: {
      pos: ['first', 'middle', 'last'],
      words: {'sol': 'beach/sun|s.o.l|s o: l|', 'hus': 'miscellaneous/house|h.u.s|h u: s|', 'mus': 'pets/mouse|m.u.s|m u: s|', 'bus': 'vehicles/bus|b.u.s|b u s|', 'kat': 'animals/cat|k.a.t|k a t|', 'hat': 'accessories/hat|h.a.t|h a t|', 'ris': 'At the Supermarket/rice|r.i.s|r i: s|', 'ben': 'body parts/leg|b.e.n|b e: n|', 'kam': 'around the house/comb|k.a.m|k a m|', 'lam': 'farm animals/lamb|l.a.m|l a m|', 'gås': 'birds 2/goose|g.å.s|g å: s|', 'kål': 'vegetables/cabbage|k.å.l|k å: l|', 'lås': 'around the house/lock|l.å.s|l å: s|', 'net': 'beach/net|n.e.t|n e t|', 'pen': 'around the house/pen|p.e.n|p e n|', 'lim': 'classroom/glue|l.i.m|l i m|', 'sæl': 'ocean life/seal|s.æ.l|s æ: l|', 'sæk': 'christmas/sack|s.æ.k|s e k|', 'kop': 'around the house/cup|k.o.p|k o p|', 'ost': 'At the Supermarket/cheese|o.s.t|o s t|', 'hest': 'animals/horse|h.e.s.t|h e s t|', 'gris': 'animals/pig|g.r.i.s|g r i: s|', 'vest': 'accessories/vest|v.e.s.t|v e s t|', 'telt': 'camping/tent|t.e.l.t|t e l t|', 'salt': 'At the Supermarket/salt|s.a.l.t|s a l t|'},
      same: {first: ['bus ben gris hus', 'sæl sol kål kam', 'kat kam net hus', 'gris gås ris sæl', 'salt sæk net gris', 'lam lim kam hat', 'hat hest salt lim', 'kam kop hat ben', 'lim lås kam bus'], middle: ['sæk net sol mus', 'gås lås ris net', 'lås kål mus sol', 'kat hat ost mus', 'hat lam hus lås', 'net pen ost kam', 'mus hus ris kål', 'lam kam lås gås'], last: ['bus mus ben lam', 'sæl sol sæk ost', 'sol kål sæk gås', 'pen ben sæk lim', 'hus lås hat sæl', 'salt vest sæk lam', 'kam lam kat net', 'lås gris kål vest', 'hat net hus ris']},
      where: ['l lim', 'n net', 'l lås', 'k kop', 'o sol', 'a lam', 'å kål', 'æ sæl', 's bus', 't ost', 's gris', 't kat'],
      sort: ['m|m|lim kam mus lam|kat pen sol ost', 's|s|mus gås sæk ris|kam lam kål kat', 'l|l|lam lim lås kål|gås vest mus kat', 'k|k|sæk kam kål kop|gris bus hus ben', 'a|a|lam hat salt kam|gås gris vest sol', 'e|e|hest pen net telt|gris lam hat kål', 't|t|salt vest hest net|sæk lås ben ris']
    },
    no: {
      pos: ['first', 'middle', 'last'],
      words: {'sol': 'beach/sun|s.o.l|s o: l|', 'bil': 'toys/car|b.i.l|b i: l|', 'hus': 'miscellaneous/house|h.u.s|h u: s|', 'mus': 'pets/mouse|m.u.s|m u: s|', 'lam': 'easter/lamb|l.a.m|l a m|', 'gås': 'birds 2/goose|g.å.s|g å: s|', 'kål': 'vegetables/cabbage|k.å.l|k å: l|', 'lås': 'around the house/lock|l.å.s|l å: s|', 'lim': 'classroom/glue|l.i.m|l i m|', 'løk': 'At the Supermarket/onion|l.ø.k|l ø: k|', 'ris': 'At the Supermarket/rice|r.i.s|r i: s|', 'sel': 'ocean life/seal|s.e.l|s e: l|', 'bok': 'classroom/book|b.o.k|b o: k|', 'båt': 'toys/boat|b.å.t|b å: t|', 'fot': 'body parts/foot|f.o.t|f o: t|', 'rev': 'animals/fox|r.e.v|r e: v|', 'katt': 'animals/cat|k.a.tt|k a t|', 'hatt': 'accessories/hat|h.a.tt|h a t|', 'penn': 'classroom/pen|p.e.nn|p e n|', 'buss': 'vehicles/bus|b.u.ss|b u s|', 'mopp': 'around the house/mop|m.o.pp|m å p|', 'kopp': 'around the house/cup|k.o.pp|k å p|', 'sokk': 'accessories/sock|s.o.kk|s å k|', 'nett': 'beach/net|n.e.tt|n e t|', 'tann': 'body parts/tooth|t.a.nn|t a n|', 'kokk': 'occupations/chef|k.o.kk|k å k|', 'sekk': 'christmas/sack|s.e.kk|s e k|', 'vott': 'accessories/mitten|v.o.tt|v å t|', 'ring': 'accessories/ring|r.i.ng|r i ng|', 'seng': 'around the house/bed|s.e.ng|s e ng|', 'kam': 'around the house/comb|k.a.m|k a m|', 'tog': 'toys/train|t.o.g|t å: g|', 'øre': 'body parts/ear|ø.r.e|ø: r ə|'},
      same: {first: ['bok bil fot øre', 'sol sokk bok hus', 'lam lim hatt båt', 'mopp mus sokk kam', 'lås løk tog sekk', 'båt buss kål kam', 'tog tann båt ris', 'hus hatt gås løk', 'ring ris lim vott'], middle: ['fot sol katt penn', 'lim ring kam sol', 'vott sokk katt ring', 'hatt katt nett sokk', 'kokk mopp kam sekk', 'rev sel ring lam', 'sekk seng kokk tog', 'tann lam tog sel', 'bil ris sel kam'], last: ['ris gås ring mopp', 'lim kam ring sol', 'sokk sekk sol lås', 'mopp kopp vott bil', 'buss mus bil nett', 'penn tann nett tog', 'mus lås mopp penn', 'båt vott buss sol', 'gås hus båt bok']},
      where: ['ø øre', 'f fot', 'k kål', 'h hus', 'e sel', 'o sol', 'e penn', 'a kam', 'ng ring', 'ng seng', 'v rev', 'k løk'],
      sort: ['l|l|sel sol bil lim|mopp rev hatt nett', 'r|r|rev øre ris ring|seng buss sel tog', 'k|k|bok katt kål kopp|sel tog gås hatt', 't|t|fot tann tog båt|buss sel lim mus', 'm|m|lim lam mopp kam|hatt løk sokk fot', 's|s|seng ris hus sel|tann fot nett kam', 'b|b|buss bok bil båt|tann hus penn sokk']
    },
    es: {
      pos: ['first', 'last'],
      words: {'sol': 'beach/sun|s.o.l|s o l|', 'pan': 'At the Supermarket/bread|p.a.n|p a n|', 'pez': 'animals/fish|p.e.z|p e s|', 'sal': 'At the Supermarket/salt|s.a.l|s a l|', 'col': 'vegetables/cabbage|c.o.l|k o l|', 'red': 'beach/net|r.e.d|rr e d|', 'oso': 'camping/bear|o.s.o|o s o|', 'ojo': 'body parts/eye|o.j.o|o j o|', 'ajo': 'At the Supermarket/garlic|a.j.o|a j o|', 'uña': 'body parts/nail|u.ñ.a|u ñ a|', 'gato': 'animals/cat|g.a.t.o|g a t o|', 'pato': 'animals/duck|p.a.t.o|p a t o|', 'casa': 'miscellaneous/house|c.a.s.a|k a s a|', 'luna': 'camping/moon|l.u.n.a|l u n a|', 'mesa': 'around the house/table|m.e.s.a|m e s a|', 'vaca': 'farm animals/cow|v.a.c.a|b a k a|', 'taza': 'around the house/cup|t.a.z.a|t a s a|', 'boca': 'body parts/mouth|b.o.c.a|b o k a|', 'mano': 'body parts/hand|m.a.n.o|m a n o|', 'mono': 'zoo animals/monkey|m.o.n.o|m o n o|', 'mapa': 'camping/map|m.a.p.a|m a p a|', 'nido': 'spring/nest|n.i.d.o|n i d o|', 'pera': 'fruits/pear|p.e.r.a|p e r a|', 'foca': 'ocean life/seal|f.o.c.a|f o k a|', 'nube': 'beach/cloud|n.u.b.e|n u b e|', 'vaso': 'kitchen tools/glass|v.a.s.o|b a s o|', 'lobo': 'animals/wolf|l.o.b.o|l o b o|', 'rana': 'reptiles and Amphibians/frog|r.a.n.a|rr a n a|', 'cama': 'around the house/bed|c.a.m.a|k a m a|', 'dedo': 'body parts/finger|d.e.d.o|d e d o|', 'toro': 'farm animals/bull|t.o.r.o|t o r o|', 'loro': 'birds 2/parrot|l.o.r.o|l o r o|', 'cubo': 'shapes/cube|c.u.b.o|k u b o|', 'cono': 'shapes/cone|c.o.n.o|k o n o|', 'lata': 'At the Supermarket/can|l.a.t.a|l a t a|', 'vela': 'christmas/candle|v.e.l.a|b e l a|', 'remo': 'camping/oar|r.e.m.o|rr e m o|', 'silla': 'around the house/chair|s.i.ll.a|s i y a|', 'pollo': 'farm animals/chicken|p.o.ll.o|p o y o|', 'perro': 'animals/dog|p.e.rr.o|p e rr o|', 'gorro': 'accessories/beanie|g.o.rr.o|g o rr o|', 'leche': 'At the Supermarket/milk|l.e.ch.e|l e ch e|'},
      same: {first: ['remo rana vaso foca', 'cubo col perro ojo', 'ojo oso vaso silla', 'pollo pato remo luna', 'mono mano toro vaca', 'col cama sal gorro', 'pan pera sal cono', 'pera pez boca loro', 'vela boca taza loro'], last: ['cubo ojo casa luna', 'sal col pan foca', 'vaca taza vaso toro', 'lata cama lobo sol', 'vaso perro vela foca', 'toro loro taza pan', 'mapa pera mono ajo', 'mesa vela mano nube', 'pato gato pan nube']},
      where: ['b boca', 'f foca', 'm mapa', 'm mano', 'ch leche', 'e mesa', 'e pera', 'o sol', 'o perro', 'o gato', 'o remo', 'a uña'],
      sort: ['o|o|remo perro ajo col|luna mapa rana pan', 'u|u|uña luna nube cubo|pato nido mano gato', 'p|p|pan mapa pez perro|rana lata oso cama', 'm|m|mesa cama mono mano|pera pollo red nido', 'k|c|vaca col casa cama|sal mono gorro rana', 'a|a|mano silla boca pato|ojo mono pez remo', 't|t|lata toro pato gato|cama foca sol pollo']
    },
    it: {
      pos: ['first', 'last'],
      words: {'cane': 'animals/dog|c.a.n.e|k a n e|', 'casa': 'miscellaneous/house|c.a.s.a|k a s a|', 'cono': 'shapes/cone|c.o.n.o|k o n o|', 'cubo': 'shapes/cube|c.u.b.o|k u b o|', 'foca': 'ocean life/seal|f.o.c.a|f o k a|', 'gufo': 'animals/owl|g.u.f.o|g u f o|', 'luna': 'camping/moon|l.u.n.a|l u n a|', 'lupo': 'animals/wolf|l.u.p.o|l u p o|', 'mano': 'body parts/hand|m.a.n.o|m a n o|', 'mela': 'At the Supermarket/apple|m.e.l.a|m e l a|', 'naso': 'body parts/nose|n.a.s.o|n a s o|', 'nave': 'vehicles/ship|n.a.v.e|n a v e|', 'nido': 'spring/nest|n.i.d.o|n i d o|', 'pala': 'toys/shovel|p.a.l.a|p a l a|', 'pane': 'At the Supermarket/bread|p.a.n.e|p a n e|', 'pera': 'At the Supermarket/pear|p.e.r.a|p e r a|', 'rana': 'camping/frog|r.a.n.a|r a n a|', 'remo': 'camping/oar|r.e.m.o|r e m o|', 'rete': 'beach/net|r.e.t.e|r e t e|', 'riso': 'At the Supermarket/rice|r.i.s.o|r i s o|', 'rosa': 'flowers/rose|r.o.s.a|r o s a|', 'sale': 'At the Supermarket/salt|s.a.l.e|s a l e|', 'sole': 'beach/sun|s.o.l.e|s o l e|', 'topo': 'forest creatures/mouse|t.o.p.o|t o p o|', 'toro': 'farm animals/bull|t.o.r.o|t o r o|', 'tubo': 'around the house/hose|t.u.b.o|t u b o|', 'vaso': 'around the house/vase|v.a.s.o|v a s o|', 'dito': 'body parts/finger|d.i.t.o|d i t o|', 'lama': 'farm animals/llama|l.a.m.a|l a m a|', 'faro': 'beach/lighthouse|f.a.r.o|f a r o|', 'fico': 'fruits/fig|f.i.c.o|f i k o|', 'pesce': 'animals/fish|p.e.sc.e|p e sh e|', 'ragno': 'forest creatures/spider|r.a.gn.o|r a gn o|', 'pigna': 'camping/pinecone|p.i.gn.a|p i gn a|'},
      same: {first: ['rana rosa lama fico', 'ragno remo tubo pera', 'lama lupo rosa rete', 'faro foca toro rete', 'cubo cane riso sale', 'riso rete vaso pera', 'pera pane lama gufo', 'pigna pala rosa nave', 'casa cono pera vaso'], last: ['ragno naso rete sale', 'faro gufo foca pane', 'pesce rete pigna remo', 'riso vaso rosa luna', 'pigna mela pane nave', 'cubo toro cane mela', 'mela foca mano nido', 'cane sale cono vaso', 'cono remo casa rana']},
      where: ['n nido', 't topo', 's sale', 't toro', 'gn ragno', 'sc pesce', 'n cane', 'o sole', 'o remo', 'o faro', 'a luna', 'o mano'],
      sort: ['s|s|naso riso sole casa|dito gufo luna pane', 'e|e|cane remo pane sale|faro casa lupo pigna', 'n|n|cane naso mano pane|remo faro riso vaso', 't|t|toro dito rete tubo|pigna nido faro rosa', 'a|a|foca mela pane mano|topo remo pesce lupo', 'r|r|pera faro ragno rosa|gufo fico dito nave', 'm|m|mano mela remo lama|naso gufo pesce sale']
    },
    pt: {
      pos: ['first', 'last'],
      words: {'lua': 'camping/moon|l.u.a|l u a|', 'pia': 'around the house/sink|p.i.a|p i a|', 'gato': 'animals/cat|g.a.t.o|g a t u|', 'pato': 'animals/duck|p.a.t.o|p a t u|', 'casa': 'miscellaneous/house|c.a.s.a|k a z a|', 'bola': 'toys/ball|b.o.l.a|b ɔ l a|', 'bolo': '4th of July/cake|b.o.l.o|b o l u|', 'boca': 'body parts/mouth|b.o.c.a|b o k a|', 'vaca': 'farm animals/cow|v.a.c.a|v a k a|', 'faca': 'around the house/knife|f.a.c.a|f a k a|', 'foca': 'ocean life/seal|f.o.c.a|f ɔ k a|', 'mapa': 'camping/map|m.a.p.a|m a p a|', 'capa': 'accessories/cape|c.a.p.a|k a p a|', 'lata': 'At the Supermarket/can|l.a.t.a|l a t a|', 'pera': 'At the Supermarket/pear|p.e.r.a|p e r a|', 'vela': 'christmas/candle|v.e.l.a|v ɛ l a|', 'cama': 'around the house/bed|c.a.m.a|k a m a|', 'dedo': 'body parts/finger|d.e.d.o|d e d u|', 'figo': 'fruits/fig|f.i.g.o|f i g u|', 'galo': 'farm animals/rooster|g.a.l.o|g a l u|', 'lobo': 'animals/wolf|l.o.b.o|l o b u|', 'luva': 'accessories/glove|l.u.v.a|l u v a|', 'saco': 'christmas/sack|s.a.c.o|s a k u|', 'sino': 'christmas/bell|s.i.n.o|s i n u|', 'suco': 'At the Supermarket/juice|s.u.c.o|s u k u|', 'copo': 'kitchen tools/glass|c.o.p.o|k ɔ p u|', 'mesa': 'around the house/table|m.e.s.a|m e z a|', 'pipa': 'toys/kite|p.i.p.a|p i p a|', 'cubo': 'shapes/cube|c.u.b.o|k u b u|', 'cola': 'classroom/glue|c.o.l.a|k ɔ l a|', 'ninho': 'spring/nest|n.i.nh.o|n i nh u|', 'olho': 'body parts/eye|o.lh.o|o lh u|', 'folha': 'miscellaneous/leaf|f.o.lh.a|f o lh a|', 'chave': 'around the house/key|ch.a.v.e|ch a v i|'},
      same: {first: ['copo capa ninho bola', 'cola cama pia pato', 'pera pipa foca saco', 'cubo casa suco faca', 'pato pia gato capa', 'sino suco bolo pera', 'galo gato cubo bolo', 'lata lobo folha vaca', 'vela vaca boca dedo'], last: ['bolo sino boca capa', 'faca pia figo olho', 'casa mesa cubo lobo', 'pia pipa pato cubo', 'pipa folha pato sino', 'folha pera figo lobo', 'lua capa lobo ninho', 'lata vela lobo chave', 'pato saco pera luva']},
      where: ['ch chave', 'f faca', 'b boca', 'l luva', 'lh olho', 'lh folha', 'a saco', 'n sino', 'a pia', 'a lua', 'a pera', 'a pipa'],
      sort: ['v|v|vaca chave vela luva|lobo foca boca capa', 'b|b|boca cubo bolo bola|saco chave suco galo', 'l|l|lata vela lua cola|cubo gato chave suco', 'o|o|olho boca folha bolo|lata pia cama lua', 'a|a|pato folha cola mesa|suco lobo olho bolo', 'k|c|foca cubo boca vaca|olho dedo pera mapa', 'p|p|mapa pato copo capa|ninho chave faca sino']
    },
    fr: {
      pos: ['first', 'middle', 'last'],
      words: {'bol': 'around the house/bowl|b.o.l|b ɔ l|', 'sac': 'At the Supermarket/bag|s.a.c|s a k|', 'bus': 'vehicles/bus|b.u.s|b u s|', 'coq': 'farm animals/rooster|c.o.q|k ɔ k|', 'lune': 'space/moon|l.u.n|l u n|e', 'poule': 'birds 2/hen|p.ou.l|p ou l|e', 'pull': 'clothing/sweater|p.u.ll|p u l|', 'robe': 'clothing/dress|r.o.b|r ɔ b|e', 'vase': 'around the house/vase|v.a.s|v a z|e', 'rose': 'flowers/rose|r.o.s|r o z|e', 'jupe': 'clothing/skirt|j.u.p|j u p|e', 'tasse': 'around the house/cup|t.a.ss|t a s|e', 'four': 'around the house/oven|f.ou.r|f ou r|', 'pomme': 'At the Supermarket/apple|p.o.mm|p ɔ m|e', 'cube': 'shapes/cube|c.u.b|k u b|e', 'cape': 'accessories/cape|c.a.p|k a p|e', 'rame': 'camping/oar|r.a.m|r a m|e', 'râpe': 'kitchen tools/grater|r.â.p|r a p|e', 'bague': 'accessories/ring|b.a.g|b a g|ue', 'tête': 'body parts/head|t.ê.t|t ê t|e', 'luge': 'winter/sled|l.u.g|l u j|e', 'sel': 'At the Supermarket/salt|s.e.l|s ê l|', 'ours': 'camping/bear|ou.r.s|ou r s|', 'mûre': 'fruits/blackberry|m.û.r|m u r|e', 'bouche': 'body parts/mouth|b.ou.ch|b ou ch|e', 'vache': 'farm animals/cow|v.a.ch|v a ch|e'},
      same: {first: ['bouche bus vache rose', 'vase vache bague pull', 'poule pomme bol jupe', 'lune luge pull sac', 'bague bol rame sel', 'coq cube bol râpe', 'tasse tête râpe poule', 'cube cape lune rame', 'pomme pull robe rose'], middle: ['bus mûre ours vache', 'robe pomme râpe jupe', 'bouche four bague rame', 'jupe lune cape rose', 'tasse cape ours sel', 'tête sel tasse coq', 'pull cube sel sac', 'pomme bol rame bague', 'vache sac bouche bol'], last: ['vache bouche cape luge', 'sac coq râpe mûre', 'tasse ours tête cube', 'râpe jupe rose bouche', 'sel poule sac robe', 'four mûre poule vache', 'rose vase robe pull', 'rame pomme cape bouche', 'jupe cape luge bouche']},
      where: ['ou ours', 'r rose', 'l lune', 'p poule', 'ou bouche', 'ou four', 'u cube', 'a vache', 'm rame', 'l bol', 'g bague', 's bus'],
      sort: ['ou|ou|ours bouche four poule|robe vase sel pull', 'p|p|jupe poule râpe pull|four vase luge vache', 's|s|bus ours sel sac|bague four tête rame', 'r|r|mûre rame ours four|vase pomme sac tête', 'l|l|lune sel luge poule|mûre pomme râpe rose', 'b|b|bol robe bague bouche|pomme râpe poule vache', 'u|u|cube pull jupe bus|bol vase pomme sac']
    },
    fi: {
      pos: ['first', 'last'],
      words: {'kala': 'animals/fish|k.a.l.a|k a l a|', 'talo': 'miscellaneous/house|t.a.l.o|t a l o|', 'juna': 'toys/train|j.u.n.a|j u n a|', 'muki': 'kitchen tools/mug|m.u.k.i|m u k i|', 'kana': 'farm animals/chicken|k.a.n.a|k a n a|', 'kani': 'animals/rabbit|k.a.n.i|k a n i|', 'käsi': 'body parts/hand|k.ä.s.i|k ä s i|', 'kori': 'At the Supermarket/basket|k.o.r.i|k o r i|', 'kynä': 'around the house/pen|k.y.n.ä|k y n ä|', 'lasi': 'kitchen tools/glass|l.a.s.i|l a s i|', 'mato': 'spring/worm|m.a.t.o|m a t o|', 'mehu': 'At the Supermarket/juice|m.e.h.u|m e h u|', 'nenä': 'body parts/nose|n.e.n.ä|n e n ä|', 'pesä': 'spring/nest|p.e.s.ä|p e s ä|', 'rapu': 'beach/crab|r.a.p.u|r a p u|', 'reki': 'christmas/sleigh|r.e.k.i|r e k i|', 'sika': 'animals/pig|s.i.k.a|s i k a|', 'susi': 'animals/wolf|s.u.s.i|s u s i|', 'tipu': 'farm animals/chick|t.i.p.u|t i p u|', 'hame': 'clothing/skirt|h.a.m.e|h a m e|', 'hana': 'around the house/faucet|h.a.n.a|h a n a|', 'joki': 'camping/river|j.o.k.i|j o k i|', 'lava': 'music/stage|l.a.v.a|l a v a|', 'pipo': 'accessories/beanie|p.i.p.o|p i p o|'},
      same: {first: ['tipu talo mehu joki', 'kana käsi sika mehu', 'kani kynä lasi pesä', 'käsi kala reki sika', 'pesä pipo nenä joki', 'kala kori hana lasi', 'muki mato kori rapu', 'susi sika kani lava', 'lasi lava kani rapu'], last: ['joki kori juna hana', 'mehu tipu muki susi', 'kana sika kani mato', 'muki lasi mato nenä', 'kynä pesä käsi lasi', 'lasi käsi lava hana', 'reki kani rapu pesä', 'kala hana käsi mehu', 'lava juna lasi talo']},
      where: ['k kori', 'k kynä', 'r rapu', 'k kala', 'e pesä', 'a lasi', 'k muki', 'n kani', 'i käsi', 'a sika', 'u mehu', 'i reki'],
      sort: ['a|a|mato rapu lasi juna|mehu muki pesä susi', 'o|o|talo joki pipo mato|lava tipu juna muki', 'k|k|kori joki käsi kana|tipu nenä hame hana', 'l|l|kala talo lasi lava|kana reki mehu muki', 'm|m|muki mato mehu hame|juna talo sika reki', 'i|i|susi pipo sika käsi|mehu kana talo rapu', 'u|u|tipu rapu susi juna|lava kala mato käsi']
    }
  };

  var LOCALES = Object.keys(DATA), TASKS = ['same', 'where', 'sort'], POS_ALL = ['first', 'middle', 'last'];
  /* eight sound colours, colour-blind-safe; a colour never means right or wrong */
  var COLOURS = ['#0072B2', '#D55E00', '#009E73', '#CC79A7', '#E69F00', '#56B4E9', '#8C564B', '#6A3D9A'];
  function locale(l) { return DATA[l] ? l : 'en'; }
  function task(v) { return TASKS.indexOf(v) >= 0 ? v : 'same'; }
  function positions(loc) { return DATA[locale(loc)].pos.slice(); }
  function pos(loc, v) { return v === 'mixed' || positions(loc).indexOf(v) < 0 ? 'mixed' : v; }

  var _wc = {};
  function word(loc, w) {
    loc = locale(loc);
    var k = loc + '/' + w; if (_wc[k]) return _wc[k];
    var s = DATA[loc].words[w]; if (!s) throw new Error('lid-boxes: no word ' + loc + ' ' + w);
    var p = s.split('|');
    return (_wc[k] = { word: w, pic: p[0], boxes: p[1].split('.'), keys: p[2].split(' '), tail: p[3] || '' });
  }
  /* the place of box i in a word of n boxes */
  function role(n, i) { return i === 0 ? 'first' : i === n - 1 ? 'last' : 'middle'; }
  /* the box a position asks about (middle only exists in a three-box word) */
  function asked(W, P) { var n = W.keys.length; return P === 'first' ? 0 : P === 'last' ? n - 1 : (n === 3 ? 1 : -1); }

  /* THE LID TEST: first meets first, last meets last, and the middle boxes meet only when both words have the same number of boxes */
  function lidTest(A, B) {
    var nA = A.keys.length, nB = B.keys.length, pairs = [];
    pairs.push({ i: 0, j: 0, role: 'first' });
    if (nA === nB) for (var m = 1; m < nA - 1; m++) pairs.push({ i: m, j: m, role: 'middle' });
    pairs.push({ i: nA - 1, j: nB - 1, role: 'last' });
    pairs.forEach(function (p) { p.same = A.keys[p.i] === B.keys[p.j]; });
    return pairs;
  }

  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }

  function sameRounds(loc, P) {
    return DATA[loc].same[P].map(function (t) {
      var ws = t.split(' ').map(function (w) { return word(loc, w); });
      return { id: 'same-' + P + '-' + ws[0].word.toLowerCase(), task: 'same', loc: loc, pos: P, target: ws[0],
        cands: ws.slice(1).map(function (W, k) { return { w: W, role: ['answer', 'd1', 'd2'][k] }; }) };
    });
  }
  /* mixed: rounds of each position the locale offers, interleaved (nine in all); every target only once, so no reshuffle can put it twice in a row */
  function mixedRounds(loc) {
    var ps = positions(loc), lists = ps.map(function (P) { return sameRounds(loc, P); }), out = [], seen = {};
    for (var i = 0; i < 12 && out.length < 9; i++) ps.forEach(function (P, k) { var r = lists[k][i]; if (r && out.length < 9 && !seen[r.target.word]) { seen[r.target.word] = 1; out.push(r); } });
    return out.map(function (r) { var c = Object.assign({}, r); c.id = 'mixed-' + r.pos + '-' + r.target.word.toLowerCase(); return c; });
  }
  function rounds(loc, tk, P) {
    loc = locale(loc); tk = task(tk);
    if (tk === 'same') { P = pos(loc, P); return P === 'mixed' ? mixedRounds(loc) : sameRounds(loc, P); }
    if (tk === 'where') return DATA[loc].where.map(function (t) {
      var sp = t.split(' '), W = word(loc, sp[1]), a = W.boxes.indexOf(sp[0]);
      return { id: 'where-' + W.word.toLowerCase(), task: 'where', loc: loc, card: sp[0], target: W, answer: a, pos: role(W.boxes.length, a) };
    });
    return DATA[loc].sort.map(function (t) {
      var sp = t.split('|');
      var items = sp[2].split(' ').map(function (w) { return { w: word(loc, w), yes: true }; }).concat(sp[3].split(' ').map(function (w) { return { w: word(loc, w), yes: false }; }));
      return { id: 'sort-' + sp[1], task: 'sort', loc: loc, key: sp[0], card: sp[1], items: items };
    });
  }

  /* one pass of tray layouts: the answer in each slot a third of the time (±1); the distractor that shares a sound beside it in half the rounds */
  function deal(n, rnd) {
    var slots = []; for (var i = 0; i < n; i++) slots.push(i % 3);
    shuffle(slots, rnd);
    var mids = slots.filter(function (s) { return s === 1; }).length, need = Math.max(0, Math.round(n / 2) - mids);
    var edges = []; slots.forEach(function (s, i) { if (s !== 1) edges.push(i); });
    shuffle(edges, rnd);
    return slots.map(function (t, i) {
      var adj = t === 1 || edges.indexOf(i) < need, other = [0, 1, 2].filter(function (s) { return s !== t; });
      var d1 = t === 1 ? other[Math.floor(rnd() * 2)] : (adj ? 1 : (t === 0 ? 2 : 0));
      var lay = [null, null, null]; lay[t] = 0; lay[d1] = 1; lay[other.filter(function (s) { return s !== d1; })[0]] = 2;
      return lay;
    });
  }

  function newState(r, opts) {
    opts = opts || {};
    var st = { r: r, misses: 0, help: 0, show: false, last: null, done: false, test: -1, chosen: -1, bins: [], picked: -1 };
    if (r.task === 'same') st.layout = opts.layout || [0, 1, 2];
    if (r.task === 'sort') { st.order = opts.order || r.items.map(function (_, i) { return i; }); st.bins = r.items.map(function () { return null; }); }
    return st;
  }
  function moved(st) { st.show = false; st.last = null; }
  function candAt(st, slot) { return st.r.cands[st.layout[slot]]; }
  /* Task 1: a picture goes onto the boxes (another one swaps it back to the tray) */
  function drop(st, slot) { if (st.done || st.r.task !== 'same' || slot < 0 || slot > 2 || st.test === slot) return false; st.test = slot; moved(st); return true; }
  function lift(st) { if (st.done || st.test < 0) return false; st.test = -1; moved(st); return true; }
  /* Task 2: raise one lid */
  function choose(st, i) { if (st.done || st.r.task !== 'where' || i < 0 || i >= st.r.target.boxes.length || st.chosen === i) return false; st.chosen = i; moved(st); return true; }
  /* Task 3: a picture into a basket ('yes' / 'no' / null = back to the tray) */
  function place(st, item, bin) { if (st.done || st.r.task !== 'sort' || item < 0 || item >= st.bins.length || st.bins[item] === bin) return false; st.bins[item] = bin; moved(st); return true; }

  /* the box of a word that holds a sound key (or -1) */
  function boxOf(W, key) { return W.keys.indexOf(key); }

  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (r.task === 'same') {
      if (st.test < 0) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
      var c = candAt(st, st.test), lid = lidTest(r.target, c.w), ai = asked(r.target, r.pos);
      var hit = lid.filter(function (p) { return p.i === ai && p.same; }).length > 0;
      if (hit) { st.done = true; st.show = false; st.last = { result: 'right', lid: lid }; return { ok: true, lid: lid }; }
      var other = lid.filter(function (p) { return p.same; });
      st.misses++; st.help = Math.min(2, st.misses); st.show = true;
      st.last = { result: other.length ? 'other' : 'none', lid: lid, slot: st.test, roles: other.map(function (p) { return p.role; }) };
      st.test = -1;
      return { ok: false, kase: st.last.result, lid: lid };
    }
    if (r.task === 'where') {
      if (st.chosen < 0) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
      if (st.chosen === r.answer) { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true }; }
      st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { result: 'wrong', chosen: st.chosen };
      return { ok: false, kase: 'wrong' };
    }
    if (st.bins.some(function (b) { return b === null; })) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    var wrong = [];
    r.items.forEach(function (it, i) { if ((st.bins[i] === 'yes') !== it.yes) wrong.push(i); });
    if (!wrong.length) { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true }; }
    st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { result: 'sort', wrong: wrong };
    return { ok: false, kase: 'sort', wrong: wrong };
  }
  /* miss 2 brings the help; any move takes it away again */
  function helpOn(st) { return !st.done && st.show && st.help >= 2; }
  function cap(p) { return p.charAt(0).toUpperCase() + p.slice(1); }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var R = st.last.result, r = st.r;
    if (R === 'empty') return r.task === 'same' ? 'hintDrop' : r.task === 'where' ? 'hintTap' : 'hintBaskets';
    if (r.task === 'same') { if (st.help >= 2) return 'hintListen' + cap(r.pos); return R === 'none' ? 'hintNone' : 'hintOther' + cap(r.pos); }
    if (r.task === 'where') return st.help >= 2 ? 'hintWhereHelp' : 'hintWhere';
    return st.help >= 2 ? 'hintSortHelp' : 'hintSort';
  }

  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }
  /* round-local sound colours: every key of the round's words gets its own colour */
  function colours(words) {
    var map = {}, n = 0;
    words.forEach(function (W) { W.keys.forEach(function (k) { if (!(k in map)) map[k] = COLOURS[n++ % COLOURS.length]; }); });
    return map;
  }

  function layout(W) {
    var wide = W >= 560, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.target = wide ? 140 : (W < 340 ? 66 : 72);
    L.koala = wide ? 96 : 64;
    L.box = wide ? 112 : (W < 340 ? 80 : 88);
    L.tbox = wide ? 96 : (W < 340 ? 68 : 76);
    L.cand = wide ? 96 : (W < 340 ? 66 : 72);
    L.drop = wide ? 96 : 64;
    L.sortPic = wide ? 96 : 64;
    return L;
  }

  return {
    DATA: DATA, LOCALES: LOCALES, TASKS: TASKS, POS_ALL: POS_ALL, COLOURS: COLOURS,
    locale: locale, task: task, positions: positions, pos: pos, word: word, role: role, asked: asked, lidTest: lidTest,
    seeded: seeded, rounds: rounds, deal: deal, newState: newState, candAt: candAt, drop: drop, lift: lift, choose: choose, place: place,
    boxOf: boxOf, check: check, helpOn: helpOn, hint: hint, order: order, colours: colours, layout: layout
  };
}));
