/* =====================================================================
   story-film-core.js — the model of ACTIVITY #82, THE STORY FILM
   ("Vet's Diagnosis Window", 1.OA.A.1; Groups faces G3 OA). Pure, no DOM.
   Design sheet: docs/activities-rebuild/designs/082-vet-diagnosis.md
   ---------------------------------------------------------------------
   Each round is one word problem. The child puts the story's two numbers
   on the film's frames (a decoy tile stays out), marks the frame we don't
   know, and dials it. Diagnose plays the CHILD's model: a tile whose
   number is not its frame's sentence stops the film there; a wrong dial
   makes the landing frame spill or leave empty sockets. The answer is
   never stored — it is solved from the story's numbers by the diagram.
   Every story is whole sentences per locale, split into clauses by role
   (the clause of a known role carries exactly that role's numeral).
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.StoryFilmCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['w20', 'w10', 'grp'];
  var ROLES = { change: ['start', 'change', 'result'], bracket: ['part1', 'part2', 'whole'], compare: ['big', 'small', 'gap'], groups: ['groups', 'each', 'total'] };
  var LAND = { change: 'result', bracket: 'whole', compare: 'gap', groups: 'total' };   /* the frame the film lands in */
  var PATIENTS = ['forest-creatures/hedgehog', 'forest-creatures/squirrel', 'forest-creatures/rabbit', 'forest-creatures/fox', 'forest-creatures/raccoon', 'forest-creatures/mouse', 'forest-creatures/badger', 'forest-creatures/beaver', 'pets/hamster'];
  var BANDAGE = 'hospital/bandage';
  /* kinds: add-result add-change add-start take-result take-change take-start put-total put-part cmp-diff cmp-big cmp-small grp-total grp-share grp-make */
  function R(id, k, v, u, decoy, pics, cl) { return { id: id, k: k, d: k.slice(0, 3) === 'cmp' ? 'compare' : k.slice(0, 3) === 'grp' ? 'groups' : k.slice(0, 3) === 'put' ? 'bracket' : 'change', op: k.slice(0, 4) === 'take' ? 'sub' : 'add', v: v, u: u, decoy: decoy, pics: pics, cl: cl }; }
  var CH = ['start', 'change', 'result'], CH2 = ['start', 'change'];
  var ROUNDS = {
    w20: [
      R('cookies', 'take-result', { start: 9, change: 3 }, 'result', 4, ['bakery/cookie'], CH2),
      R('acorns', 'add-change', { start: 5, result: 12 }, 'change', 14, ['miscellaneous/acorn'], CH),
      R('ladybugs', 'add-start', { change: 6, result: 14 }, 'start', 9, ['insects-and-bugs/ladybug'], CH),
      R('shells', 'add-start', { change: 4, result: 13 }, 'start', 17, ['beach/seashell'], CH),
      R('geese', 'take-change', { start: 12, result: 8 }, 'change', 3, ['things-that-fly/goose'], CH),
      R('raspberries', 'take-change', { start: 15, result: 9 }, 'change', 11, ['fruits/raspberry'], CH),
      R('bunnies', 'take-start', { change: 4, result: 6 }, 'start', 2, ['easter/bunny'], CH),
      R('apples', 'put-part', { whole: 13, part1: 5 }, 'part2', 18, ['fruits/apple'], ['whole', 'part1', 'part2']),
      R('socks', 'put-part', { whole: 11, part1: 4 }, 'part2', 6, ['accessories/sock'], ['whole', 'part1', 'part2']),
      R('catsdogs', 'cmp-diff', { big: 14, small: 5 }, 'gap', 19, ['pets/cat', 'pets/dog'], ['big', 'small']),
      R('morecats', 'cmp-big', { small: 5, gap: 7 }, 'big', 2, ['pets/cat', 'pets/dog'], ['small', 'gap']),
      R('bugsfrogs', 'cmp-diff', { big: 11, small: 6 }, 'gap', 1, ['insects-and-bugs/ladybug', 'forest-creatures/frog'], ['big', 'small']),
      R('fewerdogs', 'cmp-small', { big: 12, gap: 7 }, 'small', 19, ['pets/cat', 'pets/dog'], ['big', 'gap']),
      R('bees', 'cmp-small', { big: 11, gap: 6 }, 'small', 17, ['insects-and-bugs/butterfly', 'insects-and-bugs/bee'], ['big', 'gap']),
      R('frogs', 'add-result', { start: 8, change: 5 }, 'result', 3, ['forest-creatures/frog'], CH2),
      R('treats', 'put-total', { part1: 9, part2: 8 }, 'whole', 1, ['bakery/cupcake', 'bakery/cookie'], ['part1', 'part2'])
    ],
    w10: [
      R('shells', 'add-result', { start: 4, change: 3 }, 'result', 1, ['beach/seashell'], CH2),
      R('acorns', 'add-change', { start: 2, result: 6 }, 'change', 8, ['miscellaneous/acorn'], CH),
      R('ladybugs', 'add-start', { change: 3, result: 8 }, 'start', 2, ['insects-and-bugs/ladybug'], CH),
      R('cookies', 'take-result', { start: 8, change: 2 }, 'result', 10, ['bakery/cookie'], CH2),
      R('geese', 'take-change', { start: 9, result: 6 }, 'change', 7, ['things-that-fly/goose'], CH),
      R('bunnies', 'take-start', { change: 3, result: 5 }, 'start', 2, ['easter/bunny'], CH),
      R('fruit', 'put-part', { whole: 9, part1: 4 }, 'part2', 1, ['fruits/apple', 'at-the-supermarket/pear'], ['whole', 'part1', 'part2']),
      R('socks', 'put-part', { whole: 10, part1: 4 }, 'part2', 7, ['accessories/sock'], ['whole', 'part1', 'part2']),
      R('catsdogs', 'cmp-diff', { big: 7, small: 3 }, 'gap', 10, ['pets/cat', 'pets/dog'], ['big', 'small']),
      R('fewerdogs', 'cmp-small', { big: 7, gap: 5 }, 'small', 12, ['pets/cat', 'pets/dog'], ['big', 'gap'])
    ],
    grp: [
      R('apples', 'grp-total', { groups: 4, each: 5 }, 'total', 9, ['fruits/apple'], ['groups', 'each']),
      R('strawberries', 'grp-total', { groups: 6, each: 3 }, 'total', 9, ['fruits/strawberry'], ['groups', 'each']),
      R('muffins', 'grp-total', { groups: 5, each: 2 }, 'total', 7, ['bakery/muffin'], ['groups', 'each']),
      R('cookies', 'grp-share', { total: 12, groups: 3 }, 'each', 15, ['bakery/cookie'], ['total', 'groups']),
      R('acorns', 'grp-share', { total: 20, groups: 4 }, 'each', 24, ['miscellaneous/acorn', 'forest-creatures/squirrel'], ['groups', 'total']),
      R('shells', 'grp-share', { total: 18, groups: 6 }, 'each', 24, ['beach/seashell'], ['total', 'groups']),
      R('bowls', 'grp-make', { total: 15, each: 5 }, 'groups', 20, ['fruits/strawberry'], ['total', 'each']),
      R('pairs', 'grp-make', { total: 16, each: 2 }, 'groups', 18, ['accessories/sock'], ['total', 'each']),
      R('plates', 'grp-make', { total: 24, each: 6 }, 'groups', 30, ['bakery/muffin'], ['total', 'each'])
    ]
  };

  /* ---- the stories: [clauses (in the order of the round's cl), question, answer sentence with {n}] ---- */
  var TX = {
    en: {
      w20: [
        [['9 cookies are on a plate.', '3 are eaten.'], 'How many are there now?', 'Now there are {n} cookies!'],
        [['Pip has 5 acorns.', 'Pip finds some more.', 'Now Pip has 12.'], 'How many did Pip find?', 'Pip found {n} acorns!'],
        [['Some ladybugs sit on a leaf.', '6 more land.', 'Now there are 14.'], 'How many were there before?', 'There were {n} ladybugs before!'],
        [['Bo has some shells.', 'Bo gets 4 more.', 'Now Bo has 13.'], 'How many did Bo have before?', 'Bo had {n} shells before!'],
        [['12 geese are on the pond.', 'Some fly away.', 'Now there are 8.'], 'How many flew away?', '{n} geese flew away!'],
        [['15 raspberries are on a bush.', 'A bird eats some.', 'Now there are 9.'], 'How many were eaten?', 'The bird ate {n} raspberries!'],
        [['Some bunnies are hopping.', '4 hop away.', 'Now there are 6.'], 'How many were there before?', 'There were {n} bunnies before!'],
        [['There are 13 apples.', '5 are on the table', 'and the rest are in a bag.'], 'How many are in the bag?', '{n} apples are in the bag!'],
        [['Bo has 11 socks.', '4 are in the drawer', 'and the rest are in the basket.'], 'How many are in the basket?', '{n} socks are in the basket!'],
        [['There are 14 cats', 'and 5 dogs.'], 'How many more cats than dogs are there?', 'There are {n} more cats than dogs!'],
        [['There are 5 dogs.', 'There are 7 more cats than dogs.'], 'How many cats are there?', 'There are {n} cats!'],
        [['There are 11 ladybugs', 'and 6 frogs.'], 'How many more ladybugs than frogs are there?', 'There are {n} more ladybugs than frogs!'],
        [['There are 12 cats.', 'There are 7 more cats than dogs.'], 'How many dogs are there?', 'There are {n} dogs!'],
        [['There are 11 butterflies.', 'There are 6 fewer bees than butterflies.'], 'How many bees are there?', 'There are {n} bees!'],
        [['8 frogs sit on a log.', '5 more jump on.'], 'How many frogs are on the log now?', '{n} frogs are on the log now!'],
        [['There are 9 cupcakes', 'and 8 cookies on a tray.'], 'How many treats are there?', 'There are {n} treats!']
      ],
      w10: [
        [['Bo has 4 shells.', 'Bo gets 3 more.'], 'How many shells does Bo have now?', 'Bo has {n} shells now!'],
        [['Pip has 2 acorns.', 'Pip finds some more.', 'Now Pip has 6.'], 'How many did Pip find?', 'Pip found {n} acorns!'],
        [['Some ladybugs sit on a leaf.', '3 more land.', 'Now there are 8.'], 'How many were there before?', 'There were {n} ladybugs before!'],
        [['8 cookies are on a plate.', '2 are eaten.'], 'How many are there now?', 'Now there are {n} cookies!'],
        [['9 geese are on the pond.', 'Some fly away.', 'Now there are 6.'], 'How many flew away?', '{n} geese flew away!'],
        [['Some bunnies are hopping.', '3 hop away.', 'Now there are 5.'], 'How many were there before?', 'There were {n} bunnies before!'],
        [['There are 9 pieces of fruit.', '4 are apples', 'and the rest are pears.'], 'How many pears are there?', 'There are {n} pears!'],
        [['Bo has 10 socks.', '4 are in the drawer', 'and the rest are in the basket.'], 'How many are in the basket?', '{n} socks are in the basket!'],
        [['There are 7 cats', 'and 3 dogs.'], 'How many more cats than dogs are there?', 'There are {n} more cats than dogs!'],
        [['There are 7 cats.', 'There are 5 more cats than dogs.'], 'How many dogs are there?', 'There are {n} dogs!']
      ],
      grp: [
        [['There are 4 baskets', 'with 5 apples in each basket.'], 'How many apples are there?', 'There are {n} apples!'],
        [['There are 6 bowls', 'with 3 strawberries in each bowl.'], 'How many strawberries are there?', 'There are {n} strawberries!'],
        [['There are 5 plates', 'with 2 muffins on each plate.'], 'How many muffins are there?', 'There are {n} muffins!'],
        [['12 cookies are shared equally', 'onto 3 plates.'], 'How many cookies are on each plate?', '{n} cookies are on each plate!'],
        [['4 squirrels', 'share 20 acorns equally.'], 'How many acorns does each squirrel get?', 'Each squirrel gets {n} acorns!'],
        [['18 shells are shared equally', 'into 6 buckets.'], 'How many shells are in each bucket?', '{n} shells are in each bucket!'],
        [['There are 15 strawberries.', '5 go in each bowl.'], 'How many bowls are needed?', '{n} bowls are needed!'],
        [['There are 16 socks.', '2 socks make a pair.'], 'How many pairs are there?', 'There are {n} pairs!'],
        [['There are 24 muffins.', '6 go on each plate.'], 'How many plates are needed?', '{n} plates are needed!']
      ]
    },
    de: {
      w20: [
        [['9 Kekse liegen auf einem Teller.', '3 werden gegessen.'], 'Wie viele sind es jetzt?', 'Jetzt sind es {n} Kekse!'],
        [['Pip hat 5 Eicheln.', 'Pip findet noch welche dazu.', 'Jetzt hat Pip 12.'], 'Wie viele hat Pip gefunden?', 'Pip hat {n} Eicheln gefunden!'],
        [['Ein paar Marienkäfer sitzen auf einem Blatt.', '6 landen noch dazu.', 'Jetzt sind es 14.'], 'Wie viele waren es vorher?', 'Vorher waren es {n} Marienkäfer!'],
        [['Bo hat ein paar Muscheln.', 'Bo bekommt 4 dazu.', 'Jetzt hat Bo 13.'], 'Wie viele hatte Bo vorher?', 'Bo hatte vorher {n} Muscheln!'],
        [['12 Gänse sind auf dem Teich.', 'Ein paar fliegen weg.', 'Jetzt sind es 8.'], 'Wie viele sind weggeflogen?', '{n} Gänse sind weggeflogen!'],
        [['15 Himbeeren hängen am Strauch.', 'Ein Vogel frisst ein paar.', 'Jetzt sind es 9.'], 'Wie viele hat der Vogel gefressen?', 'Der Vogel hat {n} Himbeeren gefressen!'],
        [['Ein paar Hasen hoppeln herum.', '4 hoppeln weg.', 'Jetzt sind es 6.'], 'Wie viele waren es vorher?', 'Vorher waren es {n} Hasen!'],
        [['Es gibt 13 Äpfel.', '5 liegen auf dem Tisch,', 'die anderen sind in einer Tüte.'], 'Wie viele sind in der Tüte?', '{n} Äpfel sind in der Tüte!'],
        [['Bo hat 11 Socken.', '4 sind in der Schublade,', 'die anderen sind im Korb.'], 'Wie viele sind im Korb?', '{n} Socken sind im Korb!'],
        [['Es gibt 14 Katzen', 'und 5 Hunde.'], 'Wie viele Katzen sind es mehr als Hunde?', 'Es sind {n} Katzen mehr als Hunde!'],
        [['Es gibt 5 Hunde.', 'Es gibt 7 Katzen mehr als Hunde.'], 'Wie viele Katzen gibt es?', 'Es gibt {n} Katzen!'],
        [['Es gibt 11 Marienkäfer', 'und 6 Frösche.'], 'Wie viele Marienkäfer sind es mehr als Frösche?', 'Es sind {n} Marienkäfer mehr als Frösche!'],
        [['Es gibt 12 Katzen.', 'Es gibt 7 Katzen mehr als Hunde.'], 'Wie viele Hunde gibt es?', 'Es gibt {n} Hunde!'],
        [['Es gibt 11 Schmetterlinge.', 'Es gibt 6 Bienen weniger als Schmetterlinge.'], 'Wie viele Bienen gibt es?', 'Es gibt {n} Bienen!'],
        [['8 Frösche sitzen auf einem Baumstamm.', '5 springen noch dazu.'], 'Wie viele Frösche sitzen jetzt auf dem Baumstamm?', 'Jetzt sitzen {n} Frösche auf dem Baumstamm!'],
        [['Auf einem Tablett liegen 9 Cupcakes', 'und 8 Kekse.'], 'Wie viele Leckereien sind es?', 'Es sind {n} Leckereien!']
      ],
      w10: [
        [['Bo hat 4 Muscheln.', 'Bo bekommt 3 dazu.'], 'Wie viele Muscheln hat Bo jetzt?', 'Bo hat jetzt {n} Muscheln!'],
        [['Pip hat 2 Eicheln.', 'Pip findet noch welche dazu.', 'Jetzt hat Pip 6.'], 'Wie viele hat Pip gefunden?', 'Pip hat {n} Eicheln gefunden!'],
        [['Ein paar Marienkäfer sitzen auf einem Blatt.', '3 landen noch dazu.', 'Jetzt sind es 8.'], 'Wie viele waren es vorher?', 'Vorher waren es {n} Marienkäfer!'],
        [['8 Kekse liegen auf einem Teller.', '2 werden gegessen.'], 'Wie viele sind es jetzt?', 'Jetzt sind es {n} Kekse!'],
        [['9 Gänse sind auf dem Teich.', 'Ein paar fliegen weg.', 'Jetzt sind es 6.'], 'Wie viele sind weggeflogen?', '{n} Gänse sind weggeflogen!'],
        [['Ein paar Hasen hoppeln herum.', '3 hoppeln weg.', 'Jetzt sind es 5.'], 'Wie viele waren es vorher?', 'Vorher waren es {n} Hasen!'],
        [['Es gibt 9 Früchte.', '4 sind Äpfel,', 'die anderen sind Birnen.'], 'Wie viele Birnen sind es?', 'Es sind {n} Birnen!'],
        [['Bo hat 10 Socken.', '4 sind in der Schublade,', 'die anderen sind im Korb.'], 'Wie viele sind im Korb?', '{n} Socken sind im Korb!'],
        [['Es gibt 7 Katzen', 'und 3 Hunde.'], 'Wie viele Katzen sind es mehr als Hunde?', 'Es sind {n} Katzen mehr als Hunde!'],
        [['Es gibt 7 Katzen.', 'Es gibt 5 Katzen mehr als Hunde.'], 'Wie viele Hunde gibt es?', 'Es gibt {n} Hunde!']
      ],
      grp: [
        [['Es gibt 4 Körbe', 'mit je 5 Äpfeln.'], 'Wie viele Äpfel sind es?', 'Es sind {n} Äpfel!'],
        [['Es gibt 6 Schüsseln', 'mit je 3 Erdbeeren.'], 'Wie viele Erdbeeren sind es?', 'Es sind {n} Erdbeeren!'],
        [['Es gibt 5 Teller', 'mit je 2 Muffins.'], 'Wie viele Muffins sind es?', 'Es sind {n} Muffins!'],
        [['12 Kekse werden gerecht', 'auf 3 Teller verteilt.'], 'Wie viele Kekse liegen auf jedem Teller?', 'Auf jedem Teller liegen {n} Kekse!'],
        [['4 Eichhörnchen', 'teilen sich 20 Eicheln gerecht.'], 'Wie viele Eicheln bekommt jedes Eichhörnchen?', 'Jedes Eichhörnchen bekommt {n} Eicheln!'],
        [['18 Muscheln werden gerecht', 'auf 6 Eimer verteilt.'], 'Wie viele Muscheln sind in jedem Eimer?', 'In jedem Eimer sind {n} Muscheln!'],
        [['Es gibt 15 Erdbeeren.', 'In jede Schüssel kommen 5.'], 'Wie viele Schüsseln braucht man?', 'Man braucht {n} Schüsseln!'],
        [['Es gibt 16 Socken.', '2 Socken sind ein Paar.'], 'Wie viele Paare sind es?', 'Es sind {n} Paare!'],
        [['Es gibt 24 Muffins.', 'Auf jeden Teller kommen 6.'], 'Wie viele Teller braucht man?', 'Man braucht {n} Teller!']
      ]
    },
    nl: {
      w20: [
        [['Er liggen 9 koekjes op een bord.', 'Er worden er 3 opgegeten.'], 'Hoeveel zijn er nu nog?', 'Er zijn nu nog {n} koekjes!'],
        [['Pip heeft 5 eikels.', 'Pip vindt er nog een paar bij.', 'Nu heeft Pip er 12.'], 'Hoeveel heeft Pip gevonden?', 'Pip heeft {n} eikels gevonden!'],
        [['Er zitten een paar lieveheersbeestjes op een blad.', 'Er landen er nog 6 bij.', 'Nu zijn het er 14.'], 'Hoeveel waren het er eerst?', 'Eerst waren er {n} lieveheersbeestjes!'],
        [['Bo heeft een paar schelpen.', 'Bo krijgt er 4 bij.', 'Nu heeft Bo er 13.'], 'Hoeveel had Bo er eerst?', 'Bo had eerst {n} schelpen!'],
        [['Er zwemmen 12 ganzen in de vijver.', 'Er vliegen er een paar weg.', 'Nu zijn het er 8.'], 'Hoeveel zijn er weggevlogen?', 'Er zijn {n} ganzen weggevlogen!'],
        [['Er hangen 15 frambozen aan een struik.', 'Een vogel eet er een paar op.', 'Nu zijn het er 9.'], 'Hoeveel heeft de vogel opgegeten?', 'De vogel heeft {n} frambozen opgegeten!'],
        [['Er huppelen een paar konijntjes rond.', 'Er huppelen er 4 weg.', 'Nu zijn het er 6.'], 'Hoeveel waren het er eerst?', 'Eerst waren er {n} konijntjes!'],
        [['Er zijn 13 appels.', 'Er liggen er 5 op tafel', 'en de rest zit in een zak.'], 'Hoeveel zitten er in de zak?', 'Er zitten {n} appels in de zak!'],
        [['Bo heeft 11 sokken.', 'Er liggen er 4 in de la', 'en de rest ligt in de mand.'], 'Hoeveel liggen er in de mand?', 'Er liggen {n} sokken in de mand!'],
        [['Er zijn 14 katten', 'en 5 honden.'], 'Hoeveel katten zijn er meer dan honden?', 'Er zijn {n} katten meer dan honden!'],
        [['Er zijn 5 honden.', 'Er zijn 7 katten meer dan honden.'], 'Hoeveel katten zijn er?', 'Er zijn {n} katten!'],
        [['Er zijn 11 lieveheersbeestjes', 'en 6 kikkers.'], 'Hoeveel lieveheersbeestjes zijn er meer dan kikkers?', 'Er zijn {n} lieveheersbeestjes meer dan kikkers!'],
        [['Er zijn 12 katten.', 'Er zijn 7 katten meer dan honden.'], 'Hoeveel honden zijn er?', 'Er zijn {n} honden!'],
        [['Er zijn 11 vlinders.', 'Er zijn 6 bijen minder dan vlinders.'], 'Hoeveel bijen zijn er?', 'Er zijn {n} bijen!'],
        [['Er zitten 8 kikkers op een boomstam.', 'Er springen er nog 5 bij.'], 'Hoeveel kikkers zitten er nu op de boomstam?', 'Er zitten nu {n} kikkers op de boomstam!'],
        [['Op een dienblad liggen 9 cupcakes', 'en 8 koekjes.'], 'Hoeveel lekkernijen zijn er?', 'Er zijn {n} lekkernijen!']
      ],
      w10: [
        [['Bo heeft 4 schelpen.', 'Bo krijgt er 3 bij.'], 'Hoeveel schelpen heeft Bo nu?', 'Bo heeft nu {n} schelpen!'],
        [['Pip heeft 2 eikels.', 'Pip vindt er nog een paar bij.', 'Nu heeft Pip er 6.'], 'Hoeveel heeft Pip gevonden?', 'Pip heeft {n} eikels gevonden!'],
        [['Er zitten een paar lieveheersbeestjes op een blad.', 'Er landen er nog 3 bij.', 'Nu zijn het er 8.'], 'Hoeveel waren het er eerst?', 'Eerst waren er {n} lieveheersbeestjes!'],
        [['Er liggen 8 koekjes op een bord.', 'Er worden er 2 opgegeten.'], 'Hoeveel zijn er nu nog?', 'Er zijn nu nog {n} koekjes!'],
        [['Er zwemmen 9 ganzen in de vijver.', 'Er vliegen er een paar weg.', 'Nu zijn het er 6.'], 'Hoeveel zijn er weggevlogen?', 'Er zijn {n} ganzen weggevlogen!'],
        [['Er huppelen een paar konijntjes rond.', 'Er huppelen er 3 weg.', 'Nu zijn het er 5.'], 'Hoeveel waren het er eerst?', 'Eerst waren er {n} konijntjes!'],
        [['Er zijn 9 stukken fruit.', 'Er zijn 4 appels', 'en de rest zijn peren.'], 'Hoeveel peren zijn er?', 'Er zijn {n} peren!'],
        [['Bo heeft 10 sokken.', 'Er liggen er 4 in de la', 'en de rest ligt in de mand.'], 'Hoeveel liggen er in de mand?', 'Er liggen {n} sokken in de mand!'],
        [['Er zijn 7 katten', 'en 3 honden.'], 'Hoeveel katten zijn er meer dan honden?', 'Er zijn {n} katten meer dan honden!'],
        [['Er zijn 7 katten.', 'Er zijn 5 katten meer dan honden.'], 'Hoeveel honden zijn er?', 'Er zijn {n} honden!']
      ],
      grp: [
        [['Er zijn 4 manden', 'met in elke mand 5 appels.'], 'Hoeveel appels zijn er?', 'Er zijn {n} appels!'],
        [['Er zijn 6 schalen', 'met in elke schaal 3 aardbeien.'], 'Hoeveel aardbeien zijn er?', 'Er zijn {n} aardbeien!'],
        [['Er zijn 5 borden', 'met op elk bord 2 muffins.'], 'Hoeveel muffins zijn er?', 'Er zijn {n} muffins!'],
        [['12 koekjes worden eerlijk verdeeld', 'over 3 borden.'], 'Hoeveel koekjes liggen er op elk bord?', 'Op elk bord liggen {n} koekjes!'],
        [['4 eekhoorns', 'verdelen 20 eikels eerlijk.'], 'Hoeveel eikels krijgt elke eekhoorn?', 'Elke eekhoorn krijgt {n} eikels!'],
        [['18 schelpen worden eerlijk verdeeld', 'over 6 emmertjes.'], 'Hoeveel schelpen zitten er in elk emmertje?', 'In elk emmertje zitten {n} schelpen!'],
        [['Er zijn 15 aardbeien.', 'In elke schaal gaan er 5.'], 'Hoeveel schalen zijn er nodig?', 'Er zijn {n} schalen nodig!'],
        [['Er zijn 16 sokken.', '2 sokken zijn een paar.'], 'Hoeveel paar zijn het?', 'Het zijn {n} paar!'],
        [['Er zijn 24 muffins.', 'Op elk bord gaan er 6.'], 'Hoeveel borden zijn er nodig?', 'Er zijn {n} borden nodig!']
      ]
    },
    da: {
      w20: [
        [['Der ligger 9 småkager på et fad.', '3 bliver spist.'], 'Hvor mange er der tilbage?', 'Der er {n} småkager tilbage!'],
        [['Pip har 5 agern.', 'Pip finder nogle flere.', 'Nu har Pip 12.'], 'Hvor mange fandt Pip?', 'Pip fandt {n} agern!'],
        [['Nogle mariehøns sidder på et blad.', '6 mere lander.', 'Nu er der 14.'], 'Hvor mange var der før?', 'Der var {n} mariehøns før!'],
        [['Bo har nogle muslingeskaller.', 'Bo får 4 mere.', 'Nu har Bo 13.'], 'Hvor mange havde Bo før?', 'Bo havde {n} muslingeskaller før!'],
        [['12 gæs svømmer i dammen.', 'Nogle flyver væk.', 'Nu er der 8.'], 'Hvor mange fløj væk?', '{n} gæs fløj væk!'],
        [['Der sidder 15 hindbær på en busk.', 'En fugl spiser nogle.', 'Nu er der 9.'], 'Hvor mange spiste fuglen?', 'Fuglen spiste {n} hindbær!'],
        [['Nogle kaniner hopper rundt.', '4 hopper væk.', 'Nu er der 6.'], 'Hvor mange var der før?', 'Der var {n} kaniner før!'],
        [['Der er 13 æbler.', '5 ligger på bordet,', 'og resten er i en pose.'], 'Hvor mange er der i posen?', 'Der er {n} æbler i posen!'],
        [['Bo har 11 sokker.', '4 ligger i skuffen,', 'og resten ligger i kurven.'], 'Hvor mange ligger der i kurven?', 'Der ligger {n} sokker i kurven!'],
        [['Der er 14 katte', 'og 5 hunde.'], 'Hvor mange flere katte end hunde er der?', 'Der er {n} flere katte end hunde!'],
        [['Der er 5 hunde.', 'Der er 7 flere katte end hunde.'], 'Hvor mange katte er der?', 'Der er {n} katte!'],
        [['Der er 11 mariehøns', 'og 6 frøer.'], 'Hvor mange flere mariehøns end frøer er der?', 'Der er {n} flere mariehøns end frøer!'],
        [['Der er 12 katte.', 'Der er 7 flere katte end hunde.'], 'Hvor mange hunde er der?', 'Der er {n} hunde!'],
        [['Der er 11 sommerfugle.', 'Der er 6 færre bier end sommerfugle.'], 'Hvor mange bier er der?', 'Der er {n} bier!'],
        [['8 frøer sidder på en træstamme.', '5 mere hopper op.'], 'Hvor mange frøer sidder der på træstammen nu?', 'Nu sidder der {n} frøer på træstammen!'],
        [['På en bakke er der 9 cupcakes', 'og 8 småkager.'], 'Hvor mange søde sager er der?', 'Der er {n} søde sager!']
      ],
      w10: [
        [['Bo har 4 muslingeskaller.', 'Bo får 3 mere.'], 'Hvor mange muslingeskaller har Bo nu?', 'Bo har {n} muslingeskaller nu!'],
        [['Pip har 2 agern.', 'Pip finder nogle flere.', 'Nu har Pip 6.'], 'Hvor mange fandt Pip?', 'Pip fandt {n} agern!'],
        [['Nogle mariehøns sidder på et blad.', '3 mere lander.', 'Nu er der 8.'], 'Hvor mange var der før?', 'Der var {n} mariehøns før!'],
        [['Der ligger 8 småkager på et fad.', '2 bliver spist.'], 'Hvor mange er der tilbage?', 'Der er {n} småkager tilbage!'],
        [['9 gæs svømmer i dammen.', 'Nogle flyver væk.', 'Nu er der 6.'], 'Hvor mange fløj væk?', '{n} gæs fløj væk!'],
        [['Nogle kaniner hopper rundt.', '3 hopper væk.', 'Nu er der 5.'], 'Hvor mange var der før?', 'Der var {n} kaniner før!'],
        [['Der er 9 stykker frugt.', '4 er æbler,', 'og resten er pærer.'], 'Hvor mange pærer er der?', 'Der er {n} pærer!'],
        [['Bo har 10 sokker.', '4 ligger i skuffen,', 'og resten ligger i kurven.'], 'Hvor mange ligger der i kurven?', 'Der ligger {n} sokker i kurven!'],
        [['Der er 7 katte', 'og 3 hunde.'], 'Hvor mange flere katte end hunde er der?', 'Der er {n} flere katte end hunde!'],
        [['Der er 7 katte.', 'Der er 5 flere katte end hunde.'], 'Hvor mange hunde er der?', 'Der er {n} hunde!']
      ],
      grp: [
        [['Der er 4 kurve', 'med 5 æbler i hver kurv.'], 'Hvor mange æbler er der?', 'Der er {n} æbler!'],
        [['Der er 6 skåle', 'med 3 jordbær i hver skål.'], 'Hvor mange jordbær er der?', 'Der er {n} jordbær!'],
        [['Der er 5 tallerkener', 'med 2 muffins på hver tallerken.'], 'Hvor mange muffins er der?', 'Der er {n} muffins!'],
        [['12 småkager deles ligeligt', 'på 3 tallerkener.'], 'Hvor mange småkager ligger der på hver tallerken?', 'Der ligger {n} småkager på hver tallerken!'],
        [['4 egern', 'deler 20 agern ligeligt.'], 'Hvor mange agern får hvert egern?', 'Hvert egern får {n} agern!'],
        [['18 muslingeskaller deles ligeligt', 'i 6 spande.'], 'Hvor mange muslingeskaller er der i hver spand?', 'Der er {n} muslingeskaller i hver spand!'],
        [['Der er 15 jordbær.', 'Der skal 5 i hver skål.'], 'Hvor mange skåle skal der bruges?', 'Der skal bruges {n} skåle!'],
        [['Der er 16 sokker.', '2 sokker er et par.'], 'Hvor mange par er der?', 'Der er {n} par!'],
        [['Der er 24 muffins.', 'Der skal 6 på hver tallerken.'], 'Hvor mange tallerkener skal der bruges?', 'Der skal bruges {n} tallerkener!']
      ]
    },
    sv: {
      w20: [
        [['9 kakor ligger på ett fat.', '3 blir uppätna.'], 'Hur många finns det kvar?', 'Det finns {n} kakor kvar!'],
        [['Pip har 5 ekollon.', 'Pip hittar några till.', 'Nu har Pip 12.'], 'Hur många hittade Pip?', 'Pip hittade {n} ekollon!'],
        [['Några nyckelpigor sitter på ett blad.', '6 till landar.', 'Nu är det 14.'], 'Hur många var det från början?', 'Från början var det {n} nyckelpigor!'],
        [['Bo har några snäckor.', 'Bo får 4 till.', 'Nu har Bo 13.'], 'Hur många hade Bo från början?', 'Bo hade {n} snäckor från början!'],
        [['12 gäss simmar i dammen.', 'Några flyger iväg.', 'Nu är det 8.'], 'Hur många flög iväg?', '{n} gäss flög iväg!'],
        [['15 hallon sitter på en buske.', 'En fågel äter upp några.', 'Nu är det 9.'], 'Hur många åt fågeln?', 'Fågeln åt {n} hallon!'],
        [['Några kaniner skuttar omkring.', '4 skuttar iväg.', 'Nu är det 6.'], 'Hur många var det från början?', 'Från början var det {n} kaniner!'],
        [['Det finns 13 äpplen.', '5 ligger på bordet', 'och resten ligger i en påse.'], 'Hur många ligger i påsen?', 'Det ligger {n} äpplen i påsen!'],
        [['Bo har 11 strumpor.', '4 ligger i lådan', 'och resten ligger i korgen.'], 'Hur många ligger i korgen?', 'Det ligger {n} strumpor i korgen!'],
        [['Det finns 14 katter', 'och 5 hundar.'], 'Hur många fler katter än hundar är det?', 'Det är {n} fler katter än hundar!'],
        [['Det finns 5 hundar.', 'Det finns 7 fler katter än hundar.'], 'Hur många katter finns det?', 'Det finns {n} katter!'],
        [['Det finns 11 nyckelpigor', 'och 6 grodor.'], 'Hur många fler nyckelpigor än grodor är det?', 'Det är {n} fler nyckelpigor än grodor!'],
        [['Det finns 12 katter.', 'Det finns 7 fler katter än hundar.'], 'Hur många hundar finns det?', 'Det finns {n} hundar!'],
        [['Det finns 11 fjärilar.', 'Det finns 6 färre bin än fjärilar.'], 'Hur många bin finns det?', 'Det finns {n} bin!'],
        [['8 grodor sitter på en stock.', '5 till hoppar upp.'], 'Hur många grodor sitter på stocken nu?', 'Nu sitter {n} grodor på stocken!'],
        [['På en bricka finns 9 cupcakes', 'och 8 kakor.'], 'Hur många godsaker är det?', 'Det är {n} godsaker!']
      ],
      w10: [
        [['Bo har 4 snäckor.', 'Bo får 3 till.'], 'Hur många snäckor har Bo nu?', 'Bo har {n} snäckor nu!'],
        [['Pip har 2 ekollon.', 'Pip hittar några till.', 'Nu har Pip 6.'], 'Hur många hittade Pip?', 'Pip hittade {n} ekollon!'],
        [['Några nyckelpigor sitter på ett blad.', '3 till landar.', 'Nu är det 8.'], 'Hur många var det från början?', 'Från början var det {n} nyckelpigor!'],
        [['8 kakor ligger på ett fat.', '2 blir uppätna.'], 'Hur många finns det kvar?', 'Det finns {n} kakor kvar!'],
        [['9 gäss simmar i dammen.', 'Några flyger iväg.', 'Nu är det 6.'], 'Hur många flög iväg?', '{n} gäss flög iväg!'],
        [['Några kaniner skuttar omkring.', '3 skuttar iväg.', 'Nu är det 5.'], 'Hur många var det från början?', 'Från början var det {n} kaniner!'],
        [['Det finns 9 frukter.', '4 är äpplen', 'och resten är päron.'], 'Hur många päron är det?', 'Det är {n} päron!'],
        [['Bo har 10 strumpor.', '4 ligger i lådan', 'och resten ligger i korgen.'], 'Hur många ligger i korgen?', 'Det ligger {n} strumpor i korgen!'],
        [['Det finns 7 katter', 'och 3 hundar.'], 'Hur många fler katter än hundar är det?', 'Det är {n} fler katter än hundar!'],
        [['Det finns 7 katter.', 'Det finns 5 fler katter än hundar.'], 'Hur många hundar finns det?', 'Det finns {n} hundar!']
      ],
      grp: [
        [['Det finns 4 korgar', 'med 5 äpplen i varje korg.'], 'Hur många äpplen är det?', 'Det är {n} äpplen!'],
        [['Det finns 6 skålar', 'med 3 jordgubbar i varje skål.'], 'Hur många jordgubbar är det?', 'Det är {n} jordgubbar!'],
        [['Det finns 5 tallrikar', 'med 2 muffins på varje tallrik.'], 'Hur många muffins är det?', 'Det är {n} muffins!'],
        [['12 kakor delas lika', 'på 3 tallrikar.'], 'Hur många kakor ligger på varje tallrik?', 'Det ligger {n} kakor på varje tallrik!'],
        [['4 ekorrar', 'delar lika på 20 ekollon.'], 'Hur många ekollon får varje ekorre?', 'Varje ekorre får {n} ekollon!'],
        [['18 snäckor delas lika', 'i 6 hinkar.'], 'Hur många snäckor finns det i varje hink?', 'Det finns {n} snäckor i varje hink!'],
        [['Det finns 15 jordgubbar.', 'Det ska vara 5 i varje skål.'], 'Hur många skålar behövs?', 'Det behövs {n} skålar!'],
        [['Det finns 16 strumpor.', '2 strumpor är ett par.'], 'Hur många par är det?', 'Det är {n} par!'],
        [['Det finns 24 muffins.', 'Det ska vara 6 på varje tallrik.'], 'Hur många tallrikar behövs?', 'Det behövs {n} tallrikar!']
      ]
    },
    no: {
      w20: [
        [['Det ligger 9 kjeks på et fat.', '3 blir spist.'], 'Hvor mange er det igjen?', 'Det er {n} kjeks igjen!'],
        [['Pip har 5 eikenøtter.', 'Pip finner noen til.', 'Nå har Pip 12.'], 'Hvor mange fant Pip?', 'Pip fant {n} eikenøtter!'],
        [['Noen marihøner sitter på et blad.', '6 til lander.', 'Nå er det 14.'], 'Hvor mange var det før?', 'Det var {n} marihøner før!'],
        [['Bo har noen skjell.', 'Bo får 4 til.', 'Nå har Bo 13.'], 'Hvor mange hadde Bo før?', 'Bo hadde {n} skjell før!'],
        [['12 gjess svømmer i dammen.', 'Noen flyr bort.', 'Nå er det 8.'], 'Hvor mange fløy bort?', '{n} gjess fløy bort!'],
        [['Det henger 15 bringebær på en busk.', 'En fugl spiser noen.', 'Nå er det 9.'], 'Hvor mange spiste fuglen?', 'Fuglen spiste {n} bringebær!'],
        [['Noen kaniner hopper rundt.', '4 hopper bort.', 'Nå er det 6.'], 'Hvor mange var det før?', 'Det var {n} kaniner før!'],
        [['Det er 13 epler.', '5 ligger på bordet,', 'og resten er i en pose.'], 'Hvor mange er i posen?', 'Det er {n} epler i posen!'],
        [['Bo har 11 sokker.', '4 ligger i skuffen,', 'og resten ligger i kurven.'], 'Hvor mange ligger i kurven?', 'Det ligger {n} sokker i kurven!'],
        [['Det er 14 katter', 'og 5 hunder.'], 'Hvor mange flere katter enn hunder er det?', 'Det er {n} flere katter enn hunder!'],
        [['Det er 5 hunder.', 'Det er 7 flere katter enn hunder.'], 'Hvor mange katter er det?', 'Det er {n} katter!'],
        [['Det er 11 marihøner', 'og 6 frosker.'], 'Hvor mange flere marihøner enn frosker er det?', 'Det er {n} flere marihøner enn frosker!'],
        [['Det er 12 katter.', 'Det er 7 flere katter enn hunder.'], 'Hvor mange hunder er det?', 'Det er {n} hunder!'],
        [['Det er 11 sommerfugler.', 'Det er 6 færre bier enn sommerfugler.'], 'Hvor mange bier er det?', 'Det er {n} bier!'],
        [['8 frosker sitter på en stokk.', '5 til hopper opp.'], 'Hvor mange frosker sitter på stokken nå?', 'Nå sitter det {n} frosker på stokken!'],
        [['På et brett ligger 9 cupcakes', 'og 8 kjeks.'], 'Hvor mange godsaker er det?', 'Det er {n} godsaker!']
      ],
      w10: [
        [['Bo har 4 skjell.', 'Bo får 3 til.'], 'Hvor mange skjell har Bo nå?', 'Bo har {n} skjell nå!'],
        [['Pip har 2 eikenøtter.', 'Pip finner noen til.', 'Nå har Pip 6.'], 'Hvor mange fant Pip?', 'Pip fant {n} eikenøtter!'],
        [['Noen marihøner sitter på et blad.', '3 til lander.', 'Nå er det 8.'], 'Hvor mange var det før?', 'Det var {n} marihøner før!'],
        [['Det ligger 8 kjeks på et fat.', '2 blir spist.'], 'Hvor mange er det igjen?', 'Det er {n} kjeks igjen!'],
        [['9 gjess svømmer i dammen.', 'Noen flyr bort.', 'Nå er det 6.'], 'Hvor mange fløy bort?', '{n} gjess fløy bort!'],
        [['Noen kaniner hopper rundt.', '3 hopper bort.', 'Nå er det 5.'], 'Hvor mange var det før?', 'Det var {n} kaniner før!'],
        [['Det er 9 frukter.', '4 er epler,', 'og resten er pærer.'], 'Hvor mange pærer er det?', 'Det er {n} pærer!'],
        [['Bo har 10 sokker.', '4 ligger i skuffen,', 'og resten ligger i kurven.'], 'Hvor mange ligger i kurven?', 'Det ligger {n} sokker i kurven!'],
        [['Det er 7 katter', 'og 3 hunder.'], 'Hvor mange flere katter enn hunder er det?', 'Det er {n} flere katter enn hunder!'],
        [['Det er 7 katter.', 'Det er 5 flere katter enn hunder.'], 'Hvor mange hunder er det?', 'Det er {n} hunder!']
      ],
      grp: [
        [['Det er 4 kurver', 'med 5 epler i hver kurv.'], 'Hvor mange epler er det?', 'Det er {n} epler!'],
        [['Det er 6 skåler', 'med 3 jordbær i hver skål.'], 'Hvor mange jordbær er det?', 'Det er {n} jordbær!'],
        [['Det er 5 tallerkener', 'med 2 muffins på hver tallerken.'], 'Hvor mange muffins er det?', 'Det er {n} muffins!'],
        [['12 kjeks deles likt', 'på 3 tallerkener.'], 'Hvor mange kjeks ligger på hver tallerken?', 'Det ligger {n} kjeks på hver tallerken!'],
        [['4 ekorn', 'deler 20 eikenøtter likt.'], 'Hvor mange eikenøtter får hvert ekorn?', 'Hvert ekorn får {n} eikenøtter!'],
        [['18 skjell deles likt', 'i 6 bøtter.'], 'Hvor mange skjell er det i hver bøtte?', 'Det er {n} skjell i hver bøtte!'],
        [['Det er 15 jordbær.', 'Det skal være 5 i hver skål.'], 'Hvor mange skåler trengs?', 'Det trengs {n} skåler!'],
        [['Det er 16 sokker.', '2 sokker er et par.'], 'Hvor mange par er det?', 'Det er {n} par!'],
        [['Det er 24 muffins.', 'Det skal være 6 på hver tallerken.'], 'Hvor mange tallerkener trengs?', 'Det trengs {n} tallerkener!']
      ]
    },
    es: {
      w20: [
        [['Hay 9 galletas en un plato.', 'Se comen 3.'], '¿Cuántas quedan?', '¡Quedan {n} galletas!'],
        [['Pip tiene 5 bellotas.', 'Pip encuentra algunas más.', 'Ahora Pip tiene 12.'], '¿Cuántas encontró Pip?', '¡Pip encontró {n} bellotas!'],
        [['Unas catarinas están en una hoja.', 'Llegan 6 más.', 'Ahora hay 14.'], '¿Cuántas había antes?', '¡Antes había {n} catarinas!'],
        [['Bo tiene unas conchas.', 'Le dan 4 más.', 'Ahora Bo tiene 13.'], '¿Cuántas tenía Bo antes?', '¡Bo tenía {n} conchas antes!'],
        [['Hay 12 gansos en el estanque.', 'Algunos se van volando.', 'Ahora hay 8.'], '¿Cuántos se fueron volando?', '¡Se fueron volando {n} gansos!'],
        [['Hay 15 frambuesas en un arbusto.', 'Un pájaro se come algunas.', 'Ahora hay 9.'], '¿Cuántas se comió el pájaro?', '¡El pájaro se comió {n} frambuesas!'],
        [['Unos conejos están brincando.', 'Se van 4 brincando.', 'Ahora hay 6.'], '¿Cuántos había antes?', '¡Antes había {n} conejos!'],
        [['Hay 13 manzanas.', '5 están en la mesa', 'y las demás están en una bolsa.'], '¿Cuántas hay en la bolsa?', '¡Hay {n} manzanas en la bolsa!'],
        [['Bo tiene 11 calcetines.', '4 están en el cajón', 'y los demás están en la canasta.'], '¿Cuántos hay en la canasta?', '¡Hay {n} calcetines en la canasta!'],
        [['Hay 14 gatos', 'y 5 perros.'], '¿Cuántos gatos más que perros hay?', '¡Hay {n} gatos más que perros!'],
        [['Hay 5 perros.', 'Hay 7 gatos más que perros.'], '¿Cuántos gatos hay?', '¡Hay {n} gatos!'],
        [['Hay 11 catarinas', 'y 6 ranas.'], '¿Cuántas catarinas más que ranas hay?', '¡Hay {n} catarinas más que ranas!'],
        [['Hay 12 gatos.', 'Hay 7 gatos más que perros.'], '¿Cuántos perros hay?', '¡Hay {n} perros!'],
        [['Hay 11 mariposas.', 'Hay 6 abejas menos que mariposas.'], '¿Cuántas abejas hay?', '¡Hay {n} abejas!'],
        [['8 ranas están sentadas en un tronco.', 'Se suben 5 más.'], '¿Cuántas ranas hay ahora en el tronco?', '¡Ahora hay {n} ranas en el tronco!'],
        [['En una charola hay 9 pastelitos', 'y 8 galletas.'], '¿Cuántos postres hay?', '¡Hay {n} postres!']
      ],
      w10: [
        [['Bo tiene 4 conchas.', 'Le dan 3 más.'], '¿Cuántas conchas tiene Bo ahora?', '¡Bo tiene {n} conchas ahora!'],
        [['Pip tiene 2 bellotas.', 'Pip encuentra algunas más.', 'Ahora Pip tiene 6.'], '¿Cuántas encontró Pip?', '¡Pip encontró {n} bellotas!'],
        [['Unas catarinas están en una hoja.', 'Llegan 3 más.', 'Ahora hay 8.'], '¿Cuántas había antes?', '¡Antes había {n} catarinas!'],
        [['Hay 8 galletas en un plato.', 'Se comen 2.'], '¿Cuántas quedan?', '¡Quedan {n} galletas!'],
        [['Hay 9 gansos en el estanque.', 'Algunos se van volando.', 'Ahora hay 6.'], '¿Cuántos se fueron volando?', '¡Se fueron volando {n} gansos!'],
        [['Unos conejos están brincando.', 'Se van 3 brincando.', 'Ahora hay 5.'], '¿Cuántos había antes?', '¡Antes había {n} conejos!'],
        [['Hay 9 frutas.', '4 son manzanas', 'y las demás son peras.'], '¿Cuántas peras hay?', '¡Hay {n} peras!'],
        [['Bo tiene 10 calcetines.', '4 están en el cajón', 'y los demás están en la canasta.'], '¿Cuántos hay en la canasta?', '¡Hay {n} calcetines en la canasta!'],
        [['Hay 7 gatos', 'y 3 perros.'], '¿Cuántos gatos más que perros hay?', '¡Hay {n} gatos más que perros!'],
        [['Hay 7 gatos.', 'Hay 5 gatos más que perros.'], '¿Cuántos perros hay?', '¡Hay {n} perros!']
      ],
      grp: [
        [['Hay 4 canastas', 'con 5 manzanas en cada una.'], '¿Cuántas manzanas hay?', '¡Hay {n} manzanas!'],
        [['Hay 6 tazones', 'con 3 fresas en cada uno.'], '¿Cuántas fresas hay?', '¡Hay {n} fresas!'],
        [['Hay 5 platos', 'con 2 panquecitos en cada uno.'], '¿Cuántos panquecitos hay?', '¡Hay {n} panquecitos!'],
        [['Se reparten 12 galletas en partes iguales', 'en 3 platos.'], '¿Cuántas galletas hay en cada plato?', '¡Hay {n} galletas en cada plato!'],
        [['4 ardillas', 'se reparten 20 bellotas en partes iguales.'], '¿Cuántas bellotas le tocan a cada ardilla?', '¡A cada ardilla le tocan {n} bellotas!'],
        [['Se reparten 18 conchas en partes iguales', 'en 6 cubetas.'], '¿Cuántas conchas hay en cada cubeta?', '¡Hay {n} conchas en cada cubeta!'],
        [['Hay 15 fresas.', 'Van 5 en cada tazón.'], '¿Cuántos tazones se necesitan?', '¡Se necesitan {n} tazones!'],
        [['Hay 16 calcetines.', '2 calcetines hacen un par.'], '¿Cuántos pares hay?', '¡Hay {n} pares!'],
        [['Hay 24 panquecitos.', 'Van 6 en cada plato.'], '¿Cuántos platos se necesitan?', '¡Se necesitan {n} platos!']
      ]
    },
    it: {
      w20: [
        [['Su un piatto ci sono 9 biscotti.', 'Ne vengono mangiati 3.'], 'Quanti ne restano?', 'Restano {n} biscotti!'],
        [['Pip ha 5 ghiande.', 'Pip ne trova altre.', 'Adesso Pip ne ha 12.'], 'Quante ne ha trovate Pip?', 'Pip ha trovato {n} ghiande!'],
        [['Alcune coccinelle sono su una foglia.', 'Ne arrivano altre 6.', 'Adesso sono 14.'], 'Quante erano prima?', 'Prima erano {n} coccinelle!'],
        [['Bo ha alcune conchiglie.', 'Ne riceve altre 4.', 'Adesso Bo ne ha 13.'], 'Quante ne aveva Bo prima?', 'Bo aveva {n} conchiglie prima!'],
        [['Sullo stagno ci sono 12 oche.', 'Alcune volano via.', 'Adesso sono 8.'], 'Quante sono volate via?', 'Sono volate via {n} oche!'],
        [['Su un cespuglio ci sono 15 lamponi.', 'Un uccellino ne mangia alcuni.', 'Adesso sono 9.'], 'Quanti ne ha mangiati l’uccellino?', 'L’uccellino ha mangiato {n} lamponi!'],
        [['Alcuni coniglietti saltellano.', '4 vanno via.', 'Adesso sono 6.'], 'Quanti erano prima?', 'Prima erano {n} coniglietti!'],
        [['Ci sono 13 mele.', '5 sono sul tavolo', 'e le altre sono in un sacchetto.'], 'Quante sono nel sacchetto?', 'Nel sacchetto ci sono {n} mele!'],
        [['Bo ha 11 calzini.', '4 sono nel cassetto', 'e gli altri sono nel cesto.'], 'Quanti sono nel cesto?', 'Nel cesto ci sono {n} calzini!'],
        [['Ci sono 14 gatti', 'e 5 cani.'], 'Quanti gatti ci sono in più rispetto ai cani?', 'Ci sono {n} gatti in più rispetto ai cani!'],
        [['Ci sono 5 cani.', 'Ci sono 7 gatti in più rispetto ai cani.'], 'Quanti gatti ci sono?', 'Ci sono {n} gatti!'],
        [['Ci sono 11 coccinelle', 'e 6 rane.'], 'Quante coccinelle ci sono in più rispetto alle rane?', 'Ci sono {n} coccinelle in più rispetto alle rane!'],
        [['Ci sono 12 gatti.', 'Ci sono 7 gatti in più rispetto ai cani.'], 'Quanti cani ci sono?', 'Ci sono {n} cani!'],
        [['Ci sono 11 farfalle.', 'Ci sono 6 api in meno rispetto alle farfalle.'], 'Quante api ci sono?', 'Ci sono {n} api!'],
        [['8 rane sono sedute su un tronco.', 'Ne saltano su altre 5.'], 'Quante rane ci sono adesso sul tronco?', 'Adesso sul tronco ci sono {n} rane!'],
        [['Su un vassoio ci sono 9 cupcake', 'e 8 biscotti.'], 'Quanti dolcetti ci sono?', 'Ci sono {n} dolcetti!']
      ],
      w10: [
        [['Bo ha 4 conchiglie.', 'Ne riceve altre 3.'], 'Quante conchiglie ha Bo adesso?', 'Adesso Bo ha {n} conchiglie!'],
        [['Pip ha 2 ghiande.', 'Pip ne trova altre.', 'Adesso Pip ne ha 6.'], 'Quante ne ha trovate Pip?', 'Pip ha trovato {n} ghiande!'],
        [['Alcune coccinelle sono su una foglia.', 'Ne arrivano altre 3.', 'Adesso sono 8.'], 'Quante erano prima?', 'Prima erano {n} coccinelle!'],
        [['Su un piatto ci sono 8 biscotti.', 'Ne vengono mangiati 2.'], 'Quanti ne restano?', 'Restano {n} biscotti!'],
        [['Sullo stagno ci sono 9 oche.', 'Alcune volano via.', 'Adesso sono 6.'], 'Quante sono volate via?', 'Sono volate via {n} oche!'],
        [['Alcuni coniglietti saltellano.', '3 vanno via.', 'Adesso sono 5.'], 'Quanti erano prima?', 'Prima erano {n} coniglietti!'],
        [['Ci sono 9 frutti.', '4 sono mele', 'e gli altri sono pere.'], 'Quante pere ci sono?', 'Ci sono {n} pere!'],
        [['Bo ha 10 calzini.', '4 sono nel cassetto', 'e gli altri sono nel cesto.'], 'Quanti sono nel cesto?', 'Nel cesto ci sono {n} calzini!'],
        [['Ci sono 7 gatti', 'e 3 cani.'], 'Quanti gatti ci sono in più rispetto ai cani?', 'Ci sono {n} gatti in più rispetto ai cani!'],
        [['Ci sono 7 gatti.', 'Ci sono 5 gatti in più rispetto ai cani.'], 'Quanti cani ci sono?', 'Ci sono {n} cani!']
      ],
      grp: [
        [['Ci sono 4 cestini', 'con 5 mele in ogni cestino.'], 'Quante mele ci sono?', 'Ci sono {n} mele!'],
        [['Ci sono 6 ciotole', 'con 3 fragole in ogni ciotola.'], 'Quante fragole ci sono?', 'Ci sono {n} fragole!'],
        [['Ci sono 5 piatti', 'con 2 muffin su ogni piatto.'], 'Quanti muffin ci sono?', 'Ci sono {n} muffin!'],
        [['12 biscotti vengono divisi in parti uguali', 'su 3 piatti.'], 'Quanti biscotti ci sono su ogni piatto?', 'Su ogni piatto ci sono {n} biscotti!'],
        [['4 scoiattoli', 'si dividono 20 ghiande in parti uguali.'], 'Quante ghiande riceve ogni scoiattolo?', 'Ogni scoiattolo riceve {n} ghiande!'],
        [['18 conchiglie vengono divise in parti uguali', 'in 6 secchielli.'], 'Quante conchiglie ci sono in ogni secchiello?', 'In ogni secchiello ci sono {n} conchiglie!'],
        [['Ci sono 15 fragole.', 'In ogni ciotola ne vanno 5.'], 'Quante ciotole servono?', 'Servono {n} ciotole!'],
        [['Ci sono 16 calzini.', '2 calzini fanno un paio.'], 'Quante paia ci sono?', 'Ci sono {n} paia!'],
        [['Ci sono 24 muffin.', 'Su ogni piatto ne vanno 6.'], 'Quanti piatti servono?', 'Servono {n} piatti!']
      ]
    },
    pt: {
      w20: [
        [['Há 9 biscoitos num prato.', '3 são comidos.'], 'Quantos sobraram?', 'Sobraram {n} biscoitos!'],
        [['Pip tem 5 bolotas.', 'Pip encontra mais algumas.', 'Agora Pip tem 12.'], 'Quantas Pip encontrou?', 'Pip encontrou {n} bolotas!'],
        [['Algumas joaninhas estão numa folha.', 'Chegam mais 6.', 'Agora são 14.'], 'Quantas havia antes?', 'Antes havia {n} joaninhas!'],
        [['Bo tem algumas conchas.', 'Bo ganha mais 4.', 'Agora Bo tem 13.'], 'Quantas Bo tinha antes?', 'Bo tinha {n} conchas antes!'],
        [['Há 12 gansos no lago.', 'Alguns vão embora voando.', 'Agora são 8.'], 'Quantos foram embora?', '{n} gansos foram embora!'],
        [['Há 15 framboesas num arbusto.', 'Um passarinho come algumas.', 'Agora são 9.'], 'Quantas o passarinho comeu?', 'O passarinho comeu {n} framboesas!'],
        [['Alguns coelhinhos estão pulando.', '4 vão embora.', 'Agora são 6.'], 'Quantos havia antes?', 'Antes havia {n} coelhinhos!'],
        [['Há 13 maçãs.', '5 estão na mesa', 'e o resto está numa sacola.'], 'Quantas estão na sacola?', 'Há {n} maçãs na sacola!'],
        [['Bo tem 11 meias.', '4 estão na gaveta', 'e o resto está no cesto.'], 'Quantas estão no cesto?', 'Há {n} meias no cesto!'],
        [['Há 14 gatos', 'e 5 cachorros.'], 'Quantos gatos há a mais que cachorros?', 'Há {n} gatos a mais que cachorros!'],
        [['Há 5 cachorros.', 'Há 7 gatos a mais que cachorros.'], 'Quantos gatos há?', 'Há {n} gatos!'],
        [['Há 11 joaninhas', 'e 6 sapos.'], 'Quantas joaninhas há a mais que sapos?', 'Há {n} joaninhas a mais que sapos!'],
        [['Há 12 gatos.', 'Há 7 gatos a mais que cachorros.'], 'Quantos cachorros há?', 'Há {n} cachorros!'],
        [['Há 11 borboletas.', 'Há 6 abelhas a menos que borboletas.'], 'Quantas abelhas há?', 'Há {n} abelhas!'],
        [['8 sapos estão sentados num tronco.', 'Mais 5 pulam para o tronco.'], 'Quantos sapos estão no tronco agora?', 'Agora há {n} sapos no tronco!'],
        [['Numa bandeja há 9 cupcakes', 'e 8 biscoitos.'], 'Quantos doces há?', 'Há {n} doces!']
      ],
      w10: [
        [['Bo tem 4 conchas.', 'Bo ganha mais 3.'], 'Quantas conchas Bo tem agora?', 'Agora Bo tem {n} conchas!'],
        [['Pip tem 2 bolotas.', 'Pip encontra mais algumas.', 'Agora Pip tem 6.'], 'Quantas Pip encontrou?', 'Pip encontrou {n} bolotas!'],
        [['Algumas joaninhas estão numa folha.', 'Chegam mais 3.', 'Agora são 8.'], 'Quantas havia antes?', 'Antes havia {n} joaninhas!'],
        [['Há 8 biscoitos num prato.', '2 são comidos.'], 'Quantos sobraram?', 'Sobraram {n} biscoitos!'],
        [['Há 9 gansos no lago.', 'Alguns vão embora voando.', 'Agora são 6.'], 'Quantos foram embora?', '{n} gansos foram embora!'],
        [['Alguns coelhinhos estão pulando.', '3 vão embora.', 'Agora são 5.'], 'Quantos havia antes?', 'Antes havia {n} coelhinhos!'],
        [['Há 9 frutas.', '4 são maçãs', 'e o resto são peras.'], 'Quantas peras há?', 'Há {n} peras!'],
        [['Bo tem 10 meias.', '4 estão na gaveta', 'e o resto está no cesto.'], 'Quantas estão no cesto?', 'Há {n} meias no cesto!'],
        [['Há 7 gatos', 'e 3 cachorros.'], 'Quantos gatos há a mais que cachorros?', 'Há {n} gatos a mais que cachorros!'],
        [['Há 7 gatos.', 'Há 5 gatos a mais que cachorros.'], 'Quantos cachorros há?', 'Há {n} cachorros!']
      ],
      grp: [
        [['Há 4 cestas', 'com 5 maçãs em cada uma.'], 'Quantas maçãs há?', 'Há {n} maçãs!'],
        [['Há 6 tigelas', 'com 3 morangos em cada uma.'], 'Quantos morangos há?', 'Há {n} morangos!'],
        [['Há 5 pratos', 'com 2 bolinhos em cada um.'], 'Quantos bolinhos há?', 'Há {n} bolinhos!'],
        [['12 biscoitos são divididos igualmente', 'em 3 pratos.'], 'Quantos biscoitos há em cada prato?', 'Há {n} biscoitos em cada prato!'],
        [['4 esquilos', 'dividem 20 bolotas igualmente.'], 'Quantas bolotas cada esquilo ganha?', 'Cada esquilo ganha {n} bolotas!'],
        [['18 conchas são divididas igualmente', 'em 6 baldes.'], 'Quantas conchas há em cada balde?', 'Há {n} conchas em cada balde!'],
        [['Há 15 morangos.', 'Vão 5 em cada tigela.'], 'Quantas tigelas são necessárias?', 'São necessárias {n} tigelas!'],
        [['Há 16 meias.', '2 meias formam um par.'], 'Quantos pares há?', 'Há {n} pares!'],
        [['Há 24 bolinhos.', 'Vão 6 em cada prato.'], 'Quantos pratos são necessários?', 'São necessários {n} pratos!']
      ]
    },
    fr: {
      w20: [
        [['9 biscuits sont sur une assiette.', 'On en mange 3.'], 'Combien en reste-t-il ?', 'Il reste {n} biscuits !'],
        [['Pip a 5 glands.', 'Pip en trouve d’autres.', 'Maintenant, Pip en a 12.'], 'Combien Pip en a-t-il trouvé ?', 'Pip a trouvé {n} glands !'],
        [['Des coccinelles sont sur une feuille.', '6 autres se posent.', 'Maintenant, il y en a 14.'], 'Combien y en avait-il avant ?', 'Il y avait {n} coccinelles avant !'],
        [['Bo a des coquillages.', 'Bo en reçoit 4 de plus.', 'Maintenant, Bo en a 13.'], 'Combien Bo en avait-il avant ?', 'Bo avait {n} coquillages avant !'],
        [['12 oies sont sur la mare.', 'Quelques-unes s’envolent.', 'Maintenant, il y en a 8.'], 'Combien d’oies se sont envolées ?', '{n} oies se sont envolées !'],
        [['15 framboises sont sur un buisson.', 'Un oiseau en mange quelques-unes.', 'Maintenant, il y en a 9.'], 'Combien l’oiseau en a-t-il mangé ?', 'L’oiseau a mangé {n} framboises !'],
        [['Des lapins sautillent.', '4 s’en vont.', 'Maintenant, il y en a 6.'], 'Combien y en avait-il avant ?', 'Il y avait {n} lapins avant !'],
        [['Il y a 13 pommes.', '5 sont sur la table', 'et les autres sont dans un sac.'], 'Combien y en a-t-il dans le sac ?', 'Il y a {n} pommes dans le sac !'],
        [['Bo a 11 chaussettes.', '4 sont dans le tiroir', 'et les autres sont dans le panier.'], 'Combien y en a-t-il dans le panier ?', 'Il y a {n} chaussettes dans le panier !'],
        [['Il y a 14 chats', 'et 5 chiens.'], 'Combien y a-t-il de chats de plus que de chiens ?', 'Il y a {n} chats de plus que de chiens !'],
        [['Il y a 5 chiens.', 'Il y a 7 chats de plus que de chiens.'], 'Combien y a-t-il de chats ?', 'Il y a {n} chats !'],
        [['Il y a 11 coccinelles', 'et 6 grenouilles.'], 'Combien y a-t-il de coccinelles de plus que de grenouilles\u202F?', 'Il y a {n} coccinelles de plus que de grenouilles\u202F!'],
        [['Il y a 12 chats.', 'Il y a 7 chats de plus que de chiens.'], 'Combien y a-t-il de chiens ?', 'Il y a {n} chiens !'],
        [['Il y a 11 papillons.', 'Il y a 6 abeilles de moins que de papillons.'], 'Combien y a-t-il d’abeilles ?', 'Il y a {n} abeilles !'],
        [['8 grenouilles sont assises sur un tronc.', '5 autres sautent dessus.'], 'Combien de grenouilles y a-t-il sur le tronc maintenant ?', 'Il y a maintenant {n} grenouilles sur le tronc !'],
        [['Sur un plateau, il y a 9 cupcakes', 'et 8 biscuits.'], 'Combien y a-t-il de gâteaux en tout ?', 'Il y a {n} gâteaux en tout !']
      ],
      w10: [
        [['Bo a 4 coquillages.', 'Bo en reçoit 3 de plus.'], 'Combien de coquillages Bo a-t-il maintenant ?', 'Bo a maintenant {n} coquillages !'],
        [['Pip a 2 glands.', 'Pip en trouve d’autres.', 'Maintenant, Pip en a 6.'], 'Combien Pip en a-t-il trouvé ?', 'Pip a trouvé {n} glands !'],
        [['Des coccinelles sont sur une feuille.', '3 autres se posent.', 'Maintenant, il y en a 8.'], 'Combien y en avait-il avant ?', 'Il y avait {n} coccinelles avant !'],
        [['8 biscuits sont sur une assiette.', 'On en mange 2.'], 'Combien en reste-t-il ?', 'Il reste {n} biscuits !'],
        [['9 oies sont sur la mare.', 'Quelques-unes s’envolent.', 'Maintenant, il y en a 6.'], 'Combien d’oies se sont envolées ?', '{n} oies se sont envolées !'],
        [['Des lapins sautillent.', '3 s’en vont.', 'Maintenant, il y en a 5.'], 'Combien y en avait-il avant ?', 'Il y avait {n} lapins avant !'],
        [['Il y a 9 fruits.', '4 sont des pommes', 'et les autres sont des poires.'], 'Combien y a-t-il de poires\u202F?', 'Il y a {n} poires\u202F!'],
        [['Bo a 10 chaussettes.', '4 sont dans le tiroir', 'et les autres sont dans le panier.'], 'Combien y en a-t-il dans le panier ?', 'Il y a {n} chaussettes dans le panier !'],
        [['Il y a 7 chats', 'et 3 chiens.'], 'Combien y a-t-il de chats de plus que de chiens ?', 'Il y a {n} chats de plus que de chiens !'],
        [['Il y a 7 chats.', 'Il y a 5 chats de plus que de chiens.'], 'Combien y a-t-il de chiens ?', 'Il y a {n} chiens !']
      ],
      grp: [
        [['Il y a 4 paniers', 'avec 5 pommes dans chaque panier.'], 'Combien y a-t-il de pommes ?', 'Il y a {n} pommes !'],
        [['Il y a 6 bols', 'avec 3 fraises dans chaque bol.'], 'Combien y a-t-il de fraises ?', 'Il y a {n} fraises !'],
        [['Il y a 5 assiettes', 'avec 2 muffins sur chaque assiette.'], 'Combien y a-t-il de muffins ?', 'Il y a {n} muffins !'],
        [['On partage 12 biscuits équitablement', 'sur 3 assiettes.'], 'Combien de biscuits y a-t-il sur chaque assiette ?', 'Il y a {n} biscuits sur chaque assiette !'],
        [['4 écureuils', 'se partagent 20 glands équitablement.'], 'Combien de glands chaque écureuil reçoit-il ?', 'Chaque écureuil reçoit {n} glands !'],
        [['On partage 18 coquillages équitablement', 'dans 6 seaux.'], 'Combien de coquillages y a-t-il dans chaque seau ?', 'Il y a {n} coquillages dans chaque seau !'],
        [['Il y a 15 fraises.', 'On en met 5 dans chaque bol.'], 'Combien faut-il de bols ?', 'Il faut {n} bols !'],
        [['Il y a 16 chaussettes.', '2 chaussettes font une paire.'], 'Combien y a-t-il de paires ?', 'Il y a {n} paires !'],
        [['Il y a 24 muffins.', 'On en met 6 sur chaque assiette.'], 'Combien faut-il d’assiettes ?', 'Il faut {n} assiettes !']
      ]
    },
    fi: {
      w20: [
        [['Lautasella on 9 keksiä.', 'Niistä syödään 3.'], 'Montako on jäljellä?', 'Jäljellä on {n} keksiä!'],
        [['Pipillä on 5 tammenterhoa.', 'Pip löytää lisää.', 'Nyt Pipillä on 12.'], 'Montako Pip löysi?', 'Pip löysi {n} tammenterhoa!'],
        [['Lehdellä istuu leppäkerttuja.', '6 lisää laskeutuu.', 'Nyt niitä on 14.'], 'Montako niitä oli alussa?', 'Alussa oli {n} leppäkerttua!'],
        [['Bolla on simpukoita.', 'Bo saa 4 lisää.', 'Nyt Bolla on 13.'], 'Montako Bolla oli alussa?', 'Bolla oli alussa {n} simpukkaa!'],
        [['Lammessa ui 12 hanhea.', 'Muutama lentää pois.', 'Nyt niitä on 8.'], 'Montako lensi pois?', '{n} hanhea lensi pois!'],
        [['Pensaassa on 15 vadelmaa.', 'Lintu syö muutaman.', 'Nyt niitä on 9.'], 'Montako lintu söi?', 'Lintu söi {n} vadelmaa!'],
        [['Pupuja hyppelee niityllä.', '4 hyppää pois.', 'Nyt niitä on 6.'], 'Montako niitä oli alussa?', 'Alussa oli {n} pupua!'],
        [['Omenoita on 13.', '5 on pöydällä', 'ja loput ovat pussissa.'], 'Montako on pussissa?', 'Pussissa on {n} omenaa!'],
        [['Bolla on 11 sukkaa.', '4 on laatikossa', 'ja loput ovat korissa.'], 'Montako on korissa?', 'Korissa on {n} sukkaa!'],
        [['Kissoja on 14', 'ja koiria 5.'], 'Montako kissaa on enemmän kuin koiria?', 'Kissoja on {n} enemmän kuin koiria!'],
        [['Koiria on 5.', 'Kissoja on 7 enemmän kuin koiria.'], 'Montako kissaa on?', 'Kissoja on {n}!'],
        [['Leppäkerttuja on 11', 'ja sammakoita 6.'], 'Montako leppäkerttua on enemmän kuin sammakoita?', 'Leppäkerttuja on {n} enemmän kuin sammakoita!'],
        [['Kissoja on 12.', 'Kissoja on 7 enemmän kuin koiria.'], 'Montako koiraa on?', 'Koiria on {n}!'],
        [['Perhosia on 11.', 'Mehiläisiä on 6 vähemmän kuin perhosia.'], 'Montako mehiläistä on?', 'Mehiläisiä on {n}!'],
        [['8 sammakkoa istuu tukilla.', '5 lisää hyppää tukille.'], 'Montako sammakkoa tukilla on nyt?', 'Tukilla on nyt {n} sammakkoa!'],
        [['Tarjottimella on 9 kuppikakkua', 'ja 8 keksiä.'], 'Montako herkkua on yhteensä?', 'Herkkuja on yhteensä {n}!']
      ],
      w10: [
        [['Bolla on 4 simpukkaa.', 'Bo saa 3 lisää.'], 'Montako simpukkaa Bolla on nyt?', 'Bolla on nyt {n} simpukkaa!'],
        [['Pipillä on 2 tammenterhoa.', 'Pip löytää lisää.', 'Nyt Pipillä on 6.'], 'Montako Pip löysi?', 'Pip löysi {n} tammenterhoa!'],
        [['Lehdellä istuu leppäkerttuja.', '3 lisää laskeutuu.', 'Nyt niitä on 8.'], 'Montako niitä oli alussa?', 'Alussa oli {n} leppäkerttua!'],
        [['Lautasella on 8 keksiä.', 'Niistä syödään 2.'], 'Montako on jäljellä?', 'Jäljellä on {n} keksiä!'],
        [['Lammessa ui 9 hanhea.', 'Muutama lentää pois.', 'Nyt niitä on 6.'], 'Montako lensi pois?', '{n} hanhea lensi pois!'],
        [['Pupuja hyppelee niityllä.', '3 hyppää pois.', 'Nyt niitä on 5.'], 'Montako niitä oli alussa?', 'Alussa oli {n} pupua!'],
        [['Hedelmiä on 9.', '4 on omenoita', 'ja loput ovat päärynöitä.'], 'Montako päärynää on?', 'Päärynöitä on {n}!'],
        [['Bolla on 10 sukkaa.', '4 on laatikossa', 'ja loput ovat korissa.'], 'Montako on korissa?', 'Korissa on {n} sukkaa!'],
        [['Kissoja on 7', 'ja koiria 3.'], 'Montako kissaa on enemmän kuin koiria?', 'Kissoja on {n} enemmän kuin koiria!'],
        [['Kissoja on 7.', 'Kissoja on 5 enemmän kuin koiria.'], 'Montako koiraa on?', 'Koiria on {n}!']
      ],
      grp: [
        [['On 4 koria', 'ja jokaisessa korissa on 5 omenaa.'], 'Montako omenaa on yhteensä?', 'Omenoita on yhteensä {n}!'],
        [['On 6 kulhoa', 'ja jokaisessa kulhossa on 3 mansikkaa.'], 'Montako mansikkaa on yhteensä?', 'Mansikoita on yhteensä {n}!'],
        [['On 5 lautasta', 'ja jokaisella lautasella on 2 muffinia.'], 'Montako muffinia on yhteensä?', 'Muffineja on yhteensä {n}!'],
        [['12 keksiä jaetaan tasan', '3 lautaselle.'], 'Montako keksiä on jokaisella lautasella?', 'Jokaisella lautasella on {n} keksiä!'],
        [['4 oravaa', 'jakaa 20 tammenterhoa tasan.'], 'Montako tammenterhoa kukin orava saa?', 'Kukin orava saa {n} tammenterhoa!'],
        [['18 simpukkaa jaetaan tasan', '6 ämpäriin.'], 'Montako simpukkaa on jokaisessa ämpärissä?', 'Jokaisessa ämpärissä on {n} simpukkaa!'],
        [['On 15 mansikkaa.', 'Jokaiseen kulhoon laitetaan 5.'], 'Montako kulhoa tarvitaan?', 'Tarvitaan {n} kulhoa!'],
        [['On 16 sukkaa.', '2 sukkaa on yksi pari.'], 'Montako paria on?', 'Pareja on {n}!'],
        [['On 24 muffinia.', 'Jokaiselle lautaselle laitetaan 6.'], 'Montako lautasta tarvitaan?', 'Tarvitaan {n} lautasta!']
      ]
    }
  };
  /* school signs: ":" for division in de nl da no sv fi fr it, "÷" in en es pt; "·" for times in de da no sv fi, "×" elsewhere */
  var DIV = { en: '÷', es: '÷', pt: '÷' }, MUL = { de: '·', da: '·', no: '·', sv: '·', fi: '·' };

  function levelOf(l) { return LEVELS.indexOf(l) >= 0 ? l : 'w20'; }
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function ids(level) { var n = ROUNDS[levelOf(level)].length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* the answer, from the story's two numbers and the diagram — never stored */
  function solve(r) {
    var v = r.v;
    switch (r.k) {
      case 'add-result': return v.start + v.change;
      case 'add-change': return v.result - v.start;
      case 'add-start': return v.result - v.change;
      case 'take-result': return v.start - v.change;
      case 'take-change': return v.start - v.result;
      case 'take-start': return v.result + v.change;
      case 'put-total': return v.part1 + v.part2;
      case 'put-part': return v.whole - v.part1;
      case 'cmp-diff': return v.big - v.small;
      case 'cmp-big': return v.small + v.gap;
      case 'cmp-small': return v.big - v.gap;
      case 'grp-total': return v.groups * v.each;
      case 'grp-share': return v.total / v.groups;
      case 'grp-make': return v.total / v.each;
    }
    return null;
  }
  function round(level, idx) {
    level = levelOf(level); var x = ROUNDS[level][idx];
    var r = { level: level, idx: idx, id: level + '.' + x.id, k: x.k, d: x.d, op: x.op, v: x.v, u: x.u, decoy: x.decoy, pics: x.pics, cl: x.cl, patient: PATIENTS[(idx * 4 + LEVELS.indexOf(level) * 2) % PATIENTS.length] };
    r.answer = solve(r);
    r.full = {}; ROLES[r.d].forEach(function (k) { r.full[k] = k === r.u ? r.answer : r.v[k]; });
    r.tiles = Object.keys(r.v).map(function (k) { return r.v[k]; }).concat([r.decoy]);
    r.max = level === 'grp' ? 30 : 20;
    return r;
  }
  function text(loc, r) {
    var t = TX[locale(loc)][r.level][r.idx];
    return { clauses: t[0].map(function (s, i) { return { role: r.cl[i], t: s }; }), q: t[1], a: t[2].replace('{n}', String(r.answer)) };
  }
  /* the tiles in their tray order, and the deal of a pass */
  function plan(level, rnd, prev) {
    var all = ids(level), order;
    for (var t = 0; t < 4000; t++) {
      order = shuffle(all, rnd);
      if (prev && prev.length && prev.join() === order.join()) continue;
      var rs = order.map(function (i) { return round(level, i); }), bad = false;
      for (var p = 1; p < rs.length && !bad; p++) { if (rs[p].answer === rs[p - 1].answer) bad = true; if (p >= 2 && rs[p].k === rs[p - 1].k && rs[p].k === rs[p - 2].k) bad = true; }
      if (!bad) break;
    }
    var trays = order.map(function () { return shuffle([0, 1, 2], rnd); });
    return { order: order, trays: trays };
  }

  /* ---- state ---- */
  function newState(r, tray) {
    var tiles = (tray || [0, 1, 2]).map(function (k) { return { id: 't' + k, n: r.tiles[k], decoy: k === 2 }; });
    var placed = {}; ROLES[r.d].forEach(function (k) { placed[k] = null; });
    return { r: r, tiles: tiles, placed: placed, mystery: null, dial: 1, sel: null, misses: 0, show: 0, last: null, done: false };
  }
  function moved(st) { st.show = 0; st.last = null; }
  function tileOf(st, id) { for (var i = 0; i < st.tiles.length; i++) if (st.tiles[i].id === id) return st.tiles[i]; return null; }
  function roleOfTile(st, id) { for (var k in st.placed) if (st.placed[k] === id) return k; return null; }
  function pick(st, id) { if (st.done || !tileOf(st, id)) return false; st.sel = st.sel === id ? null : id; return true; }
  /* put the picked tile (or `id`) on a frame: a tile already there swaps back to where this one came from */
  function place(st, role, id) {
    id = id || st.sel;
    if (st.done || !id || !tileOf(st, id) || !(role in st.placed)) return false;
    var from = roleOfTile(st, id), there = st.placed[role];
    if (from === role) { st.sel = null; return true; }
    st.placed[role] = id; if (from) st.placed[from] = there; else if (there) { /* the tile on the frame goes back to the tray */ }
    if (st.mystery === role) st.mystery = null;
    st.sel = null; moved(st); return true;
  }
  function unplace(st, role) { if (st.done || !(role in st.placed) || !st.placed[role]) return false; st.placed[role] = null; moved(st); return true; }
  function markMystery(st, role) {
    if (st.done || !(role in st.placed)) return false;
    if (st.placed[role]) st.placed[role] = null;
    st.mystery = st.mystery === role ? null : role; moved(st); return true;
  }
  function setDial(st, n) { if (st.done) return false; n = Math.max(1, Math.min(st.r.max, n | 0)); if (n === st.dial) return false; st.dial = n; moved(st); return true; }
  function valueOf(st, role) { return role === st.mystery ? st.dial : st.placed[role] ? tileOf(st, st.placed[role]).n : null; }
  /* the film: the child's model played in story order; the first frame whose tile is not its sentence's number stops it;
     with every tile right, the landing frame shows the dial's mistake as dots that spill over or sockets left empty */
  function runFilm(st) {
    var r = st.r, roles = ROLES[r.d], model = {}, map = {};
    roles.forEach(function (k) { model[k] = valueOf(st, k); map[k] = k; });
    if (r.d === 'bracket' && st.mystery && st.mystery !== 'whole' && r.u !== 'whole' && st.mystery !== r.u) { map.part1 = 'part2'; map.part2 = 'part1'; }   /* the two part frames are interchangeable */
    if (r.d === 'bracket' && r.u === 'whole' && model.part1 !== r.v.part1 && model.part1 === r.v.part2 && model.part2 === r.v.part1) { map.part1 = 'part2'; map.part2 = 'part1'; }
    for (var i = 0; i < roles.length; i++) {
      var k = roles[i], s = map[k];
      if (k === st.mystery) { if (s !== r.u) return { ok: false, at: k, srole: s, why: 'place', holds: st.dial, story: r.full[s] }; continue; }
      if (model[k] !== r.full[s] || s === r.u) return { ok: false, at: k, srole: s, why: 'place', holds: model[k], story: s === r.u ? null : r.full[s] };
    }
    if (st.dial === r.answer) return { ok: true };
    var land = LAND[r.d], arrive = flow(r, model, land), outline = model[land];
    return { ok: false, at: land, srole: land, why: arrive > outline ? 'spill' : 'gap', n: Math.abs(arrive - outline), arrive: arrive, outline: outline };
  }
  /* what the film delivers into the landing frame from the other two frames */
  function flow(r, m, land) {
    if (r.d === 'change') return r.op === 'add' ? m.start + m.change : m.start - m.change;
    if (r.d === 'bracket') return m.part1 + m.part2;
    if (r.d === 'compare') return m.big - m.small;
    return m.groups * m.each;
  }
  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    var roles = ROLES[r.d], empty = roles.filter(function (k) { return k !== st.mystery && !st.placed[k]; });
    if (empty.length) { st.last = { reason: 'empty', roles: empty }; st.show = 0; return { ok: false, reason: 'empty' }; }
    if (!st.mystery) { st.last = { reason: 'mystery' }; st.show = 0; return { ok: false, reason: 'mystery' }; }
    var f = runFilm(st);
    if (f.ok) { st.done = true; st.show = 0; st.last = { reason: 'ok' }; return { ok: true }; }
    st.misses++; st.show = Math.min(2, st.misses); st.last = { reason: 'miss', film: f };
    return { ok: false, reason: 'miss', film: f, show: st.show };
  }
  function hint(st) {
    if (st.done || !st.last) return null;
    var R = st.last.reason;
    if (R === 'empty') return 'hEmpty';
    if (R === 'mystery') return 'hMystery';
    if (st.show < 2) return 'hMiss1';
    return ({ 'add-change': 'hCame', 'take-change': 'hWent', 'add-start': 'hBefore', 'take-start': 'hBefore', 'put-part': 'hPart', 'cmp-diff': 'hGap', 'cmp-big': 'hLong', 'cmp-small': 'hShort', 'grp-share': 'hTray', 'grp-make': 'hTrays' })[st.r.k] || 'hAll';
  }
  /* the equation, written the way the mystery is found */
  function equation(loc, r) {
    loc = locale(loc); var v = r.full, M = ' ' + (MUL[loc] || '×') + ' ', D = ' ' + (DIV[loc] || ':') + ' ', P = ' + ', S = ' − ', E = ' = ';
    switch (r.k) {
      case 'add-result': case 'add-change': return v.start + P + v.change + E + v.result;
      case 'add-start': return v.result + S + v.change + E + v.start;
      case 'take-result': case 'take-change': return v.start + S + v.change + E + v.result;
      case 'take-start': return v.result + P + v.change + E + v.start;
      case 'put-total': return v.part1 + P + v.part2 + E + v.whole;
      case 'put-part': return v.whole + S + v.part1 + E + v.part2;
      case 'cmp-diff': return v.big + S + v.small + E + v.gap;
      case 'cmp-big': return v.small + P + v.gap + E + v.big;
      case 'cmp-small': return v.big + S + v.gap + E + v.small;
      case 'grp-total': return v.groups + M + v.each + E + v.total;
      case 'grp-share': return v.total + D + v.groups + E + v.each;
      case 'grp-make': return v.total + D + v.each + E + v.groups;
    }
    return '';
  }
  /* the order the film moves dots into the trays: sharing deals round-robin, making groups fills one tray at a time */
  function dealOrder(r, groups, each) {
    var out = [];
    if (r.k === 'grp-share') { for (var e = 0; e < each; e++) for (var g = 0; g < groups; g++) out.push(g); }
    else { for (var g2 = 0; g2 < groups; g2++) for (var e2 = 0; e2 < each; e2++) out.push(g2); }
    return out;
  }
  function layout(W) { var wide = W >= 620; return { mode: wide ? 'wide' : 'narrow', tiny: W < 300, W: W, patient: wide ? 120 : 64, thing: wide ? 96 : 64 }; }
  return {
    DATA: { ROUNDS: ROUNDS, TX: TX, PATIENTS: PATIENTS, BANDAGE: BANDAGE, ROLES: ROLES, LAND: LAND }, LOCALES: LOCALES, LEVELS: LEVELS,
    levelOf: levelOf, locale: locale, ids: ids, shuffle: shuffle, solve: solve, round: round, text: text, plan: plan,
    newState: newState, tileOf: tileOf, roleOfTile: roleOfTile, pick: pick, place: place, unplace: unplace, markMystery: markMystery, setDial: setDial,
    valueOf: valueOf, runFilm: runFilm, flow: flow, check: check, hint: hint, equation: equation, dealOrder: dealOrder, layout: layout
  };
});
