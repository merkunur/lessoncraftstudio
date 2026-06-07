#!/usr/bin/env node
/* Wave 3 COUPLED SLICE B — EN subtraction × {find-subtrahend, mixed} × Grade 1.
 * find-subtrahend = change-unknown ("8−?=5", find what was taken away) — the MISSING-NUMBER owner.
 * mixed = per-row image-number OR find-subtrahend — the WITHIN-20 MIXED/varied set.
 * Both differentiate against the LIVE subtraction/image-number (result-unknown, Wave 2). 1.OA.D.8.
 * ≤20 gate: all 86 minuend ≤20 (maxCleanNumber 10) — clean. Copy guard: within-20, no two-digit example numbers,
 * no Gr2 drift. 8 P1 x 7 P2 = 56 > 41/45 (coprime + guard). Usage: node scripts/seo-landing/gen-wave3-subtractionB.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave3-subtractionB-coordinates.json', 'utf8')).coordinates;

const THEMES = {
  '4th_of_july':{nouns:'flags, stars and a drum', gen:'Fourth of July things', h1:'Fourth of July Things'},
  'accessories':{nouns:'hats, belts and a scarf', gen:'accessories', h1:'Accessories'},
  'animals':{nouns:'cows, sheep and a hen', gen:'animals', h1:'Animals'},
  'around_the_house':{nouns:'lamps, chairs and a clock', gen:'household things', h1:'Household Things'},
  'at_the_supermarket':{nouns:'carts, baskets and a till', gen:'supermarket things', h1:'Supermarket Things'},
  'bakery':{nouns:'bagels, buns and a cake', gen:'bakery treats', h1:'Bakery Treats'},
  'beach':{nouns:'buckets, spades and a starfish', gen:'beach things', h1:'Beach Things'},
  'birds':{nouns:'robins, owls and a duck', gen:'birds', h1:'Birds'},
  'birds_2':{nouns:'parrots, swans and a crow', gen:'birds', h1:'More Birds'},
  'breakfast':{nouns:'eggs, pancakes and a banana', gen:'breakfast foods', h1:'Breakfast'},
  'camping':{nouns:'tents, torches and a backpack', gen:'camping gear', h1:'Camping Gear'},
  'christmas':{nouns:'trees, baubles and a stocking', gen:'Christmas things', h1:'Christmas'},
  'classroom':{nouns:'pencils, books and a globe', gen:'classroom objects', h1:'Classroom Objects'},
  'clothing':{nouns:'shirts, socks and a hat', gen:'clothes', h1:'Clothes'},
  'desserts_and_sweets':{nouns:'cupcakes, lollipops and a pie', gen:'sweet treats', h1:'Desserts and Sweets'},
  'dinosaurs':{nouns:'a T. rex, a stegosaurus and a raptor', gen:'dinosaurs', h1:'Dinosaurs'},
  'easter':{nouns:'eggs, bunnies and a basket', gen:'Easter things', h1:'Easter'},
  'easter_bw':{nouns:'eggs, bunnies and a basket', gen:'Easter pictures', h1:'Easter (Black & White)'},
  'faces_bw':{nouns:'smiling faces, winking faces and a yawning face', gen:'faces', h1:'Faces (Black & White)'},
  'farm_animals':{nouns:'cows, pigs and a goat', gen:'farm animals', h1:'Farm Animals'},
  'flowers':{nouns:'tulips, daisies and a rose', gen:'flowers', h1:'Flowers'},
  'forest_creatures':{nouns:'foxes, deer and a hedgehog', gen:'forest creatures', h1:'Forest Creatures'},
  'fruits':{nouns:'apples, bananas and a pear', gen:'fruit', h1:'Fruits'},
  'furniture':{nouns:'sofas, tables and a lamp', gen:'furniture', h1:'Furniture'},
  'home_bw':{nouns:'beds, mirrors and a teapot', gen:'home things', h1:'Home Things (Black & White)'},
  'hospital':{nouns:'beds, bandages and a stethoscope', gen:'hospital things', h1:'Hospital Things'},
  'household_bw':{nouns:'brooms, buckets and a kettle', gen:'household things', h1:'Household Things (Black & White)'},
  'insects_and_bugs':{nouns:'ants, bees and a ladybug', gen:'bugs', h1:'Insects and Bugs'},
  'kitchen_tools':{nouns:'spoons, whisks and a pan', gen:'kitchen tools', h1:'Kitchen Tools'},
  'miscellaneous':{nouns:'a key, a button and an umbrella', gen:'everyday objects', h1:'Everyday Objects'},
  'music':{nouns:'drums, bells and a flute', gen:'instruments', h1:'Musical Instruments'},
  'nature_bw':{nouns:'leaves, acorns and a mushroom', gen:'nature things', h1:'Nature (Black & White)'},
  'objects_bw':{nouns:'a clock, a cup and an umbrella', gen:'everyday objects', h1:'Everyday Objects (Black & White)'},
  'occupations':{nouns:'a chef, a nurse and a pilot', gen:'people', h1:'Community Helpers'},
  'ocean_life':{nouns:'fish, crabs and an octopus', gen:'sea creatures', h1:'Ocean Life'},
  'pets':{nouns:'cats, dogs and a rabbit', gen:'pets', h1:'Pets'},
  'post_office':{nouns:'letters, stamps and a parcel', gen:'post', h1:'Post Office'},
  'reptiles_and_amphibians':{nouns:'frogs, snakes and a turtle', gen:'reptiles', h1:'Reptiles and Amphibians'},
  'shapes':{nouns:'circles, squares and a triangle', gen:'shapes', h1:'Shapes'},
  'space':{nouns:'rockets, planets and a star', gen:'space things', h1:'Space'},
  'sports_bw':{nouns:'footballs, racquets and a whistle', gen:'sports gear', h1:'Sports Gear (Black & White)'},
  'thanksgivinng':{nouns:'turkeys, pumpkins and a pie', gen:'Thanksgiving things', h1:'Thanksgiving'},
  'things_that_fly':{nouns:'kites, planes and a balloon', gen:'flying things', h1:'Things That Fly'},
  'tools':{nouns:'hammers, saws and a wrench', gen:'tools', h1:'Tools'},
  'toys':{nouns:'balls, blocks and a teddy', gen:'toys', h1:'Toys'},
  'tree':{nouns:'oaks, pines and a palm', gen:'trees', h1:'Trees'},
  'valentine_bw':{nouns:'hearts, roses and a card', gen:'valentine pictures', h1:'Valentine Pictures (Black & White)'},
  'vegetables':{nouns:'carrots, peas and a pumpkin', gen:'vegetables', h1:'Vegetables'},
  'vehicles':{nouns:'buses, trucks and a digger', gen:'vehicles', h1:'Vehicles'},
  'zoo_animals':{nouns:'lions, zebras and a giraffe', gen:'zoo animals', h1:'Zoo Animals'},
};

// FIND-SUBTRAHEND (missing-number owner): group shown, RESULT given, find how many were taken away (change-unknown).
const SKEL_FS = [
  (n,g)=>`On each row of this Grade 1 worksheet a group of ${n} is shown, some are taken away, and the number left is given — the child works out how many went away. It is the missing-number side of subtraction: instead of being told what to take, the child sees the start and the result and finds the part in between. Counting up from what's left to the starting group is the natural way in, all kept within twenty, and the pictured ${g} mean a child can always check the missing number by counting rather than guessing it.`,
  (n,g)=>`This sheet asks "how many were taken away?" Each row shows a starting group of ${n} and how many remain; the blank is the amount that left. To find it, a child counts on from the result back up to the start, or thinks of the take-away that fits — the first taste of working a subtraction backward. The ${g} keep it concrete, and the numbers stay within twenty, so every missing-number answer is something a Grade 1 child can confirm by counting what is shown.`,
  (n,g)=>`The unknown here is the amount removed, not the answer. A group of ${n} is pictured, the number left is written, and the child finds how many were taken away to get there. That is change-unknown subtraction — a step beyond plain take-away, because the child reasons about the missing middle. Kept within twenty, it leans on counting up and on knowing which take-away makes the result, and the pictured ${g} keep that reasoning anchored to something a child can count.`,
  (n,g)=>`Each row gives a child the start and the finish and asks for the move between: a group of ${n}, the number still there, and a blank for how many left. Finding the missing number means connecting subtraction to its inverse — what taken from the group lands on the result. It is real Grade 1 reasoning, and the pictured ${g} plus within-twenty numbers keep it checkable by counting, so a child can verify the missing part instead of taking it on trust.`,
  (n,g)=>`"Some ${n} were here, this many are left — how many went away?" That is every row of this sheet. The child finds the missing part by counting up from what remains to the starting group, or by recalling the take-away that fits. Working subtraction from the result backward is the Grade 1 step this practises, with the amounts held within twenty so a child can always count to be sure — the pictured ${g} make that check quick and concrete.`,
  (n,g)=>`This is subtraction with the taken-away part left blank. A group of ${n} is shown with the number remaining; the child supplies how many were removed. It nudges a child past one-direction take-away toward seeing subtraction as a relationship — start, change, result — where any one can be the unknown. The ${g} are concrete and the numbers within twenty, so the missing part is always reachable by counting, and a child can prove their answer rather than guess it.`,
  (n,g)=>`Find what was taken away — that is the task on every row. The starting group of ${n} and the number left are given; the child fills in how many went. This change-unknown form asks for a little more thought than plain subtraction, because the child works back from the result, and that is exactly the Grade 1 growth it is for. Within-twenty amounts keep it grounded in counting the ${g}, so even the harder reasoning stays something a child can check by hand.`,
  (n,g)=>`Here a child meets the missing-number form of subtraction: a group of ${n}, the amount remaining, and a blank for how many were removed. Solving it means counting up from what's left to the start, or finding the take-away that fits — reasoning about subtraction rather than just performing it. The pictured ${g} and the within-twenty range keep the thinking concrete and self-checkable, so a Grade 1 child can confirm the missing number by counting whenever they are unsure.`,
];
const P2_FS = [
  (g)=>`Finding the missing part of a subtraction — how many were taken to reach the result — is a genuine step up from plain take-away, and it is core Grade 1 work. It asks a child to relate subtraction to its inverse, working backward from the result, and keeping the numbers within twenty means they can always check by counting up from what's left.`,
  (g)=>`Change-unknown subtraction builds the idea that start, change, and result are linked — that knowing two of them gives the third. A child who finds the amount removed is reasoning about that relationship, not just performing a take-away, which is exactly the Grade 1 growth this targets. Pictured ${g} and within-twenty numbers keep it concrete.`,
  (g)=>`Counting up from the result to the starting group is the natural strategy here, and it quietly connects subtraction to addition — what added to the leftover gives the start. That connection is central to Grade 1 number sense, and finding the missing part with ${g} the child can count keeps the reasoning grounded and checkable.`,
  (g)=>`Asking for the taken-away amount rather than the result keeps a child from running a page on autopilot — each row needs real thought about the missing middle. That is precisely why change-unknown problems matter at Grade 1, and why keeping them within twenty is important: the thinking is the work, so the numbers stay small enough to verify by counting the ${g}.`,
  (g)=>`Working a subtraction backward — from result to the part that left — is how a child first sees that the same three numbers can be arranged more than one way. It is the seed of fact families, a Grade 1 idea, and finding the missing part with within-twenty ${g} keeps that seed planted in counting the child can actually do.`,
  (g)=>`The missing-number form rehearses inverse thinking: if a group became this many, what was removed? A Grade 1 child answers by counting up or by knowing the take-away that fits, both of which strengthen the link between adding and subtracting. Within-twenty amounts and pictured ${g} keep the strategy concrete rather than abstract.`,
  (g)=>`Change-unknown subtraction is harder than plain take-away precisely because the answer is the move, not the result — and that extra reasoning is the Grade 1 point. Keeping the numbers within twenty lets a child meet that challenge with strategies they have, counting up from the ${g} that remain to the group they started with.`,
];

// MIXED (within-20 varied): some rows image-number (take a number away -> result), some find-subtrahend (result -> find what was taken).
const SKEL_MX = [
  (n,g)=>`This Grade 1 worksheet mixes two kinds of subtraction so the same ${g} keep a child thinking. On some rows a group of ${n} has a written number taken away and the child finds how many are left; on others the number left is given and the child finds how many went away. Switching between finding the result and finding the missing part stops the page becoming automatic, and it keeps every row a small decision rather than a habit. The amounts stay within twenty, so whichever kind a row turns out to be, the child can settle it by counting the pictures.`,
  (n,g)=>`Two questions take turns down this sheet. One row shows a group of ${n} with a number to take away — find what's left; the next gives the result and asks what was removed. Doing both with the same ${g} helps a child see subtraction as a whole relationship, not a single move, and the variety keeps them reading each row instead of repeating one. Numbers stay within twenty so every answer is countable, and the child checks their own work simply by counting what is shown.`,
  (n,g)=>`Some rows here are take-away-and-find-the-result; some are find-what-was-taken. In the first a written number leaves a group of ${n} and the child counts what remains; in the second the result is shown and the child works out the part that left. Mixing the two is real Grade 1 practice — it asks a child to notice which kind of question each row is before solving. All of it stays within twenty, so the ${g} on the page are always few enough to count and be sure.`,
  (n,g)=>`Because the rows vary, a child cannot switch off. A group of ${n} minus a written number asks for the result; a group with the result shown asks for the missing part. Both are within twenty, and meeting them together builds the flexible subtraction sense Grade 1 is after — seeing that start, change, and result are linked and any one can be the blank. Because every amount is small and pictured, the child can always fall back on counting the ${g} to confirm an answer.`,
  (n,g)=>`This sheet asks a child to find the result on some rows and the missing part on others, all with the same ${g}. Taking a written number from a group of ${n} gives one kind of answer; being shown the result and finding what was taken gives the other. Going back and forth keeps the focus on what subtraction means rather than on one repeated step. The numbers are held within twenty throughout, so each small problem stays something a Grade 1 child can check by counting.`,
  (n,g)=>`Mixed subtraction lays two row-types side by side. On one the child takes a number away from a pictured group of ${n} and counts what's left; on another the leftover is given and the child finds how many went. For a Grade 1 child, handling both with the same ${g} is how the link between a take-away and its missing part takes hold. The within-twenty amounts keep every answer checkable, and the steady switching between the two keeps a child reading and thinking rather than coasting.`,
  (n,g)=>`Each row could ask one of two things, so the child reads before solving: take this number from the ${n} and find what's left, or here is what's left — find what was taken. The variety is the point; it rehearses both directions of within-twenty subtraction on one page, which is exactly the Grade 1 practice that builds confidence with the whole start-change-result relationship. The ${g} stay pictured and the numbers small, so a child can always count to be certain.`,
  (n,g)=>`On this Grade 1 sheet some ${n} rows hand the child a number to subtract and ask for the result, while others hand over the result and ask for the missing part. Practising both at once — within twenty, with the ${g} pictured — keeps a child thinking about which question is being asked and stops subtraction from collapsing into a single automatic move. And because the amounts are small and shown as pictures, every answer can be checked by counting rather than guessed.`,
];
const P2_MX = [
  (g)=>`Mixing find-the-result and find-the-missing-part on one page rehearses both directions of subtraction, which is central to Grade 1 number sense. A child who handles both is seeing that start, change, and result are linked — not treating subtraction as a single move — and within-twenty amounts keep every answer checkable by counting.`,
  (g)=>`Variety is the teaching tool here: when rows alternate between taking a number away and finding what was taken, a child must read and decide before solving. That deliberate switching is exactly the flexible practice Grade 1 calls for, and keeping the ${g} pictured and the numbers within twenty keeps it grounded.`,
  (g)=>`Practising the two forms together helps a child see them as the same relationship from different angles rather than two unrelated skills. That is the heart of Grade 1 subtraction sense, and a mixed page of within-twenty ${g} problems builds it without ever leaving numbers a child can check by counting.`,
  (g)=>`A page that asks only one kind of question lets a child coast; a mixed page does not. Alternating result-unknown and missing-part rows keeps attention on the meaning of each problem, which is why mixed practice is valuable at Grade 1. The within-twenty range and pictured ${g} keep the focus on thinking, not on big numbers.`,
  (g)=>`Seeing both "take this away, what's left?" and "what was taken to leave this?" on one sheet builds the start-change-result understanding Grade 1 is after. The child learns the three numbers move together, whichever is missing. Keeping ${g} pictured and amounts within twenty means the reasoning stays something a child can verify by counting.`,
  (g)=>`Mixed subtraction within twenty rehearses the inverse relationship between adding and taking away by putting both directions in front of a child at once. That flexibility — knowing a fact and its partner — is core Grade 1 work, and the pictured ${g} keep each small problem checkable while the variety keeps the child engaged.`,
  (g)=>`When a child cannot predict whether the next row wants the result or the missing part, they stay with the meaning of subtraction rather than a memorised motion. That is the value of a mixed page at Grade 1, and holding the numbers within twenty with countable ${g} keeps the practice honest and self-checking.`,
];

function p3(mode, h1lower, g, nb){
  const opener = mode === 'find-subtrahend'
    ? `Children who like ${h1lower} take to the puzzle of working backward, and it suits a child ready for a little more than plain take-away.`
    : `Children who like ${h1lower} enjoy not knowing which question is coming next, and it keeps a small group thinking.`;
  return `${opener} When this feels easy, try ${nb[0]}, or ${nb[1]}. You can also browse every subtraction worksheet or the whole ${g} collection for grade 1 — each sheet prints cleanly in black and white or plays online for free.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'find-subtrahend': { SKEL: SKEL_FS, P2: P2_FS, h1:(h)=>`Find the Missing Number — ${h} — Grade 1`, nbVerb:'find the missing number with ', label:(t)=>`Find the Missing Number — ${t}` },
  'mixed':           { SKEL: SKEL_MX, P2: P2_MX, h1:(h)=>`Mixed Subtraction with ${h} — Grade 1`,  nbVerb:'mixed subtraction with ',     label:(t)=>`Mixed Subtraction with ${t}` },
};
function landingSlugOf(co){ return co.siblings.length > 1 ? `subtraction-${co.mode}-${co.slugTheme}-grade-1` : co.canonical; }

function buildMode(mode){
  const list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[mode];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] subtraction/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] subtraction/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for ${co.theme} (${mode})`); blocked++; return; }
    const v = validateCoordinate('subtraction', mode, co.theme, {});
    if(!v.valid){ console.log(`BLOCKED subtraction/${mode}/${co.theme}: ${v.reason}`); blocked++; return; }
    const cell = cellAssign(i, M.SKEL.length, M.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+7)%list.length];
    const nb=[ `${M.nbVerb}${THEMES[nbA.theme].h1.toLowerCase()}`, `${M.nbVerb}${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:'subtraction', mode, theme:co.theme, level:'grade-1' },
      eyebrow: 'Subtraction Worksheet',
      h1: M.h1(d.h1),
      strand: 'Operations & Algebraic Thinking',
      standard: '1.OA.D.8',
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'grade 1']),
      p1: M.SKEL[cell.skel](d.nouns, d.gen),
      p2: M.P2[cell.p2](d.gen),
      p3: p3(mode, d.h1.toLowerCase(), d.gen, nb),
      canonicalDeckSlug: co.canonical,
      carousel: [
        {label:M.label(THEMES[list[(i+1)%list.length].theme].h1), href: landingSlugOf(list[(i+1)%list.length])},
        {label:M.label(THEMES[list[(i+2)%list.length].theme].h1), href: landingSlugOf(list[(i+2)%list.length])},
        {label:M.label(THEMES[list[(i+5)%list.length].theme].h1), href: landingSlugOf(list[(i+5)%list.length])},
        {label:M.label(THEMES[list[(i+11)%list.length].theme].h1), href: landingSlugOf(list[(i+11)%list.length])},
      ],
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[]; let blockedTotal=0;
['find-subtrahend','mixed'].forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate.type==='subtraction' && (l.coordinate.mode==='find-subtrahend'||l.coordinate.mode==='mixed')));
const merged = { _note: cur._note + ' [Wave 3 slice B: '+generated.length+' subtraction/{find-subtrahend,mixed}/Gr1 via gen-wave3-subtractionB.js (8 P1 x 7 P2; 1.OA.D.8; find-subtrahend=missing-number, mixed=within-20 varied; all minuend≤20).]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} subtraction-B landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, drift=0, two=0;
const DRIFT=['place value','place-value','regroup','two-digit','double-digit','fluency','mastery','within 100'];
const TWODIGIT=/\b(1[1-9]|[2-9][0-9])\b/;
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const w=body.split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);} if(DRIFT.some(x=>body.toLowerCase().includes(x))){drift++;console.log(`  DRIFT ${e.slug}`);} if(TWODIGIT.test(body)){two++;console.log(`  TWO-DIGIT ${e.slug}`);} });
console.log(short?`${short} short`:'all >=200 words', '|', drift?`${drift} drift`:'no Gr2-drift', '|', two?`${two} two-digit`:'no two-digit example numbers');
