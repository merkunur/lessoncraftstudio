/**
 * data/social/dk-social-1.js — the bank of the Batch S1 Grade 1 social studies pages (G1-653 .. G1-669; factory
 * types/_shared/dk-social-1.js, drawings dk-social-1-art.js; Daily Teaching System Stage D-5, 2026-11-24). English
 * (American) only.
 *
 * Every closed item carries its ONE right answer here; the gate (qa/verify-dk-social-1.js) re-derives each from its own
 * tables and never trusts these words. Library pictures are named by { theme, noun } only (nothing is looked up while
 * this module loads). `data/` is gitignored: this file needs `git add -f`.
 */
'use strict';
const lib = (theme, noun) => ({ theme, noun });

module.exports = {
  /** G1-653 rules in different places: each rule fits ONE of the four places; the clue is the ACTION the rule asks for
   *  (never an object drawn in the place picture: a picture match is not reading) */
  RULES: [
    { id: 'hand', place: 'classroom', text: 'Raise your hand to talk.', clue: 'raised-hand' },
    { id: 'quiet', place: 'library', text: 'Use a quiet voice with books.', clue: 'quiet-voice' },
    { id: 'walk', place: 'pool', text: 'Walk, do not run. The floor is wet.', clue: 'walking-feet' },
    { id: 'wait', place: 'street', text: 'Wait for the walk sign.', clue: 'walk-sign' },
  ],
  PLACES: ['classroom', 'library', 'pool', 'street'],
  /** level 3's playground rule: the library playground picture beside the frame */
  PLAYGROUND: lib('activities', 'playground'),
  /** review round 1: a rule never prints the word of a place card, and a place card never holds a word of a rule ("the
   *  crosswalk" held "walk", the word of two rules): the street is "the street" */
  PLACE_WORD: { classroom: 'the classroom', library: 'the library', pool: 'the pool', street: 'the street' },
  /** two places whose rules a child could swap (books are in a classroom too, and a hand goes up at library story time):
   *  never the two places of a level-1 page */
  RULE_CONFUSABLE: [['classroom', 'library']],
  /** G1-654 being a good citizen: a short story, the good-citizen choice and the other one, the virtue it shows, and
   *  every virtue a child could DEFEND for it (the distractor printed beside the right word comes from the others) */
  CITIZEN: [
    // review round 1: the lunch box story left only "fair" to print as the wrong word, and a child can defend "fair"
    // (keeping what is not yours is not fair to its owner). Owning up to a spill: honest; a child can also defend
    // responsible (she owns her mistake) and fair (no one else is blamed); never kind, the word printed beside it.
    { id: 'paint', name: 'Maya', virtue: 'honest', defensible: ['honest', 'responsible', 'fair'],
      story: 'Maya spills the paint. The teacher asks who did it.', good: 'She says, “I did it.”', not: 'She says, “Not me.”' },
    { id: 'alone', name: 'Sam', virtue: 'kind', defensible: ['kind', 'fair'],
      story: 'Sam sees a child sitting alone at recess.', good: 'He asks the child to play.', not: 'He runs off to play.' },
    { id: 'fish', name: 'Lee', virtue: 'responsible', defensible: ['responsible', 'kind'],
      story: 'It is Lee’s day to feed the class fish.', good: 'Lee feeds the fish.', not: 'Lee plays and forgets.' },
    { id: 'ball', name: 'Ana', virtue: 'fair', defensible: ['fair', 'kind'],
      story: 'Ana’s group has one ball.', good: 'They take turns.', not: 'Ana keeps the ball.' },
  ],
  VIRTUES: ['honest', 'kind', 'responsible', 'fair'],
  /** level 3's open situation (no right answer: the child writes what they would do) */
  CITIZEN_MORE: { id: 'crayons', text: 'A friend drops a box of crayons.' },
  /** G1-655 leaders and what they lead (the gate's own table decides) */
  LEADERS: [
    { id: 'principal', leads: 'school', word: 'principal', says: 'I lead a school.' },
    { id: 'mayor', leads: 'town', word: 'mayor', says: 'I lead a town or a city.' },
    { id: 'governor', leads: 'state', word: 'governor', says: 'I lead a state.' },
    { id: 'president', leads: 'country', word: 'president', says: 'I lead the whole country.' },
  ],
  LEAD_WORD: { school: 'a school', town: 'a town', state: 'a state', country: 'our whole country' },
  /** the state colored on the state card (Colorado: a state whose lines are straight; the teacher names our own state) */
  STATE_SHOWN: 'Colorado',
  /** G1-656 the old postcard: the clues printed on it (a name on the back, a date stamp, a sign in the picture) */
  POSTCARDS: [
    { town: 'Riverton', studio: 'Lee Studio', shop: 'Main Street Bakery', year: 1955, otherTowns: ['Lakeview', 'Pine Hill', 'Oak Falls'], otherYears: [1925, 1985, 2005] },
    { town: 'Maple Falls', studio: 'Rosa Photo Shop', shop: 'Main Street Toys', year: 1952, otherTowns: ['Riverton', 'Sandy Bay', 'Elm Creek'], otherYears: [1912, 1982, 2012] },
    { town: 'Cedar Hill', studio: 'Hill Photo Studio', shop: 'Main Street Diner', year: 1958, otherTowns: ['Bayside', 'Fox Run', 'Maple Falls'], otherYears: [1918, 1988, 2008] },
    { town: 'Bayside', studio: 'Park Photo Studio', shop: 'Main Street Shoes', year: 1950, otherTowns: ['Cedar Hill', 'Lakeview', 'Rock Ridge'], otherYears: [1920, 1980, 2010] },
  ],
  POSTCARD_QUESTIONS: ['who', 'when', 'where'],
  /** G1-657 ask someone older: the question starters and their picture clues (a record page: nothing is wrong) */
  INTERVIEW: [
    // review round 1: every question asks about the past ("What did you eat for lunch?" alone is answered about today)
    { id: 'games', q: 'When you were little, what games did you play?', clue: 'games' },
    { id: 'school', q: 'When you were little, how did you get to school?', clue: 'to-school' },
    { id: 'lunch', q: 'When you were little, what did you eat for lunch?', clue: 'lunch' },
  ],
  /** G1-658 school and play long ago (about 100 years ago) and today: pictures that do the SAME job, and sentences in a
   *  child's voice; each one fits one time only (the gate's own table). Review round 1: a label never says the time ("a
   *  school today" printed the answer) and a long-ago label never fits today ("a pen and ink": children use ink pens) */
  THEN_NOW_PICS: [
    { id: 'schoolhouse', time: 'long ago', job: 'school', word: 'a one-room school' },
    { id: 'school-today', time: 'today', job: 'school', word: 'a big school' },
    { id: 'pen-ink', time: 'long ago', job: 'writing', word: 'a pen you dip in ink' },
    { id: 'laptop', time: 'today', job: 'writing', word: 'a computer' },
    { id: 'walk-pail', time: 'long ago', job: 'getting to school', word: 'walking to school with a tin pail' },
    { id: 'school-bus', time: 'today', job: 'getting to school', word: 'a school bus', pic: lib('vehicles', 'school_bus') },
    { id: 'hoop', time: 'long ago', job: 'play', word: 'a hoop and stick' },
    { id: 'tablet-game', time: 'today', job: 'play', word: 'a game on a tablet' },
  ],
  /** review round 2: `pair` = the picture that shows the same thing; a page never deals both halves of a pair (the same
   *  fact asked twice, and a page with less to think about) */
  THEN_NOW_SENTENCES: [
    { id: 'ink', time: 'long ago', text: 'I dip my pen in ink.', pair: 'pen-ink' },
    { id: 'one-room', time: 'long ago', text: 'Big and little children learn in one room.', pair: 'schoolhouse' },
    { id: 'pail', time: 'long ago', text: 'I carry my lunch in a tin pail.', pair: 'walk-pail' },
    { id: 'slate', time: 'long ago', text: 'I write on a small slate.' },
    { id: 'bus', time: 'today', text: 'I ride the yellow school bus.', pair: 'school-bus' },
    { id: 'type', time: 'today', text: 'I type on a computer at school.', pair: 'laptop' },
    { id: 'tablet', time: 'today', text: 'I play a game on a tablet.', pair: 'tablet-game' },
    { id: 'video', time: 'today', text: 'We watch a video in class.' },
  ],
  /** G1-659 three communities: each sentence fits ONE picture, by a thing drawn in that picture only, and NAMES that
   *  thing (review round 1: "the houses have yards" and "the big store" fit a farm town too) */
  COMMUNITIES: [
    { id: 'city', word: 'a city' },
    { id: 'suburb', word: 'a suburb' },
    { id: 'town', word: 'a farm town' },
  ],
  COMMUNITY_SENTENCES: [
    { id: 'subway', place: 'city', text: 'I ride the subway to work.', drawn: 'subway' },
    { id: 'tall', place: 'city', text: 'We live in a tall apartment building.', drawn: 'apartment-building' },
    { id: 'store', place: 'suburb', text: 'We drive to the shopping center near our street.', drawn: 'shopping-center' },
    // review round 2: "Our house is near a shopping center." repeated the other suburb sentence (two shopping-center clues,
    // none about the houses) and the farm town's main street has shops too: a garage is drawn on the suburb's houses ONLY
    { id: 'garage', place: 'suburb', text: 'Our house has a garage for our car.', drawn: 'garage' },
    { id: 'corn', place: 'town', text: 'We grow corn on our land.', drawn: 'corn-field' },
    { id: 'silo', place: 'town', text: 'We keep our grain in a tall silo.', drawn: 'grain-silo' },
  ],
  /** G1-660 work that fits the land: each worker's work is done in ONE of the four places (the gate's own table) */
  LAND_WORK: [
    { id: 'fisher', land: 'coast', worker: 'a person who fishes', land_word: 'the ocean coast', has: 'the ocean and its fish' },
    { id: 'lumber', land: 'forest', worker: 'a lumber worker', land_word: 'a forest', has: 'many tall trees' },
    { id: 'farmer', land: 'farmland', worker: 'a wheat farmer', land_word: 'flat farmland', has: 'flat, rich soil' },
    { id: 'ski', land: 'mountains', worker: 'a ski teacher', land_word: 'snowy mountains', has: 'snow on steep hills' },
  ],
  /** G1-661 caring for our park: what careless people changed (evening) and how people helped on clean-up day (one help
   *  for each change). Every change is a person's doing, never the weather. Review round 1: each change is ONE thing in
   *  one place (three wrappers were three things to circle for one change), so the number asked is the number of things
   *  to circle; the branch broke under a rope swing (people's doing, not the wind). */
  PARK_CHANGES: [
    { id: 'wrapper', help: 'pick-up', word: 'a candy wrapper on the grass' },
    { id: 'cup', help: 'pick-up-bench', word: 'a cup left on the bench' },
    { id: 'bag', help: 'net', word: 'a plastic bag in the pond' },
    { id: 'branch', help: 'carry-branch', word: 'a branch broken by a rope swing' },
    { id: 'flowers', help: 'plant', word: 'flowers stepped on' },
    { id: 'can', help: 'stand-can', word: 'the trash can knocked over' },
  ],
  /** G1-662 symbols of the United States: the name, the clue sentence (it never says the name), the picture */
  SYMBOLS: [
    { id: 'flag', name: 'flag', clue: 'It has 50 stars, one for each state.' },
    { id: 'eagle', name: 'bald eagle', clue: 'It is our national bird.', pic: lib('birds', 'eagle') },
    { id: 'statue', name: 'Statue of Liberty', clue: 'It stands for freedom.', pic: lib('4th of July', 'statue') },
    { id: 'bell', name: 'Liberty Bell', clue: 'It has a crack. It is in Philadelphia.' },
  ],
  /** G1-663 sources about George Washington and Abraham Lincoln: the kind of source and the ONE president it is about */
  SOURCES: [
    { id: 'painting', kind: 'painting', about: 'Washington' },
    { id: 'quarter', kind: 'coin', about: 'Washington' },
    { id: 'letter', kind: 'letter', about: 'Lincoln' },
    { id: 'memorial', kind: 'building', about: 'Lincoln' },
  ],
  PRESIDENTS: { Washington: 'George Washington', Lincoln: 'Abraham Lincoln' },
  /** a quarter is 24.26 mm across: drawn at its real size (96 px to the inch) */
  QUARTER_MM: 24.26,
  /** G1-664 why we have the Fourth of July: reasons the colonists gave, and sentences that are plainly not */
  JULY4: [
    { id: 'laws', real: true, text: 'They wanted to make their own laws.' },
    { id: 'taxes', real: true, text: 'They did not want to pay taxes they had no say in.' },
    { id: 'leaders', real: true, text: 'They wanted to choose their own leaders.' },
    { id: 'king', real: false, text: 'They wanted a new king.' },
    { id: 'move', real: false, text: 'They wanted to move to Great Britain.' },
    { id: 'more-taxes', real: false, text: 'They wanted to pay more taxes to the king.' },
  ],
  /** G1-665 people who made life fairer: one true, simple, kind sentence each (no violence, no death); a small scene
   *  that tells them apart, never a portrait */
  FAIRER: [
    { id: 'parks', name: 'Rosa Parks', fact: 'Rosa Parks would not give up her seat on a bus in Montgomery, Alabama, in 1955.' },
    { id: 'bridges', name: 'Ruby Bridges', fact: 'Ruby Bridges was the first Black child at her New Orleans school in 1960.' },
    { id: 'keller', name: 'Helen Keller', fact: 'Helen Keller could not see or hear. She wrote books and worked for people with disabilities.' },
    { id: 'king', name: 'Martin Luther King Jr.', fact: 'Martin Luther King Jr. led peaceful marches for fair laws.' },
  ],
  /** G1-666 goods (things people make or grow) and services (work someone does for you) */
  GOODS_SERVICES: [
    { id: 'bread', kind: 'good', word: 'bread', pic: lib('At the Supermarket', 'bread') },
    { id: 'milk', kind: 'good', word: 'milk', pic: lib('At the Supermarket', 'milk') },
    { id: 'bananas', kind: 'good', word: 'bananas', pic: lib('At the Supermarket', 'banana') },
    { id: 't-shirt', kind: 'good', word: 'a T-shirt', pic: lib('clothing', 't-shirt') },
    { id: 'apples', kind: 'good', word: 'apples', pic: lib('At the Supermarket', 'apple') },
    { id: 'kite', kind: 'good', word: 'a kite', pic: lib('toys', 'kite') },
    { id: 'haircut', kind: 'service', word: 'a haircut' },
    { id: 'checkup', kind: 'service', word: 'a checkup at the doctor' },
    { id: 'bus-ride', kind: 'service', word: 'a bus ride' },
    { id: 'story-time', kind: 'service', word: 'story time at the library' },
    { id: 'mail', kind: 'service', word: 'mail brought to your home' },
    { id: 'teeth', kind: 'service', word: 'a tooth cleaning' },
  ],
  GOODS_KEY: { good: { word: 'goods', color: 'yellow', hex: '#F4C542' }, service: { word: 'services', color: 'green', hex: '#6BB36B' } },
  /** the sample town (level 3): where each good on a label comes from */
  TOWN_GOODS: [
    { id: 'bread', local: true, label: 'Bread: baked in our town.', pic: lib('At the Supermarket', 'bread') },
    { id: 'milk', local: true, label: 'Milk: from our town’s farm.', pic: lib('At the Supermarket', 'milk') },
    { id: 'apples', local: true, label: 'Apples: picked in our town.', pic: lib('At the Supermarket', 'apple') },
    { id: 'bananas', local: false, label: 'Bananas: grown far away in Ecuador.', pic: lib('At the Supermarket', 'banana') },
    { id: 'pineapple', local: false, label: 'Pineapple: grown far away in Costa Rica.', pic: lib('At the Supermarket', 'pineapple') },
  ],
  /** G1-667 jobs and earning money: what each worker is paid for (the gate's own table) */
  JOBS: [
    { id: 'baker', says: 'I am paid to bake bread.' },
    { id: 'bus-driver', says: 'I am paid to drive people.' },
    { id: 'dentist', says: 'I am paid to check teeth.' },
    { id: 'farmer', says: 'I am paid for the food I grow and sell.' },
  ],
  /** what a family may spend its pay on, and what money cannot buy (plainly, to a first grader) */
  SPEND: [
    { id: 'food', buy: true, word: 'food' },
    { id: 'home', buy: true, word: 'rent for a home' },
    { id: 'clothes', buy: true, word: 'clothes' },
    { id: 'shoes', buy: true, word: 'shoes' },
    { id: 'sun', buy: false, word: 'the sun' },
    { id: 'hug', buy: false, word: 'a hug' },
    { id: 'rainbow', buy: false, word: 'a rainbow' },
  ],
  /** G1-668 saving for a goal: one dollar a week; the goal by level (dollars) */
  SAVE_GOALS: [
    { id: 'kite', word: 'a kite', pic: lib('toys', 'kite') },
    { id: 'ball', word: 'a ball', pic: lib('toys', 'ball') },
    { id: 'book', word: 'a book', pic: lib('classroom', 'book') },
  ],
  SAVE_PRICE: { 1: 3, 2: 5, 3: 5 },
  SAVE_NAMES: ['Kim', 'Leo', 'Nia', 'Ben'],
  SAVE_WHY: { right: 'to buy it later', wrong: 'to spend it all today' },
  /** G1-670 prices at the market (en-1-036, D2.Eco.5.K-2; review round 1, replacing the G2-472 alias): the US coins at
   *  their REAL diameters (US Mint: penny 19.05 mm, nickel 21.21 mm, dime 17.91 mm, quarter 24.26 mm), drawn as the real
   *  coins (never a numbered circle); the market's things (library pictures, colour); the coins and prices of each level */
  US_COINS: [
    { id: 'penny', cents: 1, mm: 19.05, word: 'penny' },
    { id: 'nickel', cents: 5, mm: 21.21, word: 'nickel' },
    { id: 'dime', cents: 10, mm: 17.91, word: 'dime' },
    { id: 'quarter', cents: 25, mm: 24.26, word: 'quarter' },
  ],
  MARKET_ITEMS: [
    { id: 'apple', word: 'an apple', pic: lib('At the Supermarket', 'apple') },
    { id: 'pear', word: 'a pear', pic: lib('At the Supermarket', 'pear') },
    { id: 'orange', word: 'an orange', pic: lib('At the Supermarket', 'orange') },
    { id: 'banana', word: 'a banana', pic: lib('At the Supermarket', 'banana') },
    { id: 'cookie', word: 'a cookie', pic: lib('bakery', 'cookie') },
    { id: 'pencil', word: 'a pencil', pic: lib('classroom', 'pencil') },
    { id: 'eraser', word: 'an eraser', pic: lib('classroom', 'eraser') },
    { id: 'crayon', word: 'a crayon', pic: lib('classroom', 'crayon') },
    { id: 'ruler', word: 'a ruler', pic: lib('classroom', 'ruler') },
    { id: 'notebook', word: 'a notebook', pic: lib('classroom', 'notebook') },
  ],
  /** by level: the coins on the page, the price range (cents), the most coins of one kind on a tray (level 1: one nickel) */
  MARKET_LEVEL: {
    // level 1: 3 to 9 cents (10 cents would take the whole tray of one nickel and five pennies: nothing left to choose)
    1: { coins: ['penny', 'nickel'], min: 3, max: 9, maxOf: { nickel: 1, penny: 5 } },
    2: { coins: ['penny', 'nickel', 'dime'], min: 6, max: 25, maxOf: { dime: 2, nickel: 2, penny: 5 } },
    3: { coins: ['penny', 'nickel', 'dime', 'quarter'], min: 11, max: 50, maxOf: { quarter: 2, dime: 3, nickel: 2, penny: 4 } },
  },
  /** G1-669 our class meeting: the three picture talking rules and the speaking frame (a record page) */
  TALK_RULES: [
    { id: 'one-voice', text: 'One voice at a time.' },
    { id: 'look', text: 'Look at the speaker.' },
    { id: 'wait', text: 'Wait for your turn.' },
  ],
  /** jobs every first-grade class has (review: "fish feeder" fits only a class with fish) */
  CLASS_JOBS: ['line leader', 'door holder', 'paper passer', 'board cleaner', 'supply helper', 'messenger'],
};
