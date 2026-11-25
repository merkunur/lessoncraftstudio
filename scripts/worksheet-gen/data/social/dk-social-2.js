/**
 * data/social/dk-social-2.js — the bank of the Batch S2 Grade 2 social studies pages (G2-614 .. G2-630; factory
 * types/_shared/dk-social-2.js, drawings dk-social-2-art.js, maps data/social/dk-social-2-geo.js; Daily Teaching System
 * Stage D-5, 2026-11-25). English (American) only.
 *
 * Every closed item carries its ONE right answer here; the gate (qa/verify-dk-social-2.js) re-derives each from its own
 * tables and never trusts these words. Library pictures are named by { theme, noun } only (nothing is looked up while
 * this module loads). Sentences a child reads are about 12 words or fewer. `data/` is gitignored: this file needs
 * `git add -f`.
 */
'use strict';
const lib = (theme, noun) => ({ theme, noun });

module.exports = {
  /* ---------------------------------------------------------------- G2-614 my view, your view (a record page) */
  /** the class rules a child may pick (level 1: four of them as picture choices); none is right or wrong */
  VIEW_RULES: [
    { id: 'kind', text: 'Be kind to others.' },
    { id: 'turns', text: 'Take turns.' },
    { id: 'listen', text: 'Listen when others talk.' },
    { id: 'clean', text: 'Clean up after yourself.' },
    { id: 'hands', text: 'Keep your hands to yourself.' },
    { id: 'walk', text: 'Walk in the hallway.' },
  ],
  /** level 1's word box for "because it helps us ___." (any word is a good answer) */
  VIEW_WORDS: ['learn', 'feel safe', 'play', 'be friends', 'get along'],
  VIEW_PARTS: ['Only me', 'Both of us', 'Only my partner'],

  /* ---------------------------------------------------------------- G2-615 laws in our community */
  /** each law prevents ONE problem. No problem shares a word with any law (a child would match word to word): the
   *  design's "a dog chasing children" shared "dog" with the leash law and "trash in the park" shared "park" with it */
  LAWS: [
    { id: 'red', text: 'Stop at a red light.', problem: 'crash' },
    { id: 'leash', text: 'Keep dogs on a leash in the park.', problem: 'chase' },
    { id: 'litter', text: 'Do not litter.', problem: 'trash' },
    { id: 'helmet', text: 'Wear a helmet on a bike.', problem: 'head' },
  ],
  PROBLEMS: { crash: 'crashes at corners', chase: 'a pet chasing children', trash: 'trash on the ground', head: 'a hurt head' },
  /** two laws a child could argue over on a page of two (a crash can hurt a head): never the two laws of level 1 */
  LAW_CONFUSABLE: [['red', 'helmet']],

  /* ---------------------------------------------------------------- G2-616 local, state and national government */
  GOV_DEFINITION: 'A government is the people who make laws and run services for a place.',
  /** every leader is a role, never a person's likeness */
  GOV_LEADERS: [
    { id: 'mayor', word: 'the mayor', level: 'local', group: false },
    { id: 'council', word: 'the city council', level: 'local', group: true },
    { id: 'governor', word: 'the governor', level: 'state', group: false },
    { id: 'president', word: 'the president', level: 'national', group: false },
    { id: 'congress', word: 'Congress', level: 'national', group: true },
  ],
  GOV_LEVELS: [
    { id: 'national', word: 'National', place: 'our country' },
    { id: 'state', word: 'State', place: 'our state' },
    { id: 'local', word: 'Local', place: 'our town or city' },
  ],

  /* ---------------------------------------------------------------- G2-617 services our government provides */
  /** the places of the town picture: what each is (a service of the government, or a business) and the sign it carries */
  SERVICE_PLACES: [
    { id: 'library', kind: 'service', word: 'library', sign: 'LIBRARY' },
    { id: 'park', kind: 'service', word: 'park', sign: 'PARK' },
    { id: 'fire', kind: 'service', word: 'fire station', sign: 'FIRE STATION' },
    { id: 'road', kind: 'service', word: 'road repair', sign: 'ROAD WORK' },
    { id: 'school', kind: 'service', word: 'public school', sign: 'SCHOOL' },
    { id: 'mail', kind: 'service', word: 'mail carrier', sign: null },
    { id: 'toys', kind: 'business', word: 'toy store', sign: 'TOY STORE' },
    { id: 'pizza', kind: 'business', word: 'pizza shop', sign: 'PIZZA' },
  ],

  /* ---------------------------------------------------------------- G2-618 how places change */
  /** each pair: who changed the place (nature or people) and the sentence under it. Review of the design: "The land
   *  changed" / "The way people live changed" let a child defend "the land changed" for the village that became a city
   *  (its land is covered with streets now): the two choices are "Nature changed this place." / "People changed this
   *  place." No sentence says "nature" or "people"; the times ("long ago and today", "in winter and in summer") are mixed
   *  across the two kinds, so the words of the time never tell the kind. */
  PLACE_CHANGES: [
    { id: 'hill', kind: 'nature', text: 'A hill in winter and in spring: the trees grow new leaves.' },
    { id: 'desert', kind: 'nature', text: 'A desert, dry and after a rare rain: flowers bloom.' },
    { id: 'pond', kind: 'nature', text: 'A pond in winter and in spring: the ice melts.' },
    { id: 'beach', kind: 'nature', text: 'A beach long ago and today: the waves washed sand away.' },
    { id: 'village', kind: 'people', text: 'A fishing village long ago and today: it became a city.' },
    { id: 'field', kind: 'people', text: 'A field long ago and today: it became a neighborhood.' },
    { id: 'garden', kind: 'people', text: 'An empty lot in spring and in summer: neighbors planted a garden.' },
  ],
  CHANGE_CHOICES: { nature: 'Nature changed this place.', people: 'People changed this place.' },

  /* ---------------------------------------------------------------- G2-619 when disaster strikes */
  /** the three things the flood changed (the only differences between the two pictures; the sandbags the neighbors put
   *  out before the rain are in both pictures: getting ready) */
  FLOOD_CHANGES: ['road-water', 'school-closed', 'boat-helpers'],
  /** what a family keeps in an emergency kit (every word of the bank is right: the child picks four) */
  KIT: [
    { id: 'water', word: 'water', pic: lib('At the Supermarket', 'water') },
    { id: 'flashlight', word: 'a flashlight', pic: lib('camping', 'flashlight') },
    { id: 'food', word: 'canned food', pic: lib('At the Supermarket', 'can') },
    { id: 'first-aid', word: 'a first-aid kit', pic: null },
    { id: 'batteries', word: 'batteries', pic: null },
    { id: 'radio', word: 'a radio', pic: null },
    { id: 'medicine', word: 'medicine', pic: lib('hospital', 'medicine') },
  ],
  /** the three ocean coasts of the lower 48; hurricanes most often come ashore on the Atlantic and Gulf coasts */
  COASTS: [
    { id: 'pacific', word: 'Pacific coast', hurricanes: false },
    { id: 'gulf', word: 'Gulf coast', hurricanes: true },
    { id: 'atlantic', word: 'Atlantic coast', hurricanes: true },
  ],

  /* ---------------------------------------------------------------- G2-620 winter traditions families may keep */
  /** true, short and respectful sentences in the design's words ("many families", never "we all"); each with its symbol
   *  and the country where it BEGAN (review round 1: "where it is widely kept" had two answers, Las Posadas and Lunar New
   *  Year are widely kept in the United States too). The country is printed in the sentence where level 3 draws a line. */
  TRADITIONS: [
    { id: 'hanukkah', text: 'Many Jewish families light a menorah for the eight nights of Hanukkah.', symbol: 'menorah', country: 'ISR' },
    { id: 'christmas', text: 'Many Christian families celebrate Christmas, and some put up a decorated tree.', symbol: 'tree', country: null },
    { id: 'kwanzaa', text: 'Kwanzaa celebrates African American culture with seven candles on a kinara. It began in the United States.', symbol: 'kinara', country: 'USA' },
    { id: 'posadas', text: 'Las Posadas is a December tradition from Mexico. Families often break a piñata.', symbol: 'pinata', country: 'MEX' },
    { id: 'lunar', text: 'At Lunar New Year many families give red envelopes. It began in China.', symbol: 'red-envelope', country: 'CHN' },
  ],
  /** level 3: a line from each name to the country where it began (Las Posadas Mexico, Kwanzaa the United States, Lunar
   *  New Year China); the map also names two countries where none of the five traditions began */
  TRADITION_MAP: { lines: ['posadas', 'kwanzaa', 'lunar'], others: ['BRA', 'IND'] },
  TRADITION_TREE: lib('christmas', 'tree'),

  /* ---------------------------------------------------------------- G2-621 where does it come from? */
  /** sample labels (true: these are where most of each sold in the United States comes from, or a common label) */
  ORIGINS: [
    { id: 'banana', word: 'Bananas', label: 'grown in Ecuador', country: 'ECU', pic: lib('fruits', 'banana') },
    { id: 'avocado', word: 'Avocados', label: 'grown in Mexico', country: 'MEX', pic: lib('fruits', 'avocado') },
    { id: 'tshirt', word: 'T-shirt', label: 'made in Vietnam', country: 'VNM', pic: lib('clothing', 't-shirt') },
    { id: 'coffee', word: 'Coffee beans', label: 'grown in Colombia', country: 'COL', pic: null },
  ],
  /** countries the map names besides the four (a child reads the map to find the right one) */
  ORIGIN_MAP_OTHERS: ['CAN', 'BRA', 'PER', 'CHN', 'IND'],
  /** country names as the page prints them (Natural Earth's names, shortened where a child would not know the long form) */
  COUNTRY_WORD: { USA: 'United States', MEX: 'Mexico', ECU: 'Ecuador', COL: 'Colombia', VNM: 'Vietnam', CHN: 'China', BRA: 'Brazil', PER: 'Peru', CAN: 'Canada', IND: 'India', ISR: 'Israel' },

  /* ---------------------------------------------------------------- G2-622 made here, sold there */
  /** the brief's facts: the United States sells airplanes, soybeans and corn to other countries and buys bananas, cocoa
   *  and coffee. Each card's short fact tells where the thing is grown or made. */
  TRADE_GOODS: [
    { id: 'banana', word: 'bananas', way: 'in', fact: 'Bananas grow where it is hot all year, like Ecuador.', pic: lib('fruits', 'banana') },
    { id: 'cocoa', word: 'cocoa beans', way: 'in', fact: 'Cocoa beans for chocolate grow in Ghana.', pic: null },
    { id: 'coffee', word: 'coffee', way: 'in', fact: 'Coffee beans grow in Colombia and Brazil.', pic: null },
    { id: 'airplane', word: 'airplanes', way: 'out', fact: 'Many airplanes are built in factories in the United States.', pic: lib('vehicles', 'airplane') },
    { id: 'soybeans', word: 'soybeans', way: 'out', fact: 'Farmers in the United States grow lots of soybeans.', pic: null },
    { id: 'corn', word: 'corn', way: 'out', fact: 'The United States grows more corn than any other country.', pic: lib('vegetables', 'corn') },
  ],
  TRADE_ARROWS: { in: 'Made in other countries, sold here', out: 'Made here, sold in other countries' },

  /* ---------------------------------------------------------------- G2-623 why countries trade */
  /** each island makes one thing and needs one thing another island makes (level 2-3: the three of the design; level 1:
   *  two islands that need each other's thing) */
  ISLANDS: [
    { id: 'sunny', word: 'Sunny Island', makes: 'fruit', needs: 'fish' },
    { id: 'cold', word: 'Cold Island', makes: 'fish', needs: 'wool' },
    { id: 'hilly', word: 'Hilly Island', makes: 'wool', needs: 'fruit' },
  ],
  ISLANDS_TWO: [
    { id: 'sunny', word: 'Sunny Island', makes: 'fruit', needs: 'fish' },
    { id: 'cold', word: 'Cold Island', makes: 'fish', needs: 'fruit' },
  ],

  /* ---------------------------------------------------------------- G2-624 two stories of the same day */
  /** each day told by two people. Every sentence is wholly a fact BOTH tell (said in their own words) or wholly a fact
   *  only ONE tells: never a sentence that mixes the two (the design's "a volunteer ran the puppet show" was both and only
   *  one at once; "the line was long" and "two hundred people came" were two ways of one fact a child could call either).
   *  The two tell what each saw; neither is ever wrong. */
  ACCOUNTS: [
    {
      id: 'library', day: 'the day the new library opened',
      a: { who: 'Ava', title: 'Ava\'s story', role: 'girl', sex: 'f', sentences: [['open', 'Our new library opened on Saturday.'], ['grandpa', 'I went with my grandpa.'], ['crowd', 'Lots of people came.'], ['puppets', 'We watched a puppet show.'], ['card', 'I got my first library card!']] },
      b: { who: 'Ms. Lin', title: 'Ms. Lin\'s story', role: 'librarian', sex: 'f', sentences: [['open', 'The new library opened on Saturday.'], ['crowd', 'Many people came.'], ['shelves', 'Every shelf was full of books.'], ['puppets', 'There was a puppet show.'], ['volunteer', 'A volunteer ran it.']] },
    },
    {
      id: 'parade', day: 'the day of the town parade',
      a: { who: 'Leo', title: 'Leo\'s story', role: 'boy', sex: 'm', sentences: [['day', 'Our town had a parade on Sunday.'], ['shoulders', 'I sat on my dad\'s shoulders.'], ['band', 'A band played music.'], ['flag', 'I waved a little flag.'], ['truck', 'The fire truck came last.']] },
      b: { who: 'Mr. Diaz', title: 'Mr. Diaz\'s story', role: 'drummer', sex: 'm', sentences: [['day', 'The town parade was on Sunday.'], ['band', 'Our band played music.'], ['drum', 'My drum was heavy.'], ['walk', 'We walked a long way.'], ['truck', 'The fire truck came last.']] },
    },
    {
      id: 'playground', day: 'the day the new playground opened',
      a: { who: 'Sam', title: 'Sam\'s story', role: 'boy', sex: 'm', sentences: [['open', 'The new playground opened on Monday.'], ['sun', 'The sun was shining.'], ['race', 'My friend and I raced on the bridge.'], ['kids', 'Lots of kids came to play.'], ['back', 'I want to go back tomorrow.']] },
      b: { who: 'Ms. Cole', title: 'Ms. Cole\'s story', role: 'park worker', sex: 'f', sentences: [['open', 'The new playground opened on Monday.'], ['bolts', 'I checked every bolt that morning.'], ['sun', 'It was a sunny day.'], ['kids', 'Lots of kids came to play.'], ['chips', 'We put wood chips under the swings.']] },
    },
  ],
  ACCOUNT_KEY: { both: { word: 'Both stories say it', color: 'blue' }, one: { word: 'Only one story says it', color: 'orange' } },

  /* ---------------------------------------------------------------- G2-625 questions about an old photograph */
  /** a drawn sample photograph of a main street about 1910 (no real photograph, no real person); level 1 finds five things
   *  drawn in it */
  PHOTO_FIND: [
    { id: 'wagon', word: 'a horse and wagon' },
    { id: 'streetcar', word: 'a streetcar' },
    { id: 'car', word: 'an old car' },
    { id: 'hat', word: 'a man in a hat' },
    { id: 'bank', word: 'the bank' },
  ],
  PHOTO_CAPTION: 'Main Street, about 1910',

  /* ---------------------------------------------------------------- G2-626 why did the town change? */
  /** short histories of sample towns: four sentences of 12 words or fewer, EXACTLY ONE of which names both the reason and
   *  what grew (the clue a child copies); the reason the text supports, and the reasons it never mentions */
  TOWNS: [
    { id: 'railroad', town: 'Oak Bend', sentences: ['In 1880, Oak Bend had twelve farms and a few houses.', 'In 1885, a railroad station opened in town.', 'Farmers could now send their crops to the city by train.', 'Because of the railroad, new stores and houses were built.'], clue: 3, reason: 'The railroad came.' },
    { id: 'bridge', town: 'Mill River', sentences: ['In 1900, Mill River was a small town.', 'People had to row boats across the river.', 'In 1910, a bridge was built over the river.', 'Because of the bridge, many new families moved to town.'], clue: 3, reason: 'A bridge was built.' },
    { id: 'factory', town: 'Pine Hill', sentences: ['In 1920, Pine Hill had one store and one school.', 'In 1925, a shoe factory opened there.', 'Because of the factory\'s jobs, many families moved to Pine Hill.', 'Soon the town needed a second school.'], clue: 2, reason: 'A factory opened.' },
    { id: 'highway', town: 'Sandy Creek', sentences: ['In 1930, Sandy Creek was far from other towns.', 'In 1935, a new highway to the city was built.', 'Now trucks and cars could get there fast.', 'Because of the highway, new shops and homes were built.'], clue: 3, reason: 'A highway was built.' },
  ],
  /** reasons no history mentions, none of which makes a town grow */
  TOWN_WRONG: ['People liked the weather.', 'A big storm hit.', 'It snowed a lot.', 'A famous singer visited.'],

  /* ---------------------------------------------------------------- G2-627 tools and skills for the job */
  /** tools and machines (things) and skills (what a worker knows how to do, learned at school and by practice). Review
   *  round 1 (row 43): every card reads after "The baker uses or knows:"; a tool is named with what it is for, a skill
   *  in its own words ("how ...", "when ...", "which ...", "a way to ...", "a recipe ..."), so neither the first word
   *  nor the length of the words sorts the cards (the gate measures both over the copies) */
  PRODUCERS: [
    // review round 2 (REVIEW-2 rows 50-52): every tool says what it is for with "to", like most skills, so no single word
    // sorts the cards (the gate measures every word of this bank over 2,000 copies a level); "the steps to make bread"
    // lives only in the head (a recipe is a paper a child could call a tool); no skill's bubble shows a paper, a book or a
    // sign. Each tool: where the worker's hand grips it (grip, as a share of its box), its drawn ink in that box (ink:
    // x0 y0 x1 y1, measured from the library picture 2026-11-25), its box size, and flip (mirrored so it faces away from
    // the worker)
    { id: 'baker', word: 'a baker', tools: [
      { id: 'oven', word: 'an oven to bake bread', pic: lib('kitchen tools', 'oven'), big: true, size: 56, grip: [0.22, 0.44], ink: [0.088, 0.023, 0.902, 0.98] },
      { id: 'mixer', word: 'a mixer to mix dough', pic: lib('kitchen tools', 'mixer'), big: true, size: 54, grip: [0.12, 0.62], ink: [0.066, 0.029, 0.943, 0.975] },
      { id: 'rolling-pin', word: 'a rolling pin to roll dough', pic: lib('kitchen tools', 'rolling_pin'), size: 48, grip: [0.1, 0.68], ink: [0.025, 0.197, 0.977, 0.82] },
      { id: 'whisk', word: 'a whisk to beat eggs', pic: lib('kitchen tools', 'whisk'), size: 46, grip: [0.33, 0.78], ink: [0.186, 0.016, 0.801, 0.988] }],
      skills: [{ id: 'steps', word: 'the steps to make bread', think: 'steps' }, { id: 'bake-time', word: 'how long to bake bread', think: 'bread-done' }, { id: 'shape', word: 'a way to shape dough', think: 'dough' }] },
    { id: 'farmer', word: 'a farmer', tools: [
      { id: 'tractor', word: 'a tractor to plow the field', pic: lib('vehicles', 'tractor'), big: true, size: 56, grip: [0.1, 0.55], ink: [0.025, 0.092, 0.969, 0.93] },
      { id: 'watering-can', word: 'a watering can to water plants', pic: lib('spring', 'watering_can'), size: 46, flip: true, grip: [0.08, 0.45], ink: [0.023, 0.16, 0.975, 0.861] },
      { id: 'shovel', word: 'a shovel to dig', pic: null, size: 60, grip: [0.5, 0.3], ink: [0.36, 0.04, 0.64, 0.96] },
      { id: 'wheelbarrow', word: 'a wheelbarrow to carry dirt', pic: null, big: true, size: 56, flip: true, grip: [0.08, 0.57], ink: [0.14, 0.4, 0.94, 0.92] }],
      skills: [{ id: 'when-plant', word: 'a good time to plant seeds', think: 'sun-seed' }, { id: 'which-seeds', word: 'which seeds grow best', think: 'sprouts' }, { id: 'cows', word: 'a way to keep cows healthy', think: 'cow' }] },
    { id: 'builder', word: 'a builder', tools: [
      { id: 'drill', word: 'a drill to make holes', pic: lib('tools', 'electric_drill'), size: 48, flip: true, grip: [0.27, 0.6], ink: [0.023, 0.154, 0.977, 0.873] },
      { id: 'hammer', word: 'a hammer to hit nails', pic: lib('tools', 'hammer'), size: 44, grip: [0.46, 0.72], ink: [0.262, 0.021, 0.711, 0.982] },
      { id: 'saw', word: 'a saw to cut wood', pic: lib('tools', 'handsaw'), size: 50, grip: [0.15, 0.82], ink: [0.023, 0.125, 0.977, 0.881] },
      { id: 'ladder', word: 'a ladder to climb up', pic: lib('tools', 'ladder'), big: true, size: 60, grip: [0.36, 0.45], ink: [0.313, 0.023, 0.676, 0.988] }],
      skills: [{ id: 'plan', word: 'how to read a building plan', think: 'house-idea' }, { id: 'measure', word: 'a good way to measure wood', think: 'measure' }, { id: 'wall', word: 'a way to build a strong wall', think: 'wall' }] },
  ],
  TOOL_KEY: { tool: { word: 'tool or machine', color: 'blue', hex: '#4A7BD0' }, skill: { word: 'skill', color: 'orange', hex: '#F39C40' } },

  /* ---------------------------------------------------------------- G2-628 what does it cost to make? */
  /** the lemonade stand: what the children need before they can sell (the store's price list also shows things they do
   *  not need), whole-dollar prices; 10 cups sold at each price per cup. 25 cents a cup (the design) would bring in
   *  $2.50, a mixed amount Grade 2 does not write (the brief: cents to a dollar, whole dollars): 20 cents a cup brings in
   *  $2. Every total stays within $10; no total equals what a price brings in (a child could argue "covers" either way). */
  LEMON_NEEDS: [
    { id: 'lemons', word: 'lemons', price: [1, 2, 3], pic: lib('fruits', 'lemon') },
    { id: 'sugar', word: 'sugar', price: [1, 2], pic: null },
    { id: 'cups', word: '10 cups', price: [1, 2], pic: null },
    { id: 'sign', word: 'poster paper for a sign', price: [1, 2], pic: null, l2: true },
  ],
  LEMON_EXTRAS: [
    { id: 'kite', word: 'a kite', price: 3, pic: lib('toys', 'kite') },
    { id: 'ball', word: 'a ball', price: 2, pic: lib('toys', 'ball') },
  ],
  LEMON_CUPS: 10,
  LEMON_PRICES: [20, 50, 100],
  LEMON_NAMES: [['Ana', 'Ben'], ['Kim', 'Raj'], ['Mia', 'Luis'], ['Zoe', 'Sam']],

  /* ---------------------------------------------------------------- G2-629 what banks do */
  BANK_JOBS: [
    { id: 'safe', sentence: 'The bank keeps money safe.' },
    { id: 'interest', sentence: 'The bank pays savers interest.' },
    { id: 'loan', sentence: 'The bank lends money.' },
  ],
  /** the savings statement (whole dollars; the word "interest" is never printed in the picture) */
  BANK_STATEMENT: { start: 100, added: 1 },

  /* ---------------------------------------------------------------- G2-630 class market day (the teacher-led lesson) */
  /** the class market's things (the design: bookmarks, paper flowers; a drawing made to order) and their price range
   *  (the design: 10 cents to 1 dollar); the practice trays use the real US coins (data/social/dk-social-1.js US_COINS) */
  MARKET_GOODS: [
    { id: 'bookmark', word: 'a bookmark' },
    { id: 'flower', word: 'a paper flower' },
    { id: 'card', word: 'a card' },
    { id: 'drawing', word: 'a drawing' },
  ],
  /** by level: the coins of the practice trays, the price range (cents), the most coins of one kind on a tray, the coin
   *  always on a tray (the level's biggest); level 3 also makes change from a dollar for a price of 15 to 95 cents */
  MARKET2: {
    1: { coins: ['penny', 'nickel', 'dime'], min: 10, max: 50, maxOf: { dime: 4, nickel: 2, penny: 4 }, top: 'dime', trays: 2, records: 1 },
    2: { coins: ['penny', 'nickel', 'dime', 'quarter'], min: 26, max: 100, maxOf: { quarter: 4, dime: 3, nickel: 2, penny: 4 }, top: 'quarter', trays: 2, records: 2 },
    3: { coins: ['penny', 'nickel', 'dime', 'quarter'], min: 26, max: 100, maxOf: { quarter: 4, dime: 3, nickel: 2, penny: 4 }, top: 'quarter', trays: 2, records: 1, change: [15, 95] },
  },
};
