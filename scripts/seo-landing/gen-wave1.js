#!/usr/bin/env node
/* Wave 1 generator — EN addition/image-image/K × 43 valid themes.
 * Production model in action: 4 enriched P1 skeletons (stable rotation) + per-theme
 * noun slots + 4-variant P2 pool + distinct P3, every coordinate validity-gated.
 * Emits the 43 landings, MERGES the 4 non-image-image pilot entries, DROPS the 2
 * now-invalid pilot coords (body_parts, activities). Then re-gate with gate.js +
 * validity-gate.js. Usage: node scripts/seo-landing/gen-wave1.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';

// theme -> { slug (canonical deck), nouns, gen (generic plural), h1, collapse? }
const T = {
  '4th_of_july':            {slug:'addition-image-image-4th-of-july', nouns:'flags, stars and a drum', gen:'Fourth of July things', h1:'Fourth of July Things'},
  'accessories':            {slug:'addition-image-image-accessories', nouns:'hats, belts and a scarf', gen:'accessories', h1:'Accessories'},
  'animals':                {slug:'addition-image-image', landing:'addition-image-image-animals-kindergarten', siblings:['addition-image-image','addition-image-image-animals'], nouns:'cows, sheep and a hen', gen:'animals', h1:'Animals'},
  'around_the_house':       {slug:'addition-image-image-around-the-house', nouns:'lamps, chairs and a clock', gen:'household things', h1:'Household Things'},
  'at_the_supermarket':     {slug:'addition-image-image-at-the-supermarket', nouns:'carts, baskets and a till', gen:'supermarket things', h1:'Supermarket Things'},
  'bakery':                 {slug:'addition-image-image-bakery', nouns:'bagels, buns and a cake', gen:'bakery treats', h1:'Bakery Treats', collective:true},
  'beach':                  {slug:'addition-image-image-beach', nouns:'buckets, spades and a starfish', gen:'beach things', h1:'Beach Things'},
  'birds':                  {slug:'addition-image-image-birds', nouns:'robins, owls and a duck', gen:'birds', h1:'Birds'},
  'birds_2':                {slug:'addition-image-image-birds-2', nouns:'parrots, swans and a crow', gen:'birds', h1:'More Birds'},
  'breakfast':              {slug:'addition-image-image-breakfast', nouns:'eggs, pancakes and a banana', gen:'breakfast foods', h1:'Breakfast', collective:true},
  'camping':                {slug:'addition-image-image-camping', nouns:'tents, torches and a backpack', gen:'camping gear', h1:'Camping Gear'},
  'christmas':              {slug:'addition-image-image-christmas', nouns:'trees, baubles and a stocking', gen:'Christmas things', h1:'Christmas'},
  'classroom':             {slug:'addition-image-image-classroom', nouns:'pencils, books and a globe', gen:'classroom objects', h1:'Classroom Objects'},
  'clothing':              {slug:'addition-image-image-clothing', nouns:'shirts, socks and a hat', gen:'clothes', h1:'Clothes'},
  'desserts_and_sweets':   {slug:'addition-image-image-desserts-and-sweets', nouns:'cupcakes, lollipops and a pie', gen:'sweet treats', h1:'Desserts and Sweets', collective:true},
  'dinosaurs':             {slug:'addition-image-image-dinosaurs', nouns:'a T. rex, a stegosaurus and a raptor', gen:'dinosaurs', h1:'Dinosaurs'},
  'easter':                {slug:'addition-image-image-easter', nouns:'eggs, bunnies and a basket', gen:'Easter things', h1:'Easter'},
  'farm_animals':          {slug:'addition-image-image-farm-animals', nouns:'cows, pigs and a goat', gen:'farm animals', h1:'Farm Animals'},
  'flowers':               {slug:'addition-image-image-flowers', nouns:'tulips, daisies and a rose', gen:'flowers', h1:'Flowers'},
  'forest_creatures':      {slug:'addition-image-image-forest-creatures', nouns:'foxes, deer and a hedgehog', gen:'forest creatures', h1:'Forest Creatures'},
  'fruits':                {slug:'addition-image-image-fruits', nouns:'apples, bananas and a pear', gen:'fruit', h1:'Fruits'},
  'furniture':             {slug:'addition-image-image-furniture', nouns:'sofas, tables and a lamp', gen:'furniture', h1:'Furniture'},
  'hospital':              {slug:'addition-image-image-hospital', nouns:'beds, bandages and a stethoscope', gen:'hospital things', h1:'Hospital Things'},
  'insects_and_bugs':      {slug:'addition-image-image-insects-and-bugs', nouns:'ants, bees and a ladybug', gen:'bugs', h1:'Insects and Bugs'},
  'kitchen_tools':         {slug:'addition-image-image-kitchen-tools', nouns:'spoons, whisks and a pan', gen:'kitchen tools', h1:'Kitchen Tools', collective:true},
  'miscellaneous':         {slug:'addition-image-image-miscellaneous', nouns:'a key, a button and an umbrella', gen:'everyday objects', h1:'Everyday Objects'},
  'music':                 {slug:'addition-image-image-music', nouns:'drums, bells and a flute', gen:'instruments', h1:'Musical Instruments'},
  'occupations':           {slug:'addition-image-image-occupations', nouns:'a chef, a nurse and a pilot', gen:'people', h1:'Community Helpers'},
  'ocean_life':            {slug:'addition-image-image-ocean-life', nouns:'fish, crabs and an octopus', gen:'sea creatures', h1:'Ocean Life'},
  'pets':                  {slug:'addition-image-image-pets', nouns:'cats, dogs and a rabbit', gen:'pets', h1:'Pets'},
  'post_office':           {slug:'addition-image-image-post-office', nouns:'letters, stamps and a parcel', gen:'post', h1:'Post Office'},
  'reptiles_and_amphibians':{slug:'addition-image-image-reptiles-and-amphibians', nouns:'frogs, snakes and a turtle', gen:'reptiles', h1:'Reptiles and Amphibians'},
  'shapes':                {slug:'addition-image-image-shapes', nouns:'circles, squares and a triangle', gen:'shapes', h1:'Shapes'},
  'space':                 {slug:'addition-image-image-space', nouns:'rockets, planets and a star', gen:'space things', h1:'Space'},
  'thanksgivinng':         {slug:'addition-image-image-thanksgiving', nouns:'turkeys, pumpkins and a pie', gen:'Thanksgiving things', h1:'Thanksgiving'},
  'things_that_fly':       {slug:'addition-image-image-things-that-fly', nouns:'kites, planes and a balloon', gen:'flying things', h1:'Things That Fly'},
  'tools':                 {slug:'addition-image-image-tools', nouns:'hammers, saws and a wrench', gen:'tools', h1:'Tools'},
  'toys':                  {slug:'addition-image-image-toys', nouns:'balls, blocks and a teddy', gen:'toys', h1:'Toys'},
  'tree':                  {slug:'addition-image-image-tree', nouns:'oaks, pines and a palm', gen:'trees', h1:'Trees'},
  'valentine_bw':          {slug:'addition-image-image-valentine-bw', nouns:'hearts, roses and a card', gen:'valentines', h1:'Valentine Pictures'},
  'vegetables':            {slug:'addition-image-image-vegetables', nouns:'carrots, peas and a pumpkin', gen:'vegetables', h1:'Vegetables'},
  'vehicles':              {slug:'addition-image-image-vehicles', nouns:'buses, trucks and a digger', gen:'vehicles', h1:'Vehicles'},
  'zoo_animals':           {slug:'addition-image-image-zoo-animals', nouns:'lions, zebras and a giraffe', gen:'zoo animals', h1:'Zoo Animals'},
};

const SKEL = [
  (n,g)=>`This kindergarten worksheet sets out two small groups of ${n} on each row, with a plus sign between them and an empty box after the equals sign. Children count the ${g} in the first group, count the second group, and write how many there are in all. A row might pair a few with a couple more, so the same skill comes back with a fresh picture each time. The pictures carry the whole problem, so a child who cannot yet read a written equation can still solve every line by touching and counting what is there.`,
  (n,g)=>`Children add here by counting what they can see. Each line lays out a little set of ${n}, a plus sign, and a second set, with the total left as an empty box. They count the first set, keep counting on into the second, and write how many ${g} there are altogether. Because both groups are pictured, nothing has to be read first — a child works out the answer from the page itself, which is exactly how addition should begin at five and six years old.`,
  (n,g)=>`Picture math keeps the numbers small and the meaning clear. On every row a group of ${n} meets another group across a plus sign, and the child finds the total by counting the ${g} rather than recalling a fact. The empty box waits for the answer. Sums stay within ten, so a kindergartner can always check by counting the pictures instead of guessing, and the idea that two groups join into one larger amount stays front and centre throughout.`,
  (n,g)=>`Each problem on this sheet shows ${n} to gather: one small group, a plus sign, another small group, and a box for how many in all. Because every one of the ${g} is right there to be touched and counted, even a child who is not yet reading can finish the whole sheet on their own. Counting two groups and saying how many altogether is the earliest, most concrete form of addition — the groundwork the written plus sign is built on later.`,
  (n,g)=>`Two little groups of ${n} sit on each row of this kindergarten sheet, joined by a plus sign, with the total left blank. The task is simple and self-checking: count one group, count the other, and write how many ${g} there are together. Five- and six-year-olds can do every line by pointing and counting, which means the sheet works for a whole class at once — nobody is stuck waiting until they can read an equation first.`,
  (n,g)=>`Addition starts as a counting story, and that is just what each row tells: here are some ${n}, here are some more, how many altogether? The child counts the first group, counts on through the second, and writes the total in the empty box. With the amounts kept small and every one of the ${g} shown as a picture, the meaning of the plus sign — two groups becoming one — is something a kindergartner can see, not only be told.`,
];
const P2 = [
  (g)=>`Counting two groups and then saying how many there are in all is the first real step into addition. Long before a symbol means anything, a child who combines one pile of ${g} with another and recounts the whole set is already adding — and keeping totals within ten means every answer can be checked by counting rather than guessed.`,
  (g)=>`Before written sums make sense, addition has to happen with things a child can see and move. Joining a group of ${g} to another group and finding the total builds the part-and-whole idea — that two smaller amounts make one larger one — which is the concrete ground every later written method is built on.`,
  (g)=>`Each row ends with one question: how many altogether. That quietly teaches cardinality — the last number you count names the size of the whole set. Linking the count to the total is exactly the understanding kindergartners are forming, and pictured ${g} keep it something they can point to and check for themselves.`,
  (g)=>`Sums stay small, within ten, so the answer is always reachable by counting the pictures rather than recalling a fact a five-year-old has not met yet. That keeps the focus on what addition means — putting two groups of ${g} together into one total — instead of racing for speed before the idea is secure.`,
];
function p3(t, g, nb){
  return `Children who enjoy ${T[t].h1.toLowerCase()} take to this one quickly, and it works just as well as a quiet morning task or a count-along on the board. When the set feels easy, count a different collection in ${nb[0]}, or try ${nb[1]}. You can also browse every addition worksheet or the whole ${g} collection for kindergarten — each sheet prints cleanly in black and white or plays online for free.`;
}

const HOST = 'https://www.lessoncraftstudio.com';
const themes = Object.keys(T).sort();
function landingSlugOf(t){ return T[t].landing || T[t].slug; }
function neighbors(i){ const a=themes[(i+1)%themes.length], b=themes[(i+7)%themes.length]; return [ `addition with ${T[a].h1.toLowerCase()}`, `addition with ${T[b].h1.toLowerCase()}` ]; }

const out = [];
let blocked = 0;
themes.forEach((t, i) => {
  const v = validateCoordinate('addition','image-image', t, {});
  if (!v.valid) { console.log(`BLOCKED (should not happen for the 43): ${t} — ${v.reason}`); blocked++; return; }
  const d = T[t];
  const nb = neighbors(i);
  const entry = {
    slug: landingSlugOf(t),
    variantShape: d.siblings ? 'collapsed' : 'singleton',
    coordinate: { type:'addition', mode:'image-image', theme:t, level:'kindergarten' },
    eyebrow: 'Addition Worksheet',
    h1: `Addition with ${d.h1} — Kindergarten`,
    strand: 'Operations & Algebraic Thinking',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an) /,'').trim()).concat([d.gen, t.replace(/_/g,' '), 'kindergarten']),
    p1: SKEL[i % SKEL.length](d.nouns, d.gen),
    p2: P2[Math.floor(i / SKEL.length) % P2.length](d.gen),
    p3: p3(t, d.gen, nb),
    canonicalDeckSlug: d.slug,
    carousel: [
      {label:`Addition with ${T[themes[(i+1)%themes.length]].h1}`, href: landingSlugOf(themes[(i+1)%themes.length])},
      {label:`Addition with ${T[themes[(i+2)%themes.length]].h1}`, href: landingSlugOf(themes[(i+2)%themes.length])},
      {label:`Addition with ${T[themes[(i+5)%themes.length]].h1}`, href: landingSlugOf(themes[(i+5)%themes.length])},
      {label:`Addition with ${T[themes[(i+11)%themes.length]].h1}`, href: landingSlugOf(themes[(i+11)%themes.length])},
    ],
  };
  if (d.siblings) entry.collapseSiblings = d.siblings;
  out.push(entry);
});

// merge: keep the 4 non-image-image pilot entries; drop the 2 invalid (body_parts, activities) + the old image-image set (regenerated)
const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate.type==='addition' && l.coordinate.mode==='image-image'));
const merged = { _note: cur._note + ' [Wave 1: 43 addition/image-image/K via gen-wave1.js (4 P1 skeletons); body_parts+activities retired as invalid].', landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} addition/image-image landings (blocked ${blocked}); total landings now ${merged.landings.length}`);
// quick wordcount check
let short=0; out.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}});
console.log(short? `${short} short (<200)` : 'all 43 >=200 words');
