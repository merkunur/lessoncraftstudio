#!/usr/bin/env node
/* Wave 2 LEAD SLICE generator — EN chart-count × K (null mode), 43 valid themes.
 * The program's first Measurement & Data landing class (K.MD.B.3 = classify + count + represent).
 * Mode-true prose authored to the K.MD.B.3 ledger row — SORT -> COUNT -> SHOW-ON-A-GRAPH; the
 * addition make-ten/part-whole framings do NOT apply. COPY GUARD: never "data analysis / interpret
 * graphs / draw conclusions" (that over-claims into Gr2-3 / 2.MD.D.10). Carve-out themes colors+shapes
 * lead with sort/classify language, not bar-graph (SEO read).
 *
 * Reads DB-derived ground-truth canonical slugs from wave2-chartcount-coordinates.json.
 * 8 P1 skeletons x 7 P2 variants = 56 cells > 43 themes (coprime gcd(8,7)=1) — the proven Wave-1b
 * coprime-stride bijection + runtime invariant guard. Strand "Measurement & Data"; standard "K.MD.B.3".
 * Merge: keep all non-chart-count landings byte-stable; replace only chart-count.
 *
 * Usage: node scripts/seo-landing/gen-wave2-chartcount.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave2-chartcount-coordinates.json', 'utf8')).coordinates;

// theme -> { nouns, gen, h1 }. The 42 concrete themes reuse Wave-1b's copy; `colors` is new (the carve-out).
const THEMES = {
  '4th_of_july':            {nouns:'flags, stars and a drum', gen:'Fourth of July things', h1:'Fourth of July Things'},
  'accessories':            {nouns:'hats, belts and a scarf', gen:'accessories', h1:'Accessories'},
  'animals':                {nouns:'cows, sheep and a hen', gen:'animals', h1:'Animals'},
  'around_the_house':       {nouns:'lamps, chairs and a clock', gen:'household things', h1:'Household Things'},
  'at_the_supermarket':     {nouns:'carts, baskets and a till', gen:'supermarket things', h1:'Supermarket Things'},
  'bakery':                 {nouns:'bagels, buns and a cake', gen:'bakery treats', h1:'Bakery Treats'},
  'beach':                  {nouns:'buckets, spades and a starfish', gen:'beach things', h1:'Beach Things'},
  'birds':                  {nouns:'robins, owls and a duck', gen:'birds', h1:'Birds'},
  'birds_2':                {nouns:'parrots, swans and a crow', gen:'birds', h1:'More Birds'},
  'breakfast':              {nouns:'eggs, pancakes and a banana', gen:'breakfast foods', h1:'Breakfast'},
  'camping':                {nouns:'tents, torches and a backpack', gen:'camping gear', h1:'Camping Gear'},
  'christmas':              {nouns:'trees, baubles and a stocking', gen:'Christmas things', h1:'Christmas'},
  'classroom':             {nouns:'pencils, books and a globe', gen:'classroom objects', h1:'Classroom Objects'},
  'clothing':              {nouns:'shirts, socks and a hat', gen:'clothes', h1:'Clothes'},
  'colors':                {nouns:'red, blue and yellow', gen:'colors', h1:'Colors'},
  'desserts_and_sweets':   {nouns:'cupcakes, lollipops and a pie', gen:'sweet treats', h1:'Desserts and Sweets'},
  'dinosaurs':             {nouns:'a T. rex, a stegosaurus and a raptor', gen:'dinosaurs', h1:'Dinosaurs'},
  'easter':                {nouns:'eggs, bunnies and a basket', gen:'Easter things', h1:'Easter'},
  'farm_animals':          {nouns:'cows, pigs and a goat', gen:'farm animals', h1:'Farm Animals'},
  'flowers':               {nouns:'tulips, daisies and a rose', gen:'flowers', h1:'Flowers'},
  'forest_creatures':      {nouns:'foxes, deer and a hedgehog', gen:'forest creatures', h1:'Forest Creatures'},
  'fruits':                {nouns:'apples, bananas and a pear', gen:'fruit', h1:'Fruits'},
  'furniture':             {nouns:'sofas, tables and a lamp', gen:'furniture', h1:'Furniture'},
  'hospital':              {nouns:'beds, bandages and a stethoscope', gen:'hospital things', h1:'Hospital Things'},
  'insects_and_bugs':      {nouns:'ants, bees and a ladybug', gen:'bugs', h1:'Insects and Bugs'},
  'kitchen_tools':         {nouns:'spoons, whisks and a pan', gen:'kitchen tools', h1:'Kitchen Tools'},
  'miscellaneous':         {nouns:'a key, a button and an umbrella', gen:'everyday objects', h1:'Everyday Objects'},
  'music':                 {nouns:'drums, bells and a flute', gen:'instruments', h1:'Musical Instruments'},
  'occupations':           {nouns:'a chef, a nurse and a pilot', gen:'people', h1:'Community Helpers'},
  'ocean_life':            {nouns:'fish, crabs and an octopus', gen:'sea creatures', h1:'Ocean Life'},
  'pets':                  {nouns:'cats, dogs and a rabbit', gen:'pets', h1:'Pets'},
  'post_office':           {nouns:'letters, stamps and a parcel', gen:'post', h1:'Post Office'},
  'reptiles_and_amphibians':{nouns:'frogs, snakes and a turtle', gen:'reptiles', h1:'Reptiles and Amphibians'},
  'shapes':                {nouns:'circles, squares and a triangle', gen:'shapes', h1:'Shapes'},
  'space':                 {nouns:'rockets, planets and a star', gen:'space things', h1:'Space'},
  'thanksgivinng':         {nouns:'turkeys, pumpkins and a pie', gen:'Thanksgiving things', h1:'Thanksgiving'},
  'things_that_fly':       {nouns:'kites, planes and a balloon', gen:'flying things', h1:'Things That Fly'},
  'tools':                 {nouns:'hammers, saws and a wrench', gen:'tools', h1:'Tools'},
  'toys':                  {nouns:'balls, blocks and a teddy', gen:'toys', h1:'Toys'},
  'tree':                  {nouns:'oaks, pines and a palm', gen:'trees', h1:'Trees'},
  'vegetables':            {nouns:'carrots, peas and a pumpkin', gen:'vegetables', h1:'Vegetables'},
  'vehicles':              {nouns:'buses, trucks and a digger', gen:'vehicles', h1:'Vehicles'},
  'zoo_animals':           {nouns:'lions, zebras and a giraffe', gen:'zoo animals', h1:'Zoo Animals'},
};

// chart-count P1 skeletons — sort -> count -> represent (K.MD.B.3). (n)=scatter nouns, (s)=what's sorted/counted, (b)=sort-axis phrase.
const SKEL_CC = [
  (n,s,b)=>`This kindergarten worksheet shows a scatter of ${n} above an empty graph. The child sorts the ${s} ${b} — gathering the same ones together — counts how many there are in each group, and fills a column up to the matching height, building a simple picture graph one square at a time. The graph grows straight out of the child's own counting, so each bar means something they made themselves rather than something handed to them.`,
  (n,s,b)=>`Each picture on this sheet belongs in one group. The child looks at the ${n}, sorts the ${s} ${b}, and colors one square of a group's column for every picture that belongs there. Counting as they go, they end with a graph where the tallest column is simply the group that had the most. Sort first, then count, then show the count as height — that order is the whole idea, kept concrete with pictures a five-year-old can point to.`,
  (n,s,b)=>`Before any graph makes sense, a child has to put things into groups and count each group. That is exactly what this sheet asks: take the ${n}, sort the ${s} ${b}, count how many are in each, and build the columns to match. The picture graph is just a tidy way of standing those counts side by side, so the child can see at a glance which group had more and which had fewer — by looking, not by being told.`,
  (n,s,b)=>`On this kindergarten sheet the ${n} are jumbled together, and the child brings order to them. They sort the ${s} ${b} into the graph's columns, filling one square per picture, and count each column as it grows. Keeping the groups small means every total can be checked by counting the squares, and the finished graph is a true record of what the child sorted and counted.`,
  (n,s,b)=>`Sorting and counting come first; the graph only records them. A child works through the ${n}, sorts the ${s} ${b}, and counts how many landed in each group. Filling a column to that height turns the count into something they can see — a taller bar for the group that had more. With the amounts kept small, a kindergartner builds the whole graph from their own counting rather than copying a finished one.`,
  (n,s,b)=>`This sheet turns counting into a picture. The child sorts the ${n} ${b}, counts each group of ${s}, and stacks one square for every picture so the columns rise to match. Nothing here asks the child to read a finished chart — they make it. Seeing that the group they counted the most of has the tallest column is the quiet start of showing how many, and it stays grounded in the pictures the whole way.`,
  (n,s,b)=>`Give a kindergartner the ${n} and a blank graph, and the task is clear: sort the ${s} ${b}, count each group, and fill the columns to show the counts. One square per picture keeps the counting honest and checkable. The point is the link between the count and the height — more in a group means a taller column — which is groundwork for the charts they will meet later, met here as something the child builds by hand.`,
  (n,s,b)=>`Here the child is the one who makes the graph. They take the scattered ${n}, sort the ${s} ${b} into the columns, and count how many go in each, coloring a square at a time. Because every square stands for one picture they counted, the finished graph is theirs to read: the tallest column is the group with the most. Sorting, counting, and showing the count as height — kept small and concrete — is the kindergarten skill, no chart-reading required.`,
];
// chart-count P2 variants — K.MD.B.3 pedagogy (classify + count + represent; height = amount; no interpretation). (s)=sort/count noun.
const P2_CC = [
  (s)=>`Classifying objects into groups and counting how many are in each is a real kindergarten skill, and showing those counts as a graph is the natural next step. Keeping both halves together — sort and count, then represent — lets children see that a taller bar simply means there were more of that group, not an abstract idea on a page.`,
  (s)=>`Sorting comes before counting, and counting comes before any graph. A child who can gather the ${s} into groups and say how many are in each is doing the heart of the work; the columns just hold those counts side by side so they can be compared by height. That ordering — classify, count, represent — is exactly what kindergarten asks for.`,
  (s)=>`The last number you count in a group names how many are in it — and that count becomes the height of the column. Linking the count to the height is the understanding kindergartners are building: a column is tall because the child counted more there, short because they counted fewer. Pictured groups keep it something they can check by counting again.`,
  (s)=>`A picture graph is the gentlest way to show how many. There is no scale to read and no number sentences to solve — one square stands for one thing the child counted, so the graph is only ever as true as their own sorting and counting. That keeps the focus on the real skill — group, then count — not on a finished chart someone else made.`,
  (s)=>`Comparing groups is easy once they are graphed: the taller column had more, the shorter had fewer. Kindergartners are not asked to say what the bars mean or why — only to build the columns from what they sorted and counted, and to see that height shows amount. Keeping the groups small means every column can be checked square by square.`,
  (s)=>`Sorting into categories and counting each category is named directly in the kindergarten standards, and representing those counts is its companion. Doing both with pictures a child can move and point to keeps the idea concrete: the graph is a record of their counting, built one square at a time, not a chart handed to them already finished.`,
  (s)=>`Before numbers on a page mean much, amount has to be something a child can see. A picture graph makes "more" and "fewer" visible as taller and shorter columns the child built themselves by sorting and counting. That is the whole kindergarten goal here — represent how many — kept within small counts so it stays checkable by counting the squares.`,
];
function p3(coll, h1lower, nb){
  return `Children who like ${h1lower} take to this one quickly, and it makes a strong shared lesson: build one column together on the board, then let children finish their own. When this feels easy, sort and count a different set in ${nb[0]}, or try ${nb[1]}. You can also browse every picture graph worksheet or the whole ${coll} collection for kindergarten — each graph prints on a single page or fills in on screen as children tap.`;
}

// --- coprime-stride cell assignment (Wave-1b durable fix; cells must strictly exceed theme breadth) ---
function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){
  let k = Math.max(2, Math.round(cells * 0.6180339887));
  for (let d=0; d<cells; d++) for (const cand of [k+d, k-d]) if (cand>1 && cand<cells && gcd(cand,cells)===1) return cand;
  return 1;
}
function cellAssign(i, S, P){
  const cells = S*P, stride = coprimeStride(cells);
  const c = ((i % cells) * stride) % cells;
  return { skel: c % S, p2: Math.floor(c / S) % P };
}

const list = COORDS.slice().sort((a,b)=> a.theme<b.theme?-1:1);
const cells = SKEL_CC.length * P2_CC.length;
if (cells <= list.length) console.log(`  [INVARIANT WARN] chart-count: cell space ${SKEL_CC.length}x${P2_CC.length}=${cells} <= theme breadth ${list.length}`);
else console.log(`  [invariant OK] chart-count: cell space ${SKEL_CC.length}x${P2_CC.length}=${cells} > theme breadth ${list.length} — zero forced same-cell collisions`);

function landingSlugOf(co){ return co.siblings.length > 1 ? `chart-count-${co.slugTheme}-kindergarten` : co.canonical; }

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const d = THEMES[co.theme];
  if (!d) { console.log(`NO COPY DATA for theme ${co.theme} — add to THEMES`); blocked++; return; }
  const v = validateCoordinate('chart-count', null, co.theme, {});
  if (!v.valid) { console.log(`BLOCKED chart-count/${co.theme}: ${v.reason}`); blocked++; return; }
  const isAttr = (co.theme === 'colors' || co.theme === 'shapes');
  const sortItem = isAttr ? 'pictures' : d.gen;
  const sortBy = co.theme === 'colors' ? 'by color' : co.theme === 'shapes' ? 'by shape' : 'by kind';
  const cell = cellAssign(i, SKEL_CC.length, P2_CC.length);
  const nbA = list[(i+1)%list.length], nbB = list[(i+7)%list.length];
  const nb = [ `picture graph with ${THEMES[nbA.theme].h1.toLowerCase()}`, `picture graph with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  const entry = {
    slug: landingSlugOf(co),
    variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
    coordinate: { type:'chart-count', mode:null, theme:co.theme, level:'kindergarten' },
    eyebrow: 'Picture Graph Worksheet',
    h1: `Picture Graph with ${d.h1} — Kindergarten`,
    strand: 'Measurement & Data',
    standard: 'K.MD.B.3',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten']),
    p1: SKEL_CC[cell.skel](d.nouns, sortItem, sortBy),
    p2: P2_CC[cell.p2](sortItem),
    p3: p3(d.gen, d.h1.toLowerCase(), nb),
    canonicalDeckSlug: co.canonical,
    carousel: [
      {label:`Picture Graph with ${THEMES[list[(i+1)%list.length].theme].h1}`, href: landingSlugOf(list[(i+1)%list.length])},
      {label:`Picture Graph with ${THEMES[list[(i+2)%list.length].theme].h1}`, href: landingSlugOf(list[(i+2)%list.length])},
      {label:`Picture Graph with ${THEMES[list[(i+5)%list.length].theme].h1}`, href: landingSlugOf(list[(i+5)%list.length])},
      {label:`Picture Graph with ${THEMES[list[(i+11)%list.length].theme].h1}`, href: landingSlugOf(list[(i+11)%list.length])},
    ],
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

// merge: keep everything that is NOT chart-count (43 image-image + 100 image-number/mixed + 3 remaining pilots); replace chart-count
const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'chart-count');
const merged = { _note: cur._note + ' [Wave 2 LEAD SLICE: '+out.length+' chart-count/K landings via gen-wave2-chartcount.js (8 sort-count-represent P1 skeletons x 7 P2, K.MD.B.3 / Measurement & Data; colors+shapes carve-out; never data-analysis).]', landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} chart-count landings (blocked ${blocked}); total landings now ${merged.landings.length}`);
// lints
let short=0; const BANNED=['data analysis','interpret','draw conclusion','analyze','analyse','read the data','read the graph'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const w=body.split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);} const hit=BANNED.filter(b=>body.toLowerCase().includes(b)); if(hit.length) console.log(`  COPY-GUARD HIT ${e.slug}: ${hit.join(', ')}`);});
console.log(short? `${short} short (<200)` : `all ${out.length} >=200 words`);
