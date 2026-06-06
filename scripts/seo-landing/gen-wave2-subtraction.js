#!/usr/bin/env node
/* Wave 2 COUPLED SLICE generator — EN subtraction × {cross-out, image-number} × K.
 * Authored together to lock the intent differentiation deliberately:
 *   cross-out (head-term owner): "cross out and count what's left" — physical take-away -> remainder.
 *   image-number (follower):     "subtract the written number from the pictured group" — symbolic difference.
 * Mode-true prose against the K.OA.A.1-A.2 ledger row (take-from, result-unknown) — NOT carried from addition
 * (add vs subtract) or chart-count. HARD <=10 ceiling (lint below); any quantity 11-20 silently re-levels to Gr1.
 * 8 P1 skeletons x 7 P2 = 56 cells > 49/45 (coprime) + the proven coprime-stride bijection + guard.
 * Strand "Operations & Algebraic Thinking"; standard "K.OA.A.2" (single anchor — see plan note).
 * Merge: keep all non-(subtraction cross-out/image-number) landings byte-stable; replace those two modes.
 * Usage: node scripts/seo-landing/gen-wave2-subtraction.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave2-subtraction-coordinates.json', 'utf8')).coordinates;

// theme -> { nouns, gen, h1 }. Wave-1b's set (concrete + _bw) + the new easter_bw row (image-number carries it).
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

// CROSS-OUT (head-term owner): cross out -> count what's left. take-away -> remainder.
const SKEL_CO = [
  (n,g)=>`Each row of this kindergarten worksheet shows a group of ${n} and asks the child to cross some of them out, then write how many are left. Crossing-out is the heart of it: the child physically removes the ${g} that go away and counts the ones that remain, so subtraction is something they do with their hands before it is ever a written symbol. The pictures carry the whole problem, so a child who cannot yet read an equation can still solve every line.`,
  (n,g)=>`Subtraction starts as taking away, and that is exactly what each row asks. A small set of ${n} is shown; the child crosses out the ones that leave and counts what is left behind. Because the whole action happens in pictures the child can mark, the meaning — fewer than we started with — stays right in front of them. Amounts are kept within ten, so every answer can be checked by counting the ${g} that remain.`,
  (n,g)=>`Here a child subtracts by doing, not by remembering. Each line lays out some ${n}; the task is to cross off the ones that go and count the ones still there. A row might start with a few and send one away, or start with more and cross several off, so the take-away looks different each time. Crossing out and counting the remainder is the most concrete form of subtraction there is, and it is exactly where five- and six-year-olds begin.`,
  (n,g)=>`On every row of this sheet a group of ${n} is there to be thinned out. The child marks the ones that leave with a cross, then counts the ${g} that are left to find the answer. Nothing has to be read first — the picture is the problem, and the crossing-out is the subtraction. Keeping the groups small means a child can always check by counting what remains rather than guessing.`,
  (n,g)=>`Take a small pile of ${n}, cross some away, count what's left — that is the whole of this kindergarten sheet, repeated with a fresh picture each row. The child does the subtracting with a pencil stroke, removing the ${g} that go and counting the remainder. Doing it by hand keeps the idea concrete: subtraction is what happens when some of a group is taken away, and the leftover is the answer.`,
  (n,g)=>`This worksheet makes subtraction a physical act. Each row shows some ${n}; the child crosses out the ones that leave and writes how many ${g} are left. Because the take-away is something they mark and count, not a fact they recall, even a child who is new to numbers can finish the line. With totals kept within ten, the remaining group is always small enough to count one by one. That self-checking is the point: the answer is something the child can prove by counting, never something they have to guess.`,
  (n,g)=>`Crossing out is the simplest way into subtraction, and this sheet leans on it the whole way. A group of ${n} is shown; the child strikes through the ones that go away and counts the ${g} that stay. The struck-out pictures show what left, the rest show what's left — the difference is right there to see. Small amounts keep every answer checkable by counting the ones that remain, and because nothing must be read first, even a child new to written numbers can work through every row on their own.`,
  (n,g)=>`Each line gives the child a group of ${n} and some to take away by crossing out. They mark the ones that leave, then count the ones remaining to find how many are left. Doing the take-away with their own hand — rather than reading a minus sign — is how subtraction first makes sense at five and six, and keeping the groups small means the leftover ${g} can always be checked by counting.`,
];
const P2_CO = [
  (g)=>`Taking a few away and counting what is left is the most concrete form of subtraction there is, and it is exactly where five- and six-year-olds begin. Modelling the take-away with pictures the child can cross out keeps the meaning — fewer than we started with — front and centre, well within ten so every answer can be checked by counting.`,
  (g)=>`Subtraction makes sense first as an action: some of a group leaves, and we count who remains. Crossing out the ${g} that go turns that action into something a child can see and do, rather than a rule about a minus sign. Keeping the numbers small means the remainder is always countable, so the answer is verified, not guessed.`,
  (g)=>`Before a minus sign means anything, a child needs to feel that subtraction is taking away. Removing pictured ${g} by crossing them out and counting the rest builds exactly that feeling, and it lays the groundwork for seeing later how addition and subtraction undo each other. Totals within ten keep the whole idea checkable by counting.`,
  (g)=>`The last number you count among the ones left names how many remain — and that is the answer to a take-away. Linking the count of what's left to the result is the understanding kindergartners are forming, and crossing pictures out keeps it something they can point to and recount for themselves whenever they are unsure.`,
  (g)=>`Keeping the starting group within ten means a child can always reach the answer by counting what is left rather than recalling a fact they have not met yet. That keeps the focus on what subtraction means — a group made smaller by taking some away — instead of racing for speed before the idea is secure.`,
  (g)=>`Crossing out is a small action with a big idea behind it: a quantity can be made smaller, and we can say exactly how much is left. Doing it with pictured ${g} keeps the idea concrete and self-checking, which is precisely what take-away subtraction should be at five and six — seen and done, not memorised.`,
  (g)=>`Modelling subtraction as physically removing some of a group is how the meaning lands before the symbol does. A child who crosses out ${g} and counts the rest is subtracting in the truest sense, and because the amounts stay small, the leftover group can always be counted one by one to be sure.`,
];

// IMAGE-NUMBER (follower): count the pictured group, subtract the WRITTEN NUMBER, count what's left. symbolic difference.
const SKEL_INS = [
  (n,g)=>`Every row of this kindergarten worksheet pairs a group of ${n} you can count with a number written beside a minus sign, and leaves the answer as an empty box. The child counts the pictured ${g}, then takes that written number away — counting back by that much — to find how many are left. Seeing a real group on one side and a number to subtract on the other is the first bridge from taking away pictures to working with symbols.`,
  (n,g)=>`Here subtraction mixes something to count with something to read. One side is a little set of ${n} the child counts; the other is a numeral to take away; the box holds what's left. Counting the ${g} and then removing the written number — stepping the count down by that much — is how five- and six-year-olds start to trust that a numeral stands for an amount they could have crossed out themselves. Totals stay within ten so every answer can be checked.`,
  (n,g)=>`On this sheet the child meets a picture and a number to subtract on the same line. They count the group of ${n}, read the number after the minus sign, and take that many away to find the rest. Keeping one side a countable group of ${g} gives a child who is still shaky on written numbers a concrete place to start, while the numeral gently introduces the symbol their subtraction will lean on later.`,
  (n,g)=>`Each problem shows one group to count and one number to take from it: a set of ${n}, a minus sign, a written numeral, and an empty answer. The child finds how many ${g} are left by counting the pictures and then subtracting the number, counting back from the total. Because amounts stay within ten, the answer is always reachable by counting rather than by recalling a fact, and the page quietly links a pile of pictures to the figure that means the same amount.`,
  (n,g)=>`This kindergarten sheet asks the child to take a written number away from a group they can see. They count the ${n} in the picture, then subtract the number the row gives them — removing that many — and write what's left in the box. Half picture and half symbol, it is the natural next step after crossing pictures out: the child still counts to find the answer, but now the amount taken away arrives as a numeral instead of marks on the ${g}.`,
  (n,g)=>`A group of ${n} sits beside a minus sign and a written number on every row, with the answer left blank. The child counts the pictured set first, then takes the number away to say how many ${g} are left. It is subtraction with one foot in counting and one foot in symbols: the picture keeps the meaning concrete while the numeral starts the move toward written take-away, and the small totals let a kindergartner check every answer by counting.`,
  (n,g)=>`Counting down from a number is the new move here, and the pictures keep it grounded. The child counts the group of ${n}, then subtracts the written number by counting back that many, landing on how many ${g} remain. Reading the amount to remove as a numeral — while the starting group stays a set you can count — is the gentlest way to bring written numbers into take-away, with totals small enough to check by counting.`,
  (n,g)=>`Give a kindergartner a pictured group of ${n} and a number to subtract, and the task is clear: count the group, take the written number away, and write how many ${g} are left. The picture anchors the meaning and the numeral does the new work, so the symbol is met exactly when there is something real to take it from. Kept within ten, every answer can be checked by counting what remains.`,
];
const P2_INS = [
  (g)=>`Taking a written number away from a group you can count is a real milestone for a five-year-old. It is where counting back begins — starting from the pictured ${g} and stepping down by the number — and where a child first feels that a numeral is just a quick way of writing an amount they could have crossed out by hand.`,
  (g)=>`This is the bridge between taking-away-with-pictures and arithmetic. A child who can count a set of ${g} and then remove a written number is connecting the concrete world of objects to the symbols that will stand in for them, and keeping every total within ten means the link can always be checked by counting what is left.`,
  (g)=>`Counting back from a total, rather than recounting the leftovers from one, is a key kindergarten step, and pairing the number with a group of ${g} to count makes it concrete. The picture anchors the meaning while the numeral does the new work, so the symbol is introduced exactly when the child has something real to take it from.`,
  (g)=>`Reading the amount to remove as a numeral, while the starting group stays a set of ${g} the child counts, keeps subtraction meaningful without keeping it forever in crossing-out. It is the gentlest introduction to written numbers in take-away — the pictures stay countable, the totals stay small, and the child learns the figure names the same amount they could have struck through.`,
  (g)=>`Subtraction is still taking away here; only the amount removed has become a written number. A child counts the pictured ${g}, then steps the count down by the numeral to find the rest. Keeping within ten means the answer is always reachable by counting back rather than by recalling a fact, which is exactly where five- and six-year-olds should be.`,
  (g)=>`The meaning stays concrete even as a symbol appears: the group is pictured and counted, and only the number taken away is written. That balance lets a kindergartner meet the numeral without losing the sense that subtraction makes a group of ${g} smaller. Small totals keep every answer something the child can verify by counting what is left.`,
  (g)=>`Pairing a countable group with a number to subtract builds two things at once — the take-away meaning and the first comfort with written numbers. Because the ${g} stay pictured and the totals stay within ten, the child can always fall back on counting to check, so the symbol is introduced on a foundation they can trust.`,
];

function p3(mode, h1lower, g, nb){
  const opener = mode === 'cross-out'
    ? `Children who enjoy ${h1lower} take to crossing out quickly, and it works as a calm hands-on task or a whole-class action on the board.`
    : `Children who enjoy ${h1lower} settle into this quickly once crossing-out feels easy, and it suits a calm independent task.`;
  return `${opener} When this feels easy, take some away in ${nb[0]}, or try ${nb[1]}. You can also browse every subtraction worksheet or the whole ${g} collection for kindergarten — each sheet prints cleanly in black and white or plays online for free.`;
}

// --- coprime-stride cell assignment (Wave-1b durable fix) ---
function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'cross-out':    { SKEL: SKEL_CO,  P2: P2_CO,  h1: (h)=>`Subtraction with ${h} — Kindergarten`,        nbVerb: 'subtraction with ' },
  'image-number': { SKEL: SKEL_INS, P2: P2_INS, h1: (h)=>`Subtract a Number with ${h} — Kindergarten`,  nbVerb: 'subtract a number with ' },
};
function landingSlugOf(co){ return co.siblings.length > 1 ? `subtraction-${co.mode}-${co.slugTheme}-kindergarten` : co.canonical; }

function buildMode(mode){
  const list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[mode];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] subtraction/${mode}: cell space ${M.SKEL.length}x${M.P2.length}=${cells} <= breadth ${list.length}`);
  else console.log(`  [invariant OK] subtraction/${mode}: cell space ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for ${co.theme} (${mode}) — add to THEMES`); blocked++; return; }
    const v = validateCoordinate('subtraction', mode, co.theme, {});
    if(!v.valid){ console.log(`BLOCKED subtraction/${mode}/${co.theme}: ${v.reason}`); blocked++; return; }
    const cell = cellAssign(i, M.SKEL.length, M.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+7)%list.length];
    const nb=[ `${M.nbVerb}${THEMES[nbA.theme].h1.toLowerCase()}`, `${M.nbVerb}${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const label = mode==='cross-out' ? (t)=>`Subtraction with ${t}` : (t)=>`Subtract a Number with ${t}`;
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:'subtraction', mode, theme:co.theme, level:'kindergarten' },
      eyebrow: 'Subtraction Worksheet',
      h1: M.h1(d.h1),
      strand: 'Operations & Algebraic Thinking',
      standard: 'K.OA.A.2',
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten']),
      p1: M.SKEL[cell.skel](d.nouns, d.gen),
      p2: M.P2[cell.p2](d.gen),
      p3: p3(mode, d.h1.toLowerCase(), d.gen, nb),
      canonicalDeckSlug: co.canonical,
      carousel: [
        {label:label(THEMES[list[(i+1)%list.length].theme].h1), href: landingSlugOf(list[(i+1)%list.length])},
        {label:label(THEMES[list[(i+2)%list.length].theme].h1), href: landingSlugOf(list[(i+2)%list.length])},
        {label:label(THEMES[list[(i+5)%list.length].theme].h1), href: landingSlugOf(list[(i+5)%list.length])},
        {label:label(THEMES[list[(i+11)%list.length].theme].h1), href: landingSlugOf(list[(i+11)%list.length])},
      ],
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[]; let blockedTotal=0;
['cross-out','image-number'].forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate.type==='subtraction' && (l.coordinate.mode==='cross-out'||l.coordinate.mode==='image-number')));
const merged = { _note: cur._note + ' [Wave 2 COUPLED SLICE: '+generated.length+' subtraction/{cross-out,image-number}/K via gen-wave2-subtraction.js (8 mode-distinct P1 x 7 P2; K.OA.A.2; cross-out=take-away, image-number=subtract-the-number; <=10 ceiling).]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} subtraction landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);

// lints: >=200 words + <=10 ceiling (no number-word 11..20 or digit >=11)
let short=0, ceil=0;
const OVER=/\b(1[1-9]|[2-9][0-9]|[1-9][0-9][0-9])\b/, OVERW=/\b(eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\b/i;
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const w=body.split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);} if(OVER.test(body)||OVERW.test(body)){ceil++; console.log(`  <=10 CEILING HIT ${e.slug}`);} });
console.log(short? `${short} short (<200)` : `all ${generated.length} >=200 words`);
console.log(ceil? `${ceil} <=10-ceiling hits` : 'all within the <=10 ceiling');
