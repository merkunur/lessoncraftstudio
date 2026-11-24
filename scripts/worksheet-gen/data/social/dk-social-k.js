/**
 * data/social/dk-social-k.js — the bank of the Batch SK Kindergarten social studies pages (K-712 .. K-726; factory
 * types/_shared/dk-social-k.js; Daily Teaching System Stage D-5, 2026-11-24). English (American) only.
 *
 * Every closed item carries its ONE right answer here; the gate (qa/verify-dk-social-k.js) re-derives each from its own
 * tables and never trusts these words. Library pictures are named by { theme, noun } only (nothing is looked up while
 * this module loads). `data/` is gitignored: this file needs `git add -f`.
 */
'use strict';
const lib = (theme, noun) => ({ theme, noun });

module.exports = {
  /** K-712 class rules: each pair is ONE moment drawn twice, the rule followed and the rule broken */
  RULES: [
    { id: 'hall', follow: 'walk', not: 'run', teacher: 'We walk in the hall.' },
    { id: 'hand', follow: 'raise', not: 'shout', teacher: 'We raise a hand to talk.' },
    { id: 'blocks', follow: 'clean', not: 'leave', teacher: 'We clean up our blocks.' },
    { id: 'story', follow: 'listen', not: 'play', teacher: 'We look and listen at story time.' },
  ],
  /** K-713 good friends: each picture is one act, kind or not (the child acting is never drawn as a bad child). Four of
   *  each (review round 1: a page of six pictures may hold 2 + 4, 3 + 3 or 4 + 2) */
  FRIENDS: [
    { id: 'slide', kind: true, teacher: 'Two friends take turns on the slide.' },
    { id: 'crayons', kind: true, teacher: 'A friend shares the crayons.' },
    { id: 'help-up', kind: true, teacher: 'A friend helps a friend up after a fall (the ball rolled away).' },
    { id: 'snack', kind: true, teacher: 'A friend shares a snack at the picnic.' },
    { id: 'grab', kind: false, teacher: 'A child grabs a toy from a friend.' },
    { id: 'push', kind: false, teacher: 'A child pushes in line.' },
    { id: 'tower', kind: false, teacher: 'A child knocks down a friend’s tower.' },
    { id: 'tear', kind: false, teacher: 'A child tears a friend’s drawing.' },
  ],
  /** K-714 families: six families, each drawn with the same care (who is who is teacher talk) */
  FAMILIES: [
    { id: 'mom-child', teacher: 'a mom and her child', members: ['adult-f', 'child'] },
    { id: 'two-dads', teacher: 'two dads and their twins', members: ['adult-m', 'adult-m', 'child', 'child'] },
    { id: 'grandma', teacher: 'a grandmother and her two grandchildren', members: ['elder-f', 'child', 'child'] },
    { id: 'foster', teacher: 'a foster family: two parents and the children they care for', members: ['adult-f', 'adult-m', 'child', 'child', 'child'] },
    { id: 'big', teacher: 'a big family with a baby', members: ['elder-m', 'adult-f', 'adult-m', 'child', 'child', 'baby'] },
    { id: 'dad-teen', teacher: 'a dad and his teenager', members: ['adult-m', 'teen'] },
  ],
  /** K-715 traditions: each object appears in its own scene and in no other */
  TRADITIONS: [
    { id: 'birthday', object: 'hat', teacher: 'a birthday party: a cake with candles and party hats', objectWord: 'a party hat' },
    { id: 'thanksgiving', object: 'pie', teacher: 'a Thanksgiving meal: a family at the table with a turkey and a pumpkin pie', objectWord: 'a pumpkin pie' },
    { id: 'diwali', object: 'diya', teacher: 'Diwali: a family lights small clay lamps called diyas', objectWord: 'a diya (a small clay lamp)' },
    { id: 'new-year', object: 'envelope', teacher: 'Lunar New Year: a grandmother gives a child a red envelope, with a little money inside for good luck (red lanterns, a bowl of oranges)', objectWord: 'a red envelope' },
  ],
  /** two objects a child could tie to the wrong scene (a flame, a sweet): never side by side on level 1 */
  TRADITION_CONFUSABLE: [['diya', 'birthday'], ['pie', 'birthday']],
  PARTY_HAT: lib('accessories', 'party_hat'),
  /** the pie is DRAWN (a pumpkin pie; the library pie is a red lattice pie, which reads as cherry: review round 1) */
  /** K-716 long ago and today: each old thing does the SAME job as its new partner */
  THEN_NOW: [
    { id: 'wash', job: 'washing clothes', old: 'washboard', now: 'washer', nowPic: lib('around the house', 'washing_machine'), teacher: 'a washboard and tub / a washing machine' },
    { id: 'light', job: 'light at night', old: 'candle', now: 'lamp', nowPic: lib('around the house', 'lamp'), teacher: 'a candle in a holder / a lamp' },
    { id: 'ride', job: 'getting around', old: 'buggy', now: 'car', teacher: 'a horse and buggy / a car' },
    { id: 'phone', job: 'talking to someone far away', old: 'wall-phone', now: 'cell-phone', teacher: 'a telephone on the wall, with a cord / a cell phone' },
  ],
  /** K-717 choosing one thing: two good things a child cannot both have (ANY choice is right) */
  CHOICES: [
    { id: 'recess', lead: 'recess', a: lib('activities', 'playground'), b: lib('activities', 'painting'), teacher: 'At recess you have time for one: play outside or paint.' },
    { id: 'coin-toy', lead: 'coin', a: lib('toys', 'ball'), b: lib('toys', 'kite'), teacher: 'You have one coin. It buys a ball or a kite.' },
    { id: 'book', lead: 'book', a: 'truck-book', b: 'dino-book', teacher: 'You can take home one library book: trucks or dinosaurs.' },
    { id: 'coin-treat', lead: 'coin', a: lib('desserts and sweets', 'ice_cream'), b: lib('summer', 'lemonade'), teacher: 'You have one coin. It buys an ice cream or a lemonade.' },
  ],
  TRUCK: lib('toys', 'truck'),
  DINO: lib('toys', 'dinosaur'),
  /** K-718 workers and what they make or do. The workers are DRAWN (each with the things that show the job, never the
   *  thing it makes), in varied skin tones: the library's occupations pictures are all light-skinned. */
  WORKERS: [
    { id: 'baker', result: 'bread', resultPic: lib('thanksgivinng', 'bread'), makes: 'goods' },
    { id: 'builder', result: 'house', resultPic: lib('miscellaneous', 'house'), makes: 'goods' },
    { id: 'barber', result: 'haircut', makes: 'service' },
    { id: 'mail-carrier', result: 'letter', mailbox: lib('around the house', 'mailbox'), letterPic: lib('post office', 'envelope'), makes: 'service' },
  ],
  /** K-719 the flag of the United States (Executive Order 10834): 13 stripes, 7 red and 6 white, red at the top and the
   *  bottom; the canton over the top 7 stripes, 0.76 of the hoist wide; 50 stars in 9 rows of 6 and 5; hoist : fly = 10 : 19 */
  FLAG: { stripes: 13, red: 7, white: 6, stars: 50, rows: [6, 5, 6, 5, 6, 5, 6, 5, 6], fly: 1.9, cantonStripes: 7, cantonW: 0.76, starD: 0.0616, E: 0.054, G: 0.063, red_: '#B22234', blue_: '#3C3B6E', countWrong: [10, 11, 12, 14, 15] },
  /** K-721 fair or not: each pair the SAME moment, one fair and one not */
  FAIR: [
    { id: 'swing', fair: 'turns', unfair: 'keep', teacher: 'One child keeps the swing while others wait / children take turns.' },
    { id: 'crackers', fair: 'shared', unfair: 'all', teacher: 'One child gets all the crackers / the crackers are shared the same.' },
    { id: 'game', fair: 'everyone', unfair: 'left-out', teacher: 'One child is left out of the game / everyone plays.' },
  ],
  FAIR_FIX: { id: 'crayons-all', teacher: 'One child has all the crayons.' },
  /** K-722 the globe: the ocean dots (level 1) and the land / water key */
  GLOBE_KEY: { water: '#2B6CB0', land: '#3F9B4B' },
  /** the globe's land (generated: data/social/globe-americas.js; Natural Earth, orthographic, the Americas facing) */
  GLOBE_DATA: () => require('./globe-americas.js'),
  /** level 1's green dots, one in each big land shape (two in the Americas: North and South), each at the point of the
   *  shape farthest from its coast (and from the globe's edge), r under that clearance; computed by
   *  lcs-stage-d/batch-sk/work/r1/land-dots.js from globe-americas.js; the gate re-checks each against the land data */
  LAND_DOTS: [
    { ring: 'americas', x: 376, y: 236, r: 22 },
    { ring: 'americas', x: 678, y: 686, r: 22 },
    { ring: 'africa-eurasia', x: 947, y: 354, r: 22 },
    { ring: 'greenland', x: 614, y: 75, r: 18 },
  ],
  /** review round 2: a green dot is never smaller than this (r, view units of the 1000-wide globe): a smaller one read as a
   *  printing speck, not a start dot */
  LAND_DOT_MIN_R: 16,
  /** the big land shapes level 1 draws WITHOUT a green dot, and why: none of them can hold a dot of LAND_DOT_MIN_R (the gate
   *  measures each one's widest point from the land data); the instruction does not need every island */
  LAND_NODOT: { island: 'Baffin Island, a thin shape at the globe’s edge: its widest inner circle has r 10 (measured by the gate), so a dot there read as a speck (r 7 in round 1)' },
  /** K-723 the neighborhood: the places; the houses' doors: ONE red door (the start house, on the map only), every other
   *  house's door plain brown on the map and in the key (review round 1: coloured doors on the map against the key's red
   *  door made the blue-door house "not a house") */
  HOODS: { places: ['school', 'park', 'fire-station', 'store'], doors: ['red', 'plain', 'plain', 'plain'], keyDoor: 'plain', doorColor: { red: '#D9534F', plain: '#8B5E3C' } },
  /** K-724 hot place, cold place: where people would use each thing (one place each) */
  PLACE_ITEMS: [
    { id: 'coat', pic: lib('winter', 'coat'), place: 'cold' },
    { id: 'mittens', pic: lib('winter', 'mittens'), place: 'cold' },
    { id: 'sled', pic: lib('winter', 'sled'), place: 'cold' },
    { id: 'winter-hat', pic: lib('winter', 'hat'), place: 'cold' },
    { id: 'snow-boots', pic: lib('clothing', 'snow_boots'), place: 'cold' },
    { id: 'swimsuit', pic: lib('beach', 'swimsuit'), place: 'hot' },
    { id: 'sandals', pic: lib('summer', 'sandals'), place: 'hot' },
    { id: 'beach-ball', pic: lib('summer', 'beach_ball'), place: 'hot' },
    { id: 'flip-flops', pic: lib('summer', 'flip-flops'), place: 'hot' },
  ],
  /** K-725 who helps at our school: each problem has ONE helper (the gate's own table decides) */
  HELPERS: [
    { id: 'nurse', draw: 'nurse', problem: 'knee', teacher: 'the school nurse', problemWord: 'a hurt knee' },
    { id: 'librarian', draw: 'librarian', problem: 'book', teacher: 'the librarian', problemWord: 'I want a book about dinosaurs' },
    { id: 'custodian', draw: 'custodian', problem: 'spill', teacher: 'the custodian', problemWord: 'a big spill on the classroom floor' },
    { id: 'cafeteria', draw: 'cook', problem: 'lunch', teacher: 'the cafeteria cook', problemWord: 'I need a hot lunch' },
    { id: 'office', draw: 'office', problem: 'pickup', teacher: 'the office', problemWord: 'my grown-up comes to take me home early' },
  ],
  HELPER_L1: ['nurse', 'librarian', 'cafeteria'],
  /** K-726 our class vote: the book covers on the ballot (library pictures on drawn covers) */
  VOTE_BOOKS: [
    { id: 'bear', pic: lib('toys', 'teddy_bear'), cover: '#F4C542' },
    { id: 'dino', pic: lib('toys', 'dinosaur'), cover: '#7EC8E3' },
    { id: 'rocket', pic: lib('space', 'rocket'), cover: '#C3A6E0' },
    { id: 'truck', pic: lib('toys', 'truck'), cover: '#9CCB7C' },
    { id: 'cat', pic: lib('pets', 'cat'), cover: '#F3B7A6' },
  ],
  /** K-726 (review round 1 ruling): the whole class votes together, so each book's bar holds 20 boxes numbered 1 to 20
   *  (Kindergarten counts to 20, K.CC.B.5; never a 0); the tie rule names a tie for the MOST votes */
  VOTE_BOXES: 20,
  VOTE_TIE_RULE: 'If two books tie for the most votes, we vote again on just those two.',
  /** refused library pictures (the gate refuses them by name) */
  REFUSED: {
    'occupations/nurse': 'a cap with a red cross (US school nurses wear scrubs; the emblem is protected)',
    'hospital/nurse': 'a cap with a red cross',
    'occupations/mail_carrier': 'a red shirt and a box: reads as a delivery driver',
    'occupations/mail_carrier_2': 'a red shirt and a box: reads as a delivery driver',
    'vehicles/car': 'an old-style car (it reads as long ago)',
    'toys/car': 'an old-style car',
    'around the house/telephone': 'a desk dial phone: neither a wall phone nor a cell phone',
    'christmas/candle': 'a Christmas candle with holly, no holder',
    '4th of July/flag': 'a colour picture of the flag on a pole (not line art, not to the flag’s proportions)',
    'occupations/librarian': 'a woman with a book: reads as a teacher',
    'occupations/mail_carrier_x': '',
  },
};
